# 布局垂直居中

## 1.  实现方式

### 1.1 方式一：不知道父子高度

不知道自己高度和父容器高度的情况下, 利用绝对定位只需要以下三行：

```css
parentElement{
        position:relative;
    }

 childElement{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

 }
```

### 1.2 方式二：父高度知道，子只有一个元素

若父容器下只有一个元素，且父元素设置了高度，则只需要使用相对定位即可

```css
    parentElement{
        height:xxx;
    }

    .childElement {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
```



### 1.3 方式三：Flex 布局：

不考虑兼容老式浏览器的话，用Flex布局简单直观一劳永逸：

```css
parentElement{
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
}
```



## 参考文章

[https://www.zhihu.com/question/20543196](用 CSS 实现元素垂直居中，有哪些好的方案？)

