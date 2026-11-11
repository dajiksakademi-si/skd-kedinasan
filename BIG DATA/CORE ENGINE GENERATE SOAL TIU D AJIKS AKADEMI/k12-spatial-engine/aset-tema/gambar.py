"""Aset bertema yang digambar Claude lewat kode (pengganti codex bila codex tidak diizinkan).
Aturan rupa sama dengan prompt-paket1.txt: viewBox 100, hanya #111/#fff, tekstur putih di atas hitam.
    python3 aset-tema/gambar.py [tema...]   tulis aset-tema/<tema>/*.svg
"""
import math, os, sys

D = os.path.dirname(os.path.abspath(__file__))
B, W = "#111", "#fff"


def svg(*isi):
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  ' + "\n  ".join(isi) + "\n</svg>\n"


def path(d, fill=B, **k):
    ex = "".join(f' {a.replace("_", "-")}="{v}"' for a, v in k.items())
    return f'<path d="{d}" fill="{fill}"{ex}/>'


def gores(d, w, warna=W):
    return path(d, "none", stroke=warna, stroke_width=w, stroke_linecap="round", stroke_linejoin="round")


def lingkar(x, y, r, fill=W):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'


def arsir(cx, cy, r, sudut, jarak, w=3, warna=W):
    """Garis putih sejajar di dalam lingkaran (cx, cy, r) — tekstur arsiran."""
    a = math.radians(sudut); ux, uy, nx, ny = math.cos(a), math.sin(a), -math.sin(a), math.cos(a)
    out, t = [], -r + jarak / 2
    while t < r:
        h = math.sqrt(max(r * r - t * t, 0))
        if h > 3:
            x0, y0 = cx + nx * t, cy + ny * t
            out.append(gores(f"M{x0 - ux * h:.1f} {y0 - uy * h:.1f} L{x0 + ux * h:.1f} {y0 + uy * h:.1f}", w, warna))
        t += jarak
    return out


def kisi(cx, cy, r, jarak=7, w=2.6, sudut=40, warna=W):
    return arsir(cx, cy, r, sudut, jarak, w, warna) + arsir(cx, cy, r, sudut + 90, jarak, w, warna)


def dapur():
    return {
        # teko: badan bulat berkisi, cerat kanan, pegangan kiri, tutup bertombol
        "teko": svg(
            gores("M30 42 Q8 40 11 58 Q14 72 30 68", 8, B),
            path("M74 52 Q84 46 88 28 Q92 24 95 29 Q92 50 76 66 Z"),
            path("M23 56 Q23 32 49 30 Q76 31 76 55 Q76 81 49 83 Q24 82 23 56 Z"),
            path("M34 31 Q48 14 63 30 Z"), lingkar(48, 17, 6, B),
            *kisi(49, 57, 19), gores("M30 34 Q48 27 68 35", 3)),
        # wajan: badan bulat berarsir, bibir tuang di kanan atas, gagang melengkung ke kiri bawah
        "wajan": svg(
            gores("M42 66 Q26 70 18 80 Q13 87 8 90", 10, B), lingkar(9, 90, 2.8),
            path("M30 40 Q32 14 60 12 Q86 13 90 38 Q91 47 96 44 Q92 58 86 62 Q74 78 56 76 Q31 72 30 40 Z"),
            *arsir(60, 43, 23, 18, 7.5), gores("M38 26 Q56 14 78 22", 3)),
        # cangkir: badan berbintik, pegangan kanan, tatakan miring
        "cangkir": svg(
            gores("M66 34 Q86 32 84 48 Q82 60 64 58", 8, B),
            path("M22 22 L72 22 Q71 52 62 68 Q47 78 33 68 Q23 52 22 22 Z"),
            path("M8 82 Q40 66 92 70 Q94 76 88 80 Q46 90 12 90 Q4 88 8 82 Z"),
            *[lingkar(x, y, r) for x, y, r in [(32, 32, 3.4), (46, 30, 2.4), (60, 34, 3.6), (38, 46, 2.6), (54, 48, 3.2), (44, 60, 2.4), (58, 60, 2)]],
            gores("M20 86 Q48 78 84 76", 2.6)),
        # sendok: kepala cekung di kiri atas, gagang melengkung ke kanan bawah
        "sendok": svg(
            gores("M36 40 Q62 44 70 64 Q76 80 90 88", 9, B),
            path("M10 30 Q12 12 30 10 Q48 12 46 30 Q44 46 26 46 Q10 44 10 30 Z"),
            path("M18 28 Q22 18 32 17 Q26 24 24 34 Z", W)),
        # biji kopi [kecil]: lonjong dengan belahan tengah melengkung
        "bijikopi": svg(
            path("M50 10 Q80 14 82 50 Q80 86 50 90 Q20 86 18 50 Q20 14 50 10 Z"),
            gores("M50 16 Q38 34 50 50 Q62 66 50 84", 7)),
    }


