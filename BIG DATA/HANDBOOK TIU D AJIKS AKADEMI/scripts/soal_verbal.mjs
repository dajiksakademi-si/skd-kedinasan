// Handbook TIU · Tahap 5 · soal verbal Bab 3–5 (23 butir) · pemeriksa + perender dari satu sumber data.
// Sumber: scripts/data/verbal_b03_05.json (ditulis tangan). Script ini:
//   1. Bab 4: status setiap pilihan dihitung mesin (dunia himpunan / tabel kebenaran) di SEMUA bacaan
//      (himpunan boleh kosong / pasti beranggota × "sebagian" ≥ 1 / "sebagian tetapi tidak semua" × "atau" inklusif / eksklusif),
//      status harus sama di semua bacaan, kunci tunggal dibuktikan, premis bukan pengalih diuji perlu, contoh penyangkal dicetak.
//   2. Bab 3: tabel kalimat uji × pilihan → tepat satu "benar" = kunci. Bab 5: tabel akibat klaim → tepat satu searah perintah.
//   3. Bentuk: kunci bukan terpanjang tunggal, sebaran A–E, ≤ 2 berturut, kode ∈ engine v0.4.3, bahasa siswa.
//   4. Render blok soal (+ pembahasan 7 langkah untuk pembuka/contoh) ke src/13–15; pembahasan latihan ke Lampiran B (T6, lampiran_b.mjs).
// Pakai: node scripts/soal_verbal.mjs          → memeriksa (src harus sama dengan hasil render; galat bila beda)
//        node scripts/soal_verbal.mjs --tulis  → menulis blok ke src, field bukti ke data, dan berkas buta
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { namaTabel, kutip, judulBab, keBahas, potongan, lampiranB } from "./lampiran_b.mjs";

const AKAR = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(AKAR, "scripts/data/verbal_b03_05.json");
const BUTA = join(AKAR, "scripts/data/verbal_b03_05_buta.json");
const ENGINE = join(AKAR, "../CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md");
const SRC = { 3: "src/13_bab03.html", 4: "src/14_bab04.html", 5: "src/15_bab05.html" };
const TULIS = process.argv.includes("--tulis");
const HURUF = ["A", "B", "C", "D", "E"];
const data = JSON.parse(readFileSync(DATA, "utf8"));
const B = Object.fromEntries(data.butir.map((b) => [b.id, b]));
let n = 0;
const ok = (c, m) => { n++; assert.ok(c, m); };
const PB = "pasti benar", PS = "pasti salah", TDP = "tidak dapat dipastikan";

// ════════ 1. Mesin logika monadik ════════
// Dunia = kumpulan "jenis" anggota (bitmask istilah yang dimiliki) + jenis milik individu bernama (bila ada).
// Bacaan r = { kosong: boleh|tidak, sebagian: longgar|ketat, atau: inklusif|eksklusif }.
const BACAAN = [];
for (const kosong of ["boleh", "tidak"]) for (const sebagian of ["longgar", "ketat"]) for (const atau of ["inklusif", "eksklusif"]) BACAAN.push({ kosong, sebagian, atau });
const has = (t, a) => (a < 0 ? !((t >> ~a) & 1) : !!((t >> a) & 1));      // a < 0: bukan istilah ~a
const ada = (a, b) => (w) => w.T.some((t) => has(t, a) && has(t, b));
const L = {
  semua: (a, b) => (w) => w.T.every((t) => !has(t, a) || has(t, b)),
  tidakAda: (a, b) => (w) => !ada(a, b)(w),
  ada,
  sebagian: (a, b) => (w, r) => ada(a, b)(w) && (r.sebagian === "longgar" || ada(a, ~b)(w)),
  ind: (a) => (w) => has(w.i, a),
};
function dunia(m, premisUmum, adaInd) {                    // daerah yang dilarang premis umum dibuang dulu (tetap semua dunia sah)
  const izin = [...Array(1 << m).keys()].filter((t) => premisUmum.every((p) => p({ T: [t] }, {})));
  const hasil = [];
  for (let s = 1; s < 1 << izin.length; s++) {
    const T = izin.filter((_, k) => (s >> k) & 1);
    if (adaInd) for (const i of T) hasil.push({ T, i }); else hasil.push({ T });
  }
  return { hasil, izin: izin.length };
}
const CACHE = new WeakMap();   // dunia sah per bacaan, per larik premis; hanya soal asli (dunia kecil) yang disimpan
function nilaiKategoris(sp, f, opsiF, ketat = true) {   // status f di setiap bacaan; ketat = wajib sama di semua bacaan
  let c = CACHE.get(sp.premis);
  if (!c) {
    const { hasil, izin } = dunia(sp.m, sp.umum.map((k) => sp.premis[k]), sp.ind);
    c = { hasil, izin, sah: [] };
    if (hasil.length <= 300000) CACHE.set(sp.premis, c);   // ponytail: dunia uji "premis dibuang" (s.d. 2^24) tidak disimpan, agar memori aman
  }
  const { hasil, izin } = c, kecil = hasil.length <= 300000;
  const saring = (r) => hasil.filter((w) => (r.kosong === "boleh" || [...Array(sp.m).keys()].every((k) => w.T.some((t) => has(t, k)))) && sp.premis.every((p) => p(w, r)));
  const st = BACAAN.map((r, kb) => {
    const sah = kecil ? (c.sah[kb] ??= saring(r)) : saring(r);
    ok(sah.length > 0, `${sp.id}: premis tidak dapat dipenuhi (bacaan ${JSON.stringify(r)})`);
    const v = sah.map((w) => f(w, r));
    const s = v.every(Boolean) ? PB : v.some(Boolean) ? TDP : PS;
    return { s, penyangkal: sah.find((w) => !f(w, r)) };
  });
  if (ketat) ok(st.every((x) => x.s === st[0].s), `${sp.id}: status ${opsiF} berubah menurut bacaan: ${st.map((x) => x.s).join(" / ")}`);
  return { perBacaan: st.map((x) => x.s), status: st[0].s, penyangkal: st[0].penyangkal, dunia: hasil.length, izin };
}
const tulisDunia = (sp, w) => w ? w.T.map((t) => "{" + sp.nama.filter((_, k) => has(t, k)).join(", ") + (w.i === t && sp.indNama ? ` · ${sp.indNama}` : "") + "}").join(" ") : "—";

