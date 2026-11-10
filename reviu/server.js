// Halaman reviu soal untuk reviewer jarak jauh (Pak Badrun).
// Jalankan dari akar repo: `npm run reviu` (atau `node reviu/server.js`), lalu buka http://localhost:4545
// Hasil reviu disimpan di reviu/hasil/<paket>/<reviewer>.json; tombol "Kirim" meng-commit + push file itu
// beserta satu baris di kontributor/<reviewer>/LOG.md (syarat pemeriksaan otomatis repo).
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const AKAR = path.join(__dirname, '..');
const PORT = Number(process.env.PORT) || 4545;
const TKP = path.join(AKAR, 'BIG DATA', 'CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI', 'tmp');

const teks = (s) => String(s).replace(/&hellip;/g, '…').replace(/&times;/g, '×').replace(/&amp;/g, '&');
const muatTkp = (awalan) => ['01_15', '16_30', '31_45']
  .flatMap((b) => require(path.join(TKP, `${awalan}_soal_${b}.js`)))
  .map((s) => ({
    n: s.n, ranah: s.dim, soal: teks(s.stem), kunci: s.kunci,
    opsi: Object.fromEntries(Object.entries(s.opts).map(([h, t]) => [h, teks(t)])),
    nilai: Object.fromEntries(Object.entries(s.poin).map(([h, p]) => [h, parseInt(p, 10)])),
  }));

const TWK = path.join(AKAR, 'BIG DATA', 'CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI', 'tmp');
// TWK: kunci bernilai 5, opsi lain 0.
const muatTwk = (file) => JSON.parse(fs.readFileSync(path.join(TWK, file), 'utf8')).soal
  .map((s, i) => ({
    n: i + 1, ranah: s.tema, soal: s.soal, kunci: s.kunci, opsi: s.opsi,
    nilai: Object.fromEntries(Object.keys(s.opsi).map((h) => [h, h === s.kunci ? 5 : 0])),
  }));

// Paket yang bisa direviu. Tambah paket baru di sini.
const PAKET = {
  'twk-paket-1-alfaiz': { judul: 'TWK Paket 1 (gaya Al Faiz)', muat: () => muatTwk('gaya-alfaiz/paket_twk_1.json') },
  'tkp-paket-1': { judul: 'TKP Paket 1', muat: () => muatTkp('paket1') },
  'tkp-paket-2': { judul: 'TKP Paket 2', muat: () => muatTkp('paket2') },
};

const reviewers = () => fs.readdirSync(path.join(AKAR, 'kontributor'), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name);
const fileHasil = (id, r) => path.join(__dirname, 'hasil', id, `${r}.json`);
const git = (...a) => execFileSync('git', a, { cwd: AKAR, encoding: 'utf8', stdio: 'pipe' });

function kirimJson(res, kode, data) {
  res.writeHead(kode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function bacaBody(req) {
  return new Promise((ok, gagal) => {
    let b = '';
    req.on('data', (c) => { b += c; if (b.length > 2e6) gagal(new Error('Data terlalu besar')); });
    req.on('end', () => { try { ok(JSON.parse(b || '{}')); } catch (e) { gagal(e); } });
  });
}

function kirimKeRepo(id, r) {
  const hasil = JSON.parse(fs.readFileSync(fileHasil(id, r), 'utf8'));
  const isi = Object.values(hasil.soal || {});
  const diperiksa = isi.filter((x) => x.status).length;
  const masalah = isi.filter((x) => x.status && x.status !== 'sesuai').length;
  const tgl = new Date().toISOString().slice(0, 10);
  const log = path.join(AKAR, 'kontributor', r, 'LOG.md');
  fs.appendFileSync(log, `\n- ${tgl} · Reviu ${PAKET[id].judul}: ${diperiksa} soal diperiksa, ${masalah} perlu tindak lanjut — reviu/hasil/${id}/${r}.json\n`);
  const berkas = [path.relative(AKAR, fileHasil(id, r)), path.relative(AKAR, log)];
  git('add', '--', ...berkas);
  git('commit', '-m', `Reviu ${PAKET[id].judul} oleh ${r} (${diperiksa} soal)`, '--', ...berkas);
  git('pull', '--rebase', '--autostash');
  git('push');
  return { diperiksa, masalah };
}

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const id = u.searchParams.get('paket');
  const r = u.searchParams.get('reviewer');
  try {
    if (u.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
    }
    if (u.pathname === '/logo.png') {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      return res.end(fs.readFileSync(path.join(AKAR, 'LOGO NAVY GOLD D AJIKS AKADEMI .png')));
    }
    if (u.pathname === '/api/daftar') {
      return kirimJson(res, 200, {
        paket: Object.entries(PAKET).map(([k, v]) => ({ id: k, judul: v.judul })),
        reviewer: reviewers(),
      });
    }
    // Batas kepercayaan: paket dan reviewer wajib dari daftar, supaya tidak bisa menulis di luar reviu/hasil.
    if (!PAKET[id] || !reviewers().includes(r)) return kirimJson(res, 400, { galat: 'Paket atau reviewer tidak dikenal.' });

    if (u.pathname === '/api/paket') {
      const f = fileHasil(id, r);
      const hasil = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : { soal: {}, catatanUmum: '' };
      return kirimJson(res, 200, { judul: PAKET[id].judul, soal: PAKET[id].muat(), hasil });
    }
    if (u.pathname === '/api/simpan' && req.method === 'POST') {
      const body = await bacaBody(req);
      fs.mkdirSync(path.dirname(fileHasil(id, r)), { recursive: true });
      const data = { paket: id, reviewer: r, diperbarui: new Date().toISOString(), soal: body.soal || {}, catatanUmum: body.catatanUmum || '' };
      fs.writeFileSync(fileHasil(id, r), JSON.stringify(data, null, 2) + '\n');
      return kirimJson(res, 200, { ok: true });
    }
    if (u.pathname === '/api/kirim' && req.method === 'POST') {
      if (!fs.existsSync(fileHasil(id, r))) return kirimJson(res, 400, { galat: 'Belum ada reviu yang tersimpan.' });
      return kirimJson(res, 200, { ok: true, ...kirimKeRepo(id, r) });
    }
    kirimJson(res, 404, { galat: 'Tidak ditemukan.' });
  } catch (e) {
    kirimJson(res, 500, { galat: String(e.stderr || e.message).trim().split('\n').slice(-3).join(' ') });
  }
}).listen(PORT, '127.0.0.1', () => console.log(`Halaman reviu siap: http://localhost:${PORT}  (tutup dengan Ctrl+C)`));
