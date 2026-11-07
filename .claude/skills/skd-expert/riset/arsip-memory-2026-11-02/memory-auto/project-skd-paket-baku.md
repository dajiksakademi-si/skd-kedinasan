---
name: project-skd-paket-baku
description: Paket baku D'Ajiks mengikuti komposisi SKD — TWK 30, TIU 35, TKP 45; peta per paket tiap engine dihitung untuk ukuran ini
metadata:
  type: project
---

Paket baku: TWK 30 · TIU 35 · TKP 45 (keputusan Gusti 2026-10-25). TWK: tema 9/7/6/4/2/2, level 6/15/9. TKP: dimensi 9/9/7/7/6/7, level Tinggi 27 / Sangat Tinggi 18, kunci 7–11 per huruf. TIU: blueprint 15/5/8/7, level 30/50/20 masih menunggu Gusti.

**Why:** produksi paket akan dipakai sebagai simulasi SKD utuh.

**How to apply:** generate/audit paket → pakai peta paket di engine masing-masing; paket latihan kecil pakai persentase yang sama. Lihat [[skd-tiu-engine-3k]], [[skd-twk-al-faiz]].

**Target produksi (Gusti 2026-10-29):** 50 paket soal SKD sampai akhir tahun 2026. Untuk figural TIU artinya ±450 soal gambar (9 per paket, nomor 57–65). Keragaman bentuk dan beban tinjauan manusia harus direncanakan untuk skala ini, bukan per paket.

