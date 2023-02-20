# flex布局-圣杯布局

[圣杯布局](https://en.wikipedia.org/wiki/Holy_Grail_(web_design))（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。

![img](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071323.png)

HTML代码如下。

 ```markup
 <body class="HolyGrail">
   <header...</header>
   <div class="HolyGrail-body">
     <main class="HolyGrail-content"...</main>
     <nav class="HolyGrail-nav"...</nav>
     <aside class="HolyGrail-ads"...</aside>
   </div>
   <footer...</footer>
 </body
 ```

CSS代码如下。

 ```css
 .HolyGrail {
   display: flex;
   min-height: 100vh;
   flex-direction: column;
 }
 
 header,
 footer {
   flex: 1;
 }
 
 .HolyGrail-body {
   display: flex;
   flex: 1;
 }
 
 .HolyGrail-content {
   flex: 1;
 }
 
 .HolyGrail-nav, .HolyGrail-ads {
   /* 两个边栏的宽度设为12em */
   flex: 0 0 12em;
 }
 
 .HolyGrail-nav {
   /* 导航放到最左边 */
   order: -1;
 }
 ```

如果是小屏幕，躯干的三栏自动变为垂直叠加。

 ```css
 @media (max-width: 768px) {
   .HolyGrail-body {
     flex-direction: column;
     flex: 1;
   }
   .HolyGrail-nav,
   .HolyGrail-ads,
   .HolyGrail-content {
     flex: auto;
   }
 }
 ```

## 参考文章

[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
