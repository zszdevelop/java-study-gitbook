# mall中商品优惠方式(促销，会员价，阶梯价，满减)

## 1. 简介

优惠方式包括(促销，会员价，阶梯价，满减)，优惠也是商城营销中重要的手段之一。

促销，会员价，阶梯价，满减 只能选一种作为促销方式

### 1.1 优惠和优惠券

优惠是在特定时间商品的属性，用户不需要选择优惠券即可享有优惠。而优惠券必须领取优惠券后使用

## 2. 数据库设计

### 2.1 商品阶梯价格表

商品优惠相关表，购买同商品满足一定数量后，可以使用打折价格进行购买。如：买两件商品可以打八折。

```java
create table pms_product_ladder
(
   id                   bigint not null auto_increment,
   product_id           bigint comment '商品id',
   count                int comment '满足的商品数量',
   discount             decimal(10,2) comment '折扣',
   price                decimal(10,2) comment '折后价格',
   primary key (id)
);
```

### 2.2 商品满减表

商品优惠相关表，购买同商品满足一定金额后，可以减免一定金额。如：买满1000减100元。

```java
create table pms_product_full_reduction
(
   id                   bigint not null auto_increment,
   product_id           bigint comment '商品id',
   full_price           decimal(10,2) comment '商品满足金额',
   reduce_price         decimal(10,2) comment '商品减少金额',
   primary key (id)
);
```

### 2.3 商品会员价格表

根据不同会员等级，可以以不同的会员价格购买。此处设计有缺陷，可以做成不同会员等级可以减免多少元或者按多少折扣进行购买。

```java
create table pms_member_price
(
   id                   bigint not null auto_increment,
   product_id           bigint comment '商品id',
   member_level_id      bigint comment '会员等级id',
   member_price         decimal(10,2) comment '会员价格',
   member_level_name    varchar(100) comment '会员等级名称',
   primary key (id)
);
```

## 3. 代码设计

### 3.1 新增商品

```java
@Override
public int create(PmsProductParam productParam) {
    int count;
    //创建商品
    PmsProduct product = productParam;
    product.setId(null);
    productMapper.insertSelective(product);
    //根据促销类型设置价格：会员价格、阶梯价格、满减价格
    Long productId = product.getId();
    //会员价格
    relateAndInsertList(memberPriceDao, productParam.getMemberPriceList(), productId);
    //阶梯价格
    relateAndInsertList(productLadderDao, productParam.getProductLadderList(), productId);
    //满减价格
    relateAndInsertList(productFullReductionDao, productParam.getProductFullReductionList(), productId);
    return count;
}
```

建立关联关系表（这个方法抽取得还不错）

```java
 /**
     * 建立和插入关系表操作
     *
     * @param dao       可以操作的dao
     * @param dataList  要插入的数据
     * @param productId 建立关系的id
     */
    private void relateAndInsertList(Object dao, List dataList, Long productId) {
        try {
            if (CollectionUtils.isEmpty(dataList)) return;
            for (Object item : dataList) {
                Method setId = item.getClass().getMethod("setId", Long.class);
                setId.invoke(item, (Long) null);
                Method setProductId = item.getClass().getMethod("setProductId", Long.class);
                setProductId.invoke(item, productId);
            }
            Method insertList = dao.getClass().getMethod("insertList", List.class);
            insertList.invoke(dao, dataList);
        } catch (Exception e) {
            LOGGER.warn("创建产品出错:{}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
```

### 3.2  更新促销价格

- 促销更新：直接更新商品信息
- 会员价格：先清除历史会员价格

```java
@Override
public int update(Long id, PmsProductParam productParam) {
    int count;
    //更新商品信息
    PmsProduct product = productParam;
    product.setId(id);
    productMapper.updateByPrimaryKeySelective(product);
    //会员价格
    PmsMemberPriceExample pmsMemberPriceExample = new PmsMemberPriceExample();
    pmsMemberPriceExample.createCriteria().andProductIdEqualTo(id);
    memberPriceMapper.deleteByExample(pmsMemberPriceExample);
    relateAndInsertList(memberPriceDao, productParam.getMemberPriceList(), id);
    //阶梯价格
    PmsProductLadderExample ladderExample = new PmsProductLadderExample();
    ladderExample.createCriteria().andProductIdEqualTo(id);
    productLadderMapper.deleteByExample(ladderExample);
    relateAndInsertList(productLadderDao, productParam.getProductLadderList(), id);
    //满减价格
    PmsProductFullReductionExample fullReductionExample = new PmsProductFullReductionExample();
    fullReductionExample.createCriteria().andProductIdEqualTo(id);
    productFullReductionMapper.deleteByExample(fullReductionExample);
    relateAndInsertList(productFullReductionDao, productParam.getProductFullReductionList(), id);
    
}
```

