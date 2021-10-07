!(function () {
    return function e(t, a, r) {
        function i(l, o) {
            if (!a[l]) {
                if (!t[l]) {
                    var s = "function" == typeof require && require;
                    if (!o && s) return s(l, !0);
                    if (n) return n(l, !0);
                    var u = new Error("Cannot find module '" + l + "'");
                    throw ((u.code = "MODULE_NOT_FOUND"), u);
                }
                var c = (a[l] = { exports: {} });
                t[l][0].call(
                    c.exports,
                    function (e) {
                        return i(t[l][1][e] || e);
                    },
                    c,
                    c.exports,
                    e,
                    t,
                    a,
                    r
                );
            }
            return a[l].exports;
        }
        for (var n = "function" == typeof require && require, l = 0; l < r.length; l++) i(r[l]);
        return i;
    };
})()(
    {
        1: [
            function (e, t, a) {
                "use strict";
                var r = {
                    single_source_shortest_paths: function (e, t, a) {
                        var i = {},
                            n = {};
                        n[t] = 0;
                        var l,
                            o,
                            s,
                            u,
                            c,
                            d,
                            f,
                            h = r.PriorityQueue.make();
                        for (h.push(t, 0); !h.empty(); )
                            for (s in ((o = (l = h.pop()).value), (u = l.cost), (c = e[o] || {}))) c.hasOwnProperty(s) && ((d = u + c[s]), (f = n[s]), (void 0 === n[s] || f > d) && ((n[s] = d), h.push(s, d), (i[s] = o)));
                        if (void 0 !== a && void 0 === n[a]) {
                            var p = ["Could not find a path from ", t, " to ", a, "."].join("");
                            throw new Error(p);
                        }
                        return i;
                    },
                    extract_shortest_path_from_predecessor_list: function (e, t) {
                        for (var a = [], r = t; r; ) a.push(r), e[r], (r = e[r]);
                        return a.reverse(), a;
                    },
                    find_path: function (e, t, a) {
                        var i = r.single_source_shortest_paths(e, t, a);
                        return r.extract_shortest_path_from_predecessor_list(i, a);
                    },
                    PriorityQueue: {
                        make: function (e) {
                            var t,
                                a = r.PriorityQueue,
                                i = {};
                            for (t in ((e = e || {}), a)) a.hasOwnProperty(t) && (i[t] = a[t]);
                            return (i.queue = []), (i.sorter = e.sorter || a.default_sorter), i;
                        },
                        default_sorter: function (e, t) {
                            return e.cost - t.cost;
                        },
                        push: function (e, t) {
                            var a = { value: e, cost: t };
                            this.queue.push(a), this.queue.sort(this.sorter);
                        },
                        pop: function () {
                            return this.queue.shift();
                        },
                        empty: function () {
                            return 0 === this.queue.length;
                        },
                    },
                };
                void 0 !== t && (t.exports = r);
            },
            {},
        ],
        2: [
            function (e, t, a) {
                var r = e("./can-promise"),
                    i = e("./core/qrcode"),
                    n = e("./renderer/canvas"),
                    l = e("./renderer/svg-tag.js");
                function o(e, t, a, n, l) {
                    var o = [].slice.call(arguments, 1),
                        s = o.length,
                        u = "function" == typeof o[s - 1];
                    if (!u && !r()) throw new Error("Callback required as last argument");
                    if (!u) {
                        if (s < 1) throw new Error("Too few arguments provided");
                        return (
                            1 === s ? ((a = t), (t = n = void 0)) : 2 !== s || t.getContext || ((n = a), (a = t), (t = void 0)),
                            new Promise(function (r, l) {
                                try {
                                    var o = i.create(a, n);
                                    r(e(o, t, n));
                                } catch (e) {
                                    l(e);
                                }
                            })
                        );
                    }
                    if (s < 2) throw new Error("Too few arguments provided");
                    2 === s ? ((l = a), (a = t), (t = n = void 0)) : 3 === s && (t.getContext && void 0 === l ? ((l = n), (n = void 0)) : ((l = n), (n = a), (a = t), (t = void 0)));
                    try {
                        var c = i.create(a, n);
                        l(null, e(c, t, n));
                    } catch (e) {
                        l(e);
                    }
                }
                (a.create = i.create),
                    (a.toCanvas = o.bind(null, n.render)),
                    (a.toDataURL = o.bind(null, n.renderToDataURL)),
                    (a.toString = o.bind(null, function (e, t, a) {
                        return l.render(e, a);
                    }));
            },
            { "./can-promise": 3, "./core/qrcode": 19, "./renderer/canvas": 26, "./renderer/svg-tag.js": 27 },
        ],
        3: [
            function (e, t, a) {
                t.exports = function () {
                    return "function" == typeof Promise && Promise.prototype && Promise.prototype.then;
                };
            },
            {},
        ],
        4: [
            function (e, t, a) {
                var r = e("./utils").getSymbolSize;
                (a.getRowColCoords = function (e) {
                    if (1 === e) return [];
                    for (var t = Math.floor(e / 7) + 2, a = r(e), i = 145 === a ? 26 : 2 * Math.ceil((a - 13) / (2 * t - 2)), n = [a - 7], l = 1; l < t - 1; l++) n[l] = n[l - 1] - i;
                    return n.push(6), n.reverse();
                }),
                    (a.getPositions = function (e) {
                        for (var t = [], r = a.getRowColCoords(e), i = r.length, n = 0; n < i; n++) for (var l = 0; l < i; l++) (0 === n && 0 === l) || (0 === n && l === i - 1) || (n === i - 1 && 0 === l) || t.push([r[n], r[l]]);
                        return t;
                    });
            },
            { "./utils": 23 },
        ],
        5: [
            function (e, t, a) {
                var r = e("./mode"),
                    i = [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F",
                        "G",
                        "H",
                        "I",
                        "J",
                        "K",
                        "L",
                        "M",
                        "N",
                        "O",
                        "P",
                        "Q",
                        "R",
                        "S",
                        "T",
                        "U",
                        "V",
                        "W",
                        "X",
                        "Y",
                        "Z",
                        " ",
                        "$",
                        "%",
                        "*",
                        "+",
                        "-",
                        ".",
                        "/",
                        ":",
                    ];
                function n(e) {
                    (this.mode = r.ALPHANUMERIC), (this.data = e);
                }
                (n.getBitsLength = function (e) {
                    return 11 * Math.floor(e / 2) + (e % 2) * 6;
                }),
                    (n.prototype.getLength = function () {
                        return this.data.length;
                    }),
                    (n.prototype.getBitsLength = function () {
                        return n.getBitsLength(this.data.length);
                    }),
                    (n.prototype.write = function (e) {
                        var t;
                        for (t = 0; t + 2 <= this.data.length; t += 2) {
                            var a = 45 * i.indexOf(this.data[t]);
                            (a += i.indexOf(this.data[t + 1])), e.put(a, 11);
                        }
                        this.data.length % 2 && e.put(i.indexOf(this.data[t]), 6);
                    }),
                    (t.exports = n);
            },
            { "./mode": 16 },
        ],
        6: [
            function (e, t, a) {
                function r() {
                    (this.buffer = []), (this.length = 0);
                }
                (r.prototype = {
                    get: function (e) {
                        var t = Math.floor(e / 8);
                        return 1 == ((this.buffer[t] >>> (7 - (e % 8))) & 1);
                    },
                    put: function (e, t) {
                        for (var a = 0; a < t; a++) this.putBit(1 == ((e >>> (t - a - 1)) & 1));
                    },
                    getLengthInBits: function () {
                        return this.length;
                    },
                    putBit: function (e) {
                        var t = Math.floor(this.length / 8);
                        this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
                    },
                }),
                    (t.exports = r);
            },
            {},
        ],
        7: [
            function (e, t, a) {
                var r = e("../utils/buffer");
                function i(e) {
                    if (!e || e < 1) throw new Error("BitMatrix size must be defined and greater than 0");
                    (this.size = e), (this.data = new r(e * e)), this.data.fill(0), (this.reservedBit = new r(e * e)), this.reservedBit.fill(0);
                }
                (i.prototype.set = function (e, t, a, r) {
                    var i = e * this.size + t;
                    (this.data[i] = a), r && (this.reservedBit[i] = !0);
                }),
                    (i.prototype.get = function (e, t) {
                        return this.data[e * this.size + t];
                    }),
                    (i.prototype.xor = function (e, t, a) {
                        this.data[e * this.size + t] ^= a;
                    }),
                    (i.prototype.isReserved = function (e, t) {
                        return this.reservedBit[e * this.size + t];
                    }),
                    (t.exports = i);
            },
            { "../utils/buffer": 29 },
        ],
        8: [
            function (e, t, a) {
                var r = e("../utils/buffer"),
                    i = e("./mode");
                function n(e) {
                    (this.mode = i.BYTE), (this.data = new r(e));
                }
                (n.getBitsLength = function (e) {
                    return 8 * e;
                }),
                    (n.prototype.getLength = function () {
                        return this.data.length;
                    }),
                    (n.prototype.getBitsLength = function () {
                        return n.getBitsLength(this.data.length);
                    }),
                    (n.prototype.write = function (e) {
                        for (var t = 0, a = this.data.length; t < a; t++) e.put(this.data[t], 8);
                    }),
                    (t.exports = n);
            },
            { "../utils/buffer": 29, "./mode": 16 },
        ],
        9: [
            function (e, t, a) {
                var r = e("./error-correction-level"),
                    i = [
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        2,
                        2,
                        1,
                        2,
                        2,
                        4,
                        1,
                        2,
                        4,
                        4,
                        2,
                        4,
                        4,
                        4,
                        2,
                        4,
                        6,
                        5,
                        2,
                        4,
                        6,
                        6,
                        2,
                        5,
                        8,
                        8,
                        4,
                        5,
                        8,
                        8,
                        4,
                        5,
                        8,
                        11,
                        4,
                        8,
                        10,
                        11,
                        4,
                        9,
                        12,
                        16,
                        4,
                        9,
                        16,
                        16,
                        6,
                        10,
                        12,
                        18,
                        6,
                        10,
                        17,
                        16,
                        6,
                        11,
                        16,
                        19,
                        6,
                        13,
                        18,
                        21,
                        7,
                        14,
                        21,
                        25,
                        8,
                        16,
                        20,
                        25,
                        8,
                        17,
                        23,
                        25,
                        9,
                        17,
                        23,
                        34,
                        9,
                        18,
                        25,
                        30,
                        10,
                        20,
                        27,
                        32,
                        12,
                        21,
                        29,
                        35,
                        12,
                        23,
                        34,
                        37,
                        12,
                        25,
                        34,
                        40,
                        13,
                        26,
                        35,
                        42,
                        14,
                        28,
                        38,
                        45,
                        15,
                        29,
                        40,
                        48,
                        16,
                        31,
                        43,
                        51,
                        17,
                        33,
                        45,
                        54,
                        18,
                        35,
                        48,
                        57,
                        19,
                        37,
                        51,
                        60,
                        19,
                        38,
                        53,
                        63,
                        20,
                        40,
                        56,
                        66,
                        21,
                        43,
                        59,
                        70,
                        22,
                        45,
                        62,
                        74,
                        24,
                        47,
                        65,
                        77,
                        25,
                        49,
                        68,
                        81,
                    ],
                    n = [
                        7,
                        10,
                        13,
                        17,
                        10,
                        16,
                        22,
                        28,
                        15,
                        26,
                        36,
                        44,
                        20,
                        36,
                        52,
                        64,
                        26,
                        48,
                        72,
                        88,
                        36,
                        64,
                        96,
                        112,
                        40,
                        72,
                        108,
                        130,
                        48,
                        88,
                        132,
                        156,
                        60,
                        110,
                        160,
                        192,
                        72,
                        130,
                        192,
                        224,
                        80,
                        150,
                        224,
                        264,
                        96,
                        176,
                        260,
                        308,
                        104,
                        198,
                        288,
                        352,
                        120,
                        216,
                        320,
                        384,
                        132,
                        240,
                        360,
                        432,
                        144,
                        280,
                        408,
                        480,
                        168,
                        308,
                        448,
                        532,
                        180,
                        338,
                        504,
                        588,
                        196,
                        364,
                        546,
                        650,
                        224,
                        416,
                        600,
                        700,
                        224,
                        442,
                        644,
                        750,
                        252,
                        476,
                        690,
                        816,
                        270,
                        504,
                        750,
                        900,
                        300,
                        560,
                        810,
                        960,
                        312,
                        588,
                        870,
                        1050,
                        336,
                        644,
                        952,
                        1110,
                        360,
                        700,
                        1020,
                        1200,
                        390,
                        728,
                        1050,
                        1260,
                        420,
                        784,
                        1140,
                        1350,
                        450,
                        812,
                        1200,
                        1440,
                        480,
                        868,
                        1290,
                        1530,
                        510,
                        924,
                        1350,
                        1620,
                        540,
                        980,
                        1440,
                        1710,
                        570,
                        1036,
                        1530,
                        1800,
                        570,
                        1064,
                        1590,
                        1890,
                        600,
                        1120,
                        1680,
                        1980,
                        630,
                        1204,
                        1770,
                        2100,
                        660,
                        1260,
                        1860,
                        2220,
                        720,
                        1316,
                        1950,
                        2310,
                        750,
                        1372,
                        2040,
                        2430,
                    ];
                (a.getBlocksCount = function (e, t) {
                    switch (t) {
                        case r.L:
                            return i[4 * (e - 1) + 0];
                        case r.M:
                            return i[4 * (e - 1) + 1];
                        case r.Q:
                            return i[4 * (e - 1) + 2];
                        case r.H:
                            return i[4 * (e - 1) + 3];
                        default:
                            return;
                    }
                }),
                    (a.getTotalCodewordsCount = function (e, t) {
                        switch (t) {
                            case r.L:
                                return n[4 * (e - 1) + 0];
                            case r.M:
                                return n[4 * (e - 1) + 1];
                            case r.Q:
                                return n[4 * (e - 1) + 2];
                            case r.H:
                                return n[4 * (e - 1) + 3];
                            default:
                                return;
                        }
                    });
            },
            { "./error-correction-level": 10 },
        ],
        10: [
            function (e, t, a) {
                (a.L = { bit: 1 }),
                    (a.M = { bit: 0 }),
                    (a.Q = { bit: 3 }),
                    (a.H = { bit: 2 }),
                    (a.isValid = function (e) {
                        return e && void 0 !== e.bit && e.bit >= 0 && e.bit < 4;
                    }),
                    (a.from = function (e, t) {
                        if (a.isValid(e)) return e;
                        try {
                            return (function (e) {
                                if ("string" != typeof e) throw new Error("Param is not a string");
                                switch (e.toLowerCase()) {
                                    case "l":
                                    case "low":
                                        return a.L;
                                    case "m":
                                    case "medium":
                                        return a.M;
                                    case "q":
                                    case "quartile":
                                        return a.Q;
                                    case "h":
                                    case "high":
                                        return a.H;
                                    default:
                                        throw new Error("Unknown EC Level: " + e);
                                }
                            })(e);
                        } catch (e) {
                            return t;
                        }
                    });
            },
            {},
        ],
        11: [
            function (e, t, a) {
                var r = e("./utils").getSymbolSize;
                a.getPositions = function (e) {
                    var t = r(e);
                    return [
                        [0, 0],
                        [t - 7, 0],
                        [0, t - 7],
                    ];
                };
            },
            { "./utils": 23 },
        ],
        12: [
            function (e, t, a) {
                var r = e("./utils"),
                    i = r.getBCHDigit(1335);
                a.getEncodedBits = function (e, t) {
                    for (var a = (e.bit << 3) | t, n = a << 10; r.getBCHDigit(n) - i >= 0; ) n ^= 1335 << (r.getBCHDigit(n) - i);
                    return 21522 ^ ((a << 10) | n);
                };
            },
            { "./utils": 23 },
        ],
        13: [
            function (e, t, a) {
                var r = e("../utils/buffer");
                if (r.alloc)
                    var i = r.alloc(512),
                        n = r.alloc(256);
                else (i = new r(512)), (n = new r(256));
                !(function () {
                    for (var e = 1, t = 0; t < 255; t++) (i[t] = e), (n[e] = t), 256 & (e <<= 1) && (e ^= 285);
                    for (t = 255; t < 512; t++) i[t] = i[t - 255];
                })(),
                    (a.log = function (e) {
                        if (e < 1) throw new Error("log(" + e + ")");
                        return n[e];
                    }),
                    (a.exp = function (e) {
                        return i[e];
                    }),
                    (a.mul = function (e, t) {
                        return 0 === e || 0 === t ? 0 : i[n[e] + n[t]];
                    });
            },
            { "../utils/buffer": 29 },
        ],
        14: [
            function (e, t, a) {
                var r = e("./mode"),
                    i = e("./utils");
                function n(e) {
                    (this.mode = r.KANJI), (this.data = e);
                }
                (n.getBitsLength = function (e) {
                    return 13 * e;
                }),
                    (n.prototype.getLength = function () {
                        return this.data.length;
                    }),
                    (n.prototype.getBitsLength = function () {
                        return n.getBitsLength(this.data.length);
                    }),
                    (n.prototype.write = function (e) {
                        var t;
                        for (t = 0; t < this.data.length; t++) {
                            var a = i.toSJIS(this.data[t]);
                            if (a >= 33088 && a <= 40956) a -= 33088;
                            else {
                                if (!(a >= 57408 && a <= 60351)) throw new Error("Invalid SJIS character: " + this.data[t] + "\nMake sure your charset is UTF-8");
                                a -= 49472;
                            }
                            (a = 192 * ((a >>> 8) & 255) + (255 & a)), e.put(a, 13);
                        }
                    }),
                    (t.exports = n);
            },
            { "./mode": 16, "./utils": 23 },
        ],
        15: [
            function (e, t, a) {
                a.Patterns = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
                var r = 3,
                    i = 3,
                    n = 40,
                    l = 10;
                function o(e, t, r) {
                    switch (e) {
                        case a.Patterns.PATTERN000:
                            return (t + r) % 2 == 0;
                        case a.Patterns.PATTERN001:
                            return t % 2 == 0;
                        case a.Patterns.PATTERN010:
                            return r % 3 == 0;
                        case a.Patterns.PATTERN011:
                            return (t + r) % 3 == 0;
                        case a.Patterns.PATTERN100:
                            return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 == 0;
                        case a.Patterns.PATTERN101:
                            return ((t * r) % 2) + ((t * r) % 3) == 0;
                        case a.Patterns.PATTERN110:
                            return (((t * r) % 2) + ((t * r) % 3)) % 2 == 0;
                        case a.Patterns.PATTERN111:
                            return (((t * r) % 3) + ((t + r) % 2)) % 2 == 0;
                        default:
                            throw new Error("bad maskPattern:" + e);
                    }
                }
                (a.isValid = function (e) {
                    return null != e && "" !== e && !isNaN(e) && e >= 0 && e <= 7;
                }),
                    (a.from = function (e) {
                        return a.isValid(e) ? parseInt(e, 10) : void 0;
                    }),
                    (a.getPenaltyN1 = function (e) {
                        for (var t = e.size, a = 0, i = 0, n = 0, l = null, o = null, s = 0; s < t; s++) {
                            (i = n = 0), (l = o = null);
                            for (var u = 0; u < t; u++) {
                                var c = e.get(s, u);
                                c === l ? i++ : (i >= 5 && (a += r + (i - 5)), (l = c), (i = 1)), (c = e.get(u, s)) === o ? n++ : (n >= 5 && (a += r + (n - 5)), (o = c), (n = 1));
                            }
                            i >= 5 && (a += r + (i - 5)), n >= 5 && (a += r + (n - 5));
                        }
                        return a;
                    }),
                    (a.getPenaltyN2 = function (e) {
                        for (var t = e.size, a = 0, r = 0; r < t - 1; r++)
                            for (var n = 0; n < t - 1; n++) {
                                var l = e.get(r, n) + e.get(r, n + 1) + e.get(r + 1, n) + e.get(r + 1, n + 1);
                                (4 !== l && 0 !== l) || a++;
                            }
                        return a * i;
                    }),
                    (a.getPenaltyN3 = function (e) {
                        for (var t = e.size, a = 0, r = 0, i = 0, l = 0; l < t; l++) {
                            r = i = 0;
                            for (var o = 0; o < t; o++) (r = ((r << 1) & 2047) | e.get(l, o)), o >= 10 && (1488 === r || 93 === r) && a++, (i = ((i << 1) & 2047) | e.get(o, l)), o >= 10 && (1488 === i || 93 === i) && a++;
                        }
                        return a * n;
                    }),
                    (a.getPenaltyN4 = function (e) {
                        for (var t = 0, a = e.data.length, r = 0; r < a; r++) t += e.data[r];
                        return Math.abs(Math.ceil((100 * t) / a / 5) - 10) * l;
                    }),
                    (a.applyMask = function (e, t) {
                        for (var a = t.size, r = 0; r < a; r++) for (var i = 0; i < a; i++) t.isReserved(i, r) || t.xor(i, r, o(e, i, r));
                    }),
                    (a.getBestMask = function (e, t) {
                        for (var r = Object.keys(a.Patterns).length, i = 0, n = 1 / 0, l = 0; l < r; l++) {
                            t(l), a.applyMask(l, e);
                            var o = a.getPenaltyN1(e) + a.getPenaltyN2(e) + a.getPenaltyN3(e) + a.getPenaltyN4(e);
                            a.applyMask(l, e), o < n && ((n = o), (i = l));
                        }
                        return i;
                    });
            },
            {},
        ],
        16: [
            function (e, t, a) {
                var r = e("./version-check"),
                    i = e("./regex");
                (a.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
                    (a.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
                    (a.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
                    (a.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
                    (a.MIXED = { bit: -1 }),
                    (a.getCharCountIndicator = function (e, t) {
                        if (!e.ccBits) throw new Error("Invalid mode: " + e);
                        if (!r.isValid(t)) throw new Error("Invalid version: " + t);
                        return t >= 1 && t < 10 ? e.ccBits[0] : t < 27 ? e.ccBits[1] : e.ccBits[2];
                    }),
                    (a.getBestModeForData = function (e) {
                        return i.testNumeric(e) ? a.NUMERIC : i.testAlphanumeric(e) ? a.ALPHANUMERIC : i.testKanji(e) ? a.KANJI : a.BYTE;
                    }),
                    (a.toString = function (e) {
                        if (e && e.id) return e.id;
                        throw new Error("Invalid mode");
                    }),
                    (a.isValid = function (e) {
                        return e && e.bit && e.ccBits;
                    }),
                    (a.from = function (e, t) {
                        if (a.isValid(e)) return e;
                        try {
                            return (function (e) {
                                if ("string" != typeof e) throw new Error("Param is not a string");
                                switch (e.toLowerCase()) {
                                    case "numeric":
                                        return a.NUMERIC;
                                    case "alphanumeric":
                                        return a.ALPHANUMERIC;
                                    case "kanji":
                                        return a.KANJI;
                                    case "byte":
                                        return a.BYTE;
                                    default:
                                        throw new Error("Unknown mode: " + e);
                                }
                            })(e);
                        } catch (e) {
                            return t;
                        }
                    });
            },
            { "./regex": 21, "./version-check": 24 },
        ],
        17: [
            function (e, t, a) {
                var r = e("./mode");
                function i(e) {
                    (this.mode = r.NUMERIC), (this.data = e.toString());
                }
                (i.getBitsLength = function (e) {
                    return 10 * Math.floor(e / 3) + (e % 3 ? (e % 3) * 3 + 1 : 0);
                }),
                    (i.prototype.getLength = function () {
                        return this.data.length;
                    }),
                    (i.prototype.getBitsLength = function () {
                        return i.getBitsLength(this.data.length);
                    }),
                    (i.prototype.write = function (e) {
                        var t, a, r;
                        for (t = 0; t + 3 <= this.data.length; t += 3) (a = this.data.substr(t, 3)), (r = parseInt(a, 10)), e.put(r, 10);
                        var i = this.data.length - t;
                        i > 0 && ((a = this.data.substr(t)), (r = parseInt(a, 10)), e.put(r, 3 * i + 1));
                    }),
                    (t.exports = i);
            },
            { "./mode": 16 },
        ],
        18: [
            function (e, t, a) {
                var r = e("../utils/buffer"),
                    i = e("./galois-field");
                (a.mul = function (e, t) {
                    var a = new r(e.length + t.length - 1);
                    a.fill(0);
                    for (var n = 0; n < e.length; n++) for (var l = 0; l < t.length; l++) a[n + l] ^= i.mul(e[n], t[l]);
                    return a;
                }),
                    (a.mod = function (e, t) {
                        for (var a = new r(e); a.length - t.length >= 0; ) {
                            for (var n = a[0], l = 0; l < t.length; l++) a[l] ^= i.mul(t[l], n);
                            for (var o = 0; o < a.length && 0 === a[o]; ) o++;
                            a = a.slice(o);
                        }
                        return a;
                    }),
                    (a.generateECPolynomial = function (e) {
                        for (var t = new r([1]), n = 0; n < e; n++) t = a.mul(t, [1, i.exp(n)]);
                        return t;
                    });
            },
            { "../utils/buffer": 29, "./galois-field": 13 },
        ],
        19: [
            function (e, t, a) {
                var r = e("../utils/buffer"),
                    i = e("./utils"),
                    n = e("./error-correction-level"),
                    l = e("./bit-buffer"),
                    o = e("./bit-matrix"),
                    s = e("./alignment-pattern"),
                    u = e("./finder-pattern"),
                    c = e("./mask-pattern"),
                    d = e("./error-correction-code"),
                    f = e("./reed-solomon-encoder"),
                    h = e("./version"),
                    p = e("./format-info"),
                    m = e("./mode"),
                    v = e("./segments"),
                    g = e("isarray");
                function y(e, t, a) {
                    var r,
                        i,
                        n = e.size,
                        l = p.getEncodedBits(t, a);
                    for (r = 0; r < 15; r++)
                        (i = 1 == ((l >> r) & 1)),
                            r < 6 ? e.set(r, 8, i, !0) : r < 8 ? e.set(r + 1, 8, i, !0) : e.set(n - 15 + r, 8, i, !0),
                            r < 8 ? e.set(8, n - r - 1, i, !0) : r < 9 ? e.set(8, 15 - r - 1 + 1, i, !0) : e.set(8, 15 - r - 1, i, !0);
                    e.set(n - 8, 8, 1, !0);
                }
                function b(e, t, a) {
                    var n = new l();
                    a.forEach(function (t) {
                        n.put(t.mode.bit, 4), n.put(t.getLength(), m.getCharCountIndicator(t.mode, e)), t.write(n);
                    });
                    var o = 8 * (i.getSymbolTotalCodewords(e) - d.getTotalCodewordsCount(e, t));
                    for (n.getLengthInBits() + 4 <= o && n.put(0, 4); n.getLengthInBits() % 8 != 0; ) n.putBit(0);
                    for (var s = (o - n.getLengthInBits()) / 8, u = 0; u < s; u++) n.put(u % 2 ? 17 : 236, 8);
                    return (function (e, t, a) {
                        for (
                            var n = i.getSymbolTotalCodewords(t),
                                l = d.getTotalCodewordsCount(t, a),
                                o = n - l,
                                s = d.getBlocksCount(t, a),
                                u = s - (n % s),
                                c = Math.floor(n / s),
                                h = Math.floor(o / s),
                                p = h + 1,
                                m = c - h,
                                v = new f(m),
                                g = 0,
                                y = new Array(s),
                                b = new Array(s),
                                _ = 0,
                                k = new r(e.buffer),
                                w = 0;
                            w < s;
                            w++
                        ) {
                            var T = w < u ? h : p;
                            (y[w] = k.slice(g, g + T)), (b[w] = v.encode(y[w])), (g += T), (_ = Math.max(_, T));
                        }
                        var E,
                            S,
                            C = new r(n),
                            F = 0;
                        for (E = 0; E < _; E++) for (S = 0; S < s; S++) E < y[S].length && (C[F++] = y[S][E]);
                        for (E = 0; E < m; E++) for (S = 0; S < s; S++) C[F++] = b[S][E];
                        return C;
                    })(n, e, t);
                }
                function _(e, t, a, r) {
                    var n;
                    if (g(e)) n = v.fromArray(e);
                    else {
                        if ("string" != typeof e) throw new Error("Invalid data");
                        var l = t;
                        if (!l) {
                            var d = v.rawSplit(e);
                            l = h.getBestVersionForData(d, a);
                        }
                        n = v.fromString(e, l || 40);
                    }
                    var f = h.getBestVersionForData(n, a);
                    if (!f) throw new Error("The amount of data is too big to be stored in a QR Code");
                    if (t) {
                        if (t < f) throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + f + ".\n");
                    } else t = f;
                    var p = b(t, a, n),
                        m = i.getSymbolSize(t),
                        _ = new o(m);
                    return (
                        (function (e, t) {
                            for (var a = e.size, r = u.getPositions(t), i = 0; i < r.length; i++)
                                for (var n = r[i][0], l = r[i][1], o = -1; o <= 7; o++)
                                    if (!(n + o <= -1 || a <= n + o))
                                        for (var s = -1; s <= 7; s++)
                                            l + s <= -1 ||
                                                a <= l + s ||
                                                ((o >= 0 && o <= 6 && (0 === s || 6 === s)) || (s >= 0 && s <= 6 && (0 === o || 6 === o)) || (o >= 2 && o <= 4 && s >= 2 && s <= 4)
                                                    ? e.set(n + o, l + s, !0, !0)
                                                    : e.set(n + o, l + s, !1, !0));
                        })(_, t),
                        (function (e) {
                            for (var t = e.size, a = 8; a < t - 8; a++) {
                                var r = a % 2 == 0;
                                e.set(a, 6, r, !0), e.set(6, a, r, !0);
                            }
                        })(_),
                        (function (e, t) {
                            for (var a = s.getPositions(t), r = 0; r < a.length; r++)
                                for (var i = a[r][0], n = a[r][1], l = -2; l <= 2; l++)
                                    for (var o = -2; o <= 2; o++) -2 === l || 2 === l || -2 === o || 2 === o || (0 === l && 0 === o) ? e.set(i + l, n + o, !0, !0) : e.set(i + l, n + o, !1, !0);
                        })(_, t),
                        y(_, a, 0),
                        t >= 7 &&
                            (function (e, t) {
                                for (var a, r, i, n = e.size, l = h.getEncodedBits(t), o = 0; o < 18; o++) (a = Math.floor(o / 3)), (r = (o % 3) + n - 8 - 3), (i = 1 == ((l >> o) & 1)), e.set(a, r, i, !0), e.set(r, a, i, !0);
                            })(_, t),
                        (function (e, t) {
                            for (var a = e.size, r = -1, i = a - 1, n = 7, l = 0, o = a - 1; o > 0; o -= 2)
                                for (6 === o && o--; ; ) {
                                    for (var s = 0; s < 2; s++)
                                        if (!e.isReserved(i, o - s)) {
                                            var u = !1;
                                            l < t.length && (u = 1 == ((t[l] >>> n) & 1)), e.set(i, o - s, u), -1 == --n && (l++, (n = 7));
                                        }
                                    if ((i += r) < 0 || a <= i) {
                                        (i -= r), (r = -r);
                                        break;
                                    }
                                }
                        })(_, p),
                        isNaN(r) && (r = c.getBestMask(_, y.bind(null, _, a))),
                        c.applyMask(r, _),
                        y(_, a, r),
                        { modules: _, version: t, errorCorrectionLevel: a, maskPattern: r, segments: n }
                    );
                }
                a.create = function (e, t) {
                    if (void 0 === e || "" === e) throw new Error("No input text");
                    var a,
                        r,
                        l = n.M;
                    return void 0 !== t && ((l = n.from(t.errorCorrectionLevel, n.M)), (a = h.from(t.version)), (r = c.from(t.maskPattern)), t.toSJISFunc && i.setToSJISFunction(t.toSJISFunc)), _(e, a, l, r);
                };
            },
            {
                "../utils/buffer": 29,
                "./alignment-pattern": 4,
                "./bit-buffer": 6,
                "./bit-matrix": 7,
                "./error-correction-code": 9,
                "./error-correction-level": 10,
                "./finder-pattern": 11,
                "./format-info": 12,
                "./mask-pattern": 15,
                "./mode": 16,
                "./reed-solomon-encoder": 20,
                "./segments": 22,
                "./utils": 23,
                "./version": 25,
                isarray: 30,
            },
        ],
        20: [
            function (e, t, a) {
                var r = e("../utils/buffer"),
                    i = e("./polynomial");
                function n(e) {
                    (this.genPoly = void 0), (this.degree = e), this.degree && this.initialize(this.degree);
                }
                (n.prototype.initialize = function (e) {
                    (this.degree = e), (this.genPoly = i.generateECPolynomial(this.degree));
                }),
                    (n.prototype.encode = function (e) {
                        if (!this.genPoly) throw new Error("Encoder not initialized");
                        var t = new r(this.degree);
                        t.fill(0);
                        var a = r.concat([e, t], e.length + this.degree),
                            n = i.mod(a, this.genPoly),
                            l = this.degree - n.length;
                        if (l > 0) {
                            var o = new r(this.degree);
                            return o.fill(0), n.copy(o, l), o;
                        }
                        return n;
                    }),
                    (t.exports = n);
            },
            { "../utils/buffer": 29, "./polynomial": 18 },
        ],
        21: [
            function (e, t, a) {
                var r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",
                    i = "(?:(?![A-Z0-9 $%*+\\-./:]|" + (r = r.replace(/u/g, "\\u")) + ")(?:.|[\r\n]))+";
                (a.KANJI = new RegExp(r, "g")), (a.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")), (a.BYTE = new RegExp(i, "g")), (a.NUMERIC = new RegExp("[0-9]+", "g")), (a.ALPHANUMERIC = new RegExp("[A-Z $%*+\\-./:]+", "g"));
                var n = new RegExp("^" + r + "$"),
                    l = new RegExp("^[0-9]+$"),
                    o = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
                (a.testKanji = function (e) {
                    return n.test(e);
                }),
                    (a.testNumeric = function (e) {
                        return l.test(e);
                    }),
                    (a.testAlphanumeric = function (e) {
                        return o.test(e);
                    });
            },
            {},
        ],
        22: [
            function (e, t, a) {
                var r = e("./mode"),
                    i = e("./numeric-data"),
                    n = e("./alphanumeric-data"),
                    l = e("./byte-data"),
                    o = e("./kanji-data"),
                    s = e("./regex"),
                    u = e("./utils"),
                    c = e("dijkstrajs");
                function d(e) {
                    return unescape(encodeURIComponent(e)).length;
                }
                function f(e, t, a) {
                    for (var r, i = []; null !== (r = e.exec(a)); ) i.push({ data: r[0], index: r.index, mode: t, length: r[0].length });
                    return i;
                }
                function h(e) {
                    var t,
                        a,
                        i = f(s.NUMERIC, r.NUMERIC, e),
                        n = f(s.ALPHANUMERIC, r.ALPHANUMERIC, e);
                    return (
                        u.isKanjiModeEnabled() ? ((t = f(s.BYTE, r.BYTE, e)), (a = f(s.KANJI, r.KANJI, e))) : ((t = f(s.BYTE_KANJI, r.BYTE, e)), (a = [])),
                        i
                            .concat(n, t, a)
                            .sort(function (e, t) {
                                return e.index - t.index;
                            })
                            .map(function (e) {
                                return { data: e.data, mode: e.mode, length: e.length };
                            })
                    );
                }
                function p(e, t) {
                    switch (t) {
                        case r.NUMERIC:
                            return i.getBitsLength(e);
                        case r.ALPHANUMERIC:
                            return n.getBitsLength(e);
                        case r.KANJI:
                            return o.getBitsLength(e);
                        case r.BYTE:
                            return l.getBitsLength(e);
                    }
                }
                function m(e, t) {
                    var a,
                        s = r.getBestModeForData(e);
                    if ((a = r.from(t, s)) !== r.BYTE && a.bit < s.bit) throw new Error('"' + e + '" cannot be encoded with mode ' + r.toString(a) + ".\n Suggested mode is: " + r.toString(s));
                    switch ((a !== r.KANJI || u.isKanjiModeEnabled() || (a = r.BYTE), a)) {
                        case r.NUMERIC:
                            return new i(e);
                        case r.ALPHANUMERIC:
                            return new n(e);
                        case r.KANJI:
                            return new o(e);
                        case r.BYTE:
                            return new l(e);
                    }
                }
                (a.fromArray = function (e) {
                    return e.reduce(function (e, t) {
                        return "string" == typeof t ? e.push(m(t, null)) : t.data && e.push(m(t.data, t.mode)), e;
                    }, []);
                }),
                    (a.fromString = function (e, t) {
                        for (
                            var i = (function (e, t) {
                                    for (var a = {}, i = { start: {} }, n = ["start"], l = 0; l < e.length; l++) {
                                        for (var o = e[l], s = [], u = 0; u < o.length; u++) {
                                            var c = o[u],
                                                d = "" + l + u;
                                            s.push(d), (a[d] = { node: c, lastCount: 0 }), (i[d] = {});
                                            for (var f = 0; f < n.length; f++) {
                                                var h = n[f];
                                                a[h] && a[h].node.mode === c.mode
                                                    ? ((i[h][d] = p(a[h].lastCount + c.length, c.mode) - p(a[h].lastCount, c.mode)), (a[h].lastCount += c.length))
                                                    : (a[h] && (a[h].lastCount = c.length), (i[h][d] = p(c.length, c.mode) + 4 + r.getCharCountIndicator(c.mode, t)));
                                            }
                                        }
                                        n = s;
                                    }
                                    for (f = 0; f < n.length; f++) i[n[f]].end = 0;
                                    return { map: i, table: a };
                                })(
                                    (function (e) {
                                        for (var t = [], a = 0; a < e.length; a++) {
                                            var i = e[a];
                                            switch (i.mode) {
                                                case r.NUMERIC:
                                                    t.push([i, { data: i.data, mode: r.ALPHANUMERIC, length: i.length }, { data: i.data, mode: r.BYTE, length: i.length }]);
                                                    break;
                                                case r.ALPHANUMERIC:
                                                    t.push([i, { data: i.data, mode: r.BYTE, length: i.length }]);
                                                    break;
                                                case r.KANJI:
                                                    t.push([i, { data: i.data, mode: r.BYTE, length: d(i.data) }]);
                                                    break;
                                                case r.BYTE:
                                                    t.push([{ data: i.data, mode: r.BYTE, length: d(i.data) }]);
                                            }
                                        }
                                        return t;
                                    })(h(e, u.isKanjiModeEnabled())),
                                    t
                                ),
                                n = c.find_path(i.map, "start", "end"),
                                l = [],
                                o = 1;
                            o < n.length - 1;
                            o++
                        )
                            l.push(i.table[n[o]].node);
                        return a.fromArray(
                            (function (e) {
                                return e.reduce(function (e, t) {
                                    var a = e.length - 1 >= 0 ? e[e.length - 1] : null;
                                    return a && a.mode === t.mode ? ((e[e.length - 1].data += t.data), e) : (e.push(t), e);
                                }, []);
                            })(l)
                        );
                    }),
                    (a.rawSplit = function (e) {
                        return a.fromArray(h(e, u.isKanjiModeEnabled()));
                    });
            },
            { "./alphanumeric-data": 5, "./byte-data": 8, "./kanji-data": 14, "./mode": 16, "./numeric-data": 17, "./regex": 21, "./utils": 23, dijkstrajs: 1 },
        ],
        23: [
            function (e, t, a) {
                var r,
                    i = [
                        0,
                        26,
                        44,
                        70,
                        100,
                        134,
                        172,
                        196,
                        242,
                        292,
                        346,
                        404,
                        466,
                        532,
                        581,
                        655,
                        733,
                        815,
                        901,
                        991,
                        1085,
                        1156,
                        1258,
                        1364,
                        1474,
                        1588,
                        1706,
                        1828,
                        1921,
                        2051,
                        2185,
                        2323,
                        2465,
                        2611,
                        2761,
                        2876,
                        3034,
                        3196,
                        3362,
                        3532,
                        3706,
                    ];
                (a.getSymbolSize = function (e) {
                    if (!e) throw new Error('"version" cannot be null or undefined');
                    if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
                    return 4 * e + 17;
                }),
                    (a.getSymbolTotalCodewords = function (e) {
                        return i[e];
                    }),
                    (a.getBCHDigit = function (e) {
                        for (var t = 0; 0 !== e; ) t++, (e >>>= 1);
                        return t;
                    }),
                    (a.setToSJISFunction = function (e) {
                        if ("function" != typeof e) throw new Error('"toSJISFunc" is not a valid function.');
                        r = e;
                    }),
                    (a.isKanjiModeEnabled = function () {
                        return void 0 !== r;
                    }),
                    (a.toSJIS = function (e) {
                        return r(e);
                    });
            },
            {},
        ],
        24: [
            function (e, t, a) {
                a.isValid = function (e) {
                    return !isNaN(e) && e >= 1 && e <= 40;
                };
            },
            {},
        ],
        25: [
            function (e, t, a) {
                var r = e("./utils"),
                    i = e("./error-correction-code"),
                    n = e("./error-correction-level"),
                    l = e("./mode"),
                    o = e("./version-check"),
                    s = e("isarray"),
                    u = r.getBCHDigit(7973);
                function c(e, t) {
                    return l.getCharCountIndicator(e, t) + 4;
                }
                function d(e, t) {
                    var a = 0;
                    return (
                        e.forEach(function (e) {
                            var r = c(e.mode, t);
                            a += r + e.getBitsLength();
                        }),
                        a
                    );
                }
                (a.from = function (e, t) {
                    return o.isValid(e) ? parseInt(e, 10) : t;
                }),
                    (a.getCapacity = function (e, t, a) {
                        if (!o.isValid(e)) throw new Error("Invalid QR Code version");
                        void 0 === a && (a = l.BYTE);
                        var n = 8 * (r.getSymbolTotalCodewords(e) - i.getTotalCodewordsCount(e, t));
                        if (a === l.MIXED) return n;
                        var s = n - c(a, e);
                        switch (a) {
                            case l.NUMERIC:
                                return Math.floor((s / 10) * 3);
                            case l.ALPHANUMERIC:
                                return Math.floor((s / 11) * 2);
                            case l.KANJI:
                                return Math.floor(s / 13);
                            case l.BYTE:
                            default:
                                return Math.floor(s / 8);
                        }
                    }),
                    (a.getBestVersionForData = function (e, t) {
                        var r,
                            i = n.from(t, n.M);
                        if (s(e)) {
                            if (e.length > 1)
                                return (function (e, t) {
                                    for (var r = 1; r <= 40; r++) if (d(e, r) <= a.getCapacity(r, t, l.MIXED)) return r;
                                })(e, i);
                            if (0 === e.length) return 1;
                            r = e[0];
                        } else r = e;
                        return (function (e, t, r) {
                            for (var i = 1; i <= 40; i++) if (t <= a.getCapacity(i, r, e)) return i;
                        })(r.mode, r.getLength(), i);
                    }),
                    (a.getEncodedBits = function (e) {
                        if (!o.isValid(e) || e < 7) throw new Error("Invalid QR Code version");
                        for (var t = e << 12; r.getBCHDigit(t) - u >= 0; ) t ^= 7973 << (r.getBCHDigit(t) - u);
                        return (e << 12) | t;
                    });
            },
            { "./error-correction-code": 9, "./error-correction-level": 10, "./mode": 16, "./utils": 23, "./version-check": 24, isarray: 30 },
        ],
        26: [
            function (e, t, a) {
                var r = e("./utils");
                (a.render = function (e, t, a) {
                    var i = a,
                        n = t;
                    void 0 !== i || (t && t.getContext) || ((i = t), (t = void 0)),
                        t ||
                            (n = (function () {
                                try {
                                    return document.createElement("canvas");
                                } catch (e) {
                                    throw new Error("You need to specify a canvas element");
                                }
                            })()),
                        (i = r.getOptions(i));
                    var l = r.getImageWidth(e.modules.size, i),
                        o = n.getContext("2d"),
                        s = o.createImageData(l, l);
                    return (
                        r.qrToImageData(s.data, e, i),
                        (function (e, t, a) {
                            e.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), (t.height = a), (t.width = a), (t.style.height = a + "px"), (t.style.width = a + "px");
                        })(o, n, l),
                        o.putImageData(s, 0, 0),
                        n
                    );
                }),
                    (a.renderToDataURL = function (e, t, r) {
                        var i = r;
                        void 0 !== i || (t && t.getContext) || ((i = t), (t = void 0)), i || (i = {});
                        var n = a.render(e, t, i),
                            l = i.type || "image/png",
                            o = i.rendererOpts || {};
                        return n.toDataURL(l, o.quality);
                    });
            },
            { "./utils": 28 },
        ],
        27: [
            function (e, t, a) {
                var r = e("./utils");
                function i(e, t) {
                    var a = e.a / 255,
                        r = t + '="' + e.hex + '"';
                    return a < 1 ? r + " " + t + '-opacity="' + a.toFixed(2).slice(1) + '"' : r;
                }
                function n(e, t, a) {
                    var r = e + t;
                    return void 0 !== a && (r += " " + a), r;
                }
                a.render = function (e, t, a) {
                    var l = r.getOptions(t),
                        o = e.modules.size,
                        s = e.modules.data,
                        u = o + 2 * l.margin,
                        c = l.color.light.a ? "<path " + i(l.color.light, "fill") + ' d="M0 0h' + u + "v" + u + 'H0z"/>' : "",
                        d =
                            "<path " +
                            i(l.color.dark, "stroke") +
                            ' d="' +
                            (function (e, t, a) {
                                for (var r = "", i = 0, l = !1, o = 0, s = 0; s < e.length; s++) {
                                    var u = Math.floor(s % t),
                                        c = Math.floor(s / t);
                                    u || l || (l = !0), e[s] ? (o++, (s > 0 && u > 0 && e[s - 1]) || ((r += l ? n("M", u + a, 0.5 + c + a) : n("m", i, 0)), (i = 0), (l = !1)), (u + 1 < t && e[s + 1]) || ((r += n("h", o)), (o = 0))) : i++;
                                }
                                return r;
                            })(s, o, l.margin) +
                            '"/>',
                        f = 'viewBox="0 0 ' + u + " " + u + '"',
                        h = '<svg xmlns="http://www.w3.org/2000/svg" ' + (l.width ? 'width="' + l.width + '" height="' + l.width + '" ' : "") + f + ' shape-rendering="crispEdges">' + c + d + "</svg>\n";
                    return "function" == typeof a && a(null, h), h;
                };
            },
            { "./utils": 28 },
        ],
        28: [
            function (e, t, a) {
                function r(e) {
                    if ("string" != typeof e) throw new Error("Color should be defined as hex string");
                    var t = e.slice().replace("#", "").split("");
                    if (t.length < 3 || 5 === t.length || t.length > 8) throw new Error("Invalid hex color: " + e);
                    (3 !== t.length && 4 !== t.length) ||
                        (t = Array.prototype.concat.apply(
                            [],
                            t.map(function (e) {
                                return [e, e];
                            })
                        )),
                        6 === t.length && t.push("F", "F");
                    var a = parseInt(t.join(""), 16);
                    return { r: (a >> 24) & 255, g: (a >> 16) & 255, b: (a >> 8) & 255, a: 255 & a, hex: "#" + t.slice(0, 6).join("") };
                }
                (a.getOptions = function (e) {
                    e || (e = {}), e.color || (e.color = {});
                    var t = void 0 === e.margin || null === e.margin || e.margin < 0 ? 4 : e.margin,
                        a = e.width && e.width >= 21 ? e.width : void 0,
                        i = e.scale || 4;
                    return { width: a, scale: a ? 4 : i, margin: t, color: { dark: r(e.color.dark || "#000000ff"), light: r(e.color.light || "#ffffffff") }, type: e.type, rendererOpts: e.rendererOpts || {} };
                }),
                    (a.getScale = function (e, t) {
                        return t.width && t.width >= e + 2 * t.margin ? t.width / (e + 2 * t.margin) : t.scale;
                    }),
                    (a.getImageWidth = function (e, t) {
                        var r = a.getScale(e, t);
                        return Math.floor((e + 2 * t.margin) * r);
                    }),
                    (a.qrToImageData = function (e, t, r) {
                        for (var i = t.modules.size, n = t.modules.data, l = a.getScale(i, r), o = Math.floor((i + 2 * r.margin) * l), s = r.margin * l, u = [r.color.light, r.color.dark], c = 0; c < o; c++)
                            for (var d = 0; d < o; d++) {
                                var f = 4 * (c * o + d),
                                    h = r.color.light;
                                if (c >= s && d >= s && c < o - s && d < o - s) h = u[n[Math.floor((c - s) / l) * i + Math.floor((d - s) / l)] ? 1 : 0];
                                (e[f++] = h.r), (e[f++] = h.g), (e[f++] = h.b), (e[f] = h.a);
                            }
                    });
            },
            {},
        ],
        29: [
            function (e, t, a) {
                "use strict";
                var r = e("isarray");
                n.TYPED_ARRAY_SUPPORT = (function () {
                    try {
                        var e = new Uint8Array(1);
                        return (
                            (e.__proto__ = {
                                __proto__: Uint8Array.prototype,
                                foo: function () {
                                    return 42;
                                },
                            }),
                            42 === e.foo()
                        );
                    } catch (e) {
                        return !1;
                    }
                })();
                var i = n.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                function n(e, t, a) {
                    return n.TYPED_ARRAY_SUPPORT || this instanceof n
                        ? "number" == typeof e
                            ? s(this, e)
                            : (function (e, t, a, r) {
                                  if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                                  if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer)
                                      return (function (e, t, a, r) {
                                          if (a < 0 || t.byteLength < a) throw new RangeError("'offset' is out of bounds");
                                          if (t.byteLength < a + (r || 0)) throw new RangeError("'length' is out of bounds");
                                          var i;
                                          i = void 0 === a && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, a) : new Uint8Array(t, a, r);
                                          n.TYPED_ARRAY_SUPPORT ? (i.__proto__ = n.prototype) : (i = u(e, i));
                                          return i;
                                      })(e, t, a, r);
                                  if ("string" == typeof t)
                                      return (function (e, t) {
                                          var a = 0 | d(t),
                                              r = o(e, a),
                                              i = r.write(t);
                                          i !== a && (r = r.slice(0, i));
                                          return r;
                                      })(e, t);
                                  return (function (e, t) {
                                      if (n.isBuffer(t)) {
                                          var a = 0 | l(t.length),
                                              r = o(e, a);
                                          return 0 === r.length ? r : (t.copy(r, 0, 0, a), r);
                                      }
                                      if (t) {
                                          if (("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer) || "length" in t) return "number" != typeof t.length || (i = t.length) != i ? o(e, 0) : u(e, t);
                                          if ("Buffer" === t.type && Array.isArray(t.data)) return u(e, t.data);
                                      }
                                      var i;
                                      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                                  })(e, t);
                              })(this, e, t, a)
                        : new n(e, t, a);
                }
                function l(e) {
                    if (e >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
                    return 0 | e;
                }
                function o(e, t) {
                    var a;
                    return n.TYPED_ARRAY_SUPPORT ? ((a = new Uint8Array(t)).__proto__ = n.prototype) : (null === (a = e) && (a = new n(t)), (a.length = t)), a;
                }
                function s(e, t) {
                    var a = o(e, t < 0 ? 0 : 0 | l(t));
                    if (!n.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) a[r] = 0;
                    return a;
                }
                function u(e, t) {
                    for (var a = t.length < 0 ? 0 : 0 | l(t.length), r = o(e, a), i = 0; i < a; i += 1) r[i] = 255 & t[i];
                    return r;
                }
                function c(e, t) {
                    var a;
                    t = t || 1 / 0;
                    for (var r = e.length, i = null, n = [], l = 0; l < r; ++l) {
                        if ((a = e.charCodeAt(l)) > 55295 && a < 57344) {
                            if (!i) {
                                if (a > 56319) {
                                    (t -= 3) > -1 && n.push(239, 191, 189);
                                    continue;
                                }
                                if (l + 1 === r) {
                                    (t -= 3) > -1 && n.push(239, 191, 189);
                                    continue;
                                }
                                i = a;
                                continue;
                            }
                            if (a < 56320) {
                                (t -= 3) > -1 && n.push(239, 191, 189), (i = a);
                                continue;
                            }
                            a = 65536 + (((i - 55296) << 10) | (a - 56320));
                        } else i && (t -= 3) > -1 && n.push(239, 191, 189);
                        if (((i = null), a < 128)) {
                            if ((t -= 1) < 0) break;
                            n.push(a);
                        } else if (a < 2048) {
                            if ((t -= 2) < 0) break;
                            n.push((a >> 6) | 192, (63 & a) | 128);
                        } else if (a < 65536) {
                            if ((t -= 3) < 0) break;
                            n.push((a >> 12) | 224, ((a >> 6) & 63) | 128, (63 & a) | 128);
                        } else {
                            if (!(a < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            n.push((a >> 18) | 240, ((a >> 12) & 63) | 128, ((a >> 6) & 63) | 128, (63 & a) | 128);
                        }
                    }
                    return n;
                }
                function d(e) {
                    return n.isBuffer(e)
                        ? e.length
                        : "undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
                        ? e.byteLength
                        : ("string" != typeof e && (e = "" + e), 0 === e.length ? 0 : c(e).length);
                }
                n.TYPED_ARRAY_SUPPORT &&
                    ((n.prototype.__proto__ = Uint8Array.prototype),
                    (n.__proto__ = Uint8Array),
                    "undefined" != typeof Symbol && Symbol.species && n[Symbol.species] === n && Object.defineProperty(n, Symbol.species, { value: null, configurable: !0, enumerable: !1, writable: !1 })),
                    (n.prototype.write = function (e, t, a) {
                        void 0 === t ? ((a = this.length), (t = 0)) : void 0 === a && "string" == typeof t ? ((a = this.length), (t = 0)) : isFinite(t) && ((t |= 0), isFinite(a) ? (a |= 0) : (a = void 0));
                        var r = this.length - t;
                        if (((void 0 === a || a > r) && (a = r), (e.length > 0 && (a < 0 || t < 0)) || t > this.length)) throw new RangeError("Attempt to write outside buffer bounds");
                        return (function (e, t, a, r) {
                            return (function (e, t, a, r) {
                                for (var i = 0; i < r && !(i + a >= t.length || i >= e.length); ++i) t[i + a] = e[i];
                                return i;
                            })(c(t, e.length - a), e, a, r);
                        })(this, e, t, a);
                    }),
                    (n.prototype.slice = function (e, t) {
                        var a,
                            r = this.length;
                        if (((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), n.TYPED_ARRAY_SUPPORT))
                            (a = this.subarray(e, t)).__proto__ = n.prototype;
                        else {
                            var i = t - e;
                            a = new n(i, void 0);
                            for (var l = 0; l < i; ++l) a[l] = this[l + e];
                        }
                        return a;
                    }),
                    (n.prototype.copy = function (e, t, a, r) {
                        if ((a || (a = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < a && (r = a), r === a)) return 0;
                        if (0 === e.length || 0 === this.length) return 0;
                        if (t < 0) throw new RangeError("targetStart out of bounds");
                        if (a < 0 || a >= this.length) throw new RangeError("sourceStart out of bounds");
                        if (r < 0) throw new RangeError("sourceEnd out of bounds");
                        r > this.length && (r = this.length), e.length - t < r - a && (r = e.length - t + a);
                        var i,
                            l = r - a;
                        if (this === e && a < t && t < r) for (i = l - 1; i >= 0; --i) e[i + t] = this[i + a];
                        else if (l < 1e3 || !n.TYPED_ARRAY_SUPPORT) for (i = 0; i < l; ++i) e[i + t] = this[i + a];
                        else Uint8Array.prototype.set.call(e, this.subarray(a, a + l), t);
                        return l;
                    }),
                    (n.prototype.fill = function (e, t, a) {
                        if ("string" == typeof e) {
                            if (("string" == typeof t ? ((t = 0), (a = this.length)) : "string" == typeof a && (a = this.length), 1 === e.length)) {
                                var r = e.charCodeAt(0);
                                r < 256 && (e = r);
                            }
                        } else "number" == typeof e && (e &= 255);
                        if (t < 0 || this.length < t || this.length < a) throw new RangeError("Out of range index");
                        if (a <= t) return this;
                        var i;
                        if (((t >>>= 0), (a = void 0 === a ? this.length : a >>> 0), e || (e = 0), "number" == typeof e)) for (i = t; i < a; ++i) this[i] = e;
                        else {
                            var l = n.isBuffer(e) ? e : new n(e),
                                o = l.length;
                            for (i = 0; i < a - t; ++i) this[i + t] = l[i % o];
                        }
                        return this;
                    }),
                    (n.concat = function (e, t) {
                        if (!r(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                        if (0 === e.length) return o(null, 0);
                        var a;
                        if (void 0 === t) for (t = 0, a = 0; a < e.length; ++a) t += e[a].length;
                        var i = s(null, t),
                            l = 0;
                        for (a = 0; a < e.length; ++a) {
                            var u = e[a];
                            if (!n.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
                            u.copy(i, l), (l += u.length);
                        }
                        return i;
                    }),
                    (n.byteLength = d),
                    (n.prototype._isBuffer = !0),
                    (n.isBuffer = function (e) {
                        return !(null == e || !e._isBuffer);
                    }),
                    (t.exports = n);
            },
            { isarray: 30 },
        ],
        30: [
            function (e, t, a) {
                var r = {}.toString;
                t.exports =
                    Array.isArray ||
                    function (e) {
                        return "[object Array]" == r.call(e);
                    };
            },
            {},
        ],
        31: [
            function (e, t, a) {
                "use strict";
                Object.defineProperty(a, "__esModule", { value: !0 });
                var r = (function () {
                    function e(e, t) {
                        for (var a = 0; a < t.length; a++) {
                            var r = t[a];
                            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function (t, a, r) {
                        return a && e(t.prototype, a), r && e(t, r), t;
                    };
                })();
                var i = (function () {
                    function e() {
                        !(function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, e);
                    }
                    return (
                        r(e, [
                            {
                                key: "getKey",
                                value: function (e, t) {
                                    var a = e + "|";
                                    for (var r in t) a += r + "=" + t[r] + "|";
                                    return a;
                                },
                            },
                            {
                                key: "invalidateTable",
                                value: function (e) {
                                    for (var t = void 0, a = 0; a < localStorage.length; a++) (t = localStorage.key(a)).indexOf("t=" + e) > 0 && localStorage.removeItem(t);
                                },
                            },
                            {
                                key: "getData",
                                value: function (e) {
                                    var t = void 0;
                                    if ("undefined" == typeof Storage) return null;
                                    var a = localStorage.getItem(e);
                                    return void 0 !== a && null != a && "" !== a ? (void 0 === (t = JSON.parse(a)) || null == t ? null : void 0 !== t.status && null != t.status && "SUCCESS" !== t.status ? null : t) : null;
                                },
                            },
                            {
                                key: "setData",
                                value: function (e, t) {
                                    if ("undefined" == typeof Storage) return null;
                                    if (void 0 !== t.status && null != t.status && "SUCCESS" !== t.status) return null;
                                    var a = JSON.stringify(t);
                                    return localStorage.setItem(e, a), a;
                                },
                            },
                        ]),
                        e
                    );
                })();
                a.default = i;
            },
            {},
        ],
        32: [
            function (e, t, a) {
                "use strict";
                Object.defineProperty(a, "__esModule", { value: !0 });
                var r = (function () {
                        function e(e, t) {
                            for (var a = 0; a < t.length; a++) {
                                var r = t[a];
                                (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                            }
                        }
                        return function (t, a, r) {
                            return a && e(t.prototype, a), r && e(t, r), t;
                        };
                    })(),
                    i = l(e("./ModuleBase")),
                    n = l(e("../api-common/RequestCache"));
                function l(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                var o = (function (e) {
                    function t(e, a, r, i) {
                        !(function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, t);
                        var n = (function (e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
                        })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return (n.moduleRelativeURL = null), (n.tableData = []), (n.sourceData = []), (n.filter = null), (n.origFilter = null), (n.orderBy = null), (n.currentElement = null), n.initAdapter(e, a, r, i), n;
                    }
                    return (
                        (function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
                        })(t, i.default),
                        r(t, [
                            {
                                key: "initAdapter",
                                value: function (e, t, a, r) {
                                    (this.moduleRelativeURL = baseUrl),
                                        (this.table = e),
                                        (this.tab = null == t ? e : t),
                                        (this.filter = null == a ? null : a),
                                        (this.origFilter = this.filter),
                                        (this.orderBy = null == r ? null : r),
                                        this.trackEvent("initAdapter", t),
                                        (this.requestCache = new n.default());
                                },
                            },
                            {
                                key: "setFilter",
                                value: function (e) {
                                    this.filter = e;
                                },
                            },
                            {
                                key: "preSetFilterExternal",
                                value: function (e) {
                                    this.initialFilter = e;
                                },
                            },
                            {
                                key: "setFilterExternal",
                                value: function (e) {
                                    var t = e;
                                    null == t && (t = this.initialFilter),
                                        null != t && (this.setFilter(t), (this.filtersAlreadySet = !0), $("#" + this.getTableName() + "_resetFilters").show(), (this.currentFilterString = this.getFilterString(t)));
                                },
                            },
                            {
                                key: "getFilter",
                                value: function () {
                                    return this.filter;
                                },
                            },
                            {
                                key: "setOrderBy",
                                value: function (e) {
                                    this.orderBy = e;
                                },
                            },
                            {
                                key: "getOrderBy",
                                value: function () {
                                    return this.orderBy;
                                },
                            },
                            {
                                key: "add",
                                value: function (e, t, a, r) {
                                    var i = this;
                                    null == a && (a = !0),
                                        $(e).attr("a", "add"),
                                        $(e).attr("t", this.table),
                                        i.showLoader(),
                                        this.requestCache.invalidateTable(this.table),
                                        $.post(
                                            this.moduleRelativeURL,
                                            e,
                                            function (e) {
                                                "SUCCESS" === e.status ? i.addSuccessCallBack(t, e.object, a, r, i) : i.addFailCallBack(t, e.object);
                                            },
                                            "json"
                                        ).always(function () {
                                            i.hideLoader();
                                        }),
                                        this.trackEvent("add", this.tab, this.table);
                                },
                            },
                            {
                                key: "addSuccessCallBack",
                                value: function (e, t, a, r, i) {
                                    a && this.get(e), this.initFieldMasterData(), null != r && r.apply(i, [t]), this.trackEvent("addSuccess", this.tab, this.table);
                                },
                            },
                            {
                                key: "addFailCallBack",
                                value: function (e, t) {
                                    try {
                                        this.closePlainMessage();
                                    } catch (e) {}
                                    this.showMessage("Error saving", t), this.trackEvent("addFailed", this.tab, this.table);
                                },
                            },
                            {
                                key: "deleteObj",
                                value: function (e, t) {
                                    var a = this;
                                    a.showLoader(),
                                        this.requestCache.invalidateTable(this.table),
                                        $.post(
                                            this.moduleRelativeURL,
                                            { t: this.table, a: "delete", id: e },
                                            function (e) {
                                                "SUCCESS" === e.status ? a.deleteSuccessCallBack(t, e.object) : a.deleteFailCallBack(t, e.object);
                                            },
                                            "json"
                                        ).always(function () {
                                            a.hideLoader();
                                        }),
                                        this.trackEvent("delete", this.tab, this.table);
                                },
                            },
                            {
                                key: "deleteSuccessCallBack",
                                value: function (e, t) {
                                    this.get(e), this.clearDeleteParams();
                                },
                            },
                            {
                                key: "deleteFailCallBack",
                                value: function (e, t) {
                                    this.clearDeleteParams(), this.showMessage("Error Occurred while Deleting Item", t);
                                },
                            },
                            {
                                key: "get",
                                value: function (e) {
                                    var t = this;
                                    if (this.getRemoteTable()) return this.createTableServer(this.getTableName()), $("#" + this.getTableName() + "Form").hide(), void $("#" + this.getTableName()).show();
                                    var a = JSON.stringify(this.getSourceMapping()),
                                        r = "";
                                    null !== this.getFilter() && (r = JSON.stringify(this.getFilter()));
                                    var i = "";
                                    null !== this.getOrderBy() && (i = this.getOrderBy()),
                                        (a = this.fixJSON(a)),
                                        (r = this.fixJSON(r)),
                                        t.showLoader(),
                                        $.post(
                                            this.moduleRelativeURL,
                                            { t: this.table, a: "get", sm: a, ft: r, ob: i },
                                            function (a) {
                                                "SUCCESS" === a.status ? t.getSuccessCallBack(e, a.object) : t.getFailCallBack(e, a.object);
                                            },
                                            "json"
                                        ).always(function () {
                                            t.hideLoader();
                                        }),
                                        t.initFieldMasterData(),
                                        this.trackEvent("get", this.tab, this.table);
                                },
                            },
                            {
                                key: "getDataUrl",
                                value: function (e) {
                                    var t = JSON.stringify(this.getSourceMapping()),
                                        a = JSON.stringify(e),
                                        r = "";
                                    null !== this.getFilter() && (r = JSON.stringify(this.getFilter()));
                                    var i = "";
                                    null !== this.getOrderBy() && (i = this.getOrderBy());
                                    var n = this.moduleRelativeURL.replace("service.php", "data.php");
                                    return (
                                        (n = (n = (n = (n = (n = n + "?t=" + this.table) + "&sm=" + this.fixJSON(t)) + "&cl=" + this.fixJSON(a)) + "&ft=" + this.fixJSON(r)) + "&ob=" + i),
                                        this.isSubProfileTable() && (n += "&type=sub"),
                                        this.remoteTableSkipProfileRestriction() && (n += "&skip=1"),
                                        n
                                    );
                                },
                            },
                            {
                                key: "isSubProfileTable",
                                value: function () {
                                    return !1;
                                },
                            },
                            {
                                key: "remoteTableSkipProfileRestriction",
                                value: function () {
                                    return !1;
                                },
                            },
                            {
                                key: "preProcessTableData",
                                value: function (e) {
                                    return e;
                                },
                            },
                            {
                                key: "getSuccessCallBack",
                                value: function (e, t) {
                                    for (var a = [], r = this.getDataMapping(), i = 0; i < t.length; i++) {
                                        for (var n = [], l = 0; l < r.length; l++) n[l] = t[i][r[l]];
                                        a.push(this.preProcessTableData(n));
                                    }
                                    (this.sourceData = t),
                                        void 0 !== e.callBack &&
                                            null !== e.callBack &&
                                            ((void 0 !== e.callBackData && null !== e.callBackData) || (e.callBackData = []), e.callBackData.push(t), e.callBackData.push(a), this.callFunction(e.callBack, e.callBackData)),
                                        (this.tableData = a),
                                        (void 0 !== e.noRender && null !== e.noRender && !0 === e.noRender) || (this.createTable(this.getTableName()), $("#" + this.getTableName() + "Form").hide(), $("#" + this.getTableName()).show());
                                },
                            },
                            { key: "getFailCallBack", value: function (e, t) {} },
                            {
                                key: "getElement",
                                value: function (e, t, a) {
                                    var r = this,
                                        i = JSON.stringify(this.getSourceMapping());
                                    (i = this.fixJSON(i)),
                                        r.showLoader(),
                                        $.post(
                                            this.moduleRelativeURL,
                                            { t: this.table, a: "getElement", id: e, sm: i },
                                            function (e) {
                                                "SUCCESS" === e.status ? (a && delete e.object.id, (this.currentElement = e.object), r.getElementSuccessCallBack.apply(r, [t, e.object])) : r.getElementFailCallBack.apply(r, [t, e.object]);
                                            },
                                            "json"
                                        ).always(function () {
                                            r.hideLoader();
                                        }),
                                        this.trackEvent("getElement", this.tab, this.table);
                                },
                            },
                            {
                                key: "getElementSuccessCallBack",
                                value: function (e, t) {
                                    void 0 !== e.callBack &&
                                        null !== e.callBack &&
                                        ((void 0 !== e.callBackData && null !== e.callBackData) || (e.callBackData = []), e.callBackData.push(t), this.callFunction(e.callBack, e.callBackData, this)),
                                        (this.currentElement = t),
                                        (void 0 !== e.noRender && null !== e.noRender && !0 === e.noRender) || this.renderForm(t);
                                },
                            },
                            { key: "getElementFailCallBack", value: function (e, t) {} },
                            {
                                key: "getTableData",
                                value: function () {
                                    return this.tableData;
                                },
                            },
                            {
                                key: "getTableName",
                                value: function () {
                                    return this.tab;
                                },
                            },
                            {
                                key: "getFieldValues",
                                value: function (e, t) {
                                    var a = this,
                                        r = "",
                                        i = "";
                                    void 0 !== e[3] && null !== e[3] && (r = e[3]), void 0 !== e[4] && null !== e[4] && (i = JSON.stringify(e[4]));
                                    var n = this.requestCache.getKey(this.moduleRelativeURL, { t: e[0], key: e[1], value: e[2], method: r, methodParams: i, a: "getFieldValues" }),
                                        l = this.requestCache.getData(n);
                                    null != l &&
                                        "SUCCESS" === l.status &&
                                        (t.callBackData.push(l.data), null !== t.callBackSuccess && void 0 !== t.callBackSuccess && t.callBackData.push(t.callBackSuccess), a.callFunction(t.callBack, t.callBackData));
                                    var o = function e(r) {
                                        if ("SUCCESS" === r.status) {
                                            a.requestCache.setData(this.success.key, r);
                                            var i = t;
                                            (i.callBackData = [t.callBackData[0]]),
                                                i.callBackData.push(r.data),
                                                null !== i.callBackSuccess && void 0 !== i.callBackSuccess && i.callBackData.push(t.callBackSuccess),
                                                a.callFunction(i.callBack, i.callBackData);
                                        } else "Access violation" === r.message && alert("Error : " + e.table + " " + r.message);
                                    };
                                    (o.key = n), (o.table = e[0]), $.post(this.moduleRelativeURL, { t: e[0], key: e[1], value: e[2], method: r, methodParams: i, a: "getFieldValues" }, o, "json");
                                },
                            },
                            {
                                key: "setAdminProfile",
                                value: function (e) {
                                    try {
                                        localStorage.clear();
                                    } catch (e) {}
                                    $.post(
                                        this.moduleRelativeURL,
                                        { a: "setAdminEmp", empid: e },
                                        function () {
                                            top.location.href = clientUrl;
                                        },
                                        "json"
                                    );
                                },
                            },
                            {
                                key: "customAction",
                                value: function (e, t, a, r, i) {
                                    var n = this;
                                    (a = this.fixJSON(a)),
                                        i
                                            ? $.post(
                                                  this.moduleRelativeURL,
                                                  { t: this.table, a: "ca", sa: e, mod: t, req: a },
                                                  function (e) {
                                                      "SUCCESS" === e.status ? (r.callBackData.push(e.data), n.callFunction(r.callBackSuccess, r.callBackData)) : (r.callBackData.push(e.data), n.callFunction(r.callBackFail, r.callBackData));
                                                  },
                                                  "json"
                                              )
                                            : $.getJSON(this.moduleRelativeURL, { t: this.table, a: "ca", sa: e, mod: t, req: a }, function (e) {
                                                  "SUCCESS" === e.status ? (r.callBackData.push(e.data), n.callFunction(r.callBackSuccess, r.callBackData)) : (r.callBackData.push(e.data), n.callFunction(r.callBackFail, r.callBackData));
                                              });
                                },
                            },
                            {
                                key: "sendCustomRequest",
                                value: function (e, t, a, r) {
                                    (t.a = e),
                                        $.post(
                                            this.moduleRelativeURL,
                                            t,
                                            function (e) {
                                                "SUCCESS" === e.status ? a(e.data) : r(e.data);
                                            },
                                            "json"
                                        );
                                },
                            },
                            {
                                key: "getCustomActionUrl",
                                value: function (e, t) {
                                    t.a = e;
                                    var a = "";
                                    for (var r in t) t.hasOwnProperty(r) && ("" !== a && (a += "&"), (a += r + "=" + t[r]));
                                    return this.moduleRelativeURL + "?" + a;
                                },
                            },
                            {
                                key: "getClientDataUrl",
                                value: function () {
                                    return this.moduleRelativeURL.replace("service.php", "") + "data/";
                                },
                            },
                            {
                                key: "getCustomUrl",
                                value: function (e) {
                                    return this.moduleRelativeURL.replace("service.php", e);
                                },
                            },
                        ]),
                        t
                    );
                })();
                a.default = o;
            },
            { "../api-common/RequestCache": 31, "./ModuleBase": 34 },
        ],
        33: [
            function (e, t, a) {
                "use strict";
                Object.defineProperty(a, "__esModule", { value: !0 });
                var r = (function () {
                    function e(e, t) {
                        for (var a = 0; a < t.length; a++) {
                            var r = t[a];
                            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                        }
                    }
                    return function (t, a, r) {
                        return a && e(t.prototype, a), r && e(t, r), t;
                    };
                })();
                var i = {
                        float: function (e) {
                            return !(null == e || !e.match(/^[-+]?[0-9]+(\.[0-9]+)?$/));
                        },
                        number: function (e) {
                            return !(null == e || !e.match(/^[0-9]+$/));
                        },
                        numberOrEmpty: function (e) {
                            if ("" === e) return !0;
                            return !(null == e || !e.match(/^[0-9]+$/));
                        },
                        email: function (e) {
                            return null != e && /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/.test(e);
                        },
                        emailOrEmpty: function (e) {
                            if ("" === e) return !0;
                            return null != e && /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/.test(e);
                        },
                        username: function (e) {
                            return null != e && /^[a-zA-Z0-9.-]+$/.test(e);
                        },
                        input: function (e) {
                            return null != e && e.length > 0;
                        },
                    },
                    n = (function () {
                        function e(t, a, r) {
                            !(function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                            })(this, e),
                                (this.tempOptions = {}),
                                (this.formId = t),
                                (this.formError = !1),
                                (this.formObject = null),
                                (this.errorMessages = ""),
                                (this.popupDialog = null),
                                (this.validateAll = a),
                                (this.errorMap = []),
                                (this.settings = { thirdPartyPopup: null, LabelErrorClass: !1, ShowPopup: !0 }),
                                (this.settings = jQuery.extend(this.settings, r)),
                                (this.inputTypes = ["text", "radio", "checkbox", "file", "password", "select-one", "select-multi", "textarea", "fileupload", "signature"]),
                                (this.validator = i);
                        }
                        return (
                            r(
                                e,
                                [
                                    {
                                        key: "clearError",
                                        value: function (e, t) {
                                            var a = e.attr("id");
                                            $("#" + this.formId + " #field_" + a).removeClass("error"), $("#" + this.formId + " #help_" + a).html("");
                                        },
                                    },
                                    {
                                        key: "addError",
                                        value: function (e, t) {
                                            (this.formError = !0), null != e.attr("message") ? ((this.errorMessages += e.attr("message") + "\n"), (this.errorMap[e.attr("name")] = e.attr("message"))) : (this.errorMap[e.attr("name")] = "");
                                            var a = e.attr("id"),
                                                r = e.attr("validation"),
                                                i = e.attr("validation");
                                            $("#" + this.formId + " #field_" + a).addClass("error"),
                                                void 0 === i || null == i || "" === i
                                                    ? $("#" + this.formId + " #help_err_" + a).html(i)
                                                    : void 0 === r || null == r || "" === r
                                                    ? $("#" + this.formId + " #help_err_" + a).html("Required")
                                                    : "float" === r || "number" === r
                                                    ? $("#" + this.formId + " #help_err_" + a).html("Number required")
                                                    : "email" === r
                                                    ? $("#" + this.formId + " #help_err_" + a).html("Email required")
                                                    : $("#" + this.formId + " #help_err_" + a).html("Required");
                                        },
                                    },
                                    {
                                        key: "showErrors",
                                        value: function () {
                                            this.formError &&
                                                (void 0 !== this.settings.thirdPartyPopup && null != this.settings.thirdPartyPopup
                                                    ? this.settings.thirdPartyPopup.alert()
                                                    : !0 === this.settings.ShowPopup &&
                                                      (void 0 !== this.tempOptions.popupTop && null != this.tempOptions.popupTop
                                                          ? this.alert("Errors Found", this.errorMessages, this.tempOptions.popupTop)
                                                          : this.alert("Errors Found", this.errorMessages, -1)));
                                        },
                                    },
                                    {
                                        key: "checkValues",
                                        value: function (e) {
                                            this.tempOptions = e;
                                            var t = this;
                                            (this.formError = !1), (this.errorMessages = ""), (this.formObject = {});
                                            var a = function (e) {
                                                    var a = null,
                                                        r = e.attr("name");
                                                    !1 !== t.settings.LabelErrorClass && $("label[for='" + r + "']").removeClass(t.settings.LabelErrorClass);
                                                    var i = e.attr("id"),
                                                        n = e.attr("type");
                                                    if (e.hasClass("select2-focusser") || e.hasClass("select2-input")) return !0;
                                                    if (jQuery.inArray(n, t.inputTypes) >= 0) {
                                                        if (e.hasClass("uploadInput")) a = e.attr("val");
                                                        else if ("radio" === n || "checkbox" === n) a = $("input[name='" + r + "']:checked").val();
                                                        else if (e.hasClass("select2Field"))
                                                            a = null != $("#" + t.formId + " #" + i).select2("data") && void 0 !== $("#" + t.formId + " #" + i).select2("data") ? $("#" + t.formId + " #" + i).select2("data").id : "";
                                                        else if (e.hasClass("select2Multi"))
                                                            if (null != $("#" + t.formId + " #" + i).select2("data") && void 0 !== $("#" + t.formId + " #" + i).select2("data")) {
                                                                var l = $("#" + t.formId + " #" + i).select2("data");
                                                                a = [];
                                                                for (var o = 0; o < l.length; o++) a.push(l[o].id);
                                                                a = JSON.stringify(a);
                                                            } else a = "";
                                                        else
                                                            a = e.hasClass("signatureField")
                                                                ? $("#" + t.formId + " #" + i)
                                                                      .data("signaturePad")
                                                                      .isEmpty()
                                                                    ? ""
                                                                    : $("#" + i)
                                                                          .data("signaturePad")
                                                                          .toDataURL()
                                                                : e.hasClass("simplemde")
                                                                ? $("#" + t.formId + " #" + i)
                                                                      .data("simplemde")
                                                                      .value()
                                                                : e.hasClass("tinymce")
                                                                ? tinyMCE.get(i).getContent({ format: "raw" })
                                                                : e.val();
                                                        var s = e.attr("validation"),
                                                            u = !1;
                                                        void 0 !== s && null != s && void 0 !== t.validator[s] && null != t.validator[s]
                                                            ? (u = t.validator[s](a))
                                                            : ((u = !t.validateAll || (void 0 !== s && null != s && "none" === s) || t.validator.input(a)), (t.formObject[i] = a)),
                                                            u ? (t.clearError(e, null), (t.formObject[i] = a)) : t.addError(e, null);
                                                    }
                                                },
                                                r = $("#" + this.formId + " :input");
                                            return (
                                                r.each(function () {
                                                    a($(this));
                                                }),
                                                (r = $("#" + this.formId + " .uploadInput")).each(function () {
                                                    a($(this));
                                                }),
                                                this.showErrors(),
                                                (this.tempOptions = {}),
                                                !this.formError
                                            );
                                        },
                                    },
                                    {
                                        key: "getFormParameters",
                                        value: function () {
                                            return this.formObject;
                                        },
                                    },
                                    {
                                        key: "alert",
                                        value: (function (e) {
                                            function t(t, a) {
                                                return e.apply(this, arguments);
                                            }
                                            return (
                                                (t.toString = function () {
                                                    return e.toString();
                                                }),
                                                t
                                            );
                                        })(function (e, t) {
                                            alert(t);
                                        }),
                                    },
                                ],
                                [
                                    {
                                        key: "getValidationRules",
                                        value: function () {
                                            return i;
                                        },
                                    },
                                ]
                            ),
                            e
                        );
                    })();
                a.default = n;
            },
            {},
        ],
        34: [
            function (e, t, a) {
                "use strict";
                Object.defineProperty(a, "__esModule", { value: !0 });
                var r,
                    i = (function () {
                        function e(e, t) {
                            for (var a = 0; a < t.length; a++) {
                                var r = t[a];
                                (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                            }
                        }
                        return function (t, a, r) {
                            return a && e(t.prototype, a), r && e(t, r), t;
                        };
                    })(),
                    n = e("./FormValidation"),
                    l = (r = n) && r.__esModule ? r : { default: r };
                var o = (function () {
                    function e() {
                        !(function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, e),
                            (this.deleteParams = {}),
                            (this.createRemoteTable = !1),
                            (this.instanceId = "None"),
                            (this.ga = []),
                            (this.showEdit = !0),
                            (this.showDelete = !0),
                            (this.showSave = !0),
                            (this.showCancel = !0),
                            (this.showFormOnPopup = !1),
                            (this.filtersAlreadySet = !1),
                            (this.currentFilterString = ""),
                            (this.sorting = 0),
                            (this.settings = {}),
                            (this.translations = {}),
                            (this.customFields = []),
                            (this.csrfRequired = !1),
                            (this.fieldTemplates = null),
                            (this.templates = null),
                            (this.customTemplates = null),
                            (this.emailTemplates = null),
                            (this.fieldMasterData = null),
                            (this.fieldMasterDataKeys = null),
                            (this.fieldMasterDataCallback = null),
                            (this.sourceMapping = null),
                            (this.currentId = null),
                            (this.currentElement = null),
                            (this.user = null),
                            (this.currentProfile = null),
                            (this.permissions = {}),
                            (this.baseUrl = null);
                    }
                    return (
                        i(e, [
                            { key: "init", value: function (e, t, a, r) {} },
                            {
                                key: "setNoJSONRequests",
                                value: function (e) {
                                    this.noJSONRequests = e;
                                },
                            },
                            {
                                key: "setPermissions",
                                value: function (e) {
                                    this.permissions = e;
                                },
                            },
                            {
                                key: "sortingStarted",
                                value: function (e) {
                                    this.sorting = e;
                                },
                            },
                            {
                                key: "checkPermission",
                                value: function (e) {
                                    return void 0 === this.permissions[e] || null == this.permissions[e] || "Yes" === this.permissions[e] ? "Yes" : this.permissions[e];
                                },
                            },
                            {
                                key: "setBaseUrl",
                                value: function (e) {
                                    this.baseUrl = e;
                                },
                            },
                            {
                                key: "setUser",
                                value: function (e) {
                                    this.user = e;
                                },
                            },
                            {
                                key: "getUser",
                                value: function () {
                                    return this.user;
                                },
                            },
                            {
                                key: "setInstanceId",
                                value: function (e) {
                                    this.instanceId = e;
                                },
                            },
                            {
                                key: "setCSRFRequired",
                                value: function (e) {
                                    this.csrfRequired = e;
                                },
                            },
                            {
                                key: "scrollToTop",
                                value: function () {
                                    $("html, body").animate({ scrollTop: 0 }, "fast");
                                },
                            },
                            {
                                key: "scrollToBottom",
                                value: function () {
                                    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
                                },
                            },
                            {
                                key: "scrollToElement",
                                value: function (e) {
                                    $(window).height() <= e.offset().top && $("html, body").animate({ scrollTop: e.offset().top }, "slow");
                                },
                            },
                            {
                                key: "scrollToElementBottom",
                                value: function (e) {
                                    $(window).height() <= e.offset().top + e.height() && $("html, body").animate({ scrollTop: e.offset().top + e.height() }, "slow");
                                },
                            },
                            {
                                key: "setTranslations",
                                value: function (e) {
                                    this.translations = e.messages[""];
                                },
                            },
                            {
                                key: "setTranslationsSubModules",
                                value: function (e) {
                                    this.translations = e;
                                },
                            },
                            {
                                key: "gt",
                                value: function (e) {
                                    return void 0 === this.translations[e] || null === this.translations[e] ? e : this.translations[e][0];
                                },
                            },
                            {
                                key: "addToLangTerms",
                                value: function (e) {
                                    var t = void 0,
                                        a = localStorage.getItem("terms");
                                    if (void 0 === a) t = {};
                                    else
                                        try {
                                            t = JSON.parse(a);
                                        } catch (e) {
                                            t = {};
                                        }
                                    void 0 === this.translations[e] && ((t[e] = e), localStorage.setItem("terms", JSON.stringify(t)));
                                },
                            },
                            {
                                key: "showActionButtons",
                                value: function () {
                                    return !0;
                                },
                            },
                            {
                                key: "trackEvent",
                                value: function (e, t, a) {
                                    try {
                                        void 0 === t || null == t
                                            ? this.ga.push(["_trackEvent", this.instanceId, e])
                                            : void 0 === a || null == a
                                            ? this.ga.push(["_trackEvent", this.instanceId, e, t])
                                            : this.ga.push(["_trackEvent", this.instanceId, e, t, a]);
                                    } catch (e) {}
                                },
                            },
                            {
                                key: "setCurrentProfile",
                                value: function (e) {
                                    this.currentProfile = e;
                                },
                            },
                            {
                                key: "getCurrentProfile",
                                value: function () {
                                    return this.currentProfile;
                                },
                            },
                            {
                                key: "initFieldMasterData",
                                value: function (e, t, a) {
                                    var r = void 0;
                                    (void 0 !== this.showAddNew && null != this.showAddNew) || (this.showAddNew = !0),
                                        (this.fieldMasterData = {}),
                                        (this.fieldMasterDataKeys = {}),
                                        (this.fieldMasterDataCallback = t),
                                        (this.fieldMasterDataCallbackData = a),
                                        (this.sourceMapping = {});
                                    var i = this.getFormFields(),
                                        n = this.getFilters();
                                    if (null != n) for (var l = 0; l < n.length; l++) (null == (r = this.getMetaFieldValues(n[l][0], i)) || ("select" !== r.type && "select2" !== r.type && "select2multi" !== r.type)) && i.push(n[l]);
                                    for (var o = [], s = [], u = null, c = null, d = 0; d < i.length; d++)
                                        if (void 0 !== (u = i[d])[1]["remote-source"] && null !== u[1]["remote-source"]) {
                                            var f = u[1]["remote-source"][0] + "_" + u[1]["remote-source"][1] + "_" + u[1]["remote-source"][2];
                                            o.push(u), s.push(f);
                                        } else if (void 0 !== u[1].form && null !== u[1].form)
                                            for (var h = 0; h < u[1].form.length; h++)
                                                if (void 0 !== (c = u[1].form[h])[1]["remote-source"] && null !== c[1]["remote-source"]) {
                                                    var p = c[1]["remote-source"][0] + "_" + c[1]["remote-source"][1] + "_" + c[1]["remote-source"][2];
                                                    s.indexOf(p) < 0 && (o.push(c), s.push(p));
                                                }
                                    for (var m = 0; m < o.length; m++) {
                                        var v = o[m];
                                        if (void 0 !== v[1]["remote-source"] && null != v[1]["remote-source"]) {
                                            var g = v[1]["remote-source"][0] + "_" + v[1]["remote-source"][1] + "_" + v[1]["remote-source"][2];
                                            (this.fieldMasterDataKeys[g] = !1), (this.sourceMapping[v[0]] = v[1]["remote-source"]);
                                            var y = { callBack: "initFieldMasterDataResponse" };
                                            (y.callBackData = [g]), null != e && (y.callBackSuccess = e), this.getFieldValues(v[1]["remote-source"], y);
                                        }
                                    }
                                },
                            },
                            {
                                key: "setShowFormOnPopup",
                                value: function (e) {
                                    this.showFormOnPopup = e;
                                },
                            },
                            {
                                key: "setRemoteTable",
                                value: function (e) {
                                    this.createRemoteTable = e;
                                },
                            },
                            {
                                key: "setSettings",
                                value: function (e) {
                                    this.settings = e;
                                },
                            },
                            {
                                key: "getRemoteTable",
                                value: function () {
                                    return this.createRemoteTable;
                                },
                            },
                            {
                                key: "isAllLoaded",
                                value: function (e) {
                                    for (var t in e) if (!1 === e[t]) return !1;
                                    return !0;
                                },
                            },
                            {
                                key: "initFieldMasterDataResponse",
                                value: function (e, t, a, r) {
                                    (this.fieldMasterData[e] = t),
                                        (this.fieldMasterDataKeys[e] = !0),
                                        null != a && a(),
                                        null !== this.fieldMasterDataCallback &&
                                        void 0 !== this.fieldMasterDataCallback &&
                                        this.isAllLoaded(this.fieldMasterDataKeys) &&
                                        null !== this.fieldMasterDataCallbackData &&
                                        void 0 !== this.fieldMasterDataCallbackData
                                            ? this.fieldMasterDataCallback(this.fieldMasterDataCallbackData)
                                            : null !== this.fieldMasterDataCallback && void 0 !== this.fieldMasterDataCallback && this.isAllLoaded(this.fieldMasterDataKeys) && this.fieldMasterDataCallback();
                                },
                            },
                            {
                                key: "getMetaFieldValues",
                                value: function (e, t) {
                                    for (var a = 0; a < t.length; a++) if (e === t[a][0]) return t[a][1];
                                    return null;
                                },
                            },
                            {
                                key: "getThemeColors",
                                value: function () {
                                    return ["red", "yellow", "aqua", "blue", "light-blue", "green", "navy", "teal", "olive", "orange", "fuchsia", "purple"];
                                },
                            },
                            {
                                key: "getColorByRandomString",
                                value: function (e) {
                                    var t = this.getThemeColors();
                                    return t[e.charCodeAt(0) % t.length];
                                },
                            },
                            {
                                key: "getColorByFileType",
                                value: function (e) {
                                    e = e.toLowerCase();
                                    var t = { pdf: "red", csv: "yellow", xls: "green", xlsx: "green", doc: "light-blue", docx: "light-blue" };
                                    return (
                                        (t.docx = "blue"),
                                        (t.ppt = "orange"),
                                        (t.pptx = "orange"),
                                        (t.jpg = "teal"),
                                        (t.jpeg = "teal"),
                                        (t.gif = "green"),
                                        (t.png = "yellow"),
                                        (t.bmp = "fuchsia"),
                                        void 0 !== t[e] || null != t[e] ? t[e] : this.getColorByRandomString(e)
                                    );
                                },
                            },
                            {
                                key: "getIconByFileType",
                                value: function (e) {
                                    var t = {
                                        pdf: "fa fa-file-pdf-o",
                                        csv: "fa fa fa-file-code-o",
                                        xls: "fa fa-file-excel-o",
                                        xlsx: "fa fa-file-excel-o",
                                        doc: "fa fa-file-word-o",
                                        docx: "fa fa-file-word-o",
                                        ppt: "fa fa-file-powerpoint-o",
                                        pptx: "fa fa-file-powerpoint-o",
                                        jpg: "fa fa-file-image-o",
                                        jpeg: "fa fa-file-image-o",
                                        gif: "fa fa-file-image-o",
                                        png: "fa fa-file-image-o",
                                        bmp: "fa fa-file-image-o",
                                        txt: "fa fa-file-text-o",
                                        rtf: "fa fa-file-text-o",
                                    };
                                    return void 0 !== t[(e = e.toLowerCase())] || null != t[e] ? t[e] : "fa fa-file-o";
                                },
                            },
                            {
                                key: "getSourceMapping",
                                value: function () {
                                    return this.sourceMapping;
                                },
                            },
                            {
                                key: "setTesting",
                                value: function (e) {
                                    this.testing = e;
                                },
                            },
                            {
                                key: "consoleLog",
                                value: function (e) {
                                    this.testing && console.log(e);
                                },
                            },
                            {
                                key: "setClientMessages",
                                value: function (e) {
                                    this.msgList = e;
                                },
                            },
                            {
                                key: "setTemplates",
                                value: function (e) {
                                    this.templates = e;
                                },
                            },
                            {
                                key: "getWSProperty",
                                value: function (e, t) {
                                    return e.hasOwnProperty(t) ? e[t] : null;
                                },
                            },
                            {
                                key: "getClientMessage",
                                value: function (e) {
                                    return this.getWSProperty(this.msgList, e);
                                },
                            },
                            {
                                key: "getTemplate",
                                value: function (e) {
                                    return this.getWSProperty(this.templates, e);
                                },
                            },
                            {
                                key: "setGoogleAnalytics",
                                value: function (e) {
                                    this.gaq = e;
                                },
                            },
                            {
                                key: "showView",
                                value: function (e) {
                                    null != this.currentView && ((this.previousView = this.currentView), $("#" + this.currentView).hide()), $("#" + e).show(), (this.currentView = e), this.moveToTop();
                                },
                            },
                            {
                                key: "showPreviousView",
                                value: function () {
                                    this.showView(this.previousView);
                                },
                            },
                            { key: "moveToTop", value: function () {} },
                            {
                                key: "callFunction",
                                value: function (e, t, a) {
                                    if ($.isFunction(e))
                                        try {
                                            null == a ? e.apply(document, t) : e.apply(a, t);
                                        } catch (e) {
                                            console.log(e.message);
                                        }
                                    else {
                                        var r = this[e];
                                        if ($.isFunction(r))
                                            try {
                                                r.apply(this, t);
                                            } catch (e) {
                                                console.log(e.message);
                                            }
                                    }
                                },
                            },
                            {
                                key: "getTableTopButtonHtml",
                                value: function () {
                                    var e = "";
                                    return (
                                        this.getShowAddNew() && (e = '<button onclick="modJs.renderForm();return false;" class="btn btn-small btn-primary">' + this.gt(this.getAddNewLabel()) + ' <i class="fa fa-plus"></i></button>'),
                                        null != this.getFilters() &&
                                            ("" !== e && (e += "&nbsp;&nbsp;"),
                                            (e += '<button onclick="modJs.showFilters();return false;" class="btn btn-small btn-primary">' + this.gt("Filter") + ' <i class="fa fa-filter"></i></button>'),
                                            (e += "&nbsp;&nbsp;"),
                                            this.filtersAlreadySet
                                                ? (e += '<button id="__id___resetFilters" onclick="modJs.resetFilters();return false;" class="btn btn-small btn-default">__filterString__ <i class="fa fa-times"></i></button>')
                                                : (e +=
                                                      '<button id="__id___resetFilters" onclick="modJs.resetFilters();return false;" class="btn btn-small btn-default" style="display:none;">__filterString__ <i class="fa fa-times"></i></button>')),
                                        (e = e.replace(/__id__/g, this.getTableName())),
                                        "" !== (e = "" !== this.currentFilterString && null != this.currentFilterString ? e.replace(/__filterString__/g, this.currentFilterString) : e.replace(/__filterString__/g, "Reset Filters")) &&
                                            (e = '<div class="row"><div class="col-xs-12">' + e + "</div></div>"),
                                        e
                                    );
                                },
                            },
                            {
                                key: "getActionButtonHeader",
                                value: function () {
                                    return { sTitle: "", sClass: "center" };
                                },
                            },
                            {
                                key: "getTableHTMLTemplate",
                                value: function () {
                                    return '<div class="box-body table-responsive"><table cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-striped" id="grid"></table></div>';
                                },
                            },
                            {
                                key: "isSortable",
                                value: function () {
                                    return !0;
                                },
                            },
                            {
                                key: "createTable",
                                value: function (e) {
                                    if (this.getRemoteTable()) this.createTableServer(e);
                                    else {
                                        var t = this.getHeaders();
                                        for (var a in t) t[a].sTitle = this.gt(t[a].sTitle);
                                        var r = this.getTableData();
                                        if ((this.showActionButtons() && t.push(this.getActionButtonHeader()), this.showActionButtons())) for (var i = 0; i < r.length; i++) r[i].push(this.getActionButtonsHtml(r[i][0], r[i]));
                                        var n;
                                        n = this.getTableTopButtonHtml() + this.getTableHTMLTemplate();
                                        var l = $("#" + e + " .dataTables_paginate .active a").html(),
                                            o = 0;
                                        void 0 !== l && null != l && (o = 15 * parseInt(l, 10) - 15), $("#" + e).html(n);
                                        var s = { oLanguage: { sLengthMenu: "_MENU_ records per page" }, aaData: r, aoColumns: t, bSort: this.isSortable(), iDisplayLength: 15, iDisplayStart: o },
                                            u = this.getCustomTableParams();
                                        $.extend(s, u),
                                            $("#" + e + " #grid").dataTable(s),
                                            $(".dataTables_paginate ul").addClass("pagination"),
                                            $(".dataTables_length").hide(),
                                            $(".dataTables_filter input").addClass("form-control"),
                                            $(".dataTables_filter input").attr("placeholder", "Search"),
                                            $(".dataTables_filter label")
                                                .contents()
                                                .filter(function () {
                                                    return 3 === this.nodeType;
                                                })
                                                .remove(),
                                            $(".tableActionButton").tooltip();
                                    }
                                },
                            },
                            {
                                key: "createTableServer",
                                value: function (e) {
                                    var t = this.getHeaders();
                                    for (var a in (t.push({ sTitle: "", sClass: "center" }), t)) t[a].sTitle = this.gt(t[a].sTitle);
                                    var r;
                                    r = this.getTableTopButtonHtml() + this.getTableHTMLTemplate();
                                    var i = $("#" + e + " .dataTables_paginate .active a").html(),
                                        n = 0;
                                    void 0 !== i && null != i && (n = 15 * parseInt(i, 10) - 15), $("#" + e).html(r);
                                    var l = {
                                        oLanguage: { sLengthMenu: "_MENU_ records per page" },
                                        bProcessing: !0,
                                        bServerSide: !0,
                                        sAjaxSource: this.getDataUrl(this.getDataMapping()),
                                        aoColumns: t,
                                        bSort: this.isSortable(),
                                        parent: this,
                                        iDisplayLength: 15,
                                        iDisplayStart: n,
                                    };
                                    this.showActionButtons() && (l.aoColumnDefs = [{ fnRender: this.getActionButtons, aTargets: [this.getDataMapping().length] }]);
                                    var o = this.getCustomTableParams();
                                    $.extend(l, o),
                                        $("#" + e + " #grid").dataTable(l),
                                        $(".dataTables_paginate ul").addClass("pagination"),
                                        $(".dataTables_length").hide(),
                                        $(".dataTables_filter input").addClass("form-control"),
                                        $(".dataTables_filter input").attr("placeholder", "Search"),
                                        $(".dataTables_filter label")
                                            .contents()
                                            .filter(function () {
                                                return 3 === this.nodeType;
                                            })
                                            .remove(),
                                        $(".tableActionButton").tooltip();
                                },
                            },
                            { key: "getHeaders", value: function () {} },
                            { key: "getDataMapping", value: function () {} },
                            { key: "getFormFields", value: function () {} },
                            { key: "getTableData", value: function () {} },
                            {
                                key: "getFilters",
                                value: function () {
                                    return null;
                                },
                            },
                            {
                                key: "edit",
                                value: function (e) {
                                    (this.currentId = e), this.getElement(e, []);
                                },
                            },
                            {
                                key: "copyRow",
                                value: function (e) {
                                    this.getElement(e, [], !0);
                                },
                            },
                            {
                                key: "renderModel",
                                value: function (e, t, a) {
                                    $("#" + e + "ModelBody").html(""), (void 0 !== a && null != a) || (a = ""), $("#" + e + "ModelLabel").html(t), $("#" + e + "ModelBody").html(a);
                                },
                            },
                            {
                                key: "renderYesNoModel",
                                value: function (e, t, a, r, i, n) {
                                    var l = this,
                                        o = "#yesnoModel";
                                    (void 0 !== t && null != t) || (t = ""),
                                        $(o + "Label").html(e),
                                        $(o + "Body").html(t),
                                        null != a && $(o + "YesBtn").html(a),
                                        null != r && $(o + "NoBtn").html(r),
                                        $(o + "YesBtn")
                                            .off()
                                            .on("click", function () {
                                                void 0 !== i && null != i && (i.apply(l, n), l.cancelYesno());
                                            }),
                                        $(o).modal({ backdrop: "static" });
                                },
                            },
                            {
                                key: "renderModelFromDom",
                                value: function (e, t, a) {
                                    $("#" + e + "ModelBody").html(""), (void 0 !== a && null != a) || (a = $("<div></div>")), $("#" + e + "ModelLabel").html(t), $("#" + e + "ModelBody").html(""), $("#" + e + "ModelBody").append(a);
                                },
                            },
                            {
                                key: "deleteRow",
                                value: function (e) {
                                    (this.deleteParams.id = e), this.renderModel("delete", "Confirm Deletion", "Are you sure you want to delete this item ?"), $("#deleteModel").modal("show");
                                },
                            },
                            {
                                key: "showMessage",
                                value: function (e, t) {
                                    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                                        i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                                        n = this,
                                        l = "";
                                    (l = i ? "#plainMessageModel" : "#messageModel"),
                                        $(l).off(),
                                        i ? this.renderModel("plainMessage", e, t) : this.renderModel("message", e, t),
                                        null != a
                                            ? ($(l).modal({ show: !0 }),
                                              $(l).on("hidden.bs.modal", function () {
                                                  a.apply(n, r), $(".modal-backdrop").remove();
                                              }))
                                            : $(l).modal({ backdrop: "static" });
                                },
                            },
                            {
                                key: "showDomElement",
                                value: function (e, t, a, r, i) {
                                    var n = this,
                                        l = "";
                                    (l = i ? "#dataMessageModel" : "#messageModel"),
                                        $(l).unbind("hide"),
                                        i ? this.renderModelFromDom("dataMessage", e, t) : this.renderModelFromDom("message", e, t),
                                        null != a
                                            ? ($(l).modal({ show: !0 }),
                                              $(l).on("hidden.bs.modal", function () {
                                                  a.apply(n, r), $(".modal-backdrop").remove();
                                              }))
                                            : $(l).modal({ backdrop: "static" });
                                },
                            },
                            {
                                key: "confirmDelete",
                                value: function () {
                                    (void 0 === this.deleteParams.id && null == this.deleteParams.id) || this.deleteObj(this.deleteParams.id, []), $("#deleteModel").modal("hide");
                                },
                            },
                            {
                                key: "cancelDelete",
                                value: function () {
                                    $("#deleteModel").modal("hide"), (this.deleteParams.id = null);
                                },
                            },
                            {
                                key: "closeMessage",
                                value: function () {
                                    $("#messageModel").modal("hide");
                                },
                            },
                            {
                                key: "cancelYesno",
                                value: function () {
                                    $("#yesnoModel").modal("hide");
                                },
                            },
                            {
                                key: "closePlainMessage",
                                value: function () {
                                    $("#plainMessageModel").modal("hide"), $("#dataMessageModel").modal("hide");
                                },
                            },
                            {
                                key: "closeDataMessage",
                                value: function () {
                                    $("#dataMessageModel").modal("hide");
                                },
                            },
                            {
                                key: "save",
                                value: function (e, t) {
                                    var a = new l.default(this.getTableName() + "_submit", !0, { ShowPopup: !1, LabelErrorClass: "error" });
                                    if (a.checkValues()) {
                                        var r = a.getFormParameters();
                                        r = this.forceInjectValuesBeforeSave(r);
                                        var i = this.doCustomValidation(r);
                                        if (null == i) {
                                            this.csrfRequired && (r.csrf = $("#" + this.getTableName() + "Form").data("csrf"));
                                            var n = $("#" + this.getTableName() + "_submit #id").val();
                                            null != n && void 0 !== n && "" !== n && (r.id = n), (r = this.makeEmptyDateFieldsNull(r)), this.add(r, [], e, t);
                                        } else $("#" + this.getTableName() + "Form .label").html(i), $("#" + this.getTableName() + "Form .label").show(), this.scrollToTop();
                                    }
                                },
                            },
                            {
                                key: "makeEmptyDateFieldsNull",
                                value: function (e) {
                                    return (
                                        this.getFormFields().forEach(function (t) {
                                            ("date" !== t[1].type && "datetime" !== t[1].type) ||
                                                ("" !== e[t[0]] && "00-00-0000" !== e[t[0]] && "00-00-0000 00:00:00" !== e[t[0]]) ||
                                                ("none" === t[1].validation ? (e[t[0]] = "NULL") : delete e[t[0]]);
                                        }),
                                        e
                                    );
                                },
                            },
                            {
                                key: "forceInjectValuesBeforeSave",
                                value: function (e) {
                                    return e;
                                },
                            },
                            {
                                key: "doCustomValidation",
                                value: function (e) {
                                    return null;
                                },
                            },
                            {
                                key: "filterQuery",
                                value: function () {
                                    var e = new l.default(this.getTableName() + "_filter", !0, { ShowPopup: !1, LabelErrorClass: "error" });
                                    if (e.checkValues()) {
                                        var t = e.getFormParameters();
                                        if (this.doCustomFilterValidation(t)) {
                                            for (var a in t) t.hasOwnProperty(a) && "NULL" === t[a] && delete t[a];
                                            this.setFilter(t),
                                                (this.filtersAlreadySet = !0),
                                                $("#" + this.getTableName() + "_resetFilters").show(),
                                                (this.currentFilterString = this.getFilterString(t)),
                                                this.get([]),
                                                this.closePlainMessage();
                                        }
                                    }
                                },
                            },
                            {
                                key: "getFilterString",
                                value: function (e) {
                                    var t = "",
                                        a = void 0,
                                        r = void 0,
                                        i = void 0,
                                        n = void 0,
                                        l = void 0,
                                        o = void 0,
                                        s = this.getFilters();
                                    for (var u in (null == i && (i = []), e))
                                        if (e.hasOwnProperty(u)) {
                                            if (((l = ""), (o = null), "select" === (i = this.getMetaFieldValues(u, s)).type || "select2" === i.type)) {
                                                if (void 0 !== i["remote-source"] && null != i["remote-source"])
                                                    (a = i["remote-source"]),
                                                        "NULL" === e[u] ? (l = void 0 !== i["null-label"] && null != i["null-label"] ? i["null-label"] : "Not Selected") : (o = l = this.fieldMasterData[a[0] + "_" + a[1] + "_" + a[2]][e[u]]);
                                                else if (((r = i.source[0]), "NULL" === e[u])) l = void 0 !== i["null-label"] && null != i["null-label"] ? i["null-label"] : "Not Selected";
                                                else
                                                    for (var c = 0; c < r.length; c++)
                                                        if (e[u] === i.source[c][0]) {
                                                            o = l = i.source[c][1];
                                                            break;
                                                        }
                                            } else if ("select2multi" === i.type) {
                                                n = [];
                                                try {
                                                    n = JSON.parse(e[u]);
                                                } catch (e) {}
                                                "" !== (l = n.join(",")) && (o = l);
                                            } else "" !== (l = e[u]) && (o = l);
                                            null != o && ("" !== t && (t += " | "), (t += i.label + " = " + l));
                                        }
                                    return t;
                                },
                            },
                            {
                                key: "doCustomFilterValidation",
                                value: function (e) {
                                    return !0;
                                },
                            },
                            {
                                key: "resetFilters",
                                value: function () {
                                    (this.filter = this.origFilter), (this.filtersAlreadySet = !1), $("#" + this.getTableName() + "_resetFilters").hide(), (this.currentFilterString = ""), this.get([]);
                                },
                            },
                            {
                                key: "showFilters",
                                value: function (e) {
                                    for (var t = this.templates.filterTemplate, a = "", r = this.getFilters(), i = 0; i < r.length; i++) {
                                        var n = this.getMetaFieldForRendering(r[i][0]);
                                        if ("" === n || void 0 === n) a += this.renderFormField(r[i]);
                                        else {
                                            var l = e[n];
                                            "" !== l && null != l && void 0 !== l && "" !== l.trim() ? (a += this.renderFormField(JSON.parse(l))) : (a += this.renderFormField(r[i]));
                                        }
                                    }
                                    t = (t = t.replace(/_id_/g, this.getTableName() + "_filter")).replace(/_fields_/g, a);
                                    var o = this.generateRandom(14),
                                        s = $('<div class="reviewBlock popupForm" data-content="Form"></div>');
                                    s.attr("id", o),
                                        s.html(t),
                                        s.find(".datefield").datepicker({ viewMode: 2 }),
                                        s.find(".timefield").datetimepicker({ language: "en", pickDate: !1 }),
                                        s.find(".datetimefield").datetimepicker({ language: "en" }),
                                        s.find(".colorpick").colorpicker(),
                                        tinymce.init({ selector: "#" + s.attr("id") + " .tinymce", height: "400" }),
                                        s.find(".simplemde").each(function () {
                                            var e = new SimpleMDE({ element: $(this)[0] });
                                            $(this).data("simplemde", e);
                                        }),
                                        s.find(".select2Field").each(function () {
                                            $(this).select2().select2("val", $(this).find("option:eq(0)").val());
                                        }),
                                        s.find(".select2Multi").each(function () {
                                            $(this)
                                                .select2()
                                                .on("change", function (e) {
                                                    var t = $(this).parents(".row"),
                                                        a = t.find(".select2-choices").height();
                                                    t.height(parseInt(a, 10));
                                                });
                                        }),
                                        this.showDomElement("Edit", s, null, null, !0),
                                        $(".filterBtn").off(),
                                        $(".filterBtn").on("click", function (e) {
                                            e.preventDefault(), e.stopPropagation();
                                            try {
                                                modJs.filterQuery();
                                            } catch (e) {}
                                            return !1;
                                        }),
                                        void 0 !== this.filter && null != this.filter && "" !== this.filter && this.fillForm(this.filter, "#" + this.getTableName() + "_filter", this.getFilters());
                                },
                            },
                            { key: "preRenderForm", value: function (e) {} },
                            {
                                key: "renderForm",
                                value: function (e) {
                                    var t = [];
                                    (null != e && void 0 !== e) || (this.currentId = null), this.preRenderForm(e);
                                    for (var a = this.templates.formTemplate, r = "", i = this.getFormFields(), n = 0; n < i.length; n++) {
                                        var l = this.getMetaFieldForRendering(i[n][0]);
                                        if ("" === l || void 0 === l) r += this.renderFormField(i[n]);
                                        else {
                                            var o = e[l];
                                            "" !== o && null != o && void 0 !== o && "" !== o.trim() ? (r += this.renderFormField(JSON.parse(o))) : (r += this.renderFormField(i[n]));
                                        }
                                    }
                                    a = (a = a.replace(/_id_/g, this.getTableName() + "_submit")).replace(/_fields_/g, r);
                                    var s = void 0,
                                        u = this.generateRandom(14);
                                    this.showFormOnPopup ? (s = $('<div class="reviewBlock popupForm" data-content="Form"></div>')).attr("id", u) : (s = $("#" + this.getTableName() + "Form")),
                                        s.html(a),
                                        s.find(".datefield").datepicker({ viewMode: 2 }),
                                        s.find(".timefield").datetimepicker({ language: "en", pickDate: !1 }),
                                        s.find(".datetimefield").datetimepicker({ language: "en" }),
                                        s.find(".colorpick").colorpicker(),
                                        tinymce.init({ selector: "#" + s.attr("id") + " .tinymce", height: "400" }),
                                        s.find(".simplemde").each(function () {
                                            var e = new SimpleMDE({ element: $(this)[0] });
                                            $(this).data("simplemde", e);
                                        }),
                                        s.find(".select2Field").each(function () {
                                            $(this).select2().select2("val", $(this).find("option:eq(0)").val());
                                        }),
                                        s.find(".select2Multi").each(function () {
                                            $(this)
                                                .select2()
                                                .on("change", function (e) {
                                                    var t = $(this).parents(".row"),
                                                        a = t.find(".select2-choices").height();
                                                    t.height(parseInt(a, 10));
                                                });
                                        }),
                                        s.find(".signatureField").each(function () {
                                            t.push($(this).attr("id"));
                                        });
                                    for (var c = 0; c < i.length; c++) "datagroup" === i[c][1].type && s.find("#" + i[c][0]).data("field", i[c]);
                                    if (
                                        (!1 === this.showSave
                                            ? s.find(".saveBtn").remove()
                                            : (s.find(".saveBtn").off(),
                                              s.find(".saveBtn").data("modJs", this),
                                              s.find(".saveBtn").on("click", function () {
                                                  return (
                                                      null != $(this).data("modJs").saveSuccessItemCallback && void 0 !== $(this).data("modJs").saveSuccessItemCallback
                                                          ? $(this).data("modJs").save($(this).data("modJs").retriveItemsAfterSave(), $(this).data("modJs").saveSuccessItemCallback)
                                                          : $(this).data("modJs").save(),
                                                      !1
                                                  );
                                              })),
                                        !1 === this.showCancel
                                            ? s.find(".cancelBtn").remove()
                                            : (s.find(".cancelBtn").off(),
                                              s.find(".cancelBtn").data("modJs", this),
                                              s.find(".cancelBtn").on("click", function () {
                                                  return $(this).data("modJs").cancel(), !1;
                                              })),
                                        s.find("[mask]").each(function () {
                                            $(this).inputmask($(this).attr("mask"));
                                        }),
                                        s.find("[datemask]").each(function () {
                                            $(this).inputmask({ mask: "2-1-y", placeholder: "YYYY-MM-DD", leapday: "-02-29", separator: "-", alias: "yyyy/mm/dd" });
                                        }),
                                        s.find("[datetimemask]").each(function () {
                                            $(this).inputmask("datetime", { mask: "1-2-y h:s:00", placeholder: "YYYY-MM-DD hh:mm:ss", leapday: "-02-29", separator: "-", alias: "yyyy/mm/dd" });
                                        }),
                                        this.showFormOnPopup)
                                    ) {
                                        this.showMessage("Edit", "", null, null, !0), $("#plainMessageModel .modal-body").html(""), $("#plainMessageModel .modal-body").append(s);
                                        for (var d = 0; d < t.length; d++) $("#" + t[d]).data("signaturePad", new SignaturePad(document.getElementById(t[d])));
                                        void 0 !== e && null != e ? this.fillForm(e, "#" + u) : this.setDefaultValues("#" + u);
                                    } else {
                                        $("#" + this.getTableName() + "Form").show(), $("#" + this.getTableName()).hide();
                                        for (var f = 0; f < t.length; f++) $("#" + t[f]).data("signaturePad", new SignaturePad(document.getElementById(t[f])));
                                        void 0 !== e && null != e ? this.fillForm(e) : this.setDefaultValues(), this.scrollToTop();
                                    }
                                    this.postRenderForm(e, s);
                                },
                            },
                            {
                                key: "setDefaultValues",
                                value: function (e, t) {
                                    (null != t && void 0 !== t) || (t = this.getFormFields()), (null != e && void 0 !== e && "" !== e) || (e = "#" + this.getTableName() + "Form");
                                    for (var a = 0; a < t.length; a++) ("text" !== t[a][1].type && "textarea" !== t[a][1].type) || (void 0 !== t[a][1].default && null !== t[a][1].default && $(e + " #" + t[a][0]).val(t[a][1].default));
                                },
                            },
                            {
                                key: "retriveItemsAfterSave",
                                value: function () {
                                    return !0;
                                },
                            },
                            { key: "postRenderForm", value: function (e, t) {} },
                            {
                                key: "dataGroupToHtml",
                                value: function (e, t) {
                                    var a = JSON.parse(e),
                                        r = void 0,
                                        i = void 0,
                                        n = void 0,
                                        l = void 0,
                                        o = t[1].html;
                                    null != a && void 0 !== a && void 0 !== t[1]["sort-function"] && null != t[1]["sort-function"] && a.sort(t[1]["sort-function"]);
                                    for (var s = $('<div id="' + t[0] + '_div_inner"></div>'), u = 0; u < a.length; u++) {
                                        for (var c in ((i = a[u]),
                                        void 0 !== t[1]["pre-format-function"] && null != t[1]["pre-format-function"] && (i = t[1]["pre-format-function"].apply(this, [i])),
                                        (r = (r = (r = (r = o).replace(
                                            "#_delete_#",
                                            '<a id="#_id_#_delete" onclick="modJs.deleteDataGroupItem(\'#_id_#\');return false;" type="button" style="float:right;margin-right:3px;" tooltip="Delete"><li class="fa fa-times"></li></a>'
                                        )).replace(
                                            "#_edit_#",
                                            '<a id="#_id_#_edit" onclick="modJs.editDataGroupItem(\'#_id_#\');return false;" type="button" style="float:right;margin-right:5px;" tooltip="Edit"><li class="fa fa-edit"></li></a>'
                                        )).replace(/#_id_#/g, i.id)),
                                        i))
                                            void 0 !== (l = i[c]) && null != l && "string" == typeof l && (l = l.replace(/(?:\r\n|\r|\n)/g, "<br />")), (r = r.replace("#_" + c + "_#", l));
                                        void 0 !== t[1].render && null != t[1].render && (r = r.replace("#_renderFunction_#", t[1].render(i))), (n = $(r)).attr("fieldId", t[0] + "_div"), s.append(n);
                                    }
                                    return s;
                                },
                            },
                            {
                                key: "resetDataGroup",
                                value: function (e) {
                                    $("#" + e[0]).val(""), $("#" + e[0] + "_div").html("");
                                },
                            },
                            {
                                key: "showDataGroup",
                                value: function (e, t) {
                                    var a = this.templates.datagroupTemplate,
                                        r = "",
                                        i = e[1].form;
                                    void 0 !== t && null != t && void 0 !== t.id ? (this.currentDataGroupItemId = t.id) : (this.currentDataGroupItemId = null);
                                    for (var n = 0; n < i.length; n++) r += this.renderFormField(i[n]);
                                    a = (a = a.replace(/_id_/g, this.getTableName() + "_field_" + e[0])).replace(/_fields_/g, r);
                                    var l = this.generateRandom(14),
                                        o = $('<div class="reviewBlock popupForm" data-content="Form"></div>');
                                    o.attr("id", l),
                                        o.html(a),
                                        o.find(".datefield").datepicker({ viewMode: 2 }),
                                        o.find(".timefield").datetimepicker({ language: "en", pickDate: !1 }),
                                        o.find(".datetimefield").datetimepicker({ language: "en" }),
                                        o.find(".colorpick").colorpicker(),
                                        tinymce.init({ selector: "#" + o.attr("id") + " .tinymce", height: "400" }),
                                        o.find(".simplemde").each(function () {
                                            var e = new SimpleMDE({ element: $(this)[0] });
                                            $(this).data("simplemde", e);
                                        }),
                                        o.find(".select2Field").each(function () {
                                            $(this).select2().select2("val", $(this).find("option:eq(0)").val());
                                        }),
                                        o.find(".select2Multi").each(function () {
                                            $(this)
                                                .select2()
                                                .on("change", function (e) {
                                                    var t = $(this).parents(".row"),
                                                        a = t.find(".select2-choices").height();
                                                    t.height(parseInt(a, 10));
                                                });
                                        }),
                                        (this.currentDataGroupField = e),
                                        this.showDomElement("Add " + e[1].label, o, null, null, !0),
                                        void 0 !== t && null != t ? this.fillForm(t, "#" + this.getTableName() + "_field_" + e[0], e[1].form) : this.setDefaultValues("#" + this.getTableName() + "_field_" + e[0], e[1].form),
                                        $(".groupAddBtn").off(),
                                        void 0 !== t && null != t && void 0 !== t.id
                                            ? $(".groupAddBtn").on("click", function (e) {
                                                  e.preventDefault(), e.stopPropagation();
                                                  try {
                                                      modJs.editDataGroup();
                                                  } catch (e) {
                                                      console.log("Error editing data group: " + e.message);
                                                  }
                                                  return !1;
                                              })
                                            : $(".groupAddBtn").on("click", function (e) {
                                                  e.preventDefault(), e.stopPropagation();
                                                  try {
                                                      modJs.addDataGroup();
                                                  } catch (e) {
                                                      console.log("Error adding data group: " + e.message);
                                                  }
                                                  return !1;
                                              });
                                },
                            },
                            {
                                key: "addDataGroup",
                                value: function () {
                                    var e = this.currentDataGroupField,
                                        t = void 0;
                                    $("#" + this.getTableName() + "_field_" + e[0] + "_error").html(""), $("#" + this.getTableName() + "_field_" + e[0] + "_error").hide();
                                    var a = new l.default(this.getTableName() + "_field_" + e[0], !0, { ShowPopup: !1, LabelErrorClass: "error" });
                                    if (a.checkValues()) {
                                        var r = a.getFormParameters();
                                        if (void 0 !== e[1]["custom-validate-function"] && null != e[1]["custom-validate-function"]) {
                                            if (!(t = e[1]["custom-validate-function"].apply(this, [r])).valid)
                                                return $("#" + this.getTableName() + "_field_" + e[0] + "_error").html(t.message), $("#" + this.getTableName() + "_field_" + e[0] + "_error").show(), !1;
                                            r = t.params;
                                        }
                                        var i = $("#" + e[0]).val();
                                        "" === i && (i = "[]");
                                        var n = JSON.parse(i);
                                        (r.id = e[0] + "_" + this.dataGroupGetNextAutoIncrementId(n)), n.push(r), void 0 !== e[1]["sort-function"] && null != e[1]["sort-function"] && n.sort(e[1]["sort-function"]), (i = JSON.stringify(n));
                                        var o = this.dataGroupToHtml(i, e);
                                        $("#" + e[0] + "_div").html(""),
                                            $("#" + e[0] + "_div").append(o),
                                            this.makeDataGroupSortable(e, $("#" + e[0] + "_div_inner")),
                                            $("#" + e[0]).val(i),
                                            this.orderDataGroup(e),
                                            this.closeDataMessage(),
                                            this.showMessage("Item Added", "This change will be effective only when you save the form");
                                    }
                                    return !0;
                                },
                            },
                            {
                                key: "nl2br",
                                value: function (e, t) {
                                    var a = "";
                                    try {
                                        for (var r = e.split(" "), i = 0, n = 0; n < r.length; n++) (i += r[n].length + 1) > t ? ((a += r[n] + "<br/>"), (i = 0)) : (a += r[n] + " ");
                                    } catch (e) {}
                                    return a;
                                },
                            },
                            {
                                key: "makeDataGroupSortable",
                                value: function (e, t) {
                                    t.data("field", e),
                                        t.data("firstSort", !0),
                                        t.sortable({
                                            create: function () {
                                                $(this).height($(this).height());
                                            },
                                            "ui-floating": !1,
                                            start: function (e, t) {
                                                $("#sortable-ul-selector-id").sortable({
                                                    sort: function (e, t) {
                                                        var a = $(e.target);
                                                        if (!/html|body/i.test(a.offsetParent()[0].tagName)) {
                                                            var r = e.pageY - a.offsetParent().offset().top - t.helper.outerHeight(!0) / 2;
                                                            t.helper.css({ top: r + "px" });
                                                        }
                                                    },
                                                });
                                            },
                                            revert: !0,
                                            stop: function () {
                                                modJs.orderDataGroup($(this).data("field"));
                                            },
                                            axis: "y",
                                            scroll: !1,
                                            placeholder: "sortable-placeholder",
                                            cursor: "move",
                                        });
                                },
                            },
                            {
                                key: "orderDataGroup",
                                value: function (e) {
                                    var t = [],
                                        a = void 0,
                                        r = $("#" + e[0] + "_div_inner [fieldid='" + e[0] + "_div']"),
                                        i = $("#" + e[0]).val();
                                    "" === i && (i = "[]");
                                    var n = JSON.parse(i);
                                    r.each(function () {
                                        for (var e in ((a = $(this).attr("id")), n))
                                            if (n[e].id === a) {
                                                t.push(n[e]);
                                                break;
                                            }
                                    }),
                                        $("#" + e[0]).val(JSON.stringify(t));
                                },
                            },
                            {
                                key: "editDataGroup",
                                value: function () {
                                    var e = this.currentDataGroupField,
                                        t = this.currentDataGroupItemId,
                                        a = new l.default(this.getTableName() + "_field_" + e[0], !0, { ShowPopup: !1, LabelErrorClass: "error" });
                                    if (a.checkValues()) {
                                        var r = a.getFormParameters();
                                        if (void 0 !== e[1]["custom-validate-function"] && null != e[1]["custom-validate-function"]) {
                                            var i = e[1]["custom-validate-function"].apply(this, [r]);
                                            if (!i.valid) return $("#" + this.getTableName() + "_field_" + e[0] + "_error").html(i.message), $("#" + this.getTableName() + "_field_" + e[0] + "_error").show(), !1;
                                            r = i.params;
                                        }
                                        if (this.doCustomFilterValidation(r)) {
                                            var n = $("#" + e[0]).val();
                                            "" === n && (n = "[]");
                                            for (var o = JSON.parse(n), s = {}, u = -1, c = [], d = 0; d < o.length; d++) {
                                                var f = o[d];
                                                f.id === t && ((s = f), (u = d)), c.push(f);
                                            }
                                            (r.id = s.id), (c[u] = r), void 0 !== e[1]["sort-function"] && null != e[1]["sort-function"] && c.sort(e[1]["sort-function"]), (n = JSON.stringify(c)), $("#" + e[0]).val(n);
                                            var h = this.dataGroupToHtml(n, e);
                                            this.orderDataGroup(e),
                                                $("#" + e[0] + "_div").html(""),
                                                $("#" + e[0] + "_div").append(h),
                                                this.makeDataGroupSortable(e, $("#" + e[0] + "_div_inner")),
                                                this.closeDataMessage(),
                                                this.showMessage("Item Edited", "This change will be effective only when you save the form");
                                        }
                                    }
                                    return !0;
                                },
                            },
                            {
                                key: "editDataGroupItem",
                                value: function (e) {
                                    for (var t = e.substring(0, e.lastIndexOf("_")), a = $("#" + t).val(), r = JSON.parse(a), i = {}, n = 0; n < r.length; n++) {
                                        var l = r[n];
                                        l.id === e && (i = l);
                                    }
                                    this.showDataGroup($("#" + t).data("field"), i);
                                },
                            },
                            {
                                key: "dataGroupGetNextAutoIncrementId",
                                value: function (e) {
                                    for (var t = 1, a = void 0, r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        (void 0 !== i.id && null != i.id) || (i.id = 1), (a = i.id.substring(i.id.lastIndexOf("_") + 1, i.id.length)) >= t && (t = parseInt(a, 10) + 1);
                                    }
                                    return t;
                                },
                            },
                            {
                                key: "deleteDataGroupItem",
                                value: function (e) {
                                    for (var t = e.substring(0, e.lastIndexOf("_")), a = $("#" + t).val(), r = JSON.parse(a), i = [], n = 0; n < r.length; n++) {
                                        var l = r[n];
                                        l.id !== e && i.push(l);
                                    }
                                    $("#" + t).val(JSON.stringify(i)), $("#" + e).remove(), this.showMessage("Item Removed", "Item removed. This change will be effective only when you save the form");
                                },
                            },
                            {
                                key: "fillForm",
                                value: function (e, t, a) {
                                    var r = void 0;
                                    (null != a && void 0 !== a) || (a = this.getFormFields()), (null != t && void 0 !== t && "" !== t) || (t = "#" + this.getTableName() + "Form");
                                    for (var i = 0; i < a.length; i++)
                                        if ("date" === a[i][1].type) "0000-00-00" !== e[a[i][0]] && "" !== e[a[i][0]] && null != e[a[i][0]] && void 0 !== e[a[i][0]] && $(t + " #" + a[i][0] + "_date").datepicker("setValue", e[a[i][0]]);
                                        else if ("colorpick" === a[i][1].type) null != e[a[i][0]] && void 0 !== e[a[i][0]] && ($(t + " #" + a[i][0] + "_colorpick").colorpicker("setValue", e[a[i][0]]), $(t + " #" + a[i][0]).val(e[a[i][0]]));
                                        else if ("datetime" === a[i][1].type || "time" === a[i][1].type) {
                                            if ("0000-00-00 00:00:00" !== e[a[i][0]] && "" !== e[a[i][0]] && null != e[a[i][0]] && void 0 !== e[a[i][0]]) {
                                                var n = e[a[i][0]].split(" "),
                                                    l = n[0].split("-"),
                                                    o = n[1].split(":");
                                                $(t + " #" + a[i][0] + "_datetime")
                                                    .data("datetimepicker")
                                                    .setLocalDate(new Date(l[0], parseInt(l[1], 10) - 1, l[2], o[0], o[1], o[2]));
                                            }
                                        } else if ("label" === a[i][1].type) $(t + " #" + a[i][0]).html(e[a[i][0]]);
                                        else if ("placeholder" === a[i][1].type) {
                                            if (void 0 !== a[i][1]["remote-source"] && null != a[i][1]["remote-source"]) {
                                                var s = a[i][1]["remote-source"][0] + "_" + a[i][1]["remote-source"][1] + "_" + a[i][1]["remote-source"][2];
                                                r = this.fieldMasterData[s][e[a[i][0]]];
                                            } else r = e[a[i][0]];
                                            if (void 0 === r || null == r) r = "";
                                            else
                                                try {
                                                    r = r.replace(/(?:\r\n|\r|\n)/g, "<br />");
                                                } catch (e) {}
                                            if (void 0 !== a[i][1].formatter && a[i][1].formatter && $.isFunction(a[i][1].formatter))
                                                try {
                                                    r = a[i][1].formatter(r);
                                                } catch (e) {}
                                            $(t + " #" + a[i][0]).html(r);
                                        } else if ("fileupload" === a[i][1].type)
                                            null != e[a[i][0]] &&
                                                void 0 !== e[a[i][0]] &&
                                                "" !== e[a[i][0]] &&
                                                ($(t + " #" + a[i][0]).html(e[a[i][0]]),
                                                $(t + " #" + a[i][0]).attr("val", e[a[i][0]]),
                                                $(t + " #" + a[i][0]).show(),
                                                $(t + " #" + a[i][0] + "_download").show(),
                                                $(t + " #" + a[i][0] + "_remove").show()),
                                                !0 === a[i][1].readonly && $(t + " #" + a[i][0] + "_upload").remove();
                                        else if ("select" === a[i][1].type) (void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]]) || (e[a[i][0]] = "NULL"), $(t + " #" + a[i][0]).val(e[a[i][0]]);
                                        else if ("select2" === a[i][1].type) (void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]]) || (e[a[i][0]] = "NULL"), $(t + " #" + a[i][0]).select2("val", e[a[i][0]]);
                                        else if ("select2multi" === a[i][1].type) {
                                            (void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]]) || (e[a[i][0]] = "NULL");
                                            var u = [];
                                            if (void 0 !== e[a[i][0]] && null != e[a[i][0]] && "" !== e[a[i][0]])
                                                try {
                                                    u = JSON.parse(e[a[i][0]]);
                                                } catch (e) {}
                                            $(t + " #" + a[i][0]).select2("val", u);
                                            var c = $(t + " #" + a[i][0])
                                                .find(".select2-choices")
                                                .height();
                                            $(t + " #" + a[i][0])
                                                .find(".controls")
                                                .css("min-height", c + "px"),
                                                $(t + " #" + a[i][0]).css("min-height", c + "px");
                                        } else if ("datagroup" === a[i][1].type)
                                            try {
                                                var d = this.dataGroupToHtml(e[a[i][0]], a[i]);
                                                $(t + " #" + a[i][0]).val(e[a[i][0]]),
                                                    $(t + " #" + a[i][0] + "_div").html(""),
                                                    $(t + " #" + a[i][0] + "_div").append(d),
                                                    this.makeDataGroupSortable(a[i], $(t + " #" + a[i][0] + "_div_inner"));
                                            } catch (e) {}
                                        else
                                            "signature" === a[i][1].type
                                                ? ("" === e[a[i][0]] && void 0 === e[a[i][0]] && null == e[a[i][0]]) ||
                                                  $(t + " #" + a[i][0])
                                                      .data("signaturePad")
                                                      .fromDataURL(e[a[i][0]])
                                                : "simplemde" === a[i][1].type
                                                ? $(t + " #" + a[i][0])
                                                      .data("simplemde")
                                                      .value(e[a[i][0]])
                                                : $(t + " #" + a[i][0]).val(e[a[i][0]]);
                                },
                            },
                            {
                                key: "cancel",
                                value: function () {
                                    $("#" + this.getTableName() + "Form").hide(), $("#" + this.getTableName()).show();
                                },
                            },
                            {
                                key: "renderFormField",
                                value: function (e) {
                                    var t = 0;
                                    if (void 0 === this.fieldTemplates[e[1].type] || null == this.fieldTemplates[e[1].type]) return "";
                                    var a = this.fieldTemplates[e[1].type];
                                    if (
                                        ((e[1].label = this.gt(e[1].label)),
                                        "none" !== e[1].validation && "emailOrEmpty" !== e[1].validation && "numberOrEmpty" !== e[1].validation && "placeholder" !== e[1].type && e[1].label.indexOf("*") < 0)
                                    ) {
                                        (["select", "select2"].indexOf(e[1].type) >= 0 && !0 === e[1]["allow-null"]) || (e[1].label = e[1].label + '<font class="redFont">*</font>');
                                    }
                                    if ("text" === e[1].type || "textarea" === e[1].type || "hidden" === e[1].type || "label" === e[1].type || "placeholder" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                                    else if ("select" === e[1].type || "select2" === e[1].type || "select2multi" === e[1].type) {
                                        if (((a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label)), void 0 !== e[1].source && null != e[1].source)) a = a.replace("_options_", this.renderFormSelectOptions(e[1].source, e));
                                        else if (void 0 !== e[1]["remote-source"] && null != e[1]["remote-source"]) {
                                            var r = e[1]["remote-source"][0] + "_" + e[1]["remote-source"][1] + "_" + e[1]["remote-source"][2];
                                            a = a.replace("_options_", this.renderFormSelectOptionsRemote(this.fieldMasterData[r], e));
                                        }
                                    } else if ("colorpick" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                                    else if ("date" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                                    else if ("datetime" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                                    else if ("time" === e[1].type) a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                                    else if ("fileupload" === e[1].type) {
                                        a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label);
                                        var i = this.getCurrentProfile();
                                        (t = null != i && void 0 !== i ? i.id : -1 * this.getUser().id),
                                            (a = (a = a.replace(/_userId_/g, t)).replace(/_group_/g, this.tab)),
                                            (a = (a = void 0 !== e[1].filetypes && null != e[1].filetypes ? a.replace(/_filetypes_/g, e[1].filetypes) : a.replace(/_filetypes_/g, "all")).replace(/_rand_/g, this.generateRandom(14)));
                                    } else
                                        "datagroup" === e[1].type
                                            ? (a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label))
                                            : "signature" === e[1].type
                                            ? (a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label))
                                            : ("tinymce" !== e[1].type && "simplemde" !== e[1].type) || (a = (a = a.replace(/_id_/g, e[0])).replace(/_label_/g, e[1].label));
                                    return (
                                        (a = void 0 !== e[1].validation && null != e[1].validation && "" !== e[1].validation ? a.replace(/_validation_/g, 'validation="' + e[1].validation + '"') : a.replace(/_validation_/g, "")),
                                        (a =
                                            void 0 !== e[1].help && null !== e[1].help
                                                ? (a = a.replace(/_helpline_/g, e[1].help)).replace(/_hidden_class_help_/g, "")
                                                : (a = a.replace(/_helpline_/g, "")).replace(/_hidden_class_help_/g, "hide")),
                                        (a = void 0 !== e[1].placeholder && null !== e[1].placeholder ? a.replace(/_placeholder_/g, 'placeholder="' + e[1].placeholder + '"') : a.replace(/_placeholder_/g, "")),
                                        (a = void 0 !== e[1].mask && null !== e[1].mask ? a.replace(/_mask_/g, 'mask="' + e[1].mask + '"') : a.replace(/_mask_/g, ""))
                                    );
                                },
                            },
                            {
                                key: "renderFormSelectOptions",
                                value: function (e, t) {
                                    var a = "";
                                    null != t &&
                                        void 0 !== t &&
                                        !0 === t[1]["allow-null"] &&
                                        (void 0 !== t[1]["null-label"] && null != t[1]["null-label"] ? (a += '<option value="NULL">' + this.gt(t[1]["null-label"]) + "</option>") : (a += '<option value="NULL">Select</option>'));
                                    var r = [];
                                    for (var i in e) r.push(e[i]);
                                    !0 === t[1].sort &&
                                        r.sort(function (e, t) {
                                            return (e = e[1]) < (t = t[1]) ? -1 : e > t ? 1 : 0;
                                        });
                                    for (var n = 0; n < r.length; n++) {
                                        var l = r[n][0],
                                            o = r[n][1],
                                            s = '<option value="_id_">_val_</option>';
                                        a += s = (s = s.replace("_id_", l)).replace("_val_", this.gt(o));
                                    }
                                    return a;
                                },
                            },
                            {
                                key: "renderFormSelectOptionsRemote",
                                value: function (e, t) {
                                    var a = "";
                                    !0 === t[1]["allow-null"] &&
                                        (void 0 !== t[1]["null-label"] && null != t[1]["null-label"] ? (a += '<option value="NULL">' + this.gt(t[1]["null-label"]) + "</option>") : (a += '<option value="NULL">Select</option>'));
                                    var r = [];
                                    for (var i in e) r.push([i, e[i]]);
                                    "true" === t[1].sort &&
                                        r.sort(function (e, t) {
                                            return (e = e[1]) < (t = t[1]) ? -1 : e > t ? 1 : 0;
                                        });
                                    for (var n = 0; n < r.length; n++) {
                                        var l = r[n][0],
                                            o = r[n][1],
                                            s = '<option value="_id_">_val_</option>';
                                        a += s = (s = s.replace("_id_", l)).replace("_val_", this.gt(o));
                                    }
                                    return a;
                                },
                            },
                            {
                                key: "setCustomTemplates",
                                value: function (e) {
                                    this.customTemplates = e;
                                },
                            },
                            {
                                key: "setEmailTemplates",
                                value: function (e) {
                                    this.emailTemplates = e;
                                },
                            },
                            {
                                key: "getCustomTemplate",
                                value: function (e) {
                                    return this.customTemplates[e];
                                },
                            },
                            {
                                key: "setFieldTemplates",
                                value: function (e) {
                                    this.fieldTemplates = e;
                                },
                            },
                            {
                                key: "getMetaFieldForRendering",
                                value: function (e) {
                                    return "";
                                },
                            },
                            {
                                key: "clearDeleteParams",
                                value: function () {
                                    this.deleteParams = {};
                                },
                            },
                            {
                                key: "getShowAddNew",
                                value: function () {
                                    return this.showAddNew;
                                },
                            },
                            {
                                key: "getAddNewLabel",
                                value: function () {
                                    return "Add New";
                                },
                            },
                            {
                                key: "setShowAddNew",
                                value: function (e) {
                                    this.showAddNew = e;
                                },
                            },
                            {
                                key: "setShowDelete",
                                value: function (e) {
                                    this.showDelete = e;
                                },
                            },
                            {
                                key: "setShowEdit",
                                value: function (e) {
                                    this.showEdit = e;
                                },
                            },
                            {
                                key: "setShowSave",
                                value: function (e) {
                                    this.showSave = e;
                                },
                            },
                            {
                                key: "setShowCancel",
                                value: function (e) {
                                    this.showCancel = e;
                                },
                            },
                            {
                                key: "getCustomTableParams",
                                value: function () {
                                    return {};
                                },
                            },
                            {
                                key: "getActionButtons",
                                value: function (e) {
                                    return modJs.getActionButtonsHtml(e.aData[0], e.aData);
                                },
                            },
                            {
                                key: "getActionButtonsHtml",
                                value: function (e, t) {
                                    var a = '<div style="width:80px;">_edit__delete__clone_</div>';
                                    return (
                                        (a = this.showAddNew
                                            ? a.replace(
                                                  "_clone_",
                                                  '<img class="tableActionButton" src="_BASE_images/clone.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Copy" onclick="modJs.copyRow(_id_);return false;"></img>'
                                              )
                                            : a.replace("_clone_", "")),
                                        (a = this.showDelete
                                            ? a.replace(
                                                  "_delete_",
                                                  '<img class="tableActionButton" src="_BASE_images/delete.png" style="margin-left:15px;cursor:pointer;" rel="tooltip" title="Delete" onclick="modJs.deleteRow(_id_);return false;"></img>'
                                              )
                                            : a.replace("_delete_", "")),
                                        (a = (a = (a = this.showEdit
                                            ? a.replace("_edit_", '<img class="tableActionButton" src="_BASE_images/edit.png" style="cursor:pointer;" rel="tooltip" title="Edit" onclick="modJs.edit(_id_);return false;"></img>')
                                            : a.replace("_edit_", "")).replace(/_id_/g, e)).replace(/_BASE_/g, this.baseUrl))
                                    );
                                },
                            },
                            {
                                key: "generateRandom",
                                value: function (e) {
                                    for (var t = new Date(), a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = "", i = e; i > 0; --i) r += a[Math.round(Math.random() * (a.length - 1))];
                                    return r + t.getTime();
                                },
                            },
                            {
                                key: "checkFileType",
                                value: function (e, t) {
                                    var a = document.getElementById(e),
                                        r = "";
                                    return (
                                        a.value.lastIndexOf(".") > 0 && (r = a.value.substring(a.value.lastIndexOf(".") + 1, a.value.length)),
                                        (r = r.toLowerCase()),
                                        !(t.split(",").indexOf(r) < 0) || ((a.value = ""), this.showMessage("File Type Error", "Selected file type is not supported"), this.clearFileElement(e), !1)
                                    );
                                },
                            },
                            {
                                key: "clearFileElement",
                                value: function (e) {
                                    var t = $("#" + e);
                                    t.replaceWith((t = t.val("").clone(!0)));
                                },
                            },
                            {
                                key: "fixJSON",
                                value: function (e) {
                                    return "1" === this.noJSONRequests && (e = window.btoa(e)), e;
                                },
                            },
                            {
                                key: "getClientDate",
                                value: function (e) {
                                    var t = this.getClientGMTOffset();
                                    return e.addMinutes(60 * t);
                                },
                            },
                            {
                                key: "getClientGMTOffset",
                                value: function () {
                                    var e = new Date(),
                                        t = new Date(e.getFullYear(), 0, 1, 0, 0, 0, 0),
                                        a = t.toGMTString();
                                    return (t - new Date(a.substring(0, a.lastIndexOf(" ") - 1))) / 36e5;
                                },
                            },
                            {
                                key: "getHelpLink",
                                value: function () {
                                    return null;
                                },
                            },
                            {
                                key: "showLoader",
                                value: function () {
                                    $("#iceloader").show();
                                },
                            },
                            {
                                key: "hideLoader",
                                value: function () {
                                    $("#iceloader").hide();
                                },
                            },
                            {
                                key: "generateOptions",
                                value: function (e) {
                                    var t = "";
                                    for (var a in e) t += '<option value="__val__">__text__</option>'.replace("__val__", a).replace("__text__", e[a]);
                                    return t;
                                },
                            },
                            {
                                key: "isModuleInstalled",
                                value: function (e, t) {
                                    return void 0 !== modulesInstalled && null !== modulesInstalled && 1 === modulesInstalled[e + "_" + t];
                                },
                            },
                            {
                                key: "setCustomFields",
                                value: function (e) {
                                    for (var t = void 0, a = void 0, r = 0; r < e.length; r++)
                                        if ("Hidden" !== (t = e[r]).display && "" !== t.data && void 0 !== t.data)
                                            try {
                                                if (void 0 === (a = JSON.parse(t.data)) || null == a) continue;
                                                if (2 !== a.length) continue;
                                                if (void 0 === a[1].type || null == a[1].type) continue;
                                                this.customFields.push(a);
                                            } catch (e) {}
                                },
                            },
                            {
                                key: "addCustomFields",
                                value: function (e) {
                                    for (var t = 0; t < this.customFields.length; t++) e.push(this.customFields[t]);
                                    return e;
                                },
                            },
                        ]),
                        e
                    );
                })();
                a.default = o;
            },
            { "./FormValidation": 33 },
        ],
        35: [
            function (e, t, a) {
                "use strict";
                var r = e("./lib");
                (window.EmployeeAdapter = r.EmployeeAdapter), (window.CompanyGraphAdapter = r.CompanyGraphAdapter), (window.ApiAccessAdapter = r.ApiAccessAdapter);
            },
            { "./lib": 36 },
        ],
        36: [
            function (e, t, a) {
                "use strict";
                var r = (function () {
                        return function (e, t) {
                            if (Array.isArray(e)) return e;
                            if (Symbol.iterator in Object(e))
                                return (function (e, t) {
                                    var a = [],
                                        r = !0,
                                        i = !1,
                                        n = void 0;
                                    try {
                                        for (var l, o = e[Symbol.iterator](); !(r = (l = o.next()).done) && (a.push(l.value), !t || a.length !== t); r = !0);
                                    } catch (e) {
                                        (i = !0), (n = e);
                                    } finally {
                                        try {
                                            !r && o.return && o.return();
                                        } finally {
                                            if (i) throw n;
                                        }
                                    }
                                    return a;
                                })(e, t);
                            throw new TypeError("Invalid attempt to destructure non-iterable instance");
                        };
                    })(),
                    i = (function () {
                        function e(e, t) {
                            for (var a = 0; a < t.length; a++) {
                                var r = t[a];
                                (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                            }
                        }
                        return function (t, a, r) {
                            return a && e(t.prototype, a), r && e(t, r), t;
                        };
                    })(),
                    n = o(e("qrcode")),
                    l = o(e("../../../api/AdapterBase"));
                function o(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                function s(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }
                function u(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
                }
                function c(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
                }
                var d = (function (e) {
                        function t(e, a, r, i) {
                            s(this, t);
                            var n = u(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, a, r, i));
                            return (n.fieldNameMap = {}), (n.hiddenFields = {}), (n.tableFields = {}), (n.formOnlyFields = {}), (n.currentUserId = null), n;
                        }
                        return (
                            c(t, l.default),
                            i(t, [
                                {
                                    key: "setFieldNameMap",
                                    value: function (e) {
                                        for (var t = void 0, a = 0; a < e.length; a++)
                                            (t = e[a]),
                                                (this.fieldNameMap[t.name] = t),
                                                "Hidden" === t.display ? (this.hiddenFields[t.name] = t) : "Table and Form" === t.display ? (this.tableFields[t.name] = t) : (this.formOnlyFields[t.name] = t);
                                    },
                                },
                                {
                                    key: "getDataMapping",
                                    value: function () {
                                        return ["id", "employee_id", "first_name", "last_name", "mobile_phone", "department", "gender", "supervisor"];
                                    },
                                },
                                {
                                    key: "getHeaders",
                                    value: function () {
                                        return [
                                            { sTitle: "ID" },
                                            { sTitle: "Employee Number" },
                                            { sTitle: "First Name" },
                                            { sTitle: "Last Name" },
                                            { sTitle: "Mobile" },
                                            { sTitle: "Department" },
                                            { sTitle: "Gender" },
                                            { sTitle: "Supervisor" },
                                        ];
                                    },
                                },
                                {
                                    key: "getFormFields",
                                    value: function () {
                                        var e = [],
                                            t = void 0,
                                            a = void 0,
                                            r = void 0,
                                            i = void 0,
                                            n = void 0,
                                            l = void 0,
                                            o = void 0,
                                            s = void 0;
                                        (t =
                                            "Yes" === this.checkPermission("Edit Employee Number")
                                                ? ["employee_id", { label: "Employee Number", type: "text", validation: "" }]
                                                : ["employee_id", { label: "Employee Number", type: "placeholder", validation: "" }]),
                                            (a =
                                                "Yes" === this.checkPermission("Edit EPF/CPF Number")
                                                    ? ["ssn_num", { label: "EPF/CPF/SS No", type: "text", validation: "none" }]
                                                    : ["ssn_num", { label: "EPF/CPF/SS No", type: "placeholder", validation: "none" }]),
                                            (r =
                                                "Yes" === this.checkPermission("Edit Employment Status")
                                                    ? ["employment_status", { label: "Employment Status", type: "select2", "remote-source": ["EmploymentStatus", "id", "name"] }]
                                                    : ["employment_status", { label: "Employment Status", type: "placeholder", "remote-source": ["EmploymentStatus", "id", "name"] }]),
                                            (i =
                                                "Yes" === this.checkPermission("Edit Job Title")
                                                    ? ["job_title", { label: "Job Title", type: "select2", "remote-source": ["JobTitle", "id", "name"] }]
                                                    : ["job_title", { label: "Job Title", type: "placeholder", "remote-source": ["JobTitle", "id", "name"] }]),
                                            (n =
                                                "Yes" === this.checkPermission("Edit Pay Grade")
                                                    ? ["pay_grade", { label: "Pay Grade", type: "select2", "allow-null": !0, "remote-source": ["PayGrade", "id", "name"] }]
                                                    : ["pay_grade", { label: "Pay Grade", type: "placeholder", "allow-null": !0, "remote-source": ["PayGrade", "id", "name"] }]),
                                            (l =
                                                "Yes" === this.checkPermission("Edit Joined Date")
                                                    ? ["joined_date", { label: "Joined Date", type: "date", validation: "" }]
                                                    : ["joined_date", { label: "Joined Date", type: "placeholder", validation: "" }]),
                                            (o =
                                                "Yes" === this.checkPermission("Edit Department")
                                                    ? ["department", { label: "Department", type: "select2", "remote-source": ["CompanyStructure", "id", "title"] }]
                                                    : ["department", { label: "Department", type: "placeholder", "remote-source": ["CompanyStructure", "id", "title"] }]),
                                            (s =
                                                "Yes" === this.checkPermission("Edit Work Email")
                                                    ? ["work_email", { label: "Work Email", type: "text", validation: "email" }]
                                                    : ["work_email", { label: "Work Email", type: "placeholder", validation: "emailOrEmpty" }]);
                                        for (
                                            var u = [
                                                    ["id", { label: "ID", type: "hidden", validation: "" }],
                                                    t,
                                                    ["first_name", { label: "First Name", type: "text", validation: "" }],
                                                    ["middle_name", { label: "Middle Name", type: "text", validation: "none" }],
                                                    ["last_name", { label: "Last Name", type: "text", validation: "" }],
                                                    ["nationality", { label: "Nationality", type: "select2", "remote-source": ["Nationality", "id", "name"] }],
                                                    ["birthday", { label: "Date of Birth", type: "date", validation: "" }],
                                                    [
                                                        "gender",
                                                        {
                                                            label: "Gender",
                                                            type: "select",
                                                            source: [
                                                                ["Male", "Male"],
                                                                ["Female", "Female"],
                                                            ],
                                                        },
                                                    ],
                                                    [
                                                        "notches",
                                                        {
                                                            label: "Notch",
                                                            type: "select2",
                                                            "remote-source": ["Notches", "id", "name"] }],
                                                            ["bank_acc_no", {
                                                                "label": "Bank Account No.",
                                                                "type": "text",
                                                                "validation": ""
                                                            }],
                                                            ["pay_grade", {
                                                                label: "Pay Grade",
                                                                type: "select2",
                                                                "allow-null": !0,
                                                                "remote-source": ["PayGrade", "id", "name"]
                                                            }],
                                                            ["nassit_num", {
                                                                label: "NASSIT No.",
                                                                type: "text",
                                                                validation: "none"
                                                            }],
                                                    [
                                                        "marital_status",
                                                        {
                                                            label: "Marital Status",
                                                            type: "select",
                                                            source: [
                                                                ["Married", "Married"],
                                                                ["Single", "Single"],
                                                                ["Divorced", "Divorced"],
                                                                ["Widowed", "Widowed"],
                                                                ["Other", "Other"],
                                                            ],
                                                        },
                                                    ],
                                                    a,
                                                    ["nic_num", { label: "NIC", type: "text", validation: "none" }],
                                                    ["other_id", { label: "Other ID", type: "text", validation: "none" }],
                                                    ["driving_license", { label: "Driving License No", type: "text", validation: "none" }],
                                                    r,
                                                    i,
                                                    n,
                                                    ["work_station_id", { label: "Work Station Id", type: "text", validation: "none" }],
                                                    ["address1", { label: "Address Line 1", type: "text", validation: "none" }],
                                                    ["address2", { label: "Address Line 2", type: "text", validation: "none" }],
                                                    ["city", { label: "City", type: "text", validation: "none" }],
                                                    "Yes" === this.checkPermission("Edit Country")
                                                        ? ["country", { label: "Country", type: "select2", "remote-source": ["Country", "code", "name"] }]
                                                        : ["country", { label: "Country", type: "placeholder", "remote-source": ["Country", "code", "name"] }],
                                                    ["province", { label: "Province", type: "select2", "allow-null": !0, "remote-source": ["Province", "id", "name"] }],
                                                    ["postal_code", { label: "Postal/Zip Code", type: "text", validation: "none" }],
                                                    ["home_phone", { label: "Home Phone", type: "text", validation: "none" }],
                                                    ["mobile_phone", { label: "Mobile Phone", type: "text", validation: "none" }],
                                                    ["work_phone", { label: "Work Phone", type: "text", validation: "none" }],
                                                    s,
                                                    ["private_email", { label: "Private Email", type: "text", validation: "emailOrEmpty" }],
                                                    l,
                                                    o,
                                                ],
                                                c = 0;
                                            c < this.customFields.length;
                                            c++
                                        )
                                            u.push(this.customFields[c]);
                                        for (var d = 0; d < u.length; d++) {
                                            var f = u[d];
                                            if (void 0 === this.hiddenFields[f[0]] || null === this.hiddenFields[f[0]]) {
                                                if (void 0 !== this.fieldNameMap[f[0]] && null !== this.fieldNameMap[f[0]]) {
                                                    var h = this.fieldNameMap[f[0]].textMapped;
                                                    f[1].label = h;
                                                }
                                                e.push(f);
                                            }
                                        }
                                        return e;
                                    },
                                },
                                {
                                    key: "getSourceMapping",
                                    value: function () {
                                        var e = this.sourceMapping;
                                        return (e.supervisor = ["Employee", "id", "first_name+last_name"]), e;
                                    },
                                },
                                {
                                    key: "get",
                                    value: function () {
                                        var e = { map: JSON.stringify(this.getSourceMapping()) },
                                            t = JSON.stringify(e),
                                            a = [];
                                        (a.callBackData = []), (a.callBackSuccess = "modEmployeeGetSuccessCallBack"), (a.callBackFail = "modEmployeeGetFailCallBack"), this.customAction("get", "modules=employees", t, a);
                                    },
                                },
                                {
                                    key: "deleteProfileImage",
                                    value: function (e) {
                                        var t = { id: e },
                                            a = JSON.stringify(t),
                                            r = [];
                                        (r.callBackData = []),
                                            (r.callBackSuccess = "modEmployeeDeleteProfileImageCallBack"),
                                            (r.callBackFail = "modEmployeeDeleteProfileImageCallBack"),
                                            this.customAction("deleteProfileImage", "modules=employees", a, r);
                                    },
                                },
                                {
                                    key: "modEmployeeDeleteProfileImageCallBack",
                                    value: function (e) {
                                        top.location.href = top.location.href;
                                    },
                                },
                                {
                                    key: "modEmployeeGetSuccessCallBack",
                                    value: function (e) {
                                        var t = this.getFormFields(),
                                            a = e[1],
                                            i = e[2];
                                        e = r(e, 1)[0];
                                        for (var n = this.getCustomTemplate("myDetails.html"), l = 0; l < t.length; l++)
                                            if (void 0 !== this.fieldNameMap[t[l][0]] && null !== this.fieldNameMap[t[l][0]]) {
                                                var o = this.fieldNameMap[t[l][0]].textMapped;
                                                n = n.replace("#_label_" + t[l][0] + "_#", this.gt(o));
                                            }
                                        (n = (n = n.replace(/#_.+_#/gi, "")).replace(/_id_/g, e.id)), $("#" + this.getTableName()).html(n);
                                        for (var s = 0; s < t.length; s++) $("#" + this.getTableName() + " #" + t[s][0]).html(e[t[s][0]]), $("#" + this.getTableName() + " #" + t[s][0] + "_Name").html(e[t[s][0] + "_Name"]);
                                        $("#" + this.getTableName() + " #supervisor_Name").html(e.supervisor_Name);
                                        for (var u = "", c = 0; c < e.subordinates.length; c++)
                                            void 0 !== e.subordinates[c].first_name && null !== e.subordinates[c].first_name && (u += e.subordinates[c].first_name + " "),
                                                void 0 !== e.subordinates[c].middle_name && null !== e.subordinates[c].middle_name && "" !== e.subordinates[c].middle_name && (u += e.subordinates[c].middle_name + " "),
                                                void 0 !== e.subordinates[c].last_name && null !== e.subordinates[c].last_name && "" !== e.subordinates[c].last_name && (u += e.subordinates[c].last_name),
                                                (u += "<br/>");
                                        if (void 0 !== e.customFields && null !== e.customFields && Object.keys(e.customFields).length > 0) {
                                            var d = void 0;
                                            for (var f in e.customFields) {
                                                e.customFields[f][1] || (e.customFields[f][1] = this.gt("Other Details"));
                                                var h = e.customFields[f][1].toLocaleLowerCase();
                                                if (((h = h.replace(" ", "_")), $("#cont_" + h).length <= 0)) {
                                                    var p = '<div class="panel panel-default" style="width:97.5%;"><div class="panel-heading"><h4>#_section.name_#</h4></div> <div class="panel-body"  id="cont_#_section_#"> </div></div>';
                                                    (p = (p = p.replace("#_section_#", h)).replace("#_section.name_#", e.customFields[f][1])), $("#customFieldsCont").append($(p));
                                                }
                                                (d = (d =
                                                    '<div class="col-xs-6 col-md-3" style="font-size:16px;"><label class="control-label col-xs-12" style="font-size:13px;">#_label_#</label><label class="control-label col-xs-12 iceLabel" style="font-size:13px;font-weight: bold;">#_value_#</label></div>').replace(
                                                    "#_label_#",
                                                    f
                                                )),
                                                    (d =
                                                        "fileupload" === e.customFields[f][2]
                                                            ? d.replace("#_value_#", "<button onclick=\"download('" + e.customFields[f][0] + '\');return false;" class="btn btn-mini btn-inverse" type="button">View: ' + f + "</button>")
                                                            : d.replace("#_value_#", e.customFields[f][0])),
                                                    $("#cont_" + h).append($(d));
                                            }
                                        } else $("#customFieldsCont").remove();
                                        $("#" + this.getTableName() + " #subordinates").html(u),
                                            $("#" + this.getTableName() + " #name").html(e.first_name + " " + e.last_name),
                                            (this.currentUserId = e.id),
                                            $("#" + this.getTableName() + " #profile_image_" + e.id).attr("src", e.image),
                                            "No" === this.checkPermission("Upload/Delete Profile Image") && ($("#employeeUploadProfileImage").remove(), $("#employeeDeleteProfileImage").remove()),
                                            "No" === this.checkPermission("Edit Employee Details") && $("#employeeProfileEditInfo").remove(),
                                            a !== i && $("#employeeUpdatePassword").remove(),
                                            this.cancel();
                                    },
                                },
                                { key: "modEmployeeGetFailCallBack", value: function (e) {} },
                                {
                                    key: "editEmployee",
                                    value: function () {
                                        this.edit(this.currentUserId);
                                    },
                                },
                                {
                                    key: "changePassword",
                                    value: function () {
                                        $("#adminUsersModel").modal("show"), $("#adminUsersChangePwd #newpwd").val(""), $("#adminUsersChangePwd #conpwd").val("");
                                    },
                                },
                                {
                                    key: "changePasswordConfirm",
                                    value: function () {
                                        $("#adminUsersChangePwd_error").hide();
                                        var e = $("#adminUsersChangePwd #newpwd").val();
                                        if (!(e.length > 7)) return $("#adminUsersChangePwd_error").html("Password should be longer than 7 characters"), void $("#adminUsersChangePwd_error").show();
                                        var t = $("#adminUsersChangePwd #conpwd").val();
                                        if (t !== e) return $("#adminUsersChangePwd_error").html("Passwords don't match"), void $("#adminUsersChangePwd_error").show();
                                        var a = { pwd: t },
                                            r = JSON.stringify(a),
                                            i = [];
                                        (i.callBackData = []), (i.callBackSuccess = "changePasswordSuccessCallBack"), (i.callBackFail = "changePasswordFailCallBack"), this.customAction("changePassword", "modules=employees", r, i);
                                    },
                                },
                                {
                                    key: "closeChangePassword",
                                    value: function () {
                                        $("#adminUsersModel").modal("hide");
                                    },
                                },
                                {
                                    key: "changePasswordSuccessCallBack",
                                    value: function (e, t) {
                                        this.closeChangePassword(), this.showMessage("Password Change", "Password changed successfully");
                                    },
                                },
                                {
                                    key: "changePasswordFailCallBack",
                                    value: function (e, t) {
                                        this.closeChangePassword(), this.showMessage("Error", e);
                                    },
                                },
                            ]),
                            t
                        );
                    })(),
                    f = (function (e) {
                        function t() {
                            return s(this, t), u(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
                        }
                        return (
                            c(t, l.default),
                            i(t, [
                                {
                                    key: "getDataMapping",
                                    value: function () {
                                        return ["id", "title", "address", "type", "country", "parent"];
                                    },
                                },
                                {
                                    key: "getHeaders",
                                    value: function () {
                                        return [{ sTitle: "ID", bVisible: !1 }, { sTitle: "Name" }, { sTitle: "Address" }, { sTitle: "Type" }, { sTitle: "Country", sClass: "center" }, { sTitle: "Parent Structure" }];
                                    },
                                },
                                {
                                    key: "getFormFields",
                                    value: function () {
                                        return [
                                            ["id", { label: "ID", type: "hidden", validation: "" }],
                                            ["title", { label: "Name", type: "text", validation: "" }],
                                            ["description", { label: "Details", type: "textarea", validation: "" }],
                                            ["address", { label: "Address", type: "textarea", validation: "none" }],
                                            [
                                                "type",
                                                {
                                                    label: "Type",
                                                    type: "select",
                                                    source: [
                                                        ["Company", "Company"],
                                                        ["Head Office", "Head Office"],
                                                        ["Regional Office", "Regional Office"],
                                                        ["Department", "Department"],
                                                        ["Unit", "Unit"],
                                                        ["Sub Unit", "Sub Unit"],
                                                        ["Other", "Other"],
                                                    ],
                                                },
                                            ],
                                            ["country", { label: "Country", type: "select", "remote-source": ["Country", "code", "name"] }],
                                            ["parent", { label: "Parent Structure", type: "select", "allow-null": !0, "remote-source": ["CompanyStructure", "id", "title"] }],
                                        ];
                                    },
                                },
                            ]),
                            t
                        );
                    })(),
                    h = (function (e) {
                        function t(e, a, r, i) {
                            s(this, t);
                            var n = u(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, a, r, i));
                            return (n.nodeIdCounter = 0), n;
                        }
                        return (
                            c(t, f),
                            i(t, [
                                {
                                    key: "convertToTree",
                                    value: function (e) {
                                        for (var t = { id: -1, title: "", name: "", children: [] }, a = null, r = 0; r < e.length; r++)
                                            (e[r].name = e[r].title),
                                                null !== e[r].parent &&
                                                    void 0 !== e[r].parent &&
                                                    null !== (a = this.findParent(e, e[r].parent)) &&
                                                    ((void 0 !== a.children && null !== a.children) || (a.children = []), a.children.push(e[r]));
                                        for (var i = 0; i < e.length; i++) (null !== e[i].parent && void 0 !== e[i].parent) || t.children.push(e[i]);
                                        return t;
                                    },
                                },
                                {
                                    key: "findParent",
                                    value: function (e, t) {
                                        for (var a = 0; a < e.length; a++) if (e[a].title === t || e[a].title === t) return e[a];
                                        return null;
                                    },
                                },
                                {
                                    key: "createTable",
                                    value: function (e) {
                                        $("#tabPageCompanyGraph").html("");
                                        var t = this.sourceData,
                                            a = this.convertToTree(t),
                                            r = [20, 120, 20, 120],
                                            i = 5e3 - r[1] - r[3],
                                            n = 1e3 - r[0] - r[2],
                                            l = d3.layout.tree().size([n, i]);
                                        (this.diagonal = d3.svg.diagonal().projection(function (e) {
                                            return [e.y, e.x];
                                        })),
                                            (this.vis = d3
                                                .select("#tabPageCompanyGraph")
                                                .append("svg:svg")
                                                .attr("width", i + r[1] + r[3])
                                                .attr("height", n + r[0] + r[2])
                                                .append("svg:g")
                                                .attr("transform", "translate(" + r[3] + "," + r[0] + ")"));
                                        var o = a;
                                        (o.x0 = n / 2), (o.y0 = 0), this.update(o, l, o);
                                    },
                                },
                                {
                                    key: "update",
                                    value: function (e, t, a) {
                                        var r = this,
                                            i = d3.event && d3.event.altKey ? 5e3 : 500,
                                            n = t.nodes(a).reverse();
                                        n.forEach(function (e) {
                                            e.y = 180 * e.depth;
                                        });
                                        var l = r.vis.selectAll("g.node").data(n, function (e) {
                                                return e.id || (e.id = ++r.nodeIdCounter);
                                            }),
                                            o = l
                                                .enter()
                                                .append("svg:g")
                                                .attr("class", "node")
                                                .attr("transform", function (t) {
                                                    return "translate(" + e.y0 + "," + e.x0 + ")";
                                                })
                                                .on("click", function (e) {
                                                    r.toggle(e), r.update(e, t, a);
                                                });
                                        o
                                            .append("svg:circle")
                                            .attr("r", 1e-6)
                                            .style("fill", function (e) {
                                                return e._children ? "lightsteelblue" : "#fff";
                                            }),
                                            o
                                                .append("svg:text")
                                                .attr("x", function (e) {
                                                    return e.children || e._children ? -10 : 10;
                                                })
                                                .attr("dy", ".35em")
                                                .attr("text-anchor", function (e) {
                                                    return e.children || e._children ? "end" : "start";
                                                })
                                                .text(function (e) {
                                                    return e.name;
                                                })
                                                .style("fill-opacity", 1e-6);
                                        var s = l
                                            .transition()
                                            .duration(i)
                                            .attr("transform", function (e) {
                                                return "translate(" + e.y + "," + e.x + ")";
                                            });
                                        s
                                            .select("circle")
                                            .attr("r", 4.5)
                                            .style("fill", function (e) {
                                                return e._children ? "lightsteelblue" : "#fff";
                                            }),
                                            s.select("text").style("fill-opacity", 1);
                                        var u = l
                                            .exit()
                                            .transition()
                                            .duration(i)
                                            .attr("transform", function (t) {
                                                return "translate(" + e.y + "," + e.x + ")";
                                            })
                                            .remove();
                                        u.select("circle").attr("r", 1e-6), u.select("text").style("fill-opacity", 1e-6);
                                        var c = r.vis.selectAll("path.link").data(t.links(n), function (e) {
                                            return e.target.id;
                                        });
                                        c
                                            .enter()
                                            .insert("svg:path", "g")
                                            .attr("class", "link")
                                            .attr("d", function (t) {
                                                var a = { x: e.x0, y: e.y0 };
                                                return r.diagonal({ source: a, target: a });
                                            })
                                            .transition()
                                            .duration(i)
                                            .attr("d", r.diagonal),
                                            c.transition().duration(i).attr("d", r.diagonal),
                                            c
                                                .exit()
                                                .transition()
                                                .duration(i)
                                                .attr("d", function (t) {
                                                    var a = { x: e.x, y: e.y };
                                                    return r.diagonal({ source: a, target: a });
                                                })
                                                .remove(),
                                            n.forEach(function (e) {
                                                (e.x0 = e.x), (e.y0 = e.y);
                                            });
                                    },
                                },
                                {
                                    key: "toggle",
                                    value: function (e) {
                                        e.children ? ((e._children = e.children), (e.children = null)) : ((e.children = e._children), (e._children = null));
                                    },
                                },
                                {
                                    key: "getSourceDataById",
                                    value: function (e) {
                                        for (var t = 0; t < this.sourceData.length; t++) if (this.sourceData[t].id === e) return this.sourceData[t];
                                        return null;
                                    },
                                },
                                {
                                    key: "fixCyclicParent",
                                    value: function (e) {
                                        for (var t = "", a = 0; a < e.length; a++) {
                                            var r = e[a],
                                                i = r,
                                                n = {};
                                            for (n[i.id] = 1; null != i.parent && void 0 !== i.parent; ) {
                                                var l = this.getSourceDataById(i.parent);
                                                if (null == l) break;
                                                if (1 === n[l.id]) {
                                                    (t = r.title + "'s parent structure set to " + l.title + "<br/>"), (r.parent = null);
                                                    break;
                                                }
                                                (n[l.id] = 1), (i = l);
                                            }
                                        }
                                        return "" === t || (this.showMessage("Company Structure is having a cyclic dependency", "We found a cyclic dependency due to following reasons:<br/>" + t), !1);
                                    },
                                },
                            ]),
                            t
                        );
                    })(),
                    p = (function (e) {
                        function t() {
                            return s(this, t), u(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
                        }
                        return (
                            c(t, l.default),
                            i(t, [
                                {
                                    key: "getDataMapping",
                                    value: function () {
                                        return [];
                                    },
                                },
                                {
                                    key: "getHeaders",
                                    value: function () {
                                        return [];
                                    },
                                },
                                {
                                    key: "getFormFields",
                                    value: function () {
                                        return [];
                                    },
                                },
                                {
                                    key: "setApiUrl",
                                    value: function (e) {
                                        this.apiUrl = e;
                                    },
                                },
                                {
                                    key: "setToken",
                                    value: function (e) {
                                        this.token = e;
                                    },
                                },
                                {
                                    key: "get",
                                    value: function () {
                                        var e = document.getElementById("apiQRcode");
                                        n.default.toCanvas(e, JSON.stringify({ key: "IceHrm", url: this.apiUrl, token: this.token }), function (e) {
                                            e && console.log(e);
                                        });
                                    },
                                },
                            ]),
                            t
                        );
                    })();
                t.exports = { EmployeeAdapter: d, CompanyGraphAdapter: h, ApiAccessAdapter: p };
            },
            { "../../../api/AdapterBase": 32, qrcode: 2 },
        ],
    },
    {},
    [35]
);
//# sourceMappingURL=employees.js.map
