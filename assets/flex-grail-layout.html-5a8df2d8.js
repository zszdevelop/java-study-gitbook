import{_ as t,W as l,X as p,Y as n,Z as s,$ as e,a0 as i,D as o}from"./framework-0cf5f349.js";const c={},u=n("h1",{id:"flex布局-圣杯布局",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#flex布局-圣杯布局","aria-hidden":"true"},"#"),s(" flex布局-圣杯布局")],-1),r={href:"https://en.wikipedia.org/wiki/Holy_Grail_(web_design)",target:"_blank",rel:"noopener noreferrer"},d=i(`<figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071323.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>HTML代码如下。</p><div class="language-markup line-numbers-mode" data-ext="markup"><pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>HolyGrail<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  &lt;header...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>HolyGrail-body<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    &lt;main class=&quot;HolyGrail-content&quot;...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">&gt;</span></span>
    &lt;nav class=&quot;HolyGrail-nav&quot;...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">&gt;</span></span>
    &lt;aside class=&quot;HolyGrail-ads&quot;...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>aside</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  &lt;footer...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">&gt;</span></span>
&lt;/body
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS代码如下。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.HolyGrail</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">header,
footer</span> <span class="token punctuation">{</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.HolyGrail-body</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.HolyGrail-content</span> <span class="token punctuation">{</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.HolyGrail-nav, .HolyGrail-ads</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 两个边栏的宽度设为12em */</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 0 0 12em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.HolyGrail-nav</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 导航放到最左边 */</span>
  <span class="token property">order</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是小屏幕，躯干的三栏自动变为垂直叠加。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.HolyGrail-body</span> <span class="token punctuation">{</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.HolyGrail-nav,
  .HolyGrail-ads,
  .HolyGrail-content</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,8),v={href:"http://www.ruanyifeng.com/blog/2015/07/flex-examples.html",target:"_blank",rel:"noopener noreferrer"};function k(m,b){const a=o("ExternalLinkIcon");return l(),p("div",null,[u,n("p",null,[n("a",r,[s("圣杯布局"),e(a)]),s("（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。")]),d,n("p",null,[n("a",v,[s("Flex 布局教程：实例篇"),e(a)])])])}const y=t(c,[["render",k],["__file","flex-grail-layout.html.vue"]]);export{y as default};
