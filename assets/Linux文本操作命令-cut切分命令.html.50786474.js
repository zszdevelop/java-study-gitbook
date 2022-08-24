import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="cut\u5207\u5206\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#cut\u5207\u5206\u547D\u4EE4" aria-hidden="true">#</a> cut\u5207\u5206\u547D\u4EE4</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1 \u7B80\u4ECB</h2><p>cut \u547D\u4EE4\u4ECE\u6587\u4EF6\u7684\u6BCF\u4E00\u884C\u526A\u5207\u5B57\u8282\u3001\u5B57\u7B26\u548C\u5B57\u6BB5\u5E76\u5C06\u8FD9\u4E9B\u5B57\u8282\u3001\u5B57\u7B26\u548C\u5B57\u6BB5\u5199\u81F3\u6807\u51C6\u8F93\u51FA\u3002</p><blockquote><p>\u5982\u679C\u4E0D\u6307\u5B9A File \u53C2\u6570\uFF0Ccut \u547D\u4EE4\u5C06\u8BFB\u53D6\u6807\u51C6\u8F93\u5165\u3002\u5FC5\u987B\u6307\u5B9A -b\u3001-c \u6216 -f \u6807\u5FD7\u4E4B\u4E00\u3002</p></blockquote><h2 id="_2-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-\u8BED\u6CD5" aria-hidden="true">#</a> 2 \u8BED\u6CD5</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cut</span>  <span class="token punctuation">[</span>-bn<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span> \u6216 <span class="token function">cut</span> <span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>  \u6216  <span class="token function">cut</span> <span class="token punctuation">[</span>-df<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_3-\u53C2\u6570" aria-hidden="true">#</a> 3 \u53C2\u6570</h2><ul><li>**-b \uFF1A**\u4EE5\u5B57\u8282\u4E3A\u5355\u4F4D\u8FDB\u884C\u5206\u5272\u3002\u8FD9\u4E9B\u5B57\u8282\u4F4D\u7F6E\u5C06\u5FFD\u7565\u591A\u5B57\u8282\u5B57\u7B26\u8FB9\u754C\uFF0C\u9664\u975E\u4E5F\u6307\u5B9A\u4E86 -n \u6807\u5FD7\u3002</li><li>**-c \uFF1A**\u4EE5\u5B57\u7B26\u4E3A\u5355\u4F4D\u8FDB\u884C\u5206\u5272\u3002</li><li>**-d \uFF1A**\u81EA\u5B9A\u4E49\u5206\u9694\u7B26\uFF0C\u9ED8\u8BA4\u4E3A\u5236\u8868\u7B26\u3002</li><li>**-f \uFF1A**\u4E0E-d\u4E00\u8D77\u4F7F\u7528\uFF0C\u6307\u5B9A\u663E\u793A\u54EA\u4E2A\u533A\u57DF\u3002</li><li>**-n \uFF1A**\u53D6\u6D88\u5206\u5272\u591A\u5B57\u8282\u5B57\u7B26\u3002\u4EC5\u548C -b \u6807\u5FD7\u4E00\u8D77\u4F7F\u7528\u3002\u5982\u679C\u5B57\u7B26\u7684\u6700\u540E\u4E00\u4E2A\u5B57\u8282\u843D\u5728\u7531 -b \u6807\u5FD7\u7684 List \u53C2\u6570\u6307\u793A\u7684<br>\u8303\u56F4\u4E4B\u5185\uFF0C\u8BE5\u5B57\u7B26\u5C06\u88AB\u5199\u51FA\uFF1B\u5426\u5219\uFF0C\u8BE5\u5B57\u7B26\u5C06\u88AB\u6392\u9664\u3002</li></ul><h2 id="_4-\u5982\u4F55\u5B9A\u4F4D\u5230\u526A\u5207\u5185\u5BB9" tabindex="-1"><a class="header-anchor" href="#_4-\u5982\u4F55\u5B9A\u4F4D\u5230\u526A\u5207\u5185\u5BB9" aria-hidden="true">#</a> 4 \u5982\u4F55\u5B9A\u4F4D\u5230\u526A\u5207\u5185\u5BB9</h2><p>cut\u547D\u4EE4\u4E3B\u8981\u662F\u63A5\u53D7\u4E09\u4E2A\u5B9A\u4F4D\u65B9\u6CD5\uFF1A</p><p>\u7B2C\u4E00\uFF0C\u5B57\u8282\uFF08bytes\uFF09\uFF0C\u7528\u9009\u9879-b</p><p>\u7B2C\u4E8C\uFF0C\u5B57\u7B26\uFF08characters\uFF09\uFF0C\u7528\u9009\u9879-c</p><p>\u7B2C\u4E09\uFF0C\u57DF\uFF08fields\uFF09\uFF0C\u7528\u9009\u9879-f</p><h3 id="_4-1-\u4EE5-\u5B57\u8282-\u4E3A\u5355\u4F4D\u5207\u5206" tabindex="-1"><a class="header-anchor" href="#_4-1-\u4EE5-\u5B57\u8282-\u4E3A\u5355\u4F4D\u5207\u5206" aria-hidden="true">#</a> 4.1 <strong>\u4EE5\u201C\u5B57\u8282\u201D\u4E3A\u5355\u4F4D\u5207\u5206</strong></h3><p>\u4E3E\u4E2A\u4F8B\u5B50\u5427\uFF0C\u5F53\u4F60\u6267\u884Cwho\u547D\u4EE4\u65F6\uFF0C\u4F1A\u8F93\u51FA\u7C7B\u4F3C\u5982\u4E0B\u7684\u5185\u5BB9\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">who</span>\nroot     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\nroot     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u6211\u4EEC\u60F3\u63D0\u53D6\u6BCF\u4E00\u884C\u7684\u7B2C4\u4E2A\u5B57\u8282\uFF0C\u5C31\u8FD9\u6837\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>who|cut -b 4\nt\nt\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5982\u679C\u201C\u5B57\u8282\u201D\u5B9A\u4F4D\u4E2D\uFF0C\u6211\u60F3\u63D0\u53D6\u7B2C1\uFF0C\u7B2C2\u3001\u7B2C3\u548C\u7B2C10\u4E2A\u5B57\u8282\uFF0C\u600E\u4E48\u529E?</strong></p><p>-b\u652F\u6301\u5F62\u59823-5\u7684\u5199\u6CD5\uFF0C\u800C\u4E14\u591A\u4E2A\u5B9A\u4F4D\u4E4B\u95F4\u7528\u9017\u53F7\u9694\u5F00\u5C31\u6210\u4E86\u3002\u770B\u770B\u4F8B\u5B50\u5427\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">who</span><span class="token operator">|</span><span class="token function">cut</span> -b <span class="token number">1</span>-3,10\nroop\nroop\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u6709\u4E00\u70B9\u8981\u6CE8\u610F\uFF0Ccut\u547D\u4EE4\u5982\u679C\u4F7F\u7528\u4E86-b\u9009\u9879\uFF0C\u90A3\u4E48\u6267\u884C\u6B64\u547D\u4EE4\u65F6\uFF0Ccut\u4F1A\u5148\u628A-b\u540E\u9762\u6240\u6709\u7684\u5B9A\u4F4D\u8FDB\u884C\u4ECE\u5C0F\u5230\u5927\u6392\u5E8F\uFF0C\u7136\u540E\u518D\u63D0\u53D6\u3002\u56E0\u6B64\u8FD9\u8DDF\u6211\u4EEC\u4E66\u5199\u7684\u987A\u5E8F\u6CA1\u6709\u5173\u7CFB\u3002\u8FD9\u4E2A\u4F8B\u5B50\u5C31\u53EF\u4EE5\u8BF4\u660E\u8FD9\u4E2A\u95EE\u9898\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>who|cut -b 10,1-3\nroop\nroop\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-1-1-\u8FD8\u6709\u54EA\u4E9B\u7C7B\u4F3C-3-5-\u8FD9\u6837\u7684\u5C0F\u6280\u5DE7-\u5217\u4E3E\u4E00\u4E0B\u5427" tabindex="-1"><a class="header-anchor" href="#_4-1-1-\u8FD8\u6709\u54EA\u4E9B\u7C7B\u4F3C-3-5-\u8FD9\u6837\u7684\u5C0F\u6280\u5DE7-\u5217\u4E3E\u4E00\u4E0B\u5427" aria-hidden="true">#</a> 4.1.1\u3000<strong>\u8FD8\u6709\u54EA\u4E9B\u7C7B\u4F3C\u201C3-5\u201D\u8FD9\u6837\u7684\u5C0F\u6280\u5DE7\uFF0C\u5217\u4E3E\u4E00\u4E0B\u5427!</strong></h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who|cut -b 3-</span>\not     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\not     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who</span>\nroot     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\nroot     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who|cut -b -3</span>\nroo\nroo\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who|cut -b 3-</span>\not     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\not     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u60F3\u5FC5\u4F60\u4E5F\u770B\u5230\u4E86\uFF0C-3\u8868\u793A\u4ECE\u7B2C\u4E00\u4E2A\u5B57\u8282\u5230\u7B2C\u4E09\u4E2A\u5B57\u8282\uFF0C\u800C3-\u8868\u793A\u4ECE\u7B2C\u4E09\u4E2A\u5B57\u8282\u5230\u884C\u5C3E\u3002\u5982\u679C\u4F60\u7EC6\u5FC3\uFF0C\u4F60\u53EF\u4EE5\u770B\u5230\u8FD9\u4E24\u79CD\u60C5\u51B5\u4E0B\uFF0C\u90FD\u5305\u62EC\u4E86\u7B2C\u4E09\u4E2A\u5B57\u8282\u201Cc\u201D\u3002\u5982\u679C\u6211\u6267\u884Cwho|cut -b -3,3-\uFF0C\u4F60\u89C9\u5F97\u4F1A\u5982\u4F55\u5462\uFF1F\u7B54\u6848\u662F\u8F93\u51FA\u6574\u884C\uFF0C\u4E0D\u4F1A\u51FA\u73B0\u8FDE\u7EED\u4E24\u4E2A\u91CD\u53E0\u7684c\u7684\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">who</span><span class="token operator">|</span><span class="token function">cut</span> -b -3,3-\nroot     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\nroot     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-\u4EE5-\u5B57\u7B26-\u4E3A\u5355\u4F4D\u5207\u5206" tabindex="-1"><a class="header-anchor" href="#_4-2-\u4EE5-\u5B57\u7B26-\u4E3A\u5355\u4F4D\u5207\u5206" aria-hidden="true">#</a> 4.2 \u4EE5&quot;\u5B57\u7B26&quot;\u4E3A\u5355\u4F4D\u5207\u5206</h3><p>\u4E0B\u9762\u4F8B\u5B50\u4F60\u4F3C\u66FE\u76F8\u8BC6\uFF0C\u63D0\u53D6\u7B2C1\uFF0C\u7B2C2\uFF0C\u7B2C3\u548C\u7B2C10\u4E2A\u5B57\u7B26\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># who|cut -c 1-3,10</span>\nroop\nroop\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0D\u8FC7\uFF0C\u770B\u7740\u600E\u4E48\u548C-b\u6CA1\u6709\u4EC0\u4E48\u533A\u522B\u554A\uFF1F\u83AB\u975E-b\u548C-c\u4F5C\u7528\u4E00\u6837? \u5176\u5B9E\u4E0D\u7136\uFF0C\u770B\u4F3C\u76F8\u540C\uFF0C\u53EA\u662F\u56E0\u4E3A\u8FD9\u4E2A\u4F8B\u5B50\u4E3E\u7684\u4E0D\u597D\uFF0Cwho\u8F93\u51FA\u7684\u90FD\u662F\u5355\u5B57\u8282\u5B57\u7B26\uFF0C\u6240\u4EE5\u7528-b\u548C-c\u6CA1\u6709\u533A\u522B\uFF0C\u5982\u679C\u4F60\u63D0\u53D6\u4E2D\u6587\uFF0C\u533A\u522B\u5C31\u770B\u51FA\u6765\u4E86\uFF0C\u6765\uFF0C\u770B\u770B\u4E2D\u6587\u63D0\u53D6\u7684\u60C5\u51B5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[root@iZwz914d1peizv4h7laju4Z ~]# cat cut_ch.txt\n\u661F\u671F\u4E00\n\u661F\u671F\u4E8C\n\u661F\u671F\u4E09\n\u661F\u671F\u56DB\n[root@iZwz914d1peizv4h7laju4Z ~]# cut -b 3 cut_ch.txt\n\uFFFD\n\uFFFD\n\uFFFD\n\uFFFD\n[root@iZwz914d1peizv4h7laju4Z ~]# cut -c 3 cut_ch.txt\n\u4E00\n\u4E8C\n\u4E09\n\u56DB\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\u5230\u4E86\u5427\uFF0C\u7528-c\u5219\u4F1A\u4EE5\u5B57\u7B26\u4E3A\u5355\u4F4D\uFF0C\u8F93\u51FA\u6B63\u5E38\uFF1B\u800C-b\u53EA\u4F1A\u50BB\u50BB\u7684\u4EE5\u5B57\u8282\uFF088\u4F4D\u4E8C\u8FDB\u5236\u4F4D\uFF09\u6765\u8BA1\u7B97\uFF0C\u8F93\u51FA\u5C31\u662F\u4E71\u7801\u3002\u65E2\u7136\u63D0\u5230\u4E86\u8FD9\u4E2A\u77E5\u8BC6\u70B9\uFF0C\u5C31\u518D\u8865\u5145\u4E00\u53E5\uFF0C\u5982\u679C\u4F60\u5B66\u6709\u4F59\u529B\uFF0C\u5C31\u63D0\u9AD8\u4E00\u4E0B\u3002\u5F53\u9047\u5230\u591A\u5B57\u8282\u5B57\u7B26\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528-n\u9009\u9879\uFF0C-n\u7528\u4E8E\u544A\u8BC9cut\u4E0D\u8981\u5C06\u591A\u5B57\u8282\u5B57\u7B26\u62C6\u5F00\u3002</p><blockquote><p>\u8DDF\u6587\u6863\u4E0D\u592A\u4E00\u6837</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> cut_ch.txt <span class="token operator">|</span><span class="token function">cut</span> -b <span class="token number">2</span>\n\uFFFD\n\uFFFD\n\uFFFD\n\uFFFD\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat cut_ch.txt |cut -nb 2</span>\n\u671F\n\u671F\n\u671F\n\u671F\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat cut_ch.txt |cut -nb 1,2,3</span>\n\u661F\u671F\u4E00\n\u661F\u671F\u4E8C\n\u661F\u671F\u4E09\n\u661F\u671F\u56DB\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-\u4EE5-\u57DF-\u4E3A\u5355\u4F4D\u5207\u5206" tabindex="-1"><a class="header-anchor" href="#_4-3-\u4EE5-\u57DF-\u4E3A\u5355\u4F4D\u5207\u5206" aria-hidden="true">#</a> 4.3 \u4EE5&quot;\u57DF&quot;\u4E3A\u5355\u4F4D\u5207\u5206</h3><p>\u4E3A\u4EC0\u4E48\u4F1A\u6709\u201C\u57DF\u201D\u7684\u63D0\u53D6\u5462\uFF0C\u56E0\u4E3A\u521A\u624D\u63D0\u5230\u7684-b\u548C-c\u53EA\u80FD\u5728\u56FA\u5B9A\u683C\u5F0F\u7684\u6587\u6863\u4E2D\u63D0\u53D6\u4FE1\u606F\uFF0C\u800C\u5BF9\u4E8E\u975E\u56FA\u5B9A\u683C\u5F0F\u7684\u4FE1\u606F\u5219\u675F\u624B\u65E0\u7B56\u3002\u8FD9\u65F6\u5019\u201C\u57DF\u201D\u5C31\u6D3E\u4E0A\u7528\u573A\u4E86\u3002\u5982\u679C\u4F60\u89C2\u5BDF\u8FC7/etc/passwd\u6587\u4EF6\uFF0C\u4F60\u4F1A\u53D1\u73B0\uFF0C\u5B83\u5E76\u4E0D\u50CFwho\u7684\u8F93\u51FA\u4FE1\u606F\u90A3\u6837\u5177\u6709\u56FA\u5B9A\u683C\u5F0F\uFF0C\u800C\u662F\u6BD4\u8F83\u96F6\u6563\u7684\u6392\u653E\u3002\u4F46\u662F\uFF0C\u5192\u53F7\u5728\u8FD9\u4E2A\u6587\u4EF6\u7684\u6BCF\u4E00\u884C\u4E2D\u90FD\u8D77\u5230\u4E86\u975E\u5E38\u91CD\u8981\u7684\u4F5C\u7528\uFF0C\u5192\u53F7\u7528\u6765\u9694\u5F00\u6BCF\u4E00\u4E2A\u9879\u3002</p><p>\u6211\u4EEC\u5F88\u5E78\u8FD0\uFF0Ccut\u547D\u4EE4\u63D0\u4F9B\u4E86\u8FD9\u6837\u7684\u63D0\u53D6\u65B9\u5F0F\uFF0C\u5177\u4F53\u7684\u8BF4\u5C31\u662F\u8BBE\u7F6E\u201C\u95F4\u9694\u7B26\u201D\uFF0C\u518D\u8BBE\u7F6E\u201C\u63D0\u53D6\u7B2C\u51E0\u4E2A\u57DF\u201D\uFF0C\u5C31OK\u4E86\uFF01</p><p>\u4EE5/etc/passwd\u7684\u524D\u4E94\u884C\u5185\u5BB9\u4E3A\u4F8B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment">#  cat /etc/passwd|head -n 5</span>\nroot:x:0:0:root:/root:/bin/bash\nbin:x:1:1:bin:/bin:/sbin/nologin\ndaemon:x:2:2:daemon:/sbin:/sbin/nologin\nadm:x:3:4:adm:/var/adm:/sbin/nologin\nlp:x:4:7:lp:/var/spool/lpd:/sbin/nologin\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f 1</span>\nroot\nbin\ndaemon\nadm\nlp\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\u5230\u4E86\u5427\uFF0C\u7528-d\u6765\u8BBE\u7F6E\u95F4\u9694\u7B26\u4E3A\u5192\u53F7\uFF0C\u7136\u540E\u7528-f\u6765\u8BBE\u7F6E\u6211\u8981\u53D6\u7684\u662F\u7B2C\u4E00\u4E2A\u57DF\uFF0C\u518D\u6309\u56DE\u8F66\uFF0C\u6240\u6709\u7684\u7528\u6237\u540D\u5C31\u90FD\u5217\u51FA\u6765\u4E86\uFF01\u5475\u5475 \u6709\u6210\u5C31\u611F\u5427\uFF01</p><p>\u5F53\u7136\uFF0C\u5728\u8BBE\u5B9A-f\u65F6\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u4F8B\u59823-5\u6216\u80054-\u7C7B\u4F3C\u7684\u683C\u5F0F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f 1,3-5</span>\nroot:0:0:root\nbin:1:1:bin\ndaemon:2:2:daemon\nadm:3:4:adm\nlp:4:7:lp\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f 1,3-5,7</span>\nroot:0:0:root:/bin/bash\nbin:1:1:bin:/sbin/nologin\ndaemon:2:2:daemon:/sbin/nologin\nadm:3:4:adm:/sbin/nologin\nlp:4:7:lp:/sbin/nologin\n<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f -2</span>\nroot:x\nbin:x\ndaemon:x\nadm:x\nlp:x\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-cut\u7684\u5F0A\u7AEF" tabindex="-1"><a class="header-anchor" href="#_4-4-cut\u7684\u5F0A\u7AEF" aria-hidden="true">#</a> 4.4 cut\u7684\u5F0A\u7AEF</h3><p><strong>\u5982\u679C\u9047\u5230\u7A7A\u683C\u548C\u5236\u8868\u7B26\u65F6\uFF0C\u600E\u4E48\u5206\u8FA8\u5462\uFF1F\u6211\u89C9\u5F97\u6709\u70B9\u4E71\uFF0C\u600E\u4E48\u529E\uFF1F</strong></p><p>\u6709\u65F6\u5019\u5236\u8868\u7B26\u786E\u5B9E\u5F88\u96BE\u8FA8\u8BA4\uFF0C\u6709\u4E00\u4E2A\u65B9\u6CD5\u53EF\u4EE5\u770B\u51FA\u4E00\u6BB5\u7A7A\u683C\u5230\u5E95\u662F\u7531\u82E5\u5E72\u4E2A\u7A7A\u683C\u7EC4\u6210\u7684\u8FD8\u662F\u7531\u4E00\u4E2A\u5236\u8868\u7B26\u7EC4\u6210\u7684\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>cat tab_space.txt\nthis is tab finish.\nthis is several space      finish.\n$ sed -n l tab_space.txt\nthis is tab\\tfinish.$\nthis is several space      finish.$\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\u5230\u4E86\u5427\uFF0C\u5982\u679C\u662F\u5236\u8868\u7B26\uFF08TAB\uFF09\uFF0C\u90A3\u4E48\u4F1A\u663E\u793A\u4E3A\\t\u7B26\u53F7\uFF0C\u5982\u679C\u662F\u7A7A\u683C\uFF0C\u5C31\u4F1A\u539F\u6837\u663E\u793A\u3002\u901A\u8FC7\u6B64\u65B9\u6CD5\u5373\u53EF\u4EE5\u5224\u65AD\u5236\u8868\u7B26\u548C\u7A7A\u683C\u4E86\u3002\u6CE8\u610F\uFF0C\u4E0A\u9762sed -n\u540E\u9762\u7684\u5B57\u7B26\u662FL\u7684\u5C0F\u5199\u5B57\u6BCD\u54E6\uFF0C\u4E0D\u8981\u770B\u9519\u3002</p><p><strong>\u6211\u5E94\u8BE5\u5728cut -d\u4E2D\u7528\u4EC0\u4E48\u7B26\u53F7\u6765\u8BBE\u5B9A\u5236\u8868\u7B26\u6216\u7A7A\u683C\u5462?</strong></p><p>\u5176\u5B9Ecut\u7684-d\u9009\u9879\u7684\u9ED8\u8BA4\u95F4\u9694\u7B26\u5C31\u662F\u5236\u8868\u7B26\uFF0C\u6240\u4EE5\u5F53\u4F60\u5C31\u662F\u8981\u4F7F\u7528\u5236\u8868\u7B26\u7684\u65F6\u5019\uFF0C\u5B8C\u5168\u5C31\u53EF\u4EE5\u7701\u7565-d\u9009\u9879\uFF0C\u800C\u76F4\u63A5\u7528\uFF0Df\u6765\u53D6\u57DF\u5C31\u53EF\u4EE5\u4E86\u3002\u5982\u679C\u4F60\u8BBE\u5B9A\u4E00\u4E2A\u7A7A\u683C\u4E3A\u95F4\u9694\u7B26\uFF0C\u90A3\u4E48\u5C31\u8FD9\u6837\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$cat tab_space.txt |cut -d &#39; &#39; -f 1\nthis\nthis\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF0C\u4E24\u4E2A\u5355\u5F15\u53F7\u4E4B\u95F4\u53EF\u786E\u5B9E\u8981\u6709\u4E00\u4E2A\u7A7A\u683C\u54E6\uFF0C\u4E0D\u80FD\u5077\u61D2\u3002\u800C\u4E14\uFF0C\u4F60\u53EA\u80FD\u5728-d\u540E\u9762\u8BBE\u7F6E\u4E00\u4E2A\u7A7A\u683C\uFF0C\u53EF\u4E0D\u8BB8\u8BBE\u7F6E\u591A\u4E2A\u7A7A\u683C\uFF0C\u56E0\u4E3Acut\u53EA\u5141\u8BB8\u95F4\u9694\u7B26\u662F\u4E00\u4E2A\u5B57\u7B26\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ cat tab_space.txt |cut -d &#39; &#39; -f 1\ncut: the delimiter must be a single character\nTry `cut --help&#39; for more information.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u5916\uFF0Ccut\u5728\u5904\u7406\u591A\u7A7A\u683C\u7684\u65F6\u5019\u4F1A\u66F4\u9EBB\u70E6\uFF0C\u56E0\u4E3A<strong>cut\u53EA\u64C5\u957F\u5904\u7406\u201C\u4EE5\u4E00\u4E2A\u5B57\u7B26\u95F4\u9694\u201D\u7684\u6587\u672C\u5185\u5BB9\u3002</strong></p>', 54);
const _hoisted_55 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_55);
}
var Linux______Cut_____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Linux\u6587\u672C\u64CD\u4F5C\u547D\u4EE4-cut\u5207\u5206\u547D\u4EE4.html.vue"]]);
export { Linux______Cut_____html as default };
