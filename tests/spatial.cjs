
const path = require('node:path');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const qa = name => require(process.env.QA_NODE_MODULES ? path.join(process.env.QA_NODE_MODULES, name) : name);
const { chromium } = qa('playwright');
const { AxeBuilder } = qa('@axe-core/playwright');
const base = (process.env.TEST_URL || 'http://127.0.0.1:4174').replace(/\/$/, '');

(async () => {
  const browser = await chromium.launch({channel:'chrome'});
  const errors = [];
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000}, reducedMotion:'reduce', acceptDownloads:true});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const report = [];
    for (const route of ['/', '/projects/aegis/', '/projects/sancharakaya/', '/projects/signspeak-junior/', '/photos/', '/resume/']) {
      await page.goto(base + route);
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({width,height:900});
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, route + ' overflow at ' + width);
      }
      for (const theme of ['dark','light']) {
        if (theme !== await page.locator('html').getAttribute('data-theme')) await page.locator('.theme-toggle').click();
        const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
        report.push({route,theme,violations:axe.violations.map(item => ({id:item.id,nodes:item.nodes.map(node => [node.target,node.failureSummary])}))});
      }
    }

    await page.goto(base);
    await page.locator('.theme-toggle').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    const imageState = await page.locator('.project-visual img').evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      return images.map(image => [image.loading, image.naturalWidth]);
    });
    assert.equal(imageState.length, 9);
    assert.ok(imageState.every(([loading,width]) => loading === 'eager' && width > 0));
    const titles = await page.locator('.project-heading h3').allTextContents();
    assert.deepEqual(titles.slice(0,5), ['SignSpeak','QuantumX AEGIS','Sancharakaya','Smart Face Door Lock','LeafLens']);
    assert.equal(titles.at(-1), 'Hotel Management');
    assert.equal(await page.locator('.tools-grid .tool-card:visible').count(),4);
    assert.equal(await page.locator('.award:visible').count(),6);
    assert.equal(await page.locator('.credential-list li:visible').count(),8);
    assert.equal(await page.locator('.roadmap-stop:visible').count(),3);
    assert.equal(await page.locator('.role-step:visible').count(),6);
    await page.locator('.core-trigger').click();
    assert.equal(await page.locator('.core-tiles a:visible').count(),6);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.core-tiles').isVisible(),false);
    await page.locator('#work').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-nav-section="work"]').getAttribute('aria-current') === 'location');
    assert.notEqual(await page.locator('.scroll-progress span').evaluate(el => el.style.transform),'scaleX(0)');
    await page.keyboard.press('Control+k');
    await page.locator('#palette-search').fill('sancharakaya');
    assert.equal(await page.locator('.palette-results a:visible').count(),1);
    await page.keyboard.press('Enter');
    await page.waitForURL('**/projects/sancharakaya/');
    const video = page.locator('.case-video');
    await video.evaluate(async node => { node.muted = true; await node.play(); node.pause(); });
    assert.ok(await video.evaluate(node => node.duration > 3));
    await page.goto(base+'/photos/');
    await page.locator('[data-gallery-item]').first().click();
    await page.keyboard.press('ArrowRight');
    assert.match(await page.locator('.lightbox figcaption').innerText(),/^2 of 4/);
    await page.keyboard.press('ArrowLeft');
    assert.match(await page.locator('.lightbox figcaption').innerText(),/^1 of 4/);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.lightbox').isVisible(),false);
    await page.waitForFunction(() => document.activeElement === document.querySelector('[data-gallery-item]'));
    await page.goto(base+'/resume/');
    const download = page.waitForEvent('download');
    await page.getByRole('link',{name:'Download PDF'}).click();
    assert.equal((await download).suggestedFilename(),'pamindu-karunadasa-resume.pdf');
    assert.equal(await page.getByRole('button',{name:'Print résumé'}).isVisible(),true);
    await page.goto(base);
    assert.equal(await page.locator('.contact-form').isVisible(),true);
    const noJS = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const staticPage = await noJS.newPage();
    await staticPage.goto(base);
    assert.equal(await staticPage.locator('.tool-card:visible').count(),4);
    assert.equal(await staticPage.locator('.project:visible').count(),9);
    assert.deepEqual(errors,[]);
    fs.mkdirSync('test-results',{recursive:true});
    fs.writeFileSync('test-results/refresh-axe.json', JSON.stringify(report,null,2));
    const issues = report.filter(r => r.violations.length);
    assert.deepEqual(issues,[]);
    console.log('PASS: six routes, four widths, both themes, nine thumbnails, keyboard interactions, video, résumé download, and static fallbacks.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode=1; });
