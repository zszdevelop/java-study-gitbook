# Solr命中关键字高亮不准确

## 1. 简介

solr 在搜索时，明明搜索的是 A词组，但是B 词组也亮了，而且在 分词解析器中，怎么设置都不可能出现这种情况

因涉及一些内部数据，就不放截图了

## 2. 原因分析

经过不断的排查，确定问题的原因是出现多词语搜索的情况

```
a_ik:张 OR  b_s:*张*
```

我们需要过滤多个词，在ik 的时候是直接搜索词，在string下是搜索like 匹配。

solr 默认情况，我们虽然搜索的是不同字段，但**高亮**时他还是会用b的条件带入a用做高亮

我们需要指定

- **hl.requireFieldMatch， 必须字段匹配**

![image-20220418155546278](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220418155546278.png)

## 3. 代码设置

```java
  @Override
    public void addHighlight(AjSearchRequest request, SolrQuery sq, String highlightField) {
        //如果存在高亮字段则高亮显示
        if (StringUtils.isNotEmpty(request.getSearchContentList())) {
            sq.setHighlight(true);
            sq.setHighlightSimplePre(HIGHHIGHT_PRE_PRIX);
            sq.setHighlightSimplePost(HIGHLIGHT_POST_PRIX);
            sq.set("hl.fl", highlightField);
            sq.setHighlightRequireFieldMatch(true);
            sq.setHighlightFragsize(300);
        }
    }
```

