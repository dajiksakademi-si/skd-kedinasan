"""Kelompok 3 latihan_data: contoh Bab 2-4, 11 (paragraf + kaidah), 12 (pasangan), 14 + latihan Bab 11.
Format sama dengan latihan_data.py. Soal kaidah bahasa: kaidah=True (opsi boleh kalimat contoh, bebas aturan panjang).
Kaidah dan kata hanya dari 27_bab11.html (EYD V daring + KBBI VI daring, dibaca 2026-10-27)."""

SOAL = [
# ─────────── CONTOH BAB 2 · CARA SOAL DIBANGUN ───────────
dict(tempat='contoh-bab02', asal='022',
 soal='Anda staf Dinas Perhubungan kota yang menyusun rencana perubahan trayek angkutan kota. Kepala dinas meminta rencana selesai akhir bulan ini, sementara sopir, penumpang, dan pemilik angkutan punya kepentingan yang berbeda atas trayek baru. Tahun lalu, rencana serupa ditolak warga karena mereka tidak pernah diberi tahu mengapa usulan mereka tidak dipakai. Langkah yang paling tepat menurut arah sila keempat adalah...',
 opsi=dict(
  A='Menggelar musyawarah terjadwal dengan ketiga pihak, lalu menerangkan dasar keputusannya.',
  B='Membuka kolom masukan daring, lalu menyerahkan pemilihan usulan kepada tim teknis dinas.',
  C='Mengadakan jajak pendapat cepat, lalu menetapkan trayek dengan dukungan suara terbanyak.',
  D='Menghasilkan rencana trayek yang diterima ketiga pihak agar tidak ditolak warga lagi.',
  E='Mengumumkan rencana trayek baru beserta peta rutenya melalui media sosial dinas.'),
 kunci='A',
 penentu='Tahun lalu, rencana serupa ditolak warga karena mereka tidak pernah diberi tahu mengapa usulan mereka tidak dipakai.',
 kode=dict(A='kunci', B='D2', C='D4', D='D3+D1', E='D5+D6')),

# ─────────── CONTOH BAB 3 · KATA PERINTAH ───────────
dict(tempat='contoh-bab03', asal='016',
 soal='Dalam diskusi kelas, seorang siswa berpendapat bahwa Pancasila dan UUD 1945 sama saja karena keduanya dipakai sebagai pedoman bernegara. Guru lalu menunjukkan dua hal: rumusan Pancasila tercantum dalam alinea keempat Pembukaan UUD 1945, dan UU 12/2011 menetapkan Pancasila sebagai sumber segala sumber hukum negara. Berdasarkan kedua keterangan guru, hubungan Pancasila dan UUD 1945 paling tepat dipahami sebagai...',
 opsi=dict(
  A='UUD 1945 mengatur lembaga negara, pembagian kekuasaan, dan hak warga negara.',
  B='Nilai Pancasila menjadi dasar bagi perumusan pasal-pasal dalam UUD 1945.',
  C='UUD 1945 menempati urutan tertinggi dalam jenis dan hierarki peraturan perundang-undangan.',
  D='Keduanya sama-sama menjadi pedoman utama dalam penyelenggaraan kehidupan bernegara.',
  E='Rumusan Pancasila tercantum dalam alinea keempat Pembukaan UUD 1945.'),
 kunci='B',
 penentu='UU 12/2011 menetapkan Pancasila sebagai sumber segala sumber hukum negara',
 kode=dict(A='D1', B='kunci', C='D4', D='D5', E='D2')),

# ─────────── CONTOH BAB 4 · SEPULUH POLA ───────────
dict(tempat='contoh-bab04', asal='062',
 soal='Anda pengelola data penerima bantuan pupuk di dinas pertanian kabupaten. Anda menemukan sejumlah nama petani tercatat dua kali dalam daftar triwulan lalu, sehingga jumlah penerima sebenarnya lebih sedikit daripada yang dilaporkan. Kepala bidang khawatir koreksi itu membuat capaian program terlihat turun menjelang evaluasi, sementara pedoman pendataan mewajibkan setiap perubahan daftar diajukan dengan bukti melalui jalur pengesahan. Sikap yang paling tepat Anda tunjukkan adalah...',
 opsi=dict(
  A='Menjaga kepercayaan para petani agar penyaluran bantuan berikutnya tepat sasaran.',
  B='Mengajukan perubahan daftar beserta bukti lewat jalur pengesahan tanpa memberi tahu atasan.',
  C='Menjelaskan akibat pembetulan kepada kepala bidang, lalu mengajukan revisi berdasar bukti.',
  D='Membetulkan daftar pada salinan kerja tim agar penyaluran berikutnya memakai data benar.',
  E='Meminta inspektorat memeriksa ulang daftar penerima, lalu menunggu hasil pemeriksaan mereka.'),
 kunci='C',
 penentu='pedoman pendataan mewajibkan setiap perubahan daftar diajukan dengan bukti melalui jalur pengesahan',
 kode=dict(A='D3', B='D5+D2', C='kunci', D='D6', E='D7')),

# ─────────── CONTOH BAB 11 · BAHASA ───────────
dict(tempat='contoh-bab11a', asal='baru',
 soal='(1) Mobil perpustakaan keliling milik kabupaten kini singgah di setiap desa dua pekan sekali. (2) Anak-anak sudah menunggu di balai desa sejak pagi, dan banyak di antara mereka membaca dua atau tiga buku dalam sekali kunjungan. (3) Koleksinya pun bertambah berkat sumbangan warga dan sekolah. (4) Namun, buku hanya boleh dibaca di tempat selama mobil singgah. (5) Akibatnya, kegemaran membaca yang tumbuh di balai desa belum berlanjut di rumah. Gagasan utama paragraf tersebut adalah...',
 opsi=dict(
  A='Mobil perpustakaan keliling milik kabupaten kini singgah di setiap desa dua pekan sekali.',
  B='Kabupaten perlu mengizinkan anak-anak meminjam buku perpustakaan keliling untuk dibawa pulang.',
  C='Perpustakaan keliling berhasil menumbuhkan kegemaran membaca anak-anak di balai desa.',
  D='Koleksi buku bertambah, tetapi aturan baca di tempat membuat anak berhenti membaca.',
  E='Kunjungan perpustakaan menumbuhkan kegemaran membaca, tetapi aturan baca di tempat menahannya.'),
 kunci='E',
 penentu='(5) Akibatnya, kegemaran membaca yang tumbuh di balai desa belum berlanjut di rumah.',
 kode=dict(A='D5', B='D9', C='D2', D='D4', E='kunci')),

dict(tempat='contoh-bab11b', asal='098', kaidah=True,
 soal='Kalimat yang penulisan tanda bacanya tidak tepat adalah...',
 opsi=dict(
  A='Petugas meminta tiga berkas: kartu keluarga, surat pengantar, dan pasfoto.',
  B='Warga boleh mengambil kartu itu sendiri kalau petugas sudah memanggil namanya.',
  C='Antrean pagi ini sangat panjang. Oleh karena itu petugas membuka loket tambahan.',
  D='Kalau berkasnya lengkap, permohonan itu selesai dalam satu hari kerja.',
  E='Pada hari Senin petugas melayani pembuatan kartu identitas anak.'),
 kunci='C',
 penentu='Oleh karena itu petugas membuka loket tambahan.',
 kode=dict(A='benar: titik dua sesudah pernyataan lengkap + koma perincian',
           B='benar: induk kalimat di depan, tanpa koma (tampak janggal)',
           C='kunci: koma wajib sesudah ungkapan penghubung antarkalimat',
           D='benar: anak kalimat di depan diikuti koma',
           E='benar: koma sesudah keterangan awal hanya "dapat" (tampak janggal)')),

# ─────────── LATIHAN BAB 11 · BAHASA NEGARA ───────────
dict(tempat='Bahasa negara', asal='baru',
 soal='(1) Bank sampah di kelurahan itu dibuka setiap Sabtu pagi. (2) Warga menimbang plastik dan kardus yang sudah dipilah, lalu hasilnya dicatat di buku tabungan. (3) Dalam setahun, tumpukan sampah di tepi sungai kelurahan jauh berkurang. (4) Sebagian warga bahkan memakai tabungannya untuk membayar iuran kebersihan. (5) Kebiasaan memilah sampah ternyata menguntungkan lingkungan dan juga isi dompet warga. Gagasan utama paragraf tersebut adalah...',
 opsi=dict(
  A='Kelurahan lain perlu meniru bank sampah ini agar tepi sungainya ikut bersih.',
  B='Memilah sampah lewat bank sampah menguntungkan lingkungan dan keuangan warga.',
  C='Tepi sungai kelurahan menjadi lebih bersih dan tumpukan sampahnya jauh berkurang.',
  D='Sebagian warga membayar iuran kebersihan dengan tabungan dari bank sampah kelurahan.',
  E='Bank sampah akan membuat sungai di kota itu bebas dari tumpukan sampah.'),
 kunci='B',
 penentu='(5) Kebiasaan memilah sampah ternyata menguntungkan lingkungan dan juga isi dompet warga.',
 kode=dict(A='D9', B='kunci', C='D2', D='D5', E='D4')),

dict(tempat='Bahasa negara', asal='baru',
 soal='(1) Sanggar tari di kecamatan itu sudah berdiri sejak puluhan tahun lalu. (2) Dulu, latihan setiap Minggu diikuti lebih dari tiga puluh anak. (3) Kini yang datang tinggal belasan, dan sebagian besar sudah duduk di bangku SMA. (4) Pelatihnya pun sudah berusia lanjut dan belum memiliki pengganti. (5) Bila tidak ada murid dan pelatih baru, tari khas kecamatan itu diperkirakan tidak lagi dipentaskan dalam beberapa tahun. Simpulan yang paling tepat dari paragraf tersebut adalah...',
 opsi=dict(
  A='Tari khas kecamatan itu sudah berhenti dipentaskan karena sanggar kekurangan murid.',
  B='Sanggar tari kecamatan itu perlu membuka kelas baru bagi anak usia sekolah dasar.',
  C='Anak yang berlatih di sanggar tari kecamatan itu kini jauh lebih sedikit daripada dahulu.',
  D='Pelatih sanggar tari kecamatan itu sudah berusia lanjut dan belum memiliki pengganti.',
  E='Tari khas kecamatan itu terancam tidak dipentaskan lagi karena murid dan pelatih kurang.'),
 kunci='E',
 penentu='(5) Bila tidak ada murid dan pelatih baru, tari khas kecamatan itu diperkirakan tidak lagi dipentaskan dalam beberapa tahun.',
 kode=dict(A='D4 (waktu diubah)', B='D9', C='D2', D='D5', E='kunci')),

dict(tempat='Bahasa negara', asal='097', kaidah=True,
 soal='Kalimat yang memuat kata tidak baku menurut KBBI adalah...',
 opsi=dict(
  A='Panitia menyusun bujet kegiatan bersama bendahara kelurahan.',
  B='Omzet koperasi desa naik semenjak pemasarannya dilakukan secara daring.',
  C='Petugas membagikan kuesioner kepuasan layanan kepada setiap pengunjung.',
  D='Kepala seksi mengkoordinir petugas lapangan selama pendataan berlangsung.',
  E='Petugas merespons keluhan warga sebelum jam layanan berakhir.'),
 kunci='D',
 penentu='Kepala seksi mengkoordinir petugas lapangan selama pendataan berlangsung.',
 kode=dict(A='benar: bujet baku (tampak janggal)', B='benar: omzet, semenjak baku',
           C='benar: kuesioner baku', D='kunci: mengkoordinir tidak ada di KBBI; baku mengoordinasi(kan)',
           E='benar: merespons baku')),

dict(tempat='Bahasa negara', asal='096', kaidah=True,
 soal='Kalimat yang penulisan tanda bacanya tepat adalah...',
 opsi=dict(
  A='Kalau stok cukup, petugas membagikan beras, minyak, dan gula kepada warga.',
  B='Petugas membagikan beras minyak, dan gula kepada warga yang terdaftar.',
  C='Petugas akan membagikan bantuan, kalau data penerima sudah diperiksa.',
  D='Data penerima sudah diperiksa. Jadi petugas dapat membagikan bantuan hari ini.',
  E='Bantuan dibagikan kepada: lansia, penyandang disabilitas, dan ibu hamil.'),
 kunci='A',
 penentu='Kalau stok cukup, petugas membagikan beras, minyak, dan gula kepada warga.',
 kode=dict(A='kunci: anak kalimat di depan + koma perincian', B='salah: koma perincian hilang',
           C='salah: induk kalimat di depan tidak memakai koma', D='salah: koma sesudah ungkapan penghubung "Jadi"',
           E='salah: titik dua sesudah perincian yang menjadi bagian kalimat')),

dict(tempat='Bahasa negara', asal='099', kaidah=True,
 soal='Kalimat yang penulisan huruf kapitalnya tidak tepat adalah...',
 opsi=dict(
  A='Rombongan siswa menyeberangi selat dengan kapal feri pagi itu.',
  B='Ibu membeli jeruk bali dan petai cina di pasar kecamatan.',
  C='Kantor Perserikatan Bangsa-bangsa mengirim bantuan ke wilayah itu.',
  D='Wisatawan membeli batik Cirebon setelah berlibur di Danau Toba.',
  E='Mahasiswa itu meneliti pasal pencurian dalam Kitab Undang-Undang Hukum Pidana.'),
 kunci='C',
 penentu='Kantor Perserikatan Bangsa-bangsa mengirim bantuan ke wilayah itu.',
 kode=dict(A='benar: unsur geografi tanpa nama diri, huruf kecil', B='benar: nama geografi sebagai nama jenis, huruf kecil',
           C='kunci: bentuk ulang utuh pada nama lembaga, Bangsa-Bangsa', D='benar: asal daerah kapital + nama geografi',
           E='benar: nama dokumen, bentuk ulang utuh kapital')),

# ─────────── CONTOH BAB 12 · PASANGAN (pembalik: pemberian belum/sudah diterima) ───────────
dict(tempat='contoh-bab12a', asal='071',
 soal='Anda petugas perizinan yang baru saja menerbitkan izin usaha sebuah rumah makan. Pemiliknya ingin berterima kasih dan mengundang Anda sekeluarga makan malam di rumah makannya akhir pekan ini. Di daerah itu, menolak kebaikan tuan rumah dianggap kurang menghormati, sementara kode etik instansi melarang petugas menerima pemberian dari pemohon yang dilayaninya, dan pemberian yang telanjur diterima wajib dilaporkan. Sikap yang paling tepat Anda tunjukkan adalah...',
 opsi=dict(
  A='Membaca ulang kode etik instansi tentang pemberian sebelum menjawab undangan pemilik.',
  B='Menolak undangan itu secara santun sambil menghargai niat baik pemilik rumah makan.',
  C='Menolak undangan itu tanpa penjelasan lalu mencatatnya sebagai upaya pemberian gratifikasi.',
  D='Melaporkan undangan makan malam itu kepada KPK paling lambat tiga puluh hari kerja.',
  E='Menolak undangan itu sambil menjaga nama baik Anda di mata rekan kerja.'),
 kunci='B',
 penentu='mengundang Anda sekeluarga makan malam di rumah makannya akhir pekan ini',
 kode=dict(A='D5', B='kunci', C='D2', D='D4+D8', E='D10')),

dict(tempat='contoh-bab12b', asal='075',
 soal='Anda petugas perizinan yang baru saja menerbitkan izin usaha sebuah rumah makan. Malam itu Anda sekeluarga makan di sana dan membayar di kasir. Keesokan harinya, pemilik mengirim pesan bahwa uang tagihan semalam sudah ia kirim kembali ke rekening Anda sebagai ucapan terima kasih. Di daerah itu, menolak kebaikan tuan rumah dianggap kurang menghormati, sementara kode etik instansi melarang petugas menerima pemberian dari pemohon yang dilayaninya, dan pemberian yang telanjur diterima wajib dilaporkan. Sikap yang paling tepat Anda tunjukkan adalah...',
 opsi=dict(
  A='Membaca ulang kode etik instansi tentang pemberian sebelum menghubungi pemilik rumah makan.',
  B='Mengirim kembali uang itu kepada pemilik dan menjelaskan aturan instansi dengan santun.',
  C='Melaporkan penerimaan itu kepada KPK tanpa menjelaskan aturannya kepada pemilik rumah makan.',
  D='Melaporkan penerimaan itu kepada KPK agar nama baik Anda tidak tercemar.',
  E='Menjelaskan aturan kepada pemilik dengan santun dan melaporkan penerimaan itu kepada KPK.'),
 kunci='E',
 penentu='pemilik mengirim pesan bahwa uang tagihan semalam sudah ia kirim kembali ke rekening Anda',
 kode=dict(A='D5', B='D4', C='D2', D='D10', E='kunci')),

# ─────────── CONTOH BAB 14 · SOP (089: lensa "ketahanan sosial" = L2 → diganti wujud tindakan) ───────────
dict(tempat='contoh-bab14', asal='089',
 soal='Pesan berantai yang memelintir sengketa batas lahan membuat warga dua dusun saling curiga. Kepala dusun pertama meminta patroli aparat diperpanjang agar tidak terjadi bentrokan, sementara kepala dusun kedua ingin warga kedua dusun kembali ronda dan kerja bakti bersama. Kepala desa mengetahui bahwa isi pesan itu bertentangan dengan peta batas lahan yang tersimpan di kantor desa. Langkah kepala desa yang paling tepat untuk memulihkan persatuan kedua dusun adalah...',
 opsi=dict(
  A='Mempertemukan warga kedua dusun untuk mencocokkan isi pesan dengan peta batas desa.',
  B='Meminta patroli aparat diperpanjang sampai suasana di kedua dusun benar-benar tenang.',
  C='Mengadakan ronda dan kerja bakti bersama yang diikuti warga dari kedua dusun.',
  D='Menyusun kesepakatan damai tertulis yang ditandatangani kedua kepala dusun di kantor desa.',
  E='Memulihkan kepercayaan antarwarga sehingga kedua dusun kembali hidup rukun seperti semula.'),
 kunci='A',
 penentu='Kepala desa mengetahui bahwa isi pesan itu bertentangan dengan peta batas lahan yang tersimpan di kantor desa.',
 kode=dict(A='kunci', B='D5+D2', C='D5+D2', D='D6', E='D3+D1')),
]
