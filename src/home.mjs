
import { achievements, toolsGrid, learningSection, roadmap } from './interactive.mjs';
import { datasetSpotlight, datasetStats, writingSection, githubSection } from './evidence.mjs';
import { profile, projects } from './projects.mjs';
import { page, header, footer, circuit, escape as e, external, arrow } from './components.mjs';
import { collections, workPath } from './work-catalog.mjs';

function projectCard(p) {
  return `<article class="project" data-categories="${p.filters.join(' ')}">
    <a class="project-visual ${p.color} ${p.id}" href="projects/${p.id}/" aria-label="${e(p.category)} · View ${e(p.name)} case study">
      <div class="visual-label mono"><span>${e(p.category)}</span>${arrow}</div>
      <div class="image-frame"><img src="assets/images/${p.image}" alt="${e(p.alt)}" width="1200" height="800" loading="eager" decoding="sync"></div>
    </a>
    <div class="project-heading"><h3><a href="projects/${p.id}/">${e(p.name)}</a></h3></div>
    <p>${e(p.summary)}</p><p class="project-result">${e(p.result)}</p>
${p.video?`<details class="card-preview"><summary>Watch a short preview</summary><video controls loop playsinline preload="none" poster="assets/images/${p.image}" aria-label="${e(p.name)} preview"><source src="assets/demos/${p.video}" type="video/mp4"></video>${p.id==='sancharakaya'?'<p class="caption">Sample trip editing, schedule checks and an offline export.</p>':''}</details>`:''}
  </article>`;
}

const stats = [[projects.length,'Project case studies'],[achievements.filter(a=>a.result.toLowerCase().includes('finalist')).length,'Finalist placements'],[datasetStats.populated,'Word folders with video'],[3,'Campus leadership roles']];

function projectFlight() {
  return `<section id="project-flight" class="project-flight" aria-labelledby="flight-heading" hidden>
    <div class="flight-stage">
      <div class="flight-visual" aria-hidden="true">
        <canvas></canvas>
        ${projects.map(p=>`<figure class="flight-tile${p.id==='signspeak-junior'?' portrait':''}"><img src="assets/images/${p.image}" width="1200" height="750" alt="${e(p.alt)}"><figcaption>${e(p.name)}</figcaption></figure>`).join('')}
      </div>
      <div class="wrap flight-top">
        <div><p class="eyebrow">${projects.length} project case studies</p><h2 id="flight-heading">Project flight<span class="accent">.</span></h2><p class="flight-instruction">Scroll to start the flight.</p></div>
        <a class="text-link flight-skip" href="#work">All projects <span aria-hidden="true">↓</span></a>
        <div class="flight-collections"><label><span>Collection</span><select><option value="cases">Case studies</option>${collections.map(c=>`<option value="${c.id}">${e(c.label)}</option>`).join('')}</select></label><a class="text-link" href="${workPath}">Work index ↗</a><p role="status" hidden></p></div>
      </div>
      <nav class="wrap flight-index" aria-label="Project case studies">
        <div class="flight-meter" aria-hidden="true"><span></span></div>
        <ul>${projects.map((p,i)=>`<li><a href="projects/${p.id}/"><span>${String(i+1).padStart(2,'0')}</span><span>${e(p.name)}</span></a></li>`).join('')}</ul>
      </nav>
    </div>
  </section>`;
}

function contact() {
  return `<section id="contact" class="contact-section" aria-labelledby="contact-heading"><div class="wrap contact-grid">
    <div><p class="eyebrow">Get in touch</p><h2 id="contact-heading">Let’s talk<span>.</span></h2><p>For internships, research collaborations, and engineering projects.</p>
    <a class="button contact-button" href="mailto:${profile.email}">${profile.email} ${arrow}</a></div>
    <form class="contact-form" data-draft-address="${profile.email}" name="portfolio-contact" method="POST" data-netlify="true" netlify-honeypot="website" aria-label="Send a message">
      <p hidden><label>Leave this blank <input name="website" tabindex="-1" autocomplete="off"></label></p>
      <label>Name<input name="name" autocomplete="name" maxlength="120" required></label>
      <label>Email<input name="email" type="email" autocomplete="email" maxlength="254" required></label>
      <label>Message<textarea name="message" rows="4" maxlength="3000" required></textarea></label>
      <button class="button primary" type="submit">Send message ${arrow}</button><p class="caption" data-draft-note hidden>Your email app will open with your message ready to review.</p>
    </form>
  </div></section>`;
}

