# Spring Data JPA 实现多表关联查询

多表查询在spring data jpa中有两种实现方式，第一种是利用hibernate的级联查询来实现，第二种是创建一个结果集的接口来接收连表查询后的结果，这里介绍第二种方式。

## 1. 方式1：新建接收多表查询结果集的实体类（比较实用一对一映射） 

新建接收多表查询结果集的实体类（比较实用一对一映射） ，例如

实体 UserInfo ：用户。

实体 Address：家庭住址。

这里通过外键的方式(一个实体通过外键关联到另一个实体的主键)来实现一对一关联。

### 1.1 实体类

1. 实体类 UserInfo.java

   ```java
   package com.johnfnash.learn.domain;
   
   import java.io.Serializable;
   
   import javax.persistence.Entity;
   import javax.persistence.GeneratedValue;
   import javax.persistence.GenerationType;
   import javax.persistence.Id;
   import javax.persistence.Table;
   
   @Entity
   @Table(name="tb_user")
   public class UserInfo implements Serializable {
     private static final long serialVersionUID = 8283950216116626180L;
   
     @Id
     @GeneratedValue(strategy=GenerationType.IDENTITY)
     private Long userId;
     private String name;
     private int age;
     private String sex;
     private String email;
   
     // 与 Address 的关联  
     private Long addressId;
   
     public UserInfo() {
       super();
     }
   
     public UserInfo(String name, int age, String sex, String email, Long addressId) {
       super();
       this.name = name;
       this.age = age;
       this.sex = sex;
       this.email = email;
       this.addressId = addressId;
     }
   
     // getter, setter
   
     @Override
     public String toString() {
       return String.format("UserInfo [userId=%d, name=%s, age=%s, sex=%s, email=%s]", userId, name, age, sex, email);
     }
   
   }
   ```

2. 实体类 Address.java

   ```java
   package com.johnfnash.learn.domain;
   
   import javax.persistence.Entity;
   import javax.persistence.GeneratedValue;
   import javax.persistence.GenerationType;
   import javax.persistence.Id;
   import javax.persistence.Table;
   
   @Entity
   @Table(name = "tb_address")
   public class Address {
   
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long addressId;
     private String areaCode;
     private String country;
     private String province;
     private String city;
     private String area;
     private String detailAddress;
   
     public Address() {
       super();
     }
   
     public Address(String areaCode, String country, String province, String city, String area,
         String detailAddress) {
       super();
       this.areaCode = areaCode;
       this.country = country;
       this.province = province;
       this.city = city;
       this.area = area;
       this.detailAddress = detailAddress;
     }
   
     // getter, setter
   
     @Override
     public String toString() {
       return "Address [addressId=" + addressId + ", areaCode=" + areaCode + ", country=" + country + ", province="
           + province + ", city=" + city + ", area=" + area + ", detailAddress=" + detailAddress + "]";
     }
   
   }
   
   ```
   
   

### 1.2 DAO层

1. UserInfoRepository.java

   ```java
   package com.johnfnash.learn.repository;
   
   import java.util.List;
   
   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.data.jpa.repository.Query;
   
   import com.johnfnash.learn.domain.UserInfo;
   import com.johnfnash.learn.domain.ViewInfo;
   
   public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
   
     @Query(value = "SELECT new com.johnfnash.learn.domain.ViewInfo(u, a) FROM UserInfo u, Address a WHERE u.addressId = a.addressId")
     public List<ViewInfo> findViewInfo();
   
   }
   ```

   注：这里的 ViewInfo 类用来一个用来接收多表查询结果集的类（使用 new + 完整类名构造函数）
   代码如下：

   ```java
   package com.johnfnash.learn.domain;
   
   import java.io.Serializable;
   
   public class ViewInfo implements Serializable {
   
     private static final long serialVersionUID = -6347911007178390219L;
   
     private UserInfo userInfo;
     private Address address;
   
     public ViewInfo() {
   
     }
   
     public ViewInfo(UserInfo userInfo) {
       Address address = new Address();
       this.userInfo = userInfo;
       this.address = address;
     }
   
     public ViewInfo(Address address) {
       UserInfo userInfo = new UserInfo();
       this.userInfo = userInfo;
       this.address = address;
     }
   
     public ViewInfo(UserInfo userInfo, Address address) {
       this.userInfo = userInfo;
       this.address = address;
     }
   
     // getter, setter
   
   }
   ```

