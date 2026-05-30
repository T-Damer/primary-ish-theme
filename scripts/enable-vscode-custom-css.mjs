#!/usr/bin/env node
/**
 * Inlines primary-ish-effects.css into VS Code workbench.html
 * (same approach as be5invis.vscode-custom-css v7.x).
 */
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const VSCODE_APP =
  "/Applications/Visual Studio Code.app/Contents/Resources/app/out";
const HTML_CANDIDATES = [
  path.join(VSCODE_APP, "vs/code/electron-browser/workbench/workbench.html"),
  path.join(VSCODE_APP, "vs/code/electron-sandbox/workbench/workbench.html"),
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CSS = path.resolve(
  __dirname,
  "../custom-css/primary-ish-effects.css"
);

function resolveImportUrl(url) {
  return url.replace(/\$\{userHome\}/g, os.homedir());
}

async function findHtml() {
  for (const p of HTML_CANDIDATES) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* try next */
    }
  }
  throw new Error("workbench.html not found under VS Code app bundle");
}

function clearPatches(html) {
  return html
    .replace(
      /<!-- !! VSCODE-CUSTOM-CSS-START !! -->[\s\S]*?<!-- !! VSCODE-CUSTOM-CSS-END !! -->\n*/g,
      ""
    )
    .replace(/<!-- !! VSCODE-CUSTOM-CSS-SESSION-ID [\w-]+ !! -->\n*/g, "");
}

async function main() {
  const cssPath = process.argv[2] || DEFAULT_CSS;
  const css = await fs.readFile(cssPath, "utf8");
  const htmlPath = await findHtml();
  const workbenchDir = path.dirname(htmlPath);
  const sessionId = randomUUID();
  const backupInWorkbench = path.join(
    workbenchDir,
    `workbench.${sessionId}.bak-custom-css`
  );
  const backupInHome = path.join(
    os.homedir(),
    ".primary-ish-vscode",
    `workbench.${sessionId}.bak-custom-css`
  );

  let html = await fs.readFile(htmlPath, "utf8");
  if (!html.includes("VSCODE-CUSTOM-CSS-SESSION-ID")) {
    try {
      await fs.writeFile(backupInWorkbench, clearPatches(html), "utf8");
      console.log("Backup:", backupInWorkbench);
    } catch {
      await fs.mkdir(path.dirname(backupInHome), { recursive: true });
      await fs.writeFile(backupInHome, clearPatches(html), "utf8");
      console.log("Backup:", backupInHome);
    }
  }

  html = clearPatches(html);
  html = html.replace(
    /<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>/,
    ""
  );

  const inject =
    `<!-- !! VSCODE-CUSTOM-CSS-SESSION-ID ${sessionId} !! -->\n` +
    "<!-- !! VSCODE-CUSTOM-CSS-START !! -->\n" +
    `<style>\n${css}\n</style>\n` +
    "<!-- !! VSCODE-CUSTOM-CSS-END !! -->\n";

  if (html.includes("</head>")) {
    html = html.replace("</head>", `${inject}</head>`);
  } else {
    throw new Error("Unexpected workbench.html structure (no </head>)");
  }

  await fs.writeFile(htmlPath, html, "utf8");
  console.log("Patched:", htmlPath);
  console.log("CSS from:", cssPath);
  console.log("Quit VS Code completely (Cmd+Q), then reopen.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
