# Tahap 2 · Bagian C — Rencana Contoh dan Latihan: Bab 6–10 (Numerik)

Handbook TIU D'Ajiks Akademi · 2026-10-30 · subagen C
Status: spesifikasi saja. Laporan ini tidak memuat soal jadi, angka final soal, opsi jadi, kunci soal, atau script. Semua jumlah, target detik, dan taksiran halaman berstatus **usulan**.

**Dasar.** Log Handbook TIU (putusan 1–11), laporan T1-C, Tabel 2C laporan T1-A, engine TIU v0.4.2 (kepala versi, Pilar 3–6, FORMAT PEMBAHASAN), log TO Paket 1 TIU + `paket/paket-1/paket_tiu_1.json` (kerangka no. 37–56), `tmp/paket1/build_numerik.mjs`, `tmp/paket1/pola_terpakai.txt`. Script lama (`build-suku-pasangan.js`, `build-deret-tabel-lv56.js`) hanya dibaca. Laporan T2-A dan T2-B dibaca untuk menyamakan nama script, bentuk data, registri kerangka, dan butir numerik Bab 2/19.

**Putusan yang diterapkan.** P3 (kalimat guru di buku siswa, kode hanya edisi pengajar) · P4 (semua soal baru dari script, beda dari TO, bank beredar tidak dipakai) · P5 (±86 detik rata-rata; detik per jenis dari Tabel 2C) · P7 (perbandingan kuantitatif = subbagian Bab 6) · P8 (Bab 10 memuat umur, bunga tunggal, bruto-neto-tara, kereta, arus sungai, perbandingan jumlah-selisih) · P9a (kalimat penentu) · P10 (folder `scripts/` handbook) · P11a (pembahasan 7 langkah).

---

## 0. Ringkasan jumlah: T1 → T2

| Bab | T1 | T2 (pembuka/contoh/latihan) | Total | Alasan perubahan |
|---|---|---|---|---|
| 6 Operasi Hitung dan Estimasi | 12 | 1 / 4 / 10 | 15 | +1 contoh, +2 latihan perbandingan kuantitatif (Putusan 7) |
| 7 Pasangan Operasi Bernilai Sama | 12 | 1 / 3 / 8 | 12 | jumlah tetap. Tiga latihan T1 yang bersumber bank lama kini dibuat script (Putusan 4). Pembuka dan Contoh 1 digeser karena T1 sekerangka dengan TO no. 42 |
| 8 Barisan Bilangan dan Suku ke-n | 15 | 1 / 4 / 10 | 15 (+2 bersyarat) | tetap; +2 bila Putusan T2-C3 disetujui |
| 9 Pola Bilangan dalam Tabel | 13 | 1 / 4 / 10 | 15 | +1 contoh, +1 latihan kotak berisian X dan Y. Bentuk ini dipakai TO Paket 1 no. 39 (putusan Gusti 2026-10-30) dan belum ada di T1 |
| 10 Perbandingan, Persentase, dan Laju dalam Soal Cerita | 16 | 1 / 7 / 15 | 23 | Putusan 8: +2 contoh (kereta, umur), +6 latihan (arus, kereta, umur, jumlah-selisih, bruto-neto-tara, bunga), −1 latihan untung-diskon (dilebur ke Contoh 7) |
| **Jumlah** | **68** | **5 / 22 / 53** | **80 (+2)** | |

Ringkas: level Standar 25 · HOTS 40 · HOTS+ 15 (31/50/19%). Waktu latihan rata-rata ±65 detik per soal. Angka ini di bawah rata-rata TIU ±86 detik, karena blok numerik Tabel 2C memang 30 detik (hitung cepat) dan 75 detik (numerik lain).
Lampiran pembahasan numerik naik dari 45 (dipakai T2-A untuk taksiran lampiran) menjadi 53 (+2) soal.

---

## 1. Aturan bersama semua slot

- **Peran slot.** P = soal pembuka di halaman pertama bab, dibahas tuntas (7 langkah) sesudah konsep inti · C = Contoh Soal dan Pembahasan di badan bab; targetnya = waktu mencoba sendiri sebelum membaca pembahasan (selaras T2-A) · L = Latihan Bertarget Waktu, pembahasan di Lampiran · B = latihan bersyarat (Bab 8, Putusan T2-C3).
- **Kesalahan dipasang.**
  - Setiap opsi salah memakai satu kode Pilar 3, dan nilainya keluar dari fungsi kesalahan bernama.
  - Kolom "Kesalahan" memuat kode utama. Bila kodenya kurang dari empat, opsi sisanya diisi kode yang sama lewat jalur berbeda (preseden TO no. 41: J-SISI dua kali) atau kode lain sekeluarga. Pilihan ini dibuat script (engine, Prosedur langkah 5).
- **Beda dari TO.**
  - Kerangka satu baris (G8) dicatat di registri `scripts/data/kerangka_terpakai.json` dan diperiksa `cek_handbook.mjs` (keduanya usulan T2-A).
  - Kerangka numerik TO Paket 1 yang tidak boleh diulang: 37 perkiraan desimal + akar · 38 suku ke-n kuadrat berkoefisien bulat, 5 titik, suku jauh · 39 kotak 2×5 X-Y (atas = jumlah kolom sebelumnya, bawah = selisihnya) · 40 kotak 3×3 "a pangkat b dikurangi b" dengan negatif · 41 pasangan bagi, pengecoh ruas kiri + koma ruas kanan · 42 pasangan kali, dua cermin semu sebagai pengecoh · 43 pasangan campuran berkurung, perintah TIDAK · 44 persen kapasitas, tanya kapasitas · 45 dua pengisi + satu pengosong dibuka terlambat.
  - Konteks KCK no. 46–52 (konveksi, karung, map-spidol, dan lain-lain) tidak dipakai di Bab 10.
  - TO Paket 2–3 TIU belum dibuat; pembuatnya nanti wajib membaca registri.
- **Bank yang sudah beredar** (CAT deret 30, deret tabel 15, suku-pasangan 30) tidak dipakai butirnya. Pola dasarnya boleh diajarkan ulang dengan angka dan susunan baru. Pengecualian: tabel Bab 9 wajib berpola di luar `pola_terpakai.txt` dan di luar pola TO no. 39–40.
- **Butir numerik Bab 2/19 (T2-A) yang berdekatan** sudah dihindari di slot bawah:
  - Bab 2: Contoh 2 (pekerja berubah, tanya total hari), Contoh 3 (persen × pecahan × bilangan), Latihan 3 (bilangan 4 angka dibagi desimal), Latihan 4 (deret dua aturan bergantian), Latihan 5 (untung terhadap harga beli);
  - Bab 19: pembuka (dua perubahan persen), B4–B7.
  - Bila tetap bentrok, Bab 2/19 yang mengalah (aturan T2-A).
