// Isi tabel Ringkasan Paket dari blok soal di bank HTML (menggantikan penanda <!--SUMMARY-->).
// Pola parsing menyalin regex di tmp/validate_soal.js supaya satu sumber kebenaran.
'use strict';
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('usage: node tmp/build_summary.js <bank.html>'); process.exit(2); }
let html = fs.readFileSync(file, 'utf8');

const decode = (s) => (s || '').replace(/<[^>]+>/g, ' ')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&hellip;/g, '...')
  .replace(/&middot;/g, '·').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();
const field = (block, label) => {
  const m = block.match(new RegExp(`<span class="label">${label}</span>([\\s\\S]*?)</div>`));
  return m ? decode(m[1]) : '';
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const rows = [];
for (const [, numStr, raw] of html.matchAll(/<!--\s*SOAL\s*(\d+)\s*-->([\s\S]*?)(?=<!--\s*SOAL\s*\d+\s*-->|<div class="footer-note">|$)/g)) {
  const dim = (raw.match(/<span class="badge dim-[A-Za-z]+">([^<]+)<\/span>/) || [, '?'])[1];
  const kunci = field(raw, 'Kunci');
  const konstruk = field(raw, 'Konstruk');
  const level = field(raw, 'Level');
  const poin = (raw.match(/<span class="label">Poin<\/span>([\s\S]*?)<\/div>/) || [, ''])[1];
  const sumbu = {};
  for (const seg of poin.split('&middot;')) {
    const p = seg.match(/([A-E])\s*=\s*(\d)/);
    const s = seg.match(/<code class="sumbu">(S[1-5])<\/code>/);
    if (p && s) sumbu[p[2]] = s[1];
  }
  rows.push(`  <tr><td>${numStr}</td><td>${esc(dim)}</td><td>${esc(konstruk)}</td>` +
    `<td class="center">${kunci}</td><td class="center">${sumbu['4'] || '—'}</td>` +
    `<td class="center">${sumbu['3'] || '—'}</td><td class="center">${esc(level)}</td></tr>`);
}
if (!html.includes('<!--SUMMARY-->')) { console.error('penanda <!--SUMMARY--> tidak ditemukan'); process.exit(1); }
html = html.replace('<!--SUMMARY-->', rows.join('\n'));
fs.writeFileSync(file, html);
console.log(`summary rows: ${rows.length}`);