def halus(titik, tutup=True):
    """Lengkung mulus lewat titik-titik (Catmull-Rom ke Bezier). Paket 2 dst: bentuk ditulis sebagai titik, tanpa ruas lurus."""
    n = len(titik)
    at = lambda i: titik[i % n] if tutup else titik[max(0, min(n - 1, i))]
    d = f"M{titik[0][0]} {titik[0][1]}"
    for i in range(n if tutup else n - 1):
        p0, p1, p2, p3 = at(i - 1), at(i), at(i + 1), at(i + 2)
        d += f" C{p1[0] + (p2[0] - p0[0]) / 6:.1f} {p1[1] + (p2[1] - p0[1]) / 6:.1f} {p2[0] - (p3[0] - p1[0]) / 6:.1f} {p2[1] - (p3[1] - p1[1]) / 6:.1f} {p2[0]} {p2[1]}"
    return d + (" Z" if tutup else "")


def garis_ganda(d):
    return [path(d, W, stroke=B, stroke_width=8.5, stroke_linejoin="round"), path(d, "none", stroke=W, stroke_width=3.2, stroke_linejoin="round")]


def titik_kutub(rad, deg):
    a = math.radians(deg)
    return f"{50 + rad * math.cos(a):.1f} {50 + rad * math.sin(a):.1f}"


def kutub(f, langkah=2.5):
    """Lintasan tertutup r = f(sudut derajat) mengelilingi pusat (50, 50)."""
    n = int(360 / langkah)
    return "M" + " L".join(titik_kutub(f(i * langkah), i * langkah - 90) for i in range(n)) + " Z"


R_MOTIF = 42
def motif_d(bentuk, n):
    """Motif ubin berlengan n. Semua bentuk punya tepat n lengan."""
    R, per = R_MOTIF, 360 / n
    fase = lambda t: (t / per) % 1  # 0..1 dalam satu lengan
    if bentuk == "bintang":
        return "M" + " L".join(titik_kutub(R if i % 2 == 0 else R * 0.44, i * per / 2 - 90) for i in range(2 * n)) + " Z"
    if bentuk == "bunga":
        return kutub(lambda t: R * (0.6 + 0.4 * abs(math.cos(math.pi * fase(t))) ** 0.7))
    if bentuk == "tombak":
        return kutub(lambda t: R * (0.3 + 0.7 * abs(math.cos(math.pi * fase(t))) ** 3))
    if bentuk == "baling":
        return kutub(lambda t: R * (0.34 + 0.66 * fase(t) ** 1.5))
    if bentuk == "tetes":  # n kelopak lepas
        out, lebar = [], R * math.sin(math.pi / n) * 0.7
        for k in range(n):
            a = math.radians(k * per - 90); ux, uy, nx, ny = math.cos(a), math.sin(a), -math.sin(a), math.cos(a)
            P = lambda s, w: f"{50 + ux * s + nx * w:.1f} {50 + uy * s + ny * w:.1f}"
            out.append(f"M{P(7, 0)} Q{P(R * 0.45, lebar * 1.05)} {P(R * 0.8, lebar * 0.56)} Q{P(R * 1.04, 0)} {P(R * 0.8, -lebar * 0.56)} Q{P(R * 0.45, -lebar * 1.05)} {P(7, 0)} Z")
        return " ".join(out)
    gel = lambda f: (math.cos(2 * math.pi * f) + 1) / 2  # puncak di f = 0, tanpa sudut
    if bentuk == "gelombang":
        return kutub(lambda t: R * (0.7 + 0.3 * gel(fase(t))))
    if bentuk == "gumpal":
        return kutub(lambda t: R * (0.42 + 0.58 * gel(fase(t)) ** 0.8))
    if bentuk == "lonjong":
        return kutub(lambda t: R * (0.3 + 0.7 * gel(fase(t)) ** 3))
    if bentuk == "ikal":
        return kutub(lambda t: R * (0.4 + 0.6 * gel(fase(t) + 0.16 * math.sin(2 * math.pi * fase(t)))))
    raise ValueError(bentuk)


def motif(bentuk, n, isi):
    d = motif_d(bentuk, n)
    if isi == "pekat":
        return svg(path(d))
    if isi == "garis":  # dua kontur sejajar, isi putih
        return svg(path(d, W, stroke=B, stroke_width=9, stroke_linejoin="round"), path(d, "none", stroke=W, stroke_width=3.6, stroke_linejoin="round"))
    geser = 0.8 if bentuk == "baling" else 0  # puncak baling ada di ujung fase
    return svg(path(d), lingkar(50, 50, 3.6),
               *[f'<circle cx="{50 + R_MOTIF * 0.56 * math.cos(math.radians((k + geser) * 360 / n - 90)):.1f}" cy="{50 + R_MOTIF * 0.56 * math.sin(math.radians((k + geser) * 360 / n - 90)):.1f}" r="3" fill="{W}"/>' for k in range(n)])


def ubin():
    c, a, z = 26, 3, 97
    seg8 = f"{a + c},{a} {z - c},{a} {z},{a + c} {z},{z - c} {z - c},{z} {a + c},{z} {a},{z - c} {a},{a + c}"
    keluar = {
        "latar": svg(f'<polygon points="{seg8}" fill="{B}"/>', *kisi(50, 50, 46, 6.4, 2, 0), lingkar(50, 50, 33, B)),
        "latar-putih": svg(f'<polygon points="{seg8}" fill="{W}" stroke="{B}" stroke-width="3.4" stroke-linejoin="round"/>', *kisi(50, 50, 45.4, 6.4, 1.7, 0, B), lingkar(50, 50, 33, W)),
        # tanda pojok [kecil]: biji cengkih
        "tanda": svg(path("M50 8 Q78 34 70 62 Q62 90 50 92 Q38 90 30 62 Q22 34 50 8 Z"), lingkar(50, 60, 9)),
    }
    for b in ["bintang", "bunga", "tombak", "baling", "tetes"]:
        for n in [4, 5, 6]:
            for isi in ["pekat", "garis", "bintik"]:
                keluar[f"{b}-{n}-{isi}"] = motif(b, n, isi)
    return keluar


