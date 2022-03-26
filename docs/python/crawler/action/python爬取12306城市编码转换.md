# python爬取12306城市编码转换

## 1. 背景

在做项目的时候，遇到铁路城市编码问题。其中：BJP为北京站编码；TJP为天津站编码。

我们在信息查询->正晚点->可以看到station_name.js返回了城市编码信息

![image-20210202094628947](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210202094628947.png)

**请求地址**：https://kyfw.12306.cn/otn/resources/js/framework/station_name.js

![image-20210202095058660](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210202095058660.png)

## 2. 爬虫

爬虫目的： 从如上链接获取城市对应的三字码

1. 获取链接内容
2. 去掉前20个无用字符
3. 以|分隔，每5个是一组城市
4. 取每组第二三个，返回dict

代码如下：

```python
import requests

# 由于火车站使用三字码，所以我们需要先获取站点对应的三字码
code_data = requests.get('https://kyfw.12306.cn/otn/resources/js/framework/station_name.js')
print(code_data.text)

# 处理获得的字符串，返回字典类型
def zip_dic(code_data):
    # 去除前20个字符
    code_data = code_data[20:]
    # print(code_data)
    # 以竖线划分字符，每5个是一组城市信息，每组第二三个是城市编码和城市名称
    list_code = code_data.split("|")
    print(list_code)
    a=1
    b=2
    t1=[]
    t2=[]
    while (a < (len(list_code))):
        t1.append(list_code[a])
        t2.append(list_code[b])
        a = a+5
        b = b+5
    dic = dict(zip(t1,t2))
    return dic

code_dic = zip_dic(code_data.text)
print(code_dic)
```

## 3. 附录

城市编码和城市转换json文件

```js
{
	"北京北": "VAP",
	"北京东": "BOP",
	"北京": "BJP",
	"北京南": "VNP",
	"北京西": "BXP",
	"广州南": "IZQ",
	"重庆北": "CUW",
	"重庆": "CQW",
	"重庆南": "CRW",
	"重庆西": "CXW",
	"广州东": "GGQ",
	....
}
```



链接：https://pan.baidu.com/s/1QYZnGQP7BadfvccHZq6ASA 
提取码：v8cf 
复制这段内容后打开百度网盘手机App，操作更方便哦

## 参考文章

[python爬虫：获取12306网站火车站对应三字码](https://blog.csdn.net/kcyxws/article/details/105823767)
