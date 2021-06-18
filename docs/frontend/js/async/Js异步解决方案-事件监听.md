# Js异步解决方案-事件监听（发布订阅模式）（三）

## 1. 简介

解决异步，可以采用事件驱动，任务的执行不取决于代码的顺序，而取决于某个事件是否发生

## 2. JQuery实现事件监听

jquery实现比较简单，因为jq为我们封装好了方法，使用即可，只是JQ不常用了，简单了解下

我们可以使用jquery中的`on`来监听事件，使用`trigger`触发事件，如下

```js
$("body").on("done", fn2)

function fn1() {
  setTimeout(function() {
    $("body").trigger("done")
  }, 2000)
}

function fn2() {
  console.log("fn2执行了")
}
fn1()
```

我们使用jq的`on`监听了一个自定义事件`done`，传入了fn2回调，表示事件触发后立即执行函数fn2

在函数fn1中使用setTimeout模拟了耗时任务，setTimeout回调中使用`trigger`触发了`done`事件

我们可以使用`on`来绑定多个事件，每个事件可以指定多个回调函数

## 3. JavaScript实现事件监听

在JS中我们要自己实现类似JQ的`on`和`trigger`，需要用到设计模式-**发布订阅模式**

### 3.1 简述发布订阅模式（观察者模式）

发布订阅模式(publish-subscribe pattern)，又叫观察者模式(observer pattern)，定义了对象间的一种一对多的依赖关系，**当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知**

其实我们都用过发布订阅模式，比如我们在DOM节点上绑定一个事件函数，就已经使用了

```js
document.body.addEventListener('click', function () {
  console.log(1)
})
```

但是这只是对发布订阅模式最简单的使用，在很多场景下我们经常会实现一些自定义事件来满足我们的需求

比如我们下面要防照JQ那种来写一个自定义事件监听器，需要监听一个事件，在该事件触发时执行其监听回调

### 3.2 发布订阅模式实现事件监听器

发布订阅模式有很多种实现方式，下面我们用`class`来简单实现下

```js
class Emitter {
  constructor() {
    // _listener数组，key为自定义事件名，value为执行回调数组-因为可能有多个
    this._listener = []
  }

  // 订阅 监听事件
  on(type, fn) {
    // 判断_listener数组中是否存在该事件命
    // 存在将回调push到事件名对应的value数组中，不存在直接新增
    this._listener[type] 
      ? this._listener[type].push(fn) 
    	: (this._listener[type] = [fn])
  }

  // 发布 触发事件
  trigger(type, ...rest) {
    // 判断该触发事件是否存在
    if (!this._listener[type]) return
    // 遍历执行该事件回调数组并传递参数
    this._listener[type].forEach(callback => callback(...rest))
  }
}

```

如上所示，我们创建了一个`Emitter`类，并且添加了两个原型方法`on`和`trigger`

使用时

```
// 创建一个emitter实例
const emitter = new Emitter()

emitter.on("done", function(arg1, arg2) {
  console.log(arg1, arg2)
})

emitter.on("done", function(arg1, arg2) {
  console.log(arg2, arg1)
})

function fn1() {
  console.log('我是主程序')
  setTimeout(() => {
    emitter.trigger("done", "异步参数一", "异步参数二")
  }, 1000)
}

fn1()
复制代码
```

如上所示，我们先创建一个emitter实例，接着注册事件，再触发事件，用法和上面JQ雷同，均解决了异步问题

Vue的实现就是一个比较复杂的发布订阅模式，使用Vue的同学，上面的这个事件监听器，把`trigger`名字改成`emit`是不是就眼熟多了

## 4. 事件监听优/缺

### 4.1 优点

 发布订阅模式实现的事件监听，我们可以绑定多个事件，每个事件也可以指定多个回调函数，还是比较符合模块化思想的，我们自写监听器时可以做很多优化从而更好的监控程序运行

### 4.2 缺点

整个程序变成了事件驱动，流程上来说或多或少都会有点影响，每次使用还得注册事件监听再进行触发挺麻烦的，代码也不太优雅，并不是事件驱动不好，毕竟需求只是 **解决异步问题** 而已，何况有更优解

## 参考文章

[「硬核JS」深入了解异步解决方案](https://juejin.cn/post/6844904064614924302#heading-65)

