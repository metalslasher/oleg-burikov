const initHeader = () => {
  const header = document.getElementById('header');
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!header || header.dataset.headerReady === 'true') return;
  header.dataset.headerReady = 'true';

  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', (!isExpanded).toString());
    mobileMenu.classList.toggle('hidden');
    header.classList.toggle('is-menu-open', !isExpanded);
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      header.classList.remove('is-menu-open');
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader, { once: true });
} else {
  initHeader();
}

document.addEventListener('astro:page-load', initHeader);
