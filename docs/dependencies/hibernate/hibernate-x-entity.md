# Hibernate实体类创建规则

## 1. 注意事项

1. 为持久化类(实体类)提供无参构造
2. 成员变量私有，提供get/set方法访问，需提供属性
3. 持久化类中的属性应尽量用包装类型, 如Long 、String  因为基本类型不一定能用null
4. 持久化类需提供唯一标志oid，与数据库中的主键列相对应
5. 尽量不要用final修饰class。
      //因为hibernate使用cglib代理生成代理对象，代理对象是即成被代理对象的，final会导致无法代理

## 2. 主键

### 2.1 主键类型

自然主键(少见)和代理主键(常见)

    1. 自然主键：表的业务列中，某列必须有且不重复时，该列可当作主键使用

2. 代理主键：表的业务列中，没有某列必须有且不重复时，则需创建一个没有业务意义的列作为主键

### 2.2 主键生成策略

即每条记录录入时，主键的生成规则（位于orm元数据配置的id标签里的generator标签）

1. identity：主键自增：有数据库来维护主键值，录入时不需指定主
2. sequence：Oracle的主键生成策略
3. increment：主键自增：由hibernate来维护，每次插入时先查询表中id最大值，+1作为主键(线程不安全，不用)
           //此时执行save方法，为了生成id，会执行查询id最大值的sql语句
4. hilo(了解)：主键自增，高低位算法，有hibernate来维护（不使用）
5. **native**：hilo+sequence+identity，自动三选一策略
6. **uuid**：产生随机字符串作为主键。主键类型必须为String
7. assigned：自然主键生成策略，hibernate不管理主键值，由开发人员自己控制录入

## 3. 实体类注解

### 3.1 @Id

@Id 标注用于声明一个实体类的属性映射为[数据库](http://lib.csdn.net/base/mysql)的主键列。该属性通常置于属性声明语句之前，可与声明语句同行，也可写在单独行上。
@Id标注也可置于属性的getter方法之前。

### 3.2 @GeneratedValue

@GeneratedValue 用于标注主键的生成策略，通过strategy 属性指定。默认情况下，JPA 自动选择一个最适合底层数据库的主键生成策略：SqlServer对应identity，[MySQL](http://lib.csdn.net/base/mysql) 对应 auto increment。
在javax.persistence.GenerationType中定义了以下几种可供选择的策略：

- IDENTITY：采用数据库ID自增长的方式来自增主键字段，[Oracle](http://lib.csdn.net/base/oracle) 不支持这种方式； 
- AUTO： JPA自动选择合适的策略，是默认选项；
- SEQUENCE：通过序列产生主键，通过@SequenceGenerator 注解指定序列名，MySql不支持这种方式
- TABLE：通过表产生主键，框架借由表模拟序列产生主键，使用该策略可以使应用更易于数据库移植。

```

@Table(name="CUSTOMERS")
@Entity
public class Customer {
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private Integer id;
    private String name;
    private String email;
    private int age;
 
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;

```

### 3.3 @Column

当实体的属性与其映射的[数据库](http://lib.csdn.net/base/mysql)表的列不同名时需要使用@Column 标注说明，该属性通常置于实体的属性声明语句之前，还可与 @Id 标注一起使用。

>- @Column 标注的常用属性是name，用于设置映射数据库表的列名。此外，该标注还包含其它多个属性，如：unique、nullable、length 等。
>- @Column 标注的columnDefinition属性: 表示该字段在数据库中的实际类型.通常 ORM 框架可以根据属性类型自动判断数据库中字段的类型,但是对于Date类型仍无法确定数据库中字段类型究竟是DATE,TIME还是TIMESTAMP.此外,String的默认映射类型为VARCHAR,如果要将 String 类型映射到特定数据库的 BLOB 或TEXT字段类型.

- name属性：
  name属性定义了被标注字段在数据库表中所对应字段的名称

- unique属性：
  unique属性表示该字段是否为唯一标识，默认为false。
  如果表中有一个字段需要唯一标识，则既可以使用该标记，也可以使用@Table注解中的@UniqueConstraint

- nullable属性：
  nullable属性表示该字段是否可以为null值，默认为true

- insertable属性：
  insertable属性表示在使用”INSERT”语句插入数据时，是否需要插入该字段的值

- updateable属性：
  updateable属性表示在使用”UPDATE”语句插入数据时，是否需要更新该字段的值

  insertable和updateable属性一般多用于只读的属性，例如主键和外键等，这些字段通常是自动生成的\

- columnDefinition属性：
  columnDefinition属性表示创建表时，该字段创建的SQL语句，一般用于通过Entity生成表定义时使用
  如果数据库中表已经建好，该属性没有必要使用

- table属性：
  table属性定义了包含当前字段的表名

- length属性：
  length属性表示字段的长度，当字段的类型为varchar时，该属性才有效，默认为255个字符

- precision属性和scale属性：
  precision属性和scale属性一起表示精度，当字段类型为double时，precision表示数值的总长度，scale表示小数点所占的位数

```java
@Table(name = "CUSTOMERS")
@Entity
public class Customer {
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer id;
    @Column(name = "Name")
    private String name;
    @Column(name = "Email", nullable = true, length = 128)
    private String email;
    @Column(name = "Age")
    private int age;
    @Column(name = "Remark", columnDefinition = "text")
    private String remark;
 
    @Column(name = "Salary1", columnDefinition = "decimal(5,2)")
    private double salary1;
    @Column(name = "Salary2", precision = 5, scale = 2)
    private double salary2;
    @Column(name = "Salary3", columnDefinition = "decimal(5,2)")
    private BigDecimal salary3;
    @Column(name = "Salary4", precision = 5, scale = 2)
    private BigDecimal salary4;
    ......
}

```



## 参考文章

[Hibernate](https://sourceforge.net/projects/hibernate/files/hibernate-orm/)