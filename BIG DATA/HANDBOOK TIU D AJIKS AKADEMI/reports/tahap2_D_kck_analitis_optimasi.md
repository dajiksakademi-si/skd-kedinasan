# Tahap 2 — Bagian D: Rencana Contoh dan Latihan Bab 11, 12, 13

Disusun 2026-10-30 oleh subagen D Tahap 2. Isinya spesifikasi saja: tidak ada soal jadi, angka final, opsi jadi, atau script yang ditulis maupun dijalankan. Semua target waktu dan taksiran halaman adalah **usulan**.

## 0. Dasar dan cara membaca tabel

**Putusan yang mengikat** (log `2026-10-30-log-handbook-tiu.md`):
- Putusan 4: semua soal baru, kerangka beda dari TO Paket 1–3; 20 soal KCK yang beredar tidak dipakai.
- Putusan 5: rata-rata ±86 detik/soal; patokan blok dari laporan A Tabel 2C (KCK 90, analitis 120, optimasi 120).
- Putusan 6: logika ketat + satu kotak Catatan; soal D'Ajiks tanpa asumsi diam.
- Putusan 7: P vs Q berpeubah dari Bab 6 diselesaikan di Bab 11.
- Putusan 8: Bab 12 diberi subbagian jadwal + pencocokan atribut.
- Putusan 9a: istilah siswa "kalimat penentu". Putusan 10: script di `scripts/`.
- Putusan 11a: pembahasan 7 langkah. Putusan 11b: nama tryout rujukan hanya di L1/L6 pengajar.

**Engine v0.4.2:** Pilar 2 (KCK 5 bentuk + cadangan) · Pilar 3 (47 kode; buku siswa memakai kalimat guru) · Pilar 4 KCK dan ANA · Pilar 5 (templat opsi KCK) · Pilar 6 (tingkat 30/50/20) · aturan-tetap B-15.

**Letak pembahasan.** Contoh Soal dan Pembahasan dibahas di badan bab. Pembahasan latihan ada di Lampiran, dengan tautan dua arah.

**Arti singkatan di tabel:**
- **Makna kunci KCK:** 1 = hanya (1) cukup · 2 = hanya (2) cukup · G = harus digabung · M = masing-masing cukup · X = digabung pun tidak cukup.
- **Huruf kunci** mengikuti templat Pilar 5: A=1, B=2, C=G, D=M, E=X. Pengecualian: butir yang diacak bila putusan T2D-1 diterima.
- **Tingkat:** S = Standar, H = HOTS, H+ = HOTS+.
- **Pembuat:** semua script ada di `BIG DATA/HANDBOOK TIU D AJIKS AKADEMI/scripts/`.
  - S11 = `bab11_kck.mjs`, memeriksa semua keadaan.
  - S12 = `bab12_analitis.mjs`, memeriksa semua susunan.
  - S13 = `bab13_optimasi.mjs`, memeriksa semua kombinasi; untuk membaca data, semua keadaan.
  - Ketiganya memakai modul bersama `periksa.mjs` (§2.0).
- **Target waktu** dalam detik. "Coba" = waktu mencoba soal pembuka sebelum membaca bab. "—" = contoh, dibaca bersama pembahasannya.

### 0.1 Kerangka dan konteks yang tidak boleh diulang
| Sumber | Kerangka (satu baris, tanpa angka) |
|---|---|
| TO Paket 1 no. 46–52 | gabungan dua harga lewat kelipatan + selisih (A) · nilai vs batas muatan, berat tak seragam (E) · ya/tidak berbalik nilai, pekerja-hari tim lain + laju per orang tanpa total (A) · rasio dengan total di soal, perbandingan + selisih (D) · nilai akhir + persen → hitung balik basis (B) · habis dibagi, dua faktor (C) · himpunan dua kegiatan tanpa "semua ikut" (E) |
| TO Paket 1 no. 53–56 | garis 5 hari + atribut topik, pasti benar · lingkar 6, siapa di hadapan · panah 6, pasti benar · termurah, 3 paket, minimum saja, opsi biaya, paket terbesar paling hemat, optimum melampaui minimum |
| 20 soal beredar | rasio + total, besaran tak pernah disebut · umur · nota kelipatan · rata-rata gabungan · tiga pernyataan untung · paritas · tinggi tiga anak · keliling + rasio sisi · peluang + selisih · pendapatan ya/tidak · penumpang naik-turun (pernyataan mengulang soal) · dua keran · urutan finis · naik x% turun y% · rata-rata > 75 · sisa bagi · persen putri-putra · diagonal + keliling · donat dua ukuran kotak · x² > y² |
| Paket 41 no. 46–56 (bahan luar, dianalisis) | tabel jarak-laju-waktu + jam berangkat · gabungan, satu persamaan pas bentuk · tabel dua tim + batas waktu (3×) · hasil kali, besaran tak disebut · dua anggaran "persen lebih besar" · garis 5 + atribut, pilih susunan · lingkar 6 + "jika di kanan" · panah 5, paling akhir · 5 paket, minimum + kelebihan, opsi kombinasi |
| Lain | engine Contoh 1 (relawan: kapasitas tim lain + jumlah bertugas) · contoh Pejuang: nota kelipatan, keliling + perbandingan sisi |

