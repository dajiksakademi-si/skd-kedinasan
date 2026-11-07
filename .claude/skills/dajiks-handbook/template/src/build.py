#!/usr/bin/env python3
"""Build buku D'Ajiks: src/*.html → <NAMA>_Siswa.html/.pdf. Pakai: python3 src/build.py [--no-pdf]
Isi KONFIGURASI dulu. Soal dan angka dicek script proyek: tambahkan ke CEK."""
import json, re, subprocess, sys
from pathlib import Path

# ── KONFIGURASI PROYEK ──
NAMA = 'Handbook_Contoh'
ISI = {'BUKU': 'Handbook Contoh', 'KEPALA': 'NAMA TES LENGKAP', 'EDISI': '2026', 'SERI': 'SERI NAMA PROGRAM · SINGKATAN',
       'NILAI': '', 'JUDUL_1': 'Judul', 'JUDUL_2': 'Buku', 'JANJI': 'Satu kalimat janji buku.'}
VERSI = {'Siswa': 'Versi Siswa'}          # tambah 'Pengajar': 'Versi Pengajar' bila Gusti meminta edisi pengajar
LAMPIRAN = {}                             # {'A': 'Lampiran A · Judul'}: nomor halaman untuk baris Lampiran di daftar isi
CEK = []                                  # script pemeriksa proyek, mis. ['scripts/cek_bab01.mjs']
LARANGAN = ['mari kita', 'dengan demikian', 'penting untuk dicatat', 'secara keseluruhan', 'akan tetapi',
            'satu-satunya', 'sekaligus', 'di era', 'tidak hanya', 'kok', 'nggak', 'enggak']
DAPUR = ['stem', 'distraktor', 'kutub', 'konstruk', 'konsep tetangga', 'salah kategori', 'jebakan', 'hots', 'level']  # tambah istilah penyusun proyek
KODE = re.compile(r'\bHB-[A-Z]+-')        # kode penyusun proyek yang tidak boleh tampil di buku siswa
TRYOUT = []                               # nama sumber luar yang tidak boleh tampil
# ────────────────────────

SRC = Path(__file__).resolve().parent
OUT = SRC.parent
NODE_PATH = str(Path.home() / '.npm/_npx/7d92d9a2d2ccc630/node_modules')   # puppeteer-core; pindah mesin: npm i puppeteer-core


def buang_guru(html):
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


def hal_bab(pdf, judul):
    """Halaman awal bab: baris pertama halaman = '<nomor> <kata pertama judul>'."""
    hal, halaman = {}, subprocess.run(['pdftotext', '-layout', str(pdf), '-'], capture_output=True, text=True, check=True).stdout.split('\f')
    for i, t in enumerate(halaman, 1):
        baris = [b.strip() for b in t.splitlines() if b.strip() and ISI['KEPALA'] not in b]
        for n, j in judul.items():
            if baris and n not in hal and re.match(rf'{n}\s+{re.search(r'\w+', j)[0]}\b', baris[0]):
                hal[n] = i
    assert len(hal) == len(judul), f'halaman bab tidak lengkap: {sorted(set(judul) - set(hal))}'
    akhir = max(hal.values(), default=0)
    for k, j in LAMPIRAN.items():
        hal[k] = next(i for i, t in enumerate(halaman, 1) if i > akhir and j in re.sub(r'\s+', ' ', t))
    return hal


def periksa_pdf(pdf, salah):
    """Berkas akhir utuh: terbaca tanpa kesalahan, tanpa bekas tersimpan sebagai teks."""
    r = subprocess.run(['pdftotext', str(pdf), '/dev/null'], capture_output=True, text=True)
    if r.stderr.strip() or pdf.read_bytes().count(b'\xef\xbf\xbd') > 100:   # 1-2 kali wajar di data terkompresi; rusak = ribuan
        salah.append(f'{pdf.name}: PDF rusak')


def main():
    salah = []
    for c in CEK:
        r = subprocess.run(['node', str(OUT / c)], capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[0] if r.returncode == 0 and r.stdout.strip() else r.stderr)
        if r.returncode:
            salah.append(f'{c} gagal')
    bagian = []
    for p in sorted(p for p in SRC.glob('*.html') if p.name != '00_head.html'):
        html = p.read_text()
        t = teks(html).lower()
        hit = [k for k in LARANGAN if re.search(rf'\b{re.escape(k)}\b', t)]
        if hit:
            salah.append(f'{p.name}: {hit}')
        for j, sub in enumerate(re.split(r'<h3', buang_guru(html))):
            if len(re.findall(r'\bmaka\b|karena itu', teks(sub).lower())) > 1:
                salah.append(f'{p.name} subbagian {j}: maka/karena itu lebih dari 1')
        bagian.append(html)
    isi = SRC.joinpath('00_head.html').read_text() + ''.join(bagian) + '\n</body>\n</html>\n'
    for k, v in ISI.items():
        isi = isi.replace('{{' + k + '}}', v)

    judul = dict(re.findall(r'<div class="no">(\d+)</div>.*?<h2>([^<]+)</h2>', isi, re.S))
    tertulis = dict(re.findall(r'<span class="n">(\d+)</span><span class="t">([^<]+)<', SRC.joinpath('02_daftar_isi.html').read_text()))
    if tertulis != judul:
        salah.append(f'daftar isi tidak sama dengan judul bab: {sorted(set(tertulis.items()) ^ set(judul.items()))}')
    simpan = OUT / 'daftar_isi_hal.json'
    cache = json.loads(simpan.read_text()) if simpan.exists() else {}

    for nama, label in VERSI.items():
        html = isi.replace('{{VERSI}}', label)
        if nama == 'Siswa':
            html = re.sub(r'<!--.*?-->', '', buang_guru(html), flags=re.S)
            t = teks(html)
            for ket, hit in (('istilah penyusun', [k for k in DAPUR if re.search(rf'\b{re.escape(k)}\b', t.lower())]),
                             ('kode', sorted(set(KODE.findall(t)))), ('sumber luar', [k for k in TRYOUT if k.lower() in t.lower()])):
                if hit:
                    salah.append(f'siswa · {ket}: {hit}')
        out = OUT / f'{NAMA}_{nama}.html'
        pdf = out.with_suffix('.pdf')
        hal = cache.get(nama, {})
        for _ in range(3):
            terisi = re.sub(r'\{\{HAL:(\w+)\}\}', lambda m: str(hal.get(m[1], 0)), html)
            assert '{{' not in terisi and 'file:///' not in terisi, 'penanda belum terisi'
            out.write_text(terisi)
            if '--no-pdf' in sys.argv or salah:
                break
            subprocess.run(['node', str(OUT / 'buat_pdf.js'), str(out), str(pdf)], check=True,
                           env={'NODE_PATH': NODE_PATH, 'PATH': '/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin'})
            baru = hal_bab(pdf, judul)
            if baru == hal:
                periksa_pdf(pdf, salah)
                break
            hal = baru
        else:
            salah.append(f'{nama}: nomor halaman daftar isi tidak stabil')
        cache[nama] = hal
    simpan.write_text(json.dumps(cache, indent=1))
    print('kesalahan: 0' if not salah else 'kesalahan:\n  ' + '\n  '.join(salah))
    sys.exit(1 if salah else 0)


if __name__ == '__main__':
    main()
