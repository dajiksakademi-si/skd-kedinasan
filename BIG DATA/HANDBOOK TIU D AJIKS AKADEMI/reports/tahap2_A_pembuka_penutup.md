# Tahap 2 · Bagian A — Rencana Contoh dan Latihan: Bab 1, Bab 2, Bab 19, Lampiran

Handbook TIU D'Ajiks Akademi · 2026-10-30 · subagen A
Status: spesifikasi saja. Laporan ini tidak memuat soal jadi, angka final soal, opsi A–E, atau kunci. Putusan Gusti 1–11 (log 2026-10-30) sudah diterapkan.
Dasar: laporan T1-A (Tabel 2A–2C), engine TIU v0.4.2 (Pilar 3: 47 kode, K1–K7; Pilar 6: ±50,5 menit; FORMAT PEMBAHASAN 7 langkah), log TO Paket 1 TIU, `tiu-peta-paket.ts`.

---

## 0. Patokan yang berlaku untuk semua tabel

- **Target waktu per soal (detik), diturunkan dari Tabel 2C:**
  - verbal 60;
  - hitung cepat 30;
  - numerik lain 75;
  - kecukupan data 90;
  - analitis 120;
  - optimasi 120;
  - figural 60.
- **Arti target di tiap slot:**
  - Pada slot Contoh, target adalah waktu untuk mencoba sendiri sebelum membaca pembahasan.
  - Pertanyaan pembuka berbentuk isian tidak diberi target.
- **Beda dari TO:**
  - Setiap butir punya kerangka satu baris (G8: susunan data + isi tiap pernyataan atau premis + jenis pertanyaan), dicatat di registri `scripts/data/kerangka_terpakai.json`.
  - `cek_handbook.mjs` menolak kerangka yang sama dengan:
    - 26 butir nonfigural TO Paket 1 (`CORE ENGINE …/paket/paket-1/paket_tiu_1.json`, field `reviu.kerangka`);
    - butir handbook lain.
  - TO Paket 2–3 nonfigural **belum dibuat**. Siapa pun yang membuat belakangan wajib memeriksa registri ini.
- **Figural:** nama bentuk tidak boleh muncul di PETA Paket 1–3. Aturan "tidak dipakai ulang antarpaket" di `cekPeta` sudah ada. Peta handbook cukup ditambahkan agar ikut diperiksa.
- **Kunci:**
  - setiap bab seimbang A–E (selisih paling banyak 1);
  - huruf yang sama paling banyak 2 kali berturut-turut.
- **Bentuk data butir:** memakai ulang bentuk butir TO Paket 1:
  - `soal`, `opsi`, `kunci`, `pembahasan{…}`, `reviu{jebakan, kerangka, bukti}`;
  - ditambah `bab`, `slot`, `level`, `target_detik`.
- **Soal pilihan ganda Bab 2 dan 19:** dibuat dengan script rumpun yang sama dengan Bab 3–13, dengan field `bab: 2` atau `bab: 19`. Nama script rumpun mengikuti laporan T2 B–D; usulan dari sini: `numerik.mjs`, `logika.mjs` (silogisme, KCK, analitis, optimasi dengan `dunia()`), `verbal.json` + pemeriksa panjang opsi.

---

## 1. Rencana slot per bab

### Bab 1 — Gambaran Umum Tes Inteligensi Umum
**Keputusan: tanpa soal pilihan ganda dan tanpa latihan soal.**
- Bab ini memuat fakta resmi, susunan soal, dan waktu. Soal TIU apa pun di sini hanya mendahului Bab 3–18.
- Fungsi tes awal dipindah ke latihan Bab 2 (10 soal lintas jenis, ±12 menit). Hasilnya dicatat di lembar Peta Diri Bab 1.
- Biaya yang dihemat: 10 soal dan ±10 halaman pembahasan. Butir ini perlu disetujui Gusti (Putusan T2-1).

| Slot | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber pembuat | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| Pembuka | isian, bukan pilihan ganda | "Berapa jawaban benar paling sedikit untuk memenuhi ambang TIU?" + varian afirmasi; angka dari Diktum KELIMA a, KEDELAPAN b, KESEPULUH | kesalahan strategi, tanpa kode Pilar 3: lupa membagi bobot 5; mengira jawaban salah mengurangi nilai | `pembuka_penutup.mjs` (angka Kepmen; assert ambang ÷ 5 bulat) | — | bukan soal TIU |
| Contoh 1 | lembar rencana waktu yang sudah terisi | Tabel 2C dalam bentuk lembar: blok, nomor, detik/soal, titik periksa (bagian 2) | menghabiskan cadangan di blok awal | idem | — | — |
| Contoh 2 | dua kasus titik periksa | "Saat nomor 45 selesai, jam menunjukkan …": satu kasus tepat waktu, satu kasus tertinggal; siswa memilih lanjut biasa atau mulai menandai lebih awal | terpaku di satu soal; mengosongkan soal | idem (selisih dari titik periksa dihitung script) | — | — |
| Latihan 1 | lembar isian Rencana Waktu Pribadi | siswa menyalin titik periksa ke skala jam yang ia pakai | — | lembar kosong | — | — |
| Latihan 2 | lembar isian Peta Diri | waktu dan jumlah benar per blok dari latihan Bab 2 dan dari setiap tryout; kolom kalimat guru yang berulang (dipakai lagi di Bab 19) | — | lembar kosong | — | — |

