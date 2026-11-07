# Tahap 1 — Bagian C: Numerik (Bab 6–10)

Handbook TIU D'Ajiks Akademi · laporan baca bahan · 2026-10-30
Status: laporan bacaan. Tidak ada soal, angka soal, atau kunci yang dibuat. Calon soal ditulis sebagai spesifikasi.

**Bahan yang dibaca**
- Pedoman: root `CLAUDE.md`; skill `skd-expert` (`SKILL.md`, `references/aturan-tetap.md`, `references/tiu.md`); `ENGINE_GENERATE_SOAL_TIU.md` v0.4 (Pilar 2, 3, 4, 6, contoh terbimbing 2).
- Log dan riset: `riset/2026-10-30-log-handbook-tiu.md`, `riset/2026-10-29-pejuang-kedinasan-tiu.md`, `riset/2026-10-25-al-faiz-tiu.md`, `riset/2026-10-25-tiu-2026-logika-celah.md` (bagian numerik), `riset/2026-10-28-log-uji-paket41.md`.
- Bahan internal: `BIG DATA/GENERATE SOAL TERBARU SKD 2026/` (`CLAUDE.md`, `memory.md`, `js/bank-soal.js`, `js/pembahasan.js`, `scripts/build-suku-pasangan.js`, `scripts/build-deret-tabel-lv56.js`). Script hanya dibaca, tidak dijalankan.
- Bentuk soal hari H: tangkapan layar Al Faiz Paket 41 no. 37–45 (`SOAL PAKET 41 AL FAIZ/TIU/`). Pembanding: TIU002 no. 21–35 (dibaca lewat teks, hanya bentuknya).
- Ebook Pejuang Numerik: daftar isi, Bab 00, dan halaman materi Bab 01–07 (PDF hlm. 1–16, 17–22, 27–29, 34–36, 39–42, 45–48). Hanya struktur dan cara menjelaskan; tidak ada kalimat atau soal yang disalin.

**Pemeriksaan kecil yang saya jalankan (di folder sementara, tidak menulis ke project):** pemeriksaan aturan lain untuk tabel (aturan dengan paling banyak dua operasi), jarak nomor suku di bank suku ke-n, nilai kedua sisi di bank pasangan. Hasilnya dipakai di bawah.

---

## Ringkasan temuan

1. **Contoh "cermin semu" di mesin soal keliru.** Engine Pilar 3 baris J-CERMIN dan `references/tiu.md` bagian Pasangan menyebut "28 × 330 dan 33 × 280" sebagai pasangan yang tampak cermin tetapi tidak sama. Kenyataannya keduanya sama (9.240). Pola a × 10b dan b × 10a **selalu** bernilai sama (keduanya 10ab). Kalau contoh ini dipakai pembuat soal sebagai pilihan salah, soal akan punya dua jawaban benar. Perlu diperbaiki di engine dan skill (bukan wewenang saya mengubahnya).
2. **Lima bab numerik bisa disatukan oleh satu cara pandang: "cari yang tetap".** Selisih tetap (deret), hasil bagi tetap (senilai), hasil kali tetap (berbalik nilai, pasangan perkalian), susunan faktor prima tetap (pasangan), laju tetap (soal cerita). Ini menjawab prinsip kedua (satu ide besar untuk banyak jenis soal) dan menjadi pembeda utama dari Pejuang, yang menyajikan rumus per kasus.
3. **Tabel dua kolom (Paket 41 no. 39) dan tabel suku ke-n (no. 38) adalah benda matematika yang sama:** kolom kiri = nomor, kolom kanan = nilai. Bab 9 bagian dua kolom sebaiknya memakai alat Bab 8, bukan alat baru.
4. **Bahan internal yang paling siap adalah bank tabel deret level 5–6 dan bank suku ke-n + pasangan**, tetapi semuanya dibuat sebelum engine v0.4: belum ada nama kesalahan per pilihan, 4 dari 15 soal suku ke-n memakai jarak nomor yang berpola, hanya 2 dari 15 soal pasangan memenuhi aturan "sisi kiri sama dengan nilai kunci di ≥ 2 pilihan", dan belum ada pasangan pembagian murni maupun campuran ÷ dengan × (bentuk hari H no. 41 dan 43). Untuk hitung cepat (Bab 6) dan soal cerita (Bab 10) **belum ada pembuat soal sama sekali**.
5. **Kejujuran soal "dua baris lengkap":** contoh tabel pertama di Bab 06 Pejuang cocok dengan 6 aturan berbeda yang memberi 6 nilai jawaban berbeda (aturan dua operasi). Soal hari H no. 40 juga hanya punya dua baris lengkap, tetapi di sana hanya satu aturan sederhana yang cocok. Siswa perlu diajari bahwa dua baris belum tentu bukti, dan pilihan jawaban ikut menjadi saksi.
6. Beberapa kesalahan khas numerik **belum punya kode** di Kamus Jebakan (salah orde/letak koma, pembulatan searah, urutan operasi, lupa kata TIDAK, satuan tidak disamakan, menjumlah waktu padahal yang dijumlah laju). Usulan kode di bagian akhir; perubahan Kamus perlu putusan Gusti.

---

## Bentuk soal numerik hari H dan kecocokan dengan ide besar

