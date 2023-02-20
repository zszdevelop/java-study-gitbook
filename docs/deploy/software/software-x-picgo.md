# PicGo + Gitee(码云)实现markdown图床

>2022年3月25日已失效

[Gitee 仓库做图床渡劫失败，寻求解决方案](https://www.v2ex.com/t/842694)

[【吐槽】3.25日Gitee图床突然失效了，全部外链都作废了，大家打算接下来用什么图床？](https://meta.appinn.net/t/topic/31113)

## 1. 背景

我们写博客的时候，总需要插入图片。图片存储在本地传到博客网站上，图片就没办法显示了。放在本地的话，整个博客将会非常大，影响性能。这时候就需要图床

>图床就是一个便于在博文中插入在线图片连接的个人图片仓库。设置图床之后，在自己博客中插入的图片链接就可以随时随地在线预览了，并且不会因为任何意外原因无法查看，除非自己亲自删除。

**PicGo就是为了解决这个问题诞生的，它可以将图片上传到指定的图床上，然后返回markdown链接，直接粘贴到你的文档中**

## 2. 使用

本方案采用PicGo 和gitee 来实现Markdown 图床

1. 安装PicGo

   [picgo官网](https://github.com/Molunerfinn/PicGo)

   - 安装之后打开主界面

     ![image-20210302215814334](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302215814334.png)

   - 选择最底下的插件设置，搜索**gitee**

     ![image-20210302220048598](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302220048598.png)

2. 建立gitee（码云）图传库

   1. ##### 输入一个仓库名称

   2. ##### 其次将仓库设为公开

   3. ##### 勾选使用Readme文件初始化这个仓库

   **这个选项勾上，这样码云会自动给你的仓库建立master分支，这点很重要!!!** 我因为这点折腾了很久，因为使用github做图床picgo好像会自动帮你生成master分支，而picgo里的gitee插件不会帮你自动生成分支。

   ![image-20210302220240165](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302220240165.png)

3. 在gitee生成私人令牌

   ![image-20210302220642408](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302220642408.png)

4. 配置PicGo

   ![image-20210302221134472](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302221134472.png)

5. 测试

   将图片放置上传区，已经能正常上传到gitee中了

   ![image-20210302221336071](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302221336071.png)

## 3. Typora 配置picgo

偏好设置-》图像

![image-20210302221557746](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210302221557746.png)

这样当我们把图片复制到typora的时候，他就会自动上传

## 参考文章

[PicGo + Gitee(码云)实现markdown图床](https://www.jianshu.com/p/b69950a49ae2)

