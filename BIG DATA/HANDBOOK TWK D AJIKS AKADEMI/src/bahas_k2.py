"""Pembahasan siswa Kelompok 2 (contoh Bab 8-10 + latihan Bab 8-10). Format sama dengan bahas_k1.py;
pola ditulis lengkap per huruf (nomor nama kesalahan Bab 4)."""

BAHAS = {
# ─────────── BAB 8 ───────────
'contoh-bab08': dict(
 pola=dict(A=2, B=2, C=8, D=6),
 tanya="Penerapan semangat kalimat kedua Proklamasi, seksama dan secepat-cepatnya, pada peralihan data desa.",
 langkah="Kalimat Proklamasi memuat dua tuntutan: seksama dan sesingkat-singkatnya. Kalimat penentu memberi dua fakta yang sejajar: tenggat pekan depan dan nama ganda di daftar lama.",
 bahas=dict(
  A="Cepat, ya. Seksama, tidak. Nama ganda ikut pindah ke aplikasi dan bantuan pekan depan bisa salah sasaran.",
  B="Seksama sampai tidak ada keraguan sedikit pun terdengar teliti. Tenggat pekan depan terlewat, dan sisi tempo yang sesingkat-singkatnya hilang.",
  C="Rencana yang rinci itu baik, tetapi musyawarahnya bulan depan, sedangkan penyaluran pekan depan. Langkah ini datang terlambat.",
  D="Warga jadi tahu rencananya. Nama ganda di daftar tetap ada.",
  E="Data kembar disisir dulu, lalu peralihan selesai sebelum penyaluran. Seksama dan cepat dua-duanya terpenuhi."),
 kunci="E menjalankan kedua tuntutan kalimat Proklamasi dan menjawab kedua fakta di cerita.",
 analogi="Seperti pindah rumah sebelum kontrak habis: barang rusak dipilah dulu supaya tidak ikut diangkut, lalu semuanya diangkut sebelum tanggal kunci diserahkan.",
 jebakan="A memakai kata sesingkat-singkatnya persis seperti Proklamasi. Kata yang sama belum tentu semangat yang sama."),

'Nasionalisme dan cinta tanah air.1': dict(
 pola=dict(B=2, C=3, D=2, E=6),
 tanya="Keputusan sesi cerita rakyat yang sesuai fungsi bahasa Indonesia sebagai sarana pemersatu, dengan dua syarat dari panitia.",
 langkah="Syarat pertama datang dari uji coba: cerita harus dipahami peserta dari provinsi lain. Syarat kedua: ciri bahasa asal tidak boleh hilang. Cari pilihan yang memenuhi keduanya dalam satu sesi.",
 bahas=dict(
  A="Cerita dibawakan dalam bahasa Indonesia, jadi semua paham. Ungkapan daerah tetap hadir, lengkap dengan artinya. Dua syarat panitia terpenuhi.",
  B="Semua peserta paham, itu benar. Tapi bahasa Indonesia baku tanpa ungkapan daerah menghapus ciri asal yang sudah disepakati panitia tidak boleh hilang.",
  C="Keakraban yang dinilai sesudahnya adalah hasil acara. Keputusan tentang bahasa ceritanya belum diambil.",
  D="Kedengarannya adil, dua bahasa dapat bagian. Tapi bagian berbahasa daerah akan gagal dipahami lagi, seperti saat uji coba.",
  E="Spanduk persatuan bahasa tidak mengubah apa pun di panggung cerita."),
 kunci="A membuat cerita dipahami bersama sambil menjaga ciri bahasa asal di dalamnya.",
 analogi="Seperti makan di rumah teman beda daerah: ibunya menjelaskan nama masakan dalam bahasa Indonesia, lalu menyebut nama aslinya supaya kamu tahu itu masakan khas kampungnya.",
 jebakan="D terlihat paling menghargai dua pihak. Uji coba di cerita sudah membuktikan bahwa cerita yang sepenuhnya berbahasa daerah tidak dipahami."),

'Nasionalisme dan cinta tanah air.2': dict(
 pola=dict(A=2, C=2, D=6, E=4),
 tanya="Cara menyalurkan 400 paket ke dua kecamatan menurut semangat persatuan dan keadilan sosial.",
 langkah="Adil di sini berarti menurut kebutuhan, bukan sama rata. Kalimat penentu memberi kabar baik: kedua kecamatan punya posko yang siap, jadi jarak bukan alasan.",
 bahas=dict(
  A="Mudah dijangkau memang memudahkan panitia. Kecamatan yang jauh, dengan pengungsi lebih banyak, malah menunggu.",
  B="Jatah menurut kebutuhan, disalurkan lewat posko setempat. Keadilan dan persatuan berjalan bersama, dan jarak tidak lagi jadi masalah.",
  C="Kamu peduli pada yang paling banyak pengungsinya, itu bagus. Tapi kecamatan terdekat juga kebanjiran dan tidak mendapat apa-apa.",
  D="Data lengkap itu ideal, tetapi korban banjir tidak bisa menunggu sampai semua formulir terisi.",
  E="Sama rata terdengar adil, padahal jumlah pengungsinya berbeda. Ini adil di permukaan saja."),
 kunci="B membagi menurut kebutuhan dan memanfaatkan posko di kedua tempat, sesuai kalimat penentu.",
 analogi="Seperti ibu yang membagi lauk: anak yang baru pulang latihan sepak bola dapat porsi lebih besar, tetapi tidak ada anak yang tidak kebagian.",
 jebakan="E menyebut kedua kecamatan dan terdengar paling seimbang. Seimbang jumlahnya belum tentu adil kebutuhannya."),

'Nasionalisme dan cinta tanah air.3': dict(
 pola=dict(A=6, B=9, D=3, E=5),
 tanya="Nilai yang tercermin dari anggota yang mengkritik programnya sendiri, dengan alasan yang ditulis di cerita.",
 langkah="Kalimat penentu menyebut alasannya: ingin organisasi kembali setia pada tujuan pendiriannya. Cari nilai yang memuat setia dan memperbaiki.",
 bahas=dict(
  A="Ia memang memakai rapat pengurus, tetapi kepatuhan prosedur bukan alasan ia bertindak. Ia bergerak karena tujuan organisasi tidak dijalankan.",
  B="Keberanian moral dekat sekali. Tapi di depan umum? Cerita bilang ia mengajukan usul di rapat pengurus. Pilihan ini menambah adegan.",
  C="Setia pada misi, dan setianya ditunjukkan dengan membenahi cara kerja. Persis alasan yang ditulis cerita.",
  D="Mutu program yang naik adalah hasil yang diharapkan. Yang ditanya nilai di balik tindakannya.",
  E="Kekompakan dan nama baik adalah kata-kata ketua di cerita. Pilihan ini mengulang kekhawatiran ketua, bukan alasan anggota itu."),
 kunci="C cocok dengan alasan yang tertulis: setia pada tujuan, dibuktikan dengan perbaikan.",
 analogi="Seperti sahabat yang menegurmu karena mulai sering bolos: ia bukan memusuhimu, ia ingin kamu kembali jadi dirimu yang dulu.",
 jebakan="B terasa paling gagah. Baca ulang tempat ia bersuara: rapat pengurus, bukan panggung."),

'Nasionalisme dan cinta tanah air.4': dict(
 pola=dict(A=2, B=4, C=5, E=6),
 tanya="Makna patriotisme pada warga perbatasan yang bersaudara dengan warga seberang.",
 langkah="Ada dua sisi: kekerabatan lintas batas dan identitas sebagai bangsa Indonesia. Kalimat penentu memastikan kunjungan yang tercatat resmi tidak melanggar aturan, jadi hubungan itu tidak perlu dibatasi.",
 bahas=dict(
  A="Waspada itu perlu, tetapi membatasi hubungan pada urusan resmi saja berarti memutus kekerabatan yang menurut petugas tidak melanggar aturan.",
  B="Solidaritas kesukuan itu nilai yang lain. Patriotisme bicara kesetiaan pada negara, bukan ikatan suku.",
  C="Kunjungan adat yang dihidupkan lagi adalah keinginan tokoh adat di cerita. Sisi kesetiaan pada Indonesia tidak disebut.",
  D="Kesetiaan pada Indonesia tetap utuh, dan hubungan dengan kerabat seberang dijalankan secara beradab. Dua sisi cerita bertemu.",
  E="Bendera dan lagu kebangsaan membuat acara meriah. Persoalan di perbatasan tidak tersentuh."),
 kunci="D menjaga kesetiaan pada bangsa tanpa memutus kekerabatan yang sah.",
 analogi="Seperti anak yang menikah dan pindah ke keluarga baru: ia tetap rutin pulang menjenguk orang tuanya, dan tidak ada yang meragukan kesetiaannya pada keluarga barunya.",
 jebakan="A terdengar paling waspada dan paling cinta tanah air. Kalimat petugas pos sudah membuktikan kekhawatiran itu tidak perlu sampai memutus hubungan."),

'Nasionalisme dan cinta tanah air.5': dict(
 pola=dict(A=2, B=5, C=2, D=3),
 tanya="Kebijakan mural yang menampung keinginan siswa dan ketentuan UU 24/2009.",
 langkah="Dua sisi: gaya komik yang ceria dan simbol negara yang diatur undang-undang. Kalimat penentu menunjuk masalahnya: Garuda digambar seperti tokoh kartun.",
 bahas=dict(
  A="Simbol negaranya aman, tetapi seluruh mural jadi kaku seperti dekorasi upacara. Keinginan siswa hilang.",
  B="Gaya komik diutamakan, padahal Garuda bergaya kartun itulah masalahnya. Pilihan ini mengulang keinginan siswa saja.",
  C="Masalahnya hilang karena Garudanya dihapus. Tapi mural Sumpah Pemuda tanpa simbol negara, itu menyelesaikan masalah dengan membuang setengah isinya.",
  D="Minat siswa yang diukur sesudahnya adalah hasil. Rancangan muralnya belum diputuskan.",
  E="Tokoh komik tetap ceria, Garuda dan Merah Putih digambar sesuai ketentuan. Keduanya mendapat tempat yang tepat."),
 kunci="E memberi ruang pada gaya siswa tanpa mengubah simbol negara yang diatur undang-undang.",
 analogi="Seperti seragam sekolah di hari bebas: kamu boleh memakai tas dan sepatu warna-warni, tetapi lambang sekolah di dada tetap tidak boleh diganti gambar kartun.",
 jebakan="C terlihat praktis dan aman. Menghapus simbol negara dari mural kebangsaan bukan jalan tengah."),

# ─────────── BAB 9 ───────────
'contoh-bab09': dict(
 pola=dict(A=2, C=10, D=3, E=4),
 tanya="Makna bela negara pada tindakan penyuluh, diukur dengan pengabdian sesuai profesi dalam UU 3/2002.",
 langkah="Pengabdian profesi ada dua unsurnya: keahlian, dan keahlian itu diarahkan untuk kepentingan bersama. Kalimat penentunya menyebut arahnya: agar pasar daerah tetap terisi.",
 bahas=dict(
  A="Keahlian profesinya disebut, tetapi arahnya hanya hasil panen. Untuk siapa hasil itu? Pilihan ini berhenti di tengah.",
  B="Keahlian profesi diarahkan agar kebutuhan pangan warga terpenuhi. Unsur profesi dan unsur kepentingan bersama hadir.",
  C="Pendapatan keluarga pembudidaya aman, itu baik. Tapi bela negara menuntut keahlian dipakai untuk kepentingan warga, bukan untuk dompet sendiri.",
  D="Ikan di pasar tetap ada adalah hasil dari tindakannya. Makna di balik tindakan itu belum disebut.",
  E="Kerja sama antarpembudidaya memang terjadi. Tapi soal mengukurnya dengan pengabdian profesi, dan pilihan ini bicara gotong royong."),
 kunci="B memuat dua unsur pengabdian profesi: keahlian dan kepentingan warga.",
 analogi="Seperti montir yang menunda pulang karena ambulans desa mogok: keahliannya sama dengan hari biasa, tetapi dipakai untuk menyelamatkan banyak orang.",
 jebakan="D terdengar persis seperti cerita. Ketersediaan ikan adalah buahnya; yang ditanya akarnya."),

'Bela negara.1': dict(
 pola=dict(A=3, B=2, C=6, E=4),
 tanya="Kebijakan dinas kesehatan menghadapi permintaan data dari universitas luar negeri saat wabah.",
 langkah="Dua sisi: kerja sama yang membantu menangani wabah, dan aturan ketat pengiriman data pribadi. Kalimat penentunya kunci semuanya: yang diperlukan hanya sebaran kasus per kelurahan.",
 bahas=dict(
  A="Peta yang disebar ke warga adalah hasil kerja sama yang belum terjadi. Soal menanyakan apa yang dilakukan sekarang.",
  B="Data pribadi aman, ya. Kerja sama yang bisa membantu menangani wabah ikut hilang, padahal datanya bisa dikirim tanpa identitas.",
  C="Logo kedua lembaga hanya urusan tampilan. Persoalan data pasien belum disentuh.",
  D="Jumlah kasus per wilayah dikirim tanpa identitas, lewat perjanjian tertulis. Kerja sama jalan, data pribadi tidak keluar.",
  E="Sandi berlapis melindungi server dari peretas. Pertanyaannya data apa yang boleh dikirim, bukan keamanan servernya."),
 kunci="D mengirim hanya data yang diperlukan dan tanpa identitas, sehingga kerja sama dan pelindungan data berjalan bersamaan.",
 analogi="Seperti meminjamkan catatan kepada teman: kamu memfotokopi halaman materinya saja, bukan seluruh buku yang memuat diari pribadimu.",
 jebakan="B terlihat paling melindungi. Kalimat peneliti di soal membuka jalan agar kerja sama tetap mungkin."),

'Bela negara.2': dict(
 pola=dict(B=2, C=4, D=10, E=7),
 tanya="Tindakan yang sesuai peran dokter hewan, dengan bela negara dimaknai sebagai pemakaian keahlian untuk kepentingan umum.",
 langkah="Ukurannya peran: sebagai dokter hewan. Kalimat penentu menunjuk bahayanya: ternak dititipkan dekat peternakan lain, jadi penularan bisa terjadi kapan saja.",
 bahas=dict(
  A="Ia memakai keahliannya memeriksa ternak, lalu melapor lewat jalur resmi. Peran dan bahaya di cerita dua-duanya terjawab.",
  B="Latihan fisik adalah bela negara yang dibantah sendiri oleh soal: bukan sekadar kesiapan fisik.",
  C="Artikel tentang bahaya penyakit ternak baik untuk warga. Ternak yang sakit di kandang tetangga belum diperiksa.",
  D="Belajar penyakit terbaru menambah kemampuan, dan itu untuk dirinya. Ternak di cerita tetap menunggu.",
  E="Menambah pos penjagaan perbatasan adalah urusan pemerintah, bukan tugas dokter hewan."),
 kunci="A memakai keahlian dokter hewan untuk bahaya yang sedang terjadi, lewat jalur resmi.",
 analogi="Seperti petugas pemadam yang sedang libur lalu melihat asap di dapur tetangga: ia tidak menulis artikel tentang bahaya kebakaran, ia memeriksa sumber asap dan menelepon posnya.",
 jebakan="B memakai kata bela negara paling jelas. Soal sudah menutupnya dengan kalimat bukan sekadar kesiapan fisik."),

'Bela negara.3': dict(
 pola=dict(A=2, B=4, C=3, D=6),
 tanya="Nilai yang tercermin dari warga yang melaporkan dan ikut memperbaiki sirene.",
 langkah="Kalimat penentu memperluas ukurannya: sirene itu melindungi tiga desa. Nilai yang dicari harus melampaui desa sendiri dan memakai jalur yang berwenang.",
 bahas=dict(
  A="Rasa memiliki desa itu tulus, tetapi sirene melindungi tiga desa. Ukurannya terlalu sempit.",
  B="Solidaritas antartetangga dekat, tetapi warga tidak sekadar membantu tetangga. Mereka bertindak untuk sarana publik lewat petugas yang berwenang.",
  C="Rasa aman yang muncul sesudahnya adalah hasilnya. Nilai di balik tindakan itu belum disebut.",
  D="Laporan resmi memang ada. Ketaatan prosedur hanya melihat cara melapornya, tidak melihat kepedulian mereka memanggul alat ke bukit.",
  E="Kepedulian kepada tiga desa, disalurkan lewat petugas penanggulangan bencana. Dua hal di cerita masuk."),
 kunci="E menangkap kepedulian yang melampaui desa sendiri dan jalur berwenang yang dipakai warga.",
 analogi="Seperti siswa yang melihat lampu tangga sekolah mati: ia melapor ke penjaga sekolah dan membantu memegangi tangga, karena semua kelas memakai tangga itu.",
 jebakan="A terasa hangat dan dekat dengan kehidupan desa. Kalimat penentu sengaja menyebut tiga desa."),

'Bela negara.4': dict(
 pola=dict(A=2, C=2, D=4, E=6),
 tanya="Aturan layanan pelaporan yang menjaga keamanan dan hak orang yang dilaporkan.",
 langkah="Dua sisi: laporan harus cepat sampai ke petugas, dan kehormatan orang yang dilaporkan harus dijaga. Kalimat penentu menunjuk kejadian buruknya: foto tamu sudah beredar padahal laporannya keliru.",
 bahas=dict(
  A="Peringatan cepat sampai, tetapi justru inilah yang membuat foto tamu itu beredar. Kehormatan terlapor terabaikan.",
  B="Laporan langsung ke pos keamanan, identitas terlapor tidak disebar. Cepat dan menjaga martabat orang.",
  C="Menunggu tiga warga memang mengurangi laporan keliru. Tapi kalau bahayanya nyata, petugas terlambat tahu.",
  D="Menyembunyikan identitas pelapor itu hal lain. Yang dirugikan di cerita adalah terlapor, bukan pelapor.",
  E="Pengguna dibatasi dan laporan dicatat, terlihat tertib. Foto terlapor tetap bisa beredar dari tangan pengurus."),
 kunci="B menjaga kecepatan laporan sambil melindungi kehormatan orang yang dilaporkan.",
 analogi="Seperti melapor ada orang asing di depan rumah: kamu menelepon satpam kompleks, bukan memotret wajahnya lalu menyebarkannya ke grup arisan.",
 jebakan="D menyebut identitas dan terdengar melindungi. Baca baik-baik: identitas siapa?"),

'Bela negara.5': dict(
 pola=dict(A=2, B=5, D=3, E=4),
 tanya="Sikap dokter perantau yang paling mencerminkan bela negara melalui profesinya, dengan kontrak yang masih berjalan.",
 langkah="Kalimat penentu membuka jalan: kontrak tidak melarang kegiatan di luar jam kerja. Jadi ada cara membantu daerah tanpa melanggar kontrak.",
 bahas=dict(
  A="Kontrak dihormati, itu benar. Daerah asal yang kekurangan dokter tidak dibantu sama sekali selama lebih dari satu tahun.",
  B="Pulang lebih cepat terdengar paling berbakti, dan memang itu permintaan rumah sakit daerah. Kontrak yang mewajibkan masa kerja penuh ikut dikorbankan.",
  C="Ia membimbing dokter di daerah asal lewat daring, di luar jam kerja. Keahliannya sampai ke daerah, kontraknya tetap utuh.",
  D="Penghargaan medis mengharumkan nama Indonesia, dan itu buah dari kerja kerasnya. Kekurangan dokter di daerah tidak terbantu.",
  E="Komunitas budaya perantau menjaga identitas. Soal mengukurnya dengan profesi, bukan budaya."),
 kunci="C memakai keahlian profesinya untuk daerah asal, lewat celah yang dibuka kontrak.",
 analogi="Seperti kakak yang kuliah di kota lain: ia tidak bisa pulang tiap hari, tetapi ia mengajari adiknya mengerjakan PR lewat panggilan video setiap malam.",
 jebakan="B paling mirip dengan permintaan di cerita, sehingga terasa paling benar. Kalimat penentu menunjukkan ada jalan yang tidak mengorbankan kontrak."),

# ─────────── BAB 10 ───────────
'contoh-bab10': dict(
 pola=dict(A=2, B=2, C=4, E=6),
 tanya="Sikap anggota panitia yang baru sadar ada keponakannya di antara pelamar, dengan tenggat lusa.",
 langkah="Dua sisi: penilaian harus selesai tepat waktu, dan hubungan keluarga harus dinyatakan. Kunci menuntaskan keduanya tanpa mengorbankan salah satunya.",
 bahas=dict(
  A="Melapor sudah benar. Berhenti menilai semua berkas membuat penilaian tidak selesai lusa, padahal hanya satu berkas yang bermasalah.",
  B="Mengundur tenggat membuat penilaian terlambat, padahal ketua meminta selesai lusa. Hubungan keluarga itu bisa dinyatakan hari ini juga tanpa mengundur apa pun.",
  C="Mengundurkan diri dari panitia terdengar paling bersih. Konflik kepentingannya hanya pada satu berkas, bukan seluruh seleksi.",
  D="Hubungan dinyatakan, berkas keponakan dilepas, berkas lain dinilai. Tenggat aman, pedoman ditaati.",
  E="Mengisi formulir pernyataan itu rapi. Tapi ia tetap memegang berkas keponakannya."),
 kunci="D menyatakan hubungan keluarga, melepas berkas yang bermasalah, dan tetap menyelesaikan tugas tepat waktu.",
 analogi="Seperti wasit pertandingan antarkelas yang adiknya ikut bermain: ia meminta wasit lain memimpin laga kelas adiknya, lalu tetap memimpin laga-laga lain.",
 jebakan="C terlihat paling berintegritas karena pergi sepenuhnya. Ukuran pedoman hanya meminta hubungan itu dinyatakan dan berkas dilepas."),

'Integritas aparatur.1': dict(
 pola=dict(A=4, B=2, C=6, E=3),
 tanya="Nilai yang tercermin dari analis yang memperbaiki laporan dan mencatat revisinya.",
 langkah="Kalimat penentu merinci tindakannya: angka diperbaiki, lalu catatan revisi menyebut halaman, angka lama, dan alasan. Nilai yang dicari harus mencakup pengakuan dan jejak yang dapat dilacak.",
 bahas=dict(
  A="Kejujuran dekat sekali. Tapi jujur saja tidak menjelaskan mengapa ia menulis catatan revisi selengkap itu.",
  B="Teliti, ya, angkanya ketemu dan diperbaiki. Catatan revisinya tidak tercakup.",
  C="Catatan perubahan memang memenuhi aturan tata naskah. Pilihan ini berhenti pada kerapian administrasi.",
  D="Kekeliruan diakui, dibetulkan, dan jejaknya bisa dilacak siapa pun. Seluruh tindakan analis tercakup.",
  E="Kepercayaan publik adalah buah dari laporan yang benar. Nilai di balik tindakannya belum disebut."),
 kunci="D mencakup pengakuan kekeliruan, perbaikan, dan jejak revisi yang dapat dilacak.",
 analogi="Seperti kasir yang salah memberi kembalian: ia mengembalikan selisihnya dan menulis di buku kas berapa yang keliru dan kenapa, supaya bisa dicek bos besok.",
 jebakan="B terasa pas karena soal menyebut salah hitung. Baca ulang kalimat terakhirnya: catatan revisi itu yang membedakan."),

'Integritas aparatur.2': dict(
 pola=dict(B=2, C=7, D=5, E=6),
 tanya="Sikap terhadap parsel tanpa nama yang muncul sehari setelah kontrak ditandatangani.",
 langkah="Fakta pertama: parsel tidak bisa ditolak atau dikembalikan. Kalimat penentu menambah bukti: kartunya berterima kasih atas kerja sama. Hubungannya dengan jabatan jelas, sehingga jalannya adalah laporan.",
 bahas=dict(
  A="Parsel tetap tersegel, bukti dipotret, lalu dilaporkan ke KPK. Pemberian yang sudah telanjur sampai diselesaikan lewat jalan yang diatur undang-undang.",
  B="Mencari pengirim dulu terdengar hati-hati, tetapi kartu itu sudah cukup menunjukkan hubungannya dengan kontrak. Menunda laporan tidak menolong siapa pun.",
  C="Atasan perlu tahu, itu wajar. Tapi kewajiban melapor ada pada penerima, bukan diserahkan ke pimpinan unit untuk diputuskan.",
  D="Tekad agar penilaian tidak terpengaruh itu baik. Parselnya tetap tergeletak di meja tanpa dilaporkan.",
  E="Pengumuman di grup kantor membuat semua orang tahu. Parselnya belum dilaporkan ke mana pun."),
 kunci="A menjaga bukti dan melapor ke KPK, karena pemberian sudah sampai dan tidak bisa ditolak.",
 analogi="Seperti menemukan dompet di angkot tanpa kartu identitas: kamu tidak menyimpannya sambil menunggu pemiliknya muncul, kamu menyerahkannya ke pos polisi.",
 jebakan="B terdengar teliti. Kartu di pita parsel sudah menjawab pertanyaan yang ingin kamu cari."),

'Integritas aparatur.3': dict(
 pola=dict(A=3, B=4, D=2, E=6),
 tanya="Langkah yang mencerminkan objektivitas saat rekan sudah condong pada satu katering.",
 langkah="Dua sisi: tenggat minggu ini dan ukuran yang sama untuk semua penawaran. Kalimat penentu menunjuk sumber masalahnya: rekan menilai berdasarkan pengalaman pribadi.",
 bahas=dict(
  A="Kepercayaan kepala bagian adalah hasil kerja yang tepat waktu. Pilihan ini tidak menjelaskan cara menilainya.",
  B="Meminta rekan mundur terdengar tegas, tetapi itu bukan kewenanganmu, dan masalahnya bisa diatasi dengan ukuran yang sama.",
  C="Tolok ukur tertulis disepakati dulu, lalu kelima penawaran dinilai minggu ini. Selera pribadi rekan tidak lagi menentukan, dan tenggat aman.",
  D="Ukurannya sudah sama, bagus. Tapi keputusan mundur ke bulan depan, padahal kepala bagian minta minggu ini.",
  E="Berita acara ditandatangani tepat waktu, tetapi cara penilaiannya sendiri tidak tersentuh."),
 kunci="C menetralkan selera pribadi dengan ukuran tertulis dan tetap selesai minggu ini.",
 analogi="Seperti memilih ketua kelas: daftar syaratnya disepakati dulu di papan tulis, baru calon dinilai, supaya tidak ada yang memilih hanya karena teman dekat.",
 jebakan="D memakai kata pedoman persis. Tenggat minggu ini di cerita membuat pilihan itu baru separuh."),

'Integritas aparatur.4': dict(
 pola=dict(A=4, C=5, D=2, E=3),
 tanya="Nilai yang menjadi dasar respons terhadap permintaan merekam petugas untuk kampanye.",
 langkah="Kalimat penentu menunjuk tujuan rekaman: bahan kampanye. Penjelasan asas netralitas di soal memberi ukurannya: tidak memihak kepentingan di luar bangsa dan negara.",
 bahas=dict(
  A="Ramah itu perlu. Tapi kesopanan tidak menjelaskan mengapa permintaan itu harus ditolak.",
  B="Calon dilayani seperti warga lain, dan petugas tidak ikut dalam publikasi kampanyenya. Inilah tidak memihak.",
  C="Larangan berpihak dipatuhi, dan kata berpihak itu memang ada di soal. Tapi kepatuhan hanya menyebut aturannya ditaati; nilai yang dijaga adalah netralitas itu sendiri.",
  D="Pemeriksaan cepat sesuai standar itu profesional. Permintaan perekaman belum dijawab.",
  E="Warga melihat puskesmas tidak condong adalah hasil dari sikap yang tepat, bukan dasarnya."),
 kunci="B menyebut nilai yang diminta pasal: melayani setara tanpa ikut dalam kepentingan kampanye.",
 analogi="Seperti wasit yang diminta berfoto bersama satu tim sebelum pertandingan: ia menyalami semua pemain dengan sopan, tetapi menolak berfoto untuk unggahan tim itu.",
 jebakan="C hampir sama dengan kunci. Yang ditanya nilai dasarnya, dan nilai itu sudah dinamai di soal."),

'Integritas aparatur.5': dict(
 pola=dict(A=5, B=4, C=6, D=7),
 tanya="Sikap petugas verifikasi atas nota bernomor seri sama dari toko yang sudah tutup.",
 langkah="Kalimat penentu menutup alasan menunda: nota sudah diperiksa dua kali bersama bendahara. Pedoman memberi jalannya: lapor beserta bukti kepada pimpinan yang berwenang.",
 bahas=dict(
  A="Ini saran rekan senior yang ditulis ulang. Nama unit terjaga, temuan kecurangannya tidak.",
  B="Memahami pelindungan pelapor itu bijak. Tapi laporannya sendiri belum dibuat.",
  C="Memeriksa ulang terdengar teliti. Cerita sudah bilang pemeriksaan dua kali selesai. Menunda lagi hanya memberi waktu bagi masalah.",
  D="Kepala seksi bukan pimpinan yang ditunjuk pedoman, dan memeriksa pegawai yang diduga adalah tugas pihak yang berwenang.",
  E="Bukti diamankan, laporan masuk lewat kanal resmi yang menjaga kerahasiaan. Pedoman dijalankan."),
 kunci="E melapor dengan bukti lewat jalur resmi, karena pemeriksaan sudah cukup.",
 analogi="Seperti menemukan kebocoran pipa gas di sekolah: setelah kamu cium dua kali dan yakin, kamu melapor ke petugas, bukan menunggu sampai benar-benar meledak.",
 jebakan="C terlihat paling hati-hati. Kalimat dua kali bersama bendahara menutup alasan untuk menunda."),
}
