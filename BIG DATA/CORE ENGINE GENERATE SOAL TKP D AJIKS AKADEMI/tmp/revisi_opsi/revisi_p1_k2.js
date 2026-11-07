// Revisi opsi Paket 1 soal 16–30 (engine v1.3.5 Pilar 4 no. 2a + aturan huruf no. 2). usage: node revisi_p1_k2.js <dir>
const fs = require('fs'), path = require('path'), dir = process.argv[2];
const soalF = path.join(dir, 'paket1_soal_16_30.js'), bahasF = path.join(dir, 'paket1_bahas_16_30.js'), pinF = path.join(dir, 'paket1_pindai.json');
const soal = require(soalF), bahas = require(bahasF), pin = JSON.parse(fs.readFileSync(pinF, 'utf8'));
const R = {
 18: { opts: { C: 'Meminta kepala dusun meralat ucapannya setelah daftar disahkan di rapat itu.' },
  rv2: 'C=4 (S1): ralat diminta dari orang yang tepat dan di depan forum yang sama, tetapi baru setelah daftar disahkan; peserta menimbang daftar dengan kesan candaan itu wajar. B=3 (S3): lapor ke camat sebagai ujaran kebencian, padahal yang memandu rapat adalah Anda; candaan dibiarkan sekarang. E=2+J6: mengalihkan lagi, cara yang tadi tidak mempan. D=1: berkorban tenaga, tetapi keluarga itu dijauhkan dari rapat dan ucapannya tidak dibantah.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C meminta ralat "setelah daftar disahkan di rapat itu", padahal "daftarnya disahkan hari ini juga" dan candaan itu menyangkut siapa yang dicoret; A meluruskan sebelum daftar disahkan.',
  siswa: { C: 'ralatnya diminta di depan forum yang sama, dan itu bagus. Masalahnya jam: daftar sudah disahkan ketika ralat itu datang. Keluarga pendatang itu sudah ditimbang sambil semua orang membawa candaan tadi di kepalanya.' },
  sisa: { C: 'ralat diminta, tapi setelah daftar disahkan' } },
 20: { opts: { A: 'Mengantar pasien yang menolak dokter laki-laki ke ruang dokter perempuan sif pagi.' } },
 21: { opts: { C: 'Menemui petugas rekam medis, menyepakati daftar periksa, lalu melengkapi berkas tertunda.',
   D: 'Mengembalikan berkas kurang ke rekam medis, lalu menerbitkan akta dari berkas yang lengkap.' },
  rv2: 'D=4 (S4): berkas langsung dikembalikan dan akta terbit dari berkas yang lengkap, tetapi rumah sakit tidak pernah diajak bicara; tenaga dua pihak habis untuk bolak-balik dan kekurangan tidak berhenti. A=3 (S1): rapat evaluasi baru bulan depan, sementara kiriman Jumat berikutnya tetap kurang. E=2+J2: beban dipindah ke orang tua, padahal kerja sama ini justru supaya orang tua tidak perlu datang. B=1: menunggu rumah sakit sadar sendiri.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D "mengembalikan berkas kurang ke rekam medis" lalu menunggu lengkap, padahal kekurangan ini "belum pernah Anda bicarakan dengan mereka"; C membicarakannya dan menyepakati daftar periksa.',
  siswa: { D: 'tegas, dan akta tetap terbit dari berkas yang lengkap. Hanya saja, rumah sakit menerima berkas kembali tanpa tahu apa yang kurang, karena belum pernah ada yang bilang. Jumat depan bisa terulang.' },
  sisa: { D: 'berkas dikembalikan, akta terbit dari yang lengkap, tanpa dibicarakan' } },
 25: { opts: { B: 'Menagih laporan yang terlambat lewat telepon, lalu menyalin semuanya ke satu format.' },
  rv2: 'B=4 (S4): rekap selesai dalam satu format, tetapi tenaga Anda habis menagih dan menyalin laporan orang lain tiap bulan; cara relawan menulis dan mengirim tidak berubah. E=3 (S2): hanya dua relawan yang terlambat, padahal bentuk laporan keenam relawan berbeda-beda. C=2+J4: berhenti di surat edaran kewajiban. A=1: memaklumi tanpa langkah.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B menagih lewat telepon "lalu menyalin semuanya ke satu format" tiap bulan, jadi bentuk yang berbeda-beda dan keterlambatan terus berulang; D menyepakati format dan tenggat sekali untuk seterusnya.',
  siswa: { B: 'rekapmu jadi rapi dalam satu format, dan laporan yang telat tertagih. Bulan depan? Kamu menagih dan menyalin lagi, karena relawan tetap menulis dengan caranya masing-masing.' },
  sisa: { B: 'ditagih lalu disalin ulang tiap bulan' } },

};
for (const [n, r] of Object.entries(R)) {
  const s = soal.find((x) => x.n === +n), b = bahas[n];
  Object.assign(s.opts, r.opts); Object.assign(s.poin, r.poin || {});
  if (r.rv2) b.reviu[2] = r.rv2;
  if (r.rv3a) { const g = b.reviu[3].split('<br>'); g[0] = r.rv3a; b.reviu[3] = g.join('<br>'); }
  Object.assign(b.siswa.opsi, r.siswa || {});
  for (const k of ['jebakan', 'tips', 'analogi']) if (r[k]) b.siswa[k] = r[k];
  for (const [l, t] of Object.entries(r.sisa || {})) { if (!(l in pin.soal[n].sisa)) throw new Error(`pindai ${n}: sisa ${l} tidak ada`); pin.soal[n].sisa[l] = t; }
}
const head = fs.readFileSync(bahasF, 'utf8').split('\n')[0];
fs.writeFileSync(bahasF, head + '\nmodule.exports = ' + JSON.stringify(bahas, null, 1) + ';\n');
fs.writeFileSync(pinF, JSON.stringify(pin, null, 2) + '\n');
fs.writeFileSync(path.join(dir, 'patch.json'), JSON.stringify(Object.fromEntries(Object.entries(R).map(([n, r]) => [n, { opts: r.opts, ...(r.poin ? { poin: r.poin } : {}) }])), null, 1));
console.log('revisi', Object.keys(R).join(','));
