# 微信小程序登录实现

## 1. 微信小程序登录

### 1.1 简介

此微信小程序登录并不需要界面，只需要在小程序端发起后跟后台做交互，用户可以无感知的进行登录

### 1.2 流程

1. 判断登录状态是否过期（微信小程序端）

2. 过期则进行微信登录（微信小程序端）

   ```JS
   initPage: function () {
       let that = this
       return new Promise((resolve, reject) => {
         if (!that.globalData.thirdSession) {//无thirdSession，进行登录
           that.doLogin()
             .then(res => {
               resolve("success")
             })
         } else {//有thirdSession，说明已登录，返回初始化成功
           wx.checkSession({//检查登录态是否过期
             success () {
               //session_key 未过期，并且在本生命周期一直有效
               console.log('session_key 未过期')
               resolve("success")
             },
             fail () {
               // session_key 已经失效，需要重新执行登录流程
               console.log('session_key 已经失效')
               that.doLogin()
                 .then(res => {
                   resolve("success")
                 })
             }
           })
          
         }
       })
     },
   ```

3. 调用微信自己的登录API (wx.login) 返回**微信的code**（微信小程序端）

   注意：只有在第一次请求微信接口的时候，才设置第三方session,更新用户信息的时候，不会去设置

   ```js
   doLogin(){
       wx.showLoading({
         title: '登录中',
       })
       let that = this
       return new Promise((resolve, reject) => {
         wx.login({
           success: function (res) {
             if (res.code) {
               api.login({
                 jsCode: res.code
               })
                 .then(res => {
                   wx.hideLoading()
                   let wxUser = res.data
                   that.globalData.thirdSession = wxUser.sessionKey
                   that.globalData.wxUser = wxUser
                   resolve("success")
                   //获取购物车数量
                   that.shoppingCartCount()
                 })
             }
           }
         })
       })
     },
   ```

4. 用code请求服务端接口,返回用户信息

   ```java
   /**
   	 * 小程序用户登录
   	 * @param request
   	 * @param loginMaDTO
   	 * @return
   	 */
   	@ApiOperation(value = "小程序用户登录")
   	@PostMapping("/login")
   	public AjaxResult login(HttpServletRequest request, @RequestBody LoginMaDTO loginMaDTO){
   		try {
   			String appId = getAppId(request);
   			WxUser wxUser = wxUserService.loginMa(appId,loginMaDTO.getJsCode());
   			return AjaxResult.success(wxUser);
   		} catch (Exception e) {
   			e.printStackTrace();
   			return AjaxResult.error(e.getMessage());
   		}
   	}
   ```

5. 通过code取得微信的唯一id（openid）

   ```java
   WxMaJscode2SessionResult jscode2session = WxMaConfiguration.getMaService(appId).jsCode2SessionInfo(jsCode);
   ```
   
6. 用openid查找数据库中是否存在，无则新增，有则更新
   
   1. 此时并没有返回用户信息，只是返回了
      1. Openid
      2. sessionKey
      3. unionid
   
   
   ```java
   @Override
   	@Transactional(rollbackFor = Exception.class)
   	public WxUser loginMa(String appId, String jsCode) throws WxErrorException {
   		WxMaJscode2SessionResult jscode2session = WxMaConfiguration.getMaService(appId).jsCode2SessionInfo(jsCode);
   		WxUser wxUser = this.getByOpenId(jscode2session.getOpenid());
   		if(wxUser==null) {
   			//新增微信用户
   			wxUser = new WxUser();
   			wxUser.setAppType(ConfigConstant.WX_APP_TYPE_1);
   			wxUser.setOpenId(jscode2session.getOpenid());
   			wxUser.setSessionKey(jscode2session.getSessionKey());
   			wxUser.setUnionId(jscode2session.getUnionid());
   			insertWxUser(wxUser);
   		}else {
   			//更新SessionKey
   			wxUser.setAppType(ConfigConstant.WX_APP_TYPE_1);
   			wxUser.setOpenId(jscode2session.getOpenid());
   			wxUser.setSessionKey(jscode2session.getSessionKey());
   			wxUser.setUnionId(jscode2session.getUnionid());
   			updateWxUser(wxUser);
   		}
   		return wxUser;
   	}
   ```
   
   

