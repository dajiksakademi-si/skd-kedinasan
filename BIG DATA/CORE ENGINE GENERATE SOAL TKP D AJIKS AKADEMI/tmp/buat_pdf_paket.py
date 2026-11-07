# Bahan ajar dari satu sumber: paket HTML produksi → <out>_Soal.html + <out>_Pembahasan.html.
# Soal: stem + opsi saja (tanpa kunci/meta). Pembahasan: tabel skor, lalu per soal preview + pembahasan siswa.
# Lembar reviu (meta, sumbu, kode) tidak ikut. PDF: node tmp/gen_pdf.js <html> <pdf>.
# usage: python3 tmp/buat_pdf_paket.py tmp/paket1.html "Paket 1" out/Paket_1_TKP
import re, sys

src, judul, out = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(src, encoding="utf-8").read()
css = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
css += """
  .soal.bahas { page-break-inside: auto; break-inside: auto; }
  .soal.bahas .soal-head { break-after: avoid; page-break-after: avoid; }
  .soal.bahas .stem, .soal.bahas .options { break-inside: avoid; }
  .soal.bahas .stem, .soal.bahas .options { font-size: 10pt; }
  table.skor td, table.skor th { text-align: center; }
  .cover { padding-top: 70mm; }
"""

soal = []
for blok in html.split("<!-- SOAL ")[1:]:
    blok = blok.split("<!-- AKHIR SOAL -->")[0]
    n = int(re.search(r"Soal No (\d+)", blok).group(1))
    head = re.search(r'<div class="soal-head">.*?</div>', blok, re.S).group(0)
    stem = re.search(r'<div class="stem">.*?</div>', blok, re.S).group(0)
    opsi = re.search(r'<ul class="options">.*?</ul>', blok, re.S).group(0)
    siswa = re.search(r'<div class="pembahasan-siswa">.*?</div>\s*(?=</div>\s*$)', blok.rstrip(), re.S).group(0)
    siswa = siswa.replace('<div class="ph-title">Pembahasan Siswa</div>', '<div class="ph-title">Pembahasan</div>')
    kunci = re.search(r'<span class="label">Kunci</span>([A-E])', blok).group(1)
    poin = re.search(r'<span class="label">Poin</span>(.*?)</div>', blok, re.S).group(1)
    skor = dict(re.findall(r"\b([A-E])=(\d)", poin))
    assert len(skor) == 5 and skor[kunci] == "5" and sorted(skor.values()) == list("12345"), n
    soal.append(dict(n=n, head=head, stem=stem, opsi=opsi, siswa=siswa, kunci=kunci, skor=skor))
assert [s["n"] for s in soal] == list(range(1, len(soal) + 1)), "nomor soal tidak urut"
assert not any(re.search(r"\bJ[1-6]\b|\bS[1-5]\b|poin \d", s["siswa"]) for s in soal), "kode dapur di pembahasan siswa"


def halaman(sub, isi, cover_note):
    return f"""<!doctype html>
<html lang="id"><head><meta charset="utf-8"><title>{judul} TKP — {sub}</title><style>{css}</style></head><body>
<div class="cover"><div class="kicker">D'Ajiks Akademi · SKD Kedinasan</div>
<h1>{judul} TKP</h1><div class="sub">{sub}</div>
<div class="meta-box"><div><b>Subtes</b> Tes Karakteristik Pribadi</div><div><b>Jumlah</b> {len(soal)} soal</div></div>
<div class="note">{cover_note}</div></div>
{isi}
</body></html>"""


bersih = lambda o: o.replace(" kunci", "")
lembar = "".join(f'<div class="soal">{s["head"]}{s["stem"]}{bersih(s["opsi"])}</div>\n' for s in soal)
open(f"{out}_Soal.html", "w", encoding="utf-8").write(halaman(
    "Lembar Soal", lembar,
    "Pilih satu jawaban yang paling tepat. Setiap pilihan bernilai 1 sampai 5; tidak ada pilihan bernilai 0."))

baris = "".join(
    f'<tr><td>{s["n"]}</td><td>{s["kunci"]}</td>' + "".join(f'<td>{s["skor"][l]}</td>' for l in "ABCDE") + "</tr>"
    for s in soal)
tabel = ('<h2 class="section-title">Tabel Skor</h2><table class="summary skor"><tr><th>No</th><th>Kunci (5)</th>'
         '<th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>' + baris + '</table>'
         '<div style="page-break-after: always"></div>')
# kunci tidak ditandai di daftar opsi (huruf tebal membuat kunci terlihat paling panjang); kunci disebut di pembahasan
bahas = "".join(f'<div class="soal bahas">{s["head"]}{s["stem"]}{bersih(s["opsi"])}{s["siswa"]}</div>\n' for s in soal)
open(f"{out}_Pembahasan.html", "w", encoding="utf-8").write(halaman(
    "Pembahasan", tabel + '<h2 class="section-title">Pembahasan per Soal</h2>' + bahas,
    "Kerjakan lembar soal dulu, baru buka pembahasan ini."))
print(f"ok {len(soal)} soal → {out}_Soal.html, {out}_Pembahasan.html")
