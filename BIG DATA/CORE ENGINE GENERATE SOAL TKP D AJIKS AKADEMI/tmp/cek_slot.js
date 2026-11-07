// Cek soal vs blueprint per slot: kunci, kata per opsi, opsi dua-langkah, poin, sumbu, jebakan, latar, penutup.
// usage: node cek_slot.js <paket.html> <blueprint.json> <dari> <sampai>
'use strict';
const fs = require('fs');
const [file, bpFile, dari, sampai] = process.argv.slice(2);
const html = fs.readFileSync(file, 'utf8');
const bp = JSON.parse(fs.readFileSync(bpFile, 'utf8'));
const decode = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&hellip;/g, '...').replace(/&times;/g, '×').replace(/&middot;/g, '·')
  .replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const comboRe = /\b(sambil|sekaligus|serta|disertai|lalu|kemudian|setelah itu)\b|\bdan\s+me[a-z]/i;
const blocks = new Map([...html.matchAll(/<!--\s*SOAL\s*(\d+)\s*-->([\s\S]*?)(?=<!--\s*SOAL\s*\d+\s*-->|<!-- AKHIR SOAL -->|$)/g)]
  .map((m) => [Number(m[1]), m[2]]));
let bad = 0;
for (let n = Number(dari); n <= Number(sampai); n++) {
  const s = bp.slots[n - 1];
  const raw = blocks.get(n);
  const err = [];
  if (!raw) { console.log(`${n}: TIDAK ADA`); bad++; continue; }
  const field = (l) => { const m = raw.match(new RegExp(`<span class="label">${l}</span>([\\s\\S]*?)</div>`)); return m ? decode(m[1]) : ''; };
  const opts = [...raw.matchAll(/opt-letter[^>]*>([A-E])\.<\/span><span class="opt-text[^"]*">([\s\S]*?)<\/span>/g)]
    .map((m) => ({ l: m[1], t: decode(m[2]) }));
  for (const o of opts) {
    const wc = o.t.split(/\s+/).length;
    if (wc !== s.kata[o.l]) err.push(`${o.l} ${wc} kata, blueprint ${s.kata[o.l]}`);
  }
  const dua = opts.filter((o) => comboRe.test(o.t)).map((o) => o.l).join('');
  if (dua !== s.duaLangkah.join('')) err.push(`dua-langkah ${dua || '-'} vs ${s.duaLangkah.join('') || '-'}`);
  if (field('Kunci') !== s.kunci) err.push(`kunci ${field('Kunci')} vs ${s.kunci}`);
  const poin = field('Poin');
  for (const l of 'ABCDE') {
    const m = poin.match(new RegExp(`${l}=(\\d)`));
    if (!m || Number(m[1]) !== s.poin[l]) err.push(`poin ${l}=${m && m[1]} vs ${s.poin[l]}`);
  }
  const huruf = (p) => 'ABCDE'.split('').find((l) => s.poin[l] === p);
  const seg = (l) => (poin.split('·').find((x) => x.trim().startsWith(`${l}=`)) || '');
  if (!seg(huruf(3)).includes(s.sumbu.poin3)) err.push(`sumbu poin3 bukan ${s.sumbu.poin3}`);
  if (!seg(huruf(4)).includes(s.sumbu.poin4)) err.push(`sumbu poin4 bukan ${s.sumbu.poin4}`);
  if (!seg(s.jebakan.huruf).includes(s.jebakan.kode)) err.push(`jebakan ${s.jebakan.kode} tidak di ${s.jebakan.huruf}`);
  if (field('Latar') !== s.latar) err.push(`latar ${field('Latar')} vs ${s.latar}`);
  const stem = decode((raw.match(/<div class="stem">([\s\S]*?)<\/div>/) || ['', ''])[1]);
  if (!stem.toLowerCase().includes(s.penutup.replace(/\.\.\.$/, '').toLowerCase())) err.push(`penutup bukan "${s.penutup}"`);
  if (s.tanggaAR && !field('Tangga AR').includes(s.tanggaAR)) err.push(`tangga AR bukan ${s.tanggaAR}`);
  const pas = field('Pasangan');
  if (String(s.pasangan || '—') !== pas) err.push(`pasangan ${pas} vs ${s.pasangan || '—'}`);
  console.log(`${n}: ${err.length ? err.join('; ') : 'OK'}`);
  bad += err.length;
}
process.exit(bad ? 1 : 0);
