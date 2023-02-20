# JMeter后置处理器

## 1. 简介

后置处理器是在发出“取样器请求”之后执行一些操作。取样器用来模拟用户请求，有时候服务器 的响应数据在后续请求中需要用到，我们的势必要对这些响应数据进行处理，后置处理器就是来完成这项工作的。

> 例如系统登录成功以后我们需要获取SessionId，在后面的业务操作中服务器会验证这个SessionId，获取SessionId这个功能过程就可以用后置处理器中的正则表达式提取器来完成。

## 2.预览后置处理器

首先我们来看一下JMeter的后置处理器，路径：线程组（用户）->添加->后置处理器（）；我们可以清楚地看到JMeter5中共有11个后置处理器（不包括jp@gc开头的后置处理器，这个是安装的插件），如下图所示：

![image-20220624133657239](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624133657239.png)

## 3. 常用后置处理器详解

### 3.1CSS/JQuery提取器

CSS/JQuery提取器，是通过css选择器定位页面元素并读取数据 。

#### 3.1.1 初识

我们先来看看这个 **CSS/JQuery提取器** 长得是啥样子，路径：**线程组 > 添加 > 后置处理器 > CSS/JQuery提取器**，如下图所示： 

![image-20220624133817595](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624133817595.png)

#### 3.1.2 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **Apply to:**
  - Main sample only 仅适用于主要样本
  - Sub-samples only 仅适用于子样本
  - Main sample and sub-samples 主要样本和子样本
  - JMeter Variable Name to use 用作Jmeter变量名称

- **Name of created variable:**引用名称 也就是jmeter里面的变量

- **CSS Selector expression:**CSS选择器表达式 CSS表达式

- **Attribute:**属性 要提取的元素的属性。示例：`<input type="checkbox" name="colors" value="blue" id="blue">`蓝色，那么这里的属性就是value，因为我们要提取blue

- **Match No.(0 for Random)：**匹配数字 0随机一个，否则索引（从1开始）

- **Default Value:** 缺省值 在无法提取内容的情况下放入变量的值。

#### 3.1.3 支持语法

CSS选择器或JQuery选择器是Jmeter支持的两种语法，下面对其两种语法进行简单介绍

**CSS选择器**

| 选择            | 例         | 选择                                      |
| :-------------- | :--------- | :---------------------------------------- |
| .class          | .intro     | All elements with class="intro"           |
| #id             | #firstname | The element with id="firstname"           |
| *               | *          | All elements                              |
| element         | p          | `All <p> elements`                        |
| element,element | div, p     | `All <div> elements and all <p> elements` |
| element element | div p      | `All <p> elements inside <div> elements`  |

**JQuery选择器**

| 选择          | 例                | 选择                                          |
| :------------ | :---------------- | :-------------------------------------------- |
| *             | $("*")            | All elements                                  |
| #id           | $("#lastname")    | The element with id="lastname"                |
| .class        | $(".intro")       | All elements with class="intro"               |
| .class,.class | $(".intro,.demo") | All elements with the class "intro" or "demo" |
| element       | $("p")            | `All <p> elements`                            |
| el1,el2,el3   | $("h1,div,p")     | `All <h1>, <div> and <p> elements`            |

#### 3.1.4 实例1（提取指定链接）

1、新建测试计划，线程组下添加访问 博客园主页的取样器，如下图所示：

![image-20220624134058234](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134058234.png)

2、然后再添加CSS/JQuery提取器，如下图所示：

![image-20220624134117503](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134117503.png)

其中CSS选择器表达式就按如下图的方法获取，如下图所示：

![image-20220624134138658](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134138658.png)

3、接着再添加一个取样器 用来确认是否提取到我们要提取的东西，提取出来的值用来传参，如下图所示：

![image-20220624134201747](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134201747.png)

4、配置好以后，点击“保存”，运行JMeter，查看表格结果（可以看到提取的路径就是我们要提取博客园的新闻路径），如下图所示：

![image-20220624134305002](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134305002.png)

#### 3.1.5实例2（随机提取链接）

1、新建测试计划，线程组下添加随机变量和访问 JMeter主页的取样器，如下图所示：

**线程组**

![image-20220624134340837](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134340837.png)

**随机变量**

![image-20220624134358713](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134358713.png)

**取样器**

![image-20220624134415901](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134415901.png)

2、然后再添加CSS/JQuery提取器，如下图所示：

