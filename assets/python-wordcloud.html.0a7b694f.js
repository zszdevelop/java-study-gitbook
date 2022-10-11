import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as d,a as e,b as t,d as n,e as a,r as o}from"./app.f305e04f.js";const r={},c=e("h1",{id:"wordcloud\u5165\u95E8",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#wordcloud\u5165\u95E8","aria-hidden":"true"},"#"),n(" wordcloud\u5165\u95E8")],-1),u=e("h2",{id:"_1-\u7B80\u4ECB",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-\u7B80\u4ECB","aria-hidden":"true"},"#"),n(" 1. \u7B80\u4ECB")],-1),v=e("p",null,"\u57FA\u4E8EPython\u7684\u8BCD\u4E91\u751F\u6210\u7C7B\u5E93,\u5F88\u597D\u7528,\u800C\u4E14\u529F\u80FD\u5F3A\u5927\u3002\u53EF\u4EE5\u6839\u636E\u6587\u672C\u7684\u8BCD\u6761\u5185\u5BB9\u5212\u5206\u51FA\u8BCD\u7EC4\u7684",-1),m=n("github: "),h={href:"https://github.com/amueller/word_cloud",target:"_blank",rel:"noopener noreferrer"},b=n("https://github.com/amueller/word_cloud"),p=a(`<p>\u6548\u679C\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210204151203285.png" alt="image-20210204151203285" loading="lazy"></p><h2 id="_2-\u96C6\u6210\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_2-\u96C6\u6210\u4F7F\u7528" aria-hidden="true">#</a> 2. \u96C6\u6210\u4F7F\u7528</h2><p>\u53EF\u4EE5\u53C2\u8003\u5B98\u7F51\u7684simple</p><blockquote><p>\u89E3\u51B3\u4E2D\u6587\u4E71\u7801\u95EE\u9898\uFF0C\u624B\u52A8\u6307\u5B9A\u5B57\u4F53</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>font = r&#39;C:\\Windows\\Fonts\\simfang.ttf&#39;
WordCloud( font_path=font
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># -*- coding: utf-8 -*-

from wordcloud import WordCloud
import matplotlib.pyplot as plt

text = &#39;&#39;&#39;\u6587\u6848 \u6587\u6848
The  \u62B1\u62B1 Zen of LOVE \u62B1\u62B1 Python, \u5FEB\u4E50 by Tim Peters
\u516C\u4F17\u53F7 \u516C\u4F17\u53F7 Python \u6700\u597D\u7684 \u8BED\u8A00 \u8BED\u8A00
\u4E00\u8F88\u5B50 is better LOVE than \u4E00\u8F88\u5B50.
\u55B5\u5C0F\u59D0 is \u7231\u4F60 than  implicit.\u7231\u4F60 \u55B5\u5C0F\u59D0
\u87F9\u5148\u751F is \u7231\u4F60 than complex.
\u4E00\u8F88\u5B50 is \u87F9\u5148\u751F  than complicated.
\u4E8C\u4E2D is \u55B5\u5C0F\u59D0 \u6211\u60F3\u4F60\u4E86 than nested. \u4E8C\u4E2D \u87F9\u5148\u751F
\u6E05\u6E56 is \u80DC\u4E8E than \u6E05\u6E56.
\u601D\u65FA counts. \u60F3\u4F60
Special \u55B5\u5C0F\u59D0 \u6211\u60F3\u4F60\u4E86 aren&#39;t special enough \u601D\u65FA break \u601D\u65FA rules.
\u522B\u751F\u6C14 practicality beats \u53A8\u827A\u597D.
Errors should \u6211\u60F3\u4F60\u4E86 never pass \u5C0F\u9F99\u867E silently. \u8FD0\u8425
\u522B\u751F\u6C14 explicitly \u597D\u4E0D\u597D. LOVE
In the face of ambiguity, \u7A0B\u5E8F\u5458 the \u53A8\u827A\u597D to guess.\u9F99\u534E \u9F99\u534E
There \u5FEB\u4E50 should be one-- \u6211\u60F3\u4F60\u4E86 and preferably \u7EA2\u70E7\u8089 only one \u5C0F\u9F99\u867E--obvious way to do it.\u8FD0\u8425
Although \u5171\u4EAB\u5355\u8F66 way may not \u6211\u60F3\u4F60\u4E86 be obvious at first unless you&#39;re Dutch. \u65B0\u5A92\u4F53 \u5730\u94C1
Now is better \u7EA2\u70E7\u8089 than never.
\u7A0B\u5E8F\u5458 Although \u5171\u4EAB\u5355\u8F66 is often \u9AD8\u94C1 than \u4E1C\u839E now. \u9AD8\u94C1 \u5730\u94C1
If the implementation \u60F3\u4F60 is hard to explain, it&#39;s a bad idea. \u60F3\u4F60\u4E86
If \u6210\u90FD implementation is \u60F3\u4F60 easy to explain, it may be a good idea.
Namespaces are \u7AEF\u5348one \u7AEF\u5348 honking great idea -- \u6210\u90FD do more of those! \u60F3\u4F60\u4E86
\u6DF1\u5733 \u665A\u5B89 \u6DF1\u5733 \u65B0\u5A92\u4F53
&#39;&#39;&#39;

# the font from github: https://github.com/adobe-fonts
font = r&#39;C:\\Windows\\Fonts\\simfang.ttf&#39;
wc = WordCloud(collocations=False, font_path=font, width=1400, height=1400, margin=2).generate(text.lower())

plt.imshow(wc)
plt.axis(&quot;off&quot;)
plt.show()

wc.to_file(&#39;show_Chinese.png&#39;)  # \u628A\u8BCD\u4E91\u4FDD\u5B58\u4E0B\u6765
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function f(g,_){const i=o("ExternalLinkIcon");return l(),d("div",null,[c,u,v,e("p",null,[m,e("a",h,[b,t(i)])]),p])}const y=s(r,[["render",f],["__file","python-wordcloud.html.vue"]]);export{y as default};
