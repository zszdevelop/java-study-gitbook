# MongoTemplate使用Cursor处理大数量的数据

## 1. 背景

对于数据量巨大的情况下，使用mongoTemplate.find()方法返回一个列表，对服务器压力非常大

>在我的项目中数据量140w，我多线程分页批量查询。执行没多长时间就会导致mongo服务器奔溃。使用cursor则没有这个问题

mongoTemplate提供了另外一种方法，使用游标逐个获取数据，同时可以指定只获取哪些域，而不是全部获取回来。

## 2. 案例

### 2.1 案例1

将Query 转为Document，而Document 又实现了Bson .所以大部分情况我们Query还是可以用的

```java
//组装查询条件
Query query=new Query();
query.with(Sort.by(new Sort.Order(Sort.Direction.ASC, "_id")));

try (MongoCursor<Document> cursor =
     //指定查询集合
     mongoTemplate.getCollection("xxx[表名]")
     //组装查询条件
     .find(query.getQueryObject())
     //组装排序方式（非必须，可不设置）
     .sort(query.getSortObject())
     //设置游标查询不超时
     .noCursorTimeout(true)
     //设置批量从数据库中获取的数据量
     .batchSize(1000)
     .cursor()) {
    Document doc;
    //Map map;
    while (cursor.hasNext()) {
        //写法1（建议）
        doc = cursor.next();
        System.out.println(doc.get("xxx[属性名]"));
        //写法2（不建议）
        //map=cursor.next();
        //System.out.println(map.get("xxx[属性名]"));
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

### 2.2 案例2

```java
	DBObject query = new BasicDBObject(); //setup the query criteria 设置查询条件
	query.put("method", method);
	query.put("ctime", (new BasicDBObject("$gte", bTime)).append("$lt", eTime));
 
	logger.debug("query: {}", query);
 
	DBObject fields = new BasicDBObject(); //only get the needed fields. 设置需要获取哪些域
	fields.put("_id", 0);
	fields.put("uId", 1);
	fields.put("ctime", 1);
 
	DBCursor dbCursor = mongoTemplate.getCollection("collectionName").find(query, fields);
 
	while (dbCursor.hasNext()){
		DBObject object = dbCursor.next();
		logger.debug("object: {}", object);
		//do something.
	}
```

### 2.3 案例3

```java
MongoClient mongoClient = new MongoClient( "172.26.xxx.xxx" , 27017 );
MongoDatabase mongoDatabase =mongoClient.getDatabase("xxxx");
MongoCollection<Document> collection = mongoDatabase.getCollection("test_logs");
//加入查询条件
BasicDBObject query = new BasicDBObject();
//时间区间查询 记住如果想根据这种形式进行时间的区间查询 ，存储的时候 记得把字段存成字符串，就按yyyy-MM-dd HH:mm:ss 格式来
query.put("times", new BasicDBObject("$gte", "2018-06-02 12:20:00").append("$lte","2018-07-04 10:02:46"));
//模糊查询
Pattern pattern = Pattern.compile("^.*王.*$", Pattern.CASE_INSENSITIVE);
query.put("userName", pattern);
//精确查询
query.put("id", "11");
//skip 是分页查询，从第0条开始查10条数据。 Sorts是排序用的。有descending 和ascending
MongoCursor<Document> cursor = collection.find(query).sort(Sorts.orderBy(Sorts.descending("times"))).skip(0).limit(10).iterator();//
int unm=0;
try {
     while (cursor.hasNext()) {
          UserBehaviorLogs userBehaviorLogs = new UserBehaviorLogs();
          //查询出的结果转换成jsonObject,然后进行封装或者直接返回给前端处理。我这是封装成对象了
          JSONObject jsonObject = JSONObject.parseObject( cursor.next().toJson().toString());
          userBehaviorLogs.setId(jsonObject.getString("id"));//id
          userBehaviorLogs.setUserId(jsonObject.getString("userId"));//用户id
          userBehaviorLogs.setUserName(jsonObject.getString("userName"));//用户名称
          userBehaviorLogs.setParams(jsonObject.getString("params"));//参数
          userBehaviorLogs.setException(jsonObject.getString("Exception"));//异常信息
          userBehaviorLogs.setTimes(jsonObject.getString("times")+"");//创建时间
          unm++;               System.out.println(unm+"="+userBehaviorLogs.getTimes()+"==="+userBehaviorLogs.getId());
    }
} catch (Exception e) {
    e.printStackTrace();
} finally {
    cursor.close();
}
```

## 3. 说明

### 3.1 **设置游标查询不超时**

```java
noCursorTimeout(true)
```

**必须设置**此属性，防止数据库连接超时，导致的游标连接`自动关闭`。

### 3.2 **设置批量从数据库中获取的数据量**

```java
batchSize(1000)
```

建议根据`实际业务情况`而设置，设置此批次属性，游标的迭代器进行查询时，会`根据需要`，去数据库获取`指定批量`的数据，`缓存`起来供迭代器使用，而不是每次next()`获取数据的时候`，均去查询数据库，`减少数据库查询次数`，提高了效率。

## 参考文章

[mongoTemplate使用游标查询海量数据](https://www.jianshu.com/p/f6d7a3b571c2)

[MongoTemplate使用Cursor处理大数量的数据](https://blog.csdn.net/ClementAD/article/details/55210973)

[Java中mongodb使用MongoCollection和BasicDBObject条件查询](https://blog.csdn.net/jisuanjiguoba/article/details/106274571)