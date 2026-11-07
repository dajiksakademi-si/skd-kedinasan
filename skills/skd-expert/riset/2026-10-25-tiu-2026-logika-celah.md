# Riset — Logika konstruksi TIU 2026, celah kritis, dan arah gaya D'Ajiks · 2026-10-25

Bahan:
- Al Faiz "TRY OUT SKD CASN 2026 – PART 39": soal 31–33, 36, 38–45, 47–49 (16 soal + pembahasan). Sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/*.png`
- TIU002 "Model FR SKD 2026" (35 soal, label tipe + kunci). Sumber: `REFERENSI LUAR/TIU002 - Kunci  Pembahasan.pdf`
- Analisis 31–42: `riset/2026-10-25-al-faiz-tiu.md`. Engine hasil riset ini: `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md`

Keyakinan: **sedang**. Dua bimbel independen, bukan dokumen resmi BKN. Tapi polanya konvergen dan cocok dengan laporan soal asli 2026 yang pernah dibawa Gusti (suku ke-50, suku ke-42, pasangan perkalian). Sumber: `GENERATE SOAL TERBARU SKD 2026/memory.md`

## 1. Blueprint TIU 2026 (rekonstruksi)
Nomor TIU Al Faiz 31–65 = 35 soal. Ini konsisten dengan susunan TWK 1–30 · TIU 31–65 · TKP 66–110.

| Blok | TIU002 (35) | Al Faiz (yang terlihat) |
|---|---|---|
| Verbal–logika | analogi 2, hubungan objek 2, silogisme 3 + silogisme paragraf 1, ekuivalensi 1, penalaran analitis 3, penalaran dari data 2, memperkuat/memperlemah argumen 1 (**15**) | silogisme 31–33, analogi kalimat 36 |
| Kecukupan data | **5** (16–20, termasuk 1 tiga pernyataan) | **4 terlihat** (45, 47, 48, 49); 46 tidak terlihat, kemungkinan KCK (blok 45–49) |
| Pola bilangan | tabel suku ke-n 3, tabel deret 3, deret 1, deret alfanumerik 1 (**8**) | suku ke-n 42–43, matriks 3×3 44 |
| Hitung terapan | pasangan operasi 2, perbandingan berbalik nilai 2, hitung cepat 1, JKW 1, perbandingan kuantitatif 1 (**7**) | hitung 38, pasangan 39–41, berbalik nilai di dalam KCK 48–49 |
| Figural | **0** | 0 di 31–49 (50–65 tidak terlihat) |

**Hipotesis:** TIU 2026 bergeser dari "menghitung" ke **"menilai informasi"**.
- Kecukupan data, suku ke-n dengan nomor loncat, pasangan bernilai sama, dan penalaran dari data menguji *kapan sebuah informasi cukup / pola terbukti*, bukan kecepatan hitung.
- Figural kemungkinan berkurang drastis atau hilang.
- Belum terverifikasi resmi → cek di sesi 1 dan sesi 6 kurikulum.

## 2. Cara soal TIU 2026 dibangun (pola pembuat soal)
1. **Satu operasi inti + satu bungkus cerita.** Angka dipilih supaya bulat: 455/35 = 13; 6 × 18/12 = 9; 15 × 10/20 = 7,5. Kesulitan datang dari menerjemahkan kalimat, bukan dari menghitung.
2. **Gradasi dalam satu blok:** hitung langsung → pasangan → pola tabel → kecukupan data. Soal makin akhir makin menuntut menimbang informasi.
3. **Kecukupan data = mesin HOTS utama.** Tiga bentuk:
   - aljabar dua persamaan (45);
   - satu pernyataan memberi nilai, satu lagi hanya batas (47: x > 20);
   - ya/tidak dengan batas waktu dan perbandingan berbalik nilai (48, 49).
4. **Jebakan disembunyikan di stem**, bukan di opsi:
   - 48 "pesanan yang **berbeda**" membuat (1) tidak cukup;
   - 49 menyebut "18.000 liter" sebagai informasi pengalih.
5. **Pola bilangan memakai sedikit titik data:** 3 titik berurutan (43), 2 kolom bukti (44), 4 titik loncat (42, TIU002 21–23).
6. **Opsi KCK berbentuk baku panjang**, tetapi bunyinya tidak seragam antar-bimbel, bahkan antar-soal dalam satu tryout.

## 3. Analisis 43–49
**43 — tabel suku berurutan, 3 titik (kunci A 117).**
- Rumus tersirat Uₙ = (3n − 4)(n − 1)/2 (bilangan pentagonal). Kunci benar.
- **Celah:** tiga titik **selalu** cocok dengan pola kuadrat mana pun, jadi "selisih tingkat dua tetap +3" adalah asumsi, bukan bukti. Ini melanggar aturan kita: titik data ≥ parameter + 1.
- Nomor suku berurutan (4, 5, 6) membuat soal turun jadi deret biasa.
- Pengecoh 122/127/135/142 tidak bernama.

**44 — matriks angka 3×3 (kunci D 4).**
- Aturan: baris 3 = (baris 1 + baris 2) : 2 per kolom. Hanya dibuktikan 2 kolom, tapi aturan alternatif sederhana (tengah − 2, tengah − atas, atas + tengah − 4) gugur di kolom 2. Aman.
- Pengecoh **bernama**: −8 (lupa bagi 2), −4 (salah tanda), 6 (aturan "tengah − 2" dari kolom 1).
- Bilangan negatif −3 mematahkan kebiasaan "cari selisih". **Desain bagus.**

**45 — KCK aljabar (kunci D).**
- Masing-masing pernyataan + x + y = 7 menghasilkan x = 4, y = 3, jadi 2x + y = 11. (1) dan (2) konsisten. Benar.
- Cara kilat: 2x + y = (x + y) + x, jadi cukup cari x saja.
- **Celah opsi D** "Salah satu pernyataan SAJA cukup": bila kuncinya A atau B, kalimat D juga benar secara harfiah (salah satu pernyataan memang cukup). Opsi tidak saling meniadakan. TIU002 memakai bunyi yang benar: "(1) SAJA cukup **DAN** (2) SAJA cukup".

**47 — KCK nilai vs batas (kunci A).**
- (1) total 32 + x = 3y → y = 8, x = 24 → 18 × 24 + 12 × 8 = 528.
- (2) x > 20 → x ∈ {21, 24, 27, …} → tidak tunggal.
- Kunci benar, tapi **kena celah opsi D** (kunci A sehingga D juga benar harfiah).
- Pembahasan salah ketik "minibus yang **terjual**" (salinan dari soal lain).

**48 — KCK ya/tidak + berbalik nilai (kunci C).**
- Gabungan: t = 6 × 18 / 12 = 9 jam ≤ 9 → "ya". Benar.
- **Desain terbaik di set ini:**
  - sinyal stem "pesanan yang berbeda" mematikan (1) saja;
  - batas inklusif ("maksimal 9 jam" dan hasil tepat 9 jam) menguji ketelitian.
- Siswa (jawaban A, salah) terjebak karena tidak membaca "berbeda".
- Pembahasan **tidak menunjuk** frasa sinyal itu, padahal di situ inti pelajarannya.
- Celah kecil: "jumlah buku sama" dianggap setara dengan beban kerja sama (buku bisa beda tebal).

**49 — KCK pompa (kunci resmi A) → CACAT, kunci yang benar secara ketat: E.**
- Stem: "dikosongkan menggunakan **beberapa** pompa … jika ditambah 5 pompa". Jumlah pompa awal **tidak pernah disebut**. (1) hanya memberi laju (15 pompa → 10 jam), bukan jumlah pompa yang sedang dipakai.
- Buktinya: pompa awal 15 → 20 pompa → 7,5 jam ("tidak"); pompa awal 30 → 35 pompa → 4,29 jam ("ya"). Jawaban berbeda, jadi (1) tidak cukup. (2) volume tidak relevan. Gabungan pun tidak cukup → **E**.
- Pembahasan Al Faiz diam-diam menganggap pompa awal = 15. Ini persis cacat "proyek perpustakaan" di memory TIU: pertanyaan ya/tidak tanpa jumlah pekerja.
- Kata "**sedang** dikosongkan" juga membuat volume tersisa ambigu.
- Opsi memakai set bunyi lain ("Cukup (1)", "Menggunakan (1) saja atau (2) saja"), tidak konsisten dengan 45/47/48. "Cukup (1)" juga benar harfiah bila kuncinya D.

## 4. Celah kritis TIU 2026 (dari 16 soal Al Faiz + TIU002)
| Kode | Celah | Bukti | Dampak |
|---|---|---|---|
| **C1** | Asumsi diam — jawaban butuh informasi yang tidak tertulis | 49 (pompa awal), 31/33 (izin ≠ fakta), 48 (buku sama tebal) | kunci resmi bisa salah; siswa yang teliti justru dihukum |
| **C2** | Opsi KCK tidak saling meniadakan | 45, 47, 48, 49 ("Salah satu … SAJA cukup", "Cukup (1)") | dua opsi benar harfiah |
| **C3** | Pola dari data minim | 43 (3 titik → kuadrat selalu cocok) | "pola" tidak terbukti; jawaban bergantung konvensi |
| **C4** | Kunci tertebak dari bentuk | 42 (pencilan), 39 (cermin tunggal), 36 (cocok-kata) | soal bisa dijawab tanpa nalar |
| **C5** | Pengecoh tanpa nama | 38 (jarak tetap 10), 42, 43 | daya beda rendah; pembahasan tidak bisa mengajarkan kesalahan |
| **C6** | Konteks tempelan/tidak konsisten | 40, 41 ("sejumlah" tapi total beda), 47 ("terjual") | cerita merusak logika |
| **C7** | Pembahasan hanya membuktikan kunci | 33, 36, 48 (sinyal tidak ditunjuk) | siswa tahu jawaban, tidak tahu cara melihatnya |

**Yang layak diadopsi (kekuatan):**
- S1 sinyal satu frasa di stem (48);
- S2 batas inklusif yang tepat sasaran (48);
- S3 pengecoh "sisi kiri sama" (40);
- S4 premis pengalih yang memancing cocok-kata (32, 33);
- S5 bilangan negatif untuk mematahkan heuristik selisih (44);
- S6 informasi pengalih yang relevan secara topik tapi tidak dibutuhkan (49 volume);
- S7 susunan opsi KCK baku panjang yang benar (TIU002);
- S8 kunci rata 7/7/7/7/7 (TIU002).

## 5. Arah gaya D'Ajiks (dirancang di engine)
Prinsip: **"Setiap soal punya satu kalimat kunci, setiap opsi salah punya nama, setiap kunci dibuktikan mesin."**
- Tutup C1–C7 dengan gerbang mekanis (brute force, cek titik data, kunci terkunci per bunyi opsi).
- Adopsi S1–S8 sebagai fitur wajib, bukan kebetulan.
- Bangun **Kamus Jebakan TIU D'AJIKS**: nama jebakan yang sama dipakai di semua paket dan pembahasan, sehingga siswa belajar mengenali kesalahannya sendiri.
- Fokus keluarga soal mengikuti blueprint 2026 (verbal–logika 15 / KCK 5 / pola bilangan 8 / hitung terapan 7). Figural tetap disiapkan (dari ilmu PSI), tapi bukan prioritas sampai terverifikasi.

## 6. Pelajaran untuk mengajar siswa
1. KCK ya/tidak: sebelum menilai pernyataan, **tulis daftar yang dibutuhkan** (jumlah pekerja awal, laju, beban). Pernyataan yang tidak mengisi daftar itu tidak cukup, walau kelihatan "nyambung".
2. Cari kata **"berbeda / beberapa / sedang / maksimal / paling sedikit"** di stem. Biasanya keputusan ada di situ.
3. Pola dari 3 titik saja: jawab pakai selisih tingkat dua (konvensi ujian), tapi sadari itu asumsi. Di soal D'Ajiks selalu ada titik ke-4 sebagai bukti.
4. Matriks angka: uji aturan di **dua** kolom/baris sebelum dipakai, dan waspadai bilangan negatif.

## 7. Tindak lanjut
- Al Faiz 50–65 belum terlihat: apakah ada figural? Ini menentukan porsi figural di engine.
- TIU002 belum dibaca penuh (sesi 4): ambil contoh "hubungan objek", "ekuivalensi", "memperkuat/memperlemah argumen", "penalaran dari data" — keluarga verbal baru yang belum ada di pedoman kita.
- Verifikasi resmi blueprint TIU (sesi 1).

## 8. Analisis penuh Al Faiz 50–53, 55
Sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-5*.png` (50–53, 55 + pembahasan; 54 tidak ada).
- Semua angka dihitung ulang dengan python (`Fraction`). 55 di-brute force: 720 susunan × 4 tafsir.
- Peta blok terbaru: 31–36 verbal · 38–41 hitung/pasangan · 42–44 pola · **45–52 KCK (7 terlihat; 46 tidak terlihat)** · 53 hitung · 55 analitis.
- Akibatnya KCK Al Faiz ≥ 7 dari 35, sedangkan TIU002 = 5. Angka "4 terlihat" di §1 sudah usang. Porsi KCK blueprint belum konvergen (rentang 5–8).
- Celah baru: **C8 templat berulang.** Satu kerangka soal dipakai ulang; hanya angka dan konteks yang diganti (48/50/52).

### 50 — KCK taman (kunci resmi C) · Vonis: kunci sah, set opsi cacat
- Hitung:
  - gabungan: 6 × 15 / 10 = 9 hari ≤ 10 → "ya";
  - (1) saja: luas B ½ × A → 4,5 hari (ya), luas B 2 × A → 18 hari (tidak). Tidak cukup;
  - (2) saja: jumlah petugas B tidak ada. Tidak cukup.
  - Jadi **C**.
- Kalimat kunci: "mengerjakan bagian taman yang **berbeda**" (S1, sama dengan 48).
- Celah:
  - **C2 (set opsi pendek).** Untuk soal ini (kunci C) hanya C yang benar, jadi butirnya lolos. Set opsinya tetap cacat:
    - A "(1) SAJA cukup untuk menjawab." benar harfiah saat kunci D;
    - C "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab." (tanpa "tetapi satu SAJA tidak cukup") benar harfiah saat kunci A/B/D;
    - D "(1) SAJA cukup atau (2) SAJA cukup." benar harfiah saat kunci A/B/D.
  - **C1 ringan:** "luas sama persis" dianggap beban sama, padahal medan bisa berbeda. Ini celah yang sama dengan 48 (jumlah buku sama ≠ tebal sama).
  - **C7:** pembahasan tidak menunjuk kata "berbeda". Ada salah tulis:
    - "x = 6×15/10 → x = 18/2"; "18/2" disalin dari 48 (6 × 18 / 12);
    - x dipakai untuk jumlah petugas (x = 10) sekaligus untuk waktu;
    - stem dobel "Perhatikan informasi berikut!".
  - **C8:** lihat tabel templat di bawah.
- Jebakan per opsi:
  - A = J-ASUMSI (luas B dianggap sama dengan A). Ini jawaban di screenshot.
  - B = J-ASUMSI (Tim B dianggap 6 orang).
  - D = J-ASUMSI ganda (tiap pernyataan dianggap lengkap sendiri).
  - E = J-PENGALIH (mengira perlu laju m²/hari).
- Adopsi: tidak ada yang baru; sinyal "berbeda" sudah tercatat dari 48.

### 51 — KCK anggaran (kunci B) · Vonis: kunci sah, tetapi dua opsi benar harfiah (B dan D)
- Hitung:
  - (2) Konsumsi 3.000.000 = 125% × Dekorasi → Dekorasi 2.400.000 → total 5.400.000;
  - (1) konsisten dengan (2): 2.400.000 × 1,25 = 3.000.000;
  - (1) saja: Konsumsi tidak ada, jadi tidak cukup.
- Celah:
  - **C2, paling parah di set ini.** D "(1) SAJA cukup **atau** (2) SAJA cukup" benar harfiah, karena kalimat "atau" benar bila salah satu sisinya benar. Set ini campuran: A–C berbunyi panjang dan benar, D berbunyi pendek dengan "atau".
  - **C6:** tabel memakai label "Rp A" dan "Rp B" yang bertabrakan dengan huruf opsi A–E.
  - **C5:** A dan E tidak lahir dari kesalahan yang bisa dinamai. E mustahil dipilih karena (1) + (2) jelas lengkap.
- Jebakan per opsi:
  - A = tanpa nama (C5).
  - C = **J-BASIS varian KCK**: mengira 25% tidak bisa dipakai sebelum Dekorasi diketahui, sehingga (1) dianggap perlu.
  - D = bukan pengecoh; benar harfiah (C2).
  - E = tanpa nama (C5).
- Catatan J-BASIS: salah basis biasa (3.000.000 × 75% = 2.250.000 → total 5.250.000) **tidak** mengubah kunci KCK. Siswa yang salah basis tetap menyimpulkan (2) cukup. Di KCK, jebakan basis hanya berdaya lewat varian "basis belum diketahui = buntu". Daya penuhnya ada di soal nilai (HIT/DAT).
- Adopsi: **pernyataan padat**, yaitu satu pernyataan memuat dua fakta yang bersama-sama sudah lengkap kalau dihitung balik. Siswa yang hanya membaca fakta pertama memilih C. Pakai hanya dengan templat terkunci.

### 52 — KCK percetakan (kunci resmi C) · Vonis: **CACAT, kunci ketat A** (dan D ikut benar harfiah)
- Teks penentu:
  - stem: "mendapat tugas … pencetakan sejumlah buku … **Pekerjaan tersebut** dapat dikerjakan oleh dua tim";
  - pertanyaan: "Apakah Tim B dapat menyelesaikan **pekerjaan tersebut** …".
  - Tim A (6 orang, 20 hari) dan Tim B mengerjakan pekerjaan yang sama. Stem sudah menyamakan beban.
- Hitung:
  - (1) 6 × 20 / 10 = 12 hari ≤ 12 → "ya", jadi (1) saja cukup;
  - (2) saja: jumlah pekerja B tidak ada, jadi tidak cukup.
  - Jadi **A**.
- Tafsir resmi (C) butuh dua lompatan yang tidak tertulis:
  - "dikerjakan oleh dua tim" dibaca "dibagi menjadi dua bagian";
  - "pekerjaan tersebut" di pertanyaan dibaca "bagian Tim B saja".
  - Hanya dengan tafsir itu beban B bebas (½ beban → 6 hari, ya; 1½ beban → 18 hari, tidak), sehingga (2) diperlukan.
- Uji siswa teliti (penutup engine): pembaca teliti bisa membela A dari teks saja. Soal gagal.
- Celah:
  - **C1 terbalik (baru).** Tidak ada informasi yang hilang. Yang terjadi: **stem diam-diam sudah menjawab pernyataan (2)**, sehingga (2) mubazir.
  - **C2:** dengan kunci ketat A, D "(1) SAJA cukup atau (2) SAJA cukup" ikut benar harfiah. Di tafsir ketat ada dua opsi benar.
  - **C7:** pembahasan menolak (1) dengan alasan "belum diketahui apakah target yang dihasilkan sama". Alasan ini bertentangan dengan stem.
  - **C8:** templat 48 dipakai ulang tanpa sinyal "berbeda".
- Inkonsistensi platform:
  - grid "Daftar Soal" menandai 52 **hijau** dengan jawaban A di keenam screenshot yang memuat grid (48, 50, 51, 52, 53, 55). Di nomor lain hijau = benar;
  - halaman pembahasan 52 menulis "Salah" dan menyorot C;
  - belum diketahui mana yang dipakai untuk skor.
- Jebakan per opsi (memakai kunci ketat A):
  - B = J-ASUMSI (Tim B dianggap 6 orang).
  - C = **J-PENGALIH** (menganggap (2) perlu, padahal stem sudah memberikannya). Kunci resmi sendiri jatuh ke jebakan ini.
  - D = benar harfiah (C2).
  - E = tanpa nama (C5).

### Templat berulang 48/50/52 (C8)
| | 48 | 50 | 52 |
|---|---|---|---|
| Konteks | percetakan, mesin | taman, petugas | percetakan, pekerja |
| Baris 1 tabel | 6 mesin · 18 jam | 6 orang · 15 hari | 6 orang · 20 hari |
| (1) | kemampuan sama + ekspres 12 mesin | kecepatan sama + Tim B 10 orang | kecepatan sama + Tim B 10 orang |
| (2) | jumlah buku sama | luas taman sama | jumlah buku sama |
| Batas → hasil | maks 9 → tepat 9 | maks 10 → 9 | paling lama 12 → tepat 12 |
| Sinyal "berbeda" | ada | ada | **tidak ada** |
| Kunci resmi | C | C | C |
- 3 dari 7 KCK yang terlihat memakai satu kerangka. Angka dan konteks diganti; struktur, isi pernyataan, dan huruf kunci tetap sama.
- Siswa yang menghafal 48 bisa menjawab 50 dan 52 tanpa membaca. Di 52, jawaban hafalan itu justru yang dinilai benar oleh kunci resmi. Mengganti angka dan konteks tidak membuat soal baru.
- **Koreksi S2 (§4):** batas inklusif (tepat 9, tepat 12) **tidak menguji apa pun** di KCK ya/tidak, karena "ya" dan "tidak" sama-sama berarti cukup. S2 hanya berdaya di soal hitung. Engine Contoh 1 sudah mencatat hal ini.

### 53 — berbanding lurus baterai (kunci B 4.500) · Vonis: kunci sah, opsi lemah
- Hitung: kenaikan 10 → 30% = 20% ↔ 1.500 MB, jadi 75 MB per 1%. Kenaikan 10 → 70% = 60% → **4.500 MB**.
- Kalimat kunci bagus: "dianggap berbanding lurus dengan **kenaikan** persentase baterai" (S1).
- Jebakan per opsi:
  - A 3.000 = J-LANGKAH: hanya menghitung 30 → 70% = 40% → 3.000, lupa 1.500 dari 10 → 30%. Bisa juga J-BASIS campuran (60 : 30).
  - C 5.000 = tanpa nama. Hanya muncul lewat 1.500 × 100/30, yang tidak menjawab pertanyaan (C5).
  - D 5.500 = tanpa nama (C5).
  - E 6.000 = J-TANDA (70 + 10 = 80 → 80/20 × 1.500) atau hitung dobel (1.500 + 4.500). Lemah.
- Celah:
  - Jebakan terkuat untuk kalimat kunci tidak dipasang. **J-BASIS murni** (memakai level baterai, bukan kenaikan: 70/30 × 1.500 = **3.500**) tidak ada di opsi, jadi kalimat kunci tidak teruji.
  - **C5 + C4 ringan:** C, D, E = kunci + 500 / 1.000 / 1.500. Deret berjarak tetap mulai dari kunci (mirip 38).
  - **C7:** pembahasan tidak menjelaskan kenapa level 30% bukan basisnya.
- Adopsi: kalimat kunci "berbanding lurus dengan kenaikan" + J-BASIS, dengan pengecoh 3.500 benar-benar dipasang.

### 55 — duduk melingkar (kunci D = E) · Vonis: kokoh
- Brute force memakai 4 tafsir:
  - "kanan" searah atau berlawanan jarum jam;
  - "terpisah satu kursi" dibaca bersebelahan, atau ada satu kursi di antaranya.
  - Hasil: tiap tafsir menghasilkan tepat **1 susunan**, dan kiri C = E di semuanya. Pembahasan memakai tafsir "ada satu kursi di antara" (urutan A–F–B–D–E–C).
- Jebakan per opsi:
  - A (A) = J-BALIK: kanan C = A di semua tafsir.
  - B (B) dan C (D) = tanpa nama, karena keduanya tidak pernah bersebelahan dengan C (C5).
  - E (F) = mengabaikan premis negatif "C tidak duduk di sebelah F" (belum ada kode).
- Celah kecil:
  - kata tanya "kemungkinan", padahal susunannya tunggal dan jawabannya pasti;
  - "terpisah satu kursi" ambigu. Kunci tidak berubah karena kebetulan, bukan karena dirancang;
  - **C7:** pembahasan hanya berupa gambar, tanpa langkah.
- Adopsi:
  - susunan tunggal yang bertahan walau arah dibalik;
  - frasa ambigu wajib dibuktikan tidak berpengaruh lewat brute force, atau didefinisikan di stem.

### Rekap 50–55
| No | Keluarga | Kunci resmi | Kunci ketat | Vonis | Celah |
|---|---|---|---|---|---|
| 50 | KCK ya/tidak | C | C | sah; set opsi cacat | C1 ringan, C2 (set), C7, C8 |
| 51 | KCK nilai | B | B (D ikut benar) | gagal G4 | C2, C5, C6 |
| 52 | KCK ya/tidak | C | **A** (D ikut benar) | **cacat** | C1 terbalik, C2, C7, C8 |
| 53 | hitung berbanding lurus | B | B | sah; opsi lemah | C4 ringan, C5, C7 |
| 55 | analitis melingkar | D | D | kokoh | C5 (2 opsi), C7 |

### Implikasi engine (dikerjakan di v0.2)
- G3: aturan baru "stem tidak boleh diam-diam menjawab salah satu pernyataan" (52).
- Kamus Jebakan: tambah J-BASIS (51, 53).
- Aturan anti-templat berulang (48/50/52) di Pilar 2 dan G8.
- Pilar 5: bukti set pendek (50) dan bunyi "atau" (51/52).
- **Tidak diubah:** blueprint KCK 5. Al Faiz ≥ 7, TIU002 = 5; belum ada dasar untuk mengganti, jadi tunggu sumber ketiga.