def kebun():
    return {
        # wortel [kecil]: badan meruncing ke bawah, dua daun
        "wortel": svg(gores("M50 34 Q42 18 30 8", 9, B), gores("M50 34 Q60 18 72 8", 9, B),
                      path("M50 94 Q28 62 28 46 Q28 30 50 30 Q72 30 72 46 Q72 62 50 94 Z"), gores("M38 48 L54 48", 4), gores("M46 62 L60 62", 4)),
        # cabai [kecil]: melengkung ke kiri bawah, tangkai kanan atas
        "cabai": svg(gores("M68 26 Q70 12 82 8", 8, B), path("M58 22 Q84 24 82 48 Q74 78 12 90 Q48 66 54 46 Q56 32 58 22 Z")),
        # sekop: mata hitam berarsir di kiri bawah, gagang ke kanan atas berpegangan T
        "sekop": svg(gores("M42 58 Q68 46 80 14", 9, B), gores("M66 10 L95 18", 10, B),
                     path("M60 40 Q70 62 48 80 Q30 95 7 92 Q5 72 20 56 Q28 47 36 42 L47 53 Z"),
                     *arsir(32, 69, 17, 40, 6.5), gores("M14 62 Q22 50 34 48", 3)),
    }


def satwa():
    cangkang = "M44 16 Q74 18 74 48 Q72 76 44 78 Q14 76 14 46 Q16 18 44 16 Z"
    spiral = "M44 48 Q52 40 58 50 Q60 64 44 67 Q26 64 25 46 Q28 28 46 26 Q64 28 66 46"
    jalan = "M10 84 L74 84 Q90 82 90 62"
    sungut = [gores("M90 60 L96 40", 4, B), gores("M84 60 L80 40", 4, B)]
    return {
        # burung: bertengger menghadap kanan, ekor panjang kiri bawah, sayap berkisi
        "burung": svg(path("M38 60 L6 92 L20 95 L50 72 Z"), gores("M56 70 L58 88", 5, B), gores("M48 90 L70 90", 5, B),
                      path("M28 56 Q30 32 56 28 Q68 16 80 26 Q86 30 95 34 Q86 40 81 42 Q78 62 58 72 Q36 76 28 56 Z"),
                      lingkar(73, 30, 2.8), *kisi(50, 50, 16, 6, 2.4), gores("M58 32 Q70 28 76 40", 2.6)),
        # siput: merayap ke kanan, cangkang pekat dengan guratan spiral putih
        "siput": svg(gores(jalan, 13, B), path(cangkang), gores(spiral, 4.6), *sungut),
        # siput-garis: bentuk luar sama, garis ganda (isi putih)
        "siput-garis": svg(gores(jalan, 13, B), gores(jalan, 5), path(cangkang, W, stroke=B, stroke_width=9), path(cangkang, "none", stroke=W, stroke_width=3.2), gores(spiral, 4, B), *sungut),
        # kura-kura: tampak atas, kepala kiri atas, satu sirip kanan atas besar, tempurung petak putih
        "kura": svg(path("M62 28 Q80 8 96 8 Q94 30 78 42 Z"), path("M32 72 L20 86 L32 93 L44 80 Z"), path("M78 70 L94 82 L86 92 L68 82 Z"), gores("M58 80 Q58 92 50 96", 6, B),
                    path("M32 38 Q14 34 9 20 Q11 7 24 9 Q37 16 41 32 Z"), lingkar(18, 18, 2.8),
                    path("M29 40 Q44 22 66 28 Q88 40 85 62 Q76 84 54 84 Q30 79 24 60 Q25 48 29 40 Z"),
                    gores("M42 44 L58 38 L71 49 L67 65 L50 71 L38 59 Z", 3.4), *[gores(d, 3) for d in ["M42 44 L33 36", "M58 38 L60 30", "M71 49 L81 46", "M67 65 L77 72", "M50 71 L48 80", "M38 59 L28 62"]]),
        # tupai: menghadap kiri, ekor besar melengkung ke kanan atas, ekor berarsir
        "tupai": svg(path("M54 76 Q96 84 96 44 Q92 10 64 10 Q46 16 54 34 Q72 28 74 46 Q70 60 50 56 Z"),
                     path("M56 84 Q68 60 50 46 Q40 38 38 28 L42 14 L32 20 Q20 14 12 24 Q6 32 6 38 L20 40 Q22 48 28 54 Q22 72 30 86 Z"),
                     gores("M22 88 L62 88", 7, B), lingkar(24, 28, 2.8), gores("M38 62 Q44 70 40 80", 3),
                     *[gores(d, 3.2) for d in ["M72 20 L66 30", "M84 30 L76 36", "M88 46 L78 48", "M84 62 L74 58", "M70 72 L66 62"]]),
    }


