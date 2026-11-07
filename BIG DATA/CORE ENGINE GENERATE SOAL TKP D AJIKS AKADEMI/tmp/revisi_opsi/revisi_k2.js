// Revisi opsi nilai 4 Paket 2 soal 16–30 (aturan isi: nilai 4 sama lengkap, beda di inti aspek). usage: node revisi_k1.js <dir>
const fs = require('fs'), path = require('path'), dir = process.argv[2];
const soalF = path.join(dir, 'paket2_soal_16_30.js'), bahasF = path.join(dir, 'paket2_bahas_16_30.js'), pinF = path.join(dir, 'paket2_pindai.json');
const soal = require(soalF), bahas = require(bahasF), pin = JSON.parse(fs.readFileSync(pinF, 'utf8'));
const R = {
 17: { L: 'E', opt: 'Menghubungi penyedia internet agar pembaruan jaringan gedung ditunda sampai jam pulang kantor.',
  poin: { E: '4 S5' },
  rv2: 'E=4 (S5): dugaan jaringan masuk akal dan aplikasi bisa pulih hari ini, tetapi penundaan diminta sebelum penyebabnya dipastikan. B=3 (S2 +J5): menghapus arsip satu bidang berdasar dugaan. D=2: menghapus arsip semua bidang. A=1: surel pribadi untuk surat dinas.',
  rv3a: '<b>Kunci vs E (poin 4):</b> E meminta pembaruan jaringan "ditunda sampai jam pulang kantor", padahal penyebab perlambatan belum dipastikan; C memastikan sumber perlambatan lewat grafik beban server dan arus data jaringan dulu.',
  siswa: 'tebakanmu bisa jadi benar, memang ada pembaruan jaringan semalam, dan kalau benar aplikasinya pulih. Tapi itu tetap tebakan. Kalau ternyata servernya yang bermasalah, pekerjaan penyedia sudah tertunda percuma.',
  sisa: 'langsung yakin sebabnya jaringan dan meminta pekerjaan penyedia ditunda' },
 18: { L: 'B', opt: 'Meminta panitia hari ini memasukkan kembali sanggar itu, dengan menunjukkan salinan juknis.',
  poin: { B: '4 S3' },
  rv2: 'B=4 (S3): hari ini dan berbekal juknis, tetapi dibawa ke panitia yang mencoret, padahal penetapan peserta ada di tangan kepala bidang. E=3 (S2 +J4): sanggar masuk, tetapi sebagai peserta tamu, haknya separuh. D=2: ikut demi hubungan dengan camat. A=1: diam.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B meminta panitia "memasukkan kembali sanggar itu", padahal penetapan peserta ada di tangan kepala bidang; C menyerahkan daftar coretan dan salinan juknis kepada kepala bidang hari ini.',
  siswa: 'buktinya sudah kamu bawa, dan waktunya juga tepat, hari ini. Tapi kamu membawanya ke panitia yang mencoret, padahal yang berhak menetapkan peserta adalah kepala bidangmu.',
  tips: 'kalau keputusan ada di tangan pihak tertentu, bawa buktinya ke pihak itu, jangan berdebat dengan yang tidak berwenang. Cek juga tanggalnya.',
  sisa: 'bukti juknis dibawa hari ini, tapi ke panitia, bukan ke yang berwenang menetapkan' },
 24: { L: 'C', opt: 'Memproses izin sesuai syarat teknis, dengan pelapor diarahkan membawa aduannya ke kesbangpol.',
  rv2: 'C=4 (S4): izin diproses benar dan pelapor ditunjukkan alamat yang tepat, tetapi tuduhan dibiarkan bergantung pada kemauan pelapor. A=3 (S1 +J5): menunda izin seolah tuduhan sudah benar. D=2: membalik beban pembuktian ke yang dituduh. B=1: diam dan lempar ke kepala dinas.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C membuat pelapor "diarahkan membawa aduannya ke kesbangpol", sehingga laporan kerawanan bisa tidak pernah sampai; E meneruskan tuduhan tanpa bukti itu ke kesbangpol setempat.',
  siswa: 'izinnya diproses dengan benar, dan pelapor sudah ditunjukkan tempat mengadu. Hanya saja sampai tidaknya aduan itu tergantung pelapor, padahal belum tentu ia mau, apalagi kalau niatnya sebenarnya menjegal tetangga.' },
 26: { L: 'A', opt: 'Menambahkan satu OPD yang paling sering terlambat ke rute jemputan Kamis.',
  rv2: 'A=4 (S2): rute Kamis dipakai, tetapi hanya untuk satu OPD. C=3 (S4 +J3): naik ke sekretaris daerah untuk kendala yang bisa diatasi sendiri. B=2: peringatan, kurir tetap seminggu sekali. E=1: mencatat dan menunggu.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A menambahkan "satu OPD yang paling sering terlambat", padahal ketiga OPD terkendala kurir yang sama; D menambahkan tiga OPD itu ke jalur penjemputan Kamis.',
  siswa: 'arahnya sudah benar, memakai mobil jemputan Kamis. Tapi kenapa cuma satu? Dua OPD lain punya kendala kurir yang sama.' },
 29: { L: 'D', opt: 'Memperbarui syarat keempat lowongan itu di aplikasi sesuai informasi terbaru dari perusahaannya.',
  rv2: 'D=4 (S4): empat lowongan diperbarui, tetapi mitra lain bisa mengulang dan beban berpindah ke dinas. E=3 (S5): teguran tanpa mencocokkan isi aplikasi. C=2 +J2: beban mencari syarat ke pelamar. A=1: keluhan dilempar ke perusahaan.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D memperbarui "syarat keempat lowongan itu di aplikasi", sehingga mitra lain masih bisa mengubah syarat tanpa memperbarui aplikasi; B menetapkan kewajiban memperbarui syarat bagi seluruh mitra.' },
 30: { L: 'B', opt: 'Membatasi setoran satu pengepul paling besar, lalu menyisakan kuota untuk warga.',
  rv2: 'B=4 (S2): kuota warga disisakan, tetapi hanya satu pengepul yang dibatasi; pengepul besar lain tetap menghabiskan kuota. C=3 (S5 +J2): beban mendaftar dipindah ke warga, tidak pasti semua tahu. D=2: mendahulukan pengepul demi capaian. A=1: warga dilempar ke bank sampah swasta.',
  rv3a: '<b>Kunci vs B (poin 4):</b> B membatasi "satu pengepul paling besar", padahal setoran datang dari beberapa pengepul besar; E membatasi sementara setoran setiap pengepul per hari.',
  siswa: 'pengepul yang paling besar dibatasi dan kuota warga disisakan. Tapi pengepul besar lain masih bisa menghabiskan sisa kuota sebelum warga datang siang.' },
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
fs.writeFileSync(bahasF, '// Paket 2 pembahasan 16–30\nmodule.exports = ' + JSON.stringify(bahas, null, 1) + ';\n');
fs.writeFileSync(pinF, JSON.stringify(pin, null, 2) + '\n');
console.log('revisi', Object.keys(R).join(','));