2. AddressRepository.java

   ```
   package com.johnfnash.learn.repository;
   
   import org.springframework.data.jpa.repository.JpaRepository;
   
   import com.johnfnash.learn.domain.Address;
   
   public interface AddressRepository extends JpaRepository<Address, Long> {
   
   }
   
   ```

### 1.3 测试

```java
package com.johnfnash.learn;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.johnfnash.learn.domain.Address;
import com.johnfnash.learn.domain.UserInfo;
import com.johnfnash.learn.domain.ViewInfo;
import com.johnfnash.learn.repository.AddressRepository;
import com.johnfnash.learn.repository.UserInfoRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserInfoRepositoryTests {

  @Autowired
    private UserInfoRepository userInfoRepository;

  @Autowired
  private AddressRepository addressRepository;

  @Before
    public void init() {
        Address addr1 = new Address("027","CN","HuBei", "WuHan","WuChang", "123 street");
        Address addr2 = new Address("023","CN","ChongQing", "ChongQing","YuBei", "123 road");
        addressRepository.save(addr1);
        addressRepository.save(addr2);

        UserInfo user1 = new UserInfo("ZS", 21,"Male","123@xx.com", addr1.getAddressId());
        UserInfo user2 = new UserInfo("Ww", 25,"Male","234@xx.com", addr2.getAddressId());
        userInfoRepository.save(user1);
        userInfoRepository.save(user2);
    }

  @After
  public void deleteAll() {
    userInfoRepository.deleteAll();

    addressRepository.deleteAll();
  }

  @Test
  public void testQuery() {
    List<ViewInfo> viewInfos = userInfoRepository.findViewInfo();
    for (ViewInfo viewInfo : viewInfos) {
      System.out.println(viewInfo.getUserInfo());
      System.out.println(viewInfo.getAddress());
    }
  }

}
```

查询相关的 sql 如下：

```
Hibernate: select userinfo0_.user_id as col_0_0_, address1_.address_id as col_1_0_ from tb_user userinfo0_ cross join tb_address address1_ where userinfo0_.address_id=address1_.address_id
Hibernate: select userinfo0_.user_id as user_id1_4_0_, userinfo0_.address_id as address_2_4_0_, userinfo0_.age as age3_4_0_, userinfo0_.email as email4_4_0_, userinfo0_.name as name5_4_0_, userinfo0_.sex as sex6_4_0_ from tb_user userinfo0_ where userinfo0_.user_id=?
Hibernate: select address0_.address_id as address_1_3_0_, address0_.area as area2_3_0_, address0_.area_code as area_cod3_3_0_, address0_.city as city4_3_0_, address0_.country as country5_3_0_, address0_.detail_address as detail_a6_3_0_, address0_.province as province7_3_0_ from tb_address address0_ where address0_.address_id=?
Hibernate: select userinfo0_.user_id as user_id1_4_0_, userinfo0_.address_id as address_2_4_0_, userinfo0_.age as age3_4_0_, userinfo0_.email as email4_4_0_, userinfo0_.name as name5_4_0_, userinfo0_.sex as sex6_4_0_ from tb_user userinfo0_ where userinfo0_.user_id=?
Hibernate: select address0_.address_id as address_1_3_0_, address0_.area as area2_3_0_, address0_.area_code as area_cod3_3_0_, address0_.city as city4_3_0_, address0_.country as country5_3_0_, address0_.detail_address as detail_a6_3_0_, address0_.province as province7_3_0_ from tb_address address0_ where address0_.address_id=?
Hibernate: select userinfo0_.user_id as user_id1_4_, userinfo0_.address_id as address_2_4_, userinfo0_.age as age3_4_, userinfo0_.email as email4_4_, userinfo0_.name as name5_4_, userinfo0_.sex as sex6_4_ from tb_user userinfo0_
Hibernate: select address0_.address_id as address_1_3_, address0_.area as area2_3_, address0_.area_code as area_cod3_3_, address0_.city as city4_3_, address0_.country as country5_3_, address0_.detail_address as detail_a6_3_, address0_.province as province7_3_ from tb_address address0_
```

