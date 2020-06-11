function ECB(e, t) {
  (this.count = e),
    (this.dataCodewords = t),
    this.__defineGetter__("Count", function () {
      return this.count;
    }),
    this.__defineGetter__("DataCodewords", function () {
      return this.dataCodewords;
    });
}
function ECBlocks(e, t, n) {
  (this.ecCodewordsPerBlock = e),
    (this.ecBlocks = n ? [t, n] : Array(t)),
    this.__defineGetter__("ECCodewordsPerBlock", function () {
      return this.ecCodewordsPerBlock;
    }),
    this.__defineGetter__("TotalECCodewords", function () {
      return this.ecCodewordsPerBlock * this.NumBlocks;
    }),
    this.__defineGetter__("NumBlocks", function () {
      for (var e = 0, t = 0; t < this.ecBlocks.length; t++)
        e += this.ecBlocks[t].length;
      return e;
    }),
    (this.getECBlocks = function () {
      return this.ecBlocks;
    });
}
function Version(e, t, n, i, r, o) {
  for (
    this.versionNumber = e,
      this.alignmentPatternCenters = t,
      this.ecBlocks = [n, i, r, o],
      e = 0,
      t = n.ECCodewordsPerBlock,
      n = n.getECBlocks(),
      i = 0;
    i < n.length;
    i++
  )
    (r = n[i]), (e += r.Count * (r.DataCodewords + t));
  (this.totalCodewords = e),
    this.__defineGetter__("VersionNumber", function () {
      return this.versionNumber;
    }),
    this.__defineGetter__("AlignmentPatternCenters", function () {
      return this.alignmentPatternCenters;
    }),
    this.__defineGetter__("TotalCodewords", function () {
      return this.totalCodewords;
    }),
    this.__defineGetter__("DimensionForVersion", function () {
      return 17 + 4 * this.versionNumber;
    }),
    (this.buildFunctionPattern = function () {
      var e = this.DimensionForVersion,
        t = new BitMatrix(e);
      t.setRegion(0, 0, 9, 9),
        t.setRegion(e - 8, 0, 8, 9),
        t.setRegion(0, e - 8, 9, 8);
      for (var n = this.alignmentPatternCenters.length, i = 0; n > i; i++)
        for (var r = this.alignmentPatternCenters[i] - 2, o = 0; n > o; o++)
          (0 == i && (0 == o || o == n - 1)) ||
            (i == n - 1 && 0 == o) ||
            t.setRegion(this.alignmentPatternCenters[o] - 2, r, 5, 5);
      return (
        t.setRegion(6, 9, 1, e - 17),
        t.setRegion(9, 6, e - 17, 1),
        6 < this.versionNumber &&
          (t.setRegion(e - 11, 0, 3, 6), t.setRegion(0, e - 11, 6, 3)),
        t
      );
    }),
    (this.getECBlocksForLevel = function (e) {
      return this.ecBlocks[e.ordinal()];
    });
}
function buildVersions() {
  return [
    new Version(
      1,
      [],
      new ECBlocks(7, new ECB(1, 19)),
      new ECBlocks(10, new ECB(1, 16)),
      new ECBlocks(13, new ECB(1, 13)),
      new ECBlocks(17, new ECB(1, 9))
    ),
    new Version(
      2,
      [6, 18],
      new ECBlocks(10, new ECB(1, 34)),
      new ECBlocks(16, new ECB(1, 28)),
      new ECBlocks(22, new ECB(1, 22)),
      new ECBlocks(28, new ECB(1, 16))
    ),
    new Version(
      3,
      [6, 22],
      new ECBlocks(15, new ECB(1, 55)),
      new ECBlocks(26, new ECB(1, 44)),
      new ECBlocks(18, new ECB(2, 17)),
      new ECBlocks(22, new ECB(2, 13))
    ),
    new Version(
      4,
      [6, 26],
      new ECBlocks(20, new ECB(1, 80)),
      new ECBlocks(18, new ECB(2, 32)),
      new ECBlocks(26, new ECB(2, 24)),
      new ECBlocks(16, new ECB(4, 9))
    ),
    new Version(
      5,
      [6, 30],
      new ECBlocks(26, new ECB(1, 108)),
      new ECBlocks(24, new ECB(2, 43)),
      new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)),
      new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))
    ),
    new Version(
      6,
      [6, 34],
      new ECBlocks(18, new ECB(2, 68)),
      new ECBlocks(16, new ECB(4, 27)),
      new ECBlocks(24, new ECB(4, 19)),
      new ECBlocks(28, new ECB(4, 15))
    ),
    new Version(
      7,
      [6, 22, 38],
      new ECBlocks(20, new ECB(2, 78)),
      new ECBlocks(18, new ECB(4, 31)),
      new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)),
      new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))
    ),
    new Version(
      8,
      [6, 24, 42],
      new ECBlocks(24, new ECB(2, 97)),
      new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)),
      new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)),
      new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))
    ),
    new Version(
      9,
      [6, 26, 46],
      new ECBlocks(30, new ECB(2, 116)),
      new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)),
      new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)),
      new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))
    ),
    new Version(
      10,
      [6, 28, 50],
      new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)),
      new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)),
      new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)),
      new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))
    ),
    new Version(
      11,
      [6, 30, 54],
      new ECBlocks(20, new ECB(4, 81)),
      new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)),
      new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)),
      new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))
    ),
    new Version(
      12,
      [6, 32, 58],
      new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)),
      new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)),
      new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)),
      new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))
    ),
    new Version(
      13,
      [6, 34, 62],
      new ECBlocks(26, new ECB(4, 107)),
      new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)),
      new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)),
      new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))
    ),
    new Version(
      14,
      [6, 26, 46, 66],
      new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)),
      new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)),
      new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)),
      new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))
    ),
    new Version(
      15,
      [6, 26, 48, 70],
      new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)),
      new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)),
      new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)),
      new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))
    ),
    new Version(
      16,
      [6, 26, 50, 74],
      new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)),
      new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)),
      new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)),
      new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))
    ),
    new Version(
      17,
      [6, 30, 54, 78],
      new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)),
      new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)),
      new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)),
      new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))
    ),
    new Version(
      18,
      [6, 30, 56, 82],
      new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)),
      new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)),
      new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)),
      new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))
    ),
    new Version(
      19,
      [6, 30, 58, 86],
      new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)),
      new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)),
      new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)),
      new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))
    ),
    new Version(
      20,
      [6, 34, 62, 90],
      new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)),
      new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)),
      new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)),
      new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))
    ),
    new Version(
      21,
      [6, 28, 50, 72, 94],
      new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)),
      new ECBlocks(26, new ECB(17, 42)),
      new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)),
      new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))
    ),
    new Version(
      22,
      [6, 26, 50, 74, 98],
      new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)),
      new ECBlocks(28, new ECB(17, 46)),
      new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)),
      new ECBlocks(24, new ECB(34, 13))
    ),
    new Version(
      23,
      [6, 30, 54, 74, 102],
      new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)),
      new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)),
      new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)),
      new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))
    ),
    new Version(
      24,
      [6, 28, 54, 80, 106],
      new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)),
      new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)),
      new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)),
      new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))
    ),
    new Version(
      25,
      [6, 32, 58, 84, 110],
      new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)),
      new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)),
      new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)),
      new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))
    ),
    new Version(
      26,
      [6, 30, 58, 86, 114],
      new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)),
      new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)),
      new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)),
      new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))
    ),
    new Version(
      27,
      [6, 34, 62, 90, 118],
      new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)),
      new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)),
      new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)),
      new ECBlocks(30, new ECB(12, 15), new ECB(28, 16))
    ),
    new Version(
      28,
      [6, 26, 50, 74, 98, 122],
      new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)),
      new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)),
      new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)),
      new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))
    ),
    new Version(
      29,
      [6, 30, 54, 78, 102, 126],
      new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)),
      new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)),
      new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)),
      new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))
    ),
    new Version(
      30,
      [6, 26, 52, 78, 104, 130],
      new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)),
      new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)),
      new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)),
      new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))
    ),
    new Version(
      31,
      [6, 30, 56, 82, 108, 134],
      new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)),
      new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)),
      new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)),
      new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))
    ),
    new Version(
      32,
      [6, 34, 60, 86, 112, 138],
      new ECBlocks(30, new ECB(17, 115)),
      new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)),
      new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)),
      new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))
    ),
    new Version(
      33,
      [6, 30, 58, 86, 114, 142],
      new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)),
      new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)),
      new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)),
      new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))
    ),
    new Version(
      34,
      [6, 34, 62, 90, 118, 146],
      new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)),
      new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)),
      new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)),
      new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))
    ),
    new Version(
      35,
      [6, 30, 54, 78, 102, 126, 150],
      new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)),
      new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)),
      new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)),
      new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))
    ),
    new Version(
      36,
      [6, 24, 50, 76, 102, 128, 154],
      new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)),
      new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)),
      new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)),
      new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))
    ),
    new Version(
      37,
      [6, 28, 54, 80, 106, 132, 158],
      new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)),
      new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)),
      new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)),
      new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))
    ),
    new Version(
      38,
      [6, 32, 58, 84, 110, 136, 162],
      new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)),
      new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)),
      new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)),
      new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))
    ),
    new Version(
      39,
      [6, 26, 54, 82, 110, 138, 166],
      new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)),
      new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)),
      new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)),
      new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))
    ),
    new Version(
      40,
      [6, 30, 58, 86, 114, 142, 170],
      new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)),
      new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)),
      new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)),
      new ECBlocks(30, new ECB(20, 15), new ECB(61, 16))
    ),
  ];
}
function PerspectiveTransform(e, t, n, i, r, o, s, a, h) {
  (this.a11 = e),
    (this.a12 = i),
    (this.a13 = s),
    (this.a21 = t),
    (this.a22 = r),
    (this.a23 = a),
    (this.a31 = n),
    (this.a32 = o),
    (this.a33 = h),
    (this.transformPoints1 = function (e) {
      for (
        var t = e.length,
          n = this.a11,
          i = this.a12,
          r = this.a13,
          o = this.a21,
          s = this.a22,
          a = this.a23,
          h = this.a31,
          c = this.a32,
          l = this.a33,
          f = 0;
        t > f;
        f += 2
      ) {
        var d = e[f],
          w = e[f + 1],
          u = r * d + a * w + l;
        (e[f] = (n * d + o * w + h) / u), (e[f + 1] = (i * d + s * w + c) / u);
      }
    }),
    (this.transformPoints2 = function (e, t) {
      for (var n = e.length, i = 0; n > i; i++) {
        var r = e[i],
          o = t[i],
          s = this.a13 * r + this.a23 * o + this.a33;
        (e[i] = (this.a11 * r + this.a21 * o + this.a31) / s),
          (t[i] = (this.a12 * r + this.a22 * o + this.a32) / s);
      }
    }),
    (this.buildAdjoint = function () {
      return new PerspectiveTransform(
        this.a22 * this.a33 - this.a23 * this.a32,
        this.a23 * this.a31 - this.a21 * this.a33,
        this.a21 * this.a32 - this.a22 * this.a31,
        this.a13 * this.a32 - this.a12 * this.a33,
        this.a11 * this.a33 - this.a13 * this.a31,
        this.a12 * this.a31 - this.a11 * this.a32,
        this.a12 * this.a23 - this.a13 * this.a22,
        this.a13 * this.a21 - this.a11 * this.a23,
        this.a11 * this.a22 - this.a12 * this.a21
      );
    }),
    (this.times = function (e) {
      return new PerspectiveTransform(
        this.a11 * e.a11 + this.a21 * e.a12 + this.a31 * e.a13,
        this.a11 * e.a21 + this.a21 * e.a22 + this.a31 * e.a23,
        this.a11 * e.a31 + this.a21 * e.a32 + this.a31 * e.a33,
        this.a12 * e.a11 + this.a22 * e.a12 + this.a32 * e.a13,
        this.a12 * e.a21 + this.a22 * e.a22 + this.a32 * e.a23,
        this.a12 * e.a31 + this.a22 * e.a32 + this.a32 * e.a33,
        this.a13 * e.a11 + this.a23 * e.a12 + this.a33 * e.a13,
        this.a13 * e.a21 + this.a23 * e.a22 + this.a33 * e.a23,
        this.a13 * e.a31 + this.a23 * e.a32 + this.a33 * e.a33
      );
    });
}
function DetectorResult(e, t) {
  (this.bits = e), (this.points = t);
}
function Detector(e) {
  (this.image = e),
    (this.resultPointCallback = null),
    (this.sizeOfBlackWhiteBlackRun = function (e, t, n, i) {
      var r = Math.abs(i - t) > Math.abs(n - e);
      if (r) {
        var o = e;
        (e = t), (t = o), (o = n), (n = i), (i = o);
      }
      for (
        var s = Math.abs(n - e),
          a = Math.abs(i - t),
          h = -s >> 1,
          c = i > t ? 1 : -1,
          l = n > e ? 1 : -1,
          f = 0,
          d = e,
          o = t;
        d != n;
        d += l
      ) {
        var w = r ? o : d,
          u = r ? d : o;
        if (
          (1 == f
            ? this.image[w + u * qrcode.width] && f++
            : this.image[w + u * qrcode.width] || f++,
          3 == f)
        )
          return (i = d - e), (t = o - t), Math.sqrt(i * i + t * t);
        if (((h += a), h > 0)) {
          if (o == i) break;
          (o += c), (h -= s);
        }
      }
      return (e = n - e), (t = i - t), Math.sqrt(e * e + t * t);
    }),
    (this.sizeOfBlackWhiteBlackRunBothWays = function (e, t, n, i) {
      var r = this.sizeOfBlackWhiteBlackRun(e, t, n, i),
        o = 1;
      return (
        (n = e - (n - e)),
        0 > n
          ? ((o = e / (e - n)), (n = 0))
          : n >= qrcode.width &&
            ((o = (qrcode.width - 1 - e) / (n - e)), (n = qrcode.width - 1)),
        (i = Math.floor(t - (i - t) * o)),
        (o = 1),
        0 > i
          ? ((o = t / (t - i)), (i = 0))
          : i >= qrcode.height &&
            ((o = (qrcode.height - 1 - t) / (i - t)), (i = qrcode.height - 1)),
        (n = Math.floor(e + (n - e) * o)),
        (r += this.sizeOfBlackWhiteBlackRun(e, t, n, i)),
        r - 1
      );
    }),
    (this.calculateModuleSizeOneWay = function (e, t) {
      var n = this.sizeOfBlackWhiteBlackRunBothWays(
          Math.floor(e.X),
          Math.floor(e.Y),
          Math.floor(t.X),
          Math.floor(t.Y)
        ),
        i = this.sizeOfBlackWhiteBlackRunBothWays(
          Math.floor(t.X),
          Math.floor(t.Y),
          Math.floor(e.X),
          Math.floor(e.Y)
        );
      return isNaN(n) ? i / 7 : isNaN(i) ? n / 7 : (n + i) / 14;
    }),
    (this.calculateModuleSize = function (e, t, n) {
      return (
        (this.calculateModuleSizeOneWay(e, t) +
          this.calculateModuleSizeOneWay(e, n)) /
        2
      );
    }),
    (this.distance = function (e, t) {
      return (
        (xDiff = e.X - t.X),
        (yDiff = e.Y - t.Y),
        Math.sqrt(xDiff * xDiff + yDiff * yDiff)
      );
    }),
    (this.computeDimension = function (e, t, n, i) {
      switch (
        ((t = Math.round(this.distance(e, t) / i)),
        (e = Math.round(this.distance(e, n) / i)),
        (e = ((t + e) >> 1) + 7),
        3 & e)
      ) {
        case 0:
          e++;
          break;
        case 2:
          e--;
          break;
        case 3:
          throw "Error";
      }
      return e;
    }),
    (this.findAlignmentInRegion = function (e, t, n, i) {
      var r = Math.floor(i * e);
      if (
        ((i = Math.max(0, t - r)),
        (t = Math.min(qrcode.width - 1, t + r)),
        3 * e > t - i)
      )
        throw "Error";
      var o = Math.max(0, n - r);
      return (
        (n = Math.min(qrcode.height - 1, n + r)),
        new AlignmentPatternFinder(
          this.image,
          i,
          o,
          t - i,
          n - o,
          e,
          this.resultPointCallback
        ).find()
      );
    }),
    (this.createTransform = function (e, t, n, i, r) {
      r -= 3.5;
      var o, s, a;
      return (
        null != i
          ? ((o = i.X), (i = i.Y), (s = a = r - 3))
          : ((o = t.X - e.X + n.X), (i = t.Y - e.Y + n.Y), (s = a = r)),
        PerspectiveTransform.quadrilateralToQuadrilateral(
          3.5,
          3.5,
          r,
          3.5,
          s,
          a,
          3.5,
          r,
          e.X,
          e.Y,
          t.X,
          t.Y,
          o,
          i,
          n.X,
          n.Y
        )
      );
    }),
    (this.sampleGrid = function (e, t, n) {
      return GridSampler.sampleGrid3(e, n, t);
    }),
    (this.processFinderPatternInfo = function (e) {
      var t = e.TopLeft,
        n = e.TopRight;
      e = e.BottomLeft;
      var i = this.calculateModuleSize(t, n, e);
      if (1 > i) throw "Error";
      var r = this.computeDimension(t, n, e, i),
        o = Version.getProvisionalVersionForDimension(r),
        s = o.DimensionForVersion - 7,
        a = null;
      if (0 < o.AlignmentPatternCenters.length)
        for (
          s = 1 - 3 / s,
            o = Math.floor(t.X + s * (n.X - t.X + e.X - t.X)),
            s = Math.floor(t.Y + s * (n.Y - t.Y + e.Y - t.Y));
          ;

        ) {
          a = this.findAlignmentInRegion(i, o, s, 4);
          break;
        }
      return (
        (i = this.createTransform(t, n, e, a, r)),
        (r = this.sampleGrid(this.image, i, r)),
        new DetectorResult(r, null == a ? [e, t, n] : [e, t, n, a])
      );
    }),
    (this.detect = function () {
      var e = new FinderPatternFinder().findFinderPattern(this.image);
      return this.processFinderPatternInfo(e);
    });
}
function FormatInformation(e) {
  (this.errorCorrectionLevel = ErrorCorrectionLevel.forBits((e >> 3) & 3)),
    (this.dataMask = 7 & e),
    this.__defineGetter__("ErrorCorrectionLevel", function () {
      return this.errorCorrectionLevel;
    }),
    this.__defineGetter__("DataMask", function () {
      return this.dataMask;
    }),
    (this.GetHashCode = function () {
      return (this.errorCorrectionLevel.ordinal() << 3) | dataMask;
    }),
    (this.Equals = function (e) {
      return (
        this.errorCorrectionLevel == e.errorCorrectionLevel &&
        this.dataMask == e.dataMask
      );
    });
}
function ErrorCorrectionLevel(e, t, n) {
  (this.ordinal_Renamed_Field = e),
    (this.bits = t),
    (this.name = n),
    this.__defineGetter__("Bits", function () {
      return this.bits;
    }),
    this.__defineGetter__("Name", function () {
      return this.name;
    }),
    (this.ordinal = function () {
      return this.ordinal_Renamed_Field;
    });
}
function BitMatrix(e, t) {
  if ((t || (t = e), 1 > e || 1 > t))
    throw "Both dimensions must be greater than 0";
  (this.width = e), (this.height = t);
  var n = e >> 5;
  for (
    0 != (31 & e) && n++, this.rowSize = n, this.bits = Array(n * t), n = 0;
    n < this.bits.length;
    n++
  )
    this.bits[n] = 0;
  this.__defineGetter__("Width", function () {
    return this.width;
  }),
    this.__defineGetter__("Height", function () {
      return this.height;
    }),
    this.__defineGetter__("Dimension", function () {
      if (this.width != this.height)
        throw "Can't call getDimension() on a non-square matrix";
      return this.width;
    }),
    (this.get_Renamed = function (e, t) {
      return 0 != (1 & URShift(this.bits[t * this.rowSize + (e >> 5)], 31 & e));
    }),
    (this.set_Renamed = function (e, t) {
      this.bits[t * this.rowSize + (e >> 5)] |= 1 << (31 & e);
    }),
    (this.flip = function (e, t) {
      this.bits[t * this.rowSize + (e >> 5)] ^= 1 << (31 & e);
    }),
    (this.clear = function () {
      for (var e = this.bits.length, t = 0; e > t; t++) this.bits[t] = 0;
    }),
    (this.setRegion = function (e, t, n, i) {
      if (0 > t || 0 > e) throw "Left and top must be nonnegative";
      if (1 > i || 1 > n) throw "Height and width must be at least 1";
      if (((n = e + n), (i = t + i), i > this.height || n > this.width))
        throw "The region must fit inside the matrix";
      for (; i > t; t++)
        for (var r = t * this.rowSize, o = e; n > o; o++)
          this.bits[r + (o >> 5)] |= 1 << (31 & o);
    });
}
function DataBlock(e, t) {
  (this.numDataCodewords = e),
    (this.codewords = t),
    this.__defineGetter__("NumDataCodewords", function () {
      return this.numDataCodewords;
    }),
    this.__defineGetter__("Codewords", function () {
      return this.codewords;
    });
}
function BitMatrixParser(e) {
  var t = e.Dimension;
  if (21 > t || 1 != (3 & t)) throw "Error BitMatrixParser";
  (this.bitMatrix = e),
    (this.parsedFormatInfo = this.parsedVersion = null),
    (this.copyBit = function (e, t, n) {
      return this.bitMatrix.get_Renamed(e, t) ? (n << 1) | 1 : n << 1;
    }),
    (this.readFormatInformation = function () {
      if (null != this.parsedFormatInfo) return this.parsedFormatInfo;
      for (var e = 0, t = 0; 6 > t; t++) e = this.copyBit(t, 8, e);
      for (
        e = this.copyBit(7, 8, e),
          e = this.copyBit(8, 8, e),
          e = this.copyBit(8, 7, e),
          t = 5;
        t >= 0;
        t--
      )
        e = this.copyBit(8, t, e);
      if (
        ((this.parsedFormatInfo = FormatInformation.decodeFormatInformation(e)),
        null != this.parsedFormatInfo)
      )
        return this.parsedFormatInfo;
      for (
        var n = this.bitMatrix.Dimension, e = 0, i = n - 8, t = n - 1;
        t >= i;
        t--
      )
        e = this.copyBit(t, 8, e);
      for (t = n - 7; n > t; t++) e = this.copyBit(8, t, e);
      if (
        ((this.parsedFormatInfo = FormatInformation.decodeFormatInformation(e)),
        null != this.parsedFormatInfo)
      )
        return this.parsedFormatInfo;
      throw "Error readFormatInformation";
    }),
    (this.readVersion = function () {
      if (null != this.parsedVersion) return this.parsedVersion;
      var e = this.bitMatrix.Dimension,
        t = (e - 17) >> 2;
      if (6 >= t) return Version.getVersionForNumber(t);
      for (var t = 0, n = e - 11, i = 5; i >= 0; i--)
        for (var r = e - 9; r >= n; r--) t = this.copyBit(r, i, t);
      if (
        ((this.parsedVersion = Version.decodeVersionInformation(t)),
        null != this.parsedVersion &&
          this.parsedVersion.DimensionForVersion == e)
      )
        return this.parsedVersion;
      for (t = 0, r = 5; r >= 0; r--)
        for (i = e - 9; i >= n; i--) t = this.copyBit(r, i, t);
      if (
        ((this.parsedVersion = Version.decodeVersionInformation(t)),
        null != this.parsedVersion &&
          this.parsedVersion.DimensionForVersion == e)
      )
        return this.parsedVersion;
      throw "Error readVersion";
    }),
    (this.readCodewords = function () {
      var e = this.readFormatInformation(),
        t = this.readVersion(),
        n = DataMask.forReference(e.DataMask),
        e = this.bitMatrix.Dimension;
      n.unmaskBitMatrix(this.bitMatrix, e);
      for (
        var n = t.buildFunctionPattern(),
          i = !0,
          r = Array(t.TotalCodewords),
          o = 0,
          s = 0,
          a = 0,
          h = e - 1;
        h > 0;
        h -= 2
      ) {
        6 == h && h--;
        for (var c = 0; e > c; c++)
          for (var l = i ? e - 1 - c : c, f = 0; 2 > f; f++)
            n.get_Renamed(h - f, l) ||
              (a++,
              (s <<= 1),
              this.bitMatrix.get_Renamed(h - f, l) && (s |= 1),
              8 == a && ((r[o++] = s), (s = a = 0)));
        i ^= 1;
      }
      if (o != t.TotalCodewords) throw "Error readCodewords";
      return r;
    });
}
function DataMask000() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      return 0 == ((e + t) & 1);
    });
}
function DataMask001() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e) {
      return 0 == (1 & e);
    });
}
function DataMask010() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      return 0 == t % 3;
    });
}
function DataMask011() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      return 0 == (e + t) % 3;
    });
}
function DataMask100() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      return 0 == ((URShift(e, 1) + t / 3) & 1);
    });
}
function DataMask101() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      var n = e * t;
      return 0 == (1 & n) + (n % 3);
    });
}
function DataMask110() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      var n = e * t;
      return 0 == (((1 & n) + (n % 3)) & 1);
    });
}
function DataMask111() {
  (this.unmaskBitMatrix = function (e, t) {
    for (var n = 0; t > n; n++)
      for (var i = 0; t > i; i++) this.isMasked(n, i) && e.flip(i, n);
  }),
    (this.isMasked = function (e, t) {
      return 0 == ((((e + t) & 1) + ((e * t) % 3)) & 1);
    });
}
function ReedSolomonDecoder(e) {
  (this.field = e),
    (this.decode = function (e, t) {
      for (
        var n = new GF256Poly(this.field, e), i = Array(t), r = 0;
        r < i.length;
        r++
      )
        i[r] = 0;
      for (var o = !0, r = 0; t > r; r++) {
        var s = n.evaluateAt(this.field.exp(r));
        (i[i.length - 1 - r] = s), 0 != s && (o = !1);
      }
      if (!o)
        for (
          r = new GF256Poly(this.field, i),
            n = this.runEuclideanAlgorithm(
              this.field.buildMonomial(t, 1),
              r,
              t
            ),
            r = n[1],
            n = this.findErrorLocations(n[0]),
            i = this.findErrorMagnitudes(r, n, !1),
            r = 0;
          r < n.length;
          r++
        ) {
          if (((o = e.length - 1 - this.field.log(n[r])), 0 > o))
            throw "ReedSolomonException Bad error location";
          e[o] = GF256.addOrSubtract(e[o], i[r]);
        }
    }),
    (this.runEuclideanAlgorithm = function (e, t, n) {
      if (e.Degree < t.Degree) {
        var i = e;
        (e = t), (t = i);
      }
      for (
        var i = this.field.One,
          r = this.field.Zero,
          o = this.field.Zero,
          s = this.field.One;
        t.Degree >= Math.floor(n / 2);

      ) {
        var a = e,
          h = i,
          c = o;
        if (((e = t), (i = r), (o = s), e.Zero)) throw "r_{i-1} was zero";
        for (
          t = a,
            s = this.field.Zero,
            r = e.getCoefficient(e.Degree),
            r = this.field.inverse(r);
          t.Degree >= e.Degree && !t.Zero;

        ) {
          var a = t.Degree - e.Degree,
            l = this.field.multiply(t.getCoefficient(t.Degree), r),
            s = s.addOrSubtract(this.field.buildMonomial(a, l));
          t = t.addOrSubtract(e.multiplyByMonomial(a, l));
        }
        (r = s.multiply1(i).addOrSubtract(h)),
          (s = s.multiply1(o).addOrSubtract(c));
      }
      if (((n = s.getCoefficient(0)), 0 == n))
        throw "ReedSolomonException sigmaTilde(0) was zero";
      return (
        (n = this.field.inverse(n)),
        (e = s.multiply2(n)),
        (n = t.multiply2(n)),
        [e, n]
      );
    }),
    (this.findErrorLocations = function (e) {
      var t = e.Degree;
      if (1 == t) return Array(e.getCoefficient(1));
      for (var n = Array(t), i = 0, r = 1; 256 > r && t > i; r++)
        0 == e.evaluateAt(r) && ((n[i] = this.field.inverse(r)), i++);
      if (i != t) throw "Error locator degree does not match number of roots";
      return n;
    }),
    (this.findErrorMagnitudes = function (e, t, n) {
      for (var i = t.length, r = Array(i), o = 0; i > o; o++) {
        for (var s = this.field.inverse(t[o]), a = 1, h = 0; i > h; h++)
          o != h &&
            (a = this.field.multiply(
              a,
              GF256.addOrSubtract(1, this.field.multiply(t[h], s))
            ));
        (r[o] = this.field.multiply(e.evaluateAt(s), this.field.inverse(a))),
          n && (r[o] = this.field.multiply(r[o], s));
      }
      return r;
    });
}
function GF256Poly(e, t) {
  if (null == t || 0 == t.length) throw "System.ArgumentException";
  this.field = e;
  var n = t.length;
  if (n > 1 && 0 == t[0]) {
    for (var i = 1; n > i && 0 == t[i]; ) i++;
    if (i == n) this.coefficients = e.Zero.coefficients;
    else {
      for (
        this.coefficients = Array(n - i), n = 0;
        n < this.coefficients.length;
        n++
      )
        this.coefficients[n] = 0;
      for (n = 0; n < this.coefficients.length; n++)
        this.coefficients[n] = t[i + n];
    }
  } else this.coefficients = t;
  this.__defineGetter__("Zero", function () {
    return 0 == this.coefficients[0];
  }),
    this.__defineGetter__("Degree", function () {
      return this.coefficients.length - 1;
    }),
    this.__defineGetter__("Coefficients", function () {
      return this.coefficients;
    }),
    (this.getCoefficient = function (e) {
      return this.coefficients[this.coefficients.length - 1 - e];
    }),
    (this.evaluateAt = function (e) {
      if (0 == e) return this.getCoefficient(0);
      var t = this.coefficients.length;
      if (1 == e) {
        for (var n = (e = 0); t > n; n++)
          e = GF256.addOrSubtract(e, this.coefficients[n]);
        return e;
      }
      for (var i = this.coefficients[0], n = 1; t > n; n++)
        i = GF256.addOrSubtract(
          this.field.multiply(e, i),
          this.coefficients[n]
        );
      return i;
    }),
    (this.addOrSubtract = function (t) {
      if (this.field != t.field)
        throw "GF256Polys do not have same GF256 field";
      if (this.Zero) return t;
      if (t.Zero) return this;
      var n = this.coefficients;
      if (((t = t.coefficients), n.length > t.length)) {
        var i = n,
          n = t;
        t = i;
      }
      for (var i = Array(t.length), r = t.length - n.length, o = 0; r > o; o++)
        i[o] = t[o];
      for (o = r; o < t.length; o++) i[o] = GF256.addOrSubtract(n[o - r], t[o]);
      return new GF256Poly(e, i);
    }),
    (this.multiply1 = function (e) {
      if (this.field != e.field)
        throw "GF256Polys do not have same GF256 field";
      if (this.Zero || e.Zero) return this.field.Zero;
      var t = this.coefficients,
        n = t.length;
      e = e.coefficients;
      for (var i = e.length, r = Array(n + i - 1), o = 0; n > o; o++)
        for (var s = t[o], a = 0; i > a; a++)
          r[o + a] = GF256.addOrSubtract(
            r[o + a],
            this.field.multiply(s, e[a])
          );
      return new GF256Poly(this.field, r);
    }),
    (this.multiply2 = function (e) {
      if (0 == e) return this.field.Zero;
      if (1 == e) return this;
      for (var t = this.coefficients.length, n = Array(t), i = 0; t > i; i++)
        n[i] = this.field.multiply(this.coefficients[i], e);
      return new GF256Poly(this.field, n);
    }),
    (this.multiplyByMonomial = function (e, t) {
      if (0 > e) throw "System.ArgumentException";
      if (0 == t) return this.field.Zero;
      for (
        var n = this.coefficients.length, i = Array(n + e), r = 0;
        r < i.length;
        r++
      )
        i[r] = 0;
      for (r = 0; n > r; r++)
        i[r] = this.field.multiply(this.coefficients[r], t);
      return new GF256Poly(this.field, i);
    }),
    (this.divide = function (e) {
      if (this.field != e.field)
        throw "GF256Polys do not have same GF256 field";
      if (e.Zero) throw "Divide by 0";
      for (
        var t = this.field.Zero,
          n = this,
          i = e.getCoefficient(e.Degree),
          i = this.field.inverse(i);
        n.Degree >= e.Degree && !n.Zero;

      )
        var r = n.Degree - e.Degree,
          o = this.field.multiply(n.getCoefficient(n.Degree), i),
          s = e.multiplyByMonomial(r, o),
          r = this.field.buildMonomial(r, o),
          t = t.addOrSubtract(r),
          n = n.addOrSubtract(s);
      return [t, n];
    });
}
function GF256(e) {
  (this.expTable = Array(256)), (this.logTable = Array(256));
  for (var t = 1, n = 0; 256 > n; n++)
    (this.expTable[n] = t), (t <<= 1), t >= 256 && (t ^= e);
  for (n = 0; 255 > n; n++) this.logTable[this.expTable[n]] = n;
  (e = Array(1)),
    (e[0] = 0),
    (this.zero = new GF256Poly(this, Array(e))),
    (e = Array(1)),
    (e[0] = 1),
    (this.one = new GF256Poly(this, Array(e))),
    this.__defineGetter__("Zero", function () {
      return this.zero;
    }),
    this.__defineGetter__("One", function () {
      return this.one;
    }),
    (this.buildMonomial = function (e, t) {
      if (0 > e) throw "System.ArgumentException";
      if (0 == t) return zero;
      for (var n = Array(e + 1), i = 0; i < n.length; i++) n[i] = 0;
      return (n[0] = t), new GF256Poly(this, n);
    }),
    (this.exp = function (e) {
      return this.expTable[e];
    }),
    (this.log = function (e) {
      if (0 == e) throw "System.ArgumentException";
      return this.logTable[e];
    }),
    (this.inverse = function (e) {
      if (0 == e) throw "System.ArithmeticException";
      return this.expTable[255 - this.logTable[e]];
    }),
    (this.multiply = function (e, t) {
      return 0 == e || 0 == t
        ? 0
        : 1 == e
        ? t
        : 1 == t
        ? e
        : this.expTable[(this.logTable[e] + this.logTable[t]) % 255];
    });
}
function URShift(e, t) {
  return e >= 0 ? e >> t : (e >> t) + (2 << ~t);
}
function FinderPattern(e, t, n) {
  (this.x = e),
    (this.y = t),
    (this.count = 1),
    (this.estimatedModuleSize = n),
    this.__defineGetter__("EstimatedModuleSize", function () {
      return this.estimatedModuleSize;
    }),
    this.__defineGetter__("Count", function () {
      return this.count;
    }),
    this.__defineGetter__("X", function () {
      return this.x;
    }),
    this.__defineGetter__("Y", function () {
      return this.y;
    }),
    (this.incrementCount = function () {
      this.count++;
    }),
    (this.aboutEquals = function (e, t, n) {
      return Math.abs(t - this.y) <= e && Math.abs(n - this.x) <= e
        ? ((e = Math.abs(e - this.estimatedModuleSize)),
          1 >= e || 1 >= e / this.estimatedModuleSize)
        : !1;
    });
}
function FinderPatternInfo(e) {
  (this.bottomLeft = e[0]),
    (this.topLeft = e[1]),
    (this.topRight = e[2]),
    this.__defineGetter__("BottomLeft", function () {
      return this.bottomLeft;
    }),
    this.__defineGetter__("TopLeft", function () {
      return this.topLeft;
    }),
    this.__defineGetter__("TopRight", function () {
      return this.topRight;
    });
}
function FinderPatternFinder() {
  (this.image = null),
    (this.possibleCenters = []),
    (this.hasSkipped = !1),
    (this.crossCheckStateCount = [0, 0, 0, 0, 0]),
    (this.resultPointCallback = null),
    this.__defineGetter__("CrossCheckStateCount", function () {
      return (
        (this.crossCheckStateCount[0] = 0),
        (this.crossCheckStateCount[1] = 0),
        (this.crossCheckStateCount[2] = 0),
        (this.crossCheckStateCount[3] = 0),
        (this.crossCheckStateCount[4] = 0),
        this.crossCheckStateCount
      );
    }),
    (this.foundPatternCross = function (e) {
      for (var t = 0, n = 0; 5 > n; n++) {
        var i = e[n];
        if (0 == i) return !1;
        t += i;
      }
      return 7 > t
        ? !1
        : ((t = Math.floor((t << INTEGER_MATH_SHIFT) / 7)),
          (n = Math.floor(t / 2)),
          Math.abs(t - (e[0] << INTEGER_MATH_SHIFT)) < n &&
            Math.abs(t - (e[1] << INTEGER_MATH_SHIFT)) < n &&
            Math.abs(3 * t - (e[2] << INTEGER_MATH_SHIFT)) < 3 * n &&
            Math.abs(t - (e[3] << INTEGER_MATH_SHIFT)) < n &&
            Math.abs(t - (e[4] << INTEGER_MATH_SHIFT)) < n);
    }),
    (this.centerFromEnd = function (e, t) {
      return t - e[4] - e[3] - e[2] / 2;
    }),
    (this.crossCheckVertical = function (e, t, n, i) {
      for (
        var r = this.image,
          o = qrcode.height,
          s = this.CrossCheckStateCount,
          a = e;
        a >= 0 && r[t + a * qrcode.width];

      )
        s[2]++, a--;
      if (0 > a) return 0 / 0;
      for (; a >= 0 && !r[t + a * qrcode.width] && s[1] <= n; ) s[1]++, a--;
      if (0 > a || s[1] > n) return 0 / 0;
      for (; a >= 0 && r[t + a * qrcode.width] && s[0] <= n; ) s[0]++, a--;
      if (s[0] > n) return 0 / 0;
      for (a = e + 1; o > a && r[t + a * qrcode.width]; ) s[2]++, a++;
      if (a == o) return 0 / 0;
      for (; o > a && !r[t + a * qrcode.width] && s[3] < n; ) s[3]++, a++;
      if (a == o || s[3] >= n) return 0 / 0;
      for (; o > a && r[t + a * qrcode.width] && s[4] < n; ) s[4]++, a++;
      return s[4] >= n ||
        5 * Math.abs(s[0] + s[1] + s[2] + s[3] + s[4] - i) >= 2 * i
        ? 0 / 0
        : this.foundPatternCross(s)
        ? this.centerFromEnd(s, a)
        : 0 / 0;
    }),
    (this.crossCheckHorizontal = function (e, t, n, i) {
      for (
        var r = this.image,
          o = qrcode.width,
          s = this.CrossCheckStateCount,
          a = e;
        a >= 0 && r[a + t * qrcode.width];

      )
        s[2]++, a--;
      if (0 > a) return 0 / 0;
      for (; a >= 0 && !r[a + t * qrcode.width] && s[1] <= n; ) s[1]++, a--;
      if (0 > a || s[1] > n) return 0 / 0;
      for (; a >= 0 && r[a + t * qrcode.width] && s[0] <= n; ) s[0]++, a--;
      if (s[0] > n) return 0 / 0;
      for (a = e + 1; o > a && r[a + t * qrcode.width]; ) s[2]++, a++;
      if (a == o) return 0 / 0;
      for (; o > a && !r[a + t * qrcode.width] && s[3] < n; ) s[3]++, a++;
      if (a == o || s[3] >= n) return 0 / 0;
      for (; o > a && r[a + t * qrcode.width] && s[4] < n; ) s[4]++, a++;
      return s[4] >= n ||
        5 * Math.abs(s[0] + s[1] + s[2] + s[3] + s[4] - i) >= i
        ? 0 / 0
        : this.foundPatternCross(s)
        ? this.centerFromEnd(s, a)
        : 0 / 0;
    }),
    (this.handlePossibleCenter = function (e, t, n) {
      var i = e[0] + e[1] + e[2] + e[3] + e[4];
      if (
        ((n = this.centerFromEnd(e, n)),
        (t = this.crossCheckVertical(t, Math.floor(n), e[2], i)),
        !isNaN(t) &&
          ((n = this.crossCheckHorizontal(
            Math.floor(n),
            Math.floor(t),
            e[2],
            i
          )),
          !isNaN(n)))
      ) {
        e = i / 7;
        for (var i = !1, r = this.possibleCenters.length, o = 0; r > o; o++) {
          var s = this.possibleCenters[o];
          if (s.aboutEquals(e, t, n)) {
            s.incrementCount(), (i = !0);
            break;
          }
        }
        return (
          i ||
            ((n = new FinderPattern(n, t, e)),
            this.possibleCenters.push(n),
            null != this.resultPointCallback &&
              this.resultPointCallback.foundPossibleResultPoint(n)),
          !0
        );
      }
      return !1;
    }),
    (this.selectBestPatterns = function () {
      var e = this.possibleCenters.length;
      if (3 > e) throw "Couldn't find enough finder patterns";
      if (e > 3) {
        for (var t = 0, n = 0; e > n; n++)
          t += this.possibleCenters[n].EstimatedModuleSize;
        for (
          e = t / e, n = 0;
          n < this.possibleCenters.length && 3 < this.possibleCenters.length;
          n++
        )
          Math.abs(this.possibleCenters[n].EstimatedModuleSize - e) > 0.2 * e &&
            (this.possibleCenters.remove(n), n--);
      }
      return [
        this.possibleCenters[0],
        this.possibleCenters[1],
        this.possibleCenters[2],
      ];
    }),
    (this.findRowSkip = function () {
      var e = this.possibleCenters.length;
      if (1 >= e) return 0;
      for (var t = null, n = 0; e > n; n++) {
        var i = this.possibleCenters[n];
        if (i.Count >= CENTER_QUORUM) {
          if (null != t)
            return (
              (this.hasSkipped = !0),
              Math.floor((Math.abs(t.X - i.X) - Math.abs(t.Y - i.Y)) / 2)
            );
          t = i;
        }
      }
      return 0;
    }),
    (this.haveMultiplyConfirmedCenters = function () {
      for (
        var e = 0, t = 0, n = this.possibleCenters.length, i = 0;
        n > i;
        i++
      ) {
        var r = this.possibleCenters[i];
        r.Count >= CENTER_QUORUM && (e++, (t += r.EstimatedModuleSize));
      }
      if (3 > e) return !1;
      for (var e = t / n, o = 0, i = 0; n > i; i++)
        (r = this.possibleCenters[i]),
          (o += Math.abs(r.EstimatedModuleSize - e));
      return 0.05 * t >= o;
    }),
    (this.findFinderPattern = function (e) {
      this.image = e;
      var t = qrcode.height,
        n = qrcode.width,
        i = Math.floor((3 * t) / (4 * MAX_MODULES));
      MIN_SKIP > i && (i = MIN_SKIP);
      for (var r = !1, o = Array(5), s = i - 1; t > s && !r; s += i) {
        (o[0] = 0), (o[1] = 0), (o[2] = 0), (o[3] = 0);
        for (var a = (o[4] = 0), h = 0; n > h; h++)
          if (e[h + s * qrcode.width]) 1 == (1 & a) && a++, o[a]++;
          else if (0 == (1 & a))
            if (4 == a)
              if (this.foundPatternCross(o)) {
                if ((a = this.handlePossibleCenter(o, s, h)))
                  (i = 2),
                    this.hasSkipped
                      ? (r = this.haveMultiplyConfirmedCenters())
                      : ((a = this.findRowSkip()),
                        a > o[2] && ((s += a - o[2] - i), (h = n - 1)));
                else {
                  do h++;
                  while (n > h && !e[h + s * qrcode.width]);
                  h--;
                }
                (a = 0),
                  (o[0] = 0),
                  (o[1] = 0),
                  (o[2] = 0),
                  (o[3] = 0),
                  (o[4] = 0);
              } else
                (o[0] = o[2]),
                  (o[1] = o[3]),
                  (o[2] = o[4]),
                  (o[3] = 1),
                  (o[4] = 0),
                  (a = 3);
            else o[++a]++;
          else o[a]++;
        this.foundPatternCross(o) &&
          this.handlePossibleCenter(o, s, n) &&
          ((i = o[0]), this.hasSkipped && (r = haveMultiplyConfirmedCenters()));
      }
      return (
        (e = this.selectBestPatterns()),
        qrcode.orderBestPatterns(e),
        new FinderPatternInfo(e)
      );
    });
}
function AlignmentPattern(e, t, n) {
  (this.x = e),
    (this.y = t),
    (this.count = 1),
    (this.estimatedModuleSize = n),
    this.__defineGetter__("EstimatedModuleSize", function () {
      return this.estimatedModuleSize;
    }),
    this.__defineGetter__("Count", function () {
      return this.count;
    }),
    this.__defineGetter__("X", function () {
      return Math.floor(this.x);
    }),
    this.__defineGetter__("Y", function () {
      return Math.floor(this.y);
    }),
    (this.incrementCount = function () {
      this.count++;
    }),
    (this.aboutEquals = function (e, t, n) {
      return Math.abs(t - this.y) <= e && Math.abs(n - this.x) <= e
        ? ((e = Math.abs(e - this.estimatedModuleSize)),
          1 >= e || 1 >= e / this.estimatedModuleSize)
        : !1;
    });
}
function AlignmentPatternFinder(e, t, n, i, r, o, s) {
  (this.image = e),
    (this.possibleCenters = []),
    (this.startX = t),
    (this.startY = n),
    (this.width = i),
    (this.height = r),
    (this.moduleSize = o),
    (this.crossCheckStateCount = [0, 0, 0]),
    (this.resultPointCallback = s),
    (this.centerFromEnd = function (e, t) {
      return t - e[2] - e[1] / 2;
    }),
    (this.foundPatternCross = function (e) {
      for (var t = this.moduleSize, n = t / 2, i = 0; 3 > i; i++)
        if (Math.abs(t - e[i]) >= n) return !1;
      return !0;
    }),
    (this.crossCheckVertical = function (e, t, n, i) {
      var r = this.image,
        o = qrcode.height,
        s = this.crossCheckStateCount;
      (s[0] = 0), (s[1] = 0), (s[2] = 0);
      for (var a = e; a >= 0 && r[t + a * qrcode.width] && s[1] <= n; )
        s[1]++, a--;
      if (0 > a || s[1] > n) return 0 / 0;
      for (; a >= 0 && !r[t + a * qrcode.width] && s[0] <= n; ) s[0]++, a--;
      if (s[0] > n) return 0 / 0;
      for (a = e + 1; o > a && r[t + a * qrcode.width] && s[1] <= n; )
        s[1]++, a++;
      if (a == o || s[1] > n) return 0 / 0;
      for (; o > a && !r[t + a * qrcode.width] && s[2] <= n; ) s[2]++, a++;
      return s[2] > n || 5 * Math.abs(s[0] + s[1] + s[2] - i) >= 2 * i
        ? 0 / 0
        : this.foundPatternCross(s)
        ? this.centerFromEnd(s, a)
        : 0 / 0;
    }),
    (this.handlePossibleCenter = function (e, t, n) {
      var i = e[0] + e[1] + e[2];
      if (
        ((n = this.centerFromEnd(e, n)),
        (t = this.crossCheckVertical(t, Math.floor(n), 2 * e[1], i)),
        !isNaN(t))
      ) {
        e = (e[0] + e[1] + e[2]) / 3;
        for (var i = this.possibleCenters.length, r = 0; i > r; r++)
          if (this.possibleCenters[r].aboutEquals(e, t, n))
            return new AlignmentPattern(n, t, e);
        (n = new AlignmentPattern(n, t, e)),
          this.possibleCenters.push(n),
          null != this.resultPointCallback &&
            this.resultPointCallback.foundPossibleResultPoint(n);
      }
      return null;
    }),
    (this.find = function () {
      for (
        var t = this.startX,
          r = this.height,
          o = t + i,
          s = n + (r >> 1),
          a = [0, 0, 0],
          h = 0;
        r > h;
        h++
      ) {
        var c = s + (0 == (1 & h) ? (h + 1) >> 1 : -((h + 1) >> 1));
        (a[0] = 0), (a[1] = 0), (a[2] = 0);
        for (var l = t; o > l && !e[l + qrcode.width * c]; ) l++;
        for (var f = 0; o > l; ) {
          if (e[l + c * qrcode.width])
            if (1 == f) a[f]++;
            else if (2 == f) {
              if (
                this.foundPatternCross(a) &&
                ((f = this.handlePossibleCenter(a, c, l)), null != f)
              )
                return f;
              (a[0] = a[2]), (a[1] = 1), (a[2] = 0), (f = 1);
            } else a[++f]++;
          else 1 == f && f++, a[f]++;
          l++;
        }
        if (
          this.foundPatternCross(a) &&
          ((f = this.handlePossibleCenter(a, c, o)), null != f)
        )
          return f;
      }
      if (0 != this.possibleCenters.length) return this.possibleCenters[0];
      throw "Couldn't find enough alignment patterns";
    });
}
function QRCodeDataBlockReader(e, t, n) {
  (this.blockPointer = 0),
    (this.bitPointer = 7),
    (this.dataLength = 0),
    (this.blocks = e),
    (this.numErrorCorrectionCode = n),
    9 >= t
      ? (this.dataLengthMode = 0)
      : t >= 10 && 26 >= t
      ? (this.dataLengthMode = 1)
      : t >= 27 && 40 >= t && (this.dataLengthMode = 2),
    (this.getNextBits = function (e) {
      var t = 0;
      if (e < this.bitPointer + 1) {
        for (var n = 0, t = 0; e > t; t++) n += 1 << t;
        return (
          (n <<= this.bitPointer - e + 1),
          (t =
            (this.blocks[this.blockPointer] & n) >> (this.bitPointer - e + 1)),
          (this.bitPointer -= e),
          t
        );
      }
      if (e < this.bitPointer + 1 + 8) {
        for (var i = 0, t = 0; t < this.bitPointer + 1; t++) i += 1 << t;
        return (
          (t =
            (this.blocks[this.blockPointer] & i) <<
            (e - (this.bitPointer + 1))),
          this.blockPointer++,
          (t +=
            this.blocks[this.blockPointer] >>
            (8 - (e - (this.bitPointer + 1)))),
          (this.bitPointer -= e % 8),
          0 > this.bitPointer && (this.bitPointer = 8 + this.bitPointer),
          t
        );
      }
      if (e < this.bitPointer + 1 + 16) {
        for (t = n = i = 0; t < this.bitPointer + 1; t++) i += 1 << t;
        (i =
          (this.blocks[this.blockPointer] & i) << (e - (this.bitPointer + 1))),
          this.blockPointer++;
        var r =
          this.blocks[this.blockPointer] << (e - (this.bitPointer + 1 + 8));
        for (this.blockPointer++, t = 0; t < e - (this.bitPointer + 1 + 8); t++)
          n += 1 << t;
        return (
          (n <<= 8 - (e - (this.bitPointer + 1 + 8))),
          (t =
            i +
            r +
            ((this.blocks[this.blockPointer] & n) >>
              (8 - (e - (this.bitPointer + 1 + 8))))),
          (this.bitPointer -= (e - 8) % 8),
          0 > this.bitPointer && (this.bitPointer = 8 + this.bitPointer),
          t
        );
      }
      return 0;
    }),
    (this.NextMode = function () {
      return this.blockPointer >
        this.blocks.length - this.numErrorCorrectionCode - 2
        ? 0
        : this.getNextBits(4);
    }),
    (this.getDataLength = function (e) {
      for (var t = 0; 1 != e >> t; ) t++;
      return this.getNextBits(
        qrcode.sizeOfDataLengthInfo[this.dataLengthMode][t]
      );
    }),
    (this.getRomanAndFigureString = function (e) {
      var t = 0,
        n = "",
        i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
      do
        if (e > 1) {
          var t = this.getNextBits(11),
            r = t % 45,
            n = n + i[Math.floor(t / 45)],
            n = n + i[r];
          e -= 2;
        } else 1 == e && ((t = this.getNextBits(6)), (n += i[t]), (e -= 1));
      while (e > 0);
      return n;
    }),
    (this.getFigureString = function (e) {
      var t = 0,
        n = "";
      do
        e >= 3
          ? ((t = this.getNextBits(10)),
            100 > t && (n += "0"),
            10 > t && (n += "0"),
            (e -= 3))
          : 2 == e
          ? ((t = this.getNextBits(7)), 10 > t && (n += "0"), (e -= 2))
          : 1 == e && ((t = this.getNextBits(4)), (e -= 1)),
          (n += t);
      while (e > 0);
      return n;
    }),
    (this.get8bitByteArray = function (e) {
      var t = 0,
        n = [];
      do (t = this.getNextBits(8)), n.push(t), e--;
      while (e > 0);
      return n;
    }),
    (this.getKanjiString = function (e) {
      var t = 0,
        n = "";
      do {
        var t = getNextBits(13),
          t = ((t / 192) << 8) + (t % 192),
          i = 0,
          i = 40956 >= t + 33088 ? t + 33088 : t + 49472,
          n = n + String.fromCharCode(i);
        e--;
      } while (e > 0);
      return n;
    }),
    this.__defineGetter__("DataByte", function () {
      for (var e = []; ; ) {
        var t = this.NextMode();
        if (0 == t) {
          if (0 < e.length) break;
          throw "Empty data block";
        }
        if (1 != t && 2 != t && 4 != t && 8 != t)
          throw (
            "Invalid mode: " +
            t +
            " in (block:" +
            this.blockPointer +
            " bit:" +
            this.bitPointer +
            ")"
          );
        if (((dataLength = this.getDataLength(t)), 1 > dataLength))
          throw "Invalid data length: " + dataLength;
        switch (t) {
          case 1:
            for (
              var t = this.getFigureString(dataLength),
                n = Array(t.length),
                i = 0;
              i < t.length;
              i++
            )
              n[i] = t.charCodeAt(i);
            e.push(n);
            break;
          case 2:
            for (
              t = this.getRomanAndFigureString(dataLength),
                n = Array(t.length),
                i = 0;
              i < t.length;
              i++
            )
              n[i] = t.charCodeAt(i);
            e.push(n);
            break;
          case 4:
            (t = this.get8bitByteArray(dataLength)), e.push(t);
            break;
          case 8:
            (t = this.getKanjiString(dataLength)), e.push(t);
        }
      }
      return e;
    });
}
(GridSampler = {
  checkAndNudgePoints: function (e, t) {
    for (
      var n = qrcode.width, i = qrcode.height, r = !0, o = 0;
      o < t.Length && r;
      o += 2
    ) {
      var s = Math.floor(t[o]),
        a = Math.floor(t[o + 1]);
      if (-1 > s || s > n || -1 > a || a > i)
        throw "Error.checkAndNudgePoints ";
      (r = !1),
        -1 == s ? ((t[o] = 0), (r = !0)) : s == n && ((t[o] = n - 1), (r = !0)),
        -1 == a
          ? ((t[o + 1] = 0), (r = !0))
          : a == i && ((t[o + 1] = i - 1), (r = !0));
    }
    for (r = !0, o = t.Length - 2; o >= 0 && r; o -= 2) {
      if (
        ((s = Math.floor(t[o])),
        (a = Math.floor(t[o + 1])),
        -1 > s || s > n || -1 > a || a > i)
      )
        throw "Error.checkAndNudgePoints ";
      (r = !1),
        -1 == s ? ((t[o] = 0), (r = !0)) : s == n && ((t[o] = n - 1), (r = !0)),
        -1 == a
          ? ((t[o + 1] = 0), (r = !0))
          : a == i && ((t[o + 1] = i - 1), (r = !0));
    }
  },
  sampleGrid3: function (e, t, n) {
    for (var i = new BitMatrix(t), r = Array(t << 1), o = 0; t > o; o++) {
      for (var s = r.length, a = o + 0.5, h = 0; s > h; h += 2)
        (r[h] = (h >> 1) + 0.5), (r[h + 1] = a);
      n.transformPoints1(r), GridSampler.checkAndNudgePoints(e, r);
      try {
        for (h = 0; s > h; h += 2) {
          var c =
              4 * Math.floor(r[h]) + 4 * Math.floor(r[h + 1]) * qrcode.width,
            l = e[Math.floor(r[h]) + qrcode.width * Math.floor(r[h + 1])];
          (qrcode.imagedata.data[c] = l ? 255 : 0),
            (qrcode.imagedata.data[c + 1] = l ? 255 : 0),
            (qrcode.imagedata.data[c + 2] = 0),
            (qrcode.imagedata.data[c + 3] = 255),
            l && i.set_Renamed(h >> 1, o);
        }
      } catch (f) {
        throw "Error.checkAndNudgePoints";
      }
    }
    return i;
  },
  sampleGridx: function (e, t, n, i, r, o, s, a, h, c, l, f, d, w, u, C, E, B) {
    return (
      (n = PerspectiveTransform.quadrilateralToQuadrilateral(
        n,
        i,
        r,
        o,
        s,
        a,
        h,
        c,
        l,
        f,
        d,
        w,
        u,
        C,
        E,
        B
      )),
      GridSampler.sampleGrid3(e, t, n)
    );
  },
}),
  (Version.VERSION_DECODE_INFO = [
    31892,
    34236,
    39577,
    42195,
    48118,
    51042,
    55367,
    58893,
    63784,
    68472,
    70749,
    76311,
    79154,
    84390,
    87683,
    92361,
    96236,
    102084,
    102881,
    110507,
    110734,
    117786,
    119615,
    126325,
    127568,
    133589,
    136944,
    141498,
    145311,
    150283,
    152622,
    158308,
    161089,
    167017,
  ]),
  (Version.VERSIONS = buildVersions()),
  (Version.getVersionForNumber = function (e) {
    if (1 > e || e > 40) throw "ArgumentException";
    return Version.VERSIONS[e - 1];
  }),
  (Version.getProvisionalVersionForDimension = function (e) {
    if (1 != e % 4) throw "Error getProvisionalVersionForDimension";
    try {
      return Version.getVersionForNumber((e - 17) >> 2);
    } catch (t) {
      throw "Error getVersionForNumber";
    }
  }),
  (Version.decodeVersionInformation = function (e) {
    for (
      var t = 4294967295, n = 0, i = 0;
      i < Version.VERSION_DECODE_INFO.length;
      i++
    ) {
      var r = Version.VERSION_DECODE_INFO[i];
      if (r == e) return this.getVersionForNumber(i + 7);
      (r = FormatInformation.numBitsDiffering(e, r)),
        t > r && ((n = i + 7), (t = r));
    }
    return 3 >= t ? this.getVersionForNumber(n) : null;
  }),
  (PerspectiveTransform.quadrilateralToQuadrilateral = function (
    e,
    t,
    n,
    i,
    r,
    o,
    s,
    a,
    h,
    c,
    l,
    f,
    d,
    w,
    u,
    C
  ) {
    return (
      (e = this.quadrilateralToSquare(e, t, n, i, r, o, s, a)),
      this.squareToQuadrilateral(h, c, l, f, d, w, u, C).times(e)
    );
  }),
  (PerspectiveTransform.squareToQuadrilateral = function (
    e,
    t,
    n,
    i,
    r,
    o,
    s,
    a
  ) {
    return (
      (dy2 = a - o),
      (dy3 = t - i + o - a),
      0 == dy2 && 0 == dy3
        ? new PerspectiveTransform(n - e, r - n, e, i - t, o - i, t, 0, 0, 1)
        : ((dx1 = n - r),
          (dx2 = s - r),
          (dx3 = e - n + r - s),
          (dy1 = i - o),
          (denominator = dx1 * dy2 - dx2 * dy1),
          (a13 = (dx3 * dy2 - dx2 * dy3) / denominator),
          (a23 = (dx1 * dy3 - dx3 * dy1) / denominator),
          new PerspectiveTransform(
            n - e + a13 * n,
            s - e + a23 * s,
            e,
            i - t + a13 * i,
            a - t + a23 * a,
            t,
            a13,
            a23,
            1
          ))
    );
  }),
  (PerspectiveTransform.quadrilateralToSquare = function (
    e,
    t,
    n,
    i,
    r,
    o,
    s,
    a
  ) {
    return this.squareToQuadrilateral(e, t, n, i, r, o, s, a).buildAdjoint();
  });
