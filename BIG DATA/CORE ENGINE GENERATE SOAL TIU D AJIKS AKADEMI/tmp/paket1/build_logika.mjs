// Blok kecukupan data (46–52), analitis (53–55), optimasi (56) Paket 1 TIU.
// Semua kunci dibuktikan dengan mencoba semua kemungkinan. node build_logika.mjs → soal_logika.json
import { writeFileSync } from "node:fs";
import assert from "node:assert/strict";
const HURUF = "ABCDE";
const soal = [];

// ---------- Kecukupan data ----------
const OPSI_KCK = {
  A: "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.",
  B: "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.",
  C: "Pernyataan (1) dan (2) BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi satu pernyataan SAJA tidak cukup.",
  D: "Pernyataan (1) SAJA cukup DAN pernyataan (2) SAJA cukup untuk menjawab pertanyaan.",
  E: "Pernyataan (1) dan (2) BERSAMA-SAMA tidak cukup untuk menjawab pertanyaan.",
};
// dunia: semua keadaan yang sesuai soal; jawab(d): nilai yang ditanya; p1/p2: predikat pernyataan
function kck(no, teks, dunia, jawab, p1, p2, kunci, jebakan) {
  const cukup = (f) => new Set(dunia.filter(f).map((d) => String(jawab(d)))).size === 1;
  for (const f of [p1, p2, (d) => p1(d) && p2(d)]) assert.ok(dunia.some(f), `${no}: pernyataan tidak pernah terpenuhi`);
  const [c1, c2, c12] = [cukup(p1), cukup(p2), cukup((d) => p1(d) && p2(d))];
  const hasil = c1 && c2 ? "D" : c1 ? "A" : c2 ? "B" : c12 ? "C" : "E";
  assert.equal(hasil, kunci, `${no}: hasil ${hasil}, rencana ${kunci}`);
  assert.ok(!cukup(() => true), `${no}: soal sudah terjawab tanpa pernyataan (stem menjawab sendiri)`);
  const contoh = (f) => { const v = [...new Map(dunia.filter(f).map((d) => [String(jawab(d)), d])).values()].slice(0, 2); return v.map((d) => [JSON.stringify(d), jawab(d)]); };
  soal.push({ no, keluarga: "KCK", ...teks, opsi: OPSI_KCK, kunci, jebakan, bukti: { c1, c2, c12, tidakCukup1: c1 ? null : contoh(p1), tidakCukup2: c2 ? null : contoh(p2) } });
}
const rentang = (a, b, s = 1) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);

// 46 — harga 5 map + 5 spidol
{
  const dunia = rentang(500, 20000, 500).flatMap((m) => rentang(500, 20000, 500).map((s) => ({ m, s })));
  kck(46, {
    soal: "Di sebuah toko alat tulis, setiap map dijual dengan harga yang sama dan setiap spidol juga dijual dengan harga yang sama. Berapa harga 5 map dan 5 spidol?",
    pernyataan: ["Harga 2 map dan 2 spidol adalah Rp18.000.", "Harga satu map Rp3.000 lebih mahal daripada harga satu spidol."],
    kalimat_kunci: "5 map dan 5 spidol",
  }, dunia, (d) => 5 * d.m + 5 * d.s, (d) => 2 * d.m + 2 * d.s === 18000, (d) => d.m - d.s === 3000, "A",
    { B: "harga selisih dikira cukup", C: "mengira harga satuan map dan spidol harus diketahui", D: "(2) dikira cukup sendiri", E: "tidak melihat bahwa 5 map + 5 spidol = 2,5 × (2 map + 2 spidol)" });
}

// 47 — truk BPBD, berat karung terberat/teringan
{
  // keadaan diringkas: n karung, total berat (kg). Dengan karung terberat M dan teringan m, total berada di [M + m + (n−2)m, M + m + (n−2)M].
  const dunia = [];
  for (const n of [90, 100, 110, 120]) for (const [mn, mx] of [[40, 48], [45, 50], [38, 44]]) for (let tot = mx + mn + (n - 2) * mn; tot <= mx + mn + (n - 2) * mx; tot += 4) dunia.push({ n, mn, mx, tot });
  kck(47, {
    soal: "Sebuah truk BPBD dengan batas muatan 5.000 kg akan mengangkut karung beras bantuan dalam satu kali jalan. Apakah seluruh karung dapat diangkut tanpa melebihi batas muatan truk?",
    pernyataan: ["Jumlah karung beras yang akan diangkut adalah 110 karung.", "Karung terberat beratnya 48 kg dan karung teringan beratnya 40 kg."],
    kalimat_kunci: "karung terberat … karung teringan",
  }, dunia, (d) => d.tot <= 5000, (d) => d.n === 110, (d) => d.mn === 40 && d.mx === 48, "E",
    { A: "jumlah karung dikira cukup", B: "berat karung dikira cukup", C: "semua karung dianggap seberat karung terberat (atau teringan)", D: "masing-masing pernyataan dikira cukup" });
}

