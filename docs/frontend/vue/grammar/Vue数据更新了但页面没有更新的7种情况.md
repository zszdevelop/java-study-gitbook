# Vue数据更新了但页面没有更新的7种情况

## 1.简介

vue双向绑定是非常好用的一个特性，但是有些情况数据更新了，但是页面却没有更新。这时候总让人摸不着头脑，以下便总结遇到此种情况的7种原因

## 2.没有更新的7种原因

### 2.1 Vue 无法检测实例被创建时不存在于 `data` 中的 property

> 原因：由于 Vue 会在初始化实例时对 property 执行 `getter/setter` 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。

场景：

```javascript
var vm = new Vue({
  data:{},
  // 页面不会变化
  template: '<div>{{message}}</div>'
})
vm.message = 'Hello!' // `vm.message` 不是响应式的
```

解决办法：

```javascript
var vm = new Vue({
  data: {
    // 声明 a、b 为一个空值字符串
    message: '',
  },
  template: '<div>{{ message }}</div>'
})
vm.message = 'Hello!'
```

### 2.2 Vue 无法检测对象 property 的添加或移除

> 原因：官方 - 由于 JavaScript（ES5） 的限制，Vue.js **不能检测到对象属性的添加或删除**。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 `data` 对象上才能让 Vue.js 转换它，才能让它是响应的。

场景：

```javascript
var vm = new Vue({
  data:{
    obj: {
      id: 001
    }
  },
  // 页面不会变化
  template: '<div>{{ obj.message }}</div>'
})

vm.obj.message = 'hello' // 不是响应式的
delete vm.obj.id       // 不是响应式的
```

解决办法：

```javascript
// 动态添加 - Vue.set
Vue.set(vm.obj, propertyName, newValue)

// 动态添加 - vm.$set
vm.$set(vm.obj, propertyName, newValue)

// 动态添加多个
// 代替 Object.assign(this.obj, { a: 1, b: 2 })
this.obj = Object.assign({}, this.obj, { a: 1, b: 2 })

// 动态移除 - Vue.delete
Vue.delete(vm.obj, propertyName)

// 动态移除 - vm.$delete
vm.$delete(vm.obj, propertyName)
```

### 2.3 Vue 不能检测通过数组索引直接修改一个数组项

> 原因：官方 - 由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化；尤雨溪 - 性能代价和获得用户体验不成正比。

场景：

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
```

解决办法：

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// vm.$set
vm.$set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

#### 2.3.1 拓展：Object.defineProperty() 可以监测数组的变化

> Object.defineProperty() 可以监测数组的变化。但对数组新增一个属性（index）不会监测到数据变化，因为无法监测到新增数组的下标（index），删除一个属性（index）也是。

场景：

```javascript
var arr = [1, 2, 3, 4]
arr.forEach(function(item, index) {
    Object.defineProperty(arr, index, {
    set: function(value) {
      console.log('触发 setter')
      item = value
    },
    get: function() {
      console.log('触发 getter')
      return item
    }
  })
})
arr[1] = '123'  // 触发 setter
arr[1]          // 触发 getter 返回值为 "123"
arr[5] = 5      // 不会触发 setter 和 getter
```

### 2.4 Vue 不能监测直接修改数组长度的变化

> 原因：官方 - 由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化；尤雨溪 - 性能代价和获得用户体验不成正比。

场景：

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items.length = 2 // 不是响应性的
```

解决办法：

```javascript
vm.items.splice(newLength)
```

### 2.5 在异步更新执行之前操作 DOM 数据不会变化

> 原因：Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

场景：

```xml
<div id="example">{{message}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
vm.$el.style.color = 'red' // 页面没有变化
```

