# TIU — Tes Intelegensia Umum

**Engine TIU D'AJIKS (gaya 3K, v0.4.3 draf, 2026-10-30; v0.4.3 = Putusan T2-4/T2-5 Handbook TIU: (a) opsi angka urut naik, kunci boleh di A/E, pencilan diukur dari jarak angka (jarak ke opsi terdekat ≤ median jarak antaropsi bertetangga), batas 30% dicabut, sebaran A–E tetap seimbang per paket; (b) Pilar 5 baku bunyi "menilai dua kesimpulan" (status lengkap (1) dan (2), tanpa "atau") dan "dua argumen" (perkuat 1 · perkuat 2 · perlemah 1 · perlemah 2 · tidak relevan; fakta menyentuh tepat satu argumen atau tidak sama sekali); (c) kolom Keluarga 14 kode Pilar 3 diselaraskan dengan laporan T2; (d) tanpa kode baru, tetap 47: panjang kereta terlupa → J-LANGKAH, opsi "tidak relevan" → J-KATA; (e) P vs Q 4 opsi tetap (P > Q · P < Q · P = Q · tidak dapat ditentukan), format resmi belum diverifikasi):** `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md` — blueprint v0.4 = komposisi Paket 41 Al Faiz (putusan Gusti): verbal 6 · numerik 9 · KCK 7 · ANA 3 · OPT 1 · FIG 9; Pilar 4 FIG (logika penyusun Al Faiz, 8 jenis generator, aturan produksi); Kamus Jebakan = satu daftar bersama di Pilar 3 (47 kode: 35 J- + 12 JF- figural, kolom kalimat guru untuk buku siswa, kelompok K1–K7), gerbang G1–G8, templat opsi terkunci, anti-templat berulang. Generator figural: `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/k12-spatial-engine/` (`npm run gen:tiu`, mockup `npm run mockup`). Riset: `riset/2026-10-25-tiu-2026-logika-celah.md`, `riset/2026-10-25-al-faiz-56-65-tiu.md`. sumber: `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md`

Sumber kebenaran tipe yang sudah punya pedoman: `GENERATE SOAL TERBARU SKD 2026/CLAUDE.md` + `GENERATE SOAL TERBARU SKD 2026/memory.md`.
TIU verbal (analogi, silogisme, analitis) dan figural: ilmu disalin dari Agent PSI ke `references/tiu-verbal-figural.md` (2026-10-25). Asalnya subtes Kecerdasan psikotes, belum dicocokkan dengan TIU SKD.

## Prinsip umum (semua tipe TIU)
- Satu jawaban benar; uji tiap opsi. Hitung ulang setiap angka (soal **dan** pembahasan).
- Angka & rumus ditulis lewat fungsi di script (`f(n)`), assert gagal kalau kunci tidak tunggal/tidak seimbang.
- Pengecoh dari salah hitung/salah baca nyata (misal salah satu langkah selisih).
- Hindari kata bermakna ganda dengan konsep soal lain ("genap berusia" → "tepat berusia").
- Gambar konsisten dengan data + catatan "tidak berskala".
- Angka ribuan titik (1.200), desimal koma (2,5); operasi campuran selalu dikurung.

## Tipe yang sudah punya pedoman
**Deret angka tabel (CAT, level 6–8; PDF level 5–6)**
- Pola berlaku di **semua** baris/kolom; X dicari ulang brute force (harus tunggal).
- Rumus alternatif sederhana (≤3 operasi) tidak boleh membenarkan pengecoh — pernah lolos pola kedua a+b−c+2 di 3 baris, ketahuan saat desain.
- Contoh sering ditanya DAT-022: sel = (kepala baris)² + kepala kolom, X = 57; jebakan selisih tetap 2 → 56.

