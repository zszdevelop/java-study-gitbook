# Redis从海量数据里查询某一固定前缀的key

## 1. 简介

主要有两种方法

- keys pattern：查找所有符合给定模式pattern
- Scan：Scan cursor [match pattern] [COUNT count]

## 2.批量生成redis测试数据方法

[参考文章-批量生成redis测试数据方法](../action/批量生成redis测试数据方法)

## 3. 查询某一固定前缀的key

### 3.1 方案一：keys pattern

keys pattern：查找所有符合给定模式pattern

缺点：使用keys 会对上线业务有影响

- keys 指定一次性返回所有匹配的key
- 键的数量过大会使服务卡顿

#### 3.1.1 实战

1. 查看当前redis数据库的数据量

   ```
   dbsize
   ```

   ![image-20210410112532695](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410112532695.png)

2. 匹配测试

   ```
    keys k1*
   ```

   ![image-20210410112503140](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410112503140.png)
   
   我们可以看到需要花费85才查询完

### 3.2 使用 Scan 

#### 3.2.1 语法

```
scan cursor [match pattern] [COUNT count]
```

#### 3.2.2 scan 介绍

- 基于游标的迭代器，需要基于上一次的游标延续之前的迭代过程
- 以0作为游标开始一次新的迭代，直到命令返回游标0完成一次遍历
- 不保证每次执行都返回某个给定数量的元素，支持模糊查询
- 一次返回的数量不可控，只能是大概率符合count 参数

#### 3.2.3 实战示例

我们使用scan查询

![image-20210410112658763](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410112658763.png)

我们返回的第一个是游标，第二个是结果。结果并不一定满足count

我们通过游标继续查找

![image-20210410112902489](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410112902489.png)

#### 3.2.4 tips

- 游标的大小不是固定的，非递增或递减
- count 指定返回数据量不是一定的，只是大体符合
- scan命令获取到的key 有可能重复，可以利用java的set去重

#### 3.2.5 rmd客户端也使用scan

![image-20210410104006086](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210410104006086.png)

## 4. 总结

从海量的key里面查询出某一固定前缀的key的时候

1. 要注意数据量
2. 在使用keys命令的时候会一次性返回所有的keys会造成卡顿
3. 使用scan命令的时候要注意去重和获取上一次的游标

## 参考文章

[redis从海量的key里面查询出某一固定前缀的key](https://www.jianshu.com/p/19f813af8f64)