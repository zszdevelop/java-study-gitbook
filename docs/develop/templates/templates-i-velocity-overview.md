# 模板引擎Velocity入门

## 1. 简介

Velocity是一个基于java的模板引擎（template engine）。它允许任何人仅仅简单的使用模板语言（template language）来引用由java代码定义的对象。

### 1.1 应用领域

1. web开发领域

   当Velocity应用于web开发时，界面设计人员可以和java程序开发人员同步开发一个遵循MVC架构的web站点，也就是说，页面设计人员可以只 关注页面的显示效果，而由java程序开发人员关注业务逻辑编码。Velocity将java代码从web页面中分离出来，这样为web站点的长期维护提 供了便利，同时也为我们在JSP和PHP之外又提供了一种可选的方案。

2. 模板工具

   它可以从模板（template）产生SQL和PostScript、XML，它也可以被**当作一个独立工具来产生源代码和报告**，或者作为其他系统的集成组件使用。

## 2. 集成使用

### 2.1 pom依赖

```xml
<dependency>
  <groupId>org.apache.velocity</groupId>
  <artifactId>velocity</artifactId>
  <version>1.7</version>
</dependency>
```

### 2.2 **VelocityHelloWorld.java**

1. 初始化 Velocity 。
2. 创建一个上下文对象。
3. 添加你的数据对象到上下文。
4. 选择一个模板。
5. 将你的数据与模板合并，产生输出内容。

```java
public class VelocityHelloWorld {

    public static void main(String args[]) {
        /* 1.初始化 Velocity */
        VelocityEngine velocityEngine = new VelocityEngine();
        velocityEngine.setProperty(VelocityEngine.RESOURCE_LOADER, "file");
        velocityEngine.setProperty(VelocityEngine.FILE_RESOURCE_LOADER_PATH, "/Users/zsz/Project/demo/2021year/10yue/velocity-demo/src/main/resources");
      // 解决中文乱码问题	
        velocityEngine.setProperty(Velocity.INPUT_ENCODING, "UTF-8");
        velocityEngine.setProperty(Velocity.OUTPUT_ENCODING, "UTF-8");
        velocityEngine.init();

        /* 2.创建一个上下文对象 */
        VelocityContext context = new VelocityContext();

        /* 3.添加你的数据对象到上下文 */
        context.put("name", "zsz");
        context.put("project", "Velocity");

        /* 4.选择一个模板 */
        Template template = velocityEngine.getTemplate("templates/hello.vm");

        /* 5.将你的数据与模板合并，产生输出内容 */
        StringWriter sw = new StringWriter();
        template.merge(context, sw);
        System.out.println("final output:\n" + sw);
    }
}
```

### 2.3 **hello.vm**

在你的 resources (一般路径为`src/main/resources`) 目录下创建 `templates/helloVelocity.vm` 文件。

```
Hello World! The first velocity demo.
Name is $name.
Project is $project
```

### 2.4 输出

```
final output:
Hello World! The first velocity demo.
Name is zsz.
Project is Velocity
```

## 3. Velocity 语法

### 3.1 注释

单行注释

以 `##` 开头。

```velocity
## This is a single line comment.
```

多行注释

以 `#*` 开头，以 `*#` 结尾。

```velocity
#*
  Thus begins a multi-line comment. Online visitors won't
  see this text because the Velocity Templating Engine will
  ignore it.
*#
```

### 3.2 变量(Variables)

和我们所熟知的其他编程语言一样，Velocity 也可以在模板文件中有变量的概念。

变量以 `$` 开头，首字母必须是英文字母。变量允许的字符为以下几种类型：

- 字母(a .. z, A .. Z)
- 数字(0 .. 9)
- 连字符("-")
- 下划线("_")

有效范例：

```velocity
$foo
$mudSlinger
$mud-slinger
$mud_slinger
$mudSlinger1
```

#### 3.2.1 变量定义

可以使用 `#set` 来为变量定义。

```velocity
#set( $foo = "bar" )
```

### 3.3 属性(Properties)

属性以 `$` 开头，标识符间以 `.` 分隔。

有效范例：

```velocity
$customer.Address
$purchase.Total
```

### 3.4 函数(Methods)

有效范例：

```velocity
## 无参数
$customer.getAddress()
$purchase.getTotal()
## 单个参数
$page.setTitle( "My Home Page" )
## 参数列表
$person.setAttributes( ["Strange", "Weird", "Excited"] )
```

#### 3.4.1 Velocity 1.6 开始支持重载函数。

```velocity
$sun.setPlanets('Earth', 'Mars', 'Neptune')
$sun.setPlanets('Mercury')
$sun.setPlanets()
```

### 3.5 条件语句

条件语句必须以 `#if` 开始，以 `#end` 结尾。

用法与Java中的条件语句极其相似，看看例子就能懂。

```velocity
#if( $foo )
  <strong>Velocity!</strong>
#end
```

注意：Velocity中的 `==` 的语义与Java略有不同，其中 `==` 只能用于测试对象的相等性。在Velocity中，等效运算符可以用于直接比较数字，字符串或对象。当对象具有不同的类时，通过为每个对象调用 toString() 然后比较来获得字符串表示。

```velocity
#set ($foo = "north")
#set ($bar = "north")

#if( $foo == $bar )
    **Go North**
#elseif( $foo == "east" )
    **Go East**
#elseif( $bar == "south" )
    **Go South**
#else
    **Go West**
#end
```

Velocity 中的条件语句也可以使用与、或、非。

```velocity
#if( $foo && $bar )
    **This AND That**
#end
#if( $foo || $bar )
    **This OR That**
#end
#if( !$foo )
    **NOT that**
#end
```

### 3.6 循环

`#foreach` 用来控制一个循环语句。

`#foreach` 支持遍历一个 Vector、Hashtable 或 Array 对象。

```velocity
<ul>
#foreach( $key in $allProducts.keySet() )
    <li>Key: $key -> Value: $allProducts.get($key)</li>
#end
</ul>
```

可以使用 `#break` 跳出循环。`$foreach.count` 表示循环次数。

```velocity
## list first 5 customers only
#foreach( $customer in $customerList )
    #if( $foreach.count > 5 )
        #break
    #end
    $customer.Name
#end
```

### 3.7 宏

Velocity 中的宏可以理解为函数定义。定义的语法如下：

```bash
#macro(macroName arg1 arg2 …)
...
#end
```

调用这个宏的语法是：

```bash
#macroName(arg1 arg2 …)
```

这里的参数之间使用空格隔开，下面是定义和使用 Velocity 宏的例子：

```bash
#macro(sayHello $name)
hello $name
#end
#sayHello(“velocity”)
```

输出的结果为 hello velocity

### 3.8 #parse 和 #include

\#parse 和 #include 指令的功能都是在外部引用文件，而两者的区别是，#parse 会将引用的内容当成类似于源码文件，会将内容在引入的地方进行解析，#include 是将引入文件当成资源文件，会将引入内容原封不动地以文本输出。分别看以下例子：

foo.vm 文件：

```bash
#set($name =“velocity”)
```

parse.vm：

```css
#parse(“foo.vm”)
```

输出结果为：velocity

include.vm：

```cpp
#include(“foo.vm”)
```

输出结果为：#set($name =“velocity”)

## 参考文章

[模板引擎velocity](https://www.jianshu.com/p/378827f1dfc8)