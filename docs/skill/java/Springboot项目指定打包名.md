# Springboot项目指定打包名

## 1. 背景

我们在打包给测试时需要按公司规定，指定打包后的名称。我们公司的名称为

```
项目名称-版本号-git版本号后6位-构建时间
```

如果每次打开都手动更改，就太繁琐了。我们可以在pom文件中配置

## 2.  打包指定jar文件名

只需要在pom.xml的<build>标签中加上这个即可：

```xml
<build>
		<finalName>my-app</finalName> <!-- 指定package生成的文件名为my-app.jar -->
		
		<plugins>
			......
		</plugins>

```

>注意：应该在具体项目中pom配置，而不是在根目录下pom配置

## 3.获取git版本号

### 3.1 集成插件：git-commit-id-plugin



```xml
<!--git版本号-->
            <plugin>
                <groupId>pl.project13.maven</groupId>
                <artifactId>git-commit-id-plugin</artifactId>
                <version>2.2.5</version>
                <executions>
                    <execution>
                        <id>get-the-git-infos</id>
                        <goals>
                            <goal>revision</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <dotGitDirectory>${project.basedir}/.git</dotGitDirectory>
                    <!-- 使properties扩展到整个maven bulid 周期
                    Ref: https://github.com/ktoso/maven-git-commit-id-plugin/issues/280 -->
                    <injectAllReactorProjects>true</injectAllReactorProjects>
                    <dateFormat>yyyyMMddHHmmss</dateFormat>
                    <verbose>true</verbose>
                    <!-- 是否生 git.properties 属性文件 -->
                    <generateGitPropertiesFile>true</generateGitPropertiesFile>
                    <generateGitPropertiesFilename>${project.build.outputDirectory}/git.properties
                    </generateGitPropertiesFilename>
                    <format>properties</format>
                    <abbrevLength>8</abbrevLength>
                    <!--git描述配置,可选;由JGit提供实现;-->
                    <gitDescribe>
                        <!--是否生成描述属性-->
                        <skip>false</skip>
                        <!--提交操作未发现tag时,仅打印提交操作ID,-->
                        <always>false</always>
                        <!--提交操作ID显式字符长度,最大值为:40;默认值:7; 0代表特殊意义;后面有解释; -->
                        <abbrev>8</abbrev>
                        <!--构建触发时,代码有修改时(即"dirty state"),添加指定后缀;默认值:"";-->
                        <dirty>-dirty</dirty>
                        <!--always print using the "tag-commits_from_tag-g_commit_id-maybe_dirty" format, even if "on" a tag. The distance will always be 0 if you're "on" the tag. -->
                        <forceLongFormat>false</forceLongFormat>
                    </gitDescribe>
                </configuration>
            </plugin>
```

插件会一直报红，但是其实已经生效了。重启之后就不爆红了

## 4. 打包时间

```xml
 <!--打包时间-->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>build-helper-maven-plugin</artifactId>
                <version>1.10</version>
                <executions>
                    <execution>
                        <id>timestamp-property</id>
                        <goals>
                            <goal>timestamp-property</goal>
                        </goals>
                        <configuration>
                            <name>build.time</name>
                            <pattern>yyyyMMdd</pattern>
                            <locale>zh_CN</locale>
                            <timeZone>Asia/Shanghai</timeZone>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```

## 5. 指定完整打包名

```xml
<finalName>${project.artifactId}-${project.version}-${git.commit.id.abbrev}-BETA-${build.time}</finalName>
```

