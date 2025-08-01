import time
import datetime
import requests
from Crypto.Cipher import  AES
from Crypto.Util.Padding import pad
import base64


def encrypt(page):
  k = b'wdf2ff*TG@*(F4)*YH)g430HWR(*)wse'
  t = int(time.time())
  cipher = AES.new(k, AES.MODE_ECB)
  data = f'{t}|{page}'
  encrypted_data = cipher.encrypt(pad(data.encode('utf-8'), AES.block_size,style='pkcs7'))
  return encrypted_data



headers = {
  'accept': 'application/json, text/javascript, */*; q=0.01',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cache-control': 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'origin': 'https://www.python-spider.com',
  'pragma': 'no-cache',
  'priority': 'u=1, i',
  'referer': 'https://www.python-spider.com/challenge/14',
  'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
  'Cookie': 'sessionid=6q3kpq7evxbqx5wd26kthw8937b2x5l4'
}

def request_item(page):
  uc = base64.b64encode(encrypt(page)).decode('utf-8')
  data = {
    'page':str(page),
    'uc':uc
  }
  res = requests.request('POST',url='https://www.python-spider.com/api/challenge14',headers=headers,data=data)
  print(res)
  if res.status_code == 200:
    return sum([int(x['value']) for x in res.json().get('data')])
  else:
    print('error')

if __name__ == '__main__':
  values = []
  for i in range(1, 101):
    value = request_item(i)
    values.append(value)
  print(sum(values))