## 2. 保存用户信息



### 2.1 简介

#### 2.1.1 wx.getUserInfo 只能获取匿名信息

wx.getUserInfo 只能获取匿名信息，通常只作为获取openid 来使用

>**回收wx.getUserInfo接口可获取用户个人信息能力**
>
>**4月28日24时后发布的新版本小程序，开发者调用wx.getUserInfo或<button open-type="getUserInfo"/>将不再弹出弹窗，直接返回匿名的用户个人信息，获取加密后的openID、unionID数据的能力不做调整。**

![image-20220409103434301](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220409103434301.png)

#### 2.1.2 新增getUserProfile接口获取用户的个人信息

>**新增getUserProfile接口**
>
>**若开发者需要获取用户的个人信息（头像、昵称、性别与地区），可以通过wx.getUserProfile接口进行获取**，该接口从基础库2.10.4版本开始支持，该接口只返回用户个人信息，不包含用户身份标识符。该接口中desc属性（声明获取用户个人信息后的用途）后续会展示在弹窗中，请开发者谨慎填写**。开发者每次通过该接口获取用户个人信息均需用户确认，请开发者妥善保管用户快速填写的头像昵称，避免重复弹窗。**

![image-20220409103413431](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220409103413431.png)

#### 2.1.2 效果

在微信中获取用户信息，需要通过按钮触发，并有微信提示要获取用户信息需要你授权

![image-20220225205432697](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220225205432697.png)

### 2.2 流程

1. 微信限制获取用户信息时，必须通过按钮触发

   ```js
    <button class="cu-btn round sm margin-top-xs" bindtap="getUserProfile">
         {{!wxUser.nickName ? '获取昵称' : '更新昵称'}}
       </button>
   ```

2. 通过 wx.getUserProfile 获取用户信息

   ```js
   login() {
   				let that = this;
   				uni.getUserProfile({
   					desc: '用于完善会员资料',
   					success: function(res) {
   						console.log("获取用户信息成功" + JSON.stringify(res));
   						that.updateWxUser(res)
   						
   					},
   					fail(err) {
   						console.log("获取用户信息失败" + JSON.stringify(err));
   					}
   				});
   			},
   			updateWxUser(data){
   				wx.showLoading({
   					title: '登录中',
   				})
   				let that = this;
   				saveOrUptateWxUser(data).then(res=>{
   					console.log("保存用户信息成功" + JSON.stringify(res));
   					let wxUser = res.data
   					 that.$store.dispatch("setUserInfo", wxUser);
   					 wx.hideLoading()
   				})
   			},
   ```

2.  此时会弹出授权提示

   ![image-20220225205827415](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220225205827415.png)
   
4. 点击允许后即可获取用户信息，包括

   - sessionKey：微信sessionKey，之后用来在服务端获取用户信息
   - encryptedData：加密数据，之后用来在服务端获取用户信息
   - iv，之后用来在服务端获取用户信息
   - userInfo 用户基本信息
     - avatarUrl 头像
     - nickName：用户昵称
     - gender：性别

   等等信息，具体如下，

   ```javascript
   cloudID: "54_7Ma2KNU7-"
   encryptedData: "g9EyNKUPmbqWKX0Il41"
   errMsg: "getUserProfile:ok"
   iv: "4U8dRHrvcM25mOW+OqHfsA=="
   rawData: "{"nickName":"Build","gender":0,"language":"zh_CN","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK8DdbFRF2oGk0seaMZW6FCm9uq1F98Mlhzmcph8b2GbeZTbxo9Wezs1daZTLDefoibcuPDuTe6iaug/132"}"
   signature: "94ec043cfd7facc4e951c31f92a67f5cbf1da583"
   userInfo:
   avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK8DdbFRF2oGk0seaMZW6FCm9uq1F98Mlhzmcph8b2GbeZTbxo9Wezs1daZTLDefoibcuPDuTe6iaug/132"
   city: ""
   country: ""
   gender: 0
   language: "zh_CN"
   nickName: "Build"
   province: ""
   
   ```

