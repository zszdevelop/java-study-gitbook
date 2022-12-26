import{_ as s,W as e,X as t,Y as n,Z as p,$ as o,a0 as i,D as l}from"./framework-0cf5f349.js";const c={},u=i(`<h1 id="vue中watch监听对象内属性的方法" tabindex="-1"><a class="header-anchor" href="#vue中watch监听对象内属性的方法" aria-hidden="true">#</a> Vue中watch监听对象内属性的方法</h1><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> 1. 背景</h2><p>我们有个场景，需要监听表单中任意一个属性变化，再将变化通过vuex 传递给其他组件使用。因为实时性要求高，且字段多。并不想每个字段变化后去触发事件。</p><ul><li><p>需求：</p><p>我们watch监听对象内的属性变化</p></li><li><p>问题</p><p>现在我们正常的写法，只能监听对象的变化，对象内的属性变化并不会被监听到</p></li><li><p>案例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new Vue({
  data: {
    count: 10，
    blog:{
        title:&#39;my-blog&#39;,
        categories:[]
    }
  },
  watch: {
    count: function (newval, oldVal) {
      console.log(\`new: %s, old: %s\`, newVal, oldVal);
    }
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述情况里<code>data</code>中的<code>count</code>属性可以直接监听，但是如果需要监听的数据是对象内的某一属性值的变化，直接<code>watch</code>对象<code>blog</code>是检测不到变化的，这是因为<code>blog</code>这个对象的指向并没有发生改变。</p></li></ul><h2 id="_2-解决方法" tabindex="-1"><a class="header-anchor" href="#_2-解决方法" aria-hidden="true">#</a> 2. 解决方法</h2><h3 id="_2-1-方案一-深度检测" tabindex="-1"><a class="header-anchor" href="#_2-1-方案一-深度检测" aria-hidden="true">#</a> 2.1 方案一：深度检测</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>new Vue<span class="token punctuation">(</span><span class="token punctuation">{</span>
  data: <span class="token punctuation">{</span>
    count: <span class="token number">10</span>，
    blog:<span class="token punctuation">{</span>
        title:<span class="token string">&#39;my-blog&#39;</span>,
        categories:<span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  watch: <span class="token punctuation">{</span>
    blog:<span class="token punctuation">{</span>
        handler<span class="token punctuation">(</span>newVal,oldVal<span class="token punctuation">)</span><span class="token punctuation">{</span>
            console.log<span class="token punctuation">(</span><span class="token variable"><span class="token variable">\`</span>new: $<span class="token punctuation">{</span>newVal<span class="token punctuation">}</span>, old: $<span class="token punctuation">{</span>oldVal<span class="token punctuation">}</span><span class="token variable">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>,
        deep:true
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>里面的<code>deep</code>设为了<code>true</code>，这样的话，如果修改了这个<code>blog</code>中的任何一个属性，都会执行<code>handler</code>这个方法。</p><blockquote><p>不过这样会造成更多的性能开销，尤其是对象里面属性过多，结构嵌套过深的时候。而且有时候我们就只想关心这个对象中的某个特定属性</p></blockquote><p>我们也可以监听某一个属性</p><h3 id="_2-2-用字符串来表示对象的属性调用" tabindex="-1"><a class="header-anchor" href="#_2-2-用字符串来表示对象的属性调用" aria-hidden="true">#</a> 2.2 用字符串来表示对象的属性调用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">10</span>，
    <span class="token literal-property property">blog</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;my-blog&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">categories</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;blog.categories&#39;</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> oldVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">new:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>newVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, old:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>oldVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-使用computed计算属性" tabindex="-1"><a class="header-anchor" href="#_2-3-使用computed计算属性" aria-hidden="true">#</a> 2.3 使用<code>computed</code>计算属性</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">10</span>，
    <span class="token literal-property property">blog</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;my-blog&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">categories</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">categories</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>blog<span class="token punctuation">.</span>categories<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">categories</span><span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">new:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>newVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, old:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>oldVal<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,15),r={href:"https://segmentfault.com/a/1190000018080301",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const a=l("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[p("Vue中watch对象内属性的方法"),o(a)])])])}const b=s(c,[["render",d],["__file","vue-watch.html.vue"]]);export{b as default};
