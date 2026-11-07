"""Rakit Handbook TIU dari src/*.html menjadi versi siswa dan pengajar (HTML + PDF).

Pola Handbook TWK (src/build.py): 00_head.html + bagian lain urut nama berkas.
Versi siswa membuang semua elemen ber-class "guru" lalu dicek istilah dapur, kode, dan nama tryout.
Kotak soal yang belum diisi = <div class="slot" data-slot="ID" data-target="detik">; pita bab memakai
target yang paling sering dipakai slot bab itu (Putusan T3-e). Soal asli menyusul di Tahap 5.
Pakai: python3 src/build.py [--no-pdf]   (galat apa pun → kode keluar 1)
"""
import json, re, subprocess, sys
from collections import Counter
from pathlib import Path

SRC = Path(__file__).resolve().parent
OUT = SRC.parent
BUAT_PDF = OUT.parent / 'HANDBOOK TKP D AJIKS AKADEMI/prototipe/buat_pdf.js'
VERSI = {'Siswa': 'Versi Siswa', 'Pengajar': 'Versi Pengajar'}
RATA = 'rata-rata TIU ±86 detik'  # 50,5 menit : 35 soal (Putusan 5)
# templat AI + ragam lisan (feedback-wording-handbook, root CLAUDE.md), dicek di semua berkas
LARANGAN = ['mari kita', 'dengan demikian', 'penting untuk dicatat', 'secara keseluruhan', 'akan tetapi',
            'satu-satunya', 'sekaligus', 'di era', 'tidak hanya', 'kok', 'nggak', 'enggak']
# istilah dapur penyusun soal, dicek hanya di versi siswa (edisi pengajar boleh memakai kode di elemen guru)
DAPUR = ['stem', 'distraktor', 'kutub', 'konstruk', 'konsep tetangga', 'salah kategori', 'jebakan', 'hots', 'level']
KODE = re.compile(r'\bJF?-[A-Z]{2,}\b|\bK[1-7]\b|\bG[1-8]\b|\bHOTS\+?')
TRYOUT = ['Al Faiz', 'Paket 41', 'Part 39', 'TIU002', 'Pejuang']


def buang_guru(html):
    # elemen ber-class guru dibuang utuh, termasuk isi bersarang dengan tag yang sama
    pola = re.compile(r'<(div|section|p|tr|span)\b[^>]*class="[^"]*\bguru\b[^"]*"[^>]*>', re.I)
    while (m := pola.search(html)):
        tag, i, depth = m.group(1), m.end(), 1
        buka, tutup = re.compile(rf'<{tag}\b', re.I), re.compile(rf'</{tag}>', re.I)
        while depth:
            b, t = buka.search(html, i), tutup.search(html, i)
            if b and b.start() < t.start():
                depth, i = depth + 1, b.end()
            else:
                depth, i = depth - 1, t.end()
        html = html[:m.start()] + html[i:]
    return html


def teks(html):
    html = re.sub(r'<!--.*?-->|<style.*?</style>', ' ', html, flags=re.S)
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', html))


def galat(daftar, nama, temuan):
    if temuan:
        daftar.append(f'{nama}: {temuan}')


def menit(detik):
    m, s = divmod(detik, 60)
    return f'{m} menit {s} detik' if s else f'{m} menit'


def hal_bab(pdf, judul):
    """Halaman awal tiap bab + Lampiran A/B/C dari PDF. Pembuka bab = baris pertama halaman: '<nomor> <kata pertama judul>'."""
    hal, teks_hal = {}, subprocess.run(['pdftotext', '-layout', str(pdf), '-'], capture_output=True, text=True, check=True).stdout.split('\f')
    for i, t in enumerate(teks_hal, 1):
        baris = [b.strip() for b in t.splitlines() if b.strip() and 'TES INTELEGENSIA' not in b]
        for n, j in judul.items():
            if baris and n not in hal and re.match(rf'{n}\s+{re.escape(j.split()[0])}\b', baris[0]):
                hal[n] = i
    assert len(hal) == len(judul), f'halaman bab tidak lengkap: {sorted(set(judul) - set(hal))}'
    for k, j in (('A', 'Lampiran A · Pembahasan Latihan'), ('B', 'Lampiran B · Jawaban Latihan A'), ('C', 'Lampiran C · Tabel Rujukan')):
        hal[k] = next(i for i, t in enumerate(teks_hal, 1) if i > hal['19'] and j in re.sub(r'\s+', ' ', t))
    return hal


