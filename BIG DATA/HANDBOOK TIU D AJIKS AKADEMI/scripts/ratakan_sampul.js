// Sampul HTML → satu gambar utuh. Pembaca PDF Apple dan HP salah menggambar bayangan dan pinggiran pudar sampul.
// usage (sekali `npm install` di akar repo): node ratakan_sampul.js <in.html> <out.jpg>
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
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 3 });
  await page.goto(pathToFileURL(path.resolve(inp)).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await (await page.$('.cover')).screenshot({ path: out, type: 'jpeg', quality: 92 });
  await browser.close();
})();
