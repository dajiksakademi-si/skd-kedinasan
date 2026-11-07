# Tahap 2 — Bagian E: Rencana Contoh dan Latihan Figural (Bab 14–18)

Tanggal: 2026-10-30 · Penyusun: subagen E (Tahap 2) · Status: spesifikasi saja. Tidak ada soal yang dibuat; generator tidak dijalankan dan tidak diubah.

**Dasar:** log `riset/2026-10-30-log-handbook-tiu.md` (Putusan 1–11), `reports/tahap1_E_figural.md` (putusan terbuka no. 1, 2, 7, 9), `reports/tahap1_A_pembuka_penutup.md` Tabel 2C, engine TIU v0.4.2 (Pilar 3 kode JF-*, Pilar 4 FIG, Pilar 6, format pembahasan 7 langkah), generator `k12-spatial-engine/src/` (`tiu-peta-paket.ts`, `tiu-paket.ts`, `tiu-jenis.ts`, `tiu-bentuk.ts`, `tiu-aset.ts`, `tiu-pola.ts`, `tiu-fig-*.ts`, `tiu-generate.ts`, `k12-spasial-core.ts`, `AGENTS.md`), memory `skd-tiu-engine-3k` dan `feedback-figural-kedinasan`.

---

## Ringkasan

1. **50 soal + 12 gambar penjelas.** Bab 14: 9 soal + 9 ilustrasi · Bab 15: 10 soal + 1 · Bab 16: 10 soal · Bab 17: 10 soal · Bab 18: 11 soal + 2.
2. **Tingkat:** 2 soal tingkat 1, 15 soal tingkat 2, 33 soal tingkat 3. Bab 15–18 tetap didominasi tingkat 3 (31 dari 41 soal).
3. **Waktu:** target tingkat 3 per jenis disusun supaya satu paket TO berjumlah 9:00–9:05. Angka ini cocok dengan Tabel 2C (blok figural 9 soal × 60 detik).
4. **Keluarga bentuk:** 29 soal memuat keluarga yang belum pernah dipakai Paket 1–3. Sisanya memakai keluarga TO dengan benih khusus handbook dan pasangan jenis × keluarga yang belum dipakai TO. Alasannya tercatat di bagian 2: keluarga bebas-TO tidak cukup untuk jenis hitung.
5. **Generator:** 10 butir perubahan. Tujuh butir sudah tercakup izin Putusan 10, tiga butir menunggu Putusan E-1 atau E-3. Setiap butir diuji dengan pembandingan berkas utuh terhadap keluaran 3 paket TO.
6. **Halaman (usulan):** siswa ±101 hlm, pengajar ±112 hlm untuk lima bab figural, termasuk pembahasan latihan di Lampiran.
7. **Putusan yang diminta:** 3 (bagian 5).

---

## 0. Patokan yang dipakai tabel

**Tingkat** (ditentukan oleh spesifikasi soal, bukan oleh label `tier` di generator; label itu hanya 2 atau 3 dan tidak mengatur logika):
- **1** = mengenali satu perubahan pada satu objek. Hanya untuk latihan dasar Bab 14, bukan bentuk soal hari H.
- **2** = satu aturan (atau satu sifat pembeda) pada 1–2 objek.
- **3** = dua aturan atau lebih, atau satu aturan per objek pada ≥ 3 objek. Setara TO (putusan 2026-10-28 "sedang–sulit").

**Target waktu (usulan, wajib dikalibrasi dengan catatan waktu tryout):**
| Jenis | Tingkat 3 (detik) | Tingkat 2 (detik) |
|---|---|---|
| FIG-SERI-P3 | 55 | 40 |
| FIG-SERI-KUADRAN | 70 | 45 |
| FIG-ANA-OBJ | 60 | 45 |
| FIG-ANA-UBAH | 70 | — |
| FIG-BEDA-PUTAR | 60 | 40 (1 objek) · 45 (2 objek) |
| FIG-BEDA-HITUNG | 55 | — |
| FIG-BEDA-TUMPUK | 60 | — |
| FIG-MTX-PUTAR | 60 | 50 |
| FIG-MTX-HITUNG | 45 | — |
| FIG-MTX-GABUNG | 65 | — |
| Bab 14 tingkat 1 "sebutkan perubahannya" | — | 25 |

Uji jumlah: Paket 1 = 70 + 55 + 70 + 60 + 55 + 60 + 60 + 45 + 65 = 540 detik (9:00). Paket 2 = 545 detik, Paket 3 = 540 detik. Rata-rata 60 detik per soal figural sama dengan Tabel 2C. Rata-rata ±86 detik untuk seluruh TIU (Putusan 5) tidak berubah, karena blok lain lebih lama.

Untuk Contoh Soal dan Pembahasan, angka detik adalah **target coba**: siswa mengerjakan sendiri dulu sebelum membaca pembahasan.

