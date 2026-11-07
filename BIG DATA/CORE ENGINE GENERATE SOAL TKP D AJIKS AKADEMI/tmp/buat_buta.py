import re, json, sys, html
src, out_buta, out_kunci = sys.argv[1:4]
t = open(src, encoding='utf-8').read()
blok = re.split(r'<!-- SOAL \d+ -->', t)[1:]
txt = lambda s: html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', s))).strip()
buta, kunci = [], {}
for b in blok:
    no = int(re.search(r'Soal No (\d+)', b).group(1))
    dim = txt(re.search(r'<span class="badge[^"]*">(.*?)</span>', b).group(1))
    stem = txt(re.search(r'<div class="stem">(.*?)</div>', b, re.S).group(1))
    opsi = re.findall(r'<span class="opt-letter[^"]*">([A-E])\.</span><span class="opt-text[^"]*">(.*?)</span>', b, re.S)
    assert [o[0] for o in opsi] == list('ABCDE'), no
    poin = dict((k, int(v)) for k, v in re.findall(r'\b([A-E])=([1-5])\b', re.search(r'<span class="label">Poin</span>(.*?)</div>', b, re.S).group(1)))
    k = re.search(r'<span class="label">Kunci</span>([A-E])', b).group(1)
    assert sorted(poin.values()) == [1,2,3,4,5] and poin[k] == 5, no
    assert re.search(r'opt-letter kunci">' + k, b), no
    kunci[no] = poin
    buta.append(f"SOAL {no} — {dim}\n{stem}\n" + "\n".join(f"{l}. {txt(o)}" for l, o in opsi))
doc = "\n\n".join(buta) + "\n"
open(out_buta, 'w', encoding='utf-8').write(doc)
json.dump(kunci, open(out_kunci, 'w'), indent=0)
assert len(buta) == 45 and sorted(kunci) == list(range(1, 46)), len(buta)
# isi soal sah: 'kunci keamanan' (27), 'dikunci' (40)
sisa = re.findall(r'\bkunci\b(?! keamanan USB)|\bpoin\b|\bskor\b', doc, re.I)
assert not sisa, sisa
print("OK 45 soal, sisa kata terlarang:", len(sisa))
