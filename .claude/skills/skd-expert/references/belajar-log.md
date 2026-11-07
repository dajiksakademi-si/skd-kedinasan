# Log belajar Lead Instructor SKD

Format per sesi: nomor, topik, tanggal; file yang dibaca (penuh/inti); reference yang berubah; file riset; usulan dibuat/diterima/ditolak; pertanyaan untuk Gusti.

## Sesi 0 — build awal · 2026-10-25
- Dibaca: lihat `references/bahan.md` (status per file). Engine TWK & TKP bagian inti, pedoman TIU penuh, handoff TWK, project memory TKP inti, halaman 1 TWK-01 & TIU002.
- Dibuat: `SKILL.md`, references `aturan-tetap`, `domain-skd` (belum diverifikasi), `twk`, `tkp`, `tiu`, `bahan`, `belajar-log`; `cek.py`; skill `skd-belajar` + `kurikulum.md` (7 sesi).
- Polanya meniru Agent PSI (`~/.claude/skills/psi-expert`, `psi-belajar`) atas pilihan Gusti.
- KONFLIK: metode PDF TIU (Chrome CLI) vs TKP (larangan Chrome CLI).
- RESOLUSI: flag yang dilarang adalah `--print-to-pdf-no-header` (palsu). Dicatat di aturan-tetap D.
- Usulan: belum ada.
- Untuk Gusti: sesi 1–7 dipicu manual `/skd-belajar` (1 sesi per hari).

## Tambahan sesi 0 — salin ilmu TIU verbal & figural dari Agent PSI · 2026-10-25
- Perintah Gusti: verbal & figural disalin dari psi-expert.
- Dibaca: `psi-expert/references/pedoman-soal.md` + `modul-kecerdasan.md`, PEDOMAN_SIMULASI_KECERDASAN §3–5, `02-kecerdasan-drill-taxonomy.md` §1.1/1.3/1.5/3/4, RULES GENERATE SOAL SPASIAL, `pola-findings.md` §4, memory k12-spasial & jaring-kubus.
- Dibuat: `references/tiu-verbal-figural.md`. Diubah: `tiu.md`, `SKILL.md` (peta), `bahan.md`.
- Dibuang (khusus psiko-cat): field DB, nomor paket, A-7 unsur kepolisian, butir 2 kunci sebagai aturan default.
- KONFLIK: format pembahasan 2 paragraf PSI vs gaya guru les SKD.
- RESOLUSI: sementara digabung (inti 2 paragraf + preview + jebakan). Menunggu keputusan Gusti.

## Tambahan sesi 0 — rapikan BIG DATA + analisis Al Faiz TIU · 2026-10-25
- Keputusan Gusti: pembahasan TIU murni gaya SKD (aturan C-1a); semua bahan belajar ke `BIG DATA/` (B-11).
- Folder dipindah: 3 folder engine/TIU → `BIG DATA/`; ebook, TWK-01, TIU002 → `BIG DATA/REFERENSI LUAR/`; 9 screenshot → `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/`. Path skill + `cek.py` (ROOT = BIG DATA) disesuaikan.
- Riset: `riset/2026-10-25-al-faiz-tiu.md` (9 soal, kunci dihitung ulang dengan python, semua benar; 5 jenis cacat konstruksi).
- Reference berubah: `tiu.md` (pasangan pembagian, cermin, konteks konsisten, pengecoh suku ke-n), `tiu-verbal-figural.md` (resolusi pembahasan, premis izin, analogi kalimat), `aturan-tetap.md` (B-10, B-11, C-1a).
- Dibuat di project: `CLAUDE.md` (pedoman), `memory.md`.

## Tambahan sesi 0 — logika TIU 2026 + engine TIU D'AJIKS · 2026-10-25
- Bahan: Al Faiz 43–45, 47–49 (12 screenshot → `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/`), label tipe + kunci TIU002.
- Riset: `riset/2026-10-25-tiu-2026-logika-celah.md`. Temuan: blueprint 2026 (verbal–logika 15 / KCK 5 / pola 8 / hitung 7, figural 0 di kedua sumber); celah C1–C7; **Al Faiz 49 cacat** (pompa awal tidak disebut → kunci ketat E, bukan A); opsi KCK "Salah satu pernyataan SAJA cukup" tidak saling meniadakan.
- Dibuat: engine `CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/ENGINE_GENERATE_SOAL_TIU.md` (v0.1 draf, gaya 3K, Kamus Jebakan 20 kode, G1–G8, 2 contoh terverifikasi python).
- Reference berubah: `tiu.md` (pointer engine; aturan berderet direvisi mengikuti blok ujian), `SKILL.md`, `bahan.md`.
- Pertanyaan untuk Gusti: porsi level Standar 30 / HOTS 50 / HOTS+ 20 di engine — setuju?
- (lanjutan) Al Faiz 50–53, 55 disimpan + catatan cepat di riset §8: **52 cacat** (stem sudah menyamakan beban → kunci ketat A, bukan C); 51 opsi D "atau" benar harfiah; 55 kokoh (brute force 4 tafsir → E). Analisis penuh + revisi engine (aturan G3 baru) = tugas sesi berikutnya.

