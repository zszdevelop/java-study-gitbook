# JMeter逻辑控制器

## 1. 简介

> Jmeter官网对逻辑控制器的解释是：“Logic Controllers determine the order in which Samplers are processed.”。

逻辑控制器可以**控制采样器(samplers)的执行顺序**。

由此可知，控制器需要和采样器一起使用，否则控制器就没有什么意义了。**放在控制器下面的所有的采样器都会当做一个整体，执行时也会一起被执行。**

JMeter逻辑控制器可以对元件的执行逻辑进行控制，除仅一次控制器外，其他可以嵌套别的种类的逻辑控制器。

## 2. 逻辑控制器分类

JMeter中的Logic Controller分为两类： 

- 控制测试计划**执行过程中节点的逻辑执行顺序**，

  如：Loop  Controller、If Controller等； 

- 对测试计划中的**脚本进行分组、方便JMeter统计执行结果以及进行脚本的运行时控制**等，

  如：Throughput Controller、Transaction Controller。

## 3. 预览逻辑控制器家族

首先我们来看一下JMeter的逻辑控制器，路径：线程组（用户）->添加->逻辑控制器（Logic Controller）；我们可以清楚地看到JMeter5中共有17个逻辑控制器，如下图所示：

![image-20220622134741975](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622134741975.png)

## 4.常用逻辑控制器详解

### 4.1 if Controller

在实际工作中，当使用Jmeter进行接口测试或者性能测试时，有时需要根据不同条件做不同的操作，为了解决这个问题，Jmeter提供了IF控制器。顾名思义，IF控制器实现了代码中IF的功能，通过判断表达式的True/False来判定是否执行相应的操作。通过条件判断下边的节点执行不执行。

1. 我们先来看看这个if Controller长得是啥样子，路径：**线程组 > 添加 > 逻辑控制器 > 如果 (if) 控制器**，如下图所示：

   ![image-20220622134857392](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622134857392.png)

2. 关键参数说明如下：

   - **Name：**名称，可以随意设置，甚至为空；

   - **Comments：**注释，可随意设置，可以为空。

   - **Expression (must evaluate to true or false) ：**表达式(值必须是true或false)，也就是说，在右边文本框中输入的条件值必须是true 或 false，（默认情况下）

   - **Interpret Condition as Variable Expression?：**默认勾选项，将条件解释为变量表达式（需要使用__jexl3 or __groovy 表达式）

   - **Evaluate for all children?：**条件作用于每个子项（具体理解会在后边实战篇列举例子说明），判断条件是否针对所有子节点，默认不勾选，只在if Controller的入口处判断一次。

   >1. 文本框上的黄色感叹号，就是提示你，建议采用__jexl3 or __groovy 表达式，以提高性能，也就是默认的方式。
   >
   >2. if 控制器 只能作用于其下的子项

#### 4.1.1 默认用法

1. 默认用法，就是采用__jexl3 or __groovy 表达式if 控制器下有一个 访问百度的 取样器，只有if条件满足时，才会执行该取样器。采用默认方式，将条件'zsz'=='zsz'，放入 __jexl3表达式中。如下图所示：

   ```
   ${__jexl3('zsz'=='zsz',)}
   ```

   

   ![image-20220622140146988](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622140146988.png)

2. 如果不知道表达式如何使用，可使用Jmeter 的函数助手，**函数助手图标 > 选择_jexl3 > 在值的输入框输入'zsz'=='zsz'  > 点击‘生成’ > 全选Ctrl+C复制 > Ctrl+V粘贴到表达式处** 如下图所示：

   ![image-20220622135619920](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622135619920.png)

3. 配置好以后，运行JMeter，选择HTML，然后查看结果树，如下图所示：		![image-20220622140254353](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622140254353.png)

#### 4.1.2直接输入条件

