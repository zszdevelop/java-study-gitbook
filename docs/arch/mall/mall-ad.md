# mall中广告(轮播图)设计

## 1. 简介

用于管理首页显示的轮播广告信息。

## 2. 数据库设计

```
create table sms_home_advertise
(
   id                   bigint not null auto_increment,
   name                 varchar(100) comment '名称',
   type                 int(1) comment '轮播位置：0->PC首页轮播；1->app首页轮播',
   pic                  varchar(500) comment '图片地址',
   start_time           datetime comment '开始时间',
   end_time             datetime comment '结束时间',
   status               int(1) comment '上下线状态：0->下线；1->上线',
   click_count          int comment '点击数',
   order_count          int comment '下单数',
   url                  varchar(500) comment '链接地址',
   note                 varchar(500) comment '备注',
   sort                 int default 0 comment '排序',
   primary key (id)
);
```

## 3. 代码设计

### 3.1 分页查询广告

```java
@Override
public List<SmsHomeAdvertise> list(String name, Integer type, String endTime, Integer pageSize, Integer pageNum) {
    PageHelper.startPage(pageNum, pageSize);
    SmsHomeAdvertiseExample example = new SmsHomeAdvertiseExample();
    SmsHomeAdvertiseExample.Criteria criteria = example.createCriteria();
    if (!StringUtils.isEmpty(name)) {
        criteria.andNameLike("%" + name + "%");
    }
    if (type != null) {
        criteria.andTypeEqualTo(type);
    }
    if (!StringUtils.isEmpty(endTime)) {
        String startStr = endTime + " 00:00:00";
        String endStr = endTime + " 23:59:59";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date start = null;
        try {
            start = sdf.parse(startStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Date end = null;
        try {
            end = sdf.parse(endStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (start != null && end != null) {
            criteria.andEndTimeBetween(start, end);
        }
    }
    example.setOrderByClause("sort desc");
    return advertiseMapper.selectByExample(example);
}
```

### 3.2 新增广告

初始化点击次数和订单次数是在代码层做的

```java
 @Override
    public int create(SmsHomeAdvertise advertise) {
        advertise.setClickCount(0);
        advertise.setOrderCount(0);
        return advertiseMapper.insert(advertise);
    }
```



## 4. 界面设计

### 4.1 管理端

#### 4.1.1 广告列表

![image-20220320185355632](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320185355632.png)

#### 4.1.2 编辑广告

![image-20220320185414101](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320185414101.png)

### 4.2 移动端

#### 4.2.1 首页轮播广告

![image-20220320185525867](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20220320185525867.png)

## 5. 使用感受

### 5.1 扩展性不强

现在只有，PC首页轮播，app首页轮播。如果我们其他地方需要轮播，我们需要改代码。

如果配上字典表的话，情况会好一点
