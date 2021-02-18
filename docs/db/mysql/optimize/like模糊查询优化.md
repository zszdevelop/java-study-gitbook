# like模糊查询优化

## 1. 背景

在使用mysql进行模糊查询的时候，很自容的会用到 like 语句，通常情况下，在数量小的时候，不容易看出查询效率，**但在数据量达到百万级，千万级的时候**，查询的效率就很容易显现出来。这个时候查询的效率就显得很重要！

一般情况下like模糊查询的写法为（field已建立索引）

```
SELECT `column` FROM `table` WHERE `field` like `%keyword%`
```

上面的语句用explain解释来看，SQL语句并未用到索引，而且是全表索引，如果在数据量超大的时候，可想而知最后的效率会是怎么样

## 2. 对照组

```
SELECT `column` FROM `table` WHERE `field` like 'keyword%'; 
```

这样的写法用explain解释看到，SQL语句使用了索引，搜索的效率大大的提高了

但是有的时候，我们再作模糊查询的时候，并非要想查询的关键字都在开头，所以如果不是特别的要求，"ketwork%"并不适合所有的模糊查询

## 3. 解决方案

### 3.1 LOCATE（'substr',str,pos）方法

```
SELECT LOCATE('xbar',`foobar`);   返回0 
SELECT LOCATE('bar',`foobarbar`);  返回4
SELECT LOCATE('bar',`foobarbar`,**5**); 返回7
```

备注：

- 返回substr 的str中第一次出现的问题，如果substr 在str中不存在，返回值为0.
- 如果pos存在，返回substr 在第pos个位置后第一次出现的位置，如果substr中的str中不存在，返回值为0

```
SELECT `column` FROM `table` WHERE LOCATE('keyword', `field`)>0 
```

备注：keyword是要搜索的内容，field为被匹配的字段，查询出所有存在keyword的数据

### 3.2 POSITION('substr' IN `field`)方法

position可以看做是locate的别名，功能跟locate一样

```
SELECT `column` FROM `table` WHERE POSITION('keyword' IN `filed`)
```

### 3.3 INSTR(`str`,'substr')方法

```
SELECT `column` FROM `table` WHERE INSTR(`field`, 'keyword' )>0
```

### 3.4 FIND_IN_SET(str1,str2):

返回str2中str1所在的位置索引，其中str2必须以","分割开。

```
SELECT * FROM `person` WHERE FIND_IN_SET('apply',`name`);
```



## 参考文章

[mysql 优化 - like模糊查询优化](https://yq.aliyun.com/articles/674870)