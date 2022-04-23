# moment时间格式化

## 1. 全局导入方法

1. 安装moment

   ```tex
   npm install moment --save
   ```

2. main.js 引入注册

   ```js
   // 导入时间插件momentjs
   import moment from 'moment'
   
   // 定义时间格式全局过滤器
   Vue.filter('dateFormat', function (daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
     return moment(daraStr).format(pattern)
   })
   ```

3. 模板中使用

   ```vue
   <!-- 显示2019-12-05 10:10 -->
    <div class="time">{{nowDate | dateFormat('YYYY-MM-DD HH:mm')}}</div>
    <!-- 显示10:10 -->
    <div class="time">{{nowDate | dateFormat('HH:mm')}}</div>
    <!-- 显示2019-12-05 10:10:10 -->
    <div class="time">{{nowDate | dateFormat}}</div>
   ```

## 2. 单个组件引入

1. 直接在所需要的组件中引入就可以了

  ```js
  <script>
  let moment = require("moment") // 引入
  export default {
      data() {
          return {
              nowDate:new Date().getTime()// 获取时间戳
          }
      },
      created(){
          // 转换时间格式年月日时分秒
          this.nowDate = moment(this.nowDate).format('YYYY-MM-DD HH:mm')
      }
  }
  </script>
  ```

模板中

  ```vue
  <div class="time">{{nowDate}}</div>
  ```

## 3. 使用

### 3.1 基础使用

1. moment()

   要获取当前的日期和时间， 只需调用不带参数的`moment()` 即可。

   ```js
   var now = moment();
   ```

2. moment(dateStr) 

   - 当从字符串创建 moment 时，需要首先检查字符串是否与已知的 [ISO 8601](http://nodejs.cn/s/eV6MeQ) 格式匹配
   - 如果未找到已知的格式，则在降维到 `new Date(string)` 之前检查字符串是否与 [RFC 2822 日期时间](http://nodejs.cn/s/ETQ1d1)格式匹配。

   ```js
   var day = moment("1995-12-25");
   ```

3. **moment(dateStr,format) 指定格式**

   如果不指定格式，降维到 new Date(string)

   ```js
   this.$moment("20210513150959", "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm')
   ```

4. moment(dateStr,format[]) 多个格式

   如果不知道输入字符串的确切格式，但是知道它可能是多种格式之一，则可以使用格式数组。

   ```js
   moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);
   ```


### 3.2 日期操作

moment.js 使用流式接口，操作如

```
moment().add(7, 'days').subtract(1, 'months').year(2009).hours(0).minutes(0).seconds(0);
```

1. add()

   为现有的 moment 增加时间

   ```
   moment().add(Number, String);
   moment().add(Duration);
   moment().add(Object);
   ```

   如：

   ```javascript
   moment().add(7, 'days');
   ```

   如果对希望简短，也有一些快捷的键。

   ```javascript
   moment().add(7, 'd');
   ```

   | 键           | 快捷键 |
   | :----------- | :----- |
   | years        | y      |
   | quarters     | Q      |
   | months       | M      |
   | weeks        | w      |
   | days         | d      |
   | hours        | h      |
   | minutes      | m      |
   | seconds      | s      |
   | milliseconds | ms     |

2. ### subtract()

   ```js
   moment().subtract(Number, String);
   moment().subtract(Duration);
   moment().subtract(Object);
   ```

   通过减去时间来改变原始的 moment。

​	[更多使用参考官方文档](http://momentjs.cn/docs/)

### 3.3 获取本月/年最后一天

获取某年某月的最后一天

```
moment(日期).endOf('month').format("YYYY-MM-DD")//日期可以是 年月的格式 也可以是年月日的格式
```

moment.js获取某年的最后一天

```
oment(日期).endOf('year').format("YYYY-MM-DD")//日期可以是年的格式 或者 年月的格式 也可以是年月日的格式
```



## 参考文章

[官方文档](http://momentjs.cn/docs/)

[vue+moment.js使用](https://segmentfault.com/a/1190000021200938)

[moment.js 获取某年某月的最后一天 以及 获取某年最后一天](https://blog.csdn.net/qq_37899792/article/details/89914476)