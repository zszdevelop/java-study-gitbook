---
order: 20
category:
  - code style

---

# 代码质量 - 统一风格：统一命名规范详解

> 好的代码本身就是注释, 所以我们需要统一命名风格，本文将介绍常用的统一风格的措施之**统一命名规范**。

## 1. 统一命名风格

> 好的代码本身就是注释, 所以我们需要统一命名风格。

 在本文中，将从大到小，从外到内，总结Java编程中的命名规范。文中将会涉及到日常工作中常见的命名示例，如包命名，类命名，接口命名，方法命名，变量命名，常类命名，抽象类命名，异常类命名以及扩展类命名等。我将按照项目工程目录结构，从包，类(接口，抽象类，异常类)，方法，变量和常量的顺序展开介绍。

### 1.1 包命名规范

> 包(Package)的作用是将功能相似或相关的类或者接口进行分组管理，便于类的定位和查找，同时也可以使用包来避免类名的冲突和访问控制，使代码更容易维护。通常，包命使用小写英文字母进行命名，并使用“.”进行分割，每个被分割的单元只能包含一个名词。一般地，包命名常采用顶级域名作为前缀，例如com，net，org，edu，gov，cn，io等，随后紧跟公司/组织/个人名称以及功能模块名称。

下面是一些包命名示例：

```java
package org.springframework.boot.autoconfigure.cloud
package org.springframework.boot.util
package org.hibernate.action
package org.hibernate.cfg
package com.alibaba.druid
package com.alibaba.druid.filter
package com.alibaba.nacos.client.config
package com.ramostear.blog.web

```

下面是Oracle Java的一些常见包命名例子：

```java
package java.beans
package java.io
package java.lang
package java.net
package java.util
package javax.annotation
```

### 1.2 类命名规范

> 类(Class)通常采用名词进行命名，且首字母大写，如果一个类名包含两个以上名词，建议使用驼峰命名(Camel-Case)法书写类名,每个名词首字母也应该大写。一般地，类名的书写尽量使其保持简单和描述的完整性，因此在书写类名时不建议使用缩写(一些约定俗成的命名除外，例如Internationalization and Localization缩写成i18n，Uniform Resource Identifier缩写成URI，Data Access Object缩写成DAO，JSON Web Token缩写成JWT，HyperText Markup Language缩写成HTML等等)。下列是一些常见的类命名示例：

```java
public class UserDTO{
    //TODO...
}
class EmployeeService{
    //TODO...
}
class StudentDAO{
    //TODO...
}
class OrderItemEntity{
    //TODO...
}
public class UserServiceImpl{
    //TODO...
}
public class OrderItemController{
    //TODO...
}
```

下面是Oracle Java中的一些标准命名示例：

```java
public class HTMLEditorKit{
    //...
}
public abstract class HttpContext{
    //...
}
public interface ImageObserver{
    //...
}
public class ArrayIndexOutOfBoundsException{
    //...
}
public class enum Thread.State{
    //...
}

  
```

### 1.3 接口命名规范

> 首先，接口(Interface)是一种表述某一类型对象动作的特殊类；简单来说，接口也是类(不太严谨)，所以，接口的名称的书写也应该符合类名书写规范，首字母应该大写，与普通类名不同的是，接口命名时通常采用形容词或动词来描述接口的动作行为。下列是Oracle Java中一些标准库的接口使用形容词命名示例：

```java
public interface Closeable{
    //...
}
public interface Cloneable{
    //...
}
public interface Runnable{
    //...
}
public interface Comparable<T>{
    //...
}
public interface CompletionService<V>{
    //...
}
public interface Iterable<T>{
    //...
}
public interface EventListener{
    //...
}
```

在Spring Framework标准库中，通常采用名词+动词/形容词的组合方式来命名接口，下列是Spring Framework中一些接口命名示例：

```java
public interface AfterAdvice{
    //...
}
public interface TargetClassAware{
    //...
}
public interface ApplicationContextAware{
    //...
}
public interface MessageSourceResolvable{
    //...
}

  
```

### 1.4 抽象类命名规范

> 抽象类(Abstract Class)是一种特殊的类，其命名与普通类的命名规范相当。一般地，为了将抽象类与普通类和接口做出区别，提高抽象类的可读性，在命名抽象类时，会以“Abstract”/“Base”作为类命的前缀。下面是编程中一些常规的命名示例：