### Bab 2 — Prinsip Dasar Penyelesaian Soal TIU
**Isi bab:**
- empat prinsip;
- lima konsep inti: contoh penyangkal, akibat klaim, besaran tetap, pemeriksaan semua kemungkinan, transformasi gambar + pencacahan objek;
- delapan kebiasaan (G1–G8 dalam bahasa siswa);
- tujuh nama kelompok kekeliruan.

**Rancangan soal:**
- Setiap Contoh memperagakan satu prinsip dan satu konsep inti.
- Latihan 10 soal mengikuti bobot hari H (V2 · N3 · KCK2 · ANA1 · FIG2; optimasi dilepas karena hanya 1/35) dan berfungsi sebagai tes awal.
- Kunci untuk 15 soal pilihan ganda: 3 per huruf.

| Slot | Jenis/bentuk (level) | Kerangka umum | Kesalahan dipasang | Sumber pembuat | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| Pembuka | isian, bukan format TIU; contoh penyangkal | Titik pada keliling lingkaran, semua pasangan dihubungkan tali busur. Banyak daerah untuk 1–5 titik tampak berlipat dua. Siswa menebak hasil 6 titik, lalu menghitung pada gambar. | J-TIGA (K2) | `pembuka_penutup.mjs`: rumus kombinasi + assert; titik digambar tidak beraturan, script memastikan tidak ada tiga tali busur bertemu di satu titik (segi enam beraturan memberi hasil lain) | — | bukan soal TIU (Putusan T2-3) |
| Contoh 1 | SIL "pasti benar" (HOTS); prinsip 3 | Dua premis kategoris ("semua" + "sebagian"), tanpa rantai dan tanpa premis negatif. Satu opsi benar hanya di sebagian gambar himpunan. Pembahasan menggambar satu dunia bantahan untuk setiap pengecoh. | J-MUNGKIN, J-SEBAGIAN, J-BALIK, J-AKAL | `logika.mjs` `dunia()` silogisme: semua isi/kosong 7 daerah tiga himpunan; kunci benar di semua dunia; setiap pengecoh punya ≥ 1 dunia bantahan (disimpan untuk gambar) | 60 | TO 32 (satu premis negatif), 34 (rantai jika-maka); juga beda dari Bab 4 Contoh (rantai, premis berlawanan kenyataan) |
| Contoh 2 | CRT kerja tetap (HOTS); prinsip 1, besaran tetap | Satu pekerjaan; banyak pekerja berubah di tengah jalan. Cara cepat "orang-hari" disertai alasan: kerja = orang × hari, besarnya tetap. | J-SEARAH, J-LANGKAH (menjawab sisa hari), J-LAJU, J-PENGALIH | `numerik.mjs` (pecahan eksak; assert jalur benar bulat) | 75 | TO 45 (keran + pengosong), 48 (KCK ya/tidak); konteks bukan konveksi/keran; dicek terhadap Bab 10 |
| Contoh 3 | HIT perkiraan (Standar); prinsip 4 | Persen × pecahan × bilangan 3–4 angka. Batas bawah–atas mencoret tiga opsi; dua opsi berdekatan dipisah satu digit akhir. | J-BULAT, J-NOL, J-LANGKAH, J-SEDERHANA | `numerik.mjs` | 30 | TO 37 (akar + desimal) |
| Contoh 4 | KCK dua pernyataan (HOTS); prinsip 2, satu ide dengan Contoh 1 | Nilai sebuah bilangan. (1) memberi dua kemungkinan (kuadrat atau urutan); (2) memberi syarat tanda atau batas; gabungannya menyisakan satu. Opsi memakai templat Pilar 5. | J-TANDA (lupa nilai negatif), J-BERHENTI, J-ASUMSI, J-PERSAMAAN | `logika.mjs` `dunia()` KCK (setiap pernyataan sendiri dan gabungan, di rentang bilangan) | 90 | TO 46–52 tanpa bentuk kuadrat/tanda; Contoh terbimbing 1 engine tidak dipakai (kerangkanya = TO 48) |
| Contoh 5 | FIG analogi dua objek, FIG-ANA-OBJ (HOTS); transformasi + pencacahan | Satu objek diputar, satu objek dibalik warnanya. Tiga pengecoh benar hanya di satu objek. Posisi "?" berbeda dari TO. | JF-SATU, JF-WARNA, JF-PUTCER, JF-ARAH | generator `npm run gen:tiu`, spesifikasi di `src/tiu-handbook.ts` (Putusan 10c) | 60 | keluarga bentuk di luar peta Paket 1–3 dan Bab 16 |
| Latihan 1 | ANL pasangan kata (Standar) | Relasi yang tidak dipakai Bab 3 (dipilih setelah laporan B); kunci tidak memakai kata kerja soal | J-RELASI, J-BALIK, J-KATA | `verbal.json` + pemeriksa panjang dan kata sama | 60 | TO 35 (alat ukur : besaran) |
| Latihan 2 | ARG memperlemah (HOTS); akibat klaim | Klaim umum tentang satu kelompok. Kunci: akibat yang semestinya muncul bila klaim benar ternyata tidak muncul. | J-BALIK (memilih pemerkuat), J-ULANG, J-KATA, J-AKAL | `verbal.json` + pemeriksa | 60 | TO 31, 33 (kebijakan/program sebelum–sesudah) |
| Latihan 3 | HIT perkiraan (Standar) | Bilangan 4 angka dibagi desimal; opsi berjarak | J-BULAT, J-NOL, J-URUTAN, J-LANGKAH | `numerik.mjs` | 30 | TO 37; beda bentuk dari Contoh 3 |
| Latihan 4 | DRT deret berselang (HOTS) | Dua aturan bergantian dalam satu deret (bukan tabel nomor); tiga suku awal juga cocok dengan satu aturan tunggal yang salah | J-TIGA, J-RATA, J-NOMOR, J-TANDA | `numerik.mjs` + cek aturan lain ≤ 3 operasi | 75 | TO 38 (tabel suku ke-n), 39–40 (kotak) |
| Latihan 5 | CRT untung-rugi (Standar) | Untung atau rugi dalam persen terhadap harga beli; satu data tidak diperlukan | J-BASIS, J-LANGKAH, J-PENGALIH, J-NOL | `numerik.mjs` | 75 | TO 44 (persen kapasitas) |
| Latihan 6 | KCK persen, ya/tidak (HOTS) | "Melampaui batas?" (1) persen tanpa basis; (2) basis + data lain; gabungan bisa berjawab "pasti tidak" | J-TENTU, J-BASIS (varian KCK), J-BERHENTI, J-PENGALIH | `logika.mjs` `dunia()` | 90 | TO 50 (persen dari basis yang ditanya, bukan ya/tidak) |
| Latihan 7 | KCK nilai dari tabel (Standar) | Tabel 3–4 baris dengan satu kolom pengalih; satu pernyataan hanya mengulang isi soal | J-PENGALIH, J-ULANG, J-BERHENTI, J-ASUMSI | idem | 90 | TO 46–52 tanpa tabel |
| Latihan 8 | ANA urutan satu baris (HOTS) | 5 unsur; syarat "tepat setelah" dan "tidak bersebelahan"; perintah "TIDAK mungkin"; setiap syarat menggugurkan ≥ 1 opsi | J-SYARAT, J-MUNGKIN, J-BALIK, J-NOMOR | `logika.mjs` (semua permutasi + uji syarat perlu) | 120 | TO 53 (5 hari + topik), 55 (parsial "pasti benar") |
| Latihan 9 | FIG seri selang tiga, FIG-SERI-P3 (Standar) | Perubahan berlanjut, tidak kembali ke awal | JF-AWAL, J-TIGA, JF-OBJEK, J-NOMOR | generator, `tiu-handbook.ts` | 60 | keluarga di luar peta Paket 1–3 |
| Latihan 10 | FIG gambar berbeda, FIG-BEDA-HITUNG atau -TUMPUK (HOTS) | Empat opsi patuh dua ciri; satu opsi tampak paling lain sekilas, padahal patuh | J-PENGALIH, JF-SATU, JF-HITUNG | idem | 60 | idem |

