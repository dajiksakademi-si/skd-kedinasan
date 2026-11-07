# Tahap 2 · Bagian B — Verbal (Bab 3, 4, 5): rencana contoh dan latihan

Handbook TIU D'Ajiks Akademi · 2026-10-30 · status: **spesifikasi saja**. Laporan ini tidak memuat kalimat soal final, opsi jadi, atau kunci soal.

**Dasar:** log handbook TIU (putusan 1–11), laporan T1 bagian B, Tabel 2C laporan A, engine TIU v0.4.2 (Pilar 3, Pilar 4 SIL/ANL, Pilar 5, format pembahasan 7 langkah), log TO Paket 1 TIU.
**Putusan yang diterapkan:**
- Putusan 1: konsep inti verbal "contoh penyangkal", Bab 5 "akibat klaim"; judul bab.
- Putusan 3, 3b-2, 3b-3: kode Pilar 3 hanya di edisi pengajar; pemerkuat/pelemah tertukar = J-BALIK; "lupa pembanding" = J-MUNGKIN, disebut "lupa pembanding" di Bab 5.
- Putusan 4: semua soal baru, kerangka beda dari TO.
- Putusan 5: ±86 detik per soal rata-rata.
- Putusan 9a, 9b: "kalimat penentu"; ingkaran, konvers, kontraposisi didefinisikan saat pertama muncul.
- Putusan 10: folder `scripts/`.
- Putusan 11a: pembahasan 7 langkah.

**Singkatan di tabel:**
- P = soal pembuka. C1… = Contoh Soal dan Pembahasan. L1… = latihan.
- Sumber **SIL** = `scripts/silogisme.mjs` (baru, lihat §3).
- Sumber **TT** = tulis tangan dengan tabel uji per opsi + cek buta (§3). Alasan: makna kata dan kekuatan bukti tidak dapat dihitung program.
- Semua 38 soal juga lewat `scripts/cek_verbal.mjs`, pemeriksa bentuk (§3).
- Kode kesalahan = satu kode per opsi salah, jadi empat per soal.

---

## 0. Ringkasan

| Bab | P | C | L | Jumlah | Rata-rata target |
|---|---|---|---|---|---|
| 3 Analogi dan Hubungan Kata | 1 | 3 | 8 | 12 | 55,4 dtk |
| 4 Silogisme dan Ekuivalensi Pernyataan | 1 | 4 | 10 | 15 (+1 bersyarat) | 62,0 dtk |
| 5 Memperkuat dan Memperlemah Argumen | 1 | 3 | 7 | 11 | 65,5 dtk |
| **Total** | 3 | 10 | 25 | **38** (39 bila Putusan T2-3a disetujui) | **60,9 dtk** |

Rata-rata 60,9 detik sama dengan patokan blok verbal Tabel 2C (60 detik). Blok verbal lebih cepat dari rata-rata TIU (±86 detik), sehingga sisa waktu mengalir ke kecukupan data dan analitis.

**Jumlah ditinjau ulang: tetap 38.**
- Alasan tidak bertambah:
  - Verbal hanya 6 dari 35 soal hari H.
  - Bab 3 dan Bab 5 ditulis tangan dan butuh cek buta berulang. TO no. 36 butuh 4 putaran.
  - Pembeda kita dari Pejuang (48 soal) adalah kedalaman pembahasan, bukan jumlah soal.
- Alasan tidak berkurang: setiap subbagian yang disetujui di T1 punya minimal satu soal. Contohnya empat sifat analogi, lima bentuk Bab 4, dan tiga bentuk klaim Bab 5.

**Perubahan isi dari usulan T1:**
1. **Bab 5 C2 dan C3 T1 berkerangka sama dengan TO no. 33 dan no. 31.**
   - TO no. 33: klaim sebab dari data sebelum–sesudah, pelemahnya penyebab lain yang terjadi bersamaan.
   - TO no. 31: klaim sebab, pemerkuatnya menyingkirkan satu penjelasan lain.
   - Keduanya diganti: C2 klaim umum diperlemah, C3 klaim sebab dari dua kelompok diperkuat.
   - Latihan disusun ulang menjadi: "satu-satunya cara", sebab terbalik, klaim yang diuji dengan menghentikan penyebabnya, dan kunci "tidak relevan".
