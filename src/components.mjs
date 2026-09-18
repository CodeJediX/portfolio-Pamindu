import { profile } from './projects.mjs';

export const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const arrow = '<span aria-hidden="true">↗</span>';
export const external = (url, label, cls = 'text-link') => `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;

export function header(base = './', home = true) {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="brand" href="${base}"><span class="brand-mark" aria-hidden="true">p<span>k</span><i></i></span><span class="brand-name">PAMINDU<br>KARUNADASA</span><span class="sr-only"> — home</span></a>
    <button class="menu-toggle" aria-controls="navigation" aria-expanded="false" hidden>Menu <span aria-hidden="true">＋</span></button>
    <nav id="navigation" aria-label="Main navigation"><a href="${home?'':base}#work">Selected work</a><a href="${home?'':base}#about">About</a><a href="${home?'':base}#experience">Experience</a><a class="nav-contact" href="${home?'':base}#contact">Let’s talk ${arrow}</a></nav>
  </header>`;
}

export function footer(base = './') {
  return `<footer class="site-footer wrap"><p>© ${new Date().getUTCFullYear()} Pamindu Karunadasa</p><p class="footer-note">Thoughtfully designed. Built to be useful.</p><a href="${base}#top">Back to top <span aria-hidden="true">↑</span></a></footer>`;
}

export function page({title, description, body, base='./', path='', image='assets/social-preview.png'}) {
  const canonical = profile.site + path;
  const structured = path ? { '@context':'https://schema.org', '@type':'WebPage', name:title, url:canonical, description, author:{'@type':'Person',name:profile.name,url:profile.site} } : {
    '@context':'https://schema.org','@type':'ProfilePage',url:canonical,
    mainEntity:{'@type':'Person', name:profile.name, url:canonical, description, sameAs:[profile.github,profile.linkedin,profile.linktree],affiliation:{'@type':'CollegeOrUniversity',name:'General Sir John Kotelawala Defence University'}},
  };
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${canonical}"><meta name="theme-color" content="#f5f4ef">
<meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${profile.site}${image}"><meta property="og:image:alt" content="Pamindu Karunadasa — Computer Engineering, Applied AI, Software and Design">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${profile.site}${image}">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/site.css"><script src="${base}assets/site.js" defer></script>
<script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>
</head><body id="top">${body}</body></html>`;
}

// A deliberately abstract, original circuit illustration: no model download or WebGL runtime.
export function circuit() {
  const pins = Array.from({length:10},(_,i)=>`<path d="M${188+i*16} ${246-i*8}l-13-7 M${376+i*8} ${244+i*4}l14-7 M${386-i*16} ${342+i*8}l13 7 M${188-i*8} ${266+i*4}l-14 7"/>`).join('');
  return `<div class="circuit" data-exploded="true">
    <div class="figure-top mono"><span>FIG. 01 — A CONNECTED SYSTEM</span><span aria-hidden="true">＋</span></div>
    <svg class="circuit-drawing" viewBox="0 0 560 510" fill="none" role="img" aria-labelledby="circuit-title circuit-desc">
      <title id="circuit-title">From physical inputs to intelligent interfaces</title><desc id="circuit-desc">An exploded isometric circuit diagram with three connected layers: hardware, intelligence, and interface.</desc>
      <defs><pattern id="dot-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#b7b9ae"/></pattern></defs>
      <rect width="560" height="510" fill="url(#dot-grid)"/>
      <g stroke="#bec1b7" stroke-dasharray="4 6"><path d="M108 264v122M280 168v122M452 264v122M280 358v122"/></g>
      <g class="hardware-layer"><path d="M99 370L280 273l181 97v14l-181 97L99 384z" fill="#c4c9bc" stroke="#83917d"/><path d="M99 370l181-97 181 97-181 98z" fill="#e0e4d8" stroke="#83917d"/>
      <g stroke="#99a68e" stroke-width="1.3"><path d="M135 370l145-78 145 78-145 78zM170 370l110-59 110 59-110 59zM205 370l75-40 75 40-75 40zM280 290v42M137 370h69M355 370h68M280 410v40"/></g>
      <g fill="#778970"><circle cx="136" cy="370" r="4"/><circle cx="280" cy="294" r="4"/><circle cx="424" cy="370" r="4"/><circle cx="280" cy="445" r="4"/></g></g>
      <g class="intelligence-layer"><path d="M108 274l172-92 172 92v12l-172 92-172-92z" fill="#363d39" stroke="#1f2722"/><path d="M108 274l172-92 172 92-172 92z" fill="#526052" stroke="#26362b"/>
      <g stroke="#a3b498" stroke-width="1.3"><path d="M131 274l149-79 149 79-149 80zM143 267l52 28 40-22M280 202v43M418 274h-67M280 345v-46M156 284l37-20 40 22M384 288l-42-23M241 333v-29M320 216v27"/>${pins}</g>
      <path d="M214 268l66-35 66 35v17l-66 35-66-35z" fill="#161e18" stroke="#a5b795"/><path d="M214 268l66-35 66 35-66 35z" fill="#202b22" stroke="#adbd9f"/>
      <path d="M241 268l39-21 39 21-39 21z" fill="#d8542e"/><path d="M259 268l21-11 21 11-21 11z" fill="#f1ac83"/></g>
      <g class="interface-layer"><path d="M128 174l152-81 152 81v6l-152 81-152-81z" fill="#dce1d6" fill-opacity=".88" stroke="#788772"/><path d="M128 174l152-81 152 81-152 81z" fill="#f0f2e9" fill-opacity=".94" stroke="#788772"/>
      <g stroke="#93a08b"><path d="M153 174l127-68 127 68-127 68zM175 174l105-56 105 56-105 56zM220 149l119 63M197 162l119 63"/></g>
      <path d="M224 172l56-30 56 30-56 30z" fill="#f5f4ef" stroke="#718069"/><path d="M263 177l-13-7 13-7M297 177l13-7-13-7M284 158l-8 24" stroke="#be4525" stroke-width="2.5"/>
      <g fill="#b34224"><circle cx="153" cy="174" r="3"/><circle cx="407" cy="174" r="3"/></g></g>
      <g class="diagram-labels" stroke="#70766b"><path d="M403 139h57M445 298h33M117 425H58"/></g>
      <g class="diagram-labels" fill="#52604f" font-family="monospace" font-size="10"><text x="401" y="130">INTERFACE</text><text x="404" y="315">INTELLIGENCE</text><text x="38" y="444">HARDWARE</text></g>
    </svg>
    <div class="figure-bottom"><span class="mono">HARDWARE × INTELLIGENCE × INTERFACE</span><button class="layer-toggle" aria-pressed="true" hidden>Assemble layers <span aria-hidden="true">↙</span></button></div>
  </div>`;
}
