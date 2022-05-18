# 微信商户付款零钱实现(企业打款/提现)

## 1. 简介

微信商户付款 是 商户主动**向微信用户个人付款**

>目前支持**向指定微信用户的openid付款**

企业付款提供**由商户直接付钱至用户微信零钱**的能力，支持平台操作及接口调用两种方式。具有免费、快速到账、灵活、安全等优点。商户可以使用企业付款，用于如:

### 1.1 场景

- 费用报销
- 员工福利
- 用户奖励等。

- 如果你是做电商或者某些有福利返利的系统，基本上会遇到诸如 `余额提现` 这类需求，主要就是平台向用户返利现金，积累到某一个门槛，可以领取到自己的余额账号、银行卡；或者是使用为用户发送现金红包的方式。

### 1.2  特点

- **免费:不收取付款手续费，节省企业成本。**

- 灵活:可通过页面或接口发起付款，灵活满足企业不同场景的付款需求。

- 友好:通过openid即可实现付款，用户授权即可，体验更好。

- 快速:在发起后，及时到账用户零钱。通过微信消息触达，用户及时获知入账详情。

- 安全:提供多种安全工具，满足不同场景安全需求。如:按需调整付款额度;支持收款账户限制;支持安全防刷，拦截恶意用户、小号、机器号码。

- 支持自定义大额通知等。

## 2. 开通企业付款

### 2.1 开通入口

1. 微信商户平台
2. 产品中心
3. 我的产品

4. 运营工具
5. 企业付款到零钱

![image-20220505212608993](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220505212608993.png)

>企业付款也支持到个人银行卡，此处用的比较少，不过多介绍

### 2.2 开通条件：

入账方式为即时入账至商户号，结算周期为T+1的商户，需满足三个条件：

1. 入驻满90天，
2. 连续正常交易30天，
3. 保持正常健康交易。其余结算周期的商户无90天/30天开通限制，但仍需保持正常健康交易。

## 3. 具体实现

### 3.1 证书配置

参考微信小程序退款实现-4.1 证书文件下载

[4.1 证书文件下载](./微信小程序退款实现)

### 3.2 企业付款实现

```java
@Slf4j
@RestController
@Api(value = "企业付款")
@RequestMapping("/entPay")
public class EntPayController {


    @GetMapping
    public void testEntPay() throws WxPayException {
        WxPayService wxPayService = WxPayConfiguration.getPayService();

        long now = System.currentTimeMillis();
        EntPayRequest request = EntPayRequest.newBuilder()
                .partnerTradeNo("TradeNo"+now)
                .openid("ozy_G4go3beml0KSumdHLik2HoFo")
                .amount(1)
                .spbillCreateIp("10.10.10.10")
                .checkName(WxPayConstants.CheckNameOption.NO_CHECK)
                .description("描述信息")
                .build();

        wxPayService.getEntPayService().entPay(request).toString();
    }
}
```

## 参考文章

[微信官方文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2)