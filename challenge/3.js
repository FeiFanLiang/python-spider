const parse = require('@babel/parser').parse
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
const fs = require('fs')

const js = fs.readFileSync('./3.js','utf-8')

const ast = parse(js)
    var $a = ['\x77\x70\x34\x2f\x44\x67\x3d\x3d', '\x4e\x78\x6a\x44\x75\x41\x3d\x3d', '\x77\x71\x6b\x62\x77\x35\x6f\x3d', '\x77\x36\x73\x6a\x77\x6f\x77\x3d', '\x77\x37\x5a\x47\x77\x6f\x6f\x3d', '\x44\x67\x4a\x4d', '\x47\x47\x59\x64', '\x62\x38\x4f\x43\x49\x77\x3d\x3d', '\x48\x4d\x4b\x49\x77\x35\x77\x3d', '\x77\x35\x56\x4a\x65\x51\x3d\x3d', '\x77\x35\x2f\x44\x69\x73\x4f\x59', '\x77\x37\x4d\x73\x59\x41\x3d\x3d', '\x77\x72\x45\x35\x54\x51\x3d\x3d', '\x77\x70\x49\x76\x56\x51\x3d\x3d', '\x65\x38\x4f\x71\x42\x67\x3d\x3d', '\x77\x70\x55\x67\x43\x67\x3d\x3d', '\x77\x36\x73\x42\x77\x34\x49\x3d', '\x77\x70\x51\x4b\x52\x41\x3d\x3d', '\x47\x73\x4f\x4f\x48\x67\x3d\x3d', '\x51\x73\x4f\x61\x77\x72\x34\x3d', '\x54\x4d\x4b\x66\x77\x72\x49\x3d', '\x77\x36\x6e\x43\x6e\x38\x4f\x41', '\x77\x36\x76\x43\x6c\x6e\x67\x3d', '\x77\x37\x50\x43\x6b\x38\x4b\x4e', '\x77\x37\x6e\x43\x73\x73\x4b\x4a', '\x77\x72\x74\x50\x55\x67\x3d\x3d', '\x77\x37\x4e\x79\x77\x70\x34\x3d', '\x59\x63\x4f\x34\x4a\x67\x3d\x3d', '\x58\x63\x4b\x48\x77\x72\x73\x3d', '\x77\x34\x59\x79\x77\x71\x45\x3d', '\x77\x36\x4e\x79\x77\x70\x49\x3d', '\x4e\x30\x6a\x44\x76\x67\x3d\x3d', '\x77\x71\x67\x38\x49\x41\x3d\x3d', '\x51\x6a\x67\x76', '\x77\x34\x33\x43\x76\x47\x73\x3d', '\x77\x35\x46\x59\x55\x51\x3d\x3d', '\x64\x42\x6a\x44\x6c\x67\x3d\x3d', '\x4b\x73\x4f\x6f\x62\x51\x3d\x3d', '\x77\x6f\x30\x6b\x43\x51\x3d\x3d', '\x65\x4d\x4b\x48\x77\x71\x6f\x3d', '\x41\x56\x6b\x34', '\x47\x58\x48\x44\x6d\x77\x3d\x3d', '\x77\x35\x35\x77\x4a\x67\x3d\x3d', '\x41\x73\x4f\x58\x5a\x51\x3d\x3d', '\x77\x35\x51\x73\x77\x72\x49\x3d', '\x77\x6f\x48\x44\x73\x73\x4f\x79', '\x50\x63\x4f\x66\x77\x34\x73\x3d', '\x4a\x63\x4b\x44\x77\x34\x34\x3d', '\x55\x63\x4f\x68\x4c\x51\x3d\x3d', '\x77\x37\x72\x43\x70\x4d\x4b\x36', '\x35\x4c\x71\x52\x35\x35\x65\x30\x36\x49\x69\x38', '\x57\x51\x37\x44\x72\x77\x3d\x3d', '\x77\x6f\x49\x65\x56\x41\x3d\x3d', '\x55\x78\x62\x44\x6b\x51\x3d\x3d', '\x77\x35\x39\x48\x49\x77\x3d\x3d', '\x77\x72\x6b\x45\x77\x35\x6b\x3d', '\x46\x4d\x4f\x30\x62\x51\x3d\x3d', '\x4a\x38\x4f\x6e\x77\x36\x55\x3d', '\x77\x70\x2f\x43\x6d\x48\x38\x3d', '\x4c\x4d\x4f\x51\x65\x77\x3d\x3d', '\x56\x38\x4f\x59\x4e\x41\x3d\x3d', '\x77\x71\x56\x46\x42\x67\x3d\x3d', '\x56\x63\x4b\x7a\x50\x41\x3d\x3d', '\x77\x70\x49\x74\x54\x41\x3d\x3d', '\x77\x6f\x6f\x57\x77\x71\x67\x3d', '\x58\x38\x4b\x44\x77\x72\x55\x3d', '\x77\x71\x4d\x54\x5a\x51\x3d\x3d', '\x64\x38\x4f\x48\x48\x67\x3d\x3d', '\x59\x51\x63\x53', '\x59\x4d\x4f\x56\x77\x6f\x45\x3d', '\x54\x73\x4b\x48\x77\x6f\x6f\x3d', '\x77\x71\x49\x6d\x63\x67\x3d\x3d', '\x51\x32\x59\x58', '\x77\x70\x52\x34\x45\x67\x3d\x3d', '\x77\x71\x2f\x44\x6b\x73\x4b\x64', '\x66\x73\x4b\x50\x77\x72\x38\x3d', '\x77\x34\x4c\x43\x68\x55\x41\x3d', '\x49\x45\x67\x4c', '\x4f\x54\x56\x66', '\x77\x35\x35\x33\x77\x70\x45\x3d', '\x77\x72\x6c\x38\x48\x67\x3d\x3d', '\x48\x44\x31\x4a', '\x62\x54\x48\x44\x6d\x41\x3d\x3d', '\x54\x4d\x4f\x79\x52\x77\x3d\x3d', '\x35\x35\x36\x2b\x37\x37\x36\x77\x35\x4c\x79\x37', '\x77\x35\x2f\x43\x76\x6b\x51\x3d', '\x77\x36\x30\x76\x77\x6f\x45\x3d', '\x77\x36\x2f\x43\x74\x46\x45\x3d', '\x53\x4d\x4f\x4e\x50\x67\x3d\x3d', '\x4a\x67\x52\x50', '\x77\x72\x50\x44\x70\x38\x4b\x51', '\x43\x38\x4f\x66\x49\x67\x3d\x3d', '\x63\x73\x4b\x43\x77\x34\x73\x3d', '\x77\x70\x49\x58\x77\x37\x6b\x3d', '\x77\x6f\x67\x4f\x57\x77\x3d\x3d', '\x4a\x6a\x62\x44\x6f\x51\x3d\x3d', '\x61\x68\x62\x44\x71\x41\x3d\x3d', '\x77\x72\x51\x47\x77\x70\x6f\x3d', '\x77\x6f\x52\x36\x44\x67\x3d\x3d', '\x51\x63\x4b\x4e\x77\x34\x63\x3d', '\x77\x70\x5a\x4c\x77\x35\x45\x3d', '\x77\x70\x45\x34\x55\x67\x3d\x3d', '\x77\x34\x4a\x57\x77\x6f\x51\x3d', '\x62\x73\x4b\x6b\x4f\x51\x3d\x3d', '\x4f\x73\x4f\x35\x77\x35\x4d\x3d', '\x41\x73\x4b\x56\x77\x37\x38\x3d', '\x45\x57\x55\x49', '\x59\x53\x4c\x44\x72\x51\x3d\x3d', '\x77\x35\x39\x32\x49\x51\x3d\x3d', '\x53\x73\x4b\x46\x4e\x51\x3d\x3d', '\x54\x6a\x7a\x43\x6b\x67\x3d\x3d', '\x77\x37\x6e\x43\x75\x38\x4f\x59', '\x77\x34\x64\x71\x77\x70\x67\x3d', '\x77\x34\x67\x4f\x77\x6f\x45\x3d', '\x77\x70\x6c\x64\x58\x67\x3d\x3d', '\x77\x72\x4c\x44\x68\x73\x4f\x2b', '\x57\x38\x4f\x7a\x42\x51\x3d\x3d', '\x77\x34\x38\x71\x77\x36\x63\x3d', '\x77\x37\x51\x49\x77\x34\x34\x3d', '\x77\x72\x41\x44\x43\x67\x3d\x3d', '\x56\x73\x4b\x61\x77\x34\x55\x3d', '\x49\x79\x78\x6b', '\x52\x4d\x4b\x74\x77\x6f\x77\x3d', '\x77\x6f\x6b\x59\x54\x67\x3d\x3d', '\x48\x68\x42\x69', '\x77\x34\x38\x68\x77\x71\x55\x3d', '\x77\x34\x33\x43\x69\x45\x38\x3d', '\x77\x71\x6f\x6a\x55\x41\x3d\x3d', '\x4e\x6d\x33\x44\x75\x67\x3d\x3d', '\x46\x63\x4f\x4a\x77\x37\x6b\x3d', '\x77\x37\x52\x6c\x77\x71\x34\x3d', '\x77\x72\x49\x74\x4e\x67\x3d\x3d', '\x77\x6f\x67\x6b\x44\x41\x3d\x3d', '\x77\x70\x55\x49\x45\x51\x3d\x3d', '\x50\x44\x45\x6e', '\x77\x6f\x34\x4e\x77\x71\x30\x3d', '\x77\x34\x6e\x43\x70\x38\x4f\x57', '\x77\x37\x63\x42\x48\x41\x3d\x3d', '\x77\x35\x39\x62\x77\x70\x34\x3d', '\x77\x37\x74\x35\x77\x72\x41\x3d', '\x77\x70\x38\x6a\x77\x72\x51\x3d', '\x58\x4d\x4b\x59\x77\x70\x59\x3d', '\x42\x4d\x4b\x66\x77\x36\x34\x3d', '\x77\x36\x45\x44\x77\x34\x63\x3d', '\x4f\x43\x74\x6f', '\x4d\x73\x4f\x79\x77\x36\x63\x3d', '\x77\x72\x4d\x74\x77\x37\x6b\x3d', '\x77\x37\x44\x43\x68\x30\x55\x3d', '\x53\x4d\x4f\x57\x77\x6f\x4d\x3d', '\x77\x6f\x38\x71\x4b\x51\x3d\x3d', '\x56\x43\x5a\x43', '\x77\x36\x77\x43\x77\x6f\x34\x3d', '\x77\x36\x42\x70\x62\x51\x3d\x3d', '\x56\x44\x2f\x43\x69\x41\x3d\x3d', '\x52\x45\x77\x7a', '\x77\x34\x6c\x6c\x50\x77\x3d\x3d', '\x77\x36\x4e\x2b\x77\x6f\x45\x3d', '\x77\x6f\x73\x45\x4c\x51\x3d\x3d', '\x77\x35\x6c\x4e\x77\x70\x59\x3d', '\x4b\x63\x4f\x63\x77\x35\x38\x3d', '\x48\x73\x4b\x35\x4b\x77\x3d\x3d', '\x77\x37\x7a\x43\x6e\x73\x4f\x79', '\x59\x63\x4f\x6c\x44\x41\x3d\x3d', '\x4d\x63\x4f\x7a\x77\x36\x77\x3d', '\x59\x55\x55\x46', '\x4e\x51\x64\x71', '\x77\x72\x34\x48\x47\x77\x3d\x3d', '\x77\x71\x74\x5a\x77\x34\x49\x3d', '\x4c\x58\x48\x44\x6b\x51\x3d\x3d', '\x77\x34\x33\x43\x75\x63\x4f\x59', '\x4f\x33\x72\x44\x6b\x67\x3d\x3d', '\x4c\x63\x4f\x56\x77\x36\x77\x3d', '\x77\x70\x4d\x37\x4b\x67\x3d\x3d', '\x52\x73\x4f\x34\x77\x6f\x45\x3d', '\x77\x37\x54\x43\x75\x56\x67\x3d', '\x4d\x30\x41\x4a', '\x46\x42\x64\x7a', '\x50\x4d\x4f\x6a\x77\x34\x38\x3d', '\x43\x38\x4b\x4f\x4c\x41\x3d\x3d', '\x77\x70\x2f\x43\x74\x33\x77\x3d', '\x55\x63\x4b\x32\x77\x70\x41\x3d', '\x77\x34\x76\x43\x74\x30\x59\x3d', '\x77\x70\x51\x59\x77\x6f\x45\x3d', '\x65\x73\x4b\x36\x77\x71\x6b\x3d', '\x51\x4d\x4f\x64\x4e\x41\x3d\x3d', '\x54\x58\x51\x4e', '\x44\x48\x49\x44', '\x41\x42\x52\x6d', '\x52\x4d\x4f\x2f\x48\x51\x3d\x3d', '\x41\x6e\x58\x44\x72\x51\x3d\x3d', '\x65\x42\x2f\x44\x76\x41\x3d\x3d', '\x77\x36\x41\x70\x77\x36\x30\x3d', '\x77\x6f\x73\x51\x77\x71\x38\x3d', '\x77\x35\x6e\x43\x74\x56\x63\x3d', '\x77\x35\x66\x43\x71\x73\x4f\x61', '\x58\x73\x4b\x67\x77\x71\x30\x3d', '\x77\x71\x4a\x31\x77\x34\x34\x3d', '\x77\x6f\x4c\x44\x6a\x63\x4b\x36', '\x49\x63\x4f\x5a\x41\x67\x3d\x3d', '\x63\x77\x50\x44\x76\x41\x3d\x3d', '\x77\x70\x63\x39\x63\x67\x3d\x3d', '\x54\x63\x4b\x33\x47\x41\x3d\x3d', '\x77\x72\x30\x7a\x77\x37\x77\x3d', '\x59\x63\x4f\x41\x4a\x77\x3d\x3d', '\x44\x54\x78\x71', '\x77\x35\x77\x37\x52\x41\x3d\x3d', '\x77\x34\x6a\x43\x76\x63\x4f\x6e', '\x42\x73\x4f\x65\x77\x35\x51\x3d', '\x77\x6f\x63\x44\x56\x41\x3d\x3d', '\x77\x37\x46\x41\x46\x77\x3d\x3d', '\x57\x63\x4f\x4b\x77\x72\x67\x3d', '\x4c\x38\x4f\x6a\x41\x67\x3d\x3d', '\x43\x38\x4b\x59\x47\x51\x3d\x3d', '\x77\x34\x37\x43\x72\x73\x4f\x67', '\x4d\x4d\x4f\x72\x4a\x77\x3d\x3d', '\x4d\x4d\x4f\x54\x41\x41\x3d\x3d', '\x77\x72\x41\x52\x64\x41\x3d\x3d', '\x77\x35\x6e\x43\x76\x63\x4f\x4e', '\x49\x33\x42\x6f', '\x77\x37\x49\x41\x77\x36\x55\x3d', '\x66\x73\x4b\x34\x77\x71\x73\x3d', '\x41\x63\x4f\x51\x53\x41\x3d\x3d', '\x77\x37\x70\x2b\x77\x35\x30\x3d', '\x57\x43\x66\x44\x74\x41\x3d\x3d', '\x77\x35\x77\x7a\x56\x41\x3d\x3d', '\x77\x36\x6f\x75\x77\x34\x38\x3d', '\x77\x35\x58\x43\x76\x6b\x51\x3d', '\x63\x51\x63\x64', '\x77\x71\x67\x43\x77\x37\x4d\x3d', '\x41\x7a\x78\x44', '\x77\x71\x6a\x44\x69\x73\x4b\x4a', '\x77\x71\x5a\x75\x4c\x51\x3d\x3d', '\x52\x63\x4f\x52\x49\x51\x3d\x3d', '\x77\x37\x45\x73\x56\x77\x3d\x3d', '\x64\x69\x67\x4a', '\x77\x34\x4a\x63\x59\x41\x3d\x3d', '\x77\x35\x42\x4b\x4c\x77\x3d\x3d', '\x77\x34\x50\x43\x76\x4d\x4f\x44', '\x77\x36\x37\x43\x6b\x4d\x4f\x77', '\x77\x37\x64\x5a\x77\x70\x4d\x3d', '\x77\x37\x54\x43\x68\x57\x55\x3d', '\x62\x38\x4b\x45\x77\x70\x49\x3d', '\x77\x36\x6e\x43\x76\x31\x67\x3d', '\x35\x62\x79\x66\x47\x56\x30\x3d', '\x77\x34\x54\x43\x74\x38\x4b\x74', '\x62\x73\x4f\x45\x77\x71\x55\x3d', '\x77\x71\x77\x76\x62\x41\x3d\x3d', '\x50\x77\x5a\x6a', '\x52\x38\x4f\x48\x77\x71\x38\x3d', '\x46\x53\x74\x44', '\x77\x34\x4c\x43\x69\x38\x4b\x6e', '\x53\x42\x48\x44\x70\x77\x3d\x3d', '\x77\x36\x58\x43\x6e\x33\x4d\x3d', '\x77\x35\x58\x43\x71\x4d\x4f\x4b'];
    (function(a, b) {
        var c = function(g) {
            while (--g) {
                a['push'](a['shift']());
            }
        };
        var f = function() {
            var g = {
                'data': {
                    'key': 'cookie',
                    'value': 'timeout'
                },
                'setCookie': function(k, l, m, n) {
                    n = n || {};
                    var o = l + '=' + m;
                    var p = 0x0;
                    for (var q = 0x0, r = k['length']; q < r; q++) {
                        var s = k[q];
                        o += ';\x20' + s;
                        var t = k[s];
                        k['push'](t);
                        r = k['length'];
                        if (t !== !![]) {
                            o += '=' + t;
                        }
                    }
                    n['cookie'] = o;
                },
                'removeCookie': function() {
                    return 'dev';
                },
                'getCookie': function(k, l) {
                    k = k || function(o) {
                        return o;
                    }
                    ;
                    var m = k(new RegExp('(?:^|;\x20)' + l['replace'](/([.$?*|{}()[]\/+^])/g, '$1') + '=([^;]*)'));
                    var n = function(o, p) {
                        o(++p);
                    };
                    n(c, b);
                    return m ? decodeURIComponent(m[0x1]) : undefined;
                }
            };
            var h = function() {
                var k = new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');
                return true
            };
            g['updateCookie'] = h;
            var i = '';
            var j = g['updateCookie']();
            if (!j) {
                g['setCookie'](['*'], 'counter', 0x1);
            } else if (j) {
                i = g['getCookie'](null, 'counter');
            } else {
                g['removeCookie']();
            }
        };
        f();
    }($a, 0x1f1));
    var $b = function(a, b) {
        a = a - 0x0;
        var c = $a[a];
        if ($b['RtAlIp'] === undefined) {
            (function() {
                var f = function() {
                    var i;
                    try {
                        i = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
                    } catch (j) {
                        i = window;
                    }
                    return i;
                };
                var g = f();
                var h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                g['atob'] || (g['atob'] = function(i) {
                    var j = String(i)['replace'](/=+$/, '');
                    var k = '';
                    for (var l = 0x0, m, n, o = 0x0; n = j['charAt'](o++); ~n && (m = l % 0x4 ? m * 0x40 + n : n,
                    l++ % 0x4) ? k += String['fromCharCode'](0xff & m >> (-0x2 * l & 0x6)) : 0x0) {
                        n = h['indexOf'](n);
                    }
                    return k;
                }
                );
            }());
            var e = function(f, g) {
                var h = [], l = 0x0, m, n = '', o = '';
                f = atob(f);
                for (var q = 0x0, r = f['length']; q < r; q++) {
                    o += '%' + ('00' + f['charCodeAt'](q)['toString'](0x10))['slice'](-0x2);
                }
                f = decodeURIComponent(o);
                var p;
                for (p = 0x0; p < 0x100; p++) {
                    h[p] = p;
                }
                for (p = 0x0; p < 0x100; p++) {
                    l = (l + h[p] + g['charCodeAt'](p % g['length'])) % 0x100;
                    m = h[p];
                    h[p] = h[l];
                    h[l] = m;
                }
                p = 0x0;
                l = 0x0;
                for (var t = 0x0; t < f['length']; t++) {
                    p = (p + 0x1) % 0x100;
                    l = (l + h[p]) % 0x100;
                    m = h[p];
                    h[p] = h[l];
                    h[l] = m;
                    n += String['fromCharCode'](f['charCodeAt'](t) ^ h[(h[p] + h[l]) % 0x100]);
                }
                return n;
            };
            $b['EHORLD'] = e;
            $b['inqurI'] = {};
            $b['RtAlIp'] = !![];
        }
        var d = $b['inqurI'][a];
        if (d === undefined) {
            if ($b['bPyjmC'] === undefined) {
                var f = function(g) {
                    this['gHYxCO'] = g;
                    this['FNxNBV'] = [0x1, 0x0, 0x0];
                    this['NsHPhE'] = function() {
                        return 'newState';
                    }
                    ;
                    this['jHyirE'] = '\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';
                    this['cKeifW'] = '[\x27|\x22].+[\x27|\x22];?\x20*}';
                };
                f['prototype']['XXTHJv'] = function() {
                    var g = new RegExp(this['jHyirE'] + this['cKeifW']);
                    var h = true ? --this['FNxNBV'][0x1] : --this['FNxNBV'][0x0];
                    return this['LjzThe'](h);
                }
                ;
                f['prototype']['LjzThe'] = function(g) {
                    if (!Boolean(~g)) {
                        return g;
                    }
                    return this['bMRZxN'](this['gHYxCO']);
                }
                ;
                f['prototype']['bMRZxN'] = function(g) {
                    for (var h = 0x0, j = this['FNxNBV']['length']; h < j; h++) {
                        this['FNxNBV']['push'](Math['round'](Math['random']()));
                        j = this['FNxNBV']['length'];
                    }
                    return g(this['FNxNBV'][0x0]);
                }
                ;
                new f($b)['XXTHJv']();
                $b['bPyjmC'] = !![];
            }
            c = $b['EHORLD'](c, b);
            $b['inqurI'][a] = c;
        } else {
            c = d;
        }
        return c;
    };

