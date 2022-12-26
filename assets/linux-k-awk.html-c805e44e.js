import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const i={},l=e(`<h1 id="awk强大的文本分析命令" tabindex="-1"><a class="header-anchor" href="#awk强大的文本分析命令" aria-hidden="true">#</a> awk强大的文本分析命令</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1 简介</h2><p>awk是一个强大的文本分析工具，相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时，显得尤为强大。简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。</p><h2 id="_2-语法" tabindex="-1"><a class="header-anchor" href="#_2-语法" aria-hidden="true">#</a> 2 语法</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{pattern + action}&#39;</span> <span class="token punctuation">{</span>filenames<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尽管操作可能会很复杂，但语法总是这样，其中 pattern 表示 AWK 在数据中查找的内容，而 action 是在找到匹配内容时所执行的一系列命令。花括号（{}）不需要在程序中始终出现，但它们用于根据特定的模式对一系列指令进行分组。 pattern就是要表示的正则表达式，用斜杠括起来。</p><p>awk语言的最基本功能是在文件或者字符串中基于指定规则浏览和抽取信息，awk抽取信息后，才能进行其他文本操作。完整的awk脚本通常用来格式化文本文件中的信息。</p><p>通常，awk是以文件的一行为处理单位的。awk每接收文件的一行，然后执行相应的命令，来处理文本。</p><h2 id="_3-awk入门" tabindex="-1"><a class="header-anchor" href="#_3-awk入门" aria-hidden="true">#</a> 3 awk入门</h2><p>假设last -n 5的输出如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment">#  last -n 5 # 仅取出前五行</span>
root     pts/3        <span class="token number">223.104</span>.6.18     Thu Apr <span class="token number">21</span> <span class="token number">17</span>:22   still logged <span class="token keyword">in</span>   
root     pts/2        <span class="token number">223.104</span>.6.18     Thu Apr <span class="token number">21</span> <span class="token number">17</span>:22   still logged <span class="token keyword">in</span>   
root     pts/3        <span class="token number">223.104</span>.6.18     Thu Apr <span class="token number">21</span> <span class="token number">16</span>:30 - <span class="token number">17</span>:13  <span class="token punctuation">(</span>00:43<span class="token punctuation">)</span>    
root     pts/2        <span class="token number">223.104</span>.6.18     Thu Apr <span class="token number">21</span> <span class="token number">16</span>:30 - <span class="token number">17</span>:13  <span class="token punctuation">(</span>00:43<span class="token punctuation">)</span>    
root     pts/3        <span class="token number">223.104</span>.6.12     Tue Apr <span class="token number">19</span> <span class="token number">17</span>:35 - <span class="token number">17</span>:52  <span class="token punctuation">(</span>00:17<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只是显示最近登录的5个帐号：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># last -n 5 | awk  &#39;{print $1}&#39;</span>
root
root
root
root
root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>awk工作流程是这样的：读入有&#39;\\n&#39;换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，0则表示所有域,0则表示所有域,1表示第一个域,𝑛表示第𝑛个域。默认域分隔符是&quot;空白键&quot;或&quot;[𝑡𝑎𝑏]键&quot;,所以n表示第n个域。默认域分隔符是&quot;空白键&quot;或&quot;[tab]键&quot;,所以1表示登录用户，$3表示登录用户ip,以此类推。</p><p>如果只是显示/etc/passwd的账户：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd |awk  -F &#39;:&#39;  &#39;{print $1}&#39;  </span>
root
bin
daemon
adm
lp
<span class="token function">sync</span>
<span class="token function">shutdown</span>
<span class="token function">halt</span>
mail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种是awk+action的示例，每行都会执行action{print $1}。</p><p><strong>-F指定域分隔符为&#39;:&#39;。</strong></p><p>如果只是显示/etc/passwd的账户和账户对应的shell,而账户与shell之间以tab键分割：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd |awk  -F &#39;:&#39;  &#39;{print $1&quot;\\t&quot;$7}&#39;</span>
root    /bin/bash
bin     /sbin/nologin
daemon  /sbin/nologin
adm     /sbin/nologin

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只是显示/etc/passwd的账户和账户对应的shell,而账户与shell之间以逗号分割,而且在所有行添加列名name,shell,在最后一行添加&quot;blue,/bin/nosh&quot;：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd |awk  -F &#39;:&#39;  &#39;BEGIN {print &quot;name,shell&quot;}  {print $1&quot;,&quot;$7} END {print &quot;blue,/bin/nosh&quot;}&#39;</span>
name,shell
root,/bin/bash
bin,/sbin/nologin
daemon,/sbin/nologin
adm,/sbin/nologin
lp,/sbin/nologin
sync,/bin/sync

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>awk工作流程是这样的：先执行BEGING，然后读取文件，读入有/n换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，0则表示所有域,0则表示所有域,1表示第一个域,$n表示第n个域,随后开始执行模式所对应的动作action。接着开始读入第二条记录······直到所有的记录都读完，最后执行END操作。</p><p>搜索/etc/passwd有root关键字的所有行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># awk -F: &#39;/root/{print $7}&#39; /etc/passwd   </span>
/bin/bash
/sbin/nologin

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里指定了action{print $7}。</p><h2 id="_4-awk-进阶" tabindex="-1"><a class="header-anchor" href="#_4-awk-进阶" aria-hidden="true">#</a> 4 awk 进阶</h2><h3 id="_4-1-内置变量" tabindex="-1"><a class="header-anchor" href="#_4-1-内置变量" aria-hidden="true">#</a> 4.1 内置变量</h3><p>awk有许多内置变量用来设置环境信息，这些变量可以被改变，下面给出了最常用的一些变量。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ARGC               命令行参数个数
ARGV               命令行参数排列
ENVIRON            支持队列中系统环境变量的使用
FILENAME           awk浏览的文件名
FNR                浏览文件的记录数
FS                 设置输入域分隔符，等价于命令行 -F选项
NF                 浏览记录的域的个数
NR                 已读的记录数
OFS                输出域分隔符
ORS                输出记录分隔符
RS                 控制记录分隔符
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外,0变量是指整条记录。0变量是指整条记录。1表示当前行的第一个域,$2表示当前行的第二个域,......以此类推。</p><p>统计/etc/passwd:文件名，每行的行号，每行的列数，对应的完整行内容:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># awk  -F &#39;:&#39;  &#39;{print &quot;filename:&quot; FILENAME &quot;,linenumber:&quot; NR &quot;,columns:&quot; NF &quot;,linecontent:&quot;$0}&#39; /etc/passwd</span>
filename:/etc/passwd,linenumber:1,columns:7,linecontent:root:x:0:0:root:/root:/bin/bash
filename:/etc/passwd,linenumber:2,columns:7,linecontent:bin:x:1:1:bin:/bin:/sbin/nologin
filename:/etc/passwd,linenumber:3,columns:7,linecontent:daemon:x:2:2:daemon:/sbin:/sbin/nologin
filename:/etc/passwd,linenumber:4,columns:7,linecontent:adm:x:3:4:adm:/var/adm:/sbin/nologin
filename:/etc/passwd,linenumber:5,columns:7,linecontent:lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
filename:/etc/passwd,linenumber:6,columns:7,linecontent:sync:x:5:0:sync:/sbin:/bin/sync

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-变量和赋值" tabindex="-1"><a class="header-anchor" href="#_4-2-变量和赋值" aria-hidden="true">#</a> 4.2 变量和赋值</h3><p>除了awk的内置变量，awk还可以自定义变量。</p><p>下面统计/etc/passwd的账户人数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{count++;print $0;} END{print &quot;user count is &quot;, count}&#39;</span> /etc/passwd
root:x:0:0:root:/root:/bin/bash
<span class="token punctuation">..</span>.
user count is  <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>count是自定义变量。之前的action{}里都是只有一个print,其实print只是一个语句，而action{}可以有多个语句，以;号隔开。</p><p>这里没有初始化count，虽然默认是0，但是妥当的做法还是初始化为0:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;BEGIN {count=0;print &quot;[start]user count is &quot;, count} {count=count+1;print $0;} END{print &quot;[end]user count is &quot;, count}&#39;</span> /etc/passwd
<span class="token punctuation">[</span>start<span class="token punctuation">]</span>user count is  <span class="token number">0</span>
root:x:0:0:root:/root:/bin/bash
<span class="token punctuation">..</span>.
nexus:x:1001:1001::/home/nexus:/bin/bash
<span class="token punctuation">[</span>end<span class="token punctuation">]</span>user count is  <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-条件语句" tabindex="-1"><a class="header-anchor" href="#_4-3-条件语句" aria-hidden="true">#</a> 4.3 条件语句</h3><p>awk中的条件语句是从C语言中借鉴来的，用法与C语言一致。</p><p>统计某个文件夹下的文件占用的字节数,过滤4096大小的文件(一般都是文件夹):</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#ls -l |awk &#39;BEGIN {size=0;print &quot;[start]size is &quot;, size} {if($5!=4096){size=size+$5;}} END{print &quot;[end]size is &quot;, size/1024/1024,&quot;M&quot;}&#39; </span>
<span class="token punctuation">[</span>end<span class="token punctuation">]</span>size is  <span class="token number">8.22339</span> M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-循环语句" tabindex="-1"><a class="header-anchor" href="#_4-4-循环语句" aria-hidden="true">#</a> 4.4 循环语句</h3><p>awk中的循环语句同样借鉴于C语言，支持while、do/while、for、break、continue，这些关键字的语义和C语言中的语义完全相同。</p><h3 id="_4-5-数组" tabindex="-1"><a class="header-anchor" href="#_4-5-数组" aria-hidden="true">#</a> 4.5 数组</h3><p>因为awk中数组的下标可以是数字和字母，数组的下标通常被称为关键字(key)。值和关键字都存储在内部的一张针对key/value应用hash的表格里。由于hash不是顺序存储，因此在显示数组内容时会发现，它们并不是按照你预料的顺序显示出来的。数组和变量一样，都是在使用时自动创建的，awk也同样会自动判断其存储的是数字还是字符串。一般而言，awk中的数组用来从记录中收集信息，可以用于计算总和、统计单词以及跟踪模板被匹配的次数等等。</p><p>显示/etc/passwd的账户：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#awk -F &#39;:&#39; &#39;BEGIN {count=0;} {name[count] = $1;count++;}; END{for (i = 0; i &lt; NR; i++) print i, name[i]}&#39; /etc/passwd</span>
<span class="token number">0</span> root
<span class="token number">1</span> daemon
<span class="token number">2</span> bin
<span class="token number">3</span> sys
<span class="token number">4</span> <span class="token function">sync</span>
<span class="token number">5</span> games
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用for循环遍历数组。</p>`,51),t=[l];function d(c,o){return s(),a("div",null,t)}const p=n(i,[["render",d],["__file","linux-k-awk.html.vue"]]);export{p as default};