- **Urutan latihan di buku diacak berselang:** satu tipe paling banyak 2 kali berturut-turut (pedoman proyek). Tabel di bawah disusun per tipe untuk perencanaan.
- **Opsi.** Angka urut naik (Pilar 5), format Indonesia (titik ribuan, koma desimal, minus "−") · pasangan berbunyi "a × b dan c × d", tanpa "sama dengan" · perbandingan kuantitatif bertemplat tetap (Putusan T2-C2).
- **Level:** Standar (Std) · HOTS · HOTS+ (Pilar 6, tanpa level mudah).

---

## 2. Rencana slot per bab

Kolom "Sumber" = modul di `scripts/numerik/` + fungsi (rincian di §3). Target dalam detik.

### Bab 6 — Operasi Hitung dan Estimasi (15)
Subbagian (judul kerja T1 + Putusan 7):
1. Ukuran Bilangan dan Banyak Angka Hasil
2. Kapan Memperkirakan, Kapan Menghitung Tepat
3. Pembulatan Berlawanan Arah
4. Angka Satuan dan Sisa Pembagian oleh Sembilan
5. Pecahan, Desimal, dan Persen yang Ramah
6. Sifat Distributif dan Urutan Operasi
7. **Perbandingan Kuantitatif** (baru): taksiran tanpa hitung penuh; bentuk berpeubah dirujuk ke Bab 11; Catatan "format resmi belum diverifikasi"

| Slot | Jenis/bentuk | Kerangka umum (aturan pembangkit) | Kesalahan dipasang | Sumber | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| P · HOTS | perkiraan (a × b) : c | a tiga angka, b dan c dua angka, hasil tepat tidak bulat. Opsi kelipatan bulat, jarak antartetangga 12–20%. Pembulatan dua angka penting berlawanan arah jatuh terdekat ke kunci; searah naik dan searah turun jatuh ke opsinya masing-masing | J-BULAT (naik), J-BULAT (turun), J-NOL, J-SEDERHANA | `hit.mjs` `perkiraan()`, `jalurSalah()`, `ujiTerdekat()` | 30 | TO 37 desimal + akar; Bab 2 C3 persen × pecahan |
| C1 · Std | desimal atau pecahan × bilangan, opsi rapat | p/q × N, N kelipatan q, hasil bulat. ≥ 2 pengecoh berangka satuan sama dengan kunci, jadi uji angka satuan tidak cukup. Selisih tiap pengecoh ke kunci bukan kelipatan 9, jadi uji sisa bagi 9 menyisakan satu opsi | J-SEDERHANA (pecahan), J-SEDERHANA (desimal → pecahan), J-LANGKAH, J-NOL | `hit.mjs` `pecahanKali()`, `satuan()`, `sisa9()` | 45 | tidak ada di TO |
| C2 · HOTS | hitung campuran tepat | satu ekspresi: desimal, pecahan biasa, persen; dua tingkat operasi; pecahan ramah (½, ¼, ⅛, ⅓) tersamar sebagai desimal/persen; jalur benar bulat | J-URUTAN, J-SEDERHANA, J-BASIS, J-NOL | `hit.mjs` `ekspresi()`, `nilaiDari()` | 60 | TO tanpa hitung campuran |
| C3 · HOTS | tukar persen dan distributif | a% × b dengan a% sulit dan b% ramah (a% dari b = b% dari a), atau k × (10ⁿ ± 1) | J-BASIS, J-PENGALIH, J-TANDA, J-NOL | `hit.mjs` `tukarPersen()`, `distributif()` | 45 | tidak ada di TO |
| C4 · HOTS | perbandingan kuantitatif, dua bilangan | P dan Q terbaca dari taksiran (pecahan dekat 1, hasil kali vs kuadrat nilai tengah). Selisih relatif < 5%, sehingga pembulatan sepihak membalik atau menyamakan relasi | J-BULAT (relasi terbalik), J-BULAT (dikira sama), J-TENTU | `hit.mjs` `pku()` | 45 | tidak ada di TO |
| L1 · Std | perkiraan jumlah dua hasil kali | a × b + c × d, bilangan 2–3 angka, opsi berjarak ≥ 15% | J-BULAT, J-NOL, J-URUTAN, J-LANGKAH (satu suku terlupa) | `perkiraan()` | 30 | TO 37; Bab 2 C3, L3 |
| L2 · HOTS | perkiraan bagi pecahan biasa | N : (p/q), N 3–4 angka | J-SEDERHANA (dikali p/q), J-NOL, J-BULAT, J-LANGKAH | `perkiraan()`, `jalurSalah()` | 45 | Bab 2 L3 (bagi desimal) |
| L3 · HOTS+ | perkiraan (a × b) : (c × d) | dua pembulatan: berlawanan arah di dalam pembilang, searah antara pembilang dan penyebut | J-BULAT ×2, J-NOL, J-LANGKAH | `perkiraan()` | 45 | — |
| L4 · Std | desimal × bilangan, opsi berselisih 10 | seperti C1, satu langkah | J-SEDERHANA, J-LANGKAH, J-NOL | `pecahanKali()`, `sisa9()` | 45 | — |
| L5 · HOTS | pecahan campuran × bilangan, opsi rapat | ≥ 2 pengecoh berangka satuan sama; sisa bagi 9 pemisah | J-SEDERHANA, J-NOL, J-LANGKAH, J-URUTAN | idem | 45 | — |
| L6 · Std | campuran bilangan bertanda | bilangan negatif + kurung, hasil bulat | J-URUTAN, J-TANDA ×2, J-LANGKAH | `ekspresi()` | 45 | — |
| L7 · HOTS+ | campuran pecahan, desimal, kurung | tiga tingkat operasi | J-URUTAN, J-SEDERHANA, J-TANDA, J-NOL | `ekspresi()` | 60 | — |
| L8 · Std | distributif | a × k + a × m dengan k + m puluhan/ratusan bulat, atau 25% × 4n | J-BASIS, J-PENGALIH, J-TANDA | `distributif()` | 45 | — |
| L9 · HOTS | perbandingan kuantitatif, tukar persen | P = a% dari b, Q = b% dari a, salah satu ditulis sebagai pecahan/desimal; P = Q | J-BASIS (P > Q), J-BASIS (P < Q), J-TENTU | `pku()` | 45 | — |
| L10 · HOTS+ | perbandingan kuantitatif berpeubah | peubah bulat dalam rentang tertulis; P = f(x), Q = g(x) bersilang di dalam rentang; kunci "tidak dapat ditentukan". Pembahasan merujuk Bab 11 | J-MUNGKIN ×3 (satu nilai x dicoba) | `pku()` + `semuaNilai()` | 75 | — |

