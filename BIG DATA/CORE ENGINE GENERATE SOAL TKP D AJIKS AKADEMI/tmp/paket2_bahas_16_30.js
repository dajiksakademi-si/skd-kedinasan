// Paket 2 TKP — pembahasan soal 16–30. Siswa versi hangat (tulis ulang atas permintaan Gusti 2026-10-26).
module.exports = {
 "16": {
  "reviu": [
   "Dilema: keleluasaan grup dan hubungan dengan auditor senior vs video yang mengajak bersiap melawan satu kelompok warga dan sudah diteruskan ke grup lain (tangga AR: konten menyebar).",
   "E memakai wewenang admin yang disebut di soal: kunci grup sementara agar tidak ada yang meneruskan lagi, lalu hapus videonya. Urutan ini menghentikan sebaran malam itu juga.",
   "A=4 (S4 +J2): video dihapus, tetapi grup tetap terbuka dan pemantauan dibebankan ke staf baru. D=3 (S1): baru dibahas besok pagi, sebaran berjalan semalaman. C=2: membantah dan menegur di depan grup, memancing ramai. B=1: beban meralat dilempar ke pengirim.",
   "<b>Kunci vs A (poin 4):</b> A menghapus video \"dengan staf baru ditugasi memantau grup setiap malam\", sementara anggota masih bebas mengirim ulang; E membatasi grup agar hanya admin bisa mengirim pesan sebelum menghapus video.<br>\n      <b>Kunci vs D (poin 3):</b> D baru mengingatkan \"dalam rapat rutin besok pagi\", padahal video sudah diteruskan ke grup lain malam ini; E menghentikan sebarannya saat itu juga."
  ],
  "siswa": {
   "tanya": "bayangkan malam-malam ponselmu bergetar terus. Di grup kantor yang kamu kelola, ada video “bocoran” kerusuhan yang mengajak orang bersiap melawan satu kelompok warga, dan ternyata sudah sampai ke grup lain. Pengirimnya auditor senior. Di situasi begini, yang paling penting adalah apa yang kamu kerjakan duluan.",
   "opsi": {
    "E": "kamu kunci grupnya sebentar supaya tidak ada lagi yang bisa meneruskan, baru videonya kamu hapus. Sebagai admin, kamu memang punya tombol itu, jadi pakailah.",
    "A": "aku paham, menghapus video rasanya sudah cukup. Masalahnya, grup masih terbuka. Yang sempat menyimpan videonya bisa mengirim ulang lima menit kemudian. Menitipkan pengawasan tiap malam ke satu staf baru juga berat buat dia.",
    "D": "rapat besok pagi memang tempat yang pas untuk membahasnya, tapi semalam itu panjang. Video seperti ini bisa sudah beranak ke puluhan grup sebelum kamu sampai kantor.",
    "C": "niatnya meluruskan, tapi membantah dan menegur di depan semua anggota biasanya malah memancing debat panjang malam itu juga.",
    "B": "kamu yang memegang kendali grup. Rasanya kurang pas kalau pengirimnya yang disuruh membereskan grup-grup lain sendirian."
   },
   "kunci": "E menghentikan video itu bergerak dulu, baru membersihkan sisanya.",
   "analogi": "waktu keran di dapur bocor, kamu pasti tutup kerannya dulu sebelum mengambil kain pel. Mengepel sambil airnya masih mengucur tidak akan selesai-selesai.",
   "jebakan": "pilihan A ini menggoda karena kata \"menghapus\" sudah terdengar tuntas. Coba bayangkan lagi grup yang masih terbuka itu.",
   "tips": "untuk kabar berbahaya yang sedang menyebar, tanyakan pada dirimu: jawaban mana yang membuatnya berhenti menyebar malam ini juga?"
  }
 },
 "17": {
  "reviu": [
   "Dilema: layanan surel harus pulih cepat vs penyebab belum pasti; rekan senior menduga server penuh, padahal semalam ada pembaruan jaringan oleh penyedia.",
   "C memeriksa layar pemantauan beban server dan jaringan, sehingga tindakan berikutnya berdasar data, dan arsip tidak terhapus karena dugaan.",
   "E=4 (S5): dugaan jaringan masuk akal dan aplikasi bisa pulih hari ini, tetapi penundaan diminta sebelum penyebabnya dipastikan. B=3 (S2 +J5): menghapus arsip satu bidang berdasar dugaan. D=2: menghapus arsip semua bidang. A=1: surel pribadi untuk surat dinas.",
   "<b>Kunci vs E (poin 4):</b> E meminta pembaruan jaringan \"ditunda sampai jam pulang kantor\", padahal penyebab perlambatan belum dipastikan; C memastikan sumber perlambatan lewat grafik beban server dan arus data jaringan dulu.<br>\n      <b>Kunci vs B (poin 3):</b> B menghapus arsip surat lama \"sesuai dugaan rekan senior\" tanpa melihat data; C mengecek tampilan pemantauan sebelum mengambil tindakan."
  ],
  "siswa": {
   "tanya": "sejak pagi semua bidang mengeluh surel kantor lambat. Rekan seniormu sudah yakin sekali servernya penuh dan ingin langsung menghapus arsip lama. Tapi soal ini menyelipkan satu kalimat kecil: semalam penyedia internet memperbarui jaringan gedung. Kalimat kecil seperti itu biasanya bukan hiasan.",
   "opsi": {
    "C": "kamu lihat dulu layar pemantauan. Dari grafiknya akan kelihatan, yang sesak itu servernya atau jaringannya. Setelah tahu, baru kamu bertindak dengan tenang.",
    "E": "tebakanmu bisa jadi benar, memang ada pembaruan jaringan semalam, dan kalau benar aplikasinya pulih. Tapi itu tetap tebakan. Kalau ternyata servernya yang bermasalah, pekerjaan penyedia sudah tertunda percuma.",
    "B": "kalau ternyata jaringan yang bermasalah, arsip yang sudah dihapus tidak bisa kembali. Sayang sekali hilang hanya karena dugaan.",
    "D": "ini versi yang lebih berat dari B, karena arsip semua bidang ikut terhapus.",
    "A": "semangat menolongnya bagus, tapi surat dinas lewat surel pribadi tidak tercatat resmi dan rawan bocor."
   },
   "kunci": "C mencari penyebabnya dari data yang sudah ada sebelum ada yang terlanjur dihapus.",
   "analogi": "saat kamu ke dokter karena sakit perut, dokter yang baik tidak langsung memberi obat maag. Ia periksa dulu, karena sumber sakitnya bisa saja lain.",
   "jebakan": "yang membuat B dan D menggoda adalah keyakinan rekan senior. Wajar kalau kita ingin percaya pada yang lebih berpengalaman, tapi di soal seperti ini keyakinan tetap perlu dicek.",
   "tips": "setiap kali soal menyebut ada alat untuk memeriksa, coba lirik jawaban yang memakai alat itu sebelum mengambil tindakan."
  }
 },
 "18": {
  "reviu": [
   "Dilema: menghormati keputusan panitia kecamatan vs hak setara sanggar barongsai warga keturunan yang sudah terdaftar; penetapan peserta di tangan kepala bidang, pendaftaran tutup lusa sore.",
   "C membawa perkara ke kepala bidang, pemegang wewenang penetapan peserta, hari ini (sebelum pendaftaran ditutup lusa sore), lengkap dengan bukti dasar aturannya. Pemicu J3 terpenuhi: penetapan peserta di luar wewenang Anda.",
   "B=4 (S3): hari ini dan berbekal juknis, tetapi dibawa ke panitia yang mencoret, padahal penetapan peserta ada di tangan kepala bidang. E=3 (S2 +J4): sanggar masuk, tetapi sebagai peserta tamu, haknya separuh. D=2: ikut demi hubungan dengan camat. A=1: diam.",
   "<b>Kunci vs B (poin 4):</b> B meminta panitia \"memasukkan kembali sanggar itu\", padahal penetapan peserta ada di tangan kepala bidang; C menyerahkan daftar coretan dan salinan juknis kepada kepala bidang hari ini.<br>\n      <b>Kunci vs E (poin 3):</b> E meminta sanggar dimasukkan \"sebagai peserta tamu\", padahal sanggar sudah terdaftar dan berhak tampil setara dengan peserta lain; C membawa salinan petunjuk teknis ke pihak yang berwenang menetapkan peserta."
  ],
  "siswa": {
   "tanya": "sanggar barongsai milik warga keturunan Tionghoa dicoret panitia kecamatan karena dianggap \"bukan budaya daerah\", padahal sanggarnya sudah terdaftar. Penetapan peserta ada di tangan kepala bidangmu, dan pendaftaran tutup lusa sore. Di titik ini, coba pikirkan dua hal: siapa yang sebenarnya berhak memutuskan, dan kapan batas waktunya.",
   "opsi": {
    "C": "hari ini juga kamu serahkan daftar coretan itu ke kepala bidang, orang yang memang berwenang menetapkan peserta, beserta salinan aturannya. Waktunya masih cukup sebelum pendaftaran tutup.",
    "B": "buktinya sudah kamu bawa, dan waktunya juga tepat, hari ini. Tapi kamu membawanya ke panitia yang mencoret, padahal yang berhak menetapkan peserta adalah kepala bidangmu.",
    "E": "kelihatannya jalan tengah yang damai, ya. Tapi coba rasakan dari sisi sanggar itu: mereka peserta terdaftar, kok hanya boleh tampil sebagai tamu.",
    "D": "menjaga hubungan baik dengan camat memang perlu, asal tidak dibayar dengan mencoret warga yang berhak ikut.",
    "A": "diam di sini artinya membiarkan pencoretan itu berjalan."
   },
   "kunci": "C membawa masalahnya ke orang yang bisa memutuskan, lengkap dengan bukti, sebelum waktunya habis.",
   "analogi": "misalnya satpam kompleks melarang tamumu masuk padahal namanya sudah ada di daftar tamu. Kamu tidak akan berdebat lama di gerbang. Kamu telepon pengelola kompleks sambil menunjukkan daftarnya.",
   "jebakan": "banyak yang tergoda E karena terdengar rukun dan tidak ribut. Pertanyaannya, apakah tampil sebagai tamu itu sama dengan diperlakukan setara?",
   "tips": "kalau keputusan ada di tangan pihak tertentu, bawa buktinya ke pihak itu, jangan berdebat dengan yang tidak berwenang. Cek juga tanggalnya."
  }
 },
 "19": {
  "reviu": [
   "Dilema: tenggat daftar bantuan ratusan nelayan lusa vs NIK dan nomor ponsel tidak boleh keluar ke layanan daring pihak luar. Pasangan kontras soal 6 (di sana alat AI tetap dipakai karena tidak ada data pribadi).",
   "A memakai sarana yang ada di soal: tiga staf bidang yang siap membantu dan lembar kerja di komputer kantor. Data tidak keluar, tenggat lusa tercapai dengan kerja bergilir.",
   "D=4 (S2): NIK dihapus, tetapi nama dan nomor ponsel tetap terunggah. B=3 (S3): meminta izin atasan untuk tindakan yang tetap membocorkan data. E=2 +J2: beban dipindah ke nelayan. C=1 (aktif-e): nilai \"cepat sampai ke nelayan\" jadi dalih mengunggah semuanya.",
   "<b>Kunci vs D (poin 4):</b> D hanya \"menghapus kolom NIK\" sebelum mengunggah, sehingga nama dan nomor ponsel nelayan tetap keluar ke alat daring; A merapikan daftar di lembar kerja kantor oleh tiga staf.<br>\n      <b>Kunci vs B (poin 3):</b> B \"meminta izin kepala bidang untuk mengunggah daftar itu\", sehingga data tetap keluar walau sudah diizinkan; A tidak mengunggah sama sekali."
  ],
  "siswa": {
   "tanya": "ada ratusan nelayan yang menunggu daftar bantuan mesin kapal, dan daftarnya harus rapi lusa. Rekanmu punya ide yang terdengar praktis: unggah saja ke alat kecerdasan buatan gratis. Sebelum setuju, coba ingat lagi apa saja isi daftar itu: nama, NIK, dan nomor ponsel.",
   "opsi": {
    "A": "daftarnya dikerjakan bergiliran oleh tiga staf di komputer kantor. Memang tidak secepat alat daring, tapi lusa masih terkejar, dan data para nelayan tetap aman di kantor.",
    "D": "menghapus NIK menunjukkan kamu sudah mulai waspada, dan itu bagus. Sayangnya nama dan nomor ponsel masih ikut terkirim, padahal itu juga data pribadi.",
    "B": "izin atasan tidak mengubah kenyataan bahwa data warga tetap keluar ke layanan milik pihak luar.",
    "E": "datanya sebenarnya sudah ada di kantor. Kasihan nelayan kalau harus mengisi ulang.",
    "C": "alasannya memang mulia, supaya bantuan cepat sampai. Tapi data ratusan orang jadi berpindah ke layanan yang tidak jelas siapa pengelolanya."
   },
   "kunci": "A menyelesaikan daftar tepat waktu tanpa membawa data warga keluar kantor.",
   "analogi": "kamu tentu tidak akan menitipkan fotokopi KTP seluruh keluargamu ke orang asing hanya supaya dijilid lebih cepat, apalagi kalau di rumah ada yang bisa mengerjakannya.",
   "jebakan": "D sering dipilih karena terasa sudah hati-hati. Baca pelan-pelan sekali lagi isi daftarnya, ada nomor ponsel di sana.",
   "tips": "begitu soal menyebut data pribadi warga, waspadai setiap jawaban yang mengirim data itu ke luar."
  }
 },
 "20": {
  "reviu": [
   "Dilema: tenggat rekap ke pimpinan sore ini vs angka satu unit melonjak tiga kali lipat dan belum disahkan bendahara. Pasangan kontras soal 3 (di sana format jadi akar masalah; di sini format sudah seragam).",
   "E memisahkan yang sudah sah dari yang belum: sebelas unit dikirim tepat waktu, satu unit ditahan sampai disahkan bendahara yang masih bisa dihubungi hari ini.",
   "D=4 (S4 +J1): diberi tanda, tetapi angka belum sah tetap sampai ke pimpinan atas nama format. A=3 (S3): keputusan teknis dilempar ke pimpinan. C=2: kirim apa adanya. B=1: menunda seluruh rekap.",
   "<b>Kunci vs D (poin 4):</b> D tetap \"mencantumkan angka unit itu\" dengan tanda belum disahkan, sehingga angka janggal ikut dibaca pimpinan; E menahan angka satu unit itu sampai disahkan bendaharanya.<br>\n      <b>Kunci vs A (poin 3):</b> A \"meminta beliau memutuskan\" soal angka janggal, padahal memeriksa kelengkapan rekap adalah tugas Anda; E memutuskan sendiri dengan dasar tanda tangan bendahara."
  ],
  "siswa": {
   "tanya": "sore ini rekap dua belas unit harus sampai ke pimpinan. Saat memeriksa, matamu tertumbuk pada satu angka yang naik tiga kali lipat dan belum ditandatangani bendaharanya. Kabar baiknya, bendaharanya masih bisa dihubungi hari ini.",
   "opsi": {
    "E": "sebelas unit yang sudah beres kamu kirim sore ini. Satu unit yang janggal kamu tahan dulu sampai bendaharanya mengesahkan. Pimpinan tetap menerima rekap tepat waktu, dan isinya bisa dipercaya.",
    "D": "memberi tanda \"belum disahkan\" itu jujur, dan aku hargai. Hanya saja angka janggal itu tetap terbaca oleh pimpinan, dan penyebab lonjakannya belum dicari.",
    "A": "memeriksa rekap ini memang tugasmu. Pimpinan tidak perlu diganggu untuk hal yang bisa kamu bereskan dengan satu telepon ke bendahara.",
    "C": "begitu kamu mengirim angka yang sudah kamu tahu janggal, kamu ikut bertanggung jawab atas angka itu.",
    "B": "gara-gara satu unit, sebelas unit yang sudah rapi ikut tertahan. Sayang."
   },
   "kunci": "E menepati tenggat untuk bagian yang sudah sah dan menahan bagian yang belum.",
   "analogi": "kalau satu dari dua belas kue pesanan ternyata gosong, kamu kirim sebelas kue tepat waktu dan bilang satu menyusul. Kue yang gosong tidak ikut dikirim dengan tulisan \"maaf, agak gosong\".",
   "jebakan": "D menggoda karena terasa terbuka dan rapi sesuai format. Coba bayangkan pimpinan membaca angka itu di rapat.",
   "tips": "kalau hanya sebagian data yang bermasalah, pisahkan bagian itu. Jangan menahan semuanya, jangan juga meloloskan semuanya."
  }
 },
 "21": {
  "reviu": [
   "Dilema: kelancaran pemeriksaan lewat auditor sesuku dengan pejabat yang diperiksa vs kesempatan setara bagi auditor dari luar daerah; pedoman mewajibkan rotasi.",
   "A dikerjakan oleh Anda sendiri sebagai penyusun jadwal, mulai bulan ini karena jadwalnya belum terbit, dan berlaku untuk semua auditor tanpa melihat asal daerah.",
   "C=4 (S1 +J4): rotasi benar, tetapi baru bulan depan padahal jadwal bulan ini belum terbit. D=3 (S2): hanya rekan yang mengeluh yang dipindah. E=2: mempertahankan pola sesuku. B=1: bagi rata hari, masalah tujuan tetap.",
   "<b>Kunci vs C (poin 4):</b> C memberlakukan rotasi \"mulai jadwal bulan depan\", padahal jadwal penugasan bulan ini belum diterbitkan dan Anda penyusunnya; A mengatur giliran pemeriksaan bulan ini berdasarkan rotasi.<br>\n      <b>Kunci vs D (poin 3):</b> D hanya memasukkan \"rekan yang mengeluh itu\" ke dua kabupaten, sehingga auditor lain dari luar daerah tetap tidak tersentuh; A mengatur giliran semua auditor tanpa mempertimbangkan asal daerah."
  ],
  "siswa": {
   "tanya": "rekanmu dari luar daerah curhat. Setahun ini ia tidak pernah ditugaskan ke dua kabupaten tertentu karena ketua tim selalu memilih auditor yang sesuku dengan pejabat di sana. Kebetulan kamu yang menyusun jadwal, dan jadwal bulan ini belum terbit.",
   "opsi": {
    "A": "jadwal bulan ini kamu susun dengan rotasi, tanpa melihat asal daerah siapa pun. Pena ada di tanganmu dan jadwalnya belum keluar, jadi belum terlambat.",
    "C": "rotasinya sudah benar. Yang membuatku bertanya, kenapa harus menunggu bulan depan kalau jadwal bulan ini masih bisa kamu atur?",
    "D": "rekanmu akhirnya kebagian, dan itu melegakan. Tapi auditor lain dari luar daerah yang senasib tetap tidak tersentuh.",
    "E": "alasan \"lebih paham karakter pejabat\" justru membuat pemeriksaan rawan tidak objektif.",
    "B": "jumlah harinya memang sama rata, tapi tujuan tugasnya masih ditentukan oleh suku."
   },
   "kunci": "A memperbaiki cara penugasan untuk semua auditor, di bulan yang masih bisa kamu atur.",
   "analogi": "ingat jadwal piket kelas? Yang menyusun bisa langsung membuat giliran yang adil minggu ini, tidak perlu menunggu minggu depan hanya karena protesnya datang sekarang.",
   "jebakan": "C terdengar bijak dan tidak terburu-buru. Padahal soal sengaja memberi tahu bahwa jadwal bulan ini belum terbit.",
   "tips": "kalau alatnya ada di tanganmu sendiri dan waktunya masih ada, biasanya yang terbaik adalah bertindak sekarang."
  }
 },
 "22": {
  "reviu": [
   "Dilema: hak pengantar memprotes keterlambatan vs ketenangan ruang tunggu dan kejelasan kabar bagi pasien lain; sebab lambat jelas: satu dokter baru datang pukul sepuluh sesuai jadwal.",
   "D menjawab sumber kemarahan (tidak tahu sebab dan waktu) kepada pengantar maupun seluruh pasien yang mulai gelisah, sehingga ruang tunggu tenang tanpa konfrontasi soal rekaman.",
   "C=4 (S2): penjelasan benar, tetapi hanya untuk pengantar; pasien lain tetap gelisah. A=3 (S5): menenangkan dengan janji yang belum dipastikan. E=2 +J1: berpegang pada papan larangan, keluhan tidak dijawab. B=1: diam.",
   "<b>Kunci vs C (poin 4):</b> C menjelaskan \"kepada pengantar yang marah itu\", padahal pasien lain di ruang tunggu juga mulai gelisah; D menyampaikan sebab dan perkiraan waktu kepada seluruh pasien di ruang tunggu.<br>\n      <b>Kunci vs A (poin 3):</b> A \"menjanjikan semua beres siang ini tanpa mengecek jadwal\"; D memberi perkiraan waktu berdasarkan jadwal dokter yang tercatat."
  ],
  "siswa": {
   "tanya": "ruang tunggu sedang panas. Seorang pengantar pasien marah-marah sambil merekam petugas karena antrean lambat, dan pasien lain mulai gelisah. Sebenarnya sebabnya sederhana: satu dokter memang dijadwalkan baru datang pukul sepuluh.",
   "opsi": {
    "D": "kamu jelaskan sebab dan perkiraan waktunya, bukan hanya ke pengantar itu, tapi juga ke semua yang menunggu. Orang biasanya jauh lebih sabar kalau tahu harus menunggu sampai kapan.",
    "C": "penjelasannya sudah tepat, hanya pendengarnya cuma satu orang. Pasien lain di ruang tunggu masih bertanya-tanya sendiri.",
    "A": "niatnya menenangkan, tapi janji \"semua beres siang ini\" tanpa mengecek jadwal dokter bisa jadi masalah baru kalau meleset.",
    "E": "larangan merekam memang ada. Tapi menegur soal itu di saat orang sedang marah biasanya membuatnya makin panas, dan pertanyaan dia tetap tidak terjawab.",
    "B": "pura-pura tidak terjadi apa-apa malah membuat suasana makin tegang."
   },
   "kunci": "D menjawab hal yang membuat orang gelisah, kepada semua orang yang gelisah.",
   "analogi": "kamu pasti pernah menunggu kereta yang terlambat. Pengumuman \"kereta terlambat 20 menit karena gangguan sinyal\" saja sudah cukup membuat kita lebih tenang, dibanding diam tanpa kabar.",
   "jebakan": "E terlihat tegas dan sesuai aturan. Coba tanya, sebenarnya apa yang dibutuhkan pengantar itu: kejelasan, bukan dibalas dengan aturan.",
   "tips": "saat banyak orang terganggu oleh hal yang sama, pilih jawaban yang menjangkau mereka semua, bukan hanya yang suaranya paling keras."
  }
 },
 "23": {
  "reviu": [
   "Dilema: komitmen agar pembicara mitra tetap tampil vs jadwal ratusan peserta; telepon dua kali putus-putus, pesan teks masih masuk, materi sudah dikirim kemarin.",
   "C memakai saluran yang terbukti jalan (pesan teks) untuk mengirim tautan, sehingga pembicara mitra tetap tampil sendiri dan jadwal tetap terjaga.",
   "D=4 (S4): sesi berjalan, tetapi pembicara mitra tidak tampil; komitmen dengan mitra terlewat padahal ia masih bisa dijangkau. E=3 (S5 +J6): menelepon lagi, saluran yang dua kali gagal, dan alamat tautan dibacakan lisan. A=2: membatalkan atas nama mitra. B=1: menunggu tanpa kepastian.",
   "<b>Kunci vs D (poin 4):</b> D \"meminta moderator membawakan materi\", padahal pembicara masih bisa dijangkau lewat pesan teks; C mengirim tautan agar pembicara menyampaikan materinya sendiri.<br>\n      <b>Kunci vs E (poin 3):</b> E \"menelepon pembicara lagi\" lalu membacakan tautan \"secara lisan\", padahal sambungan telepon selalu putus-putus; C mengirim tautan melalui pesan teks yang masih masuk."
  ],
  "siswa": {
   "tanya": "pagi ini seminar dengan ratusan peserta, dan pembicara dari instansi mitra terjebak banjir. Teleponnya putus-putus terus, tapi pesan teksnya masih masuk. Kalau kamu baca pelan-pelan, soal ini sebenarnya sudah menyiapkan jalan keluarnya.",
   "opsi": {
    "C": "kamu kirim tautan konferensi video lewat pesan teks, saluran yang masih jalan. Pembicaranya tetap bisa tampil dari tempatnya sekarang.",
    "D": "sesi tetap berjalan, dan itu bagus. Sayangnya yang tampil moderator, padahal pembicaranya masih bisa dihubungi. Mitra jadi kehilangan kesempatan tampil.",
    "E": "sudah dua kali teleponnya putus, kok dicoba lagi? Membacakan alamat tautan lewat sambungan yang putus-putus juga gampang salah dengar.",
    "A": "membatalkan dan meminta maaf atas nama mitra, padahal mitranya belum ditanya.",
    "B": "ratusan orang menunggu tanpa kepastian. Kasihan mereka."
   },
   "kunci": "C memakai saluran yang masih jalan, sehingga pembicara mitra tetap tampil.",
   "analogi": "kalau sinyal telepon temanmu jelek, kamu kirim alamat lewat pesan, bukan menelepon berkali-kali sambil mengeja nama jalan.",
   "jebakan": "D terasa paling aman karena acara tetap tepat waktu. Tapi soal sengaja menyebut pembicaranya masih bisa dijangkau.",
   "tips": "perhatikan saluran mana yang gagal dan mana yang masih jalan. Jawaban terbaik biasanya memakai yang masih jalan."
  }
 },
 "24": {
  "reviu": [
   "Dilema: kewaspadaan terhadap kemungkinan kelompok radikal vs keadilan bagi yayasan yang dituduh tanpa bukti oleh pihak yang sedang bersengketa lahan (tangga AR: kabar dari pihak lain). Pasangan kontras soal 31 (di sana ada bukti nyata).",
   "E memisahkan dua urusan: izin diproses menurut syarat teknis, tuduhan diteruskan ke kesbangpol yang menangani laporan kerawanan, tanpa menghukum pihak yang belum terbukti.",
   "C=4 (S4): izin diproses benar dan pelapor ditunjukkan alamat yang tepat, tetapi tuduhan dibiarkan bergantung pada kemauan pelapor. A=3 (S1 +J5): menunda izin seolah tuduhan sudah benar. D=2: membalik beban pembuktian ke yang dituduh. B=1: diam dan lempar ke kepala dinas.",
   "<b>Kunci vs C (poin 4):</b> C membuat pelapor \"diarahkan membawa aduannya ke kesbangpol\", sehingga laporan kerawanan bisa tidak pernah sampai; E meneruskan tuduhan tanpa bukti itu ke kesbangpol setempat.<br>\n      <b>Kunci vs A (poin 3):</b> A \"menunda proses izin yayasan itu sampai kesbangpol selesai memeriksa\", sehingga yayasan dirugikan oleh tuduhan tanpa bukti; E tetap memproses izin sesuai syarat teknis."
  ],
  "siswa": {
   "tanya": "seseorang datang ke mejamu dan menuduh yayasan tetangganya \"sarang kelompok radikal\". Ia tidak membawa bukti apa pun, dan ternyata keduanya sedang berebut batas lahan. Yayasan yang dituduh itu sedang mengurus izin lingkungan di mejamu.",
   "opsi": {
    "E": "izinnya tetap kamu periksa sesuai syarat teknis, dan tuduhannya kamu teruskan ke kesbangpol. Yayasan tidak dirugikan, dan kalau memang ada apa-apa, pihak yang tepat sudah tahu.",
    "C": "izinnya diproses dengan benar, dan pelapor sudah ditunjukkan tempat mengadu. Hanya saja sampai tidaknya aduan itu tergantung pelapor, padahal belum tentu ia mau, apalagi kalau niatnya sebenarnya menjegal tetangga.",
    "A": "izin ditahan karena tuduhan tanpa bukti. Yayasan yang belum tentu bersalah sudah keburu rugi.",
    "D": "yang menuduh yang semestinya membuktikan, bukan yang dituduh.",
    "B": "diam dan menyerahkan semuanya ke kepala dinas, padahal tuduhan seperti ini perlu sampai ke pihak yang menanganinya."
   },
   "kunci": "E adil kepada yayasan yang dituduh tanpa mengabaikan laporannya.",
   "analogi": "kalau tetanggamu bilang pedagang baru di pasar itu penipu, padahal mereka sedang berebut lapak, kamu tetap berbelanja seperti biasa sambil memberi tahu pengurus pasar.",
   "jebakan": "A terasa paling waspada, dan wajar kalau kamu tergoda. Tapi menghukum orang hanya karena dituduh, apalagi oleh pihak yang bersengketa dengannya, itu tidak adil.",
   "tips": "lihat siapa yang menuduh dan apa buktinya. Tuduhan tanpa bukti diteruskan ke yang berwenang, bukan langsung dijadikan dasar keputusan."
  }
 },
 "25": {
  "reviu": [
   "Dilema: kehati-hatian tiap petugas vs kepastian syarat bagi warga; petugas bergiliran tiap pekan, belum ada daftar tertulis.",
   "C membuat daftar syarat tertulis yang berlaku bagi tiap petugas dan memasangnya di loket, sehingga petugas yang bergiliran maupun warga melihat syarat yang sama.",
   "A=4 (S4 +J1): satu syarat diumumkan di apel, tetapi lisan dan mudah hilang bagi petugas yang bergiliran. D=3 (S1): ditunda ke akhir bulan. B=2: melonggarkan khusus yang protes. E=1: membiarkan beda syarat.",
   "<b>Kunci vs A (poin 4):</b> A hanya \"mengumumkan di apel pagi\", sehingga petugas yang bergiliran setiap pekan bisa tidak mendengarnya; C membuat daftar syarat tertulis dan memasangnya di loket.<br>\n      <b>Kunci vs D (poin 3):</b> D menyusun daftar \"setelah rapat evaluasi akhir bulan\", sehingga warga masih bolak-balik sampai akhir bulan; C membuat daftar syarat sekarang."
  ],
  "siswa": {
   "tanya": "warga bolak-balik ke loket legalisir karena tiap petugas meminta syarat yang berbeda. Petugasnya bergiliran tiap pekan, dan sampai sekarang belum ada daftar syarat tertulis.",
   "opsi": {
    "C": "kamu buat daftar syarat tertulis dan pasang di loket. Siapa pun yang sedang bertugas melihat daftar yang sama, dan warga juga bisa membacanya sendiri sebelum antre.",
    "A": "mengumumkan di apel memang cepat. Tapi petugasnya berganti tiap pekan. Pesan lisan gampang terlupa atau tidak sampai ke yang tidak ikut apel.",
    "D": "daftar tertulisnya sudah tepat. Hanya saja menunggu akhir bulan berarti warga masih bolak-balik beberapa minggu lagi.",
    "B": "yang protes dilonggarkan, yang diam tetap dipersulit. Rasanya tidak adil, ya.",
    "E": "justru perbedaan syarat itulah yang membuat warga bolak-balik."
   },
   "kunci": "C membuat syaratnya pasti dan terlihat oleh semua, siapa pun petugasnya.",
   "analogi": "warung yang penjaganya sering berganti biasanya menempel daftar harga di dinding, supaya pembeli tidak mendapat harga berbeda tergantung siapa yang sedang jaga.",
   "jebakan": "A memakai kata \"wajib\" dan terdengar tegas. Coba ingat lagi: petugasnya bergiliran.",
   "tips": "kalau orang yang bertugas sering berganti, aturan sebaiknya ditulis dan dipasang, tidak cukup diucapkan."
  }
 },
 "26": {
  "reviu": [
   "Dilema: kewajiban tiap OPD mengantar sendiri arsipnya vs ketepatan tenggat Jumat; kurir tiga OPD hanya ke kota seminggu sekali, kantor arsip punya mobil jemput keliling setiap Kamis.",
   "D memasukkan ketiga OPD ke rute Kamis (sebelum batas Jumat) dan mengabari hari ini agar arsip disiapkan; kendala kurir teratasi dengan sarana kantor sendiri.",
   "A=4 (S2): rute Kamis dipakai, tetapi hanya untuk satu OPD. C=3 (S4 +J3): naik ke sekretaris daerah untuk kendala yang bisa diatasi sendiri. B=2: peringatan, kurir tetap seminggu sekali. E=1: mencatat dan menunggu.",
   "<b>Kunci vs A (poin 4):</b> A menambahkan \"satu OPD yang paling sering terlambat\", padahal ketiga OPD terkendala kurir yang sama; D menambahkan tiga OPD itu ke jalur penjemputan Kamis.<br>\n      <b>Kunci vs C (poin 3):</b> C melapor kepada sekretaris daerah dan meminta \"ditegur tertulis\", padahal kantor arsip sendiri punya mobil yang menjemput setiap Kamis; D memakai jalur penjemputan itu."
  ],
  "siswa": {
   "tanya": "tiga OPD di pinggiran kota hampir pasti terlambat lagi menyerahkan arsip, dan batasnya Jumat. Sebabnya bukan malas: kurir mereka memang hanya ke kota seminggu sekali. Coba ingat, kantormu sendiri punya sarana apa?",
   "opsi": {
    "D": "ketiga OPD kamu masukkan ke rute mobil jemput hari Kamis, lalu kamu kabari mereka hari ini supaya arsipnya disiapkan. Kamis masih sebelum batas Jumat.",
    "A": "arahnya sudah benar, memakai mobil jemputan Kamis. Tapi kenapa cuma satu? Dua OPD lain punya kendala kurir yang sama.",
    "C": "melapor ke sekda untuk masalah yang sebenarnya bisa kamu bereskan dengan mobil kantor sendiri.",
    "B": "surat peringatan tidak membuat kurir mereka datang lebih sering.",
    "E": "kamu sudah tahu mereka bakal terlambat, sayang kalau hanya dicatat lalu ditunggu."
   },
   "kunci": "D mengatasi penyebab keterlambatan ketiga OPD dengan sarana yang sudah ada, sebelum tenggat.",
   "analogi": "kalau tiga temanmu selalu telat ke acara karena tidak ada angkutan, dan mobilmu memang lewat depan rumah mereka, ya dijemput saja.",
   "jebakan": "B dan C terasa tegas, tapi tegur-menegur tidak menyelesaikan urusan kurir yang cuma datang seminggu sekali.",
   "tips": "sebelum menegur orang yang terlambat, cari tahu dulu sebabnya. Kalau sebabnya bisa kamu bantu atasi, di situ jawabannya."
  }
 },
 "27": {
  "reviu": [
   "Dilema: kepatuhan SOP dokumen asli vs beban lansia yang membawa salinan terlegalisasi; perubahan SOP wewenang koordinator mal di lantai yang sama.",
   "C menempuh jalur yang benar (usul ke pemegang wewenang) dengan data yang kuat (catatan 30 pemohon), sehingga usulan bisa diputuskan berdasar bukti.",
   "E=4 (S1 +J5): data sudah dikumpulkan, tetapi menganggap koordinator pasti menolak dan menunda sampai akhir tahun. B=3 (S5): jalur benar, dasarnya cerita beberapa pemohon. D=2: mengubah SOP sendiri. A=1: pasif.",
   "<b>Kunci vs E (poin 4):</b> E \"menganggap koordinator pasti menolak\" lalu menyimpan catatan sampai evaluasi akhir tahun, padahal koordinator berkantor di lantai yang sama; C mengusulkan sekarang dengan melampirkan catatan 30 pemohon.<br>\n      <b>Kunci vs B (poin 3):</b> B mengusulkan \"berdasarkan cerita beberapa lansia\"; C melampirkan catatan 30 pemohon yang kembali sebagai bukti."
  ],
  "siswa": {
   "tanya": "banyak pemohon lansia harus pulang karena hanya membawa salinan terlegalisasi. Bulan ini saja kamu sudah mencatat 30 orang. Kamu tidak berwenang mengubah SOP, tapi koordinator yang berwenang ada di lantai yang sama.",
   "opsi": {
    "C": "kamu usulkan ke koordinator, lengkap dengan catatan 30 pemohon itu. Angka seperti ini jauh lebih meyakinkan daripada cerita.",
    "E": "datanya sudah ada di tanganmu, tapi kamu menyerah duluan sebelum bertanya. Padahal koordinatornya hanya beberapa langkah dari mejamu.",
    "B": "jalurnya sudah benar. Sayangnya dasarnya cerita beberapa orang, jadi usulanmu gampang dianggap keluhan biasa.",
    "D": "niatmu menolong lansia, aku mengerti. Tapi mengubah aturan yang bukan wewenangmu bisa membuatmu sendiri yang bermasalah.",
    "A": "lansia terus bolak-balik, padahal kamu sebenarnya punya cara untuk mengusulkan perubahan."
   },
   "kunci": "C membawa usulan ke pihak yang berwenang, sekarang, dengan bukti yang kuat.",
   "analogi": "kalau kamu ingin kantin menambah menu sayur, kamu bawa daftar 30 teman yang mau membeli, bukan cuma bilang \"katanya banyak yang mau\".",
   "jebakan": "B dan C hampir kembar. Bedanya ada di bukti: cerita beberapa orang dibanding catatan 30 pemohon.",
   "tips": "kalau dua jawaban sama-sama mengusulkan ke atasan, pilih yang membawa bukti paling kuat."
  }
 },
 "28": {
  "reviu": [
   "Dilema: data kualitas air untuk bantuan bibit harus diukur hari ini vs keabsahan hasil ukur; alat digital rusak, kit uji tetes cadangan masih berlaku, pembudidaya besar yang juga calon penerima menawarkan alatnya.",
   "E mengukur hari ini dengan sarana resmi yang sah dan mencatat jenis alat di lembar data, sehingga data tepat waktu, bebas pengaruh calon penerima, dan bisa dipertanggungjawabkan.",
   "A=4 (S3): data cepat dan digital, tetapi alatnya milik calon penerima bantuan sehingga hasil bisa dipersoalkan. B=3 (S1): menunda ke pekan depan, melewati tenggat. C=2 +J3: lapor kepala dinas tanpa pemicu, pengganti sudah ada. D=1: beban ukur dilempar ke pembudidaya.",
   "<b>Kunci vs A (poin 4):</b> A meminjam alat \"milik pembudidaya besar yang juga calon penerima bantuan\", sehingga hasil ukur penentu bantuan bisa dipersoalkan; E memakai perangkat uji tetes cadangan milik dinas.<br>\n      <b>Kunci vs B (poin 3):</b> B \"menjadwalkan ulang pengukuran pekan depan\", padahal pengukuran harus hari ini; E mengukur hari ini."
  ],
  "siswa": {
   "tanya": "pagi ini alat ukur digital timmu rusak, padahal air tambak para pembudidaya harus diukur hari ini. Ada dua pengganti: kit uji tetes cadangan milik dinas yang masih berlaku, atau alat pinjaman dari pembudidaya besar yang juga calon penerima bantuan.",
   "opsi": {
    "E": "kamu pakai kit uji tetes cadangan, lalu jenis alatnya kamu catat di lembar data. Data selesai tepat waktu, dan siapa pun yang memeriksa tahu alat apa yang dipakai.",
    "A": "alatnya memang canggih, tapi pemiliknya ikut berebut bantuan. Kalau hasilnya nanti dipersoalkan, kamu akan sulit membela diri.",
    "B": "menunggu sampai pekan depan, padahal pengukurannya harus hari ini dan pengganti sudah ada di gudang.",
    "C": "kepala dinas tidak perlu ditanya untuk hal yang jalan keluarnya sudah tersedia.",
    "D": "pembudidaya disuruh mengukur sendiri air tambak yang menentukan bantuan untuk mereka. Hasilnya tentu sulit dipercaya."
   },
   "kunci": "E memakai alat sah milik dinas, sehingga datanya tepat waktu dan tidak mengundang curiga.",
   "analogi": "juri lomba masak tidak akan meminjam timbangan dari salah satu peserta, walaupun timbangan peserta itu lebih bagus.",
   "jebakan": "A sering dipilih karena alat digital terasa lebih akurat. Coba lihat sekali lagi siapa pemiliknya.",
   "tips": "kalau ada tawaran bantuan dari pihak yang berkepentingan dengan hasil kerjamu, berhati-hatilah, apalagi kalau sarana resmi sebenarnya tersedia."
  }
 },
 "29": {
  "reviu": [
   "Dilema: keleluasaan mitra mengatur lowongan vs kepastian informasi bagi pelamar; nama empat mitra diketahui dari keluhan dan belum dicocokkan; dinas berwenang menetapkan tata cara pemakaian aplikasi.",
   "B memakai wewenang dinas untuk aturan yang berlaku bagi seluruh mitra (pembaruan syarat wajib sebelum berlaku), sehingga mencegah pola berulang tanpa menuduh empat mitra yang belum dicocokkan.",
   "D=4 (S4): empat lowongan diperbarui, tetapi mitra lain bisa mengulang dan beban berpindah ke dinas. E=3 (S5): teguran tanpa mencocokkan isi aplikasi. C=2 +J2: beban mencari syarat ke pelamar. A=1: keluhan dilempar ke perusahaan.",
   "<b>Kunci vs D (poin 4):</b> D memperbarui \"syarat keempat lowongan itu di aplikasi\", sehingga mitra lain masih bisa mengubah syarat tanpa memperbarui aplikasi; B menetapkan kewajiban memperbarui syarat bagi seluruh mitra.<br>\n      <b>Kunci vs E (poin 3):</b> E mengirim teguran \"berdasarkan keluhan pelamar, tanpa mencocokkan dulu isi aplikasinya\"; B tidak menuduh mitra tertentu sebelum dicocokkan."
  ],
  "siswa": {
   "tanya": "dalam sebulan, empat perusahaan mitra mengubah syarat lowongan tanpa memperbaruinya di aplikasi, dan banyak pelamar tertolak saat wawancara. Nama keempatnya kamu dengar dari keluhan pelamar, tapi belum kamu cek. Dinasmu berwenang mengatur cara pemakaian aplikasi.",
   "opsi": {
    "B": "kamu umumkan ke semua mitra bahwa syarat lowongan wajib diperbarui di aplikasi sebelum berlaku. Aturannya untuk semua, jadi tidak ada yang dituduh duluan.",
    "E": "menegur berdasarkan keluhan yang belum dicek itu berisiko. Kalau ternyata ada yang salah sasaran, hubungan dengan mitra bisa renggang.",
    "C": "pelamar disuruh menanyakan sendiri ke perusahaan. Lalu untuk apa ada aplikasi bursa kerja?",
    "A": "keluhan dioper ke perusahaan, dan dinas lepas tangan."
   },
   "kunci": "B mencegah masalah yang sama terulang di semua mitra, dengan wewenang yang memang dimiliki dinas.",
   "analogi": "kalau beberapa penjual di pasar daring sering mengubah harga tanpa memperbarui etalasenya, pengelola pasar membuat aturan untuk semua penjual, bukan mengoreksi etalase satu per satu.",
   "jebakan": "D terasa paling rajin dan langsung terasa manfaatnya bagi pelamar. Tapi yang ditambal hanya empat lowongan.",
   "tips": "kalau masalahnya sudah muncul di beberapa pihak dan kamu berwenang membuat aturan, aturan yang berlaku untuk semua biasanya jawabannya."
  }
 },
 "30": {
  "reviu": [
   "Dilema: capaian setoran program vs keadilan layanan bagi rumah tangga, sasaran utama menurut pedoman; kuota timbang habis oleh pengepul sebelum warga datang siang.",
   "E memakai wewenang mengatur jumlah setoran: batas sementara per pengepul per hari, sisa kuota untuk warga. Semua pengepul diperlakukan sama, sasaran utama terlayani.",
   "B=4 (S2): kuota warga disisakan, tetapi hanya satu pengepul yang dibatasi; pengepul besar lain tetap menghabiskan kuota. C=3 (S5 +J2): beban mendaftar dipindah ke warga, tidak pasti semua tahu. D=2: mendahulukan pengepul demi capaian. A=1: warga dilempar ke bank sampah swasta.",
   "<b>Kunci vs B (poin 4):</b> B membatasi \"satu pengepul paling besar\", padahal setoran datang dari beberapa pengepul besar; E membatasi sementara setoran setiap pengepul per hari.<br>\n      <b>Kunci vs C (poin 3):</b> C meminta warga \"mendaftar lewat pesan sehari sebelumnya\", sehingga warga yang tidak tahu tata cara baru tidak terlayani dan pengepul tetap menghabiskan kuota; E menyisakan kuota timbang untuk warga."
  ],
  "siswa": {
   "tanya": "dua hari ini kuota timbang bank sampah sudah habis oleh pengepul besar sebelum warga datang siang. Padahal program ini dibuat terutama untuk rumah tangga, dan kamu berwenang mengatur jumlah setoran.",
   "opsi": {
    "E": "setiap pengepul kamu batasi sementara per hari, sisanya untuk warga. Pengepul tetap boleh menyetor, warga juga kebagian.",
    "B": "pengepul yang paling besar dibatasi dan kuota warga disisakan. Tapi pengepul besar lain masih bisa menghabiskan sisa kuota sebelum warga datang siang.",
    "C": "warga yang tidak sempat membaca pesan, atau tidak tahu ada aturan baru, justru tidak terlayani. Pengepulnya sendiri belum disentuh.",
    "D": "angka capaian memang naik, tapi warga yang menjadi sasaran utama tetap tidak kebagian.",
    "A": "warga yang menjadi sasaran program malah disuruh pergi ke bank sampah swasta."
   },
   "kunci": "E mengembalikan layanan ke sasaran utamanya, dengan aturan yang sama untuk semua pengepul.",
   "analogi": "kalau prasmanan di kantor selalu habis diborong beberapa orang di pagi hari, pengelola membatasi porsi per orang supaya yang datang siang tetap bisa makan.",
   "jebakan": "B terlihat tepat sasaran karena membidik pengepul terbesar. Baca lagi soalnya, pengepulnya ada beberapa.",
   "tips": "cari dulu siapa sasaran utama layanan menurut aturan, lalu pilih jawaban yang memastikan mereka terlayani."
  }
 }
};
