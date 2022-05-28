# aspose.word部署linux服务器中文乱码问题

## 1. 简介

aspose.word部署linux服务器字体乱码问题。在本地开发因为本地环境本身就有相关字体文件，而服务器上并没有相关中文字体库。导致出现乱码

> Ps: 本来想截图的，但已经处理好了。不想再改回去了。有机会再补

## 2. 解决

1. 解压[字体.rar]压缩包中的字体

   链接:https://pan.baidu.com/s/17_IRhFZXkbQ7Ee2TeqEaaw  密码:s708

2. 将常用字体文件复制到linux系统的字体文件夹下

   ```
   /usr/share/fonts
   ```

   ![image-20220527093805649](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220527093805649.png)

3. 刷新字体缓存

   ```
   fc-cache -fv
   ```

   