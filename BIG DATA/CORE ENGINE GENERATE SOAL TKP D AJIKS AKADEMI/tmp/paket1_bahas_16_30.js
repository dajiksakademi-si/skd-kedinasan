// Paket 1 TKP — pembahasan soal 16–30, ditulis ulang setelah wording mentor (2026-10-27). Siswa versi hangat.
module.exports = {
 "16": {
  "reviu": [
   "Dilema: urusan informasi ada di pendaftaran, bukan di laboratorium, tetapi keterangan \"kembali besok\" membuat banyak pasien datang sia-sia, dua di antaranya dengan perahu sewaan dari desa seberang.",
   "E menutup kedua sisi: pendaftaran tetap yang memberi informasi, tetapi isinya disepakati bersama laboratorium (tanggal ambil untuk tiap pasien), dan pasien dikabari bila hasil mundur.",
   "C=4 (S1): pasien yang telanjur datang dikabari, tetapi sumber salahnya, keterangan \"kembali besok\", tetap berjalan; ruginya muncul pada pasien berikutnya. A=3 (S2): tanggal ambil hanya untuk pasien dari seberang; pasien lain tetap datang sia-sia sekarang. B=2+J1: pengumuman di depan laboratorium mengulang \"tiga hari kerja\", padahal pasien sudah lebih dulu diarahkan kembali besok. D=1: dalih bukan tugas laboratorium.",
   "<b>Kunci vs C (poin 4):</b> C \"mencatat nomor telepon pasien yang telanjur datang\", jadi kerugian diperbaiki sesudah terjadi; E menyepakati tanggal ambil di pendaftaran sehingga pasien berikutnya tidak lagi disuruh kembali besok.<br>\n      <b>Kunci vs A (poin 3):</b> A memberi tanggal ambil hanya untuk \"pasien dari seberang\", padahal banyak pasien lain juga datang sia-sia; E berlaku untuk tiap pasien."
  ],
  "siswa": {
   "tanya": "kamu petugas laboratorium. Hasil dahak TBC baru jadi tiga hari kerja, tapi pendaftaran selalu bilang ke pasien \"kembali besok\". Akibatnya banyak pasien datang sia-sia, dan dua di antaranya sampai menyewa perahu dari desa seberang.",
   "opsi": {
    "E": "duduk bersama pendaftaran, sepakati tanggal ambil untuk setiap pasien, dan kabari kalau hasilnya mundur. Informasinya tetap keluar dari meja pendaftaran, isinya sekarang benar.",
    "C": "pasien yang sudah datang jadi tahu kapan kembali, dan itu baik. Pasien besok pagi? Mereka masih akan mendengar \"kembali besok\".",
    "A": "pasien seberang tertolong. Pasien yang rumahnya dekat juga datang sia-sia, dan mereka tidak masuk hitungan.",
    "B": "pengumuman itu baru terbaca setelah pasien sampai di depan laboratorium. Ongkos perahunya sudah keluar.",
    "D": "secara aturan, informasi memang urusan pendaftaran. Yang menanggung ruginya tetap pasien laboratoriummu."
   },
   "kunci": "E membereskan sumber keterangan yang keliru, dan berlaku untuk tiap pasien, bukan hanya yang telanjur datang.",
   "analogi": "kalau papan petunjuk jalan salah arah, menjemput satu per satu orang yang tersesat itu baik. Membetulkan papannya jauh lebih menolong.",
   "jebakan": "pilihan C terasa paling peduli: pasien ditelepon satu per satu. Kata \"telanjur\" di situ sudah menjawab, karena yang ditolong hanya yang sudah rugi.",
   "tips": "kalau masalahnya datang dari keterangan yang salah, perbaiki keterangannya sebelum sibuk menolong korbannya."
  }
 },
 "17": {
  "reviu": [
   "Dilema: kabar tentang ceramah yang menyebut pemerintah tidak sah perlu ditanggapi cepat, tetapi kabar itu tangan ketiga (sopir pun hanya mendengar dari rekan pengemudi), dan petugas yang dibicarakan berhak tidak dihukum sebelum terbukti.",
   "D meneruskan kabar beserta asal-usulnya ke unit pengawasan internal yang menangani perilaku pegawai: tanggapan cepat, tanpa menjatuhkan tindakan berdasarkan kabar.",
   "B=4 (S5)+J5: pengawasan diperketat, tetapi petugas sudah dipindah giliran karena kabar yang belum dicek; ruginya nanti, pada nama baiknya dan rasa adil pegawai lain. C=3 (S2): larangan untuk semua pos, semua petugas ikut kena karena satu kabar; terasa sekarang. E=2+J5: menegur seolah kabar pasti benar. A=1: mengucilkan sebelum ada bukti.",
   "<b>Kunci vs B (poin 4):</b> B \"memindahkan petugas itu ke giliran siang\", padahal kabarnya baru didengar sopir \"dari rekan sesama pengemudi\"; D menyerahkan pengecekan ke unit pengawasan internal tanpa tindakan lebih dulu.<br>\n      <b>Kunci vs C (poin 3):</b> C \"melarang pemutaran ceramah apa pun di seluruh pos jaga\", sehingga semua petugas kena karena satu kabar; D hanya menyentuh kabar yang perlu dicek."
  ],
  "catatan": [
   "Pasangan 42 (batch berikut) wajib: Anti Radikalisme, konteks/peran lain, kadar bukti lebih tinggi (dilihat/didengar sendiri, pola nyata) sehingga kuncinya lapor/tindak, bukan sekadar serahkan untuk dicek."
  ],
  "siswa": {
   "tanya": "seorang sopir cerita ke kamu, koordinator jaga terminal, bahwa petugas jaga malam sering memutar ceramah yang menyebut pemerintah tidak sah lewat pengeras suara pos. Sopir itu sendiri cuma dengar dari rekan sesama pengemudi.",
   "opsi": {
    "D": "teruskan cerita itu ke unit pengawasan internal, lengkap dengan asal kabarnya: dari sopir, yang dengar dari sopir lain. Biar mereka yang mengecek. Kamu bergerak cepat tanpa menghakimi siapa pun.",
    "B": "kedengarannya hati-hati, cuma dipindah, tidak dihukum. Coba posisikan dirimu sebagai petugas itu: gilirannya digeser karena cerita yang belum pernah dicek.",
    "C": "semua petugas di semua pos ikut kena larangan, sementara yang dibicarakan cuma satu orang, dan itu pun baru kabar.",
    "E": "menegur langsung berarti kamu sudah menganggap kabar itu benar. Kalau ternyata salah, kamu yang harus minta maaf.",
    "A": "menjauhi orang karena kabar burung sama saja menghukum tanpa sidang. Rekan-rekan ikut kamu ajak pula."
   },
   "kunci": "D menanggapi kabar dengan cepat lewat pihak yang berwenang mengecek, tanpa menjatuhkan tindakan apa pun sebelum terbukti.",
   "analogi": "dengar kabar seorang warga mencuri? Kamu tidak menggeledah rumahnya. Kamu sampaikan ke pengurus RT, lengkap dengan siapa yang bercerita.",
   "jebakan": "kalimat penentunya ada di tengah cerita: \"hanya mendengarnya dari rekan sesama pengemudi\". Pilihan yang langsung menegur atau memindahkan petugas melompati kalimat itu.",
   "tips": "di soal paham anti-pemerintah, ukur dulu seberapa kuat buktinya. Kabar dari mulut ke mulut diteruskan untuk dicek, bukan ditindak."
  }
 },
 "18": {
  "reviu": [
   "Dilema: menjaga suasana rapat dan hubungan dengan kepala dusun, berhadapan dengan ajakan mencoret warga berbeda keyakinan dari bantuan, padahal daftarnya disahkan hari ini juga.",
   "A menyela di tempat dan meluruskan dasar penilaian (kelayakan, bukan keyakinan) di depan peserta yang ikut tertawa, sebelum daftar disahkan. Pemandu rapat berwenang menyela.",
   "C=4 (S1): ralat diminta dari orang yang tepat dan di depan forum yang sama, tetapi baru setelah daftar disahkan; peserta menimbang daftar dengan kesan candaan itu wajar. B=3 (S3): lapor ke camat sebagai ujaran kebencian, padahal yang memandu rapat adalah Anda; candaan dibiarkan sekarang. E=2+J6: mengalihkan lagi, cara yang tadi tidak mempan. D=1: berkorban tenaga, tetapi keluarga itu dijauhkan dari rapat dan ucapannya tidak dibantah.",
   "<b>Kunci vs C (poin 4):</b> C meminta ralat \"setelah daftar disahkan di rapat itu\", padahal \"daftarnya disahkan hari ini juga\" dan candaan itu menyangkut siapa yang dicoret; A meluruskan sebelum daftar disahkan.<br>\n      <b>Kunci vs B (poin 3):</b> B \"melaporkan ucapan kepala dusun itu ke camat\", padahal rapatnya Anda sendiri yang memandu; A bertindak di tempat tanpa menunggu pihak lain."
  ],
  "catatan": [
   "Tabel tindakan sejenis (tegur di tempat): soal 9 = 5 (Anda memimpin apel, candaan mengajak mempersulit satu suku), soal 18 = 5 (Anda memandu rapat, candaan mengajak mencoret warga berbeda keyakinan). Bunyi kunci sengaja dibedakan (menegur di depan apel vs menyela dan meluruskan dasar penilaian). Catatan: pola poin 3/4 mirip soal 9 (lapor pihak lain dan tegur belakangan); tangga AR yang sama memang menghasilkan pengecoh sejenis. Pilot panduan 3v4: lemah, karena rugi C juga terasa saat daftar disahkan."
  ],
  "siswa": {
   "tanya": "kamu memandu rapat penerima bantuan pangan, dan daftarnya disahkan hari ini juga. Seorang kepala dusun bercanda agar keluarga pendatang yang berbeda keyakinan dicoret saja, dan peserta tertawa. Candaan serupa tadi sudah kamu alihkan.",
   "opsi": {
    "A": "sela candaannya dan ingatkan semua orang: bantuan dinilai dari kelayakan, bukan keyakinan. Daftar belum disahkan, dan yang ikut tertawa mendengar langsung dari pemimpin rapatnya.",
    "C": "ralatnya diminta di depan forum yang sama, dan itu bagus. Masalahnya jam: daftar sudah disahkan ketika ralat itu datang. Keluarga pendatang itu sudah ditimbang sambil semua orang membawa candaan tadi di kepalanya.",
    "B": "camat tidak ada di ruangan. Yang memimpin rapat ini kamu sendiri.",
    "E": "tadi sudah dialihkan, dan candaannya muncul lagi. Kalau diulang, hasilnya kemungkinan sama.",
    "D": "kamu repot sendiri, keluarga itu tidak perlu hadir, dan ucapan tadi tetap tidak dibantah siapa pun."
   },
   "kunci": "A meluruskan dasar penilaian saat itu juga, di depan semua yang ikut tertawa, sebelum daftar disahkan.",
   "analogi": "wasit yang melihat pelanggaran langsung meniup peluit. Kalau baru ditegur sesudah pertandingan, skornya sudah tercatat.",
   "jebakan": "mengalihkan pembicaraan tampak cerdik karena tidak ada yang tersinggung. Cara itu sudah dipakai tadi, dan candaannya kembali.",
   "tips": "kalau keputusan diambil di ruangan itu juga, teguran yang ditunda sama dengan diam."
  }
 },
 "19": {
  "reviu": [
   "Dilema: permintaan atasan harus terpenuhi malam ini, tetapi rekap berisi NIK dan nomor telepon yang hanya boleh dibuka pejabat penagihan, sedangkan saran atasan (aplikasi pesan) membuka risiko data tersebar.",
   "E memenuhi permintaan malam ini lewat penyimpanan daring kantor dengan akses khusus kepala bidang: data sampai, dan yang bisa membuka hanya orang yang berhak.",
   "D=4 (S3): data sampai malam ini, tetapi berpindah tangan lewat staf dalam flashdisk; ruginya bila flashdisk hilang atau tersalin di jalan. C=3 (S1): permintaan hapus baru berlaku setelah dibaca, sementara berkas sudah tersimpan di aplikasi pesan sejak terkirim. B=2+J6: mengulang surel yang sudah tidak muat. A=1: menunggu besok, permintaan malam ini gagal.",
   "<b>Kunci vs D (poin 4):</b> D \"menitipkan rekap dalam flashdisk ke staf penagihan\", jadi data berpindah tangan di jalan; E mengirim langsung dengan akses yang dibatasi untuk kepala bidang.<br>\n      <b>Kunci vs C (poin 3):</b> C mengirim \"lewat aplikasi pesan\" lalu berharap berkasnya dihapus \"setelah dibaca\"; E tidak pernah menaruh data di aplikasi itu."
  ],
  "catatan": [
   "Pasangan 34 (syarat): TIK, kantor desa, tangga TIK; permintaan data serupa tetapi sumbernya belum jelas sah, sehingga kunci = memastikan pemintanya lewat kanal resmi dulu. Kontras dengan 19: pemintanya jelas sah, persoalannya jalur kirim. Jangan memakai pola \"pesan phishing mengaku atasan\" (daftar konteks Al Faiz)."
  ],
  "siswa": {
   "tanya": "kepala bidang penagihan sedang di luar kantor dan minta rekap penunggak pajak malam ini. Isinya NIK dan nomor telepon. Berkasnya terlalu besar untuk surel dinas, jadi ia menyarankan lewat aplikasi pesan, padahal data itu hanya boleh dibuka pejabat penagihan.",
   "opsi": {
    "E": "unggah ke penyimpanan daring kantor dan atur aksesnya khusus untuk kepala bidang. Malam ini juga rekapnya bisa ia buka, dan orang lain tidak bisa.",
    "D": "rekapnya sampai malam ini, setuju. Sepanjang jalan, flashdisk berisi NIK warga itu ada di saku orang lain, dan bisa jatuh atau tersalin.",
    "C": "permintaan hapus itu datang belakangan. Begitu terkirim, berkasnya sudah tersimpan di aplikasi pesan.",
    "B": "berkasnya terlalu besar, dan mencoba lagi tidak mengubah ukurannya.",
    "A": "rekap diminta malam ini. Besok pagi permintaannya sudah lewat."
   },
   "kunci": "E memenuhi permintaan atasan malam ini tanpa membuka data ke orang yang tidak berhak.",
   "analogi": "barang berharga lebih aman dikirim lewat loker yang hanya bisa dibuka penerimanya daripada dititipkan ke kenalan yang kebetulan lewat.",
   "jebakan": "sarannya datang dari atasan sendiri, jadi aplikasi pesan terasa sudah diizinkan. Soal ini justru menguji apakah kamu ingat batas data itu: hanya untuk pejabat penagihan.",
   "tips": "untuk saran atasan soal cara kirim, kamu boleh menawarkan jalan lain, asal tujuannya tetap tercapai."
  }
 },
 "20": {
  "reviu": [
   "Dilema: antrean harus adil bagi semua pasien, tetapi keyakinan pasien yang hanya mau diperiksa dokter perempuan juga perlu dihormati; pengumuman tertulis sudah ada dan tidak mencegah kejadian.",
   "E menanyakan pilihan dokter sejak pasien mendaftar, sehingga pasien langsung masuk antrean yang sesuai: tidak ada yang antre lama lalu pulang, dan urutan tetap sama untuk semua.",
   "A=4 (S1): pasien diantar ke dokter perempuan, tetapi baru setelah ia antre lama dan menolak; ruginya sudah terjadi. D=3 (S5)+J6: pengumuman diperbesar, padahal pengumuman sejak awal bulan tidak mencegah kejadian; ruginya nanti, kejadian berulang. C=2: dirujuk ke puskesmas lain padahal dokter perempuan ada. B=1: keadilan antrean jadi dalih menyuruh pulang.",
   "<b>Kunci vs A (poin 4):</b> A mengantar \"pasien yang menolak dokter laki-laki\", artinya setelah antre lama dan menolak; E bertanya sejak pasien mendaftar.<br>\n      <b>Kunci vs D (poin 3):</b> D menempel \"pengumuman dokter perempuan yang lebih besar\", padahal pengumuman serupa sudah ditempel di ruang tunggu sejak awal bulan; E bertanya langsung kepada tiap pasien."
  ],
  "siswa": {
   "tanya": "kamu koordinator pendaftaran. Beberapa pasien perempuan pulang sebelum diperiksa: setelah antre lama, mereka menolak dokter laki-laki karena keyakinan. Padahal ada dokter perempuan di sif pagi, dan pengumumannya sudah menempel di ruang tunggu sejak awal bulan.",
   "opsi": {
    "E": "tanyakan di loket, mau diperiksa dokter laki-laki atau perempuan. Pasien langsung masuk antrean dokter pilihannya, tidak perlu menunggu lama lalu pulang.",
    "A": "kamu turun tangan, dan pasiennya akhirnya diperiksa. Sayang, ia sudah antre lama di antrean yang salah.",
    "D": "pengumuman sudah menempel sejak awal bulan, dan pasien tetap pulang. Memperbesar hurufnya tidak menjamin pasien membacanya.",
    "C": "dokter perempuannya ada di sini, di sif pagi. Kenapa pasien harus pergi ke puskesmas lain?",
    "B": "aturan antrean dipakai untuk menyuruh pasien pulang. Ia datang untuk berobat."
   },
   "kunci": "E menghormati keyakinan pasien sejak di loket, dan urutan antrean tetap sama untuk semua.",
   "analogi": "warung yang bertanya \"pedas atau tidak?\" waktu memesan tidak perlu membuang makanan yang ditolak di meja.",
   "jebakan": "di pilihan A ada usaha nyata: kamu sendiri yang mengantar. Usaha itu datang setelah pasien antre lama, dan antre lama itulah yang membuat pasien pulang.",
   "tips": "kalau keluhan selalu muncul di ujung antrean, cari pertanyaan yang bisa diajukan di awal."
  }
 },
 "21": {
  "reviu": [
   "Dilema: kerja sama dengan RSUD baru dua bulan dan perlu dijaga, tetapi belasan berkas tanpa surat keterangan lahir membuat akta bayi tertunda.",
   "C menemui petugas rekam medis untuk menyepakati daftar periksa (kiriman berikutnya lengkap), lalu melengkapi berkas yang tertunda: hubungan dijaga lewat tatap muka, akta tidak terus tertunda.",
   "D=4 (S4): berkas langsung dikembalikan dan akta terbit dari berkas yang lengkap, tetapi rumah sakit tidak pernah diajak bicara; tenaga dua pihak habis untuk bolak-balik dan kekurangan tidak berhenti. A=3 (S1): rapat evaluasi baru bulan depan, sementara kiriman Jumat berikutnya tetap kurang. E=2+J2: beban dipindah ke orang tua, padahal kerja sama ini justru supaya orang tua tidak perlu datang. B=1: menunggu rumah sakit sadar sendiri.",
   "<b>Kunci vs D (poin 4):</b> D \"mengembalikan berkas kurang ke rekam medis\" lalu menunggu lengkap, padahal kekurangan ini \"belum pernah Anda bicarakan dengan mereka\"; C membicarakannya dan menyepakati daftar periksa.<br>\n      <b>Kunci vs A (poin 3):</b> A menyepakati \"rapat evaluasi bulan depan\", sementara berkas kurang sudah datang tiga Jumat terakhir; C menemui rekam medis sekarang."
  ],
  "catatan": [
   "Tabel tindakan sejenis (lapor/naik ke atasan): soal 14 = 5 (rekan sudah ditegur langsung, pola berulang merugikan). Opsi naik ke kepala dinas di soal 21 dihapus saat reviu cek buta 2026-10-26 (skor 4 tanpa pemicu J3 melanggar aturan J3)."
  ],
  "siswa": {
   "tanya": "sudah dua bulan RSUD mengirim berkas kelahiran ke dinasmu setiap Jumat, supaya akta terbit tanpa orang tua harus datang. Tiga Jumat terakhir, belasan berkas datang tanpa surat keterangan lahir. Kamu belum pernah membicarakannya dengan mereka.",
   "opsi": {
    "C": "temui petugas rekam medis, sepakati daftar periksa berkas, lalu lengkapi yang sudah tertunda. Kiriman Jumat depan lengkap, dan akta yang tertahan ikut jalan.",
    "D": "tegas, dan akta tetap terbit dari berkas yang lengkap. Hanya saja, rumah sakit menerima berkas kembali tanpa tahu apa yang kurang, karena belum pernah ada yang bilang. Jumat depan bisa terulang.",
    "A": "evaluasi itu bagus, tapi bulan depan berarti masih ada beberapa Jumat lagi berkas datang kurang.",
    "E": "kerja sama ini dibuat supaya orang tua tidak perlu repot. Pilihan ini malah membuat mereka repot.",
    "B": "rumah sakit tidak akan sadar kalau tidak ada yang memberi tahu."
   },
   "kunci": "C membicarakan kekurangan langsung dengan mitra dan memberinya alat yang jelas, sambil menyelesaikan akta yang tertunda.",
   "analogi": "kalau tukang laundry terus lupa melipat, kamu bilang saja caranya. Mengembalikan baju tiap minggu tanpa penjelasan hanya membuat kalian sama-sama capek.",
   "jebakan": "mengembalikan berkas yang kurang terlihat tegas dan benar. Rumah sakit \"belum pernah\" diberi tahu, jadi mereka tidak tahu apa yang harus diperbaiki.",
   "tips": "sebelum menilai mitra lalai, tanya dulu: sudah pernah diberi tahu belum?"
  }
 },
 "22": {
  "reviu": [
   "Dilema: warga yang merasa dirugikan perlu dilayani dengan baik, tetapi penghapusan denda harus punya dasar yang bisa dipertanggungjawabkan.",
   "D mencocokkan pengakuan warga dengan catatan rekan di lembar pengosongan, lalu membatalkan denda bila cocok: warga dilayani hari itu, keputusan ada dasarnya, dan Anda berwenang memutuskannya.",
   "B=4 (S3): ada pengecekan, tetapi ke petugas TI, padahal bukti isi kotak dicatat rekan sirkulasi sendiri; warga menunggu pemeriksaan di tempat yang kurang tepat sekarang. A=3 (S5): dihapus hanya karena warga yakin; ruginya nanti, penghapusan tanpa dasar bisa diminta siapa pun. E=2+J3: dinaikkan ke kepala perpustakaan padahal Anda berwenang. C=1: keberatan dialihkan ke kotak saran.",
   "<b>Kunci vs B (poin 4):</b> B melaporkan \"dugaan salah catat ke petugas TI\", padahal rekan Anda \"mencatat isi kotak itu di lembar pengosongan setiap sore\"; D langsung memeriksa catatan itu.<br>\n      <b>Kunci vs A (poin 3):</b> A menghapus denda \"karena warga itu yakin sudah tepat waktu\"; D menghapus setelah keyakinan itu dicocokkan dengan catatan."
  ],
  "catatan": [
   "Tabel tindakan sejenis (menunggu): soal 21 B = 1 (menunggu mitra sadar sendiri, tanpa batas), soal 22 B = 4 (menunggu hasil pengecekan, tetapi ke pihak yang salah); bedanya, di 22 ada langkah pengecekan nyata, di 21 tidak ada yang memberi tahu mitra."
  ],
  "siswa": {
   "tanya": "seorang warga keberatan didenda karena bukunya tercatat terlambat. Ia yakin sudah memasukkannya ke kotak pengembalian sebelum jatuh tempo. Kamu koordinator sirkulasi yang berwenang menghapus denda keliru, dan setiap sore rekanmu mencatat isi kotak itu.",
   "opsi": {
    "D": "buka catatan rekanmu di lembar pengosongan, cocokkan tanggalnya. Kalau cocok, batalkan dendanya saat itu juga. Warga lega, dan kamu punya dasar.",
    "B": "ada niat memeriksa, itu bagus. Hanya alamatnya meleset: catatan isi kotak ada di meja sirkulasi, bukan di bagian TI.",
    "A": "warga langsung senang. Bagaimana kalau besok sepuluh orang lain datang dengan keyakinan yang sama?",
    "E": "kepala perpustakaan pasti bisa memutuskan. Hanya saja wewenang itu sudah ada di tanganmu.",
    "C": "disuruh melunasi dulu, lalu keberatannya masuk kotak saran. Warga pulang dengan perasaan tidak didengar."
   },
   "kunci": "D mengecek bukti yang ada di unitmu sendiri, lalu memakai wewenangmu dengan dasar yang jelas.",
   "analogi": "kasir yang ditegur pembeli soal kembalian tidak langsung menyerahkan uang, dan tidak juga memanggil manajer. Ia membuka struk dan menghitung ulang.",
   "jebakan": "melibatkan kepala perpustakaan kesannya paling aman. Soal sudah menyebut kamu \"berwenang menghapus denda keliru\", jadi menyerahkannya ke atas berarti melepas tugasmu sendiri.",
   "tips": "sebelum menyerahkan ke pihak lain, cek dulu catatan apa yang sudah ada di unitmu sendiri."
  }
 },
 "23": {
  "reviu": [
   "Dilema: mengakui kekeliruan ke semua redaksi terasa mempermalukan instansi, tetapi angka keliru sudah sampai di belasan redaksi dan bisa dimuat.",
   "C mengirim ralat ke seluruh penerima siaran kemarin, lalu menjawab wartawan: semua redaksi memegang angka yang sama, dan instansi terlihat jujur, bukan menutupi.",
   "B=4 (S2)+J4: wartawan yang bertanya mendapat jawaban resmi, tetapi redaksi lain tetap memegang angka keliru; terasa sekarang. D=3 (S3): pelurusan dilempar ke bidang program, padahal siaran pers dikirim humas. E=2: menahan berita dan diam-diam memperbaiki laman, tanpa ralat. A=1: hanya melayani yang bertanya.",
   "<b>Kunci vs B (poin 4):</b> B menyiapkan surat jawaban \"untuk wartawan itu\", sementara siaran terkirim \"ke belasan redaksi\"; C meralat ke semua penerima.<br>\n      <b>Kunci vs D (poin 3):</b> D meminta \"bidang program sendiri yang meluruskan angka itu\", padahal Anda yang mengirim siaran kemarin; C meralat lewat jalur yang sama."
  ],
  "siswa": {
   "tanya": "kemarin kamu mengirim siaran pers capaian imunisasi ke belasan redaksi. Pagi ini bidang program bilang angkanya keliru, dan seorang wartawan sudah menelepon karena angkanya beda dengan dasbor resmi. Mengaku salah ke semua redaksi tentu malu rasanya.",
   "opsi": {
    "C": "kirim ralat ke semua redaksi yang kemarin menerima siaran, lalu jawab wartawan itu. Malu sebentar, dan tidak ada media yang memuat angka keliru dari instansimu.",
    "B": "rapi dan resmi, tapi cuma satu wartawan yang dapat angka benar. Redaksi lain masih memegang angka kemarin.",
    "D": "angkanya memang dari bidang program. Siaran persnya kamu yang kirim, jadi ralat paling pas keluar dari kamu juga.",
    "E": "laman instansi diam-diam berubah, sementara berita dengan angka lama bisa tetap terbit. Kalau ketahuan, malunya jauh lebih besar.",
    "A": "yang tidak bertanya dibiarkan memuat angka keliru."
   },
   "kunci": "C membereskan kekeliruan di semua tempat angka itu terkirim, lewat jalur yang sama dengan siaran kemarin.",
   "analogi": "kalau undangan yang tersebar salah tanggal, kamu kirim ralat ke semua penerima, bukan hanya menjawab tamu yang kebetulan bertanya.",
   "jebakan": "rasa malu di kalimat terakhir cerita sengaja dipasang. Pilihan yang paling sedikit malunya, A dan E, justru yang paling merugikan.",
   "tips": "ralat dikirim lewat jalur yang sama dan ke penerima yang sama dengan kabar yang keliru."
  }
 },
 "24": {
  "reviu": [
   "Dilema: jadwal pengumuman Senin perlu dijaga, tetapi spesifikasi \"setara atau lebih tinggi\" tidak menyebut setara dengan apa, padahal penyedia menyusun penawaran langsung dari dokumen itu.",
   "E meminta bidang perencanaan memperjelas hari ini, sebelum paket tayang: jadwal masih terkejar, dan dokumen yang diumumkan sudah jelas.",
   "A=4 (S1): jadwal terjaga, tetapi tafsir baru dijawab saat tanya jawab, sesudah penyedia mulai menyusun penawaran dari dokumen yang kabur. B=3 (S3)+J2: tafsir dibebankan ke staf baru, padahal spesifikasi itu kiriman bidang perencanaan. D=2: disalin apa adanya demi aman dari tuduhan. C=1: disamakan semua, padahal dua laptop untuk penyuntingan video.",
   "<b>Kunci vs A (poin 4):</b> A \"mengumumkan paket sesuai jadwal\" dan menjawab tafsir belakangan, padahal \"penyedia menyusun penawaran langsung dari dokumen yang diumumkan Senin\"; E memperjelas sebelum dokumen tayang.<br>\n      <b>Kunci vs B (poin 3):</b> B meminta \"staf baru di unit menafsirkan spesifikasinya\", padahal spesifikasi itu kiriman bidang perencanaan; E bertanya langsung ke sumbernya."
  ],
  "siswa": {
   "tanya": "kamu menyusun dokumen pengadaan laptop: delapan untuk administrasi, dua untuk menyunting video. Spesifikasinya cuma bilang \"prosesor setara atau lebih tinggi\", tanpa menyebut setara dengan apa. Padahal penyedia langsung menyusun penawaran dari dokumen yang diumumkan Senin.",
   "opsi": {
    "E": "tanya bidang perencanaan hari ini juga, maksudnya setara dengan apa. Senin masih aman, dan penyedia membaca dokumen yang jelas.",
    "A": "jadwal aman. Hanya saja, saat sesi tanya jawab dibuka, sebagian penyedia sudah menghitung harga dari spesifikasi yang kabur.",
    "B": "staf baru diminta menebak maksud orang lain dari katalog merek. Yang tahu maksudnya ada di bidang perencanaan.",
    "D": "menyalin apa adanya terasa aman buatmu. Penyedia tetap bingung harus menawarkan laptop yang mana.",
    "C": "dua laptop untuk menyunting video disamakan dengan laptop administrasi. Anggarannya rata, kebutuhannya tidak."
   },
   "kunci": "E menanyakan maksud spesifikasi ke sumbernya sebelum dokumen dibaca penyedia, sementara jadwal Senin masih terkejar.",
   "analogi": "pesanan kue tertulis \"rasa seperti biasa\"? Telepon dulu pemesannya sebelum oven menyala, bukan setelah kuenya jadi.",
   "jebakan": "ada dua jenis laptop di cerita. Kalau kamu melewatkan angka delapan dan dua itu, pilihan C terlihat hemat dan wajar.",
   "tips": "dokumen yang langsung dipakai pihak luar harus jelas sebelum keluar. Pertanyaan sesudahnya selalu lebih mahal."
  }
 },
 "25": {
  "reviu": [
   "Dilema: relawan bekerja sukarela dan perlu dihargai, tetapi laporan mereka menjadi dasar usulan bantuan, sementara bentuknya berbeda-beda dan dua relawan terus terlambat.",
   "D menyepakati format singkat dan tenggat bersama keenam relawan di pertemuan Jumat: semua laporan seragam, aturan lahir dari relawan sendiri, dan tidak ada yang dipermalukan.",
   "B=4 (S4): rekap selesai dalam satu format, tetapi tenaga Anda habis menagih dan menyalin laporan orang lain tiap bulan; cara relawan menulis dan mengirim tidak berubah. E=3 (S2): hanya dua relawan yang terlambat, padahal bentuk laporan keenam relawan berbeda-beda. C=2+J4: berhenti di surat edaran kewajiban. A=1: memaklumi tanpa langkah.",
   "<b>Kunci vs B (poin 4):</b> B menagih lewat telepon \"lalu menyalin semuanya ke satu format\" tiap bulan, jadi bentuk yang berbeda-beda dan keterlambatan terus berulang; D menyepakati format dan tenggat sekali untuk seterusnya.<br>\n      <b>Kunci vs E (poin 3):</b> E menyepakati aturan \"dengan dua relawan yang terlambat\", padahal \"bentuk laporannya berbeda-beda\" di keenam relawan; D mengajak semuanya."
  ],
  "siswa": {
   "tanya": "setiap bulan kamu merekap laporan kunjungan enam relawan sukarela untuk usulan bantuan lansia. Bentuk laporannya macam-macam, dan dua relawan sudah tiga bulan berturut-turut terlambat sepekan. Jumat ini ada pertemuan rutin dengan mereka semua.",
   "opsi": {
    "D": "manfaatkan pertemuan Jumat: sepakati satu format singkat dan tenggat kirim bersama-sama. Relawan ikut menentukan aturannya, jadi lebih mudah ditepati.",
    "B": "rekapmu jadi rapi dalam satu format, dan laporan yang telat tertagih. Bulan depan? Kamu menagih dan menyalin lagi, karena relawan tetap menulis dengan caranya masing-masing.",
    "E": "dua relawan yang terlambat beres. Empat lainnya tetap mengirim dengan bentuknya masing-masing.",
    "C": "surat edaran di grup gampang terbaca, gampang juga dilupakan. Format yang macam-macam pun tidak disentuh.",
    "A": "menghargai relawan itu penting. Kalau tidak ada yang berubah, usulan bantuan lansia ikut berantakan."
   },
   "kunci": "D membereskan dua masalah, bentuk dan tenggat, untuk semua relawan, dengan cara yang membuat mereka merasa dilibatkan.",
   "analogi": "pengurus arisan yang setoran anggotanya macam-macam tidak menagih satu per satu. Mereka sepakati bersama tanggal dan caranya di pertemuan berikutnya.",
   "jebakan": "cerita menyebut dua masalah. Pilihan E dan C hanya menjawab keterlambatan, padahal bentuk laporan yang berbeda-beda ada di keenam relawan.",
   "tips": "hitung berapa masalah yang disebut cerita, lalu cari pilihan yang menjawab semuanya."
  }
 },
 "26": {
  "reviu": [
   "Dilema: komunitas relawan perlu dijaga karena bekerja tanpa bayaran, tetapi anak-anak berhak atas acara yang pasti; masalahnya ada di pesan jadwal yang tidak sampai.",
   "B mengatur bersama ketua komunitas agar tiap pendongeng mengonfirmasi ke Anda sebelum Kamis: pesan yang putus ketahuan sebelum Sabtu, dan komunitas tidak disalahkan.",
   "D=4 (S5): jadwal sebulan penuh rapi, tetapi tetap dikirim lewat jalur yang terbukti tidak sampai; ruginya nanti, saat pesan berikutnya putus lagi. E=3 (S4): Anda siap menggantikan, tetapi tenaga Anda terpakai tiap kali dan pendongeng tetap tidak menerima jadwal. C=2+J4: berhenti di surat pengingat nota kesepahaman. A=1: sibuk dengan film, masalah tidak disentuh.",
   "<b>Kunci vs D (poin 4):</b> D \"menyusun jadwal sebulan penuh\", padahal pendongeng \"ternyata tidak pernah menerima pesannya\"; B memastikan pesan diterima lewat konfirmasi.<br>\n      <b>Kunci vs E (poin 3):</b> E \"membacakan dongeng sendiri\" bila pendongeng berhalangan, sehingga pesan yang putus tidak pernah diperbaiki; B menangkapnya sebelum Sabtu."
  ],
  "catatan": [
   "Catatan: latar perpustakaan juga dipakai soal 7 dan 22; konteksnya berbeda (ruang baca, denda sirkulasi, kerja sama komunitas)."
  ],
  "siswa": {
   "tanya": "dua kali bulan ini puluhan anak menunggu dongeng Sabtu di perpustakaanmu, dan pendongengnya tidak datang. Ketua komunitas sudah meneruskan jadwal, tapi ternyata dua pendongeng itu tidak pernah menerima pesannya.",
   "opsi": {
    "B": "sepakati dengan ketua komunitas: setiap pendongeng membalas konfirmasi ke kamu sebelum Kamis. Kalau sampai Kamis belum ada balasan, kamu masih punya waktu mencari jalan.",
    "D": "jadwal sebulan penuh terlihat rapi. Jadwal serapi apa pun percuma kalau pesannya tidak sampai ke pendongeng.",
    "E": "anak-anak tetap mendengar dongeng, dan Sabtu itu selamat. Pekan berikutnya kamu harus siap lagi, karena pesan yang hilang tidak diperbaiki.",
    "C": "komunitas ini bekerja tanpa dibayar. Surat yang menagih kewajiban bisa terasa seperti teguran, sementara salahnya ada di pesan yang tidak sampai.",
    "A": "film kartun mengisi waktu anak-anak. Pendongengnya tetap tidak tahu jadwal."
   },
   "kunci": "B menutup celah yang sebenarnya, yaitu pesan yang tidak sampai, dengan cara yang ringan bagi relawan.",
   "analogi": "kalau undangan sering nyasar, minta tamu membalas \"hadir\" lebih dulu. Dari balasan itu kamu tahu siapa yang belum menerima.",
   "jebakan": "kata \"ternyata\" di kalimat kedua memberi tahu letak masalahnya. Jadwalnya ada, yang macet pesannya.",
   "tips": "kalau sebuah rencana gagal, tanyakan dulu: rencananya yang salah, atau kabarnya yang tidak sampai?"
  }
 },
 "27": {
  "reviu": [
   "Dilema: tiga staf ruang arsip berhenti bekerja karena kode verifikasi tidak sampai, tetapi verifikasi dua langkah dipasang untuk keamanan akun dan tidak boleh dilonggarkan.",
   "A mendaftarkan alat verifikasi fisik (kunci keamanan USB cadangan) untuk ketiga staf hari ini: mereka bekerja lagi tanpa sinyal, dan pengamanan dua langkah tetap utuh.",
   "E=4 (S4): verifikasi tetap jalan, tetapi tiga staf bolak-balik naik ke lantai atas tiap butuh kode sampai penguat sinyal terpasang; kerja terpotong-potong. B=3 (S2)+J3: pengecualian untuk seluruh staf arsip lewat kepala instansi, padahal alat penggantinya ada di unit TI. C=2: kode dibacakan rekan lewat telepon, rahasianya diketahui orang lain. D=1: akses ditutup, staf makin tidak bisa bekerja.",
   "<b>Kunci vs E (poin 4):</b> E meminta ketiga staf \"naik ke lantai atas tiap kali butuh kode verifikasi\" sampai penguat terpasang bulan depan; A membuat mereka bisa masuk dari ruang arsip hari ini juga.<br>\n      <b>Kunci vs B (poin 3):</b> B meminta kepala instansi \"membebaskan seluruh staf arsip dari verifikasi dua langkah\", padahal unit TI \"masih menyimpan kunci keamanan USB cadangan\"; A memakai alat yang sudah ada tanpa melonggarkan keamanan."
  ],
  "catatan": [
   "Kunci memakai \"alat verifikasi fisik\" (bukan \"kunci keamanan USB\" seperti di soal) supaya tidak tertebak dari kata yang sama. Tangga TIK tidak dipakai (bukan soal pesan atau tautan mencurigakan)."
  ],
  "siswa": {
   "tanya": "sejak surel wajib verifikasi dua langkah, tiga staf di ruang arsip bawah tanah tidak bisa bekerja, karena kodenya dikirim ke ponsel dan di sana tidak ada sinyal. Penguat sinyal baru terpasang bulan depan. Unit TI tempatmu bekerja masih menyimpan kunci keamanan USB cadangan.",
   "opsi": {
    "A": "daftarkan alat verifikasi fisik itu untuk mereka bertiga hari ini. Mereka bisa membuka surel dari ruang arsip, dan keamanannya tidak berkurang sedikit pun.",
    "E": "kerja tetap jalan, tapi bayangkan sebulan naik-turun tangga setiap kali butuh kode. Waktu kerja mereka habis di tangga.",
    "B": "pengecualian berarti pintu yang tadinya dikunci dibuka lagi, padahal alat penggantinya sudah ada di unit TI.",
    "C": "kode verifikasi itu rahasia. Begitu dibacakan lewat telepon, ada orang lain yang ikut tahu.",
    "D": "aman sih, tapi ketiga staf itu jadi tidak bisa bekerja sama sekali sampai bulan depan."
   },
   "kunci": "A memulihkan kerja tiga staf hari ini dengan alat yang sudah tersedia, tanpa melonggarkan keamanan.",
   "analogi": "kalau kartu akses kantormu tertinggal, satpam memberimu kartu tamu. Pintunya tetap terkunci untuk orang lain, dan kamu tetap bisa masuk.",
   "jebakan": "hampir semua pilihan sibuk mengakali sinyal. Jalan keluarnya justru tersimpan di unit TI sendiri: alat yang tidak butuh sinyal sama sekali.",
   "tips": "sebelum minta pengecualian aturan, cek dulu alat apa yang sudah ada di tanganmu."
  }
 },
 "28": {
  "reviu": [
   "Dilema: sekolah butuh nilai praktik tepat waktu, tetapi mitra yang menampung siswa tanpa bayaran tidak boleh terus direpotkan oleh lembar penilaian yang mepet, berganti bentuk, dan membingungkan.",
   "C merumuskan bersama perwakilan bengkel satu format tetap dan jadwal kirimnya: ketiga keluhan terjawab, mitra ikut menentukan, dan empat mitra baru semester depan langsung memakai format yang sama.",
   "A=4 (S4): bengkel terbantu, tetapi Anda harus mendatangi enam bengkel tiap periode, sepuluh semester depan, dan format yang berganti tidak tersentuh. E=3 (S1): format baru dirumuskan setelah semester depan berjalan, padahal keluhan sudah ada sekarang. B=2+J4: janji tanpa cara. D=1: urusan dilempar ke guru pembimbing.",
   "<b>Kunci vs A (poin 4):</b> A \"mendatangi keenam bengkel tiap menjelang batas\", padahal \"semester depan ada empat mitra baru\"; C membuat format tetap yang bisa dipakai semua mitra tanpa didatangi.<br>\n      <b>Kunci vs E (poin 3):</b> E merumuskan format \"begitu semester depan sudah berjalan\"; C merumuskannya sekarang, sebelum empat mitra baru masuk."
  ],
  "siswa": {
   "tanya": "kamu koordinator PKL di enam bengkel yang menampung siswamu tanpa bayaran. Dua pemilik bengkel mengeluh: lembar penilaian selalu datang mepet, bentuknya ganti tiap semester, dan ada kolom yang tidak mereka pahami. Semester depan, empat mitra baru bergabung.",
   "opsi": {
    "C": "ajak perwakilan bengkel merumuskan satu format penilaian yang tetap, sekalian jadwal kirimnya. Mitra paham isinya karena ikut menyusun, dan empat bengkel baru tinggal memakainya.",
    "A": "kamu rajin sekali. Sekarang hitung: enam bengkel, semester depan sepuluh, dan bentuk lembarnya masih berganti-ganti.",
    "E": "idenya sudah benar, waktunya yang telat. Begitu semester depan berjalan, sepuluh bengkel sudah menerima lembar yang membingungkan.",
    "B": "minta maaf itu baik. Tanpa perubahan cara, lembar berikutnya datang mepet lagi.",
    "D": "guru pembimbing kenal siswanya, tapi keluhan bengkel soal lembar penilaian tetap tidak ada yang mengurus."
   },
   "kunci": "C menjawab ketiga keluhan dengan melibatkan mitra, dan siap dipakai sebelum mitra bertambah.",
   "analogi": "kalau tamu sering bingung mengisi buku tamu, kamu tidak menunggui mereka satu per satu. Kamu perbaiki kolomnya, lalu semua tamu bisa mengisi sendiri.",
   "jebakan": "kalimat \"Semester depan ada empat mitra baru\" terlihat seperti tambahan. Kalimat itulah yang membuat cara A, mendatangi tiap bengkel, cepat kewalahan.",
   "tips": "kalau jumlah mitra akan bertambah, pilih cara yang tetap jalan tanpa kamu harus hadir di setiap tempat."
  }
 },
 "29": {
  "reviu": [
   "Dilema: tugas pendataan dari atasan harus selesai dalam dua pekan, tetapi layanan surat pindah warga hanya Anda yang mengerjakan dan tidak boleh telantar.",
   "D menyampaikan beban loket kepada sekretaris camat sejak awal, lalu menyepakati pembagian jam: atasan memutuskan dengan informasi lengkap, layanan dan pendataan sama-sama berjalan.",
   "E=4 (S1): dua tugas dicoba berjalan, tetapi kendala baru disampaikan setelah jadwal tertinggal; ruginya terasa saat semuanya sudah mepet. A=3 (S2)+J4: hanya berkas mendesak yang dilayani, warga lain tertunda dua pekan. C=2: layanan warga dihentikan sampai pendataan selesai. B=1: pelayanan warga jadi dalih menolak tugas.",
   "<b>Kunci vs E (poin 4):</b> E baru \"melapor kalau jadwalnya mulai tertinggal\", padahal sekretaris camat menugaskan \"tanpa tahu verifikasi itu hanya Anda yang mengerjakan\"; D memberi tahu sejak awal.<br>\n      <b>Kunci vs A (poin 3):</b> A melayani \"hanya berkas mendesak\" selama dua pekan, sehingga warga lain tertunda; D mengatur jam agar semua berkas tetap dilayani."
  ],
  "siswa": {
   "tanya": "cuma kamu yang memverifikasi surat pindah di kantor kecamatan, dengan puluhan berkas sehari, dan kamu boleh mengatur jam loket. Senin ini sekretaris camat memberimu tugas mendata ulang ratusan barang dalam dua pekan. Ia tidak tahu verifikasi itu hanya kamu yang mengerjakan.",
   "opsi": {
    "D": "ceritakan dulu beban loketmu ke sekretaris camat, lalu sepakati jam layanan dan jam mendata. Atasan jadi tahu keadaannya, dan dua pekerjaan punya waktunya masing-masing.",
    "E": "kamu berusaha mengerjakan keduanya tanpa mengeluh. Hanya saja, saat jadwal sudah tertinggal, ruang untuk mengatur ulang tinggal sedikit.",
    "A": "berkas mendesak terlayani, yang lain menunggu dua pekan. Padahal setiap warga datang dengan urusannya masing-masing.",
    "C": "perintah atasan dipatuhi, tapi loket surat pindah tutup sampai pendataan selesai. Atasanmu pun tidak pernah meminta loket ditutup.",
    "B": "pelayanan warga dijadikan alasan menolak tugas, padahal keduanya masih bisa dijalankan kalau jamnya diatur."
   },
   "kunci": "D memberi atasan informasi yang belum ia punya, lalu mengatur waktu agar kedua tugas jalan.",
   "analogi": "kalau dosen memberi tugas besar di pekan ujian tanpa tahu jadwalmu, kamu bilang dari awal dan atur tenggatnya bersama, bukan mengeluh di hari terakhir.",
   "jebakan": "bekerja diam-diam tanpa mengeluh sering dianggap terpuji. Di soal ini atasan \"tanpa tahu\" bebanmu, dan diam membuatnya tetap tidak tahu sampai jadwal tertinggal.",
   "tips": "kalau atasan memberi tugas tanpa tahu bebanmu, beri tahu bebanmu sebelum mulai mengerjakan."
  }
 },
 "30": {
  "reviu": [
   "Dilema: pedagang butuh bukti identitas besok pagi, tetapi blanko terbatas dan cadangannya disisihkan untuk korban bencana, sehingga warga lain tetap harus diperlakukan adil.",
   "B memproses surat keterangan pengganti sampai ditandatangani hari ini: pedagang memegang bukti identitas sebelum besok pagi, dan blanko cadangan tidak diambil.",
   "C=4 (S1): surat disiapkan, tetapi tanda tangan baru besok pagi, padahal pencairan juga besok pagi dan kepala seksi hanya ada sampai sore. E=3 (S2): masuk antrean cetak, berguna pekan depan, tetapi tidak menjawab kebutuhan besok pagi. A=2+J3: naik ke kepala dinas padahal jalur pengganti ada di tingkat seksi. D=1: sibuk memeriksa biometrik, kebutuhan besok tidak tersentuh.",
   "<b>Kunci vs C (poin 4):</b> C \"memintakan tanda tangannya besok pagi\", padahal kepala seksi \"hanya ada sampai sore\" dan pencairan juga besok pagi; B menyelesaikan tanda tangan hari ini.<br>\n      <b>Kunci vs E (poin 3):</b> E memasukkan pedagang \"ke antrean cetak\" sampai blanko tiba pekan depan; B memberi bukti identitas yang bisa dipakai besok."
  ],
  "siswa": {
   "tanya": "KTP-el seorang pedagang patah, padahal besok pagi ia harus tanda tangan pencairan pinjaman di bank. Blanko kosong sampai pekan depan, dan cadangannya disisihkan untuk korban bencana. Surat keterangan pengganti bisa dibuat, tapi butuh tanda tangan kepala seksi yang cuma ada sampai sore.",
   "opsi": {
    "B": "proses surat keterangan penggantinya sekarang dan kejar tanda tangan kepala seksi sebelum sore. Pedagang pulang membawa bukti identitas, blanko untuk korban bencana tetap utuh.",
    "C": "suratnya sudah siap, tinggal tanda tangan. Masalahnya, besok pagi pedagang harus sudah di bank, bukan menunggu di kantormu.",
    "E": "KTP-el barunya pasti jadi, tapi pekan depan. Pencairannya besok pagi.",
    "A": "kebijakan khusus dari kepala dinas butuh waktu, padahal jalan keluarnya sudah ada di meja kepala seksi.",
    "D": "memeriksa rekaman biometrik tidak salah, hanya tidak menolong pedagang yang besok pagi harus ke bank."
   },
   "kunci": "B memakai jalur resmi yang sudah tersedia dan menyelesaikannya sebelum batas waktunya habis.",
   "analogi": "kehabisan tiket kereta? Petugas tidak memberimu kursi yang disimpan untuk penumpang darurat. Ia mencarikan jadwal lain yang masih mengantarmu tepat waktu.",
   "jebakan": "pilihan C dan B hampir sama isinya. Bedanya ada di kapan tanda tangan diminta, dan kalimat \"hanya ada sampai sore\" yang menentukan.",
   "tips": "kalau dua pilihan berisi langkah yang sama, bandingkan waktunya dengan batas yang disebut cerita."
  }
 }
};
