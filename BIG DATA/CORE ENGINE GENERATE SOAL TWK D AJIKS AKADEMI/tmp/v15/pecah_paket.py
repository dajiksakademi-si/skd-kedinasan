# Pecah bank_v15_draft.json (101) -> 3 paket x 30 + 11 cadangan, semua batas Pilar 6 di-assert.
# Pakai: python3 tmp/v15/pecah_paket.py           -> cetak peta saja
#        python3 tmp/v15/pecah_paket.py --tulis   -> juga tulis file paket (sesudah peta disetujui)
import json, os, random, sys, re
from collections import Counter

here = os.path.dirname(os.path.abspath(__file__))
bank = json.load(open(os.path.join(here, 'bank_v15_draft.json')))
soal = {q['id'][-3:]: q for q in bank['soal']}

TEMA = {'Pancasila & ideologi': 9, 'Nasionalisme & bela negara': 7, 'Integritas aparatur': 6,
        'Hukum & ketatanegaraan': 4, 'Radikalisme & ketahanan sosial': 2, 'Bahasa Indonesia': 2}
LEVEL = {'C3': 6, 'C4': 15, 'C5': 9}
# konstruk kembar/mirip (memory.md): anggota satu grup tidak boleh satu paket
GRUP = ['003 010 015 019 025', '002 006 018', '007 020', '011 021', '003 010 013 023',
        '037 049 051', '033 044', '036 038', '034 046', '027 030',
        '057 065 073', '060 071 075', '056 058 063', '058 062', '059 069',
        '076 086', '084 090', '077 080', '091 094 095',
        '001 009 015 027 030']  # tambahan sesi ini: Pancasila/Pembukaan jadi ukuran rancangan (kunci "menguji … sebelum ditetapkan")
GRUP = [g.split() for g in GRUP]
CADANGAN = 3  # indeks bin cadangan

tidak_hanya = lambda q: bool(re.search('tidak hanya', q['soal'], re.I) and re.search('tetapi juga', q['soal'], re.I))
pembuka = lambda q: q['soal'].lower().startswith('di tengah perkembangan')


def pelanggaran(bins):
    v = 0
    for b in bins[:3]:
        qs = [soal[i] for i in b]
        lv = Counter(q['level_kognitif'] for q in qs)
        v += sum(abs(lv[k] - n) for k, n in LEVEL.items())
        v += max(0, 9 - sum(q['jangkar_faktual'] for q in qs))
        ky = Counter(q['kunci'] for q in qs)
        v += sum(max(0, 4 - ky[k]) + max(0, ky[k] - 7) for k in 'ABCDE')
        v += sum(max(0, n - 9) for n in Counter(q['bentuk_tegangan'] for q in qs).values())
        v += max(0, sum(map(tidak_hanya, qs)) - 6) + max(0, sum(map(pembuka, qs)) - 2)
        s = set(b)
        v += sum(max(0, len(s.intersection(g)) - 1) for g in GRUP) * 3
    return v


def susun(seed):
    rnd = random.Random(seed)
    bins = [[], [], [], []]
    for tema, n in TEMA.items():
        ids = sorted(i for i, q in soal.items() if q['tema'] == tema)
        rnd.shuffle(ids)
        for p in range(3):
            bins[p] += ids[p * n:(p + 1) * n]
        bins[CADANGAN] += ids[3 * n:]
    cost = pelanggaran(bins)
    for step in range(200000):
        if cost == 0:
            return bins
        a, b = rnd.sample(range(4), 2)
        i = rnd.choice(bins[a])
        same = [j for j in bins[b] if soal[j]['tema'] == soal[i]['tema']]
        if not same:
            continue
        j = rnd.choice(same)
        bins[a][bins[a].index(i)], bins[b][bins[b].index(j)] = j, i
        new = pelanggaran(bins)
        if new <= cost or rnd.random() < 0.02:
            cost = new
        else:
            bins[a][bins[a].index(j)], bins[b][bins[b].index(i)] = i, j
    return None