### 3.3 促销实现

首先要介绍一下这个，**购物车中促销信息的封装**，继承自购物车item

1. 我们以spu为单位查询出所有的促销信息
2. 并计算出每件商品的优惠金额
   1. 单品促销的优惠金额：商品原价-促销价
   2. 打折的优惠金额：商品原价-折扣*商品原价
   3. 满减的优惠金额：(商品原价/总价)*满减金额
3. 通过每件商品的优惠金额，计算出优惠总价
4. 所需要支付的金额：总价-优惠总价

```java
/**
 * 购物车中促销信息的封装
 * Created by macro on 2018/8/27.
 */
@Getter
@Setter
public class CartPromotionItem extends OmsCartItem{
    @ApiModelProperty("促销活动信息")
    private String promotionMessage;
    @ApiModelProperty("促销活动减去的金额，针对每个商品")
    private BigDecimal reduceAmount;
    @ApiModelProperty("剩余库存-锁定库存")
    private Integer realStock;
    @ApiModelProperty("购买商品赠送积分")
    private Integer integration;
    @ApiModelProperty("购买商品赠送成长值")
    private Integer growth;
}

```



#### 3.3.1 单品促销

```java
if (promotionType == 1) {
    //单品促销
    for (OmsCartItem item : itemList) {
        CartPromotionItem cartPromotionItem = new CartPromotionItem();
        BeanUtils.copyProperties(item,cartPromotionItem);
        cartPromotionItem.setPromotionMessage("单品促销");
        //优惠的金额=商品原价-促销价
        PmsSkuStock skuStock = getOriginalPrice(promotionProduct, item.getProductSkuId());
        BigDecimal originalPrice = skuStock.getPrice();
        //单品促销使用原价
        cartPromotionItem.setPrice(originalPrice);
        cartPromotionItem.setReduceAmount(originalPrice.subtract(skuStock.getPromotionPrice()));
        cartPromotionItem.setRealStock(skuStock.getStock()-skuStock.getLockStock());
        cartPromotionItem.setIntegration(promotionProduct.getGiftPoint());
        cartPromotionItem.setGrowth(promotionProduct.getGiftGrowth());
        cartPromotionItemList.add(cartPromotionItem);
    }
}
```

#### 3.3.2 打折优惠

```java
 else if (promotionType == 3) {
    //打折优惠
    int count = getCartItemCount(itemList);
    PmsProductLadder ladder = getProductLadder(count, promotionProduct.getProductLadderList());
    if(ladder!=null){
        for (OmsCartItem item : itemList) {
            CartPromotionItem cartPromotionItem = new CartPromotionItem();
            BeanUtils.copyProperties(item,cartPromotionItem);
            String message = getLadderPromotionMessage(ladder);
            cartPromotionItem.setPromotionMessage(message);
            //优惠的金额=商品原价-折扣*商品原价
            PmsSkuStock skuStock = getOriginalPrice(promotionProduct,item.getProductSkuId());
            BigDecimal originalPrice = skuStock.getPrice();
            BigDecimal reduceAmount = originalPrice.subtract(ladder.getDiscount().multiply(originalPrice));
            cartPromotionItem.setReduceAmount(reduceAmount);
            cartPromotionItem.setRealStock(skuStock.getStock()-skuStock.getLockStock());
            cartPromotionItem.setIntegration(promotionProduct.getGiftPoint());
            cartPromotionItem.setGrowth(promotionProduct.getGiftGrowth());
            cartPromotionItemList.add(cartPromotionItem);
        }
    }else{
        handleNoReduce(cartPromotionItemList,itemList,promotionProduct);
    }
}
```

#### 3.3.3 满减

```java
else if (promotionType == 4) {
    //满减
    BigDecimal totalAmount= getCartItemAmount(itemList,promotionProductList);
    PmsProductFullReduction fullReduction = getProductFullReduction(totalAmount,promotionProduct.getProductFullReductionList());
    if(fullReduction!=null){
        for (OmsCartItem item : itemList) {
            CartPromotionItem cartPromotionItem = new CartPromotionItem();
            BeanUtils.copyProperties(item,cartPromotionItem);
            String message = getFullReductionPromotionMessage(fullReduction);
            cartPromotionItem.setPromotionMessage(message);
            //优惠的金额=(商品原价/总价)*满减金额
            PmsSkuStock skuStock= getOriginalPrice(promotionProduct, item.getProductSkuId());
            BigDecimal originalPrice = skuStock.getPrice();
            BigDecimal reduceAmount = originalPrice.divide(totalAmount,RoundingMode.HALF_EVEN).multiply(fullReduction.getReducePrice());
            cartPromotionItem.setReduceAmount(reduceAmount);
            cartPromotionItem.setRealStock(skuStock.getStock()-skuStock.getLockStock());
            cartPromotionItem.setIntegration(promotionProduct.getGiftPoint());
            cartPromotionItem.setGrowth(promotionProduct.getGiftGrowth());
            cartPromotionItemList.add(cartPromotionItem);
        }
    }else{
        handleNoReduce(cartPromotionItemList,itemList,promotionProduct);
    }
} 
```

