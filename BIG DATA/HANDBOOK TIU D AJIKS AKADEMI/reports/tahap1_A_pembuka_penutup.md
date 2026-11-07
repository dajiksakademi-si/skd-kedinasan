# Tahap 1 · Bagian A — Pembuka dan Penutup

Handbook TIU D'Ajiks Akademi · laporan baca bahan · 2026-10-30 · subagen A
Cakupan: Bab 1 (Peta TIU hari H), Bab 2 (Cara berpikir yang tahan uji), Bab 19 (Kamus Jebakan TIU + peta hari H), Lampiran.
Status: bahan kerja Tahap 2. Tidak memuat soal, angka soal, atau kunci; calon soal ditulis sebagai spesifikasi.

---

## Ringkasan temuan

1. **Waktu per subtes tidak diatur.** Kepmen 406/2026 hanya menetapkan 100 menit untuk seluruh SKD (Diktum KETIGA, hlm. 5). Jika patokan Handbook TWK (±27 menit) dan Handbook TKP (±22,5 menit) dipakai, TIU mendapat ±50,5 menit untuk 35 soal (±86 detik/soal). Engine TIU Pilar 6 memakai patokan lain, 50–55 detik/soal (±30 menit). Dua patokan ini belum selaras.
2. **Kisi-kisi resmi tidak sama dengan blok tryout.** Diktum KEDUA huruf b (hlm. 4–5) tidak memuat kecukupan data, optimasi, memperkuat/memperlemah, atau matriks. Sebaliknya, ada "perbandingan kuantitatif" yang tidak muncul sebagai blok di Paket 41. Karena itu, peta blok Bab 1 ditulis sebagai rekonstruksi dari tryout, bukan kisi resmi.
3. **Rincian figural di skill masih versi lama.** `references/tiu.md` masih menulis "seri 3 · analogi 1". Engine v0.4 dan log figural sudah membetulkannya menjadi seri 2 (57–58) · analogi 2 (59–60) · gambar berbeda 2 · matriks 3, dan Gusti menyetujuinya. Bab 1 mengikuti engine.
4. **Koreksi atas bacaan Pejuang.** Semua soal latihan Pejuang punya pembahasan (V&F 108/108, Numerik 66/66, dihitung dengan skrip). Pembahasannya pendek (1–4 kalimat) dan hanya sebagian yang menyebut asal pengecoh. Catatan riset 2026-10-29 ("pembahasan rinci hanya untuk sebagian soal") kurang tepat. Pembeda kita terletak pada kedalaman, bukan cakupan: 7 langkah, setiap opsi dinamai, pratinjau soal, dan tautan dua arah.
5. **Nama kesalahan saling bertentangan.** Engine punya 21 kode (J-ASUMSI s.d. J-ULANG, termasuk J-BASIS; `tiu.md` menulis "21 + J-BASIS", padahal totalnya 21), 11 nama figural tanpa kode, dan ±8 nama tambahan di generator. Aturan C-5 melarang nama Kamus Jebakan TIU di pembahasan siswa, sedangkan engine Pilar 3 memakai nama "Jebakan …" untuk siswa, dan judul Bab 19 adalah "Kamus Jebakan". Usulan: siswa memakai nama bahasa guru dalam 7 kelompok, sedangkan kode hanya ada di edisi pengajar (pola Handbook TWK Bab 4).

---

## 1. Bahan yang dibaca

| Bahan | Bagian | Catatan |
|---|---|---|
| Root `CLAUDE.md`, `memory.md` | penuh / baris TIU | format pembahasan 7 langkah; porsi level TIU ditunda Gusti (tidak diangkat di laporan ini) |
| `~/.claude/skills/skd-expert/SKILL.md`, `references/aturan-tetap.md` | penuh | B-14, B-15, C-1a, C-5 |
| `references/tiu.md`, `references/tiu-verbal-figural.md` | penuh / §0, §7 | baris figural di tiu.md usang (temuan 3) |
| `references/domain-skd.md` | penuh | ambang dan skor sudah terverifikasi ke Kepmen 406/2026 |
| `BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md` v0.4 | penuh | 3K, Pilar 1–6, G1–G8, Kamus Jebakan, contoh terbimbing |
| `riset/2026-10-30-log-handbook-tiu.md`, `riset/2026-10-29-pejuang-kedinasan-tiu.md` | penuh | peta 19 bab, usulan pembeda |
| `riset/2026-10-28-log-uji-paket41.md`, `riset/2026-10-28-log-engine-figural-tiu.md` | penuh / baris 14–161, 251–259 | koreksi tabel figural (baris 161) |
| `k12-spatial-engine/src/tiu-*.ts` | daftar nama kesalahan dan teks jebakan | nama tambahan figural |
| `HANDBOOK TWK …/src/11_bab01, 14_bab04, 33_bab14, 80_kunci_latihan, 90_lampiran` | judul + isi patokan waktu | pola seri: angka resmi, nama kesalahan, patokan waktu, L1–L6 |
| `HANDBOOK TKP …/src/11_bab01, 33_bab13, 90_lampiran` | idem | TKP ±30 detik/soal; "77 menit untuk TWK + TIU" |
| `REFERENSI LUAR/KEPMENPANRB 406-2026 …/…pdf` | hlm. 1–7 | lihat Tabel 2A |
| Pejuang V&F (124 hlm.) | hlm. 2–6 (daftar isi, cara pakai, 00 Strategi), 91–95 (Rangkuman, Glosarium, Kunci) | struktur saja |
| Pejuang Numerik (64 hlm.) | hlm. 2–8 (daftar isi, cara pakai, 00 Strategi, tabel Bab 1), 58, 61 (Kunci) | struktur saja |

---

## 2. Bab 1 — Peta TIU hari H

### 2.1 Ide besar dan alasannya
- **Ide:** nilai TIU sama dengan 5 × jumlah jawaban benar, tanpa pengurangan. Ambang 80 berarti 16 jawaban benar dari 35 soal. Satu-satunya hal yang bisa habis adalah waktu, jadi waktu dibagi per blok dan dicek di titik periksa, bukan diurus per soal.
- **Kenapa benar:**
  - 80 ÷ 5 = 16, sedangkan 15 benar baru bernilai 75 < 80.
  - Soal kosong bernilai 0. Tebakan acak di antara 5 opsi bernilai rata-rata 5 × 1/5 = 1 poin. Karena itu, mengosongkan soal tidak pernah lebih baik daripada menebak.
  - Total waktu tetap. Setiap detik lebih di satu soal diambil dari soal lain, sehingga patokan per blok berfungsi sebagai tanda kapan kamu mulai "berutang" waktu.

