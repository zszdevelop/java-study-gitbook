# 打jar包，没有主清单属性

## 1. 背景

在springboot 设置打jar包后，使用java -jar 运行提示 没有主清单属性

![image-20201026103541437](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201026103541437.png)

## 2. 解决办法

在pom文件中添加 spring-boot-maven-plugin 插件

```xml
    <build>

        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
     </build>
```
