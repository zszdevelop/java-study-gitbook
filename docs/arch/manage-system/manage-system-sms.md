---
order: 1020
category:
  - 后台管理
---



# 后台管理 - 短信服务适配

## 1. 具体实现

### 1.1 初始化

1. 通过springboot @AutoConfiguration 自动注入
2. 通过@ConditionalOnClass() 判断具体导入谁（是阿里还是用腾讯云）

```java
/**
 * 短信配置类
 *
 * @author Lion Li
 * @version 4.2.0
 */
@AutoConfiguration
@EnableConfigurationProperties(SmsProperties.class)
public class SmsAutoConfiguration {

    @Configuration
    @ConditionalOnProperty(value = "sms.enabled", havingValue = "true")
    @ConditionalOnClass(com.aliyun.dysmsapi20170525.Client.class)
    static class AliyunSmsConfiguration {

        @Bean
        public SmsTemplate aliyunSmsTemplate(SmsProperties smsProperties) {
            return new AliyunSmsTemplate(smsProperties);
        }

    }

    @Configuration
    @ConditionalOnProperty(value = "sms.enabled", havingValue = "true")
    @ConditionalOnClass(com.tencentcloudapi.sms.v20190711.SmsClient.class)
    static class TencentSmsConfiguration {

        @Bean
        public SmsTemplate tencentSmsTemplate(SmsProperties smsProperties) {
            return new TencentSmsTemplate(smsProperties);
        }

    }

}
```

### 1.2 短信模板

1. 抽象出模板类、针对平台特殊的参数通过map传入
2. 发送由具体模板实现
3. 针对返回结果组装成自己的result

```java
/**
 * 短信模板
 *
 * @version 4.2.0
 */
public interface SmsTemplate {

    /**
     * 发送短信
     *
     * @param phones     电话号(多个逗号分割)
     * @param templateId 模板id
     * @param param      模板对应参数
     *                   阿里 需使用 模板变量名称对应内容 例如: code=1234
     *                   腾讯 需使用 模板变量顺序对应内容 例如: 1=1234, 1为模板内第一个参数
     */
    SmsResult send(String phones, String templateId, Map<String, String> param);

}
```

阿里模板

```java
/**
 * Aliyun 短信模板
 *
 * @author Lion Li
 * @version 4.2.0
 */
public class AliyunSmsTemplate implements SmsTemplate {

    private SmsProperties properties;

    private Client client;

    @SneakyThrows(Exception.class)
    public AliyunSmsTemplate(SmsProperties smsProperties) {
        this.properties = smsProperties;
        Config config = new Config()
            // 您的AccessKey ID
            .setAccessKeyId(smsProperties.getAccessKeyId())
            // 您的AccessKey Secret
            .setAccessKeySecret(smsProperties.getAccessKeySecret())
            // 访问的域名
            .setEndpoint(smsProperties.getEndpoint());
        this.client = new Client(config);
    }

    public SmsResult send(String phones, String templateId, Map<String, String> param) {
        if (StringUtils.isBlank(phones)) {
            throw new SmsException("手机号不能为空");
        }
        if (StringUtils.isBlank(templateId)) {
            throw new SmsException("模板ID不能为空");
        }
        SendSmsRequest req = new SendSmsRequest()
            .setPhoneNumbers(phones)
            .setSignName(properties.getSignName())
            .setTemplateCode(templateId)
            .setTemplateParam(JsonUtils.toJsonString(param));
        try {
            SendSmsResponse resp = client.sendSms(req);
            return SmsResult.builder()
                .isSuccess("OK".equals(resp.getBody().getCode()))
                .message(resp.getBody().getMessage())
                .response(JsonUtils.toJsonString(resp))
                .build();
        } catch (Exception e) {
            throw new SmsException(e.getMessage());
        }
    }

}
```

腾讯模板

```java
/**
 * Tencent 短信模板
 *
 * @author Lion Li
 * @version 4.2.0
 */
public class TencentSmsTemplate implements SmsTemplate {

    private SmsProperties properties;

    private SmsClient client;

    @SneakyThrows(Exception.class)
    public TencentSmsTemplate(SmsProperties smsProperties) {
        this.properties = smsProperties;
        Credential credential = new Credential(smsProperties.getAccessKeyId(), smsProperties.getAccessKeySecret());
        HttpProfile httpProfile = new HttpProfile();
        httpProfile.setEndpoint(smsProperties.getEndpoint());
        ClientProfile clientProfile = new ClientProfile();
        clientProfile.setHttpProfile(httpProfile);
        this.client = new SmsClient(credential, "", clientProfile);
    }

    public SmsResult send(String phones, String templateId, Map<String, String> param) {
        if (StringUtils.isBlank(phones)) {
            throw new SmsException("手机号不能为空");
        }
        if (StringUtils.isBlank(templateId)) {
            throw new SmsException("模板ID不能为空");
        }
        SendSmsRequest req = new SendSmsRequest();
        Set<String> set = Arrays.stream(phones.split(",")).map(p -> "+86" + p).collect(Collectors.toSet());
        req.setPhoneNumberSet(ArrayUtil.toArray(set, String.class));
        if (CollUtil.isNotEmpty(param)) {
            req.setTemplateParamSet(ArrayUtil.toArray(param.values(), String.class));
        }
        req.setTemplateID(templateId);
        req.setSign(properties.getSignName());
        req.setSmsSdkAppid(properties.getSdkAppId());
        try {
            SendSmsResponse resp = client.SendSms(req);
            SmsResult.SmsResultBuilder builder = SmsResult.builder()
                .isSuccess(true)
                .message("send success")
                .response(JsonUtils.toJsonString(resp));
            for (SendStatus sendStatus : resp.getSendStatusSet()) {
                if (!"Ok".equals(sendStatus.getCode())) {
                    builder.isSuccess(false).message(sendStatus.getMessage());
                    break;
                }
            }
            return builder.build();
        } catch (Exception e) {
            throw new SmsException(e.getMessage());
        }
    }

}
```