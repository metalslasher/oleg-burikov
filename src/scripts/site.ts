const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Header: scrolled state + mobile menu */
const initHeader = () => {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('[data-menu-link]').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1000px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
};

/* Count-up for numbers marked with [data-count]. Keeps prefix, suffix and separators. */
const NUMBER_RE = /\d[\d\s ]*(?:[.,]\d+)?/;

const animateCount = (element: HTMLElement) => {
  const original = element.textContent || '';
  const match = original.match(NUMBER_RE);
  if (!match || match.index === undefined) return;

  const raw = match[0];
  const decimalSep = raw.includes(',') ? ',' : raw.includes('.') ? '.' : '';
  const decimals = decimalSep ? raw.split(decimalSep)[1].length : 0;
  const groupSep = /\d[\s ]\d/.test(raw) ? ' ' : '';
  const target = Number(raw.replace(/[\s ]/g, '').replace(',', '.'));
  if (!Number.isFinite(target) || target === 0) return;

  const before = original.slice(0, match.index);
  const after = original.slice(match.index + raw.length);
  const format = (value: number) => {
    let text = value.toFixed(decimals);
    let [whole, fraction] = text.split('.');
    if (groupSep) whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep);
    text = fraction ? `${whole}${decimalSep}${fraction}` : whole;
    return `${before}${text}${after}`;
  };

  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    element.textContent = format(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else element.textContent = original;
  };
  requestAnimationFrame(tick);
};

/* Scroll reveal + count-up triggers */
const initReveal = () => {
  const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const countItems = document.querySelectorAll<HTMLElement>('[data-count]');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        if (target.hasAttribute('data-reveal')) target.classList.add('is-visible');
        if (target.hasAttribute('data-count')) animateCount(target);
        observer.unobserve(target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
  countItems.forEach((item) => observer.observe(item));
};

/* Cursor spotlight on cards marked with [data-spotlight] (pointer devices only) */
const initSpotlight = () => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
};

/* Section headings: split into words that slide up from a mask when scrolled into view */
const splitWords = (heading: HTMLElement) => {
  const words: HTMLElement[] = [];
  const wrap = (content: Node) => {
    const outer = document.createElement('span');
    outer.className = 'split-word';
    const inner = document.createElement('span');
    inner.append(content);
    outer.append(inner);
    words.push(outer);
    return outer;
  };

  Array.from(heading.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent || '').split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) return;
        fragment.append(/^\s+$/.test(part) ? document.createTextNode(' ') : wrap(document.createTextNode(part)));
      });
      node.replaceWith(fragment);
    } else if (node instanceof HTMLElement) {
      node.replaceWith(wrap(node.cloneNode(true)));
    }
  });

  words.forEach((word, index) => word.style.setProperty('--wi', String(index)));
  heading.classList.add('is-split');
};

const initHeadings = () => {
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const headings = document.querySelectorAll<HTMLElement>('.h2:not([data-no-split])');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );
  headings.forEach((heading) => {
    splitWords(heading);
    observer.observe(heading);
  });
};

initHeader();
initReveal();
initSpotlight();
initHeadings();
