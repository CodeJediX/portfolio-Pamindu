// Progressive enhancements: all content and destinations work without JavaScript.
(() => {
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let hasExplicitTheme = false;
  try { hasExplicitTheme = ['light', 'dark'].includes(localStorage.getItem('portfolio-theme')); } catch {}
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111813' : '#f5f4ef';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
      themeButton.querySelector('.theme-label').textContent = 'Dark';
    }
  };
  if (themeButton) {
    themeButton.hidden = false;
    applyTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
    themeButton.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      hasExplicitTheme = true;
      try { localStorage.setItem('portfolio-theme', theme); } catch {}
      applyTheme(theme);
    });
  }
  systemTheme.addEventListener('change', (event) => {
    if (!hasExplicitTheme) applyTheme(event.matches ? 'dark' : 'light');
  });

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const mobile = matchMedia('(max-width: 760px)');
  if (toggle && navigation) {
    toggle.hidden = false;
    navigation.dataset.enhanced = '';
    const setOpen = (open, restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      navigation.toggleAttribute('data-open', open);
      toggle.firstChild.textContent = open ? 'Close ' : 'Menu ';
      toggle.querySelector('span').textContent = open ? '−' : '＋';
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a') && mobile.matches) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) setOpen(false);
    });
    mobile.addEventListener('change', () => setOpen(false));
  }

  const controls = document.querySelector('.work-controls');
  if (controls) {
    controls.hidden = false;
    const projects = [...document.querySelectorAll('.project')];
    controls.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        controls.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        let count = 0;
        projects.forEach((project) => {
          const visible = button.dataset.filter === 'all' || project.dataset.categories.split(' ').includes(button.dataset.filter);
          project.hidden = !visible;
          if (visible) count++;
        });
        controls.querySelector('.filter-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
      });
    });
  }

  const circuit = document.querySelector('.circuit');
  if (circuit) {
    const button = circuit.querySelector('.layer-toggle');
    const drawing = circuit.querySelector('svg');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(pointer: fine)');
    button.hidden = false;
    button.addEventListener('click', () => {
      const exploded = circuit.dataset.exploded !== 'true';
      circuit.dataset.exploded = String(exploded);
      button.setAttribute('aria-pressed', String(exploded));
      button.firstChild.textContent = exploded ? 'Assemble layers ' : 'Explore layers ';
    });
    const reset = () => { drawing.style.removeProperty('--rx'); drawing.style.removeProperty('--ry'); };
    // Event-driven transform only: no idle rendering loop, camera access, or mobile tilt.
    circuit.addEventListener('pointermove', (event) => {
      if (motion.matches || !pointer.matches) return;
      const bounds = circuit.getBoundingClientRect();
      drawing.style.setProperty('--rx', `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 5}deg`);
      drawing.style.setProperty('--ry', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 5}deg`);
    });
    circuit.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    pointer.addEventListener('change', reset);
  }
})();
