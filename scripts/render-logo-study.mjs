import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = process.cwd();
const output = path.join(root, "output/review/logo-isolation");
fs.mkdirSync(output, { recursive: true });
const glyphs = JSON.parse(
  fs.readFileSync("src/data/brand-glyphs.json", "utf8"),
);
const playground = JSON.parse(
  fs.readFileSync("design/logo-playground.json", "utf8"),
);
const before = { paths: { r: glyphs.paths.r, m: playground.previousM } };
const original = fs
  .readFileSync("design/logo-reference.svg", "utf8")
  .replace(/\s*<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, "")
  .replace(/\s+(id|aria-labelledby)="[^"]*"/g, "")
  .replace('role="img"', 'aria-hidden="true"')
  .replaceAll("#364e37", "var(--brand-slash)")
  .replaceAll("#e0e9ac", "var(--ink)");
const motionSource = fs.readFileSync("src/lib/wordmark-motion.ts", "utf8");
const motionModule = path.join(output, "wordmark-motion.cjs");
fs.writeFileSync(
  motionModule,
  ts.transpileModule(motionSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText,
);
const browserMotion = ts.transpileModule(motionSource, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const source = fs
  .readFileSync("src/components/BrandLogo.tsx", "utf8")
  .replace(
    '"@/data/brand-glyphs.json"',
    JSON.stringify(path.join(root, "src/data/brand-glyphs.json")),
  )
  .replace('"@/lib/wordmark-motion"', JSON.stringify(motionModule));
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
}).outputText;
const temp = path.join(output, "BrandLogo.cjs");
fs.writeFileSync(temp, compiled);
const loadModule = createRequire(import.meta.url);
const BrandLogo = loadModule(temp).default;
const globals = fs.readFileSync("src/app/globals.css", "utf8");
const start = globals.indexOf("/* Each suffix folds");
let css = globals.slice(
  start,
  globals.indexOf(".site-header .identity:hover", start),
);
css = css
  .replaceAll(
    ":is(:hover, :focus-visible)",
    ":is(:hover, :focus-visible, .preview-open)",
  )
  .replaceAll(".identity:hover", ".identity:is(:hover, .preview-open)");
const reference = `<a class="identity" href="#"><span class="reference-logo">${original}</span></a>`;
const wrong = `<a class="identity" href="#"><span class="reference-logo"><svg viewBox="0 0 920 560" aria-hidden="true"><path fill="var(--ink)" d="${before.paths.m}"/><path fill="var(--brand-slash)" d="${before.paths.r}"/></svg></span></a>`;
const candidate = (prefix) =>
  `<a class="identity" href="#" aria-label="Expand Rohit Mahar logo">${renderToStaticMarkup(createElement(BrandLogo), { identifierPrefix: prefix })}</a>`;
const fullM = (d, completion = "") =>
  `<svg class="full-m" viewBox="0 0 920 560" aria-hidden="true">${completion ? `<path fill="var(--ink)" stroke="var(--ink)" stroke-width="2" d="${completion}"/>` : ""}<path fill="var(--ink)" d="${d}"/></svg>`;
