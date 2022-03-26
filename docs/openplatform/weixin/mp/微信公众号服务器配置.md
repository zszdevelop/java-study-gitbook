# 微信公众号服务器配置

## 2. 微信公众号开发配置

### 2.1 启用开发者密码(AppSecret)

![image-20210714220035713](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210714220035713.png)

扫码后查看秘钥

![image-20210714220452945](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210714220452945.png)

### 2.2 服务器配置

![image-20210714220726635](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210714220726635.png)

编辑服务器信息

![image-20210714220930180](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20210714220930180.png)

1. Url 是之后的服务器信息

   因为需要外网能访问，所以需要使用到内网穿透，可以使用natapp来映射[natapp参考文章](cs/skill/内网穿透/内网穿透之natapp使用.md)

2. token随便填写

**提交需要等到服务启动完成后**

## 3. 集成使用

### 3.1 依赖

```xml
<!--微信公众号工具-->
<dependency>
    <groupId>com.github.binarywang</groupId>
    <artifactId>weixin-java-mp</artifactId>
    <version>4.0.0</version>
</dependency>

```

### 3.2 WxController

```java
package com.zszdevelop.wxdemo.controller;

import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import me.chanjar.weixin.mp.config.WxMpConfigStorage;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@Slf4j
@RestController
@RequestMapping("/wx")
public class WxController {

    //
    @Resource
    private WxMpService wxMpService;
    @Resource
    private WxMpMessageRouter wxMpMessageRouter;
    @Resource
    private WxMpConfigStorage wxMpConfigStorage;

    @RequestMapping
    public void authGet(HttpServletRequest request, HttpServletResponse response) throws Exception {

        response.setContentType("text/html;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);

        String signature = request.getParameter("signature");
        String nonce = request.getParameter("nonce");
        String timestamp = request.getParameter("timestamp");

        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String key = parameterNames.nextElement();
            log.error("微信发来的参数：" + key + ">>>>>" + request.getParameter(key));
        }


        if (!this.wxMpService.checkSignature(timestamp, nonce, signature)) {
            // 消息签名不正确，说明不是公众平台发过来的消息
            response.getWriter().println("非法请求");
            return;
        }

        String echostr = request.getParameter("echostr");
        if (StringUtils.isNotBlank(echostr)) {
            // 说明是一个仅仅用来验证的请求，回显echostr
            response.getWriter().println(echostr);
            return;
        }

        String encryptType = StringUtils.isBlank(request.getParameter("encrypt_type")) ?
                "raw" :
                request.getParameter("encrypt_type");

        if ("raw".equals(encryptType)) {
            // 明文传输的消息
            WxMpXmlMessage inMessage = WxMpXmlMessage.fromXml(request.getInputStream());
            WxMpXmlOutMessage outMessage = this.wxMpMessageRouter.route(inMessage);
            if (outMessage != null) {
                response.getWriter().write(outMessage.toXml());
            }

            String toUser = inMessage.getToUser();
            //fromUserName 就是openId
            String fromUserOpenId = inMessage.getFromUser();
            String ticket = inMessage.getTicket();
            String event = inMessage.getEvent();
            String eventKey = inMessage.getEventKey();

            WxMpUser user = this.wxMpService.getUserService()
                    .userInfo(fromUserOpenId, null);


            // 扫码事件
            if ("SCAN".equals(event)) {
            }else if ("subscribe".equals(event)) {

            }

            return;
        }

        if ("aes".equals(encryptType)) {
            // 是aes加密的消息
            String msgSignature = request.getParameter("msg_signature");
            WxMpXmlMessage inMessage = WxMpXmlMessage.fromEncryptedXml(request.getInputStream(), this.wxMpConfigStorage, timestamp, nonce, msgSignature);
            WxMpXmlOutMessage outMessage = this.wxMpMessageRouter.route(inMessage);
            response.getWriter().write(outMessage.toEncryptedXml(this.wxMpConfigStorage));
            return;
        }

        response.getWriter().println("不可识别的加密类型");
        return;
    }


}

```



### 3.3 WxConfig

```java
package com.zszdevelop.wxdemo.config;

import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;
import me.chanjar.weixin.mp.config.WxMpConfigStorage;
import me.chanjar.weixin.mp.config.impl.WxMpDefaultConfigImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

@Configuration
public class WxConfig {

    @Resource
    WxMpProperties wxMpProperties;

    @Bean
    public WxMpConfigStorage getWxMpConfigStorage() {
        WxMpDefaultConfigImpl config = new WxMpDefaultConfigImpl();
        // 设置微信公众号的appid
        config.setAppId(wxMpProperties.getAppId());
        // 设置微信公众号的app corpSecret
        config.setSecret(wxMpProperties.getSecret());
        // 设置微信公众号的token
        config.setToken(wxMpProperties.getToken());
        // 设置微信公众号的EncodingAESKey
        config.setAesKey(wxMpProperties.getAesKey());
        return config;
    }


    @Bean
    public WxMpService getWxMpService() {
        WxMpConfigStorage config = getWxMpConfigStorage();
        WxMpService wxService = new WxMpServiceImpl();
        wxService.setWxMpConfigStorage(config);
        return wxService;
    }

    @Bean
    public WxMpMessageRouter getWxMpMessageRouter() {
        WxMpMessageRouter wxMpMessageRouter = new WxMpMessageRouter(getWxMpService());
        return wxMpMessageRouter;
    }
}
```

### 3.4 WxMpProperties

```java
package com.zszdevelop.wxdemo.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "wx.mp")
public class WxMpProperties {

    String appId;
    String secret;
    String token;
    String aesKey;

}

```

### 3.5 application.yml

```yml
server:
  port: 8089

wx:
  mp:
    appId: wx41f3d2xxxxx
    secret: 54d21f829e33b0df7xxxx
    token: yxxx
    aesKey: KFDg3J0YPQoY5tGTwoO4OEZu2xxxxx
```

### 3.6 运行测试

1. 将项目运行起来

2. 确认服务器配置

3. 接收到微信发来的认证信息

   ![image-20210714222128569](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210714222128569.png)
