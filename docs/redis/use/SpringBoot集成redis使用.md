# Spring Boot集成redis使用

## 1. 基本集成使用

### 1.1 引入依赖

```java
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 1.2 配置参数

在`application.yml`中加入redis服务端的相关配置

```
spring:
  redis:
    host: 120.79.200.111
    port: 6379
    password:
    timeout: 200
```

### 1.3 访问测试

编写测试用例

```
@RunWith(SpringRunner.class)
@SpringBootTest
public class RedisdemoApplicationTests {

   @Test
   public void contextLoads() {
   }

   @Autowired
   private StringRedisTemplate stringRedisTemplate;

   @Test
   public void test() throws Exception {
      // 保存字符串
      stringRedisTemplate.opsForValue().set("aaa", "111");
      Assert.assertEquals("111", stringRedisTemplate.opsForValue().get("aaa"));
   }

}
```

通过上面这段极为简单的测试案例演示了如何通过自动配置的`StringRedisTemplate`对象进行Redis的读写操作，该对象从命名中就可注意到支持的是String类型。如果有使用过spring-data-redis的开发者一定熟悉`RedisTemplate<K, V>`接口，`StringRedisTemplate`就相当于`RedisTemplate<String, String>`的实现。

## 2. 使用jedis客户端

在`spring-boot-starter-data-redis` 中默认使用`lettuce`客户端，我们可以改成使用jedis客户端

### 2.1 添加依赖

```
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
   <!-- 排除lettuce包，使用jedis代替-->
   <exclusions>
      <exclusion>
         <groupId>io.lettuce</groupId>
         <artifactId>lettuce-core</artifactId>
      </exclusion>
   </exclusions>
</dependency>

<!-- fastjson -->
<dependency>
   <groupId>com.alibaba</groupId>
   <artifactId>fastjson</artifactId>
   <version>1.2.31</version>
</dependency>

<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-pool2</artifactId>
	<optional>true</optional>
</dependency>


<dependency>
   <groupId>redis.clients</groupId>
   <artifactId>jedis</artifactId>
</dependency>
```

### 2.2 application.yml配置

```yml
spring:
  redis:
    host: 120.79.200.111
    port: 6379
    password:
    jedis:
      pool:
        min-idle: 8
        max-idle: 500
        max-active: 2000
        max-wait: 10000
    timeout: 0
```

### 2.3 Redis配置实例

使用Jackson2JsonRedisSerialize 替换默认序列化，这样就可以直接存储对象

```java
package com.zszdevelop.redisdemo02;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.util.StringUtils;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.time.Duration;

/**
 * @author zhangshengzhong
 * @date 2019/10/5
 */

@Configuration
public class RedisConfig {


    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.password}")
    private String password;

    @Value("${spring.redis.timeout}")
    private int timeout;

    @Value("${spring.redis.jedis.pool.max-idle}")
    private int maxIdle;

    @Value("${spring.redis.jedis.pool.max-wait}")
    private long maxWaitMillis;

    @Bean
    public JedisPool redisPoolFactory() {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMaxWaitMillis(maxWaitMillis);
        if (!StringUtils.isEmpty(password)){
            return new JedisPool(jedisPoolConfig, host, port, timeout, password);}
        else{
            return new JedisPool(jedisPoolConfig, host, port, timeout);}
    }

    @Bean
    JedisConnectionFactory jedisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPort(port);
        redisStandaloneConfiguration.setPassword(RedisPassword.of(password));

        JedisClientConfiguration.JedisClientConfigurationBuilder jedisClientConfiguration = JedisClientConfiguration.builder();
        jedisClientConfiguration.connectTimeout(Duration.ofMillis(timeout));
        jedisClientConfiguration.usePooling();
        return new JedisConnectionFactory(redisStandaloneConfiguration, jedisClientConfiguration.build());
    }

    @Bean(name = "redisTemplate")
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 使用Jackson2JsonRedisSerialize 替换默认序列化
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);

        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        // 设置value的序列化规则和 key的序列化规则
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

}
```

### 2.4 定义测试类

需要实现Serializable 和 实现默认构造器

```
public class User implements Serializable{
    private static final long serialVersionUID = -1L;

    private String username;
    private Integer age;

    public User() {
    }

    public User(String username, Integer age) {
        this.username = username;
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

### 2.5 测试

```
@RunWith(SpringRunner.class)
@SpringBootTest
public class Redisdemo02ApplicationTests {

   @Test
   public void contextLoads() {
   }

   @Autowired
   private RedisTemplate<Object, Object> template;

   @Test
   public void tests() {
      User user = new User("象拔蚌ceside",1);
      template.opsForValue().set(user.getUsername(),user);
      //原本opsForValue()是只能操作字符串的.现在就可以操作对象了
      User result = (User) template.opsForValue().get(user.getUsername());
      System.out.println(result.toString());
   }
}
```