**Keluarga bentuk** (rincian aturan di bagian 2):
- **Bebas-TO**: keluarga yang tidak dipakai Paket 1–3 menurut `PETA` dan `PAKET`.
  - LAUT: ikan, kail, cumi.
  - PERKAKAS: palu, payung, kunci, teko, gunting.
  - WARISAN: layang, gasing, kendi, kipas, terompet. Di `tiu-aset.ts` temanya "nusantara", sehingga pemeriksa menyamakannya dengan gaya lama "nusantara" (pucuk, kawung, parang) yang dipakai P1/P3.
  - SATWA: burung, kucing, kupu, kura. Bentuknya rinci, jadi hanya boleh sebagai objek besar.
  - PADI: keluarga berparameter yang tipis. Statusnya cadangan: tanpa balik warna, satu objek saja.
  - ILUS: rajawali (lambang) + bolakisi, obor, sayapbulu (tekstur). Khusus gambar penjelas.
- **TO·H**: keluarga berparameter yang sudah dipakai TO (sabit, rantai, pita, tunas, kerang, keris, gulung, teratai, sayap, batu, awan, ranting, ikalkembar). Di handbook hanya boleh dengan benih ≥ 900 dan pasangan jenis × keluarga yang tidak ada di Paket 1–3.
- **GABUNG-k**: kombinasi tiga pola gabung yang tidak dipakai TO. TO sudah memakai {puncak, kelopak, lengkung}, {kelopak, sinar, lengkung}, dan {puncak, kelopak, sinar}.
- Spiral tidak dihitung bebas-TO, karena label pemeriksanya "pola", sama dengan ikal di P1. Bulu juga tidak, karena labelnya "alam".

**Perubahan generator:** semua soal membutuhkan G1 (mode handbook + pemeriksa), G2 (palet), dan G3 (teks pembahasan). Kolom "Generator" di tabel hanya menyebut tambahan di luar ketiganya. Daftar G1–G10 ada di bagian 3.

---

## 1. Tabel slot per bab

### Bab 14 — Rotasi, Pencerminan, dan Perubahan Warna Gambar
| Slot | Jenis | Aturan / perubahan | Tk | Keluarga | Kesalahan dipasang | Dtk | Generator |
|---|---|---|---|---|---|---|---|
| P14 pembuka | FIG-BEDA-PUTAR 1 objek | lima gambar satu bentuk: empat hasil putar, satu hasil cermin ("mana yang tidak bisa didapat hanya dengan memutar?") | 2 | PERKAKAS | JF-PUTCER, J-PENGALIH | 40 | G4 |
| C14-1 | FIG-ANA-OBJ 1 objek | (1)→(2) = cermin pada garis miring (cermin kiri-kanan lalu putar 90° searah), "?" di (4) | 2 | LAUT | JF-SUMBU, JF-PUTCER, JF-ARAH, JF-SALIN | 45 | G5 |
| C14-2 | FIG-ANA-OBJ 2 objek | satu objek dicermin + balik warna, objek lain tetap, keduanya bertukar tempat | 3 | WARISAN (gemuk) | JF-UTUH, JF-TUKAR, JF-WARNA, JF-SATU | 60 | — |
| L14-1 | sebutkan perubahannya | gambar asal → hasil, opsi = 5 nama perubahan | 1 | SATWA | JF-ARAH, JF-PUTCER, JF-SUMBU | 25 | G8 |
| L14-2 | sebutkan perubahannya | idem, perubahan berupa cermin | 1 | PERKAKAS | JF-SUMBU, JF-PUTCER, JF-ARAH | 25 | G8 |
| L14-3 | kenakan dua langkah | perintah tertulis "dicermin atas-bawah, lalu diputar 90° searah jarum jam", opsi 5 gambar | 2 | LAUT | J-LANGKAH, JF-SUMBU (urutan dibalik), JF-ARAH | 40 | G8 |
| L14-4 | kenakan dua langkah | putar 90° berlawanan lalu cermin kiri-kanan | 2 | SATWA | J-LANGKAH, JF-SUMBU, JF-PUTCER | 40 | G8 |
| L14-5 | FIG-ANA-OBJ 1 objek | "?" di (1): cari gambar asal (kebalikan) | 2 | PADI | J-BALIK, JF-ARAH, JF-SUMBU | 45 | G5 |
| L14-6 | FIG-ANA-OBJ 2 objek | tiap objek dicermin di tempatnya, bukan seluruh kotak | 3 | TO·H batu | JF-UTUH, JF-TUKAR, JF-SATU | 60 | — |

