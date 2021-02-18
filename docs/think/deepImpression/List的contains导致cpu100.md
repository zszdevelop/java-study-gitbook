# List的contains导致cpu100%

## 1. 背景

在开发过程中用到了List，随着业务需求的变化，需要去重。当时直接就在代码中判断是否包含 `list.contains("a")` ，包含则不添加

代码大体如下：

```java
    // 获取所有用户
        List<String> allIdnos = getAllIdnos();
        // 匹配的列表
        List<String> matchList = new ArrayList<>();
        for (String idno:allIdnos){
            // ...省略。isMatch 
            // 匹配列表不包含用户id，才添加进匹配列表中
            if ( !matchList.contains(idno)){
                matchList.add(idno);
            } 
        }

```

这代码在本地是没有任何问题的，当部署到生成环境时CPU100%了。

## 2. 问题解析

由于getAllIdnos() 获取到的用户数据量过于庞大，大概80w左右的数据。当这80w每添加一个都要做一便contains 操作的时候，其实他相当于做了一次遍历。时间复杂度是O（n）。那么要查找80w个数据是否包含的话，就需要80w*80w次操作。最终导致CPU100%

## 3. 改进

改用set,set查找某一个元素的复杂度为O（1），此问题顺利解决

```java
   // 获取所有用户
        List<String> allIdnos = getAllIdnos();
        // 匹配的列表
        Set<String> matchSet = new HashSet<>();
        for (String idno:allIdnos){
            if ( !matchSet.contains(idno)){
                matchSet.add(idno);
            }
        }
```



## 4. 总结

写代码的时候要选择合适的数据结构，考虑算法复杂度。在数据量大的时候就差别非常明显了

- ArrayList本质就是通过数组实现的，查找一个元素是否包含要用到遍历，时间复杂度是O（n）

- HashSetHashSet的查找是通过HashMap的KeySet来实现的，判断是否包含某个元素的实现，时间复杂度是O（1）