**Suku ke-n (tabel)**
- Nomor suku loncat dengan **jarak acak** (jarak berpola bisa ditebak tanpa paham).
- Titik data ≥ jumlah parameter + 1 (kuadrat butuh titik ke-4). Pola pangkat tidak boleh juga cocok linear.
- Pengecoh dari salah rumus nyata (lupa konstanta, tanda konstanta terbalik, salah baca nomor suku), dan kunci **tidak boleh pencilan** di antara opsi (opsi 23/29/30/31 vs kunci 51 = tertebak). Pencilan diukur dari jarak angka, bukan letak: kunci boleh di A/E (engine v0.4.3). sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-42.png`
- Hitung pecahan × bilangan: pengecoh dari salah sederhanakan (42/35 jadi 5/4), bukan deret berjarak tetap 10.

**Pasangan operasi bernilai sama**
- Opsi netral "a × b **dan** c × d". Soal "TIDAK sama": TIDAK kapital tebal. Konteks cerita hanya kalau perkaliannya bermakna.
- **Varian pembagian** (a ÷ b dan c ÷ d) dipakai tryout 2026 — aturan sama. sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-40.png`
- Konteks cerita wajib konsisten: "sejumlah kaleng" (satu total) tidak boleh punya total berbeda di tiap opsi; pakai "beberapa gudang/toko" bila totalnya beda.
- Jangan biarkan kunci jadi satu-satunya **pasangan cermin** (28 × 320 dan 32 × 280 = a × 10b dan b × 10a) — tertebak tanpa menghitung. Bila dipakai, beri pengecoh cermin semu yang benar-benar beda (mis. 28 × 330 dan 38 × 230 = 9.240 vs 8.740). **Jangan** 28 × 330 dan 33 × 280: itu bentuk a × 10b / b × 10a, nilainya sama (9.240) → dua kunci (temuan 2026-10-30, engine v0.4.1). Sifat pembantu: ab × cd = ba × dc tepat bila a·c = b·d (12 × 42 = 21 × 24; 12 × 43 ≠ 21 × 34).
- Pengecoh bagus yang terbukti: sisi kiri sengaja sama dengan nilai kunci di 2–3 opsi (memaksa hitung kedua sisi); pasangan tukar (36 & 35 vs 35 & 36).
- Dalam paket simulasi, tipe dikelompokkan per blok seperti ujian (KCK 5 berderet di TIU002 & Al Faiz), tapi **bentuk & konteks dalam satu blok wajib beda**; kunci maks 2 sama berturut-turut.

**Kecukupan data**
- Tiap pernyataan dianggap benar, berdiri sendiri, tidak saling merujuk, tidak bertentangan.
- Opsi saling meniadakan; pakai susunan baku panjang atau ringkas versi aman ("Hanya pernyataan (1) yang cukup", …). **Jangan** "Pernyataan (1) SAJA cukup" (ambigu saat kunci D).
- **Jangan** juga bunyi "(1) SAJA cukup **atau** (2) SAJA cukup" (benar harfiah saat kunci A/B/D), dan **jangan** opsi C tanpa "tetapi satu SAJA tidak cukup". Di Al Faiz 51 dan 52 bunyi ini membuat dua opsi benar. sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-51.png`
- Stem tidak boleh diam-diam menjawab salah satu pernyataan. Di Al Faiz 52, "pekerjaan tersebut" sudah menyamakan beban, jadi (2) mubazir dan kunci ketat A, bukan C resmi. Uji: coret tiap pernyataan, lalu tanya apakah stem sudah memberi isinya. sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-52.png`
- Kerangka soal tidak boleh diulang dalam satu paket. Al Faiz 48/50/52 memakai satu kerangka yang diulang 3× dengan kunci C ketiganya; mengganti angka dan konteks tidak membuat soal baru.
- Batas inklusif (hasil tepat sama dengan batas) tidak menguji apa pun di KCK ya/tidak, karena "ya" dan "tidak" sama-sama berarti cukup. Pakai batas inklusif di soal hitung.
- Persen: salah basis (× 75% alih-alih ÷ 125%) tidak mengubah kunci KCK; di soal hitung pasang pengecoh J-BASIS. Al Faiz 53 tidak memasang pengecoh basis level (70/30 × 1.500 = 3.500).
- Verifikasi brute force: `dunia()` + predikat tiap pernyataan; cukup ⇔ semua keadaan memberi satu jawaban.
- Dua pernyataan menghasilkan nilai sama **bukan** cacat (pola sah kunci D).
- Bukti "tidak cukup" = dua contoh angka yang memenuhi pernyataan tapi jawabannya beda.

**Penalaran analitis "pilih susunan yang memenuhi"**
- Setiap syarat wajib menggugurkan ≥ 1 opsi. Di Al Faiz 56 syarat (2) dipenuhi kelima opsi, jadi soal selesai dengan satu cek. sumber: `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-56.png`

## Pelajaran uji Paket 41 Al Faiz (2026-10-28) — hasil TIU 33/35
Sumber: tangkapan layar Paket 41 + pembahasan resmi (sebagian) dari Gusti. Log: `~/.claude/skills/skd-expert/riset/2026-10-28-log-uji-paket41.md`.

