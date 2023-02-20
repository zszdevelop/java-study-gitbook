# Vue指令v-for之遍历输出JavaScript数组，json对象的几种方式

## 1. 基础准备

1. 定义数据

   ```js
   export default {
       data(){
           return {
               list:["a","b","c","d","e"],
               web:{
                   "百度":"https://www.baidu.com",
                   "搜狐":"https://www.sohu.com",
                   "新浪":"https://www.sina.com",
                   "淘宝":"https://www.taobao.com"
               }
           }
       }
   }
   ```

2. html结构

   ```html
   <div id="test">
           <div>{{ list }}</div>
           <div>{{ web }}</div>
       </div>
   ```

3. 输出结果

   ![image-20201210162547578](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201210162547578.png)

## 2. v-for对 JSON 数组 几种输出方式

### 2.1 只输出value

html 代码

```html
   <div id="test">
        <div v-for = "item in list" :key="index">{{ item }}</div>
    </div>
```

输出结果：

![image-20201210164049745](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201210164049745.png)

### 2.2 输出value值且输出对应的索引值

html代码：

```html

    <div id="test">
        <div v-for = "(item,index) in list" :key="index">{{ item }}的索引值是{{ index }}</div>
    </div>
```

输出结果：

![image-20201210164215652](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201210164215652.png)

## 3. v-for对json格式的几种输出方式

### 3.1 只输出value值

html代码

```html
<div id="test">
        <div v-for = "value in web" :key="index">{{ value }}</div>
    </div>
```

输出结果：

![image-20201210164447098](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201210164447098.png)

### 3.2 输出value值和key值

html 代码

```html
<div id="test">
        <div v-for = "(value,key) in web" :key="index">{{ key }} 的网址是 ： {{ value }}</div>
    </div>
```

输出结果：

![image-20201210164606587](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201210164606587.png)

## 3.输出value值，key值和索引值index

html代码：

```
 <div id="test">
        <div v-for = "(value,key,index) in web" :key="index">{{ index }}__{{ key }} 的网址是 ： {{ value }}</div>
    </div>
```

输出结果：

![image-20201210164817986](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201210164817986.png)

## 4. 总结

- 在数组里面，小括号里面的参数第一位是value值，第二位是索引值

- 在json里面，第一位是value值，第二位是key值，第三位是索引值

## 参考文章

[Vue指令v-for之遍历输出JavaScript数组，json对象的几种方式](https://www.cnblogs.com/mmzuo-798/p/9435215.html)
