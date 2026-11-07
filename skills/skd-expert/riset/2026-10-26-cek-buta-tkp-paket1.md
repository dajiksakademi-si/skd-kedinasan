# Cek buta TKP paket 1 (2026-10-26)

Penilai: subagent Sonnet, hanya baca versi buta (`buat_buta.py`: 45 soal, 0 sisa kata kunci/poin/skor; 'kunci keamanan USB' soal 27 + 'dikunci' soal 40 = isi soal) + engine v1.3.1 baris 25–224 (filosofi, Pilar 1–3) + 360–388 (Tangga AR/TIK). Banding: `tmp/banding.py`, jawaban penilai `tmp/cekbuta_paket1_penilai.json`. Kendall = jumlah pasangan opsi yang urutannya terbalik (0–10). Hasil sama bukan bukti valid; tanpa ambang lulus.

Catatan penilai: rendah yakin 5, 17, 32. Soal 5 C vs E sama kuat; 17 distraktor A/E lemah, poin 4 B vs C nyaris sama; 32 E hanya gagal bila legalisir wajib dibanding SK asli (tidak tertulis di soal); 4 C bisa saingi B; 31 A vs C bersaing poin 4. Pola: kunci tertebak dari bentuk 'membuat mekanisme baku / menyepakati bersama semua pihak' (25, 26, 28, 33, 39, 40); poin 1 sering berbunyi 'menunggu'/'menyerahkan ke pihak lain'.

| No | Urutan kita 5→1 | Urutan penilai | Kunci | Poin 4 | Kendall (0–10) | Σ|selisih| | Yakin |
|---|---|---|---|---|---|---|---|
| 1 | EADCB | EADCB | sama | sama | 0 | 0 | tinggi |
| 2 | CEABD | CEABD | sama | sama | 0 | 0 | sedang |
| 3 | ADECB | ADECB | sama | sama | 0 | 0 | tinggi |
| 4 | BCEDA | BCEDA | sama | sama | 0 | 0 | sedang |
| 5 | CDEAB | CEDBA | sama | BEDA | 2 | 4 | rendah |
| 6 | EDBCA | EBDCA | sama | BEDA | 1 | 2 | tinggi |
| 7 | BDACE | BADCE | sama | BEDA | 1 | 2 | tinggi |
| 8 | ADCBE | ACDBE | sama | BEDA | 1 | 2 | tinggi |
| 9 | CAEBD | CEABD | sama | BEDA | 1 | 2 | tinggi |
| 10 | CDEBA | CDEBA | sama | sama | 0 | 0 | sedang |
| 11 | ECDAB | EDCBA | sama | BEDA | 2 | 4 | tinggi |
| 12 | DBEAC | DBEAC | sama | sama | 0 | 0 | sedang |
| 13 | BEDCA | BADCE | sama | BEDA | 5 | 6 | tinggi |
| 14 | AEBDC | ABEDC | sama | BEDA | 1 | 2 | tinggi |
| 15 | DACEB | DEACB | sama | BEDA | 2 | 4 | sedang |
| 16 | ECABD | ECBAD | sama | sama | 1 | 2 | sedang |
| 17 | DBCEA | DBCEA | sama | sama | 0 | 0 | rendah |
| 18 | ACBED | ACBDE | sama | sama | 1 | 2 | tinggi |
| 19 | EDCBA | EDABC | sama | sama | 3 | 4 | tinggi |
| 20 | EADCB | EADBC | sama | sama | 1 | 2 | tinggi |
| 21 | CADEB | CADEB | sama | sama | 0 | 0 | sedang |
| 22 | DBAEC | DEBAC | sama | BEDA | 2 | 4 | tinggi |
| 23 | CBDEA | CBADE | sama | sama | 2 | 4 | sedang |
| 24 | EABDC | EABDC | sama | sama | 0 | 0 | tinggi |
| 25 | DBECA | DCBEA | sama | BEDA | 2 | 4 | sedang |
| 26 | BDECA | BDECA | sama | sama | 0 | 0 | sedang |
| 27 | AEBCD | ADBEC | sama | BEDA | 4 | 6 | tinggi |
| 28 | CAEBD | CEABD | sama | BEDA | 1 | 2 | tinggi |
| 29 | DEACB | DEACB | sama | sama | 0 | 0 | tinggi |
| 30 | BCEAD | BEADC | sama | BEDA | 3 | 6 | sedang |
| 31 | EACBD | ECABD | sama | BEDA | 1 | 2 | sedang |
| 32 | AEDCB | AEDBC | sama | sama | 1 | 2 | rendah |
| 33 | DCAEB | DCAEB | sama | sama | 0 | 0 | tinggi |
| 34 | BEACD | BDACE | sama | BEDA | 5 | 6 | tinggi |
| 35 | BADEC | BADEC | sama | sama | 0 | 0 | tinggi |
| 36 | CBEDA | CEDBA | sama | BEDA | 2 | 4 | tinggi |
| 37 | ACBDE | ABCDE | sama | BEDA | 1 | 2 | tinggi |
| 38 | BAEDC | BAEDC | sama | sama | 0 | 0 | tinggi |
| 39 | DACBE | DACBE | sama | sama | 0 | 0 | tinggi |
| 40 | ADCBE | ACDBE | sama | BEDA | 1 | 2 | tinggi |
| 41 | ABEDC | ABEDC | sama | sama | 0 | 0 | tinggi |
| 42 | CDAEB | CADEB | sama | BEDA | 1 | 2 | tinggi |
| 43 | BACED | BCDEA | sama | BEDA | 4 | 6 | tinggi |
| 44 | EACBD | EACBD | sama | sama | 0 | 0 | tinggi |
| 45 | DEACB | DAECB | sama | BEDA | 1 | 2 | tinggi |