![image-20220624134431832](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134431832.png)

3、接着再添加一个取样器 用来确认是否提取到我们要提取的东西，提取出来的值用来传参，如下图所示：

![image-20220624134451012](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134451012.png)

4、配置好以后，点击“保存”，运行JMeter，查看表格结果（可以看到提取的路径就是我们要提取博客园的新闻路径），如下图所示：

![image-20220624134515503](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134515503.png)

### 3.2 JSON提取器

JSON 提取器可以使用JSON-PATH语法从JSON格式的响应中提取数据。

该后处理器与正则表达式提取器非常相似。必须将其放置为HTTP Sampler或具有JSON响应的任何其他取样器的子级，可以以非常简单的方式提取JSON文本内容。

#### 3.2.1 初识

我们先来看看这个**JSON提取器**长得是啥样子，路径：**线程组 > 添加 > 后置处理器 > JSON提取器**，如下图所示：  

![image-20220624134713242](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134713242.png)

#### 3.2.2 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **Update Once Per Iteration：**标识是否每轮迭代更新一次元素；

- **Apply to（应用范围）：** Main sample and sub-samples：应用于主sample及子sample

  - Main sample only：默认的是这个，应用于主sample

  - Sub-samples only：应用于子sample

  - JMeter Variable Name to use：应用于变量命名的内容

- **Name of created Variable:**保存的变量名，后面使用${Variable names}引用

- **JSON Path Expression：**json表达式

- **Match No.(0 or Random)：**匹配的值是哪一个，默认不填写是获取符合条件的第一个，这个与正则表达式的类似（0为随机、N为获取第N个、-1获取所有）

- **Compute comcatemation var(suffix_ALL)：**如果发现许多结果，插件将使用“，”分隔符将它们连接起来，并将其存储在名为`<variable name>`_ALL的var中

- **Default Values：**当没有获取到参数值时的默认值

#### 3.2.3 [JSON path expression 语法](https://goessner.net/articles/JsonPath/)

| JsonPath           | 描述                   |
| :----------------- | :--------------------- |
| $                  | 根节点                 |
| @                  | 当前节点               |
| .or[]              | 子节点                 |
| ..                 | 选择所有符合条件的节点 |
| *                  | 所有节点               |
| []                 | 迭代器标示，如数组下标 |
| [,]                | 支持迭代器中做多选     |
| [start : end:step] | 数组切片运算符         |
| ?()                | 支持过滤操作           |
| ()                 | 支持表达式计算         |

#### 3.2.4 实例 

1、新建测试计划，线程组下添加天气预报接口取样器，如下图所示：

![image-20220624134918231](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134918231.png)

2、然后再在取样器下添加JSON提取器，如下图所示：

![image-20220624134947490](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624134947490.png)

3、紧接着再添加一个取样器 度娘，用来获取提取的status，提取出来的值用来传参，如下图所示

![image-20220624135006116](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135006116.png)

4、配置好以后，点击“保存”，运行JMeter，查看表格结果，如下图所示：

**天气预报接口请求结果：**

![image-20220624135022606](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135022606.png)

**度娘请求结果：** 

![image-20220624135039141](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135039141.png)

### 3.3 边界提取器

边界提取器，使用JMeter5.0的边界提取器，不需要写复杂的正则表达式，只要填写左右边界即可，我们想从接口中提取一些想用的东西，不习惯用正则提取器和json提取器，今天我们来介绍下边界提取器，相对前者较简单些。它通过左右边界来提取需要的内容，它可以匹配任何格式的内容，如文本、json、xpath、html等等，使用也很简单，分别填写要提取内容的左右边界即可，很灵活。

#### 3.3.1 初识

我们先来看看这个**边界提取器**长得是啥样子，路径：**线程组 > 添加 > 后置处理器 > 边界提取器**，如下图所示： 

![image-20220624135215636](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135215636.png)

#### 3.3.2 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **Update Once Per Iteration：**标识是否每轮迭代更新一次元素；

- **Apply to（应用范围）：** Main sample and sub-samples：应用于主sample及子sample

  - Main sample only：默认的是这个，应用于主sample

  - Sub-samples only：应用于子sample

  - JMeter Variable Name to use：应用于变量命名的内容

- **Name of created Variable:**保存的变量名，后面使用${Variable names}引用

- **JSON Path Expression：**json表达式

