import{_ as n,W as e,X as a,a0 as i}from"./framework-0cf5f349.js";const s={},l=i(`<h1 id="线程池的处理流程" tabindex="-1"><a class="header-anchor" href="#线程池的处理流程" aria-hidden="true">#</a> 线程池的处理流程</h1><h2 id="_1-处理流程" tabindex="-1"><a class="header-anchor" href="#_1-处理流程" aria-hidden="true">#</a> 1. 处理流程</h2><p>创建线程池需要使用ThreadPoolExecutor 类，他的构造函数参数如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>    <span class="token comment">//核心线程的数量</span>
                          <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>    <span class="token comment">//最大线程数量</span>
                          <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>    <span class="token comment">//超出核心线程数量以外的线程空余存活时间</span>
                          <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>    <span class="token comment">//存活时间的单位</span>
                          <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> workQueue<span class="token punctuation">,</span>    <span class="token comment">//保存待执行任务的队列</span>
                          <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>    <span class="token comment">//创建新线程使用的工厂</span>
                          <span class="token class-name">RejectedExecutionHandler</span> handler <span class="token comment">// 当任务无法执行时的处理器</span>
                          <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数介绍如注释所示，要了解这些参数左右着什么，就需要了解线程池具体的执行方法<code>ThreadPoolExecutor.execute</code>:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void execute(Runnable command) {
    if (command == null)
        throw new NullPointerException();

    int c = ctl.get();
    //1.当前池中线程比核心数少，新建一个线程执行任务
    if (workerCountOf(c) &lt; corePoolSize) {   
        if (addWorker(command, true))
            return;
        c = ctl.get();
    }
    //2.核心池已满，但任务队列未满，添加到队列中
    if (isRunning(c) &amp;&amp; workQueue.offer(command)) {   
        int recheck = ctl.get();
        if (! isRunning(recheck) &amp;&amp; remove(command))    //如果这时被关闭了，拒绝任务
            reject(command);
        else if (workerCountOf(recheck) == 0)    //如果之前的线程已被销毁完，新建一个线程
            addWorker(null, false);
    }
    //3.核心池已满，队列已满，试着创建一个新线程
    else if (!addWorker(command, false))
        reject(command);    //如果创建新线程失败了，说明线程池被关闭或者线程池完全满了，拒绝任务
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程图</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200316223656604.png" alt="image-20200316223656604" tabindex="0" loading="lazy"><figcaption>image-20200316223656604</figcaption></figure><h2 id="_2-构造器的作用" tabindex="-1"><a class="header-anchor" href="#_2-构造器的作用" aria-hidden="true">#</a> 2. 构造器的作用</h2><ul><li>corePoolSize：核心线程池数量 <ul><li>在线程数少于核心数量时，有新任务进来就新建一个线程，即使有的线程没事干</li><li>等超出核心数量后，就不会新建线程了，空闲的线程就得去任务队列里取任务执行</li></ul></li><li>maximumPoolSize: 最大线程数量 <ul><li>包含核心线程池数量+核心以为的数量</li><li>如果任务队列满了，并且池中线程数小于最大线程数，会再创建新的线程执行任务</li></ul></li><li><code>keepAliveTime</code>：核心池以外的线程存活时间，即没有任务的外包的存活时间 <ul><li>如果给线程池设置 <code>allowCoreThreadTimeOut(true)</code>，则核心线程在空闲时头上也会响起死亡的倒计时</li><li>如果任务是多而容易执行的，可以调大这个参数，那样线程就可以在存活的时间里有更大可能接受新任务</li></ul></li><li><code>workQueue</code>：保存待执行任务的阻塞队列 <ul><li>ArrayBlockingQueue：基于数组、有界，按 FIFO（先进先出）原则对元素进行排序</li><li>LinkedBlockingQueue：基于链表，按FIFO （先进先出） 排序元素 <ul><li>吞吐量通常要高于 ArrayBlockingQueue</li><li>Executors.newFixedThreadPool() 使用了这个队列</li></ul></li><li>SynchronousQueue：不存储元素的阻塞队列 <ul><li>每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态</li><li>吞吐量通常要高于 LinkedBlockingQueue</li><li>Executors.newCachedThreadPool使用了这个队列</li></ul></li><li>PriorityBlockingQueue：具有优先级的、无限阻塞队列</li></ul></li><li><code>threadFactory</code>：每个线程创建的地方 <ul><li>可以给线程起个好听的名字，设置个优先级啥的</li></ul></li><li>handler：饱和策略，大家都很忙，咋办呢，有四种策略 <ul><li>CallerRunsPolicy：只要线程池没关闭，就直接用调用者所在线程来运行任务</li><li>AbortPolicy：直接抛出 RejectedExecutionException 异</li><li>DiscardPolicy：悄悄把任务放生，不做了</li><li>DiscardOldestPolicy：把队列里待最久的那个任务扔了，然后再调用 execute() 试试看能行不</li><li>我们也可以实现自己的 RejectedExecutionHandler 接口自定义策略，比如如记录日志什么的</li></ul></li></ul>`,10),c=[l];function o(t,d){return e(),a("div",null,c)}const r=n(s,[["render",o],["__file","java-thread-y-threadpool-handler.html.vue"]]);export{r as default};
