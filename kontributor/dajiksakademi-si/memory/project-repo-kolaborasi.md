---
name: project-repo-kolaborasi
description: "Folder PROJECT SKD = repo privat dajiksakademi-si/skd-kedinasan, pilot kolaborasi; aturan isi + wajib catat kontributor"
metadata:
  node_type: memory
  type: project
  originSessionId: ac021a5b-c6b4-45da-bc75-5e72d8f17e7b
  modified: 2026-11-07T13:26:11.309Z
---

Putusan Gusti 2026-11-07 ("setuju semua", 8 butir): folder PROJECT SKD KEDINASAN sendiri jadi repo git privat `skd-kedinasan` di akun GitHub **dajiksakademi-si** (pilot proyek bersama banyak orang).

- Ikut: engine, bank json, script, sumber handbook (src/scripts/aset/reports), portal landing + dokumen, proposal kelas offline, CLAUDE.md, memory.md, skill di `.claude/skills/`, `pedoman/ETIKA-KERJA.md` (dari CLAUDE.md global tanpa bagian tagihan Vercel), memori Gusti di `kontributor/dajiksakademi-si/`.
- 2026-11-07 koreksi: `tmp/` = bahan kerja inti (paket TKP 1–2, validator TWK, Paket 1 TIU) → IKUT repo. Folder TWK diganti nama tanpa spasi akhir (clone Windows gagal). Script dibuat portabel; cetak PDF = `npm install` di akar (puppeteer). Prototipe hanya `buat_pdf.js` + `gaya_halaman_tiu.html` yang ikut.
- Tidak ikut (.gitignore): REFERENSI LUAR, SOAL PAKET 41 AL FAIZ, PDF, HTML cetak handbook, prototipe (kecuali 2 file), .claude-flow, node_modules, .mov, RENCANA BISNIS KELAS 2027, 4 repo lama (tetap publik di gustiyuda14-source, ditautkan di README).
- Kontributor wajib isi `kontributor/<username-github>/memory.md` + `LOG.md`; diperiksa GitHub Action `catatan-kontributor` (tanda merah, tidak memblokir — akun gratis).

- 2026-11-07: skill pindah ke `.claude/skills/` (+ skd-belajar, impeccable tanpa bin Mac, ui-ux-pro-max, emil-design-eng, taste-skill, markitdown) dan dimuat otomatis; plugin ponytail + superpowers di `.claude/settings.json`. Sinkron: rsync ~/.claude/skills/<skill> → .claude/skills/ sebelum push.
- Kontributor diundang (izin write): AcademyBRIJ (2026-11-07). Alur: clone → `git pull` tiap mulai → isi LOG → commit + push langsung ke main (putusan Gusti 2026-11-07, README/CLAUDE.md sudah diubah).

**Why:** pilot kolaborasi, orang lain harus ikut cara kerja Gusti.
**How to apply:** salinan skill di repo = snapshot; bila skill di ~/.claude/skills diubah, sinkronkan ke `skills/` sebelum push. Akun gh CLI aktif bisa berbeda — cek `gh auth status`. Terkait [[feedback-catat-rules-gusti]].