### 2.2 Subbagian usulan
1. Angka resmi, beserta sumber diktum dan halamannya (Tabel 2A).
2. Isi yang diuji: kisi-kisi resmi → blok soal → bab di buku ini (Tabel 2B, ditandai sebagai tafsiran).
3. Susunan 35 soal menurut tryout rujukan: blok, nomor, jumlah, dan catatan tingkat keyakinan.
4. Hitungan ambang: 16 benar (afirmasi: TIU 55 = 11 benar, dengan kumulatif ≥ 281).
5. Patokan waktu per blok + titik periksa menit (Tabel 2C, berlabel usulan).
6. Kebiasaan melompat soal: batas per soal, tandai, lalu kembali.
7. Cara memakai buku: tulang bab, label target waktu, isi edisi pengajar.
8. Ringkasan satu halaman.

### 2.3 Langkah kerja siswa (hari H)
1. Pegang target: minimal 16 benar dan tidak ada soal kosong.
2. Kenali blok dari jenis soalnya, lalu pakai patokan waktu blok itu.
3. Satu soal sudah melewati 2 × patokannya: pilih jawaban sementara, tandai, lanjutkan.
4. Cek jam di akhir nomor 36, 45, 52, 56, dan 65.
5. Sisa waktu cadangan dipakai untuk soal bertanda. Dahulukan soal yang cek baliknya cepat (hitungan).
6. Menit terakhir: pastikan tidak ada soal yang kosong.

### 2.4 Nama kesalahan (kesalahan strategi; tanpa kode jebakan)
| Nama bahasa guru | Uji singkat |
|---|---|
| Mengosongkan soal | Kosong = 0 = salah. Adakah alasan membiarkannya kosong? (tidak ada) |
| Terpaku di satu soal | Sudah lewat 2 × patokan blok? |
| Mengira subtes lain bisa menutupi | Ambang berlaku untuk tiap subtes (Diktum KEDELAPAN) |
| Menghabiskan cadangan di blok awal | Titik periksa nomor 45 sudah terlewat jauh? |

### 2.5 Bahan internal dan statusnya
| Path / bagian | Isi | Status |
|---|---|---|
| Kepmen 406/2026 (REFERENSI LUAR) hlm. 1, 4–6 | angka resmi | terverifikasi (Tabel 2A) |
| Engine TIU Pilar 2 | komposisi 35 soal, nomor 31–65 | putusan Gusti 2026-10-28; "keyakinan sedang, bukan kisi resmi" (tertulis di engine) |
| Engine TIU Pilar 6 | target 50–55 detik/soal, hitung cepat ≤ 30 detik | draf; bentrok dengan patokan seri (Putusan 1) |
| Handbook TWK `33_bab14.html` "Patokan Waktu"; Handbook TKP `33_bab13.html` "Patokan Waktu saat Ujian" | TWK ±54 detik/soal (±27 menit), TKP ±30 detik/soal (±22,5 menit), "±77 menit untuk 65 soal TWK + TIU" | final, sudah terbit di PDF |
| `riset/2026-10-28-log-uji-paket41.md` | uji Paket 41: TIU 33/35 (salah 60 dan 63, keduanya figural); cacat tryout di 50, 51, 52, 56 | tuntas; bahan cerita Bab 2, bukan Bab 1 |
| `memory.md` root baris 46–63 | komposisi TIU dari dua bimbel tidak konvergen (figural 0 vs 7–9) | catatan keyakinan untuk subbagian 3 |

**Tabel 2A — Angka resmi (KepmenPANRB 406/2026, Nilai Ambang Batas SKD Sekolah Kedinasan TA 2026, ditetapkan 27 Juli 2026)**
| Fakta | Diktum | Halaman PDF |
|---|---|---|
| Nomor dan judul keputusan | — | 1 |
| Kisi-kisi TIU: verbal (analogi, silogisme, analitis), numerik (berhitung, deret angka, perbandingan kuantitatif, soal cerita), figural (analogi, ketidaksamaan, serial) | KEDUA huruf b | 4–5 |
| Durasi SKD 100 menit (tanpa pembagian per subtes) | KETIGA | 5 |
| 110 soal; TIU 35 | KEEMPAT | 5–6 |
| TIU: benar 5, salah atau tidak menjawab 0 | KELIMA huruf a | 6 |
| Nilai tertinggi TIU 175 | KEENAM | 6 |
| Ambang adalah nilai minimal yang wajib dipenuhi setiap peserta; TIU 80 | KETUJUH, KEDELAPAN huruf b | 6 |
| Afirmasi daerah tertentu: kumulatif ≥ 281 dan TIU ≥ 55 | KESEMBILAN, KESEPULUH | 6 |
| Tanggal penetapan 27 Juli 2026 | — | 7 |
| Urutan nomor TIU 31–65 di CAT | — | **tidak ada di Kepmen**; mengikuti tryout rujukan, belum diverifikasi |
| Boleh berpindah bebas antarsubtes dan antarsoal di CAT | — | **tidak ada di Kepmen**; Handbook TKP sudah menulis "urutan terserah", dasar resminya belum diverifikasi |

