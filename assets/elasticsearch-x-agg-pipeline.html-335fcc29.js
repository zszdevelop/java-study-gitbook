import{_ as i,W as p,X as l,Y as n,Z as s,$ as t,a0 as e,D as o}from"./framework-0cf5f349.js";const c={},u=e('<h1 id="es详解-聚合-聚合查询之pipline聚合详解" tabindex="-1"><a class="header-anchor" href="#es详解-聚合-聚合查询之pipline聚合详解" aria-hidden="true">#</a> ES详解 - 聚合：聚合查询之Pipline聚合详解</h1><blockquote><p>前文主要讲了 ElasticSearch提供的三种聚合方式之指标聚合（Metric Aggregation)，本文主要讲讲管道聚合（Pipeline Aggregation)。简单而言就是让上一步的聚合结果成为下一个聚合的输入，这就是管道。</p></blockquote><h2 id="_1-如何理解pipeline聚合" tabindex="-1"><a class="header-anchor" href="#_1-如何理解pipeline聚合" aria-hidden="true">#</a> 1. 如何理解pipeline聚合</h2><blockquote><p>如何理解管道聚合呢？最重要的是要站在设计者角度看这个功能的要实现的目的：让上一步的聚合结果成为下一个聚合的输入，这就是管道。</p></blockquote><h3 id="_1-1-管道机制的常见场景" tabindex="-1"><a class="header-anchor" href="#_1-1-管道机制的常见场景" aria-hidden="true">#</a> 1.1 管道机制的常见场景</h3>',5),r={href:"https://pdai.tech/md/framework/tomcat/tomcat-x-container-pipline.html#%E7%9F%A5%E8%AF%86%E5%87%86%E5%A4%87",target:"_blank",rel:"noopener noreferrer"},d=n("h4",{id:"_1-1-1-责任链模式",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-1-1-责任链模式","aria-hidden":"true"},"#"),s(" 1.1.1 责任链模式")],-1),k=n("p",null,"管道机制在设计模式上属于责任链模式，如果你不理解，请参看如下文章：",-1),v={href:"https://pdai.tech/md/dev-spec/pattern/15_chain.html",target:"_blank",rel:"noopener noreferrer"},b=e(`<h4 id="_1-1-2-filterchain" tabindex="-1"><a class="header-anchor" href="#_1-1-2-filterchain" aria-hidden="true">#</a> 1.1.2 FilterChain</h4><p>在软件开发的常接触的责任链模式是FilterChain，它体现在很多软件设计中：</p><ul><li><strong>比如Spring Security框架中</strong></li></ul><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220806222013752.png" alt="image-20220806222013752" tabindex="0" loading="lazy"><figcaption>image-20220806222013752</figcaption></figure><ul><li><strong>比如HttpServletRequest处理的过滤器中</strong></li></ul><p>当一个request过来的时候，需要对这个request做一系列的加工，使用责任链模式可以使每个加工组件化，减少耦合。也可以使用在当一个request过来的时候，需要找到合适的加工方式。当一个加工方式不适合这个request的时候，传递到下一个加工方法，该加工方式再尝试对request加工。</p><p>网上找了图，这里我们后文将通过Tomcat请求处理向你阐述。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220806222120276.png" alt="image-20220806222120276" tabindex="0" loading="lazy"><figcaption>image-20220806222120276</figcaption></figure><h3 id="_1-2-elasticsearch设计管道机制" tabindex="-1"><a class="header-anchor" href="#_1-2-elasticsearch设计管道机制" aria-hidden="true">#</a> 1.2 ElasticSearch设计管道机制</h3><p>简单而言：让上一步的聚合结果成为下一个聚合的输入，这就是管道。</p><p>接下来，无非就是对不同类型的聚合有接口的支撑，比如：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220806222204594.png" alt="image-20220806222204594" tabindex="0" loading="lazy"><figcaption>image-20220806222204594</figcaption></figure><blockquote><p>第一个维度：管道聚合有很多不同<strong>类型</strong>，每种类型都与其他聚合计算不同的信息，但是可以将这些类型分为两类：</p></blockquote><ul><li><strong>父级</strong> 父级聚合的输出提供了一组管道聚合，它可以计算新的存储桶或新的聚合以添加到现有存储桶中。</li><li><strong>兄弟</strong> 同级聚合的输出提供的管道聚合，并且能够计算与该同级聚合处于同一级别的新聚合。</li></ul><blockquote><p>第二个维度：根据<strong>功能设计</strong>的意图</p></blockquote><p>比如前置聚合可能是Bucket聚合，后置的可能是基于Metric聚合，那么它就可以成为一类管道</p><p>进而引出了：<code>xxx bucket</code>(是不是很容易理解了)</p><ul><li>Bucket聚合 -&gt; Metric聚合： bucket聚合的结果，成为下一步metric聚合的输入 <ul><li>Average bucket</li><li>Min bucket</li><li>Max bucket</li><li>Sum bucket</li><li>Stats bucket</li><li>Extended stats bucket</li></ul></li></ul><p>对构建体系而言，理解上面的已经够了，其它的类型不过是锦上添花而言。</p><h2 id="_2-一些例子" tabindex="-1"><a class="header-anchor" href="#_2-一些例子" aria-hidden="true">#</a> 2. 一些例子</h2><blockquote><p>这里我们通过几个简单的例子看看即可，具体如果需要使用看看文档即可xw</p></blockquote><h3 id="_2-1-average-bucket-聚合" tabindex="-1"><a class="header-anchor" href="#_2-1-average-bucket-聚合" aria-hidden="true">#</a> 2.1 Average bucket 聚合</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST _search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;sales_per_month&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;date_histogram&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>,
        <span class="token string">&quot;calendar_interval&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;month&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;avg_monthly_sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
// tag::avg-bucket-agg-syntax<span class="token punctuation">[</span><span class="token punctuation">]</span>               
      <span class="token string">&quot;avg_bucket&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;buckets_path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;sales_per_month&gt;sales&quot;</span>,
        <span class="token string">&quot;gap_policy&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;skip&quot;</span>,
        <span class="token string">&quot;format&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;#,##0.00;(#,##0.00)&quot;</span>
      <span class="token punctuation">}</span>
// end::avg-bucket-agg-syntax<span class="token punctuation">[</span><span class="token punctuation">]</span>               
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>嵌套的bucket聚合：聚合出按月价格的直方图</li><li>Metic聚合：对上面的聚合再求平均值。</li></ul><p><strong>字段类型</strong>：</p><ul><li>buckets_path：指定聚合的名称，支持多级嵌套聚合。</li><li>gap_policy 当管道聚合遇到不存在的值，有点类似于term等聚合的(missing)时所采取的策略，可选择值为：skip、insert_zeros。</li><li>skip：此选项将丢失的数据视为bucket不存在。它将跳过桶并使用下一个可用值继续计算。</li><li>format 用于格式化聚合桶的输出(key)。</li></ul><p>输出结果如下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> ...<span class="token punctuation">,</span>
  <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;sales_per_month&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;buckets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key_as_string&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/01/01 00:00:00&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token number">1420070400000</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
          <span class="token property">&quot;sales&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">550.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key_as_string&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/02/01 00:00:00&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token number">1422748800000</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
          <span class="token property">&quot;sales&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">60.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;key_as_string&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2015/03/01 00:00:00&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;key&quot;</span><span class="token operator">:</span> <span class="token number">1425168000000</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc_count&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
          <span class="token property">&quot;sales&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">375.0</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avg_monthly_sales&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">328.33333333333333</span><span class="token punctuation">,</span>
      <span class="token property">&quot;value_as_string&quot;</span><span class="token operator">:</span> <span class="token string">&quot;328.33&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-stats-bucket-聚合" tabindex="-1"><a class="header-anchor" href="#_2-2-stats-bucket-聚合" aria-hidden="true">#</a> 2.2 Stats bucket 聚合</h3><p>进一步的stat bucket也很容易理解了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /sales/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
  <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;sales_per_month&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;date_histogram&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>,
        <span class="token string">&quot;calendar_interval&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;month&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;aggs&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;price&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;stats_monthly_sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;stats_bucket&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;buckets_path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;sales_per_month&gt;sales&quot;</span> 
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
   <span class="token string">&quot;took&quot;</span><span class="token builtin class-name">:</span> <span class="token number">11</span>,
   <span class="token string">&quot;timed_out&quot;</span><span class="token builtin class-name">:</span> false,
   <span class="token string">&quot;_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">..</span>.,
   <span class="token string">&quot;hits&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">..</span>.,
   <span class="token string">&quot;aggregations&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;sales_per_month&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
         <span class="token string">&quot;buckets&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
               <span class="token string">&quot;key_as_string&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2015/01/01 00:00:00&quot;</span>,
               <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1420070400000</span>,
               <span class="token string">&quot;doc_count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>,
               <span class="token string">&quot;sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                  <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">550.0</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token punctuation">{</span>
               <span class="token string">&quot;key_as_string&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2015/02/01 00:00:00&quot;</span>,
               <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1422748800000</span>,
               <span class="token string">&quot;doc_count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
               <span class="token string">&quot;sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                  <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">60.0</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token punctuation">{</span>
               <span class="token string">&quot;key_as_string&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2015/03/01 00:00:00&quot;</span>,
               <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1425168000000</span>,
               <span class="token string">&quot;doc_count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
               <span class="token string">&quot;sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                  <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">375.0</span>
               <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
         <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;stats_monthly_sales&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
         <span class="token string">&quot;count&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>,
         <span class="token string">&quot;min&quot;</span><span class="token builtin class-name">:</span> <span class="token number">60.0</span>,
         <span class="token string">&quot;max&quot;</span><span class="token builtin class-name">:</span> <span class="token number">550.0</span>,
         <span class="token string">&quot;avg&quot;</span><span class="token builtin class-name">:</span> <span class="token number">328.3333333333333</span>,
         <span class="token string">&quot;sum&quot;</span><span class="token builtin class-name">:</span> <span class="token number">985.0</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,34),m={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-agg-pipeline.html",target:"_blank",rel:"noopener noreferrer"},q=n("strong",null,"ES详解 - 聚合：聚合查询之Pipline聚合详解",-1);function g(h,_){const a=o("ExternalLinkIcon");return p(),l("div",null,[u,n("blockquote",null,[n("p",null,[s("首先回顾下，我们之前在"),n("a",r,[s("Tomcat管道机制"),t(a)]),s("中向你介绍的常见的管道机制设计中的应用场景。")])]),d,k,n("p",null,[n("a",v,[s("责任链模式(Chain of responsibility pattern)"),t(a)]),s(": 通过责任链模式, 你可以为某个请求创建一个对象链. 每个对象依序检查此请求并对其进行处理或者将它传给链中的下一个对象。")]),b,n("p",null,[n("a",m,[q,t(a)])])])}const f=i(c,[["render",g],["__file","elasticsearch-x-agg-pipeline.html.vue"]]);export{f as default};
