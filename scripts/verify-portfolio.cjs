/* Full portfolio QA. With externally launched Chrome:
 * PLAYWRIGHT_CDP_URL=http://127.0.0.1:9222 PORTFOLIO_URL=http://localhost:3016 node scripts/verify-portfolio.cjs
 */
const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict");
const { loadPlaywright } = require("./playwright-runtime.cjs");
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
const base = process.env.PORTFOLIO_URL || "http://localhost:3014";
const output = path.resolve("output/review/final");
fs.mkdirSync(output, { recursive: true });
const report = {
  base,
  createdAt: new Date().toISOString(),
  checks: [],
  screenshots: [],
  runtimeErrors: [],
  consoleErrors: [],
  failures: [],
  internalLinks: [],
};
async function fillImages(page) {
  for (const image of await page.locator("img:visible").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
    assert.ok(
      await image.evaluate((element) => element.naturalWidth > 0),
      "Broken project image",
    );
  }
  await page.evaluate(() => scrollTo(0, 0));
}

function name(route) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}
async function recordScreenshot(page, file) {
  const full = path.join(output, file);
  await page.screenshot({ path: full, fullPage: true });
  report.screenshots.push(file);
}
(async () => {
  const { chromium } = loadPlaywright();
  const browser = process.env.PLAYWRIGHT_CDP_URL
    ? await chromium.connectOverCDP(process.env.PLAYWRIGHT_CDP_URL)
    : await chromium.launch({ headless: true });
  try {
    const links = new Set();
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        colorScheme: theme,
        viewport: { width: 1440, height: 1000 },
      });
      const page = await context.newPage();
      page.on("pageerror", (e) => report.runtimeErrors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") report.consoleErrors.push(m.text());
      });
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const route of routes) {
          const response = await page.goto(base + route, {
            waitUntil: "networkidle",
          });
          assert.equal(
            response.status(),
            route === "/missing-page" ? 404 : 200,
            route,
          );
          await fillImages(page);
          if (width <= 650) {
            await page.evaluate(() => scrollTo({ top: 500, behavior: "instant" }));
            const header = await page.locator(".site-header").evaluate((e) => {
              const box = e.getBoundingClientRect();
              return {
                top: box.top,
                sticky: getComputedStyle(e).position,
                controlsFit: Array.from(e.querySelectorAll("a,button")).every((control) => {
                  const rect = control.getBoundingClientRect();
                  return rect.left >= box.left && rect.right <= box.right;
                }),
              };
            });
            assert.equal(header.sticky, "sticky", "Mobile header must stick");
            assert.ok(Math.abs(header.top) < 1, "Mobile header remains at viewport top");
            assert.ok(header.controlsFit, "Navigation controls fit the mobile header");
            if (route === "/")
              await page.locator(".hero-separator").waitFor({ state: "visible" });
            await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
          }
          const state = await page.evaluate(() => {
            const visible = (e) =>
              e.checkVisibility({
                checkOpacity: true,
                checkVisibilityCSS: true,
              }) && !e.closest("[aria-hidden=true]");
            const missingNames = Array.from(
              document.querySelectorAll("a,button,summary"),
            )
              .filter(visible)
              .filter(
                (e) => !(e.getAttribute("aria-label") || e.textContent.trim()),
              )
              .map((e) => e.outerHTML.slice(0, 150));
            const anchors = Array.from(
              document.querySelectorAll('a[href^="#"]'),
            )
              .map((e) => e.getAttribute("href").slice(1))
              .filter(Boolean);
            const brokenAnchors = anchors.filter(
              (id) => !document.getElementById(id),
            );
            return {
              overflow: document.documentElement.scrollWidth > innerWidth,
              h1: document.querySelectorAll("h1").length,
              main: document.querySelectorAll("main").length,
              missingNames,
              brokenAnchors,
              links: Array.from(document.querySelectorAll("a"))
                .map((a) => a.getAttribute("href"))
                .filter(Boolean),
              font: getComputedStyle(document.body).fontFamily,
              scheme: getComputedStyle(document.documentElement).colorScheme,
              bodyBackground: getComputedStyle(document.body).backgroundColor,
              figures: document.querySelectorAll(".project-figure").length,
              navLabels: Array.from(document.querySelectorAll('.site-header nav a:not(.nav-resume)'))
                .map((e) => e.textContent.replace(/\s/g, "")),
              resumeInNavVisible: getComputedStyle(document.querySelector('.nav-resume')).display !== 'none',
              footerResume: !!document.querySelector('footer a[href="/rohit-mahar-resume.pdf"]'),
              themeBorder: getComputedStyle(document.querySelector('.theme-toggle')).borderTopWidth,
              headingSlash: !!document.querySelector('h1 .heading-slash'),
            };
          });
          assert.equal(
            state.overflow,
            false,
            `${theme} ${width} ${route}: horizontal overflow`,
          );
          assert.equal(state.h1, 1, route + " H1");
          assert.equal(state.main, 1, route + " main");
          assert.deepEqual(state.navLabels, ["/work", "/projects", "/about"]);
          assert.equal(state.resumeInNavVisible, width > 650);
          assert.equal(state.footerResume, true);
          assert.equal(state.themeBorder, "0px");
          assert.equal(state.headingSlash, ["/work", "/projects", "/about", "/contact"].includes(route));
          assert.deepEqual(state.missingNames, [], route + " accessible names");
          assert.deepEqual(state.brokenAnchors, [], route + " anchors");
          assert.ok(state.font.includes("Arial"));
          assert.equal(
            state.bodyBackground,
            theme === "dark" ? "rgb(27, 30, 25)" : "rgb(250, 250, 246)",
          );
          if (route === "/work" || route === "/work/lineupx-settings")
            assert.equal(
              state.figures,
              0,
              "Professional settings must remain text-only",
            );
          const nav = route.startsWith("/projects")
            ? "/projects"
            : route.startsWith("/work")
              ? "/work"
              : route === "/about"
                ? "/about"
                : null;
          if (nav)
            await page
              .locator(
                `nav[aria-label="Main navigation"] a[href="${nav}"][aria-current]`,
              )
              .waitFor();
          for (const href of state.links)
            if (href.startsWith("/") && !href.startsWith("//"))
              links.add(href.split("#")[0]);
          report.checks.push({
            theme,
            width,
            route,
            status: response.status(),
            overflow: false,
          });
          if (width === 390 || width === 1440)
            await recordScreenshot(
              page,
              `${theme}-${width}-${name(route)}.png`,
            );
        }
        console.log(`PASS: ${theme}, ${width}px, ${routes.length} routes`);
      }
      await context.close();
    }
    const context = await browser.newContext({
      colorScheme: "light",
      viewport: { width: 1440, height: 1000 },
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => report.runtimeErrors.push(e.message));
    await page.goto(base + "/projects", { waitUntil: "networkidle" });
    for (const [label, count] of [
      ["Products", 3],
      ["Tools", 4],
      ["UI explorations", 1],
      ["All projects", 8],
    ]) {
      await page.getByRole("button", { name: new RegExp("^" + label) }).click();
      assert.equal(await page.locator(".project-card").count(), count);
      assert.equal(
        await page
          .getByRole("button", { name: new RegExp("^" + label) })
          .getAttribute("aria-pressed"),
        "true",
      );
      await recordScreenshot(
        page,
        "filter-" + label.replaceAll(" ", "-") + ".png",
      );
    }
    await page.goto(base + "/contact", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Copy email address" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Email address copied." })
      .waitFor();
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: () => Promise.reject(new Error("blocked")) },
      });
      // Failure feedback requires both the modern and compatibility paths to fail.
      Object.defineProperty(document, "execCommand", {
        configurable: true,
        value: () => false,
      });
    });
    await page.getByRole("button", { name: "Copy email address" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Copy unavailable." })
      .waitFor();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent.trim()),
      "Skip to content",
    );
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main");
    const themeButton = page.getByRole("button", {
      name: "Dark theme",
      exact: true,
    });
    await themeButton.focus();
    assert.equal(
      await themeButton.evaluate((e) => getComputedStyle(e).outlineStyle),
      "solid",
    );
    await page.keyboard.press("Enter");
    await page
      .getByRole("button", { name: "Light theme", exact: true })
      .waitFor();
    await page.reload({ waitUntil: "networkidle" });
    await page
      .getByRole("button", { name: "Light theme", exact: true })
      .waitFor();
    const second = await context.newPage();
    await second.goto(base, { waitUntil: "networkidle" });
    await second
      .getByRole("button", { name: "Light theme", exact: true })
      .waitFor();
    await page
      .getByRole("button", { name: "Light theme", exact: true })
      .click();
    await second
      .getByRole("button", { name: "Dark theme", exact: true })
      .waitFor();
    await second.close();
    await page.emulateMedia({ colorScheme: "dark" });
    await page
      .getByRole("button", { name: "Light theme", exact: true })
      .waitFor();
    await page.emulateMedia({ colorScheme: "light" });
    await page
      .getByRole("button", { name: "Dark theme", exact: true })
      .waitFor();
    for (const [slug, button, after] of [
      ["pr-tracker", "Resume demo", "Reset demo"],
      ["next-shelf", "Start reading", "Move to want to read"],
    ]) {
      await page.goto(base + "/projects/" + slug, { waitUntil: "networkidle" });
      await page.locator("details summary").click();
      await page.getByRole("button", { name: button, exact: true }).click();
      await page.getByRole("button", { name: after, exact: true }).waitFor();
    }
    await page.goto(base + "/projects/context-flow-ai", {
      waitUntil: "networkidle",
    });
    await page.locator("details summary").click();
    await page.getByRole("button", { name: /Instructions/ }).click();
    await page
      .getByText("How the response should be written.", { exact: true })
      .waitFor();
    for (const [old, target] of [
      ["/experience", "/work"],
      ["/work/pr-tracker", "/projects/pr-tracker"],
    ]) {
      await page.goto(base + old, { waitUntil: "networkidle" });
      assert.equal(new URL(page.url()).pathname, target);
    }
    for (const href of links) {
      const r = await context.request.get(base + href);
      assert.equal(r.status(), 200, "Internal target " + href);
      report.internalLinks.push(href);
    }
    assert.deepEqual(report.runtimeErrors, [], "Runtime errors");
    // A404 is an expected console network error; other console errors remain failures.
    const unexpected = report.consoleErrors.filter((e) => !e.includes("404"));
    assert.deepEqual(unexpected, [], "Unexpected console errors");
    await context.close();
    report.interactions =
      "Filters, copy success/failure, skip link, focus, keyboard theme, persistence, tab sync, system preference, demos, and redirects passed";
    console.log(
      "PASS: filters, contact, keyboard/focus, theme persistence/tab/system, demos, redirects and internal links",
    );
  } catch (e) {
    report.failures.push(e.message);
    console.error(e);
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(
      path.join(output, "report.json"),
      JSON.stringify(report, null, 2),
    );
    await browser.close();
    console.log("Report: " + path.join(output, "report.json"));
  }
})();
