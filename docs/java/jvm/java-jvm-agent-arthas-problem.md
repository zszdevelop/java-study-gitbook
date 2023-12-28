---
order: 289
category:
  - Java
  - JVM
---

# 调试排错 - Arthas 遇到的问题

## 1. 无法trace 和watch加载skywalking7 的jar中的类方法

未集成skywalking之前，atrhas正常工作，集成skywalking后[arthas](https://so.csdn.net/so/search?q=arthas&spm=1001.2101.3001.7020)的watch、trace命令失败，提示Enhance error! exception: java.lang.UnsupportedOperationException

[原文：无法trace 和watch加载skywalking7 的jar中的类方法](https://github.com/alibaba/arthas/issues/1141)

影响的方法

- trace

- watch

- #### stack

- monitor



## 2. 解决

在arthas的github中搜索相似问题，根源在于skywalking的工作机制，是ByteBuddy class cache特性导致了问题，项目启动的时候skywalking采用ByteBuddy转换类，ByteBuddy每次生成不同的附属类，类名称随机，当另外一个代理转换相同的类，触发skywalking再生成另外一个附属类，且名称不同，字节码被改动，类的属性field变更，jvm校验类的字节码时失败，导致转换失败。

skywalking提供两种解决方案：

服务启动的时候开启增强类的缓存功能，添加如下启动参数
```
-Dskywalking.agent.is_cache_enhanced_class=true -Dskywalking.agent.class_cache_mode=MEMORY
```



修改代理类配置文件agent.conf:

```
agent.is_cache_enhanced_class = ${SW_AGENT_CACHE_CLASS:false}
agent.class_cache_mode = ${SW_AGENT_CLASS_CACHE_MODE:MEMORY}
```

## 参考文章

[skywalking兼容arthas问题](https://blog.csdn.net/weixin_42106289/article/details/128467219)

[原文：无法trace 和watch加载skywalking7 的jar中的类方法](https://github.com/alibaba/arthas/issues/1141)

