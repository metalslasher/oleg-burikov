import { DEFAULT_PHONE_CODE, checkPhone, formatPhone, isContactMethod, normalizePhoneDigits } from '../lib/contact';
import { pushEvent } from './gtmEvents';

const PHONE_PREFIX = `+${DEFAULT_PHONE_CODE} `;

/**
 * Live phone mask. The field starts with "+380 "; digits are grouped for the detected country code and the caret
 * stays after the same digit. Pasted or autofilled numbers ("096…", "380…", "+1 …") are normalized.
 * Errors appear on blur and disappear as soon as the number becomes valid.
 */
const initPhoneMask = (input: HTMLInputElement, validate: () => void, clearError: () => void) => {
  const countDigits = (value: string) => value.replace(/\D/g, '').length;
  const caretAfterDigits = (value: string, count: number) => {
    if (count <= 0) return value.startsWith('+') ? 1 : 0;
    let seen = 0;
    for (let i = 0; i < value.length; i += 1) {
      if (/\d/.test(value[i]) && ++seen === count) return i + 1;
    }
    return value.length;
  };
  const caretToEnd = () => input.setSelectionRange(input.value.length, input.value.length);

  const apply = (raw: string, caretDigits: number | null) => {
    const digits = normalizePhoneDigits(raw);
    input.value = formatPhone(digits) || '+';
    if (caretDigits === null) caretToEnd();
    else {
      // Normalization can drop or add digits (a stripped leading 0, an added 380), so shift the caret with it.
      const shift = digits.length - countDigits(raw);
      const pos = caretAfterDigits(input.value, Math.min(digits.length, caretDigits + shift));
      input.setSelectionRange(pos, pos);
    }
    if (checkPhone(input.value).ok) clearError();
  };

  input.addEventListener('input', () => {
    const caret = input.selectionStart ?? input.value.length;
    apply(input.value, countDigits(input.value.slice(0, caret)));
  });

  // A pasted full number replaces the field instead of being glued to the prefilled +380.
  input.addEventListener('paste', (event) => {
    const text = event.clipboardData?.getData('text') || '';
    if (countDigits(text) < 9) return;
    event.preventDefault();
    apply(text, null);
    validate();
  });

  input.addEventListener('focus', () => {
    if (countDigits(input.value) === 0) input.value = PHONE_PREFIX;
    if (normalizePhoneDigits(input.value) === DEFAULT_PHONE_CODE) requestAnimationFrame(caretToEnd);
  });

  input.addEventListener('blur', () => {
    const result = checkPhone(input.value);
    if (result.ok || result.reason !== 'empty') validate();
  });
};

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
  const directLinks = dialog.querySelector<HTMLElement>('[data-direct-links]');
  if (!form || !formView || !successView || !status || !submit || !submitLabel) return;

  const setError = (name: string, message: string) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | null;
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    input?.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  };

  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement | null;

  const validate = () => {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = checkPhone(String(data.get('phone') || ''));
    const method = String(data.get('contact_method') || '');
    const errors = {
      name: name.length < 2 ? 'Вкажіть ім’я (мінімум 2 символи)' : '',
      phone: phone.ok ? '' : phone.hint,
      contact_method: isContactMethod(method) ? '' : 'Оберіть, як з вами зв’язатися',
    };
    Object.entries(errors).forEach(([field, message]) => setError(field, message));
    return Object.values(errors).every((message) => !message);
  };

  const nameInput = form.elements.namedItem('name') as HTMLInputElement | null;
  nameInput?.addEventListener('blur', () => nameInput.value && validate());
  if (phoneInput) initPhoneMask(phoneInput, () => validate(), () => setError('phone', ''));
  form.querySelector('[name="contact_method"]')?.addEventListener('change', () => setError('contact_method', ''));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    if (!validate()) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = new FormData(form);
    const service = String(data.get('service') || '');
    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      contact_method: String(data.get('contact_method') || ''),
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
      if (directLinks) directLinks.hidden = true;
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
      if (directLinks) directLinks.hidden = false;
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
