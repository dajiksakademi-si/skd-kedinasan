# Tahap 1 — Bagian E: Figural (Bab 14–18)

Tanggal: 2026-10-30 · Penyusun: subagen E · Status: bahan bacaan untuk Tahap 2, belum ada soal.

**Bahan yang dibaca:** root `CLAUDE.md`; skill `SKILL.md`, `aturan-tetap.md`, `tiu.md`, `tiu-verbal-figural.md` §7; `ENGINE_GENERATE_SOAL_TIU.md` v0.4 (Pilar 3, Pilar 4 FIG); log `riset/2026-10-28-log-engine-figural-tiu.md`, `riset/2026-10-25-al-faiz-56-65-tiu.md` (Part 39), `riset/2026-10-28-log-uji-paket41.md`, `riset/2026-10-29-pejuang-kedinasan-tiu.md`, `riset/2026-10-30-log-handbook-tiu.md`; memory `skd-tiu-engine-3k.md`, `feedback-figural-kedinasan.md`, `skd-handbook-tiu.md`; generator `k12-spatial-engine/` (`AGENTS.md`, `README.md`, `docs/RULES-GENERATE-SOAL-SPASIAL.md`, `src/tiu-jenis.ts`, `tiu-peta-paket.ts`, `tiu-paket.ts`, `tiu-bentuk.ts`, `tiu-generate.ts`, `tiu-mockup.ts`, potongan `tiu-fig-*.ts`, `figural-lib.ts`, `k12-spasial-core.ts`).

**Cara membaca Pejuang:** teks halaman 49–94 (Bab 07–13, rangkuman, sebagian pembahasan) diambil untuk struktur saja; halaman 49, 50, 76 dilihat sebagai gambar untuk gaya visual. Tidak ada kalimat, contoh, atau soal yang disalin.

**Catatan nomor Al Faiz:** "Paket 41 no. X" dan "Part 39 no. X" adalah dua tryout berbeda. Nomor yang sama berisi soal berbeda (contoh: matriks hitung = Paket 41 no. 64, tetapi Part 39 no. 63).

---

## Ringkasan temuan

1. **Pejuang sudah mengajarkan fakta dasarnya.** Isinya antara lain: cermin tegak lalu datar = putar 180°, putar tidak membalik urutan arah, sudut putaran dijumlah, aturan matriks diuji di dua baris, tiap objek punya pola sendiri, yang dipindahkan adalah aturan dan bukan bentuk, sifat pembeda berlaku tepat di empat gambar. Jadi pembeda D'Ajiks tidak bisa berupa fakta-fakta itu. Pembedanya harus dari kedalaman: satu sistem perubahan yang bisa digabung dan dibatalkan, aturan genap-ganjil cermin beserta alasannya, bentuk kiral vs simetris, periode, kebalikan untuk "?" di kiri, bukti dua jalan, dan nama kesalahan tiap pilihan.
2. **Bahasa perubahan hanya menjangkau sebagian soal figural hari H.** Menurut blueprint 9 soal, sekitar 5–6 soal per paket memakai putar/cermin/warna/tempat (seri 2, analogi per objek, gambar berbeda putar, matriks putar). Sisanya 3–4 soal adalah hitung, gabung, atau tumpuk. Soal jenis itu butuh ide besar kedua, yaitu "hitung yang tetap, abaikan rupa" dan "gabung = menumpuk plastik bening". Perubahan **ukuran** (Part 39 no. 59) belum ada di bahasa perubahan maupun di generator.
3. **Generator sanggup membuat 10 jenis soal untuk Bab 15–18 dalam gaya siluet yang sudah disetujui, tetapi belum bisa langsung membuat gambar ilustrasi Bab 14.** Bahan dasarnya sudah lengkap: 8 perubahan, gabungan, kebalikan, balik warna, dan tukar tempat. Yang belum ada adalah keluaran ilustrasi, bentuk simetris sebagai pembanding (pemeriksa menolak bentuk simetris), soal satu objek, dan warna yang sesuai palet handbook (sekarang hijau-merah gaya PSI).
4. **Strategi "tiap objek menggugurkan satu pilihan" sengaja dibuat tidak berlaku di soal kita.** Pejuang Bab 11 mengajarkan strategi itu. Generator kita sengaja mematahkannya: pilihan salah keliru di 1–2 hal, dan jawaban bukan pilihan yang "paling mirip". Handbook harus mengajarkan pemeriksaan tuntas (aturan-tetap B-14), bukan eliminasi cepat yang mengandalkan pola susunan pilihan.
5. **Kamus Jebakan engine belum punya kode figural.** Engine baru punya 11 nama kesalahan tanpa kode. Ada dua nama yang berisiko rancu: J-CERMIN (cermin semu di pasangan operasi) dan J-SEARAH (perbandingan berbalik), padahal "cermin" dan "searah jarum jam" adalah kata sehari-hari di bab figural.
6. **Bahan soal handbook harus diproduksi baru.** Ke-27 soal 3 paket TO tidak boleh dipakai. Aturan "satu keluarga bentuk ≤ 2 soal per paket" dan "nama bentuk tidak berulang dalam 3 paket" belum mengatur kebutuhan handbook (±50 soal figural), sementara keluarga bentuk juga dibutuhkan untuk target 50 paket.
7. **Ketidakcocokan kecil di skill:** `references/tiu.md` tabel blueprint figural masih menulis "seri 3 (57–59), analogi 1 (60)". Engine v0.4 sudah dikoreksi menjadi "seri 2 · analogi 2" (Gusti: "oke", log figural).

---

## A. Fondasi bersama Bab 14–18

### A1. Daftar perubahan (dasar semua bab)
| Kelompok | Perubahan | Nama untuk siswa (usulan baku) | Dasar di generator |
|---|---|---|---|
| Putar | 0°, 90° searah, 180°, 90° berlawanan (= 270° searah) | "tidak berubah", "diputar 90° searah jarum jam", "diputar 180°", "diputar 90° berlawanan arah jarum jam" | `T`, `T_NAME` di `src/tiu-bentuk.ts` (tetap, r90, r180, r270) |
| Cermin | kiri-kanan, atas-bawah, garis miring /, garis miring \ | "dicermin kiri-kanan", "dicermin atas-bawah", "dicermin pada garis miring" | mkk, mab, md1, md2 |
| Warna | hitam penuh ↔ garis putih | "dibalik warnanya" | `balikWarna` (`tiu-gaya.ts`) |
| Tempat | dua objek bertukar; objek bergilir antarkotak | "bertukar tempat", "pindah satu kotak searah jarum jam" | `tukar` (ANA-OBJ, ANA-UBAH), `geser` (SERI-KUADRAN) |
| Bukan gerak (di luar judul Bab 14) | jumlah bagian ±k; gabung dua gambar; ujung lancip → tumpul; ukuran | "bertambah 2 lekuk", "digabung", "ujungnya ditumpulkan", "membesar" | ANA-UBAH, MTX-HITUNG, MTX-GABUNG; **ukuran belum ada** |

Usulan istilah: pakai "cermin kiri-kanan / atas-bawah", yaitu menamai **apa yang bertukar**, bukan "cermin vertikal/horizontal". Istilah "cermin secara horizontal" di pembahasan Part 39 no. 64 ambigu (riset 2026-10-25). Generator sudah memakai nama yang jelas ini.

