const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
function loadPlaywright() {
  try {
    return require("playwright");
  } catch {}
  const cache = path.join(os.homedir(), ".npm", "_npx");
  const candidates = fs
    .readdirSync(cache)
    .map((p) => path.join(cache, p, "node_modules", "playwright"))
    .filter((p) => fs.existsSync(path.join(p, "package.json")));
  candidates.sort((a, b) =>
    require(path.join(b, "package.json")).version.localeCompare(
      require(path.join(a, "package.json")).version,
      undefined,
      { numeric: true },
    ),
  );
  for (const p of candidates) {
    const pw = require(p);
    if (fs.existsSync(pw.chromium.executablePath())) return pw;
  }
  throw Error("Install a Playwright browser before running QA.");
}

module.exports = { loadPlaywright };
