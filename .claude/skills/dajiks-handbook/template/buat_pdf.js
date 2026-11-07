// HTML → PDF memakai ukuran dan margin @page dari CSS (header/footer lewat @page, bukan Chrome).
// usage: NODE_PATH=<puppeteer-core>/node_modules node buat_pdf.js <in.html> <out.pdf>
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
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, printBackground: true, displayHeaderFooter: false, preferCSSPageSize: true });
  await browser.close();
  console.log('ok', out);
})();