**Peta soal yang terbaca (nomor 31–65):** hitungan dan deret di awal; soal cerita kerja bersama (keran isi-kuras, laju pengosong = negatif); kecukupan data (48, 50, 51, 52); penalaran analitis (53 urutan film + genre, 54 duduk melingkar 6 orang, 55 urutan lapisan batuan = urutan parsial); optimasi tabel (56); figural 57–65.

**Kecukupan data gaya Al Faiz:** pertanyaan "apakah … ≤ / ≥ batas?" cukup dijawab bila nilai bisa dihitung pasti; (1) dan (2) sering saling melengkapi (laju per petugas sama + jumlah pekerjaan sama → perbandingan berbalik nilai). Pola kunci di paket ini: C (48, 51, 52) dan A (50).

**Figural — aturan yang terbukti dari pembahasan resmi:**
- 57 Seri: dua atribut sekaligus — warna latar/objek bergantian (hitam-putih ↔ putih-hitam) + bentuk tetap berlengkung empat simetris. Pengecoh benar di satu atribut saja.
- 58 Seri 4 kuadran: tiap objek punya aturan sendiri (satu berpindah searah jarum jam, satu dicermin tiap dua langkah, satu dicermin vertikal, satu berpindah tiap tiga gambar). Eliminasi per objek.
- 60 Analogi (1):(2) = (3):(4): perubahan per objek — kiri cermin kiri-kanan, kanan cermin atas-bawah, garis tetap. (Claude salah: hanya cek objek kiri.)
- 61 "Gambar berbeda" (perintah soal tidak tampak di layar): hitung jenis bola (bercorak vs bertitik) dan letaknya; opsi berbeda hanya punya 3 bola bertitik.
- 63 Matriks 3×3: tiap baris memuat tiga kelompok objek; aturan per kelompok (tetap / cermin / putar 90° tiap baris). (Claude salah: menganggap objek kembali tegak.)
- Detail aturan per tipe ada di `tiu-verbal-figural.md` §7.2–7.3.

**Kesalahan Claude yang tidak boleh terulang:**
1. Berhenti di pola pertama yang cocok (60, 63) → aturan-tetap B-14.
2. Menulis asumsi tanpa mengujinya (63: "baris 3 dianggap tegak") → asumsi = tanda bahaya; uji dulu ke semua opsi.
3. Figural dari tangkapan layar: perbesar per objek (potong gambar soal dan opsi berdampingan) sebelum memutuskan; satu tampilan utuh tidak cukup untuk membedakan cermin vs putar.

**Yang berhasil (dipertahankan):** semua hitungan lewat script (0 salah di soal angka); brute force soal optimasi menemukan cacat soal 56 yang tidak dibahas kunci resmi.

## Blueprint TIU = komposisi Paket 41 Al Faiz (PUTUSAN GUSTI 2026-10-28)
Gusti: Paket 41 menggambarkan komposisi TIU hari H SKD 2026. Patokan paket TIU D'Ajiks (35 soal, urutan blok seperti ujian):
| Blok | Nomor | Jumlah | Rincian |
|---|---|---|---|
| Verbal | 31–36 | 6 | argumen memperkuat/memperlemah 2 (31, 33), silogisme 2 (32, 34), analogi 2 (35 kata, 36 hubungan kalimat) |
| Numerik | 37–45 | 9 | estimasi 1 (37), pola bilangan tabel 3 (38 suku ke-n, 39 dua kolom, 40 tabel 3×3), pasangan operasi 3 (41 bagi, 42 kali, 43 campuran), soal cerita 2 (44 persen, 45 kerja bersama keran) |
| Kecukupan data | 46–52 | 7 | 46–52 |
| Penalaran analitis | 53–55 | 3 | urutan + atribut, duduk melingkar, urutan parsial |
| Optimasi tabel | 56 | 1 | biaya termurah (wajib optimum global, B-15) |
| Figural | 57–65 | 9 | seri 2 (57–58), analogi 2 (59–60), gambar berbeda 2 (61–62), matriks 3×3 3 (63–65) — selaras engine v0.4 (koreksi 2026-10-30) |
Diterapkan ke engine v0.4 Pilar 2 (2026-10-28). Produksi figural lewat generator `k12-spatial-engine` (8 jenis, gaya organik gabungan alam · nusantara · kuas + 17 benda berdetail dari Codex CLI di `src/tiu-aset.ts`; rupa hitam/garis/arsir diberikan paling akhir supaya arah arsir tidak membocorkan kunci; benda berdetail hanya sebagai objek besar; aset baru wajib cek mata oleh Claude karena Codex tidak bisa melihat gambar).

