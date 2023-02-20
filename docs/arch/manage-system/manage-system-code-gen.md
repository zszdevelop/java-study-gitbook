# 代码生成功能&实现思路

## 1. 简介

大部分项目里其实有很多代码都是重复的，几乎每个基础模块的代码**都有增删改查的功能**，而这些功能都是大同小异，如果这些功能都要自己去写，将会大大浪费我们的精力和降低。所以这种重复性的代码可以使用代码生成。

## 2. 代码生成设计思路

### 2.1 项目组成部分

我们java 项目的构成主要如下

- 后端代码

  - controller
  - service
    - serviceImpl
  - mapper
  - Mapper.xml(mybatis)
  - domain

- 前端

  - 对应的vue增删改查
  - vue 接口的api

- sql代码

  如果项目中设计到后台配置菜单，那么也需要将菜单sql生成出来

### 2.2 生成的目标

- 希望生成项目模块中所有代码。
  - 如果只引入 `mybatis generator` 这类工具，只能解决mapper 层的问题。而且sql 非常不清晰，完全无法复用
- 生成的代码可以自定义配置，而不是一成不变的
- 生成的代码扩展性要强，新增模板方便
  - 增加批量删除功能
  - 增加批量新增和修改mapper

### 2.3 实现思路

- 使用模板引擎根据我们的项目结构生成前后端模板代码

## 3. 数据库设计

### 3.1 代码生成业务表

```sql

-- ----------------------------
-- 18、代码生成业务表
-- ----------------------------
drop table if exists gen_table;
create table gen_table (
  table_id          bigint(20)      not null auto_increment    comment '编号',
  table_name        varchar(200)    default ''                 comment '表名称',
  table_comment     varchar(500)    default ''                 comment '表描述',
  sub_table_name    varchar(64)     default null               comment '关联子表的表名',
  sub_table_fk_name varchar(64)     default null               comment '子表关联的外键名',
  class_name        varchar(100)    default ''                 comment '实体类名称',
  tpl_category      varchar(200)    default 'crud'             comment '使用的模板（crud单表操作 tree树表操作）',
  package_name      varchar(100)                               comment '生成包路径',
  module_name       varchar(30)                                comment '生成模块名',
  business_name     varchar(30)                                comment '生成业务名',
  function_name     varchar(50)                                comment '生成功能名',
  function_author   varchar(50)                                comment '生成功能作者',
  gen_type          char(1)         default '0'                comment '生成代码方式（0zip压缩包 1自定义路径）',
  gen_path          varchar(200)    default '/'                comment '生成路径（不填默认项目路径）',
  options           varchar(1000)                              comment '其它生成选项',
  create_by         varchar(64)     default ''                 comment '创建者',
  create_time 	    datetime                                   comment '创建时间',
  update_by         varchar(64)     default ''                 comment '更新者',
  update_time       datetime                                   comment '更新时间',
  remark            varchar(500)    default null               comment '备注',
  primary key (table_id)
) engine=innodb auto_increment=1 comment = '代码生成业务表';


```

### 3.2 代码生成业务表字段

```sql

-- ----------------------------
-- 19、代码生成业务表字段
-- ----------------------------
drop table if exists gen_table_column;
create table gen_table_column (
  column_id         bigint(20)      not null auto_increment    comment '编号',
  table_id          varchar(64)                                comment '归属表编号',
  column_name       varchar(200)                               comment '列名称',
  column_comment    varchar(500)                               comment '列描述',
  column_type       varchar(100)                               comment '列类型',
  java_type         varchar(500)                               comment 'JAVA类型',
  java_field        varchar(200)                               comment 'JAVA字段名',
  is_pk             char(1)                                    comment '是否主键（1是）',
  is_increment      char(1)                                    comment '是否自增（1是）',
  is_required       char(1)                                    comment '是否必填（1是）',
  is_insert         char(1)                                    comment '是否为插入字段（1是）',
  is_edit           char(1)                                    comment '是否编辑字段（1是）',
  is_list           char(1)                                    comment '是否列表字段（1是）',
  is_query          char(1)                                    comment '是否查询字段（1是）',
  query_type        varchar(200)    default 'EQ'               comment '查询方式（等于、不等于、大于、小于、范围）',
  html_type         varchar(200)                               comment '显示类型（文本框、文本域、下拉框、复选框、单选框、日期控件）',
  dict_type         varchar(200)    default ''                 comment '字典类型',
  sort              int                                        comment '排序',
  create_by         varchar(64)     default ''                 comment '创建者',
  create_time 	    datetime                                   comment '创建时间',
  update_by         varchar(64)     default ''                 comment '更新者',
  update_time       datetime                                   comment '更新时间',
  primary key (column_id)
) engine=innodb auto_increment=1 comment = '代码生成业务表字段';
```

## 4. 代码实现注意事项

### 4.1导入表结构信息

