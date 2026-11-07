# Tahap 6 · Soal Figural Bab 14–18 (Buku Siswa)

Handbook TIU D'Ajiks Akademi · 2026-11-03 · subagen figural · dasar: T6-5 (2 contoh per bab, pembuka dan latihan ditiadakan), T6-8 (keluarga TO, benih ≥ 900, tanpa keluarga benda), T2-6, T5-19.
Status: 10 soal + kunci + bukti terpasang di bab; pembahasan BELUM ditulis (menunggu cek buta 1 putaran). Belum di-commit.

## 1. Daftar 10 soal

| ID | Jenis | Tingkat* | Keluarga | Nama bentuk / benih | Kunci | Kode pilihan salah |
|---|---|---|---|---|---|---|
| B14-C01 | FIG-ANA-OBJ 1 objek, cermin garis / | 2 | kerang | kerang5-901, kerang4-903 | D | A JF-SUMBU · B JF-PUTCER · C JF-SUMBU · E JF-SALIN |
| B14-C02 | FIG-ANA-OBJ 2 objek, cermin kiri-kanan + balik warna, objek lain tetap, tukar | 3 | teratai + batu | teratai3-901, batu4-902, teratai4-905, batu3-906 | A | B JF-WARNA · C JF-WARNA+JF-TUKAR · D JF-WARNA · E JF-OBJEK |
| B15-C01 | FIG-SERI-P3 tanpa bintik, cermin atas-bawah | 2 | sabit + rantai + batu | sabit5-902, rantai5-901, batu4-903 | E | A JF-PUTCER · B JF-SUMBU · C JF-SALIN · D JF-PUTCER |
| B15-C02 | FIG-SERI-P3 + bintik (mulai 3), cermin garis \ | 3 | kerang + batu + teratai | kerang5-911, batu3-912, teratai4-913 | E | A JF-PUTCER+J-LANGKAH · B JF-PUTCER+JF-OBJEK · C JF-PUTCER · D JF-OBJEK |
| B16-C01 | FIG-ANA-OBJ 2 objek, cermin atas-bawah keduanya | 2 | kerang + sabit | kerang3-922, sabit4-904, kerang3-924, sabit5-905 | B | A JF-SALIN · C JF-PUTCER+JF-SUMBU · D JF-SUMBU · E JF-SATU |
| B16-C02 | FIG-ANA-UBAH: manik −1, batu +2, tukar, bawah putar 180°, "?" di (2) | 3 | rantai + batu (hitung), sabit (bawah) | sabit4-903, sabit6-904 · benih hitung 931, 932, 934, 935 | D | A JF-ARAH+J-LANGKAH · B J-LANGKAH+JF-TUKAR · C J-LANGKAH · E JF-HITUNG+J-LANGKAH |
| B17-C01 | FIG-BEDA-PUTAR siluet 2 objek | 2 (generator: 3) | kerang + teratai | kerang5-941, teratai4-942 · benih 943 | C | semua J-PENGALIH (anggota kelompok) |
| B17-C02 | FIG-BEDA-HITUNG (rantai = batu di empat gambar) | 3 | kerang + rantai + batu | kerang4-951, rantai3-952, batu2-953 · benih 951 | A | semua J-PENGALIH (anggota kelompok) |
| B18-C01 | FIG-MTX-PUTAR arah baris, cermin atas-bawah lalu putar 90° berlawanan, titik pojok | 3 | kerang | kerang5-961, kerang4-962, kerang3-963 | C | A JF-SATU · B J-LANGKAH · D JF-AWAL · E JF-ARAH |
| B18-C02 | FIG-MTX-HITUNG rusuk kerang + objek kecil | 3 | kerang (pusat) + teratai (kecil) | teratai3-971, teratai4-972, teratai5-973 · benih 971 | B | A, C, D, E JF-HITUNG |

