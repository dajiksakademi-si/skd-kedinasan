# Tahap 1 — Bagian D: Bab 11 Kecukupan Data · Bab 12 Penalaran Analitis · Bab 13 Optimasi Tabel

Disusun 2026-10-30 oleh subagen D (baca bahan saja). Tidak ada soal, angka soal, atau kunci baru di laporan ini. Calon soal ditulis sebagai spesifikasi.

**Bahan yang dibaca**
- Root `CLAUDE.md`; skill `skd-expert`: `SKILL.md`, `references/aturan-tetap.md`, `references/tiu.md`, `references/tiu-verbal-figural.md` (§0, aturan umum, §4, §8–9).
- Engine TIU v0.4: Pilar 1–6, Kamus Jebakan, G1–G8, Contoh terbimbing 1 (`BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md`).
- `BIG DATA/GENERATE SOAL TERBARU SKD 2026/`: `CLAUDE.md` (bagian kecukupan data), `memory.md`, `scripts/build-kecukupan-data.js`, `scripts/build-kecukupan-data-paket2.js` (hanya dibaca, tidak dijalankan).
- Riset: `2026-10-30-log-handbook-tiu.md`, `2026-10-29-pejuang-kedinasan-tiu.md`, `2026-10-25-tiu-2026-logika-celah.md` (§3, §8), `2026-10-25-al-faiz-56-65-tiu.md` (no. 56), `2026-10-28-log-uji-paket41.md`, `2026-10-30-log-tiu-paket1.md` (rencana TO Paket 1, ditemukan saat membaca).
- Tangkapan layar Paket 41 Al Faiz no. 46–56 (`SOAL PAKET 41 AL FAIZ/TIU/`, berkas ke-16 s.d. ke-26), dipotong di scratchpad untuk dibaca. Soal 53, 54, 56 diperiksa ulang dengan program di scratchpad (tidak di folder project).
- Pejuang Kedinasan (struktur saja): Numerik hlm. cetak 3–4 dan 51–56 (Bab 08); Verbal & Figural hlm. cetak 31–47 (Bab 05, 06).
- Pola alat pemeriksa di psiko-cat (hanya kepala berkas): `scripts/check-kecerdasan-kck.ts`, `scripts/cek-wacana-kal.ts`, `scripts/cek-wacana-p6.ts`.

---

## 0. Temuan terpenting

1. **Satu ide besar menyatukan ketiga bab: "dunia kemungkinan".** Cukup (Bab 11) = semua keadaan yang tersisa memberi satu jawaban. Pasti benar (Bab 12) = benar di semua susunan yang tersisa. Termurah (Bab 13) = paling murah di antara semua kombinasi yang sah, bukan di antara lima opsi. Satu contoh bantahan menggugurkan klaim "cukup/pasti"; satu contoh cocok tidak membuktikannya. Ide ini juga menyambung ke Bab 4 (silogisme) dan Bab 2 (cara berpikir tahan uji).
2. **Lima bentuk KCK di engine tidak konsisten.** Pilar 2: aljabar · nilai vs batas · ya/tidak + laju · rasio · persen. Pilar 4: aljabar · nilai vs batas · ya/tidak + laju · tiga pernyataan · berbalik nilai. Rencana TO Paket 1 memakai gabungan tujuh. Bentuk yang benar-benar muncul di Paket 41 (46–52): aljabar, nilai dari cerita/tabel, ya/tidak + laju (3 soal), rasio, persen. Tiga pernyataan dan nilai vs batas tidak muncul di Paket 41.
3. **Kunci resmi hari H kadang berasumsi.** Paket 41 no. 50: jumlah mesin awal tidak tertulis, kunci resmi (A) menganggap angka di pernyataan = jumlah awal; logika ketat = E. Pola yang sama ada di Part 39 no. 49. Paket 41 no. 48 dan 52 memakai satu kerangka. Handbook perlu sikap tegas: mengajarkan logika ketat sekaligus memberi tahu kebiasaan pembuat soal.
4. **Penalaran analitis bentuk "pilih susunan" di Al Faiz dua kali punya syarat yang tidak berguna** (Part 39 no. 56 dan Paket 41 no. 53: syarat posisi tetap dipenuhi kelima opsi). Pelajaran untuk siswa: dalam bentuk ini, syarat paling ketat belum tentu syarat yang paling berguna; lihat dulu di mana opsi berbeda.
5. **Bab 13 belum punya bahan sama sekali** (0 soal, 0 program). Paket 41 no. 56: optimum sebenarnya tidak ada di opsi (dicek ulang 2026-10-30, sama dengan log 2026-10-28). Pejuang tidak punya bab optimasi; padanan hanya untuk subbagian membaca data (V&F 06).
6. **Bahan KCK internal kuat, tetapi sudah beredar ke siswa** (20 soal). Paket 2 punya pemeriksa semua kemungkinan yang lengkap; Paket 1 belum (kunci diketik manual, satu bunyi opsi E lemah). Penalaran analitis: belum ada soal SKD sendiri; ada pola pemeriksa di psiko-cat.
7. **Kamus Jebakan belum punya kode untuk sebagian besar kesalahan membaca di KCK, analitis, dan optimasi.** Laporan ini memakai nama bahasa guru; baris tanpa kode ditandai "belum ada kode".

---

## 0b. Benang merah (usulan untuk ditaruh di Bab 2, dipakai ulang di Bab 11–13)

| Istilah siswa | Bab 11 | Bab 12 | Bab 13 |
|---|---|---|---|
| Dunia = satu keadaan yang mungkin | satu pasang nilai yang memenuhi pernyataan | satu susunan duduk/urutan | satu kombinasi paket |
| Syarat mencoret dunia | pernyataan (1), (2) | syarat (1)–(n) | kebutuhan minimal, kelebihan maksimal |
| Yang ditanya | apakah jawabannya tunggal | apa yang benar di semua/sebagian susunan | kombinasi termurah di semua yang sah |
| Bukti "tidak" | dua dunia, jawaban beda | satu susunan sah yang membantah opsi | satu kombinasi sah yang lebih murah |
| Perkirakan dulu | hitung besaran vs keterangan | hitung sisa susunan setelah syarat terkuat | batas bawah biaya |

---

## BAB 11 — Kecukupan Data

