# CSS属性box-sizing

## 1. 问题原理简介


CSS的盒子模型(box model)，它控制着页面各元素的宽与高，盒子模型多少会让人产生一些困惑，尤其当涉及到高度和宽度计算的时候。**真正盒子的宽度(在页面呈现出来的宽度)和高度，需要加上一些其它的属性**，例如：

- `padding` + `border` + `width`= 盒子的宽度
- `padding`+ `border` + `height` = 盒子的高度

这看起来并不是那么直观，那么我们看一个图：

![image-20200828153545384](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/img01.png)

我们要设置这样一个宽200px的盒子的时候，还需要去计算border和padding 实现太麻烦了，如何解决呢？我们可以设置box-sizing 的属性值为**border-box**

## 2. box-sizing的设定值

- content-box：预设值，实际宽高＝所设定的数值＋border＋padding

- **border-box**：实际宽高＝所设定的数值(已包含border和padding)