def buah():
    return {
        # apel [kecil]: pekat, satu daun, kilau putih
        "apel": svg(gores("M50 30 Q52 18 58 10", 6, B), path("M60 16 Q76 6 88 14 Q80 28 62 24 Z"),
                    path("M50 32 Q72 18 86 40 Q94 66 72 86 Q60 96 50 88 Q40 96 28 86 Q6 66 14 40 Q28 18 50 32 Z"), gores("M26 44 Q24 58 34 70", 5)),
        # pisang [kecil]: satu buah melengkung, garis ganda
        "pisang": svg(path("M20 16 L30 12 Q34 50 62 62 Q78 68 90 62 Q92 72 84 78 Q44 94 22 56 Q14 38 20 16 Z", W, stroke=B, stroke_width=8, stroke_linejoin="round"),
                      gores("M26 22 Q30 60 74 74", 4, B)),
        # manggis [kecil]: bulat berbintik, kelopak di atas
        "manggis": svg(path("M50 26 Q86 24 88 58 Q86 92 50 92 Q14 92 12 58 Q14 24 50 26 Z"),
                       path("M28 26 L38 10 L50 22 L62 10 L72 26 Q50 38 28 26 Z"),
                       *[lingkar(x, y, 4.4) for x, y in [(32, 54), (50, 48), (68, 54), (40, 70), (60, 70), (50, 82)]]),
    }


def tukang():
    bentuk = {
        "palu": "M14 16 L62 16 Q74 16 76 28 L76 38 L54 38 L54 88 Q54 95 47 95 Q40 95 40 88 L40 38 L14 38 Q6 26 14 16 Z",
        "tang": "M50 6 Q38 10 38 30 L44 46 Q28 62 26 94 L40 94 Q42 72 50 60 Q58 72 60 94 L74 94 Q72 62 56 46 L62 30 Q62 10 50 6 Z",
        "kunci": "M28 8 L30 28 L42 36 L58 36 L70 28 L72 8 Q90 20 86 42 Q80 52 60 54 L60 86 Q60 95 50 95 Q40 95 40 86 L40 54 Q20 52 14 42 Q10 20 28 8 Z",
        "gergaji": "M8 62 L14 54 L20 62 L26 54 L32 62 L38 54 L44 62 L50 54 L56 62 L62 54 L64 30 Q40 34 8 52 Z M64 22 L92 22 L92 60 L64 60 Z",
        "obeng": "M34 8 Q50 2 66 8 L64 50 L56 56 L56 84 L50 95 L44 84 L44 56 L36 50 Z",
    }
    keluar = {"sulur": svg(gores("M14 90 Q22 50 58 40 Q78 36 88 16", 8, B), path("M30 58 Q18 46 24 30 Q40 34 42 50 Z"), path("M50 42 Q44 26 56 14 Q68 24 62 40 Z"), path("M24 74 Q42 82 54 72 Q44 58 30 62 Z"), path("M66 38 Q84 46 94 38 Q88 22 74 26 Z"))}
    for n, d in bentuk.items():
        keluar[n] = svg(path(d))
        keluar[n + "-garis"] = svg(path(d, W, stroke=B, stroke_width=7, stroke_linejoin="round"), path(d, "none", stroke=W, stroke_width=2.6, stroke_linejoin="round"))
    return keluar


def cuaca():
    def bilah(a, garis):
        c, s_ = math.cos(math.radians(a)), math.sin(math.radians(a))
        P = lambda x, y: f"{50 + c * x - s_ * y:.1f} {46 + s_ * x + c * y:.1f}"
        d = f"M{P(0, 0)} Q{P(10, -30)} {P(38, -24)} Q{P(28, -8)} {P(0, 0)} Z"
        return [path(d, W, stroke=B, stroke_width=7, stroke_linejoin="round"), path(d, "none", stroke=W, stroke_width=2.4, stroke_linejoin="round")] if garis else [path(d)]
    tetes = "M50 8 Q80 50 78 66 Q72 92 50 92 Q28 92 22 66 Q20 50 50 8 Z"
    return {
        # awan gelap menggembung ke kiri, petir zigzag di kanan bawah
        "awanpetir": svg(path("M14 62 Q0 56 4 38 Q10 22 26 28 Q28 6 52 10 Q70 12 72 34 Q90 36 90 50 Q88 62 72 62 L30 62 Q20 66 14 62 Z"),
                         f'<polygon points="68,58 52,80 65,80 55,97 84,73 70,73 80,58" fill="{B}" stroke="{W}" stroke-width="2.5" stroke-linejoin="round"/>',
                         gores("M18 46 Q26 32 40 38", 3.6), gores("M54 28 Q68 26 76 40", 3.6)),
        # payung terbuka, kain berarsir, gagang J ke kiri
        "payung": svg(gores("M56 18 L50 78 Q46 96 28 90 Q18 84 22 74", 7, B),
                      path("M12 56 Q20 14 58 12 Q94 16 94 56 Q80 44 70 58 Q58 44 44 60 Q30 46 12 56 Z"),
                      *arsir(54, 36, 18, 60, 6.5), gores("M22 44 Q28 26 44 20", 3)),
        # kincir kertas empat bilah melengkung searah, tiang ke kiri bawah, satu bilah garis ganda
        "kincir": svg(gores("M50 48 L22 95", 7, B), *bilah(0, True), *bilah(90, False), *bilah(180, False), *bilah(270, False), lingkar(50, 46, 4)),
        "tetes": svg(path(tetes)),
        "tetes-garis": svg(path(tetes, W, stroke=B, stroke_width=11, stroke_linejoin="round")),
    }


