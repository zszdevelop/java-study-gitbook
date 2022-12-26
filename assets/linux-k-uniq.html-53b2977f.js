import{_ as e,W as n,X as s,a0 as a}from"./framework-0cf5f349.js";const i={},l=a(`<h1 id="uniq去重命令" tabindex="-1"><a class="header-anchor" href="#uniq去重命令" aria-hidden="true">#</a> uniq去重命令</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1 简介</h2><p>uniq命令可以去除排序过的文件中的重复行</p><blockquote><p>因此uniq经常和sort合用。也就是说，为了使uniq起作用，所有的重复行必须是相邻的。</p></blockquote><h2 id="_2-简介" tabindex="-1"><a class="header-anchor" href="#_2-简介" aria-hidden="true">#</a> 2 简介</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">uniq</span> <span class="token punctuation">[</span>-icu<span class="token punctuation">]</span>
选项与参数：
<span class="token parameter variable">-i</span>   ：忽略大小写字符的不同；
<span class="token parameter variable">-c</span>  ：进行计数
<span class="token parameter variable">-u</span>  ：只显示唯一的行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-uniq-使用" tabindex="-1"><a class="header-anchor" href="#_3-uniq-使用" aria-hidden="true">#</a> 3 uniq 使用</h2><p>testfile的内容如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat testfile</span>
hello
world
friend
hello
world
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接删除未经排序的文件，将会发现没有任何行被删除:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#uniq testfile  </span>
hello
world
friend
hello
world
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>排序文件，默认是去重:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#cat words | sort |uniq</span>
friend
hello
world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>排序之后删除了重复行，同时在行首位置输出该行重复的次数:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#sort testfile | uniq -c</span>
<span class="token number">1</span> friend
<span class="token number">3</span> hello
<span class="token number">2</span> world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>仅显示存在重复的行，并在行首显示该行重复的次数:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#sort testfile | uniq -dc</span>
<span class="token number">3</span> hello
<span class="token number">2</span> world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>仅显示不重复的行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#sort testfile | uniq -u</span>
friend 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,19),d=[l];function r(c,u){return n(),s("div",null,d)}const v=e(i,[["render",r],["__file","linux-k-uniq.html.vue"]]);export{v as default};
