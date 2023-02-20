---
order: 210
category:
  - Spring
  - SpringBoot
---
# SpringBoot接口 - 如何提供多个版本接口

>在以SpringBoot开发Restful接口时，由于模块，系统等业务的变化，需要对同一接口提供不同版本的参数实现（老的接口还有模块或者系统在用，不能直接改，所以需要不同版本）。如何更加优雅的实现多版本接口呢？

## 1. 为什么接口会出现多个版本？

> 为什么接口会出现多个版本？

一般来说，Restful API接口是提供给其它模块，系统或是其他公司使用，不能随意频繁的变更。然而，需求和业务不断变化，接口和参数也会发生相应的变化。如果直接对原来的接口进行修改，势必会影响线上其他系统的正常运行。这就必须对api 接口进行有效的版本控制。

### 1.1 有哪些控制接口多版本的方式？

- 相同URL，用**不同的版本参数**区分

  - `api.pdai.tech/user?version=v1` 表示 v1版本的接口, 保持原有接口不动
  - `api.pdai.tech/user?version=v2` 表示 v2版本的接口，更新新的接口

  >http 加参数更灵活，随便加。
  >
  >但会多了很多if判断

- 区分**不同的接口域名**，不同的版本有不同的子域名, 路由到不同的实例:

  - `v1.api.pdai.tech/user` 表示 v1版本的接口, 保持原有接口不动, 路由到instance1
  - `v2.api.pdai.tech/user` 表示 v2版本的接口，更新新的接口, 路由到instance2

- 网关路由不同子目录到**不同的实例**（不同package也可以）

  - `api.pdai.tech/v1/user` 表示 v1版本的接口, 保持原有接口不动, 路由到instance1
  - `api.pdai.tech/v2/user` 表示 v2版本的接口，更新新的接口, 路由到instance2

- **同一实例**，**用注解隔离不同版本控制**

  - `api.pdai.tech/v1/user` 表示 v1版本的接口, 保持原有接口不动，匹配@ApiVersion("1")的handlerMapping
  - `api.pdai.tech/v2/user` 表示 v2版本的接口，更新新的接口，匹配@ApiVersion("2")的handlerMapping

  >无疑是最优雅的方式。也最推荐。
  >
  >但版本就会变成接口级别的，需要改动接口。如果只是部分接口要升级，还会导致出现多个接口版本

这里主要展示第四种单一实例中如何优雅的控制接口的版本。

>还有一种方式，就是直接加新接口。比如 getXxxV2 或 getXxxWithAbc。方法虽然土，但其实接地气

## 2. 实现案例

> 这个例子基于SpringBoot封装了@ApiVersion注解方式控制接口版本。

### 2.1 自定义@ApiVersion注解

```java
package tech.pdai.springboot.api.version.config.version;

import org.springframework.web.bind.annotation.Mapping;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface ApiVersion {
    String value();
}
```

### 2.2 定义版本匹配RequestCondition

版本匹配支持三层版本

- v1.1.1 （大版本.小版本.补丁版本）
- v1.1 (等同于v1.1.0)
- v1 （等同于v1.0.0)

>匹配比业务方API版本号小的中最大的一个版本号
>
>匹配比业务方API版本号小的中最大的一个版本号
>
>匹配比业务方API版本号小的中最大的一个版本号

```java
package tech.pdai.springboot.api.version.config.version;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.mvc.condition.RequestCondition;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class ApiVersionCondition implements RequestCondition<ApiVersionCondition> {

    /**
     * support v1.1.1, v1.1, v1; three levels .
     */
    private static final Pattern VERSION_PREFIX_PATTERN_1 = Pattern.compile("/v\\d\\.\\d\\.\\d/");
    private static final Pattern VERSION_PREFIX_PATTERN_2 = Pattern.compile("/v\\d\\.\\d/");
    private static final Pattern VERSION_PREFIX_PATTERN_3 = Pattern.compile("/v\\d/");
    private static final List<Pattern> VERSION_LIST = Collections.unmodifiableList(
            Arrays.asList(VERSION_PREFIX_PATTERN_1, VERSION_PREFIX_PATTERN_2, VERSION_PREFIX_PATTERN_3)
    );

    @Getter
    private final String apiVersion;

    public ApiVersionCondition(String apiVersion) {
        this.apiVersion = apiVersion;
    }

    /**
     * method priority is higher then class.
     *
     * @param other other
     * @return ApiVersionCondition
     */
    @Override
    public ApiVersionCondition combine(ApiVersionCondition other) {
        return new ApiVersionCondition(other.apiVersion);
    }

    @Override
    public ApiVersionCondition getMatchingCondition(HttpServletRequest request) {
        for (int vIndex = 0; vIndex < VERSION_LIST.size(); vIndex++) {
            Matcher m = VERSION_LIST.get(vIndex).matcher(request.getRequestURI());
            if (m.find()) {
                String version = m.group(0).replace("/v", "").replace("/", "");
                if (vIndex == 1) {
                    version = version + ".0";
                } else if (vIndex == 2) {
                    version = version + ".0.0";
                }
                if (compareVersion(version, this.apiVersion) >= 0) {
                    log.info("version={}, apiVersion={}", version, this.apiVersion);
                    return this;
                }
            }
        }
        return null;
    }

    @Override
    public int compareTo(ApiVersionCondition other, HttpServletRequest request) {
        return compareVersion(other.getApiVersion(), this.apiVersion);
    }

    private int compareVersion(String version1, String version2) {
        if (version1 == null || version2 == null) {
            throw new RuntimeException("compareVersion error:illegal params.");
        }
        String[] versionArray1 = version1.split("\\.");
        String[] versionArray2 = version2.split("\\.");
        int idx = 0;
        int minLength = Math.min(versionArray1.length, versionArray2.length);
        int diff = 0;
        while (idx < minLength
                && (diff = versionArray1[idx].length() - versionArray2[idx].length()) == 0
                && (diff = versionArray1[idx].compareTo(versionArray2[idx])) == 0) {
            ++idx;
        }
        diff = (diff != 0) ? diff : versionArray1.length - versionArray2.length;
        return diff;
    }
}

  
```

