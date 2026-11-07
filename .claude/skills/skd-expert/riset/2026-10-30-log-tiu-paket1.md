# Log — Paket 1 TIU (35 soal) untuk TO pertama

Mulai 2026-10-30. Perintah Gusti: susun Paket 1 TIU dengan sebaran komponen Paket 41 Al Faiz, disisipi 2–3 soal deret model kotak terbaru.

## Status
- 2026-10-30: rencana diajukan, MENUNGGU putusan Gusti soal nomor mana yang diganti soal kotak (pilihan A/B di bawah). Belum ada soal ditulis.
- PUTUSAN GUSTI 2026-10-30: 2 SOAL KOTAK SAJA (pilihan B). No. 39 = KOTAK 2×4 X-Y (mengganti tabel dua kolom), no. 40 = KOTAK 3×3 pola baru, no. 43 tetap pasangan campuran (pasangan operasi 3). Pilihan A gugur; aturan kotak no. 5 (bilangan negatif/nol) dipasang di salah satu dari dua soal kotak. Berikut: tahap 0 lalu kartu ide 26 soal.

## Dasar
- Komposisi: putusan Gusti 2026-10-28 (engine TIU v0.4 Pilar 2) = verbal 6 · numerik 9 · kecukupan data 7 · analitis 3 · optimasi 1 · figural 9.
- Figural 57–65 SUDAH JADI: `k12-spatial-engine/.test-out-paket/paket-1/items.json` (9 soal + pembahasan + gambar). Kunci 57–65: A E C B C D A B D (A2 B2 C2 D2 E1).
- Yang disusun: 26 soal nomor 31–56.
- "Model kotak" = deret angka bentuk tabel seperti `GENERATE SOAL TERBARU SKD 2026/IMG_3767.jpg` (kisi 3×3, 3×4, 4×4, 2×4 dengan X dan Y). Paket 41 no. 40 sudah model kotak 3×3 (sel = baris kiri² + tengah, x = 16); no. 39 tabel dua kolom A→B; no. 38 suku ke-n.

## Komposisi usulan (pilihan A, rekomendasi: 3 soal kotak)
| No | Blok | Isi |
|---|---|---|
| 31–36 | Verbal | 31 memperkuat argumen · 32 silogisme · 33 memperlemah argumen · 34 silogisme · 35 analogi kata · 36 analogi hubungan kalimat |
| 37 | Numerik | estimasi hitung |
| 38 | Numerik | suku ke-n tabel (nomor suku loncat acak, ≥ 4 titik bila kuadrat) |
| 39 | Numerik | KOTAK 1 — 2×4 dengan X dan Y (menggantikan tabel dua kolom) |
| 40 | Numerik | KOTAK 2 — 3×3 (posisi sama dengan Paket 41, pola baru) |
| 41–42 | Numerik | pasangan operasi bernilai sama: bagi, kali |
| 43 | Numerik | KOTAK 3 — 3×4 atau 4×4 dengan bilangan negatif/nol (menggantikan pasangan campuran) |
| 44–45 | Numerik | cerita persen kapasitas · cerita kerja bersama keran (pengosong bernilai negatif) |
| 46–52 | Kecukupan data | 7 kerangka berbeda: aljabar · nilai vs batas · ya/tidak + laju · tiga pernyataan · berbalik nilai · rasio · persen (basis) |
| 53–55 | Analitis | urutan + atribut · duduk melingkar · urutan parsial |
| 56 | Optimasi | biaya termurah dari tabel (optimum global dibuktikan semua kombinasi) |
| 57–65 | Figural | Paket 1 figural yang sudah jadi |

Pilihan B (2 soal kotak): hanya no. 39 diganti KOTAK 2×4 X-Y; no. 40 tetap kotak 3×3; pasangan operasi tetap 3. Paling dekat dengan Paket 41.

## Aturan soal kotak
1. Pola baru: tidak sama dengan pola bank CAT 30, deret tabel level 5–6 (15), foto IMG_3767 (6), dan Paket 41 no. 40. Daftar pola terpakai dikumpulkan dulu, dicek program.
2. Pola berlaku di semua baris/kolom; X (dan Y) dicari ulang semua kemungkinan, harus tunggal.
3. Rumus lain ≤ 3 operasi tidak boleh membenarkan pengecoh (pelajaran deret tabel 2026-09-24).
4. Tiga soal beda bentuk kisi dan beda arah pola (baris / kolom / gabungan sel).
5. Satu soal memuat bilangan negatif atau nol (engine Pilar 4).
6. X-Y: opsi "a dan b"; pengecoh salah satu nilai saja atau X-Y tertukar, supaya tidak tertebak dari satu nilai.
7. Kunci bukan pencilan (ada pengecoh di atas dan di bawah).
8. Pengecoh dari kesalahan nyata: selisih tetap ditebak, pola baris pertama saja, salah tanda, salah arah.

