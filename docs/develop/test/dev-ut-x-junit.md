---
order: 30
category:
  - Test

---

# 单元测试 - JUnit4 详解

> JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。本文主要针对Junit4要点进行梳理总结。

## 1. 什么是JUnit？

JUint是Java编程语言的单元测试框架，用于编写和运行可重复的自动化测试。

## 2.  JUnit特点？

JUnit 是一个开放的资源框架，用于编写和运行测试。

- 提供注解来识别测试方法。
- 提供断言来测试预期结果。
- JUnit 测试允许你编写代码更快，并能提高质量。
- JUnit 优雅简洁。没那么复杂，花费时间较少。
- JUnit测试可以自动运行并且检查自身结果并提供即时反馈。所以也没有必要人工梳理测试结果的报告。
- JUnit测试可以被组织为测试套件，包含测试用例，甚至其他的测试套件。
- JUnit在一个条中显示进度。如果运行良好则是绿色；如果运行失败，则变成红色。

## 3. 官方资料

> 最好的资料依然在Junit官方网站，以下我帮你总结下Junit相关的官方网址。

- 官网地址

https://junit.org/junit4/

- 官方入门文档

https://github.com/junit-team/junit4/wiki/Assertions

- 官方github

https://github.com/junit-team

## 4. 常用注解

- **@Test**

在junit3中，是通过对测试类和测试方法的命名来确定是否是测试，且所有的测试类必须继承junit的测试基类。在junit4中，定义一个测试方法变得简单很多，只需要在方法前加上@Test就行了。

注意：测试方法必须是public  void，即公共、无返回数据。可以抛出异常。

- **@Ignore**

有时候我们想暂时不运行某些测试方法\测试类，可以在方法前加上这个注解。在运行结果中，junit会统计忽略的用例数，来提醒你。但是不建议经常这么做，因为这样的坏处时，容易忘记去更新这些测试方法，导致代码不够干净，用例遗漏。使用此标注的时候不能与其它标注一起使用，如：和@Test 标注一起使用，那就没用了

- **@BeforeClass**

当我们运行几个有关联的用例时，可能会在数据准备或其它前期准备中执行一些相同的命令，这个时候为了让代码更清晰，更少冗余，可以将公用的部分提取出来，放在一个方法里，并为这个方法注解@BeforeClass。意思是在测试类里所有用例运行之前，运行一次这个方法。例如创建数据库连接、读取文件等。

注意：方法名可以任意，但必须是public static void，即公开、静态、无返回。这个方法只会运行一次。

- **@AfterClass**

跟@BeforeClass对应，在测试类里所有用例运行之后，运行一次。用于处理一些测试后续工作，例如清理数据，恢复现场。

注意：同样必须是public static void，即公开、静态、无返回。这个方法只会运行一次。

- **@Before**

与@BeforeClass的区别在于，@Before不止运行一次，它会在每个用例运行之前都运行一次。主要用于一些独立于用例之间的准备工作。

比如两个用例都需要读取数据库里的用户A信息，但第一个用例会删除这个用户A，而第二个用例需要修改用户A。那么可以用@BeforeClass创建数据库连接。用@Before来插入一条用户A信息。

注意：必须是public void，不能为static。不止运行一次，根据用例数而定。

- **@After**：与@Before对应。
- **@Runwith**
  - 首先要分清几个概念：测试方法、测试类、测试集、测试运行器。
  - 其中测试方法就是用@Test注解的一些函数。
  - 测试类是包含一个或多个测试方法的一个Test.java文件。
  - 测试集是一个suite，可能包含多个测试类。
  - 测试运行器则决定了用什么方式偏好去运行这些测试集/类/方法。
  - 而@Runwith就是放在测试类名之前，用来确定这个类怎么运行的。也可以不标注，会使用默认运行器。常见的运行器有：
    - @RunWith(Parameterized.class) 参数化运行器，配合@Parameters使用junit的参数化功能
    - @RunWith(Suite.class) @SuiteClasses({ATest.class,BTest.class,CTest.class})测试集运行器配合使用测试集功能
    - @RunWith(JUnit4.class) junit4的默认运行器
    - @RunWith(JUnit38ClassRunner.class) 用于兼容junit3.8的运行器
    - 一些其它运行器具备更多功能。例如@RunWith(SpringJUnit4ClassRunner.class)集成了spring的一些功能
