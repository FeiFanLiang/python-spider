from functools import reduce

import requests


payload = {}
headers = {
  'accept': '*/*',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cache-control': 'no-cache',
  'content-length': '0',
  'origin': 'https://www.python-spider.com',
  'pragma': 'no-cache',
  'priority': 'u=0, i',
  'referer': 'https://www.python-spider.com/challenge/7',
  'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  'Cookie': 'sessionid=9oyzdm5pu6kbe0tv0b4vsdh9pa7c61ea; m=a8f2f1d08525697c1e71c63acf8209a8|1752203427000; sign=gqyrzpeaiv; no-alert=true;'
}



def request_page(page):
    requests.request("POST", url='https://www.python-spider.com/cityjson', headers=headers, data=payload)
    data = {
        'page':str(page)
    }
    res = requests.request('POST',url='https://www.python-spider.com/api/challenge7',headers=headers,data=data)
    if res.status_code == 200:
        json = res.json()
        if len(json.get('data')):
            print(page, json.get('data'))
            return reduce(lambda x,y: x+float(y['value']),json.get('data'),0)
        return None
    return None

def start():
    total = []
    for page in range(1,101):
        result = request_page(page)
        if result:
            print(result)
            total.append(result)
    all_total = reduce(lambda x, y: x + y, total, 0)
    print(all_total)


if __name__ == '__main__':
    start()