// ── model Bab 4 (istilah: indeks; ~k = bukan istilah k) ──
const { semua, tidakAda, sebagian, ind } = L;
const K4 = {
  "HB-TIU-B04-P01": { m: 5, nama: ["petugas loket", "paruh waktu", "pegawai baru", "bagian arsip", "lantai dua"],
    premis: [tidakAda(0, 1), sebagian(2, 0), semua(3, 4)], umum: [0, 2], perlu: [0, 1],
    opsi: { A: semua(~1, 0), B: ada(2, ~1), C: semua(2, ~1), D: { meta: [2, 1] }, E: ada(2, 4) } },
  "HB-TIU-B04-C01": { m: 3, nama: ["logam", "larut", "kuning"],
    premis: [semua(0, 1), sebagian(2, 0)], umum: [0], perlu: [0],
    opsi: { A: semua(2, 1), B: sebagian(0, ~1), C: semua(~0, ~1), D: semua(1, 2), E: semua(~1, ~0) } },
  "HB-TIU-B04-C02": { m: 3, nama: ["pemain inti", "lulus tes", "anggota OSIS"],
    premis: [semua(0, 1), sebagian(0, 2)], umum: [0], perlu: [0, 1],
    dua: { 1: ada(2, 1), 2: semua(1, 0) } },
  "HB-TIU-B04-L01": { m: 4, nama: ["berlabel", "dikirim hari ini", "dapat tersesat", "tiba hari ini"], ind: true, indNama: "paket Dodi",
    premis: [semua(~0, ~1), ind(1)], umum: [0], perlu: [0, 1],
    opsi: { A: semua(0, 1), B: semua(~0, 2), C: ind(0), D: semua(~1, ~0), E: ind(3) } },
  "HB-TIU-B04-L02": { m: 3, nama: ["pemegang izin", "terlatih", "masuk ruang server"], ind: true, indNama: "Rudi",
    premis: [semua(0, 1), ind(0)], umum: [0], perlu: [0, 1],
    opsi: { A: ind(2), B: ind(1), C: semua(1, 0), D: semua(~1, ~2), E: sebagian(1, ~0) } },
  "HB-TIU-B04-L04": { m: 4, nama: ["pemenang poster", "klub seni", "tim dekorasi", "pandai menggambar"],
    premis: [semua(0, 1), semua(2, 1)], umum: [0, 1], perlu: [],
    opsi: { A: { tdp: semua(0, 1) }, B: semua(0, 2), C: semua(2, 0), D: semua(1, 3), E: { meta: [0, 2] } } },
};
// uji diri mesin: pola sah lolos, pola sesat gugur
{
  const sp = (premis, umum) => ({ id: "uji", m: 3, nama: ["a", "b", "c"], premis, umum });  // umum = indeks premis
  assert.equal(nilaiKategoris(sp([semua(0, 1), semua(1, 2)], [0, 1]), semua(0, 2)).status, PB);
  assert.equal(nilaiKategoris(sp([tidakAda(1, 2), sebagian(0, 1)], [0]), ada(0, ~2)).status, PB);
  assert.equal(nilaiKategoris(sp([semua(0, 1)], [0]), semua(1, 0)).status, TDP);
  assert.equal(nilaiKategoris(sp([semua(0, 1), semua(2, 1)], [0, 1]), ada(0, 2)).status, TDP);
}
const bukti = {};
const HUB = (a, b) => [semua(a, b), semua(b, a), tidakAda(a, b), ada(a, b), ada(a, ~b), ada(b, ~a)];
function nilai(sp, f, h) {                                         // f fungsi biasa atau { meta: [a, b] }
  if (f.tdp) {
    const x = nilaiKategoris(sp, f.tdp, `${h}·isi`, false), per = x.perBacaan.map((s) => (s === TDP ? PB : PS));
    ok(per.every((y) => y === per[0]), `${sp.id}: status ${h} (tidak dapat dipastikan apakah …) berubah menurut bacaan`);
    return { status: per[0], penyangkal: null, dunia: x.dunia, izin: x.izin, meta: true };
  }
  if (!f.meta) return nilaiKategoris(sp, f, h);
  // per bacaan: pernyataan meta salah bila ada satu hubungan yang pasti benar di bacaan itu; hasilnya wajib sama di semua bacaan
  const st = HUB(...f.meta).map((g) => nilaiKategoris(sp, g, `${h}·hubungan`, false));
  const per = BACAAN.map((_, k) => (st.some((x) => x.perBacaan[k] === PB) ? PS : PB));
  ok(per.every((x) => x === per[0]), `${sp.id}: status ${h} (hubungan tidak dapat dipastikan) berubah menurut bacaan`);
  return { status: per[0], penyangkal: null, dunia: st[0].dunia, izin: st[0].izin, meta: true };
}
const buang = (sp, p) => ({ ...sp, premis: sp.premis.filter((_, k) => k !== p), umum: sp.umum.filter((k) => k !== p).map((k) => (k > p ? k - 1 : k)) });
for (const [id, sp] of Object.entries(K4)) {
  sp.id = id;
  const b = B[id], hasilOpsi = {};
  if (sp.dua) {                                                      // menilai dua kesimpulan
    const s1 = nilaiKategoris(sp, sp.dua[1], "(1)"), s2 = nilaiKategoris(sp, sp.dua[2], "(2)");
    const benar = `(1) ${s1.status}, (2) ${s2.status}.`;
    const cocok = HURUF.filter((h) => b.opsi[h] === benar);
    ok(cocok.length === 1 && cocok[0] === b.kunci, `${id}: opsi status lengkap "${benar}" harus tunggal = kunci`);
    const ST = [PB, PS, TDP], gab = HURUF.map((h) => b.opsi[h].match(/^\(1\) (.+), \(2\) (.+)\.$/).slice(1).map((s) => ST.indexOf(s)));
    ok(gab.every(([x, y]) => x >= 0 && y >= 0) && gab.every((g, k) => !k || g[0] * 3 + g[1] > gab[k - 1][0] * 3 + gab[k - 1][1]), `${id}: urutan baku 9 gabungan`);
    ok(!HURUF.some((h) => /\batau\b/.test(b.opsi[h])), `${id}: kata "atau" di opsi`);
    bukti[id] = { metode: `dunia himpunan ${sp.m} istilah, ${s1.dunia} dunia × ${BACAAN.length / 2} bacaan`, status_1: s1.status, status_2: s2.status,
      penyangkal_2: tulisDunia(sp, s2.penyangkal) };
    for (const p of sp.perlu) ok(nilaiKategoris(buang(sp, p), sp.dua[1], "(1)").status !== PB, `${id}: premis ${p + 1} tidak perlu`);
    continue;
  }
  let info;
  for (const h of Object.keys(sp.opsi)) { info = nilai(sp, sp.opsi[h], h); hasilOpsi[h] = info; }
  const pasti = Object.keys(sp.opsi).filter((h) => hasilOpsi[h].status === PB);
  ok(pasti.length === 1 && pasti[0] === b.kunci, `${id}: opsi pasti benar = ${pasti}, kunci ${b.kunci}`);
  for (const h of Object.keys(sp.opsi)) ok(hasilOpsi[h].status === b.status_rencana[h], `${id} ${h}: mesin ${hasilOpsi[h].status} ≠ rencana ${b.status_rencana[h]}`);
  for (const h of Object.keys(sp.opsi)) if (b.kode[h] === "J-MUNGKIN") ok(hasilOpsi[h].status === TDP, `${id} ${h}: J-MUNGKIN harus tidak dapat dipastikan`);
  for (const p of sp.perlu) {
    const kurang = buang(sp, p);
    ok(nilai(kurang, sp.opsi[b.kunci], "kunci").status !== PB, `${id}: premis P${p + 1} tidak perlu`);
  }
  bukti[id] = { metode: `dunia himpunan ${sp.m} istilah${sp.ind ? " + individu" : ""}, daerah sah ${info.izin}, ${info.dunia} dunia × ${BACAAN.length / 2} bacaan (kosong · sebagian)`,
    status: Object.fromEntries(Object.keys(sp.opsi).map((h) => [h, hasilOpsi[h].status])),
    penyangkal: Object.fromEntries(Object.keys(sp.opsi).filter((h) => hasilOpsi[h].status !== PB && !hasilOpsi[h].meta).map((h) => [h, tulisDunia(sp, hasilOpsi[h].penyangkal)])) };
}

