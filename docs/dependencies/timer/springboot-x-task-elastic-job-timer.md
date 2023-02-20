---
order: 60
category:
  - 定时任务
---

# 定时任务 - 分布式elastic-job方式

>前文展示quartz实现基于数据库的分布式任务管理和job生命周期的控制，那在分布式场景下如何解决弹性调度、资源管控、以及作业治理等呢？针对这些功能前当当团队开发了ElasticJob，2020 年 5 月 28 日ElasticJob成为 Apache ShardingSphere 的子项目；本文介绍ElasticJob以及SpringBoot的集成。

## 1. 知识准备

> 需要对分布式任务的知识体系和ElasticJob有基本的理解。

### 1.1 分布式任务知识体系

> 站在分布式任务知识体系的角度看分布式任务。

[分布式系统 - 分布式任务及实现方案](https://pdai.tech/md/arch/arch-z-job.html)

- 本文主要介绍定时任务的基础和单体方式下定时任务方案的演化，以及常见的分布式任务方案(包括Quartz Cluster，ElasticJob，xxl-job等）和技术实现要点。

### 1.2 什么是ElasticJob

> ElasticJob 是面向互联网生态和海量任务的分布式调度解决方案，由两个相互独立的子项目 ElasticJob-Lite 和 ElasticJob-Cloud 组成。 它通过弹性调度、资源管控、以及作业治理的功能，打造一个适用于互联网场景的分布式调度解决方案，并通过开放的架构设计，提供多元化的作业生态。 它的各个产品使用统一的作业 API，开发者仅需一次开发，即可随意部署。ElasticJob 已于 2020 年 5 月 28 日成为 Apache ShardingSphere 的子项目。

使用 ElasticJob 能够让开发工程师不再担心任务的线性吞吐量提升等非功能需求，使他们能够更加专注于面向业务编码设计； 同时，它也能够解放运维工程师，使他们不必再担心任务的可用性和相关管理需求，只通过轻松的增加服务节点即可达到自动化运维的目的。

**ElasticJob-Lite**: 定位为轻量级无中心化解决方案，使用 jar 的形式提供分布式任务的协调服务。

![image-20220718214257642](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718214257642.png)

Elasticjob-lite的案例- [SpringBoot集成定时任务 - 分布式Elasticjob-lite方式]()

**ElasticJob-Cloud**： 采用自研 Mesos Framework 的解决方案，额外提供资源治理、应用分发以及进程隔离等功能。

![image-20220718214402293](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718214402293.png)

**ElasticJob-Lite和ElasticJob-Cloud的区别**

|          | ElasticJob-Lite | ElasticJob-Cloud  |
| -------- | --------------- | ----------------- |
| 无中心化 | 是              | 否                |
| 资源分配 | 不支持          | 支持              |
| 作业模式 | 常驻            | 常驻 + 瞬时       |
| 部署依赖 | ZooKeeper       | ZooKeeper + Mesos |

## 2. 实现案例

> 本例将展示ElasticJob-Lite集成Springboot的案例，案例参考自ElasticJob的官网，同时做了一些调整和issue修复。

### 2.1 POM依赖

ElaticJob针对SpringBoot集成的starter依赖，针对错误通知的依赖elasticjob-error-handler-xxx（如果需要的话）

对任务的记录和追踪是存放在DB的，所以需要配置JPA和MySQL/H2等。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-lite-spring-boot-starter</artifactId>
    <version>3.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-error-handler-dingtalk</artifactId>
    <version>3.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-error-handler-wechat</artifactId>
    <version>3.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-error-handler-email</artifactId>
    <version>3.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-test</artifactId>
    <version>5.2.0</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.42</version><!--$NO-MVN-MAN-VER$-->
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### 2.2 基础Entity和Dao

Foo

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.entity;

import java.io.Serializable;

public final class Foo implements Serializable {

    private static final long serialVersionUID = 2706842871078949451L;

    private final long id;

    private final String location;

    private Status status;

    public Foo(final long id, final String location, final Status status) {
        this.id = id;
        this.location = location;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(final Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return String.format("id: %s, location: %s, status: %s", id, location, status);
    }

    public enum Status {
        TODO,
        COMPLETED
    }
}
```

dao

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.repository;

import org.springframework.stereotype.Repository;
import tech.pdai.springboot.elasticjob.lite.entity.Foo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class FooRepository {
    
    private final Map<Long, Foo> data = new ConcurrentHashMap<>(300, 1);
    
    public FooRepository() {
        init();
    }
    
    private void init() {
        addData(0L, 100L, "Beijing");
        addData(100L, 200L, "Shanghai");
        addData(200L, 300L, "Guangzhou");
    }
    
    private void addData(final long idFrom, final long idTo, final String location) {
        for (long i = idFrom; i < idTo; i++) {
            data.put(i, new Foo(i, location, Foo.Status.TODO));
        }
    }
    
    public List<Foo> findTodoData(final String location, final int limit) {
        List<Foo> result = new ArrayList<>(limit);
        int count = 0;
        for (Map.Entry<Long, Foo> each : data.entrySet()) {
            Foo foo = each.getValue();
            if (foo.getLocation().equals(location) && foo.getStatus() == Foo.Status.TODO) {
                result.add(foo);
                count++;
                if (count == limit) {
                    break;
                }
            }
        }
        return result;
    }
    
    public void setCompleted(final long id) {
        data.get(id).setStatus(Foo.Status.COMPLETED);
    }
}
  
```

### 2.3 Job定义

- 基本的Job, 实现SimpleJob接口

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.job;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.shardingsphere.elasticjob.api.ShardingContext;
import org.apache.shardingsphere.elasticjob.simple.job.SimpleJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tech.pdai.springboot.elasticjob.lite.entity.Foo;
import tech.pdai.springboot.elasticjob.lite.repository.FooRepository;

@Component
public class SpringBootSimpleJob implements SimpleJob {

    private final Logger logger = LoggerFactory.getLogger(SpringBootSimpleJob.class);

    @Autowired
    private FooRepository fooRepository;

    @Override
    public void execute(final ShardingContext shardingContext) {
        logger.info("Item: {} | Time: {} | Thread: {} | {}",
                shardingContext.getShardingItem(), LocalDateTime.now(), Thread.currentThread().getId(), "SIMPLE");
        List<Foo> data = fooRepository.findTodoData(shardingContext.getShardingParameter(), 10);
        for (Foo each : data) {
            fooRepository.setCompleted(each.getId());
        }
    }
}
```

- 数据流处理Job, 实现DataflowJob接口

包含两个主要方法，一个是获取数据的方法fetchData， 一个是处理数据的方法processData

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.job;

import java.time.LocalDateTime;
import java.util.List;

import javax.annotation.Resource;

import org.apache.shardingsphere.elasticjob.api.ShardingContext;
import org.apache.shardingsphere.elasticjob.dataflow.job.DataflowJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import tech.pdai.springboot.elasticjob.lite.entity.Foo;
import tech.pdai.springboot.elasticjob.lite.repository.FooRepository;

@Component
public class SpringBootDataflowJob implements DataflowJob<Foo> {

    private final Logger logger = LoggerFactory.getLogger(SpringBootDataflowJob.class);

    @Resource
    private FooRepository fooRepository;

    @Override
    public List<Foo> fetchData(final ShardingContext shardingContext) {
        logger.info("Item: {} | Time: {} | Thread: {} | {}",
                shardingContext.getShardingItem(), LocalDateTime.now(), Thread.currentThread().getId(), "DATAFLOW FETCH");
        return fooRepository.findTodoData(shardingContext.getShardingParameter(), 10);
    }

    @Override
    public void processData(final ShardingContext shardingContext, final List<Foo> data) {
        logger.info("Item: {} | Time: {} | Thread: {} | {}",
                shardingContext.getShardingItem(), LocalDateTime.now(), Thread.currentThread().getId(), "DATAFLOW PROCESS");
        for (Foo each : data) {
            fooRepository.setCompleted(each.getId());
        }
    }
}
```

- 错误通知处理 - Email

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.job;

import org.apache.shardingsphere.elasticjob.api.ShardingContext;
import org.apache.shardingsphere.elasticjob.simple.job.SimpleJob;
import org.springframework.stereotype.Component;

@Component
public class SpringBootOccurErrorNoticeEmailJob implements SimpleJob {
    
    @Override
    public void execute(final ShardingContext shardingContext) {
        throw new RuntimeException(String.format("An exception has occurred in Job, The parameter is %s", shardingContext.getShardingParameter()));
    }
}
```

- 错误通知处理 - Wechat

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.job;

import org.apache.shardingsphere.elasticjob.api.ShardingContext;
import org.apache.shardingsphere.elasticjob.simple.job.SimpleJob;
import org.springframework.stereotype.Component;

@Component
public class SpringBootOccurErrorNoticeWechatJob implements SimpleJob {
    
    @Override
    public void execute(final ShardingContext shardingContext) {
        throw new RuntimeException(String.format("An exception has occurred in Job, The parameter is %s", shardingContext.getShardingParameter()));
    }
}
```

- 错误通知处理 - Dingtalk

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.job;

import org.apache.shardingsphere.elasticjob.api.ShardingContext;
import org.apache.shardingsphere.elasticjob.simple.job.SimpleJob;
import org.springframework.stereotype.Component;

@Component
public class SpringBootOccurErrorNoticeDingtalkJob implements SimpleJob {
    
    @Override
    public void execute(final ShardingContext shardingContext) {
        throw new RuntimeException(String.format("An exception has occurred in Job, The parameter is %s", shardingContext.getShardingParameter()));
    }
}
```

### 2.4 装载配置

```yml
spring:
  profiles:
    active: dev

elasticjob:
  tracing:
    type: RDB
  regCenter:
    serverLists: localhost:6181
    namespace: elasticjob-lite-springboot
  jobs:
    simpleJob:
      elasticJobClass: tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob
      cron: 0/5 * * * * ?
      shardingTotalCount: 3
      shardingItemParameters: 0=Beijing,1=Shanghai,2=Guangzhou
    dataflowJob:
      elasticJobClass: tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob
      cron: 0/5 * * * * ?
      shardingTotalCount: 3
      shardingItemParameters: 0=Beijing,1=Shanghai,2=Guangzhou
    scriptJob:
      elasticJobType: SCRIPT
      cron: 0/10 * * * * ?
      shardingTotalCount: 3
      props:
        script.command.line: "echo SCRIPT Job: "
    occurErrorNoticeDingtalkJob:
      elasticJobClass: tech.pdai.springboot.elasticjob.lite.job.SpringBootOccurErrorNoticeDingtalkJob
      overwrite: true
      shardingTotalCount: 3
      shardingItemParameters: 0=Beijing,1=Shanghai,2=Guangzhou
      jobErrorHandlerType: DINGTALK
      jobBootstrapBeanName: occurErrorNoticeDingtalkBean
      props:
        dingtalk:
          webhook: you_webhook
          keyword: you_keyword
          secret: you_secret
          connectTimeout: 3000
          readTimeout: 5000
    occurErrorNoticeWechatJob:
      elasticJobClass: tech.pdai.springboot.elasticjob.lite.job.SpringBootOccurErrorNoticeWechatJob
      overwrite: true
      shardingTotalCount: 3
      shardingItemParameters: 0=Beijing,1=Shanghai,2=Guangzhou
      jobErrorHandlerType: WECHAT
      jobBootstrapBeanName: occurErrorNoticeWechatBean
      props:
        wechat:
          webhook: you_webhook
          connectTimeout: 3000
          readTimeout: 5000
    occurErrorNoticeEmailJob:
      elasticJobClass: tech.pdai.springboot.elasticjob.lite.job.SpringBootOccurErrorNoticeEmailJob
      overwrite: true
      shardingTotalCount: 3
      shardingItemParameters: 0=Beijing,1=Shanghai,2=Guangzhou
      jobErrorHandlerType: EMAIL
      jobBootstrapBeanName: occurErrorNoticeEmailBean
      props:
        email:
          host: host
          port: 465
          username: username
          password: password
          useSsl: true
          subject: ElasticJob error message
          from: from@xxx.xx
          to: to1@xxx.xx,to2@xxx.xx
          cc: cc@xxx.xx
          bcc: bcc@xxx.xx
          debug: false
  dump:
    port: 9888

knife4j:
  enable: true
  setting:
    # default lang
    language: en-US
    # footer
    enableFooter: false
    enableFooterCustom: true
    footerCustomContent: MIT | [Java 全栈](https://pdai.tech)
    # models
    enableSwaggerModels: true
    swaggerModelName: My Models
```

注册中心主要依赖ZK, 才用内置的zk.

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite;

import java.io.File;
import java.io.IOException;

import org.apache.curator.test.TestingServer;

/**
 * Embed ZooKeeper.
 *
 * <p>
 * Only used for examples
 * </p>
 */
public final class EmbedZookeeperServer {

    private static TestingServer testingServer;

    /**
     * Embed ZooKeeper.
     *
     * @param port ZooKeeper port
     */
    public static void start(final int port) {
        try {
            testingServer = new TestingServer(port, new File(String.format("target/test_zk_data/%s/", System.nanoTime())));
        } catch (final Exception ex) {
            ex.printStackTrace();
        } finally {
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                try {
                    Thread.sleep(1000L);
                    testingServer.close();
                } catch (final InterruptedException | IOException ignore) {
                }
            }));
        }
    }
}
```

任务持久化，本地环境

### 2.5 测试触发

通过controller接口触发测试异常通知功能。

```java
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package tech.pdai.springboot.elasticjob.lite.controller;

import javax.annotation.Resource;

import io.swagger.annotations.ApiOperation;
import org.apache.shardingsphere.elasticjob.lite.api.bootstrap.impl.OneOffJobBootstrap;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.pdai.springboot.elasticjob.lite.entity.response.ResponseResult;

/**
 * 这里需要加上@Lazy, 请看这个issue:https://github.com/apache/shardingsphere-elasticjob/issues/2014
 */
@Lazy
@RestController
public class OneOffJobController {

    @Resource(name = "occurErrorNoticeDingtalkBean")
    private OneOffJobBootstrap occurErrorNoticeDingtalkJob;

    @Resource(name = "occurErrorNoticeWechatBean")
    private OneOffJobBootstrap occurErrorNoticeWechatJob;

    @Resource(name = "occurErrorNoticeEmailBean")
    private OneOffJobBootstrap occurErrorNoticeEmailJob;

    @ApiOperation("Test occurErrorNoticeDingtalkJob")
    @GetMapping("/execute/occurErrorNoticeDingtalkJob")
    public ResponseResult<String> executeOneOffJob() {
        occurErrorNoticeDingtalkJob.execute();
        return ResponseResult.success();
    }

    @ApiOperation("Test executeOccurErrorNoticeWechatJob")
    @GetMapping("/execute/occurErrorNoticeWechatJob")
    public ResponseResult<String> executeOccurErrorNoticeWechatJob() {
        occurErrorNoticeWechatJob.execute();
        return ResponseResult.success();
    }

    @ApiOperation("Test executeOccurErrorNoticeEmailJob")
    @GetMapping("/execute/occurErrorNoticeEmailJob")
    public ResponseResult<String> executeOccurErrorNoticeEmailJob() {
        occurErrorNoticeEmailJob.execute();
        return ResponseResult.success();
    }
}
```

### 2.6 简单测试

非OneOff的任务，可以通过console查看相关日志

```bash
[WARN ] 2022-06-06 20:03:49,828 --Thread-1-- [org.apache.zookeeper.server.ServerCnxnFactory] maxCnxns is not configured, using default value 0. 

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.5.3)

[INFO ] 2022-06-06 20:03:50,380 --main-- [tech.pdai.springboot.elasticjob.lite.SpringBootMain] Starting SpringBootMain using Java 1.8.0_181 on MacBook-Pro.local with PID 6275 (/Users/pdai/pdai/www/tech-pdai-spring-demos/424-springboot-demo-schedule-elastic-job-lite/target/classes started by pdai in /Users/pdai/pdai/www/tech-pdai-spring-demos) 
[INFO ] 2022-06-06 20:03:50,380 --main-- [tech.pdai.springboot.elasticjob.lite.SpringBootMain] The following profiles are active: dev 
[INFO ] 2022-06-06 20:03:51,464 --main-- [org.springframework.data.repository.config.RepositoryConfigurationDelegate] Bootstrapping Spring Data JPA repositories in DEFAULT mode. 
[INFO ] 2022-06-06 20:03:51,479 --main-- [org.springframework.data.repository.config.RepositoryConfigurationDelegate] Finished Spring Data repository scanning in 6 ms. Found 0 JPA repository interfaces. 
[INFO ] 2022-06-06 20:03:52,039 --main-- [org.springframework.boot.web.embedded.tomcat.TomcatWebServer] Tomcat initialized with port(s): 8080 (http) 
[INFO ] 2022-06-06 20:03:52,048 --main-- [org.apache.coyote.http11.Http11NioProtocol] Initializing ProtocolHandler ["http-nio-8080"] 
[INFO ] 2022-06-06 20:03:52,049 --main-- [org.apache.catalina.core.StandardService] Starting service [Tomcat] 
[INFO ] 2022-06-06 20:03:52,049 --main-- [org.apache.catalina.core.StandardEngine] Starting Servlet engine: [Apache Tomcat/9.0.50] 
[INFO ] 2022-06-06 20:03:52,128 --main-- [org.apache.catalina.core.ContainerBase.[Tomcat].[localhost].[/]] Initializing Spring embedded WebApplicationContext 
[INFO ] 2022-06-06 20:03:52,128 --main-- [org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext] Root WebApplicationContext: initialization completed in 1698 ms 
[INFO ] 2022-06-06 20:03:52,156 --main-- [com.zaxxer.hikari.HikariDataSource] HikariPool-1 - Starting... 
[INFO ] 2022-06-06 20:03:52,330 --main-- [com.zaxxer.hikari.HikariDataSource] HikariPool-1 - Start completed. 
[INFO ] 2022-06-06 20:03:52,335 --main-- [org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration] H2 console available at '/h2-console'. Database available at 'jdbc:h2:mem:job_event_storage' 
[INFO ] 2022-06-06 20:03:52,472 --main-- [org.hibernate.jpa.internal.util.LogHelper] HHH000204: Processing PersistenceUnitInfo [name: default] 
[INFO ] 2022-06-06 20:03:52,526 --main-- [org.hibernate.Version] HHH000412: Hibernate ORM core version 5.4.32.Final 
[INFO ] 2022-06-06 20:03:52,656 --main-- [org.hibernate.annotations.common.Version] HCANN000001: Hibernate Commons Annotations {5.1.2.Final} 
[INFO ] 2022-06-06 20:03:52,750 --main-- [org.hibernate.dialect.Dialect] HHH000400: Using dialect: org.hibernate.dialect.H2Dialect 
[INFO ] 2022-06-06 20:03:52,939 --main-- [org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator] HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform] 
[INFO ] 2022-06-06 20:03:52,950 --main-- [org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean] Initialized JPA EntityManagerFactory for persistence unit 'default' 
[WARN ] 2022-06-06 20:03:53,163 --main-- [org.springframework.boot.autoconfigure.orm.jpa.JpaBaseConfiguration$JpaWebConfiguration] spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning 
[INFO ] 2022-06-06 20:03:53,719 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.snapshot.SnapshotService] ElasticJob: Snapshot service is running on port '9888' 
[INFO ] 2022-06-06 20:03:53,836 --main-- [org.apache.shardingsphere.elasticjob.lite.spring.boot.job.ElasticJobBootstrapConfiguration] creating Job Bootstrap Beans 
[INFO ] 2022-06-06 20:03:53,868 --main-- [org.apache.shardingsphere.elasticjob.lite.spring.core.setup.SpringProxyJobClassNameProvider] create SpringProxyJobClassNameProvider 
[INFO ] 2022-06-06 20:03:54,250 --main-- [org.quartz.impl.StdSchedulerFactory] Using default implementation for ThreadExecutor 
[INFO ] 2022-06-06 20:03:54,258 --main-- [org.quartz.core.SchedulerSignalerImpl] Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl 
[INFO ] 2022-06-06 20:03:54,258 --main-- [org.quartz.core.QuartzScheduler] Quartz Scheduler v.2.3.2 created. 
[INFO ] 2022-06-06 20:03:54,258 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.schedule.JobShutdownHookPlugin] Registering Quartz shutdown hook. simpleJob 
[INFO ] 2022-06-06 20:03:54,258 --main-- [org.quartz.simpl.RAMJobStore] RAMJobStore initialized. 
[INFO ] 2022-06-06 20:03:54,259 --main-- [org.quartz.core.QuartzScheduler] Scheduler meta-data: Quartz Scheduler (v2.3.2) 'simpleJob' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 1 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.
 
[INFO ] 2022-06-06 20:03:54,259 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler 'simpleJob' initialized from an externally provided properties instance. 
[INFO ] 2022-06-06 20:03:54,259 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler version: 2.3.2 
[INFO ] 2022-06-06 20:03:54,329 --main-- [org.quartz.impl.StdSchedulerFactory] Using default implementation for ThreadExecutor 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.quartz.core.SchedulerSignalerImpl] Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.quartz.core.QuartzScheduler] Quartz Scheduler v.2.3.2 created. 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.schedule.JobShutdownHookPlugin] Registering Quartz shutdown hook. dataflowJob 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.quartz.simpl.RAMJobStore] RAMJobStore initialized. 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.quartz.core.QuartzScheduler] Scheduler meta-data: Quartz Scheduler (v2.3.2) 'dataflowJob' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 1 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.
 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler 'dataflowJob' initialized from an externally provided properties instance. 
[INFO ] 2022-06-06 20:03:54,330 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler version: 2.3.2 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.impl.StdSchedulerFactory] Using default implementation for ThreadExecutor 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.core.SchedulerSignalerImpl] Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.core.QuartzScheduler] Quartz Scheduler v.2.3.2 created. 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.schedule.JobShutdownHookPlugin] Registering Quartz shutdown hook. scriptJob 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.simpl.RAMJobStore] RAMJobStore initialized. 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.core.QuartzScheduler] Scheduler meta-data: Quartz Scheduler (v2.3.2) 'scriptJob' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 1 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.
 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler 'scriptJob' initialized from an externally provided properties instance. 
[INFO ] 2022-06-06 20:03:54,360 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler version: 2.3.2 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.impl.StdSchedulerFactory] Using default implementation for ThreadExecutor 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.core.SchedulerSignalerImpl] Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.core.QuartzScheduler] Quartz Scheduler v.2.3.2 created. 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.schedule.JobShutdownHookPlugin] Registering Quartz shutdown hook. occurErrorNoticeDingtalkJob 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.simpl.RAMJobStore] RAMJobStore initialized. 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.core.QuartzScheduler] Scheduler meta-data: Quartz Scheduler (v2.3.2) 'occurErrorNoticeDingtalkJob' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 1 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.
 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler 'occurErrorNoticeDingtalkJob' initialized from an externally provided properties instance. 
[INFO ] 2022-06-06 20:03:54,387 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler version: 2.3.2 
[INFO ] 2022-06-06 20:03:54,412 --main-- [org.quartz.impl.StdSchedulerFactory] Using default implementation for ThreadExecutor 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.quartz.core.SchedulerSignalerImpl] Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.quartz.core.QuartzScheduler] Quartz Scheduler v.2.3.2 created. 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.schedule.JobShutdownHookPlugin] Registering Quartz shutdown hook. occurErrorNoticeWechatJob 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.quartz.simpl.RAMJobStore] RAMJobStore initialized. 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.quartz.core.QuartzScheduler] Scheduler meta-data: Quartz Scheduler (v2.3.2) 'occurErrorNoticeWechatJob' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 1 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.
 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler 'occurErrorNoticeWechatJob' initialized from an externally provided properties instance. 
[INFO ] 2022-06-06 20:03:54,413 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler version: 2.3.2 
[INFO ] 2022-06-06 20:03:54,446 --main-- [org.quartz.impl.StdSchedulerFactory] Using default implementation for ThreadExecutor 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.quartz.core.SchedulerSignalerImpl] Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.quartz.core.QuartzScheduler] Quartz Scheduler v.2.3.2 created. 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.apache.shardingsphere.elasticjob.lite.internal.schedule.JobShutdownHookPlugin] Registering Quartz shutdown hook. occurErrorNoticeEmailJob 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.quartz.simpl.RAMJobStore] RAMJobStore initialized. 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.quartz.core.QuartzScheduler] Scheduler meta-data: Quartz Scheduler (v2.3.2) 'occurErrorNoticeEmailJob' with instanceId 'NON_CLUSTERED'
  Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
  NOT STARTED.
  Currently in standby mode.
  Number of jobs executed: 0
  Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 1 threads.
  Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.
 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler 'occurErrorNoticeEmailJob' initialized from an externally provided properties instance. 
[INFO ] 2022-06-06 20:03:54,447 --main-- [org.quartz.impl.StdSchedulerFactory] Quartz scheduler version: 2.3.2 
[INFO ] 2022-06-06 20:03:54,462 --main-- [org.apache.shardingsphere.elasticjob.lite.spring.boot.job.ElasticJobBootstrapConfiguration] Job Bootstrap Beans created. 
[INFO ] 2022-06-06 20:03:54,474 --main-- [org.apache.coyote.http11.Http11NioProtocol] Starting ProtocolHandler ["http-nio-8080"] 
[INFO ] 2022-06-06 20:03:54,483 --main-- [org.springframework.boot.web.embedded.tomcat.TomcatWebServer] Tomcat started on port(s): 8080 (http) with context path '' 
[INFO ] 2022-06-06 20:03:54,772 --main-- [tech.pdai.springboot.elasticjob.lite.SpringBootMain] Started SpringBootMain in 4.75 seconds (JVM running for 5.51) 
[INFO ] 2022-06-06 20:03:54,774 --main-- [org.apache.shardingsphere.elasticjob.lite.spring.boot.job.ScheduleJobBootstrapStartupRunner] Starting ElasticJob Bootstrap. 
[INFO ] 2022-06-06 20:03:54,780 --main-- [org.quartz.core.QuartzScheduler] Scheduler simpleJob_$_NON_CLUSTERED started. 
[INFO ] 2022-06-06 20:03:54,781 --main-- [org.quartz.core.QuartzScheduler] Scheduler dataflowJob_$_NON_CLUSTERED started. 
[INFO ] 2022-06-06 20:03:54,782 --main-- [org.quartz.core.QuartzScheduler] Scheduler scriptJob_$_NON_CLUSTERED started. 
[INFO ] 2022-06-06 20:03:54,782 --main-- [org.apache.shardingsphere.elasticjob.lite.spring.boot.job.ScheduleJobBootstrapStartupRunner] ElasticJob Bootstrap started. 
[INFO ] 2022-06-06 20:03:55,068 --elasticjob-dataflowJob-1-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:03:55.068 | Thread: 130 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:03:55,068 --elasticjob-dataflowJob-3-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:03:55.068 | Thread: 133 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:03:55,068 --elasticjob-simpleJob-1-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 0 | Time: 2022-06-06T20:03:55.068 | Thread: 129 | SIMPLE 
[INFO ] 2022-06-06 20:03:55,068 --elasticjob-simpleJob-3-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 2 | Time: 2022-06-06T20:03:55.068 | Thread: 134 | SIMPLE 
[INFO ] 2022-06-06 20:03:55,068 --elasticjob-dataflowJob-2-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:03:55.068 | Thread: 131 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:03:55,068 --elasticjob-simpleJob-2-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 1 | Time: 2022-06-06T20:03:55.068 | Thread: 132 | SIMPLE 
[INFO ] 2022-06-06 20:03:55,076 --elasticjob-dataflowJob-2-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:03:55.076 | Thread: 131 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:03:55,076 --elasticjob-dataflowJob-1-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:03:55.076 | Thread: 130 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:03:55,076 --elasticjob-dataflowJob-3-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:03:55.076 | Thread: 133 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-simpleJob-4-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 0 | Time: 2022-06-06T20:04:00.015 | Thread: 158 | SIMPLE 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-dataflowJob-4-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:00.015 | Thread: 159 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-dataflowJob-5-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:00.015 | Thread: 163 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-simpleJob-5-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 1 | Time: 2022-06-06T20:04:00.015 | Thread: 160 | SIMPLE 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-dataflowJob-4-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:00.015 | Thread: 159 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-dataflowJob-5-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:00.015 | Thread: 163 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-simpleJob-6-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 2 | Time: 2022-06-06T20:04:00.015 | Thread: 164 | SIMPLE 
[INFO ] 2022-06-06 20:04:00,015 --elasticjob-dataflowJob-6-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:00.015 | Thread: 165 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:00,016 --elasticjob-dataflowJob-6-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:00.016 | Thread: 165 | DATAFLOW PROCESS 
SCRIPT Job: {"jobName":"scriptJob","taskId":"scriptJob@-@0,1,2@-@READY@-@192.168.3.116@-@6275","shardingTotalCount":3,"jobParameter":"","shardingItem":1}
SCRIPT Job: {"jobName":"scriptJob","taskId":"scriptJob@-@0,1,2@-@READY@-@192.168.3.116@-@6275","shardingTotalCount":3,"jobParameter":"","shardingItem":2}
SCRIPT Job: {"jobName":"scriptJob","taskId":"scriptJob@-@0,1,2@-@READY@-@192.168.3.116@-@6275","shardingTotalCount":3,"jobParameter":"","shardingItem":0}
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-simpleJob-8-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 1 | Time: 2022-06-06T20:04:05.012 | Thread: 181 | SIMPLE 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-simpleJob-7-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 0 | Time: 2022-06-06T20:04:05.012 | Thread: 178 | SIMPLE 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-dataflowJob-9-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:05.012 | Thread: 182 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-dataflowJob-7-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:05.011 | Thread: 179 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-dataflowJob-8-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:05.012 | Thread: 180 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-dataflowJob-7-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:05.012 | Thread: 179 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-dataflowJob-9-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:05.012 | Thread: 182 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-dataflowJob-8-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:05.012 | Thread: 180 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:05,012 --elasticjob-simpleJob-9-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 2 | Time: 2022-06-06T20:04:05.012 | Thread: 183 | SIMPLE 
[INFO ] 2022-06-06 20:04:10,016 --elasticjob-dataflowJob-10-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:10.016 | Thread: 184 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:10,016 --elasticjob-dataflowJob-11-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:10.016 | Thread: 187 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:10,016 --elasticjob-simpleJob-11-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 1 | Time: 2022-06-06T20:04:10.016 | Thread: 188 | SIMPLE 
[INFO ] 2022-06-06 20:04:10,016 --elasticjob-dataflowJob-10-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:10.016 | Thread: 184 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:10,016 --elasticjob-simpleJob-10-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 0 | Time: 2022-06-06T20:04:10.016 | Thread: 185 | SIMPLE 
[INFO ] 2022-06-06 20:04:10,016 --elasticjob-dataflowJob-11-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:10.016 | Thread: 187 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:10,017 --elasticjob-simpleJob-12-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 2 | Time: 2022-06-06T20:04:10.017 | Thread: 189 | SIMPLE 
[INFO ] 2022-06-06 20:04:10,017 --elasticjob-dataflowJob-12-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:10.017 | Thread: 190 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:10,017 --elasticjob-dataflowJob-12-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:10.017 | Thread: 190 | DATAFLOW PROCESS 
SCRIPT Job: {"jobName":"scriptJob","taskId":"scriptJob@-@0,1,2@-@READY@-@192.168.3.116@-@6275","shardingTotalCount":3,"jobParameter":"","shardingItem":0}
SCRIPT Job: {"jobName":"scriptJob","taskId":"scriptJob@-@0,1,2@-@READY@-@192.168.3.116@-@6275","shardingTotalCount":3,"jobParameter":"","shardingItem":2}
SCRIPT Job: {"jobName":"scriptJob","taskId":"scriptJob@-@0,1,2@-@READY@-@192.168.3.116@-@6275","shardingTotalCount":3,"jobParameter":"","shardingItem":1}
[INFO ] 2022-06-06 20:04:15,014 --elasticjob-simpleJob-13-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 0 | Time: 2022-06-06T20:04:15.014 | Thread: 200 | SIMPLE 
[INFO ] 2022-06-06 20:04:15,014 --elasticjob-dataflowJob-13-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:15.014 | Thread: 201 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-dataflowJob-13-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 0 | Time: 2022-06-06T20:04:15.015 | Thread: 201 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-dataflowJob-14-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:15.015 | Thread: 203 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-simpleJob-15-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 2 | Time: 2022-06-06T20:04:15.015 | Thread: 204 | SIMPLE 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-simpleJob-14-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootSimpleJob] Item: 1 | Time: 2022-06-06T20:04:15.015 | Thread: 202 | SIMPLE 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-dataflowJob-14-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 1 | Time: 2022-06-06T20:04:15.015 | Thread: 203 | DATAFLOW PROCESS 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-dataflowJob-15-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:15.015 | Thread: 205 | DATAFLOW FETCH 
[INFO ] 2022-06-06 20:04:15,015 --elasticjob-dataflowJob-15-- [tech.pdai.springboot.elasticjob.lite.job.SpringBootDataflowJob] Item: 2 | Time: 2022-06-06T20:04:15.015 | Thread: 205 | DATAFLOW PROCESS 
```

OneOff的任务，通过controller api访问

![image-20220718215312961](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215312961.png)

由于这里没有配置正确的，这里会报异常日志

```bash
[INFO ] 2022-06-06 20:05:00,818 --Curator-SafeNotifyService-0-- [org.quartz.core.QuartzScheduler] Scheduler occurErrorNoticeDingtalkJob_$_NON_CLUSTERED started. 
[ERROR] 2022-06-06 20:05:00,908 --elasticjob-occurErrorNoticeDingtalkJob-3-- [org.apache.shardingsphere.elasticjob.error.handler.dingtalk.DingtalkJobErrorHandler] An exception has occurred in Job 'occurErrorNoticeDingtalkJob', but failed to send dingtalk because of 
java.lang.RuntimeException: An exception has occurred in Job, The parameter is Guangzhou
	at tech.pdai.springboot.elasticjob.lite.job.SpringBootOccurErrorNoticeDingtalkJob.execute(SpringBootOccurErrorNoticeDingtalkJob.java:29)
	at org.apache.shardingsphere.elasticjob.simple.executor.SimpleJobExecutor.process(SimpleJobExecutor.java:33)
	at org.apache.shardingsphere.elasticjob.simple.executor.SimpleJobExecutor.process(SimpleJobExecutor.java:29)
	at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.process(ElasticJobExecutor.java:172)
	at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.lambda$process$0(ElasticJobExecutor.java:153)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at com.google.common.util.concurrent.TrustedListenableFutureTask$TrustedFutureInterruptibleTask.runInterruptibly(TrustedListenableFutureTask.java:125)
	at com.google.common.util.concurrent.InterruptibleTask.run(InterruptibleTask.java:57)
	at com.google.common.util.concurrent.TrustedListenableFutureTask.run(TrustedListenableFutureTask.java:78)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
	Suppressed: org.apache.http.client.ClientProtocolException: null
		at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:187)
		at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:83)
		at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:108)
		at org.apache.shardingsphere.elasticjob.error.handler.dingtalk.DingtalkJobErrorHandler.handleException(DingtalkJobErrorHandler.java:80)
		at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.process(ElasticJobExecutor.java:183)
		... 8 common frames omitted
	Caused by: org.apache.http.ProtocolException: Target host is not specified
		at org.apache.http.impl.conn.DefaultRoutePlanner.determineRoute(DefaultRoutePlanner.java:71)
		at org.apache.http.impl.client.InternalHttpClient.determineRoute(InternalHttpClient.java:125)
		at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:184)
		... 12 common frames omitted
[ERROR] 2022-06-06 20:05:00,908 --elasticjob-occurErrorNoticeDingtalkJob-2-- [org.apache.shardingsphere.elasticjob.error.handler.dingtalk.DingtalkJobErrorHandler] An exception has occurred in Job 'occurErrorNoticeDingtalkJob', but failed to send dingtalk because of 
java.lang.RuntimeException: An exception has occurred in Job, The parameter is Shanghai
	at tech.pdai.springboot.elasticjob.lite.job.SpringBootOccurErrorNoticeDingtalkJob.execute(SpringBootOccurErrorNoticeDingtalkJob.java:29)
	at org.apache.shardingsphere.elasticjob.simple.executor.SimpleJobExecutor.process(SimpleJobExecutor.java:33)
	at org.apache.shardingsphere.elasticjob.simple.executor.SimpleJobExecutor.process(SimpleJobExecutor.java:29)
	at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.process(ElasticJobExecutor.java:172)
	at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.lambda$process$0(ElasticJobExecutor.java:153)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at com.google.common.util.concurrent.TrustedListenableFutureTask$TrustedFutureInterruptibleTask.runInterruptibly(TrustedListenableFutureTask.java:125)
	at com.google.common.util.concurrent.InterruptibleTask.run(InterruptibleTask.java:57)
	at com.google.common.util.concurrent.TrustedListenableFutureTask.run(TrustedListenableFutureTask.java:78)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
	Suppressed: org.apache.http.client.ClientProtocolException: null
		at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:187)
		at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:83)
		at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:108)
		at org.apache.shardingsphere.elasticjob.error.handler.dingtalk.DingtalkJobErrorHandler.handleException(DingtalkJobErrorHandler.java:80)
		at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.process(ElasticJobExecutor.java:183)
		... 8 common frames omitted
	Caused by: org.apache.http.ProtocolException: Target host is not specified
		at org.apache.http.impl.conn.DefaultRoutePlanner.determineRoute(DefaultRoutePlanner.java:71)
		at org.apache.http.impl.client.InternalHttpClient.determineRoute(InternalHttpClient.java:125)
		at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:184)
		... 12 common frames omitted
[ERROR] 2022-06-06 20:05:00,908 --elasticjob-occurErrorNoticeDingtalkJob-1-- [org.apache.shardingsphere.elasticjob.error.handler.dingtalk.DingtalkJobErrorHandler] An exception has occurred in Job 'occurErrorNoticeDingtalkJob', but failed to send dingtalk because of 
java.lang.RuntimeException: An exception has occurred in Job, The parameter is Beijing
	at tech.pdai.springboot.elasticjob.lite.job.SpringBootOccurErrorNoticeDingtalkJob.execute(SpringBootOccurErrorNoticeDingtalkJob.java:29)
	at org.apache.shardingsphere.elasticjob.simple.executor.SimpleJobExecutor.process(SimpleJobExecutor.java:33)
	at org.apache.shardingsphere.elasticjob.simple.executor.SimpleJobExecutor.process(SimpleJobExecutor.java:29)
	at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.process(ElasticJobExecutor.java:172)
	at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.lambda$process$0(ElasticJobExecutor.java:153)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at com.google.common.util.concurrent.TrustedListenableFutureTask$TrustedFutureInterruptibleTask.runInterruptibly(TrustedListenableFutureTask.java:125)
	at com.google.common.util.concurrent.InterruptibleTask.run(InterruptibleTask.java:57)
	at com.google.common.util.concurrent.TrustedListenableFutureTask.run(TrustedListenableFutureTask.java:78)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
	Suppressed: org.apache.http.client.ClientProtocolException: null
		at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:187)
		at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:83)
		at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:108)
		at org.apache.shardingsphere.elasticjob.error.handler.dingtalk.DingtalkJobErrorHandler.handleException(DingtalkJobErrorHandler.java:80)
		at org.apache.shardingsphere.elasticjob.executor.ElasticJobExecutor.process(ElasticJobExecutor.java:183)
		... 8 common frames omitted
	Caused by: org.apache.http.ProtocolException: Target host is not specified
		at org.apache.http.impl.conn.DefaultRoutePlanner.determineRoute(DefaultRoutePlanner.java:71)
		at org.apache.http.impl.client.InternalHttpClient.determineRoute(InternalHttpClient.java:125)
		at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:184)
		... 12 common frames omitted
```

## 3.运维控制台

> ElasticJob 也提供了UI控制台的功能，包括作业操作和作业历史。可以在[这里](https://dlcdn.apache.org/shardingsphere/)下载。

### 3.1 启动运行

比如这里，我下载了apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin.tar.gz。需要通过如下工具解压，因为某些解压缩工具在解压ShardingSphere-ElasticJob-UI二进制包时可能将文件名截断，导致找不到某些类。

```bash
tar zxvf apache-shardingsphere-elasticjob-${RELEASE.VERSION}-lite-ui-bin.tar.gz 
```

解压完以后，在conf目录配置JDBC（只需要与application-xx.yml中的datasource配置一致即可， 比如这里我们配置h2内存数据库）

```bash
server.port=8088

auth.root_username=root
auth.root_password=root
auth.guest_username=guest
auth.guest_password=guest
auth.token_expires_after_seconds=3600

spring.datasource.default.driver-class-name=org.h2.Driver
spring.datasource.default.url=jdbc:h2:mem:job_event_storage # 看这里
spring.datasource.default.username=sa
spring.datasource.default.password=
spring.jpa.show-sql=false
```

配置完后，启动

```bash
pdai@MacBook-Pro apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin % vi bin/start.sh 
pdai@MacBook-Pro apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin % bin/start.sh       
Starting the ShardingSphere-ElasticJob-UI ...
Please check the STDOUT file: /Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/logs/stdout.log
pdai@MacBook-Pro apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin % cat logs/stdout.log
20:20:30,474 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback.groovy]
20:20:30,475 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback-test.xml]
20:20:30,476 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Found resource [logback.xml] at [file:/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/conf/logback.xml]
20:20:30,476 |-WARN in ch.qos.logback.classic.LoggerContext[default] - Resource [logback.xml] occurs multiple times on the classpath.
20:20:30,476 |-WARN in ch.qos.logback.classic.LoggerContext[default] - Resource [logback.xml] occurs at [file:/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/conf/logback.xml]
20:20:30,476 |-WARN in ch.qos.logback.classic.LoggerContext[default] - Resource [logback.xml] occurs at [jar:file:/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/lib/shardingsphere-elasticjob-lite-ui-bin-distribution-3.0.1.jar!/logback.xml]
20:20:30,476 |-WARN in ch.qos.logback.classic.LoggerContext[default] - Resource [logback.xml] occurs at [jar:file:/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/lib/shardingsphere-elasticjob-lite-ui-backend-3.0.1.jar!/logback.xml]
20:20:30,588 |-INFO in ch.qos.logback.classic.joran.action.ConfigurationAction - debug attribute not set
20:20:30,588 |-INFO in ch.qos.logback.core.joran.action.AppenderAction - About to instantiate appender of type [ch.qos.logback.core.ConsoleAppender]
20:20:30,593 |-INFO in ch.qos.logback.core.joran.action.AppenderAction - Naming appender as [console]
20:20:30,598 |-INFO in ch.qos.logback.core.joran.action.NestedComplexPropertyIA - Assuming default type [ch.qos.logback.classic.encoder.PatternLayoutEncoder] for [encoder] property
20:20:30,653 |-INFO in ch.qos.logback.classic.joran.action.LoggerAction - Setting level of logger [org.apache.shardingsphere] to INFO
20:20:30,653 |-INFO in ch.qos.logback.classic.joran.action.LoggerAction - Setting additivity of logger [org.apache.shardingsphere] to false
20:20:30,653 |-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [console] to Logger[org.apache.shardingsphere]
20:20:30,653 |-INFO in ch.qos.logback.classic.joran.action.LevelAction - ROOT level set to INFO
20:20:30,653 |-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [console] to Logger[ROOT]
20:20:30,653 |-INFO in ch.qos.logback.classic.joran.action.ConfigurationAction - End of configuration.
20:20:30,656 |-INFO in ch.qos.logback.classic.joran.JoranConfigurator@3835c46 - Registering current configuration as safe fallback point


  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::       (v1.5.21.RELEASE)

[INFO ] 20:20:31.061 [main] o.a.s.elasticjob.lite.ui.Bootstrap - Starting Bootstrap v3.0.1 on MacBook-Pro.local with PID 7642 (/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/lib/shardingsphere-elasticjob-lite-ui-backend-3.0.1.jar started by pdai in /Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin)
[INFO ] 20:20:31.063 [main] o.a.s.elasticjob.lite.ui.Bootstrap - No active profile set, falling back to default profiles: default
[INFO ] 20:20:31.105 [main] o.s.b.c.e.AnnotationConfigEmbeddedWebApplicationContext - Refreshing org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext@5454d35e: startup date [Mon Jun 06 20:20:31 CST 2022]; root of context hierarchy
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.springframework.cglib.core.ReflectUtils$1 (file:/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/lib/spring-core-4.3.24.RELEASE.jar) to method java.lang.ClassLoader.defineClass(java.lang.String,byte[],int,int,java.security.ProtectionDomain)
WARNING: Please consider reporting this to the maintainers of org.springframework.cglib.core.ReflectUtils$1
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
[INFO ] 20:20:32.093 [main] o.s.c.s.PostProcessorRegistrationDelegate$BeanPostProcessorChecker - Bean 'org.springframework.transaction.annotation.ProxyTransactionManagementConfiguration' of type [org.springframework.transaction.annotation.ProxyTransactionManagementConfiguration$$EnhancerBySpringCGLIB$$89f6cb55] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
[INFO ] 20:20:32.367 [main] o.s.b.c.e.t.TomcatEmbeddedServletContainer - Tomcat initialized with port(s): 8088 (http)
[INFO ] 20:20:32.384 [main] o.a.coyote.http11.Http11NioProtocol - Initializing ProtocolHandler ["http-nio-8088"]
[INFO ] 20:20:32.407 [main] o.a.catalina.core.StandardService - Starting service [Tomcat]
[INFO ] 20:20:32.408 [main] o.a.catalina.core.StandardEngine - Starting Servlet Engine: Apache Tomcat/8.5.40
[INFO ] 20:20:32.514 [localhost-startStop-1] o.a.c.c.C.[Tomcat].[localhost].[/] - Initializing Spring embedded WebApplicationContext
[INFO ] 20:20:32.515 [localhost-startStop-1] o.s.web.context.ContextLoader - Root WebApplicationContext: initialization completed in 1417 ms
[INFO ] 20:20:32.657 [localhost-startStop-1] o.s.b.w.s.FilterRegistrationBean - Mapping filter: 'characterEncodingFilter' to: [/*]
[INFO ] 20:20:32.657 [localhost-startStop-1] o.s.b.w.s.FilterRegistrationBean - Mapping filter: 'hiddenHttpMethodFilter' to: [/*]
[INFO ] 20:20:32.657 [localhost-startStop-1] o.s.b.w.s.FilterRegistrationBean - Mapping filter: 'httpPutFormContentFilter' to: [/*]
[INFO ] 20:20:32.658 [localhost-startStop-1] o.s.b.w.s.FilterRegistrationBean - Mapping filter: 'requestContextFilter' to: [/*]
[INFO ] 20:20:32.658 [localhost-startStop-1] o.s.b.w.s.FilterRegistrationBean - Mapping filter: 'CORSFilter' to urls: [/api/*]
[INFO ] 20:20:32.658 [localhost-startStop-1] o.s.b.w.s.FilterRegistrationBean - Mapping filter: 'authenticationFilter' to urls: [/api/*]
[INFO ] 20:20:32.658 [localhost-startStop-1] o.s.b.w.s.ServletRegistrationBean - Mapping servlet: 'dispatcherServlet' to [/]
[INFO ] 20:20:32.990 [main] o.s.o.j.LocalContainerEntityManagerFactoryBean - Building JPA container EntityManagerFactory for persistence unit 'default'
[WARN ] 20:20:33.086 [main] openjpa.Runtime - The configuration property named "openjpa.ClassLoadEnhancement" was not recognized and will be ignored, although the name closely matches a valid property called "openjpa.PostLoadOnMerge".
[WARN ] 20:20:33.164 [main] openjpa.Runtime - The configuration property named "openjpa.ClassLoadEnhancement" was not recognized and will be ignored, although the name closely matches a valid property called "openjpa.PostLoadOnMerge".
[WARN ] 20:20:33.179 [main] openjpa.Runtime - An error occurred while registering a ClassTransformer with PersistenceUnitInfo: name 'default', root URL [file:/Users/pdai/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin/lib/shardingsphere-elasticjob-lite-ui-backend-3.0.1.jar]. The error has been consumed. To see it, set your openjpa.Runtime log level to TRACE. Load-time class transformation will not be available.
[INFO ] 20:20:33.193 [main] o.s.o.j.LocalContainerEntityManagerFactoryBean - Initialized JPA EntityManagerFactory for persistence unit 'default'
[INFO ] 20:20:33.273 [main] openjpa.jdbc.JDBC - Using dictionary class "org.apache.openjpa.jdbc.sql.H2Dictionary" (H2 1.4.196 (2017-06-10) ,H2 JDBC Driver 1.4.196 (2017-06-10)).
[INFO ] 20:20:33.322 [main] openjpa.jdbc.JDBC - Connected to H2 version 1.4 using JDBC driver H2 JDBC Driver version 1.4.196 (2017-06-10).
[INFO ] 20:20:33.326 [main] openjpa.Runtime - Starting OpenJPA 3.1.2
[WARN ] 20:20:33.531 [main] openjpa.Enhance - Creating subclass for "[class org.apache.shardingsphere.elasticjob.lite.ui.domain.TaskResultStatistics, class org.apache.shardingsphere.elasticjob.lite.ui.domain.JobRegisterStatistics, class org.apache.shardingsphere.elasticjob.lite.ui.domain.JobRunningStatistics, class org.apache.shardingsphere.elasticjob.lite.ui.domain.JobStatusTraceLog, class org.apache.shardingsphere.elasticjob.lite.ui.domain.JobExecutionLog, class org.apache.shardingsphere.elasticjob.lite.ui.domain.TaskRunningStatistics]". This means that your application will be less efficient and will consume more memory than it would if you ran the OpenJPA enhancer. Additionally, lazy loading will not be available for one-to-one and many-to-one persistent attributes in types using field access; they will be loaded eagerly instead.
[INFO ] 20:20:34.321 [main] o.s.w.s.m.m.a.RequestMappingHandlerAdapter - Looking for @ControllerAdvice: org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext@5454d35e: startup date [Mon Jun 06 20:20:31 CST 2022]; root of context hierarchy
[INFO ] 20:20:34.374 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/count],methods=[GET]}" onto public int org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.getJobsTotalCount()
[INFO ] 20:20:34.375 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/getAllJobsBriefInfo],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<org.apache.shardingsphere.elasticjob.lite.lifecycle.domain.JobBriefInfo>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.getAllJobsBriefInfo()
[INFO ] 20:20:34.375 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/shutdown],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.shutdownJob(java.lang.String)
[INFO ] 20:20:34.376 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/sharding],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<org.apache.shardingsphere.elasticjob.lite.lifecycle.domain.ShardingInfo>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.getShardingInfo(java.lang.String)
[INFO ] 20:20:34.376 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/sharding/{item}/disable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.disableSharding(java.lang.String,java.lang.String)
[INFO ] 20:20:34.376 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/sharding/{item}/enable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.enableSharding(java.lang.String,java.lang.String)
[INFO ] 20:20:34.376 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/trigger],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.triggerJob(java.lang.String)
[INFO ] 20:20:34.376 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/disable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.disableJob(java.lang.String)
[INFO ] 20:20:34.376 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/{jobName}/enable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobOperationController.enableJob(java.lang.String)
[INFO ] 20:20:34.378 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/event-trace/status/jobNames || /api/event-trace/status/jobNames/{jobNamePrefix:.+}],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.List<java.lang.String>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceHistoryController.findJobNamesByPrefixInStatusTraceLog(java.lang.String)
[INFO ] 20:20:34.378 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/event-trace/execution],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<org.apache.shardingsphere.elasticjob.lite.ui.dto.response.BasePageResponse<org.apache.shardingsphere.elasticjob.tracing.event.JobExecutionEvent>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceHistoryController.findJobExecutionEvents(org.apache.shardingsphere.elasticjob.lite.ui.dto.request.FindJobExecutionEventsRequest)
[INFO ] 20:20:34.378 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/event-trace/execution/jobNames || /api/event-trace/execution/jobNames/{jobNamePrefix:.+}],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.List<java.lang.String>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceHistoryController.findJobNamesByPrefix(java.lang.String)
[INFO ] 20:20:34.378 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/event-trace/execution/ip || /api/event-trace/execution/ip/{ipPrefix:.+}],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.List<java.lang.String>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceHistoryController.findIpByPrefix(java.lang.String)
[INFO ] 20:20:34.379 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/event-trace/status],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<org.apache.shardingsphere.elasticjob.lite.ui.dto.response.BasePageResponse<org.apache.shardingsphere.elasticjob.tracing.event.JobStatusTraceEvent>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceHistoryController.findJobStatusTraceEvents(org.apache.shardingsphere.elasticjob.lite.ui.dto.request.FindJobStatusTraceEventsRequest)
[INFO ] 20:20:34.382 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/count],methods=[GET]}" onto public int org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.getServersTotalCount()
[INFO ] 20:20:34.382 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/getAllServersBriefInfo],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<org.apache.shardingsphere.elasticjob.lite.lifecycle.domain.ServerBriefInfo>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.getAllServersBriefInfo()
[INFO ] 20:20:34.382 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/disable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.disableServer(java.lang.String)
[INFO ] 20:20:34.382 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/enable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.enableServer(java.lang.String)
[INFO ] 20:20:34.383 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/shutdown],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.shutdownServer(java.lang.String)
[INFO ] 20:20:34.383 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp:.+}],methods=[DELETE]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.removeServer(java.lang.String)
[INFO ] 20:20:34.383 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/jobs/{jobName}/disable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.disableServerJob(java.lang.String,java.lang.String)
[INFO ] 20:20:34.383 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/jobs/{jobName}/enable],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.enableServerJob(java.lang.String,java.lang.String)
[INFO ] 20:20:34.383 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/jobs/{jobName}/shutdown],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.shutdownServerJob(java.lang.String,java.lang.String)
[INFO ] 20:20:34.383 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/jobs/{jobName:.+}],methods=[DELETE]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.removeServerJob(java.lang.String,java.lang.String)
[INFO ] 20:20:34.384 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/servers/{serverIp}/jobs],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<org.apache.shardingsphere.elasticjob.lite.lifecycle.domain.JobBriefInfo>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.ServerOperationController.getJobs(java.lang.String)
[INFO ] 20:20:34.387 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/registry-center/activated],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<org.apache.shardingsphere.elasticjob.lite.ui.domain.RegistryCenterConfiguration> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.RegistryCenterController.activated()
[INFO ] 20:20:34.387 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/registry-center/add],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.RegistryCenterController.add(org.apache.shardingsphere.elasticjob.lite.ui.domain.RegistryCenterConfiguration)
[INFO ] 20:20:34.387 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/registry-center/load],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<org.apache.shardingsphere.elasticjob.lite.ui.domain.RegistryCenterConfiguration>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.RegistryCenterController.load(javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.387 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/registry-center],methods=[DELETE]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult org.apache.shardingsphere.elasticjob.lite.ui.web.controller.RegistryCenterController.delete(org.apache.shardingsphere.elasticjob.lite.ui.domain.RegistryCenterConfiguration)
[INFO ] 20:20:34.387 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/registry-center/connect],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.RegistryCenterController.connect(org.apache.shardingsphere.elasticjob.lite.ui.domain.RegistryCenterConfiguration,javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.389 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source/drivers],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<java.lang.String>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.availableDrivers()
[INFO ] 20:20:34.389 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source/connectTest],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.connectTest(org.apache.shardingsphere.elasticjob.lite.ui.domain.EventTraceDataSourceConfiguration,javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.389 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source/activated],methods=[GET]}" onto public boolean org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.activated(javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.389 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source/add],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.add(org.apache.shardingsphere.elasticjob.lite.ui.domain.EventTraceDataSourceConfiguration)
[INFO ] 20:20:34.390 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source/load],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.util.Collection<org.apache.shardingsphere.elasticjob.lite.ui.domain.EventTraceDataSourceConfiguration>> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.load(javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.390 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source],methods=[DELETE]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.delete(org.apache.shardingsphere.elasticjob.lite.ui.domain.EventTraceDataSourceConfiguration)
[INFO ] 20:20:34.390 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/data-source/connect],methods=[POST]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.EventTraceDataSourceController.connect(org.apache.shardingsphere.elasticjob.lite.ui.domain.EventTraceDataSourceConfiguration,javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.392 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/config/{jobName:.+}],methods=[GET]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<org.apache.shardingsphere.elasticjob.infra.pojo.JobConfigurationPOJO> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobConfigController.getJobConfig(java.lang.String)
[INFO ] 20:20:34.392 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/config],methods=[PUT]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobConfigController.updateJobConfig(org.apache.shardingsphere.elasticjob.infra.pojo.JobConfigurationPOJO)
[INFO ] 20:20:34.392 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/api/jobs/config/{jobName:.+}],methods=[DELETE]}" onto public org.apache.shardingsphere.elasticjob.lite.ui.web.response.ResponseResult<java.lang.Boolean> org.apache.shardingsphere.elasticjob.lite.ui.web.controller.JobConfigController.removeJob(java.lang.String)
[INFO ] 20:20:34.393 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/error],produces=[text/html]}" onto public org.springframework.web.servlet.ModelAndView org.springframework.boot.autoconfigure.web.BasicErrorController.errorHtml(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse)
[INFO ] 20:20:34.393 [main] o.s.w.s.m.m.a.RequestMappingHandlerMapping - Mapped "{[/error]}" onto public org.springframework.http.ResponseEntity<java.util.Map<java.lang.String, java.lang.Object>> org.springframework.boot.autoconfigure.web.BasicErrorController.error(javax.servlet.http.HttpServletRequest)
[INFO ] 20:20:34.412 [main] o.s.w.s.h.SimpleUrlHandlerMapping - Mapped URL path [/webjars/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
[INFO ] 20:20:34.412 [main] o.s.w.s.h.SimpleUrlHandlerMapping - Mapped URL path [/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
[INFO ] 20:20:34.422 [main] o.s.w.s.m.m.a.ExceptionHandlerExceptionResolver - Detected @ExceptionHandler methods in restExceptionHandler
[INFO ] 20:20:34.438 [main] o.s.w.s.h.SimpleUrlHandlerMapping - Mapped URL path [/**/favicon.ico] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
[INFO ] 20:20:34.453 [main] o.s.b.a.w.WebMvcAutoConfiguration$WelcomePageHandlerMapping - Adding welcome page: class path resource [public/index.html]
[INFO ] 20:20:34.624 [main] o.s.j.e.a.AnnotationMBeanExporter - Registering beans for JMX exposure on startup
[INFO ] 20:20:34.634 [main] o.a.coyote.http11.Http11NioProtocol - Starting ProtocolHandler ["http-nio-8088"]
[INFO ] 20:20:34.655 [main] o.a.tomcat.util.net.NioSelectorPool - Using a shared selector for servlet write/read
[INFO ] 20:20:34.666 [main] o.s.b.c.e.t.TomcatEmbeddedServletContainer - Tomcat started on port(s): 8088 (http)
[INFO ] 20:20:34.670 [main] o.a.s.elasticjob.lite.ui.Bootstrap - Started Bootstrap in 3.898 seconds (JVM running for 4.52)
```

打开http://localhost:8088，输入我们配置的root/root账号

![image-20220718215534000](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215534000.png)

### 3.2 全局配置

配置zk

![image-20220718215556141](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215556141.png)

配置数据源

![image-20220718215613302](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215613302.png)

### 3.3 作业操作

作业维度

![image-20220718215634544](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215634544.png)

服务器维度

![image-20220718215651441](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215651441.png)

### 3.4 作业历史

作业历史本质上就是从H2中获取数据，你也可以访问H2-Console查看

历史轨迹

![image-20220718215713254](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215713254.png)

历史状态

![image-20220718215741737](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220718215741737.png)

## 参考文章

[**SpringBoot定时任务 - 分布式elastic-job方式**](https://pdai.tech/md/spring/springboot/springboot-x-task-elastic-job-timer.html)