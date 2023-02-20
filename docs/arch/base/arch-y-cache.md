---
order: 61
category:
  - 架构
---

# 系统高并发-缓存

> **高并发实现的三板斧：缓存，限流和降级**。缓存在高并发系统中有者极其广阔的应用，需要重点掌握，本文重点介绍下缓存及其实现。

## 1. 缓存简介

随着互联网的普及，内容信息越来越复杂，用户数和访问量越来越大，我们的应用需要支撑更多的并发量，同时我们的应用服务器和数据库服务器所做的计算也越来越多。但是往往我们的应用服务器资源是有限的，且技术变革是缓慢的，数据库每秒能接受的请求次数也是有限的（或者文件的读写也是有限的），如何能够有效利用有限的资源来提供尽可能大的吞吐量? 一个有效的办法就是引入缓存，打破标准流程，每个环节中请求可以从缓存中直接获取目标数据并返回，从而减少计算量，有效提升响应速度，让有限的资源服务更多的用户。

如图1所示，缓存的使用可以出现在1～4的各个环节中，每个环节的缓存方案与使用各有特点。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629215619151.png" alt="image-20220629215619151"  />

图1 互联网应用一般流程

### 1.1 关键词-命中率

- **命中率 = 命中数 / (命中数 + 没有命中数)**

#### 1.1.1 影响缓存命中率的因素：

1. 业务场景和业务需求

   缓存通常适合读多写少的业务场景，反之的使用意义并不多，命中率会很低。业务需求也决定了实时性的要求，直接影响到过期时间和更新策略，实时性要求越低越适合缓存。

2. 缓存的设计（策略和粒度）

   通常情况下缓存的粒度越小，命中率越高。比如说缓存一个用户信息的对象，只有当这个用户的信息发生变化的时候才更新缓存，而如果是缓存一个集合的话，集合中任何一个对象发生变化都要重新更新缓存。

   当数据发生变化时，直接更新缓存的值比移除缓存或者让缓存过期它的命中率更高，不过这个时候系统的复杂度过高。

3. 缓存的容量和基础设施

   缓存的容量有限就会容易引起缓存的失效和被淘汰。目前多数的缓存框架和中间件都采用LRU这个算法。同时采用缓存的技术选型也是至关重要的，比如采用本地内置的应用缓存，就比较容易出现单机瓶颈。而采用分布式缓存就更加容易扩展。所以需要做好系统容量规划，系统是否可扩展。

#### 1.1.2 **最大空间**

缓存最大空间一旦缓存中元素数量超过这个值（或者缓存数据所占空间超过其最大支持空间），那么将会触发缓存启动清空策略根据不同的场景合理的设置最大元素值往往可以一定程度上提高缓存的命中率，从而更有效的时候缓存。

### 1.2 缓存介质

虽然从硬件介质上来看，无非就是内存和硬盘两种，但从技术上，可以分成内存、硬盘文件、数据库。

- 内存：将缓存存储于内存中是最快的选择，无需额外的I/O开销，但是内存的缺点是没有持久化落地物理磁盘，一旦应用异常break down而重新启动，数据很难或者无法复原。
- 硬盘：一般来说，很多缓存框架会结合使用内存和硬盘，在内存分配空间满了或是在异常的情况下，可以被动或主动的将内存空间数据持久化到硬盘中，达到释放空间或备份数据的目的。
- 数据库：前面有提到，增加缓存的策略的目的之一就是为了减少数据库的I/O压力。现在使用数据库做缓存介质是不是又回到了老问题上了? 其实，数据库也有很多种类型，像那些不支持SQL，只是简单的key-value存储结构的特殊数据库（如BerkeleyDB和Redis），响应速度和吞吐量都远远高于我们常用的关系型数据库等。

### 1.3 缓存淘汰算法

FIFO/LFU/LRU/过期时间/随机

- FIFO：最先进入缓存的数据，在缓存空间不足时被清除，为了保证最新数据可用，保证实时性
- LFU(Least Frequently Used)：最近最不常用，**基于访问次数**，**去除命中次数最少的元素**，保证高频数据有效性
- LRU(Least Recently Used)：最近最少使用，**基于访问时间**，在被访问过的元素中**去除最久未使用的元素**，保证热点数据的有效性

### 1.4 哪里用了缓存

一切地方。例如：

- 我们从硬盘读数据的时候，其实操作系统还额外把附近的数据都读到了内存里
- 例如，CPU在从内存里读数据的时候，也额外读了许多数据到各级cache里
- 各个输入输出之间用buffer保存一批数据统一发送和接受，而不是一个byte一个byte的处理

上面这是系统层面，在软件系统设计层面，很多地方也用了缓存：

- 浏览器会缓存页面的元素，这样在重复访问网页时，就避开了要从互联网上下载数据（例如大图片）
- web服务会把静态的东西提前部署在CDN上，这也是一种缓存
- 数据库会缓存查询，所以同一条查询第二次就是要比第一次快
- 内存数据库（如redis）选择把大量数据存在内存而非硬盘里，这可以看作是一个大型缓存，只是把整个数据库缓存了起来
- 应用程序把最近几次计算的结果放在本地内存里，如果下次到来的请求还是原请求，就跳过计算直接返回结果 ...

## 2. 缓存应用和实现

