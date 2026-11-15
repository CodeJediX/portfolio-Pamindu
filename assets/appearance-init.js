// Run before styles paint: preserve a visitor's choice without a theme flash.
(() => {
  const meta = document.querySelector('meta[name="theme-color"]');
  const midnightColor = meta.content;
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    meta.content = theme === 'light' ? meta.dataset.lightColor : midnightColor;
  };

  let choice;
  try { choice = localStorage.getItem('portfolio-theme'); } catch {}
  applyTheme(choice === 'light' ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const updateToggle = () => {
      toggle.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    };
    updateToggle();
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('portfolio-theme', theme); } catch {}
      applyTheme(theme);
      updateToggle();
    });
  }, { once: true });

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
