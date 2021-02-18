# Redis缓存场景

## 1. 缓存加载时机

- 当应用初始化完成时加载
- 缓存数据更新时加载

## 2. 缓存使用

### 2.1 CacheService 接口

定义缓存接口

```JAVA
public interface CacheService {

    /**
     * 从缓存中获取用户
     *
     * @param username 用户名
     * @return User
     */
    User getUser(String username) ;

    /**
     * 缓存用户信息
     *
     * @param username 用户名
     */
    void saveUser(String username);

    /**
     * 删除用户信息
     *
     * @param username 用户名
     */
    void deleteUser(String username) throws Exception;
}
```

### 2.2 CacheServiceImpl 实现类

```java
@Service
public class CacheServiceImpl implements CacheService {

    @Autowired
    RedisUtil redisUtil;
    @Autowired
    private UserService userService;

    @Override
    public User getUser(String username)  {
        User user = (User) redisUtil.getObject(MyConstant.USER_CACHE_PREFIX+username);
        return user;
    }

    @Override
    public void saveUser(String username) {
        User user = userService.findByName(username);
        this.deleteUser(username);
        redisUtil.set(MyConstant.USER_CACHE_PREFIX+username,user);
    }

    @Override
    public void deleteUser(String username) {
        username = username.toLowerCase();
        redisUtil.delete(MyConstant.USER_CACHE_PREFIX+username);
    }
}
```

### 2.3 RedisUtil 工具类

```JAVA
@Component
public class RedisUtil {

    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    /**
     * 设置 String 类型 key-value
     *
     * @param key
     * @param value
     */
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }


    /**
     * 获取 String 类型 key-value
     *
     * @param key
     * @return
     */
    public Object getObject(String key) {
        return  redisTemplate.opsForValue().get(key);
    }

    /**
     * 获取 String 类型 key-value
     *
     * @param key
     * @return
     */
    public String get(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    /**
     * 删除key
     *
     * @param key
     */
    public void delete(String key) {
        redisTemplate.delete(key);
    }
    
}
```

### 2.3 MyConstant 定义前缀

```java
public interface MyConstant {

    String USER_CACHE_PREFIX = "app.platform.cache.user.";
}
```

### 2.4 UserManager 定义管理类

```java
package com.zszdevelop.springredisdemo.manage;

import com.zszdevelop.springredisdemo.domain.User;
import com.zszdevelop.springredisdemo.function.CacheSelector;
import com.zszdevelop.springredisdemo.service.CacheService;
import com.zszdevelop.springredisdemo.service.UserService;
import com.zszdevelop.springredisdemo.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 封装一些和 User相关的业务操作
 * @author zhangshengzhong
 * @date 2019/10/5
 */
@Service
public class UserManager {

    @Autowired
    private CacheService cacheService;
    @Autowired
    private UserService userService;


    /**
     * 通过用户名获取用户基本信息
     *
     * @param username 用户名
     * @return 用户基本信息
     */
    public User getUser(String username) {
        User user = cacheService.getUser(username);
        if (user == null){
            user = this.userService.findByName(username)
        }
        return user;
    }

}
```