查询结果如下：

```
UserInfo [userId=1, name=ZS, age=21, sex=Male, email=123@xx.com]
Address [addressId=1, areaCode=027, country=CN, province=HuBei, city=WuHan, area=WuChang, detailAddress=123 street]
UserInfo [userId=2, name=Ww, age=25, sex=Male, email=234@xx.com]
Address [addressId=2, areaCode=023, country=CN, province=ChongQing, city=ChongQing, area=YuBei, detailAddress=123 road]
```

## 2. 方式2： 实用原生sql(适用多对多映射)

实体 Author ：作者。

实体 Book ：书籍

这里通过关联表的方式来实现多对多关联。

### 2.1 实体类

1. 实体类：Author.java

   ```java
   package com.johnfnash.learn.domain;
   
   import java.io.Serializable;
   
   import javax.persistence.Entity;
   import javax.persistence.GeneratedValue;
   import javax.persistence.Id;
   
   @Entity
   public class Author implements Serializable {
   
     private static final long serialVersionUID = 1227555837798655046L;
   
     @Id
       @GeneratedValue
       private Integer id;
   
       private String name;
   
     public Author() {
       super();
     }
   
     public Author(String name) {
       super();
       this.name = name;
     }
   
     // getter, setter
   
     @Override
       public String toString() {
           return String.format("Author [id=%s, name=%s]", id, name);
       }
   
   }
   ```

   

2. Book.java 实体类

   ```java
   package com.johnfnash.learn.domain;
   
   import java.io.Serializable;
   
   import javax.persistence.Entity;
   import javax.persistence.GeneratedValue;
   import javax.persistence.Id;
   
   @Entity
   public class Book implements Serializable {
   
     private static final long serialVersionUID = -2470510857424220408L;
   
     @Id
       @GeneratedValue
       private Integer id;
   
       private String name;
   
       public Book() {
           super();
       }
   
       public Book(String name) {
           super();
           this.name = name;
       }
   
     //getter, setter
   
     @Override
     public String toString() {
       return String.format("Book [id=%s, name=%s]", id, name);
     }
   
   }
   ```

   3. 实体类BookAuthor.java

   ```java
   package com.johnfnash.learn.domain;
   
   import javax.persistence.Entity;
   import javax.persistence.Id;
   import javax.persistence.IdClass;
   import javax.persistence.Table;
   
   @Entity
   @IdClass(BookAuthorPK.class)
   @Table(name = "book_author")
   public class BookAuthor {
   
     @Id
     private Integer bookId;
   
     @Id
     private Integer authorId;
   
     public BookAuthor() {
       super();
     }
   
     public BookAuthor(Integer bookId, Integer authorId) {
       super();
       this.bookId = bookId;
       this.authorId = authorId;
     }
   
     // getter, setter
   
   }
   ```

   注：这里使用 @IdClass 注解指定一个联合主键类来映射实体类的多个属性。这个联合主键类的代码如下：

4. BookAuthorPK 

   ```java
   package com.johnfnash.learn.domain;
   
   import java.io.Serializable;
   
   public class BookAuthorPK implements Serializable {
   
     private static final long serialVersionUID = -1158141803682305656L;
   
     private Integer bookId;
   
     private Integer authorId;
   
     public Integer getBookId() {
       return bookId;
     }
   
     public void setBookId(Integer bookId) {
       this.bookId = bookId;
     }
   
     public Integer getAuthorId() {
       return authorId;
     }
   
     public void setAuthorId(Integer authorId) {
       this.authorId = authorId;
     }
   
   }
   ```

### 2.2 Dao 层

