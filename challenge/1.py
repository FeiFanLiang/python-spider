import datetime
import time
from functools import reduce
from hashlib import  md5
from base64 import b64encode
import requests

url = "https://www.python-spider.com/api/challenge1"

base_headers = {
  'accept': 'application/json, text/javascript, */*; q=0.01',
  'accept-language': 'zh-CN,zh;q=0.9',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'origin': 'https://www.python-spider.com',
  'referer': 'https://www.python-spider.com/challenge/1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  'Cookie': 'sessionid=odwwxiaqjt6s8e0vuia3tn10jd61yawc'
}


def request_item(page):
    payload = f'page={page}'
    timestamp = int(time.time())
    safe = md5(b64encode(f'9622{timestamp}'.encode('utf-8'))).hexdigest()
    headers ={
        'safe':safe,
        'timestamp':f'{timestamp}'
    }
    headers.update(base_headers)
    print(headers)
    response = requests.request("POST", url, headers=headers, data=payload)

    if response.status_code == 200:
        json = response.json()
        if len(json.get('data')):
            print(reduce(lambda x,y: x+float(y['value']),json.get('data'),0))
            return reduce(lambda x,y: x+float(y['value']),json.get('data'),0)
        return None
    return None


def main():
    total = []
    for page in range(1, 101):
        result = request_item(page)
        if result:
            print(result)
            total.append(result)

    all_total = reduce(lambda x,y: x+y,total,0)
    print(all_total)


if __name__ == '__main__':
    main()