**Gambar penjelas Bab 14** (semuanya dari G7; tanpa opsi, tanpa kunci):
| Slot | Isi | Keluarga |
|---|---|---|
| I14-1 | satu bentuk × 8 gerak, dengan nama baku (`T_NAME` sudah sesuai Putusan 9b) | ILUS rajawali |
| I14-2 | tiga penanda bernomor: putar mempertahankan urutan keliling, cermin membaliknya | ILUS sayapbulu |
| I14-3 | rantai berpanah: cermin kiri-kanan lalu atas-bawah = putar 180°; dua cermin bersudut 45° = putar 90° | ILUS obor |
| I14-4 | urutan berpengaruh: "cermin kiri-kanan lalu putar 90° searah" ≠ "putar 90° searah lalu cermin kiri-kanan" (garis miring / dan \); cara membatalkan dua langkah | ILUS obor |
| I14-5 | kiral vs simetris: bentuk simetris = bentuk + bayangan cerminnya, dibuat di skrip | ILUS bolakisi (bukan rajawali: bentuk burung simetris mudah menyerupai lambang lembaga) |
| I14-6 | balik warna (bentuk gemuk, tebal ≥ 0,2) | ILUS bolakisi |
| I14-7 | pindah tempat; seluruh kotak dicermin vs tiap objek dicermin di tempatnya | ILUS dua objek |
| I14-8 | perubahan bukan gerak (Putusan 8): jumlah +2, gabung, ukuran | TO·H keris (benih ≥ 900), pola ranting, ILUS obor |
| I14-9 | catatan putaran 45° (0°, 45°, 90°); keterangan "kemunculan di SKD 2026 belum diverifikasi" | ILUS sayapbulu |

Catatan jam di cermin (Putusan 8): teks + tabel, tanpa gambar. Latihan Bab 14: 6 soal, 235 detik (±4 menit).

### Bab 15 — Pola Deret Gambar
| Slot | Jenis | Aturan / perubahan | Tk | Keluarga | Kesalahan dipasang | Dtk | Generator |
|---|---|---|---|---|---|---|---|
| P15 pembuka | FIG-SERI-KUADRAN siluet | dua kelompok: satu objek diam berputar (periode 4), tiga bergilir (periode 3); "?" di gambar 5 | 3 | WARISAN | JF-SALIN, JF-OBJEK, JF-ARAH, J-NOMOR | 70 | — |
| C15-1 | FIG-SERI-P3 siluet | selang tiga, satu perubahan, tanpa bintik | 2 | SATWA | JF-SALIN, JF-ARAH, JF-PUTCER, J-TIGA | 40 | G9 |
| C15-2 | FIG-SERI-P3 siluet + bintik | selang tiga + bintik bertambah tiap langkah | 3 | LAUT | JF-OBJEK (irama tertukar), JF-HITUNG, JF-ARAH, JF-SALIN | 55 | — |
| C15-3 | FIG-SERI-KUADRAN siluet | dua kelompok; "?" di gambar 4, gambar 5 tampak (mundur dengan kebalikan) | 3 | PERKAKAS | J-NOMOR, JF-ARAH, JF-OBJEK, JF-SALIN | 70 | G10 |
| L15-1 | FIG-SERI-P3 siluet | selang tiga tanpa bintik, putar 90° | 2 | TO·H sabit | JF-ARAH, JF-SALIN, JF-PUTCER | 40 | G9 |
| L15-2 | FIG-SERI-KUADRAN siluet | satu kelompok: empat objek bergilir searah | 2 | TO·H kerang | JF-ARAH, J-NOMOR, JF-SALIN | 45 | G9 |
| L15-3 | FIG-SERI-P3 siluet + bintik | selang tiga + bintik, cermin atas-bawah | 3 | TO·H gulung | JF-OBJEK, JF-HITUNG, JF-PUTCER | 55 | — |
| L15-4 | FIG-SERI-P3 siluet + bintik | selang tiga + bintik, cermin garis miring | 3 | TO·H teratai | JF-SUMBU, JF-OBJEK, JF-HITUNG | 55 | — |
| L15-5 | FIG-SERI-KUADRAN siluet | dua kelompok, gilir berlawanan arah, putar 90° berlawanan | 3 | TO·H sayap | JF-ARAH, JF-OBJEK, JF-SALIN, J-NOMOR | 70 | — |
| L15-6 | FIG-SERI-KUADRAN siluet | dua kelompok, "?" di gambar 4 | 3 | TO·H ikalkembar | J-NOMOR, JF-OBJEK, JF-ARAH | 70 | G10 |

Gambar penjelas: I15-1, deret satu objek yang menunjukkan periode 4 (putar 90°) dan periode 2 (cermin), sebagai dasar sisa pembagian. Keluarga ILUS, dibuat G7 (E-3). Latihan Bab 15: 6 soal, 335 detik (±5,5 menit).

