# python爬取豆瓣影评分析

## 1. 简介

读取豆瓣影评，并根据影评分析出影评关键词

## 2. 涉及知识点

1. requests.Session() 会话保持

   >requests库的session会话对象可以跨请求保持某些参数，说白了，就是比如你使用session成功的登录了某个网站，则在再次使用该session对象求求该网站的其他网页都会默认使用该session之前使用的cookie等参数

2. requests 请求网络代理

   如果需要使用代理，你可以通过为任意请求方法提供 proxies 参数来配置单个请求:

   ```
   import requests 
   proxies = { "http": "http://10.10.1.10:3128", "https": "http://10.10.1.10:1080", } 
   requests.get("http://example.org", proxies=proxies)
   ```

3. 输入

   ```
   kind = int(input("请选择搜索类型：1.根据电影链接 2.根据电影id 3.根据电影名："))
   ```

4.  selenium 模拟操作,通过xpath查找元素

   ```
    drive = webdriver.Chrome()
       drive.get(html.url)
       first_result = drive.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[1]/div[1]/div[1]/div/div/div[1]/a').get_attribute('href')
      
   ```

5. 使用lxml 解析评论数据

   ```
     from lxml import etree
     path_tree = etree.HTML(html.text)
     comment_divs = xpath_tree.xpath('//*[@id="comments"]/div')
   
   ```

6. PIL图像处理

   ```
   from PIL import Image
   Image.open('Emile.jpg')
   ```

7. jieba 结巴中文分词

   ```
   import jieba
   jieba.cut(comment_txt)
   ```

8. 词云

   ```
   
   def create_word_cloud():
       # 设置词云形状图片,numpy+PIL方式读取图片
       wc_mask = np.array(Image.open('Emile.jpg'))
       # 数据清洗词列表
       stop_words = ['的','是','我','都','了','有','在','给','吗','和','就是', '不是', '但是', '还是', '只是', '这样', '这个', '一个', '什么', '电影', '没有']
       # 设置词云的一些配置，如：字体，背景色，词云形状，大小,生成词云对象
       wc = WordCloud(mask=wc_mask,font_path=WC_FONT_PATH,  background_color="white", stopwords=stop_words, max_words=50, scale=4,
                      max_font_size=50, random_state=42)
       # 生成词云
       wc.generate(cut_word())
   
       # 在只设置mask的情况下,你将会得到一个拥有图片形状的词云
       # 开始画图
       plt.imshow(wc, interpolation="bilinear")
       # 为云图去掉坐标轴
       plt.axis("off")
       plt.figure()
       plt.show()
   ```

9. matplotlib绘图

   ```
   from matplotlib import pyplot as plt
   plt.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
   plt.rcParams['axes.unicode_minus']=False #用来正常显示负号
   
   def data_show():
       f = open('result.txt', 'r', encoding='UTF-8')
       list = f.readlines()
       sentimentslist = []
       for i in list:
           s = SnowNLP(i)
           sentimentslist.append(s.sentiments)
       print(sentimentslist)
       print(len(sentimentslist))
       plt.hist(sentimentslist, bins=10, facecolor='g')
       plt.xlabel('情感概率')
       plt.ylabel('数量')
       plt.title('情感分析')
       plt.show()
   ```

## 3. 完整代码

