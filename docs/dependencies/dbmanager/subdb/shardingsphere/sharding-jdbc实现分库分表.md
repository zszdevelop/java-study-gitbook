# sharding-jdbc实现分库分表实战

## 1. 简介

`sharding-jdbc`是由当当捐入给`apache`的一款分布式数据库中间件，支持垂直分库、垂直分表、水平分库、水平分表、读写分离、分布式事务和高可用等相关功能。

## 2. 实现1（环境搭建）

### 2.1 添加依赖

```xml
<!-- sharding-jdbc分库分表 -->
<dependency>
	<groupId>org.apache.shardingsphere</groupId>
	<artifactId>sharding-jdbc-core</artifactId>
	<version>4.1.1</version>
</dependency>
```

### 2.2 创建两个测试数据库

```sql
create database `ry-order1`;
create database `ry-order2`;
```

### 2.3 创建两个测试订单表

在 ry-order1 和 ry-order2 各建两张测试表

```sql
-- ----------------------------
-- 订单信息表sys_order_0
-- ----------------------------
drop table if exists sys_order_0;
create table sys_order_0
(
  order_id      bigint(20)      not null                   comment '订单ID',
  user_id       bigint(64)      not null                   comment '用户编号',
  status        char(1)         not null                   comment '状态（0交易成功 1交易失败）',
  order_no      varchar(64)     default null               comment '订单流水',
  primary key (order_id)
) engine=innodb comment = '订单信息表';

-- ----------------------------
-- 订单信息表sys_order_1
-- ----------------------------
drop table if exists sys_order_1;
create table sys_order_1
(
  order_id      bigint(20)      not null                   comment '订单ID',
  user_id       bigint(64)      not null                   comment '用户编号',
  status        char(1)         not null                   comment '状态（0交易成功 1交易失败）',
  order_no      varchar(64)     default null               comment '订单流水',
  primary key (order_id)
) engine=innodb comment = '订单信息表';

```

### 2.4 修改配置文件

```yml
# 数据源配置
spring:
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        driverClassName: com.mysql.cj.jdbc.Driver
        druid:
            # 主库数据源
            master:
                url: jdbc:mysql://localhost:3306/ry?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: password
            # 订单库1
            order1:
                enabled: true
                url: jdbc:mysql://localhost:3306/ry-order1?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: password
            # 订单库2
            order2:
                enabled: true
                url: jdbc:mysql://localhost:3306/ry-order2?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
                username: root
                password: password
            ...................
```

## 3. 实现2（集成）

### 3.1 sharding 配置信息

```java
package com.ruoyi.framework.config;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import javax.sql.DataSource;
import org.apache.shardingsphere.api.config.sharding.KeyGeneratorConfiguration;
import org.apache.shardingsphere.api.config.sharding.ShardingRuleConfiguration;
import org.apache.shardingsphere.api.config.sharding.TableRuleConfiguration;
import org.apache.shardingsphere.api.config.sharding.strategy.InlineShardingStrategyConfiguration;
import org.apache.shardingsphere.shardingjdbc.api.ShardingDataSourceFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.ruoyi.framework.config.properties.DruidProperties;

/**
 * sharding 配置信息
 * 
 * @author ruoyi
 */
@Configuration
public class ShardingDataSourceConfig
{
    @Bean
    @ConfigurationProperties("spring.datasource.druid.order1")
    @ConditionalOnProperty(prefix = "spring.datasource.druid.order1", name = "enabled", havingValue = "true")
    public DataSource order1DataSource(DruidProperties druidProperties)
    {
        DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
        return druidProperties.dataSource(dataSource);
    }

    @Bean
    @ConfigurationProperties("spring.datasource.druid.order2")
    @ConditionalOnProperty(prefix = "spring.datasource.druid.order2", name = "enabled", havingValue = "true")
    public DataSource order2DataSource(DruidProperties druidProperties)
    {
        DruidDataSource dataSource = DruidDataSourceBuilder.create().build();
        return druidProperties.dataSource(dataSource);
    }
    
    @Bean(name = "shardingDataSource")
    public DataSource shardingDataSource(@Qualifier("order1DataSource") DataSource order1DataSource, @Qualifier("order2DataSource") DataSource order2DataSource) throws SQLException
    {
        Map<String, DataSource> dataSourceMap = new HashMap<>();
        dataSourceMap.put("order1", order1DataSource);
        dataSourceMap.put("order2", order2DataSource);

        // sys_order 表规则配置
        TableRuleConfiguration orderTableRuleConfig = new TableRuleConfiguration("sys_order", "order$->{1..2}.sys_order_$->{0..1}");
        // 配置分库策略 
        orderTableRuleConfig.setDatabaseShardingStrategyConfig(new InlineShardingStrategyConfiguration("user_id", "order$->{user_id % 2 + 1}"));
        // 配置分表策略
        orderTableRuleConfig.setTableShardingStrategyConfig(new InlineShardingStrategyConfiguration("order_id", "sys_order_$->{order_id % 2}"));
        // 分布式主键
        orderTableRuleConfig.setKeyGeneratorConfig(new KeyGeneratorConfiguration("SNOWFLAKE", "order_id"));

        // 配置分片规则
        ShardingRuleConfiguration shardingRuleConfig = new ShardingRuleConfiguration();
        shardingRuleConfig.getTableRuleConfigs().add(orderTableRuleConfig);
        // 获取数据源对象
        DataSource dataSource = ShardingDataSourceFactory.createDataSource(dataSourceMap, shardingRuleConfig, getProperties());
        return dataSource;
    }

    /**
     * 系统参数配置
     */
    private Properties getProperties()
    {
        Properties shardingProperties = new Properties();
        shardingProperties.put("sql.show", true);
        return shardingProperties;
    }
}
```

注意这里配置的分库分表规则

```java
// sys_order 表规则配置
        TableRuleConfiguration orderTableRuleConfig = new TableRuleConfiguration("sys_order", "order$->{1..2}.sys_order_$->{0..1}");
        // 配置分库策略 
        orderTableRuleConfig.setDatabaseShardingStrategyConfig(new InlineShardingStrategyConfiguration("user_id", "order$->{user_id % 2 + 1}"));
        // 配置分表策略
        orderTableRuleConfig.setTableShardingStrategyConfig(new InlineShardingStrategyConfiguration("order_id", "sys_order_$->{order_id % 2}"));
```

## 4. 6、测试验证

访问`http://localhost/order/add/1`入库到`ry-order2`

访问`http://localhost/order/add/2`入库到`ry-order1`

同时根据订单号`order_id % 2`入库到`sys_order_0`或者`sys_order_1`

## 参考文章

[集成sharding-jdbc实现分库分表](http://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90sharding-jdbc%E5%AE%9E%E7%8E%B0%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8)