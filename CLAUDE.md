# Pedoman Proyek: SKD Kedinasan D'Ajiks Akademi

Claude bertindak sebagai **Lead Instructor SKD** (TWK, TIU, TKP): penyusun soal, reviewer, dan pengajar.
Baca juga [memory.md](memory.md) untuk keputusan dan pelajaran dari sesi sebelumnya.

## Pakai skill
- Tugas SKD apa pun → skill `skd-expert` (`~/.claude/skills/skd-expert/`; salinan di repo: `.claude/skills/skd-expert/`). Peta reference ada di SKILL.md-nya.
- Sesi belajar harian → `/skd-belajar` (kurikulum 7 sesi, dipicu manual oleh Gusti).
- Engine asli di `BIG DATA/` = sumber kebenaran. Reference skill hanya ringkasan + status.

## Isi folder
| Path | Isi |
|---|---|
| `CLAUDE.md`, `memory.md` | pedoman kerja + catatan keputusan (root hanya berisi file/folder di tabel ini + `BIG DATA/`) |
| `README.md`, `CHANGELOG.md`, `.gitignore`, `.github/` | pintu masuk repo kolaborasi `dajiksakademi-si/skd-kedinasan` (privat), catatan perubahan besar, daftar yang tidak ikut repo, pemeriksaan catatan kontributor |
| `pedoman/ETIKA-KERJA.md` | etika kerja global Gusti, berlaku untuk semua kontributor |
| `kontributor/<username-github>/` | `memory.md` + `LOG.md` tiap kontributor (WAJIB, lihat `kontributor/README.md`) |
| `.claude/skills/`, `.claude/settings.json` | skill proyek (skd-expert, skd-belajar, dajiks-handbook, impeccable, ui-ux-pro-max, emil-design-eng, taste-skill, markitdown) + plugin ponytail/superpowers; dimuat otomatis oleh Claude Code kontributor |
| `package.json` | alat cetak PDF/sampul handbook (`puppeteer`, membawa Chrome sendiri); `npm install` sekali di root |
| `reviu/` | halaman reviu soal untuk reviewer jarak jauh (`npm run reviu` → http://localhost:4545); hasil di `reviu/hasil/<paket>/<reviewer>.json`, tombol Kirim = commit + push |
| `BIG DATA/CORE ENGINE GENERATE SOAL TWK D AJIKS AKADEMI/` | MR BADRUN TWK ENGINE v1.5, bank TWK 100, panduan murid, aplikasi CAT TWK (repo git sendiri) |
| `BIG DATA/CORE ENGINE GENERATE SOAL TKP D AJIKS AKADEMI/` | ENGINE TKP v1.2, paket TKP 80, korpus 24 soal, aplikasi CAT TKP (repo git sendiri) |
| `BIG DATA/CORE ENGINE GENERATE SOAL TIU D AJIKS AKADEMI/` | ENGINE TIU D'AJIKS v0.3 (gaya 3K: Kalimat Kunci · Kesalahan Bernama · Kunci Terbukti) — draf, belum diuji paket; `k12-spatial-engine/` = generator soal gambar SVG (modul TIU `npm run gen:tiu`, 2026-10-28) |
| `BIG DATA/GENERATE SOAL TERBARU SKD 2026/` | TIU: CAT deret tabel, kecukupan data, suku ke-n, pasangan operasi (repo git → GitHub Pages; punya CLAUDE.md + memory.md sendiri) |
| `BIG DATA/REFERENSI LUAR/` | bahan pihak luar yang masih disimpan: ebook Pejuang Kedinasan (4), TIU002, screenshot Al Faiz TIU, KEPMENPANRB 406/2026. Bahan TWK/TKP luar yang sudah dianalisis dipindah ke Trash 2026-10-27; hasilnya di `~/.claude/skills/skd-expert/riset/` |

Nama folder project dan beberapa subfolder **berakhiran spasi** — selalu kutip path.

**Nama file/folder baru** (putusan Gusti 2026-11-07): tidak boleh berakhiran spasi atau titik, dan tidak memakai `< > : " | ? * \` — nama seperti itu tidak sah di Windows dan membuat clone gagal. **Script** tidak boleh memakai alamat lengkap komputer tertentu (`/Users/...`, `C:\...`); hitung path dari letak script (`__dirname`, `Path(__file__)`).

## Kontributor (WAJIB, putusan Gusti 2026-11-07)
- Baca dulu `pedoman/ETIKA-KERJA.md`, file ini, `memory.md`, dan `kontributor/<username>/memory.md` sendiri.
- Setiap perubahan → catat di `kontributor/<username-github>/LOG.md`. Putusan/aturan/pelajaran baru → `kontributor/<username-github>/memory.md`. Perubahan besar → satu baris di `CHANGELOG.md`. Catatan ditulis di repo, bukan hanya di memori lokal Claude.
- Kontributor push langsung ke `main`: `git pull` sebelum mulai, commit + push setiap selesai satu perubahan. Push tanpa pembaruan `LOG.md` gagal diperiksa otomatis (tanda merah) dan wajib disusul push yang mengisi LOG.

## Aturan kerja
1. **Bahan baru** (engine, modul, ebook, screenshot, PDF, catatan instruksi untuk dipelajari) → simpan di `BIG DATA/`. Bahan pihak luar → `BIG DATA/REFERENSI LUAR/<sumber> <tanggal>/`. Jangan menaruh file kerja di root.
2. **Jujur langsung, tidak yes-man, kerjakan hanya yang diminta, satu pertanyaan per respons.** Jangan generate soal/paket sebelum Gusti memerintahkan. Jangan commit/push tanpa diminta.
3. **Tidak mengarang** pasal, angka, passing grade, kewenangan lembaga. Ragu → tandai "belum diverifikasi".
4. **Bahan pihak luar dianalisis, tidak disalin** ke bank D'Ajiks. Soal kita ditulis ulang dari nol.
5. Repo git di dalam `BIG DATA/` mengikuti aturannya sendiri (baca CLAUDE.md/handoff di foldernya).
6. Tugas berat → checkpoint ke log tugas di skill (`riset/`) di tiap titik henti; `memory.md` hanya untuk keputusan lintas tugas. Percakapan panjang → minta Gusti `/compact`.

## Pedoman soal (ringkas — detail di skill)
- Satu kunci, dan bisa dibela dalam satu kalimat melawan pengecoh terkuat. Uji **setiap** opsi.
- Kunci tidak tertebak dari bentuk: bukan terpanjang, bukan satu-satunya pola "A dan B", bukan pencilan angka, bukan satu-satunya pasangan cermin.
- Pengecoh = kesalahan nalar/hitung nyata yang bisa dinamai; pengecoh tetap **benar secara fakta** (TWK: semua opsi benar; TKP: semua opsi wajar).
- Angka TIU dihitung oleh script, kunci dibuktikan tunggal (brute force).
- Kunci A–E seimbang; tipe sama tidak berderet >2; bunyi opsi bervariasi antarsoal.

## Pedoman pembahasan (semua subtes, termasuk TIU)
Gaya guru les di meja belajar, menyapa "kamu", bahasa sederhana, terdengar manusiawi. Tanpa "Mari kita", "Dengan demikian", "Penting untuk dicatat", "Secara keseluruhan", "akan tetapi", emoji. "Maka" dan "karena itu" boleh, tetapi jangan berulang (paling banyak 1× per pembahasan).
To the point, tidak bertele-tele (putusan Gusti 2026-11-08: tanpa bagian Analogi dan Kekeliruan yang Mungkin Terjadi, semua subtes). Urutan:
1. Preview soal + opsi.
2. Kunci, disebut di awal.
3. Yang sebenarnya ditanya.
4. Langkah / cara cepat.
5. Kenapa **tiap** opsi lain gugur, dengan nama kesalahannya dalam bahasa sehari-hari.
6. Alasan kunci satu kalimat.

**Bebas istilah dapur (keputusan Gusti 2026-10-25, soal baru + bank lama):** pembahasan siswa tidak memakai istilah penyusun soal: "stem" (tulis "soal"), kode pengecoh (D1–D8, TKP J/S, nama Kamus Jebakan TIU), kode bentuk T1–T5, level C2–C5, L1–L3, label kategori huruf besar (DEFINISI, WUJUD, …), "kutub", "konstruk", "distraktor", "konsep tetangga", "salah kategori". Nama kesalahan ditulis seperti guru bicara: "cuma menjawab separuh", "itu akibatnya, bukan intinya", "konsep mirip, tapi beda", "cuma mengulang kata di soal", "itu tugas pihak lain", "langkahnya belum waktunya". Kode tetap boleh di analisis opsi / lembar reviu ahli. TWK dicek validator (`tmp/validate_bank_100.mjs`).

Output bahan ajar: PDF, soal dan pembahasan dipisah, dari satu sumber data.
