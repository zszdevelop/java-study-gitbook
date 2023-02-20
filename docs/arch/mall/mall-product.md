# mall中商品设计

>该篇文章主要参考[mall官方文档](http://www.macrozheng.com/#/README)，并结合自己的使用感受做的一些笔记

## 1. 简介



## 2. 接口设计

### 2.1 获取商品详情

1. 获取商品的基础信息
2. 获取品牌信息
3. 获取商品属性信息
4. 获取商品SKU库存信息
5. 商品阶梯价格设置
6. 商品满减价格设置
7. 商品可用优惠券

```java
@Override
public PmsPortalProductDetail detail(Long id) {
    PmsPortalProductDetail result = new PmsPortalProductDetail();
    //获取商品信息
    PmsProduct product = productMapper.selectByPrimaryKey(id);
    result.setProduct(product);
    //获取品牌信息
    PmsBrand brand = brandMapper.selectByPrimaryKey(product.getBrandId());
    result.setBrand(brand);
    //获取商品属性信息
    Long productAttributeCategoryId = product.getProductAttributeCategoryId();
    if(productAttributeCategoryId != null){
        PmsProductAttributeExample attributeExample = new PmsProductAttributeExample();
        attributeExample.createCriteria().andProductAttributeCategoryIdEqualTo(productAttributeCategoryId);
        List<PmsProductAttribute> productAttributeList = productAttributeMapper.selectByExample(attributeExample);
        result.setProductAttributeList(productAttributeList);
        //获取商品属性值信息
        if(CollUtil.isNotEmpty(productAttributeList)){
            List<Long> attributeIds = productAttributeList.stream().map(PmsProductAttribute::getId).collect(Collectors.toList());
            PmsProductAttributeValueExample attributeValueExample = new PmsProductAttributeValueExample();
            attributeValueExample.createCriteria().andProductIdEqualTo(product.getId())
                    .andProductAttributeIdIn(attributeIds);
            List<PmsProductAttributeValue> productAttributeValueList = productAttributeValueMapper.selectByExample(attributeValueExample);
            result.setProductAttributeValueList(productAttributeValueList);
        }
    }
  

        //获取商品SKU库存信息
        PmsSkuStockExample skuExample = new PmsSkuStockExample();
        skuExample.createCriteria().andProductIdEqualTo(product.getId());
        List<PmsSkuStock> skuStockList = skuStockMapper.selectByExample(skuExample);
        result.setSkuStockList(skuStockList);
        //商品阶梯价格设置
        if(product.getPromotionType()==3){
            PmsProductLadderExample ladderExample = new PmsProductLadderExample();
            ladderExample.createCriteria().andProductIdEqualTo(product.getId());
            List<PmsProductLadder> productLadderList = productLadderMapper.selectByExample(ladderExample);
            result.setProductLadderList(productLadderList);
        }
        //商品满减价格设置
        if(product.getPromotionType()==4){
            PmsProductFullReductionExample fullReductionExample = new PmsProductFullReductionExample();
            fullReductionExample.createCriteria().andProductIdEqualTo(product.getId());
            List<PmsProductFullReduction> productFullReductionList = productFullReductionMapper.selectByExample(fullReductionExample);
            result.setProductFullReductionList(productFullReductionList);
        }
        //商品可用优惠券
        result.setCouponList(portalProductDao.getAvailableCouponList(product.getId(),product.getProductCategoryId()));
        return result;
    }
```

#### 2.1.1 获取可用优惠券列表

获取具体商品的可用优惠券，

```sql
<select id="getAvailableCouponList" resultMap="com.macro.mall.mapper.SmsCouponMapper.BaseResultMap">
    SELECT *
    FROM sms_coupon
    WHERE use_type = 0
      AND start_time &lt; NOW()
      AND end_time &gt; NOW()
    UNION
    (
        SELECT c.*
        FROM sms_coupon_product_category_relation cpc
                 LEFT JOIN sms_coupon c ON cpc.coupon_id = c.id
        WHERE c.use_type = 1
          AND c.start_time &lt; NOW()
          AND c.end_time &gt; NOW()
          AND cpc.product_category_id = #{productCategoryId}
    )
    UNION
    (
        SELECT c.*
        FROM sms_coupon_product_relation cp
                 LEFT JOIN sms_coupon c ON cp.coupon_id = c.id
        WHERE c.use_type = 2
          AND c.start_time &lt; NOW()
          AND c.end_time &gt; NOW()
          AND cp.product_id = #{productId}
    )
</select>
```