const CASE_AUTOPLAY_DELAY = 3500;

const initCaseCarousel = () => {
  const carousel = document.querySelector<HTMLElement>('[data-case-carousel]');
  if (!carousel || carousel.dataset.carouselReady === 'true') return;

  const viewport = carousel.querySelector<HTMLElement>('[data-case-viewport]');
  const track = carousel.querySelector<HTMLElement>('[data-case-track]');
  const cards = Array.from(carousel.querySelectorAll<HTMLElement>('[data-case-card]'));
  const currentLabel = carousel.querySelector<HTMLElement>('[data-case-current]');
  const previousButton = carousel.querySelector<HTMLButtonElement>('[data-case-prev]');
  const nextButton = carousel.querySelector<HTMLButtonElement>('[data-case-next]');

  if (!viewport || !track || !currentLabel || !previousButton || !nextButton || cards.length < 2) {
    return;
  }

  carousel.dataset.carouselReady = 'true';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const originalCount = cards.length / 3;
  let loopWidth = 0;
  let currentIndex = 0;
  let autoplayTimer = 0;
  let scrollTimer = 0;
  let resumeTimer = 0;

  const cardStep = () => {
    if (cards.length < 2) return 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  };

  const setScrollInstantly = (left: number) => {
    viewport.style.scrollBehavior = 'auto';
    viewport.scrollLeft = left;
    viewport.getBoundingClientRect();
    viewport.style.removeProperty('scroll-behavior');
  };

  const updateCounter = (index: number) => {
    currentIndex = ((index % originalCount) + originalCount) % originalCount;
    currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
  };

  const syncCurrentIndex = () => {
    const stepWidth = cardStep();
    if (!loopWidth || !stepWidth) return;

    const positionInLoop = ((viewport.scrollLeft % loopWidth) + loopWidth) % loopWidth;
    updateCounter(Math.round(positionInLoop / stepWidth));
  };

  const measure = () => {
    loopWidth = track.scrollWidth / 3;
    const stepWidth = cardStep();
    if (!loopWidth || !stepWidth) return;
    setScrollInstantly(loopWidth + currentIndex * stepWidth);
    updateCounter(currentIndex);
  };

  const normalizePosition = () => {
    if (!loopWidth) return;

    if (viewport.scrollLeft >= loopWidth * 2) {
      setScrollInstantly(viewport.scrollLeft - loopWidth);
    } else if (viewport.scrollLeft < loopWidth - 1) {
      setScrollInstantly(viewport.scrollLeft + loopWidth);
    }

    syncCurrentIndex();
  };

  const syncFromScroll = () => {
    syncCurrentIndex();
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(normalizePosition, 180);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    window.clearTimeout(resumeTimer);
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion.matches || document.hidden) return;
    autoplayTimer = window.setInterval(() => moveByCard(1, false), CASE_AUTOPLAY_DELAY);
  };

  const moveByCard = (direction: number, restartAutoplay = true) => {
    const stepWidth = cardStep();
    if (!stepWidth) return;

    viewport.scrollBy({
      left: stepWidth * direction,
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });

    if (restartAutoplay) startAutoplay();
  };

  const resumeAutoplayLater = () => {
    stopAutoplay();
    resumeTimer = window.setTimeout(startAutoplay, 1800);
  };

  measure();
  startAutoplay();

  viewport.addEventListener('scroll', syncFromScroll, { passive: true });
  window.addEventListener('resize', measure);
  previousButton.addEventListener('click', () => moveByCard(-1));
  nextButton.addEventListener('click', () => moveByCard(1));

  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('wheel', resumeAutoplayLater, { passive: true });
  carousel.addEventListener('pointerdown', stopAutoplay, { passive: true });
  carousel.addEventListener('pointerup', startAutoplay, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  window.addEventListener('pagehide', () => {
    stopAutoplay();
    window.clearTimeout(scrollTimer);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCaseCarousel, { once: true });
} else {
  initCaseCarousel();
}

document.addEventListener('astro:page-load', initCaseCarousel);
