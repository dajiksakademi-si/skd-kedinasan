// Blueprint 45 slot per paket TKP (rencana produksi 3 paket §4): kuota paket dipasang SEBELUM
// soal ditulis, lalu dicek sendiri. Soal ditulis per slot; validate_soal.js tetap hakim akhir.
// usage: node tmp/blueprint_tkp.js <paket 1|2|3> [--force]   → tmp/blueprint_paket<n>.json
//        node tmp/blueprint_tkp.js --cek <blueprint.json>     → cek ulang blueprint yang sudah diedit
//        node tmp/blueprint_tkp.js --selftest
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
// Pilar 6: grid paket 45 + Sangat Tinggi per dimensi (total 18, sisanya Tinggi = 27)
const GRID = {
  Profesionalisme: [9, 4], 'Pelayanan Publik': [9, 4], 'Jejaring Kerja': [7, 3],
  'Sosial Budaya': [7, 3], TIK: [6, 2], 'Anti Radikalisme': [7, 2],
};
const PENUTUP = ['Sikap Anda adalah...', 'Apa yang Anda lakukan?', 'Langkah paling tepat adalah...',
  'Apa tindakan paling tepat?', 'Tindakan paling tepat adalah...', 'Respons paling tepat adalah...',
  'Langkah pertama yang Anda ambil adalah...', 'Apa respons Anda?'];
const TANGGA_AR = ['dugaan', 'ucapan/candaan', 'kabar dari pihak lain', 'konten menyebar',
  'pola nyata/terorganisasi', 'ajakan/tindakan nyata'];
const POIN1 = ['a lempar beban', 'b sibuk di samping masalah', 'c bagi rata', 'd berkorban buta',
  'e nilai sah jadi dalih', 'f mengucilkan'];
// Latar generik (tanpa nama lembaga nyata). Boleh diedit Gusti; minimal 18 entri.
const LATAR = ['puskesmas', 'rumah sakit daerah', 'kantor kecamatan', 'kantor desa', 'sekolah menengah',
  'kampus kedinasan', 'dinas kependudukan', 'dinas sosial', 'dinas perhubungan', 'kantor pajak daerah',
  'perpustakaan daerah', 'unit pengadaan barang/jasa', 'bagian kepegawaian', 'humas instansi',
  'unit TI instansi', 'mal pelayanan publik', 'badan penanggulangan bencana daerah', 'dinas pertanian',
  'balai latihan kerja', 'kantor arsip daerah'];

// PRNG berbiji supaya paket bisa dibuat ulang persis (biji = nomor paket)
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const shuffle = (arr, r) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const bag = (counts) => Object.entries(counts).flatMap(([k, n]) => Array(n).fill(k));
const maxRun = (arr) => arr.reduce((m, x, i) => {
  let run = 1;
  while (i - run >= 0 && arr[i - run] === x) run += 1;
  return Math.max(m, run);
}, 0);
const count = (arr) => arr.reduce((c, x) => ({ ...c, [x]: (c[x] || 0) + 1 }), {});