Total latihan: 720 detik = 12:00. Jumlah ini dicetak di kepala latihan sebagai "Tes Awal".

### Bab 19 — Kekeliruan yang Sering Terjadi dan Strategi Mengerjakan
**Isi bab:**
- tujuh kelompok K1–K7 dalam kalimat guru, tanpa kata "jebakan" dan tanpa kode;
- strategi hari H: lompat, tandai, titik periksa, tidak ada soal kosong;
- cara membaca hasil tryout sendiri: kalimat guru yang muncul ≥ 3 kali → buka bab rujukannya;
- peta hari H satu halaman.

**Latihan B:**
- Soal disusun menurut urutan blok hari H. Kelompoknya baru dibuka di pembahasan, supaya siswa tidak menebak dari judul.
- Kunci 14 soal: 3-3-3-3-2.

| Slot | Jenis/bentuk (level) | Kerangka umum | Kesalahan dipasang | Sumber pembuat | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| Pembuka | CRT dua perubahan persen (HOTS) | Dua perubahan persen berturut-turut + satu data pengalih. Empat opsi salah dari empat kelompok berbeda. Tugas tambahan: tebak langkah yang melahirkan tiap opsi. | J-PENGALIH (K1), J-LANGKAH (K2), J-BASIS (K3), J-NOL (K6) | `numerik.mjs` (`opsi[].jebakan` wajib terisi) | 75 | TO 44; beda dari Bab 2 Latihan 5 dan subbagian diskon Bab 10 (registri) |
| Contoh K1–K7 | 7 kartu kelompok, tanpa soal baru | Setiap kartu: nama kelompok, kalimat guru anggotanya, uji satu kalimat, dua rujukan soal handbook dari rumpun berbeda, bab | semua kode kelompok itu | `kode_kelompok.mjs` + rujukan silang data butir | — | — |
| Latihan A (14) | menamai kekeliruan, 2 per kelompok dari rumpun berbeda | Soal Bab 3–18 dicetak ulang ringkas dengan satu opsi salah disorot; siswa menulis kalimat guru + bab rujukan | sesuai kelompok | pakai ulang data butir (`id` rujukan), tanpa soal baru | 30/butir (7:00) | — |
| B1 | SIL/EKV jika-maka (HOTS) — K3 | Kesetaraan atau kesimpulan dari jika-maka; pengecoh terkuat membaca arah terbalik | J-BALIK (utama), J-INGKAR, J-MUNGKIN | `logika.mjs` (tabel kebenaran) | 60 | TO 34 (modus tollens berantai) |
| B2 | ANL hubungan kalimat (HOTS) — K7 | Pola kalimat sama, isi hubungan beda | J-RELASI (utama), J-KATA, J-BALIK | `verbal.json` | 60 | TO 36 |
| B3 | ARG memperkuat (HOTS) — K7 | Klaim sebab; pengecoh terkuat bertopik sama, tetapi tidak menyentuh hubungan bukti–klaim | J-KATA/J-ULANG (utama), J-BALIK, J-AKAL | `verbal.json` | 60 | TO 31 |
| B4 | HIT hitung cepat (Standar) — K6 | Perkalian/pembagian dengan desimal; opsi berbeda satu nol | J-NOL/J-BULAT (utama), J-URUTAN, J-SEDERHANA | `numerik.mjs` | 30 | TO 37 |
| B5 | SUK tabel (HOTS) — K5 | Rumus dengan bilangan tetap yang tidak nol; titik ≥ parameter + 1; nomor meloncat | J-KONST (utama), J-RATA, J-NOMOR | `numerik.mjs` + cek aturan lain | 75 | TO 38 (kuadrat 5 titik); bentuk rumus dicek terhadap Bab 8 |
| B6 | PAS desimal/pecahan (HOTS) — K4 | "Pasangan yang kedua ruasnya bernilai sama"; pengecoh membandingkan antarpasangan | J-PERINTAH (utama), J-SEDERHANA, J-SISI | `numerik.mjs` | 75 | TO 41–43 (bilangan bulat; campuran TIDAK) |
| B7 | CRT jarak-kecepatan (HOTS) — K6 | Satuan campur (menit–jam atau m–km), dua tahap perjalanan | J-SATUAN/J-LAJU (utama), J-LANGKAH | `numerik.mjs` | 75 | TO 45 |
| B8 | KCK ya/tidak dengan batas (HOTS+) — K4 | Jawaban gabungan "pasti tidak"; satu pernyataan memberi angka tepat di batas | J-TENTU (utama), J-BATAS, J-BERHENTI | `logika.mjs` `dunia()` | 90 | TO 47, 48 |
| B9 | KCK nilai dari cerita (HOTS) — K1 | Jumlah awal hanya tertulis di satu pernyataan; pernyataan lain menggoda untuk diisi sendiri | J-ASUMSI (utama), J-PENGALIH, J-BERHENTI | idem | 90 | TO 46–52 (registri) |
| B10 | ANA pilih susunan (HOTS) — K2 | Urutan + atribut; setiap syarat menggugurkan ≥ 1 opsi; pengecoh terkuat melanggar satu syarat "tidak" | J-SYARAT (utama), J-MUNGKIN, J-BALIK | `logika.mjs` | 120 | TO 53–55 |
| B11 | OPT termurah (HOTS+) — K1 | Tabel 4–5 paket dengan satu kolom yang tidak memengaruhi biaya; optimum global di luar paket terbesar | J-PENGALIH (utama), J-HEMAT, J-BATAS | `logika.mjs` (semua kombinasi) | 120 | TO 56 |
| B12 | FIG seri, FIG-SERI-KUADRAN (HOTS) — K5 | Dua kelompok bergerak; "?" tidak di ujung | JF-AWAL (utama), JF-OBJEK, J-NOMOR | generator, `tiu-handbook.ts` | 60 | keluarga di luar peta |
| B13 | FIG analogi, FIG-ANA-UBAH (HOTS) — K3 | Perubahan + hitung; satu objek dicermin | JF-PUTCER/JF-SUMBU (utama), JF-HITUNG, JF-TUKAR | idem | 60 | idem |
| B14 | FIG matriks, FIG-MTX-PUTAR (HOTS+) — K2 | Dua langkah gerak + titik pojok; pengecoh benar di bentuk utama, salah di rincian | JF-SATU (utama), J-LANGKAH, JF-AWAL | idem | 60 | idem |
| Peta hari H | 1 halaman | Blok, nomor, detik/soal, titik periksa (bagian 2), dua kekeliruan yang dipasang engine per blok (kalimat guru dari kolom keluarga Pilar 3), kebiasaan uji | — | `pembuka_penutup.mjs` + `kode_kelompok.mjs` | — | kolom "kekeliruan tersering" tidak diisi tanpa data siswa |