根据选中的表名，生成表结构

1. 查询表结构（information_schema）信息（包括表英文名和中文注释）

2. 查询表字段信息
3. 将数据库表字段类型 转为 java字段类型
4. 插入表结构信息
5. 插入表字段信息

#### 4.1.1 controller 层

```java
/**
 * 导入表结构（保存）
 */
@PreAuthorize("@ss.hasPermi('tool:gen:import')")
@Log(title = "代码生成", businessType = BusinessType.IMPORT)
@PostMapping("/importTable")
public AjaxResult importTableSave(String tables)
{
    String[] tableNames = Convert.toStrArray(tables);
    // 查询表信息
    List<GenTable> tableList = genTableService.selectDbTableListByNames(tableNames);
    genTableService.importGenTable(tableList);
    return AjaxResult.success();
}
```

#### 4.1.2 service

```java
/**
 * 查询据库列表
 * 
 * @param tableNames 表名称组
 * @return 数据库表集合
 */
@Override
public List<GenTable> selectDbTableListByNames(String[] tableNames)
{
    return genTableMapper.selectDbTableListByNames(tableNames);
}


    /**
     * 导入表结构
     * 
     * @param tableList 导入表列表
     */
    @Override
    @Transactional
    public void importGenTable(List<GenTable> tableList)
    {
        String operName = SecurityUtils.getUsername();
        try
        {
            for (GenTable table : tableList)
            {
                String tableName = table.getTableName();
                GenUtils.initTable(table, operName);
                int row = genTableMapper.insertGenTable(table);
                if (row > 0)
                {
                    // 保存列信息
                    List<GenTableColumn> genTableColumns = genTableColumnMapper.selectDbTableColumnsByName(tableName);
                    for (GenTableColumn column : genTableColumns)
                    {
                        GenUtils.initColumnField(column, table);
                        genTableColumnMapper.insertGenTableColumn(column);
                    }
                }
            }
        }
        catch (Exception e)
        {
            throw new CustomException("导入失败：" + e.getMessage());
        }
    }
```

#### 4.1.3 mapper

##### 4.1.3.1 查询表结构信息

```sql
<select id="selectDbTableListByNames" resultMap="GenTableResult">
		select table_name, table_comment, create_time, update_time from information_schema.tables
		where table_name NOT LIKE 'qrtz_%' and table_name NOT LIKE 'gen_%' and table_schema = (select database())
		and table_name in
	    <foreach collection="array" item="name" open="(" separator="," close=")">
 			#{name}
        </foreach> 
	</select>
```

![image-20211010125640172](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010125640172.png)

##### 4.1.3.2 查询列信息

```sql
   <select id="selectDbTableColumnsByName" parameterType="String" resultMap="GenTableColumnResult">
		select column_name, (case when (is_nullable = 'no' <![CDATA[ && ]]> column_key != 'PRI') then '1' else null end) as is_required, (case when column_key = 'PRI' then '1' else '0' end) as is_pk, ordinal_position as sort, column_comment, (case when extra = 'auto_increment' then '1' else '0' end) as is_increment, column_type
		from information_schema.columns where table_schema = (select database()) and table_name = (#{tableName})
		order by ordinal_position
	</select>
```

![image-20211010130749447](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010130749447.png)

##### 4.1.3.3 插入表结构信息

表信息中不单单只有表信息，还包括了表对应的生成信息。如生成的模板类型，包路径，生成代码方式等

```sql
<insert id="insertGenTable" parameterType="GenTable" useGeneratedKeys="true" keyProperty="tableId">
       insert into gen_table (
      <if test="tableName != null">table_name,</if>
      <if test="tableComment != null and tableComment != ''">table_comment,</if>
      <if test="className != null and className != ''">class_name,</if>
      <if test="tplCategory != null and tplCategory != ''">tpl_category,</if>
      <if test="packageName != null and packageName != ''">package_name,</if>
      <if test="moduleName != null and moduleName != ''">module_name,</if>
      <if test="businessName != null and businessName != ''">business_name,</if>
      <if test="functionName != null and functionName != ''">function_name,</if>
      <if test="functionAuthor != null and functionAuthor != ''">function_author,</if>
      <if test="genType != null and genType != ''">gen_type,</if>
      <if test="genPath != null and genPath != ''">gen_path,</if>
      <if test="remark != null and remark != ''">remark,</if>
         <if test="createBy != null and createBy != ''">create_by,</if>
      create_time
        )values(
      <if test="tableName != null">#{tableName},</if>
      <if test="tableComment != null and tableComment != ''">#{tableComment},</if>
      <if test="className != null and className != ''">#{className},</if>
      <if test="tplCategory != null and tplCategory != ''">#{tplCategory},</if>
      <if test="packageName != null and packageName != ''">#{packageName},</if>
      <if test="moduleName != null and moduleName != ''">#{moduleName},</if>
      <if test="businessName != null and businessName != ''">#{businessName},</if>
      <if test="functionName != null and functionName != ''">#{functionName},</if>
      <if test="functionAuthor != null and functionAuthor != ''">#{functionAuthor},</if>
      <if test="genType != null and genType != ''">#{genType},</if>
      <if test="genPath != null and genPath != ''">#{genPath},</if>
      <if test="remark != null and remark != ''">#{remark},</if>
         <if test="createBy != null and createBy != ''">#{createBy},</if>
      sysdate()
        )
   </insert>
```

