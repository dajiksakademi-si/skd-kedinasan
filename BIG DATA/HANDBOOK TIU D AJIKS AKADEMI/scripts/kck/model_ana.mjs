// Handbook TIU · Tahap 5 · model Bab 12 Penalaran Analitis. Semua susunan dicacah (garis = permutasi, lingkar = orang pertama
// dikunci di kursi 0, jadwal = semua pembagian, pencocokan = semua pemetaan); tiap pilihan = predikat; kata tanya diuji atas susunan sah.
// Pilih susunan: tiap syarat menggugurkan ≥ 1 pilihan, tak ada syarat yang menggugurkan keempatnya, skor unsur bersama kunci tidak tertinggi/terendah.
import assert from "node:assert/strict";
import { H, perm, unik, rentang, lingkar, garis, tanya, perlu, kck2 } from "./alat_kck.mjs";

const urutNama = (w) => Object.keys(w).sort((a, b) => w[a] - w[b]);
const putar = (w) => { const a = []; for (const x in w) a[w[x]] = x; return a.join(" "); };
// pilih susunan: opsi = urutan nama; syarat dinilai pada urutan itu
export function pilih(id, opsi, S, kunci) {
  const gugur = S.map((f) => H.filter((h) => !f(opsi[h])));
  H.forEach((h) => assert.equal(S.every((f) => f(opsi[h])), h === kunci, `${id} ${h}: sah/tidak sah`));
  gugur.forEach((g, i) => { assert.ok(g.length >= 1, `${id}: syarat ${i + 1} tidak menggugurkan pilihan`); assert.ok(g.length < 4, `${id}: syarat ${i + 1} menggugurkan keempat pilihan salah`); });
  H.filter((h) => h !== kunci).forEach((h) => assert.equal(S.filter((f) => !f(opsi[h])).length, 1, `${id} ${h}: melanggar tepat satu syarat`));
  const skor = Object.fromEntries(H.map((h) => [h, opsi[h].reduce((t, x, p) => t + H.filter((g) => g !== h && opsi[g][p] === x).length, 0)]));
  const v = Object.values(skor), k = skor[kunci];
  assert.ok(k > Math.min(...v) && k < Math.max(...v) && v.filter((x) => x === k).length === 1, `${id}: skor unsur bersama kunci menyendiri ${JSON.stringify(skor)}`);
  return { gugur: Object.fromEntries(gugur.map((g, i) => [i + 1, g.join("")])), skor };
}

