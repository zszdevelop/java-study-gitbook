# Vuex

## 1.  是什么？

官方文档介绍如下

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。		

Vue提供的状态管理工具，用于统一管理我们项目中各种数据的交互和重用，存储我们需要用到数据对象。

简而言之：全局状态管理工具，共享变量						

## 2. 为什么需要？

官网举了一个例子，多个组件共享状态面临的问题

- 多个视图依赖于同一状态

  传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力

- 来自不同视图的行为需要变更同一状态

  我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

所以我们可以把**共享状态抽取出来，以一个全局单例模式管理**

>在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

## 3. 如何引入Vuex?

1. 下载`vuex`: `npm install vuex --save`
2. 在`main.js`添加:

```javascript
import Vuex from 'vuex'

Vue.use( Vuex );

const store = new Vuex.Store({
    //待添加
})

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
```

## 4. 核心概念

![image-20210525190735823](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210525190735823.png)

### 4.1 State

`state`就是Vuex中的**公共的状态**

> 可以将`state`看作是所有组件的`data`, 用于保存所有组件的公共数据.

```js
const store = new Vuex.Store({
  state:{ 
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  }
})
```

### 4.2 Getters

`getters`属性理解为所有组件的`computed`属性, 也就是**计算属性**

>getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

```js
//main.js
const store = new Vuex.Store({
  state:{
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  },
  getters:{ //添加getters
    saleProducts: (state) => {
      let saleProducts = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return saleProducts;
    }
  } 
})
```

### 4.3 **Mutations**

`mutaions`理解为`store`中的**methods**

> `mutations`对象中保存着更改数据的回调函数,该函数名官方规定叫`type`, 第一个参数是`state`, 第二参数是`payload`, 也就是自定义的参数.

```js
//main.js
const store = new Vuex.Store({
  state:{
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  },
  getters:{
    saleProducts: (state) => {
      let saleProducts = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return saleProducts;
    }
  },
  mutations:{ //添加mutations
    minusPrice (state, payload ) {
      let newPrice = state.products.forEach( product => {
        product.price -= payload
      })
    }
  }
})
```

点击触发

**注意:调用mutaions中回调函数, 只能使用store.commit(type, payload)**

```javascript
//ProductListTwo.vue
export default {
    data () {
        return {
            products: this.$store.state.products
        }
    },
    methods: {
        minusPrice() {
            this.$store.commit('minusPrice', 2); //提交`minusPrice,payload为2
        }
    }
}
```

### 4.4 Actions

`actions` 类似于 `mutations`，不同在于：

- `actions`提交的是`mutations`而不是直接变更状态
- `actions`中可以包含异步操作, `mutations`中绝对不允许出现异步
- `actions`中的回调函数的第一个参数是`context`, 是一个与`store`实例具有相同属性和方法的对象

```java
//main.js
const store = new Vuex.Store({
  state:{
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  },
  getters:{
    saleProducts: (state) => {
      let saleProducts = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return saleProducts;
    }
  },
  mutations:{
    minusPrice (state, payload ) {
      let newPrice = state.products.forEach( product => {
        product.price -= payload
      })
    }
  },
  actions:{ //添加actions
    minusPriceAsync( context, payload ) {
      setTimeout( () => {
        context.commit( 'minusPrice', payload ); //context提交
      }, 2000)
    }
  }
})
```

点击触发

```js
export default {
    data () {
        return {
            products: this.$store.state.products
        }
    },
    methods: {
        minusPrice() {
            this.$store.commit('minusPrice', 2);
        },
        minusPriceAsync() {
            this.$store.dispatch('minusPriceAsync', 5); //分发actions中的minusPriceAsync这个异步函数
        }
    }
}
```

### 4.5 Modules

> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

## 参考文章

[Vue.js——十分钟入门Vuex](https://www.jianshu.com/p/a804606ad8e9)

[Vuex官方文档](https://vuex.vuejs.org/zh/)