2. **Bab 4.**
   - Satu latihan kategoris diganti soal "kata izin di dalam nama kelompok", karena subbagian 8 belum punya soal. Premis tetap berbentuk fakta, sesuai Pilar 4 SIL.
   - Kunci "tidak dapat disimpulkan" menjadi soal tambahan bersyarat (Putusan T2-3a).
3. **Bab 3.**
   - Hubungan di soal pembuka dijauhkan dari Paket 41 no. 35 ("meredakan keadaan buruk").
   - Latihan hubungan kalimat berpola sama memakai benda buatan, karena TO no. 36 sudah memakai makhluk hidup.
4. **Istilah ikut putusan:** "contoh penyangkal" (bukan "dunia bantahan"), "akibat klaim" (bukan "ramalan"), "kalimat penentu".

**Kerangka TO Paket 1 TIU yang tidak boleh diulang** (sumber `paket/paket-1/paket_tiu_1.json`):
| TO | Kerangka |
|---|---|
| 31 | klaim sebab kebijakan + data sebelum–sesudah satu tempat · pemerkuat menyingkirkan satu penjelasan lain (volume tetap) |
| 32 | kategoris 2 premis ("semua" + "tidak ada") → "tidak ada" · pilih kesimpulan pasti |
| 33 | klaim program + data naik sebelum–sesudah · pelemah = penyebab lain bersamaan |
| 34 | jika-maka berantai 2 premis + ingkaran akibat akhir → ingkaran sebab awal |
| 35 | pasangan kata · alat ukur : besaran yang diukur |
| 36 | hubungan kalimat · makhluk hidup + satu ciri tubuh + tujuan (menghemat air) |

TO Paket 2–3 TIU belum dibuat. Kerangka handbook di bawah wajib didaftarkan agar TO berikutnya tidak memakainya (Putusan 4 berlaku dua arah).

---

## 1. Rencana per bab

### Bab 3 — Analogi dan Hubungan Kata
| Butir | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Catatan beda dari TO |
|---|---|---|---|---|---|---|
| P | pasangan "A : B = …" | sifat pembeda utama **tanda** (menimbulkan lawan mencegah/mengurangi); relasi dan bidang beda dari Paket 41 no. 35 | J-BALIK (tanda), J-BALIK (arah), J-RELASI, J-KATA | TT | 45 | TO 35 = alat ukur; di sini sifat tanda |
| C1 | pasangan | sifat **tingkat**: dua kata pada satu skala, lemah → kuat; pengecoh skala dibalik, beda skala, sama tingkat, topik sama | J-BALIK, J-RELASI ×2, J-KATA | TT | 45 | tidak ada di TO |
| C2 | tiga kata "A : B : C" | dua aturan bersambung (A–B, B–C); dua pengecoh benar di satu sambungan saja; satu pengecoh peran ditukar. Bukan bahan–produk–pembuat (contoh HUB engine = TIU002 no. 2, milik Pejuang) | J-RELASI ×2, J-BALIK, J-KATA | TT | 60 | tidak ada di TO |
| C3 | hubungan kalimat, kelima opsi berpola sama (pelaku + dua benda + tujuan) | pembeda = label antara dua benda (berlawanan / sejenis / bahan–hasil) + jenis tujuan; ≥ 2 opsi per kelompok pengecoh; kata kerja tujuan kunci ≠ soal; relasi kunci bukan "dua hal berlawanan dipakai bergantian" (Paket 41 no. 36) | J-RELASI ×3, J-KATA | TT | 75 | TO 36 = satu ciri tubuh; di sini dua benda + label antarbenda |
| L1 | pasangan | sifat **arah**: pelaku/pengguna ↔ hasil kerja; pengecoh dibaca dari kanan | J-BALIK, J-RELASI ×2, J-KATA | TT | 40 | bukan alat ukur |
| L2 | pasangan | sifat **tanda** kedua (mempercepat lawan memperlambat, atau sejenisnya), bidang beda dari P | J-BALIK ×2, J-RELASI, J-KATA | TT | 40 | — |
| L3 | pasangan | sifat **tingkat** pada skala lain dari C1 (ukuran atau intensitas) | J-BALIK, J-RELASI ×2, J-KATA | TT | 45 | — |
| L4 | pasangan | sifat **keharusan**: ciri yang selalu melekat lawan ciri yang kadang ada | J-SEBAGIAN ×2, J-RELASI, J-KATA | TT | 45 | — |
| L5 | tiga kata | dua aturan bersambung, keluarga hubungan beda dari C2 (mis. tempat → kegiatan → hasil) | J-RELASI ×2, J-BALIK, J-KATA | TT | 60 | — |
| L6 | hubungan kalimat pola sama | **benda buatan** + ciri rancangan + tujuan; kategori tujuan beda dari TO 36; kunci tidak memakai bagian benda yang sama dengan soal (pelajaran TO 36) | J-RELASI ×3, J-KATA | TT | 60 | TO 36 = makhluk hidup |
| L7 | hubungan kalimat sebab → akibat berantai | tiga peristiwa bersambung; pengecoh urutan dibalik, satu sambungan dilompati, pola sama isi beda | J-BALIK, J-RELASI ×2, J-KATA | TT | 75 | — |
| L8 | hubungan kalimat jumlah unsur | soal memuat tiga unsur berperan; pengecoh dua unsur, empat unsur, peran tertukar | J-RELASI ×2, J-BALIK, J-KATA | TT | 75 | — |

