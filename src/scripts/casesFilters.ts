const LOAD_MORE_STEP = 6;

const initCasesFilters = () => {
  const filterTabs = document.getElementById('filter-tabs');
  const casesGrid = document.getElementById('cases-grid');
  if (!filterTabs || !casesGrid || casesGrid.dataset.casesFiltersReady === 'true') return;

  const filterButtons = Array.from(filterTabs.querySelectorAll<HTMLButtonElement>('.filter-btn'));
  const caseCards = Array.from(casesGrid.querySelectorAll<HTMLElement>('.case-card'));
  const loadMoreBtn = document.getElementById('load-more-cases') as HTMLButtonElement | null;
  const loadMoreText = document.getElementById('load-more-text');
  const showMoreFiltersBtn = document.getElementById('show-more-filters') as HTMLButtonElement | null;
  const filtersToggleText = document.getElementById('filters-toggle-text');

  if (!filterButtons.length || !caseCards.length) return;

  casesGrid.dataset.casesFiltersReady = 'true';
  let filtersExpanded = false;
  let currentFilter = 'all';

  const matchesCurrentFilter = (card: HTMLElement) =>
    currentFilter === 'all' || card.dataset.industry === currentFilter;

  const updateLoadMoreButton = () => {
    if (!loadMoreBtn || !loadMoreText) return;

    const remainingHidden = caseCards.filter(
      (card) => card.classList.contains('hidden-case') && matchesCurrentFilter(card),
    ).length;

    if (remainingHidden === 0) {
      loadMoreBtn.style.display = 'none';
      return;
    }

    loadMoreBtn.style.display = 'inline-flex';
    loadMoreText.textContent = `Показати ще (${remainingHidden})`;
  };

  const applyFilter = () => {
    caseCards.forEach((card) => {
      const shouldShow = matchesCurrentFilter(card) && !card.classList.contains('hidden-case');
      card.style.display = shouldShow ? 'block' : 'none';
    });

    updateLoadMoreButton();
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((filterButton) => {
        filterButton.classList.remove('bg-accent-500', 'text-white');
        filterButton.classList.add('bg-white/5', 'border', 'border-white/10', 'text-gray-300');
      });

      button.classList.remove('bg-white/5', 'border', 'border-white/10', 'text-gray-300');
      button.classList.add('bg-accent-500', 'text-white');

      currentFilter = button.dataset.filter || 'all';
      applyFilter();
    });
  });

  loadMoreBtn?.addEventListener('click', () => {
    const hiddenCards = caseCards.filter(
      (card) => card.classList.contains('hidden-case') && matchesCurrentFilter(card),
    );

    hiddenCards.slice(0, LOAD_MORE_STEP).forEach((card) => {
      card.classList.remove('hidden-case', 'hidden');
      card.style.display = 'block';
    });

    updateLoadMoreButton();
  });

  showMoreFiltersBtn?.addEventListener('click', () => {
    const hiddenFilters = Array.from(filterTabs.querySelectorAll<HTMLElement>('.filter-btn.hidden-filter'));

    filtersExpanded = !filtersExpanded;
    hiddenFilters.forEach((filter) => {
      filter.classList.toggle('hidden', !filtersExpanded);
    });

    if (filtersToggleText) {
      filtersToggleText.textContent = filtersExpanded ? 'Сховати' : `Ще ${hiddenFilters.length}`;
    }

    const icon = showMoreFiltersBtn.querySelector<SVGElement>('svg');
    if (icon) {
      icon.style.transform = filtersExpanded ? 'rotate(45deg)' : 'rotate(0deg)';
    }
  });

  applyFilter();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCasesFilters, { once: true });
} else {
  initCasesFilters();
}

document.addEventListener('astro:page-load', initCasesFilters);
