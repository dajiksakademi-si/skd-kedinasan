# Satu PDF dari paket_twk_{1,2,3}.json (+ cadangan_twk.json sebagai lampiran reviu ahli).
# Per paket: soal (versi siswa) · lembar jawaban · pembahasan · lembar reviu ahli.
# CSS, esc, dan kartu reviu diambil dari generator lama tmp/generate_review_pdf.py (dihapus 2026-10-25). HTML -> PDF lewat Chrome headless (sama seperti PDF lama).
# Pakai: python3 tmp/v15/buat_pdf.py
import json, html, os, re, subprocess

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, '..', '..')
OUT_HTML = os.path.join(here, 'paket_twk_v15.html')
OUT_PDF = os.path.join(root, 'Bank Soal TWK DAJIKS 101 v1.5 - 3 Paket.pdf')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
L = 'ABCDE'
BAGIAN = ['Yang ditanya', 'Cara cepat', 'Kenapa opsi lain gugur', 'Kunci', 'Analogi', 'Jebakan']

meta = json.load(open(os.path.join(root, 'bank_soal_100.json')))['meta']  # judul, disclaimer, batas validasi saja
paket = [json.load(open(os.path.join(here, f'paket_twk_{p}.json'))) for p in (1, 2, 3)]
cadangan = json.load(open(os.path.join(here, 'cadangan_twk.json')))


def esc(s):
    return html.escape(str(s), quote=False)


def opsi_list(q, tandai=False):
    return '<ul class="opsi">' + ''.join(
        f'<li class="opt{" is-kunci" if tandai and h == q["kunci"] else ""}"><span class="letter">{h}.</span> {esc(q["opsi"][h])}</li>'
        for h in L) + '</ul>'


def baris_pembahasan(q):
    baris = q['pembahasan'].split('\n')
    label = [b.split(':', 1)[0] for b in baris]
    assert label == BAGIAN, (q['id'], label)
    m = re.match(r'Kunci: ([A-E])\b', baris[3])
    assert m and m.group(1) == q['kunci'], q['id']
    return ''.join(f'<p class="bag"><strong>{esc(b.split(":", 1)[0])}:</strong>{esc(b.split(":", 1)[1])}</p>' for b in baris)


def soal_siswa(n, q):
    return f'<article class="siswa"><p class="stem"><span class="no">{n}.</span> {esc(q["soal"])}</p>{opsi_list(q)}</article>'


def lembar_jawaban(p):
    kol = ''.join('<div class="lj-kol">' + ''.join(
        f'<div class="lj-baris"><span class="no">{n}.</span>' + ''.join(f'<span class="bulat">{h}</span>' for h in L) + '</div>'
        for n in range(k * 10 + 1, k * 10 + 11)) + '</div>' for k in range(3))
    return (f'<section class="hal" id="p{p}-lj"><h2>Paket {p} — Lembar Jawaban</h2>'
            '<p class="isian">Nama: ______________________________ &nbsp; Tanggal: ______________ &nbsp; Skor: ______</p>'
            f'<p class="kecil">Hitamkan satu huruf untuk tiap nomor. Benar 5, salah atau kosong 0.</p><div class="lj">{kol}</div></section>')


def pembahasan(n, q):
    return (f'<article class="bahas"><div class="preview"><p class="stem"><span class="no">{n}.</span> {esc(q["soal"])}</p>'
            f'{opsi_list(q)}</div>{baris_pembahasan(q)}</article>')