// 48 — konveksi, 6 penjahit, paling lama 4 hari
{
  const dunia = [];
  for (const kerja of rentang(12, 60, 6)) for (const laju of [8, 10, 12, 15]) dunia.push({ kerja, laju, seragam: kerja * laju }); // kerja = penjahit-hari
  kck(48, {
    soal: "Sebuah konveksi menerima satu pesanan seragam dan menugaskan 6 penjahit untuk mengerjakannya. Semua penjahit di konveksi itu bekerja dengan kecepatan yang sama. Apakah pesanan tersebut selesai dalam waktu paling lama 4 hari?",
    pernyataan: ["10 penjahit konveksi itu dapat menyelesaikan pesanan yang sama dalam 3 hari.", "Setiap penjahit menyelesaikan 12 seragam per hari."],
    kalimat_kunci: "menugaskan 6 penjahit",
  }, dunia, (d) => d.kerja / 6 <= 4, (d) => d.kerja === 30, (d) => d.laju === 12, "A",
    { B: "kecepatan per penjahit dikira cukup tanpa banyak seragam", C: "mengira kecepatan per penjahit juga perlu", D: "(2) dikira cukup sendiri", E: "menghitung searah: lebih sedikit penjahit dikira lebih cepat, lalu ragu" });
}

// 49 — peserta seleksi, total 84
{
  const dunia = rentang(1, 83).map((pi) => ({ pa: 84 - pi, pi }));
  kck(49, {
    soal: "Seleksi tahap akhir diikuti 84 peserta yang terdiri atas peserta putra dan peserta putri. Berapa banyak peserta putri?",
    pernyataan: ["Perbandingan banyak peserta putra dan putri adalah 4 : 3.", "Banyak peserta putra 12 orang lebih banyak daripada peserta putri."],
    kalimat_kunci: "84 peserta",
  }, dunia, (d) => d.pi, (d) => 3 * d.pa === 4 * d.pi, (d) => d.pa - d.pi === 12, "D",
    { A: "berhenti di (1) tanpa memeriksa (2)", B: "berhenti di (2) tanpa memeriksa (1)", C: "mengira keduanya harus digabung", E: "lupa total 84 tertulis di soal" });
}

// 50 — harga cabai awal bulan
{
  const dunia = rentang(20000, 70000, 500).flatMap((awal) => [10, 15, 20].flatMap((naik1) => [20, 25, 30].map((naik2) => ({ awal, naik1, naik2, akhir: awal * (100 + naik2) / 100 }))));
  kck(50, {
    soal: "Berapa harga satu kilogram cabai pada awal bulan?",
    pernyataan: ["Pada pertengahan bulan, harga cabai naik 15% dari harga awal bulan.", "Pada akhir bulan, harga cabai Rp55.000 per kilogram, yaitu 25% lebih tinggi daripada harga awal bulan."],
    kalimat_kunci: "25% lebih tinggi daripada harga awal bulan",
  }, dunia, (d) => d.awal, (d) => d.naik1 === 15, (d) => d.naik2 === 25 && d.akhir === 55000, "B",
    { A: "persen kenaikan dikira cukup tanpa harga", C: "mengira harga pertengahan bulan perlu", D: "(1) dikira cukup", E: "mengira persen dari harga awal yang belum diketahui tidak bisa dihitung balik" });
}

// 51 — habis dibagi 12
{
  const dunia = rentang(1, 1200).map((n) => ({ n }));
  kck(51, {
    soal: "<i>n</i> adalah bilangan bulat positif. Apakah <i>n</i> habis dibagi 12?",
    pernyataan: ["<i>n</i> habis dibagi 4.", "<i>n</i> habis dibagi 6."],
    kalimat_kunci: "habis dibagi 12",
  }, dunia, (d) => d.n % 12 === 0, (d) => d.n % 4 === 0, (d) => d.n % 6 === 0, "C",
    { A: "(1) dikira cukup karena 12 kelipatan 4", B: "(2) dikira cukup karena 12 kelipatan 6", D: "masing-masing dikira cukup", E: "mengira syaratnya habis dibagi 4 × 6 = 24, atau nilai n harus diketahui" });
}

