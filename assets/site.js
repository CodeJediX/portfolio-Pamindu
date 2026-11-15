// Progressive enhancements: all content and destinations work without JavaScript.
(() => {
  // Brief entrance accents; content stays visible if enhancements are unavailable.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (!reducedMotion.matches) entry.target.animate(
          [{ transform: 'translateY(14px)' }, { transform: 'translateY(0)' }],
          { duration: 480, easing: 'cubic-bezier(.2,.7,.2,1)' }
        );
      });
    }, { threshold: .12 });
    document.querySelectorAll('.section-heading, .volunteer-intro, .volunteer-roles').forEach(el => observer.observe(el));
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
    });
  }
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

})();
