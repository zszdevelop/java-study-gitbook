# mongoDB删除字段

**MongoDB删除某一个集合中的字段**

```java
db.getCollection('test').update({
    "ziduan": {
        "$exists": true
    }
}, {
    "$unset": {
        "ziduan":null
    }
}, {
    multi: true
});
```