![image-20211010172355888](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010172355888.png)

##### 4.1.3.4 插入表字段信息

表字段信息中不单单有表字段信息，还包括生成字段在前端展示兴泰，如是否需要展示，查询方式，是否使用字典等

```sql
 <insert id="insertGenTableColumn" parameterType="GenTableColumn" useGeneratedKeys="true" keyProperty="columnId">
        insert into gen_table_column (
			<if test="tableId != null and tableId != ''">table_id,</if>
			<if test="columnName != null and columnName != ''">column_name,</if>
			<if test="columnComment != null and columnComment != ''">column_comment,</if>
			<if test="columnType != null and columnType != ''">column_type,</if>
			<if test="javaType != null and javaType != ''">java_type,</if>
			<if test="javaField != null  and javaField != ''">java_field,</if>
			<if test="isPk != null and isPk != ''">is_pk,</if>
			<if test="isIncrement != null and isIncrement != ''">is_increment,</if>
			<if test="isRequired != null and isRequired != ''">is_required,</if>
			<if test="isInsert != null and isInsert != ''">is_insert,</if>
			<if test="isEdit != null and isEdit != ''">is_edit,</if>
			<if test="isList != null and isList != ''">is_list,</if>
			<if test="isQuery != null and isQuery != ''">is_query,</if>
			<if test="queryType != null and queryType != ''">query_type,</if>
			<if test="htmlType != null and htmlType != ''">html_type,</if>
			<if test="dictType != null and dictType != ''">dict_type,</if>
			<if test="sort != null">sort,</if>
			<if test="createBy != null and createBy != ''">create_by,</if>
			create_time
         )values(
			<if test="tableId != null and tableId != ''">#{tableId},</if>
			<if test="columnName != null and columnName != ''">#{columnName},</if>
			<if test="columnComment != null and columnComment != ''">#{columnComment},</if>
			<if test="columnType != null and columnType != ''">#{columnType},</if>
			<if test="javaType != null and javaType != ''">#{javaType},</if>
			<if test="javaField != null and javaField != ''">#{javaField},</if>
			<if test="isPk != null and isPk != ''">#{isPk},</if>
			<if test="isIncrement != null and isIncrement != ''">#{isIncrement},</if>
			<if test="isRequired != null and isRequired != ''">#{isRequired},</if>
			<if test="isInsert != null and isInsert != ''">#{isInsert},</if>
			<if test="isEdit != null and isEdit != ''">#{isEdit},</if>
			<if test="isList != null and isList != ''">#{isList},</if>
			<if test="isQuery != null and isQuery != ''">#{isQuery},</if>
			<if test="queryType != null and queryType != ''">#{queryType},</if>
			<if test="htmlType != null and htmlType != ''">#{htmlType},</if>
			<if test="dictType != null and dictType != ''">#{dictType},</if>
			<if test="sort != null">#{sort},</if>
			<if test="createBy != null and createBy != ''">#{createBy},</if>
			sysdate()
         )
    </insert>
```

![image-20211010172448197](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010172448197.png)

##### 4.1.3.4 resultMap

```sql
<resultMap type="GenTable" id="GenTableResult">
	    <id     property="tableId"        column="table_id"          />
		<result property="tableName"      column="table_name"        />
		<result property="tableComment"   column="table_comment"     />
		<result property="subTableName"   column="sub_table_name"    />
		<result property="subTableFkName" column="sub_table_fk_name" />
		<result property="className"      column="class_name"        />
		<result property="tplCategory"    column="tpl_category"      />
		<result property="packageName"    column="package_name"      />
		<result property="moduleName"     column="module_name"       />
		<result property="businessName"   column="business_name"     />
		<result property="functionName"   column="function_name"     />
		<result property="functionAuthor" column="function_author"   />
		<result property="genType"        column="gen_type"          />
		<result property="genPath"        column="gen_path"          />
		<result property="options"        column="options"           />
		<result property="createBy"       column="create_by"         />
		<result property="createTime"     column="create_time"       />
		<result property="updateBy"       column="update_by"         />
		<result property="updateTime"     column="update_time"       />
		<result property="remark"         column="remark"            />
		<collection  property="columns"  javaType="java.util.List"  resultMap="GenTableColumnResult" />
	</resultMap>
```

#### 4.1.5 domain

