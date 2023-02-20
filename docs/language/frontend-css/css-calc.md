# calc()函数

## 1. 简介

CSS3 的 calc() 函数允许我们在属性值中执行数学操作。例如，我们可以使用 calc() 指定一个元素宽的固定像素值为多个数值的和。

```css
.foo {
  width: calc(100px + 50px);
}
```

## 2. 为什么使用 calc()

### 2.1 CSS 预处理器 是如何处理的

使用 CSS 预处理器，比如 SASS的情况

```scss
.foo {
    width: 100px + 50px;
}

$width-one: 100px;
$width-two: 50px;
.bar {
    width: $width-one + $width-two;
}
```

### 2.2 calc() 函数 优势一：可以混合计算绝对单位

`calc()` 函数能够组合不同的单元。特别是，**我们可以混合计算绝对单位（比如百分比与视口单元）与相对单位（比如像素）**。例如，我们可以创造一个表达式，用一个百分比减掉一个像素值。

```css
.foo {
    width: calc(100% - 50px);
}
```

本例中，`.foo` 元素总是小于它父元素宽度 50px。

### 2.3 函数 优势二：更清晰

使用 `calc()`，计算值是表达式它自己，而非表达式的结果。当使用 CSS 预处理器做数学运算时，给定值为表达式的结果。

```css
.foo {
    width: 100px + 50px;
}

.foo {
    width: 150px;
}
```

然而，浏览器解析的 calc() 的值为真实的 calc() 表达式。

```css
.foo {
    width: calc(100% - 50px);
}

.foo {
    width: calc(100% - 50px);
}
```

这意味着浏览器中的值可以更加灵活，能够响应视口的改变。我们能够给元素设定一个高度为视口的高度减去一个绝对值，它将随视口的改变进行调节。

## 3. 使用 calc()

calc() 函数可以用来对数值属性执行四则运算。比如，`<length>`，`<frequency>`，`<angle>`，`<time>`，`<number>` 或者 `<integer>` 数据类型。

这里有一些示例：

```css
.foo {
    width: calc(50vmax + 3rem);
    padding: calc(1vw + 1em);
    transform: rotate( calc(1turn + 28deg) );
    background: hsl(100, calc(3 * 20%), 40%);
    font-size: calc(50vw / 3);
}
```

## 4. clac() 嵌套

calc() 函数可以嵌套。在函数里边，会被视为简单的括号表达式，如下例所示。

```css
.foo {
    width: calc( 100% / calc(100px * 2) );
}
```

函数的计算值如下所示：

```css
.foo {
    width: calc( 100% / (100px * 2) );
}
```

## 5. 什么场景使用 calc()

### 5.1 Example 1 - 居中元素

使用 calc() 给我们提供另一个垂直居中元素的解决方案。如果我们知道元素的尺寸，一个典型的解决方案是使用负外边距移动自身距离高与宽的一半，如下所示：

```css
.foo {
    position: absolute
    top: 50%;
    left: 50%;
    marging-top: -150px;
    margin-left: -150px;
}
```

使用 calc() 函数，我们仅仅通过 top 与 left 属性便能实现相同的效果：

```css
.foo {
    position: absolute
    top: calc(50% - 150px);
    left: calc(50% - 150px);
}
```

Flexbox 的介入，已经很少需要这种方法了。不过，一些情况下 Flexbox 不能被使用。比如，元素需要绝对定位或者固定定位，这种方法是有用的。

### 5.2 Example 2 - 创建根栅格尺寸

使用 rem，`calc()` 函数能够用来创建一个基于视口的栅格。我们可以设置根元素的字体大小为视口宽度的一部分。

```css
html {  
    font-size: calc(100vw / 30);
}
```

现在，1rem 为视口宽度的 1/30。在页面上的任何文本，将会根据你的视口自动缩放。更进一步，相同比例的视口总会显示相同的文本数量，不管视口的真实尺寸是多少。

如果我们对非文本使用 rem 设置大小，它们同样遵守这个行为。一个 1rem 宽度的元素总是视口元素宽度的 1/30。

### 5.3 Example 3 - 清晰度

最后，`calc()`使计算更加清晰。如果你使一组项目为它们父元素容器宽度的 1/6，你可能这么写：

```css
.foo {
    width: 16.666666667%;
}
```

然而，它能够更加清晰并具有可读性：

```css
.foo {
    width: calc(100% / 6);
}
```

使用 `calc()`，我们还能做更多的事情，比如创建一个栅格系统。它是 CSS 最有用的新特性之一。



## 参考文章

[浅谈CSS calc()函数的用法](https://segmentfault.com/a/1190000019392639)