**Calon dasar alat figural: `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/k12-spatial-engine/` (dibaca 2026-10-28, dari psi-expert; dipindah dari root 2026-10-28).** TypeScript, SVG deterministik, tanpa dependensi selain `tsx` (belum terpasang, belum dijalankan). Isi: seri grid + deret bangun, matriks 3×3 (aturan latin/himpunan/langkah/jumlah + bukti tafsir lain), analogi A:B=C:?; assert: tiap pengecoh salah tepat satu aturan, 5 opsi beda geometris (`sig`). Celah untuk SKD: tidak ada tipe "gambar berbeda"; bentuk dasarnya simetris (cermin vs putar tidak teruji, padahal itu inti 60/63–65 Al Faiz); pembahasan memakai aturan 2 paragraf PSI (TIU kita gaya SKD, C-1a); label opsi a–e.
**Modul TIU di engine itu DIBANGUN 2026-10-28:** `src/tiu-*.ts`, `npm run gen:tiu -- out-tiu`. Enam jenis: FIG-BEDA-PUTAR, FIG-BEDA-HITUNG, FIG-SERI-P3, FIG-SERI-KUADRAN, FIG-ANA-OBJ, FIG-MTX-PUTAR (14 contoh, lolos assert + cek mata). Aturan produksi figural: bentuk kiral; aturan tunggal dibuktikan script; pengecoh salah tepat satu keputusan bernama; jawaban tidak boleh sama dengan gambar yang terlihat; gambar berbeda tanpa gambar soal; cek mata wajib karena penyaring piksel kasar. Log: `~/.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md`.
**Jenis 9–10 (2026-10-28, dari pembahasan resmi Al Faiz 59/65):** FIG-ANA-UBAH (jumlah kelopak/cabang ±k + tukar tempat + cermin objek bawah; bukti: tafsir tambah vs kali/bagi harus memberi jumlah sama) dan FIG-MTX-GABUNG (kolom 3 = gabungan bagian kolom 1+2, bagian inti di dua kolom supaya tafsir XOR gugur; bintang kecil kolom 2 ujung lancip jadi tumpul). Pelajaran: pengecoh yang hanya MENGURANGI bagian membuat kunci = satu-satunya opsi paling lengkap (bocor) → setiap ciri kunci wajib dimiliki minimal satu pengecoh; objek yang dihitung minimal skala 0,6; bagian yang bersarang di dalam bagian lain terbaca satu bentuk.
**Audit mudah ketebak (2026-10-28, perintah Gusti: semua figural sedang–sulit):** pengecoh yang salah tepat satu objek membuat kunci = opsi paling banyak berbagi ciri (ANA-OBJ, SERI-KUADRAN) → semua jenis berpengecoh-ciri memakai `pilih` (tiu-bentuk.ts): pengecoh 1–2 kesalahan, setiap atribut pernah salah, setiap ciri kunci dimiliki pengecoh, kunci tidak unggul dalam ciri bersama, kunci bukan satu-satunya nilai tengah hitungan. Gambar berbeda hitung: ≥3 jenis, target bukan hitam (kalau tidak, kunci = gambar paling gelap). Gambar berbeda tumpuk: bentuk kecil wajib tertutup 20–70% oleh bentuk besar, kalau tidak depan/belakang tidak terlihat. Pengukur piksel tidak cocok untuk audit tebakan (rupa garis/arsir tak terhitung; putar/cermin selalu tampak beda) → audit di tingkat ciri.

