# Pemeriksaan buta Tahap 5 Kelompok 4 — Bab 11–13 (kecukupan data, analitis, optimasi)

Sumber: `scripts/data/kck_b11_13_buta.json` (31 soal: 29 PG + 2 Latihan Bukti). Hanya file itu yang dibaca.
Analitis (Bab 12) dan optimasi (Bab 13) diperiksa dengan brute force Python di scratchpad. Untuk arah kiri/kanan dipakai satu konvensi yang konsisten (kanan = +1 searah putaran); kalau dicerminkan, jawabannya tetap sama.
Tugas B dikerjakan terpisah, hanya dari bentuk opsi.

## Tabel per soal

| id | jawaban A | keyakinan | tebakan B | sinyal B | catatan masalah |
|---|---|---|---|---|---|
| B11-P01 | C | tinggi | C | opsi KCK baku tidak memberi sinyal; ambil C (bias "bersama") | Bersih. (1) saja: laju Q tidak diketahui. (2) saja: tidak ada angka mutlak. Bersama: 1.200 + 600 = 1.800 lembar/jam, perlu 2,67 jam, jadi jawabannya "tidak" dan sudah pasti. |
| B11-C01 | C | tinggi | C | sama (baku) | Bersih. (1) saja: ada banyak pasangan faktor (x+y = 8, 12, 24, …). (2) saja tidak cukup. Bersama: 48/6 = 8. |
| B11-C02 | D | tinggi | C | sama (baku) | (1): 228 − 172 = 56. (2): 7 × 8 = 56. Hal kecil: kepala tabel tertulis "Regu", padahal teksnya "kelompok". Kolom lama kerja memang pengecoh, dan itu wajar. |
| B11-C03 | B | tinggi | C | sama (baku) | (1) tidak relevan (tim lain, pekerjaan lain). (2): 40% dalam 3 jam berarti sisa 60% butuh 4,5 jam, selesai pukul 14.30, jadi "tidak" dan sudah pasti. Bersih. |
| B11-C04 | E | tinggi | C | sama (baku) | Kedua pernyataan hanya memuat perbandingan yang sama (3 : 2 = 1,5). Tidak ada angka mutlak. Bersih. |
| B11-C05 | A | tinggi | C | sama (baku) | (1): 3/10 = 30%. (2): total tidak diketahui. Bersih. |
| B11-C06 | C | tinggi | E | E = kombinasi elemen terbanyak | (1)+(3): R = 80 − 45 = 35. (2)+(3) hanya memberi P. (1)+(2) hanya memberi R − P. Bersih. |
| B11-C07 | D | tinggi | D | D paling beda/terpanjang ("tidak dapat ditentukan") | P − Q = (x−3)(x−8): nol saat x = 3, negatif saat x = 4…7, jadi bisa sama dan bisa lebih kecil. Kunci benar, tetapi bentuknya bocor: hanya D yang berupa kalimat. Soal ini memakai 4 opsi, berbeda dari soal lain. |
| B11-L01 | A | tinggi | C | sama (baku) | 5p + 3h = 88 punya 6 solusi. (1): 11p = 88, p = 8. (2): data hari Sabtu tidak relevan. Bersih. |
| B11-L02 | B | tinggi | A | urutan opsi diacak; tebak opsi pertama | Opsi diacak, B = "bersama cukup". 5k/(3k+6) = 5/4 → k = 6 → remaja 18. Setiap pernyataan saja tidak cukup. Bersih. |
| B11-L03 | B | tinggi | C | sama (baku) | (2): laju maksimum 4 × 140 = 560 < 600, jadi "tidak" dan sudah pasti. (1): dua troli lain tidak diketahui. Bersih. |
| B11-L04 | D | tinggi | C | sama (baku) | (1): 0,35 × 480 = 168. (2): 120 × 1,4 = 168. Bersih. |
| B11-L05 | E | tinggi | C | sama (baku) | (2) setara dengan a + b = 12 (karena bilangan positif). Sama dengan (1), dan a tetap tidak tunggal. Bersih. |
| B12-P01 | E | tinggi | C | C opsi terpanjang | Prita < Laras < Maya < Oki, dan Nanda ≠ 1, jadi Prita pasti di lantai 1. Ada 3 susunan sah: A gugur (Laras bisa di lantai 3), B gugur (Oki bisa di lantai 4), C gugur (Nanda bisa di lantai 2), D selalu salah (kebalikan syarat). Bersih. |
| B12-C01 | C | tinggi | C | opsi tengah; Bunga-Erlan berdampingan di ujung | A: Bunga tidak tepat sebelum Erlan. B: Dewi-Arif berurutan, padahal satu kelas. D: Arif sebelum Dewi. E: penampil pertama dari kelas XI. Setiap pengecoh melanggar tepat satu syarat. Bagus. |
| B12-C02 | A | tinggi | A | pasangan cermin A/B (kanan/kiri Andi); D mengulang kata "berhadapan" | Brute force: 2 susunan, A benar di keduanya. B benar di 1 (mungkin, tidak pasti). E benar di 1. C dan D benar di 0. Kunci tunggal. Bersih. |
| B12-C03 | D | tinggi | D | D satu-satunya opsi yang bukan tentang F (pencilan) | 10 urutan sah. D muncul di 0 urutan karena D tepat setelah B, dan B sebelum C. Opsi lain mungkin terjadi: A 3, B 2, C 1, E 2. Bentuknya bocor: tiga opsi tentang F, dan kunci jadi pencilan. |
| B12-C04 | B | tinggi | B | Cirebon satu-satunya kota yang tidak disebut di syarat | 11 susunan sah. Hanya B yang mungkin, A/C/D/E semuanya 0. Kunci benar, tetapi bentuknya bocor: kata "Cirebon" tidak muncul di syarat, sedangkan semua pengecoh memakai kata dari syarat. |
| B12-L01 | B | tinggi | B | opsi tengah, diawali Mira | A: Galih-Hana tidak berdampingan. C: Irfan tampil pertama. D: Kirana sebelum Jihan. E: Lutfi bukan di urutan ketiga. Bersih. |
| B12-L02 | A | tinggi | B | opsi diacak; pilih opsi kedua | Opsi diacak, A = "bersama cukup". (1) saja: kanan Raka bisa O/N/T/S. (2) saja: bisa O/N/P. Bersama: Putri = O+1, Raka = O+2, kanan Raka = Nadia. Bersih. |
| B12-L03 | A | tinggi | A | pasangan cermin A/D (Tito Selasa/Senin); D dan E membalik syarat | Ada 2 jadwal: Senin Umar-Vina, Selasa Tito + (Wulan atau Yoga), Rabu Zahra + yang lain. A pasti. B dan C hanya mungkin. D dan E mustahil. Bersih. Catatan: dua pengecoh (D, E) langsung membalik syarat, jadi mudah dicoret. |
| B12-L04 | E | tinggi | E | pasangan B/E "tepat di antara Dara dan Elang" | 2 susunan sah. E muncul di 0. B muncul di 2 (malah pasti). A, C, D muncul di 1. Kunci tunggal. Bersih. |
| B13-P01 | D | tinggi | C | C kombinasi elemen terbanyak | D = Rp207.000, minimum global (brute force). A lebih murah (Rp201.300), tetapi hanya 87 botol, kurang dari 90. Jebakan bagus. B, C, E lebih mahal. Bersih. |
| B13-C01 | B | tinggi | B | B di tengah klaster A–C | Minimum dengan stok dan batas kelebihan: 2×8 + 4×12 = 64 buku, Rp337.600. A (Rp332.800 = 8×8) melanggar stok. C = Rp338.000 (4×5 + 4×8 + 1×12), sah tetapi lebih mahal. Bersih. |
| B13-C02 | D | tinggi | C | angka tengah | Maksimum 31 pot (2×3 + 5×5 = Rp316.000). Tidak ada kombinasi 32 dalam anggaran. Bersih. |
| B13-C03 | A | tinggi | A | B "terbesar" absolut; C/E memakai "karena" (sebab tak didukung) | Melati +25%, Kenari +20%, Seroja −10%. D salah (petugas terbanyak = Seroja, pengunjungnya paling sedikit). E salah (total 790 → 915). Bersih. Bentuknya agak bocor: dua opsi "karena" mudah dicoret. |
| B13-L01 | C | sedang | C | C satu-satunya opsi yang memakai kosakata di luar tabel ("perempuan") | **Ambigu.** D bisa dipastikan *salah* (Listrik 75%, terendah). Kalau "tidak dapat dipastikan kebenarannya" dibaca "tidak bisa dipastikan benar", D juga lolos. Saran: "tidak dapat ditentukan benar atau salahnya dari tabel". Kunci C juga bocor lewat kata "perempuan". |
| B13-L02 | E | tinggi | C | angka tengah | Minimum global: 4×10 kg = Rp360.000 + Rp15.000 = Rp375.000. Keempat pengecoh lebih murah daripada minimum sejati, jadi tidak ada kombinasi sahnya. Bentuknya berisiko: kunci = angka terbesar. Siswa yang paham pola "semua opsi lain mustahil" bisa menebak opsi terbesar. Saran: sisipkan satu opsi sah yang lebih mahal. |
| B13-L03 | E | tinggi | E | X+Y (A, B, E) beririsan dengan total 5 paket (A, D, E) → A/E; pilih E | E = Rp194.000 (9 buku, 11 pulpen), minimum global. A, B, C kurang buku/pulpen (padahal lebih murah). D sah, Rp202.000. Bersih. |