- **@Parameters**： 用于使用参数化功能。

## 5. 编写单元测试

> 接下来，我们开始学习JUnit4单元测试实例:

### 5.1 Maven包引入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>java-junit4</artifactId>
    <version>1.0-SNAPSHOT</version>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

### 5.2 测试:Hello World

```java
package tech.pdai.junit4;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Hello world test.
 *
 */
public class HelloWorldTest {

    @Test
    public void firstTest() {
        assertEquals(2, 1 + 1);
    }
}
```

执行结果

![image-20220831214552642](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831214552642.png)

@Test注解在方法上标记方法为测试方法，以便构建工具和 IDE 能够识别并执行它们。JUnit 4 需要测试方法为public，这和Junit 5 有差别。

### 5.3 测试:生命周期

- **@BeforeClass**注解修饰的方法(该方法要用static修饰)会在所有方法运行前被执行，且只执行一次，通常用来为后面测试方法的准备工作，如加载配置、进行数据库的连接等。父类的@BeforeClass注解方法会在子类的@BeforeClass注解方法执行前执行。
- **@Before**注解修饰的方法会在每个测试方法执行前执行一次,父类@Before修饰的方法会在子类@Before修饰的方法执行前 执行
- **@After**注解修饰的方法会在每个测试方法执行后执行一次,父类@After修饰的方法会在子类@After修饰的方法执行后执行。
- **@AfterClass**注解修饰的方法(该方法要用static修饰)会在所有方法执行结束后执行一次，且也只执行一次，通常用来对资源进行释放，比如数据库连接的关闭等，无论测试用例里的其他方法有没有抛出异常，该方法最终都会被执行。而且父类中的被@AfterClass注解方法修饰的方法会在子类的@AfterClass注解修饰的方法执行之后才会被执行。

```java
package tech.pdai.junit4;

import org.junit.*;

/**
 * Standard Test.
 */
public class StandardTest {

    @BeforeClass
    public static void beforeClass() {
        System.out.println("in before class");
    }

    @AfterClass
    public static void afterClass() {
        System.out.println("in after class");
    }

    @Before
    public void before() {
        System.out.println("in before");
    }

    @After
    public void after() {
        System.out.println("in after");
    }

    @Test
    public void testCase1() {
        System.out.println("in test case 1");
    }

    @Test
    public void testCase2() {
        System.out.println("in test case 2");
    }

}

```

执行结果

![image-20220831215023723](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831215023723.png)

### 5.4 测试:禁用测试

**@Ignore**：暂不执行该方法；

```java
package tech.pdai.junit4;

import org.junit.Ignore;
import org.junit.Test;

/**
 * Ignore Test.
 */
public class IgnoreTest {

    /**
     * ignore.
     */
    @Ignore
    @Test
    public void ignoreTest(){
        System.out.println("ignore test");
    }
}
```

执行结果

![image-20220831215116619](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831215116619.png)

### 5.5 测试:断言测试

- **断言测试注解有哪些**

| 断言                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| void assertEquals([String message],expected value,actual value) | 断言两个值相等。值类型可能是int，short，long，byte，char，Object，第一个参数是一个可选字符串消息 |
| void assertTrue([String message],boolean condition)          | 断言一个条件为真                                             |
| void assertFalse([String message],boolean condition)         | 断言一个条件为假                                             |
| void assertNotNull([String message],java.lang.Object object) | 断言一个对象不为空（null）                                   |
| void assertNull([String message],java.lang.Object object)    | 断言一个对象为空（null）                                     |
| void assertSame([String message],java.lang.Object expected,java.lang.Object actual) | 断言两个对象引用相同的对象                                   |
| void assertNotSame([String message],java.lang.Object unexpected,java.lang.Object actual) | 断言两个对象不是引用同一个对象                               |
| void assertArrayEquals([String message],expectedArray,resultArray) | 断言预期数组和结果数组相等，数组类型可能是int，short，long，byte，char，Object |

- **简单测试**