```java
/**
 * 业务表 gen_table
 * 
 * @author ygn
 */
@Data
public class GenTable extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    private Long tableId;

    /** 表名称 */
    @NotBlank(message = "表名称不能为空")
    private String tableName;

    /** 表描述 */
    @NotBlank(message = "表描述不能为空")
    private String tableComment;

    /** 关联父表的表名 */
    private String subTableName;

    /** 本表关联父表的外键名 */
    private String subTableFkName;

    /** 实体类名称(首字母大写) */
    @NotBlank(message = "实体类名称不能为空")
    private String className;

    /** 使用的模板（crud单表操作 tree树表操作 sub主子表操作） */
    private String tplCategory;

    /** 生成包路径 */
    @NotBlank(message = "生成包路径不能为空")
    private String packageName;

    /** 生成模块名 */
    @NotBlank(message = "生成模块名不能为空")
    private String moduleName;

    /** 生成业务名 */
    @NotBlank(message = "生成业务名不能为空")
    private String businessName;

    /** 生成功能名 */
    @NotBlank(message = "生成功能名不能为空")
    private String functionName;

    /** 生成作者 */
    @NotBlank(message = "作者不能为空")
    private String functionAuthor;

    /** 生成代码方式（0zip压缩包 1自定义路径） */
    private String genType;

    /** 生成路径（不填默认项目路径） */
    private String genPath;

    /** 主键信息 */
    private GenTableColumn pkColumn;

    /** 子表信息 */
    private GenTable subTable;

    /** 表列信息 */
    @Valid
    private List<GenTableColumn> columns;

    /** 其它生成选项 */
    private String options;

    /** 树编码字段 */
    private String treeCode;

    /** 树父编码字段 */
    private String treeParentCode;

    /** 树名称字段 */
    private String treeName;

    /** 上级菜单ID字段 */
    private String parentMenuId;

    /** 上级菜单名称字段 */
    private String parentMenuName;
}
```

#### 4.1.6 页面效果

##### 4.1.6.1 导入表

![image-20211010172655487](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010172655487.png)

##### 4.1.6.2 导入后表基本信息

![image-20211010173151657](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010173151657.png)

##### 4.1.6.3 导入后表字段信息

![image-20211010173235650](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010173235650.png)

##### 4.1.6.4 导入后生成信息

![image-20211010173250906](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211010173250906.png)

#### 4.1.5 生成工具类GenUtils   

主要功能

- initTable： 初始化表结构信息
  - 表名
  - 包名
  - 模块名
- initColumnField ： 初始化列名信息
  - 需要将数据库类型转为java类型

