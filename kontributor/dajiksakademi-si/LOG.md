# LOG — dajiksakademi-si (Gusti)

## 2026-11-07
- Ubah: seluruh folder — folder PROJECT SKD KEDINASAN dijadikan repo privat `skd-kedinasan` untuk pilot kolaborasi — putusan Gusti (8 butir, "setuju semua").
- Tambah: `README.md`, `CHANGELOG.md`, `.gitignore`, `pedoman/ETIKA-KERJA.md`, `kontributor/`, `skills/` (salinan skd-expert + dajiks-handbook), `.github/` (templat usulan perubahan + pemeriksaan catatan kontributor).
- Ubah: `CLAUDE.md` — tabel isi folder + aturan wajib catat kontributor.
- Status: selesai. Berikut: undang kontributor (username GitHub dari Gusti).
- Ubah: `README.md`, `kontributor/README.md`, `CLAUDE.md` — alur kerja jadi push langsung ke `main` — putusan Gusti.
- Undang: AcademyBRIJ (izin tulis).
- Perbaiki: folder `CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI ` (spasi di akhir) diganti tanpa spasi — clone gagal di Windows (nama folder berakhiran spasi tidak sah). Rujukan path di CLAUDE.md, skill skd-expert, `build-to.cjs` ikut diperbarui.
- Perbaiki: script bisa jalan di perangkat mana pun — `build-to.cjs`, `cek.py` (repo + skill asli), 3× `build.py` handbook, `buat_pdf.js`, `ratakan_sampul.js` tidak lagi memakai alamat Mac; `package.json` akar (puppeteer membawa Chrome sendiri, `npm install`). Diuji: PDF + sampul + data portal OK, cek.py selftest OK.
- Perbaiki: `.gitignore` — `tmp/` ternyata bahan kerja (paket TKP 1–2, validator TWK, Paket 1 TIU) → ikut repo; `buat_pdf.js` + `gaya_halaman_tiu.html` dari prototipe ikut; `.claude-flow/` (sesi alat lama) keluar.
- Tambah aturan CLAUDE.md: nama file/folder sah di Windows; script tanpa alamat komputer tertentu.
- Ubah: skill pindah `skills/` → `.claude/skills/` (dimuat otomatis Claude Code kontributor); tambah skd-belajar, impeccable (tanpa program khusus Mac), ui-ux-pro-max, emil-design-eng, taste-skill, markitdown; plugin ponytail + superpowers di `.claude/settings.json`. `cek.py` disesuaikan, selftest OK.

