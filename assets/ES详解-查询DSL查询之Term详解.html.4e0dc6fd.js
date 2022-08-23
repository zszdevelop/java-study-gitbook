import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="es\u8BE6\u89E3-\u67E5\u8BE2-dsl\u67E5\u8BE2\u4E4Bterm\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#es\u8BE6\u89E3-\u67E5\u8BE2-dsl\u67E5\u8BE2\u4E4Bterm\u8BE6\u89E3" aria-hidden="true">#</a> ES\u8BE6\u89E3 - \u67E5\u8BE2\uFF1ADSL\u67E5\u8BE2\u4E4BTerm\u8BE6\u89E3</h1><blockquote><p>DSL\u67E5\u8BE2\u53E6\u4E00\u79CD\u6781\u4E3A\u5E38\u7528\u7684\u662F\u5BF9\u8BCD\u9879\u8FDB\u884C\u641C\u7D22\uFF0C\u5B98\u65B9\u6587\u6863\u4E2D\u53EB\u201Dterm level\u201C\u67E5\u8BE2\uFF0C\u672C\u6587\u4E3B\u8981\u5BF9term level\u641C\u7D22\u8FDB\u884C\u8BE6\u89E3\u3002</p></blockquote><h2 id="_1-term\u67E5\u8BE2\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#_1-term\u67E5\u8BE2\u5F15\u5165" aria-hidden="true">#</a> 1. Term\u67E5\u8BE2\u5F15\u5165</h2><p>\u5982\u524D\u6587\u6240\u8FF0\uFF0C\u67E5\u8BE2\u5206\u57FA\u4E8E\u6587\u672C\u67E5\u8BE2\u548C\u57FA\u4E8E\u8BCD\u9879\u7684\u67E5\u8BE2:</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805222938003.png" alt="image-20220805222938003"></p><p>\u672C\u6587\u4E3B\u8981\u8BB2\u57FA\u4E8E\u8BCD\u9879\u7684\u67E5\u8BE2\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805223752733.png" alt="image-20220805223752733"></p><h2 id="_2-term\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_2-term\u67E5\u8BE2" aria-hidden="true">#</a> 2. Term\u67E5\u8BE2</h2><blockquote><p>\u5F88\u591A\u6BD4\u8F83\u5E38\u7528\uFF0C\u4E5F\u4E0D\u96BE\uFF0C\u5C31\u662F\u9700\u8981\u7ED3\u5408\u5B9E\u4F8B\u7406\u89E3\u3002\u8FD9\u91CC\u7EFC\u5408\u5B98\u65B9\u6587\u6863\u7684\u5185\u5BB9\uFF0C\u6211\u8BBE\u8BA1\u4E00\u4E2A\u6D4B\u8BD5\u573A\u666F\u7684\u6570\u636E\uFF0C\u4EE5\u8986\u76D6\u6240\u6709\u4F8B\u5B50\u3002</p></blockquote><p>\u51C6\u5907\u6570\u636E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PUT /test-dsl-term-level\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>\n      <span class="token punctuation">}</span>,\n      <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>\n      <span class="token punctuation">}</span>,\n      <span class="token string">&quot;required_matches&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;long&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\nPOST /test-dsl-term-level/_bulk\n<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Jane Smith&quot;</span>, <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;c++&quot;</span>, <span class="token string">&quot;java&quot;</span> <span class="token punctuation">]</span>, <span class="token string">&quot;required_matches&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span><span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Jason Response&quot;</span>, <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;php&quot;</span> <span class="token punctuation">]</span>, <span class="token string">&quot;required_matches&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span><span class="token punctuation">}</span>\n<span class="token punctuation">{</span> <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>\n<span class="token punctuation">{</span><span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Dave Pdai&quot;</span>, <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;c++&quot;</span>, <span class="token string">&quot;php&quot;</span> <span class="token punctuation">]</span>, <span class="token string">&quot;required_matches&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>, <span class="token string">&quot;remarks&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">}</span>\n\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-\u5B57\u6BB5\u662F\u5426\u5B58\u5728-exist" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5B57\u6BB5\u662F\u5426\u5B58\u5728-exist" aria-hidden="true">#</a> 2.1 \u5B57\u6BB5\u662F\u5426\u5B58\u5728:exist</h3><p>\u7531\u4E8E\u591A\u79CD\u539F\u56E0\uFF0C\u6587\u6863\u5B57\u6BB5\u7684\u7D22\u5F15\u503C\u53EF\u80FD\u4E0D\u5B58\u5728\uFF1A</p><ul><li>\u6E90JSON\u4E2D\u7684\u5B57\u6BB5\u662Fnull\u6216[]</li><li>\u8BE5\u5B57\u6BB5\u5DF2&quot;index&quot; : false\u5728\u6620\u5C04\u4E2D\u8BBE\u7F6E</li><li>\u5B57\u6BB5\u503C\u7684\u957F\u5EA6\u8D85\u51FAignore_above\u4E86\u6620\u5C04\u4E2D\u7684\u8BBE\u7F6E</li><li>\u5B57\u6BB5\u503C\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E76\u4E14ignore_malformed\u5DF2\u5728\u6620\u5C04\u4E2D\u5B9A\u4E49</li></ul><p>\u6240\u4EE5exist\u8868\u793A\u67E5\u627E\u662F\u5426\u5B58\u5728\u5B57\u6BB5\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224415435.png" alt="image-20220805224415435"></p><h3 id="_2-2-id\u67E5\u8BE2-ids" tabindex="-1"><a class="header-anchor" href="#_2-2-id\u67E5\u8BE2-ids" aria-hidden="true">#</a> 2.2 id\u67E5\u8BE2:ids</h3><p>ids \u5373\u5BF9id\u67E5\u627E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;ids&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;values&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token number">3</span>, <span class="token number">1</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224652643.png" alt="image-20220805224652643"></p><h3 id="_2-3-\u524D\u7F00-prefix" tabindex="-1"><a class="header-anchor" href="#_2-3-\u524D\u7F00-prefix" aria-hidden="true">#</a> 2.3 \u524D\u7F00:prefix</h3><p>\u901A\u8FC7\u524D\u7F00\u67E5\u627E\u67D0\u4E2A\u5B57\u6BB5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;prefix&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Jan&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224755113.png" alt="image-20220805224755113"></p><h3 id="_2-4-\u5206\u8BCD\u5339\u914D-term" tabindex="-1"><a class="header-anchor" href="#_2-4-\u5206\u8BCD\u5339\u914D-term" aria-hidden="true">#</a> 2.4 \u5206\u8BCD\u5339\u914D:term</h3><p>\u524D\u6587\u6700\u5E38\u89C1\u7684\u6839\u636E\u5206\u8BCD\u67E5\u8BE2</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;term&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;php&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224847374.png" alt="image-20220805224847374"></p><h3 id="_2-5-\u591A\u4E2A\u5206\u8BCD\u5339\u914D-terms" tabindex="-1"><a class="header-anchor" href="#_2-5-\u591A\u4E2A\u5206\u8BCD\u5339\u914D-terms" aria-hidden="true">#</a> 2.5 \u591A\u4E2A\u5206\u8BCD\u5339\u914D:terms</h3><p>\u6309\u7167\u8BFB\u4E2A\u5206\u8BCDterm\u5339\u914D\uFF0C\u5B83\u4EEC\u662For\u7684\u5173\u7CFB</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;php&quot;</span>,<span class="token string">&quot;c++&quot;</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805224923467.png" alt="image-20220805224923467"></p><h3 id="_2-6-\u6309\u67D0\u4E2A\u6570\u5B57\u5B57\u6BB5\u5206\u8BCD\u5339\u914D-term-set" tabindex="-1"><a class="header-anchor" href="#_2-6-\u6309\u67D0\u4E2A\u6570\u5B57\u5B57\u6BB5\u5206\u8BCD\u5339\u914D-term-set" aria-hidden="true">#</a> 2.6 \u6309\u67D0\u4E2A\u6570\u5B57\u5B57\u6BB5\u5206\u8BCD\u5339\u914D:term set</h3><p>\u8BBE\u8BA1\u8FD9\u79CD\u65B9\u5F0F\u67E5\u8BE2\u7684\u521D\u8877\u662F\u7528\u6587\u6863\u4E2D\u7684\u6570\u5B57\u5B57\u6BB5\u52A8\u6001\u5339\u914D\u67E5\u8BE2\u6EE1\u8DB3term\u7684\u4E2A\u6570</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;terms_set&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;programming_languages&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;terms&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;php&quot;</span> <span class="token punctuation">]</span>,\n        <span class="token string">&quot;minimum_should_match_field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;required_matches&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225032650.png" alt="image-20220805225032650"></p><h3 id="_2-7-\u901A\u914D\u7B26-wildcard" tabindex="-1"><a class="header-anchor" href="#_2-7-\u901A\u914D\u7B26-wildcard" aria-hidden="true">#</a> 2.7 \u901A\u914D\u7B26:wildcard</h3><p>\u901A\u914D\u7B26\u5339\u914D\uFF0C\u6BD4\u5982<code>*</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;wildcard&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;D*ai&quot;</span>,\n        <span class="token string">&quot;boost&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>,\n        <span class="token string">&quot;rewrite&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;constant_score&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225153592.png" alt="image-20220805225153592"></p><h3 id="_2-8-\u8303\u56F4-range" tabindex="-1"><a class="header-anchor" href="#_2-8-\u8303\u56F4-range" aria-hidden="true">#</a> 2.8 \u8303\u56F4:range</h3><p>\u5E38\u5E38\u88AB\u7528\u5728\u6570\u5B57\u6216\u8005\u65E5\u671F\u8303\u56F4\u7684\u67E5\u8BE2</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;range&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;required_matches&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;gte&quot;</span><span class="token builtin class-name">:</span> <span class="token number">3</span>,\n        <span class="token string">&quot;lte&quot;</span><span class="token builtin class-name">:</span> <span class="token number">4</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225640451.png" alt="image-20220805225640451"></p><h3 id="_2-9-\u6B63\u5219-regexp" tabindex="-1"><a class="header-anchor" href="#_2-9-\u6B63\u5219-regexp" aria-hidden="true">#</a> 2.9 \u6B63\u5219:regexp</h3>', 45);
const _hoisted_46 = /* @__PURE__ */ createTextVNode("\u901A\u8FC7");
const _hoisted_47 = {
  href: "https://pdai.tech/md/develop/regex/dev-regex-all.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_48 = /* @__PURE__ */ createTextVNode("\u6B63\u5219\u8868\u8FBE\u5F0F");
const _hoisted_49 = /* @__PURE__ */ createTextVNode("\u67E5\u8BE2");
const _hoisted_50 = /* @__PURE__ */ createStaticVNode('<p>\u4EE5&quot;Jan&quot;\u5F00\u5934\u7684name\u5B57\u6BB5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;regexp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Ja.*&quot;</span>,\n        <span class="token string">&quot;case_insensitive&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225727650.png" alt="image-20220805225727650"></p><h3 id="_2-10-\u6A21\u7CCA\u5339\u914D-fuzzy" tabindex="-1"><a class="header-anchor" href="#_2-10-\u6A21\u7CCA\u5339\u914D-fuzzy" aria-hidden="true">#</a> 2.10 \u6A21\u7CCA\u5339\u914D:fuzzy</h3><p>\u5B98\u65B9\u6587\u6863\u5BF9\u6A21\u7CCA\u5339\u914D\uFF1A\u7F16\u8F91\u8DDD\u79BB\u662F\u5C06\u4E00\u4E2A\u672F\u8BED\u8F6C\u6362\u4E3A\u53E6\u4E00\u4E2A\u672F\u8BED\u6240\u9700\u7684\u4E00\u4E2A\u5B57\u7B26\u66F4\u6539\u7684\u6B21\u6570\u3002\u8FD9\u4E9B\u66F4\u6539\u53EF\u4EE5\u5305\u62EC\uFF1A</p><ul><li>\u66F4\u6539\u5B57\u7B26\uFF08box\u2192 fox\uFF09</li><li>\u5220\u9664\u5B57\u7B26\uFF08black\u2192 lack\uFF09</li><li>\u63D2\u5165\u5B57\u7B26\uFF08sic\u2192 sick\uFF09</li><li>\u8F6C\u7F6E\u4E24\u4E2A\u76F8\u90BB\u5B57\u7B26\uFF08act\u2192 cat\uFF09</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>GET /test-dsl-term-level/_search\n<span class="token punctuation">{</span>\n  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&quot;fuzzy&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;remarks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;hell&quot;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220805225807567.png" alt="image-20220805225807567"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 9);
const _hoisted_59 = {
  href: "https://pdai.tech/md/db/nosql-es/elasticsearch-x-dsl-term.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_60 = /* @__PURE__ */ createBaseVNode("strong", null, "ES\u8BE6\u89E3 - \u67E5\u8BE2\uFF1ADSL\u67E5\u8BE2\u4E4BTerm\u8BE6\u89E3", -1);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_46,
      createBaseVNode("a", _hoisted_47, [
        _hoisted_48,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_49
    ]),
    _hoisted_50,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_59, [
        _hoisted_60,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var ES_____DSL___Term___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ES\u8BE6\u89E3-\u67E5\u8BE2DSL\u67E5\u8BE2\u4E4BTerm\u8BE6\u89E3.html.vue"]]);
export { ES_____DSL___Term___html as default };
