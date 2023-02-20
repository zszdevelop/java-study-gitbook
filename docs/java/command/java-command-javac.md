# Java编译

## 1. 简介

IDE或maven等工具已将Java程序的编译代劳。但工具越高级，隐藏的细节就越多，一旦出现问题就懵逼，归根到底还是基础概念不牢靠。返璞归真，回到最原始的地方`javac`，会让问题豁然开朗。下面就一步一步演示用`javac`和`java`徒手编译运行一个常规工程。

## 2. Hello World练个手

来个简单的先，我们祭出祖传的HelloWorld程序。（感兴趣的话，可以试一试徒手是否写的出来~）

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("Hello, World!");
    }
}
```

写完后，保存为：`HelloWorld.java`，然后在当前目录执行`javac`编译命令：

```text
javac HelloWorld.java
```

查看**当前目录**（更准确的说是java文件同级目录），果然生成了`HelloWorld.class`：

```bash
(base) ➜  test ls
HelloWorld.class HelloWorld.java
```

继续在**当前目录运行**`java`命令，正确打印出Hello, World!

```text
maoshuai@ms:~/javaLinux/w1$ java HelloWorld 
Hello, World!
```

老司机，稳！看起来很简单嘛：先`javac`再`java`。

![image-20220428163059164](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428163059164.png)

### 2.1 容易犯的错

- 执行class 或.java 文件

虽然简单，但新手通常会犯的一个错：想象成去**执行**`.class`文件，比如写成这样，自然会报错：

![image-20220428163045920](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428163045920.png)

## 3. 带包名

一切都很顺利，但没有包名是不专业的，所以我们加一个牛逼的包`package com.zszdevelop;`：

```java
package com.zszdevelop;

public class HelloWorld{
    public static void main(String[] args){
        System.out.println("Hello, World!");
    }
}
```

还是一样用`javac`编译，查看**当前目录**下`HelloWorld.class`生成了，很顺利。

还是一样用`java`命令，瞬间被打脸：

![image-20220428163506356](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428163506356.png)

想了想，**HelloWorld已经有自己的包名了，所以它的名字不在是没有姓氏**的`HelloWorld`，新名字叫`com.zszdevelop.HelloWorld`，那么传给`java`自然要用新名字，再试一试：

![image-20220428163605539](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428163605539.png)

还是被打脸，这时候老司机告诉你，创建一个`com.zszdevelop`目录，然后把`HelloWorld.class`放进来，执行：

```bash
(base) ➜  test mkdir -p com/zszdevelop
(base) ➜  test mv HelloWorld.class com/zszdevelop
(base) ➜  test ls
HelloWorld.java com
(base) ➜  test java com.zszdevelop.HelloWorld
Hello, World!
```

![image-20220428163804684](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428163804684.png)

果然，正常打印出了Hello, World!

**上面的步骤，说明了两点：**

1. 增加了package名，所以class名也变了，行不改名坐不改姓，自然要带上姓（即所谓全限定名）。
2. Java **会根据包名对应出目录结构，并从class path搜索该目录去找class文件**。由于默认的class path是当前目录，所以`com.zszdevelop.HelloWorld`必须存储在`./com/zszdevelop/HelloWorld.class`

当然每次自己创建包路径的目录太麻烦。**`-d`参数可以代劳上面的工作**：

```bash
(base) ➜  test javac -d . HelloWorld.java
(base) ➜  test ls
HelloWorld.java com
(base) ➜  test java com.zszdevelop.HelloWorld
Hello, World!
```

`-d`指定了生成class文件的根目录（这里用的是当前目录），并且会根据class的包路径创建子目录。

## 4. 编译两个有依赖关系的class

包名解决了，我们再复杂些，搞个依赖调用。首先，我们抽取一个`HelloService`：

```java
package com.zszdevelop;
public class HelloService{
    public void printHello(String name){
        System.out.println("HelloService, " + name + "!");
    }
}
```

然后修改`HelloWorld.java`，调用`HelloService`完成say hello：

```java
package com.zszdevelop;