### Bab 16 — Analogi Gambar
| Slot | Jenis | Aturan / perubahan | Tk | Keluarga | Kesalahan dipasang | Dtk | Generator |
|---|---|---|---|---|---|---|---|
| P16 pembuka | FIG-ANA-OBJ 3 objek | tiap objek: putar / cermin / tetap; "?" di (3), jadi perubahan dipakai terbalik | 3 | TO·H batu | J-BALIK, JF-SATU, JF-OBJEK, JF-ARAH | 60 | — |
| C16-1 | FIG-ANA-OBJ 2 objek | satu perubahan yang sama untuk kedua objek, "?" di (4) | 2 | SATWA | JF-SATU, JF-ARAH, JF-SUMBU | 45 | — |
| C16-2 | FIG-ANA-UBAH | jumlah ±k pada dua objek atas + tukar + objek bawah dicermin; uji bacaan tambah vs kali | 3 | TO·H keris + ranting (hitung), LAUT (bawah) | JF-HITUNG, JF-TUKAR, JF-SATU, J-TIGA | 70 | — |
| L16-1 | FIG-ANA-OBJ 1 objek | "?" di (2) | 2 | PERKAKAS | JF-ARAH, JF-PUTCER, JF-SALIN | 45 | G5 |
| L16-2 | FIG-ANA-OBJ 2 objek | "?" di (1), kebalikan | 2 | WARISAN | J-BALIK, JF-SATU, JF-SUMBU | 45 | — |
| L16-3 | FIG-ANA-OBJ 3 objek | putar + balik warna + tukar, "?" di (4) | 3 | TO·H awan (gemuk) | JF-WARNA, JF-TUKAR, JF-SATU, JF-ARAH | 60 | — |
| L16-4 | FIG-ANA-OBJ 3 objek | cermin + putar + tetap, "?" di (3) | 3 | TO·H tunas | J-BALIK, JF-OBJEK, JF-SUMBU | 60 | — |
| L16-5 | FIG-ANA-OBJ 2 objek + ukuran | satu objek membesar, satu diputar | 3 | TO·H gulung | JF-SATU, JF-OBJEK, JF-ARAH | 60 | G6 |
| L16-6 | FIG-ANA-UBAH | jumlah ±k + tukar, objek bawah diputar 180° | 3 | TO·H keris + awan (hitung), PERKAKAS (bawah) | JF-HITUNG, JF-TUKAR, JF-PUTCER | 70 | — |
| L16-7 | FIG-ANA-UBAH | jumlah ±k tanpa tukar, objek bawah dicermin | 3 | TO·H rantai + batu (hitung), PADI (bawah) | JF-HITUNG, JF-TUKAR, JF-SATU | 70 | — |

Pasangan hitung ANA-UBAH di TO: lekuk + bintang, kerang + tunas, sayap + teratai. Handbook memakai pasangan lain. Latihan Bab 16: 7 soal, 410 detik (±7 menit).

### Bab 17 — Gambar yang Berbeda
| Slot | Jenis | Aturan / perubahan | Tk | Keluarga | Kesalahan dipasang | Dtk | Generator |
|---|---|---|---|---|---|---|---|
| P17 pembuka | FIG-BEDA-PUTAR 3 objek | tiap objek diputar sendiri; satu objek kecil dicermin di tempatnya | 3 | PERKAKAS | J-PENGALIH, JF-UTUH, JF-PUTCER | 60 | — |
| C17-1 | FIG-BEDA-PUTAR 2 objek | idem, dua objek; yang dicermin objek kecil | 2 | LAUT | JF-PUTCER, J-PENGALIH, JF-UTUH | 45 | G4 |
| C17-2 | FIG-BEDA-HITUNG | hubungan dua jumlah tetap di empat gambar | 3 | WARISAN (butir) | JF-SATU, JF-HITUNG, J-PENGALIH | 55 | — |
| C17-3 | FIG-BEDA-TUMPUK | pasangan aturan: hitam di depan ⇔ hiasan sama besar | 3 | TO·H sabit (5 varian) + PERKAKAS (hiasan) | J-PENGALIH, JF-SATU | 60 | — |
| L17-1 | FIG-BEDA-PUTAR 2 objek | idem C17-1, susunan lain | 2 | SATWA | JF-PUTCER, J-PENGALIH | 45 | G4 |
| L17-2 | FIG-BEDA-PUTAR 3 objek | petak susunan lain | 3 | TO·H pita | J-PENGALIH, JF-UTUH, JF-PUTCER | 60 | — |
| L17-3 | FIG-BEDA-HITUNG | hubungan dua jumlah | 3 | TO·H kerang + tunas + rantai (butir) | JF-SATU, JF-HITUNG, J-PENGALIH | 55 | — |
| L17-4 | FIG-BEDA-HITUNG | hubungan dua jumlah, jenis butir lain | 3 | TO·H gulung + awan + batu (butir) | JF-SATU, JF-HITUNG | 55 | — |
| L17-5 | FIG-BEDA-TUMPUK | pasangan aturan | 3 | TO·H tunas + WARISAN (hiasan) | J-PENGALIH, JF-SATU | 60 | — |
| L17-6 | FIG-BEDA-TUMPUK | pasangan aturan | 3 | TO·H rantai + LAUT (hiasan) | J-PENGALIH, JF-SATU | 60 | — |