### 2.3 定义HandlerMapping

```java
package tech.pdai.springboot.api.version.config.version;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.mvc.condition.RequestCondition;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;

public class ApiVersionRequestMappingHandlerMapping extends RequestMappingHandlerMapping {

    /**
     * add @ApiVersion to controller class.
     *
     * @param handlerType handlerType
     * @return RequestCondition
     */
    @Override
    protected RequestCondition<?> getCustomTypeCondition(@NonNull Class<?> handlerType) {
        ApiVersion apiVersion = AnnotationUtils.findAnnotation(handlerType, ApiVersion.class);
        return null == apiVersion ? super.getCustomTypeCondition(handlerType) : new ApiVersionCondition(apiVersion.value());
    }

    /**
     * add @ApiVersion to controller method.
     *
     * @param method method
     * @return RequestCondition
     */
    @Override
    protected RequestCondition<?> getCustomMethodCondition(@NonNull Method method) {
        ApiVersion apiVersion = AnnotationUtils.findAnnotation(method, ApiVersion.class);
        return null == apiVersion ? super.getCustomMethodCondition(method) : new ApiVersionCondition(apiVersion.value());
    }

}
```

### 2.4 配置注册HandlerMapping

```java
package tech.pdai.springboot.api.version.config.version;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
public class CustomWebMvcConfiguration extends WebMvcConfigurationSupport {

    @Override
    public RequestMappingHandlerMapping createRequestMappingHandlerMapping() {
        return new ApiVersionRequestMappingHandlerMapping();
    }
}
```

或者实现WebMvcRegistrations的接口

```java
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer, WebMvcRegistrations {
    //...

    @Override
    @NonNull
    public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
        return new ApiVersionRequestMappingHandlerMapping();
    }

}
```

### 2.5 测试运行

controller

```java
package tech.pdai.springboot.api.version.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.pdai.springboot.api.version.config.version.ApiVersion;
import tech.pdai.springboot.api.version.entity.User;

/**
 * @author pdai
 */
@RestController
@RequestMapping("api/{v}/user")
public class UserController {

    @RequestMapping("get")
    public User getUser() {
        return User.builder().age(18).name("pdai, default").build();
    }

    @ApiVersion("1.0.0")
    @RequestMapping("get")
    public User getUserV1() {
        return User.builder().age(18).name("pdai, v1.0.0").build();
    }

    @ApiVersion("1.1.0")
    @RequestMapping("get")
    public User getUserV11() {
        return User.builder().age(19).name("pdai, v1.1.0").build();
    }

    @ApiVersion("1.1.2")
    @RequestMapping("get")
    public User getUserV112() {
        return User.builder().age(19).name("pdai2, v1.1.2").build();
    }
}

```

输出

```java
http://localhost:8080/api/v1/user/get
// {"name":"pdai, v1.0.0","age":18}

http://localhost:8080/api/v1.1/user/get
// {"name":"pdai, v1.1.0","age":19}

http://localhost:8080/api/v1.1.1/user/get
// {"name":"pdai, v1.1.0","age":19} 匹配比1.1.1小的中最大的一个版本号

http://localhost:8080/api/v1.1.2/user/get
// {"name":"pdai2, v1.1.2","age":19}

http://localhost:8080/api/v1.2/user/get
// {"name":"pdai2, v1.1.2","age":19} 匹配最大的版本号，v1.1.2


  
```

## 参考文章

[SpringBoot接口 - 如何提供多个版本接口](https://pdai.tech/md/spring/springboot/springboot-x-interface-version.html)