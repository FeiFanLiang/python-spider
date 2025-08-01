import requests


font_map = {
    '&#xf712':'0',
    '&#xe458':'1',
    '&#xf375':'2',
    '&#xf80c':'3',
    '&#xf12f':'4',
    '&#xee4a':'5',
    '&#xf295':'6',
    '&#xe449':'7',
    '&#xf0d6':'8',
    '&#xe44d':'9'
}

def get_map_number(value:str):
     return int(''.join(map(lambda x:font_map[x],value.strip().split())))

url = "https://www.python-spider.com/api/challenge12"

headers = {
  'accept': 'application/json, text/javascript, */*; q=0.01',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cache-control': 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'origin': 'https://www.python-spider.com',
  'pragma': 'no-cache',
  'priority': 'u=1, i',
  'referer': 'https://www.python-spider.com/challenge/12',
  'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
  'Cookie': 'sessionid=6q3kpq7evxbqx5wd26kthw8937b2x5l4; __jsl_clearance=1752808491.723|0|clD4VpfqhdaLBWywKWy%2FZyfi6d_2526bdf1e1f78449a6f368c0b00d76043D'
}


def request_item(page):
    data = {
        'page':str(page)
    }
    res = requests.request('POST',url=url,headers=headers,data=data)

    value =  sum([get_map_number(x['value']) for x in res.json().get('data')])
    return value



if __name__ == '__main__':
    values = []
    for i in range(1,101):
        value = request_item(i)
        values.append(value)
    print(sum(values))