// ── proposisi: C03 (rantai + atau), C04 (setara), L03 (ingkaran, dunia himpunan tanpa premis) ──
const baris = (k) => [...Array(1 << k).keys()].map((x) => [...Array(k).keys()].map((j) => !!((x >> j) & 1)));
const jika = (p, q) => !p || q;
{ // C03: p aula, q Sabtu, r bus, s asrama, t konsumsi Jumat, u Minggu, v perlu tempat menginap
  const id = "HB-TIU-B04-C03", b = B[id];
  const atau = (x, y, r) => (r.atau === "inklusif" ? x || y : x !== y);
  const premis = [([p, q]) => jika(p, q), ([, q, r, s], R) => jika(q, atau(r, s, R)), ([, , , s, t]) => jika(s, t), ([, q]) => !q];
  const opsi = { A: ([p]) => !p, B: ([, , , , t]) => !t, C: ([, , , , , u]) => u, D: ([p, , , s]) => !p && !s, E: ([, , , , , , v]) => v };
  const status = (prem, f) => { const st = BACAAN.map((R) => { const v = baris(7).filter((x) => prem.every((P) => P(x, R))).map((x) => f(x)); ok(v.length, `${id}: premis kosong`); return v.every(Boolean) ? PB : v.some(Boolean) ? TDP : PS; }); ok(st.every((s) => s === st[0]), `${id}: status berubah menurut bacaan`); return st[0]; };
  const s = Object.fromEntries(HURUF.map((h) => [h, status(premis, opsi[h])]));
  for (const h of HURUF) ok(s[h] === b.status_rencana[h], `${id} ${h}: ${s[h]} ≠ ${b.status_rencana[h]}`);
  ok(HURUF.filter((h) => s[h] === PB).join() === b.kunci, `${id}: kunci tidak tunggal`);
  for (const p of [0, 3]) ok(status(premis.filter((_, k) => k !== p), opsi[b.kunci]) !== PB, `${id}: P${p + 1} tidak perlu`);
  for (const p of [1, 2]) ok(status(premis.filter((_, k) => k !== p), opsi[b.kunci]) === PB, `${id}: P${p + 1} seharusnya pengalih`);
  bukti[id] = { metode: "tabel kebenaran 7 pernyataan dasar (128 baris) × 2 bacaan 'atau'", status: s, catatan: "P1 + P4 perlu; P2, P3 tidak dipakai kunci (pengalih bersyarat)" };
}
{ // C04: setara; p mendidih, q berbunyi
  const id = "HB-TIU-B04-C04", b = B[id], asal = ([p, q]) => jika(p, q);
  const opsi = { A: ([p, q]) => jika(q, p), B: ([p, q]) => p && !q, C: ([p, q]) => jika(!p, !q), D: ([p, q]) => jika(!q, !p), E: ([p, q]) => !p && !q };
  const setara = HURUF.filter((h) => baris(2).every((x) => opsi[h](x) === asal(x)));
  const ingkar = HURUF.filter((h) => baris(2).every((x) => opsi[h](x) === !asal(x)));
  ok(setara.join() === b.kunci && ingkar.join() === "B", `${id}: setara ${setara}, ingkaran ${ingkar}`);
  ok(baris(2).every((x) => opsi.A(x) === opsi.C(x)), `${id}: konvers = tidak-tidak (narasi)`);
  bukti[id] = { metode: "tabel kebenaran 4 baris", setara, ingkaran: ingkar, catatan: "A dan C setara satu sama lain (konvers = 'tidak' di dua sisi), keduanya tidak setara dengan pernyataan asal" };
}
{ // L03: ingkaran "semua penumpang (0) memakai pelampung (1)"; semua dunia 2 istilah, tanpa premis
  const id = "HB-TIU-B04-L03", b = B[id], asal = semua(0, 1);
  const opsi = { A: semua(0, ~1), B: (w) => !semua(1, 0)(w), C: ada(0, 1), D: (w) => !semua(0, 1)(w), E: semua(~1, ~0) };
  const T = [...Array(16).keys()].map((s) => ({ T: [0, 1, 2, 3].filter((t) => (s >> t) & 1) })).filter((w) => w.T.length);
  const ingkar = HURUF.filter((h) => BACAAN.every((r) => T.filter((w) => r.kosong === "boleh" || [0, 1].every((k) => w.T.some((t) => has(t, k)))).every((w) => opsi[h](w, r) === !asal(w))));
  const setara = HURUF.filter((h) => BACAAN.every((r) => T.every((w) => opsi[h](w, r) === asal(w))));
  ok(ingkar.join() === b.kunci, `${id}: ingkaran = ${ingkar}`);
  ok(setara.join() === "E", `${id}: E harus setara (kontraposisi)`);
  bukti[id] = { metode: "semua dunia himpunan 2 istilah × 4 bacaan", ingkaran: ingkar, setara };
}

