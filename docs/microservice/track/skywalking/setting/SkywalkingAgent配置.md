# Skywalking Agent配置

## 1. Java Agent配置方式

agent配置有多种姿势，上面修改 `agent.config` 文件中的值，只是其中一种。下面专门探讨agent支持的配置方式。

### 1.1 系统属性(-D)

使用 `-Dskywalking.` + `agent.config配置文件中的key` 即可。例如：

`agent.config` 文件中有一个属性名为 `agent.service_name` ，那么如果使用系统属性的方式，则可以写成

```sh
java -javaagent:/opt/agent/skywalking-agent.jar -Dskywalking.agent.service_name=你想设置的值 -jar my-spring-boot.jar
```

### 1.2 代理选项

在JVM参数中的代理路径之后添加属性即可。格式：

```sh
-javaagent:/path/to/skywalking-agent.jar=[option1]=[value1],[option2]=[value2]
```

例如：

```sh
java -javaagent:/opt/agent/skywalking-agent.jar=agent.service_name=你想设置的值 -jar my-spring-boot.jar
```

### 1.3 系统环境变量

`agent.config` 文件中默认的大写值，都可以作为环境变量引用。例如，`agent.config` 中有如下内容

```
agent.service_name=${SW_AGENT_NAME:Your_ApplicationName}
```

这说明Skywalking会读取名为 `SW_AGENT_NAME` 的环境变量。

## 2. 优先级

```
代理选项` > `系统属性（-D）` > `系统环境变量` > `配置文件
```