### Bab 4 — Silogisme dan Ekuivalensi Pernyataan
| Butir | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Catatan beda dari TO |
|---|---|---|---|---|---|---|
| P | pilih kesimpulan pasti | 3 premis kategoris (2 bersambung + 1 pengalih, 1 di antaranya negatif), ≤ 4 istilah; opsi: konvers, sebagian → semua, bisa jadi, kata pengalih | J-BALIK, J-SEBAGIAN, J-MUNGKIN, J-KATA | SIL | 75 | pola sah kunci bukan "semua + tidak ada → tidak ada" (TO 32); ada premis pengalih |
| C1 | pilih kesimpulan | 2 premis "sebagian" + "semua", satu premis berlawanan dengan kenyataan | J-AKAL, J-SEBAGIAN, J-BALIK, J-MUNGKIN | SIL | 60 | — |
| C2 | menilai dua kesimpulan | 2–3 premis kategoris; (1) sah, (2) konvers; bunyi opsi = status lengkap (Putusan T2-1) | J-BALIK, J-MUNGKIN, J-TENTU*, J-SEBAGIAN | SIL | 60 | bentuk Paket 41 no. 32; tidak ada di TO |
| C3 | jika-maka 3–4 premis | satu premis "atau", satu fakta tunggal di tengah rantai; kerja mundur dari fakta | J-BALIK ("tidak"-nya dipasang di dua sisi), J-MUNGKIN, J-ASUMSI, J-AKAL | SIL | 90 | TO 34 = rantai lurus + ingkaran akibat akhir; di sini ada cabang "atau" |
| C4 | setara "jika p maka q" | kunci = kontraposisi atau "tidak p atau q"; pengecoh konvers, "tidak-tidak", dua ingkaran keliru | J-BALIK ×2, J-INGKAR ×2 | SIL | 45 | tidak ada di TO |
| L1 | kategoris 2 premis | "semua" + "sebagian" → kesimpulan "sebagian" | J-SEBAGIAN, J-BALIK, J-MUNGKIN, J-AKAL | SIL | 45 | — |
| L2 | kategoris 2 premis negatif | "tidak ada" + "sebagian" → "sebagian … bukan" | J-SEBAGIAN, J-BALIK ×2, J-MUNGKIN | SIL | 60 | pola beda dari TO 32 |
| L3 | kategoris rantai 3 premis | 4 istilah, kesimpulan dari ujung ke ujung; satu pengecoh memakai istilah tengah | J-BALIK, J-SEBAGIAN, J-MUNGKIN, J-KATA | SIL | 75 | — |
| L4 | kata izin di dalam nama kelompok | premis berbentuk fakta tentang kelompok "yang memegang izin …"; pengecoh mengubah izin menjadi kejadian pasti | J-IZIN ×2, J-BALIK, J-MUNGKIN | SIL + TT (cara baca izin) | 60 | — |
| L5 | menilai dua kesimpulan | (1) bentuk "tidak-tidak", (2) kontraposisi sah | J-BALIK, J-TENTU*, J-MUNGKIN, J-SEBAGIAN | SIL | 60 | — |
| L6 | menilai dua kesimpulan | satu kesimpulan pasti salah, satu bisa jadi | J-TENTU*, J-MUNGKIN, J-BALIK, J-AKAL | SIL | 75 | — |
| L7 | jika-maka 2 premis | premis memuat "tidak"; pengecoh membenarkan akibat dan "tidak-tidak" | J-BALIK ×2, J-MUNGKIN, J-AKAL | SIL | 45 | TO 34 berantai; di sini satu langkah |
| L8 | jika-maka rantai + "atau", kerja maju | dua cabang menuju satu akibat | J-MUNGKIN, J-BALIK, J-ASUMSI, J-SEBAGIAN | SIL | 90 | arah kerja kebalikan C3 |
| L9 | ingkaran | ingkaran "semua", "jika-maka", "dan/atau" (satu soal, satu bentuk dipilih) | J-INGKAR ×2, J-BALIK, J-SEBAGIAN | SIL | 45 | — |
| L10 | setara | "jika p maka q" ↔ "tidak p atau q" dengan anteseden bertanda "tidak" | J-BALIK ×2, J-INGKAR ×2 | SIL | 45 | beda bentuk dari C4 |
| L11 (bersyarat) | kunci "tidak dapat disimpulkan" | 2 premis kategoris; keempat opsi lain punya contoh penyangkal | J-MUNGKIN ×2, J-BALIK, J-AKAL | SIL | 60 | hanya bila Putusan T2-3a disetujui |

