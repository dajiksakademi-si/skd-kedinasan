# Peta soal TKP yang sudah ada (langkah 0 jalan pintas, riset/2026-10-26-pelajaran-paket1-jalan-pintas.md).
# Dibaca saat memilih ide paket baru supaya latar/dilema/jenis kunci tidak kembar sebelum soal ditulis.
# cek_lintas_paket.js tetap penjaga akhir. Jalankan ulang setiap paket beku.
# usage: python3 tmp/buat_peta.py [paket.html ...]   (default: bank 80 + bank 12 + tmp/paket*.html)
import glob, html as H, json, os, re, sys
from collections import Counter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
files = sys.argv[1:] or [os.path.join(ROOT, f) for f in ("Bank_Soal_TKP_HOTS_80.html", "Bank_Soal_TKP_HOTS_12.html")] \
    + sorted(f for f in glob.glob(os.path.join(ROOT, "tmp", "paket[0-9].html")))

teks = lambda s: re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()
field = lambda b, l: teks((re.search(rf'<span class="label">{l}</span>(.*?)</div>', b, re.S) or [None, ""])[1])

# Jenis mekanisme kunci — heuristik kata, urutan = prioritas. "lain" = baca manual.
MEKANISME = [
    ("sepakat", r"\b(menyepakati|disepakati|kesepakatan|merumuskan|mengajak)\b|(?<!milik )(?<!jadwal )\bbersama (?!kartu)\w"),
    ("lapor/serahkan ke pihak berwenang", r"\b(melaporkan|meneruskan|menyerahkan|menyampaikan)\b.*\b(kepala|atasan|pimpinan|unit|inspektorat|pengelola|pengawasan|sekretaris|camat|direktur)\b"),
    ("verifikasi/cek", r"\b(memastikan|mengecek|memeriksa|mencocokkan|mengonfirmasi|meminta bukti|meminta waktu|menelepon)\b"),
    ("tegur/bicara langsung", r"\b(menegur|menemui|menanyakan|berbicara|mengingatkan|meluruskan)\b"),
    ("jadwal/giliran/urutan", r"\b(jadwal|giliran|urutan|mengurutkan|antrean|menggeser|menjadwalkan)\b"),
    ("aturan/format tertulis", r"\b(format|daftar periksa|tata tertib|petunjuk|prosedur|edaran|mencantumkan|menuliskan)\b"),
    ("sarana pengganti", r"\b(pengganti|salinan|alat|rekaman|menyiarkan)\b"),
    ("pertemukan/koordinasi pihak", r"\b(mempertemukan|berkoordinasi|menghubungi)\b"),
    ("umumkan/informasikan", r"\b(mengumumkan|menginformasikan|menjelaskan|menyampaikan)\b"),
    ("usulkan ke pemutus", r"\b(mengusulkan|mengajukan)\b"),
    ("tahan/batasi sementara", r"\b(menahan|menghentikan sementara|menyembunyikan|membatasi|menolak|menggugurkan)\b"),
    ("ubah cara/sumber kerja", r"\b(mengganti|menyesuaikan|mengonversi|memindahkan|memakai|menyediakan|melatih|menempatkan|memasang|membuka)\b"),
]
def jenis(t):
    m = next((n for n, rx in MEKANISME if re.search(rx, t.lower())), None)
    return m or "lain: " + t.split()[0].lower()

peta = []
for f in files:
    sumber = os.path.basename(f).replace(".html", "").replace("Bank_Soal_TKP_HOTS_", "B")
    src = open(f, encoding="utf-8").read()
    for n, b in re.findall(r"<!--\s*SOAL\s*(\d+)\s*-->(.*?)(?=<!--\s*SOAL\s*\d+\s*-->|<!-- AKHIR|$)", src, re.S):
        stem = teks((re.search(r'<div class="stem">(.*?)</div>', b, re.S) or [None, ""])[1])
        kunci = field(b, "Kunci")[:1]
        opsi = dict(re.findall(r'opt-letter[^>]*>([A-E])\.</span>\s*<span class="opt-text[^>]*>(.*?)</span>', b, re.S))
        kt = teks(opsi.get(kunci, ""))
        peran = (re.match(r"(?:Anda|Kamu)\s+([^.,;]+)", stem) or [None, ""])[1]
        peta.append(dict(
            id=f"{sumber}#{n}", dimensi=teks((re.search(r'class="badge dim-[^"]*">(.*?)<', b) or [None, ""])[1]),
            level=field(b, "Level"), latar=field(b, "Latar") or peran, konstruk=field(b, "Konstruk"),
            kunci=kunci, kunci_teks=kt, mekanisme=jenis(kt)))
assert peta and all(p["kunci"] and p["kunci_teks"] for p in peta), "soal tanpa kunci/teks kunci"

json.dump(peta, open(os.path.join(ROOT, "tmp", "peta_tkp.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

sumber = sorted({p["id"].split("#")[0] for p in peta})
md = [f"# Peta soal TKP existing ({len(peta)} soal: {', '.join(sumber)})",
      "Dibuat `tmp/buat_peta.py`; jangan diedit tangan. Mekanisme = heuristik kata (\"lain: <kata kerja>\" = baca manual).", ""]
md.append("## Jenis mekanisme kunci per sumber")
md.append("| mekanisme | " + " | ".join(sumber) + " |\n|---|" + "---|" * len(sumber))
for m in [n for n, _ in MEKANISME] + ["lain"]:
    md.append(f"| {m} | " + " | ".join(str(sum(1 for p in peta if p['mekanisme'].split(':')[0] == m and p['id'].startswith(s + '#'))) for s in sumber) + " |")
md.append("\n## Latar terpakai (≥ 2×)")
md.append(", ".join(f"{l} {c}" for l, c in Counter(p["latar"].lower() for p in peta).most_common() if c >= 2))
md.append("\n## Per dimensi: id · latar · mekanisme · konstruk")
for d in sorted({p["dimensi"] for p in peta}):
    md.append(f"\n### {d}")
    md += [f"- {p['id']} · {p['latar']} · {p['mekanisme']} · {p['konstruk']}" for p in peta if p["dimensi"] == d]
open(os.path.join(ROOT, "tmp", "peta_tkp.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
print(f"ok {len(peta)} soal → tmp/peta_tkp.json + tmp/peta_tkp.md; lain={sum(p['mekanisme'].startswith('lain') for p in peta)}")
