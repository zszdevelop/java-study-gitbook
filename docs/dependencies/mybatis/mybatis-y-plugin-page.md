---
order: 100
category:
  - MyBatis
---
# MyBatis详解 - 插件之分页机制

>Mybatis的分页功能很弱，它是基于内存的分页（查出所有记录再按偏移量和limit取结果），在大数据量的情况下这样的分页基本上是没有用的。本文基于插件，通过拦截StatementHandler重写sql语句，实现数据库的物理分页。

## 1. 准备

### 1.1 为什么在StatementHandler拦截

在前面章节介绍了一次sqlsession的完整执行过程，从中可以知道sql的解析是在StatementHandler里完成的，所以为了重写sql需要拦截StatementHandler。

### 1.2 MetaObject简介

在实现里大量使用了MetaObject这个对象，因此有必要先介绍下它。MetaObject是Mybatis提供的一个的工具类，通过它包装一个对象后可以获取或设置该对象的原本不可访问的属性（比如那些私有属性）。它有个三个重要方法经常用到：

- MetaObject forObject(Object object,ObjectFactory objectFactory, ObjectWrapperFactory objectWrapperFactory) 用于包装对象；
- Object getValue(String name) 用于获取属性的值（支持OGNL的方法）；
- void setValue(String name, Object value) 用于设置属性的值（支持OGNL的方法）；

## 2. 拦截器签名

```java
@Intercepts({@Signature(type =StatementHandler.class, method = "prepare", args ={Connection.class})})  
public class PageInterceptor implements Interceptor {  
    ...  
} 
```

从签名里可以看出，要拦截的目标类型是StatementHandler（注意：type只能配置成接口类型），拦截的方法是名称为prepare参数为Connection类型的方法。

## 3. intercept实现

```java
public Object intercept(Invocation invocation) throws Throwable {  
     StatementHandler statementHandler = (StatementHandler) invocation.getTarget();  
     MetaObject metaStatementHandler = MetaObject.forObject(statementHandler,  
     DEFAULT_OBJECT_FACTORY, DEFAULT_OBJECT_WRAPPER_FACTORY);  
     // 分离代理对象链(由于目标类可能被多个拦截器拦截，从而形成多次代理，通过下面的两次循环  
     // 可以分离出最原始的的目标类)  
     while (metaStatementHandler.hasGetter("h")) {  
         Object object = metaStatementHandler.getValue("h");  
         metaStatementHandler = MetaObject.forObject(object, DEFAULT_OBJECT_FACTORY,   
         DEFAULT_OBJECT_WRAPPER_FACTORY);  
     }  
     // 分离最后一个代理对象的目标类  
     while (metaStatementHandler.hasGetter("target")) {  
         Object object = metaStatementHandler.getValue("target");  
         metaStatementHandler = MetaObject.forObject(object, DEFAULT_OBJECT_FACTORY,   
         DEFAULT_OBJECT_WRAPPER_FACTORY);  
     }  
     Configuration configuration = (Configuration) metaStatementHandler.  
     getValue("delegate.configuration");  
     dialect = configuration.getVariables().getProperty("dialect");  
     if (null == dialect || "".equals(dialect)) {  
         logger.warn("Property dialect is not setted,use default 'mysql' ");  
         dialect = defaultDialect;  
     }  
     pageSqlId = configuration.getVariables().getProperty("pageSqlId");  
     if (null == pageSqlId || "".equals(pageSqlId)) {  
         logger.warn("Property pageSqlId is not setted,use default '.*Page$' ");  
         pageSqlId = defaultPageSqlId;  
     }  
     MappedStatement mappedStatement = (MappedStatement)   
     metaStatementHandler.getValue("delegate.mappedStatement");  
     // 只重写需要分页的sql语句。通过MappedStatement的ID匹配，默认重写以Page结尾的  
     //  MappedStatement的sql  
     if (mappedStatement.getId().matches(pageSqlId)) {  
         BoundSql boundSql = (BoundSql) metaStatementHandler.getValue("delegate.boundSql");  
         Object parameterObject = boundSql.getParameterObject();  
         if (parameterObject == null) {  
             throw new NullPointerException("parameterObject is null!");  
         } else {  
             // 分页参数作为参数对象parameterObject的一个属性  
             PageParameter page = (PageParameter) metaStatementHandler  
                     .getValue("delegate.boundSql.parameterObject.page");  
             String sql = boundSql.getSql();  
             // 重写sql  
             String pageSql = buildPageSql(sql, page);  
             metaStatementHandler.setValue("delegate.boundSql.sql", pageSql);  
             // 采用物理分页后，就不需要mybatis的内存分页了，所以重置下面的两个参数  
             metaStatementHandler.setValue("delegate.rowBounds.offset",   
             RowBounds.NO_ROW_OFFSET);  
             metaStatementHandler.setValue("delegate.rowBounds.limit", RowBounds.NO_ROW_LIMIT);  
             Connection connection = (Connection) invocation.getArgs()[0];  
             // 重设分页参数里的总页数等  
             setPageParameter(sql, connection, mappedStatement, boundSql, page);  
         }  
     }  
     // 将执行权交给下一个拦截器  
     return invocation.proceed();  
}
```

StatementHandler的默认实现类是RoutingStatementHandler，因此拦截的实际对象是它。RoutingStatementHandler的主要功能是分发，它根据配置Statement类型创建真正执行数据库操作的StatementHandler，并将其保存到delegate属性里。由于delegate是一个私有属性并且没有提供访问它的方法，因此需要借助MetaObject的帮忙。通过MetaObject的封装后我们可以轻易的获得想要的属性。

在上面的方法里有个两个循环，通过他们可以分离出原始的RoutingStatementHandler（而不是代理对象）。

