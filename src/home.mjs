import { skillsDeck, learningSection, roadmap } from './interactive.mjs';
import {profile, projects} from './projects.mjs';
import {page, header, footer, circuit, escape as e, external, arrow} from './components.mjs';

function projectCard(p,i) {
  return `<article class="project" data-categories="${p.filters.join(' ')}">
    <a class="project-visual ${p.color} ${p.id}" href="projects/${p.id}/"><span class="sr-only">Explore ${e(p.name)} — </span>
      <div class="visual-label mono"><span>${String(i+1).padStart(2,'0')} / ${e(p.category)}</span>${arrow}</div>
      <div class="image-frame"><img src="assets/images/${p.image}" alt="${e(p.alt)}" width="1200" height="800" loading="lazy" decoding="async"></div>
      <span class="visual-bottom mono">${e(p.stack.slice(0,3).join(' / '))}</span>
    </a>
    <div class="project-heading"><h3><a href="projects/${p.id}/">${e(p.name)} ${arrow}</a></h3><span class="mono">${e(p.category)}</span></div>
    <p>${e(p.summary)}</p>
  </article>`;
}

export function home() {
 const body = `${header()}
  <main id="main">
    <section class="hero wrap" aria-labelledby="hero-heading">
      <div class="hero-copy"><p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> COMPUTER ENGINEERING UNDERGRADUATE</p>
        <h1 id="hero-heading">Pamindu<br>Karunadasa<span class="accent">.</span></h1>
        <p class="hero-statement">Curious about how things work.<br>Driven to build what comes next.</p>
        <p class="hero-description">I connect software, applied AI, and thoughtful design to turn engineering ideas into things people can use.</p>
        <div class="hero-actions"><a class="button primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a>${external(profile.github,'GitHub')}</div>
        <div class="hero-location mono"><span>BASED IN SRI LANKA</span><span>STUDYING AT KDU</span></div>
      </div>
      ${circuit()}
    </section>
    <div class="discipline-strip wrap" aria-label="Areas of interest"><span>Software development</span><i aria-hidden="true">✳</i><span>Applied intelligence</span><i aria-hidden="true">✳</i><span>Hardware & systems</span><i aria-hidden="true">✳</i><span>Digital experiences</span></div>

    <section id="work" class="section wrap" aria-labelledby="work-heading">
      <div class="section-heading"><div><p class="eyebrow">01 / SELECTED WORK</p><h2 id="work-heading">Ideas, put to work<span class="accent">.</span></h2></div><p class="section-intro">A closer look at the systems I build,<br>the problems they address, and the thinking behind them.</p></div>
      <div class="work-controls" hidden><div class="filters" role="group" aria-label="Filter projects"><button aria-pressed="true" data-filter="all">All work <span>${String(projects.length).padStart(2,'0')}</span></button><button aria-pressed="false" data-filter="ai">Applied AI</button><button aria-pressed="false" data-filter="software">Software & systems</button><button aria-pressed="false" data-filter="web">Web & design</button></div><span class="filter-count mono" role="status" aria-live="polite">${projects.length} projects</span></div>
      <div class="project-grid">${projects.map(projectCard).join('')}</div>
      <div class="work-end"><span class="mono">A CURATED SELECTION, WITH SOURCE CODE.</span>${external(profile.github+'?tab=repositories','Explore GitHub')}</div>
    </section>

    <section id="about" class="about-section" aria-labelledby="about-heading"><div class="wrap about-grid">
      <div class="about-portrait"><img src="assets/images/pamindu.webp" width="640" height="800" alt="Pamindu Karunadasa" loading="lazy" decoding="async"><div class="portrait-caption mono"><span>PAMINDU KARUNADASA</span><span>SRI LANKA ↗</span></div></div>
      <div class="about-copy"><p class="eyebrow">02 / THE PERSON BEHIND THE PROJECTS</p><h2 id="about-heading">An engineering mind.<br>A designer’s eye.</h2>
        <p class="about-lead">I’m a Computer Engineering undergraduate at General Sir John Kotelawala Defence University, exploring the space where software meets the physical world.</p>
        <p>My work spans gesture recognition, desktop automation, application development, and visual communication. I enjoy understanding a problem from the system underneath to the interface someone actually uses.</p>
        <p>I’m interested in applied AI, robotics, embedded systems, and research that connects an idea to a useful working prototype.</p>
        <div class="about-links">${external(profile.linkedin,'More about me on LinkedIn')}${external(profile.linktree,'Around the web')}</div>
      </div>
    </div></section>

    <section id="skills" class="section wrap" aria-labelledby="skills-heading"><div class="section-heading"><div><p class="eyebrow">03 / TOOLS & APPROACH</p><h2 id="skills-heading">The right tool.<br>For a real problem.</h2></div><p class="section-intro">Technologies used across my projects.<br>A practical toolkit, shaped by the work.</p></div>
      ${skillsDeck()}
    </section>
    ${learningSection()}
    ${roadmap()}

    <section id="contact" class="contact-section" aria-labelledby="contact-heading"><div class="wrap"><p class="eyebrow">06 / LET’S CONNECT</p><div class="contact-main"><h2 id="contact-heading">Have something<br>in mind<span>?</span></h2><div><p>For internship opportunities, research conversations, or a project worth building together.</p><a class="button contact-button" href="mailto:${profile.email}">Say hello ${arrow}</a></div></div><div class="contact-bottom"><a class="email-link" href="mailto:${profile.email}">${profile.email}</a><div>${external(profile.linkedin,'LinkedIn')}${external(profile.github,'GitHub')}${external(profile.linktree,'Linktree')}</div></div></div></section>
  </main>${footer()}`;
 return page({title:'Pamindu Karunadasa — Computer Engineering, Applied AI & Design', description:'Computer Engineering undergraduate at KDU, Sri Lanka. Explore Pamindu Karunadasa’s selected work in applied AI, software, hardware, and digital design.',body});
}