var FORMAT_INFO_MASK_QR = 21522,
  FORMAT_INFO_DECODE_LOOKUP = [
    [21522, 0],
    [20773, 1],
    [24188, 2],
    [23371, 3],
    [17913, 4],
    [16590, 5],
    [20375, 6],
    [19104, 7],
    [30660, 8],
    [29427, 9],
    [32170, 10],
    [30877, 11],
    [26159, 12],
    [25368, 13],
    [27713, 14],
    [26998, 15],
    [5769, 16],
    [5054, 17],
    [7399, 18],
    [6608, 19],
    [1890, 20],
    [597, 21],
    [3340, 22],
    [2107, 23],
    [13663, 24],
    [12392, 25],
    [16177, 26],
    [14854, 27],
    [9396, 28],
    [8579, 29],
    [11994, 30],
    [11245, 31],
  ],
  BITS_SET_IN_HALF_BYTE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
(FormatInformation.numBitsDiffering = function (e, t) {
  return (
    (e ^= t),
    BITS_SET_IN_HALF_BYTE[15 & e] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 4)] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 8)] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 12)] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 16)] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 20)] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 24)] +
      BITS_SET_IN_HALF_BYTE[15 & URShift(e, 28)]
  );
}),
  (FormatInformation.decodeFormatInformation = function (e) {
    var t = FormatInformation.doDecodeFormatInformation(e);
    return null != t
      ? t
      : FormatInformation.doDecodeFormatInformation(e ^ FORMAT_INFO_MASK_QR);
  }),
  (FormatInformation.doDecodeFormatInformation = function (e) {
    for (
      var t = 4294967295, n = 0, i = 0;
      i < FORMAT_INFO_DECODE_LOOKUP.length;
      i++
    ) {
      var r = FORMAT_INFO_DECODE_LOOKUP[i],
        o = r[0];
      if (o == e) return new FormatInformation(r[1]);
      (o = this.numBitsDiffering(e, o)), t > o && ((n = r[1]), (t = o));
    }
    return 3 >= t ? new FormatInformation(n) : null;
  }),
  (ErrorCorrectionLevel.forBits = function (e) {
    if (0 > e || e >= FOR_BITS.Length) throw "ArgumentException";
    return FOR_BITS[e];
  });