### Bab 7 — Pasangan Operasi Bernilai Sama (12)
Subbagian T1 tetap, tujuh subbagian:
1. Faktor Prima sebagai Sidik Jari Bilangan
2. Memindahkan Faktor Tanpa Mengubah Hasil
3. Pembagian sebagai Perkalian Silang
4. Pasangan Cermin dan Cermin Semu, ditambah bentuk ab × cd dan ba × dc
5. Desimal, Persen, Pecahan, dan Tanda Kurung
6. Soal Bertanda TIDAK
7. Kapan Menghitung Langsung Lebih Cepat

| Slot | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| P · HOTS | kali 2 angka × 2 angka | kunci: dua ruas bersidik faktor prima sama, tanpa pola cermin. Dua opsi ruas kiri = nilai kunci; satu opsi dua ruas berdekatan; satu opsi ruas kanan = nilai kunci × 10 | J-SISI ×2, J-SISI (berdekatan), J-NOL | `pas.mjs` `pasangan()`, `faktorPrima()`, `ujiSisi()` | 45 | TO 42 bercermin semu; di sini tanpa cermin |
| C1 · HOTS | kali, kunci cermin sejati | kunci berbentuk a × 10b dan b × 10a (selalu sama, 10ab). Dua pengecoh cermin semu: angka ditukar antarfaktor, nilainya beda | J-CERMIN ×2, J-SISI, J-NOL | `cerminSemu()`, `lintCermin()` | 45 | TO 42: cermin semu sebagai pengecoh dan kunci bukan cermin; di sini kuncinya justru cermin sejati |
| C2 · Std | bagi murni | a : b dan c : d; a 3–4 angka; b dan d dua angka berfaktor sama; hasil bulat; dicek dengan kali silang | J-SISI ×2, J-SEDERHANA (coret faktor keliru), J-NOL | `pasangan()` | 45 | TO 41 memakai pengecoh koma 2×; di sini satu |
| C3 · HOTS | campuran : dan × tanpa kurung | a : b × c dan d × e : f, dikerjakan kiri ke kanan; perintah "sama" | J-SISI ×2, J-SEDERHANA, J-NOL | `pasangan()` | 60 | TO 43 berkurung + TIDAK |
| L1 · Std | kali, faktor dipindah | ruas kanan = ruas kiri dengan satu faktor dipindah (× k, : k) | J-SISI ×2, J-SISI (berdekatan), J-NOL | `pasangan()` | 45 | — |
| L2 · HOTS+ | kali bertukar angka | ab × cd dan ba × dc sama ⟺ a·c = b·d (`references/tiu.md`). Kunci memenuhi; dua pengecoh tidak | J-CERMIN ×2, J-SISI ×2 | `cerminBalik()`, `lintCermin()` | 60 | tidak ada di TO |
| L3 · Std | bagi murni | seperti C2, orde bilangan beda | J-SISI ×2, J-NOL, J-SEDERHANA | `pasangan()` | 45 | TO 41 |
| L4 · HOTS | bagi oleh desimal | a : 0,b dan c : 0,d | J-NOL ×2, J-SISI, J-SEDERHANA | `pasangan()` | 60 | TO 41 hanya bilangan bulat |
| L5 · Std | campuran : dan × | seperti C3 | J-SISI ×2, J-SEDERHANA, J-NOL | `pasangan()` | 60 | TO 43 |
| L6 · HOTS | persen, desimal, pecahan | x% × a, p/q × b, desimal × c di satu set | J-SEDERHANA ×2, J-NOL, J-SISI | `pasangan()` | 60 | Bab 19 B6 (salah baca perintah) |
| L7 · HOTS+ | kurung berisi + atau − | (a + b) × c dan (d − e) × f; dua opsi isi kurung sama, pengali beda | J-SISI ×2, J-URUTAN ×2 | `pasangan()` | 75 | TO 43 (TIDAK) |
| L8 · HOTS | perintah TIDAK, tanpa kurung | empat pasangan sama, satu tidak. Tiap pasangan sama tampak beda oleh satu sebab (desimal, pecahan, faktor dipindah) | J-PERINTAH, J-NOL, J-SEDERHANA ×2 | `pasangan(…, cariSama=false)` | 75 | TO 43 berkurung |

### Bab 8 — Barisan Bilangan dan Suku ke-n (15 + 2 bersyarat)
Subbagian:
1. Kenaikan per Suku pada Nomor yang Meloncat
2. Selisih Bertingkat dan Pangkat Pola
3. Banyak Titik yang Membuktikan Pola
4. Mencari Nomor Suku dari Nilainya
5. Deret Sebaris: Selisih, Rasio, dan Selang-seling
6. Selisih yang Berlipat: Aturan Kali lalu Tambah
7. Deret Huruf sebagai Deret Nomor Urut
8. (bersyarat) Jumlah Suku dan Sisipan

