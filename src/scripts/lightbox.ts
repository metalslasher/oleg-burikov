// Gallery viewer for case screenshots and article images.
// Triggers: links with [data-lightbox] (href = full image) and images inside article figures.
// Without JS, the links still open the image itself.

type Item = { src: string; alt: string };

const TRIGGERS = 'a[data-lightbox], .prose figure img';

export const initLightbox = () => {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  if (!dialog) return;

  const image = dialog.querySelector<HTMLImageElement>('[data-lb-image]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lb-caption]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-lb-counter]')!;
  const prev = dialog.querySelector<HTMLButtonElement>('[data-lb-prev]')!;
  const next = dialog.querySelector<HTMLButtonElement>('[data-lb-next]')!;
  const stage = dialog.querySelector<HTMLElement>('[data-lb-stage]')!;

  const triggers = Array.from(document.querySelectorAll<HTMLElement>(TRIGGERS));
  if (!triggers.length) return;

  const items: Item[] = triggers.map((el) => {
    const img = el instanceof HTMLImageElement ? el : el.querySelector('img');
    return {
      src: el instanceof HTMLAnchorElement ? el.href : (img?.currentSrc || img?.src || ''),
      alt: img?.alt || '',
    };
  });

  let index = 0;
  let lastTrigger: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    image.classList.add('is-loading');
    image.onload = () => image.classList.remove('is-loading');
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.alt;
    counter.textContent = `${index + 1} / ${items.length}`;
    const single = items.length < 2;
    prev.hidden = single;
    next.hidden = single;
    // Warm up neighbours for instant navigation.
    [index + 1, index - 1].forEach((n) => {
      const neighbour = items[(n + items.length) % items.length];
      if (neighbour) new Image().src = neighbour.src;
    });
  };

  const open = (i: number, trigger: HTMLElement) => {
    lastTrigger = trigger;
    show(i);
    document.documentElement.classList.add('modal-open');
    dialog.showModal();
  };

  triggers.forEach((trigger, i) => {
    if (trigger instanceof HTMLImageElement) {
      trigger.style.cursor = 'zoom-in';
      trigger.tabIndex = 0;
      trigger.setAttribute('role', 'button');
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open(i, trigger);
        }
      });
    }
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open(i, trigger);
    });
  });

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lb-close]')?.addEventListener('click', () => dialog.close());

  // Click on the dark area (not on the image or buttons) closes the viewer.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target === stage) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });

  let startX = 0;
  stage.addEventListener('touchstart', (event) => (startX = event.touches[0].clientX), { passive: true });
  stage.addEventListener(
    'touchend',
    (event) => {
      const dx = event.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    image.removeAttribute('src');
    lastTrigger?.focus();
  });
};