Konteks yang dihindari: daftar konteks di log TO tahap 0, ditambah konteks TO Paket 1 (map-spidol, truk BPBD, konveksi, seleksi putra-putri, cabai, ekstrakurikuler, regu siaga, petugas piket, kapal, nasi kotak).

---

## 1. Tabel per bab

### Bab 11 Kecukupan Data — 1 pembuka · 7 contoh · 4 Latihan Bukti · 12 latihan bertarget = 24
| Slot | Bentuk | Kerangka umum | Kesalahan dipasang | Kunci · tingkat | Pembuat | Target | Beda dari TO / 20 beredar |
|---|---|---|---|---|---|---|---|
| P | ya/tidak + laju | dua pelaksana berlaju beda, beban tertulis · (1) waktu pelaksana pertama sendirian · (2) laju pelaksana kedua relatif terhadap yang pertama · gabungan: pasti "tidak" | J-TENTU, J-RASIO, J-ASUMSI | C/G · H | S11 | coba 120 | TO 48 dan Contoh 1 memakai pelaksana identik; dua keran beredar menanyakan nilai, bukan ya/tidak |
| C1 | aljabar | tanya bentuk gabungan dua huruf · (1) selisih kuadrat · (2) selisih · gabungan cukup lewat pemfaktoran, tanpa mencari tiap huruf | J-PERSAMAAN, J-TANDA, J-ASUMSI | C/G · H | S11 | — | TO 46 memakai kelipatan gabungan; kelipatan nota (beredar, Pejuang) tidak dipakai |
| C2 | nilai dari tabel | tabel beberapa baris, satu sel kosong, satu kolom tidak dipakai · (1) total kolom · (2) hubungan sel kosong dengan sel sebaris | J-BERHENTI, J-PENGALIH | D/M · S | S11 | — | bentuk ini tidak ada di TO; rata-rata kelas beredar memakai rata-rata gabungan |
| C3 | ya/tidak + laju | sebagian pekerjaan sudah selesai oleh kelompok sendiri · (1) laju kelompok lain pada pekerjaan **berbeda** (kalimat penentu menggugurkan (1)) · (2) persen kemajuan + waktu terpakai → sisa waktu | J-ASUMSI, J-PENGALIH; J-SEARAH dibahas di langkah 7 (tidak mengubah kunci) | B/2 · H | S11 | — | di TO 48, data tim lain sah dipakai; laju dari kemajuan kerja belum pernah dipakai |
| C4 | rasio | dua kelompok disebut tanpa angka · (1) perbandingan · (2) perbandingan yang sama dalam bentuk lain (pecahan, "… kali") · tanya nilai satu kelompok | J-RASIO, J-PERSAMAAN | E/X · S | S11 | — | TO 49 punya total (D); susu sapi beredar memakai besaran yang tak disebut. Di sini kedua pernyataan sepakat tetapi tanpa ukuran |
| C5 | persen | tanya **persentase** satu bagian · (1) perbandingan dua bagian, tanpa ukuran · (2) ukuran satu bagian saja | J-PENGALIH (ukuran dikira perlu), J-ASUMSI | A/1 · H | S11 | — | TO 50 menanyakan nilai basis; di sini yang ditanya persen, jadi perbandingan sudah cukup |
| C6 | tiga pernyataan (cadangan) | tiga besaran, total tidak diketahui · (1) jumlah ke-1 dan ke-2 · (2) jumlah ke-2 dan ke-3 · (3) total · tanya besaran ke-3: hanya pasangan (1)+(3) cukup | J-BERHENTI, J-PERSAMAAN, J-ASUMSI | B (opsi per soal) · H+ | S11, 7 himpunan pernyataan | — | soal tiga pernyataan yang beredar memakai untung-rugi |
| C7 | P vs Q berpeubah (dari Bab 6) | P dan Q memuat satu huruf dengan rentang tertulis · hubungan berubah di dalam rentang → tidak dapat ditentukan, dibuktikan dengan dua nilai | J-MUNGKIN, J-TANDA, J-BATAS | "tidak dapat ditentukan" · H | S11, semua nilai huruf | — | tidak ada di TO atau soal beredar; format opsi ikut Bab 6 |
| B1–B4 | Latihan Bukti, tanpa opsi | soal + satu pernyataan · siswa menulis dua keadaan sah dengan jawaban beda (B1 aljabar, B2 rasio, B3 ya/tidak) atau alasan umum (B4 persen, cukup) | J-MUNGKIN (satu contoh dikira bukti) | contoh jawaban + syarat jawaban sah | S11, dua keadaan otomatis | 120/butir (latihan, bukan target ujian) | bentuk baru |
| L1 | aljabar | tanya nilai satu huruf · (1) kuadrat sempurna (satu nilai) · (2) kuadrat dengan dua akar berlainan tanda | J-TANDA (dua arah), J-PERSAMAAN | A/1 · H | S11 | 90 | x² > y² beredar = ya/tidak dua huruf |
| L2 | aljabar | dua huruf · (1) satu persamaan · (2) persamaan yang ternyata turunan kalimat soal + (1), bukan kelipatan langsung | J-PERSAMAAN, J-ULANG, J-BERHENTI | E/X · H+ | S11 | 120 | nota beredar = kelipatan langsung; di sini keterikatannya tersembunyi |
| L3 | nilai dari cerita/tabel | sel kosong · (1) mengulang isi kalimat soal dengan angka · (2) satu sel = persen dari total yang belum diketahui + nilai sel lain (hitung balik) | J-ULANG, J-BASIS (varian KCK), J-PENGALIH | B/2 · H | S11 | 90 | bus beredar menaruh pengulang di (2) dengan kunci A; persen hitung balik di TO 50 berdiri sendiri |
| L4 | nilai dari cerita | dua sumber data kecil · (1) menautkan kedua sumber · (2) data periode lain (pengalih) | J-PENGALIH, J-ASUMSI | A/1 · S | S11 | 75 | pengalih Paket 41 no. 46 berupa jam berangkat |
| L5 | ya/tidak + laju | waktu ≤ batas · (1) laju sebagian pelaksana saja · (2) waktu terkecil yang mungkin pun sudah di atas batas → pasti "tidak" | J-TENTU, J-BATAS, J-ASUMSI | B/2 · H | S11 | 90 | bukti lewat nilai terkecil belum ada di TO atau soal beredar |
| L6 | ya/tidak + laju | jumlah pelaksana awal **tertulis** + ditambah k · (1) beban dalam satuan pelaksana-waktu · (2) waktu tim awal | J-BERHENTI, J-ASUMSI, J-TENTU | D/M · H | S11 | 90 | versi bersih kerangka "ditambah k" tryout bimbel; jadi ilustrasi kotak Catatan (lihat bawah) |
| L7 | rasio | (1) perbandingan awal · (2) penambahan k ke satu kelompok + perbandingan sesudahnya | J-RASIO, J-ASUMSI, J-PERSAMAAN | C/G · S | S11 | 75 | TO 49 dengan total diketahui; soal beredar tanpa perubahan |
| L8 | rasio | tiga kelompok · (1) perbandingan + satu ukuran nyata dalam satu kalimat · (2) perbandingan dua kelompok saja | J-RASIO, J-PENGALIH | A/1 · S | S11 | 75 | belum ada di TO atau soal beredar |
| L9 | persen | (1) persen + total · (2) bagian lain diketahui + "lebih banyak p% daripada" bagian itu (basis diketahui) | J-BERHENTI, J-BASIS, J-PENGALIH | D/M · H | S11 | 90 | Paket 41 no. 51 berkunci C; basis TO 50 tidak diketahui |
| L10 | persen | persen berantai · (1) persen subkelompok terhadap kelompok · (2) persen kelompok terhadap total + total | J-BASIS, J-RASIO, J-BERHENTI | C/G · H | S11 | 90 | soal pramuka beredar = ya/tidak dua kelompok |
| L11 | nilai vs batas (cadangan) | ya/tidak ≥ batas · (1) dan (2) berupa ketaksamaan aljabar · rentang gabungan tetap memotong batas | J-BATAS, J-MUNGKIN, J-TANDA | E/X · H+ | S11 | 120 | TO 47 (E) memakai berat tak seragam; di sini dua ketaksamaan |
| L12 | P vs Q berpeubah | rentang tertulis · hubungan tetap di seluruh rentang, dibuktikan dengan alasan umum | J-MUNGKIN, J-TANDA, J-BATAS | relasi tetap · S | S11 | 75 | tidak ada di TO atau soal beredar |

