import { detectContact } from '../lib/contact';
import { pushEvent } from './gtmEvents';

const OPEN_SELECTOR = 'a[href="#contact"], a[href="/#contact"], [data-contact-open]';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const storage = {
  get: (key: string) => {
    try {
      return sessionStorage.getItem(key) || '';
    } catch {
      return '';
    }
  },
  set: (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  },
};

const rememberUtm = () => {
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) storage.set(key, value);
  });
};

const getUtm = () =>
  Object.fromEntries(UTM_KEYS.map((key) => [key, new URLSearchParams(window.location.search).get(key) || storage.get(key)]));

const initLeadForm = (dialog: HTMLDialogElement) => {
  const form = dialog.querySelector<HTMLFormElement>('[data-lead-form]');
  const formView = dialog.querySelector<HTMLElement>('[data-form-view]');
  const successView = dialog.querySelector<HTMLElement>('[data-success-view]');
  const status = dialog.querySelector<HTMLElement>('[data-form-status]');
  const submit = dialog.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = dialog.querySelector<HTMLElement>('[data-submit-label]');
  if (!form || !formView || !successView || !status || !submit || !submitLabel) return;

  const setError = (name: string, message: string) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | null;
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    input?.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  };

  const validate = () => {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const nameError = name.length < 2 ? 'Вкажіть ім’я (мінімум 2 символи)' : '';
    const contactError = !contact
      ? 'Залиште контакт для відповіді'
      : detectContact(contact)
        ? ''
        : 'Вкажіть телефон, @username у Telegram або email';
    setError('name', nameError);
    setError('contact', contactError);
    return !nameError && !contactError;
  };

  ['name', 'contact'].forEach((name) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | null;
    input?.addEventListener('blur', () => input.value && validate());
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    if (!validate()) {
      form.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = new FormData(form);
    const contact = String(data.get('contact') || '').trim();
    const service = String(data.get('service') || '');
    const payload = {
      name: String(data.get('name') || '').trim(),
      contact,
      contact_method: detectContact(contact) || '',
      service,
      message: String(data.get('message') || '').trim(),
      website_hp: String(data.get('website_hp') || ''),
      form_id: form.id,
      source: window.location.pathname,
      ...getUtm(),
    };

    submit.disabled = true;
    submitLabel.textContent = 'Надсилаю…';

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || '');

      pushEvent('lead_submit', {
        form_id: form.id,
        lead_service: service,
        lead_contact_method: payload.contact_method,
      });
      form.reset();
      formView.hidden = true;
      successView.hidden = false;
    } catch (error) {
      status.textContent =
        (error instanceof Error && error.message) || 'Не вдалося надіслати. Спробуйте ще раз або напишіть у Telegram.';
    } finally {
      submit.disabled = false;
      submitLabel.textContent = 'Надіслати';
    }
  });

  dialog.addEventListener('close', () => {
    if (!successView.hidden) {
      successView.hidden = true;
      formView.hidden = false;
    }
  });
};

export const initContactModal = () => {
  const dialog = document.getElementById('contact-modal');
  if (!(dialog instanceof HTMLDialogElement)) return;

  rememberUtm();
  initLeadForm(dialog);
  let lastTrigger: HTMLElement | null = null;

  const open = (trigger?: HTMLElement | null) => {
    if (dialog.open) return;
    lastTrigger = trigger || null;
    document.documentElement.classList.add('modal-open');
    dialog.showModal();
    requestAnimationFrame(() => dialog.querySelector<HTMLInputElement>('#lead-name')?.focus());
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>(OPEN_SELECTOR) : null;
    if (!trigger) return;
    event.preventDefault();

    const preset = trigger.dataset.contactService;
    if (preset) {
      const radio = dialog.querySelector<HTMLInputElement>(`input[name="service"][value="${CSS.escape(preset)}"]`);
      if (radio) radio.checked = true;
    }
    open(trigger);
  });

  dialog.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    lastTrigger?.focus();
    lastTrigger = null;
  });

  if (window.location.hash === '#contact') {
    open();
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
};
