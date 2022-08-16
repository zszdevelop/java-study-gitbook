import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="redis\u8FDB\u9636-3\u79CD\u7279\u6B8A\u7C7B\u578B\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#redis\u8FDB\u9636-3\u79CD\u7279\u6B8A\u7C7B\u578B\u8BE6\u89E3" aria-hidden="true">#</a> Redis\u8FDB\u9636-3\u79CD\u7279\u6B8A\u7C7B\u578B\u8BE6\u89E3</h1><blockquote><p>\u5F88\u5C11\u4F7F\u7528\uFF0C\u4E86\u89E3\u6709\u8FD9\u4E48\u4E2A\u4E1C\u897F\u5C31\u53EF\u4EE5\u4E86</p></blockquote><blockquote><p>Redis\u9664\u4E86\u4E0A\u6587\u4E2D5\u79CD\u57FA\u7840\u6570\u636E\u7C7B\u578B\uFF0C\u8FD8\u6709\u4E09\u79CD\u7279\u6B8A\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u5206\u522B\u662F <strong>HyperLogLogs</strong>\uFF08\u57FA\u6570\u7EDF\u8BA1\uFF09\uFF0C <strong>Bitmaps</strong> (\u4F4D\u56FE) \u548C <strong>geospatial</strong> \uFF08\u5730\u7406\u4F4D\u7F6E\uFF09</p></blockquote><h2 id="_1-hyperloglogs-\u57FA\u6570\u7EDF\u8BA1" tabindex="-1"><a class="header-anchor" href="#_1-hyperloglogs-\u57FA\u6570\u7EDF\u8BA1" aria-hidden="true">#</a> 1. HyperLogLogs\uFF08\u57FA\u6570\u7EDF\u8BA1\uFF09</h2><blockquote><p>Redis 2.8.9 \u7248\u672C\u66F4\u65B0\u4E86 Hyperloglog \u6570\u636E\u7ED3\u6784\uFF01</p></blockquote><ul><li><strong>\u4EC0\u4E48\u662F\u57FA\u6570\uFF1F</strong></li></ul><p>\u4E3E\u4E2A\u4F8B\u5B50\uFF0CA = {1, 2, 3, 4, 5}\uFF0C B = {3, 5, 6, 7, 9}\uFF1B\u90A3\u4E48\u57FA\u6570\uFF08\u4E0D\u91CD\u590D\u7684\u5143\u7D20\uFF09= 1, 2, 4, 6, 7, 9\uFF1B \uFF08\u5141\u8BB8\u5BB9\u9519\uFF0C\u5373\u53EF\u4EE5\u63A5\u53D7\u4E00\u5B9A\u8BEF\u5DEE\uFF09</p><ul><li><strong>HyperLogLogs \u57FA\u6570\u7EDF\u8BA1\u7528\u6765\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898</strong>\uFF1F</li></ul><p>\u8FD9\u4E2A\u7ED3\u6784\u53EF\u4EE5\u975E\u5E38\u7701\u5185\u5B58\u7684\u53BB\u7EDF\u8BA1\u5404\u79CD\u8BA1\u6570\uFF0C\u6BD4\u5982\u6CE8\u518C IP \u6570\u3001\u6BCF\u65E5\u8BBF\u95EE IP \u6570\u3001\u9875\u9762\u5B9E\u65F6UV\u3001\u5728\u7EBF\u7528\u6237\u6570\uFF0C\u5171\u540C\u597D\u53CB\u6570\u7B49\u3002</p><ul><li><strong>\u5B83\u7684\u4F18\u52BF\u4F53\u73B0\u5728\u54EA</strong>\uFF1F</li></ul><p>\u4E00\u4E2A\u5927\u578B\u7684\u7F51\u7AD9\uFF0C\u6BCF\u5929 IP \u6BD4\u5982\u6709 100 \u4E07\uFF0C\u7C97\u7B97\u4E00\u4E2A IP \u6D88\u8017 15 \u5B57\u8282\uFF0C\u90A3\u4E48 100 \u4E07\u4E2A IP \u5C31\u662F 15M\u3002\u800C HyperLogLog \u5728 Redis \u4E2D\u6BCF\u4E2A\u952E\u5360\u7528\u7684\u5185\u5BB9\u90FD\u662F 12K\uFF0C\u7406\u8BBA\u5B58\u50A8\u8FD1\u4F3C\u63A5\u8FD1 2^64 \u4E2A\u503C\uFF0C\u4E0D\u7BA1\u5B58\u50A8\u7684\u5185\u5BB9\u662F\u4EC0\u4E48\uFF0C\u5B83\u4E00\u4E2A\u57FA\u4E8E\u57FA\u6570\u4F30\u7B97\u7684\u7B97\u6CD5\uFF0C\u53EA\u80FD\u6BD4\u8F83\u51C6\u786E\u7684\u4F30\u7B97\u51FA\u57FA\u6570\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5C11\u91CF\u56FA\u5B9A\u7684\u5185\u5B58\u53BB\u5B58\u50A8\u5E76\u8BC6\u522B\u96C6\u5408\u4E2D\u7684\u552F\u4E00\u5143\u7D20\u3002\u800C\u4E14\u8FD9\u4E2A\u4F30\u7B97\u7684\u57FA\u6570\u5E76\u4E0D\u4E00\u5B9A\u51C6\u786E\uFF0C\u662F\u4E00\u4E2A\u5E26\u6709 0.81% \u6807\u51C6\u9519\u8BEF\u7684\u8FD1\u4F3C\u503C\uFF08\u5BF9\u4E8E\u53EF\u4EE5\u63A5\u53D7\u4E00\u5B9A\u5BB9\u9519\u7684\u4E1A\u52A1\u573A\u666F\uFF0C\u6BD4\u5982IP\u6570\u7EDF\u8BA1\uFF0CUV\u7B49\uFF0C\u662F\u53EF\u4EE5\u5FFD\u7565\u4E0D\u8BA1\u7684\uFF09\u3002</p><ul><li><strong>\u76F8\u5173\u547D\u4EE4\u4F7F\u7528</strong></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> pfadd key1 a b c d e f g h i	<span class="token comment"># \u521B\u5EFA\u7B2C\u4E00\u7EC4\u5143\u7D20</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> pfcount key1					<span class="token comment"># \u7EDF\u8BA1\u5143\u7D20\u7684\u57FA\u6570\u6570\u91CF</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">9</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> pfadd key2 c j k l m e g a		<span class="token comment"># \u521B\u5EFA\u7B2C\u4E8C\u7EC4\u5143\u7D20</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> pfcount key2\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">8</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> pfmerge key3 key1 key2			<span class="token comment"># \u5408\u5E76\u4E24\u7EC4\uFF1Akey1 key2 -&gt; key3 \u5E76\u96C6</span>\nOK\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> pfcount key3\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">13</span>\n\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-bitmap-\u4F4D\u5B58\u50A8" tabindex="-1"><a class="header-anchor" href="#_2-bitmap-\u4F4D\u5B58\u50A8" aria-hidden="true">#</a> 2. Bitmap \uFF08\u4F4D\u5B58\u50A8\uFF09</h2><blockquote><p>Bitmap \u5373\u4F4D\u56FE\u6570\u636E\u7ED3\u6784\uFF0C\u90FD\u662F\u64CD\u4F5C\u4E8C\u8FDB\u5236\u4F4D\u6765\u8FDB\u884C\u8BB0\u5F55\uFF0C\u53EA\u67090 \u548C 1 \u4E24\u4E2A\u72B6\u6001\u3002</p></blockquote><ul><li><strong>\u7528\u6765\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898</strong>\uFF1F</li></ul><p>\u6BD4\u5982\uFF1A\u7EDF\u8BA1\u7528\u6237\u4FE1\u606F\uFF0C\u6D3B\u8DC3\uFF0C\u4E0D\u6D3B\u8DC3\uFF01 \u767B\u5F55\uFF0C\u672A\u767B\u5F55\uFF01 \u6253\u5361\uFF0C\u4E0D\u6253\u5361\uFF01 <strong>\u4E24\u4E2A\u72B6\u6001\u7684\uFF0C\u90FD\u53EF\u4EE5\u4F7F\u7528 Bitmaps</strong>\uFF01</p><p>\u5982\u679C\u5B58\u50A8\u4E00\u5E74\u7684\u6253\u5361\u72B6\u6001\u9700\u8981\u591A\u5C11\u5185\u5B58\u5462\uFF1F 365 \u5929 = 365 bit 1\u5B57\u8282 = 8bit 46 \u4E2A\u5B57\u8282\u5DE6\u53F3\uFF01</p><ul><li><strong>\u76F8\u5173\u547D\u4EE4\u4F7F\u7528</strong></li></ul><p>\u4F7F\u7528bitmap \u6765\u8BB0\u5F55 \u5468\u4E00\u5230\u5468\u65E5\u7684\u6253\u5361\uFF01 \u5468\u4E00\uFF1A1 \u5468\u4E8C\uFF1A0 \u5468\u4E09\uFF1A0 \u5468\u56DB\uFF1A1 ......</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">0</span> <span class="token number">1</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">1</span> <span class="token number">1</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">2</span> <span class="token number">0</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">3</span> <span class="token number">1</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">4</span> <span class="token number">0</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">5</span> <span class="token number">0</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setbit sign <span class="token number">6</span> <span class="token number">1</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u67D0\u4E00\u5929\u662F\u5426\u6709\u6253\u5361\uFF01</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> getbit sign <span class="token number">3</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> getbit sign <span class="token number">5</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7EDF\u8BA1\u64CD\u4F5C\uFF0C\u7EDF\u8BA1 \u6253\u5361\u7684\u5929\u6570\uFF01</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> bitcount sign <span class="token comment"># \u7EDF\u8BA1\u8FD9\u5468\u7684\u6253\u5361\u8BB0\u5F55\uFF0C\u5C31\u53EF\u4EE5\u770B\u5230\u662F\u5426\u6709\u5168\u52E4\uFF01</span>\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-geospatial-\u5730\u7406\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_3-geospatial-\u5730\u7406\u4F4D\u7F6E" aria-hidden="true">#</a> 3. geospatial (\u5730\u7406\u4F4D\u7F6E)</h2><blockquote><p>Redis \u7684 Geo \u5728 Redis 3.2 \u7248\u672C\u5C31\u63A8\u51FA\u4E86! \u8FD9\u4E2A\u529F\u80FD\u53EF\u4EE5\u63A8\u7B97\u5730\u7406\u4F4D\u7F6E\u7684\u4FE1\u606F: \u4E24\u5730\u4E4B\u95F4\u7684\u8DDD\u79BB, \u65B9\u5706\u51E0\u91CC\u7684\u4EBA</p></blockquote><h3 id="_3-1-geoadd" tabindex="-1"><a class="header-anchor" href="#_3-1-geoadd" aria-hidden="true">#</a> 3.1 geoadd</h3><blockquote><p>\u6DFB\u52A0\u5730\u7406\u4F4D\u7F6E</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geoadd china:city <span class="token number">118.76</span> <span class="token number">32.04</span> manjing <span class="token number">112.55</span> <span class="token number">37.86</span> taiyuan <span class="token number">123.43</span> <span class="token number">41.80</span> shenyang\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geoadd china:city <span class="token number">144.05</span> <span class="token number">22.52</span> shengzhen <span class="token number">120.16</span> <span class="token number">30.24</span> hangzhou <span class="token number">108.96</span> <span class="token number">34.26</span> xian\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u89C4\u5219</strong></p><p>\u4E24\u7EA7\u65E0\u6CD5\u76F4\u63A5\u6DFB\u52A0\uFF0C\u6211\u4EEC\u4E00\u822C\u4F1A\u4E0B\u8F7D\u57CE\u5E02\u6570\u636E(\u8FD9\u4E2A\u7F51\u5740\u53EF\u4EE5\u67E5\u8BE2 GEO\uFF1A http://www.jsons.cn/lngcode)\uFF01</p><ul><li>\u6709\u6548\u7684\u7ECF\u5EA6\u4ECE-180\u5EA6\u5230180\u5EA6\u3002</li><li>\u6709\u6548\u7684\u7EAC\u5EA6\u4ECE-85.05112878\u5EA6\u523085.05112878\u5EA6\u3002</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5F53\u5750\u6807\u4F4D\u7F6E\u8D85\u51FA\u4E0A\u8FF0\u6307\u5B9A\u8303\u56F4\u65F6\uFF0C\u8BE5\u547D\u4EE4\u5C06\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u9519\u8BEF\u3002</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geoadd china:city <span class="token number">39.90</span> <span class="token number">116.40</span> beijin\n<span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR invalid longitude,latitude pair <span class="token number">39.900000</span>,116.400000\n\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-geopos" tabindex="-1"><a class="header-anchor" href="#_3-2-geopos" aria-hidden="true">#</a> 3.2 geopos</h3><blockquote><p>\u83B7\u53D6\u6307\u5B9A\u7684\u6210\u5458\u7684\u7ECF\u5EA6\u548C\u7EAC\u5EA6</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geopos china:city taiyuan manjing\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;112.54999905824661255&quot;</span>\n   <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;37.86000073876942196&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;118.75999957323074341&quot;</span>\n   <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;32.03999960287850968&quot;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u83B7\u5F97\u5F53\u524D\u5B9A\u4F4D, \u4E00\u5B9A\u662F\u4E00\u4E2A\u5750\u6807\u503C!</p><h3 id="_3-3-geodist" tabindex="-1"><a class="header-anchor" href="#_3-3-geodist" aria-hidden="true">#</a> 3.3 geodist</h3><blockquote><p>\u5982\u679C\u4E0D\u5B58\u5728, \u8FD4\u56DE\u7A7A</p></blockquote><p>\u5355\u4F4D\u5982\u4E0B</p><ul><li>m</li><li>km</li><li>mi \u82F1\u91CC</li><li>ft \u82F1\u5C3A</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geodist china:city taiyuan shenyang m\n<span class="token string">&quot;1026439.1070&quot;</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geodist china:city taiyuan shenyang km\n<span class="token string">&quot;1026.4391&quot;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-georadius" tabindex="-1"><a class="header-anchor" href="#_3-4-georadius" aria-hidden="true">#</a> 3.4 georadius</h3><blockquote><p>\u9644\u8FD1\u7684\u4EBA ==&gt; \u83B7\u5F97\u6240\u6709\u9644\u8FD1\u7684\u4EBA\u7684\u5730\u5740, \u5B9A\u4F4D, \u901A\u8FC7\u534A\u5F84\u6765\u67E5\u8BE2</p></blockquote><p>\u83B7\u5F97\u6307\u5B9A\u6570\u91CF\u7684\u4EBA</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> georadius china:city <span class="token number">110</span> <span class="token number">30</span> <span class="token number">1000</span> km			\u4EE5 <span class="token number">100,30</span> \u8FD9\u4E2A\u5750\u6807\u4E3A\u4E2D\u5FC3, \u5BFB\u627E\u534A\u5F84\u4E3A1000km\u7684\u57CE\u5E02\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;hangzhou&quot;</span>\n<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;manjing&quot;</span>\n<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;taiyuan&quot;</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> georadius china:city <span class="token number">110</span> <span class="token number">30</span> <span class="token number">500</span> km\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> georadius china:city <span class="token number">110</span> <span class="token number">30</span> <span class="token number">500</span> km withdist\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n   <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;483.8340&quot;</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> georadius china:city <span class="token number">110</span> <span class="token number">30</span> <span class="token number">1000</span> km withcoord withdist count <span class="token number">2</span>\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n   <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;483.8340&quot;</span>\n   <span class="token number">3</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;108.96000176668167114&quot;</span>\n      <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;34.25999964418929977&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;manjing&quot;</span>\n   <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;864.9816&quot;</span>\n   <span class="token number">3</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;118.75999957323074341&quot;</span>\n      <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;32.03999960287850968&quot;</span>\n\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53C2\u6570 key \u7ECF\u5EA6 \u7EAC\u5EA6 \u534A\u5F84 \u5355\u4F4D [\u663E\u793A\u7ED3\u679C\u7684\u7ECF\u5EA6\u548C\u7EAC\u5EA6] [\u663E\u793A\u7ED3\u679C\u7684\u8DDD\u79BB] [\u663E\u793A\u7684\u7ED3\u679C\u7684\u6570\u91CF]</p><h3 id="_3-5-georadiusbymember" tabindex="-1"><a class="header-anchor" href="#_3-5-georadiusbymember" aria-hidden="true">#</a> 3.5 georadiusbymember</h3><blockquote><p>\u663E\u793A\u4E0E\u6307\u5B9A\u6210\u5458\u4E00\u5B9A\u534A\u5F84\u8303\u56F4\u5185\u7684\u5176\u4ED6\u6210\u5458</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> georadiusbymember china:city taiyuan <span class="token number">1000</span> km\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;manjing&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;taiyuan&quot;</span>\n<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> georadiusbymember china:city taiyuan <span class="token number">1000</span> km withcoord withdist count <span class="token number">2</span>\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;taiyuan&quot;</span>\n   <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;0.0000&quot;</span>\n   <span class="token number">3</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;112.54999905824661255&quot;</span>\n      <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;37.86000073876942196&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n   <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;514.2264&quot;</span>\n   <span class="token number">3</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;108.96000176668167114&quot;</span>\n      <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;34.25999964418929977&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53C2\u6570\u4E0E georadius \u4E00\u6837</p><h3 id="_3-6-geohash-\u8F83\u5C11\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_3-6-geohash-\u8F83\u5C11\u4F7F\u7528" aria-hidden="true">#</a> 3.6 geohash(\u8F83\u5C11\u4F7F\u7528)</h3><blockquote><p>\u8BE5\u547D\u4EE4\u8FD4\u56DE11\u4E2A\u5B57\u7B26\u7684hash\u5B57\u7B26\u4E32</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> geohash china:city taiyuan shenyang\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;ww8p3hhqmp0&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;wxrvb9qyxk0&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u4E8C\u7EF4\u7684\u7ECF\u7EAC\u5EA6\u8F6C\u6362\u4E3A\u4E00\u7EF4\u7684\u5B57\u7B26\u4E32, \u5982\u679C\u4E24\u4E2A\u5B57\u7B26\u4E32\u8D8A\u63A5\u8FD1, \u5219\u8DDD\u79BB\u8D8A\u8FD1</p><h3 id="_3-7-\u5E95\u5C42" tabindex="-1"><a class="header-anchor" href="#_3-7-\u5E95\u5C42" aria-hidden="true">#</a> 3.7 \u5E95\u5C42</h3><blockquote><p>geo\u5E95\u5C42\u7684\u5B9E\u73B0\u539F\u7406\u5B9E\u9645\u4E0A\u5C31\u662FZset, \u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7Zset\u547D\u4EE4\u6765\u64CD\u4F5Cgeo</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">type</span> china:city\nzset\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u5168\u90E8\u5143\u7D20 \u5220\u9664\u6307\u5B9A\u7684\u5143\u7D20</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zrange china:city <span class="token number">0</span> -1 withscores\n <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;4040115445396757&quot;</span>\n <span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;hangzhou&quot;</span>\n <span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;4054133997236782&quot;</span>\n <span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;manjing&quot;</span>\n <span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;4066006694128997&quot;</span>\n <span class="token number">7</span><span class="token punctuation">)</span> <span class="token string">&quot;taiyuan&quot;</span>\n <span class="token number">8</span><span class="token punctuation">)</span> <span class="token string">&quot;4068216047500484&quot;</span>\n <span class="token number">9</span><span class="token punctuation">)</span> <span class="token string">&quot;shenyang&quot;</span>\n<span class="token number">1</span><span class="token punctuation">)</span>  <span class="token string">&quot;4072519231994779&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span>  <span class="token string">&quot;shengzhen&quot;</span>\n<span class="token number">3</span><span class="token punctuation">)</span>  <span class="token string">&quot;4154606886655324&quot;</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zrem china:city manjing\n<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>\n<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> zrange china:city <span class="token number">0</span> -1\n<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;xian&quot;</span>\n<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;hangzhou&quot;</span>\n<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;taiyuan&quot;</span>\n<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;shenyang&quot;</span>\n<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;shengzhen&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 62);
const _hoisted_63 = {
  href: "https://pdai.tech/md/db/nosql-redis/db-redis-data-type-special.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_64 = /* @__PURE__ */ createBaseVNode("strong", null, "Redis\u5165\u95E8 - \u6570\u636E\u7C7B\u578B\uFF1A3\u79CD\u7279\u6B8A\u7C7B\u578B\u8BE6\u89E3", -1);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_63, [
        _hoisted_64,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Redis__3________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Redis\u8FDB\u9636-3\u79CD\u7279\u6B8A\u7C7B\u578B\u8BE6\u89E3.html.vue"]]);
export { Redis__3________html as default };