// 52 — paduan suara dan basket
{
  const dunia = [];
  for (const kelas of rentang(25, 36)) for (const ps of [15, 18, 20]) for (const bs of [12, 15]) for (let dua = 1; dua <= Math.min(ps, bs); dua++) if (ps + bs - dua <= kelas) dunia.push({ kelas, ps, bs, dua });
  kck(52, {
    soal: "Kelas XI-B memiliki dua kegiatan ekstrakurikuler, yaitu paduan suara dan basket. Setiap siswa boleh mengikuti salah satu kegiatan, keduanya, atau tidak mengikuti keduanya. Berapa banyak siswa yang mengikuti paduan suara sekaligus basket?",
    pernyataan: ["Sebanyak 18 siswa mengikuti paduan suara dan 15 siswa mengikuti basket.", "Kelas XI-B terdiri atas 30 siswa."],
    kalimat_kunci: "atau tidak mengikuti keduanya",
  }, dunia, (d) => d.dua, (d) => d.ps === 18 && d.bs === 15, (d) => d.kelas === 30, "E",
    { A: "(1) dikira cukup", B: "(2) dikira cukup", C: "menganggap setiap siswa ikut minimal satu kegiatan (18 + 15 − 30 = 3)", D: "masing-masing dikira cukup" });
}

// ---------- Analitis ----------
const perm = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p])));
// pasti(dunia, syarat, opsi): kunci = satu-satunya opsi benar di semua dunia sah; tiap syarat harus perlu.
function analitis(no, teks, dunia, syarat, opsi, kunci) {
  const pastiBenar = (aktif) => { const sah = dunia.filter((d) => aktif.every(([, f]) => f(d))); return [sah.length, opsi.map(([, g]) => sah.length > 0 && sah.every(g))]; };
  const [n, hasil] = pastiBenar(syarat);
  assert.ok(n > 0, `${no}: tidak ada susunan sah`);
  assert.equal(hasil.filter(Boolean).length, 1, `${no}: opsi pasti benar = ${hasil.filter(Boolean).length}`);
  const iK = hasil.indexOf(true);
  // tiap pengecoh harus mungkin salah, dan tiap syarat perlu (tanpa syarat itu hasilnya berubah)
  syarat.forEach((s, i) => { const [, h] = pastiBenar(syarat.filter((_, j) => j !== i)); assert.notDeepEqual(h, hasil, `${no}: syarat ${i + 1} tidak perlu`); });
  const o = opsi.map(([t, , jeb], i) => ({ teks: t, jebakan: i === iK ? null : jeb }));
  const k = o.splice(iK, 1);
  o.splice(HURUF.indexOf(kunci), 0, ...k);
  soal.push({ no, keluarga: "ANA", ...teks, syarat: syarat.map(([t]) => t), opsi: Object.fromEntries(o.map((x, i) => [HURUF[i], x.teks])), jebakan: Object.fromEntries(o.map((x, i) => [HURUF[i], x.jebakan])), kunci, bukti: { susunanSah: n } });
}

