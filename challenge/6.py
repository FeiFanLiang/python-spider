import time
from functools import reduce

import requests


url = 'https://www.python-spider.com/api/challenge6'
session = requests.Session()
session.cookies.update({
    'sessionid':'0v8dvy48grnzx4ybx3cuwz1ixqx3vh1r'
})


def request_page(page):
    payload = {
        'page':str(page)
    }
    print(f'第{page}页请求前cookie',session.cookies.get('sessionid',domain='www.python-spider.com'),session.cookies.get('sign',domain='www.python-spider.com'))
    res = session.request(method='POST', url = url, data=payload)
    print(f'第{page}页请求后的所有 cookies:', session.cookies.get_dict())

    if res.status_code == 200:
        json = res.json()
        if len(json.get('data')):
            print(page, json.get('data'))
            return reduce(lambda x,y: x+float(y['value']),json.get('data'),0)
        return None
    else:
        print('error', res)
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