\* Tingkat menurut patokan T2-E (1 aturan = 2). Target waktu sama dengan slot lama (45/60, 40/55, 45/70, 45/55, 60/45 detik).

**Sebaran kunci:** D A E E B D C A C B → A2 B2 C2 D2 E2, paling banyak 2 berturut (E E). Rencana slot lama D A A E B D C A C B diubah satu: B15-C01 A → E.

**Keluarga seluruh buku:** kerang 7, batu 5, teratai 4, sabit 3, rantai 3 (batas 8). Semua keluarga berparameter TO, semua benih ≥ 900, tanpa keluarga benda/ILUS.

## 2. Alat dan pemeriksa

- `k12-spatial-engine/src/tiu-handbook.ts` (berkas baru; PAKET, PETA, JENIS, dan pembuat soal TO tidak diubah). `npx tsx src/tiu-handbook.ts "<HB>/aset/figural"` → `items.json` + `img/*.svg` (gaya siluet). Soal yang gagal satu assert tidak ditulis.
  - **Kunci tunggal:** assert pembuat soal generator (tafsir transformasi/hitung tunggal, kiral, kunci ≠ gambar terlihat). ANA-OBJ 1 objek (`pilih()` generator butuh ≥ 2 atribut) dirakit di `ana1`: bentuk kiral, gerak (1)→(2) tunggal di antara 8 gerak, 5 pilihan beda geometris.
  - **T2-6:** benih ≥ 900 untuk setiap nama dan `seed`; keluarga harus keluarga TO; pasangan jenis × keluarga tidak ada di PETA Paket 1–3 (contoh tertolak saat produksi: BEDA-HITUNG × teratai); kerangka spesifikasi (tanpa nama, benih, kunci) ≠ soal TO sejenis; satu keluarga ≤ 8 soal; `cekPaket` per bab. SERI-P3 juga wajib `cekBedaObjek` (≥ 0,3) supaya tiga objek yang dilacak mudah dibedakan.
- `HB/scripts/soal_figural.mjs` (pola soal_kck.mjs): cek data (10 ID = slot, kunci 2 per huruf ≤ 2 berturut, kode lengkap, gambar ada), render soal ke `src/24–28` (blok `<!--Bxx-Cyy:mulai/selesai-->`; catatan pengajar slot disalin apa adanya), tulis `scripts/data/figural_b14_18_buta.json`. Masuk daftar cek `build.py`.

## 3. Cek bocor bentuk (T5-19, versi gambar)

Dipasang di `bocor()` sebelum produksi; soal bocor tidak ditulis. Alasan per butir: siswa yang tidak paham aturan menebak lewat ciri luar gambar.
1. **Paling lain sekilas:** rata-rata beda piksel kunci ke 4 pilihan lain ≤ 1,15 × pilihan terjauh berikutnya (`cekSekilas` generator).
2. **Paling rata-rata:** rata-rata beda kunci ≥ 0,98 × pilihan lain yang paling rendah (strategi "pilih yang paling mirip semuanya").
3. **Tinta:** kunci bukan pilihan paling banyak/sedikit tinta hitam sendirian dengan selisih > 8%.
4. **Jenis/jumlah bagian:** kunci bukan pencilan tunggal (4 lawan 1) jumlah bagian gambar.
5. **Rasio lebar-tinggi:** kunci bukan pencilan tunggal.
6. **Salinan:** kunci tidak sama dengan gambar yang terlihat (assert generator per jenis).

Hasil: 10/10 lulus. Saat produksi tertangkap dan diganti: B15-C02 (bintik 2 → 3) dan B16-C01 (putar 90° → cermin atas-bawah), keduanya kunci paling rata-rata. Uji yang sama atas 27 soal TO: **5 tertangkap** (P1 no. 64, P2 no. 57, P2 no. 62, P3 no. 57 paling rata-rata; P3 no. 65 tinta terbanyak).

