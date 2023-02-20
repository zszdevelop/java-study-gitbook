---
order: 60
category:
  - Test
---

# 单元测试 - IDEA下单元测试详解

> 工欲善其事必先利其器，我们在写单元测试一定要使用工具，这将能大幅度提升编码的效率。本文以IDEA为例，看看如何利用插件提升效率。

## 1. 场景准备

准备一个待测试的类, 其中还包含着错误。

```java
package tech.pdai.junit4.module;

public class Calculator {

    public int result = 0;

    /**
     * add.
     *
     * @param operand1 first param
     * @param operand2 second param
     * @return sum
     */
    public int add(int operand1, int operand2) {
        result = operand1 + operand2;
        return result;
    }

    public int subtract(int operand1, int operand2) {
        result = operand1 - operand2;
        return result;
    }

    public int multiple(int operand1, int operand2) {
        result = operand1 * operand2;
        for (; ; ) {                    //死循环
        }
    }

    public int divide(int operand1, int operand2) {
        result = operand1 / 0;
        return result;
    }

    public int getResult() {
        return this.result;
    }

}
```

## 2. 插件使用

### 2.1 自动生成单元测试

第一个插件，首推的是JunitGeneratorV2.0

![image-20220901210441494](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210441494.png)

设置默认采用Junit4

![image-20220901210524521](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210524521.png)

如有必要可以设置生成的模板

![image-20220901210553705](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210553705.png)

测试下

![image-20220901210619275](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210619275.png)

![image-20220901210637466](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210637466.png)

生成单元测试

![image-20220901210703509](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210703509.png)

补充完整代码

```java
package tech.pdai.junit4.module;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.*;

public class CalculatorTest {

    private static Calculator cal=new Calculator();

    @Before
    public void setUp() throws Exception {
        System.out.println("before");
    }

    @After
    public void tearDown() throws Exception {
        System.out.println("after");
    }

    @Test
    public void add() {
        cal.add(2,2);
        assertEquals(4,cal.getResult());
    }

    @Test
    public void subtract() {
        cal.subtract(4,2);
        assertEquals(2,cal.getResult());
    }

    @Ignore
    public void multiply() {
        fail("Not yet implemented");
    }

    @Test(timeout = 2000)
    public void divide() {
        for(;;);
    }

    @Test(expected = ArithmeticException.class)
    public void testDivideByZero(){
        cal.divide(4,0);
    }

}

```

执行结果

![image-20220901210749209](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210749209.png)

### 2.2 并行测试

在大量的单元测试时，如何提升测试的效率呢？肯定是并行，所以你可以用如下的插件

![image-20220901210830070](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210830070.png)

看下相关测试触发按钮和输出：

![image-20220901210853830](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210853830.png)

### 2.3 代码覆盖率

如何快速看本地代码测试覆盖率呢？

![image-20220901210915853](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210915853.png)

代码覆盖率

![image-20220901210940253](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210940253.png)

![image-20220901210954286](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901210954286.png)

### 2.4 Profile

- **CPU Profile**

Flame Graph

![image-20220901211027435](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901211027435.png)

Call Tree

![image-20220901211044053](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901211044053.png)

Method List

![image-20220901211101288](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901211101288.png)

- **Allocation Profile**

![image-20220901211126260](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220901211126260.png)

## 参考文章

[**单元测试 - IDEA下单元测试详解**](https://pdai.tech/md/develop/ut/dev-ut-x-junit-idea.html)