- **Match No.(0 or Random)：**匹配的值是哪一个，默认不填写是获取符合条件的第一个，这个与正则表达式的类似（0为随机、N为获取第N个、-1获取所有）

- **Compute comcatemation var(suffix_ALL)：**如果发现许多结果，插件将使用“，”分隔符将它们连接起来，并将其存储在名为`<variable name>`_ALL的var中

- **Default Values：**当没有获取到参数值时的默认值

#### 3.3.3 实例

1、新建测试计划，线程组下添加度娘取样器，如下图所示：

![image-20220624135755207](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135755207.png)

2、使用边界提取器提取度娘取样器响应中（百度一下，你就知道），如下图所示：

```html
<!DOCTYPE html>
<!--STATUS OK-->
<html>
 <head> 
  <meta http-equiv="content-type" content="text/html;charset=utf-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" /> 
  <meta content="always" name="referrer" /> 
  <link rel="stylesheet" type="text/css" href="http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min.css" /> 
  <title>百度一下，你就知道</title> 
 </head> 
 <body link="#0000cc"> 
  <div id="wrapper"> 
   <div id="head"> 
    <div class="head_wrapper"> 
     <div class="s_form"> 
      <div class="s_form_wrapper"> 
       <div id="lg"> 
        <img hidefocus="true" src="//www.baidu.com/img/bd_logo1.png" width="270" height="129" /> 
       </div> 
       <form id="form" name="f" action="//www.baidu.com/s" class="fm"> 
        <input type="hidden" name="bdorz_come" value="1" /> 
        <input type="hidden" name="ie" value="utf-8" /> 
        <input type="hidden" name="f" value="8" /> 
        <input type="hidden" name="rsv_bp" value="1" /> 
        <input type="hidden" name="rsv_idx" value="1" /> 
        <input type="hidden" name="tn" value="baidu" /> 
        <span class="bg s_ipt_wr"> <input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off" autofocus="" /> </span> 
        <span class="bg s_btn_wr"> <input type="submit" id="su" value="百度一下" class="bg s_btn" /> </span> 
       </form> 
      </div> 
     </div> 
     <div id="u1"> 
      <a href="http://news.baidu.com" name="tj_trnews" class="mnav">新闻</a> 
      <a href="http://www.hao123.com" name="tj_trhao123" class="mnav">hao123</a> 
      <a href="http://map.baidu.com" name="tj_trmap" class="mnav">地图</a> 
      <a href="http://v.baidu.com" name="tj_trvideo" class="mnav">视频</a> 
      <a href="http://tieba.baidu.com" name="tj_trtieba" class="mnav">贴吧</a> 
      <noscript> 
       <a href="http://www.baidu.com/bdorz/login.gif?login&amp;tpl=mn&amp;u=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1" name="tj_login" class="lb">登录</a> 
      </noscript> 
      <script>document.write('<a href="http://www.baidu.com/bdorz/login.gif?login&tpl=mn&u='+ encodeURIComponent(window.kk+ (window.location.search === "" ? "?" : "&")+ "bdorz_come=1")+ '" name="tj_login" class="lb">登录</a>');</script> 
      <a href="//www.baidu.com/more/" name="tj_briicon" class="bri" style="display: block;">更多产品</a> 
     </div> 
    </div> 
   </div> 
   <div id="ftCon"> 
    <div id="ftConw"> 
     <p id="lh"> <a href="http://home.baidu.com">关于百度</a> <a href="http://ir.baidu.com">About Baidu</a> </p> 
     <p id="cp">&copy;2017&nbsp;Baidu&nbsp;<a href="http://www.baidu.com/duty/">使用百度前必读</a>&nbsp; <a href="http://jianyi.baidu.com/" class="cp-feedback">意见反馈</a>&nbsp;京ICP证030173号&nbsp; <img src="//www.baidu.com/img/gs.gif" /> </p> 
    </div> 
   </div> 
  </div>   
 </body>
</html>
```

3、然后再在取样器下添加边界提取器，如下图所示：

![image-20220624135841205](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135841205.png)

说明：

 （1）Apply to：选Main sample only。

　　（2）要检查的响应字段：选主体。

　　（3）引用名称：提取出来参数引用的名称。

　　（4）提取值左边界 ：`<title>`。

　　（5）提取值右边界 `</title>`。

　　（6）匹配数字：0代表随机取值，1代表全部取值，通常情况下填0

　　（7）缺省值：如果参数没有取得到值，那默认给一个值让它取。