const section = (
  theme,
) => `<section class="theme-panel ${theme}" data-theme="${theme}">
<h2>${theme} mode</h2><div class="comparison">
<div class="sample"><h3>Original supplied logo</h3><div class="small original">${reference}</div><div class="zoom original">${reference}</div></div>
<div class="sample"><h3>Current regression</h3><div class="small regression">${wrong}</div><div class="zoom regression">${wrong}</div></div>
<div class="sample"><h3>Restored overlap</h3><div class="small restored">${candidate(theme + "-small-")}</div><div class="zoom restored">${candidate(theme + "-zoom-")}</div></div>
</div><div class="m-comparison"><div><h3>Previous extended m</h3>${fullM(before.paths.m)}</div><div><h3>Complete m behind the original cut</h3>${fullM(glyphs.paths.m, glyphs.mCompletion)}</div></div>
<h3>Hover or focus to expand · move away to tuck</h3><div class="motion-stage">${candidate(theme + "-motion-")}</div>
<button class="expand" type="button">Expand</button> <button class="collapse" type="button">Tuck</button> <button class="intro" type="button">Replay five-second intro</button>
</section>`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>RM overlap and motion study</title><style>
*{box-sizing:border-box}body{margin:0;background:#e1e1d9;color:#262923;font:15px/1.5 Arial,Helvetica,sans-serif;padding:32px}h1{font-size:28px;margin:0 0 6px}h2{font-size:24px}h3{font-size:14px;font-weight:500;margin:0 0 16px}p{margin:0 0 24px;max-width:78ch}button,select{font:inherit;padding:8px 12px;min-height:44px}header{margin-bottom:28px}section{padding:28px;margin-bottom:24px;background:var(--paper);color:var(--ink);overflow:hidden}.theme-panel{--paper:#fafaf6;--ink:#262923;--brand-slash:#687137;--ease-press:cubic-bezier(.23,1,.32,1)}.dark{--paper:#1b1e19;--ink:#f0f0e6;--brand-slash:#dce597}.comparison{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.sample{min-width:0}.small{height:56px;display:flex;align-items:center}.zoom{height:150px;padding-top:12px}.zoom>.reference-logo,.zoom>.identity{transform:scale(4);transform-origin:top left}.reference-logo{display:block;width:44px;height:27px}.reference-logo svg{display:block;width:44px;height:27px}.identity{display:inline-flex;align-items:center;min-height:44px;text-decoration:none}.brand-logo{display:block;width:44px;pointer-events:none}.brand-logo path{transform-box:fill-box;transform-origin:center}.m-comparison{display:flex;gap:100px;margin:24px 0}.full-m{width:160px;height:auto}.motion-stage{height:76px;padding:16px 0}.soft .brand-letter-step{transition-timing-function:cubic-bezier(.45,0,.55,1)}.before-timing .brand-letter-step{transition-duration:110ms;transition-timing-function:cubic-bezier(.4,0,.2,1)}@media(max-width:800px){body{padding:12px}section{padding:18px}.comparison{grid-template-columns:1fr}.zoom{display:none}.m-comparison{gap:24px}.full-m{width:120px}}
${css}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}}
</style></head><body><header><h1>RM overlap and motion study</h1><p>The original mark, earlier versions, easing experiments and ordered tuck live here for reuse. Compare the curved gap and complete m independently of the portfolio.</p><label>Motion preset <select id="curve">${playground.presets.map((p) => `<option value="${p.id}">${p.label}</option>`).join("")}</select></label></header>${section("light")}${section("dark")}
<script type="module">
${browserMotion}
const playgroundPresets = ${JSON.stringify(playground.presets)};
const motions = new Map();
function bindAll(options={}) { motions.forEach(m=>m?.destroy()); motions.clear(); document.querySelectorAll('.identity .brand-logo').forEach(root=>motions.set(root.parentElement,bindWordmarkMotion(root,options))); }
bindAll();
document.querySelectorAll('.identity').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
document.querySelector('#curve').addEventListener('change',e=>{document.body.className=''; const preset=playgroundPresets.find(p=>p.id===e.target.value);bindAll(preset?.motion??{});});
document.querySelectorAll('.expand').forEach(b=>b.addEventListener('click',()=>motions.get(b.parentElement.querySelector('.motion-stage .identity'))?.open()));
document.querySelectorAll('.collapse').forEach(b=>b.addEventListener('click',()=>motions.get(b.parentElement.querySelector('.motion-stage .identity'))?.close()));
document.querySelectorAll('.intro').forEach(b=>b.addEventListener('click',()=>{const motion=motions.get(b.parentElement.querySelector('.motion-stage .identity'));if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;motion?.seek(true);clearTimeout(b.introTimer);b.introTimer=setTimeout(()=>motion?.finishIntro(),5000);}));
</script></body></html>`;
fs.writeFileSync("design/logo-study.html", html);
console.log("Created design/logo-study.html from the actual logo component.");
