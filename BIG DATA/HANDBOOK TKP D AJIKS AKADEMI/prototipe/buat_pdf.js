// HTML → PDF memakai ukuran dan margin @page dari CSS (header/footer lewat @page, bukan Chrome).
// usage (sekali `npm install` di akar repo): node buat_pdf.js <in.html> <out.pdf>
'use strict';
const path = require('path');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer');

(async () => {
  const [inp, out] = process.argv.slice(2);
  const browser = await puppeteer.launch({
    headless: 'new', args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve(inp)).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, printBackground: true, displayHeaderFooter: false, preferCSSPageSize: true });
  await browser.close();
  console.log('ok', out);
})();
