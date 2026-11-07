// Handbook TIU · Bab 19 (penutup) · tujuh kelompok kekeliruan dihimpun dari tabel "Kekeliruan pada Soal …" Bab 3–18
// dan dicek baris per baris: nama persis, nomor bab, kelompok (catatan padanan bab asal = engine v0.4.3 Pilar 3),
// cakupan lengkap (setiap baris sumber muncul tepat sekali). Juga: angka waktu peta hari ujian (dihitung dari tabel Bab 1),
// kolom kelompok terbanyak, rujukan slot Latihan A, 2 contoh soal (target = patokan blok; isi dicek soal_dasar.mjs), pita.
// Bukan pembuat soal: tidak ada soal, opsi, atau kunci jadi di berkas ini.
// Pakai (dari folder HANDBOOK TIU D AJIKS AKADEMI): node scripts/cek_bab19.mjs
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(AKAR, "src");
const ENGINE = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md");
const berkas = readdirSync(SRC).filter((f) => /^\d\d_bab\d\d\.html$/.test(f)).sort();
const bab = Object.fromEntries(berkas.map((f) => [+f.slice(6, 8), readFileSync(join(SRC, f), "utf8")]));
const b19 = bab[19], b01 = bab[1], b02 = bab[2];
assert.ok(b19, "src/29_bab19.html belum ada");
const polos = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const K7 = ["K1", "K2", "K3", "K4", "K5", "K6", "K7"];
let n = 0;
const sama = (a, b, ket) => { n++; assert.equal(a, b, ket); };

// ════════ judul + kepala ════════
const JUDUL = "Kekeliruan yang Sering Terjadi dan Strategi Mengerjakan";        // peta 19 bab DISETUJUI 2026-10-30
sama((b19.match(/<h2>([^<]*)<\/h2>/g) || []).join(), `<h2>${JUDUL}</h2>`, "judul Bab 19");
assert.ok(b19.includes('<section class="bab" data-bab="19">') && b19.includes('<div class="no">19</div>'), "kepala Bab 19");
assert.ok(!/satu-satunya/i.test(b19), '"satu-satunya" di Bab 19');

// ════════ engine Pilar 3: kode → kelompok, nama kelompok ════════
const eng = readFileSync(ENGINE, "utf8");
const KODE = new Map([...eng.matchAll(/^\| (K[1-7]) \| (JF?-[A-Z]+)(?: \(baru\))? \|/gm)].map((m) => [m[2], m[1]]));
assert.equal(KODE.size, 47, "engine: 47 kode");
const namaK = Object.fromEntries([...eng.match(/K1 Data[^\n]*/)[0].matchAll(/(K[1-7]) ([^·]+?)(?= ·|\.$)/g)].map((m) => [m[1], m[2].trim()]));
assert.equal(Object.keys(namaK).join(), K7.join(), "engine: tujuh nama kelompok");

// ════════ sumber: tabel kekeliruan + catatan padanan Bab 3–18 ════════
const baris = [];
for (let b = 3; b <= 18; b++) {
  const sek = bab[b].split("<h3>Kekeliruan pada")[1].split("<h3>Contoh Soal")[0];
  const nama = [...sek.match(/<tbody>([\s\S]*?)<\/tbody>/)[1].matchAll(/<tr><td>(\d+)<\/td><td><b>([\s\S]*?)<\/b><\/td>/g)];
  const pad = polos(sek.match(/<h4>Padanan[^<]*<\/h4>\s*<p>([\s\S]*?)<\/p>/)[1]);
  const k = {};
  for (const it of pad.split(" · ")) {
    const m = it.match(/^(\d+)(?:–(\d+))? ([\s\S]*?)\(([^)]*?)\b(K[1-7])/);
    assert.ok(m, `padanan Bab ${b} tidak terbaca: ${it}`);
    for (let i = +m[1]; i <= +(m[2] || m[1]); i++) k[i] = [m[5], m[3].match(/JF?-[A-Z]+/)[0]];
  }
  sama(nama.length, Object.keys(k).length, `Bab ${b}: banyak baris tabel = banyak padanan`);
  for (const [, no, nm] of nama) {
    const [kel, kode] = k[no];
    sama(KODE.get(kode), kel, `Bab ${b} no. ${no}: kelompok ${kel} ≠ engine ${KODE.get(kode)} (${kode})`);
    baris.push({ bab: b, no: +no, nama: nm, K: kel, kode });
  }
}
sama(baris.length, 136, "136 baris kekeliruan Bab 3–18");
sama(new Set(baris.map((r) => r.kode)).size, 47, "semua 47 kode engine terpakai di tabel bab");
assert.ok(polos(b19).includes("memuat 136 nama"), "angka 136 di narasi");
const cari = (b, no) => baris.find((r) => r.bab === b && r.no === no);

