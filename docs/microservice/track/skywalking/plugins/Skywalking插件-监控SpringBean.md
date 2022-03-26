# Skywalking插件-监控SpringBean

## 1. 简介

我们Skywalking 默认是只能追踪监控各个服务之间交互的交互时间。例如我们login

接口，只能看到他请求了redis和数据库，但是他无法监控SpringBean之间请求的时间。但我们实际业务场景中很经常希望能监控每个服务请求时间



![image-20211128183352758](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211128183352758.png)

## 2. apm-spring-annotation-plugin插件

这个插件可以实现对被@Bean, @Service, @Component and @Repository注解标注的bean的所有方法的追踪。

### 2.1 为什么这个插件是可选的？

追踪bean的所有方法会创建大量的span，这会导致耗费更多的CPU、内存和网络带宽。 当前如果你想追踪尽可能多的方法，请确保系统负载可以支撑更多的请求。


## 3. 集成插件

### 3.1 移动插件

将可选插件`optional-plugins`下的`apm-spring-annotation-plugin-8.8.0.jar`移动到`plugins`

![image-20211128191652029](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211128191652029.png)

### 3.2 测试

我们可以看到这样就可以看到每个service 的耗时情况了

![image-20211128192409598](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211128192409598.png)

## 参考文章

[SkyWalking链路追踪使用教程三：支持的插件及插件开发必看](https://blog.csdn.net/wabiaozia/article/details/115038648)
