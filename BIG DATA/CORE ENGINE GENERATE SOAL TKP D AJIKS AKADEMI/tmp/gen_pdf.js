// HTML → PDF lewat puppeteer-core + Chrome asli, tanpa header/footer (lihat PROJECT_MEMORY.md
// "Cara generate PDF"). puppeteer-core di luar repo: NODE_PATH=<folder>/node_modules.
// usage: node tmp/gen_pdf.js <in.html> <out.pdf>
'use strict';
const path = require('path');
const puppeteer = require('puppeteer-core');

(async () => {
  const [inp, out] = process.argv.slice(2);
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(inp), { waitUntil: 'networkidle0' });
  await page.pdf({
    path: out, format: 'A4', printBackground: true, displayHeaderFooter: false,
    margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' },
  });
  await browser.close();
  console.log('ok', out);
})();
