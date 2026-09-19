// Run before styles paint: preserve a visitor's choice without a theme flash.
(() => {
  let choice;
  try { choice = localStorage.getItem('portfolio-theme'); } catch {}
  const theme = choice === 'light' || choice === 'dark'
    ? choice : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#111813' : '#f5f4ef';
  const dismiss = () => document.documentElement.removeAttribute('data-loading');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Start the visible interval after markup is ready, including on repeat visits.
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.dataset.loading = '';
      setTimeout(dismiss, 1100);
    }, { once: true });
    document.addEventListener('keydown', dismiss, { once: true });
    addEventListener('pageshow', (event) => { if (event.persisted) dismiss(); });
  }
})();
