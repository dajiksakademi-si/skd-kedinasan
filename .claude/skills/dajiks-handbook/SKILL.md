---
name: dajiks-handbook
description: Pedoman global menyusun buku, handbook, modul, dan PDF bahan ajar D'Ajiks Akademi untuk proyek apa pun (SKD, CEST, Psiko Terintegrasi, dan lainnya) — brand kit, wording khas, alur tahap, pembahasan 7 langkah, templat PDF siap pakai, pemeriksaan akhir. Pakai saat Gusti meminta menyusun, merevisi, atau mencetak handbook, modul, buku siswa, atau bahan ajar PDF D'Ajiks. Berdiri sendiri, tidak perlu membaca proyek SKD.
---

# Penyusunan Buku D'Ajiks Akademi

Pedoman ini lahir dari Handbook TWK, TKP, dan TIU. Isinya berdiri sendiri. Prioritas: perintah Gusti, lalu aturan proyek (CLAUDE.md, memory), lalu pedoman ini.

Baca sebelum kerja: [references/brand-kit.md](references/brand-kit.md) untuk tampilan, [references/wording.md](references/wording.md) untuk tulisan.

Skill pendamping: isi psikotes atau psiko-cat → `psi-expert`. Isi SKD → `skd-expert`. Isi soal mengikuti pedoman soal proyeknya; skill ini mengatur bukunya. Desain → `impeccable`, `emil-design-eng`, `ui-ux-pro-max`, `taste-skill`. Kode → `ponytail:ponytail`.

## Cara kerja dengan Gusti
- Jujur langsung, tidak yes-man, kerjakan hanya yang diminta. Jangan generate soal sebelum diperintah. Jangan commit atau push tanpa diminta.
- Satu pertanyaan per respons, dengan rekomendasi. Banyak putusan → satu daftar bernomor, tiap butir berrekomendasi, Gusti menjawab sekali.
- Tidak mengarang pasal, angka, atau kewenangan lembaga. Ragu → tulis "belum diverifikasi".
- Kerjakan di sesi utama. Subagen hanya bila Gusti mengizinkan, misalnya cek buta.
- Nyatakan tanda selesai sebelum kerja, laporkan hasil apa adanya, termasuk yang gagal dan yang dibiarkan.
- Bahan pihak luar: amati logika penyusunnya saja. Jenis soal, gaya, diksi, dan isinya tidak disalin. Soal D'Ajiks ditulis dari nol.

## Memulai buku baru
1. Baca CLAUDE.md dan memory proyek.
2. Pastikan empat hal, tanyakan yang belum jelas satu per satu: judul buku, pembaca, bahan sumber, jumlah bab.
3. Salin templat ke folder buku: `cp -R ~/.claude/skills/dajiks-handbook/template/. "<folder buku>/"`. Isi bagian KONFIGURASI di `src/build.py`.
4. Buat log tugas di proyek, lalu ikuti tahap berikut.

## Tahap (satu tahap, satu persetujuan Gusti)
| Tahap | Isi |
|---|---|
| T1 | Baca bahan per bab: ide besar, langkah, nama kesalahan, celah |
| T2 | Rencana bab, jumlah contoh dan latihan, target waktu, daftar putusan |
| T3 | Gaya halaman: contoh PDF 2 halaman dengan bab dan soal asli, tunggu persetujuan |
| T4 | Tulis bab per kelompok |
| T5 | Produksi soal lewat script, cek bentuk, cek buta 1 putaran |
| T6 | Pembahasan 7 langkah, sesudah soal lolos |
| T7 | Gambar, tata letak, Daftar Isi, pemeriksaan akhir, PDF final |

Edisi pengajar hanya bila Gusti meminta. Fokus bawaan: buku siswa, satu jilid, satu sumber data, soal dan pembahasan dari sumber yang sama.

## Arah isi
- Setiap cara cepat disertai alasan mengapa benar.
- Satu ide besar menyatukan banyak jenis soal.
- Kunci tahan uji: cek balik dan contoh bantahan.
- Tulang bab: pembuka → konsep inti dan alasannya → langkah kerja → contoh soal dengan pembahasan lengkap → latihan bertarget waktu → ringkasan.
- Judul bab = label sampul, persis.
- Pembahasan yang terpisah dari soalnya diberi tautan dua arah: "Lihat pembahasan" dan "Kembali ke soal".
- Bahasa soal mengikuti tes. Narasi dan pembahasan berbahasa Indonesia, kecuali proyek menetapkan lain.

