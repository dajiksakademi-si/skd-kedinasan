---
name: skd-belajar
description: Sesi belajar harian Lead Instructor SKD D'Ajiks — riset & analisis mendalam satu topik kurikulum (TWK/TIU/TKP/domain resmi), dokumentasi ke riset/sesi-NN.md, perbarui reference skd-expert, tulis usulan temuan web untuk direview Gusti. Dipicu manual dengan /skd-belajar.
disable-model-invocation: true
---

# /skd-belajar — satu sesi belajar Lead Instructor SKD

Target 20–40 menit. Semua file di `~/.claude/skills/skd-expert/`. **Jangan pernah** mengubah file di folder project (engine, bank, script, PDF), commit, atau push dalam sesi ini — project hanya dibaca.

Variabel:
- `SKILL=~/.claude/skills/skd-expert`
- `ROOT="/Users/gustiputuyudawirashana/Downloads/PROJECT SKD KEDINASAN /BIG DATA"` (spasi di akhir nama project)
- `MEM=~/.claude/projects/-Users-gustiputuyudawirashana-Downloads-PROJECT-SKD-KEDINASAN-/memory`

## 0. Mulai
1. Baca `$SKILL/SKILL.md`, `$SKILL/references/belajar-log.md`, `$SKILL/references/bahan.md`. Nomor sesi = nomor terakhir + 1.
2. Baca topik sesi di `~/.claude/skills/skd-belajar/kurikulum.md`.
3. Cek file project yang berubah sejak sesi terakhir: `find "$ROOT" -newer "$SKILL/references/belajar-log.md" -type f -not -path '*/node_modules/*' -not -path '*/.git/*' -not -name '.DS_Store'`. File baru/berubah yang relevan → catat di `bahan.md`.

## 1. Proses usulan lama
Untuk setiap `$SKILL/usulan/*.md` (`[x]` dan `[X]` sama; **baris Keputusan tidak pernah diedit** oleh agent):
- Terima dan tolak sama-sama dicentang → jangan diproses, tanyakan Gusti di ringkasan.
- `[x] terima` → gabungkan ke reference di "Dampak", tulis fakta + label `[terverifikasi: URL, tanggal]`. Pindahkan butir ke `$SKILL/usulan/arsip/<file>` dengan catatan "diterima sesi N".
- `[x] tolak` → pindah ke arsip, catatan "ditolak sesi N". Jangan diusulkan ulang kecuali ada sumber baru yang lebih kuat.
- Belum ditandai → biarkan. Jangan menebak keputusan Gusti. File usulan kosong → hapus.

## 2. Riset internal (langsung ke reference)
1. Baca bahan topik sesi. PDF: `pdftotext -layout "<file>" - | sed -n 'A,Bp'` per potongan (jangan dump seluruh ebook sekaligus — hemat konteks). Gambar figural: Read halaman PDF dengan `pages`.
2. Analisis mendalam ditulis ke `$SKILL/riset/sesi-NN.md`:
   - **Ringkasan bahan:** isi, struktur, tipe soal.
   - **Pola konstruksi:** cara stem dibangun, cara kunci dibedakan, jenis pengecoh.
   - **Perbandingan dengan engine D'Ajiks:** apa yang sama, yang lebih baik di bahan, dan yang lebih baik di engine kita.
   - **Uji mutu:** contoh soal yang diaudit dengan gerbang engine, berisi kunci + cacat bila ada.
   - **Pelajaran untuk mengajar:** aturan yang bisa dipakai siswa.
   - **Celah & tindak lanjut.**
   - Setiap klaim dari bahan menyertakan `sumber: \`path\`` (+ halaman). Jangan menyalin soal pihak lain utuh dalam jumlah besar; kutip seperlunya untuk analisis.
3. Perbarui reference terkait (`twk`, `tkp`, `tiu`, `aturan-tetap`, `bahan`). Fakta baru wajib ada path asalnya.
   - Bila bertentangan dengan engine: tulis `KONFLIK:` lalu `RESOLUSI:` (engine asli > catatan project > reference).
   - Bila tidak bisa diputuskan: jadikan pertanyaan untuk Gusti.
4. Engine asli **tidak** diedit. Usulan perubahan engine ditulis di `riset/sesi-NN.md` bagian "Usulan perubahan engine" untuk diputuskan Gusti.

## 3. Riset eksternal → usulan
1. WebSearch sesuai topik; buka halaman yang menentukan. Utamakan sumber resmi: BKN, KemenPANRB, JDIH, sscasn/dikdin, kementerian/sekolah kedinasan. Bimbel/forum/blog boleh, keyakinan maksimal **sedang**.
2. Hanya temuan yang **mengubah atau menambah** pengetahuan yang jadi usulan. Tanpa sumber = bukan usulan. Jangan mengarang angka, pasal, tanggal.
3. Tulis `$SKILL/usulan/YYYY-MM-DD.md`, format tiap butir **persis**:

```
## U-YYYY-MM-DD-NN — <judul singkat>
- Temuan: ...
- Sumber: <URL>, tanggal terbit, jenis (resmi / media / forum)
- Keyakinan: tinggi / sedang / rendah + alasan
- Dampak: reference mana, kalimat apa yang berubah
- Keputusan: [ ] terima  [ ] tolak   catatan Gusti:
```
4. Maksimal 5 butir per sesi. Temuan eksternal **tidak pernah** langsung masuk reference.

## 4. Tutup sesi
1. Tambah entri `## Sesi N — <topik> · YYYY-MM-DD` di `belajar-log.md`: file dibaca (penuh/inti), reference berubah, file riset, usulan dibuat/diterima/ditolak, pertanyaan untuk Gusti.
2. Perbarui status baca di `bahan.md`.
3. `python3 ~/.claude/skills/skd-expert/cek.py` → harus `cek OK`. Gagal → perbaiki file buatanmu; **jangan pernah** mengubah centang/catatan Gusti.
4. Milestone (keputusan Gusti, aturan baru, temuan non-trivial) → simpan ke memory project `$MEM` (satu fakta per file + baris di `MEMORY.md`).
5. Ringkasan di chat untuk Gusti (singkat, bahasa Indonesia): temuan utama, reference yang berubah, path usulan yang perlu dicentang, satu pertanyaan bila ada.
6. Konteks sudah panjang → checkpoint sudah tertulis di log; minta Gusti `/compact` atau sesi baru.