// ════════ Bab 2: nama kelompok + pertanyaan uji ════════
const b2 = [...b02.split("<h3>Tujuh Kelompok Kekeliruan</h3>")[1].split("</tbody>")[0]
  .matchAll(/<tr><td>(\d)<\/td><td><b>([^<]+)<\/b><\/td><td>[^<]*<\/td><td>([^<]+)<\/td><\/tr>/g)].map((m) => ({ nama: m[2], uji: m[3] }));
sama(b2.length, 7, "Bab 2: tujuh kelompok");
b2.forEach((x, i) => sama(x.nama.toLowerCase(), namaK[K7[i]].toLowerCase(), `Bab 2 kelompok ${i + 1} = engine`));
assert.ok(b02.includes("Uraian lengkapnya ada di Bab 19."), "Bab 2 merujuk Bab 19");
assert.ok(b01.includes("<td><b>Penutup</b></td><td>19</td><td>tujuh kelompok kekeliruan dan strategi hari ujian</td>"), "tabel Bab 1 baris Penutup");

// ════════ ringkasan tujuh kelompok ════════
const rentang = (xs) => { const s = [...new Set(xs)].sort((a, b) => a - b), o = []; for (const x of s) { const l = o.at(-1); if (l && x === l[1] + 1) l[1] = x; else o.push([x, x]); } return o.map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`)).join(", "); };
const ring = [...b19.split('data-ringkas="kelompok"')[1].split("</tbody>")[0]
  .matchAll(/<tr data-k="(K\d)"><td>(\d)<\/td><td><b>([^<]+)<\/b><\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td class="n">(\d+)<\/td><\/tr>/g)];
sama(ring.map((m) => m[1]).join(), K7.join(), "ringkasan: tujuh kelompok urut");
ring.forEach(([, k, no, nm, uji, bb, jml], i) => {
  sama(+no, i + 1, `nomor ${k}`);
  sama(nm, namaK[k], `nama ${k}`);
  sama(uji, b2[i].uji, `pertanyaan uji ${k} = Bab 2`);
  const r = baris.filter((x) => x.K === k);
  sama(bb, rentang(r.map((x) => x.bab)), `bab ${k}`);
  sama(+jml, r.length, `banyak nama ${k}`);
});
assert.ok(b19.includes('<tr class="jml"><td></td><td>Jumlah</td><td></td><td>3–18</td><td class="n">136</td></tr>'), "baris jumlah");

// ════════ tujuh subbagian: urutan, judul, pertanyaan uji, tabel nama ════════
const h3k = [...b19.matchAll(/<h3 data-k="(K\d)">([^<]+)<\/h3>/g)];
sama(h3k.map((m) => m[1]).join(), K7.join(), "subbagian K1–K7 urut");
h3k.forEach(([, k, j]) => sama(j, namaK[k], `judul subbagian ${k}`));
const terpakai = new Set();
for (const [i, k] of K7.entries()) {
  const sek = b19.split(`<h3 data-k="${k}">`)[1].split(/<h3/)[0];
  sama(sek.match(/<span class="lbl">Pertanyaan uji<\/span><p>([^<]+)<\/p>/)[1], b2[i].uji, `kotak uji ${k}`);
  const tb = sek.split(`<table class="tb pecah kel" data-k="${k}">`)[1].split("</table>")[0];
  for (const [, ref, nm, bb] of tb.matchAll(/<tr data-ref="([^"]+)"><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g)) {
    const rs = ref.split(" ").map((x) => x.split(":").map(Number));
    for (const [b, no] of rs) {
      const r = cari(b, no);
      assert.ok(r, `${k}: Bab ${b} no. ${no} tidak ada`);
      sama(nm, r.nama, `${k}: nama Bab ${b} no. ${no}`);
      sama(r.K, k, `${k}: Bab ${b} no. ${no} milik ${r.K}`);
      assert.ok(!terpakai.has(`${b}:${no}`), `Bab ${b} no. ${no} ganda`);
      terpakai.add(`${b}:${no}`);
    }
    sama(bb, rs.map(([b]) => b).join(", "), `${k}: kolom bab "${nm}"`);
  }
}
sama(terpakai.size, 136, "setiap baris Bab 3–18 muncul tepat sekali di Bab 19");
// K7 tidak punya anggota di bab gambar (narasi menyebutnya)
assert.ok(!baris.some((r) => r.K === "K7" && r.bab >= 14), "K7 di bab gambar");
assert.ok(b19.includes("Kelompok ini tidak muncul di bab gambar."), "narasi K7");
// kutipan contoh dari bab asal
for (const [, b, s] of b19.matchAll(/<span class="kutip" data-bab="(\d+)">([^<]+)<\/span>/g)) {
  n++; assert.ok(polos(bab[+b]).includes(s), `kutipan tidak ada di Bab ${b}: ${s}`);
}
// padanan kode pengajar = engine
for (const k of K7) {
  const p = b19.match(new RegExp(`<p data-kode="${k}">${k} ${namaK[k]}: ([^<]+)\\.</p>`));
  assert.ok(p, `padanan kode ${k}`);
  sama(p[1].split(", ").sort().join(), [...KODE].filter(([, x]) => x === k).map(([c]) => c).sort().join(), `kode ${k} = engine`);
}
// tujuh pertanyaan uji di strategi
const uji7 = [...b19.split('data-uji="tujuh"')[1].split("</div>\n  <h4")[0].matchAll(/<div><b>([^<]+)\.<\/b> ([^<]+)<\/div>/g)];
sama(uji7.length, 7, "tujuh pertanyaan uji");
uji7.forEach(([, nm, q], i) => { sama(nm, b2[i].nama, `nama uji ${i + 1} = Bab 2`); sama(q, b2[i].uji, `uji ${i + 1} = Bab 2`); });

// ════════ peta hari ujian: angka dari tabel waktu Bab 1 ════════
const jam = (d) => `${Math.floor(d / 60)}:${String(d % 60).padStart(2, "0")}`;
const wkt = [...b01.split('<table class="tb wkt">')[1].split("</tbody>")[0]
  .matchAll(/<tr><td><b>([^<]+)<\/b><\/td><td>([^<]*)<\/td><td>(\d*)<\/td><td>(\d*)<\/td><td>([\d:]+)<\/td>/g)];
const peta = [...b19.split('data-peta="hari-ujian"')[1].split("</tbody>")[0]
  .matchAll(/<tr data-bab-blok="([\d,]*)"><td><b>([^<]+)<\/b><\/td><td>([^<]*)<\/td><td class="n">(\d*)<\/td><td class="n">([\d:]+)<\/td><td class="n">([\d:]+)<\/td><td>([^<]+)<\/td><\/tr>/g)];
sama(peta.length, 8, "peta: 8 baris");
let t = 0, soal = 0;
peta.forEach(([, bb, blok, nomor, det, lama, sel, kel], i) => {
  const w = wkt[i];
  sama(blok, w[1], `blok ${i}`); sama(nomor, w[2], `nomor ${blok}`); sama(det, w[4], `detik ${blok}`);
  const d = det ? +w[3] * +det : 390;                                          // cadangan 6:30 (Bab 1)
  sama(lama, jam(d), `lama ${blok}`); sama(lama, w[5], `lama ${blok} = Bab 1`);
  t += d; soal += +w[3] || 0;
  sama(sel, jam(t), `selesai ${blok}`);
  if (bb) {
    const hit = {}; baris.filter((r) => bb.split(",").map(Number).includes(r.bab)).forEach((r) => (hit[r.K] = (hit[r.K] || 0) + 1));
    const urut = Object.entries(hit).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const ambil = urut.filter(([, c], j) => j < 2 || c === urut[1][1]).map(([k]) => k.slice(1));
    sama(kel, ambil.join(" · "), `kelompok terbanyak ${blok}`);
  }
});
sama(soal, 35, "35 soal"); sama(t, 3030, "50:30");
sama(Math.floor(t / 35), 86, "±86 detik");
assert.ok(polos(b19).includes("50,5 menit TIU") && polos(b19).includes("±50,5 menit untuk 35 soal, rata-rata ±86 detik"), "angka 50,5 / 86 di narasi");
// titik periksa Bab 1 (lembar rencana) = peta = ringkasan
const tp = [...b01.matchAll(/<tr><td>(\d\d)<\/td><td>([\d:]+)<\/td><td>[\d:]+<\/td>/g)].map((m) => [m[1], m[2]]);
const sp = Object.fromEntries(peta.map((m) => [m[3].split("–").at(-1), m[6]]));
tp.forEach(([no, mn]) => sama(sp[no], mn, `titik periksa nomor ${no} = Bab 1`));
sama(polos(b19).includes(`selesai nomor ${tp.map((x) => x[0]).slice(0, -1).join(", ")}, dan ${tp.at(-1)[0]} pada menit ${tp.map((x) => x[1]).slice(0, -1).join(", ")}, dan ${tp.at(-1)[1]}; cadangan 6:30`), true, "ringkasan titik periksa");

// ════════ semua slot di src ════════
const slotSrc = new Map();
for (const [b, h] of Object.entries(bab))
  for (const m of h.matchAll(/<div class="slot" data-slot="([^"]+)"(?: data-target="(\d+)")?>([\s\S]*?)<div class="guru">([\s\S]*?)<\/div>\s*<\/div>/g))
    slotSrc.set(m[1], { bab: +b, kode: new Set(polos(m[4]).match(/\bJF?-[A-Z]+\b/g) || []), kepala: m[3] });
// soal yang sudah terisi (Tahap 5): kode diambil dari catatan pengajar di dalam bloknya
for (const [b, h] of Object.entries(bab))
  for (const m of h.matchAll(/<div data-soal="([^"]+)" data-target="(\d+)">([\s\S]*?)<!--[A-Z0-9-]+:selesai-->/g)) {
    assert.ok(!slotSrc.has(m[1]), `${m[1]}: terisi dan kosong sekaligus`);
    const g = m[3].match(/<div class="guru">([\s\S]*?)<\/div>/);
    slotSrc.set(m[1], { bab: +b, kode: new Set(g ? polos(g[1]).match(/\bJF?-[A-Z]+\b/g) || [] : []), kepala: m[3], isi: true });
  }
// soal figural Bab 14–18 (T6-5): catatan pengajar slot = rencana lama, kode sebenarnya dari data generator (aset/figural/items.json)
for (const f of JSON.parse(readFileSync(join(AKAR, "aset/figural/items.json"), "utf8")))
  Object.values(f.kode).filter((k) => k !== "kunci").flatMap((k) => k.split("+")).forEach((k) => slotSrc.get(f.id).kode.add(k));
const judulBab = (b) => bab[b].match(/<h2>([^<]+)<\/h2>/)[1];
const rumpun = (b) => (b <= 5 ? "V" : b <= 10 ? "N" : b <= 13 ? "L" : "F");

// ════════ Latihan A: 14 rujukan, 2 per kelompok, rumpun berbeda ════════
const la = [...b19.matchAll(/<tr data-rujuk="([^"]+)" data-k="(K\d)" data-kode="([^"]+)" data-ref="(\d+):(\d+)"><td>(\d+)<\/td><td>Bab (\d+) · ([^,]+), (Latihan|Contoh) (\d+) <span class="id">([^<]+)<\/span><\/td><td><span class="guru">([^<]+)<\/span><\/td><td><span class="guru">(\d) · ([^<]+)<\/span><\/td><\/tr>/g)];
sama(la.length, 14, "Latihan A: 14 butir");
const perK = {};
la.forEach(([, id, k, kode, rb, rno, no, b, jd, jenis, ke, id2, jaw, kn, kode2], i) => {
  sama(+no, i + 1, `Latihan A nomor ${i + 1}`);
  const s = slotSrc.get(id);
  assert.ok(s, `Latihan A ${no}: slot ${id} tidak ada di src`);
  sama(id2, id, `Latihan A ${no}: ID tampil`);
  sama(s.bab, +b, `Latihan A ${no}: bab`); assert.ok(+b >= 3 && +b <= 18, "rujukan di luar Bab 3–18");
  sama(jd, judulBab(+b), `Latihan A ${no}: judul bab`);
  sama(id, `HB-TIU-B${String(b).padStart(2, "0")}-${jenis[0]}${String(ke).padStart(2, "0")}`, `Latihan A ${no}: label ↔ ID`);
  assert.ok(s.kode.has(kode), `Latihan A ${no}: ${kode} tidak ada di catatan slot ${id}`);
  sama(KODE.get(kode), k, `Latihan A ${no}: kelompok kode`);
  const r = cari(+rb, +rno);
  sama(+rb, +b, `Latihan A ${no}: baris dari bab yang sama`);
  sama(r.kode, kode, `Latihan A ${no}: baris sumber berkode ${kode}`);
  sama(jaw, `${r.nama} (Bab ${rb} no. ${rno})`, `Latihan A ${no}: jawaban`);
  sama(`K${kn}`, k, `Latihan A ${no}: nomor kelompok`); sama(kode2, kode, `Latihan A ${no}: kode`);
  if (i) assert.notEqual(la[i - 1][2], k, `Latihan A ${no}: kelompok sama berdampingan`);
  (perK[k] ??= []).push(rumpun(+b));
});
K7.forEach((k) => { sama(perK[k]?.length, 2, `Latihan A: 2 butir ${k}`); assert.notEqual(perK[k][0], perK[k][1], `Latihan A ${k}: rumpun sama`); });
sama(14 * 30, 420, "Latihan A 7 menit");
assert.ok(polos(b19).includes("±30 detik per soal, atau 7 menit"), "waktu Latihan A di narasi");

// ════════ contoh Bab 19 (T6-5, T6-12: pembuka dan Latihan B ditiadakan) ════════
const PATOKAN = Object.fromEntries(wkt.filter((w) => w[4]).map((w) => [w[1], +w[4]]));
const BLOK = { CRT: "Numerik lain", ANA: "Penalaran analitis" };
const c19 = [...b19.matchAll(/<div data-soal="(HB-TIU-B19-C0\d)" data-target="(\d+)">[\s\S]*?<div class="guru"><b>([A-Z]{3})/g)];
sama(c19.map((m) => m[1]).join(), "HB-TIU-B19-C01,HB-TIU-B19-C02", "contoh Bab 19 urut");
for (const [, id, tg, jenis] of c19) sama(+tg, PATOKAN[BLOK[jenis]], `${id}: target = patokan ${BLOK[jenis]}`);
assert.ok(!/class="slot" data-slot|<h3>Latihan B|\{\{WAKTU_LATIHAN\}\}/.test(b19) && b19.includes("{{TARGET}}"), "sisa slot/Latihan B atau penanda pita Bab 19");
// pita: target paling sering, seri → yang muncul dulu (aturan build.py, T4-24)
const tg = c19.map((m) => +m[2]), cacah = new Map(); tg.forEach((x) => cacah.set(x, (cacah.get(x) || 0) + 1));
sama([...cacah].reduce((a, b) => (b[1] > a[1] ? b : a))[0], 75, "pita Bab 19 ±75 detik");

console.log(`cek_bab19: semua assert lulus · ${n} butir dicek · 136 baris Bab 3–18 → 7 kelompok · Latihan A 14 rujukan · 2 contoh`);
