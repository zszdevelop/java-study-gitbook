---
order: 121
category:
  - Java
  - JVM

---

# GC - Java 垃圾回收器之G1（补充）

## 1. 前言

>G1:满足高吞吐量的同时满足GC停顿的时间尽可能短

G1收集器是一款在server端运行的垃圾收集器，专门针对于拥有多核处理器和大内存的机器，在JDK 7u4版本发行时被正式推出，在JDK9中更被指定为官方GC收集器。**它满足高吞吐量的同时满足GC停顿的时间尽可能短**。

### 1.1. G1 优势

 G1收集器专门针对以下应用场景设计

- 可以像CMS收集器一样可以和应用并发运行
- 压缩空闲的内存碎片，却不需要冗长的GC停顿
- 对GC停顿可以做更好的预测
- 不想牺牲大量的吞吐量性能
- 不需要更大的Java Heap

> Can operate concurrently with applications threads like the CMS collector.
> Compact free space without lengthy GC induced pause times.
> Need more predictable GC pause durations.
> Do not want to sacrifice a lot of throughput performance.
> Do not require a much larger Java heap.

### 1.2 与CMS不同点

G1从长期计划来看是以取代CMS为目标。与CMS相比有几个不同点使得G1成为GC的更好解决方案。

- 第一点：G1会压缩空闲内存使之足够紧凑，做法**是用regions代替细粒度的空闲列表进行分配**，减少内存碎片的产生。
- 第二点：G1的STW更可控，G1在停顿时间上添加了**预测机制**，用户可以指定期望停顿时间。

> G1 is planned as the long term replacement for the Concurrent Mark-Sweep Collector (CMS). Comparing G1 with CMS, there are differences that make G1 a better solution. One difference is that G1 is a compacting collector. G1 compacts sufficiently to completely avoid the use of fine-grained free lists for allocation, and instead relies on regions. This considerably simplifies parts of the collector, and mostly eliminates potential fragmentation issues. Also, G1 offers more predictable garbage collection pauses than the CMS collector, and allows users to specify desired pause targets.

## 2. 概览

在传统的GC收集器(serial,parallel,CMS)无一不例外都把heap分成固定大小连续的三个空间：young generation, old generation, and permanent generation

![image-20221209111945943](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221209111945943.png)

但G1却独辟蹊径，采用了一种全新的内存布局

![image-20221209112005861](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221209112005861.png)

在G1中堆被分成一块块大小相等的heap region，一般有2000多块，这些region在逻辑上是连续的。每块region都会被打唯一的分代标志(eden,survivor,old)。在逻辑上，eden regions构成Eden空间，survivor regions构成Survivor空间，old regions构成了old 空间。

### 2.1 分区region 各区比例

通过命令行参数

- `-XX:NewRatio=n`来配置新生代与老年代的比例，默认为2，即比例为2:1；
- `XX:SurvivorRatio=n`则可以配置Eden与Survivor的比例，默认为8。

### 2.2 为什么叫G1（全局并发标记->优先回收）

> 全局并发标记->可回收对象多->优先回收

GC时G1的运行方式与CMS方式类似，会有一个全局并发标记(concurrent global marking phase)的过程，去确定堆里对象的的存活情况。并发标记完成之后，G1知道哪些regions空闲空间多(可回收对象多),优先回收这些空的regions，释放出大量的空闲空间。这是为什么这种垃圾回收方式叫G1的原因(Garbage-First)。

### 2.3 暂停预测模型

G1将其收集和压缩活动集中在堆中可能充满可回收对象(即垃圾)的区域，使用暂停预测模型来满足用户定义的暂停时间目标，并根据指定的暂停时间目标选择要收集的区域数量。

需要注意的是，G1不是实时收集器。它能够以较高的概率满足设定的暂停时间目标，但不是绝对确定的。根据以前收集的数据，G1估算出在用户指定的目标时间内可以收集多少个区域。因此，收集器对于收集区域的成本有一个相当准确的模型，它使用这个模型来确定在暂停时间目标内收集哪些区域和收集多少区域。

> It is important to note that G1 is not a real-time collector. It meets the set pause time target with high probability but not absolute certainty. Based on data from previous collections, G1 does an estimate of how many regions can be collected within the user specified target time. Thus, the collector has a reasonably accurate model of the cost of collecting the regions, and it uses this model to determine which and how many regions to collect while staying within the pause time target.