def serangga():
    return {
        # kupu [kecil]: tampak atas, sayap bintik
        "kupu": svg(path("M48 44 Q30 8 10 16 Q2 34 18 50 Q4 62 14 80 Q34 86 48 58 Z"), path("M52 44 Q70 8 90 16 Q98 34 82 50 Q96 62 86 80 Q66 86 52 58 Z"),
                    gores("M50 30 L50 76", 7, B), *[lingkar(x, y, 4.6) for x, y in [(24, 32), (76, 32), (26, 66), (74, 66)]]),
        # kumbang [kecil]: tampak atas, punggung bergaris tengah
        "kumbang": svg(lingkar(50, 18, 12, B), path("M50 22 Q84 26 84 58 Q82 90 50 92 Q18 90 16 58 Q18 26 50 22 Z"), gores("M50 30 L50 88", 5),
                       *[gores(d, 6, B) for d in ["M18 44 L6 34", "M82 44 L94 34", "M16 66 L4 74", "M84 66 L96 74"]]),
        # daun [kecil]: lonjong garis ganda dengan tulang tengah
        "daun": svg(path("M50 6 Q86 34 76 66 Q66 90 50 94 Q34 90 24 66 Q14 34 50 6 Z", W, stroke=B, stroke_width=9, stroke_linejoin="round"), gores("M50 18 L50 84", 6, B)),
    }


def kampung():
    return {
        # rumah panggung: atap miring ke kanan, tangga di kiri, dinding berbintik
        "rumah": svg(path("M3 50 L46 8 L97 42 L88 54 L48 28 L14 60 Z"), path("M24 50 L80 50 L80 76 L24 76 Z"), *[gores(d, 7, B) for d in ["M30 76 L30 95", "M72 76 L72 95"]],
                     gores("M6 95 L24 70", 6, B), gores("M10 86 L20 86", 4, B), *[lingkar(x, y, 3) for x, y in [(36, 60), (50, 58), (64, 60), (44, 69), (58, 69)]]),
        # lumbung: atap tinggi melengkung condong ke kiri, kaki berjenjang, dinding garis ganda
        "lumbung": svg(path("M6 58 Q4 16 44 5 Q86 12 95 54 L74 48 Q58 32 42 36 Q26 42 26 60 Z"),
                       path("M30 56 L72 52 L72 80 L30 80 Z", W, stroke=B, stroke_width=7, stroke_linejoin="round"), gores("M40 64 L62 62", 4, B), gores("M40 72 L62 70", 4, B),
                       *[gores(d, 7, B) for d in ["M36 84 L32 97", "M66 84 L72 97"]]),
        # pondok sawah: atap rumbia berarsir miring ke kanan, satu tiang lebih tinggi
        "pondok": svg(path("M2 44 L60 10 L98 36 L92 48 L60 30 L10 58 Z"), gores("M22 40 L34 34", 3), gores("M42 28 L54 22", 3), gores("M68 22 L80 30", 3),
                      gores("M20 54 L20 97", 7, B), gores("M82 46 L82 78", 7, B), path("M16 62 L86 62 L86 72 L16 72 Z")),
        # pohon kelapa [kecil]: batang melengkung, pelepah
        "pohon": svg(gores("M34 96 Q36 56 64 36", 8, B), *[gores(d, 7, B) for d in ["M64 36 Q44 10 20 22", "M64 36 Q66 8 92 12", "M64 36 Q88 34 96 58", "M64 36 Q44 34 28 52"]], lingkar(56, 42, 5, B), lingkar(70, 44, 5, B)),
        # sumur timba [kecil]: bibir sumur, tiang satu sisi, timba tergantung di kanan
        "sumur": svg(path("M12 60 L62 60 L58 96 L16 96 Z"), gores("M16 72 L58 72", 3.6), gores("M16 84 L56 84", 3.6), gores("M18 60 L18 14", 7, B), gores("M12 14 L86 14", 7, B), gores("M74 14 L74 42", 3.5, B), path("M64 42 L86 42 L82 64 L68 64 Z")),
        # ayam jago [kecil]: menghadap kanan, jengger, ekor kiri
        "ayam": svg(path("M4 16 Q18 26 26 48 Q10 34 4 44 Q14 54 28 60 Q32 42 50 44 Q60 46 64 34 Q60 18 76 16 Q90 20 88 34 L96 40 L86 44 Q84 64 66 78 Q46 90 32 74 Q18 62 4 16 Z"),
                    path("M68 16 L72 4 L78 12 L86 6 L84 20 Z"), gores("M56 88 L56 97", 6, B), gores("M44 86 L42 97", 6, B), lingkar(78, 26, 2.8), gores("M42 58 Q52 68 62 56", 3.4)),
    }


