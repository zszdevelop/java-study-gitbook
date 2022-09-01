import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{o as e,c as t,a as n,b as p,e as o,r as c}from"./app.61455a3d.js";const l={},i=o(`<h1 id="aspose-word\u52A8\u6001\u4FEE\u6539\u5B57\u4F53\u7B49" tabindex="-1"><a class="header-anchor" href="#aspose-word\u52A8\u6001\u4FEE\u6539\u5B57\u4F53\u7B49" aria-hidden="true">#</a> aspose.word\u52A8\u6001\u4FEE\u6539\u5B57\u4F53\u7B49</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u6211\u4EEC\u9700\u6C42\u4E2D\u53EF\u80FD\u9700\u8981\u5BF9doc\u6587\u6863\u4E2D\u67D0\u4E2A\u5B57\u7B26\uFF0C\u6839\u636E\u5B57\u7B26\u957F\u5EA6\u52A8\u6001\u8BBE\u7F6E\u5B57\u4F53\u5927\u5C0F\u7B49\u64CD\u4F5C\u3002\u5982\u4F55\u5B9A\u4F4D\u5230\u8BE5\u5B57\u4F53\u548C\u8BBE\u7F6E\u5462\uFF1F</p><h2 id="_2-\u4EE3\u7801\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-\u4EE3\u7801\u793A\u4F8B" aria-hidden="true">#</a> 2. \u4EE3\u7801\u793A\u4F8B</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Document</span> doc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span>templateFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6784\u5EFA\u51FAbuilder</span>
<span class="token class-name">DocumentBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DocumentBuilder</span><span class="token punctuation">(</span>doc<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u79FB\u52A8\u5230\u9700\u8981\u8BBE\u7F6E\u7684\u5B57\u6BB5</span>
builder<span class="token punctuation">.</span><span class="token function">moveToMergeField</span><span class="token punctuation">(</span>fieldName<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F</span>
builder<span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>fontSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u6DFB\u52A0\u5220\u9664\u7EBF</span>
builder<span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setStrikeThrough</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u5199\u5165\u5B57\u6BB5\u503C\uFF08\u975E\u5E38\u91CD\u8981\uFF0C\u5426\u5219\u5C55\u793A\u4E3A\u7A7A\uFF09</span>
builder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>fieldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u76F8\u5173\u4E1A\u52A1\u7EC6\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#_3-\u76F8\u5173\u4E1A\u52A1\u7EC6\u8282\u70B9" aria-hidden="true">#</a> 3. \u76F8\u5173\u4E1A\u52A1\u7EC6\u8282\u70B9</h2><h3 id="_3-1-\u5B57\u7B26\u957F\u5EA6\u8BA1\u7B97" tabindex="-1"><a class="header-anchor" href="#_3-1-\u5B57\u7B26\u957F\u5EA6\u8BA1\u7B97" aria-hidden="true">#</a> 3.1 \u5B57\u7B26\u957F\u5EA6\u8BA1\u7B97</h3><p>\u6211\u4EEC\u516C\u53F8\u7684word \u4F1A\u6BD4\u8F83\u4E25\u8C28\u4E00\u70B9\u3002\u4F8B\u5982\u67D0\u4E2A\u6587\u672C\u6846\u53EA\u80FD\u8F93\u51655\u4E2A\u4E2D\u6587\u5B57\u3002\u4F46\u662F\u5982\u679C\u8F93\u5165\u7684\u662F\u82F1\u6587\u5C31\u4E0D\u6B625\u4E2A\uFF0C\u6240\u4EE5\u9700\u8981\u52A8\u6001\u8BA1\u7B97\u3002\u6240\u4EE5\u9700\u8981\u6211\u4EEC\u52A8\u6001\u8BA1\u7B97\u7F29\u653E\u7684\u5927\u5C0F</p><p>\u7528\u5230\u6280\u5DE7\u5C31\u662F\u65E0\u8BBA\u4E2D\u6587\u82F1\u6587\u90FD\u7528gb2312 \u7F16\u7801\u6765\u8BA1\u7B97</p><blockquote><h2 id="\u7EC8\u7AEF\u4E0B\u4E2D\u6587\u5B57\u7B26-\u5BBD\u5B57\u7B26-\u7684\u5BF9\u9F50\u8F93\u51FA\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u7EC8\u7AEF\u4E0B\u4E2D\u6587\u5B57\u7B26-\u5BBD\u5B57\u7B26-\u7684\u5BF9\u9F50\u8F93\u51FA\u95EE\u9898" aria-hidden="true">#</a> \u7EC8\u7AEF\u4E0B\u4E2D\u6587\u5B57\u7B26\uFF08\u5BBD\u5B57\u7B26\uFF09\u7684\u5BF9\u9F50\u8F93\u51FA\u95EE\u9898</h2><p>\u6BD4\u5982\u6211\u5728\u7EC8\u7AEF\u4E0B\u8F93\u51FA\u8868\u683C\uFF0C\u91CC\u9762\u5305\u542B\u4E86\u4E2D\u82F1\u6587\uFF0C\u56E0\u4E3A\u4E2D\u82F1\u6587\u7684\u957F\u5EA6\u4E0D\u4E00\u81F4\uFF0C<code>len()</code>\u83B7\u53D6\u7684\u5BBD\u5EA6\u662F\u7F16\u7801\u5B57\u8282\u7684\u957F\u5EA6\uFF0C\u4E0D\u662F\u5B9E\u9645\u957F\u5EA6\uFF1A</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token builtin">len</span><span class="token punctuation">(</span><span class="token string">u&#39;\u6211&#39;</span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token number">3</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token builtin">len</span><span class="token punctuation">(</span><span class="token string">u&#39;\u6211&#39;</span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">&#39;gbk&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC**\u300C\u6211\u300D\u5982\u679C\u662F utf-8 \u7F16\u7801\uFF0C\u5219\u5360 3 \u4E2A\u5B57\u8282\u957F\u5EA6\uFF0C\u800C\u5728 gbk \u4E0B\u5219\u662F 2 \u4E2A\u5B57\u8282\u957F\u5EA6**\u3002\u6240\u4EE5\u901A\u8FC7<code>len()</code>\u6765\u56FA\u5B9A\u957F\u5EA6\u663E\u7136\u4E0D\u5408\u9002\uFF0C\u9020\u6210\u65E0\u6CD5\u5BF9\u9F50\u7684\u60C5\u51B5\u3002</p></blockquote><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token doc-comment comment">/**
     * \u5904\u7406\u5B57\u7B26\u4E32\u7684\u5927\u5C0F\u4E0E\u957F\u5EA6
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> \u503C\u5BF9\u8C61
     * <span class="token keyword">@param</span> <span class="token parameter">setLenth</span> \u89C4\u5B9A\u957F\u5EA6\uFF0C\u5927\u4E8E0
     * <span class="token keyword">@param</span> <span class="token parameter">appendSpace</span> \u957F\u5EA6\u4E0D\u591F\u662F\u5426\u52A0\u7A7A\u683C
     * <span class="token keyword">@param</span> <span class="token parameter">charSpace</span> \u7A7A\u683C(\u5168\u89D2\u6216\u534A\u89D2)
     * <span class="token keyword">@return</span>
     */</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token class-name">GetFontSizeZoom</span><span class="token punctuation">(</span><span class="token class-name">FdAsposeFieldAttr</span> item<span class="token punctuation">,</span> <span class="token keyword">int</span> setLenth<span class="token punctuation">,</span> <span class="token keyword">boolean</span> appendSpace<span class="token punctuation">,</span> <span class="token class-name">String</span> charSpace<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getFieldName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;\u62A5\u6848\u4EBA\u59D3\u540D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token class-name">String</span> s <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">getFieldName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">double</span> standar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>setLenth <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
       <span class="token punctuation">{</span>
           <span class="token class-name">String</span> fieldValue <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">getFieldValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token keyword">long</span> mylenth <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
           <span class="token keyword">try</span> <span class="token punctuation">{</span>
               <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> gb2312s <span class="token operator">=</span> fieldValue<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token string">&quot;gb2312&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
               mylenth <span class="token operator">=</span> gb2312s<span class="token punctuation">.</span>length<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnsupportedEncodingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
               e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span>

           <span class="token keyword">if</span> <span class="token punctuation">(</span>mylenth <span class="token operator">&gt;</span> setLenth<span class="token punctuation">)</span>
           <span class="token punctuation">{</span>
               <span class="token keyword">double</span> level <span class="token operator">=</span> <span class="token number">1.0</span> <span class="token operator">*</span> mylenth <span class="token operator">/</span> setLenth<span class="token punctuation">;</span>
               standar <span class="token operator">=</span> level<span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
           <span class="token keyword">if</span> <span class="token punctuation">(</span>appendSpace <span class="token operator">&amp;&amp;</span> mylenth <span class="token operator">&lt;</span> setLenth<span class="token punctuation">)</span>
           <span class="token punctuation">{</span>
               <span class="token keyword">if</span> <span class="token punctuation">(</span>fieldValue <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
               <span class="token punctuation">{</span>
                   <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">rightPad</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> setLenth<span class="token punctuation">,</span> charSpace<span class="token punctuation">)</span><span class="token punctuation">;</span>
                   item<span class="token punctuation">.</span><span class="token function">setFieldValue</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
               <span class="token punctuation">}</span>
               <span class="token keyword">else</span>
               <span class="token punctuation">{</span>
                   <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">rightPad</span><span class="token punctuation">(</span>fieldValue<span class="token punctuation">,</span> setLenth<span class="token punctuation">,</span> charSpace<span class="token punctuation">)</span><span class="token punctuation">;</span>
                   item<span class="token punctuation">.</span><span class="token function">setFieldValue</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
               <span class="token punctuation">}</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">return</span> standar<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,12),u={href:"https://blog.tankywoo.com/2017/01/21/python-cli-chinese-align-and-encoding-continue.html",target:"_blank",rel:"noopener noreferrer"},r=n("strong",null,"Python \u7EC8\u7AEF\u4E0B\u4E2D\u6587\u5B57\u7B26\u5BF9\u9F50\u5904\u7406\u548C\u7F16\u7801\u7EED",-1);function d(k,v){const s=c("ExternalLinkIcon");return e(),t("div",null,[i,n("p",null,[n("a",u,[r,p(s)])])])}var h=a(l,[["render",d],["__file","aspose.word\u57FA\u7840-asposeword\u52A8\u6001\u4FEE\u6539\u5B57\u4F53\u7B49.html.vue"]]);export{h as default};
