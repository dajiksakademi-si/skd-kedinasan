# ENGINE GENERATE SOAL TIU — D'AJIKS AKADEMI

**Mesin produksi soal Tes Intelegensia Umum (SKD) — gaya 3K D'AJIKS:**
**Kalimat Kunci · Kesalahan Bernama · Kunci Terbukti.**

Versi 0.4.3 (draf rancangan) · 2026-10-30.
- **Perubahan v0.4.3** (putusan Gusti 2026-10-30, Putusan T2-4 dan T2-5 Handbook TIU; bahan: `../HANDBOOK TIU D AJIKS AKADEMI/reports/tahap2_*.md`):
  - (a) Opsi angka tetap urut naik, dan kunci **boleh** di A atau E. "Kunci pencilan" diukur dari **jarak** angka, bukan dari letak huruf (Pilar 4 SUK/TBD/DRT, Pilar 5, Pilar 6, G5). Batas lama "kunci terkecil/terbesar ≤ 30% butir numerik" dicabut; sebaran A–E tetap diupayakan seimbang per paket.
  - (b) Pilar 5: bunyi opsi baku dua bentuk verbal hari H. "Menilai dua kesimpulan": tiap opsi menyatakan status lengkap (1) dan (2), tanpa "atau". "Dua argumen": lima opsi bentuk hari H; fakta menyentuh tepat satu argumen atau tidak menyentuh keduanya.
  - (c) Pilar 3: kolom Keluarga 14 kode diselaraskan dengan pemakaian di laporan Tahap 2 (J-ASUMSI, J-PENGALIH, J-BERHENTI, J-LANGKAH, J-TANDA, J-BATAS, J-MUNGKIN, J-TENTU, J-NOMOR, J-NOL, J-BULAT, J-URUTAN, J-RASIO, J-BASIS). Kode, nama, dan kelompok K1–K7 tidak berubah.
  - (d) Tanpa kode baru (tetap 47): lupa panjang kereta masuk keterangan J-LANGKAH; opsi "tidak relevan" di soal dua argumen masuk keterangan J-KATA.
  - (e) Perbandingan P dan Q (PKU): empat opsi tetap (P > Q · P < Q · P = Q · hubungan tidak dapat ditentukan), saling meniadakan, kunci tunggal; pengecualian dari aturan 5 opsi. Format resmi belum diverifikasi; di ujian bisa muncul lima opsi (Pilar 1, Pilar 4, Pilar 5).
- Versi 0.4.2 · 2026-10-30.
- **Perubahan v0.4.2** (putusan Gusti 2026-10-30; usulan kode Tahap 1 Handbook TIU, laporan A–E):
  - Pilar 3 jadi **satu daftar bersama** 47 kode: 21 lama + 14 J- baru + 12 JF- figural. Kamus figural Pilar 4 FIG dipindah ke sini; usulan bertumpuk disatukan, yang sudah tertutup kode lama masuk keterangan kode lama.
  - Kolom "Nama untuk siswa" diganti "Nama (edisi pengajar)" + "Kalimat guru (buku siswa)"; tambah kolom kelompok K1–K7 (Handbook TIU Bab 19).
  - Buku siswa: kalimat guru, tanpa kata "jebakan" dan tanpa kode. Contoh "Jebakan Sisi Kiri" di Pilar 3 dan format pembahasan diganti.
  - Label langkah terakhir pembahasan "Jebakan di soal ini" diganti "Kekeliruan yang Mungkin Terjadi" (putusan Gusti 2026-10-30).
  - Soal argumen "pemerkuat dipilih padahal diminta pelemah (atau sebaliknya)" dipindah dari J-PERINTAH ke J-BALIK, kelompok K3 (putusan Gusti 2026-10-30).
  - Kelompok: J-TIGA K5 → K2 (Pemeriksaan yang Belum Tuntas), J-CERMIN K7 → K5 (Pola yang Belum Terbukti), ikut usul laporan A (putusan Gusti 2026-10-30).
  - Waktu target TIU: rata-rata 50–55 detik diganti ±50,5 menit per 35 butir (±86 detik), selaras Handbook TWK/TKP (putusan Gusti 2026-10-30).
  - Format pembahasan 8 langkah → 7 langkah pedoman proyek: kalimat penentu masuk langkah 2, cara kilat + cara paham masuk langkah 3 (putusan Gusti 2026-10-30).
  - Istilah siswa: "kalimat penentu" (seragam Handbook TWK/TKP); "Kalimat Kunci" tetap nama 3K di engine dan edisi pengajar (putusan Gusti 2026-10-30).
- Versi 0.4.1 · 2026-10-30.
- **Perubahan v0.4.1** (izin Gusti 2026-10-30; temuan Tahap 1 Handbook TIU):
  - Pilar 3 J-CERMIN: contoh lama "28 × 330 dan 33 × 280" ternyata SAMA (9.240; a × 10b = b × 10a selalu sama). Diganti contoh yang benar-benar beda + larangan memakai bentuk a × 10b / b × 10a sebagai opsi salah.
  - Pilar 2 + Pilar 4 KCK: dua daftar 5 bentuk yang bertentangan diselaraskan ke bentuk Paket 41 no. 46–52; tiga pernyataan dan nilai vs batas jadi bentuk cadangan.
- Versi 0.4 · 2026-10-28.
- **Perubahan v0.4** (putusan Gusti 2026-10-28; uji Paket 41 Al Faiz + pembahasan resmi no. 57–65):
  - Pilar 2: blueprint = komposisi Paket 41 Al Faiz (gambaran hari H SKD 2026, putusan Gusti): verbal 6 · numerik 9 · KCK 7 · ANA 3 · OPT 1 · FIG 9. Blueprint v0.3 (15/5/8/7) gugur.
  - Pilar 4 FIG (baru): logika penyusun Al Faiz, 8 jenis figural, aturan produksi, Kamus Jebakan figural. Generator: `k12-spatial-engine/` (modul TIU, `npm run gen:tiu`, mockup `npm run mockup`).
  - Larangan figural tanpa generator dicabut; diganti larangan figural di luar generator / tanpa cek mata.
- **Perubahan v0.3** (dari analisis Al Faiz 56–65, `riset/2026-10-25-al-faiz-56-65-tiu.md`; bagian lain tidak diubah):
  - Pilar 4 ANA: aturan "setiap syarat wajib menggugurkan ≥ 1 opsi" (celah C9 syarat mati, Al Faiz 56);
  - Pilar 2 FIG: catatan bukti figural muncul di tryout 2026 (Al Faiz 57–65). Porsi FIG **tidak diubah**, menunggu keputusan Gusti.
  - Celah C10 (aturan figural dilanggar stimulus sendiri, Al Faiz 57 & 65) sudah tertutup oleh G2 dan invarian `tiu-verbal-figural.md` §7, jadi tidak perlu aturan baru.
- **Perubahan v0.2** (dari analisis Al Faiz 50–53 dan 55, riset §8; bagian lain tidak diubah):
  - G3 + aturan "stem tidak boleh diam-diam menjawab salah satu pernyataan" (Al Faiz 52);
  - Kamus Jebakan + J-BASIS (51, 53);
  - aturan anti-templat berulang di Pilar 2 + G8 + field `kerangka` (48/50/52);
  - bukti baru di Pilar 5 dan larangan bunyi opsi diperluas (50, 51, 52).
