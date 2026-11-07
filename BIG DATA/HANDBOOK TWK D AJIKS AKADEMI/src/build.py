"""Rakit Handbook TWK dari src/*.html menjadi versi siswa dan pengajar (HTML + PDF).

Versi siswa membuang semua elemen ber-class "guru". Pakai: python3 src/build.py [--no-pdf]
Latihan + kunci (latihan_data.py) ditambahkan di Tahap 6, mengikuti build.py Handbook TKP.
"""
import re, subprocess, sys
from pathlib import Path

SRC = Path(__file__).resolve().parent
OUT = SRC.parent
BUAT_PDF = OUT.parent / 'HANDBOOK TKP D AJIKS AKADEMI/prototipe/buat_pdf.js'
VERSI = {'Siswa': 'Versi Siswa', 'Pengajar': 'Versi Pengajar'}
# frasa templat AI + ragam lisan (memory feedback-wording-handbook), dicek di semua file
LARANGAN = ['mari kita', 'dengan demikian', 'penting untuk dicatat', 'secara keseluruhan',
            'akan tetapi', 'satu-satunya', 'sekaligus', 'di era ', 'tidak hanya', 'kok', 'nggak', 'enggak']
# istilah dapur penyusun soal, dicek hanya di versi siswa (lampiran pengajar boleh memakai kode)
DAPUR = ['stem', 'distraktor', 'kutub', 'konstruk', 'konsep tetangga', 'salah kategori']
KODE = re.compile(r'\b(?:D(?:10|[1-9])|T[1-6]|E[1-8]|C[2-5]|L[1-3])\b|\b(?:DEFINISI|WUJUD|ALASAN|SIKAP|HUBUNGAN|MAKNA|AKIBAT)\b')


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
    return re.sub(r'<[^>]+>', ' ', re.sub(r'<style.*?</style>', '', html, flags=re.S))


def cek(nama, html, daftar, kode=False):
    t = teks(html)
    temuan = [k for k in daftar if re.search(rf'\b{re.escape(k)}\b', t.lower())]  # \b: "sistem" bukan "stem"
    temuan += [f'maka/karena itu ×{n}' for n in [len(re.findall(r'\bmaka\b|karena itu', t.lower()))] if n > 6]
    if kode:
        temuan += sorted(set(KODE.findall(t)))
    if temuan:
        print(f'  {nama}: {temuan}')
    return not temuan


ABSOLUT = ['selalu', 'semua', 'tidak pernah', 'mutlak', 'satu-satunya', 'seluruhnya']
SAMBUNG = ['sambil', 'sekaligus', 'serta', 'dengan tetap', 'sedangkan', 'lalu']


def cek_soal(soal):
    # aturan engine v1.6 Pilar 4 + kunci per bab A-E; soal kaidah bahasa (kaidah=True) bebas aturan panjang
    salah = []
    for s in soal:
        nama, o, k = f"{s['tempat']}/{s['asal']}", s['opsi'], s['kunci']
        kata = {h: len(v.split()) for h, v in o.items()}
        if s['penentu'] not in s['soal'] + ' '.join(o.values()):  # soal kaidah: penentu = kalimat di pilihan
            salah.append(f'{nama}: penentu tidak ada di soal')
        if not s.get('kaidah'):
            if min(kata.values()) < 8 or max(kata.values()) > 14 or max(kata.values()) - min(kata.values()) > 4:
                salah.append(f'{nama}: panjang opsi {kata}')
            for ukur in (lambda h: kata[h], lambda h: len(o[h])):
                if all(ukur(k) > ukur(h) for h in o if h != k):
                    salah.append(f'{nama}: kunci terpanjang')
        for h, v in o.items():
            if any(re.search(rf'\b{w}\b', v.lower()) for w in ABSOLUT):
                salah.append(f'{nama}: kata absolut di {h}')
        for w in SAMBUNG:
            if re.search(rf'\b{w}\b', o[k].lower()) and not any(re.search(rf'\b{w}\b', o[h].lower()) for h in o if h != k):
                salah.append(f'{nama}: kunci satu-satunya ber-"{w}"')
        t = (s['soal'] + ' ' + ' '.join(o.values())).lower()
        salah += [f'{nama}: frasa "{w}"' for w in LARANGAN if re.search(rf'\b{re.escape(w)}\b', t)]
    for tempat in {s['tempat'] for s in soal if not s['tempat'].startswith('contoh')}:
        kunci = sorted(s['kunci'] for s in soal if s['tempat'] == tempat)
        if len(kunci) == 5 and kunci != list('ABCDE'):
            salah.append(f'{tempat}: kunci {kunci}')
    hitung = {h: sum(s['kunci'] == h for s in soal) for h in 'ABCDE'}
    print(f'soal: {len(soal)} · kunci {hitung}')
    print('  ' + '\n  '.join(salah) if salah else '  aturan soal bersih')
    return not salah