Cek mata (render PNG): semua gambar tampil, siluet hitam + guratan putih kerang, objek lacak gemuk (tebal ≥ 0,2 kecuali objek hitung). Diganti sesudah cek mata: B15-C01 (tiga sabit kembar sekilas → sabit, rantai, batu), B16-C02 (luk keris tipis → manik rantai + batu), B18-C02 (keris + awan kecil seperti noda → rusuk kerang + teratai kecil).

## 4. Berkas yang diubah

| Berkas | Perubahan |
|---|---|
| `k12-spatial-engine/src/tiu-handbook.ts` | baru (spesifikasi 10 soal + pemeriksa) |
| `HB/aset/figural/` | baru: items.json + 68 SVG |
| `HB/scripts/soal_figural.mjs`, `scripts/data/figural_b14_18_buta.json` | baru |
| `HB/src/24–28_bab14–18.html` | slot P01, C03 (Bab 15, 17, 18), seluruh bagian Latihan beserta {{WAKTU_LATIHAN}} dihapus; kalimat "Kerjakan pertanyaan pembuka…" dihapus dari 5 pengantar bab; pengantar Contoh Bab 15/17/18 "Tiga contoh" → "Dua contoh"; C01/C02 terisi soal |
| `HB/src/00_head.html` | CSS gambar soal + pilihan gambar; pengantar Contoh bab figural tidak lagi menahan kartu (kartu sempat terbelah) |
| `HB/src/29_bab19.html` | Latihan A no. 3, 8, 11, 13: rujukan latihan figural → B18-C01 (JF-ARAH), B16-C01 (JF-SATU), B18-C02 (JF-HITUNG), B15-C01 (JF-SALIN; no. 13 semula JF-AWAL) |
| `HB/src/90_lampiran_siswa.html` | "68 latihan" → "52 latihan"; Lampiran C no. 3, 8, 11, 13 menyesuaikan; judul tempat Lampiran A "Bab 2 dan Bab 14 sampai Bab 19" → "Bab 2 dan Bab 19" |
| `HB/src/95_lampiran_pengajar.html`, `96_lampiran_l6.html` | L4 pertemuan 8–9 latihan 0; L6 141 butir (blok GEN ditulis ulang script) |
| `HB/scripts/cek_bab14_18.mjs`, `cek_bab19.mjs`, `cek_lampiran.mjs`, `src/build.py` | slot baru (2 contoh + gambar penjelas), larangan sisa pembuka/latihan/C03, kode figural dari data generator, 165 → 141 slot, 68 → 52 latihan, soal_figural masuk build |

## 5. Verifikasi

- `python3 src/build.py`: galat 0; semua cek lulus (soal_figural 89 butir, cek_bab14_18 19 slot, cek_bab19, cek_lampiran 141 slot).
- `pdfinfo`: siswa **254 hlm** (sebelumnya 255), pengajar **273 hlm**. Figural siswa ±hlm 160–184; render PNG hlm 160–184 dicek: gambar tampil, kartu soal utuh.
- Keluaran TO: `diff -r` hasil `tiu-generate.ts … paket` vs `.test-out-paket` kosong (sebelum dan sesudah).

## 6. Butir yang perlu putusan Gusti

