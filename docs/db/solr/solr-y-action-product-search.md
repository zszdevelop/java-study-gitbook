# Solr实战-商品搜索

## 1. 简介

## 2. 基础准备

### 2.1 添加依赖

springboot 版本为 2.2.12.RELEASE

```xml
<!-- solr驱动 -->
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-solr</artifactId>
</dependency>
```

### 2.2 yml配置solr地址

```yml
spring:
	data:
    solr:
      host: http://localhost:8080/solr/mycore
```



### 2.3 商品信息实体类

- @Field ： 为solr 中对应的字段

```java
package com.zszdevelop.solrsearch.domain.solr;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

import java.math.BigDecimal;
import java.util.List;

/**
 * solr 商品信息
 *
 * @author zsz
 * @date 2022-19-19
 */
@Data
public class SolrProduct {


    /**
     * solr 中存储字段
     * 方便在其他搜索中引用solr字段
     * 因在实体类中用到，只能定义成常量
     */
    public interface FIELD {
        String ID = "duuid";
        String PRODUCT_SN = "productSn_s";
        String BRAND_ID = "brandId_l";
        String BRAND_NAME = "brandName_ik";
        String PRODUCT_CATEGORY_ID = "productCategoryId_l";
        String PRODUCT_CATEGORY_NAME = "productCategoryName_ik";
        String PIC = "pic_s";
        String NAME = "name_ik";
        String SUB_TITLE = "subTitle_ik";
        String KEYWORDS = "keywords_ik";
        String PRICE = "price_d";
        String SALE = "sale_i";
        String STOCK = "stock_i";
        String PROMOTION_TYPE = "promotionType_i";
        String SORT = "sort_i";


    }

    @Field(value = FIELD.ID)
    @ApiModelProperty("id")
    private String id;

    @Field(value = FIELD.PRODUCT_SN)
    @ApiModelProperty(value = "商品sn")
    private String productSn;

    @Field(value = FIELD.BRAND_ID)
    @ApiModelProperty(value = "品牌id")
    private Long brandId;

    @Field(value = FIELD.BRAND_NAME)
    @ApiModelProperty(value = "品牌名称")
    private String brandName;

    @Field(value = FIELD.PRODUCT_CATEGORY_ID)
    @ApiModelProperty(value = "商品分类id")
    private Long productCategoryId;

    @Field(value = FIELD.PRODUCT_CATEGORY_NAME)
    @ApiModelProperty(value = "分类名称")
    private String productCategoryName;

    @Field(value = FIELD.PIC)
    @ApiModelProperty(value = "图片地址")
    private String pic;

    @Field(value = FIELD.NAME)
    @ApiModelProperty(value = "商品名称")
    private String name;

    @Field(value = FIELD.SUB_TITLE)
    @ApiModelProperty(value = "标题名称")
    private String subTitle;

    @Field(value = FIELD.KEYWORDS)
    @ApiModelProperty(value = "关键字")
    private String keywords;

    // solr中没有BigDecimal的Field，又不涉及金钱计算设置为Double
    @Field(value = FIELD.PRICE)
    @ApiModelProperty(value = "价格")
    private Double price;

    @Field(value = FIELD.SALE)
    @ApiModelProperty(value = "折扣")
    private Integer sale;

    @Field(value = FIELD.STOCK)
    @ApiModelProperty(value = "库存")
    private Integer stock;

    @Field(value = FIELD.PROMOTION_TYPE)
    @ApiModelProperty(value = "促销类型")
    private Integer promotionType;


    @Field(value = FIELD.SORT)
    @ApiModelProperty(value = "排序")
    private Integer sort;

//    @Field(type =FieldType.Nested)


//    @Field(value = "attrValueList_iks")
//    @ApiModelProperty(value =  "商品属性列表")
//    private List<SolrProductAttributeValue> attrValueList;
}


```