| Slot | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| P · HOTS | suku ke-n linear, tanya suku jauh | ≥ 4 titik (2 parameter + 2 saksi), nomor meloncat dengan jarak tak berpola, kolom nomor tidak urut; nomor yang ditanya ≥ 3 × nomor terbesar | J-NOMOR (suku tetangga), J-NOMOR (selisih mentah), J-KONST, J-TANDA | `suk.mjs` `polinom()`, `jarakAcak()`, `aturanLainDeret()` | 60 | TO 38 kuadrat |
| C1 · Std | linear, tanya nomor suku | nilai diketahui, nomor dicari | J-NOMOR (banyak langkah), J-NOMOR (±1), J-TANDA, J-KONST | `polinom()`, `cariNomor()` | 60 | — |
| C2 · HOTS | kuadrat berkoefisien ½ | selisih tingkat dua = 1 (pola bilangan segitiga bergeser); 4 titik meloncat; suku jauh | J-RATA, J-KONST, J-NOMOR ×2 | `polinom()` (rasional) | 75 | TO 38: koefisien bulat, 5 titik |
| C3 · HOTS | deret sebaris kali lalu tambah | Uₙ₊₁ = k·Uₙ + c; selisih berlipat k; 5 suku tampil | J-RATA, J-TIGA, J-LANGKAH, J-NOMOR | `deret()`, `aturanLainDeret()` | 45 | — |
| C4 · HOTS | deret huruf-angka | huruf: nomor 1–26, selisih bertingkat, melewati Z; angka: pola kali | J-NOMOR (meleset satu huruf), J-NOMOR (lupa berputar), J-TIGA, J-RATA | `huruf()` | 60 | — |
| L1 · Std | linear menurun, suku jauh | beda negatif | J-TANDA, J-NOMOR, J-KONST | `polinom()` | 60 | — |
| L2 · Std | linear, tanya nomor suku | — | J-NOMOR ×2, J-TANDA | `cariNomor()` | 60 | — |
| L3 · HOTS | linear, selisih dua suku jauh | Uₚ − U_q = beda × (p − q); bilangan tetap tidak diperlukan | J-NOMOR, J-LANGKAH, J-TANDA, J-PENGALIH | `polinom()` | 60 | — |
| L4 · HOTS | kuadrat, tanya nomor suku | 4 titik meloncat | J-NOMOR, J-RATA, J-KONST | `cariNomor()` | 75 | TO 38 tanya nilai |
| L5 · HOTS+ | kuadrat berpuncak | a < 0 (naik lalu turun), 5 titik, suku jauh bernilai negatif | J-RATA, J-KONST, J-TANDA, J-NOMOR | `polinom()` | 90 | TO 38 a > 0 |
| L6 · HOTS+ | nomor × linear atau pangkat tiga | Uₙ = n × (pn + q), atau kubik dengan 5 titik; sidik "bagi n" | J-TIGA, J-KONST, J-RATA, J-NOMOR | `polinom()` | 90 | — |
| L7 · Std | deret sebaris, suku hilang di tengah | selisih bertingkat dua; celah di tengah, bukan di ujung | J-RATA, J-TIGA, J-NOMOR | `deret()` | 45 | dua deret berselang sudah dipakai Bab 2 L4 |
| L8 · HOTS | rekursif dua suku | Uₙ = Uₙ₋₁ + Uₙ₋₂ + c, atau a·Uₙ₋₁ − Uₙ₋₂ | J-RATA, J-TIGA, J-LANGKAH | `deret()` | 60 | pola sejenis ada di bank CAT: angka dan susunan baru |
| L9 · Std | deret huruf tunggal | selisih bertingkat, tanpa putaran | J-NOMOR, J-RATA, J-TIGA | `huruf()` | 45 | — |
| L10 · HOTS+ | deret huruf berputar + huruf cermin | melewati Z; pasangan huruf berjumlah nomor 27 | J-NOMOR (lupa berputar), J-NOMOR, J-TIGA | `huruf()` | 60 | — |
| B1 · HOTS | jumlah n suku aritmetika | pasangan dari dua ujung berjumlah tetap | J-NOMOR (banyak pasangan), J-LANGKAH, J-KONST | `jumlahSuku()` | 60 | — |
| B2 · Std | sisipan | k bilangan disisipkan; kenaikan baru = kenaikan lama : (k + 1) | J-NOMOR (dibagi k), J-LANGKAH | `sisipan()` | 45 | — |

### Bab 9 — Pola Bilangan dalam Tabel (15)
Subbagian T1, ditambah satu subbagian:
1. Membaca Tabel sebagai Rumus: Satu Masukan atau Dua Masukan
2. Tabel Dua Kolom sebagai Tabel Suku ke-n
3. Tabel 3 × 3: Aturan per Baris atau per Kolom
4. Ukuran Hasil sebagai Petunjuk Operasi
5. Model Kotak dengan Angka Acuan: Uji Pemisahan
6. **Kotak dengan Dua Isian (X dan Y)** (baru)
7. Bilangan Negatif, Nol, FPB, dan KPK dalam Tabel
8. Ketika Dua Aturan Sama-sama Cocok

| Slot | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| P · HOTS | 3 × 3 per baris | kolom 3 = fungsi dua langkah dari kolom 1–2. Dua baris lengkap, baris 3 berisi X. Satu aturan satu langkah cocok di baris 1 saja | J-TIGA, J-LANGKAH, J-URUTAN, J-TANDA | `tbd.mjs` `cariX()`, `aturanLain()`, `BARIS` | 75 | TO 40 a pangkat b − b |
| C1 · Std | dua kolom, kanan kuadrat | 4 baris terisi, kolom kiri tidak urut dan meloncat, satu baris tanya | J-RATA, J-KONST, J-NOMOR | `suk.mjs` `polinom()` (label kolom) | 60 | TO P1 tanpa dua kolom |
| C2 · HOTS | 3 × 3 per kolom, negatif dan nol | aturan per kolom; ≥ 1 sel negatif atau nol (Pilar 4) | J-TANDA, J-TIGA, J-URUTAN, J-LANGKAH | `cariX()`, `KOLOM` | 75 | TO 40 per baris |
| C3 · HOTS | kotak beracuan tepi | sel = g(acuan baris) ⊕ h(acuan kolom), ⊕ = + atau ×. Uji pemisahan: selisih atau hasil bagi antarkolom tetap di setiap baris | J-RATA, J-LANGKAH, J-TIGA, J-URUTAN | `ACUAN`, `ujiPemisahan()` | 90 | pola acuan di bank CAT dihindari (lihat `pola_terpakai.txt`) |
| C4 · HOTS+ | kotak 2 × n, X dan Y | baris atas berpola sendiri; sel bawah = f(sel atas sekolom). Tiap opsi salah = satu aturan keliru yang menghitung ulang X dan Y bersama-sama | J-RATA, J-TIGA, J-NOMOR, J-LANGKAH | `cariXY()`, `skorFrekuensi()` | 90 | TO 39: bawah dari kolom sebelumnya; di sini dari kolom sendiri |
| L1 · Std | dua kolom linear | kolom kiri tidak urut | J-NOMOR, J-KONST, J-TANDA | `polinom()` | 60 | — |
| L2 · HOTS | dua kolom kuadrat | kolom kiri memuat negatif/nol | J-RATA, J-KONST, J-TANDA | `polinom()` | 75 | — |
| L3 · HOTS | dua kolom, sidik faktor | kanan : kiri membentuk pola linear | J-RATA, J-TIGA, J-KONST | `polinom()`, `bagiKiri()` | 75 | — |
| L4 · Std | 3 × 3 per baris | satu operasi + bilangan tetap | J-TIGA, J-URUTAN | `cariX()` | 60 | — |
| L5 · HOTS | 3 × 3 per kolom, KPK | FPB dan sisa bagi sudah terpakai di bank | J-TIGA, J-LANGKAH | `cariX()` | 75 | — |
| L6 · HOTS+ | 3 × 3 dua langkah, negatif dan nol | aturan lain ≤ 3 operasi diperiksa | J-TANDA, J-TIGA, J-URUTAN | `cariX()`, `aturanLain()` | 90 | — |
| L7 · HOTS | kotak 3 × 4 beracuan tepi | — | J-RATA, J-LANGKAH | `ACUAN` | 90 | — |
| L8 · HOTS | kotak 4 × 4 bertetangga | sel dari sel kiri dan sel atas, tetapi bukan "kiri + atas" (sudah terpakai) | J-TIGA, J-URUTAN, J-RATA | `TETANGGA` | 90 | — |
| L9 · Std | kotak 2 × n X-Y, dua deret sejajar | — | J-RATA, J-NOMOR | `cariXY()`, `skorFrekuensi()` | 60 | TO 39 |
| L10 · HOTS+ | kotak 3 × 4, X dan Y di baris berbeda | — | J-TIGA, J-LANGKAH, J-TANDA | idem | 105 | TO 39 |

