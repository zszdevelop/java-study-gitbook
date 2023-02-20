---
Order: 10
Category:
  - IDEA
---

# IDEA 插件

工欲善其事必先利其器，分享几个比较好用的IDEA 插件

## **Lombok**

> Lombok目前已经是开发Java应用的标配了，不仅SpringBoot默认支持它，连IDEA也内置了Lombok插件，无需安装即可使用。Lombok是一款Java代码功能增强库，通过Lombok的注解，你可以不用再写getter、setter、equals等方法，Lombok将在编译时为你自动生成。 

![image-20220830170738919](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170738919.png)

举个例子，当我们给一个类添加@Getter和@Setter注解后；

```java
/**
 * 修改订单费用信息参数
 * Created by macro on 2018/10/29.
 */
@Getter
@Setter
public class OmsMoneyInfoParam {
    @ApiModelProperty("订单ID")
    private Long orderId;
    @ApiModelProperty("运费金额")
    private BigDecimal freightAmount;
    @ApiModelProperty("管理员后台调整订单所使用的折扣金额")
    private BigDecimal discountAmount;
    @ApiModelProperty("订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单")
    private Integer status;
}
```

Lombok就会为我们自动生成所有属性的Getter和Setter方法，无需我们再手写，具体使用可以参考[Lombok的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247488419&idx=1&sn=8fcd89fe0727a5b3fc4179db3aaf9891&scene=21#wechat_redirect) 。

![image-20220830170825950](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170825950.png)

## **Maven Helper**（Maven依赖分析工具）

> 解决Maven依赖冲突的好帮手，可以快速查找项目中的依赖冲突，并予以解决！

![image-20220830170334839](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170334839.png)

我们可以通过`pom.xml`文件底部的`依赖分析`标签页查看当前项目中的所有依赖。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/640.png" alt="640"  />

通过`冲突`按钮我们可以筛选出所有冲突的依赖，当前项目`guava`依赖有冲突，目前使用的是`18.0`版本。

![image-20220830170442742](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170442742.png)

选中有冲突的依赖，点击`Exclude`按钮可以直接排除该依赖。

![image-20220830170500791](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170500791.png)

同时`pom.xml`中也会对该依赖添加`<exclusion>`标签，是不是很方便啊！

![image-20220830170517332](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170517332.png)

## RestfulToolkit 

一套 RESTful 服务开发辅助工具集。

1.根据 URL 直接跳转到对应的方法定义 ( 快捷键搜索 Ctrl + Alt + N 或者 Ctrl  + \ ); ---这个个人感觉非常好用，和Ctrl + F一样重要。

2.提供了一个 Services tree 的显示窗口;

3.一个简单的 http 请求工具;

4.在请求方法上添加了有用功能: 复制生成 URL;,复制方法参数...

![image-20220830172628438](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830172628438.png)



## Save Actions（优化保存插件）

Save Actions是IDEA一款格式自动化的插件，当程序员将代码保存后，插件会自动进行格式化，代码洁癖者的福音。

![image-20220830171935784](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171935784.png)

## CodeGlance (代码编辑区缩略图插件)

CodeGlance是一款代码编辑区缩略图插件，可以快速定位代码，使用起来比拖动滚动条方便多了

![image-20220830172526366](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830172526366.png)





## **MyBatisX**

> MybatisX是一款基于IDEA的快速开发插件，由MyBatis-Plus团队开发维护，提示很全功能也很强大。支持xml和Mapper接口之间的跳转，自带图形化的代码生成器，可以通过类似JPA的方式，直接根据方法名称生成SQL实现。 

![image-20220830170916236](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170916236.png)

我们点击Mapper接口方法左侧的图标可以直接跳转到xml中对应的SQL实现，在xml点击左侧图标也可以直接跳转到Mapper接口中对应的方法。

![640 (2)](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/640%20(2).gif)

当我们创建符合JPA规范的方法时，能直接生成SQL实现无需手写，MyBatisX的功能很强大，详细使用可以参考[MybatisX插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect) 。

![640 (3)](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/640%20(3).gif)

## GsonFormatPlus

> 一款能根据JSON字符串自动生成实体类的插件，支持Lombok。

![image-20220830165920278](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830165920278.png)

选择类名，右键生成，输入JSON字符串即可快速生成对应实体类。

![640](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/640.gif)



## **Alibaba Java Coding Guidelines**

> 阿里巴巴《Java 开发手册》配套插件，可以实时检测代码中不符合手册规约的地方，助你码出高效，码出质量。 

![image-20220830170124136](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170124136.png)

比如说手册里有这么一条：

![image-20220830170143315](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170143315.png)

当我们违反手册规约时，该插件会自动检测并进行提示。

![image-20220830170205756](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170205756.png)

同时提供了一键检测所有代码规约情况和切换语言的功能。

![image-20220830170232658](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170232658.png)

如果你想修改某条规约的检测规则的话，可以通过设置的`Editor->Inspections`进行修改。

![image-20220830170254540](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170254540.png)

## **arthas idea**

> 基于IDEA开发的Arthas命令生成插件，支持Arthas官方常用的命令，比如 watch、trace、ognl static、ognl bean method、field、monitor、stack 、tt等命令。

![image-20220830171417627](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171417627.png)

直接打开右键菜单，选择Arthas命令即可快速生成命令，具体使用可以参考[Arthas使用教程](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499910&idx=1&sn=05c3177e74009bcaf309d5abd27ec4d5&scene=21#wechat_redirect) 。

![image-20220830171438377](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171438377.png)

## **Key Promoter X**

> Key Promoter X 是一款帮助你快速学习IDEA快捷键的插件，当你在IDEA中用鼠标点击某些功能时，它会自动提示你使用该功能的快捷键。它能让你更轻松地摆脱使用鼠标功能，从而只使用键盘来开发，这大概是刚开始使用IDEA的程序员最需要的插件了。

![image-20220830170623783](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830170623783.png)

当我们使用鼠标完成某些工作时，Key Promoter X会提示对应的快捷键，方便我们更快地掌握IDEA的快捷键。

![640 (1)](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/640%20(1).gif)

## **SequenceDiagram**（方法调的深度，生产时序图）

> SequenceDiagram是一款能根据代码生成时序图的插件，还支持在时序图上直接导航到对应代码以及导出为图片或PlantUML文件。

![image-20220830171149521](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171149521.png)

下面是一张使用SequenceDiagram制作的时序图，还是非常不错的，具体使用可以参考[SequenceDiagram插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502397&idx=1&sn=f741bdcb205cc3304ae754fe9403ae7e&scene=21#wechat_redirect) 。

![image-20220830171209255](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171209255.png)

## **PlantUML**

> PlantUML是一款开源的UML图绘制工具，支持通过文本来生成图形，使用起来非常高效。可以支持时序图、类图、对象图、活动图、思维导图等图形的绘制。

![image-20220830171240320](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171240320.png)

下面使用PlantUML来绘制一张流程图，可以实时预览，速度也很快，具体使用可以参考[PlantUML插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247494438&idx=1&sn=d077f02bbe50276c9939d0c652809f4b&scene=21#wechat_redirect) 。

![640 (4)](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/640%20(4).gif)



## **Docker**

> IDEA官方提供的Docker插件，已内置，支持远程Docker环境的镜像和容器管理，同时支持使用Docker Compose实现批量部署。

![image-20220830171521120](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171521120.png)

通过它能自动打包应用的镜像，jar包会直接上传到远程服务器并打包成镜像，具体使用可以参考[IDEA官方Docker插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500482&idx=1&sn=713a30c88cea125f4768e6a0df939600&scene=21#wechat_redirect) 。

![image-20220830171535473](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171535473.png)

## **Grep Console**

> 一款帮你分析控制台日志的插件，可以对不同级别的日志进行不同颜色的高亮显示，还可以用来按关键字搜索日志内容。

![image-20220830171557762](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171557762.png)

当项目打印日志的时候，可以发现不同日志级别的日志会以不同颜色来显示。

![image-20220830171614137](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171614137.png)

如果你需要修改配色方案的话，可以通过`Tools`打开该插件的配置菜单。

![image-20220830171626774](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171626774.png)

然后通过配置菜单修改配色方案。

![image-20220830171641735](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171641735.png)

可以通过在控制台右键并使用`Grep`按钮来调出日志分析的窗口。

![image-20220830171654853](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171654853.png)

然后直接通过关键字来搜索即可。

![image-20220830171705764](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171705764.png)

## **Statistic**

> 一款代码统计工具，可以用来统计当前项目中代码的行数和大小。

![image-20220830171751793](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171751793.png)

我们可以通过顶部菜单中的`View->Tool Windows->Statistic`按钮开启该功能。

![image-20220830171806817](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171806817.png)

此时就可以看到我们项目代码的统计情况了，比如我的开源项目`mall`中`java`代码大小为`2818kB`，行数为`85645`。

![image-20220830171820145](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830171820145.png)

## Javadoc（Javadoc生成插件）

该插件可以在java类元素（如字段、方法等）上生成javadoc的插件。

![image-20220830172336635](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830172336635.png)

## 参考文章

[看了我常用的IDEA插件，同事也开始悄悄安装了...](https://mp.weixin.qq.com/s/KiXWyhteyAiHo6FkYr2wXg)

[IntelliJ IDEA常用插件推荐](https://developer.aliyun.com/article/803464)