# 微信公众号-网页授权-微信扫码登录实现

>文章基于上一篇配置，请先集成配置

## 1.简介

为了满足用户渠道推广分析和用户帐号绑定等场景的需要，公众平台提供了生成带参数二维码的接口。使用该接口可以获得多个带不同场景值的二维码，用户扫描后，公众号可以接收到事件推送。

### 1.1 两种二维码类型

1. 临时二维码，是有过期时间的，最长可以设置为在二维码生成后的30天（即2592000秒）后过期，但能够生成较多数量。临时二维码主要用于帐号绑定等不要求二维码永久保存的业务场景
2. 永久二维码，是无过期时间的，但数量较少（目前为最多10万个）。永久二维码主要用于适用于帐号绑定、用户来源统计等场景。

### 1.2 扫码推送的两种事件

用户扫描带场景值二维码时，可能推送以下两种事件：

- 如果用户还未关注公众号，则用户可以关注公众号，关注后微信会将带场景值关注事件推送给开发者。

- 如果用户已经关注公众号，在用户扫描后会自动进入会话，微信也会将带场景值扫描事件推送给开发者。

### 1.3 集成思路

获取带参数的二维码的过程包括两步，

1. 首先创建二维码ticke
2. 然后凭借ticket到指定URL换取二维码。

#### 1.3.1 **创建二维码ticket**

每次创建二维码ticket需要提供一个开发者自行设定的参数（scene_id），分别介绍临时二维码和永久二维码的创建二维码ticket过程。

1. 临时二维码

```java
 // 临时ticket
        WxMpQrCodeTicket ticket = wxMpService.getQrcodeService().qrCodeCreateTmpTicket(SCENE_SCAN_LOGIN, null);
```

2. 永久二维码

```java
// 永久二维码
        WxMpQrCodeTicket ticket = wxMpService.getQrcodeService().qrCodeCreateLastTicket(SCENE_SCAN_LOGIN);
       
```

#### 1.3.2**通过ticket换取二维码**

获取二维码ticket后，开发者可用ticket换取二维码图片。请注意，本接口无须登录态即可调用。

```java
 String qrCodeUrl = wxMpService.getQrcodeService().qrCodePictureUrl(ticket.getTicket());
```



## 2. 代码实现

### 2.1 WxAuthController 获取微信授权认证二维码

```java
@Slf4j
@RestController
@RequestMapping("/wx/auth")
public class WxAuthController extends BaseController
{

    @Resource
    private WxAuthService wxAuthService;


    @GetMapping("/getQRCode")
    public AjaxResult getQRCode() {
        QRCodeResponse qrCode = wxAuthService.getQRCode();
        return AjaxResult.success(qrCode);
    }

    @GetMapping("/getAuthInfo")
    public AjaxResult getAuthInfo( String uuid) {
        WxAuthResponse wxAuthResponse =   wxAuthService.getAuthInfo(uuid);
        return AjaxResult.success(wxAuthResponse);
    }
}


```

### 2.2 WxAuthServiceImpl

```java

@Slf4j
@Service
public class WxAuthServiceImpl implements WxAuthService {
    @Resource
    WxMpService wxMpService;
    @Resource
    WxUserService wxUserService;
    @Resource
    RedisCache redisCache;

    @Override
    public QRCodeResponse getQRCode() {
        try {
            // 临时ticket
            WxMpQrCodeTicket qrTicket = wxMpService.getQrcodeService().qrCodeCreateTmpTicket(BusinessConstant.SCENE_SCAN_LOGIN, null);
            String ticket = qrTicket.getTicket();
            String qrUrl = wxMpService.getQrcodeService().qrCodePictureUrl(ticket);
            log.error("二维码url：" + qrUrl);

            String uuid = IdUtils.fastSimpleUUID();
            String cacheKey = Constants.WX_SCAN_LOGIN_TOKEN_KEY + uuid;
            redisCache.setCacheObject(cacheKey, ticket, Constants.CAPTCHA_EXPIRATION, TimeUnit.MINUTES);

            QRCodeResponse response = new QRCodeResponse();
            response.setQrUrl(qrUrl);
            response.setUuid(uuid);
            return response;

        } catch (Exception e) {
            log.error("生成扫码登录图片异常:"+e.getMessage());
            throw new CustomException("生成扫码登录图片异常:");
        }

    }

    @Override
    public WxAuthResponse getAuthInfo(String uuid) {
        String cacheKey = Constants.WX_SCAN_LOGIN_TOKEN_KEY + uuid;
        String ticket = redisCache.getCacheObject(cacheKey);
        if (StringUtils.isEmpty(ticket)){
            throw new CustomException("您还未登录，请先扫码登录",NO_LOGIN);
        }

        WxUser queryWxUser = new WxUser();
        queryWxUser.setTicket(ticket);
        List<WxUser> wxUsers = wxUserService.selectWxUserList(queryWxUser);
        if (wxUsers.isEmpty()) {
            throw new CustomException("您还未登录，请先扫码登录",NO_LOGIN);
        }
        if (wxUsers.size() > 1) {
            throw new CustomException("重复登录",NO_LOGIN);
        }
        WxUser wxUser = wxUsers.get(0);
        WxAuthResponse wxAuthResponse = new WxAuthResponse();
        BeanUtils.copyProperties(wxUser, wxAuthResponse);

        return wxAuthResponse;
    }


}

```