// 53 — lima regu presentasi Senin–Jumat
{
  const T = ["banjir", "gempa", "kebakaran", "longsor", "puting beliung"];
  const dunia = perm([0, 1, 2, 3, 4]).flatMap((p) => perm(T).map((t) => ({ A: p[0], B: p[1], C: p[2], D: p[3], K: p[4], t })));
  const tp = (d, r) => d.t[d[r]];
  analitis(53, {
    soal: "Lima regu siaga bencana, yaitu Anggrek, Bakung, Cempaka, Dahlia, dan Kenanga, mempresentasikan rencana kerja pada hari Senin sampai Jumat. Setiap hari hanya satu regu yang tampil, dan setiap regu membawakan satu topik yang berbeda: banjir, gempa, kebakaran, longsor, atau puting beliung. Ketentuannya sebagai berikut.",
    perintah: "Pernyataan berikut yang pasti benar adalah …",
  }, dunia, [
    ["Cempaka tampil tepat sehari setelah Anggrek.", (d) => d.C === d.A + 1],
    ["Regu yang membawakan topik gempa tampil pada hari Rabu.", (d) => d.t[2] === "gempa"],
    ["Kenanga membawakan topik longsor dan tampil lebih awal daripada Bakung.", (d) => tp(d, "K") === "longsor" && d.K < d.B],
    ["Topik banjir dibawakan tepat sehari sebelum topik kebakaran.", (d) => d.t.indexOf("banjir") + 1 === d.t.indexOf("kebakaran")],
    ["Anggrek tidak membawakan topik gempa maupun banjir.", (d) => !["gempa", "banjir"].includes(tp(d, "A"))],
  ], [
    ["Bakung tampil pada hari Kamis.", (d) => d.B === 3, "susunan yang mungkin dianggap pasti"],
    ["Dahlia membawakan topik banjir.", (d) => tp(d, "D") === "banjir", "susunan yang mungkin dianggap pasti"],
    ["Kenanga tampil pada hari Senin.", (d) => d.K === 0, "susunan yang mungkin dianggap pasti"],
    ["Cempaka membawakan topik gempa.", (d) => tp(d, "C") === "gempa"],
    ["Anggrek membawakan topik kebakaran.", (d) => tp(d, "A") === "kebakaran", "susunan yang mungkin dianggap pasti"],
  ], "D");
}

// 54 — enam petugas piket di meja bundar (kursi 0–5 searah jarum jam dilihat dari atas, semua menghadap ke tengah)
{
  const nama = ["Fajar", "Gita", "Hasan", "Indah", "Joko", "Lina"];
  // Fajar di kursi 0 (putaran meja tidak mengubah susunan). Kanan orang di kursi i = kursi i − 1, kiri = i + 1.
  const dunia = perm([1, 2, 3, 4, 5]).map((p) => ({ Fajar: 0, Gita: p[0], Hasan: p[1], Indah: p[2], Joko: p[3], Lina: p[4] }));
  const kanan = (i) => (i + 5) % 6, kiri = (i) => (i + 1) % 6, hadap = (i) => (i + 3) % 6;
  const sebelah = (i, j) => kanan(i) === j || kiri(i) === j;
  const diHadapanHasan = (d) => nama.find((n) => d[n] === hadap(d.Hasan));
  analitis(54, {
    soal: "Enam petugas piket, yaitu Fajar, Gita, Hasan, Indah, Joko, dan Lina, duduk mengelilingi sebuah meja bundar dengan enam kursi berjarak sama. Semua petugas duduk menghadap ke tengah meja. Ketentuannya sebagai berikut.",
    perintah: "Petugas yang duduk tepat di hadapan Hasan adalah …",
  }, dunia, [
    ["Gita duduk tepat di sebelah kanan Fajar.", (d) => d.Gita === kanan(d.Fajar)],
    ["Indah duduk tepat di hadapan Gita.", (d) => d.Indah === hadap(d.Gita)],
    ["Joko duduk tepat di sebelah kiri Indah.", (d) => d.Joko === kiri(d.Indah)],
  ], [
    ["Fajar", (d) => diHadapanHasan(d) === "Fajar", "hadapan dihitung dua kursi, bukan tiga"],
    ["Gita", (d) => diHadapanHasan(d) === "Gita", "petugas di sebelah dikira berhadapan"],
    ["Indah", (d) => diHadapanHasan(d) === "Indah", "hadapan dihitung dua kursi, bukan tiga"],
    ["Joko", (d) => diHadapanHasan(d) === "Joko", "kiri dan kanan tertukar hanya di ketentuan Joko"],
    ["Lina", (d) => diHadapanHasan(d) === "Lina"],
  ], "B");
}

