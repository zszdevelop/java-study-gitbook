import{_ as e,W as p,X as i,Y as n,Z as s,$ as t,a0 as o,D as l}from"./framework-0cf5f349.js";const c={},u=n("h1",{id:"es详解-聚合-聚合查询之metric聚合详解",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#es详解-聚合-聚合查询之metric聚合详解","aria-hidden":"true"},"#"),s(" ES详解 - 聚合：聚合查询之Metric聚合详解")],-1),r=n("blockquote",null,[n("p",null,[s("前文主要讲了 ElasticSearch提供的三种聚合方式之"),n("strong",null,"桶聚合（Bucket Aggregation)"),s("，本文主要讲讲"),n("strong",null,"指标聚合（Metric Aggregation)"),s("。")])],-1),d=n("h2",{id:"_1-如何理解metric聚合",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-如何理解metric聚合","aria-hidden":"true"},"#"),s(" 1. 如何理解metric聚合")],-1),k={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-agg-bucket.html",target:"_blank",rel:"noopener noreferrer"},v=o(`<p>如果你直接去看官方文档，大概也有十几种：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220806215514422.png" alt="image-20220806215514422" tabindex="0" loading="lazy"><figcaption>image-20220806215514422</figcaption></figure><blockquote><p>那么metric聚合又如何理解呢？我认为从两个角度：</p></blockquote><ul><li><strong>从分类看</strong>：Metric聚合分析分为<strong>单值分析</strong>和<strong>多值分析</strong>两类</li><li><strong>从功能看</strong>：根据具体的应用场景设计了一些分析api, 比如地理位置，百分数等等</li></ul><blockquote><p>融合上述两个方面，我们可以梳理出大致的一个mind图：</p></blockquote><ul><li><p>单值分析: 只输出一个分析结果</p><ul><li>标准stat型 <ul><li><code>avg</code> 平均值</li><li><code>max</code> 最大值</li><li><code>min</code> 最小值</li><li><code>sum</code> 和</li><li><code>value_count</code> 数量</li></ul></li><li>其它类型 <ul><li><code>cardinality</code> 基数（distinct去重）</li><li><code>weighted_avg</code> 带权重的avg</li><li><code>median_absolute_deviation</code> 中位值</li></ul></li></ul></li><li><p>多值分析</p><p>: 单值之外的</p><ul><li>stats型 <ul><li><code>stats</code> 包含avg,max,min,sum和count</li><li><code>matrix_stats</code> 针对矩阵模型</li><li><code>extended_stats</code></li><li><code>string_stats</code> 针对字符串</li></ul></li><li>百分数型 <ul><li><code>percentiles</code> 百分数范围</li><li><code>percentile_ranks</code> 百分数排行</li></ul></li><li>地理位置型 <ul><li><code>geo_bounds</code> Geo bounds</li><li><code>geo_centroid</code> Geo-centroid</li><li><code>geo_line</code> Geo-Line</li></ul></li><li>Top型 <ul><li><code>top_hits</code> 分桶后的top hits</li><li><code>top_metrics</code></li></ul></li></ul></li></ul><blockquote><p><strong>通过上述列表（我就不画图了），我们构筑的体系是基于<code>分类</code>和<code>功能</code>，而不是具体的项（比如avg,percentiles...)；这是不同的认知维度: 具体的项是碎片化，分类和功能这种是你需要构筑的体系</strong>。</p></blockquote><h2 id="_2-单值分析-标准stat类型" tabindex="-1"><a class="header-anchor" href="#_2-单值分析-标准stat类型" aria-hidden="true">#</a> 2. 单值分析: 标准stat类型</h2><h3 id="_2-1-avg-平均值" tabindex="-1"><a class="header-anchor" href="#_2-1-avg-平均值" aria-hidden="true">#</a> 2.1 <code>avg</code> 平均值</h3><p>计算班级的平均分</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /exams/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;avg_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;avg_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">75.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-max-最大值" tabindex="-1"><a class="header-anchor" href="#_2-2-max-最大值" aria-hidden="true">#</a> 2.2 <code>max</code> 最大值</h3><p>计算销售最高价</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;max_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;max_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">200.0</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-min-最小值" tabindex="-1"><a class="header-anchor" href="#_2-3-min-最小值" aria-hidden="true">#</a> 2.3 <code>min</code> 最小值</h3><p>计算销售最低价</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;min_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;min_price&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-sum-和" tabindex="-1"><a class="header-anchor" href="#_2-4-sum-和" aria-hidden="true">#</a> 2.4 <code>sum</code> 和</h3><p>计算销售总价</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;constant_score&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;filter&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;hat&quot;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;hat_prices&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;hat_prices&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">450.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-value-count-数量" tabindex="-1"><a class="header-anchor" href="#_2-5-value-count-数量" aria-hidden="true">#</a> 2.5 <code>value_count</code> 数量</h3><p>销售数量统计</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;types_count&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;value_count&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span> <span class="token builtin class-name">:</span> <span class="token string">&quot;type&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;types_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">7</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-单值分析-其它类型" tabindex="-1"><a class="header-anchor" href="#_3-单值分析-其它类型" aria-hidden="true">#</a> 3. 单值分析: 其它类型</h2><h3 id="_3-1-weighted-avg-带权重的avg" tabindex="-1"><a class="header-anchor" href="#_3-1-weighted-avg-带权重的avg" aria-hidden="true">#</a> 3.1 <code>weighted_avg</code> 带权重的avg</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /exams/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;weighted_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;weighted_avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;weight&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;weight&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;weighted_grade&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">70.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-cardinality-基数-distinct去重" tabindex="-1"><a class="header-anchor" href="#_3-2-cardinality-基数-distinct去重" aria-hidden="true">#</a> 3.2 <code>cardinality</code> 基数（distinct去重）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;type_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;cardinality&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;type&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;type_count&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-median-absolute-deviation-中位值" tabindex="-1"><a class="header-anchor" href="#_3-3-median-absolute-deviation-中位值" aria-hidden="true">#</a> 3.3 <code>median_absolute_deviation</code> 中位值</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET reviews/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;review_average&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rating&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;review_variability&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;median_absolute_deviation&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rating&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;review_average&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3.0</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;review_variability&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-非单值分析-stats型" tabindex="-1"><a class="header-anchor" href="#_4-非单值分析-stats型" aria-hidden="true">#</a> 4. 非单值分析：stats型</h2><h3 id="_4-1-stats-包含avg-max-min-sum和count" tabindex="-1"><a class="header-anchor" href="#_4-1-stats-包含avg-max-min-sum和count" aria-hidden="true">#</a> 4.1 <code>stats</code> 包含avg,max,min,sum和count</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /exams/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
      <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50.0</span>,
      <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100.0</span>,
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token number">75.0</span>,
      <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token number">150.0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-matrix-stats-针对矩阵模型" tabindex="-1"><a class="header-anchor" href="#_4-2-matrix-stats-针对矩阵模型" aria-hidden="true">#</a> 4.2 <code>matrix_stats</code> 针对矩阵模型</h3><p>以下示例说明了使用矩阵统计量来描述收入与贫困之间的关系。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;statistics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;matrix_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;poverty&quot;</span>, <span class="token string">&quot;income&quot;</span> <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.
  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;statistics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;doc_count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;income&quot;</span>,
          <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
          <span class="token string">&quot;mean&quot;</span><span class="token builtin class-name">:</span> <span class="token number">51985.1</span>,
          <span class="token string">&quot;variance&quot;</span><span class="token builtin class-name">:</span> <span class="token number">7</span>.383377037755103E7,
          <span class="token string">&quot;skewness&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.5595114003506483</span>,
          <span class="token string">&quot;kurtosis&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.5692365287787124</span>,
          <span class="token string">&quot;covariance&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> <span class="token number">7</span>.383377037755103E7,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token parameter variable">-21093.65836734694</span>
          <span class="token punctuation">}</span>,
          <span class="token string">&quot;correlation&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token parameter variable">-0.8352655256272504</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>, <span class="token punctuation">{</span>
          <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;poverty&quot;</span>,
          <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50</span>,
          <span class="token string">&quot;mean&quot;</span><span class="token builtin class-name">:</span> <span class="token number">12.732000000000001</span>,
          <span class="token string">&quot;variance&quot;</span><span class="token builtin class-name">:</span> <span class="token number">8.637730612244896</span>,
          <span class="token string">&quot;skewness&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.4516049811903419</span>,
          <span class="token string">&quot;kurtosis&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.8615929677997767</span>,
          <span class="token string">&quot;covariance&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> -21093.65836734694,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token number">8.637730612244896</span>
          <span class="token punctuation">}</span>,
          <span class="token string">&quot;correlation&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;income&quot;</span><span class="token builtin class-name">:</span> -0.8352655256272504,
            <span class="token string">&quot;poverty&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-extended-stats" tabindex="-1"><a class="header-anchor" href="#_4-3-extended-stats" aria-hidden="true">#</a> 4.3 <code>extended_stats</code></h3><p>根据从汇总文档中提取的数值计算统计信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /exams/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;extended_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;grade&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的汇总计算了所有文档的成绩统计信息。聚合类型为extended_stats，并且字段设置定义将在其上计算统计信息的文档的数字字段。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;grades_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
      <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token number">50.0</span>,
      <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100.0</span>,
      <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token number">75.0</span>,
      <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token number">150.0</span>,
      <span class="token string">&quot;sum_of_squares&quot;</span><span class="token builtin class-name">:</span> <span class="token number">12500.0</span>,
      <span class="token string">&quot;variance&quot;</span><span class="token builtin class-name">:</span> <span class="token number">625.0</span>,
      <span class="token string">&quot;variance_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">625.0</span>,
      <span class="token string">&quot;variance_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1250.0</span>,
      <span class="token string">&quot;std_deviation&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
      <span class="token string">&quot;std_deviation_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
      <span class="token string">&quot;std_deviation_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">35.35533905932738</span>,
      <span class="token string">&quot;std_deviation_bounds&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;upper&quot;</span><span class="token builtin class-name">:</span> <span class="token number">125.0</span>,
        <span class="token string">&quot;lower&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
        <span class="token string">&quot;upper_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">125.0</span>,
        <span class="token string">&quot;lower_population&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
        <span class="token string">&quot;upper_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">145.71067811865476</span>,
        <span class="token string">&quot;lower_sampling&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4.289321881345245</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-string-stats-针对字符串" tabindex="-1"><a class="header-anchor" href="#_4-4-string-stats-针对字符串" aria-hidden="true">#</a> 4.4 <code>string_stats</code> 针对字符串</h3><p>用于计算从聚合文档中提取的字符串值的统计信息。这些值可以从特定的关键字字段中检索。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /my-index-000001/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;message_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;string_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;message.keyword&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

  <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;message_stats&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>,
      <span class="token string">&quot;min_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">24</span>,
      <span class="token string">&quot;max_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">30</span>,
      <span class="token string">&quot;avg_length&quot;</span><span class="token builtin class-name">:</span> <span class="token number">28.8</span>,
      <span class="token string">&quot;entropy&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3.94617750050791</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-非单值分析-百分数型" tabindex="-1"><a class="header-anchor" href="#_5-非单值分析-百分数型" aria-hidden="true">#</a> 5. 非单值分析：百分数型</h2><h3 id="_5-1-percentiles-百分数范围" tabindex="-1"><a class="header-anchor" href="#_5-1-percentiles-百分数范围" aria-hidden="true">#</a> 5.1 <code>percentiles</code> 百分数范围</h3><p>针对从聚合文档中提取的数值计算一个或多个百分位数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET latency/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_outlier&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;percentiles&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;load_time&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，百分位度量标准将生成一定范围的百分位：[1，5，25，50，75，95，99]。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

 <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_outlier&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;1.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5.0</span>,
        <span class="token string">&quot;5.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">25.0</span>,
        <span class="token string">&quot;25.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">165.0</span>,
        <span class="token string">&quot;50.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">445.0</span>,
        <span class="token string">&quot;75.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">725.0</span>,
        <span class="token string">&quot;95.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">945.0</span>,
        <span class="token string">&quot;99.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">985.0</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-percentile-ranks-百分数排行" tabindex="-1"><a class="header-anchor" href="#_5-2-percentile-ranks-百分数排行" aria-hidden="true">#</a> 5.2 <code>percentile_ranks</code> 百分数排行</h3><p>根据从汇总文档中提取的数值计算一个或多个百分位等级。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET latency/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_ranks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;percentile_ranks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;load_time&quot;</span>,   
        <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token number">500</span>, <span class="token number">600</span> <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token punctuation">..</span>.

 <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;load_time_ranks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;500.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">90.01</span>,
        <span class="token string">&quot;600.0&quot;</span><span class="token builtin class-name">:</span> <span class="token number">100.0</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述结果表示90.01％的页面加载在500ms内完成，而100％的页面加载在600ms内完成。</p><h2 id="_6-非单值分析-地理位置型" tabindex="-1"><a class="header-anchor" href="#_6-非单值分析-地理位置型" aria-hidden="true">#</a> 6. 非单值分析：地理位置型</h2><h3 id="_6-1-geo-bounds-geo-bounds" tabindex="-1"><a class="header-anchor" href="#_6-1-geo-bounds-geo-bounds" aria-hidden="true">#</a> 6.1 <code>geo_bounds</code> Geo bounds</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /museums
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /museums/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.374081,4.912350&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;NEMO Science Museum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:2<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.369219,4.901618&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Museum Het Rembrandthuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:3<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.371667,4.914722&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Nederlands Scheepvaartmuseum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:4<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;51.222900,4.405200&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Letterenhuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:5<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.861111,2.336389&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Musée du Louvre&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:6<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.860000,2.327000&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Musée d&#39;Orsay&quot;</span><span class="token punctuation">}</span>

