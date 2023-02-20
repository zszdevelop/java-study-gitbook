---
order: 390
category:
  - Spring
  - SpringBoot
---
# SpringBoot应用部署 - 使用第三方JAR包

>在项目中我们经常需要使用第三方的Jar，比如某些SDK，**这些SDK没有直接发布到公开的maven仓库中**，这种情况下如何使用这些三方JAR呢？本文提供最常用的两种方式。

## 方案一：安装到Maven仓库

> 如果有项目的Maven仓库，则推荐按照到的Maven仓库（比如私服）中。（最好不是本地的Maven仓库，因为还有CI环境需要集成。）

配置Maven私服, server & profile

```xml
<!-- server -->
<server>
    <id>nexus</id>
    <username>pdai</username>
    <password>passw0rd</password>
</server>
<!-- profile -->
<profile>
    <id>pdai-artifactory</id>
    <repositories>
        <repository>
            <id>nexus</id>
            <url>xxx.xxx.xxx.xxx</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>
</profile>
```



```bash
# -X：详细信息输出用于调试
# -Dfile：本地jar路径
# gav: group, artifactId, verson
# -Durl：仓库地址
# -DrepositoryId：settings文件中的ID
mvn -X deploy:deploy-file -DgroupId=tech.pdai -DartifactId=test-xxx -Dversion=1.1.0 -Dpackaging=jar -Dfile=/xxxx/xxx.jar -Durl=http://nexus.pdai.tech/repository/releases/ -DrepositoryId=nexus

  
```

## 方案二：使用systemPath属性

> 如果Jar无法放到maven仓库，即放在项目代码中，比如项目中libs文件夹中

使用systemPath属性，`<scope>system</scope>`, 其它**gav三元组是可以随意填写的**。

```xml
<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>taobao-sdk-java</artifactId>
    <version>1.0.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/libs/taobao-sdk-java-auto_1479188381469-20180831.jar</systemPath>
</dependency>
```

- **SpringBoot JAR打包**

springboot在打包的时候，调用spring-boot-maven-plugin，执行repackage把tomcat和resource，lib等合成一个新的jar。想要将系统jar打进去，必须配置includeSystemScope。最终会将lib放入BOOT-INF\lib

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <includeSystemScope>true</includeSystemScope>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>build-info</goal>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

- **SpringBoot War打包**

使用mvn clean package命令打包时需要在pom文件加入以下webResources配置，并设置jar包在WEB-INF/lib目录下

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.4</version>
    <configuration>
        <webResources>
            <resource>
                <directory>src/main/resources/libs/</directory>
                <targetPath>WEB-INF/lib/</targetPath>
                <includes>
                    <include>**/*.jar</include>
                </includes>
            </resource>
        </webResources>
    </configuration>
</plugin>

  
```

## 参考文章

[**SpringBoot应用部署 - 使用第三方JAR包**](https://pdai.tech/md/spring/springboot/springboot-x-deploy-jar-3rd.html)