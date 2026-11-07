# Memory: Keputusan Lintas Tugas

Aturan kerja ada di [CLAUDE.md](CLAUDE.md). File ini hanya memuat keputusan yang berlaku lintas tugas. Rincian putusan per tugas ada di log tugas `~/.claude/skills/skd-expert/riset/`; status tiap tugas ada di auto-memory proyek.

Catatan lengkap lama (riwayat sesi 2026-10-25 s.d. 2026-11-01, pelajaran soal luar Al Faiz TIU 31–65) diarsipkan utuh, tidak dihapus: `~/.claude/skills/skd-expert/riset/arsip-memory-2026-11-02/memory-root-lengkap.md`.

## Keputusan Gusti yang berlaku lintas tugas
- **Paket baku TWK 30 · TIU 35 · TKP 45** (2026-10-25). Target 50 paket sampai akhir 2026. Rilis 3 TO pertama dulu; ekspor CAT/PDF dan web ditunda, dirancang bersama TO (2026-10-29).
- **Satu engine per subtes** (2026-10-25): TWK = MR BADRUN v1.6, TIU = ENGINE TIU v0.4.3 + generator figural k12-spatial-engine, TKP = ENGINE TKP v1.3.5.
- **Blueprint TIU = komposisi Paket 41 Al Faiz** (2026-10-28): verbal 6 · numerik 9 · KCK 7 · analitis 3 · optimasi 1 · figural 9.
- **Amati, Tiru, Modifikasi**: dari bahan luar hanya logika penyusun yang diadaptasi; jenis, gaya tulis, diksi, dan isi soal tidak disalin (pertegasan 2026-10-27).
- **Pembahasan semua subtes gaya guru les SKD**, bebas istilah dapur (2026-10-25); label langkah terakhir "Kekeliruan yang Mungkin Terjadi" (2026-10-30).
- **Bahasa ke Gusti**: Indonesia formal baku, tanpa istilah teknis (2026-10-26).
- **Semua bahan belajar di `BIG DATA/`**; sumber luar yang sudah dianalisis dipindah ke Trash, hasilnya hanya di riset skill (2026-10-27).
- **Desain bahan ajar** selalu memakai pedoman impeccable + emil-design-eng; selera tenang-elegan; kepala sampul seri SKD seragam (2026-10-27/28).
- **Sesi belajar harian** hanya bila Gusti memicu `/skd-belajar`.
- **Pencatatan putusan** (diubah 2026-11-02): rincian di log tugas, status satu baris di auto-memory, file ini hanya keputusan lintas tugas. Tidak menyalin rincian yang sama ke tiga tempat.
- **Alur produksi soal ringkas** (putusan Gusti 2026-11-02): (1) pemeriksaan bocor bentuk (kunci terpanjang, kata hanya di kunci, kunci menyendiri, angka terbesar/terkecil, pola gabungan) dijalankan script saat penyusunan, soal bocor tidak lolos; (2) cek buta cukup 1 putaran per kelompok, hanya mengerjakan soal; putaran 2 hanya bila ada jawaban ≠ kunci; (3) pembahasan ditulis sesudah soal lolos cek buta; (4) butir putusan diajukan sekaligus dalam satu daftar bernomor dengan rekomendasi, Gusti menjawab sekali. Risiko diterima: bocor jenis baru bisa lolos, jaring terakhir pemeriksaan akhir.

## Log tugas aktif
| Tugas | Log |
|---|---|
| Handbook TIU (buku siswa selesai 2026-11-05, 278 hlm + Daftar Isi; draf menunggu reviu manusia) | `riset/2026-10-30-log-handbook-tiu.md` |
| Paket 1 TIU TO | `riset/2026-10-30-log-tiu-paket1.md` |
| TWK 3 paket TO | `riset/2026-10-29-log-twk-to.md` |
| Engine figural TIU | `riset/2026-10-28-log-engine-figural-tiu.md` |
| Revisi opsi TKP | `riset/2026-10-28-log-revisi-opsi-tkp.md` |
| Produksi TKP | `riset/2026-10-25-log-produksi-tkp-3paket.md` |
| Handbook TWK / TKP (tuntas) | `riset/2026-10-27-log-handbook-twk.md`, `riset/2026-10-26-log-handbook-tkp.md` |

- 2026-11-05 · Pedoman buku lintas proyek ada di skill global `dajiks-handbook` (`~/.claude/skills/dajiks-handbook/`): brand kit, wording, alur tahap, templat PDF. Pelajaran buku yang berlaku lintas proyek ditambahkan ke sana.
