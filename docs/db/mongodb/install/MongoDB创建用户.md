# MongoDB创建用户

## 1. 创建数据库并设置用户

### 1.1 进入docker

```
docker exec -it mongo mongo admin
```

### 1.2 切换到test库（如不存在会自动创建）

```
use test
```

### 1.3 创建test库下的用户

```
db.createUser({ user: 'test', pwd: '123456', roles: [{ role: "readWrite", db: "test" }] });
```

db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'mall-port'}]});