## 3. G1中的Region

G1中每个Region大小是固定相等的，Region的大小可以通过参数-XX:G1HeapRegionSize设定，取值范围从1M到32M，且是2的指数。如果不设定，那么G1会根据Heap大小自动决定。

决定逻辑:

`size =（堆最小值+堆最大值）/ TARGET_REGION_NUMBER(2048)` ，然后size取最靠近2的幂次数值， 并将size控制在[1M,32M]之间。具体代码如下

```cpp
// share/vm/gc_implementation/g1/heapRegion.cpp
// Minimum region size; we won't go lower than that.
// We might want to decrease this in the future, to deal with small
// heaps a bit more efficiently.
#define MIN_REGION_SIZE  (      1024 * 1024 )
// Maximum region size; we don't go higher than that. There's a good
// reason for having an upper bound. We don't want regions to get too
// large, otherwise cleanup's effectiveness would decrease as there
// will be fewer opportunities to find totally empty regions after
// marking.
#define MAX_REGION_SIZE  ( 32 * 1024 * 1024 )
// The automatic region size calculation will try to have around this
// many regions in the heap (based on the min heap size).
#define TARGET_REGION_NUMBER          2048
void HeapRegion::setup_heap_region_size(size_t initial_heap_size, size_t max_heap_size) {
  uintx region_size = G1HeapRegionSize;
  if (FLAG_IS_DEFAULT(G1HeapRegionSize)) {
    size_t average_heap_size = (initial_heap_size + max_heap_size) / 2;
    region_size = MAX2(average_heap_size / TARGET_REGION_NUMBER,
                       (uintx) MIN_REGION_SIZE);
  }
  int region_size_log = log2_long((jlong) region_size);
  // Recalculate the region size to make sure it's a power of
  // 2. This means that region_size is the largest power of 2 that's
  // <= what we've calculated so far.
  region_size = ((uintx)1 << region_size_log);
  // Now make sure that we don't go over or under our limits.
  if (region_size < MIN_REGION_SIZE) {
    region_size = MIN_REGION_SIZE;
  } else if (region_size > MAX_REGION_SIZE) {
    region_size = MAX_REGION_SIZE;
  }
}
```

## 4. G1中的GC收集

**G1保留了YGC并加上了一种全新的MIXGC用于收集老年代。G1中没有Full GC，G1中的Full GC是采用serial old Full GC。**

> Q:理解不了“G1中没有Full GC，G1中的Full GC是采用serial old Full GC。“这句话，不是说没有Full GC吗
>
> A1: G1中实际是有full gc的只是非常慢，所以g1的优化目标是尽量避免full gc，因此才有如上说法
>
> A2:如果mixed GC实在无法跟上程序分配内存的速度，导致old gen填满无法继续进行mixed GC，就会切换到"G1之外的serial old GC"来收集整个GC heap（注意，包括young、old、perm）。这才是真正的full GC。Full GC之所以叫full就是要收集整个堆，只选择old gen的部分region算不上full GC。进入这种状态的G1就跟-XX:+UseSerialGC的full GC一样

## 5.YGC

当Eden空间被占满之后，就会触发YGC。在G1中YGC依然采用复制存活对象到survivor空间的方式，当对象的存活年龄满足晋升条件时，把对象提升到old generation regions(老年代)。

G1控制YGC开销的手段是动态改变young region的个数，YGC的过程中依然会STW(stop the world 应用停顿)，并采用多线程并发复制对象，减少GC停顿时间。

### 5.1 YGC开始

![image-20221209113334611](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221209113334611.png)

### 5.2 YGC结束

![image-20221209113401283](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221209113401283.png)

我们从图中看到Eden区中存活对象被复制到新的Survior区。

### 5.3 YGC是否需要扫描整个老年代？Rset