Kunci sama 45/45 · poin 4 sama 23/45 · item masuk reviu 22

### Soal 5 — kunci kita C (poin 4 D) · penilai C (poin 4 E) · yakin rendah
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Rekan melanggar SOP demi mempercepat antrean dan candaan sudah gagal, jadi C menutup dua sisi sekaligus (tanda terima tertinggal terbit dan antrean dipercepat dengan cara sah), sedangkan E hanya menegur dan membiarkan akar masalah antrean.
- Alasan kita (kunci vs poin 4): D "menerbitkan sendiri tanda terima untuk berkas tadi", padahal soal menyebut "ia sudah melakukannya sejak Senin", jadi kebiasaannya tetap jalan besok; C menyepakati cara mempercepat antrean bersama rekan, sehingga alasan melewati SOP hilang.

### Soal 6 — kunci kita E (poin 4 D) · penilai E (poin 4 B) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Pengecekan lapangan hanya tiga hari sedangkan masa tanam sepuluh hari lagi, jadi E memverifikasi langsung ke lahan dalam pekan ini, sedangkan B hanya memverifikasi lewat telepon sehingga syarat verifikasi tidak terpenuhi sungguh-sungguh.
- Alasan kita (kunci vs poin 4): D memakai "surat pernyataan" sebagai jalan pintas, padahal "pengecekan lapangan biasanya selesai dalam tiga hari", masih jauh sebelum masa tanam; E menjalankan verifikasi yang sebenarnya, jadi data keenam petani benar-benar beres.

### Soal 7 — kunci kita B (poin 4 D) · penilai B (poin 4 A) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Penertiban saat ada keluhan terbukti gagal karena kursi kembali ditandai dan koordinator berwenang membuat aturan, jadi B menetapkan giliran tiga jam sebagai aturan baku, sedangkan A menambah kursi lipat tanpa menyentuh akar kebiasaan menandai meja.
- Alasan kita (kunci vs poin 4): D menertibkan "setiap kali ada pengunjung yang mengeluh", padahal soal menyebut "kursi kembali ditandai begitu petugas pergi"; B memasang giliran yang berjalan sejak ruang penuh, tanpa menunggu keluhan.

### Soal 8 — kunci kita A (poin 4 D) · penilai A (poin 4 C) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Laporan format baru wajib dibuat tiap triwulan dan staf lama masih bisa ditelepon, jadi A memanfaatkan bimbingannya sekaligus menuliskan panduan seksi, sedangkan C selesai sendiri tetapi tidak meninggalkan panduan untuk triwulan berikutnya.
- Alasan kita (kunci vs poin 4): D meminta staf yang dimutasi "mengerjakan bagian format baru", padahal laporan ini "wajib dibuat setiap triwulan"; A menuliskan langkahnya menjadi panduan seksi, jadi triwulan berikutnya tidak bergantung pada orang yang sudah pindah.