def tumbuhan():
    daun = halus([(50, 5), (66, 14), (64, 28), (86, 22), (94, 38), (72, 50), (90, 62), (82, 78), (60, 68), (58, 92), (42, 92), (40, 68), (20, 80), (8, 66), (28, 50), (10, 34), (20, 20), (38, 28), (36, 14)])
    return {
        # kaktus: lengan kanan tinggi, lengan kiri rendah, ujung bulat
        "kaktus": svg(gores(halus([(50, 92), (49, 56), (50, 16)], False), 22, B), gores(halus([(50, 70), (28, 72), (19, 56), (19, 44)], False), 14, B), gores(halus([(50, 50), (72, 50), (81, 34), (81, 20)], False), 14, B),
                      gores(halus([(44, 26), (43, 40), (44, 54)], False), 4.5), gores(halus([(56, 62), (57, 74), (56, 84)], False), 4.5)),
        # jamur: tudung miring, tangkai melengkung, bintik besar
        "jamur": svg(path(halus([(38, 50), (56, 50), (58, 68), (52, 86), (60, 96), (34, 96), (28, 88), (36, 68)])),
                     path(halus([(4, 46), (10, 24), (30, 8), (58, 6), (84, 20), (96, 52), (78, 62), (50, 54), (24, 54)])),
                     lingkar(34, 30, 7), lingkar(60, 24, 5.5), lingkar(74, 42, 5)),
        # daun menjari: pekat dan garis ganda, bentuk luar sama
        "daun": svg(path(daun), gores(halus([(50, 22), (49, 50), (50, 80)], False), 4.5)),
        "daun-garis": svg(*garis_ganda(daun), gores(halus([(50, 22), (49, 50), (50, 80)], False), 4.5, B)),
        # tulip: tiga kelopak bulat, tangkai melengkung, satu daun di kanan
        "tulip": svg(gores(halus([(46, 48), (42, 72), (50, 96)], False), 8, B), path(halus([(48, 82), (66, 74), (86, 54), (90, 66), (74, 86), (54, 94)])),
                     path(halus([(13, 18), (22, 10), (32, 19), (41, 7), (53, 7), (61, 19), (71, 10), (81, 17), (79, 38), (66, 54), (44, 60), (24, 52), (13, 36)])),
                     gores(halus([(34, 28), (34, 40), (42, 50)], False), 4), gores(halus([(58, 30), (58, 42), (52, 50)], False), 4)),
    }


def mozaik():
    tepi = kutub(lambda t: 44 / (abs(math.cos(math.radians(t))) ** 2.3 + abs(math.sin(math.radians(t))) ** 2.3) ** (1 / 2.3))
    manik = lambda w: [f'<circle cx="{50 + 39.5 * math.cos(math.radians(i * 15)):.1f}" cy="{50 + 39.5 * math.sin(math.radians(i * 15)):.1f}" r="1.9" fill="{w}"/>' for i in range(24)]
    cincin = lambda w: f'<circle cx="50" cy="50" r="35.2" fill="none" stroke="{w}" stroke-width="1.8"/>'
    keluar = {
        "latar": svg(path(tepi), cincin(W), *manik(W), lingkar(50, 50, 33, B)),
        "latar-putih": svg(path(tepi, W, stroke=B, stroke_width=3.4, stroke_linejoin="round"), cincin(B), *manik(B), lingkar(50, 50, 33, W)),
        "tanda": svg(path(halus([(50, 8), (70, 30), (74, 60), (62, 88), (38, 88), (26, 60), (30, 30)])), lingkar(50, 58, 9)),
    }
    for b in ["gelombang", "gumpal", "lonjong", "ikal", "tetes"]:
        for n in [5, 6, 7]:
            for isi in ["pekat", "garis", "bintik"]:
                keluar[f"{b}-{n}-{isi}"] = motif(b, n, isi)
    return keluar


def sawah():
    padi = halus([(20, 92), (30, 60), (48, 30), (72, 12), (88, 10), (90, 22), (78, 30), (84, 40), (70, 46), (74, 58), (60, 62), (60, 74), (46, 76), (42, 92)])
    return {
        # kerbau: menghadap kanan, tanduk melengkung, ekor kiri
        "kerbau": svg('<g transform="translate(9 9) scale(.82)">', gores(halus([(72, 28), (62, 14), (48, 12)], False), 8, B), gores(halus([(84, 26), (94, 14), (86, 5)], False), 8, B), gores(halus([(11, 48), (4, 60), (9, 76)], False), 6, B),
                      path(halus([(10, 46), (18, 34), (40, 30), (62, 32), (70, 24), (84, 22), (95, 30), (93, 43), (80, 48), (76, 62), (79, 88), (65, 91), (62, 68), (40, 70), (35, 90), (21, 91), (22, 66), (12, 62)])),
                      lingkar(82, 32, 3.2), gores(halus([(28, 45), (44, 40), (60, 45)], False), 5), "</g>"),
        # bebek: menghadap kanan, ekor naik di kiri, sayap berbintik
        "bebek": svg(path(halus([(5, 44), (20, 52), (34, 50), (46, 44), (50, 30), (60, 15), (76, 13), (87, 26), (97, 31), (86, 39), (78, 39), (75, 52), (72, 72), (56, 88), (30, 88), (13, 75)])),
                     lingkar(70, 26, 3.2), *[lingkar(x, y, r) for x, y, r in [(30, 62, 4.4), (44, 58, 3.6), (56, 64, 4.4), (38, 74, 3.6), (52, 76, 3.6)]]),
        # padi: bulir melengkung; garis ganda dan pekat, bentuk luar sama
        "padi": svg(*garis_ganda(padi)),
        "padi-pekat": svg(path(padi), gores(halus([(34, 82), (46, 48), (72, 24)], False), 4.5)),
        # keong: cangkang lancip tumpul, guratan spiral tebal
        "keong": svg(path(halus([(88, 8), (95, 15), (82, 42), (73, 68), (51, 90), (25, 93), (7, 77), (9, 54), (30, 42), (52, 30), (74, 13)])),
                     gores(halus([(60, 34), (68, 44), (66, 58)], False), 5), gores(halus([(42, 44), (52, 56), (50, 72)], False), 5),
                     path(halus([(16, 66), (28, 58), (38, 66), (34, 80), (22, 84), (14, 76)]), W)),
    }