```sql

/**
 * 代码生成器 工具类
 * 
 * @author ygn
 */
public class GenUtils
{
    /**
     * 初始化表信息
     */
    public static void initTable(GenTable genTable, String operName)
    {
        genTable.setClassName(convertClassName(genTable.getTableName()));
        genTable.setPackageName(GenConfig.getPackageName());
        genTable.setModuleName(getModuleName(GenConfig.getPackageName()));
        genTable.setBusinessName(getBusinessName(genTable.getTableName()));
        genTable.setFunctionName(replaceText(genTable.getTableComment()));
        genTable.setFunctionAuthor(GenConfig.getAuthor());
        genTable.setCreateBy(operName);
    }

    /**
     * 初始化列属性字段
     */
    public static void initColumnField(GenTableColumn column, GenTable table)
    {
        String dataType = getDbType(column.getColumnType());
        String columnName = column.getColumnName();
        column.setTableId(table.getTableId());
        column.setCreateBy(table.getCreateBy());
        // 设置java字段名
        column.setJavaField(StringUtils.toCamelCase(columnName));
        // 设置默认类型
        column.setJavaType(GenConstants.TYPE_STRING);

        if (arraysContains(GenConstants.COLUMNTYPE_STR, dataType) || arraysContains(GenConstants.COLUMNTYPE_TEXT, dataType))
        {
            // 字符串长度超过500设置为文本域
            Integer columnLength = getColumnLength(column.getColumnType());
            String htmlType = columnLength >= 500 || arraysContains(GenConstants.COLUMNTYPE_TEXT, dataType) ? GenConstants.HTML_TEXTAREA : GenConstants.HTML_INPUT;
            column.setHtmlType(htmlType);
        }
        else if (arraysContains(GenConstants.COLUMNTYPE_TIME, dataType))
        {
            column.setJavaType(GenConstants.TYPE_DATE);
            column.setHtmlType(GenConstants.HTML_DATETIME);
        }
        else if (arraysContains(GenConstants.COLUMNTYPE_NUMBER, dataType))
        {
            column.setHtmlType(GenConstants.HTML_INPUT);

            // 如果是浮点型 统一用BigDecimal
            String[] str = StringUtils.split(StringUtils.substringBetween(column.getColumnType(), "(", ")"), ",");
            if (str != null && str.length == 2 && Integer.parseInt(str[1]) > 0)
            {
                column.setJavaType(GenConstants.TYPE_BIGDECIMAL);
            }
            // 如果是整形
            else if (str != null && str.length == 1 && Integer.parseInt(str[0]) <= 10)
            {
                column.setJavaType(GenConstants.TYPE_INTEGER);
            }
            // 长整形
            else
            {
                column.setJavaType(GenConstants.TYPE_LONG);
            }
        }

        // 插入字段（默认所有字段都需要插入）
        column.setIsInsert(GenConstants.REQUIRE);

        // 编辑字段
        if (!arraysContains(GenConstants.COLUMNNAME_NOT_EDIT, columnName) && !column.isPk())
        {
            column.setIsEdit(GenConstants.REQUIRE);
        }
        // 列表字段
        if (!arraysContains(GenConstants.COLUMNNAME_NOT_LIST, columnName) && !column.isPk())
        {
            column.setIsList(GenConstants.REQUIRE);
        }
        // 查询字段
        if (!arraysContains(GenConstants.COLUMNNAME_NOT_QUERY, columnName) && !column.isPk())
        {
            column.setIsQuery(GenConstants.REQUIRE);
        }

        // 查询字段类型
        if (StringUtils.endsWithIgnoreCase(columnName, "name"))
        {
            column.setQueryType(GenConstants.QUERY_LIKE);
        }
        // 状态字段设置单选框
        if (StringUtils.endsWithIgnoreCase(columnName, "status"))
        {
            column.setHtmlType(GenConstants.HTML_RADIO);
        }
        // 类型&性别字段设置下拉框
        else if (StringUtils.endsWithIgnoreCase(columnName, "type")
                || StringUtils.endsWithIgnoreCase(columnName, "sex"))
        {
            column.setHtmlType(GenConstants.HTML_SELECT);
        }
        // 图片字段设置图片上传控件
        else if (StringUtils.endsWithIgnoreCase(columnName, "image"))
        {
            column.setHtmlType(GenConstants.HTML_IMAGE_UPLOAD);
        }
        // 文件字段设置文件上传控件
        else if (StringUtils.endsWithIgnoreCase(columnName, "file"))
        {
            column.setHtmlType(GenConstants.HTML_FILE_UPLOAD);
        }
        // 内容字段设置富文本控件
        else if (StringUtils.endsWithIgnoreCase(columnName, "content"))
        {
            column.setHtmlType(GenConstants.HTML_EDITOR);
        }
    }

    /**
     * 校验数组是否包含指定值
     * 
     * @param arr 数组
     * @param targetValue 值
     * @return 是否包含
     */
    public static boolean arraysContains(String[] arr, String targetValue)
    {
        return Arrays.asList(arr).contains(targetValue);
    }

    /**
     * 获取模块名
     * 
     * @param packageName 包名
     * @return 模块名
     */
    public static String getModuleName(String packageName)
    {
        int lastIndex = packageName.lastIndexOf(".");
        int nameLength = packageName.length();
        String moduleName = StringUtils.substring(packageName, lastIndex + 1, nameLength);
        return moduleName;
    }

    /**
     * 获取业务名
     * 
     * @param tableName 表名
     * @return 业务名
     */
    public static String getBusinessName(String tableName)
    {
        int lastIndex = tableName.lastIndexOf("_");
        int nameLength = tableName.length();
        String businessName = StringUtils.substring(tableName, lastIndex + 1, nameLength);
        return businessName;
    }

    /**
     * 表名转换成Java类名
     * 
     * @param tableName 表名称
     * @return 类名
     */
    public static String convertClassName(String tableName)
    {
        boolean autoRemovePre = GenConfig.getAutoRemovePre();
        String tablePrefix = GenConfig.getTablePrefix();
        if (autoRemovePre && StringUtils.isNotEmpty(tablePrefix))
        {
            String[] searchList = StringUtils.split(tablePrefix, ",");
            tableName = replaceFirst(tableName, searchList);
        }
        return StringUtils.convertToCamelCase(tableName);
    }

    /**
     * 批量替换前缀
     * 
     * @param replacementm 替换值
     * @param searchList 替换列表
     * @return
     */
    public static String replaceFirst(String replacementm, String[] searchList)
    {
        String text = replacementm;
        for (String searchString : searchList)
        {
            if (replacementm.startsWith(searchString))
            {
                text = replacementm.replaceFirst(searchString, "");
                break;
            }
        }
        return text;
    }

    /**
     * 关键字替换
     * 
     * @param text 需要被替换的名字
     * @return 替换后的名字
     */
    public static String replaceText(String text)
    {
        return RegExUtils.replaceAll(text, "(?:表|好名网)", "");
    }

    /**
     * 获取数据库类型字段
     * 
     * @param columnType 列类型
     * @return 截取后的列类型
     */
    public static String getDbType(String columnType)
    {
        if (StringUtils.indexOf(columnType, "(") > 0)
        {
            return StringUtils.substringBefore(columnType, "(");
        }
        else
        {
            return columnType;
        }
    }

    /**
     * 获取字段长度
     * 
     * @param columnType 列类型
     * @return 截取后的列类型
     */
    public static Integer getColumnLength(String columnType)
    {
        if (StringUtils.indexOf(columnType, "(") > 0)
        {
            String length = StringUtils.substringBetween(columnType, "(", ")");
            return Integer.valueOf(length);
        }
        else
        {
            return 0;
        }
    }
}

```

