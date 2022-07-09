# JMeter断言

## 1. 简介

断言组件用来对服务器的响应数据做验证，常用的断言是响应断言，其支持正则表达式。虽然我们的通过响应断言能够完成绝大多数的结果验证工作，但是JMeter还是为我们提供了适合多个场景的断言元件，辅助我们来更好的完成结果验证工作。在使用JMeter进行性能测试或者接口自动化测试工作中，经常会用到的一个功能，就是断言，**断言相当于检查点，它是用来判断系统返回的响应结果是否正确，以此帮我们判断测试是否通过**。

## 2. 预览断言

![image-20220630140754410](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630140754410.png)

## 3.常用断言详解

### 3.1 响应断言

响应断言，判断返回消息中的内容。响应断言是最常用的一种断言方法，它可以对各种返回类型的结果进行断言，比如Test、html、application/json等

#### 3.1.1 初识

我们先来看看这个 **响应断言** 长得是啥样子，路径：**线程组 > 添加 > 断言 > 响应断言**，如下图所示： 

![image-20220630140923526](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630140923526.png)

#### 3.1.2 关键参数说明如下：

- **名称：**控制器的描述性名称，显示在左边节点上，并用于命名事务 

- **注释：**控制器注释信息，非必填项 

- **APPly to:**选项默认即可，Main sample only(仅作用于父节点取样器)

 Main sample and sub-samples:作用于父节点取样器及对应子节点取样器

​         Main sample only：仅作用于父节点取样器

​         Sub-samples only:仅作用于子节点取样器

 JMeter Variable Name to use:作用于jmeter变量(输入框内可输入jmeter的变量名称)

- **要测试的响应字段**

  - 响应文本

    服务器响应文本，一般情况下，我们都是勾选改选项，用于验证服务器返回值。

  - Document（text）

    通过 Apache Tika 从各种的文档中提取的文本进行验证，包括响应文本，pdf、word 等等各种格式。jmeter 会用Apache Tika 去解析服务器响应内容，耗内存、也耗时间，解析易失败，尽量少用或不用。多用响应文本方式来进行断言验证

  -  URL 样本

    对请求的 url 进行断言，如果请求没有重定向(302)，那么该url 即为请求的 url；如果有重定向（切跟随重定向），那么url 则包含了请求 url 和重定向 url。

  - 响应代码

    即 http 响应代码，例如 200，404 等等，需要注意：由于 jmeter 默认情况下认为 4xx，5xx 时该请求失败，所以在断言这类响应代码时，需要同时勾选 Ingore Status，才能正常去做断言。

  - 响应信息

    即响应代码对应的信息，例如 OK， Not Found 等等这类的。如下常见类似是响应信息: 　HTTP/1.1 200 Ok 　HTTP/1.1 302 Found 　Response Header : 响应头信息，例如

    Server: Tengine Date: Thu, 12 Mar 2015 09:43:52 GMT 　Content-Type: text/html 　Content-Length: 260 　Connection: close 　Location: http://www.baidu.com/404.html

    Response Headers 　即 http 响应头信息，主要用于断言当响应头带有唯一或特定意义时。 　ngore Status请参见 4 响应代码的使用说明。

- **模式匹配规则** 　包括： 指返回结果包含要测试的模式中指定的内容，支持正则表达式 　匹配：（1）相当于 equals。返回值是固定的，可以以返回值做断言，效果同 equals；（2)正则表达式匹配。用正则表达式来匹配返回结果，但必须全部匹配。即正则表达式必须能匹配整个返回值，而不是返回部分值，注意与包括模式的区别（包括是支持模糊匹配的）。 　Equals：指返回结果与指定的测试模式完全一致。 　Substring：与“包括”模式差不多，都是指返回结果包括指定的内容，但 Substring 不支持正则表达式。 　 否：相当于取反。即如果上述断言结果为 true，勾选“否”选项后，则最终断言结果为 false。 注：在使用该断言时，熟练掌握正则表达式是必备的能力。

**测试模式** 可以添加你需要断言的部分，如果是包括，就可以添加多个- 

### 3.2 JSON断言

JSON断言也是测试工作中经常用到的一种断言方法，它只能针对响应结果是applicaton/json格式的请求进行断言。适用于返回消息是JSON格式

#### 3.2.1 初识

路径：**线程组 > 添加 > 断言 > JSON断言**，如下图所示： 

![image-20220630141336067](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220630141336067.png)

#### 3.2.2 关键参数说明如下：

- **名称：**控制器的描述性名称，显示在左边节点上，并用于命名事务 

- **注释：**控制器注释信息，非必填项 

- Assert JSON Path exists: json路径

- Additionally assert value:等于特定值

- Match as regular expression:正则匹配

- Expect null:空值

- Invert assertion(will fail if above conditions met):上面的条件满足则fail

## 参考文章

[Jmeter(二十一) - 从入门到精通 - JMeter断言 - 上篇](https://cloud.tencent.com/developer/inventory/1923/article/1680639)