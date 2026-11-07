// Revisi opsi Paket 1 soal 31–45 (engine v1.3.5 Pilar 4 no. 2a + aturan huruf no. 2). usage: node revisi_p1_k3.js <dir>
const fs = require('fs'), path = require('path'), dir = process.argv[2];
const soalF = path.join(dir, 'paket1_soal_31_45.js'), bahasF = path.join(dir, 'paket1_bahas_31_45.js'), pinF = path.join(dir, 'paket1_pindai.json');
const soal = require(soalF), bahas = require(bahasF), pin = JSON.parse(fs.readFileSync(pinF, 'utf8'));
const R = {
 31: { opts: { E: 'Menayangkan rapat Rabu secara daring, lalu menampung pertanyaan penyedia sampai Jumat.' },
  rv3a: '<b>Kunci vs C (poin 4):</b> C hanya mengirim "rekaman rapat", padahal rapat Rabu adalah "kesempatan tanya jawab"; E menampung pertanyaan penyedia sampai Jumat.' },
 32: { opts: { E: 'Mencocokkan fotokopi bawaan guru itu dengan arsip, lalu menandatangani legalisirnya.' },
  rv2: 'E=4 (S3): fotokopi dicocokkan dengan arsip dan berkas lengkap hari itu, tetapi legalisir ditandatangani orang yang tidak berwenang. D=3 (S1): berkas diterima sebagai susulan, tetapi SK asli baru bisa dibawa Sabtu, sesudah batas Jumat. C=2+J4: berhenti di bunyi aturan, guru kehilangan periode usul. B=1: beban dilempar ke kerabat di luar layanan dan guru disuruh pulang.',
  rv3a: '<b>Kunci vs E (poin 4):</b> E "menandatangani legalisirnya" sendiri, padahal yang berwenang adalah "kepala subbagian" yang "sedang di kantor"; A memintakan legalisirnya kepada atasan yang berwenang.',
  siswa: { E: 'niatmu menolong, dan fotokopinya pun sudah kamu cocokkan dengan arsip. Masalahnya, tanda tangan legalisir bukan wewenangmu, sementara yang berwenang justru ada di kantor.' },
  sisa: { E: 'dicocokkan, tapi legalisir ditandatangani orang yang tidak berwenang' } },
 35: { opts: { A: 'Menelepon kedua kepala desa itu setiap kali peringatan dikirim, hingga mereka membalas.' } },
 36: { opts: { B: 'Membahas selisih ketiga desa dengan rekan senior setelah laporan tim terkirim hari Jumat.',
   C: 'Membahas selisih hasil ukur dengan rekan senior, karena laporan akan dikirim hari Jumat.' },
  rv2: 'B=4 (S1): selisih dibahas dengan orang yang tepat, tetapi setelah laporan terkirim dan menjadi dasar pembagian pupuk. E=3 (S5): sudah ke orangnya, tetapi lewat pesan yang langsung menyebut angka senior keliru, padahal ia ada di kantor. D=2+J3: naik ke kepala bidang sebelum rekan diajak bicara. A=1: hormat pada senior dijadikan alasan diam.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B membahasnya "setelah laporan tim terkirim hari Jumat", padahal laporan itu "dasar pembagian pupuk bersubsidi"; C membahasnya sebelum Jumat.',
  siswa: { B: 'orangnya sudah tepat, rekan senior itu sendiri. Hanya saja waktunya terlambat: begitu laporan terkirim Jumat, pupuk dibagi memakai angka yang keliru.' },
  jebakan: 'sebagai orang baru, menunggu laporan terkirim lebih dulu terasa paling sopan. Kalimat "dikirim Jumat sebagai dasar pembagian pupuk bersubsidi" membuat kesopanan itu mahal, karena pembagian pupuk di tiga desa itu ikut keliru.',
  sisa: { B: 'dibahas dengan rekan, tapi setelah laporan terkirim' } },
 39: { opts: { A: 'Menawarkan kedua kelompok itu jadwal malam hari, saat balai jarang dipesan.' },
  rv2: 'A=4 (S2)+J2: kedua kelompok dapat tempat, tetapi hanya di malam sisa yang jarang dipesan. C=3 (S4): pengecualian untuk bulan ini, dan beban merelakan ditanggung satu kelompok. B=2: suara mayoritas dijadikan dasar. E=1: keluhan dibiarkan sampai ada keberatan tertulis.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A menawarkan jadwal "malam hari, saat balai jarang dipesan", sisa waktu yang tidak diminati; D memberi giliran yang setara dalam jadwal bulanan.',
  siswa: { A: 'kedua kelompok akhirnya dapat tempat, dan itu kemajuan. Hanya saja mereka tetap menjadi penerima malam sisa yang jarang dipesan orang.' } },
 42: { opts: { D: 'Mencatat kedua kejadian dan saksinya, lalu menunggu satu ajakan lagi untuk dilaporkan.' },
  rv2: 'D=4 (S1): kejadian dicatat dan arah melapor benar, tetapi laporan ditahan sampai ada ajakan berikutnya, padahal kejadian kemarin Anda lihat sendiri dan ajakan terus berjalan. A=3 (S3)+J6: mengulang nasihat yang sudah gagal. E=2: hubungan dijaga dengan diam. B=1: kebebasan berkeyakinan dijadikan dalih membiarkan.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D "menunggu satu ajakan lagi untuk dilaporkan", padahal "Anda melihat sendiri" pembagian formulir kemarin; C melaporkan sekarang dengan dua kejadian yang sudah ada.',
  siswa: { D: 'catatanmu rapi, dan kamu memang berniat melapor. Hanya saja buktinya sudah kamu lihat kemarin. Menunggu ajakan berikutnya berarti menunggu ada relawan lain yang disodori formulir.' },
  jebakan: 'mencatat dan menunggu satu kejadian lagi terdengar teliti. Kata "melihat sendiri" di cerita menunjukkan buktinya sudah ada, dan menunggu lebih lama hanya memberi waktu bagi ajakan itu menyebar.',
  sisa: { D: 'dicatat, tapi lapor menunggu ajakan berikutnya' } },
 43: { opts: { A: 'Mengumumkan di grup pegawai bahwa pakaian adat daerah asal boleh dipakai.' },
  poin: { A: '4 S5 +J2(tidak masuk petunjuk pelaksanaan, risiko teguran tetap di pegawai)' },
  rv2: 'A=4 (S5)+J2: berlaku untuk semua pegawai, tetapi hanya berupa pengumuman di grup, bukan bagian petunjuk pelaksanaan; saat penilaian disiplin, risikonya tetap di pegawai. C=3 (S2): izin hanya untuk enam pegawai yang bertanya, pegawai luar daerah lain tidak tercakup. E=2: suara terbanyak dijadikan dasar menyeragamkan. D=1: tugas menyusun petunjuk dilempar ke bagian lain.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A "mengumumkan di grup pegawai", padahal "pelanggaran edaran masuk penilaian disiplin" dan Anda yang ditugasi menyusun petunjuk pelaksanaannya; B menuliskannya di petunjuk pelaksanaan sehingga pegawai terlindungi.',
  siswa: { A: 'semua pegawai jadi tahu, dan budaya mereka dihargai. Tapi pengumuman di grup bukan petunjuk pelaksanaan. Kalau nanti ada yang dinilai melanggar edaran, siapa yang menanggung? Pegawainya sendiri.' },
  jebakan: 'mengumumkan ke semua pegawai terdengar sudah adil. Kalimat "pelanggaran edaran masuk penilaian disiplin" membuat pengumuman itu berisiko, karena isi petunjuk yang kamu susun tetap tidak menyebut adat asal.',
  sisa: { A: 'diumumkan di grup, petunjuk pelaksanaan tetap diam' },
  pin: { arti: 'Pegawai butuh pegangan di petunjuk pelaksanaan, bukan sekadar izin.' } },
 44: { opts: { E: 'Menghubungi pengunggah, meminta waktu kejadian dan nomor kuitansinya untuk pemeriksaan.' } },
 45: { opts: { A: 'Menghapus poster itu dari grup, lalu menyematkan aturan larangan konten serupa.' },
  rv2: 'A=4 (S4): sebaran berhenti dan aturan grup dipasang, tetapi kedua pengirim tidak diajak bicara, termasuk yang bertanya apakah isinya benar; keraguannya dibiarkan. E=3 (S5)+J5: poster ditarik, tetapi kedua pengirim diancam di depan grup seolah pendukung, padahal satu di antaranya bertanya apakah isinya benar. C=2: keputusan dilempar ke atasan, poster tetap beredar. B=1: dibiarkan sampai ada yang keberatan.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A menghapus poster "lalu menyematkan aturan larangan konten serupa", padahal "Salah satu pengirim lalu bertanya di bawahnya apakah isinya benar"; D juga mengingatkan kedua pengirim sehingga pertanyaannya terjawab.',
  siswa: { A: 'grup jadi bersih, dan ada aturan yang tersemat. Hanya saja rekan yang bertanya apakah isinya benar tidak pernah mendapat jawaban. Aturan melarang, tapi tidak meluruskan.' },
  sisa: { A: 'dihapus dan aturan disematkan, pengirim tidak diajak bicara' } },
};
for (const [n, r] of Object.entries(R)) {
  const s = soal.find((x) => x.n === +n), b = bahas[n];
  Object.assign(s.opts, r.opts); Object.assign(s.poin, r.poin || {});
  if (r.rv2) b.reviu[2] = r.rv2;
  if (r.rv3a) { const g = b.reviu[3].split('<br>'); g[0] = r.rv3a; b.reviu[3] = g.join('<br>'); }
  Object.assign(b.siswa.opsi, r.siswa || {});
  for (const k of ['jebakan', 'tips', 'analogi']) if (r[k]) b.siswa[k] = r[k];
  for (const [l, t] of Object.entries(r.sisa || {})) { if (!(l in pin.soal[n].sisa)) throw new Error(`pindai ${n}: sisa ${l} tidak ada`); pin.soal[n].sisa[l] = t; }
  Object.assign(pin.soal[n], r.pin || {});
}
const head = fs.readFileSync(bahasF, 'utf8').split('\n')[0];
fs.writeFileSync(bahasF, head + '\nmodule.exports = ' + JSON.stringify(bahas, null, 1) + ';\n');
fs.writeFileSync(pinF, JSON.stringify(pin, null, 2) + '\n');
fs.writeFileSync(path.join(dir, 'patch.json'), JSON.stringify(Object.fromEntries(Object.entries(R).map(([n, r]) => [n, { opts: r.opts, ...(r.poin ? { poin: r.poin } : {}) }])), null, 1));
console.log('revisi', Object.keys(R).join(','));
