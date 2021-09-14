# Vue中watch监听对象内属性的方法

## 1. 背景

我们有个场景，需要监听表单中任意一个属性变化，再将变化通过vuex 传递给其他组件使用。因为实时性要求高，且字段多。并不想每个字段变化后去触发事件。

- 需求：

  我们watch监听对象内的属性变化

- 问题

  现在我们正常的写法，只能监听对象的变化，对象内的属性变化并不会被监听到

- 案例

  ```
  new Vue({
    data: {
      count: 10，
      blog:{
          title:'my-blog',
          categories:[]
      }
    },
    watch: {
      count: function (newval, oldVal) {
        console.log(`new: %s, old: %s`, newVal, oldVal);
      }
    }
  })
  ```

  上述情况里`data`中的`count`属性可以直接监听，但是如果需要监听的数据是对象内的某一属性值的变化，直接`watch`对象`blog`是检测不到变化的，这是因为`blog`这个对象的指向并没有发生改变。

## 2. 解决方法

### 2.1 方案一：深度检测

```sh
new Vue({
  data: {
    count: 10，
    blog:{
        title:'my-blog',
        categories:[]
    }
  },
  watch: {
    blog:{
        handler(newVal,oldVal){
            console.log(`new: ${newVal}, old: ${oldVal}`);
        },
        deep:true
    }
  }
})
```

里面的`deep`设为了`true`，这样的话，如果修改了这个`blog`中的任何一个属性，都会执行`handler`这个方法。

> 不过这样会造成更多的性能开销，尤其是对象里面属性过多，结构嵌套过深的时候。而且有时候我们就只想关心这个对象中的某个特定属性

我们也可以监听某一个属性

### 2.2 用字符串来表示对象的属性调用

```javascript
new Vue({
  data: {
    count: 10，
    blog:{
        title:'my-blog',
        categories:[]
    }
  },
  watch: {
    'blog.categories'(newVal, oldVal) {
        console.log(`new:${newVal}, old:${oldVal}`);
    }, 
  }
})
```

### 2.3 使用`computed`计算属性

```javascript
new Vue({
  data: {
    count: 10，
    blog:{
        title:'my-blog',
        categories:[]
    }
  },
  computed: {
    categories() {
      return this.blog.categories;
    }
  },
  watch: {
    categories(newVal, oldVal) {
      console.log(`new:${newVal}, old:${oldVal}`);
    }, 
  },
})
```

## 参考文章

[Vue中watch对象内属性的方法](https://segmentfault.com/a/1190000018080301)
