---
order: 10
category:
  - 开发
  - 安全
---

# 开发安全 - 注入攻击详解

>注入攻击最为常见的攻击方式，作为开发而言必须完全避免; 本文会介绍常见的几种注入方式，比如：`SQL 注入`, `xPath 注入`, `命令注入`, `LDAP注入`, `CLRF注入`, `Host头注入`, `Email头注入`等等，总结来看其本质其实是一样的，且防御措施也大同小异，具体看下面的内容。

>攻击者使用恶意代码注入系统，欺骗服务器执行恶意命令

## 1. SQL 注入

> 所谓 SQL 注入，就是通过将 SQL 命令插入应用程序的 http 请求中，并在服务器端被接收后用于参与数据库操作，最终达到欺骗服务器执行恶意的 SQL 命令的效果。理论上来讲，应用程序中只要是与数据库有数据交互的地方，无论是增删改查，如果数据完全受用户控制，而应用程序又处理不当，那么这些地方都是可能存在 SQL 注入的。

### 1.1 什么样的SQL会造成攻击?

直接看下面登录的SQL：

```java
public boolean auth(String userName,String password) throws Exception{
    Connection conn = null;
    try {
        conn = DBUtil.getConnection();
        Statement state = conn.createStatement();
        // 重点看这条SQL，密码输入: ' OR '1'='1时，等同于不需要密码
        String sql = "SELECT * FROM t_user WHERE username='"+userName+"' AND pwd='"+password+"'";       
        ResultSet rs = state.executeQuery(sql);
        if(rs.next()){
            return true;
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally{
        if(conn != null){
            DBUtil.close(conn);
        }
    }
    return false;
}
```

### 1.2 如何防御?

常见的修复方法：

- **使用预编译处理输入参数**：要防御 SQL 注入，用户的输入就不能直接嵌套在 SQL 语句当中。使用参数化的语句，用户的输入就被限制于一个参数当中。

```java
// 写个大概，帮助你理解
sqlStatement = dbConnection.prepareStatement("select * from users where username= ? and password = ?");
sqlStatement.setString(1, userName);
sqlStatement.setString(1, password); // 加密

// 只是看个思路，都2020年了，谁还自己写JDBC登录...
```

- **输入验证**：检查用户输入的合法性，以确保输入的内容为正常的数据。数据检查应当在客户端和服务器端都执行，之所以要执行服务器端验证，是因为客户端的校验往往只是减轻服务器的压力和提高对用户的友好度，攻击者完全有可能通过抓包修改参数或者是获得网页的源代码后，修改验证合法性的脚本（或者直接删除脚本），然后将非法内容通过修改后的表单提交给服务器等等手段绕过客户端的校验。因此，要保证验证操作确实已经执行，唯一的办法就是在服务器端也执行验证。但是这些方法很容易出现由于过滤不严导致恶意攻击者可能绕过这些过滤的现象，需要慎重使用。
- **错误消息处理**：防范 SQL 注入，还要避免出现一些详细的错误消息，恶意攻击者往往会利用这些报错信息来判断后台 SQL 的拼接形式，甚至是直接利用这些报错注入将数据库中的数据通过报错信息显示出来。
- **加密处理**：将用户登录名称、密码等数据加密保存。加密用户输入的数据，然后再将它与数据库中保存的数据比较，这相当于对用户输入的数据进行了“消毒”处理，用户输入的数据不再对数据库有任何特殊的意义，从而也就防止了攻击者注入 SQL 命令。

## 2. xPath 注入

> XPath 是一种用来在内存中导航整个XML树的语言，它使用路径表达式来选取XML文档中的节点或者节点集。XPath 的设计初衷是作为一种面向 XSLT 和 XPointer 的语言,后来独立成了一种W3C标准。而 XPath 注入是指利用 XPath 解析器的松散输入和容错特性，能够在 URL、表单或其它信息上附带恶意的 XPath 查询代码，以获得权限信息的访问权并更改这些信息。XPath 注入与 SQL 注入类似，均是通过构造恶意的查询语句，对应用程序进行攻击。

### 2.1 xPath是怎么工作的?

