# Mybatis适配多种数据库

## 1. 简介

**动态切换数据库**，如在**MySQL、PostgreSQL与Oracle之间进行切换，并使用同一个Dao接口。如何进行同一个函数调用mapper中不同的sql语句**？

## 2. 区分具体数据库

### 2.1 理论

若在MyBatis配置文件中设置了databaseIdProvider，则可以使用 _databaseId 参数

这样就可以根据不同的数据库厂商构建特定的语句。_databaseId 就是代表当前数据库的别名Oracle。

databaseIdProvider配置：

```xml
<databaseIdProvider type="DB_VENDOR">
    <property name="MySQL" value="mysql"/>
    ……
</databaseIdProvider>
```

### 2.2 在springboot 中如何配置

```java
@Configuration
public class MyBatisConfig
{
  ....
    
    @Bean
    public DatabaseIdProvider getDatabaseIdProvider() {
        DatabaseIdProvider databaseIdProvider = new VendorDatabaseIdProvider();
        Properties properties = new Properties();
        properties.setProperty("MySQL", "mysql");
        properties.setProperty("Oracle", "oracle");
        databaseIdProvider.setProperties(properties);
        return databaseIdProvider;
    }
  
  
        @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception
    {
        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
      	// 重点是这句需要配置上 
        sessionFactory.setDatabaseIdProvider(getDatabaseIdProvider());
        ....
        return sessionFactory.getObject();
    }
}
```

## 3. 前置配置

### 3.1 Mysql 前置配置

#### 3.1.1 序列支持

```sql
-- ----------------------------
-- Table structure for sys_sequence
-- ----------------------------
CREATE TABLE `sys_sequence` (
                                `sequence_name` varchar(50) NOT NULL COMMENT '序列名称',
                                `sequence_value` int(11) NOT NULL DEFAULT '1' COMMENT '序列值',
                                `increment_value` int(11) NOT NULL DEFAULT '1' COMMENT '增量值',
                                PRIMARY KEY (`sequence_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='序列';

-- ----------------------------
-- Records of sys_sequence
-- ----------------------------
INSERT INTO `sys_sequence` VALUES ('seq_sys_dept', 200, 1);
INSERT INTO `sys_sequence` VALUES ('seq_sys_user', 3, 1);
```

#### 3.1.2 nextval函数：兼容oracle 序列 

```sql
-- ----------------------------
-- Function structure for nextval
-- ----------------------------
CREATE FUNCTION `nextval`(seq_name varchar (50))
    RETURNS int
    (11)
begin declare
sequence int; set
sequence = (select sequence_value from sys_sequence where sequence_name = seq_name);
update sys_sequence
set sequence_value = sequence_value + increment_value
where sequence_name = seq_name;
return sequence;
end
```

### 3.2 Oracle 前置配置

#### 3.2.1 find_in_set函数，兼容mysql

```sql
-- ----------------------------
-- 函数 ，代替mysql的find_in_set
-- 例如： select * from sys_dept where FIND_IN_SET (101,ancestors) <> 0
-- mysql可接受0或其它number做为where 条件，oracle只接受表达式做为where 条件
-- ----------------------------
create or replace function find_in_set(arg1 in varchar2,arg2 in varchar)
return number is Result number;
begin
select instr(','||arg2||',' , ','||arg1||',') into Result from dual;
return(Result);
end find_in_set;
```

### 3.3 项目前置配置

#### 3.3.1 数据库工具类

根据不同数据库获取不同的函数

例如

- mysql 的日期：now()
- oracle的当前时间：sysdate

##### 3.3.1.1 DBUtils

```java
/**
 * 数据库操作工具类
 * 此工具类目的是为了兼容多个数据库
 */
@Component
public class DBUtils {

    @Resource
    private VendorDatabaseIdProvider databaseIdProvider;
    @Resource
    private DataSource dataSource;

    public static DBType DB_TYPE;

    public DBUtils() {
    }