### 2.4 导入的原始商品信息mapper

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zszdevelop.solrsearch.dao.SolrProductDao">
    <resultMap id="solrProductListMap" type="com.zszdevelop.solrsearch.domain.solr.SolrProduct" autoMapping="true">
        <id column="id" jdbcType="BIGINT" property="id" />
        <collection property="attrValueList" columnPrefix="attr_" ofType="com.zszdevelop.solrsearch.domain.solr.SolrProductAttributeValue">
            <id column="id" property="id" jdbcType="BIGINT"/>
            <result column="product_attribute_id" property="productAttributeId" jdbcType="BIGINT"/>
            <result column="value" property="value" jdbcType="VARCHAR"/>
            <result column="type" property="type"/>
            <result column="name" property="name"/>
        </collection>
    </resultMap>
    <select id="getAllSolrProductList" resultMap="solrProductListMap">
        select
            p.id id,
            p.product_sn productSn,
            p.brand_id brandId,
            p.brand_name brandName,
            p.product_category_id productCategoryId,
            p.product_category_name productCategoryName,
            p.pic pic,
            p.name name,
            p.sub_title subTitle,
            p.price price,
            p.sale sale,
            p.new_status newStatus,
            p.recommand_status recommandStatus,
            p.stock stock,
            p.promotion_type promotionType,
            p.keywords keywords,
            p.sort sort,
            pav.id attr_id,
            pav.value attr_value,
            pav.product_attribute_id attr_product_attribute_id,
            pa.type attr_type,
            pa.name attr_name
        from pms_product p
        left join pms_product_attribute_value pav on p.id = pav.product_id
        left join pms_product_attribute pa on pav.product_attribute_id= pa.id
        where delete_status = 0 and publish_status = 1
        <if test="id!=null">
            and p.id=#{id}
        </if>
    </select>
</mapper>
```

## 3. 导入数据

- 添加数据

  solrClient.addBeans(solrProductList);

- 提交

  solrClient.commit();

```java
 @Resource
    SolrProductDao solrProductDao;
    @Resource
    private SolrClient solrClient;

    @Override
    public int importAll() throws Exception {
        // 1. 查询需要入solr的数据
        List<SolrProduct> solrProductList = solrProductDao.getAllSolrProductList(null);
        // 2.添加数据并提交
        solrClient.addBeans(solrProductList);
        solrClient.commit();
        return solrProductList.size();
    }
```

## 4. 搜索

```java
 /**
     * 高亮前缀
     */
    public static final String HIGHHIGHT_PRE_PRIX = "<span class=\"ft-highLight\">";

    /**
     * 高亮后缀
     */
    public static final String HIGHLIGHT_POST_PRIX = "</span>";
 
    