```java
package tech.pdai.junit4;

import org.junit.Assert;
import org.junit.Test;

/**
 * Assertion Test.
 */
public class AssertionTest {

    @Test
    public void test() {
        String obj1 = "junit";
        String obj2 = "junit";
        String obj3 = "test";
        String obj4 = "test";
        String obj5 = null;

        int var1 = 1;
        int var2 = 2;

        int[] array1 = {1, 2, 3};
        int[] array2 = {1, 2, 3};

        Assert.assertEquals(obj1, obj2);

        Assert.assertSame(obj3, obj4);
        Assert.assertNotSame(obj2, obj4);

        Assert.assertNotNull(obj1);
        Assert.assertNull(obj5);

        Assert.assertTrue(var1 < var2);
        Assert.assertFalse(var1 > var2);

        Assert.assertArrayEquals(array1, array2);

    }
}

```

在以上类中我们可以看到，这些断言方法是可以工作的。

- assertEquals() 如果比较的两个对象是相等的，此方法将正常返回；否则失败显示在JUnit的窗口测试将中止。
- assertSame() 和 assertNotSame() 方法测试两个对象引用指向完全相同的对象。
- assertNull() 和 assertNotNull() 方法测试一个变量是否为空或不为空(null)。
- assertTrue() 和 assertFalse() 方法测试if条件或变量是true还是false。
- assertArrayEquals() 将比较两个数组，如果它们相等，则该方法将继续进行不会发出错误。否则失败将显示在JUnit窗口和中止测试。
- **更多测试，来自官网**https://github.com/junit-team/junit4/wiki/Assertions

```java
package tech.pdai.junit4;

import org.hamcrest.core.CombinableMatcher;
import org.junit.Test;

import java.util.Arrays;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

/**
 * More Assertion Test from Junit-Team.
 */
public class Assertion2Test {

    @Test
    public void testAssertArrayEquals() {
        byte[] expected = "trial".getBytes();
        byte[] actual = "trial".getBytes();
        assertArrayEquals("failure - byte arrays not same", expected, actual);
    }

    @Test
    public void testAssertEquals() {
        assertEquals("failure - strings are not equal", "text", "text");
    }

    @Test
    public void testAssertFalse() {
        assertFalse("failure - should be false", false);
    }

    @Test
    public void testAssertNotNull() {
        assertNotNull("should not be null", new Object());
    }

    @Test
    public void testAssertNotSame() {
        assertNotSame("should not be same Object", new Object(), new Object());
    }

    @Test
    public void testAssertNull() {
        assertNull("should be null", null);
    }

    @Test
    public void testAssertSame() {
        Integer aNumber = Integer.valueOf(768);
        assertSame("should be same", aNumber, aNumber);
    }

    // JUnit Matchers assertThat
    @Test
    public void testAssertThatBothContainsString() {
        assertThat("albumen", both(containsString("a")).and(containsString("b")));
    }

    @Test
    public void testAssertThatHasItems() {
        assertThat(Arrays.asList("one", "two", "three"), hasItems("one", "three"));
    }

    @Test
    public void testAssertThatEveryItemContainsString() {
        assertThat(Arrays.asList(new String[]{"fun", "ban", "net"}), everyItem(containsString("n")));
    }

    // Core Hamcrest Matchers with assertThat
    @Test
    public void testAssertThatHamcrestCoreMatchers() {
        assertThat("good", allOf(equalTo("good"), startsWith("good")));
        assertThat("good", not(allOf(equalTo("bad"), equalTo("good"))));
        assertThat("good", anyOf(equalTo("bad"), equalTo("good")));
        assertThat(7, not(CombinableMatcher.<Integer>either(equalTo(3)).or(equalTo(4))));
        assertThat(new Object(), not(sameInstance(new Object())));
    }

    @Test
    public void testAssertTrue() {
        assertTrue("failure - should be true", true);
    }
}
```

执行结果

![image-20220831215444837](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831215444837.png)

### 5.6 测试:异常测试

Junit 用代码处理提供了一个追踪异常的选项。你可以测试代码是否它抛出了想要得到的异常。expected 参数和 @Test 注释一起使用。现在让我们看看 @Test(expected):

```java
package tech.pdai.junit4;

import org.junit.Test;

/**
 * Exception Test.
 */
public class ExceptionTest {

    @Test(expected = ArithmeticException.class)
    public void exceptionTest() {
        System.out.println("in exception success test");
        int a = 0;
        int b = 1 / a;
    }

    @Test(expected = NullPointerException.class)
    public void exceptionFailTest() {
        System.out.println("in exception fail test");
        int a = 0;
        int b = 1 / a;
    }
}
```

执行结果

![image-20220831215613241](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831215613241.png)

