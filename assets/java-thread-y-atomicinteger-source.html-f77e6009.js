import{_ as a,W as e,X as t,Y as n,Z as p,$ as c,a0 as o,D as l}from"./framework-0cf5f349.js";const i={},u=o(`<h1 id="原子类atomicinteger源码解析" tabindex="-1"><a class="header-anchor" href="#原子类atomicinteger源码解析" aria-hidden="true">#</a> 原子类AtomicInteger源码解析</h1><h2 id="_1-核心原理" tabindex="-1"><a class="header-anchor" href="#_1-核心原理" aria-hidden="true">#</a> 1. 核心原理</h2><h3 id="_1-1-操作对象value" tabindex="-1"><a class="header-anchor" href="#_1-1-操作对象value" aria-hidden="true">#</a> 1.1 操作对象value</h3><p>AtomicInteger用于实现通过原子的方式更新单个变量。AtomicInteger 中保存了一个核心字段value，它就代表了Atomiclnteger 的当前实际取值，所有的方法都是围绕该值进行的。</p><h3 id="_1-2-偏移量valueoffset" tabindex="-1"><a class="header-anchor" href="#_1-2-偏移量valueoffset" aria-hidden="true">#</a> 1.2 <strong>偏移量</strong>valueOffset</h3><p><strong>属性valueOffset，它保存着value 字段在Atomiclnteger 对象中的偏移量。Unsafe中的CAS方法都是通过字段的偏移量来操作字段的。</strong></p><h2 id="_2-初始代码" tabindex="-1"><a class="header-anchor" href="#_2-初始代码" aria-hidden="true">#</a> 2. 初始代码</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 内部的value属性，它就代表了Atomiclnteger 的当前实际取值。
 * 所有的方法都是围绕该值进行的
 */</span>
<span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> value<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 使用给定值初始化value
 *
 * <span class="token keyword">@param</span> <span class="token parameter">initialValue</span> 给定值
 */</span>
<span class="token keyword">public</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> initialValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 初始化value值为0
 */</span>
<span class="token keyword">public</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 内部实际上依赖于Unsafe类的方法，对value值进行操作
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Unsafe</span> unsafe <span class="token operator">=</span> <span class="token class-name">Unsafe</span><span class="token punctuation">.</span><span class="token function">getUnsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * value字段的偏移量
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> valueOffset<span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">//初始化value字段的偏移量</span>
        valueOffset <span class="token operator">=</span> unsafe<span class="token punctuation">.</span>objectFieldOffset
                <span class="token punctuation">(</span><span class="token class-name">AtomicInteger</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-重要方法" tabindex="-1"><a class="header-anchor" href="#_3-重要方法" aria-hidden="true">#</a> 3. 重要方法</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 获取当前最新值
 *
 * <span class="token keyword">@return</span> 当前最新值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 设置给定新值
 *
 * <span class="token keyword">@param</span> <span class="token parameter">newValue</span> 新值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">int</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 原子性的将当前值设为给定新值，返回旧值
 *
 * <span class="token keyword">@param</span> <span class="token parameter">newValue</span> 新值
 * <span class="token keyword">@return</span> 旧值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndSet</span><span class="token punctuation">(</span><span class="token keyword">int</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndSetInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 如果当前值等于预期值，则以原子方式将该值设置为给定的新值
 *
 * <span class="token keyword">@param</span> <span class="token parameter">expect</span> 预期值
 * <span class="token keyword">@param</span> <span class="token parameter">update</span> the new value
 * <span class="token keyword">@return</span> true 更新成功 false 更新失败
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token keyword">int</span> expect<span class="token punctuation">,</span> <span class="token keyword">int</span> update<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> expect<span class="token punctuation">,</span> update<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 原子性的将当前值加1，返回旧值
 *
 * <span class="token keyword">@return</span> 旧值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndIncrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 原子性的将当前值减1，返回旧值
 *
 * <span class="token keyword">@return</span> 返回旧值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndDecrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 原子性的将当前值增加delta,返回旧值
 *
 * <span class="token keyword">@param</span> <span class="token parameter">delta</span> 增加的值
 * <span class="token keyword">@return</span> 旧值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndAdd</span><span class="token punctuation">(</span><span class="token keyword">int</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> delta<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 原子性的将当前值加1，返回新值
 *
 * <span class="token keyword">@return</span> 更新后的值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 原子性的将当前值减1，返回新值
 *
 * <span class="token keyword">@return</span> 更新后的值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 原子性的将当前值增加delta，返回新值
 *
 * <span class="token keyword">@param</span> <span class="token parameter">delta</span> 增加的值
 * <span class="token keyword">@return</span> 更新后的值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">addAndGet</span><span class="token punctuation">(</span><span class="token keyword">int</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">getAndAddInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> delta<span class="token punctuation">)</span> <span class="token operator">+</span> delta<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 1. 最终会设置成newValue，使用lazySet设置值后，可能导致其他线程在之后的一小段时间内还是可以读到旧的值。
 2. 关于该方法的更多信息可以参考并发编程网翻译的一篇文章《AtomicLong.lazySet是如何工作的？》，文章地址是“http://ifeve.com/how-does-atomiclong-lazyset-work/”。
 3.  4. @param newValue 新值
 */</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">lazySet</span><span class="token punctuation">(</span><span class="token keyword">int</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    unsafe<span class="token punctuation">.</span><span class="token function">putOrderedInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可以看到，里面的方法都是调用的Unsafe类方法，进行的CAS操作。</strong></p><h2 id="_4-char、float和double等的cas操作怎么办" tabindex="-1"><a class="header-anchor" href="#_4-char、float和double等的cas操作怎么办" aria-hidden="true">#</a> 4. char、float和double等的CAS操作怎么办</h2><p>Atomic包实际上只提供了3种基本类型的原子更新：int、long、boolean，其中boolean也是转换为int的0、1进行更新的，实际上并没有char、float和double等的CAS操作，实际上char、 float、double都可以转换为int或者long在进行操作，如果DoubleAdder就是采用Double.doubleToRawLongBits将double转换为long类型的值在进行操作。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*Unsafe只提供了3种CAS方法.*/</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">native</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSwapObject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> var1<span class="token punctuation">,</span> <span class="token keyword">long</span> var2<span class="token punctuation">,</span> <span class="token class-name">Object</span> var4<span class="token punctuation">,</span> <span class="token class-name">Object</span> var5<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">native</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token class-name">Object</span> var1<span class="token punctuation">,</span> <span class="token keyword">long</span> var2<span class="token punctuation">,</span> <span class="token keyword">int</span> var4<span class="token punctuation">,</span> <span class="token keyword">int</span> var5<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">native</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSwapLong</span><span class="token punctuation">(</span><span class="token class-name">Object</span> var1<span class="token punctuation">,</span> <span class="token keyword">long</span> var2<span class="token punctuation">,</span> <span class="token keyword">long</span> var4<span class="token punctuation">,</span> <span class="token keyword">long</span> var6<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*AtomicBoolean源码中，它是先把Boolean转换成int类型，再使用compareAndSwapInt进行CAS操作*/</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> expect<span class="token punctuation">,</span> <span class="token keyword">boolean</span> update<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> e <span class="token operator">=</span> expect <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> u <span class="token operator">=</span> update <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> unsafe<span class="token punctuation">.</span><span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> valueOffset<span class="token punctuation">,</span> e<span class="token punctuation">,</span> u<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,15),d={href:"https://blog.csdn.net/weixin_43767015/article/details/124447418",target:"_blank",rel:"noopener noreferrer"};function r(k,v){const s=l("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",d,[p("Java AtomicInteger和AtomicStampedReference源码深度解析"),c(s)])])])}const b=a(i,[["render",r],["__file","java-thread-y-atomicinteger-source.html.vue"]]);export{b as default};
