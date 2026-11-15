
import { profile, projects } from './projects.mjs';
import { achievements, internship } from './interactive.mjs';
import { page, header, footer, escape as e } from './components.mjs';

export const resumePath='resume/';
export const resumeFile='pamindu-karunadasa-resume.pdf';

export function resumePage() {
  const resumeProjects=['signspeak','sancharakaya','smart-face-door-lock','leaflens'].map(id=>projects.find(p=>p.id===id));
  const body=`${header('../',false)}<main id="main" class="wrap resume-main"><div class="resume-actions"><a class="text-link" href="../">← Back to portfolio</a><a class="button primary" href="${resumeFile}" download>Download PDF</a><button class="button outline" data-print hidden>Print résumé</button></div>
    <article class="resume-sheet">
      <header><h1>Pamindu Karunadasa</h1><p>Computer Engineering undergraduate · Applied AI and software</p><address>Sri Lanka · <a href="mailto:${profile.email}">${profile.email}</a> · <a href="${profile.github}">GitHub</a> · <a href="${profile.linkedin}">LinkedIn</a> · <a href="${profile.site}">Portfolio</a></address></header>
      <section><h2>Education</h2><p><strong>General Sir John Kotelawala Defence University</strong> · Computer Engineering · 2024–2028 (expected)</p></section>
      <section><h2>Experience</h2><div class="resume-item"><h3>${internship.title} · ${internship.company}</h3><span>${internship.dates}</span><p>${internship.work}</p></div><div class="resume-item"><h3>Co-founder and CEO · OULU Academy</h3><p>Co-founded an education academy and built its public-facing website.</p></div></section>
      <section><h2>Selected projects</h2>${resumeProjects.map(p=>`<div class="resume-item"><h3><a href="../projects/${p.id}/">${e(p.name)}</a></h3><p>${e(p.contribution[0])} ${e(p.result)}</p></div>`).join('')}<div class="resume-item"><h3><a href="../datasets/sign-language-recognition/">Kaggle sign language dataset</a></h3><p>Compiled and published 17,668 videos from SignASL contributors across 1,947 populated word folders.</p></div></section>
      <section><h2>Recognition and leadership</h2><p>${achievements.slice(0,4).map(a=>e(a.name+' ('+a.result+')')).join(' · ')}.</p><p>KDU BCS Student Chapter Chairperson · IEEE Computer Society Webmaster · ERIC Editor.</p></section>
      <section><h2>Technical skills</h2><p>Python, JavaScript, TypeScript, C#, TensorFlow, MediaPipe, OpenCV, React, Flask, Streamlit, SQLite, Supabase, Arduino and Git.</p></section>
    </article></main>${footer('../')}`;
  return page({title:'Résumé — Pamindu Karunadasa',description:'Printable résumé for Pamindu Karunadasa, Computer Engineering undergraduate at KDU.',body,base:'../',path:resumePath,image:'assets/share/resume.png'});
}
