# Scrapy入门（三）-调试(Debugging)Spiders

## 1. 背景

而Scrapy的爬虫通常是在命令行中启动的，我们怎么去调试呢？

## 2. 调试部署

1. 首先在setting.py同级目录下创建run.py文件。

   ![image-20210311105958418](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311105958418.png)

写入以下代码

```python
# -*- coding: utf-8 -*-

from scrapy import cmdline


name = 'douban_movie_top250'
cmd = 'scrapy crawl {0}'.format(name)
cmdline.execute(cmd.split())

```

其中name参数为spider的name。
接着在spider文件中设置断点。

![image-20210311110405697](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311110405697.png)

返回run.py文件中右键选择Debug。

![image-20210311110423296](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311110423296.png)

最后程序就会在断点处暂停，我们就可以查看相应的内容从而进行调试 。

![image-20210311110438767](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210311110438767.png)

## 参考文章

[Scrapy爬虫框架教程（三）-- 调试(Debugging)Spiders](https://zhuanlan.zhihu.com/p/25200262)