3、紧接着再添加一个取样器 提取出来的值用来传参，用来获取提取的param，提取出来的值用来传参，如下图所示：

![image-20220624135930795](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135930795.png)

4、配置好以后，点击“保存”，运行JMeter，查看表格结果，如下图所示：

**度娘请求结果：**

![image-20220624135949511](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624135949511.png)

**提取出来的值用来传参请求结果：** 

![image-20220624140005238](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624140005238.png)

### 3.4 正则表达式提取器

允许用户使用正则表达式从服务器响应中提取值。作为后处理器，此元素将在其范围内的每个Sample请求之后执行，应用正则表达式，提取请求的值，生成模板字符串，并将结果存储到给定的变量名称中。 

#### 3.4.1 初识

我们先来看看这个**正则表达式提取器**长得是啥样子，路径：**线程组 > 添加 > 后置处理器 > 正则表达式提取器**，如下图所示： 

![image-20220624140145400](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624140145400.png)

#### 3.4.2 关键参数说明如下：

- **Name：**名称，可以随意设置，甚至为空；

- **Comments：**注释，可随意设置，可以为空；

- **Session Argument Name：**会话参数名称，用于搜索sessionId，其他sample也可通过此参数来 调用其获取的sessionId；

- **Path Extension：**路径扩展，如url添加了分号作为分割，则勾选此项；

- **Do not use equals in path extension：**用于url不用等号来分割key和value的类型；

- **Do not use questionmark in path extension：**用于不带？的类型；

- **Cache Session Id?：**勾选此项则会存储在其挂载的sample上获取到的sessionId供后边的其他sample使用；

- **URL Encode：**是否使用url编码；

#### 3.4.3 实例

1、新建测试计划，线程组下添加度娘取样器，如下图所示：

![image-20220624140429869](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624140429869.png)

2、使用正则表达式提取器提取度娘取样器响应中（**百度一下，你就知道**），如下图所示：

```html
<!DOCTYPE html>
<!--STATUS OK-->
<html>
 <head> 
  <meta http-equiv="content-type" content="text/html;charset=utf-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" /> 
  <meta content="always" name="referrer" /> 
  <link rel="stylesheet" type="text/css" href="http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min.css" /> 
  <title>百度一下，你就知道</title> 
 </head> 
 <body link="#0000cc"> 
  <div id="wrapper"> 
   <div id="head"> 
    <div class="head_wrapper"> 
     <div class="s_form"> 
      <div class="s_form_wrapper"> 
       <div id="lg"> 
        <img hidefocus="true" src="//www.baidu.com/img/bd_logo1.png" width="270" height="129" /> 
       </div> 
       <form id="form" name="f" action="//www.baidu.com/s" class="fm"> 
        <input type="hidden" name="bdorz_come" value="1" /> 
        <input type="hidden" name="ie" value="utf-8" /> 
        <input type="hidden" name="f" value="8" /> 
        <input type="hidden" name="rsv_bp" value="1" /> 
        <input type="hidden" name="rsv_idx" value="1" /> 
        <input type="hidden" name="tn" value="baidu" /> 
        <span class="bg s_ipt_wr"> <input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off" autofocus="" /> </span> 
        <span class="bg s_btn_wr"> <input type="submit" id="su" value="百度一下" class="bg s_btn" /> </span> 
       </form> 
      </div> 
     </div> 
     <div id="u1"> 
      <a href="http://news.baidu.com" name="tj_trnews" class="mnav">新闻</a> 
      <a href="http://www.hao123.com" name="tj_trhao123" class="mnav">hao123</a> 
      <a href="http://map.baidu.com" name="tj_trmap" class="mnav">地图</a> 
      <a href="http://v.baidu.com" name="tj_trvideo" class="mnav">视频</a> 
      <a href="http://tieba.baidu.com" name="tj_trtieba" class="mnav">贴吧</a> 
      <noscript> 
       <a href="http://www.baidu.com/bdorz/login.gif?login&amp;tpl=mn&amp;u=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1" name="tj_login" class="lb">登录</a> 
      </noscript> 
      <script>document.write('<a href="http://www.baidu.com/bdorz/login.gif?login&tpl=mn&u='+ encodeURIComponent(window.kk+ (window.location.search === "" ? "?" : "&")+ "bdorz_come=1")+ '" name="tj_login" class="lb">登录</a>');</script> 
      <a href="//www.baidu.com/more/" name="tj_briicon" class="bri" style="display: block;">更多产品</a> 
     </div> 
    </div> 
   </div> 
   <div id="ftCon"> 
    <div id="ftConw"> 
     <p id="lh"> <a href="http://home.baidu.com">关于百度</a> <a href="http://ir.baidu.com">About Baidu</a> </p> 
     <p id="cp">&copy;2017&nbsp;Baidu&nbsp;<a href="http://www.baidu.com/duty/">使用百度前必读</a>&nbsp; <a href="http://jianyi.baidu.com/" class="cp-feedback">意见反馈</a>&nbsp;京ICP证030173号&nbsp; <img src="//www.baidu.com/img/gs.gif" /> </p> 
    </div> 
   </div> 
  </div>   
 </body>
</html>
```