我们知道判断对象是否存活需要从GC ROOTS结点出发，从GC ROOTS结点可达的对象就是存活的。在YGC时，老年代中的对象是不回收的，也就意味着GC ROOTS里面应包含了老年代中的对象。**但扫描整个老年代会很耗费时间，势必影响整个GC的性能！**。所以在CMS中使用了Card Table的结构，里面记录了老年代对象到新生代引用。**Card Table的结构是一个连续的byte[]数组，扫描Card Table的时间比扫描整个老年代的代价要小很多！G1也参照了这个思路，不过采用了一种新的数据结构 Remembered Set 简称Rset。**RSet记录了其他Region中的对象引用本Region中对象的关系，属于points-into结构（谁引用了我的对象）。而Card Table则是一种points-out（我引用了谁的对象）的结构，每个Card 覆盖一定范围的Heap（一般为512Bytes）。G1的RSet是在Card Table的基础上实现的：每个Region会记录下别的Region有指向自己的指针，并标记这些指针分别在哪些Card的范围内。 这个RSet其实是一个Hash Table，Key是别的Region的起始地址，Value是一个集合，里面的元素是Card Table的Index。**每个Region都有一个对应的Rset**。

![image-20221209140929589](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221209140929589.png)

RSet究竟是怎么辅助GC的呢？在做YGC的时候，只需要选定young generation region的RSet作为根集，这些RSet记录了`old->young`的跨代引用，避免了扫描整个old generation。 而mixed gc的时候，old generation中记录了`old->old`的RSet，`young->old`的引用由扫描全部young generation region得到，这样也不用扫描全部old generation region。所以RSet的引入大大减少了GC的工作量。

**所以G1中YGC不需要扫描整个老年代，只需要扫描Rset就可以知道老年代引用了哪些新生代中的对象。**

## 6. MIXGC

G1中的MIXGC选定所有新生代里的Region，外加根据global concurrent marking统计得出收集收益高的若干老年代Region，在用户指定的开销目标范围内尽可能选择收益高的老年代Region进行回收。所以MIXGC回收的内存区域是新生代+老年代。

在介绍MIXGC之前我们需要先了解global concurrent marking，全局并发标记。因为老年代回收要依赖该过程。

### 6.1 全局并发标记

全局并发标记过程分为五个阶段

(1) Initial Mark初始标记 STW

Initial Mark初始标记是一个STW事件，其完成工作是标记GC ROOTS 直接可达的对象。并将它们的字段压入扫描栈（marking stack）中等到后续扫描。G1使用外部的bitmap来记录mark信息，而不使用对象头的mark word里的mark bit。因为 STW，所以通常YGC的时候借用YGC的STW顺便启动Initial Mark，也就是启动全局并发标记，全局并发标记与YGC在逻辑上独立。

> (1) Initial Mark
> *(Stop the World Event)*This is a stop the world event. With G1, it is piggybacked on a normal young GC. Mark survivor regions (root regions) which may have references to objects in old generation.

(2)Root Region Scanning 根区域扫描

根区域扫描是从Survior区的对象出发，标记被引用到老年代中的对象，并把它们的字段在压入扫描栈（marking stack）中等到后续扫描。与Initial Mark不一样的是，Root Region Scanning不需要STW与应用程序是并发运行。Root Region Scanning必须在YGC开始前完成。

> (2) Root Region Scanning
> Scan survivor regions for references into the old generation. This happens while the application continues to run. The phase must be completed before a young GC can occur.

(3)Concurrent Marking 并发标记

不需要STW。不断从扫描栈取出引用递归扫描整个堆里的对象。每扫描到一个对象就会对其标记，并将其字段压入扫描栈。重复扫描过程直到扫描栈清空。过程中还会扫描SATB write barrier所记录下的引用。Concurrent Marking 可以被YGC中断

> (3) Concurrent Marking
> Find live objects over the entire heap. This happens while the application is running. This phase can be interrupted by young generation garbage collections.

(4)Remark 最终标记 STW

STW操作。在完成并发标记后，每个Java线程还会有一些剩下的SATB write barrier记录的引用尚未处理。这个阶段就负责把剩下的引用处理完。同时这个阶段也进行弱引用处理（reference processing）。注意这个暂停与CMS的remark有一个本质上的区别，那就是这个暂停只需要扫描SATB buffer，而CMS的remark需要重新扫描mod-union table里的dirty card外加整个根集合，而此时整个young gen（不管对象死活）都会被当作根集合的一部分，因而CMS remark有可能会非常慢。

> (4) Remark
> Completes the marking of live object in the heap. Uses an algorithm called snapshot-at-the-beginning (SATB) which is much faster than what was used in the CMS collector.

(5)Cleanup 清除 STW AND *Concurrent*

