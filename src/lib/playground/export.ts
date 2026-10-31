import alphabet from "@/data/wordmark-alphabet.json";
import runtimeSource from "./runtime-source.json";
import { easings, type Settings } from "./settings";

export function exportWordmark(settings: Settings, format: "html" | "react") {
  const needed = new Set((settings.first + settings.second).split(""));
  const merged = settings.first[0] === "r" && settings.second[0] === "m";
  const subset = {glyphs:Object.fromEntries(Object.entries(alphabet.glyphs).filter(([key]) => needed.has(key))), ...(merged ? {rm:alphabet.rm} : {})};
  const config = {...settings,easing:easings[settings.easing].value};
  // This function has no imports or captured variables: both exports run the
  // very same renderer as the preview, including all clipping and timing.
  const engine = runtimeSource;
  const data = `const alphabet = ${JSON.stringify(subset, null, 2)};\nconst settings = ${JSON.stringify(config, null, 2)};`;
  if (format === "react") return `"use client";\nimport { useEffect, useRef } from "react";\n\n${engine}\n\n${data}\n\n// Save as Wordmark.jsx. No dependencies beyond React.\nexport default function Wordmark() {\n  const host = useRef(null);\n  const motion = useRef(null);\n  useEffect(() => {\n    motion.current = createWordmark(host.current, settings, alphabet);\n    return () => motion.current.destroy();\n  }, []);\n  return (\n    <div style={{ background: settings.background, padding: 24, color: settings.secondColor }}>\n      <div ref={host} style={{ height: 200, width: settings.size + '%', maxWidth: '100%' }} />\n      <button type="button" onClick={() => motion.current.play(1)}>Tuck name</button>\n      <button type="button" onClick={() => motion.current.play(-1)}>Expand name</button>\n      <button type="button" onClick={() => motion.current.pause()}>Pause</button>\n    </div>\n  );\n}\n`;
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${settings.first} ${settings.second} — wordmark</title>\n<style>\nbody{margin:0;padding:24px;background:${settings.background};color:${settings.secondColor};font:16px/1.5 Arial,sans-serif} .wordmark{height:200px;width:${settings.size}%;max-width:100%} button{font:inherit;min-height:44px;margin:8px 8px 0 0;padding:8px 16px}\n</style>\n</head>\n<body>\n<div class="wordmark" id="wordmark"></div>\n<button id="tuck" type="button">Tuck name</button>\n<button id="expand" type="button">Expand name</button>\n<button id="pause" type="button">Pause</button>\n<script>\n${engine}\n${data}\nconst motion = createWordmark(document.getElementById('wordmark'), settings, alphabet);\ndocument.getElementById('tuck').onclick = () => motion.play(1);\ndocument.getElementById('expand').onclick = () => motion.play(-1);\ndocument.getElementById('pause').onclick = () => motion.pause();\n</script>\n</body>\n</html>`;
}