Subbagian 8 diajarkan lewat contoh penyangkal di teks, bukan soal. Alasannya: Pilar 4 melarang soal D'Ajiks yang aturan lainnya juga cocok di semua titik.

### Bab 10 — Perbandingan, Persentase, dan Laju dalam Soal Cerita (23)
Subbagian disusun ulang untuk Putusan 8, dengan konsep inti besaran tetap dan laju relatif:
1. Satu Persamaan: Hasil = Laju × Waktu
2. Senilai dan Berbalik Nilai: Mencari Besaran yang Tetap
3. Kerja Bersama dan Keran: laju dijumlah, pengosong bertanda negatif, jeda
4. Memilih Angka Ramah untuk Besaran yang Saling Menghapus
5. Laju Relatif: berpapasan, menyusul, kereta, arus sungai, kecepatan rata-rata
6. Selisih yang Tetap: umur, perbandingan jumlah-selisih
7. Persen terhadap Dasar yang Tepat: persen kapasitas, untung-rugi, diskon, bruto-neto-tara, bunga tunggal

| Slot | Jenis/bentuk | Kerangka umum | Kesalahan dipasang | Sumber | Target | Beda dari TO |
|---|---|---|---|---|---|---|
| P · HOTS | kerja bersama, satu pelaku berhenti | dua pelaku berlaju beda; setelah t, satu berhenti; tanya total waktu sejak mulai. Kapasitas dipilih = KPK waktu | J-LANGKAH (waktu tahap akhir), J-LAJU (waktu dirata-rata), J-ASUMSI (dianggap bekerja sampai selesai), J-SATUAN | `crt.mjs` `tahap()`, `angkaRamah()` | 90 | TO 45 pengosong terlambat |
| C1 · Std | persen kapasitas dua tahap | isi turun dari p₁% ke p₂% karena pemakaian yang diketahui; tanya tambahan untuk mencapai p₃% | J-BASIS (persen dari isi), J-LANGKAH, J-PENGALIH, J-NOL | `persenDasar()` | 60 | TO 44 tanya kapasitas |
| C2 · HOTS | berbalik nilai, pekerjaan terhenti | rencana p pekerja × n hari; setelah d hari terhenti h hari; tanya tambahan pekerja agar selesai tepat waktu | J-SEARAH, J-LANGKAH (sisa pekerjaan), J-ASUMSI, J-LAJU | `berbalik()` | 75 | Bab 2 C2 tanya total hari |
| C3 · HOTS+ | keran: pengosong sejak awal, satu pengisi ditutup di tengah | tiga keran, dua tahap | J-TANDA (pengosong dijumlah), J-LANGKAH, J-LAJU, J-ASUMSI | `tahap()` | 105 | TO 45 |
| C4 · HOTS | menyusul dengan jeda berangkat | searah; jeda dalam menit, laju dalam km/jam; tanya pukul menyusul | J-TANDA (laju dijumlah), J-LANGKAH (lama, bukan pukul), J-SATUAN, J-LANGKAH (jarak awal terlupa) | `lajuRelatif()` | 90 | — |
| C5 · HOTS | kereta melewati terowongan | jarak = panjang terowongan + panjang kereta; km/jam ↔ m/detik | J-LANGKAH* (panjang kereta terlupa), J-SATUAN, J-TANDA, J-NOL | `kereta()` | 75 | — |
| C6 · HOTS | umur dengan dua perbandingan | perbandingan sekarang dan k tahun lagi; selisih umur tetap menentukan nilai satu bagian | J-RASIO, J-LANGKAH, J-TANDA (lalu/lagi tertukar), J-BASIS | `umur()` | 75 | — |
| C7 · HOTS | diskon bertingkat lalu untung | dua diskon berurutan → harga jual; persen untung terhadap harga beli | J-BASIS (diskon dijumlah), J-BASIS (untung dari harga jual), J-LANGKAH, J-PENGALIH | `persenDasar()` | 60 | Bab 19 pembuka (dua perubahan persen) |
| L1 · Std | senilai + data pengalih | bahan per satuan | J-PENGALIH, J-SATUAN, J-LANGKAH | `senilai()` | 45 | — |
| L2 · Std | persen sebanding kenaikan | yang sebanding kenaikan, bukan keadaan | J-BASIS, J-LANGKAH | `persenDasar()` | 60 | — |
| L3 · Std | berbalik nilai, pelaku dikurangi | — | J-SEARAH, J-LANGKAH | `berbalik()` | 60 | — |
| L4 · HOTS | berbalik nilai tiga besaran | pekerja × hari × jam per hari | J-SEARAH, J-PENGALIH, J-LANGKAH | `berbalik()` | 75 | — |
| L5 · HOTS | kerja bersama dengan pengurang | dua penghasil, satu pengurang; konteks bukan keran | J-TANDA, J-LAJU | `tahap()` | 90 | TO 45 |
| L6 · HOTS+ | pelaku kedua bergabung terlambat | tanya bagian pekerjaan pelaku pertama | J-LANGKAH, J-LAJU, J-BASIS | `tahap()` | 105 | — |
| L7 · Std | berpapasan dari dua ujung | — | J-TANDA, J-SATUAN, J-LANGKAH | `lajuRelatif()` | 60 | — |
| L8 · HOTS | kecepatan rata-rata pergi-pulang | jarak sama, laju beda | J-LAJU, J-SATUAN, J-LANGKAH | `lajuRelatif()` | 75 | Bab 19 B7 (dua tahap, satuan campur) |
| L9 · HOTS | arus sungai | waktu hilir dan hulu diketahui; tanya laju arus atau laju perahu | J-TANDA, J-LAJU, J-SATUAN | `arus()` | 90 | — |
| L10 · HOTS | kereta, dua kejadian | melewati tiang + melewati jembatan → panjang dan laju | J-LANGKAH*, J-SATUAN, J-TANDA | `kereta()` | 90 | — |
| L11 · Std | umur, jumlah dan selisih | — | J-LANGKAH, J-TANDA, J-RASIO | `umur()` | 60 | — |
| L12 · Std | perbandingan jumlah-selisih | a : b dan selisih diketahui; tanya jumlah | J-BASIS (selisih dibagi jumlah bagian), J-RASIO, J-LANGKAH | `bagian()` | 45 | — |
| L13 · HOTS | harga beli dari harga jual | persen untung atau rugi diketahui | J-BASIS, J-LANGKAH | `persenDasar()` | 60 | Bab 2 L5 tanya persen |
| L14 · HOTS+ | bruto-neto-tara | tara % dari bruto; harga per kg neto | J-BASIS, J-LANGKAH, J-PENGALIH | `persenDasar()` | 75 | — |
| L15 · HOTS+ | bunga tunggal | bunga per tahun, lama dalam bulan; tanya saldo akhir | J-SATUAN, J-BASIS (bunga dibungakan), J-LANGKAH (bunga saja) | `persenDasar()` | 75 | — |