### 4.2 生成代码模板

#### 4.2.1 controller层

```java
   /**
     * 批量生成代码
     */
    @PreAuthorize("@ss.hasPermi('tool:gen:code')")
    @Log(title = "代码生成", businessType = BusinessType.GENCODE)
    @GetMapping("/batchGenCode")
    public void batchGenCode(HttpServletResponse response, String tables) throws IOException
    {
        String[] tableNames = Convert.toStrArray(tables);
        byte[] data = genTableService.downloadCode(tableNames);
        genCode(response, data);
    }
    
    
    /**
     * 生成zip文件
     */
    private void genCode(HttpServletResponse response, byte[] data) throws IOException
    {
        response.reset();
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Expose-Headers", "Content-Disposition");
        response.setHeader("Content-Disposition", "attachment; filename=\"ygn.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");
        IOUtils.write(data, response.getOutputStream());
    }
```

#### 4.2.2 Service层

- 设置表基本信息和主键信息等
- 获取我们的模板组
- 依次渲染模板内容
- 再将渲染好的内容放入zip包
- 返回下载的zip包

```java
 /**
     * 批量生成代码（下载方式）
     * 
     * @param tableNames 表数组
     * @return 数据
     */
    @Override
    public byte[] downloadCode(String[] tableNames)
    {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ZipOutputStream zip = new ZipOutputStream(outputStream);
        for (String tableName : tableNames)
        {
            generatorCode(tableName, zip);
        }
        IOUtils.closeQuietly(zip);
        return outputStream.toByteArray();
    }

/**
     * 查询表信息并生成代码
     */
    private void generatorCode(String tableName, ZipOutputStream zip)
    {
        // 查询表信息
        GenTable table = genTableMapper.selectGenTableByName(tableName);
        // 设置主子表信息
        setSubTable(table);
        // 设置主键列信息
        setPkColumn(table);

        VelocityInitializer.initVelocity();

        VelocityContext context = VelocityUtils.prepareContext(table);

        // 获取模板列表
        List<String> templates = VelocityUtils.getTemplateList(table.getTplCategory());
        for (String template : templates)
        {
            // 渲染模板
            StringWriter sw = new StringWriter();
            Template tpl = Velocity.getTemplate(template, Constants.UTF8);
            tpl.merge(context, sw);
            try
            {
                // 添加到zip
                zip.putNextEntry(new ZipEntry(VelocityUtils.getFileName(template, table)));
                IOUtils.write(sw.toString(), zip, Constants.UTF8);
                IOUtils.closeQuietly(sw);
				zip.flush();
                zip.closeEntry();
            }
            catch (IOException e)
            {
                log.error("渲染模板失败，表名：" + table.getTableName(), e);
            }
        }
    }
```

### 4.3 代码模板

#### 4.3.1 mybatis sql 模板

