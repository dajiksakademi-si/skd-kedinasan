"""Rakit Handbook TKP dari src/*.html menjadi versi siswa dan pengajar (HTML + PDF).

Versi siswa membuang semua elemen ber-class "guru". Pakai: python3 src/build.py [--no-pdf]
"""
import re, subprocess, sys
from pathlib import Path

SRC = Path(__file__).resolve().parent
OUT = SRC.parent
NODE_PATH = '/Users/gustiputuyudawirashana/.npm/_npx/7d92d9a2d2ccc630/node_modules'
VERSI = {'Siswa': 'Versi Siswa', 'Pengajar': 'Versi Pengajar'}
LARANGAN = ['mari kita', 'dengan demikian', 'penting untuk dicatat', 'secara keseluruhan',
            'akan tetapi', 'satu-satunya', 'sekaligus', 'di era ', 'stem', 'distraktor',
            'kutub', 'konstruk', 'sumbu', 'jebakan j', 'poin 5', 'poin 4']


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


def cek_larangan(nama, html):
    teks = re.sub(r'<[^>]+>', ' ', re.sub(r'<style.*?</style>', '', html, flags=re.S)).lower()
    temuan = [k for k in LARANGAN if re.search(rf'\b{re.escape(k)}', teks)]  # \b: "sistem" bukan "stem"
    temuan += [f'maka/karena itu ×{n}' for n in [len(re.findall(r'\bmaka\b|karena itu', teks))] if n > 6]
    if temuan:
        print(f'  {nama}: {temuan}')
    return not temuan


BAB = {'Pelayanan Publik': 5, 'Profesionalisme': 6, 'Jejaring Kerja': 7,
       'Sosial Budaya': 8, 'Teknologi Informasi dan Komunikasi': 9, 'Anti Radikalisme': 10}


def nomori(latihan):
    hitung = {}
    for s in latihan:
        hitung[s['aspek']] = hitung.get(s['aspek'], 0) + 1
        s['no'] = f"{BAB[s['aspek']]}.{hitung[s['aspek']]}"
        s['kunci_huruf'] = next(k for k, p in s['poin'].items() if p == 5)
    return latihan


def pilihan_nilai(h, n, alasan):
    # satu pilihan di kotak pembahasan: huruf, pil nilai, lalu alasannya; nilai 5 berlatar emas
    return (f'<div class="opt{" key" if n == 5 else ""}"><span class="h">{h}</span>'
            f'<div class="x"><span class="sc l{n}">Nilai {n}</span>{alasan}</div></div>')


def penutup(h, kunci, analogi, jebakan):
    return (f'<div class="jwb"><span>{h}</span><p><b>Jawaban: {h}.</b> {kunci}</p></div>'
            f'<div class="duo"><div class="il"><b>Ilustrasi</b><span>{analogi}</span></div>'
            f'<div><b>Perhatikan</b><span>{jebakan}</span></div></div>')


def render_latihan(aspek, latihan):
    soal = [s for s in latihan if s['aspek'] == aspek]
    if not soal:
        return ''
    out = [f'<section class="lanjut"><h3 style="margin-top:0">Latihan: {aspek}</h3>'
           '<p>Kerjakan tanpa melihat kunci. Untuk tiap soal, tulis dulu kalimat penentunya, lalu pilih jawabanmu. '
           'Nilai setiap pilihan dan pembahasannya ada di bagian <b>Kunci dan Pembahasan Latihan</b> di akhir buku. '
           'Pada berkas PDF, tekan tombol <b>Lihat pembahasan</b> di setiap soal untuk membukanya, lalu tombol <b>Kembali ke soal</b> untuk melanjutkan latihan.</p>']
    for s in soal:
        n = s['no'].replace('.', '-')
        opsi = ''.join(f'<div class="opt"><span class="h">{k}</span><div class="t">{v}</div></div>' for k, v in s['opsi'].items())
        out.append(f'<div class="soal" id="soal-{n}"><div class="meta"><span>Latihan {s["no"]}</span>'
                   f'<span><span class="guru">Bank 80 · No. {s["asal"]}</span><a class="ke" href="#bahas-{n}">Lihat pembahasan</a></span></div>'
                   f'<p class="stem">{s["stem"]}</p>{opsi}</div>')
    return ''.join(out) + '</section>'


def render_kunci(latihan):
    out, aspek = [], None
    for s in latihan:
        if s['aspek'] != aspek:
            aspek = s['aspek']
            out.append(f'<h3>Bab {BAB[aspek]} · {aspek}</h3>')
        n = s['no'].replace('.', '-')
        opsi = ''.join(pilihan_nilai(k, s['poin'][k], s['bahas'][k]) for k in sorted(s['poin'], key=lambda k: -s['poin'][k]))
        out.append(f'<div class="kunci-item" id="bahas-{n}"><h4>Latihan {s["no"]} · Jawaban {s["kunci_huruf"]}'
                   f'<a class="ke" href="#soal-{n}">Kembali ke soal</a></h4>'
                   f'<p class="penentu"><b>Kalimat penentu:</b> “{s["penentu"]}”</p>'
                   f'<div class="pilihan">{opsi}</div>{penutup(s["kunci_huruf"], s["kunci"], s["analogi"], s["jebakan"])}</div>')
    return ''.join(out)


def isi_latihan(html, latihan):
    html = re.sub(r'<!--LATIHAN:([^>]+)-->', lambda m: render_latihan(m.group(1), latihan), html)
    return html.replace('<!--KUNCI-->', render_kunci(latihan))


def main():
    sys.path.insert(0, str(SRC))
    from latihan_data import LATIHAN
    latihan = nomori(LATIHAN)
    bagian = sorted(p for p in SRC.glob('*.html') if p.name != '00_head.html')
    print('frasa terlarang per file:')
    bersih = all([cek_larangan(p.name, p.read_text()) for p in bagian])
    print('  bersih' if bersih else '  ↑ perbaiki dulu')
    isi = SRC.joinpath('00_head.html').read_text() + ''.join(p.read_text() for p in bagian) + '\n</body>\n</html>\n'
    isi = isi_latihan(isi, latihan)
    print('latihan:', cek_larangan('latihan_data.py', render_kunci(latihan) + ''.join(s['stem'] + ' '.join(s['opsi'].values()) for s in latihan)))
    for nama, label in VERSI.items():
        html = isi.replace('{{VERSI}}', label)
        if nama == 'Siswa':
            html = buang_guru(html)
        out = OUT / f'Handbook_TKP_{nama}.html'
        out.write_text(html)
        assert 'file:///' not in html and '{{' not in html
        if '--no-pdf' not in sys.argv:
            subprocess.run(['node', str(OUT / 'prototipe/buat_pdf.js'), str(out), str(out.with_suffix('.pdf'))],
                           check=True, env={'NODE_PATH': NODE_PATH, 'PATH': '/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin'})


if __name__ == '__main__':
    main()