STW操作，清点出有存活对象的Region和没有存活对象的Region(Empty Region)

STW操作，更新Rset

Concurrent操作，把Empty Region收集起来到可分配Region队列。

> (5) Cleanup
> Performs accounting on live objects and completely free regions. (Stop the world)
> Scrubs the Remembered Sets. (Stop the world)
> Reset the empty regions and return them to the free list. (Concurrent)

### 6.2 全局并发标记总结

**经过global concurrent marking，collector就知道哪些Region有存活的对象。并将那些完全可回收的Region(没有存活对象)收集起来加入到可分配Region队列，实现对该部分内存的回收。对于有存活对象的Region，G1会根据统计模型找处收益最高、开销不超过用户指定的上限的若干Region进行对象回收。这些选中被回收的Region组成的集合就叫做collection set 简称Cset！**

**在MIXGC中的Cset是选定所有young gen里的region，外加根据global concurrent marking统计得出收集收益高的若干old gen region。**

**在YGC中的Cset是选定所有young gen里的region。通过控制young gen的region个数来控制young GC的开销。**

**YGC与MIXGC都是采用多线程复制清除，整个过程会STW。 G1的低延迟原理在于其回收的区域变得精确并且范围变小了。**

### 6.3 STAB（维持并发GC的正确性）

上面global concurrent marking提到了STAB算法，那这个STAB到底为何物？STAB全称为snapshot-at-the-beginning，其目的是了维持并发GC的正确性。**GC的正确性是保证存活的对象不被回收，换句话来说就是保证回收的都是垃圾**。如果标记过程是STW的话，那GC的正确性是一定能保证的。但如果一边标记，一边应用在变更堆里面对象的引用，那么标记的正确性就不一定能保证了。

**为了解决这个问题，STAB的做法在GC开始时对内存进行一个对象图的逻辑快照(snapshot)，通过GC Roots tracing 参照并发标记的过程，只要被快照到对象是活的，那在整个GC的过程中对象就被认定的是活的，即使该对象的引用稍后被修改或者删除。同时新分配的对象也会被认为是活的，除此之外其它不可达的对象就被认为是死掉了。这样STAB就保证了真正存活的对象不会被GC误回收，但同时也造成了某些可以被回收的对象逃过了GC，导致了内存里面存在浮动的垃圾(float garbage)。**

### 6.4 STAB具体细节

每个Region中都有那么几个指针

`|<-- (1) -->|<-- (2) -->|<-- (3) -->|<-- (4) -->|`
bottom prevTAMS nextTAMS top end

其中top是该region的当前分配指针，[bottom, top)是当前该region已用（used）的部分，[top, end)是尚未使用的可分配空间（unused）。

(1): [bottom, prevTAMS): 这部分里的对象存活信息可以通过prevBitmap来得知

(2): [prevTAMS, nextTAMS): 这部分里的对象在第n-1轮concurrent marking是隐式存活的

(3): [nextTAMS, top): 这部分里的对象在第n轮concurrent marking是隐式存活的

为什么会用prevTAMS和nextTAMS两个指针？

因为G1的并发标记的过程用了两个bitmap：

一个prevBitmap记录第n-1轮concurrent mark所得的对象存活状态。由于第n－1轮concurrent marking已经完成，这个bitmap的信息可以直接使用。

一个nextBitmap记录第n轮concurrent mark的结果。这个bitmap是当前将要或正在进行的concurrent mark的结果，尚未完成，所以还不能使用。

所以Region会同时存在prevTAMS和nextTAMS两个指针，这两个指针是在 Initial Mark阶段就会设置好。

所以我们很容易知道哪些对象在一次GC开始之后新分配的：在TAMS以上的对象就是新分配的，因而被视为隐式marked，标记为存活。

切换到另外一个场景：如果在标记的过程中mark了某个对象但对象中某些引用这字段还没有被mark到,此时应用并发修改引用字段的值，那collecotr就拿不到完整的快照了，这不符合STAB的设想。

为了解决这个问题就有了SATB write barrier。G1 GC具体使用的是Yuasa式的SATB write barrier的变种。它的相关论文是：

