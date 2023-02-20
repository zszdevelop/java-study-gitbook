# Oracle截取字符串substr、查找字符串位置instr、替换字符串replace

## 1. 截取字符串：substr

### 1.1 substr 函数介绍

```
substr(str1,str2,str3)
```

- str1为目标字符串
- str2是将要输出的子串的**起点**
- str3是将要输出的子串的**长度**    

### 1.2 示例

```
例子：
substr('ABCDEFG', 2, 3)   =   'BCD'    
substr('ABCDEFG',   -2)   =   'FG'  --如果第二个参数为负数，那么将会从源串的尾部开始向前定位至负数的绝对值的位置
substr('ABCDEFG',   -4)   =   'DEFG
```

## 2. **查找字符串位置：instr**

### 2.1 instr 函数介绍如下：

```sql
instr( strSource,str , startPos, appearance  )
```

- strSource :源字符串
- str    :要查找的字符串.
- startPos  :**从哪个位置开始查找，默认为1。参数为正，从左到右开始检索，参数为负，从右到左检索。**
- appearance :代表要查找第几次出现的str,默认为 1,不能为负。

### 2.2 示例

```
例子：
instr('ABCDABCDAEF', 'AB');   -- 返回结果是：1，因为instr字符串索引从1开始，所以是1不是0
instr('ABCDABCDAEF', 'DA', 1, 2);   -- 返回结果是：8，返回第二次出现'DA'的位置
instr('A BCDABCDAEF', 'DA', 1, 2)；  -- 返回结果是：9，由于我在元字符串中加了一个空格，空格仍然算一个字符
```

## 3. **替换字符串：replace**

### 3.1 replace函数介绍

replace(str1, str2, str3)
其表示的意思是：在str1中查找str2，凡是出现str2的地方，都替换成str3。

### 3.2 示例

replace('ABCDEFG', 'CDE', 'cde');  -- 返回结果是：ABcdeFG
replace('ABCDEFG', 'CDE', '');   -- 返回结果是：ABFG，CDE被替换成空字符
replace('ABCDEFG', 'CDE');   -- 返回结果是：ABFG，当不存在第三个参数时，CDE直接被删掉------据此可以确定某个字符串在字符中出现的次数

## 4. **replace扩展：**

确定某个字符串在字符中出现的次数。
例子：

```java
select a.* from tb_duty a where length(a.col)-length(replace(a.col, ',', ''))=n(n为出现的次数)
```

## 参考文章

[Oracle截取字符串substr、查找字符串位置instr、替换字符串replace](https://blog.csdn.net/big1989wmf/article/details/70144624)

[ORACLE 查找某个字符最后一次出现的位置](http://www.myexceptions.net/h/1369083.html)