```sql
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${packageName}.mapper.${ClassName}Mapper">
    
    <resultMap type="${ClassName}" id="${ClassName}Result">
#foreach ($column in $columns)
        <result property="${column.javaField}"    column="${column.columnName}"    />
#end
    </resultMap>
#if($table.sub)

    <resultMap id="${ClassName}${subClassName}Result" type="${ClassName}" extends="${ClassName}Result">
        <collection property="${subclassName}List" notNullColumn="sub_${subTable.pkColumn.columnName}" javaType="java.util.List" resultMap="${subClassName}Result" />
    </resultMap>

    <resultMap type="${subClassName}" id="${subClassName}Result">
#foreach ($column in $subTable.columns)
        <result property="${column.javaField}"    column="sub_${column.columnName}"    />
#end
    </resultMap>
#end

    <sql id="select${ClassName}Vo">
        select#foreach($column in $columns) $column.columnName#if($velocityCount != $columns.size()),#end#end from ${tableName}
    </sql>

    <select id="select${ClassName}List" parameterType="${ClassName}" resultMap="${ClassName}Result">
        <include refid="select${ClassName}Vo"/>
        <where>  
#foreach($column in $columns)
#set($queryType=$column.queryType)
#set($javaField=$column.javaField)
#set($javaType=$column.javaType)
#set($columnName=$column.columnName)
#set($AttrName=$column.javaField.substring(0,1).toUpperCase() + ${column.javaField.substring(1)})
#if($column.query)
#if($column.queryType == "EQ")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName = #{$javaField}</if>
#elseif($queryType == "NE")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName != #{$javaField}</if>
#elseif($queryType == "GT")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName &gt; #{$javaField}</if>
#elseif($queryType == "GTE")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName &gt;= #{$javaField}</if>
#elseif($queryType == "LT")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName &lt; #{$javaField}</if>
#elseif($queryType == "LTE")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName &lt;= #{$javaField}</if>
#elseif($queryType == "LIKE")
            <if test="$javaField != null #if($javaType == 'String' ) and $javaField.trim() != ''#end"> and $columnName like concat('%', #{$javaField}, '%')</if>
#elseif($queryType == "BETWEEN")
            <if test="params.begin$AttrName != null and params.begin$AttrName != '' and params.end$AttrName != null and params.end$AttrName != ''"> and $columnName between #{params.begin$AttrName} and #{params.end$AttrName}</if>
#end
#end
#end
        </where>
    </select>
    
    <select id="select${ClassName}ById" parameterType="${pkColumn.javaType}" resultMap="#if($table.sub)${ClassName}${subClassName}Result#else${ClassName}Result#end">
#if($table.crud || $table.tree)
        <include refid="select${ClassName}Vo"/>
        where ${pkColumn.columnName} = #{${pkColumn.javaField}}
#elseif($table.sub)
        select#foreach($column in $columns) a.$column.columnName#if($velocityCount != $columns.size()),#end#end,
           #foreach($column in $subTable.columns) b.$column.columnName as sub_$column.columnName#if($velocityCount != $subTable.columns.size()),#end#end

        from ${tableName} a
        left join ${subTableName} b on b.${subTableFkName} = a.${pkColumn.columnName}
        where a.${pkColumn.columnName} = #{${pkColumn.javaField}}
#end
    </select>
        
    <insert id="insert${ClassName}" parameterType="${ClassName}"#if($pkColumn.increment) useGeneratedKeys="true" keyProperty="$pkColumn.javaField"#end>
        insert into ${tableName}
        <trim prefix="(" suffix=")" suffixOverrides=",">
#foreach($column in $columns)
#if($column.columnName != $pkColumn.columnName || !$pkColumn.increment)
            <if test="$column.javaField != null#if($column.javaType == 'String' && $column.required) and $column.javaField != ''#end">$column.columnName,</if>
#end
#end
         </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
#foreach($column in $columns)
#if($column.columnName != $pkColumn.columnName || !$pkColumn.increment)
            <if test="$column.javaField != null#if($column.javaType == 'String' && $column.required) and $column.javaField != ''#end">#{$column.javaField},</if>
#end
#end
         </trim>
    </insert>

    <update id="update${ClassName}" parameterType="${ClassName}">
        update ${tableName}
        <trim prefix="SET" suffixOverrides=",">
#foreach($column in $columns)
#if($column.columnName != $pkColumn.columnName)
            <if test="$column.javaField != null#if($column.javaType == 'String' && $column.required) and $column.javaField != ''#end">$column.columnName = #{$column.javaField},</if>
#end
#end
        </trim>
        where ${pkColumn.columnName} = #{${pkColumn.javaField}}
    </update>

    <delete id="delete${ClassName}ById" parameterType="${pkColumn.javaType}">
        delete from ${tableName} where ${pkColumn.columnName} = #{${pkColumn.javaField}}
    </delete>

    <delete id="delete${ClassName}ByIds" parameterType="String">
        delete from ${tableName} where ${pkColumn.columnName} in 
        <foreach item="${pkColumn.javaField}" collection="array" open="(" separator="," close=")">
            #{${pkColumn.javaField}}
        </foreach>
    </delete>
#if($table.sub)
    
    <delete id="delete${subClassName}By${subTableFkClassName}s" parameterType="String">
        delete from ${subTableName} where ${subTableFkName} in 
        <foreach item="${subTableFkclassName}" collection="array" open="(" separator="," close=")">
            #{${subTableFkclassName}}
        </foreach>
    </delete>

    <delete id="delete${subClassName}By${subTableFkClassName}" parameterType="Long">
        delete from ${subTableName} where ${subTableFkName} = #{${subTableFkclassName}}
    </delete>

    <insert id="batch${subClassName}">
        insert into ${subTableName}(#foreach($column in $subTable.columns) $column.columnName#if($velocityCount != $subTable.columns.size()),#end#end) values
		<foreach item="item" index="index" collection="list" separator=",">
            (#foreach($column in $subTable.columns) #{item.$column.javaField}#if($velocityCount != $subTable.columns.size()),#end#end)
        </foreach>
    </insert>
#end
</mapper>
```

#### 4.3.2 Service实现类模板

