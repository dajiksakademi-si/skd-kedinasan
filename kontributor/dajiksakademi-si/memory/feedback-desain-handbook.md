---
name: feedback-desain-handbook
description: Desain handbook/PDF D'Ajiks: pedoman impeccable + emil-design-eng, hiasan lewat codex CLI; selera tenang-elegan, kepala sampul seri seragam (2026-10-28)
metadata:
  type: feedback
---
Untuk pekerjaan desain handbook (TWK dan sejenisnya), selalu panggil skill `impeccable` dan `emil-design-eng`; codex CLI boleh dipakai sebagai bantuan.

**Why:** Gusti meminta langsung 2026-10-27 saat Tahap 5 Handbook TWK ("selalu gunakan skills impeccable dan /emil-design-eng untuk bantuan desain. bisa juga gunakan codex CLI").

Ditegaskan Gusti 2026-10-27 (saat menyetujui Bab 1–4): "selalu gunakan pedoman skills tersebut saat mendesain"; "kedepannya gunakan codex CLI jika butuh tambahan hiasan atau hal lainnya di dalam proses pembentukan PDF".

**Diperkeras Gusti 2026-11-03:** "selalu gunakan codex CLI untuk generate gambar baru" — semua gambar baru (hiasan, ilustrasi, aset) wajib lewat codex CLI, bukan digambar Claude.

**How to apply:** Butuh hiasan/gambar/aset tambahan untuk PDF → buat lewat codex CLI (bukan menggambar manual/SVG rumit).  Panggil kedua skill sebelum menulis/merapikan halaman; sistem desain yang sudah disetujui (navy/emas, Plus Jakarta Sans) tetap dipertahankan — peringatan detektor soal font diabaikan. Tulisan "D'Ajiks Akademi" di kepala halaman memakai font **Cinzel** khas D'Ajiks (permintaan Gusti 2026-10-28, prototipe gaya baru TWK). Font Google di kotak margin @page baru termuat bila dipakai juga di body (span tersembunyi); cek `pdffonts` ada Cinzel. Teks isi rata kiri-kanan (permintaan Gusti 2026-10-28); kartu sempit 3–4 kolom tetap rata kiri karena Chrome tidak memenggal kata bahasa Indonesia. Jalankan `impeccable detect` sekali per kelompok bab. Terkait [[skd-handbook-twk]], [[feedback-wording-handbook]].

Catatan teknis (2026-10-28): jalankan `codex exec ... < /dev/null`; tanpa itu codex menunggu stdin ("Reading additional input from stdin...") dan diam sampai timeout. Chrome gagal di sandbox codex, render PNG dilakukan Claude.

Putusan desain Gusti 2026-10-28 (Handbook TKP gaya baru):
- Selera Gusti: tenang dan elegan. Hindari hiasan yang memanjang/ramai. Contohnya, garis emas panjang di kepala sampul ditolak karena "menghilangkan nuansa elegan".
- Kepala sampul seri SKD seragam untuk semua handbook: lencana persegi navy berisi logo emas, lalu "SERI SKD KEDINASAN · <SUBTES>" dalam huruf kapital kecil berjarak, lalu nilai Cinzel bergaris bawah emas pendek di kanan. Pakai juga untuk handbook TIU nanti.
- Suasana kalem (palet krem-batu dari sampul) hanya untuk TKP; TWK tetap navy-emas. Peringatan detektor "cream palette" diabaikan karena palet itu disengaja.
- Tangga nilai dan elemen lain harus khas D'Ajiks, tidak meniru gaya Pejuang Kedinasan.
- Sebelum mengubah desain, ajukan papan pilihan (mockup PNG) dengan rekomendasi + alasan, lalu tunggu pilihan Gusti.