var L = new ErrorCorrectionLevel(0, 1, "L"),
  M = new ErrorCorrectionLevel(1, 0, "M"),
  Q = new ErrorCorrectionLevel(2, 3, "Q"),
  H = new ErrorCorrectionLevel(3, 2, "H"),
  FOR_BITS = [M, L, H, Q];
(DataBlock.getDataBlocks = function (e, t, n) {
  if (e.length != t.TotalCodewords) throw "ArgumentException";
  var i = t.getECBlocksForLevel(n);
  n = 0;
  var r = i.getECBlocks();
  for (t = 0; t < r.length; t++) n += r[t].Count;
  n = Array(n);
  for (var o = 0, s = 0; s < r.length; s++) {
    var a = r[s];
    for (t = 0; t < a.Count; t++) {
      var h = a.DataCodewords,
        c = i.ECCodewordsPerBlock + h;
      n[o++] = new DataBlock(h, Array(c));
    }
  }
  for (
    t = n[0].codewords.length, r = n.length - 1;
    r >= 0 && n[r].codewords.length != t;

  )
    r--;
  for (r++, i = t - i.ECCodewordsPerBlock, t = a = 0; i > t; t++)
    for (s = 0; o > s; s++) n[s].codewords[t] = e[a++];
  for (s = r; o > s; s++) n[s].codewords[i] = e[a++];
  for (h = n[0].codewords.length, t = i; h > t; t++)
    for (s = 0; o > s; s++) n[s].codewords[r > s ? t : t + 1] = e[a++];
  return n;
}),
  (DataMask = {
    forReference: function (e) {
      if (0 > e || e > 7) throw "System.ArgumentException";
      return DataMask.DATA_MASKS[e];
    },
  }),
  (DataMask.DATA_MASKS = [
    new DataMask000(),
    new DataMask001(),
    new DataMask010(),
    new DataMask011(),
    new DataMask100(),
    new DataMask101(),
    new DataMask110(),
    new DataMask111(),
  ]),
  (GF256.QR_CODE_FIELD = new GF256(285)),
  (GF256.DATA_MATRIX_FIELD = new GF256(301)),
  (GF256.addOrSubtract = function (e, t) {
    return e ^ t;
  }),
  (Decoder = {}),
  (Decoder.rsDecoder = new ReedSolomonDecoder(GF256.QR_CODE_FIELD)),
  (Decoder.correctErrors = function (e, t) {
    for (var n = e.length, i = Array(n), r = 0; n > r; r++) i[r] = 255 & e[r];
    n = e.length - t;
    try {
      Decoder.rsDecoder.decode(i, n);
    } catch (o) {
      throw o;
    }
    for (r = 0; t > r; r++) e[r] = i[r];
  }),
  (Decoder.decode = function (e) {
    var t = new BitMatrixParser(e);
    e = t.readVersion();
    for (
      var n = t.readFormatInformation().ErrorCorrectionLevel,
        t = t.readCodewords(),
        t = DataBlock.getDataBlocks(t, e, n),
        i = 0,
        r = 0;
      r < t.Length;
      r++
    )
      i += t[r].NumDataCodewords;
    for (var i = Array(i), o = 0, s = 0; s < t.length; s++) {
      var r = t[s],
        a = r.Codewords,
        h = r.NumDataCodewords;
      for (Decoder.correctErrors(a, h), r = 0; h > r; r++) i[o++] = a[r];
    }
    return new QRCodeDataBlockReader(i, e.VersionNumber, n.Bits);
  }),
  (qrcode = {
    imagedata: null,
    width: 0,
    height: 0,
    qrCodeSymbol: null,
    debug: !1,
    sizeOfDataLengthInfo: [
      [10, 9, 8, 8],
      [12, 11, 16, 10],
      [14, 13, 16, 12],
    ],
    callback: null,
    decode: function (e) {
      if (0 == arguments.length) {
        var t = document.getElementById("qr-canvas"),
          n = t.getContext("2d");
        return (
          (qrcode.width = t.width),
          (qrcode.height = t.height),
          (qrcode.imagedata = n.getImageData(
            0,
            0,
            qrcode.width,
            qrcode.height
          )),
          (qrcode.result = qrcode.process(n)),
          null != qrcode.callback && qrcode.callback(qrcode.result),
          qrcode.result
        );
      }
      var i = new Image();
      (i.onload = function () {
        var e = document.createElement("canvas"),
          t = e.getContext("2d"),
          n = document.getElementById("out-canvas");
        null != n &&
          ((n = n.getContext("2d")),
          n.clearRect(0, 0, 320, 240),
          n.drawImage(i, 0, 0, 320, 240)),
          (e.width = i.width),
          (e.height = i.height),
          t.drawImage(i, 0, 0),
          (qrcode.width = i.width),
          (qrcode.height = i.height);
        try {
          qrcode.imagedata = t.getImageData(0, 0, i.width, i.height);
        } catch (r) {
          return (
            (qrcode.result =
              "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!"),
            void (null != qrcode.callback && qrcode.callback(qrcode.result))
          );
        }
        try {
          qrcode.result = qrcode.process(t);
        } catch (o) {
          console.log(o), (qrcode.result = "error decoding QR Code");
        }
        null != qrcode.callback && qrcode.callback(qrcode.result);
      }),
        (i.src = e);
    },
    decode_utf8: function (e) {
      return decodeURIComponent(escape(e));
    },
    process: function (e) {
      var t = new Date().getTime(),
        n = qrcode.grayScaleToBitmap(qrcode.grayscale());
      if (qrcode.debug) {
        for (var i = 0; i < qrcode.height; i++)
          for (var r = 0; r < qrcode.width; r++) {
            var o = 4 * r + 4 * i * qrcode.width;
            (qrcode.imagedata.data[o] = 0),
              (qrcode.imagedata.data[o + 1] = 0),
              (qrcode.imagedata.data[o + 2] = n[r + i * qrcode.width]
                ? 255
                : 0);
          }
        e.putImageData(qrcode.imagedata, 0, 0);
      }
      for (
        n = new Detector(n).detect(),
          qrcode.debug && e.putImageData(qrcode.imagedata, 0, 0),
          n = Decoder.decode(n.bits).DataByte,
          e = "",
          i = 0;
        i < n.length;
        i++
      )
        for (r = 0; r < n[i].length; r++) e += String.fromCharCode(n[i][r]);
      return (
        (t = new Date().getTime() - t), console.log(t), qrcode.decode_utf8(e)
      );
    },
    getPixel: function (e, t) {
      if (qrcode.width < e) throw "point error";
      if (qrcode.height < t) throw "point error";
      return (
        (point = 4 * e + 4 * t * qrcode.width),
        (p =
          (33 * qrcode.imagedata.data[point] +
            34 * qrcode.imagedata.data[point + 1] +
            33 * qrcode.imagedata.data[point + 2]) /
          100)
      );
    },
    binarize: function (e) {
      for (
        var t = Array(qrcode.width * qrcode.height), n = 0;
        n < qrcode.height;
        n++
      )
        for (var i = 0; i < qrcode.width; i++) {
          var r = qrcode.getPixel(i, n);
          t[i + n * qrcode.width] = e >= r ? !0 : !1;
        }
      return t;
    },
    getMiddleBrightnessPerArea: function (e) {
      for (
        var t = Math.floor(qrcode.width / 4),
          n = Math.floor(qrcode.height / 4),
          i = Array(4),
          r = 0;
        4 > r;
        r++
      ) {
        i[r] = Array(4);
        for (var o = 0; 4 > o; o++) i[r][o] = [0, 0];
      }
      for (r = 0; 4 > r; r++)
        for (o = 0; 4 > o; o++) {
          i[o][r][0] = 255;
          for (var s = 0; n > s; s++)
            for (var a = 0; t > a; a++) {
              var h = e[t * o + a + (n * r + s) * qrcode.width];
              h < i[o][r][0] && (i[o][r][0] = h),
                h > i[o][r][1] && (i[o][r][1] = h);
            }
        }
      for (e = Array(4), t = 0; 4 > t; t++) e[t] = Array(4);
      for (r = 0; 4 > r; r++)
        for (o = 0; 4 > o; o++)
          e[o][r] = Math.floor((i[o][r][0] + i[o][r][1]) / 2);
      return e;
    },
    grayScaleToBitmap: function (e) {
      for (
        var t = qrcode.getMiddleBrightnessPerArea(e),
          n = t.length,
          i = Math.floor(qrcode.width / n),
          r = Math.floor(qrcode.height / n),
          o = Array(qrcode.height * qrcode.width),
          s = 0;
        n > s;
        s++
      )
        for (var a = 0; n > a; a++)
          for (var h = 0; r > h; h++)
            for (var c = 0; i > c; c++)
              o[i * a + c + (r * s + h) * qrcode.width] =
                e[i * a + c + (r * s + h) * qrcode.width] < t[a][s] ? !0 : !1;
      return o;
    },
    grayscale: function () {
      for (
        var e = Array(qrcode.width * qrcode.height), t = 0;
        t < qrcode.height;
        t++
      )
        for (var n = 0; n < qrcode.width; n++) {
          var i = qrcode.getPixel(n, t);
          e[n + t * qrcode.width] = i;
        }
      return e;
    },
  }),
  (Array.prototype.remove = function (e, t) {
    var n = this.slice((t || e) + 1 || this.length);
    return (
      (this.length = 0 > e ? this.length + e : e), this.push.apply(this, n)
    );
  });
