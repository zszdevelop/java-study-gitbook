# flex布局-流式布局实例

每行的项目数固定，会自动分行。

![img](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071330.png)

CSS的写法。

 ```css
 .parent {
   width: 200px;
   height: 150px;
   background-color: black;
   display: flex;
   flex-flow: row wrap;
   align-content: flex-start;
 }
 
 .child {
   box-sizing: border-box;
   background-color: white;
   flex: 0 0 25%;
   height: 50px;
   border: 1px solid red;
 }
 ```

- flex-flow ：控制列排列，并且允许它换行
- flex： 不拉伸，不压缩，默认宽度占25%
- box-sizing：去除padding 和border 因素

html的写法

```html
    <div class="parent">
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
        </div>
```

## 参考文章

[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