```python
import requests
from lxml import etree
import time
import random
import jieba
import numpy as np
from PIL import Image
from matplotlib import pyplot as plt
plt.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
plt.rcParams['axes.unicode_minus']=False #用来正常显示负号
from wordcloud import WordCloud
from selenium import webdriver
from urllib.parse import urlencode
from snownlp import SnowNLP

import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='gb18030')
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf8')


# 设置词云路径
WC_FONT_PATH = r'C:\Windows\Fonts\simfang.ttf'

session = requests.Session()
proxies={
        "http": "http://218.95.37.252:3128",
        "http": "http://60.205.159.195:3128",
        }
headers = {"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0',
               "Referer":'https://accounts.douban.com/passport/login'
           }


def login():
    url = "https://accounts.douban.com/j/mobile/login/basic"
    data = {
        'name':'13616008640',
        'password':'zsz123456',
        'remember':'false'
    }
    # 设置代理，从西刺免费代理网站上找出一个可用的代理IP
    user = session.post(url=url, headers=headers, data=data, proxies=proxies)
    print(user.text)


def spider_lianjie(lianjie):
    page = 0
    f = open('result.txt', 'a+', encoding="utf-8")
    f.seek(0)
    f.truncate()
    while True:
        comment_url = lianjie[:42]+'comments'
        params = {
            'start':page*20,
            'limit':20,
            'sort':'new_score',
            'status':'P'
        }
        html = session.get(url=comment_url, params=params, proxies=proxies)
        page += 1
        print("开始爬取第{0}页***********************************************************************：".format(page))
        print(html.url)
        xpath_tree = etree.HTML(html.text)
        comment_divs = xpath_tree.xpath('//*[@id="comments"]/div')
        if len(comment_divs) > 2:
            # 获取每一条评论的具体内容
            for comment_div in comment_divs:
                comment = comment_div.xpath('./div[2]/p/span/text()')
                if len(comment) > 0:
                    print(comment[0])
                    f.write(comment[0] + '\n')
            time.sleep(int(random.choice([0.5, 0.2, 0.3])))
        else:
            f.close()
            print("大约共{0}页评论".format(page-1))
            break


def spider_id(id):
    page = 0
    f = open('result.txt', 'a+', encoding='utf-8')
    f.seek(0)
    f.truncate()
    while True:
        move_url = 'https://movie.douban.com/subject/'+id+'/comments?'
        params = {
            'start':page*20,
            'limit':20,
            'sort':'new_score',
            'status':'P'
        }
        html = session.get(url=move_url, params=params, proxies=proxies)
        print(html.url)
        page += 1
        print("开始爬取第{0}页***********************************************************************：".format(page))
        print(html.url)
        xpath_tree = etree.HTML(html.text)
        comment_divs = xpath_tree.xpath('//*[@id="comments"]/div')
        if len(comment_divs) > 2:
            # 获取每一条评论的具体内容
            for comment_div in comment_divs:
                comment = comment_div.xpath('./div[2]/p/span/text()')
                if len(comment) > 0:
                    print(comment[0])
                    f.write(comment[0] + '\n')
            time.sleep(int(random.choice([0.5, 0.2, 0.3])))
        else:
            f.close()
            print("大约共{0}页评论".format(page-1))
            break


def spider_name(name):
    params = urlencode({'search_text':name})
    move_url = 'https://movie.douban.com/subject_search'
    html = requests.get(url=move_url,headers = headers, params=params,proxies=proxies)
    # 利用selenium模拟浏览器，找到电影的url
    drive = webdriver.Chrome()
    drive.get(html.url)
    first_result = drive.find_element_by_xpath('//*[@id="root"]/div/div[2]/div[1]/div[1]/div[1]/div/div/div[1]/a').get_attribute('href')
    page = 0
    # 每次写入前清空文件
    f = open('result.txt', 'a+', encoding=html.encoding)
    f.seek(0)
    f.truncate()
    while True:
        move_url = first_result+ '/comments?'
        params = {
            'start': page * 20,
            'limit': 20,
            'sort': 'new_score',
            'status': 'P'
        }
        html = session.get(url=move_url, headers = headers, params=params, proxies=proxies)
        page += 1
        print("开始爬取第{0}页***********************************************************************：".format(page))
        print(html.url)
        xpath_tree = etree.HTML(html.text)
        comment_divs = xpath_tree.xpath('//*[@id="comments"]/div')
        if len(comment_divs) > 2:
            # 获取每一条评论的具体内容
            for comment_div in comment_divs:
                comment = comment_div.xpath('./div[2]/p/span/text()')
                if len(comment) > 0:
                    print(comment[0]+'')
                    f.write(comment[0]+'\n')
            time.sleep(int(random.choice([0.5, 0.2, 0.3])))
        else:
            f.close()
            print("大约共{0}页评论".format(page - 1))
            break


# 定义搜索类型
def spider_kind():

    kind = int(input("请选择搜索类型：1.根据电影链接 2.根据电影id 3.根据电影名："))
    if kind == 1:
        lianjie = input("请输入电影链接:")
        spider_lianjie(lianjie)
    elif kind == 2:
        id = input("请输入电影id:")
        spider_id(id)
    elif kind == 3:
        name = input("请输入电影名:")
        spider_name(name)
    else:
        print("sorry,输入错误！")


def cut_word():
    with open('result.txt', 'r', encoding='utf-8') as file:
        # 读取文件里面的全部内容
        comment_txt = file.read()
        # 使用jieba进行分割
        wordlist = jieba.cut(comment_txt)
        print('***********',wordlist)
        wl = "/".join(wordlist)
        # print(wl)
        return wl


def create_word_cloud():
    # 设置词云形状图片,numpy+PIL方式读取图片
    wc_mask = np.array(Image.open('Emile.jpg'))
    # 数据清洗词列表
    stop_words = ['的','是','我','都','了','有','在','给','吗','和','就是', '不是', '但是', '还是', '只是', '这样', '这个', '一个', '什么', '电影', '没有']
    # 设置词云的一些配置，如：字体，背景色，词云形状，大小,生成词云对象
    wc = WordCloud(mask=wc_mask,font_path=WC_FONT_PATH,  background_color="white", stopwords=stop_words, max_words=50, scale=4,
                   max_font_size=50, random_state=42)
    # 生成词云
    wc.generate(cut_word())

    # 在只设置mask的情况下,你将会得到一个拥有图片形状的词云
    # 开始画图
    plt.imshow(wc, interpolation="bilinear")
    # 为云图去掉坐标轴
    plt.axis("off")
    plt.figure()
    plt.show()


def data_show():
    f = open('result.txt', 'r', encoding='UTF-8')
    list = f.readlines()
    sentimentslist = []
    for i in list:
        s = SnowNLP(i)
        sentimentslist.append(s.sentiments)
    print(sentimentslist)
    print(len(sentimentslist))
    plt.hist(sentimentslist, bins=10, facecolor='g')
    plt.xlabel('情感概率')
    plt.ylabel('数量')
    plt.title('情感分析')
    plt.show()


if __name__ == '__main__':
    login()
    spider_kind()
    create_word_cloud()
    data_show()
```

