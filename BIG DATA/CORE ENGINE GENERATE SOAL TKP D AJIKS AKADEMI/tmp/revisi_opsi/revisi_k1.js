// Revisi opsi nilai 4 Paket 2 soal 1–15 (aturan isi: nilai 4 sama lengkap, beda di inti aspek). usage: node revisi_k1.js <dir>
const fs = require('fs'), path = require('path'), dir = process.argv[2];
const soalF = path.join(dir, 'paket2_soal_01_15.js'), bahasF = path.join(dir, 'paket2_bahas_01_15.js'), pinF = path.join(dir, 'paket2_pindai.json');
const soal = require(soalF), bahas = require(bahasF), pin = JSON.parse(fs.readFileSync(pinF, 'utf8'));
const R = {
 1: { L: 'E', opt: 'Menghentikan pembagian selebaran, lalu mengeluarkan relawan itu sesuai tata tertib.',
  poin: { E: '4 S4 +J4(berhenti di tata tertib, lembar isian dua perawat tak tersentuh)' },
  rv2: 'E=4 (S4 +J4): pembagian dihentikan dan relawan dikeluarkan sesuai tata tertib, tetapi lembar isian dua perawat tidak sampai ke bagian umum. D=3 (S1): bukti disimpan, tetapi penyerahan ditunda sampai acara selesai sehingga pembagian bisa berlanjut. C=2: mempermalukan di grup, tidak menghentikan. A=1: kebebasan berpendapat dipakai sebagai dalih membiarkan ajakan.',
  rv3a: '<b>Kunci vs E (poin 4):</b> E menghentikan pembagian lalu mengeluarkan relawan "sesuai tata tertib", padahal "Dua perawat sudah ikut mengisi formulirnya"; B menyerahkan selebaran dan lembar isian kepada bagian umum sehingga pendaftaran dua perawat ikut ditangani.',
  siswa: 'menghentikan selebaran lalu mengeluarkan relawannya memang meredam masalah di acara, dan ada aturannya. Tapi formulir yang sudah diisi dua perawat tidak sampai ke bagian umum yang mengawasi kegiatan pihak luar.',
  jebakan: 'E menggoda karena selebarannya juga dihentikan dan terdengar tegas. Bedanya ada di formulir dua perawat.',
  sisa: 'selebaran berhenti dan relawan keluar, tapi lembar isian dua perawat tidak sampai ke bagian umum' },
 3: { L: 'E', opt: 'Membersihkan angka ganda di rekap hari ini, lalu mengirimnya tepat waktu.',
  rv2: 'E=4 (S4): rekap hari ini bersih dan terkirim tepat waktu, tetapi besok angka ganda muncul lagi karena akarnya tetap. D=3 (S2 +J6): format baru hanya untuk regu sendiri dan kembali mengingatkan, cara yang sudah gagal. C=2: mengirim data yang diketahui salah. B=1: mengucilkan relawan.',
  rv3a: '<b>Kunci vs E (poin 4):</b> E membersihkan "angka ganda di rekap hari ini", sehingga tiga regu besok tetap menulis dengan cara masing-masing; A memberlakukan satu format isian untuk ketiga regu.',
  siswa: 'rekap hari ini jadi bersih dan tetap terkirim tepat waktu. Tapi besok kamu harus membersihkannya lagi, karena ketiga regu masih menulis dengan cara masing-masing.',
  jebakan: 'E menggoda karena dua-duanya beres: angkanya bersih, kirimnya tepat waktu. Coba bayangkan besok pagi: kamu membersihkan angka yang sama lagi.' },
 5: { L: 'C', opt: 'Melayani lewat formulir manual sesuai KTP, kasusnya dititipkan ke petugas mitra di mal.',
  rv2: 'C=4 (S5): layanan sesuai KTP sudah benar, tetapi kasus berhenti di petugas mitra tanpa dipastikan sampai ke pengelola. E=3 (S4): permohonan jalan, tetapi data identitas dikosongkan memakai akun admin. A=2 +J5: menduga data warga keliru. D=1: berkorban di hari libur, tidak menyelesaikan sistem.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C menyampaikan kasus yang "dititipkan ke petugas mitra di mal", sehingga kasus tidak dipastikan sampai ke pengelola yang bisa mengubah aplikasi; B meneruskan kasus ke pengelola aplikasi.',
  siswa: 'pelayanannya sudah benar, sesuai KTP pula. Sayangnya kasusnya hanya dititipkan ke petugas mitra di mal, dan kamu tidak tahu apakah sampai ke tim yang bisa memperbaiki aplikasi.' },
 7: { L: 'A', opt: 'Mengirim jadwal resmi ke grup pemandu hari ini, menggantikan jadwal lama.',
  poin: { A: '4 S3', E: '2 +J5(menilai penghubung kurang cermat, padahal ia belum memegang versi terakhir)' },
  rv2: 'A=4 (S3): jadwal di grup diganti hari ini, tetapi penghubung dilewati; penghubung yang baru bergabung tetap tidak memegang versi terakhir. D=3 (S1): dibahas di rapat sehari setelah festival. E=2 +J5: menyalahkan mitra di grup, padahal ia belum memegang versi terakhir. B=1: sibuk di situs, grup pemandu tetap memegang jadwal salah.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A mengirim jadwal yang "menggantikan jadwal lama", tetapi penghubung yang "belum memegang versi terakhir" tidak ikut dibereskan; C menemui penghubung itu sehingga jadwal diganti dan penghubung memegang versi terakhir.',
  siswa: 'jadwal di grup memang langsung beres. Tapi penghubung pokdarwis dilewati, padahal ia belum memegang versi terakhir. Kiriman berikutnya darinya bisa salah lagi, dan ia merasa dilangkahi.',
  jebakan: 'A menggoda karena jadwal di grup langsung benar hari ini. Coba ingat penghubung yang belum memegang versi terakhir.',
  tips: 'kalau kekeliruan datang dari mitra, bereskan bersama orangnya, supaya kesalahan yang sama tidak terulang.',
  analogi: 'kalau temanmu salah menyebar alamat undangan di grup keluarga, kamu minta dia sendiri yang meralat, bukan meralatnya diam-diam sementara temanmu tetap memegang alamat lama.',
  sisa: 'jadwal di grup beres, tapi penghubung dilewati dan tetap memegang jadwal lama' },
 8: { L: 'D', opt: 'Menjemput sampel tiap Selasa ke satu desa dengan keluhan terbanyak, lalu mengujinya.',
  rv2: 'D=4 (S2): sampel dijemput tiap Selasa memakai sarana yang ada, tetapi hanya satu desa; tiga desa lain tidak. B=3 (S3): beban mengumpulkan dilempar ke kepala desa. E=2 +J1: mengulang "pagi hari" dari soal, warga desa tetap harus datang membawa sampel sendiri. A=1: bagi rata seluruh kabupaten, tidak menyasar yang paling terdampak.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D menjemput sampel "ke satu desa dengan keluhan terbanyak", padahal yang jarang terlayani ada empat desa; C menjadwalkan pengambilan keliling ke desa sekitar pabrik.',
  siswa: 'menjemput sampel tiap Selasa itu ide yang tepat. Sayangnya yang dijangkau satu desa saja, padahal ada tiga desa lain yang juga jarang terlayani.' },
 10: { L: 'A', opt: 'Menolak perubahan rekening itu, lalu memperingatkan rekan bagian keuangan agar waspada.',
  rv2: 'A=4 (S3): perubahan ditolak dan rekan diperingatkan, tetapi bank tidak dihubungi dan unit TI, yang menangani pengamanan surel instansi, tidak tahu. C=3 (S5): kop dan tanda tangan mudah ditiru, pengirim tidak dipastikan. D=2 +J4: syarat meterai, keaslian pengirim tidak dicek. E=1: melempar ke penyedia.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A menolak perubahan dan "memperingatkan rekan bagian keuangan", padahal pengamanan surel instansi ditangani unit TI; B memastikan lewat nomor bank resmi dan melapor ke unit TI.',
  siswa: 'menolak perubahan dan memperingatkan rekan itu sudah sigap. Tapi bank tidak dihubungi lewat nomor resminya, dan unit TI tidak tahu ada surel palsu yang beredar di kantor.',
  sisa: 'ditolak dan rekan diingatkan, tapi bank dan unit TI tidak tahu ada penipuan' },
 11: { L: 'D', opt: 'Mendahulukan makanan siap saji, lalu meminta penghubung mitra menyusun giliran sisanya.',
  rv2: 'D=4 (S3): makanan siap saji didahulukan, tetapi giliran sisanya diserahkan ke pihak mitra, padahal koordinatornya Anda. E=3 (S5): giliran dikirim ke sopir tanpa konfirmasi penghubung; pihak yang mengatur muatan belum tentu tahu. B=2 +J3: lapor kepala dinas untuk urusan wewenang sendiri. C=1: urutan datang, makanan bisa basi.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D "meminta penghubung mitra menyusun giliran sisanya", padahal Anda yang ditunjuk sebagai koordinator gudang; A menyusun gilirannya sendiri dan memastikannya ke penghubung tiap pihak.',
  siswa: 'makanan yang cepat basi sudah didahulukan, itu tepat. Tapi giliran sisanya kamu serahkan ke salah satu mitra, padahal koordinatornya kamu, dan dua pihak lain belum tentu mau diatur sesama mitra.',
  sisa: 'makanan didahulukan, tapi sisa giliran diserahkan ke satu mitra, padahal koordinatornya kamu' },
 14: { L: 'B', opt: 'Mendatangi kantor pengembang, lalu meminta titik dikoreksi mengikuti peta daring umum.',
  rv2: 'B=4 (S5): pengembang didatangi langsung, tetapi patokan koreksi peta daring umum, bukan data batas resmi. C=3 (S3): operator sekolah menghitung manual, aplikasi tetap salah. E=2 +J6: surel ketiga, cara yang dua kali gagal. A=1: bagi rata kuota.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B meminta titik dikoreksi "mengikuti peta daring umum", padahal peta umum bukan data batas resmi; D mencocokkan titik kelurahan bersama bagian tata pemerintahan dan pengembang.',
  siswa: 'mendatangi pengembang sudah tepat, karena surel tidak dibalas dan kantornya dekat. Tapi patokannya peta daring umum, bukan data resmi kelurahan, jadi titiknya bisa tetap meleset.',
  jebakan: 'B menggoda karena sudah mendatangi pengembang. Coba lihat patokan titiknya.',
  tips: 'kalau surel tidak dibalas tapi kantornya dekat, temui langsung, lalu pastikan perbaikannya memakai data resmi.',
  sisa: 'pengembang didatangi, tapi titiknya dikoreksi pakai peta umum, bukan data resmi' },
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
fs.writeFileSync(bahasF, '// Paket 2 pembahasan 1–15\nmodule.exports = ' + JSON.stringify(bahas, null, 1) + ';\n');
fs.writeFileSync(pinF, JSON.stringify(pin, null, 2) + '\n');
console.log('revisi', Object.keys(R).join(','));