## Tambahan sesi 0 — analisis penuh Al Faiz 50–55 + engine TIU v0.2 · 2026-10-25
- Checkpoint 1: riset §8 diganti dengan analisis penuh (vonis, celah, jebakan per opsi). **52 cacat** (kunci ketat A; D "atau" juga benar harfiah); 51 gagal G4 (B dan D benar); 50 sah, set opsinya cacat; 53 sah, J-BASIS murni 3.500 tidak dipasang; 55 kokoh. Celah baru C8 templat berulang (48/50/52). KCK Al Faiz ≥ 7 dari 35 (TIU002 = 5).
- Checkpoint 2: engine **v0.2** (G3 stem tidak menjawab pernyataan; J-BASIS; anti-templat berulang di Pilar 2 + G8 + field `kerangka`; bukti 4 set bunyi KCK di Pilar 5). Sinkron: `tiu.md`, `bahan.md`, `memory.md` root. Blueprint tidak diubah.
- Porsi level Standar 30 / HOTS 50 / HOTS+ 20: **ditunda Gusti**, dibahas di sesi lain.
- Sesi berikutnya: riset TIU lanjutan dari dokumen contoh soal baru (prompt sudah diberikan ke Gusti).

## Tambahan sesi 0 — analisis Al Faiz 56–65 (blok figural) · 2026-10-25
- Checkpoint 1: 15 screenshot → `REFERENSI LUAR/AL FAIZ TIU 2026-10-25/soal-56…65*.png`. Riset: `riset/2026-10-25-al-faiz-56-65-tiu.md`.
- **Figural ada**: 57–60, 63–65 (7 terlihat; 61–62 tidak terlihat, kemungkinan figural). TIU002 = 0 → blueprint tidak konvergen (figural 0 vs 7–9, pola 8 vs 3).
- Vonis: 58, 59, 63, 64 kokoh; 56 sah tapi syarat (2) mati (C9 baru); 57 kunci melanggar mekanisme stimulus (C10 baru); 60 sah, aturan lemah; **65 cacat** (baris 3 rotasi 180°, baris 1 cermin → A bisa dibela).
- Checkpoint 2: engine **v0.3** — Pilar 4 ANA "setiap syarat menggugurkan ≥ 1 opsi" (C9, bukti 56); catatan bukti figural di Pilar 2 (porsi FIG tetap 0, menunggu Gusti). C10 tidak butuh aturan baru (sudah ditutup G2 + invarian PSI §7). Blueprint tidak diubah. Sinkron: `tiu.md`, `bahan.md`, `memory.md` + `CLAUDE.md` root (tabel engine v0.1 → v0.3).
- Keputusan untuk Gusti: porsi figural di blueprint (Al Faiz ±9, TIU002 0).

## Tambahan sesi 0 — Al Faiz TWK 3–12 vs MR BADRUN · 2026-10-25
- Bahan: 10 screenshot → `REFERENSI LUAR/AL FAIZ TWK 2026-10-25/`. Engine MR BADRUN v1.3 dibaca penuh (Pilar 1–6, prosedur, Gerbang 1–4, larangan).
- Riset: `riset/2026-10-25-al-faiz-twk.md`. Vonis: kunci semua benar fakta; 9 kokoh; 4 lemah (G3); 5 bocor bentuk; 8 bocor cocok-kata; 6 mengulang stem; 7 konstruk bergeser; 12 D tidak salah total (pengawasan internal MA — pasal belum diverifikasi).
- Engine TWK tidak diubah. Usulan menunggu Gusti: aturan soal negatif, bentuk matriks kewenangan.
- Opsi D soal TIU 63 dilengkapi (14) → 63 kokoh penuh.
- (lanjutan) Pembanding kedua engine Viracun (dibaca penuh) → riset §7. Lulus Viracun 4/10, MR BADRUN 1/10. Usulan soal negatif + matriks kewenangan sudah ada di Viracun (E4 kecuali, E6). Temuan: resep E2 / Tipe 2 panduan murid "hindari ekstrem" menyesatkan di Al Faiz 10–11. Tidak ada engine yang diubah.