### Soal 9 — kunci kita C (poin 4 A) · penilai C (poin 4 E) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Beberapa dari 12 penguji muda ikut tertawa di depan umum sehingga ucapannya perlu ditegur di tempat, sedangkan E menegur empat mata setelah apel sehingga penguji muda tidak melihat sikap pimpinan.
- Alasan kita (kunci vs poin 4): A menyerahkan teguran "kepada kepala balai", padahal Anda sendiri yang "memimpin apel pagi hari ini" dan bisa meluruskan di forum itu; C menegur langsung di depan peserta yang sama.

### Soal 11 — kunci kita E (poin 4 C) · penilai E (poin 4 D) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Data tim lain diperbarui bulan lalu sedangkan data Anda dari tahun lalu, jadi E mencocokkan daftar kedua bidang sebelum menyusun jadwal gabungan, sedangkan D hanya menggabungkan 15 keluarga yang mengeluh dan sisa keluarga tetap berisiko dikunjungi dua kali.
- Alasan kita (kunci vs poin 4): C memakai "daftar kunjungan Anda" sebagai acuan, padahal soal menyebut "Data tim itu diperbarui pusat bulan lalu", sedangkan data Anda dari pendataan tahun lalu; E mencocokkan kedua daftar dulu sebelum jadwal disusun.

### Soal 13 — kunci kita B (poin 4 E) · penilai B (poin 4 A) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Pengelola jaringan tersedia dan komputer bidang lain tetap tertular meski dibersihkan sendiri, jadi B menyerahkan flashdisk ke pengelola, sedangkan A hanya memperbarui antivirus sendiri dan tidak melaporkan flashdisk bermasalah itu.
- Alasan kita (kunci vs poin 4): E "memindai sendiri flashdisk itu berulang kali", padahal soal menyebut komputer bidang sebelah "tetap tertular meskipun sudah dibersihkan sendiri oleh pemakainya"; B menyerahkannya ke pengelola jaringan yang memang bertugas memeriksa perangkat bermasalah.

### Soal 14 — kunci kita A (poin 4 E) · penilai A (poin 4 B) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Dua teguran langsung gagal, sudah ada luka bakar, dan pembagian tugas diatur kepala seksi, jadi A melapor dengan catatan kejadian, sedangkan B menunggu peserta terluka lagi sebelum melapor.
- Alasan kita (kunci vs poin 4): E "menggantikan rekan mengawasi kelas praktik las setiap kali ia meninggalkan peserta", padahal soal menyebut "angkatan ini masih berjalan dua bulan lagi", sehingga pengamannya bergantung pada Anda selama itu; A membawa kebiasaan itu ke kepala seksi yang mengatur pembagian tugas.

### Soal 15 — kunci kita D (poin 4 A) · penilai D (poin 4 E) · yakin sedang
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Pamflet masih terpasang di ruang ganti dan dua perawat yang terdampak sudah tidak nyaman, jadi D mencopot pamflet, menghapus foto dari grup, dan menemui perawat, sedangkan E membiarkan pamflet terpasang dan tidak merawat hubungan dengan perawat.
- Alasan kita (kunci vs poin 4): A menyerahkan ke kepala bidang dan "menunggu keputusan tertulis darinya", padahal Anda sendiri yang "mengelola papan pengumuman serta grup pesan ruangan"; D mencopot pamflet dan menghentikan sebarannya sekarang.

### Soal 22 — kunci kita D (poin 4 B) · penilai D (poin 4 E) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Koordinator berwenang menghapus denda yang terbukti keliru dan lembar pengosongan harian ada sebagai bukti, jadi D mencocokkan bukti itu lalu memutuskan sendiri, sedangkan E melempar keputusan yang berada dalam wewenang Anda ke kepala perpustakaan.
- Alasan kita (kunci vs poin 4): B menyampaikan dugaan "kepada petugas teknologi informasi", padahal soal menyebut rekan sirkulasi "memindainya ke sistem dengan tangan"; D memeriksa catatan sirkulasi tempat tanggal itu sebenarnya dicatat.

