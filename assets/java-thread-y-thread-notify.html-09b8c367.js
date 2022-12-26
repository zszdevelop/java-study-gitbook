import{_ as n,W as s,X as a,a0 as t}from"./framework-0cf5f349.js";const e={},p=t(`<h1 id="线程通信-等待通知wait-notify机制" tabindex="-1"><a class="header-anchor" href="#线程通信-等待通知wait-notify机制" aria-hidden="true">#</a> 线程通信(等待通知wait/notify机制)</h1><h2 id="_1-等待-通知机制介绍" tabindex="-1"><a class="header-anchor" href="#_1-等待-通知机制介绍" aria-hidden="true">#</a> 1. 等待/通知机制介绍</h2><h3 id="_1-1-不使用等待-通知机制-轮询" tabindex="-1"><a class="header-anchor" href="#_1-1-不使用等待-通知机制-轮询" aria-hidden="true">#</a> 1.1 不使用等待/通知机制（轮询）</h3><p>当两个线程之间存在<strong>生产者和消费者关系</strong>，也就是说<strong>第一个线程（生产者）做相应的操作然后第二个线程（消费者）感知到了变化又进行相应的操作</strong></p><h4 id="_1-1-1-轮询方式案例" tabindex="-1"><a class="header-anchor" href="#_1-1-1-轮询方式案例" aria-hidden="true">#</a> 1.1.1 轮询方式案例</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">while</span><span class="token punctuation">(</span>value<span class="token operator">=</span>desire<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设这个value值就是第一个线程操作的结果，doSomething()是第二个线程要做的事，当满足条件value=desire后才执行doSomething()。</p><h4 id="_1-1-2-轮询方式缺点" tabindex="-1"><a class="header-anchor" href="#_1-1-2-轮询方式缺点" aria-hidden="true">#</a> 1.1.2 轮询方式缺点</h4><p>第二个语句不停过通过轮询机制来检测判断条件是否成立。如果<strong>轮询时间的间隔太小会浪费CPU资源，轮询时间的间隔太大，就可能取不到自己想要的数据</strong>。</p><p>所以这里就需要我们今天讲到的等待/通知（wait/notify）机制来解决这两个矛盾。</p><h3 id="_1-2-什么是等待-通知机制" tabindex="-1"><a class="header-anchor" href="#_1-2-什么是等待-通知机制" aria-hidden="true">#</a> 1.2 什么是等待/通知机制</h3><h3 id="_1-2-1-等待-通知生活中的案例原型" tabindex="-1"><a class="header-anchor" href="#_1-2-1-等待-通知生活中的案例原型" aria-hidden="true">#</a> 1.2.1 等待/通知生活中的案例原型</h3><p>等待/通知机制在我们生活中比比皆是，一个形象的例子就是厨师和服务员之间就存在等待/通知机制。</p><ol><li>厨师做完一道菜的时间是不确定的，所以菜到服务员手中的时间是不确定的；</li><li>服务员就需要去“等待（wait）”；</li><li>厨师把菜做完之后，按一下铃，这里的按铃就是“通知（nofity）”；</li><li>服务员听到铃声之后就知道菜做好了，他可以去端菜了。</li></ol><h3 id="_1-2-2-简介" tabindex="-1"><a class="header-anchor" href="#_1-2-2-简介" aria-hidden="true">#</a> 1.2.2 简介</h3><p>等待/通知机制，是指一个线程A调用了对象O的wait()方法进入等待状态，而另一个线程B调用了对象O的notify()/notifyAll()方法，线程A收到通知后退出等待队列，进入可运行状态，进而执行后续操作。上诉两个线程通过对象O来完成交互，而对象上的<strong>wait()方法</strong>和<strong>notify()/notifyAll()方法</strong>的关系就如同开关信号一样，用来完成等待方和通知方之间的交互工作。</p><h3 id="_1-3-等待-通知机制的相关方法" tabindex="-1"><a class="header-anchor" href="#_1-3-等待-通知机制的相关方法" aria-hidden="true">#</a> 1.3 等待/通知机制的相关方法</h3><table><thead><tr><th>方法名称</th><th>描述</th></tr></thead><tbody><tr><td>notify()</td><td>随机唤醒等待队列中等待<strong>同一共享资源的“一个线程”</strong>，并使该线程退出等待队列，进入可运行状态，也就是<strong>notify()方法仅通知“一个线程”</strong></td></tr><tr><td>notifyAll()</td><td>使所有正在等待队列中等待同一共享资源的 <strong>“全部线程”</strong> 退出等待队列，进入可运行状态。此时，优先级最高的那个线程最先执行，但也有可能是随机执行，这取决于JVM虚拟机的实现</td></tr><tr><td>wait()</td><td>使调用该方法的线程释放共享资源锁，然后从运行状态退出，进入等待队列，直到被再次唤醒</td></tr><tr><td>wait(long)</td><td>超时等待一段时间，这里的参数时间是毫秒，也就是等待长达n毫秒，如果没有通知就超时返回</td></tr><tr><td>wait(long，int)</td><td>对于超时时间更细力度的控制，可以达到纳秒</td></tr></tbody></table><h2 id="_2-等待-通知机制的实现" tabindex="-1"><a class="header-anchor" href="#_2-等待-通知机制的实现" aria-hidden="true">#</a> 2. 等待/通知机制的实现</h2><h3 id="_2-1-实现案例" tabindex="-1"><a class="header-anchor" href="#_2-1-实现案例" aria-hidden="true">#</a> 2.1 实现案例</h3><p>MyList.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyList</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;anyString&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ThreadA.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadA</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">Object</span> lock<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">ThreadA</span><span class="token punctuation">(</span><span class="token class-name">Object</span> lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>lock <span class="token operator">=</span> lock<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">MyList</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;wait begin &quot;</span>
							<span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;wait end  &quot;</span>
							<span class="token operator">+</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ThreadB.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadB</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">Object</span> lock<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">ThreadB</span><span class="token punctuation">(</span><span class="token class-name">Object</span> lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>lock <span class="token operator">=</span> lock<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token class-name">MyList</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">MyList</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
						lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;已发出通知！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
					<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;添加了&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;个元素!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Run</span> <span class="token punctuation">{</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token class-name">ThreadA</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadA</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
			a<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token class-name">ThreadB</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadB</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
			b<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2019-09-21 00:48:52 JRebel:  
wait begin 1568998132460
添加了1个元素!
添加了2个元素!
添加了3个元素!
添加了4个元素!
已发出通知！
添加了5个元素!
添加了6个元素!
添加了7个元素!
添加了8个元素!
添加了9个元素!
添加了10个元素!
wait end  1568998142540
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-synchronized关键字在线程通信中的作用" tabindex="-1"><a class="header-anchor" href="#_2-2-synchronized关键字在线程通信中的作用" aria-hidden="true">#</a> 2.2 synchronized关键字在线程通信中的作用</h3><p><strong>synchronized关键字</strong>可以将任何一个<strong>Object对象作为同步对象</strong>看待，而<strong>java为每个Object 都实现了等待/通知（wait/notify）机制的相关方法</strong>，他们必须用synchronized关键字同步的Object的临界区内。</p><ul><li>通过调用wait()方法可以使处于临界区内的线程进入等待状态，同时释放被同步对象的锁</li><li>而notify()方法可以唤醒一个因调用wait操作而处于阻塞状态中的线程，使其进入就绪状态。</li><li>被重新唤醒的线程会视图重新获得临界区的控制权也就是锁，并继续执行wait方法之后的代码。如果发出notify操作时没有处于阻塞状态中的线程，那么该命令会被忽略。</li></ul><h2 id="_3-相关知识点" tabindex="-1"><a class="header-anchor" href="#_3-相关知识点" aria-hidden="true">#</a> 3.相关知识点</h2><h3 id="_3-1-notify-锁不释放" tabindex="-1"><a class="header-anchor" href="#_3-1-notify-锁不释放" aria-hidden="true">#</a> 3.1 notify()锁不释放</h3><p>当方法wait()被执行后，锁自动被释放，但执行玩notify()方法后，锁不会自动释放。<strong>必须执行完notify()方法所在的synchronized代码块</strong>后才释放。</p><h3 id="_3-2-thread-join" tabindex="-1"><a class="header-anchor" href="#_3-2-thread-join" aria-hidden="true">#</a> 3.2 Thread.join()</h3><h4 id="_3-2-1-thread-join-使用背景" tabindex="-1"><a class="header-anchor" href="#_3-2-1-thread-join-使用背景" aria-hidden="true">#</a> 3.2.1 Thread.join()使用背景</h4><p>在很多情况下，主线程生成并起动了子线程，如果子线程里要进行大量的耗时的运算，主线程往往将于子线程之前结束，但是如果主线程处理完其他的事务后，需要用到子线程的处理结果，也就是<strong>主线程需要等待子线程执行完成之后再结束，这个时候就要用到join()方法了。另外，一个线程需要等待另一个线程也需要用到join()方法。</strong></p><p>Thread类除了提供join()方法之外，还提供了join(long millis)、join(long millis, int nanos)两个具有超时特性的方法。这两个超时方法表示，如果线程thread在指定的超时时间没有终止，那么将会从该超时方法中返回。</p><h4 id="_3-2-2-子线程执行完主线程才退出" tabindex="-1"><a class="header-anchor" href="#_3-2-2-子线程执行完主线程才退出" aria-hidden="true">#</a> 3.2.2 子线程执行完主线程才退出</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {

	public static void main(String[] args) throws InterruptedException {

		MyThread threadTest = new MyThread();
		threadTest.start();

		//Thread.sleep(?);//因为不知道子线程要花的时间这里不知道填多少时间
		threadTest.join();
		System.out.println(&quot;我想当threadTest对象执行完毕后我再执行&quot;);
	}
	static public class MyThread extends Thread {

		@Override
		public void run() {
			System.out.println(&quot;我想先执行&quot;);
		}

	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码仅仅加上了一句：threadTest.join();。在这里join方法的作用就是<strong>主线程需要等待子线程执行完成之后再结束</strong>。</p>`,43),i=[p];function c(o,l){return s(),a("div",null,i)}const d=n(e,[["render",c],["__file","java-thread-y-thread-notify.html.vue"]]);export{d as default};
