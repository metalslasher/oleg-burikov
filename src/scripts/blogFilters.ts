const initBlogFilters = () => {
  const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-blog-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-blog-category]'));
  if (!filterButtons.length || !cards.length) return;

  const filterRoot = filterButtons[0].parentElement;
  if (!filterRoot || filterRoot.dataset.blogFiltersReady === 'true') return;
  filterRoot.dataset.blogFiltersReady = 'true';

  const setActive = (activeButton: HTMLButtonElement) => {
    filterButtons.forEach((button) => {
      if (button === activeButton) {
        button.classList.add('bg-accent-500', 'text-white');
        button.classList.remove('bg-white/5', 'text-gray-300', 'border', 'border-white/10');
      } else {
        button.classList.remove('bg-accent-500', 'text-white');
        button.classList.add('bg-white/5', 'text-gray-300', 'border', 'border-white/10');
      }
    });
  };

  const applyFilter = (filterValue: string) => {
    const showAll = filterValue === 'Усі теми';
    cards.forEach((card) => {
      const match = showAll || card.dataset.blogCategory === filterValue;
      card.classList.toggle('hidden', !match);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActive(button);
      applyFilter(button.dataset.blogFilter || 'Усі теми');
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogFilters, { once: true });
} else {
  initBlogFilters();
}

document.addEventListener('astro:page-load', initBlogFilters);
