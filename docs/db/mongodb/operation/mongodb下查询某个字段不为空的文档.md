# mongodb下查询某个字段不为空的文档

#### 1. $ne

$ne：表示not equals 就是不等于的意思

```javascript
# 查询某字段不为空的数据
db.hfijf.find({fieldName: {$ne:null}})
# 查询字段等于空的数据
db.hfijf.find({fieldName: {$eq:null}})
```

#### 2. $exists

$exists：表示是否存在。值为false表示不存在，值为true表示存在

```javascript
# 查询某字段不为空的数据
db.fdafdsa.find({fieldName:{$exists:true}})
# /查询某字段不存在的数据
db.fdafdsa.find({fieldName:{$exists:false}})
```

## 参考文章

[mongodb下查询某个字段不为空的文档](https://blog.csdn.net/qq_39935047/article/details/107450151)