\* Untuk "panjang kereta terlupa" belum ada kode yang tepat; J-LANGKAH hanya kode sementara (lihat §6).

---

## 3. Rancangan script

### 3.1 Berkas (`BIG DATA/HANDBOOK TIU D AJIKS AKADEMI/scripts/`, Node `.mjs`)
Node `.mjs` dipilih karena selaras dengan T2-A/T2-B dan TO Paket 1, dan supaya fungsi yang sudah teruji dapat dipakai ulang. Ada 7 berkas, masing-masing di bawah 500 baris.

| Berkas | Isi | Asal fungsi |
|---|---|---|
| `numerik.mjs` | Pintu masuk. Membaca `data/slot_numerik.json` (bentuk mesin dari tabel §2: id, bab, slot, keluarga, bentuk, level, target, huruf kunci rencana, kode target, kerangka), memanggil modul per slot, menjalankan §3.2, lalu menulis `out/numerik.json`. Slot numerik Bab 2/19 (T2-A) juga dibuat di sini dengan field `bab` | baru |
| `numerik/dasar.mjs` | `Q()` rasional BigInt (tambah, kurang, kali, bagi, banding, teks pecahan) · `fmt()` · `susun()` (kunci jatuh di huruf rencana) · `nilaiDari()` · `kodeSah()` (membaca tabel Pilar 3 engine: 47 kode + kolom keluarga) · `ujiOpsi()` | `fmt`, `susun`, `nilaiDari` dari `tmp/paket1/build_numerik.mjs` |
| `numerik/hit.mjs` | `perkiraan()`, `jalurSalah()`, `ujiTerdekat()`, `pecahanKali()`, `satuan()`, `sisa9()`, `ekspresi()`, `tukarPersen()`, `distributif()`, `pku()`, `semuaNilai()` | `ujiTerdekat` = cara pemeriksaan TO no. 37 |
| `numerik/pas.mjs` | `pasangan()`, `faktorPrima()`, `ujiSisi()`, `cerminSemu()`, `cerminBalik()`, `lintCermin()` | `pasangan()` dari TO; kunci tunggal ala `build-suku-pasangan.js` |
| `numerik/suk.mjs` | `polinom()` (selisih bertingkat, rasional), `cariNomor()`, `jarakAcak()`, `deret()`, `huruf()`, `aturanLainDeret()`, `jumlahSuku()`, `sisipan()` | `isLinear` + pemeriksaan SUKU dari `build-suku-pasangan.js` |
| `numerik/tbd.mjs` | `cariX()`, `cariXY()`, cara baca `BARIS/KOLOM/ACUAN/TETANGGA/DUA`, `aturanLain()`, `ujiPemisahan()`, `skorFrekuensi()`, `bagiKiri()` | `aturanLain`, cara baca, `isi/cocok` dari `build-deret-tabel-lv56.js`; `ekspresi()` dari TO |
| `numerik/crt.mjs` | `tahap()`, `angkaRamah()`, `senilai()`, `berbalik()`, `lajuRelatif()`, `kereta()`, `arus()`, `umur()`, `bagian()`, `persenDasar()`, `tafsirLain()`, `masukAkal()` | baru |

- Fungsi dari repo `GENERATE SOAL TERBARU SKD 2026` disalin, bukan di-import, karena repo itu punya aturannya sendiri.
- Pemeriksaan lintas bab memakai `cek_handbook.mjs` (T2-A) dan tidak digandakan di sini: kerangka unik (registri + TO), sebaran kunci per bab, ≤ 2 huruf berturut-turut, 7 langkah pembahasan, gaya bahasa.
- Pecahan memakai `Q()`. Float hanya dipakai untuk taksiran dan untuk `nilaiDari()` pada pasangan. Untuk pasangan diberi assert: nilai ≤ 10⁷ dan paling banyak 3 desimal.

### 3.2 Pemeriksaan otomatis (assert; satu gagal = berhenti)
1. **Hitungan.**
   - Semua nilai, termasuk nilai setiap opsi, keluar dari fungsi.
   - Jalur benar berakhir pada bilangan bulat atau pecahan sederhana yang memang direncanakan.
   - Angka yang dicetak = `fmt(nilai)`.
2. **Kunci tunggal (brute force atau bukti tuntas).**
   - HIT perkiraan: nilai tepat terdekat ke kunci, dengan jarak < ½ jarak kunci ke tetangganya. Setiap jalur (benar dan salah) jatuh terdekat ke opsinya sendiri.
   - Perbandingan kuantitatif: P dan Q dihitung tepat. Bentuk berpeubah: semua nilai peubah di rentang dihitung, lalu dikumpulkan himpunan relasinya. Kunci "tidak dapat ditentukan" ⟺ himpunan itu berisi > 1 relasi.
   - PAS: kedua ruas setiap opsi dihitung. Tepat satu opsi sama; untuk perintah TIDAK, tepat satu opsi tidak sama.
   - SUK dan deret:
     - polinom berderajat terendah cocok di semua titik, dan derajat di bawahnya gagal;
     - aturan lain tidak ada yang cocok di semua suku tampil sambil menunjuk opsi lain. Aturan lain yang diuji: aritmetika, geometri, k·U + c (k 2–5, c −20..20), selisih bertingkat ≤ 3, dua deret berselang, rekursif dua suku.
   - TBD:
     - X (dan Y) dicari di rentang −2000..2000 dan harus tunggal;
     - `aturanLain()` (≤ 3 operasi, konstanta 1–12, semua cara baca) tidak boleh cocok di semua sel terisi (Pilar 4).
   - CRT: `tafsirLain()` menghitung tafsir sah lain dari teks yang sama (mis. waktu sejak awal vs sejak tahap 2). Nilainya tidak boleh muncul di opsi kecuali sebagai jalur bernama. `masukAkal()`: kerja bersama lebih cepat daripada pelaku tercepat; dengan pengosong lebih lambat daripada tanpa pengosong.
3. **Data cukup (G2).**
   - Titik ≥ parameter + 1.
   - Tabel 3 × 3 terbukti di 2 baris/kolom.
   - Jarak nomor suku tak berpola: selisih nomor tidak tetap, dan selisih dari selisih itu juga tidak tetap.
4. **Pengecoh dari kode kesalahan (G6).**
   - Setiap opsi salah punya `kode` ∈ 47 kode, `fungsi`, dan nilai fungsi = nilai opsi.
   - Kode yang dipakai di luar kolom "Keluarga" engine hanya memicu peringatan (lihat §6).
5. **Larangan J-CERMIN palsu — `lintCermin()`.**
   - (a) Opsi salah berbentuk a × 10ᵏb dan b × 10ᵏa, atau faktor yang hanya berpindah pangkat 10, ditolak: kedua ruasnya selalu sama (engine v0.4.1).
   - (b) Opsi berkode J-CERMIN wajib: angka kedua ruas adalah susunan ulang satu sama lain, dan nilainya berbeda.
   - (c) Bentuk ab × cd dan ba × dc dengan a·c = b·d hanya boleh menjadi kunci.
