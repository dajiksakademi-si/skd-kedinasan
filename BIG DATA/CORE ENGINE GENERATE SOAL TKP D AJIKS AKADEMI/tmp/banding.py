import json, re, sys, html
from itertools import combinations
asli = json.load(open(sys.argv[1])); nilai = json.load(open(sys.argv[2])); src = open(sys.argv[3], encoding='utf-8').read()
txt = lambda s: html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', s))).strip()
blok = {int(re.search(r'Soal No (\d+)', b).group(1)): b for b in re.split(r'<!-- SOAL \d+ -->', src)[1:]}
def alasan_kita(no):
    m = re.search(r'<b>Kunci vs [A-E] \(poin 4\):</b>(.*?)(<br>|</li>)', blok[no], re.S)
    return txt(m.group(1)) if m else '(tidak ditemukan)'
rows, beda, tot = [], [], {'k': 0, 'p4': 0}
for no in range(1, 46):
    a = {k: v for k, v in asli[str(no)].items()}
    n = nilai[str(no)]; u = n['urutan']
    assert sorted(u) == list('ABCDE') and u[0] == n['kunci'] and u[1] == n['poin4'], no
    b = {h: 5 - i for i, h in enumerate(u)}
    ka = max(a, key=a.get); p4a = [h for h in a if a[h] == 4][0]
    kendall = sum((a[x] - a[y]) * (b[x] - b[y]) < 0 for x, y in combinations('ABCDE', 2))
    selisih = sum(abs(a[h] - b[h]) for h in 'ABCDE')
    sk, sp = ka == n['kunci'], p4a == n['poin4']
    tot['k'] += sk; tot['p4'] += sp
    ua = ''.join(sorted('ABCDE', key=lambda h: -a[h]))
    rows.append(f"| {no} | {ua} | {u} | {'sama' if sk else 'BEDA'} | {'sama' if sp else 'BEDA'} | {kendall} | {selisih} | {n['yakin']} |")
    if not sk or not sp:
        beda.append(f"### Soal {no} — kunci kita {ka} (poin 4 {p4a}) · penilai {n['kunci']} (poin 4 {n['poin4']}) · yakin {n['yakin']}\n"
                    f"- Skor yang penilai beri ke kunci kita: {b[ka]}; skor kita untuk kunci penilai: {a[n['kunci']]}\n"
                    f"- Alasan penilai: {n['alasan']}\n- Alasan kita (kunci vs poin 4): {alasan_kita(no)}\n")
print("| No | Urutan kita 5→1 | Urutan penilai | Kunci | Poin 4 | Kendall (0–10) | Σ|selisih| | Yakin |\n|---|---|---|---|---|---|---|---|")
print("\n".join(rows))
print(f"\nKunci sama {tot['k']}/45 · poin 4 sama {tot['p4']}/45 · item masuk reviu {len(beda)}\n")
print("\n".join(beda))