Latihan Bab 17: 6 soal, 335 detik (±5,5 menit). Bunyi perintah soal gambar berbeda di CAT asli belum diverifikasi (celah T1), jadi handbook memakai perintah generator.

### Bab 18 — Matriks Gambar 3 × 3
| Slot | Jenis | Aturan / perubahan | Tk | Keluarga | Kesalahan dipasang | Dtk | Generator |
|---|---|---|---|---|---|---|---|
| P18 pembuka | FIG-MTX-PUTAR | arah baris, dua langkah sama (putar 90°), sehingga sel terakhir terputar 180° | 2 | SATWA | JF-AWAL, JF-SALIN, J-NOMOR | 50 | — |
| C18-1 | FIG-MTX-PUTAR + titik pojok | dua langkah berbeda; bukti dua jalan | 3 | TO·H kerang | J-LANGKAH, JF-AWAL, JF-SUMBU, JF-SATU (titik pojok) | 60 | — |
| C18-2 | FIG-MTX-HITUNG | cabang +1 dan objek kecil +k; cek baris = kolom | 3 | TO·H keris (pusat) + PERKAKAS (kecil) | JF-HITUNG, JF-SATU, J-PENGALIH | 45 | — |
| C18-3 | FIG-MTX-GABUNG | kolom 3 = kolom 1 + kolom 2; ujung lancip menjadi tumpul | 3 | GABUNG-k {ranting, lengkung, sinar} | JF-GABUNG, JF-SATU (ujung), JF-OBJEK (salah ambil kolom) | 65 | — |
| L18-1 | FIG-MTX-PUTAR | arah kolom, satu langkah sama (putar 90° berlawanan). Dua cermin sama tidak dipakai, karena jawabannya akan sama dengan sel terlihat | 2 | WARISAN | JF-AWAL, JF-ARAH, JF-SALIN | 50 | — |
| L18-2 | FIG-MTX-PUTAR | dua langkah berbeda, arah kolom | 3 | TO·H tunas | J-LANGKAH, JF-AWAL, JF-SUMBU | 60 | — |
| L18-3 | FIG-MTX-PUTAR + titik pojok | dua langkah berbeda, arah baris | 3 | TO·H ikalkembar | J-LANGKAH, JF-SATU, J-NOMOR | 60 | — |
| L18-4 | FIG-MTX-HITUNG | hitung dua jenis | 3 | TO·H teratai (pusat) + LAUT (kecil) | JF-HITUNG, JF-SATU | 45 | — |
| L18-5 | FIG-MTX-HITUNG | hitung dua jenis | 3 | TO·H sayap (pusat) + awan (kecil) | JF-HITUNG, J-PENGALIH | 45 | — |
| L18-6 | FIG-MTX-GABUNG | gabung + ujung | 3 | GABUNG-k {ranting, puncak, lengkung} | JF-GABUNG, JF-SATU, JF-OBJEK | 65 | — |
| L18-7 | FIG-MTX-GABUNG | gabung + ujung | 3 | GABUNG-k {puncak, sinar, lengkung} | JF-GABUNG, JF-SATU, J-TIGA | 65 | — |

Gambar penjelas (Putusan 8, catatan pendek; E-3):
- I18-1: persegi latin 3 × 3, yaitu tiga bentuk yang bergeser letak tiap baris.
- I18-2: gabungan warna (hitam + hitam = putih), diambil dari bagian gabung yang sudah ada, sebagai pembeda "gabung" dan "buang yang sama".

Keduanya diberi keterangan "kemunculan di SKD 2026 belum diverifikasi". Latihan Bab 18: 7 soal, 390 detik (6,5 menit).

---

## 2. Aturan pemakaian keluarga bentuk di handbook (usulan, Putusan E-2)

**Fakta dari kode.**
- Paket 1–3 memakai 22 keluarga menurut label pemeriksa.
- Keluarga yang belum pernah dipakai hanya benda (laut, perkakas, warisan, satwa, tekstur, lambang) dan padi. Jumlahnya 21 nama tetap, ditambah padi.
- Semua keluarga hitung (`HITUNG_JENIS`: keris, ranting, kerang, tunas, teratai, batu, sayap, awan, rantai) sudah dipakai TO. Akibatnya jenis HITUNG, ANA-UBAH, dan BEDA-HITUNG **tidak mungkin** dibuat dengan keluarga bebas-TO saja.
- Kebutuhan handbook ±150 pemakaian nama (dihitung dari tabel bagian 1). Bila hanya keluarga bebas-TO yang dipakai, kebutuhan itu tidak tertutup: 21 nama × 5 bab = paling banyak 105 pemakaian, karena satu nama tidak boleh berulang dalam satu bab.