function buat(r) {
  const dims = bag(Object.fromEntries(Object.entries(GRID).map(([d, [n]]) => [d, n])));
  let urut;
  do urut = shuffle(dims, r); while (maxRun(urut) > 2);
  const levelPerDim = Object.fromEntries(Object.entries(GRID).map(([d, [n, st]]) => [d,
    shuffle([...Array(st).fill('Sangat Tinggi'), ...Array(n - st).fill('Tinggi')], r)]));
  let kunci;
  do kunci = shuffle(bag({ A: 9, B: 9, C: 9, D: 9, E: 9 }), r); while (maxRun(kunci) > 2);
  const jKode = shuffle(bag({ J1: 8, J2: 8, J3: 8, J4: 9, J5: 6, J6: 6 }), r);
  const jPoin = shuffle(bag({ 2: 15, 3: 15, 4: 15 }), r).map(Number);
  // panjang: pemilik opsi terpanjang & ke-2 diambil dari kantong supaya modul tebakan aman
  const rank1 = shuffle(bag({ 5: 5, 4: 8, 3: 11, 2: 11, 1: 10 }), r).map(Number);
  const rank2 = shuffle(bag({ 5: 8, 4: 9, 3: 9, 2: 9, 1: 10 }), r).map(Number);
  const poin1 = shuffle([...shuffle(POIN1, r), ...Array(19).fill(0).map((_, i) => POIN1[i % 6]), ...Array(20).fill('pasif')], r);
  let penutup;
  do penutup = shuffle(bag(Object.fromEntries(PENUTUP.map((p, i) => [p, i < 5 ? 6 : 5]))), r); while (maxRun(penutup) > 1);
  const latar = shuffle(bag(Object.fromEntries(shuffle(LATAR, r).slice(0, 18).map((l, i) => [l, i < 9 ? 3 : 2]))), r);
  const jangkar = shuffle([...Array(20).fill(true), ...Array(25).fill(false)], r);

  const slots = urut.map((dimensi, i) => {
    const level = levelPerDim[dimensi].pop();
    const lain = shuffle(LETTERS.filter((l) => l !== kunci[i]), r);
    const poin = { [kunci[i]]: 5 };
    lain.forEach((l, k) => { poin[l] = k + 1; });
    const huruf = (p) => LETTERS.find((l) => poin[l] === p);
    const [s3, s4] = shuffle(['S1', 'S2', 'S3', 'S4', 'S5'], r);
    // kata per opsi: terpanjang b+3, ke-2 b+2, sisanya b+1, b+1, b (selisih 3, rentang 11-19)
    const b = 11 + Math.floor(r() * 6);
    let p2nd = rank2[i];
    if (p2nd === rank1[i]) p2nd = [1, 2, 3, 4, 5].filter((p) => p !== rank1[i])[Math.floor(r() * 4)];
    const sisa = shuffle([1, 2, 3, 4, 5].filter((p) => p !== rank1[i] && p !== p2nd), r);
    const kata = {};
    [[rank1[i], b + 3], [p2nd, b + 2], [sisa[0], b + 1], [sisa[1], b + 1], [sisa[2], b]]
      .forEach(([p, w]) => { kata[huruf(p)] = w; });
    // dua-langkah: 40% slot kunci ikut + minimal satu opsi lain; selebihnya 0-2 opsi non-kunci
    const nonKunci = shuffle(lain, r);
    const duaLangkah = r() < 0.4 ? [kunci[i], ...nonKunci.slice(0, 1 + Math.floor(r() * 2))]
      : nonKunci.slice(0, Math.floor(r() * 3));
    return {
      no: i + 1, dimensi, level, kunci: kunci[i], poin,
      sumbu: { poin3: s3, poin4: s4 },
      jebakan: { kode: jKode[i], poin: jPoin[i], huruf: huruf(jPoin[i]) },
      kata, duaLangkah: duaLangkah.sort(),
      poin1: poin1[i], penutup: penutup[i], latar: latar[i], jangkar: jangkar[i],
      pasangan: null, tanggaAR: null, tanggaTIK: false,
    };
  });

  // tangga AR: 7 soal, 5-6 anak tangga, maks 2 per anak tangga
  const ar = slots.filter((s) => s.dimensi === 'Anti Radikalisme');
  shuffle([...TANGGA_AR, ...shuffle(TANGGA_AR, r)], r).slice(0, 7).forEach((t, i) => { ar[i].tanggaAR = t; });
  // tangga TIK (status uji): separuh soal TIK bertema keamanan digital
  shuffle(slots.filter((s) => s.dimensi === 'TIK'), r).slice(0, 3).forEach((s) => { s.tanggaTIK = true; });
  // pasangan kontras: 1 pasang AR + 3 pasang dimensi lain, jarak >= 5, tiap soal maks 1 pasangan
  for (const dim of ['Anti Radikalisme', ...shuffle(Object.keys(GRID).filter((d) => d !== 'Anti Radikalisme'), r).slice(0, 3)]) {
    const calon = shuffle(slots.filter((s) => s.dimensi === dim && !s.pasangan), r);
    const pas = calon.flatMap((a) => calon.filter((b) => b.no - a.no >= 5
      && (dim !== 'Anti Radikalisme' || a.tanggaAR !== b.tanggaAR)).map((b) => [a, b]))[0];
    if (pas) { pas[0].pasangan = pas[1].no; pas[1].pasangan = pas[0].no; }
  }
  return { versi: 'blueprint TKP v1 (engine v1.3)', slots };
}

