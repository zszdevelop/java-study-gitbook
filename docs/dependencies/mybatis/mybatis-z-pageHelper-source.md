# Mybatis-PageHelper源码分析

## 1. 背景

项目中分页是非常常见的需求，在项目中我们一般集成第三方的分页插件，避免在业务层嵌入过多业务代码。

分页插件，我们项目中是采用`Mybatis-PageHelper `，作为一款轻量级的插件，源码应该不难，我们就来分析分析他的源码

## 2. 分页插件实现原理与基础

### 2.1 拦截器

Mybatis 提供了拦截器接口`Interceptor(org.apache.ibatis.plugin.Interceptor)`, 我们仅需要在实现类中对拦截对象和方法进行处理即可

![image-20211023103716074](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023103716074.png)

#### 2.1.1 Object intercept(Invocation invocation)

**intercept 是mybatis 运行时要执行的方法**。通过该方法的参数`invocation` 可以得到很多有用的信息，该参数的方法常用如下

```java
public class ZszInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object target = invocation.getTarget();
        Method method = invocation.getMethod();
        Object[] args = invocation.getArgs();
        Object result = invocation.proceed();
        return result;
    }
}
```

- getTarget (): 

  获取当前拦截的对象

- getMethod()：

  获取当前被拦截的方法

- getArgs()：

  可以返回被拦截方法中的参数

- invocation.proceed()：

  proceed() 方法实际上执行了method.invoke(target,args)方法，上面的代码中没有做任何处理，直接返回了结果

#### 2.1.2 plugin(Object target)

这个方法的参数target 就是拦截器要拦截的对象，该方法会在创建被拦截的接口实现类时被调用。

听起来有点绕，其实现其实我们只需要调用mybatis 提供的 `Plugin.wrap(target, this)` 静态方法就可以通过java的动态代理拦截目标对象

```java
		@Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
```

#### 2.1.3 setProperties(Properties properties)

传递插件的参数，可以通过参数来改变插件的行为

- 如何配置参数：

  我们在配置拦截器的时候，就需要配置

  ```xml
      <plugins>
          <plugin interceptor="com.github.pagehelper.PageInterceptor">
              <!-- 支持通过Mapper接口参数来传递分页参数 -->
              <property name="helperDialect" value="mysql"/>
              <property name="supportMethodsArguments" value="true"/>
              <property name="rowBoundsWithCount" value="true"/>
          </plugin>
      </plugins>
  ```

### 2.2 拦截器签名

`@Intercepts` 和 注解签名 `@Signature` 用来配置拦截器要拦截的接口的方法

 `@Intercepts`  注解中的属性是一个 `@Signature`签名数组，可以在同一个拦截器中同时拦截不同的接口和方法

![image-20211023111853954](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023111853954.png)

 `@Signature`  注解包含以下三个属性

- type: 配置拦截器的接口，可选值是

  - Executor()
  - ParameterHandler()
  - ResultSetHandler()
  - StatementHandler()

- Method: 设置拦截器中的方法名，可选值是上面4个接口中对应的方法，需要和接口匹配

  例如Executor 中能选query，update等

  ![image-20211023112540386](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023112540386.png)

- args：设置拦截方法的参数类型数组，通过方法名和参数类型可以确定唯一一个方法

## 3. PageHelper源码实现

### 3.1 拦截器与拦截器签名

这样我们就能拦截到sql 查询语句

![image-20211023164728249](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023164728249.png)

### 3.2 获取拦截参数

![image-20211023164930142](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023164930142.png)

### 3.3 分页判断

1. 判断是否需要分页
2. 判断是否需要进行count 查询
   1. 查询总数
3. 分页查询

![image-20211023165357858](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023165357858.png)

### 3.4 计算总数

![image-20211023165640099](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023165640099.png)

计算总数实现

![image-20211023165903830](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023165903830.png)

获取方言count sql

此时还贴心的去除了order by

![image-20211023170153258](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023170153258.png)

获取普通的Count-sql

![image-20211023170559536](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023170559536.png)

### 3.5 分页查询

![image-20211023170703110](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023170703110.png)

- boundSql 包含了执行的sql 和对应的参数

调用方言获取分页 sql

![image-20211023171056962](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023171056962.png)

1. `String sql = boundSql.getSql()` 方言sql
2. 其中`Page page = this.getLocalPage();` 就是获得分页的参数
3. 判断是否需要排序，添加orderby 语句

获取分页的 getPageSql

![image-20211023171543077](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023171543077.png)

转换为分页语句

![image-20211023171621305](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023171621305.png)

![image-20211023171656921](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023171656921.png)

### 3.6 添加order by 语句

在做分页查询的时候校验了是否需要order by 语句

![image-20211023171330695](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023171330695.png)

添加order 语句

![image-20211023171410950](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023171410950.png)

## 4. Dialect 方言接口

Dialect 方言 包含了数据库支持的类型

我们可以看到几个关键节点上都调用了Dialect

![image-20211023173219075](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023173219075.png)

### 4.1 dialect 接口

![image-20211023173328549](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023173328549.png)

### 4.2 dialect 实例

#### 4.2.1 oracle 版本

![image-20211023173426394](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023173426394.png)

#### 4.2.2 mysql版本

![image-20211023173527432](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211023173527432.png)