def hutan():
    return {
        # buah pinus [kecil]: lonjong, sisik guratan tebal
        "buahpinus": svg(path(halus([(50, 7), (72, 25), (79, 54), (65, 86), (50, 95), (35, 86), (21, 54), (28, 25)])), gores(halus([(32, 38), (50, 48), (68, 38)], False), 5.5), gores(halus([(32, 60), (50, 70), (68, 60)], False), 5.5)),
        # bulu [kecil]: melengkung, tulang tengah tebal
        "bulu": svg(path(halus([(10, 94), (18, 52), (46, 18), (84, 4), (96, 18), (90, 54), (62, 80), (32, 86)])), gores(halus([(22, 84), (50, 52), (84, 16)], False), 4.8)),
        # kapak: gagang melengkung, kepala di kanan atas dengan guratan
        "kapak": svg(gores(halus([(17, 93), (42, 66), (68, 26)], False), 15, B),
                     path(halus([(50, 8), (78, 3), (97, 26), (92, 56), (72, 50), (58, 38), (42, 26)])), gores(halus([(72, 14), (84, 28), (82, 44)], False), 5.5)),
    }


def biji():
    jagung = halus([(50, 8), (72, 28), (80, 58), (68, 88), (50, 94), (32, 88), (20, 58), (28, 28)])
    return {
        # kacang [kecil]: dua gembung, pekat, guratan tebal
        "kacang": svg(path(halus([(24, 12), (46, 10), (56, 32), (78, 46), (92, 68), (78, 92), (52, 88), (40, 68), (20, 54), (10, 30)])), gores(halus([(30, 28), (42, 44), (66, 64)], False), 6)),
        # jagung [kecil]: butir garis ganda
        "jagung": svg(path(jagung, W, stroke=B, stroke_width=11, stroke_linejoin="round"), gores(halus([(40, 50), (50, 62), (60, 50)], False), 6, B)),
        # kenari [kecil]: bulat pekat, belahan bergelombang
        "kenari": svg(path(halus([(50, 8), (80, 20), (92, 50), (80, 80), (50, 92), (20, 80), (8, 50), (20, 20)])), gores(halus([(50, 16), (40, 34), (58, 50), (42, 66), (50, 84)], False), 6)),
    }


def gerabah():
    bentuk = {
        "kendi": [(40, 30), (34, 14), (46, 8), (56, 14), (58, 30), (80, 30), (92, 24), (96, 34), (80, 44), (84, 66), (66, 90), (36, 90), (18, 66), (22, 42)],
        "guci": [(38, 8), (62, 8), (58, 22), (78, 40), (80, 66), (64, 92), (36, 92), (20, 66), (22, 40), (42, 22)],
        "vas": [(30, 8), (70, 8), (60, 34), (78, 62), (66, 92), (34, 92), (22, 62), (40, 34)],
        "periuk": [(30, 26), (70, 26), (88, 44), (92, 66), (72, 88), (28, 88), (8, 66), (12, 44)],
        "labu": [(44, 8), (56, 8), (58, 26), (74, 40), (70, 54), (84, 68), (72, 90), (28, 90), (16, 68), (30, 54), (26, 40), (42, 26)],
    }
    keluar = {"sulur": svg(gores(halus([(12, 92), (20, 56), (50, 40), (74, 46), (74, 64), (58, 62)], False), 10, B), path(halus([(56, 30), (66, 8), (90, 10), (86, 34), (66, 40)])), path(halus([(20, 44), (10, 22), (26, 8), (42, 22), (36, 42)])))}
    for n, t in bentuk.items():
        d = halus(t)
        keluar[n] = svg(path(d))
        keluar[n + "-garis"] = svg(*garis_ganda(d))
    return keluar


def alam():
    kerikil = halus([(30, 18), (64, 12), (88, 38), (84, 72), (52, 90), (20, 78), (10, 44)])
    return {
        # gunung api: asap condong ke kanan, guratan salju
        "gunung": svg(path(halus([(4, 92), (20, 62), (36, 32), (46, 24), (56, 28), (68, 52), (84, 72), (96, 92), (50, 95)])), path(halus([(46, 20), (60, 4), (78, 6), (88, 18), (74, 28), (56, 28)])), gores(halus([(30, 56), (44, 46), (58, 58)], False), 5.5)),
        # pohon miring: tajuk condong ke kiri, batang melengkung, bintik
        "pohonmiring": svg(gores(halus([(44, 52), (56, 74), (58, 95)], False), 14, B), path(halus([(5, 40), (13, 17), (38, 5), (62, 9), (78, 28), (71, 49), (48, 60), (22, 59)])), lingkar(30, 30, 5.5), lingkar(52, 24, 4.5), lingkar(46, 44, 4.5)),
        # karang: tebing berongga, satu sisi menjorok
        "karang": svg(path(halus([(6, 94), (8, 60), (20, 44), (24, 20), (46, 7), (74, 10), (95, 28), (92, 50), (72, 54), (62, 68), (70, 84), (66, 95), (36, 96)])),
                      path(halus([(24, 76), (32, 65), (46, 69), (46, 85), (30, 87)]), W), gores(halus([(42, 24), (60, 22), (74, 34)], False), 5.5)),
        "kerikil": svg(path(kerikil)),
        "kerikil-garis": svg(path(kerikil, W, stroke=B, stroke_width=11, stroke_linejoin="round")),
    }