    @PostConstruct
    public void init() {
        // 初始化
        String databaseId = databaseIdProvider.getDatabaseId(dataSource);
        DB_TYPE = DBType.valueOf(StringUtils.upperCase(databaseId));
    }

    /**
     * 获得当前时间
     *
     * @return
     */
    public static String getCurrentTime(){
        String result = "";
        if (DB_TYPE.equals(DBType.MYSQL)||DB_TYPE.equals(DBType.POSTGRESQL)) {
            result = "now()";
        } else if (DB_TYPE.equals(DBType.ORACLE)) {
            result = "sysdate";
        }
        return result;
    }


}
```

##### 3.3.1.2 DBType

```java
/**
 * 支持数据库类型
 *
 */
public enum DBType {
    MYSQL,
    ORACLE,
    POSTGRESQL
}

```

##### 3.3.1.3 引用

```xml
 update sys_config
        <set>
            <if test="configName != null and configName != ''">config_name = #{configName},</if>
            update_time = ${@com.faduit.common.utils.DBUtils@getCurrentTime()}
        </set>
        where config_id = #{configId}
```



## 4. 适配

### 4.1 自增id问题

- mysql 的字段本身就可以设置自增
- Oracle 中使用序列做自增id

```xml
<selectKey keyProperty="userId" order="BEFORE" resultType="Long">
			<if test="_databaseId == 'oracle'">
				select seq_sys_user.nextval as userId from DUAL
			</if>
			<if test="_databaseId == 'postgresql'">
				select nextval('seq_sys_user'::regclass) as userId
			</if>
			<if test="_databaseId == 'mysql'">
				select nextval('seq_sys_user') as userId
			</if>
		</selectKey>
```

### 4.2 分页问题

- Mysql :使用**limit**
- oracle ：使用 **rownum**

例如这里需要查询是否已经存在用户名

```xml
<select id="checkUserNameUnique" parameterType="String" resultType="int">
		<if test="_databaseId == 'oracle'">
			select count(1) from sys_user where user_name = #{userName} and rownum <![CDATA[ <= ]]> 1
		</if>
		<if test="_databaseId == 'postgresql'">
			select count(1) from sys_user where user_name = #{userName} limit 1
		</if>
		<if test="_databaseId == 'mysql'">
			select count(1) from sys_user where user_name = #{userName} limit 1
		</if>
	</select>
```

### 4.3 null值转换为一个实际的值

- mysql: 使用ifnull 函数
- oracle： 使用nvl 函数
- postgresql：使用COALESCE 函数

```xml
<if test="_databaseId == 'oracle'">
			select distinct m.menu_id,  nvl(m.perms,'') as perms
		</if>
		<if test="_databaseId == 'postgresql'">
			select distinct m.menu_id, COALESCE(m.perms,'') as perms
		</if>
		<if test="_databaseId == 'mysql'">
			select distinct m.menu_id, ifnull(m.perms,'') as perms
		</if>
```

### 4.4 批量更新语法

- mysql: 一个 insert into 插入values的值可以为多个，逗号分隔
- oracle：insert all 插入多个 into table，最后 SELECT 1 FROM DUAL

```xml
<insert id="batchUserRole" useGeneratedKeys="false">
		<if test="_databaseId == 'oracle'">
			insert all
			<foreach item="item" index="index" collection="list">
				into sys_user_role(user_id, role_id) values (#{item.userId},#{item.roleId})
			</foreach>
			SELECT 1 FROM DUAL
		</if>
		<if test="_databaseId == 'mysql'">
			insert into sys_user_role(user_id, role_id) values
			<foreach item="item" index="index" collection="list" separator=",">
				(#{item.userId},#{item.roleId})
			</foreach>
		</if>
	</insert>
```

### 4.5 获取当前时间

引入外部函数

- mysql 的日期：now()
- oracle的当前时间：sysdate

```xml
 update sys_config
        <set>
            <if test="configName != null and configName != ''">config_name = #{configName},</if>
            update_time = ${@com.faduit.common.utils.DBUtils@getCurrentTime()}
        </set>
        where config_id = #{configId}
```