Acuan: Paket 41 Al Faiz no. 37–45 (rancangan paket D'Ajiks = komposisi paket ini, putusan Gusti 2026-10-28). Pembanding: Al Faiz Part 39 (riset 2026-10-25) dan TIU002.

| No. Paket 41 | Bentuk (diringkas, tanpa menyalin) | Bab | Ide besar yang dipakai | Cocok? |
|---|---|---|---|---|
| 37 | Perkiraan hasil (3 angka × 2 angka) ÷ 2 angka; pilihan kelipatan ratusan, jarak antarpilihan ±17% | 6 | ukuran bilangan, pembulatan berlawanan arah | Cocok. Perkiraan dua angka penting sudah cukup. |
| 38 | Tabel suku ke-n linear, 7 titik, nomor suku bilangan segitiga | 8 | kenaikan per suku tetap | Cocok. Catatan: jarak nomor di soal ini berpola; aturan produksi kita lebih ketat (jarak acak). |
| 39 | Tabel dua kolom, 4 baris, kolom kanan = fungsi kuadrat kolom kiri | 9 (alat Bab 8) | selisih bertingkat / sidik faktor (kanan ÷ kiri) | Cocok. Empat titik = tepat cukup untuk membuktikan pola kuadrat. |
| 40 | Tabel 3×3, kolom 3 = fungsi dua kolom pertama, dua baris lengkap | 9 | uji aturan di semua baris + ukuran hasil | Cocok. Diperiksa: aturan ≤ 2 operasi hanya memberi satu nilai. |
| 41 | Pasangan pembagian (4 angka ÷ 2 angka) | 7 | a ÷ b = c ÷ d ⇔ a × d = b × c | Cocok, tetapi jujur: di bentuk ini menghitung hasil bagi langsung lebih cepat daripada faktorisasi. Faktorisasi dipakai sebagai cek. |
| 42 | Pasangan perkalian dua angka × dua angka | 7 | faktorisasi prima sebagai sidik jari | Sangat cocok. Faktor dua angka dapat dibaca sekilas. |
| 43 | Pasangan campuran (bagi di kiri, kali kecil di kanan) | 7 | hitung kedua sisi | Cocok. Angka kecil; hitung langsung. |
| 44 | Persen kapasitas: selisih persen ↔ liter | 10 | liter per 1% tetap (senilai) | Cocok. |
| 45 | Tiga keran, satu pengosong, ada jeda sebelum keran ketiga dibuka | 10 | hasil = laju × waktu; kapasitas dipilih = KPK | Sangat cocok. Laju menjadi bilangan bulat. |

Pembanding yang menambah bentuk: Part 39 no. 38 (pecahan × bilangan, pilihan berjarak 10 dengan angka satuan sama), no. 42–43 (suku ke-n; no. 43 hanya tiga titik berurutan), no. 44 (tabel 3×3 dengan bilangan negatif), no. 53 (berbanding lurus dengan *kenaikan* persen); TIU002 no. 24 (tabel berangka acuan di tepi), 26 (KPK per kolom), 27 (deret selang-seling dua bilangan), 28 (deret huruf-angka), 31–32 (berbalik nilai), 33 (hitung campuran), 34 (menyusul), 35 (perbandingan nilai P dan Q).

Bentuk yang **tidak** muncul di Paket 41 maupun TIU002: untung-rugi, diskon, bunga, bruto-neto-tara, umur, kereta, arus sungai, jumlah n suku, deret geometri tak hingga. Semuanya ada di Pejuang.

---

## Benang merah lima bab: cari yang tetap

| Bab | Yang tetap | Akibatnya untuk siswa |
|---|---|---|
| 6 | angka satuan dan sisa bagi 9 tidak berubah oleh cara menghitung | pilihan yang sidiknya salah gugur tanpa menghitung penuh |
| 7 | susunan faktor prima suatu hasil kali | dua perkalian sama ⇔ batu bata primanya sama |
| 8 | selisih pada tingkat tertentu | tingkat selisih yang tetap = pangkat pola |
| 9 | aturan yang sama di setiap baris/kolom; selisih antarkolom yang sama di setiap baris | tabel = rumus satu atau dua masukan |
| 10 | laju (senilai) atau hasil kali (berbalik nilai) | satu persamaan: hasil = laju × waktu |

Prinsip keempat (perkirakan dulu) dan ketiga (cek balik + contoh bantahan) dipasang di langkah kerja tiap bab.

---

## Bab 6 — Hitung Cepat dan Perkiraan

### 1. Ide besar dan alasan
**Ide besar.** Sebelum menghitung tepat, tanyakan tiga hal yang murah: seberapa besar hasilnya, berakhiran angka apa, dan berapa sisanya bila dibagi 9. Pilihan yang gagal di salah satu uji itu gugur. Kalau masih tersisa lebih dari satu, ubah bilangan ke bentuk ramah (pecahan sederhana, sifat distributif) lalu hitung.

**Mengapa benar.**
- *Ukuran:* bilangan m angka terletak antara 10^(m−1) dan 10^m. Hasil kali bilangan m angka dan k angka karena itu punya m + k − 1 atau m + k angka. Pilihan yang meleset satu nol langsung terlihat.
- *Angka satuan:* tulis a = 10p + x dan b = 10q + y. Hasil kalinya 100pq + 10(py + qx) + xy, jadi angka satuannya hanya ditentukan oleh angka satuan xy.
- *Sisa bagi 9:* 10 = 9 + 1, sehingga 100, 1.000, dan seterusnya juga "kelipatan 9 ditambah 1". Akibatnya sisa bagi 9 sebuah bilangan sama dengan sisa bagi 9 jumlah angkanya. Sisa ini ikut aturan kali dan tambah. Dua pilihan yang berselisih 10, 20, atau 40 pasti punya sisa berbeda; yang lolos uji hanya selisih kelipatan 9.
- *Pembulatan:* pada perkalian, galat relatif kedua faktor kira-kira dijumlahkan; pada pembagian, kira-kira dikurangkan. Karena itu bulatkan berlawanan arah pada perkalian (satu naik, satu turun) dan searah pada pembagian (pembilang dan penyebut sama-sama naik).
- *Tukar persen:* a% dari b = (a × b) : 100 = b% dari a, karena perkalian boleh ditukar.

### 2. Subbagian usulan
1. Ukuran Bilangan dan Banyak Angka Hasil
2. Kapan Memperkirakan, Kapan Menghitung Tepat (jarak antarpilihan dibanding galat pembulatan)
3. Pembulatan Berlawanan Arah
4. Angka Satuan dan Sisa Pembagian oleh Sembilan
5. Pecahan, Desimal, dan Persen yang Ramah (pecahan sederhana dulu, baru kali)
6. Sifat Distributif dan Urutan Operasi
7. Contoh Soal dan Pembahasan
8. Latihan Bertarget Waktu
9. Ringkasan Bab

### 3. Langkah kerja siswa
1. Lihat pilihan dulu: berapa jauh jarak antarpilihan dibanding besar nilainya?
2. Jarak jauh (patokan kerja: lebih dari ±10%) → perkirakan dengan dua angka penting, bulatkan berlawanan arah.
3. Jarak rapat → sederhanakan dulu (pecahan, coret faktor), lalu hitung tepat.
4. Gugurkan pilihan dengan uji ukuran, angka satuan, dan sisa bagi 9.
5. Cek balik: masukkan jawaban ke bentuk perkalian (untuk soal bagi) atau perkirakan ulang dari arah lain.

Catatan jujur: patokan ±10% adalah patokan kerja saya, bukan aturan resmi. Perlu diuji ke siswa.

### 4. Nama kesalahan
| Bahasa guru | kode |
|---|---|
| Kelebihan atau kekurangan satu nol / salah letak koma | belum ada (usulan J-NOL) |
| Semua bilangan dibulatkan ke arah yang sama, perkiraan melenceng | belum ada (usulan J-BULAT) |
| Penjumlahan dikerjakan sebelum perkalian | belum ada (usulan J-URUTAN) |
| Pecahan disederhanakan keliru | J-SEDERHANA |
| Berhenti satu langkah sebelum selesai (lupa membagi) | J-LANGKAH |
| Persen dihitung dari bilangan yang salah | J-BASIS |
| Tanda minus tertukar | J-TANDA |
| Menghitung angka yang tidak diperlukan | J-PENGALIH |

### 5. Bahan internal
| Path dan bagian | Isi | Status |
|---|---|---|
| Engine Pilar 2 (HIT, 1 soal no. 37), Pilar 4 "HIT/BLK/JKW/PKU", Pilar 6 | aturan: angka bulat di jalur benar, tiap pilihan salah dari satu kesalahan; target ≤ 30 detik | aturan ada, pembuat soal belum ada |
| `references/tiu.md` + `riset/2026-10-25-al-faiz-tiu.md` §38 | pecahan × bilangan, salah sederhanakan, trik pecahan sederhana dulu | pelajaran, bukan bahan ajar |
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-suku-pasangan.js`, materi Bagian B "Bentuk lain" | desimal → pecahan, persen, bagi dulu baru kali | dapat dipakai sebagian untuk subbagian 5 |
| Bank soal hitung cepat / perkiraan | — | **tidak ada** |

### 6. Beda dengan Pejuang (N01 Operasi Bilangan)
- Subjudul mereka: Urutan operasi hitung · Pecahan · Hafalan pecahan dan desimal · Persentase · Trik hitung cepat · Hafalan kuadrat dan pangkat tiga · Trik akar kuadrat · Kartu rumus cepat · Contoh soal · Latihan soal (Bab 00 memuat "Lima kebiasaan cepat", termasuk melihat pilihan dulu).
- Cara mereka: daftar rumus dan trik hafalan (kali 5, kali 25, kuadrat berakhiran 5, kali 11, akar) tanpa alasan; latihan menghitung tepat; perkiraan hanya muncul sebagai satu kebiasaan di bab strategi.
- Yang kita lakukan berbeda: (a) setiap trik diberi alasan satu-dua kalimat; (b) perkiraan menjadi inti bab karena bentuk hari H no. 37; (c) aturan memilih "kira atau hitung" dari jarak antarpilihan, dengan alasan galat; (d) alat gugur yang tidak ada di Pejuang: banyak angka hasil, angka satuan, sisa bagi 9; (e) bab ini diposisikan sebagai kotak alat untuk Bab 7–10 dan kecukupan data.

### 7. Celah
- Tidak ada bank atau script pembuat soal hitung cepat/perkiraan.
- Tiga kode kesalahan belum ada (J-NOL, J-BULAT, J-URUTAN).
- Perbandingan nilai P dan Q (TIU002 no. 35; engine menyebut "PKU", format belum diverifikasi) tidak ada di Paket 41 dan tidak ada di peta bab. Perlu putusan: dibahas di Bab 6, di Bab 11, atau tidak sama sekali.
- Kelemahan sisa bagi 9 wajib diajarkan sebagai contoh bantahan: buta terhadap angka yang tertukar tempat (selisih kelipatan 9) dan perlu hati-hati pada pembagian (uji pada bentuk perkaliannya).
- Target waktu 30 detik (engine) belum diuji ke siswa.

### 8. Calon soal (usulan: 1 pembuka · 3 contoh · 8 latihan = 12)
| Peran | Bentuk | Kesalahan yang dipancing | kode | Sumber pembuat | Target |
|---|---|---|---|---|---|
| Pembuka | perkiraan (3 angka × 2 angka) ÷ 2 angka, pilihan kelipatan bulat berjarak ±15–20% | pembulatan searah; lupa membagi; meleset satu nol | J-BULAT*, J-LANGKAH, J-NOL* | script baru (belum ada) | 30 detik |
| Contoh 1 | pecahan × bilangan, pilihan berjarak 10 dengan angka satuan sama (uji sisa 9 yang menentukan) | salah sederhanakan; lupa satu langkah; salah orde | J-SEDERHANA, J-LANGKAH, J-NOL* | script baru | 30 detik |
| Contoh 2 | hitung campuran desimal, pecahan, persen | urutan operasi; salah sederhanakan; persen dari bilangan salah | J-URUTAN*, J-SEDERHANA, J-BASIS | script baru | 45 detik |
| Contoh 3 | persen yang dapat ditukar / distributif | persen dari bilangan salah; angka pengalih | J-BASIS, J-PENGALIH | script baru | 30 detik |
| Latihan 1–3 | perkiraan, pilihan berjauhan | seperti pembuka | J-BULAT*, J-NOL*, J-LANGKAH | script baru | 30 detik |
| Latihan 4–5 | pecahan × bilangan, pilihan rapat | seperti contoh 1 | J-SEDERHANA, J-NOL* | script baru | 30 detik |
| Latihan 6–7 | hitung campuran | seperti contoh 2 | J-URUTAN*, J-TANDA | script baru | 45 detik |
| Latihan 8 | persen / distributif | seperti contoh 3 | J-BASIS, J-PENGALIH | script baru | 30 detik |
\* kode usulan, belum ada di Kamus.

Syarat pembuat soal: nilai kunci dan setiap pilihan salah dihitung dari fungsi kesalahannya; untuk perkiraan, dicek otomatis bahwa pembulatan dua angka penting yang berlawanan arah menunjuk kunci dan pembulatan searah menunjuk pilihan lain (kalau tidak, pilihan itu bukan jebakan nyata).

---

## Bab 7 — Pasangan Operasi Bernilai Sama

### 1. Ide besar dan alasan
**Ide besar.** Setiap bilangan bulat tersusun dari batu bata prima dengan satu cara saja. Hasil kali hanya menggabungkan batu bata itu. Karena itu a × b = c × d tepat ketika batu bata a dan b, digabung, sama dengan batu bata c dan d. Pembagian dikembalikan ke perkalian: a ÷ b = c ÷ d tepat ketika a × d = b × c.

**Mengapa benar.** Faktorisasi prima tunggal (setiap bilangan bulat > 1 hanya punya satu susunan faktor prima, urutan diabaikan). Siswa SMA sudah memakainya saat mencari FPB dan KPK. Dari sini juga terlihat mengapa trik lama "a/c = d/b" (materi `build-suku-pasangan.js`) benar: memindahkan faktor dari satu bilangan ke bilangan lain di sisi yang sama tidak mengubah tumpukan batu bata.
Pasangan cermin a × 10b dan b × 10a selalu sama karena keduanya 10 × a × b. Cermin semu hanya bisa dibuat dengan **merusak** pola itu (misalnya angka di satu sisi bukan tukaran tepat). Siswa yang paham alasannya bisa membedakan keduanya tanpa menghafal.

### 2. Subbagian usulan
1. Faktor Prima sebagai Sidik Jari Bilangan
2. Memindahkan Faktor Tanpa Mengubah Hasil
3. Pembagian sebagai Perkalian Silang
4. Pasangan Cermin dan Cermin Semu
5. Desimal, Persen, Pecahan, dan Tanda Kurung dalam Pasangan
6. Soal Bertanda TIDAK
7. Kapan Menghitung Langsung Lebih Cepat
8. Contoh Soal dan Pembahasan · Latihan Bertarget Waktu · Ringkasan Bab

### 3. Langkah kerja siswa
1. Baca perintah: dicari yang **sama** atau yang **TIDAK** sama, dan yang dibandingkan adalah sisi kiri dan kanan dalam satu pasangan.
2. Gugurkan cepat dengan uji murah: banyak angka hasil, angka satuan, banyak faktor 2 dan 5 (angka nol di belakang).
3. Pasangan perkalian: pecah tiap bilangan jadi faktor kecil, coret yang sama di kedua sisi; sisa harus habis.
4. Pasangan pembagian dengan hasil bagi bulat: hitung hasil bagi langsung; untuk cek, kalikan silang.
5. Cek balik: hitung **kedua** sisi pilihan yang kamu pilih, dan pastikan pilihan lain memang gagal di salah satu sisi.

### 4. Nama kesalahan
| Bahasa guru | kode |
|---|---|
| Cuma mengecek satu sisi (sisi kiri sudah cocok dengan nilai kunci) | J-SISI |
| Satu perbandingan cocok, satunya hanya mirip (pecahan berdekatan) | J-SISI |
| Isi kurung sama, pengalinya berbeda | J-SISI |
| Tertipu pasangan yang tampak tertukar | J-CERMIN |
| Desimal/persen diubah ke pecahan dengan keliru | J-SEDERHANA |
| Lupa kata TIDAK, atau membandingkan pasangan dengan pasangan lain | belum ada (usulan J-PERINTAH) |

### 5. Bahan internal
| Path dan bagian | Isi | Status |
|---|---|---|
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-suku-pasangan.js` → `PASANGAN` (15 soal) + `docs/suku-dan-pasangan/` (materi, soal, pembahasan PDF) | level 4–7: perkalian, desimal, persen, pecahan, tiga faktor, tanda kurung, 2 soal TIDAK; kunci tepat satu diperiksa otomatis; kunci 3 per huruf | final 2026-09-24, dibuat sebelum engine v0.4. Diperiksa 2026-10-30: hanya 2 dari 15 punya ≥ 2 pilihan dengan satu sisi = nilai kunci; tidak ada pasangan bagi murni maupun campuran ÷ dengan ×; tidak ada pasangan cermin; belum ada kode kesalahan per pilihan |
| Materi Bagian B di script yang sama | trik perbandingan a/c = d/b, ilustrasi kardus, jebakan | dapat dipakai sebagai subbagian 2, ditambah alasan faktor prima |
| Engine Pilar 2 (PAS 3 soal: bagi, kali, campuran), Pilar 4 PAS, Pilar 5 bunyi "a × b dan c × d" | aturan | ada; **contoh J-CERMIN keliru** (lihat Ringkasan temuan 1) |
| `references/tiu.md` bagian Pasangan + `riset/2026-10-25-al-faiz-tiu.md` §39–41 | pelajaran Al Faiz: cermin tunggal tertebak, cerita "sejumlah" tidak konsisten, pilihan "sisi kiri sama" | ada; contoh cermin semu di `tiu.md` keliru juga |

### 6. Beda dengan Pejuang
- Ebook Numerik Pejuang **tidak punya bab ini** (riset 2026-10-29). Paket TIU002 terbitan mereka memuat dua soal pasangan; pembahasannya memakai uji perbandingan a/c = d/b tanpa alasan dan tanpa nama kesalahan.
- Yang kita lakukan: satu alasan (faktor prima tunggal) yang menjelaskan uji perbandingan, pasangan cermin, cermin semu, dan pembagian sekaligus; kejujuran tentang kapan menghitung langsung lebih cepat; nama kesalahan untuk setiap pilihan.

### 7. Celah
- Contoh cermin semu di engine dan skill keliru (perbaikan butuh izin Gusti).
- Bank internal belum punya bentuk hari H no. 41 (bagi murni) dan no. 43 (campuran).
- Kode untuk salah baca perintah TIDAK belum ada.
- Bentuk pembagian dengan hasil tidak bulat belum pernah terlihat di bahan 2026; jangan dibuat sebelum ada bukti bentuk itu dipakai.

### 8. Calon soal (usulan: 1 pembuka · 3 contoh · 8 latihan = 12)
| Peran | Bentuk | Kesalahan yang dipancing | kode | Sumber pembuat | Target |
|---|---|---|---|---|---|
| Pembuka | perkalian dua angka × dua angka; satu pasangan sama; ≥ 2 pilihan dengan satu sisi = nilai kunci; satu cermin semu | cek satu sisi; tertipu tukaran | J-SISI, J-CERMIN | `build-suku-pasangan.js` (fungsi hitung + pemeriksaan kunci tunggal) diperluas: aturan J-SISI ≥ 2, cermin semu, kode per pilihan | 45 detik |
| Contoh 1 | perkalian dua angka (sidik faktor) | cek satu sisi; perbandingan hampir sama | J-SISI | idem | 45 detik |
| Contoh 2 | pembagian murni 3–4 angka ÷ 2 angka | cek satu sisi | J-SISI | idem + bentuk bagi (baru) | 45 detik |
| Contoh 3 | campuran ÷ dengan ×, atau soal TIDAK | lupa TIDAK; cek satu sisi | J-PERINTAH*, J-SISI | idem | 45 detik |
| Latihan 1–2 | perkalian | cek satu sisi; tertipu tukaran | J-SISI, J-CERMIN | idem | 45 detik |
| Latihan 3–4 | pembagian murni | cek satu sisi | J-SISI | idem | 45 detik |
| Latihan 5 | campuran | cek satu sisi | J-SISI | idem | 45 detik |
| Latihan 6 | desimal / persen / pecahan | salah ubah ke pecahan | J-SEDERHANA | bank lama soal 8–10 setelah ditulis ulang | 45 detik |
| Latihan 7 | tanda kurung | isi kurung sama, pengali beda | J-SISI | bank lama soal 14–15 setelah ditulis ulang | 60 detik |
| Latihan 8 | soal TIDAK | lupa TIDAK; membandingkan antarpasangan | J-PERINTAH* | bank lama soal 12–13 setelah ditulis ulang | 45 detik |
\* kode usulan. Bunyi pilihan "a × b dan c × d" (bukan "sama dengan"); cerita hanya bila perkaliannya bermakna dan satu benda per pilihan.

---

## Bab 8 — Deret dan Suku ke-n (+ Deret Huruf)

### 1. Ide besar dan alasan
**Ide besar.** Hitung selisih bertingkat sampai bertemu tingkat yang tetap. Tingkat itu adalah pangkat polanya: selisih pertama tetap berarti pola linear, selisih kedua tetap berarti pola kuadrat. Kalau nomor suku meloncat, yang dihitung adalah **kenaikan per suku** (selisih nilai dibagi selisih nomor). Deret yang selisihnya berlipat menandakan aturan "kali lalu tambah". Huruf diperlakukan sebagai nomor urut 1–26, lalu alat yang sama dipakai.

**Mengapa benar.**
- Jika Uₙ = an + b, maka Uₙ₊₁ − Uₙ = a, tetap.
- Jika Uₙ = an² + bn + c, maka Uₙ₊₁ − Uₙ = 2an + (a + b), yaitu pola linear; selisihnya sekali lagi = 2a, tetap. Setiap kali diambil selisih, pangkat turun satu. Akibatnya a = (selisih tingkat dua) : 2, dan setelah an² dikurangkan, sisanya linear. Ini alasan di balik langkah "kurangi n²" di materi lama.
- Banyak titik yang cukup: pola linear ditentukan 2 titik, kuadrat 3 titik. Satu titik lagi diperlukan sebagai **bukti** (titik ≥ banyak bilangan dalam rumus + 1). Tiga titik selalu cocok dengan suatu pola kuadrat, jadi tiga titik tidak membuktikan apa-apa.
- Jika Uₙ₊₁ = k·Uₙ + c, maka selisih berikutnya = k × selisih sebelumnya. Selisih yang berlipat k adalah sidik aturan "kali k lalu tambah".
- Huruf: lewat Z, nomor dikurangi 26 (berputar). Huruf dan pasangan cerminnya (A–Z, B–Y, …) selalu berjumlah nomor 27.
- Kenaikan per suku antara suku ke-p dan ke-q pada pola kuadrat = a(p + q) + b (dari q² − p² = (q − p)(q + p)). Dua kenaikan ini memberi a tanpa menebak. **Jujur: rumus ini kemungkinan terlalu tinggi untuk sebagian siswa;** usul ditaruh di kotak lanjutan atau kotak pengajar. Cara siswa tetap: coba kurangi n² (atau 2n²), lalu uji. Saya mengujinya pada contoh terbimbing 2 engine dan pada bentuk no. 39: memberi rumus yang benar di keduanya.

### 2. Subbagian usulan
1. Kenaikan per Suku pada Nomor yang Meloncat
2. Selisih Bertingkat dan Pangkat Pola
3. Banyak Titik yang Membuktikan Pola
4. Mencari Nomor Suku dari Nilainya
5. Deret Sebaris: Selisih, Rasio, dan Selang-seling
6. Selisih yang Berlipat: Aturan Kali lalu Tambah
7. Deret Huruf sebagai Deret Nomor Urut (subbagian pendek: nomor 1–26, berputar setelah Z, huruf cermin, deret huruf-angka dipisah)
8. Contoh Soal dan Pembahasan · Latihan Bertarget Waktu · Ringkasan Bab

### 3. Langkah kerja siswa
1. Urutkan tabel menurut nomor suku.
2. Hitung kenaikan per suku di setiap pasangan titik berurutan.
3. Semua sama → linear. Tidak sama → coba kurangi n² (atau 2n²); sisanya harus linear.
4. Perkirakan dulu: pola kuadrat untuk suku jauh menghasilkan bilangan jauh lebih besar daripada pola linear; buang pilihan yang ordenya salah.
5. Hitung suku yang ditanya; ingat dari suku ke-p ke suku ke-q ada q − p langkah.
6. Cek balik: uji rumus di **semua** titik, lalu hitung juga suku tetangganya (n − 1 dan n + 1); kalau salah satu ada di pilihan, pastikan kamu tidak meleset satu langkah.
7. Deret huruf: ubah ke nomor, kerjakan seperti deret angka, ubah balik.

### 4. Nama kesalahan
| Bahasa guru | kode |
|---|---|
| Menebak pola dari terlalu sedikit titik / tidak menguji semua titik | J-TIGA |
| Menganggap kenaikannya tetap padahal tidak | J-RATA |
| Selisih nilai antarbaris dipakai mentah padahal nomornya meloncat | J-NOMOR |
| Meleset satu langkah (suku ke-1 ke suku ke-25 = 24 langkah) | J-NOMOR |
| Menjawab banyak langkah, bukan nomor sukunya | J-NOMOR |
| Lupa bilangan tetap di rumus | J-KONST |
| Tanda bilangan tetap terbalik / deret turun dibaca naik | J-TANDA |
| Dua deret berselang dibaca sebagai satu deret | J-TIGA |
| Lupa berputar setelah Z / meleset satu huruf | J-NOMOR (atau kode baru bila Gusti menghendaki) |

### 5. Bahan internal
| Path dan bagian | Isi | Status |
|---|---|---|
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-suku-pasangan.js` → `SUKU` (15 soal) + materi Bagian A (PDF) | level 4–7: linear 7, kuadrat/pangkat tiga 8; tanya nilai, nomor suku, P − Q; pemeriksaan otomatis: kunci bulat, linear vs tidak, titik ≥ 3/4, pilihan tidak kembar | final 2026-09-24. Diperiksa 2026-10-30: **soal 1, 2, 4, 9 memakai jarak nomor berpola**, melanggar aturan "jarak acak" yang ditetapkan kemudian; "kunci bukan nilai menyendiri" tidak diperiksa otomatis; belum ada kode kesalahan |
| Materi Bagian A (script yang sama) | kenaikan per suku = selisih nilai : selisih nomor; ilustrasi argo taksi; tiga tes (kurangi n², 2n²/n³, bagi n) | bagus; tinggal diberi alasan selisih bertingkat |
| Engine contoh terbimbing 2 (pola kuadrat, 4 titik meloncat) | semua pilihan salah bernama | model yang tepat untuk "contoh dibahas" (diperiksa ulang 2026-10-30: angka benar) |
| `js/bank-soal.js` DAT-011 s.d. 017, 026, 027 + `js/pembahasan.js` | 9 deret sebaris di kotak, level 7–8 (selisih ganjil, selang-seling operasi, dua deret berselang, bilangan segitiga, pengali menurun, rekursif dua suku, dll.) | tanpa nama kesalahan per pilihan; urutan kunci di bank berpola berulang (A-B-C-D-E bergeser) |
| `scripts/build-deret-tabel-lv56.js` soal 3 dan 13 (cara baca per pasangan suku) | deret sebaris level 5–6, pilihan salah dijelaskan | lolos pemeriksaan aturan lain |
| Deret huruf | — | **tidak ada bahan internal** |
| Engine Pilar 4 SUK/TBD/DRT; `references/tiu.md` Suku ke-n; riset Part 39 no. 42–43 | titik ≥ bilangan rumus + 1, jarak acak, kunci tidak menyendiri | ada |

### 6. Beda dengan Pejuang (N05 Deret Angka dan Huruf + N07 Suku ke-n)
- Subjudul N05: Pola deret yang paling sering muncul (tabel 8 jenis) · Langkah mengerjakan · Deret huruf: ubah ke angka · Trik EJOTY · Kartu rumus cepat · Contoh · Latihan. Subjudul N07: Barisan aritmetika · Barisan geometri · Barisan bertingkat dua · Membaca soal berbentuk tabel · Trik cepat · Kartu · Contoh · Latihan.
- Cara mereka: katalog jenis pola yang dihafal; rumus aritmetika, geometri, jumlah n suku, deret tak hingga, dan rumus bertingkat dua diberikan tanpa asal-usul; tabel suku ke-n di contoh **diberi label jenis barisannya** dan sering hanya dua titik diketahui; jembatan keledai posisi huruf kelipatan 5.
- Yang kita lakukan: satu alat (selisih bertingkat) yang menurunkan semua jenis tadi, dengan alasan pangkat turun satu per selisih; aturan banyak titik sebagai bukti, termasuk contoh bantahan tiga titik; sidik "selisih berlipat" yang menghubungkan pola kali-tambah dengan pola selisih; huruf diperlakukan sebagai nomor dengan putaran 26 dan pasangan cermin 27, bukan patokan hafalan.
- Kita **tidak** memuat jumlah n suku, deret geometri tak hingga, dan sisipan, karena tidak muncul di bentuk hari H (perlu putusan).

### 7. Celah
- Bank deret huruf belum ada; contoh bentuk hanya dari TIU002 no. 27–28.
- Empat soal suku ke-n lama perlu ditulis ulang jarak nomornya sebelum dipakai.
- Cara mengajarkan "tiga titik berurutan" (Part 39 no. 43): soal hari H kadang hanya memberi tiga titik. Usul: ajarkan kebiasaan ujian "pilih pola berpangkat paling rendah yang cocok", lalu cek pilihan, dan katakan terus terang bahwa itu kebiasaan, bukan bukti. Perlu persetujuan Gusti.
- Rumus kenaikan a(p + q) + b: perlu putusan tempat (badan bab, kotak lanjutan, atau kotak pengajar).

### 8. Calon soal (usulan: 1 pembuka · 4 contoh · 10 latihan = 15)
| Peran | Bentuk | Kesalahan yang dipancing | kode | Sumber pembuat | Target |
|---|---|---|---|---|---|
| Pembuka | tabel suku ke-n linear, ≥ 4 titik, nomor meloncat acak, tanya suku jauh | selisih mentah; lupa bilangan tetap; meleset satu langkah | J-NOMOR, J-KONST | `SUKU` di `build-suku-pasangan.js` + pemeriksaan baru: jarak acak, kunci tidak menyendiri, kode per pilihan | 60 detik |
| Contoh 1 | linear, tanya nomor suku dari nilai | menjawab banyak langkah; tanda | J-NOMOR, J-TANDA | idem | 60 detik |
| Contoh 2 | kuadrat, 4–5 titik meloncat | suku tetangga; kenaikan dianggap tetap; lupa bilangan tetap | J-NOMOR, J-RATA, J-KONST | idem (model: engine contoh 2) | 75 detik |
| Contoh 3 | deret sebaris kali-lalu-tambah atau dua deret berselang | kenaikan dianggap tetap; pola tidak diuji di semua suku | J-RATA, J-TIGA | bank DAT-011–017/026/027 setelah ditulis ulang, atau script baru | 45 detik |
| Contoh 4 | deret huruf-angka (huruf: selisih bertingkat; angka: kali) | meleset satu huruf; lupa berputar | J-NOMOR | script baru (belum ada) | 45 detik |
| Latihan 1–3 | linear: tanya nilai, nomor suku, selisih dua suku | meleset satu langkah; lupa bilangan tetap; tanda | J-NOMOR, J-KONST, J-TANDA | `SUKU` diperluas | 60 detik |
| Latihan 4–5 | kuadrat 4–5 titik | kenaikan dianggap tetap; lupa bilangan tetap; suku tetangga | J-RATA, J-KONST, J-NOMOR | idem | 75 detik |
| Latihan 6 | pangkat tiga atau "bagi n" | pola tidak diuji di semua titik; lupa bilangan tetap | J-TIGA, J-KONST | idem | 75 detik |
| Latihan 7–8 | deret sebaris (rekursif, selang-seling) | kenaikan dianggap tetap; dua deret dibaca satu | J-RATA, J-TIGA | bank DAT ditulis ulang / script baru | 45 detik |
| Latihan 9–10 | deret huruf / huruf-angka | meleset satu huruf; lupa berputar | J-NOMOR | script baru | 45 detik |

---

## Bab 9 — Deret Angka Tabel (Dua Kolom, 3×3, Model Kotak)

### 1. Ide besar dan alasan
**Ide besar.** Tabel angka adalah rumus yang disembunyikan. Tentukan dulu berapa masukannya: satu masukan (tabel dua kolom), dua masukan (baris 3×3: kolom akhir dari kolom-kolom sebelumnya), atau masukan dari angka acuan di tepi (model kotak). Satu masukan dikerjakan dengan alat Bab 8. Dua masukan diuji di setiap baris lengkap dan di dua arah. Model kotak diuji dengan "pemisahan": kalau selisih antara dua kolom sama di setiap baris, kolom itu masuk sebagai penjumlah; kalau hasil baginya sama, masuk sebagai pengali.

**Mengapa benar.**
- Tabel dua kolom = tabel suku ke-n dengan kolom kiri sebagai nomor. Semua alasan Bab 8 berlaku. Bila kolom kanan habis dibagi kolom kiri di setiap baris, hasil baginya membentuk pola baru yang lebih sederhana (sidik faktor, menyambung ke Bab 7).
- Pemisahan: kalau isi sel = g(baris) + h(kolom), maka selisih dua kolom = h(kolom 1) − h(kolom 2), tidak bergantung baris. Kebalikannya juga benar. Sama halnya untuk perkalian dan hasil bagi.
- Ukuran hasil: dua bilangan satu angka dijumlah paling banyak 18, dikali sampai 81. Hasil yang jauh lebih besar dari masukannya menandakan perkalian atau kuadrat.
- Contoh bantahan untuk "dua baris sudah cukup": contoh pertama di Bab 06 Pejuang (dua baris lengkap) cocok dengan 6 aturan dua-operasi yang memberi 6 nilai berbeda untuk sel kosong (pemeriksaan saya, angka mereka tidak dikutip). Sebaliknya bentuk hari H no. 40 hanya cocok dengan satu aturan sederhana. Pelajaran: setelah aturan cocok, cek apakah aturan lain yang sama sederhananya menunjuk pilihan lain; kalau ya, pilihan jawaban menjadi hakim.

### 2. Subbagian usulan
1. Membaca Tabel sebagai Rumus: Satu Masukan atau Dua Masukan
2. Tabel Dua Kolom sebagai Tabel Suku ke-n
3. Tabel 3×3: Aturan per Baris atau per Kolom
4. Ukuran Hasil sebagai Petunjuk Operasi
5. Model Kotak dengan Angka Acuan: Uji Pemisahan
6. Bilangan Negatif, Nol, FPB, dan KPK dalam Tabel
7. Ketika Dua Aturan Sama-sama Cocok
8. Contoh Soal dan Pembahasan · Latihan Bertarget Waktu · Ringkasan Bab

### 3. Langkah kerja siswa
1. Tentukan bentuk: dua kolom, baris/kolom 3×3, atau kotak beracuan.
2. Perkirakan operasi dari ukuran hasil.
3. Rumuskan aturan dari satu baris lengkap.
4. Uji di **setiap** baris lengkap. Gagal di satu baris → aturan dibuang. Lalu coba arah lain (kolom).
5. Model kotak: bandingkan selisih atau hasil bagi antarkolom di tiap baris untuk melihat apakah angka acuan masuk sebagai penjumlah atau pengali.
6. Hitung sel kosong. Cek balik: adakah aturan lain yang sama sederhananya dan menunjuk pilihan lain?

### 4. Nama kesalahan
| Bahasa guru | kode |
|---|---|
| Aturan cocok di satu baris tetapi tidak diuji di baris lain | J-TIGA |
| Mencari selisih tetap padahal isi tabel dihitung dari angka acuan | J-RATA |
| Salah memilih angka yang dipasangkan / urutan operasi keliru (aturan itu gagal di baris lain) | J-TIGA |
| Lupa langkah terakhir (dikurangi 1, dibagi 2) | J-LANGKAH |
| Bilangan negatif atau urutan pengurangan terbalik | J-TANDA |
| Lupa bilangan tetap pada tabel dua kolom | J-KONST |

### 5. Bahan internal
| Path dan bagian | Isi | Status |
|---|---|---|
| `GENERATE SOAL TERBARU SKD 2026/scripts/build-deret-tabel-lv56.js` + `docs/deret-tabel-level-5-6/` | 15 soal level 5–6; tujuh cara baca (baris, kolom, pasangan suku, angka acuan, tetangga, dua baris); pemeriksaan otomatis: jawaban tunggal, pilihan salah tidak memenuhi aturan, aturan lain sederhana tidak membenarkan pilihan salah, setiap pilihan salah dijelaskan di teks jebakan | **paling siap**; tinggal diberi kode kesalahan dan dipisah peran (contoh/latihan) |
| `js/bank-soal.js` + `js/pembahasan.js` (aplikasi CAT, 30 soal level 6–8) | tabel kotak beragam: angka acuan, baris 4–5 sel, 3×3, deret sebaris | tanpa nama kesalahan per pilihan; **urutan kunci berpola berulang** (pilihan wajib diacak ulang bila dipakai); diperiksa 2026-10-30 untuk 9 soal per baris: tidak ada aturan dua-operasi lain yang menunjuk pilihan salah; DAT-018 dapat dijawab dengan "angka tengah + 3" (lebih mudah dari levelnya); DAT-028 terlalu mudah untuk level 8 |
| `references/tiu.md` bagian Deret angka tabel (contoh DAT-022) | pelajaran sel = kuadrat acuan baris + acuan kolom | contoh baik untuk uji pemisahan |
| Engine Pilar 4 SUK/TBD/DRT | 3×3 terbukti di 2 baris/kolom; tingkat sulit memuat negatif atau nol; aturan lain ≤ 3 operasi diperiksa | ada |
| Tabel dua kolom khusus | — | **tidak ada**; dapat dibuat dengan mesin `SUKU` (label "Kolom A/Kolom B") |

### 6. Beda dengan Pejuang (N06 Tabel Deret)
- Subjudul: Bentuk soal · Arah pola yang perlu dicek · Langkah mengerjakan · Trik cepat · Kartu rumus cepat · Contoh soal · Latihan soal.
- Cara mereka: daftar arah (mendatar, menurun, jumlah tetap, pangkat) dan daftar rumus kombinasi untuk dicoba; trik "hasil besar berarti kali atau kuadrat" tanpa alasan; aturan diuji di dua baris; tidak membedakan tabel satu masukan dan dua masukan; tidak ada bentuk dua kolom maupun model kotak beracuan.
- Yang kita lakukan: tabel sebagai rumus dengan banyak masukan tertentu; dua kolom disambungkan ke Bab 8; uji pemisahan untuk model kotak (dengan alasan); alasan ukuran hasil; contoh bantahan "dua baris cocok dengan banyak aturan" dan cara pilihan menjadi hakim.

### 7. Celah
- **Istilah "model kotak" belum didefinisikan di bahan.** Tafsiran saya: format kisi aplikasi CAT deret tabel (`js/bank-soal.js`, level 6–8), termasuk tabel beracuan tepi seperti DAT-022/023. Gusti memakai format kisi ini juga untuk petak Deret di sampul. Perlu konfirmasi.
- Belum ada bank tabel dua kolom.
- Bank CAT lama perlu diacak ulang urutan kuncinya dan diberi nama kesalahan.

### 8. Calon soal (usulan: 1 pembuka · 3 contoh · 9 latihan = 13)
| Peran | Bentuk | Kesalahan yang dipancing | kode | Sumber pembuat | Target |
|---|---|---|---|---|---|
| Pembuka | 3×3 per baris, aturan dua langkah; satu aturan sederhana cocok di satu baris saja | aturan tidak diuji di baris lain; lupa langkah terakhir | J-TIGA, J-LANGKAH | `build-deret-tabel-lv56.js` (cara baca + pemeriksaan aturan lain) | 60 detik |
| Contoh 1 | dua kolom, kolom kanan kuadrat dari kolom kiri, 4 baris | kenaikan dianggap tetap; lupa bilangan tetap | J-RATA, J-KONST | mesin `SUKU` diberi label kolom | 60 detik |
| Contoh 2 | 3×3 per kolom dengan bilangan negatif atau nol | tanda; aturan dari satu kolom | J-TANDA, J-TIGA | `build-deret-tabel-lv56.js` | 60 detik |
| Contoh 3 | model kotak beracuan tepi | selisih tetap; lupa langkah | J-RATA, J-LANGKAH | idem (cara baca angka acuan) | 60 detik |
| Latihan 1–3 | dua kolom (linear, kuadrat, sidik faktor) | kenaikan dianggap tetap; lupa bilangan tetap; aturan tidak diuji | J-RATA, J-KONST, J-TIGA | mesin `SUKU` | 60 detik |
| Latihan 4–6 | 3×3 (baris, kolom, jumlah tetap / FPB / KPK) | aturan dari satu baris; tanda | J-TIGA, J-TANDA | `build-deret-tabel-lv56.js` | 60 detik |
| Latihan 7–9 | model kotak (acuan, tetangga, baris 4–5 sel) | selisih tetap; lupa langkah terakhir | J-RATA, J-LANGKAH | idem; cadangan: bank CAT setelah ditulis ulang | 60 detik |

---

## Bab 10 — Soal Cerita: Laju × Waktu = Hasil (+ Untung-Rugi dan Diskon)

### 1. Ide besar dan alasan
**Ide besar.** Hampir semua soal cerita numerik adalah satu persamaan: **hasil = laju × waktu**. Pekerjaan, mengisi tangki, menempuh jarak, dan mengemas barang semuanya "hasil". Beberapa pelaku yang bekerja bersamaan → lajunya dijumlah; yang menguras atau menjauh → lajunya dikurangkan. Besaran yang tidak disebut angkanya dan akhirnya saling coret boleh dipilih angka ramah (kapasitas = KPK waktu, harga = 100).

**Mengapa benar.**
- Laju tiap pelaku adalah hasil per satuan waktu; dua pelaku dalam satu jam menghasilkan jumlah hasil masing-masing, jadi lajunya dijumlah. Pengosong menghasilkan "hasil negatif".
- Memilih kapasitas bebas: dengan kapasitas V, laju tiap keran V : tᵢ, dan waktu bersama = V : (jumlah laju). V muncul di atas dan di bawah, jadi saling coret. Memilih V = KPK waktu hanya membuat semua laju bulat.
- Senilai berarti hasil bagi tetap (laju tetap → hasil sebanding waktu). Berbalik nilai berarti hasil kali tetap (hasil tetap → pelaku × waktu tetap). Pertanyaannya selalu: "apa yang tetap di cerita ini?"
- Berpapasan = dua pelaku mengerjakan satu "pekerjaan" (jarak) bersama → laju dijumlah. Menyusul = jarak awal dihabiskan oleh selisih laju. Kecepatan rata-rata = total jarak : total waktu; untuk pergi-pulang jarak sama, jaraknya saling coret sehingga hasilnya bukan rata-rata biasa dua kecepatan.
- Persen kapasitas: liter per 1% tetap, jadi selisih persen sebanding selisih liter (senilai).
- Diskon bertingkat dikalikan, bukan dijumlah, karena potongan kedua dikenakan pada harga yang sudah dipotong; persen untung dihitung dari harga beli karena harga beli adalah "100%"-nya.
- Uji masuk akal (perkirakan dulu): beberapa keran pengisi bersama pasti lebih cepat daripada keran tercepat sendirian; ada pengosong → lebih lambat daripada tanpa pengosong.

### 2. Subbagian usulan
1. Satu Persamaan untuk Banyak Cerita
2. Senilai dan Berbalik Nilai: Apa yang Tetap
3. Kerja Bersama dan Keran (pengosong bernilai negatif, ada jeda)
4. Memilih Angka Ramah untuk Besaran yang Saling Coret
5. Jarak, Kecepatan, dan Waktu (berpapasan, menyusul, kecepatan rata-rata)
6. Persen sebagai Bagian dari Seratus (persen kapasitas, kenaikan vs keadaan)
7. Untung, Rugi, dan Diskon (subbagian pendek)
8. Contoh Soal dan Pembahasan · Latihan Bertarget Waktu · Ringkasan Bab

### 3. Langkah kerja siswa
1. Tulis daftar yang dibutuhkan: hasil, laju tiap pelaku, waktu tiap tahap. Coret angka yang tidak masuk daftar.
2. Samakan satuan (jam dengan jam, km dengan km).
3. Pilih angka ramah untuk besaran yang saling coret (KPK waktu, harga 100).
4. Tulis laju tiap pelaku, beri tanda minus untuk pengosong; jumlahkan per tahap.
5. Hitung tiap tahap dengan hasil = laju × waktu, lalu gabungkan tahap.
6. Perkirakan: apakah jawaban masuk akal dibanding pelaku tercepat sendirian?
7. Cek balik: masukkan jawaban ke cerita, dan pastikan yang dijawab adalah yang ditanya (total waktu sejak awal, bukan waktu tahap terakhir).

### 4. Nama kesalahan
| Bahasa guru | kode |
|---|---|
| Berbalik nilai dihitung senilai (pelaku bertambah, waktu dianggap bertambah) | J-SEARAH |
| Persen dihitung dari dasar yang salah (diskon bertingkat dijumlah, untung dari harga jual, keadaan dipakai padahal yang sebanding kenaikan) | J-BASIS |
| Laju pengosong ikut dijumlahkan | J-TANDA |
| Lupa tahap pertama (jeda) atau menjawab waktu tahap terakhir saja | J-LANGKAH |
| Memakai angka yang tidak diperlukan | J-PENGALIH |
| Memakai keterangan yang tidak tertulis | J-ASUMSI |
| Hasil tepat sama dengan batas dibaca keliru | J-BATAS |
| Menjumlah waktu padahal yang dijumlah laju; merata-rata dua kecepatan | belum ada (usulan J-LAJU) |
| Satuan tidak disamakan (menit dan jam) | belum ada (usulan J-SATUAN) |

### 5. Bahan internal
| Path dan bagian | Isi | Status |
|---|---|---|
| Engine Pilar 2 CRT (2 soal: persen kapasitas, kerja bersama/keran) + spesifikasi awal CRT dan BLK | hitung dengan pecahan tepat; pilihan salah: lupa jeda, lupa tanda negatif, salah dasar persen; J-SEARAH wajib di soal berbalik nilai | aturan ada, **pembuat soal belum ada** |
| Engine contoh terbimbing 1 (relawan-jam) | satuan "pelaku × waktu" sebagai beban kerja | bentuknya kecukupan data, idenya dipakai di subbagian 2 |
| `scripts/build-kecukupan-data.js`, `-paket2.js` | konteks keran, bus, pelari, harga; pola pemeriksaan "semua keadaan yang mungkin" | bukan soal hitung; pola pemeriksaannya dapat dipakai ulang |
| `riset/2026-10-25-tiu-2026-logika-celah.md` §8 (Part 39 no. 53) | "sebanding dengan kenaikan" vs keadaan, J-BASIS | pelajaran |
| Log uji Paket 41 + tangkapan no. 44–45 | bentuk hari H | acuan bentuk |
| Untung-rugi, diskon | — | **tidak ada bahan internal** |

### 6. Beda dengan Pejuang (N02 Aritmatika Sosial + N03 Perbandingan + N04 Jarak, Kecepatan, dan Waktu)
- Subjudul N02: Untung dan rugi · Diskon · Bruto, neto, tara · Bunga tunggal · Trik cepat. N03: Dua jenis perbandingan · Rumus Orang × Waktu ÷ Hasil · Langkah cepat · Penambahan pekerja di tengah pekerjaan · Perbandingan jumlah dan selisih · Perbandingan umur · Jebakan umur · Trik selisih tetap · Cara menentukan jenis. N04: Rumus dasar · Trik segitiga JKW · Konversi satuan · Berpapasan · Menyusul · Kecepatan rata-rata · Kereta, jembatan, terowongan · Perahu dan arus sungai · Langkah mengerjakan.
- Cara mereka: tiga bab terpisah, rumus per kasus (berpapasan, menyusul, rata-rata pergi-pulang, orang-waktu-hasil, harga beli dari harga jual) dalam tabel; jembatan keledai segitiga; ada satu paragraf alasan singkat untuk rumus orang × waktu ÷ hasil dan satu uji "jenis perbandingan" (dua kali lipat). **Tidak ada kerja bersama atau keran** (konfirmasi riset 2026-10-29).
- Yang kita lakukan: satu persamaan untuk tiga bab mereka; rumus berpapasan, menyusul, rata-rata pergi-pulang, dan orang × waktu diturunkan, bukan dihafal; keran dengan pengosong dan jeda (bentuk hari H no. 45) menjadi inti; alasan mengapa kapasitas boleh dipilih; uji masuk akal sebelum menghitung; nama kesalahan per pilihan.

### 7. Celah
- Tidak ada script pembuat soal cerita; harus dibangun (hitung pecahan tepat, kunci dan pilihan salah dari fungsi kesalahan).
- Dua kode usulan (J-LAJU, J-SATUAN) dan pemakaian J-LANGKAH untuk "lupa jeda" perlu putusan.
- Cakupan topik Pejuang yang tidak ada di bentuk hari H: umur, bunga tunggal, bruto-neto-tara, kereta, arus sungai, perbandingan jumlah-selisih. Usul saya: hanya perbandingan jumlah-selisih yang masuk (ia termasuk "senilai"); sisanya tidak dimuat. Perlu putusan.
- Untung-rugi dan diskon hanya muncul di Pejuang, tidak di Paket 41 maupun TIU002. Subbagian pendek sesuai peta; jumlah soalnya perlu dijaga kecil.

### 8. Calon soal (usulan: 1 pembuka · 5 contoh · 10 latihan = 16)
| Peran | Bentuk | Kesalahan yang dipancing | kode | Sumber pembuat | Target |
|---|---|---|---|---|---|
| Pembuka | kerja bersama tiga keran, satu pengosong, ada jeda | pengosong dijumlah; lupa jeda / jawab waktu tahap akhir; jumlah waktu | J-TANDA, J-LANGKAH, J-LAJU* | script baru (pecahan tepat) | 90 detik |
| Contoh 1 | persen kapasitas: selisih persen ↔ volume | keadaan dipakai, bukan kenaikan; lupa satu tahap | J-BASIS, J-LANGKAH | script baru | 60 detik |
| Contoh 2 | berbalik nilai: pelaku × waktu, tambah pelaku di tengah | dihitung senilai; keterangan tak tertulis; lupa sisa pekerjaan | J-SEARAH, J-ASUMSI, J-LANGKAH | script baru | 75 detik |
| Contoh 3 | kerja bersama dua pelaku beda laju | jumlah/rata-rata waktu | J-LAJU*, J-SEARAH | script baru | 60 detik |
| Contoh 4 | menyusul atau berpapasan | satuan; lupa jarak awal; laju dijumlah padahal searah | J-SATUAN*, J-LANGKAH, J-TANDA | script baru | 75 detik |
| Contoh 5 | diskon bertingkat atau persen untung | dasar persen salah | J-BASIS | script baru | 45 detik |
| Latihan 1–2 | senilai / persen kapasitas | dasar persen salah; angka pengalih | J-BASIS, J-PENGALIH | script baru | 60 detik |
| Latihan 3–4 | berbalik nilai | dihitung senilai; keterangan tak tertulis | J-SEARAH, J-ASUMSI | script baru | 75 detik |
| Latihan 5–6 | kerja bersama / keran | pengosong dijumlah; lupa jeda; jumlah waktu | J-TANDA, J-LANGKAH, J-LAJU* | script baru | 90 detik |
| Latihan 7–8 | jarak, kecepatan, waktu (termasuk rata-rata pergi-pulang) | rata-rata dua kecepatan; satuan | J-LAJU*, J-SATUAN* | script baru | 75 detik |
| Latihan 9–10 | untung-rugi, diskon | dasar persen salah | J-BASIS | script baru | 45 detik |
\* kode usulan.

---

## Status bahan internal (gabungan)

| Bahan | Dipakai di | Siap pakai? | Yang harus dikerjakan dulu |
|---|---|---|---|
| `build-deret-tabel-lv56.js` (15 soal) | Bab 9, Bab 8 | hampir | kode kesalahan per pilihan |
| `build-suku-pasangan.js` → `SUKU` (15) | Bab 8, Bab 9 (dua kolom) | sebagian | 4 soal jarak berpola ditulis ulang; pemeriksaan jarak acak + kunci tidak menyendiri; kode |
| `build-suku-pasangan.js` → `PASANGAN` (15) | Bab 7 | sebagian | bentuk bagi murni + campuran; aturan "≥ 2 pilihan sisi = kunci"; cermin semu yang benar; kode |
| Materi PDF suku ke-n + pasangan | Bab 7, 8 | sebagai bahan tulisan | tambahkan alasan (faktor prima, selisih bertingkat) |
| Bank CAT 30 soal (`bank-soal.js`) | Bab 8, 9 cadangan | tidak langsung | acak ulang kunci; nama kesalahan; ganti DAT-018/028 bila dipakai sebagai soal sulit |
| Engine contoh terbimbing 2 | Bab 8 | ya (model) | — |
| Hitung cepat / perkiraan | Bab 6 | tidak ada | script baru |
| Soal cerita laju, persen, diskon | Bab 10 | tidak ada | script baru |
| Deret huruf | Bab 8 | tidak ada | script baru |

Jumlah usulan seluruh bagian numerik: 68 soal (5 pembuka, 18 contoh, 45 latihan). Angka ini usulan untuk Tahap 2.

Target waktu yang saya cantumkan adalah usulan, berpatokan pada engine Pilar 6 (rata-rata 50–55 detik per soal, hitung cepat ≤ 30 detik; masih rancangan). Yang terverifikasi hanya total SKD 110 soal dalam 100 menit (`references/domain-skd.md`); tidak ada pembagian waktu resmi per subtes. Target per jenis **belum diverifikasi** dengan uji siswa.

## Usulan tambahan Kamus Jebakan (perlu putusan Gusti)
| Usulan kode | Nama untuk siswa | Kesalahan | Bab |
|---|---|---|---|
| J-NOL | Jebakan Salah Nol | kelebihan/kekurangan satu nol, salah letak koma | 6, 7 |
| J-BULAT | Jebakan Bulat Searah | perkiraan melenceng karena semua bilangan dibulatkan ke arah yang sama | 6 |
| J-URUTAN | Jebakan Urutan Hitung | tambah/kurang dikerjakan sebelum kali/bagi | 6, 9 |
| J-PERINTAH | Jebakan Lupa TIDAK | mengabaikan kata TIDAK atau membandingkan antarpasangan | 7 |
| J-LAJU | Jebakan Jumlah Waktu | menjumlah atau merata-rata waktu/kecepatan, padahal yang dijumlah laju (atau total jarak dan total waktu) | 10 |
| J-SATUAN | Jebakan Satuan | menit dan jam, meter dan kilometer tidak disamakan | 10 |

---

## Putusan yang perlu diminta ke Gusti (urut prioritas)

1. **Perbaikan contoh cermin semu** di engine (Pilar 3, baris J-CERMIN) dan `references/tiu.md` bagian Pasangan: contoh yang tertulis ternyata bernilai sama. Boleh diperbaiki?
2. **"Cari yang tetap" sebagai ide besar penyatu kelima bab numerik** (dan tabel dua kolom digabung dengan alat suku ke-n). Disetujui sebagai arah tulisan Bab 6–10?
3. **Arti "model kotak" di Bab 9:** benarkah yang dimaksud format kisi aplikasi CAT deret tabel (termasuk tabel beracuan tepi)?
4. **Enam kode baru Kamus Jebakan** (J-NOL, J-BULAT, J-URUTAN, J-PERINTAH, J-LAJU, J-SATUAN) dan pemakaian J-LANGKAH untuk "lupa jeda".
5. **Cakupan Bab 10:** apakah umur, bunga tunggal, bruto-neto-tara, kereta, dan arus sungai (ada di Pejuang, tidak di bentuk hari H) dikeluarkan? Usul saya: dikeluarkan, kecuali perbandingan jumlah-selisih.
6. **Perbandingan nilai P dan Q** (TIU002 no. 35): dibahas di Bab 6, di Bab 11, atau tidak dimuat?
7. **Cara mengajarkan soal "tiga titik berurutan":** ajarkan kebiasaan ujian "pola berpangkat paling rendah" dengan catatan terus terang bahwa itu bukan bukti?
8. **Tempat rumus kenaikan a(p + q) + b** (pola kuadrat dengan nomor meloncat): badan bab, kotak lanjutan, atau kotak pengajar.
9. **Pembuat soal baru** untuk Bab 6, Bab 10, dan deret huruf: ditaruh di `GENERATE SOAL TERBARU SKD 2026/scripts/` (bersama script lama) atau di folder engine TIU?
10. **Jumlah soal numerik** (usulan 68) dan target waktu per jenis: ditetapkan di Tahap 2.