function cek(bp) {
  const e = [];
  const s = bp.slots;
  const pct = (n, batas, nama) => { if (n / s.length > batas) e.push(`${nama} ${n.toFixed(1)}/${s.length} > ${batas * 100}%`); };
  if (s.length !== 45) e.push(`slot ${s.length}, harus 45`);
  const dim = count(s.map((x) => x.dimensi));
  for (const [d, [n]] of Object.entries(GRID)) if (dim[d] !== n) e.push(`dimensi ${d} ${dim[d] || 0}, harus ${n}`);
  if (maxRun(s.map((x) => x.dimensi)) > 2) e.push('dimensi sama berderet > 2');
  const lv = count(s.map((x) => x.level));
  if (lv.Tinggi !== 27 || lv['Sangat Tinggi'] !== 18) e.push(`level ${JSON.stringify(lv)}, harus 27/18`);
  const k = count(s.map((x) => x.kunci));
  for (const l of LETTERS) if ((k[l] || 0) < 7 || (k[l] || 0) > 11) e.push(`kunci ${l} ${k[l] || 0}x, harus 7-11`);
  if (maxRun(s.map((x) => x.kunci)) > 2) e.push('kunci berderet > 2');
  for (const x of s) {
    if (JSON.stringify(Object.values(x.poin).sort()) !== '[1,2,3,4,5]' || x.poin[x.kunci] !== 5) e.push(`slot ${x.no}: poin bukan 1-5 / kunci bukan 5`);
    if (x.sumbu.poin3 === x.sumbu.poin4) e.push(`slot ${x.no}: sumbu poin 3 = poin 4`);
    if (x.jebakan.huruf === x.kunci || ![2, 3, 4].includes(x.poin[x.jebakan.huruf])) e.push(`slot ${x.no}: jebakan bukan di poin 2/3/4`);
    const w = Object.values(x.kata);
    if (Math.max(...w) - Math.min(...w) > 3 || Math.min(...w) < 10 || Math.max(...w) > 20) e.push(`slot ${x.no}: kata ${w} di luar 10-20 / selisih > 3`);
    if (x.duaLangkah.includes(x.kunci) && x.duaLangkah.length < 2) e.push(`slot ${x.no}: kunci satu-satunya dua-langkah`);
  }
  const sumbu = count(s.flatMap((x) => [x.sumbu.poin3, x.sumbu.poin4]));
  for (const sb of ['S1', 'S2', 'S3', 'S4', 'S5']) if ((sumbu[sb] || 0) < 12 || (sumbu[sb] || 0) > 24) e.push(`sumbu ${sb} ${sumbu[sb] || 0}x, harus 12-24 (rata-rata 18 ± 35%)`);
  if (s.filter((x) => x.jebakan.poin >= 3).length < 15) e.push('jebakan di poin 3/4 < 15');
  const kodePoin = {};
  for (const x of s) {
    kodePoin[x.jebakan.kode] = kodePoin[x.jebakan.kode] || {};
    kodePoin[x.jebakan.kode][x.jebakan.poin] = (kodePoin[x.jebakan.kode][x.jebakan.poin] || 0) + 1;
  }
  for (const [kode, pp] of Object.entries(kodePoin)) {
    const tot = Object.values(pp).reduce((a, b) => a + b, 0);
    if (tot >= 4 && Math.max(...Object.values(pp)) / tot > 0.5) e.push(`${kode} > 50% di satu poin`);
  }
  // modul tebakan, rumus sama dengan validate_soal.js (seri = 1/k); batas dipasang lebih ketat dari validator
  const tebak = (x, pool) => {
    const max = Math.max(...pool.map((l) => x.kata[l]));
    const top = pool.filter((l) => x.kata[l] === max);
    return top;
  };
  const kena = (fn) => s.reduce((a, x) => { const g = fn(x); return a + (g.target && g.top.includes(g.target) ? 1 / g.top.length : 0); }, 0);
  pct(kena((x) => ({ top: tebak(x, LETTERS), target: x.kunci })), 0.15, 'kunci = terpanjang');
  pct(kena((x) => {
    const max = Math.max(...Object.values(x.kata));
    return { top: tebak(x, LETTERS.filter((l) => x.kata[l] < max)), target: x.kunci };
  }), 0.22, 'kunci = terpanjang ke-2');
  pct(kena((x) => ({ top: tebak(x, LETTERS), target: LETTERS.find((l) => x.poin[l] === 4) })), 0.22, 'poin 4 = terpanjang');
  pct(kena((x) => ({ top: x.duaLangkah.length ? tebak(x, x.duaLangkah) : [], target: x.kunci })), 0.22, 'kunci = dua-langkah terpanjang');
  if (s.filter((x) => x.poin1 !== 'pasif').length < 23) e.push('poin 1 aktif < 50%');
  for (const [p, n] of Object.entries(count(s.map((x) => x.penutup)))) if (n > 8) e.push(`penutup "${p}" ${n}x > 8`);
  const lt = count(s.map((x) => x.latar));
  if (Object.keys(lt).length < 12) e.push(`latar berbeda ${Object.keys(lt).length} < 12`);
  for (const [l, n] of Object.entries(lt)) if (n > 3) e.push(`latar "${l}" ${n}x > 3`);
  if (s.filter((x) => x.jangkar).length < 18) e.push('jangkar realita < 18');
  const pairs = s.filter((x) => x.pasangan);
  for (const x of pairs) {
    const y = s[x.pasangan - 1];
    if (!y || y.pasangan !== x.no || Math.abs(y.no - x.no) < 5) e.push(`slot ${x.no}: pasangan tidak timbal balik / jarak < 5`);
  }
  if (pairs.length / 2 < 3) e.push(`pasangan kontras ${pairs.length / 2} < 3`);
  if (!pairs.some((x) => x.dimensi === 'Anti Radikalisme')) e.push('tidak ada pasangan kontras AR');
  const ar = s.filter((x) => x.dimensi === 'Anti Radikalisme');
  const tg = count(ar.map((x) => x.tanggaAR));
  if (ar.some((x) => !TANGGA_AR.includes(x.tanggaAR))) e.push('soal AR tanpa anak tangga');
  if (Object.keys(tg).length < 4 || Math.max(...Object.values(tg)) > 2) e.push(`tangga AR ${JSON.stringify(tg)}: minimal 4 anak tangga, maks 2 per anak tangga`);
  return e;
}

