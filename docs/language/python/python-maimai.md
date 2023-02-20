# python爬取脉脉

## 1. 简介

该项目主要是根据[github项目爬取脉脉网](https://github.com/Joezhangs/PythonSpider/tree/master/Item5%EF%BC%9Aspider_maimai) 学习，并根据自己的业务需求改造

### 1.1 页面爬取的内容

>这是一个基于python3而写的爬虫，爬取的网站的脉脉网(https://maimai.cn/)，在搜索框中搜索“CHO”，并切换到“人脉”选项卡，点击姓名，进入详情页，爬取其详细信息

![image-20210701215737588](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210701215737588.png)

### 1.2 爬取的接口分析

```apl
https://maimai.cn/search/contacts?count=20&page=0&query=Cho&dist=0&searchTokens=&highlight=true&jsononly=1&pc=1
```

根据开发者模式下的接口信息可以看到

请求接口：https://maimai.cn/search/contacts

参数为

- count：20 
  - 单次查询条数20条
- page=0
  - 当前页数，第0页
- query=Cho
  - 查询的关键词
- dist=0
- searchTokens=
- highlight=true
  - 是否高亮
- jsononly=1
  - 是否以json格式返回
- pc=1
  - 是否为电脑端数据

### 1.3 接口返回结果分析

该接口的返回结果为

![image-20210701221518719](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210701221518719.png)

```
{
	"result": "ok",
	"data": {
		"contacts": [{
			"uid": "a9f9b8c4-3c9d-46ac-b32e-0a1bfeefc2ea",
			"contact": {
				"id": "a9f9b8c4-3c9d-46ac-b32e-0a1bfeefc2ea",
				"name": "wing",
				"py": "wing",
				"avatar": "https://i9.taou.com/maimai/p/25657/400_42_2jgEOv22b8xMTrtp-a160",
				"line1": "法大大CHO",
				"line3": "法大大CHO(广东)",
				"line4": "IT互联网 | 高管, 影响力: 79",
				"rank": 79,
				"compos": "法大大CHO",
				"loc": "广东",
				"short_compos": "法大大CHO",
				"company": "法大大",
				"career": "法大大CHO",
				"gender": 2,
				"position": "CHO",
				"short_career": "法大大CHO",
				"mmid": "231791658",
				"status": 1,
				"province": "广东",
				"city": "深圳",
				"user_pfmj": {
					"major1": "0104",
					"profession1": "0108",
					"pf_path1": "01,0108",
					"pf_name1": "企业级软件",
					"mj_name1": "CEO/创始人/企业高管",
					"src_type": 3
				},
				
			}
		}],
		"contacts_total": 756,
		"searchTokens": ["cho", "hrvp"],
		"more": 746,
        ...
	},
	"ab_conf": {
	},
	"env": {
	},
	"auth_info": {
	}
}
```

返回结果过多，此处只截取部分关键字段

我们需要的数据

- 用户结果列表：在data->contacts->contact 下
- 搜索的关键词："searchTokens": ["cho", "hrvp"],
  - 这里并不一定只有你搜索的结果

#### 1.3.1 **contact**的数据结构分析

- name: "wing"
  - 用户名为wing
- company: "法大大"
  - 公司名：法大大
- career: "法大大CHO"
  - 职业：法大大CHO
- 





















## 参考文章

[爬取的网站的脉脉网](https://github.com/Joezhangs/PythonSpider/tree/master/Item5%EF%BC%9Aspider_maimai)