观察错误的信息：

```java
in exception success test
in exception fail test

java.lang.Exception: Unexpected exception, expected<java.lang.NullPointerException> but was<java.lang.ArithmeticException>

	at org.junit.internal.runners.statements.ExpectException.evaluate(ExpectException.java:28)
	at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)
	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:78)
	at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:57)
	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)
	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)
	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)
	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)
	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)
	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)
	at org.junit.runner.JUnitCore.run(JUnitCore.java:137)
	at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:68)
	at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:33)
	at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:230)
	at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:58)
Caused by: java.lang.ArithmeticException: / by zero
	at tech.pdai.junit4.ExceptionTest.exceptionFailTest(ExceptionTest.java:21)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)
	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)
	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)
	at org.junit.internal.runners.statements.ExpectException.evaluate(ExpectException.java:19)
	... 14 more
```

### 5.7 测试:时间测试

JUnit提供了一个暂停的方便选项，如果一个测试用例比起指定的毫秒数花费了更多的时间，那么JUnit将自动将它标记为失败，timeout参数和@Test注解一起使用，例如@Test(timeout=1000)。

- **简单例子**

```java
package tech.pdai.junit4;

import org.junit.Test;

import java.util.concurrent.TimeUnit;

/**
 * Timeout Test.
 */
public class TimeoutTest {

    @Test(timeout = 1000)
    public void testCase1() throws InterruptedException {
        TimeUnit.SECONDS.sleep(5000);
        System.out.println("in timeout exception");
    }
} 
```

执行结果

![image-20220831215749198](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831215749198.png)

观察错误的信息：

```java
org.junit.runners.model.TestTimedOutException: test timed out after 1000 milliseconds

	at java.lang.Thread.sleep(Native Method)
	at java.lang.Thread.sleep(Thread.java:340)
	at java.util.concurrent.TimeUnit.sleep(TimeUnit.java:386)
	at tech.pdai.junit4.TimeoutTest.testCase1(TimeoutTest.java:14)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)
	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)
	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)
	at org.junit.internal.runners.statements.FailOnTimeout$CallableStatement.call(FailOnTimeout.java:298)
	at org.junit.internal.runners.statements.FailOnTimeout$CallableStatement.call(FailOnTimeout.java:292)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	at java.lang.Thread.run(Thread.java:748)
```

- **超时规则**

应用到测试类的所有测试用例

```java
package tech.pdai.junit4;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.Timeout;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * Timeout Rule.
 */
public class HasGlobalTimeoutTest {

    public static String log;

    private final CountDownLatch latch = new CountDownLatch(1);

    @Rule
    public Timeout globalTimeout = Timeout.seconds(10); // 10 seconds max per method tested

    @Test
    public void testSleepForTooLong() throws Exception {
        log += "ran1";
        TimeUnit.SECONDS.sleep(100); // sleep for 100 seconds
    }

    @Test
    public void testBlockForever() throws Exception {
        log += "ran2";
        latch.await(); // will block
    }
}
```

执行结果

![image-20220831220027821](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831220027821.png)

### 5.8 测试:参数化测试

Junit 4 引入了一个新的功能参数化测试。参数化测试允许开发人员使用不同的值反复运行同 一个测试。你将遵循 5 个步骤来创建参数化测试：

- 为准备使用参数化测试的测试类指定特殊的运行器 org.junit.runners.Parameterized。
- 为测试类声明几个变量，分别用于存放期望值和测试所用数据。
- 为测试类声明一个带有参数的公共构造函数，并在其中为第二个环节中声明的几个变量赋值。
- 为测试类声明一个使用注解 org.junit.runners.Parameterized.Parameters 修饰的，返回值为 java.util.Collection 的公共静态方法，并在此方法中初始化所有需要测试的参数对。
- 编写测试方法，使用定义的变量作为参数进行测试。

**什么是@RunWith**?

首先要分清几个概念：测试方法、测试类、测试集、测试运行器。

- 其中测试方法就是用@Test注解的一些函数。
- 测试类是包含一个或多个测试方法的一个**Test.java文件，
- 测试集是一个suite，可能包含多个测试类。
- 测试运行器则决定了用什么方式偏好去运行这些测试集/类/方法。

而@Runwith就是放在测试类名之前，用来确定这个类怎么运行的。也可以不标注，会使用默认运行器。**常见的运行器**有：

