type DataLayerEvent = Record<string, unknown>;

const getDataLayer = (): DataLayerEvent[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const win = window as Window & { dataLayer?: DataLayerEvent[] };
  if (!win.dataLayer) {
    win.dataLayer = [];
  }
  return win.dataLayer;
};

const pushEvent = (eventName: string, payload: DataLayerEvent = {}) => {
  const dataLayer = getDataLayer();
  dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...payload,
  });
};

const getLabel = (el: HTMLElement) => {
  const explicit = el.getAttribute('data-gtm-label');
  if (explicit) return explicit;
  const aria = el.getAttribute('aria-label');
  if (aria) return aria;
  const text = el.textContent?.trim().replace(/\s+/g, ' ') || '';
  return text.slice(0, 120);
};

const getLocation = (el: HTMLElement) => {
  const explicit = el.getAttribute('data-gtm-location');
  if (explicit) return explicit;
  const section = el.closest('[data-gtm-section]') as HTMLElement | null;
  return section?.getAttribute('data-gtm-section') || '';
};

const isMessengerHref = (href: string) => {
  const value = href.toLowerCase();
  return (
    value.includes('t.me') ||
    value.includes('wa.me') ||
    value.includes('viber') ||
    value.includes('m.me') ||
    value.includes('messenger.com')
  );
};

const getContactType = (href: string) => {
  const value = href.toLowerCase();
  if (value.startsWith('tel:')) return 'phone';
  if (value.startsWith('mailto:')) return 'email';
  if (isMessengerHref(value)) return 'messenger';
  return 'other';
};

document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement | null)?.closest('a, button, [data-gtm-event]');
  if (!target) return;

  const eventName = target.getAttribute('data-gtm-event');
  if (eventName) {
    if (target.tagName === 'FORM') {
      return;
    }
    const payload: DataLayerEvent = {
      event_label: getLabel(target),
      event_location: getLocation(target),
      event_href: target instanceof HTMLAnchorElement ? target.href : '',
      event_plan: target.getAttribute('data-gtm-plan') || '',
    };
    pushEvent(eventName, payload);
    return;
  }

  if (target.hasAttribute('data-gtm-cta')) {
    pushEvent('cta_click', {
      event_label: getLabel(target),
      event_location: getLocation(target),
      event_href: target instanceof HTMLAnchorElement ? target.href : '',
    });
    return;
  }

  if (target instanceof HTMLAnchorElement) {
    const href = target.getAttribute('href') || '';
    if (href.startsWith('tel:') || href.startsWith('mailto:') || isMessengerHref(href)) {
      pushEvent('contact_click', {
        event_label: getLabel(target),
        event_location: getLocation(target),
        event_href: href,
        contact_type: getContactType(href),
      });
    } else if (href.toLowerCase().includes('calendly.com')) {
      pushEvent('book_call', {
        event_label: getLabel(target),
        event_location: getLocation(target),
        event_href: href,
      });
    }
  }
});