解决办法：

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
//使用 Vue.nextTick(callback) callback 将在 DOM 更新完成后被调用
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
  vm.$el.style.color = 'red' // 文字颜色变成红色
})
```

#### 2.5.1 拓展：异步更新带来的数据响应的误解

```xml
<!-- 页面显示：我更新啦！ -->
<div id="example">{{message.text}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: {},
  }
})
vm.$nextTick(function () {
  this.message = {}
  this.message.text = '我更新啦！'
})
```

上段代码中，我们在 `data` 对象中声明了一个 `message` 空对象，然后在下次 DOM 更新循环结束之后触发的异步回调中，执行了如下两段代码：

```javascript
this.message = {};
this.message.text = '我更新啦！'
```

到这里，模版更新了，页面最后会显示 `我更新啦！`。

**模板更新了，应该具有响应式特性，如果这么想那么你就已经走入了误区。**

一开始我们在 `data` 对象中只是声明了一个 `message` 空对象，并不具有 `text` 属性，所以该 `text` 属性是不具有响应式特性的。

**但模板切切实实已经更新了，这又是怎么回事呢？**

那是因为 Vue.js 的 DOM 更新是异步的，即当 `setter` 操作发生后，指令并不会立马更新，指令的更新操作会有一个延迟，当指令更新真正执行的时候，此时 `text` 属性已经赋值，所以指令更新模板时得到的是新值。

> 模板中每个指令/数据绑定都有一个对应的 **watcher** 对象，在计算过程中它把属性记录为依赖。之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM。

![image-20210804215220396](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210804215220396.png)

具体流程如下所示：

- 执行 `this.message = {};` 时， `setter` 被调用。
- Vue.js 追踪到 `message` 依赖的 `setter` 被调用后，会触发 `watcher` 重新计算。
- `this.message.text = '我更新啦！';` 对 `text` 属性进行赋值。
- 异步回调逻辑执行结束之后，就会导致它的关联指令更新 DOM，指令更新开始执行。

所以真正的触发模版更新的操作是 `this.message = {};`这一句引起的，因为触发了 `setter`，所以单看上述例子，具有响应式特性的数据只有 `message` 这一层，它的动态添加的属性是不具备的。

> 对应上述第二点 - Vue 无法检测对象 property 的添加或移除

### 2.6 循环嵌套层级太深，视图不更新？

未测试不做过多简绍

### 2.7 路由参数变化时，页面不更新（数据不更新）

拓展一个因为路由参数变化，而导致页面不更新的问题，页面不更新本质上就是数据没有更新。

> 原因：路由视图组件**引用了相同组件**时，当路由参会变化时，会导致该组件无法更新，也就是我们常说中的页面无法更新的问题。

场景：

```xml
<div id="app">
  <ul>
    <li><router-link to="/home/foo">To Foo</router-link></li>    
    <li><router-link to="/home/baz">To Baz</router-link></li>    
    <li><router-link to="/home/bar">To Bar</router-link></li>    
  </ul>    
  <router-view></router-view>
</div>
const Home = {
  template: `<div>{{message}}</div>`,
  data() {
    return {
      message: this.$route.params.name
    }
  }
}

const router = new VueRouter({
  mode:'history',
    routes: [
    {path: '/home', component: Home },
    {path: '/home/:name', component: Home }
  ]
})

new Vue({
  el: '#app',
  router
})
```

上段代码中，我们在路由构建选项 `routes` 中配置了一个动态路由 `'/home/:name'`，它们共用一个路由组件 `Home`，这代表他们复用 `RouterView` 。

当进行路由切换时，页面只会渲染第一次路由匹配到的参数，之后再进行路由切换时，`message` 是没有变化的。

解决办法：

> 解决的办法有很多种，这里只列举我常用到几种方法。

1. 通过 `watch` 监听 `$route` 的变化。

   ```javascript
   const Home = {
     template: `<div>{{message}}</div>`,
     data() {
       return {
         message: this.$route.params.name
       }
     },
     watch: {
          '$route': function() {
          this.message = this.$route.params.name
       }
       }
   }
   ...
   new Vue({
     el: '#app',
     router
   })
   ```

2. 给 `<router-view>` 绑定 `key` 属性，这样 Vue 就会认为这是不同的 `<router-view>`。

   > 弊端：如果从 `/home` 跳转到 `/user` 等其他路由下，我们是不用担心组件更新问题的，所以这个时候 `key` 属性是多余的。

   ```javascript
   <div id="app">
     ...
     <router-view :key="key"></router-view>
   </div>
   ```

## 参考文章

[Vue 数据更新了但页面没有更新的 7 种情况汇总及延伸总结](https://segmentfault.com/a/1190000022772025)