Total Latihan B: 1.035 detik = 17:15 (verbal 3 · numerik 4 · KCK 2 · ANA 1 · OPT 1 · FIG 3).

---

## 2. Rencana Bab 1: patokan ±50,5 menit

**Asal angka.**
- 100 menit SKD (Diktum KETIGA, hlm. 5) − 27 menit (patokan Handbook TWK) − 22,5 menit (patokan Handbook TKP) = 50,5 menit untuk 35 soal, rata-rata ±86 detik per soal.
- Perkiraan waktu per blok di bawah adalah **usulan D'Ajiks, belum dikalibrasi** dengan catatan waktu tryout siswa.

| Blok | Nomor | Soal | Detik/soal | Lama blok | Titik periksa (menit sejak mulai TIU) | Sisa waktu di layar* |
|---|---|---|---|---|---|---|
| Verbal | 31–36 | 6 | 60 | 6:00 | 6:00 | 67:00 |
| Hitung cepat | 37 | 1 | 30 | 0:30 | — | — |
| Numerik | 38–45 | 8 | 75 | 10:00 | 16:30 | 56:30 |
| Kecukupan data | 46–52 | 7 | 90 | 10:30 | 27:00 | 46:00 |
| Penalaran analitis | 53–55 | 3 | 120 | 6:00 | 33:00 | 40:00 |
| Optimasi | 56 | 1 | 120 | 2:00 | 35:00 | 38:00 |
| Figural | 57–65 | 9 | 60 | 9:00 | 44:00 | 29:00 |
| Cadangan (soal bertanda) | — | — | — | 6:30 | 50:30 | 22:30 (TKP mulai) |