缓存有各类特征，而且有不同介质的区别，那么实际工程中我们怎么去对缓存分类呢? 在目前的应用服务框架中，比较常见的，是根据缓存与应用的藕合度，分为local cache（本地缓存）和remote cache（分布式缓存）：

- **本地缓存**：指的是在应用中的缓存组件，其最大的优点是应用和cache是在同一个进程内部，请求缓存非常快速，没有过多的网络开销等，在单应用不需要集群支持或者集群情况下各节点无需互相通知的场景下使用本地缓存较合适；同时，它的缺点也是应为缓存跟应用程序耦合，多个应用程序无法直接的共享缓存，各应用或集群的各节点都需要维护自己的单独缓存，对内存是一种浪费。
- **分布式缓存**：指的是与应用分离的缓存组件或服务，其最大的优点是自身就是一个独立的应用，与本地应用隔离，多个应用可直接的共享缓存。

目前各种类型的缓存都活跃在成千上万的应用服务中，还没有一种缓存方案可以解决一切的业务场景或数据类型，我们需要根据自身的特殊场景和背景，选择最适合的缓存方案。缓存的使用是程序员、架构师的必备技能，好的程序员能根据数据类型、业务场景来准确判断使用何种类型的缓存，如何使用这种缓存，以最小的成本最快的效率达到最优的目的。

### 2.1 缓存实现-本地缓存

编程直接实现缓存 个别场景下，我们只需要简单的缓存数据的功能，而无需关注更多存取、清空策略等深入的特性时，直接编程实现缓存则是最便捷和高效的。

#### 2.1.1 成员变量或局部变量实现

简单代码示例如下：

```java
public void UseLocalCache(){
     //一个本地的缓存变量
     Map<String, Object> localCacheStoreMap = new HashMap<String, Object>();

    List<Object> infosList = this.getInfoList();
    for(Object item:infosList){
        if(localCacheStoreMap.containsKey(item)){ //缓存命中 使用缓存数据
            // todo
        } else { // 缓存未命中  IO获取数据，结果存入缓存
            Object valueObject = this.getInfoFromDB();
            localCacheStoreMap.put(valueObject.toString(), valueObject);

        }
    }
}
//示例
private List<Object> getInfoList(){
    return new ArrayList<Object>();
}
//示例数据库IO获取
private Object getInfoFromDB(){
    return new Object();
}
```

以局部变量map结构缓存部分业务数据，减少频繁的重复数据库I/O操作。缺点仅限于类的自身作用域内，类间无法共享缓存。

#### 2.1.2 静态变量实现

最常用的单例实现静态资源缓存，代码示例如下：

```java
public class CityUtils {
    private static final HttpClient httpClient = ServerHolder.createClientWithPool(); 
    private static Map<Integer, String> cityIdNameMap = new HashMap<Integer, String>();
    private static Map<Integer, String> districtIdNameMap = new HashMap<Integer, String>();

    static {
        HttpGet get = new HttpGet("http://gis-in.sankuai.com/api/location/city/all");
        BaseAuthorizationUtils.generateAuthAndDateHeader(get,
                BaseAuthorizationUtils.CLIENT_TO_REQUEST_MDC,
                BaseAuthorizationUtils.SECRET_TO_REQUEST_MDC);
        try {
            String resultStr = httpClient.execute(get, new BasicResponseHandler());
            JSONObject resultJo = new JSONObject(resultStr);
            JSONArray dataJa = resultJo.getJSONArray("data");
            for (int i = 0; i < dataJa.length(); i++) {
                JSONObject itemJo = dataJa.getJSONObject(i);
                cityIdNameMap.put(itemJo.getInt("id"), itemJo.getString("name"));
            }
        } catch (Exception e) {
            throw new RuntimeException("Init City List Error!", e);
        }
    }
    static {
        HttpGet get = new HttpGet("http://gis-in.sankuai.com/api/location/district/all");
        BaseAuthorizationUtils.generateAuthAndDateHeader(get,
                BaseAuthorizationUtils.CLIENT_TO_REQUEST_MDC,
                BaseAuthorizationUtils.SECRET_TO_REQUEST_MDC);
        try {
            String resultStr = httpClient.execute(get, new BasicResponseHandler());
            JSONObject resultJo = new JSONObject(resultStr);
            JSONArray dataJa = resultJo.getJSONArray("data");
            for (int i = 0; i < dataJa.length(); i++) {
                JSONObject itemJo = dataJa.getJSONObject(i);
                districtIdNameMap.put(itemJo.getInt("id"), itemJo.getString("name"));
            }
        } catch (Exception e) {
            throw new RuntimeException("Init District List Error!", e);
        }
    }

    public static String getCityName(int cityId) {
      String name = cityIdNameMap.get(cityId);
      if (name == null) {
        name = "未知";
      }
       return name;
     }

    public static String getDistrictName(int districtId) {
      String name = districtIdNameMap.get(districtId);
       if (name == null) {
         name = "未知";
        }
       return name;
     }
   }
}

```



O2O业务中常用的城市基础基本信息判断，通过静态变量一次获取缓存内存中，减少频繁的I/O读取，静态变量实现类间可共享，进程内可共享，缓存的实时性稍差。