### A2. Ide besar dan alasan mengapa benar
- **Sebuah kotak hanya punya 8 cara "diputar atau dibalik" tanpa berubah bentuk:** 4 putaran dan 4 cermin. Setiap gabungan perubahan pasti jatuh ke salah satu dari 8 itu. Karena itu jawaban yang mungkin terbatas, dan setiap pilihan salah bisa dinamai sebagai "perubahan lain dari 8 itu".
- **Aturan genap-ganjil cermin.** Putar = kertas digeser di meja tanpa diangkat, jadi urutan tiga tanda searah jarum jam tetap. Cermin = kertas dibalik dan dilihat dari belakang, jadi urutannya terbalik. Akibatnya:
  - dua kali cermin membuat urutan kembali seperti semula, jadi hasilnya **pasti sebuah putaran**;
  - cermin satu kali ditambah putaran berapa pun membuat urutan tetap terbalik, jadi hasilnya **pasti sebuah cermin**.

  Rumus untuk siswa: hitung banyak cermin. Genap → putaran. Ganjil → cermin. Intuisi ini bisa dipahami siswa SMA tanpa istilah teori grup.
- **Gabungan yang dipakai di soal** (dicek terhadap fungsi `tf` di `figural-lib.ts` dan nama `T_NAME` di generator):
  - putar 90° searah tiga kali = putar 90° berlawanan arah;
  - cermin kiri-kanan lalu cermin atas-bawah = putar 180°;
  - cermin kiri-kanan lalu putar 90° searah = cermin pada garis miring /;
  - putar 90° searah lalu cermin kiri-kanan = cermin pada garis miring \. **Urutan berpengaruh** untuk cermin + putar, tetapi tidak berpengaruh untuk dua putaran;
  - cermin kiri-kanan lalu cermin pada garis miring / = putar 90° searah. Dua cermin yang garisnya membentuk 45° menghasilkan putaran 90°, yaitu dua kali sudut antargaris.
- **Setiap perubahan bisa dibatalkan.**
  - Putar 90° searah dibatalkan oleh putar 90° berlawanan.
  - Putar 180°, cermin, balik warna, dan tukar tempat masing-masing dibatalkan oleh dirinya sendiri.
  - Untuk membatalkan dua langkah, urutannya dibalik: seperti memakai kaus kaki lalu sepatu, yang dilepas lebih dulu adalah sepatu.
  - Inilah dasar "?" di kiri pasangan analogi (generator memakai `inv`/`invOp`) dan dasar cek balik.
- **Balik warna dan tukar tempat tidak bergantung urutan** terhadap putar/cermin satu objek. Karena itu boleh dicek sebagai lapis terpisah.
- **Kiral vs simetris.** Bentuk yang simetris terhadap suatu garis membuat sebagian perubahan tidak bisa dibedakan. Contoh: bentuk yang simetris kiri-kanan, jika dicermin kiri-kanan tampak tidak berubah, dan jika dicermin atas-bawah tampak sama dengan diputar 180°. Siswa wajib mengecek simetri dulu sebelum memutuskan "putar atau cermin". Generator menjamin semua bentuknya kiral (kedelapan perubahannya berbeda, ditambah uji beda piksel ≥ 0,3). Tetapi soal bimbel lain bisa memakai bentuk yang hampir simetris, misalnya elang di Part 39 no. 64.
- **Seluruh gambar vs tiap objek.** Mencermin seluruh kotak = setiap objek dicermin **dan** pindah ke sisi seberang. Mencermin tiap objek di tempatnya = tempat tetap. Pembedaan ini menjadi inti FIG-BEDA-PUTAR versi siluet (setiap objek diputar sendiri) dan pilihan salah "seluruh gambar ikut diubah".
- **Kalimat perubahan.** Untuk tiap objek, tulis satu baris: *objek [letak]: [gerak] · [warna] · [tempat] · [jumlah]*. Format ini dipakai ulang di Bab 15–18.

### A3. Uji kecocokan dengan bentuk soal hari H (jujur)
| Sudut matematika | Cocok? | Bukti di soal acuan |
|---|---|---|
| 8 perubahan + urutan keliling | cocok | Part 39 no. 58: keempat pilihan salahnya = 4 perubahan bernama; Paket 41 no. 60, 62, 63 |
| Gabung dan batal | cocok sebagian | Matriks dua langkah (Part 39 no. 64: putar lalu cermin; Paket 41 no. 63: putar 90° dua kali = 180°). Jarang ditanyakan langsung |
| Kiral vs simetris | cocok sebagai alat cek | Part 39 no. 64 (elang hampir simetris di baris 3) |
| Periode | cocok | Part 39 no. 57–58 (selang tiga), Paket 41 no. 58 (empat kuadran) |
| Tiap objek punya aturan sendiri | cocok | Paket 41 no. 58, 59, 60, 63, 65 |
| Hitung, gabung, tumpuk | **tidak tercakup** bahasa perubahan | Paket 41 no. 61, 62, 64, 65; Part 39 no. 63. Perlu ide besar kedua |
| Ukuran membesar | **tidak tercakup**, generator belum punya | Part 39 no. 59 |
| Putaran 45° | **belum diverifikasi** | Dipakai Pejuang Bab 10–11; tidak terlihat di Part 39/Paket 41 yang kita baca; generator hanya kelipatan 90° |
| Jam di cermin | tidak muncul | Hanya di Pejuang Bab 07 |
| Prinsip 4 "perkirakan dulu" | **kurang pas** untuk figural | Bila dipakai mentah, prinsip ini mendorong siswa berhenti di pola pertama (kesalahan Claude di Paket 41 no. 60, 63). Usul bentuk figuralnya: "saring dengan ciri tercepat, lalu buktikan ke semua objek dan semua pilihan" |

### A4. Kamus nama kesalahan figural (dipakai Bab 14–18)
Kolom "kode": **ada** = sudah ada di Kamus Jebakan engine (Pilar 3); **usulan** = belum ada, perlu putusan.
| Nama untuk siswa (bahasa guru) | Artinya | Bab | kode |
|---|---|---|---|
| salah arah putar | 90° searah dibaca berlawanan, atau sebaliknya | 14–18 | J-ARAH (usulan) |
| putar dikira cermin | 180° tertukar dengan cermin atas-bawah, atau sebaliknya | 14–17 | J-PUTCER (usulan) |
| cerminnya salah garis | kiri-kanan tertukar dengan atas-bawah atau garis miring | 14–18 | J-SUMBU (usulan) |
| cuma memeriksa satu objek | berhenti setelah objek pertama cocok (B-14) | 15, 16, 18 | J-SATU (usulan) |
| objek yang berubah tertukar | perubahan dipasang ke objek lain; salah ambil kolom | 16, 18 | J-OBJEK (usulan) |
| lupa balik warna | warna tidak dibalik, atau dibalik padahal tetap | 14, 16 | J-WARNA (usulan) |
| dikira kembali tegak | bentuk dianggap kembali ke posisi awal | 15, 18 | J-TEGAK (usulan) |
| berhenti di langkah pertama | langkah kedua tidak dikerjakan | 18 | J-LANGKAH (ada) |
| kelebihan atau kurang satu langkah | gambar ke-n dihitung sebagai ke-(n±1); putaran sekali terlalu banyak | 15, 18 | J-NOMOR (ada) |
| menyalin gambar sebelah | menyalin sel tetangga atau gambar yang terlihat | 15, 18 | J-SALIN (usulan; disebut di riset 2026-10-25) |
| lupa pindah tempat | tidak ditukar, atau ditukar padahal tetap | 14, 16 | J-TEMPAT (usulan) |
| seluruh gambar ikut diubah | memutar/mencermin seluruh kotak padahal tiap objek di tempatnya, atau sebaliknya | 14, 17 | J-UTUH (usulan) |
| irama tertukar | aturan satu kelompok dipakai ke kelompok lain (bintik ikut selang tiga; urutan giliran ikut berubah) | 15 | J-IRAMA (usulan) |
| arah perubahan terbalik | "?" di kiri pasangan, tetapi perubahan dipakai maju | 16 | J-BALIK (ada) |
| aturan dari satu contoh saja | aturan tidak diuji di baris atau pasangan kedua | 16, 18 | J-TIGA (ada) |
| terkecoh bentuk | mengikuti bentuk utama, hiasan, atau susunan yang sengaja dibuat beda | 17, 18 | J-PENGALIH (ada) |
| memilih yang paling aneh | gambar berbeda: memilih yang tampak paling lain sekilas | 17 | J-SEKILAS (usulan) |
| hitungan meleset | lebih atau kurang satu (atau dua) | 16–18 | J-HITUNG (usulan) |
| membuang bagian yang sama | gabung dibaca "yang sama dibuang" | 18 | J-GABUNG (usulan) |
| lupa perubahan kecil | ujung tidak ditumpulkan; titik pojok salah | 18 | J-RINCI (usulan) |

