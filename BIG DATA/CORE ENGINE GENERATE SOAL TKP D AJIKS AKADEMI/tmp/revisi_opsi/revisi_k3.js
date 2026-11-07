// Revisi opsi nilai 4 Paket 2 soal 31–45 (aturan isi: nilai 4 sama lengkap, beda di inti aspek). usage: node revisi_k1.js <dir>
const fs = require('fs'), path = require('path'), dir = process.argv[2];
const soalF = path.join(dir, 'paket2_soal_31_45.js'), bahasF = path.join(dir, 'paket2_bahas_31_45.js'), pinF = path.join(dir, 'paket2_pindai.json');
const soal = require(soalF), bahas = require(bahasF), pin = JSON.parse(fs.readFileSync(pinF, 'utf8'));
const R = {
 31: { L: 'A', opt: 'Mengirim undangan dan daftar peserta ke surel pengaduan umum pemda hari ini.',
  rv2: 'A=4 (S5): bukti dikirim hari ini, tetapi ke surel umum yang tidak dipastikan sampai ke penanganan. C=3 (S3 +J4): berhenti di tata tertib gedung, penggalangan pindah tempat. E=2: teguran pribadi dan hapus pesan, pola terorganisasi tidak tersentuh. D=1: menyusup sendiri.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A mengirim bukti "ke surel pengaduan umum pemda", yang menampung segala aduan dan tidak dipastikan sampai ke penanganan; B menyerahkan undangan dan daftar peserta kepada kepala dinas, yang biasa meneruskan perkara ini ke kesbangpol.',
  siswa: 'kamu sudah berani melapor hari ini, buktinya lengkap pula. Hanya saja surel pengaduan umum menampung segala macam aduan, dan kamu tidak tahu laporanmu sampai ke tangan siapa.',
  sisa: 'bukti dikirim hari ini, tapi lewat surel umum dan tidak dipastikan sampai' },
 32: { L: 'A', opt: 'Membagi rute per wilayah untuk kedua kelompok, lalu mengirim keputusannya pekan ini.',
  rv2: 'A=4 (S4): rute dibagi cepat sesuai wewenang, tetapi hubungan dua mitra yang sudah bersitegang tidak dipulihkan. B=3 (S3 +J3): dilempar ke kepala bidang padahal pembagian rute wewenang koordinator. E=2: urutan daftar, satu mitra tersingkir. D=1: pemberdayaan warga jadi dalih.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A membagi "rute per wilayah untuk kedua kelompok" lalu hanya mengirim keputusannya, padahal kedua kelompok sudah saling melayangkan surat keberatan; C mengundang kedua ketua kelompok berunding soal pembagian rute.',
  siswa: 'pembagian per wilayah itu adil, cepat, dan memang wewenangmu. Hanya saja dua kelompok yang sedang bersitegang lalu menerima keputusan jadi, besar kemungkinan keputusan itu dibalas dengan surat keberatan lagi.',
  sisa: 'rute dibagi lalu keputusannya dikirim, dua kelompok yang bersitegang tidak diajak bicara' },
 33: { L: 'A', opt: 'Membebaskan sembilan taruna itu dari iuran, lalu meminta senat mengikutkan mereka semester ini.',
  rv2: 'A=4 (S2): sembilan taruna kembali ikut kegiatan, tetapi hanya mereka dan hanya semester ini; aturan dasarnya tetap. C=3 (S3): dikembalikan ke rapat angkatan, padahal mayoritas yang menetapkan iuran itu. D=2 +J3: dilempar ke ketua prodi yang menangani akademik. B=1: sibuk di samping masalah.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A membebaskan "sembilan taruna itu dari iuran" dan mengikutkan mereka "semester ini", sehingga taruna lain yang kelak tidak sanggup tetap terancam tersisih; E memberlakukan aturan tertulis kegiatan angkatan bebas iuran wajib.',
  siswa: 'sembilan taruna langsung lega dan bisa ikut kegiatan lagi, itu baik. Tapi coba pikirkan semester depan, atau taruna lain yang mendadak kesulitan uang. Aturannya belum berubah.',
  jebakan: 'A terasa hangat dan langsung menolong. Coba lihat lagi kata "semester ini".' },
 35: { L: 'C', opt: 'Menelepon kedua operator sekolah, lalu meminta data anak itu segera dipindah.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C hanya "menelepon kedua operator sekolah", padahal kedua sekolah sedang saling menunjuk; E mengumpulkan kedua operator di kantor dinas sampai data siswa itu pindah sebelum batas usulan.',
  rv2: 'C=4 (S5): menelepon keduanya, tetapi tidak memastikan nama masuk usulan sekolah baru. A=3 (S2 +J4): edaran umum sesuai ketentuan, siswa ini tetap tertinggal. B=2: beban ke orang tua. D=1: tunggu tahun depan.',
  siswa: 'menelepon keduanya dan meminta data segera dipindah sudah menunjukkan kepedulian. Tapi dua sekolah yang sedang saling menunjuk bisa saja saling menunggu lagi, dan kamu tidak tahu apakah nama anak itu benar-benar masuk.' },
 36: { L: 'C', opt: 'Memberi catatan khusus berikut bukti arsip pada nama-nama itu di rekap Jumat.',
  rv2: 'C=4 (S4): nama ditandai dengan bukti dan rekap tepat waktu, tetapi daftar dasar tetap salah karena tidak dibawa ke musyawarah. A=3 (S5): penghapusan berdasarkan kabar lisan, bukti di arsip tidak dicek. B=2 +J6: mengulang cara tahun lalu. E=1: mengucilkan ketua RT.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C memberi "catatan khusus berikut bukti arsip" di rekap, sehingga daftar dasarnya tetap memuat nama yang sama tahun depan; D mengusulkan pembahasan belasan nama itu di musyawarah sebelum Jumat.',
  siswa: 'memberi tanda berikut buktinya sudah jauh lebih baik daripada diam. Tapi daftarnya sendiri masih salah, karena penghapusan nama hanya bisa lewat musyawarah. Tahun depan kamu akan menemukan belasan nama yang sama lagi.',
  sisa: 'nama ditandai berikut bukti, tapi daftar dasarnya tetap salah' },
 41: { L: 'D', opt: 'Meminta ketua tim menghapus pesan tautan, lalu memperingatkan grup agar tidak membukanya.',
  rv2: 'D=4 (S2 +J1): pesan dihapus dan grup diperingatkan, tetapi tautan tetap aktif bagi yang sudah menyalinnya. E=3 (S1): baru dibahas akhir bulan. C=2: meminta pihak yang diperiksa tidak membuka. A=1: mengucilkan rekan.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D meminta ketua tim "menghapus pesan tautan" dan memperingatkan grup, padahal folder bisa dibuka "siapa pun pemegang tautannya"; B meminta ketua tim segera menutup akses tautan.',
  siswa: 'menghapus pesan dan memperingatkan grup memang refleks yang wajar. Tapi siapa pun yang sudah sempat menyalin tautannya masih bisa membuka folder itu.',
  sisa: 'pesan dihapus dan grup diperingatkan, tapi tautan yang tersalin masih bisa membuka folder' },
 42: { L: 'B', opt: 'Mewajibkan mandor merekrut warga sekitar lokasi pada pembaruan kontrak berikutnya.',
  poin: { B: '4 S3 +J1(mengulang bunyi pedoman, perekrutan tetap lewat pilihan mandor)' },
  rv2: 'B=4 (S3 +J1): pedoman warga sekitar diterapkan, tetapi perekrutan tetap lewat pilihan mandor, sehingga warga di luar lingkar kenalannya tetap tidak punya jalan masuk. A=3 (S2): hanya beberapa pekerja tambahan, jalur kenalan tetap. E=2: menasihati. C=1: mempertahankan.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B mewajibkan mandor "merekrut warga sekitar lokasi", tetapi yang memilih pekerja tetap mandor; D mengalihkan perekrutan dari kenalan mandor ke pendaftaran terbuka di desa.',
  siswa: 'aturan warga sekitar memang ditegakkan. Tapi yang memilih tetap mandor, jadi yang terpilih kemungkinan besar tetap kenalannya, hanya kini yang tinggal di sekitar lokasi.',
  jebakan: 'B terdengar tertib karena sesuai pedoman. Coba tanya: siapa yang tetap memilih pekerjanya?',
  sisa: 'pedoman ditegakkan, tapi yang memilih pekerja tetap mandor' },
 43: { L: 'B', opt: 'Membagi kolom bersama ketiga bidang lewat grup, lalu meminta saling menjaga.',
  rv2: 'B=4 (S5): sepakat dengan ketiga bidang, tetapi pembagian hanya dijaga dengan saling meminta; hak sunting tidak diatur sehingga kolom masih bisa tertimpa. C=3 (S2 +J3): dilempar ke kepala badan. E=2: mengunci dan mengisi sendiri. D=1: memperbaiki terus.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B membagi kolom bersama ketiga bidang "lewat grup, lalu meminta saling menjaga", sehingga rumus masih bisa tertimpa; A menyepakati pembagian lembar beserta hak sunting masing-masing.',
  siswa: 'sepakat dengan ketiga bidang sudah benar arahnya. Tapi pembagian itu hanya dijaga dengan saling meminta, padahal kamu bisa mengatur hak sunting supaya kolom orang lain memang tidak bisa diubah.',
  jebakan: 'B terasa lengkap karena ada kesepakatan dan permintaan saling menjaga. Tanyakan: apa yang mencegah satu klik keliru besok?',
  sisa: 'sepakat lewat grup, tapi hanya dijaga dengan saling meminta, hak sunting tidak diatur' },
 44: { L: 'C', opt: 'Menyampaikan lewat pengeras suara bahwa bantuan untuk seluruh korban yang terdata RT.',
  rv2: 'C=4 (S5): kerumunan ditenangkan dengan fakta, tetapi pesan di grup tidak dijawab. B=3 (S4 +J1): membantah dengan mengulang bunyi pesan, hanya untuk yang ricuh. D=2: melacak pengirim saat antrean ricuh. E=1: uang pribadi.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C menyampaikan fakta hanya "lewat pengeras suara", padahal pesan berantai di grup-grup itu yang memicu kericuhan; A mengumumkan lewat pengeras suara maupun akun resmi.' },
};
for (const [n, r] of Object.entries(R)) {
  const s = soal.find((x) => x.n === +n), b = bahas[n];
  s.opts[r.L] = r.opt; Object.assign(s.poin, r.poin || {});
  b.reviu[2] = r.rv2;
  const g = b.reviu[3].split('<br>'); g[0] = r.rv3a; b.reviu[3] = g.join('<br>');
  b.siswa.opsi[r.L] = r.siswa;
  for (const k of ['jebakan', 'tips', 'analogi']) if (r[k]) b.siswa[k] = r[k];
  if (r.sisa) pin.soal[n].sisa[r.L] = r.sisa;
}
const head = fs.readFileSync(soalF, 'utf8').split('\n')[0];
fs.writeFileSync(soalF, head + '\nmodule.exports = ' + JSON.stringify(soal, null, 1) + ';\n');
fs.writeFileSync(bahasF, '// Paket 2 pembahasan 31–45\nmodule.exports = ' + JSON.stringify(bahas, null, 1) + ';\n');
fs.writeFileSync(pinF, JSON.stringify(pin, null, 2) + '\n');
console.log('revisi', Object.keys(R).join(','));
