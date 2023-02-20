# mall中商品属性类型（类型=属性=规格+参数）设计

## 1. 简介

商品类型即商品属性，主要是指商品的规格和参数，

- 规格：用于用户购买商品时选择
- 参数：用于标示商品属性及搜索时筛选。

## 2. 表设计

![image-20220320091410960](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320091410960.png)

### 2.1 商品属性分类表

```sql
create table pms_product_attribute_category
(
   id                   bigint not null auto_increment,
   name                 varchar(64) comment '名称',
   attribute_count      int comment '属性数量',
   param_count          int comment '参数数量',
   primary key (id)
);
```

### 2.2 商品属性表

type字段用于控制其是规格还是参数

- type：属性的类型；0->规格；1->参数',

```java
create table pms_product_attribute
(
   id                   bigint not null auto_increment,
   product_attribute_category_id bigint comment '商品属性分类id',
   name                 varchar(64) comment '名称',
   select_type          int(1) comment '属性选择类型：0->唯一；1->单选；2->多选；对应属性和参数意义不同；',
   input_type           int(1) comment '属性录入方式：0->手工录入；1->从列表中选取',
   input_list           varchar(255) comment '可选值列表，以逗号隔开',
   sort                 int comment '排序字段：最高的可以单独上传图片',
   filter_type          int(1) comment '分类筛选样式：1->普通；1->颜色',
   search_type          int(1) comment '检索类型；0->不需要进行检索；1->关键字检索；2->范围检索',
   related_status       int(1) comment '相同属性产品是否关联；0->不关联；1->关联',
   hand_add_status      int(1) comment '是否支持手动新增；0->不支持；1->支持',
   type                 int(1) comment '属性的类型；0->规格；1->参数',
   primary key (id)
);
```

### 2.3 商品属性值表

如果对应的参数是规格且规格支持手动添加，那么该表用于存储手动新增的值；如果对应的商品属性是参数，那么该表用于存储参数的值。

```sql
create table pms_product_attribute_value
(
   id                   bigint not null auto_increment,
   product_id           bigint comment '商品id',
   product_attribute_id bigint comment '商品属性id',
   value                varchar(64) comment '手动添加规格或参数的值，参数单值，规格有多个时以逗号隔开',
   primary key (id)
);
```

### 2.4 商品分类和属性的关系表

用于选中分类后搜索时生成筛选属性。

```sql
create table pms_product_category_attribute_relation
(
   id                   bigint not null auto_increment,
   product_category_id  bigint comment '商品分类id',
   product_attribute_id bigint comment '商品属性id',
   primary key (id)
);
```

## 3. 代码设计

### 3.1 新增商品属性

新增商品属性以后需要更新商品属性分类数量

```java
@Override
    public int create(PmsProductAttributeParam pmsProductAttributeParam) {
        PmsProductAttribute pmsProductAttribute = new PmsProductAttribute();
        BeanUtils.copyProperties(pmsProductAttributeParam, pmsProductAttribute);
        int count = productAttributeMapper.insertSelective(pmsProductAttribute);
        //新增商品属性以后需要更新商品属性分类数量
        PmsProductAttributeCategory pmsProductAttributeCategory = productAttributeCategoryMapper.selectByPrimaryKey(pmsProductAttribute.getProductAttributeCategoryId());
        if(pmsProductAttribute.getType()==0){
            pmsProductAttributeCategory.setAttributeCount(pmsProductAttributeCategory.getAttributeCount()+1);
        }else if(pmsProductAttribute.getType()==1){
            pmsProductAttributeCategory.setParamCount(pmsProductAttributeCategory.getParamCount()+1);
        }
        productAttributeCategoryMapper.updateByPrimaryKey(pmsProductAttributeCategory);
        return count;
    }
```



## 4. 界面设计

### 4.1 管理端

#### 4.1.1 商品属性分类列表

![image-20220320085212569](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085212569.png)

#### 4.1.2 商品规格列表

![image-20220320085314213](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085314213.png)

#### 4.1.3 商品参数列表

![image-20220320085349425](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085349425.png)

#### 4.1.4 添加商品属性

![image-20220320085501748](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085501748.png)

#### 4.1.5添加商品时，选中商品属性分类，就会显示该分类的属性，用于生成sku

![image-20220320085541469](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085541469.png)

#### 4.1.6 添加商品时，选中商品属性分类，会显示该分类的参数用于录入

![image-20220320085637294](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085637294.png)

### 4.2 移动端

#### 4.2.1 选择商品规格

![image-20220320085754333](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085754333.png)

#### 4.2.2 查看商品参数

![image-20220320085836611](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085836611.png)

#### 4.2.3 搜索商品时用于选择分类后的筛选

![image-20220320085906873](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320085906873.png)