### Soal 25 — kunci kita D (poin 4 B) · penilai D (poin 4 C) · yakin sedang
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Format laporan berbeda-beda dan keterlambatan sudah tiga bulan, serta ada pertemuan Jumat dengan semua relawan, jadi D menyepakati format dan tenggat bersama mereka, sedangkan C hanya mengirim edaran sepihak tanpa menyelesaikan masalah format.
- Alasan kita (kunci vs poin 4): B "menelepon setiap relawan yang terlambat satu per satu" dan menulis laporannya sendiri, padahal keterlambatan "sudah terjadi tiga bulan berturut-turut"; D membuat kesepakatan yang berlaku untuk bulan-bulan berikutnya.

### Soal 27 — kunci kita A (poin 4 E) · penilai A (poin 4 D) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Unit TI menyimpan 20 kunci keamanan USB yang didukung sistem surel, jadi A menjaga verifikasi dua langkah tetap berjalan, sedangkan D menjaga keamanan tetapi membiarkan ketiga staf tidak bisa bekerja sampai bulan depan.
- Alasan kita (kunci vs poin 4): E membebaskan verifikasi "sampai penguat sinyal terpasang", padahal "bulan lalu satu akun surel bagian umum dibobol"; A menjaga verifikasi kedua tetap berlaku sejak hari ini.

### Soal 28 — kunci kita C (poin 4 A) · penilai C (poin 4 E) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Pemilik bengkel mengeluh soal bentuk yang berganti dan kolom tidak dipahami, serta ada empat tempat baru, jadi C merumuskan format tetap bersama perwakilan bengkel, sedangkan E membakukan lembar sepihak tanpa mendengar kolom yang tidak dipahami.
- Alasan kita (kunci vs poin 4): A "mendatangi keenam bengkel tiap menjelang batas" dan tetap memakai "format semester itu", padahal "Semester depan sekolah menambah empat tempat praktik baru"; C menghasilkan format dan jadwal tetap yang langsung berlaku untuk sepuluh mitra.

### Soal 30 — kunci kita B (poin 4 C) · penilai B (poin 4 E) · yakin sedang
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Pedagang butuh bukti identitas besok pagi dan kepala seksi yang menandatangani ada sampai sore, jadi B menerbitkan surat keterangan pengganti hari ini tanpa menyentuh blanko korban bencana, sedangkan E hanya mengantre cetak sehingga kebutuhan besok pagi tidak terpenuhi.
- Alasan kita (kunci vs poin 4): C "meminta rekan di bagian pencetakan menyisihkan satu blanko cadangan", padahal "tiga blanko cadangan di bagian pencetakan disisihkan untuk warga korban bencana"; B memenuhi kebutuhan besok tanpa menyentuh jatah itu.

### Soal 31 — kunci kita E (poin 4 A) · penilai E (poin 4 C) · yakin sedang
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Tanya jawab hanya berlangsung dalam rapat dan sistem tender bisa menyiarkan, merekam, serta menampung pertanyaan tertulis, jadi E memberi semua penyedia kesempatan bertanya tanpa menggeser jadwal, sedangkan C mengirim rekaman tanpa kesempatan bertanya.
- Alasan kita (kunci vs poin 4): A "menggeser rapat penjelasan ke hari Kamis" tanpa memastikan peserta lain bisa, padahal "Dua peserta lain sudah memesan tiket dari luar kota untuk hadir Rabu itu"; E tidak memindahkan jadwal siapa pun.

### Soal 34 — kunci kita B (poin 4 E) · penilai B (poin 4 D) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Daftar kontak memuat nomor resmi puskesmas dan desa tetangga tertipu surat tugas palsu, jadi B memverifikasi lewat nomor tercatat lalu melapor kepala desa, sedangkan D hanya menyimpan berkas dan menunggu tanpa memverifikasi atau melapor.
- Alasan kita (kunci vs poin 4): E hanya "memeriksa surat tugas dan kartu pegawai petugas itu", padahal "Bulan lalu desa tetangga menyerahkan data warga kepada orang yang membawa surat tugas palsu"; B memastikan langsung ke puskesmas lewat nomor yang dipegang kantor.

