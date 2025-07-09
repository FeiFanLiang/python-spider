
from hashlib import md5
import time
from base64 import b64encode

# const c = new Date().valueOf()
# const token = window.btoa('aiding_win'+c)
#
# const md = hex_md5(window.btoa('aiding_win'+String(Math.round(c/0x3e8))))
# 'sign=' + String(Math.round(c/0x3e8)) + '~' + token + '|' + md + '; path=/'

c = 1587102734000

token = str(b64encode(f'aiding_win{c}'.encode('utf-8')),'utf-8')
md = md5(b64encode(f'aiding_win{round(c/0x3e8)}'.encode('utf-8'))).hexdigest()
print(f'{round(c/0x3e8)}~{token}|{md}')