### 1. Ide besar + kenapa benar
**Ide:** soal kecukupan data tidak menanyakan jawabannya, tetapi **berapa banyak jawaban yang masih mungkin**. Setiap pernyataan mencoret keadaan yang tidak cocok; data cukup bila semua keadaan yang tersisa memberi **satu** jawaban, entah satu angka, "pasti ya", atau "pasti tidak".

**Kenapa benar (bisa dipahami siswa SMA):**
- "Menjawab secara pasti" artinya tidak ada dua keadaan sah yang jawabannya berbeda. Itu definisi, bukan trik.
- Akibat 1 — **bukti "tidak cukup" cukup dua contoh.** Klaim "cukup" berlaku untuk semua keadaan; satu pasang keadaan sah dengan jawaban berbeda sudah menggugurkannya.
- Akibat 2 — **bukti "cukup" tidak boleh satu contoh.** Satu contoh yang cocok tidak menutup kemungkinan contoh lain; perlu alasan yang berlaku umum (aljabar, atau "nilai terkecil pun sudah di atas batas").
- Akibat 3 — **"pasti tidak" = cukup.** Jawabannya tunggal ("tidak").
- Akibat 4 — **hasil yang tepat di batas tidak mengubah status cukup/tidak** di soal ya/tidak, karena "ya" dan "tidak" sama-sama tunggal (engine Contoh 1; koreksi S2 di riset logika-celah §8).
- **Perkiraan cepat (prinsip 4):** hitung besaran yang belum diketahui dan memengaruhi jawaban, lalu hitung keterangan yang benar-benar baru. Umumnya k besaran butuh k keterangan. Ada tiga pengecualian bernama, dan ketiganya sumber soal HOTS:
  1. yang ditanya bentuk gabungan (selisih/jumlah tertentu) → satu persamaan yang "pas bentuknya" sudah cukup (Paket 41 no. 47);
  2. keterangan kembar tidak dihitung: kelipatan persamaan lain, atau hanya mengulang kalimat soal (KCK Paket 2 internal no. 1);
  3. kuadrat dan ketaksamaan memberi lebih dari satu nilai atau sebuah rentang → cukup hanya bila seluruh rentang jatuh di satu sisi batas (KCK Paket 2 no. 5, no. 10).

### 2. Subbagian usulan (urutan)
1. Soal pembuka.
2. Arti "cukup": satu jawaban, bukan jawaban benar (dunia kemungkinan, "pasti tidak" = cukup, batas tepat tidak berpengaruh).
3. Membaca lima opsi: bunyi baku engine Pilar 5; urutan opsi di ujian bisa berubah; cara membaca bunyi E ujian "(1) dan (2) tidak cukup" sebagai "digabung pun tidak cukup".
4. Daftar kebutuhan sebelum membaca pernyataan (Pilar 1 hukum data lengkap) + kata penentu di kalimat soal ("berbeda", "ditambah", "sedang", "sama", "tersebut") + uji coret (pernyataan yang sudah diberikan kalimat soal).
5. Perkirakan dulu: hitung besaran vs keterangan, dengan tiga pengecualian.
6. Membuktikan: dua dunia untuk "tidak cukup", alasan umum untuk "cukup".
7. Lima bentuk hari H, satu halaman per bentuk (kebutuhan khas + jebakan khas): aljabar & nilai gabungan · nilai dari cerita/tabel · ya/tidak + laju (berbalik nilai) · rasio · persen & basis. Ditutup "bentuk lain yang pernah muncul": tiga pernyataan (tujuh kemungkinan: 3 tunggal, 3 pasangan, gabungan) dan nilai vs batas.
8. Kalau soal ujian kurang satu data (sikap menunggu putusan Gusti, lihat P1).
9. Soal dibedah.
10. Latihan bertarget waktu.
11. Ringkasan satu halaman.

### 3. Langkah kerja siswa
1. Baca pertanyaan; tentukan jenisnya: **nilai** atau **ya/tidak** (tulis batasnya).
2. Tulis daftar kebutuhan; centang yang sudah diberi kalimat soal; lingkari kata penentu.
3. Nilai (1) saja: apakah mengisi semua kebutuhan? Perkirakan dengan hitungan besaran. Ragu → cari dua dunia.
4. Nilai (2) saja, dengan (1) benar-benar dilupakan.
5. Keduanya tidak cukup → gabungkan; pastikan tidak bertentangan.
6. Cocokkan ke opsi dengan membaca bunyinya, bukan menghafal huruf.
7. Cek balik: "tidak cukup" → sebut dua dunia; "cukup" → sebut alasan umumnya; uji coret tiap pernyataan.

### 4. Nama kesalahan (bahasa guru)
| Nama untuk siswa | Contoh kapan terjadi | Kode |
|---|---|---|
| Mengisi sendiri data yang tidak ditulis | angka di pernyataan dianggap jumlah awal; "jumlah buku sama" dianggap beban sama | J-ASUMSI |
| Berhenti setelah (1) cukup | tidak menilai (2), memilih A padahal D | J-BERHENTI |
| Terpancing angka yang tidak dipakai | jam berangkat, volume, total dokumen yang tidak dibutuhkan | J-PENGALIH |
| Pernyataan cuma mengulang kalimat soal | keterangan terasa baru karena ada angkanya | belum ada kode (usul: perluas J-ULANG) |
| Dua persamaan yang sebenarnya satu | persamaan kedua = kelipatan yang pertama | belum ada kode |
| Dua huruf dikira pasti butuh dua persamaan | yang ditanya bentuk gabungan | belum ada kode |
| Lupa ada bilangan negatif / akar kembar | kuadrat, perbandingan dua bilangan | J-TANDA |
| Jawaban "tidak" dikira tidak terjawab | memilih E padahal hasilnya pasti "tidak" | belum ada kode |
| Perbandingan dikira memberi ukuran | rasio tanpa satu angka nyata | belum ada kode |
| Persen dari angka yang belum diketahui dikira buntu | pernyataan padat yang bisa dihitung balik | J-BASIS (varian KCK) |
| Satu contoh cocok dikira bukti cukup | urutan atau bilangan yang "kebetulan" cocok | belum ada kode (B-14) |
| Hasil tepat di batas dikira mengubah jawaban | "paling lama 12" dan hasil tepat 12 | J-BATAS (tidak mengubah kunci KCK; dibahas sebagai salah paham) |

