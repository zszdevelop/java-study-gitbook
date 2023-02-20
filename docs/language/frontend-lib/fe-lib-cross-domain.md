# 前后端分离项目跨域解决

## 1. 什么是跨域

> **跨域**是指 不同域名之间相互访问。即浏览器控制当前网页下不能执行其他网站的脚本，这是由浏览器的同源策略造成的，是浏览器对JavaScript施加的安全限制。

也就是如果在A网站中，我们希望使用Ajax来获得B网站中的特定内容
如果A网站与B网站不在同一个域中，那么就出现了跨域访问问题。

**跨域的安全限制都是对浏览器端来说的，服务器端是不存在跨域安全限制的。**

## 2. 同源策略

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。
前端发起的请求只要不符合同源策略就会出现跨域问题。

**案例分析**

![image-20211017111604402](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211017111604402.png)

## 3. 为什么前后端分离后会导致跨域问题？

前后端分离后，前端代码和后端代码都是独立部署的，一般前端采用Nginx作为web服务器部署，后端spring boot由于内置了tomcat，一般都是通过jar包直接启动。

- 假设前后端部署在同一台服务器上，那么2者访问的端口必定不一致，不符合同源策略，所以出现跨域问题。
- 如果前后端部署在不同服务器上，那么访问的ip或者域名必然不一致，也会出现跨域问题。

## 4. 解决

### 4.1 利用Nginx解决跨域

通过反向代理服务器监听同端口，同域名的访问，不同路径映射到不同的地址，比如，在nginx服务器中，监听同一个域名和端口，不同路径转发到客户端和服务器，把不同端口和域名的限制通过反向代理，来解决跨域的问题。

通过Nginx反向代理，将跨域请求转变为非跨域请求，不同请求路径代理到不同的地址：

```nginx
    server {
        listen          80;
        server_name     www.mysite.com;
        location / {
            #allow all;
            root   /mysite/my-web/;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location /prod-api/ {
            #allow all;
            rewrite  ^/prod-api/(.*)$ /$1 break;
            proxy_pass http://localhost:9602;
        }
        
    }
```

### 4.2 服务端不设置跨域

违法了跨域原则，不安全。但是非常好用，快速解决

```java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {


    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
                // SpringBoot 2.4.0后 此方法已失效
//        config.setAllowedOrigins(Arrays.asList("*")); //http:www.a.com
        // 新版本的springboot 采用此方法
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setMaxAge(300L);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

```



## 参考文章

[Spring boot前后端分离后，跨域问题怎么解决？](https://blog.csdn.net/w1014074794/article/details/106226429)

