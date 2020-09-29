# LIKE等通配符过滤

通配符是用来匹配值的一部分的特殊字段

通配符只能用于文本字段（字符串）。非文本数据类型字段不能使用通配符

## 1. LIKE 操作符

### 1.1 百分号（%）通配符

最常使用的通配符%，%表示任意字符串出现任意次数

```
#找出所有fish 开头的产品
SELECT prod_id,prod_name 
FROM products
WHERE prod_name LIKE 'fish%'
```

通配符可以在任意位置使用，并且可以使用多个通配符

```
SELECT prod_id,pro_name
FROM products
WHERE prod_name LIKE '%bean bag%'
```

注：WHERE prod_name LIKE '%'不会匹配产品名称为NULL 的行

### 1.2 下划线（_）通配符

'_'通配符只能匹配单个字符，而不是多个字符

```
SELECT prod_id,prod_name
FROM products
WHERE prod_name LIKE '__ inch teddy'
```

## 2. 使用通配符技巧

使用通配符很有用，但也要付出代价的，既通配符搜索要耗费更长的处理时间

- 不要过度使用通配符，如果其他操作符能达到相同目的，应该使用其他操作符
- 在确定使用通配符时，也尽量不要把通配符写在开始处，**开始处搜索起来是最慢的**
- 