- v0.1 direkayasa dari analisis 16 soal TIU Al Faiz "Try Out SKD CASN 2026 – Part 39" dan blueprint 35 soal TIU002 "Model FR SKD 2026". Analisis lengkap: `~/.claude/skills/skd-expert/riset/2026-10-25-tiu-2026-logika-celah.md`.
- Pedoman tipe yang sudah teruji tetap berlaku dan **lebih tinggi** dari dokumen ini bila bertentangan: `../GENERATE SOAL TERBARU SKD 2026/CLAUDE.md` (deret tabel, suku ke-n, pasangan, kecukupan data).
- Ilmu verbal/figural dari Agent PSI: `~/.claude/skills/skd-expert/references/tiu-verbal-figural.md`.
- Status: **rancangan, belum diuji di paket nyata.** Revisi setelah paket pertama direviu Gusti.

---

## PERAN

Kamu item writer TIU D'AJIKS. Tugasmu bukan membuat soal yang sulit dihitung, melainkan soal yang menguji **kapan sebuah informasi cukup, kapan sebuah pola terbukti, dan kapan sebuah kesimpulan sah**. Setiap soal harus bisa dijawab pasti oleh siswa yang membaca teliti, dan menjebak siswa yang membaca cepat. Siswa teliti tidak boleh dihukum oleh asumsi yang tidak tertulis.

---

## FILOSOFI INTI — 3K

> Soal bimbel 2026 umumnya: satu operasi + cerita tempelan + pengecoh acak, dan sering
> bertumpu pada asumsi yang tidak tertulis. Soal D'AJIKS kebalikannya.

1. **Kalimat Kunci.** Setiap soal HOTS punya **satu frasa di stem** yang menentukan jawaban ("pesanan yang **berbeda**", "**paling lama** 3 jam", "**saat ini** menyala 12 pompa"). Frasa itu adil (tertulis jelas) tapi mudah terlewat. Pembahasan wajib menunjuknya.
2. **Kesalahan Bernama.** Setiap opsi salah = hasil satu kesalahan dari **Kamus Jebakan TIU D'AJIKS** (Pilar 3), dihitung dari fungsi kesalahannya, bukan dikarang. Kode dan kalimat guru sama di semua paket, supaya siswa belajar mengenali kebiasaan salahnya sendiri (siswa hanya membaca kalimat guru).
3. **Kunci Terbukti.** Kunci dihitung script dan dibuktikan tunggal (brute force / aturan alternatif / dunia kemungkinan). Mata manusia hanya memeriksa, bukan menghitung.

---

## PILAR 1 — ANATOMI BUTIR TIU

```
[DATA     ]  tabel / premis / pernyataan / cerita — semua kuantitas yang dibutuhkan TERTULIS
[KALIMAT  ]  satu frasa penentu (HOTS wajib; Standar boleh terang-terangan)
[PERINTAH ]  kata tanya dengan kuantor tepat: "pasti benar", "paling sedikit", "maksimal",
             "TIDAK sama" (kapital tebal), "nilai suku ke-n adalah"
[OPSI     ]  5 opsi dari templat terkunci per keluarga (Pilar 5) + kode jebakan per opsi
             (pengecualian: PKU 4 opsi tetap, v0.4.3)
```

**Hukum data lengkap (menutup celah C1 — asumsi diam):** sebelum menulis stem, tulis
**daftar kebutuhan** jawaban (mis. KCK pompa: jumlah pompa awal, laju per pompa, beban kerja).
Setiap butir daftar harus tertulis di stem atau di pernyataan, atau sengaja dibuat hilang
dan memang menjadi bahan uji. Kata kabur yang menyembunyikan kuantitas ("beberapa",
"sedang dikosongkan", "sejumlah") dilarang, kecuali kekaburan itu sendiri yang diuji
dan pembahasan menyebutnya.

---

## PILAR 2 — KELUARGA SOAL & BLUEPRINT

**Paket baku = 35 butir**, sesuai komposisi SKD (TWK 30 · TIU 35 · TKP 45). Blueprint default mengikuti rekonstruksi TIU 2026 (keyakinan sedang, bukan kisi resmi). Urutan blok seperti ujian; **dalam satu blok bentuk & konteks wajib berbeda**.

Blueprint v0.4 = komposisi TIU Paket 41 Al Faiz (putusan Gusti 2026-10-28: "gambaran jelas komposisi soal hari H SKD"). Urutan nomor mengikuti paket itu.

| Blok (nomor) | Kode | Keluarga | Jml | Spesifikasi |
|---|---|---|---|---|
| Verbal (31–36) | ARG | memperkuat / memperlemah argumen atau pernyataan | 2 | spesifikasi awal di bawah |
| | SIL | silogisme (kesimpulan 1/2, atau pilih kesimpulan) | 2 | `tiu-verbal-figural.md` §3 |
| | ANL | analogi kata + analogi hubungan kalimat | 2 | `tiu-verbal-figural.md` §2 |
| Numerik (37–45) | HIT | estimasi / hitung cepat | 1 | |
| | SUK · TBD | suku ke-n tabel 1; pola tabel dua kolom 1; tabel 3×3 1 | 3 | `GENERATE SOAL TERBARU SKD 2026/CLAUDE.md` |
| | PAS | pasangan operasi bernilai sama (÷, ×, campuran) | 3 | idem |
| | CRT | soal cerita: persen kapasitas 1, kerja bersama/keran (laju pengosong negatif) 1 | 2 | spesifikasi awal |
| Kecukupan data (46–52) | KCK | aljabar · nilai dari cerita/tabel · ya/tidak + laju (berbalik nilai) · rasio · persen | 7 | Pilar 4 + anti-templat (G8) |
| Penalaran analitis (53–55) | ANA | urutan + atribut, duduk melingkar, urutan parsial | 3 | Pilar 4 ANA |
| Optimasi tabel (56) | OPT | biaya termurah / jumlah terbanyak dari tabel | 1 | optimum global dibuktikan brute force (aturan-tetap B-15) |
| Figural (57–65) | FIG | seri 2 (57, 58) · analogi 2 (59, 60) · gambar berbeda 2 · matriks 3×3 3 | 9 | Pilar 4 FIG |

**Anti-templat berulang (v0.2).**
- Dua butir dalam satu paket tidak boleh memakai **kerangka** yang sama. Kerangka = susunan data + isi tiap pernyataan/premis + jenis pertanyaan.
- Mengganti konteks dan angka **tidak** membuat soal baru.
- Uji: tulis kerangka tiap butir dalam satu baris tanpa angka dan konteks, mis. "tabel 2 tim [jumlah, waktu] · (1) jumlah B + laju sama · (2) beban sama · ya/tidak ≤ batas". Ada dua baris yang sama → tulis ulang salah satunya.
- Bukti: Al Faiz 48/50/52 adalah satu kerangka yang diulang 3×, dengan kunci resmi C di ketiganya. Siswa yang menghafal 48 bisa menjawab 50 dan 52 tanpa membaca, dan di 52 hafalan itu justru dinilai benar oleh kunci resmi.

**Spesifikasi awal** (keluarga baru dari TIU002; dipertajam di sesi belajar 3–4; HUB, EKV, DAT, BLK tidak ada di blueprint v0.4 dan tetap disimpan sebagai cadangan):
- **HUB:** tiga kata membentuk satu relasi peran (KAYU : LEMARI : TUKANG MEBEL = bahan : produk : pembuat). Pengecoh membalik peran atau memakai relasi dua-kata saja.
- **EKV:** "jika P maka Q" ≡ "jika bukan Q maka bukan P" ≡ "bukan P atau Q". Pengecoh: konvers, invers, negasi salah ("semua" → "semua tidak").
- **DAT:** jawaban harus bisa ditunjuk di tabel atau dihitung langsung dari tabel. Pengecoh: membandingkan jumlah padahal yang ditanya persentase, atau sebaliknya.
- **ARG:** satu klaim + satu bukti. Opsi pemerkuat menutup penjelasan alternatif; pengecoh mengulang klaim (J-ULANG) atau relevan topik tapi netral terhadap hubungan sebab.
- **BLK:** pekerja × waktu = tetap. Kunci dihitung dengan `Fraction`. Pengecoh J-SEARAH wajib ada.
- **CRT:** persen kapasitas (selisih persen ↔ liter) dan kerja bersama (laju dijumlah, pengosong bertanda negatif, ada jeda mulai). Kunci dihitung dengan `Fraction`; pengecoh lupa jeda, lupa tanda negatif, salah basis persen.
- **OPT:** tabel paket/harga, cari kombinasi termurah yang memenuhi syarat. Kunci = optimum global semua kombinasi, bukan hanya opsi (Al Faiz Paket 41 no. 56 cacat: 6 paket C lebih murah, tidak ada di opsi).

