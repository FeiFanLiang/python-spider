import requests
import execjs
import re
from bs4 import  BeautifulSoup


# 纯算还原

# const t_0 = (n) => {
#     return n
# }
# const t_1 = (n) =>{
#     return n
# }
# const t_2 = (n) => {
#     const url = 'www.python-spider.com/'
#     for (var _1H = 0; _1H < n.length; _1H++) {
#         n[_1H] = url.charAt(n[_1H]);
#       }
#       return n.join("");
# }
# t_2(['12'])
# const t_3 = (n) => {
#     for (var index = 0; index < n.length; index++) {
#         n[index] = parseInt(n[index]).toString(36);
#       }
#       return n.join("");
# }
# t_3(['17', '13', '10'])
#
# var _N = function () {
#   setTimeout(
#     "location.href=location.pathname+location.search.replace(/[?|&]captcha-challenge/,'')",
#     1500
#   );
#   const str = '_dfc1afae1f622753056a8adcb1aec516'
#   document.cookie =
#     "__jsl_clearance=1752743233.758|0|" +
#    `clD4VpfqhdaLBWywKWy%2FZyfi6d${str}3D` +
#     ";Expires=Tue, 12-Dec-30 09:50:26 GMT;Path=/;";
# };
# if (
#   (function () {
#     try {
#       return !!window.addEventListener;
#     } catch (e) {
#       return false;
#     }
#   })()
# ) {
#   document.addEventListener("DOMContentLoaded", _N, false);
# } else {
#   document.attachEvent("onreadystatechange", _N);
# }
# // var _N = function () {
# //   setTimeout(
# //     "location.href=location.pathname+location.search.replace(/[?|&]captcha-challenge/,'')",
# //     1500
# //   );
# //   document.cookie =
# //     "__jsl_clearance=1752745585.877|0|" +
# //     (function () {
# //       var _t = [
# //           function (_N) {
# //             return _N;
# //           },
# //           function (_t) {
# //             return _t;
# //           },
# //           (function () {
# //             var _N = document.createElement("div");
# //             _N.innerHTML = "<a href='/'>_1H</a>";
# //             _N = _N.firstChild.href;
# //             var _t = _N.match(/https?:\/\//)[0];
# //             _N = _N.substr(_t.length).toLowerCase();
# //             return function (_t) {
# //               for (var _1H = 0; _1H < _t.length; _1H++) {
# //                 _t[_1H] = _N.charAt(_t[_1H]);
# //               }
# //               return _t.join("");
# //             };
# //           })(),
# //           function (_N) {
# //             for (var _t = 0; _t < _N.length; _t++) {
# //               _N[_t] = parseInt(_N[_t]).toString(36);
# //             }
# //             return _N.join("");
# //           },
# //         ],
# //         _N = [
# //           "clD",
# //           [(-~~~{} << -~~~{}) + (-~~~{} << -~~~{})],
# //           "V",
# //           [-~[] + [] + [[]][0] + [-~-~{}]],
# //           "fq",
# //           [
# //             -~[] +
# //               [] +
# //               [[]][0] +
# //               [-~[] - ~[] - ~!/!/ + (-~[] - ~[]) * [-~[] - ~[]]],
# //             -~[] + [] + [[]][0] + (-~[-~-~{}] + [[]][0]),
# //             -~[] + [] + [[]][0] + [+!![[][[]]][1]],
# //           ],
# //           "LBWywKW",
# //           [2 - ~[-~-~{}] + [] + [[]][0]],
# //           "%2FZyf",
# //           [-~[] + [] + [[]][0] + (-~[-~-~{}] + [[]][0])],
# //           "6",
# //           [-~[] + [] + [[]][0] + (-~[-~-~{}] + [[]][0])],
# //           "_bec3e41cbf9fdba3813cf03c4eb6e9a8",
# //           -~[-~-~{}] + [[]][0],
# //           "D",
# //         ];
# //       for (var _1H = 0; _1H < _N.length; _1H++) {
# //         _N[_1H] = _t[[1, 0, 1, 2, 1, 3, 1, 2, 1, 2, 1, 3, 1, 0, 1][_1H]](
# //           _N[_1H]
# //         );
# //       }
# //       return _N.join("");
# //     })() +
# //     ";Expires=Tue, 12-Dec-30 09:50:26 GMT;Path=/;";
# // };
# // if (
# //   (function () {
# //     try {
# //       return !!window.addEventListener;
# //     } catch (e) {
# //       return false;
# //     }
# //   })()
# // ) {
# //   document.addEventListener("DOMContentLoaded", _N, false);
# // } else {
# //   document.attachEvent("onreadystatechange", _N);
# // }


# f = function (x, y) {
#     var a = 0,
#       b = 0,
#       c = 0;
#     x = x.split("");
#     y = y || 99;
#     while ((a = x.shift()) && (b = a.charCodeAt(0) - 77.5))
#       c = (Math.abs(b) < 13 ? b + 48.5 : parseInt(a, 36)) + y * c;
#     return c;
#   },
#   z = f(
#     y
#       .match(/\w/g)
#       .sort(function (x, y) {
#         return f(x) - f(y);
#       })
#       .pop()
#   )

headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-length': '0',
        'origin': 'https://www.python-spider.com',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'referer': 'https://www.python-spider.com/challenge/11',
        'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    }

def request():

    res = requests.request('GET',url='https://www.python-spider.com/challenge/11',headers=headers,cookies={
        'sessionid':'6q3kpq7evxbqx5wd26kthw8937b2x5l4'
    })
    text = res.text
    if text.startswith('<script>'):
       script = re.match(r'<script>(.*)</script>',text).group(1)
       ctx = execjs.compile(script.replace('eval','var str = '))
       content = ctx.eval('str')
       prefix = re.search(r"""__jsl_clearance=(.*)\'\+""",content).group(1)
       value = re.search(r"""0]\)],'(\w{5,})'""",content).group(1)
       cookie_value = f'{prefix}clD4VpfqhdaLBWywKWy%2FZyfi6d{value}3D'
    res2 = requests.request('GET',url='https://www.python-spider.com/challenge/11',headers=headers,cookies={
        'sessionid':'6q3kpq7evxbqx5wd26kthw8937b2x5l4',
        '__jsl_clearance':cookie_value
    })
    html = BeautifulSoup(res2.text,'html.parser')
    tables = html.find_all('td',class_='info')
    values = sum([int(x.getText().strip()) for x in tables])
    print(values)


if __name__ == '__main__':
    request()