# 微信小程序支付实现(java)

## 1. 实现流程

## 2. 实现细节

### 2.1 微信支付配置

```java

/**
 * 微信支付Configuration
 * @author www.joolun.com
 *
 */
@Slf4j
@Configuration
public class WxPayConfiguration {

	private static WxMaProperties wxMaProperties;

	@Autowired
	public WxPayConfiguration(WxMaProperties wxMaProperties) {
		this.wxMaProperties = wxMaProperties;
	}

	/**
	 *  获取WxMpService
	 * @return
	 */
	public static WxPayService getPayService() {
		WxPayService wxPayService = null;
		WxPayConfig payConfig = new WxPayConfig();
		payConfig.setAppId(wxMaProperties.getConfigs().get(0).getAppId());
		payConfig.setMchId(wxMaProperties.getConfigs().get(0).getMchId());
		payConfig.setMchKey(wxMaProperties.getConfigs().get(0).getMchKey());
		payConfig.setKeyPath(wxMaProperties.getConfigs().get(0).getKeyPath());
		// 可以指定是否使用沙箱环境
		payConfig.setUseSandboxEnv(false);
		wxPayService = new WxPayServiceImpl();
		wxPayService.setConfig(payConfig);
		return wxPayService;
    }

}

```

配置信息

```
wx:
  # 小程序配置
  ma:
    configs:
      - appId: xxx
        secret: xxx
        # 微信支付商户号，请去微信支付平台申请
        mchId: xxx
        # 微信支付商户密钥，请去微信支付平台申请
        mchKey: xxx

mall:
  # 支付、物流回调地址，即后台服务7500端口的外网访问域名，要保证外网能访问
  notify-host: http://xx.xxxx.com
```

### 2.2 统一下单接口

1. 获取登录的微信用户信息
2. 获取订单信息
3. 将订单信息封装成WxPayUnifiedOrderRequest（wxjava 提供的订单请求类）
   1. setOutTradeNo：设置订单
   2. setTotalFee：设置支付金额
   3. setNotifyUrl：设置回调地址
4. 调用wxPayService 创建订单

```java
	/**
	 * 调用统一下单接口，并组装生成支付所需参数对象.
	 *
	 * @param orderInfo 统一下单请求参数
	 * @return 返回 {@link com.github.binarywang.wxpay.bean.order}包下的类对象
	 */
	@ApiOperation(value = "调用统一下单接口")
	@PostMapping("/unifiedOrder")
	public AjaxResult unifiedOrder(HttpServletRequest request, @RequestBody OrderInfo orderInfo) throws WxPayException {
		//检验用户session登录
		WxUser wxUser = new WxUser();
		wxUser.setId(ThirdSessionHolder.getThirdSession().getWxUserId());
		wxUser.setSessionKey(ThirdSessionHolder.getThirdSession().getSessionKey());
		wxUser.setOpenId(ThirdSessionHolder.getThirdSession().getOpenId());
		orderInfo = orderInfoService.getById(orderInfo.getId());
		if(orderInfo == null){
			return AjaxResult.error(MyReturnCode.ERR_70005.getCode(), MyReturnCode.ERR_70005.getMsg());
		}
		if(!CommonConstants.NO.equals(orderInfo.getIsPay())){//只有未支付的详单能发起支付
			return AjaxResult.error(MyReturnCode.ERR_70004.getCode(), MyReturnCode.ERR_70004.getMsg());
		}
		if(orderInfo.getPaymentPrice().compareTo(BigDecimal.ZERO)==0){//0元购买不调支付
			orderInfo.setPaymentTime(LocalDateTime.now());
			orderInfoService.notifyOrder(orderInfo);
			return AjaxResult.success();
		}
		String appId = WxMaUtil.getAppId(request);
		WxPayUnifiedOrderRequest wxPayUnifiedOrderRequest = new WxPayUnifiedOrderRequest();
		wxPayUnifiedOrderRequest.setAppid(appId);
		String body = orderInfo.getName();
		body = body.length() > 40 ? body.substring(0,39) : body;
		wxPayUnifiedOrderRequest.setBody(body);
		wxPayUnifiedOrderRequest.setOutTradeNo(orderInfo.getOrderNo());
		wxPayUnifiedOrderRequest.setTotalFee(orderInfo.getPaymentPrice().multiply(new BigDecimal(100)).intValue());
		wxPayUnifiedOrderRequest.setTradeType("JSAPI");
		wxPayUnifiedOrderRequest.setNotifyUrl(mallConfigProperties.getNotifyHost()+"/weixin/api/ma/orderinfo/notify-order");
		wxPayUnifiedOrderRequest.setSpbillCreateIp("127.0.0.1");
		wxPayUnifiedOrderRequest.setOpenid(wxUser.getOpenId());
		WxPayService wxPayService = WxPayConfiguration.getPayService();
		return AjaxResult.success(JSONUtil.parse(wxPayService.createOrder(wxPayUnifiedOrderRequest)));
	}
```