## Tambahan sesi 0 — Pejuang Kedinasan TWK vs MR BADRUN · 2026-10-25
- Dibaca: TWK-01 (pdftotext, 30 soal diurai; isi 8 soal dicek), Ebook TWK (Trik HOTS hlm 3–4, 71 soal diurai, Bab 1 soal 1.1–1.6). Materi 9 bab ebook belum.
- Riset: `riset/2026-10-25-pejuang-kedinasan-twk.md`. Ukuran mekanis 3 sumber (Al Faiz, TWK-01, ebook). Temuan: "pilih terpanjang" 18% di TWK-01 vs 56% di ebook; TWK-01 memakai label Viracun; ebook tanpa D5 cocok-kata; Pejuang Kedinasan punya jebakan peran (P2) + prosedur (P4) yang MR BADRUN belum punya.
- Engine tidak diubah. Usulan menunggu Gusti.

## Tambahan sesi 0 — MR BADRUN v1.4 · 2026-10-25
- Atas izin Gusti ("eksekusi usulan yang perlu"): engine TWK v1.3 → **v1.4**. Pilar 3 jadi 8 resep: D7 di luar peran, D8 tahap lain + uji khusus nol opsi salah; aturan soal kewenangan lembaga; Gerbang 4 tambah cek D7/D8. Resep slot ke-4: D1/D6/D7/D8.
- Validator `tmp/validate_bank_100.mjs` regex D1–D6 → D1–D8; bank 100 tetap 0 error/0 warning.
- Ditolak: soal negatif "kecuali" (bertentangan nol opsi salah). Belum disentuh: panduan murid Tipe 2 "Jangan pilih yang terlalu ekstrem" (heuristik menyesatkan di Al Faiz 10–11).
- Cek Tipe 2 sebelum ubah: bank 100 punya 19 soal E2, trik "dua sisi + ada caranya" benar 19/19 (kedua kutub selalu sah karena L2 wajib). Gagal di soal luar: Al Faiz 11 (bukti kuat), Al Faiz 10 (bukti lemah). Atas izin Gusti, `PANDUAN_MURID_TWK.md` Tipe 2 diberi langkah "Cek dulu: kedua sisi sama-sama boleh?" + ringkasan akhir diberi pengecualian. Salinan trik lama masih ada di `index.html` (halaman siswa) dan E2 engine lama — belum diubah.

## Tambahan sesi 0 — satu engine per subtes · 2026-10-25
- Perintah Gusti: hapus engine usang, fokus satu engine utama. Inventaris: TKP 1 engine (v1.2), TIU 1 engine (v0.3; repo GENERATE SOAL TERBARU SKD 2026 = aplikasi aktif, tetap), TWK 2 engine.
- Engine lama TWK gaya Viracun masih dipakai sebagai label tipe E1–E8 (bank 100, panduan murid, index.html) → label dipindah ke **Lampiran MR BADRUN v1.4** (E2 + cek kutub sah; E4 "kecuali" dibuang; E5/E8 tunduk nol opsi salah), lalu file lama dipindah ke Trash macOS (`~/.Trash/ENGINE_GENERATE_SOAL_TWK-2026-10-25.md`, bisa dipulihkan).

## Tambahan sesi 0 — MR BADRUN v1.5 (gaya penulisan) · 2026-10-25
- Gusti: bank 100 bagus tapi terbaca AI karena "tidak hanya … tetapi juga" di semua soal. Diukur: 100/100; kunci satu-satunya opsi berkata sambung dua sisi 22 soal.
- TWK-01 Pejuang Kedinasan dibaca ulang (22 soal) untuk gaya → riset pejuang §8. Diterapkan v1.5: T1–T5, lensa L3, Pilar 4 no. 9, Pilar 5 kesetaraan kekonkretan, kategori AKIBAT, sudut pandang "Anda", Gerbang 2/4 diperluas. Validator: 2 cek baru sebagai warning (bank 100: 0 error, 23 warning).
- Belum: menulis ulang bank 100 ke v1.5.

## Tambahan sesi 0 — peta paket = komposisi SKD · 2026-10-25
- Perintah Gusti: paket baku ikut komposisi SKD — TWK 30, TIU 35, TKP 45. TKP diubah dari paket 30 → 45 (dimensi 9/9/7/7/6/7, level 27/18, jangkar ≥ 18, kunci 7–11, penutup maks 7×). TWK 30 dibuat pasti (tema 9/7/6/4/2/2, level 6/15/9, jangkar ≥ 9). TIU 35 blueprint tetap; level 30/50/20 = 10–11/17–18/7 (pembulatan, porsi final menunggu Gusti).