Catatan:
- Nama untuk siswa tidak memakai kata "Jebakan Searah" atau "Jebakan Cermin". Di bab figural kedua kata itu bermakna sehari-hari, sehingga bisa rancu dengan J-SEARAH dan J-CERMIN di bab numerik.
- Sebelas nama asli engine semuanya tercakup di tabel. Tambahan baru: satu objek, seluruh gambar, irama, arah terbalik, satu contoh, paling aneh, buang bagian sama, perubahan kecil.

### A5. Peta jenis generator → bab
Path generator: `BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/k12-spatial-engine/`. Daftar jenis: `src/tiu-jenis.ts`. Kesepuluh jenis punya contoh gaya siluet yang sudah disetujui Gusti (10 sampel, `.test-out-siluet/preview.html`).
| Jenis | Isi singkat | Bab | Asal logika | File | Tingkat yang tersedia |
|---|---|---|---|---|---|
| FIG-SERI-P3 | selang tiga (1→4, 2→5, 3→?) + bintik +1 tiap langkah | 15 | Part 39 no. 58 | `tiu-fig-beda-seri.ts` | 2 (tanpa bintik) dan 3 |
| FIG-SERI-KUADRAN | empat kuadran: satu objek diam berputar (periode 4), tiga bergilir (periode 3) | 15 | Paket 41 no. 58 | `tiu-fig-siluet.ts` (siluet), `tiu-fig-beda-seri.ts` (lama) | siluet: 3 saja |
| FIG-ANA-OBJ | tiap objek: putar/cermin/±warna, tukar; "?" di posisi mana pun | 16 (+ ilustrasi 14) | Paket 41 no. 59–60, 65 | `tiu-fig-ana-mtx.ts` | 2 dan 3 |
| FIG-ANA-UBAH | jumlah bagian ±k + tukar + objek bawah diputar/dicermin | 16 | Paket 41 no. 59 (pembahasan resmi) | `tiu-fig-ubah.ts` | 2 dan 3 |
| FIG-BEDA-PUTAR | siluet: tiap objek diputar sendiri, satu objek (bukan terbesar) dicermin | 17 (+ pembuka 14) | Paket 41 no. 62 | `tiu-fig-siluet.ts`; versi lama satu bentuk di `tiu-fig-beda-seri.ts` | siluet: 3 saja |
| FIG-BEDA-HITUNG | hubungan dua jumlah tetap di empat gambar | 17 | Paket 41 no. 61 | `tiu-fig-beda-seri.ts` | 2 dan 3 |
| FIG-BEDA-TUMPUK | aturan berpasangan: hitam di depan ⇔ hiasan sama besar | 17 | Paket 41 no. 62 | `tiu-fig-baru.ts` | 2 dan 3 |
| FIG-MTX-PUTAR | dua langkah perubahan per baris/kolom + titik pojok | 18 | Part 39 no. 64–65, Paket 41 no. 63 | `tiu-fig-ana-mtx.ts` | 2 dan 3 |
| FIG-MTX-HITUNG | cabang +1 dan objek kecil +k, bentuk dan letak diacak | 18 | Paket 41 no. 64 | `tiu-fig-baru.ts` | 2 dan 3 |
| FIG-MTX-GABUNG | kolom 3 = gabungan kolom 1 + 2; ujung lancip → tumpul | 18 | Paket 41 no. 65 | `tiu-fig-ubah.ts` | 2 dan 3 |
| Modul PSI lama (GRID, BANGUN, MTX latin/himpunan, ANA) | seri grid, matriks sudoku/OR/XOR | 15, 18 | PSI | `k12-spasial-seri.ts`, `k12-spasial-mtx.ts`, `k12-spasial-analogi.ts` | gaya geometris yang **ditolak** Gusti ("terlalu klasik/AI") |

**Kemampuan membuat gambar ilustrasi Bab 14** (hanya dibaca dari kode; generator tidak dijalankan):
| Ilustrasi | Bisa? | Dasar | Yang kurang |
|---|---|---|---|
| Satu objek × putar 90/180/270 | bahan ada | `ap`, `T_ALL`, `muat`, `siluet`, `svg`/`cellS`, `layout` (keterangan bawah) | Belum ada keluaran ilustrasi. Galeri mockup hanya menampilkan bentuk hitam/garis/arsir dan daftar nama perubahan berupa **teks** |
| Cermin kiri-kanan / atas-bawah / miring | bahan ada | mkk, mab, md1, md2 | sama |
| Balik warna | bahan ada | `balikWarna`; hanya bentuk gemuk (`tebal` ≥ 0,2) | sama |
| Dua objek bertukar; seluruh kotak vs tiap objek | bahan ada | logika `tukar` (ANA-OBJ), `tata(…, t)` memutar seluruh kotak | Belum ada keluaran ilustrasi |
| Rantai "A lalu B = C" dengan panah | sebagian | `comp` menghitung gabungan; `layout` bisa menaruh tanda di antara sel | Panah belum pernah dicoba |
| Bentuk simetris sebagai pembanding | **tidak** | — | Semua bentuk di daftar wajib lolos uji kiral; bentuk simetris harus dibuat di luar daftar |
| Warna sesuai palet handbook | **tidak** | — | Gambar pembahasan memakai hijau `#1a7f37` + merah `#d32f2f` (gaya PSI) |
| Perubahan ukuran | **tidak** | — | Tidak ada di analogi maupun seri |

Kesimpulan: ilustrasi Bab 14 butuh satu skrip ilustrasi kecil di generator yang memakai fungsi yang sudah ada, tanpa mengubah logika soal. Ini perubahan engine, jadi perlu izin Gusti.

---

## Bab 14 — Bahasa perubahan gambar: putar, cermin, balik warna, tukar (bab dasar)

**1. Ide besar + alasan.** Semua soal gambar dibangun dari sedikit perubahan yang bisa **digabung** dan **dibatalkan**: 8 gerak kotak (4 putar, 4 cermin), balik warna, dan pindah tempat. Gabungan apa pun tetap salah satu dari 8 gerak itu. Banyaknya cermin menentukan hasilnya: genap = putaran, ganjil = cermin. Alasannya: putar tidak membalik urutan keliling, sedangkan cermin membaliknya, dan dua kali dibalik berarti kembali (A2).

