# Solr搜索特殊字符转义

## 1. 简介

在Solr检索中，下列字符有特殊含义，需 转义处理，否则查询会报查询错误。

```diff
+ – && || ! ( ) { } [ ] ^ ” ~ * ? : \ 
```

而我们的查询条件中，包含上述特性字符。

## 2. 解决方案

Solr 官方提供的转义

```java
ClientUtils.escapeQueryChars("solr search+ – && || ! ( ) { } [ ] ^ ” ~ * ? :")
```

### 2.1 转义源码

solr 工具类特性字符转义源码：

```java
https://svn.apache.org/repos/asf/lucene/dev/trunk/solr/solrj/src/java/org/apache/solr/client/solrj/util/ClientUtils.java
 
public static String escapeQueryChars(String s) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      // These characters are part of the query syntax and must be escaped
      if (c == '\\' || c == '+' || c == '-' || c == '!'  || c == '(' || c == ')' || c == ':'
        || c == '^' || c == '[' || c == ']' || c == '\"' || c == '{' || c == '}' || c == '~'
        || c == '*' || c == '?' || c == '|' || c == '&'  || c == ';' || c == '/'
        || Character.isWhitespace(c)) {
        sb.append('\\');
      }
      sb.append(c);
    }
    return sb.toString();
  }
```

## 参考文章

[Solr 特殊字符处理](https://blog.csdn.net/zhouzhiwengang/article/details/111028381)