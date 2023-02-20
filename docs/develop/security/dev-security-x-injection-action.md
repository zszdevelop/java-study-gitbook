---
order: 11
category:
  - 开发
  - 安全
---

# 开发安全 - 防止SQL注入攻击实战

## 1. 简介

所谓 SQL 注入，就是通过将 SQL 命令插入应用程序的 http 请求中，并在服务器端被接收后用于参与数据库操作，最终达到欺骗服务器执行恶意的 SQL 命令的效果。

### 1.1 示例

最经典的sql 注入

```sql
 // 重点看这条SQL，密码输入: ' OR '1'='1时，等同于不需要密码
        String sql = "SELECT * FROM t_user WHERE username='"+userName+"' AND pwd='"+password+"'";       
        ResultSet rs = state.executeQuery(sql);
```

## 2. 解决思路

1. 使用预编译处理输入参数
2. 输入验证，确保输入的正确性

## 3. 使用预编译处理输入参数

我们现在基本都使用ORM 框架已经帮我们做了预编译处理。

但还有小部分sql，如order by 需要我们自己对输入验证

## 4. 输入验证

### 4.1 请求参数处理

```java
 if (StringUtils.isNotEmpty(pageDomain.getOrderBy()))
        {
            String orderBy = SqlUtil.escapeOrderBySql(pageDomain.getOrderBy());
            PageHelper.orderBy(orderBy);
        }
```

### 4.2 对输入验证

```java

/**
 * sql操作工具类
 * 
 * @author ruoyi
 */
public class SqlUtil
{
    /**
     * 定义常用的 sql关键字
     */
    public static String SQL_REGEX = "select |insert |delete |update |drop |count |exec |chr |mid |master |truncate |char |and |declare ";

    /**
     * 仅支持字母、数字、下划线、空格、逗号、小数点（支持多个字段排序）
     */
    public static String SQL_PATTERN = "[a-zA-Z0-9_\\ \\,\\.]+";

    /**
     * 检查字符，防止注入绕过
     */
    public static String escapeOrderBySql(String value)
    {
        if (StringUtils.isNotEmpty(value) && !isValidOrderBySql(value))
        {
            throw new UtilException("参数不符合规范，不能进行查询");
        }
        return value;
    }

    /**
     * 验证 order by 语法是否符合规范
     */
    public static boolean isValidOrderBySql(String value)
    {
        return value.matches(SQL_PATTERN);
    }

    /**
     * SQL关键字检查
     */
    public static void filterKeyword(String value)
    {
        if (StringUtils.isEmpty(value))
        {
            return;
        }
        String[] sqlKeywords = StringUtils.split(SQL_REGEX, "\\|");
        for (String sqlKeyword : sqlKeywords)
        {
            if (StringUtils.indexOfIgnoreCase(value, sqlKeyword) > -1)
            {
                throw new UtilException("参数存在SQL注入风险");
            }
        }
    }
}

```