**2. Subbagian usulan.**
1. Soal pembuka: "mana yang tidak bisa didapat hanya dengan memutar?"
2. Delapan gerak sebuah kotak (gambar satu bentuk × 8, dengan nama baku).
3. Putar atau cermin? Urutan keliling tiga tanda dan aturan genap-ganjil.
4. Menggabung dan membatalkan: sudut dijumlah; dua cermin = putaran; cermin + putar = cermin lain; urutan berpengaruh; kaus kaki dan sepatu.
5. Kiral vs simetris: kapan putar dan cermin tidak bisa dibedakan.
6. Dua perubahan yang bukan putar: balik warna dan pindah tempat. Seluruh kotak vs tiap objek.
7. Kalimat perubahan per objek (alat untuk Bab 15–18).
8. (Usulan, perlu putusan) Perubahan yang bukan gerak: jumlah, gabung, ukuran. Cukup penunjuk ke Bab 16 dan 18.
9. Soal dibedah → latihan bertarget waktu → ringkasan satu halaman.

**3. Langkah kerja siswa.**
1. Pilih satu penanda yang tidak simetris (ujung, cabang, lekuk).
2. Cek simetri bentuk. Kalau simetris, jangan putuskan "putar atau cermin" dari bentuk itu.
3. Baca urutan tiga penanda searah jarum jam di gambar asal dan hasil: sama → putar; terbalik → cermin.
4. Putar: lihat ke mana penanda pindah (atas → kanan = 90° searah). Cermin: cari garis yang titik-titiknya tidak berpindah.
5. Cek warna, lalu tempat.
6. Tulis kalimat perubahan.
7. Cek balik: terapkan kebalikannya pada hasil. Gambar harus kembali ke asal.

**4. Nama kesalahan.** salah arah putar (J-ARAH) · putar dikira cermin (J-PUTCER) · cerminnya salah garis (J-SUMBU) · lupa balik warna (J-WARNA) · lupa pindah tempat (J-TEMPAT) · seluruh gambar ikut diubah (J-UTUH) · urutan gabungan dibalik, yaitu mengira "cermin lalu putar" = "putar lalu cermin" (masuk J-SUMBU, karena hasilnya cermin garis miring yang lain). Semua kode berstatus usulan.

**5. Bahan internal.**
| Bahan | Bagian | Status |
|---|---|---|
| `k12-spatial-engine/src/tiu-bentuk.ts` | `T`, `T_NAME`, `ap`, `comp`, `inv`, `kiral`, `bedaMin`, `tebal`, `tata`, `PETAK`, `NAMA_PETAK` | siap dipakai untuk ilustrasi; belum ada keluaran ilustrasi |
| `src/tiu-gaya.ts` | `balikWarna`, `arsir` | siap |
| `references/tiu-verbal-figural.md` | §7.5 putar vs cermin (cara cepat urutan searah jarum jam), §7.3 cek tafsir, §7.8 butir 2 | dari PSI, sudah disesuaikan sebagian ke SKD |
| Engine Pilar 4 FIG | aturan "bentuk kiral", Kamus Jebakan figural (11 nama) | draf v0.4 |
| Pembahasan generator | analogi "sarung tangan kanan tidak bisa jadi kiri" (BEDA-PUTAR) | ada, tetapi satu bunyi untuk semua soal sejenis |

**6. Beda dengan Pejuang (Bab 07 Pencerminan + 08 Rotasi).**
- **Cara mereka:**
  - Dua bab terpisah, masing-masing berisi tabel "yang berubah/yang tetap", langkah empat butir dengan satu penanda, kotak "beda cermin dan rotasi" (urutan arah), kartu ingat, dan rumus jam di cermin.
  - Putaran berturut dijumlah dengan tanda (searah +, berlawanan −) lalu modulo 360.
  - Latihan diberi label DASAR/MENENGAH/HOTS. Gambar memakai ikon geometris (bendera, panah, huruf L, titik) berwarna navy-abu.
- **Yang kita lakukan berbeda:**
  1. Satu bab dan satu sistem, bukan dua bab daftar fakta.
  2. Aturan genap-ganjil cermin **beserta alasannya**. Pejuang hanya menyatakan bahwa rotasi tidak membalik urutan.
  3. Gabungan cermin + putar dan urutannya. Pejuang memberi soal 7.7 tetapi tidak menjelaskan bahwa hasilnya cermin garis miring.
  4. Kebalikan dan cek balik.
  5. Kiral vs simetris.
  6. Balik warna, pindah tempat, dan pembedaan seluruh kotak vs tiap objek. Topik-topik ini tidak ada di Bab 07–08 Pejuang.
  7. Kalimat perubahan sebagai alat untuk Bab 15–18.
  8. Gambar siluet organik buatan generator, bukan ikon geometris.
  9. Istilah "kiri-kanan/atas-bawah" yang tidak ambigu.

**7. Celah.**
- Skrip ilustrasi belum ada (A5).
- Bentuk simetris pembanding belum ada.
- Soal satu objek belum ada. FIG-BEDA-PUTAR versi siluet menolak satu objek karena pemeriksa "objek yang dicermin jangan yang terbesar". FIG-ANA-OBJ dengan satu objek belum dicoba.
- Perubahan ukuran belum ada.
- Format latihan Bab 14 belum diputuskan. Soal hari H tidak menanyakan "putar gambar ini 90°" secara langsung (tidak ada di Paket 41), jadi latihan Bab 14 lebih cocok sebagai latihan singkat "sebutkan perubahannya".
- Rumus jam di cermin (Pejuang) tidak muncul di Paket 41: dimasukkan atau dilewati?
- Putaran 45°: belum diverifikasi apakah dipakai di SKD 2026.

**8. Calon soal (spesifikasi, tanpa isi).**
| Peran | Jml | Spesifikasi | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Ilustrasi | 6–8 | (a) satu bentuk × 8 gerak; (b) kiral vs simetris; (c) rantai "cermin kiri-kanan lalu atas-bawah = putar 180°"; (d) "cermin lalu putar" vs "putar lalu cermin"; (e) balik warna; (f) dua objek bertukar; (g) seluruh kotak dicermin vs tiap objek dicermin | — | skrip ilustrasi baru di `k12-spatial-engine` (memakai `tiu-bentuk.ts`); **perlu izin** |
| Soal pembuka | 1 | satu bentuk kiral: empat pilihan hasil putar, satu hasil cermin; tingkat 2 | putar dikira cermin (180°) | FIG-BEDA-PUTAR versi satu bentuk siluet: **perlu penyesuaian** (versi lama bergaya geometris yang ditolak) |
| Dibedah | 2 | (a) gambar asal → hasil: perubahan apa (pilihan = 5 gerak); (b) hasil "cermin kiri-kanan lalu putar 90° searah" | cerminnya salah garis; urutan gabungan dibalik | FIG-ANA-OBJ satu objek (belum dicoba) atau mode baru |
| Latihan bertarget waktu | 6 | 2 sebutkan perubahannya · 2 hasil gabungan dua langkah · 1 cari gambar asal dari hasil (kebalikan) · 1 seluruh kotak vs tiap objek (dua objek) | salah arah putar, putar dikira cermin, seluruh gambar ikut diubah | sama seperti di atas; target waktu menunggu putusan |
| Kotak diskusi (bukan soal) | 1 | bentuk simetris: kenapa putar dan cermin tidak bisa dibedakan | — | ilustrasi (b) |

