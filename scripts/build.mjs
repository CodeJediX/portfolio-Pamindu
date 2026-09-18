import {mkdir,writeFile,cp,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import {home} from '../src/home.mjs';
import {detail} from '../src/detail.mjs';
import {projects,profile} from '../src/projects.mjs';
import {page,header,footer} from '../src/components.mjs';

const root = fileURLToPath(new URL('../',import.meta.url));
const output = resolve(root,'dist');
if (output !== join(root,'dist')) throw new Error('Unexpected output path');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
const files = new Map([['index.html',home()]]);
projects.forEach((project,index) => files.set(`projects/${project.id}/index.html`,detail(project,index)));
files.set('404.html',page({title:'Page not found — Pamindu Karunadasa',description:'Return to Pamindu Karunadasa’s selected engineering work.',base:profile.site,path:'404.html',body:`${header(profile.site,false)}<main id="main" class="wrap not-found"><p class="eyebrow">404 / PAGE NOT FOUND</p><h1>A small detour.</h1><p>This page is not here. Let’s get you back to the work.</p><a class="button primary" href="${profile.site}#work">View selected projects <span aria-hidden="true">↗</span></a></main>${footer(profile.site)}`}));
files.set('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${profile.site}sitemap.xml\n`);
files.set('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...projects.map(p=>`projects/${p.id}/`)].map(path=>`<url><loc>${profile.site}${path}</loc></url>`).join('')}</urlset>\n`);
files.set('.nojekyll','');
for(const [path,content] of files) {
  for(const base of [root,output]) {
    const target=join(base,path);
    await mkdir(resolve(target,'..'),{recursive:true});
    await writeFile(target,content);
  }
}
await cp(join(root,'assets'),join(output,'assets'),{recursive:true});
console.log(`Built ${projects.length+2} HTML pages. Root output supports existing GitHub Pages; dist/ is the standalone release.`);
