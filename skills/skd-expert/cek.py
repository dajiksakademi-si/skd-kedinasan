#!/usr/bin/env python3
"""Validator Lead Instructor SKD. `python3 cek.py` = cek semua file; `--selftest` = uji validator sendiri."""
import glob
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = Path("/Users/gustiputuyudawirashana/Downloads/PROJECT SKD KEDINASAN /BIG DATA")  # spasi di akhir nama project memang bagian nama
BATAS = {"SKILL.md": 150}  # selain itu 500 baris


def cek_ukuran_teks(teks, batas):
    n = len(teks.splitlines())
    return [f"{n} baris > batas {batas}"] if n > batas else []


def cek_sumber(teks, root):
    """Tiap `path` di baris yang memuat 'sumber:' wajib ada. URL dilewati; glob boleh."""
    salah = []
    for baris in teks.splitlines():
        if "sumber:" not in baris.lower():
            continue
        for p in re.findall(r"`([^`]+)`", baris[baris.lower().index("sumber:"):]):
            if p.startswith(("http", "commit ")):
                continue
            p = os.path.expanduser(p.split("#")[0].lstrip())  # spasi akhir bisa bagian nama folder
            base = Path(p) if os.path.isabs(p) else root / p
            ada = glob.glob(str(base)) if any(c in p for c in "*?") else base.exists()
            if not ada:
                salah.append(f"sumber tidak ada: {p}")
    return salah


def cek_konflik(teks):
    return ["KONFLIK tanpa RESOLUSI"] if teks.count("KONFLIK:") > teks.count("RESOLUSI:") else []


def cek_usulan(teks):
    salah = []
    for blok in re.split(r"(?m)^(?=## U-)", teks):
        if not blok.startswith("## U-"):
            continue
        judul = blok.splitlines()[0]
        if not re.search(r"Sumber:.*https?://", blok):
            salah.append(f"{judul}: tanpa URL sumber")
        kotak = re.search(r"\[([ xX])\] terima\s+\[([ xX])\] tolak", blok)
        if not kotak:
            salah.append(f"{judul}: tanpa kotak keputusan")
        elif kotak.group(1) != " " and kotak.group(2) != " ":
            salah.append(f"{judul}: terima DAN tolak dicentang — tanyakan Gusti, jangan diubah sendiri")
    return salah


def cek_semua():
    salah = []
    files = [HERE / "SKILL.md", *sorted((HERE / "references").glob("*.md")), *sorted((HERE / "riset").glob("*.md"))]
    for f in files:
        if not f.exists():
            salah.append(f"{f.name}: tidak ada")
            continue
        t = f.read_text()
        salah += [f"{f.name}: {s}" for s in cek_ukuran_teks(t, BATAS.get(f.name, 500)) + cek_sumber(t, ROOT) + cek_konflik(t)]
    for f in sorted((HERE / "usulan").glob("*.md")):
        salah += [f"usulan/{f.name}: {s}" for s in cek_usulan(f.read_text())]
    return salah


def selftest():
    import tempfile
    with tempfile.TemporaryDirectory() as d:
        root = Path(d)
        (root / "ada.md").write_text("x")
        assert len(cek_ukuran_teks("a\n" * 501, 500)) == 1
        assert cek_ukuran_teks("a\n" * 500, 500) == []
        assert len(cek_sumber("fakta. sumber: `tidak/ada.md`", root)) == 1
        assert cek_sumber("fakta. sumber: `ada.md`, `https://bkn.go.id`", root) == []
        assert cek_sumber("sumber: `ada.md#L12`", root) == []
        (root / "folder spasi ").mkdir()
        (root / "folder spasi " / "x.md").write_text("x")
        assert cek_sumber("sumber: `folder spasi /x.md`", root) == []
        assert cek_sumber("sumber: `folder spasi /*.md`", root) == []
        assert len(cek_konflik("KONFLIK: engine bilang X, memory Y")) == 1
        assert cek_konflik("KONFLIK: X vs Y\nRESOLUSI: pakai Y") == []
        ok = "## U-2026-10-26-01 — judul\n- Sumber: https://bkn.go.id/x\n- Keputusan: [ ] terima  [ ] tolak\n"
        assert cek_usulan(ok) == []
        assert len(cek_usulan(ok.replace("https://bkn.go.id/x", "kata orang"))) == 1
        assert len(cek_usulan(ok.replace("- Keputusan: [ ] terima  [ ] tolak\n", ""))) == 1
        assert cek_usulan(ok.replace("[ ] terima", "[X] terima")) == []
        assert len(cek_usulan(ok.replace("[ ] terima  [ ] tolak", "[x] terima  [x] tolak"))) == 1
    print("selftest OK")


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        selftest()
        sys.exit()
    hasil = cek_semua()
    print("\n".join(hasil) if hasil else "cek OK")
    sys.exit(1 if hasil else 0)