### 3.4 计算促销优惠价格（完整流程）

#### 3.4.1 根据购物车id 生成确认单时，计算促销信息

```java
List<CartPromotionItem> cartPromotionItemList = cartItemService.listPromotion(currentMember.getId(), cartIds);
result.setCartPromotionItemList(cartPromotionItemList);
```

#### 3.4.2 计算购物车中的促销信息

```java
 @Override
    public List<CartPromotionItem> listPromotion(Long memberId, List<Long> cartIds) {
        List<OmsCartItem> cartItemList = list(memberId);
        if(CollUtil.isNotEmpty(cartIds)){
            cartItemList = cartItemList.stream().filter(item->cartIds.contains(item.getId())).collect(Collectors.toList());
        }
        List<CartPromotionItem> cartPromotionItemList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(cartItemList)){
            cartPromotionItemList = promotionService.calcCartPromotion(cartItemList);
        }
        return cartPromotionItemList;
    }
```

#### 3.4.3 先根据productId对CartItem进行分组，以spu为单位进行计算优惠

```java
 /**
     * 以spu为单位对购物车中商品进行分组
     */
    private Map<Long, List<OmsCartItem>> groupCartItemBySpu(List<OmsCartItem> cartItemList) {
        Map<Long, List<OmsCartItem>> productCartMap = new TreeMap<>();
        for (OmsCartItem cartItem : cartItemList) {
            List<OmsCartItem> productCartItemList = productCartMap.get(cartItem.getProductId());
            if (productCartItemList == null) {
                productCartItemList = new ArrayList<>();
                productCartItemList.add(cartItem);
                productCartMap.put(cartItem.getProductId(), productCartItemList);
            } else {
                productCartItemList.add(cartItem);
            }
        }
        return productCartMap;
    }
```

#### 3.4.4 查询所有商品的优惠相关信息（sql关联表）

```java
<select id="getPromotionProductList" resultMap="promotionProductMap">
    SELECT
        p.id,
        p.`name`,
        p.promotion_type,
        p.gift_growth,
        p.gift_point,
        sku.id sku_id,
        sku.price sku_price,
        sku.sku_code sku_sku_code,
        sku.promotion_price sku_promotion_price,
        sku.stock sku_stock,
        sku.lock_stock sku_lock_stock,
        ladder.id ladder_id,
        ladder.count ladder_count,
        ladder.discount ladder_discount,
        full_re.id full_id,
        full_re.full_price full_full_price,
        full_re.reduce_price full_reduce_price
    FROM
        pms_product p
        LEFT JOIN pms_sku_stock sku ON p.id = sku.product_id
        LEFT JOIN pms_product_ladder ladder ON p.id = ladder.product_id
        LEFT JOIN pms_product_full_reduction full_re ON p.id = full_re.product_id
    WHERE
        p.id IN
    <foreach collection="ids" open="(" close=")" item="id" separator=",">
        #{id}
    </foreach>
</select>
```

#### 3.4.5 计算商品促销优惠价格

