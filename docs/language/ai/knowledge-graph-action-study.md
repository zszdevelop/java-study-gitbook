---
order: 120
category:
  - AI
  - 知识图谱
---

# 图谱实战 - 电影知识图谱的智能问答系统-项目学习笔记

## 0. 原始项目地址

- 原始项目博文：[基于电影知识图谱的智能问答系统](https://blog.csdn.net/appleyk/article/details/80331997)

- 原始项目git:[源码地址](https://github.com/kobeyk/Spring-Boot-Neo4j-Movies.git)

- 带数据的neo4j数据库镜像：https://hub.docker.com/r/appleyk/neo4j-movies
- 带hanlp字典数据及训练样本数据和应用程序的tomcat镜像：https://hub.docker.com/r/appleyk/tomcat8-movies

## 1. 如何体现搜索智能

智能主要体现对问题的归纳分类、**映射到现有问题**中。

>同一个问题的问法千千万，如何映射到我们的问题库中？这就是智能的体现

1. 抽象句子，利用HanPL分词，将关键字进行词性抽象
2. 将抽象的句子与Spark训练集中的模板进行匹配，拿到句子对应的模板
3. 模板还原成句子，此时问题已转换为我们熟悉的操



## 2. Neo4j 和sql语法对比

### 2.0 查询电影的评分

**neo4j**

```sql
match(n:Movie) where n.title = '功夫' return n.rating
```

**sql**

```sql
select movie_rating
from movie
where movie_title = '功夫'
;
```

### 2.1 查询电影上映时间

neo4j

```sql
match(n:Movie) where n.title = '功夫' return n.releasedate
```

sql

```sql
select movie_release_date
from movie
where movie_title = '功夫'
;
```

### 2.2 查询电影的类型/风格

neo4j

```sql
match(n:Movie) - [r:is] ->(g:Genre) where n.title='功夫' return g.name
```

sql

````sql
select g.genre_name
from movie m
left join movie_to_genre mg on m.movie_id = mg.movie_id
left join genre g on mg.genre_id = g.genre_id
where movie_title = '功夫'
;
````

### 2.3 查询电影简介

neo4j

```sql
match(n:Movie) where n.title = '功夫' return n.introduction
```



sql

```sql
select movie_introduction
from movie
where movie_title = '功夫'
```

### 2.4 查询电影有哪些演员出演

neo4j

```sql
match(n:Person) - [r:actedin] ->(m:Movie) where m.title = '功夫' return n.name
```

sql

```sql
select p.person_name,p.person_english_name
from person p
left join person_to_movie ptm on p.person_id = ptm.person_id
left join movie m on m.movie_id = ptm.movie_id
where m.movie_title = '功夫'
;
```

### 2.5 查询演员简介

neo4j

```sql
match(n:Person) where n.name = '周星驰' return n.biography
```



sql

```sql
select person_biography
from person
where person_name = '周星驰'
;
```

### 2.6 某演员出演过的某类型的电影有哪些

neo4j

```sql
match(n:Person)-[r:actedin]->(m:Movie)-[i:is]->(g:Genre) where n.name='周星驰' and g.name='动作'   return distinct m.title
```



sql

```sql
select m.movie_title
from movie m
left join movie_to_genre mg on m.movie_id = mg.movie_id
left join genre g on mg.genre_id = g.genre_id
left join person_to_movie ptm on m.movie_id = ptm.movie_id
left join person p on ptm.person_id = p.person_id
where p.person_name = '周星驰'
and g.genre_name = '动作'
;
```



### 2.7 某演员演了什么电影

**neo4j**

```sql
match (n:Person) - [r:actedin] -> (m:Movie) where n.name='周星驰' return m.title
```



**sql**

```sql
SELECT distinct (m.movie_title)
FROM movie m
         LEFT JOIN person_to_movie pm on m.movie_id = pm.movie_id
left join person p on pm.person_id = p.person_id
where p.person_name = '周星驰';
```



### 2.8 查询某演员参演的大于n评分电影

neo4j

```sql
match(n:Person)-[r:actedin]->(m:Movie) where n.name = '周星驰' and  m.rating>7   return distinct m.title
```

sql

```sql
select m.movie_title,m.movie_rating
from movie m
left join person_to_movie ptm on m.movie_id = ptm.movie_id
left join person p on ptm.person_id = p.person_id
where m.movie_rating>7
and p.person_name = '周星驰'
```

### 2.9 查询某演员参演的小于n评分电影

同上

### 2.10  某演员出演过的类型电影有哪些

neo4j

```sql
match(n:Person)-[r:actedin]->(m:Movie)-[i:is]->(g:Genre) where n.name='周星驰' return distinct g.name
```



sql

```sql
select distinct g.genre_name
from genre g
left join movie_to_genre mtg on g.genre_id = mtg.genre_id
left join person_to_movie ptm on mtg.movie_id = ptm.movie_id
left join person p on ptm.person_id = p.person_id
where person_name= '周星驰'
;
```

### 2.11 演员A和演员B合作了哪些电影

neo4j

TODO 大无语的实现

```java
 /**1 2 3 4 nnt nnr 合作 电影列表 == 演员A和演员B合作的电影有哪些*/
    private String getActorMovies(List<String> reStrings) {
        String name;
        String answer;
        name = reStrings.get(1);
        List<String> actorMoviesA = questionRepository.getActorMovies(name);
        /**如果演员A的电影作品无，那么A和演员B无合作之谈*/
        if (actorMoviesA.size() == 0) {
            answer = null;
            return answer;
        }

        name = reStrings.get(2);
        List<String> actorMoviesB = questionRepository.getActorMovies(name);
        /**如果演员B的电影作品无，那么B和演员A无合作之谈*/
        if (actorMoviesB.size() == 0) {
            answer = null;
            return answer;
        }

        /** A的作品与B的作品求交集*/
        actorMoviesA.retainAll(actorMoviesB);

        if (actorMoviesA.size() == 0) {
            answer = null;
        } else {
            answer = actorMoviesA.toString().replace("[", "").replace("]", "");
        }
        return answer;
    }
```



sql

```sql
select *
from movie
left join person_to_movie ptm on movie.movie_id = ptm.movie_id
left join person p on ptm.person_id = p.person_id
left join person_to_movie ptm1 on movie.movie_id = ptm1.movie_id
left join person p1 on ptm1.person_id = p1.person_id
where p.person_name = '周星驰' and p1.person_name='成龙'
;

```

### 2.12 查询演员演过多少部电影

neo4j

```sql
match(n:Person)-[r:actedin]->(m:Movie) where n.name = '周星驰'  return count(m.title)
```

sql

```sql
select count(1)
from movie
         left join person_to_movie ptm on movie.movie_id = ptm.movie_id
         left join person p on ptm.person_id = p.person_id
where  person_name = '周星驰'
```

### 2.13 演员出生日期

neo4j

```sql
match(n:Person) where n.name = '周星驰' return n.birth
```

sql

```sql
select person_birth_day
from person
where person_name = '周星驰'
;
```

## 



## 参考文章

[大厂技术实现 | 详解知识图谱的构建全流程](https://www.showmeai.tech/article-detail/94)