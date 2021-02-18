# mongoDB索引

## 1. 常用操作

```js
//创建索引,值1表示正序排序，-1表示倒序排序
　　db.userinfos.createIndex({age:-1})

//查看userinfos中的所有索引
　　db.userinfos.getIndexes()

//删除特定一个索引
　　db.userinfos.dropIndex({name:1,age:-1})
//删除所有的索引(主键索引_id不会被删除)
　　db.userinfos.dropIndexes()

```

## 参考文章

[快速掌握mongoDB(三)——mongoDB的索引详解](https://www.cnblogs.com/wyy1234/p/11032163.html)