**Penempatan di Bab 11:**
- P di awal bab.
- C1–C5 di subbagian "lima bentuk", satu halaman per bentuk.
- C6 di subbagian "bentuk lain".
- C7 dan L12 di subbagian "Perbandingan nilai yang memuat huruf" (lanjutan Bab 6, Putusan 7).
- B1–B4 sesudah subbagian "membuktikan".
- L1–L12 di akhir bab; urutan cetaknya diacak antarbentuk.

**Kotak Catatan (Putusan 6).** Teks saja: tanpa soal bimbel, dan tanpa soal D'Ajiks yang kurang data.
- Ilustrasinya dari L6. Pembahasan L6 memakai uji coret: bila kalimat jumlah awal dihapus, keadaan sah bertambah dan kuncinya menjadi E.
- Sesudah itu dicatat bahwa sebagian pembuat soal tetap menganggap angka di pernyataan sebagai jumlah awal.
- Kebiasaan soal resmi ditulis "belum diverifikasi".

### Bab 12 Penalaran Analitis — 1 pembuka · 4 contoh · 1 Latihan Bukti · 10 latihan bertarget = 16
| Slot | Bentuk | Kerangka umum (wadah · banyak unsur · syarat · kata tanya) | Kesalahan dipasang | Kunci · tingkat | Pembuat | Target | Beda dari TO / 20 beredar |
|---|---|---|---|---|---|---|---|
| P | urutan tegak (lantai/tingkat) | 5 unsur tanpa atribut · blok + sebelum + "bukan" · sisa 2–3 susunan · pasti benar | J-MUNGKIN, J-BALIK | E · S | S12 | coba 120 | TO 53 garis + atribut hari; TO 55 panah 6 |
| C1 | urutan + atribut, pilih susunan | 6 unsur, atribut 3 nilai (masing-masing dua kali) · blok, "tidak", hubungan atribut-posisi, sebelum · tiap syarat menggugurkan ≥ 1 opsi; pengecoh gugur di syarat berbeda | J-SYARAT ("tidak" terlewat; "tepat setelah" dilonggarkan), J-BALIK, J-NOMOR | C · S | S12 | — | TO tidak memakai pilih susunan; Paket 41 no. 53 (5 unsur) punya syarat yang tidak berguna |
| C2 | duduk melingkar | 8 kursi, menghadap ke tengah, arah kanan didefinisikan + gambar · berhadapan, "tepat di antara", kanan-kiri · syarat "jika …" di kalimat tanya · pasti benar | J-BALIK, J-NOMOR (hadapan dihitung kurang satu kursi), J-MUNGKIN | A · H+ | S12, satu orang dikunci | — | TO 54: meja 6, tanpa "jika" |
| C3 | urutan parsial | 6–7 unsur digambar panah + satu blok "tepat setelah" · yang **tidak mungkin** benar | J-ASUMSI, J-BALIK, J-SYARAT | D · H | S12 | — | TO 55 menanyakan yang pasti; Paket 41 no. 55 menanyakan yang terakhir |
| C4 | pencocokan atribut (Putusan 8) | 4 orang × 2 atribut, tanpa urutan, tabel centang-silang · pasti benar | J-MUNGKIN, J-SYARAT, J-ASUMSI | B · H | S12, semua pasangan atribut | — | belum ada di TO atau soal beredar |
| B5 | Latihan Bukti | dari satu soal pasti/mungkin, siswa menulis satu susunan sah yang membantah sebuah pernyataan | J-MUNGKIN | contoh jawaban | S12, susunan bantahan otomatis | 150 (latihan) | bentuk baru |
| L1 | pilih susunan | garis 7 tanpa atribut · blok + "tidak" + sebelum | J-SYARAT, J-NOMOR, J-BALIK | B · S | S12 | 90 | belum ada di TO |
| L2 | pilih susunan melingkar | lingkar 6 · opsi = urutan searah jarum jam mulai dari satu orang | J-BALIK, J-SYARAT, J-NOMOR | D · H | S12 | 90 | TO 54 lingkar 6 menanyakan siapa di hadapan |
| L3 | melingkar | 5 orang di 6 kursi (satu kosong) · mungkin benar | J-BALIK, J-NOMOR, J-ASUMSI | A · H | S12 | 120 | belum ada di TO |
| L4 | melingkar | 7 kursi (ganjil, tanpa hadapan) · "tepat di antara", "berjarak satu kursi" didefinisikan · tidak mungkin | J-BALIK, J-MUNGKIN, J-NOMOR | E · H+ | S12 | 150 | belum ada di TO |
| L5 | urutan parsial | 7 unsur, panah · posisi ke-k yang dapat ditentukan | J-ASUMSI, J-BALIK | C · S | S12 | 90 | TO 55 menanyakan pernyataan pasti |
| L6 | urutan parsial + "jika" | 5 unsur · syarat "jika …" di kalimat tanya · pasti benar | J-MUNGKIN, J-ASUMSI, J-SYARAT | B · H | S12 | 120 | Paket 41 no. 55 tanpa "jika" |
| L7 | urutan + atribut | garis 5, dua atribut · mungkin benar | J-SYARAT, J-BALIK, J-NOMOR | E · S | S12 | 120 | TO 53: satu atribut, menanyakan yang pasti |
| L8 | jadwal (Putusan 8) | 6 orang ke 3 hari, 2 orang per hari · bersama/tidak bersama/hari tertentu · mungkin benar | J-SYARAT, J-ASUMSI, J-MUNGKIN | A · H | S12, semua pembagian | 150 | TO 53: satu regu per hari |
| L9 | pencocokan 3 atribut (Putusan 8) | 4 orang × 3 atribut · pasti benar | J-MUNGKIN, J-ASUMSI, J-SYARAT | D · H+ | S12 | 150 | belum ada di TO |
| L10 | analitis dalam bentuk kecukupan data | lingkar 6 · tanya siapa tepat di kanan X · (1) dan (2) syarat duduk · templat Pilar 5 | J-BERHENTI, J-ASUMSI, J-BALIK | C/G · H | S12 + templat S11 | 120 | soal beredar memakai urutan garis (pelari, tinggi) |

