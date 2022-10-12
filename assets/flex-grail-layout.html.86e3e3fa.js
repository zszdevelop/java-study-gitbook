import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as p,a as n,b as e,d as s,e as o,r as i}from"./app.3205cabe.js";const c={},u=n("h1",{id:"flex\u5E03\u5C40-\u5723\u676F\u5E03\u5C40",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#flex\u5E03\u5C40-\u5723\u676F\u5E03\u5C40","aria-hidden":"true"},"#"),s(" flex\u5E03\u5C40-\u5723\u676F\u5E03\u5C40")],-1),r={href:"https://en.wikipedia.org/wiki/Holy_Grail_(web_design)",target:"_blank",rel:"noopener noreferrer"},d=s("\u5723\u676F\u5E03\u5C40"),v=s("\uFF08Holy Grail Layout\uFF09\u6307\u7684\u662F\u4E00\u79CD\u6700\u5E38\u89C1\u7684\u7F51\u7AD9\u5E03\u5C40\u3002\u9875\u9762\u4ECE\u4E0A\u5230\u4E0B\uFF0C\u5206\u6210\u4E09\u4E2A\u90E8\u5206\uFF1A\u5934\u90E8\uFF08header\uFF09\uFF0C\u8EAF\u5E72\uFF08body\uFF09\uFF0C\u5C3E\u90E8\uFF08footer\uFF09\u3002\u5176\u4E2D\u8EAF\u5E72\u53C8\u6C34\u5E73\u5206\u6210\u4E09\u680F\uFF0C\u4ECE\u5DE6\u5230\u53F3\u4E3A\uFF1A\u5BFC\u822A\u3001\u4E3B\u680F\u3001\u526F\u680F\u3002"),k=o(`<p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071323.png" alt="img" loading="lazy"></p><p>HTML\u4EE3\u7801\u5982\u4E0B\u3002</p><div class="language-markup ext-markup line-numbers-mode"><pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>HolyGrail<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  &lt;header...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>HolyGrail-body<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    &lt;main class=&quot;HolyGrail-content&quot;...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">&gt;</span></span>
    &lt;nav class=&quot;HolyGrail-nav&quot;...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">&gt;</span></span>
    &lt;aside class=&quot;HolyGrail-ads&quot;...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>aside</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  &lt;footer...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">&gt;</span></span>
&lt;/body
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS\u4EE3\u7801\u5982\u4E0B\u3002</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.HolyGrail</span> <span class="token punctuation">{</span>
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
  <span class="token comment">/* \u4E24\u4E2A\u8FB9\u680F\u7684\u5BBD\u5EA6\u8BBE\u4E3A12em */</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 0 0 12em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.HolyGrail-nav</span> <span class="token punctuation">{</span>
  <span class="token comment">/* \u5BFC\u822A\u653E\u5230\u6700\u5DE6\u8FB9 */</span>
  <span class="token property">order</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u662F\u5C0F\u5C4F\u5E55\uFF0C\u8EAF\u5E72\u7684\u4E09\u680F\u81EA\u52A8\u53D8\u4E3A\u5782\u76F4\u53E0\u52A0\u3002</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,8),m={href:"http://www.ruanyifeng.com/blog/2015/07/flex-examples.html",target:"_blank",rel:"noopener noreferrer"},b=s("Flex \u5E03\u5C40\u6559\u7A0B\uFF1A\u5B9E\u4F8B\u7BC7");function g(y,h){const a=i("ExternalLinkIcon");return l(),p("div",null,[u,n("p",null,[n("a",r,[d,e(a)]),v]),k,n("p",null,[n("a",m,[b,e(a)])])])}const x=t(c,[["render",g],["__file","flex-grail-layout.html.vue"]]);export{x as default};
