# 为什么使用Tailwind CSS

## 1. Tailwind CSS 是什么

就是一个CSS框架，和你知道的bootstrap，element ui，Antd，bulma。一样。将一些css样式封装好，用来加速我们开发的一个工具。

## 2 CSS框架的发展

### **2.1 第一阶段：原生写法**

是类似于编程中**面向过程的写法**，**需要什么样式，自己在css中写什么样式**。对代码有洁癖的程序员会进行简单的css复用。但是也只是简单的复用，大多数时候还是需要什么写什么，想怎么写怎么写。

### 2.2 **第二个阶段：CSS组件化**

类似于编程中面向对象的写法，将相同视觉的UI封装成一个组件。比如一个按钮，整个项目中，这个按钮被多次使用，并且样式一致。那么就可以封装成一个按钮类。使用的时候直接使用这个类名称就OK。

> 这也是bootstrap，element ui，Antd，bulma的做法。
>
> 这种框架的优势在于，封装了大量常见的UI。比如你需要一个表单，，需要一个导航，需要一个弹窗，Card卡片。有现成的class。直接拿过来用，就可以快速的完成效果。完全不需要动手写css。
>
> 这也是目前比较流行的方法。这几年几乎很少有项目是自己一点一点手写样式的了，多多少少都会使用到一些css框架

对于一些需要快速交付的项目，非常适合使用这种组件化css框架。

### **2.3第三个阶段，CSS零件化。**

也叫做CSS原子化。和上面第一个阶段第二个阶段都有类似的地方。**依旧是组件，只是每个组件都是一个单一功能的css属性**。

上面第一个阶段的时候，我们讲了有些有对代码有追求的人，会开始复用css。

比如页面中大量的用到 `float:left`。那么就可以封装一个类，比如是这样

```text
.left {float:left}
```

然后需要使用 `float:left`的时候，直接使用` .left`就可以。

#### 2.3.1 以前写法

但是我们自己写css的时候，仅仅是封装一些常用的简单的类，绝大多数的css，都需要动手去写css。比如你要写个宽度12像素。你就得老老实实的去写 `width:12px`，逃避不了，不过估计也没人想过逃避。

#### 2.3.2 Tailwind CSS怎么做

它将所有的css属性全部封装成语义化的类，比如你想要一个`float:left`，它已经帮你封装好了，你直接使用一个`float-left`就可以。

需要一个宽度为12像素，只需要写`w-3`就可以。

#### 2.3.3 示例

举一个完整的例子，你可能需要实现下面这样一个效果：

![image-20220327102115199](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220327102115199.png)



按照我们正常的写法，需要这样写

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

但是使用Tailwind CSS，你只需要这样写就可以

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

极大的减少了代码量。

>这种写法其实并不稀奇，就如同上面第一个阶段所说，我们自己写css的时候，也会做一些类似Tailwind CSS这样的事情，简单的封装一些css属性。
>
>新浪网在十几年前就干过这事，还有ACSS，也是这个原理。只是被大家喷成了筛子。错误的时间做了正确的事情，免不了付出代价，造物弄人。

## 3. 和其他的CSS框架有什么区别？

> 区别在于bootstrap帮你封装好了一些样式，比如卡片，表单，按钮，导航等等。
>
> Tailwind CSS没有封装任何样式，一丝一毫都没有。
>
> bootstrap降低了定制性，你很难依靠bootstrap去定制一个自己的类，虽然bootstrap也有部分原子化的类名，但那只是常用的一些css属性。
>
> Tailwind CSS完全自由，你可以玩出自己的花样，你甚至可以通过Tailwind CSS，打造一套属于自己的类似bootstrap这样的ui框架。

1. bootstrap 帮你封装的是组件的样式，而Tailwind CSS 帮你原子化CSS

## 4. Tailwind CSS有什么优点？

### 4.1 **可定制化程度极高。**

你可以随心所欲写出自己的样式。想怎么折腾怎么折腾。

如果使用bootstrap，你如果想改变一个按钮的样式，就会比较困难。你得用覆盖式的写法，通过自己的样式覆盖掉bootstrap自带的样式。如果框架本身不支持修改，你通过自己的写法去修改框架本身的特性，这是一种很脏的写法。非常别扭。

但是这个问题在Tailwind CSS完全不存在。Tailwind CSS没有自以为是的封装任何样式给你。

### 4.2 **不需要在写css。**

使用Tailwind CSS，基本可以不用再写css。所有的效果都可以通过class名来完成。我用Tailwind CSS写了几个页面，到目前位置，还没有写过一行css

### 4.3 **不需要再为class取个什么名字而苦恼。**

对于经常手写css的程序员来说，最大的噩梦可能就是怎么给class取名了。尤其是在同一个区块里面，区块名称，子元素名称，等等，一个页面动辄几十个几百个类名。非常痛苦。而这其中，真正能复用的class可能就个别几个。

使用Tailwind CSS完全不用为取名字烦恼，因为所有的css属性都被框架语义化封装好了。只需要在class里面引用就好。

### 4.4 响应式设计

Tailwind CSS遵循移动优先的设计模式。断点系统很灵活。也是目前所有css框架里做的最好的。比如你要实现一个媒体查询，根据不同的屏幕宽度实现不同的图片宽度。

