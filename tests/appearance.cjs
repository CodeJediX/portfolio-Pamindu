const path = require('node:path');
const qa = n => require(process.env.QA_NODE_MODULES ? path.join(process.env.QA_NODE_MODULES,n) : n);
const { chromium } = qa('playwright');
const { AxeBuilder } = qa('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const base = (process.env.TEST_URL || 'http://127.0.0.1:4174').replace(/\/$/,'');
  const context = await browser.newContext({colorScheme:'dark'});
  const page = await context.newPage();
  const report = {checks:[],accessibility:[]};
  await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.preloader')).visibility === 'hidden');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('portfolio-welcome')),'seen');
  await page.emulateMedia({colorScheme:'light'});
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
  assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  await page.locator('.theme-toggle').click();
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  assert.equal(await page.locator('html').getAttribute('data-loading'),null);
  report.checks.push('System preference, manual override, reload persistence, first-visit dismissal');
  for (const route of ['/', '/projects/sancharakaya/', '/projects/smart-face-door-lock/', '/projects/signspeak/']) {
    await page.goto(base+route,{waitUntil:'networkidle'});
    assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    for (const width of [320,390,820,1024,1440]) {
      await page.setViewportSize({width,height:1000});
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false);
    }
    const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    report.accessibility.push({route,violations:result.violations});
  }
  await page.goto(base,{waitUntil:'networkidle'});
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(img => img.loading = 'eager');
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
  });
  await page.screenshot({path:'test-results/updated-dark.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'test-results/updated-dark-mobile.png',fullPage:true});
  await page.locator('.theme-toggle').click();
  await page.setViewportSize({width:1440,height:1000});
  await page.waitForTimeout(250);
  await page.screenshot({path:'test-results/updated-light.png',fullPage:true});
  const reduced = await browser.newContext({reducedMotion:'reduce'});
  const rp = await reduced.newPage(); await rp.goto(base);
  assert.equal(await rp.locator('html').getAttribute('data-loading'),null);
  const nojs = await browser.newContext({javaScriptEnabled:false,colorScheme:'dark'});
  const np = await nojs.newPage(); await np.goto(base);
  assert.equal(await np.locator('html').evaluate(el=>getComputedStyle(el).colorScheme),'dark');
  assert.equal(await np.locator('.preloader').isVisible(),false);
  const failed = await browser.newContext(); const fp = await failed.newPage();
  await fp.route('**/assets/site.js',route=>route.abort()); await fp.goto(base);
  await fp.waitForTimeout(1100);
  assert.equal(await fp.locator('.preloader').isVisible(),false);
  report.checks.push('Dark pages and five widths, reduced motion, no-JS dark fallback, main-script failure timeout');
  fs.writeFileSync('test-results/appearance-report.json',JSON.stringify(report,null,2));
  await browser.close();
  assert.equal(report.accessibility.flatMap(r=>r.violations).length,0,JSON.stringify(report.accessibility));
  console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exit(1)});