为了解决本地缓存数据的实时性问题，目前大量使用的是结合ZooKeeper的自动发现机制，实时变更本地静态变量缓存：

美团内部的基础配置组件MtConfig，采用的就是类似原理，使用静态变量缓存，结合ZooKeeper的统一管理，做到自动动态更新缓存，如图2所示。

![image-20220629221854719](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629221854719.png)



图2 Mtconfig实现图

这类缓存实现，优点是能直接在heap区内读写，最快也最方便；缺点同样是受heap区域影响，缓存的数据量非常有限，同时缓存时间受GC影响。主要满足单机场景下的小数据量缓存需求，同时对缓存数据的变更无需太敏感感知，如上一般配置管理、基础静态数据等场景。

### 2.2 Ehcache

Ehcache是现在最流行的纯Java开源缓存框架，配置简单、结构清晰、功能强大，是一个非常轻量级的缓存实现，我们常用的Hibernate里面就集成了相关缓存功能。

![image-20220629221951180](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629221951180.png)

图3 Ehcache框架图

从图3中我们可以了解到，Ehcache的核心定义主要包括：

- cache manager：缓存管理器，以前是只允许单例的，不过现在也可以多实例了。
- cache：缓存管理器内可以放置若干cache，存放数据的实质，所有cache都实现了Ehcache接口，这是一个真正使用的缓存实例；通过缓存管理器的模式，可以在单个应用中轻松隔离多个缓存实例，独立服务于不同业务场景需求，缓存数据物理隔离，同时需要时又可共享使用。
- element：单条缓存数据的组成单位。
- system of record（SOR）：可以取到真实数据的组件，可以是真正的业务逻辑、外部接口调用、存放真实数据的数据库等，缓存就是从SOR中读取或者写入到SOR中去的。

在上层可以看到，整个Ehcache提供了对JSR、JMX等的标准支持，能够较好的兼容和移植，同时对各类对象有较完善的监控管理机制。它的缓存介质涵盖堆内存（heap）、堆外内存（BigMemory商用版本支持）和磁盘，各介质可独立设置属性和策略。Ehcache最初是独立的本地缓存框架组件，在后期的发展中，结合Terracotta服务阵列模型，可以支持分布式缓存集群，主要有RMI、JGroups、JMS和Cache Server等传播方式进行节点间通信，如图3的左侧部分描述。

整体数据流转包括这样几类行为:

- Flush：缓存条目向低层次移动。
- Fault：从低层拷贝一个对象到高层。在获取缓存的过程中，某一层发现自己的该缓存条目已经失效，就触发了Fault行为。
- Eviction：把缓存条目除去。
- Expiration：失效状态。
- Pinning：强制缓存条目保持在某一层。

图4反映了数据在各个层之间的流转，同时也体现了各层数据的一个生命周期。

<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629222018879.png" alt="image-20220629222018879" />

图4 缓存数据流转图（L1:本地内存层；L2:Terracotta服务节点层)

Ehcache的配置使用如下：

```xml
<ehcache>
<!-- 指定一个文件目录，当Ehcache把数据写到硬盘上时，将把数据写到这个文件目录下 -->
<diskStore path="java.io.tmpdir"/>

<!-- 设定缓存的默认数据过期策略 -->
<defaultCache
        maxElementsInMemory="10000"
        eternal="false"
        overflowToDisk="true"
        timeToIdleSeconds="0"
        timeToLiveSeconds="0"
        diskPersistent="false"
        diskExpiryThreadIntervalSeconds="120"/>

<!--  
    设定具体的命名缓存的数据过期策略

    cache元素的属性：
        name：缓存名称

        maxElementsInMemory：内存中最大缓存对象数

        maxElementsOnDisk：硬盘中最大缓存对象数，若是0表示无穷大

        eternal：true表示对象永不过期，此时会忽略timeToIdleSeconds和timeToLiveSeconds属性，默认为false

        overflowToDisk：true表示当内存缓存的对象数目达到了maxElementsInMemory界限后，会把溢出的对象写到硬盘缓存中。注意：如果缓存的对象要写入到硬盘中的话，则该对象必须实现了Serializable接口才行。

        diskSpoolBufferSizeMB：磁盘缓存区大小，默认为30MB。每个Cache都应该有自己的一个缓存区。

        diskPersistent：是否缓存虚拟机重启期数据

        diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认为120秒

        timeToIdleSeconds： 设定允许对象处于空闲状态的最长时间，以秒为单位。当对象自从最近一次被访问后，如果处于空闲状态的时间超过了timeToIdleSeconds属性值，这个对象就会过期，EHCache将把它从缓存中清空。只有当eternal属性为false，该属性才有效。如果该属性值为0，则表示对象可以无限期地处于空闲状态

        timeToLiveSeconds：设定对象允许存在于缓存中的最长时间，以秒为单位。当对象自从被存放到缓存中后，如果处于缓存中的时间超过了 timeToLiveSeconds属性值，这个对象就会过期，Ehcache将把它从缓存中清除。只有当eternal属性为false，该属性才有效。如果该属性值为0，则表示对象可以无限期地存在于缓存中。timeToLiveSeconds必须大于timeToIdleSeconds属性，才有意义

        memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。可选策略有：LRU（最近最少使用，默认策略）、FIFO（先进先出）、LFU（最少访问次数）。
-->
<cache name="CACHE1"
       maxElementsInMemory="1000"
       eternal="true"
       overflowToDisk="true"/>  

<cache name="CACHE2"
    maxElementsInMemory="1000"
    eternal="false"
    timeToIdleSeconds="200"
    timeToLiveSeconds="4000"
    overflowToDisk="true"/>
</ehcache>

```

