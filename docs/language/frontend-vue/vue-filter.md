# Vue过滤器

## 1. 简介

### 1.1 作用

Vue 过滤器用于一些常见的文本格式化

### 1.2 在哪用

- 双花括号插值

  ```html
  <!-- 在双花括号中 -->
  {{ message | capitalize }}
  ```

- `v-bind` 表达式

  ```html
  <!-- 在 `v-bind` 中 -->
  <div v-bind:id="rawId | formatId"></div>
  ```

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

## 2. 定义过滤器

### 2.1 组件中定义本地过滤器

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

### 2.2 创建Vue 实例之前全局定义过滤器

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

当全局过滤器和局部过滤器重名时，会采用局部过滤器。

## 3. 过滤器参数原则

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。

### 3.1 简单情况 

在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数。

### 3.2 过滤器串联情况

```
{{ message | filterA | filterB }}
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

### 3.3 多个参数情况

过滤器是 JavaScript 函数，因此可以接收参数：

```
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

## 4. 补充

- 如果在element 的table 中，需要格式化数据也可以使用:formatter 达到文本格式化效果

  ```vue
   <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
  ```

  ```js
    // 岗位状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
  ```


## 5. 使用全局的过滤器

```
let dateStr = this.$options.filters["dateFormat"](new Date(), "YYYYMMDDHHmmss");
```



## 参考文章

[官方文档](https://cn.vuejs.org/v2/guide/filters.html)