**Tabel 2B — Kisi-kisi resmi ↔ blok tryout rujukan ↔ bab (tafsiran D'Ajiks, belum diverifikasi)**
| Kisi-kisi resmi | Blok Paket 41 (nomor) | Bab |
|---|---|---|
| Verbal — analogi | analogi kata + hubungan kalimat (35–36) | 3 |
| Verbal — silogisme | silogisme (32, 34) | 4 |
| Verbal — analitis | memperkuat/memperlemah (31, 33); penalaran analitis (53–55) | 5, 12 |
| Numerik — berhitung | estimasi (37); pasangan operasi (41–43) | 6, 7 |
| Numerik — deret angka | suku ke-n, tabel dua kolom, tabel 3×3 (38–40) | 8, 9 |
| Numerik — perbandingan kuantitatif | **tidak tampak sebagai blok.** Kecukupan data (46–52) dan pasangan operasi paling dekat. Aturan-tetap E-2: pasangan ≠ perbandingan kuantitatif | 7, 11 (Putusan 5) |
| Numerik — soal cerita | persen, kerja bersama (44–45); optimasi (56) | 10, 13 |
| Figural — serial | seri (57–58); matriks 3×3 (63–65) | 15, 18 |
| Figural — analogi | analogi gambar (59–60) | 16 |
| Figural — ketidaksamaan | gambar berbeda (61–62) | 17 |
| — (dasar semua figural) | putar, cermin, balik warna, tukar | 14 |

**Tabel 2C — Patokan waktu TIU per blok (USULAN D'AJIKS, BUKAN ATURAN RESMI)**
Dasar hitung: 100 − 27 (TWK, patokan Handbook TWK) − 22,5 (TKP, patokan Handbook TKP) = 50,5 menit untuk TIU. Detik per jenis di bawah adalah taksiran awal dari jumlah langkah pemeriksaan (bukan data siswa). Angka ini wajib dikalibrasi dengan catatan waktu tryout siswa D'Ajiks.
| Blok | Nomor | Soal | Detik/soal | Subtotal | Alasan taksiran | Titik periksa (menit sejak mulai TIU) |
|---|---|---|---|---|---|---|
| Verbal | 31–36 | 6 | 60 | 6:00 | bacaan pendek + uji 5 opsi | akhir no. 36 → 6:00 |
| Numerik | 37 | 1 | 30 | 0:30 | engine Pilar 6: hitung cepat ≤ 30 detik | — |
| Numerik | 38–45 | 8 | 75 | 10:00 | 2–3 langkah hitung + cek balik | akhir no. 45 → 16:30 |
| Kecukupan data | 46–52 | 7 | 90 | 10:30 | tiga pemeriksaan: (1), (2), gabungan | akhir no. 52 → 27:00 |
| Penalaran analitis | 53–55 | 3 | 120 | 6:00 | 3–5 syarat + diagram | akhir no. 55 → 33:00 |
| Optimasi | 56 | 1 | 120 | 2:00 | cek kombinasi, bukan hanya opsi | akhir no. 56 → 35:00 |
| Figural | 57–65 | 9 | 60 | 9:00 | 2–4 objek, dicek per objek | akhir no. 65 → 44:00 |
| Cadangan | — | — | — | 6:30 | soal bertanda | total 50:30 |
Pembanding (Putusan 1): patokan engine 50–55 detik/soal memberi 29:10–32:05 untuk 35 soal.

### 2.6 Beda dengan Pejuang (bab 00 Strategi, dua jilid)
- **Subjudul Pejuang:** V&F: "Gambaran nilai TIU", "Strategi soal verbal", "Strategi soal figural", "Cermin dibandingkan rotasi", "Pengecoh paling umum". Numerik: "Gambaran nilai TIU", "Lima kebiasaan cepat", "Alur kecukupan data", "Pengecoh paling umum". Ada pula halaman "Cara Menggunakan Buku Ini".
- **Cara mereka menjelaskan:**
  - Satu paragraf nilai yang mengutip Kepmen 2025 (208/2025, belum kita verifikasi), lalu kartu lima langkah satu baris tanpa alasan.
  - Patokan waktu umum: ±1 menit per soal dan lewati soal yang melebihi 90 detik.
  - Tidak ada susunan blok soal, tidak ada pembagian waktu per blok, tidak ada sumber halaman.
  - Daftar pengecoh umum ditulis per topik.
- **Yang kita lakukan berbeda:**
  1. Angka resmi 2026 dengan diktum dan halamannya.
  2. Peta kisi-kisi → blok → bab, terang-terangan ditandai sebagai tafsiran.
  3. Susunan 35 soal sesuai urutan hari H, dengan catatan keyakinan.
  4. Patokan waktu per blok, lengkap dengan dasar hitung dan titik periksa menit, selaras dengan Handbook TWK dan TKP.
  5. Hitungan ambang disertai alasan mengapa menebak lebih baik daripada mengosongkan.
  6. Strategi verbal dan figural tidak ditaruh di sini; tempatnya di Bab 2 (kebiasaan) dan Bab 14 (cermin dan putar).

### 2.7 Celah
- Patokan detik per jenis belum punya data siswa. Perlu catatan waktu dari tryout D'Ajiks (Tahap 5 atau sesudahnya).
- Urutan nomor 31–65 dan kebebasan berpindah soal di CAT belum diverifikasi ke sumber resmi.
- "Perbandingan kuantitatif" di kisi-kisi belum punya bab yang jelas (Putusan 5).
- Komposisi Paket 41 berasal dari satu tryout bimbel. Engine menyebutnya "keyakinan sedang", dan dua bimbel tidak konvergen (memory root). Bab 1 wajib menuliskannya.
- Baris figural `references/tiu.md` perlu dibetulkan (bukan file laporan ini; perlu perintah Gusti).

### 2.8 Calon soal (spesifikasi)
| Peran | Jml | Spesifikasi | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Pertanyaan pembuka | 1 | "Berapa jawaban benar paling sedikit untuk lolos ambang TIU?" Angka diambil dari Diktum KELIMA dan KEDELAPAN; varian afirmasi (TIU 55) | lupa membagi bobot; mengira salah dikurangi nilai | hitungan di script build (angka dari Kepmen) |
| Soal dibedah | 0 | diganti "contoh lembar rencana waktu" yang diisi dari Tabel 2C | — | — |
| Latihan | 1 lembar | "Peta diri": siswa mencatat waktu dan benar per blok dari tes diagnosis | — | lembar isian, tanpa angka soal |
| Tes diagnosis (opsional, Putusan 9) | 10 | 2 verbal, 2 numerik, 2 kecukupan data, 1 analitis, 1 optimasi, 2 figural; target ±12 menit | per blok | numerik: `GENERATE SOAL TERBARU SKD 2026/scripts/build-suku-pasangan.js`, `js/bank-soal.js`; kecukupan data: `scripts/build-kecukupan-data*.js`; figural: generator `k12-spatial-engine` (`npm run gen:tiu`); verbal, analitis, optimasi: **belum ada**, dibuat di Tahap 5 |

---

## 3. Bab 2 — Cara berpikir yang tahan uji

### 3.1 Ide besar dan alasannya
- **Ide:** jawaban baru boleh dipegang bila dua hal terbukti:
  - (a) ia lolos cek balik terhadap semua syarat soal;
  - (b) keempat opsi lain gugur karena kesalahan yang bisa dinamai.
- **Kenapa benar:**
  - Klaim "pasti" atau "semua" runtuh oleh satu contoh bantahan. Kalimat "semua X bersifat P" salah tepat bila ada satu X yang tidak bersifat P. Karena itu, satu contoh bantahan cukup untuk mencoret. Sebaliknya, membenarkan butuh pemeriksaan semua kemungkinan atau satu alasan umum.
  - Cek balik membuktikan opsi itu *mungkin* benar, belum membuktikan ia *satu-satunya*. Bila dua opsi lolos, ada kalimat yang salah kamu baca (atau soalnya cacat).
  - Perkiraan bekerja karena kunci pasti terletak di antara batas bawah dan batas atas. Opsi di luar batas itu mustahil menjadi kunci.

### 3.2 Subbagian usulan
1. Soal pembuka: pola yang cocok tiga kali lalu patah di titik keempat.
2. Empat prinsip, masing-masing dengan alasan (Tabel 3A).
3. Lima ide besar TIU dan bab tempat ide itu dipakai (Tabel 3B).
4. Delapan kebiasaan tahan uji, hasil terjemahan Gerbang G1–G8 ke bahasa siswa (Tabel 3C).
5. Tujuh kelompok kesalahan (nama kelompok saja; isi lengkap di Bab 19).
6. Soal dibedah: satu soal per prinsip + satu soal figural.
7. Latihan bertarget waktu (lintas jenis).
8. Ringkasan satu halaman: kartu delapan kebiasaan.

**Tabel 3A — Empat prinsip Gusti → bentuk di buku**
| Prinsip | Kalimat untuk siswa | Contoh alasan "kenapa benar" | Bab utama |
|---|---|---|---|
| 1 Cara cepat + alasan | "Trik tanpa alasan akan lupa di ruang ujian." | ×25 = ×100 lalu ÷4, karena 25 = 100/4; putaran tidak membalik urutan searah jarum jam, cermin membaliknya | 6, 7, 8, 14 |
| 2 Satu ide besar | "Lima ide cukup untuk 35 soal." | Tabel 3B | semua |
| 3 Cek balik + contoh bantahan | "Masukkan jawabanmu kembali; cari satu keadaan yang membantah opsi lain." | logika "semua" vs "ada satu" (3.1) | 4, 11, 12, 17; numerik 6–10, 13; figural 15–18 |
| 4 Perkirakan dulu | "Batasi dulu, baru hitung." | kunci ada di antara batas bawah dan atas | 6, 7, 10, 13; figural: coret kasar dengan satu ciri; verbal: jawab dengan kata sendiri sebelum melihat opsi |

**Tabel 3B — Lima ide besar TIU (usulan)**
| Ide besar | Inti matematisnya | Alasan singkat | Bab |
|---|---|---|---|
| Dunia kemungkinan dan contoh bantahan | "pasti" = benar di semua keadaan yang sesuai data | definisi "semua"; satu pengecualian menggugurkan | 4, 5, 11, 12, 17 |
| Yang tetap saat yang lain berubah | hasil kali tetap bila satu faktor ×k dan faktor lain ÷k; laju × waktu = kerja tetap; selisih tetap pada deret | k ÷ k = 1 | 6, 7, 8, 9, 10, 14–18 |
| Hubungan, bukan bendanya | A:B = C:D bila aturan yang mengubah A menjadi B juga mengubah C menjadi D | yang dipindahkan adalah aturannya, bukan kemiripan benda | 3, 16, 18 |
| Perubahan dipecah menjadi langkah | selisih bertingkat; dua cermin = putar 180°; (1), (2), lalu gabungan | cermin kiri-kanan lalu atas-bawah: setiap titik pindah ke seberang pusat = putar 180° | 8, 9, 11, 14, 15, 18 |
| Batasi dulu, baru hitung | batas bawah dan atas; harga per satuan sebagai batas termurah | kunci tidak mungkin di luar batas | 6, 7, 10, 13 |

**Tabel 3C — Gerbang engine → kebiasaan siswa**
| Gerbang engine | Kebiasaan siswa (kalimat dalam hati) | Bab paling sering |
|---|---|---|
| G1 Keunikan | "Lima opsi, lima nasib": coret setiap opsi dengan alasan, juga sesudah menemukan yang cocok | 12, 15–18 (aturan-tetap B-14) |
| G2 Data cukup | "Pola sah bila berlaku di semua titik": tiga titik cocok belum menjadi bukti | 8, 9, 15, 18 |
| G3 Tanpa asumsi diam | "Hanya yang tertulis": tunjuk kalimat asal setiap angka; tanya "apakah soal sudah menjawab pernyataan ini?" | 4, 10, 11, 12 |
| G4 Opsi saling meniadakan | "Baca opsi sampai titik": SAJA, BERSAMA-SAMA, pasti, mungkin | 4, 11, 12 |
| G5 Bentuk tidak bocor | "Bentuk opsi bukan bukti": jangan menebak dari yang terpanjang, yang tengah, atau satu-satunya pasangan cermin | 3, 7, 8 |
| G6 Pengecoh bernama | "Setiap opsi salah punya asal": cari langkah keliru yang melahirkannya; bila jawabanmu sama dengan asal itu, cek langkahmu | 6–10 |
| G7 Konteks dan fakta | "Premis menang atas akal sehat; satuan dicek" | 4, 5, 10 |
| G8 Paket | "Soal mirip belum tentu kuncinya sama": baca ulang data, jangan menjawab dari ingatan | 11, 15–18 |
| Uji siswa teliti | "Bisakah aku membela opsi terkuat kedua dengan teks soal saja? Bisa → baca ulang kalimat penentu." | semua |

### 3.3 Langkah kerja siswa (berlaku di semua blok)
1. Tentukan yang ditanya dan kalimat penentunya.
2. Perkirakan: batas angka, ciri kasar gambar, atau jawaban dengan kata sendiri.
3. Kerjakan cara cepat yang alasannya kamu tahu.
4. Cek balik jawaban ke semua syarat.
5. Coret empat opsi lain, masing-masing dengan nama kesalahannya.
6. Ada dua opsi yang bertahan → baca ulang kalimat penentu. Tetap dua → pilih, tandai, lanjutkan.

### 3.4 Nama kesalahan yang dipakai
Bab 2 memperkenalkan tujuh **nama kelompok** (rinci di Bab 4.3). Contoh di bab ini memakai:
| Nama bahasa guru | Kode |
|---|---|
| Menyimpulkan pola dari terlalu sedikit angka | J-TIGA |
| Memakai info yang tidak ada di soal | J-ASUMSI |
| Berhenti setelah pernyataan (1) cukup | J-BERHENTI |
| Benar di dunia nyata, tapi bukan dari soal | J-AKAL |
| Cuma memeriksa satu objek | figural, usulan JF-OBJEK |
| Berhenti satu langkah sebelum selesai | J-LANGKAH |

### 3.5 Bahan internal dan statusnya
| Path / bagian | Isi | Status |
|---|---|---|
| Engine TIU: "FILOSOFI INTI — 3K", Pilar 1 (hukum data lengkap), Gerbang G1–G8, uji siswa teliti | sumber kebiasaan | draf v0.4, belum diuji paket nyata |
| Engine TIU "CONTOH TERBIMBING" 1 (kecukupan data, relawan) dan 2 (suku ke-n, titik ke-4) | dua soal D'Ajiks lengkap dengan nama pengecoh | draf engine; bisa dipakai sebagai soal pembuka atau soal dibedah (koordinasi dengan subagen C/D agar tidak dobel) |
| `aturan-tetap.md` B-14, B-15; `tiu.md` "Pelajaran uji Paket 41" | berhenti di pola pertama; asumsi tidak diuji; optimum wajib dicek ke semua kombinasi | final |
| `riset/2026-10-28-log-uji-paket41.md` | salah 60 dan 63 (figural); cacat tryout di 50, 51, 52, 56 | cerita bab (nama tryout tidak disebut di edisi siswa, mengikuti preseden TWK L6) |
| `k12-spatial-engine/src/tiu-fig-ana-mtx.ts`, `tiu-fig-beda-seri.ts` | teks "jebakan" siap pakai: "berhenti setelah objek pertama cocok", "kembali tegak" | sudah lolos pemeriksa mesin + cek mata (paket 2026-10-29) |
| Handbook TWK Bab 4 ("Dua Kebiasaan sebelum Mencoret Pilihan", "Menamai Setiap Pilihan"); Handbook TKP Bab 13 ("Tiga Langkah untuk Satu Soal") | pola seri | final; kebiasaan TIU sebaiknya senada |

### 3.6 Beda dengan Pejuang
- **Padanan:** tidak ada bab padanan. Yang paling dekat adalah kartu di 00 Strategi: verbal langkah ke-5 "contoh penyangkal", figural "uji dua baris", numerik "uji opsi" dan "lihat opsi dulu; jika berjauhan, estimasi".
- **Cara mereka menjelaskan:** satu baris per kartu, tanpa alasan, terpisah per jilid.
- **Yang kita lakukan berbeda:**
  1. Satu bab utuh yang menyatukan semua blok.
  2. Alasan logis untuk setiap kebiasaan (3.1).
  3. Lima ide besar beserta peta bab.
  4. Setiap opsi salah dinamai, dan nama itu dipakai ulang di bab 3–18.
  5. Perkiraan disertai batasnya: kapan cukup (opsi berjauhan) dan kapan wajib hitung tepat (pengecoh dibuat berdekatan, engine Pilar 6).

### 3.7 Celah
- Belum ada soal D'Ajiks untuk silogisme, argumen, analitis, optimasi, dan estimasi. Semuanya perlu dibuat dengan script di Tahap 5.
- Prinsip 4 (perkirakan dulu) untuk verbal dan figural belum ada rumusannya di engine. Usulan di Tabel 3A perlu persetujuan.
- Istilah "kalimat kunci" (engine 3K) berbeda dengan "kalimat penentu" (Handbook TWK/TKP) (Putusan 2).
- Lima ide besar adalah usulan subagen A. Subagen B–E bisa menambah atau mengganti setelah membaca babnya.

### 3.8 Calon soal (spesifikasi)
| Peran | Jml | Keluarga dan bentuk | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Pembuka | 1 | suku ke-n tabel 4 titik; tiga titik pertama cocok dengan pola selisih tetap, titik keempat membantah | J-TIGA, J-RATA, J-NOMOR, J-KONST | script gaya `GENERATE SOAL TERBARU SKD 2026/scripts/build-suku-pasangan.js` (fungsi f(n) + cek aturan lain otomatis), atau Contoh terbimbing 2 engine bila Bab 8 tidak memakainya |
| Dibedah · prinsip 1 | 1 | pasangan operasi "a × b dan c × d" | J-SISI (≥ 2 opsi), J-CERMIN | `build-suku-pasangan.js` (15 pasangan yang ada) atau soal baru dari script yang sama |
| Dibedah · prinsip 2 | 2 | silogisme "pasti benar" berpasangan dengan kecukupan data ya/tidak (satu ide: dunia kemungkinan) | J-SEBAGIAN, J-BALIK, J-AKAL, J-KATA / J-ASUMSI, J-PENGALIH | silogisme: script `dunia()` baru; kecukupan data: Contoh terbimbing 1 engine |
| Dibedah · prinsip 3 | 1 | analitis "pilih susunan yang memenuhi"; setiap syarat menggugurkan ≥ 1 opsi | J-ASUMSI + calon nama baru "urutan sebagian dianggap urutan penuh" | script baru (engine Pilar 4 ANA: uji syarat per opsi) |
| Dibedah · prinsip 4 | 1 | hitung cepat; batas bawah–atas hanya menyisakan satu opsi | J-LANGKAH, J-SEDERHANA, J-TANDA | script baru |
| Dibedah · figural | 1 | analogi per objek; pengecoh salah di satu objek | cuma memeriksa satu objek; arah putar terbalik | generator jenis FIG-ANA-OBJ (`npm run gen:tiu`) |
| Latihan bertarget waktu | 8 | 2 verbal, 2 numerik, 1 kecukupan data, 1 analitis, 2 figural; tiap soal diberi label kebiasaan yang dilatih; target dari Tabel 2C | campuran tujuh kelompok | script / generator di atas; tidak boleh sama dengan latihan bab 3–18 |

---

## 4. Bab 19 — Kamus Jebakan TIU + peta hari H

### 4.1 Ide besar dan alasannya
- **Ide:** setiap opsi salah adalah jawaban benar untuk soal yang salah dibaca. Ia lahir dari satu langkah keliru. Langkah keliru yang sama muncul di banyak jenis soal: "berhenti terlalu cepat" ada di kecukupan data, pasangan operasi, dan matriks gambar. Mengenali tujuh kelompok lebih hemat daripada menghafal ±35 nama.
- **Kenapa benar:** di soal D'Ajiks, setiap opsi salah dihitung dari fungsi kesalahan yang bernama (engine Pilar 3, G6). Karena itu, nama kesalahannya selalu bisa ditemukan. Untuk soal pihak luar hal ini tidak dijamin, sebab pengecoh mereka bisa acak, dan bab ini wajib menyebutnya.

### 4.2 Subbagian usulan
1. Soal pembuka: satu soal, empat opsi salah, empat asal kesalahan.
2. Tujuh kelompok kesalahan: nama, uji singkat, bab tempat diajarkan (Tabel 4A).
3. Kesalahan khusus gambar, dimasukkan ke kelompok yang sama (bukan daftar terpisah).
4. Membaca hasil tryout sendiri: menghitung nama yang berulang (pola TWK: "tiga kali tertipu pola yang sama → latih pola itu").
5. Peta hari H satu halaman: blok, nomor, patokan waktu, kesalahan yang dipasang engine di blok itu, kebiasaan uji.
6. Latihan menamai kesalahan.
7. Edisi pengajar: padanan nama dan kode (pola Handbook TWK Bab 4, "Padanan Nama dan Kode serta Penggunaannya di Kelas").

### 4.3 Langkah kerja siswa
1. Bandingkan jawabanmu yang salah dengan kunci.
2. Tanyakan "langkah mana yang melahirkan angka atau gambar ini?"
3. Cocokkan dengan tujuh kelompok, lalu tulis namanya.
4. Hitung nama yang muncul ≥ 3 kali, lalu buka bab rujukannya.
5. Sebelum ujian, baca peta hari H dan kartu tujuh kelompok.

### 4.4 Tabel 4A — Gabungan Kamus Jebakan (engine Pilar 3 + Pilar 4 FIG + nama generator)
Nama ditulis dalam bahasa guru. Kolom "kode" hanya untuk edisi pengajar. Kode JF-* adalah **usulan subagen A dan belum ada di engine**.

**Kelompok 1 — Menambah atau terpancing data** ("Hanya yang tertulis")
| Nama bahasa guru | Kode | Uji singkat | Bab |
|---|---|---|---|
| Memakai info yang tidak ada di soal | J-ASUMSI | kalimat mana yang memberi info ini? | 10, 11, 12 |
| Terpancing angka yang tidak dipakai (atau mengira data itu perlu) | J-PENGALIH | dicoret, apakah jawabannya berubah? | 6, 10, 11, 13 |
| Benar di dunia nyata, tapi bukan dari soal | J-AKAL | lahir dari premis atau dari pengetahuanku? | 4, 5 |
| Terkecoh bentuk yang mencolok | usulan JF-BENTUK | ciri ini berlaku di semua gambar? | 17, 18 |

**Kelompok 2 — Berhenti terlalu cepat** ("Cek sampai habis")
| Nama | Kode | Uji | Bab |
|---|---|---|---|
| Berhenti setelah pernyataan (1) cukup | J-BERHENTI | (2) sudah dicek sendiri? | 11 |
| Berhenti satu langkah sebelum selesai | J-LANGKAH | ini yang ditanya, atau hasil antara? | 6, 7, 8, 10 |
| Cuma menghitung satu sisi | J-SISI | sisi kanan sudah dihitung? | 7 |
| Menyimpulkan pola dari terlalu sedikit angka | J-TIGA | pola diuji di semua titik? | 8, 9 |
| Cuma memeriksa satu objek | usulan JF-OBJEK | setiap objek sudah dicek sendiri? | 15, 16 |
| Baru satu perubahan, lupa yang kedua | usulan JF-LANGKAH2 | ada perubahan kedua? | 16, 18 |
| Lupa membalik warna | usulan JF-WARNA | warna dicek terpisah dari arah? | 14, 16 |
| Lupa menukar tempat | usulan JF-TUKAR | posisi objek dicek? | 14, 16 |

**Kelompok 3 — Arah terbalik** ("Ke mana arahnya?")
| Nama | Kode | Uji | Bab |
|---|---|---|---|
| Arahnya dibalik (akibat dianggap sebab; urutan pasangan tertukar) | J-BALIK | A:B atau B:A? jika-maka dibaca terbalik? | 3, 4 |
| Mengira makin banyak, makin lama (berbalik nilai dihitung searah) | J-SEARAH | ditambah pekerja → waktu naik atau turun? | 10, 11 |
| Salah tanda atau urutan pengurangan terbalik | J-TANDA | siapa dikurangi siapa? | 6, 9 |
| Persen dari angka yang salah | J-BASIS | "dari" menunjuk ke angka mana? | 6, 10, 11, 13 |
| Arah putarnya terbalik | usulan JF-ARAH | ikuti satu ujung bentuk | 14, 15, 16, 18 |
| Diputar, padahal dicermin (atau sebaliknya) | usulan JF-PUTCER | urutan searah jarum jam tetap atau terbalik? | 14, 16, 17 |
| Cermin di garis yang salah | usulan JF-SUMBU | ujung pindah kiri-kanan atau atas-bawah? | 14, 16, 18 |

**Kelompok 4 — Salah baca kata penentu** ("Baca katanya, bukan kesannya")
| Nama | Kode | Uji | Bab |
|---|---|---|---|
| Batas dibaca terlalu longgar atau terlalu ketat ("kurang dari" vs "paling lama") | J-BATAS | hasil tepat sama dengan batas, termasuk atau tidak? | 10, 11 |
| "Tidak boleh" dibaca "tidak pernah" | J-IZIN | premisnya fakta atau izin? | 4 |
| "Sebagian" dibaca "semua" | J-SEBAGIAN | kata pengukurnya apa? | 4 |

**Kelompok 5 — Pola yang dipaksakan** ("Pola harus berlaku di semua titik")
| Nama | Kode | Uji | Bab |
|---|---|---|---|
| Mengira naiknya selalu sama | J-RATA | selisihnya tetap di semua langkah? | 8 |
| Lupa angka tetapnya | J-KONST | rumus dicek di titik pertama? | 8 |
| Tertipu angka yang tampak bertukar | J-CERMIN | dihitung, atau hanya dilihat? | 7 |
| Mengira bentuk kembali ke awal | usulan JF-AWAL | perubahannya berlanjut atau berulang? | 15, 18 |
| Menyalin gambar sebelah | usulan JF-SALIN | sel terakhir masih kena perubahan? | 15, 18 |

**Kelompok 6 — Meleset di hitungan** ("Hitung ulang dari arah lain")
| Nama | Kode | Uji | Bab |
|---|---|---|---|
| Salah hitung nomor suku | J-NOMOR | langkah atau nomor? | 8 |
| Salah menyederhanakan pecahan | J-SEDERHANA | kalikan balik: kembali ke asal? | 6 |
| Hitungan meleset satu | usulan JF-HITUNG | hitung dua kali dari arah berbeda | 16, 17, 18 |

**Kelompok 7 — Mirip, tapi bukan jawabannya** ("Hapus kata yang sama, apa yang tersisa?")
| Nama | Kode | Uji | Bab |
|---|---|---|---|
| Cuma mengulang kata di soal (nama sama dengan Handbook TWK pola 5) | J-KATA | tanpa kata yang sama, masih cocok? | 3, 4, 5 |
| Cuma mengulang kesimpulan | J-ULANG | ini bukti baru atau klaim yang diulang? | 5 |

**Nama tambahan dari generator (belum ada di engine), usulan kelompok:** "perubahan dikerjakan satu kali terlalu banyak" (6) · "arah pindahnya terbalik" (3) · "urutan objek ikut berubah" (5) · "bagian yang sama ikut dibuang, padahal digabung" (5) · "salah ambil kolom" (2) · "lupa menumpulkan ujung" (2) · "bentuk benar, titik pojoknya salah" (2) · "arah hitung terbalik" (3). Sumber: `k12-spatial-engine/src/tiu-fig-ana-mtx.ts`, `tiu-fig-beda-seri.ts`, `tiu-fig-siluet.ts`, `tiu-fig-ubah.ts`.

**Kesalahan tanpa kode (celah; menunggu laporan B–E):**
- argumen: opsi yang relevan dengan topik tetapi tidak menyentuh hubungan bukti dan kesimpulan (disebut di spesifikasi ARG engine, tanpa kode);
- ingkaran salah, "semua" → "semua tidak" (disebut di spesifikasi EKV, tanpa kode);
- analitis: urutan sebagian dianggap urutan penuh (Paket 41 no. 55);
- optimasi: berhenti di kombinasi yang ada di opsi, atau memilih harga per satuan termurah tanpa cek sisa (B-15).

### 4.5 Bahan internal dan statusnya
| Path / bagian | Isi | Status |
|---|---|---|
| Engine TIU Pilar 3 | 21 kode + nama "Jebakan …" + keluarga | draf v0.4 |
| Engine TIU Pilar 4 FIG, "Kamus Jebakan figural" | 11 nama tanpa kode | draf v0.4 |
| `k12-spatial-engine/src/tiu-*.ts` | ±8 nama tambahan + teks jebakan per jenis | dipakai di 3 paket figural (`.test-out-paket/`), menunggu kesan Gusti |
| Handbook TWK `14_bab04.html` | sepuluh nama bahasa guru + bagian pengajar "Padanan Nama dan Kode" | final; preseden format |
| Root `CLAUDE.md` + aturan-tetap C-5 | larangan istilah dapur dan nama Kamus Jebakan TIU di pembahasan siswa | putusan Gusti 2026-10-25 |

### 4.6 Beda dengan Pejuang (Rangkuman Cepat dan Glosarium)
- **Subjudul Pejuang:** "Rangkuman cepat tiap bab", "Glosarium istilah" (hanya di jilid V&F; jilid Numerik memakai "kartu rumus" per bab dan tidak punya rangkuman di akhir).
- **Cara mereka menjelaskan:** 13 kotak (2–3 butir trik per bab, disusun per topik), lalu ±24 istilah logika dan figural beserta definisi satu kalimat.
- **Yang kita lakukan berbeda:**
  1. Disusun menurut **kesalahan**, bukan topik. Satu kelompok menyatukan verbal, numerik, dan figural.
  2. Setiap nama punya uji satu kalimat dan rujukan bab.
  3. Ada peta hari H (urutan blok + patokan waktu + titik periksa), yang tidak dimiliki Pejuang.
  4. Ada latihan menamai kesalahan.
  5. Glosarium hanya bila Gusti memintanya (Putusan 10).

### 4.7 Celah
- Kode figural belum ada di engine (usulan JF-* perlu persetujuan, dan perubahan engine harus lewat usulan).
- Ada empat kesalahan tanpa kode (lihat 4.4).
- Judul "Kamus Jebakan" bentrok dengan C-5 (Putusan 3).
- Kolom "kesalahan tersering per blok" di peta hari H tidak boleh diisi tanpa data siswa. Diganti dengan "kesalahan yang dipasang engine di blok itu".
- Nama-nama di bab 3–18 harus memakai bunyi yang persis sama dengan Tabel 4A. Bab 19 baru bisa dikunci setelah laporan B–E masuk.

### 4.8 Calon soal (spesifikasi)
| Peran | Jml | Spesifikasi | Sumber pembuat |
|---|---|---|---|
| Pembuka | 1 | satu soal numerik; empat opsi salah berasal dari empat kelompok berbeda; tugas siswa: "tebak langkah yang melahirkan tiap opsi" | script baru dengan format JSON engine (`opsi[].jebakan` wajib terisi) |
| Contoh dibedah | 7 kartu | satu contoh satu baris per kelompok, **merujuk soal yang sudah ada di bab 3–18** (tanpa angka baru) | rujukan silang dari data bab |
| Latihan | 14 | "Namai kesalahannya": soal dari bab 3–18 dengan satu opsi salah disorot; siswa menulis nama dan bab rujukan; 2 per kelompok; target ±30 detik/butir | memakai soal yang sudah ada; tanpa soal baru |
| Peta hari H | 1 halaman | tabel blok, nomor, patokan waktu (Tabel 2C), dua kesalahan yang dipasang engine di blok itu, kebiasaan uji (Tabel 3C) | dari data Bab 1 dan Bab 2 |

---

## 5. Lampiran — Pembahasan semua soal + tabel ringkas

### 5.1 Ide besar dan alasannya
- **Ide:** pembahasan adalah tempat keempat prinsip diuji ulang. Setiap kunci ditunjukkan bisa dicek balik, dan setiap opsi salah ditunjukkan asalnya.
- **Kenapa:** siswa yang hanya mencocokkan huruf tidak belajar apa pun (Handbook TWK, "Cara Menggunakan Buku Ini"). Siswa yang menemukan nama kesalahannya tahu bab mana yang perlu diulang.

### 5.2 Subbagian usulan
1. Kunci dan pembahasan, disusun per bab (urutan sama dengan buku).
2. Tabel ringkas (5.4).
3. Edisi pengajar L1–L6 bila disetujui (Putusan 7): sumber dan status verifikasi · hal yang belum boleh dikutip ke siswa · aturan menulis soal TIU (ringkasan engine v0.4) · rencana pertemuan · membaca kesalahan siswa (nama ↔ kode) · asal soal dan contoh (script/generator + path).

### 5.3 Format pembahasan (7 langkah root `CLAUDE.md`, ditambah prinsip Gusti)
| Langkah | Isi | Prinsip | Catatan |
|---|---|---|---|
| 1 Pratinjau | soal lengkap + 5 opsi; figural **wajib bergambar** (`tiu-verbal-figural.md` §7) | — | satu sumber data dengan halaman soal |
| 2 Yang sebenarnya ditanya | satu kalimat + kutip kalimat penentu | — | menampung langkah "kalimat kunci" engine |
| 3 Langkah / cara cepat | perkiraan dulu → cara cepat → satu kalimat "kenapa cara ini benar" | 4, 1 | menampung "cara kilat + cara paham" engine |
| 4 Kenapa tiap opsi lain gugur | empat opsi, masing-masing dengan nama bahasa guru (Tabel 4A) | 3 | kode hanya di edisi pengajar |
| 5 Kunci + alasan satu kalimat | ditambah satu kalimat cek balik | 3 | — |
| 6 Analogi sehari-hari | satu analogi | — | — |
| 7 Jebakan di soal ini | kesalahan paling mungkin + kenapa orang terjebak | — | — |
- **Gaya:** sapaan "kamu", tanpa frasa yang dilarang, "maka"/"karena itu" paling banyak 1×, bebas istilah dapur (C-5).
- **Tautan dua arah** soal ↔ pembahasan (preseden: tombol "Kembali ke soal" di `HANDBOOK TWK …/src/80_kunci_latihan.html` + `build.py`).
- **Format data per butir** = JSON engine (`opsi[].jebakan`, `pembahasan.{ditanya, cara_kilat, langkah, opsi_gugur, alasan_kunci, analogi, jebakan}`), lalu dibangun oleh `build.py` seperti handbook TWK/TKP.

**Status format pembahasan yang sudah ada (perlu disesuaikan):**
| Sumber | Bentuk saat ini | Selisih dengan format 7 langkah |
|---|---|---|
| `GENERATE SOAL TERBARU SKD 2026/js/pembahasan.js` (30 deret tabel CAT) | 3 bagian: pola, langkah, jawaban | belum ada opsi gugur bernama, analogi, jebakan |
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-kecukupan-data*.js` (20 soal) | 7 langkah versi kecukupan data | belum ada nama kesalahan per opsi (perlu dicek per butir) |
| `scripts/build-suku-pasangan.js`, `build-deret-tabel-lv56.js` | PDF pembahasan | belum diperiksa per butir di Tahap 1 |
| `k12-spatial-engine` (fungsi `teks` di `tiu-fig-beda-seri.ts`) | yang ditanya · cara cepat · opsi gugur · kunci · analogi · jebakan | sudah dekat; tinggal menambah kalimat "kenapa benar" dan cek balik |

### 5.4 Tabel ringkas (usulan isi; semua angka dibangkitkan script dan dicek otomatis, tidak diketik tangan)
| Tabel | Isi | Baris "kenapa benar" | Bab rujukan |
|---|---|---|---|
| T1 | kuadrat 1–30 | (n+1)² = n² + 2n + 1, jadi tiap kuadrat = sebelumnya + bilangan ganjil berikutnya | 6, 8, 9 |
| T2 | pangkat tiga 1–12; pangkat 2 sampai 2¹², pangkat 3 sampai 3⁷ | kali berulang | 6, 8 |
| T3 | pecahan ↔ desimal ↔ persen (½ s.d. 1/16, ⅓, ⅔, ⅙, ⅚, 1/9, 1/12) | persen = per seratus; a/b = (a × 100/b)% | 6, 10 |
| T4 | trik kali (×5, ×25, ×125, ×11, kuadrat berakhiran 5) | ×25 = ×100 ÷ 4; (10a + 5)² = 100a(a + 1) + 25 | 6, 7 |
| T5 | pasangan faktor yang hasilnya bulat (4 × 25, 8 × 125, 16 × 625) | 2ᵏ × 5ᵏ = 10ᵏ | 7 |
| T6 | rumus suku ke-n: selisih tetap, selisih bertingkat dua | jumlah selisih dari suku 1 sampai n | 8 |
| T7 | huruf ↔ nomor 1–26 dan huruf dari belakang (27 − n) | posisi di alfabet | 8 (deret huruf) |
| T8 | jam desimal ↔ menit (0,25 jam = 15 menit, dst.) | 1 jam = 60 menit | 10 |
| T9 | bunyi lima opsi kecukupan data (templat engine Pilar 5) | opsi saling meniadakan | 11 |
| T10 | putar dan cermin: arah ujung, padanan (putar 90° berlawanan = putar 270° searah), gabungan (dua cermin = putar 180°) | putaran menjaga urutan searah jarum jam, cermin membaliknya | 14–18 |

### 5.5 Beda dengan Pejuang (Kunci Jawaban dan Pembahasan; tabel di Numerik Bab 1)
- **Subjudul Pejuang:** "Kunci Jawaban dan Pembahasan". Isinya baris kunci per bab, lalu blok "Soal x.y · Jawaban X".
- **Cara mereka menjelaskan:**
  - Semua soal latihan dibahas (V&F 108, Numerik 66) dalam 1–4 kalimat.
  - Sebagian pembahasan menyebut asal satu atau dua pengecoh; opsi lain tidak dibahas.
  - Tanpa pratinjau soal, tanpa analogi, tanpa bagian jebakan, tanpa tautan balik.
  - Tabel hafalan (pecahan–desimal–persen, kuadrat 11–25, pangkat tiga, trik ×5/×25/×125/×11) ada di Numerik Bab 1, berisi kolom trik dan contoh tanpa alasan.
- **Yang kita lakukan berbeda:**
  1. Pembahasan 7 langkah dengan pratinjau soal.
  2. Keempat opsi salah dinamai dengan nama yang sama di seluruh buku.
  3. Ada cek balik, analogi, jebakan, dan tautan dua arah.
  4. Tabel ringkas dikumpulkan di lampiran, setiap tabel diberi baris "kenapa benar", angkanya dihasilkan script.
  5. Edisi pengajar dengan sumber dan status verifikasi.

### 5.6 Celah
- Belum ada script build untuk tabel ringkas (T1–T10).
- Format pembahasan bank lama berbeda-beda (5.3) dan perlu ditulis ulang bila soalnya dipakai.
- Engine memakai 8 langkah, root `CLAUDE.md` memakai 7 (Putusan 6).
- Jumlah pembahasan bergantung pada rencana contoh dan latihan Tahap 2.
- T7 (deret huruf) dan T10 bergantung pada keputusan subagen C dan E.

### 5.7 Calon soal
Lampiran tidak membuat soal baru. Jumlah pembahasan = jumlah soal pembuka + soal dibedah + latihan semua bab (ditetapkan di Tahap 2). Tabel ringkas dibuat oleh script build baru, misalnya `src/tabel_ringkas.py` di folder handbook (belum ada), dengan pemeriksaan otomatis.

---

## 6. Putusan yang perlu diminta ke Gusti (urut prioritas)

1. **Patokan waktu TIU.**
   - (a) ±50,5 menit per Tabel 2C, selaras dengan patokan Handbook TWK dan TKP (rekomendasi);
   - (b) 50–55 detik/soal menurut engine Pilar 6 (±30 menit).
   - Bila (a) dipilih, angka di engine Pilar 6 ikut disesuaikan lewat usulan.
2. **Istilah untuk siswa:** "kalimat penentu" (seragam dengan Handbook TWK/TKP, rekomendasi) atau "kalimat kunci" (engine 3K).
3. **Bab 19 dan aturan C-5:** siswa memakai nama bahasa guru dalam 7 kelompok, dan kode hanya di edisi pengajar (rekomendasi). Judul bab tetap "Kamus Jebakan TIU" atau diganti, misalnya "Tujuh Kelompok Kesalahan TIU".
4. **Kode figural JF-\* (11 usulan) dan empat kesalahan tanpa kode:** diajukan sebagai usulan perubahan engine TIU atau cukup dipakai di handbook.
5. **"Perbandingan kuantitatif"** (kisi-kisi resmi) tidak tampak di Paket 41: perlu subbagian sendiri (misalnya di Bab 7 atau 11) atau cukup dicatat sebagai tafsiran di Bab 1. Koordinasi dengan subagen C.
6. **Format pembahasan:** 7 langkah root `CLAUDE.md` yang menampung kalimat penentu dan cara kilat engine (rekomendasi), atau 8 langkah engine.
7. **Lampiran pengajar L1–L6** seperti Handbook TWK/TKP: ya/tidak.
8. **Tulang bab untuk Bab 1 dan 19 disesuaikan:**
   - Bab 1: tanpa soal dibedah, latihan diganti lembar rencana waktu;
   - Bab 19: latihan = menamai kesalahan, tanpa soal baru.
9. **Tes diagnosis 10 soal baru di Bab 1:** ya/tidak.
10. **Glosarium istilah singkat** di Bab 19 atau lampiran: ya/tidak.
11. **Nama tryout rujukan** (Paket 41) tidak disebut di edisi siswa dan hanya dicatat di L1/L6 pengajar (mengikuti preseden TWK).
12. **Perbaikan baris figural `references/tiu.md`** ("seri 3 · analogi 1" → seri 2 · analogi 2) dan hitungan "21 + J-BASIS" → 21: perlu perintah untuk mengubah file skill.

## 7. Koordinasi dengan subagen B–E
- Bab 2 memakai satu contoh dari tiap rumpun. Soalnya tidak boleh sama dengan soal pembuka atau soal dibedah di bab 3–18.
- Contoh terbimbing engine (kecukupan data relawan; suku ke-n titik ke-4) hanya dipakai di satu tempat.
- Nama kesalahan di laporan B–E perlu dicocokkan dengan Tabel 4A sebelum Bab 19 dikunci.
- Tabel ringkas T1–T8 tumpang tindih dengan Bab 6–10 (subagen C); T10 dengan Bab 14 (subagen E). Lampiran memuat ringkasan, bab memuat alasan lengkap.