\* J-TENTU (menyamakan "pasti tidak" dengan "tidak dapat ditentukan") di engine tercatat untuk KCK dan DAT. Pemakaian di silogisme adalah perluasan keluarga; perlu dicatat di engine bila disetujui.

### Bab 5 — Memperkuat dan Memperlemah Argumen
| Butir | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Catatan beda dari TO |
|---|---|---|---|---|---|---|
| P | klaim urutan "semakin … semakin" · MEMPERLEMAH | kunci = dua kasus pembanding: yang X-nya lebih banyak tidak lebih Y; ≥ 1 pengecoh juga berbentuk pembanding agar bentuk kunci tidak tunggal (B-3) | J-BALIK, J-ULANG, J-KATA, J-AKAL | TT | 60 | bentuk Paket 41 no. 33; TO tidak punya klaim urutan |
| C1 | fakta lawan dua argumen (lima opsi bentuk hari H) | dua argumen dengan cara berbeda; argumen 1 berbunyi "salah satu cara"; fakta membuktikan cara argumen 2 bekerja; kata topik fakta sengaja muncul di argumen 1 | J-KATA, J-SEBAGIAN, J-BALIK, J-KATA** | TT | 75 | tidak ada di TO |
| C2 | klaim umum ("semua/selalu") · MEMPERLEMAH | kunci = satu kasus yang memenuhi syarat klaim tanpa akibatnya (contoh penyangkal, sambungan ke Bab 4); pengecoh kasus cocok, kasus di luar syarat klaim | J-BALIK ×2, J-ULANG, J-AKAL | TT | 45 | tidak ada di TO |
| C3 | klaim sebab dari **dua kelompok pada waktu yang sama** · MEMPERKUAT | kunci = kedua kelompok setara sebelum perlakuan; pengecoh: satu kisah sukses tanpa pembanding (lupa pembanding), kelompok perlakuan sudah unggul sejak awal | J-MUNGKIN, J-BALIK, J-KATA, J-ULANG | TT | 75 | TO 31 = sebelum–sesudah satu tempat + satu pengganggu tetap |
| L1 | fakta lawan dua argumen | fakta membuktikan cara argumen 1 tidak bekerja; kata topik muncul di argumen 2 | J-KATA, J-BALIK, J-SEBAGIAN, J-KATA** | TT | 75 | — |
| L2 | fakta lawan dua argumen | kunci "tidak relevan": fakta bertopik sama dengan kedua argumen, tetapi tidak menyentuh cara di keduanya | J-KATA ×2, J-SEBAGIAN, J-BALIK | TT | 75 | — |
| L3 | klaim urutan · MEMPERLEMAH | kunci = pembanding "sama" (ingkaran "lebih" = "tidak lebih"), bukan "kurang" | J-BALIK, J-ULANG, J-KATA, J-AKAL | TT | 60 | — |
| L4 | klaim sebab dua kelompok · MEMPERLEMAH | kunci = sebab terbalik (Y yang membuat orang memilih X) | J-BALIK, J-ULANG, J-KATA, J-AKAL | TT | 75 | TO 33 = penyebab lain bersamaan |
| L5 | klaim "satu-satunya cara" · MEMPERLEMAH | kunci = cara lain terbukti berhasil (pasangan C1: "salah satu" lawan "satu-satunya") | J-BALIK, J-KATA, J-ULANG, J-AKAL | TT | 45 | — |
| L6 | klaim urutan · MEMPERKUAT | kunci = data tiga tingkat yang urut; pengecoh satu kasus cocok tanpa pembanding | J-MUNGKIN, J-BALIK, J-ULANG, J-KATA | TT | 60 | — |
| L7 | klaim sebab · MEMPERKUAT | kunci = saat X dihentikan, Y kembali seperti semula | J-MUNGKIN, J-BALIK, J-KATA, J-ULANG | TT | 75 | TO 31 menyingkirkan pengganggu; di sini penyebab dihentikan |