前面提到，签名里配置的要拦截的目标类型是StatementHandler拦截的方法是名称为prepare参数为Connection类型的方法，而这个方法是每次数据库访问都要执行的。因为我是通过重写sql的方式实现分页，为了不影响其他sql（update或不需要分页的query），我采用了通过ID匹配的方式过滤。默认的过滤方式只对id以Page结尾的进行拦截（注意区分大小写），如下：

```xml
<select id="queryUserByPage" parameterType="UserDto" resultType="UserDto">  
    <![CDATA[ 
    select * from t_user t where t.username = #{username} 
    ]]>  
</select>

  
```

当然，也可以自定义拦截模式，在mybatis的配置文件里加入以下配置项：

```xml
<properties>  
    <property name="dialect" value="mysql" />  
    <property name="pageSqlId" value=".*Page$" />  
</properties>
```

其中，属性dialect指示数据库类型，目前只支持mysql和oracle两种数据库。其中，属性pageSqlId指示拦截的规则，以正则方式匹配。

## 4. sql重写

sql重写其实在原始的sql语句上加入分页的参数，目前支持mysql和oracle两种数据库的分页。

```java
private String buildPageSql(String sql, PageParameter page) {  
    if (page != null) {  
        StringBuilder pageSql = new StringBuilder();  
        if ("mysql".equals(dialect)) {  
            pageSql = buildPageSqlForMysql(sql, page);  
        } else if ("oracle".equals(dialect)) {  
            pageSql = buildPageSqlForOracle(sql, page);  
        } else {  
            return sql;  
        }  
        return pageSql.toString();  
    } else {  
        return sql;  
    }  
}  
```

**mysql的分页实现**：

```java
public StringBuilder buildPageSqlForMysql(String sql, PageParameter page) {  
    StringBuilder pageSql = new StringBuilder(100);  
    String beginrow = String.valueOf((page.getCurrentPage() - 1) * page.getPageSize());  
    pageSql.append(sql);  
    pageSql.append(" limit " + beginrow + "," + page.getPageSize());  
    return pageSql;  
}  
```

**oracle的分页实现**：

```java
public StringBuilder buildPageSqlForOracle(String sql, PageParameter page) {  
    StringBuilder pageSql = new StringBuilder(100);  
    String beginrow = String.valueOf((page.getCurrentPage() - 1) * page.getPageSize());  
    String endrow = String.valueOf(page.getCurrentPage() * page.getPageSize());  
    pageSql.append("select * from ( select temp.*, rownum row_id from ( ");  
    pageSql.append(sql);  
    pageSql.append(" ) temp where rownum <= ").append(endrow);  
    pageSql.append(") where row_id > ").append(beginrow);  
    return pageSql;  
}  
```

## 5. 分页参数重写

有时候会有这种需求，就是不但要查出指定页的结果，还需要知道总的记录数和页数。我通过重写分页参数的方式提供了一种解决方案：

```java
/** 
 * 从数据库里查询总的记录数并计算总页数，回写进分页参数<code>PageParameter</code>,这样调用  
 * 者就可用通过 分页参数<code>PageParameter</code>获得相关信息。 
 *  
 * @param sql 
 * @param connection 
 * @param mappedStatement 
 * @param boundSql 
 * @param page 
 */  
private void setPageParameter(String sql, Connection connection, MappedStatement mappedStatement,  
        BoundSql boundSql, PageParameter page) {  
    // 记录总记录数  
    String countSql = "select count(0) from (" + sql + ") as total";  
    PreparedStatement countStmt = null;  
    ResultSet rs = null;  
    try {  
        countStmt = connection.prepareStatement(countSql);  
        BoundSql countBS = new BoundSql(mappedStatement.getConfiguration(), countSql,  
                boundSql.getParameterMappings(), boundSql.getParameterObject());  
        setParameters(countStmt, mappedStatement, countBS, boundSql.getParameterObject());  
        rs = countStmt.executeQuery();  
        int totalCount = 0;  
        if (rs.next()) {  
            totalCount = rs.getInt(1);  
        }  
        page.setTotalCount(totalCount);  
        int totalPage = totalCount / page.getPageSize() + ((totalCount % page.getPageSize() == 0) ? 0 : 1);  
        page.setTotalPage(totalPage);  
    } catch (SQLException e) {  
        logger.error("Ignore this exception", e);  
    } finally {  
        try {  
            rs.close();  
        } catch (SQLException e) {  
            logger.error("Ignore this exception", e);  
        }  
        try {  
            countStmt.close();  
        } catch (SQLException e) {  
            logger.error("Ignore this exception", e);  
        }  
    }  
}  
  
/** 
 * 对SQL参数(?)设值 
 *  
 * @param ps 
 * @param mappedStatement 
 * @param boundSql 
 * @param parameterObject 
 * @throws SQLException 
 */  
private void setParameters(PreparedStatement ps, MappedStatement mappedStatement, BoundSql boundSql,  
        Object parameterObject) throws SQLException {  
    ParameterHandler parameterHandler = new DefaultParameterHandler(mappedStatement, parameterObject, boundSql);  
    parameterHandler.setParameters(ps);  
} 
```

## 6. plugin实现

```java
public Object plugin(Object target) {  
    // 当目标类是StatementHandler类型时，才包装目标类，否者直接返回目标本身,减少目标被代理的  
    // 次数  
    if (target instanceof StatementHandler) {  
        return Plugin.wrap(target, this);  
    } else {  
        return target;  
    }  
}
  
```

## 参考文章

[**MyBatis详解 - 插件之分页机制**](https://pdai.tech/md/framework/orm-mybatis/mybatis-y-plugin-page.html)