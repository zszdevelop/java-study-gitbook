# SpringBoot集成redis项目范例

## 1. 基础步骤

1. maven添加redis依赖

   ```xml
   <!--redis依赖配置-->
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
       <exclusions>
           <exclusion>
               <groupId>io.lettuce</groupId>
               <artifactId>lettuce-core</artifactId>
           </exclusion>
       </exclusions>
   </dependency>
   <dependency>
       <groupId>redis.clients</groupId>
       <artifactId>jedis</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

2. 添加yml 配置

   ```yml
   server:
     port: 8080
   spring:
     redis:
       database: 0
       host: localhost
       port: 6379
       password:
       timeout: 5000
   
   redis:
     database: case
     key:
       admin: 'ums:admin'
     expire:
       common: 86400 # 24小时
   ```

3.  添加redis配置

   ```java
   package com.zszdevelop.redisdemo.config;
   
   import com.fasterxml.jackson.annotation.JsonAutoDetect;
   import com.fasterxml.jackson.annotation.PropertyAccessor;
   import com.fasterxml.jackson.databind.ObjectMapper;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.data.redis.connection.RedisConnectionFactory;
   import org.springframework.data.redis.core.RedisTemplate;
   import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
   import org.springframework.data.redis.serializer.StringRedisSerializer;
   
   /**
    * @author: zsz
    * @create: 2021-01-05 16:32
    * @描述:
    **/
   @Configuration
   public class RedisConfigure {
   
       @Bean
       public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
           RedisTemplate<String, Object> template = new RedisTemplate<>();
           template.setConnectionFactory(factory);
   
           Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
           ObjectMapper mapper = new ObjectMapper();
           mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
   //        mapper.activateDefaultTyping(mapper.getPolymorphicTypeValidator(), ObjectMapper.DefaultTyping.NON_FINAL);
           jackson2JsonRedisSerializer.setObjectMapper(mapper);
   
           StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
           template.setKeySerializer(stringRedisSerializer);
           template.setHashKeySerializer(stringRedisSerializer);
           template.setValueSerializer(jackson2JsonRedisSerializer);
           template.setHashValueSerializer(jackson2JsonRedisSerializer);
           template.afterPropertiesSet();
   
           return template;
       }
   
   
   }
   
   
   ```

4. redisService

   ```java
   package com.zszdevelop.redisdemo.service;
   
   import java.util.List;
   import java.util.Map;
   import java.util.Set;
   
   /**
    * redis操作Service
    */
   public interface RedisService {
   
       /**
        * 保存属性
        */
       void set(String key, Object value, long time);
   
       /**
        * 保存属性
        */
       void set(String key, Object value);
   
       /**
        * 获取属性
        */
       Object get(String key);
   
       /**
        * 删除属性
        */
       Boolean del(String key);
   
       /**
        * 批量删除属性
        */
       Long del(List<String> keys);
   
       /**
        * 设置过期时间
        */
       Boolean expire(String key, long time);
   
       /**
        * 获取过期时间
        */
       Long getExpire(String key);
   
       /**
        * 判断是否有该属性
        */
       Boolean hasKey(String key);
   
       /**
        * 按delta递增
        */
       Long incr(String key, long delta);
   
       /**
        * 按delta递减
        */
       Long decr(String key, long delta);
   
       /**
        * 获取Hash结构中的属性
        */
       Object hGet(String key, String hashKey);
   
       /**
        * 向Hash结构中放入一个属性
        */
       Boolean hSet(String key, String hashKey, Object value, long time);
   
       /**
        * 向Hash结构中放入一个属性
        */
       void hSet(String key, String hashKey, Object value);
   
       /**
        * 直接获取整个Hash结构
        */
       Map<Object, Object> hGetAll(String key);
   
       /**
        * 直接设置整个Hash结构
        */
       Boolean hSetAll(String key, Map<String, Object> map, long time);
   
       /**
        * 直接设置整个Hash结构
        */
       void hSetAll(String key, Map<String, ?> map);
   
       /**
        * 删除Hash结构中的属性
        */
       void hDel(String key, Object... hashKey);
   
       /**
        * 判断Hash结构中是否有该属性
        */
       Boolean hHasKey(String key, String hashKey);
   
       /**
        * Hash结构中属性递增
        */
       Long hIncr(String key, String hashKey, Long delta);
   
       /**
        * Hash结构中属性递减
        */
       Long hDecr(String key, String hashKey, Long delta);
   
       /**
        * 获取Set结构
        */
       Set<Object> sMembers(String key);
   
       /**
        * 向Set结构中添加属性
        */
       Long sAdd(String key, Object... values);
   
       /**
        * 向Set结构中添加属性
        */
       Long sAdd(String key, long time, Object... values);
   
       /**
        * 是否为Set中的属性
        */
       Boolean sIsMember(String key, Object value);
   
       /**
        * 获取Set结构的长度
        */
       Long sSize(String key);
   
       /**
        * 删除Set结构中的属性
        */
       Long sRemove(String key, Object... values);
   
       /**
        * 获取List结构中的属性
        */
       List<Object> lRange(String key, long start, long end);
   
       /**
        * 获取List结构的长度
        */
       Long lSize(String key);
   
       /**
        * 根据索引获取List中的属性
        */
       Object lIndex(String key, long index);
   
       /**
        * 向List结构中添加属性
        */
       Long lPush(String key, Object value);
   
       /**
        * 向List结构中添加属性
        */
       Long lPush(String key, Object value, long time);
   
       /**
        * 向List结构中批量添加属性
        */
       Long lPushAll(String key, Object... values);
   
       /**
        * 向List结构中批量添加属性
        */
       Long lPushAll(String key, Long time, Object... values);
   
       /**
        * 从List结构中移除属性
        */
       Long lRemove(String key, long count, Object value);
   }
   ```

5. RedisService实现类

   ```java
   package com.zszdevelop.redisdemo.service.impl;
   
   
   import com.zszdevelop.redisdemo.service.RedisService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.data.redis.core.RedisTemplate;
   import org.springframework.stereotype.Service;
   
   import java.util.List;
   import java.util.Map;
   import java.util.Set;
   import java.util.concurrent.TimeUnit;
   
   /**
    * redis操作实现类
    */
   @Service
   public class RedisServiceImpl implements RedisService {
       @Autowired
       private RedisTemplate<String, Object> redisTemplate;
   
       @Override
       public void set(String key, Object value, long time) {
           redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
       }
   
       @Override
       public void set(String key, Object value) {
           redisTemplate.opsForValue().set(key, value);
       }
   
       @Override
       public Object get(String key) {
           return redisTemplate.opsForValue().get(key);
       }
   
       @Override
       public Boolean del(String key) {
           return redisTemplate.delete(key);
       }
   
       @Override
       public Long del(List<String> keys) {
           return redisTemplate.delete(keys);
       }
   
       @Override
       public Boolean expire(String key, long time) {
           return redisTemplate.expire(key, time, TimeUnit.SECONDS);
       }
   
       @Override
       public Long getExpire(String key) {
           return redisTemplate.getExpire(key, TimeUnit.SECONDS);
       }
   
       @Override
       public Boolean hasKey(String key) {
           return redisTemplate.hasKey(key);
       }
   
       @Override
       public Long incr(String key, long delta) {
           return redisTemplate.opsForValue().increment(key, delta);
       }
   
       @Override
       public Long decr(String key, long delta) {
           return redisTemplate.opsForValue().increment(key, -delta);
       }
   
       @Override
       public Object hGet(String key, String hashKey) {
           return redisTemplate.opsForHash().get(key, hashKey);
       }
   
       @Override
       public Boolean hSet(String key, String hashKey, Object value, long time) {
           redisTemplate.opsForHash().put(key, hashKey, value);
           return expire(key, time);
       }
   
       @Override
       public void hSet(String key, String hashKey, Object value) {
           redisTemplate.opsForHash().put(key, hashKey, value);
       }
   
       @Override
       public Map<Object, Object> hGetAll(String key) {
           return redisTemplate.opsForHash().entries(key);
       }
   
       @Override
       public Boolean hSetAll(String key, Map<String, Object> map, long time) {
           redisTemplate.opsForHash().putAll(key, map);
           return expire(key, time);
       }
   
       @Override
       public void hSetAll(String key, Map<String, ?> map) {
           redisTemplate.opsForHash().putAll(key, map);
       }
   
       @Override
       public void hDel(String key, Object... hashKey) {
           redisTemplate.opsForHash().delete(key, hashKey);
       }
   
       @Override
       public Boolean hHasKey(String key, String hashKey) {
           return redisTemplate.opsForHash().hasKey(key, hashKey);
       }
   
       @Override
       public Long hIncr(String key, String hashKey, Long delta) {
           return redisTemplate.opsForHash().increment(key, hashKey, delta);
       }
   
       @Override
       public Long hDecr(String key, String hashKey, Long delta) {
           return redisTemplate.opsForHash().increment(key, hashKey, -delta);
       }
   
       @Override
       public Set<Object> sMembers(String key) {
           return redisTemplate.opsForSet().members(key);
       }
   
       @Override
       public Long sAdd(String key, Object... values) {
           return redisTemplate.opsForSet().add(key, values);
       }
   
       @Override
       public Long sAdd(String key, long time, Object... values) {
           Long count = redisTemplate.opsForSet().add(key, values);
           expire(key, time);
           return count;
       }
   
       @Override
       public Boolean sIsMember(String key, Object value) {
           return redisTemplate.opsForSet().isMember(key, value);
       }
   
       @Override
       public Long sSize(String key) {
           return redisTemplate.opsForSet().size(key);
       }
   
       @Override
       public Long sRemove(String key, Object... values) {
           return redisTemplate.opsForSet().remove(key, values);
       }
   
       @Override
       public List<Object> lRange(String key, long start, long end) {
           return redisTemplate.opsForList().range(key, start, end);
       }
   
       @Override
       public Long lSize(String key) {
           return redisTemplate.opsForList().size(key);
       }
   
       @Override
       public Object lIndex(String key, long index) {
           return redisTemplate.opsForList().index(key, index);
       }
   
       @Override
       public Long lPush(String key, Object value) {
           return redisTemplate.opsForList().rightPush(key, value);
       }
   
       @Override
       public Long lPush(String key, Object value, long time) {
           Long index = redisTemplate.opsForList().rightPush(key, value);
           expire(key, time);
           return index;
       }
   
       @Override
       public Long lPushAll(String key, Object... values) {
           return redisTemplate.opsForList().rightPushAll(key, values);
       }
   
       @Override
       public Long lPushAll(String key, Long time, Object... values) {
           Long count = redisTemplate.opsForList().rightPushAll(key, values);
           expire(key, time);
           return count;
       }
   
       @Override
       public Long lRemove(String key, long count, Object value) {
           return redisTemplate.opsForList().remove(key, count, value);
       }
   }
   
   ```

## 2. 缓存操作

1. 用户信息缓存接口 UmsAdminCacheService 

   ```
   package com.zszdevelop.redisdemo.service;
   
   /**
    * @author: zsz
    * @create: 2021-01-05 16:39
    * @描述:
    **/
   
   import com.zszdevelop.redisdemo.domain.UmsAdmin;
   
   import java.util.List;
   
   /**
    * 后台用户缓存操作类
    */
   public interface UmsAdminCacheService {
       /**
        * 删除后台用户缓存
        */
       void delAdmin(Long adminId);
   
   
   
       /**
        * 获取缓存后台用户信息
        */
       UmsAdmin getAdmin(String username);
   
       /**
        * 设置缓存后台用户信息
        */
       void setAdmin(UmsAdmin admin);
   }
   
   ```

2. 用户信息缓存接口实现类 UmsAdminCacheServiceImpl

   ```java
   package com.zszdevelop.redisdemo.service.impl;
   
   import com.zszdevelop.redisdemo.domain.UmsAdmin;
   import com.zszdevelop.redisdemo.service.RedisService;
   import com.zszdevelop.redisdemo.service.UmsAdminCacheService;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Service;
   
   import java.util.List;
   import java.util.stream.Collectors;
   
   /**
    * UmsAdminCacheService实现类
    */
   @Service
   public class UmsAdminCacheServiceImpl implements UmsAdminCacheService {
       @Autowired
       private UmsAdminService adminService;
       @Autowired
       private RedisService redisService;
       @Value("${redis.database}")
       private String REDIS_DATABASE;
       @Value("${redis.expire.common}")
       private Long REDIS_EXPIRE;
       @Value("${redis.key.admin}")
       private String REDIS_KEY_ADMIN;
       @Value("${redis.key.resourceList}")
       private String REDIS_KEY_RESOURCE_LIST;
   
       @Override
       public void delAdmin(Long adminId) {
           UmsAdmin admin = adminService.getItem(adminId);
           if (admin != null) {
               String key = REDIS_DATABASE + ":" + REDIS_KEY_ADMIN + ":" + admin.getUsername();
               redisService.del(key);
           }
       }
   
   
   
       @Override
       public UmsAdmin getAdmin(String username) {
           String key = REDIS_DATABASE + ":" + REDIS_KEY_ADMIN + ":" + username;
           return (UmsAdmin) redisService.get(key);
       }
   
       @Override
       public void setAdmin(UmsAdmin admin) {
           String key = REDIS_DATABASE + ":" + REDIS_KEY_ADMIN + ":" + admin.getUsername();
           redisService.set(key, admin, REDIS_EXPIRE);
       }
   
   }
   
   ```

3. 具体业务中保存(仅供参考，关联业务太多)

   ```java
   @Service
   public class UmsAdminServiceImpl implements UmsAdminService {
       private static final Logger LOGGER = LoggerFactory.getLogger(UmsAdminServiceImpl.class);
    
       @Override
       public UmsAdmin getAdminByUsername(String username) {
           UmsAdmin admin = adminCacheService.getAdmin(username);
           if(admin!=null) return  admin;
           UmsAdminExample example = new UmsAdminExample();
           example.createCriteria().andUsernameEqualTo(username);
           List<UmsAdmin> adminList = adminMapper.selectByExample(example);
           if (adminList != null && adminList.size() > 0) {
               admin = adminList.get(0);
               adminCacheService.setAdmin(admin);
               return admin;
           }
           return null;
       }
       }
   ```

   