---

## Bab 15 — Seri gambar

**1. Ide besar + alasan.**
- Deret gambar = deret biasa yang langkahnya sebuah perubahan. Gambar ke-n = gambar pertama yang dikenai perubahan itu (n − 1) kali.
- Setiap perubahan punya **periode**: putar 90° = 4, putar 180°/cermin/balik warna/tukar = 2, gilir tiga kotak = 3. Akibatnya keadaan suatu objek hanya bergantung pada sisa pembagian (n − 1) oleh periodenya, seperti jarum jam.
- Dua kelompok dengan periode berbeda baru berulang bersama setelah KPK periodenya. Contoh: 4 dan 3 → baru berulang di langkah ke-12. Inilah alasan jawaban FIG-SERI-KUADRAN siluet tidak sama dengan gambar mana pun yang terlihat.
- Selang tiga berarti gambar n+3 = perubahan dari gambar n. Ini sama dengan tiga deret yang berjalan berselang, seperti deret angka berselang di Bab 8.

**2. Subbagian usulan.**
1. Soal pembuka.
2. Deret gambar sebagai deret perubahan; periode dan sisa pembagian.
3. Empat irama: tiap langkah, selang dua (ganjil-genap), selang tiga, gilir kursi (pindah kotak).
4. Dua kelompok berirama beda: KPK, dan mengapa menyalin gambar terlihat itu salah.
5. "?" di tengah: maju dari kiri, mundur dari kanan dengan kebalikan perubahan.
6. Seri multi-objek: kalimat perubahan per objek, periksa semua objek di semua pilihan.
7. Soal dibedah → latihan → ringkasan.

**3. Langkah kerja siswa.**
1. Cari bandingan yang cocok: 1→2, 1→3, atau 1→4 (tiap langkah, selang dua, selang tiga).
2. Pecah gambar menjadi objek dan lapis (gerak, warna, jumlah, tempat).
3. Tulis deret per objek.
4. Tentukan periode tiap objek.
5. Hitung keadaan tiap objek di "?" (maju, atau mundur dengan kebalikan).
6. Cocokkan objek demi objek ke **kelima** pilihan.
7. Cek balik dengan gambar sesudah "?" bila ada.

**4. Nama kesalahan.** salah arah putar (J-ARAH) · irama tertukar (J-IRAMA) · kelebihan atau kurang satu langkah (J-NOMOR) · menyalin gambar sebelah (J-SALIN) · dikira kembali tegak (J-TEGAK) · putar dikira cermin (J-PUTCER) · cuma memeriksa satu objek (J-SATU) · hitungan meleset (J-HITUNG). Nama yang sudah dipakai generator: "salah arah perpindahan", "lupa memindahkan objek satu langkah lagi", "salah hitung putaran", "mengganti putar dengan cermin", "urutan giliran ikut berubah", "bintik ikut pola selang tiga", "lupa menambah bintik", "salah hitung lebih satu".

**5. Bahan internal.**
| Bahan | Bagian | Status |
|---|---|---|
| `src/tiu-fig-beda-seri.ts` | FIG-SERI-P3 (dengan/tanpa bintik), FIG-SERI-KUADRAN lama ("?" di gambar 4, gambar 5 membantu = "?" di tengah) | siap; versi lama bergaya non-siluet |
| `src/tiu-fig-siluet.ts` | FIG-SERI-KUADRAN siluet (dua kelompok gerak, "?" di gambar 5) | disetujui Gusti 2026-10-28 |
| `tiu-verbal-figural.md` | §7.1 deret/seri, §7.8 butir 6 | ada |
| Log figural | temuan "seri berperiode 4 → '?' tidak boleh di ujung"; "jawaban ≠ gambar terlihat" | aturan generator |
| Al Faiz | Part 39 no. 57 (cacat: aturan halus tanpa jawaban), no. 58 (kokoh: 4 pilihan salah bernama); Paket 41 no. 57–58 | riset ada |

**6. Beda dengan Pejuang (Bab 10 Serial + 11 Serial Multi-Objek).**
- **Cara mereka:**
  - Tabel atribut dengan pola umum.
  - Trik mengubah arah menjadi derajat (termasuk 45°) supaya rotasi menjadi deret angka.
  - Cek selang-seling ganjil-genap; "?" di tengah dicocokkan dengan kotak sebelum dan sesudahnya.
  - Bab 11 mengajarkan eliminasi bertahap: tiap objek menggugurkan satu pilihan. Pembahasan mereka mengikuti pola itu persis (empat objek → empat pilihan gugur → sisa satu).
- **Yang kita lakukan berbeda:**
  1. Periode dan sisa pembagian (alasan, bukan sekadar trik).
  2. KPK untuk dua kelompok.
  3. Selang tiga sebagai tiga deret berselang, terhubung ke Bab 8.
  4. Mundur dengan kebalikan perubahan.
  5. Peringatan terbuka: soal D'Ajiks sengaja dibuat sehingga "tiap objek menggugurkan satu pilihan" **tidak** berlaku (pilihan salah keliru di 1–2 hal). Jadi siswa wajib memeriksa semua objek di semua pilihan.
  6. Seri multi-objek tidak dijadikan bab terpisah.

**7. Celah.**
- Seri paling sederhana (satu objek, satu perubahan tiap langkah) tidak tersedia sebagai jenis. Yang terdekat adalah FIG-SERI-P3 tingkat 2, dan itu sudah selang tiga.
- Putaran 45° tidak didukung (belum diverifikasi apakah dipakai di SKD).
- Seri grid (benda berjalan di kisi) hanya ada di modul PSI bergaya lama.
- FIG-SERI-KUADRAN siluet hanya tingkat 3.
- Teks analogi dan jebakan generator sama untuk semua soal sejenis ("jadwal piket tiga hari", "empat orang memutari meja"), sehingga latihan sejenis akan berbunyi sama. Ini melanggar B-7.

**8. Calon soal.**
| Peran | Jml | Spesifikasi | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Soal pembuka | 1 | empat kuadran, dua kelompok gerak (satu diam berputar, tiga bergilir), "?" di akhir | menyalin gambar sebelah; irama tertukar | FIG-SERI-KUADRAN siluet (`tiu-fig-siluet.ts`) |
| Dibedah | 2 | (a) selang tiga + bintik maju tiap langkah; (b) empat kuadran dengan "?" di tengah | irama tertukar; kurang satu langkah; salah arah perpindahan | FIG-SERI-P3 siluet; FIG-SERI-KUADRAN lama ("?" di gambar 4), perlu versi siluet |
| Latihan | 6–7 | 2 selang tiga tanpa bintik (tingkat 2) · 2 selang tiga + bintik · 2–3 empat kuadran (arah gilir dan putar bervariasi) | semua di butir 4 | FIG-SERI-P3, FIG-SERI-KUADRAN siluet |

---

## Bab 16 — Analogi gambar

**1. Ide besar + alasan.**
- Analogi (1):(2) = (3):(4) berarti satu "mesin perubahan" yang sama dipasang dua kali. Mesin itu ditulis sebagai kalimat perubahan per objek, lalu diterapkan ke pasangan yang memuat "?".
- Kalau "?" ada di kiri pasangan, yang dipakai adalah **kebalikan** mesin (A2).
- Mesin harus tunggal. Satu contoh bisa dibaca dua cara (misalnya "dicermin" atau "selalu menghadap kiri"; "tambah 2" atau "kali 2"). Soal yang baik membuat semua bacaan memberi jawaban yang sama. Generator membuktikan ini: 16 perubahan per objek diuji, dan tafsir tambah vs kali harus memberi jumlah sama.

