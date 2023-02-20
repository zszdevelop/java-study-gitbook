# 使用cloudflare免费加速github page

## 1. 背景

我的博客是挂载在github 的page下，但是github访问实在太慢了，而且因为github 属于一个半墙的状态，所以还有些用户压根访问不了。

尝试过的方案

- 将github 上的内容放在gitee码云上，速度是快了好多，但是竟然不支持自定义域名了！！！只有企业版支持。

![image-20211001220335021](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001220335021.png)

我们用站长工具测试

| Github | Gitee |
| ------ | ----- |
| 2420ms | 561ms |

访问速度真的差了好多。但是不支持域名也是硬伤。一番搜索后找到了cloudflare CDN加速。

实现原理就是在github page 上套一层 cloudflare CDN。不过要注意的是免费版本是有请求次数限制的，每天 10W 次。不过我的博客也没什么人访问

## 2. 使用cloudflare CDN

1. 先通过https://dash.cloudflare.com/sign-up链接进行注册

2. 添加站点，把对应的域名填写进去

   ![image-20211001221040546](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001221040546.png)

3. 选择免费的版本就可以了

   ![image-20211001221140025](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001221140025.png)

4. 提交之后会自动扫描域名对应的解析记录：

![image-20211001221304689](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001221304689.png)

5. 通过域名的运营商修改对应的 NS 记录，这里每个运营商的修改方式都不一样，我这里是用的阿里云的：

   ![image-20211001222009805](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001222009805.png)

   ![image-20211001222114836](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001222114836.png)

   ![image-20211001222042251](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001222042251.png)

6. 验证

   这样就设置完毕了，等一段时间再用命令行验证一下：

   ```
   $ dig isture.com +noall +answer
   > monkeywie.cn.		600	IN	A	104.28.28.212
   > monkeywie.cn.		600	IN	A	172.67.169.202
   > monkeywie.cn.		600	IN	A	104.28.29.212
   ```

   可以看到 dns 解析的 ip 已经变了，已经被 cloudflare 接管了，

7. 然后清除下浏览器 DNS 缓存，chrome 浏览器输入`chrome://net-internals/#dns`进入清除页：

   ![image-20211001222337283](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001222337283.png)

8. 再次访问`https://java.isture.com/`，F12 打开网络面板可以看到已经用上了 CDN 了：

   ![image-20211001222513243](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001222513243.png)

## 3. 结果对比

![image-20211001222756708](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211001222756708.png)



| Github | Gitee |
| ------ | ----- |
| 815ms  | 723ms |

虽然加速后还是不如gitee ，但是成效已经很明显了。而且被墙的问题也不会那么严重了

## 参考文章

[使用cloudflare免费加速github page](https://monkeywie.cn/2020/08/20/fast-github-page-with-cloudflare/)
