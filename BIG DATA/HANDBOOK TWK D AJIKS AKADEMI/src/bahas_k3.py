"""Pembahasan siswa Kelompok 3 (contoh Bab 2-4, 11, 12, 14 + latihan Bab 11). Format sama dengan bahas_k1.py.
Soal kaidah memakai nama (nama kaidah per huruf) sebagai ganti pola. Tambahan: pembalik (pasangan Bab 12),
sop (empat langkah Bab 14)."""

BAHAS = {
# ─────────── CONTOH BAB 2 ───────────
'contoh-bab02': dict(
 pola=dict(B=2, C=4, D=3, E=6),
 tanya="Langkah menyusun trayek baru yang sesuai arah sila keempat, dengan tenggat akhir bulan dan tiga pihak yang kepentingannya berbeda.",
 langkah="Dua sisi: tenggat dari kepala dinas dan kepentingan tiga pihak. Kalimat penentunya sebab yang tertulis: rencana tahun lalu ditolak karena warga tidak pernah diberi tahu mengapa usulan mereka tidak dipakai.",
 bahas=dict(
  A="Musyawarah terjadwal menjaga tenggat, ketiga pihak didengar, dan dasar keputusan diterangkan. Sebab penolakan tahun lalu ditutup.",
  B="Masukan warga ditampung, lalu keputusan diserahkan ke tim teknis. Warga kembali tidak tahu mengapa usulannya tidak dipakai, persis kesalahan tahun lalu.",
  C="Jajak pendapat itu cara yang sah. Tapi suara terbanyak tidak menerangkan apa pun kepada pihak yang kalah suara.",
  D="Rencana yang diterima semua pihak adalah hasil yang diharapkan. Pilihan ini tidak menyebut langkah apa yang ditempuh.",
  E="Peta rute diumumkan dengan rapi. Alasan di balik keputusan tetap tidak sampai ke warga."),
 kunci="A menjawab kedua sisi dan langsung mengobati sebab penolakan yang ditulis soal.",
 analogi="Seperti guru yang menolak usul tujuan karyawisata kelasmu: kamu lebih mudah menerima kalau ia menjelaskan alasannya di depan kelas, bukan hanya menempel pengumuman tujuan yang dipilih.",
 jebakan="E terdengar terbuka karena ada pengumuman. Yang hilang tahun lalu bukan pengumumannya, melainkan alasannya."),

# ─────────── CONTOH BAB 3 ───────────
'contoh-bab03': dict(
 pola=dict(A=1, C=4, D=5, E=2),
 tanya="Hubungan Pancasila dan UUD 1945. Jenis jawabannya hubungan, ukurannya kedua keterangan guru.",
 langkah="Sebut jenis jawabannya sebelum membuka pilihan: hubungan, jadi kedua hal wajib disebut dan disambungkan. Lalu cek ukurannya: dua keterangan guru, bukan satu.",
 bahas=dict(
  A="Isinya benar tentang UUD 1945, tetapi Pancasila tidak muncul. Soal meminta hubungan, dan pilihan ini hanya membicarakan satu pihak.",
  B="Nilai Pancasila mendasari perumusan pasal UUD 1945. Kedua hal disebut dan disambungkan, sesuai sumber segala sumber hukum dan letaknya di Pembukaan.",
  C="Kedudukan UUD di puncak hierarki peraturan itu benar. Tapi ini hubungan UUD dengan peraturan lain, bukan dengan Pancasila.",
  D="Ini pendapat siswa di cerita, yang justru ingin diluruskan guru.",
  E="Letak rumusan Pancasila memang begitu, dan itu keterangan pertama guru. Keterangan kedua tentang sumber hukum tertinggal."),
 kunci="B menyambungkan Pancasila dan UUD 1945 dengan dasar yang diberikan kedua keterangan guru.",
 analogi="Seperti fondasi dan dinding rumah: keduanya bagian rumah yang sama, tetapi dinding didirikan di atas fondasi, bukan sejajar dengannya.",
 jebakan="D menang di telinga karena sering kamu dengar. Soal sengaja menaruhnya di mulut siswa yang keliru."),

# ─────────── CONTOH BAB 4 ───────────
'contoh-bab04': dict(
 pola=dict(A=3, B=2, D=6, E=7),
 tanya="Sikap pengelola data yang menemukan nama ganda, saat kepala bidang khawatir capaian terlihat turun.",
 langkah="Dua sisi: kekhawatiran atasan dan pedoman pendataan. Kalimat penentunya menyelamatkan kunci: setiap perubahan daftar wajib diajukan dengan bukti melalui jalur pengesahan.",
 bahas=dict(
  A="Kepercayaan petani adalah buah kalau data benar. Yang ditanya sikapmu sekarang, dan pilihan ini hanya menyebut tujuannya.",
  B="Jalurnya benar, buktinya ada. Tapi kepala bidang dilewati, padahal kekhawatirannya bagian dari cerita yang perlu dijawab.",
  C="Atasan diberi penjelasan tentang akibat pembetulan, lalu revisi diajukan dengan bukti. Kedua sisi terjawab dan pedoman ditaati.",
  D="Data benar di salinan kerja tim, sementara daftar resmi tetap salah. Rapi di belakang layar, masalahnya tidak selesai.",
  E="Inspektorat tidak sedang diminta memeriksa. Membetulkan daftar adalah tugasmu sebagai pengelola data."),
 kunci="C menjawab kekhawatiran atasan dan menjalankan pedoman, sehingga koreksi sah dan tidak ada yang terkejut.",
 analogi="Seperti menyadari nilai ulanganmu salah dijumlah guru: kamu bilang dulu ke wali kelas akibatnya pada peringkat, lalu tetap mengajukan koreksi lewat guru mapel.",
 jebakan="B paling patuh pada bunyi pedoman. Pilihan itu mengabaikan satu orang di cerita yang perlu tahu lebih dulu."),

# ─────────── CONTOH BAB 11 ───────────
'contoh-bab11a': dict(
 pola=dict(A=5, B=9, C=2, D=4),
 tanya="Gagasan utama paragraf: pokok yang dilayani semua kalimat.",
 langkah="Baca sampai habis. Kalimat (1) sampai (3) bicara manfaat, lalu “Namun” di kalimat (4) membalik arah, dan (5) menyebut akibatnya. Rumuskan sendiri: minat baca tumbuh, tetapi tertahan aturan baca di tempat.",
 bahas=dict(
  A="Ini salinan kalimat (1). Terasa akrab, padahal hanya satu rincian pembuka.",
  B="Saran meminjamkan buku masuk akal, tetapi teks tidak pernah mengusulkannya. Simpulan pribadimu bukan isi paragraf.",
  C="Benar untuk kalimat (1) sampai (3), lalu berhenti. “Namun” dan akibatnya tertinggal.",
  D="Teks bilang kegemaran membaca belum berlanjut di rumah, bukan anak berhenti membaca. Artinya bergeser.",
  E="Bagian manfaat dan bagian kendala bertemu dalam satu kalimat. Semua kalimat lain bisa disebut menjelaskannya."),
 kunci="E merangkum seluruh paragraf, termasuk pembalikan arah di kalimat (4) dan (5).",
 analogi="Seperti menceritakan ulang film: kalau kamu hanya menyebut adegan pembukanya, temanmu tidak tahu bahwa ceritanya berbalik di tengah.",
 jebakan="C terasa benar karena kalimat-kalimat awal memang bicara keberhasilan. Satu kata Namun membuat pilihan itu tinggal separuh."),

'contoh-bab11b': dict(
 nama=dict(A='Titik dua dan koma perincian', B='Induk kalimat di depan', C='Ungkapan penghubung antarkalimat',
           D='Anak kalimat di depan', E='Keterangan di awal kalimat'),
 tanya="Kalimat yang penulisan tanda bacanya tidak tepat. Yang dicari satu yang salah; empat lainnya benar.",
 langkah="Untuk tiap kalimat, sebut kaidahnya dulu, baru putuskan. Hati-hati dengan kalimat yang terasa janggal tetapi benar.",
 bahas=dict(
  A="Benar. “Petugas meminta tiga berkas” adalah pernyataan lengkap, jadi titik dua boleh dipakai sebelum perinciannya, dan unsur perincian dipisah koma.",
  B="Benar, walau terasa ada yang kurang. Induk kalimat berada di depan, dan anak kalimat kalau di belakangnya tidak didahului koma.",
  C="Tidak tepat. “Oleh karena itu” adalah ungkapan penghubung antarkalimat, dan sesudahnya wajib diberi koma.",
  D="Benar. Anak kalimat “Kalau berkasnya lengkap” mendahului induk kalimat, jadi dipisah dengan koma.",
  E="Benar. Koma sesudah keterangan di awal kalimat hanya dapat dipakai, bukan wajib. Tanpa koma pun kalimat ini tidak menimbulkan salah paham."),
 kunci="C melanggar kaidah koma sesudah ungkapan penghubung antarkalimat.",
 analogi="Seperti aturan helm dan jaket saat naik motor: helm wajib, jaket hanya dianjurkan. Pengendara tanpa jaket tidak bisa ditilang.",
 jebakan="E dan B terasa janggal di telinga. Kamus dan EYD mengalahkan telinga: keduanya benar."),

# ─────────── LATIHAN BAB 11 ───────────
'Bahasa negara.1': dict(
 pola=dict(A=9, C=2, D=5, E=4),
 tanya="Gagasan utama paragraf bank sampah.",
 langkah="Kalimat (1) sampai (4) memberi rincian: jadwal, cara menabung, sungai yang bersih, iuran yang terbayar. Kalimat (5) merangkum dua manfaatnya. Cari pilihan yang mencakup keduanya.",
 bahas=dict(
  A="Usul agar kelurahan lain meniru terdengar wajar, tetapi teks tidak menyebutnya.",
  B="Manfaat bagi lingkungan dan bagi keuangan warga, dari kebiasaan memilah sampah. Semua kalimat lain menjelaskan pernyataan ini.",
  C="Sungai yang bersih baru manfaat yang pertama. Manfaat bagi dompet warga tertinggal.",
  D="Ini rincian kalimat (4). Satu contoh, belum pokoknya.",
  E="Teks bicara kelurahan dan hasil yang sudah terjadi. Pilihan ini memperluas ke kota dan mengubah waktunya menjadi akan."),
 kunci="B memuat kedua manfaat yang dirangkum kalimat (5).",
 analogi="Seperti menjelaskan kenapa kamu rajin bersepeda ke sekolah: badan jadi sehat dan uang jajan untuk ongkos bisa ditabung. Menyebut satu alasan saja belum utuh.",
 jebakan="C dan D sama-sama benar menurut teks. Uji: apakah kalimat lain bisa disebut menjelaskannya? Untuk C dan D, jawabannya tidak."),

'Bahasa negara.2': dict(
 pola=dict(A=4, B=9, C=2, D=5),
 tanya="Simpulan paragraf sanggar tari: tanpa fakta baru, waktu sama dengan teks, cakupan sama.",
 langkah="Lingkari kata waktu di kalimat (5): “Bila tidak … diperkirakan”. Teks berisi perkiraan, jadi simpulan yang setia berbunyi terancam, bukan sudah terjadi.",
 bahas=dict(
  A="Teks bilang diperkirakan tidak dipentaskan lagi dalam beberapa tahun. Pilihan ini menyatakan sudah berhenti. Waktunya berubah.",
  B="Membuka kelas baru masuk akal, tetapi teks tidak mengusulkannya.",
  C="Benar menurut kalimat (2) dan (3), tetapi pelatih yang belum punya pengganti tertinggal.",
  D="Salinan kalimat (4). Akrab di mata, hanya satu rincian.",
  E="Terancam tidak dipentaskan lagi, karena murid dan pelatih kurang. Waktunya perkiraan, cakupannya dua sebab, sama dengan teks."),
 kunci="E setia pada waktu teks dan mencakup kedua sebab.",
 analogi="Seperti prakiraan cuaca yang bilang besok berpotensi hujan: kamu tidak bisa bilang ke temanmu besok sudah hujan deras.",
 jebakan="A paling dekat dengan kesedihan cerita. Kata diperkirakan di kalimat terakhir membuat A melompat terlalu jauh."),

'Bahasa negara.3': dict(
 nama=dict(A='Kata baku: bujet', B='Kata baku: omzet, semenjak', C='Kata baku: kuesioner',
           D='Kata tidak baku: mengkoordinir', E='Kata baku: merespons'),
 tanya="Kalimat yang memuat kata tidak baku. Empat kalimat lainnya baku semua, walau ada yang terdengar asing.",
 langkah="Periksa kata yang terasa janggal satu per satu, lalu putuskan dengan KBBI, bukan dengan telinga.",
 bahas=dict(
  A="Baku. Bujet tercatat di KBBI. Kata ini sering dicoret karena terdengar asing.",
  B="Baku. Omzet dan semenjak sama-sama tercatat di KBBI.",
  C="Baku. Kuesioner adalah bentuk baku untuk daftar pertanyaan.",
  D="Tidak baku. Mengkoordinir tidak ditemukan sebagai entri di KBBI. Bentuk bakunya mengoordinasi atau mengoordinasikan.",
  E="Baku. Merespons tercatat di KBBI dengan arti memberikan respons atau menanggapi."),
 kunci="D memuat mengkoordinir, kata yang tidak ada di KBBI.",
 analogi="Seperti nama teman yang ejaannya tidak biasa: kamu tidak menebak dari bunyinya, kamu melihat daftar absen.",
 jebakan="A dan B memancing coretan karena bujet, omzet, dan semenjak tidak biasa di telinga. Ketiganya baku."),

'Bahasa negara.4': dict(
 nama=dict(A='Anak kalimat di depan dan koma perincian', B='Koma perincian', C='Induk kalimat di depan',
           D='Ungkapan penghubung antarkalimat', E='Titik dua'),
 tanya="Kalimat yang penulisan tanda bacanya tepat. Kali ini yang dicari satu yang benar; empat lainnya masing-masing melanggar satu kaidah.",
 langkah="Baca kalimat perintahnya dua kali: tepat, bukan tidak tepat. Lalu sebut kaidah tiap kalimat.",
 bahas=dict(
  A="Tepat. Anak kalimat “Kalau stok cukup” di depan diberi koma, dan beras, minyak, dan gula dipisah koma.",
  B="Tidak tepat. Koma di antara beras dan minyak hilang, padahal unsur perincian dipisah koma.",
  C="Tidak tepat. Induk kalimat di depan, jadi anak kalimat “kalau data penerima sudah diperiksa” tidak didahului koma.",
  D="Tidak tepat. “Jadi” di awal kalimat kedua adalah ungkapan penghubung antarkalimat dan harus diikuti koma.",
  E="Tidak tepat. Perincian di sini bagian dari kalimat, karena “dibagikan kepada” belum pernyataan lengkap. Titik dua tidak dipakai."),
 kunci="A memenuhi dua kaidah koma tanpa melanggar kaidah lain.",
 analogi="Seperti memeriksa lima sepeda motor sebelum touring: empat punya satu kekurangan masing-masing, dan cuma satu yang lampu, rem, dan klaksonnya beres.",
 jebakan="C terasa benar karena koma di tengah kalimat panjang terdengar wajar. Ingat rangkuman Bab 11: induk kalimat di depan, tanpa koma."),

'Bahasa negara.5': dict(
 nama=dict(A='Unsur geografi tanpa nama diri', B='Nama geografi sebagai nama jenis', C='Nama lembaga dengan bentuk ulang',
           D='Asal daerah dan nama geografi', E='Nama dokumen dengan bentuk ulang'),
 tanya="Kalimat yang penulisan huruf kapitalnya tidak tepat.",
 langkah="Untuk tiap kata yang ragu, tanyakan: ini bagian dari nama diri atau hanya jenisnya?",
 bahas=dict(
  A="Tepat. Selat di sini tidak diikuti nama diri, jadi ditulis kecil.",
  B="Tepat. Jeruk bali dan petai cina adalah nama jenis, jadi bali dan cina ditulis kecil.",
  C="Tidak tepat. Pada nama lembaga, bentuk ulang utuh ditulis kapital pada kedua unsurnya: Perserikatan Bangsa-Bangsa.",
  D="Tepat. Cirebon menunjukkan asal daerah, dan Danau Toba adalah nama geografi. Keduanya kapital.",
  E="Tepat. Kitab Undang-Undang Hukum Pidana adalah nama dokumen, dan kedua unsur bentuk ulangnya kapital."),
 kunci="C menulis bentuk ulang dalam nama lembaga dengan huruf kecil pada unsur keduanya.",
 analogi="Seperti nama lengkap di ijazah: setiap bagian namamu ditulis kapital, tidak boleh separuh besar separuh kecil.",
 jebakan="B dan D tampak tidak konsisten: bali kecil, Cirebon kapital. Itulah pembedaan nama jenis dan asal daerah yang diajarkan Bab 11."),

# ─────────── CONTOH BAB 12 (pasangan) ───────────
'contoh-bab12a': dict(
 pola=dict(A=5, C=2, D=8, E=10),
 tanya="Sikap petugas ketika pemberian masih berupa undangan dan belum diterima.",
 langkah="Dua sisi: kebiasaan menghormati tuan rumah dan kode etik yang melarang menerima pemberian. Kalimat penentunya: undangan untuk akhir pekan ini, artinya pemberian belum diterima dan masih bisa ditolak.",
 bahas=dict(
  A="Membaca ulang kode etik tidak salah, tetapi aturannya sudah jelas di cerita. Undangan belum terjawab.",
  B="Ditolak dengan santun, dan niat baik pemilik dihargai. Aturan ditaati, perasaan tuan rumah dijaga.",
  C="Penolakannya benar, tetapi tanpa penjelasan dan langsung dicap gratifikasi. Sisi menghormati tuan rumah hilang.",
  D="Kewajiban melapor berlaku untuk pemberian yang telanjur diterima. Undangan ini belum diterima apa pun, jadi cukup ditolak.",
  E="Menolak, ya. Tapi alasannya menjaga nama baikmu sendiri, bukan karena aturan dan martabat jabatan."),
 kunci="B menolak pemberian yang belum diterima dengan cara yang tetap menghormati tuan rumah.",
 analogi="Seperti ditawari tumpangan oleh orang yang baru kamu bantu: selama belum naik, kamu cukup menolak dengan ucapan terima kasih.",
 jebakan="D terlihat paling taat hukum karena menyebut KPK dan tenggat. Lapor ke KPK baru berlaku setelah pemberian diterima."),

'contoh-bab12b': dict(
 pola=dict(A=5, B=2, C=2, D=10),
 tanya="Sikap petugas ketika uang tagihan sudah masuk ke rekeningnya.",
 langkah="Ceritanya hampir sama dengan soal sebelumnya. Kalimat penentunya berbeda: uang sudah dikirim ke rekeningmu. Pemberian telanjur diterima, dan aturan di soal bilang yang telanjur diterima wajib dilaporkan.",
 bahas=dict(
  A="Kode etiknya sudah tertulis di soal. Membacanya lagi tidak mengubah fakta bahwa uang sudah masuk.",
  B="Mengembalikan uang sambil menjelaskan aturan terdengar paling jujur. Tapi soal bilang pemberian yang telanjur diterima wajib dilaporkan, dan mengembalikan uang bukanlah laporan.",
  C="Laporannya sudah ke tempat yang benar. Pemilik rumah makan dibiarkan tidak tahu, dan sisi menghormati tuan rumah hilang.",
  D="Laporannya benar, alasannya keliru. Kamu melapor untuk menjaga nama baikmu sendiri.",
  E="Pemilik diberi penjelasan dengan santun, dan penerimaan dilaporkan ke KPK. Aturan dan perasaan tuan rumah dua-duanya terjaga."),
 kunci="E menyelesaikan pemberian yang telanjur diterima lewat laporan, tanpa melupakan tuan rumah.",
 analogi="Seperti uang salah transfer yang masuk ke rekeningmu: kamu tidak cukup mengirim balik diam-diam, kamu melapor ke bank supaya tercatat jelas.",
 jebakan="B adalah kunci soal sebelumnya yang berganti baju: menolak berubah menjadi mengembalikan. Sekali pemberian sudah diterima, jalannya berpindah ke laporan.",
 pembalik="Undangan untuk akhir pekan ini (belum diterima) menjadi uang yang sudah masuk rekening (telanjur diterima). Kalimat aturan di kedua soal sama persis; yang berubah hanya fakta itu, dan kunci berpindah dari menolak dengan santun ke menjelaskan dan melapor ke KPK."),

# ─────────── CONTOH BAB 14 ───────────
'contoh-bab14': dict(
 pola=dict(B=2, C=2, D=6, E=3),
 tanya="Langkah kepala desa untuk memulihkan persatuan dua dusun yang saling curiga akibat pesan berantai.",
 langkah="Ikuti empat langkah SOP di bawah.",
 sop=["Tutup pilihan. Jenis jawaban: tindakan kepala desa. Ukurannya: memulihkan persatuan. Dua sisinya: mencegah bentrokan dan mengembalikan kebersamaan warga.",
      "Jawab dengan kata sendiri: luruskan pesan palsu itu di depan warga kedua dusun dengan bukti peta.",
      "Kalimat penentu: kepala desa tahu isi pesan bertentangan dengan peta batas di kantor desa. Sebab curiga adalah pesan yang memelintir, dan buktinya ada di tangan kepala desa.",
      "Coret dengan nama: B separuh (keamanan saja), C separuh (kebersamaan tanpa meluruskan pesan), D formalitas, E akibatnya. Tersisa A."],
 bahas=dict(
  A="Warga kedua dusun dipertemukan dan isi pesan dicocokkan dengan peta. Sebab kecurigaan dibereskan dengan bukti yang dimiliki kepala desa.",
  B="Patroli mencegah bentrokan, dan itu permintaan kepala dusun pertama. Kecurigaannya tetap ada selama pesan itu belum diluruskan.",
  C="Ronda dan kerja bakti bersama adalah permintaan kepala dusun kedua. Warga bekerja berdampingan sambil masih saling curiga karena pesannya belum dibantah.",
  D="Kesepakatan tertulis ditandatangani dua kepala dusun. Warga yang membaca pesan berantai itu tidak ikut diyakinkan.",
  E="Kepercayaan yang pulih adalah hasil yang dituju. Soal bertanya langkahnya."),
 kunci="A menyasar sebab yang tertulis, yaitu pesan yang memelintir fakta, dengan bukti yang ada di kantor desa.",
 analogi="Seperti dua teman yang bertengkar karena tangkapan layar yang dipotong: mereka baru akur setelah melihat percakapan aslinya bersama, bukan setelah disuruh bersalaman.",
 jebakan="B dan C masing-masing menuruti satu kepala dusun dan terdengar bijak. Keduanya membiarkan pesan palsu itu tetap dipercaya."),
}
