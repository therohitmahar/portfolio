/* Run: node scripts/verify-theme.cjs
 * Uses an existing Playwright installation; does not install dependencies.
 */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');

function loadPlaywright() {
  try { return require('playwright'); } catch {}
  const cache = path.join(os.homedir(), '.npm', '_npx');
  const candidates = fs.existsSync(cache) ? fs.readdirSync(cache).map(p => path.join(cache, p, 'node_modules', 'playwright')).filter(p => fs.existsSync(path.join(p, 'package.json'))) : [];
  candidates.sort((a, b) => require(path.join(b, 'package.json')).version.localeCompare(require(path.join(a, 'package.json')).version, undefined, {numeric: true}));
  for (const candidate of candidates) {
    const pw = require(candidate);
    if (fs.existsSync(pw.chromium.executablePath())) return pw;
  }
  throw new Error('Playwright browser missing. Run npx playwright install chromium first.');
}

(async () => {
  const { chromium } = loadPlaywright();
  const browser = process.env.PLAYWRIGHT_CDP_URL
    ? await chromium.connectOverCDP(process.env.PLAYWRIGHT_CDP_URL)
    : await chromium.launch({headless: true});
  const base = process.env.PORTFOLIO_URL || 'http://localhost:3014';
  const output = path.join(os.tmpdir(), 'portfolio-theme-verification');
  fs.mkdirSync(output, {recursive: true});
  const errors = [];
  try {
    const context = await browser.newContext({colorScheme: 'light', viewport: {width: 1440, height: 1000}});
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base, {waitUntil: 'networkidle'});
    const darkButton = () => page.getByRole('button', {name: 'Dark theme', exact: true});
    const lightButton = () => page.getByRole('button', {name: 'Light theme', exact: true});
    await darkButton().waitFor();
    await page.screenshot({path: path.join(output, 'desktop-light.png'), fullPage: true});
    await darkButton().click();
    await lightButton().waitFor();
    assert.equal(await page.locator('body').evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(27, 30, 25)');
    await page.reload({waitUntil: 'networkidle'});
    await lightButton().waitFor();
    console.log('PASS: toggle and persistence after reload');
    await page.screenshot({path: path.join(output, 'desktop-dark.png'), fullPage: true});
    const second = await context.newPage();
    await second.goto(base, {waitUntil: 'networkidle'});
    await second.getByRole('button', {name: 'Light theme', exact: true}).waitFor();
    await lightButton().click();
    await second.getByRole('button', {name: 'Dark theme', exact: true}).waitFor();
    await second.close();
    console.log('PASS: theme synchronizes across tabs');
    await page.emulateMedia({colorScheme: 'dark'});
    await lightButton().waitFor();
    await page.emulateMedia({colorScheme: 'light'});
    await darkButton().waitFor();
    console.log('PASS: returning to default follows system theme changes');
    await darkButton().focus();
    await page.keyboard.press('Enter');
    await lightButton().waitFor();
    console.log('PASS: keyboard theme activation');
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      for (const route of ['/', '/work', '/projects', '/about', '/projects/pr-tracker', '/projects/context-flow-ai', '/projects/next-shelf']) {
        const response = await page.goto(base + route, {waitUntil: 'networkidle'});
        assert.equal(response.status(), 200, route);
        await lightButton().waitFor();
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px overflow at ${route}`);
      }
      await page.goto(base, {waitUntil: 'networkidle'});
      await page.screenshot({path: path.join(output, `dark-${width}.png`), fullPage: true});
      console.log(`PASS: navigation, dark preference, and no overflow at ${width}px`);
    }
    await page.goto(base + '/projects/pr-tracker', {waitUntil: 'networkidle'});
    await page.getByRole('button', {name: 'Resume demo'}).click();
    await page.getByText('Resume from checkpoint', {exact: true}).waitFor();
    await page.goto(base + '/projects/context-flow-ai', {waitUntil: 'networkidle'});
    await page.getByRole('button', {name: 'Instructions', exact: false}).click();
    await page.getByText('How the response should be written.', {exact: true}).waitFor();
    await page.goto(base + '/projects/next-shelf', {waitUntil: 'networkidle'});
    await page.getByRole('button', {name: 'Start reading'}).click();
    await page.getByRole('button', {name: 'Move to want to read'}).waitFor();
    console.log('PASS: project demos in dark mode');
    assert.deepEqual(errors, [], 'Browser runtime errors');
    await context.close();
    console.log('All checks passed. Screenshots: ' + output);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
