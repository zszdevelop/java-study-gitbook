# SkywalkingAgent配置-SQL参数采集

## 1. 背景

SkyWalking默认不采集SQL参数，但是提供了采集SQL参数采集的方式，在应用端启动时，加入启动参数，或者在agent/config/agent.config配置文件里面配置相关参数即可。

![image-20211128193612308](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211128193612308.png)

我们可以看到虽然 SkyWalking 能看到sql，但是没有参数。对于我们排查问题是非常不方便的

## 2. 配置参数

### 2.1 修改配置

配置文件agent/config/agent.config

```yml
plugin.jdbc.trace_sql_parameters=${SW_JDBC_TRACE_SQL_PARAMETERS:true}
```

![image-20211128194107697](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211128194107697.png)

### 2.2 验证

可以看到多了`db.sql.parameters:`

![image-20211128194549285](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211128194549285.png)

## 3. 参考

[SkyWalking-8.6.0 SQL参数采集](https://juejin.cn/post/7003129333942321183)