public class HelloWorld{
    public static void main(String[] args){
        HelloService service = new HelloService();
        service.printHello("World");
    }
}
```

接着我们依次编译：`HelloService.java`和`HelloWorld.java`，最后运行：

```bash
(base) ➜  test javac -d . HelloService.java
(base) ➜  test javac -d . HelloWorld.java
(base) ➜  test ls
HelloService.java HelloWorld.java   com
(base) ➜  test java com.zszdevelop.HelloWorld
HelloService, World!
```

![image-20220428164924047](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428164924047.png)

直觉上，要先编译`HelloService.java`，这是对的。那如果先编译`HelloWorld.java`呢？当然是打脸：

![image-20220428164950212](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428164950212.png)

如果编译的时候，还要根据依赖关系确定顺序，太low了吧。我觉得`java`命令应该能自动解决它，一次性将两个java文件传给它试一试：

```bash
(base) ➜  test javac -d . HelloWorld.java HelloService.java
(base) ➜  test LS
HelloService.java	HelloWorld.java		com
(base) ➜  test java com.zszdevelop.HelloWorld
HelloService, World!
```



![image-20220428165035879](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428165035879.png)

牛逼，它自动解决了顺序问题，赞一个（虽然我不怀好意的将`HelloWorld.java`放到了前面）！

## 5. 使用src和target目录

从上面的例子可以看出，虽然class文件必须放在包名一致的目录里，**但java源文件并没有这个要求**。不过，为了管理方便，我们将java源文件也放在包结构目录里：

```bash
(base) ➜  test  mkdir -p com/zszdevelop
(base) ➜  test mv *.java com/zszdevelop/
(base) ➜  test  ls com/zszdevelop/
HelloService.java HelloWorld.java
(base) ➜  test  javac -d . com/zszdevelop/*.java
(base) ➜  test ls com/zszdevelop/
HelloService.class HelloService.java  HelloWorld.class   HelloWorld.java
(base) ➜  test java com.zszdevelop.HelloWorld
HelloService, World!
```

![image-20220428165610980](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428165610980.png)

编译时`javac`要传入新的java文件路径（这里用了通配符），其他也没有什么不同。可以看到**class文件生成到了与java文件相同的目录里**。class文件和java源文件放在一起，很不清爽，能否像IDE里那样：java文件放到src目录，class文件放到target目录？下面我试一试。

先创建src和target目录，并将原来的java文件都移动到src目录：

```bash
(base) ➜  test mkdir src
(base) ➜  test mkdir target
(base) ➜  test mv com src

(base) ➜  test ls
src    target
```

![image-20220428165943655](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428165943655.png)

然后编译，`-d`参数指定到target目录：

```bash
(base) ➜  test javac -d target src/com/zszdevelop/*.java
(base) ➜  test ls target/com/zszdevelop/
HelloService.class HelloWorld.class
```

![image-20220428170120215](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428170120215.png)

怎么运行呢？直接在当前目录运行是不行了，毕竟多了一层target目录，进入target目录运行，妥妥的：

```
(base) ➜  test cd target
(base) ➜  target java com.zszdevelop.HelloWorld
HelloService, World!
```

![image-20220428170206636](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428170206636.png)

除了进入`target`目录以外，更常用的方法是通过`-classpath`（或简写为`-cp`）选项设置**类路径**：

```bash
(base) ➜  test java -cp target com.zszdevelop.HelloWorld
HelloService, World!
```

![image-20220428170320183](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428170320183.png)

## 6. 类路径CLASSPATH

上面演示了通过`-cp`设置类路径。下面再进一步研究一下类路径。

类路径，是JRE搜索用户级class文件或其他资源的路径，`javac`或`java`等工具都可以指定类路径。如果没有设置，默认的类路径就是当前目录。**但如果设置了类路径，默认值就被覆盖了，所以如果想保留当前目录为类路径，需要同时将`.`加入**，有点像默认构造函数的感觉。

类路径，可以通过环境变量`CLASSPATH`或`-cp`参数设置，后者会覆盖前者。推荐通过`-cp`设置，它只会影响当前进程。

类路径类似操作系统里的`path`概念，不过它是java工具搜索class文件的路径。同样的，类路径可以是多个，并通过分号分隔：

```text
export CLASSPATH=path1:path2:...
```

或者：

```text
sdkTool -classpath path1:path2:...
```

sdkTool可以是 java, javac, javadoc等。

类路径不仅可以是目录，还也可以是jar包或zip包。

类路径的设置是有顺序的，java会优先在靠前的类路径里搜索。这一点和操作系统的`path`类似。

类路径可以用通配符`*`匹配jar或zip，但：

1. 通配符只匹配jar或zip，比如path/*只是将下面的jar或zip加入类路径，但path本身不加入类路径。
2. 通配符不递归搜索，即指匹配第一层目录下的jar或zip。
3. 通配符匹配到的jar或zip，加入到classpath的顺序是不确定的。因此，更稳妥的做法是显示的枚举所有jar或zip。
4. 通配符适用于`CLASSPATH`变量或`-cp`参数，但不适用于jar包的manifest文件。

## 7.  Javac

javac的语法如下：

```text
javac [ options ] [ sourcefiles ] [ classes] [ @argfiles ]
```

- options：是一些参数，比如-cp，-d
- sourcefiles：就是编译的java文件，如`HelloWorld.java`，可以是多个，并用空格隔开
- classes：用来处理处理注解。暂时没搞懂怎么用
- @argfiles，就是包含option或java文件列表的文件路径，用@符号开头，就像上面的@javaOptions.txt和@javaFiles.txt

## 参考文章

[第1期：抛开IDE，了解一下javac如何编译](https://zhuanlan.zhihu.com/p/74229762)