// ════════ 2. Bab 3 dan Bab 5: tabel uji ditulis tangan ════════
for (const b of data.butir.filter((x) => x.bab === 3)) {
  const benar = HURUF.filter((h) => b.uji.opsi[h][0] === "benar");
  ok(benar.length === 1 && benar[0] === b.kunci, `${b.id}: kalimat uji meloloskan ${benar}`);
  ok(HURUF.every((h) => b.uji.opsi[h][1].length > 3), `${b.id}: sifat gagal tiap opsi wajib ditulis`);
  ok(Array.isArray(b.kbbi) && b.kbbi.length >= 3 && b.kbbi.every((k) => data.kbbi.lema?.[k]), `${b.id}: kata kunci KBBI tanpa lema tercatat`);
  bukti[b.id] = { metode: "tabel kalimat uji × pilihan (tulis tangan) + cek buta", kalimat_uji: b.uji.kalimat, lolos: benar };
}
const ARAH = { memperkuat: /memperkuat/, memperlemah: /memperlemah/ };
for (const b of data.butir.filter((x) => x.bab === 5)) {
  if (b.status_argumen) {
    const s = b.status_argumen, kena = ["1", "2"].filter((k) => s[k] !== "tidak menyentuh");
    ok(kena.length <= 1, `${b.id}: fakta menyentuh dua argumen`);
    const harap = kena.length ? HURUF[(s[kena[0]] === "memperkuat" ? 0 : 2) + (+kena[0] - 1)] : "E";
    ok(harap === b.kunci, `${b.id}: status argumen → ${harap}, kunci ${b.kunci}`);
    ok(["memperkuat argumen 1", "memperkuat argumen 2", "memperlemah argumen 1", "memperlemah argumen 2", "tidak relevan dengan kedua argumen"].every((t, k) => b.opsi[HURUF[k]] === t), `${b.id}: bunyi lima opsi tetap`);
    bukti[b.id] = { metode: "status fakta terhadap kedua argumen (tulis tangan) + cek buta", status_argumen: s };
    continue;
  }
  const perintah = Object.keys(ARAH).find((k) => ARAH[k].test(b.soal.tanya));
  const searah = HURUF.filter((h) => b.status[h] === perintah);
  ok(searah.length === 1 && searah[0] === b.kunci, `${b.id}: searah perintah ${perintah}: ${searah}`);
  const bk = b.bentuk_opsi[b.kunci];
  ok(HURUF.filter((h) => b.bentuk_opsi[h] === bk).length >= 2, `${b.id}: bentuk kunci (${bk}) tunggal`);
  bukti[b.id] = { metode: "tabel akibat klaim × pilihan (tulis tangan) + cek buta", perintah, status: b.status };
}

