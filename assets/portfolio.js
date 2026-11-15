
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const header = document.querySelector('.header-shell');
  const progress = header?.querySelector('.scroll-progress span');
  const nav = [...document.querySelectorAll('[data-nav-section]')];
  const sections = nav.map(link => [link, document.getElementById(link.dataset.navSection)]).filter(([, section]) => section);
  const trace = document.querySelector('.circuit-trace');
  const hero = document.querySelector('.hero');
  let scheduled = false;
  const clamp = value => Math.min(1, Math.max(0, value));

  function setCurrent(link) {
    nav.forEach(item => item === link ? item.setAttribute('aria-current', 'location') : item.removeAttribute('aria-current'));
  }

  function updateScroll() {
    scheduled = false;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${distance > 0 ? clamp(scrollY / distance) : 0})`;
    if (sections.length) {
      const line = (header?.offsetHeight || 0) + 120;
      const current = sections.filter(([, section]) => section.getBoundingClientRect().top <= line)
        .sort((a, b) => b[1].getBoundingClientRect().top - a[1].getBoundingClientRect().top)[0]?.[0];
      setCurrent(current);
    }
    if (trace) {
      const drawn = motion.matches ? 1 : clamp(0.65 + scrollY / (hero.offsetHeight * 0.7));
      trace.style.strokeDashoffset = String(1 - drawn);
    }
  }

  function queueScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateScroll);
  }

  if (document.querySelector('.resume-main')) document.querySelector('.nav-resume')?.setAttribute('aria-current', 'page');
  if (document.querySelector('.case-result')) setCurrent(nav.find(link => link.dataset.navSection === 'work'));
  addEventListener('scroll', queueScroll, { passive:true });
  addEventListener('resize', queueScroll);
  motion.addEventListener('change', queueScroll);
  queueScroll();

  const statValues = [...document.querySelectorAll('[data-count]')];
  if (statValues.length && 'IntersectionObserver' in window && !motion.matches) {
    const formatter = new Intl.NumberFormat('en');
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const begin = performance.now();
      function animate(now) {
        const elapsed = motion.matches ? 1 : clamp((now - begin) / 620);
        const eased = 1 - (1 - elapsed) ** 3;
        statValues.forEach(node => { node.textContent = formatter.format(Math.round(Number(node.dataset.count) * eased)); });
        if (elapsed < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    });
    observer.observe(statValues[0].closest('.stats-strip'));
  }

  function trackPointer(element, xName, yName, scale, units) {
    if (!element) return;
    function reset() {
      element.style.removeProperty(xName);
      element.style.removeProperty(yName);
    }
    element.addEventListener('pointermove', event => {
      if (motion.matches || !pointer.matches || event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect();
      element.style.setProperty(xName, `${((event.clientX - box.left) / box.width - 0.5) * scale}${units}`);
      element.style.setProperty(yName, `${((event.clientY - box.top) / box.height - 0.5) * scale}${units}`);
    });
    element.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
  }
  document.querySelectorAll('.project-visual').forEach(item => trackPointer(item, '--tilt-x', '--tilt-y', 6, 'deg'));
  trackPointer(document.querySelector('.hero-actions .primary'), '--magnet-x', '--magnet-y', 8, 'px');

  const palette = document.querySelector('.palette-dialog');
  const paletteButton = document.querySelector('.palette-toggle');
  if (palette?.showModal && paletteButton) {
    const search = palette.querySelector('input');
    const results = [...palette.querySelectorAll('.palette-results li')];
    const empty = palette.querySelector('.palette-empty');
    let opener;
    function openPalette() {
      if (palette.open || document.querySelector('dialog[open]')) return;
      opener = document.activeElement;
      search.value = '';
      results.forEach(result => { result.hidden = false; });
      empty.hidden = true;
      palette.showModal();
      search.focus();
    }
    paletteButton.hidden = false;
    paletteButton.addEventListener('click', openPalette);
    palette.querySelector('[data-palette-close]').addEventListener('click', () => palette.close());
    palette.addEventListener('close', () => opener?.focus({preventScroll:true}));
    palette.addEventListener('click', event => {
      if (event.target === palette || event.target.closest('a')) palette.close();
    });
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      let matches = 0;
      for (const result of results) {
        result.hidden = !result.textContent.toLowerCase().includes(query);
        if (!result.hidden) matches++;
      }
      empty.hidden = matches > 0;
    });
    palette.addEventListener('keydown', event => {
      if (!['Enter','ArrowDown','ArrowUp'].includes(event.key)) return;
      const links = results.filter(item => !item.hidden).map(item => item.firstElementChild);
      if (!links.length) return;
      if (event.key === 'Enter' && event.target === search) {
        event.preventDefault();
        links[0].click();
      } else if (event.key !== 'Enter') {
        event.preventDefault();
        const index = links.indexOf(document.activeElement);
        const step = event.key === 'ArrowDown' ? 1 : -1;
        links[(index < 0 ? (step > 0 ? 0 : links.length - 1) : (index + step + links.length) % links.length)].focus();
      }
    });
    document.addEventListener('keydown', event => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
      event.preventDefault();
      if (palette.open) palette.close();
      else openPalette();
    });
  }

  const lightbox = document.querySelector('.lightbox');
  const photos = [...document.querySelectorAll('[data-gallery-item]')];
  if (lightbox?.showModal && photos.length) {
    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    let index = 0;
    let opener;
    function showPhoto(next) {
      index = (next + photos.length) % photos.length;
      const link = photos[index];
      const original = link.querySelector('img');
      image.src = link.href;
      image.alt = original.alt;
      image.width = original.width;
      image.height = original.height;
      const figure = link.closest('figure');
      caption.textContent = `${index + 1} of ${photos.length} · ${figure.querySelector('h2').textContent} · ${figure.querySelector('small').textContent}`;
    }
    photos.forEach((link, position) => link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      showPhoto(position);
      lightbox.showModal();
      lightbox.querySelector('[data-photo-close]').focus();
    }));
    lightbox.querySelector('[data-photo-close]').addEventListener('click', () => lightbox.close());
    lightbox.querySelector('[data-photo-prev]').addEventListener('click', () => showPhoto(index - 1));
    lightbox.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(index + 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', () => opener?.focus({preventScroll:true}));
    lightbox.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      showPhoto(index + (event.key === 'ArrowRight' ? 1 : -1));
    });
  }

  document.querySelectorAll('.card-preview').forEach(details => {
    details.addEventListener('toggle', () => {
      const video = details.querySelector('video');
      if (!details.open) video.pause();
    });
  });

  const form = document.querySelector('.contact-form[data-netlify]');
  if (form) {
    form.dataset.draftReady = '';
    form.querySelector('button[type="submit"]').textContent = 'Open email draft';
    form.querySelector('[data-draft-note]').hidden = false;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Portfolio enquiry from ' + data.get('name'));
      const body = encodeURIComponent(data.get('message') + '\n\nReply to: ' + data.get('email'));
      location.href = 'mailto:' + form.dataset.draftAddress + '?subject=' + subject + '&body=' + body;
    });
  }

  const print = document.querySelector('[data-print]');
  if (print) {
    print.hidden = false;
    print.addEventListener('click', () => window.print());
  }
})();