实在不喜欢网上乱七八糟的，其实一张图就可以解释：

![image-20220705220710709](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220705220710709.png)

### 2.2 如何攻击的?

如果用户传入类似 ’ or 1=1 or ”=’ 的值，那么该查询语句也会得到 true 返回值，将返回所有用户的列表。

![image-20220705221024658](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220705221024658.png)

### 2.3 如何防御?

要避免XPath注入，需要注意以下几点：

- 对用户的输入进行合理验证，对特殊字符（如<、>、’、”等）等进行转义。过滤可以在客户端和服务端两边实现，如果可能的话，建议两者同时进行过滤。
- 创建一份安全字符白名单，确保 XPath 查询中由用户控制的数值完全来自于预定的字符集合，不包含任何 XPath 元字符。
- 对于系统出现的错误信息，以IE错误编码信息替换，屏蔽系统本身的出错信息。
- 参数化XPath查询，将需要构建的XPath查询表达式，以变量的形式表示，变量不是可以执行的脚本。
- 通过MD5、SSL等加密算法，对于数据敏感信息和在数据传输过程中加密，即使某些非法用户通过非法手法获取数据包，看到的也是加密后的信息。
- 使用源代码静态分析工具，进行自动化的检测，可以有效的发现源代码中的 XPath 注入问题。

## 3. 命令注入

### 3.1 什么是命令注入

命令是指通过提交恶意构造的参数破坏命令语句结构，从而达到执行恶意命令的目的。

### 3.2 命令注入的场景

Java中`System.Runtime.getRuntime().exec(cmd);`可以在目标机器上执行命令，而构建参数的过程中可能会引发注入攻击。

比如：

```java
// 比如你构建了如下的command语句，传参数request.getParameter("test")，将可能包含·命令分隔符·从而引入注入风险·   
String cmd = "xxxx xxx " + request.getParameter("test")+ " xxx";

// 注意: 试图将如下方法抽象为一个静态方法时，它潜藏着注入风险；如果你用过SonarCube扫描工具，如下代码会有注入攻击的提示。
public static void runCmd(String command){
    Runtime run = Runtime.getRuntime();
    try{
        Process process = run.exec(command);// 在当前服务器上执行command脚本
        InputStream in = process.getInputStream();
        While (in.read() != -1){
            System.out.println(in.read());
        }
        in.close();
        process.waitFor();
    } catch (Exception e){
        e.printStackTrace();
    }
    // ...忽略close操作，只是给你个例子
}

```

### 3.3 常见注入方式

> 上述command中会有哪些常见的注入方式呢？

- “；”分割
- “&”，“&&”，“||” 分割
- “|” 管道符
- `\r\n %d0%a0` 换行
- 反引号解析
- `$()` 替换

### 3.4 一般如何防御呢

> 和其它注入防御本质大同小异

- 不使用时禁用相应函数
- 尽量不要执行外部的应用程序或命令
- 做输入的格式检查
- 转义命令中的所有shell元字符: shell元字符包括 #&;`,|*?~<>^()[]{}$\

## 4. LDAP注入

### 4.1 LDAP简介

LDAP(Lightweight Directory Access Protocol):轻量级目录访问协议，是一种在线目录访问协议。LDAP主要用于目录中资源的搜索和查询，是X.500的一种简便的实现。LDAP不定义客户端和服务端的工作方式，但会定义客户端和服务端的通信方式，另外，LDAP还会定义LDAP数据库的访问权限及服务端数据的格式和属性。LDAP有三种基本的通信机制：没有处理的匿名访问；基本的用户名、密码形式的认证；使用SASL、SSL的安全认证方式。LDAP和其他一些协议走的是同一个套路，基于tcp/ip协议通信，注重服务的可用性、信息的保密性等等，除此之外还要回到那个最原始的问题：信任，当然信息安全的本质问题就是信任的问题。部署了LDAP的应用不会直接访问，目录中的内容，一般通过函数调用或者API，应用可以通过定义的C、Java的API进行访问，Java应用的访问方式为JNDI(Java Naming and Directory Interface)。