## Pelajaran produksi 3 paket figural (2026-10-29) — engine `k12-spatial-engine`, `src/tiu-paket.ts`
Semua lolos pemeriksa mesin pada percobaan pertama, tetapi cek mata menemukan 9 cacat. Pemeriksa mesin = penyaring, cek mata = penentu.
1. **Matriks putar dengan tiga bentuk satu keluarga:** deret yang belum diubah tampak kembar, jadi jawaban bisa disalin dari dua sel sebelahnya. Wajib `awal` (arah awal tiap bentuk berbeda).
2. **Bentuk hampir simetris di sumbu panjangnya (keris):** dicermin di sumbu itu nyaris sama dengan aslinya walau ukuran beda piksel lolos (≥ 0,3). Jangan dipakai di soal putar/cermin; cukup sebagai butir atau objek besar.
3. **Butir kisi 3×3 harus beda siluet jelas.** Tumpukan batu 2/3/4 kecil menyatu dan batas butir hilang. Butir memanjang tidak diputar 90° (tegak vs mendatar terbaca dua jenis).
4. **Objek kecil (skala ±0,13) wajib gemuk.** Keris/ranting kecil jadi coretan; batu dua bulir terbaca jelas.
5. **Gambar berbeda tumpuk:** bentuk kecil hitam polos; guratan putihnya (rusuk kerang) bercampur dengan garis bentuk besar sehingga depan/belakang tidak terbaca. Hiasan harus satu benda utuh (gulung dua lingkar terbaca dua benda).
6. **Batas hitung di sel analogi (petak 42):** rusuk kerang ≤ 7, bulu sayap ≤ 6; di atas itu terlalu rapat.
7. **Seri kuadran satu keluarga:** jumlah bagian tiap objek harus jelas beda (tunas 3/4/5/7), bukan dua objek yang sama-sama 5.
8. **Teks pembahasan tidak boleh tertanam untuk satu keluarga** (jebakan ANA-UBAH menyebut "kelopak dan cabang" untuk kerang/tunas) → nama bagian diambil dari data.
9. **Lembar banding masih menangkap kemiripan yang lolos aturan ≤ 2 soal per keluarga:** dua soal dengan peran berbeda tetapi rupa sama (rantai di analogi dan matriks hitung Paket 2) tetap terasa berulang. Cek banding per paket wajib, bukan hanya pemeriksa.

## Pelajaran produksi Paket 1 TIU nonfigural (2026-10-30) — `tmp/paket1/`, log `riset/2026-10-30-log-tiu-paket1.md`
Cek buta 1: 26/26 jawaban pembaca = kunci, tetapi 5 soal tetap diperbaiki. Cocok kunci ≠ soal bersih.
1. **Kotak/deret tabel: setiap parameter wajib bervariasi di baris contoh.** Dua baris contoh sama-sama berpangkat 3 membuat a^b − b tak terbedakan dari a³ − b. Pemeriksa: SEMUA rumus ≤ 3 operasi yang cocok dengan data wajib memberi X yang sama (bukan sekadar tidak mengenai pengecoh); rumus wajar lain (a + ab − b) yang memberi nilai di luar opsi tetap cacat karena siswa terjebak tanpa jawaban.
2. **Kotak X-Y dua baris:** tiga angka per baris selalu bisa dibaca deret sendiri (6, 10, 12 → selisih dibagi dua). Pakai ≥ 4 kolom diketahui, dan pasang tebakan deret itu sebagai pengecoh bernama.
3. **Analogi hubungan kalimat:** perintah wajib menyebut sisi yang dibandingkan ("ciri tubuh dan tujuannya"); pengecoh boleh meniru kata (duri) tetapi tidak meniru proses (berubah menjadi …).
4. **Kecukupan data himpunan:** "sebagian … sebagian …" terbaca pembagian habis; tulis eksplisit "boleh … atau tidak mengikuti keduanya".
5. **Analitis:** uji "tiap syarat perlu" (tanpa syarat itu hasil opsi berubah) menemukan 2 syarat pajangan yang lolos pandangan mata. Jawaban boleh pasti walau susunan belum tunggal (meja bundar).
6. **Optimasi:** bila paket terbesar juga termurah per satuan, optimum = tepat jumlah minimum dan jebakan "memaksakan jumlah pas" mati; cari harga lewat program sampai optimum melampaui jumlah minimum.
7. **Opsi X-Y:** frekuensi angka dihitung lintas posisi X dan Y; opsi "X dan Y tertukar" menggandakan angka kunci sehingga kunci = irisan angka terbanyak. Tebakan baris sebagai deret sendiri tidak boleh ada di opsi (terbela).
8. **Analogi kalimat:** kunci jangan memakai organ/kata yang sama dengan soal (daun → daun) — tertebak dari parafrase.
9. **Verbal:** kunci terpanjang muncul 2/6 di tulisan pertama; opsi cermin persis kunci (A : B vs B : A) menyempitkan tebakan ke dua opsi → cek panjang + cermin sebelum cek buta.

