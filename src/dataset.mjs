import {profile} from './projects.mjs';
import {page,header,footer,external} from './components.mjs';

export const datasetPath = 'datasets/sign-language-recognition/';

export function datasetPage() {
  const name = 'Sign Language Recognition Dataset – 2,000 Words';
  const description = 'A sign language video dataset compiled and published on Kaggle by Pamindu Karunadasa for education and recognition research. The published dataset report lists 17,668 videos across 1,947 populated word folders, within 2,000 class folders. Original videos come from SignASL and its contributors.';
  const structuredData = {
    '@context':'https://schema.org', '@type':'Dataset',
    '@id':profile.site+datasetPath+'#dataset', name, description,
    url:profile.site+datasetPath, sameAs:profile.dataset,
    creator:{'@type':'Person','@id':profile.site+'#person',name:profile.name,url:profile.site},
    includedInDataCatalog:{'@type':'DataCatalog',name:'Kaggle',url:'https://www.kaggle.com/datasets'},
    isBasedOn:'https://www.signasl.org/',
    keywords:['sign language','video dataset','computer vision','gesture recognition','machine learning'],
  };
  const body = `${header('../../',false)}<main id="main" class="detail-main">
    <section class="detail-hero wrap">
      <a class="text-link back-link" href="../../#about">← About Pamindu</a>
      <p class="eyebrow">DATASET / COMPUTER VISION &amp; ACCESSIBILITY</p>
      <h1>${name}</h1>
      <p class="detail-summary">Compiled and published on Kaggle by Pamindu Karunadasa for sign language education, computer vision, and recognition research.</p>
      <div class="detail-actions">${external(profile.dataset,'Explore the dataset on Kaggle','button primary')}${external(profile.kaggle,'Pamindu’s Kaggle profile','button outline')}</div>
      <dl class="project-facts"><div><dt>Video files</dt><dd>17,668</dd></div><div><dt>Folders with videos</dt><dd>1,947</dd></div><div><dt>Class folders</dt><dd>2,000</dd></div></dl>
    </section>
    <div class="case-layout wrap">
      <aside class="case-navigation"><span class="eyebrow">DATASET NOTES</span><a href="#overview">Overview</a><a href="#coverage">Coverage</a><a href="#source">Source &amp; attribution</a></aside>
      <div class="case-content">
        <section id="overview"><p class="eyebrow">01 / OVERVIEW</p><h2>A resource for sign language research</h2><p>I compiled and published this video collection as a Kaggle dataset. Videos are organized by word or class so researchers and students can explore sign recognition, gesture classification, and accessibility applications.</p><p>The Kaggle data card and dataset report provide the file inventory and collection details. This page describes the published collection; the dataset files are hosted on Kaggle.</p></section>
        <section id="coverage"><p class="eyebrow">02 / COVERAGE</p><h2>What the published report contains</h2><p>The dataset report lists 17,668 MP4 videos, 2,000 word or class folders, and 1,947 folders containing video data. The remaining 53 folders contain no videos. These are inventory counts reported with the dataset, rather than a claim that every word has usable examples.</p><p>Researchers should inspect the inventory, validate the samples, and choose training and evaluation splits appropriate to their task.</p></section>
        <section id="source"><p class="eyebrow">03 / SOURCE &amp; ATTRIBUTION</p><h2>Compilation and original video sources</h2><p>Pamindu Karunadasa compiled and published the Kaggle collection. The original video samples were collected from SignASL and its contributors; publishing this collection does not make those original videos my own recordings.</p><p>The Kaggle data card specifies “Other” for the license and explains the original copyright holders’ rights. Consult its source and usage notes before using or redistributing the videos.</p><div class="source-links">${external(profile.dataset,'Dataset, report & usage notes on Kaggle')}${external('https://www.signasl.org/','Original resource: SignASL')}${external(profile.github,'Pamindu Karunadasa on GitHub')}</div></section>
      </div>
    </div>
  </main>${footer('../../')}`;
  return page({title:`${name} | Pamindu Karunadasa`,description,body,base:'../../',path:datasetPath,structuredData});
}