- [Real-time garbage collection on general-purpose](https://link.zhihu.com/?target=http%3A//dl.acm.org/citation.cfm%3Fid%3D82237)

Write barrier是对“对引用类型字段赋值”这个动作的环切，也就是说赋值的前后都在barrier覆盖的范畴内。在赋值前的部分的write barrier叫做pre-write barrier，在赋值后的则叫做post-write barrier。

在HotSpot VM里，在引入G1 GC之前，其它GC都只用了post-write barrier，所以它在源码里没有特别的前后缀；而G1 GC特有的pre-write barrier则在源码里有_pre的后缀，可以留意一下。

```cpp
void oop_field_store(oop* field, oop value) {
  pre_write_barrier(field);
  *field = value; // the actual store
  post_write_barrier(field, value);
}
```

#### 6.4.1 Pre/Post-write barrier与SATB的关系

前面提到SATB要维持“在GC开始时活的对象”的状态这个逻辑snapshot。除了从root出发把整个对象图mark下来之外，其实只需要用pre-write barrier把每次引用关系变化时旧的引用值记下来就好了。这样，等concurrent marker到达某个对象时，这个对象的所有引用类型字段的变化全都有记录在案，就不会漏掉任何在snapshot里活的对象。当然，很可能有对象在snapshot中是活的，但随着并发GC的进行它可能本来已经死了，但SATB还是会让它活过这次GC。

所以在G1 GC里，整个write barrier+oop_field_store是这样的：

```cpp
void oop_field_store(oop* field, oop new_value) {
  pre_write_barrier(field);             // pre-write barrier: for maintaining SATB invariant
  *field = new_value;                   // the actual store
  post_write_barrier(field, new_value); // post-write barrier: for tracking cross-region reference
}
```

按照Yuasa式SATB barrier的设计，pre-write barrier里面的抽象逻辑应当如下：

```cpp
void pre_write_barrier(oop* field) {
  if ($gc_phase == GC_CONCURRENT_MARK) { // SATB invariant only maintained during concurrent marking
    oop old_value = *field;
    if (old_value != null && !is_marked(old_value)) {
      mark_object(old_value);
      $mark_stack->push(old_value); // scan all of old_value's fields later
    }
  }
}
```

这比原本的Yuasa式设计少了些东西：没有检查目标对象是否已经mark，也不去对目标对象做mark和扫描它的字段。实际上该做的事情还是得做，只是不在这里做而已。那放在那里做呢放到了后面的logging barrier，这个后面讲到。

Pre-write barrier的实际代码有好几个版本，其中最简单明白的版本是：

```cpp
  // This notes that we don't need to access any BarrierSet data
  // structures, so this can be called from a static context.
  template <class T> static void write_ref_field_pre_static(T* field, oop newVal) {
    T heap_oop = oopDesc::load_heap_oop(field);
    if (!oopDesc::is_null(heap_oop)) {
      enqueue(oopDesc::decode_heap_oop(heap_oop));
    }
  }
```

enqueue动作的实际代码则在G1SATBCardTableModRefBS::enqueue(oop pre_val)。

它判断当前是否在concurrent marking phase用的是：

```cpp
JavaThread::satb_mark_queue_set().is_active()  
```

#### 6.4.2 logging write barrier

为了尽量减少write barrier对应用mutator性能的影响，G1将一部分原本要在barrier里做的事情挪到别的线程上并发执行。
实现这种分离的方式就是通过logging形式的write barrier：mutator只在barrier里把要做的事情的信息记（log）到一个队列里，然后另外的线程从队列里取出信息批量完成剩余的动作。

以SATB write barrier为例，每个Java线程有一个独立的、定长的SATBMarkQueue，mutator在barrier里只把old_value压入该队列中。一个队列满了之后，它就会被加到全局的SATB队列集合SATBMarkQueueSet里等待处理，然后给对应的Java线程换一个新的、干净的队列继续执行下去。

并发标记（concurrent marker）会定期检查全局SATB队列集合的大小。当全局集合中队列数量超过一定阈值后，concurrent marker就会处理集合里的所有队列：把队列里记录的每个oop都标记上，并将其引用字段压到标记栈（marking stack）上等后面做进一步标记。

所以整个STAB过程讲完。

## 7. G1命令行选项与最佳实践

### 7.1 命令行选项

- **`-XX:+UseG1GC`** 告诉JVM使用G1收集器

- **-XX:MaxGCPauseMillis=200** 设置最大GC目标最大停顿时间为200ms，这是一个软指标。JVM会最大努力去达到它，因此有时停顿时间会达不到设置目标。G1配置是200ms

- **-XX:InitiatingHeapOccupancyPercent=45** 启动并发标记标记百分比，当整堆内存使用量达到百分比时，G1使用它来触发一个基于整个堆的并发标记循环，而不仅仅是一个代。默念值是45%

### 7.2 最佳实践

下面有几个关于使用G1的最佳实践

#### 7.2.1 **不要设置Young Generation大小**

因为显式通过-Xmn设置young generation大小将会干预G1收集器的默认行为

- G1将不再尊重设定的pause time,本质来说是因为设置young generation大小使得设定的pause time目标失效。
- G1不再能够根据需要扩展和收缩young generation的空间。由于大小是固定的，所以不能更改大小。

#### 7.2.2 **响应时间指标**

不要使用平均响应时间(ART)作为指标来设置`XX:MaxGCPauseMillis=<N>`，而要考虑设置90%以上时间都能达到目标的值。这意味着90%发出请求的用户不会经历高于目标的响应时间。记住，暂停时间是一个目标，并不能保证总能达到。

#### 7.2.3 **什么是Evacuation Failure**

当JVM在GC期间复制对象到Survior区或或者提升对象时，堆空间被耗尽，堆区域升级失败。堆无法扩展，因为它已经处于最大值。这种情况在-XX:+PrintGCDetails将会以TO空间溢出**(`to-space overflow`)**的形式表示。代价是十分昂贵的，因为

- GC仍然需要继续，所以必须释放空间
- 未成功复制的对象必须在适当的位置保留
- 对CSet中区域的rset的任何更新都必须重新生成
- 所有这些步骤都很昂贵。

#### 7.2.4 **如何避免Evacuation Failure**

为了避免Evacuation Failure，考虑以下选项。

- 增大堆（内存)大小

