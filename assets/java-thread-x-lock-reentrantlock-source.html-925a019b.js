import{_ as a,W as e,X as t,Y as n,Z as i,$ as c,a0 as l,D as o}from"./framework-0cf5f349.js";const p={},r=l(`<h1 id="reentrantlock源码分析-一-整体流程" tabindex="-1"><a class="header-anchor" href="#reentrantlock源码分析-一-整体流程" aria-hidden="true">#</a> ReentrantLock源码分析(一)-整体流程</h1><h2 id="_1-类的继承关系" tabindex="-1"><a class="header-anchor" href="#_1-类的继承关系" aria-hidden="true">#</a> 1. 类的继承关系</h2><p><strong>ReentrantLock</strong> 实现了 <strong>Lock</strong>接口，<strong>Lock</strong>接口中定义了 <strong>lock</strong>与 <strong>unlock</strong>相关操作，并且还存在 <strong>newCondition</strong>方法，表示生成一个条件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ReentrantLock implements Lock, java.io.Serializable {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520160834560.png" alt="image-20220520160834560" tabindex="0" loading="lazy"><figcaption>image-20220520160834560</figcaption></figure><h2 id="_2-类的内部类" tabindex="-1"><a class="header-anchor" href="#_2-类的内部类" aria-hidden="true">#</a> 2. 类的内部类</h2><p><strong>ReentrantLock</strong> 总共有三个内部类，并且三个内部类是紧密相关的，下面先看三个类的关系。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520161909794.png" alt="image-20220520161909794" tabindex="0" loading="lazy"><figcaption>image-20220520161909794</figcaption></figure><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520161943656.png" alt="image-20220520161943656" tabindex="0" loading="lazy"><figcaption>image-20220520161943656</figcaption></figure><blockquote><p><strong>说明：ReentrantLock</strong> 类内部总共存在<strong>Sync</strong>、<strong>NonfairSync</strong>、<strong>FairSync</strong>三个类，<strong>NonfairSync</strong>与 <strong>FairSync</strong>类继承自 <strong>Sync</strong>类，<strong>Sync</strong>类继承自 <strong>AbstractQueuedSynchronizer</strong>抽象类。下面逐个进行分析。</p></blockquote><h2 id="_3-aqs自定义同步器" tabindex="-1"><a class="header-anchor" href="#_3-aqs自定义同步器" aria-hidden="true">#</a> 3. AQS自定义同步器</h2><h3 id="_3-1-abstractqueuedsynchronizer-抽象类核心方法" tabindex="-1"><a class="header-anchor" href="#_3-1-abstractqueuedsynchronizer-抽象类核心方法" aria-hidden="true">#</a> 3.1 AbstractQueuedSynchronizer 抽象类核心方法</h3><p>AQS提供了大量用于自定义同步器实现的 Protected方法。自定义同步器实现的相关方法也只是为了通过修改 State字段来实现多线程的独占模式或者共享模式。自定义同步器需要实现以下方法（ReentrantLock需要实现的方法如下，并不是全部）：</p><table><thead><tr><th>方法名</th><th>描述</th></tr></thead><tbody><tr><td>protected boolean isHeldExclusively()</td><td>该线程是否正在独占资源。只有用到Condition才需要去实现它。</td></tr><tr><td>protected boolean tryAcquire(int arg)</td><td>独占方式。arg为获取锁的次数，尝试获取资源，成功则返回True，失败则返回False。</td></tr><tr><td>protected boolean tryRelease(int arg)</td><td>独占方式。arg为释放锁的次数，尝试释放资源，成功则返回True，失败则返回False。</td></tr><tr><td>protected int tryAcquireShared(int arg)</td><td>共享方式。arg为获取锁的次数，尝试获取资源。负数表示失败；0表示成功，但没有剩余可用资源；正数表示成功，且有剩余资源。</td></tr><tr><td>protected boolean tryReleaseShared(int arg)</td><td>共享方式。arg为释放锁的次数，尝试释放资源，如果释放后允许唤醒后续等待结点返回True，否则返回False。</td></tr></tbody></table><p>一般来说，自定义同步器要么是独占方式，要么是共享方式，它们也只需实现tryAcquire-tryRelease、tryAcquireShared-tryReleaseShared中的一种即可。AQS也支持自定义同步器同时实现独占和共享两种方式，如ReentrantReadWriteLock。ReentrantLock是独占锁，所以实现了tryAcquire-tryRelease。以非公平锁为例，这里主要阐述一下非公平锁与AQS之间方法的关联之处，具体每一处核心方法的作用会在文章后面详细进行阐述。 <img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520162627423.png" alt="image-20220520162627423" loading="lazy"></p><h3 id="_3-2-sync-类的源码" tabindex="-1"><a class="header-anchor" href="#_3-2-sync-类的源码" aria-hidden="true">#</a> 3.2 <strong>Sync 类的源码</strong></h3><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code> abstract static class Sync extends AbstractQueuedSynchronizer {
     // 序列号
     private static final long serialVersionUID = -5179523762034025860L;
     
     // 获取锁
     abstract void lock();
     
     // 非公平方式获取
     final boolean nonfairTryAcquire(int acquires) {
         // 当前线程
         final Thread current = Thread.currentThread();
         // 获取状态
         int c = getState();
         if (c == 0) { // 表示没有线程正在竞争该锁
             if (compareAndSetState(0, acquires)) { // 比较并设置状态成功，状态0表示锁没有被占用
                 // 设置当前线程独占
                 setExclusiveOwnerThread(current); 
                 return true; // 成功
             }
         }
         else if (current == getExclusiveOwnerThread()) { // 当前线程拥有该锁
             int nextc = c + acquires; // 增加重入次数
             if (nextc &lt; 0) // overflow
                 throw new Error(&quot;Maximum lock count exceeded&quot;);
             // 设置状态
             setState(nextc); 
             // 成功
             return true; 
         }
         // 失败
         return false;
     }
     
     // 试图在共享模式下获取对象状态，此方法应该查询是否允许它在共享模式下获取对象状态，如果允许，则获取它
     protected final boolean tryRelease(int releases) {
         int c = getState() - releases;
         if (Thread.currentThread() != getExclusiveOwnerThread()) // 当前线程不为独占线程
             throw new IllegalMonitorStateException(); // 抛出异常
         // 释放标识
         boolean free = false; 
         if (c == 0) {
             free = true;
             // 已经释放，清空独占
             setExclusiveOwnerThread(null); 
         }
         // 设置标识
         setState(c); 
         return free; 
     }
     
     // 判断资源是否被当前线程占有
     protected final boolean isHeldExclusively() {
         return getExclusiveOwnerThread() == Thread.currentThread();
     }
 
     // 新生一个条件
     final ConditionObject newCondition() {
         return new ConditionObject();
     }
 
     // 返回资源的占用线程
     final Thread getOwner() {        
         return getState() == 0 ? null : getExclusiveOwnerThread();
     }
     // 返回状态
     final int getHoldCount() {            
         return isHeldExclusively() ? getState() : 0;
     }
 
     // 资源是否被占用
     final boolean isLocked() {        
         return getState() != 0;
     }
 
     // 自定义反序列化逻辑
     private void readObject(java.io.ObjectInputStream s)
         throws java.io.IOException, ClassNotFoundException {
         s.defaultReadObject();
         setState(0); // reset to unlocked state
     }
 }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-nonfairsync-类的源码" tabindex="-1"><a class="header-anchor" href="#_3-3-nonfairsync-类的源码" aria-hidden="true">#</a> 3.3 NonfairSync 类的源码</h3><p>NonfairSync 类继承了 Sync类，表示采用非公平策略获取锁，其实现了 Sync类中抽象的 lock方法，源码如下：从 lock方法的源码可知，每一次都尝试获取锁，而并不会按照公平等待的原则进行等待，让等待时间最久的线程获得锁。Acquire方法是 FairSync和 UnfairSync的父类 AQS中的核心方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token comment">// 非公平锁</span>
 <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">NonfairSync</span> <span class="token keyword">extends</span> <span class="token class-name">Sync</span> <span class="token punctuation">{</span>
     <span class="token comment">// 版本号</span>
     <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">7316153563782823691L</span><span class="token punctuation">;</span>
 
     <span class="token comment">// 获得锁</span>
     <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token doc-comment comment">/**
          * 若通过CAS设置变量State（同步状态）成功，也就是获取锁成功，则将当前线程设置为独占线程。
          * 若通过CAS设置变量State（同步状态）失败，也就是获取锁失败，则进入Acquire方法进行后续处理。
          */</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 比较并设置状态成功，状态0表示锁没有被占用</span>
             <span class="token comment">// 把当前线程设置独占了锁</span>
             <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">else</span> <span class="token comment">// 锁已经被占用，或者set失败</span>
             <span class="token comment">// 以独占模式获取对象，忽略中断</span>
             <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Acquire方法是FairSync和UnfairSync的父类AQS中的核心方法。</span>
     <span class="token punctuation">}</span>
 
     <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> acquires<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token function">nonfairTryAcquire</span><span class="token punctuation">(</span>acquires<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-fairsync-类源码" tabindex="-1"><a class="header-anchor" href="#_3-4-fairsync-类源码" aria-hidden="true">#</a> 3.4 <strong>FairSync</strong> 类源码</h3><p><strong>FairSync</strong> 类也继承了 <strong>Sync</strong>类，表示采用公平策略获取锁，其实现了 <strong>Sync</strong>类中的抽象 <strong>lock</strong>方法，源码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token comment">// 公平锁</span>
 <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">FairSync</span> <span class="token keyword">extends</span> <span class="token class-name">Sync</span> <span class="token punctuation">{</span>
     <span class="token comment">// 版本序列化</span>
     <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3000897897090466540L</span><span class="token punctuation">;</span>
 
     <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 以独占模式获取对象，忽略中断</span>
         <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
 
     <span class="token comment">// 尝试公平获取锁</span>
     <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> acquires<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 获取当前线程</span>
         <span class="token keyword">final</span> <span class="token class-name">Thread</span> current <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">// 获取状态</span>
         <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 状态为0</span>
             <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasQueuedPredecessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                 <span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> acquires<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 不存在已经等待更久的线程并且比较并且设置状态成功</span>
                 <span class="token comment">// 设置当前线程独占</span>
                 <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
                 <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">==</span> <span class="token function">getExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 状态不为0，即资源已经被线程占据</span>
             <span class="token comment">// 下一个状态</span>
             <span class="token keyword">int</span> nextc <span class="token operator">=</span> c <span class="token operator">+</span> acquires<span class="token punctuation">;</span>
             <span class="token keyword">if</span> <span class="token punctuation">(</span>nextc <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// 超过了int的表示范围</span>
                 <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;Maximum lock count exceeded&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token comment">// 设置状态</span>
             <span class="token function">setState</span><span class="token punctuation">(</span>nextc<span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跟踪 lock方法的源码可知，当资源空闲时，它总是会先判断 sync队列(AbstractQueuedSynchronizer中的数据结构)是否有等待时间更长的线程，如果存在，则将该线程加入到等待队列的尾部，实现了公平获取原则。其中，FairSync 类的 lock的方法调用如下，只给出了主要的方法。 <img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520164554009.png" alt="image-20220520164554009" loading="lazy"></p><blockquote><p>可以看出只要资源被其他线程占用，该线程就会添加到 <strong>sync queue</strong>中的尾部，而不会先尝试获取资源。这也是和 Nonfair最大的区别，Nonfair每一次都会尝试去获取资源，如果此时该资源恰好被释放，则会被当前线程获取，这就造成了不公平的现象，当获取不成功，再加入队列尾部。</p></blockquote><h3 id="_3-5-reentrantlock和-aqs之间方法的交互过程" tabindex="-1"><a class="header-anchor" href="#_3-5-reentrantlock和-aqs之间方法的交互过程" aria-hidden="true">#</a> 3.5 ReentrantLock和 AQS之间方法的交互过程</h3><p>为了帮助大家理解 ReentrantLock和 AQS之间方法的交互过程，以非公平锁为例，我们将加锁和解锁的交互流程单独拎出来强调一下，以便于对后续内容的理解。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520164654656.png" alt="image-20220520164654656" tabindex="0" loading="lazy"><figcaption>image-20220520164654656</figcaption></figure><h4 id="_3-5-1-加锁" tabindex="-1"><a class="header-anchor" href="#_3-5-1-加锁" aria-hidden="true">#</a> 3.5.1 加锁：</h4><ul><li>通过ReentrantLock的加锁方法Lock进行加锁操作。</li><li>会调用到内部类Sync的Lock方法，由于Sync#lock是抽象方法，根据ReentrantLock初始化选择的公平锁和非公平锁，执行相关内部类的Lock方法，本质上都会执行AQS的Acquire方法。</li><li>AQS的Acquire方法会执行tryAcquire方法，但是由于tryAcquire需要自定义同步器实现，因此执行了ReentrantLock中的tryAcquire方法，由于ReentrantLock是通过公平锁和非公平锁内部类实现的tryAcquire方法，因此会根据锁类型不同，执行不同的tryAcquire。</li><li>tryAcquire是获取锁逻辑，获取失败后，会执行框架 AQS的后续逻辑，跟ReentrantLock自定义同步器无关。</li></ul><h4 id="_3-5-2-解锁" tabindex="-1"><a class="header-anchor" href="#_3-5-2-解锁" aria-hidden="true">#</a> 3.5.2 解锁：</h4><ul><li>通过 ReentrantLock的解锁方法 Unlock进行解锁。</li><li>Unlock会调用内部类 Sync的 Release方法，该方法继承于AQS。</li><li>Release中会调用 tryRelease方法，tryRelease需要自定义同步器实现，tryRelease只在ReentrantLock中的Sync实现，因此可以看出，释放锁的过程，并不区分是否为公平锁。</li><li>释放成功后，所有处理由AQS框架完成，与自定义同步器无关。</li></ul><h4 id="_3-5-3-核心映射关系" tabindex="-1"><a class="header-anchor" href="#_3-5-3-核心映射关系" aria-hidden="true">#</a> 3.5.3 核心映射关系</h4><p>通过上面的描述，大概可以总结出 ReentrantLock加锁解锁时 API层核心方法的映射关系。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220520164936659.png" alt="image-20220520164936659" tabindex="0" loading="lazy"><figcaption>image-20220520164936659</figcaption></figure><h2 id="_4-类的属性" tabindex="-1"><a class="header-anchor" href="#_4-类的属性" aria-hidden="true">#</a> 4. 类的属性</h2><p><strong>ReentrantLock</strong> 类的 <strong>sync</strong>非常重要，对<strong>ReentrantLock</strong> 类的操作大部分都直接转化为对 <strong>sync</strong>和 <strong>AQS</strong>类的操作。</p><blockquote><p>ReentrantLock-&gt;sync-&gt;FairSync/NonfairSync -&gt;AQS</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReentrantLock</span> <span class="token keyword">implements</span> <span class="token class-name">Lock</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span> <span class="token punctuation">{</span>
    <span class="token comment">// 序列号</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">7373984872572414699L</span><span class="token punctuation">;</span>    
    <span class="token comment">// 同步队列</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Sync</span> sync<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">abstract</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Sync</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractQueuedSynchronizer</span> <span class="token punctuation">{</span>
       
        <span class="token doc-comment comment">/**
         * 获取锁
         */</span>
        <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
  	<span class="token doc-comment comment">/**
     * 公平锁
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">FairSync</span> <span class="token keyword">extends</span> <span class="token class-name">Sync</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3000897897090466540L</span><span class="token punctuation">;</span>

        <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 以独占模式获取对象，忽略中断</span>
          	<span class="token comment">// aqs 的 acquire 方法</span>
            <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  
   <span class="token doc-comment comment">/**
     * 非公平锁
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">NonfairSync</span> <span class="token keyword">extends</span> <span class="token class-name">Sync</span> <span class="token punctuation">{</span>

        <span class="token doc-comment comment">/**
         * 获得锁
         */</span>
        <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">compareAndSetState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token comment">// 把当前线程设置独占了锁（aqs 方法）</span>
                <span class="token function">setExclusiveOwnerThread</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span><span class="token comment">// 锁已经被占用，或者set失败</span>
                <span class="token comment">// 以独占模式获取对象，忽略中断（aqs 方法）</span>
                <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-类的构造函数" tabindex="-1"><a class="header-anchor" href="#_5-类的构造函数" aria-hidden="true">#</a> 5. 类的构造函数</h2><h3 id="_5-1-默认构造函数" tabindex="-1"><a class="header-anchor" href="#_5-1-默认构造函数" aria-hidden="true">#</a> 5.1 默认构造函数</h3><p><strong>ReentrantLock 构造函数：<strong>默认是采用的</strong>非公平</strong>策略获取锁</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 默认非公平策略</span>
    sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NonfairSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-指定锁构造函数" tabindex="-1"><a class="header-anchor" href="#_5-2-指定锁构造函数" aria-hidden="true">#</a> 5.2 指定锁构造函数</h3><p>可以传递参数确定采用公平策略或者是非公平策略，参数为 true表示公平策略，否则，采用非公平策略。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> fair<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sync <span class="token operator">=</span> fair <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">FairSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">NonfairSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-核心函数分析" tabindex="-1"><a class="header-anchor" href="#_6-核心函数分析" aria-hidden="true">#</a> 6. 核心函数分析</h2><p>通过分析 ReentrantLock的源码，可知对其<strong>操作都转化为对 Sync对象的操作，由于 Sync继承了 AQS，所以基本上都可以转化为对 AQS的操作</strong>。如将 ReentrantLock的 lock函数转化为对 Sync的 lock函数的调用，而具体会根据采用的策略(如公平策略或者非公平策略)的不同而调用到 Sync的不同子类。所以可知，在 ReentrantLock的背后，是 AQS对其服务提供了支持。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,49),d={href:"https://blog.csdn.net/zhengzhaoyang122/article/details/110847701",target:"_blank",rel:"noopener noreferrer"};function u(k,v){const s=o("ExternalLinkIcon");return e(),t("div",null,[r,n("p",null,[n("a",d,[i("ReentrantLock 锁详解"),c(s)])])])}const b=a(p,[["render",u],["__file","java-thread-x-lock-reentrantlock-source.html.vue"]]);export{b as default};