```java
public abstract class AbstractRepository<T>{
    //...
}
public abstract class AbstractController{
    //...
}
public abstract class BaseDao<T,ID>{
    //...
}
public abstract class AbstractCommonService<T>{
    //...
}

```

以下是Spring Framework中常见的抽象类示例：

```java
public abstract class AbstractAspectJAdvice{
    //...
}
public abstract class AbstractSingletonProxyFactoryBean{
    //...
}
public abstract class AbstractBeanFactoryPointcutAdvisor{
    //...
}
public abstract class AbstractCachingConfiguration{
    //...
}
public abstract class AbstractContextLoaderInitializer{
    //...
}
```

### 1.5 异常类命名规范

> 异常类(Exception Class)也是类的一种，但与普通类命名不同的是，异常类在命名时需要使用“Exception”作为其后缀。下面是常见的异常类命名示例：

```java
public class FileNotFoundException{
    //...
}
public class UserAlreadyExistException{
    //...
}
public class TransactionException{
    //...
}
public class ClassNotFoundException{
    //...
}
public class IllegalArgumentException{
    //...
}
public class IndexOutOfBoundsException{
    //...
}
```

另外，在Java中还有另外一类异常类，它们属于系统异常，这一类异常类的命名使用“Error”作为其后缀，以区分Exception(编码，环境，操作等异常)。下面是系统异常(非检查异常)的命名示例：

```java
public abstract class VirtualMachineError{
    //...
}
public class StackOverflowError{
    //...
}
public class OutOfMemoryError{
    //...
}
public class IllegalAccessError{
    //...
}
public class NoClassDefFoundError{
    //...
}
public class NoSuchFieldError{
    //...
}
public class NoSuchMethodError{
    //...
}
```

### 1.6 方法命名规范

> 方法(Method)命名时,其首字母应该小写，如果方法签名由多个单词组成，则从第二个单词起，使用驼峰命名法进行书写。一般地，在对方法进行命名时，通常采用动词/动词+名词的组合，下面是方法命名的一些常见示例。

#### 1.6.1 表述获取

 如果一个方法用于获取某个值，通常使用“get”作为其前缀，例如：

```java
public String getUserName(){
    //...
}
public List<Integer> getUserIds(){
    //...
}
public User getOne(){
    //...
}
```

#### 1.6.2 表述查询

 如果方法需要通过查询或筛选的方式获取某个数据，通常使用“find”/“query”作为其前缀，例如：

```java
public List<User> findOne(Integer id){
    //...
}
public List<Integer> findAll(){
    //...
} 
public List<String> queryOrders(){
    //...
}
```

#### 1.6.3 表述条件

 如果一个方法需要一些条件参数，则可以使用“by”/“with”等字符作为方法名中条件的连接符，例如：

```java
public User findByUsername(String username){
    //...
}
public List<Integer> getUserIdsWithState(boolean state){
    //...
}
public List<User> findAllByUsernameOrderByIdDesc(String username){
    //...
}
```

#### 1.6.4 表述设置

 如果一个方法是要设置，插入，修改，删除等操作，应该将对应的动词(set,insert,update,delete)作为其名词的前缀，例如：

```java
public void setName(String name){
    //...
}
public User insert(User user){
    //...
}
public void update(User user){
    //...
}
public void clearAll(){
    //...
}
```

#### 1.6.5 其他规范

 如果一个方法用于获取某组数据的长度或数量，则该方法应该使用length或size命名；如果方法的返回值为布尔类型(Boolean)，则该方法应该使用“is”或”has”作为前缀；如果方法用于将一种类型的数据转换为另一种数据数类型，则可以使用“to”作为前缀。下面是综合示例：

```java
public long length(){
    //...
}
public int size(){
    //...
}
public boolean isOpen(){
    //...
}
public boolean isNotEmpty(){
    //...
}
public boolean hasLength(){
    //...
}
public Set<Integer> mapToSet(Map map){
    //...
}
public UserDto convertTo(User user){
    //...
}
public String toString(Object obj){
    //...
}
```

### 1.7 变量命名规范

> 变量(Variable)命名包括参数名称，成员变量和局部变量。变量命名通常以小写字母开头，如果变量名由多个单词构成，则从第二个单词起首字母需要大写，在变量命名过程中，不建议使用“_”作为前缀或者单词之间的分割符号。下面是一些常见的变量命名示例：

```java
private String nickName;
private String mobileNumber;
private Long id;
private String username;
private Long orderId;
private Long orderItemId;
```

### 1.8 常量命名规范