**Tahap pembahasan (2026-10-30):**
10. Pembahasan disimpan terpisah dari soal (`bahas_*.json`: ditanya, kalimat_kunci, cara_kilat, langkah, opsi_gugur, alasan_kunci, analogi, waspada); preview soal + opsi dirender dari data paket (satu sumber). Pemeriksa `cek_pembahasan.mjs`: frasa khas AI, istilah dapur + kata "jebakan" + kode J-/JF-, "satu-satunya"/"sekaligus", maka/karena itu ≤ 1, opsi gugur = semua huruf selain kunci, angka kunci (keluarga hitung) disebut di alasan.
11. Analitis "pasti benar": hitung semua susunan sah dengan program dulu; pembahasan memakai pembuktian kasus gugur, dan setiap opsi gugur menyebut di susunan mana ia gagal (mis. "hanya di satu dari tiga susunan").
12. Kecukupan data ya/tidak: tulis tegas bahwa jawaban "tidak" yang pasti tetap berarti cukup; contoh tidak cukup selalu berupa dua keadaan sah dengan jawaban berbeda (angka nyata, bukan "bisa berapa saja" saja).
13. Label bagian 7 di buku siswa sementara "Yang sering membuat keliru" (aturan 2026-10-30: tanpa kata "jebakan"); label hanya di render.
14. Simpan paket: `paket/paket-<n>/paket_tiu_<n>.json` + `img/` di folder engine TIU, satu bentuk data untuk nonfigural dan figural; pembahasan figural (teks berlabel dari generator) dipecah ke bagian yang sama; kode + bukti hanya di `reviu`. Pembuat: `tmp/paket1/simpan_paket.mjs`.
15. PDF paket TIU (`tmp/paket1/buat_pdf.mjs`): huruf angka wajib lining (Charter + `font-variant-numeric: lining-nums`; Georgia berangka gaya lama, angka soal hitung tampak naik-turun); soal + opsi satu blok tak terpisah halaman; tag <b>/<i>/<br> dari data diloloskan, sisanya di-escape; minus di sel tabel diganti "−"; gambar pembahasan figural ditanam dengan overflow terlihat, karena label generator bisa lebih lebar dari bidang SVG (58, 60 Paket 1). Cek mata tiap PDF lewat pdftoppm.