**2. Subbagian usulan.**
1. Soal pembuka ("?" di kiri pasangan).
2. Mesin perubahan per objek: yang dipindahkan aturannya per letak, bukan bentuknya.
3. "?" di posisi mana pun: maju atau kebalikan.
4. Perubahan jumlah: tambah atau kali? Uji kedua bacaan.
5. Tukar tempat + perubahan objek (ukuran ikut objeknya).
6. Uji bacaan lain dan cek balik (contoh bantahan).
7. Soal dibedah → latihan → ringkasan.

**3. Langkah kerja siswa.**
1. Tandai pasangan yang lengkap.
2. Tulis kalimat perubahan untuk setiap objek: gerak, warna, jumlah, tempat.
3. Uji: apakah ada bacaan kedua yang juga cocok? Kalau ada, bawa keduanya.
4. Tentukan arah: "?" di kanan pasangan → maju; di kiri → kebalikan.
5. Terapkan per objek.
6. Cocokkan objek demi objek ke kelima pilihan.
7. Cek balik: jawaban dikenai mesin harus menghasilkan pasangannya.

**4. Nama kesalahan.** cuma memeriksa satu objek (J-SATU) · objek yang berubah tertukar (J-OBJEK) · arah perubahan terbalik (J-BALIK) · lupa balik warna (J-WARNA) · salah arah putar (J-ARAH) · cerminnya salah garis (J-SUMBU) · lupa pindah tempat (J-TEMPAT) · hitungan meleset (J-HITUNG) · aturan dari satu contoh saja (J-TIGA). Nama generator: "salah soal balik warna", "salah arah putar atau cermin", "objeknya dibiarkan tidak berubah", "arah perubahannya terbalik", "salah menerapkan tukar tempat", "lupa menukar tempat", "menukar tempat yang seharusnya tetap", "salah hitung lebih/kurang satu", "lupa mengubah objek bawah".

**5. Bahan internal.**
| Bahan | Bagian | Status |
|---|---|---|
| `src/tiu-fig-ana-mtx.ts` | FIG-ANA-OBJ: 8 contoh (1 siluet), `invOp` untuk "?" di kiri, uji "aturan objek tunggal" (16 perubahan) | siap |
| `src/tiu-fig-ubah.ts` | FIG-ANA-UBAH: jumlah ±k, tukar, objek bawah; bukti tambah vs kali | siap (disetujui arah 2026-10-28) |
| `tiu-verbal-figural.md` | §7.3 (cek bacaan konstan; pelajaran Paket 41 no. 60), §7.9 | ada |
| Al Faiz | Paket 41 no. 59, 60 + pembahasan resmi (`REFERENSI LUAR/AL FAIZ TIU 2026-10-28/pembahasan-59-contoh8.png`, `pembahasan-60-contoh6.png`); Part 39 no. 59 (ukuran), 60 (pemetaan objek subjektif, tidak ditiru) | riset ada |
| Uji Paket 41 | kesalahan Claude no. 60 (hanya cek objek kiri) | pelajaran B-14 |

**6. Beda dengan Pejuang (Bab 12 Analogi Gambar).**
- **Cara mereka:**
  - Tabel jenis perubahan (cermin, rotasi, gabungan, arsiran, jumlah, arah/posisi).
  - Langkah: catat semua perubahan A→B, bedakan cermin dan rotasi dengan dua penanda, terapkan ke C atribut demi atribut.
  - Kotak "model terbaru" tentang perubahan per objek. Jebakannya: yang dipindahkan aturan, bukan bentuk.
  - Bentuk soal selalu A : B = C : ? dengan "?" di ujung.
- **Yang kita lakukan berbeda:**
  1. "?" di posisi mana pun dan kebalikan (Pejuang tidak membahas).
  2. Uji bacaan kedua dan contoh bantahan.
  3. Tambah vs kali pada perubahan jumlah.
  4. Kalimat perubahan per objek yang sama dengan Bab 14.
  5. Nama kesalahan tiap pilihan.
  6. Pilihan salah keliru di 1–2 hal, jadi "pilihan yang salah di satu atribut" bukan pola yang bisa diandalkan.

**7. Celah.**
- Perubahan ukuran (Part 39 no. 59) belum ada di generator.
- Analogi satu objek (untuk tahap awal) belum dicoba.
- Teks analogi/jebakan generator berulang per jenis (B-7).
- Bagian bawah FIG-ANA-UBAH sengaja tanpa putar 90° (objek selebar sel). Itu wajar, tetapi perlu dicatat di pembahasan.

**8. Calon soal.**
| Peran | Jml | Spesifikasi | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Soal pembuka | 1 | tiga objek, "?" di posisi (3) | arah perubahan terbalik; cuma memeriksa satu objek | FIG-ANA-OBJ siluet |
| Dibedah | 2 | (a) per objek: putar + balik warna + tukar; (b) jumlah ±k + tukar + objek bawah dicermin | lupa balik warna; lupa pindah tempat; hitungan meleset | FIG-ANA-OBJ, FIG-ANA-UBAH siluet |
| Latihan | 7 | 4 FIG-ANA-OBJ ("?" di 1, 2, 3, 4 masing-masing sekali; dua di antaranya tingkat 2 dengan dua objek) · 3 FIG-ANA-UBAH (keluarga hitung berbeda) | semua di butir 4 | `tiu-fig-ana-mtx.ts`, `tiu-fig-ubah.ts` |

---

## Bab 17 — Gambar berbeda

**1. Ide besar + alasan.**
- Empat gambar adalah satu keluarga: semuanya terhubung oleh perubahan yang "diizinkan". Gambar yang berbeda adalah satu-satunya yang tidak bisa dicapai.
- Cara membuktikannya: cari sifat yang **tidak berubah** oleh perubahan yang diizinkan. Contoh:
  - putar tidak mengubah urutan keliling, jadi gambar hasil cermin keluar dari keluarga;
  - hubungan dua jumlah tetap walau jumlahnya berubah-ubah;
  - pasangan aturan "jika hitam di depan, maka hiasan sama besar".
- Sifat itu sah hanya bila berlaku **tepat** di empat gambar dan tidak ada sifat lain yang menunjuk gambar lain. Generator menegakkan syarat kedua ini.

**2. Subbagian usulan.**
1. Soal pembuka.
2. Keluarga dan sifat yang tetap.
3. Tiga sifat tetap yang dipakai soal: urutan keliling per objek, hubungan hitungan, pasangan aturan.
4. Petunjuk palsu yang sengaja dipasang: bentuk utama dibuat beda semua; susunan paling aneh; ciri mencolok dimiliki lebih dari satu gambar.
5. Uji "tepat empat" dan uji sifat kedua.
6. Soal dibedah → latihan → ringkasan.

**3. Langkah kerja siswa.**
1. Kenali bentuknya: lima gambar tanpa gambar soal. Pilihan jawaban adalah soalnya.
2. Coret petunjuk palsu: bentuk utama, susunan, kerapian.
3. Uji urutan keliling objek demi objek, per letak.
4. Bila tidak ada, hitung dua jenis lalu cari hubungannya (bukan satu jumlah).
5. Bila tidak ada, cari pasangan aturan "jika … maka …".
6. Pastikan sifat itu berlaku tepat di empat gambar.
7. Pastikan tidak ada sifat kedua yang menunjuk gambar lain.