1. 直接输入只需要去掉 “**Interpret Condition as Variable Expression?**” 前面复选框，直接输入条件： **'zsz'=='zsz'** 。访问百度的首页的取样器将被执行。如下图所示：

   ![image-20220622140433258](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622140433258.png)

2. 配置好以后，运行JMeter，选择HTML，然后查看结果树，如下图所示：

   ![image-20220622140522289](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622140522289.png)

#### 4.1.3 条件中使用变量

我们在日常工作中在很多的测试场景下**，需要根据用户变量或者上一个取样器的返回值来进行条件判断，从而决定是否需要执行某一个的取样器**。

1. 首先我们新增一个用户变量：zszkey。条件：**zszkey** 的值为 **zsz** 的时候，才执行访问百度首页的取样器。如下图所示：

   用户变量及配置，如下图所示：

   ![image-20220622140730134](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622140730134.png)

2. IF Controller及配置，可以用表达式：

   ```
   '${zszkey}'=='zsz'
   ```

   如下图所示：

   ![image-20220622141150602](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622141150602.png)

#### 4.1.4 Evaluate for all children? 的用法

1. 在上面的小节中讲解和分享了在条件中如何使用变量，我们假设一种测试场景：如果 if 控制器下的取样器执行后，改变了该变量的值，if 控制器下 其后的取样器还会被继续执行吗？一起来看看下面的列子：

   ![image-20220622141407756](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622141407756.png)

2. 改变“zszkey”变量的值为“zsz01”，如下图所示：

   ```
   vars.put('zszkey','zsz01')
   ```

   ![image-20220622141849119](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622141849119.png)

3. JMeter执行过程的逻辑分析：

1.  if 控制器下 有 3 个取样器（百度，知乎，豆瓣），变量 zszkey 的初始值为 zsz，if 控制器的条件为：'${zszkey}'=='zsz'

2. 开始执行的时候满足条件，那么按理说应该执行 百度，知乎，豆瓣3个取样器，

3. 但是 **访问百度首页** 执行后，将 **zszkey** 的值变了 **zsz01**，已经不能满足 ：**'${zszkey}'=='zsz'** 条件。

4. 所以 **访问知乎** 这个取样器不会被执行。

   ![image-20220622142143256](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622142143256.png)

5. 如果这个时候，去掉  Evaluate for all children? 的勾选，会发生什么呢，大家可以自己动手试试。修改后记得点击“保存”。下边是的执行结果，如下下图所示：

   之前条件不通过后面的豆瓣就没有执行了。现在豆瓣继续执行

   ![image-20220622142615051](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622142615051.png)

另外，如果时字符串必须要用引号，变量都认为是字符串的形式

### 4.2 Transaction Controller

**事务响应时间是我们衡量业务性能的主要指标，事务控制器可以把其他节点下的取样器执行消耗时间累加在一起，便于统计**。同时对每一个取样器的执行时间进行统计。 　

如果事务控制器下的取样器有多个，只有当所有的取样器都运行成功，整个事务控制器定义的事物才算成功。 　

用于将Test Plan中的特定部分组织成一个Transaction，JMeter中Transaction的作用在于，可以针对Transaction统计其响应时间、吞吐量等。比如说，一个用户操作可能需要多个Sampler来模拟，此时使用Transaction Controller，可以更准确地得到该用户操作的性能指标，如响应时间等。这个时间包含该控制器范围内的所有处理时间，而不仅仅是采样器的。

这个就非常有用了。我们前面有提到过事务的概念，有时候我们不关心单个请求的响应时间，而是关心一组相关请求的整体响应时间，怎么来统计呢？就需要借助事务这个概念，把这组请求，放到一个事务控制器下面。

1. 我们先来看看这个Transaction Controller长得是啥样子，路径：**线程组 > 添加 > 逻辑控制器 > 事务控制器**，如下图所示：

   ![image-20220622143034887](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622143034887.png)

2. 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **generate parent sample：**选择是否生成一个父取样器；

