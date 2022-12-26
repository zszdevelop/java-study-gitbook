import{_ as n,W as s,X as a,a0 as t}from"./framework-0cf5f349.js";const e={},p=t(`<h1 id="threadlocal使用场景" tabindex="-1"><a class="header-anchor" href="#threadlocal使用场景" aria-hidden="true">#</a> ThreadLocal使用场景</h1><h2 id="_1-场景" tabindex="-1"><a class="header-anchor" href="#_1-场景" aria-hidden="true">#</a> 1. 场景</h2><h3 id="_1-1-多数据源情况" tabindex="-1"><a class="header-anchor" href="#_1-1-多数据源情况" aria-hidden="true">#</a> 1.1 多数据源情况</h3><p>我们项目中如果存在多数据源的情况。为了不影响其他线程的数据源情况。我们切换的时候。一般会使用ThreadLocal 存储当前数据源</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 数据源切换处理
 * 
 * <span class="token keyword">@author</span> ygn
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DynamicDataSourceContextHolder</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">DynamicDataSourceContextHolder</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 使用ThreadLocal维护变量，ThreadLocal为每个使用该变量的线程提供独立的变量副本，
     *  所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token constant">CONTEXT_HOLDER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 设置数据源的变量
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setDataSourceType</span><span class="token punctuation">(</span><span class="token class-name">String</span> dsType<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;切换到{}数据源&quot;</span><span class="token punctuation">,</span> dsType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">CONTEXT_HOLDER</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>dsType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获得数据源的变量
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getDataSourceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">CONTEXT_HOLDER</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 清空数据源变量
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">clearDataSourceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token constant">CONTEXT_HOLDER</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-记录日志时间" tabindex="-1"><a class="header-anchor" href="#_1-2-记录日志时间" aria-hidden="true">#</a> 1.2 记录日志时间</h3><p>在任务执行前后，记录时间</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 线程本地变量
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Date</span><span class="token punctuation">&gt;</span></span> threadLocal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 执行前
 *
 * <span class="token keyword">@param</span> <span class="token parameter">context</span> 工作执行上下文对象
 * <span class="token keyword">@param</span> <span class="token parameter">sysJob</span> 系统计划任务
 */</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> context<span class="token punctuation">,</span> <span class="token class-name">SysJob</span> sysJob<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    threadLocal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 执行后
 *
 * <span class="token keyword">@param</span> <span class="token parameter">context</span> 工作执行上下文对象
 * <span class="token keyword">@param</span> <span class="token parameter">sysJob</span> 系统计划任务
 */</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">after</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> context<span class="token punctuation">,</span> <span class="token class-name">SysJob</span> sysJob<span class="token punctuation">,</span> <span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Date</span> startTime <span class="token operator">=</span> threadLocal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    threadLocal<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-微信登录" tabindex="-1"><a class="header-anchor" href="#_1-3-微信登录" aria-hidden="true">#</a> 1.3 微信登录</h3><ol><li>微信登录后(此时只获取了Openid和SessionKey信息 )</li><li>将Openid和SessionKey还有appid存储在ThreadLocal。</li><li>将信息存储到redis</li><li>只返回给用户我们自己生成的sessionKey而不是微信的</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> thirdSessionKey <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">ThirdSession</span> thirdSession <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThirdSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		thirdSession<span class="token punctuation">.</span><span class="token function">setAppId</span><span class="token punctuation">(</span>appId<span class="token punctuation">)</span><span class="token punctuation">;</span>
		thirdSession<span class="token punctuation">.</span><span class="token function">setSessionKey</span><span class="token punctuation">(</span>wxUser<span class="token punctuation">.</span><span class="token function">getSessionKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		thirdSession<span class="token punctuation">.</span><span class="token function">setWxUserId</span><span class="token punctuation">(</span>wxUser<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		thirdSession<span class="token punctuation">.</span><span class="token function">setOpenId</span><span class="token punctuation">(</span>wxUser<span class="token punctuation">.</span><span class="token function">getOpenId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//将3rd_session和用户信息存入redis，并设置过期时间</span>
		<span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token class-name">WxMaConstants</span><span class="token punctuation">.</span><span class="token constant">THIRD_SESSION_BEGIN</span> <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> thirdSessionKey<span class="token punctuation">;</span>
		redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span>thirdSession<span class="token punctuation">)</span> <span class="token punctuation">,</span> <span class="token class-name">WxMaConstants</span><span class="token punctuation">.</span><span class="token constant">TIME_OUT_SESSION</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">HOURS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		wxUser<span class="token punctuation">.</span><span class="token function">setSessionKey</span><span class="token punctuation">(</span>thirdSessionKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","java-thread-y-threadlocal-scene.html.vue"]]);export{d as default};