### 2.3 WxController

```java

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
    @Resource
    private TemplateMsgService templateMsgService;
    @Resource
    WxUserService wxUserService;
    @Resource
    WxAuthService wxAuthService;


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

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
            rawMessage(request, response);
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

    /**
     * 明文数据解析
     */
    private void rawMessage(HttpServletRequest request, HttpServletResponse response) throws IOException, WxErrorException {
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

        log.error("微信事件："+ event);
        log.error("微信ticket："+ ticket);

        // 扫码事件
        if ("SCAN".equals(event)) {
            if (eventKey.equals(BusinessConstant.SCENE_SCAN_LOGIN)) {
                saveWxUser(fromUserOpenId,ticket);
            }
        }else if ("subscribe".equals(event)) {
            saveWxUser(fromUserOpenId,ticket);
        }
    }

    private void saveWxUser(String fromUserOpenId,String ticket) throws WxErrorException {
        WxMpUser user = this.wxMpService.getUserService()
                .userInfo(fromUserOpenId, null);
        WxUser wxUser = new WxUser();
        BeanUtils.copyProperties(user,wxUser);
        wxUser.setCreateTime(new Date());
        wxUser.setTicket(ticket);
        wxUserService.saveOrUpdateWxUser(wxUser);
    }


}

```



### 2.4 WxMpVerifyController(正式环境校验)

```java
@Slf4j
@RestController
@RequestMapping("/")
public class WxMpVerifyController {

    @GetMapping("/MP_verify_05QSs7uxcaoJNAJB.txt")
    public String mpVerify() {
        return "05QSs7uxcaoJNAJB";
    }
}

```



## 3. 测试

1. 访问：http://localhost:8089/wx/auth/getQrCode

![image-20210714224939357](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210714224939357.png)

2. 点开qrCodeUrl 就可以看到二维码图片了

![image-20210714225121110](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210714225121110.png)

3. 用微信扫码就可以进到公众号了


4. 收到扫码后的事件

   此时后台就会收到微信扫码事件

   >没有收到事件，可能需要发布到正式环境或者用测试号开发

   ![image-20210715224436158](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210715224436158.png)




## 4. 遇到问题

### 4.1 扫码成功后无法收到微信信息

原因：我们需要设置网页授权域名

![image-20210718221532119](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210718221532119.png)

#### 4.1.1解决：将文件放在服务器下

![image-20210718214350057](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210718214350057.png)

如果是springboot项目，直接放在代码里也能实现

```java
@GetMapping("/MP_verify_05QSs7uxc.txt")
    public String mpVerify() {
        return "05QSs7uxc";
    }
```

#### 4.1.2 服务器配置未启用

![image-20210718222933550](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210718222933550.png)

#### 4.1.2 临时解决：用测试号开发

[微信测试号地址](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)

## 参考文章

[微信授权认证demo](https://github.com/Wechat-Group/WxJava/blob/develop/weixin-java-mp/src/test/java/me/chanjar/weixin/mp/api/impl/WxMpQrcodeServiceImplTest.java)

[微信生成带参数二维码以及获取此二维码参数](https://blog.csdn.net/weixin_38361347/article/details/84963257)
