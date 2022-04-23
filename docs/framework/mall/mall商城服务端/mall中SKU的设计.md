# mall中SKU的设计

>该篇文章主要参考[mall官方文档](http://www.macrozheng.com/#/technology/product_sku)，并结合自己的使用感受做的一些笔记

## 1. 简介

### 1.1 商品的SPU和SKU

- SPU（Standard Product Unit ）:指的是标准商品单位，商品信息聚合的最小单位，是一组可复用、易检索的标准化信息的集合，该集合描述了一个商品的特性；
- SKU（Stock Keeping Unit）:库存量单位，是物理上不可分割的最小存货单元。

举个例子：比如说现在有个手机商品叫小米8，小米8有不同的属性，比如有它有黑色和蓝色的，有32G和64G版本的。**此时`小米8`就是一个SPU，而`小米8黑色64G`就是一个SKU**。

![image-20220319204336926](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220319204336926.png)

## 2. SKU 的数据库设计

由于商品的销售属性是动态的，没法确定到底有多少个，此时我们可以改用JSON格式来存储，在`pms_sku_stock`表中添加了`sp_data`字段。

![image-20220319204927694](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220319204927694.png)

`sp_data`存储的就是一个JSON数组，比如颜色为黑色，容量为32G的手机存储信息如下。

```json
[
    {
        "key": "颜色",
        "value": "黑色"
    },
    {
        "key": "容量",
        "value": "32G"
    }
]Copy to clipboardErrorCopied
```

这样修改以后，在原来的购物车表`oms_cart_item`和订单商品表`oms_order_item`中就都可以用JSON格式来存储销售属性了，使用的是`product_attr`字段。

## 3. Sku 的代码层设计

### 3.1 商品关联SKU的修改

首先我们需要和前端约定下，新增的商品SKU信息不传ID，要修改的商品SKU信息传ID，删除的直接不传SKU信息。然后我们可以根据传入的SKU信息来确定需要新增、修改、删除的SKU信息，这样就可以做到在更新商品SKU信息时，不改变原来商品SKU的ID了，具体流程如下。

```java
/**
 * 商品管理Service实现类
 * Created by macro on 2018/4/26.
 */
@Service
public class PmsProductServiceImpl implements PmsProductService {
    private void handleUpdateSkuStockList(Long id, PmsProductParam productParam) {
        //当前的sku信息
        List<PmsSkuStock> currSkuList = productParam.getSkuStockList();
        //当前没有sku直接删除
        if(CollUtil.isEmpty(currSkuList)){
            PmsSkuStockExample skuStockExample = new PmsSkuStockExample();
            skuStockExample.createCriteria().andProductIdEqualTo(id);
            skuStockMapper.deleteByExample(skuStockExample);
            return;
        }
        //获取初始sku信息
        PmsSkuStockExample skuStockExample = new PmsSkuStockExample();
        skuStockExample.createCriteria().andProductIdEqualTo(id);
        List<PmsSkuStock> oriStuList = skuStockMapper.selectByExample(skuStockExample);
        //获取新增sku信息
        List<PmsSkuStock> insertSkuList = currSkuList.stream().filter(item->item.getId()==null).collect(Collectors.toList());
        //获取需要更新的sku信息
        List<PmsSkuStock> updateSkuList = currSkuList.stream().filter(item->item.getId()!=null).collect(Collectors.toList());
        List<Long> updateSkuIds = updateSkuList.stream().map(PmsSkuStock::getId).collect(Collectors.toList());
        //获取需要删除的sku信息
        List<PmsSkuStock> removeSkuList = oriStuList.stream().filter(item-> !updateSkuIds.contains(item.getId())).collect(Collectors.toList());
        handleSkuStockCode(insertSkuList,id);
        handleSkuStockCode(updateSkuList,id);
        //新增sku
        if(CollUtil.isNotEmpty(insertSkuList)){
            relateAndInsertList(skuStockDao, insertSkuList, id);
        }
        //删除sku
        if(CollUtil.isNotEmpty(removeSkuList)){
            List<Long> removeSkuIds = removeSkuList.stream().map(PmsSkuStock::getId).collect(Collectors.toList());
            PmsSkuStockExample removeExample = new PmsSkuStockExample();
            removeExample.createCriteria().andIdIn(removeSkuIds);
            skuStockMapper.deleteByExample(removeExample);
        }
        //修改sku
        if(CollUtil.isNotEmpty(updateSkuList)){
            for (PmsSkuStock pmsSkuStock : updateSkuList) {
                skuStockMapper.updateByPrimaryKeySelective(pmsSkuStock);
            }
        }

    }
}
```



## 4. 相关问题

### 4.1 前端解析sku

#### 4.1.1 Sku 设计背景

后端返回的数据结构是针对每条sku 的笛卡尔积，

例如颜色有3种，尺寸有5个。那么后端返回的就是15条数据。

数据类似如下

![image-20220309231416451](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220309231416451.png)

但我们前端不可能直接显示30条数据，我们希望按类别来选择。

例如：先选颜色，再选尺寸。确定唯一的sku。那么上面的数据结构就不符合我们的要求了

#### 4.1.2 初始化SKU流程

##### 4.1.2.1 将spData规格数据，按属性归类

将sp的数据，封装成Set。达到去重目的

```
原始数据：
spData: "[{"key":"颜色","value":"绿色"},{"key":"尺寸","value":"X"}]"

按属性归类：
尺寸: Set(3) {"XL", "2XL", "X"} 
颜色: Set(2) {"红色", "绿色"}
```

我们需要前端做处理

```js
			// 将sp的数据，封装成对象.如{颜色：['红色','绿色'],尺寸：['X','XL']}
				let specInfo = {};
				for (let i = 0; i < skuStockList.length; i++) {
					let item = skuStockList[i];
					let sp = JSON.parse(item.spData);
					for (let j in sp) {
						let skuKey = sp[j].key;
						if (specInfo[skuKey] == null) {
							specInfo[skuKey] = new Set([]);
						}
						specInfo[skuKey].add(sp[j].value);
						item[skuKey] = sp[j].value;
					}
				}
```

##### 4.1.2.2 将归类数据封装成JSON 对象

因为我们选中状态，还需要设置属性。所以我们需要一个对象来封装、我们将将set 转为list

原始数据按属性归类：

```
尺寸: Set(3) {"XL", "2XL", "X"} 
颜色: Set(2) {"红色", "绿色"}
```

转为list

```
尺寸: Array(3)
0: {value: "XL", selected: true}
1: {value: "2XL"}
2: {value: "X"}
颜色: Array(2)
0: {value: "红色", selected: true}
1: {value: "绿色"}
```

由原来的xl变成了{value: "XL", selected: true}。selected 是为了方便设置选中情况

```js

				for (let key in specInfo) {
					let dataSet = specInfo[key];
					var list = [];
					for (var k of dataSet) {
						list.push({
							value: k
						});
					}
					specInfo[key] = list;
				}
```

##### 4.1.2.3 设置默认选中

循环还是上一步的循环，只是为每条规格，设置了默认值

```js
list[0].selected = true;
checkSku[key]=list[0].value;
```



```js
// 选中的规格Spec: {颜色：'红色',尺码：'x'}
				let checkSpec = {};
				for (let key in specInfo) {
					let dataSet = specInfo[key];
					var list = [];
					for (var k of dataSet) {
						list.push({
							value: k
						});
					}
					specInfo[key] = list;
					list[0].selected = true;
					checkSpec[key]=list[0].value;
				}
```

##### 4.1.2.4 设置选中的库存信息

我们刚一直在处理spData的数据，但我们spdata 要最终关联上库存信息

```json
{id: 179
lockStock: 0
lowStock: 1
price: 11
productId: 37
skuCode: "sku1"
spData: "[{"key":"颜色","value":"红色"},{"key":"尺寸","value":"XL"}]"
stock: 2}
```

我们将sku库存列表遍历对比选中的库存信息

```js
// 选择的sku item
			getCheckSukItem(checkSpec){
				for(let i = 0;i<this.skuStockList.length;i++){
					let item = this.skuStockList[i];
					let isCheckItem = true;
					for(let key in checkSpec){
						let v1 =checkSpec[key];
						let v2 = item[key];
						if(v1 != v2){
							isCheckItem = false;
							break;
						}
					}
					if(isCheckItem){
						return item;
					}
					
				}
			},
```

![image-20220311222612306](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220311222612306.png)

#### 4.1.3. 选中SKU 流程

#####  4.1.3.1 选中状态设置

针对选中的那个规则项列表做初始化选中状态，然后再设置选中项

例如：只初始化了颜色，设置成红色，而尺寸是不会改变的

```js
list.forEach(item => {
					this.$set(item, 'selected', false);
				})

				this.$set(list[index], 'selected', true);
```

#####  4.1.3.2 遍历出所有选中规格

因为规格可能存在多个，上面我们只能得到一个。我们希望遍历出所有选中的规格

```js
let checkSpec = {}
				for(let key in this.specInfo){
					let specList = this.specInfo[key];
					for(let i in specList){
						let spec = specList[i];
						if(spec.selected == true){
							checkSpec[key] = spec.value
						}
					}
				}
				this.checkSpec = checkSpec;
```

#####  4.1.3.3 获取选中的库存信息

```js

let specLength = Object.keys(this.specInfo).length
let checkSpecLength = Object.keys(checkSpec).length
if(specLength == checkSpecLength){
		this.checkSukItem = this.getCheckSukItem(checkSpec);
}
```

### 4.2 商品信息中的价格和sku价格

我们计算商品价格时，基本上都是以sku价格为准，那么商品基本信息中的价格，我们可以理解为商品的最低价格，也就是多少多少元起。具体多少钱，看你选择的sku了

## 参考文章

[mall官方文档](http://www.macrozheng.com/#/technology/product_sku)
