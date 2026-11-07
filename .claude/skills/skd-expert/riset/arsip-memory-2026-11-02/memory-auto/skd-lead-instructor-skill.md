---
name: skd-lead-instructor-skill
description: "Gusti memilih pola Agent PSI untuk SKD — skill skd-expert + sesi harian /skd-belajar (kurikulum 7 sesi), dibangun 2026-10-25"
metadata:
  node_type: memory
  type: project
  originSessionId: 075f7a23-e285-4139-8dc1-2e81250c7061
  modified: 2026-10-24T17:13:23.660Z
---

Lead Instructor SKD dibangun 2026-10-25 sebagai skill di luar folder project:
- `~/.claude/skills/skd-expert/`: SKILL.md, references (aturan-tetap, domain-skd, twk, tkp, tiu, bahan, belajar-log), riset/sesi-NN.md, usulan/, cek.py.
- `~/.claude/skills/skd-belajar/`: SKILL.md (prosedur sesi) + kurikulum.md (7 sesi).

**Why:** Gusti minta skills SKD tajam dengan riset harian 7 hari, dan memilih meniru pola psi-expert/psi-belajar yang sudah jalan di psiko-cat.

**How to apply:**
- Tugas SKD apa pun → pakai skill skd-expert.
- Sesi harian hanya jalan bila Gusti memicu `/skd-belajar` (tidak ada jadwal otomatis).
- Sesi 1 (Domain resmi) SELESAI 2026-10-27: riset/sesi-01.md; usulan U-2026-10-27-05..08 menunggu centang Gusti. Temuan kunci: PermenPANRB 27/2021 DICABUT oleh PermenPANRB 6/2024 (Pasal 69), yang tidak merinci aspek SKD; peringkat seri CPNS dipecah TKP→TIU→TWK (Ps 31(6)); ambang CPNS 2025/2026 belum ada Kepmen (acuan 321/2024). Sesi berikut = Sesi 2 (TWK mendalam).

Lihat juga [[psi-expert-pattern]].
