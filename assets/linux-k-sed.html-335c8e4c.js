import{_ as e,W as a,X as n,a0 as s}from"./framework-0cf5f349.js";const i={},d=s(`<h1 id="sed替换-查找-删除命令" tabindex="-1"><a class="header-anchor" href="#sed替换-查找-删除命令" aria-hidden="true">#</a> sed替换/查找/删除命令</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1 简介</h2><p>sed是一个很好的文件处理工具，本身是一个管道命令，主要是以行为单位进行处理，可以将数据行进行替换、删除、新增、选取等特定工作</p><h2 id="_2-sed-语法" tabindex="-1"><a class="header-anchor" href="#_2-sed-语法" aria-hidden="true">#</a> 2 sed 语法</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sed [-nefri] ‘command’ 输入文本 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-常用选项" tabindex="-1"><a class="header-anchor" href="#_3-常用选项" aria-hidden="true">#</a> 3 常用选项</h2><ul><li>-n∶使用安静(silent)模式。在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到萤幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。</li><li>-e∶直接在指令列模式上进行 sed 的动作编辑；</li><li>-f∶直接将 sed 的动作写在一个档案内， -f filename 则可以执行 filename 内的sed 动作；</li><li>-r∶sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)</li><li>-i∶直接修改读取的档案内容，而不是由萤幕输出。</li></ul><h2 id="_4-常用命令" tabindex="-1"><a class="header-anchor" href="#_4-常用命令" aria-hidden="true">#</a> 4 <strong>常用命令</strong></h2><ul><li>a ∶新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～</li><li>c ∶取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！</li><li>d ∶删除，因为是删除啊，所以 d 后面通常不接任何咚咚；</li><li>i ∶插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；</li><li>p ∶列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～</li><li>s ∶取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！</li></ul><h2 id="_5-示例" tabindex="-1"><a class="header-anchor" href="#_5-示例" aria-hidden="true">#</a> 5 示例</h2><p>假设我们有一文件名为my.txt。内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hello!
welcome to my blog.
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-删除某行" tabindex="-1"><a class="header-anchor" href="#_5-1-删除某行" aria-hidden="true">#</a> 5.1 删除某行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># sed &#39;1d&#39; my.txt              #删除第一行 </span>
<span class="token comment"># sed &#39;$d&#39; my.txt              #删除最后一行</span>
<span class="token comment"># sed &#39;1,2d&#39; my.txt           #删除第一行到第二行</span>
<span class="token comment"># sed &#39;2,$d&#39; my.txt           #删除第二行到最后一行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-显示某行" tabindex="-1"><a class="header-anchor" href="#_5-2-显示某行" aria-hidden="true">#</a> 5.2 显示某行：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># sed -n &#39;1p&#39; my.txt           #显示第一行 </span>
<span class="token comment"># sed -n &#39;$p&#39; my.txt           #显示最后一行</span>
<span class="token comment"># sed -n &#39;1,2p&#39; my.txt        #显示第一行到第二行</span>
<span class="token comment"># sed -n &#39;2,$p&#39; my.txt        #显示第二行到最后一行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-使用模式进行查询" tabindex="-1"><a class="header-anchor" href="#_5-3-使用模式进行查询" aria-hidden="true">#</a> 5.3 使用模式进行查询：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># sed -n &#39;/blog/p&#39; my.txt    #查询包括关键字blog所在所有行</span>
<span class="token comment"># sed -n &#39;/\\$/p&#39; my.txt        #查询包括关键字$所在所有行，使用反斜线\\屏蔽特殊含义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-增加一行或多行字符串" tabindex="-1"><a class="header-anchor" href="#_5-4-增加一行或多行字符串" aria-hidden="true">#</a> 5.4 增加一行或多行字符串：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat my.txt</span>
     Hello<span class="token operator">!</span>
     ruby is me,welcome to my blog.
     end
<span class="token comment"># sed &#39;1a drink tea&#39; my.txt  #第一行后增加字符串&quot;drink tea&quot;</span>
     Hello<span class="token operator">!</span>
     drink tea
     ruby is me,welcome to my blog. 
     end
<span class="token comment"># sed &#39;1,3a drink tea&#39; my.txt #第一行到第三行后增加字符串&quot;drink tea&quot;</span>
     Hello<span class="token operator">!</span>
     drink tea
     ruby is me,welcome to my blog.
     drink tea
     end
     drink tea
<span class="token comment"># sed &#39;1a drink tea\\nor coffee&#39; my.txt   #第一行后增加多行，使用换行符\\n</span>
     Hello<span class="token operator">!</span>
     drink tea
     or coffee
     ruby is me,welcome to my blog.
     end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-删除匹配行" tabindex="-1"><a class="header-anchor" href="#_5-5-删除匹配行" aria-hidden="true">#</a> 5.5 删除匹配行：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/匹配字符串/d&#39;</span>  filename  （注：若匹配字符串是变量，则需要“”，而不是‘’。记得好像是）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-6-替换匹配行中的某个字符串" tabindex="-1"><a class="header-anchor" href="#_5-6-替换匹配行中的某个字符串" aria-hidden="true">#</a> 5.6 替换匹配行中的某个字符串：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/匹配字符串/s/替换源字符串/替换目标字符串/g&#39;</span> filename
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2>`,25),l=[d];function r(t,c){return a(),n("div",null,l)}const m=e(i,[["render",r],["__file","linux-k-sed.html.vue"]]);export{m as default};