- **include duration of timer and pre-post processors in generated samle：**是否包含定时器，选择将在取样器前与后加上延时。（宏哥建议大家不要勾选，否则统计就比较麻烦了，还需要你扣除延时）

#### 4.2.1 generate parent sample用法

##### 4.2.1.1 实例一：分开统计

列举一个测试场景：我们需要了解 访问百度首页，搜索jmeter关键词 这两个请求的单个请求的响应时间，那么就来看看如下实例。

1. 单个请求，那么不勾选generate parent sample，如下图所示：

   ![image-20220622143556321](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622143556321.png)

2. 运行JMeter，查看聚合报告的单个请求的响应时间，如下图所示：

   ![image-20220622143707200](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622143707200.png)

##### 4.2.1.2 实例一：聚合统计

再列举一个测试场景：我们需要了解 访问百度首页  访问百度搜索jmeter这两个请求作为一组请求的响应时间，那么就来看看如下实例。

1. 一组请求，那么勾选generate parent sample，如下图所示：

   ![image-20220622143825684](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622143825684.png)

2. 运行JMeter，查看聚合报告的一组请求的响应时间，如下图所示：

   ![image-20220622143858396](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622143858396.png)

### 4.3 Loop Controller

循环控制器可以控制在其节点下的元件的执行次数，可以是具体数字，也可以是变量。

1. 我们先来看看这个Loop Controller长得是啥样子，默认循环一次。路径：**线程组 > 添加 > 逻辑控制器 > 循环控制器**，如下图所示：

   ![image-20220622144029235](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622144029235.png)

2. 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **Forever：**勾选上这一项表示一直循环下去。

> **注意：敲黑板，敲脑壳！！！** 
>
> 如果同时设置了线程组的循环次数和循环控制器的循环次数，那**循环控制器的子节点运行的次数为两个数值相乘的结果**。

##### 4.3.1 Thread Group和循环控制器的区别

现在准备两个请求，设置线程组1个线程，5次loop，下边有一个请求：**访问百度首页**  一个Loop Controller（设置2次loop），下边有一个请求：**访问博客园首页**  

1. 线程组，如下图所示：

   ![image-20220622144251550](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622144251550.png)

2. 循环控制器，如下图所示：

   ![image-20220622144550864](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622144550864.png)

3. 运行JMeter，查看结果树，为了清楚地看出结果，将第一个请求故意配置成失败的；如下图所示：

   ![image-20220622144613462](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622144613462.png)

从上边的结果可以看出：

- 如果同时设置了线程组的循环次数和循环控制器的循环次数，那循环控制器的子节点运行的次数为两个数值相乘的结果。

- 运行顺序是：先执行线程组里的循环，再执行循环控制器里的循环。

### 4.4 While Controller

While条件控制器，其节点下的元件将一直运行直到While 条件为false。

1. 我们先来看看这个While Controller长得是啥样子，默认循环一次。路径：**线程组 > 添加 > 逻辑控制器 > While控制器**，如下图所示：

   ![image-20220622144731040](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622144731040.png)

2. 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **Condition：**接受变量表达式与变量。条件为 Flase 的时候，才会跳出 While 循环，否则一直执行 While 控制器下的元件。

3. While控制器提供三个常量

- Blank：当循环中最后一个取样器失败后停止

- LAST：当循换前有取样器失败，不进入循环

- Otherwise：当判断条件为false时，停止循环

##### 4.4.1Blank

1. 不填（空）：当 While 控制器下**最后一个**样例执行失败后 跳出循环，如下图所示：

   ![image-20220622144931238](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622144931238.png)

2. 运行JMeter，查看结果树，（你可以通过鼠标拖动最后失败的取样器，移动到第一个或者第二个位置的时候，运行JMeter后，会发现在一直运行）；如下图所示：(没理解)

   ![image-20220622145252566](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145252566.png)

##### 4.4.2 LAST