6. **Bentuk tidak bocor (G5).**
   - Opsi tidak kembar.
   - Kunci bukan pencilan (tafsir menunggu Putusan T2-C1), dan bukan satu-satunya opsi bercermin.
   - Opsi X-Y: skor frekuensi angka dihitung lintas opsi, dan kunci tidak boleh tertinggi sendirian. Tanpa opsi X-Y tertukar dan tanpa cermin tanda (pelajaran TO P1 no. 39).
7. **Sebaran kunci.**
   - `susun()` menaruh kunci di huruf rencana §4.
   - Per bab, selisih banyak kunci antarhuruf ≤ 1; diperiksa ulang `cek_handbook.mjs` setelah urutan latihan diacak.
8. **Format.**
   - Angka berformat Indonesia.
   - Opsi urut naik, kecuali opsi pasangan, X-Y, huruf, dan perbandingan kuantitatif.
   - Pasangan tanpa frasa "sama dengan"; perbandingan kuantitatif memakai templat tetap.
9. **Waktu dan level:** terisi; jumlah detik latihan per bab dicetak.

### 3.3 Bentuk keluaran data
Satu berkas `scripts/out/numerik.json` (array butir). Bentuk butirnya memakai bentuk TO Paket 1 seperti yang disepakati T2-A §0 dan §3.2:
```json
{ "id": "HB-TIU-B07-C01", "bab": 7, "slot": "contoh", "urut": 1, "subbagian": "...",
  "keluarga": "PAS", "bentuk": "kali-cermin-sejati", "level": "HOTS", "target_detik": 45,
  "soal": "...", "tabel": null, "perintah": "...", "opsi": {"A": "...", "B": "...", "C": "...", "D": "...", "E": "..."},
  "kunci": "B",
  "pembahasan": {"ditanya": "", "kalimat_kunci": "", "taksiran": "", "cara_kilat": "", "langkah": "",
                 "kenapa_benar": "", "opsi_gugur": {}, "alasan_kunci": "", "cek_balik": "", "analogi": "", "waspada": ""},
  "reviu": {"jebakan": {"A": "J-CERMIN"}, "fungsi": {"A": "cerminSemu"}, "kerangka": "PAS kali · kunci cermin sejati · 2 cermin semu · sisi kiri · nol",
            "bukti": {"metode": "dua ruas tepat", "script": "scripts/numerik/pas.mjs", "nilai": {"A": ["...", "..."]}}} }
```
- Padanan engine (FORMAT DATA): `kerangka` → `reviu.kerangka`; `opsi[].jebakan` → `reviu.jebakan`; `verifikasi` → `reviu.bukti`; `kalimat_kunci` dicetak "kalimat penentu".
- Isi `pembahasan` diisi pada T6, dan setiap angka di dalamnya dicek terhadap `reviu.bukti`.
- Sebutan id: P = pembuka, C = contoh, L = latihan, B = bersyarat.
- Perbandingan kuantitatif memakai opsi A–D (Putusan T2-C2); kunci E tidak dipakai.

### 3.4 Uji mandiri: `node numerik.mjs --uji`
- **(a)** Contoh terbimbing 2 engine (Uₙ = (2n − 1)(n − 1), titik 2, 3, 6, 8) harus menghasilkan U₁₁ = 210, dengan pengecoh 171, 180, 242, 253 berkode sama dengan engine.
- **(b)** `lintCermin`:
  - 28 × 330 dan 38 × 230 lolos sebagai cermin semu (9.240 ≠ 8.740);
  - 28 × 330 dan 33 × 280 ditolak sebagai opsi salah.
- **(c)** `ujiTerdekat` pada data TO no. 37 menunjuk C.
- **(d)** `aturanLain` pada tabel TO no. 40 tidak menemukan bentrok.
- Data TO dipakai hanya sebagai uji regresi, bukan sebagai soal.

---

## 4. Sebaran kunci dan level per bab (usulan)

Urutan rencana = P, C1…, L1… (tabel §2). Bila latihan diacak berselang, huruf ikut butirnya, lalu syarat "≤ 2 berturut-turut" diperiksa ulang.

| Bab | Butir | A | B | C | D | E | Std | HOTS | HOTS+ | Urutan kunci rencana | Detik latihan |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 15 | 3 | 3 | 3 | 3 | 3 | 5 | 7 | 3 | C A E D B · B A E C D A E B C D | 480 (8:00) |
| 7 | 12 | 2 | 3 | 2 | 3 | 2 | 4 | 6 | 2 | D B E A · C D B E D A C B | 480 (8:00) |
| 8 | 15 | 3 | 3 | 3 | 3 | 3 | 5 | 7 | 3 | C B D A E · B D C E A D B E C A | 645 (10:45) |
| 8 bersyarat | +2 | — | +1 | — | +1 | — | +1 | +1 | — | B1 B · B2 D | +105 |
| 9 | 15 | 3 | 3 | 3 | 3 | 3 | 4 | 8 | 3 | B D C A E · C E B A D B E C D A | 780 (13:00) |
| 10 | 23 | 5 | 5 | 4 | 4 | 5 | 7 | 12 | 4 | D A C E B A E C · B D A E B C E A D B E C A D B | 1.065 (17:45) |
| **Jumlah** | **80** | **16** | **17** | **15** | **16** | **16** | **25** | **40** | **15** | | 3.450 (57:30) |

- Bab 6: kunci tiga butir perbandingan kuantitatif (C4 = B, L9 = C, L10 = D) ikut dihitung. Dua belas butir lima opsi lainnya diberi A3 B2 C2 D2 E3, sehingga total bab genap 3 per huruf.
- Pada opsi angka urut naik, kunci A = opsi terkecil dan kunci E = opsi terbesar. Rencana di atas memakai tafsir yang direkomendasikan di Putusan T2-C1.
- Bila Putusan T2-C1 menolak tafsir itu:
  - di Bab 8–9, kunci butir beropsi urut hanya boleh B–D;
  - huruf A/E hanya untuk opsi pasangan, X-Y, dan huruf;
  - di Bab 6 dan 10, A + E ≤ 30%;
  - akibatnya Bab 8–9 tidak bisa seimbang A–E.

---

## 5. Taksiran halaman (usulan)

Patokan: teori ±0,8 hlm per subbagian · soal pembuka ±0,5 hlm + pembahasan ±1 hlm · contoh di badan bab ±1,25 hlm (bertabel ±1,5) · soal latihan 3–4 per halaman · ringkasan 1 hlm · pembahasan latihan di lampiran ±1 hlm per soal (patokan T2-A: PDF TO Paket 1, 40 hlm untuk 35 soal; bertabel ±1,1).

