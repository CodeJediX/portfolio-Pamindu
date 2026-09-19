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
  let seen = false;
  try { seen = sessionStorage.getItem('portfolio-welcome') === 'seen'; } catch {}
  if (!seen && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.dataset.loading = '';
    try { sessionStorage.setItem('portfolio-welcome', 'seen'); } catch {}
    // Hard cap also works if the main enhancement script fails to load.
    setTimeout(dismiss, 700);
    document.addEventListener('keydown', dismiss, { once: true });
    addEventListener('pageshow', (event) => { if (event.persisted) dismiss(); });
  }
})();
