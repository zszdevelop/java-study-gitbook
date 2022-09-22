import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as t,a as n,b as o,e as p,d as c,r as i}from"./app.b4cde55b.js";const l={},u=p(`<h1 id="\u524D\u7AEFjs-vue\u4E0B\u8F7D\u540E\u53F0\u4F20\u8FC7\u6765\u7684\u6D41\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u524D\u7AEFjs-vue\u4E0B\u8F7D\u540E\u53F0\u4F20\u8FC7\u6765\u7684\u6D41\u6587\u4EF6" aria-hidden="true">#</a> \u524D\u7AEFjs/vue\u4E0B\u8F7D\u540E\u53F0\u4F20\u8FC7\u6765\u7684\u6D41\u6587\u4EF6</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u9879\u76EE\u4E2D\u7ECF\u5E38\u9700\u8981\u7528\u5230\u4E0B\u8F7D\u6587\u4EF6\uFF0C\u5982\u5BFC\u51FA\u7528\u6237\u4FE1\u606F\uFF0C\u4E0B\u8F7D\u4E00\u4E9B\u6587\u4EF6\u7B49\u3002\u6211\u4EEC\u5728vue\u4E2D\u5982\u4F55\u5B9E\u73B0\u5462\uFF1F\u4E3B\u8981\u6709\u5982\u4E0B\u4E24\u79CD\u65B9\u6848</p><ul><li>\u4F7F\u7528Blob\u5BF9\u8C61\uFF0C\u6784\u9020a\u6807\u7B7E</li><li>\u4F7F\u7528\u5C01\u88C5\u597D\u7684<strong>js-file-download</strong></li></ul><blockquote><p>\u8FD9\u4E24\u79CD\u65B9\u6CD5\u4E0B\u8F7D\u7684\u6587\u4EF6\u90FD<strong>\u4E0D\u4F1A\u4E71\u7801</strong>\uFF0C\u4F46\u662F <strong>\u4E0D\u7BA1\u4F7F\u7528\u54EA\u79CD\u65B9\u6CD5\uFF0C\u53D1\u9001\u8BF7\u6C42\u65F6\u90FD\u8981\u8BBE\u7F6E responseType</strong></p></blockquote><h2 id="_2-\u65B9\u6848\u4E00-\u4F7F\u7528blob\u5BF9\u8C61-\u6784\u9020a\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#_2-\u65B9\u6848\u4E00-\u4F7F\u7528blob\u5BF9\u8C61-\u6784\u9020a\u6807\u7B7E" aria-hidden="true">#</a> 2. \u65B9\u6848\u4E00\uFF1A\u4F7F\u7528Blob\u5BF9\u8C61\uFF0C\u6784\u9020a\u6807\u7B7E</h2><h3 id="_2-1-blob-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_2-1-blob-\u7B80\u4ECB" aria-hidden="true">#</a> 2.1 Blob \u7B80\u4ECB</h3><p>Blob\u5BF9\u8C61\u8868\u793A\u4E00\u4E2A\u4E0D\u53EF\u53D8\u3001\u539F\u59CB\u6570\u636E\u7684\u7C7B\u6587\u4EF6\u5BF9\u8C61\u3002Blob \u8868\u793A\u7684\u4E0D\u4E00\u5B9A\u662FJavaScript\u539F\u751F\u683C\u5F0F\u7684\u6570\u636E\u3002File\u63A5\u53E3\u57FA\u4E8EBlob\uFF0C\u7EE7\u627F\u4E86blob\u7684\u529F\u80FD\u5E76\u5C06\u5176\u6269\u5C55\u4F7F\u5176\u652F\u6301\u7528\u6237\u7CFB\u7EDF\u4E0A\u7684\u6587\u4EF6\u3002</p><h3 id="_2-2-blob-\u6784\u9020\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_2-2-blob-\u6784\u9020\u51FD\u6570" aria-hidden="true">#</a> 2.2 Blob()\u6784\u9020\u51FD\u6570</h3><p>\u8BED\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> aBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span> array<span class="token punctuation">,</span> options <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u53C2\u6570</p><ul><li><em>array</em> \u662F\u4E00\u4E2A\u7531<code>ArrayBuffer</code> <code>ArrayBufferView</code>, Blob<code>, </code>DOMString<code>\u7B49\u5BF9\u8C61\u6784\u6210\u7684 [</code>Array<code>\uFF0C\u6216\u8005\u5176\u4ED6\u7C7B\u4F3C\u5BF9\u8C61\u7684\u6DF7\u5408\u4F53\uFF0C\u5B83\u5C06\u4F1A\u88AB\u653E\u8FDB </code>Blob\`\u3002DOMStrings\u4F1A\u88AB\u7F16\u7801\u4E3AUTF-8\u3002</li><li><em>options</em> \u662F\u53EF\u9009\u7684\uFF0C\u5B83\u53EF\u80FD\u4F1A\u6307\u5B9A\u5982\u4E0B\u4E24\u4E2A\u5C5E\u6027\uFF1A <ul><li><code>type</code>\uFF0C\u9ED8\u8BA4\u503C\u4E3A <code>&quot;&quot;</code>\uFF0C\u5B83\u4EE3\u8868\u4E86\u5C06\u4F1A\u88AB\u653E\u5165\u5230blob\u4E2D\u7684\u6570\u7EC4\u5185\u5BB9\u7684MIME\u7C7B\u578B\u3002<strong>\u4E5F\u5C31\u662F\u8BBE\u7F6E\u6587\u4EF6\u7C7B\u578B\u3002</strong></li><li><code>endings</code>\uFF0C\u9ED8\u8BA4\u503C\u4E3A<code>&quot;transparent&quot;</code>\uFF0C\u7528\u4E8E\u6307\u5B9A\u5305\u542B\u884C\u7ED3\u675F\u7B26<code>\\n</code>\u7684\u5B57\u7B26\u4E32\u5982\u4F55\u88AB\u5199\u5165\u3002 \u5B83\u662F\u4EE5\u4E0B\u4E24\u4E2A\u503C\u4E2D\u7684\u4E00\u4E2A\uFF1A <code>&quot;native&quot;</code>\uFF0C\u4EE3\u8868\u884C\u7ED3\u675F\u7B26\u4F1A\u88AB\u66F4\u6539\u4E3A\u9002\u5408\u5BBF\u4E3B\u64CD\u4F5C\u7CFB\u7EDF\u6587\u4EF6\u7CFB\u7EDF\u7684\u6362\u884C\u7B26\uFF0C\u6216\u8005 <code>&quot;transparent&quot;</code>\uFF0C\u4EE3\u8868\u4F1A\u4FDD\u6301blob\u4E2D\u4FDD\u5B58\u7684\u7ED3\u675F\u7B26\u4E0D\u53D8\u3002</li></ul></li></ul><h3 id="_2-3-url\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#_2-3-url\u5BF9\u8C61" aria-hidden="true">#</a> 2.3 URL\u5BF9\u8C61</h3><p>\u901A\u8FC7\u521B\u5EFAURL\u5BF9\u8C61\u6307\u5B9A\u6587\u4EF6\u7684\u4E0B\u8F7D\u94FE\u63A5\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u521B\u5EFA\u65B0\u7684URL\u8868\u793A\u6307\u5B9A\u7684File\u5BF9\u8C61\u6216\u8005Blob\u5BF9\u8C61\u3002</span>
<span class="token keyword">let</span> objectURL <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">;</span> 
window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span>objectURL<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u91CA\u653E\u5185\u5B58</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u5728\u6BCF\u6B21\u8C03\u7528createObjectURL()\u65B9\u6CD5\u65F6\uFF0C\u90FD\u4F1A\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 URL \u5BF9\u8C61\uFF0C\u5373\u4F7F\u4F60\u5DF2\u7ECF\u7528\u76F8\u540C\u7684\u5BF9\u8C61\u4F5C\u4E3A\u53C2\u6570\u521B\u5EFA\u8FC7\u3002\u5F53\u4E0D\u518D\u9700\u8981\u8FD9\u4E9B URL \u5BF9\u8C61\u65F6\uFF0C\u6BCF\u4E2A\u5BF9\u8C61\u5FC5\u987B\u901A\u8FC7\u8C03\u7528 URL.revokeObjectURL()\u65B9\u6CD5\u6765\u91CA\u653E\u3002\u6D4F\u89C8\u5668\u4F1A\u5728\u6587\u6863\u9000\u51FA\u7684\u65F6\u5019\u81EA\u52A8\u91CA\u653E\u5B83\u4EEC\uFF0C\u4F46\u662F\u4E3A\u4E86\u83B7\u5F97\u6700\u4F73\u6027\u80FD\u548C\u5185\u5B58\u4F7F\u7528\u72B6\u51B5\uFF0C\u4F60\u5E94\u8BE5\u5728\u5B89\u5168\u7684\u65F6\u673A\u4E3B\u52A8\u91CA\u653E\u6389\u5B83\u4EEC\u3002</p></blockquote><h3 id="_2-4-\u5229\u7528a\u6807\u7B7E\u81EA\u5B9A\u4E49\u6587\u4EF6\u540D" tabindex="-1"><a class="header-anchor" href="#_2-4-\u5229\u7528a\u6807\u7B7E\u81EA\u5B9A\u4E49\u6587\u4EF6\u540D" aria-hidden="true">#</a> 2.4 \u5229\u7528a\u6807\u7B7E\u81EA\u5B9A\u4E49\u6587\u4EF6\u540D</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">const</span> link <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u751F\u6210\u4E00\u4E2Aa\u6807\u7B7E\u3002</span>
link<span class="token punctuation">.</span>href <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// href\u5C5E\u6027\u6307\u5B9A\u4E0B\u8F7D\u94FE\u63A5</span>
link<span class="token punctuation">.</span>download <span class="token operator">=</span> fileName<span class="token punctuation">;</span> <span class="token comment">// dowload\u5C5E\u6027\u6307\u5B9A\u6587\u4EF6\u540D</span>
link<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// click()\u4E8B\u4EF6\u89E6\u53D1\u4E0B\u8F7D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>download \u5C5E\u6027\u8BBE\u7F6E\u6587\u4EF6\u540D\u65F6\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BBE\u7F6E\u6269\u5C55\u540D\u3002\u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\uFF0C\u5219\u6D4F\u89C8\u5668\u5C06\u81EA\u52A8\u68C0\u6D4B\u6B63\u786E\u7684\u6587\u4EF6\u6269\u5C55\u540D\u5E76\u6DFB\u52A0\u5230\u6587\u4EF6 \u3002</p><h3 id="_2-5-\u4E3B\u8981\u5B8C\u6574\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_2-5-\u4E3B\u8981\u5B8C\u6574\u4EE3\u7801" aria-hidden="true">#</a> 2.5 \u4E3B\u8981\u5B8C\u6574\u4EE3\u7801</h3><ul><li><p>\u666E\u901A\u4E0B\u8F7D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>postUrl<span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token string">&#39;arraybuffer&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u521B\u5EFABlob\u5BF9\u8C61\uFF0C\u8BBE\u7F6E\u6587\u4EF6\u7C7B\u578B</span>
    <span class="token keyword">let</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>res<span class="token punctuation">.</span>data<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;application/vnd.ms-excel&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> objectUrl <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span> <span class="token comment">// \u521B\u5EFAURL</span>
    location<span class="token punctuation">.</span>href <span class="token operator">=</span> objectUrl<span class="token punctuation">;</span>
    <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span>objectUrl<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u91CA\u653E\u5185\u5B58</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u81EA\u5B9A\u4E49\u4E0B\u8F7D\u540E\u7684\u6587\u4EF6\u540D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5229\u7528a\u6807\u7B7E\u81EA\u5B9A\u4E49\u4E0B\u8F7D\u6587\u4EF6\u540D</span>
<span class="token keyword">const</span> link <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>postUrl<span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token string">&#39;arraybuffer&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u521B\u5EFABlob\u5BF9\u8C61\uFF0C\u8BBE\u7F6E\u6587\u4EF6\u7C7B\u578B</span>
    <span class="token keyword">let</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>res<span class="token punctuation">.</span>data<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;application/vnd.ms-excel&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> objectUrl <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span> <span class="token comment">// \u521B\u5EFAURL</span>
    link<span class="token punctuation">.</span>href <span class="token operator">=</span> objectUrl
    link<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token string">&#39;xxx&#39;</span> <span class="token comment">// \u81EA\u5B9A\u4E49\u6587\u4EF6\u540D</span>
    link<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u4E0B\u8F7D\u6587\u4EF6</span>
    <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span>objectUrl<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u91CA\u653E\u5185\u5B58</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_3-\u65B9\u6848\u4E8C-\u4F7F\u7528-js-file-download" tabindex="-1"><a class="header-anchor" href="#_3-\u65B9\u6848\u4E8C-\u4F7F\u7528-js-file-download" aria-hidden="true">#</a> 3. \u65B9\u6848\u4E8C\uFF1A\u4F7F\u7528 <code>js-file-download</code></h2><ul><li><p>\u5B89\u88C5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> js-file-download <span class="token parameter variable">--save</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u4F7F\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> fileDownload <span class="token keyword">from</span> <span class="token string">&#39;js-file-download&#39;</span>

axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>postUrl<span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">responseType</span><span class="token operator">:</span> <span class="token string">&#39;arraybuffer&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">fileDownload</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">&#39;xxx.xls&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_4-\u53EF\u80FD\u9047\u5230\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_4-\u53EF\u80FD\u9047\u5230\u7684\u95EE\u9898" aria-hidden="true">#</a> 4. \u53EF\u80FD\u9047\u5230\u7684\u95EE\u9898</h2><h3 id="_4-1-axios\u83B7\u53D6\u4E0D\u5230\u6587\u4EF6\u540D" tabindex="-1"><a class="header-anchor" href="#_4-1-axios\u83B7\u53D6\u4E0D\u5230\u6587\u4EF6\u540D" aria-hidden="true">#</a> 4.1 axios\u83B7\u53D6\u4E0D\u5230\u6587\u4EF6\u540D</h3><ol><li><p>\u9700\u8981\u5728\u670D\u52A1\u7AEF\u52A0\u4E0A\u6B64\u8BF7\u6C42\u5934</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">//\u54CD\u5E94\u65F6\u5728\u54CD\u5E94\u5934\u91CC\u6DFB\u52A0 Access-Control-Expose-Headers </span>
 response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Access-Control-Expose-Headers&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Content-Disposition&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u524D\u7AEF\u8FD8\u662F\u7528\u539F\u751F\u7684axios post \u65B9\u6CD5\u5427</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>download(url, params, filename) {
        // NProgress.start()
        return axios.post(url, params, {
            timeout: 300000,
            baseURL: baseUrl,
            transformRequest: [(params) =&gt; {
                return tansParams(params);
            }],
            headers: {
                &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;,
                &quot;Authorization&quot;: &quot;Bearer &quot; + getToken()
            },
            responseType: &quot;blob&quot;
        }).then((response) =&gt; {
            if (filename == null||filename== undefined||filename==&#39;&#39;){
                // \u524D\u63D0\u662F\u670D\u52A1\u7AEF\u8981\u5728header\u8BBE\u7F6EAccess-Control-Expose-Headers: Content-Disposition
                // \u524D\u7AEF\u624D\u80FD\u6B63\u5E38\u83B7\u53D6\u5230Content-Disposition\u5185\u5BB9
                const disposition = response.headers[&quot;content-disposition&quot;];
                let filename = disposition.substring(disposition.indexOf(&quot;filename=&quot;) + 9, disposition.length);
                // iso8859-1\u7684\u5B57\u7B26\u8F6C\u6362\u6210\u4E2D\u6587
                filename = decodeURI(escape(filename));
                // \u53BB\u6389\u53CC\u5F15\u53F7
                filename = filename.replace(/\\&quot;/g, &quot;&quot;);
            }
            
            const content = response.data;
            const blob = new Blob([content]);
            if (&quot;download&quot; in document.createElement(&quot;a&quot;)) {
                const elink = document.createElement(&quot;a&quot;);
                elink.download = filename;
                elink.style.display = &quot;none&quot;;
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            } else {
                navigator.msSaveBlob(blob, filename);
            }
            // NProgress.done()
        }).catch((r) =&gt; {
        });
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,28),r={href:"https://segmentfault.com/a/1190000020540788",target:"_blank",rel:"noopener noreferrer"},d=c("\u524D\u7AEFjs/vue\u4E0B\u8F7D\u540E\u53F0\u4F20\u8FC7\u6765\u7684\u6D41\u6587\u4EF6\uFF08\u5982excel\uFF09\u5E76\u8BBE\u7F6E\u4E0B\u8F7D\u6587\u4EF6\u540D");function k(v,m){const s=i("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[d,o(s)])])])}const f=a(l,[["render",k],["__file","fe-download.html.vue"]]);export{f as default};