**Catatan penempatan Bab 12:**
- C4, L8, dan L9 membentuk subbagian pendek jadwal + pencocokan atribut (±2,5 hlm).
- Pelajaran "syarat yang dipenuhi semua opsi tidak berguna untuk memilih" ditulis sebagai kotak Catatan saja. Engine Pilar 4 ANA melarang soal D'Ajiks memuat syarat seperti itu.
- Pembahasan C1 memuat tabel syarat × opsi yang digugurkan.

### Bab 13 Optimasi Data Tabel — 1 pembuka · 3 contoh · 1 Latihan Bukti · 6 latihan bertarget = 11
| Slot | Bentuk | Kerangka umum | Kesalahan dipasang | Kunci · tingkat | Pembuat | Target | Beda dari TO / 20 beredar |
|---|---|---|---|---|---|---|---|
| P | termurah | 4 kemasan · kebutuhan minimal saja · paket terbesar **bukan** yang paling hemat per satuan · optimum tepat di batas bawah · opsi = kombinasi | J-HEMAT, J-BATAS (kurang), J-LANGKAH | D · S | S13 | coba 150 | TO 56: 3 paket, terbesar paling hemat, opsi biaya, optimum melampaui minimum |
| C1 | termurah | 4 paket · minimal + kelebihan maksimal + stok tiap paket terbatas · stok membuat batas bawah tak tersentuh → daftar teratur di sekitarnya · opsi = biaya | J-SYARAT (stok terlewat), J-HEMAT, J-BATAS (kelebihan), J-LANGKAH | B · H | S13 | — | syarat stok tidak ada di TO maupun Paket 41 |
| C2 | terbanyak dengan anggaran | 3 paket · anggaran tetap, sisa uang boleh · batas atas = anggaran ÷ harga satuan termurah · opsi = isi total | J-HEMAT, J-BATAS (melebihi anggaran), J-LANGKAH | E · H | S13 | — | kembaran yang belum ada di TO maupun Paket 41 |
| C3 | membaca data tabel | dua periode × beberapa kategori · pasti benar · satu opsi pasti benar, sisanya pasti salah atau tidak dapat ditentukan | J-BASIS (jumlah vs persen), J-AKAL, J-TENTU, J-PENGALIH | A · S | S13, semua keadaan | — | tidak ada di TO; soal TIU002 hanya dianalisis |
| B6 | Latihan Bukti | dari satu tabel paket: hitung batas bawah, lalu tunjukkan satu kombinasi sah yang lebih murah dari kombinasi yang diberikan | J-HEMAT | contoh jawaban | S13 | 150 (latihan) | bentuk baru |
| L1 | termurah | 5 paket · minimal + kelebihan maksimal · satu opsi kurang, satu opsi melebihi · opsi = biaya | J-BATAS (dua arah), J-HEMAT, J-LANGKAH | C · S | S13 | 90 | opsi Paket 41 berupa kombinasi; TO 56 tanpa kelebihan maksimal |
| L2 | termurah, dua barang | 3 paket campuran (tiap paket berisi dua jenis barang) · kebutuhan minimal tiap jenis | J-SYARAT (satu jenis terlewat), J-HEMAT, J-BATAS | E · H+ | S13 | 150 | belum ada di TO |
| L3 | terbanyak dengan anggaran | 4 paket · minimal satu dari tiap jenis · opsi = kombinasi | J-SYARAT, J-HEMAT, J-BATAS | A · H | S13 | 120 | belum ada di TO |
| L4 | termurah + ongkos tetap | 3–4 paket · ongkos kirim per pesanan atau per jenis mengubah harga satuan efektif | J-LANGKAH (ongkos terlupa), J-HEMAT, J-BATAS | D · H | S13 | 120 | belum ada di TO |
| L5 | membaca data | satu periode, beberapa kategori · pernyataan yang **tidak dapat dipastikan** dari tabel | J-TENTU, J-AKAL, J-BASIS | B · S | S13 | 75 | belum ada di TO |
| L6 | membaca data | komposisi persen + satu jumlah total · pasti benar | J-BASIS, J-PENGALIH, J-AKAL | C · H | S13 | 90 | belum ada di TO |