def isi_slot(nama, html, salah):
    """Cek slot + isi {{TARGET}} dan {{WAKTU_LATIHAN}} dari data-target."""
    slot = re.findall(r'<div class="slot" data-slot="([^"]+)"(?: data-target="(\d+)")?>(.*?)<span class="kosong">', html, re.S)
    ids = [s[0] for s in slot]
    galat(salah, nama, [f'ID ganda {i}' for i, n in Counter(ids).items() if n > 1])
    for i, t, kepala in slot:
        tulis = re.findall(r'Target (\d+) detik', kepala)
        if tulis != ([t] if t else []):
            salah.append(f'{nama}: {i} target kartu {tulis} ≠ data-target {t}')
    # soal yang sudah terisi (Tahap 5): <div data-soal="ID" data-target="detik">, kartu pertama di dalamnya memuat targetnya
    isi = re.findall(r'<div data-soal="([^"]+)" data-target="(\d+)">\s*<div class="soal">\s*<div class="meta">(.*?)</div>', html, re.S)
    for i, t, kepala in isi:
        if re.findall(r'Target (\d+) detik', kepala) != [t]:
            salah.append(f'{nama}: {i} target kartu ≠ data-target {t}')
    galat(salah, nama, [f'ID ganda {i}' for i, n in Counter(ids + [s[0] for s in isi]).items() if n > 1])
    semua = sorted(slot + isi, key=lambda s: html.find(f'"{s[0]}"'))  # urutan muncul di bab (pita: yang muncul dulu, T4-24)
    target = [int(t) for _, t, _ in semua if t]
    pita = (f'Target waktu ±{Counter(target).most_common(1)[0][0]} detik per soal; {RATA}.' if target
            else f'Bab ini tanpa soal pilihan ganda; {RATA} per soal.')
    latihan = sum(int(t) for i, t, _ in semua if t and '-L' in i)
    return html.replace('{{TARGET}}', pita).replace('{{WAKTU_LATIHAN}}', menit(latihan)), ids


