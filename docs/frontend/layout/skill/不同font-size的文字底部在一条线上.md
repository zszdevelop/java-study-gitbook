# 不同font-size的文字底部在一条线上

## 1. 背景

有个需求是前端需要展示￥158.8，为了凸显金额，所以158.8 的字体要大，￥的字体要小。原本挺简单的需求，却被我玩坏了

### 1.1 问题原因

虽然只是展示两个文字，但我在选择布局的时候。却选择了flex+div的形式。导致我陷在里面一直无法实现此功能。哪怕是设置为底部对齐和baseline

- align-items: flex-end  

  - 没有一个能对齐的

    ![image-20220403233950269](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220403233950269.png)

- align-items: baseline;

  - 符号和数字对齐了,中文还差点意思

    ![image-20220403235103157](/Users/zsz/Library/Application Support/typora-user-images/image-20220403235103157.png)



**现在感觉自己啥东西都想套flex布局，这就是一个典型的反面教材**

## 2. 解决

### 2.1 基础方案1：

去掉外围的flex 布局，默认就是底部对齐的，当然中文还有点问题

>适用于那些没有中文等，特殊情况的

![image-20220403234509741](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220403234509741.png)

### 2.2 方案2：手工计算

需要支持中文，你需要强制对不同大小的字体设定不同的行高。

```html
<div class="a inline">
  <div class="b">哈哈</div>
  <span class="b">嘎嘎</span>
  <b class="b">呱呱</b>
  <div class="b e1">haha</div>
  <span class="b e2">gaga</span>
  <b class="b e3">guagua</b>
</div>
```

```css
.a {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid lightblue;
  margin: 40px auto;
}
.inline .b {
  display: inline;
  vertical-align: bottom;
}
.a div {
  font-size: 20px;
  line-height: 20px;
}
.a span {
  font-size: 40px;
  line-height: 37px;
}
.a b {
  line-height: 15px;
}
.b.e1 {
  line-height: 16px;
}
.b.e2 {
  line-height: 46px;  
}
.b.e3 {
  line-height: 18px;
}
```

最终效果如下：

![clipboard.png](https://segmentfault.com/img/bV2Nvn?w=592&h=120)

### 2.3 方案3：自动计算

如果不想手工调整，而想自动计算的话，代码如下：

```html
<div class="a inline">
  <div class="b c1">哈哈</div>
  <div class="b c2">嘎嘎</div>
  <div class="b c3">呱呱</div>
  <div class="b e1">haha</div>
  <div class="b e2">gaga</div>
  <div class="b e3">guagua</div>
</div>
```

```stylus
.a {
  border-bottom: 1px solid lightblue;
}
.inline .b {
  display: inline;
  vertical-align: bottom;
  line-height: 1;
}
.a .c1 {
  font-size: 40px;
}
.a .c2 {
  font-size: 80px;
}
.a .c3 {
  font-size: 20px;
}
.a .e1 {
  font-size: 40px;
}
.a .e2 {
  font-size: 80px;
}
.a .e3 {
  font-size: 20px;
}
```

效果也还可以，英文的出入比较大，中文略有差距：

![image-20220403235355217](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220403235355217.png)

## 参考文章

[视觉上如何让不同 font-size 的文字底部在一条线上？](https://segmentfault.com/q/1010000012994498)