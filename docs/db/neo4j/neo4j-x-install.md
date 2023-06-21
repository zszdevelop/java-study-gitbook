---
order: 910
category:
  - neo4j
---

# Neo4j  - 安装

## 1. 安装

### 1.1 docker-compose安装

```yml
version: '3'

services:
  neo4j:
    image: neo4j:5.9.0-community
    container_name: neo4j
    privileged: true
    restart: always
    #    environment: - NEO4J_AUTH=neo4j/neo4j123
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - "/home/dataexa/aia/neo4j/data:/var/lib/neo4j/data"
      - "/home/dataexa/aia/neo4j/logs:/var/lib/neo4j/logs"

```

### 1.2 启动

```bash
 docker-compose up -d neo4j
```

### 1.3 浏览器访问

可以设置数据库和账户密码

>默认的账户和密码都是neo4j

![image-20230621095847945](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230621095847945.png)

进入后可以修改密码