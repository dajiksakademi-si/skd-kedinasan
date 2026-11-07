# Brand Kit D'Ajiks Akademi (buku dan PDF)

Selera Gusti: **tenang dan elegan**. Hiasan memanjang atau ramai ditolak. Contoh penolakan: garis emas panjang di kepala sampul ("menghilangkan nuansa elegan").

## Nama dan huruf
- Tulisan nama: **D'Ajiks Akademi** (dengan apostrof), memakai font **Cinzel 700**. Font ini hanya untuk nama merek dan nilai di sampul.
- Semua teks lain: **Plus Jakarta Sans** (400–800). Angka tabular.
- Peringatan detektor desain soal font atau palet diabaikan; sistem ini sudah disetujui.
- Font di kotak margin `@page` baru termuat bila font itu dipakai juga di body. Cek `pdffonts` memuat Cinzel.

## Warna inti (semua seri)
| Peran | Nilai |
|---|---|
| Navy utama | `#0c2350` |
| Navy kedua | `#14336f` |
| Royal (label) | `#1f4fa6` |
| Emas | `#f2b705` |
| Emas lembut (kotak Catatan, Ilustrasi) | `#fff6d9` |
| Tinta emas (nomor, tulisan merek) | `#7a5a00` |
| Teks judul | `#13203b` |
| Teks isi | `#2b3856` |
| Teks redup | `#5b6782` |
| Garis | `#d8e1ef` |
| Latar halaman | `#fbfcfe` |
| Merah pilihan salah | `#8c2f2f` di atas `#fbefec` |

Satu nuansa lembut per buku diambil dari gambar sampulnya: TIU biru pucat (`#edf2fb`, pita `#e9f0fb` ke `#dbe6f5`), TWK navy emas, TKP krem batu (hanya TKP). Buku baru memilih nuansanya sendiri lewat papan pilihan. Warna inti tidak berubah.

## Halaman
- A4, margin 17 / 17 / 16 mm, isi 9,8 pt, jarak baris 1,6.
- Kepala kiri: nama tes lengkap huruf kapital renggang, tanpa lencana. Kepala kanan: D'Ajiks Akademi, Cinzel, tinta emas.
- Kaki kiri: `Handbook X · Versi Siswa · Edisi 2026`. Kaki kanan: nomor halaman.
- Teks isi rata kiri-kanan. Kartu sempit 3–4 kolom rata kiri, karena Chrome tidak memenggal kata bahasa Indonesia.
- Judul subbab: batang emas pendek di kiri (`h3::before`).
- Pembuka bab: pita lembut, nomor besar dengan garis tinta emas pendek, kisi kecil 3 × 3 dengan satu petak emas.

## Sampul seri
Kepala sampul seragam: lencana persegi navy berisi logo emas, lalu `SERI ... · <SUBTES>` huruf kapital kecil berjarak, lalu nilai Cinzel bergaris bawah emas pendek di kanan. Lencana dan label seri hanya di sampul, tidak di halaman isi. Sampul dikunci sesudah disetujui. Logo: `template/aset/logo_emas.png`.

Gambar sampul (pelajaran Writing CEST, 2026-11-06): ikon 3D mengilap dan panel tempelan terasa generik AI dan ditolak Gusti. Yang diterima: satu siluet goresan tinta seperti karya seniman, satu aksen lembut, ruang kosong. Pisahkan tinta dari kertas supaya warna tinta dan latar bisa mengikuti brand kit.
Sampul berlapis (gradasi transparan, `mix-blend-mode`) digabung dulu jadi satu JPG, karena Preview macOS tidak menggambarnya walau `pdftoppm` tampak benar. Cek sampul juga lewat `sips -s format png file.pdf --out x.png`.

## Gambar
- Gambar baru apa pun lewat **codex CLI**, utamakan SVG, bukan digambar Claude:
  `codex exec --skip-git-repo-check -s workspace-write -C <dir> "<prompt>" < /dev/null`
  Tanpa `< /dev/null` codex diam menunggu. macOS tanpa `timeout`. Chrome gagal di sandbox codex, render PNG dilakukan Claude.
- Gaya gambar soal: siluet hitam pekat `#111` dengan guratan putih, tebal, tidak simetris, arah jelas. Di bawah ukuran besar guratan dibuang karena tampak kotor.
- Gaya gambar penjelas: panel `figure.diag` berlatar lembut, keterangan HTML di bawah panel supaya hurufnya sama dengan buku, satu kalimat keterangan di bawah kelompok gambar.
- Peserta calon kedinasan, TNI, Polri. Tema dekat keseharian siswa (sekolah, kuliner, olahraga) ditolak. Lambang negara, tanda kepangkatan, lambang lembaga, dan simbol bermuatan tidak dipakai sebagai hiasan. Gambar mata tunggal dilarang mutlak (putusan Gusti 2026-11-06): jangan diusulkan atau dibuat, dalam bentuk apa pun.

## Edisi HP (pelajaran Handbook Writing CEST, 2026-11-05)
- PDF di ponsel diperkecil ke lebar layar ±70 mm: A4 jadi ±⅓ ukuran (harus cubit-geser). Edisi HP: halaman **100 × 178 mm** (9:16, satu halaman satu layar), margin 11/7/10 mm, isi **11 pt**. Satu sumber HTML dengan A4: ukuran huruf komponen pakai `em` dari `--fs`, `@page` HP disisipkan saat build.
- Edisi HP ±2–2,5× jumlah halaman A4. Kotak panjang boleh berlanjut antarbaris (`break-inside:auto` + `box-decoration-break:clone`), baris di dalamnya `break-inside:avoid`; kartu tugas dan model tetap utuh.
- Label + teks sumber dalam satu baris flex bisa terbelah antarhalaman: pakai `display:block`.
- Di kotak yang boleh terbelah, pemisah butir `border-top` menempel di puncak kotak lanjutan (Chrome tidak punya selektor awal fragmen). Edisi HP: pisahkan butir dengan jarak, bukan garis; A4 boleh tetap bergaris.
- Pita pembuka bab tidak muat satu halaman A4 bersama contoh soal panjang; di prototipe, contoh dimulai di halaman baru.