## Aturan paket
- Kunci 35 = 7 per huruf → sisa 26: A5 B5 C5 D5 E6. Huruf sama maksimal 2 berturut, termasuk sambungan 56→57 (57 = A).
- Level draf engine Pilar 6 (30/50/20); HOTS minimal separuh.
- Tidak memakai ulang soal yang sudah beredar ke siswa (CAT deret 30 daring, PDF deret 15, kecukupan data 20, suku-pasangan 30): ditulis baru, sejalan putusan irisan TWK 2026-10-29. Soal Al Faiz hanya dipelajari polanya.
- Satu paket tanpa kerangka kembar (G8); konteks cerita tidak berulang.
- Semua angka dihitung program dengan assert; G1–G8 per butir.

## Tahapan
0. Persiapan: daftar pola/kerangka terpakai (larangan) + pemeriksa paket (kunci 7×5, berderet, kerangka kembar, pencilan).
1. Kartu ide 26 soal (nomor, jenis, kerangka satu baris, kalimat kunci, jebakan, level, huruf kunci) → PERSETUJUAN GUSTI.
2. Tulis per blok + hitung program + G1–G8: verbal 6 · numerik 9 · kecukupan data 7 · analitis+optimasi 4.
3. Cek buta per blok (pembaca tanpa kunci) → perbaiki → cek buta ulang soal yang diubah.
4. Rakit 35 (gabung figural) + pemeriksa paket → PERSETUJUAN GUSTI.
5. Pembahasan 26 soal (gaya guru, 7 urutan, bebas istilah dapur).
6. Simpan. PDF/CAT ditunda (putusan 2026-10-29).
Setiap tahap: pelajaran ke `references/tiu.md` + memory + `cek.py`.

## Berkas rencana
- Data + program: `BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/tmp/paket1/`.
- Kartu ide + hasil cek buta: log ini.

## Temuan sampingan
- Engine Pilar 2 menulis figural "seri 2 · analogi 2"; `references/tiu.md` menulis "seri 3 · analogi 1". Figural Paket 1 dibuat menurut engine. Referensi skill perlu diselaraskan.

## Tahap 0 SELESAI 2026-10-30
- Folder kerja: `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/tmp/paket1/`.
- `pola_terpakai.txt`: 46 nama pola (bank CAT 30 + deret tabel 15 + Paket 41 no. 40). Foto IMG_3767 (6) dicek manual.
- Konteks kecukupan data terpakai (dihindari): susu sapi, usia Andi, harga pensil, rata-rata kelas, harga beli HP, n genap, bus, keran bak, urutan finis, harga daging naik-turun, rata-rata > 75, kupon sisa bagi 6, pramuka, lantai kelas, donat, x² > y².
- `cek_paket.mjs`: 35 butir, kunci 7 per huruf, tidak 3× berturut, komposisi, kerangka tidak kembar, KCK punya D dan E, pola kotak tidak terpakai. Hasil: cek paket OK.

## Tahap 1 — kartu ide 26 soal (data: `tmp/paket1/kartu_p1.json`), MENUNGGU PERSETUJUAN GUSTI
Urutan kunci 31–65: ADEBEACBEDAECBCAEADBCEDBCDAECBCDABD (A–E masing-masing 7). Level 26 soal: Standar 7 · HOTS 13 · HOTS+ 6.
Tanda ⚠:
- 40 pola pangkat dikurangi pangkatnya, sekeluarga dengan deret tabel 5–6 no. 8 (dipangkatkan); pembeda: dikurangi pangkat + angka pokok negatif.
- 36 bunglon "mengelabui pemangsa": fakta perlu diverifikasi (perubahan warna juga untuk komunikasi/suhu); ganti bila ragu.
- KCK tidak memakai bentuk tiga pernyataan (engine Pilar 4 menyebutnya); semua 7 bentuk dua pernyataan, templat opsi baku.
Berikut setelah disetujui: tahap 2 tulis per blok (mulai numerik + kotak, karena butuh script).

## Tahap 1 DISETUJUI 2026-10-30 (Gusti: "oke setuju")