### 5. Bahan internal
| Path (relatif `BIG DATA/`) | Isi | Status |
|---|---|---|
| `CORE ENGINE … TIU …/ENGINE_GENERATE_SOAL_TIU.md` Pilar 1, 2, 4, 5, G3, Contoh 1 | hukum data lengkap, bunyi opsi terkunci, uji coret, satu contoh ya/tidak + laju lengkap dengan jebakan | rancangan v0.4, belum diuji siswa; daftar 5 bentuk tidak konsisten (temuan 2) |
| `GENERATE SOAL TERBARU SKD 2026/CLAUDE.md` bagian kecukupan data | prinsip, susunan opsi aman, cara memeriksa semua kemungkinan, struktur pembahasan 7 langkah | teruji, dipakai di dua paket |
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-kecukupan-data-paket2.js` | 10 soal (bus, keran, pelari, harga naik-turun, rata-rata, kupon, pramuka, lantai, donat, kuadrat) + pemeriksa: semua keadaan, makna opsi 1/2/G/M/X, kunci seimbang, bunyi opsi tidak berulang, teks pembahasan wajib sejalan hasil pemeriksaan | **paling siap ditiru** sebagai program pembuat soal handbook; soalnya sudah beredar ke siswa |
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-kecukupan-data.js` | 10 soal (susu, usia, nota, rata-rata kelas, tiga pernyataan untung, genap, tinggi, kebun, kelereng, pendapatan) | kunci diketik manual, **tanpa pemeriksa semua kemungkinan**; bunyi opsi E set "L" ("(1) dan (2) TIDAK cukup") bisa dibaca "masing-masing tidak cukup"; sudah beredar |
| `GENERATE SOAL TERBARU SKD 2026/docs/kecukupan-data/` | 4 PDF (soal + pembahasan dua paket) | hasil build, contoh gaya pembahasan |
| `GENERATE SOAL TERBARU SKD 2026/memory.md` | pelajaran: dua pernyataan bernilai sama sah (kunci D), bunyi ringkas ambigu, soal "susu sapi" (variabel tak pernah disebut), soal perpustakaan cacat | bahan cerita "kenapa" di bab |
| `~/.claude/skills/skd-expert/references/tiu.md` bagian kecukupan data | 11 aturan + pola Paket 41 | ringkasan |
| `~/.claude/skills/skd-expert/riset/2026-10-25-tiu-2026-logika-celah.md` §3, §8 | analisis Part 39 no. 45–52 (asumsi diam, opsi tidak saling meniadakan, kerangka berulang 48/50/52, J-BASIS) | bahan contoh kesalahan bimbel (dianalisis, tidak disalin) |
| psiko-cat `scripts/check-kecerdasan-kck.ts` (proyek lain, milik D'Ajiks) | pola "bukti dua arah": selain memeriksa semua keadaan, menyimpan dua nilai sah dengan jawaban beda | pola alat yang bisa ditiru untuk teks "contoh bantahan" otomatis |

### 6. Beda dengan Pejuang (Numerik Bab 08 "Kecukupan Data")
- **Subjudul Pejuang:** Rumus dan cara pengerjaan (Bentuk soal · Lima pilihan jawaban baku · Alur mengerjakan · Apa arti "cukup"? · Jebakan umum) · Kartu rumus cepat · Contoh soal (4) · Latihan soal (8).
- **Cara mereka menjelaskan (ringkas):** aturan diberikan langsung; alur empat langkah (1 saja → 2 saja → tentukan → gabung); arti cukup dinyatakan tanpa alasan; tabel jebakan bernuansa aljabar (akar kuadrat, persamaan kelipatan, rasio, tanda, satu persamaan dua variabel); contoh dan latihan berupa soal satu baris aljabar/rumus tanpa cerita dan tanpa tabel; jawaban di kotak, pembahasan menjelaskan kunci. Bunyi opsi E mereka sama lemahnya dengan opsi E Al Faiz.
- **Yang kita lakukan berbeda:**
  1. Menjelaskan *mengapa* lewat dunia kemungkinan; bukti tidak cukup = dua dunia, bukti cukup = alasan umum.
  2. Perkiraan cepat "hitung besaran vs keterangan" dengan tiga pengecualian bernama (Pejuang punya satu latihan bentuk gabungan, tanpa prinsipnya).
  3. Daftar kebutuhan + kata penentu + uji coret sebelum membaca pernyataan. Ini jebakan membaca yang dominan di hari H, sedangkan Pejuang menekankan jebakan aljabar.
  4. Bentuk hari H: cerita/tabel dua tim, laju berbalik nilai, jumlah awal, persen dari basis, rasio dengan besaran yang tak pernah disebut. Tidak satu pun ada di contoh/latihan Pejuang.
  5. Setiap opsi salah diberi nama kesalahan.
  6. Sikap jujur terhadap soal ujian yang kurang data.

### 7. Celah
- Lima bentuk mana yang dipakai bab (temuan 2) → putusan P2.
- Sikap terhadap kunci resmi berasumsi (temuan 3) → putusan P1. Dasarnya baru dua soal dari satu bimbel (Part 39 no. 49, Paket 41 no. 50); kebiasaan soal BKN **belum diverifikasi**.
- 20 soal internal sudah beredar; rencana TO Paket 1 melarang pakai ulang untuk TO → untuk handbook perlu putusan P3.
- Paket 1 internal belum diperiksa program. Bila dipakai, periksa ulang dan ganti bunyi opsi E set "L".
- Kerangka "persamaan kelipatan" (nota pensil–buku) dan "keliling + perbandingan sisi" ada di contoh Pejuang **dan** di Paket 1 internal (internal lebih dulu, 2026-09-23). Supaya handbook tidak tampak meniru, jangan jadikan keduanya soal dibedah.
- Kamus Jebakan: lima kesalahan belum punya kode (tabel §4) → putusan P5.
- Program pembuat soal handbook belum ada. Rencana: meniru pemeriksa Paket 2 + keluaran dua dunia otomatis untuk pembahasan + pemeriksa kerangka lintas bahan (TO Paket 1, 20 soal beredar).
- Target waktu: dasar yang terverifikasi hanya 110 soal / 100 menit (≈ 55 detik per soal, Kepmen 406/2026, `domain-skd.md`) dan rata-rata engine 50–55 detik. Target per bab belum ada → Tahap 2, menyesuaikan jatah waktu Bab 1 (laporan A).

### 8. Uji kecocokan dengan hari H (Paket 41 no. 46–52)
| No | Bentuk yang terlihat | Kunci (resmi) | Cocok dengan bab? |
|---|---|---|---|
| 46 | nilai dari tabel jarak-laju-waktu; satu pernyataan memberi data yang tidak dipakai (jam berangkat) | A | ya — bentuk "nilai dari cerita/tabel" + angka pengalih. Bunyi opsi set pendek dengan "atau" di D (dua opsi bisa benar harfiah) |
| 47 | nilai bentuk gabungan dua huruf; satu persamaan pas bentuknya | A | ya — pengecualian 1 |
| 48 | ya/tidak, tabel dua tim (jumlah, waktu), laju sama, batas waktu; hasil "pasti tidak" | C | ya — sekaligus contoh "tidak" = cukup. Bagian atas soal terpotong di tangkapan layar |
| 49 | hasil kali dua besaran; kedua pernyataan hanya memberi besaran yang sama, besaran kedua tak pernah disebut | E | ya — bentuk rasio; pola "variabel tak pernah disebut" yang oleh pedoman internal dinilai lemah |
| 50 | ya/tidak + laju + "ditambah k", jumlah awal tidak tertulis | A (ketat: E) | ya, dengan catatan sikap (P1) |
| 51 | jumlah dua anggaran; persen "lebih besar daripada" | C | ya — persen & basis |
| 52 | kerangka sama dengan 48, konteks lain | C | ya — bukti kerangka berulang di hari H |
- Sebaran kunci 46–52: A3, C3, E1, tanpa B dan D. Satu tryout tidak cukup untuk menyimpulkan pola huruf; jangan diajarkan sebagai pola.
- Tidak muncul di Paket 41: tiga pernyataan (ada di TIU002), nilai vs batas berupa ketaksamaan (ada di Part 39 no. 47).

### 9. Calon soal (spesifikasi, tanpa angka dan kunci)
Usul jumlah: **1 pembuka + 6 dibedah + 4 latihan bukti + 10 latihan bertarget waktu = 21.**

| Peran | Bentuk | Yang dilatih | Kesalahan yang dipancing (kode) | Sumber pembuat |
|---|---|---|---|---|
| Pembuka | ya/tidak + laju, jumlah awal tertulis jelas, hasil gabungan "pasti tidak" | "tidak" tetap cukup | jawaban "tidak" dikira tidak terjawab; mengisi sendiri (J-ASUMSI) | program baru meniru pemeriksa `build-kecukupan-data-paket2.js` |
| Dibedah 1 | aljabar, yang ditanya bentuk gabungan | pengecualian 1 | dua huruf dikira butuh dua persamaan; J-BERHENTI | idem |
| Dibedah 2 | nilai dari cerita/tabel + angka pengalih | daftar kebutuhan | J-PENGALIH | idem |
| Dibedah 3 | ya/tidak + laju berbalik nilai, kata penentu "berbeda" | kalimat kunci, uji coret | J-ASUMSI; J-SEARAH (dibahas: tidak mengubah kunci) | idem; kerangka tidak boleh sama dengan engine Contoh 1 dan Paket 41 no. 48/52 |
| Dibedah 4 | rasio; dua pernyataan sepakat, satu besaran tak pernah ada | dua pernyataan setuju ≠ cukup | perbandingan dikira memberi ukuran; J-ASUMSI | idem |
| Dibedah 5 | persen dari basis, pernyataan padat | menghitung balik basis | J-BASIS varian KCK | idem |
| Dibedah 6 | tiga pernyataan | tujuh kemungkinan diperiksa teratur | J-BERHENTI | idem; opsi dirancang per soal (Pilar 5) |
| Latihan bukti (4) | tanpa opsi: diberi satu pernyataan, siswa menulis dua dunia (3 soal) atau alasan umum (1 soal) | membuktikan, bukan menebak | satu contoh dikira bukti | program yang sama, keluaran dua dunia otomatis |
| Latihan (10) | 2 per bentuk hari H; minimal 1 "pasti tidak", 1 pernyataan mengulang kalimat soal, 1 nilai vs batas (rentang) | kecepatan + ketelitian | campuran semua kode di §4 | idem; kunci 2 per huruf; minimal 1 D dan 1 E (Pilar 4); kerangka dicek terhadap TO Paket 1 dan 20 soal beredar |

---

## BAB 12 — Penalaran Analitis

### 1. Ide besar + kenapa benar
**Ide:** soal analitis = mencari susunan di antara semua susunan yang mungkin. Setiap syarat mencoret sebagian. "Pasti benar" = benar di **semua** susunan yang tersisa; "mungkin benar" = di **sedikitnya satu**; "tidak mungkin" = di **tidak satu pun**. Pasang dulu syarat yang mencoret paling banyak, karena makin sedikit sisa, makin sedikit yang harus diperiksa.

**Kenapa benar:**
- Kekuatan syarat bisa dihitung. Untuk n orang berjajar ada n! susunan. Posisi tetap ("A di urutan 2") menyisakan (n − 1)!. Blok "B tepat setelah A" juga (n − 1)! (AB jadi satu kotak). "A dan B bersebelahan" 2 × (n − 1)!. "A sebelum B" separuhnya, n!/2. Syarat "bukan/tidak" hampir tidak mencoret. Jadi urutan "tetap → blok → sebelum/sesudah → bukan" adalah urutan dari syarat terkuat, bukan kebiasaan.
- **Melingkar:** memutar seluruh meja tidak mengubah siapa di sebelah siapa. Mengunci satu orang di satu kursi membuang semua putaran kembar; sisanya (n − 1)!. "Berhadapan" di meja berkursi genap = setengah putaran (meja 6: selisih 3 kursi).
- **Kanan-kiri di meja bundar:** bila semua menghadap ke tengah, tetangga kanan seseorang ada di arah berlawanan jarum jam bila meja dilihat dari atas. Bila soal tidak menyebut arah, kunci yang baik tetap sama di kedua arah (Part 39 no. 55 dan Paket 41 no. 54 terbukti tahan dua arah lewat pemeriksaan program). *Catatan: pernyataan geometri ini dicek ulang dengan gambar saat penulisan bab.*
- **Urutan parsial:** syarat "X lebih dahulu daripada Y" digambar sebagai panah. Yang paling akhir pasti adalah satu-satunya unsur tanpa panah keluar; semua unsur lain punya sesuatu sesudahnya, jadi tidak bisa paling akhir. Bila ada dua unsur tanpa panah keluar, "paling akhir" tidak dapat ditentukan (dua susunan bantahan). Ini jembatan langsung ke Bab 11.
- **Perkiraan cepat (prinsip 4):** setelah syarat terkuat dipasang, hitung sisa susunan secara kasar; bila sisanya sedikit, daftar semua; bila banyak, kerjakan per opsi.

### 2. Subbagian usulan
1. Soal pembuka.
2. Dunia susunan: pasti, mungkin, tidak mungkin; satu susunan cocok bukan bukti.
3. Syarat menjadi coretan: posisi tetap, blok, sebelum/sesudah, berhadapan, bukan; arti "tepat" ("tepat setelah" = bersebelahan, "setelah" boleh berjarak).
4. Urutan syarat: yang paling ketat dulu (dengan hitungan alasan di atas).
5. Bentuk 1 — urutan + atribut, termasuk bentuk "pilih susunan yang memenuhi": bandingkan opsi dulu (di posisi mana mereka berbeda), lalu uji syarat yang menyentuh posisi itu. Syarat yang dipenuhi semua opsi tidak berguna untuk memilih.
6. Bentuk 2 — duduk melingkar: kunci satu orang; berhadapan; kanan-kiri saat menghadap ke tengah; uji dua arah.
7. Bentuk 3 — urutan parsial: gambar panah; awal/akhir yang pasti; kapan tidak dapat ditentukan.
8. Syarat "jika …" di kalimat tanya: hanya berlaku untuk soal itu, tidak menjadi syarat umum.
9. (Pendek, menunggu putusan P6) jadwal dan pencocokan atribut: cara yang sama, wadah berbeda.
10. Soal dibedah.
11. Latihan bertarget waktu.
12. Ringkasan satu halaman.

### 3. Langkah kerja siswa
1. Hitung tokoh dan tempat; gambar wadah (garis bernomor, lingkaran kursi, atau panah).
2. Pilah syarat: tetap · blok · urutan · negatif · "jika".
3. Pasang syarat tetap dan blok; di meja bundar kunci satu orang dulu.
4. Bercabang bila perlu; tiap cabang di baris sendiri.
5. Coret cabang yang melanggar syarat negatif.
6. Jawab sesuai kata tanya. Untuk "pilih susunan": bandingkan opsi, uji syarat yang membedakan.
7. Cek balik: kunci memenuhi **semua** syarat; tiap opsi lain melanggar syarat yang bisa ditunjuk; di meja bundar tanpa arah tertulis, uji kedua arah "kanan".

### 4. Nama kesalahan (bahasa guru)
| Nama untuk siswa | Contoh | Kode |
|---|---|---|
| Berhenti di satu susunan yang cocok | "mungkin" diperlakukan sebagai "pasti" | belum ada kode (B-14) |
| Kanan dan kiri tertukar | menghitung kanan searah jarum jam padahal menghadap ke tengah | J-BALIK |
| "Tepat setelah" dibaca "setelah" | blok dipisah | belum ada kode |
| Lupa syarat "tidak" | opsi lolos semua syarat kecuali syarat negatif | belum ada kode (riset Part 39 no. 55) |
| Mengisi urutan yang tidak diberikan | urutan parsial diperlakukan sebagai urutan lengkap | J-ASUMSI |
| Salah hitung posisi/kursi | posisi ke-3 dihitung dari ujung yang salah | J-NOMOR |
| Syarat dibaca terbalik | "A sebelum B" ditulis B → A | J-BALIK |
| Syarat "jika" dipakai di luar soalnya | syarat tambahan satu soal dibawa ke soal lain dalam satu set | belum ada kode |

### 5. Bahan internal
| Path | Isi | Status |
|---|---|---|
| Engine TIU Pilar 2 (ANA 3 bentuk), Pilar 4 ANA | aturan "setiap syarat menggugurkan ≥ 1 opsi", program menghitung opsi yang digugurkan tiap syarat | aturan saja; belum ada soal |
| `~/.claude/skills/skd-expert/references/tiu-verbal-figural.md` §4 | wacana logika dari psikotes: 3 jenis (posisi, jadwal, multi-atribut), 5–6 tokoh, 4–6 syarat, wajib satu "jika … maka", solusi tunggal diperiksa program, kata tanya campur, eliminasi dari syarat termudah | asal subtes Kecerdasan psikotes, belum dicocokkan penuh dengan SKD |
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-kecukupan-data-paket2.js` soal 3 (urutan pelari) | penalaran urutan di dalam bentuk kecukupan data | sudah beredar; contoh jembatan Bab 11–12 |
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-kecukupan-data.js` soal 7 (tinggi tiga anak) | urutan parsial di dalam kecukupan data | sudah beredar; belum diperiksa program |
| `riset/2026-10-25-tiu-2026-logika-celah.md` §8 no. 55; `riset/2026-10-25-al-faiz-56-65-tiu.md` no. 56 | melingkar tahan 4 tafsir; syarat yang tidak berguna | bahan analisis |
| psiko-cat `scripts/cek-wacana-kal.ts`, `cek-wacana-p6.ts` | pola pemeriksa: semua susunan sah dihitung, kunci diturunkan ulang, "tiap syarat perlu" | pola alat (proyek lain); isinya soal psikotes, tidak dipakai |
- **Tidak ada** soal analitis SKD buatan D'Ajiks dan tidak ada program pembuatnya di folder SKD.

### 6. Beda dengan Pejuang (Verbal & Figural Bab 05 "Penalaran Analitis")
- **Subjudul Pejuang:** Materi dan trik (Konsep · Jenis soal dan alat bantunya · Gambaran alat bantu tiap jenis soal · Mengubah syarat menjadi simbol · Langkah mengerjakan · Soal dua atribut · Istilah posisi · Trik HOTS) · Kartu ingat cepat · Contoh soal (3) · Latihan soal (10).
- **Cara mereka menjelaskan:** satu alat gambar per jenis (garis kotak, lingkaran kursi bernomor, kolom hari, tabel centang-silang, tangga, gedung bertingkat); tabel simbol; lima langkah umum; definisi pasti/mungkin. Melingkar: penomoran searah jarum jam dan "berhadapan = selisih 3", tanpa alasan dan tanpa membahas arah kanan saat menghadap ke tengah. Tiga contoh (peringkat, atribut, jadwal), tanpa contoh melingkar. Delapan dari sepuluh latihan memakai tiga kumpulan data yang diulang dengan pertanyaan berbeda. Label DASAR/MENENGAH/HOTS.
- **Yang kita lakukan berbeda:**
  1. Alasan berhitung di balik "syarat ketat dulu" dan "kunci satu orang".
  2. Kanan-kiri dijelaskan dari arah duduk, plus uji dua arah.
  3. Bentuk "pilih susunan yang memenuhi" dengan strategi "bandingkan opsi dulu" (tidak ada di Pejuang; bentuk ini muncul di Paket 41 no. 53).
  4. Urutan parsial dengan panah dan "kapan tidak dapat ditentukan" (Pejuang hanya peringkat lengkap).
  5. Kesalahan bernama per opsi.
  6. Jembatan eksplisit ke kecukupan data.

### 7. Celah
- Program pembuat soal analitis belum ada. Isi minimal: semua susunan, syarat per soal, susunan tunggal (atau jenis jawaban sesuai kata tanya), tiap syarat menggugurkan ≥ 1 opsi (bentuk pilih susunan), tiap syarat perlu, pengecoh gugur di syarat berbeda, kunci tahan dua arah "kanan" bila arah tidak didefinisikan.
- Aturan engine ANA baru mengatur bentuk "pilih susunan". Untuk kata tanya lain perlu aturan "tiap syarat perlu" (pola psiko-cat) → usulan engine, bukan keputusan bab.
- Kamus Jebakan kurang tiga kode analitis (tabel §4) → P5.
- Frasa ambigu ("terpisah satu kursi" di Part 39 no. 55) → soal kita wajib mendefinisikan.
- Frekuensi bentuk di hari H: Paket 41 = tiga bentuk (urutan + atribut, melingkar, urutan parsial). Jadwal/atribut murni dan gedung bertingkat tidak terlihat di Paket 41 → **belum diverifikasi** muncul di SKD 2026.

### 8. Uji kecocokan dengan hari H (Paket 41 no. 53–55)
| No | Bentuk | Kunci | Catatan |
|---|---|---|---|
| 53 | urutan 5 judul + atribut genre, "pilih urutan yang tepat" | B | syarat posisi tetap dipenuhi kelima opsi (dicek program) → tidak berguna untuk memilih; dua syarat lain menggugurkan keempat pengecoh. Syarat sendiri menghasilkan satu susunan. Pola syarat tidak berguna kedua kalinya di Al Faiz (Part 39 no. 56) |
| 54 | melingkar 6 orang, berhadapan + "tepat di antara" + syarat "jika … tepat di kanan", pilih pernyataan benar | D | kunci tahan dua arah "kanan" (dicek program); satu opsi salah ketik nama |
| 55 | urutan parsial 5 lapisan, 4 syarat "lebih dahulu", tanya yang paling akhir | D | dapat ditentukan tanpa urutan lengkap → cocok dengan ide panah |
- Ketiga bentuk bab cocok dengan hari H.

### 9. Calon soal (spesifikasi)
Usul jumlah: **1 pembuka + 3 dibedah + 9 latihan = 13.**

| Peran | Bentuk | Yang dilatih | Kesalahan yang dipancing (kode) | Sumber pembuat |
|---|---|---|---|---|
| Pembuka | urutan parsial, kata tanya "pasti benar"; satu opsi benar di satu susunan saja | pasti ≠ mungkin | berhenti di satu susunan; J-ASUMSI | program analitis baru |
| Dibedah 1 | urutan + atribut, pilih susunan; setiap syarat menggugurkan ≥ 1 opsi, pengecoh gugur di syarat berbeda | bandingkan opsi dulu | lupa syarat "tidak"; "tepat setelah" dibaca "setelah"; J-NOMOR | idem |
| Dibedah 2 | melingkar 6, berhadapan + kanan (arah didefinisikan) + syarat "jika" | kunci satu orang, setengah putaran | J-BALIK; benar di satu cabang saja | idem; uji dua arah |
| Dibedah 3 | urutan parsial, tanya yang dapat ditentukan | panah, ujung pasti | J-ASUMSI; J-BALIK | idem |
| Latihan (9) | 3 per bentuk; kata tanya bervariasi: pasti benar, mungkin benar, tidak mungkin, pilih susunan, "jika … maka"; satu soal analitis berbentuk kecukupan data | kecepatan + bukti | campuran kode §4 | idem; kunci tersebar; kerangka dicek terhadap TO Paket 1 no. 53–55 |

---

## BAB 13 — Optimasi Tabel (+ subbagian membaca data)

### 1. Ide besar + kenapa benar
**Ide:** "termurah" artinya termurah di antara **semua** kombinasi yang memenuhi syarat, bukan di antara lima opsi. Dua alat: **harga satuan** (harga per kg/per unit) menunjukkan paket yang paling hemat; **batas bawah** = kebutuhan minimal × harga satuan termurah. Tidak ada kombinasi yang lebih murah dari batas bawah. Kalau satu kombinasi tepat menyentuhnya, kombinasi itu pasti termurah tanpa perlu mencoba semua.

**Kenapa benar:**
- Setiap kg yang dibeli harganya paling murah sama dengan harga satuan termurah. Total kg minimal sama dengan kebutuhan. Jadi total biaya ≥ kebutuhan × harga satuan termurah. Bukti satu baris, dan berlaku untuk tabel apa pun.
- Bila batas bawah tidak bisa disentuh (kelipatan paket tidak pas), selisihnya kecil. Cari di sekitar: banyakkan paket paling hemat, tambal sisanya dengan paket berikutnya, lalu daftar secara teratur di dalam rentang sah (minimal sampai minimal + kelebihan maksimal).
- Kembarannya, "terbanyak dengan anggaran": batas atas = anggaran ÷ harga satuan termurah.
- **Mengapa opsi termurah belum tentu optimum:** opsi hanya lima contoh dari ratusan kombinasi. Pembuat soal bisa lupa satu kombinasi. Paket 41 no. 56 buktinya: kombinasi satu jenis paket dengan harga satuan termurah tepat menyentuh batas bawah dan tidak ada di opsi (log 2026-10-28; diperiksa ulang 2026-10-30, 255 kombinasi sah). Di ujian, siswa tetap memilih opsi termurah yang sah; batas bawah memberi tahu bahwa soalnya cacat, jadi siswa tidak membuang waktu mencari "jawaban yang hilang".
- **Perkiraan cepat (prinsip 4):** hitung batas bawah dulu. Opsi yang jauh di atasnya patut dicurigai; opsi yang di bawahnya pasti melanggar syarat.

### 2. Subbagian usulan
1. Soal pembuka.
2. Termurah di semua kombinasi; kenapa termurah di opsi belum tentu jawaban sebenarnya.
3. Harga satuan dan batas bawah (bukti satu baris).
4. Rentang sah: kebutuhan minimal, kelebihan maksimal.
5. Daftar teratur bila batas bawah tidak tersentuh.
6. Cara cepat di ujian: coret opsi yang keluar rentang → hitung biaya sisanya → bandingkan dengan batas bawah.
7. Kembaran: terbanyak dengan anggaran (batas atas).
8. Subbagian pendek — membaca data tabel/grafik: pasti benar / pasti salah / tidak dapat ditentukan sebagai dunia kemungkinan (data cocok dengan dua keadaan → tidak dapat ditentukan); jumlah vs persen; persen dari basis yang tepat; klaim sebab tidak bisa dibuktikan oleh data angka saja.
9. Soal dibedah.
10. Latihan bertarget waktu.
11. Ringkasan satu halaman.

### 3. Langkah kerja siswa
1. Tulis syarat sebagai rentang (minimal … sampai minimal + kelebihan maksimal).
2. Hitung harga satuan tiap paket; urutkan dari yang paling hemat.
3. Hitung batas bawah.
4. Coret opsi yang keluar rentang.
5. Hitung biaya opsi yang tersisa; pilih termurah.
6. Cek balik: bandingkan dengan batas bawah. Bila jauh di atas, coba satu kombinasi dari paket paling hemat. Kalau ternyata lebih murah dan tidak ada di opsi, tetap pilih opsi termurah yang sah.
- Subbagian data: (1) baca judul, satuan, dasar persen; (2) ubah tiap opsi menjadi pertanyaan "dapat dihitung dari tabel?"; (3) hitung hanya yang perlu; (4) bila data cocok dengan dua keadaan → tidak dapat ditentukan.

### 4. Nama kesalahan (bahasa guru)
| Nama untuk siswa | Contoh | Kode |
|---|---|---|
| Paket besar dikira pasti paling hemat | memilih paket terbesar tanpa menghitung harga satuan | belum ada kode |
| Lupa batas kelebihan | total melebihi rentang | J-BATAS |
| Kurang dari kebutuhan | kombinasi murah tetapi tidak memenuhi minimal | J-BATAS |
| Membandingkan harga opsi tanpa cek syarat | opsi termurah yang ternyata tidak sah | belum ada kode |
| Salah kali atau salah jumlah | biaya total keliru | J-LANGKAH |
| Terpancing kolom yang tidak dipakai | kolom tabel yang tidak memengaruhi biaya | J-PENGALIH |
| Jumlah dikira persen | yang ditanya persentase, dibandingkan jumlahnya | J-BASIS (spesifikasi DAT cadangan) |
| Persen dari dasar yang salah | naik dari level, bukan dari kenaikan | J-BASIS |
| Dugaan sebab dikira data | opsi "karena …" | J-AKAL |
| "Tidak dapat ditentukan" dikira "pasti salah" | data tidak membantah, tetapi juga tidak membuktikan | belum ada kode |

### 5. Bahan internal
| Path | Isi | Status |
|---|---|---|
| Engine TIU Pilar 2 (OPT 1 soal, spesifikasi OPT; DAT cadangan) | kunci = optimum global; pengecoh jumlah vs persen | spesifikasi saja |
| `~/.claude/skills/skd-expert/references/aturan-tetap.md` B-15 | soal termurah/terbanyak wajib dibuktikan optimum global oleh program | aturan tetap |
| `riset/2026-10-28-log-uji-paket41.md`; `references/tiu.md` | analisis Paket 41 no. 56 | bahan cerita "mengapa opsi termurah belum tentu jawaban" |
| `riset/2026-10-30-log-tiu-paket1.md` | TO Paket 1 merencanakan satu soal optimasi (no. 56) | belum ditulis; kerangka handbook harus berbeda |
- **Tidak ada** soal optimasi atau soal membaca data buatan D'Ajiks, dan tidak ada program pembuatnya.

### 6. Beda dengan Pejuang (Verbal & Figural Bab 06 "Penalaran dari Data")
- **Pejuang tidak punya bab optimasi.** Padanan hanya untuk subbagian membaca data.
- **Subjudul Pejuang Bab 06:** Materi dan trik (Konsep · Empat jenis pernyataan · Langkah mengerjakan · Hitungan yang sering dipakai) · Kartu ingat cepat · Contoh soal (3) · Latihan soal (7).
- **Cara mereka menjelaskan:** empat jenis pernyataan (pasti benar, pasti salah, tidak dapat ditentukan, dugaan sebab) dengan contoh satu baris; langkah lima butir; rumus persen, persen perubahan, rata-rata; jebakan jumlah vs persen; "trik" bahwa opsi berkata "karena/selalu/pasti akan" hampir selalu bukan jawaban. Tiga kumpulan data (tabel, grafik batang, survei) dipakai ulang di ketujuh latihan.
- **Yang kita lakukan berbeda:**
  1. Optimasi sebagai isi utama, dengan bukti batas bawah.
  2. "Tidak dapat ditentukan" dijelaskan sebagai dua keadaan yang sama-sama cocok dengan data, satu ide dengan Bab 11.
  3. Kata "karena" tidak diajarkan sebagai rumus bentuk (aturan tetap B-3: D'Ajiks mengajar kaidah isi). Alasannya diajarkan: data angka menunjukkan apa yang terjadi, bukan mengapa.
  4. Setiap soal latihan memakai data sendiri, tidak berbagi satu tabel.

### 7. Celah
- Semua bahan harus dibangun: program optimasi (semua kombinasi; optimum tunggal; optimum ada di opsi; tiap opsi salah = tidak sah dengan syarat yang dilanggar disebut, atau sah tetapi lebih mahal dengan kesalahan bernama; batas bawah dicetak untuk pembahasan) dan program membaca data (tabel/grafik dihitung program; tiap opsi diklasifikasi benar/salah/tidak dapat ditentukan).
- Grafik untuk PDF handbook harus digambar program (SVG) supaya angka dan gambar dari satu sumber; belum ada.
- Frekuensi di hari H: optimasi 1 soal (Paket 41, satu sumber). Penalaran dari data: 2 soal di TIU002, 0 di Paket 41. Porsi resmi **belum diverifikasi**; karena itu bab ini sebaiknya pendek.
- Bila batas bawah tidak tersentuh, daftar teratur bisa panjang. Perlu satu soal dibedah yang menunjukkan cara memangkasnya (ditentukan saat penulisan bab).

### 8. Uji kecocokan dengan hari H (Paket 41 no. 56)
- Bentuk: tabel lima paket (berat, harga), syarat kebutuhan minimal + kelebihan maksimal, tanya kombinasi termurah. Cocok dengan bab.
- Dua dari lima opsi tidak sah (satu kurang dari kebutuhan, satu melebihi batas kelebihan) → langkah "coret opsi yang keluar rentang" langsung berguna.
- Optimum sebenarnya tidak ada di opsi. Opsi termurah yang sah (kunci resmi B) biayanya sama dengan satu kombinasi lain di luar opsi. Dua-duanya tidak mengubah jawaban di ujian, tetapi memperkuat isi subbagian 2.

### 9. Calon soal (spesifikasi)
Usul jumlah: **1 pembuka + 3 dibedah + 7 latihan = 11** (optimasi 1 + 2 + 4; data 1 + 3).

| Peran | Bentuk | Yang dilatih | Kesalahan yang dipancing (kode) | Sumber pembuat |
|---|---|---|---|---|
| Pembuka | tabel paket, termurah dengan rentang sah; kunci = kombinasi yang menyentuh batas bawah | batas bawah | paket besar dikira hemat; J-BATAS (opsi lebih murah tetapi kurang) | program optimasi baru |
| Dibedah 1 | termurah, batas bawah tidak tersentuh | daftar teratur di sekitar batas | J-BATAS (kelebihan); membandingkan tanpa cek syarat | idem |
| Dibedah 2 | terbanyak dengan anggaran | batas atas | J-LANGKAH; paket besar dikira hemat | idem |
| Dibedah 3 (data) | tabel dua periode, "pasti benar" | tidak dapat ditentukan = dua keadaan cocok | J-BASIS; J-AKAL; "tidak dapat ditentukan" dikira "salah" | program data baru |
| Latihan optimasi (4) | variasi rentang (minimal saja; minimal + kelebihan); tabel 4–6 paket; satu soal dua jenis barang | kecepatan + bukti optimum | campuran kode §4 | program optimasi; optimum global wajib ada di opsi (B-15) |
| Latihan data (3) | satu tabel, satu grafik batang, satu ringkasan survei; tiap soal data sendiri | pasti benar/salah/tidak dapat ditentukan | J-BASIS, J-AKAL, J-PENGALIH | program data |

---

## Putusan yang perlu diminta ke Gusti (urut prioritas)

1. **P1 — Sikap terhadap soal ujian yang kurang satu data.** Pilihan: (a) ajarkan logika ketat saja; (b) ajarkan logika ketat + catatan "kebiasaan bimbel: angka di pernyataan dianggap jumlah awal" (dasar dua soal Al Faiz; kebiasaan BKN belum diverifikasi); (c) ajarkan kebiasaan itu sebagai aturan. Rekomendasi: (b).
2. **P2 — Lima bentuk Bab 11.** Engine punya dua daftar berbeda (Pilar 2 vs Pilar 4). Rekomendasi: lima bentuk Pilar 2 (cocok dengan Paket 41: aljabar · nilai dari cerita/tabel · ya/tidak + laju · rasio · persen), ditambah "bentuk lain" pendek (tiga pernyataan, nilai vs batas). Engine perlu diselaraskan sesudahnya.
3. **P3 — Boleh tidaknya memakai 20 soal kecukupan data yang sudah beredar** sebagai contoh handbook, ditulis ulang atau apa adanya. TO Paket 1 sudah melarangnya untuk TO.
4. **P4 — Pemisahan handbook dan TO Paket 1.** Kerangka soal handbook Bab 11–13 tidak boleh sama dengan TO Paket 1 no. 46–56 yang sedang direncanakan. Siapa didahulukan bila bentrok?
5. **P5 — Kode Kamus Jebakan baru** untuk kesalahan yang belum punya kode (KCK 5, analitis 3, optimasi/data 3). Ini usulan perubahan engine, sehingga perlu persetujuan. Terkait: aturan C-5 melarang "nama Kamus Jebakan TIU" di pembahasan siswa, sedangkan engine Pilar 3 dan judul Bab 19 memakainya untuk siswa. Perlu dipastikan apakah nama seperti "Jebakan Asumsi Diam" boleh tampil di teks siswa, atau hanya nama bahasa guru.
6. **P6 — Cakupan Bab 12:** tiga bentuk Paket 41 saja, atau ditambah subbagian pendek jadwal + pencocokan atribut (ada di Pejuang dan bahan psikotes, belum terlihat di Paket 41).
7. **P7 — Benang merah "dunia kemungkinan"** diperkenalkan di Bab 2 (laporan A) lalu dipakai ulang di Bab 4, 11, 12, 13. Perlu disetujui bersama laporan A dan B.
8. **P8 — Pola alat pemeriksa dari psiko-cat** (`check-kecerdasan-kck.ts`, `cek-wacana-*.ts`) boleh ditiru untuk program handbook (pola saja, bukan isi soal).
