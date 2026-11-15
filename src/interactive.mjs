import { certifications } from './profile-updates.mjs';
import { external, escape as e } from './components.mjs';
import { profile } from './projects.mjs';

export const achievements = [
  {name:'TensorForge AI Buildathon', result:'2nd runner-up', issuer:'IEEE Computer Society of KDU', date:'Oct 2025'},
  {name:'AI Challenge Sri Lanka 2026', result:'Grand finale finalist', issuer:'Team The Kernel Krew', date:'Sep 2026', url:'https://credsverse.com/credentials/67c0c556-018f-408c-9a42-2d10045f6765'},
  {name:'Data Odyssey 2026', result:'Finalist', issuer:'Team Quantum-X · SignSpeak', date:'Aug 2026', url:'projects/signspeak/'},
  {name:'CHYPER 4.0', result:'Finalist', issuer:'IEEE WIE Student Branch of KDU', date:'Sep 2026', url:'https://www.linkedin.com/in/pamindu-karunadasa/overlay/Certifications/894481700/treasury/'},
  {name:'PixelWave 2025', result:'Top 20 finalist', issuer:'IEEE Computer Society of KDU', date:'Sep 2025'},
];

export const internship = {
  title:'IT intern', company:'Sampath Bank PLC · Head Office',
  dates:'Jan–Nov 2023', work:'Assisted with system maintenance and troubleshooting and supported the IT department’s development teams.',
};

const tools = [
  ['Programming', 'M8 7 3 12l5 5m8-10 5 5-5 5m-3-13-2 16', ['Python', 'JavaScript', 'TypeScript', 'C#', 'Java']],
  ['AI and computer vision', 'M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6Z M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z', ['TensorFlow', 'Keras', 'MediaPipe', 'OpenCV', 'Gemini']],
  ['Web and data', 'M3 4h18v16H3zM3 8h18m-13 4v4m4-4h5m-5 4h5', ['React', 'Next.js', 'Flask', 'Streamlit', 'Supabase', 'SQLite']],
  ['Hardware and design', 'M7 7h10v10H7zM9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4', ['Git', 'Docker', 'Arduino', 'Canva', 'Photoshop']],
];

export function toolsGrid() {
  return `<div class="tools-grid">${tools.map(([title,path,tags])=>`<article class="tool-card"><svg aria-hidden="true" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="${path}"/></svg><h3>${title}</h3><ul>${tags.map(tag=>`<li>${tag}</li>`).join('')}</ul></article>`).join('')}</div>`;
}

export function learningSection() {
  const courses = [...certifications, {name:'IEEEXtreme 19.0',issuer:'IEEE · Participation',date:'Oct 2025',datetime:'2025-10'}];
  return `<section id="achievements" class="section achievement-section" aria-labelledby="achievements-heading"><div class="wrap">
    <div class="section-heading"><div><p class="eyebrow">Competition results</p><h2 id="achievements-heading">Achievements<span class="accent">.</span></h2></div></div>
    <div class="award-grid">${achievements.map((a,i)=>`<article class="award${i===0?' award-lead':''}"><p class="award-result">${e(a.result)}</p><h3>${e(a.name)}</h3><p>${e(a.issuer)} · ${e(a.date)}</p>${a.url?(a.url.startsWith('https:')?external(a.url,'View evidence'):`<a class="text-link" href="${a.url}">View project ↗</a>`):''}</article>`).join('')}</div>
    <section id="certifications" class="credentials" aria-labelledby="certifications-heading"><h3 id="certifications-heading">Certificates</h3><ul class="credential-list">${courses.map(c=>`<li><div><h4>${e(c.name)}</h4><p>${e(c.issuer)}</p></div>${c.date?`<time datetime="${c.datetime}">${e(c.date)}</time>`:''}${c.url?external(c.url,`Verify ${c.name}`):''}</li>`).join('')}</ul></section>
  </div></section>
  <section id="experience" class="section wrap" aria-labelledby="experience-heading"><div class="section-heading"><div><p class="eyebrow">Professional work</p><h2 id="experience-heading">Experience<span class="accent">.</span></h2></div></div>
    <div class="experience-grid experience-entries"><article><p class="eyebrow">${internship.dates}</p><h3>${internship.title}</h3><p class="experience-company">${internship.company}</p><p>${internship.work}</p></article><article><p class="eyebrow">Education venture</p><h3>Co-founder and CEO</h3><p class="experience-company">OULU Academy · Sri Lanka</p><p>I co-founded an education academy and built its public-facing website.</p>${external(profile.business+'pamindu-karunadasa/','View academy profile')}</article></div>
  </section>`;
}

export function roadmap() {
 const chapters=[
  {mark:'ERIC',org:'Electronic Robotics & Innovation Club',note:'KDU · Editorial direction & technical storytelling',roles:[['Feb 2026 — Present','Editor','Leading editorial direction and documentation of robotics projects and technical innovations.'],['Jan 2025 — Present','OC Member','Contributing as an organizing committee member of the KDU club.']]},
  {mark:'IEEE CS',org:'IEEE Computer Society',note:'KDU Student Branch · Web & community',roles:[['Feb 2026 — Present','Webmaster','Managing and maintaining the official chapter website for members and visitors.'],['Jan 2025 — Present','OC Member','Contributing to the chapter’s organizing committee.']]},
  {mark:'BCS',org:'BCS Student Chapter',note:'Kotelawala Defence University · Student leadership',roles:[['Feb 2026 — Present','Chairperson','Providing strategic leadership and representing the student chapter to BCS, The Chartered Institute for IT.'],['Jan 2025 — Mar 2026','OC Member','Supported chapter activities as part of the organizing committee.']]},
 ];
 return `<section id="volunteering" class="section wrap" aria-labelledby="volunteering-heading"><div class="section-heading"><div><p class="eyebrow">Community</p><h2 id="volunteering-heading">Volunteering</h2></div><p class="section-intro">Student leadership, technical communication, and community outreach.</p></div><div class="roadmap">${chapters.map((c,i)=>`<article class="roadmap-stop"><div class="roadmap-node" aria-hidden="true">${String(i+1).padStart(2,'0')}</div><div class="roadmap-card"><div class="roadmap-heading"><span class="chapter-mark mono">${c.mark}</span><div><h3>${c.org}</h3><p>${c.note}</p></div></div><div class="role-journey">${c.roles.map(([date,title,text])=>`<div class="role-step"><span class="mono">${date}</span><h4>${title}</h4><p>${text}</p></div>`).join('')}</div></div></article>`).join('')}<div class="roadmap-outreach"><span class="eyebrow">COMMUNITY OUTREACH</span><h3>Taking the work beyond campus.</h3><p>Athwela · Chairperson <span aria-hidden="true">/</span> Artha 2.0 · Co-chair</p>${external(profile.linkedin,'Explore my community work')}</div></div></section>`;
}
