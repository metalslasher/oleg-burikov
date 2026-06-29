const CONTACT_MODAL_ID = 'contact-modal';
const CONTACT_MODAL_OPEN_SELECTOR =
  'a[href="#contact"], a[href="/#contact"], [data-contact-modal-open]';

const initContactModal = () => {
  const dialog = document.getElementById(CONTACT_MODAL_ID);

  if (!(dialog instanceof HTMLDialogElement) || dialog.dataset.modalReady === 'true') {
    return;
  }

  dialog.dataset.modalReady = 'true';
  let lastTrigger: HTMLElement | null = null;

  const unlockPage = () => {
    document.documentElement.classList.remove('contact-modal-is-open');
  };

  const openModal = (trigger?: HTMLElement | null) => {
    if (dialog.open) return;

    lastTrigger = trigger || null;
    document.documentElement.classList.add('contact-modal-is-open');

    try {
      dialog.showModal();
    } catch {
      unlockPage();
      return;
    }

    requestAnimationFrame(() => {
      dialog.querySelector<HTMLInputElement>('#contact-name')?.focus();
    });
  };

  const closeModal = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest<HTMLElement>(CONTACT_MODAL_OPEN_SELECTOR);
    if (!trigger) return;

    event.preventDefault();
    openModal(trigger);
  });

  dialog.querySelectorAll<HTMLElement>('[data-contact-modal-close]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      closeModal();
    }
  });

  dialog.addEventListener('close', () => {
    unlockPage();
    lastTrigger?.focus();
    lastTrigger = null;
  });

  if (window.location.hash === '#contact') {
    openModal();
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactModal, { once: true });
} else {
  initContactModal();
}