**Catatan penempatan Bab 13:**
- Pelajaran "optimum sebenarnya bisa tidak ada di opsi" ditulis sebagai kotak Catatan, tanpa soal cacat.
- Di edisi siswa, kalimatnya: "pernah ditemukan di soal latihan sebuah tryout". Nama Paket 41 hanya muncul di L1/L6 pengajar.
- Sikap yang diajarkan: pilih opsi termurah yang sah, jangan memburu jawaban yang hilang.

---

## 2. Rancangan pemeriksa otomatis

### 2.0 Modul bersama `scripts/periksa.mjs`
- **Asal kode.** Helper diangkat dan diperluas dari `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/tmp/paket1/build_logika.mjs`: `kck()`, `analitis()`, `perm()`, dan blok optimasi no. 56. Tambahan acuan: baris 294–320 `GENERATE SOAL TERBARU SKD 2026/scripts/build-kecukupan-data-paket2.js` (teks pembahasan sejalan hasil; lima makna opsi lengkap). Kode disalin ke `scripts/`, tidak di-*import* dari `tmp/`, karena `tmp/` bisa dibersihkan.
- **Daftar kode Pilar 3** dibaca langsung dari tabel engine, termasuk kalimat guru. Satu sumber: kode di luar 47 → gagal. Kalimat guru masuk pembahasan siswa; kode hanya masuk edisi pengajar.
- **`cekLintas()`** menjaga agar kerangka tidak terulang:
  - Sumber pembanding:
    - `reviu.kerangka` di `CORE ENGINE…/paket/paket-1/paket_tiu_1.json` (sudah ada);
    - `scripts/kerangka_terlarang.json`, ditulis sekali, berisi 20 soal beredar, Paket 41 no. 46–56, engine Contoh 1, dan 2 contoh Pejuang.
  - Tiap kerangka dicatat sebagai tupel bertag:
    - KCK = (bentuk, mekanisme (1), mekanisme (2), makna);
    - ANA = (wadah, banyak unsur, atribut, kata tanya);
    - OPT = (sasaran, syarat, banyak paket, jenis opsi, menyentuh batas).
  - Larangan: tupel kembar persis. Konteks juga dicocokkan dengan daftar konteks terpakai (§0.1).