**Aturan.**
- **R1. Benda = keluarga khusus handbook.** LAUT, PERKAKAS, WARISAN, SATWA, dan PADI didahulukan untuk handbook. Paket TO 4–50 tidak memakainya. ILUS (lambang + tekstur) hanya untuk gambar penjelas dan tidak pernah dijadikan soal, sehingga jawaban latihan tidak bisa dikenali dari ilustrasi.
- **R2. Keluarga TO di handbook hanya dengan benih ≥ 900.** Paket TO memakai benih < 900. Dengan begitu, nama bentuk handbook dan nama bentuk TO tidak pernah sama, berapa pun jumlah paketnya.
- **R3. Pasangan jenis × keluarga dari Paket 1–3 tidak diulang di handbook.** Contohnya kerang untuk BEDA-TUMPUK, molekul untuk ANA-OBJ, awan untuk MTX-PUTAR, dan pasangan hitung ANA-UBAH. Kerangka spesifikasi juga tidak boleh sama dengan soal TO mana pun. Kerangka = semua isian spesifikasi selain nama bentuk, benih, dan kunci.
- **R4. Per bab berlaku pemeriksa paket yang sudah ada (`cekPaket`).** Isinya: satu keluarga paling banyak 2 soal, satu nama bentuk sekali, dan tidak ada dua soal dengan keluarga + susunan sama. Nama bentuk tetap boleh muncul lagi di bab lain, paling banyak sekali per bab.
- **R5. Seluruh handbook:** satu keluarga paling banyak 8 soal. Hasil rencana ini: PERKAKAS 8, LAUT 7, WARISAN 6, SATWA 6, keluarga TO·H 1–4 soal.
- **R6. Kunci per bab seimbang A–E**, dan huruf yang sama paling banyak 2 kali berturut-turut (pedoman soal proyek).
- **R7. Daftar nama handbook disimpan permanen** (`daftar-bentuk-handbook.json`). Pemeriksa lintas paket TO (`cekPeta`/`cekLintas`) menolak setiap nama atau keluarga khusus handbook, tidak hanya dalam jendela 3 paket.

**Dampak pada target 50 paket TO (±450 soal figural).**
- TO tidak kehilangan satu pun keluarga yang sudah dipakai, karena benda belum pernah masuk TO siluet.
- Keluarga berparameter (14 tanpa padi) tetap tanpa batas nama untuk benih < 900.
- Nama tetap gaya lama, sulur, tinta, dan molekul tetap bisa berulang setiap 3 paket, sesuai aturan `cekLintas` sekarang.
- Risiko tersisa: rupa keluarga yang sama dengan benih berbeda mungkin terasa mirip. R3 mengurangi risiko itu, karena jenis soalnya juga berbeda.

---

## 3. Daftar perubahan generator

| No | Butir | Izin | Isi | Mengapa keluaran TO tetap |
|---|---|---|---|---|
| G1 | Mode `handbook` + `src/tiu-handbook.ts` | P10(c) | Daftar spesifikasi per bab (seperti `tiu-paket.ts`). CLI `tiu-generate.ts <out> handbook` → `bab-14…18/` (items.json, img, preview, banding) + `daftar-bentuk-handbook.json`. Pemeriksa R2–R7. Untuk keperluan R4, ciri gabung dihitung per kombinasi pola, dan WARISAN dipetakan tersendiri. Data `TEMA` bersama tidak diubah | Cabang mode baru. `PAKET`, `PETA`, dan array contoh tidak disentuh. Tambahan R7 di `cekLintas` hanya berupa assert |
| G2 | Palet handbook | P10(d) | `layout`/`cellS` menerima warna sorot + warna catatan secara opsional. Mode handbook mengisi navy/emas palet sampul TIU (nilai hex ditetapkan di T3) | Nilai bawaan tetap `HL`/`RED` |
| G3 | Teks pembahasan terstruktur dan bervariasi | P10(e) | Mode handbook mengeluarkan field tanya, cara, gugur, alasan, analogi, dan kekeliruan, siap dirangkai ke 7 langkah di T6. Analogi dan kekeliruan diambil dari bank ≥ 3 kalimat per jenis, tidak berulang dalam satu bab. Label "Kekeliruan yang Mungkin Terjadi" dipakai, dan kata "jebakan" ditambahkan ke daftar terlarang | `teks()` milik TO tidak diubah |
| G4 | FIG-BEDA-PUTAR 1–2 objek | P10(b) | Fungsi baru untuk 1 objek (opsi = 4 putaran + 1 cermin). Untuk 2 objek, fungsi siluet lama dicoba dengan `PETAK[2]`; menurut kode, assert "bukan terbesar" lolos | Assert lama tidak dilonggarkan, karena jalur 1 objek terpisah |
| G5 | FIG-ANA-OBJ 1 objek | P10(b) | `PETAK[1]` sudah ada. Yang diuji: apakah `pilih` mendapat cukup calon pengecoh untuk satu objek | Spesifikasi baru saja |
| G6 | Perubahan ukuran | P10(f) | Op "+besar"/"+kecil" di ANA-OBJ yang hanya aktif bila spesifikasi `ukuran: true`. Usulan: beda skala ≥ 35%, objek tetap di dalam sel (`cekPisah`). Juga dipakai di I14-8 | Bila tidak aktif, `OP_ALL` dan calon pengecoh TO sama persis |
| G7 | Skrip ilustrasi `src/tiu-ilustrasi.ts` | P10(a); I14-9, I15-1, I18-1, dan I18-2 menunggu E-3 | Keluaran SVG saja (I14-1…9, I15-1, I18-1–2). Putaran 45° memakai `tf` berderajat bebas. Bentuk simetris dibuat di skrip dan tidak didaftarkan ke `BENTUK` | Berkas baru, tidak masuk `JENIS` atau `BENTUK` |
| G8 | Latihan Bab 14: opsi teks + perintah tertulis | E-3 | Dua bentuk latihan: "sebutkan perubahannya" (pasangan gambar + 5 nama `T_NAME`) dan "kenakan dua langkah" (5 opsi gambar; pengecoh dari daftar kandidat seperti `pengecohT`) | Jenis khusus handbook, tidak masuk `JENIS` |
| G9 | Varian tingkat 2 gaya siluet | E-1 | SERI-P3 siluet tanpa bintik (rupa hitam, flag baru). Jalur tanpa bintik yang sekarang masih memakai rupa arsir/garis gaya lama. SERI-KUADRAN siluet satu kelompok | Flag baru, bawaan mati |
| G10 | "?" di tengah seri siluet | E-1 | SERI-KUADRAN siluet dengan "?" di gambar 4 dan gambar 5 tampak (versi lama non-siluet sudah punya logikanya) | Bawaan "?" tetap di gambar 5 |