## Pelajaran Handbook TIU (2026-10-30) — log `riset/2026-10-30-log-handbook-tiu.md`
- **KCK/analitis T5-21 (2026-11-02):** soal mungkin/tidak mungkin — uji tiap syarat perlu cukup bila ada susunan yang mengubah status satu pilihan (status pilihan salah tidak bisa berubah). Kode pengecoh boleh berulang dalam satu soal bila jenis tanya memaksanya. Perbandingan P–Q tetap 4 pilihan; bocor bentuk melekat pada templat diterima. Cek buta 1: Tugas A 29/29, Tugas B 14/29 — bocor terbanyak di analitis (kata hanya di kunci, topik kunci menyendiri, kunci angka terbesar).
- **Figural Handbook TIU (2026-11-03, 10 contoh Bab 14–18):** cek bocor bentuk gambar = `bocor()` di `k12-spatial-engine/src/tiu-handbook.ts`: kunci bukan paling lain sekilas (≤ 1,15×), bukan paling rata-rata (≥ 0,98× minimum lain), bukan tinta ekstrem sendirian (> 8%), bukan pencilan jumlah bagian/rasio, bukan salinan gambar terlihat. Atas 27 soal TO cek ini menangkap 5 (4 "paling rata-rata") — pakai untuk paket TO berikut. Pelajaran cek mata: tiga bentuk satu keluarga dengan n beda (sabit3/5/6) kembar sekilas → seri wajib `cekBedaObjek`, campur keluarga; luk keris dan awan kecil terlalu tipis untuk dihitung; kerang punya guratan putih → hanya objek besar (petak ≥ 36). `pilih()` generator butuh ≥ 2 atribut, ANA-OBJ 1 objek dirakit langsung.
- **Pembahasan figural Handbook (2026-11-04):** bahan_pembahasan generator hanya kerangka (memuat "satu-satunya", "sekaligus", "Opsi"); tulis ulang per soal di berkas data terpisah, diperiksa script yang sama dengan pembahasan nonfigural. Klaim visual (arah, letak penanda) hanya ditulis bila terlihat pasti di gambar; nama kekeliruan diambil dari tabel bab; cara lain yang cepat untuk soal dua lapis: kerjakan lapis hitung dulu untuk menggugurkan pilihan.
- **Cek buta 1 figural Handbook (2026-11-04, 5/10):** kunci generator benar semua; gagal karena keterbacaan. Pelajaran: (1) objek yang dicermin wajib punya sisi khas (kerang, teratai terbalik), bukan bentuk hampir simetris (teratai kecil, sabit, batu bertumpuk); (2) MTX-PUTAR: arah sel baris 1 ≠ baris 2 sebagai himpunan (`cekLatin`), kalau tidak, terbaca persegi latin; titik pojok membuat kunci = irisan ciri (TO P1–P3 no. 63 kena); (3) soal hitung: kunci bukan pilihan "terbanyak", hindari pilihan dengan semua jumlah sama (3/3/3), butir kecil perlu pilihan ≥ 44 mm; (4) uji 7 irisan ciri (`irisanCiri`) belum menangkap semua tebakan bentuk, jadi cek buta tetap perlu.
- **Contoh Bab 1, 2, 19 Handbook (2026-11-04, T6-12, `scripts/soal_dasar.mjs`, cek buta 1 putaran 5/6):** (1) cek bentuk di script menangkap 2 cacat sebelum cek buta: kunci kalimat tindakan terpendek; pilih susunan dengan kunci paling banyak unsur bersama — pilihan salah dicari otomatis (semua kombinasi per jenis pelanggaran, saring skor `pilih()`), bukan dipilih tangan. (2) Jawaban pemeriksa ≠ kunci karena ia jatuh ke pengecoh bernama (jam hitung mundur dibaca terbalik) bukan cacat soal: kunci terbukti model → cukup perjelas kalimat, tanpa putaran 2. (3) Sebelum mengusulkan "angka ringkasan tetap" (mis. 52 latihan Lampiran A) ke Gusti, jalankan pemeriksanya dulu: angka itu diam-diam ikut menghitung bagian yang dihapus (jadi 41). (4) Angka di pembahasan wajib berasal dari soal/model/rantai hitung; nomor kelompok 1–7 diizinkan.
- **Alur ringkas T5-19 (2026-11-02):** cek bocor bentuk masuk script produksi (bukan menunggu cek buta); cek buta 1 putaran per kelompok, ulang hanya bila jawaban ≠ kunci; pembahasan sesudah soal lolos; putusan diajukan sekaligus dengan rekomendasi.
1. Soal hitung "hasil tepat" dengan opsi rapat: setelah syarat satuan dan sisa bagi 9, uji juga **apit pecahan terdekat** (mis. 2,75 < 2,875 < 3). Bila apit menyisakan hanya kunci, uji lain di pembahasan jadi hiasan dan kunci tertebak dari taksiran. Syarat: taksiran wajar menyisakan ≥ 3 opsi. Bukti: cek buta Contoh 1 Bab 6 (2,875 × 2.120).
2. Pembahasan soal hitung (putusan Gusti 2026-10-31): Langkah Penyelesaian = cara cepat yang dipakai tentor di kelas (bilangan dekat bulat → bulatkan lalu kurangi selisihnya, mis. 3,975 × 1.400 = 4 × 1.400 − 0,025 × 1.400) + satu cara lain + cek balik sisa 9. Jangan menjabarkan taksiran, jalan pecahan, dan alasan teoretis di pembahasan soal; teori tinggal di halaman konsep. Tulis angka utuh (0,025 × 1.400 = 35, bukan 0,025 × 14 = 0,35). Uji angka satuan tidak berlaku langsung pada desimal.
2. Opsi yang semuanya kelipatan satu bilangan (mis. 265) membocorkan langkah ("bagi 8"); lompatan pada deret kelipatan membuat kunci tampak ujung yang rapi.
3. Pengecoh "salah nol/koma bergeser" selalu berselisih kelipatan 9 dari kunci: tidak bisa dipakai bersama syarat "sisa bagi 9 memisahkan semua opsi".
- **T5 verbal Handbook TIU (2026-11-01, 23 soal Bab 3–5, cek buta 4 putaran):** jawaban isi pemeriksa selalu = kunci, tetapi penebak bentuk awal mengenai 20/23. Bocor tersering di silogisme: (1) kunci selalu versi "Ada" dari pasangan Semua/Ada; (2) kunci satu-satunya opsi berbentuk tertentu (kontraposisi, "Tidak semua", "tidak dapat dipastikan"); (3) kunci di satu-satunya pasangan cermin; (4) kunci terpendek/tunggal menyebut tokoh; (5) kunci tunggal berimbuhan sama dengan soal (analogi); (6) frasa fakta = frasa argumen (memperkuat/memperlemah). Obat: setiap bentuk kunci dimiliki ≥1 pengecoh, pasangan cermin kedua di pengecoh, opsi tanpa kuantor ditulis berkuantor; pemeriksa cermin di `HANDBOOK TIU …/scripts/soal_verbal.mjs`. Cek buta tiap putaran pakai subagen BARU (tidak pernah melihat soal) dan hanya membaca berkas `_buta*.json`. Berhenti bila sisa temuan hanya isyarat yang tetap butuh membaca premis.
- **T5 numerik Handbook TIU (2026-11-02, 45 soal Bab 6–10, cek buta 4 putaran, Putusan T5-10 s.d. T5-17):** jawaban isi = kunci (selisih putaran 1 = cacat ekspor pecahan campuran di berkas buta, bukan soal); penebak bentuk awal 22/45. Bocor tersering: (1) pilihan pencilan (×10, salah taruh nol) selalu salah; (2) soal huruf/pasangan nilai: kunci = pilihan paling berbagi unsur, atau gabungan unsur terbanyak per posisi; (3) kunci tunggal berbentuk "rapi" (kelipatan 5 tunggal, satu-satunya pola pindah faktor tepat); (4) tabel dua baris/empat kolom memberi aturan lain yang cocok. Obat yang dijaga mesin (`HANDBOOK TIU …/scripts/soal_numerik.mjs`, `numerik/alat.mjs`): jarak tiap pilihan ke tetangga terdekat ≤ 3 × median jarak bertetangga (T5-16); gabungan unsur terbanyak per posisi wajib pilihan salah, tiap pilihan berbagi ≥1 unsur; pola rapi dimiliki ≥2 pilihan; tabel ≥3 baris lengkap, aturan pesaing ≤3 operasi diuji brute force. Kode pengecoh rencana boleh diganti bila jalurnya tidak wajar/membuat pencilan, asal tercatat (T5-11). Pilihan angka urut naik → huruf kunci = peringkat nilai: sebelum mengusulkan tukar huruf kunci, cek aturan urut; keseimbangan dijaga per kelompok, bukan per bab (T5-13). Ekspor berkas buta wajib menampilkan pecahan/pangkat seperti di PDF.