## Tahap 2 tulis SELESAI 2026-10-30 — `tmp/paket1/paket_tiu_1.json` (26 soal, gabungan dari build_numerik.mjs, build_logika.mjs, soal_verbal.json)
- Semua lolos assert + `cek_paket.mjs` (kunci 7×5 dengan figural, tak 3× berturut).
- Perubahan dari kartu: kunci 32 D→C, 45 C→D, 55 C→D, 56 D→C (huruf jatuh dari urutan opsi angka); 38 pengecoh suku ke-29 → tanda −5n terbalik; 44 angka 10%→60% + 3.000 L; 53 syarat Dahlia dihapus (tidak perlu); 54 syarat Lina dihapus (jawaban tetap Lina di 2 susunan); 56 jadi ≥130 kotak, harga 380/595/800 ribu, optimum 135 kotak Rp2.195.000 (tepat 130 = Rp2.320.000); 36 bunglon → kura-kura; 33/36 panjang opsi disetarakan; 35 opsi cermin kunci diganti SUHU : TERMOMETER.
- Pelajaran: (1) pemeriksa "syarat perlu" menemukan 2 syarat pajangan di analitis yang lolos pandangan mata; (2) optimasi: harga per kotak termurah di paket terbesar membuat optimum = tepat jumlah minimum, jebakan "tepat N" mati → cari harga lewat program sampai optimum melampaui N; (3) kunci verbal terpanjang muncul 2/6 di tulisan pertama → cek panjang wajib sebelum cek buta.
Berikut: cek buta 31–45 dan 46–56 (berkas tanpa kunci di scratchpad sesi).

## Tahap 3 cek buta 1 SELESAI 2026-10-30
- 31–45: 15/15 = kunci; 46–56: 11/11 = kunci.
- Diperbaiki: 36 (dua opsi terbela → perintah "ciri tubuh dan tujuannya", B tanpa "berubah menjadi"), 40 (baris contoh pangkat sama → [3,2,7] [−3,3,−30] [−4,2,X]; semua rumus ≤3 operasi memberi 14), 39 (baris atas terbaca deret sendiri → 2×5, atas 7,10,14,20,X=28; bawah 3,4,6,8,Y=12), 52 (frasa "sebagian" → "boleh … atau tidak mengikuti keduanya"), 48 (kecepatan sama "di konveksi itu"), 31 (periode dua tahun tertulis), 32 (P1 "adalah peserta yang telah lulus").
- Kunci: 32 C→D, 40 D→C (cek_paket OK).
- Pelajaran → references/tiu.md "Pelajaran produksi Paket 1 TIU nonfigural".
- Cek buta 2 (7 soal diubah) berjalan.
- Cek buta 2 (7 soal): 7/7 = kunci; 32, 40, 48, 52 bersih. 39 masih cacat (opsi 29 terbela lewat deret atas; 28 dan 12 muncul 3× → kunci tertebak dari frekuensi lintas X-Y) → opsi baru: 28 dan −12 · 20 dan 8 · 20 dan 12 · 40 dan 16 · 28 dan 12 (kunci E), pemeriksa frekuensi lintas X-Y + larangan tebakan deret di opsi. 36 terlalu mudah (kunci memparafrase daun/air) → kunci jadi unta (ginjal, urin pekat, menghemat cairan). 31 C pengulangan klaim dinilai lemah, dibiarkan (pengecoh baku argumen).
- Pelajaran tambahan: frekuensi angka di opsi X-Y dihitung lintas posisi (opsi tertukar menggandakan angka kunci); kunci analogi kalimat jangan sama organ dengan soal.
- Cek buta 3 (36, 39) berjalan.
- Cek buta 3 (36, 39): 2/2 = kunci. 39 masih tertebak (kunci satu-satunya opsi berisi dua angka terbanyak + cermin tanda 28/−12) → opsi: 20 dan 12 · 28 dan 20 · 40 dan 16 · 20 dan 8 · 28 dan 12; pemeriksa skor frekuensi per opsi (kunci tidak boleh tertinggi tunggal) + larangan cermin tanda. 36: kantong semar (daun berubah bentuk) sejajar ciri kaktus → diganti bunga bangkai (bau, penyerbukan). Cek buta 4 berjalan.
- Cek buta 4 (36, 39): 2/2 = kunci, yakin tinggi, tanpa opsi kedua. Sisa: 39 penebak angka terbanyak menyempit ke A/E (20 muncul 3×) — dibiarkan, dilaporkan. 36 pelikan → "menyendok ikan dari air".
## Tahap 4 rakit SELESAI 2026-10-30 — MENUNGGU PERSETUJUAN GUSTI
- `tmp/paket1/paket_tiu_1.json` (26) + figural paket-1 (9) = 35; cek_paket OK; lembar baca `tmp/paket1/tinjau_paket1.md`.
- Kunci 31–65: A D E B E A C B E C A E C B D A E A D B C E D B D C | A E C B C D A B D.
- Berikut sesudah disetujui: tahap 5 pembahasan 26 soal.