3、然后再在取样器下添加正则表达式提取器，如下图所示：

![image-20220624141602550](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624141602550.png)

说明：

 （1）引用名称：下一个请求要引用的参数名称，如填写title，则可用${title}引用它。

　　（2）正则表达式：

　　　　()：括起来的部分就是要提取的。

　　　　.：匹配任何字符串。

　　　　+：一次或多次。

　　　　?：不要太贪婪，在找到第一个匹配项后停止。

　　（3）模板：用$$引用起来，如果在正则表达式中有多个正则表达式，则可以是$2$$3$等等，表示解析到的第几个值给title。如：$1$表示解析到的第1个值

　　（4）匹配数字：0代表随机取值，1代表全部取值，通常情况下填0

　　（5）缺省值：如果参数没有取得到值，那默认给一个值让它取。

4、紧接着再添加一个取样器 提取出来的值用来传参，用来获取提取的param，提取出来的值用来传参，如下图所示：

![image-20220624141637181](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624141637181.png)

5、配置好以后，点击“保存”，运行JMeter，查看表格结果，如下图所示：

**度娘请求结果：**

![image-20220624141653974](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624141653974.png)

**提取出来的值用来传参请求结果：**

![image-20220624141706991](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624141706991.png)

#### 3.4.4 实例2 登录获取token

对登录请求后置处理

![image-20220624142005359](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142005359.png)

取到登录后的token 设置

![image-20220624142106868](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142106868.png)

### 3.6 BeanShell 后置处理程序

 **BeanShell 后置处理程序**，如果请求返回的消息为xml或html格式的，可以用XPath2提取器来提取需要的数据。这个估计是JMeter5.0新加的吧，具体用法和Xpath提取器的应该差不多的，可以参考上边Xpath提取器的用法。

#### 3.6.1 初识

我们先来看看这个  **BeanShell 后置处理程序**长得是啥样子，路径：**线程组 > 添加 > 后置处理器 > BeanShell 后置处理程序**，如下图所示： 

![image-20220624142401298](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142401298.png)

#### 3.6.2 关键参数说明如下：

- **Reset bsh.Interpreter before each call:** 每次迭代是否重置解释器

- **Reset Interpreter :f**alse

  Parameters to be passed to BeanShell(=>String Parameters and String []bsh.args) 参数传递，字符串或者数组

- **Parameters:**
- *Script file(overrides script):** 脚本文件
- **File Name:**

- **Script(variables:ctx vars props prev data log):** 脚本编辑（）

#### 3.6.3 实例

在这里宏哥就列举一个简单的例子，响应结果中有中文乱码，使用BeanShell 后置处理程序来处理中文乱码。

1、新建测试计划，线程组下添加1个取样器 访问度娘，如下图所示：

![image-20220624142524798](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142524798.png)

2、然后再添加BeanShell 后置处理程序，设置脚本：**prev.setDataEncoding("UTF-8");** ，如下图所示：

```
prev.setDataEncoding("utf-8");
```



![image-20220624142811533](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142811533.png)

3、配置好以后，点击“保存”，运行JMeter，禁用BeanShell 后置处理程序，查看表格结果（中文乱码），如下图所示：

**（1）禁用BeanShell 后置处理程序，查看表格结果（有中文乱码）**

![image-20220624142739656](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142739656.png)

**（2）启用BeanShell 后置处理程序，查看表格结果（无中文乱码）**

![image-20220624142730328](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220624142730328.png)

## 参考文章

[Jmeter(十七) - 从入门到精通 - JMeter后置处理器](https://cloud.tencent.com/developer/inventory/1923/article/1663346)