**Urutan kerja.**
1. **U0, acuan.** Sebelum perubahan pertama, bangkitkan 3 paket ke folder sementara. Bandingkan hasilnya dengan `.test-out-paket/` yang sudah dicek mata 2026-10-29: harus identik. Bila tidak identik, berhenti dan lapor, karena itu berarti kode sudah bergeser sejak paket disetujui. Simpan sidik sha256 semua berkas, juga keluaran `npm run test:tiu`.
2. G1. Alat dan pemeriksa dibuat dulu, supaya setiap butir berikutnya langsung tertangkap pemeriksa.
3. G2, lalu G3 (tampilan dan teks).
4. G4, G5. Setelah Putusan E-1: G9, G10.
5. G6.
6. G7. Setelah Putusan E-3: G8 dan gambar catatan.
7. Spesifikasi isi (nama, benih, kunci) baru diisi di T5, setelah perintah Gusti (Putusan 10: izin = menyiapkan alat).

**Uji setiap butir.**
- **U1.** Bangkitkan ulang. `diff -r` terhadap acuan harus kosong untuk `paket-1…3/` (items.json, img/*.svg, preview.html, banding.html), `daftar-bentuk.json`, dan keluaran contoh. `npm test` (modul PSI) lulus. `cekBentuk` dan `cekPeta` lulus.
- **U2.** Spesifikasi handbook tidak disisipkan ke array contoh, karena Paket 1 memakai `sil()` dan `[0]`. Urutan dan benih tidak diubah (`AGENTS.md`). Flag baru bawaan mati. Assert lama tidak dilonggarkan.
- **U3.** Setiap keluaran baru dicek mata (render PNG) dengan pedoman impeccable + emil-design-eng. Setiap revisi dan putusan desain dicatat saat itu juga di `riset/2026-10-28-log-engine-figural-tiu.md` + memory (`feedback-figural-kedinasan`).

---

## 4. Taksiran halaman per bab (usulan)

Dasar hitung:
- Pembahasan satu soal ≈ 1 hlm (Handbook TWK final: "tiap pembahasan ≈ 1 hlm"). Latihan opsi teks Bab 14 ≈ 0,75 hlm.
- Contoh Soal dan Pembahasan figural ≈ 1,75–2 hlm, yaitu gambar soal, alasan gugur di bawah tiap pilihan, dan gambar pembahasan.
- Satu soal latihan ≈ 0,4 hlm (seri, analogi, gambar berbeda) atau 0,5 hlm (matriks).
- Teks bab (konsep inti, langkah, catatan) 4–5 hlm, ditambah ringkasan 1 hlm.
- Edisi pengajar: kotak pengajar + kode kesalahan + asal spesifikasi generator ≈ +10%.

| Bab | Isi bab (siswa) | Pembahasan latihan di Lampiran (siswa) | Total siswa | Total pengajar |
|---|---|---|---|---|
| 14 | 15 (termasuk 3 hlm gambar penjelas) | 4,5 | ±20 | ±22 |
| 15 | 14 | 6 | ±20 | ±22 |
| 16 | 12 | 7 | ±19 | ±21 |
| 17 | 13 | 6 | ±19 | ±21 |
| 18 | 16,5 (termasuk 1 hlm catatan) | 7 | ±23 | ±26 |
| **Jumlah** | ±71 | ±30 | **±101** | **±112** |

Rentang wajar ±15% karena belum ada tata letak T3. Angka ini memengaruhi putusan satu atau dua jilid (log bagian F): lima bab figural saja sudah ±100 hlm siswa.

---

## 5. Putusan yang perlu diminta ke Gusti

**E-1 (wajib). Soal tingkat 2 (satu aturan) di handbook.**
- Putusan 2026-10-28 "semua figural sedang–sulit" dibuat untuk paket TO.
- **Rekomendasi: boleh, terbatas.** Ada 17 dari 50 soal tingkat 1–2 (34%), yaitu:
  - pembuka Bab 14 dan Bab 18 (2 soal);
  - Contoh pertama Bab 14–17 (4 soal);
  - dua latihan pertama Bab 15 dan 16, satu latihan pertama Bab 17 dan 18 (6 soal);
  - lima latihan dasar Bab 14: 2 tingkat 1 + 3 tingkat 2 (5 soal).
- Setiap bab 15–18 tetap ditutup ≥ 4 latihan tingkat 3 setara TO. Putusan 2026-10-28 tetap berlaku penuh untuk TO.
- Putusan ini sekaligus mengizinkan G9 dan G10. Keduanya varian siluet di luar daftar Putusan 10 (SERI-P3 tanpa bintik, SERI-KUADRAN satu kelompok, "?" di tengah seri).
- Alasan: soal tingkat 3 menggabungkan 2–3 aturan. Siswa yang belum menguasai satu aturan tidak bisa tahu aturan mana yang gagal ia baca.

**E-2. Aturan keluarga bentuk handbook (R1–R7, bagian 2).**
- **Rekomendasi: setuju.** Benda (laut, perkakas, warisan, satwa) dan padi menjadi keluarga khusus handbook, dan TO 4–50 tidak memakainya. Keluarga TO dipakai di handbook hanya dengan benih ≥ 900 dan pasangan jenis × keluarga baru. ILUS hanya untuk gambar penjelas.
- Syarat: benda belum pernah tampil dalam gaya siluet TO. Sebelum T5, Gusti perlu melihat satu lembar banding benda bergaya siluet. Bila ada yang ditolak, slotnya diganti keluarga TO·H.

**E-3. Bentuk latihan Bab 14 dan gambar catatan.**
- (a) Latihan Bab 14 memakai dua bentuk di luar format hari H: "sebutkan perubahannya" (opsi teks) dan "kenakan dua langkah" (perintah tertulis, opsi gambar). Alasannya, soal hari H tidak menanyakan putar atau cermin satu gambar secara langsung.
- (b) Skrip ilustrasi (izin Putusan 10a hanya untuk Bab 14) juga membuat gambar catatan putaran 45° (Bab 14), periode deret (Bab 15), serta persegi latin dan gabungan warna (Bab 18). Jam di cermin cukup teks + tabel.
- **Rekomendasi: setuju keduanya.**

---

## 6. Risiko dan celah

1. **Label "Jebakan:" di pembahasan generator.** Fungsi `teks()` di `tiu-fig-beda-seri.ts` masih mencetak label itu untuk semua soal, termasuk 27 soal TO. Ini bertentangan dengan Putusan 3 dan 3b-1. G3 hanya memperbaiki keluaran handbook. Mengganti label di TO akan mengubah keluaran TO, sehingga perlu izin terpisah (di luar syarat Putusan 10).
2. **Rencana belum diuji mesin.** Kombinasi keluarga di tabel bisa gagal assert generator (kiral, beda putar/cermin ≥ 0,3, objek lacak mudah dibedakan, tebal ≥ 0,2 untuk balik warna, cukup calon pengecoh). Cadangan setiap slot: keluarga TO·H lain yang memenuhi R3.
3. **Bentuk benda.** Satwa dan tekstur berstatus rinci (hanya objek besar). Butir kecil WARISAN di BEDA-HITUNG berukuran 24 satuan dan perlu cek mata. Padi tipis dan pernah ditolak untuk objek lacak.
4. **Pembahasan generator hanya 6 bagian** (tanpa pratinjau, kalimat penentu, dan cek balik). Tujuh langkah ditulis di T6 dengan field G3 sebagai bahan. Alasan gugur per opsi tetap diambil dari generator, karena alasan itu dihitung, bukan dikarang.
5. **Taksiran waktu dan halaman belum memakai data siswa.** Kalibrasi baru bisa dilakukan setelah tryout D'Ajiks (Putusan 5).
6. **Belum diverifikasi:** kemunculan putaran 45°, persegi latin, dan gabungan warna di SKD 2026; bunyi perintah soal gambar berbeda di CAT asli; sifat "hubungan arah dua elemen" (Pejuang Bab 13), yang tidak dimuat karena tidak ada di generator.
7. **Tingkat tidak bisa dibaca dari label `tier`.** Pemeriksa G1 perlu menghitung tingkat dari isian spesifikasi (bintik, banyak objek, perubahan per objek, tukar, titik pojok), bukan dari label.
