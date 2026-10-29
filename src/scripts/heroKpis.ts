import type { HeroKpi } from '../data/cases';

const INTERVAL = 3200;
const SWAP = 450;

/** Rotates the hero KPI cards: one slot at a time fades out and comes back with the next case. */
export const initHeroKpis = () => {
  const root = document.querySelector<HTMLElement>('[data-hero-kpis]');
  if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const pool = JSON.parse(root.dataset.pool || '[]') as HeroKpi[];
  const slots = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-kpi-slot]'));
  if (pool.length <= slots.length) return;

  let next = slots.length;
  let slot = 0;
  let timer = 0;

  const fill = (card: HTMLAnchorElement, kpi: HeroKpi) => {
    card.href = `/cases/${kpi.slug}`;
    const [label, value, note] = card.children as unknown as HTMLElement[];
    label.textContent = kpi.label;
    value.replaceChildren();
    if (kpi.from) {
      const old = document.createElement('s');
      old.textContent = kpi.from;
      value.append(old);
    }
    value.append(kpi.value);
    note.textContent = kpi.note;
    note.classList.toggle('up', Boolean(kpi.positive));
  };

  const swap = () => {
    // Skip slots hidden by CSS (the third card on small phones).
    let card = slots[slot];
    for (let i = 0; i < slots.length && card.offsetParent === null; i++) {
      slot = (slot + 1) % slots.length;
      card = slots[slot];
    }
    const kpi = pool[next];
    card.classList.add('is-leaving');
    window.setTimeout(() => {
      fill(card, kpi);
      card.classList.remove('is-leaving');
      card.classList.add('is-entering');
      card.getBoundingClientRect();
      card.classList.remove('is-entering');
    }, SWAP);
    next = (next + 1) % pool.length;
    slot = (slot + 1) % slots.length;
  };

  const start = () => {
    window.clearInterval(timer);
    timer = window.setInterval(swap, INTERVAL);
  };
  const stop = () => window.clearInterval(timer);

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(root);
};