整体上看，Ehcache的使用还是相对简单便捷的，提供了完整的各类API接口。需要注意的是，虽然Ehcache支持磁盘的持久化，但是由于存在两级缓存介质，在一级内存中的缓存，如果没有主动的刷入磁盘持久化的话，在应用异常down机等情形下，依然会出现缓存数据丢失，为此可以根据需要将缓存刷到磁盘，将缓存条目刷到磁盘的操作可以通过cache.flush()方法来执行，需要注意的是，对于对象的磁盘写入，前提是要将对象进行序列化。

主要特性：

- 快速，针对大型高并发系统场景，Ehcache的多线程机制有相应的优化改善。
- 简单，很小的jar包，简单配置就可直接使用，单机场景下无需过多的其他服务依赖。
- 支持多种的缓存策略，灵活。
- 缓存数据有两级：内存和磁盘，与一般的本地内存缓存相比，有了磁盘的存储空间，将可以支持更大量的数据缓存需求。
- 具有缓存和缓存管理器的侦听接口，能更简单方便的进行缓存实例的监控管理。
- 支持多缓存管理器实例，以及一个实例的多个缓存区域。

注意：Ehcache的超时设置主要是针对整个cache实例设置整体的超时策略，而没有较好的处理针对单独的key的个性的超时设置（有策略设置，但是比较复杂，就不描述了），因此，在使用中要注意过期失效的缓存元素无法被GC回收，时间越长缓存越多，内存占用也就越大，内存泄露的概率也越大。

### 2.3 Guava Cache

Guava Cache是Google开源的Java重用工具集库Guava里的一款缓存工具，其主要实现的缓存功能有：

- 自动将entry节点加载进缓存结构中；
- 当缓存的数据超过设置的最大值时，使用LRU算法移除；
- 具备根据entry节点上次被访问或者写入时间计算它的过期机制；
- 缓存的key被封装在WeakReference引用内；
- 缓存的Value被封装在WeakReference或SoftReference引用内；
- 统计缓存使用过程中命中率、异常率、未命中率等统计数据。

Guava Cache的架构设计灵感来源于ConcurrentHashMap，我们前面也提到过，简单场景下可以自行编码通过hashmap来做少量数据的缓存，但是，如果结果可能随时间改变或者是希望存储的数据空间可控的话，自己实现这种数据结构还是有必要的。

Guava Cache继承了ConcurrentHashMap的思路，使用多个segments方式的细粒度锁，在保证线程安全的同时，支持高并发场景需求。Cache类似于Map，它是存储键值对的集合，不同的是它还需要处理evict、expire、dynamic load等算法逻辑，需要一些额外信息来实现这些操作。对此，根据面向对象思想，需要做方法与数据的关联封装。如图5所示cache的内存数据模型，可以看到，使用ReferenceEntry接口来封装一个键值对，而用ValueReference来封装Value值，之所以用Reference命令，是因为Cache要支持WeakReference Key和SoftReference、WeakReference value。

![image-20220629222205342](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629222205342.png)



图5 Guava Cache数据结构图

**ReferenceEntry**是对一个键值对节点的抽象，它包含了key和值的ValueReference抽象类，Cache由多个Segment组成，而每个Segment包含一个ReferenceEntry数组，每个ReferenceEntry数组项都是一条ReferenceEntry链，且一个ReferenceEntry包含key、hash、valueReference、next字段。除了在ReferenceEntry数组项中组成的链，在一个Segment中，所有ReferenceEntry还组成access链（accessQueue）和write链（writeQueue）（后面会介绍链的作用）。ReferenceEntry可以是强引用类型的key，也可以WeakReference类型的key，为了减少内存使用量，还可以根据是否配置了expireAfterWrite、expireAfterAccess、maximumSize来决定是否需要write链和access链确定要创建的具体Reference：StrongEntry、StrongWriteEntry、StrongAccessEntry、StrongWriteAccessEntry等。

**对于ValueReference**，因为Cache支持强引用的Value、SoftReference Value以及WeakReference Value，因而它对应三个实现类：StrongValueReference、SoftValueReference、WeakValueReference。为了支持动态加载机制，它还有一个LoadingValueReference，在需要动态加载一个key的值时，先把该值封装在LoadingValueReference中，以表达该key对应的值已经在加载了，如果其他线程也要查询该key对应的值，就能得到该引用，并且等待改值加载完成，从而保证该值只被加载一次，在该值加载完成后，将LoadingValueReference替换成其他ValueReference类型。ValueReference对象中会保留对ReferenceEntry的引用，这是因为在Value因为WeakReference、SoftReference被回收时，需要使用其key将对应的项从Segment的table中移除。

