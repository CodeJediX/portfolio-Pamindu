import { profile, projects } from './projects.mjs';
import { photos } from './photo-data.mjs';

export const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const arrow = '<span aria-hidden="true">↗</span>';
export const external = (url, label, cls = 'text-link') => `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;

const navItems = [
  ['work','Projects'], ['achievements','Achievements'], ['experience','Experience'],
  ['about','About'], ['contact','Contact'],
];
const moreItems = [['skills','Tools'], ['certifications','Certificates'], ['volunteering','Volunteering'], ['research','Research & writing'], ['now','Now'], ['github','GitHub activity']];

export function header(base = './', home = true) {
  const icon = (name,path)=>`<svg class="theme-${name}" aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="${path}"/></svg>`;
  return `<a class="skip-link" href="#main">Skip to content</a>
  <div class="header-shell"><header class="site-header wrap">
    <a class="brand" href="${base}"><span class="brand-mark" aria-hidden="true">p<span>k</span><i></i></span><span class="brand-name">PAMINDU<br>KARUNADASA</span><span class="sr-only"> — home</span></a>
    <div class="header-controls">
      <button class="palette-toggle" type="button" aria-label="Find a page or section" aria-keyshortcuts="Control+k Meta+k" hidden><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/></svg></button>
      <button class="theme-toggle" type="button" aria-label="Switch to light theme" hidden>${icon('sun','M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4 M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0')}${icon('moon','M20 14.4A8.5 8.5 0 0 1 9.6 4a8.5 8.5 0 1 0 10.4 10.4Z')}</button>
      <button class="menu-toggle" aria-controls="navigation" aria-expanded="false" hidden>Menu <span aria-hidden="true">＋</span></button>
    </div>
    <nav id="navigation" aria-label="Main navigation">${navItems.map(([id,label])=>`<a href="${home?'':base}#${id}" data-nav-section="${id}">${label}</a>`).join('')}<a class="nav-resume" href="${base}resume/">Résumé</a></nav>
  </header><div class="scroll-progress" aria-hidden="true"><span></span></div></div>`;
}

export function footer(base = './') {
  const shortcuts = [...navItems,...moreItems].map(([id,label])=>[base+'#'+id,label]);
  const pages = [[base+'photos/','Photos & events'],[base+'resume/','Résumé'],[base+'datasets/sign-language-recognition/','Sign language dataset']];
  const links = [...shortcuts, ...pages,...projects.map(p=>[base+'projects/'+p.id+'/',p.name])];
  return `<footer class="site-footer connected-footer"><div class="wrap">
    <div class="footer-heading"><a class="footer-signature" href="${base}">Pamindu<span class="accent">.</span></a><a class="footer-top" href="${base}#top" aria-label="Back to top">↑</a></div>
    <div class="footer-columns">
      <div><p class="eyebrow">Explore</p>${shortcuts.slice(0,8).map(([url,label])=>`<a href="${url}">${label}</a>`).join('')}</div>
      <div><p class="eyebrow">More from Pamindu</p>${[...shortcuts.slice(8),...pages].map(([url,label])=>`<a href="${url}">${label}</a>`).join('')}</div>
      <div><p class="eyebrow">Online</p>${external(profile.github,'GitHub')}${external(profile.linkedin,'LinkedIn')}${external(profile.kaggle,'Kaggle')}${external(profile.linktree,'Linktree')}</div>
    </div>
    <div class="footer-bottom mono"><span>© ${new Date().getUTCFullYear()} Pamindu Karunadasa</span></div></div></footer>
    <dialog class="palette-dialog" aria-labelledby="palette-heading"><div class="dialog-heading"><h2 id="palette-heading">Find a page</h2><button type="button" data-palette-close aria-label="Close search">×</button></div>
      <label class="sr-only" for="palette-search">Search pages and sections</label><input id="palette-search" type="search" autocomplete="off" placeholder="Search projects or sections…">
      <ul class="palette-results">${links.map(([url,label])=>`<li><a href="${url}">${escape(label)}</a></li>`).join('')}</ul><p class="palette-empty" hidden>No matching pages.</p></dialog>`;
}
export function page({title, description, body, base='./', path='', image='assets/social-preview.png', structuredData=null}) {
  const canonical = profile.site + path;
  const person = {
    '@type':'Person', '@id':profile.site+'#person', name:profile.name,
    alternateName:'Pamindu Pasandul Karunadasa', url:profile.site,
    image:[profile.site+'assets/images/pamindu.webp',...photos.map(p=>profile.site+'assets/photos/'+p.file)],
    sameAs:[profile.github,profile.linkedin,profile.instagram,profile.kaggle,profile.linktree],
    affiliation:{'@type':'CollegeOrUniversity',name:'General Sir John Kotelawala Defence University'},
    worksFor:{'@type':'EducationalOrganization','@id':profile.business+'#academy',name:'OULU Academy',url:profile.business},
  };
  const structured = structuredData || (path ? { '@context':'https://schema.org', '@type':'WebPage', name:title, url:canonical, description, author:person } : {
    '@context':'https://schema.org','@type':'ProfilePage',url:canonical,
    mainEntity:{...person,description},
  });
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
${!path && profile.googleSiteVerification ? `<meta name="google-site-verification" content="${escape(profile.googleSiteVerification)}">` : ''}
<meta name="robots" content="${path==='404.html'?'noindex, follow':'index, follow, max-image-preview:large'}">
<link rel="canonical" href="${canonical}"><meta name="theme-color" content="#09152f" data-light-color="#f0f7ff">
<script src="${base}assets/appearance-init.js"></script>
<meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${profile.site}${image}"><meta property="og:image:alt" content="Pamindu Karunadasa — Computer Engineering, Applied AI, Software and Design">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${profile.site}${image}">
<link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/site.css"><link rel="stylesheet" href="${base}assets/appearance.css"><script src="${base}assets/site.js" defer></script><link rel="stylesheet" href="${base}assets/spatial.css"><script src="${base}assets/spatial.js" defer></script><link rel="stylesheet" href="${base}assets/portfolio.css"><script src="${base}assets/portfolio.js" defer></script>
<script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>
</head><body id="top"><div class="preloader" aria-hidden="true"><div class="preloader-inner"><span class="preloader-monogram">pk<span>.</span></span><span class="mono">PAMINDU KARUNADASA</span><span class="preloader-rule"></span><span class="preloader-caption mono">ENGINEERING · DESIGN · CURIOSITY</span></div></div>${body}</body></html>`;
}