// ════════ 3. Bentuk, sebaran, kode, bahasa ════════
const engine = readFileSync(ENGINE, "utf8");
const KODE = new Set([...engine.matchAll(/^\| K\d \| (J-[A-Z]+)/gm)].map((m) => m[1]));
ok(KODE.size >= 30, "kode engine terbaca");
const polos = (s) => String(s).replace(/<[^>]+>/g, "");
const seq = data.butir.map((b) => b.kunci);
ok(data.butir.length === 23, "23 butir");
for (const b of data.butir) {
  ok(HURUF.every((h) => b.opsi[h]) && HURUF.includes(b.kunci) && b.kode[b.kunci] === "kunci", `${b.id}: opsi/kunci`);
  for (const h of HURUF.filter((x) => x !== b.kunci)) ok(KODE.has(b.kode[h]) && b.nama[h], `${b.id} ${h}: kode ${b.kode[h]} / nama`);
  ok(new Set(HURUF.map((h) => b.opsi[h])).size === 5, `${b.id}: opsi kembar`);
  if (!b.status_argumen && b.jenis !== "SIL menilai dua kesimpulan") {
    const pj = HURUF.map((h) => polos(b.opsi[h]).length), maks = Math.max(...pj);
    ok(!(pj[HURUF.indexOf(b.kunci)] === maks && pj.filter((x) => x === maks).length === 1), `${b.id}: kunci = opsi terpanjang (${pj})`);
  }
  ok(b.alasan_kunci && b.kerangka && b.to_terdekat && b.kalimat_penentu, `${b.id}: field wajib`);
}
for (const bab of [3, 4, 5]) {
  const s = data.butir.filter((b) => b.bab === bab).map((b) => b.kunci).join("");
  ok(!/(.)\1\1/.test(s), `Bab ${bab}: kunci sama > 2 berturut (${s})`);
}
ok(!/(.)\1\1/.test(seq.join("")), `kelompok: kunci sama > 2 berturut (${seq.join("")})`);
const hit = Object.fromEntries(HURUF.map((h) => [h, seq.filter((x) => x === h).length]));
ok(Math.max(...Object.values(hit)) - Math.min(...Object.values(hit)) <= 1, `sebaran kunci tidak seimbang ${JSON.stringify(hit)}`);
// pasangan cermin: dua opsi berkata isi sama dengan urutan istilah ditukar; kunci tidak boleh berada di pasangan cermin tunggal
// (bentuk templat engine — dua kesimpulan, dua argumen — dikecualikan: bunyinya baku Pilar 5)
const STOP = new Set("semua sebagian ada yang adalah tidak bukan jika maka itu sebuah hubungan antara dan dapat dipastikan apakah juga menjadi tetapi atau di ke dari untuk dengan oleh dalam benda orang".split(" "));
const kata = (t) => polos(t).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));
const cermin = (a, b) => { const x = kata(a), y = kata(b); return x.length > 1 && x.join() !== y.join() && [...x].sort().join() === [...y].sort().join(); };
const CERMIN = {};
for (const b of data.butir.filter((x) => !x.status_argumen && !/dua kesimpulan/.test(x.jenis))) {
  const P = [];
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) if (cermin(b.opsi[HURUF[i]], b.opsi[HURUF[j]])) P.push(HURUF[i] + HURUF[j]);
  ok(!P.some((p) => p.includes(b.kunci)) || P.some((p) => !p.includes(b.kunci)), `${b.id}: kunci di pasangan cermin tunggal (${P})`);
  if (P.length) CERMIN[b.id] = P;
}
// rujukan Latihan A Bab 19: pilihan berkode itu harus ada
for (const [id, kode] of [["HB-TIU-B03-L03", "J-RELASI"], ["HB-TIU-B04-L02", "J-IZIN"], ["HB-TIU-B05-L01", "J-AKAL"]])
  ok(Object.values(B[id].kode).includes(kode), `${id}: rujukan Bab 19 butuh ${kode}`);
