type DataLayerEvent = Record<string, unknown>;

export const pushEvent = (event: string, payload: DataLayerEvent = {}) => {
  const win = window as Window & { dataLayer?: DataLayerEvent[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event,
    page_path: window.location.pathname,
    page_title: document.title,
    ...payload,
  });
};

const getLabel = (el: HTMLElement) =>
  el.dataset.gtmLabel || el.getAttribute('aria-label') || (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120);

const getLocation = (el: HTMLElement) =>
  el.dataset.gtmLocation || el.closest<HTMLElement>('[data-gtm-section]')?.dataset.gtmSection || '';

const isMessenger = (href: string) => /t\.me|wa\.me|viber|m\.me|messenger\.com/i.test(href);

const contactType = (href: string) => {
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('mailto:')) return 'email';
  if (isMessenger(href)) return 'messenger';
  return 'other';
};

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>('a, button') : null;
  if (!target) return;

  const href = target instanceof HTMLAnchorElement ? target.getAttribute('href') || '' : '';
  const base = {
    event_label: getLabel(target),
    event_location: getLocation(target),
    event_href: target instanceof HTMLAnchorElement ? target.href : '',
  };

  const explicit = target.dataset.gtmEvent;
  if (explicit) {
    pushEvent(explicit, base);
    return;
  }

  if (href.startsWith('tel:') || href.startsWith('mailto:') || isMessenger(href)) {
    pushEvent('contact_click', { ...base, contact_type: contactType(href) });
  } else if (/calendly\.com/i.test(href)) {
    pushEvent('book_call', base);
  }
});
