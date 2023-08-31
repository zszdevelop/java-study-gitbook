const e=JSON.parse('{"key":"v-339d73d2","path":"/java/jvm/java-jvm-optimization.html","title":"如何合理的规划 JVM 性能调优","lang":"zh-CN","frontmatter":{"description":"JVM性能调优涉及到方方面面的取舍，往往是牵一发而动全身，需要全盘考虑各方面的影响。但也有一些基础的理论和原则，理解这些理论并遵循这些原则会让你的性能调优任务将会更加轻松。为了更好的理解本篇所介绍的内容。你需要已经了解和遵循以下内容: 1、已了解jvm 垃圾收集器 2、已了解jvm 性能监控常用工具 3、能够读懂gc日志 4、确信不为了调优而调优，jv...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/java/jvm/java-jvm-optimization.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"如何合理的规划 JVM 性能调优"}],["meta",{"property":"og:description","content":"JVM性能调优涉及到方方面面的取舍，往往是牵一发而动全身，需要全盘考虑各方面的影响。但也有一些基础的理论和原则，理解这些理论并遵循这些原则会让你的性能调优任务将会更加轻松。为了更好的理解本篇所介绍的内容。你需要已经了解和遵循以下内容: 1、已了解jvm 垃圾收集器 2、已了解jvm 性能监控常用工具 3、能够读懂gc日志 4、确信不为了调优而调优，jv..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 性能调优的层次","slug":"_1-性能调优的层次","link":"#_1-性能调优的层次","children":[{"level":3,"title":"1.1 确保项目架构调优与代码调优是最优的","slug":"_1-1-确保项目架构调优与代码调优是最优的","link":"#_1-1-确保项目架构调优与代码调优是最优的","children":[]},{"level":3,"title":"1.2 明确性能优化目标，找到性能瓶颈","slug":"_1-2-明确性能优化目标-找到性能瓶颈","link":"#_1-2-明确性能优化目标-找到性能瓶颈","children":[]}]},{"level":2,"title":"2. jvm调优流程","slug":"_2-jvm调优流程","link":"#_2-jvm调优流程","children":[{"level":3,"title":"2.1 性能定义","slug":"_2-1-性能定义","link":"#_2-1-性能定义","children":[]},{"level":3,"title":"2.2 JVM调优原则","slug":"_2-2-jvm调优原则","link":"#_2-2-jvm调优原则","children":[]},{"level":3,"title":"2.3 性能调优步骤","slug":"_2-3-性能调优步骤","link":"#_2-3-性能调优步骤","children":[]}]},{"level":2,"title":"3. 确定内存占用","slug":"_3-确定内存占用","link":"#_3-确定内存占用","children":[{"level":3,"title":"3.1 运行阶段","slug":"_3-1-运行阶段","link":"#_3-1-运行阶段","children":[]},{"level":3,"title":"3.2 jvm内存分配和参数","slug":"_3-2-jvm内存分配和参数","link":"#_3-2-jvm内存分配和参数","children":[]},{"level":3,"title":"2.3 计算活跃数据大小","slug":"_2-3-计算活跃数据大小","link":"#_2-3-计算活跃数据大小","children":[]}]},{"level":2,"title":"4.延迟调优","slug":"_4-延迟调优","link":"#_4-延迟调优","children":[{"level":3,"title":"4.1 系统延迟需求","slug":"_4-1-系统延迟需求","link":"#_4-1-系统延迟需求","children":[]},{"level":3,"title":"4.2 优化新生代大小","slug":"_4-2-优化新生代大小","link":"#_4-2-优化新生代大小","children":[]},{"level":3,"title":"4.3 优化老年代大小","slug":"_4-3-优化老年代大小","link":"#_4-3-优化老年代大小","children":[]}]},{"level":2,"title":"对象提升率","slug":"对象提升率","link":"#对象提升率","children":[]},{"level":2,"title":"5. 吞吐量调优","slug":"_5-吞吐量调优","link":"#_5-吞吐量调优","children":[]},{"level":2,"title":"6. 最后","slug":"_6-最后","link":"#_6-最后","children":[{"level":3,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":15.94,"words":4783},"filePathRelative":"java/jvm/java-jvm-optimization.md","localizedDate":"2023年2月20日","autoDesc":true}');export{e as data};