- @RunWith(Parameterized.class) 参数化运行器，配合@Parameters使用JUnit的参数化功能
- @RunWith(Suite.class) @SuiteClasses({ATest.class,BTest.class,CTest.class}) 测试集运行器配合使用测试集功能
- @RunWith(JUnit4.class)， junit4的默认运行器
- @RunWith(JUnit38ClassRunner.class)，用于兼容junit3.8的运行器 一些其它运行器具备更多功能。例如@RunWith(SpringJUnit4ClassRunner.class)集成了spring的一些功能
- **测试例子**

待测试类

```java
package tech.pdai.junit4;

/**
 * PrimeNumberChecker.
 */
public class PrimeNumberChecker {

    public Boolean validate(final Integer parimeNumber) {
        for (int i = 2; i < (parimeNumber / 2); i++) {
            if (parimeNumber % i == 0) {
                return false;
            }
        }
        return true;
    }
}

```

测试类

```java
package tech.pdai.junit4;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

/**
 * Parameterized Test.
 *
 */
@RunWith(Parameterized.class) // 步骤一: 指定定参数运行器
public class PrimeNumberCheckerTest {

    /**
     * 步骤二：声明变量
     */
    private Integer inputNumber;
    private Boolean expectedResult;
    private PrimeNumberChecker primeNumberChecker;

    /**
     * 步骤三：为测试类声明一个带有参数的公共构造函数，为变量赋值
     */
    public PrimeNumberCheckerTest(Integer inputNumber,
                                  Boolean expectedResult) {
        this.inputNumber = inputNumber;
        this.expectedResult = expectedResult;
    }

    /**
     * 步骤四：为测试类声明一个使用注解 org.junit.runners.Parameterized.Parameters 修饰的，返回值为
     * java.util.Collection 的公共静态方法，并在此方法中初始化所有需要测试的参数对
     *   1）该方法必须由Parameters注解修饰
     2）该方法必须为public static的
     3）该方法必须返回Collection类型
     4）该方法的名字不做要求
     5）该方法没有参数
     */
    @Parameterized.Parameters
    public static Collection primeNumbers() {
        return Arrays.asList(new Object[][]{
                {2, true},
                {6, false},
                {19, true},
                {22, false},
                {23, true}
        });
    }

    @Before
    public void initialize() {
        primeNumberChecker = new PrimeNumberChecker();
    }

    /**
     * 步骤五：编写测试方法，使用自定义变量进行测试
     */
    @Test
    public void testPrimeNumberChecker() {
        System.out.println("Parameterized Number is : " + inputNumber);
        Assert.assertEquals(expectedResult,
                primeNumberChecker.validate(inputNumber));
    }
}

```

执行结果

![image-20220831220632173](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831220632173.png)

### 5.9 测试:套件测试

“套件测试”是指捆绑了几个单元测试用例并运行起来。在JUnit中，@RunWith 和 @Suite 这两个注解是用来运行套件测试。先来创建几个测试类

测试类1

```java
package tech.pdai.junit4.testsuite;

import org.junit.Test;

public class JunitTest1 {

    @Test
    public void printMessage(){
        System.out.println("in JunitTest1");
    }
}
```

测试类2

```java
package tech.pdai.junit4.testsuite;

import org.junit.Test;

public class JunitTest2 {

    @Test
    public void printMessage(){
        System.out.println("in JunitTest2");
    }
}
```

测试套件

```java
package tech.pdai.junit4.testsuite;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * Test suite.
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        /**
         * 此处类的配置顺序会影响执行顺序
         */
        JunitTest1.class,
        JunitTest2.class
})
public class JunitSuiteTest {
}

```

执行结果

![image-20220831220802814](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831220802814.png)

### 5.10 测试:测试顺序

自定义测试方法的顺序，比如按照方法的名字顺序：

```java
package tech.pdai.junit4;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

/**
 * Order.
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestMethodOrder {

    @Test
    public void testA() {
        System.out.println("first");
    }

    @Test
    public void testC() {
        System.out.println("third");
    }

    @Test
    public void testB() {
        System.out.println("second");
    }
}
```

执行结果

![image-20220831220905525](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220831220905525.png)

## 参考文章

[**单元测试 - JUnit4 详解**](https://pdai.tech/md/develop/ut/dev-ut-x-junit.html)