def reviu(n, q):
    analisis = ''.join(f'<li><strong>{h}:</strong> {esc(q["analisis_opsi"][h])}</li>' for h in L)
    landasan = ''.join(f'<li><strong>{esc(s["kode"])}</strong> &mdash; {esc(s["rujukan"])}</li>' for s in q['landasan'])
    return f"""
<article class="soal">
  <div class="soal-head">
    <span class="idx">{n}. {esc(q['id'])}</span>
    <span class="tags">
      <span class="tag">{esc(q['subtema'])}</span>
      <span class="tag">{esc(q['tipe_kode'])} {esc(q['tipe_nama'])}</span>
      <span class="tag">Level {esc(q['level_kognitif'])}</span>
      <span class="tag">{esc(q['kategori_jawaban'])}</span>
      <span class="tag">{'Berjangkar faktual' if q['jangkar_faktual'] else 'Konseptual'}</span>
      <span class="tag">Tegangan {esc(q['bentuk_tegangan'])}</span>
    </span>
  </div>
  <p class="konstruk"><em>Konstruk dua kutub:</em> {esc(q['konstruk_dua_kutub'])}</p>
  <p class="stem">{esc(q['soal'])}</p>
  {opsi_list(q, tandai=True)}
  <p class="kunci-line"><strong>KUNCI: {q['kunci']}</strong></p>
  <ul class="analisis"><li class="analisis-title"><strong>Analisis opsi:</strong></li>{analisis}</ul>
  <ul class="landasan"><li class="landasan-title"><strong>Landasan:</strong></li>{landasan}</ul>
  <div class="review-box"><span class="review-label">Catatan reviu ahli:</span><div class="review-lines"></div></div>
</article>"""


parts = []
toc = ''.join(f'<li>Paket {p} — <a href="#p{p}-soal">Soal</a> · <a href="#p{p}-lj">Lembar jawaban</a> · '
              f'<a href="#p{p}-bahas">Pembahasan</a> · <a href="#p{p}-reviu">Lembar reviu ahli</a></li>' for p in (1, 2, 3))
toc += f'<li><a href="#cadangan">Lampiran — Lembar reviu ahli {len(cadangan["soal"])} soal cadangan</a></li>'
parts.append(f"""
<section class="cover">
  <h1>{esc(meta['judul'])}</h1>
  <p class="sub">MR BADRUN TWK ENGINE v{esc(meta['engine']['versi'])} &middot; versi bank {esc(meta['versi_bank'])} &middot; {esc(meta['tanggal_penyusunan'])}</p>
  <p class="status">Status: {esc(paket[0]['meta']['status'])}</p>
  <p class="disclaimer">{esc(meta['disclaimer'])}</p>
  <p class="disclaimer"><strong>Catatan reviu:</strong> {esc(meta['qa']['batas_validasi'])}</p>
  <h2>Daftar Isi</h2>
  <ol class="guide">{toc}</ol>
  <p class="kecil">Tiap paket 30 soal, komposisi SKD: 9 Pancasila · 7 Nasionalisme &amp; bela negara · 6 Integritas · 4 Hukum &amp; ketatanegaraan · 2 Radikalisme · 2 Bahasa. Bagian soal dan lembar jawaban boleh dicetak terpisah untuk siswa; pembahasan dan lembar reviu ahli jangan dibagikan sebelum ujian selesai.</p>
</section>""")

for p, pk in enumerate(paket, 1):
    qs = pk['soal']
    assert len(qs) == 30
    parts.append(f'<section class="hal" id="p{p}-soal"><h2>Paket {p} — Soal</h2>'
                 '<p class="kecil">Pilih satu jawaban yang paling tepat. Waktu disarankan 30 menit.</p>'
                 + ''.join(soal_siswa(n, q) for n, q in enumerate(qs, 1)) + '</section>')
    parts.append(lembar_jawaban(p))
    parts.append(f'<section class="hal" id="p{p}-bahas"><h2>Paket {p} — Pembahasan</h2>'
                 + ''.join(pembahasan(n, q) for n, q in enumerate(qs, 1)) + '</section>')
    parts.append(f'<section class="hal" id="p{p}-reviu"><h2>Paket {p} — Lembar Reviu Ahli</h2>'
                 + ''.join(reviu(n, q) for n, q in enumerate(qs, 1)) + '</section>')

parts.append('<section class="hal" id="cadangan"><h2>Lampiran — Lembar Reviu Ahli Soal Cadangan</h2>'
             + ''.join(reviu(n, q) for n, q in enumerate(cadangan['soal'], 1)) + '</section>')