\* Kolom ini berlaku bila siswa mengerjakan TWK → TIU → TKP dan TWK selesai pada menit ke-27. Bentuk jam CAT (hitung mundur) dan kebebasan urutan subtes **belum diverifikasi** (L2).

Semua angka di tabel dihitung `pembuka_penutup.mjs`, dengan assert:
- jumlah lama blok = 50:30;
- 35 soal;
- sisa waktu = 100 − (27 + titik).

**Aturan pakai (usulan):**
1. Satu soal sudah melewati 2 × patokan bloknya: pilih jawaban sementara, tandai, lanjutkan.
2. Di titik periksa, tertinggal lebih dari 2 menit: soal berikutnya yang melewati patokan langsung ditandai, tanpa menunggu 2 ×.
3. Cadangan dipakai untuk soal bertanda. Dahulukan soal yang cek baliknya cepat.
4. Menit terakhir dipakai untuk memastikan tidak ada soal kosong. Alasannya: jawaban salah dan kosong sama-sama bernilai 0 (Diktum KELIMA a), sedangkan tebakan di antara 5 opsi bernilai rata-rata 1 poin.

**Kisi resmi (Diktum KEDUA b, hlm. 4–5) → blok tryout rujukan → bab (tafsiran D'Ajiks, belum diverifikasi).**
| Kisi resmi | Blok (nomor) | Bab |
|---|---|---|
| Verbal: analogi | analogi kata + hubungan kalimat (35–36) | 3 |
| Verbal: silogisme | 32, 34 | 4 |
| Verbal: analitis | memperkuat/memperlemah (31, 33); penalaran analitis (53–55) | 5, 12 |
| Numerik: berhitung | 37; pasangan operasi (41–43) | 6, 7 |
| Numerik: deret angka | 38–40 | 8, 9 |
| Numerik: perbandingan kuantitatif | tidak tampak sebagai blok | subbagian Bab 6 (Putusan 7); bentuk berpeubah → Bab 11 |
| Numerik: soal cerita | 44–45; optimasi 56 | 10, 13 |
| Figural: serial | seri (57–58); matriks (63–65) | 15, 18 |
| Figural: analogi | 59–60 | 16 |
| Figural: ketidaksamaan | 61–62 | 17 |
| (tidak disebut di kisi) | kecukupan data (46–52); dasar semua figural | 11; 14 |

**Catatan wajib di bab (kotak "Catatan"):**
- Susunan nomor adalah **rekonstruksi dari satu tryout rujukan 2026**, dengan keyakinan sedang. Komposisi dari dua bimbel tidak sama (figural 0 vs 7–9).
- Kisi resmi tidak menyebut kecukupan data, optimasi, memperkuat/memperlemah, atau matriks.
- Nama tryout tidak disebut di edisi siswa; nama itu hanya ada di L1/L6.

**Subbagian Bab 1:**
1. Angka resmi dengan diktum dan halaman (Tabel 2A T1).
2. Kisi resmi → blok → bab.
3. Susunan 35 soal + catatan keyakinan.
4. Hitungan ambang + alasan "menebak lebih baik daripada mengosongkan".
5. Patokan waktu dan titik periksa.
6. Kebiasaan melompat.
7. Cara memakai buku.
8. Ringkasan satu halaman.
9. Dua lembar isian.

---

## 3. Rencana lampiran

### 3.1 Susunan
- **Edisi siswa** (judul: "Lampiran: Pembahasan Latihan dan Tabel Rujukan"):
  - **A.** Kunci per bab, dengan tautan ke pembahasan.
  - **B.** Pembahasan latihan Bab 2–19 dalam 7 langkah, urut bab, dengan tombol "Kembali ke soal" (pola `HANDBOOK TWK …/src/80_kunci_latihan.html` + `build.py`).
  - **C.** Jawaban Latihan A Bab 19: kalimat guru + bab rujukan, 1–2 kalimat per butir.
  - **D.** Tabel rujukan T1–T10.
- **Contoh Soal dan Pembahasan** dibahas di dalam bab dengan komponen yang sama. Lampiran hanya memuat latihan (preseden TWK).
- **Edisi pengajar:** A–D, ditambah kode per opsi, kerangka, target, dan level di setiap pembahasan, lalu L1–L6.

### 3.2 Format pembahasan 7 langkah ↔ data ↔ pemeriksa
| Langkah (label di buku) | Field data | Diperiksa `cek_handbook.mjs` |
|---|---|---|
| 1 Pratinjau soal + opsi | `soal`, `opsi` (figural: gambar generator) | ada; figural wajib bergambar |
| 2 Yang sebenarnya ditanya | `ditanya` + `kalimat_kunci` (dicetak "kalimat penentu") | kutipan muncul di teks soal; bila berasal dari tabel/gambar, ditandai |
| 3 Langkah / cara cepat | `taksiran`, `cara_kilat`, `langkah` (cara paham), `kenapa_benar` | keempatnya terisi |
| 4 Kenapa opsi lain gugur | `opsi_gugur{huruf}` + `reviu.jebakan{huruf: kode}` | empat opsi; kalimat guru kode itu muncul; edisi siswa tanpa kode dan tanpa kata "jebakan" |
| 5 Kunci + alasan satu kalimat | `alasan_kunci` + `cek_balik` | huruf = kunci; nilai kunci disebut |
| 6 Analogi sehari-hari | `analogi` | ada |
| 7 Kekeliruan yang Mungkin Terjadi | `waspada` | label persis |

**Gaya diperiksa mesin** (memakai ulang `tmp/paket1/cek_pembahasan.mjs`):
- frasa terlarang tidak muncul;
- "maka"/"karena itu" paling banyak 1×;
- sapaan "kamu";
- tanpa emoji dan tanpa istilah dapur (C-5).

### 3.3 Tabel rujukan (angka dihasilkan `tabel_rujukan.mjs`, tiap baris di-assert)
| Tabel | Isi | Baris "kenapa benar" | Bab |
|---|---|---|---|
| T1 | kuadrat 1–30 | (n + 1)² = n² + 2n + 1 | 6, 8, 9 |
| T2 | pangkat tiga 1–12; 2¹–2¹²; 3¹–3⁷ | kali berulang | 6, 8 |
| T3 | pecahan ↔ desimal ↔ persen | persen = per seratus | 6, 10 |
| T4 | trik ×5, ×25, ×125, ×11, kuadrat berakhiran 5 | ×25 = ×100 ÷ 4; (10a + 5)² = 100a(a + 1) + 25 | 6, 7 |
| T5 | pasangan faktor yang hasilnya bulat | 2ᵏ × 5ᵏ = 10ᵏ | 7 |
| T6 | rumus suku ke-n: selisih tetap, selisih bertingkat dua | jumlah selisih dari suku 1 sampai n | 8 |
| T7 | huruf ↔ nomor 1–26; huruf dari belakang 27 − n | posisi di alfabet | 8 |
| T8 | jam desimal ↔ menit; km/jam ↔ m/menit (kereta, arus sungai: Putusan 8) | 1 jam = 60 menit, 1 km = 1.000 m | 10 |
| T9 | bunyi lima opsi kecukupan data (Pilar 5) | opsi saling meniadakan | 11 |
| T10 | putar/cermin: padanan dan gabungan (dua cermin = putar 180°) | putaran menjaga urutan searah jarum jam, cermin membaliknya; dicek dengan matriks 2 × 2 | 14–18 |

- Bab berisi alasan lengkapnya; lampiran berisi ringkasan.
- T7, T8, dan T10 diselaraskan dengan laporan T2 C dan E.
- Glosarium tidak direncanakan, karena istilah didefinisikan saat pertama muncul (Putusan 9b).

### 3.4 Lampiran pengajar L1–L6
| L | Isi per butir | Sumber data |
|---|---|---|
| L1 Sumber dan Status Verifikasi | Kepmen 406/2026: Resmi, Diktum KEDUA–KESEPULUH, hlm. 1–7. Patokan waktu: usulan dari Handbook TWK/TKP, belum dikalibrasi. Komposisi 35 soal: rekonstruksi Al Faiz Paket 41 (pembanding Part 39 dan TIU002; keyakinan sedang; dua bimbel tidak sama). Engine TIU v0.4.2: draf, belum diuji paket nyata, + aturan-tetap B-14, B-15, C-5. `references/tiu.md`, `tiu-verbal-figural.md`. Generator `k12-spatial-engine`. Pejuang Kedinasan V&F + Numerik: struktur dianalisis, tidak disalin. Fakta matematika: dihitung script. | Tabel 2A T1-A; bagian "Bahan yang dibaca" laporan T1 A–E; log putusan 5–7 |
| L2 Belum Boleh Dikutip kepada Siswa | (1) jatah waktu resmi per subtes; (2) urutan nomor 31–65 dan urutan subtes di CAT; (3) kebebasan pindah soal/subtes; (4) bentuk jam CAT; (5) susunan blok sebagai ketentuan resmi; (6) format resmi perbandingan kuantitatif; (7) kebiasaan soal resmi "angka di pernyataan = jumlah awal" (Putusan 6); (8) aturan Kepmen tahun lain yang dikutip bahan luar (208/2025); (9) patokan detik per jenis sebagai aturan; (10) fakta sains di soal hubungan kalimat yang belum dicek (pelajaran TO P1 no. 36) | celah laporan T1 A–E; log putusan 5–7; log Paket 1 |
| L3 Aturan Menulis Soal TIU (ringkasan v0.4.2) | 3K; hukum data lengkap; daftar 47 kode (buku siswa memakai kalimat guru); templat KCK + larangan "atau"; PAS: J-SISI ≥ 2, larangan bentuk a × 10b / b × 10a; SUK: titik ≥ parameter + 1, aturan lain ≤ 3 operasi tidak cocok; ANA: setiap syarat menggugurkan ≥ 1 opsi; OPT: optimum global; FIG: aturan tunggal, bentuk kiral, generator + cek mata; G1–G8; kunci 7 per huruf, ≤ 2 berturut-turut; kerangka tidak kembar; level 30/50/20; waktu ±50,5 menit | engine v0.4.2; ditulis ulang bila engine berubah |
| L4 Rencana Sepuluh Pertemuan (usulan) | 1 Bab 1–2 + Tes Awal, isi Peta Diri · 2 Bab 3–4 · 3 Bab 5–6 (termasuk perbandingan kuantitatif) · 4 Bab 7–8 · 5 Bab 9–10 · 6 Bab 11 · 7 Bab 12–13 · 8 Bab 14–15 · 9 Bab 16–18 · 10 Bab 19 + Latihan B (17:15) + bandingkan Peta Diri | daftar bab + jumlah latihan × target per bab (laporan T2 B–E) |
| L5 Membaca Kesalahan Siswa | 47 baris: kalimat guru · kode · nama kamus · kelompok · bab rujukan; satu tindakan pengajar per kelompok. Bab 19 edisi pengajar merujuk ke sini (tidak digandakan). | `kode_kelompok.mjs` (dari tabel Pilar 3 engine) |
| L6 Asal Soal Latihan dan Contoh | per butir: bab, slot, id, jenis, sumber pembuat (script + fungsi / jenis generator + benih), bukti kunci tunggal, kerangka, butir TO terdekat + bedanya, pola rujukan (Al Faiz Paket 41 no. … / Pejuang bab …) | field `reviu` data butir; dibangun otomatis, ±1 baris per butir |

**Nama tryout dan bimbel hanya boleh ada di L1 dan L6.** `cek_handbook.mjs` menolak "Al Faiz", "Paket 41", "Part 39", "TIU002", dan "Pejuang" di build siswa, dan di bagian pengajar selain L1/L6.

### 3.5 Script usulan (`BIG DATA/HANDBOOK TIU D AJIKS AKADEMI/scripts/`)
| Script | Isi | Dipakai |
|---|---|---|
| `pembuka_penutup.mjs` | angka ambang, tabel waktu, titik periksa, sisa waktu; daerah lingkaran (rumus + cek tiga tali busur) | Bab 1, Bab 2 pembuka, Bab 19 peta hari H |
| `kode_kelompok.mjs` | membaca tabel Pilar 3 engine → `data/kode_kelompok.json`; assert 47 kode, 7 kelompok | Bab 2, Bab 19, L5, pemeriksa |
| `tabel_rujukan.mjs` | T1–T10 dengan assert | Lampiran D |
| `cek_handbook.mjs` | gabungan `tmp/paket1/cek_paket.mjs` + `cek_pembahasan.mjs`: kerangka unik (registri + TO), kunci seimbang per bab, ≤ 2 berturut-turut, 7 langkah lengkap, label, kalimat guru, frasa terlarang, nama tryout | semua bab |
| (rumpun, nama mengikuti B–D) `numerik.mjs`, `logika.mjs`, `verbal.json` | soal pilihan ganda Bab 2 dan 19, dengan field `bab` | Bab 2, 19 |
| `k12-spatial-engine/src/tiu-handbook.ts` | daftar spesifikasi figural handbook (Putusan 10c); peta handbook ikut `cekPeta` | Bab 2 (3 soal), Bab 19 (3 soal) |

---

## 4. Taksiran halaman (usulan)

Patokan pembahasan: ±1 halaman per soal dengan pratinjau. Dasarnya PDF pembahasan TO Paket 1 TIU, 40 halaman untuk 35 soal.

| Bagian | Siswa | Pengajar | Dasar |
|---|---|---|---|
| Bab 1 | 8 | 9 | 7 subbagian + 2 lembar isian; pengajar + catatan keyakinan dan kalibrasi |
| Bab 2 | 19 | 21 | 5 Contoh × ±1,5 + 10 soal latihan ±4 + 4 tabel + ringkasan; pengajar + kode per opsi |
| Bab 19 | 17 | 19 | pembuka 1,5 · 7 kartu ±4 · strategi + baca tryout 2 · Latihan A ±3 · Latihan B ±6 · peta hari H 1 |
| Lampiran A Kunci | 3 | 3 | tabel huruf per bab |
| Lampiran B Pembahasan: Bab 2 + 19 (24 soal) | 24 | 26 | ±1 hlm/soal; pengajar +10% |
| Lampiran B Pembahasan: Bab 3–18 (±130 soal, usulan T1 B–E: verbal 25 · numerik 45 · KCK/analitis/optimasi 27 · figural 33) | ±130 | ±143 | angka diperbarui setelah ringkasan T2 |
| Lampiran C + D | 8 | 8 | jawaban Latihan A 2 · tabel T1–T10 6 |
| L1–L6 | — | ±18 | L1 2 · L2 1,5 · L3 2 · L4 1,5 · L5 3 · L6 ±8 (±230 butir: Bab 2 dan 19 31 + Bab 3–18 ±198 usulan T1) |
| **Jumlah cakupan A** | **±209** | **±247** | lampiran pembahasan Bab 3–18 ikut dihitung di sini |

---

## 5. Putusan yang perlu diminta ke Gusti

1. **Bab 1 tanpa soal; Tes Awal = latihan Bab 2.**
   - Isi: 10 soal lintas jenis, ±12 menit, hasilnya dicatat di lembar Peta Diri Bab 1.
   - Alternatif: tes diagnosis 10 soal terpisah di Bab 1 (+10 soal, +±10 halaman).
   - **Rekomendasi: setuju.**
2. **Latihan Bab 19 = A + B.**
   - A: menamai kekeliruan, 14 butir dari soal Bab 3–18, tanpa soal baru.
   - B: campuran 14 soal baru, 2 per kelompok, urutan blok hari H, ±17 menit.
   - Alternatif: A saja (−14 soal, −±14 halaman).
   - **Rekomendasi: A + B.** Mengulang soal yang kuncinya sudah dilihat tidak melatih kecepatan dan ketelitian.
3. **Pembuka Bab 2: soal klasik di luar format TIU.**
   - Isi: banyak daerah dalam lingkaran. Polanya tampak berlipat dua, lalu patah di titik keenam.
   - Alternatif: deret angka format TIU yang patah di titik keempat (bersinggungan dengan Bab 8).
   - **Rekomendasi: soal klasik.** Soal ini tidak mengambil bahan Bab 8, dan menunjukkan dengan tegas bahwa pola yang cocok lima kali pun belum terbukti.

## 6. Risiko dan celah
- **Tabrakan kerangka dengan Bab 3–18.**
  - Penyebab: laporan T2 B–E ditulis bersamaan, dan ±21 slot KCK di Bab 11 menghabiskan hampir semua bentuk.
  - Penangkal: registri kerangka; bila bentrok, Bab 2/19 mengalah.
- **TO Paket 2–3 nonfigural belum ada.** Larangan "beda dari TO" hanya bisa dicek terhadap Paket 1 sampai keduanya dibuat. Pembuat yang belakangan wajib membaca registri.
- **Volume buku siswa.** Dengan ±155 soal latihan berpembahasan 7 langkah, total buku siswa diperkirakan ±330–380 halaman. Putusan satu/dua jilid (ditunda sampai Bab 1–4 jadi) hampir pasti diperlukan.
- **Belum diverifikasi.** Patokan detik per jenis belum punya data siswa. Kolom "sisa waktu di layar" bergantung pada bentuk jam CAT dan urutan subtes yang belum diverifikasi.
- **Pembuka Bab 2 (gambar daerah lingkaran).** Gambar wajib memakai titik tidak beraturan. Bila tiga tali busur bertemu di satu titik, jumlah daerah berkurang, dan contoh penyangkalnya menjadi rancu.
