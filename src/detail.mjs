
import {projects} from './projects.mjs';
import {page,header,footer,external,arrow,escape as e} from './components.mjs';

function demo(p) {
  if(p.video) return `<video class="case-video" controls playsinline preload="none" poster="../../assets/images/${p.image}" aria-label="${e(p.name)} demo"><source src="../../assets/demos/${p.video}" type="video/mp4"></video>${p.id==='sancharakaya'?'<p class="caption">Screens from a local run with a sample Kandy trip. The walkthrough shows the saved trip, a schedule warning and the generated itinerary.</p>':'<p class="caption">Short LeafLens interface preview.</p>'}`;
  return '';
}

function cover(p) {
  const src = `../../assets/images/${e(p.image)}`;
  const image = `<img src="${src}" alt="${e(p.alt)}" width="${p.imageWidth ?? 1200}" height="${p.imageHeight ?? 800}" fetchpriority="high">`;
  return `<figure class="detail-cover wrap ${p.color} ${p.id}">${p.galleryTitle?`<a href="${src}" aria-label="Open full-size screenshot: ${e(p.imageLabel || p.name)}">${image}</a>`:image}<figcaption>${p.imageLabel||(p.id==='sancharakaya'?'Local preview with a sample Kandy itinerary':p.id==='createx'?'Live competition homepage':'Project interface')} · ${e(p.name)}</figcaption></figure>`;
}

function caseImage({src,alt,caption=alt,width=1200,height=800}, linked=false) {
  const url = `../../assets/images/${e(src)}`;
  const image = `<img src="${url}" alt="${e(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async">`;
  return `<figure class="case-image">${linked?`<a href="${url}" aria-label="Open full-size screenshot: ${e(caption)}">${image}</a>`:image}<figcaption>${e(caption)}</figcaption></figure>`;
}

export function detail(p,index) {
  const next=projects[(index+1)%projects.length];
  const diagram=`<figure class="architecture-figure"><ol class="architecture">${p.architecture.map((step,i)=>`<li><span class="architecture-node"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 12h6m-3-3v6"/></svg> <span>${String(i+1).padStart(2,'0')}</span></span><strong>${e(step)}</strong></li>`).join('')}</ol><figcaption>Simplified data flow through ${e(p.name)}.</figcaption></figure>`;
  const gallery = p.gallery.map(image=>caseImage(image, Boolean(p.galleryTitle))).join('');
  const sectionLinks=[['overview','Problem & solution'],['architecture','Architecture'],['engineering','My contribution'],...(p.galleryTitle?[['screenshots',p.galleryTitle]]:[]),['results','Results & demo'],['scope','What I’d improve']];
  const companion=p.companion;
  if(companion) sectionLinks.splice(-1,0,['companion','Android companion']);
  const body=`${header('../../',false)}<main id="main" class="detail-main">
  <section class="detail-hero wrap"><a class="text-link back-link" href="../../#work"><span aria-hidden="true">←</span> All projects</a><p class="eyebrow">${e(p.label)}</p><h1>${e(p.name)}<span class="accent">.</span></h1><p class="detail-summary">${e(p.summary)}</p><div class="detail-actions">${p.demo?external(p.demo,p.demoLabel||'Visit live project','button primary'):''}${p.repo?external(p.repo,p.sourceLabel||'Explore source',p.demo?'button outline':'button primary'):''}</div><dl class="project-facts"><div><dt>Status</dt><dd>${e(p.status)}</dd></div><div><dt>Context</dt><dd>${e(p.context)}</dd></div><div><dt>Technology</dt><dd>${e(p.stack.join(' · '))}</dd></div></dl></section>
  ${cover(p)}
  <div class="case-layout wrap"><aside class="case-navigation"><span class="eyebrow">In this project</span>${sectionLinks.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</aside><div class="case-content">
    <section id="overview"><h2>Problem</h2><p>${e(p.problem)}</p><h2>Solution</h2><p>${e(p.solution)}</p></section>
    <section id="architecture"><h2>Architecture</h2>${diagram}</section>
    <section id="engineering"><h2>My contribution</h2><ul class="feature-list">${p.contribution.map(task=>`<li>${e(task)}</li>`).join('')}</ul><h3>Engineering challenge</h3><p>${e(p.challenge)}</p>${p.galleryTitle?'':gallery}</section>
    ${p.galleryTitle?`<section id="screenshots"><h2>${e(p.galleryTitle)}</h2>${gallery}</section>\n    `:''}<section id="results"><h2>Results &amp; demo</h2><p class="case-result">${e(p.result)}</p>${demo(p)}${p.demoNote?`<p class="caption">${e(p.demoNote)}</p>`:''}${p.demo?external(p.demo,p.demoLabel||'Open the live project','text-link'):''}</section>${companion?`
    <section id="companion"><h2>${e(companion.title)}</h2><p>${e(companion.description)}</p><div class="source-links"><a class="text-link" href="${e(companion.page)}">Read the Android case study ${arrow}</a>${external(companion.repo,'Android APK and source')}</div>${caseImage(companion.image)}</section>`:''}
    <section id="scope"><h2>What I’d improve</h2><p>${e(p.next)}</p>${p.id==='sancharakaya'?'':`<p class="caption">${e(p.limits)}</p>`}<h3>Project references</h3><div class="source-links">${p.sources.map(([label,url])=>external(url,label)).join('')}</div></section>
  </div></div><section class="next-project wrap"><span class="eyebrow">Next project</span><a href="../${next.id}/"><span>${e(next.name)}</span>${arrow}</a></section></main>${footer('../../')}`;
  return page({title:`${p.name} — Pamindu Karunadasa`,description:p.summary,body,base:'../../',path:`projects/${p.id}/`,image:p.shareImage ?? `assets/share/${p.id}.png`});
}
