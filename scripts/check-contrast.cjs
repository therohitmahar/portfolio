const fs = require("node:fs");
const { loadPlaywright } = require("./playwright-runtime.cjs");
const { chromium } = loadPlaywright();
const routes = [
  "/",
  "/work",
  "/projects",
  "/about",
  "/contact",
  "/projects/pr-tracker",
  "/projects/context-flow-ai",
  "/projects/next-shelf",
  "/projects/pixelwind",
  "/projects/auto-dynamic-importer",
  "/projects/quick-wrapper",
  "/projects/frontend-agent-kit",
  "/projects/clearmind",
  "/work/lineupx-settings",
  "/missing-page",
];
(async () => {
  const browser = await chromium.connectOverCDP(
    process.env.PLAYWRIGHT_CDP_URL || "http://127.0.0.1:9222",
  );
  const findings = [];
  let checked = 0;
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      colorScheme: theme,
      viewport: { width: 390, height: 900 },
    });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(
        (process.env.PORTFOLIO_URL || "http://localhost:3016") + route,
        { waitUntil: "networkidle" },
      );
      const result = await page.evaluate(() => {
        function rgb(s) {
          const m = s.match(/[\d.]+/g);
          return m ? m.map(Number) : null;
        }
        function luminance(c) {
          return c
            .slice(0, 3)
            .map((v) => {
              v /= 255;
              return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
            })
            .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
        }
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
        );
        let node;
        const failures = [];
        let count = 0;
        while ((node = walker.nextNode())) {
          if (!node.textContent.trim()) continue;
          const el = node.parentElement;
          if (
            !el ||
            el.closest("script,style,[aria-hidden=true],.visually-hidden") ||
            !el.checkVisibility({
              checkOpacity: true,
              checkVisibilityCSS: true,
            })
          )
            continue;
          const rect = el.getBoundingClientRect();
          if (rect.width < 2 || rect.height < 2) continue;
          const style = getComputedStyle(el);
          let parent = el,
            bg;
          while (parent) {
            const c = rgb(getComputedStyle(parent).backgroundColor);
            if (c && (c.length === 3 || c[3] === 1)) {
              bg = c;
              break;
            }
            parent = parent.parentElement;
          }
          if (!bg) bg = rgb(getComputedStyle(document.body).backgroundColor);
          const fg = rgb(style.color);
          if (!fg || !bg) continue;
          const l1 = luminance(fg),
            l2 = luminance(bg),
            ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
          const large =
            parseFloat(style.fontSize) >= 24 ||
            (parseFloat(style.fontSize) >= 18.66 &&
              parseInt(style.fontWeight) >= 700);
          count++;
          if (ratio < (large ? 3 : 4.5))
            failures.push({
              text: node.textContent.trim().slice(0, 100),
              ratio: Number(ratio.toFixed(2)),
              size: style.fontSize,
              color: style.color,
              bg,
            });
        }
        return { count, failures };
      });
      checked += result.count;
      for (const f of result.failures) findings.push({ theme, route, ...f });
    }
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(
    "output/review/final/contrast.json",
    JSON.stringify({ checked, findings }, null, 2),
  );
  console.log({ checked, findings });
  if (findings.length) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