var MIN_SKIP = 3,
  MAX_MODULES = 57,
  INTEGER_MATH_SHIFT = 8,
  CENTER_QUORUM = 2;
qrcode.orderBestPatterns = function (e) {
  function t(e, t) {
    return (
      (xDiff = e.X - t.X),
      (yDiff = e.Y - t.Y),
      Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    );
  }
  var n = t(e[0], e[1]),
    i = t(e[1], e[2]),
    r = t(e[0], e[2]);
  i >= n && i >= r
    ? ((i = e[0]), (n = e[1]), (r = e[2]))
    : r >= i && r >= n
    ? ((i = e[1]), (n = e[0]), (r = e[2]))
    : ((i = e[2]), (n = e[0]), (r = e[1]));
  var o = i.x,
    s = i.y;
  0 > (r.x - o) * (n.y - s) - (r.y - s) * (n.x - o) &&
    ((o = n), (n = r), (r = o)),
    (e[0] = n),
    (e[1] = i),
    (e[2] = r);
};

/** html5qrcode js below */
("use strict");
function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]),
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      "value" in c && (c.writable = !0),
      Object.defineProperty(a, c.key, c);
}
function _createClass(a, b, c) {
  return (
    b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
  );
}
function _defineProperty(a, b, c) {
  return (
    b in a
      ? Object.defineProperty(a, b, {
          value: c,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (a[b] = c),
    a
  );
}
var Html5Qrcode = (function () {
  function a(b, c) {
    if ((_classCallCheck(this, a), !qrcode))
      throw "qrcode is not defined, use the minified/html5-qrcode.min.js for proper support";
    (this._elementId = b),
      (this._foreverScanTimeout = null),
      (this._localMediaStream = null),
      (this._shouldScan = !0),
      (this._url =
        window.URL || window.webkitURL || window.mozURL || window.msURL),
      (this._userMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia),
      (this._isScanning = !1),
      (a.VERBOSE = !0 === c);
  }
  return (
    _createClass(
      a,
      [
        {
          key: "start",
          value: function (b, c, d, e) {
            var f = this;
            if (!b) throw "cameraId is required";
            if (!d || "function" != typeof d)
              throw "qrCodeSuccessCallback is required and should be a function.";
            e || (e = console.log), this._clearElement();
            var g = this,
              h = c ? c : {};
            h.fps = h.fps ? h.fps : a.SCAN_DEFAULT_FPS;
            var i = null != h.qrbox,
              j = document.getElementById(this._elementId),
              k = j.clientWidth ? j.clientWidth : a.DEFAULT_WIDTH;
            if (
              ((j.style.position = "relative"),
              (this._shouldScan = !0),
              (this._element = j),
              (qrcode.callback = d),
              i)
            ) {
              var l = h.qrbox;
              if (l < a.MIN_QR_BOX_SIZE)
                throw (
                  "minimum size of 'config.qrbox' is" +
                  " ".concat(a.MIN_QR_BOX_SIZE, "px.")
                );
              if (l > k)
                throw "'config.qrbox' should not be greater than the width of the HTML element.";
            }
            var m = function (a, b) {
                var c = h.qrbox;
                c > b &&
                  console.warn(
                    "[Html5Qrcode] config.qrboxsize is greater than video height. Shading will be ignored"
                  );
                var d = i && c <= b,
                  e = d
                    ? f._getShadedRegionBounds(a, b, c)
                    : { x: 0, y: 0, width: a, height: b },
                  k = f._createCanvasElement(e.width, e.height),
                  l = k.getContext("2d");
                (l.canvas.width = e.width),
                  (l.canvas.height = e.height),
                  j.append(k),
                  d && f._possiblyInsertShadingElement(j, b, e),
                  (g._qrRegion = e),
                  (g._context = l),
                  (g._canvasElement = k);
              },
              n = function b() {
                if (g._shouldScan) {
                  if (g._localMediaStream) {
                    var c = g._videoElement,
                      d = c.videoWidth / c.clientWidth,
                      i = c.videoHeight / c.clientHeight,
                      j = g._qrRegion.width * d,
                      k = g._qrRegion.height * i;
                    g._context.drawImage(
                      g._videoElement,
                      g._qrRegion.x,
                      g._qrRegion.y,
                      j,
                      k,
                      0,
                      0,
                      g._qrRegion.width,
                      g._qrRegion.height
                    );
                    try {
                      qrcode.decode(), f._possiblyUpdateShaders(!0);
                    } catch (a) {
                      f._possiblyUpdateShaders(!1),
                        e("QR code parse error, error = ".concat(a));
                    }
                  }
                  g._foreverScanTimeout = setTimeout(
                    b,
                    a._getTimeoutFps(h.fps)
                  );
                }
              },
              o = function (a) {
                return new Promise(function (b, c) {
                  (g._localMediaStream = a),
                    (function () {
                      var d = f._createVideoElement(k);
                      g._element.append(d),
                        (d.onabort = c),
                        (d.onerror = c),
                        (d.onplaying = function () {
                          var a = d.clientWidth,
                            c = d.clientHeight;
                          m(a, c), n(), b();
                        }),
                        (d.srcObject = a),
                        d.play(),
                        (g._videoElement = d);
                    })();
                });
              };
            return new Promise(function (a, c) {
              if (
                navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia
              ) {
                navigator.mediaDevices
                  .getUserMedia({
                    audio: !1,
                    video: { deviceId: { exact: b } },
                  })
                  .then(function (b) {
                    o(b)
                      .then(function () {
                        (g._isScanning = !0), a();
                      })
                      ["catch"](c);
                  })
                  ["catch"](function (a) {
                    c("Error getting userMedia, error = ".concat(a));
                  });
              } else if (navigator.getUserMedia) {
                navigator.getUserMedia(
                  { video: { optional: [{ sourceId: b }] } },
                  function (b) {
                    o(b)
                      .then(function () {
                        (g._isScanning = !0), a();
                      })
                      ["catch"](c);
                  },
                  function (a) {
                    c("Error getting userMedia, error = ".concat(a));
                  }
                );
              } else c("Web camera streaming not supported by the browser.");
            });
          },
        },
        {
          key: "stop",
          value: function () {
            (this._shouldScan = !1), clearTimeout(this._foreverScanTimeout);
            var b = this;
            return new Promise(function (c) {
              qrcode.callback = null;
              var d = b._localMediaStream.getVideoTracks().length,
                e = 0,
                f = function () {
                  for (
                    ;
                    b._element.getElementsByClassName(a.SHADED_REGION_CLASSNAME)
                      .length;

                  ) {
                    var c = b._element.getElementsByClassName(
                      a.SHADED_REGION_CLASSNAME
                    )[0];
                    b._element.removeChild(c);
                  }
                },
                g = function () {
                  (b._localMediaStream = null),
                    b._element.removeChild(b._videoElement),
                    b._element.removeChild(b._canvasElement),
                    f(),
                    (b._isScanning = !1),
                    b._qrRegion && (b._qrRegion = null),
                    b._context && (b._context = null),
                    c(!0);
                };
              b._localMediaStream.getVideoTracks().forEach(function (a) {
                a.stop(), ++e, e >= d && g();
              });
            });
          },
        },
        {
          key: "scanFile",
          value: function (b, c) {
            var d = this;
            if (!b || !(b instanceof File))
              throw "imageFile argument is mandatory and should be instance of File. Use 'event.target.files[0]'";
            if (((c = void 0 === c || c), d._isScanning))
              throw "Close ongoing scan before scanning a file.";
            var e = function b(c, d, e, f) {
              if (c <= e && d <= f) {
                var g = (e - c) / 2,
                  h = (f - d) / 2;
                return { x: g, y: h, width: c, height: d };
              }
              var i = c,
                j = d;
              return (
                c > e && ((d = (e / c) * d), (c = e)),
                d > f && ((c = (f / d) * c), (d = f)),
                a._log(
                  "Image downsampled from " +
                    "".concat(i, "X").concat(j) +
                    " to ".concat(c, "X").concat(d, ".")
                ),
                b(c, d, e, f)
              );
            };
            return new Promise(function (f, g) {
              d._possiblyCloseLastScanImageFile(),
                d._clearElement(),
                (d._lastScanImageFile = b);
              var h = new Image();
              (h.onload = function () {
                var b = h.width,
                  i = h.height,
                  j = document.getElementById(d._elementId),
                  k = j.clientWidth ? j.clientWidth : a.DEFAULT_WIDTH,
                  l = j.clientHeight ? j.clientHeight : i,
                  m = e(b, i, k, l);
                if (c) {
                  var n = d._createCanvasElement(k, l, "qr-canvas-visible");
                  (n.style.display = "inline-block"), j.appendChild(n);
                  var o = n.getContext("2d");
                  (o.canvas.width = k),
                    (o.canvas.height = l),
                    o.drawImage(h, 0, 0, b, i, m.x, m.y, m.width, m.height);
                }
                var p = d._createCanvasElement(m.width, m.height);
                j.appendChild(p);
                var q = p.getContext("2d");
                (q.canvas.width = m.width),
                  (q.canvas.height = m.height),
                  q.drawImage(h, 0, 0, b, i, 0, 0, m.width, m.height);
                try {
                  f(qrcode.decode());
                } catch (a) {
                  g("QR code parse error, error = ".concat(a));
                }
              }),
                (h.onerror = g),
                (h.onabort = g),
                (h.onstalled = g),
                (h.onsuspend = g),
                (h.src = URL.createObjectURL(b));
            });
          },
        },
        {
          key: "clear",
          value: function () {
            this._clearElement();
          },
        },
        {
          key: "_clearElement",
          value: function () {
            if (this._isScanning)
              throw "Cannot clear while scan is ongoing, close it first.";
            var a = document.getElementById(this._elementId);
            a.innerHTML = "";
          },
        },
        {
          key: "_createCanvasElement",
          value: function (a, b, c) {
            var d = document.createElement("canvas");
            return (
              (d.style.width = "".concat(a, "px")),
              (d.style.height = "".concat(b, "px")),
              (d.style.display = "none"),
              (d.id = null == c ? "qr-canvas" : c),
              d
            );
          },
        },
        {
          key: "_createVideoElement",
          value: function (a) {
            var b = document.createElement("video");
            return (
              (b.style.width = "".concat(a, "px")),
              (b.muted = !0),
              (b.playsInline = !0),
              b
            );
          },
        },
        {
          key: "_getShadedRegionBounds",
          value: function (a, b, c) {
            if (c > a || c > b)
              throw "'config.qrbox' should not be greater than the width and height of the HTML element.";
            return { x: (a - c) / 2, y: (b - c) / 2, width: c, height: c };
          },
        },
        {
          key: "_possiblyInsertShadingElement",
          value: function (b, c, d) {
            var e = this;
            if (0 != d.x || 0 != d.y) {
              var f = {};
              (f[a.SHADED_LEFT] = this._createShadedElement(
                c,
                d,
                a.SHADED_LEFT
              )),
                (f[a.SHADED_RIGHT] = this._createShadedElement(
                  c,
                  d,
                  a.SHADED_RIGHT
                )),
                (f[a.SHADED_TOP] = this._createShadedElement(
                  c,
                  d,
                  a.SHADED_TOP
                )),
                (f[a.SHADED_BOTTOM] = this._createShadedElement(
                  c,
                  d,
                  a.SHADED_BOTTOM
                )),
                Object.keys(f).forEach(function (a) {
                  return b.append(f[a]);
                }),
                10 > d.x || 10 > d.y
                  ? (this.hasBorderShaders = !1)
                  : (Object.keys(f).forEach(function (a) {
                      return e._insertShaderBorders(f[a], d, a);
                    }),
                    (this.hasBorderShaders = !0));
            }
          },
        },
        {
          key: "_createShadedElement",
          value: function (b, c, d) {
            var e = document.createElement("div");
            switch (
              ((e.style.position = "absolute"),
              (e.style.height = "".concat(b, "px")),
              (e.className = a.SHADED_REGION_CLASSNAME),
              (e.id = "".concat(a.SHADED_REGION_CLASSNAME, "_").concat(d)),
              (e.style.background = "#0000007a"),
              d)
            ) {
              case a.SHADED_LEFT:
                (e.style.top = "0px"),
                  (e.style.left = "0px"),
                  (e.style.width = "".concat(c.x, "px")),
                  (e.style.height = "".concat(b, "px"));
                break;
              case a.SHADED_RIGHT:
                (e.style.top = "0px"),
                  (e.style.right = "0px"),
                  (e.style.width = "".concat(c.x, "px")),
                  (e.style.height = "".concat(b, "px"));
                break;
              case a.SHADED_TOP:
                (e.style.top = "0px"),
                  (e.style.left = "".concat(c.x, "px")),
                  (e.style.width = "".concat(c.width, "px")),
                  (e.style.height = "".concat(c.y, "px"));
                break;
              case a.SHADED_BOTTOM:
                var f = c.y + c.height;
                (e.style.top = "".concat(f, "px")),
                  (e.style.left = "".concat(c.x, "px")),
                  (e.style.width = "".concat(c.width, "px")),
                  (e.style.height = "".concat(c.y, "px"));
                break;
              default:
                throw "Unsupported shadingPosition";
            }
            return e;
          },
        },
        {
          key: "_insertShaderBorders",
          value: function (b, c, d) {
            d = parseInt(d);
            var e = this,
              f = 5,
              g = 5,
              h = 40,
              i = function () {
                var b = document.createElement("div");
                switch (
                  ((b.style.position = "absolute"),
                  (b.style.backgroundColor = a.BORDER_SHADER_DEFAULT_COLOR),
                  d)
                ) {
                  case a.SHADED_LEFT:
                  case a.SHADED_RIGHT:
                    (b.style.width = "".concat(g, "px")),
                      (b.style.height = "".concat(h + f, "px"));
                    break;
                  case a.SHADED_TOP:
                  case a.SHADED_BOTTOM:
                    (b.style.width = "".concat(h + f, "px")),
                      (b.style.height = "".concat(g, "px"));
                    break;
                  default:
                    throw "Unsupported shadingPosition";
                }
                return b;
              },
              j = function (a, c) {
                if (null === a || null === c)
                  throw "Shaders should have defined positions";
                var d = i();
                (d.style.top = "".concat(a, "px")),
                  (d.style.left = "".concat(c, "px")),
                  b.appendChild(d),
                  e.borderShaders || (e.borderShaders = []),
                  e.borderShaders.push(d);
              },
              k = null,
              l = null,
              m = null,
              n = null;
            switch (d) {
              case a.SHADED_LEFT:
                (k = c.y - f), (l = c.x - g), (m = c.y + c.height - h), (n = l);
                break;
              case a.SHADED_RIGHT:
                (k = c.y - f), (l = 0), (m = c.y + c.height - h), (n = l);
                break;
              case a.SHADED_TOP:
                (k = c.y - f), (l = -g), (m = k), (n = c.width - h);
                break;
              case a.SHADED_BOTTOM:
                (k = 0), (l = -g), (m = k), (n = c.width - h);
                break;
              default:
                throw "Unsupported shadingPosition";
            }
            j(k, l), j(m, n);
          },
        },
        {
          key: "_possiblyUpdateShaders",
          value: function (b) {
            this.qrMatch === b ||
              (this.hasBorderShaders &&
                this.borderShaders &&
                this.borderShaders.length &&
                this.borderShaders.forEach(function (c) {
                  c.style.backgroundColor = b
                    ? a.BORDER_SHADER_MATCH_COLOR
                    : a.BORDER_SHADER_DEFAULT_COLOR;
                }),
              (this.qrMatch = b));
          },
        },
        {
          key: "_possiblyCloseLastScanImageFile",
          value: function () {
            this._lastScanImageFile &&
              (URL.revokeObjectURL(this._lastScanImageFile),
              (this._lastScanImageFile = null));
          },
        },
      ],
      [
        {
          key: "getCameras",
          value: function () {
            var a = this;
            return new Promise(function (b, c) {
              if (
                navigator.mediaDevices &&
                navigator.mediaDevices.enumerateDevices &&
                navigator.mediaDevices.getUserMedia
              )
                a._log("navigator.mediaDevices used"),
                  navigator.mediaDevices
                    .getUserMedia({ audio: !1, video: !0 })
                    .then(function (d) {
                      d.oninactive = function () {
                        return a._log("All streams closed");
                      };
                      var e = function (a) {
                        for (
                          var b, c = a.getVideoTracks(), d = 0;
                          d < c.length;
                          d++
                        )
                          (b = c[d]),
                            (b.enabled = !1),
                            b.stop(),
                            a.removeTrack(b);
                      };
                      navigator.mediaDevices
                        .enumerateDevices()
                        .then(function (c) {
                          for (var f, g = [], h = 0; h < c.length; h++)
                            (f = c[h]),
                              "videoinput" == f.kind &&
                                g.push({ id: f.deviceId, label: f.label });
                          a._log("".concat(g.length, " results found")),
                            e(d),
                            b(g);
                        })
                        ["catch"](function (a) {
                          c("".concat(a.name, " : ").concat(a.message));
                        });
                    })
                    ["catch"](function (a) {
                      c("".concat(a.name, " : ").concat(a.message));
                    });
              else if (MediaStreamTrack && MediaStreamTrack.getSources) {
                a._log("MediaStreamTrack.getSources used");
                var d = function (c) {
                  for (var d, e = [], f = 0; f !== c.length; ++f)
                    (d = c[f]),
                      "video" === d.kind &&
                        e.push({ id: d.id, label: d.label });
                  a._log("".concat(e.length, " results found")), b(e);
                };
                MediaStreamTrack.getSources(d);
              } else
                a._log("unable to query supported devices."),
                  c("unable to query supported devices.");
            });
          },
        },
        {
          key: "_getTimeoutFps",
          value: function (a) {
            return 1e3 / a;
          },
        },
        {
          key: "_log",
          value: function (b) {
            a.VERBOSE && console.log(b);
          },
        },
      ]
    ),
    a
  );
})();
_defineProperty(Html5Qrcode, "DEFAULT_WIDTH", 300),
  _defineProperty(Html5Qrcode, "DEFAULT_WIDTH_OFFSET", 2),
  _defineProperty(Html5Qrcode, "SCAN_DEFAULT_FPS", 2),
  _defineProperty(Html5Qrcode, "MIN_QR_BOX_SIZE", 50),
  _defineProperty(Html5Qrcode, "SHADED_LEFT", 1),
  _defineProperty(Html5Qrcode, "SHADED_RIGHT", 2),
  _defineProperty(Html5Qrcode, "SHADED_TOP", 3),
  _defineProperty(Html5Qrcode, "SHADED_BOTTOM", 4),
  _defineProperty(Html5Qrcode, "SHADED_REGION_CLASSNAME", "qr-shaded-region"),
  _defineProperty(Html5Qrcode, "VERBOSE", !1),
  _defineProperty(Html5Qrcode, "BORDER_SHADER_DEFAULT_COLOR", "#ffffff"),
  _defineProperty(Html5Qrcode, "BORDER_SHADER_MATCH_COLOR", "rgb(90, 193, 56)");
var Html5QrcodeScanner = (function () {
  function a(b, c, d) {
    if (
      (_classCallCheck(this, a),
      (this.elementId = b),
      (this.config = c),
      (this.verbose = !0 === d),
      !document.getElementById(b))
    )
      throw "HTML Element with id=".concat(b, " not found");
    (this.currentScanType = a.SCAN_TYPE_CAMERA),
      (this.sectionSwapAllowed = !0),
      (this.section = void 0),
      (this.html5Qrcode = void 0),
      (this.qrCodeSuccessCallback = void 0),
      (this.qrCodeErrorCallback = void 0);
  }
  return (
    _createClass(a, [
      {
        key: "render",
        value: function (b, c) {
          var d = this;
          (this.lastMatchFound = void 0),
            (this.qrCodeSuccessCallback = function (c) {
              if ((d.__setStatus("MATCH", a.STATUS_SUCCESS), b)) b(c);
              else {
                if (d.lastMatchFound == c) return;
                (d.lastMatchFound = c),
                  d.__setHeaderMessage(
                    "Last Match: ".concat(c),
                    a.STATUS_SUCCESS
                  );
              }
            }),
            (this.qrCodeErrorCallback = function (a) {
              d.__setStatus("Scanning"), c && c(a);
            });
          var e = document.getElementById(this.elementId);
          (e.innerHTML = ""),
            this.__createBasicLayout(e),
            (this.html5Qrcode = new Html5Qrcode(
              this.__getScanRegionId(),
              this.verbose
            ));
        },
      },
      {
        key: "clear",
        value: function () {
          var a = this,
            b = this,
            c = function () {
              var b = document.getElementById(a.elementId);
              b && (b.innerHTML = "");
            };
          this.html5Qrcode &&
            this.html5Qrcode._isScanning() &&
            this.html5Qrcode
              .stop()
              .then(function () {
                b.html5Qrcode.clear(), c();
              })
              ["catch"](function (a) {
                b.verbose && console.error("Unable to stop qrcode scanner", a),
                  b.html5Qrcode.clear(),
                  c();
              });
        },
      },
      {
        key: "__createBasicLayout",
        value: function (a) {
          (a.style.position = "relative"),
            (a.style.padding = "0px"),
            (a.style.border = "1px solid silver"),
            this.__createHeader(a);
          var b = document.createElement("div"),
            c = this.__getScanRegionId();
          (b.id = c),
            (b.style.width = "100%"),
            (b.style.minHeight = "100px"),
            (b.style.textAlign = "center"),
            a.appendChild(b),
            this.__insertCameraScanImageToScanRegion();
          var d = document.createElement("div"),
            e = this.__getDashboardId();
          (d.id = e),
            (d.style.width = "100%"),
            a.appendChild(d),
            this.__setupInitialDashboard(d);
        },
      },
      {
        key: "__setupInitialDashboard",
        value: function (a) {
          this.__createSection(a),
            this.__createSectionControlPanel(),
            this.__createSectionSwap();
        },
      },
      {
        key: "__createHeader",
        value: function (a) {
          var b = document.createElement("div");
          (b.style.textAlign = "left"),
            (b.style.margin = "0px"),
            (b.style.padding = "5px"),
            (b.style.fontSize = "20px"),
            (b.style.borderBottom = "1px solid rgba(192, 192, 192, 0.18)"),
            a.appendChild(b);
          var c = document.createElement("span");
          (c.innerHTML = "QR Code Scanner"), b.appendChild(c);
          var d = document.createElement("span");
          (d.id = this.__getStatusSpanId()),
            (d.style.float = "right"),
            (d.style.padding = "5px 7px"),
            (d.style.fontSize = "14px"),
            (d.style.background = "#dedede6b"),
            (d.style.border = "1px solid #00000000"),
            (d.style.color = "rgb(17, 17, 17)"),
            b.appendChild(d),
            this.__setStatus("IDLE");
          var e = document.createElement("div");
          (e.id = this.__getHeaderMessageContainerId()),
            (e.style.display = "none"),
            (e.style.fontSize = "14px"),
            (e.style.padding = "2px 10px"),
            (e.style.marginTop = "4px"),
            (e.style.borderTop = "1px solid #f6f6f6"),
            b.appendChild(e);
        },
      },
      {
        key: "__createSection",
        value: function (a) {
          var b = document.createElement("div");
          (b.id = this.__getDashboardSectionId()),
            (b.style.width = "100%"),
            (b.style.padding = "10px"),
            (b.style.textAlign = "left"),
            a.appendChild(b);
        },
      },
      {
        key: "__createSectionControlPanel",
        value: function () {
          var b = this,
            c = document.getElementById(this.__getDashboardSectionId()),
            d = document.createElement("div");
          c.appendChild(d);
          var e = document.createElement("div");
          (e.id = this.__getDashboardSectionCameraScanRegionId()),
            (e.style.display =
              this.currentScanType == a.SCAN_TYPE_CAMERA ? "block" : "none"),
            d.appendChild(e);
          var f = document.createElement("div");
          f.style.textAlign = "center";
          var g = document.createElement("button");
          (g.innerHTML = "Request Camera Permissions"),
            g.addEventListener("click", function () {
              (g.disabled = !0),
                b.__setStatus("PERMISSION"),
                b.__setHeaderMessage("Requesting camera permissions..."),
                Html5Qrcode.getCameras()
                  .then(function (c) {
                    b.__setStatus("IDLE"),
                      b.__resetHeaderMessage(),
                      c && 0 != c.length
                        ? (e.removeChild(f), b.__renderCameraSelection(c))
                        : b.__setStatus("No Cameras", a.STATUS_WARNING);
                  })
                  ["catch"](function (c) {
                    (g.disabled = !1),
                      b.__setStatus("IDLE"),
                      b.__setHeaderMessage(c, a.STATUS_WARNING);
                  });
            }),
            f.appendChild(g),
            e.appendChild(f);
          var h = document.createElement("div");
          (h.id = this.__getDashboardSectionFileScanRegionId()),
            (h.style.textAlign = "center"),
            (h.style.display =
              this.currentScanType == a.SCAN_TYPE_CAMERA ? "none" : "block"),
            d.appendChild(h);
          var i = document.createElement("input");
          (i.id = this.__getFileScanInputId()),
            (i.accept = "image/*"),
            (i.type = "file"),
            (i.style.width = "200px"),
            (i.disabled = this.currentScanType == a.SCAN_TYPE_CAMERA);
          var j = document.createElement("span");
          (j.innerHTML = "&nbsp; Select Image"),
            h.appendChild(i),
            h.appendChild(j),
            i.addEventListener("change", function (c) {
              if (
                b.currentScanType === a.SCAN_TYPE_FILE &&
                0 != c.target.files.length
              ) {
                var d = c.target.files[0];
                b.html5Qrcode
                  .scanFile(d, !0)
                  .then(b.qrCodeSuccessCallback)
                  ["catch"](function (c) {
                    b.__setStatus("ERROR", a.STATUS_WARNING),
                      b.__setHeaderMessage(c, a.STATUS_WARNING);
                  });
              }
            });
        },
      },
      {
        key: "__renderCameraSelection",
        value: function (b) {
          var c = this,
            d = document.getElementById(
              this.__getDashboardSectionCameraScanRegionId()
            );
          d.style.textAlign = "center";
          var e = document.createElement("span");
          (e.innerHTML = "Select Camera (".concat(b.length, ") &nbsp;")),
            (e.style.marginRight = "10px");
          var f = document.createElement("select");
          f.id = this.__getCameraSelectionId();
          for (var g = 0; g < b.length; g++) {
            var h = b[g],
              j = h.id,
              k = null == h.label ? j : h.label,
              l = document.createElement("option");
            (l.value = j), (l.innerHTML = k), f.appendChild(l);
          }
          e.appendChild(f), d.appendChild(e);
          var m = document.createElement("span"),
            n = document.createElement("button");
          (n.innerHTML = "Start Scanning"), m.appendChild(n);
          var o = document.createElement("button");
          (o.innerHTML = "Stop Scanning"),
            (o.style.display = "none"),
            (o.disabled = !0),
            m.appendChild(o),
            d.appendChild(m),
            n.addEventListener("click", function () {
              (f.disabled = !0),
                (n.disabled = !0),
                c._showHideScanTypeSwapLink(!1);
              var b = c.config ? c.config : { fps: 10, qrbox: 250 },
                d = f.value;
              c.html5Qrcode
                .start(d, b, c.qrCodeSuccessCallback, c.qrCodeErrorCallback)
                .then(function () {
                  (o.disabled = !1),
                    (o.style.display = "inline-block"),
                    (n.style.display = "none"),
                    c.__setStatus("Scanning");
                })
                ["catch"](function (b) {
                  c._showHideScanTypeSwapLink(!0),
                    (f.disabled = !1),
                    (n.disabled = !1),
                    c.__setStatus("IDLE"),
                    c.__setHeaderMessage(b, a.STATUS_WARNING);
                });
            }),
            o.addEventListener("click", function () {
              (o.disabled = !0),
                c.html5Qrcode
                  .stop()
                  .then(function () {
                    c._showHideScanTypeSwapLink(!0),
                      (f.disabled = !1),
                      (n.disabled = !1),
                      (o.style.display = "none"),
                      (n.style.display = "inline-block"),
                      c.__setStatus("IDLE"),
                      c.__insertCameraScanImageToScanRegion();
                  })
                  ["catch"](function (b) {
                    (o.disabled = !1),
                      c.__setStatus("ERROR", a.STATUS_WARNING),
                      c.__setHeaderMessage(b, a.STATUS_WARNING);
                  });
            });
        },
      },
      {
        key: "__createSectionSwap",
        value: function () {
          var b = this,
            c = "Scan an Image File",
            d = "Scan using camera directly",
            e = document.getElementById(this.__getDashboardSectionId()),
            f = document.createElement("div");
          f.style.textAlign = "center";
          var g = document.createElement("a");
          (g.style.textDecoration = "underline"),
            (g.id = this.__getDashboardSectionSwapLinkId()),
            (g.innerHTML = this.currentScanType == a.SCAN_TYPE_CAMERA ? c : d),
            (g.href = "#scan-using-file"),
            g.addEventListener("click", function () {
              return b.sectionSwapAllowed
                ? void ((b.sectionSwapAllowed = !1),
                  b.currentScanType == a.SCAN_TYPE_CAMERA
                    ? (b.__clearScanRegion(),
                      (b.__getFileScanInput().disabled = !1),
                      (b.__getCameraScanRegion().style.display = "none"),
                      (b.__getFileScanRegion().style.display = "block"),
                      (g.innerHTML = d),
                      (b.currentScanType = a.SCAN_TYPE_FILE),
                      b.__insertFileScanImageToScanRegion())
                    : (b.__clearScanRegion(),
                      (b.__getFileScanInput().disabled = !0),
                      (b.__getCameraScanRegion().style.display = "block"),
                      (b.__getFileScanRegion().style.display = "none"),
                      (g.innerHTML = c),
                      (b.currentScanType = a.SCAN_TYPE_CAMERA),
                      b.__insertCameraScanImageToScanRegion()),
                  (b.sectionSwapAllowed = !0))
                : void (
                    b.verbose &&
                    console.error("Section swap called when not allowed")
                  );
            }),
            f.appendChild(g),
            e.appendChild(f);
        },
      },
      {
        key: "__setStatus",
        value: function (b, c) {
          c || (c = a.STATUS_DEFAULT);
          var d = document.getElementById(this.__getStatusSpanId());
          switch (((d.innerHTML = b), c)) {
            case a.STATUS_SUCCESS:
              (d.style.background = "#6aaf5042"), (d.style.color = "#477735");
              break;
            case a.STATUS_WARNING:
              (d.style.background = "#cb243124"), (d.style.color = "#cb2431");
              break;
            case a.STATUS_DEFAULT:
            default:
              (d.style.background = "#eef"),
                (d.style.color = "rgb(17, 17, 17)");
          }
        },
      },
      {
        key: "__resetHeaderMessage",
        value: function () {
          var a = document.getElementById(this.__getHeaderMessageContainerId());
          a.style.display = "none";
        },
      },
      {
        key: "__setHeaderMessage",
        value: function (b, c) {
          c || (c = a.STATUS_DEFAULT);
          var d = document.getElementById(this.__getHeaderMessageContainerId());
          switch (((d.innerHTML = b), (d.style.display = "block"), c)) {
            case a.STATUS_SUCCESS:
              (d.style.background = "#6aaf5042"), (d.style.color = "#477735");
              break;
            case a.STATUS_WARNING:
              (d.style.background = "#cb243124"), (d.style.color = "#cb2431");
              break;
            case a.STATUS_DEFAULT:
            default:
              (d.style.background = "#00000000"),
                (d.style.color = "rgb(17, 17, 17)");
          }
        },
      },
      {
        key: "_showHideScanTypeSwapLink",
        value: function (a) {
          !0 !== a && (a = !1),
            (this.sectionSwapAllowed = a),
            (this.__getDashboardSectionSwapLink().style.display = a
              ? "inline-block"
              : "none");
        },
      },
      {
        key: "__insertCameraScanImageToScanRegion",
        value: function () {
          var b = this,
            c = document.getElementById(this.__getScanRegionId());
          return this.cameraScanImage
            ? ((c.innerHTML = "<br>"), void c.appendChild(this.cameraScanImage))
            : void ((this.cameraScanImage = new Image()),
              (this.cameraScanImage.onload = function () {
                (c.innerHTML = "<br>"), c.appendChild(b.cameraScanImage);
              }),
              (this.cameraScanImage.width = 64),
              (this.cameraScanImage.style.opacity = 0.3),
              (this.cameraScanImage.src = a.ASSET_CAMERA_SCAN));
        },
      },
      {
        key: "__insertFileScanImageToScanRegion",
        value: function () {
          var b = this,
            c = document.getElementById(this.__getScanRegionId());
          return this.fileScanImage
            ? ((c.innerHTML = "<br>"), void c.appendChild(this.fileScanImage))
            : void ((this.fileScanImage = new Image()),
              (this.fileScanImage.onload = function () {
                (c.innerHTML = "<br>"), c.appendChild(b.fileScanImage);
              }),
              (this.fileScanImage.width = 64),
              (this.fileScanImage.style.opacity = 0.3),
              (this.fileScanImage.src = a.ASSET_FILE_SCAN));
        },
      },
      {
        key: "__clearScanRegion",
        value: function () {
          var a = document.getElementById(this.__getScanRegionId());
          a.innerHTML = "";
        },
      },
      {
        key: "__getDashboardSectionId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section");
        },
      },
      {
        key: "__getDashboardSectionCameraScanRegionId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section_csr");
        },
      },
      {
        key: "__getDashboardSectionFileScanRegionId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section_fsr");
        },
      },
      {
        key: "__getDashboardSectionSwapLinkId",
        value: function () {
          return "".concat(this.elementId, "__dashboard_section_swaplink");
        },
      },
      {
        key: "__getScanRegionId",
        value: function () {
          return "".concat(this.elementId, "__scan_region");
        },
      },
      {
        key: "__getDashboardId",
        value: function () {
          return "".concat(this.elementId, "__dashboard");
        },
      },
      {
        key: "__getFileScanInputId",
        value: function () {
          return "".concat(this.elementId, "__filescan_input");
        },
      },
      {
        key: "__getStatusSpanId",
        value: function () {
          return "".concat(this.elementId, "__status_span");
        },
      },
      {
        key: "__getHeaderMessageContainerId",
        value: function () {
          return "".concat(this.elementId, "__header_message");
        },
      },
      {
        key: "__getCameraSelectionId",
        value: function () {
          return "".concat(this.elementId, "__camera_selection");
        },
      },
      {
        key: "__getCameraScanRegion",
        value: function () {
          return document.getElementById(
            this.__getDashboardSectionCameraScanRegionId()
          );
        },
      },
      {
        key: "__getFileScanRegion",
        value: function () {
          return document.getElementById(
            this.__getDashboardSectionFileScanRegionId()
          );
        },
      },
      {
        key: "__getFileScanInput",
        value: function () {
          return document.getElementById(this.__getFileScanInputId());
        },
      },
      {
        key: "__getDashboardSectionSwapLink",
        value: function () {
          return document.getElementById(
            this.__getDashboardSectionSwapLinkId()
          );
        },
      },
    ]),
    a
  );
})();
_defineProperty(Html5QrcodeScanner, "SCAN_TYPE_CAMERA", "SCAN_TYPE_CAMERA"),
  _defineProperty(Html5QrcodeScanner, "SCAN_TYPE_FILE", "SCAN_TYPE_FILE"),
  _defineProperty(Html5QrcodeScanner, "STATUS_SUCCESS", "STATUS_SUCCESS"),
  _defineProperty(Html5QrcodeScanner, "STATUS_WARNING", "STATUS_WARNING"),
  _defineProperty(Html5QrcodeScanner, "STATUS_DEFAULT", "STATUS_DEFAULT"),
  _defineProperty(
    Html5QrcodeScanner,
    "ASSET_FILE_SCAN",
    "https://raw.githubusercontent.com/mebjas/html5-qrcode/master/assets/file-scan.gif"
  ),
  _defineProperty(
    Html5QrcodeScanner,
    "ASSET_CAMERA_SCAN",
    "https://raw.githubusercontent.com/mebjas/html5-qrcode/master/assets/camera-scan.gif"
  );