**4. Nama kesalahan.** memilih yang paling aneh (J-SEKILAS) · terkecoh bentuk (J-PENGALIH) · putar dikira cermin (J-PUTCER) · seluruh gambar ikut diubah (J-UTUH) · hitungan meleset / cuma menghitung satu jenis (J-HITUNG) · memilih ciri yang mencolok, bukan pasangan aturannya (J-SEKILAS). Nama generator: "masih bentuk yang sama, hanya posisinya berubah", "tidak ada yang dibalik, jadi masih sekelompok", "sama dengan tiga opsi lain".

**5. Bahan internal.**
| Bahan | Bagian | Status |
|---|---|---|
| `src/tiu-fig-siluet.ts` | FIG-BEDA-PUTAR siluet (tiap objek diputar sendiri; pemeriksa: tidak ada pilihan yang sama dengan pilihan lain diputar utuh) | disetujui 2026-10-28 (setelah versi pertama ditolak) |
| `src/tiu-fig-beda-seri.ts` | FIG-BEDA-HITUNG (≥ 3 jenis, gambar berbeda bukan yang paling gelap/terang, hubungan dua jumlah) | siap |
| `src/tiu-fig-baru.ts` | FIG-BEDA-TUMPUK (aturan berpasangan, tumpang 20–70%) | siap |
| `tiu-bentuk.ts` | `cekSekilas`: gambar berbeda tidak boleh > 15% lebih "lain" sekilas | siap |
| `tiu-verbal-figural.md` | §7.5, §7.6, §7.8 butir 3 | ada |
| Al Faiz | Paket 41 no. 61–62 (perintah soal tidak tampak di tangkapan layar) | riset + uji |

**6. Beda dengan Pejuang (Bab 13 Ketidaksamaan Gambar).**
- **Cara mereka:**
  - Tabel sifat yang sering dipakai (rotasi vs cermin, jumlah genap/ganjil, hubungan dua elemen, kecocokan atribut, kotak hitam bersebelahan, arah putaran).
  - Urutan cek dari yang mudah dihitung.
  - Jebakan: sifat yang membedakan dua dari tiga bukan jawaban; sifat harus berlaku tepat di empat.
- **Yang kita lakukan berbeda:**
  1. Satu ide (keluarga + sifat tetap), bukan daftar sifat.
  2. Pembedaan seluruh gambar vs per objek. Gambar berbeda kita: satu objek kecil dicermin di tempatnya, bukan seluruh gambar.
  3. Hubungan hitungan, bukan sekadar genap/ganjil.
  4. Pasangan aturan.
  5. Peringatan "yang paling aneh bukan jawaban", didukung soal yang memang dirancang begitu (pemeriksa sekilas).
  6. Uji sifat kedua.

**7. Celah.**
- Perintah soal: di tangkapan layar Paket 41 no. 61–62 perintah tidak terlihat. Bunyi perintah di CAT asli **belum diverifikasi**.
- FIG-BEDA-PUTAR siluet hanya tingkat 3 dan menolak satu objek.
- Sifat "kedekatan/hubungan arah dua elemen" (Pejuang) tidak ada di generator. Kemunculannya di SKD belum diverifikasi.

**8. Calon soal.**
| Peran | Jml | Spesifikasi | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Soal pembuka | 1 | tiga objek tiap gambar, tiap objek diputar sendiri, satu objek kecil dicermin | memilih yang paling aneh; seluruh gambar ikut diubah | FIG-BEDA-PUTAR siluet |
| Dibedah | 3 | satu per jenis: putar per objek · hubungan dua jumlah · pasangan aturan tumpuk | putar dikira cermin; cuma menghitung satu jenis; memilih ciri mencolok | FIG-BEDA-PUTAR, FIG-BEDA-HITUNG, FIG-BEDA-TUMPUK siluet |
| Latihan | 6 | 2 per jenis, keluarga bentuk berbeda | semua di butir 4 | idem |

---

## Bab 18 — Matriks 3×3

**1. Ide besar + alasan.**
- Setiap baris (atau kolom) membawa satu kalimat aturan yang sama. Ada tiga keluarga aturan:
  - **gerak**: kolom 1 → 2 = perubahan A, kolom 2 → 3 = perubahan B;
  - **hitung**: jumlah bagian naik tetap;
  - **gabung**: kolom 3 = kolom 1 + kolom 2.
- Untuk gerak, dua langkah bisa digabung menjadi satu perubahan (Bab 14). Sel terakhir dapat dicek dari dua jalan: dari sel sebelahnya dengan B, dan dari sel pertama dengan "A lalu B". Perubahan berlanjut, tidak kembali ke awal: putar 90° dua kali = 180°.
- Aturan sah hanya bila terbukti di dua deret lengkap (G2). Untuk hitung, arah baris dan arah kolom harus memberi angka sama (pemeriksa generator).
- Untuk gabung: bagian yang ada di kedua sel tetap ada (gabung), bukan hilang (buang yang sama). Generator sengaja menaruh bagian inti di kedua kolom supaya bacaan "buang yang sama" gugur.

**2. Subbagian usulan.**
1. Soal pembuka.
2. Satu kalimat per baris: baca arah, uji di dua deret lengkap.
3. Matriks gerak: dua langkah = satu langkah gabungan; bukti dua jalan; jangan anggap kembali tegak.
4. Matriks hitung: hitung semua bagian, abaikan bentuk dan letak; cek baris = kolom.
5. Matriks gabung: gabung vs buang yang sama; perubahan kecil (ujung, titik pojok).
6. (Usulan) Pola sudoku: status celah generator.
7. Soal dibedah → latihan → ringkasan.

**3. Langkah kerja siswa.**
1. Tentukan arah baca (baris atau kolom) dari sel yang bersebelahan.
2. Tulis aturan dari deret 1, lalu uji ke deret 2. Belum lolos → cari aturan lain.
3. Gerak: catat A dan B, lalu gabungkan.
4. Hitung: hitung setiap jenis bagian, abaikan rupa, dan cek arah lainnya.
5. Gabung: cek bagian yang sama di dua sel (tetap = gabung; hilang = buang yang sama).
6. Isi sel "?" per lapis (bentuk, titik pojok, ujung).
7. Bukti kedua: dari sel pertama deret dengan perubahan gabungan, atau dari arah lainnya.

**4. Nama kesalahan.** berhenti di langkah pertama (J-LANGKAH) · dikira kembali tegak (J-TEGAK) · menyalin gambar sebelah (J-SALIN) · salah arah putar (J-ARAH) · kelebihan satu langkah (J-NOMOR) · cerminnya salah garis (J-SUMBU) · lupa perubahan kecil (J-RINCI) · hitungan meleset (J-HITUNG) · membuang bagian yang sama (J-GABUNG) · objek yang berubah tertukar / salah ambil kolom (J-OBJEK) · aturan dari satu contoh saja (J-TIGA) · terkecoh bentuk (J-PENGALIH). Nama generator: "langkah kedua tidak dikerjakan", "bentuk dianggap kembali ke posisi awal", "hanya menyalin sel sebelumnya", "langkah pertama salah arah", "perubahan dikerjakan satu kali terlalu banyak", "titik di pojok yang salah", "lupa menambahkan bagian dari kolom 1/2", "membuang bagian yang sama, padahal digabung", "lupa menumpulkan ujung", "salah ambil kolom", "lebih dua".

