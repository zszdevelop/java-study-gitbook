import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.b742c861.js";const t={},p=e(`<h1 id="es-\u6D4B\u8BD5demo" tabindex="-1"><a class="header-anchor" href="#es-\u6D4B\u8BD5demo" aria-hidden="true">#</a> Es-\u6D4B\u8BD5demo</h1><h2 id="_1-\u7D22\u5F15\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#_1-\u7D22\u5F15\u7BA1\u7406" aria-hidden="true">#</a> 1. \u7D22\u5F15\u7BA1\u7406</h2><h3 id="_1-1-\u67E5\u770B\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_1-1-\u67E5\u770B\u7D22\u5F15" aria-hidden="true">#</a> 1.1 \u67E5\u770B\u7D22\u5F15</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET /case/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-\u5220\u9664\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_1-2-\u5220\u9664\u7D22\u5F15" aria-hidden="true">#</a> 1.2 \u5220\u9664\u7D22\u5F15</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>DELETE case
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-dsl\u67E5\u8BE2\u4E4B\u590D\u5408\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_2-dsl\u67E5\u8BE2\u4E4B\u590D\u5408\u67E5\u8BE2" aria-hidden="true">#</a> 2. DSL\u67E5\u8BE2\u4E4B\u590D\u5408\u67E5\u8BE2</h2><h3 id="_2-1-bool-query-\u5E03\u5C14\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_2-1-bool-query-\u5E03\u5C14\u67E5\u8BE2" aria-hidden="true">#</a> 2.1 bool query(\u5E03\u5C14\u67E5\u8BE2)</h3><blockquote><p>bool\u67E5\u8BE2\u53EF\u4EE5\u7075\u6D3B\u7684\u7B5B\u9009\u548C\u8FC7\u6EE4\u51FA\u81EA\u5DF1\u60F3\u8981\u7684\u6570\u636E</p></blockquote><p>Bool\u67E5\u8BE2\u8BED\u6CD5\u6709\u4EE5\u4E0B\u7279\u70B9</p><ul><li>\u5B50\u67E5\u8BE2\u53EF\u4EE5\u4EFB\u610F\u987A\u5E8F\u51FA\u73B0</li><li>\u53EF\u4EE5\u5D4C\u5957\u591A\u4E2A\u67E5\u8BE2\uFF0C\u5305\u62ECbool\u67E5\u8BE2</li><li>\u5982\u679Cbool\u67E5\u8BE2\u4E2D\u6CA1\u6709must\u6761\u4EF6\uFF0Cshould\u4E2D\u5FC5\u987B\u81F3\u5C11\u6EE1\u8DB3\u4E00\u6761\u624D\u4F1A\u8FD4\u56DE\u7ED3\u679C\u3002</li></ul><p>bool\u67E5\u8BE2\u5305\u542B\u56DB\u79CD\u64CD\u4F5C\u7B26\uFF0C\u5206\u522B\u662Fmust,should,must_not,filter\u3002\u4ED6\u4EEC\u5747\u662F\u4E00\u79CD\u6570\u7EC4\uFF0C\u6570\u7EC4\u91CC\u9762\u662F\u5BF9\u5E94\u7684\u5224\u65AD\u6761\u4EF6\u3002</p><ul><li><code>must</code>\uFF1A \u5FC5\u987B\u5339\u914D\u3002\u8D21\u732E\u7B97\u5206</li><li><code>must_not</code>\uFF1A\u8FC7\u6EE4\u5B50\u53E5\uFF0C\u5FC5\u987B\u4E0D\u80FD\u5339\u914D\uFF0C\u4F46\u4E0D\u8D21\u732E\u7B97\u5206</li><li><code>should</code>\uFF1A \u9009\u62E9\u6027\u5339\u914D\uFF0C\u81F3\u5C11\u6EE1\u8DB3\u4E00\u6761\u3002\u8D21\u732E\u7B97\u5206</li><li><code>filter</code>\uFF1A \u8FC7\u6EE4\u5B50\u53E5\uFF0C\u5FC5\u987B\u5339\u914D\uFF0C\u4F46\u4E0D\u8D21\u732E\u7B97\u5206</li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8BC8\u9A97&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u4E8C\u5BA1&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;fymc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8FBD\u5B81\u7701&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;cjjg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u9A73\u56DE\u4E0A\u8BC9&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-boosting-query-\u63D0\u9AD8\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_2-2-boosting-query-\u63D0\u9AD8\u67E5\u8BE2" aria-hidden="true">#</a> 2.2 boosting query(\u63D0\u9AD8\u67E5\u8BE2)</h3><blockquote><p>\u4E0D\u540C\u4E8Ebool\u67E5\u8BE2\uFF0Cbool\u67E5\u8BE2\u4E2D\u53EA\u8981\u4E00\u4E2A\u5B50\u67E5\u8BE2\u6761\u4EF6\u4E0D\u5339\u914D\u90A3\u4E48\u641C\u7D22\u7684\u6570\u636E\u5C31\u4E0D\u4F1A\u51FA\u73B0\u3002\u800Cboosting query\u5219\u662F\u964D\u4F4E\u663E\u793A\u7684\u6743\u91CD/\u4F18\u5148\u7EA7\uFF08\u5373score)\u3002</p></blockquote><p>\u6848\u4EF6\u540D\u79F0\u4E2D\u5305\u542B\u8BC8\u9A97\u7684\u3001\u63D0\u9AD8\u67E5\u8BE2\u6743\u91CD\u3002\u5305\u542B\u4E00\u5BA1\u7684\u964D\u4F4E\u6743\u91CD</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>GET <span class="token keyword">case</span><span class="token operator">/</span>_search
{
  <span class="token string">&quot;query&quot;</span>: {
    <span class="token string">&quot;boosting&quot;</span>: {
      <span class="token string">&quot;positive&quot;</span>: {
        <span class="token string">&quot;term&quot;</span>: {
          <span class="token string">&quot;ajmc&quot;</span>: {
            <span class="token string">&quot;value&quot;</span>: <span class="token string">&quot;\u8BC8\u9A97&quot;</span>
          }
        }
      }<span class="token punctuation">,</span>
      <span class="token string">&quot;negative&quot;</span>: {
        <span class="token string">&quot;term&quot;</span>: {
          <span class="token string">&quot;ajmc&quot;</span>: {
            <span class="token string">&quot;value&quot;</span>: <span class="token string">&quot;\u4E00\u5BA1&quot;</span>
          }
        }
      }<span class="token punctuation">,</span>
      <span class="token string">&quot;negative_boost&quot;</span>: <span class="token number">0.2</span>
    }
  }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-constant-score-\u56FA\u5B9A\u5206\u6570\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_2-3-constant-score-\u56FA\u5B9A\u5206\u6570\u67E5\u8BE2" aria-hidden="true">#</a> 2.3 constant_score\uFF08\u56FA\u5B9A\u5206\u6570\u67E5\u8BE2\uFF09</h3><blockquote><p>\u67E5\u8BE2\u67D0\u4E2A\u6761\u4EF6\u65F6\uFF0C\u56FA\u5B9A\u7684\u8FD4\u56DE\u6307\u5B9A\u7684score\uFF1B\u663E\u7136\u5F53\u4E0D\u9700\u8981\u8BA1\u7B97score\u65F6\uFF0C\u53EA\u9700\u8981filter\u6761\u4EF6\u5373\u53EF\uFF0C\u56E0\u4E3Afilter context\u5FFD\u7565score\u3002</p></blockquote><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;constant_score&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;\u96C6\u8D44&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u8BC8\u9A97&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">1.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-dis-max-\u6700\u4F73\u5339\u914D\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_2-4-dis-max-\u6700\u4F73\u5339\u914D\u67E5\u8BE2" aria-hidden="true">#</a> 2.4 dis_max(\u6700\u4F73\u5339\u914D\u67E5\u8BE2\uFF09</h3><p>\u5206\u79BB\u6700\u5927\u5316\u67E5\u8BE2\uFF08Disjunction Max Query\uFF09\u6307\u7684\u662F\uFF1A <strong>\u5C06\u4EFB\u4F55\u4E0E\u4EFB\u4E00\u67E5\u8BE2\u5339\u914D\u7684\u6587\u6863\u4F5C\u4E3A\u7ED3\u679C\u8FD4\u56DE\uFF0C\u4F46\u53EA\u5C06\u6700\u4F73\u5339\u914D\u7684\u8BC4\u5206\u4F5C\u4E3A\u67E5\u8BE2\u7684\u8BC4\u5206\u7ED3\u679C\u8FD4\u56DE \u3002</strong></p><blockquote><p>\u6848\u4EF6\u540D\u79F0 \u548C \u5168\u6587\u4E2D\u3002\u65E0\u8BBA\u54EA\u4E2A\u5305\u542B\u8BC8\u9A97 \u76D7\u7A83 \u7684\u6743\u91CD\u9AD8\u3002\u5C31\u6392\u5728\u524D\u9762</p></blockquote><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dis_max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;tie_breaker&quot;</span><span class="token operator">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span>
      <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">1.2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;queries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8BC8\u9A97 \u76D7\u7A83&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;qw&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8BC8\u9A97 \u76D7\u7A83&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-dsl\u67E5\u8BE2\u4E4B\u5168\u6587\u641C\u7D22" tabindex="-1"><a class="header-anchor" href="#_3-dsl\u67E5\u8BE2\u4E4B\u5168\u6587\u641C\u7D22" aria-hidden="true">#</a> 3. DSL\u67E5\u8BE2\u4E4B\u5168\u6587\u641C\u7D22</h2><h3 id="_3-1-match-\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_3-1-match-\u67E5\u8BE2" aria-hidden="true">#</a> 3.1 match \u67E5\u8BE2</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-\u591A\u8BCDmatch-\u9ED8\u8BA4or" tabindex="-1"><a class="header-anchor" href="#_3-2-\u591A\u8BCDmatch-\u9ED8\u8BA4or" aria-hidden="true">#</a> 3.2 \u591A\u8BCDmatch\uFF0C\u9ED8\u8BA4or</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97 \u8D4C\u535A&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-\u591A\u8BCDmatch-\u6307\u5B9A\u4E3Aand" tabindex="-1"><a class="header-anchor" href="#_3-3-\u591A\u8BCDmatch-\u6307\u5B9A\u4E3Aand" aria-hidden="true">#</a> 3.3 \u591A\u8BCDmatch\uFF0C\u6307\u5B9A\u4E3Aand</h3><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>GET <span class="token keyword">case</span><span class="token operator">/</span>_search
{
  <span class="token string">&quot;query&quot;</span>: {
    <span class="token string">&quot;match&quot;</span>: {
      <span class="token string">&quot;ajmc&quot;</span>: {
        <span class="token string">&quot;query&quot;</span>: <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97&quot;</span><span class="token punctuation">,</span> 
        <span class="token string">&quot;operator&quot;</span>: <span class="token string">&quot;and&quot;</span>
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6" tabindex="-1"><a class="header-anchor" href="#_3-4-\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6" aria-hidden="true">#</a> 3.4 \u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6</h3><p>\u81F3\u5C11\u8981\u6EE1\u8DB3\u8FD94\u4E2A\u8BCD\u4E2D\u76843\u4E2A</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97  \u8D4C\u535A &quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token string">&quot;75%&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-match-phrase-\u641C\u7D22\u8BCD\u7EC4" tabindex="-1"><a class="header-anchor" href="#_3-5-match-phrase-\u641C\u7D22\u8BCD\u7EC4" aria-hidden="true">#</a> 3.5 match_phrase \u641C\u7D22\u8BCD\u7EC4</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-match-phrase-prefix-\u67E5\u6700\u540E\u4E00\u4E2A\u8BCD\u9879\u662F\u524D\u7F00" tabindex="-1"><a class="header-anchor" href="#_3-6-match-phrase-prefix-\u67E5\u6700\u540E\u4E00\u4E2A\u8BCD\u9879\u662F\u524D\u7F00" aria-hidden="true">#</a> 3.6 match_phrase_prefix \u67E5\u6700\u540E\u4E00\u4E2A\u8BCD\u9879\u662F\u524D\u7F00</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase_prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7-multi-match-\u4E00\u6B21\u5BF9\u591A\u4E2A\u5B57\u6BB5\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_3-7-multi-match-\u4E00\u6B21\u5BF9\u591A\u4E2A\u5B57\u6BB5\u67E5\u8BE2" aria-hidden="true">#</a> 3.7 multi_match \u4E00\u6B21\u5BF9\u591A\u4E2A\u5B57\u6BB5\u67E5\u8BE2</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u76D7\u7A83&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;qw&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8-query-string-\u6839\u636E\u8FD0\u7B97\u7B26\u6765\u89E3\u6790\u548C\u62C6\u5206\u67E5\u8BE2\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#_3-8-query-string-\u6839\u636E\u8FD0\u7B97\u7B26\u6765\u89E3\u6790\u548C\u62C6\u5206\u67E5\u8BE2\u5B57\u7B26\u4E32" aria-hidden="true">#</a> 3.8 query_string\uFF08\u6839\u636E\u8FD0\u7B97\u7B26\u6765\u89E3\u6790\u548C\u62C6\u5206\u67E5\u8BE2\u5B57\u7B26\u4E32\uFF09</h3><p>\u4F7F\u7528\u8BED\u6CD5\u6839\u636E\u8FD0\u7B97\u7B26\uFF08\u4F8B\u5982AND\u6216\uFF09\u6765\u89E3\u6790\u548C\u62C6\u5206\u63D0\u4F9B\u7684\u67E5\u8BE2\u5B57\u7B26\u4E32</p><p>\u9700\u8981\u7406\u89E3\u672C\u8D28\u4E0A\u67E5\u8BE2\u8FD9\u56DB\u4E2A\u5206\u8BCD\uFF08term\uFF09or\u7684\u7ED3\u679C\u800C\u5DF2</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;default_field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\uFF08\u653E\u706B \u6740\u4EBA\uFF09 OR (\u96C6\u8D44 \u8BC8\u9A97)&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-9-simple-query-string-\u65E0\u6548\u8BED\u6CD5\u4E0D\u4F1A\u8FD4\u56DE\u9519\u8BEF" tabindex="-1"><a class="header-anchor" href="#_3-9-simple-query-string-\u65E0\u6548\u8BED\u6CD5\u4E0D\u4F1A\u8FD4\u56DE\u9519\u8BEF" aria-hidden="true">#</a> 3.9 simple_query_string \u65E0\u6548\u8BED\u6CD5\u4E0D\u4F1A\u8FD4\u56DE\u9519\u8BEF</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;simple_query_string&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\\&quot;over the\\&quot; + (\u8BC8\u9A97 | \u96C6\u8D44) + \u653E\u706B&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-dsl\u67E5\u8BE2\u4E4Bterm" tabindex="-1"><a class="header-anchor" href="#_4-dsl\u67E5\u8BE2\u4E4Bterm" aria-hidden="true">#</a> 4. DSL\u67E5\u8BE2\u4E4BTerm</h2><h3 id="_4-1-\u5B57\u6BB5\u5B58\u5728-exist" tabindex="-1"><a class="header-anchor" href="#_4-1-\u5B57\u6BB5\u5B58\u5728-exist" aria-hidden="true">#</a> 4.1 \u5B57\u6BB5\u5B58\u5728:exist</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;track_total_hits&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;exists&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ay_list&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-\u5B57\u6BB5\u4E0D\u5B58\u5728-bool-must-not-exist" tabindex="-1"><a class="header-anchor" href="#_4-2-\u5B57\u6BB5\u4E0D\u5B58\u5728-bool-must-not-exist" aria-hidden="true">#</a> 4.2 \u5B57\u6BB5\u4E0D\u5B58\u5728:bool+must_not+exist</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-id\u67E5\u8BE2-ids" tabindex="-1"><a class="header-anchor" href="#_4-3-id\u67E5\u8BE2-ids" aria-hidden="true">#</a> 4.3 id\u67E5\u8BE2:ids</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ids&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;5eecf0967ad6ac3706739386&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;5eed7da2a541f81ae5eceeb8&quot;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-\u524D\u7F00-prefix" tabindex="-1"><a class="header-anchor" href="#_4-4-\u524D\u7F00-prefix" aria-hidden="true">#</a> 4.4 \u524D\u7F00:prefix</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u5F20\u4E09&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-\u5206\u8BCD\u5339\u914D-term" tabindex="-1"><a class="header-anchor" href="#_4-5-\u5206\u8BCD\u5339\u914D-term" aria-hidden="true">#</a> 4.5 \u5206\u8BCD\u5339\u914D:term</h3><p>\u524D\u6587\u6700\u5E38\u89C1\u7684\u6839\u636E\u5206\u8BCD\u67E5\u8BE2</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>
GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ay_list&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u91CD\u5A5A&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-\u591A\u4E2A\u5206\u8BCD\u5339\u914D-terms" tabindex="-1"><a class="header-anchor" href="#_4-6-\u591A\u4E2A\u5206\u8BCD\u5339\u914D-terms" aria-hidden="true">#</a> 4.6 \u591A\u4E2A\u5206\u8BCD\u5339\u914D:terms</h3><p>\u6309\u7167\u8BFB\u4E2A\u5206\u8BCDterm\u5339\u914D\uFF0C\u5B83\u4EEC\u662For\u7684\u5173\u7CFB\u5206\u8BCD\u5339\u914D:term</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">8000</span><span class="token punctuation">,</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ay_list&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;\u62A2\u52AB&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;\u91CD\u5A5A&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7-\u901A\u914D\u7B26-wildcard" tabindex="-1"><a class="header-anchor" href="#_4-7-\u901A\u914D\u7B26-wildcard" aria-hidden="true">#</a> 4.7 \u901A\u914D\u7B26:wildcard</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;wildcard&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u5F20*\u4F1F&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-8-\u8303\u56F4-range" tabindex="-1"><a class="header-anchor" href="#_4-8-\u8303\u56F4-range" aria-hidden="true">#</a> 4.8 \u8303\u56F4:range</h3><p>\u5E38\u5E38\u88AB\u7528\u5728\u6570\u5B57\u6216\u8005\u65E5\u671F\u8303\u56F4\u7684\u67E5\u8BE2</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-9-\u6B63\u5219-regexp" tabindex="-1"><a class="header-anchor" href="#_4-9-\u6B63\u5219-regexp" aria-hidden="true">#</a> 4.9 \u6B63\u5219:regexp</h3><p>\u901A\u8FC7\u6B63\u5219\u8868\u8FBE\u5F0F\u67E5\u8BE2</p><p>\u4EE5&quot;\u8D4C&quot;\u5F00\u5934\u7684name\u5B57\u6BB5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /case/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;regexp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;ajmc&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;\u8D4C.*&quot;</span>,
        <span class="token string">&quot;case_insensitive&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-10-\u6A21\u7CCA\u5339\u914D-fuzzy" tabindex="-1"><a class="header-anchor" href="#_4-10-\u6A21\u7CCA\u5339\u914D-fuzzy" aria-hidden="true">#</a> 4.10 \u6A21\u7CCA\u5339\u914D:fuzzy</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fuzzy&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u5371&quot;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-\u805A\u5408\u67E5\u8BE2\u4E4Bbucket\u805A\u5408" tabindex="-1"><a class="header-anchor" href="#_5-\u805A\u5408\u67E5\u8BE2\u4E4Bbucket\u805A\u5408" aria-hidden="true">#</a> 5. \u805A\u5408\u67E5\u8BE2\u4E4BBucket\u805A\u5408</h2><h3 id="_5-1-\u6807\u51C6\u7684\u805A\u5408" tabindex="-1"><a class="header-anchor" href="#_5-1-\u6807\u51C6\u7684\u805A\u5408" aria-hidden="true">#</a> 5.1 \u6807\u51C6\u7684\u805A\u5408</h3><p>\u6309\u6CD5\u9662\u805A\u5408</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-\u591A\u4E2A\u805A\u5408" tabindex="-1"><a class="header-anchor" href="#_5-2-\u591A\u4E2A\u805A\u5408" aria-hidden="true">#</a> 5.2 \u591A\u4E2A\u805A\u5408</h3><p>\u6309\u6CD5\u9662\u548C\u5E74\u4EFD\u805A\u5408</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-\u5D4C\u5957\u5206\u7EC4" tabindex="-1"><a class="header-anchor" href="#_5-3-\u5D4C\u5957\u5206\u7EC4" aria-hidden="true">#</a> 5.3 \u5D4C\u5957\u5206\u7EC4</h3><p>\u6BCF\u4E2A\u6708\u3001\u5404\u6CD5\u9662\u7684\u6848\u4EF6</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-\u524D\u7F6E\u6761\u4EF6\u7684\u8FC7\u6EE4-filter" tabindex="-1"><a class="header-anchor" href="#_5-4-\u524D\u7F6E\u6761\u4EF6\u7684\u8FC7\u6EE4-filter" aria-hidden="true">#</a> 5.4 \u524D\u7F6E\u6761\u4EF6\u7684\u8FC7\u6EE4\uFF1Afilter</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-\u5BF9filter\u8FDB\u884C\u5206\u7EC4\u805A\u5408-filters" tabindex="-1"><a class="header-anchor" href="#_5-5-\u5BF9filter\u8FDB\u884C\u5206\u7EC4\u805A\u5408-filters" aria-hidden="true">#</a> 5.5 \u5BF9filter\u8FDB\u884C\u5206\u7EC4\u805A\u5408\uFF1Afilters</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6-\u5BF9number\u7C7B\u578B\u805A\u5408-range" tabindex="-1"><a class="header-anchor" href="#_5-6-\u5BF9number\u7C7B\u578B\u805A\u5408-range" aria-hidden="true">#</a> 5.6 \u5BF9number\u7C7B\u578B\u805A\u5408\uFF1ARange</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-7-\u5BF9\u65E5\u671F\u7C7B\u578B\u805A\u5408-date-range" tabindex="-1"><a class="header-anchor" href="#_5-7-\u5BF9\u65E5\u671F\u7C7B\u578B\u805A\u5408-date-range" aria-hidden="true">#</a> 5.7 \u5BF9\u65E5\u671F\u7C7B\u578B\u805A\u5408\uFF1ADate Range</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-8-\u5BF9\u67F1\u72B6\u56FE\u529F\u80FD-histrogram" tabindex="-1"><a class="header-anchor" href="#_5-8-\u5BF9\u67F1\u72B6\u56FE\u529F\u80FD-histrogram" aria-hidden="true">#</a> 5.8 \u5BF9\u67F1\u72B6\u56FE\u529F\u80FD\uFF1AHistrogram</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET /case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-\u5176\u4ED6\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_6-\u5176\u4ED6\u64CD\u4F5C" aria-hidden="true">#</a> 6.\u5176\u4ED6\u64CD\u4F5C</h2><h3 id="_6-1-\u67E5\u627E\u5168\u90E8" tabindex="-1"><a class="header-anchor" href="#_6-1-\u67E5\u627E\u5168\u90E8" aria-hidden="true">#</a> 6.1 \u67E5\u627E\u5168\u90E8</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;track_total_hits&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
 <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-\u9AD8\u4EAE\u641C\u7D22" tabindex="-1"><a class="header-anchor" href="#_6-2-\u9AD8\u4EAE\u641C\u7D22" aria-hidden="true">#</a> 6.2 \u9AD8\u4EAE\u641C\u7D22</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> 
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8BC8\u9A97&quot;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-\u5206\u8BCD\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#_6-3-\u5206\u8BCD\u5206\u6790" aria-hidden="true">#</a> 6.3 \u5206\u8BCD\u5206\u6790</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code># \u5206\u8BCD\u5206\u6790
GET case/_analyze
<span class="token punctuation">{</span>
  <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ay_list&quot;</span> <span class="token punctuation">,</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u997A\u5B50\u771F\u597D\u5403&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221223142857600.png" alt="image-20221223142857600" loading="lazy"></p>`,101),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","elasticsearch-demo.html.vue"]]);export{d as default};
