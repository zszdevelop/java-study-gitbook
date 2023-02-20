# Vue自定义防抖指令

## 1. 背景

项目中经常会遇到说，一个按钮因为网络IO等问题，可能还在请求过程中，用户连续点击。导致重复发送请求。

这种情况下我们使用防抖/节流就能很好的解决，实现得方案有很多，但是自定义指令的方式是最简单的。后面有需要使用防抖的地方只要使用改指令即可。

## 2. 原始情况

```html
<button @click="sayHello">提交</button>
```

```js
sayHello() {
    console.log('Hello!')
}
```

当我们连续点击多次，控制台会输出多次 Hello!

## 3. 我想达到的效果：

```html
<button v-throttle=“200” @click="sayHello">提交</button>
```

通过此设置，可以让提交按钮在200ms内的多次点击只能执行一次，并且刚点击时就执行。若不设置时间（200），则默认2000ms内只执行一次。

## 4. 防抖 / 节流的区别和选择

### 4.1 解释

- 节流

  指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数。 

- 防抖

  指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

### 4.2 区别

在我看来它们的差别在于应用场景，举例如下：

【应用场景】：分别在时间段0.2s,0.4s,0.6s,0.8s进行连续点击，触发searchAPI。

【防抖后的效果】：0.8s后才真正进行searchAPI的发送；

【节流的效果】：0.2s时发现有人点击，立即触发searchAPI接口，并且在x秒内，用户点击无效。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f58e1a53d1a476db7dbea470ad29b57~tplv-k3u1fbpfcp-watermark.awebp)

### 4.3 如何选择

我这边需要在用户刚点击的时候就立即响应，后面几秒钟的点击无效，是节流的效果，所以选择节流。

## 5. 如何创建自定义指令

### 5.1 选择合适的钩子函数

自定义指令的钩子函数：bind，inserted，update，componentUpdated，unbind

我选用bind，只需要一次性的初始化就够了。

### 5.2 钩子函数参数

el：可直接操作DOM(例如， `el.addEventListener` , `el.onclick` )。

binding：可通过value获得指令绑定值。

### 5.3 思考：如何在不妨碍原本click事件的情况下，添加监听click事件

> onclick事件的处理程序在有多个的情况下，后者会覆盖前者。addEventListener给一个事件注册多个listener，不会出现覆盖的情况。

当然是使用`addEventListener`（*IE浏览器要用 `attachEvent` ，然而我的项目中只需要支持chrome即可，就不考虑啦*）

## 6. 实现

### 6.1 定义防抖指令：

```js
Vue.directive('throttle', {
  bind: (el, binding) => {
    let throttleTime = binding.value; // 防抖时间
    if (!throttleTime) { // 用户若不设置防抖时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
```

### 6.2 使用指令：

```html
<button @click="sayHello" v-throttle>提交</button>
```

```js

sayHello() {
    console.log('Hello!')
}
```

## 参考文章

[【实战】Vue自定义防抖指令](https://juejin.cn/post/6844903944653651981)