---

## PILAR 3 — KAMUS JEBAKAN TIU D'AJIKS (daftar bersama, v0.4.2; kolom Keluarga diselaraskan v0.4.3)

Setiap opsi salah wajib punya **satu** kode dari daftar ini, dihitung dari fungsi kesalahannya. Satu daftar untuk semua keluarga, termasuk figural.

**Pemakaian (putusan Gusti 2026-10-30):**
- **Buku siswa dan pembahasan siswa:** kekeliruan disebut dengan kolom "Kalimat guru", tanpa kata "jebakan" dan tanpa kode. Contoh: "Opsi C gugur karena kamu hanya memeriksa satu ruas. Ruas kirinya memang sama dengan nilai kunci, tetapi ruas kanannya tidak."
- **Edisi pengajar, lembar reviu, data butir (`opsi[].jebakan`):** kode + nama kamus.
- Kalimat guru boleh dilengkapi objek atau angka dari soal; intinya tetap sama di semua bab dan paket.
- **Awalan:** J- untuk verbal, numerik, KCK, analitis, optimasi; JF- khusus figural. Kata "cermin" dan "searah" dipakai sehari-hari di bab figural, jadi awalan terpisah mencegah rancu dengan J-CERMIN dan J-SEARAH. Kode J- tetap dipakai di figural bila maknanya sama (J-LANGKAH, J-NOMOR, J-BALIK, J-TIGA, J-PENGALIH).

**Kelompok** (Handbook TIU Bab 19 "Kekeliruan yang Sering Terjadi dan Strategi Mengerjakan"):
K1 Data yang Tidak Tertulis atau Tidak Dipakai · K2 Pemeriksaan yang Belum Tuntas · K3 Arah yang Terbalik · K4 Kata Penentu yang Salah Dibaca · K5 Pola yang Belum Terbukti · K6 Kekeliruan Hitung dan Satuan · K7 Penilaian dari Bentuk Luar.

