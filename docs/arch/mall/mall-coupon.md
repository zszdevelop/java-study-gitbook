# mall中优惠券设计（重点）

>该篇文章主要参考[mall官方文档](http://www.macrozheng.com/#/README)，并结合自己的使用感受做的一些笔记

## 1. 简介

优惠券是商城中的核心重点，电商通过各种各种促销玩法，增加用户购买欲望，拉动消费。但促销玩法还是挺复杂的

## 2. 相关表结构

### 2.1 优惠券表

用于存储优惠券信息，需要注意的是优惠券的使用类型：0->全场通用；1->指定分类；2->指定商品，不同使用类型的优惠券使用范围不一样。

```sql
create table sms_coupon
(
   id                   bigint not null auto_increment,
   type                 int(1) comment '优惠卷类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券',
   name                 varchar(100) comment '名称',
   platform             int(1) comment '使用平台：0->全部；1->移动；2->PC',
   count                int comment '数量',
   amount               decimal(10,2) comment '金额',
   per_limit            int comment '每人限领张数',
   min_point            decimal(10,2) comment '使用门槛；0表示无门槛',
   start_time           datetime comment '开始使用时间',
   end_time             datetime comment '结束使用时间',
   use_type             int(1) comment '使用类型：0->全场通用；1->指定分类；2->指定商品',
   note                 varchar(200) comment '备注',
   publish_count        int comment '发行数量',
   use_count            int comment '已使用数量',
   receive_count        int comment '领取数量',
   enable_time          datetime comment '可以领取的日期',
   code                 varchar(64) comment '优惠码',
   member_level         int(1) comment '可领取的会员类型：0->无限制',
   primary key (id)
);
```

### 2.2 优惠券历史记录表

用于存储会员领取及使用优惠券的记录，**当会员领取到优惠券时，会产生一条优惠券的记录**，需要注意的是它的使用状态：0->未使用；1->已使用；2->已过期。

```sql
create table sms_coupon_history
(
   id                   bigint not null auto_increment,
   coupon_id            bigint comment '优惠券id',
   member_id            bigint comment '会员id',
   order_id             bigint comment '订单id',
   coupon_code          varchar(64) comment '优惠券码',
   member_nickname      varchar(64) comment '领取人昵称',
   get_type             int(1) comment '获取类型：0->后台赠送；1->主动获取',
   create_time          datetime comment '创建时间',
   use_status           int(1) comment '使用状态：0->未使用；1->已使用；2->已过期',
   use_time             datetime comment '使用时间',
   order_sn             varchar(100) comment '订单号码',
   primary key (id)
);
```

### 2.3 优惠券和商品的关系表

用于存储优惠券与商品的关系，当优惠券的使用类型为指定商品时，优惠券与商品需要建立关系。

```sql
create table sms_coupon_product_relation
(
   id                   bigint not null auto_increment,
   coupon_id            bigint comment '优惠券id',
   product_id           bigint comment '商品id',
   product_name         varchar(500) comment '商品名称',
   product_sn           varchar(200) comment '商品条码',
   primary key (id)
);
```

### 2.4 优惠券和商品分类关系表

用于存储优惠券与商品分类的关系，当优惠券的使用类型为指定分类时，优惠券与商品分类需要建立关系。

```sql
create table sms_coupon_product_category_relation
(
   id                   bigint not null auto_increment,
   coupon_id            bigint comment '优惠券id',
   product_category_id  bigint comment '商品分类id',
   product_category_name varchar(200) comment '商品分类名称',
   parent_category_name varchar(200) comment '父分类名称',
   primary key (id)
);
```

## 3. 管理端展现

### 3.1 优惠券列表

![image-20220313114448436](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114448436.png)

### 3.2 编辑优惠券

#### 3.2.1 全场通用

![image-20220313114555987](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114555987.png)

#### 3.2.2 指定商品

![image-20220313114639223](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114639223.png)

#### 3.2.3 指定分类

![image-20220313114713294](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114713294.png)

### 3.3 查看优惠券

![image-20220313114754254](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114754254.png)

## 4. 移动端展现

### 4.1 我的优惠券

#### 4.1.1 未使用

![image-20220313114856115](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114856115.png)

#### 4.1.2 已使用

![image-20220313114918514](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114918514.png)

#### 4.1.3 已过期

![image-20220313114942582](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313114942582.png)

### 4.2 优惠券详情

![image-20220313115009711](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220313115009711.png)

## 5. 代码逻辑

### 5.1 获取历史优惠券和优惠券列表区别

获取历史优惠券是无论是否失效，都查询

#### 5.1.1 获取会员优惠券历史列表

```java
  @Override
    public List<SmsCouponHistory> listHistory(Integer useStatus) {
        UmsMember currentMember = memberService.getCurrentMember();
        SmsCouponHistoryExample couponHistoryExample=new SmsCouponHistoryExample();
        SmsCouponHistoryExample.Criteria criteria = couponHistoryExample.createCriteria();
        criteria.andMemberIdEqualTo(currentMember.getId());
        if(useStatus!=null){
            criteria.andUseStatusEqualTo(useStatus);
        }
        return couponHistoryMapper.selectByExample(couponHistoryExample);
    }
```

#### 5.1.2 获取会员优惠券列表

```sql
 SELECT
          c.*
        FROM
            sms_coupon_history ch
                LEFT JOIN sms_coupon c ON ch.coupon_id = c.id
        WHERE ch.member_id = #{memberId}
        <if test="useStatus!=null and useStatus!=2">
            AND ch.use_status = #{useStatus}
            AND NOW() > c.start_time
            AND c.end_time > NOW()
        </if>
        <if test="useStatus!=null and useStatus==2">
            AND NOW() > c.end_time
        </if>
```

### 5.2 修改优惠券

更新优惠券，同时需要删除关联的商品和分类

```java

    @Override
    public int update(Long id, SmsCouponParam couponParam) {
        couponParam.setId(id);
        int count =couponMapper.updateByPrimaryKey(couponParam);
        //删除后插入优惠券和商品关系表
        if(couponParam.getUseType().equals(2)){
            for(SmsCouponProductRelation productRelation:couponParam.getProductRelationList()){
                productRelation.setCouponId(couponParam.getId());
            }
            deleteProductRelation(id);
            productRelationDao.insertList(couponParam.getProductRelationList());
        }
        //删除后插入优惠券和商品分类关系表
        if(couponParam.getUseType().equals(1)){
            for (SmsCouponProductCategoryRelation couponProductCategoryRelation : couponParam.getProductCategoryRelationList()) {
                couponProductCategoryRelation.setCouponId(couponParam.getId());
            }
            deleteProductCategoryRelation(id);
            productCategoryRelationDao.insertList(couponParam.getProductCategoryRelationList());
        }
        return count;
    }
```

### 5.3 获取当前商品相关优惠券

1. 从**优惠券和商品关联表**中查出优惠券id
2. 从**优惠券和分类关联表**中查出优惠券id
3. 将优惠券id in 出来

```java

    @Override
    public List<SmsCoupon> listByProduct(Long productId) {
        List<Long> allCouponIds = new ArrayList<>();
        //获取指定商品优惠券
        SmsCouponProductRelationExample cprExample = new SmsCouponProductRelationExample();
        cprExample.createCriteria().andProductIdEqualTo(productId);
        List<SmsCouponProductRelation> cprList = couponProductRelationMapper.selectByExample(cprExample);
        if(CollUtil.isNotEmpty(cprList)){
            List<Long> couponIds = cprList.stream().map(SmsCouponProductRelation::getCouponId).collect(Collectors.toList());
            allCouponIds.addAll(couponIds);
        }
        //获取指定分类优惠券
        PmsProduct product = productMapper.selectByPrimaryKey(productId);
        SmsCouponProductCategoryRelationExample cpcrExample = new SmsCouponProductCategoryRelationExample();
        cpcrExample.createCriteria().andProductCategoryIdEqualTo(product.getProductCategoryId());
        List<SmsCouponProductCategoryRelation> cpcrList = couponProductCategoryRelationMapper.selectByExample(cpcrExample);
        if(CollUtil.isNotEmpty(cpcrList)){
            List<Long> couponIds = cpcrList.stream().map(SmsCouponProductCategoryRelation::getCouponId).collect(Collectors.toList());
            allCouponIds.addAll(couponIds);
        }
        if(CollUtil.isEmpty(allCouponIds)){
            return new ArrayList<>();
        }
        //所有优惠券
        SmsCouponExample couponExample = new SmsCouponExample();
        couponExample.createCriteria().andEndTimeGreaterThan(new Date())
                .andStartTimeLessThan(new Date())
                .andUseTypeEqualTo(0);
        couponExample.or(couponExample.createCriteria()
                .andEndTimeGreaterThan(new Date())
                .andStartTimeLessThan(new Date())
                .andUseTypeNotEqualTo(0)
                .andIdIn(allCouponIds));
        return couponMapper.selectByExample(couponExample);
    }
```

### 5.4 生成确认单时的优惠券处理逻辑

```java
//获取用户可用优惠券列表
List<SmsCouponHistoryDetail> couponHistoryDetailList = memberCouponService.listCart(cartPromotionItemList, 1);
result.setCouponHistoryDetailList(couponHistoryDetailList);
```

针对选中的购物车商品计算

1. 获取改用户的所有优惠券
2. 根据优惠券使用类型来判断优惠券是否可用
   1. 全场通用
      1. 判断截止时间优惠起点
   2. 指定分类
      1. 计算指定分类的总价
      2. 判断截止时间和优惠起点
   3. 指定商品
      1. 计算指定商品的总价
      2. 判断截止时间和优惠起点

```java
@Override
public List<SmsCouponHistoryDetail> listCart(List<CartPromotionItem> cartItemList, Integer type) {
    UmsMember currentMember = memberService.getCurrentMember();
    Date now = new Date();
    //获取该用户所有优惠券
    List<SmsCouponHistoryDetail> allList = couponHistoryDao.getDetailList(currentMember.getId());
    //根据优惠券使用类型来判断优惠券是否可用
    List<SmsCouponHistoryDetail> enableList = new ArrayList<>();
    List<SmsCouponHistoryDetail> disableList = new ArrayList<>();
    for (SmsCouponHistoryDetail couponHistoryDetail : allList) {
        Integer useType = couponHistoryDetail.getCoupon().getUseType();
        BigDecimal minPoint = couponHistoryDetail.getCoupon().getMinPoint();
        Date endTime = couponHistoryDetail.getCoupon().getEndTime();
        if(useType.equals(0)){
            //0->全场通用
            //判断是否满足优惠起点
            //计算购物车商品的总价
            BigDecimal totalAmount = calcTotalAmount(cartItemList);
            if(now.before(endTime)&&totalAmount.subtract(minPoint).intValue()>=0){
                enableList.add(couponHistoryDetail);
            }else{
                disableList.add(couponHistoryDetail);
            }
        }else if(useType.equals(1)){
            //1->指定分类
            //计算指定分类商品的总价
            List<Long> productCategoryIds = new ArrayList<>();
            for (SmsCouponProductCategoryRelation categoryRelation : couponHistoryDetail.getCategoryRelationList()) {
                productCategoryIds.add(categoryRelation.getProductCategoryId());
            }
            BigDecimal totalAmount = calcTotalAmountByproductCategoryId(cartItemList,productCategoryIds);
            if(now.before(endTime)&&totalAmount.intValue()>0&&totalAmount.subtract(minPoint).intValue()>=0){
                enableList.add(couponHistoryDetail);
            }else{
                disableList.add(couponHistoryDetail);
            }
        }else if(useType.equals(2)){
            //2->指定商品
            //计算指定商品的总价
            List<Long> productIds = new ArrayList<>();
            for (SmsCouponProductRelation productRelation : couponHistoryDetail.getProductRelationList()) {
                productIds.add(productRelation.getProductId());
            }
            BigDecimal totalAmount = calcTotalAmountByProductId(cartItemList,productIds);
            if(now.before(endTime)&&totalAmount.intValue()>0&&totalAmount.subtract(minPoint).intValue()>=0){
                enableList.add(couponHistoryDetail);
            }else{
                disableList.add(couponHistoryDetail);
            }
        }
    }
    if(type.equals(1)){
        return enableList;
    }else{
        return disableList;
    }
}
```

### 5.5 获取优惠券历史详情

```xml
<resultMap id="couponHistoryDetailMap" type="com.macro.mall.portal.domain.SmsCouponHistoryDetail"
           extends="com.macro.mall.mapper.SmsCouponHistoryMapper.BaseResultMap">
    <association property="coupon" resultMap="com.macro.mall.mapper.SmsCouponMapper.BaseResultMap" columnPrefix="c_">
    </association>
    <collection property="productRelationList" columnPrefix="cpr_" resultMap="com.macro.mall.mapper.SmsCouponProductRelationMapper.BaseResultMap">
    </collection>
    <collection property="categoryRelationList" columnPrefix="cpcr_" resultMap="com.macro.mall.mapper.SmsCouponProductCategoryRelationMapper.BaseResultMap">
    </collection>
</resultMap>
<select id="getDetailList" resultMap="couponHistoryDetailMap">
    SELECT
        ch.*,
        c.id c_id,
        c.name c_name,
        c.amount c_amount,
        c.min_point c_min_point,
        c.platform c_platform,
        c.start_time c_start_time,
        c.end_time c_end_time,
        c.note c_note,
        c.use_type c_use_type,
        c.type c_type,
        cpr.id cpr_id,cpr.product_id cpr_product_id,
        cpcr.id cpcr_id,cpcr.product_category_id cpcr_product_category_id
    FROM
        sms_coupon_history ch
        LEFT JOIN sms_coupon c ON ch.coupon_id = c.id
        LEFT JOIN sms_coupon_product_relation cpr ON cpr.coupon_id = c.id
        LEFT JOIN sms_coupon_product_category_relation cpcr ON cpcr.coupon_id = c.id
    WHERE ch.member_id = #{memberId}
    AND ch.use_status = 0
</select>
```

### 5.6 下单时选择优惠券后逻辑

```java
//判断使用使用了优惠券
        if (orderParam.getCouponId() == null) {
            //不用优惠券
            for (OmsOrderItem orderItem : orderItemList) {
                orderItem.setCouponAmount(new BigDecimal(0));
            }
        } else {
            //使用优惠券
            SmsCouponHistoryDetail couponHistoryDetail = getUseCoupon(cartPromotionItemList, orderParam.getCouponId());
            if (couponHistoryDetail == null) {
                Asserts.fail("该优惠券不可用");
            }
            //对下单商品的优惠券进行处理
            handleCouponAmount(orderItemList, couponHistoryDetail);
        }
```

 对优惠券优惠进行处理

```java
 /**
     * 对优惠券优惠进行处理
     *
     * @param orderItemList       order_item列表
     * @param couponHistoryDetail 可用优惠券详情
     */
    private void handleCouponAmount(List<OmsOrderItem> orderItemList, SmsCouponHistoryDetail couponHistoryDetail) {
        SmsCoupon coupon = couponHistoryDetail.getCoupon();
        if (coupon.getUseType().equals(0)) {
            //全场通用
            calcPerCouponAmount(orderItemList, coupon);
        } else if (coupon.getUseType().equals(1)) {
            //指定分类
            List<OmsOrderItem> couponOrderItemList = getCouponOrderItemByRelation(couponHistoryDetail, orderItemList, 0);
            calcPerCouponAmount(couponOrderItemList, coupon);
        } else if (coupon.getUseType().equals(2)) {
            //指定商品
            List<OmsOrderItem> couponOrderItemList = getCouponOrderItemByRelation(couponHistoryDetail, orderItemList, 1);
            calcPerCouponAmount(couponOrderItemList, coupon);
        }
    }

```

对每个下单商品进行**优惠券金额分摊的计算**

```java
 /**
     * 对每个下单商品进行优惠券金额分摊的计算
     *
     * @param orderItemList 可用优惠券的下单商品商品
     */
    private void calcPerCouponAmount(List<OmsOrderItem> orderItemList, SmsCoupon coupon) {
        BigDecimal totalAmount = calcTotalAmount(orderItemList);
        for (OmsOrderItem orderItem : orderItemList) {
            //(商品价格/可用商品总价)*优惠券面额
            BigDecimal couponAmount = orderItem.getProductPrice().divide(totalAmount, 3, RoundingMode.HALF_EVEN).multiply(coupon.getAmount());
            orderItem.setCouponAmount(couponAmount);
        }
    }

   /**
     * 计算总金额
     */
    private BigDecimal calcTotalAmount(List<OmsOrderItem> orderItemList) {
        BigDecimal totalAmount = new BigDecimal("0");
        for (OmsOrderItem item : orderItemList) {
            totalAmount = totalAmount.add(item.getProductPrice().multiply(new BigDecimal(item.getProductQuantity())));
        }
        return totalAmount;
    }

```



## 6. 相关问题

### 6.1 什么时候需要获取优惠券相关信息

1. 商品详情页中的领取
2. 购物车下单时选择优惠券
   1. 计算结束时间和最低使用金额

## 参考文章

[营销模块数据库表解析（二）](http://www.macrozheng.com/#/database/mall_sms_02?id=营销模块数据库表解析（二）)
