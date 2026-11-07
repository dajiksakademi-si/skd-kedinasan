"""Pembahasan siswa Kelompok 1 (contoh Bab 5-7 + latihan Bab 5-7). Kunci = 'contoh-babNN' atau 'Tempat.n'.
Field: pola (opsional: nomor nama kesalahan Bab 4 per huruf, menimpa kode pertama), tanya (yang sebenarnya ditanya), langkah (cara cepat), bahas (per huruf; nama kesalahan diambil dari kode soal),
kunci (alasan satu kalimat), analogi, jebakan. Gaya guru di meja belajar; bebas istilah dapur."""

BAHAS = {
# ─────────── BAB 5 ───────────
'contoh-bab05': dict(
 pola=dict(C=2),
 tanya="Nilai apa yang menjelaskan keputusan sekolah, diukur dengan arah sila pertama dan sila kedua serta dua permintaan orang tua.",
 langkah="Garis bawahi dua permintaan itu. Yang pertama soal hak beribadah sesuai kepercayaan, yang kedua soal tidak merendahkan keyakinan lain. Kunci harus menjawab keduanya.",
 bahas=dict(
  A="Sekolah memang tertib, tetapi ketertiban bukan alasan sekolah membagi kegiatan. Kamu baru melihat kulitnya: jadwal yang rapi.",
  B="Netral terdengar dekat sekali. Tapi tidak memihak belum tentu menjaga martabat. Sekolah di cerita berbuat lebih dari diam di tengah: ia menyusun pedoman supaya tidak ada yang direndahkan.",
  C="Bagian pertama cerita terjawab, anak penghayat dibina sesuai kepercayaannya. Permintaan kedua, jaminan tidak ada materi yang merendahkan, tertinggal.",
  D="Hak berkeyakinan dijalankan, dan martabat pemeluk lain dijaga. Dua permintaan orang tua masuk utuh.",
  E="Siswa saling membantu? Cerita tidak menyebut itu sama sekali. Kamu menambahkan adegan sendiri."),
 kunci="D menjawab kedua permintaan itu: kebebasan menjalankan keyakinan dan kewajiban menjaga martabat orang lain.",
 analogi="Seperti dapur bersama di kos: tiap orang boleh memasak menurut seleranya, asal tidak membuat penghuni lain terganggu oleh baunya.",
 jebakan="B dan C terdengar adil. Tanyakan pada keduanya: di mana jaminan bahwa tidak ada materi yang merendahkan keyakinan lain?"),

'Pancasila.1': dict(
 pola=dict(B=6),
 tanya="Langkah panitia pada rapat pekan ini, yaitu saat pasal demi pasal mulai dibahas.",
 langkah="Lingkari kata “pekan ini” dan “isi pasal”. Kutipan Pancasila di pembuka sudah ada, jadi yang dicari adalah cara memakai Pancasila pada isi.",
 bahas=dict(
  A="Setiap ketentuan ditimbang dengan nilai kelima sila. Inilah arti sumber segala sumber hukum di meja pembahasan pasal.",
  B="Menambah kutipan lagi? Bagian pembuka sudah mengutip Pancasila. Kutipan di penjelasan tidak menjamin isi pasalnya sejalan.",
  C="Sosialisasi itu baik, tetapi baru terjadi setelah perda disahkan. Rapat pekan ini masih membahas pasal.",
  D="Membandingkan dengan perda kota lain berguna untuk teknis penulisan. Ukurannya keliru: yang diminta undang-undang adalah nilai Pancasila, bukan perda tetangga.",
  E="Jadwal yang rapi membuat rapat lancar. Isi pasalnya belum tersentuh sedikit pun."),
 kunci="A memakai Pancasila sebagai ukuran isi ketentuan, tepat pada tahap pasal sedang dibahas.",
 analogi="Seperti juri lomba masak: memasang foto resep di dinding tidak berguna kalau rasa tiap masakan tidak dicicipi satu per satu.",
 jebakan="B memakai kata Pancasila paling banyak, dan justru itu yang memikat. Kalimat penentunya sudah bilang kutipan itu ada."),

'Pancasila.2': dict(
 tanya="Penerapan makna peristiwa 1 Juni dalam cara tim memutuskan program, bukan dalam cara tim memperingatinya.",
 langkah="Baca kalimat “Kini mereka ingin peristiwa itu juga terasa dalam cara mereka memutuskan program.” Pilihan yang tidak menyentuh keputusan program langsung tersisih.",
 bahas=dict(
  A="Peringatan yang lebih meriah tetap peringatan. Cerita sudah bilang tim rutin memperingatinya, dan yang mereka cari sekarang adalah hal lain.",
  B="Kajian sejarah rumusan sila menarik untuk kelas sejarah. Soal meminta penerapan dalam keputusan program, bukan pengetahuan.",
  C="Prinsip kebangsaan memang ada di pidato 1 Juni, tetapi itu baru satu prinsip, dan sekadar jadi tema besar. Lima sila yang diperkenalkan hari itu tidak dipakai menilai apa pun.",
  D="Usulan program diuji dengan kelima sila sebelum ditetapkan. Peristiwa 1 Juni hadir di tempat yang diminta: saat keputusan diambil.",
  E="Kebanggaan warga tumbuh, dan itu hasil yang bagus. Tapi lomba antardusun tidak mengubah cara tim memutuskan program."),
 kunci="D membawa Pancasila ke dalam keputusan program, sesuai keinginan tim yang tertulis di soal.",
 analogi="Seperti ulang tahun pernikahan: kue dan foto setiap tahun itu manis, tetapi janji nikah baru terasa ketika dipakai saat bertengkar dan mengambil keputusan bersama.",
 jebakan="A dan E paling akrab dengan kegiatan 1 Juni yang biasa kamu lihat. Rasa akrab itu yang menjebak."),

'Pancasila.3': dict(
 tanya="Hubungan sila kedua dan sila kelima dalam kasus layanan buku elektronik.",
 langkah="Soal hubungan menuntut dua hal disebut dan dihubungkan. Lalu pegang kalimat penentu: penghalangnya adalah cara layanan disediakan, bukan keanggotaan.",
 bahas=dict(
  A="Manfaat yang merata memang tujuan akhirnya. Soal bertanya bagaimana dua sila itu berhubungan, dan pilihan ini melompat langsung ke buahnya tanpa menyebut apa yang perlu diubah.",
  B="Arahnya terbalik. Sila kedua yang mendasari, sila kelima yang dijalankan, bukan sebaliknya.",
  C="Ketertiban peminjaman tidak dipersoalkan siapa pun di cerita. Pilihan ini sibuk dengan tata tertib.",
  D="Ini justru cara berpikir yang membuat layanan gagal. Syarat yang sama sudah diterapkan, dan dua kelompok warga tetap tidak bisa membaca.",
  E="Martabat manusia menjadi dasar, lalu layanan disesuaikan dengan kebutuhan warga. Dua sila tersambung, dan masalah di cerita tersentuh."),
 kunci="E menyambungkan dua sila dengan arah yang benar dan menjawab penghalang yang ditulis soal.",
 analogi="Seperti tangga dan bidang miring di depan kantor: semua orang boleh masuk, tetapi pengguna kursi roda baru benar-benar bisa masuk kalau jalannya disesuaikan.",
 jebakan="D memakai kata persamaan derajat yang terdengar luhur. Cek ke cerita: syarat yang sama itulah yang membuat warga tertinggal."),

'Pancasila.4': dict(
 pola=dict(C=2),
 tanya="Rancangan acara yang paling tepat memperlihatkan makna persatuan menurut sila ketiga, dengan dua permintaan pengurus dan satu usul yang sudah ditolak.",
 langkah="Ada dua sisi: tradisi tiap daerah tetap tampil, dan rasa satu bangsa tumbuh. Kalimat penentunya menutup jalan peleburan.",
 bahas=dict(
  A="Lomba memacu mutu penampilan. Pertanyaannya makna persatuan, dan lomba justru menonjolkan persaingan antardaerah.",
  B="Ragam tradisi tetap tampil, dan arahnya kebanggaan sebagai orang Indonesia. Dua permintaan pengurus terjawab.",
  C="Asrama Sulawesi pasti senang. Asrama Kalimantan belum: rasa satu bangsa tidak disebut di sini.",
  D="Usul ini sudah ditolak panitia di cerita. Meleburkan tarian adalah penyatuan yang menghapus ciri, bukan persatuan.",
  E="Pengetahuan peserta bertambah, dan itu hasil yang baik dari acara. Makna persatuannya belum tampak."),
 kunci="B menampung keragaman tradisi dan mengarahkannya pada satu kebangsaan, tanpa meleburkan ciri daerah.",
 analogi="Seperti paduan suara: tiap suara tetap sopran, alto, tenor, atau bas, tetapi semuanya menyanyikan lagu yang sama.",
 jebakan="D terdengar paling bersatu karena semua tarian jadi satu. Baca lagi kalimat panitia yang menolak usul itu."),

'Pancasila.5': dict(
 pola=dict(B=2, E=6),
 tanya="Pengaturan jadwal lapangan yang paling sesuai arah sila keempat.",
 langkah="Sila keempat bicara musyawarah. Kalimat penentunya bilang jadwal selama ini disusun tanpa mempertemukan pengguna. Kunci pasti mengubah hal itu.",
 bahas=dict(
  A="Siapa cepat dia dapat memang terdengar adil. Tapi tetap tidak ada yang dipertemukan, dan yang lambat mendaftar bisa terus kalah.",
  B="Waktu dibagi rata, lalu benturan diserahkan ke pengguna. Separuh urusan diselesaikan, separuh lagi dilepas begitu saja tanpa forum.",
  C="Wakil tiap kelompok diundang dan menyepakati pembagian secara terbuka. Inilah yang hilang dari cara lama.",
  D="Suara terbanyak itu cara demokratis juga. Tapi kelompok kecil sudah meminta agar tidak terus kalah, dan pilihan ini membuat mereka kalah lagi.",
  E="Cara petugas yang sudah berjalan bertahun-tahun adalah sumber masalahnya. Melanjutkannya tidak menyelesaikan apa pun."),
 kunci="C mempertemukan para pengguna untuk bermusyawarah, langsung menjawab kalimat penentu.",
 analogi="Seperti mengatur giliran pakai televisi di rumah: lebih awet damainya kalau semua anggota keluarga duduk bersama daripada ayah menetapkan sendiri.",
 jebakan="D terdengar demokratis karena ada suara terbanyak. Musyawarah di sila keempat bukan sekadar menghitung kepala."),

# ─────────── BAB 6 ───────────
'contoh-bab06': dict(
 tanya="Upaya hukum yang tepat untuk peraturan gubernur yang dianggap bertentangan dengan undang-undang di atasnya.",
 langkah="Tanyakan dulu: yang digugat itu undang-undang atau peraturan di bawahnya? Kalimat penentunya menjawab: peraturan gubernurnya.",
 bahas=dict(
  A="Mahkamah Konstitusi menguji undang-undang terhadap UUD. Paguyuban tidak mempersoalkan undang-undangnya, jadi pintunya salah.",
  B="DPRD memang mengawasi, tetapi pengawasan politik tidak membatalkan peraturan. Yang diminta adalah upaya hukum.",
  C="Mahkamah Agung berwenang menguji peraturan di bawah undang-undang terhadap undang-undang. Peraturan gubernur masuk ke sini.",
  D="Keberatan kepada gubernur sah dan sopan. Tetapi itu permohonan, bukan upaya hukum yang bisa membatalkan peraturan.",
  E="Siaran pers membuat masalahnya dikenal orang. Peraturannya tetap berlaku."),
 kunci="C membawa peraturan gubernur ke lembaga yang berwenang mengujinya terhadap undang-undang.",
 analogi="Seperti protes soal nilai rapor: kalau yang keliru nilai harianmu, kamu menemui guru mapel, bukan kepala dinas yang membuat kurikulum.",
 jebakan="A menyebut pengujian, kata yang paling akrab dengan Mahkamah Konstitusi. Cek dulu apa yang diuji."),

'UUD 1945 dan Lembaga Negara.1': dict(
 pola=dict(A=5, E=8),
 tanya="Syarat yang lebih dahulu harus dipenuhi agar usul perubahan pasal bisa diagendakan.",
 langkah="Hitung yang sudah ada dan yang belum. Naskah dan alasan sudah lengkap. Dukungan baru seperlima, padahal Pasal 37 ayat (1) meminta sepertiga.",
 bahas=dict(
  A="Naskah yang menunjuk pasal dan alasannya sudah ada di cerita. Menyempurnakannya lagi tidak menambah dukungan.",
  B="Usul tertulis dengan alasan, didukung minimal sepertiga anggota. Kekurangan di cerita ada pada dukungan, dan pilihan ini menutupnya.",
  C="Kuorum dua pertiga memang syarat sidang perubahan. Tapi itu tahap sidang, sedangkan usulnya belum bisa diagendakan.",
  D="Dukungan publik bagus untuk suasana. Yang dihitung Pasal 37 adalah anggota MPR, bukan warga.",
  E="Wewenang MPR mengubah UUD itu benar bunyinya, dan memang dikutip soal. Wewenang itu baru dipakai setelah syarat usul terpenuhi."),
 kunci="B memenuhi syarat sepertiga yang belum tercapai, sesuai kalimat penentu.",
 analogi="Seperti mengajukan proposal kegiatan OSIS: berkasnya sudah rapi, tetapi tanda tangan dukungan kelas belum cukup. Yang dikejar dulu tanda tangannya.",
 jebakan="C dan E benar isinya dan menyebut sidang. Soal bertanya apa yang lebih dahulu."),

'UUD 1945 dan Lembaga Negara.2': dict(
 pola=dict(C=2),
 tanya="Hubungan peran DPD dan DPR untuk rancangan yang masih dibahas dan belum disetujui.",
 langkah="Soal hubungan: dua lembaga harus muncul. Kalimat penentunya memberi waktu: masih pembahasan. Peran DPD sesudah undang-undang jadi belum relevan.",
 bahas=dict(
  A="Pertimbangan atas rancangan APBN dan pajak memang tugas DPD, tetapi itu rancangan lain. Rancangan perimbangan keuangan diperlakukan berbeda.",
  B="Mengawasi pelaksanaan undang-undang terjadi setelah undang-undang itu berlaku. Rancangan ini belum disetujui.",
  C="Benar, persetujuan diputuskan DPR dan Presiden. Tapi peran DPD yang ditanyakan anggota DPD hilang dari pilihan ini.",
  D="DPD ikut membahas, lalu persetujuan diputuskan DPR bersama Presiden. Dua peran, dua lembaga, dalam tahap yang sedang berjalan.",
  E="Aspirasi daerah lebih terwakili, itu manfaatnya. Hubungan peran kedua lembaga belum dijelaskan."),
 kunci="D menyebut peran DPD dan DPR beserta urutannya pada tahap pembahasan.",
 analogi="Seperti panitia acara sekolah: perwakilan kelas ikut rapat membahas rencana, tetapi tanda tangan persetujuan tetap ada di kepala sekolah dan ketua OSIS.",
 jebakan="C benar menurut UUD, sehingga terasa aman. Soal bertanya hubungan DPD dan DPR, dan DPD tidak ada di dalamnya."),

'UUD 1945 dan Lembaga Negara.3': dict(
 pola=dict(D=9),
 tanya="Langkah kelembagaan yang lebih dahulu, ketika belum ada pemeriksaan apa pun.",
 langkah="Kata “belum ada pemeriksaan” memberi urutan. Pasal 23E menyebut badan pemeriksa dulu, baru lembaga perwakilan yang menerima hasilnya.",
 bahas=dict(
  A="BPK memeriksa, lalu hasilnya diserahkan ke DPRD. Urutan Pasal 23E dijalankan dari langkah pertama.",
  B="DPRD menerima hasil BPK, itu benar. Tapi hasilnya belum ada karena pemeriksaan belum dimulai.",
  C="Inspektorat memang pengawas internal pemerintah daerah. Pasal yang dikutip soal meminta badan yang bebas dan mandiri, dan inspektorat adalah bagian dari pemerintah daerah itu sendiri.",
  D="Penyelidikan aparat penegak hukum bisa saja terjadi. Soal tidak menyebut ada dugaan pidana, hanya ketidaktertiban yang diberitakan.",
  E="Laporan di laman resmi menambah keterbukaan. Pemeriksaan tetap belum ada."),
 kunci="A memulai dari pemeriksaan oleh BPK, langkah yang belum terjadi menurut kalimat penentu.",
 analogi="Seperti ke dokter: hasil laboratorium baru bisa dibaca dokter setelah darahmu diambil dan diperiksa.",
 jebakan="B menyebut BPK dan DPRD sehingga terlihat lengkap. Lihat kata pertamanya: menerima hasil yang belum ada."),

'UUD 1945 dan Lembaga Negara.4': dict(
 tanya="Saluran untuk melaporkan perilaku hakim, bukan putusannya.",
 langkah="Coret semua pilihan yang mengubah atau memeriksa putusan. Kalimat penentunya jelas: warga menerima putusan dan tidak akan banding.",
 bahas=dict(
  A="Kasasi menguji putusan. Warga itu tidak mempersoalkan putusan.",
  B="DPR mengawasi undang-undang, bukan perilaku seorang hakim. Jenis jawabannya keliru.",
  C="Menguji undang-undang terhadap UUD tidak ada hubungannya dengan unggahan hakim.",
  D="Banding memeriksa ulang perkara. Warga sudah bilang tidak berniat banding.",
  E="Komisi Yudisial menjaga perilaku hakim, dan pilihan ini menegaskan vonisnya tidak dicampuri. Persis yang dicari warga."),
 kunci="E membawa laporan ke lembaga yang menjaga perilaku hakim, tanpa menyentuh putusan yang sudah diterima.",
 analogi="Seperti mengeluhkan sikap kasar pelayan restoran: kamu melapor ke manajer, bukan meminta makananmu dimasak ulang.",
 jebakan="A dan D menyebut lembaga peradilan yang lebih tinggi, terasa lebih berwibawa. Yang dipersoalkan perilaku, bukan perkara."),

'UUD 1945 dan Lembaga Negara.5': dict(
 pola=dict(B=2),
 tanya="Hubungan kedudukan Presiden dan DPR menurut Pasal 7C dan 7A, tanpa tata cara sidang.",
 langkah="Ada dua pasal, jadi kunci memuat dua arah: DPR tidak dapat dibubarkan, dan Presiden tidak dapat diberhentikan sembarangan.",
 bahas=dict(
  A="Kebijakan dibahas lebih cermat, itu hasil baik dari kedudukan yang seimbang. Kedudukannya sendiri belum disebut.",
  B="Pasal 7C sudah masuk. Pasal 7A, perlindungan bagi Presiden, tertinggal.",
  C="Dua pasal, dua arah perlindungan: DPR tidak bisa dibubarkan, Presiden hanya bisa diberhentikan dengan alasan dalam UUD.",
  D="Pembagian tugas eksekutif dan pengawas memang benar, tetapi bukan isi kedua pasal yang dikutip.",
  E="Ini tata cara pemberhentian, dan artikel sudah bilang tidak membahas tata cara."),
 kunci="C memuat isi kedua pasal dan menunjukkan kedudukan yang saling terlindungi.",
 analogi="Seperti dua pemain dalam satu tim yang sama-sama dikontrak pelatih: tidak ada yang bisa mengeluarkan yang lain sesuka hati.",
 jebakan="B mengulang bunyi Pasal 7C dengan fasih sehingga terasa lengkap. Hitung pasalnya: soal menyebut dua."),

# ─────────── BAB 7 ───────────
'contoh-bab07': dict(
 pola=dict(C=2),
 tanya="Tindakan moderator yang menghadapi dua jenis pesan berbeda: keberatan yang sah dan ajakan menghadang sopir.",
 langkah="Pisahkan dulu dua jenis pesan itu. Keberatan dengan hitungan ongkos adalah masukan yang wajib dicatat. Ajakan menghadang mengancam orang dari daerah lain.",
 bahas=dict(
  A="Keberatan tetap tampil, ajakan menghadang ditahan dan dilaporkan. Dua pesan diperlakukan sesuai sifatnya.",
  B="Mengunci kolom membuat acara terlihat tenang, seperti keinginan atasan. Masukan warga yang wajib dicatat ikut hilang.",
  C="Menjawab keberatan dengan data itu baik. Ajakan menghadang dibiarkan tayang.",
  D="Imbauan beretika enak dibaca, tetapi ajakan menghadang tetap ada di layar.",
  E="Filter kata kasar terdengar canggih. Ajakan menghadang bisa ditulis dengan kalimat yang sopan dan lolos dari filter."),
 kunci="A menjaga hak warga menyampaikan keberatan sambil menahan ajakan yang mengancam persatuan.",
 analogi="Seperti panitia rapat RT: usul yang keras tetap dicatat, tetapi orang yang mengajak merusak rumah tetangga dihentikan.",
 jebakan="C terlihat paling melayani warga. Tanyakan: ajakan menghadang tadi ke mana?"),

'NKRI dan Bhinneka Tunggal Ika.1': dict(
 tanya="Golongan perilaku anggota komunitas, diukur dengan dua sisi kesetiaan yang ditulis soal.",
 langkah="Soal sendiri memberi ukurannya: kuatnya dukungan dan kesediaan menerima koreksi. Kalimat penentu menutup tafsiran yang menyangkut suku atau daerah.",
 bahas=dict(
  A="Kebanggaan pada kelompok bisa sehat. Perilaku di cerita sudah lewat dari bangga: bukti diabaikan, penanya diolok.",
  B="Ia akrab dengan anggota dari berbagai daerah. Cerita sendiri menutup tafsiran ini.",
  C="Kesetiaan yang menolak bukti dan meremehkan orang lain. Dua sisi ukuran dalam soal dipakai, dan perilakunya terbaca tepat.",
  D="Loyal memang kata yang dipakai soal, tetapi pilihan ini hanya melihat sisi dukungan. Sisi kesediaan menerima koreksi hilang.",
  E="Memaksakan kehendak itu perilaku lain. Kalimat penentu bilang ia tidak memaksa siapa pun keluar."),
 kunci="C membaca perilaku itu dengan dua ukuran yang diberikan soal.",
 analogi="Seperti suporter yang membela timnya mati-matian, lalu tetap berteriak gol padahal wasit sudah menunjukkan rekaman bahwa bolanya keluar.",
 jebakan="D memakai kata yang paling mirip dengan soal. Ukuran kedua di soal sengaja ditulis agar pilihan ini gugur."),

'NKRI dan Bhinneka Tunggal Ika.2': dict(
 pola=dict(D=4),
 tanya="Makna ancaman dalam kasus tabel bantuan yang diubah.",
 langkah="Lingkari kata “angkanya diubah” dan “ajakan”. Ancamannya bukan sekadar kabar keliru, melainkan rekayasa yang punya tujuan.",
 bahas=dict(
  A="Kabar keliru karena lalai memeriksa? Cerita bilang angkanya diubah. Itu disengaja, bukan lalai.",
  B="Ketegangan antarwarga adalah akibat yang mungkin muncul. Yang ditanya intinya.",
  C="Pengaduan itu sah dan wajar bila memang ada dugaan. Kasus ini bukan pengaduan, melainkan data palsu yang disebar.",
  D="Ujaran kebencian dekat sekali, tetapi kata “tanpa data apa pun” keliru. Pelakunya justru memakai data yang dipalsukan.",
  E="Kebohongan yang dirancang untuk menyulut permusuhan. Ada kesengajaan, ada tujuan, sesuai cerita."),
 kunci="E menangkap dua ciri di cerita: data sengaja diubah, dan tujuannya memecah warga.",
 analogi="Seperti orang yang memotong rekaman percakapan temannya lalu menyebarkannya ke grup kelas: yang bahaya bukan rekamannya, melainkan niat memotongnya.",
 jebakan="D terdengar paling serius. Baca ujungnya: tanpa data apa pun, padahal cerita bilang ada tabel yang diubah."),

'NKRI dan Bhinneka Tunggal Ika.3': dict(
 pola=dict(D=6),
 tanya="Kebijakan pemerintah kabupaten soal jam layanan puskesmas pembantu.",
 langkah="Kalimat penentu memberi dua fakta: kabupaten berwenang, dan standar mutu sudah ada. Jadi kabupaten tidak perlu menunggu siapa pun.",
 bahas=dict(
  A="Seragam dengan kabupaten lain justru mengabaikan kekhususan daerah yang diminta Pasal 18A.",
  B="Jam layanan digeser ke sore sesuai kebiasaan warga, lewat wewenang bupati, dengan mutu tetap sesuai standar.",
  C="Mengubah pembagian urusan lewat undang-undang adalah jalan panjang di tingkat pusat. Untuk jam layanan, kabupaten sudah punya wewenangnya sendiri.",
  D="Forum koordinasi terdengar bijak. Warga tetap tidak terlayani sampai forum tahunan berikutnya.",
  E="Pedoman teknis tidak diperlukan, karena standar mutunya sudah ditetapkan. Menunggu hanya menunda layanan."),
 kunci="B memakai wewenang yang sudah dimiliki kabupaten untuk menyesuaikan layanan dengan kekhususan warganya.",
 analogi="Seperti warung yang tahu pelanggannya pulang kerja malam: ia buka sampai malam tanpa menunggu izin pemilik mal di kota.",
 jebakan="D menyebut kekhususan daerah dan kebijakan pusat, persis kata-kata pasal. Panjang dan lengkap, tetapi tidak ada yang berubah besok pagi."),

'NKRI dan Bhinneka Tunggal Ika.4': dict(
 tanya="Langkah pengurus koperasi agar tiga keluarga baru terdata tanpa diskriminasi.",
 langkah="Kalimat penentu menunjuk sumber masalahnya: rumah ibadah agama mereka tidak ada di kampung itu. Kunci harus membuka jalan lain tanpa merusak cara lama yang tertib.",
 bahas=dict(
  A="Meja pendataan di kantor koperasi, di samping jalur yang sudah ada. Keluarga baru terdata, cara lama yang tertib tetap jalan.",
  B="Formulir daring membuka akses, tetapi jalur lama yang terbukti tertib malah dibuang. Separuh masalah diganti dengan masalah baru.",
  C="Spanduk ajakan rukun tidak mendata siapa pun.",
  D="Membacakan jaminan pasal terdengar resmi, dan kata-katanya sama dengan soal. Tiga keluarga itu tetap belum terdata.",
  E="Rasa canggung mereda itu buah yang baik. Pendataannya belum dilakukan."),
 kunci="A menambah jalur pendataan bagi yang tidak terjangkau, tanpa membuang cara lama yang sudah tertib.",
 analogi="Seperti gerbang sekolah yang hanya punya tangga: kamu tidak membongkar tangganya, cukup menambah jalur landai di sampingnya.",
 jebakan="B terlihat modern dan adil untuk semua. Cerita menyebut cara lama itu tertib. Tidak ada alasan membuangnya."),

'NKRI dan Bhinneka Tunggal Ika.5': dict(
 pola=dict(A=4, C=4),
 tanya="Golongan gerakan forum nelayan, dinilai dari cara yang mereka tempuh.",
 langkah="Kalimat penentu berisi daftar caranya: audiensi, kajian, uji materiil. Semuanya jalur konstitusional. Lalu ada penegasan sebagai bagian negara kesatuan.",
 bahas=dict(
  A="Separatisme ingin memisahkan wilayah. Forum ini menegaskan diri bagian dari negara kesatuan.",
  B="Radikalisme memakai paksaan. Forum ini menolak cara paksaan.",
  C="Primordialisme melekat pada kelompok sendiri secara berlebihan. Tuntutan kewenangan kabupaten lewat jalur resmi bukan itu.",
  D="Tuntutan kewenangan yang disalurkan lewat jalur konstitusional. Cara yang ditulis soal cocok satu per satu.",
  E="Otonomi daerah adalah sistemnya, hak yang diatur negara. Yang ditanya adalah gerakan forum, yaitu tuntutan mereka atas hak itu."),
 kunci="D menggolongkan gerakan itu dari caranya: menuntut kewenangan lewat jalur konstitusional.",
 analogi="Seperti siswa yang ingin jam istirahat lebih panjang: menulis surat ke kepala sekolah dan berdiskusi di rapat OSIS itu aspirasi, bukan pemberontakan.",
 jebakan="E terdengar paling positif dan dekat dengan kata kewenangan daerah. Otonomi adalah aturannya; yang dilakukan forum adalah menyuarakan tuntutan."),
}
