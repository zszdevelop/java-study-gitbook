# java将word转成pdf之技术选型

## 1. 方案选型

1. poi + itext。先转html再绘制，听说格式有差异。

   比较复杂，格式兼容差，跨平台。

2. 借助openoffice

   openoffice和ms office的格式差异挺大的

3. jacob + ms office

   需要借助本地office，格式兼容最好，最后的备选方案。

4. docx4j的export pdf组件。

   应该用这个比较好（在office开源界，poi第一它应该第二）

5. aspose等其他组件。

## 2.  总结

借助ms office之类的必定只能兼容windows，借助openoffice可以做到跨平台（openoffice有linux版），纯java组件实现绘制的跨平台。



## 参考文章

[java如何实现word转PDF？](https://www.zhihu.com/question/54953944)

[java生成word和pdf的几种方法的优缺点对比](https://blog.csdn.net/qq_36961530/article/details/72628028)