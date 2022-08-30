import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e as i}from"./app.24aaacd5.js";const a={},l=i(`<h1 id="uniq\u53BB\u91CD\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#uniq\u53BB\u91CD\u547D\u4EE4" aria-hidden="true">#</a> uniq\u53BB\u91CD\u547D\u4EE4</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1 \u7B80\u4ECB</h2><p>uniq\u547D\u4EE4\u53EF\u4EE5\u53BB\u9664\u6392\u5E8F\u8FC7\u7684\u6587\u4EF6\u4E2D\u7684\u91CD\u590D\u884C</p><blockquote><p>\u56E0\u6B64uniq\u7ECF\u5E38\u548Csort\u5408\u7528\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u4E3A\u4E86\u4F7Funiq\u8D77\u4F5C\u7528\uFF0C\u6240\u6709\u7684\u91CD\u590D\u884C\u5FC5\u987B\u662F\u76F8\u90BB\u7684\u3002</p></blockquote><h2 id="_2-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_2-\u7B80\u4ECB" aria-hidden="true">#</a> 2 \u7B80\u4ECB</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">uniq</span> <span class="token punctuation">[</span>-icu<span class="token punctuation">]</span>
\u9009\u9879\u4E0E\u53C2\u6570\uFF1A
-i   \uFF1A\u5FFD\u7565\u5927\u5C0F\u5199\u5B57\u7B26\u7684\u4E0D\u540C\uFF1B
-c  \uFF1A\u8FDB\u884C\u8BA1\u6570
-u  \uFF1A\u53EA\u663E\u793A\u552F\u4E00\u7684\u884C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-uniq-\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_3-uniq-\u4F7F\u7528" aria-hidden="true">#</a> 3 uniq \u4F7F\u7528</h2><p>testfile\u7684\u5185\u5BB9\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># cat testfile</span>
hello
world
friend
hello
world
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u76F4\u63A5\u5220\u9664\u672A\u7ECF\u6392\u5E8F\u7684\u6587\u4EF6\uFF0C\u5C06\u4F1A\u53D1\u73B0\u6CA1\u6709\u4EFB\u4F55\u884C\u88AB\u5220\u9664:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#uniq testfile  </span>
hello
world
friend
hello
world
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6392\u5E8F\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u662F\u53BB\u91CD:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#cat words | sort |uniq</span>
friend
hello
world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6392\u5E8F\u4E4B\u540E\u5220\u9664\u4E86\u91CD\u590D\u884C\uFF0C\u540C\u65F6\u5728\u884C\u9996\u4F4D\u7F6E\u8F93\u51FA\u8BE5\u884C\u91CD\u590D\u7684\u6B21\u6570:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#sort testfile | uniq -c</span>
<span class="token number">1</span> friend
<span class="token number">3</span> hello
<span class="token number">2</span> world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EC5\u663E\u793A\u5B58\u5728\u91CD\u590D\u7684\u884C\uFF0C\u5E76\u5728\u884C\u9996\u663E\u793A\u8BE5\u884C\u91CD\u590D\u7684\u6B21\u6570:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#sort testfile | uniq -dc</span>
<span class="token number">3</span> hello
<span class="token number">2</span> world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EC5\u663E\u793A\u4E0D\u91CD\u590D\u7684\u884C:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#sort testfile | uniq -u</span>
friend 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,19),d=[l];function r(c,u){return n(),s("div",null,d)}var t=e(a,[["render",r],["__file","Linux\u6587\u672C\u64CD\u4F5C\u547D\u4EE4-uniq\u53BB\u91CD\u547D\u4EE4.html.vue"]]);export{t as default};
