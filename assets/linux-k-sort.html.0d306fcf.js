import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as e,d as a}from"./app.b58ae558.js";const i={},l=a(`<h1 id="sort\u6392\u5E8F\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#sort\u6392\u5E8F\u547D\u4EE4" aria-hidden="true">#</a> sort\u6392\u5E8F\u547D\u4EE4</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1 \u7B80\u4ECB</h2><p>sort\u547D\u4EE4\u662F\u5E2E\u6211\u4EEC\u4F9D\u636E\u4E0D\u540C\u7684\u6570\u636E\u7C7B\u578B\u8FDB\u884C\u6392\u5E8F</p><blockquote><p>sort\u53EF\u9488\u5BF9\u6587\u672C\u6587\u4EF6\u7684\u5185\u5BB9\uFF0C\u4EE5\u884C\u4E3A\u5355\u4F4D\u6765\u6392\u5E8F\u3002</p></blockquote><h2 id="_2-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-\u8BED\u6CD5" aria-hidden="true">#</a> 2 \u8BED\u6CD5</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sort [-bcfMnrtk][\u6E90\u6587\u4EF6][-o \u8F93\u51FA\u6587\u4EF6] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_3-\u53C2\u6570" aria-hidden="true">#</a> 3 \u53C2\u6570</h2><ul><li>-b \u5FFD\u7565\u6BCF\u884C\u524D\u9762\u5F00\u59CB\u51FA\u7684\u7A7A\u683C\u5B57\u7B26\u3002</li><li>-c \u68C0\u67E5\u6587\u4EF6\u662F\u5426\u5DF2\u7ECF\u6309\u7167\u987A\u5E8F\u6392\u5E8F\u3002</li><li>-f \u6392\u5E8F\u65F6\uFF0C\u5FFD\u7565\u5927\u5C0F\u5199\u5B57\u6BCD\u3002</li><li>-M \u5C06\u524D\u97623\u4E2A\u5B57\u6BCD\u4F9D\u7167\u6708\u4EFD\u7684\u7F29\u5199\u8FDB\u884C\u6392\u5E8F\u3002</li><li>-n \u4F9D\u7167\u6570\u503C\u7684\u5927\u5C0F\u6392\u5E8F\u3002</li><li>-o&lt;\u8F93\u51FA\u6587\u4EF6&gt; \u5C06\u6392\u5E8F\u540E\u7684\u7ED3\u679C\u5B58\u5165\u6307\u5B9A\u7684\u6587\u4EF6\u3002</li><li>-r \u4EE5\u76F8\u53CD\u7684\u987A\u5E8F\u6765\u6392\u5E8F\u3002</li><li>-t&lt;\u5206\u9694\u5B57\u7B26&gt; \u6307\u5B9A\u6392\u5E8F\u65F6\u6240\u7528\u7684\u680F\u4F4D\u5206\u9694\u5B57\u7B26\u3002</li><li>-k \u9009\u62E9\u4EE5\u54EA\u4E2A\u533A\u95F4\u8FDB\u884C\u6392\u5E8F\u3002</li></ul><h2 id="_4-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_4-\u793A\u4F8B" aria-hidden="true">#</a> 4 \u793A\u4F8B</h2><h3 id="_4-1-\u793A\u4F8B1" tabindex="-1"><a class="header-anchor" href="#_4-1-\u793A\u4F8B1" aria-hidden="true">#</a> 4.1 \u793A\u4F8B1</h3><p>sort\u5C06\u6587\u4EF6\u7684\u6BCF\u4E00\u884C\u4F5C\u4E3A\u4E00\u4E2A\u5355\u4F4D\uFF0C\u76F8\u4E92\u6BD4\u8F83\uFF0C\u6BD4\u8F83\u539F\u5219\u662F\u4ECE\u9996\u5B57\u7B26\u5411\u540E\uFF0C\u4F9D\u6B21\u6309ASCII\u7801\u503C\u8FDB\u884C\u6BD4\u8F83\uFF0C\u6700\u540E\u5C06\u4ED6\u4EEC\u6309\u5347\u5E8F\u8F93\u51FA\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> seq.txt
banana
apple
pear
orange
$ <span class="token function">sort</span> seq.txt
apple
banana
orange
pear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7528\u6237\u53EF\u4EE5\u4FDD\u5B58\u6392\u5E8F\u540E\u7684\u6587\u4EF6\u5185\u5BB9\uFF0C\u6216\u628A\u6392\u5E8F\u540E\u7684\u6587\u4EF6\u5185\u5BB9\u8F93\u51FA\u81F3\u6253\u5370\u673A\u3002\u4E0B\u4F8B\u4E2D\u7528\u6237\u628A\u6392\u5E8F\u540E\u7684\u6587\u4EF6\u5185\u5BB9\u4FDD\u5B58\u5230\u540D\u4E3Aresult\u7684\u6587\u4EF6\u4E2D\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sort</span> seq.txt <span class="token operator">&gt;</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-\u793A\u4F8B2-sort\u7684-u\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_4-2-\u793A\u4F8B2-sort\u7684-u\u9009\u9879" aria-hidden="true">#</a> 4.2 \u793A\u4F8B2:sort\u7684-u\u9009\u9879</h3><p>\u5B83\u7684\u4F5C\u7528\u5F88\u7B80\u5355\uFF0C\u5C31\u662F\u5728\u8F93\u51FA\u884C\u4E2D\u53BB\u9664\u91CD\u590D\u884C\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">cat</span> seq.txt
banana
apple
pear
orange
pear
$ <span class="token function">sort</span> seq.txt
apple
banana
orange
pear
pear
$ <span class="token function">sort</span> <span class="token parameter variable">-u</span> seq.txt
apple
banana
orange
pear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pear\u7531\u4E8E\u91CD\u590D\u88AB-u\u9009\u9879\u65E0\u60C5\u7684\u5220\u9664\u4E86\u3002</p><h3 id="_4-3-\u793A\u4F8B3-sort\u7684-r\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_4-3-\u793A\u4F8B3-sort\u7684-r\u9009\u9879" aria-hidden="true">#</a> 4.3 \u793A\u4F8B3\uFF1Asort\u7684-r\u9009\u9879</h3><p>sort\u9ED8\u8BA4\u7684\u6392\u5E8F\u65B9\u5F0F\u662F\u5347\u5E8F\uFF0C\u5982\u679C\u60F3\u6539\u6210\u964D\u5E8F\uFF0C\u5C31\u52A0\u4E2A-r\u5C31\u641E\u5B9A\u4E86\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">cat</span> number.txt
<span class="token number">1</span>
<span class="token number">3</span>
<span class="token number">5</span>
<span class="token number">2</span>
<span class="token number">4</span>
$ <span class="token function">sort</span> number.txt
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
<span class="token number">5</span>
$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt
<span class="token number">5</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-\u793A\u4F8B4-sort\u7684-o\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_4-4-\u793A\u4F8B4-sort\u7684-o\u9009\u9879" aria-hidden="true">#</a> 4.4 \u793A\u4F8B4\uFF1Asort\u7684-o\u9009\u9879</h3><p>\u7531\u4E8Esort\u9ED8\u8BA4\u662F\u628A\u7ED3\u679C\u8F93\u51FA\u5230\u6807\u51C6\u8F93\u51FA\uFF0C\u6240\u4EE5\u9700\u8981\u7528\u91CD\u5B9A\u5411\u624D\u80FD\u5C06\u7ED3\u679C\u5199\u5165\u6587\u4EF6\uFF0C\u5F62\u5982sort filename &gt; newfile\u3002</p><p>\u4F46\u662F\uFF0C\u5982\u679C\u4F60\u60F3\u628A\u6392\u5E8F\u7ED3\u679C\u8F93\u51FA\u5230\u539F\u6587\u4EF6\u4E2D\uFF0C\u7528\u91CD\u5B9A\u5411\u53EF\u5C31\u4E0D\u884C\u4E86\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt <span class="token operator">&gt;</span> number.txt
$ <span class="token function">cat</span> number.txt
$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\uFF0C\u7ADF\u7136\u5C06number\u6E05\u7A7A\u4E86\u3002\u5C31\u5728\u8FD9\u4E2A\u65F6\u5019\uFF0C-o\u9009\u9879\u51FA\u73B0\u4E86\uFF0C\u5B83\u6210\u529F\u7684\u89E3\u51B3\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u8BA9\u4F60\u653E\u5FC3\u7684\u5C06\u7ED3\u679C\u5199\u5165\u539F\u6587\u4EF6\u3002\u8FD9\u6216\u8BB8\u4E5F\u662F-o\u6BD4\u91CD\u5B9A\u5411\u7684\u552F\u4E00\u4F18\u52BF\u6240\u5728\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">cat</span> number.txt
<span class="token number">1</span>
<span class="token number">3</span>
<span class="token number">5</span>
<span class="token number">2</span>
<span class="token number">4</span>
$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt <span class="token parameter variable">-o</span> number.txt
$ <span class="token function">cat</span> number.txt
<span class="token number">5</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-\u793A\u4F8B5-sort\u7684-n\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_4-5-\u793A\u4F8B5-sort\u7684-n\u9009\u9879" aria-hidden="true">#</a> 4.5 \u793A\u4F8B5\uFF1Asort\u7684-n\u9009\u9879</h3><p>\u4F60\u6709\u6CA1\u6709\u9047\u5230\u8FC710\u6BD42\u5C0F\u7684\u60C5\u51B5\u3002\u6211\u53CD\u6B63\u9047\u5230\u8FC7\u3002\u51FA\u73B0\u8FD9\u79CD\u60C5\u51B5\u662F\u7531\u4E8E\u6392\u5E8F\u7A0B\u5E8F\u5C06\u8FD9\u4E9B\u6570\u5B57\u6309\u5B57\u7B26\u6765\u6392\u5E8F\u4E86\uFF0C\u6392\u5E8F\u7A0B\u5E8F\u4F1A\u5148\u6BD4\u8F831\u548C2\uFF0C\u663E\u71361\u5C0F\uFF0C\u6240\u4EE5\u5C31\u5C0610\u653E\u57282\u524D\u9762\u55BD\u3002\u8FD9\u4E5F\u662Fsort\u7684\u4E00\u8D2F\u4F5C\u98CE\u3002\u6211\u4EEC\u5982\u679C\u60F3\u6539\u53D8\u8FD9\u79CD\u73B0\u72B6\uFF0C\u5C31\u8981\u4F7F\u7528-n\u9009\u9879\uFF0C\u6765\u544A\u8BC9sort\uFF0C\u201C\u8981\u4EE5\u6570\u503C\u6765\u6392\u5E8F\u201D\uFF01</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> number.txt
<span class="token number">1</span>
<span class="token number">10</span>
<span class="token number">19</span>
<span class="token number">11</span>
<span class="token number">2</span>
<span class="token number">5</span>
$ <span class="token function">sort</span> number.txt
<span class="token number">1</span>
<span class="token number">10</span>
<span class="token number">11</span>
<span class="token number">19</span>
<span class="token number">2</span>
<span class="token number">5</span>
$ <span class="token function">sort</span> <span class="token parameter variable">-n</span> number.txt
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">5</span>
<span class="token number">10</span>
<span class="token number">11</span>
<span class="token number">19</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-\u793A\u4F8B6-sort\u7684-t\u9009\u9879\u548C-k\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_4-6-\u793A\u4F8B6-sort\u7684-t\u9009\u9879\u548C-k\u9009\u9879" aria-hidden="true">#</a> 4.6 \u793A\u4F8B6\uFF1A sort\u7684-t\u9009\u9879\u548C-k\u9009\u9879</h3><p>\u5982\u679C\u6709\u4E00\u4E2A\u6587\u4EF6\u7684\u5185\u5BB9\u662F\u8FD9\u6837\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ cat facebook.txt
banana:30:5.5
apple:10:2.5
pear:90:2.3
orange:20:3.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u6587\u4EF6\u6709\u4E09\u5217\uFF0C\u5217\u4E0E\u5217\u4E4B\u95F4\u7528\u5192\u53F7\u9694\u5F00\u4E86\uFF0C\u7B2C\u4E00\u5217\u8868\u793A\u6C34\u679C\u7C7B\u578B\uFF0C\u7B2C\u4E8C\u5217\u8868\u793A\u6C34\u679C\u6570\u91CF\uFF0C\u7B2C\u4E09\u5217\u8868\u793A\u6C34\u679C\u4EF7\u683C\u3002\u90A3\u4E48\u6211\u60F3\u4EE5\u6C34\u679C\u6570\u91CF\u6765\u6392\u5E8F\uFF0C\u4E5F\u5C31\u662F\u4EE5\u7B2C\u4E8C\u5217\u6765\u6392\u5E8F\uFF0C\u5982\u4F55\u5229\u7528sort\u5B9E\u73B0\uFF1F\u5E78\u597D\uFF0Csort\u63D0\u4F9B\u4E86-t\u9009\u9879\uFF0C\u540E\u9762\u53EF\u4EE5\u8BBE\u5B9A\u95F4\u9694\u7B26\u3002\u6307\u5B9A\u4E86\u95F4\u9694\u7B26\u4E4B\u540E\uFF0C\u5C31\u53EF\u4EE5\u7528-k\u6765\u6307\u5B9A\u5217\u6570\u4E86\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ sort -n -k 2 -t \u2018:\u2019 facebook.txt
apple:10:2.5
orange:20:3.4
banana:30:5.5
pear:90:2.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-\u5176\u4ED6\u7684sort\u5E38\u7528\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_5-\u5176\u4ED6\u7684sort\u5E38\u7528\u9009\u9879" aria-hidden="true">#</a> 5 \u5176\u4ED6\u7684sort\u5E38\u7528\u9009\u9879</h2><ul><li>-f \u4F1A\u5C06\u5C0F\u5199\u5B57\u6BCD\u90FD\u8F6C\u6362\u4E3A\u5927\u5199\u5B57\u6BCD\u6765\u8FDB\u884C\u6BD4\u8F83\uFF0C\u4EA6\u5373\u5FFD\u7565\u5927\u5C0F\u5199</li><li>-c \u4F1A\u68C0\u67E5\u6587\u4EF6\u662F\u5426\u5DF2\u6392\u597D\u5E8F\uFF0C\u5982\u679C\u4E71\u5E8F\uFF0C\u5219\u8F93\u51FA\u7B2C\u4E00\u4E2A\u4E71\u5E8F\u7684\u884C\u7684\u76F8\u5173\u4FE1\u606F\uFF0C\u6700\u540E\u8FD4\u56DE1</li><li>-C \u4F1A\u68C0\u67E5\u6587\u4EF6\u662F\u5426\u5DF2\u6392\u597D\u5E8F\uFF0C\u5982\u679C\u4E71\u5E8F\uFF0C\u4E0D\u8F93\u51FA\u5185\u5BB9\uFF0C\u4EC5\u8FD4\u56DE1</li><li>-M \u4F1A\u4EE5\u6708\u4EFD\u6765\u6392\u5E8F\uFF0C\u6BD4\u5982JAN\u5C0F\u4E8EFEB\u7B49\u7B49</li><li>-b \u4F1A\u5FFD\u7565\u6BCF\u4E00\u884C\u524D\u9762\u7684\u6240\u6709\u7A7A\u767D\u90E8\u5206\uFF0C\u4ECE\u7B2C\u4E00\u4E2A\u53EF\u89C1\u5B57\u7B26\u5F00\u59CB\u6BD4\u8F83\u3002</li></ul>`,37),r=[l];function d(t,c){return s(),e("div",null,r)}const p=n(i,[["render",d],["__file","linux-k-sort.html.vue"]]);export{p as default};