1. **Cek buta 1 putaran** atas `scripts/data/figural_b14_18_buta.json` (gambar lewat path di `aset/figural/img/`). Folder itu juga memuat SVG pembahasan berbingkai kunci. Rekomendasi: jalankan subagen baru dengan larangan membuka berkas selain yang tertulis di _buta.json.
2. **5 soal TO tertangkap cek bocor bentuk** (P1 no. 64, P2 no. 57, P2 no. 62, P3 no. 57, P3 no. 65). Rekomendasi: jangan ubah TO sekarang (keluaran TO dibekukan); cek ini dipasang sebagai pemeriksa wajib untuk paket TO 4 dst.
3. **Catatan pengajar slot Bab 14–18 dibiarkan apa adanya** (rencana lama: keluarga LAUT/WARISAN, kode rencana, "Asal Rancangan" menyebut latihan/pembuka). Kode sebenarnya ada di `aset/figural/items.json` dan dibaca cek_bab19. Rekomendasi: biarkan sampai buku pengajar dikerjakan lagi (T5-22).
4. **Kode pengecoh menyimpang dari rencana slot:** B14-C02 tanpa JF-UTUH (generator tidak membuat "seluruh kotak dicermin"), B15-C01 tanpa J-TIGA, BEDA-PUTAR/HITUNG semua J-PENGALIH. Rekomendasi: terima (preseden T5-21 butir 5).
5. **B17-C01 berlabel tier 3 di generator**, tingkat 2 menurut patokan T2-E (satu objek dicermin). Rekomendasi: pakai tingkat 2 di buku; tidak ada yang tampil ke siswa.
6. **Latihan A Bab 19 no. 13** berganti kode JF-AWAL → JF-SALIN (Bab 15), karena tidak ada contoh figural dengan JF-AWAL selain B18-C01 yang sudah dipakai no. 3; Bab 18 kini dirujuk 2 kali (no. 3, 11). Rekomendasi: terima.
7. **Tata letak:** halaman figural berakhir sebagian kosong (mis. hlm Ringkasan Bab 17, Contoh 2 Bab 18 sendirian), dan pilihan BEDA-HITUNG lebar 27 mm sehingga butir kecil ±6 mm. Rekomendasi: ke T7.
8. **Gambar penjelas Bab 14, 15, 18 (9 slot) masih kosong.** Mengisinya butuh gambar baru (ilustrasi G7) → wajib lewat codex CLI, diputuskan Claude utama. Rekomendasi: tetap kosong sampai Gusti memerintahkan.

## 7. Perbaikan sesudah cek buta 1 (2026-11-04, Putusan T6-9: 8 rekomendasi disetujui)

Cek buta 1 (10 PNG, subagen baru): jawaban = kunci 5/10; tebakan bentuk = kunci 4/10 (B14-C02, B15-C02, B16-C02, B18-C01).

**Diagnosis tiap jawaban ≠ kunci.** Di kelima soal kunci tetap benar menurut assert generator; kesalahannya ada pada soal (ambigu atau sulit dibaca), kecuali B17-C02.
| Soal | Diagnosis | Perbaikan |
|---|---|---|
| B16-C01 (jawab E) | Soal sulit dibaca: dua kerang3 hampir sama, cermin atas-bawah kerang3 dan sabit kecil hampir tidak terlihat | objek besar teratai5/teratai4 (dicermin = terbalik jelas), objek kecil batu3/batu4 |
| B17-C01 (condong B) | Soal sulit dibaca: teratai kecil hampir simetris, cerminnya terbaca sebagai putaran. Penjawab mengukur selisih putar antarobjek, padahal tiap objek diputar sendiri | objek yang dicermin = kerang4 (sisi khas), objek besar teratai5 |
| B17-C02 (tidak dapat ditentukan) | Penjawab keliru: hitungannya sama dengan generator (rantai = batu di B, C, D, E; A 2 ≠ 3), tetapi hubungan pasangan tidak diuji. Pilihan 3/3/3 (B, D) dan butir ±6 mm mempersulit | benih 959 (B 5/2/2, C 1/4/4, D 1/4/4, E 5/2/2, A 4/2/3; tanpa 3/3/3); pilihan BEDA-HITUNG ditata 3 + 2, lebar 44 mm |
| B18-C01 (jawab D) | Soal ambigu: baris 1 dan 2 memuat tiga arah yang sama dalam urutan lain, sehingga terbaca persegi latin yang menunjuk D. Uji 7 juga menandai kunci = irisan ciri (titik pojok kunci sama dengan 3 pengecoh) | tiga keluarga beda (batu, rantai, kerang di kolom 3), tanpa titik pojok, arah awal baru; `cekLatin` (tolak bila arah baris 1 = baris 2) dipasang dan menolak spesifikasi lama |
| B18-C02 (jawab A) | Soal sulit dibaca: rusuk kerang sulit dihitung, dan hitungan naik di baris maupun kolom sehingga "pilih yang terbanyak" menggoda | pusat teratai (kelopak +1 per kolom, sama per baris), objek kecil +3 per baris; kunci 5 kelopak/10 objek bukan yang terbanyak |