@Override
    public SearchResponse<SolrProduct> search(String keyword, Integer pageNum, Integer pageSize,Integer sort) {
        SearchResponse response = new SearchResponse();
        try {
            // 1.构建solr查询
            SolrQuery solrQuery = handleSolrQuery(keyword);
            log.info("\nSolrQuery查询语句==>\nq：" + solrQuery.getQuery() +"\nfq："+ solrQuery.getFilterQueries());
            // 2.分页
            solrQuery.setStart((pageNum - 1) * pageSize);
            solrQuery.setRows(pageSize);
            // 3. 添加高亮
            setHighlight(solrQuery);
            // 4. 添加排序规则
            addSolrSort(solrQuery,sort);
            // 5. solr查询
            QueryResponse queryResponse = solrClient.query(solrQuery);

            // 5 封装结果信息
            List searchResult = getSearchResult(queryResponse);
            // 6 计算总数
            long total = queryResponse.getResults().getNumFound();
            // 7. 设置返回结果信息
            response.setTotal(total);
            response.setSearchResult(searchResult);

        } catch (Exception e) {
            log.info("查询案件列表信息异常,{}", e.getMessage(), e);
            throw new RuntimeException("查询案件列表信息异常", e);
        }
        return response;
    }



    /**
     * 构建查询字段
     * @param keyword
     * @return
     */
    private SolrQuery handleSolrQuery(String keyword) {
        if (StringUtils.isEmpty(keyword)) {
            return new SolrQuery("*:*");
        }
        // 获取过滤的字段
        List<String> fieldList = getFieldList();

        StringBuilder tempSb = new StringBuilder();

        for (int i = 0; i < fieldList.size(); i++) {
            String field = fieldList.get(i);
            String searchSq = getSearchSqByField(keyword, field);
            if (StringUtils.isNotEmpty(searchSq)) {
                tempSb.append("(");
                tempSb.append(searchSq);
                tempSb.append(")");
                if (i != (fieldList.size() - 1)) {
                    tempSb.append(" OR ");
                }
            }
        }

        String search = tempSb.toString();

        // 构建solrQuery
        SolrQuery sq = new SolrQuery(search);

        return sq;
    }

    private String getSearchSqByField(String keyword, String field) {
        String searchSq = "";
        if (field.contains("_s")) {
            if (StringUtils.isEmpty(searchSq)) {
                searchSq += field + ":*" + keyword + "*";
            } else {
                searchSq += " AND " + field + ":*" + keyword + "*";
            }
        } else {
            if (StringUtils.isEmpty(searchSq)) {
                searchSq += field + ":" + keyword;
            } else {
                searchSq += " AND " + field + ":" + keyword;
            }
        }
        return searchSq;
    }

    /**
     * 搜索结果处理封装
     *  1. 将高亮字段赋值到正常字段
     * @param queryResponse
     * @return
     */
    private List getSearchResult(QueryResponse queryResponse) {
        // 5.对结果进行处理
        // 5.1 处理返回列表
        List<SolrProduct> solrResult = queryResponse.getBeans(SolrProduct.class);
        Map<String, Map<String, List<String>>> highLightMap = queryResponse.getHighlighting();

        for (SolrProduct solrProduct : solrResult) {

            if (highLightMap != null) {
                Map<String, List<String>> highLightFieldMap = highLightMap.get(solrProduct.getId());
                List<String> fieldList = getFieldList();
                for (String field : fieldList) {
                    if (highLightFieldMap.containsKey(field)
                            && StringUtils.isNotEmpty(highLightFieldMap.get(field).get(0))) {
                        List<String> list = highLightFieldMap.get(field);
                          if (Objects.equals(field, SolrProduct.FIELD.NAME)) {
                            solrProduct.setName(list.get(0));
                        } else if (Objects.equals(field,  SolrProduct.FIELD.SUB_TITLE)) {
                            solrProduct.setSubTitle(list.get(0));
                        }
                    }
                }
            }
        }
        return solrResult;
    }


    /**
     * 排序
     * @param solrQuery
     * @param sort
     */
    private void addSolrSort(SolrQuery solrQuery,Integer sort) {

        //排序
        if(sort==1){
            //按新品从新到旧
            solrQuery.setSort(SolrProduct.FIELD.ID,SolrQuery.ORDER.desc);
        }else if(sort==2){
            //按销量从高到低
            solrQuery.setSort(SolrProduct.FIELD.SALE,SolrQuery.ORDER.desc);
        }else if(sort==3){
            //按价格从低到高
            solrQuery.setSort(SolrProduct.FIELD.PRICE,SolrQuery.ORDER.asc);
        }else if(sort==4){
            //按价格从高到低
            solrQuery.setSort(SolrProduct.FIELD.PRICE,SolrQuery.ORDER.desc);
        }else{
            //按相关度  权重分
            solrQuery.setSort("score",SolrQuery.ORDER.desc);
        }
    }



    /**
     * 高亮设置
     * @param sq
     */
    private void setHighlight(SolrQuery sq) {
        String highlightField = getHighlightField();
        //如果存在高亮字段则高亮显示
        sq.setHighlight(true);
        sq.setHighlightSimplePre(HIGHHIGHT_PRE_PRIX);
        sq.setHighlightSimplePost(HIGHLIGHT_POST_PRIX);
        sq.set("hl.fl", highlightField);
        sq.setHighlightRequireFieldMatch(true);
        sq.setHighlightFragsize(300);
    }

    /**
     * 高亮字段
     *
     * @return
     */
    public static String getHighlightField() {
        List<String> fieldList = getFieldList();
        String highlightField = StringUtils.join(fieldList, ",");
        return highlightField;
    }

    /**
     * 搜索字段
     * @return
     */
    private static List<String> getFieldList() {
        List<String> fieldList = new ArrayList<>();
        fieldList.add(SolrProduct.FIELD.NAME);
        fieldList.add(SolrProduct.FIELD.SUB_TITLE);
        return fieldList;
    }
```

## 5.  新增单条数据

```java
  @Override
    public SolrProduct create(Long id) throws Exception {
        SolrProduct solrProduct = null;
        List<SolrProduct> esProductList = solrProductDao.getAllSolrProductList(id);
        if (esProductList.size() > 0) {
            solrProduct = esProductList.get(0);
            solrClient.addBean(solrProduct);
            solrClient.commit();
        }
        return solrProduct;
    }
```

## 6. 删除

```java
   @Override
    public void delete(String id) throws Exception {
        solrClient.deleteById(id);
        solrClient.commit();
    }
    
 		@Override
    public void delete(List<String> ids) throws Exception {
        solrClient.deleteById(ids);
        solrClient.commit();
    }
```

