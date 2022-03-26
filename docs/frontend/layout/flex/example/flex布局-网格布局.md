# flex布局-网格布局

1. 基本网格布局

最简单的网格布局，就是平均分布。在容器里面平均分配空间，跟上面的骰子布局很像，但是需要设置项目的自动缩放。

![img](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071321.png)

HTML代码如下。

 ```markup
 <div class="Grid"
   <div class="Grid-cell">...</div>
   <div class="Grid-cell">...</div>
   <div class="Grid-cell">...</div>
 </div>
 ```

CSS代码如下。

 ```css
 .Grid {
   display: flex;
 }
 
 .Grid-cell {
   flex: 1;
 }
 ```

##  2. 百分比布局

某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。

![img](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071322.png)

HTML代码如下。

 ```markup
 <div class="Grid">
   <div class="Grid-cell u-1of4">...</div>
   <div class="Grid-cell">...</div>
   <div class="Grid-cell u-1of3">...</div>
 </div>
 ```

 ```css
 .Grid {
   display: flex;
 }
 
 .Grid-cell {
   flex: 1;
 }
 
 .Grid-cell.u-full {
   flex: 0 0 100%;
 }
 
 .Grid-cell.u-1of2 {
   flex: 0 0 50%;
 }
 
 .Grid-cell.u-1of3 {
   flex: 0 0 33.3333%;
 }
 
 .Grid-cell.u-1of4 {
   flex: 0 0 25%;
 }
 ```

## 参考文章

[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