Edisi pengajar ditambah kode, kerangka, dan level di setiap pembahasan (±0,1 hlm per soal), ditambah satu kotak catatan pengajar per bab. L1–L6 dihitung T2-A.

| Bab | Badan bab (siswa) | Lampiran pembahasan latihan | Siswa | Pengajar |
|---|---|---|---|---|
| 6 | 16 | 10 | 26 | 28 |
| 7 | 13 | 8 | 21 | 23 |
| 8 | 17 (+1,5 bersyarat) | 10 (+2) | 27 (+3,5) | 29 (+3,5) |
| 9 | 18 | 11 | 29 | 31 |
| 10 | 24 | 15 | 39 | 42 |
| **Jumlah** | **88** | **54** | **142** | **153** |

Lampiran 54 hlm sudah masuk dalam baris "Lampiran B Pembahasan Bab 3–18" T2-A, jadi jangan dijumlah dua kali. Angka numerik di baris itu perlu dinaikkan dari 45 menjadi 53 soal.

---

## 6. Celah dan risiko

1. **Posisi kunci bentrok dengan aturan engine.** Rinciannya di Putusan T2-C1. Kalau dibaca harfiah, A dan E tidak pernah menjadi kunci soal deret dan tabel. Ini bocor bentuk.
2. **Kode belum pas.**
   - "Panjang kereta terlupa" belum punya kode; J-LANGKAH hanya kode sementara.
   - Ada kode yang dipakai di luar kolom Keluarga engine: J-TENTU, J-MUNGKIN, J-BULAT → perbandingan kuantitatif; J-RASIO → CRT; J-URUTAN → PAS; J-TANDA → SUK; J-NOMOR → TBD.
   - Penyelarasan kolom itu butuh izin ubah engine (ringan). Sampai izin ada, `kodeSah()` hanya memberi peringatan.
3. **TO Paket 2–3 TIU belum ada.** Larangan "beda dari TO" baru dapat dicek terhadap Paket 1. Registri wajib dibaca pembuat TO berikutnya.
4. **Volume.**
   - Bagian numerik saja ±142 hlm siswa.
   - Taksiran seluruh buku siswa: laporan B > 250 hlm, laporan A ±330–380 hlm.
   - Putusan satu atau dua jilid sebaiknya dimajukan sebelum T4 kelompok numerik.
5. **Target detik masih taksiran.** Turunan Tabel 2C, belum diuji ke siswa; dikalibrasi dari catatan tryout.
6. **Perbandingan kuantitatif.**
   - Format resmi belum diverifikasi (masuk L2 pengajar).
   - L10 merujuk maju ke Bab 11. Subagen D perlu tahu agar Bab 11 memuat cara "periksa semua nilai" untuk bentuk P dan Q.
7. **Subbagian "Ketika Dua Aturan Sama-sama Cocok" (Bab 9)** hanya dapat diajarkan lewat contoh penyangkal di teks. Soal D'Ajiks tidak boleh punya aturan lain yang ikut cocok (Pilar 4).
8. **Generator CRT dan deret huruf dibangun dari nol.** Risikonya cerita terasa kaku atau bertafsir ganda. Penangkal: `tafsirLain()` + cek buta per bab di T5.
9. **Butir numerik Bab 2/19 (T2-A)** berdekatan dengan sembilan slot di sini. Semuanya sudah dibedakan menurut jenis pertanyaan, tetapi registri tetap penentu.

---

## 7. Putusan yang perlu diminta ke Gusti (maksimal 3, urut prioritas)

**T2-C1. Posisi kunci pada opsi angka yang diurutkan naik.**
- **Bentroknya.** Ada dua kelompok aturan yang tidak bisa dipenuhi bersama:
  - Engine: opsi angka urut naik (Pilar 5); pada SUK/TBD/DRT "ada pengecoh di bawah dan di atas kunci" (Pilar 4); kunci terkecil/terbesar ≤ 30% butir numerik (Pilar 6).
  - Pedoman proyek dan T2-A: kunci A–E seimbang per bab, sehingga A + E ≈ 40%.
- **Akibat bila dibaca harfiah.** Di Bab 8–9, A dan E tidak pernah menjadi kunci. Siswa yang menangkap kebiasaan ini dapat mencoret dua opsi tanpa menghitung. Ini bocor bentuk yang dilarang pedoman proyek.
- **Alternatif.** Opsi deret tidak diurutkan (menyalahi Pilar 5, dan siswa lebih sulit membandingkan), atau Bab 8–9 dibiarkan tidak seimbang.
- **Rekomendasi:**
  - "pencilan" dibaca sebagai **jarak**, bukan letak;
  - kunci boleh di A/E bila jaraknya ke opsi terdekat ≤ median jarak antaropsi bertetangga, dan ≥ 2 pengecoh berasal dari jalur yang hanya beda satu langkah;
  - Pilar 4 dan Pilar 6 diperjelas di engine v0.4.3 (batas 30% diganti "seimbang A–E").

**T2-C2. Format opsi perbandingan kuantitatif (Bab 6: C4, L9, L10).**
- **Rekomendasi: empat opsi baku dengan urutan tetap.**
  - A. P > Q
  - B. P < Q
  - C. P = Q
  - D. Hubungan P dan Q tidak dapat ditentukan
- **Alasan.**
  - Engine menyebut opsi kelima "sesuai format ujian", tetapi formatnya belum diverifikasi.
  - Opsi kelima berupa hubungan khusus (misalnya "P = 2Q") tidak saling meniadakan dengan "P > Q" (melanggar G4).
- **Tambahan.**
  - Kotak Catatan di Bab 6 dan L2 pengajar menyebut bahwa format resmi belum diverifikasi.
  - Kunci tiga butir ini dihitung dalam sebaran A–D.
- **Alternatif:** tiga slot ini ditahan sampai format terverifikasi (Bab 6 menjadi 12 butir).

**T2-C3. Cakupan Bab 8 untuk topik di luar bentuk hari H.**
- **Rekomendasi:**
  - (a) Jumlah n suku aritmetika dan sisipan masuk sebagai satu subbagian pendek + 2 latihan (B1, B2). Keduanya dijelaskan dengan besaran tetap: pasangan dari dua ujung berjumlah sama; kenaikan dibagi rata ke langkah baru. Ini sejalan dengan Putusan 8.
  - (b) Deret geometri tak hingga tidak dimuat: tidak muncul di bentuk hari H yang dibaca dan tidak memakai alat selisih.
  - (c) Soal luar yang hanya memberi tiga titik berurutan: satu kotak Catatan seperti Putusan 6. Isinya: pola berpangkat terendah dipakai sebagai kebiasaan menjawab, bukan bukti.
  - (d) Rumus kenaikan a(p + q) + b masuk kotak edisi pengajar.
