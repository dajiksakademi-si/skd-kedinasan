// Tahap 6: simpan Paket 1 TIU lengkap (26 nonfigural + 9 figural) ke paket/paket-1/ dalam satu bentuk data.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ENGINE = path.resolve(DIR, "../..");
const FIG = path.join(ENGINE, "k12-spatial-engine/.test-out-paket/paket-1");
const KELUAR = path.join(ENGINE, "paket/paket-1");
const baca = (f) => JSON.parse(fs.readFileSync(f));
const HURUF = ["A", "B", "C", "D", "E"];

const paket = baca(path.join(DIR, "paket_tiu_1.json"));
const bahas = ["verbal", "numerik", "logika"].flatMap((b) => baca(path.join(DIR, `bahas_${b}.json`)));
const figural = baca(path.join(FIG, "items.json"));

const butir = paket.map((s) => {
  const { jebakan, kerangka, bukti, kalimat_kunci, ...isi } = s;
  const { no, ...pembahasan } = bahas.find((b) => b.no === s.no);
  return { ...isi, jenis_opsi: "teks", pembahasan, reviu: { jebakan, kerangka, bukti: bukti ?? null } };
});

// Pembahasan figural tersimpan sebagai teks berlabel; dipecah ke bagian yang sama dengan butir lain.
function pecah(teks, id) {
  const p = { opsi_gugur: {} };
  for (const baris of teks.split("\n")) {
    let m;
    if ((m = baris.match(/^Yang ditanya: (.*)/))) p.ditanya = m[1];
    else if ((m = baris.match(/^Cara cepat: (.*)/))) p.cara_kilat = m[1];
    else if ((m = baris.match(/^Opsi ([A-E]) gugur: (.*)/))) p.opsi_gugur[m[1]] = m[2];
    else if ((m = baris.match(/^Jawaban: Opsi ([A-E])\. (.*)/))) p.alasan_kunci = `${m[1]}, ${m[2]}`;
    else if ((m = baris.match(/^Analogi: (.*)/))) p.analogi = m[1];
    else if ((m = baris.match(/^Jebakan: (.*)/))) p.waspada = m[1];
    else assert.equal(baris, "Kenapa opsi lain gugur:", `${id}: baris tak dikenal: ${baris}`);
  }
  for (const k of ["ditanya", "cara_kilat", "alasan_kunci", "analogi", "waspada"]) assert.ok(p[k], `${id}: ${k} kosong`);
  return p;
}

const gambar = new Set();
const pakai = (f) => (gambar.add(f), f);
figural.forEach((f, i) => {
  const pembahasan = pecah(f.pembahasan, f.id);
  assert.deepEqual(Object.keys(pembahasan.opsi_gugur).sort(), HURUF.filter((h) => h !== f.kunci), `${f.id}: opsi gugur`);
  assert.ok(pembahasan.alasan_kunci.startsWith(f.kunci), `${f.id}: jawaban tidak sama dengan kunci`);
  pembahasan.gambar = pakai(f.gambar_pembahasan);
  butir.push({
    no: 57 + i, id: f.id, keluarga: "FIG", jenis: f.sub_type, tingkat: f.tier,
    soal: f.instruksi, gambar: f.gambar ? pakai(f.gambar) : null, perintah: f.stem,
    jenis_opsi: "gambar", opsi: Object.fromEntries(HURUF.map((h) => [h, pakai(f.opsi_gambar[h])])),
    kunci: f.kunci, pembahasan,
  });
});

// Pemeriksaan paket utuh.
assert.deepEqual(butir.map((b) => b.no), Array.from({ length: 35 }, (_, i) => 31 + i), "nomor 31–65");
const hitung = Object.fromEntries(HURUF.map((h) => [h, butir.filter((b) => b.kunci === h).length]));
assert.ok(HURUF.every((h) => hitung[h] === 7), `kunci per huruf ${JSON.stringify(hitung)}`);
const kunci = butir.map((b) => b.kunci).join("");
assert.ok(!/(.)\1\1/.test(kunci), "kunci sama 3× berturut");
const siswa = JSON.stringify(butir.map(({ reviu, ...b }) => b));
assert.ok(!/jebakan|\bJF?-[A-Z]/i.test(siswa), "bagian siswa memuat kata jebakan atau kode");
for (const f of gambar) assert.ok(fs.existsSync(path.join(FIG, f)), `gambar hilang: ${f}`);

fs.mkdirSync(path.join(KELUAR, "img"), { recursive: true });
for (const f of gambar) fs.copyFileSync(path.join(FIG, f), path.join(KELUAR, f));
fs.writeFileSync(path.join(KELUAR, "paket_tiu_1.json"), JSON.stringify({
  paket: "TIU Paket 1", jumlah: butir.length, tanggal: "2026-10-30", status: "disetujui Gusti; ekspor PDF/CAT ditunda",
  catatan: "Bagian reviu (kode dan bukti) hanya untuk edisi pengajar; pembahasan.waspada dirender dengan label 'Yang sering membuat keliru'.",
  kunci, butir,
}, null, 1));
console.log(`simpan OK: ${butir.length} butir, ${gambar.size} gambar, kunci ${kunci}`);