```
package ${packageName}.service.impl;

import java.util.List;
#foreach ($column in $columns)
#if($column.javaField == 'createTime' || $column.javaField == 'updateTime')
import com.ygn.common.utils.DateUtils;
#break
#end
#end
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
#if($table.sub)
import java.util.ArrayList;
import com.ygn.common.utils.StringUtils;
import org.springframework.transaction.annotation.Transactional;
import ${packageName}.domain.${subClassName};
#end
import ${packageName}.mapper.${ClassName}Mapper;
import ${packageName}.domain.${ClassName};
import ${packageName}.service.${ClassName}Service;

/**
 * ${functionName}Service业务层处理
 * 
 * @author ${author}
 * @date ${datetime}
 */
@Service
public class ${ClassName}ServiceImpl implements ${ClassName}Service
{
    @Resource
    private ${ClassName}Mapper ${className}Mapper;

    /**
     * 查询${functionName}
     * 
     * @param ${pkColumn.javaField} ${functionName}ID
     * @return ${functionName}
     */
    @Override
    public ${ClassName} select${ClassName}ById(${pkColumn.javaType} ${pkColumn.javaField})
    {
        return ${className}Mapper.select${ClassName}ById(${pkColumn.javaField});
    }

    /**
     * 查询${functionName}列表
     * 
     * @param ${className} ${functionName}
     * @return ${functionName}
     */
    @Override
    public List<${ClassName}> select${ClassName}List(${ClassName} ${className})
    {
        return ${className}Mapper.select${ClassName}List(${className});
    }

    /**
     * 新增${functionName}
     * 
     * @param ${className} ${functionName}
     * @return 结果
     */
#if($table.sub)
    @Transactional
#end
    @Override
    public int insert${ClassName}(${ClassName} ${className})
    {
#foreach ($column in $columns)
#if($column.javaField == 'createTime')
        ${className}.setCreateTime(DateUtils.getNowDate());
#end
#end
#if($table.sub)
        int rows = ${className}Mapper.insert${ClassName}(${className});
        insert${subClassName}(${className});
        return rows;
#else
        return ${className}Mapper.insert${ClassName}(${className});
#end
    }

    /**
     * 修改${functionName}
     * 
     * @param ${className} ${functionName}
     * @return 结果
     */
#if($table.sub)
    @Transactional
#end
    @Override
    public int update${ClassName}(${ClassName} ${className})
    {
#foreach ($column in $columns)
#if($column.javaField == 'updateTime')
        ${className}.setUpdateTime(DateUtils.getNowDate());
#end
#end
#if($table.sub)
        ${className}Mapper.delete${subClassName}By${subTableFkClassName}(${className}.get${pkColumn.capJavaField}());
        insert${subClassName}(${className});
#end
        return ${className}Mapper.update${ClassName}(${className});
    }

    /**
     * 批量删除${functionName}
     * 
     * @param ${pkColumn.javaField}s 需要删除的${functionName}ID
     * @return 结果
     */
#if($table.sub)
    @Transactional
#end
    @Override
    public int delete${ClassName}ByIds(${pkColumn.javaType}[] ${pkColumn.javaField}s)
    {
#if($table.sub)
        ${className}Mapper.delete${subClassName}By${subTableFkClassName}s(${pkColumn.javaField}s);
#end
        return ${className}Mapper.delete${ClassName}ByIds(${pkColumn.javaField}s);
    }

    /**
     * 删除${functionName}信息
     * 
     * @param ${pkColumn.javaField} ${functionName}ID
     * @return 结果
     */
    @Override
    public int delete${ClassName}ById(${pkColumn.javaType} ${pkColumn.javaField})
    {
#if($table.sub)
        ${className}Mapper.delete${subClassName}By${subTableFkClassName}(${pkColumn.javaField});
#end
        return ${className}Mapper.delete${ClassName}ById(${pkColumn.javaField});
    }
#if($table.sub)

    /**
     * 新增${subTable.functionName}信息
     * 
     * @param ${className} ${functionName}对象
     */
    public void insert${subClassName}(${ClassName} ${className})
    {
        List<${subClassName}> ${subclassName}List = ${className}.get${subClassName}List();
        Long ${pkColumn.javaField} = ${className}.get${pkColumn.capJavaField}();
        if (StringUtils.isNotNull(${subclassName}List))
        {
            List<${subClassName}> list = new ArrayList<${subClassName}>();
            for (${subClassName} ${subclassName} : ${subclassName}List)
            {
                ${subclassName}.set${subTableFkClassName}(${pkColumn.javaField});
                list.add(${subclassName});
            }
            if (list.size() > 0)
            {
                ${className}Mapper.batch${subClassName}(list);
            }
        }
    }
#end
}

```



## 参考文章

[若依官方文档](http://doc.ruoyi.vip/ruoyi/document/htsc.html#%E6%89%8B%E5%8A%A8%E5%88%87%E6%8D%A2%E6%95%B0%E6%8D%AE%E6%BA%90)