BAB = {'Pancasila': 5, 'UUD 1945 dan Lembaga Negara': 6, 'NKRI dan Bhinneka Tunggal Ika': 7,
       'Nasionalisme dan cinta tanah air': 8, 'Bela negara': 9, 'Integritas aparatur': 10, 'Bahasa negara': 11}


def kunci_bahas(soal):
    # contoh: nama tempat; latihan: 'Tempat.n' menurut urutan di SOAL
    hitung, kunci = {}, []
    for s in soal:
        t = s['tempat']
        if t.startswith('contoh'):
            kunci.append(t)
        else:
            hitung[t] = hitung.get(t, 0) + 1
            kunci.append(f'{t}.{hitung[t]}')
    return kunci


def cek_bahas(soal, bahas):
    salah = []
    for s, k in zip(soal, kunci_bahas(soal)):
        if k not in bahas:
            continue
        b = bahas[k]
        if set(b['bahas']) != set(s['opsi']):
            salah.append(f'{k}: bahas tidak lengkap')
        t = ' '.join([b['tanya'], b['langkah'], b['kunci'], b['analogi'], b['jebakan'], b.get('pembalik', ''),
                      *b.get('sop', []), *b.get('nama', {}).values(), *b['bahas'].values()])
        tl = t.lower()
        salah += [f'{k}: frasa "{w}"' for w in LARANGAN + DAPUR if re.search(rf'\b{re.escape(w)}\b', tl)]
        salah += [f'{k}: kode {c}' for c in sorted(set(KODE.findall(t)))]
        if len(re.findall(r'\bmaka\b|karena itu', tl)) > 1:
            salah.append(f'{k}: maka/karena itu > 1')
    ada = sum(k in bahas for k in kunci_bahas(soal))
    print(f'pembahasan: {ada}/{len(soal)}')
    print('  ' + '\n  '.join(salah) if salah else '  pembahasan bersih')
    return not salah


# nama sepuluh pola Bab 4 (versi siswa menampilkan nama, bukan kode)
POLA = [None, 'Jawabannya bukan yang diminta', 'Cuma menjawab separuh', 'Itu akibatnya, bukan intinya',
        'Konsep mirip, tapi beda', 'Cuma mengulang kata di soal', 'Cuma formalitas', 'Itu tugas pihak lain',
        'Langkahnya belum waktunya', 'Soal tidak menyebut itu', 'Itu demi diri sendiri']


def no_bab(tempat):
    return BAB.get(tempat) or int(re.search(r'bab(\d+)', tempat).group(1))


def nama_pilihan(s, b, h):
    # soal kaidah: nama kaidah; soal lain: pola[h] bila ada, selain itu nomor dari kode pertama
    if 'nama' in b:
        return f'<b class="kd">{b["nama"][h]}.</b>'
    if h == s['kunci']:
        return '<b>Jawaban tepat.</b>'
    n = b.get('pola', {}).get(h) or int(re.match(r'D(\d+)', s['kode'][h]).group(1))
    return f'<b><i>{n}</i>{POLA[n]}.</b>'


def stem(s, tandai):
    t = s['soal']
    if tandai and s['penentu'] in t:
        t = t.replace(s['penentu'], f'<mark>{s["penentu"]}</mark>', 1)
    if t.startswith('(1)'):  # paragraf bernomor: kalimat (n) dalam kotak, perintah di bawahnya
        par, tanya = re.match(r'(.*\.(?:</mark>)?)\s+(\S[^.]*\.\.\.)$', t, re.S).groups()
        return f'<p class="para">{re.sub(r"\((\d)\)", r"<i>(\1)</i>", par)}</p><p class="stem">{tanya}</p>'
    return f'<p class="stem">{t}</p>'


