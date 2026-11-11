// Cek lintas paket TKP: konstruk dan latar tidak kembar antarpaket maupun terhadap bank lama.
// usage: node tmp/cek_lintas_paket.js <paket_baru.html> [pembanding.html ...]
// Tanpa pembanding: Bank_Soal_TKP_HOTS_80.html + Bank_Soal_TKP_HOTS_12.html (Batch 1).
// Batch 2 tidak ikut karena sama dengan soal 1-12 bank 80.
// Penutup maks 8x per paket sudah dicek validate_soal.js (phraseCap), tidak diulang di sini.
'use strict';
const fs = require('fs');
const path = require('path');

const [baru, ...argPembanding] = process.argv.slice(2);
if (!baru) {
  console.error('usage: node tmp/cek_lintas_paket.js <paket_baru.html> [pembanding.html ...]');
  process.exit(2);
}
const dir = path.join(__dirname, '..');
const pembanding = argPembanding.length ? argPembanding
  : ['Bank_Soal_TKP_HOTS_80.html', 'Bank_Soal_TKP_HOTS_12.html'].map((f) => path.join(dir, f));

// Ambang dikalibrasi ke bank 80 + Batch 1 (2026-10-25): Jaccard kata isi konstruk maks 0.29,
// satu-satunya pasang >= 0.25 (B80-12 vs B1-11) memang konstruk mirip. Cek ini leksikal:
// parafrase dengan kata lain lolos, jadi tetap perlu dibaca manusia.
const KEMBAR = 0.4;
const MIRIP = 0.25;
const LATAR_MIN = 0; // dihapus putusan Gusti 2026-11-11: latar sebatas pengalaman lulusan SMA, tidak wajib melebar (dulu 12)
const LATAR_MAKS = 3;

const decode = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const normalized = (t) => t.toLocaleLowerCase('id-ID').normalize('NFKD')
  .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const stopwords = new Set(['dengan', 'untuk', 'kepada', 'dalam', 'tidak', 'sudah', 'belum', 'karena', 'secara', 'tersebut', 'bahwa', 'sebagai', 'antara', 'setiap', 'masih', 'akan', 'yang', 'sedang', 'telah', 'hanya', 'semua', 'bagi', 'pada', 'dari', 'agar', 'supaya']);
const contentWords = (t) => new Set(normalized(t).split(' ').filter((w) => w.length >= 5 && !stopwords.has(w)));
const jaccard = (a, b) => {
  let i = 0;
  for (const x of a) if (b.has(x)) i += 1;
  return i / (a.size + b.size - i || 1);
};
const field = (block, label) => {
  const m = block.match(new RegExp(`<span class="label">${label}</span>([\\s\\S]*?)</div>`));
  return m ? decode(m[1]) : null;
};

const baca = (file) => {
  const tag = path.basename(file, '.html');
  const html = fs.readFileSync(file, 'utf8');
  return [...html.matchAll(/<!--\s*SOAL\s*(\d+)\s*-->([\s\S]*?)(?=<!--\s*SOAL\s*\d+\s*-->|$)/g)].map(([, n, raw]) => {
    const stem = decode((raw.match(/<div class="stem">([\s\S]*?)<\/div>/) || [])[1]);
    const konstruk = field(raw, 'Konstruk') || '';
    const latar = field(raw, 'Latar');
    // bank lama tanpa field Latar: pakai peran di kalimat pertama ("Anda petugas loket Samsat.")
    const peran = (stem.match(/^(?:Anda|Kamu)\s+([^.,;]+)/i) || [])[1] || '';
    return { id: `${tag}#${n}`, konstruk, kw: contentWords(konstruk), latar, latarTeks: normalized(latar || peran) };
  });
};

const errors = [];
const warnings = [];
const soalBaru = baca(baru);
if (!soalBaru.length) errors.push(`${baru}: no "<!-- SOAL n -->" markers`);

// Dalam paket baru: field Latar wajib, >= 12 latar berbeda, satu latar maks 3x
const latarCount = {};
for (const s of soalBaru) {
  if (!s.latar) { errors.push(`${s.id}: missing "Latar" field`); continue; }
  latarCount[s.latarTeks] = (latarCount[s.latarTeks] || 0) + 1;
}
const nLatar = Object.keys(latarCount).length;
if (soalBaru.length >= 30 && nLatar < LATAR_MIN) errors.push(`latar berbeda ${nLatar}, minimal ${LATAR_MIN} per paket`);
for (const [l, c] of Object.entries(latarCount)) {
  if (c > LATAR_MAKS) errors.push(`latar "${l}" dipakai ${c}x, maks ${LATAR_MAKS} per paket`);
}

// Pasangan: paket baru vs dirinya sendiri + semua pembanding
const lain = pembanding.flatMap(baca);
const cekPasang = (a, b) => {
  const j = jaccard(a.kw, b.kw);
  const latarSama = a.latarTeks && b.latarTeks.includes(a.latarTeks);
  const info = `${a.id} vs ${b.id} (Jaccard ${j.toFixed(2)}): "${a.konstruk}" | "${b.konstruk}"`;
  if (normalized(a.konstruk) === normalized(b.konstruk) || j >= KEMBAR) errors.push(`konstruk kembar: ${info}`);
  else if (j >= MIRIP && latarSama) errors.push(`konstruk mirip + latar sama "${a.latarTeks}": ${info}`);
  else if (j >= MIRIP) warnings.push(`konstruk mirip: ${info}`);
};
soalBaru.forEach((a, i) => {
  soalBaru.slice(i + 1).forEach((b) => cekPasang(a, b));
  lain.forEach((b) => cekPasang(a, b));
});

console.log(JSON.stringify({ baru, pembanding, soal: soalBaru.length, latar: latarCount, warnings, errors }, null, 2));
if (errors.length) process.exit(1);