export function home() {
  const body = `${header()}
  <main id="main">
    <section class="hero wrap" aria-labelledby="hero-heading">
      <div class="hero-copy"><p class="eyebrow">Computer Engineering undergraduate · KDU</p>
        <h1 id="hero-heading">Pamindu<br>Karunadasa<span class="accent">.</span></h1>
        <p class="hero-statement">Building software and applied AI prototypes in Sri Lanka.</p>
        <p class="hero-description">Finalist at AI Challenge Sri Lanka, Data Odyssey and CHYPER 4.0 in 2026.</p>
        <p class="availability"><span class="status-dot" aria-hidden="true"></span> Open to internships · 2026/27</p>
        <div class="hero-actions"><a class="button primary" href="#work">View projects <span aria-hidden="true">↘</span></a><a class="button outline" href="resume/pamindu-karunadasa-resume.pdf" download>Download résumé <span aria-hidden="true">↓</span></a></div>
        <a class="text-link flight-launch" href="#project-flight" hidden>Take the project flight <span aria-hidden="true">↓</span></a>
      </div>
      ${circuit()}
    </section>

    <div class="stats-band"><dl class="wrap stats-strip">${stats.map(([count,label])=>`<div><dt>${label}</dt><dd><span aria-hidden="true" data-count="${count}">${count.toLocaleString('en')}</span><span class="sr-only">${count.toLocaleString('en')}</span></dd></div>`).join('')}</dl></div>

    ${projectFlight()}

    <section id="work" class="section wrap" aria-labelledby="work-heading">
      <div class="section-heading"><div><p class="eyebrow">Selected work</p><h2 id="work-heading">Projects<span class="accent">.</span></h2></div><p class="section-intro">Computer vision, travel tools, hardware and web applications.</p></div>
      <div class="work-controls" hidden><div class="filters" role="group" aria-label="Filter projects"><button aria-pressed="true" data-filter="all">All projects</button><button aria-pressed="false" data-filter="ai">Applied AI</button><button aria-pressed="false" data-filter="software">Software &amp; systems</button><button aria-pressed="false" data-filter="web">Web &amp; design</button></div><span class="filter-count mono" role="status" aria-live="polite">${projects.length} projects</span></div>
      <div class="project-grid">${projects.map(projectCard).join('')}</div>
      <a class="text-link catalog-link" href="${workPath}">Browse all work ↗</a>
    </section>

    ${learningSection()}

    <section id="about" class="about-section" aria-labelledby="about-heading"><div class="wrap about-grid">
      <figure class="about-portrait"><img src="assets/images/pamindu-karunadasa-bcs-kdu-portrait-2026.webp" width="3701" height="5551" alt="Pamindu Karunadasa at the BCS Student Chapter AGM" loading="lazy" decoding="async"><figcaption class="portrait-caption">BCS Student Chapter AGM · View credits in <a href="photos/">Photos &amp; events</a></figcaption></figure>
      <div class="about-copy"><p class="eyebrow">About</p><h2 id="about-heading">From prototype to usable tool<span class="accent">.</span></h2>
        <p class="about-lead">I’m a Computer Engineering undergraduate at General Sir John Kotelawala Defence University. I build projects in gesture recognition, desktop automation and embedded systems.</p>
        <p>I co-founded OULU Academy and lead student initiatives with BCS, IEEE Computer Society and the Electronic Robotics &amp; Innovation Club at KDU.</p>
        <ul class="about-facts"><li>Sri Lanka</li><li>KDU · 2024–2028</li><li>OULU Academy co-founder</li></ul>
        <div class="about-links"><a class="text-link" href="photos/">Photos &amp; events ${arrow}</a>${external(profile.business+'pamindu-karunadasa/','OULU Academy profile')}</div>
      </div>
    </div></section>
    ${datasetSpotlight()}

    <section id="skills" class="section wrap" aria-labelledby="skills-heading"><div class="section-heading"><div><p class="eyebrow">Skills</p><h2 id="skills-heading">Tools<span class="accent">.</span></h2></div></div>${toolsGrid()}</section>

    <figure class="community-photo"><img src="assets/images/pamindu-karunadasa-cre8x-3-lamp-lighting-2026.webp" width="7008" height="4672" alt="Pamindu Karunadasa and guests at the CRE8X 3.0 lamp-lighting ceremony" loading="lazy" decoding="async"><figcaption class="wrap">CRE8X 3.0 opening ceremony · <a href="photos/">View event photos and credits ${arrow}</a></figcaption></figure>

    ${roadmap()}
    ${writingSection()}
    ${githubSection()}
    ${contact()}
  </main>${footer()}<script src="assets/flight.js" defer></script>`;
  return page({title:'Pamindu Karunadasa — Computer Engineering, Applied AI & Design',description:'Computer Engineering undergraduate at KDU, Sri Lanka. Explore Pamindu Karunadasa’s selected engineering projects, competition results, and research.',body});
}