def pilihan(s, b, h, teks):
    # satu pilihan: huruf, bunyi pilihan (bila teks diberikan), lalu alasan gugur atau alasan kunci
    t = f'<div class="t">{teks}</div>' if teks else ''
    x = f'<div class="x">{nama_pilihan(s, b, h)} {b["bahas"][h]}</div>' if b else ''
    kunci = ' key' if b and h == s['kunci'] else ''
    return f'<div class="opt{kunci}"><span class="h">{h}</span>{t}{x}</div>'


def kotak_soal(s, label, b=None):
    tandai = b is not None
    opsi = ''.join(pilihan(s, b, h, f'<mark>{v}</mark>' if tandai and s['penentu'] in v else v) for h, v in s['opsi'].items())
    asal = 'Soal baru' if s['asal'] == 'baru' else f'Bank 101 · No. {s["asal"]}'
    # soal latihan: tautan ke pembahasannya di halaman kunci, dan sebaliknya (render_kunci)
    ke, kid = '', ''
    if 'no' in s and not tandai:
        n = s['no'].replace('.', '-')
        ke, kid = f'<a class="ke" href="#bahas-{n}">Lihat pembahasan</a>', f' id="soal-{n}"'
    return (f'<div class="soal"{kid}><div class="meta"><span>{label}</span><span><span class="guru">{asal}</span>{ke}</span></div>'
            f'{stem(s, tandai)}{opsi}</div>')


def duo(kiri, isi_kiri, kanan, isi_kanan, il=False):
    return (f'<div class="duo"><div{" class=il" if il else ""}><b>{kiri}</b><span>{isi_kiri}</span></div>'
            f'<div><b>{kanan}</b><span>{isi_kanan}</span></div></div>')


def penutup(s, b):
    return (f'<div class="jwb"><span>{s["kunci"]}</span><p><b>Jawaban: {s["kunci"]}.</b> {b["kunci"]}</p></div>'
            + duo('Ilustrasi', b['analogi'], 'Perhatikan', b['jebakan'], il=True))


SOP = ['Tutup pilihan', 'Jawab dengan kata sendiri', 'Cari kalimat penentu', 'Coret dengan nama']
LABEL = {'bab12a': 'Pasangan · soal pertama', 'bab12b': 'Pasangan · soal kedua'}


def render_contoh(s, b):
    k = s['tempat'].removeprefix('contoh-')
    out = kotak_soal(s, LABEL.get(k, 'Soal'), b)
    out += duo('Inti pertanyaan', b['tanya'], 'Langkah penyelesaian', b['langkah'])
    if 'sop' in b:
        out += '<div class="timeline t4">' + ''.join(
            f'<div><p class="t">{i}</p><h4>{j}</h4><p>{t}</p></div>' for i, (j, t) in enumerate(zip(SOP, b['sop']), 1)) + '</div>'
    out += penutup(s, b)
    if 'pembalik' in b:
        out += f'<div class="note gold"><h4>Kalimat pembalik</h4><p>{b["pembalik"]}</p></div>'
    return f'<div class="bedah">{out}</div>'


def render_latihan(nama, latihan):
    out = [f'<section class="lanjut"><h3 style="margin-top:0">Latihan: {judul(nama)}</h3>'
           '<p>Kerjakan tanpa melihat kunci. Untuk tiap soal, tandai dulu kalimat penentunya, lalu pilih jawabanmu. '
           'Kunci dan pembahasannya ada di bagian <b>Kunci dan Pembahasan Latihan</b> di akhir buku. Pada berkas PDF, tekan tombol <b>Lihat pembahasan</b> di setiap soal untuk membukanya, lalu tombol <b>Kembali ke soal</b> untuk melanjutkan latihan.</p>']
    out += [kotak_soal(s, f'Latihan {s["no"]}') for s in latihan if s['tempat'] == nama]
    return ''.join(out) + '</section>'


def judul(t):
    return ' '.join(w if w == 'dan' else w[0].upper() + w[1:] for w in t.split())


