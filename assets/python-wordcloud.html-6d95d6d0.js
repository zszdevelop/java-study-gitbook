import{_ as s,W as a,X as l,Y as e,Z as n,$ as d,a0 as t,D as o}from"./framework-0cf5f349.js";const r={},c=e("h1",{id:"wordcloud入门",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#wordcloud入门","aria-hidden":"true"},"#"),n(" wordcloud入门")],-1),u=e("h2",{id:"_1-简介",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-简介","aria-hidden":"true"},"#"),n(" 1. 简介")],-1),v=e("p",null,"基于Python的词云生成类库,很好用,而且功能强大。可以根据文本的词条内容划分出词组的",-1),m={href:"https://github.com/amueller/word_cloud",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>效果如下：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210204151203285.png" alt="image-20210204151203285" tabindex="0" loading="lazy"><figcaption>image-20210204151203285</figcaption></figure><h2 id="_2-集成使用" tabindex="-1"><a class="header-anchor" href="#_2-集成使用" aria-hidden="true">#</a> 2. 集成使用</h2><p>可以参考官网的simple</p><blockquote><p>解决中文乱码问题，手动指定字体</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>font = r&#39;C:\\Windows\\Fonts\\simfang.ttf&#39;
WordCloud( font_path=font
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-

from wordcloud import WordCloud
import matplotlib.pyplot as plt

text = &#39;&#39;&#39;文案 文案
The  抱抱 Zen of LOVE 抱抱 Python, 快乐 by Tim Peters
公众号 公众号 Python 最好的 语言 语言
一辈子 is better LOVE than 一辈子.
喵小姐 is 爱你 than  implicit.爱你 喵小姐
蟹先生 is 爱你 than complex.
一辈子 is 蟹先生  than complicated.
二中 is 喵小姐 我想你了 than nested. 二中 蟹先生
清湖 is 胜于 than 清湖.
思旺 counts. 想你
Special 喵小姐 我想你了 aren&#39;t special enough 思旺 break 思旺 rules.
别生气 practicality beats 厨艺好.
Errors should 我想你了 never pass 小龙虾 silently. 运营
别生气 explicitly 好不好. LOVE
In the face of ambiguity, 程序员 the 厨艺好 to guess.龙华 龙华
There 快乐 should be one-- 我想你了 and preferably 红烧肉 only one 小龙虾--obvious way to do it.运营
Although 共享单车 way may not 我想你了 be obvious at first unless you&#39;re Dutch. 新媒体 地铁
Now is better 红烧肉 than never.
程序员 Although 共享单车 is often 高铁 than 东莞 now. 高铁 地铁
If the implementation 想你 is hard to explain, it&#39;s a bad idea. 想你了
If 成都 implementation is 想你 easy to explain, it may be a good idea.
Namespaces are 端午one 端午 honking great idea -- 成都 do more of those! 想你了
深圳 晚安 深圳 新媒体
&#39;&#39;&#39;

# the font from github: https://github.com/adobe-fonts
font = r&#39;C:\\Windows\\Fonts\\simfang.ttf&#39;
wc = WordCloud(collocations=False, font_path=font, width=1400, height=1400, margin=2).generate(text.lower())

plt.imshow(wc)
plt.axis(&quot;off&quot;)
plt.show()

wc.to_file(&#39;show_Chinese.png&#39;)  # 把词云保存下来
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function h(p,g){const i=o("ExternalLinkIcon");return a(),l("div",null,[c,u,v,e("p",null,[n("github: "),e("a",m,[n("https://github.com/amueller/word_cloud"),d(i)])]),b])}const _=s(r,[["render",h],["__file","python-wordcloud.html.vue"]]);export{_ as default};