html_doc = f"""<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>{esc(meta['judul'])}</title>
<style>
  @page {{ size: A4; margin: 20mm 16mm; }}
  * {{ box-sizing: border-box; }}
  body {{ font-family: "Times New Roman", Georgia, serif; font-size: 11pt; line-height: 1.45; color: #1a1a1a; }}
  h1 {{ font-size: 20pt; margin-bottom: 4pt; }}
  h2 {{ font-size: 14pt; margin-top: 0; border-bottom: 1pt solid #999; padding-bottom: 3pt; }}
  a {{ color: inherit; }}
  .cover .sub {{ font-size: 12pt; color: #333; }}
  .cover .status {{ font-weight: bold; }}
  .cover .disclaimer {{ font-size: 9.5pt; color: #555; font-style: italic; }}
  ol.guide li {{ margin-bottom: 6pt; }}
  .kecil {{ font-size: 9.5pt; color: #444; }}
  section.hal {{ break-before: page; }}
  .no {{ font-weight: bold; margin-right: 3pt; }}
  .stem {{ margin: 6pt 0; }}
  article.siswa {{ break-inside: avoid; margin: 0 0 12pt; }}
  article.bahas {{ border-bottom: 0.5pt solid #ccc; padding-bottom: 8pt; margin: 0 0 12pt; }}
  article.bahas .preview {{ break-inside: avoid; break-after: avoid; }}
  article.bahas .opsi {{ font-size: 10pt; }}
  .bag {{ font-size: 10pt; margin: 4pt 0; break-inside: avoid; }}
  .isian {{ margin: 10pt 0 4pt; }}
  .lj {{ display: flex; gap: 28pt; margin-top: 12pt; }}
  .lj-baris {{ display: flex; align-items: center; gap: 6pt; margin: 7pt 0; }}
  .lj-baris .no {{ width: 20pt; text-align: right; }}
  .bulat {{ display: inline-block; width: 16pt; height: 16pt; border: 0.8pt solid #333; border-radius: 50%; text-align: center; font-size: 8.5pt; line-height: 15pt; }}
  article.soal {{ break-inside: avoid; border: 0.5pt solid #ccc; border-radius: 4pt; padding: 10pt 12pt; margin: 12pt 0; }}
  .soal-head {{ display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4pt; margin-bottom: 6pt; }}
  .idx {{ font-weight: bold; font-size: 11pt; }}
  .tags {{ display: flex; gap: 4pt; flex-wrap: wrap; }}
  .tag {{ font-size: 8pt; background: #f0f0f0; border: 0.5pt solid #ccc; border-radius: 8pt; padding: 1pt 7pt; color: #333; }}
  .konstruk {{ font-size: 9.5pt; color: #555; margin: 2pt 0 6pt; }}
  article.soal .stem {{ font-weight: bold; }}
  ul.opsi {{ list-style: none; padding: 0; margin: 6pt 0; }}
  ul.opsi li.opt {{ margin: 3pt 0; padding: 2pt 6pt; border-radius: 3pt; }}
  ul.opsi li.opt .letter {{ font-weight: bold; margin-right: 4pt; }}
  ul.opsi li.is-kunci {{ background: #eaf5ea; }}
  .kunci-line {{ margin: 6pt 0; color: #1a6b1a; }}
  ul.analisis, ul.landasan {{ font-size: 9.5pt; list-style: none; padding-left: 0; margin: 4pt 0; }}
  ul.analisis li, ul.landasan li {{ margin: 2pt 0; }}
  .analisis-title, .landasan-title {{ margin-top: 6pt; }}
  .review-box {{ margin-top: 8pt; border-top: 0.5pt dashed #999; padding-top: 6pt; }}
  .review-label {{ font-size: 9pt; color: #777; }}
  .review-lines {{ height: 26pt; border-bottom: 0.5pt dotted #bbb; }}
</style>
</head>
<body>
{''.join(parts)}
</body>
</html>
"""

open(OUT_HTML, 'w', encoding='utf-8').write(html_doc)
subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                f'--print-to-pdf={OUT_PDF}', 'file://' + OUT_HTML], check=True, capture_output=True)
print('tulis', os.path.relpath(OUT_PDF, root))