Catatan lain cek buta yang ikut diperbaiki: B16-C02 rantai berubah rupa saat jumlahnya berubah → hitung **ranting + batu** (sabit bawah tetap). B15-C01 batu dicermin atas-bawah dan diputar 180° terlalu mirip (A vs E) → objek ketiga **kerang4-902**.

**Uji 7 bocor (irisan ciri), di `irisanCiri()`.** Ciri satu pilihan = tiap objek (primitif yang bersinggungan digabung) dibaca sebagai rupa+arah+warna tanpa letak, lalu letak, lalu banyak objek dan banyak objek kecil. Soal dinyatakan bocor bila (a) skor ciri bersama kunci tertinggi sendirian, atau (b) usul koordinator berlaku: setiap ciri kunci dimiliki pilihan lain, dan setiap pengecoh punya ciri yang tidak dimiliki pilihan lain.
- Hasil: 10/10 lulus sesudah perbaikan.
- 27 soal TO: 5 tertangkap, yaitu P1 no. 61 (BEDA-HITUNG), P1 no. 63, P2 no. 63, P3 no. 63 (ketiganya MTX-PUTAR + titik pojok: titik kunci sama dengan semua pengecoh yang bentuknya salah), dan P3 no. 65 (MTX-GABUNG). Hanya dilaporkan; TO tidak diubah.
- Batas uji: uji 7 TIDAK menangkap tebakan bentuk B14-C02, B15-C02, B16-C02 (skor ciri kunci bukan tertinggi). Ketiganya dibiarkan dan diuji ulang di putaran 2.

**Kunci tetap** DAEEBDCACB (2 per huruf, ≤ 2 berturut). Kode B18-C01 kini A J-LANGKAH · B JF-AWAL · D JF-ARAH · E JF-SUMBU; kode soal lain tidak berubah. Rujukan Latihan A Bab 19 tetap sah. Pengantar contoh Bab 18 "dengan titik pojok" dihapus. Keluarga: kerang 7, batu 6, teratai 5, rantai 3, sabit 2, ranting 1.

**Verifikasi:** build galat 0, semua cek lulus. Siswa 254 hlm, pengajar 273 hlm. `diff -r` TO kosong. Cek mata hlm 160–185: kartu utuh, gambar tampil, pilihan BEDA-HITUNG terbaca. `figural_b14_18_buta.json` ditulis ulang.

## 8. Perbaikan sesudah cek buta 2 (2026-11-04)

Cek buta 2: 8/10 cocok kunci. Tiga temuan:
- B18-C01 dan B18-C02 dijawab salah.
- B14-C02 dan B16-C02 masih tertebak sebagai "pilihan tengah".
- Pasangan kembar B/E di B16-C01.

