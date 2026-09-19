import { certifications } from './profile-updates.mjs';
import { external, escape as e } from './components.mjs';
import { profile } from './projects.mjs';

export function deck(id, label, cards, kind='skills') {
  return `<div class="spatial-deck ${kind}-deck" data-deck="${id}" role="region" aria-label="${label}"><div class="deck-window"><div class="deck-track">${cards.map((c,i)=>`<article class="deck-card" aria-label="${i+1} of ${cards.length}"><div class="card-top mono"><span>${e(c.category)}</span><span>${String(i+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}</span></div><div class="card-symbol" aria-hidden="true">${c.symbol}</div><h3>${e(c.title)}</h3><p>${e(c.text)}</p>${c.tags?`<div class="card-tags">${c.tags.map(t=>`<span>${e(t)}</span>`).join('')}</div>`:''}<div class="card-bottom">${c.link}</div></article>`).join('')}</div></div><div class="deck-controls" hidden><button class="deck-prev" aria-label="Previous ${label}">←</button><p class="deck-status mono" aria-live="polite">01 / ${String(cards.length).padStart(2,'0')}</p><button class="deck-next" aria-label="Next ${label}">→</button><span class="deck-hint mono">SWIPE OR USE THE ARROWS</span></div></div>`;
}

export function skillsDeck() {
  const items=[
    ['01 / SOFTWARE','Languages','From a useful script to a complete application.',['Python','JavaScript','TypeScript','C#','Java'],'⌘','projects/hotel-management/','Explore application work'],
    ['02 / INTELLIGENCE','AI & computer vision','Turning camera input and data into meaningful interactions.',['TensorFlow','Keras','MediaPipe','OpenCV','Gemini'],'⠿','projects/signspeak/','Explore SignSpeak'],
    ['03 / INTERFACE','Web & data','Connecting clear interfaces with the systems behind them.',['React','Next.js','Flask','Streamlit','Supabase','SQLite'],'</>','projects/createx/','Explore web platforms'],
    ['04 / MAKING','Build & design','Bringing engineering workflows and visual communication together.',['Git','Docker','Arduino','Canva','Photoshop'],'◇','#volunteering','Explore community work'],
  ];
  return deck('skills','skill cards',items.map(([category,title,text,tags,symbol,href,label])=>({category,title,text,tags,symbol,link:`<a class="text-link" href="${href}">${label} ↗</a>`})));
}

export function learningSection() {
  const awards=[
    {name:'2nd Runner Up — TensorForge AI Buildathon',issuer:'IEEE Computer Society of KDU',date:'Oct 2025',kind:'COMPETITION RECOGNITION'},
    {name:'IEEEXtreme 19.0 — Participation',issuer:'IEEE',date:'Oct 2025',kind:'PARTICIPATION CERTIFICATE'},
    {name:'Top 20 Finalist — PixelWave 2025',issuer:'IEEE Computer Society of KDU',date:'Sep 2025',kind:'DESIGN RECOGNITION'},
  ];
  const cards=[...awards,...certifications].map((c,i)=>({category:c.kind||'COURSE CERTIFICATE',title:c.name,text:c.issuer,tags:c.date?[c.date]:[],symbol:i<3?'✳':'◈',link:external(profile.linkedin,'View on LinkedIn')}));
  return `<section id="experience" class="section learning-section" aria-labelledby="experience-heading"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">04 / LICENSES, CERTIFICATIONS & RECOGNITION</p><h2 id="experience-heading">Learning by doing.<br>Growing with others.</h2></div><p class="section-intro">A growing collection of learning,<br>participation, and creative milestones.</p></div><div id="certifications">${deck('credentials','certification cards',cards,'credential')}</div><div class="learning-notes"><p><span class="mono">APPLIED EXPERIENCE</span>Data Odyssey finalist with Quantum-X · IT internship at Sampath Bank</p>${external(profile.linkedin,'Explore my professional profile')}</div></div></section>`;
}

export function roadmap() {
 const chapters=[
  {mark:'ERIC',org:'Electronic Robotics & Innovation Club',note:'KDU · Editorial direction & technical storytelling',roles:[['Feb 2026 — Present','Editor','Leading editorial direction and documentation of robotics projects and technical innovations.'],['Jan 2025 — Present','OC Member','Contributing as an organizing committee member of the KDU club.']]},
  {mark:'IEEE CS',org:'IEEE Computer Society',note:'KDU Student Branch · Web & community',roles:[['Feb 2026 — Present','Webmaster','Managing and maintaining the official chapter website for members and visitors.'],['Jan 2025 — Present','OC Member','Contributing to the chapter’s organizing committee.']]},
  {mark:'BCS',org:'BCS Student Chapter',note:'Kotelawala Defence University · Student leadership',roles:[['Feb 2026 — Present','Chairperson','Providing strategic leadership and representing the student chapter to BCS, The Chartered Institute for IT.'],['Jan 2025 — Mar 2026','OC Member','Supported chapter activities as part of the organizing committee.']]},
 ];
 return `<section id="volunteering" class="section wrap" aria-labelledby="volunteering-heading"><div class="section-heading"><div><p class="eyebrow">05 / VOLUNTEERING & COMMUNITY</p><h2 id="volunteering-heading">Connected by purpose.<br>Growing through service.</h2></div><p class="section-intro">From organizing committees<br>to leading, building, and sharing.</p></div><div class="roadmap"><div class="roadmap-origin mono"><span aria-hidden="true">●</span> THE JOURNEY · 2025 — PRESENT</div>${chapters.map((c,i)=>`<article class="roadmap-stop"><div class="roadmap-node" aria-hidden="true">${String(i+1).padStart(2,'0')}</div><div class="roadmap-card"><div class="roadmap-heading"><span class="chapter-mark mono">${c.mark}</span><div><h3>${c.org}</h3><p>${c.note}</p></div></div><div class="role-journey">${c.roles.map(([date,title,text])=>`<div class="role-step"><span class="mono">${date}</span><h4>${title}</h4><p>${text}</p></div>`).join('')}</div></div></article>`).join('')}<div class="roadmap-outreach"><span class="eyebrow">COMMUNITY OUTREACH</span><h3>Taking the work beyond campus.</h3><p>Athwela · Chairperson <span aria-hidden="true">/</span> Artha 2.0 · Co-chair</p>${external(profile.linkedin,'Explore my community work')}</div></div></section>`;
}
