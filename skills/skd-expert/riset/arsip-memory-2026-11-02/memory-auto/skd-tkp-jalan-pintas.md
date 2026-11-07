---
name: skd-tkp-jalan-pintas
description: Usulan urutan produksi TKP paket 2–3 dari pelajaran paket 1 (62% soal diedit ulang); DISETUJUI Gusti 2026-10-26 + cek buta per 15 soal
metadata:
  type: project
---

Paket 1 TKP butuh ±8 sesi; boros terbesar = pekerjaan ulang (28/45 soal diedit setelah cek buta, 6 tukar latar, soal 31 ditulis ulang, pembuka "Anda" 14×), bukan waktu script (lintas 0,09 dtk). Usulan 2026-10-26: peta existing JSON → blueprint kunci latar/jenis mekanisme kunci/pembuka → kartu ide 45 baris → tulis stem+opsi saja → cek buta → beku → pembahasan sekali. Detail: `~/.claude/skills/skd-expert/riset/2026-10-26-pelajaran-paket1-jalan-pintas.md`.

**Why:** Gusti minta generate tanpa kerja berulang, hemat waktu + token tanpa turun kualitas.

**How to apply:** sebelum paket 2, baca file riset itu; urutan sudah disetujui; langkah 0 (peta) selesai; langkah 1 (2026-10-26): `tmp/blueprint_tkp.js --cek` diperluas (latar jarak/AR/peta, mekanisme berkuota, pembuka, kode J) + `blueprint_paket2.json` lolos, disetujui + BEKU (tukar 9↔11, 31↔33). Langkah 2 selesai 2026-10-26: 45 kartu ide di `tmp/kartu_ide_paket2.md` disetujui; langkah 3: soal 1–15 ditulis + cek buta + diperbaiki; soal 16–30 ditulis + cek buta (poin 4 11/15) + 6 perbaikan 2026-10-26; soal 31–45 ditulis + cek buta (poin 4 10/15) + 6 perbaikan 2026-10-26; reviu 45 selesai 2026-10-26 (5 perbaikan disetujui: pembuka kunci divariasi, pasangan 21–42 dicabut, soal 43 dokumen diganti); kunci final + pembahasan hangat + PDF SELESAI 2026-10-26 (paket 2 tuntas, draf). Berikut: pembahasan siswa paket 1 ditulis ulang gaya hangat + PDF ulang (prompt di log produksi). Mekanisme & pembuka dipasang acak tanpa lihat dimensi → cek kecocokan AR sebelum disetujui. Paket 2+3 sekaligus dan sumber JSON tidak dipilih. Terkait [[skd-tkp-produksi-paket]], [[skd-tkp-bocor-bentuk]].

**Update 2026-10-26:** Gusti memutuskan TKP berhenti di paket 2. Redesign pembahasan paket 1 ditunda; rencana di log produksi TKP ("Prompt sesi berikut — paket 1"). Mulai hanya atas perintah.