\*\* Opsi "tidak relevan" sebagai pengecoh: kesalahannya kebalikan J-KATA (kata berbeda dikira tidak berkaitan). Pilar 3 belum punya kode yang tepat; untuk sementara dipakai J-KATA. Lihat §6.
Sebaran perintah Bab 5: memperlemah 5 · memperkuat 3 · dua argumen 3. "Lupa pembanding" muncul di C3, L6, L7.

---

## 2. Sebaran kunci dan tingkat

### Kunci A–E (rencana, dicek script)
| Bab | Urutan butir | Rencana kunci | A | B | C | D | E | Berderet maks |
|---|---|---|---|---|---|---|---|---|
| 3 | P C1 C2 C3 L1–L8 | D A C E · B B A D E C A E | 3 | 2 | 2 | 2 | 3 | 2 |
| 4 | P C1–C4 L1–L10 | B E A D C · C E B A D B A E C D | 3 | 3 | 3 | 3 | 3 | 2 |
| 5 | P C1–C3 L1–L7 | D B E A · C E D C A B B | 2 | 3 | 2 | 2 | 2 | 2 |
| **Total** | 38 | | 8 | 8 | 7 | 7 | 8 | — |

Aturan:
- **Jumlah dan urutan.** Tiap huruf 7–8. Huruf sama paling banyak 2 berturut. Urutan latihan tidak simetris dan tidak berulang per lima.
- **Opsi lima bentuk hari H** (dua argumen) berurutan tetap: perkuat 1 · perkuat 2 · perlemah 1 · perlemah 2 · tidak relevan. Huruf kunci lalu mengikuti isi: C1 = B (perkuat 2), L1 = C (perlemah 1), L2 = E (tidak relevan).
- **Opsi status lengkap** (menilai dua kesimpulan, bila Putusan T2-1 disetujui): urutan baku dari sembilan gabungan, lima dipilih per soal. Huruf kunci bisa diatur tanpa mengubah urutan baku.
- **L11 bersyarat** diberi huruf saat disetujui. Sebaran tetap seimbang (huruf C atau D).
- Kunci verbal tidak boleh opsi terpanjang tunggal (pelajaran TO: 2 dari 6 kunci terpanjang pada tulisan pertama).

### Tingkat = target waktu (pengganti label DASAR/HOTS)
| Tingkat | Ciri | Bab 3 | Bab 4 | Bab 5 | Jumlah |
|---|---|---|---|---|---|
| 40–45 dtk | satu aturan/sifat, dua premis | 6 | 5 | 2 | 13 |
| 60 dtk | dua sifat atau satu bentuk baru (tiga kata, dua kesimpulan, izin) | 3 | 5 | 3 | 11 |
| 75 dtk | rantai, pembanding, dua argumen | 3 | 3 | 6 | 12 |
| 90 dtk | jika-maka 3–4 premis dengan "atau" | 0 | 2 | 0 | 2 |
| **Rata-rata** | | 55,4 | 62,0 | 65,5 | **60,9** |