def main():
    salah = []
    for cek in ('cek_bab01_02.mjs', 'cek_bab03_05.mjs', 'soal_verbal.mjs', 'soal_numerik.mjs', 'cek_bab06_10.mjs', 'soal_kck.mjs', 'cek_bab11_13.mjs', 'soal_figural.mjs', 'cek_bab14_18.mjs', 'soal_dasar.mjs', 'latihan_a.mjs', 'cek_bab19.mjs', 'cek_lampiran.mjs'):
        r = subprocess.run(['node', str(OUT / 'scripts' / cek)], capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[0] if r.returncode == 0 else r.stderr)
        if r.returncode:
            salah.append(f'{cek} gagal')

    bagian, semua_slot = [], []
    for p in sorted(p for p in SRC.glob('*.html') if p.name != '00_head.html'):
        html, ids = isi_slot(p.name, p.read_text(), salah)
        semua_slot += ids
        t = teks(html).lower()
        galat(salah, p.name, [k for k in LARANGAN if re.search(rf'\b{re.escape(k)}\b', t)])
        # "maka"/"karena itu" paling banyak 1× per subbagian (h3) di teks siswa
        # kalimat logika "jika … maka …" (<span class="lg">) dan nama bentuk "jika–maka" bukan "maka" penghubung
        for j, sub in enumerate(re.split(r'<h3', buang_guru(html))):
            sub = re.sub(r'<span class="lg">.*?</span>|jika[-–]maka', ' ', sub, flags=re.S | re.I)
            n = len(re.findall(r'\bmaka\b|karena itu', teks(sub).lower()))
            if n > 1:
                salah.append(f'{p.name} subbagian {j}: maka/karena itu ×{n}')
        bagian.append(html)
    isi = SRC.joinpath('00_head.html').read_text() + ''.join(bagian) + '\n</body>\n</html>\n'

    # daftar isi: judul harus sama dengan <h2> bab; nomor halaman dibaca dari PDF, cache dipakai supaya biasanya cukup sekali cetak
    judul = dict(re.findall(r'<div class="no">(\d+)</div>.*?<h2>([^<]+)</h2>', isi, re.S))
    toc = SRC.joinpath('02_daftar_isi.html').read_text()
    tertulis = dict(re.findall(r'<span class="n">(\d+)</span><span class="t">([^<]+)<', toc))
    if tertulis != judul:
        salah.append(f'daftar isi ≠ judul bab: {sorted(set(tertulis.items()) ^ set(judul.items()))}')
    simpan = OUT / 'scripts/data/daftar_isi_hal.json'
    cache = json.loads(simpan.read_text()) if simpan.exists() else {}

    for nama, label in VERSI.items():
        html = isi.replace('{{VERSI}}', label)
        if nama == 'Siswa':
            html = re.sub(r'<!--.*?-->', '', buang_guru(html), flags=re.S)  # catatan penyusun tidak ikut ke berkas siswa
            t = teks(html)
            galat(salah, 'siswa · istilah dapur', [k for k in DAPUR if re.search(rf'\b{re.escape(k)}\b', t.lower())])
            galat(salah, 'siswa · kode', sorted(set(KODE.findall(t))))
            galat(salah, 'siswa · nama tryout', [k for k in TRYOUT if k.lower() in t.lower()])
            galat(salah, 'siswa · sisa elemen guru', ['guru'] if re.search(r'class="[^"]*\bguru\b', html) else [])
        out = OUT / f'Handbook_TIU_{nama}.html'
        if '--no-pdf' not in sys.argv and not salah:   # sampul dicetak sebagai satu gambar utuh
            out.write_text(html)
            gambar = f'aset/sampul_datar_{nama}.jpg'
            subprocess.run(['node', str(OUT / 'scripts/ratakan_sampul.js'), str(out), str(OUT / gambar)], check=True)
            html = re.sub(r'<section class="cover f">.*?</section>',
                          f'<section class="cover datar"><img src="{gambar}" alt="Sampul Handbook Tes Intelegensia Umum, {label}, Edisi 2026"></section>',
                          html, count=1, flags=re.S)
        hal = cache.get(nama, {})
        for _ in range(3):   # nomor berubah → cetak ulang; daftar isi satu halaman, jadi berhenti di putaran kedua
            terisi = re.sub(r'\{\{HAL:(\w+)\}\}', lambda m: str(hal.get(m[1], 0)), html)
            assert '{{' not in terisi and 'file:///' not in terisi, 'penanda belum terisi'
            out.write_text(terisi)
            if '--no-pdf' in sys.argv or salah:
                break
            subprocess.run(['node', str(BUAT_PDF), str(out), str(out.with_suffix('.pdf'))], check=True)
            baru = {k: v for k, v in hal_bab(out.with_suffix('.pdf'), judul).items()}
            if baru == hal:
                break
            hal = baru
        else:
            salah.append(f'{nama}: nomor halaman daftar isi tidak stabil')
        cache[nama] = hal

    simpan.write_text(json.dumps(cache, indent=1))
    print(f'slot kosong: {len(semua_slot)} · {", ".join(semua_slot)}')
    print('galat: 0' if not salah else 'galat:\n  ' + '\n  '.join(salah))
    sys.exit(1 if salah else 0)


if __name__ == '__main__':
    main()