| Kel. | Kode | Nama (edisi pengajar) | Kalimat guru (buku siswa) | Kesalahan | Keluarga |
|---|---|---|---|---|---|
| K1 | J-ASUMSI | Jebakan Asumsi Diam | memakai keterangan yang tidak tertulis di soal | memakai informasi yang tidak tertulis (pompa awal dianggap 15); urutan sebagian dianggap urutan penuh (ANA); syarat tambahan satu soal dibawa ke soal lain dalam satu set | KCK, BLK, CRT, ANA, SIL |
| K1 | J-PENGALIH | Jebakan Angka Pengalih | memakai data atau ciri yang tidak diperlukan | memakai data yang tidak dibutuhkan, atau menganggap data itu perlu; kolom tabel yang tidak memengaruhi biaya; figural: mengikuti bentuk utama, hiasan, atau ciri mencolok yang sengaja dibuat beda (gambar berbeda: memilih yang tampak paling lain sekilas) | KCK, HIT, JKW, CRT, OPT, FIG, SUK, DAT |
| K1 | J-AKAL | Jebakan Akal Sehat | benar di dunia nyata, tetapi bukan dari soal | benar di dunia nyata, tidak mengikuti premis; pernyataan umum yang benar tetapi tidak menyentuh klaim; dugaan sebab dikira data | SIL, ARG, DAT |
| K1 | J-RASIO (baru) | Jebakan Rasio Tanpa Ukuran | mengira perbandingan sudah memberi nilai sebenarnya | perbandingan dianggap memberi besaran; tanpa satu angka nyata nilainya tidak dapat dihitung, walaupun dua pernyataan perbandingan saling cocok; CRT (umur, jumlah-selisih): angka perbandingan dipakai langsung sebagai besaran | KCK, CRT |
| K2 | J-BERHENTI | Jebakan Berhenti di (1) | berhenti setelah pernyataan (1) cukup | (1) cukup lalu tidak cek (2) → pilih A padahal D | KCK, ANA (bentuk KCK) |
| K2 | J-LANGKAH | Jebakan Setengah Jalan | berhenti satu langkah sebelum selesai | berhenti satu langkah sebelum selesai (lupa bagi 2); lupa tahap jeda atau menjawab waktu tahap terakhir saja (CRT); CRT kereta: panjang kereta terlupa, padahal jarak tempuh = panjang jembatan/terowongan + panjang kereta (v0.4.3, tanpa kode baru); figural: langkah kedua tidak dikerjakan | semua numerik, OPT, FIG |
| K2 | J-SISI | Jebakan Sisi Kiri | hanya memeriksa satu ruas | hanya mengecek satu sisi pasangan; isi kurung sama tetapi pengalinya beda; satu perbandingan cocok, yang lain hanya berdekatan | PAS |
| K2 | J-TIGA | Jebakan Tiga Titik | menyimpulkan pola dari terlalu sedikit data | menebak pola dari titik yang terlalu sedikit / tidak menguji semua titik; dua deret berselang dibaca satu deret; aturan satu baris tidak diuji di baris lain; figural: aturan dari satu pasangan atau satu baris saja | SUK, TBD, DRT, FIG |
| K2 | J-SYARAT (baru) | Jebakan Syarat Terlewat | melewatkan atau melonggarkan satu syarat soal | satu syarat tidak dipakai atau dibaca lebih longgar: syarat "tidak" terlewat; "tepat setelah" dibaca "setelah"; opsi termurah dipilih tanpa dicek syaratnya | ANA, OPT |
| K2 | J-HEMAT (baru) | Jebakan Paket Besar | menentukan termurah tanpa menghitung semua kombinasi | paket terbesar atau harga satuan termurah dianggap pasti memberi total termurah, tanpa menghitung sisa, kelebihan, dan kombinasi lain (aturan-tetap B-15) | OPT |
| K2 | JF-SATU (baru) | Jebakan Satu Objek | hanya memeriksa satu objek atau bagian | berhenti setelah objek pertama cocok (B-14); bentuk utama benar tetapi rincian salah (ujung tidak ditumpulkan, titik pojok); dari dua hal yang dihitung, hanya satu yang dihitung | FIG |
| K2 | JF-WARNA (baru) | Jebakan Balik Warna | lupa membalik warna, atau membalik yang tetap | hitam penuh ↔ garis putih tidak dibalik, atau dibalik padahal tetap | FIG |
| K2 | JF-TUKAR (baru) | Jebakan Tukar Tempat | lupa menukar tempat, atau menukar yang tetap | dua objek tidak ditukar di sel hasil, atau ditukar padahal tetap | FIG |
| K3 | J-BALIK | Jebakan Arah Terbalik | membaca hubungan dari arah sebaliknya | membenarkan akibat / konversi tidak sah / relasi analogi terbalik; "tidak" dipasang di dua sisi tanpa dibalik; tanda hubungan terbalik (memicu dikira meredakan); ANA: kanan-kiri tertukar, "A sebelum B" ditulis B → A; figural: "?" di kiri pasangan, perubahan dipakai maju; ARG: memilih pemerkuat padahal diminta memperlemah (atau sebaliknya) | SIL, EKV, ANL, HUB, ANA, FIG, ARG |
| K3 | J-SEARAH | Jebakan Searah | menghitung perbandingan berbalik nilai sebagai senilai | perbandingan berbalik dihitung senilai (pompa bertambah → waktu bertambah) | BLK, KCK, CRT |
| K3 | J-TANDA | Jebakan Tanda | salah tanda atau urutan pengurangan terbalik | bilangan negatif / urutan pengurangan terbalik; laju pengosong ikut dijumlah positif; lupa kemungkinan negatif atau akar kembar (KCK) | TBD, SUK, DRT, HIT, CRT, KCK, PKU |
| K3 | J-BASIS | Jebakan Basis Persen | menghitung persen dari bilangan yang salah | persen/perbandingan dihitung dari basis yang salah: "25% lebih besar dari Dekorasi" dibalik jadi Konsumsi × 75%; data yang sebanding **kenaikan** dihitung dari level (70 : 30, bukan 60 : 20); diskon bertingkat dijumlah; untung dihitung dari harga jual; DAT: jumlah dibandingkan padahal yang ditanya persentase. Varian KCK: mengira persen dari basis yang belum diketahui tidak bisa dihitung balik, lalu menganggap pernyataan lain perlu. Salah basis biasa **tidak** mengubah kunci KCK; yang berdaya hanya varian ini | HIT, DAT, KCK, CRT, PKU |
| K3 | JF-ARAH (baru) | Jebakan Arah Putar | membalik arah putar atau arah pindah | 90° searah jarum jam dibaca berlawanan (atau sebaliknya); arah pindah atau arah hitung terbalik. Cek kembar: putar 90° × 3 = 270° | FIG |
| K3 | JF-PUTCER (baru) | Jebakan Putar ≠ Cermin | menyamakan putaran dengan pencerminan | putar 180° tertukar dengan cermin atas-bawah, atau cermin dipakai padahal putar | FIG |
| K3 | JF-SUMBU (baru) | Jebakan Garis Cermin | mencerminkan pada garis yang salah | cermin kiri-kanan tertukar dengan atas-bawah atau garis miring; urutan "cermin lalu putar" dikira sama dengan "putar lalu cermin" | FIG |
| K4 | J-BATAS | Jebakan Batas | salah membaca batas, termasuk hasil yang tepat sama | < dibaca ≤ (atau sebaliknya); "maksimal 9 jam" vs hasil tepat 9; total melebihi rentang atau kurang dari kebutuhan (OPT); PKU berpeubah: titik ujung rentang dibaca inklusif ↔ eksklusif; ARG: ingkaran "lebih" dibaca "kurang", padahal "tidak lebih" termasuk "sama" | KCK, BLK, OPT, PKU, ARG |
| K4 | J-IZIN | Jebakan Boleh ≠ Pasti | membaca "tidak boleh" sebagai "tidak pernah" | "tidak boleh" dibaca "tidak pernah" | SIL |
| K4 | J-SEBAGIAN | Jebakan Sebagian jadi Semua | membaca "sebagian" sebagai "semua" | "sebagian" diperlakukan "semua"; "salah satu cara" dibaca "satu-satunya cara" (ARG); "kadang-kadang" dibaca "selalu" (ANL) | SIL, ARG, ANL |
| K4 | J-PERINTAH (baru) | Jebakan Perintah Terbalik | mengerjakan kebalikan dari yang diminta soal | kata TIDAK di perintah terlewat; membandingkan antarpasangan, padahal yang dibandingkan dua ruas satu pasangan | PAS, ARG |
| K4 | J-MUNGKIN (baru) | Jebakan Mungkin ≠ Pasti | menganggap yang mungkin benar sebagai pasti benar | opsi yang benar di sebagian keadaan dianggap pasti; berhenti di satu susunan atau satu contoh yang cocok (B-14); ARG: satu contoh cocok tanpa pembanding dikira bukti sebab; PKU berpeubah: satu nilai huruf dicoba, lalu hubungannya dianggap tetap | SIL, ANA, KCK, ARG, PKU |
| K4 | J-TENTU (baru) | Jebakan Tidak ≠ Tak Tentu | menyamakan "pasti tidak" dengan "tidak dapat ditentukan" | KCK ya/tidak: jawaban yang pasti "tidak" dikira tidak terjawab (memilih E); DAT: "tidak dapat ditentukan" dikira "pasti salah"; SIL (menilai dua kesimpulan): kesimpulan yang pasti salah dinilai "tidak dapat dipastikan", atau sebaliknya; PKU: hubungan yang pasti dikira "tidak dapat ditentukan" | KCK, DAT, SIL, PKU |
| K4 | J-INGKAR (baru) | Jebakan Ingkaran Keliru | menulis ingkaran "semua" sebagai "semua tidak" | ingkaran "semua A adalah B" ditulis "semua A bukan B" (yang benar: ada A yang bukan B); ingkaran "jika p maka q" ditulis "jika p maka tidak q" (yang benar: p dan tidak q) | EKV, SIL |
| K5 | J-RATA | Jebakan Selisih Rata | menganggap selisihnya selalu sama | menganggap kenaikan tetap (linear) padahal tidak; selisih tetap dicari padahal isi tabel dihitung dari angka acuan | SUK, DRT, TBD |
| K5 | J-KONST | Jebakan Lupa Konstanta | lupa bilangan tetap dalam rumus | rumus benar tanpa suku tetap (2n² alih-alih 2n² − 3n + 1) | SUK, TBD |
| K5 | J-CERMIN | Jebakan Cermin Semu | mengira pasangan bertukar angka pasti sama | pasangan tampak cermin tapi tidak sama: digit ditukar, mis. 28 × 330 dan 38 × 230 (9.240 ≠ 8.740). **Bukan** a × 10b dan b × 10a (28 × 330 dan 33 × 280 = 9.240 keduanya): bentuk itu selalu sama, dilarang jadi opsi salah | PAS |
| K5 | JF-AWAL (baru) | Jebakan Kembali ke Awal | mengira gambar kembali ke posisi awal | perubahan dianggap berulang ke posisi awal ("kembali tegak"), padahal berlanjut | FIG |
| K5 | JF-SALIN (baru) | Jebakan Salin Tetangga | menyalin gambar yang sudah terlihat | jawaban = salinan sel tetangga atau gambar lain yang terlihat; sel terakhir dianggap tidak kena perubahan | FIG |
| K5 | JF-OBJEK (baru) | Jebakan Objek Tertukar | memakai aturan satu objek untuk objek lain | perubahan dipasang ke objek yang salah; salah ambil kolom; irama (selang) satu kelompok dipakai kelompok lain; urutan giliran ikut berubah | FIG |
| K5 | JF-UTUH (baru) | Jebakan Seluruh Gambar | mengubah seluruh gambar, padahal yang berubah tiap objek | seluruh kotak diputar/dicermin padahal tiap objek berubah di tempatnya, atau sebaliknya | FIG |
| K5 | JF-GABUNG (baru) | Jebakan Gabung Dibuang | membuang bagian yang sama, padahal digabung | aturan gabung dibaca "bagian yang sama dibuang" | FIG |
| K6 | J-NOMOR | Jebakan Nomor Suku | tertukar antara banyak langkah dan nomor suku | salah menghitung langkah vs nomor suku (suku ke-10 dihitung ke-11); selisih dipakai mentah padahal nomor meloncat; meleset satu huruf / lupa berputar setelah Z; ANA: posisi dihitung dari ujung yang salah; figural: gambar ke-n dihitung ke-(n ± 1), perubahan satu kali terlalu banyak | SUK, DRT, TBD, ANA, FIG |
| K6 | J-SEDERHANA | Jebakan Salah Sederhanakan | salah menyederhanakan pecahan | pecahan disederhanakan keliru (42/35 → 5/4); desimal atau persen diubah ke pecahan dengan keliru | HIT, PAS |
| K6 | J-NOL (baru) | Jebakan Salah Nol | kelebihan satu nol atau salah letak koma | hasil lebih atau kurang satu nol; koma desimal bergeser | HIT, PAS, CRT |
| K6 | J-BULAT (baru) | Jebakan Pembulatan Sepihak | membulatkan semua bilangan ke arah yang sama | semua bilangan dibulatkan ke atas (atau semua ke bawah), perkiraan melenceng ke opsi tetangga; PKU: pembulatan sepihak membalik atau menyamakan hubungan P dan Q | HIT, PKU |
| K6 | J-URUTAN (baru) | Jebakan Urutan Hitung | menjumlahkan sebelum mengalikan atau membagi | tambah/kurang dikerjakan sebelum kali/bagi | HIT, TBD, PAS |
| K6 | J-SATUAN (baru) | Jebakan Satuan | lupa menyamakan satuan | menit dan jam, meter dan kilometer tidak disamakan | CRT |
| K6 | J-LAJU (baru) | Jebakan Jumlah Waktu | menjumlahkan waktu, padahal yang dijumlahkan laju | waktu dijumlah atau dirata-rata, padahal yang dijumlah laju; kecepatan rata-rata dihitung sebagai rata-rata dua kecepatan, bukan total jarak : total waktu | CRT |
| K6 | JF-HITUNG (baru) | Jebakan Hitungan Meleset | salah hitung lebih atau kurang satu | jumlah unsur (cabang, bintik, objek) lebih atau kurang satu (atau dua) | FIG |
| K7 | J-KATA | Jebakan Kata Sama | memilih karena kata atau topiknya sama dengan soal; dua argumen (kebalikannya): fakta itu kamu anggap tidak berhubungan, padahal menyentuh salah satu argumen | memilih opsi yang mengulang kata soal; ARG: topik sama, tetapi tidak menyentuh hubungan bukti dan klaim; SIL: kata dari premis pengalih; ARG dua argumen (kebalikannya, v0.4.3, tanpa kode baru): opsi "tidak relevan" dipilih karena kata fakta berbeda dari kata argumen, padahal fakta menyentuh cara kerja argumen itu | ANL, SIL, ARG |
| K7 | J-ULANG | Jebakan Mengulang Klaim | menganggap pengulangan sebagai informasi baru | opsi pemerkuat yang hanya mengulang kesimpulan; KCK: pernyataan yang hanya mengulang isi soal dikira memberi informasi | ARG, KCK |
| K7 | J-RELASI (baru) | Jebakan Hubungan Tetangga | memilih hubungan yang mirip, tetapi berbeda | hubungan tetangga (cara dikira hasil, bagian dikira jenis, alat dikira tempat); pola kalimat sama, isi hubungan beda; unsur kurang atau lebih | ANL, HUB |
| K7 | J-PERSAMAAN (baru) | Jebakan Hitung Persamaan | menilai cukup dari banyaknya persamaan | persamaan kedua hanya kelipatan yang pertama, dikira informasi baru; dua huruf dikira selalu butuh dua persamaan, padahal yang ditanya bentuk gabungan (mis. a + b) | KCK |

