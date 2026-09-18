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
      <div class="work-controls" hidden><div class="filters" role="group" aria-label="Filter projects"><button aria-pressed="true" data-filter="all">All work <span>06</span></button><button aria-pressed="false" data-filter="ai">Applied AI</button><button aria-pressed="false" data-filter="software">Software & systems</button><button aria-pressed="false" data-filter="web">Web & design</button></div><span class="filter-count mono" role="status" aria-live="polite">6 projects</span></div>
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
      <div class="skills-table">
        <div><h3><span class="mono">01</span> Languages</h3><p>Python · JavaScript · TypeScript · C# · Java</p><a href="projects/hotel-management/">Desktop & application work ${arrow}</a></div>
        <div><h3><span class="mono">02</span> AI & vision</h3><p>TensorFlow · Keras · MediaPipe · OpenCV · Gemini</p><a href="projects/signspeak/">Recognition & interaction ${arrow}</a></div>
        <div><h3><span class="mono">03</span> Web & data</h3><p>React · Next.js · Flask · Streamlit · Supabase · SQLite</p><a href="projects/createx/">Web platform work ${arrow}</a></div>
        <div><h3><span class="mono">04</span> Build & design</h3><p>Git · Docker · Arduino · Canva · Photoshop</p><a href="#beyond">Hardware & visual work ${arrow}</a></div>
      </div>
    </section>

    <section id="experience" class="experience-section" aria-labelledby="experience-heading"><div class="wrap experience-grid"><div class="experience-title"><p class="eyebrow">04 / EXPERIENCE & RECOGNITION</p><h2 id="experience-heading">Learning by doing.<br>Growing with others.</h2><p>Engineering projects, creative work, and the communities that connect them.</p>${external(profile.linkedin,'View professional profile')}</div>
      <div class="timeline">
        <article><span class="mono">2026 / COMPETITION</span><h3>Data Odyssey — Final round</h3><p>SignSpeak with team Quantum-X: sign recognition and an interactive learning experience.</p></article>
        <article><span class="mono">2025 / RECOGNITION</span><h3>TensorForge — 2nd runner-up</h3><p>AI Buildathon, IEEE Computer Society of KDU.</p></article>
        <article><span class="mono">2025 / DESIGN</span><h3>PixelWave — Top 20 finalist</h3><p>Inter-university digital art competition, IEEE Computer Society of KDU.</p></article>
        <article><span class="mono">COMMUNITY / DESIGN & LEADERSHIP</span><h3>ERIC, IEEE & BCS at KDU</h3><p>Visual communication for the ERIC Club, the INSPIRE magazine, and SPARK workshop. Event and project leadership across student communities.</p></article>
        <article><span class="mono">INDUSTRY / EARLY EXPERIENCE</span><h3>IT internship · Sampath Bank</h3><p>Early industry exposure alongside my path into computer engineering.</p></article>
      </div>
    </div></section>

    <section id="beyond" class="section wrap" aria-labelledby="beyond-heading"><div class="section-heading"><div><p class="eyebrow">05 / BEYOND THE SCREEN</p><h2 id="beyond-heading">A wider way of thinking.</h2></div><p class="section-intro">Building with hardware.<br>Communicating through design.</p></div>
      <div class="beyond-grid"><article class="hardware-story"><img src="assets/images/wastewiz.webp" width="900" height="650" alt="The Waste-Wiz project team presenting their smart-bin prototype" loading="lazy" decoding="async"><div><span class="eyebrow">HARDWARE / PROTOTYPE</span><h3>Waste-Wiz</h3><p>A smart-bin prototype exploring proximity sensing and servo-driven lids for waste sorting. A hands-on study in connecting sensors, control logic, and a physical mechanism.</p><details><summary>Project notes <span aria-hidden="true">＋</span></summary><p>The original portfolio documents a paper/plastic sorting concept using sensors, servos, and embedded control. These are original prototype photographs; a public source repository and measured sorting performance are not available.</p><a class="text-link" href="assets/images/wastewiz-detail.webp">View prototype photograph ${arrow}</a></details></div></article>
      <article class="design-story"><span class="eyebrow">VISUAL COMMUNICATION / EDITORIAL</span><div class="editorial-title" aria-hidden="true">Inspire<span>ideas into<br>perspective.</span></div><h3>INSPIRE · KDU ERIC</h3><p>Main designer of the club’s magazine, responsible for layout and visual design, with an article contribution. A chance to make engineering ideas engaging beyond the code.</p><p class="design-tools mono">CANVA · PHOTOSHOP · EDITORIAL DESIGN</p>${external(profile.linkedin,'View design experience')}<span class="design-footnote">Magazine project · Published August 2025</span></article></div>
      <div class="other-work"><span class="eyebrow">ALSO IN THE WORKSHOP</span><h3>Car Rental System</h3><p>A Java desktop project, retained as supporting application work.</p>${external('https://github.com/CodeJediX/Car_Rent_System','View source')}</div>
    </section>

    <section id="contact" class="contact-section" aria-labelledby="contact-heading"><div class="wrap"><p class="eyebrow">06 / LET’S CONNECT</p><div class="contact-main"><h2 id="contact-heading">Have something<br>in mind<span>?</span></h2><div><p>For internship opportunities, research conversations, or a project worth building together.</p><a class="button contact-button" href="mailto:${profile.email}">Say hello ${arrow}</a></div></div><div class="contact-bottom"><a class="email-link" href="mailto:${profile.email}">${profile.email}</a><div>${external(profile.linkedin,'LinkedIn')}${external(profile.github,'GitHub')}${external(profile.linktree,'Linktree')}</div></div></div></section>
  </main>${footer()}`;
 return page({title:'Pamindu Karunadasa — Computer Engineering, Applied AI & Design', description:'Computer Engineering undergraduate at KDU, Sri Lanka. Explore Pamindu Karunadasa’s selected work in applied AI, software, hardware, and digital design.',body});
}