按照之前的写法，你可能得这么干

```css
@media only screen and (max-width:1280px) { 
    .img {     
    width:196px; 
    } 
}
@media only screen and (max-width: 760px) { 
    .img {     
    width:128px; 
    } 
}
```

但是在Tailwind CSS，一句话就能搞定：

```html
<img class="w-16 md:w-32 lg:w-48" src="...">
```

### 4.5 **一套专业的UI属性值**

Tailwind CSS虽然没有封装任何UI，但是他默认提供的一些属性值都是很专业的。比如颜色

![image-20220327103207080](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220327103207080.png)

还有各种内边距外边距，宽高，文字大小行高颜色等等。即使你不懂设计，按照他内置的属性做出来的东西，也不会太差。

## 5. **Tailwind CSS和内联样式有什么区别？**

Tailwind CSS是把所有样式写在class里面。内联样式是把所有样式写在style里面，所以会让很多人造成一个印象：Tailwind CSS和内联样式差不多，大同小异。

其实是有很大的区别，Tailwind CSS相比于内联样式，有以下几点特点：

### 5.1 **有约束的设计。**

使用内联样式，每个值都是一个随便填写的数字。使用Tailwind CSS类，你要从预先定义好的设计系统中选择样式，这样你开发出来的页面，视觉上会保持一致，不会乱七八糟。

### 5.2 **响应式设计。**

您不能在内联样式中使用媒体查询，但您可以使用Tailwind的响应式类来轻松开发完全响应式界面。比如你可以在class里写一个`sm:text-left`,代表的是，在小屏幕上，文字居中的方式是居左显示。但是你在内联样式是不可能做到这些的。

### 5.3 **可以直接写鼠标滑过，点击等其他状态的样式。**

比如你可以在class里面写一个`hover:text-white` ,代表的是鼠标滑过的时候，文本是白色。

**其他的很多特点，比如可维护性等等。**

## 6. Tailwind CSS有什么缺点？

### 6.1 **类名很长**

正如Tailwind CSS官网首页的口号一样，从此让你写样式不再离开html页面。Tailwind CSS将HTML与CSS高度解耦，**把本来CSS的一些工作转嫁给了HTML**。好处是使用Tailwind CSS你可以从此不再写css。但坏处是你的**html标签的类名会很长很长**。比如

```html
<a href="#" class="text-sm font-medium bg-purple-600 rounded-full py-4 px-11 text-white inline-block border border-solid shadow hover:text-purple-600 hover:bg-white hover:border-purple-600 transition duration-300" role="button">Start Ticketing</a>
```

虽然Tailwind CSS也支持把很多属性提取成一个组件，但是对于不会再次复用的class。提取组件也没什么必要。

所以类名很多是我目前遇到的不太舒服的问题。

### 6.2 **熟悉使用有成本**

这一点逃避不了，所有的新技术，所有的css框架都有熟悉成本。Tailwind CSS也一样。比如你想做一个圆角，那你得知道Tailwind CSS里面的圆角属性怎么写，边框怎么写，边框样式怎么写等等。你需要不断的去看文档。

所以一开始使用Tailwind CSS，特别是第一个项目，你会用起来比较痛苦。很多不喜欢Tailwind CSS的人可能从第一个项目就会放弃了。

但是只要你用Tailwind CSS做一两个项目，基本明确的告诉你，你以后很难再回到手写css的时候了。大多人都会觉得"很香"。

另外是，Tailwind CSS的作者针对这个问题，开发了一个专门用于vscode的Tailwind CSS代码提示插件。会有效的提高开发效率。

## 7. 要不要对以前的项目用Tailwind CSS进行重构？

大多数情况下不建议，Tailwind CSS的主要优势在于开发效率的提升。如果一个项目你已经开发完成了。就没必要重新使用Tailwind CSS了。

但如果你之前的这个项目，你本来也准备重构了。在犹豫用什么css框架，那你可以试试Tailwind CSS。

另外是，如果一个项目，三天两头的更新迭代前端界面，并且之前的代码写的也不怎么好，那建议使用Tailwind CSS重构。

## 8. 是不是以后可以放弃bootstrap之类的框架了？

不是，主要看你的场景。我个人感想，如果一个项目，需要快速或者简单交付，那没必要用Tailwind CSS。用bootstrap，bulma之类的框架可以让你很快的完成一个项目。不用纠结太深的技术。

**Tailwind CSS更适合于页面定制化高的场景(重点)。**

## 9. 听说Tailwind CSS的文件很大是不是？

是的。因为它需要把所有的css属性全部都封装一遍，所以[css文件](https://www.zhihu.com/search?q=css文件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A1693039814})巨大，3M多。所以不建议在页面内直接引入Tailwind 原生css文件的做法。

 Tailwind CSS官方团队为了解决这个问题，提出了一个方案，在编译的时候引入PurgeCSS 这个工具，构建的时候，会自动删除掉所有你没用到的css。只保留你用到的css。这样最终打包出来的css文件极小极小，一般的项目构建出来的css文件,压缩一下甚至不会超过10K。

## 参考文章

[如何评价CSS框架TailwindCSS？](https://www.zhihu.com/question/337939566/answer/1693039814)