- **Arah sebaliknya.** Script menulis `kerangka_handbook.json` supaya TO Paket 2–3 dapat diperiksa terhadap handbook.
- **`cekBab()`** memeriksa tiap bab:
  - selisih jumlah antarhuruf kunci ≤ 1;
  - huruf sama tidak 3× berturut dalam urutan cetak latihan;
  - tingkat 30/50/20 ±1;
  - 4/4 opsi salah berkode;
  - konteks tidak berulang di Bab 11–13.
- **Keluaran:** JSON per bab, satu sumber untuk HTML siswa, HTML pengajar, dan lampiran. Path final ikut T3.
- **Pembahasan (T6):** pemeriksa memakai ulang `tmp/paket1/cek_pembahasan.mjs` (frasa terlarang, kata "jebakan", kode, "maka/karena itu" ≤ 1, opsi gugur lengkap).

### 2.1 KCK — semua keadaan yang sah dan makna opsi (S11)
1. `dunia()` memuat semua keadaan yang dibolehkan kalimat soal saja: jenis bilangan, rentang, dan syarat cerita yang tertulis. Tidak boleh ada syarat yang tidak tertulis.
2. `jawab(w)` mengembalikan nilai atau ya/tidak.
3. Kalimat soal saja harus memberi ≥ 2 jawaban.
4. Tiap pernyataan dan gabungannya tidak kosong, artinya tidak saling bertentangan.
5. Status (1), (2), dan gabungan menentukan makna 1/2/G/M/X. Makna itu harus sama dengan makna target slot. Huruf kunci diambil dari templat Pilar 5, atau dari urutan acak tercatat bila T2D-1 diterima.
6. **Uji rentang.** Domain `dunia()` diperlebar: batas atas ×2, ditambah nol, negatif, atau pecahan bila kalimat soal tidak melarangnya. Makna kunci harus tetap. Kalau berubah, berarti rentang buatan yang menentukan kunci; batas itu lalu wajib ditulis di soal.
7. **Uji coret (G3).** Pernyataan yang benar di seluruh `dunia()` hanya mengulang kalimat soal. Hal ini hanya boleh terjadi di slot bertanda `ulang` (L3).
8. **Daftar kebutuhan.** Tiap butir wajib punya kutipan yang ditemukan persis di teks soal atau pernyataan. Ini menahan asumsi diam. Soal "ditambah k" wajib menandai `awal_tertulis`.
9. **Dua keadaan otomatis.**
   - Setiap status "tidak cukup" menghasilkan sepasang keadaan sah dengan jawaban beda, dipilih yang angkanya paling sederhana. Pasangan ini bahan pembahasan dan kunci B1–B3.
   - Setiap status "cukup" wajib punya field `alasan_umum`, bukan contoh.
10. Status tiap pernyataan di teks pembahasan harus sama dengan hasil script (pola paket2).
11. **Tiga pernyataan (`kck3`).**
    - Ketujuh himpunan pernyataan dinilai.
    - Tiap opsi ditulis sebagai predikat atas peta "himpunan → cukup".
    - Semua peta yang monoton dicoba: bila sebuah himpunan cukup, setiap himpunan yang lebih besar juga cukup. Di setiap peta, paling banyak satu opsi boleh benar, dan di peta soal tepat satu.
12. **P vs Q (`pvq`).**
    - Himpunan relasi {>, <, =} dihitung di seluruh rentang. Satu relasi berarti kunci; lebih dari satu berarti "tidak dapat ditentukan", disertai dua nilai bantahan.
    - Titik ujung rentang dibalik (inklusif ↔ eksklusif). Kunci harus tetap; kalau tidak, hasil lain itu dijadikan opsi J-BATAS.

### 2.2 Analitis — semua susunan dan satu kunci (S12)
1. **Susunan yang dicoba:** garis = semua permutasi; lingkar = satu orang dikunci di kursi 0 sehingga putaran kembar terbuang; atribut = hasil kali permutasi; jadwal = semua pembagian kelompok; pencocokan = semua pemetaan. Batas ukuran: garis ≤ 7 dan lingkar ≤ 8 (≤ 5.040 susunan), dua atribut 6 × 6 (518.400); semua cukup cepat di Node.
2. **Jenis kata tanya:**
   - pasti = benar di semua susunan sah;
   - mungkin = benar di ≥ 1;
   - tidak mungkin = benar di 0;
   - pilih susunan = tepat satu opsi sah;
   - dapat ditentukan = nilainya sama di semua susunan sah;
   - "jika …" = hanya untuk soal itu; dicek bahwa syarat itu benar-benar mempersempit susunan sah.
3. Tepat satu opsi memenuhi kata tanya.
4. **Tiap syarat perlu.** Satu syarat dibuang → hasil semua opsi harus berubah. Cek ini dari `build_logika.mjs`, diperluas ke semua kata tanya.
5. **Pilih susunan.**
   - Tiap syarat menggugurkan ≥ 1 opsi (Pilar 4 ANA).
   - Tidak ada satu syarat yang menggugurkan keempat pengecoh sendirian.
   - Tabel syarat × opsi dicetak untuk pembahasan.
   - Opsi kunci tidak boleh menjadi satu-satunya opsi dengan skor frekuensi unsur per posisi tertinggi (pelajaran X-Y TO Paket 1).