POST /museums/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;musée&quot;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;viewport&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;geo_bounds&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;location&quot;</span>,    
        <span class="token string">&quot;wrap_longitude&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>  
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的汇总展示了如何针对具有商店业务类型的所有文档计算位置字段的边界框</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;viewport&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;bounds&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;top_left&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">48.86111099738628</span><span class="token punctuation">,</span>
          <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">2.3269999679178</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;bottom_right&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">48.85999997612089</span><span class="token punctuation">,</span>
          <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">2.3363889567553997</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-geo-centroid-geo-centroid" tabindex="-1"><a class="header-anchor" href="#_6-2-geo-centroid-geo-centroid" aria-hidden="true">#</a> 6.2 <code>geo_centroid</code> Geo-centroid</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /museums
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /museums/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:1<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.374081,4.912350&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Amsterdam&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;NEMO Science Museum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:2<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.369219,4.901618&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Amsterdam&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Museum Het Rembrandthuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:3<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;52.371667,4.914722&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Amsterdam&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Nederlands Scheepvaartmuseum&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:4<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;51.222900,4.405200&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Antwerp&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Letterenhuis&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:5<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.861111,2.336389&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Paris&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Musée du Louvre&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span>:<span class="token punctuation">{</span><span class="token string">&quot;_id&quot;</span>:6<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;48.860000,2.327000&quot;</span>, <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Paris&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Musée d&#39;Orsay&quot;</span><span class="token punctuation">}</span>

POST /museums/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;centroid&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;geo_centroid&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;location&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的汇总显示了如何针对所有具有犯罪类型的盗窃文件计算位置字段的质心。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;centroid&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;location&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;lat&quot;</span><span class="token operator">:</span> <span class="token number">51.00982965203002</span><span class="token punctuation">,</span>
        <span class="token property">&quot;lon&quot;</span><span class="token operator">:</span> <span class="token number">3.9662131341174245</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">6</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-geo-line-geo-line" tabindex="-1"><a class="header-anchor" href="#_6-3-geo-line-geo-line" aria-hidden="true">#</a> 6.3 <code>geo_line</code> Geo-Line</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT <span class="token builtin class-name">test</span>
<span class="token punctuation">{</span>
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;dynamic&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;strict&quot;</span>,
        <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;enabled&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;group&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

POST /test/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;lat&quot;</span>:37.3450570, <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span> -122.0499820<span class="token punctuation">}</span>, <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2013-09-06T16:00:36&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;lat&quot;</span><span class="token builtin class-name">:</span> <span class="token number">37.3451320</span>, <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span> -122.0499820<span class="token punctuation">}</span>, <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2013-09-06T16:00:37Z&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;my_location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;lat&quot;</span><span class="token builtin class-name">:</span> <span class="token number">37.349283</span>, <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span> -122.0505010<span class="token punctuation">}</span>, <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2013-09-06T16:00:37Z&quot;</span><span class="token punctuation">}</span>