### 2.3 唤起微信支付

### 2.4 支付完成回调

1. 获取支付回调结果
2. 查找支付订单id的订单信息
3. 设置交易时间和交易id

```java

	/**
	 * 支付回调
	 * @param xmlData
	 * @return
	 * @throws WxPayException
	 */
	@ApiOperation(value = "支付回调")
	@PostMapping("/notify-order")
	public String notifyOrder(@RequestBody String xmlData) throws WxPayException {
		log.info("支付回调:"+xmlData);
		WxPayService wxPayService = WxPayConfiguration.getPayService();
		WxPayOrderNotifyResult notifyResult = wxPayService.parseOrderNotifyResult(xmlData);
		OrderInfo orderInfo = orderInfoService.getOne(Wrappers.<OrderInfo>lambdaQuery()
				.eq(OrderInfo::getOrderNo,notifyResult.getOutTradeNo()));
		if(orderInfo != null){
			if(orderInfo.getPaymentPrice().multiply(new BigDecimal(100)).intValue() == notifyResult.getTotalFee()){
				String timeEnd = notifyResult.getTimeEnd();
				LocalDateTime paymentTime = LocalDateTimeUtils.parse(timeEnd);
				orderInfo.setPaymentTime(paymentTime);
				orderInfo.setTransactionId(notifyResult.getTransactionId());
				orderInfoService.notifyOrder(orderInfo);
				return WxPayNotifyResponse.success("成功");
			}else{
				return WxPayNotifyResponse.fail("付款金额与订单金额不等");
			}
		}else{
			return WxPayNotifyResponse.fail("无此订单");
		}
	}
```

### 2.5 通知订单信息

```java
@Override
	@Transactional(rollbackFor = Exception.class)
	public void notifyOrder(OrderInfo orderInfo) {
		if(CommonConstants.NO.equals(orderInfo.getIsPay())){//只有未支付订单能操作
			orderInfo.setIsPay(CommonConstants.YES);
			orderInfo.setStatus(OrderInfoEnum.STATUS_1.getValue());
			List<OrderItem> listOrderItem = orderItemService.list(Wrappers.<OrderItem>lambdaQuery()
					.eq(OrderItem::getOrderId,orderInfo.getId()));
			Map<String, List<OrderItem>> resultList = listOrderItem.stream().collect(Collectors.groupingBy(OrderItem::getSpuId));
			List<GoodsSpu> listGoodsSpu = goodsSpuService.listByIds(resultList.keySet());
			listGoodsSpu.forEach(goodsSpu -> {
				resultList.get(goodsSpu.getId()).forEach(orderItem -> {
					//更新销量
					goodsSpu.setSaleNum(goodsSpu.getSaleNum()+orderItem.getQuantity());
				});
				goodsSpuService.updateById(goodsSpu);
				baseMapper.updateById(orderInfo);//更新订单
			});
		}
	}
```

## 3. 问题点

### 3.1 没有接收到微信回调

从以下几个地方排查

1. 接口是不是有权限控制了？

   例如校验token，但是此时是微信过来的，肯定不包含token 

### 3.2 微信不停发回调

可能是没按要求返回指定格式数据

1. 微信格式

   ```
   WxPayNotifyResponse.success("成功");
   ```

2. json形式返回

   ```
   @ResponseBody
   ```

   
