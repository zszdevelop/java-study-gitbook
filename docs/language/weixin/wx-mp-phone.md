# 微信小程序-获取手机号

## 1. 实现

使用open-type 的开放能力

- getPhoneNumber：获取用户手机号，可以从@getphonenumber回调中获取到用户信息

```html
<button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
```



## 2. 服务端解析

- wxMaUserService.getPhoneNoInfo(sessionKey,
  				request.getEncryptedData(),
  				request.getIv());

```java
public UmsMember getPhoneNoInfo(GetWxPhoneRequest request) {
		String appId = ThirdSessionHolder.getThirdSession().getAppId();
		String sessionKey = ThirdSessionHolder.getThirdSession().getSessionKey();
		Long wxUserId = ThirdSessionHolder.getThirdSession().getWxUserId();

		WxMaUserService wxMaUserService = WxMaConfiguration.getMaService(appId).getUserService();

		WxMaPhoneNumberInfo phoneNoInfo = wxMaUserService.getPhoneNoInfo(sessionKey,
				request.getEncryptedData(),
				request.getIv());

		UmsMember umsMember = new UmsMember();
		umsMember.setId(wxUserId);
		umsMember.setPhone(phoneNoInfo.getPurePhoneNumber());
		umsMemberService.updateUmsMember(umsMember);
		umsMember = umsMemberService.getById(umsMember.getId());
		return umsMember;
	}
```