POST /test/_search?filter_path<span class="token operator">=</span>aggregations
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;line&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;geo_line&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;point&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_location&quot;</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;@timestamp&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将存储桶中的所有geo_point值聚合到由所选排序字段排序的LineString中。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;line&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;Feature&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;geometry&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;LineString&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;coordinates&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">[</span>
            <span class="token number">-122.049982</span><span class="token punctuation">,</span>
            <span class="token number">37.345057</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">[</span>
            <span class="token number">-122.050501</span><span class="token punctuation">,</span>
            <span class="token number">37.349283</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">[</span>
            <span class="token number">-122.049982</span><span class="token punctuation">,</span>
            <span class="token number">37.345132</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;complete&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-非单值分析-top型" tabindex="-1"><a class="header-anchor" href="#_7-非单值分析-top型" aria-hidden="true">#</a> 7. 非单值分析：Top型</h2><h3 id="_7-1-top-hits-分桶后的top-hits" tabindex="-1"><a class="header-anchor" href="#_7-1-top-hits-分桶后的top-hits" aria-hidden="true">#</a> 7.1 <code>top_hits</code> 分桶后的top hits</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search?size<span class="token operator">=</span><span class="token number">0</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;top_tags&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;type&quot;</span>,
        <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;top_sales_hits&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;top_hits&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token string">&quot;date&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                  <span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
              <span class="token string">&quot;includes&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;date&quot;</span>, <span class="token string">&quot;price&quot;</span> <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  ...
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;top_tags&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       <span class="token property">&quot;doc_count_error_upper_bound&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
       <span class="token property">&quot;sum_other_doc_count&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
       <span class="token property">&quot;buckets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
             <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;hat&quot;</span><span class="token punctuation">,</span>
             <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
             <span class="token property">&quot;top_sales_hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                   <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                       <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                       <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                         <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sales&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AVnNBmauCQpcRyxw6ChK&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/03/01 00:00:00&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token number">200</span>
                         <span class="token punctuation">}</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token number">1425168000000</span>
                         <span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                      <span class="token punctuation">}</span>
                   <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
             <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;t-shirt&quot;</span><span class="token punctuation">,</span>
             <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
             <span class="token property">&quot;top_sales_hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                   <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                       <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                       <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                         <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sales&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AVnNBmauCQpcRyxw6ChL&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/03/01 00:00:00&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token number">175</span>
                         <span class="token punctuation">}</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token number">1425168000000</span>
                         <span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                      <span class="token punctuation">}</span>
                   <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
             <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bag&quot;</span><span class="token punctuation">,</span>
             <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
             <span class="token property">&quot;top_sales_hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                   <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
                       <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                       <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
                   <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                      <span class="token punctuation">{</span>
                         <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;sales&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;AVnNBmatCQpcRyxw6ChH&quot;</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token property">&quot;date&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/01/01 00:00:00&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;price&quot;</span><span class="token operator">:</span> <span class="token number">150</span>
                         <span class="token punctuation">}</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token number">1420070400000</span>
                         <span class="token punctuation">]</span><span class="token punctuation">,</span>
                         <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
                      <span class="token punctuation">}</span>
                   <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-top-metrics" tabindex="-1"><a class="header-anchor" href="#_7-2-top-metrics" aria-hidden="true">#</a> 7.2 <code>top_metrics</code></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /test/_bulk?refresh
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>, <span class="token string">&quot;m&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3.1415</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>, <span class="token string">&quot;m&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>, <span class="token string">&quot;m&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.71828</span><span class="token punctuation">}</span>
POST /test/_search?filter_path<span class="token operator">=</span>aggregations
<span class="token punctuation">{</span>
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;tm&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;top_metrics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;metrics&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;m&quot;</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;sort&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;s&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;desc&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;tm&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;top&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span><span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">&quot;metrics&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;m&quot;</span><span class="token operator">:</span> <span class="token number">2.718280076980591</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,101),m={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-agg-metric.html",target:"_blank",rel:"noopener noreferrer"},b=n("strong",null,"ES详解 - 聚合：聚合查询之Metric聚合详解",-1);function q(g,h){const a=l("ExternalLinkIcon");return p(),i("div",null,[u,r,d,n("blockquote",null,[n("p",null,[s("在"),n("a",k,[s("bucket聚合"),t(a)]),s("中，我画了一张图辅助你构筑体系，那么metric聚合又如何理解呢？")])]),v,n("p",null,[n("a",m,[b,t(a)])])])}const y=e(c,[["render",q],["__file","elasticsearch-x-agg-metric.html.vue"]]);export{y as default};
