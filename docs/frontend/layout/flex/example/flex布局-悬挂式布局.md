# flex布局-悬挂式布局

有时，主栏的左侧或右侧，需要添加一个图片栏。

![img](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071325.png)

HTML代码如下。

 ```markup
 <div class="Media">
   <img class="Media-figure" src="" alt="">
   <p class="Media-body"...</p>
 </div>
 ```

CSS代码如下。

 ```css
 .Media {
   display: flex;
   align-items: flex-start;
 }
 
 .Media-figure {
   margin-right: 1em;
 }
 
 .Media-body {
   flex: 1;
 }
 ```