- - 增大**`-XX:G1ReservePercent=n`**，默认是10
  - G1会预留一部分内存，制造一个假天花板，当真正Evacuation Failure时还有内存可用。

- 早点启动标记周期

- 增大并行标记的线程数，使用**`-XX:ConcGCThreads=n`**选项。

### 7.3 完整的G1 GC开关列表

- -XX:+UseG1GC 使用G1 GC。
- -XX:MaxGCPauseMillis=n 设置最大GC停顿时间，这是一个软目标，JVM会尽最大努力去达到它。
- -XX:InitiatingHeapOccupancyPercent=n 启动并发标记循环的堆占用率的百分比，当整个堆的占用达到比例时，启动一个全局并发标记循环，0代表并发标记一直运行。默认值是45%。
- -XX:NewRatio=n 新生代和老年代大小的比例，默认是2。
- -XX:SurvivorRatio=n eden和survivor区域空间大小的比例，默认是8。
- -XX:MaxTenuringThreshold=n 晋升的阈值，默认是15（一个存活对象经历多少次GC周期之后晋升到老年代)。
- -XX:ParallelGCThreads=n 设置GC并发阶段的线程数，默认值与JVM运行平台相关。
- -XX:ConcGCThreads=n 设置并发标记的线程数，默认值与JVM运行平台相关。
- -XX:G1ReservePercent=n 设置保留java堆大小比例，用于防止晋升失败/Evacuation Failure,默认值是10%。
- -XX:G1HeapRegionSize=n 设置Region的大小，默认是根据堆的大小动态决定，大小范围是[1M,32M]

## 8. 总结

- G1把内存分成一块块的Region，每块的Region的大小都是一样的。
- G1保留了YGC并加上了一种全新的MIXGC用于收集老年代。G1中没有Full GC，G1中的Full GC是采用serial old Full GC。在MIXGC中的Cset是选定所有young gen里的region，外加根据global concurrent marking统计得出收集收益高的若干old gen region。在YGC中的Cset是选定所有young gen里的region。通过控制young gen的region个数来控制young GC的开销。YGC与MIXGC都是采用多线程复制清除，整个过程会STW。
- G1的低延迟原理在于其回收的区域变得精确并且范围变小了。
- 全局并发标记分的五个阶段。
- 用STAB来维持并发GC的准确性。
- 使用G1的最佳实践
- G1 GC日志打印

## 参考文章

[G1 收集器原理理解与分析](https://zhuanlan.zhihu.com/p/52841787)