traverse(ast,{
    exit:(path) =>{
        if(path.node.extra){
            delete path.node.extra
        }
    }
})
traverse(ast,{
    BinaryExpression:{
        exit:(path) => {
            const {confident,value} = path.evaluate()
            if(confident){
                path.replaceWith(t.valueToNode(value))
            }
        }
    }
})

traverse(ast,{
    CallExpression:{
        exit:(path) => {
            if(t.isIdentifier(path.node.callee) && path.node.callee.name ==='$b'){
                const args = path.get('arguments')
                const result = $b(...args.map(arg => arg.node.value))
                path.replaceWith(t.valueToNode(result))
            }
        }
    }
})

traverse(ast,{
    BinaryExpression:{
        exit:(path) => {
            const {confident,value} = path.evaluate()
            if(confident){
                path.replaceWith(t.valueToNode(value))
            }
        }
    }
})

traverse(ast,{
    ExpressionStatement:{
        exit:(path) => {
            if(path.node.expression.left?.object?.name === 'y' && path.node.expression.left.property.type === 'StringLiteral'){
                const scopePath = path.scope.getBinding('y')
                if(scopePath.path){
                    const property = t.objectProperty(t.identifier(path.node.expression.left.property.value),path.node.expression.right)
                    scopePath.path.node.init.properties.push(property)
                    path.remove()
                }
                
            }
        }
    }
})

