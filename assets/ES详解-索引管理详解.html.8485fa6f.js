import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{o as e,c as i,a as s,b as t,e as l,r as p}from"./app.6bf01134.js";const o={},c=l(`<h1 id="es\u8BE6\u89E3-\u7D22\u5F15-\u7D22\u5F15\u7BA1\u7406\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#es\u8BE6\u89E3-\u7D22\u5F15-\u7D22\u5F15\u7BA1\u7406\u8BE6\u89E3" aria-hidden="true">#</a> ES\u8BE6\u89E3 - \u7D22\u5F15\uFF1A\u7D22\u5F15\u7BA1\u7406\u8BE6\u89E3</h1><blockquote><p>\u4E86\u89E3\u57FA\u672C\u4F7F\u7528\u540E\uFF0C\u6211\u4EEC\u4ECE\u7D22\u5F15\u64CD\u4F5C\u7684\u89D2\u5EA6\u770B\u770B\u5982\u4F55\u5BF9\u7D22\u5F15\u8FDB\u884C\u7BA1\u7406\u3002</p></blockquote><h2 id="_1-\u7D22\u5F15\u7BA1\u7406\u7684\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#_1-\u7D22\u5F15\u7BA1\u7406\u7684\u5F15\u5165" aria-hidden="true">#</a> 1. \u7D22\u5F15\u7BA1\u7406\u7684\u5F15\u5165</h2><p>\u6211\u4EEC\u5728\u524D\u6587\u4E2D\u589E\u52A0\u6587\u6863\u65F6\uFF0C\u5982\u4E0B\u7684\u8BED\u53E5\u4F1A\u52A8\u6001\u521B\u5EFA\u4E00\u4E2Acustomer\u7684index\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /customer/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;John Doe&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u800C\u8FD9\u4E2Aindex\u5B9E\u9645\u4E0A\u5DF2\u7ECF\u81EA\u52A8\u521B\u5EFA\u4E86\u5B83\u91CC\u9762\u7684\u5B57\u6BB5\uFF08name\uFF09\u7684\u7C7B\u578B\u3002\u6211\u4EEC\u4E0D\u59A8\u770B\u4E0B\u5B83\u81EA\u52A8\u521B\u5EFA\u7684mapping\uFF1A</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u90A3\u4E48\u5982\u679C\u6211\u4EEC\u9700\u8981\u5BF9\u8FD9\u4E2A\u5EFA\u7ACB\u7D22\u5F15\u7684\u8FC7\u7A0B\u505A\u66F4\u591A\u7684\u63A7\u5236\uFF1A\u6BD4\u5982\u60F3\u8981\u786E\u4FDD\u8FD9\u4E2A\u7D22\u5F15\u6709\u6570\u91CF\u9002\u4E2D\u7684\u4E3B\u5206\u7247\uFF0C\u5E76\u4E14\u5728\u6211\u4EEC\u7D22\u5F15\u4EFB\u4F55\u6570\u636E\u4E4B\u524D\uFF0C\u5206\u6790\u5668\u548C\u6620\u5C04\u5DF2\u7ECF\u88AB\u5EFA\u7ACB\u597D\u3002\u90A3\u4E48\u5C31\u4F1A\u5F15\u5165\u4E24\u70B9\uFF1A\u7B2C\u4E00\u4E2A<strong>\u7981\u6B62\u81EA\u52A8\u521B\u5EFA\u7D22\u5F15</strong>\uFF0C\u7B2C\u4E8C\u4E2A\u662F<strong>\u624B\u52A8\u521B\u5EFA\u7D22\u5F15</strong>\u3002</p><ul><li>\u7981\u6B62\u81EA\u52A8\u521B\u5EFA\u7D22\u5F15</li></ul><p>\u53EF\u4EE5\u901A\u8FC7\u5728 config/elasticsearch.yml \u7684\u6BCF\u4E2A\u8282\u70B9\u4E0B\u6DFB\u52A0\u4E0B\u9762\u7684\u914D\u7F6E\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>action.auto_create_index: <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u624B\u52A8\u521B\u5EFA\u7D22\u5F15\u5C31\u662F\u63A5\u4E0B\u6765\u6587\u7AE0\u7684\u5185\u5BB9\u3002</p><h2 id="_2-\u7D22\u5F15\u7684\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#_2-\u7D22\u5F15\u7684\u683C\u5F0F" aria-hidden="true">#</a> 2. \u7D22\u5F15\u7684\u683C\u5F0F</h2><p>\u5728\u8BF7\u6C42\u4F53\u91CC\u9762\u4F20\u5165\u8BBE\u7F6E\u6216\u7C7B\u578B\u6620\u5C04\uFF0C\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /my_index
<span class="token punctuation">{</span>
    <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token punctuation">..</span>. any settings <span class="token punctuation">..</span>. <span class="token punctuation">}</span>,
    <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token punctuation">..</span>. any properties <span class="token punctuation">..</span>. <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>settings</strong>: \u7528\u6765\u8BBE\u7F6E\u5206\u7247,\u526F\u672C\u7B49\u914D\u7F6E\u4FE1\u606F</li><li><strong>mappings</strong>: \u5B57\u6BB5\u6620\u5C04\uFF0C\u7C7B\u578B\u7B49 <ul><li><strong>properties</strong>: \u7531\u4E8Etype\u5728\u540E\u7EED\u7248\u672C\u4E2D\u4F1A\u88ABDeprecated, \u6240\u4EE5\u65E0\u9700\u88ABtype\u5D4C\u5957</li></ul></li></ul><h2 id="_3-\u7D22\u5F15\u7BA1\u7406\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_3-\u7D22\u5F15\u7BA1\u7406\u64CD\u4F5C" aria-hidden="true">#</a> 3. \u7D22\u5F15\u7BA1\u7406\u64CD\u4F5C</h2><blockquote><p>\u6211\u4EEC\u901A\u8FC7kibana\u7684devtool\u6765\u5B66\u4E60\u7D22\u5F15\u7684\u7BA1\u7406\u64CD\u4F5C\u3002</p></blockquote><h3 id="_3-1-\u521B\u5EFA\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_3-1-\u521B\u5EFA\u7D22\u5F15" aria-hidden="true">#</a> 3.1 \u521B\u5EFA\u7D22\u5F15</h3><p>\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2Auser \u7D22\u5F15<code>test-index-users</code>\uFF0C\u5176\u4E2D\u5305\u542B\u4E09\u4E2A\u5C5E\u6027\uFF1Aname\uFF0Cage, remarks; \u5B58\u50A8\u5728\u4E00\u4E2A\u5206\u7247\u4E00\u4E2A\u526F\u672C\u4E0A\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /test-index-users
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
		<span class="token string">&quot;number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>,
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
            <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;long&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;remarks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220348876.png" alt="image-20220804220348876" loading="lazy"></p><ul><li><strong>\u63D2\u5165\u6D4B\u8BD5\u6570\u636E</strong></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>post /test-index-users/_doc
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;zhangsan&quot;</span>,
  <span class="token string">&quot;age&quot;</span>:18,
  <span class="token string">&quot;remarks&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;hello world&quot;</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220620567.png" alt="image-20220804220620567" loading="lazy"></p><ul><li>\u67E5\u770B\u6570\u636E</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-index-users/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220806547.png" alt="image-20220804220806547" loading="lazy"></p><ul><li>\u6211\u4EEC\u518D<strong>\u6D4B\u8BD5\u4E0B\u4E0D\u5339\u914D\u7684\u6570\u636E\u7C7B\u578B</strong>(age)\uFF1A</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /test-index-users/_doc
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test user&quot;</span>,
  <span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;error_age&quot;</span>,
  <span class="token string">&quot;remarks&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;hello eeee&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F60\u53EF\u4EE5\u770B\u5230\u65E0\u6CD5\u7C7B\u578B\u4E0D\u5339\u914D\u7684\u9519\u8BEF\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804220942671.png" alt="image-20220804220942671" loading="lazy"></p><h3 id="_3-2-\u4FEE\u6539\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_3-2-\u4FEE\u6539\u7D22\u5F15" aria-hidden="true">#</a> 3.2 \u4FEE\u6539\u7D22\u5F15</h3><p>\u67E5\u770B\u521A\u624D\u7684\u7D22\u5F15,<code>curl &#39;localhost:9200/_cat/indices?v&#39; | grep users</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yellow <span class="token function">open</span> test-index-users                          LSaIB57XSC6uVtGQHoPYxQ <span class="token number">1</span> <span class="token number">1</span>     <span class="token number">1</span>    <span class="token number">0</span>   <span class="token number">4</span>.4kb   <span class="token number">4</span>.4kb

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u6CE8\u610F\u5230\u521A\u521B\u5EFA\u7684\u7D22\u5F15\u7684\u72B6\u6001\u662Fyellow\u7684\uFF0C\u56E0\u4E3A\u6211\u6D4B\u8BD5\u7684\u73AF\u5883\u662F\u5355\u70B9\u73AF\u5883\uFF0C\u65E0\u6CD5\u521B\u5EFA\u526F\u672C\uFF0C\u4F46\u662F\u5728\u4E0A\u8FF0<code>number_of_replicas</code>\u914D\u7F6E\u4E2D\u8BBE\u7F6E\u4E86\u526F\u672C\u6570\u662F1\uFF1B \u6240\u4EE5\u5728\u8FD9\u4E2A\u65F6\u5019\u6211\u4EEC\u9700\u8981\u4FEE\u6539\u7D22\u5F15\u7684\u914D\u7F6E\u3002</p><p>\u4FEE\u6539\u526F\u672C\u6570\u91CF\u4E3A0</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /test-index-users/_settings
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221203156.png" alt="image-20220804221203156" loading="lazy"></p><p>\u518D\u6B21\u67E5\u770B\u72B6\u6001\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>green <span class="token function">open</span> test-index-users                          LSaIB57XSC6uVtGQHoPYxQ <span class="token number">1</span> <span class="token number">1</span>     <span class="token number">1</span>    <span class="token number">0</span>   <span class="token number">4</span>.4kb   <span class="token number">4</span>.4kb

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-\u6253\u5F00-\u5173\u95ED\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_3-3-\u6253\u5F00-\u5173\u95ED\u7D22\u5F15" aria-hidden="true">#</a> 3.3 \u6253\u5F00/\u5173\u95ED\u7D22\u5F15</h3><ul><li><p><strong>\u5173\u95ED\u7D22\u5F15</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>POST /test-index-users/_close
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>\u4E00\u65E6\u7D22\u5F15\u88AB\u5173\u95ED\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u7D22\u5F15\u53EA\u80FD\u663E\u793A\u5143\u6570\u636E\u4FE1\u606F\uFF0C<strong>\u4E0D\u80FD\u591F\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C</strong>\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221359572.png" alt="image-20220804221359572" loading="lazy"></p><p>\u5F53\u5173\u95ED\u4EE5\u540E\uFF0C\u518D\u63D2\u5165\u6570\u636E\u65F6\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221616801.png" alt="image-20220804221616801" loading="lazy"></p><ul><li><strong>\u6253\u5F00\u7D22\u5F15</strong></li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221707621.png" alt="image-20220804221707621" loading="lazy"></p><p>\u6253\u5F00\u540E\u53C8\u53EF\u4EE5\u91CD\u65B0\u5199\u6570\u636E\u4E86</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221723173.png" alt="image-20220804221723173" loading="lazy"></p><h3 id="_3-4-\u5220\u9664\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_3-4-\u5220\u9664\u7D22\u5F15" aria-hidden="true">#</a> 3.4 \u5220\u9664\u7D22\u5F15</h3><p>\u6700\u540E\u6211\u4EEC\u5C06\u521B\u5EFA\u7684test-index-users\u5220\u9664\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>DELETE /test-index-users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-\u5220\u9664\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_3-5-\u5220\u9664\u7D22\u5F15" aria-hidden="true">#</a> 3.5 \u5220\u9664\u7D22\u5F15</h3><p>\u6700\u540E\u6211\u4EEC\u5C06\u521B\u5EFA\u7684test-index-users\u5220\u9664\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>DELETE /test-index-users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804221813596.png" alt="image-20220804221813596" loading="lazy"></p><h3 id="_3-6-\u67E5\u770B\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_3-6-\u67E5\u770B\u7D22\u5F15" aria-hidden="true">#</a> 3.6 \u67E5\u770B\u7D22\u5F15</h3><p>\u7531\u4E8Etest-index-users\u88AB\u5220\u9664\uFF0C\u6240\u4EE5\u6211\u4EEC\u770B\u4E0B\u4E4B\u524Dbank\u7684\u7D22\u5F15\u7684\u4FE1\u606F</p><ul><li><strong>mapping</strong></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /bank/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804222117904.png" alt="image-20220804222117904" loading="lazy"></p><ul><li><strong>settings</strong></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /bank/_settings
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804222140597.png" alt="image-20220804222140597" loading="lazy"></p><h2 id="_4-kibana\u7BA1\u7406\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_4-kibana\u7BA1\u7406\u7D22\u5F15" aria-hidden="true">#</a> 4. Kibana\u7BA1\u7406\u7D22\u5F15</h2><p>\u5728Kibana\u5982\u4E0B\u8DEF\u5F84\uFF0C\u6211\u4EEC\u53EF\u4EE5\u67E5\u770B\u548C\u7BA1\u7406\u7D22\u5F15</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220804222249667.png" alt="image-20220804222249667" loading="lazy"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,71),u={href:"https://pdai.tech/md/db/nosql-es/elasticsearch-x-index-mapping.html",target:"_blank",rel:"noopener noreferrer"},r=s("strong",null,"ES\u8BE6\u89E3 - \u7D22\u5F15\uFF1A\u7D22\u5F15\u7BA1\u7406\u8BE6\u89E3",-1);function d(m,b){const n=p("ExternalLinkIcon");return e(),i("div",null,[c,s("p",null,[s("a",u,[r,t(n)])])])}var k=a(o,[["render",d],["__file","ES\u8BE6\u89E3-\u7D22\u5F15\u7BA1\u7406\u8BE6\u89E3.html.vue"]]);export{k as default};
