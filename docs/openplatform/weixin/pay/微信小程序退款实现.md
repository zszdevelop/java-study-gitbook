# 微信小程序退款实现

## 1. 简介

商城中有交易，就有退货。那么退货完成后，我们如何实现退款呢？

## 2. 退货流程

1. 用户在订单中选择要退货的订单
2. 选择要退货的商品，填写退货基本信息（退货商品id，退货数量，价格）
3. 后台对退货商品进行审批
4. 审批通过，用户将商品进行退货
   1. 设置退款金额（并不一定是订单原价，只要小于支付总价就可以）

5. 用户将商品退回后，后台操作完成退货
   1. 此时将触发微信退款



## 3. 微信退货实现

```java

            // 微信退款
            OmsOrderReturnApplyResult item = getItem(id);
            BigDecimal returnAmount = item.getReturnAmount();
            BigDecimal totalFee = item.getProductRealPrice().multiply(BigDecimal.valueOf(item.getProductCount()));

            WxPayService wxPayService = WxPayConfiguration.getPayService();
            try {
                WxPayRefundRequest refundRequest = WxPayRefundRequest.newBuilder()
                        .outRefundNo(id+"test")
                        .outTradeNo(item.getOrderSn())
                        .totalFee(totalFee.multiply(new BigDecimal(100)).intValue())
                        .refundFee(returnAmount.multiply(new BigDecimal(100)).intValue())
                        .build();
                WxPayRefundResult refund = wxPayService.refund(refundRequest);
                log.info("退款结果："+refund.toString());
            } catch (WxPayException e) {
                log.info("退款失败，{}"+e.getMessage(),e);

            }
```

## 4. 相关配置（前置条件）

### 4.1 证书文件下载

[微信支付官方文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3)

![image-20220327221200412](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220327221200412.png)

未正确配置会出现如下提示

```xml
【请求地址】：https://api.mch.weixin.qq.com/secapi/pay/refund
【请求数据】：<xml>
  <appid>wxcf0e67a387408a94</appid>
  <mch_id>1623109465</mch_id>
  <nonce_str>1648388313318</nonce_str>
  <sign>E0CCE2B1BC9ECC8C8FC8BC756D817547</sign>
  <out_trade_no>2022032701null000002</out_trade_no>
  <out_refund_no>29test</out_refund_no>
  <total_fee>1</total_fee>
  <refund_fee>1</refund_fee>
  <op_user_id>1623109465</op_user_id>
</xml>
【异常信息】：请确保证书文件地址keyPath已配置
```

![image-20220328202045671](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220328202045671.png)

