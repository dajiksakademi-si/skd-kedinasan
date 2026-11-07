// Paket 1 TKP — pembahasan soal 1–15, ditulis ulang setelah wording mentor (2026-10-27). Siswa versi hangat.
module.exports = {
  "1": {
    "reviu": [
      "Dilema: fitur unggah dari templat bisa memangkas kerja wali kelas yang mengetik ulang nilai satu per satu dan tetap salah ketik, tetapi wali kelas khawatir nilai sekelas salah masuk bila fitur itu dipakai.",
      "E menutup kedua sisi: fitur dipakai (sisi kinerja), tetapi diuji dulu di satu kelas dan hasilnya dicocokkan sebelum diperluas, sehingga kekhawatiran salah masuk terjawab dengan bukti. Imbangan TIK: sisi kinerja (memanfaatkan fitur yang sudah ada untuk mempercepat kerja) dengan pengecekan hasil.",
      "A=4 (S2, +J1): fitur dicoba dengan pengecekan, tetapi hanya untuk kelas yang sering salah ketik; wali kelas lain tetap mengetik ulang sampai larut. Mengulang frasa \"salah ketik\" dari soal. D=3 (S1): aman, tetapi manfaat fitur ditunda satu semester; rapor kali ini tetap diketik manual dengan risiko salah ketik yang sama. C=2: demi kenyamanan wali kelas, tidak ada perbaikan. B=1 (aktif-a): beban mengetik dilempar ke siswa; nilai dipegang pihak yang tidak berwenang.",
      "<b>Kunci vs A (poin 4):</b> A memakai fitur \"khusus kelas yang sering salah ketik\", padahal semua wali kelas mengetik ulang nilai satu per satu; E menguji di satu kelas lalu memperluasnya, jadi semua kelas ikut terbantu.<br>\n      <b>Kunci vs D (poin 3):</b> D \"menunda fitur unggah sampai semester depan\", padahal kekhawatiran \"nilai sekelas bisa salah masuk\" bisa dijawab sekarang lewat uji satu kelas; E mencoba sekarang dengan hasil yang dicocokkan."
    ],
    "siswa": {
      "tanya": "bayangkan para wali kelas di sekolahmu mengetik ulang nilai rapor satu per satu sampai larut, dan tetap saja ada yang salah ketik. Padahal aplikasi rapor punya fitur unggah dari templat. Kenapa tidak langsung dipakai? Karena wali kelas khawatir nilai satu kelas bisa salah masuk.",
      "opsi": {
        "E": "uji di satu kelas dulu, cocokkan dengan nilai aslinya, baru dipakai kelas lain. Wali kelas tidak perlu begadang lagi, dan rasa khawatir mereka dijawab dengan bukti, bukan janji.",
        "A": "mulai dari kelas yang paling sering salah memang masuk akal. Hanya saja wali kelas yang lain masih mengetik sampai larut, padahal fitur yang sama bisa menolong mereka.",
        "D": "hati-hati itu baik, cuma harganya mahal: satu semester lagi semua nilai diketik manual, dan salah ketiknya bisa terulang.",
        "C": "rekan jadi nyaman, kerja tetap lambat. Salah ketiknya pun ikut bertahan.",
        "B": "kasihan siswanya. Nilai rapor itu urusan wali kelas, bukan pekerjaan yang pantas dititipkan ke murid."
      },
      "kunci": "E memakai teknologi yang sudah tersedia untuk mempercepat kerja, dengan hasil yang dicek dulu sebelum dipakai lebih luas.",
      "analogi": "kalau di rumah baru ada mesin cuci, kamu tidak langsung memasukkan semua baju putih dan berwarna. Kamu coba satu cucian dulu, lihat hasilnya, baru dipakai untuk semuanya.",
      "jebakan": "pilihan D paling sering dipilih orang yang takut salah. Padahal di cerita, cara lama pun sudah menghasilkan salah ketik. Menunda tidak membuatnya lebih aman.",
      "tips": "teknologi yang sudah ada di kantor biasanya dipakai, bukan dihindari. Yang membuatnya aman adalah uji kecil dan pengecekan hasil."
    }
  },
  "2": {
    "reviu": [
      "Dilema: warga butuh arsip sebelum sidang lusa, tetapi antrean yang Anda atur adalah wujud keadilan layanan, dan dua pemohon lain juga bertenggat minggu ini.",
      "C menutup kedua sisi: yang tenggatnya paling dekat didahulukan, dengan ukuran yang sama untuk semua pemohon mendesak (bukti, bukan pengakuan). Petugas berwenang mengatur antrean (disebut di soal).",
      "E=4 (S5): cakupan sudah luas (siapa pun yang bertenggat), tetapi dasarnya pengakuan tanpa bukti; ruginya nanti, saat jalur cepat dipakai siapa saja yang mengaku. A=3 (S2): bukti diminta, tetapi hanya untuk satu warga; dua pemohon lain yang juga bertenggat terlewati sekarang. B=2+J1: patuh prosedur tanpa menimbang tenggat, mengulang kata soal. D=1: dibahas bulan depan, melewati sidang lusa.",
      "<b>Kunci vs E (poin 4):</b> E mendahulukan \"siapa pun yang mengaku punya tenggat dekat\", padahal warga itu \"hanya menyebut jadwal sidangnya secara lisan\"; C meminta bukti tenggat dulu, jadi urutan baru bisa dipertanggungjawabkan.<br>\n      <b>Kunci vs A (poin 3):</b> A \"mendahulukan arsip warga itu hari ini\" saja, sehingga dua pemohon lain yang juga bertenggat dilangkahi; C mengurutkan semua pemohon mendesak dari tenggat terdekat."
    ],
    "siswa": {
      "tanya": "kamu yang mengatur antrean pencarian arsip. Lalu datang warga yang butuh salinan arsip tanah untuk sidang lusa, padahal pencarian biasanya makan tiga hari kerja. Ia cuma bilang secara lisan, dan ternyata dua pemohon lain juga dikejar tenggat minggu ini.",
      "opsi": {
        "C": "semua yang terdesak diminta bukti tenggatnya, lalu yang paling dekat didahulukan. Kalau sidang lusa itu terbukti, warga tadi tetap bisa paling dulu, dan dua pemohon lain tidak merasa dilangkahi.",
        "E": "niatnya adil untuk semua yang terdesak. Masalahnya, cukup dengan mengaku. Besok semua orang bisa bilang sedang terdesak.",
        "A": "surat panggilan sidang perlu diminta, setuju. Lalu bagaimana dengan dua pemohon lain yang juga dikejar waktu?",
        "B": "urutan dijaga, sidang lusa dilupakan. Arsipnya bisa baru ketemu setelah sidang lewat.",
        "D": "rapat bulan depan sudah terlambat jauh. Sidangnya lusa."
      },
      "kunci": "C mendahulukan yang paling mendesak dengan satu ukuran yang sama untuk semua pemohon, yaitu bukti.",
      "analogi": "di IGD, pasien didahulukan menurut hasil pemeriksaan, bukan menurut siapa yang paling keras bilang sakit. Aturan itu berlaku untuk setiap pasien yang datang.",
      "jebakan": "kata \"antrean\" dan \"tiga hari kerja\" di pilihan B diambil persis dari soal, jadi terasa benar. Hitung saja: tiga hari kerja dari sekarang sudah lewat dari lusa.",
      "tips": "begitu ada lebih dari satu orang yang sama-sama terdesak, pakai satu ukuran untuk semuanya."
    }
  },
  "3": {
    "reviu": [
      "Dilema: rekap harus terkirim siang ini, tetapi data satu kelas kosong, dan izin bermalam akhir pekan ditetapkan dari rekap itu.",
      "A menutup kedua sisi: sumber data pengganti yang sah (daftar hadir manual, disebut di soal) diambil dari dosen kelas itu, yang sebentar lagi selesai mengajar, sehingga data lengkap sebelum rekap dikirim. Cakupannya pas: hanya kelas yang kosong.",
      "D=4 (S1): rekap terkirim tepat waktu dan daftar hadir kelas itu disusulkan dari sumber yang sah, tetapi susulannya datang sesudah rekap dipakai menetapkan izin bermalam; ruginya nanti, saat taruna kelas itu sudah diputus dengan data kosong. E=3 (S2, +J4): jauh lebih luas dari yang perlu (tanda tangan seluruh dosen, rekap disusun dari awal); rekap terlambat sekarang. C=2: ikut saran senior, taruna satu kelas tercatat tidak hadir. B=1: menunggu perbaikan mesin tanpa batas waktu, melewati tenggat.",
      "<b>Kunci vs D (poin 4):</b> D mengirim rekap lebih dulu, \"lalu menyusulkan daftar hadir kelas itu dari dosennya\", padahal \"izin bermalam akhir pekan ditetapkan dari rekap itu\", jadi susulannya datang terlambat; A melengkapi data sebelum rekap dipakai.<br>\n      <b>Kunci vs E (poin 3):</b> E meminta \"seluruh dosen menandatangani daftar hadir manual\" lalu menyusun rekap dari awal, pekerjaan yang tidak selesai siang ini; A cukup mengambil daftar dari dosen kelas yang datanya kosong."
    ],
    "siswa": {
      "tanya": "rekap kehadiran taruna harus kamu kirim siang ini, dan izin bermalam akhir pekan diputuskan dari rekap itu. Masalahnya, mesin presensi kosong untuk satu kelas. Untungnya dosen kelas itu mengisi daftar hadir manual, dan sebentar lagi ia selesai mengajar.",
      "opsi": {
        "A": "cukup tunggu sebentar, minta daftar hadir manualnya, lalu lengkapi rekap sebelum dikirim. Lubangnya ditutup tepat di kelas yang kosong, dan rekap tetap terkirim siang ini.",
        "D": "tepat waktu, dan daftar hadirnya pun diambil dari dosen yang benar. Hanya urutannya terbalik: rekap sudah dipakai memutuskan izin bermalam sebelum susulan itu datang. Taruna kelas itu bisa kehilangan izin karena data yang sebenarnya ada.",
        "E": "rapi sekali, tapi kebesaran. Mengumpulkan tanda tangan semua dosen lalu menyusun dari awal tidak akan selesai siang ini.",
        "C": "saran senior terasa aman, padahal satu kelas taruna akan tercatat tidak hadir. Dosennya sendiri mencatat mereka hadir.",
        "B": "menunggu mesin diperbaiki, entah kapan. Rekapnya bisa tidak terkirim sama sekali hari ini."
      },
      "kunci": "A mengisi data yang kosong dari sumber yang sah, sebelum rekap itu dipakai untuk memutuskan izin.",
      "analogi": "ada satu halaman kosong di rapor yang mau dibagikan. Kamu minta halaman itu ke guru yang memegangnya, bukan membagikan dulu lalu menyusulkan, dan bukan mencetak ulang semua rapor.",
      "jebakan": "D tampak lengkap: tepat waktu, sumber datanya juga dosen kelas itu. Ia gugur karena urutan, sebab izin bermalam keburu diputuskan sebelum data susulan masuk.",
      "tips": "perhatikan kapan sebuah data dipakai. Data yang langsung dipakai untuk memutuskan sesuatu harus lengkap sebelum dikirim."
    }
  },
  "4": {
    "reviu": [
      "Dilema: terminal butuh hampir semua petugas piket menjelang Natal, tetapi petugas punya hari besar keagamaan yang berbeda dan kebutuhan libur yang tidak sama.",
      "B menutup kedua sisi: kebutuhan tiap petugas ditanyakan langsung (tidak menebak, berlaku untuk semua agama), lalu dipakai sebagai dasar tukar piket sehingga terminal tetap terisi. Bentuknya cara yang dipakai ulang di hari besar berikutnya.",
      "C=4 (S4): libur sesuai kebutuhan dua petugas dan piketnya terisi, tetapi pengaturan berhenti di Natal tahun ini; Idulfitri nanti mulai dari nol (rugi nanti). E=3 (S5, +J1): berlaku untuk semua agama, tetapi jatah \"sepekan\" ditetapkan tanpa ditanyakan, bertentangan dengan pernyataan dua petugas; rugi sekarang (libur yang tidak diminta, piket kekurangan orang). D=2: mayoritas menang, abai pada yang bersangkutan. A=1 (aktif-d): berkorban buta, penyusunan piket tidak selesai.",
      "<b>Kunci vs C (poin 4):</b> C meliburkan keduanya \"malam dan hari Natal, lalu meminta rekan lain mengisi piketnya\", padahal soal menyebut \"giliran rekan lain merayakan Idulfitri\"; B menanyakan kebutuhan tiap petugas, jadi tukar piket berlaku juga untuk hari besar berikutnya.<br>\n      <b>Kunci vs E (poin 3):</b> E menetapkan \"jatah libur sepekan\" tanpa bertanya, padahal keduanya hanya butuh libur malam dan hari Natal; B menyusun tukar piket dari kebutuhan yang sudah ditanyakan."
    ],
    "catatan": [
      "Catatan pilot (panduan 3v4): sumbu poin 3/4 di blueprint dibalik (S4 ke poin 4) supaya opsi yang ruginya nanti berada di poin 4."
    ],
    "siswa": {
      "tanya": "menjelang Natal, terminal ramai dan hampir semua petugas piketmu dibutuhkan. Rekan-rekan mengusulkan dua petugas yang merayakan Natal libur sepekan, padahal keduanya sendiri cuma butuh malam dan hari Natal. Lalu ingat, beberapa bulan lagi giliran rekan lain merayakan Idulfitri.",
      "opsi": {
        "B": "tanyakan dulu ke setiap petugas apa yang mereka butuhkan di hari besarnya, lalu susun tukar piket dari jawaban itu. Terminal tetap terjaga, dan saat Idulfitri tiba, caranya sudah siap.",
        "C": "dua petugas itu libur persis sesuai kebutuhannya, dan piketnya pun terisi. Rapi untuk Natal tahun ini. Lalu bagaimana saat Idulfitri tiba? Kamu mengatur dari nol lagi, karena tidak ada cara yang disiapkan.",
        "E": "niatnya adil untuk semua agama, dan itu patut dihargai. Sayangnya lamanya libur ditebak sendiri. Dua petugas itu tidak minta sepekan.",
        "D": "suara terbanyak terdengar demokratis. Masalahnya, yang paling tahu kebutuhan dua petugas itu adalah mereka sendiri, dan mereka sudah bilang.",
        "A": "mulia, kamu mau menanggung semua piket malam Natal. Jadwal piketnya sendiri tetap tidak tersusun, dan kamu bisa tumbang kelelahan."
      },
      "kunci": "B bertanya dulu ke orang yang bersangkutan, lalu menyusun cara tukar piket yang bisa dipakai di setiap hari besar.",
      "analogi": "sebelum memesan makanan untuk acara kantor, kamu menanyakan pantangan tiap orang, bukan menebak sendiri. Daftarnya kamu simpan untuk acara berikutnya.",
      "jebakan": "kata \"tiap agama\" membuat E terdengar paling adil. Bandingkan dengan permintaan dua petugas itu: mereka cuma minta malam dan hari Natal, bukan sepekan.",
      "tips": "dalam urusan keberagaman, tanyakan dulu ke orang yang bersangkutan sebelum mengatur sesuatu untuk mereka."
    }
  },
  "5": {
    "reviu": [
      "Dilema: antrean jam sibuk dan hubungan dengan senior perlu dijaga, tetapi SOP tanda terima dilanggar sejak Senin dan tiga pemohon dirugikan sekarang.",
      "C menutup kedua sisi: tanda terima yang tertinggal diterbitkan bersama rekan (SOP pulih, pemohon terlayani, senior tidak dipermalukan), lalu sebab pelanggarannya, tekanan antrean, disepakati jalan keluarnya. Kadar masalah: kebiasaan rekan yang baru disinggung lewat candaan, belum ditegur langsung, jadi bicara langsung, bukan lapor atasan. Kontras dengan soal 14.",
      "D=4 (S4): tiga pemohon mendapat tanda terima dan rekan diminta kembali ke SOP, tetapi alasannya melanggar (antrean ingin cepat) tidak disentuh; kebiasaan sejak Senin mudah terulang, ruginya nanti. E=3 (S1): teguran langsung dan cara mempercepat antrean ikut disepakati, tetapi baru \"mulai besok\"; tiga pemohon yang menunggu tetap tanpa tanda terima, rugi sekarang. Pengecoh berbunyi sepakat (Pilar 4 no. 3a). A=2+J6: demi relasi, mengulang candaan yang di soal sudah tak digubris. B=1 (aktif-e): kelancaran antrean dijadikan dalih ikut melanggar.",
      "<b>Kunci vs D (poin 4):</b> D \"meminta rekan kembali mengikuti SOP\", padahal ia melewatinya \"agar antrean cepat\" dan \"melakukannya sejak Senin\", jadi alasannya tetap ada besok; C menyepakati cara mempercepat antrean bersama rekan, sehingga alasan melewati SOP hilang.<br>\n      <b>Kunci vs E (poin 3):</b> E menyepakati cara mempercepat antrean \"mulai besok\", padahal \"tiga pemohonnya masih menunggu\"; C menerbitkan tanda terima mereka dulu, baru menyepakati caranya."
    ],
    "siswa": {
      "tanya": "rekan senior di loket sebelahmu menerima berkas keberatan tanpa tanda terima bernomor supaya antrean cepat, padahal SOP mewajibkannya. Ini sudah berjalan sejak Senin. Tadi pagi kamu menyinggungnya lewat candaan, tapi tak digubris, dan tiga pemohonnya masih menunggu.",
      "opsi": {
        "C": "ajak ia menerbitkan tanda terima yang tertinggal, lalu berdua cari cara supaya antrean tetap cepat tanpa melewati SOP. Tiga pemohon pulang membawa tanda terima, senior tidak dipermalukan, dan alasannya melanggar ikut hilang.",
        "D": "tiga pemohon terlayani, dan rekanmu diingatkan soal SOP. Coba tanya dulu: kenapa ia melewati SOP sejak Senin? Supaya antrean cepat. Selama antrean masih menekan, permintaan kembali ke SOP gampang terlupa lagi.",
        "E": "berani menegur langsung dan mencari jalan keluar. Sayang baru berlaku besok, sementara tiga orang yang sedang menunggu pulang tanpa tanda terima.",
        "A": "candaan sudah dicoba dan tidak digubris. Mengulangnya cuma menjaga suasana, pelanggarannya jalan terus.",
        "B": "antrean lancar enak dilihat, tapi kalau kamu ikut melanggar, pemohon yang dirugikan malah bertambah."
      },
      "kunci": "C membereskan pemohon yang sedang menunggu dan alasan rekan melewati SOP, tanpa mempermalukan senior.",
      "analogi": "temanmu sering parkir sembarangan karena parkiran penuh. Kamu bantu memindahkan motornya sekarang, lalu kalian cari tempat parkir lain bersama.",
      "jebakan": "E dan C sama-sama \"menyepakati\" cara mempercepat antrean, jadi mudah tertukar. Pembedanya ada di tiga pemohon yang masih menunggu: E membiarkan mereka pulang tanpa tanda terima.",
      "tips": "kebiasaan yang berulang biasanya punya alasan. Jawaban terbaik menolong korban hari ini dan menghilangkan alasan itu."
    }
  },
  "6": {
    "reviu": [
      "Dilema: masa tanam tinggal sepuluh hari dan benih enam petani tertahan, tetapi sesuai aturan benih baru keluar setelah penerimanya diverifikasi ke lapangan.",
      "E menutup kedua sisi: verifikasi dijalankan sendiri oleh petugas yang bertugas (Anda) dengan mendatangi lahan, dan waktunya cukup: pengecekan biasanya tiga hari, masa tanam sepuluh hari lagi. Tidak ada jalan pintas, tidak ada beban yang dipindah.",
      "B=4 (S5): ada konfirmasi dan benih cepat tersalur, tetapi telepon tidak melihat lahan; kepastian sasaran tidak terjamin, ruginya nanti (salah sasaran baru ketahuan belakangan). D=3 (S3, +J2): yang menjamin adalah ketua kelompok, bukan petugas verifikasi; tugas verifikasi pindah ke pihak yang tidak bertugas, sekarang. C=2: taat aturan, tetapi petani kehilangan musim. A=1 (aktif-a): beban dilempar ke petani.",
      "<b>Kunci vs B (poin 4):</b> B memastikan data \"lewat telepon\", padahal \"pengecekan lapangan biasanya selesai dalam tiga hari\", masih jauh sebelum masa tanam; E mendatangi lahan keenam petani, jadi sasarannya pasti.<br>\n      <b>Kunci vs D (poin 3):</b> D meminta \"ketua kelompok tani menjamin keenam nama itu\", padahal tugas verifikasi ada pada Anda sebagai petugas verifikasi; E dijalankan sendiri oleh petugas yang bertugas."
    ],
    "siswa": {
      "tanya": "kamu petugas verifikasi. Enam nama penerima bantuan benih belum kamu cek ke lapangan, jadi benih mereka tertahan sesuai aturan. Masa tanam mulai sepuluh hari lagi. Kelihatannya genting, tapi coba lihat angka yang satunya: pengecekan lapangan biasanya selesai dalam tiga hari.",
      "opsi": {
        "E": "datangi lahan keenam petani itu pekan ini. Waktunya masih cukup sebelum masa tanam, dan benih keluar kepada orang yang berhak.",
        "B": "telepon terasa jauh lebih cepat, aku mengerti. Hanya saja lewat telepon kamu tidak bisa melihat lahannya, padahal waktu untuk datang langsung masih ada.",
        "D": "surat pernyataan kelihatan resmi. Yang menjamin justru ketua kelompok, bukan kamu yang bertugas memverifikasi.",
        "C": "aturannya terjaga, musim tanam petaninya hilang. Kasihan, padahal waktunya masih cukup untuk mengecek.",
        "A": "kedengarannya membantu, tapi bantuan yang menjadi hak mereka malah tidak sampai."
      },
      "kunci": "E menjalankan verifikasi sendiri, dengan waktu yang masih cukup sebelum masa tanam.",
      "analogi": "kalau dokter bisa memeriksamu hari ini, ia tidak akan memberi resep hanya dari cerita lewat telepon. Pemeriksaan langsung masih sempat dilakukan.",
      "jebakan": "kalimat \"agar benih cepat tersalur\" di B membuatnya terdengar peduli. Sepuluh hari dibanding tiga hari: buru-buru di sini sebenarnya tidak perlu.",
      "tips": "angka waktu di soal TKP jarang sekadar hiasan. Bandingkan tenggat dengan lama pekerjaannya sebelum memilih cara cepat."
    }
  },
  "7": {
    "reviu": [
      "Dilema: pelajar butuh tempat belajar di musim ujian, tetapi meja yang ditandai tas lalu ditinggal berjam-jam membuat lansia dan peneliti tak kebagian tempat.",
      "B menutup kedua sisi: pelajar tetap bisa memakai meja (bergiliran), pengunjung lain mendapat giliran saat ruang penuh. Aturan berjalan tanpa menunggu keluhan. Koordinator berwenang mengatur tata tertib (disebut di soal).",
      "A=4 (S2): lansia dan peneliti mendapat tempat, tetapi cakupannya hanya dua kelompok itu; pengunjung lain tetap kalah oleh meja yang ditandai, dan kebiasaan menandai lalu pergi dibiarkan. D=3 (S1, +J6): menunggu keluhan dulu dan mengulang cara yang di soal tak bertahan; meja ditandai lagi begitu petugas pergi. C=2: kelompok terbanyak dimenangkan, beban dilempar ke pengunjung lain. E=1: lepas tangan.",
      "<b>Kunci vs A (poin 4):</b> A menyediakan \"meja khusus lansia dan peneliti\", padahal akar masalahnya meja ditandai tas lalu ditinggal \"pergi berjam-jam\"; kebiasaan itu tetap jalan di meja lain. B mengatur pemakaian setiap meja saat ruang baca penuh.<br>\n      <b>Kunci vs D (poin 3):</b> D menertibkan meja \"setiap kali ada pengunjung yang mengeluh lagi\", padahal \"penertiban saat ada keluhan tak bertahan begitu petugas pergi\"; B memasang giliran yang berjalan sejak ruang penuh, tanpa menunggu keluhan."
    ],
    "siswa": {
      "tanya": "musim ujian, dan ruang baca yang kamu koordinasikan penuh tas. Pelajar menandai meja lalu pergi berjam-jam, sementara lansia dan peneliti tidak kebagian tempat. Selama ini meja ditertibkan saat ada yang mengeluh, tapi begitu petugas pergi, tas-tas itu kembali.",
      "opsi": {
        "B": "pasang giliran paling lama tiga jam per meja selama ruang penuh. Pelajar tetap bisa belajar, pengunjung lain kebagian, dan aturan itu jalan tanpa harus menunggu ada yang mengeluh.",
        "A": "lansia dan peneliti dipikirkan, itu manis. Lalu pengunjung lain? Meja lainnya tetap dikuasai tas yang ditinggal pemiliknya.",
        "D": "cepat menanggapi keluhan, padahal cara ini sudah terbukti tak bertahan: petugas pergi, tas kembali.",
        "C": "mengalah pada kelompok paling ramai terasa damai, sampai kamu sadar lansia dan peneliti yang harus mengalah setiap hari.",
        "E": "kesepakatan antarpengunjung terdengar sopan, tapi siapa yang menjaganya kalau tas kembali ditinggal? Ruang ini punya koordinator, dan koordinatornya kamu."
      },
      "kunci": "B membuat aturan pemakaian meja yang adil untuk semua pengunjung dan tetap jalan meski petugas tidak berjaga.",
      "analogi": "di warung yang ramai, cara paling adil adalah nomor antrean, bukan menegur orang yang menyerobot setiap kali ada pembeli yang protes.",
      "jebakan": "A paling mudah memikat orang yang berhati baik. Hanya saja sebab masalahnya, meja yang ditinggal berjam-jam, sama sekali tidak tersentuh.",
      "tips": "jawaban yang kuat menyentuh sebab masalah, bukan hanya menolong korbannya hari itu."
    }
  },
  "8": {
    "reviu": [
      "Dilema: laporan format baru harus selesai tiga hari lagi dan Anda belum pernah menyusunnya, tetapi laporan ini wajib dibuat setiap triwulan sehingga kemampuan menyusunnya harus menetap di seksi.",
      "A menutup kedua sisi: bimbingan dari staf yang dulu menyusunnya (bisa ditelepon, disebut di soal) membuat laporan selesai tepat, dan langkahnya dicatat jadi panduan seksi karena laporan berulang tiap triwulan. Kemampuan berpindah ke Anda dan seksi, bukan bergantung pada satu orang.",
      "D=4 (S4, +J1): cepat dan tepat untuk triwulan ini, tetapi bagian tersulit tetap dikerjakan orang yang sudah dimutasi; triwulan depan bergantung lagi padanya (rugi nanti). C=3 (S5): belajar mandiri, tetapi langsung dikirim tanpa diperiksa siapa pun; laporan keuangan berisiko salah sekarang. B=2: melempar tugas ke staf lain. E=1 (aktif-d): menanggung sendiri, menolak bantuan.",
      "<b>Kunci vs D (poin 4):</b> D meminta \"staf yang dimutasi mengerjakan bagian format baru\", padahal laporan ini \"wajib dibuat setiap triwulan\"; A mencatat langkahnya jadi panduan seksi, jadi triwulan berikutnya tidak bergantung pada orang yang sudah pindah.<br>\n      <b>Kunci vs C (poin 3):</b> C \"langsung mengirim laporannya sebelum tenggat\" tanpa ada yang memeriksa hasil belajar sendirinya; A dibimbing orang yang pernah menyusun format itu."
    ],
    "siswa": {
      "tanya": "kamu baru ditugasi menyusun laporan dana kelurahan dengan format baru, tenggatnya tiga hari lagi. Staf yang dulu menyusunnya sudah dimutasi, tapi masih bisa ditelepon. Satu hal yang gampang terlewat: laporan ini wajib dibuat setiap triwulan.",
      "opsi": {
        "A": "minta dibimbing lewat telepon, lalu catat langkah-langkahnya jadi panduan seksi. Laporan kali ini selesai, dan triwulan depan kamu, atau siapa pun di seksi, tidak perlu menelepon lagi.",
        "D": "laporannya pasti beres. Hanya saja bagian tersulit dikerjakan orang lain, dan triwulan depan kamu harus memintanya lagi, padahal ia sudah pindah tempat kerja.",
        "C": "mau belajar sendiri itu sikap yang bagus. Yang berisiko adalah laporan keuangan langsung dikirim tanpa diperiksa: kalau ada yang keliru, tidak ada yang sempat menangkapnya.",
        "B": "wajar merasa belum siap. Tugasnya sudah di tanganmu, dan ada orang yang bisa membimbing.",
        "E": "kenapa menolak bantuan? Mengerjakan sendirian tidak membuat laporannya lebih benar."
      },
      "kunci": "A menyelesaikan laporan sekarang dengan bimbingan orang yang paham, dan menyimpan caranya untuk triwulan berikutnya.",
      "analogi": "saat diajari masak rendang oleh nenek, kamu mencatat resepnya. Kamu tidak menyuruh nenek memasak setiap Lebaran.",
      "jebakan": "untuk tiga hari ini, D paling cepat dan paling aman. Soalnya menyebut \"setiap triwulan\", dan di triwulan depan D tidak menolongmu.",
      "tips": "pekerjaan yang berulang menuntut jawaban yang tetap berguna di putaran berikutnya."
    }
  },
  "9": {
    "reviu": [
      "Dilema: menjaga wibawa dan hubungan dengan penguji senior, tetapi ucapannya mengajak mempersulit pemilik kendaraan dari satu suku di depan penguji muda yang ikut tertawa.",
      "C sesuai tangga AR \"ucapan/candaan, tegur di tempat\": koreksi diberikan di forum yang sama tempat ucapan didengar, oleh pemimpin apel, berupa penegasan bahwa aturan berlaku sama (tidak menyerang pribadi, tidak memvonis motif).",
      "E=4 (S1, +J5): teguran langsung oleh pemimpin apel, tetapi sesudah apel berakhir; penguji muda yang ikut tertawa tidak mendengar koreksi, dan \"sikap benci\" divonis sebelum dicek. A=3 (S3, +J3): lapor kepala balai tanpa pemicu J3 (tidak ada benturan wewenang, darurat, atau pola di luar wewenang); Anda yang memimpin apel dan berwenang meluruskan saat itu. B=2: demi suasana dan relasi. D=1: lepas tangan.",
      "<b>Kunci vs E (poin 4):</b> E \"mengakhiri apel dengan tenang\" baru menegur empat mata, padahal \"Beberapa penguji muda ikut tertawa\" dan perlu mendengar koreksinya, lalu langsung menuduh \"sikap bencinya\"; C mengoreksi saat itu juga di depan peserta yang sama, tanpa menebak isi hati.<br>\n      <b>Kunci vs A (poin 3):</b> A menyerahkan teguran \"ke kepala balai\", padahal Anda sendiri yang memimpin apel dan bisa meluruskan di sana; C menegur langsung tanpa naik ke atasan."
    ],
    "siswa": {
      "tanya": "kamu sedang memimpin apel, lalu seorang penguji senior bilang sambil tertawa bahwa pemilik kendaraan dari satu suku yang suka membantah sebaiknya \"dipersulit ramai-ramai saja, tidak usah pakai aturan\". Beberapa penguji muda ikut tertawa. Ini sudah bukan sekadar candaan, karena isinya mengajak berlaku tidak adil kepada satu suku.",
      "opsi": {
        "C": "tegur ucapan itu di depan apel, dan tegaskan bahwa aturan berlaku sama untuk kendaraan siapa pun. Penguji muda yang tadi tertawa langsung mendengar mana yang benar, dan seniornya tidak diserang secara pribadi.",
        "E": "berani menegur langsung, tapi apel keburu bubar, jadi penguji muda yang tertawa tidak ikut mendengar. Lagi pula, kok sudah yakin ia benci? Itu baru tebakan.",
        "A": "menegur senior memang tidak enak. Masalahnya, kamu sendiri yang memimpin apel. Kenapa harus menunggu kepala balai?",
        "B": "suasana tetap cair, dan teguran pribadi nanti tidak pernah didengar penguji muda. Mereka pulang dengan kesan bahwa ucapan seperti itu boleh.",
        "D": "kasihan penguji muda itu, dibiarkan menebak sendiri sikap mana yang benar, padahal pemimpinnya ada di depan mereka."
      },
      "kunci": "C meluruskan ucapan itu di tempat ia diucapkan, di depan orang yang mendengarnya.",
      "analogi": "kalau ada teman yang menulis hal keliru di grup kelas, pelurusannya juga ditulis di grup itu, bukan lewat pesan pribadi esok harinya.",
      "jebakan": "teguran empat mata di E terasa paling sopan. Yang perlu mendengar bukan cuma si senior, tapi juga penguji muda yang ikut tertawa.",
      "tips": "menegur di depan orang banyak tidak harus mempermalukan. Tegaskan aturannya, jangan serang orangnya."
    }
  },
  "10": {
    "reviu": [
      "Dilema: antrean resep harus tetap jalan dan rekan merasa sudah teliti, tetapi label dosis yang salah sudah sampai ke pasien dan rekan masih menulis label dengan cara yang sama.",
      "C menutup kedua sisi: label yang salah dibetulkan sekarang, lalu setiap label dicocokkan dengan resep sebelum obat diserahkan, sehingga antrean tetap jalan dan salah tulis tertangkap sebelum sampai ke pasien. Anda penanggung jawab farmasi (wewenang ada di soal). Pengecekannya tidak bergantung pada siapa penulisnya.",
      "D=4 (S5): label ibu beres dan rekan diminta lebih cermat, tetapi tidak ada langkah pengecekan; ruginya nanti, saat label berikutnya salah lagi. E=3 (S4, +J5): penyebab \"kelelahan\" ditetapkan tanpa dicek, lalu seluruh label bergantung pada satu orang; rugi sekarang (antrean melambat, label ibu belum dibetulkan). B=2: label ibu dibetulkan, tetapi pembicaraan ditunda sampai antrean sepi, sesudah puluhan label ditulis dengan cara yang sama. A=1 (aktif-b): tambah tenaga bisa saja perlu, tetapi label salah di tangan ibu tidak disentuh.",
      "<b>Kunci vs D (poin 4):</b> D meminta rekan \"lebih cermat menulis berikutnya\", padahal rekan itu \"yang yakin sudah teliti\", jadi niat cermat sudah ada dan tetap meleset; C mencocokkan tiap label dengan resep sebelum diserahkan.<br>\n      <b>Kunci vs E (poin 3):</b> E \"mengambil alih sendiri seluruh label resep antrean\", sehingga pengamannya bergantung pada satu orang dan antrean melambat; C memasang pengecekan yang tetap berjalan siapa pun penulis labelnya."
    ],
    "siswa": {
      "tanya": "seorang ibu kembali karena label sirup anaknya tertulis 3 &times; 2 sendok, padahal resepnya 3 &times; 1. Yang menulis rekanmu, dan ia yakin sudah teliti. Sekarang pun ia masih menulis label untuk puluhan resep yang mengantre, dengan cara yang sama.",
      "opsi": {
        "C": "betulkan dulu label sirup itu, lalu cocokkan setiap label dengan resepnya sebelum obat diserahkan. Antrean tetap jalan, dan kalau ada salah tulis lagi, ketahuan sebelum sampai ke tangan pasien.",
        "D": "label ibu beres, rekan diingatkan. Ia sudah merasa teliti, ingat? Disuruh lebih cermat tidak mengubah apa-apa kalau tidak ada yang mengecek.",
        "E": "niatnya menolong rekan yang mungkin lelah. Itu baru tebakan, dan kalau semua label kamu tulis sendiri, antrean jadi lambat.",
        "B": "menjaga perasaan rekan itu baik hati. Sampai antrean sepi, puluhan label sudah ditulis dengan cara yang sama.",
        "A": "tambahan tenaga mungkin perlu, nanti. Label yang salah masih di tangan ibu itu sekarang."
      },
      "kunci": "C membetulkan kesalahan yang sudah terjadi dan memasang pengecekan untuk setiap obat yang keluar.",
      "analogi": "kasir yang pernah salah memberi kembalian tidak cukup berjanji lebih teliti. Ia menghitung ulang uangnya di depan pembeli sebelum menyerahkannya.",
      "jebakan": "D mirip cara kita biasa mengingatkan teman, jadi terasa wajar. Kata kuncinya ada di soal: rekan itu \"yakin sudah teliti\".",
      "tips": "dalam urusan obat, pengecekan sebelum diserahkan lebih penting daripada mencari siapa yang salah."
    }
  },
  "11": {
    "reviu": [
      "Dilema: tugas kunjungan bidang Anda harus tetap jalan, tetapi belasan keluarga lansia lelah dikunjungi dua kali sepekan oleh dua bidang dengan data yang beda versi.",
      "E menutup kedua sisi: daftar dua bidang dicocokkan lebih dulu (beda versi data, disebut di soal), lalu dijadikan satu jadwal gabungan, sehingga tugas kedua bidang tetap jalan dan keluarga cukup dikunjungi sekali.",
      "D=4 (S2): sudah disepakati dengan bidang itu (pengecoh berbunyi sepakat, Pilar 4 no. 3a), tetapi hanya untuk keluarga yang sudah mengeluh; keluarga lain yang tumpang tindih belum terlihat karena data dua bidang beda versi, ruginya nanti. C=3 (S5): jadwal bersama disusun dari daftar Anda yang lebih lama tanpa dicocokkan; keluarga yang hanya ada di data baru tetap dikunjungi dua kali atau terlewat. A=2+J5: menuduh \"tidak mau berbagi\" tanpa dicek dan melompat ke atasan. B=1: pasif, keluarga diminta bersabar.",
      "<b>Kunci vs D (poin 4):</b> D menyepakati kunjungan gabungan \"khusus untuk keluarga yang sudah mengeluh\", padahal \"Data tim itu diperbarui pusat bulan lalu\" sedangkan data Anda dari tahun lalu, jadi keluarga lain yang tumpang tindih belum kelihatan; E mencocokkan seluruh daftar dulu.<br>\n      <b>Kunci vs C (poin 3):</b> C memakai \"daftar kunjungan Anda\" dari pendataan tahun lalu sebagai acuan tanpa dicocokkan; E mencocokkan kedua daftar dulu sebelum jadwal disusun."
    ],
    "siswa": {
      "tanya": "bayangkan kamu lansia yang dalam sepekan dikunjungi dua petugas berbeda dan harus menceritakan hal yang sama dua kali. Itulah keluhan belasan keluarga di soal ini. Lalu ada satu fakta penting: data bidang sebelah baru diperbarui pusat bulan lalu, sedangkan datamu dari pendataan tahun lalu.",
      "opsi": {
        "E": "cocokkan dulu daftar keluarga kedua bidang, baru susun jadwal kunjungan gabungan. Dari situ ketahuan semua keluarga yang tumpang tindih, termasuk yang belum sempat mengeluh.",
        "D": "kunjungan gabungan itu ide yang tepat, cuma terbatas pada yang sudah mengeluh. Datamu dan data bidang sebelah beda versi, jadi bisa saja masih ada keluarga lain yang dikunjungi dua kali.",
        "C": "berbagi daftar itu bagus, hanya daftarmu justru yang lebih lama. Kalau dijadikan acuan, keluarga di data baru bisa terlewat.",
        "A": "kesal kalau kerja jadi dobel, wajar. Tapi kok sudah yakin mereka tidak mau berbagi? Itu baru dugaan, dan langsung dibawa ke atasan pula.",
        "B": "kasihan keluarga itu. Mereka sudah lelah, lalu malah diminta bersabar tanpa ada yang berubah."
      },
      "kunci": "E menyamakan data dua bidang dulu, lalu menyusun satu jadwal yang menolong semua keluarga.",
      "analogi": "dua kurir dari satu toko mengantar ke perumahan yang sama. Sebelum rutenya digabung, alamat di catatan masing-masing dicocokkan dulu, karena salah satu catatan sudah lama.",
      "jebakan": "D langsung menolong yang mengeluh, dan itu yang membuatnya menarik. Lihat umur kedua data: keluarga yang belum mengeluh bisa saja ikut dikunjungi dua kali.",
      "tips": "kerja sama antarbidang dimulai dari data yang sama, bukan dari jadwal."
    }
  },
  "12": {
    "reviu": [
      "Dilema: menjaga hubungan dengan rekan sekantor dan melayani warga titipannya, tetapi antrean adalah wujud keadilan, kuota hampir habis, dan bulan lalu warga memprotes titipan serupa.",
      "D menutup kedua sisi: berkas titipan tidak ditolak, tetapi masuk antrean umum dan dicocokkan dengan nomor antrean seperti berkas warga lain. Klaim \"sudah ambil nomor\" teruji lewat nomornya sendiri. Anda berwenang mengatur antrean (disebut di soal).",
      "B=4 (S2, +J4): tegas dan sesuai aturan, tetapi cakupannya sempit: urusan dengan rekan selesai, sementara lima warga di balik berkas itu ikut tertolak tanpa dicek nomornya; berhenti di menunjuk aturan tertempel. E=3 (S5): larangan titipan sudah luas, tetapi lima berkas diproses hanya atas pengakuan rekan tanpa kartu nomor; warga yang antre bisa terlangkahi sekarang. A=2: demi hubungan, titipan didahulukan. C=1: menunggu arahan tertulis tanpa batas, padahal Anda berwenang mengatur antrean.",
      "<b>Kunci vs B (poin 4):</b> B \"mengembalikan kelima berkas ke rekan itu\" dengan menunjuk aturan, sehingga lima warga di baliknya tidak terlayani walau katanya sudah ambil nomor; D memasukkan berkas mereka ke antrean umum dan mencocokkannya dengan nomor, jadi yang benar antre tetap terlayani.<br>\n      <b>Kunci vs E (poin 3):</b> E memproses kelima berkas \"atas pengakuan rekan\", padahal \"kartunya tak dibawa\"; D mencocokkan berkas itu dengan nomor antrean seperti berkas lainnya."
    ],
    "siswa": {
      "tanya": "rekan sekantor menyerahkan lima berkas tetangganya ke loketmu saat kuota hampir habis. Katanya mereka sudah ambil nomor, tapi tak satu pun kartunya dibawa. Ingat juga, bulan lalu warga memprotes titipan serupa di loket lain.",
      "opsi": {
        "D": "berkas itu tidak ditolak, tapi masuk antrean umum dan dicocokkan dengan nomor seperti berkas warga lain. Kalau mereka sudah antre, nomornya akan ketemu. Kalau belum, mereka antre seperti orang lain.",
        "B": "tegas dan sesuai aturan. Lima warga di balik berkas itu ikut tertolak tanpa dicek, padahal bisa jadi mereka sudah antre.",
        "E": "melarang titipan di semua loket itu langkah besar. Anehnya, lima berkas ini tetap diproses hanya karena kata rekanmu, padahal kartunya tidak ada.",
        "A": "menolak rekan sendiri itu tidak enak, aku paham. Warga yang sudah antre bisa terlangkahi, dan protes bulan lalu bisa terulang.",
        "C": "menunggu arahan kepala dinas, padahal kamu sendiri yang berwenang mengatur antrean? Sementara itu kuota hari ini terus berkurang."
      },
      "kunci": "D memperlakukan berkas titipan sama dengan berkas warga lain, diperiksa lewat nomor antreannya.",
      "analogi": "temanmu titip lima nama di antrean tiket konser. Petugas yang baik tidak mengusir temanmu. Ia meminta semua nama masuk barisan dan mencocokkan tiketnya dengan nomor antrean.",
      "jebakan": "B tegas dan ada aturan tertempelnya, jadi terasa benar. Pikirkan lima warga di balik berkas itu, yang mungkin tidak tahu apa-apa soal titipan.",
      "tips": "adil artinya satu cara periksa untuk semua orang, termasuk kenalan rekan sendiri."
    }
  },
  "13": {
    "reviu": [
      "Dilema: rekap proposal bertenggat tiga hari harus tetap jalan, tetapi flashdisk satu kelompok memicu peringatan antivirus, dan bulan lalu komputer bidang sebelah tetap tertular walau dibersihkan sendiri.",
      "B menutup kedua sisi: perangkat bermasalah dibawa ke pihak yang mengurusnya (pengelola jaringan, disebut di soal), dan kelompok tani dikabari sehingga proposalnya tetap tercatat dalam proses. Tenggat tiga hari memberi ruang untuk pemeriksaan. Tangga TIK (uji): serahkan ke pihak resmi + lapor = 5. Sisi keamanan.",
      "E=4 (S3): proposal tetap masuk lewat surel dan flashdisk disingkirkan, tetapi diputuskan sendiri tanpa pengelola jaringan; komputer kerja yang sudah sempat dicolok tidak diperiksa, ruginya nanti bila virus sempat masuk dan menyebar seperti di bidang sebelah. D=3 (S5, +J2): beban membersihkan dipindah ke kelompok tani tanpa ada yang memeriksa hasilnya. C=2: tanya rekan, belum menyelesaikan apa pun. A=1 (aktif-b): sibuk memperbarui antivirus, flashdisk bermasalah dibiarkan.",
      "<b>Kunci vs E (poin 4):</b> E menyimpan flashdisk \"terpisah\" lalu meminta berkas lewat surel, padahal flashdisk itu sudah sempat dicolokkan dan dinas \"punya pengelola jaringan untuk perangkat bermasalah\"; B membawanya ke petugas jaringan, sehingga perangkat yang terkena ikut diperiksa.<br>\n      <b>Kunci vs D (poin 3):</b> D meminta kelompok tani \"bersihkan sendiri dulu\", padahal komputer bidang sebelah \"tetap tertular walau dibersihkan sendiri\"; B menyerahkan pemeriksaan ke petugas jaringan."
    ],
    "siswa": {
      "tanya": "kamu sedang merekap proposal kelompok tani yang tenggatnya tiga hari lagi, lalu antivirus memberi peringatan saat flashdisk salah satu kelompok dicolokkan. Dinas punya pengelola jaringan untuk perangkat bermasalah. Ada juga pelajaran dari bulan lalu: komputer bidang sebelah tetap tertular walau sudah dibersihkan sendiri.",
      "opsi": {
        "B": "bawa flashdisk itu ke petugas jaringan, lalu kabari kelompoknya bahwa berkas mereka sedang diperiksa. Yang memeriksa orang yang bertugas, dan proposal mereka tidak hilang dari daftar.",
        "E": "flashdisk disingkirkan dan proposal tetap masuk lewat surel. Rapi. Masalahnya, flashdisk itu sudah sempat masuk ke komputermu. Siapa yang memeriksa komputernya?",
        "D": "mereka yang membawa, mereka yang membersihkan. Kedengarannya adil, sampai kamu ingat bulan lalu: dibersihkan sendiri pun tetap tertular. Petaninya juga harus bolak-balik.",
        "C": "bertanya ke rekan itu wajar, hanya jawaban \"biasa kok\" tidak membuat flashdisk itu aman.",
        "A": "memperbarui antivirus memang perlu, tapi flashdisk bermasalah itu tetap tergeletak tanpa ada yang menangani."
      },
      "kunci": "B menyerahkan perangkat bermasalah ke petugas yang memang mengurusnya, tanpa membuat proposal petani terbengkalai.",
      "analogi": "kalau tabung gas di rumah berbau bocor, kamu memanggil petugas gas. Tetanggamu pernah mencoba memperbaikinya sendiri, dan tetap bocor.",
      "jebakan": "banyak yang memilih E karena flashdisk-nya disingkirkan. Padahal antivirus baru berbunyi setelah flashdisk dicolokkan, jadi komputernya juga perlu diperiksa.",
      "tips": "kerusakan yang pernah gagal dibereskan sendiri di kantormu adalah tanda kuat untuk memanggil petugasnya."
    }
  },
  "14": {
    "reviu": [
      "Dilema: menjaga hubungan dengan rekan instruktur, tetapi kebiasaannya meninggalkan peserta di mesin las sudah dua kali ditegur langsung, tetap berulang, dan kemarin ada peserta luka bakar.",
      "A menutup kedua sisi: kebiasaan itu dibawa ke pihak yang mengatur tugas instruktur (kepala seksi, disebut di soal), lengkap dengan catatan tanggal sebagai bukti, tanpa mempermalukan rekan di depan peserta. Pemicu lapor atasan sah: pola merugikan nyata (luka bakar) setelah teguran langsung gagal, dan pengaturan tugas di luar wewenang Anda. <b>Kontras dengan soal 5:</b> di sana rekan baru disinggung lewat candaan, jadi kuncinya bicara langsung; di sini teguran langsung sudah dua kali dan ada korban, jadi kuncinya lapor.",
      "E=4 (S4, +J1): peserta terlindungi hari ini, tetapi pengamannya bergantung pada Anda dan kebiasaan rekan tidak tersentuh; ruginya nanti, sepanjang dua bulan sisa angkatan. Mengulang frasa soal. B=3 (S1): bukti dikumpulkan, tetapi laporan menunggu peserta terluka lagi. D=2: mengulang teguran yang dua kali gagal, kali ini mempermalukan rekan di depan peserta. C=1: pasif.",
      "<b>Kunci vs E (poin 4):</b> E \"menggantikan rekan mengawasi kelas las setiap kali ia meninggalkan peserta\", padahal \"angkatan ini masih berjalan dua bulan\", sehingga pengamannya bergantung pada Anda selama itu; A membawa kebiasaan itu ke kepala seksi yang mengatur tugas instruktur.<br>\n      <b>Kunci vs B (poin 3):</b> B menyimpan laporan \"bila ada peserta terluka lagi\", padahal luka bakar sudah terjadi kemarin; A melapor sekarang, sebelum ada korban berikutnya."
    ],
    "catatan": [
      "Tabel tindakan sejenis (bicara langsung vs lapor atasan): soal 5 bicara langsung = 5, karena rekan belum pernah ditegur langsung (fakta: \"menyinggungnya lewat candaan\"); soal 14 lapor kepala seksi = 5, karena teguran langsung sudah dua kali gagal dan ada korban."
    ],
    "siswa": {
      "tanya": "rekan instruktur las di BLK-mu kerap meninggalkan peserta memakai mesin las tanpa pendamping. Dua kali kamu sudah menegurnya langsung, tapi ia tetap mengulang, dan kemarin seorang peserta luka bakar. Tugas instruktur diatur kepala seksi, dan angkatan ini masih berjalan dua bulan.",
      "opsi": {
        "A": "laporkan kebiasaan itu ke kepala seksi, lengkap dengan catatan tanggal tiap kejadian. Orang yang mengatur tugas instruktur jadi tahu, buktinya jelas, dan rekanmu tidak dipermalukan di depan peserta.",
        "E": "rela menjaga kelasnya sendiri, itu sungguh baik hati. Hitung saja: dua bulan lagi. Selama itu kamu harus selalu siaga, sementara kebiasaannya tidak berubah.",
        "B": "mencatat kejadian itu cermat. Tapi menunggu ada peserta terluka lagi? Luka bakar kemarin sudah cukup jadi alasan.",
        "D": "kesal karena teguranmu tidak digubris, aku paham. Teguran ketiga yang lebih keras di depan peserta cuma mempermalukannya, padahal dua teguran sebelumnya pun tidak mempan.",
        "C": "hubungan baik memang penting, tapi keselamatan peserta tidak bisa diserahkan pada kesadaran yang sudah dua kali diuji."
      },
      "kunci": "A membawa masalah ke orang yang berwenang mengatur tugas instruktur, setelah teguran langsung gagal dan sudah ada korban.",
      "analogi": "teman kosmu berkali-kali lupa mematikan kompor. Sudah dua kali kamu ingatkan, dan kemarin panci sampai gosong. Sekarang kamu bilang ke pemilik kos, bukan terus menjaga kompor itu sendirian.",
      "jebakan": "E membuatmu jadi pahlawan kelas, dan justru itu godaannya. Angkatan ini masih dua bulan; selama itu kebiasaan rekanmu tetap jalan.",
      "tips": "lapor atasan bukan langkah pertama, tapi juga bukan pengkhianatan. Ia tepat setelah cara langsung gagal dan ada yang terluka."
    }
  },
  "15": {
    "reviu": [
      "Dilema: menjaga suasana ruangan tetap tenang, tetapi pamflet yang menuding satu kelompok agama sebagai ancaman negara sudah tertempel dan fotonya beredar di grup yang Anda kelola, dan dua perawat dari kelompok itu tidak nyaman.",
      "D menutup kedua sisi sesuai tangga AR \"konten menyebar\": sumber (pamflet) dan sebaran (foto di grup) dihentikan oleh orang yang mengelola keduanya, lalu dua perawat yang terdampak ditemui. Lapor ke atasan tidak dilarang (konten menyebar = pemicu lapor); yang diuji adalah sikap pertama Anda sebagai pengelola.",
      "A=4 (S3, +J3): pamflet dicopot dan semua urusan tersentuh, tetapi penghapusan foto di grup yang Anda kelola sendiri dan pertemuan dengan dua perawat dilempar ke kepala bidang; selama menunggu, foto terus beredar. C=3 (S1): sebaran baru dihentikan setelah penempelnya dicari; foto terus beredar selama pencarian. E=2: setengah jalan demi suasana, pamflet dibiarkan. B=1: pasif dengan dalih bukan urusan pelayanan.",
      "<b>Kunci vs A (poin 4):</b> A \"meminta kepala bidang menghapus fotonya dan menemui kedua perawat\", padahal Anda sendiri yang \"mengelola papan pengumuman serta grup itu\"; D menghapus foto dan menemui kedua perawat sendiri, sekarang.<br>\n      <b>Kunci vs C (poin 3):</b> C \"mencari tahu dulu siapa penempelnya\" baru meminta foto dihapus, sehingga sebaran berlanjut selama pencarian; D menghentikan sebaran lebih dulu."
    ],
    "catatan": [
      "Pilot panduan 3v4: lemah. Rugi A (menunggu) juga terasa sekarang, tidak murni nanti."
    ],
    "siswa": {
      "tanya": "di ruang ganti perawat tertempel pamflet yang menuding satu kelompok agama sebagai ancaman negara, dan fotonya sudah beredar di grup ruangan. Kamu kepala ruang yang mengelola papan pengumuman dan grup itu. Dua perawat dari kelompok tersebut mengaku tidak nyaman.",
      "opsi": {
        "D": "copot pamfletnya, hapus fotonya dari grup, lalu temui dua perawat itu. Penyebarannya berhenti di tangan orang yang mengelola papan dan grup, dan rekan yang terluka hatinya tidak dibiarkan sendirian.",
        "A": "pamfletnya kamu copot, bagus. Tapi foto di grup dan dua perawat itu kamu serahkan ke kepala bidang, padahal grupnya kamu sendiri yang kelola. Selama menunggu beliau, fotonya terus diteruskan.",
        "C": "ingin tahu siapa pelakunya, wajar sekali. Selama kamu mencari, foto itu terus beredar.",
        "E": "foto hilang dari grup, pamflet masih menempel di ruang ganti. Dua perawat itu masih bisa melihatnya.",
        "B": "di luar urusan pelayanan, betul. Kasihan dua rekanmu yang merasa tidak nyaman di tempat kerjanya sendiri."
      },
      "kunci": "D menghentikan pamflet dan sebarannya saat itu juga, lalu memperhatikan rekan yang terdampak.",
      "analogi": "ada coretan menghina di dinding kelas yang kamu jaga. Kamu hapus dulu, lalu menanyakan kabar teman yang dihina. Kamu tidak menunggu surat dari kepala sekolah untuk menghapusnya.",
      "jebakan": "A terdengar lengkap: pamflet dicopot, foto dan dua perawat juga diurus. Yang terlupa, kamu sendiri pemegang papan dan grup itu, jadi tidak perlu menunggu atasan.",
      "tips": "menghentikan sebaran dan menemui yang terluka bisa dilakukan dalam beberapa menit. Laporan ke atasan boleh menyusul."
    }
  }
};
