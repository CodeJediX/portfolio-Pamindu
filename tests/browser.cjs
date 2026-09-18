const path=require('node:path');
const qa=(name)=>require(process.env.QA_NODE_MODULES?path.join(process.env.QA_NODE_MODULES,name):name);
const {chromium}=qa('playwright');
const {AxeBuilder}=qa('@axe-core/playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{
const b=await chromium.launch({channel:'chrome',headless:true});const errors=[];const report={viewports:[],pages:[],interactions:[],accessibility:[],consoleErrors:errors};
const context=await b.newContext();const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
fs.mkdirSync('test-results',{recursive:true});
const base=(process.env.TEST_URL||'http://127.0.0.1:4174').replace(/\/$/,'');
async function load(path,width){await p.setViewportSize({width,height:1000});const r=await p.goto(base+path,{waitUntil:'networkidle'});assert.equal(r.status(),200);await p.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});const state=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));assert.equal(state.overflow,false,`Overflow ${path} ${width}`);assert.deepEqual(state.images,[],`Images ${path}`);return state;}
for(const width of [320,390,768,1024,1440,1920]){await load('/',width);report.viewports.push({width,overflow:false,images:'passed'});}
await load('/',1440);
for(const [filter,count] of [['ai',4],['software',4],['web',1],['all',6]]){await p.locator(`[data-filter="${filter}"]`).click();assert.equal(await p.locator('.project:visible').count(),count)}report.interactions.push('Project filters: all four categories and counts passed');
const layer=p.locator('.layer-toggle');await layer.focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.circuit').getAttribute('data-exploded'),'false');await p.keyboard.press('Space');assert.equal(await p.locator('.circuit').getAttribute('data-exploded'),'true');report.interactions.push('Circuit layers: keyboard Enter and Space toggle state');
let result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();report.accessibility.push({path:'/',width:1440,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
await p.evaluate(()=>{document.activeElement.blur();scrollTo({top:0,behavior:'instant'})});
await p.screenshot({path:'test-results/portfolio-desktop.png',fullPage:true});await p.screenshot({path:'test-results/portfolio-hero.png'});
await load('/',390);await p.locator('.menu-toggle').click();assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await p.evaluate(()=>document.activeElement.className),'menu-toggle');await p.locator('.menu-toggle').click();await p.locator('#navigation a[href="#work"]').click();assert.equal(await p.locator('.menu-toggle').getAttribute('aria-expanded'),'false');report.interactions.push('Mobile menu: open, Escape, focus return, anchor and close passed');
await p.evaluate(()=>{document.activeElement.blur();scrollTo({top:0,behavior:'instant'})});await p.screenshot({path:'test-results/portfolio-mobile.png',fullPage:true});await p.screenshot({path:'test-results/portfolio-mobile-hero.png'});
result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();report.accessibility.push({path:'/',width:390,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
for(const id of ['signspeak','leaflens','magen','createx','signspeak-junior','hotel-management']){
 for(const width of [390,1440]){await load('/projects/'+id+'/',width);await p.reload({waitUntil:'networkidle'});report.pages.push({id,width,refresh:'passed'});}
 result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();report.accessibility.push({path:id,width:1440,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 if(id==='signspeak')await p.screenshot({path:'test-results/project-detail.png',fullPage:true});
}
await load('/',1440);await p.emulateMedia({reducedMotion:'reduce'});await p.hover('.circuit');assert.equal(await p.locator('.circuit-drawing').evaluate(el=>getComputedStyle(el).transform),'none');report.interactions.push('Reduced motion: illustration remains still');
await p.keyboard.press('Tab');
const nojs=await b.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(base);assert.equal(await np.locator('.project').count(),6);assert.ok(await np.locator('#navigation').isVisible());await np.locator('.project h3 a').first().click();assert.match(await np.title(),/SignSpeak/);report.interactions.push('JavaScript disabled: navigation, six projects and detail destination work');await nojs.close();
fs.writeFileSync('test-results/browser-test-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await b.close();assert.equal(errors.length,0,'Console errors');assert.equal(report.accessibility.flatMap(x=>x.violations).length,0,'Accessibility violations');
})().catch(e=>{console.error(e);process.exit(1)});