## 2026-11-08
- Ubah aturan pembahasan semua subtes (putusan Gusti): to the point, kunci di awal, tanpa Analogi dan Kekeliruan yang Mungkin Terjadi — CLAUDE.md, memory.md, skill skd-expert (SKILL.md, aturan-tetap C-1/C-3; salinan repo + asli).
- Figural TIU: prototipe rupa baru (SERI-KUADRAN tema bahari, aset codex bertekstur) disetujui; aturan kesulitan baru (ciri menonjol tidak menyaring, pembeda di ciri halus, anti-tebak nilai terbanyak). Akan diterapkan ulang ke Paket figural 1–3. Rincian: `.claude/skills/skd-expert/riset/2026-10-28-log-engine-figural-tiu.md` bagian 2026-11-08.
- 2026-11-08 · TIU figural kerja ulang langkah 1: mesin bertema (k12-spatial-engine src/tiu-tema.ts, tiu-tema-jenis.ts, tiu-tema-cek.ts, aset-tema/), mode CLI `tema`; P1 no. 57 bahari diport. Aset 8 tema lain menunggu izin codex.
- 2026-11-08 · TIU figural bertema: P1 no. 58 SERI-P3 dapur jadi; aset digambar lewat k12-spatial-engine/aset-tema/gambar.py (codex tidak diizinkan). Pelajaran di references/tiu.md.
- 2026-11-08 · Pelajari ulang Al Faiz Paket 41 no. 57/64/65 (bahan di BIG DATA/REFERENSI LUAR/AL FAIZ TIU 2026-11-08/): dua jenis belum ada (seri sifat bersama, matriks pola geser); pelajaran cara membahas ke references/tiu.md.
- 2026-11-08 · Pelajari ulang Al Faiz Paket 41 no. 62 + 65 dengan pembahasan resmi: koreksi analisis no. 65 (aturan konsisten, bukan cacat), koreksi atribusi no. 62 (BEDA-TUMPUK), gaya pembahasan beranotasi. Rincian di log figural.
- 2026-11-08 · Putusan Gusti: tiap paket figural wajib memuat 9 jenis Paket 41, urutan bebas.
- 2026-11-08 · TIU figural bertema: Paket 1 lengkap 9 jenis (termasuk jenis baru seri sifat bersama dan matriks pola geser), aset digambar lewat aset-tema/gambar.py, gambar pembahasan beranotasi. Draf, menunggu penilaian Gusti. Rincian di log figural skill.
- 2026-11-08 · TIU figural: catatan Gusti untuk Paket 2 (lengkung lebih mulus seperti buatan manusia), Al Faiz dibaca ulang, cara gambar lengkung baru + prototipe 1 soal Paket 2; soal 58 Paket 1 diberi gambar pembahasan.
- 2026-11-08 · TIU figural: Paket 2 bertema lengkap 9 jenis dengan lengkung mulus yang disetujui Gusti; draf, menunggu penilaian. Rincian di log figural skill.
- 2026-11-08 · Putusan Gusti: semua perubahan figural (mesin tema, aset, Paket 1–2, catatan) DISIMPAN di working tree, commit/push DITAHAN sampai Gusti memerintahkan. CHANGELOG diisi satu baris.
- 2026-11-09 · Proposal Kelas Offline Kedinasan 2027: slide baru hlm 7 "E-book handbook CEST D'Ajiks" (Listening 76 · Reading 112 · Writing 94 hlm, sampul + halaman dalam dari PDF dajiks-cest), nomor halaman sesudahnya digeser, PDF dicetak ulang (10 hlm).
- 2026-11-09 · Proposal Kelas Offline 2027 hlm 10: tambah paket bundling (paket lengkap + kelas TKBI online Basic & Intermediate, +Rp500.000 = Rp8.500.000), jarak halaman dirapatkan, PDF dicetak ulang.
- 2026-11-09 · Proposal hlm 10: kartu bundling jadi kartu biru (gaya kartu harga), isi ±30 pertemuan Zoom, mulai Desember 2026, free konsultasi; PDF dicetak ulang.
- 2026-11-10 · Putusan Gusti: peran Badrun jadi reviewer ahli (koreksi soal lewat lembar koreksi, tanpa repo); dicatat di kontributor/AcademyBRIJ/memory.md. Draf balasan WA + format lembar koreksi disiapkan di percakapan.
- 2026-11-10 · Tambah: `reviu/` (server.js tanpa dependensi + index.html), `npm run reviu`, baris di CLAUDE.md + CHANGELOG. Reviewer pilih jawaban dulu lalu kunci/nilai muncul, beri status + masalah + usulan; simpan otomatis ke reviu/hasil/<paket>/<reviewer>.json; Kirim = commit + push + baris LOG reviewer. Diuji: API, tampilan terang/gelap/ponsel, Kirim di repo uji. Belum di-commit.
- 2026-11-10 · TWK TO Paket 1 ditulis ulang gaya Al Faiz (soal 3 kalimat ±39 kata, 24 soal non-Bahasa) di `BIG DATA/CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/tmp/gaya-alfaiz/`; validator 0 galat; pembahasan menunggu persetujuan soal; paket ditambahkan ke halaman reviu; pelajaran ke references/twk.md (asli + salinan repo).

- 2026-11-10 · Pembahasan TWK TO Paket 1–3 (v16 + gaya Al Faiz P1) disesuaikan putusan 2026-11-08: bagian Analogi dan Jebakan dihapus, kunci disebut di awal, ditutup "Alasan kunci". Validator 0 galat keempat file.
- 2026-11-10 · Pembahasan TWK TO dibuat lebih ringkas atas permintaan Gusti: label "Yang ditanya", "Cara cepat", "Kenapa pilihan lain gugur", "Alasan kunci" dihapus; urutan tetap, baris pertama "Kunci: X.", baris akhir "X tepat karena …". Validator 0 galat.
- 2026-11-11 · TWK P1 gaya Al Faiz: 24 pembahasan ditulis ulang mengikuti soal baru (tmp/gaya-alfaiz/pembahasan_p1.json, diterapkan terapkan.mjs); kalimat gugur semua paket diawali "Pilihan X". Validator 0 galat.
- 2026-11-11 · PDF TWK Paket 1 gaya Al Faiz dipisah soal/pembahasan (tmp/gaya-alfaiz/pdf/, 14 + 21 hlm) lewat tmp/gaya-alfaiz/buat_pdf.mjs, tampilan meminjam PDF TKP. Untuk reviu Pak Badrun.
- 2026-11-11 · TWK P2–P3 gaya Al Faiz atas perintah Gusti: soal non-Bahasa dipendekkan (P2 23 soal, P3 22 soal + pembahasan 034; median 39 dan 41 kata, maks 49), pembahasan ditulis ulang mengikuti soal baru (ubah_p2/p3.json, pembahasan_p2/p3.json → paket_twk_2/3.json). Kunci tidak diubah. Validator 0 galat (peringatan 12/14). PDF P2 14+21 hlm, P3 15+21 hlm. Pembahasan P1 DAJ-TWK-109 dirapikan (kalimat gugur diawali "Pilihan A").

- 2026-11-11 · Commit + push TWK gaya Al Faiz Paket 1–3 (soal, pembahasan, PDF soal/pembahasan terpisah), halaman `reviu/`, dan aturan pembahasan tanpa Analogi/Jebakan. Prompt reviu terpandu untuk Badrun disiapkan (dikirim Gusti lewat WhatsApp). Perubahan TIU figural sengaja tidak ikut.
