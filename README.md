# SKD Kedinasan — D'Ajiks Akademi

Pilot proyek bersama: engine soal TWK · TIU · TKP, bank soal, handbook, dan portal tryout D'Ajiks Akademi. Repo privat.

## Wajib dibaca sebelum bekerja
1. [`pedoman/ETIKA-KERJA.md`](pedoman/ETIKA-KERJA.md) — etika kerja global (jujur langsung, kerjakan hanya yang diminta, perubahan seperlunya, catat di memori).
2. [`CLAUDE.md`](CLAUDE.md) — pedoman proyek, pedoman soal dan pembahasan.
3. [`memory.md`](memory.md) — keputusan Gusti yang berlaku lintas tugas.
4. [`kontributor/README.md`](kontributor/README.md) — **wajib catat** `memory.md` + `LOG.md` di folder sendiri.

## Mulai
```bash
git clone https://github.com/dajiksakademi-si/skd-kedinasan.git
cd skd-kedinasan
# alat cetak PDF/sampul handbook (perlu Node.js; Chrome ikut terunduh otomatis)
npm install
# buat folder catatan sendiri (nama = username GitHub)
mkdir -p kontributor/<username> && touch kontributor/<username>/{memory.md,LOG.md}
```
**Skill dan plugin terpasang sendiri.** Semua skill proyek ada di `.claude/skills/` (skd-expert, skd-belajar, dajiks-handbook, impeccable, ui-ux-pro-max, emil-design-eng, taste-skill, markitdown) dan otomatis dimuat Claude Code saat folder repo dibuka; `git pull` ikut memperbaruinya. Plugin `ponytail` + `superpowers` didaftarkan di `.claude/settings.json` — saat pertama membuka repo, setujui (trust) folder dan pasang plugin yang ditawarkan.

Path `~/.claude/skills/<skill>/...` yang disebut di dokumen = `.claude/skills/<skill>/...` di repo ini.

Alur kerja (push langsung ke `main`, putusan Gusti 2026-11-07):
1. Setiap mulai kerja: `git pull`.
2. Kerjakan di perangkat sendiri.
3. Setiap selesai satu perubahan: isi `kontributor/<username>/LOG.md` (+ `memory.md` bila ada putusan baru) → `git add -A && git commit -m "<apa yang diubah>" && git push`.
4. Push ditolak karena ada perubahan orang lain → `git pull`, satukan, lalu push lagi.

## Tidak ada di repo ini
- Bahan pihak luar (`REFERENSI LUAR`, paket Al Faiz, ebook) — dianalisis, tidak disalin.
- PDF dan HTML hasil cetak, prototipe, video — dicetak ulang dari `src/`; minta ke Gusti bila perlu.
- Rencana bisnis internal.
- Repo terpisah (publik, akun gustiyuda14-source):
  - CAT TIU deret tabel: https://github.com/gustiyuda14-source/CAT-TIU-DERET-TABLE-2026
  - CAT TKP: https://github.com/gustiyuda14-source/dajiks-akademi-tkp-session
  - CAT TWK: https://github.com/gustiyuda14-source/dajiks-akademi-twk-session
  - Materi TWK 6 Juni: https://github.com/gustiyuda14-source/TWK-6-JUNI