**WriteQueue和AccessQueue** ：为了实现最近最少使用算法，Guava Cache在Segment中添加了两条链：write链（writeQueue）和access链（accessQueue），这两条链都是一个双向链表，通过ReferenceEntry中的previousInWriteQueue、nextInWriteQueue和previousInAccessQueue、nextInAccessQueue链接而成，但是以Queue的形式表达。WriteQueue和AccessQueue都是自定义了offer、add（直接调用offer）、remove、poll等操作的逻辑，对offer（add）操作，如果是新加的节点，则直接加入到该链的结尾，如果是已存在的节点，则将该节点链接的链尾；对remove操作，直接从该链中移除该节点；对poll操作，将头节点的下一个节点移除，并返回。

了解了cache的整体数据结构后，再来看下针对缓存的相关操作就简单多了：

- **Segment中的evict清除策略操作**，是在每一次调用操作的开始和结束时触发清理工作，这样比一般的缓存另起线程监控清理相比，可以减少开销，但如果长时间没有调用方法的话，会导致不能及时的清理释放内存空间的问题。evict主要处理四个Queue：1. keyReferenceQueue；2. valueReferenceQueue；3. writeQueue；4. accessQueue。前两个queue是因为WeakReference、SoftReference被垃圾回收时加入的，清理时只需要遍历整个queue，将对应的项从LocalCache中移除即可，这里keyReferenceQueue存放ReferenceEntry，而valueReferenceQueue存放的是ValueReference，要从Cache中移除需要有key，因而ValueReference需要有对ReferenceEntry的引用，这个前面也提到过了。而对后面两个Queue，只需要检查是否配置了相应的expire时间，然后从头开始查找已经expire的Entry，将它们移除即可。
- **Segment中的put操作**：put操作相对比较简单，首先它需要获得锁，然后尝试做一些清理工作，接下来的逻辑类似ConcurrentHashMap中的rehash，查找位置并注入数据。需要说明的是当找到一个已存在的Entry时，需要先判断当前的ValueRefernece中的值事实上已经被回收了，因为它们可以是WeakReference、SoftReference类型，如果已经被回收了，则将新值写入。并且在每次更新时注册当前操作引起的移除事件，指定相应的原因：COLLECTED、REPLACED等，这些注册的事件在退出的时候统一调用Cache注册的RemovalListener，由于事件处理可能会有很长时间，因而这里将事件处理的逻辑在退出锁以后才做。最后，在更新已存在的Entry结束后都尝试着将那些已经expire的Entry移除。另外put操作中还需要更新writeQueue和accessQueue的语义正确性。
- **Segment带CacheLoader的get操作**：1. 先查找table中是否已存在没有被回收、也没有expire的entry，如果找到，并在CacheBuilder中配置了refreshAfterWrite，并且当前时间间隔已经操作这个事件，则重新加载值，否则，直接返回原有的值；2. 如果查找到的ValueReference是LoadingValueReference，则等待该LoadingValueReference加载结束，并返回加载的值；3. 如果没有找到entry，或者找到的entry的值为null，则加锁后，继续在table中查找已存在key对应的entry，如果找到并且对应的entry.isLoading()为true，则表示有另一个线程正在加载，因而等待那个线程加载完成，如果找到一个非null值，返回该值，否则创建一个LoadingValueReference，并调用loadSync加载相应的值，在加载完成后，将新加载的值更新到table中，即大部分情况下替换原来的LoadingValueReference。

Guava Cache提供Builder模式的CacheBuilder生成器来创建缓存的方式，十分方便，并且各个缓存参数的配置设置，类似于函数式编程的写法，可自行设置各类参数选型。它提供三种方式加载到缓存中。分别是：

- 在构建缓存的时候，使用build方法内部调用CacheLoader方法加载数据；
- callable 、callback方式加载数据；
- 使用粗暴直接的方式，直接Cache.put 加载数据，但自动加载是首选的，因为它可以更容易的推断所有缓存内容的一致性。

build生成器的两种方式都实现了一种逻辑：从缓存中取key的值，如果该值已经缓存过了则返回缓存中的值，如果没有缓存过可以通过某个方法来获取这个值，不同的地方在于cacheloader的定义比较宽泛，是针对整个cache定义的，可以认为是统一的根据key值load value的方法，而callable的方式较为灵活，允许你在get的时候指定load方法。使用示例如下：

```java
   /**
    * CacheLoader
   */
   public void loadingCache()
   {
     LoadingCache<String, String> graphs =CacheBuilder.newBuilder()
        .maximumSize(1000).build(new CacheLoader<String, String>()
        {
            @Override
            public String load(String key) throws Exception
            {
                System.out.println("key:"+key);
                if("key".equals(key)){
                    return "key return result";
                }else{
                    return "get-if-absent-compute";
                }                   
            }
        });
   String resultVal = null;
   try {
       resultVal = graphs.get("key");
       } catch (ExecutionException e) {
         e.printStackTrace();
      }

    System.out.println(resultVal);
   }

   /**
    *
    * Callable
   */
   public void callablex() throws ExecutionException
    {
      Cache<String, String> cache = CacheBuilder.newBuilder()
        .maximumSize(1000).build();
      String result = cache.get("key", new Callable<String>()
       {
         public String call()
         {
          return "result";
         }
       });
     System.out.println(result);
    }
```