let y = {}
traverse(ast,{
    VariableDeclarator:{
        exit:(path) => {
            console.log(path.toString())
            if(path.node.id?.name === 'y'){
                y = path
            }
        }
    }
})

traverse(ast,{
    CallExpression:{
        exit:(path) => {
            if(t.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'A' && t.isStringLiteral(path.node.callee.property)){
                const property = y.get('init.properties').find(item =>  item.node.key.name === path.node.callee.property.value)
                if(property){
                   
                    if(t.isFunctionExpression(property.node.value)){
                        const body = property.get('value.body.body.0.argument')
                        if(t.isBinaryExpression(body)){
                            const operator = body.node.operator
                            const left = path.get('arguments.0').node
                            const right = path.get('arguments.1').node
                            path.replaceWith(t.binaryExpression(operator,left,right))
                        }else if(t.isCallExpression(body)){
                            const callee = body.get('callee').node
                            const args = body.get('arguments').map(item => item.node)
                            console.log(property.toString())
                            const arguments = path.get('arguments').map(item => item.node)
                            console.log(generate(t.callExpression(arguments[0],arguments.slice(1))).code)
                            path.replaceWith(t.callExpression(arguments[0],arguments.slice(1)))
                        }
                    }
                    
                }
                
            }
        }
    },
    MemberExpression:{
        exit:(path) => {
            if(path.node?.object?.name === 'A' && t.isStringLiteral(path.node.property)){
                const property = y.get('init.properties').find(item => item.node.key.name === path.node.property.value)
                if(property && t.isStringLiteral(property.node.value)){
                    path.replaceWith(t.valueToNode(property.node.value.value))
                }
            }
        }
    }
})

traverse(ast,{
    SwitchStatement:{
        exit:(path) => {
            const scopePath = path.scope.getBinding(path.get('discriminant').node?.object?.name)?.path
            
            if(t.isCallExpression(scopePath.node?.init) && t.isMemberExpression(scopePath.node.init.callee) && t.isStringLiteral(scopePath.node.init.callee.object) && t.isStringLiteral(scopePath.node.init.callee.property)){
                const value = eval(`'${scopePath.node.init.callee.object.value}'.${scopePath.node.init.callee.property.value}('${scopePath.node.init.arguments[0].value}')`)
                const cases = path.get('cases')
                const sortCases = value.map(test => {
                    const target = cases.find(item => item.node.test.value === test)
                    if(target){
                        return target.node.consequent.filter(item => !t.isContinueStatement(item))
                    }
                })
                path.replaceWithMultiple(sortCases.flat())
              

            }
        }
    }
})

fs.writeFileSync('./3ast-output.js',generate(ast).code)