export const MODEL = {
  // P01 · lima lantai, pasti benar
  "HB-TIU-B12-P01"() {
    const W = garis(["L", "M", "N", "O", "P"]);
    const S = [(w) => w.M === w.L + 1, (w) => w.O > w.M, (w) => w.N !== 1, (w) => w.P < w.L];
    const opsi = { A: (w) => w.L === 2, B: (w) => w.O === 5, C: (w) => w.N > w.M, D: (w) => w.L === w.M + 1, E: (w) => w.P === 1 };
    const sah = W.filter((w) => S.every((f) => f(w)));
    const t = tanya("B12-P01", sah, opsi, "pasti");
    assert.equal(t.kunci, "E"); assert.equal(sah.length, 3);
    const per = perlu("B12-P01", W, S, opsi, "pasti");
    return { teks: { A: "Laras tinggal di lantai 2.", B: "Oki tinggal di lantai 5.", C: "Nanda tinggal di lantai yang lebih tinggi daripada Maya.", D: "Laras tinggal tepat satu lantai di atas Maya.", E: "Prita tinggal di lantai 1." },
      kunci: "E", kode: { A: "J-MUNGKIN", B: "J-MUNGKIN", C: "J-MUNGKIN", D: "J-BALIK", E: "kunci" },
      susunan: sah.map((w) => urutNama(w).join(" ")),
      bukti: { metode: `120 susunan lima lantai; sah 3: ${sah.map((w) => urutNama(w).join("")).join(", ")} (lantai 1 → 5); pilihan benar di ${JSON.stringify(t.hit)} susunan; tanpa syarat 1–4 tersisa ${per.join("/")}` },
      angka: ["120", "3", "2", "4", "5", "1"] };
  },
  // C01 · enam penampil + kelas, pilih susunan
  "HB-TIU-B12-C01"() {
    const kel = { A: "X", D: "X", B: "XI", C: "XI", E: "XII", F: "XII" };
    const p = (s, x) => s.indexOf(x);
    const S = [(s) => p(s, "E") === p(s, "B") + 1, (s) => s.every((x, i) => !i || kel[x] !== kel[s[i - 1]]), (s) => kel[s[0]] === "XII", (s) => p(s, "D") < p(s, "A")];
    const opsi = Object.fromEntries(Object.entries({ A: "FBDECA", B: "FBEDAC", C: "FDCABE", D: "FCABED", E: "CDBEAF" }).map(([h, s]) => [h, s.split("")]));
    const pk = pilih("B12-C01", opsi, S, "C");
    const sah = perm("ABCDEF".split("")).filter((s) => S.every((f) => f(s)));
    const nama = { A: "Arif", B: "Bunga", C: "Candra", D: "Dewi", E: "Erlan", F: "Fitri" };
    const teks = Object.fromEntries(H.map((h) => [h, opsi[h].map((x) => nama[x]).join(", ")]));
    return { teks, kunci: "C", kode: { A: "J-SYARAT", B: "J-SYARAT", C: "kunci", D: "J-BALIK", E: "J-NOMOR" }, gugur: pk.gugur,
      bukti: { metode: `syarat 1–4 menggugurkan pilihan ${Object.values(pk.gugur).join(" · ")}; tiap pilihan salah melanggar tepat satu syarat; skor unsur bersama ${JSON.stringify(pk.skor)}; susunan sah di luar pilihan ${sah.length}` },
      angka: [String(sah.length), "6"] };
  },
  // C02 · delapan kursi melingkar + syarat "jika", pasti benar
  "HB-TIU-B12-C02"() {
    const N = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const uji = (balik) => {
      const L = lingkar(N, balik);
      const S = [(w) => L.hd(w.C) === w.D, (w) => L.ka(w.B) === w.C, (w) => L.seb(w.D, w.E) && L.seb(w.D, w.F), (w) => !L.seb(w.G, w.A)];
      const sah = L.W.filter((w) => S.every((f) => f(w)));
      const J = sah.filter((w) => L.hd(w.A) === w.H);
      const opsi = { A: (w) => L.ka(w.A) === w.B, B: (w) => L.ka(w.D) === w.E, C: (w) => L.ki(w.G) === w.H, D: (w) => L.hd(w.G) === w.A, E: (w) => L.seb(w.F, w.H) };
      return { L, S, sah, J, opsi, t: tanya("B12-C02", J, opsi, "pasti") };
    };
    const a = uji(false), b = uji(true);
    assert.equal(a.t.kunci, "A"); assert.equal(b.t.kunci, "A", "kunci sama untuk kedua arah kanan");
    assert.equal(a.sah.length, 8); assert.equal(a.J.length, 2);
    assert.ok(!a.sah.every(a.opsi.A), "syarat jika memang mempersempit");
    assert.ok(a.J.every((w) => a.L.jarak(w.G, w.A) === 3) && !a.J.some(a.opsi.D), "D = hadapan dihitung kurang satu kursi");
    const per = perlu("B12-C02", a.L.W.filter((w) => a.L.hd(w.A) === w.H), a.S, a.opsi, "pasti");
    return { teks: { A: "Beni duduk tepat di sebelah kanan Andi.", B: "Eva duduk tepat di sebelah kanan Dina.", C: "Hesti duduk tepat di sebelah kiri Gani.", D: "Gani duduk berhadapan dengan Andi.", E: "Farhan duduk bersebelahan dengan Hesti." },
      kunci: "A", kode: { A: "kunci", B: "J-MUNGKIN", C: "J-BALIK", D: "J-NOMOR", E: "J-MUNGKIN" }, susunan: a.J.map(putar),
      bukti: { metode: `Andi dikunci di kursi 0; 5.040 susunan, sah 8; dengan syarat jika tersisa 2 (${a.J.map(putar).join(" | ")}, searah jarum jam dari Andi); pilihan benar di ${JSON.stringify(a.t.hit)}; arah kanan dibalik → kunci tetap A; tanpa syarat 1–4 (dengan jika) tersisa ${per.join("/")}` },
      angka: ["8", "2", "4", "3"] };
  },
  // C03 · urutan sebagian tujuh surat + "tepat setelah", tidak mungkin
  "HB-TIU-B12-C03"() {
    const W = garis("ABCDEFG".split(""));
    const S = [(w) => w.A < w.C, (w) => w.B < w.C, (w) => w.C < w.E, (w) => w.E < w.G, (w) => w.F < w.G, (w) => w.D === w.B + 1];
    const opsi = { A: (w) => w.F < w.A, B: (w) => w.F === 6, C: (w) => w.A === 2, D: (w) => w.E === 5, E: (w) => w.C < w.D };
    const sah = W.filter((w) => S.every((f) => f(w)));
    const t = tanya("B12-C03", sah, opsi, "tidak mungkin");
    assert.equal(t.kunci, "E"); assert.equal(sah.length, 10);
    assert.ok(W.filter((w) => S.slice(0, 5).every((f) => f(w)) && w.D > w.B).some(opsi.E), "tanpa kata tepat, C sebelum D mungkin");
    const per = perlu("B12-C03", W, S, opsi, "tidak mungkin");
    return { teks: { A: "Surat F diarsipkan sebelum surat A.", B: "Surat F diarsipkan keenam.", C: "Surat A diarsipkan kedua.", D: "Surat E diarsipkan kelima.", E: "Surat C diarsipkan sebelum surat D." },
      kunci: "E", kode: { A: "J-ASUMSI", B: "J-BALIK", C: "J-MUNGKIN", D: "J-NOMOR", E: "kunci" }, susunan: sah.map((w) => urutNama(w).join("")),
      bukti: { metode: `5.040 urutan; sah 10 (${sah.map((w) => urutNama(w).join("")).join(", ")}); pilihan benar di ${JSON.stringify(t.hit)} susunan; "tepat setelah" dilonggarkan → C sebelum D jadi mungkin; tanpa syarat 1–6 tersisa ${per.join("/")}` },
      angka: ["10", "3", "2", "1", "4", "5", "6", "7"] };
  },
  // C04 · pencocokan empat orang × kota × kendaraan, mungkin benar (penyimpangan dari slot "pasti", lihat catatan_reviu)
  "HB-TIU-B12-C04"() {
    const O = ["I", "J", "K", "L"], K = ["Bogor", "Cirebon", "Garut", "Serang"], M = ["bus", "kereta", "mobil", "motor"];
    const W = []; for (const k of perm(K)) for (const m of perm(M)) W.push(Object.fromEntries(O.map((o, i) => [o, { k: k[i], m: m[i] }])));
    const dari = (w, kota) => O.find((o) => w[o].k === kota);
    const S = [(w) => w.J.k !== "Bogor" && w.J.m !== "kereta", (w) => w[dari(w, "Garut")].m === "motor", (w) => w.K.m === "bus", (w) => w.I.k !== "Garut" && w.I.k !== "Serang"];
    const opsi = { A: (w) => w[dari(w, "Cirebon")].m === "motor", B: (w) => w.J.k === "Cirebon", C: (w) => w.K.k === "Garut", D: (w) => w[dari(w, "Garut")].m === "bus", E: (w) => w.I.k === "Serang" };
    const sah = W.filter((w) => S.every((f) => f(w)));
    const t = tanya("B12-C04", sah, opsi, "mungkin");
    assert.equal(t.kunci, "B"); assert.equal(sah.length, 11);
    // C gugur oleh syarat 2 dan 3 bersama; A gugur karena setiap kendaraan dipakai satu orang (motor = peserta dari Garut, bukan Cirebon)
    assert.ok(W.filter((w) => S.filter((_, i) => i !== 1).every((f) => f(w))).some(opsi.C) && W.filter((w) => S.filter((_, i) => i !== 2).every((f) => f(w))).some(opsi.C));
    const per = perlu("B12-C04", W, S, opsi, "mungkin");
    const satu = sah.find(opsi.B);
    return { teks: { A: "Peserta dari Cirebon naik motor.", B: "Juwita berasal dari Cirebon.", C: "Kevin berasal dari Garut.", D: "Peserta dari Garut naik bus.", E: "Ilham berasal dari Serang." },
      kunci: "B", kode: { A: "J-SYARAT", B: "kunci", C: "J-SYARAT", D: "J-KATA", E: "J-SYARAT" }, susunan: sah.map((w) => O.map((o) => `${o} ${w[o].k}/${w[o].m}`).join(", ")),
      bukti: { metode: `576 pemetaan; sah ${sah.length}; pilihan benar di ${JSON.stringify(t.hit)} pemetaan; B hanya di ${O.map((o) => `${o} ${satu[o].k}/${satu[o].m}`).join(", ")}; C gugur oleh syarat 2 dan 3 bersama; tanpa syarat 1–4 tersisa ${per.join("/")}` },
      angka: ["576", "11", "1", "2", "24"] };
  },
  // L01 · tujuh penampil berjajar, pilih susunan
  "HB-TIU-B12-L01"() {
    const p = (s, x) => s.indexOf(x);
    const S = [(s) => p(s, "H") === p(s, "G") + 1, (s) => p(s, "I") !== 0 && p(s, "I") !== 6, (s) => p(s, "J") < p(s, "K"), (s) => p(s, "L") === 2];
    const opsi = Object.fromEntries(Object.entries({ A: "JGLKIHM", B: "MJLIGHK", C: "IMLGHJK", D: "MKLJIGH", E: "JMIKLGH" }).map(([h, s]) => [h, s.split("")]));
    const pk = pilih("B12-L01", opsi, S, "B");
    const nama = { G: "Galih", H: "Hana", I: "Irfan", J: "Jihan", K: "Kirana", L: "Lutfi", M: "Mira" };
    return { teks: Object.fromEntries(H.map((h) => [h, opsi[h].map((x) => nama[x]).join(", ")])), kunci: "B", kode: { A: "J-SYARAT", B: "kunci", C: "J-SYARAT", D: "J-BALIK", E: "J-NOMOR" },
      bukti: { metode: `syarat 1–4 menggugurkan pilihan ${Object.values(pk.gugur).join(" · ")}; tiap pilihan salah melanggar tepat satu syarat; skor unsur bersama ${JSON.stringify(pk.skor)}` } };
  },
  // L02 · lingkar enam dalam bentuk kecukupan data; urutan bunyi diacak, "BERSAMA-SAMA cukup" di A
  "HB-TIU-B12-L02"() {
    const N = ["N", "O", "P", "R", "S", "T"];
    const hasil = [false, true].map((balik) => {
      const L = lingkar(N, balik);
      return kck2("B12-L02", () => L.W.filter((w) => L.hd(w.N) === w.O), (w) => N.find((x) => w[x] === L.ka(w.R)), (w) => L.ki(w.P) === w.O, (w) => L.seb(w.P, w.R),
        { urutan: ["G", "1", "M", "X", "2"], kode: { 1: "J-ASUMSI", 2: "J-ASUMSI", M: "J-MUNGKIN", X: "J-SYARAT" } });
    });
    const m = hasil[0];
    assert.equal(m.makna, "G"); assert.equal(m.kunci, "A"); assert.equal(hasil[1].makna, "G", "makna sama untuk kedua arah kanan");
    assert.deepEqual(m.r.gab.jawaban, ["N"]);
    return { ...m, bukti: { metode: `Nadia dikunci di kursi 0, Omar di hadapannya: 24 susunan; (1) ${m.r.s1.jawaban.length} kemungkinan, (2) ${m.r.s2.jawaban.length} kemungkinan, gabungan ${m.r.gab.banyak} susunan dengan jawaban Nadia; arah kanan dibalik → makna tetap; urutan bunyi G · 1 · M · X · 2` } };
  },
  // L03 · jadwal enam orang tiga hari, pasti benar (penyimpangan dari slot "mungkin", lihat catatan_reviu)
  "HB-TIU-B12-L03"() {
    const O = ["T", "U", "V", "W", "Y", "Z"];
    const W = unik(perm([0, 0, 1, 1, 2, 2]).map((p) => Object.fromEntries(O.map((o, i) => [o, p[i]]))));
    assert.equal(W.length, 90);
    const S = [(w) => w.U === w.V, (w) => w.W !== w.Y, (w) => w.Z === 2, (w) => w.T !== 0];
    const opsi = { A: (w) => w.T === 1, B: (w) => w.W === 1, C: (w) => w.Y === w.Z, D: (w) => w.T === 0, E: (w) => w.W === 2 };
    const sah = W.filter((w) => S.every((f) => f(w)));
    const t = tanya("B12-L03", sah, opsi, "pasti");
    assert.equal(t.kunci, "A"); assert.equal(sah.length, 2);
    // D: kata "tidak" pada syarat 4 terlewat → Tito pasti hari Senin
    const lepas = W.filter((w) => S.slice(0, 3).every((f) => f(w)) && w.T === 0);
    assert.ok(lepas.length && lepas.every(opsi.D));
    const per = perlu("B12-L03", W, S, opsi, "pasti");
    const hari = ["Senin", "Selasa", "Rabu"];
    return { teks: { A: "Tito bertugas pada hari Selasa.", B: "Wulan bertugas pada hari Selasa.", C: "Yoga bertugas bersama Zahra.", D: "Tito bertugas pada hari Senin.", E: "Wulan bertugas pada hari Rabu." },
      kunci: "A", kode: { A: "kunci", B: "J-MUNGKIN", C: "J-ASUMSI", D: "J-SYARAT", E: "J-MUNGKIN" },
      bukti: { metode: `90 pembagian; sah 2 (${sah.map((w) => hari.map((h, d) => `${h} ${O.filter((o) => w[o] === d).join("")}`).join(", ")).join(" | ")}); pilihan benar di ${JSON.stringify(t.hit)}; "tidak" syarat 4 terlewat → D pasti; tanpa syarat 1–4 tersisa ${per.join("/")}` } };
  },
  // L04 · tujuh kursi melingkar, tidak mungkin
  "HB-TIU-B12-L04"() {
    const N = ["A", "B", "C", "D", "E", "F", "G"];
    const L = lingkar(N), R = lingkar(N, true);
    const S = (L) => [(w) => L.seb(w.B, w.A) && L.seb(w.B, w.C), (w) => L.jarak(w.D, w.E) === 2, (w) => L.ka(w.C) === w.F];
    const antara = (L, w, x, y, z) => L.seb(w[x], w[y]) && L.seb(w[x], w[z]);
    const opsi = (L) => ({ A: (w) => L.seb(w.D, w.A), B: (w) => antara(L, w, "G", "D", "E"), C: (w) => L.ka(w.F) === w.D, D: (w) => antara(L, w, "E", "G", "F"), E: (w) => antara(L, w, "F", "D", "E") });
    const sah = L.W.filter((w) => S(L).every((f) => f(w)));
    const t = tanya("B12-L04", sah, opsi(L), "tidak mungkin");
    assert.equal(t.kunci, "E"); assert.equal(sah.length, 2);
    assert.equal(tanya("B12-L04", R.W.filter((w) => S(R).every((f) => f(w))), opsi(R), "tidak mungkin").kunci, "E", "kunci sama untuk kedua arah kanan");
    // C: arah kanan dibaca terbalik hanya pada pilihan → mustahil
    assert.ok(!sah.some((w) => L.ki(w.F) === w.D));
    // B: "berjarak satu kursi" dibaca "bersebelahan" → tak ada yang di antara Dara dan Elang
    assert.ok(!L.W.some((w) => [S(L)[0], S(L)[2]].every((f) => f(w)) && L.seb(w.D, w.E) && antara(L, w, "G", "D", "E")));
    const per = perlu("B12-L04", L.W, S(L), opsi(L), "tidak mungkin");
    return { teks: { A: "Dara duduk bersebelahan dengan Aldi.", B: "Galuh duduk tepat di antara Dara dan Elang.", C: "Dara duduk tepat di sebelah kanan Fani.", D: "Elang duduk tepat di antara Galuh dan Fani.", E: "Fani duduk tepat di antara Dara dan Elang." },
      kunci: "E", kode: { A: "J-MUNGKIN", B: "J-NOMOR", C: "J-BALIK", D: "J-MUNGKIN", E: "kunci" },
      bukti: { metode: `Aldi dikunci di kursi 0; 720 susunan, sah 2 (${sah.map(putar).join(" | ")}, searah jarum jam); pilihan benar di ${JSON.stringify(t.hit)}; arah kanan dibalik → kunci tetap E; tanpa syarat 1–3 tersisa ${per.join("/")}` } };
  },
};