> 一般地，常量名称采用全部大写的英文单词书写，如果常量名称由多个单词组成，则单词之间统一使用“_”进行分割，下面是常量命名示例：

```java
public static final String LOGIN_USER_SESSION_KEY = "current_login_user";
public static final int MAX_AGE_VALUE = 120;
public static final int DEFAULT_PAGE_NO = 1;
public static final long MAX_PAGE_SIZE = 1000;
public static final boolean HAS_LICENSE = false;
public static final boolean IS_CHECKED = false;
```

### 1.9 枚举命名规范

> 枚举(Enum)类是一种特殊的类，其命名规范遵循普通类的命名约束条件，首字母大写，采用驼峰命名法；枚举类中定义的值的名称遵循常量的命名规范，且枚举值的名称需要与类名有一定的关联性，下面是枚举的一些示例：

```java
public enum Color{
    RED,YELLOW,BLUE,GREEN,WHITE;
}
public enum PhysicalSize{
    TINY,SMALL,MEDIUM,LARGE,HUGE,GIGANTIC;
}
```

下面是Oracle Java标准库中的一个示例：

```java
public enum ElementType{
    TYPE,
    FIELD,
    METHOD,
    PARAMETER,
    CONSTRUCTOR,
    LOCAL_VARIABLE,
    ANNOTATION_TYPE,
    PACKAGE,
    TYPE_PARAMETER,
    TYPE_USE;
}
```

### 1.10 其他命名规范

#### 1.10.1 数组

 在定义数组时，为了便于阅读，尽量保持以下的书写规范：

```java
int[] array = new int[10];
int[] idArray ={1,2,3,4,5};
String[] nameArray = {"First","Yellow","Big"}
 
public List<String> getNameById(Integer[] ids){
    //...
}
//或者
public List<String> getNameById(Integer...ids){
    //...
}
```

#### 1.10.2 表述复数或者集合

 如果一个变量用于描述多个数据时，尽量使用单词的复数形式进行书写，例如：

```java
Collection<Order> orders;
int[] values;
List<Item> items;
```

另外，如果表述的是一个Map数据，则应使用“map”作为其后缀，例如：

```java
Map<String,User> userMap;
Map<String,List<Object>> listMap;
```

#### 1.10.3 泛型类

在书写泛型类时，通常做以下的约定：

- E表示Element，通常用在集合中；
- ID用于表示对象的唯一标识符类型
- T表示Type(类型)，通常指代类；
- K表示Key(键),通常用于Map中；
- V表示Value(值),通常用于Map中，与K结对出现；
- N表示Number,通常用于表示数值类型；
- ？表示不确定的Java类型；
- X用于表示异常；
- U,S表示任意的类型。

下面时泛型类的书写示例：

```java
public class HashSet<E> extends AbstractSet<E>{
    //...
}
public class HashMap<K,V> extends AbstractMap<K,V>{
    //...
}
public class ThreadLocal<T>{
    //...
}
public interface Functor<T,X extends Throwable>{
    T val() throws X;
}
public class Container<K,V>{
    private K key;
    private V value;
    Container(K key,V value){
        this.key = key;
        this.value = value;
    }
    //getter and setter ...
}
 
public interface BaseRepository<T,ID>{
    T findById(ID id);
 
    void update(T t);
 
    List<T> findByIds(ID...ids);
}
 
public static <T> List<T> methodName(Class<T> clz){
    List<T> dataList = getByClz(clz);
    return dataList;
} 
```