## Tambahan sesi 0 — revisi bank TWK 100 ke v1.5 (mulai) · 2026-10-25
- Perintah Gusti: perbaiki bank 100 lalu pecah jadi 3 paket TWK siap pakai, kualitas HOTS tetap. Checkpoint rinci di `memory.md` root. Selesai 001–013; validator naik ke aturan v1.5.
- Temuan bank lama: kunci mengulang kedua kutub harfiah (001A, 003E), pembahasan lama memakai "belum menjamin" (melanggar Gerbang 3), RELASI 007 tanpa "dipahami sebagai".
- Lanjutan 2026-10-25: batch 026–050 bank TWK 100 ditulis ulang ke v1.5 (patch_026_050.json, 0 error). Sebaran 001–050: T1 12 · T2 14 · T3 11 · T4 2 · T5 11, "tidak hanya" 6. Berikutnya 051–075 (integritas → T4).
- Lanjutan 2026-10-25: batch 051–075 ditulis ulang ke v1.5 (patch_051_075.json, 0 error). Integritas 12/20 T4 sudut pandang "Anda". Pelajaran: tekanan T4 lama sering berupa perintah melanggar aturan (kampanye, ancaman, pertahankan angka salah) → bukan dua kutub sah; diganti tekanan sah (tenggat, perasaan warga, nama baik unit). Sebaran 001–075: T1 14 · T2 19 · T3 15 · T4 14 · T5 13, "tidak hanya" 7. Berikutnya 076–100.
- Lanjutan 2026-10-25: batch 076–100 ditulis ulang ke v1.5 (patch_076_100.json, 0 error; bank penuh 0 error). Pelajaran: soal kewenangan lama cocok-kata (081 kunci satu-satunya "amnesti" → kini pengecoh rumusan Pasal 14 lama juga ber-"amnesti"); 076 lama keliru prosedur ("warga mengusulkan lewat wakil", padahal usul ≥ ⅓ anggota MPR); 089 lama menyalin Contoh Terbimbing engine; 086/087 lama kembar dengan 027/030 dan 080 → konstruk diganti. Validator hanya cek "ada kata sambung lain", belum cek kata sambung yang **sama** (Pilar 4 no. 9) — dicek manual. Sebaran bank: T1 20 · T2 23 · T3 24 · T4 16 · T5 17, "tidak hanya" 8. Berikutnya: soal Bahasa ke-101 + pecah 3 paket (sesi baru).
- Lanjutan 2026-10-25 (sesi baru): mulai selaraskan metadata 076–100 (subtema 086/087, jangkar 095). Temuan: jangkar 089/093 bertumpu pada PERPRES8_2026 yang belum diverifikasi, stemnya tanpa pasal/sejarah; subtema 088/095 tertinggal dari stem baru. Menunggu persetujuan Gusti.
- Tahap 1 selesai: subtema 086/087 + jangkar 095 lewat patch, bank penuh 0 error, jangkar 72. Temuan 088/089/093/095 menunggu keputusan Gusti.
- Tahap 2 selesai: soal 101 (penulisan bilangan, T2, C4, kunci D), bank 101 lulus validator 0 error. Pelajaran: kaidah gabungan kata/bentuk terikat dihindari karena sudah jadi pengecoh 097; pengecoh D1 E8 bisa berupa contoh kalimat hasil (bukan kaidah). Rumusan EYD V belum diverifikasi ke dokumen.
- Tahap 3 peta: pecah_paket.py lolos assert (seed 2027). Pelajaran: daftar kembar di memory belum mencakup pola kunci berulang lintas batch (001/009/015/027/030 'uji rancangan pakai Pancasila'); cek Jaccard konstruk+kunci per paket sebelum peta disetujui.
- Tahap 3 selesai: 3 paket × 30 + cadangan 11 ditulis (seed 2027), semua batas Pilar 6 di-assert.

## Sesi 1 — Domain resmi SKD 2026 · 2026-10-27
- Dibaca: `GENERATE SOAL TERBARU SKD 2026/Modul Soal SKD BKN & Psikotes POLRI Kedinasan 2026.pdf` (penuh, 10 hlm); PermenPANRB 6/2024 Pasal 30–31, 69–70 (naskah resmi JDIH, eksternal).
- Usulan lama: U-4 (2026-10-27) belum dicentang Gusti → dibiarkan. Usulan lain sudah selesai.
- Riset: `riset/sesi-01.md`. Modul = 50 soal pihak ketiga; kunci A 39/50; 10.4 kunci salah (hitung ulang python); 9.1 kesimpulan melampaui premis "harus".
- Reference berubah (internal): `tiu.md` (status + vonis modul), `bahan.md` (status baca).
- Usulan dibuat: `usulan/2026-10-27.md` U-2026-10-27-05 s.d. 08 (27/2021 dicabut 6/2024; aturan peringkat TKP→TIU→TWK; ambang CPNS 2025/2026 belum ada; formasi kedinasan 2026). Diterima/ditolak: belum ada.
- Untuk Gusti: centang U-05 s.d. U-08 (dan U-4 lama).