6. **Bukti per opsi salah.** Disimpan susunan sah yang membantah, atau syarat yang dilanggar. Ini bahan pembahasan dan kunci B5.
7. **Pengecoh dari salah baca.** Tiap kode punya fungsi salah baca:
   - kanan ↔ kiri;
   - "tepat setelah" → "setelah";
   - syarat "tidak" dibuang;
   - sebelum ↔ sesudah;
   - posisi dihitung dari ujung lain.
   Jawaban hasil salah baca itu harus sama dengan opsi berkode tersebut (prosedur engine langkah 5).
8. **Arah kanan.** Konvensi ditulis di soal ("menghadap ke tengah") dan digambar. Script juga menghitung kunci dengan konvensi terbalik. Bila hasilnya beda, hasil itu wajib menjadi opsi J-BALIK, bukan kunci kedua.
9. **Sisa susunan.** Jumlah susunan sah sesudah tiap syarat, dihitung urut dari syarat terkuat, dicetak untuk langkah "perkirakan dulu". Bila urutan tetap → blok → sebelum → bukan tidak memangkas paling banyak di soal itu, hal itu dicatat.

### 2.3 Optimasi — semua kombinasi dan optimum tunggal di opsi (S13)
1. **Kombinasi yang dicoba:** semua kombinasi bilangan cacah per paket. Batas atas tiap paket = ⌈(kebutuhan + kelebihan maksimal) / isi⌉, atau anggaran ÷ harga.
2. **Syarat yang dipasang per soal:** minimal, kelebihan maksimal, stok, campuran dua barang, minimal satu tiap jenis, ongkos tetap.
3. Optimum global harus tunggal. Bila ada dua kombinasi sama baik, angkanya diganti.
4. Opsi kunci = optimum global (B-15). Tidak ada opsi sah yang lebih baik dari kunci.
5. **Opsi salah.** Tiap opsi salah adalah salah satu dari:
   - tidak sah, dengan syarat yang dilanggar disebut;
   - sah tetapi lebih mahal atau lebih sedikit, dengan selisih dicatat.
   Masing-masing diberi kode.
6. **Batas bawah dan batas atas** dicetak dengan pecahan eksak (Fraction):
   - batas bawah = kebutuhan × harga satuan termurah;
   - batas atas = anggaran ÷ harga satuan termurah.
   Status "menyentuh batas" harus sama dengan target slot: P menyentuh, C1 tidak.
7. **Kesalahan yang dipasang harus benar-benar menggoda:**
   - kombinasi "paket terbesar saja" dan "harga satuan termurah saja" ≠ optimum, dan muncul di opsi;
   - pada soal yang menargetkannya, "tepat sejumlah kebutuhan" ≠ optimum (pelajaran TO Paket 1).
8. **Cara "pilih opsi termurah" harus gagal** di ≥ separuh soal termurah bab ini: ada opsi yang lebih murah tetapi tidak sah.
9. **Urutan opsi:** angka urut naik (Pilar 5); opsi kombinasi diurutkan menurut banyaknya paket pertama. Kunci bukan pencilan.
10. **Membaca data.**
    - Tabel dibangkitkan script.
    - Besaran yang tidak ada di tabel dijadikan peubah bebas di `dunia()`.
    - Tiap opsi dinilai: pasti benar, pasti salah, atau tidak dapat ditentukan. Tepat satu opsi sesuai kata tanya.
    - Kata sebab ("karena") tidak boleh menjadi penanda tunggal opsi salah: minimal satu opsi berkata sebab gugur karena angkanya salah.

---

## 3. Sebaran kunci dan tingkat

| Bab | Butir berhuruf A–E | Sebaran huruf | Makna KCK | Tingkat latihan bertarget (S/H/H+) | Tingkat pembuka + contoh |
|---|---|---|---|---|---|
| 11 | 18 (P, C1–C6, L1–L11) | A4 B4 C4 D3 E3 | 1×4 · 2×3 · G×4 · M×3 · X×3 (C6 opsi per soal) | 4/6/2 (L1–L12) | P H · C1 H · C2 S · C3 H · C4 S · C5 H · C6 H+ · C7 H |
| 12 | 15 (P, C1–C4, L1–L10) | A3 B3 C3 D3 E3 | L10 = G | 3/5/2 | P S · C1 S · C2 H+ · C3 H · C4 H |
| 13 | 10 (P, C1–C3, L1–L6) | A2 B2 C2 D2 E2 | — | 2/3/1 | P S · C1 H · C2 H · C3 S |

- C7 dan L12 (P vs Q) tidak dihitung, karena format opsinya menunggu Bab 6.
- **Urutan kunci latihan:**
  - Bab 11: A E B A B D C A D C E (urutan cetak diacak ulang script, tidak 3× berturut);
  - Bab 12: B D A E C B E A D C;
  - Bab 13: C E A D B C.
- **Rata-rata target latihan:**
  - Bab 11: 90 dtk (Tabel 2C KCK: 90);
  - Bab 12: 120 dtk (Tabel 2C: 120);
  - Bab 13: 120 dtk untuk optimasi, 83 dtk untuk membaca data.
  Semua dikalibrasi dengan catatan waktu tryout siswa.
- Makna kunci per slot adalah **target rancangan**. Script membuktikannya, dan bila hasil script berbeda, soal diubah; tabel tidak disesuaikan.

