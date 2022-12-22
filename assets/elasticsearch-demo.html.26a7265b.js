import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.633bb4c8.js";const t={},o=e(`<h1 id="es-\u6D4B\u8BD5demo" tabindex="-1"><a class="header-anchor" href="#es-\u6D4B\u8BD5demo" aria-hidden="true">#</a> Es-\u6D4B\u8BD5demo</h1><h2 id="\u67E5\u770B\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u7D22\u5F15" aria-hidden="true">#</a> \u67E5\u770B\u7D22\u5F15</h2><p>GET /case/_mapping</p><h2 id="\u5206\u8BCD\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u5206\u8BCD\u5206\u6790" aria-hidden="true">#</a> \u5206\u8BCD\u5206\u6790</h2><p>GET case/_analyze { &quot;field&quot;: &quot;ajmc&quot; , &quot;text&quot;: &quot;\u8FBD\u5B81\u7701\u8425\u53E3\u5E02\u4E2D\u7EA7\u4EBA\u6C11\u6CD5\u9662&quot; }</p><h2 id="\u67E5\u627E\u5168\u90E8" tabindex="-1"><a class="header-anchor" href="#\u67E5\u627E\u5168\u90E8" aria-hidden="true">#</a> \u67E5\u627E\u5168\u90E8</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;track_total_hits&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> 
 <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>

#DSL bool \u67E5\u8BE2
GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-boosting" tabindex="-1"><a class="header-anchor" href="#dsl-boosting" aria-hidden="true">#</a> DSL boosting</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>GET <span class="token keyword">case</span><span class="token operator">/</span>_search
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


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-constant-score" tabindex="-1"><a class="header-anchor" href="#dsl-constant-score" aria-hidden="true">#</a> DSL constant_score</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-dis-max" tabindex="-1"><a class="header-anchor" href="#dsl-dis-max" aria-hidden="true">#</a> DSL dis_max</h2><p>\u5C06\u4EFB\u4F55\u4E0E\u4EFB\u4E00\u67E5\u8BE2\u5339\u914D\u7684\u6587\u6863\u4F5C\u4E3A\u7ED3\u679C\u8FD4\u56DE\uFF0C\u4F46\u53EA\u5C06\u6700\u4F73\u5339\u914D\u7684\u8BC4\u5206\u4F5C\u4E3A\u67E5\u8BE2\u7684\u8BC4\u5206\u7ED3\u679C\u8FD4\u56DE</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dis_max&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;tie_breaker&quot;</span><span class="token operator">:</span> <span class="token number">0.7</span><span class="token punctuation">,</span>
      <span class="token property">&quot;boost&quot;</span><span class="token operator">:</span> <span class="token number">1.2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;queries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8BC8\u9A97&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;qw&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8BC8\u9A97&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-\u591A\u8BCDmatch-\u9ED8\u8BA4or" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-\u591A\u8BCDmatch-\u9ED8\u8BA4or" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 \u591A\u8BCDMATCH\uFF0C\u9ED8\u8BA4or</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97 \u8D4C\u535A&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-match-\u6307\u5B9A\u4E3Aand" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-match-\u6307\u5B9A\u4E3Aand" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 MATCH\uFF0C\u6307\u5B9A\u4E3Aand</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>GET <span class="token keyword">case</span><span class="token operator">/</span>_search
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-match-\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-match-\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 MATCH\uFF0C\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97  \u8D4C\u535A \u5F20\u4E09&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token string">&quot;50%&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-match-\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6-1" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-match-\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6-1" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 MATCH\uFF0C\u63A7\u5236match\u7684\u5339\u914D\u7CBE\u5EA6</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97  \u8D4C\u535A \u5F20\u4E09&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span> <span class="token string">&quot;50%&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-match-match-phrase-\u641C\u7D22\u8BCD\u7EC4" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-match-match-phrase-\u641C\u7D22\u8BCD\u7EC4" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 MATCH\uFF0Cmatch_phrase \u641C\u7D22\u8BCD\u7EC4</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8\u9A97&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-match-match-phrase-prefix-\u67E5\u6700\u540E\u4E00\u4E2A\u8BCD\u9879\u662F\u524D\u7F00" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-match-match-phrase-prefix-\u67E5\u6700\u540E\u4E00\u4E2A\u8BCD\u9879\u662F\u524D\u7F00" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 MATCH\uFF0Cmatch_phrase_prefix \u67E5\u6700\u540E\u4E00\u4E2A\u8BCD\u9879\u662F\u524D\u7F00</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_phrase_prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;ajmc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u96C6\u8D44 \u8BC8&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dsl-\u5168\u6587\u641C\u7D22-match-multi-match-\u4E00\u6B21\u5BF9\u591A\u4E2A\u5B57\u6BB5\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#dsl-\u5168\u6587\u641C\u7D22-match-multi-match-\u4E00\u6B21\u5BF9\u591A\u4E2A\u5B57\u6BB5\u67E5\u8BE2" aria-hidden="true">#</a> DSL \u5168\u6587\u641C\u7D22 MATCH\uFF0C multi_match \u4E00\u6B21\u5BF9\u591A\u4E2A\u5B57\u6BB5\u67E5\u8BE2</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u76D7\u7A83&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ajmc&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;qw&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5206\u7EC4\u641C\u7D22-\u5D4C\u5957\u5206\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u641C\u7D22-\u5D4C\u5957\u5206\u7EC4" aria-hidden="true">#</a> \u5206\u7EC4\u641C\u7D22\uFF0C\u5D4C\u5957\u5206\u7EC4</h2><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>
GET case/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;group_by_state&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ajmc.keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;group_by_fycj&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;slfy&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><p>GET case/_search { &quot;query&quot;: { &quot;bool&quot;: {</p><pre><code>}
</code></pre><p>} }</p><p>{ &quot;aggs&quot;: { &quot;group_by_ajlx&quot;: { &quot;terms&quot;: { &quot;field&quot;: &quot;cprq.keyword&quot; } } }, &quot;size&quot;: 0 }</p><p>GET eslawcase/_doc/5eecce88a988e306d3be0173</p><p>GET /eslawcase/_mapping GET /case/_mapping</p><p>GET /eslawcase/_count</p><p>GET /eslawcase/_search { &quot;track_total_hits&quot;:true }</p><p>GET /eslawcase/_search { &quot;track_total_hits&quot;: true }</p><p>GET /eslawcase/_search { &quot;size&quot; : 0, &quot;aggs&quot; : { &quot;popular_colors&quot; : { &quot;terms&quot; : { &quot;field&quot; : &quot;color.keyword&quot; } } } }</p>`,41),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","elasticsearch-demo.html.vue"]]);export{d as default};