def urutkan(ids, seed):
    # blok tema urut Pilar 6; di dalam blok diacak sampai kunci & tipe tidak berderet > 2
    rnd = random.Random(seed)
    for _ in range(20000):
        out = []
        for tema in TEMA:
            blok = [i for i in ids if soal[i]['tema'] == tema]
            rnd.shuffle(blok)
            out += blok
        if all(not (soal[out[k]][f] == soal[out[k + 1]][f] == soal[out[k + 2]][f])
               for k in range(len(out) - 2) for f in ('kunci', 'tipe_kode')):
            return out
    return None


def cek(bins):
    semua = [i for b in bins for i in b]
    assert sorted(semua) == sorted(soal) and len(set(semua)) == 101
    assert [len(b) for b in bins] == [30, 30, 30, 11]
    for b in bins[:3]:
        qs = [soal[i] for i in b]
        assert Counter(q['tema'] for q in qs) == Counter(TEMA)
        assert Counter(q['level_kognitif'] for q in qs) == Counter(LEVEL)
        assert sum(q['jangkar_faktual'] for q in qs) >= 9
        ky = Counter(q['kunci'] for q in qs)
        assert all(4 <= ky[k] <= 7 for k in 'ABCDE'), ky
        assert max(Counter(q['bentuk_tegangan'] for q in qs).values()) <= 9
        assert sum(map(tidak_hanya, qs)) <= 6 and sum(map(pembuka, qs)) <= 2
        for g in GRUP:
            assert len(set(b) & set(g)) <= 1, g
        for k in range(len(b) - 2):
            for f in ('kunci', 'tipe_kode'):
                assert not (soal[b[k]][f] == soal[b[k + 1]][f] == soal[b[k + 2]][f]), (b[k], f)


for SEED in range(2026, 2126):  # seed pertama yang lolos susun + urut
    bins = susun(SEED)
    urut = bins and [urutkan(b, SEED + p) for p, b in enumerate(bins[:3])]
    if urut and all(urut):
        bins = urut + [sorted(bins[CADANGAN])]
        break
else:
    raise SystemExit('tidak ketemu susunan yang memenuhi semua batas')
print('seed', SEED)
cek(bins)

for p, b in enumerate(bins):
    qs = [soal[i] for i in b]
    nama = f'Paket {p + 1}' if p < 3 else 'Cadangan'
    print(f'== {nama} ({len(b)}) ==')
    print('  id   :', ' '.join(b))
    print('  tema :', dict(Counter(q['tema'].split()[0] for q in qs)))
    print('  level:', dict(sorted(Counter(q['level_kognitif'] for q in qs).items())),
          '| jangkar', sum(q['jangkar_faktual'] for q in qs),
          '| tidak hanya', sum(map(tidak_hanya, qs)), '| pembuka "Di tengah"', sum(map(pembuka, qs)))
    print('  kunci:', dict(sorted(Counter(q['kunci'] for q in qs).items())),
          '| T:', dict(sorted(Counter(q['bentuk_tegangan'] for q in qs).items())))
    if p < 3:
        print('  grup :', ' · '.join('/'.join(set(b) & set(g)) for g in GRUP if set(b) & set(g)))

if '--tulis' in sys.argv:
    for p, b in enumerate(bins):
        nama = f'paket_twk_{p + 1}.json' if p < 3 else 'cadangan_twk.json'
        out = {'meta': {'judul': f"TWK D'AJIKS v1.5 — {'Paket ' + str(p + 1) if p < 3 else 'Cadangan'}",
                        'sumber': 'tmp/v15/bank_v15_draft.json', 'seed': SEED, 'jumlah_soal': len(b),
                        'status': 'draf, menunggu reviu manusia'},
               'soal': [soal[i] for i in b]}
        json.dump(out, open(os.path.join(here, nama), 'w'), ensure_ascii=False, indent=2)
        print('tulis', nama)