LDAP以目录信息树形式存储信息，包含入口、对象、属性，关系图如下：

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220705221531404.png" alt="image-20220705221531404"  />

入口点和属性之间的关系为：

![image-20220705221548155](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220705221548155.png)



既然LDAP用于搜索查询服务，那它是怎么搜索的呢？

- **search语法**：attribute operator value
- **search filter options**: ( "&" or "|" (filter1) (filter2) (filter3) ...) ("!" (filter))

主要根据属性和值进行搜索，就如浏览网页时我们通常并不会浏览某个目录，而是其下存在的某个文件。

- **LDAP的URL形式**为：`ldap://<host>:<port>/<path>`，`<path>:<dn>[?<artribute>[?<scope>?<filter>]]`
- 例如：ldap://austin.ibm.com/ou=Austin,o=IBM    ldap:///ou=Austin,o=IBM??sub?(cn=Joe Q. Public)

看得出来在URL中这里使用逗号分隔查询，而数据库查询则使用'&'号，这是LDAP特有的，另外这里o表示组织(organization)，u表示单元(unit)，cn表示country name。


### 4.2 LDAP注入场景

LDAP注入攻击和SQL注入攻击相似，因此接下来的想法是利用用户引入的参数生成LDAP查询。一个安全的Web应用在构造和将查询发送给服务器前应该净化用户传入的参数。在有漏洞的环境中，这些参数没有得到合适的过滤，因而攻击者可以注入任意恶意代码。

- `(attribute=value)`:如果过滤器用于构造查询单缺少逻辑操作符，如`value)(injected_filter`的注入会导致两个过滤器`(attribute=value)(injected_filter)`。在OpenLDAP实施中，第二个过滤器会被忽略，只有第一个会被执行。而在ADAM中，有两个过滤器的查询是不被允许的，因而这个注入毫无用处。
- `(|(attribute=value)(second_filter)) or (&(attribute=value)(second_filter))`:如果第一个用于构造查询的过滤器有逻辑操作符，形如`value)(injected_filter)`的注入会变成如下过滤器：`(&(attribute=value)(injected_filter)) (second_filter)`。虽然过滤器语法上并不正确，OpenLDAP还是会从左到右进行处理，忽略第一个过滤器闭合后的任何字符。一些LDAP客户端Web组成会忽略第二个过滤器，将ADAM和OpenLDAP发送给第一个完成的过滤器，因而存在注入。

一些应用框架在将请求发送给服务器之前会检查过滤器是否正确，在这种情况下，过滤器语义上必须是正确的，其注入如：`value)(injected_filter))(&(1=0`。这会导致出现两个不同的过滤器，第二个会被忽略：`(&(attribute=value)(injected_filter))(&(1=0)(second_filter))`。

既然第二个过滤器会被LDAP服务器忽略，有些部分便不允许有两个过滤器的查询。这种情况下，只能构建一个特殊的注入以获得单个过滤器的LDAP查询。`value)(injected_filter`这样的注入产生的结果是：`(&(attribute=value)(injected_filter)(second_filter))`。

测试一个应用是否存在代码注入漏洞典型的方法是向服务器发送会生成一个无效输入的请求。因此，如果服务器返回一个错误消息，攻击者就能知道服务器执行了他的查询，他可以利用代码注入技术。回想一下之前讨论的，我们可以将注入环境分为两种：AND注入环境和OR注入环境。

### 4.3 学习更多LDAP攻防

这里只是简单介绍，如需更详细了解，推荐你看下这篇文章：[LDAP注入与防御解析 ](https://www.cnblogs.com/r00tgrok/p/LDAP_INJECTION_AND_PREVENTION.html)

## 5. CLRF注入

- https://blog.csdn.net/han_code/article/details/90235983

## 6. Host头注入

- https://www.freebuf.com/articles/web/164817.html
- https://www.cnblogs.com/z45-1/p/10746316.html

## 7. Email头注入

- https://www.cnblogs.com/endust/p/11819476.html

## 8. XXE

https://blog.spoock.com/2018/10/23/java-xxe/

## 参考文章

[**开发安全 - 注入攻击详解**](https://pdai.tech/md/develop/security/dev-security-x-injection.html)