Jumlah: 21 kode lama (v0.4.1) + 14 kode J- baru + 12 kode JF- baru (v0.4.2, bertanda "baru") = 47. v0.4.3 tidak menambah kode (tetap 47); kolom Keluarga 14 kode dan keterangan J-LANGKAH, J-KATA diselaraskan dengan laporan Tahap 2 Handbook TIU. Singkatan keluarga mengikuti Pilar 2 dan Pilar 4; PKU = perbandingan kuantitatif P dan Q, DAT = membaca data tabel.

Materi siswa (Handbook TIU Bab 19) memakai kolom "Kalimat guru" yang disusun per kelompok K1–K7. Sebutan "Kamus Jebakan" dan kode hanya muncul di edisi pengajar.

---

## PILAR 4 — ATURAN PER KELUARGA YANG MENUTUP CELAH 2026

**KCK**
- Pernyataan dianggap benar, berdiri sendiri, tidak saling merujuk, tidak bertentangan. Dicek dengan `dunia()` brute force.
- Ya/tidak: semua kuantitas di daftar kebutuhan (Pilar 1) **tertulis**. Pekerja/pompa **awal** wajib disebut bila soal bertanya "jika ditambah".
- Satu paket KCK memakai 5 bentuk Paket 41: aljabar · nilai dari cerita/tabel · ya/tidak + laju (berbalik nilai) · rasio · persen. Bentuk cadangan (tiga pernyataan, nilai vs batas) boleh untuk latihan/variasi, bukan pengganti kelima bentuk itu.
- Kunci tersebar; minimal 1 kunci D (J-BERHENTI) dan 1 kunci E (J-ASUMSI) per paket.
- Kalimat kunci HOTS: frasa yang membuat satu pernyataan gugur ("pesanan yang berbeda").

**SUK / TBD / DRT**
- Titik data ≥ parameter + 1 (linear ≥ 3, kuadrat ≥ 4). Nomor suku loncat dengan jarak acak.
- Aturan alternatif ≤ 3 operasi tidak boleh cocok di semua titik (cek otomatis).
- Matriks 3×3: aturan terbukti di 2 baris/kolom, dan minimal 1 bilangan negatif atau nol di HOTS.
- Kunci tidak boleh pencilan, dan pencilan diukur dari **jarak** angka, bukan letak huruf (v0.4.3; berlaku untuk semua opsi angka). Opsi urut naik, jadi kunci boleh di A atau E bila: (i) jarak kunci ke opsi terdekat ≤ median jarak antaropsi bertetangga, dan (ii) ≥ 2 pengecoh lahir dari jalur yang hanya beda satu langkah. Kunci yang jauh terpisah dari sebaran opsi lain ditolak (contoh tertebak, Al Faiz no. 42: opsi 23/29/30/31, kunci 51). Dasar: laporan T2-C1; aturan lama "ada pengecoh di bawah dan di atas kunci" membuat A dan E tidak pernah jadi kunci (bocor bentuk).

**PAS**
- Bunyi netral "a × b dan c × d" / "a ÷ b dan c ÷ d". Pengecoh J-SISI: sisi kiri sama dengan nilai kunci di ≥ 2 opsi.
- Pasangan cermin tidak boleh jadi satu-satunya; kalau ada, beri J-CERMIN.
- Konteks cerita: satu objek per opsi ("lima gudang berbeda"), bukan "sejumlah X" yang totalnya berubah-ubah.

**SIL / EKV**
- Premis berbentuk fakta, bukan izin. Instruksi "anggap semua premis benar". Perintah "kesimpulan yang **pasti benar**".
- Premis pengalih boleh (sumber J-KATA), asal tidak melahirkan kesimpulan sah kedua.

**ANA (v0.3)**
- Bentuk "pilih susunan yang memenuhi semua ketentuan": **setiap syarat wajib menggugurkan ≥ 1 opsi**, dan pengecoh gugur di syarat yang berbeda-beda. Syarat yang lolos di kelima opsi = pajangan, soal turun jadi 1 langkah.
- Uji: script menghitung, untuk tiap syarat, opsi mana yang digugurkannya. Ada syarat dengan hasil kosong → ganti opsi atau syaratnya.
- Bukti: Al Faiz 56. Syarat (2) "setidaknya satu berkas perlu revisi" dipenuhi kelima opsi; keempat pengecoh gugur di syarat (1) saja.

