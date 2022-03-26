# 小象代理

## 1. 背景

反爬虫技术中最常见的技术就是封ip，那么我们如何对抗呢？我们可以使用高匿ip。这个高匿ip只存活1-2分钟。我们每格10秒换一个ip

## 2. 使用

https://www.xiaoxiangdaili.com/ip-short/guide

1. 申请试用

   ![image-20210302095623043](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210302095623043.png)

2. 获取代理的ip

   https://api.xiaoxiangdaili.com/ip/get?appKey=683854977391022080&appSecret=IXhGvwsx&cnt=20&wt=json

   ![image-20210302100007951](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210302100007951.png)

## 3. 项目集成

思路：

1. 每隔4s取一次高匿ip
2. 将高匿ip保存到redis list
3. 当redis中的ip>=20 的时候，不再往里添加
4. 每次请求消耗一个ip

代码

1. redis 代码: db_handle_redis.py

   ```python
   import redis
   import json
   
   class DbHandleRedis(object):
       def __init__(self, db_host='127.0.0.1',db_port=6379,db_index=2):
           self.db_host = db_host
           self.db_port = db_port
           self.db_index = db_index
           self.redis_conn = redis.StrictRedis(self.db_host,self.db_port,self.db_index,decode_responses=True)
   
       def __del__(self):
           self.redis_conn.close()
   
       def rpush_ip_proxy(self,ip_proxy):
           self.redis_conn.rpush('ip_proxy_list',json.dumps(ip_proxy))
   
       def lpop_ip_proxy(self):
           ip_proxy_json = self.redis_conn.lpop('ip_proxy_list')
           if ip_proxy_json == None:
               return None
           ip_proxy_json = json.loads(ip_proxy_json)
           return ip_proxy_json
   
       def llen_ip_proxy(self):
           return self.redis_conn.llen('ip_proxy_list')
   ```

2. 获取高匿ip代码：  ip_proxy_handle.py

   ```python
   import time
   import requests
   from db_handle_redis import DbHandleRedis
   
   
   def get_proxy_ip(db_redis):
       base_url = 'https://api.xiaoxiangdaili.com/ip/get?appKey=683854977391022080&appSecret=IXhGvwsx&cnt=20&wt=json'
       headers = {
           'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36'
       }
   
       while True:
           # 间隔4s轮询
           time.sleep(4)
           # redis 中的ip如果大于20个，则不再往里添加
           ip_proxy_len = db_redis.llen_ip_proxy()
           if ip_proxy_len >= 20:
               print('redis中的高匿ip超过20个')
               continue
           try:
               resp = requests.get(url=base_url, headers=headers, timeout=3)
               if resp.status_code == 200:
                   resp_data = resp.json()
                   if resp_data['code'] == 200:
                       # 提取出ip和端口，记录当前时间。保存在数据库中
                       ip_data = resp_data['data'][0]['ip']
                       port_data = resp_data['data'][0]['port']
                       ip_proxy = '{}:{}'.format(ip_data, port_data)
                       current_time = time.time()
                       ip_info = {}
                       ip_info['ip_proxy'] = ip_proxy
                       ip_info['time'] = current_time
                       db_redis.rpush_ip_proxy(ip_info)
                       print('ip代理信息：' + ip_proxy)
                   elif resp_data['code'] == 1003:
                       print('ip proxy is over.')
                       break
           except Exception as e:
               print('e:', e)
   
   
   if __name__ == '__main__':
       db_redis = DbHandleRedis()
       get_proxy_ip(db_redis)
   
   ```

3. 具体的抓包设置代理：crawler.py

   ```python
   import time
   import requests
   
   class CrawlerApp(object):
       def __init__(self, db_redis):
           self.db_redis = db_redis
   
       def get_ip_proxy(self):
           ip_proxy_info = self.db_redis.lpop_ip_proxy()
           if ip_proxy_info == None:
               print('-------未获取到ip_proxy-------')
               return False
           else:
               current_time = time.time()
               if current_time - ip_proxy_info['time'] >120:
                   print('-------ip_proxy 超过2分钟-------')
                   return False
               self.ip_proxy = ip_proxy_info['ip_proxy']
           return True
   
       # 具体业务请求的时候，先获取ip。判断是否超时，不超时添加到代理
       def get_yewu(self):
           bool_result = self.get_ip_proxy()
           if bool_result == False:
               return False
   
           ip_proxies = {}
           ip_proxies['http'] = self.ip_proxy
   
           requests.get("http://example.org", proxies=ip_proxies)
   
   ```

   

