# spring-data-mongodb文档基础操作

## 1. Spring Data Mongodb 

### 1.1 简介

Spring Data Mongodb是Spring提供的一种以Spring Data风格来操作数据存储的方式，它可以避免编写大量的样板代码。

### 1.2 常用注解

- @Document:标示映射到Mongodb文档上的领域对象
- @Id:标示某个域为ID域
- @Indexed:标示某个字段为Mongodb的索引字段

### 1.3 Spring Data 方式的数据操作

**继承MongoRepository接口可以获得常用的数据操作方法**

![image-20201015161513489](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015161513489.png)

IDEA查看的快捷键：

MAC [Command + F12]
WIN [Ctrl + F12]

#### 1.3.1 使用衍生查询

> 在接口中直接指定查询方法名称便可查询，**无需进行实现**，以下为根据会员id按时间倒序获取浏览记录的例子。

```java
package com.zszdevelop.mongodemo.repository;


import com.zszdevelop.mongodemo.document.MemberReadHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * 会员商品浏览历史Repository
 */
public interface MemberReadHistoryRepository extends MongoRepository<MemberReadHistory,String> {

    /**
     * 根据会员id按时间倒序获取浏览记录
     * @param memberId 会员id
     */
    List<MemberReadHistory> findByMemberIdOrderByCreateTimeDesc(Long memberId);


}
```

> 在IDEA中直接会提示对应的字段

![image-20201015162632877](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015162632877.png)



##### 1.3.2 使用@Query注解可以用Mongodb的JSON查询语句进行查询

```java
@Query("{ 'memberId' : ?0 }")
List<MemberReadHistory> findByMemberId(Long memberId);
```

## 2. 整合Mongodb实现文档操作

### 2.1 添加相关依赖

```xml
<!---mongodb相关依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

### 2.2 修改SpringBoot配置文件

> 修改application.yml文件，在spring:data节点下添加Mongodb相关配置。

```yml
spring:
  data:
    mongodb:
      host: 127.0.0.1 # mongodb的连接地址
      port: 27017 # mongodb的连接端口号
      database: mytest # mongodb的连接的数据库
```

### 2.3 添加会员浏览记录文档对象MemberReadHistory

> 文档对象的ID域添加@Id注解，需要检索的字段添加@Indexed注解。

```java
package com.zszdevelop.mongodemo.document;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * 用户商品浏览历史记录
 */
@Document
public class MemberReadHistory {
    @Id
    private String id;
    @Indexed
    private Long memberId;
    private String memberNickname;
    private String memberIcon;
    @Indexed
    private Long productId;
    private String productName;
    private String productPic;
    private String productSubTitle;
    private String productPrice;
    private Date createTime;

    //省略了所有getter和setter方法

}
```

### 2.4 添加MemberReadHistoryRepository接口用于操作Mongodb

> 继承MongoRepository接口，这样就拥有了一些基本的Mongodb数据操作方法，同时定义了一个衍生查询方法。

```java
package com.zszdevelop.mongodemo.repository;


import com.zszdevelop.mongodemo.document.MemberReadHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * 会员商品浏览历史Repository
 */
public interface MemberReadHistoryRepository extends MongoRepository<MemberReadHistory,String> {

    /**
     * 根据会员id按时间倒序获取浏览记录
     * @param memberId 会员id
     */
    List<MemberReadHistory> findByMemberIdOrderByCreateTimeDesc(Long memberId);


}
```

### 2.5 添加MemberReadHistoryService接口

```java
package com.zszdevelop.mongodemo.service;


import com.zszdevelop.mongodemo.document.MemberReadHistory;

import java.util.List;

/**
 * 会员浏览记录管理Service
 */
public interface MemberReadHistoryService {
    /**
     * 生成浏览记录
     */
    int create(MemberReadHistory memberReadHistory);

    /**
     * 批量删除浏览记录
     */
    int delete(List<String> ids);

    /**
     * 获取用户浏览历史记录
     */
    List<MemberReadHistory> list(Long memberId);
}
```

### 2.6 添加MemberReadHistoryService接口实现类MemberReadHistoryServiceImpl

```java
package com.zszdevelop.mongodemo.service.impl;

import com.zszdevelop.mongodemo.document.MemberReadHistory;
import com.zszdevelop.mongodemo.repository.MemberReadHistoryRepository;
import com.zszdevelop.mongodemo.service.MemberReadHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 会员浏览记录管理Service实现类
 */
@Service
public class MemberReadHistoryServiceImpl implements MemberReadHistoryService {
    @Autowired
    private MemberReadHistoryRepository memberReadHistoryRepository;
    @Override
    public int create(MemberReadHistory memberReadHistory) {
        memberReadHistory.setId(null);
        memberReadHistory.setCreateTime(new Date());
        memberReadHistoryRepository.save(memberReadHistory);
        return 1;
    }

    @Override
    public int delete(List<String> ids) {
        List<MemberReadHistory> deleteList = new ArrayList<>();
        for(String id:ids){
            MemberReadHistory memberReadHistory = new MemberReadHistory();
            memberReadHistory.setId(id);
            deleteList.add(memberReadHistory);
        }
        memberReadHistoryRepository.deleteAll(deleteList);
        return ids.size();
    }

    @Override
    public List<MemberReadHistory> list(Long memberId) {
        return memberReadHistoryRepository.findByMemberIdOrderByCreateTimeDesc(memberId);
    }
}
```

### 2.7 添加MemberReadHistoryController定义接口

```java
package com.zszdevelop.mongodemo.controller;

import com.zszdevelop.mongodemo.common.CommonResult;
import com.zszdevelop.mongodemo.document.MemberReadHistory;
import com.zszdevelop.mongodemo.service.MemberReadHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 会员商品浏览记录管理Controller
 */
@Controller
@RequestMapping("/member/readHistory")
public class MemberReadHistoryController {
    @Autowired
    private MemberReadHistoryService memberReadHistoryService;

    //创建浏览记录
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult create( ) {
        MemberReadHistory memberReadHistory = new MemberReadHistory();
        memberReadHistory.setMemberId(11L);
        memberReadHistory.setMemberNickname("昵称");
        memberReadHistory.setMemberIcon("头像");
        memberReadHistory.setProductId(22L);
        memberReadHistory.setProductName("产品名称");
        int count = memberReadHistoryService.create(memberReadHistory);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    //删除浏览记录
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult delete(@RequestParam("ids") List<String> ids) {
        int count = memberReadHistoryService.delete(ids);
        if (count > 0) {
            return CommonResult.success(count);
        } else {
            return CommonResult.failed();
        }
    }

    // 展示浏览记录
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<MemberReadHistory>> list(Long memberId) {
        List<MemberReadHistory> memberReadHistoryList = memberReadHistoryService.list(memberId);
        return CommonResult.success(memberReadHistoryList);
    }
}
```

## 3 接口测试

### 3.1 添加商品浏览记录到mongodb

访问： http://localhost:8010/member/readHistory/create

![image-20201015163918672](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015163918672.png)



### 3.2 查询Mongodb中的商品浏览记录

http://localhost:8010/member/readHistory/list?memberId=11

![image-20201015164032869](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201015164032869.png)

### 3.3 删除指定id的商品浏览记录

http://localhost:8010/member/readHistory/delete?ids=5f880a57950dd42fac5fb6e6

## 参考文章

[mall整合Mongodb实现文档操作](http://www.macrozheng.com/#/architect/mall_arch_08?id=mall整合mongodb实现文档操作)
