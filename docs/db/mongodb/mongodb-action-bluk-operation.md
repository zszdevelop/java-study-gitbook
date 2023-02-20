# SpringMongoTemplate批量操作

## 1. 简介

MongoTemplate 作为 Spring 对 [MongoDB](https://so.csdn.net/so/search?q=MongoDB&spm=1001.2101.3001.7020) 提供的操作类，支持数据的批量操作。本文将介绍使用 MongoTemplate 实现批量插入和批量更新的功能。

## 2. 批量插入

### 2.1 方式一：mongoTemplate.insert

```java
/**
     * 批量新增博客
     *
     * @param addBatchParam
     * @return
     */
    @Override
    public ApiResult addBatch(BlogAddBatchParam addBatchParam) {
        List<BlogEntity> blogEntityList = addBatchParam.getBlogList().stream().map(blogAddParam -> {
            BlogEntity blogEntity = new BlogEntity();
            BeanUtil.copyProperties(blogAddParam, blogEntity);
            return blogEntity;
        }).collect(Collectors.toList());
        mongoTemplate.insert(blogEntityList, BlogEntity.class);
        return ApiResult.success();
    }
```

### 2.2 方式二：bulkOps

```java
BulkOperations operations = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, collectionName);
operations.insert(insertDataList);
BulkWriteResult result = operations.execute();
```



## 3. 批量更新

### 3.1 方式一：bulkOps

```java
 /**
     * 批量更新博客
     *
     * @param updateBatchParam
     * @return
     */
    @Override
    public ApiResult updateBatch(BlogUpdateBatchParam updateBatchParam) {
        List<BlogEntity> blogEntityList = updateBatchParam.getBlogList().stream().map(blogUpdateParam -> {
            BlogEntity blogEntity = new BlogEntity();
            BeanUtil.copyProperties(blogUpdateParam, blogEntity);
            return blogEntity;
        }).collect(Collectors.toList());
        BulkOperations operations = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, BlogEntity.class);
        for (BlogEntity blogEntity : blogEntityList) {
            Update update = Update.update("id", blogEntity.getId())
                    .set("title", blogEntity.getTitle())
                    .set("content", blogEntity.getContent())
                    .set("author", blogEntity.getAuthor())
                    .set("countRead", blogEntity.getCountRead())
                    .set("countLike", blogEntity.getCountLike())
                    .set("clientTimestamp", blogEntity.getClientTimestamp());
            operations.updateOne(Query.query(Criteria.where("id").is(blogEntity.getId())), update);
        }
        operations.execute();
        return ApiResult.success();
    }
```

批量更新的操作稍微复杂一点，需要针对每个更新的属性进行赋值。

## 4. 批量插入或更新

```java
List dataList = new ArrayList<>()；
List<Pair<Query, Update>> updateList = new ArrayList<>(dataList.size());
BulkOperations operations = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, collectionName);
dataList.forEach(data -> {undefined
Query query = new Query(new
Criteria(field1).is(value1)).addCriteria(new Criteria(field2).is(value2));
Update update = new Update();
for (int index = 0; index < dataList.size(); index++) {undefined
String key = data.getKey();
String value = data.getValue();
　　update.set(key, value);
}
Pair<Query, Update> updatePair = Pair.of(query, update);
updateList.add(updatePair);
});
operations.upsert(updateList);
BulkWriteResult result = operations.execute();
```



## 参考文章

[Springboot 2.X MongoTemplate 实现批量插入以及批量更新](https://blog.csdn.net/Mrqiang9001/article/details/121352249)

[MongoTemplate批量操作](https://blog.csdn.net/weixin_42554772/article/details/122437425)