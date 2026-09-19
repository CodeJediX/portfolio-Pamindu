import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {projects,profile} from '../src/projects.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
async function walk(path){let files=[];for(const f of await readdir(path,{withFileTypes:true})){const target=join(path,f.name);files.push(...(f.isDirectory()?await walk(target):[target]));}return files;}
test('Every generated destination and local resource resolves, including fragment links',async()=>{
 for(const file of (await walk(root)).filter(x=>x.endsWith('.html'))){
  const html=await readFile(file,'utf8');
  for(const [,value] of html.matchAll(/(?:href|src)="([^"\s]+)"/g)){
   if(/^(https?:|mailto:|data:)/.test(value))continue;
   const [path,fragment]=value.split('#');
   let target=path?resolve(dirname(file),path):file;
   const s=await stat(target).catch(()=>null);assert.ok(s,`${file}: missing ${value}`);
   if(s.isDirectory())target=join(target,'index.html');
   await stat(target);
   if(fragment){const body=await readFile(target,'utf8');assert.ok(body.includes(`id="${fragment}"`),`${file}: missing fragment ${value}`);}
  }
 }
});
test('All project pages have meaningful static content, metadata and one H1',async()=>{
 const canonicals=new Set();
 for(const path of ['index.html',...projects.map(p=>`projects/${p.id}/index.html`)]){
  const html=await readFile(join(root,path),'utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,path);
  for(const token of ['<main','name="description"','property="og:image"','name="twitter:card"','application/ld+json','class="skip-link"'])assert.ok(html.includes(token),path+': '+token);
  assert.ok(!html.includes('user-scalable=no'));assert.ok(!html.includes('href="#"'));
  const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];assert.ok(!canonicals.has(canonical));canonicals.add(canonical);
  for(const img of html.matchAll(/<img\b[^>]*>/g)){assert.match(img[0],/alt="[^"]+"/);assert.match(img[0],/width="\d+"/);assert.match(img[0],/height="\d+"/);}
  for(const a of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert.match(a[0],/rel="noopener noreferrer"/);
 }
});
test('Production payload is bounded and curated content has evidence',async()=>{
 assert.equal(projects.length,8);assert.equal(new Set(projects.map(p=>p.id)).size,projects.length);
 for(const p of projects){assert.ok(p.sources.length);assert.ok(p.problem&&p.solution&&p.role&&p.limits);if(p.repo)assert.match(p.repo,/^https:\/\/(github.com|drive.google.com)\//);}
 assert.ok((await stat(join(root,'assets/site.js'))).size<8000,'Keep enhancement JavaScript small');
 assert.ok((await stat(join(root,'index.html'))).size<50000,'Avoid excess HTML');
 const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');assert.ok(sitemap.includes(profile.site));
 assert.ok((await stat(join(root,'assets/social-preview.png'))).size>0,'Social preview must exist');
 for(const p of projects)assert.ok(sitemap.includes(`projects/${p.id}/`));
});