## Soal
- Satu kunci, bisa dibela dalam satu kalimat melawan pilihan terkuat. Uji setiap pilihan.
- Kunci tidak tertebak dari bentuk: bukan terpanjang, bukan pencilan angka, bukan pola berbeda sendiri.
- Pilihan salah lahir dari kesalahan nyata yang bisa dinamai.
- Angka dihitung script, kunci dibuktikan tunggal. Kunci A–E seimbang, tidak berpola.
- Alur ringkas: cacat yang sudah dikenal dicek script saat produksi. Cek buta 1 putaran. Putaran 2 hanya bila jawaban pemeriksa berbeda dengan kunci karena cacat kebenaran. Pembahasan ditulis sesudah soal lolos.
- Hasil Claude = draf sampai direviu manusia. Jangan mengklaim validitas tanpa uji peserta.

## Desain
- Usul bernomor dulu, satu pertanyaan, lalu prototipe **satu unit** lewat codex, render, kirim tangkapan untuk dinilai, baru diperluas.
- Sistem desain jangan diubah tanpa papan pilihan dan rekomendasi.
- Sesudah gambar lolos pemeriksaan script, tetap lihat dengan mata. Script membuktikan benar, tidak membuktikan terbaca.
- Gambar yang menjelaskan arah memakai bentuk ramping atau tidak simetris.
- Slide, carousel, PDF promosi: ikuti standar global di `references/brand-kit.md` (huruf min. 22 px di kanvas 1080; Gusti 2026-11-10).
- Isi yang dicetak ulang di bab lain diambil script dari kartu asalnya, bukan disalin.

## Pemeriksaan akhir (T7)
`build.py` sudah menolak frasa larangan, istilah penyusun, kode, judul Daftar Isi yang tidak sama dengan bab, dan PDF rusak. Nomor Daftar Isi dibaca dari PDF. Sesudah itu periksa:
1. Tidak ada teks tempat kosong, catatan pengajar, atau tautan patah.
2. Semua gambar ada dan font tertanam (`pdffonts`).
3. Pindai halaman kosong > 30%. Akhir bab dan kartu soal yang tidak boleh terbelah dibiarkan. Lihat dengan mata yang terbesar.
4. Tidak ada judul tertinggal di kaki halaman.
5. Nomor Daftar Isi cocok dengan nomor kaki halaman.

Pemeriksaan selalu pada berkas akhir, setelah build terakhir.

## Jebakan yang pernah terjadi
- PDF rusak sesudah build karena tersimpan ulang sebagai teks: ukuran naik, jutaan byte `EF BF BD`, `Bad FCHECK in flate stream`. Obat: bangun ulang dari sumber. Cantumkan PDF sebagai path biasa dan sarankan membuka lewat Finder atau Preview.
- Nama folder berakhiran spasi: selalu kutip path.
- Teks tempat kosong yang tertinggal: cari `{{`, "Tempat", dan kelas `kosong` sebelum final.
- CSS sampul dari prototipe bisa memuat aturan `@page` global, sehingga margin seluruh buku hilang dan jumlah halaman turun tajam. Pakai CSS sampul yang terbatas pada `.cover`, dan bandingkan jumlah halaman sebelum dan sesudah memasang sampul. CSS terbatas pun mewarisi `line-height` dan `font-variant-numeric` dari `body`: reset pada `.cover`, lalu bandingkan sampul terpasang dengan prototipe berdampingan.
- Daftar Isi yang meluber ke halaman berikutnya membuat nomor bab terbaca dari Daftar Isi. Rapatkan jadi satu halaman, lalu bangun ulang tanpa cache nomor.
- Sesi paralel bisa mengunci putusan baru. Baca log tugas sampai akhir lagi tepat sebelum T7, terutama soal sampul.
- Tautan internal PDF dari Chrome/puppeteer tersimpan sebagai tujuan bernama: valid, tetapi tidak bekerja di Preview macOS (Grammar 2026-11-11, ditegur Gusti). Pasca-proses wajib: ubah ke tujuan langsung `[halaman /XYZ x y 0]` (contoh `dajiks-cest/docs/handbook-cest/grammar/src/tautan_pdf.py`, pypdf), lalu cek semua `/Dest` berupa array.
- Makro yang ditulis di komentar HTML ikut diperluas build (Grammar 2026-11-11: `{{TOC_TENSE}}` di komentar menggandakan baris Daftar Isi; `{{HAL:...}}` di komentar membuat judul palsu "..."). Komentar menyebut makro tanpa kurung kurawal.
- Angka ringkasan berubah sesudah butir dihapus: jalankan pemeriksanya dulu sebelum menyatakan angka tetap.

## Pencatatan
Setiap aturan baru, koreksi, atau putusan Gusti dicatat saat itu juga dengan tanggal:
- Log tugas proyek: rincian putusan, langkah berikut.
- Memori proyek: status terkini dan aturan yang masih berlaku; ganti status lama.
- Pelajaran lintas proyek: tambahkan ke skill ini, supaya buku berikutnya ikut naik mutu.

Tiap titik henti tulis checkpoint. Percakapan mendekati batas: tampilkan prompt sesi berikut di blok kode (skill, daftar baca, status, tugas, aturan), simpan juga di log, lalu minta Gusti `/compact`.
