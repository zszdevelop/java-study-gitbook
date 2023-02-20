---
order: 70
category:
  - mongodb



---

# Mongo入门 - 基本使用：Java API

> 本文为低优先级，只是向你介绍下MongoDB提供的原生的JavaAPI；而大多数公司使用Spring框架，会使用Spring Data对MongoDB原生API的封装，比如JPA，MongoTemplate等。

## 1. MongoDB Driver

```xml
<!-- https://mvnrepository.com/artifact/org.mongodb/mongo-java-driver -->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongo-java-driver</artifactId>
    <version>3.12.6</version>
</dependency>
```

## 2. 代码测试

例子请参考 [mongo-java-driver](http://mongodb.github.io/mongo-java-driver/3.12/driver/getting-started/quick-start/)

```java
private static final String MONGO_HOST = "xxx.xxx.xxx.xxx";

    private static final Integer MONGO_PORT = 27017;

    private static final String MONGO_DB = "testdb";


    public static void main(String args[]) {
        try {
            // 连接到 mongodb 服务
            MongoClient mongoClient = new MongoClient(MONGO_HOST, MONGO_PORT);

            // 连接到数据库
            MongoDatabase mongoDatabase = mongoClient.getDatabase(MONGO_DB);
            System.out.println("Connect to database successfully");

            // 创建Collection
            mongoDatabase.createCollection("test");
            System.out.println("create collection");

            // 获取collection
            MongoCollection<Document> collection = mongoDatabase.getCollection("test");

            // 插入document
            Document doc = new Document("name", "MongoDB")
                    .append("type", "database")
                    .append("count", 1)
                    .append("info", new Document("x", 203).append("y", 102));
            collection.insertOne(doc);

            // 统计count
            System.out.println(collection.countDocuments());

            // query - first
            Document myDoc = collection.find().first();
            System.out.println(myDoc.toJson());

            // query - loop all
            MongoCursor<Document> cursor = collection.find().iterator();
            try {
                while (cursor.hasNext()) {
                    System.out.println(cursor.next().toJson());
                }
            } finally {
                cursor.close();
            }

        } catch (Exception e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
    }
```

## 参考文章

[Mongo入门 - 基本使用：Java API](https://pdai.tech/md/db/nosql-mongo/mongo-x-usage-4.html)