function selftest() {
  const bp = buat(rng(1));
  for (let i = 2; cek(bp).length && i < 5000; i += 1) Object.assign(bp, buat(rng(i)));
  assert.deepStrictEqual(cek(bp), []);
  const rusak = JSON.parse(JSON.stringify(bp));
  rusak.slots.find((x) => x.dimensi !== 'TIK').dimensi = 'TIK';
  rusak.slots[1].kunci = rusak.slots[0].kunci; rusak.slots[2].kunci = rusak.slots[0].kunci;
  rusak.slots[3].sumbu.poin4 = rusak.slots[3].sumbu.poin3;
  const err = cek(rusak).join('\n');
  for (const harap of ['dimensi TIK 7', 'kunci berderet', 'sumbu poin 3 = poin 4']) assert(err.includes(harap), `selftest: "${harap}" tidak tertangkap`);
  console.log('selftest OK');
}

const [arg, arg2] = process.argv.slice(2);
if (arg === '--selftest') selftest();
else if (arg === '--cek') {
  const e = cek(JSON.parse(fs.readFileSync(arg2, 'utf8')));
  console.log(e.length ? e.join('\n') : 'blueprint OK');
  process.exit(e.length ? 1 : 0);
} else if (['1', '2', '3'].includes(arg)) {
  const out = path.join(__dirname, `blueprint_paket${arg}.json`);
  if (fs.existsSync(out) && arg2 !== '--force') {
    console.error(`${out} sudah ada (mungkin sudah dipakai menulis soal). Pakai --force untuk menimpa.`);
    process.exit(1);
  }
  // biji = nomor paket × 1000 + percobaan; ambil percobaan pertama yang lolos semua kuota
  let bp;
  let tries = 0;
  do bp = buat(rng(Number(arg) * 1000 + tries)); while (cek(bp).length && ++tries < 5000);
  const e = cek(bp);
  if (e.length) { console.error(e.join('\n')); process.exit(1); }
  bp.paket = Number(arg);
  bp.biji = Number(arg) * 1000 + tries;
  fs.writeFileSync(out, `${JSON.stringify(bp, null, 2)}\n`);
  console.log(`${out}: 45 slot, lolos cek (percobaan ke-${tries + 1})`);
} else {
  console.error('usage: node tmp/blueprint_tkp.js <1|2|3> [--force] | --cek <file.json> | --selftest');
  process.exit(2);
}
