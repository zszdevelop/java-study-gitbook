# Redis在线人数场景（zset）

- 在登录的时候将在线人数和过期时间记录下来
- 退出或踢出时，将在线信息与token 信息去除
- 获取在线人数，将未过期的全部用户列出

## 2. 具体实现

### 2.1 LoginController

```java
package com.zszdevelop.springredisdemo.controller;

import com.zszdevelop.springredisdemo.MyConstant;
import com.zszdevelop.springredisdemo.domain.ActiveUser;
import com.zszdevelop.springredisdemo.domain.JWTToken;
import com.zszdevelop.springredisdemo.domain.User;
import com.zszdevelop.springredisdemo.service.UserService;
import com.zszdevelop.springredisdemo.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

/**
 * @author zhangshengzhong
 * @date 2019/10/6
 */
@Validated
@RestController
@RequestMapping
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    RedisUtil redisUtil;

    @PostMapping("/login")
    public void login(@NotBlank(message = "{required}") String username,
                      @NotBlank(message = "{required}") String password){
        // TODO 登录逻辑
        User user = this.userManager.getUser(username);
        // TODO 生成token
        String token = signToken(username, password);
        // 默认过期时间为1天
        long expireTime = System.currentTimeMillis()+24*60*1000*1000;
        JWTToken jwtToken = new JWTToken(token, expireTime);
        saveTokenToRedis(user,jwtToken);
    }

    private void saveTokenToRedis(User user, JWTToken token) {
        String ip = "TODO";
        // 构建在线用户
        ActiveUser activeUser = new ActiveUser();
        activeUser.setUsername(user.getUsername());
        activeUser.setIp(ip);
        activeUser.setToken(token.getToken());

        // zset 存储登录用户，score 为过期时间戳
        this.redisUtil.zAdd(MyConstant.ACTIVE_USERS_ZSET_PREFIX,  activeUser,token.getExipreAt());

    }

    @GetMapping("logout/{id}")
    public void logout(@NotBlank(message = "{required}") @PathVariable String id) throws Exception {
        this.kickout(id);
    }

    @DeleteMapping("kickout/{id}")
    public void kickout(@NotBlank(message = "{required}") @PathVariable String id) throws Exception {
        long now = System.currentTimeMillis();
        Set<Object> userOnlineStringSet = redisUtil.zRange(MyConstant.ACTIVE_USERS_ZSET_PREFIX, now, -1L);
        ActiveUser kickoutUser = null;
        Object kickoutUserString = null;
        for (Object userOnlineString : userOnlineStringSet) {
            ActiveUser activeUser = (ActiveUser) userOnlineString;
            if (Objects.equals(activeUser.getId(), id)) {
                kickoutUser = activeUser;
                kickoutUserString = userOnlineString;
            }
        }
        if (kickoutUser != null && StringUtils.isEmpty(kickoutUserString)) {
            // 删除 zset中的记录
            redisUtil.zRemove(MyConstant.ACTIVE_USERS_ZSET_PREFIX, kickoutUserString);
        }
    }

    @GetMapping("online")
    public Set<Object> userOnline(){
        long now = System.currentTimeMillis();
        Set<Object> userOnlineStringSet = redisUtil.zRange(MyConstant.ACTIVE_USERS_ZSET_PREFIX, now, -1L);

        return userOnlineStringSet;
    }
}
```