总体来看，Guava Cache基于ConcurrentHashMap的优秀设计借鉴，在高并发场景支持和线程安全上都有相应的改进策略，使用Reference引用命令，提升高并发下的数据……访问速度并保持了GC的可回收，有效节省空间；同时，write链和access链的设计，能更灵活、高效的实现多种类型的缓存清理策略，包括基于容量的清理、基于时间的清理、基于引用的清理等；编程式的build生成器管理，让使用者有更多的自由度，能够根据不同场景设置合适的模式。

### 2.4 缓存实现 - 分布式缓存

请参考：[分布式系统 - 分布式缓存及实现方案](http://java.xiaoyanxiaoyu.com/microservice/distributed/%E5%88%86%E5%B8%83%E5%BC%8F%E7%B3%BB%E7%BB%9F-%E5%88%86%E5%B8%83%E5%BC%8F%E7%BC%93%E5%AD%98%E5%8F%8A%E6%96%B9%E6%A1%88%E5%AE%9E%E7%8E%B0.html)

### 2.5 缓存实现方式 - 注解方式

#### 2.5.1 Spring注解缓存

Spring 3.1之后，引入了注解缓存技术，其本质上不是一个具体的缓存实现方案，而是一个对缓存使用的抽象，通过在既有代码中添加少量自定义的各种annotation，即能够达到使用缓存对象和缓存方法的返回对象的效果。Spring的缓存技术具备相当的灵活性，不仅能够使用SpEL（Spring Expression Language）来定义缓存的key和各种condition，还提供开箱即用的缓存临时存储方案，也支持和主流的专业缓存集成。其特点总结如下：

- 少量的配置annotation注释即可使得既有代码支持缓存；
- 支持开箱即用，不用安装和部署额外的第三方组件即可使用缓存；
- 支持Spring Express Language（SpEL），能使用对象的任何属性或者方法来定义缓存的key和使用规则条件；
- 支持自定义key和自定义缓存管理者，具有相当的灵活性和可扩展性。

和Spring的事务管理类似，Spring Cache的关键原理就是Spring AOP，通过Spring AOP实现了在方法调用前、调用后获取方法的入参和返回值，进而实现了缓存的逻辑。而Spring Cache利用了Spring AOP的动态代理技术，即当客户端尝试调用pojo的foo()方法的时候，给它的不是pojo自身的引用，而是一个动态生成的代理类。

![image-20220629222645572](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629222645572.png)


图12 Spring动态代理调用图

如图12所示，实际客户端获取的是一个代理的引用，在调用foo()方法的时候，会首先调用proxy的foo()方法，这个时候proxy可以整体控制实际的pojo.foo()方法的入参和返回值，比如缓存结果，比如直接略过执行实际的foo()方法等，都是可以轻松做到的。Spring Cache主要使用三个注释标签，即@Cacheable、@CachePut和@CacheEvict，主要针对方法上注解使用，部分场景也可以直接类上注解使用，当在类上使用时，该类所有方法都将受影响。我们总结一下其作用和配置方法，如下表所示。

| 标签类型    | 作用                                                         | 主要配置参数说明                                             |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| @Cacheable  | 主要针对方法配置，能够根据方法的请求参数对其结果进行缓存     | value：缓存的名称，在 Spring 配置文件中定义，必须指定至少一个； key：缓存的 key，可以为空，如果指定要按照 SpEL 表达式编写，如果不指定，则默认按照方法的所有参数进行组合； condition：缓存的条件，可以为空，使用 SpEL 编写，返回 true 或者 false，只有为 true 才进行缓存 |
| @CachePut   | 主要针对方法配置，能够根据方法的请求参数对其结果进行缓存，和 @Cacheable 不同的是，它每次都会触发真实方法的调用 | value：缓存的名称，在 spring 配置文件中定义，必须指定至少一个; key：缓存的 key，可以为空，如果指定要按照 SpEL 表达式编写，如果不指定，则默认按照方法的所有参数进行组合； condition：缓存的条件，可以为空，使用 SpEL 编写，返回 true 或者 false，只有为 true 才进行缓存 |
| @CacheEvict | 主要针对方法配置，能够根据一定的条件对缓存进行清空           | value：缓存的名称，在 Spring 配置文件中定义，必须指定至少一个； key：缓存的 key，可以为空，如果指定要按照 SpEL 表达式编写，如果不指定，则默认按照方法的所有参数进行组合； condition：缓存的条件，可以为空，使用 SpEL 编写，返回 true 或者 false，只有为 true 才进行缓存； allEntries：是否清空所有缓存内容，默认为 false，如果指定为 true，则方法调用后将立即清空所有缓存； beforeInvocation：是否在方法执行前就清空，默认为 false，如果指定为 true，则在方法还没有执行的时候就清空缓存，默认情况下，如果方法执行抛出异常，则不会清空缓存 |

**可扩展支持**：Spring注解cache能够满足一般应用对缓存的需求，但随着应用服务的复杂化，大并发高可用性能要求下，需要进行一定的扩展，这时对其自身集成的缓存方案可能不太适用，该怎么办? Spring预先有考虑到这点，那么怎样利用Spring提供的扩展点实现我们自己的缓存，且在不改变原来已有代码的情况下进行扩展? 是否在方法执行前就清空，默认为false，如果指定为true，则在方法还没有执行的时候就清空缓存，默认情况下，如果方法执行抛出异常，则不会清空缓存。

> 这基本能够满足一般应用对缓存的需求，但现实总是很复杂，当你的用户量上去或者性能跟不上，总需要进行扩展，这个时候你或许对其提供的内存缓存不满意了，因为其不支持高可用性，也不具备持久化数据能力，这个时候，你就需要自定义你的缓存方案了，还好，Spring也想到了这一点。

我们先不考虑如何持久化缓存，毕竟这种第三方的实现方案很多，我们要考虑的是，怎么利用Spring提供的扩展点实现我们自己的缓存，且在不改原来已有代码的情况下进行扩展。这需要简单的三步骤，首先需要提供一个CacheManager接口的实现（继承至AbstractCacheManager），管理自身的cache实例；其次，实现自己的cache实例MyCache(继承至Cache)，在这里面引入我们需要的第三方cache或自定义cache；最后就是对配置项进行声明，将MyCache实例注入CacheManager进行统一管理。


#### 2.5.2 用户自定义注解缓存(基于Spring注解)

> 以下是美团酒店商家端使用自定义的缓存注解的方案

注解缓存的使用，可以有效增强应用代码的可读性，同时统一管理缓存，提供较好的可扩展性，为此，酒店商家端在Spring注解缓存基础上，自定义了适合自身业务特性的注解缓存。

主要使用两个标签，即@HotelCacheable、@HotelCacheEvict，其作用和配置方法见下表。

| 标签类型         | 作用                                                     | 主要配置参数说明                                             |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| @HotelCacheable  | 主要针对方法配置，能够根据方法的请求参数对其结果进行缓存 | domain：作用域，针对集合场景，解决批量更新问题； domainKey：作用域对应的缓存key； key：缓存对象key 前缀； fieldKey：缓存对象key，与前缀合并生成对象key； condition：缓存获取前置条件，支持spel语法； cacheCondition：缓存刷入前置条件，支持spel语法； expireTime：超时时间设置 |
| @HotelCacheEvict | 主要针对方法配置，能够根据一定的条件对缓存进行清空       | 同上                                                         |

增加作用域的概念，解决商家信息变更下，多重重要信息实时更新的问题。

![image-20220629222925466](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629222925466.png)

图13 域缓存处理图

如图13，按旧的方案，当cache0发送变化时，为了保持信息的实时更新，需要手动删除cache1、cache2、cache3等相关处的缓存数据。增加域缓存概念，cache0、cache1、cache2、cache3是以账号ID为基础，相互存在影响约束的集合体，我们作为一个域集合，增加域缓存处理，当cache0发送变化时，整体的账号ID domain域已发生更新，自动影响cache1、cache2、cache3等处的缓存数据。将相关联逻辑缓存统一化，有效提升代码可读性，同时更好服务业务，账号重点信息能够实时变更刷新，相关服务响应速度提升。

另外，增加了cacheCondition缓存刷入前置判断，有效解决商家业务多重外部依赖场景下，业务降级有损服务下，业务数据一致性保证，不因为缓存的增加影响业务的准确性；自定义CacheManager缓存管理器，可以有效兼容公共基础组件Medis、Cellar相关服务，在对应用程序不做改动的情况下，有效切换缓存方式；同时，统一的缓存服务AOP入口，结合接入Mtconfig统一配置管理，对应用内缓存做好降级准备，一键关闭缓存。几点建议：

- 上面介绍过Spring Cache的原理是基于动态生成的proxy代理机制来进行切面处理，关键点是对象的引用问题，如果对象的方法是类里面的内部调用（this引用）而不是外部引用的场景下，会导致proxy失败，那么我们所做的缓存切面处理也就失效了。因此，应避免已注解缓存的方法在类里面的内部调用。
- 使用的key约束，缓存的key应尽量使用简单的可区别的元素，如ID、名称等，不能使用list等容器的值，或者使用整体model对象的值。非public方法无法使用注解缓存实现。

> 总之，注释驱动的Spring Cache能够极大的减少我们编写常见缓存的代码量，通过少量的注释标签和配置文件，即可达到使代码具备缓存的能力，且具备很好的灵活性和扩展性。但是我们也应该看到，Spring Cache由于基于Spring AOP技术，尤其是动态的proxy技术，导致其不能很好的支持方法的内部调用或者非public方法的缓存设置，当然这些都是可以解决的问题。

## 3.高并发缓存问题

### 3.1 缓存一致性问题

当数据时效性要求很高时，需要保证缓存中的数据与数据库中的保持一致，而且需要保证缓存节点和副本中的数据也保持一致，不能出现差异现象。这就比较依赖缓存的过期和更新策略。一般会在**数据发生更改的时，主动更新缓存中的数据或者移除对应的缓存**。

### 3.2 缓存并发问题

缓存过期后将尝试从后端数据库获取数据，这是一个看似合理的流程。但是，在高并发场景下，有可能多个请求并发的去从数据库获取数据，对后端数据库造成极大的冲击，甚至导致 “雪崩”现象。此外，当某个缓存key在被更新时，同时也可能被大量请求在获取，这也会导致一致性的问题。那如何避免类似问题呢? 我们会想到**类似“锁” 的机制**，在缓存更新或者过期的情况下，先尝试获取到锁，当更新或者从数据库获取完成后再释放锁，其他的请求只需要牺牲一定的等待时间，即可直接从缓存中继续获取数据。

### 3.3 缓存穿透问题

缓存穿透在有些地方也称为“击穿”。很多朋友对缓存穿透的理解是：由于缓存故障或者缓存过期导致大量请求穿透到后端数据库服务器，从而对数据库造成巨大冲击。

这其实是一种误解。真正的缓存穿透应该是这样的：

在高并发场景下，如果某一个key被高并发访问，没有被命中，出于对容错性考虑，会尝试去从后端数据库中获取，从而导致了大量请求达到数据库，而当该key对应的数据本身就是空的情况下，这就导致数据库中并发的去执行了很多不必要的查询操作，从而导致巨大冲击和压力。

可以通过下面的几种常用方式来避免缓存传统问题：

- **缓存空对象**

对查询结果为空的对象也进行缓存，如果是集合，可以缓存一个空的集合（非null），如果是缓存单个对象，可以通过字段标识来区分。这样避免请求穿透到后端数据库。同时，也需要保证缓存数据的时效性。这种方式实现起来成本较低，比较适合命中不高，但可能被频繁更新的数据。

- 单独过滤处理

对所有可能对应数据为空的key进行统一的存放，并在请求前做拦截，这样避免请求穿透到后端数据库。这种方式实现起来相对复杂，比较适合命中不高，但是更新不频繁的数据。

### 3.4 缓存抖动问题

缓存抖动可以看做是一种比“雪崩”更轻微的故障，但是也会在一段时间内对系统造成冲击和性能影响。一般是由于缓存节点故障导致。业内推荐的做法是**通过一致性Hash算法来解决**。这里不做过多阐述。

### 3.5 缓存雪崩问题

缓存雪崩就是指由于缓存的原因，导致大量请求到达后端数据库，从而导致数据库崩溃，整个系统崩溃，发生灾难。导致这种现象的原因有很多种，上面提到的“缓存并发”，“缓存穿透”，“缓存颠簸”等问题，其实都可能会导致缓存雪崩现象发生。这些问题也可能会被恶意攻击者所利用。还有一种情况，例如某个时间点内，系统预加载的缓存周期性集中失效了，也可能会导致雪崩。为了避免这种周期性失效，可以通过设置不同的过期时间，来错开缓存过期，从而避免缓存集中失效。

从应用架构角度，我们可以通过限流、降级、熔断等手段来降低影响，也可以通过多级缓存来避免这种灾难。

此外，从整个研发体系流程的角度，应该加强压力测试，尽量模拟真实场景，尽早的暴露问题从而防范。


## 4. 合理利用缓存

不合理使用缓存非但不能提高系统的性能，还会成为系统的累赘，甚至风险。

### 4.1 频繁修改的数据

如果缓存中保存的是频繁修改的数据，就会出现数据写入缓存后，应用还来不及读取缓存，数据就已经失效，徒增系统负担。一般来说，数据的读写比在2：1（写入一次缓存，在数据更新前至少读取两次）以上，缓存才有意义。

### 4.2 没有热点的访问

如果应用系统访问数据没有热点，不遵循二八定律，那么缓存就没有意义。

### 4.3 数据不一致与脏读

一般会对缓存的数据设置失效时间，一旦超过失效时间，就要从数据库中重新加载。因此要容忍一定时间的数据不一致，如卖家已经编辑了商品属性，但是需要过一段时间才能被买家看到。还有一种策略是数据更新立即更新缓存，不过这也会带来更多系统开销和事务一致性问题。

### 4.4 缓存可用性

缓存会承担大部分数据库访问压力，数据库已经习惯了有缓存的日子，所以当缓存服务崩溃时，数据库会因为完全不能承受如此大压力而宕机，导致网站不可用。这种情况被称作缓存雪崩，发生这种故障，甚至不能简单地重启缓存服务器和数据库服务器来恢复。

实践中，有的网站通过缓存热备份等手段提高缓存可用性：当某台缓存服务器宕机时，将缓存访问切换到热备服务器上。但这种设计有违缓存的初衷，缓存根本就不应该当做一个可靠的数据源来使用。

通过分布式缓存服务器集群，将缓存数据分布到集群多台服务器上可在一定程度上改善缓存的可用性。当一台缓存服务器宕机时，只有部分缓存数据丢失，重新从数据库加载这部分数据不会产生很大的影响。

### 4.5 缓存预热（warm up）

缓存中存放的是热点数据，热点数据又是缓存系统利用LRU（最近最久未用算法）对不断访问的数据筛选淘汰出来，这个过程需要花费较长的时间。新系统的缓存系统如果没有任何数据，在重建缓存数据的过程中，系统的性能和数据库负载都不太好，那么最好在缓存系统启动时就把热点数据加载好，这个缓存预加载手段叫缓存预热。对于一些元数据如城市地名列表、类目信息，可以在启动时加载数据库中全部数据到缓存进行预热。

### 4.6 避免缓存穿透

如果因为不恰当的业务、或者恶意攻击持续高并发地请求某个不存在的数据，由于缓存没有保存该数据，所有的请求都会落到数据库上，会对数据库造成压力，甚至崩溃。一个简单的对策是将不存在的数据也缓存起来(其value为null)。

## 参考文章

[**架构之高并发：缓存**](https://pdai.tech/md/arch/arch-y-cache.html)