## Latihan Bukti

**B11-B01** (3 : 4, banyak permen mint). Tugasnya jelas dan bisa dikerjakan. Contoh jawaban sah: 3 jahe + 4 mint (mint = 4), dan 6 jahe + 8 mint (mint = 8). Keduanya memenuhi 3 : 4, tetapi jumlah mintnya beda, jadi pernyataan itu tidak cukup.

**B11-B02** (Sigit 50% lebih banyak daripada Rani). Tugasnya jelas. Contoh jawaban sah: misalkan suara Rani = r, maka suara Sigit = 1,5r dan totalnya 2,5r. Bagian Rani = r/2,5r = 40%. Nilai r saling meniadakan, jadi hasilnya sama untuk berapa pun banyak siswanya. Catatan: kalimat "tanpa mencoba contoh angka" jelas. Memakai huruf seperti r sebaiknya disebut boleh, supaya siswa tidak ragu.

## Rekap

- Jawaban A: 29/29 punya kunci tunggal yang terbukti (analitis/optimasi lewat brute force). Satu soal ambigu kata tanyanya (B13-L01).
- Tebakan B cocok dengan jawaban A di 14/29: B11 3/13 (P01, C01, C07), B12 7/9 (C01, C02, C03, C04, L01, L03, L04), B13 4/7 (C01, C03, L01, L03). Opsi KCK baku tidak membocorkan apa pun (tebakan seragam C hanya kena 2/11). Kebocoran nyata ada di soal analitis/optimasi tertentu: B12-C03 (pencilan), B12-C04 (Cirebon), B13-L01 ("perempuan"), B11-C07 (satu-satunya kalimat), B13-L02 (kunci = angka ekstrem).