```java
 List<CartPromotionItem> cartPromotionItemList = new ArrayList<>();
        for (Map.Entry<Long, List<OmsCartItem>> entry : productCartMap.entrySet()) {
            Long productId = entry.getKey();
            PromotionProduct promotionProduct = getPromotionProductById(productId, promotionProductList);
            List<OmsCartItem> itemList = entry.getValue();
            Integer promotionType = promotionProduct.getPromotionType();
            if (promotionType == 1) {
                //单品促销
                for (OmsCartItem item : itemList) {
                    CartPromotionItem cartPromotionItem = new CartPromotionItem();
                    BeanUtils.copyProperties(item,cartPromotionItem);
                    cartPromotionItem.setPromotionMessage("单品促销");
                    //商品原价-促销价
                    PmsSkuStock skuStock = getOriginalPrice(promotionProduct, item.getProductSkuId());
                    BigDecimal originalPrice = skuStock.getPrice();
                    //单品促销使用原价
                    cartPromotionItem.setPrice(originalPrice);
                    cartPromotionItem.setReduceAmount(originalPrice.subtract(skuStock.getPromotionPrice()));
                    cartPromotionItem.setRealStock(skuStock.getStock()-skuStock.getLockStock());
                    cartPromotionItem.setIntegration(promotionProduct.getGiftPoint());
                    cartPromotionItem.setGrowth(promotionProduct.getGiftGrowth());
                    cartPromotionItemList.add(cartPromotionItem);
                }
            } else if (promotionType == 3) {
                //打折优惠
                int count = getCartItemCount(itemList);
                PmsProductLadder ladder = getProductLadder(count, promotionProduct.getProductLadderList());
                if(ladder!=null){
                    for (OmsCartItem item : itemList) {
                        CartPromotionItem cartPromotionItem = new CartPromotionItem();
                        BeanUtils.copyProperties(item,cartPromotionItem);
                        String message = getLadderPromotionMessage(ladder);
                        cartPromotionItem.setPromotionMessage(message);
                        //商品原价-折扣*商品原价
                        PmsSkuStock skuStock = getOriginalPrice(promotionProduct,item.getProductSkuId());
                        BigDecimal originalPrice = skuStock.getPrice();
                        BigDecimal reduceAmount = originalPrice.subtract(ladder.getDiscount().multiply(originalPrice));
                        cartPromotionItem.setReduceAmount(reduceAmount);
                        cartPromotionItem.setRealStock(skuStock.getStock()-skuStock.getLockStock());
                        cartPromotionItem.setIntegration(promotionProduct.getGiftPoint());
                        cartPromotionItem.setGrowth(promotionProduct.getGiftGrowth());
                        cartPromotionItemList.add(cartPromotionItem);
                    }
                }else{
                    handleNoReduce(cartPromotionItemList,itemList,promotionProduct);
                }
            } else if (promotionType == 4) {
                //满减
                BigDecimal totalAmount= getCartItemAmount(itemList,promotionProductList);
                PmsProductFullReduction fullReduction = getProductFullReduction(totalAmount,promotionProduct.getProductFullReductionList());
                if(fullReduction!=null){
                    for (OmsCartItem item : itemList) {
                        CartPromotionItem cartPromotionItem = new CartPromotionItem();
                        BeanUtils.copyProperties(item,cartPromotionItem);
                        String message = getFullReductionPromotionMessage(fullReduction);
                        cartPromotionItem.setPromotionMessage(message);
                        //(商品原价/总价)*满减金额
                        PmsSkuStock skuStock= getOriginalPrice(promotionProduct, item.getProductSkuId());
                        BigDecimal originalPrice = skuStock.getPrice();
                        BigDecimal reduceAmount = originalPrice.divide(totalAmount,RoundingMode.HALF_EVEN).multiply(fullReduction.getReducePrice());
                        cartPromotionItem.setReduceAmount(reduceAmount);
                        cartPromotionItem.setRealStock(skuStock.getStock()-skuStock.getLockStock());
                        cartPromotionItem.setIntegration(promotionProduct.getGiftPoint());
                        cartPromotionItem.setGrowth(promotionProduct.getGiftGrowth());
                        cartPromotionItemList.add(cartPromotionItem);
                    }
                }else{
                    handleNoReduce(cartPromotionItemList,itemList,promotionProduct);
                }
            } else {
                //无优惠
                handleNoReduce(cartPromotionItemList, itemList,promotionProduct);
            }
        }
        return cartPromotionItemList;
    }
```

### 3.5 需支付的总金额

此时的计算就是商品的价格-促销价格

```java
private BigDecimal calcTotalAmount(List<CartPromotionItem> cartItemList) {
    BigDecimal total = new BigDecimal("0");
    for (CartPromotionItem item : cartItemList) {
        BigDecimal realPrice = item.getPrice().subtract(item.getReduceAmount());
        total=total.add(realPrice.multiply(new BigDecimal(item.getQuantity())));
    }
    return total;
}
```

## 4. 界面设计

### 4.1 管理端

#### 4.1.1 填写促销

![image-20220323200719031](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220323200719031.png)

#### 4.1.2 特惠促销

![image-20220323200820529](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220323200820529.png)

#### 4.1.3 会员价格

![image-20220323200838867](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220323200838867.png)

## 5. 相关问题

### 5.1 什么时候需要计算促销金额

1. 生成确认单的时候
   1. 优惠券是否符合满减需求，就已经使用了促销完成后的金额
2. 下单时

### 5.2  优惠方式表设计

- 特惠促销：一件商品只有一个优惠价。是一对一的关系，所以设计在商品表中

- 会员价，阶梯价、满减：都是一对多的关系，所以采用外表方式

## 参考文章

[mall官网](http://www.macrozheng.com/#/database/mall_pms_02)