5. 服务端获取用户信息

   其实直接把前端的用户信息拿到传递到服务端也可以（但可能存在被抓包泄漏的风险）

   ```java
   WxMaUserService wxMaUserService = WxMaConfiguration.getMaService(wxOpenDataDTO.getAppId()).getUserService();
   		WxMaUserInfo wxMaUserInfo = wxMaUserService.getUserInfo(wxOpenDataDTO.getSessionKey(), wxOpenDataDTO.getEncryptedData(), wxOpenDataDTO.getIv());
   		
   ```

6. 更新用户信息

   ```java
   WxUser wxUser = new WxUser();
   //		BeanUtil.copyProperties(wxMaUserInfo,wxUser);
   		BeanUtils.copyProperties(wxMaUserInfo,wxUser);
   		wxUser.setId(wxOpenDataDTO.getUserId());
   		wxUser.setSex(wxMaUserInfo.getGender());
   		wxUser.setHeadimgUrl(wxMaUserInfo.getAvatarUrl());
   		updateWxUser(wxUser);
   ```

7. 前端全局保存用户信息

   ```js
   let wxUser = res.data
             this.setData({
               wxUser: wxUser
             })
             app.globalData.wxUser = wxUser
   ```

   

## 3. 微信用户SQL

```sql

CREATE TABLE `wx_user` (
  `id` varchar(32)  NOT NULL DEFAULT '' COMMENT '主键',
  `create_id` varchar(32)  DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_id` varchar(32)  DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(100)  DEFAULT NULL COMMENT '用户备注',
  `del_flag` char(2)  DEFAULT '0' COMMENT '逻辑删除标记（0：显示；1：隐藏）',
  `app_type` char(2)  DEFAULT NULL COMMENT '应用类型(1:小程序，2:公众号)',
  `subscribe` char(2)  DEFAULT NULL COMMENT '是否订阅（1：是；0：否；2：网页授权用户）',
  `subscribe_scene` varchar(50)  DEFAULT NULL COMMENT '返回用户关注的渠道来源，ADD_SCENE_SEARCH 公众号搜索，ADD_SCENE_ACCOUNT_MIGRATION 公众号迁移，ADD_SCENE_PROFILE_CARD 名片分享，ADD_SCENE_QR_CODE 扫描二维码，ADD_SCENEPROFILE LINK 图文页内名称点击，ADD_SCENE_PROFILE_ITEM 图文页右上角菜单，ADD_SCENE_PAID 支付后关注，ADD_SCENE_OTHERS 其他',
  `subscribe_time` datetime DEFAULT NULL COMMENT '关注时间',
  `subscribe_num` int DEFAULT NULL COMMENT '关注次数',
  `cancel_subscribe_time` datetime DEFAULT NULL COMMENT '取消关注时间',
  `open_id` varchar(64) CHARACTER SET utf8mb4  NOT NULL COMMENT '用户标识',
  `nick_name` varchar(200) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '昵称',
  `sex` char(2) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '性别（1：男，2：女，0：未知）',
  `city` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '所在城市',
  `country` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '所在国家',
  `province` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '所在省份',
  `phone` varchar(15)  DEFAULT NULL COMMENT '手机号码',
  `language` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '用户语言',
  `headimg_url` varchar(1000) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '头像',
  `union_id` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT 'union_id',
  `group_id` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '用户组',
  `tagid_list` varchar(64) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '标签列表',
  `qr_scene_str` varchar(64) DEFAULT NULL COMMENT '二维码扫码场景',
  `latitude` double DEFAULT NULL COMMENT '地理位置纬度',
  `longitude` double DEFAULT NULL COMMENT '地理位置经度',
  `session_key` varchar(200)  DEFAULT NULL COMMENT '会话密钥',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_openid` (`open_id`)
) ENGINE=InnoDB COMMENT='微信用户';
```

## 参考文章

[小程序登录、用户信息相关接口调整说明](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801?highLine=getUserProfile%253Afail)

[uniapp官网](https://uniapp.dcloud.io/api/plugins/login.html#getuserprofile)
