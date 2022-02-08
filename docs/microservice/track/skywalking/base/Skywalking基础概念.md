# Skywalking基础概念

## 1. 背景

在日常项目中，我们常常会遇到线上性能问题，尤其在微服务的场景下，调用链错综复杂，如何才能快速的定位和解决问题呢？

SkyWalking是一个观察性分析平台和应用性能管理系统（APM） SkyWalking提供分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。能非常方便的定位线上性能问题。

## 2. 基本概念 

### 2.1 整体架构

![image-20211203220247094](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211203220247094.png)

整个架构，分成上、下、左、右四部分：

- 上部分 **Agent** ：

  负责从应用中，收集链路信息，发送给 SkyWalking OAP 服务器。目前支持 SkyWalking、Zikpin、Jaeger 等提供的 Tracing 数据信息。而我们目前采用的是，SkyWalking Agent 收集 SkyWalking Tracing 数据，传递给服务器。

- 下部分 **SkyWalking OAP** ：

  负责接收 Agent 发送的 Tracing 数据信息，然后进行分析(Analysis Core) ，存储到外部存储器( Storage )，最终提供查询( Query )功能。

- 右部分  **Storage** 存储：

  Tracing 数据存储。目前支持 ES、MySQL、Sharding Sphere、TiDB、H2 多种存储器。而我们目前采用的是 ES ，主要考虑是 SkyWalking 开发团队自己的生产环境采用 ES 为主。

- 左部分 **SkyWalking UI** ：

  负责提供控台，查看链路等等。

### 2.2 SkyWalking支持三种探针 

- Agent – 基于ByteBuddy字节码增强技术实现，通过jvm的agent参数加载，并在程序启动时拦截指定的方法来收集数据。
- SDK – 程序中显式调用SkyWalking提供的SDK来收集数据，对应用有侵入。
- Service Mesh – 通过Service mesh的网络代理来收集数据。


