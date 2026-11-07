(() => {
  // src/shim-assert.ts
  function assert(c2, m) {
    if (!c2) throw new Error(m ?? "syarat tidak terpenuhi");
  }
  assert.ok = assert;
  assert.equal = (a, b, m) => {
    if (a !== b) throw new Error(m ?? `${a} \u2260 ${b}`);
  };
  assert.notEqual = (a, b, m) => {
    if (a === b) throw new Error(m ?? `${a} = ${b}`);
  };
  var shim_assert_default = assert;

  // src/figural-lib.ts
  var INK = "#111";
  var BOX = 96;
  var KEYS = ["A", "B", "C", "D", "E"];
  var r1 = (n) => Math.round(n * 10) / 10 || 0;
  function tf(fig, deg, mirror = false) {
    const a = deg * Math.PI / 180, c2 = Math.cos(a), s2 = Math.sin(a);
    const p2 = ([x, y]) => {
      const mx = mirror ? -x : x;
      return [r1(mx * c2 - y * s2), r1(mx * s2 + y * c2)];
    };
    return fig.map(
      (q) => q.k === "poly" ? { ...q, pts: q.pts.map(p2) } : q.k === "circ" ? { ...q, c: p2(q.c) } : { ...q, a: p2(q.a), b: p2(q.b) }
    );
  }
  var fillOf = (f) => f === "b" ? INK : "white";
  function draw(fig, cx, cy) {
    return fig.map((q) => {
      if (q.k === "poly") return `<polygon points="${q.pts.map(([x, y]) => `${r1(cx + x)},${r1(cy + y)}`).join(" ")}" fill="${fillOf(q.fill)}" ${q.fill === "u" ? 'stroke="none"' : `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`}/>`;
      if (q.k === "circ") return `<circle cx="${r1(cx + q.c[0])}" cy="${r1(cy + q.c[1])}" r="${q.r}" fill="${fillOf(q.fill)}" stroke="${INK}" stroke-width="2.5"/>`;
      return `<line x1="${r1(cx + q.a[0])}" y1="${r1(cy + q.a[1])}" x2="${r1(cx + q.b[0])}" y2="${r1(cy + q.b[1])}" stroke="${INK}" stroke-width="${q.w ?? 4}" stroke-linecap="round"/>`;
    }).join("");
  }
  var sig = (fig) => draw(fig, 0, 0).split("/>").sort().join("/>");
  var text = (x, y, t, size = 22) => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="bold" text-anchor="middle" fill="${INK}">${t}</text>`;
  var HL = "#1a7f37";
  var RED = "#d32f2f";
  var textC = (x, y, t, size, fill, anchor = "middle") => `<text x="${r1(x)}" y="${r1(y)}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="bold" text-anchor="${anchor}" fill="${fill}">${t}</text>`;
  var drawS = (fig, cx, cy, size) => `<g transform="translate(${r1(cx)} ${r1(cy)}) scale(${Math.round(size / BOX * 1e3) / 1e3})">${draw(fig, 0, 0)}</g>`;
  var cellS = (f, cx, cy, size, hl = false) => `<rect x="${r1(cx - size / 2)}" y="${r1(cy - size / 2)}" width="${size}" height="${size}" fill="white" stroke="${hl ? HL : INK}" stroke-width="${hl ? 8 : 3}"/>` + (f ? drawS(f, cx, cy, size) : text(cx, cy + size * 0.15, "?", Math.round(size * 0.42)));

  // src/k12-spasial-core.ts
  var svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r1(w)} ${r1(h)}" width="${r1(w)}" height="${r1(h)}" role="img"><rect width="100%" height="100%" fill="#fff"/>${body}</svg>`;
  var optSvg = (f) => svg(100, 100, cellS(f, 50, 50, 97)).replace('width="100" height="100"', 'width="220" height="220"');
  function layout(rows, o = {}) {
    const s2 = o.size ?? 110, gap = o.gap ?? 10, cols = rows[0].length, step = s2 + gap;
    const gw = cols * s2 + (cols - 1) * gap, w = Math.max(gw + 8, o.minW ?? 0), left = (w - gw) / 2 + s2 / 2;
    const at = (r, c2) => [left + c2 * step, 4 + s2 / 2 + r * step];
    let body = "";
    rows.forEach((row, r) => row.forEach((f, c2) => body += cellS(f, ...at(r, c2), s2, o.hl?.[0] === r && o.hl?.[1] === c2)));
    o.seps?.forEach((t, i) => body += text((at(0, i)[0] + at(0, i + 1)[0]) / 2, at(0, 0)[1] + 12, t, 34));
    if (o.ann) body += o.ann(at, s2);
    let h = 4 + rows.length * step - gap + 4;
    if (o.extra) {
      body += o.extra(h, w);
      h += o.extraH ?? 0;
    }
    (o.foot ?? []).forEach((t, i) => body += textC(w / 2, h + 28 + i * 28, t, 20, RED));
    if (o.foot?.length) h += 16 + o.foot.length * 28;
    return svg(w, h, body);
  }

  // src/tiu-gaya.ts
  var cr = (p0, p1, p2, p3, t) => {
    const t2 = t * t, t3 = t2 * t;
    const f = (a, b, c2, d) => 0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t2 + (-a + 3 * b - 3 * c2 + d) * t3);
    return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])];
  };
  function lengkung(ctrl, k = 7) {
    const n = ctrl.length, out = [];
    for (let i = 0; i < n; i++) for (let s2 = 0; s2 < k; s2++) out.push(cr(ctrl[(i - 1 + n) % n], ctrl[i], ctrl[(i + 1) % n], ctrl[(i + 2) % n], s2 / k));
    return out.map(([x, y]) => [r1(x), r1(y)]);
  }
  function garisTengah(ctrl, k = 8) {
    const n = ctrl.length, c2 = [ctrl[0], ...ctrl, ctrl[n - 1]], out = [];
    for (let i = 1; i < n; i++) for (let s2 = 0; s2 < (i === n - 1 ? k + 1 : k); s2++) out.push([cr(c2[i - 1], c2[i], c2[i + 1], c2[i + 2], s2 / k), (i - 1 + s2 / k) / (n - 1)]);
    return out;
  }
  function goresan(ctrl, tebal2, kasar = 0, seed = 1) {
    const mid = garisTengah(ctrl);
    let x = seed;
    const acak = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648 - 0.5;
    const w = (u) => {
      const p2 = u * (tebal2.length - 1), i = Math.min(Math.floor(p2), tebal2.length - 2);
      return tebal2[i] + (tebal2[i + 1] - tebal2[i]) * (p2 - i);
    };
    const kiri = [], kanan = [];
    mid.forEach(([[px, py], u], i) => {
      const [ax, ay] = mid[Math.max(i - 1, 0)][0], [bx, by] = mid[Math.min(i + 1, mid.length - 1)][0];
      const len = Math.hypot(bx - ax, by - ay) || 1, nx = -(by - ay) / len, ny = (bx - ax) / len;
      const h = w(u) / 2, j1 = 1 + kasar * acak(), j2 = 1 + kasar * acak();
      kiri.push([r1(px + nx * h * j1), r1(py + ny * h * j1)]);
      kanan.push([r1(px - nx * h * j2), r1(py - ny * h * j2)]);
    });
    return [...kiri, ...kanan.reverse()];
  }
  var poly = (pts, fill = "b") => ({ k: "poly", pts, fill });
  var dot = (c2, r, fill = "b") => ({ k: "circ", c: c2, r, fill });
  var DAUN = [poly(lengkung([[-24, 26], [-30, 2], [-18, -22], [4, -36], [32, -38], [22, -14], [10, 8], [-6, 20]])), poly(goresan([[-20, 22], [-32, 34], [-40, 34]], [6, 5, 4])), poly(goresan([[-16, 16], [-2, -6], [14, -22], [24, -30]], [3, 3, 2.5, 1.5]), "w")];
  var BIJI = [poly(lengkung([[-4, -36], [18, -30], [28, -8], [20, 16], [2, 32], [-20, 34], [-10, 20], [2, 4], [-6, -12], [-24, -22]]))];
  var TUNAS = [poly(goresan([[-4, 38], [-2, 12], [4, -10], [2, -30]], [8, 7, 6, 4])), poly(lengkung([[0, -6], [16, -26], [36, -30], [28, -10]])), poly(lengkung([[-2, 10], [-14, -2], [-30, 0], [-20, 14]]))];
  var OMBAK = [poly(goresan([[-36, 26], [-24, 0], [-4, -20], [20, -22], [32, -6], [22, 8], [8, 2]], [8, 14, 16, 14, 10, 7, 4]))];
  var BULU = [poly(lengkung([[-8, 38], [-14, 10], [-10, -18], [4, -38], [14, -20], [22, -18], [16, -4], [24, 2], [14, 14], [6, 30]]))];
  var PUCUK = [poly(lengkung([[-32, 34], [30, 34], [14, 10], [4, -16], [-2, -38], [-12, -12], [-4, -4], [-20, 8]], 5)), poly(lengkung([[16, 14], [34, 2], [38, -14], [26, -4]], 5)), dot([-2, 18], 6, "w")];
  var SULUR = [poly(goresan([[-34, 30], [-20, 10], [-14, -14], [4, -30], [24, -24], [26, -6], [12, 0], [8, -12]], [9, 10, 10, 9, 8, 6, 5, 3]))];
  var PARANG = [poly(lengkung([[-36, -4], [-26, -34], [-2, -36], [8, -18], [30, -12], [34, 4], [24, 20], [10, 18], [-6, 8], [-26, 12]], 6)), dot([-16, -18], 6, "w"), poly(goresan([[24, 18], [26, 32], [16, 40]], [6, 5, 3]))];
  var KAWUNG = [poly(lengkung([[-30, 0], [-18, -28], [6, -36], [26, -18], [24, 8], [4, 30], [-20, 26]])), dot([8, -12], 7, "w"), dot([-14, 12], 4, "w"), poly(goresan([[16, 18], [30, 32], [44, 24]], [8, 6, 4]))];
  var KOMA = [poly(goresan([[-30, -30], [-6, -24], [14, -6], [18, 16], [4, 34]], [6, 16, 20, 14, 4], 0.35, 7))];
  var KAIT = [poly(goresan([[-24, -34], [-20, 0], [-8, 26], [14, 30], [26, 14], [20, 2]], [10, 12, 12, 10, 8, 5], 0.35, 11))];
  var ZIGZAG = [poly(goresan([[-34, -26], [-8, -16], [-22, 4], [8, 12], [-4, 32], [30, 30]], [12, 10, 11, 9, 9, 6], 0.3, 5))];
  var GAYA = {
    alam: { daun: DAUN, biji: BIJI, tunas: TUNAS, ombak: OMBAK, bulu: BULU },
    nusantara: { pucuk: PUCUK, sulur: SULUR, parang: PARANG, kawung: KAWUNG },
    kuas: { koma: KOMA, kait: KAIT, zigzag: ZIGZAG }
  };
  function gumpal(n, seed, r = 30) {
    let x = seed;
    const acak = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
    const ctrl = [];
    for (let i = 0; i < n; i++) {
      const a = 2 * Math.PI * (i + 0.28 * acak()) / n - Math.PI / 2, b = a + Math.PI / n, L = r * (0.7 + 0.55 * acak()), d = r * (0.3 + 0.18 * acak());
      ctrl.push([L * Math.cos(a - 0.12), L * Math.sin(a - 0.12)], [L * 0.92 * Math.cos(a + 0.14), L * 0.92 * Math.sin(a + 0.14)], [d * Math.cos(b), d * Math.sin(b)]);
    }
    return [poly(lengkung(ctrl, 5))];
  }
  var balikWarna = (f) => f.map((q) => q.k === "line" ? q : { ...q, fill: q.fill === "w" ? "b" : q.fill === "u" ? "b" : "w" });
  function arsir(f, jarak = 4.5) {
    const k = Math.SQRT1_2, ke = ([x, y]) => [k * (x + y), k * (y - x)], balik = ([u, v]) => [r1(k * (u - v)), r1(k * (u + v))];
    return f.flatMap((q) => {
      if (q.k !== "poly" || q.fill !== "b") return [q];
      const P = q.pts.map(ke), vs = P.map((p2) => p2[1]), out = [{ ...q, fill: "w" }];
      for (let v = Math.ceil(Math.min(...vs) / jarak) * jarak; v < Math.max(...vs); v += jarak) {
        const xs = [];
        P.forEach(([x1, y1], i) => {
          const [x2, y2] = P[(i + 1) % P.length];
          if (y1 > v !== y2 > v) xs.push(x1 + (v - y1) * (x2 - x1) / (y2 - y1));
        });
        xs.sort((a, b) => a - b);
        for (let i = 0; i + 1 < xs.length; i += 2) if (xs[i + 1] - xs[i] > 3) out.push({ k: "line", a: balik([xs[i] + 1, v]), b: balik([xs[i + 1] - 1, v]), w: 1.6 });
      }
      return out;
    });
  }

  // src/tiu-aset.ts
  var skala = (f, k) => f.map((q) => q.k === "poly" ? { ...q, pts: q.pts.map(([x, y]) => [r1(x * k), r1(y * k)]) } : q.k === "circ" ? { ...q, c: [r1(q.c[0] * k), r1(q.c[1] * k)], r: r1(q.r * k) } : q);
  var p = (pts, fill = "b") => ({ k: "poly", pts, fill });
  var c = (x, y, r) => ({ k: "circ", c: [x, y], r, fill: "w" });
  var l = (pts, fill = "b") => p(lengkung(pts, 5), fill);
  var s = (pts, w, fill = "b") => p(goresan(pts, w, 0), fill);
  var IKAN = [p([[-40, -24], [-25, -15], [-13, -26], [8, -30], [25, -21], [39, -6], [28, 6], [15, 15], [-5, 18], [-22, 10], [-39, 22], [-32, 0]]), p([[-13, -24], [-2, -39], [10, -28]]), c(24, -12, 4), p([[-15, -9], [-8, -15], [-5, 3], [-13, 8]], "w")];
  var KERANG = [l([[-38, 13], [-33, -2], [-21, -16], [-3, -23], [17, -21], [32, -11], [38, 2], [29, 13], [11, 22], [-11, 24], [-29, 21]]), l([[-35, 7], [-22, -23], [-4, -34], [15, -32], [29, -20], [34, -8], [20, -12], [2, -15], [-15, -9]], "b"), s([[-32, 9], [-15, 1], [4, -1], [24, 2], [35, 5]], [5, 5, 5, 5, 5], "w"), s([[-24, -16], [-15, -22], [-5, -25]], [4, 4, 4], "w"), c(-31, 10, 3)];
  var CUMI = [l([[-9, -39], [3, -29], [12, -14], [13, 3], [7, 11], [-8, 10], [-16, 1], [-18, -14], [-15, -29]]), l([[-17, -22], [-29, -11], [-24, 2], [-15, -3]]), l([[10, -21], [23, -11], [19, 1], [12, -2]]), c(2, -7, 5), s([[-12, 7], [-19, 20], [-28, 37]], [6, 6, 5]), s([[-5, 10], [-7, 22], [-12, 29]], [5, 5, 5]), s([[2, 10], [5, 22], [11, 28]], [5, 5, 5]), s([[9, 7], [17, 20], [27, 38]], [6, 6, 5])];
  var KEPITING = [l([[-28, 1], [-21, -10], [-5, -15], [14, -13], [26, -4], [27, 8], [16, 17], [-4, 20], [-22, 15]]), s([[-13, -11], [-15, -24], [-19, -28]], [6, 6, 7]), s([[9, -12], [12, -22], [17, -24]], [6, 6, 7]), c(-19, -28, 3), c(17, -24, 3), s([[-22, 2], [-33, -5], [-36, -16], [-30, -22], [-23, -18], [-27, -13], [-21, -8]], [8, 8, 8, 10, 9, 7, 7]), s([[-22, 11], [-34, 18], [-39, 26], [-30, 23], [-20, 17], [16, 17], [30, 22], [38, 19], [29, 14], [23, 7]], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]), l([[-38, -17], [-38, -30], [-31, -37], [-23, -34], [-19, -27], [-26, -27], [-29, -23], [-32, -28], [-34, -22]])];
  var KAIL = [s([[15, -37], [12, -12], [9, 12], [0, 28], [-17, 30], [-25, 20], [-22, 9]], [9, 9, 9, 10, 10, 9, 7]), p([[-28, 11], [-17, 2], [-14, 15]]), c(15, -35, 4)];
  var TEKO = [s([[-20, -10], [-34, -14], [-38, -2], [-34, 11], [-22, 12]], [7, 7, 7, 7, 7]), l([[-22, -11], [-13, -20], [8, -20], [21, -11], [25, 5], [20, 20], [9, 28], [-9, 29], [-22, 21], [-27, 7]]), l([[18, -9], [29, -12], [38, -25], [37, -11], [31, -3], [23, 2]]), l([[-16, -21], [-10, -27], [8, -27], [15, -21]]), c(0, -29, 4), s([[-16, 4], [-9, 1], [0, 1]], [5, 5, 5], "w")];
  var GUNTING = [p([[-3, 3], [-37, -36], [-22, -26], [2, -3]]), p([[2, 2], [35, -39], [24, -16], [7, 7]]), l([[-3, 1], [-15, 5], [-26, 15], [-28, 28], [-23, 36], [-13, 37], [-5, 30], [0, 15], [4, 7]]), l([[3, 2], [14, 5], [23, 12], [24, 22], [20, 29], [11, 30], [4, 24], [1, 14], [-2, 8]]), l([[-20, 17], [-22, 25], [-19, 30], [-14, 30], [-11, 24], [-12, 18], [-16, 15]], "w"), l([[11, 13], [9, 19], [12, 23], [17, 23], [19, 18], [16, 13]], "w"), c(1, 4, 3)];
  var PALU = [p([[-30, -35], [-5, -35], [4, -29], [18, -29], [22, -21], [12, -15], [4, -17], [1, -7], [24, 30], [17, 38], [9, 35], [-11, -6], [-15, -18], [-30, -18]]), p([[-22, -29], [-7, -29], [-7, -24], [-22, -24]], "w")];
  var PAYUNG = [p([[-40, -8], [-33, -22], [-19, -32], [-1, -37], [17, -32], [31, -20], [38, -3], [23, -9], [12, -5], [2, -12], [-9, -6], [-20, -13], [-30, -9]]), s([[0, -12], [5, 9], [10, 28], [19, 34], [27, 28]], [7, 7, 7, 8, 7]), p([[-22, -20], [-11, -28], [1, -31], [-9, -16]], "w")];
  var KUNCI = [l([[-36, -15], [-32, -29], [-19, -37], [-4, -35], [5, -26], [7, -15], [0, -7], [25, 18], [33, 14], [39, 20], [33, 26], [37, 31], [30, 38], [21, 30], [14, 31], [-8, 8], [-18, 9], [-30, 4], [-37, -5]]), c(-20, -20, 7), p([[-5, 0], [17, 21], [13, 24], [-9, 4]], "w")];
  var KENDI = [l([[-12, -36], [2, -36], [2, -19], [14, -15], [25, -4], [27, 12], [20, 26], [6, 34], [-11, 33], [-24, 24], [-29, 9], [-24, -6], [-14, -15], [-11, -20]]), l([[13, -15], [21, -26], [29, -29], [32, -25], [27, -21], [24, -10]]), s([[-12, -36], [-5, -38], [3, -36]], [6, 6, 6]), s([[-20, 8], [-13, 4], [-5, 3]], [5, 5, 5], "w")];
  var KIPAS = [l([[-37, -14], [-30, -28], [-17, -36], [-1, -38], [15, -34], [28, -24], [36, -10], [27, -3], [18, 4], [8, 12], [-2, 21], [-10, 28], [-17, 17], [-25, 4]]), s([[-31, -16], [-10, 20]], [4, 4], "w"), s([[-19, -29], [-8, 20]], [4, 4], "w"), s([[-3, -32], [-6, 20]], [4, 4], "w"), s([[13, -28], [-4, 20]], [4, 4], "w"), s([[27, -18], [-3, 20]], [4, 4], "w"), c(-5, 24, 3), s([[-5, 28], [-3, 35], [4, 39]], [5, 5, 5])];
  var LAYANG = [p([[-5, -40], [27, -5], [8, 23], [-31, 5]]), p([[-7, -29], [0, -8], [-19, 1]], "w"), p([[4, -4], [19, -4], [9, 13]], "w"), s([[8, 23], [15, 29], [7, 35], [-1, 38]], [5, 5, 5, 5]), p([[10, 26], [22, 25], [19, 33]]), p([[-2, 34], [5, 38], [-6, 41]])];
  var GASING = [p([[-4, -39], [7, -38], [6, -28], [23, -23], [32, -13], [27, 1], [14, 14], [2, 25], [-5, 39], [-9, 25], [-23, 13], [-33, 0], [-34, -12], [-25, -22], [-8, -28]]), p([[-26, -14], [-8, -19], [12, -18], [23, -12], [18, -7], [-5, -12], [-25, -8]], "w"), s([[24, 8], [34, 17], [32, 28], [22, 31]], [5, 5, 5, 5])];
  var TEROMPET = [l([[-39, -24], [-30, -19], [-17, -12], [4, -10], [22, -10], [25, -5], [5, -3], [-17, -3], [-29, 2], [-39, 9], [-35, -4]]), s([[16, -6], [26, -4], [30, 4], [27, 17], [19, 21], [-8, 21], [-13, 16], [-12, 10], [18, 10]], [6, 6, 6, 6, 6, 6, 6, 6, 6]), s([[-3, -9], [-3, 13]], [6, 6]), s([[6, -9], [6, 13]], [6, 6]), s([[15, -9], [15, 13]], [6, 6]), s([[-3, -15], [-3, -10]], [7, 7]), s([[6, -17], [6, -10]], [7, 7]), s([[15, -14], [15, -10]], [7, 7])];
  var BURUNG = [p([[-38, 2], [-25, -2], [-21, -19], [-9, -29], [6, -28], [15, -37], [25, -35], [31, -26], [40, -21], [31, -16], [29, -7], [20, 1], [18, 15], [7, 23], [-8, 22], [-21, 15], [-33, 19]]), c(23, -27, 3), l([[-13, -10], [0, -16], [12, -9], [11, 3], [2, 12], [-11, 9], [-19, 1]], "w"), p([[-3, 20], [3, 20], [1, 34], [-13, 37], [-12, 32], [-4, 30]])];
  var SIPUT = [l([[-39, 23], [-31, 15], [-28, 0], [-20, -19], [-5, -29], [13, -28], [24, -16], [26, 3], [19, 16], [30, 16], [34, 5], [32, -4], [37, -7], [40, 3], [38, 20], [28, 30], [5, 34], [-20, 32]]), l([[-18, 10], [-19, -3], [-10, -17], [3, -19], [15, -11], [17, 1], [10, 9], [0, 10], [-7, 4], [-6, -4], [1, -9], [8, -5], [8, 1], [3, 3]], "w"), c(35, 5, 3)];
  var KUCING = [p([[-22, -8], [-27, -31], [-15, -25], [-4, -31], [8, -25], [20, -32], [19, -13], [13, -4], [20, 8], [22, 24], [15, 33], [-16, 33], [-25, 25], [-27, 12], [-22, 2], [-33, 9], [-38, 21], [-34, 31], [-27, 29], [-29, 20], [-22, 16]]), c(-15, -18, 3), c(8, -18, 3), p([[-8, -10], [1, -10], [-3, -5]], "w"), p([[-7, 12], [5, 8], [11, 18], [8, 26], [-8, 26]], "w")];
  var KUPU = [l([[-2, -5], [-22, -36], [-37, -33], [-40, -16], [-31, 1], [-19, 8], [-33, 18], [-31, 31], [-17, 36], [-2, 20], [3, 24], [15, 35], [29, 31], [34, 18], [23, 7], [35, -4], [38, -18], [30, -28], [16, -25], [5, -9], [4, -30], [0, -37], [-4, -30]]), l([[-30, -25], [-20, -28], [-10, -14], [-17, -7], [-29, -12]], "w"), l([[15, -18], [27, -20], [29, -11], [19, -4], [10, -5]], "w"), c(-20, 23, 5), c(22, 20, 4)];
  var KURA = [p([[-32, -8], [-26, -21], [-12, -29], [6, -30], [20, -22], [25, -12], [34, -17], [40, -13], [40, -4], [32, 3], [25, 4], [22, 14], [28, 23], [21, 29], [12, 21], [1, 24], [-12, 22], [-21, 31], [-28, 26], [-24, 15], [-34, 10], [-40, 4]]), p([[-22, -9], [-15, -20], [-4, -24], [0, -13], [-8, -5]], "w"), p([[5, -23], [15, -18], [20, -9], [10, -5], [3, -13]], "w"), p([[-18, 1], [-8, -1], [0, 7], [-5, 17], [-17, 13]], "w"), p([[4, 7], [11, 0], [20, 2], [17, 13], [6, 17]], "w"), c(34, -10, 3)];
  var ELANG = [l([[-35, 14], [-26, 2], [-34, -11], [-29, -31], [-17, -20], [-8, -7], [0, -17], [8, -30], [19, -26], [20, -37], [27, -35], [30, -27], [39, -23], [30, -18], [25, -8], [18, 1], [15, 15], [5, 22], [-4, 17], [-9, 29], [-19, 33], [-15, 21], [-26, 24]]), s([[-27, -21], [-19, -10], [-10, -4]], [3, 3, 3], "w"), s([[-25, -10], [-19, 0], [-10, 5]], [3, 3, 3], "w"), s([[2, -12], [9, -20], [16, -21]], [3, 3, 3], "w"), s([[2, -4], [10, -11], [17, -12]], [3, 3, 3], "w"), c(26, -29, 2)];
  var NAGA = [s([[25, -22], [13, -32], [-5, -31], [-22, -21], [-26, -7], [-17, 2], [2, 0], [16, 3], [20, 14], [12, 25], [-6, 28], [-23, 20], [-32, 9]], [15, 16, 17, 16, 15, 14, 14, 15, 16, 16, 14, 12, 5]), l([[19, -31], [22, -39], [27, -33], [33, -30], [38, -25], [34, -20], [38, -16], [29, -14], [21, -19], [17, -25]]), s([[-15, -21], [-10, -18], [-7, -14]], [3, 3, 3], "w"), s([[-24, -9], [-19, -6], [-16, -3]], [3, 3, 3], "w"), s([[2, -7], [6, -4], [9, -1]], [3, 3, 3], "w"), s([[10, 11], [13, 14], [14, 17]], [3, 3, 3], "w"), s([[-10, 19], [-6, 22], [-3, 23]], [3, 3, 3], "w"), c(30, -27, 2)];
  var SINGA = [l([[-25, 31], [-16, 18], [-18, 4], [-12, -7], [-5, -11], [-10, -21], [-6, -33], [4, -37], [12, -32], [19, -35], [21, -27], [31, -24], [34, -18], [26, -14], [18, -15], [15, -7], [21, 2], [30, 8], [32, 17], [23, 15], [15, 10], [9, 14], [8, 27], [16, 34], [4, 35], [-2, 24], [-8, 19], [-12, 32]]), s([[-15, 6], [-29, 1], [-34, -8], [-30, -16]], [6, 6, 6, 4]), s([[-4, -30], [-1, -23], [4, -19]], [3, 3, 3], "w"), s([[-8, -20], [-4, -13], [1, -10]], [3, 3, 3], "w"), s([[0, -34], [6, -29], [9, -23]], [3, 3, 3], "w"), c(22, -25, 2)];
  var KUDA = [l([[-24, 35], [-17, 21], [-15, 8], [-9, -2], [-8, -14], [-4, -24], [2, -28], [4, -38], [9, -32], [15, -30], [22, -26], [32, -25], [35, -18], [26, -14], [18, -18], [15, -9], [17, 1], [27, 6], [30, 16], [21, 15], [13, 9], [8, 15], [7, 29], [14, 35], [2, 36], [-4, 26], [-7, 19], [-11, 34]]), s([[-16, 6], [-28, 9], [-35, 19], [-36, 27]], [7, 7, 6, 3]), s([[-5, -22], [-1, -16], [0, -9]], [3, 3, 3], "w"), s([[-2, -28], [3, -22], [5, -15]], [3, 3, 3], "w"), s([[2, -31], [8, -25], [10, -20]], [3, 3, 3], "w"), c(20, -25, 2)];
  var RAJAWALI = [l([[-34, 32], [-29, 12], [-26, -8], [-19, -26], [-7, -36], [7, -37], [20, -29], [30, -16], [36, -1], [27, -5], [30, 7], [19, 1], [20, 14], [10, 6], [8, 20], [-1, 11], [-8, 27], [-17, 20], [-24, 35]]), s([[-23, 23], [-13, 5], [0, -11], [19, -23]], [3, 3, 3, 3], "w"), s([[-14, 21], [-7, 8], [6, -6], [25, -14]], [3, 3, 3, 3], "w"), s([[-5, 20], [1, 10], [13, 1], [29, -4]], [3, 3, 3, 3], "w")];
  var HARIMAU = [l([[-38, 2], [-30, -7], [-19, -9], [-11, -16], [5, -17], [16, -12], [21, -17], [28, -19], [34, -15], [38, -9], [32, -5], [25, -6], [20, 1], [14, 5], [18, 16], [28, 21], [26, 27], [16, 25], [7, 15], [-3, 13], [-12, 17], [-20, 29], [-28, 30], [-24, 23], [-19, 13], [-24, 7], [-32, 9]]), s([[-33, 0], [-37, -10], [-33, -19], [-26, -20]], [6, 6, 6, 4]), s([[-18, -7], [-14, -2], [-12, 2]], [3, 3, 3], "w"), s([[-8, -13], [-4, -7], [-3, -2]], [3, 3, 3], "w"), s([[3, -13], [6, -7], [7, -3]], [3, 3, 3], "w"), s([[12, -9], [15, -5], [15, -1]], [3, 3, 3], "w"), c(30, -14, 2)];
  var SULURPOJOK = [s([[-34, 34], [-32, 6], [-22, -18], [-4, -29], [17, -27], [25, -15], [20, -5], [10, -5], [8, -13]], [9, 10, 11, 11, 10, 8, 6, 5, 3]), l([[-31, 20], [-10, 19], [4, 27], [10, 38], [-4, 32], [-18, 30]]), l([[-23, -8], [-31, -22], [-27, -35], [-16, -25], [-13, -18]])];
  var AKANTUS = [l([[-35, 31], [-24, 13], [-29, 0], [-15, 2], [-21, -15], [-7, -10], [-10, -29], [2, -19], [9, -36], [14, -19], [28, -25], [24, -10], [36, -6], [24, 2], [30, 15], [15, 12], [8, 24], [-4, 19], [-17, 31]]), s([[-25, 25], [-9, 8], [5, -8], [12, -21]], [4, 4, 3, 3], "w")];
  var IKALGANDA = [s([[-35, 15], [-31, 27], [-17, 32], [-4, 25], [2, 12], [-2, -1], [-13, -6], [-21, 0], [-19, 8]], [10, 10, 10, 10, 9, 8, 7, 5, 3]), s([[-2, 5], [7, -14], [20, -26], [32, -23], [36, -12], [29, -5], [22, -9]], [9, 10, 10, 9, 7, 5, 3])];
  var PITA = [l([[-38, -13], [-26, -23], [-11, -22], [4, -11], [17, -8], [31, -15], [37, -9], [29, 1], [14, 5], [0, 2], [-15, -8], [-23, -8], [-18, 4], [-25, 19], [-36, 24], [-30, 13], [-39, 10]]), s([[-19, -13], [-7, -12], [5, -3]], [3, 3, 3], "w"), s([[12, 0], [21, -1], [29, -6]], [3, 3, 3], "w")];
  var KUNCUP = [l([[-13, 9], [-24, -3], [-23, -18], [-14, -32], [-6, -21], [3, -37], [8, -22], [20, -27], [21, -10], [12, 2], [1, 10]]), s([[-4, 5], [-4, 21], [4, 32], [18, 33], [24, 25], [19, 19]], [8, 8, 8, 7, 5, 3]), s([[-14, -22], [-8, -10], [-2, -3]], [3, 3, 3], "w")];
  var LIDAHAPI = [l([[-20, 34], [-30, 22], [-31, 7], [-22, -7], [-15, -19], [-12, -37], [-1, -25], [2, -12], [14, -22], [21, -14], [27, 0], [28, 16], [20, 30], [8, 36], [-4, 30], [-8, 19], [-3, 8], [4, 2], [2, 17], [8, 22], [14, 16], [12, 5], [9, -3], [-2, 2], [-13, 16], [-14, 27]])];
  var TETES = [l([[-17, 31], [-29, 20], [-28, 4], [-20, -10], [-7, -30], [1, -38], [6, -21], [16, -5], [21, 10], [18, 23], [9, 31], [-3, 33]]), s([[13, 24], [23, 30], [32, 25], [33, 15], [28, 11]], [8, 8, 7, 5, 3])];
  var IKALG = [s([[27, -30], [10, -33], [-9, -26], [-18, -13], [-16, 1], [-6, 8], [7, 5], [14, -5], [9, -16]], [12, 14, 16, 16, 15, 13, 11, 9, 5]), s([[8, 4], [10, 19], [5, 31], [-8, 36], [-21, 31], [-24, 23]], [12, 12, 11, 10, 7, 4])];
  var KELOPAK3 = [l([[-3, 3], [-27, 0], [-38, -10], [-37, -21], [-27, -24], [-12, -18], [2, -3]]), l([[-3, 3], [-3, -19], [4, -36], [14, -38], [21, -29], [16, -14], [8, 4]]), l([[-3, 2], [13, 8], [20, 16], [19, 23], [12, 27], [4, 21], [-5, 12]])];
  var PANAH = [s([[-35, 27], [-25, 10], [-10, -3], [7, -8], [21, -3], [25, 8]], [11, 12, 13, 13, 12, 10]), p([[12, 4], [28, 22], [38, 0], [28, 4], [21, 2]])];
  var SABITGERIGI = [l([[-29, -33], [-12, -37], [8, -30], [23, -15], [28, 3], [24, 19], [13, 31], [-4, 37], [-20, 31], [-29, 20], [-14, 23], [-7, 19], [0, 20], [1, 13], [9, 11], [7, 5], [13, 0], [1, -2], [-4, -6], [-9, -13], [-20, -14], [-24, -21]])];
  var GELOMBANGTINTA = [s([[-36, 20], [-25, 5], [-14, 2], [-3, 12], [8, 17], [20, 8], [25, -8], [19, -20], [9, -24]], [10, 13, 15, 15, 14, 12, 10, 7, 4]), { k: "circ", c: [30, -29], r: 6, fill: "b" }];
  var BOLAKISI = [l([[-35, -4], [-30, -22], [-15, -34], [3, -37], [21, -30], [34, -15], [36, 3], [29, 21], [14, 33], [-5, 36], [-23, 29], [-34, 14]], "w"), { k: "line", a: [-32, -12], b: [30, -12], w: 1.6 }, { k: "line", a: [-35, 2], b: [35, 2], w: 1.6 }, { k: "line", a: [-30, 16], b: [30, 16], w: 1.6 }, { k: "line", a: [-7, -35], b: [-19, -18], w: 1.6 }, { k: "line", a: [-19, -18], b: [-21, 0], w: 1.6 }, { k: "line", a: [-21, 0], b: [-16, 20], w: 1.6 }, { k: "line", a: [-16, 20], b: [-4, 35], w: 1.6 }, { k: "line", a: [8, -35], b: [19, -18], w: 1.6 }, { k: "line", a: [19, -18], b: [21, 0], w: 1.6 }, { k: "line", a: [21, 0], b: [17, 19], w: 1.6 }, { k: "line", a: [17, 19], b: [7, 33], w: 1.6 }, l([[-29, -17], [-21, -29], [-7, -32], [2, -27], [-2, -18], [-12, -15], [-8, -4], [-14, 8], [-24, 10], [-30, 3]])];
  var KERUCUTKISI = [l([[-31, 18], [10, -37], [28, 22], [18, 32], [-4, 36], [-25, 30]], "w"), { k: "line", a: [10, -35], b: [-15, 32], w: 1.6 }, { k: "line", a: [10, -35], b: [2, 35], w: 1.6 }, { k: "line", a: [10, -35], b: [20, 29], w: 1.6 }, { k: "line", a: [-21, 5], b: [22, 5], w: 1.6 }, { k: "line", a: [-27, 17], b: [26, 17], w: 1.6 }, l([[-30, 17], [9, -34], [2, -5], [-2, 15], [-6, 33], [-24, 30]])];
  var PERISAIGARIS = [l([[-31, -31], [-12, -27], [4, -34], [28, -29], [32, -4], [27, 15], [11, 33], [-1, 38], [-18, 23], [-28, 8]], "w"), l([[-31, -31], [-12, -27], [4, -34], [16, -22], [1, -14], [-3, -4], [3, 4], [-2, 14], [-13, 17], [-27, 8], [-29, -8]]), { k: "line", a: [2, -27], b: [27, -4], w: 1.8 }, { k: "line", a: [-1, -16], b: [27, 10], w: 1.8 }, { k: "line", a: [-3, -5], b: [21, 18], w: 1.8 }, { k: "line", a: [-4, 7], b: [14, 25], w: 1.8 }, { k: "line", a: [-5, 18], b: [7, 31], w: 1.8 }];
  var OBOR = [l([[-9, 1], [-15, -9], [-13, -22], [-3, -37], [0, -23], [14, -34], [22, -21], [25, -8], [14, 2], [8, 7], [-1, 6]]), l([[-11, 5], [12, 5], [8, 16], [5, 37], [-3, 38], [-7, 16]]), s([[-5, -19], [-4, -10], [2, -4]], [3, 3, 3], "w"), { k: "line", a: [-6, 17], b: [7, 13], w: 1.8 }, { k: "line", a: [-5, 24], b: [6, 20], w: 1.8 }, { k: "line", a: [-4, 31], b: [5, 27], w: 1.8 }];
  var SAYAPBULU = [l([[-32, 30], [-28, 7], [-23, -17], [-15, -34], [-9, -36], [-7, -15], [-10, 8], [-19, 29]]), l([[-20, 29], [-9, 5], [0, -24], [8, -34], [13, -30], [10, -7], [0, 18], [-9, 32]]), l([[-8, 32], [7, 8], [19, -15], [28, -19], [31, -13], [23, 5], [9, 25], [1, 35]]), s([[-24, 20], [-19, -4], [-15, -25]], [3, 3, 3], "w"), s([[-10, 23], [-1, 1], [7, -23]], [3, 3, 3], "w"), s([[3, 26], [14, 8], [25, -9]], [3, 3, 3], "w")];
  var CINCINMIRING = [l([[-34, 3], [-28, -15], [-12, -28], [8, -31], [26, -23], [35, -8], [33, 9], [20, 23], [1, 30], [-18, 26], [-30, 17]]), l([[-23, 2], [-17, -10], [-5, -18], [9, -20], [20, -14], [24, -5], [21, 5], [11, 14], [-3, 18], [-16, 14], [-23, 8]], "w"), { k: "line", a: [-30, -8], b: [-21, -2], w: 1.6 }, { k: "line", a: [-23, -20], b: [-14, -12], w: 1.6 }, { k: "line", a: [2, -29], b: [8, -20], w: 1.6 }, { k: "line", a: [27, -15], b: [21, -8], w: 1.6 }, { k: "line", a: [27, 13], b: [19, 7], w: 1.6 }, { k: "line", a: [-5, 28], b: [-3, 18], w: 1.6 }, l([[2, -30], [14, -39], [27, -37], [35, -26], [31, -14], [23, -11], [18, -20], [10, -19]])];
  var ASET = {
    laut: { ikan: tf(IKAN, 10), kerang: tf(KERANG, 15), cumi: tf(CUMI, -5), kepiting: KEPITING, kail: KAIL },
    perkakas: { teko: tf(TEKO, -15), gunting: GUNTING, palu: PALU, payung: PAYUNG, kunci: skala(tf(KUNCI, 20), 0.9) },
    nusantara: { kendi: KENDI, kipas: KIPAS, "layang-layang": LAYANG, gasing: GASING, terompet: TEROMPET },
    lambang: { elang: ELANG, naga: NAGA, singa: SINGA, kuda: KUDA, "rajawali-sayap": RAJAWALI, harimau: HARIMAU },
    sulur: { sulurpojok: SULURPOJOK, akantus: AKANTUS, ikalganda: IKALGANDA, pita: PITA, kuncup: KUNCUP, lidahapi: LIDAHAPI },
    tinta: { tetes: TETES, ikalg: IKALG, kelopak3: KELOPAK3, panahlengkung: PANAH, sabitgerigi: SABITGERIGI, gelombangtinta: GELOMBANGTINTA },
    tekstur: { bolakisi: BOLAKISI, kerucutkisi: KERUCUTKISI, perisaigaris: PERISAIGARIS, obor: OBOR, sayapbulu: SAYAPBULU, cincinmiring: CINCINMIRING },
    satwa: { burung: BURUNG, siput: tf(SIPUT, 15), "kucing duduk": KUCING, "kupu-kupu": KUPU, "kura-kura": tf(KURA, 10) }
  };
  function haluskan(f, n = 2) {
    const sekali = (P) => P.flatMap(([x1, y1], i) => {
      const [x2, y2] = P[(i + 1) % P.length];
      return [[r1(0.75 * x1 + 0.25 * x2), r1(0.75 * y1 + 0.25 * y2)], [r1(0.25 * x1 + 0.75 * x2), r1(0.25 * y1 + 0.75 * y2)]];
    });
    return f.map((q) => {
      if (q.k !== "poly" || q.pts.length >= 40) return q;
      let P = q.pts;
      for (let i = 0; i < n; i++) P = sekali(P);
      return { ...q, pts: P };
    });
  }
  var LAYAK = [
    ["laut", "ikan", "ikan"],
    ["laut", "kail", "kail"],
    ["perkakas", "palu", "palu"],
    ["perkakas", "payung", "payung"],
    ["perkakas", "kunci", "kunci"],
    ["nusantara", "layang-layang", "layang"],
    ["nusantara", "gasing", "gasing"],
    ["satwa", "burung", "burung"],
    ["satwa", "kucing duduk", "kucing"],
    ["satwa", "kupu-kupu", "kupu"],
    ["satwa", "kura-kura", "kura"],
    // Gambar ulang Codex (putaran 2), lolos cek mata. Kerang dan kepiting masih lemah, belum dipakai.
    ["laut", "cumi", "cumi"],
    ["perkakas", "teko", "teko"],
    ["perkakas", "gunting", "gunting"],
    ["nusantara", "kendi", "kendi"],
    ["nusantara", "kipas", "kipas"],
    ["nusantara", "terompet", "terompet"],
    // Putaran 3 (gaya guratan figural, untuk calon kedinasan/TNI/Polri), lolos cek mata. Satwa lambang (elang, naga, singa, kuda,
    // harimau), kerucutkisi, perisaigaris, cincinmiring belum layak: siluet menggumpal, guratan hilang di versi hitam.
    ["sulur", "sulurpojok", "sulurpojok"],
    ["sulur", "akantus", "akantus"],
    ["sulur", "ikalganda", "ikalganda"],
    ["sulur", "pita", "pita"],
    ["sulur", "kuncup", "kuncup"],
    ["sulur", "lidahapi", "lidahapi"],
    ["tinta", "tetes", "tetes"],
    ["tinta", "ikalg", "ikalg"],
    ["tinta", "kelopak3", "kelopak3"],
    ["tinta", "panahlengkung", "panahlengkung"],
    ["tinta", "sabitgerigi", "sabitgerigi"],
    ["tinta", "gelombangtinta", "gelombangtinta"],
    ["tekstur", "bolakisi", "bolakisi"],
    ["tekstur", "obor", "obor"],
    ["tekstur", "sayapbulu", "sayapbulu"],
    ["lambang", "rajawali-sayap", "rajawali"]
  ];
  var BENDA = Object.fromEntries(LAYAK.map(([t, n, k]) => [k, haluskan(ASET[t][n])]));
  var TEMA = Object.fromEntries(LAYAK.map(([t, , k]) => [k, t]));

  // src/tiu-pola.ts
  function molekul(bola, h = 1.5) {
    const f = (x, y) => bola.reduce((s2, [cx, cy, r]) => s2 + r * r / ((x - cx) ** 2 + (y - cy) ** 2 + 1e-6), 0) - 1;
    const N = Math.ceil(96 / h), X = (i) => -48 + i * h, v = [];
    for (let i = 0; i <= N; i++) {
      v.push([]);
      for (let j = 0; j <= N; j++) v[i].push(f(X(i), X(j)));
    }
    const titik2 = /* @__PURE__ */ new Map(), tetangga = /* @__PURE__ */ new Map();
    const sisi = (k, a, va, b, vb) => {
      if (!titik2.has(k)) {
        const t = va / (va - vb);
        titik2.set(k, [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
      }
      return k;
    };
    const hubung = (p2, q) => {
      tetangga.set(p2, [...tetangga.get(p2) ?? [], q]);
      tetangga.set(q, [...tetangga.get(q) ?? [], p2]);
    };
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const [a, b, c2, d] = [v[i][j], v[i + 1][j], v[i + 1][j + 1], v[i][j + 1]], [x0, x1, y0, y1] = [X(i), X(i + 1), X(j), X(j + 1)];
      const kode = (a > 0 ? 8 : 0) | (b > 0 ? 4 : 0) | (c2 > 0 ? 2 : 0) | (d > 0 ? 1 : 0);
      if (kode === 0 || kode === 15) continue;
      const T = () => sisi(`h${i},${j}`, [x0, y0], a, [x1, y0], b), R = () => sisi(`v${i + 1},${j}`, [x1, y0], b, [x1, y1], c2);
      const B = () => sisi(`h${i},${j + 1}`, [x0, y1], d, [x1, y1], c2), L = () => sisi(`v${i},${j}`, [x0, y0], a, [x0, y1], d);
      const tengah = f((x0 + x1) / 2, (y0 + y1) / 2) > 0;
      const pasangan = {
        1: [[L, B]],
        2: [[B, R]],
        3: [[L, R]],
        4: [[T, R]],
        6: [[T, B]],
        7: [[T, L]],
        8: [[T, L]],
        9: [[T, B]],
        11: [[T, R]],
        12: [[L, R]],
        13: [[B, R]],
        14: [[L, B]],
        5: tengah ? [[T, L], [B, R]] : [[T, R], [L, B]],
        10: tengah ? [[T, R], [L, B]] : [[T, L], [B, R]]
      };
      for (const [p2, q] of pasangan[kode]) hubung(p2(), q());
    }
    const lingkar = [], sudah = /* @__PURE__ */ new Set();
    for (const awal of tetangga.keys()) {
      if (sudah.has(awal)) continue;
      const L = [];
      let prev = "", cur = awal;
      while (!sudah.has(cur)) {
        sudah.add(cur);
        L.push(titik2.get(cur));
        const nx = tetangga.get(cur).find((k) => k !== prev && !sudah.has(k));
        if (!nx) break;
        prev = cur;
        cur = nx;
      }
      if (L.length > 8) lingkar.push(L.filter((_, k) => k % 2 === 0).map(([x, y]) => [r1(x), r1(y)]));
    }
    const luas = (P) => Math.abs(P.reduce((s2, [x, y], k) => {
      const [u, w] = P[(k + 1) % P.length];
      return s2 + x * w - u * y;
    }, 0)) / 2;
    const dalam = (P, [x, y]) => {
      let c2 = false;
      for (let a = 0, b = P.length - 1; a < P.length; b = a++) {
        const [xa, ya] = P[a], [xb, yb] = P[b];
        if (ya > y !== yb > y && x < (xb - xa) * (y - ya) / (yb - ya) + xa) c2 = !c2;
      }
      return c2;
    };
    const urut = lingkar.filter((P) => luas(P) > 12).sort((p2, q) => luas(q) - luas(p2));
    return urut.map((P, k) => ({ k: "poly", pts: P, fill: urut.slice(0, k).some((Q) => dalam(Q, P[0])) ? "w" : "b" }));
  }
  function molekulAcak(n, seed) {
    let x = seed;
    const acak = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
    const pts = [[0, 0, 7 + 2.5 * acak()]];
    let arah = acak() * 2 * Math.PI;
    for (let i = 1; i < n; i++) {
      arah += (acak() < 0.5 ? -1 : 1) * (0.7 + 1.2 * acak());
      const [px, py, pr] = pts[i - 1], r = 6.5 + 3 * acak(), L = 1.38 * (pr + r);
      pts.push([px + L * Math.cos(arah), py + L * Math.sin(arah), r]);
    }
    const xs = pts.map((p2) => p2[0]), ys = pts.map((p2) => p2[1]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const k = Math.min(1.6, 62 / Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 30));
    return molekul(pts.map(([a, b, r]) => [(a - cx) * k, (b - cy) * k, r * k]));
  }
  function spiral(sisi, langkah = 8.5) {
    const ctrl = [[0, 0]], arah = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (let i = 0; i < sisi; i++) {
      const [px, py] = ctrl[i], L = langkah * (Math.floor(i / 2) + 1) * (i === sisi - 1 ? 1.7 : 1), [dx, dy] = arah[i % 4];
      ctrl.push([px + dx * L, py + dy * L]);
    }
    const xs = ctrl.map((p2) => p2[0]), ys = ctrl.map((p2) => p2[1]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const tebal2 = ctrl.map((_, i) => langkah * (0.38 + 0.24 * i / sisi));
    return [{ k: "poly", pts: goresan(ctrl.map(([a, b]) => [a - cx, b - cy]), tebal2), fill: "b" }];
  }
  function ikal(n, miring = -18) {
    const ctrl = [];
    for (let t = -Math.PI / 2; t <= 2 * Math.PI * n + Math.PI / 2 + 1e-9; t += Math.PI / 3) ctrl.push([5.6 * t - 15 * Math.sin(t), -15 * Math.cos(t)]);
    const x0 = ctrl[0][0], x1 = ctrl[ctrl.length - 1][0], k = Math.min(1, 70 / (x1 - x0));
    const tebal2 = ctrl.map((_, i) => 7 - 3.5 * i / ctrl.length);
    return tf([{ k: "poly", pts: goresan(ctrl.map(([a, b]) => [(a - (x0 + x1) / 2) * k, b * k]), tebal2), fill: "b" }], miring);
  }
  function lekuk(n, seed, R = 32, tangkai = true) {
    let x = seed;
    const acak = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
    const ctrl = [], sudut = Array.from({ length: n }, () => 0.75 + 0.5 * acak()), total = sudut.reduce((a2, b) => a2 + b, 0);
    let a = -Math.PI / 2;
    for (let i = 0; i < n; i++) {
      const w = 2 * Math.PI * sudut[i] / total, r = R * (0.72 + 0.28 * acak()), lebar = w * 0.32;
      ctrl.push([r * 0.92 * Math.cos(a - lebar), r * 0.92 * Math.sin(a - lebar)], [r * Math.cos(a), r * Math.sin(a)], [r * 0.92 * Math.cos(a + lebar), r * 0.92 * Math.sin(a + lebar)]);
      const b = a + w / 2, d = R * 0.42;
      ctrl.push([d * Math.cos(b), d * Math.sin(b)]);
      a += w;
    }
    const t = -Math.PI / 2 + 2 * Math.PI * sudut[0] / total / 2;
    if (!tangkai) return [{ k: "poly", pts: lengkung(ctrl, 5), fill: "b" }];
    return [{ k: "poly", pts: lengkung(ctrl, 5), fill: "b" }, { k: "poly", pts: goresan([[R * 0.3 * Math.cos(t), R * 0.3 * Math.sin(t)], [R * 0.95 * Math.cos(t + 0.15), R * 0.95 * Math.sin(t + 0.15)], [R * 1.25 * Math.cos(t + 0.45), R * 1.25 * Math.sin(t + 0.45)]], [7, 6, 4]), fill: "b" }];
  }
  function bintang(n, seed, tumpul = false, R = 32, dalam = 0.3) {
    let x = seed;
    const acak = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
    const pts = [], a0 = acak() * 2 * Math.PI / n, rv = R * dalam, rho = R * 0.2;
    for (let i = 0; i < n; i++) {
      const a = a0 + 2 * Math.PI * (i + 0.2 * (acak() - 0.5)) / n, L = R * (0.78 + 0.22 * acak()), v = a0 + 2 * Math.PI * (i + 0.5) / n;
      if (!tumpul) pts.push([r1(L * Math.cos(a)), r1(L * Math.sin(a))]);
      else for (let k = -3; k <= 3; k++) {
        const f = a + k * Math.PI / 6, c2 = L - rho;
        pts.push([r1(c2 * Math.cos(a) + rho * Math.cos(f)), r1(c2 * Math.sin(a) + rho * Math.sin(f))]);
      }
      pts.push([r1(rv * Math.cos(v)), r1(rv * Math.sin(v))]);
    }
    return [{ k: "poly", pts, fill: "b" }];
  }
  var acakDari = (seed) => {
    let x = seed * 7919 + 13;
    return () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  };
  var urat = (ctrl, t, a = 0.18, b = 0.82) => {
    const i0 = Math.round(a * (ctrl.length - 1)), i1 = Math.round(b * (ctrl.length - 1));
    return { k: "poly", pts: goresan(ctrl.slice(i0, i1 + 1), [t * 0.5, t, t, t * 0.5]), fill: "u" };
  };
  function tunas(n, seed, dgnUrat = false) {
    const r = acakDari(seed), fase = r() * 6, amp = 6 + 12 * r(), gel = 1.5 + 2 * r(), kiri = r() < 0.5, kait = r() < 0.5 ? 1 : -1, out = [];
    const batang = Array.from({ length: n + 3 }, (_, i) => {
      const t = i / (n + 2);
      return [r1(amp * Math.sin(t * gel + fase)), r1(40 - 80 * t)];
    });
    const [tx, ty] = batang[batang.length - 1];
    const ujung = [[tx, ty], [tx + 8 * kait, ty - 4], [tx + 11 * kait, ty + 4], [tx + 5 * kait, ty + 6]];
    out.push({ k: "poly", pts: goresan([...batang, ...ujung.slice(1)], [7, 6.5, 6, 5, 4, 3]), fill: "b" });
    for (let i = 1; i <= n; i++) {
      const [x, y] = batang[i], sisi = i % 2 === 0 === kiri ? -1 : 1, L = 18 + 12 * r() - 6 * i / n, naik = 0.25 + 0.8 * r();
      const tip = [x + sisi * L, y - L * naik], tengah = [x + sisi * L * 0.5, y - L * naik * 0.5];
      const w = 5 + 4 * r(), nx = -(tip[1] - y) / L, ny = (tip[0] - x) / L;
      out.push({ k: "poly", pts: lengkung([[x, y], [tengah[0] + nx * w, tengah[1] + ny * w], tip, [tengah[0] - nx * w * 0.6, tengah[1] - ny * w * 0.6]], 6), fill: "b" });
    }
    if (dgnUrat) out.push(urat(batang, 2.2, 0.08, 0.7));
    return out;
  }
  function sabit(n, seed, dgnUrat = false) {
    const r = acakDari(seed), R = 30, a0 = -2.4, a1 = 2, N = 60;
    const posG = Array.from({ length: n }, (_, k) => 0.15 + 0.7 * (k + 0.3 + 0.4 * r()) / n), tinggi = posG.map(() => 6 + 7 * r());
    const w = (t) => 26 * Math.pow(Math.sin(Math.PI * t), 0.75) * (0.75 + 0.5 * t);
    const luar = [], dalam = [], tengah = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, a = a0 + (a1 - a0) * t, c2 = Math.cos(a), sn = Math.sin(a);
      const g = posG.reduce((m, p2, k) => Math.max(m, tinggi[k] * Math.max(0, 1 - Math.abs(t - p2) * 28)), 0);
      luar.push([r1((R + w(t) / 2 + g) * c2), r1((R + w(t) / 2 + g) * sn)]);
      dalam.push([r1((R - w(t) / 2) * c2), r1((R - w(t) / 2) * sn)]);
      tengah.push([R * c2, R * sn]);
    }
    const out = [{ k: "poly", pts: [...luar, ...dalam.reverse()], fill: "b" }];
    if (dgnUrat) out.push(urat(tengah.filter((_, i) => i % 4 === 0), 2.4, 0.2, 0.75));
    return out;
  }
  function pita(n, seed, dgnUrat = false) {
    const r = acakDari(seed), ctrl = [[0, 0]], tebal2 = [5];
    let arah = r() * Math.PI;
    for (let i = 0; i < n; i++) {
      const [px, py] = ctrl[ctrl.length - 1], L = 22 + 14 * r(), b = arah + (i % 2 ? 1 : -1) * (1.3 + 0.6 * r());
      ctrl.push([px + L / 2 * Math.cos(arah), py + L / 2 * Math.sin(arah)], [px + L * Math.cos(arah), py + L * Math.sin(arah)]);
      tebal2.push(9 + 4 * r(), 4);
      arah = b;
    }
    tebal2[tebal2.length - 1] = 2;
    const out = [{ k: "poly", pts: goresan(ctrl, tebal2), fill: "b" }];
    if (dgnUrat) out.push(urat(ctrl, 2.2, 0.1, 0.9));
    return out;
  }
  function rantai(n, seed) {
    const r = acakDari(seed), D = [[1, 0], [0, 1], [-1, 0], [0, -1]], pos = [[0, 0]], pakai = /* @__PURE__ */ new Set(["0,0"]);
    let d = Math.floor(r() * 4);
    for (let i = 1; i < n; i++) {
      const coba = [d, (d + 1) % 4, (d + 3) % 4].sort(() => r() - 0.5).sort((a, b) => (a === d ? 1 : 0) - (b === d ? 1 : 0));
      const ok = coba.find((k) => !pakai.has(`${pos[i - 1][0] + D[k][0]},${pos[i - 1][1] + D[k][1]}`));
      if (ok === void 0) throw new Error(`rantai${n}-${seed}: jalur buntu, jumlah manik tidak pas`);
      d = ok;
      pos.push([pos[i - 1][0] + D[d][0], pos[i - 1][1] + D[d][1]]);
      pakai.add(pos[i].join());
    }
    const S = 20, out = [];
    pos.forEach(([x, y], i) => {
      const h = 4.8 + 2.2 * r() + (i === 0 ? 1.5 : 0), cx = x * S, cy = y * S;
      out.push({ k: "poly", pts: lengkung([[cx - h, cy - h], [cx, cy - h * 1.05], [cx + h, cy - h], [cx + h * 1.05, cy], [cx + h, cy + h], [cx, cy + h * 1.05], [cx - h, cy + h], [cx - h * 1.05, cy]], 4), fill: "b" });
      if (i) out.push({ k: "poly", pts: goresan([[pos[i - 1][0] * S, pos[i - 1][1] * S], [cx, cy]], [4.5, 4.5]), fill: "b" });
    });
    return out;
  }
  function ikalGanda(seed, dgnUrat = false) {
    const r = acakDari(seed), putA = 1.4 + 0.4 * r(), putB = 0.9 + 0.3 * r(), ctrl = [];
    for (let t = putA; t >= 0; t -= 0.1) {
      const a = t * 2 * Math.PI, rr = 4 + 15 * (t / putA);
      ctrl.push([-16 + rr * Math.cos(a), rr * Math.sin(a)]);
    }
    for (let t = 0; t <= putB; t += 0.1) {
      const a = Math.PI + t * 2 * Math.PI, rr = 10 * (1 - t / putB) + 3;
      ctrl.push([18 + rr * Math.cos(-a), 4 + rr * Math.sin(-a)]);
    }
    const tebal2 = ctrl.map((_, i) => 2.5 + 7 * Math.sin(Math.PI * i / (ctrl.length - 1)));
    const out = [{ k: "poly", pts: goresan(ctrl, tebal2), fill: "b" }];
    if (dgnUrat) out.push(urat(ctrl, 1.8, 0.3, 0.7));
    return out;
  }
  var skalaKe = (P, [cx, cy], k) => P.map(([x, y]) => [r1(cx + (x - cx) * k), r1(cy + (y - cy) * k)]);
  function awan(n, seed) {
    const r = acakDari(seed), ctrl = [], m = 4 + Math.floor(r() * 2);
    for (let i = 0; i <= m; i++) {
      const a = Math.PI + Math.PI * i / m, R = 26 + 14 * r();
      ctrl.push([R * 1.3 * Math.cos(a), 6 + R * Math.sin(a) * (1 + 0.25 * Math.sin(i * 1.7))]);
    }
    ctrl.push([42, 10], [36, 22], [16, 20], [-10, 26], [-36, 18]);
    const luar = lengkung(ctrl, 7), pusat = [30, 14], out = [];
    for (let k = 0; k <= n; k++) {
      const f = 1 - 0.72 * k / (n + 0.5);
      out.push({ k: "poly", pts: skalaKe(luar, pusat, f), fill: "b" });
      if (k < n) out.push({ k: "poly", pts: skalaKe(luar, pusat, f - 0.045), fill: "u" });
    }
    const sp = [];
    for (let t = 0; t <= 1.5; t += 0.1) {
      const a = t * 2 * Math.PI, rr = 11 * (1 - t / 1.9);
      sp.push([30 + rr * Math.cos(a), 26 + rr * Math.sin(a)]);
    }
    out.push({ k: "poly", pts: goresan(sp, sp.map((_, i) => 6 - 4 * i / sp.length)), fill: "b" });
    return out;
  }
  function keris(n, seed, dgnUrat = false) {
    const r = acakDari(seed), A = 4 + 2 * r(), N = 40, ctrl = [], tb = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      ctrl.push([r1(A * Math.sin(Math.PI * n * t) * (1 - 0.35 * t)), r1(26 - 70 * t)]);
      tb.push(13 * Math.pow(1 - t, 0.6) + 1);
    }
    const bilah = goresan(ctrl.filter((_, i) => i % 2 === 0), tb.filter((_, i) => i % 2 === 0));
    const sisi = r() < 0.5 ? 1 : -1, ganja = lengkung([[-9 * sisi, 24], [16 * sisi, 22], [20 * sisi, 27], [6 * sisi, 31], [-9 * sisi, 30]], 5);
    const hulu = goresan([[0, 30], [2 * sisi, 38], [8 * sisi, 44], [14 * sisi, 45]], [8, 9, 9, 7]);
    const out = [{ k: "poly", pts: bilah, fill: "b" }, { k: "poly", pts: ganja, fill: "b" }, { k: "poly", pts: hulu, fill: "b" }];
    if (dgnUrat) out.push(urat(ctrl.filter((_, i) => i % 2 === 0), 1.8, 0.1, 0.75));
    return out;
  }
  function padi(n, seed) {
    const r = acakDari(seed), lengk = 0.9 + 0.4 * r(), ctrl = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8, a = -Math.PI / 2 + lengk * 2.4 * t;
      ctrl.push([r1(-14 + 30 * Math.cos(a) * t * 1.3), r1(40 - 62 * Math.sin(-a) * 0.95 - 6 * t)]);
    }
    const out = [{ k: "poly", pts: goresan(ctrl, [7, 6.5, 6, 5.5, 5, 4, 3]), fill: "b" }];
    out.push({ k: "poly", pts: goresan([ctrl[1], [ctrl[1][0] - 12, ctrl[1][1] - 16], [ctrl[1][0] - 16 - 6 * r(), ctrl[1][1] - 38]], [7, 6, 1]), fill: "b" });
    for (let j = 0; j < n; j++) {
      const t = 0.3 + 0.66 * j / Math.max(n - 1, 1), i = Math.min(Math.floor(t * 8), 7), u = t * 8 - i;
      const [x, y] = [ctrl[i][0] + (ctrl[i + 1][0] - ctrl[i][0]) * u, ctrl[i][1] + (ctrl[i + 1][1] - ctrl[i][1]) * u];
      const sisi = j % 2 ? 1 : -1, L = 17 - 6 * j / n + 2 * r(), a = Math.atan2(ctrl[i + 1][1] - ctrl[i][1], ctrl[i + 1][0] - ctrl[i][0]) + sisi * 0.9;
      const tip = [x + L * Math.cos(a), y + L * Math.sin(a)], q = [-Math.sin(a) * 5.5, Math.cos(a) * 5.5];
      out.push({ k: "poly", pts: lengkung([[x, y], [(x + tip[0]) / 2 + q[0], (y + tip[1]) / 2 + q[1]], tip, [(x + tip[0]) / 2 - q[0], (y + tip[1]) / 2 - q[1]]], 6), fill: "b" });
    }
    return out;
  }
  function ranting(n, seed) {
    const r = acakDari(seed), miring = (r() - 0.5) * 0.5, batang = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      batang.push([r1(Math.sin(t * 2 + miring * 6) * 6 + miring * 40 * t), r1(42 - 84 * t)]);
    }
    const out = [{ k: "poly", pts: goresan(batang, [10, 9, 7.5, 6, 4.5, 3, 1.5]), fill: "b" }];
    const awal = r() < 0.5 ? 1 : -1;
    for (let j = 0; j < n; j++) {
      const t = 0.18 + 0.62 * (j + 0.3 * r()) / n, i = Math.min(Math.floor(t * 6), 5), u = t * 6 - i;
      const [x, y] = [batang[i][0] + (batang[i + 1][0] - batang[i][0]) * u, batang[i][1] + (batang[i + 1][1] - batang[i][1]) * u];
      const sisi = (j % 2 ? -1 : 1) * awal, L = 30 - 12 * j / n + 8 * r(), a = -Math.PI / 2 + sisi * (0.7 + 0.5 * r());
      const tengah = [x + L * 0.55 * Math.cos(a) + sisi * 3, y + L * 0.55 * Math.sin(a) + 4], ujung = [x + L * Math.cos(a), y + L * Math.sin(a)];
      out.push({ k: "poly", pts: goresan([[x, y], tengah, ujung], [7 - 3 * j / n, 4, 1]), fill: "b" });
    }
    return out;
  }
  function kerang(n, seed) {
    const r = acakDari(seed), engsel = [-12, 30], a0 = -Math.PI * 0.95, a1 = -Math.PI * (0.18 + 0.08 * r()), tepi = [], garis = [];
    const lebar = Array.from({ length: n }, (_, j) => 0.7 + 0.6 * ((j + 1) / n) + 0.2 * r()), total = lebar.reduce((a, b) => a + b, 0);
    const batas = lebar.reduce((acc, w) => [...acc, acc[acc.length - 1] + w / total], [0]);
    for (let k = 0; k <= 120; k++) {
      const t = k / 120, a = a0 + (a1 - a0) * t, j = Math.min(batas.findIndex((b) => b > t) - 1, n - 1), u = (t - batas[j]) / (batas[j + 1] - batas[j]);
      const R = 46 + 10 * t + 6 * Math.sin(Math.PI * Math.max(0, Math.min(1, u)));
      tepi.push([r1(engsel[0] + R * Math.cos(a)), r1(engsel[1] + R * Math.sin(a))]);
    }
    for (let j = 1; j < n; j++) {
      const a = a0 + (a1 - a0) * batas[j], R = 44 + 10 * batas[j];
      garis.push({ k: "poly", pts: goresan([[engsel[0] + 8 * Math.cos(a), engsel[1] + 8 * Math.sin(a)], [engsel[0] + R * Math.cos(a), engsel[1] + R * Math.sin(a)]], [1, 2.6]), fill: "u" });
    }
    const telinga = [{ k: "poly", pts: lengkung([[-14, 30], [-34, 24], [-36, 36], [-16, 39]], 5), fill: "b" }, { k: "poly", pts: lengkung([[-10, 30], [-2, 29], [-2, 34], [-9, 35]], 5), fill: "b" }];
    return [{ k: "poly", pts: [...tepi, engsel], fill: "b" }, ...telinga, ...garis];
  }
  function gulung(n, seed) {
    const r = acakDari(seed), out = [];
    for (let j = 0; j < n; j++) {
      const s2 = 1 - 0.3 * j / Math.max(n - 1, 1), x0 = 26 - 60 * j / Math.max(n - 1, 1), y0 = 34 - 6 * j * r(), R = 16 * s2, path = [];
      path.push([x0 - 34 * s2, y0], [x0 - 22 * s2, y0 - 4 * s2], [x0 - 8 * s2, y0 - 16 * s2]);
      for (let t = 0; t <= 1.35; t += 0.08) {
        const a = Math.PI + t * 2 * Math.PI, rr = R * (1 - t / 1.7);
        path.push([x0 + rr * Math.cos(a) * -1 + R * 0.2, y0 - 22 * s2 + rr * Math.sin(a)]);
      }
      out.push({ k: "poly", pts: goresan(path, path.map((_, i) => i < 3 ? 9 * s2 : 9 * s2 * (1 - (i - 3) / (path.length - 2)) + 1.2)), fill: "b" });
    }
    return out;
  }
  function teratai(n, seed) {
    const r = acakDari(seed), out = [], pangkal = [2, 22], miring = (r() - 0.5) * 0.5;
    for (let j = 0; j < n; j++) {
      const a = -Math.PI / 2 + miring + (j - (n - 1) / 2) * (1.9 / n), L = 30 + 14 * Math.cos((j - (n - 1) / 2) / n * 2.4) + 6 * r(), w = 7 + 3 * r();
      const d = [Math.cos(a), Math.sin(a)], q = [-d[1], d[0]], at = (s2, t) => [pangkal[0] + d[0] * s2 + q[0] * t, pangkal[1] + d[1] * s2 + q[1] * t];
      out.push({ k: "poly", pts: lengkung([at(0, w * 0.4), at(L * 0.45, w), at(L, 0), at(L * 0.45, -w), at(0, -w * 0.4)], 6), fill: "b" });
    }
    const sisi = r() < 0.5 ? 1 : -1, cx = 24 * sisi, cy = 32;
    out.push({ k: "poly", pts: lengkung([[cx - 14, cy], [cx - 10, cy - 8], [cx, cy - 10], [cx + 12, cy - 6], [cx + 15, cy + 2], [cx + 4, cy + 9], [cx - 2, cy + 3], [cx - 8, cy + 8]], 6), fill: "b" });
    return out;
  }
  function batu(n, seed) {
    const r = acakDari(seed), out = [];
    let y = 40, x = 0;
    for (let j = 0; j < n; j++) {
      const w = 24 - 10 * j / n + 6 * r(), h = (22 - 8 * j / n) * (0.8 + 0.35 * r()), cy = y - h / 2, tilt = (r() - 0.5) * 0.6;
      x += (j % 2 ? -1 : 1) * (4 + 8 * r());
      const ctrl = Array.from({ length: 7 }, (_, k) => {
        const a = 2 * Math.PI * k / 7 + r() * 0.4, f = 0.8 + 0.3 * r(), px = Math.cos(a) * w * f, py = Math.sin(a) * (h / 2) * f;
        return [x + px * Math.cos(tilt) - py * Math.sin(tilt), cy + px * Math.sin(tilt) + py * Math.cos(tilt)];
      });
      out.push({ k: "poly", pts: lengkung(ctrl, 5), fill: "b" });
      y -= h + 2.5;
    }
    return out;
  }
  function sayap(n, seed) {
    const r = acakDari(seed), tulang = [], out = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      tulang.push([-34 + 68 * t, -18 - 14 * Math.sin(Math.PI * t * 0.9) + 8 * t]);
    }
    out.push({ k: "poly", pts: goresan(tulang, [9, 8.5, 8, 7, 6, 4.5, 3]), fill: "b" });
    for (let j = 0; j < n; j++) {
      const t = 0.08 + 0.84 * j / Math.max(n - 1, 1), i = Math.min(Math.floor(t * 6), 5), u = t * 6 - i;
      const x = tulang[i][0] + (tulang[i + 1][0] - tulang[i][0]) * u, y = tulang[i][1] + (tulang[i + 1][1] - tulang[i][1]) * u;
      const L = 20 + 26 * t + 4 * r(), a = Math.PI / 2 - 0.2 + 1 * t + 0.08 * r(), w = 3.2 + 0.8 * r(), ujung = [x + L * Math.cos(a), y + L * Math.sin(a)];
      out.push({ k: "poly", pts: goresan([[x, y], [x + L * 0.5 * Math.cos(a), y + L * 0.5 * Math.sin(a)], ujung], [w * 1.6, w * 2, w * 1.8]), fill: "b" }, { k: "circ", c: [r1(ujung[0]), r1(ujung[1])], r: r1(w * 0.9), fill: "b" });
    }
    return out;
  }
  var POLA = {
    molekul3: molekulAcak(3, 5),
    molekul4: molekulAcak(4, 2),
    molekul5: molekulAcak(5, 12),
    spiral7: spiral(7, 9.5),
    spiral9: spiral(9, 7.5),
    ikal2: ikal(2),
    ikal3: ikal(3, 14),
    lekuk3: lekuk(3, 4),
    lekuk4: lekuk(4, 2),
    lekuk5: lekuk(5, 1),
    // Gaya siluet (2026-10-28): molekul bersiku yang lolos cek mata; yang lurus memanjang (seed 22, 52, 9, 29) lemah.
    molekul3b: molekulAcak(3, 31),
    molekul3c: molekulAcak(3, 14),
    molekul4b: molekulAcak(4, 59),
    molekul4c: molekulAcak(4, 21),
    molekul5b: molekulAcak(5, 6),
    molekul5c: molekulAcak(5, 39)
  };

  // src/tiu-bentuk.ts
  var T_ALL = ["tetap", "r90", "r180", "r270", "mkk", "mab", "md1", "md2"];
  var TF = { tetap: [0, false], r90: [90, false], r180: [180, false], r270: [270, false], mkk: [0, true], mab: [180, true], md1: [90, true], md2: [270, true] };
  var T_NAME = {
    tetap: "tidak berubah",
    r90: "diputar 90\xB0 searah jarum jam",
    r180: "diputar 180\xB0",
    r270: "diputar 90\xB0 berlawanan arah jarum jam",
    mkk: "dicermin kiri-kanan",
    mab: "dicermin atas-bawah",
    md1: "dicermin pada garis miring /",
    md2: "dicermin pada garis miring \\"
  };
  var ap = (t, f) => tf(f, ...TF[t]);
  var comp = (a, b) => {
    const s2 = sig(ap(b, ap(a, ACUAN)));
    return T_ALL.find((t) => sig(ap(t, ACUAN)) === s2);
  };
  var inv = (t) => T_ALL.find((u) => comp(t, u) === "tetap");
  var ACUAN = [{ k: "poly", pts: [[-6, -36], [6, -36], [6, 18], [16, 18], [16, 4], [28, 4], [28, 30], [-6, 30]], fill: "b" }];
  var GAYA2 = { ...GAYA, benda: BENDA, pola: POLA };
  var POLA_FN = {
    tunas: (n, s2, u) => tunas(n || 4, s2, u),
    sabit: (n, s2, u) => sabit(n || 4, s2, u),
    pita: (n, s2, u) => pita(n || 4, s2, u),
    rantai: (n, s2) => rantai(n || 5, s2),
    ikalkembar: (_, s2, u) => ikalGanda(s2, u),
    molekul: (n, s2) => molekulAcak(n || 4, s2),
    awan: (n, s2) => awan(n || 3, s2),
    keris: (n, s2, u) => keris(n || 5, s2, u),
    padi: (n, s2) => padi(n || 6, s2),
    ranting: (n, s2) => ranting(n || 4, s2),
    kerang: (n, s2) => kerang(n || 5, s2),
    gulung: (n, s2) => gulung(n || 3, s2),
    teratai: (n, s2) => teratai(n || 5, s2),
    batu: (n, s2) => batu(n || 4, s2),
    sayap: (n, s2) => sayap(n || 5, s2)
  };
  var HITUNG_JENIS = {
    keris: { batas: [3, 9], nama: ["keris", "luk"] },
    ranting: { batas: [3, 7], nama: ["ranting", "cabang"] },
    kerang: { batas: [4, 9], nama: ["kerang", "rusuk"] },
    tunas: { batas: [3, 7], nama: ["tunas", "daun"] },
    teratai: { batas: [3, 7], nama: ["teratai", "kelopak"] },
    batu: { batas: [2, 6], nama: ["susunan batu", "batu"] },
    sayap: { batas: [3, 7], nama: ["sayap", "bulu"] },
    awan: { batas: [2, 5], nama: ["awan", "lapis"] },
    rantai: { batas: [3, 7], nama: ["rantai", "manik"] }
  };
  var buatHitung = (jenis2, n, seed) => {
    const [lo, hi] = HITUNG_JENIS[jenis2].batas;
    shim_assert_default.ok(n >= lo && n <= hi, `${jenis2}: ${n} di luar batas hitung ${lo}\u2013${hi}`);
    return muat(POLA_FN[jenis2](n, seed, false), [0, 0], 80);
  };
  var NAMA_POLA = /^(tunas|sabit|pita|rantai|ikalkembar|molekul|awan|keris|padi|ranting|kerang|gulung|teratai|batu|sayap)(\d*)-(\d+)(u?)$/;
  function buatPola(nama) {
    const m = nama.match(NAMA_POLA);
    if (!m) return void 0;
    const f = muat(POLA_FN[m[1]](+m[2], +m[3], m[4] === "u"), [0, 0], 80);
    shim_assert_default.ok(kiral(f), `bentuk ${nama} tidak kiral; pakai varian lain`);
    shim_assert_default.ok(bedaMin(f) >= BEDA_MIN, `bentuk ${nama}: putar dan cermin terlalu mirip (${bedaMin(f).toFixed(2)}); pakai varian lain`);
    return f;
  }
  var BENTUK = new Proxy(Object.assign({}, ...Object.values(GAYA2)), {
    get: (t, k) => typeof k !== "string" || k in t ? t[k] : t[k] = buatPola(k)
  });
  var GAYA_DARI = Object.fromEntries(Object.entries(GAYA2).flatMap(([g, m]) => Object.keys(m).map((n) => [n, g])));
  var NAMA = Object.keys(BENTUK);
  function varian(kel, n, jumlah, dari = 1, u = false) {
    const out = [];
    for (let sd = dari; out.length < jumlah && sd < dari + 200; sd++) {
      const nm = `${kel}${n || ""}-${sd}${u ? "u" : ""}`;
      try {
        if (BENTUK[nm]) out.push(nm);
      } catch {
      }
    }
    shim_assert_default.equal(out.length, jumlah, `varian ${kel}${n}: kurang dari ${jumlah} yang lolos`);
    return out;
  }
  var keluarga = (n) => n.match(NAMA_POLA)?.[1] ?? (n.startsWith("molekul") ? "molekul" : GAYA_DARI[n] === "benda" ? TEMA[n] : GAYA_DARI[n] ?? n);
  var ciriDari = (bentuk, susunan, lain = []) => ({ keluarga: [.../* @__PURE__ */ new Set([...bentuk.map(keluarga), ...lain])], susunan, bentuk });
  function kiral(f) {
    return new Set(T_ALL.map((t) => sig(ap(t, f)))).size === 8;
  }
  var pip = (P, [x, y]) => {
    let c2 = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i], [xj, yj] = P[j];
      if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c2 = !c2;
    }
    return c2;
  };
  function tinta(f) {
    const out = /* @__PURE__ */ new Set();
    for (let x = -47; x <= 47; x += 2) for (let y = -47; y <= 47; y += 2) {
      let ink = false;
      for (const q of f) {
        const isi = q.k === "poly" ? pip(q.pts, [x, y]) : q.k === "circ" ? Math.hypot(x - q.c[0], y - q.c[1]) <= q.r : false;
        if (isi) ink = q.fill === "b";
      }
      if (ink) out.add(`${x},${y}`);
    }
    return out;
  }
  function piksel(f) {
    const out = tinta(f);
    const xs = [...out].map((p2) => +p2.split(",")[0]), ys = [...out].map((p2) => +p2.split(",")[1]);
    const dx = Math.round((Math.min(...xs) + Math.max(...xs)) / 4) * 2, dy = Math.round((Math.min(...ys) + Math.max(...ys)) / 4) * 2;
    return new Set([...out].map((p2) => {
      const [x, y] = p2.split(",").map(Number);
      return `${x - dx},${y - dy}`;
    }));
  }
  var bedaP = (A, B) => {
    let x = 0;
    A.forEach((p2) => B.has(p2) || x++);
    B.forEach((p2) => A.has(p2) || x++);
    return x / (/* @__PURE__ */ new Set([...A, ...B])).size;
  };
  var beda = (a, b) => bedaP(piksel(a), piksel(b));
  var bedaMin = (f) => {
    const P = T_ALL.map((t) => piksel(ap(t, f)));
    return Math.min(...P.flatMap((A, i) => P.slice(i + 1).map((B) => bedaP(A, B))));
  };
  var BEDA_MIN = 0.3;
  function cekBentuk() {
    for (const [n, f] of Object.entries(BENTUK)) {
      shim_assert_default.ok(kiral(f), `bentuk ${n} tidak kiral`);
      shim_assert_default.ok(bedaMin(f) >= BEDA_MIN, `bentuk ${n}: putar dan cermin terlalu mirip (${bedaMin(f).toFixed(2)})`);
    }
  }
  if (!globalThis.SKIP_CEK) cekBentuk();
  var geser = (f, [dx, dy], s2 = 1) => f.map((q) => {
    const p2 = ([x, y]) => [r1(x * s2 + dx), r1(y * s2 + dy)];
    return q.k === "poly" ? { ...q, pts: q.pts.map(p2) } : q.k === "circ" ? { ...q, c: p2(q.c), r: r1(q.r * s2) } : { ...q, a: p2(q.a), b: p2(q.b) };
  });
  var SLOT = { 2: [[-22, 0], [22, 0]], 3: [[-22, -20], [22, -20], [0, 22]], 4: [[-22, -22], [22, -22], [22, 22], [-22, 22]] };
  var KUADRAN = ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"];
  var RUPA = ["arsir", "hitam", "garis", "hitam"];
  var beri = (r, f) => r === "garis" ? balikWarna(f) : r === "arsir" ? arsir(f) : f;
  var RINCI = /* @__PURE__ */ new Set(["kupu", "kucing", "kura", "burung", "bolakisi", "obor", "sayapbulu", "rajawali", "spiral7", "spiral9", "ikal2", "ikal3"]);
  var cekKecil = (nama, skala2) => nama.forEach((n, i) => shim_assert_default.ok(!(RINCI.has(n) && skala2[i] <= 0.34), `${n} terlalu rinci untuk objek kecil; jadikan objek besar`));
  var TATA = {
    1: [[[0, 0], 0.9]],
    2: [[[-12, -8], 0.62], [[28, 26], 0.32]],
    3: [[[-14, -12], 0.56], [[28, -26], 0.3], [[22, 26], 0.34]]
  };
  var tata = (objs, rupa, t = "tetap", tempat = TATA[objs.length]) => {
    if (tempat[0][1] <= 1) return objs.flatMap((o, i) => beri(rupa[i] ?? "hitam", ap(t, geser(o, ...tempat[i]))));
    objs.forEach((o, i) => shim_assert_default.ok(!(o.some((q) => q.fill === "u") && tempat[i][1] < 36), "guratan putih hanya untuk objek besar (petak \u2265 36)"));
    const isi = objs.map((o, i) => muat(o, ...tempat[i]));
    cekPisah(isi);
    return isi.flatMap((o, i) => beri(rupa[i] ?? "hitam", ap(t, o)));
  };
  var HITAM = ["hitam", "hitam", "hitam", "hitam"];
  function kotak(f) {
    const P = f.flatMap((q) => q.k === "poly" ? q.pts : q.k === "circ" ? [[q.c[0] - q.r, q.c[1] - q.r], [q.c[0] + q.r, q.c[1] + q.r]] : [q.a, q.b]);
    const xs = P.map((p2) => p2[0]), ys = P.map((p2) => p2[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  }
  var muat = (f, [cx, cy], ukuran, tinggi) => {
    const [x0, y0, x1, y1] = kotak(f), s2 = tinggi ? Math.min(ukuran / (x1 - x0), tinggi / (y1 - y0)) : ukuran / Math.max(x1 - x0, y1 - y0);
    return geser(f, [cx - s2 * (x0 + x1) / 2, cy - s2 * (y0 + y1) / 2], s2);
  };
  var PETAK = {
    1: [[[[0, 0], 84]]],
    2: [[[[-15, -13], 58], [[26, 26], 34]], [[[-21, -7], 44], [[23, 13], 40]]],
    3: [[[[-21, -21], 42], [[23, -22], 38], [[2, 23], 40]], [[[-14, -10], 58], [[29, -27], 28], [[26, 28], 32]]],
    4: [[[[-22, -22], 42], [[23, -21], 38], [[22, 23], 40], [[-22, 22], 36]], [[[-20, -24], 38], [[22, -20], 42], [[24, 24], 36], [[-21, 21], 40]]]
  };
  var NAMA_PETAK = {
    1: [["tengah"]],
    2: [["besar", "kecil"], ["kiri", "kanan"]],
    3: [["kiri atas", "kanan atas", "bawah"], ["besar di kiri", "kecil kanan atas", "kecil kanan bawah"]],
    4: [["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"], ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"]]
  };
  function tebal(f) {
    const T = tinta(muat(f, [0, 0], 84)), D = [[4, 0], [-4, 0], [0, 4], [0, -4], [4, 4], [-4, 4], [4, -4], [-4, -4]];
    let k = 0;
    T.forEach((p2) => {
      const [x, y] = p2.split(",").map(Number);
      if (D.every(([a, b]) => T.has(`${x + a},${y + b}`))) k++;
    });
    return k / T.size;
  }
  var TEBAL_MIN = 0.2;
  function cekBedaObjek(nama, soal) {
    const f = (n) => muat(BENTUK[n], [0, 0], 60);
    nama.forEach((a, i) => nama.slice(i + 1).forEach((b) => {
      const m = Math.min(...T_ALL.map((t) => beda(ap(t, f(a)), f(b))));
      shim_assert_default.ok(m >= 0.3, `${soal}: ${a} dan ${b} terlalu mirip untuk dilacak (${m.toFixed(2)})`);
    }));
  }
  function cekPisah(objs) {
    const T = objs.map(tinta);
    T.forEach((A, i) => T.slice(i + 1).forEach((B) => A.forEach((p2) => shim_assert_default.ok(!B.has(p2), "dua objek dalam satu sel saling menempel"))));
  }
  var siluet = (svg2) => svg2.replace(/fill="#111" stroke="#111" stroke-width="[\d.]+"( stroke-linejoin="round")?/g, 'fill="#111"');
  function rng(seed) {
    let x = seed >>> 0 || 1;
    return () => (x = x * 1664525 + 1013904223 >>> 0) / 2 ** 32;
  }
  var pick = (r, xs) => xs[Math.floor(r() * xs.length)];
  function shuffle(r, xs) {
    const a = [...xs];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pasang(kunci, salah, key, tanda = sig) {
    shim_assert_default.equal(salah.length, 4, "pengecoh harus 4");
    const all = [...salah];
    all.splice(KEYS.indexOf(key), 0, null);
    const opts = all.map((s2) => s2 ? s2.fig : kunci);
    shim_assert_default.equal(new Set(opts.map(tanda)).size, 5, "opsi kembar secara geometris");
    const gugur = all.map((s2, i) => s2 ? `Opsi ${KEYS[i]} gugur: ${s2.isi}, ${s2.alasan}.` : "").filter(Boolean);
    return { opts, gugur };
  }
  function calonDari(kunci, ubah, attr, fig, sah) {
    const satu = ubah.map((u) => [u]), dua = ubah.flatMap((u, i) => ubah.slice(i + 1).filter((w) => w.grup !== u.grup).map((w) => [u, w]));
    return [...satu, ...dua].flatMap((us) => {
      const x = us.reduce((s2, u) => u.ke(s2), kunci);
      return sah(x) ? [{ attr: attr(x), fig: fig(x), isi: us.map((u) => u.isi).join(" dan "), alasan: `kesalahannya: ${us.length === 2 && us[0].nama === us[1].nama ? `${us[0].nama} di dua objek` : us.map((u) => u.nama).join(" sekaligus ")}` }] : [];
    });
  }
  function pilih(kunciAttr, kunciFig, calon, seed) {
    const sama = (a, b) => a.filter((v, i) => v === b[i]).length;
    const unik = /* @__PURE__ */ new Map();
    for (const c2 of shuffle(rng(seed), calon)) if (sama(c2.attr, kunciAttr) < kunciAttr.length && sig(c2.fig) !== sig(kunciFig)) unik.set(c2.attr.join("|"), c2);
    const C = [...unik.values()], n = C.length, sg = C.map((c2) => sig(c2.fig)), sk = sig(kunciFig);
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c2 = b + 1; c2 < n; c2++) for (let d = c2 + 1; d < n; d++) {
      const D = [C[a], C[b], C[c2], C[d]];
      if (!kunciAttr.every((v, i) => D.some((x) => x.attr[i] !== v) && D.some((x) => x.attr[i] === v))) continue;
      const semua = [kunciAttr, ...D.map((x) => x.attr)], skor = semua.map((p2, i) => semua.reduce((s2, q, j) => s2 + (i === j ? 0 : sama(p2, q)), 0));
      if (Math.max(...skor.slice(1)) < skor[0]) continue;
      const angka = kunciAttr.map((_, i) => semua.every((p2) => p2[i] !== "" && !isNaN(+p2[i])));
      if (angka.some(Boolean)) {
        const tengah = semua.map((p2) => angka.every((ya, i) => !ya || +p2[i] === semua.map((q) => +q[i]).sort((x, y) => x - y)[2]));
        if (tengah[0] && tengah.filter(Boolean).length === 1) continue;
      }
      if ((/* @__PURE__ */ new Set([sk, sg[a], sg[b], sg[c2], sg[d]])).size < 5) continue;
      return D.map((x) => ({ fig: x.fig, isi: x.isi, alasan: x.alasan }));
    }
    shim_assert_default.fail("tidak ada 4 pengecoh yang menutup kunci dari tebakan 'opsi paling mirip'");
  }

  // src/tiu-fig-beda-seri.ts
  var BEDA = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };
  var SERI = { instruksi: "Perhatikan urutan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var ABC = (at, s2, n) => Array.from({ length: n }, (_, c2) => text(at(0, c2)[0], at(0, c2)[1] + s2 / 2 + 26, KEYS[c2], 22)).join("");
  var nomor = (at, s2, n) => Array.from({ length: n }, (_, c2) => text(at(0, c2)[0], at(0, c2)[1] + s2 / 2 + 24, `(${c2 + 1})`, 18)).join("");
  var teks = (o) => [`Yang ditanya: ${o.tanya}`, `Cara cepat: ${o.cara.join(" ")}`, "Kenapa opsi lain gugur:", ...o.gugur, `Jawaban: Opsi ${o.key}. ${o.alasan}`, `Analogi: ${o.analogi}`, `Jebakan: ${o.jebakan}`].join("\n");
  var BEDA_PUTAR = [
    { tier: 2, key: "C", bentuk: ["daun", "biji"], seed: 11 },
    { tier: 3, key: "E", bentuk: ["sulur", "koma", "kawung"], seed: 12 },
    { tier: 3, key: "A", bentuk: ["payung", "kail", "palu"], seed: 13 }
  ];
  function bedaPutar(s2) {
    const tempat = TATA[s2.bentuk.length];
    cekKecil(s2.bentuk, tempat.map((t) => t[1]));
    const r = rng(s2.seed), objs = s2.bentuk.map((n) => BENTUK[n]), rupa = s2.rupa ?? RUPA;
    shim_assert_default.ok(kiral(tata(objs, [], "tetap", tempat)), "gambar dasar harus kiral");
    const putar = shuffle(r, ["tetap", "r90", "r180", "r270"]);
    const cermin = comp(pick(r, ["tetap", "r90", "r180", "r270"]), "mkk");
    const kunci = tata(objs, rupa, cermin, tempat), lain = putar.map((t) => tata(objs, rupa, t, tempat));
    const ref = lain[0], dari = (t) => comp(inv(putar[0]), t);
    const salah = lain.map((f, i) => ({ fig: f, isi: i === 0 ? "ACUAN" : `sama dengan gambar acuan yang ${T_NAME[dari(putar[i])]}`, alasan: "jadi masih bentuk yang sama, hanya posisinya berubah" }));
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    const acuan = KEYS[opts.findIndex((f) => sig(f) === sig(ref))];
    const g = gugur.map((x) => x.includes("ACUAN") ? `Opsi ${acuan} gugur: ini acuannya, dan tiga opsi lain bisa didapat dengan memutarnya.` : x.replace("gambar acuan", `opsi ${acuan}`));
    const tc = dari(cermin);
    return {
      sub_type: "FIG-BEDA-PUTAR",
      tier: s2.tier,
      ...BEDA,
      key: s2.key,
      opts,
      stemSvg: "",
      pembahasan: teks({
        tanya: "satu gambar yang tidak bisa dibuat hanya dengan memutar gambar lain.",
        cara: [`Ambil opsi ${acuan} sebagai acuan.`, "Putar acuan itu dalam bayangan 90\xB0, 180\xB0, dan 270\xB0, lalu cocokkan dengan opsi lain.", s2.tier === 3 ? "Perhatikan semua objek sekaligus: letak objek kecil terhadap objek besar ikut berputar." : "Pilih satu ujung objek besar yang paling khas, lalu lihat di sisi mana ujung itu dan objek kecilnya berada setelah diputar.", "Arsir dan warna objek tidak ikut berubah, jadi abaikan."],
        gugur: g,
        key: s2.key,
        alasan: `Opsi ${s2.key} baru cocok dengan acuan bila ${T_NAME[tc]}, artinya gambar itu dibalik seperti bayangan cermin, bukan diputar.`,
        analogi: "Sarung tangan kanan bisa kamu putar ke mana saja, tetap tidak akan menjadi sarung tangan kiri.",
        jebakan: "Gambar yang terbalik 180\xB0 terlihat paling aneh, padahal itu tetap bentuk yang sama. Yang berbeda adalah gambar yang sisinya tertukar."
      }),
      pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, KEYS.indexOf(s2.key)], ann: (at, sz) => ABC(at, sz, 5), extra: () => "", extraH: 34, foot: ["Empat gambar = satu bentuk yang diputar", `Opsi ${s2.key} = bentuk yang dicermin`] })
    };
  }
  var token = (j, [x, y]) => j === "hitam" ? [{ k: "circ", c: [x, y], r: 11, fill: "b" }] : j === "putih" ? [{ k: "circ", c: [x, y], r: 11, fill: "w" }] : [{ k: "circ", c: [x, y], r: 11, fill: "w" }, { k: "circ", c: [x, y], r: 3.5, fill: "b" }];
  var POS = [-28, 0, 28].flatMap((y) => [-28, 0, 28].map((x) => [x, y]));
  var BEDA_HITUNG = [
    { tier: 2, key: "B", jenis: ["hitam", "putih", "bertitik"], target: "putih", n: 4, beda: 1, seed: 21 },
    { tier: 3, key: "D", jenis: ["hitam", "putih", "bertitik"], target: "bertitik", n: 3, beda: -1, seed: 22 }
  ];
  var CIRI = [
    ["bulatan tengah", (g) => g[4]],
    ["jumlah hitam di pojok", (g) => String([0, 2, 6, 8].filter((i) => g[i] === "hitam").length)],
    ["baris tengah", (g) => g.slice(3, 6).join()],
    ["simetri kiri-kanan", (g) => String([0, 3, 6].every((i) => g[i] === g[i + 2]))],
    ["simetri atas-bawah", (g) => String([0, 1, 2].every((i) => g[i] === g[i + 6]))],
    ["diagonal sama", (g) => String(g[0] === g[4] && g[4] === g[8])]
  ];
  var pencilan = (v) => {
    const c2 = /* @__PURE__ */ new Map();
    v.forEach((x) => c2.set(x, (c2.get(x) ?? 0) + 1));
    return c2.size === 2 && [...c2.values()].includes(1) ? v.findIndex((x) => c2.get(x) === 1) : -1;
  };
  var BEDA_HITUNG_S = [{ tier: 3, key: "C", siluet: true, seed: 23 }];
  var MOL = [[{ k: "circ", c: [0, 0], r: 8.5, fill: "b" }], molekul([[-9.5, 0, 7.5], [9.5, 0, 7.5]]), molekul([[-10, -6, 6.8], [8, -7, 6.8], [9, 11, 6.8]])];
  var BUTIR_T = ["tetap", "mkk", "mab", "r180"];
  var POS_S = [-30, 0, 30].flatMap((y) => [-30, 0, 30].map((x) => [x, y]));
  function bedaHitungS(s2) {
    const ki = KEYS.indexOf(s2.key), nama = s2.namaButir ?? ["molekul 1 bulatan", "molekul 2 bulatan", "molekul 3 bulatan"];
    const tok = (j) => s2.butir ? BENTUK[s2.butir[j]] : MOL[j], ukur = (j) => s2.butir ? 24 : j === 0 ? 17 : 26;
    for (let seed = s2.seed; seed < s2.seed + 5e3; seed++) {
      const r = rng(seed);
      const n23 = KEYS.map((_, i) => {
        const a = pick(r, [2, 3, 4]);
        return i === ki ? r() < 0.5 ? [a, a - 1] : [a - 1, a] : [a, a];
      });
      if (n23[ki].some((v) => v < 1)) continue;
      const grids = n23.map(([b, c2]) => shuffle(r, [...Array(9 - b - c2).fill(0), ...Array(b).fill(1), ...Array(c2).fill(2)]));
      if (new Set(grids.map((g) => g.join())).size < 5) continue;
      const jml = (g, j) => g.filter((x) => x === j).length;
      if ([0, 1, 2].some((j) => new Set(grids.filter((_, i) => i !== ki).map((g) => jml(g, j))).size === 1)) continue;
      const ciri = [
        (g) => String(g[4]),
        (g) => g.slice(3, 6).join(),
        (g) => String([0, 3, 6].every((i) => g[i] === g[i + 2])),
        (g) => String([0, 1, 2].every((i) => g[i] === g[i + 6])),
        (g) => String(g[0] === g[4] && g[4] === g[8]),
        (g) => String(jml(g, 0) === jml(g, 1)),
        (g) => String(jml(g, 0) === jml(g, 2)),
        ...[0, 1, 2].map((j) => (g) => String(jml(g, j))),
        (g) => String([0, 2, 6, 8].filter((i) => g[i] === 2).length)
      ];
      if (ciri.some((f) => {
        const p2 = pencilan(grids.map(f));
        return p2 >= 0 && p2 !== ki;
      })) continue;
      const bola = grids.map((g) => g.reduce((t, x) => t + x + 1, 0));
      if (bola.every((v, i) => i === ki || v < bola[ki]) || bola.every((v, i) => i === ki || v > bola[ki])) continue;
      const figs = grids.map((g) => {
        const t = g.map((j, i) => muat(ap(pick(r, s2.butir ? BUTIR_T : T_ALL), tok(j)), POS_S[i], ukur(j)));
        cekPisah(t);
        return t.flat();
      });
      const hitung = (g) => `${jml(g, 1)} ${nama[1]} dan ${jml(g, 2)} ${nama[2]}`;
      return {
        sub_type: "FIG-BEDA-HITUNG",
        tier: s2.tier,
        ...BEDA,
        key: s2.key,
        opts: figs,
        siluet: true,
        ciri: s2.butir ? ciriDari(s2.butir, "kisi9") : { keluarga: ["molekul"], susunan: "kisi9", bentuk: ["molekul-butir"] },
        stemSvg: "",
        pembahasan: teks({
          tanya: "satu gambar yang isinya tidak mengikuti aturan keempat gambar lain.",
          cara: ["Letak dan arah butir diacak di setiap gambar, jadi jangan mencari pola posisi atau putaran.", "Hitung tiap jenis butir. Jumlah satu jenis saja ternyata berubah-ubah di semua gambar, jadi aturannya bukan jumlah tetap.", `Bandingkan dua jenis sekaligus: di empat gambar, jumlah ${nama[1]} selalu sama dengan jumlah ${nama[2]}.`],
          gugur: grids.map((g, i) => i === ki ? "" : `Opsi ${KEYS[i]} gugur: ada ${hitung(g)}, jumlahnya sama.`).filter(Boolean),
          key: s2.key,
          alasan: `Hanya opsi ${s2.key} yang jumlahnya tidak sama: ${hitung(grids[ki])}.`,
          analogi: "Seperti memeriksa pasangan sepatu di rak: jumlah sepatunya boleh berbeda di tiap rak, yang dicek apakah kiri dan kanannya selalu berpasangan.",
          jebakan: "Kalau kamu hanya menghitung satu jenis, angkanya berubah-ubah dan kamu akan mengira soal ini tanpa pola. Polanya ada pada hubungan dua jenis."
        }),
        pbhSvg: layout([figs], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5) + grids.map((g, i) => textC(at(0, i)[0], at(0, i)[1] + sz / 2 + 52, `${jml(g, 1)} dan ${jml(g, 2)}`, 16, RED)).join(""), extra: () => "", extraH: 60, foot: [`Angka merah = ${nama[1]} dan ${nama[2]}`] })
      };
    }
    throw new Error("FIG-BEDA-HITUNG siluet: tidak ketemu susunan tanpa ciri pencilan lain");
  }
  function bedaHitung(s2) {
    if ("siluet" in s2) return bedaHitungS(s2);
    const ki = KEYS.indexOf(s2.key);
    shim_assert_default.ok(s2.jenis.length >= 3 && s2.target !== "hitam", "pakai 3 jenis bulatan dan target bukan hitam");
    for (let seed = s2.seed; seed < s2.seed + 5e3; seed++) {
      const r = rng(seed), lain = s2.jenis.filter((j) => j !== s2.target);
      const grids = KEYS.map((_, i) => {
        const nt = i === ki ? s2.n + s2.beda : s2.n;
        return shuffle(r, [...Array(nt).fill(s2.target), ...Array.from({ length: 9 - nt }, () => pick(r, lain))]);
      });
      if (new Set(grids.map((g) => g.join())).size < 5) continue;
      const ciriLain = [...CIRI, ...lain.map((j) => [`jumlah ${j}`, (g) => String(g.filter((x) => x === j).length)])];
      if (ciriLain.some(([, f]) => {
        const p2 = pencilan(grids.map(f));
        return p2 >= 0 && p2 !== ki;
      })) continue;
      const gelap = grids.map((g) => g.filter((x) => x === "hitam").length);
      if (gelap.every((v, i) => i === ki || v < gelap[ki]) || gelap.every((v, i) => i === ki || v > gelap[ki])) continue;
      const figs = grids.map((g) => g.flatMap((j, i) => token(j, POS[i])));
      const hitung = (g) => s2.jenis.map((j) => `${g.filter((x) => x === j).length} ${j}`).join(", ");
      return {
        sub_type: "FIG-BEDA-HITUNG",
        tier: s2.tier,
        ...BEDA,
        key: s2.key,
        opts: figs,
        stemSvg: "",
        pembahasan: teks({
          tanya: "satu gambar yang isinya tidak mengikuti aturan keempat gambar lain.",
          cara: ["Letak bulatan diacak di setiap gambar, jadi jangan mencari pola posisi.", `Hitung tiap jenis bulatan. Jumlah bulatan ${s2.target} sama di empat gambar, yaitu ${s2.n}.`],
          gugur: grids.map((g, i) => i === ki ? "" : `Opsi ${KEYS[i]} gugur: ${hitung(g)}; bulatan ${s2.target} tetap ${s2.n}, sama dengan kelompoknya.`).filter(Boolean),
          key: s2.key,
          alasan: `Hanya opsi ${s2.key} yang punya ${s2.n + s2.beda} bulatan ${s2.target} (${hitung(grids[ki])}).`,
          analogi: "Seperti memeriksa lima kantong permen: susunannya boleh acak, yang dicek isinya.",
          jebakan: s2.jenis.length === 3 ? "Jumlah jenis yang lain memang berubah-ubah di semua gambar, jadi itu bukan petunjuk. Cari jenis yang jumlahnya tetap." : "Mata tertarik pada gambar yang susunannya paling rapi atau paling acak. Susunan bukan aturannya."
        }),
        pbhSvg: layout([figs], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5) + grids.map((g, i) => textC(at(0, i)[0], at(0, i)[1] + sz / 2 + 52, `${g.filter((x) => x === s2.target).length} ${s2.target}`, 16, RED)).join(""), extra: () => "", extraH: 60 })
      };
    }
    throw new Error("FIG-BEDA-HITUNG: tidak ketemu susunan tanpa ciri pencilan lain");
  }
  var SERI_P3 = [
    { tier: 2, key: "D", bentuk: ["biji", "ombak", "pucuk"], t: "r90" },
    { tier: 3, key: "A", bentuk: ["zigzag", "sulur", "kawung"], t: "mab" },
    { tier: 3, key: "C", bentuk: ["ikan", "kunci", "burung"], t: "md1" },
    { tier: 3, key: "E", bentuk: ["akantus", "kuncup", "pita"], t: "r270", siluet: true, bintik: 1 }
  ];
  var kandidat = (t) => [
    [inv(t), "arah putarnya terbalik"],
    [comp(t, "mkk"), "sesudah diubah, gambar ikut dicermin kiri-kanan"],
    [isMirror(t) ? t === "mab" ? "mkk" : t === "mkk" ? "mab" : t === "md1" ? "md2" : "md1" : comp(t, "mab"), isMirror(t) ? "garis cerminnya salah" : "sesudah diputar, gambar ikut dicermin atas-bawah"],
    ["r180", "diputar 180\xB0"],
    ["tetap", "hanya menyalin gambar (3)"],
    ["mkk", "dicermin kiri-kanan"],
    ["r270", "diputar 90\xB0 berlawanan arah"]
  ];
  var isMirror = (t) => t.startsWith("m");
  function pengecohT(t, base, rupa) {
    const out = [], seen = /* @__PURE__ */ new Set([sig(ap(t, base))]);
    for (const [u, why] of kandidat(t)) {
      const f = ap(u, base);
      if (u === t || seen.has(sig(f))) continue;
      seen.add(sig(f));
      out.push({ fig: beri(rupa, f), isi: `gambar (3) ${T_NAME[u]}`, alasan: `${why}; aturan di soal ${T_NAME[t]}` });
      if (out.length === 4) break;
    }
    return out;
  }
  var BINTIK = [[35, -36], [35, -17], [35, 2], [35, 20], [35, 38], [16, 38], [-3, 38], [-22, 38], [-40, 38]];
  var selBintik = (f, n, seed) => [...muat(f, [-10, -10], 68), ...shuffle(rng(seed), BINTIK).slice(0, n).map((c2) => ({ k: "circ", c: c2, r: 5.5, fill: "b" }))];
  function seriP3Bintik(s2, raw, c2) {
    const b0 = s2.bintik, n = (i) => b0 + i, cel = raw.map((f, i) => selBintik(f, n(i), 50 + i));
    const K = { t: s2.t, n: n(5) }, fig = (x) => selBintik(ap(x.t, c2), x.n, 90 + x.n), jawab = fig(K);
    const ubah = [
      ...kandidat(s2.t).filter(([u]) => u !== s2.t && sig(ap(u, c2)) !== sig(ap(s2.t, c2))).slice(0, 3).map(([u, why]) => ({ grup: 0, ke: (x) => ({ ...x, t: u }), isi: `gambar (3) ${T_NAME[u]}`, nama: why })),
      { grup: 1, ke: (x) => ({ ...x, n: n(4) }), isi: `bintiknya ${n(4)}, sama dengan gambar (5)`, nama: "lupa menambah bintik" },
      { grup: 1, ke: (x) => ({ ...x, n: n(6) }), isi: `bintiknya ${n(6)}`, nama: "salah hitung lebih satu" },
      { grup: 1, ke: (x) => ({ ...x, n: n(2) }), isi: `bintiknya ${n(2)}, disalin dari gambar (3)`, nama: "bintik ikut pola selang tiga, padahal bintik bertambah satu tiap langkah" }
    ];
    const attr = (x) => [x.t, String(x.n)];
    const salah = pilih(attr(K), jawab, calonDari(K, ubah, attr, fig, (x) => x.n <= BINTIK.length), b0 * 11 + s2.bentuk.length);
    const { opts, gugur } = pasang(jawab, salah, s2.key);
    return {
      sub_type: "FIG-SERI-P3",
      tier: s2.tier,
      ...SERI,
      key: s2.key,
      opts,
      siluet: s2.siluet,
      ciri: ciriDari(s2.bentuk, "seri6-bintik"),
      stemSvg: layout([[...cel, null]], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30 }),
      pembahasan: teks({
        tanya: "gambar (6). Ada dua hal yang berubah, dan keduanya punya irama sendiri.",
        cara: ["Bentuk besar (1), (2), (3) berbeda semua, jadi bentuk besar dibandingkan selang tiga: (1) dengan (4), (2) dengan (5).", `Keduanya ${T_NAME[s2.t]}, jadi bentuk besar di (6) = bentuk (3) yang ${T_NAME[s2.t]}.`, `Bintik dihitung berurutan: ${[0, 1, 2, 3, 4].map(n).join(", ")}. Bertambah satu setiap langkah, jadi gambar (6) punya ${n(5)} bintik.`, "Letak bintik berpindah-pindah; yang dihitung hanya jumlahnya."],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} satu-satunya yang bentuk besarnya ${T_NAME[s2.t]} dari gambar (3) dan bintiknya ${n(5)}.`,
        analogi: "Seperti jadwal piket tiga hari yang berulang, sementara tanggal di kalender tetap maju satu hari setiap hari.",
        jebakan: "Setelah menemukan pola selang tiga, banyak orang ikut menerapkannya pada bintik. Bintik punya irama sendiri: maju satu setiap langkah."
      }),
      pbhSvg: layout([[...cel, jawab]], { size: 96, gap: 12, hl: [0, 5], ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30, foot: [`Bentuk besar (1)\u2192(4), (2)\u2192(5), (3)\u2192(6): ${T_NAME[s2.t]}`, `Bintik: ${[0, 1, 2, 3, 4, 5].map(n).join(", ")}`] })
    };
  }
  function seriP3(s2) {
    const [a, b, c2] = s2.bentuk.map((n) => BENTUK[n]);
    const raw = [a, b, c2, ap(s2.t, a), ap(s2.t, b)];
    T_ALL.forEach((u) => {
      if (u !== s2.t) shim_assert_default.ok(sig(ap(u, a)) !== sig(raw[3]) || sig(ap(u, b)) !== sig(raw[4]), "aturan seri tidak tunggal");
    });
    if (s2.bintik !== void 0) {
      cekBedaObjek(s2.bentuk, "FIG-SERI-P3");
      return seriP3Bintik(s2, raw, c2);
    }
    const rupa = s2.rupa ?? RUPA, row = raw.map((f, i) => beri(rupa[i % 3], f)), jawab = beri(rupa[2], ap(s2.t, c2));
    const { opts, gugur } = pasang(jawab, pengecohT(s2.t, c2, rupa[2]), s2.key);
    return {
      sub_type: "FIG-SERI-P3",
      tier: s2.tier,
      ...SERI,
      key: s2.key,
      opts,
      stemSvg: layout([[...row, null]], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30 }),
      pembahasan: teks({
        tanya: "gambar (6), lanjutan dari pola selang tiga.",
        cara: ["Bentuk (1), (2), (3) berbeda semua, jadi jangan membandingkan gambar yang bersebelahan.", `Bandingkan (1) dengan (4) dan (2) dengan (5). Keduanya ${T_NAME[s2.t]}.`, `Gambar (6) = gambar (3) yang ${T_NAME[s2.t]}.`],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} adalah gambar (3) yang ${T_NAME[s2.t]}, sama dengan perubahan (1)\u2192(4) dan (2)\u2192(5).`,
        analogi: "Seperti jadwal piket tiga hari: hari keempat mengulang hari pertama, hari keenam mengulang hari ketiga.",
        jebakan: isMirror(s2.t) ? "Dicermin dan diputar 180\xB0 sering terlihat mirip. Cek satu ujung bentuk: pada cermin, ujung itu tetap di sisi yang sama." : "Arah putar sering terbalik. Ikuti satu ujung bentuk dari (1) ke (4), lalu arahkan ujung yang sama di gambar (3)."
      }),
      pbhSvg: layout([[...row, jawab]], { size: 96, gap: 12, hl: [0, 5], ann: (at, sz) => nomor(at, sz, 6), extra: () => "", extraH: 30, foot: [`(1)\u2192(4), (2)\u2192(5), (3)\u2192(6): ${T_NAME[s2.t]}`] })
    };
  }
  var SKALA4 = [0.48, 0.32, 0.42, 0.3];
  var SERI_KUADRAN = [
    { tier: 2, key: "B", bentuk: ["daun", "koma", "sulur", "bulu"], arah: 1, khusus: 1, t: "mkk" },
    { tier: 3, key: "E", bentuk: ["ombak", "kait", "zigzag", "daun"], arah: -1, khusus: 2, t: "r90" },
    { tier: 3, key: "D", bentuk: ["kucing", "kail", "gasing", "layang"], arah: 1, khusus: 3, t: "mkk" },
    { tier: 3, key: "C", bentuk: ["molekul3", "ikalg", "lekuk4", "panahlengkung"], arah: -1, khusus: 0, t: "r90" }
  ];
  function kuadran(s2, langkah, o = {}) {
    const arah = o.arah ?? s2.arah, pos = [0, 1, 2, 3].map((i) => ((i + arah * langkah) % 4 + 4) % 4);
    if (o.tukar) {
      const [x, y] = [0, 1, 2, 3].filter((i) => i !== s2.khusus).slice(0, 2);
      [pos[x], pos[y]] = [pos[y], pos[x]];
    }
    return s2.bentuk.flatMap((n, i) => {
      let f = BENTUK[n];
      if (i === s2.khusus) {
        const u = o.ubah !== void 0 ? o.ubah : s2.t === "mkk" ? langkah % 2 ? "mkk" : "tetap" : ["tetap", "r90", "r180", "r270"][langkah % 4];
        if (u) f = ap(u, f);
      }
      return beri((s2.rupa ?? RUPA)[i], geser(f, SLOT[4][pos[i]], SKALA4[i]));
    });
  }
  function seriKuadran(s2) {
    cekKecil(s2.bentuk, SKALA4);
    const Q = 3, frames = [0, 1, 2, 3, 4].map((t) => kuadran(s2, t)), kunci = frames[Q];
    frames.slice(0, Q).concat(frames.slice(Q + 1)).forEach((f) => shim_assert_default.notEqual(sig(f), sig(kunci), "jawaban sama dengan gambar yang terlihat"));
    const nk = s2.bentuk[s2.khusus];
    const uK = s2.t === "mkk" ? Q % 2 ? "mkk" : "tetap" : ["tetap", "r90", "r180", "r270"][Q % 4];
    const K = { arah: s2.arah, ubah: uK, tukar: false };
    const ubahK = s2.t === "mkk" ? [["tetap", `${nk} tidak ikut berubah`, `lupa mencermin ${nk}`], ["mab", `${nk} dicermin atas-bawah`, "salah arah cermin"]] : [["tetap", `${nk} tidak ikut berubah`, `lupa memutar ${nk}`], ["r90", `${nk} diputar ke arah yang salah`, "salah arah putar"], ["r180", `${nk} baru diputar dua kali`, "kurang satu langkah putaran"]];
    const ubah = [
      { grup: 0, ke: (x) => ({ ...x, arah: -s2.arah }), isi: "objek bergerak ke arah sebaliknya", nama: "salah arah perpindahan" },
      ...ubahK.filter(([u]) => u !== uK).map(([u, isi, nama]) => ({ grup: 1, ke: (x) => ({ ...x, ubah: u }), isi, nama })),
      { grup: 2, ke: (x) => ({ ...x, tukar: true }), isi: "dua objek lain bertukar tempat", nama: "urutan objek ikut berubah" }
    ];
    const attrK = (x) => [String(x.arah), x.ubah, String(x.tukar)];
    const salah = pilih(attrK(K), kunci, calonDari(K, ubah, attrK, (x) => kuadran(s2, Q, x), () => true), s2.khusus * 13 + s2.bentuk.length);
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    return {
      sub_type: "FIG-SERI-KUADRAN",
      tier: s2.tier,
      ...SERI,
      key: s2.key,
      opts,
      stemSvg: layout([frames.map((f, i) => i === Q ? null : f)], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30 }),
      pembahasan: teks({
        tanya: "gambar (4) pada deret empat kuadran. Gambar (5) ikut membantu memastikan aturannya.",
        cara: [`Ikuti satu objek dulu, misalnya ${s2.bentuk[(s2.khusus + 1) % 4]}: ia pindah satu kotak ${s2.arah === 1 ? "searah" : "berlawanan arah"} jarum jam setiap langkah, begitu juga objek lain.`, `Lalu periksa bentuk tiap objek. Hanya ${nk} yang berubah: ${s2.t === "mkk" ? "dicermin kiri-kanan bolak-balik" : "berputar 90\xB0 searah jarum jam"} setiap langkah.`, `Di gambar (4), ${nk} berada di kotak ${KUADRAN[((s2.khusus + Q * s2.arah) % 4 + 4) % 4]}.`],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} memenuhi dua aturan sekaligus: posisi semua objek dan bentuk ${nk}.`,
        analogi: "Seperti empat orang yang berjalan memutari meja, lalu satu di antaranya membalikkan topinya setiap kali melangkah.",
        jebakan: "Opsi yang posisinya benar belum tentu jawaban. Periksa bentuk setiap objek satu per satu."
      }),
      pbhSvg: layout([frames], { size: 96, gap: 12, hl: [0, Q], ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30, foot: [`Semua objek pindah 1 kotak ${s2.arah === 1 ? "searah" : "berlawanan arah"} jarum jam`, `${nk}: ${s2.t === "mkk" ? "dicermin bolak-balik" : "berputar 90\xB0 tiap langkah"}`] })
    };
  }

  // src/tiu-fig-ana-mtx.ts
  var ANALOGI = { instruksi: "Perhatikan hubungan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var POLA2 = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var lawan = (t) => ({ tetap: "mkk", r90: "r270", r270: "r90", r180: "tetap", mkk: "mab", mab: "mkk", md1: "md2", md2: "md1" })[t];
  var pecah = (o) => [o.split("+")[0], o.endsWith("+warna")];
  var apOp = (o, f) => {
    const [t, w] = pecah(o);
    const g = ap(t, f);
    return w ? balikWarna(g) : g;
  };
  var invOp = (o) => {
    const [t, w] = pecah(o);
    return w ? `${inv(t)}+warna` : inv(t);
  };
  var OP_ALL = T_ALL.flatMap((t) => [t, `${t}+warna`]);
  var namaOp = (o) => {
    const [t, w] = pecah(o);
    return w ? t === "tetap" ? "hanya dibalik warnanya" : `${T_NAME[t]} lalu dibalik warnanya` : T_NAME[t];
  };
  var ANA_OBJ = [
    { tier: 2, key: "C", a: ["daun", "sulur"], c: ["kait", "koma"], ts: ["mkk", "mab"], q: 3 },
    { tier: 3, key: "A", a: ["ombak", "pucuk", "zigzag"], c: ["sulur", "daun", "koma"], ts: ["r90", "tetap", "mkk"], q: 1 },
    { tier: 3, key: "D", a: ["kait", "kawung", "koma"], c: ["pucuk", "ombak", "sulur"], ts: ["mab", "r180", "tetap"], q: 2 },
    { tier: 3, key: "B", a: ["biji", "parang", "bulu"], c: ["daun", "pucuk", "kawung"], ts: ["tetap+warna", "mab", "tetap+warna"], q: 3 },
    { tier: 3, key: "E", a: ["tunas", "koma", "biji"], c: ["ombak", "kait", "parang"], ts: ["mab", "tetap", "mkk+warna"], q: 1, tukar: [1, 2] },
    { tier: 3, key: "A", a: ["kura", "palu", "kail"], c: ["payung", "kunci", "ikan"], ts: ["r90", "mab", "tetap+warna"], q: 3 },
    { tier: 3, key: "B", a: ["spiral7", "molekul3", "tetes"], c: ["ikal2", "lekuk5", "molekul4"], ts: ["mkk", "r270", "mab"], q: 2 },
    { tier: 3, key: "B", a: ["tetes", "ikalg", "gelombangtinta"], c: ["sabitgerigi", "kelopak3", "panahlengkung"], ts: ["r90", "mab+warna", "mkk"], q: 1, tukar: [0, 2], siluet: true }
  ];
  function anaObj(s2) {
    const n = s2.a.length, T0 = s2.siluet ? PETAK[n][s2.petak ?? 0] : TATA[n];
    if (!s2.siluet) [s2.a, s2.c].forEach((x) => cekKecil(x, T0.map((t) => t[1])));
    const rupa = s2.a.map((_, i) => s2.rupa?.[i] ?? (pecah(s2.ts[i])[1] || s2.siluet ? "hitam" : RUPA[i]));
    s2.ts.forEach((o, i) => shim_assert_default.ok(!(pecah(o)[1] && rupa[i] === "arsir"), "objek yang dibalik warnanya tidak boleh berarsir"));
    if (s2.siluet) [s2.a, s2.c].forEach((x) => cekBedaObjek(x, "FIG-ANA-OBJ"));
    if (s2.siluet) s2.ts.forEach((o, i) => pecah(o)[1] && [s2.a[i], s2.c[i]].forEach((x) => shim_assert_default.ok(tebal(BENTUK[x]) >= TEBAL_MIN, `${x} terlalu tipis untuk dibalik warnanya`)));
    if (s2.tukar) {
      const [u, v] = [T0[s2.tukar[0]][1], T0[s2.tukar[1]][1]];
      shim_assert_default.ok(Math.abs(u - v) / Math.max(u, v) <= 0.15, "tukar hanya antar-objek yang ukurannya mirip");
    }
    const tempat = (hasil2) => {
      const p2 = T0.map((x) => x[0]);
      if (hasil2 && s2.tukar) {
        const [i, j] = s2.tukar;
        [p2[i], p2[j]] = [p2[j], p2[i]];
      }
      return p2.map((q, i) => [q, T0[i][1]]);
    };
    const cel = (names, ops) => tata(names.map((x, i) => ops ? apOp(ops[i], BENTUK[x]) : BENTUK[x]), rupa, "tetap", tempat(!!ops));
    const sel = [cel(s2.a), cel(s2.a, s2.ts), cel(s2.c), cel(s2.c, s2.ts)];
    const contoh2 = s2.q < 2 ? s2.c : s2.a;
    contoh2.forEach((x, i) => shim_assert_default.equal(OP_ALL.filter((u) => sig(apOp(u, BENTUK[x])) === sig(apOp(s2.ts[i], BENTUK[x]))).length, 1, "aturan objek tidak tunggal"));
    const dasar = s2.q < 2 ? s2.a : s2.c, keDepan = s2.q % 2 === 1;
    const posisi = s2.siluet ? NAMA_PETAK[n][s2.petak ?? 0] : n === 2 ? ["besar", "kecil"] : ["besar", "kecil kanan atas", "kecil kanan bawah"];
    const sebutO = (j) => s2.siluet ? `objek ${posisi[j]}` : dasar[j];
    const figO = (x) => tata(dasar.map((nm, i) => keDepan ? apOp(x.ops[i], BENTUK[nm]) : apOp(invOp(x.ops[i]), apOp(s2.ts[i], BENTUK[nm]))), rupa, "tetap", tempat(keDepan !== x.salahTempat));
    const K = { ops: [...s2.ts], salahTempat: false };
    const salahUbah = [
      [(o) => {
        const [t, w] = pecah(o);
        return w ? t : `${t}+warna`;
      }, "salah soal balik warna"],
      [(o) => {
        const [t, w] = pecah(o);
        return w ? `${lawan(t)}+warna` : lawan(t);
      }, "salah arah putar atau cermin"],
      [(o) => {
        const [t, w] = pecah(o);
        return w ? `${comp(t, "mkk")}+warna` : comp(t, "mkk");
      }, "ikut dicermin kiri-kanan"],
      [() => "tetap", "objeknya dibiarkan tidak berubah"],
      [invOp, "arah perubahannya terbalik"]
    ];
    const ubah = [];
    dasar.forEach((nm, j) => {
      const pakai = /* @__PURE__ */ new Set([s2.ts[j]]);
      for (const [f, nama] of salahUbah) {
        const u = f(s2.ts[j]);
        if (pakai.has(u) || rupa[j] === "arsir" && pecah(u)[1]) continue;
        pakai.add(u);
        const nm2 = u === "tetap" ? "objeknya dibiarkan tidak berubah" : nama;
        ubah.push({ grup: j, ke: (x) => ({ ...x, ops: x.ops.map((o, i) => i === j ? u : o) }), isi: `${sebutO(j)} ${namaOp(u)} (harusnya ${namaOp(s2.ts[j])})`, nama: nm2 });
      }
    });
    if (s2.tukar) ubah.push({ grup: n, ke: (x) => ({ ...x, salahTempat: true }), isi: `${sebutO(s2.tukar[0])} dan ${sebutO(s2.tukar[1])} ada di tempat yang salah`, nama: "salah menerapkan tukar tempat" });
    const attrO = (x) => s2.tukar ? [...x.ops, String(x.salahTempat)] : [...x.ops];
    const salah = pilih(attrO(K), sel[s2.q], calonDari(K, ubah, attrO, figO, () => true), n * 7 + s2.q);
    const { opts, gugur } = pasang(sel[s2.q], salah, s2.key);
    const grid = sel.map((f, i) => i === s2.q ? null : f);
    const adaWarna = s2.ts.some((o) => pecah(o)[1]);
    return {
      sub_type: "FIG-ANA-OBJ",
      tier: s2.tier,
      ...ANALOGI,
      key: s2.key,
      opts,
      siluet: s2.siluet,
      ciri: ciriDari([...s2.a, ...s2.c], `petak${n}-${s2.petak ?? 0}`),
      stemSvg: layout([grid], { size: 104, gap: 40, seps: [":", "=", ":"] }),
      pembahasan: teks({
        tanya: `gambar (${s2.q + 1}) supaya hubungan (1):(2) sama dengan (3):(4).`,
        cara: [`Lihat pasangan yang lengkap, (${s2.q < 2 ? "3):(4" : "1):(2"}). Periksa setiap objek sendiri-sendiri, jangan sekaligus.`, ...posisi.map((p2, i) => `Objek ${p2}: ${namaOp(s2.ts[i])}.`), ...s2.tukar ? [`Selain itu, objek ${posisi[s2.tukar[0]]} dan ${posisi[s2.tukar[1]]} bertukar tempat.`] : [], keDepan ? "Terapkan perubahan yang sama ke setiap objek di sel lawannya." : "Karena tanda tanya ada di sebelah kiri, balik perubahannya: mulai dari gambar kanan lalu kembalikan setiap objek."],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} satu-satunya gambar yang setiap objeknya berubah persis seperti pasangan contoh${s2.tukar ? ", termasuk tempatnya" : ""}.`,
        analogi: adaWarna ? "Seperti foto dan klisenya: bentuknya sama, terang dan gelapnya bertukar." : "Seperti resep untuk tiga bahan: tiap bahan punya perlakuannya sendiri, ada yang dipotong, ada yang dibiarkan utuh.",
        jebakan: adaWarna ? "Mata cepat menangkap perubahan warna lalu lupa memeriksa arah bentuknya. Cek dua hal itu di setiap objek." : "Opsi yang salah hanya keliru di satu objek. Kalau kamu berhenti setelah objek pertama cocok, kamu bisa terkecoh."
      }),
      pbhSvg: layout([sel], { size: 104, gap: 40, seps: [":", "=", ":"], hl: [0, s2.q], foot: posisi.map((p2, i) => `Objek ${p2}: ${namaOp(s2.ts[i])}`) })
    };
  }
  var MTX_PUTAR = [
    { tier: 2, key: "B", bentuk: ["koma", "daun", "kait"], arah: "kolom", t1: "r90", t2: "mab" },
    { tier: 3, key: "E", bentuk: ["sulur", "zigzag", "pucuk"], arah: "kolom", t1: "mkk", t2: "r270", sudut: true },
    { tier: 3, key: "C", bentuk: ["ombak", "kawung", "daun"], arah: "baris", t1: "r90", t2: "r90" },
    { tier: 3, key: "A", bentuk: ["kupu", "palu", "kura"], arah: "kolom", t1: "mkk", t2: "r90" },
    { tier: 3, key: "E", bentuk: ["spiral9", "molekul5", "ikal3"], arah: "baris", t1: "r90", t2: "mkk" },
    { tier: 3, key: "A", bentuk: ["lidahapi", "sulurpojok", "ikalganda"], arah: "kolom", t1: "r90", t2: "mab", sudut: true, siluet: true }
  ];
  var POJOK = [[-38, -38], [38, -38], [38, 38], [-38, 38]];
  var titik = (k) => [{ k: "circ", c: POJOK[k], r: 5, fill: "b" }];
  function mtxPutar(s2) {
    const ubah = (i, a, b) => i === 0 ? [] : i === 1 ? [a] : [a, b];
    const rupa = s2.rupa ?? (s2.siluet ? HITAM : RUPA);
    const selOf = (r, c2, a = s2.t1, b = s2.t2, k, lebih = "tetap") => {
      const [j, i] = s2.arah === "kolom" ? [r, c2] : [c2, r];
      const f = beri(rupa[j], ap(lebih, ubah(i, a, b).reduce((g, t) => ap(t, g), geser(ap(s2.awal?.[j] ?? "tetap", BENTUK[s2.bentuk[j]]), [0, 0], s2.sudut ? 0.72 : 0.9))));
      return s2.sudut ? [...f, ...titik(k ?? (r + c2) % 4)] : f;
    };
    const grid = [0, 1, 2].map((r) => [0, 1, 2].map((c2) => selOf(r, c2)));
    const kunci = grid[2][2];
    for (const a of T_ALL) for (const b of T_ALL) {
      const ok = [0, 1, 2].every((r) => [0, 1, 2].every((c2) => r === 2 && c2 === 2 || sig(selOf(r, c2, a, b)) === sig(grid[r][c2])));
      if (ok) shim_assert_default.equal(sig(selOf(2, 2, a, b)), sig(kunci), "matriks punya tafsir lain dengan jawaban berbeda");
    }
    const kiri = s2.arah === "kolom" ? grid[2][1] : grid[1][2];
    const cand = [
      [selOf(2, 2, s2.t1, "tetap"), "langkah kedua tidak dikerjakan", `padahal langkah kedua ${T_NAME[s2.t2]}`],
      [selOf(2, 2, "tetap", "tetap"), "bentuk dianggap kembali ke posisi awal", "padahal perubahan terus berlanjut sampai sel terakhir"],
      [selOf(2, 2, s2.t1, lawan(s2.t2)), `langkah kedua ${T_NAME[lawan(s2.t2)]}`, `padahal langkah kedua ${T_NAME[s2.t2]}`],
      [selOf(2, 2, inv(s2.t1) === s2.t1 ? lawan(s2.t1) : inv(s2.t1), s2.t2), "langkah pertama salah arah", `padahal langkah pertama ${T_NAME[s2.t1]}`],
      [kiri, "hanya menyalin sel sebelumnya", "padahal sel terakhir masih kena satu perubahan lagi"],
      [selOf(2, 2, s2.t1, s2.t2, void 0, "mkk"), "jawaban yang dicermin kiri-kanan", "bentuknya terbalik sisi"],
      [selOf(2, 2, s2.t1, s2.t2, void 0, s2.t2), "perubahan dikerjakan satu kali terlalu banyak", "sel terakhir cukup kena dua langkah"],
      [selOf(2, 2, s2.t1, s2.t2, void 0, "mab"), "jawaban yang dicermin atas-bawah", "bentuknya terbalik atas-bawah"]
    ];
    if (s2.sudut) cand.unshift([selOf(2, 2, s2.t1, s2.t2, 1), "bentuk benar, tetapi titik di pojok yang salah", `titik pindah satu pojok searah jarum jam, jadi berada di ${KUADRAN[0]}`]);
    const salah = [], seen = /* @__PURE__ */ new Set([sig(kunci)]);
    for (const [f, isi, alasan] of cand) if (!seen.has(sig(f)) && salah.length < 4) {
      seen.add(sig(f));
      salah.push({ fig: f, isi, alasan });
    }
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    const lewat = s2.arah === "kolom" ? ["kolom 1 ke kolom 2", "kolom 2 ke kolom 3"] : ["baris 1 ke baris 2", "baris 2 ke baris 3"];
    const sama = s2.t1 === s2.t2;
    return {
      sub_type: "FIG-MTX-PUTAR",
      tier: s2.tier,
      ...POLA2,
      key: s2.key,
      opts,
      siluet: s2.siluet,
      ciri: ciriDari(s2.bentuk, "tunggal-titik"),
      stemSvg: layout([grid[0], grid[1], [grid[2][0], grid[2][1], null]], { size: 100, gap: 8 }),
      pembahasan: teks({
        tanya: "sel kanan bawah matriks 3\xD73.",
        cara: [`Setiap ${s2.arah === "kolom" ? "baris" : "kolom"} memakai satu bentuk, jadi bandingkan sel dalam ${s2.arah === "kolom" ? "baris" : "kolom"} yang sama.`, sama ? `Dari ${lewat[0]} dan dari ${lewat[1]} bentuk sama-sama ${T_NAME[s2.t1]}.` : `Dari ${lewat[0]}: ${T_NAME[s2.t1]}. Dari ${lewat[1]}: ${T_NAME[s2.t2]}.`, "Cek aturan itu di dua deret yang lengkap sebelum dipakai ke deret yang ada tanda tanyanya.", ...s2.sudut ? ["Titik hitam punya aturan sendiri: pindah satu pojok searah jarum jam setiap sel."] : []],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} mengikuti ${sama ? "perubahan yang sama" : "kedua langkah perubahan"} sampai sel terakhir${s2.sudut ? ", dan titiknya ada di pojok yang benar" : ""}.`,
        analogi: "Seperti jarum jam yang terus maju: di jam ketiga jarumnya tidak kembali ke angka awal.",
        jebakan: sama ? "Banyak orang mengira bentuk di deret terakhir kembali tegak. Perubahan tetap berlanjut, jadi sel terakhir terputar dua kali." : "Cermin atas-bawah dan cermin kiri-kanan mudah tertukar. Ikuti satu ujung bentuk: pada cermin atas-bawah ujung itu pindah dari atas ke bawah."
      }),
      pbhSvg: layout(grid, { size: 100, gap: 8, hl: [2, 2], minW: 600, foot: sama ? [`Setiap langkah: ${T_NAME[s2.t1]}`] : [`Langkah 1: ${T_NAME[s2.t1]}`, `Langkah 2: ${T_NAME[s2.t2]}`] })
    };
  }

  // src/tiu-fig-baru.ts
  var BEDA2 = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };
  var POLA3 = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var ABC2 = (at, s2, n) => Array.from({ length: n }, (_, c2) => text(at(0, c2)[0], at(0, c2)[1] + s2 / 2 + 26, KEYS[c2], 22)).join("");
  var tandaUrut = (f) => draw(f, 0, 0);
  var BEDA_TUMPUK = [
    { tier: 3, key: "D", bentuk: ["daun", "biji", "pucuk", "kawung", "parang"], hiasan: "koma", seed: 31 },
    { tier: 3, key: "B", bentuk: ["bulu", "ombak", "biji", "daun", "pucuk"], hiasan: "tunas", seed: 32 },
    { tier: 3, key: "E", bentuk: ["molekul3", "molekul4b", "molekul3c", "molekul5c", "molekul3b"], hiasan: "parang", seed: 33, siluet: true }
  ];
  var SK = { lama: [0.62, 0.36], siluet: [0.72, 0.4] };
  function letakKecil(nama, [sb, sk] = SK.lama, target = 0.4) {
    const besar = tinta(geser(BENTUK[nama], [-6, -4], sb)), calon = [];
    for (let x = -28; x <= 28; x += 4) for (let y = -28; y <= 28; y += 4) {
      const k = [...tinta(geser(BENTUK[nama], [x, y], sk))], tutup = k.filter((q) => besar.has(q)).length / k.length;
      if (tutup >= 0.2 && tutup <= 0.7) calon.push([[x, y], Math.abs(tutup - target) * 60 + Math.hypot(x - 16, y - 14)]);
    }
    shim_assert_default.ok(calon.length, `${nama}: tidak ada letak bentuk kecil yang menempel sebagian`);
    return calon.sort((p2, q) => p2[1] - q[1])[0][0];
  }
  function tumpuk(nama, hiasan, depan, ukur, rot, siluet2 = false) {
    const [sb, sk] = SK[siluet2 ? "siluet" : "lama"], g = geser(BENTUK[nama], [-6, -4], sb);
    const besar = siluet2 ? balikWarna(g) : arsir(g), kecil = geser(BENTUK[nama], letakKecil(nama, [sb, sk], siluet2 ? 0.25 : 0.4), sk).filter((q) => !siluet2 || q.fill === "b");
    const h1 = geser(ap(rot, BENTUK[hiasan]), [-34, 34], ukur[0]), h2 = geser(ap(rot, BENTUK[hiasan]), [34, -34], ukur[1]);
    const tb = tinta([...g, ...kecil]);
    [h1, h2].forEach((h) => tinta(h).forEach((q) => shim_assert_default.ok(!tb.has(q), `${nama}: hiasan pojok menempel bentuk tengah`)));
    return [...h1, ...h2, ...depan ? [...besar, ...kecil] : [...kecil, ...besar]];
  }
  function bedaTumpukS(s2) {
    const r = rng(s2.seed), ki = KEYS.indexOf(s2.key), rot = pick(r, ["tetap", "r90", "r270"]);
    const SAMA = [[0.24, 0.24], [0.3, 0.3]], BEDA_U = [[0.2, 0.34], [0.34, 0.2], [0.18, 0.3], [0.3, 0.18]];
    const depanK = r() < 0.5, depan = shuffle(r, [true, true, false, false]);
    const ciriOpsi = s2.bentuk.map((_, i) => i === ki ? { depan: depanK, sama: depanK ? false : true } : (() => {
      const d = depan[i < ki ? i : i - 1];
      return { depan: d, sama: d };
    })());
    const figs = s2.bentuk.map((n, i) => tumpuk(n, s2.hiasan, ciriOpsi[i].depan, pick(r, ciriOpsi[i].sama ? SAMA : BEDA_U), rot, true));
    const kata = (c2) => `bentuk hitam kecil ada di ${c2.depan ? "depan" : "belakang"} dan dua hiasan pojoknya ${c2.sama ? "sama besar" : "beda ukuran"}`;
    const salah = figs.flatMap((f, i) => i === ki ? [] : [{ fig: f, isi: kata(ciriOpsi[i]), alasan: "pasangannya cocok dengan aturan" }]);
    const { opts, gugur } = pasang(figs[ki], salah, s2.key, tandaUrut);
    return {
      sub_type: "FIG-BEDA-TUMPUK",
      tier: s2.tier,
      ...BEDA2,
      key: s2.key,
      opts,
      stemSvg: "",
      siluet: true,
      ciri: ciriDari([...s2.bentuk, s2.hiasan], "tumpuk"),
      pembahasan: teks({
        tanya: "satu gambar yang aturannya berbeda dari empat gambar lain.",
        cara: ["Bentuk di tengah berbeda di setiap gambar, jadi bentuk bukan petunjuknya.", "Catat dua ciri di setiap gambar: bentuk hitam kecil ada di depan atau di belakang bentuk bergaris, dan dua hiasan pojok sama besar atau tidak.", "Satu ciri saja tidak cukup, karena keduanya muncul di beberapa gambar. Lihat pasangannya: di empat gambar, bila hitam di depan, hiasannya sama besar; bila hitam di belakang, hiasannya beda ukuran."],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key}: ${kata(ciriOpsi[ki])}. Pasangan ini melanggar aturan yang berlaku di empat gambar lain.`,
        analogi: "Seperti aturan lampu lalu lintas: merah selalu berpasangan dengan berhenti. Yang salah bukan warnanya, tetapi pasangan warna dan tindakannya.",
        jebakan: "Gambar yang hitamnya di depan terlihat paling mencolok, tetapi ada beberapa gambar seperti itu. Yang dicari pasangan yang tidak cocok."
      }),
      pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC2(at, sz, 5), extra: () => "", extraH: 34, foot: ["Aturan: hitam di depan = hiasan sama besar; di belakang = beda ukuran", `Opsi ${s2.key}: ${depanK ? "di depan, tetapi hiasan beda ukuran" : "di belakang, tetapi hiasan sama besar"}`] })
    };
  }
  function bedaTumpuk(s2) {
    if (s2.siluet) return bedaTumpukS(s2);
    const r = rng(s2.seed), ki = KEYS.indexOf(s2.key);
    shim_assert_default.equal(new Set(s2.bentuk).size, 5, "bentuk tengah tiap opsi harus beda (bentuk = bukan aturan)");
    const rot = pick(r, ["tetap", "r90", "r270"]);
    const figs = s2.bentuk.map((n, i) => {
      const beda2 = pick(r, [[0.2, 0.34], [0.34, 0.2], [0.18, 0.3], [0.3, 0.18]]);
      return i === ki ? tumpuk(n, s2.hiasan, true, [0.27, 0.27], rot) : tumpuk(n, s2.hiasan, false, beda2, rot);
    });
    const salah = figs.filter((_, i) => i !== ki).map((f) => ({ fig: f, isi: "bentuk hitam kecil ada di belakang dan dua hiasan pojoknya beda ukuran", alasan: "sama dengan tiga opsi lain" }));
    const { opts, gugur } = pasang(figs[ki], salah, s2.key, tandaUrut);
    return {
      sub_type: "FIG-BEDA-TUMPUK",
      tier: s2.tier,
      ...BEDA2,
      key: s2.key,
      opts,
      stemSvg: "",
      pembahasan: teks({
        tanya: "satu gambar yang aturannya berbeda dari empat gambar lain.",
        cara: ["Bentuk di tengah berbeda di setiap gambar, jadi bentuk bukan petunjuknya.", "Bandingkan dua ciri yang muncul di semua gambar: bentuk hitam kecil ada di depan atau di belakang bentuk berarsir, dan dua hiasan pojok sama besar atau tidak."],
        gugur,
        key: s2.key,
        alasan: `Hanya opsi ${s2.key} yang bentuk hitam kecilnya ada di depan dan dua hiasan pojoknya sama besar.`,
        analogi: "Seperti lima kartu remi bergambar beda: yang kamu cari bukan gambarnya, tetapi kartu yang dicetak dengan cara lain.",
        jebakan: "Mata langsung tertuju pada bentuk tengah yang paling unik. Bentuk tengah memang dibuat berbeda semua, jadi itu bukan aturannya."
      }),
      pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC2(at, sz, 5), extra: () => "", extraH: 34, foot: ["Empat gambar: hitam kecil di belakang, hiasan pojok beda ukuran", `Opsi ${s2.key}: hitam kecil di depan, hiasan pojok sama besar`] })
    };
  }
  var MTX_HITUNG = [
    { tier: 3, key: "C", cabang: 4, tambahBaris: 1, kecil: 1, kecilBaris: 2, seed: 41 },
    // Desain dipertahankan (putusan Gusti 2026-10-28); versi siluet hanya melepas garis tepi.
    { tier: 3, key: "B", cabang: 3, tambahBaris: 1, kecil: 2, kecilBaris: 2, seed: 44, siluet: true }
  ];
  var PINGGIR = [[-38, -38], [0, -40], [38, -38], [40, 0], [38, 38], [0, 40], [-38, 38], [-40, 0], [-20, -40], [20, 40], [40, -20], [-40, 20]];
  function selHitung(nc, nk, seed, siluet2 = false, pusat, kecilB) {
    const r = rng(seed), kecil = kecilB ?? (siluet2 ? ["koma", "kait", "zigzag"] : ["koma", "biji", "kait"]);
    const tempat = shuffle(r, PINGGIR).slice(0, nk);
    return [...pusat ? muat(buatHitung(pusat, nc, seed), [0, 0], 66) : geser(gumpal(nc, seed), [0, 0], 0.9), ...tempat.flatMap((p2) => r() < 0.4 ? [{ k: "circ", c: p2, r: 4.5, fill: "b" }] : geser(ap(pick(r, ["tetap", "r90", "r180"]), BENTUK[pick(r, kecil)]), p2, 0.13))];
  }
  function mtxHitung(s2) {
    const [o, u] = s2.pusat ? HITUNG_JENIS[s2.pusat].nama : ["gumpal", "cabang"];
    const nc = (r, c2) => s2.cabang + r * s2.tambahBaris + c2, nk = (r, c2) => s2.kecil + r * s2.kecilBaris + c2;
    shim_assert_default.equal(nc(2, 2), nc(1, 2) + (nc(1, 2) - nc(0, 2)), "hitungan cabang tidak konsisten antar-arah");
    shim_assert_default.equal(nk(2, 2), nk(1, 2) + (nk(1, 2) - nk(0, 2)), "hitungan objek kecil tidak konsisten antar-arah");
    shim_assert_default.ok(nk(2, 2) <= PINGGIR.length && nc(2, 2) <= 9, "terlalu banyak untuk satu sel");
    const grid = [0, 1, 2].map((r) => [0, 1, 2].map((c2) => selHitung(nc(r, c2), nk(r, c2), s2.seed + r * 3 + c2, s2.siluet, s2.pusat, s2.kecilBentuk)));
    const C = nc(2, 2), K = nk(2, 2), cari = (a, b, sd) => selHitung(a, b, s2.seed + 100 + sd, s2.siluet, s2.pusat, s2.kecilBentuk);
    const kunci = cari(C, K, 0);
    const ubah = [
      ...[[-1, "kurang satu"], [1, "lebih satu"], [2, "lebih dua"]].flatMap(([d, kata]) => [
        { grup: 0, ke: (x) => ({ ...x, c: C + d }), isi: `${u} ${C + d} (harusnya ${C})`, nama: `hitungan ${u} ${kata}` },
        { grup: 1, ke: (x) => ({ ...x, k: K + d }), isi: `objek kecil ${K + d} (harusnya ${K})`, nama: `hitungan objek kecil ${kata}` }
      ])
    ];
    const attrH = (x) => [String(x.c), String(x.k)];
    const salah = pilih(attrH({ c: C, k: K }), kunci, calonDari({ c: C, k: K }, ubah, attrH, (x) => cari(x.c, x.k, x.c * 20 + x.k), (x) => x.c >= (s2.pusat ? HITUNG_JENIS[s2.pusat].batas[0] : 3) && x.c <= (s2.pusat ? HITUNG_JENIS[s2.pusat].batas[1] : 9) && x.k <= PINGGIR.length), s2.seed);
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    const tulis = (r, c2) => `${nc(r, c2)}/${nk(r, c2)}`;
    return {
      sub_type: "FIG-MTX-HITUNG",
      tier: s2.tier,
      ...POLA3,
      key: s2.key,
      opts,
      siluet: s2.siluet,
      ciri: ciriDari(s2.kecilBentuk ?? ["koma", "kait", "zigzag"], "hitung", [s2.pusat ?? "gumpal"]),
      stemSvg: layout([grid[0], grid[1], [grid[2][0], grid[2][1], null]], { size: 100, gap: 8 }),
      pembahasan: teks({
        tanya: "sel kanan bawah. Bentuk dan letak objek kecil diacak, jadi yang dihitung hanya jumlahnya.",
        cara: [`Hitung dua hal di setiap sel: ${u} ${o} di tengah dan objek kecil di pinggir.`, `Baris 1: ${tulis(0, 0)}, ${tulis(0, 1)}, ${tulis(0, 2)} (${u}/objek kecil). Keduanya bertambah satu tiap kolom.`, `Baris 3 mulai dari ${tulis(2, 0)}, ${tulis(2, 1)}, jadi sel terakhir ${C} ${u} dan ${K} objek kecil.`, `Cek lewat kolom 3: ${tulis(0, 2)}, ${tulis(1, 2)}, lalu ${C}/${K}. Selisihnya tetap, hasilnya sama.`],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} satu-satunya yang punya ${C} ${u} dan ${K} objek kecil.`,
        analogi: "Seperti menghitung uang di dompet: bentuk koin dan letaknya tidak penting, jumlahnya yang dicek.",
        jebakan: "Objek kecil berbentuk macam-macam supaya kamu sibuk mencari pola bentuk. Hitung saja semuanya, apa pun bentuknya."
      }),
      pbhSvg: layout(grid.map((row, r) => row.map((f, c2) => r === 2 && c2 === 2 ? kunci : f)), {
        size: 100,
        gap: 8,
        hl: [2, 2],
        minW: 600,
        ann: (at, sz) => [0, 1, 2].flatMap((r) => [0, 1, 2].map((c2) => textC(at(r, c2)[0], at(r, c2)[1] + sz / 2 - 4, tulis(r, c2), 13, RED))).join(""),
        foot: [`Angka merah = ${u}/objek kecil`, "Keduanya +1 tiap kolom"]
      })
    };
  }

  // src/tiu-fig-ubah.ts
  var ANALOGI2 = { instruksi: "Perhatikan hubungan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var POLA4 = { instruksi: "Perhatikan pola gambar pada matriks berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var lawan2 = (t) => ({ tetap: "mkk", r90: "r270", r270: "r90", r180: "tetap", mkk: "mab", mab: "mkk", md1: "md2", md2: "md1" })[t];
  var ANA_UBAH = [
    { tier: 3, key: "D", a: [{ jenis: "lekuk", n: 3, seed: 7 }, { jenis: "bintang", n: 8, seed: 3 }, "ikal2"], c: [{ jenis: "lekuk", n: 4, seed: 11 }, { jenis: "bintang", n: 9, seed: 5 }, "molekul4"], dn: [2, -2], tukar: true, t: "mab", q: 1 },
    { tier: 3, key: "B", a: [{ jenis: "bintang", n: 5, seed: 8 }, { jenis: "lekuk", n: 6, seed: 2 }, "sulur"], c: [{ jenis: "bintang", n: 4, seed: 13 }, { jenis: "lekuk", n: 7, seed: 9 }, "ombak"], dn: [3, -2], tukar: false, t: "mkk", q: 3 },
    { tier: 3, key: "C", a: [{ jenis: "lekuk", n: 6, seed: 5 }, { jenis: "bintang", n: 5, seed: 6 }, "ikal3"], c: [{ jenis: "lekuk", n: 5, seed: 3 }, { jenis: "bintang", n: 7, seed: 9 }, "ikal2"], dn: [-2, 3], tukar: true, t: "mab", q: 3, siluet: true }
  ];
  var BATAS = { lekuk: [3, 8], bintang: [4, 10], ...Object.fromEntries(Object.entries(HITUNG_JENIS).map(([k, v]) => [k, v.batas])) };
  var NAMA_H = { lekuk: ["gumpal berkelopak", "kelopak"], bintang: ["bintang bercabang", "cabang"], ...Object.fromEntries(Object.entries(HITUNG_JENIS).map(([k, v]) => [k, v.nama])) };
  var ATAS = [[-23, -22], [23, -22]];
  var rupaH = (h, n) => h.jenis === "lekuk" ? lekuk(n, h.seed, 32, false) : h.jenis === "bintang" ? bintang(n, h.seed, false, 34, 0.32) : buatHitung(h.jenis, n, h.seed);
  var ATAS_S = [[-23, -21], [23, -21]];
  function gambarU(p2, s2, siluet2 = false) {
    if (!siluet2) return [...geser(rupaH(p2[0], s2.n[0]), ATAS[s2.tukar ? 1 : 0], 0.6), ...geser(rupaH(p2[1], s2.n[1]), ATAS[s2.tukar ? 0 : 1], 0.6), ...geser(ap(s2.t, BENTUK[p2[2]]), [0, 25], 0.68)];
    const isi = [muat(rupaH(p2[0], s2.n[0]), ATAS_S[s2.tukar ? 1 : 0], 42), muat(rupaH(p2[1], s2.n[1]), ATAS_S[s2.tukar ? 0 : 1], 42), muat(ap(s2.t, BENTUK[p2[2]]), [0, 26], 84, 34)];
    cekPisah(isi);
    return isi.flat();
  }
  function tafsir(sebelum, sesudah, x) {
    const out = /* @__PURE__ */ new Set([x + sesudah - sebelum]);
    if (sesudah % sebelum === 0 && sesudah !== sebelum) out.add(x * sesudah / sebelum);
    if (sebelum % sesudah === 0 && sesudah !== sebelum && x % (sebelum / sesudah) === 0) out.add(x / (sebelum / sesudah));
    return out;
  }
  function anaUbah(s2) {
    [0, 1].forEach((i) => shim_assert_default.equal(s2.a[i].jenis, s2.c[i].jenis, "objek ke-i harus sejenis di kedua pasangan"));
    shim_assert_default.notEqual(s2.a[0].jenis, s2.a[1].jenis, "dua objek atas harus beda jenis supaya tetap terlacak saat bertukar tempat");
    s2.dn.forEach((d) => shim_assert_default.ok(d !== 0, "jumlah kelopak/cabang harus berubah"));
    if (s2.siluet) shim_assert_default.ok(["mkk", "mab", "r180"].includes(s2.t), "gaya siluet: objek bawah selebar sel, jadi tidak boleh diputar 90\xB0");
    const awal = (p3) => ({ n: [p3[0].n, p3[1].n], tukar: false, t: "tetap" });
    const akhir = (p3) => ({ n: [p3[0].n + s2.dn[0], p3[1].n + s2.dn[1]], tukar: s2.tukar, t: s2.t });
    const P = [s2.a, s2.a, s2.c, s2.c], S = [awal(s2.a), akhir(s2.a), awal(s2.c), akhir(s2.c)];
    const sah = (p3, x) => [0, 1].every((i) => x.n[i] >= BATAS[p3[i].jenis][0] && x.n[i] <= BATAS[p3[i].jenis][1]);
    S.forEach((x, i) => shim_assert_default.ok(sah(P[i], x), "jumlah kelopak/cabang di luar batas yang masih bisa dihitung mata"));
    const [l0, l1] = s2.q === 1 ? [2, 3] : [0, 1], dasar = S[s2.q - 1], K = S[s2.q], p2 = P[s2.q];
    [0, 1].forEach((i) => shim_assert_default.deepEqual([...tafsir(S[l0].n[i], S[l1].n[i], dasar.n[i])], [K.n[i]], "jumlah punya tafsir lain"));
    const B = BENTUK[P[l0][2]];
    shim_assert_default.equal(T_ALL.filter((u) => sig(ap(u, B)) === sig(ap(s2.t, B))).length, 1, "perubahan objek bawah tidak tunggal");
    const sel = S.map((x, i) => gambarU(P[i], x, s2.siluet)), kunci = sel[s2.q];
    sel.forEach((f, i) => i === s2.q || shim_assert_default.notEqual(sig(f), sig(kunci), "jawaban sama dengan gambar yang terlihat"));
    const ubah = [];
    [0, 1].forEach((i) => {
      const nm = NAMA_H[p2[i].jenis][1], ganti = (v) => (x) => ({ ...x, n: i === 0 ? [v, x.n[1]] : [x.n[0], v] });
      const pakai = /* @__PURE__ */ new Set([K.n[i]]);
      const coba = (v, isi, nama) => {
        if (!pakai.has(v)) {
          pakai.add(v);
          ubah.push({ grup: i, ke: ganti(v), isi, nama });
        }
      };
      coba(dasar.n[i] - s2.dn[i], `ada ${dasar.n[i] - s2.dn[i]} ${nm} (harusnya ${K.n[i]})`, `arah hitung ${nm} terbalik`);
      coba(dasar.n[i], `${nm} tetap ${dasar.n[i]}`, `lupa mengubah jumlah ${nm}`);
      coba(K.n[i] + 1, `ada ${K.n[i] + 1} ${nm} (harusnya ${K.n[i]})`, "salah hitung lebih satu");
      coba(K.n[i] - 1, `ada ${K.n[i] - 1} ${nm} (harusnya ${K.n[i]})`, "salah hitung kurang satu");
    });
    ubah.push(s2.tukar ? { grup: 2, ke: (x) => ({ ...x, tukar: false }), isi: "dua objek atas tidak bertukar tempat", nama: "lupa menukar tempat" } : { grup: 2, ke: (x) => ({ ...x, tukar: true }), isi: "dua objek atas ditukar tempatnya", nama: "menukar tempat yang seharusnya tetap" });
    for (const u of [.../* @__PURE__ */ new Set([lawan2(s2.t), "tetap", comp(s2.t, "mkk"), inv(s2.t)])].filter((u2) => u2 !== s2.t))
      ubah.push({ grup: 3, ke: (x) => ({ ...x, t: u }), isi: `objek bawah ${T_NAME[u]}`, nama: u === "tetap" ? "lupa mengubah objek bawah" : "salah arah putar atau cermin" });
    const attr = (x) => [String(x.n[0]), String(x.n[1]), String(x.tukar), x.t];
    const salah = pilih(attr(K), kunci, calonDari(K, ubah, attr, (x) => gambarU(p2, x, s2.siluet), (x) => sah(p2, x)), s2.a[0].seed * 31 + s2.c[1].seed);
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    const lengkap = `(${l0 + 1}):(${l1 + 1})`, kata = (d) => d > 0 ? `bertambah ${d}` : `berkurang ${-d}`;
    const baris = [0, 1].map((i) => `${NAMA_H[p2[i].jenis][0][0].toUpperCase()}${NAMA_H[p2[i].jenis][0].slice(1)}: ${S[l0].n[i]} menjadi ${S[l1].n[i]} ${NAMA_H[p2[i].jenis][1]}, jadi ${kata(s2.dn[i])}.`);
    return {
      sub_type: "FIG-ANA-UBAH",
      tier: s2.tier,
      ...ANALOGI2,
      key: s2.key,
      opts,
      siluet: s2.siluet,
      ciri: ciriDari([s2.a[2], s2.c[2]], "dua-atas-satu-lebar", [0, 1].map((i) => ["lekuk", "bintang"].includes(s2.a[i].jenis) ? "pola" : s2.a[i].jenis)),
      stemSvg: layout([sel.map((f, i) => i === s2.q ? null : f)], { size: 104, gap: 40, seps: [":", "=", ":"] }),
      pembahasan: teks({
        tanya: `gambar (${s2.q + 1}) supaya hubungan (1):(2) sama dengan (3):(4).`,
        cara: [
          `Lihat pasangan yang lengkap, ${lengkap}. Ada tiga objek, dan setiap objek punya perubahannya sendiri.`,
          ...baris,
          s2.tukar ? "Dua objek atas juga bertukar tempat: yang tadinya di kiri pindah ke kanan." : "Dua objek atas tetap di tempatnya.",
          `Objek bawah ${T_NAME[s2.t]}.`,
          `Terapkan ke gambar (${s2.q}): ${NAMA_H[p2[0].jenis][1]} ${dasar.n[0]} menjadi ${K.n[0]}, ${NAMA_H[p2[1].jenis][1]} ${dasar.n[1]} menjadi ${K.n[1]}${s2.tukar ? ", tukar tempatnya" : ""}, lalu ubah objek bawah dengan cara yang sama.`
        ],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} satu-satunya yang jumlah ${NAMA_H[p2[0].jenis][1]} dan ${NAMA_H[p2[1].jenis][1]}nya tepat, tempat objek atasnya benar, dan objek bawahnya ${T_NAME[s2.t]}.`,
        analogi: "Seperti tiga orang yang diberi tugas berbeda: satu menambah kelereng, satu membuang kelereng, satu hanya membalik badan. Tugas mereka tidak tertukar.",
        jebakan: "Rupa kelopak dan cabang ikut berubah ketika jumlahnya berubah, jadi jangan mencocokkan rupa, cukup hitung. Opsi yang salah sering benar di dua hal dan keliru di hal lain, jadi periksa ketiga objek sampai selesai."
      }),
      pbhSvg: layout([sel], { size: 104, gap: 40, seps: [":", "=", ":"], hl: [0, s2.q], foot: [...[0, 1].map((i) => `${NAMA_H[p2[i].jenis][1]}: ${kata(s2.dn[i])}`), s2.tukar ? "dua objek atas bertukar tempat" : "objek atas tetap di tempat", `objek bawah: ${T_NAME[s2.t]}`] })
    };
  }
  var MTX_GABUNG = [
    { tier: 3, key: "B", baris: [{ pola: "lengkung", seed: 3, kecil: [8, 6], pojok: 1 }, { pola: "puncak", seed: 5, kecil: [4, 5], pojok: 0 }, { pola: "kelopak", seed: 2, kecil: [6, 4], pojok: 0 }] },
    { tier: 3, key: "E", baris: [{ pola: "kelopak", seed: 9, kecil: [5, 8], pojok: 1 }, { pola: "puncak", seed: 4, kecil: [6, 4], pojok: 1 }, { pola: "lengkung", seed: 6, kecil: [4, 7], pojok: 0 }] },
    { tier: 3, key: "D", baris: [{ pola: "puncak", seed: 7, kecil: [7, 5], pojok: 0 }, { pola: "kelopak", seed: 8, kecil: [5, 8], pojok: 1 }, { pola: "lengkung", seed: 4, kecil: [4, 6], pojok: 1 }], siluet: true }
  ];
  var busur = (cx, w, h, t, sd) => [{ k: "poly", fill: "b", pts: goresan(
    [[cx - w, 42], [cx - w * 0.92, 42 - h * 0.62], [cx - w * 0.5, 42 - h * 0.96], [cx + w * 0.08, 42 - h], [cx + w * 0.6, 42 - h * 0.82], [cx + w * 0.94, 42 - h * 0.4], [cx + w, 42]],
    [t * 0.85, t, t * 1.1, t * 1.15, t * 1.05, t, t * 0.85],
    0.22,
    sd
  ) }];
  function runcing(x, h, w, m) {
    const sisi = ([bx, by], [qx, qy], [ax, ay]) => Array.from({ length: 7 }, (_, k) => {
      const u = k / 6;
      return [(1 - u) ** 2 * bx + 2 * u * (1 - u) * qx + u * u * ax, (1 - u) ** 2 * by + 2 * u * (1 - u) * qy + u * u * ay];
    });
    const A = [x + m, 31 - h], kiri = sisi([x - w, 31], [x - w * 0.25, 31 - h * 0.3], A), kanan = sisi([x + w, 31], [x + w * 0.25, 31 - h * 0.3], A).reverse();
    return [{ k: "poly", fill: "b", pts: [...kiri, ...kanan.slice(1)].map(([a, b]) => [Math.round(a * 10) / 10, Math.round(b * 10) / 10]) }];
  }
  var PUSAT = [-2, 12];
  function daunan(a, L, w) {
    const [cx, cy] = PUSAT, d = [Math.cos(a), Math.sin(a)], q = [-d[1], d[0]], at = (s2, t) => [cx + d[0] * s2 + q[0] * t, cy + d[1] * s2 + q[1] * t];
    return [{ k: "poly", fill: "b", pts: lengkung([at(0, w * 0.35), at(L * 0.55, w), at(L, w * 0.45), at(L * 1.04, -w * 0.1), at(L * 0.6, -w * 0.9), at(0, -w * 0.35)], 6) }];
  }
  function bagian(b) {
    let x = b.seed;
    const acak = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648, j = () => acak() - 0.5;
    if (b.pola === "lengkung") {
      const semua2 = [busur(-6 + 6 * j(), 30, 26 + 6 * j(), 12, b.seed), busur(15, 13, 44 + 4 * j(), 10, b.seed + 1)];
      return acak() < 0.5 ? { semua: semua2, inti: [], k1: [0], k2: [1] } : { semua: semua2, inti: [], k1: [1], k2: [0] };
    }
    if (b.pola === "sinar") {
      const alas = [{ k: "poly", fill: "b", pts: lengkung([[-20, 40], [-17, 30], [0, 24], [17, 30], [20, 40], [0, 42]], 6) }];
      const sudut2 = [-150, -118, -90, -62, -30].map((d) => (d + 6 * j()) * Math.PI / 180);
      const semua2 = [alas, ...sudut2.map((a, i) => {
        const L = 16 + 8 * Math.abs(Math.sin(i * 2.1 + b.seed)), p0 = [20 * Math.cos(a), 36 + 20 * Math.sin(a)], p1 = [(20 + L) * Math.cos(a), 36 + (20 + L) * Math.sin(a)];
        return [{ k: "poly", fill: "b", pts: goresan([p0, p1], [7, 6]) }, { k: "circ", c: p1, r: 3, fill: "b" }];
      })];
      const ambil = [1, 2, 3, 4, 5].sort(() => acak() - 0.5);
      return { semua: semua2, inti: [0], k1: ambil.slice(0, 3).sort(), k2: ambil.slice(3).sort() };
    }
    if (b.pola === "ranting") {
      const batang = [{ k: "poly", fill: "b", pts: goresan([[-4, 44], [-2, 14], [2, -14], [4, -40]], [9, 7.5, 5.5, 3]) }];
      const cab = [[-2, 22, -1], [0, 4, 1], [1, -10, -1], [3, -26, 1]].map(([x2, y, sisi], i) => {
        const L = 22 + 6 * Math.abs(Math.sin(i * 1.7 + b.seed)), a = -Math.PI / 2 + sisi * (0.95 + 0.15 * j());
        return [{ k: "poly", fill: "b", pts: goresan([[x2, y], [x2 + L * 0.55 * Math.cos(a) + sisi * 3, y + L * 0.55 * Math.sin(a) + 3], [x2 + L * Math.cos(a), y + L * Math.sin(a)]], [6, 4.5, 2.5]) }];
      });
      const ambil = [1, 2, 3, 4].sort(() => acak() - 0.5);
      return { semua: [batang, ...cab], inti: [0], k1: ambil.slice(0, 2).sort(), k2: ambil.slice(2).sort() };
    }
    if (b.pola === "puncak") {
      const alas = [{ k: "poly", fill: "b", pts: lengkung([[-34, 30], [0, 27], [34, 29], [35, 38], [0, 41], [-33, 39]], 5) }];
      const semua2 = [alas, runcing(-22, 30 + 6 * j(), 11, -3), runcing(0, 42 + 4 * j(), 11, 2), runcing(22, 26 + 6 * j(), 11, 4)];
      const satu = 1 + Math.floor(acak() * 3);
      return { semua: semua2, inti: [0], k1: [1, 2, 3].filter((i) => i !== satu), k2: [satu] };
    }
    const sudut = [-140, -40, 60, 150].map((d) => (d + 14 * j()) * Math.PI / 180);
    const semua = [[{ k: "circ", c: PUSAT, r: 9, fill: "b" }], ...sudut.map((a, i) => daunan(a, 31 + 5 * j() - (i === 3 ? 4 : 0), 11))];
    return acak() < 0.5 ? { semua, inti: [0], k1: [1, 2], k2: [3] } : { semua, inti: [0], k1: [1, 2], k2: [3, 4] };
  }
  var POJOK_K = [[-30, -30], [30, -30]];
  function mtxGabung(s2) {
    shim_assert_default.notEqual(s2.baris[2].pola, "puncak", "puncak runcing jangan di baris 3: siswa tidak bisa melihat apakah ujung objek besar ikut ditumpulkan");
    shim_assert_default.equal(new Set(s2.baris.map((b) => b.pola)).size, 3, "tiap baris memakai keluarga bentuk berbeda");
    s2.baris.forEach((b) => shim_assert_default.notEqual(b.kecil[0], b.kecil[1], "objek kecil kolom 1 dan 2 harus beda jumlah cabang"));
    const B = s2.baris.map(bagian), dalam = s2.baris.map((b) => 0.26 + 0.16 * (b.seed * 7 % 5) / 4);
    const kecil = (r, src, tumpul) => geser(bintang(s2.baris[r].kecil[src - 1], s2.baris[r].seed + src, tumpul, 13, dalam[r]), POJOK_K[s2.baris[r].pojok]);
    const gambar = (r, x) => [...x.besar.flatMap((i) => B[r].semua[i]), ...kecil(r, x.src, x.tumpul)];
    const kol = (r) => [{ besar: [...B[r].inti, ...B[r].k1], src: 1, tumpul: false }, { besar: [...B[r].inti, ...B[r].k2], src: 2, tumpul: false }, { besar: [...B[r].inti, ...B[r].k1, ...B[r].k2].sort(), src: 2, tumpul: true }];
    const grid = [0, 1, 2].map((r) => kol(r).map((x) => gambar(r, x))), K = kol(2)[2], kunci = grid[2][2];
    const ATURAN = [
      ["gabung", (a, b) => [.../* @__PURE__ */ new Set([...a, ...b])]],
      ["beda", (a, b) => [...a, ...b].filter((i) => !(a.has(i) && b.has(i)))],
      ["irisan", (a, b) => [...a].filter((i) => b.has(i))],
      ["kolom1", (a) => [...a]],
      ["kolom2", (_, b) => [...b]],
      ["kurang1", (a, b) => [...b].filter((i) => !a.has(i))],
      ["kurang2", (a, b) => [...a].filter((i) => !b.has(i))]
    ];
    const kunciSet = (xs) => [...new Set(xs)].sort().join(",");
    const jawabBesar = new Set(ATURAN.filter(([, f]) => [0, 1].every((r) => kunciSet(f(new Set(kol(r)[0].besar), new Set(kol(r)[1].besar))) === kunciSet(kol(r)[2].besar))).map(([, f]) => kunciSet(f(new Set(kol(2)[0].besar), new Set(kol(2)[1].besar)))));
    shim_assert_default.deepEqual([...jawabBesar], [kunciSet(K.besar)], "aturan objek besar punya tafsir lain");
    grid.forEach((row, r) => row.forEach((f, c2) => r === 2 && c2 === 2 || shim_assert_default.notEqual(sig(f), sig(kunci), "jawaban sama dengan sel yang terlihat")));
    const k1 = B[2].k1, k2 = B[2].k2, inti = B[2].inti, U = K.besar;
    const ubah = [
      ...[...k1, ...k2].map((i) => {
        const sisa = U.filter((v) => v !== i), salin = kunciSet(sisa) === kunciSet(kol(2)[0].besar) ? 1 : kunciSet(sisa) === kunciSet(kol(2)[1].besar) ? 2 : 0;
        return { grup: 0, ke: (x) => ({ ...x, besar: sisa }), isi: salin ? `objek besarnya hanya salinan kolom ${salin}` : "objek besarnya kurang satu bagian", nama: salin ? `lupa menambahkan bagian dari kolom ${3 - salin}` : "ada bagian yang tertinggal saat digabung" };
      }),
      { grup: 0, ke: (x) => ({ ...x, besar: kol(2)[0].besar }), isi: "objek besarnya hanya salinan kolom 1", nama: "lupa menambahkan bagian dari kolom 2" },
      { grup: 0, ke: (x) => ({ ...x, besar: kol(2)[1].besar }), isi: "objek besarnya hanya salinan kolom 2", nama: "lupa menambahkan bagian dari kolom 1" },
      ...inti.length ? [{ grup: 0, ke: (x) => ({ ...x, besar: U.filter((v) => !inti.includes(v)) }), isi: "bagian yang ada di kolom 1 dan kolom 2 ikut dibuang", nama: "membuang bagian yang sama, padahal digabung" }] : [],
      { grup: 2, ke: (x) => ({ ...x, tumpul: false }), isi: "ujung bintang kecilnya masih lancip", nama: "lupa menumpulkan ujung" },
      { grup: 1, ke: (x) => ({ ...x, src: 1 }), isi: "bintang kecilnya diambil dari kolom 1", nama: "salah ambil kolom" }
    ];
    const attr = (x) => [kunciSet(x.besar), String(x.src), String(x.tumpul)];
    const salah = pilih(attr(K), kunci, calonDari(K, ubah, attr, (x) => gambar(2, x), () => true), s2.baris[0].seed * 17 + s2.baris[2].seed);
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    const tanda = (at, sz) => [0, 1, 2].map((r) => [0, 1].map((c2) => textC((at(r, c2)[0] + at(r, c2 + 1)[0]) / 2, at(r, c2)[1] + 7, c2 ? "=" : "+", 22, RED)).join("")).join("");
    return {
      sub_type: "FIG-MTX-GABUNG",
      tier: s2.tier,
      ...POLA4,
      key: s2.key,
      opts,
      siluet: s2.siluet,
      ciri: { keluarga: ["gabung"], susunan: "gabung", bentuk: [] },
      stemSvg: layout([grid[0], grid[1], [grid[2][0], grid[2][1], null]], { size: 100, gap: 8 }),
      pembahasan: teks({
        tanya: "sel kanan bawah matriks 3\xD73.",
        cara: [
          "Bandingkan per baris. Setiap sel punya satu objek besar dan satu bintang kecil, dan keduanya punya aturan sendiri.",
          "Objek besar: kolom 3 adalah gabungan objek besar kolom 1 dan kolom 2, ditumpuk di tempat yang sama. Bagian yang muncul di dua kolom sekaligus tetap ada, cukup sekali.",
          "Bintang kecil: kolom 3 memakai bintang kecil kolom 2, hanya ujungnya yang berubah dari lancip menjadi tumpul. Bintang kecil kolom 1 tidak dipakai.",
          "Cek dua aturan itu di baris 1 dan baris 2, lalu terapkan ke baris 3."
        ],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} satu-satunya yang objek besarnya gabungan utuh kolom 1 dan kolom 2, dan bintang kecilnya bintang kolom 2 yang ujungnya sudah tumpul.`,
        analogi: "Seperti menumpuk dua lembar plastik bening bergambar: semua gambar dari kedua lembar terlihat bersama dalam satu tumpukan.",
        jebakan: "Bintang kecil kolom 1 dan kolom 2 sama-sama lancip dan mirip, jadi mudah salah ambil. Hitung cabangnya: yang dipakai selalu bintang kolom 2."
      }),
      pbhSvg: layout(grid.map((row, r) => row.map((f, c2) => r === 2 && c2 === 2 ? kunci : f)), {
        size: 100,
        gap: 26,
        hl: [2, 2],
        minW: 600,
        ann: tanda,
        foot: ["Objek besar: kolom 1 + kolom 2 = kolom 3", "Bintang kecil kolom 2: ujung lancip jadi tumpul"]
      })
    };
  }

  // src/tiu-fig-siluet.ts
  var BEDA3 = { instruksi: "Perhatikan kelima gambar berikut.", stem: "Gambar manakah yang berbeda dari yang lain?" };
  var SERI2 = { instruksi: "Perhatikan urutan gambar berikut.", stem: "Gambar manakah yang tepat untuk mengganti tanda tanya?" };
  var PUTAR = ["tetap", "r90", "r180", "r270"];
  var BEDA_PUTAR_S = [{ tier: 3, key: "D", bentuk: ["pucuk", "kawung", "sulur"], petak: 1, cermin: 2, seed: 15, acak: true }];
  function bedaPutarS(s2) {
    const n = s2.bentuk.length, tempat = PETAK[n][s2.petak], posisi = NAMA_PETAK[n][s2.petak], objs = s2.bentuk.map((x) => BENTUK[x]), ki = KEYS.indexOf(s2.key);
    objs.forEach((o, j) => shim_assert_default.ok(kiral(o), `${s2.bentuk[j]} tidak kiral`));
    cekBedaObjek(s2.bentuk, "FIG-BEDA-PUTAR");
    shim_assert_default.ok(tempat[s2.cermin][1] < Math.max(...tempat.map((t) => t[1])), "objek yang dicermin jangan yang terbesar: terlalu mudah terlihat");
    for (let seed = s2.seed; seed < s2.seed + 500; seed++) {
      const r = rng(seed);
      const ts = KEYS.map((_, i) => objs.map((_2, j) => i === ki && j === s2.cermin ? comp("mkk", pick(r, PUTAR)) : pick(r, PUTAR)));
      if (objs.some((_, j) => new Set(ts.filter((_2, i) => i !== ki).map((t) => t[j])).size < 3)) continue;
      const figs = ts.map((t) => tata(objs.map((o, j) => ap(t[j], o)), HITAM, "tetap", tempat));
      if (new Set(figs.map(sig)).size < 5) continue;
      if (figs.some((f, i) => figs.some((g, k) => i !== k && T_ALL.some((t) => sig(ap(t, f)) === sig(g))))) continue;
      const salah = figs.filter((_, i) => i !== ki).map((f) => ({ fig: f, isi: `${n === 3 ? "ketiga" : "keempat"} objeknya hanya diputar`, alasan: "tidak ada yang dibalik, jadi masih sekelompok" }));
      const { opts, gugur } = pasang(figs[ki], salah, s2.key);
      return {
        sub_type: "FIG-BEDA-PUTAR",
        tier: s2.tier,
        ...BEDA3,
        key: s2.key,
        opts,
        siluet: true,
        stemSvg: "",
        ciri: ciriDari(s2.bentuk, `petak${n}-${s2.petak}`),
        pembahasan: teks({
          tanya: "satu gambar yang salah satu objeknya tidak bisa didapat hanya dengan memutar.",
          cara: ["Letak objek sama di kelima gambar, tetapi setiap objek diputar sendiri-sendiri. Gambar utuhnya tidak akan cocok satu sama lain, jadi jangan mencocokkan gambar sekaligus.", `Periksa per letak. Bandingkan objek ${posisi[0]} di kelima gambar, lalu objek ${posisi.slice(1).join(", lalu objek ")}.`, "Di setiap letak, pilih satu ujung yang khas, lalu lihat apakah sisi kiri dan kanannya tertukar. Objek yang diputar tetap punya urutan sisi yang sama; objek yang dicermin urutannya terbalik."],
          gugur,
          key: s2.key,
          alasan: `Objek ${posisi[s2.cermin]} di opsi ${s2.key} dibalik seperti bayangan cermin. Diputar ke arah mana pun, ia tidak bisa sama dengan objek ${posisi[s2.cermin]} di empat gambar lain.`,
          analogi: "Seperti memeriksa lima tumpukan sarung tangan kanan yang diletakkan miring ke berbagai arah: arahnya boleh beda-beda, yang dicari satu sarung tangan kiri.",
          jebakan: "Karena semua gambar tampak berbeda, mata mudah memilih gambar yang paling aneh susunannya. Yang menentukan hanya satu objek, dan objek itu bukan yang terbesar."
        }),
        pbhSvg: layout([opts], { size: 100, gap: 14, hl: [0, ki], ann: (at, sz) => ABC(at, sz, 5), extra: () => "", extraH: 34, foot: ["Setiap objek diputar sendiri-sendiri", `Opsi ${s2.key}: objek ${posisi[s2.cermin]} dicermin`] })
      };
    }
    throw new Error("FIG-BEDA-PUTAR siluet: tidak ketemu susunan arah yang lolos");
  }
  var SERI_KUADRAN_S = [{ tier: 3, key: "A", bentuk: ["daun", "tunas", "ombak", "biji"], diam: 1, arah: 1, putar: "r90", dua: true }];
  var UKUR4 = [42, 36, 40, 38];
  function seriKuadranS(s2) {
    cekBedaObjek(s2.bentuk, "FIG-SERI-KUADRAN");
    const C = [0, 1, 2, 3].filter((q) => q !== s2.diam), md = (a, m) => (a % m + m) % m;
    const rotKe = (p2) => s2.putar === "r90" ? PUTAR[md(p2, 4)] : PUTAR[md(-p2, 4)];
    const sel = (x) => {
      const tempat = [0, 1, 2, 3].map((i) => i === s2.diam ? i : C[md(C.indexOf(i) + x.geser, 3)]);
      if (x.tukar) {
        const [a, b] = x.tukar === 1 ? [C[0], C[1]] : [C[1], C[2]];
        [tempat[a], tempat[b]] = [tempat[b], tempat[a]];
      }
      return [0, 1, 2, 3].flatMap((i) => muat(i === s2.diam ? ap(x.rot, BENTUK[s2.bentuk[i]]) : BENTUK[s2.bentuk[i]], SLOT[4][tempat[i]], UKUR4[i]));
    };
    const langkah = (p2) => ({ geser: md(s2.arah * p2, 3), rot: rotKe(p2), tukar: 0 });
    const Q = 4, frames = [0, 1, 2, 3].map((p2) => sel(langkah(p2))), K = langkah(Q), kunci = sel(K);
    frames.forEach((f) => shim_assert_default.notEqual(sig(f), sig(kunci), "jawaban sama dengan gambar yang terlihat"));
    const nd = `objek ${KUADRAN[s2.diam]}`, arahK = s2.arah === 1 ? "searah" : "berlawanan arah";
    const ubah = [
      { grup: 0, ke: (x) => ({ ...x, geser: md(-s2.arah * Q, 3) }), isi: "tiga objek bergilir ke arah sebaliknya", nama: "salah arah perpindahan" },
      { grup: 0, ke: (x) => ({ ...x, geser: langkah(Q - 1).geser }), isi: "susunan tiga objek sama dengan gambar (4)", nama: "lupa memindahkan objek satu langkah lagi" },
      { grup: 1, ke: (x) => ({ ...x, rot: rotKe(Q - 1) }), isi: `${nd} sama dengan gambar (4)`, nama: `lupa memutar ${nd}` },
      { grup: 1, ke: (x) => ({ ...x, rot: rotKe(Q + 1) }), isi: `${nd} diputar satu kali terlalu banyak`, nama: "salah hitung putaran" },
      { grup: 1, ke: (x) => ({ ...x, rot: "mkk" }), isi: `${nd} dicermin, bukan diputar`, nama: "mengganti putar dengan cermin" },
      ...[1, 2].map((t) => ({ grup: 2, ke: (x) => ({ ...x, tukar: t }), isi: "dua objek yang bergilir bertukar tempat", nama: "urutan giliran ikut berubah" }))
    ];
    const attr = (x) => [`g${x.geser}`, x.rot, `t${x.tukar}`];
    const salah = pilih(attr(K), kunci, calonDari(K, ubah, attr, sel, () => true), s2.diam * 13 + 7);
    const { opts, gugur } = pasang(kunci, salah, s2.key);
    const urut = [0, 1, 2].map((k) => KUADRAN[C[md(s2.arah * k, 3)]]).join(" \u2192 ");
    return {
      sub_type: "FIG-SERI-KUADRAN",
      tier: s2.tier,
      ...SERI2,
      key: s2.key,
      opts,
      siluet: true,
      ciri: ciriDari(s2.bentuk, "kuadran4"),
      stemSvg: layout([[...frames, null]], { size: 96, gap: 12, ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30 }),
      pembahasan: teks({
        tanya: "gambar (5). Ada dua kelompok objek, dan masing-masing punya aturan sendiri.",
        cara: [
          `Kelompok pertama: ${nd} tidak pernah pindah kotak. Ia hanya berputar 90\xB0 ${s2.putar === "r90" ? "searah" : "berlawanan arah"} jarum jam setiap langkah.`,
          `Kelompok kedua: tiga objek lain bergilir di tiga kotak sisanya (${urut}), satu kotak setiap langkah, melompati kotak objek yang diam. Susunannya kembali seperti semula setiap tiga langkah.`,
          `Gambar (5) adalah langkah keempat. Susunan tiga objek itu sama dengan gambar (2), sedangkan ${nd} sudah berputar penuh sehingga kembali seperti di gambar (1).`
        ],
        gugur,
        key: s2.key,
        alasan: `Opsi ${s2.key} memenuhi kedua kelompok aturan: susunan tiga objek seperti gambar (2) dan ${nd} kembali ke arah awal.`,
        analogi: "Seperti tiga orang yang bergiliran duduk di tiga kursi, sementara orang keempat tetap di kursinya dan hanya memutar badan seperempat putaran setiap kali.",
        jebakan: "Jawabannya tidak sama dengan gambar mana pun yang terlihat. Kalau kamu menyalin gambar yang paling mirip, salah satu kelompok pasti keliru."
      }),
      pbhSvg: layout([[...frames, kunci]], { size: 96, gap: 12, hl: [0, Q], ann: (at, sz) => nomor(at, sz, 5), extra: () => "", extraH: 30, foot: [`${nd}: diam, berputar 90\xB0 tiap langkah`, `Tiga objek lain: bergilir ${arahK} jarum jam (${urut})`] })
    };
  }

  // src/tiu-jenis.ts
  var JENIS = {
    "FIG-BEDA-PUTAR": { nama: "Gambar berbeda: diputar atau dicermin", asal: "Paket 41 no. 62", contoh: [...BEDA_PUTAR, ...BEDA_PUTAR_S], buat: (x) => "acak" in x ? bedaPutarS(x) : bedaPutar(x) },
    "FIG-BEDA-HITUNG": { nama: "Gambar berbeda: hitung jenis bulatan", asal: "Paket 41 no. 61", contoh: [...BEDA_HITUNG, ...BEDA_HITUNG_S], buat: bedaHitung },
    "FIG-BEDA-TUMPUK": { nama: "Gambar berbeda: depan-belakang + ukuran hiasan", asal: "Paket 41 no. 62", contoh: BEDA_TUMPUK, buat: bedaTumpuk },
    "FIG-SERI-P3": { nama: "Seri selang tiga", asal: "Part 39 no. 58", contoh: SERI_P3, buat: seriP3 },
    "FIG-SERI-KUADRAN": { nama: "Seri empat kuadran", asal: "Paket 41 no. 58", contoh: [...SERI_KUADRAN, ...SERI_KUADRAN_S], buat: (x) => "dua" in x ? seriKuadranS(x) : seriKuadran(x) },
    "FIG-ANA-OBJ": { nama: "Analogi per objek (putar, cermin, warna, tukar)", asal: "Paket 41 no. 59\u201360, 65", contoh: ANA_OBJ, buat: anaObj },
    "FIG-ANA-UBAH": { nama: "Analogi ubah jumlah + tukar + cermin", asal: "Paket 41 no. 59 (pembahasan resmi)", contoh: ANA_UBAH, buat: anaUbah },
    "FIG-MTX-PUTAR": { nama: "Matriks putar/cermin", asal: "Part 39 no. 64\u201365, Paket 41 no. 63", contoh: MTX_PUTAR, buat: mtxPutar },
    "FIG-MTX-HITUNG": { nama: "Matriks hitung cabang + objek kecil", asal: "Paket 41 no. 64", contoh: MTX_HITUNG, buat: mtxHitung },
    "FIG-MTX-GABUNG": { nama: "Matriks gabung kolom + ujung lancip jadi tumpul", asal: "Paket 41 no. 65 (pembahasan resmi)", contoh: MTX_GABUNG, buat: mtxGabung }
  };

  // src/tiu-mockup.ts
  var $ = (id) => document.getElementById(id);
  var jenis = $("jenis");
  var contoh = $("contoh");
  var spec = $("spec");
  var hasil = $("hasil");
  var galat = $("galat");
  var tampilKunci = $("kunci");
  for (const [k, j] of Object.entries(JENIS)) jenis.add(new Option(`${j.nama} (${j.asal})`, k));
  function isiContoh() {
    contoh.innerHTML = "";
    JENIS[jenis.value].contoh.forEach((_, i) => contoh.add(new Option(`Contoh ${i + 1}`, String(i))));
    muatContoh();
  }
  function muatContoh() {
    spec.value = JSON.stringify(JENIS[jenis.value].contoh[+contoh.value], null, 2);
    buat();
  }
  function buat() {
    galat.textContent = "";
    hasil.innerHTML = "";
    let d;
    try {
      d = JENIS[jenis.value].buat(JSON.parse(spec.value));
    } catch (e) {
      galat.textContent = `Soal ditolak: ${e.message}`;
      return;
    }
    const g = (x) => d.siluet ? siluet(x) : x;
    const opsi = d.opts.map((f, i) => `<figure class="${tampilKunci.checked && KEYS[i] === d.key ? "k" : ""}">${g(optSvg(f))}<figcaption>${KEYS[i]}</figcaption></figure>`).join("");
    hasil.innerHTML = `<p class="ins">${d.instruksi}<br><b>${d.stem}</b></p>${d.stemSvg ? `<div class="stem">${g(d.stemSvg)}</div>` : ""}<div class="opsi">${opsi}</div>` + (tampilKunci.checked ? `<details open><summary>Pembahasan</summary><pre>${d.pembahasan.replace(/</g, "&lt;")}</pre><div class="stem">${g(d.pbhSvg)}</div></details>` : "");
  }
  jenis.onchange = isiContoh;
  contoh.onchange = muatContoh;
  tampilKunci.onchange = buat;
  $("buat").onclick = buat;
  spec.onkeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") buat();
  };
  $("galeri").innerHTML = Object.entries(GAYA2).map(([g, m]) => `<h3>${g}</h3><div class="gal">${Object.entries(m).map(([n, f]) => `<figure>${svg(300, 100, cellS(f, 50, 50, 92) + cellS(balikWarna(f), 150, 50, 92) + cellS(arsir(f), 250, 50, 92))}<figcaption>${n}</figcaption></figure>`).join("")}</div>`).join("") + // Keluarga berparameter (2026-10-29): contoh varian lolos uji; nama bisa langsung dipakai di spesifikasi.
  `<h3>Keluarga berparameter (nama: keluarga+jumlah-varian, akhiran u = guratan putih)</h3>` + [["tunas", 5, true], ["sabit", 4, true], ["pita", 4, true], ["rantai", 5, false], ["ikalkembar", 0, true], ["molekul", 4, false]].map(([k, n, u]) => `<div class="gal">${varian(k, n, 6, 1, u).map((nm) => `<figure>${siluet(svg(100, 100, cellS(muat(BENTUK[nm], [0, 0], 84), 50, 50, 92)))}<figcaption>${nm}</figcaption></figure>`).join("")}</div>`).join("") + `<h3>Perubahan</h3><ul>${T_ALL.map((t) => `<li><code>${t}</code> ${T_NAME[t]}</li>`).join("")}<li><code>\u2026+warna</code> ditambah balik warna, contoh <code>mab+warna</code></li></ul>`;
  isiContoh();
})();
