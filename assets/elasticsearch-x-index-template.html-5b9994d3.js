import{_ as i,W as p,X as l,Y as n,Z as a,$ as t,a0 as e,D as o}from"./framework-0cf5f349.js";const c={},u=e('<h1 id="es详解-索引-索引模板-index-template-详解" tabindex="-1"><a class="header-anchor" href="#es详解-索引-索引模板-index-template-详解" aria-hidden="true">#</a> ES详解 - 索引：索引模板(Index Template)详解</h1><blockquote><p>前文介绍了索引的一些操作，特别是手动创建索引，但是批量和脚本化必然需要提供一种模板方式快速构建和管理索引，这就是本文要介绍的索引模板(Index Template)，它是一种告诉Elasticsearch在创建索引时如何配置索引的方法。为了更好的复用性，在7.8中还引入了组件模板。</p></blockquote><h2 id="_1-1-索引模板" tabindex="-1"><a class="header-anchor" href="#_1-1-索引模板" aria-hidden="true">#</a> 1.1. 索引模板</h2><blockquote><p>索引模板是一种告诉Elasticsearch在创建索引时如何配置索引的方法。</p></blockquote><ul><li><strong>使用方式</strong></li></ul><p>在创建索引之前可以先配置模板，这样在创建索引（手动创建索引或通过对文档建立索引）时，模板设置将用作创建索引的基础。</p><h3 id="_1-2-模板类型" tabindex="-1"><a class="header-anchor" href="#_1-2-模板类型" aria-hidden="true">#</a> 1.2. 模板类型</h3><p>模板有两种类型：<strong>索引模板</strong>和<strong>组件模板</strong>。</p><ol><li><strong>组件模板</strong>是可重用的构建块，用于配置映射，设置和别名；它们不会直接应用于一组索引。</li><li><strong>索引模板</strong>可以包含组件模板的集合，也可以直接指定设置，映射和别名。</li></ol><h3 id="_1-3-索引模板中的优先级" tabindex="-1"><a class="header-anchor" href="#_1-3-索引模板中的优先级" aria-hidden="true">#</a> 1.3. 索引模板中的优先级</h3><ol><li>可组合模板优先于旧模板。如果没有可组合模板匹配给定索引，则旧版模板可能仍匹配并被应用。</li><li>如果使用显式设置创建索引并且该索引也与索引模板匹配，则创建索引请求中的设置将优先于索引模板及其组件模板中指定的设置。</li><li>如果新数据流或索引与多个索引模板匹配，则使用优先级最高的索引模板。</li></ol><h3 id="_1-4-内置索引模板" tabindex="-1"><a class="header-anchor" href="#_1-4-内置索引模板" aria-hidden="true">#</a> 1.4. 内置索引模板</h3><p>Elasticsearch具有内置索引模板，每个索引模板的优先级为100，适用于以下索引模式：</p><ol><li><code>logs-*-*</code></li><li><code>metrics-*-*</code></li><li><code>synthetics-*-*</code></li></ol>',14),r={href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html",target:"_blank",rel:"noopener noreferrer"},d=e(`<h3 id="_1-5-案例" tabindex="-1"><a class="header-anchor" href="#_1-5-案例" aria-hidden="true">#</a> 1.5 案例</h3><ul><li>首先<strong>创建两个索引组件模板</strong>：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT _component_template/component_template1
<span class="token punctuation">{</span>
  <span class="token string">&quot;template&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT _component_template/runtime_component_template
<span class="token punctuation">{</span>
  <span class="token string">&quot;template&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;runtime&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> 
        <span class="token string">&quot;day_of_week&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;script&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;emit(doc[&#39;@timestamp&#39;].value.dayOfWeekEnum.getDisplayName(TextStyle.FULL, Locale.ROOT))&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804225958359.png" alt="image-20220804225958359" tabindex="0" loading="lazy"><figcaption>image-20220804225958359</figcaption></figure><ul><li><strong>创建使用组件模板的索引模板</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT _index_template/template_1
<span class="token punctuation">{</span>
  <span class="token string">&quot;index_patterns&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bar*&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;template&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;enabled&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;host_name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;created_at&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>,
          <span class="token string">&quot;format&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;EEE MMM dd HH:mm:ss Z yyyy&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;aliases&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;mydata&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;priority&quot;</span><span class="token builtin class-name">:</span> <span class="token number">500</span>,
  <span class="token string">&quot;composed_of&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;component_template1&quot;</span>, <span class="token string">&quot;runtime_component_template&quot;</span><span class="token punctuation">]</span>, 
  <span class="token string">&quot;version&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>,
  <span class="token string">&quot;_meta&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;description&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my custom&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804230128229.png" alt="image-20220804230128229" tabindex="0" loading="lazy"><figcaption>image-20220804230128229</figcaption></figure><ul><li>创建一个匹配<code>bar*</code>的索引<code>bar-test</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /bar-test 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后获取mapping</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /bar-test/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行结果如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804230207857.png" alt="image-20220804230207857" tabindex="0" loading="lazy"><figcaption>image-20220804230207857</figcaption></figure><h2 id="_2-模拟多组件模板" tabindex="-1"><a class="header-anchor" href="#_2-模拟多组件模板" aria-hidden="true">#</a> 2. 模拟多组件模板</h2><blockquote><p>由于模板不仅可以由多个组件模板组成，还可以由索引模板自身组成；那么最终的索引设置将是什么呢？ElasticSearch设计者考虑到这个，提供了API进行模拟组合后的模板的配置。</p></blockquote><h3 id="_2-1-模拟某个索引结果" tabindex="-1"><a class="header-anchor" href="#_2-1-模拟某个索引结果" aria-hidden="true">#</a> 2.1 模拟某个索引结果</h3><p>比如上面的template_1, 我们不用创建bar*的索引(这里模拟bar-pdai-test)，也可以模拟计算出索引的配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_index_template/_simulate_index/bar-pdai-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行结果如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804230349682.png" alt="image-20220804230349682" tabindex="0" loading="lazy"><figcaption>image-20220804230349682</figcaption></figure><h3 id="_2-2-模拟组件模板结果" tabindex="-1"><a class="header-anchor" href="#_2-2-模拟组件模板结果" aria-hidden="true">#</a> 2.2 模拟组件模板结果</h3><p>当然，由于template_1模板是由两个组件模板组合的，我们也可以模拟出template_1被组合后的索引配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_index_template/_simulate/template_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;template&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;number_of_shards&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;runtime&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;day_of_week&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;script&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;source&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;emit(doc[&#39;@timestamp&#39;].value.dayOfWeekEnum.getDisplayName(TextStyle.FULL, Locale.ROOT))&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;lang&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;painless&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;@timestamp&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;created_at&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;format&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;EEE MMM dd HH:mm:ss Z yyyy&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;host_name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;aliases&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;mydata&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;overlapping&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-模拟组件模板和自身模板结合后的结果" tabindex="-1"><a class="header-anchor" href="#_2-3-模拟组件模板和自身模板结合后的结果" aria-hidden="true">#</a> 2.3 模拟组件模板和自身模板结合后的结果</h3><ul><li>新建两个模板</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /_component_template/ct1
<span class="token punctuation">{</span>
  <span class="token string">&quot;template&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;index.number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT /_component_template/ct2
<span class="token punctuation">{</span>
  <span class="token string">&quot;template&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;index.number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;@timestamp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模拟在两个组件模板的基础上，添加自身模板的配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_index_template/_simulate
<span class="token punctuation">{</span>
  <span class="token string">&quot;index_patterns&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;my*&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;template&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;index.number_of_shards&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;composed_of&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ct1&quot;</span>, <span class="token string">&quot;ct2&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行的结果如下</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;template&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;number_of_shards&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_replicas&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;0&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;@timestamp&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;aliases&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;overlapping&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804230703815.png" alt="image-20220804230703815" tabindex="0" loading="lazy"><figcaption>image-20220804230703815</figcaption></figure><h2 id="_3-实战" tabindex="-1"><a class="header-anchor" href="#_3-实战" aria-hidden="true">#</a> 3. 实战</h2><h3 id="_3-1-通过指定索引生命周期策略" tabindex="-1"><a class="header-anchor" href="#_3-1-通过指定索引生命周期策略" aria-hidden="true">#</a> 3.1 通过指定索引生命周期策略</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT _template/my_template
<span class="token punctuation">{</span>
  <span class="token string">&quot;index_patterns&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;dataexa-*&quot;</span><span class="token punctuation">]</span>,
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
    <span class="token string">&quot;index.lifecycle.name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;7-days-default&quot;</span>,
    <span class="token string">&quot;index.lifecycle.rollover_alias&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;my_alias&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230516153933037.png" alt="image-20230516153933037" tabindex="0" loading="lazy"><figcaption>image-20230516153933037</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,40),m={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-index-template.html",target:"_blank",rel:"noopener noreferrer"},v=n("strong",null,"ES详解 - 索引：索引模板(Index Template)详解",-1);function k(b,g){const s=o("ExternalLinkIcon");return p(),l("div",null,[u,n("p",null,[a("所以在涉及内建索引模板时，要避免索引模式冲突。更多可以参考"),n("a",r,[a("这里"),t(s)])]),d,n("p",null,[n("a",m,[v,t(s)])])])}const h=i(c,[["render",k],["__file","elasticsearch-x-index-template.html.vue"]]);export{h as default};