## 4. Taksiran halaman (usulan)
| Bab | Siswa: isi bab | Siswa: lampiran pembahasan | Pengajar: isi bab | Pengajar: lampiran |
|---|---|---|---|---|
| 11 | ±23 | ±11 (16 butir) | ±28 | ±13 |
| 12 | ±20 | ±8 (11 butir) | ±23 | ±9 |
| 13 | ±15 | ±5 (7 butir) | ±18 | ±6 |
| Jumlah | ±58 | ±24 | ±69 | ±28 |

**Dasar taksiran (usulan):**
- **Contoh + pembahasan 7 langkah:** KCK 1,25 hlm; analitis 1,75 hlm (dengan diagram); optimasi/data 1,5 hlm.
- **Soal latihan:** KCK 0,5 hlm (opsi templat panjang); analitis 0,6 hlm; optimasi 0,5 hlm.
- **Pembahasan di lampiran:** 0,6–0,75 hlm per butir.
- **Tambahan edisi pengajar:** kotak pengajar per butir (kode per opsi, kerangka, ringkasan bukti script) ±0,15 hlm + catatan mengajar 1 hlm per bab.
- **Teks bab di luar soal:** Bab 11 ±7 hlm, Bab 12 ±7 hlm, Bab 13 ±7 hlm.

---

## 5. Putusan yang perlu diminta ke Gusti

1. **Urutan opsi kecukupan data di handbook.**
   - Situasinya: engine Pilar 5 mengunci bunyi dan urutan A–E. Di tryout bimbel, bunyi dan urutan berganti (empat set dalam satu tryout). Siswa yang menghafal "C = digabung" bisa salah pilih di hari H.
   - Pilihan:
     - (a) semua butir memakai templat engine dengan urutan tetap;
     - (b) bunyi tetap templat; urutan tetap di pembuka, contoh, dan sebagian besar latihan, tetapi tiga latihan Bab 11 (L4, L7, L11) dan L10 Bab 12 diacak urutannya, ditambah satu paragraf di subbagian "membaca lima opsi";
     - (c) bunyi juga divariasikan.
   - **Rekomendasi: (b).** Bunyi templat menjamin opsi saling meniadakan, dan mengacak urutan tidak menimbulkan dua jawaban benar. Engine diberi catatan bahwa pengacakan hanya untuk latihan handbook.
2. **Latihan Bukti tanpa opsi** (6 butir: B1–B4 di Bab 11, B5 di Bab 12, B6 di Bab 13).
   - Bentuknya di luar format ujian, tanpa target waktu ujian. Siswa dipaksa menunjukkan dua keadaan, atau satu susunan/kombinasi bantahan, alih-alih menebak.
   - Kunci berisi contoh jawaban + syarat jawaban sah, karena jawaban lain juga bisa benar.
   - Pilihan: (a) dimuat keenamnya; (b) hanya di Bab 11; (c) tidak dimuat (total turun dari 51 ke 45).
   - **Rekomendasi: (a).** Inilah latihan yang paling langsung mengajarkan konsep inti "Pemeriksaan semua kemungkinan".
3. **Membaca data di Bab 13: tabel saja atau ditambah grafik.**
   - Situasinya: bentuk ini 0 soal di Paket 41 dan 2 soal di TIU002; engine menyimpannya sebagai cadangan. Grafik batang butuh pembuat SVG baru agar angka dan gambar berasal dari satu sumber.
   - Pilihan: (a) tabel saja: 1 contoh + 2 latihan; (b) ditambah 1 latihan grafik batang + pembuat SVG.
   - **Rekomendasi: (a).** Grafik ditambahkan bila tryout berikutnya menunjukkan bentuk ini muncul.

## 6. Risiko dan celah
- **P vs Q bergantung pada Bab 6.** Format opsinya (4 atau 5 opsi, bunyi baku) belum diverifikasi. C7 dan L12 mengikuti putusan Bab 6 (laporan C); huruf kuncinya belum masuk hitungan sebaran.
- **Pekerjaan terbesar Tahap 5 ada di S12.** Pemeriksa TO Paket 1 baru mengenal "pasti benar" dan satu bentuk optimasi. Perluasan ke kata tanya lain, jadwal/pencocokan, `kck3`, `pvq`, uji rentang, dan membaca data belum ada.
- **Asumsi diam tidak tertangkap penuh oleh script.** Kutipan daftar kebutuhan hanya menahan sebagian; cek buta per bab (T5) tetap wajib.
- **TO Paket 2–3 TIU belum dibuat.** Kerangkanya wajib dicek balik ke `kerangka_handbook.json`; kalau tidak, siswa bertemu kerangka handbook di TO.
- **Bab 11–13 ±58 + 24 hlm siswa.** Ini besar bila bab lain ±9 hlm, sehingga memengaruhi putusan satu/dua jilid (ditunda sampai Bab 1–4 jadi).
- **Diagram analitis** (garis bernomor, lingkaran kursi, panah, tabel silang) dibuat sebagai HTML/CSS dari data susunan keluaran S12. Tidak perlu generator figural; gayanya mengikuti T3.
- **Klaim geometri kanan-kiri** di meja bundar (laporan T1) dicek dengan gambar saat T4.
- **Bunyi opsi KCK.** `build-kecukupan-data-paket2.js` memakai bunyi opsi sendiri yang berganti per soal. Handbook tidak mengikutinya; handbook memakai templat Pilar 5.
