const AUTOPLAY_DELAY = 3500;

const initNicheSlider = () => {
  const slider = document.querySelector<HTMLElement>('[data-niche-slider]');
  if (!slider || slider.dataset.initialized === 'true') return;

  const track = slider.querySelector<HTMLElement>('[data-niche-track]');
  const cards = Array.from(slider.querySelectorAll<HTMLElement>('[data-niche-card]'));
  const currentLabel = slider.querySelector<HTMLElement>('[data-niche-current]');
  const previousButton = slider.querySelector<HTMLButtonElement>('[data-niche-prev]');
  const nextButton = slider.querySelector<HTMLButtonElement>('[data-niche-next]');
  const originalCount = cards.length / 2;

  if (!track || !currentLabel || !previousButton || !nextButton || originalCount < 2) return;

  slider.dataset.initialized = 'true';
  let currentIndex = 0;
  let autoplayTimer = 0;
  let scrollTimer = 0;

  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  const cardStep = () => cards[1].offsetLeft - cards[0].offsetLeft;

  const updateCounter = (index: number) => {
    currentLabel.textContent = String((index % originalCount) + 1).padStart(2, '0');
  };

  const moveTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!isMobile()) return;

    currentIndex = index;
    const left = cardStep() * index;

    if (behavior === 'auto') {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = left;
      track.getBoundingClientRect();
      track.style.removeProperty('scroll-behavior');
    } else {
      track.scrollTo({ left, behavior });
    }
    updateCounter(index);
  };

  const stopAutoplay = () => window.clearInterval(autoplayTimer);
  const startAutoplay = () => {
    stopAutoplay();
    if (!isMobile() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    autoplayTimer = window.setInterval(() => moveTo(currentIndex + 1), AUTOPLAY_DELAY);
  };

  const normalizePosition = () => {
    if (currentIndex < originalCount) return;
    currentIndex %= originalCount;
    moveTo(currentIndex, 'auto');
  };

  const syncFromScroll = () => {
    if (!isMobile()) return;
    const step = cardStep();
    if (step <= 0) return;
    currentIndex = Math.round(track.scrollLeft / step);
    updateCounter(currentIndex);
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(normalizePosition, 180);
  };

  previousButton.addEventListener('click', () => {
    if (currentIndex <= 0) {
      moveTo(originalCount, 'auto');
      window.requestAnimationFrame(() => moveTo(originalCount - 1));
    } else {
      moveTo(currentIndex - 1);
    }
    startAutoplay();
  });

  nextButton.addEventListener('click', () => {
    moveTo(currentIndex + 1);
    startAutoplay();
  });

  track.addEventListener('scroll', syncFromScroll, { passive: true });
  track.addEventListener('pointerdown', stopAutoplay, { passive: true });
  track.addEventListener('pointerup', startAutoplay, { passive: true });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      stopAutoplay();
      track.scrollLeft = 0;
      currentIndex = 0;
      updateCounter(0);
      return;
    }
    moveTo(currentIndex, 'auto');
    startAutoplay();
  });

  startAutoplay();
};

initNicheSlider();
document.addEventListener('astro:page-load', initNicheSlider);