1. BookRepository.java

   ```java
   package com.johnfnash.learn.repository;
   
   import java.util.List;
   
   import org.springframework.data.jpa.repository.JpaRepository;
   import org.springframework.data.jpa.repository.Query;
   
   import com.johnfnash.learn.domain.Book;
   
   public interface BookRepository extends JpaRepository<Book, Integer> {
   
     @Query(nativeQuery = true, value = "SELECT b.id, b.name, GROUP_CONCAT(a.name) as authorName from book b, author a, book_author ba"
         + " where b.id = ba.book_id and a.id = ba.author_id and b.name like ?1 group by b.id, b.name")
       List<Object[]> findByNameContaining(String name);
   
   }
   ```

   注：

   - 这里使用 nativeQuery = true 指定使用原生 SQL 进行查询（个人觉得复杂的查询使用原生SQL更好
   - 这里使用了 mysql 的内置函数 GROUP_CONCAT 进行行转列, HQL 无法直接识别。可能会出现 Caused by: org.hibernate.QueryException: No data type for node: org.hibernate.hql.internal.ast.tree.MethodNode 的错误

   注2：

   - 返回的结果List<Object[]> 是通过下标来操作的，可以返回List<Map<String,Object>> 操作更加方便

   - 需要再转成对象的话，可以使用FastJson,例如

     ```java
      List<Map<String, Object>> menuList = roleDao.getMenuList(adminId);
             List<UmsMenu> umsMenus = JSON.parseArray(JSON.toJSONString(menuList), UmsMenu.class);
     ```

     

2. JpaRepository.java

   ```java
   package com.johnfnash.learn.repository;
   
   import org.springframework.data.jpa.repository.JpaRepository;
   
   import com.johnfnash.learn.domain.Author;
   
   public interface AuthorRepository extends JpaRepository<Author, Integer> {
   
   }
   ```

3. BookAuthorRepository.java

   ```java
   package com.johnfnash.learn.repository;
   
   import org.springframework.data.jpa.repository.JpaRepository;
   
   import com.johnfnash.learn.domain.BookAuthor;
   
   public interface BookAuthorRepository extends JpaRepository<BookAuthor, Integer> {
   
   }
   ```

### 2.3 测试

```java
package com.johnfnash.learn;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.johnfnash.learn.domain.Author;
import com.johnfnash.learn.domain.Book;
import com.johnfnash.learn.domain.BookAuthor;
import com.johnfnash.learn.repository.AuthorRepository;
import com.johnfnash.learn.repository.BookAuthorRepository;
import com.johnfnash.learn.repository.BookRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookRepositoryTests {

  @Autowired
  private BookRepository bookRepository;

  @Autowired
  private AuthorRepository authorRepository;

  @Autowired
  private BookAuthorRepository bookAuthorRepository;

  @Before
  public void init() {
      Author lewis = new Author("Lewis");
      Author mark = new Author("Mark");
      Author peter = new Author("Peter");
      authorRepository.save(lewis);
      authorRepository.save(mark);
      authorRepository.save(peter);

      Book spring = new Book("Spring in Action");
      Book springboot = new Book("Spring Boot in Action");
      bookRepository.save(spring);
      bookRepository.save(springboot);

      bookAuthorRepository.save(new BookAuthor(spring.getId(), lewis.getId()));
      bookAuthorRepository.save(new BookAuthor(spring.getId(), mark.getId()));
      bookAuthorRepository.save(new BookAuthor(springboot.getId(), mark.getId()));
      bookAuthorRepository.save(new BookAuthor(springboot.getId(), peter.getId()));
  }

  @After
  public void deleteAll() {
    bookAuthorRepository.deleteAll();
    bookRepository.deleteAll();
    authorRepository.deleteAll();
  }

  @Test
  public void findAll() {
    assertEquals(bookRepository.findAll().size(), 2);
    assertEquals(authorRepository.findAll().size(), 3);

    List<Object[]> books = bookRepository.findByNameContaining("Spring%");
    for (Object[] book : books) {
      for (Object object : book) {
        System.out.print(object + ", ");
      }
      System.out.println();
    }
  }

}
```

执行 findAll 方法后，查询的相关 SQL 如下：

```
Hibernate: SELECT b.id, b.name, GROUP_CONCAT(a.name) as authorName from book b, author a, book_author ba where b.id = ba.book_id and a.id = ba.author_id and b.name like ? group by b.id, b.name
```

输出的结果如下：

```
3652, Spring in Action, Lewis,Mark, 
3653, Spring Boot in Action, Mark,Peter, 
```

## 参考文章

[Spring Data JPA 实现多表关联查询](https://blog.csdn.net/johnf_nash/article/details/80587204)