- **Asal angka.** Target per jenis menjabarkan Tabel 2C (verbal 60 dtk, usulan D'Ajiks, bukan aturan resmi). Angka ini wajib dikalibrasi dengan catatan waktu tryout siswa.
- **Halaman latihan** mencantumkan target per soal dan total per bab: Bab 3 ±11 menit, Bab 4 ±15,5 menit, Bab 5 ±12 menit.

---

## 3. Cara membuktikan kunci tunggal

### Silogisme dan ekuivalensi (Bab 4): `scripts/silogisme.mjs`
Pola diambil dari `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/tmp/paket1/build_logika.mjs`: fungsi `analitis()`, "pasti = benar di semua dunia sah", "tiap syarat harus perlu". Tidak menulis mesin baru dari nol.

1. **Kategoris.**
   - Paling banyak 4 istilah → 16 daerah gambar himpunan. Satu dunia = pilihan daerah yang berisi, jadi ada 2^16 = 65.536 dunia.
   - Premis menjadi syarat pada dunia.
   - Status tiap opsi: **pasti benar** (benar di semua dunia sah), **pasti salah**, atau **tidak dapat dipastikan**.
2. **Jika-maka, setara, ingkaran.**
   - Paling banyak 5 pernyataan dasar → 32 baris tabel kebenaran.
   - Setara = nilainya sama di semua baris. Ingkaran = nilainya berlawanan di semua baris.
3. **Semua bacaan diuji** (Putusan T2-2): himpunan yang disebut boleh kosong atau tidak kosong; "sebagian" = paling sedikit satu, atau "sebagian tetapi tidak semua"; "atau" inklusif atau eksklusif. Soal hanya lolos bila status kelima opsi sama di semua bacaan.
4. **Syarat lolos:**
   - premis dapat dipenuhi bersama;
   - tepat satu opsi pasti benar, atau nol opsi untuk kunci "tidak dapat disimpulkan";
   - setiap premis bukan pengalih memang perlu: dibuang satu, kunci tidak lagi pasti;
   - premis pengalih tidak melahirkan opsi pasti benar kedua;
   - opsi bertanda J-MUNGKIN harus berstatus "tidak dapat dipastikan".
5. **Contoh penyangkal dicetak** untuk tiap pengecoh, berupa satu dunia sah yang membuat opsi itu salah. Keluaran ini menjadi bahan gambar himpunan di pembahasan (langkah 3–4), jadi gambar dan bukti berasal dari satu sumber.
6. **Menilai dua kesimpulan:** script menghitung status (1) dan (2), lalu memetakan ke opsi status lengkap.
7. **Uji diri** (assert, dijalankan tiap kali):
   - pola yang dikenal sah harus lolos: "semua–semua", "semua–tidak ada", kontraposisi, modus tollens;
   - konvers, "tidak-tidak", dan membenarkan akibat harus gugur.
8. **Batas:** soal 5 istilah (2^32 dunia) tidak direncanakan. Bila kelak perlu, ganti cara hitung.

### Analogi dan hubungan kalimat (Bab 3): tulis tangan + cek buta
1. **Tabel kalimat uji × opsi.**
   - Tulis kalimat uji tersempit untuk pasangan soal (kiri → kanan). Tepat satu opsi membuat kalimat benar.
   - Setiap opsi gugur dicatat sifat yang gagal: arah, tanda, tingkat, keharusan, atau relasi.
2. **Cek balik.** Kalimat uji dibaca kanan → kiri dan tetap cocok hanya untuk kunci.
3. **Fakta dan makna.**
   - Makna tiap kata dicatat dengan lema KBBI yang dipakai.
   - Semua pengecoh benar secara fakta (G7).
   - Batas label "berlawanan" ditulis per soal.
4. **Hubungan kalimat.** ≥ 2 opsi per kelompok pengecoh. Kata kerja tujuan kunci ≠ soal. Bagian benda/tubuh di kunci ≠ soal.
5. **Pembaca buta** (subagen, tanpa kunci dan tanpa catatan penyusun) menjawab, menyatakan tingkat yakin, dan menyebut opsi kedua yang paling bisa dibela. Lulus = jawaban sama dengan kunci, yakin tinggi, dan opsi kedua tidak terbela dengan teks soal + KBBI. Ini uji siswa teliti engine.
6. **Penebak bentuk** (subagen yang hanya melihat opsi) menebak kunci dan menyebut alasannya. Bila tebakannya kena karena bentuk (terpanjang, kata sama, kelompok tunggal), soal ditulis ulang.
7. **Perbaikan.** Gagal → perbaiki → cek buta ulang hanya soal yang diubah (pola TO Paket 1).

### Memperkuat dan memperlemah (Bab 5): tulis tangan + cek buta
1. **Tabel akibat klaim × opsi.**
   - Sebelum opsi ditulis, catat akibat klaim: apa yang terlihat bila klaim benar, dan apa yang menyangkalnya.
   - Tiap opsi diberi status: sejalan, menyangkal, di luar klaim, atau mengulang.
2. **Tepat satu opsi searah perintah.** Pengecoh tidak boleh searah perintah sama sekali, sekalipun lebih lemah. Ini mencegah dua kunci pada perintah "paling memperkuat".
3. **Dua argumen.** Status fakta terhadap **kedua** argumen ditulis (memperkuat, memperlemah, tidak menyentuh). Fakta menyentuh tepat satu argumen atau tidak menyentuh keduanya. Pembaca buta juga diminta menulis kedua status itu.
4. **Bentuk.** Kunci bukan satu-satunya opsi berbentuk sangkalan, pembanding, atau yang terpanjang. Diperiksa penebak bentuk dan `cek_verbal.mjs`.
5. **Pembaca buta + uji siswa teliti** seperti Bab 3.

### Pemeriksa bentuk ke-38 soal: `scripts/cek_verbal.mjs`
- kode tiap opsi salah ada di 47 kode Pilar 3;
- kunci per bab sesuai rencana §2 dan tidak lebih dari 2 berturut;
- kunci bukan opsi terpanjang tunggal;
- kunci bukan satu-satunya opsi yang memuat kata isi dari soal;
- kunci bukan satu-satunya opsi bertanda "pembanding/sangkalan";
- `kerangka` tidak kembar antarsoal handbook dan tidak sama dengan TO 31–36.

Pemeriksa pembahasan T6 memakai ulang `tmp/paket1/cek_pembahasan.mjs`. Tidak dibuat baru.

---

## 4. Taksiran halaman (usulan, dikalibrasi setelah T3 contoh 2 halaman)
| Bab | Isi bab siswa | Lampiran pembahasan latihan | Siswa total | Pengajar |
|---|---|---|---|---|
| 3 | ±12 (teks 7 · pembuka 0,5 · contoh 3 × 1 · latihan 2) | ±4 (8 × 0,5) | ±16 | ±18 |
| 4 | ±16 (teks 8 dengan gambar himpunan + tabel kebenaran · pembuka 0,5 · contoh 4 × 1,2 · latihan 2,5) | ±6 (10 × 0,6) | ±22 | ±25 |
| 5 | ±11 (teks 6 · pembuka 0,5 · contoh 3 × 1 · latihan 2) | ±3,5 (7 × 0,5) | ±14,5 | ±16,5 |
| **Total** | ±39 | ±13,5 | **±52,5** | **±59,5** |

- **Pengajar** = siswa × ±1,13: kode per opsi, kerangka, asal soal L6, catatan mengajar. Rasio diambil dari Handbook TWK, siswa 130 lawan pengajar 148.
- **L11 bersyarat** menambah ±1 halaman di Bab 4.

---

## 5. Putusan yang perlu diminta ke Gusti

**T2-1. Bunyi opsi dua bentuk hari H.**
- Paket 41 no. 32 memakai opsi "(1) atau (2) tepat", yang ikut benar harfiah, sehingga ada dua opsi benar.
- Bentuk dua argumen secara prinsip tidak saling meniadakan.
- Usulan untuk **menilai dua kesimpulan:** setiap opsi menyebut status lengkap kesimpulan (1) dan (2), yaitu pasti benar, pasti salah, atau tidak dapat dipastikan. Lima dari sembilan gabungan dipakai per soal, dan kata "atau" dilarang.
- Usulan untuk **dua argumen:** lima opsi bentuk hari H dipertahankan, ditambah aturan susun "fakta menyentuh tepat satu argumen atau tidak menyentuh keduanya".
- **Rekomendasi:** kedua aturan masuk engine Pilar 5 (v0.4.3), supaya TO Paket 2–3 dan handbook memakai bunyi yang sama. Buku siswa diberi satu kotak Catatan tentang opsi "atau" di soal luar (pola Putusan 6).

**T2-2. Kebiasaan baca kata logika:** himpunan yang disebut dianggap tidak kosong; "sebagian" berarti paling sedikit satu, atau tidak semua; "atau" inklusif atau eksklusif. Kebiasaan soal resmi belum diverifikasi.
- **Rekomendasi:** script menguji semua bacaan, dan hanya soal yang status kelima opsinya sama di semua bacaan dipakai.
- Buku siswa mengajarkan arti logika ("sebagian" = paling sedikit satu, mungkin semua; "atau" = salah satu atau keduanya), ditambah satu kotak Catatan bahwa soal luar kadang membaca lain.
- Dengan cara ini tidak ada kunci D'Ajiks yang bergantung pada kebiasaan yang belum pasti.

**T2-3. Bentuk verbal di luar Paket 41.**
- (a) Kunci "tidak dapat disimpulkan". **Rekomendasi: dimuat**, +1 latihan Bab 4 (L11, total 39). Bentuk ini penerapan paling murni dari contoh penyangkal, dan siswa perlu tahu bahwa jawaban itu mungkin.
- (b) Soal asumsi. **Rekomendasi:** satu kotak Catatan di Bab 5 tanpa soal, karena belum terlihat di bahan hari H.
- (c) Analogi dua kosong dan sebab-akibat lima opsi gaya psikotes. **Rekomendasi: tidak dimuat**, karena belum terlihat di bahan SKD 2026.

---

## 6. Risiko dan celah
- **Bab 3 dan 5 tidak bisa dibuktikan program.** Mutu bergantung pada tabel uji dan cek buta. Taksiran 1–3 putaran per soal (TO no. 36 butuh 4 putaran). Untuk 23 soal tulis tangan, ini beban terbesar T5.
- **Pemeriksaan KBBI** paling cepat lewat KBBI daring, dan itu perlu izin internet dari Gusti saat T5. Tanpa izin itu, pemeriksaan makna dilakukan manual oleh pengajar.
- **Celah kode:**
  - Pengecoh "tidak relevan" pada bentuk dua argumen belum punya kode yang tepat; sementara dipakai J-KATA.
  - J-TENTU (silogisme) dan J-BATAS (pembanding "sama" di L3, hanya disebut di langkah 7 pembahasan) adalah perluasan keluarga.
  - Ketiganya perlu catatan di engine bila disetujui.
- **Bab 5 C3 dekat dengan TO 31.** Keduanya menutup penjelasan lain, tetapi susunan datanya berbeda (dua kelompok lawan sebelum–sesudah). Bila Gusti menilainya terlalu dekat, ganti dengan bentuk "makin besar takaran, makin besar akibat".
- **Bukti hari H verbal tipis:** 2 soal per jenis dalam satu tryout bimbel. Sebaran bentuk bisa bergeser.
- **Kerangka bersama dengan bab lain.** Soal verbal di Bab 2, Bab 19, dan tes diagnosis (laporan A) memakai script dan daftar kerangka yang sama, supaya tidak kembar dengan 38 soal ini. Daftar yang sama dipakai TO Paket 2–3.
- **Jumlah halaman.** Bila kepadatan Bab 3–5 (±17 halaman siswa per bab) berlaku di 19 bab, edisi siswa bisa melewati ±250 halaman. Ini bahan putusan satu atau dua jilid, yang masih ditunda.
- **Batas script:** paling banyak 4 istilah per soal kategoris.
