# Pelajaran produksi paket 1 TKP + jalan pintas paket 2–3 (2026-10-26)

Sumber: log produksi `~/.claude/skills/skd-expert/riset/2026-10-25-log-produksi-tkp-3paket.md` (batch 1–5, cek buta, reviu, terapan).
Status: **urutan DISETUJUI Gusti 2026-10-26** + tambahan cek buta per 15 soal. Ditolak/ditunda: rancang paket 2+3 sekaligus, sumber data JSON. Belum ada yang dieksekusi.

## Fakta biaya paket 1
- ±8 sesi: 5 batch tulis + cek buta + reviu + terapan.
- Script cek (`cek_lintas_paket.js` 0,09 dtk, `validate_soal.js` 0,06 dtk) **bukan** sumber boros.
- Boros sebenarnya = pekerjaan ulang:
  1. **28 dari 45 soal (62%) diedit setelah paket jadi** (reviu cek buta), termasuk pembahasan reviu + siswa yang sudah ditulis.
  2. **6 kali tukar latar** di blueprint saat menulis (1↔?, 14↔19, 12↔20, 27↔43, 35↔45, 43↔45): latar berdekatan / AR dobel latar baru ketahuan per batch.
  3. **Soal 31 ditulis ulang total**: konstruk kembar B80#59 baru ketahuan setelah soal ditulis.
  4. **Pembuka "Anda" 14×** baru ketahuan di Gerbang 4 (setelah 15 soal), ditulis ulang 13.
  5. Sebaran J (J2/J5/J6) "sementara error" tiap batch, diakali di akhir dengan geser label.
  6. Ubahan kecil per batch (kata pembuka opsi menumpuk di satu poin, fakta berbagi kata dengan kunci) — ketahuan setelah tulis.

## Pelajaran isi (dari reviu cek buta)
1. Kunci tertebak dari **jenis mekanisme** ("sepakati bersama / mekanisme baku"), bukan dari panjang. Validator panjang lolos, bocor tetap ada.
2. Poin 4 yang mengulang cara gagal di stem (J6) selalu kalah di cek buta (7, 13, 34) → jangan jadi poin 4.
3. "Lapor atasan" tanpa pemicu J3 pernah lolos skor 4 (9, 21) → maks 3.
4. Poin 3/4 satu kutub lemah (27, 30).
5. Kunci terlalu tersurat karena sarananya wajib disebut di stem (22, 25, 27, 30, 31, 34, 37): tegangan Pilar 4 no. 6 vs no. 11. Sarana disebut, tapi jangan dengan kata yang sama dengan kunci, dan sebut juga sarana kedua yang dipakai pengecoh.
6. Panduan 3v4 (rugi sekarang vs nanti) lemah di ±8 soal; dipakai sebagai alat timbang saja.
7. Mencabut kode J tanpa cek sisa kode → soal tanpa jebakan (40). Cek dulu.

## Jalan pintas (urutan baru)
**Prinsip: kunci isi soal sebelum menulis prosa; prosa (pembahasan) ditulis sekali, setelah beku.**

0. **Peta existing sekali bikin** → `tmp/peta_tkp.json` dari bank 80 + bank 12 + paket 1:
   per soal = dimensi, latar, konstruk ringkas, jenis mekanisme kunci, tindakan per skor (tabel tindakan sejenis).
   Dipakai saat memilih ide (lihat peta, pilih celah) → tidak menulis soal yang nanti kembar.
   `cek_lintas_paket.js` tetap jalan sebagai penjaga akhir (murah).
1. **Blueprint dikunci lebih banyak, dicek script sekali di awal** (`blueprint_tkp.js --cek` diperluas):
   - latar berdekatan (≥ jarak N) + tidak ada AR dobel per latar → hapus 6 tukar latar;
   - **jenis mekanisme kunci per slot** (sepakat / verifikasi / jadwal / tegur langsung / lapor / sarana pengganti …) berkuota; tiap slot ber-kunci "sepakat" otomatis dapat satu pengecoh "sepakat" (Pilar 4 no. 3a);
   - **pola pembuka stem per slot** (Anda+peran maks 2, waktu, tokoh, angka, kejadian …);
   - J per slot sudah ada → tambah syarat ≥ 1 kode per soal.
2. **Kartu ide 45 soal sekaligus** (1 baris per soal: latar · dilema · fakta penentu · kunci · p4 sumbu+alasan · p3 sumbu+alasan · p2 · p1) → dicek ke peta + checklist isi (pelajaran 2–5) → Gusti setujui per 15 baris. Murah token, menangkap cacat isi sebelum ada kalimat.
3. **Tulis stem + opsi + baris meta saja** (tanpa pembahasan), 15 soal per sesi → validate + cek_slot + lintas di salinan.
3b. **Cek buta per 15 soal** (subagent, versi tanpa pembahasan) setelah tiap batch tulis; pola cacat langsung jadi aturan untuk batch berikutnya.
4. **Reviu cek buta di versi tanpa pembahasan** → reviu putusan → terapkan (edit murah: hanya opsi + meta).
5. **Beku** → tulis Pembahasan Reviu + Siswa sekali, 15–23 soal per sesi.
6. Validator + PDF.

Perkiraan: 5–6 sesi per paket (vs ±8), dan tidak ada pembahasan yang ditulis dua kali.

## Kebiasaan hemat token (terbukti di sesi terapan)
- Edit lewat script ganti-teks (teks lama wajib muncul 1×; batch gagal = tidak ada yang tertulis) → 1 panggilan per 2–4 soal.
- Baca soal pakai filter (stem/opsi/Poin/Reviu saja), bukan Read seluruh blok; output validator: `errors` saja.
- Prompt sesi berikut + checkpoint log di tiap titik henti (sudah jalan).

## Cek tambahan yang layak masuk validator (belum dibuat)
- pembuka stem: kata pertama sama > 2× per paket → error per batch (bukan baru di Gerbang 4);
- opsi poin 4 berkode J6 → peringatan; opsi "lapor/kepala/pimpinan/atasan" ber-skor ≥ 4 tanpa field pemicu J3 → peringatan;
- hitung ulang "≥ 1 kode J per soal" setiap kali label diubah (sudah ada; disiplin menjalankannya).