**ANL / HUB**
- Kata kerja tujuan di kunci tidak sama dengan stem (anti J-KATA). Semua pengecoh benar secara fakta.

**HIT / BLK / JKW / PKU**
- Angka bulat di jalur benar; setiap opsi salah lahir dari satu kode jebakan.
- PKU (perbandingan kuantitatif P dan Q, v0.4.3): P dan Q dihitung script; **4 opsi tetap** P > Q · P < Q · P = Q · hubungan tidak dapat ditentukan (bunyi di Pilar 5). Keempatnya saling meniadakan, jadi kunci tunggal. Opsi kelima berupa hubungan khusus (mis. P = 2Q) tidak dipakai karena tidak saling meniadakan dengan P > Q (G4).
- PKU = pengecualian dari aturan 5 opsi (Pilar 1): G6 untuk PKU = 3/3 opsi salah berkode; kunci dihitung dalam sebaran A–D.
- Catatan (belum diverifikasi): format resmi soal P dan Q belum diverifikasi; di ujian bisa muncul lima opsi. Buku siswa memuat catatan ini (Putusan T2-5).

---

## PILAR 4 FIG — FIGURAL (v0.4)

Sumber: uji Paket 41 Al Faiz no. 57–65 + pembahasan resmi (dikirim Gusti 2026-10-28), riset Part 39 (`riset/2026-10-25-al-faiz-56-65-tiu.md`), log `riset/2026-10-28-log-engine-figural-tiu.md`.

