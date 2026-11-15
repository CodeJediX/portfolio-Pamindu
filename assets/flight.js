(() => {
  const flight = document.querySelector('.project-flight');
  if (!flight || !CSS.supports('position', 'sticky')) return;

  const stage = flight.querySelector('.flight-stage');
  const visual = flight.querySelector('.flight-visual');
  const canvas = visual.querySelector('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  const tiles = [...visual.querySelectorAll('.flight-tile')];
  const links = [...flight.querySelectorAll('.flight-index a')];
  const meter = flight.querySelector('.flight-meter span');
  const launch = document.querySelector('.flight-launch');
  const header = document.querySelector('.header-shell');
  const motion = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 421px)');
  const clamp = value => Math.max(0, Math.min(1, value));
  function smooth(start, end, value) {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  }

  // Trace a chip and its pins as a flat drawing, then give each point its own depth.
  const paths = [
    [[-49,-49],[49,-49],[49,49],[-49,49],[-49,-49]],
    [[-27,25],[-27,-24],[-6,-24],[2,-16],[2,-7],[-6,1],[-27,1]],
    [[15,-24],[15,25]], [[36,-24],[15,1],[38,25]],
  ];
  for (const pin of [-36, -12, 12, 36]) {
    paths.push([[pin,-50],[pin,-72]], [[pin,50],[pin,72]], [[-50,pin],[-72,pin]], [[50,pin],[72,pin]]);
  }
  const points = [];
  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      const [x, y] = path[i - 1];
      const [endX, endY] = path[i];
      const steps = Math.ceil(Math.hypot(endX - x, endY - y) / 3);
      for (let j = 0; j < steps; j++) {
        const part = j / steps;
        const index = points.length;
        points.push([x + (endX - x) * part, y + (endY - y) * part, (index * .618) % 1, index * 2.4]);
      }
    }
  }

  let width = 0;
  let height = 0;
  let headerHeight = 0;
  let position = 0;
  let active = -1;
  let frame = 0;
  let lastFrame = 0;
  let inView = false;
  let needsMeasure = true;
  const tracks = [-.15, .13, -.11, .13];
  const lanes = [-.07, .08, .06, -.05];

  function drawField(progress) {
    context.clearRect(0, 0, width, height);
    const unit = Math.min(width / 265, height / 166, 2.5);
    const separation = smooth(.01, .46, progress);
    const fieldAlpha = 1 - smooth(.86, 1, progress);
    const middleX = width / 2;
    const middleY = height / 2;
    context.fillStyle = '#31e2ff';
    for (const [x, y, depth, angle] of points) {
      const perspective = 1 + separation * (.6 + depth * 6.3);
      const spread = separation * depth * 29;
      const screenX = middleX + (x * perspective + Math.cos(angle) * spread) * unit;
      const screenY = middleY + (y * perspective + Math.sin(angle) * spread) * unit;
      const size = (1.7 + separation * depth * 2.9) * unit;
      context.globalAlpha = fieldAlpha * (.55 + depth * .43) * (1 - separation * .49);
      context.fillRect(screenX - size / 2, screenY - size / 2, size, size);
    }
    context.globalAlpha = 1;
  }

  function placeTiles(progress) {
    let closest = -1;
    let closestDistance = .105;
    tiles.forEach((tile, i) => {
      const center = (i + 1) / (tiles.length + 1);
      const distance = center - progress;
      const forward = clamp(-distance / .16);
      const depth = clamp(distance / .42);
      const scale = distance > 0 ? 1 / (1 + distance * 6.4) : 1 + forward * .68;
      const wake = i ? smooth(.045, .13, progress) : smooth(.025, .13, progress);
      const opacity = wake * (1 - smooth(.01, .42, distance)) * (1 - smooth(.035, .135, -distance));
      const x = width * tracks[i] * (.80 + depth * 1.65 + forward * 1.3);
      const y = height * lanes[i] * (.70 + depth + forward);
      tile.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      tile.style.opacity = opacity.toFixed(3);
      tile.style.zIndex = String(Math.round((1 - distance) * 100));
      if (Math.abs(distance) < closestDistance) {
        closest = i;
        closestDistance = Math.abs(distance);
      }
    });
    if (active !== closest) {
      links[active]?.removeAttribute('data-in-view');
      links[closest]?.setAttribute('data-in-view', '');
      active = closest;
    }
  }

  function measure() {
    needsMeasure = false;
    headerHeight = header?.offsetHeight || 0;
    flight.style.setProperty('--flight-header', `${headerHeight}px`);
    width = visual.clientWidth;
    height = visual.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function render(now) {
    frame = 0;
    if (flight.hidden) return;
    if (needsMeasure) measure();
    const runway = flight.offsetHeight - stage.offsetHeight;
    const bounds = flight.getBoundingClientRect();
    const visible = bounds.top < innerHeight && bounds.bottom > headerHeight;
    if (!visible) {
      inView = false;
      lastFrame = 0;
      return;
    }
    const target = runway ? clamp((headerHeight - bounds.top) / runway) : 0;
    const elapsed = lastFrame ? Math.min(now - lastFrame, 48) : 16;
    if (!inView || Math.abs(target - position) < .0005) position = target;
    else position += (target - position) * (1 - Math.exp(-elapsed / 68));
    inView = true;
    lastFrame = now;
    meter.style.transform = `scaleX(${position})`;
    drawField(position);
    placeTiles(position);
    if (position !== target) schedule();
  }

  function schedule() {
    if (!frame && !flight.hidden) frame = requestAnimationFrame(render);
  }

  function resize() {
    needsMeasure = true;
    schedule();
  }

  function setAvailability() {
    flight.hidden = !motion.matches;
    if (launch) launch.hidden = flight.hidden;
    resize();
  }

  if (header && 'ResizeObserver' in window) new ResizeObserver(resize).observe(header);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', resize);
  motion.addEventListener('change', setAvailability);
  setAvailability();
})();