// A deliberately abstract, original circuit illustration: no model download or WebGL runtime.
export function circuit() {
  const pins = Array.from({length:10},(_,i)=>`<path d="M${188+i*16} ${246-i*8}l-13-7 M${376+i*8} ${244+i*4}l14-7 M${386-i*16} ${342+i*8}l13 7 M${188-i*8} ${266+i*4}l-14 7"/>`).join('');
  return `<div class="circuit" data-exploded="true">
    <div class="figure-top mono"><span>FIG. 01 — A CONNECTED SYSTEM</span><span aria-hidden="true">＋</span></div>
    <div class="core-stage"><svg class="circuit-drawing" viewBox="0 0 560 510" fill="none" role="img" aria-labelledby="circuit-title circuit-desc">
      <title id="circuit-title">From physical inputs to intelligent interfaces</title><desc id="circuit-desc">An exploded isometric circuit diagram with three connected layers: hardware, intelligence, and interface.</desc>
      <defs><pattern id="dot-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="var(--line)"/></pattern></defs>
      <rect width="560" height="510" fill="url(#dot-grid)"/>
      <g stroke="var(--line)" stroke-dasharray="4 6"><path class="circuit-trace" pathLength="1" d="M108 264v122M280 168v122M452 264v122M280 358v122"/></g>
      <g class="hardware-layer"><path d="M99 370L280 273l181 97v14l-181 97L99 384z" fill="#0b2341" stroke="#477ca2"/><path d="M99 370l181-97 181 97-181 98z" fill="#133252" stroke="#477ca2"/>
      <g stroke="#3d698c" stroke-width="1.3"><path d="M135 370l145-78 145 78-145 78zM170 370l110-59 110 59-110 59zM205 370l75-40 75 40-75 40zM280 290v42M137 370h69M355 370h68M280 410v40"/></g>
      <g fill="#6eb8d2"><circle cx="136" cy="370" r="4"/><circle cx="280" cy="294" r="4"/><circle cx="424" cy="370" r="4"/><circle cx="280" cy="445" r="4"/></g></g>
      <g class="intelligence-layer"><path d="M108 274l172-92 172 92v12l-172 92-172-92z" fill="#0c3051" stroke="#4b8db1"/><path d="M108 274l172-92 172 92-172 92z" fill="#15446b" stroke="#67b9d2"/>
      <g stroke="#7bc9df" stroke-width="1.3"><path d="M131 274l149-79 149 79-149 80zM143 267l52 28 40-22M280 202v43M418 274h-67M280 345v-46M156 284l37-20 40 22M384 288l-42-23M241 333v-29M320 216v27"/>${pins}</g>
      <path d="M214 268l66-35 66 35v17l-66 35-66-35z" fill="#07192d" stroke="#60b7d4"/><path d="M214 268l66-35 66 35-66 35z" fill="#0b2647" stroke="#80d8ed"/>
      <path d="M241 268l39-21 39 21-39 21z" fill="var(--signal)"/><path d="M259 268l21-11 21 11-21 11z" fill="#c5f8ff"/></g>
      <g class="interface-layer"><path d="M128 174l152-81 152 81v6l-152 81-152-81z" fill="#123755" fill-opacity=".88" stroke="#57a0c1"/><path d="M128 174l152-81 152 81-152 81z" fill="#1c4768" fill-opacity=".94" stroke="#57a0c1"/>
      <g stroke="#558cac"><path d="M153 174l127-68 127 68-127 68zM175 174l105-56 105 56-105 56zM220 149l119 63M197 162l119 63"/></g>
      <path d="M224 172l56-30 56 30-56 30z" fill="#0c2744" stroke="#78c6df"/><path d="M263 177l-13-7 13-7M297 177l13-7-13-7M284 158l-8 24" stroke="var(--signal)" stroke-width="2.5"/>
      <g fill="var(--signal)"><circle cx="153" cy="174" r="3"/><circle cx="407" cy="174" r="3"/></g></g>
      <g class="diagram-labels" stroke="var(--muted)"><path d="M403 139h57M445 298h33M117 425H58"/></g>
      <g class="diagram-labels" fill="var(--muted)" font-family="monospace" font-size="10"><text x="401" y="130">INTERFACE</text><text x="404" y="315">INTELLIGENCE</text><text x="38" y="444">HARDWARE</text></g>
    </svg><button class="core-trigger" aria-label="Press to explore the circuit, skills, certifications and volunteering" aria-expanded="false" aria-controls="core-tiles" hidden><span class="core-hint mono">PRESS TO EXPLORE <span aria-hidden="true">↗</span></span></button><div class="core-fragments" aria-hidden="true"></div><div id="core-tiles" class="core-tiles" hidden><a href="#skills"><span class="mono">01 / TOOLKIT</span><strong>Code & build</strong><span>Python · JavaScript ↗</span></a><a href="projects/signspeak/"><span class="mono">02 / INTELLIGENCE</span><strong>AI & vision</strong><span>SignSpeak ↗</span></a><a href="#certifications"><span class="mono">03 / LEARNING</span><strong>Credentials</strong><span>Explore certificates ↗</span></a><a href="#volunteering"><span class="mono">04 / COMMUNITY</span><strong>Leadership</strong><span>ERIC · IEEE CS · BCS ↗</span></a><a href="#work"><span class="mono">05 / SYSTEMS</span><strong>Selected work</strong><span>Browse the projects ↗</span></a><a href="#contact"><span class="mono">06 / CONNECT</span><strong>Let’s talk</strong><span>Build something useful ↗</span></a></div></div>
    <div class="figure-bottom"><span class="mono">HARDWARE × INTELLIGENCE × INTERFACE</span><button class="layer-toggle" aria-pressed="false" aria-expanded="false" aria-controls="core-tiles" hidden>Explore the system <span aria-hidden="true">↙</span></button></div>
  </div>`;
}