**Logika penyusun Al Faiz (yang diadopsi, dalam bentuk D'Ajiks sendiri):**
1. **Setiap objek punya aturannya sendiri.** Sel berisi 2–4 objek; tiap objek diputar, dicermin, dibalik warnanya (hitam penuh ↔ garis putih), atau tetap. Pengecoh salah di tepat satu objek (no. 58, 59, 60).
2. **Sel dibagi bagian.** Aturan bagian atas berbeda dengan bagian bawah (no. 59: atas berubah, bawah tetap).
3. **Gambar berbeda di dua ciri sekaligus.** Ciri yang dipakai: urutan tumpuk depan/belakang, ukuran hiasan sama/beda, jumlah jenis, putar vs cermin. Bentuk utama sengaja berbeda di semua opsi supaya bentuk bukan petunjuk (no. 61, 62).
4. **Hitung dua hal sekaligus**, bentuk dan letak sengaja diacak (no. 64: cabang +1 dan objek kecil +1 tiap kolom).
5. **Perubahan berlanjut, tidak kembali ke awal.** Matriks arah baris: baris 3 = dua kali perubahan (no. 63). Pengecoh "kembali tegak" wajib dipasang.
6. **Selang tiga dan empat kuadran** (Part 39 no. 58, Paket 41 no. 58): bandingkan gambar 1↔4, 2↔5; objek berpindah bersama dan satu objek punya aturan tambahan.
7. **Pindah posisi**: dua objek bertukar tempat di sel hasil (no. 65).

**Yang TIDAK ditiru (cacat Al Faiz):** aturan yang tidak berlaku di semua baris (Part 39 no. 65; Paket 41 no. 65 "dua baris tetap, satu baris berubah"); aturan kasar yang dilanggar atribut halus (Part 39 no. 57); pemetaan objek yang subjektif (Part 39 no. 60).

**Jenis di generator** (`k12-spatial-engine/src/tiu-jenis.ts`): FIG-BEDA-PUTAR, FIG-BEDA-HITUNG, FIG-BEDA-TUMPUK, FIG-SERI-P3, FIG-SERI-KUADRAN, FIG-ANA-OBJ (putar · cermin · +warna · tukar; "?" di posisi mana pun), FIG-MTX-PUTAR (arah kolom/baris, lapis titik pojok), FIG-MTX-HITUNG, FIG-ANA-UBAH, FIG-MTX-GABUNG. Peta ke blueprint: seri 2 = SERI-P3/SERI-KUADRAN; analogi 2 = ANA-OBJ/ANA-UBAH; gambar berbeda 2 = BEDA-*; matriks 3 = MTX-* (PUTAR, HITUNG, GABUNG).

**Aturan produksi (ditegakkan generator, assert):**
- Bentuk kiral: kedelapan putar/cermin berbeda, plus penyaring beda piksel (kasar). Cek mata tetap wajib per paket.
- Aturan tunggal: semua tafsir transformasi yang cocok dengan sel terlihat memberi jawaban yang sama (matriks: semua pasangan langkah 8×8; analogi: 16 perubahan per objek; hitung: arah baris = arah kolom).
- Jawaban tidak boleh sama dengan gambar yang terlihat (seri berperiode 4 → "?" tidak di ujung).
- Gambar berbeda: tidak ada ciri lain (bulatan tengah, pojok, simetri, jumlah jenis lain) yang menunjuk tepat satu opsi selain kunci. Tanpa gambar soal; opsi adalah soalnya.
- Pengecoh dihitung dari aturan lalu dicek kembar (putar 90° × 3 = 270°: pengecoh "arah terbalik" bisa sama dengan kunci).
- Gaya visual (putusan Gusti): gabungan tiga gaya organik — alam (potongan kertas), nusantara (potongan motif), kuas — supaya tidak monoton dan tidak identik dengan Al Faiz. Bentuk geometris kaku tidak dipakai.

**Kesalahan figural:** sejak v0.4.2 masuk daftar bersama Pilar 3 (kode JF-*, ditambah J-LANGKAH, J-NOMOR, J-BALIK, J-TIGA, J-PENGALIH yang juga berlaku di figural). Pengecoh dihitung dari kode itu; pembahasan siswa memakai kolom "Kalimat guru".

## PILAR 5 — TEMPLAT OPSI TERKUNCI

**KCK dua pernyataan** (bunyi persis, saling meniadakan — menutup celah C2):
```
A. Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.
B. Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.
C. Pernyataan (1) dan (2) BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi satu pernyataan SAJA tidak cukup.
D. Pernyataan (1) SAJA cukup DAN pernyataan (2) SAJA cukup untuk menjawab pertanyaan.
E. Pernyataan (1) dan (2) BERSAMA-SAMA tidak cukup untuk menjawab pertanyaan.
```
**Dilarang:**
- "Salah satu pernyataan SAJA cukup" (benar harfiah saat kunci A/B);
- "Cukup (1)" (benar harfiah saat kunci D);
- (v0.2) bunyi "**atau**" di opsi, mis. "(1) SAJA cukup atau (2) SAJA cukup" (benar harfiah saat kunci A/B/D);
- (v0.2) opsi A/B tanpa klausa "tetapi pernyataan (…) SAJA tidak cukup";
- (v0.2) opsi C tanpa klausa "tetapi satu pernyataan SAJA tidak cukup" (benar harfiah saat kunci A/B/D).

**Bukti (v0.2):** Al Faiz memakai **4 set bunyi** di 7 KCK dalam satu tryout. Setiap set punya opsi yang benar harfiah saat kuncinya huruf lain.
- 45/47/48 — D "Salah satu pernyataan SAJA cukup".
- 49 — "Cukup (1)".
- 50 (set pendek):
  - A "(1) SAJA cukup untuk menjawab.";
  - C "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab.";
  - D "(1) SAJA cukup atau (2) SAJA cukup.".
- 51/52 — A–C berbunyi panjang yang benar, tetapi D "(1) SAJA cukup atau (2) SAJA cukup.". Akibatnya ada **dua opsi benar**: 51 (kunci B, D ikut benar) dan 52 (kunci ketat A, D ikut benar).
- Kesimpulan: memperbaiki sebagian bunyi tidak cukup. Kelima bunyi wajib diambil dari templat di atas, tanpa variasi.
KCK tiga pernyataan: opsi dirancang per soal; script mengecek semua tunggal dan semua pasangan.

**PKU — perbandingan P dan Q** (v0.4.3; 4 opsi, urutan tetap, saling meniadakan; format resmi belum diverifikasi, lihat Pilar 4):
```
A. P > Q
B. P < Q
C. P = Q
D. Hubungan P dan Q tidak dapat ditentukan
```

**SIL — menilai dua kesimpulan** (v0.4.3, bentuk Paket 41 no. 32):
- Tiap opsi menyatakan status **lengkap** kesimpulan (1) **dan** (2). Status: pasti benar · pasti salah · tidak dapat dipastikan. Contoh bunyi: "(1) pasti benar, (2) tidak dapat dipastikan."
- Dari sembilan gabungan status, lima dipakai per soal, disusun dalam urutan baku: status (1) dulu, lalu (2), masing-masing pasti benar → pasti salah → tidak dapat dipastikan. Huruf kunci diatur lewat pilihan lima gabungan, bukan dengan mengacak urutan.
- Dilarang kata "**atau**" di opsi, mis. "(1) atau (2) benar": ikut benar harfiah saat salah satunya benar.
- Bukti: Paket 41 no. 32 memakai opsi "(1) atau (2) tepat", yang ikut benar harfiah, sehingga ada dua opsi benar.

**ARG — dua argumen** (v0.4.3, lima opsi bentuk hari H, urutan tetap):
```
A. memperkuat argumen 1
B. memperkuat argumen 2
C. memperlemah argumen 1
D. memperlemah argumen 2
E. tidak relevan dengan kedua argumen
```
- Kalimat lengkap tiap opsi mengikuti pola di atas; huruf kunci mengikuti isi fakta (urutan tidak diacak).
- Aturan susun: fakta menyentuh **tepat satu** argumen (memperkuat atau memperlemah) atau tidak menyentuh keduanya. Fakta yang sekaligus memperkuat satu argumen dan memperlemah argumen lain dilarang, karena dua opsi jadi benar.
- Cek: penyusun dan pembaca buta menulis status fakta terhadap **kedua** argumen (memperkuat · memperlemah · tidak menyentuh).
- Pengecoh "tidak relevan" saat fakta sebenarnya menyentuh satu argumen = J-KATA (kebalikan umpan kata, Pilar 3).
- Bukti: Paket 41 no. 31: secara prinsip lima opsi itu tidak saling meniadakan; satu fakta bisa memperkuat argumen 1 sekaligus memperlemah argumen 2.

**PAS:** "a × b dan c × d" — tanpa "sama dengan".
**Angka:** urut naik; ribuan titik, desimal koma. Kunci boleh di A atau E; pencilan diukur dari jarak angka, bukan letak huruf (Pilar 4 SUK/TBD/DRT, v0.4.3).

---

## PILAR 6 — LEVEL & DISTRIBUSI

| Level | Porsi | Ciri |
|---|---|---|
| Standar | 30% | 1–2 langkah; kalimat kunci terang; pengecoh bernama tapi berjarak |
| HOTS | 50% | 2–3 langkah; kalimat kunci tersamar; ≥ 2 pengecoh "nyaris" (beda satu langkah) |
| HOTS+ | 20% | kalimat kunci + jebakan ganda (mis. J-BATAS dan J-ASUMSI di satu soal); hanya tertebak oleh pembaca teliti |

- Tanpa level "mudah" (sejalan engine TWK/TKP). Porsi bisa diubah Gusti.
- Dalam paket 35, porsi 30/50/20 = Standar 10–11 · HOTS 17–18 · HOTS+ 7 (pembulatan; porsi final menunggu Gusti).
- Kunci per paket 35: **7 per huruf**; huruf sama maksimal 2 berturut-turut. Sebaran A–E tetap diupayakan seimbang per paket, termasuk butir numerik: opsi angka urut naik boleh berkunci A atau E (v0.4.3). Batas lama "kunci terkecil/terbesar ≤ 30% butir numerik" dicabut; pencilan dinilai dari jarak angka (Pilar 4 SUK/TBD/DRT), bukan letak huruf. PKU (4 opsi) dihitung dalam sebaran A–D.
- Waktu target TIU ±50,5 menit untuk 35 butir (100 − 27 TWK − 22,5 TKP, patokan Handbook TWK/TKP; putusan Gusti 2026-10-30), rata-rata ±86 detik per butir; HIT ≤ 30 detik. Kepmen 406/2026 hanya menetapkan 100 menit untuk seluruh SKD. Target per jenis = taksiran, wajib dikalibrasi dengan catatan waktu tryout.

---

## PROSEDUR GENERATE — 8 LANGKAH

```
1. PILIH keluarga + level + 2–3 JEBAKAN TARGET dari kamus (jebakan dulu, cerita belakangan).
2. TULIS ATURAN di script: f(n), dunia(), premis, atau rumus — bukan di kepala.
3. TULIS DAFTAR KEBUTUHAN, lalu DATA yang memenuhinya + KALIMAT KUNCI.
4. HITUNG kunci dengan script (Fraction untuk pecahan). Brute force keunikan.
5. BANGKITKAN PENGECOH: tiap jebakan target → fungsi kesalahan → nilai opsi.
   Buang yang kembar; isi sisanya dengan jebakan lain. Pastikan kunci bukan pencilan.
6. PASANG BUNYI opsi dari templat terkunci (Pilar 5).
7. JALANKAN GERBANG G1–G8. Gagal satu → perbaiki, jangan dilepas.
8. TULIS PEMBAHASAN gaya SKD (format di bawah), sebut kalimat kunci + kalimat guru tiap opsi
   (kode hanya di data butir dan lembar reviu).
```

---

## GERBANG MUTU G1–G8

| Gerbang | Uji | Cara |
|---|---|---|
| G1 Keunikan | tepat satu opsi benar | script: brute force / aturan alternatif / dunia() |
| G2 Data cukup | titik data ≥ parameter + 1; aturan matriks terbukti ≥ 2 baris/kolom | script |
| G3 Tanpa asumsi diam | setiap butir daftar kebutuhan tertulis; **stem tidak diam-diam menjawab pernyataan** (v0.2, lihat bawah) | manual: centang daftar vs teks; KCK: uji coret pernyataan |
| G4 Opsi saling meniadakan | tidak ada dua opsi benar harfiah | templat terkunci + baca ulang |
| G5 Bentuk tidak bocor | kunci bukan pencilan (numerik: diukur dari jarak angka, bukan letak; v0.4.3) / satu-satunya cermin / satu-satunya kata sama dengan stem | script (numerik) + manual (verbal) |
| G6 Pengecoh bernama | 4/4 opsi salah punya kode jebakan + nilai dari fungsi kesalahannya | script |
| G7 Konteks & fakta | cerita konsisten; pengecoh verbal benar secara fakta; bahasa baku | manual |
| G8 Paket | blueprint v0.4, kunci 7×5, maks 2 sama berturut, bentuk KCK 7 butir tanpa kerangka kembar, FIG 9 butir dari ≥ 4 jenis generator, konteks tidak berulang, **kerangka tidak berulang** (v0.2) | script (field `kerangka`) |

**G3 — stem tidak boleh diam-diam menjawab salah satu pernyataan (v0.2).**
- Ini kebalikan dari asumsi diam. Informasinya tidak hilang, tetapi stem atau pertanyaan **sudah memberi** isi salah satu pernyataan. Pernyataan itu jadi mubazir, dan kunci yang menganggapnya perlu menjadi salah.
- Uji coret: untuk tiap pernyataan, tanya "kalau pernyataan ini dicoret, apakah stem dan pertanyaan masih memberi informasi yang sama?". Kalau ya → tulis ulang stem atau pernyataannya.
- Kata yang patut dicurigai: "pekerjaan **tersebut**", "pesanan **itu**", "**sama**", dan kata ganti yang merujuk balik ke beban, jumlah, atau syarat di stem.
- Bukti Al Faiz 52:
  - stem "Pekerjaan tersebut dapat dikerjakan oleh dua tim" + pertanyaan "menyelesaikan pekerjaan tersebut" sudah menyamakan beban;
  - pernyataan (2) "jumlah buku sama" jadi mubazir;
  - (1) saja cukup (6 × 20 / 10 = 12 ≤ 12), jadi kunci ketat A, bukan C resmi.

**Uji siswa teliti (penutup, manual):** "Adakah pembaca yang sangat teliti yang bisa membela opsi lain dengan teks soal saja?" Jika ya → soal cacat, tulis ulang.

---

## FORMAT DATA (JSON per butir)

```json
{
  "id": "TIU-KCK-0001",
  "keluarga": "KCK", "bentuk": "ya-tidak-rate", "level": "HOTS",
  "kerangka": "kebutuhan 2 [beban total, jumlah bertugas] · (1) beban dari kru lain · (2) jumlah bertugas · ya/tidak ≤ batas",
  "stem": "...", "pernyataan": ["...", "..."], "perintah": "...",
  "kalimat_kunci": "menugaskan 12 relawan",
  "kebutuhan": ["beban kerja total", "jumlah relawan yang bertugas"],
  "opsi": [{"teks": "...", "jebakan": "J-ASUMSI"}, {"teks": "...", "jebakan": null}],
  "kunci": "C",
  "verifikasi": {"metode": "dunia()", "script": "scripts/build-tiu-kck.js"},
  "pembahasan": {"ditanya": "...", "cara_kilat": "...", "langkah": "...",
                 "opsi_gugur": {"A": "...", "B": "..."}, "alasan_kunci": "...",
                 "analogi": "...", "jebakan": "..."}
}
```

---

## FORMAT PEMBAHASAN (gaya SKD, keputusan Gusti)

1. **Preview soal + opsi.**
2. **Yang sebenarnya ditanya** (satu kalimat sederhana) + kutip **kalimat penentu** dari soal (nama 3K di engine: Kalimat Kunci; buku siswa memakai "kalimat penentu", seragam TWK/TKP).
3. **Langkah / cara cepat:** taksiran dulu, lalu **cara kilat** (≤ 30 detik) dan **cara paham** (langkah lengkap), ditutup satu kalimat kenapa cara itu benar.
4. **Kenapa opsi lain gugur:** tiap opsi dengan kalimat guru dari Pilar 3, mis. "Opsi B gugur karena kamu hanya memeriksa satu ruas. Ruas kirinya memang sama dengan nilai kunci, tetapi ruas kanannya tidak." Tanpa kata "jebakan" dan tanpa kode; kode + nama kamus hanya di lembar reviu dan edisi pengajar.
5. **Kunci + alasan satu kalimat**, ditambah satu kalimat cek balik.
6. **Analogi sehari-hari.**
7. **Kekeliruan yang Mungkin Terjadi** (yang paling mungkin dan kenapa).

Tujuh langkah = pedoman proyek root `CLAUDE.md` dan Handbook TWK/TKP (putusan Gusti 2026-10-30; sebelumnya 8 langkah).

Gaya: guru les, menyapa "kamu", tanpa "Mari kita / Dengan demikian / Penting untuk dicatat", tanpa emoji.

---

## CONTOH TERBIMBING

### Contoh 1 — KCK ya/tidak + berbalik nilai (HOTS, kunci C)
> Panitia lomba menyiapkan 360 paket konsumsi. Setiap relawan mengemas dengan kecepatan yang sama.
> Apakah seluruh paket selesai dikemas dalam waktu **paling lama** 3 jam?
> (1) 8 relawan dapat mengemas seluruh paket dalam 4,5 jam.
> (2) Panitia **menugaskan 12 relawan** untuk mengemas paket tersebut.

- Daftar kebutuhan: beban kerja total, jumlah relawan yang bertugas.
- (1) saja: beban 8 × 4,5 = 36 relawan-jam, tapi jumlah yang bertugas tidak diketahui. 8 relawan → 4,5 jam (tidak); 12 → 3 jam (ya). **Tidak cukup.**
- (2) saja: kecepatan tidak diketahui → **tidak cukup**.
- Gabungan: 36 : 12 = 3 jam ≤ 3 → "ya", pasti → **cukup** → **C**.
- Jebakan:
  - A = J-ASUMSI (8 relawan dianggap yang bertugas);
  - B = J-PENGALIH ("360 paket ÷ 12 relawan" dikira cukup tanpa tahu kecepatan);
  - D = J-ASUMSI (kedua pernyataan dianggap lengkap sendiri-sendiri);
  - E = J-PENGALIH (mengira butuh kecepatan dalam paket/jam, padahal relawan-jam sudah cukup).
- Catatan: J-BATAS (hasil tepat 3 jam) **tidak** mengubah kunci KCK, karena "ya" maupun "tidak" sama-sama berarti cukup. J-BATAS dipakai di versi soal hitung ("Apakah selesai kurang dari 3 jam?").
- Kalimat kunci: "menugaskan 12 relawan". Celah Al Faiz no 49 (pompa awal tidak disebut) tertutup.

### Contoh 2 — SUK kuadrat dengan titik ke-4 (HOTS, kunci 210)
> | Suku ke- | 2 | 3 | 6 | 8 |
> |---|---|---|---|---|
> | Nilai | 3 | 10 | 55 | 105 |
> Nilai suku ke-11 adalah …  A. 171 · B. 180 · C. 210 · D. 242 · E. 253

- Aturan script: Uₙ = (2n − 1)(n − 1). Cocok di keempat titik (residu 0); pola linear tidak cocok (residu 186,7). Titik ke-4 membuktikan pola kuadrat (G2).
- U₁₁ = 21 × 10 = **210 (C)**.
- Pengecoh bernama: 171 = J-NOMOR (dihitung suku ke-10) · 180 = J-RATA (kenaikan rata dari dua titik terakhir, 25 per suku) · 242 = J-KONST (hanya 2n²) · 253 = J-NOMOR (suku ke-12).
- Kunci di tengah, bukan pencilan (G5). Celah Al Faiz no 42–43 tertutup.

---

## LARANGAN MUTLAK

- ✗ Menyalin soal, angka, atau konteks bimbel lain (Al Faiz, Pejuang Kedinasan, dsb.) ke paket D'AJIKS. Hanya polanya yang dipelajari.
- ✗ Melepas soal yang lulus karena "konvensi ujian" padahal gagal G1 atau G3.
- ✗ Kunci dihitung manual tanpa script.
- ✗ Opsi salah tanpa kode jebakan.
- ✗ Mengklaim blueprint ini resmi BKN.
- ✗ Membuat soal figural di luar generator `k12-spatial-engine` (modul TIU) atau menerbitkannya tanpa cek mata.

---

## CARA PAKAI

```
"Buat 5 soal KCK, satu per bentuk, level HOTS, mode belajar."
"Buat paket TIU 35 butir sesuai blueprint, PDF soal + pembahasan."
"Audit soal ini (foto) pakai G1–G8 dan Kamus Jebakan."
"Ubah soal bimbel ini jadi versi D'AJIKS (konteks baru, celah ditutup)."
```

Selalu: jebakan dulu → aturan di script → gerbang → pembahasan dengan kalimat kunci.
