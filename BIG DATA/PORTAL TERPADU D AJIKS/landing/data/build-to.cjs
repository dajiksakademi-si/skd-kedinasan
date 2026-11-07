// susun 110 soal contoh untuk prototipe ruang tryout dari bank D'Ajiks sendiri. TANPA kunci/poin/pembahasan.
const fs = require('fs'), path = require('path');
const B = '/Users/gustiputuyudawirashana/Downloads/PROJECT SKD KEDINASAN /BIG DATA/';
const L = B + 'PORTAL TERPADU D AJIKS/landing/';
const twkRaw = require(B + 'CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/bank_soal_100.json').soal.slice(0, 30);
const twk = twkRaw.map(s => ({ s: 'TWK', t: s.soal, o: s.opsi }));
const TIUD = B + 'CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/paket/paket-1/';
const img = p => p.replace(/^img\//, 'assets/tiu-p1/');
const tiuRaw = require(TIUD + 'paket_tiu_1.json').butir;
const tiu = tiuRaw.map(b => {
  const x = { s: 'TIU', t: b.soal, p: b.perintah, o: b.opsi };
  if (b.pernyataan) x.r = b.pernyataan;
  if (b.gambar) x.g = img(b.gambar);
  if (b.jenis_opsi === 'gambar') { x.og = 1; x.o = Object.fromEntries(Object.entries(b.opsi).map(([k, v]) => [k, img(v)])); }
  return x;
});
const T = B + 'CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/tmp/';
const tkpRaw = ['01_15', '16_30', '31_45'].flatMap(f => require(T + 'paket1_soal_' + f + '.js'));
const tkp = tkpRaw.map(s => ({ s: 'TKP', t: s.stem, o: s.opts, a: s.dim }));
const all = [...twk, ...tiu, ...tkp];
if (all.length !== 110 || twk.length !== 30 || tiu.length !== 35 || tkp.length !== 45) throw new Error('jumlah salah ' + [twk.length, tiu.length, tkp.length]);
all.forEach((x, i) => { if (Object.keys(x.o).join('') !== 'ABCDE') throw new Error('opsi tidak lengkap no ' + (i + 1)); });
// hanya isian yang diizinkan: kunci/poin/pembahasan tidak boleh ikut ke halaman siswa
all.forEach((x, i) => { const k = Object.keys(x).filter(k => !'s t p o r g og a'.split(' ').includes(k)); if (k.length) throw new Error('isian terlarang no ' + (i + 1) + ': ' + k); });
fs.mkdirSync(L + 'data', { recursive: true });
fs.writeFileSync(L + 'data/to-contoh.js', '// DATA CONTOH: 110 soal dari bank D\'Ajiks (TWK bank 100 no 1-30, TIU Paket 1, TKP Paket 1). Tanpa kunci. Dibuat oleh build-to.cjs.\nvar SOAL = ' + JSON.stringify(all) + ';\n');
// kunci + pembahasan versi siswa: berkas TERPISAH, hanya dimuat halaman pembahasan/hasil (ruang tryout tidak memuatnya).
// tiap butir: k = kunci, p = poin tiap opsi (TKP), b = [[judul, isi]] urut pedoman pembahasan, g = gambar pembahasan (TIU bergambar)
const twkB = twkRaw.map(s => ({ k: s.kunci, b: s.pembahasan.split('\n').filter(Boolean).map(l => {
  const m = l.match(/^([^:]{3,30}): (.+)$/); if (!m) throw new Error('baris pembahasan TWK tidak terbaca: ' + l.slice(0, 60)); return [m[1], m[2]];
}) }));
const tiuB = tiuRaw.map(b => { const p = b.pembahasan, x = { k: b.kunci, b: [['Yang ditanya', p.ditanya], ['Kalimat kunci', p.kalimat_kunci], ['Cara cepat', p.cara_kilat], ['Langkah', p.langkah],
  ['Kenapa opsi lain gugur', p.opsi_gugur], ['Kunci', p.alasan_kunci], ['Analogi', p.analogi], ['Jebakan', p.waspada]].filter(r => r[1]) };
  if (p.gambar) x.g = img(p.gambar); return x; });
const TB = Object.assign({}, ...['01_15', '16_30', '31_45'].map(f => require(T + 'paket1_bahas_' + f + '.js')));
const tkpB = tkpRaw.map(s => { const w = TB[s.n].siswa, p = Object.fromEntries(Object.entries(s.poin).map(([k, v]) => [k, +v[0]]));
  return { k: s.kunci, p, b: [['Yang ditanya', w.tanya], ['Nilai tiap pilihan', w.opsi], ['Kunci', w.kunci], ['Analogi', w.analogi], ['Jebakan', w.jebakan], ['Tips', w.tips]].filter(r => r[1]) }; });
const bahas = [...twkB, ...tiuB, ...tkpB];
bahas.forEach((x, i) => { if (!/^[A-E]$/.test(x.k)) throw new Error('kunci tidak sah no ' + (i + 1)); if (x.p && x.p[x.k] !== 5) throw new Error('kunci TKP bukan poin 5 no ' + (i + 1)); });
// istilah dapur penyusun soal tidak boleh tampil ke siswa (CLAUDE.md proyek)
const dapur = JSON.stringify(bahas).match(/\b[SJD][1-8]\b|aktif-[a-e]|\b(stem|distraktor|konstruk|kutub|konsep tetangga|salah kategori)\b/gi);
if (dapur) throw new Error('istilah dapur di pembahasan: ' + [...new Set(dapur)]);
fs.writeFileSync(L + 'data/to-bahas.js', '// DATA CONTOH: kunci + pembahasan versi siswa untuk 110 soal to-contoh.js. Dibuat oleh build-to.cjs.\nvar BAHAS = ' + JSON.stringify(bahas) + ';\n');
console.log('pembahasan', bahas.length, 'judul', [...new Set(bahas.flatMap(x => x.b.map(r => r[0])))].join(' | '), 'ukuran', fs.statSync(L + 'data/to-bahas.js').size);
fs.mkdirSync(L + 'assets/tiu-p1', { recursive: true });
let n = 0;
for (const f of fs.readdirSync(TIUD + 'img')) { fs.copyFileSync(TIUD + 'img/' + f, L + 'assets/tiu-p1/' + f); n++; }
console.log('soal', all.length, 'gambar', n, 'ukuran', fs.statSync(L + 'data/to-contoh.js').size);