const TABEL = Object.fromEntries(Object.entries(SRC).map(([k, f]) => [k, namaTabel(readFileSync(join(AKAR, f), "utf8"))]));
// bahasa siswa (soal, opsi, pembahasan): frasa terlarang, istilah dapur, kode, "maka/karena itu" ≤ 1 per butir di luar kalimat logika
const LARANGAN = ["mari kita", "dengan demikian", "penting untuk dicatat", "secara keseluruhan", "akan tetapi", "satu-satunya", "sekaligus",
  "tidak hanya", "dibedah", "jinak", "jebakan", "pengecoh", "stem", "distraktor", "konstruk", "kutub", "hots", "level", "kode", "kok", "nggak", "di era"];
for (const b of data.butir) {
  const siswa = [b.soal, b.opsi, b.pembahasan ?? {}].map((x) => JSON.stringify(x)).join(" ").toLowerCase();
  for (const k of LARANGAN) ok(!new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(siswa), `${b.id}: kata terlarang "${k}"`);
  ok(!/\bj-[a-z]+|\bjf-|\bk[1-7]\b/i.test(siswa), `${b.id}: kode bocor ke teks siswa`);
  const p = JSON.stringify(b.pembahasan ?? {}).toLowerCase().replace(/jika[^.]*?maka/g, "");
  ok((p.match(/\bmaka\b|karena itu/g) || []).length <= 1, `${b.id}: maka/karena itu > 1`);
  const P = b.pembahasan;
  ok(P && ["ditanya", "cepat", "mengapa", "cek", "kunci", "analogi", "waspada"].every((k) => P[k]), `${b.id}: 7 langkah lengkap`);
  ok(HURUF.filter((h) => h !== b.kunci).every((h) => P.gugur[h]?.teks && P.gugur[h]?.uji) && !P.gugur[b.kunci], `${b.id}: gugur tiap opsi salah`);
  ok(/[“"]/.test(P.ditanya) || P.ditanya.includes(b.kalimat_penentu), `${b.id}: kalimat penentu dikutip di Inti pertanyaan`);
  if (b.peran === "latihan") {   // T6: Lampiran B = satu subbagian di build.py → tanpa maka/karena itu; nama kekeliruan = tabel bab
    ok(!/\bmaka\b|karena itu/.test(JSON.stringify(P).toLowerCase()), `${b.id}: maka/karena itu di pembahasan Lampiran B`);
    for (const h of HURUF.filter((x) => x !== b.kunci)) ok(TABEL[b.bab].has(kutip(b.nama[h])), `${b.id} ${h}: nama "${b.nama[h]}" tidak ada di tabel kekeliruan Bab ${b.bab}`);
  }
}

// ════════ 4. Render HTML ════════
const jam = '<svg class="ico"><use href="#jam"/></svg>';
const lg = (t) => (/\bmaka\b/.test(t) ? `<span class="lg">${t}</span>` : t);
const urut = (id) => +id.slice(-2);
const label = (b) => (b.peran === "pembuka" ? "Pertanyaan Pembuka" : `${b.peran === "contoh" ? "Contoh" : "Latihan"} ${urut(b.id)}`);
function stem(b) {
  let sudah = false;
  const tandai = (t) => { if (sudah || !t.includes(b.kalimat_penentu)) return t; sudah = true; return t.replace(b.kalimat_penentu, `<mark>${b.kalimat_penentu}</mark>`); };
  const s = b.soal, out = [];
  if (s.pengantar) out.push(`<p class="stem">${lg(tandai(s.pengantar))}</p>`);
  if (s.butir) out.push(`<dl class="premis">${s.butir.map(([l, t]) => `<div><dt>${l}</dt><dd>${lg(tandai(t))}</dd></div>`).join("")}</dl>`);
  out.push(`<p class="stem">${lg(tandai(s.tanya))}</p>`);
  ok(sudah, `${b.id}: kalimat penentu "${b.kalimat_penentu}" tidak ditemukan di soal`);
  return out.join("\n    ");
}
const kodeTeks = (b) => HURUF.map((h) => `${h} ${b.kode[h] === "kunci" ? "<b>kunci</b>" : b.kode[h]}`).join(" · ");
function ringkasBukti(id) {
  const x = bukti[id];
  if (x.penyangkal) return `${x.metode}. Contoh penyangkal: ${Object.entries(x.penyangkal).map(([h, w]) => `${h} ${w}`).join("; ")}.`;
  if (x.status_1) return `${x.metode}. (1) ${x.status_1}, (2) ${x.status_2}; penyangkal (2): ${x.penyangkal_2}.`;
  return `${x.metode}.`;
}
function blok(b) {
  const g = `<div class="guru"><b>${b.jenis}, ${b.bentuk}.</b> Kunci ${b.kunci}. Kode: ${kodeTeks(b)}. Kerangka: ${b.kerangka}. TO terdekat: ${b.to_terdekat}. Bukti: ${ringkasBukti(b.id)} ${b.catatan_reviu}${b.bab === 3 ? ` KBBI daring (diperiksa 2026-11-01): ${b.kbbi.map((k) => `${k} — ${data.kbbi.lema[k]}`).join("; ")}.` : ""}</div>`;
  const soal = `  <div class="soal">
    <div class="meta"><span>${label(b)}</span><span class="waktu">${jam}Target ${b.target_detik} detik</span></div>
    ${stem(b)}
    <ol class="opsiv">${HURUF.map((h) => `<li><span class="h">${h}</span><span>${lg(b.opsi[h])}</span></li>`).join("")}</ol>
  </div>
  ${g}`;
  let bahas = "";
  if (b.pembahasan) {
    const P = b.pembahasan;
    bahas = `
  <div class="kotak inti"><b class="lbl">Inti pertanyaan</b><p>${P.ditanya}</p></div>
  <div class="kotak langkah"><b class="lbl">Langkah penyelesaian</b><dl class="tahap">
    <div><dt>Cara cepat</dt><dd>${P.cepat}</dd></div>
    <div><dt>Mengapa benar</dt><dd>${P.mengapa}</dd></div>
    <div><dt>Cek balik</dt><dd>${P.cek}</dd></div>
  </dl></div>
  <div class="gugur vb"><b class="lbl">Pilihan yang gugur</b>${HURUF.filter((h) => h !== b.kunci).map((h) =>
    `<div class="g"><span class="h">${h}</span><div class="x"><span class="uji">${P.gugur[h].uji}</span><b>${b.nama[h]}.</b> ${P.gugur[h].teks}</div></div>`).join("")}</div>
  <div class="jwb"><span>${b.kunci}</span><p><b>Jawaban: ${b.kunci}.</b> ${P.kunci}</p></div>
  <div class="duo"><div class="il"><b>Ilustrasi</b><span>${P.analogi}</span></div><div><b>Kekeliruan yang Mungkin Terjadi</b><span>${P.waspada}</span></div></div>`;
  }
  const t = b.id.replace("HB-TIU-", "");
  if (b.peran === "latihan") {   // T6: pembahasan di Lampiran B (soal diulang tanpa catatan pengajar) + tautan dua arah
    LB[b.bab].push(potongan(t, soal.replace(g, "").trimEnd().replace(`<span>${label(b)}</span>`, () => `<span>Bab ${b.bab} · ${label(b)}</span>`), bahas));
    return `<!--${t}:mulai-->\n<div data-soal="${b.id}" data-target="${b.target_detik}">\n${soal.replace(`<span>${label(b)}</span>`, () => keBahas(label(b), t))}\n</div>\n<!--${t}:selesai-->`;
  }
  // T5-4: pembahasan pembuka ditaruh sebelum "Contoh Soal dan Pembahasan"; soalnya diulang tanpa catatan pengajar
  // tautan dua arah soal pembuka ⇄ pembahasannya (pola a.ke Handbook TWK)
  if (b.peran === "pembuka") return [`<!--${t}:mulai-->\n<div data-soal="${b.id}" data-target="${b.target_detik}">\n${soal.replace(`<span>${label(b)}</span>`, () => `<span id="soal-${t}">${label(b)}<a class="ke" href="#bahas-${t}">Lihat pembahasan</a></span>`)}\n</div>\n<!--${t}:selesai-->`,
    `<!--${t}-bahas:mulai-->\n  <h3 id="bahas-${t}">Pembahasan Pertanyaan Pembuka</h3>\n<div class="bahas-pembuka">\n${soal.replace(g, "").trimEnd()}${bahas}\n  <p class="balik"><a class="ke" href="#soal-${t}">Kembali ke soal</a></p>\n</div>\n<!--${t}-bahas:selesai-->\n\n`];
  return `<!--${t}:mulai-->\n<div data-soal="${b.id}" data-target="${b.target_detik}">\n${soal}${bahas}\n</div>\n<!--${t}:selesai-->`;
}
let beda = 0;
const LB = { 3: [], 4: [], 5: [] };
for (const bab of [3, 4, 5]) {
  const f = join(AKAR, SRC[bab]);
  let html = readFileSync(f, "utf8");
  for (const b of data.butir.filter((x) => x.bab === bab)) {
    const t = b.id.replace("HB-TIU-", "");
    let baru = blok(b);
    if (Array.isArray(baru)) {
      const [soalP, bahasP] = baru; baru = soalP;
      const ada = new RegExp(`<!--${t}-bahas:mulai-->[\\s\\S]*?<!--${t}-bahas:selesai-->\\n\\n`), CT = "  <h3>Contoh Soal dan Pembahasan</h3>";
      if (ada.test(html)) { if (html.match(ada)[0] !== bahasP) beda++; html = html.replace(ada, () => bahasP); }
      else { ok(html.split(CT).length === 2, `${b.id}: judul Contoh Soal dan Pembahasan tidak tunggal di ${SRC[bab]}`); beda++; html = html.replace(CT, () => bahasP + CT); }
    }
    const terisi = new RegExp(`<!--${t}:mulai-->[\\s\\S]*?<!--${t}:selesai-->`);
    const kosong = new RegExp(`  <div class="slot" data-slot="${b.id}" data-target="${b.target_detik}">[\\s\\S]*?<div class="guru">[\\s\\S]*?</div>\\n  </div>`);
    if (terisi.test(html)) { if (html.match(terisi)[0] !== baru) beda++; html = html.replace(terisi, () => baru); }
    else { ok(kosong.test(html), `${b.id}: slot kosong (target ${b.target_detik}) tidak ditemukan di ${SRC[bab]}`); beda++; html = html.replace(kosong, () => baru); }
  }
  if (TULIS) writeFileSync(f, html);
}
if (!lampiranB(AKAR, "B03-05", [3, 4, 5].map((bab) => [`Bab ${bab} · ${judulBab(readFileSync(join(AKAR, SRC[bab]), "utf8"))}`, LB[bab]]), TULIS)) beda++;
ok(TULIS || beda === 0, `${beda} blok src berbeda dari hasil render (jalankan --tulis)`);

for (const [id, P] of Object.entries(CERMIN)) bukti[id].cermin = P;
if (TULIS) {
  for (const b of data.butir) b.bukti = bukti[b.id];
  writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  const buta = (xs) => JSON.stringify(xs.map((b) => ({ id: b.id, bab: b.bab, target_detik: b.target_detik, soal: b.soal, opsi: b.opsi })), null, 2) + "\n";
  writeFileSync(BUTA, buta(data.butir));
  writeFileSync(BUTA.replace("_buta.json", "_buta2.json"), buta(data.butir.filter((b) => b.revisi?.length)));   // cek buta ulang: soal yang diubah
  writeFileSync(BUTA.replace("_buta.json", "_buta3.json"), buta(data.butir.filter((b) => b.revisi2?.length)));  // cek buta ke-3: revisi sesudah cek buta 2
  writeFileSync(BUTA.replace("_buta.json", "_buta4.json"), buta(data.butir.filter((b) => b.revisi3?.length)));  // cek buta ke-4: revisi sesudah cek buta 3
} else for (const b of data.butir) ok(JSON.stringify(b.bukti) === JSON.stringify(bukti[b.id]), `${b.id}: field bukti usang (jalankan --tulis)`);

console.log(`soal_verbal: semua assert lulus · ${n} butir dicek · 23 soal · kunci ${seq.join("")} · ${JSON.stringify(hit)}${TULIS ? " · src + data + buta ditulis" : ""}`);
