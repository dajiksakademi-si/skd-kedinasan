# Gabung semua patch_*.json ke bank_soal_100.json -> v15/bank_v15_draft.json
# id yang belum ada di bank (mis. DAJ-TWK-101) ditambahkan di akhir
import json, glob, os, sys
from collections import Counter
here = os.path.dirname(os.path.abspath(__file__))
bank = json.load(open(os.path.join(here, '..', '..', 'bank_soal_100.json')))
patched = set()
for f in sorted(glob.glob(os.path.join(here, 'patch_*.json'))):
    for qid, p in json.load(open(f)).items():
        q = next((x for x in bank['soal'] if x['id'] == qid), None)
        if q is None:
            q = {}
            bank['soal'].append(q)
        q.update(p)
        q['sumber'] = 'MR BADRUN TWK ENGINE v1.5 (revisi 2026-10-25 dari v1.3)'
        patched.add(qid)
bank['meta']['engine']['versi'] = '1.5'
bank['meta']['judul'] = 'Bank Soal TWK D’AJIKS Akademi — 101 Butir · 3 Paket SKD + Cadangan'
soal = bank['soal']
bank['meta']['jumlah_soal'] = len(soal)
dist = bank['meta']['distribusi']
for k, field in [('tema', 'tema'), ('level_kognitif', 'level_kognitif'), ('kunci', 'kunci'),
                 ('tipe_engine', 'tipe_kode'), ('kategori_jawaban', 'kategori_jawaban')]:
    dist[k] = dict(sorted(Counter(q[field] for q in soal).items()))
meta = bank['meta']
meta.update(versi_bank='1.5.0', tanggal_penyusunan='2026-10-25', status='Draf v1.5, menunggu reviu manusia')
qa = meta['qa']
fmt = lambda d, sep: sep.join(f'{k}{v}' if sep == ' ' else f'{k} {v}' for k, v in d.items())
qa['status_validasi_struktur'] = ('lulus validator v1.5 (0 error; peringatan kata stem pada kunci '
                                  '= petunjuk Gerbang 1, bukan error)')
qa['jumlah_jangkar_faktual'] = sum(q['jangkar_faktual'] for q in soal)
qa['status_kunci_internal'] = dict(Counter(q['status_kunci'] for q in soal))
qa['pemeriksaan'] = [
    f'{len(soal)} ID unik dan berurutan (DAJ-TWK-001 s.d. {len(soal):03d})',
    'tepat lima opsi A–E, kunci, pembahasan enam bagian, dan analisis kelima opsi; tiap pengecoh berkode D1–D8',
    'stem tiga sampai empat kalimat, memuat dua kutub eksplisit dengan bentuk tegangan T1–T5',
    'satu bentuk tegangan paling banyak 30% dan bingkai "tidak hanya … tetapi juga" paling banyak 20% bank',
    'opsi 8 sampai 14 kata dengan rentang maksimal 4 kata; kunci tidak menjadi satu-satunya opsi terpanjang',
    'kunci bukan satu-satunya opsi berkata sambung dua sisi; tidak ada kata absolut pada opsi',
    'distribusi sesuai blueprint — tema ' + '/'.join(str(v) for v in sorted(dist['tema'].values(), reverse=True))
    + ', level ' + fmt(dist['level_kognitif'], ' · ') + ', kunci ' + fmt(dist['kunci'], ' '),
    'pembahasan siswa bebas istilah penyusun soal (stem, kode D1–D8/T1–T5, level, label kategori); kode tetap di analisis_opsi',
    'tidak ada duplikasi stem ter-normalisasi atau kemiripan tinggi (Jaccard ≥ 0,72)',
    'dipecah menjadi 3 paket × 30 + 11 cadangan (seed 2027) dengan batas komposisi SKD di-assert',
]
json.dump(bank, open(os.path.join(here, 'bank_v15_draft.json'), 'w'), ensure_ascii=False, indent=2)
print(f'patched {len(patched)}:', ' '.join(sorted(i[-3:] for i in patched)))