**Putusan Gusti 2026-10-29:** rilis 3 TO pertama dulu. Ekspor CAT/PDF + infrastruktur web DITUNDA, dirancang bersama TO nanti; fokus sekarang menyiapkan soal. Status 3 TO: TIU figural 3×9 siap (.test-out-paket); TIU nonfigural 3×26 belum; TKP paket 1–2 siap, paket 3 belum; TWK 3 paket ada tetapi v1.5 (engine v1.6, Bahasa 6 soal).
- 2026-10-29 TWK untuk TO: validator v1.6 → 3 paket GAGAL struktur (tema 9/7/6/4/2/2, Bahasa 2 tanpa rumpun); 26 dari 90 soal TO beririsan dengan latihan Handbook TWK (ditulis ulang, logika sama) → menunggu putusan Gusti. Log + prompt siap tempel: skd-expert/riset/2026-10-29-log-twk-to.md.
- 2026-10-29 audit isi v1.6 SELESAI (90 soal): lolos 27 · perbaiki 43 · keluarkan 12 · ganti 8. Rencana komposisi butuh 20 soal baru (Bahasa 15 + 5), atau 41 bila irisan Handbook diganti. MENUNGGU: persetujuan rencana + putusan irisan. Tabel per soal di log TO.
- PUTUSAN 2026-10-29: rencana DISETUJUI; 26 irisan Handbook DIGANTI; soal baru wajib HOTS. Kebutuhan 41 soal baru (P1 15 · P2 13 · P3 13; Bahasa 15) + 29 perbaikan. Berikut: kartu ide Paket 1 untuk disetujui (prompt di log).
- 2026-10-29: kartu ide Paket 1 (15 soal) ditulis di log, menunggu persetujuan; temuan 9 soal tetap lain juga dipakai Handbook (contoh dibedah/Bahasa) menunggu putusan.
- 2026-10-29: Gusti putuskan 9 irisan tambahan DIGANTI → soal baru 50 (P1 17 · P2 17 · P3 16); kartu ide P1 kini 17, menunggu persetujuan.
- 2026-10-29: P1 17 soal baru SELESAI (tmp/v16/baru_p1.json, cek buta 16/17 lalu 9/9, validator 0 galat); berikut kartu ide P2.
- 2026-10-29: kartu ide P2 (17 soal) ditulis di log TO, menunggu persetujuan Gusti; 3 kartu bertanda ⚠ (Q4 label tema, Q6/Q7 keluarga dekat).
- 2026-10-29: kartu P2 DISETUJUI; P2 17 soal baru SELESAI (tmp/v16/baru_p2.json, cek buta 17/17 lalu 4/4, validator 0 galat); berikut kartu ide P3 (16).
- 2026-10-29: kartu ide P3 (16 soal, R1–R16) di log TO, pasal/kaidah diverifikasi harfiah daring, MENUNGGU PERSETUJUAN GUSTI; 3 kartu ⚠ keluarga dekat lintas paket (R3/102, R9/123, R10/110).
- 2026-10-29: kartu P3 DISETUJUI; P3 16 soal baru SELESAI (tmp/v16/baru_p3.json, cek buta 16/16, 8/8, 4/4, validator 0 galat) → 50 soal baru TO lengkap; berikut perbaikan 23 soal tetap, lalu rakit 3 paket.
- 2026-10-29: perbaikan 23 soal tetap SELESAI (tmp/v16/perbaikan_tetap.json; cek buta 23/23 lalu 4/4; validator 0 galat; 026 tidak diubah, 081 diganti grasi–MA), MENUNGGU PERSETUJUAN GUSTI; paket belum dirakit.
- 2026-10-29: 3 paket TWK v1.6 TO DIRAKIT (tmp/v16/paket_twk_{1,2,3}.json; validator paket penuh 0 galat, kunci 6/6/6/6/6, kunci terpanjang huruf 0), MENUNGGU PERSETUJUAN GUSTI; temuan: kunci terpendek ≈35% (8–9/24) belum diperbaiki; persetujuan 23 perbaikan belum dinyatakan (prompt masih tempat kosong); PDF menunggu persetujuan.
- PUTUSAN 2026-10-29: 3 paket TWK v1.6 TO DISETUJUI (termasuk 23 perbaikan); kunci terpendek ≈35% DIBIARKAN. TWK TO tuntas di tingkat soal; PDF menunggu perintah.
- 2026-10-29: soal TO TWK disimpan dulu; PDF ditunda bersama ekspor TO lain (putusan Gusti).
- 2026-10-30: rencana Paket 1 TIU nonfigural (26 soal, no. 31–56, komposisi Paket 41 + 2–3 soal deret model kotak ala IMG_3767) diajukan, MENUNGGU putusan nomor yang diganti (A: 39+43 jadi kotak, 3 kotak; B: 39 saja, 2 kotak). Log skd-expert/riset/2026-10-30-log-tiu-paket1.md.
- PUTUSAN 2026-10-30: 2 soal kotak saja (no. 39 kotak 2×4 X-Y, no. 40 kotak 3×3 pola baru; pasangan operasi tetap 3). Berikut: tahap 0 + kartu ide 26 soal.
- 2026-10-30: tahap 0 SELESAI (tmp/paket1: pola_terpakai.txt, cek_paket.mjs OK); kartu ide 26 soal (kartu_p1.json) MENUNGGU PERSETUJUAN GUSTI.
- 2026-10-30: kartu DISETUJUI; 26 soal ditulis (tmp/paket1/paket_tiu_1.json, cek_paket OK), cek buta 31–45 + 46–56 berjalan; pembahasan belum.
- 2026-10-30: cek buta 4 putaran SELESAI (26/26 cocok kunci; 9 soal diperbaiki); paket 35 dirakit, lembar tmp/paket1/tinjau_paket1.md, DISETUJUI 2026-10-30 ("lanjutkan"); pembahasan 26 soal DISETUJUI 2026-10-30; PAKET 1 TIU TUNTAS + DISIMPAN di CORE ENGINE TIU/paket/paket-1/ (paket_tiu_1.json 35 butir + img 61 SVG); PDF DIBUAT 2026-10-30 atas permintaan Gusti (paket/paket-1/pdf: Soal 18 hlm, Pembahasan 40 hlm, buat_pdf.mjs), menunggu kesan Gusti; CAT ditunda.