## Tahap 4 DISETUJUI 2026-10-30 (Gusti: "lanjutkan" atas pertanyaan persetujuan paket)
## Tahap 5 pembahasan 26 soal — BERJALAN
- Data: `tmp/paket1/pembahasan_p1.json` (per nomor: ditanya, kalimat_kunci, cara_kilat, langkah, opsi_gugur, alasan_kunci, analogi, waspada). Preview soal + opsi diambil dari paket_tiu_1.json (satu sumber).
- Pemeriksa: `tmp/paket1/cek_pembahasan.mjs` (frasa terlarang, kode/istilah dapur, kata "jebakan", maka/karena itu ≤ 1, opsi gugur lengkap, angka kunci disebut).
- Label bagian 7 sementara "Yang sering membuat keliru" (aturan 2026-10-30: buku siswa tanpa kata "jebakan"; Putusan 3b butir 1 handbook masih antre). Label hanya di render, mudah diganti.
- Urutan kerja: 31–36 verbal → 37–45 numerik → 46–56 logika; cek pemeriksa tiap blok.
## Tahap 5 pembahasan SELESAI (draf) 2026-10-30 — MENUNGGU PERSETUJUAN GUSTI
- Data: `tmp/paket1/bahas_verbal.json` (31–36), `bahas_numerik.json` (37–45), `bahas_logika.json` (46–56). Lembar baca `tmp/paket1/tinjau_pembahasan_p1.md` (872 baris).
- `cek_pembahasan.mjs` → cek pembahasan OK (26 soal). Catatan: kalimat kunci 35, 38, 39, 40, 43 (tag <b>), 44 berupa uraian, bukan kutipan persis.
- Angka pembahasan analitis/optimasi dari program (scratchpad hitung_bahas.mjs): 53 tiga susunan sah, 54 dua susunan (Hasan–Lina selalu berhadapan), 55 empat urutan (U selalu terakhir), 56 termurah tunggal 2 Teratai + 1 Mawar = 135 kotak Rp2.195.000.
- Pelajaran → references/tiu.md butir 10–13.
- Berikut sesudah disetujui: tahap 6 simpan (gabung soal + pembahasan + figural). Ekspor PDF/CAT tetap ditunda.
## Tahap 5 DISETUJUI 2026-10-30 (Gusti: "oke lanjut")
## Tahap 6 simpan SELESAI 2026-10-30 — PAKET 1 TIU TUNTAS (ekspor PDF/CAT ditunda)
- Berkas: `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/paket/paket-1/paket_tiu_1.json` (35 butir, satu bentuk data) + `img/` (61 SVG figural disalin).
- Pembuat: `tmp/paket1/simpan_paket.mjs` (assert nomor 31–65, kunci 7 per huruf, tidak 3× berturut, bagian siswa tanpa kata "jebakan"/kode, semua gambar ada). Hasil: simpan OK, kunci ADEBEACBECAECBDAEADBCEDBDCAECBCDABD.
- Bentuk butir: no, keluarga, soal, tabel/pernyataan/syarat, perintah, jenis_opsi (teks/gambar), opsi, kunci, pembahasan {ditanya, kalimat_kunci, cara_kilat, langkah, opsi_gugur, alasan_kunci, analogi, waspada, gambar}, reviu {jebakan, kerangka, bukti} (edisi pengajar). Pembahasan figural (teks berlabel, termasuk "Jebakan:") dipecah ke bagian yang sama → label "jebakan" hilang dari bagian siswa.
## PDF Paket 1 TIU DIBUAT 2026-10-30 atas permintaan Gusti ("coba generate PDF nya"; putusan tunda ekspor dicabut untuk PDF paket ini, CAT tetap ditunda)
- Pembuat: `tmp/paket1/buat_pdf.mjs` (sumber `paket/paket-1/paket_tiu_1.json`) → `paket/paket-1/pdf/Paket_1_TIU_Soal.{html,pdf}` (18 hlm) + `Paket_1_TIU_Pembahasan.{html,pdf}` (40 hlm: kunci jawaban, lalu soal + pembahasan). Cetak: `NODE_PATH=~/.npm/_npx/7d92d9a2d2ccc630/node_modules node "<TKP>/tmp/gen_pdf.js" <html> <pdf>` (puppeteer-core + Chrome).
- Gaya mengikuti PDF paket TKP; label kelompok soal (Verbal · Analogi, Kecukupan Data, Figural, dst.) di kepala soal.
- Cek mata (pdftoppm): diperbaiki (1) tag <br>/<i> tercetak mentah (32, 34, 51); (2) minus tabel no. 40 tanda hubung; (3) Georgia berangka gaya lama → Charter + lining-nums; (4) soal terpisah dari opsi di lembar pembahasan → soal + opsi dikunci satu blok; (5) label merah gambar pembahasan figural 58/60 lebih lebar dari bidang SVG → terpotong; di PDF gambar ditanam langsung dengan overflow terlihat. Akar masalah (5) ada di generator figural, belum diperbaiki.