// 55 — urutan kedatangan enam kapal (urutan sebagian)
{
  const K = ["P", "Q", "R", "S", "T", "U"];
  const dunia = perm(K).map((u) => Object.fromEntries(u.map((k, i) => [k, i])));
  analitis(55, {
    soal: "Enam kapal, yaitu Kapal P, Q, R, S, T, dan U, tiba di sebuah pelabuhan pada hari yang sama secara bergantian, dan tidak ada dua kapal yang tiba bersamaan. Ketentuannya sebagai berikut.",
    perintah: "Pernyataan berikut yang pasti benar adalah …",
  }, dunia, [
    ["Kapal P tiba sebelum Kapal Q dan sebelum Kapal R.", (d) => d.P < d.Q && d.P < d.R],
    ["Kapal S tiba setelah Kapal R, tetapi sebelum Kapal T.", (d) => d.R < d.S && d.S < d.T],
    ["Kapal U tiba setelah Kapal Q.", (d) => d.Q < d.U],
    ["Kapal T bukan kapal yang tiba paling akhir.", (d) => d.T !== 5],
  ], [
    ["Kapal Q tiba kedua.", (d) => d.Q === 1, "urutan sebagian dianggap urutan penuh"],
    ["Kapal R tiba sebelum Kapal Q.", (d) => d.R < d.Q, "susunan yang mungkin dianggap pasti"],
    ["Kapal U tiba paling akhir.", (d) => d.U === 5],
    ["Kapal T tiba kelima.", (d) => d.T === 4, "urutan sebagian dianggap urutan penuh"],
    ["Kapal S tiba ketiga.", (d) => d.S === 2, "urutan sebagian dianggap urutan penuh"],
  ], "D");
}

// ---------- Optimasi ----------
// 56 — pesan paling sedikit 150 nasi kotak; kunci = biaya termurah dari SEMUA kombinasi
{
  const paket = [["Paket Melati", 20, 380000], ["Paket Mawar", 35, 595000], ["Paket Teratai", 50, 800000]];
  const butuh = 130;
  const [hm, hb, ht] = paket.map((x) => x[2]);
  let terbaik = null, tepat = null;
  for (let a = 0; a <= 8; a++) for (let b = 0; b <= 5; b++) for (let c = 0; c <= 4; c++) {
    const isi = a * 20 + b * 35 + c * 50, biaya = a * hm + b * hb + c * ht;
    if (isi >= butuh && (!terbaik || biaya < terbaik.biaya)) terbaik = { a, b, c, isi, biaya };
    if (isi === butuh && (!tepat || biaya < tepat.biaya)) tepat = { a, b, c, isi, biaya };
  }
  // optimum harus tunggal
  let kembar = 0;
  for (let a = 0; a <= 8; a++) for (let b = 0; b <= 5; b++) for (let c = 0; c <= 4; c++) if (a * 20 + b * 35 + c * 50 >= butuh && a * hm + b * hb + c * ht === terbaik.biaya) kembar++;
  assert.equal(kembar, 1, "56: kombinasi termurah tidak tunggal");
  const rp = (x) => "Rp" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const cand = [
    { nilai: terbaik.biaya, jebakan: null },
    { nilai: Math.ceil(butuh / 50) * ht, jebakan: "hanya membeli paket dengan harga per kotak termurah (Teratai)" },
    { nilai: tepat.biaya, jebakan: "memaksakan jumlah tepat 130 kotak" },
    { nilai: hm + 2 * ht, jebakan: "kombinasi kurang dari 130 kotak (120 kotak)" },
    { nilai: (ht / 50) * butuh, jebakan: "harga per kotak termurah dikali 130, padahal kotak tidak dijual satuan" },
  ];
  const o = [...cand].sort((x, y) => x.nilai - y.nilai);
  assert.equal(new Set(o.map((x) => x.nilai)).size, 5, "56: opsi kembar");
  // pengecoh yang lebih murah dari kunci wajib tidak memenuhi syarat
  for (const x of o) if (x.nilai < terbaik.biaya) assert.ok(/kurang|satuan/.test(x.jebakan), "56: ada opsi lebih murah yang sah");
  const iK = o.findIndex((x) => x.jebakan === null);
  soal.push({ no: 56, keluarga: "OPT", soal: `Panitia pelatihan memesan paling sedikit ${butuh} nasi kotak dari sebuah katering. Katering hanya menjual nasi kotak dalam paket berikut.`,
    tabel: [["Paket", "Isi (kotak)", "Harga per paket"], ...paket.map(([n, i, h]) => [n, i, rp(h)])],
    perintah: "Biaya paling sedikit yang harus dikeluarkan panitia adalah …",
    opsi: Object.fromEntries(o.map((x, i) => [HURUF[i], rp(x.nilai)])), jebakan: Object.fromEntries(o.map((x, i) => [HURUF[i], x.jebakan])),
    kunci: HURUF[iK], bukti: { terbaik, tepat } });
}

writeFileSync(new URL("soal_logika.json", import.meta.url), JSON.stringify(soal, null, 1));
for (const s of soal) console.log(s.no, s.kunci, s.bukti.susunanSah ?? "");
console.log("logika OK", soal.length);