def render_kunci(latihan, bahas):
    out, bab = [], None
    for s in latihan:
        if s['tempat'] != bab:
            bab = s['tempat']
            out.append(f'<h3>Bab {BAB[bab]} · {judul(bab)}</h3>')
        b = bahas[s['id']]
        n = s['no'].replace('.', '-')
        out.append(f'<div class="kunci-item" id="bahas-{n}"><h4>Latihan {s["no"]} · Jawaban {s["kunci"]}'
                   f'<a class="ke" href="#soal-{n}">Kembali ke soal</a></h4>'
                   f'<p class="penentu"><b>Kalimat penentu:</b> “{s["penentu"]}”</p>'
                   + duo('Inti pertanyaan', b['tanya'], 'Langkah penyelesaian', b['langkah'])
                   + '<div class="pilihan">' + ''.join(pilihan(s, b, h, '') for h in s['opsi']) + '</div>'
                   + f'{penutup(s, b)}</div>')
    return ''.join(out)


def render_l6(soal):
    baris = ''
    for s in sorted(soal, key=lambda s: (no_bab(s['tempat']), 'no' in s, s.get('no', s['tempat']))):
        no = f'Latihan {s["no"]}' if 'no' in s else f'Contoh Bab {s["tempat"].removeprefix("contoh-bab").lstrip("0")}'
        kode = ' · '.join(f'{h} {v}' for h, v in s['kode'].items() if v != 'kunci')
        baris += f'<tr><td>{no}</td><td>{s["asal"]}</td><td><b>{s["kunci"]}</b></td><td>{kode}</td></tr>'
    return ('<table><thead><tr><th style="width:22%">Tempat</th><th style="width:12%">Asal</th><th style="width:9%">Kunci</th>'
            f'<th>Analisis pilihan</th></tr></thead><tbody>{baris}</tbody></table>')


def isi_soal(html, soal, bahas):
    for s, k in zip(soal, kunci_bahas(soal)):
        s['id'] = k
        if not k.startswith('contoh'):
            s['no'] = f'{BAB[s["tempat"]]}.{k.rsplit(".", 1)[1]}'
    latihan = [s for s in soal if 'no' in s]
    contoh = {s['tempat'].removeprefix('contoh-'): s for s in soal if 'no' not in s}
    html = re.sub(r'<!--CONTOH:([^>]+)-->', lambda m: render_contoh(contoh[m.group(1)], bahas[f'contoh-{m.group(1)}']), html)
    html = re.sub(r'<!--LATIHAN:([^>]+)-->', lambda m: render_latihan(m.group(1), latihan), html)
    return html.replace('<!--KUNCI-->', render_kunci(latihan, bahas)).replace('<!--L6-->', render_l6(soal))


def main():
    sys.path.insert(0, str(SRC))
    from latihan_data import SOAL
    cek_soal(SOAL)
    from bahas import BAHAS
    cek_bahas(SOAL, BAHAS)
    if '--cek' in sys.argv:
        return
    bagian = sorted(p for p in SRC.glob('*.html') if p.name != '00_head.html')
    print('frasa terlarang per file:')
    bersih = all([cek(p.name, p.read_text(), LARANGAN) for p in bagian])
    print('  bersih' if bersih else '  ↑ perbaiki dulu')
    isi = SRC.joinpath('00_head.html').read_text() + ''.join(p.read_text() for p in bagian) + '\n</body>\n</html>\n'
    isi = isi_soal(isi, SOAL, BAHAS)
    print('tempat contoh soal kosong:', isi.count('class="slot"') + isi.count('<!--CONTOH:'),
          '· tempat latihan kosong:', isi.count('<!--LATIHAN:') + isi.count('<!--KUNCI-->') + isi.count('<!--L6-->'))
    for nama, label in VERSI.items():
        html = isi.replace('{{VERSI}}', label)
        if nama == 'Siswa':
            html = buang_guru(html)
            print('istilah dapur versi siswa:', 'bersih' if cek('siswa', html, DAPUR, kode=True) else '↑ perbaiki dulu')
        out = OUT / f'Handbook_TWK_{nama}.html'
        out.write_text(html)
        assert 'file:///' not in html and '{{' not in html
        if '--no-pdf' not in sys.argv:
            subprocess.run(['node', str(BUAT_PDF), str(out), str(out.with_suffix('.pdf'))],
                           check=True)


if __name__ == '__main__':
    main()
