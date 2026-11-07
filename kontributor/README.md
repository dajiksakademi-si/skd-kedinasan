# Catatan Kontributor (WAJIB)

Setiap kontributor punya folder sendiri: `kontributor/<username-github>/`. Nama folder **harus sama persis** dengan username GitHub, karena pemeriksaan otomatis mencarinya dengan nama itu.

## Isi folder
| File | Isi | Kapan diisi |
|---|---|---|
| `memory.md` | Putusan, aturan, dan pelajaran yang berlaku lintas tugas (memory persistence). Satu butir = tanggal + putusan + alasan + cara menerapkan. | Setiap ada putusan Gusti, aturan baru, atau perbaikan yang tidak tampak dari isi file. |
| `LOG.md` | Catatan perubahan per tanggal: apa yang diubah, file mana, kenapa, status. | **Setiap** perubahan yang dikirim (commit/push/usulan perubahan). |

Claude milik kontributor juga wajib menulis ke dua file ini, bukan hanya ke memori lokal di komputernya, supaya semua orang membaca catatan yang sama.

## Format LOG.md
```
## 2026-11-07
- Ubah: <file/folder> — <apa yang berubah> — <alasan>
- Status: selesai | lanjut besok: <langkah berikut>
```

## Format memory.md
```
- 2026-11-07 · <putusan/aturan> — Alasan: <…> — Terapkan: <…>
```

## Pemeriksaan otomatis
Setiap push atau usulan perubahan (pull request) diperiksa: bila `kontributor/<username>/LOG.md` tidak ikut berubah, pemeriksaan **gagal (tanda merah)** dan perubahan tidak digabung oleh Gusti.

Perubahan besar (engine naik versi, paket baru, aturan baru) juga dicatat satu baris di [`CHANGELOG.md`](../CHANGELOG.md).

Contoh lengkap: folder [`dajiksakademi-si/`](dajiksakademi-si/) (Gusti). Memori Gusti ada di `dajiksakademi-si/memory/` (satu file per butir, indeks di `MEMORY.md`).
