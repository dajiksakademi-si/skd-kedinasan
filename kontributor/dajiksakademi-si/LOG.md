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
