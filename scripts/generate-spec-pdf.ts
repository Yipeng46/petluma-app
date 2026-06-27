import { chromium } from "@playwright/test";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MD_PATH = path.join(ROOT, "docs/PetLuma-Physical-Passport-Specification-v1.0.md");
const PDF_PATH = path.join(ROOT, "docs/PetLuma-Physical-Passport-Specification-v1.0.pdf");

const CSS = `
  @page { size: A4; margin: 18mm 16mm 20mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1a1a1a;
    max-width: 100%;
  }
  h1 {
    font-size: 20pt;
    font-weight: 600;
    margin: 0 0 12pt;
    padding-bottom: 8pt;
    border-bottom: 1.5pt solid #2e2820;
    page-break-after: avoid;
  }
  h2 {
    font-size: 14pt;
    font-weight: 600;
    margin: 18pt 0 8pt;
    color: #2e2820;
    page-break-after: avoid;
  }
  h3 {
    font-size: 11.5pt;
    font-weight: 600;
    margin: 14pt 0 6pt;
    page-break-after: avoid;
  }
  p { margin: 0 0 8pt; }
  hr {
    border: none;
    border-top: 0.75pt solid #ccc;
    margin: 14pt 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8pt 0 12pt;
    font-size: 9pt;
    page-break-inside: avoid;
  }
  th, td {
    border: 0.75pt solid #888;
    padding: 5pt 6pt;
    text-align: left;
    vertical-align: top;
  }
  th { background: #f3f0ea; font-weight: 600; }
  pre {
    font-family: Consolas, "Courier New", monospace;
    font-size: 8pt;
    line-height: 1.35;
    background: #f7f5f0;
    border: 0.75pt solid #ddd;
    padding: 8pt 10pt;
    margin: 8pt 0 12pt;
    white-space: pre-wrap;
    word-break: break-all;
    page-break-inside: avoid;
  }
  code {
    font-family: Consolas, "Courier New", monospace;
    font-size: 9pt;
    background: #f0ede6;
    padding: 1pt 3pt;
  }
  ul, ol { margin: 0 0 8pt; padding-left: 18pt; }
  li { margin-bottom: 4pt; }
  strong { font-weight: 600; }
  .meta { font-size: 9pt; color: #555; margin-bottom: 14pt; }
`;

async function main() {
  const markdown = fs.readFileSync(MD_PATH, "utf-8");
  const body = marked.parse(markdown, { gfm: true, breaks: false });

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>PetLuma Physical Passport Specification v1.0</title>
  <style>${CSS}</style>
</head>
<body>${body}</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({
    path: PDF_PATH,
    format: "A4",
    printBackground: true,
    margin: { top: "18mm", bottom: "20mm", left: "16mm", right: "16mm" },
  });
  await browser.close();

  console.log(`PDF written: ${PDF_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