LAST ：当 While 控制器下**最后一个**样例执行失败后 跳出循环，**如果 While 控制器 前一个样例执行失败，则不会进入While循环，也就是不会执行While控制器下的样例。**

1. 取样器树还是上边的位置和顺序。这次我们在While控制器表达式处填写：LAST，如下图所示：

   ![image-20220622145355098](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145355098.png)

2. 运行JMeter，查看结果树，（你可以通过鼠标拖动最后失败的取样器，移动到第一个或者第二个位置的时候，运行JMeter后，会发现在一直运行）；细心的你**可以发现循环只跑一遍**

   ![image-20220622145424566](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145424566.png)

3. 但是输入LAST的时候，还会出现一个结果，那就是：如果While 控制器 的前一个样例执行失败，则不会进入While 控制器

   在While 控制器 前面 添加两个取样器：取样器1 **访问百度**，取样器2 **访问北京宏哥** 使取样器2 **访问北京宏哥** 执行失败。取样器2必须在While控制器前边且执行失败。如下图所示：

   ![image-20220622145551396](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145551396.png)

4. 运行JMeter，查看结果树，执行结果发现，取样器1、取样器2 执行了，但没有进入While 控制器，如下图所示：

   ![image-20220622145612368](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145612368.png)

##### 4.4.3 Otherwise

自定义条件：值为True 或 False的函数/变量/属性 表达式；类似前边讲解的IF控制器，宏哥这里就照猫画虎的举个例子。

1. 用户自定义变量，变量名：北京宏哥，变量值：true，如下图所示：

   ![image-20220622145637666](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145637666.png)

2. While控制器配置，取到变量的值：${北京宏哥}，填写到表达式的地方，如下图所示： 

   ![image-20220622145653128](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145653128.png)

3. JMeter执行过程的逻辑分析：

（1）北京宏哥用户（线程组）下 有 1 个用户自定义变量，变量 **北京宏哥** 的值为 **true**，While控制器的条件为：**${北京宏哥}** 取到的值始终是 **true**。

（2）所以一旦开始执行始终满足条件，那么按理说就应该一直执行 **访问博客园首页** 、**访问北京宏哥的博客园首页**、**访问宏哥的JMeter系列文章** 3个取样器，

4. 运行JMeter，查看结果树，（运行JMeter后，会发现在一直运行），对比一下，与宏哥的分析是不是高度一致哈；如下图所示：

![image-20220622145712398](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622145712398.png)

### 4.5 Once Only Controller

在每个线程内，**该控制器下的内容只会被执行一遍，无论循环多少次，都只执行一遍。**

> 嵌套在循环控制器之内时是个例外，每个线程组循环都会被执行一遍

此控制器通常用于控制需要登录的请求，测试过程中，我们往往都只需要登录一次，获取到对应的登录信息后即可执行后续相关的请求，而不是每执行一个请求都登录一次，如将login请求放入仅一次控制器，则在线程组循环运行期间，不论循环次数设置为多少次，login请求都将仅在第一次执行时运行

1. 我们先来看看这个Once Only Controller长得是啥样子，路径：**线程组 > 添加 > 逻辑控制器 > 仅一次控制器**，如下图所示：

   ![image-20220622150049842](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622150049842.png)

2. 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空。

##### 4.2.1 实例

测试场景：正常逻辑我们需要先登录系统，在做其他功能的测试

1. 按照上边的测试场景，添加测试脚本，如下图所示：

![image-20220622150418979](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622150418979.png)

2. 配置好以后，点击“保存”，运行JMeter，然后查看结果树（ 从结果可以看出，一次登录然后多次查询列表；而不是查询一次就需要登录一次），如下图所示：

![image-20220622150716268](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622150716268.png)

## 参考文章

[Jmeter(九) - 从入门到精通 - JMeter逻辑控制器 - 上篇（详解教程）](https://cloud.tencent.com/developer/article/1645549)