**5. Bahan internal.**
| Bahan | Bagian | Status |
|---|---|---|
| `src/tiu-fig-ana-mtx.ts` | FIG-MTX-PUTAR: bukti 8×8 pasangan langkah, `awal` beda tiap bentuk, pilihan salah "kembali tegak" | siap |
| `src/tiu-fig-baru.ts` | FIG-MTX-HITUNG (desain DIPERTAHANKAN Gusti), cek arah baris = kolom | siap |
| `src/tiu-fig-ubah.ts` | FIG-MTX-GABUNG: 7 aturan himpunan diuji, lancip → tumpul | siap |
| Modul PSI lama `k12-spasial-mtx.ts` | latin/sudoku, OR, XOR, KURANG, WALK | gaya ditolak; hanya sumber logika |
| `tiu-verbal-figural.md` | §7.2 (pelajaran Paket 41 no. 63), §7.8 butir 4–5, 7 | ada |
| Al Faiz | Paket 41 no. 63–65 (pembahasan resmi 64/65); Part 39 no. 63 (hitung, dua aturan beri angka sama), 64 (bukti dua arah), 65 (cacat: aturan tidak berlaku di semua baris, tidak ditiru) | riset ada |

**6. Beda dengan Pejuang (Bab 09 9 Kotak).**
- **Cara mereka:**
  - Tabel enam aturan (jumlah, sudoku, OR, XOR, rotasi bertahap, penjumlahan jumlah).
  - Pisahkan atribut; uji dua baris; kotak "model terbaru: gabungan warna" (hitam + hitam = putih); trik OR vs XOR.
- **Yang kita lakukan berbeda:**
  1. Tiga keluarga aturan dalam satu kerangka "kalimat per baris".
  2. Gabungan dua langkah menjadi satu dan bukti dua jalan.
  3. "Perubahan berlanjut" sebagai kesalahan bernama (kesalahan Claude sendiri di Paket 41 no. 63 bisa diceritakan sebagai contoh nyata).
  4. Cek baris = kolom pada hitung.
  5. Perubahan kecil (ujung, titik pojok).
  6. Soal buatan kita tidak memuat aturan yang hanya berlaku di sebagian baris, sedangkan Al Faiz Part 39 no. 65 memuatnya.

**7. Celah.**
- Pola sudoku/latin (Pejuang Bab 09; bingkai "tiga kelompok per baris" di Paket 41 no. 63) belum ada di generator TIU siluet. Contoh Al Faiz tambahan 1 (latin pasangan) ditahan menunggu pembahasan resmi (putusan Gusti).
- XOR / gabungan warna (Pejuang) tidak ada di generator TIU. Kemunculannya di SKD 2026 belum diverifikasi.
- Teks analogi berulang per jenis ("jarum jam yang terus maju").

**8. Calon soal.**
| Peran | Jml | Spesifikasi | Kesalahan dipancing | Sumber pembuat |
|---|---|---|---|---|
| Soal pembuka | 1 | matriks gerak arah baris, dua langkah sama (putar 90° tiap baris) → baris 3 = 180° | dikira kembali tegak; menyalin gambar sebelah | FIG-MTX-PUTAR siluet |
| Dibedah | 3 | (a) gerak dua langkah berbeda + titik pojok; (b) hitung cabang + objek kecil; (c) gabung + ujung tumpul | berhenti di langkah pertama; hitungan meleset; membuang bagian yang sama | FIG-MTX-PUTAR, FIG-MTX-HITUNG, FIG-MTX-GABUNG siluet |
| Latihan | 7 | 3 gerak (arah kolom/baris, satu tingkat 2) · 2 hitung · 2 gabung | semua di butir 4 | idem |

---

## Ringkasan jumlah calon soal (usulan, diputuskan di Tahap 2)
| Bab | Pembuka | Dibedah | Latihan | Ilustrasi | Sumber |
|---|---|---|---|---|---|
| 14 | 1 | 2 | 6 | 6–8 | perlu penyesuaian generator |
| 15 | 1 | 2 | 6–7 | — | generator siap |
| 16 | 1 | 2 | 7 | — | generator siap |
| 17 | 1 | 3 | 6 | — | generator siap |
| 18 | 1 | 3 | 7 | — | generator siap |
| **Total** | 5 | 12 | 32–33 | 6–8 | ±50 soal figural baru |

Pembanding: Pejuang Bab 07–13 = 17 contoh + 55 latihan. Usulan kita lebih sedikit latihan, tetapi setiap pilihan salah diberi nama dan setiap soal dibahas.
Target waktu: belum ada angka figural. Engine Pilar 6 hanya memberi rata-rata 50–55 detik per butir untuk seluruh TIU. **Perlu putusan.**

---

## Putusan yang perlu diminta ke Gusti (urut prioritas)
1. **Sumber soal handbook figural:** produksi baru lewat generator, dengan keluarga bentuk sendiri dan tidak memakai 27 soal TO. Bagaimana aturan pemakaian keluarga di handbook (misal ≤ 2 soal per keluarga per bab; nama bentuk tidak berulang dengan TO 1–3), mengingat keluarga yang sama juga dibutuhkan untuk target 50 paket?
2. **Tingkat soal di handbook:** bolehkah soal tingkat 2 (satu aturan) untuk pembuka dan latihan awal? Putusan 2026-10-28 "semua figural sedang–sulit" dibuat untuk paket TO.
3. **Izin perubahan kecil di generator untuk handbook:**
   - (a) skrip ilustrasi Bab 14;
   - (b) versi satu objek untuk FIG-BEDA-PUTAR / FIG-ANA-OBJ;
   - (c) daftar spesifikasi "handbook" di CLI (seperti `tiu-paket.ts`);
   - (d) warna gambar pembahasan mengikuti palet handbook, bukan hijau-merah PSI;
   - (e) teks analogi/jebakan bervariasi per soal.
4. **Kode Kamus Jebakan figural:** setuju menambah kode usulan (J-ARAH, J-PUTCER, J-SUMBU, J-SATU, J-OBJEK, J-WARNA, J-TEGAK, J-SALIN, J-TEMPAT, J-UTUH, J-IRAMA, J-SEKILAS, J-HITUNG, J-GABUNG, J-RINCI) ke engine Pilar 3 dan Bab 19, serta memakai ulang J-LANGKAH, J-NOMOR, J-BALIK, J-TIGA, J-PENGALIH?
5. **Cakupan Bab 14:** tetap empat perubahan sesuai judul, atau ditambah subbagian pendek "perubahan yang bukan gerak" (jumlah, gabung, ukuran)? Terkait: generator belum punya perubahan ukuran (Part 39 no. 59).
6. **Istilah baku untuk siswa:** "cermin kiri-kanan / atas-bawah / garis miring", "putar 90° searah / berlawanan arah jarum jam", "balik warna", "pindah tempat", menggantikan "vertikal/horizontal".
7. **Format latihan Bab 14:** latihan singkat "sebutkan perubahannya" (pilihan berupa nama perubahan), karena soal hari H tidak menanyakan putar/cermin satu gambar secara langsung?
8. **Topik Pejuang di luar Paket 41:** jam di cermin, putaran 45°, pola sudoku/latin, XOR/gabungan warna. Dimasukkan sebagai catatan pendek atau dilewati?
9. **Target waktu latihan figural:** angka per bab (belum ada acuan).
10. **Perbaikan kecil skill:** tabel blueprint figural di `references/tiu.md` ("seri 3 · analogi 1") disamakan dengan engine v0.4 ("seri 2 · analogi 2").
