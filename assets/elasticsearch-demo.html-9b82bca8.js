import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const t={},p=e(`<h1 id="es-测试demo" tabindex="-1"><a class="header-anchor" href="#es-测试demo" aria-hidden="true">#</a> Es - 测试demo</h1><h2 id="_1-索引管理" tabindex="-1"><a class="header-anchor" href="#_1-索引管理" aria-hidden="true">#</a> 1. 索引管理</h2><h3 id="_1-1-查看索引" tabindex="-1"><a class="header-anchor" href="#_1-1-查看索引" aria-hidden="true">#</a> 1.1 查看索引</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /case/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-删除索引" tabindex="-1"><a class="header-anchor" href="#_1-2-删除索引" aria-hidden="true">#</a> 1.2 删除索引</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE case
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-dsl查询之复合查询" tabindex="-1"><a class="header-anchor" href="#_2-dsl查询之复合查询" aria-hidden="true">#</a> 2. DSL查询之复合查询</h2><h3 id="_2-1-bool-query-布尔查询" tabindex="-1"><a class="header-anchor" href="#_2-1-bool-query-布尔查询" aria-hidden="true">#</a> 2.1 bool query(布尔查询)</h3><blockquote><p>bool查询可以灵活的筛选和过滤出自己想要的数据</p></blockquote><p>Bool查询语法有以下特点</p><ul><li>子查询可以任意顺序出现</li><li>可以嵌套多个查询，包括bool查询</li><li>如果bool查询中没有must条件，should中必须至少满足一条才会返回结果。</li></ul><p>bool查询包含四种操作符，分别是must,should,must_not,filter。他们均是一种数组，数组里面是对应的判断条件。</p><ul><li><code>must</code>： 必须匹配。贡献算分</li><li><code>must_not</code>：过滤子句，必须不能匹配，但不贡献算分</li><li><code>should</code>： 选择性匹配，至少满足一条。贡献算分</li><li><code>filter</code>： 过滤子句，必须匹配，但不贡献算分</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;诈骗&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;二审&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;辽宁省&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;cjjg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;驳回上诉&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-boosting-query-提高查询" tabindex="-1"><a class="header-anchor" href="#_2-2-boosting-query-提高查询" aria-hidden="true">#</a> 2.2 boosting query(提高查询)</h3><blockquote><p>不同于bool查询，bool查询中只要一个子查询条件不匹配那么搜索的数据就不会出现。而boosting query则是降低显示的权重/优先级（即score)。</p></blockquote><p>案件名称中包含诈骗的、提高查询权重。包含一审的降低权重</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>GET <span class="token keyword">case</span><span class="token operator">/</span>_search
{
  <span class="token string">&quot;query&quot;</span>: {
    <span class="token string">&quot;boosting&quot;</span>: {
      <span class="token string">&quot;positive&quot;</span>: {
        <span class="token string">&quot;term&quot;</span>: {
          <span class="token string">&quot;ajmc&quot;</span>: {
            <span class="token string">&quot;value&quot;</span>: <span class="token string">&quot;诈骗&quot;</span>
          }
        }
      }<span class="token punctuation">,</span>
      <span class="token string">&quot;negative&quot;</span>: {
        <span class="token string">&quot;term&quot;</span>: {
          <span class="token string">&quot;ajmc&quot;</span>: {
            <span class="token string">&quot;value&quot;</span>: <span class="token string">&quot;一审&quot;</span>
          }
        }
      }<span class="token punctuation">,</span>
      <span class="token string">&quot;negative_boost&quot;</span>: <span class="token number">0.2</span>
    }
  }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-constant-score-固定分数查询" tabindex="-1"><a class="header-anchor" href="#_2-3-constant-score-固定分数查询" aria-hidden="true">#</a> 2.3 constant_score（固定分数查询）</h3><blockquote><p>查询某个条件时，固定的返回指定的score；显然当不需要计算score时，只需要filter条件即可，因为filter context忽略score。</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;constant_score&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;集资&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;诈骗&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">1.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-dis-max-最佳匹配查询" tabindex="-1"><a class="header-anchor" href="#_2-4-dis-max-最佳匹配查询" aria-hidden="true">#</a> 2.4 dis_max(最佳匹配查询）</h3><p>分离最大化查询（Disjunction Max Query）指的是： <strong>将任何与任一查询匹配的文档作为结果返回，但只将最佳匹配的评分作为查询的评分结果返回 。</strong></p><blockquote><p>案件名称 和 全文中。无论哪个包含诈骗 盗窃 的权重高。就排在前面</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dis_max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;tie_breaker&quot;</span><span class="token operator">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span>
      <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">1.2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;queries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;诈骗 盗窃&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;qw&quot;</span><span class="token operator">:</span> <span class="token string">&quot;诈骗 盗窃&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-dsl查询之全文搜索" tabindex="-1"><a class="header-anchor" href="#_3-dsl查询之全文搜索" aria-hidden="true">#</a> 3. DSL查询之全文搜索</h2><h3 id="_3-1-match-查询" tabindex="-1"><a class="header-anchor" href="#_3-1-match-查询" aria-hidden="true">#</a> 3.1 match 查询</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;集资&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-多词match-默认or" tabindex="-1"><a class="header-anchor" href="#_3-2-多词match-默认or" aria-hidden="true">#</a> 3.2 多词match，默认or</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;集资 诈骗 赌博&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-多词match-指定为and" tabindex="-1"><a class="header-anchor" href="#_3-3-多词match-指定为and" aria-hidden="true">#</a> 3.3 多词match，指定为and</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>GET <span class="token keyword">case</span><span class="token operator">/</span>_search
{
  <span class="token string">&quot;query&quot;</span>: {
    <span class="token string">&quot;match&quot;</span>: {
      <span class="token string">&quot;ajmc&quot;</span>: {
        <span class="token string">&quot;query&quot;</span>: <span class="token string">&quot;集资 诈骗&quot;</span><span class="token punctuation">,</span> 
        <span class="token string">&quot;operator&quot;</span>: <span class="token string">&quot;and&quot;</span>
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-控制match的匹配精度" tabindex="-1"><a class="header-anchor" href="#_3-4-控制match的匹配精度" aria-hidden="true">#</a> 3.4 控制match的匹配精度</h3><p>至少要满足这4个词中的3个</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;集资 诈骗  赌博 &quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token string">&quot;75%&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-match-phrase-搜索词组" tabindex="-1"><a class="header-anchor" href="#_3-5-match-phrase-搜索词组" aria-hidden="true">#</a> 3.5 match_phrase 搜索词组</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;集资 诈骗&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-match-phrase-prefix-查最后一个词项是前缀" tabindex="-1"><a class="header-anchor" href="#_3-6-match-phrase-prefix-查最后一个词项是前缀" aria-hidden="true">#</a> 3.6 match_phrase_prefix 查最后一个词项是前缀</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase_prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;集资 诈&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7-multi-match-一次对多个字段查询" tabindex="-1"><a class="header-anchor" href="#_3-7-multi-match-一次对多个字段查询" aria-hidden="true">#</a> 3.7 multi_match 一次对多个字段查询</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;盗窃&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;qw&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8-query-string-根据运算符来解析和拆分查询字符串" tabindex="-1"><a class="header-anchor" href="#_3-8-query-string-根据运算符来解析和拆分查询字符串" aria-hidden="true">#</a> 3.8 query_string（根据运算符来解析和拆分查询字符串）</h3><p>使用语法根据运算符（例如AND或）来解析和拆分提供的查询字符串</p><p>需要理解本质上查询这四个分词（term）or的结果而已</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;default_field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;（放火 杀人） OR (集资 诈骗)&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-9-simple-query-string-无效语法不会返回错误" tabindex="-1"><a class="header-anchor" href="#_3-9-simple-query-string-无效语法不会返回错误" aria-hidden="true">#</a> 3.9 simple_query_string 无效语法不会返回错误</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;simple_query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\\&quot;over the\\&quot; + (诈骗 | 集资) + 放火&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-dsl查询之term" tabindex="-1"><a class="header-anchor" href="#_4-dsl查询之term" aria-hidden="true">#</a> 4. DSL查询之Term</h2><h3 id="_4-1-字段存在-exist" tabindex="-1"><a class="header-anchor" href="#_4-1-字段存在-exist" aria-hidden="true">#</a> 4.1 字段存在:exist</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;track_total_hits&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;exists&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ay_list&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-字段不存在-bool-must-not-exist" tabindex="-1"><a class="header-anchor" href="#_4-2-字段不存在-bool-must-not-exist" aria-hidden="true">#</a> 4.2 字段不存在:bool+must_not+exist</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;track_total_hits&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token property">&quot;exists&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ay_list&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-id查询-ids" tabindex="-1"><a class="header-anchor" href="#_4-3-id查询-ids" aria-hidden="true">#</a> 4.3 id查询:ids</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ids&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;5eecf0967ad6ac3706739386&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;5eed7da2a541f81ae5eceeb8&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-前缀-prefix" tabindex="-1"><a class="header-anchor" href="#_4-4-前缀-prefix" aria-hidden="true">#</a> 4.4 前缀:prefix</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-分词匹配-term" tabindex="-1"><a class="header-anchor" href="#_4-5-分词匹配-term" aria-hidden="true">#</a> 4.5 分词匹配:term</h3><p>前文最常见的根据分词查询</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>
GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ay_list&quot;</span><span class="token operator">:</span> <span class="token string">&quot;重婚&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-多个分词匹配-terms" tabindex="-1"><a class="header-anchor" href="#_4-6-多个分词匹配-terms" aria-hidden="true">#</a> 4.6 多个分词匹配:terms</h3><p>按照读个分词term匹配，它们是or的关系分词匹配:term</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">8000</span><span class="token punctuation">,</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ay_list&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;抢劫&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;重婚&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7-通配符-wildcard" tabindex="-1"><a class="header-anchor" href="#_4-7-通配符-wildcard" aria-hidden="true">#</a> 4.7 通配符:wildcard</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;wildcard&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张*伟&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-8-范围-range" tabindex="-1"><a class="header-anchor" href="#_4-8-范围-range" aria-hidden="true">#</a> 4.8 范围:range</h3><p>常常被用在数字或者日期范围的查询</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;cprq&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-06-01&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;lte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-07-01&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-9-正则-regexp" tabindex="-1"><a class="header-anchor" href="#_4-9-正则-regexp" aria-hidden="true">#</a> 4.9 正则:regexp</h3><p>通过正则表达式查询</p><p>以&quot;赌&quot;开头的name字段</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /case/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;regexp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;ajmc&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;赌.*&quot;</span>,
        <span class="token string">&quot;case_insensitive&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-模糊匹配-fuzzy" tabindex="-1"><a class="header-anchor" href="#_4-10-模糊匹配-fuzzy" aria-hidden="true">#</a> 4.10 模糊匹配:fuzzy</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fuzzy&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;危&quot;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-聚合查询之bucket聚合" tabindex="-1"><a class="header-anchor" href="#_5-聚合查询之bucket聚合" aria-hidden="true">#</a> 5. 聚合查询之Bucket聚合</h2><h3 id="_5-1-标准的聚合" tabindex="-1"><a class="header-anchor" href="#_5-1-标准的聚合" aria-hidden="true">#</a> 5.1 标准的聚合</h3><p>按法院聚合</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;agg_fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fymc.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-多个聚合" tabindex="-1"><a class="header-anchor" href="#_5-2-多个聚合" aria-hidden="true">#</a> 5.2 多个聚合</h3><p>按法院和年份聚合</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;agg_fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fymc.keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;agg_ny&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ny&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-嵌套分组" tabindex="-1"><a class="header-anchor" href="#_5-3-嵌套分组" aria-hidden="true">#</a> 5.3 嵌套分组</h3><p>每个月、各法院的案件</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;group_by_ny&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ny&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;group_by_fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fymc.keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-前置条件的过滤-filter" tabindex="-1"><a class="header-anchor" href="#_5-4-前置条件的过滤-filter" aria-hidden="true">#</a> 5.4 前置条件的过滤：filter</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;group_by_202005-fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;ny&quot;</span><span class="token operator">:</span> <span class="token string">&quot;202005&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span> 
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;group_by_fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fymc.keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-对filter进行分组聚合-filters" tabindex="-1"><a class="header-anchor" href="#_5-5-对filter进行分组聚合-filters" aria-hidden="true">#</a> 5.5 对filter进行分组聚合：filters</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;agg-ny-data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filters&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;other_bucket_key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;other&quot;</span><span class="token punctuation">,</span> 
        <span class="token property">&quot;filters&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;202001&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;ny&quot;</span><span class="token operator">:</span><span class="token string">&quot;202001&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;202002&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;ny&quot;</span><span class="token operator">:</span><span class="token string">&quot;202002&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;202005&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;ny&quot;</span><span class="token operator">:</span><span class="token string">&quot;202002&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6-对number类型聚合-range" tabindex="-1"><a class="header-anchor" href="#_5-6-对number类型聚合-range" aria-hidden="true">#</a> 5.6 对number类型聚合：Range</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ny_ranges&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ny&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ranges&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span><span class="token property">&quot;to&quot;</span><span class="token operator">:</span><span class="token number">202003</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">202003</span><span class="token punctuation">,</span>
            <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token number">202005</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-7-对日期类型聚合-date-range" tabindex="-1"><a class="header-anchor" href="#_5-7-对日期类型聚合-date-range" aria-hidden="true">#</a> 5.7 对日期类型聚合：Date Range</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;date_range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cprq&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">,</span> 
        <span class="token property">&quot;ranges&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-03-01&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;to&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-06-01&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-8-对柱状图功能-histrogram" tabindex="-1"><a class="header-anchor" href="#_5-8-对柱状图功能-histrogram" aria-hidden="true">#</a> 5.8 对柱状图功能：Histrogram</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;aggs-ny&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;histogram&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ny&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;interval&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;aggs-fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;fymc.keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-其他操作" tabindex="-1"><a class="header-anchor" href="#_6-其他操作" aria-hidden="true">#</a> 6.其他操作</h2><h3 id="_6-1-查找全部" tabindex="-1"><a class="header-anchor" href="#_6-1-查找全部" aria-hidden="true">#</a> 6.1 查找全部</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;track_total_hits&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
 <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-高亮搜索" tabindex="-1"><a class="header-anchor" href="#_6-2-高亮搜索" aria-hidden="true">#</a> 6.2 高亮搜索</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;诈骗&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;pre_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;&lt;em&gt;&quot;</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">&quot;post_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token string">&quot;&lt;/em&gt;&quot;</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-分词分析" tabindex="-1"><a class="header-anchor" href="#_6-3-分词分析" aria-hidden="true">#</a> 6.3 分词分析</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 分词分析
GET case/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ay_list&quot;</span> <span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;饺子真好吃&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221223142857600.png" alt="image-20221223142857600" tabindex="0" loading="lazy"><figcaption>image-20221223142857600</figcaption></figure>`,101),o=[p];function i(l,c){return s(),a("div",null,o)}const r=n(t,[["render",i],["__file","elasticsearch-demo.html.vue"]]);export{r as default};