#### 1.10.4 接口实现类

 为了便于阅读，在通常情况下，建议接口实现类使用“Impl作为后缀”，不建议使用大写的“I”作为接口前缀(PS:当然也有很多代码是用I开头的），下面是接口和接口实现类的书写示例。

推荐写法：

```java
public interface OrderService{
    //...
}
public class OrderServiceImpl implements OrderService{
    //...
}
```

不建议的写法：

```java
public interface IOrderService{
    //...
}
public class OrderService implements IOrderService{
    //...
}
```

#### 1.10.5 测试类和测试方法

 在项目中，测试类采用被测试业务模块名/被测试接口/被测试类+“Test”的方法进行书写，测试类中的测试函数采用“test”+用例操作_状态的组合方式进行书写，例如：

```java
public class UserServiceTest{
 
    public void testFindByUsernameAndPassword(){
        //...
    }
 
    public void testUsernameExist_notExist(){
        //...
    }
 
    public void testDeleteById_isOk(){
        //...
    }
}
```

## 2. 阿里代码手册中命名规范

1. 【强制】代码中的命名均不能以下划线或美元符号开始，也不能以下划线或美元符号结束。
    **反例** :  `_name / __name / $Object / name_ / name$ / Object$`

2. 【强制】代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。说明: 正确的英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用。
    **正例** : `alibaba / taobao / youku / hangzhou` 等国际通用的名称，可视同英文。
    **反例** :  `DaZhePromotion [打折] / getPingfenByName() [评分] / int 某变量 = 3`

3. 【强制】类名使用 `UpperCamelCase` 风格，必须遵从驼峰形式，但以下情形例外: `DO / BO / DTO / VO / AO`
    **正例** : `MarcoPolo / UserDO / XmlService / TcpUdpDeal / TaPromotion`
    **反例** :  `macroPolo / UserDo / XMLService / TCPUDPDeal / TAPromotion`

4. 【强制】方法名、参数名、成员变量、局部变量都统一使用 `lowerCamelCase` 风格，必须遵从驼峰形式。
    **正例** : `localValue / getHttpMessage() / inputUserId`

5. 【强制】常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长。
    **正例** : `MAX_STOCK_COUNT`
    **反例** :  `MAX_COUNT`

6. 【强制】抽象类命名使用 `Abstract` 或 `Base` 开头；异常类命名使用 `Exception` 结尾；测试类命名以它要测试的类的名称开始，以 `Test` 结尾。

7. 【强制】中括号是数组类型的一部分，数组定义如下: `String[] args`。
    **反例** :  使用 `String args[]` 的方式来定义。

8. 【强制】POJO 类中布尔类型的变量，都不要加 is，否则部分框架解析会引起序列化错误。
    **反例** :  定义为基本数据类型 `Boolean isDeleted`；的属性，它的方法也是 `isDeleted()`，RPC 框架在反向解析的时候，“以为”对应的属性名称是 `deleted`，导致属性获取不到，进而抛出异常。

9. 【强制】包名统一使用小写，点分隔符之间有且仅有一个自然语义的英语单词。包名统一使用单数形式，但是类名如果有复数含义，类名可以使用复数形式。
    **正例** : 应用工具类包名为 `com.alibaba.open.util`、类名为 `MessageUtils`(此规则参考 spring 的框架结构)

10. 【强制】杜绝完全不规范的缩写，避免望文不知义。
     **反例** :  `AbstractClass` “缩写”命名成 `AbsClass`；`condition` “缩写”命名成 `condi`，此类随意缩写严重降低了代码的可阅读性。

11. 【推荐】如果使用到了设计模式，建议在类名中体现出具体模式。
     **说明** :  将设计模式体现在名字中，有利于阅读者快速理解架构设计思想。
     **正例** :

    ```
    public class OrderFactory;
    public class LoginProxy;
    public class ResourceObserver;
    ```

12. 【推荐】接口类中的方法和属性不要加任何修饰符号(`public` 也不要加)，保持代码的简洁性，并加上有效的 Javadoc 注释。尽量不要在接口里定义变量，如果一定要定义变量，肯定是与接口方法相关，并且是整个应用的基础常量。
     **正例** : 接口方法签名: `void f();`
     接口基础常量表示: `String COMPANY = "alibaba";`
     **反例** :  接口方法定义: `public abstract void f();`
     **说明** :  JDK8 中接口允许有默认实现，那么这个 `default` 方法，是对所有实现类都有价值的默认实现。

13. 接口和实现类的命名有两套规则:

    1. 【强制】对于 Service 和 DAO 类，基于 SOA 的理念，暴露出来的服务一定是接口，内部的实现类用 Impl 的后缀与接口区别。
        **正例** : `CacheServiceImpl` 实现 `CacheService` 接口。
    2. 【推荐】如果是形容能力的接口名称，取对应的形容词做接口名(通常是–able 的形式)。
        **正例** : `AbstractTranslator` 实现 `Translatable`。

14. 【参考】枚举类名建议带上 Enum 后缀，枚举成员名称需要全大写，单词间用下划线隔开。
     **说明** :  枚举其实就是特殊的常量类，且构造方法被默认强制是私有。
     **正例** : 枚举名字: `DealStatusEnum`，成员名称: `SUCCESS / UNKOWN_REASON`。

15. 【参考】各层命名规约:

    1. ```
       Service/DAO
       ```

        层方法命名规约

       1. 获取单个对象的方法用 `get` 做前缀。
       2. 获取多个对象的方法用 `list` 做前缀。
       3. 获取统计值的方法用 `count` 做前缀。
       4. 插入的方法用 `save`(推荐)或 `insert` 做前缀。
       5. 删除的方法用 `remove`(推荐)或 `delete` 做前缀。
       6. 修改的方法用 `update` 做前缀。

    2. 领域模型命名规约

       1. 数据对象: `xxxDO`，`xxx` 即为数据表名。
       2. 数据传输对象: `xxxDTO`，`xxx` 为业务领域相关的名称。
       3. 展示对象: `xxxVO`，`xxx` 一般为网页名称。
       4. `POJO` 是 `DO/DTO/BO/VO` 的统称，禁止命名成 `xxxPOJO`。

### 2.1 常量定义

1. 【强制】不允许任何魔法值(即未经定义的常量)直接出现在代码中。
    **反例** :

   ```
    String key = "Id#taobao_" + tradeId;  
    cache.put(key, value);
   ```

2. 【强制】long 或者 Long 初始赋值时，必须使用大写的 L，不能是小写的 l，小写容易跟数字 1 混淆，造成误解。 说明: `Long a = 2l;` 写的是数字的 21，还是 Long 型的 2?

3. 【推荐】不要使用一个常量类维护所有常量，应该按常量功能进行归类，分开维护。如: 缓存相关的常量放在类: CacheConsts 下；系统配置相关的常量放在类: ConfigConsts 下。
    **说明** :  大而全的常量类，非得使用查找功能才能定位到修改的常量，不利于理解和维护。

4. 【推荐】常量的复用层次有五层: 跨应用共享常量、应用内共享常量、子工程内共享常量、包内共享常量、类内共享常量。

   1. 跨应用共享常量: 放置在二方库中，通常是 `client.jar` 中的 `constant` 目录下。

   2. 应用内共享常量: 放置在一方库的 `modules` 中的 `constant` 目录下。
       **反例** :  易懂变量也要统一定义成应用内共享常量，两位攻城师在两个类中分别定义了表示“是”的变量:

      ```
       类 A 中: public static final String YES = "yes";  
       类 B 中: public static final String YES = "y";  
       A.YES.equals(B.YES)，预期是 true，但实际返回为 false，导致线上问题。  
      ```

   3. 子工程内部共享常量: 即在当前子工程的 `constant` 目录下。

   4. 包内共享常量: 即在当前包下单独的 `constant` 目录下。

   5. 类内共享常量: 直接在类内部 `private static final` 定义。

5. 【推荐】如果变量值仅在一个范围内变化，且带有名称之外的延伸属性，定义为枚举类。下面正例中的数字就是延伸信息，表示星期几。
    **正例** : `public Enum { MONDAY(1), TUESDAY(2), WEDNESDAY(3), THURSDAY(4), FRIDAY(5), SATURDAY(6), SUNDAY(7);}`

### 2.2 代码格式

1. 【强制】大括号的使用约定。如果是大括号内为空，则简洁地写成{}即可，不需要换行；如果是非空代码块则:

   1. 左大括号前不换行。
   2. 左大括号后换行。
   3. 右大括号前换行。
   4. 右大括号后还有 else 等代码则不换行；表示终止的右大括号后必须换行。

2. 【强制】 左小括号和字符之间不出现空格；同样，右小括号和字符之间也不出现空格。详见 第 5 条下方正例提示。
    **反例** :  `if (空格 a == b 空格)`

3. 【强制】`if/for/while/switch/do` 等保留字与括号之间都必须加空格。

4. 【强制】任何二目、三目运算符的左右两边都需要加一个空格。
    **说明** :  运算符包括赋值运算符=、逻辑运算符&&、加减乘除符号等。

5. 【强制】缩进采用 4 个空格，禁止使用 tab 字符。
    **说明** :  如果使用 tab 缩进，必须设置 1 个 tab 为 4 个空格。IDEA 设置 tab 为 4 个空格时，请勿勾选 `Use tab character`；而在 eclipse 中，必须勾选 `insert spaces for tabs`。
    **正例** : (涉及 1-5 点)

   ```java
    public static void main(String[] args) {
        // 缩进 4 个空格
        String say = "hello";
        // 运算符的左右必须有一个空格
        int flag = 0;
        // 关键词 if 与括号之间必须有一个空格，括号内的 f 与左括号，0 与右括号不需要空格
        if (flag == 0) {
            System.out.println(say);
        }
   
        // 左大括号前加空格且不换行；左大括号后换行
        if (flag == 1) {
            System.out.println("world");
        // 右大括号前换行，右大括号后有 else，不用换行
        } else {
            System.out.println("ok");
        // 在右大括号后直接结束，则必须换行
        }
    } 
   
   ```

6. 【强制】单行字符数限制不超过 120 个，超出需要换行，换行时遵循如下原则:

1. 第二行相对第一行缩进 4 个空格，从第三行开始，不再继续缩进，参考示例。

2. 运算符与下文一起换行。

3. 方法调用的点符号与下文一起换行。

4. 在多个参数超长，在逗号后换行。

5. 在括号前不要换行，见反例。
    **正例** :

   ```
    StringBuffer sb = new StringBuffer();
    //超过 120 个字符的情况下，换行缩进 4 个空格，并且方法前的点符号一起换行
    sb.append("zi").append("xin")...
    .append("huang")...
    .append("huang")...
    .append("huang");
   ```

   **反例** :

   ```
    StringBuffer sb = new StringBuffer();
    //超过 120 个字符的情况下，不要在括号前换行
    sb.append("zi").append("xin")...append
    ("huang");
    //参数很多的方法调用可能超过 120 个字符，不要在逗号前换行
    method(args1, args2, args3, ...
    , argsX); 
   
   ```

1. 【强制】方法参数在定义和传入时，多个参数逗号后边必须加空格。
    **正例** : 下例中实参的"a",后边必须要有一个空格。`method("a", "b", "c");`

2. 【强制】IDE 的 text file encoding 设置为 UTF-8; IDE 中文件的换行符使用 Unix 格式，不要使用 windows 格式。

3. 【推荐】没有必要增加若干空格来使某一行的字符与上一行对应位置的字符对齐。
    **正例** :

   ```
    int a = 3;
    long b = 4L;
    float c = 5F;
    StringBuffer sb = new StringBuffer();
   
       
   ```

   **说明** :  增加 sb 这个变量，如果需要对齐，则给 a、b、c 都要增加几个空格，在变量比较多的情况下，是一种累赘的事情。

4. 【推荐】方法体内的执行语句组、变量的定义语句组、不同的业务逻辑之间或者不同的语义之间插入一个空行。相同业务逻辑和语义之间不需要插入空行。
    **说明** :  没有必要插入多个空行进行隔开。

## 3. 扩展：速记Java开发中的各种O

> 最后，通过一张表和图快速对Java中的BO,DTO,DAO,PO,POJO,VO之间的含义，区别以及联系进行梳理。

| 名称 | 使用范围                                       | 解释说明                                                     |
| ---- | ---------------------------------------------- | ------------------------------------------------------------ |
| BO   | 用于Service,Manager,Business等业务相关类的命名 | Business Object业务处理对象，主要作用是把业务逻辑封装成一个对象。 |
| DTO  | 经过加工后的PO对象，其内部属性可能增加或减少   | Data Transfer Object数据传输对象，主要用于远程调用等需要大量传输数据的地方，例如，可以将一个或多个PO类的部分或全部属性封装为DTO进行传输 |
| DAO  | 用于对数据库进行读写操作的类进行命名           | Data Access Object数据访问对象，主要用来封装对数据库的访问，通过DAO可以将POJO持久化为PO，也可以利用PO封装出VO和DTO |
| PO   | Bean,Entity等类的命名                          | Persistant Object持久化对象，数据库表中的数据在Java对象中的映射状态，可以简单的理解为一个PO对象即为数据库表中的一条记录 |
| POJO | POJO是DO/DTO/BO/VO的统称                       | Plain Ordinary Java Object 简单Java对象，它是一个简单的普通Java对象，禁止将类命名为XxxxPOJO |
| VO   | 通常是视图控制层和模板引擎之间传递的数据对象   | Value Object 值对象，主要用于视图层，视图控制器将视图层所需的属性封装成一个对象，然后用一个VO对象在视图控制器和视图之间进行数据传输。 |
| AO   | 应用层对象                                     | Application Object，在Web层与Service层之间抽象的复用对象模型，很少用。 |

下面将通过一张图来理解上述几种O之间相互转换的关系:

![image-20220901225551451](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901225551451.png)

## 参考文章

[**代码质量 - 统一风格：统一命名规范详解**](https://pdai.tech/md/develop/ut/dev-qt-code-style-2.html)