def kolam():
    return {
        # ikan mas [kecil]: badan bulat, ekor kipas
        "ikanmas": svg(path(halus([(6, 50), (22, 30), (48, 26), (72, 42), (92, 24), (86, 50), (92, 76), (72, 58), (48, 74), (22, 70)])), lingkar(24, 44, 4.6), gores(halus([(40, 40), (48, 50), (40, 62)], False), 5)),
        # teratai [kecil]: kelopak garis ganda
        "teratai": svg(path(halus([(50, 8), (62, 28), (86, 28), (73, 50), (86, 72), (62, 72), (50, 92), (38, 72), (14, 72), (27, 50), (14, 28), (38, 28)]), W, stroke=B, stroke_width=9, stroke_linejoin="round"), lingkar(50, 50, 9, B)),
        # capung [kecil]: badan tebal, sayap bulat
        "capung": svg(gores(halus([(50, 10), (50, 50), (50, 92)], False), 11, B), path(halus([(46, 28), (22, 12), (6, 20), (12, 36), (34, 40)])), path(halus([(54, 28), (78, 12), (94, 20), (88, 36), (66, 40)])), path(halus([(46, 46), (24, 44), (10, 56), (20, 66), (40, 60)])), path(halus([(54, 46), (76, 44), (90, 56), (80, 66), (60, 60)]))),
    }


def taman():
    return {
        # cemara: tiga undak, condong sedikit, guratan
        "cemara": svg(path(halus([(62, 5), (73, 24), (66, 30), (82, 50), (71, 56), (92, 76), (56, 82), (54, 96), (36, 96), (38, 82), (5, 82), (22, 60), (12, 54), (34, 34), (26, 28)])), gores(halus([(40, 46), (52, 50), (64, 44)], False), 4.8), gores(halus([(28, 68), (46, 72), (66, 66)], False), 4.8)),
        # beringin: tajuk lebar, batang pendek melebar, bintik
        "beringin": svg(gores(halus([(26, 96), (34, 76), (44, 58)], False), 13, B), gores(halus([(48, 96), (42, 76), (44, 58)], False), 11, B),
                        path(halus([(3, 46), (10, 24), (28, 22), (40, 6), (64, 7), (74, 20), (92, 24), (98, 46), (86, 60), (66, 56), (50, 66), (30, 60), (14, 62)])),
                        lingkar(26, 40, 5.5), lingkar(54, 24, 5), lingkar(78, 40, 5.5)),
        # palem: batang melengkung, pelepah gemuk
        "palem": svg(gores(halus([(40, 96), (44, 62), (56, 36)], False), 14, B), path(halus([(56, 36), (30, 32), (8, 50), (13, 27), (34, 14), (54, 20), (60, 5), (79, 6), (70, 23), (93, 20), (97, 42), (75, 33), (62, 38)]))),
        # batu [kecil]: miring ke kanan, guratan
        "batu": svg(path(halus([(8, 72), (16, 40), (42, 24), (74, 32), (93, 62), (85, 84), (20, 86)])), gores(halus([(30, 48), (46, 40), (62, 46)], False), 6)),
        # semak [kecil]: gumpal besar di kiri, kecil di kanan
        "semak": svg(path(halus([(6, 82), (9, 50), (26, 30), (48, 26), (62, 44), (80, 46), (94, 62), (92, 84), (50, 90)])), lingkar(32, 54, 5.5), lingkar(62, 66, 5)),
        # rumput [kecil]: tiga helai tebal berbeda arah
        "rumput": svg(gores(halus([(30, 92), (26, 60), (12, 40)], False), 11, B), gores(halus([(46, 92), (48, 52), (58, 12)], False), 12, B), gores(halus([(62, 92), (72, 68), (90, 56)], False), 11, B)),
    }


TEMA = {"dapur": dapur, "ubin": ubin, "kebun": kebun, "satwa": satwa, "buah": buah, "tukang": tukang, "cuaca": cuaca, "serangga": serangga, "kampung": kampung, "tumbuhan": tumbuhan, "mozaik": mozaik, "sawah": sawah, "hutan": hutan, "biji": biji, "gerabah": gerabah, "alam": alam, "kolam": kolam, "taman": taman}
if __name__ == "__main__":
    for t in sys.argv[1:] or TEMA:
        os.makedirs(os.path.join(D, t), exist_ok=True)
        for n, s in TEMA[t]().items():
            open(os.path.join(D, t, n + ".svg"), "w").write(s)
        print("tulis", t, list(TEMA[t]()))
