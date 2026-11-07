"""Gabungan pembahasan siswa per kelompok (berkas terpisah agar < 500 baris)."""
from bahas_k1 import BAHAS
from bahas_k2 import BAHAS as _K2
BAHAS = {**BAHAS, **_K2}
from bahas_k3 import BAHAS as _K3
BAHAS = {**BAHAS, **_K3}
