// Revisi opsi Paket 1 soal 1–15 (engine v1.3.5 Pilar 4 no. 2a + aturan huruf no. 2). usage: node revisi_p1_k1.js <dir>
const fs = require('fs'), path = require('path'), dir = process.argv[2];
const soalF = path.join(dir, 'paket1_soal_01_15.js'), bahasF = path.join(dir, 'paket1_bahas_01_15.js'), pinF = path.join(dir, 'paket1_pindai.json');
const soal = require(soalF), bahas = require(bahasF), pin = JSON.parse(fs.readFileSync(pinF, 'utf8'));
const R = {
 3: { opts: { D: 'Mengirim rekap tepat waktu, lalu menyusulkan daftar hadir kelas itu dari dosennya.' },
  rv2: 'D=4 (S1): rekap terkirim tepat waktu dan daftar hadir kelas itu disusulkan dari sumber yang sah, tetapi susulannya datang sesudah rekap dipakai menetapkan izin bermalam; ruginya nanti, saat taruna kelas itu sudah diputus dengan data kosong. E=3 (S2, +J4): jauh lebih luas dari yang perlu (tanda tangan seluruh dosen, rekap disusun dari awal); rekap terlambat sekarang. C=2: ikut saran senior, taruna satu kelas tercatat tidak hadir. B=1: menunggu perbaikan mesin tanpa batas waktu, melewati tenggat.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D mengirim rekap lebih dulu, "lalu menyusulkan daftar hadir kelas itu dari dosennya", padahal "izin bermalam akhir pekan ditetapkan dari rekap itu", jadi susulannya datang terlambat; A melengkapi data sebelum rekap dipakai.',
  siswa: { D: 'tepat waktu, dan daftar hadirnya pun diambil dari dosen yang benar. Hanya urutannya terbalik: rekap sudah dipakai memutuskan izin bermalam sebelum susulan itu datang. Taruna kelas itu bisa kehilangan izin karena data yang sebenarnya ada.' },
  jebakan: 'D tampak lengkap: tepat waktu, sumber datanya juga dosen kelas itu. Ia gugur karena urutan, sebab izin bermalam keburu diputuskan sebelum data susulan masuk.',
  sisa: { D: 'tepat waktu, daftar dosen menyusul setelah izin diputuskan' } },
 4: { opts: { C: 'Meliburkan keduanya malam dan hari Natal, lalu meminta rekan lain mengisi piketnya.' },
  rv2: 'C=4 (S4): libur sesuai kebutuhan dua petugas dan piketnya terisi, tetapi pengaturan berhenti di Natal tahun ini; Idulfitri nanti mulai dari nol (rugi nanti). E=3 (S5, +J1): berlaku untuk semua agama, tetapi jatah "sepekan" ditetapkan tanpa ditanyakan, bertentangan dengan pernyataan dua petugas; rugi sekarang (libur yang tidak diminta, piket kekurangan orang). D=2: mayoritas menang, abai pada yang bersangkutan. A=1 (aktif-d): berkorban buta, penyusunan piket tidak selesai.',
  rv3a: '<b>Kunci vs C (poin 4):</b> C meliburkan keduanya "malam dan hari Natal, lalu meminta rekan lain mengisi piketnya", padahal soal menyebut "giliran rekan lain merayakan Idulfitri"; B menanyakan kebutuhan tiap petugas, jadi tukar piket berlaku juga untuk hari besar berikutnya.',
  siswa: { C: 'dua petugas itu libur persis sesuai kebutuhannya, dan piketnya pun terisi. Rapi untuk Natal tahun ini. Lalu bagaimana saat Idulfitri tiba? Kamu mengatur dari nol lagi, karena tidak ada cara yang disiapkan.' },
  sisa: { C: 'pas untuk Natal dan piket terisi, Idulfitri belum disiapkan' } },
 5: { opts: { C: 'Mengajak rekan menerbitkan tanda terima tertunda, lalu menyepakati cara mempercepat antrean.',
   D: 'Menerbitkan tanda terima ketiga berkas tadi, lalu meminta rekan kembali mengikuti SOP.' },
  rv2: 'D=4 (S4): tiga pemohon mendapat tanda terima dan rekan diminta kembali ke SOP, tetapi alasannya melanggar (antrean ingin cepat) tidak disentuh; kebiasaan sejak Senin mudah terulang, ruginya nanti. E=3 (S1): teguran langsung dan cara mempercepat antrean ikut disepakati, tetapi baru "mulai besok"; tiga pemohon yang menunggu tetap tanpa tanda terima, rugi sekarang. Pengecoh berbunyi sepakat (Pilar 4 no. 3a). A=2+J6: demi relasi, mengulang candaan yang di soal sudah tak digubris. B=1 (aktif-e): kelancaran antrean dijadikan dalih ikut melanggar.',
  rv3a: '<b>Kunci vs D (poin 4):</b> D "meminta rekan kembali mengikuti SOP", padahal ia melewatinya "agar antrean cepat" dan "melakukannya sejak Senin", jadi alasannya tetap ada besok; C menyepakati cara mempercepat antrean bersama rekan, sehingga alasan melewati SOP hilang.',
  siswa: { D: 'tiga pemohon terlayani, dan rekanmu diingatkan soal SOP. Coba tanya dulu: kenapa ia melewati SOP sejak Senin? Supaya antrean cepat. Selama antrean masih menekan, permintaan kembali ke SOP gampang terlupa lagi.' },
  sisa: { D: 'pemohon beres, rekan diingatkan SOP, alasan antrean tetap ada' } },
 9: { opts: { E: 'Mengakhiri apel dengan tenang, lalu menegur rekan empat mata atas sikap bencinya.' },
  rv2: 'E=4 (S1, +J5): teguran langsung oleh pemimpin apel, tetapi sesudah apel berakhir; penguji muda yang ikut tertawa tidak mendengar koreksi, dan "sikap benci" divonis sebelum dicek. A=3 (S3, +J3): lapor kepala balai tanpa pemicu J3 (tidak ada benturan wewenang, darurat, atau pola di luar wewenang); Anda yang memimpin apel dan berwenang meluruskan saat itu. B=2: demi suasana dan relasi. D=1: lepas tangan.',
  rv3a: '<b>Kunci vs E (poin 4):</b> E "mengakhiri apel dengan tenang" baru menegur empat mata, padahal "Beberapa penguji muda ikut tertawa" dan perlu mendengar koreksinya, lalu langsung menuduh "sikap bencinya"; C mengoreksi saat itu juga di depan peserta yang sama, tanpa menebak isi hati.' },
 13: { opts: { E: 'Menyimpan flashdisk itu terpisah, lalu meminta kelompoknya mengirim ulang berkas lewat surel.' },
  rv3a: '<b>Kunci vs E (poin 4):</b> E menyimpan flashdisk "terpisah" lalu meminta berkas lewat surel, padahal flashdisk itu sudah sempat dicolokkan dan dinas "punya pengelola jaringan untuk perangkat bermasalah"; B membawanya ke petugas jaringan, sehingga perangkat yang terkena ikut diperiksa.',
  siswa: { E: 'flashdisk disingkirkan dan proposal tetap masuk lewat surel. Rapi. Masalahnya, flashdisk itu sudah sempat masuk ke komputermu. Siapa yang memeriksa komputernya?' },
  jebakan: 'banyak yang memilih E karena flashdisk-nya disingkirkan. Padahal antivirus baru berbunyi setelah flashdisk dicolokkan, jadi komputernya juga perlu diperiksa.',
  sisa: { E: 'flashdisk disimpan terpisah, komputer yang sudah tercolok tidak diperiksa' } },
 15: { opts: { A: 'Mencopot pamflet, lalu meminta kepala bidang menghapus fotonya dan menemui kedua perawat.' },
  poin: { A: '4 S3 +J3(foto di grup yang Anda kelola diserahkan ke kepala bidang)' },
  rv2: 'A=4 (S3, +J3): pamflet dicopot dan semua urusan tersentuh, tetapi penghapusan foto di grup yang Anda kelola sendiri dan pertemuan dengan dua perawat dilempar ke kepala bidang; selama menunggu, foto terus beredar. C=3 (S1): sebaran baru dihentikan setelah penempelnya dicari; foto terus beredar selama pencarian. E=2: setengah jalan demi suasana, pamflet dibiarkan. B=1: pasif dengan dalih bukan urusan pelayanan.',
  rv3a: '<b>Kunci vs A (poin 4):</b> A "meminta kepala bidang menghapus fotonya dan menemui kedua perawat", padahal Anda sendiri yang "mengelola papan pengumuman serta grup itu"; D menghapus foto dan menemui kedua perawat sendiri, sekarang.',
  siswa: { A: 'pamfletnya kamu copot, bagus. Tapi foto di grup dan dua perawat itu kamu serahkan ke kepala bidang, padahal grupnya kamu sendiri yang kelola. Selama menunggu beliau, fotonya terus diteruskan.' },
  jebakan: 'A terdengar lengkap: pamflet dicopot, foto dan dua perawat juga diurus. Yang terlupa, kamu sendiri pemegang papan dan grup itu, jadi tidak perlu menunggu atasan.',
  sisa: { A: 'pamflet dicopot, foto dan dua perawat diserahkan ke kepala bidang' } },
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