## File & script
| Path (di `GENERATE SOAL TERBARU SKD 2026/`) | Isi |
|---|---|
| `index.html`, `js/bank-soal.js`, `js/pembahasan.js` | CAT deret angka tabel 30 soal; validasi `node test/validate-bank.js` |
| `scripts/build-kecukupan-data.js`, `-paket2.js` | 2 × 10 soal kecukupan data + PDF |
| `scripts/build-suku-pasangan.js` | 15 suku ke-n + 15 pasangan (level 4–7) |
| `scripts/build-deret-tabel-lv56.js` | 15 deret tabel level 5–6 |
| `Modul Soal SKD BKN & Psikotes POLRI Kedinasan 2026.pdf` | 10 hlm, penuh (sesi 1, `riset/sesi-01.md`): 50 soal pihak ketiga (bukan BKN), kunci A 39/50, **10.4 kunci salah** (Alif = Rp120.000 = D), 9.1 "harus lulus" → opsi "lulus" melampaui premis, templat per kategori berulang. Tidak dipakai sebagai acuan |
- Repo: https://github.com/gustiyuda14-source/CAT-TIU-DERET-TABLE-2026 (GitHub Pages, `main`).
- Kunci per paket tercatat di `memory.md` folder itu.

## Celah / belum dibaca (kandidat sesi belajar)
- `REFERENSI LUAR/TIU002 - Kunci  Pembahasan.pdf` (17 hlm): "Paket TIU 002 — Model FR SKD 2026" — petakan tipe soal FR 2026.
- `REFERENSI LUAR/EBOOK PEJUANG KEDINASAN /Ebook TIU Verbal dan Figural Pejuang Kedinasan.pdf` (124 hlm), `Ebook TIU Numerik Pejuang Kedinasan.pdf` (64 hlm).
- Verbal & figural sudah ada di `tiu-verbal-figural.md` (dari PSI); perlu dicocokkan dengan bahan SKD di sesi 3–4.

## Pelajaran tahap akhir Handbook TIU (2026-11-05)
- Gambar penjelas: cek mata tetap wajib sesudah assert lulus. Assert membuktikan benar, tidak membuktikan terbaca: dua daun gemuk yang berbeda arah lolos assert tetapi tampak sama.
- Bentuk simetris atau gemuk tidak cocok untuk memperlihatkan arah; pakai bentuk ramping atau bentuk tidak simetris.
- Isi yang dicetak ulang diambil lewat script dari kartu asalnya, bukan disalin, supaya perbaikan soal ikut terbawa.
- Akhiri tahap PDF dengan satu pemindaian seluruh berkas siswa: teks tempat kosong, catatan pengajar, kode penyusun, kata larangan, tautan patah, gambar hilang.
- Daftar isi buku PDF: nomor halaman dibaca dari PDF oleh build, bukan diketik, dan judul dicek sama dengan judul bab. Pakai cara ini untuk handbook lain.