### Soal 36 — kunci kita C (poin 4 B) · penilai C (poin 4 E) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Senior ada di kantor hari ini dan laporan baru dikirim Jumat, jadi C menunjukkan hasil ukur GPS langsung sebagai bukti sebelum kirim, sedangkan E hanya mengirim pesan bahwa angka tampak keliru tanpa membawa bukti.
- Alasan kita (kunci vs poin 4): B menunda "untuk dibahas pada rapat evaluasi bulan depan", padahal "Angka itu menjadi dasar pembagian pupuk bersubsidi musim tanam berikutnya"; C membereskannya sebelum laporan dikirim.

### Soal 37 — kunci kita A (poin 4 C) · penilai A (poin 4 B) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Sebagian besar pengajuan dikirim dari rumah dan Anda admin yang bisa mengubah halaman, jadi A memasang petunjuk di halaman unggah yang dilihat setiap pemohon, sedangkan B hanya membalas pengajuan yang sudah ditolak satu per satu.
- Alasan kita (kunci vs poin 4): C hanya membantu warga "yang datang ke kantor kecamatan", padahal "Sebagian besar pengajuan dikirim warga dari rumah"; A menaruh petunjuk di halaman unggah yang dibuka setiap pemohon, di mana pun ia berada.

### Soal 40 — kunci kita A (poin 4 D) · penilai A (poin 4 C) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Perizinan mengundang pemohon sepekan sebelumnya dan jam baru dikunci Rabu, jadi A menanyakan pilihan jam kepada ketiga bidang sebelum Rabu, sedangkan C memilih Sabtu sore sepihak tanpa memeriksa jadwal bidang perizinan.
- Alasan kita (kunci vs poin 4): D baru memberi tahu "begitu jam pemeliharaan dikunci Rabu", padahal bidang "perizinan biasa mengundang pemohon mengambil izin sepekan sebelumnya"; A meminta jawaban bidang sebelum jam dikunci.

### Soal 42 — kunci kita C (poin 4 D) · penilai C (poin 4 A) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Nasihat sudah gagal dan Anda melihat sendiri pembagian formulir ke relawan muda, yaitu ajakan nyata, jadi C melapor ke kepala pelaksana, sedangkan A mengulang nasihat yang terbukti tidak berhasil.
- Alasan kita (kunci vs poin 4): D menunggu "buktinya sudah lebih kuat", padahal "Anda melihat sendiri ia kembali membagikan formulir itu kepada dua relawan muda"; C melaporkan sekarang dengan bukti yang sudah ada.

### Soal 43 — kunci kita B (poin 4 A) · penilai B (poin 4 C) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Anda yang menyusun petunjuk pelaksanaan untuk sekitar 40 pegawai luar daerah, jadi B menuliskan aturan umum bagi semua, sedangkan C hanya memintakan pengecualian untuk enam orang yang bertanya.
- Alasan kita (kunci vs poin 4): A membiarkan "risiko teguran dari pimpinan ditanggung pegawai sendiri", padahal "Pelanggaran edaran itu dicatat dalam penilaian disiplin bulanan"; B menuliskan izinnya dalam petunjuk resmi, jadi pegawai tidak bisa dicatat melanggar.

### Soal 45 — kunci kita D (poin 4 E) · penilai D (poin 4 A) · yakin tinggi
- Skor yang penilai beri ke kunci kita: 5; skor kita untuk kunci penilai: 5
- Alasan penilai: Salah satu pengirim justru bertanya apakah isinya benar sehingga masih bisa diajak bicara, jadi D menghapus poster lalu mengingatkan keduanya secara pribadi, sedangkan A hanya menghapus berulang tanpa membicarakan dengan pengirim.
- Alasan kita (kunci vs poin 4): E mengumumkan "kedua pengirimnya akan dilaporkan ke atasan", padahal "Salah satu dari dua pengirim pertama menulis pertanyaan apakah isinya benar di bawah kirimannya"; D menghapus poster lalu mengingatkan pengirim secara pribadi.

