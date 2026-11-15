
import activity from './github-activity.json' with {type:'json'};
import { profile } from './projects.mjs';
import { external, escape as e } from './components.mjs';

export const datasetStats = {folders:2000, populated:1947, videos:17668, downloads:15, votes:0};
const number = new Intl.NumberFormat('en');

export function datasetSpotlight() {
  return `<section class="dataset-spotlight" aria-labelledby="dataset-heading"><div class="wrap spotlight-grid">
    <div><p class="eyebrow">Kaggle dataset</p><h2 id="dataset-heading">Sign language, word by word<span class="accent">.</span></h2><p>I compiled and published this video collection for sign recognition research. The original clips come from SignASL and its contributors.</p><div class="detail-actions"><a class="button primary" href="datasets/sign-language-recognition/">Explore the dataset</a>${external(profile.dataset,'View on Kaggle','button outline')}</div></div>
    <div><dl class="dataset-grid">${[[datasetStats.videos,'Videos'],[datasetStats.populated,'Populated word folders'],[datasetStats.downloads,'Kaggle downloads'],[datasetStats.votes,'Kaggle upvotes']].map(([value,label])=>`<div><dt>${label}</dt><dd>${number.format(value)}</dd></div>`).join('')}</dl><p class="caption">Kaggle engagement as of 15 November 2026.</p></div>
  </div></section>`;
}

const work = [
  ['QuantEdge technical report','Competition research report','Team Quantum-X’s AEGIS platform compares systematic investment strategies and documents the evaluation and research workflow.','https://github.com/CodeJediX/aegis-quantedge/blob/main/reports/Current_Technical_Report.pdf','Read the report (PDF)'],
  ['CataTriage AI','Model card and research prototype','A cataract research prototype with documented model stages, data provenance and reproducibility.','https://github.com/CodeJediX/CataTriage-AI/blob/main/docs/competition/MODEL_CARD.md','Read the model card'],
  ['FallGuard','Hardware research prototype','An ESP32-S3 fall detection project exploring wearable motion sensing, on-device inference and caregiver alerts.'],
  ['Flood rescue and landslide research','Research in progress','I’m exploring flood rescue and landslide monitoring as separate research topics.'],
];

export function writingSection() {
  return `<section id="research" class="section research-section" aria-labelledby="research-heading"><div class="wrap">
    <div class="section-heading"><div><p class="eyebrow">Reports and prototypes</p><h2 id="research-heading">Research &amp; writing<span class="accent">.</span></h2></div></div>
    <div class="research-grid">${work.map(([title,kind,description,url,label])=>`<article><p class="eyebrow">${kind}</p><h3>${title}</h3><p>${description}</p>${url?external(url,label):''}</article>`).join('')}</div>
  </div></section>
  <section id="now" class="section wrap now-section" aria-labelledby="now-heading"><div><p class="eyebrow">November 2026</p><h2 id="now-heading">Now<span class="accent">.</span></h2></div><p>I’m documenting the testing behind my travel and computer vision projects and working on an ESP32-S3 fall detection prototype. I’m also exploring how sensor and camera inputs could complement one another.</p></section>`;
}

const pinned = ['Grocery-Management-Web-System','Car_Rent_System','LeafLens_Project','Magen-AI-Assistant','signspeak'];
export function githubSection() {
  const days=Object.entries(activity).slice(-182);
  return `<section id="github" class="section github-section" aria-labelledby="github-heading"><div class="wrap">
    <div class="section-heading"><div><p class="eyebrow">CodeJediX</p><h2 id="github-heading">GitHub activity<span class="accent">.</span></h2></div>${external(profile.github+'#year-link-2026','Live GitHub profile','button outline')}</div>
    <div class="activity-block"><p>Public activity · Last 26 weeks through 15 November 2026</p>
    <div class="activity-cells" aria-hidden="true">${days.map(([date,level])=>level?`<span title="${e(date)}" data-level="${level}"></span>`:'<span></span>').join('')}</div>
    <p class="caption">${days.filter(([,level])=>level>0).length} active days</p></div>
    <h3 class="pinned-title">Pinned repositories</h3><ul class="pinned-list">${pinned.map(repo=>`<li>${external(profile.github+'/'+repo,repo.replaceAll('_',' ').replaceAll('-',' '))}</li>`).join('')}</ul>
  </div></section>`;
}
