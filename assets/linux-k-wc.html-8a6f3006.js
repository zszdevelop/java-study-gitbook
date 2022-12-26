import{_ as e,W as a,X as d,a0 as i}from"./framework-0cf5f349.js";const s={},c=i(`<h1 id="wc统计命令" tabindex="-1"><a class="header-anchor" href="#wc统计命令" aria-hidden="true">#</a> wc统计命令</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1 简介</h2><p>统计文件里面有多少单词，多少行，多少字符。</p><h2 id="_2-wc语法" tabindex="-1"><a class="header-anchor" href="#_2-wc语法" aria-hidden="true">#</a> 2 wc语法</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> wc [-lwm]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数： -l ：仅列出行； -w ：仅列出多少字(英文单字)； -m ：多少字符；</p><h2 id="_3-wc使用" tabindex="-1"><a class="header-anchor" href="#_3-wc使用" aria-hidden="true">#</a> 3 wc使用</h2><div class="language-bach line-numbers-mode" data-ext="bach"><pre class="language-bach"><code>wc /etc/passwd
25   35 1095 /etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>258是行数，462是单词数，6919是字节数</p><p>wc的命令比较简单使用，每个参数使用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#wc -l /etc/passwd   #统计行数，在对记录数时，很常用
/etc/passwd       #表示系统有40个账户
#wc -w /etc/passwd  #统计单词出现次数
/etc/passwd
#wc -m /etc/passwd  #统计文件的字节数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2>`,12),n=[c];function r(t,l){return a(),d("div",null,n)}const u=e(s,[["render",r],["__file","linux-k-wc.html.vue"]]);export{u as default};