| Soal | Diagnosis | Perbaikan |
|---|---|---|
| B18-C01 | **Ambigu, terbukti.** Bacaan penjawab "baris 3 = baris 1 diputar 90° berlawanan" berselisih piksel 0,34 (batu) dan 0,48 (rantai) dari sel sebenarnya. Bagian berat (batu besar) jatuh di tempat yang sama, jadi mata membacanya cocok. Gerak sebenarnya: cermin garis / | `cekLatin` diperluas: untuk tiap pasangan deret (1→2, 1→3, 2→3), gerak lain yang di semua sel terlihat berselisih ≤ 0,5 piksel = bacaan kedua → ditolak. Pencarian otomatis: hanya kerang (sisi khas) yang lolos. Soal kini kerang5/kerang4/kerang3, arah kolom, cermin atas-bawah lalu putar 90° berlawanan, awal r90/tetap/r180 |
| B18-C02 | **Sulit dibaca.** Kelopak teratai 4 vs 5 tidak terhitung, objek kecil mirip titik | Pusat diganti **daun tunas** (daun terpisah, mudah dihitung): +1 per kolom. Objek kecil 2/3/4 per baris (+1). Kunci 5 daun/6 objek kecil, bukan yang terbanyak (pilihan lain 7/8, 5/8, 4/6, 6/7) |
| B14-C02 | **Bocor pilihan tengah:** kunci = mayoritas di setiap sumbu (arah, warna, letak) | Tanda tanya dipindah ke gambar (3) (kebalikan); uji 7 lulus |
| B16-C02 | **Bocor:** setelah pilihan bercirikan tunggal digugurkan, tersisa C/D (50%) | Objek bawah dicermin atas-bawah (bukan putar 180°); uji 7 lulus |
| B16-C01 | **Kembar B/E** (batu kecil diputar 180° vs dicermin atas-bawah hampir sama) | Objek kecil = kerang4/kerang5 (sisi engsel khas), petak 44/40, tanda tanya di gambar (3); setelah pengguguran tersisa 4 pilihan, bukan 2 |
| B15-C01 (minor) | Arah sabit di (1)/(4) sulit dibaca | Objek pertama teratai5 (cermin atas-bawah = terbalik jelas) |
| B17-C01 (minor) | Cermin kipas kecil | Tidak diubah (kerang4 sudah bersisi khas; petak tidak bisa lebih besar tanpa melanggar aturan "yang dicermin bukan yang terbesar") |

**Uji 7 diperbaiki (sumbu ciri, `sumbuSemua` + `pilihanTengah`).**
- Cara membaca: objek dikenali lintas pilihan menurut bentuknya tanpa arah dan warna (beda piksel ≤ 0,12 dengan salah satu dari 8 gerak wakil). Batu bertumpuk dihitung satu objek: primitif berjarak ≤ 4 satuan digabung.
- Sumbu per objek: arah, warna, letak. Ditambah tata letak, banyak objek, dan banyak objek kecil.
- Tambahan aturan bocor: (c1) kunci = mayoritas (≥ 2 dan tidak kalah) di setiap sumbu; (c2) kunci termasuk ≤ 2 pilihan yang semua sumbunya dimiliki pilihan lain.
- Sebelum perbaikan, uji ini menangkap B14-C02 (c1), B16-C02 (c2), dan B16-C01 (c2). Sesudah perbaikan 10/10 lulus.
- TO (hanya laporan): **9/27**, yaitu P1 no. 60, 61, 63; P2 no. 58, 60, 62, 63; P3 no. 63, 65.

**Hasil:**
- Kunci tetap DAEEBDCACB.
- Kode baru:
  - B14-C02: B J-LANGKAH+JF-TUKAR · C JF-SUMBU · D JF-SUMBU+JF-TUKAR · E JF-OBJEK+JF-TUKAR.
  - B16-C01: A JF-SUMBU+JF-WARNA · C J-LANGKAH+JF-PUTCER · D JF-SATU · E JF-PUTCER.
  - B16-C02: A J-LANGKAH · B JF-HITUNG+JF-PUTCER · C JF-HITUNG+JF-SUMBU · E JF-TUKAR+JF-PUTCER.
- Rujukan Latihan A Bab 19 tetap sah.
- Keluarga: kerang 8 (batas 8), teratai 5, batu 4, rantai 2, sabit/ranting/tunas 1.

**Verifikasi:**
- Build galat 0, semua cek lulus.
- Siswa 254 hlm, pengajar 273 hlm.
- `diff -r` TO kosong.
- Cek mata hlm 163–184: kartu utuh, daun tunas dan sisi kerang terbaca.
- `figural_b14_18_buta.json` ditulis ulang.
