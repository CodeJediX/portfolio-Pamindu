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
    document.documentElement.dataset.loading = '';
    // Start the visible interval after markup is ready, including on repeat visits.
    document.addEventListener('DOMContentLoaded', () => setTimeout(dismiss, 1100), { once: true });
    // Independent hard cap if another script delays DOMContentLoaded.
    setTimeout(dismiss, 3000);
    document.addEventListener('keydown', dismiss, { once: true });
    addEventListener('pageshow', (event) => { if (event.persisted) dismiss(); });
  }
})();
