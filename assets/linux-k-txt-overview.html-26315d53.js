import{_ as a,W as e,X as i,Y as n,Z as l,$ as d,a0 as t,D as c}from"./framework-0cf5f349.js";const r={},u=t(`<h1 id="linux文本操作命令汇总" tabindex="-1"><a class="header-anchor" href="#linux文本操作命令汇总" aria-hidden="true">#</a> Linux文本操作命令汇总</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>Linux常用文本操作命令，包括wc(统计)、cut(切分)、sort(排序)、uniq(去重)、grep(查找)、sed(替换、插入、删除)、awk(文本分析)。</p><h2 id="_2-sed替换-查找-删除命令" tabindex="-1"><a class="header-anchor" href="#_2-sed替换-查找-删除命令" aria-hidden="true">#</a> 2. sed替换/查找/删除命令</h2><h3 id="_2-1-简介" tabindex="-1"><a class="header-anchor" href="#_2-1-简介" aria-hidden="true">#</a> 2.1 简介</h3><p>sed是一个很好的文件处理工具，本身是一个管道命令，主要是以行为单位进行处理，可以将数据行进行替换、删除、新增、选取等特定工作</p><h3 id="_2-2-sed-语法" tabindex="-1"><a class="header-anchor" href="#_2-2-sed-语法" aria-hidden="true">#</a> 2.2 sed 语法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sed [-nefri] ‘command’ 输入文本 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-常用选项" tabindex="-1"><a class="header-anchor" href="#_2-3-常用选项" aria-hidden="true">#</a> 2.3 常用选项</h3><ul><li>-n∶使用安静(silent)模式。在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到萤幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来。</li><li>-e∶直接在指令列模式上进行 sed 的动作编辑；</li><li>-f∶直接将 sed 的动作写在一个档案内， -f filename 则可以执行 filename 内的sed 动作；</li><li>-r∶sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)</li><li>-i∶直接修改读取的档案内容，而不是由萤幕输出。</li></ul><h3 id="_2-4-常用命令" tabindex="-1"><a class="header-anchor" href="#_2-4-常用命令" aria-hidden="true">#</a> 2.4 <strong>常用命令</strong></h3><ul><li>a ∶新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～</li><li>c ∶取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！</li><li>d ∶删除，因为是删除啊，所以 d 后面通常不接任何咚咚；</li><li>i ∶插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；</li><li>p ∶列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～</li><li>s ∶取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！</li></ul><h3 id="_2-5-示例" tabindex="-1"><a class="header-anchor" href="#_2-5-示例" aria-hidden="true">#</a> 2.5 示例</h3><p>假设我们有一文件名为my.txt。内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hello!
welcome to my blog.
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-1-删除某行" tabindex="-1"><a class="header-anchor" href="#_2-5-1-删除某行" aria-hidden="true">#</a> 2.5.1 删除某行</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># sed &#39;1d&#39; my.txt              #删除第一行 </span>
<span class="token comment"># sed &#39;$d&#39; my.txt              #删除最后一行</span>
<span class="token comment"># sed &#39;1,2d&#39; my.txt           #删除第一行到第二行</span>
<span class="token comment"># sed &#39;2,$d&#39; my.txt           #删除第二行到最后一行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-2-显示某行" tabindex="-1"><a class="header-anchor" href="#_2-5-2-显示某行" aria-hidden="true">#</a> 2.5.2 显示某行：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># sed -n &#39;1p&#39; my.txt           #显示第一行 </span>
<span class="token comment"># sed -n &#39;$p&#39; my.txt           #显示最后一行</span>
<span class="token comment"># sed -n &#39;1,2p&#39; my.txt        #显示第一行到第二行</span>
<span class="token comment"># sed -n &#39;2,$p&#39; my.txt        #显示第二行到最后一行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-3-使用模式进行查询" tabindex="-1"><a class="header-anchor" href="#_2-5-3-使用模式进行查询" aria-hidden="true">#</a> 2.5.3 使用模式进行查询：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># sed -n &#39;/blog/p&#39; my.txt    #查询包括关键字blog所在所有行</span>
<span class="token comment"># sed -n &#39;/\\$/p&#39; my.txt        #查询包括关键字$所在所有行，使用反斜线\\屏蔽特殊含义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-4-增加一行或多行字符串" tabindex="-1"><a class="header-anchor" href="#_2-5-4-增加一行或多行字符串" aria-hidden="true">#</a> 2.5.4 增加一行或多行字符串：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat my.txt</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-5-删除匹配行" tabindex="-1"><a class="header-anchor" href="#_2-5-5-删除匹配行" aria-hidden="true">#</a> 2.5.5 删除匹配行：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/匹配字符串/d&#39;</span>  filename  （注：若匹配字符串是变量，则需要“”，而不是‘’。记得好像是）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-5-6-替换匹配行中的某个字符串" tabindex="-1"><a class="header-anchor" href="#_2-5-6-替换匹配行中的某个字符串" aria-hidden="true">#</a> 2.5.6 替换匹配行中的某个字符串：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/匹配字符串/s/替换源字符串/替换目标字符串/g&#39;</span> filename
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-awk强大的文本分析命令" tabindex="-1"><a class="header-anchor" href="#_3-awk强大的文本分析命令" aria-hidden="true">#</a> 3 awk强大的文本分析命令</h2><h3 id="_3-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-1-简介" aria-hidden="true">#</a> 3.1 简介</h3><p>awk是一个强大的文本分析工具，相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时，显得尤为强大。简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。</p><h3 id="_3-2-语法" tabindex="-1"><a class="header-anchor" href="#_3-2-语法" aria-hidden="true">#</a> 3.2 语法</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{pattern + action}&#39;</span> <span class="token punctuation">{</span>filenames<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尽管操作可能会很复杂，但语法总是这样，其中 pattern 表示 AWK 在数据中查找的内容，而 action 是在找到匹配内容时所执行的一系列命令。花括号（{}）不需要在程序中始终出现，但它们用于根据特定的模式对一系列指令进行分组。 pattern就是要表示的正则表达式，用斜杠括起来。</p><p>awk语言的最基本功能是在文件或者字符串中基于指定规则浏览和抽取信息，awk抽取信息后，才能进行其他文本操作。完整的awk脚本通常用来格式化文本文件中的信息。</p><p>通常，awk是以文件的一行为处理单位的。awk每接收文件的一行，然后执行相应的命令，来处理文本。</p><h3 id="_3-3-awk入门" tabindex="-1"><a class="header-anchor" href="#_3-3-awk入门" aria-hidden="true">#</a> 3.3 awk入门</h3><p>假设last -n 5的输出如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment">#  last -n 5 # 仅取出前五行</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里指定了action{print $7}。</p><h3 id="_3-4-awk-进阶" tabindex="-1"><a class="header-anchor" href="#_3-4-awk-进阶" aria-hidden="true">#</a> 3.4 awk 进阶</h3><h4 id="_3-4-1-内置变量" tabindex="-1"><a class="header-anchor" href="#_3-4-1-内置变量" aria-hidden="true">#</a> 3.4.1 内置变量</h4><p>awk有许多内置变量用来设置环境信息，这些变量可以被改变，下面给出了最常用的一些变量。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ARGC               命令行参数个数
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-2-变量和赋值" tabindex="-1"><a class="header-anchor" href="#_3-4-2-变量和赋值" aria-hidden="true">#</a> 3.4.2 变量和赋值</h4><p>除了awk的内置变量，awk还可以自定义变量。</p><p>下面统计/etc/passwd的账户人数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{count++;print $0;} END{print &quot;user count is &quot;, count}&#39;</span> /etc/passwd
root:x:0:0:root:/root:/bin/bash
<span class="token punctuation">..</span>.
user count is  <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>count是自定义变量。之前的action{}里都是只有一个print,其实print只是一个语句，而action{}可以有多个语句，以;号隔开。</p><p>这里没有初始化count，虽然默认是0，但是妥当的做法还是初始化为0:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;BEGIN {count=0;print &quot;[start]user count is &quot;, count} {count=count+1;print $0;} END{print &quot;[end]user count is &quot;, count}&#39;</span> /etc/passwd
<span class="token punctuation">[</span>start<span class="token punctuation">]</span>user count is  <span class="token number">0</span>
root:x:0:0:root:/root:/bin/bash
<span class="token punctuation">..</span>.
nexus:x:1001:1001::/home/nexus:/bin/bash
<span class="token punctuation">[</span>end<span class="token punctuation">]</span>user count is  <span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-3-条件语句" tabindex="-1"><a class="header-anchor" href="#_3-4-3-条件语句" aria-hidden="true">#</a> 3.4.3 条件语句</h4><p>awk中的条件语句是从C语言中借鉴来的，用法与C语言一致。</p><p>统计某个文件夹下的文件占用的字节数,过滤4096大小的文件(一般都是文件夹):</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#ls -l |awk &#39;BEGIN {size=0;print &quot;[start]size is &quot;, size} {if($5!=4096){size=size+$5;}} END{print &quot;[end]size is &quot;, size/1024/1024,&quot;M&quot;}&#39; </span>
<span class="token punctuation">[</span>end<span class="token punctuation">]</span>size is  <span class="token number">8.22339</span> M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-4-循环语句" tabindex="-1"><a class="header-anchor" href="#_3-4-4-循环语句" aria-hidden="true">#</a> 3.4.4 循环语句</h4><p>awk中的循环语句同样借鉴于C语言，支持while、do/while、for、break、continue，这些关键字的语义和C语言中的语义完全相同。</p><h4 id="_3-4-5-数组" tabindex="-1"><a class="header-anchor" href="#_3-4-5-数组" aria-hidden="true">#</a> 3.4.5 数组</h4><p>因为awk中数组的下标可以是数字和字母，数组的下标通常被称为关键字(key)。值和关键字都存储在内部的一张针对key/value应用hash的表格里。由于hash不是顺序存储，因此在显示数组内容时会发现，它们并不是按照你预料的顺序显示出来的。数组和变量一样，都是在使用时自动创建的，awk也同样会自动判断其存储的是数字还是字符串。一般而言，awk中的数组用来从记录中收集信息，可以用于计算总和、统计单词以及跟踪模板被匹配的次数等等。</p><p>显示/etc/passwd的账户：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#awk -F &#39;:&#39; &#39;BEGIN {count=0;} {name[count] = $1;count++;}; END{for (i = 0; i &lt; NR; i++) print i, name[i]}&#39; /etc/passwd</span>
<span class="token number">0</span> root
<span class="token number">1</span> daemon
<span class="token number">2</span> bin
<span class="token number">3</span> sys
<span class="token number">4</span> <span class="token function">sync</span>
<span class="token number">5</span> games
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用for循环遍历数组。</p><h2 id="_4-wc统计命令" tabindex="-1"><a class="header-anchor" href="#_4-wc统计命令" aria-hidden="true">#</a> 4 wc统计命令</h2><h3 id="_4-1-简介" tabindex="-1"><a class="header-anchor" href="#_4-1-简介" aria-hidden="true">#</a> 4.1 简介</h3><p>统计文件里面有多少单词，多少行，多少字符。</p><h3 id="_4-2-wc语法" tabindex="-1"><a class="header-anchor" href="#_4-2-wc语法" aria-hidden="true">#</a> 4.2 wc语法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> wc [-lwm]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项与参数： -l ：仅列出行； -w ：仅列出多少字(英文单字)； -m ：多少字符；</p><h3 id="_4-3-wc使用" tabindex="-1"><a class="header-anchor" href="#_4-3-wc使用" aria-hidden="true">#</a> 4.3 wc使用</h3><div class="language-bach line-numbers-mode" data-ext="bach"><pre class="language-bach"><code>wc /etc/passwd
25   35 1095 /etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>258是行数，462是单词数，6919是字节数</p><p>wc的命令比较简单使用，每个参数使用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#wc -l /etc/passwd   #统计行数，在对记录数时，很常用
/etc/passwd       #表示系统有40个账户
#wc -w /etc/passwd  #统计单词出现次数
/etc/passwd
#wc -m /etc/passwd  #统计文件的字节数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-cut-切分命令" tabindex="-1"><a class="header-anchor" href="#_5-cut-切分命令" aria-hidden="true">#</a> 5. cut 切分命令</h2><h3 id="_5-1-简介" tabindex="-1"><a class="header-anchor" href="#_5-1-简介" aria-hidden="true">#</a> 5.1 简介</h3><p>cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段写至标准输出。</p><blockquote><p>如果不指定 File 参数，cut 命令将读取标准输入。必须指定 -b、-c 或 -f 标志之一。</p></blockquote><h3 id="_5-2-语法" tabindex="-1"><a class="header-anchor" href="#_5-2-语法" aria-hidden="true">#</a> 5.2 语法</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cut</span>  <span class="token punctuation">[</span>-bn<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span> 或 <span class="token function">cut</span> <span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>  或  <span class="token function">cut</span> <span class="token punctuation">[</span>-df<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-3-参数" tabindex="-1"><a class="header-anchor" href="#_5-3-参数" aria-hidden="true">#</a> 5.3 参数</h3><ul><li>**-b ：**以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了 -n 标志。</li><li>**-c ：**以字符为单位进行分割。</li><li>**-d ：**自定义分隔符，默认为制表符。</li><li>**-f ：**与-d一起使用，指定显示哪个区域。</li><li>**-n ：**取消分割多字节字符。仅和 -b 标志一起使用。如果字符的最后一个字节落在由 -b 标志的 List 参数指示的<br>范围之内，该字符将被写出；否则，该字符将被排除。</li></ul><h3 id="_5-4-如何定位到剪切内容" tabindex="-1"><a class="header-anchor" href="#_5-4-如何定位到剪切内容" aria-hidden="true">#</a> 5.4 如何定位到剪切内容</h3><p>cut命令主要是接受三个定位方法：</p><p>第一，字节（bytes），用选项-b</p><p>第二，字符（characters），用选项-c</p><p>第三，域（fields），用选项-f</p><h4 id="_5-4-1-以-字节-为单位切分" tabindex="-1"><a class="header-anchor" href="#_5-4-1-以-字节-为单位切分" aria-hidden="true">#</a> 5.4.1 <strong>以“字节”为单位切分</strong></h4><p>举个例子吧，当你执行who命令时，会输出类似如下的内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">who</span>
root     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
root     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想提取每一行的第4个字节，就这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>who|cut -b 4
t
t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果“字节”定位中，我想提取第1，第2、第3和第10个字节，怎么办?</strong></p><p>-b支持形如3-5的写法，而且多个定位之间用逗号隔开就成了。看看例子吧：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">who</span><span class="token operator">|</span><span class="token function">cut</span> <span class="token parameter variable">-b</span> <span class="token number">1</span>-3,10
roop
roop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但有一点要注意，cut命令如果使用了-b选项，那么执行此命令时，cut会先把-b后面所有的定位进行从小到大排序，然后再提取。因此这跟我们书写的顺序没有关系。这个例子就可以说明这个问题：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>who|cut -b 10,1-3
roop
roop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_5-4-1-1-还有哪些类似-3-5-这样的小技巧-列举一下吧" tabindex="-1"><a class="header-anchor" href="#_5-4-1-1-还有哪些类似-3-5-这样的小技巧-列举一下吧" aria-hidden="true">#</a> 5.4.1.1　<strong>还有哪些类似“3-5”这样的小技巧，列举一下吧!</strong></h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who|cut -b 3-</span>
ot     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
ot     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who</span>
root     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
root     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who|cut -b -3</span>
roo
roo
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># who|cut -b 3-</span>
ot     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
ot     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想必你也看到了，-3表示从第一个字节到第三个字节，而3-表示从第三个字节到行尾。如果你细心，你可以看到这两种情况下，都包括了第三个字节“c”。如果我执行who|cut -b -3,3-，你觉得会如何呢？答案是输出整行，不会出现连续两个重叠的c的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">who</span><span class="token operator">|</span><span class="token function">cut</span> <span class="token parameter variable">-b</span> -3,3-
root     pts/2        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>
root     pts/3        <span class="token number">2022</span>-04-24 <span class="token number">16</span>:17 <span class="token punctuation">(</span><span class="token number">223.104</span>.6.4<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-4-2-以-字符-为单位切分" tabindex="-1"><a class="header-anchor" href="#_5-4-2-以-字符-为单位切分" aria-hidden="true">#</a> 5.4.2 以&quot;字符&quot;为单位切分</h4><p>下面例子你似曾相识，提取第1，第2，第3和第10个字符：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># who|cut -c 1-3,10</span>
roop
roop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，看着怎么和-b没有什么区别啊？莫非-b和-c作用一样? 其实不然，看似相同，只是因为这个例子举的不好，who输出的都是单字节字符，所以用-b和-c没有区别，如果你提取中文，区别就看出来了，来，看看中文提取的情况：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@iZwz914d1peizv4h7laju4Z ~]# cat cut_ch.txt
星期一
星期二
星期三
星期四
[root@iZwz914d1peizv4h7laju4Z ~]# cut -b 3 cut_ch.txt
�
�
�
�
[root@iZwz914d1peizv4h7laju4Z ~]# cut -c 3 cut_ch.txt
一
二
三
四

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到了吧，用-c则会以字符为单位，输出正常；而-b只会傻傻的以字节（8位二进制位）来计算，输出就是乱码。既然提到了这个知识点，就再补充一句，如果你学有余力，就提高一下。当遇到多字节字符时，可以使用-n选项，-n用于告诉cut不要将多字节字符拆开。</p><blockquote><p>跟文档不太一样</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> cut_ch.txt <span class="token operator">|</span><span class="token function">cut</span> <span class="token parameter variable">-b</span> <span class="token number">2</span>
�
�
�
�
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat cut_ch.txt |cut -nb 2</span>
期
期
期
期
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat cut_ch.txt |cut -nb 1,2,3</span>
星期一
星期二
星期三
星期四

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-4-3-以-域-为单位切分" tabindex="-1"><a class="header-anchor" href="#_5-4-3-以-域-为单位切分" aria-hidden="true">#</a> 5.4.3 以&quot;域&quot;为单位切分</h4><p>为什么会有“域”的提取呢，因为刚才提到的-b和-c只能在固定格式的文档中提取信息，而对于非固定格式的信息则束手无策。这时候“域”就派上用场了。如果你观察过/etc/passwd文件，你会发现，它并不像who的输出信息那样具有固定格式，而是比较零散的排放。但是，冒号在这个文件的每一行中都起到了非常重要的作用，冒号用来隔开每一个项。</p><p>我们很幸运，cut命令提供了这样的提取方式，具体的说就是设置“间隔符”，再设置“提取第几个域”，就OK了！</p><p>以/etc/passwd的前五行内容为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment">#  cat /etc/passwd|head -n 5</span>
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f 1</span>
root
bin
daemon
adm
lp

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到了吧，用-d来设置间隔符为冒号，然后用-f来设置我要取的是第一个域，再按回车，所有的用户名就都列出来了！呵呵 有成就感吧！</p><p>当然，在设定-f时，也可以使用例如3-5或者4-类似的格式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f 1,3-5</span>
root:0:0:root
bin:1:1:bin
daemon:2:2:daemon
adm:3:4:adm
lp:4:7:lp
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f 1,3-5,7</span>
root:0:0:root:/bin/bash
bin:1:1:bin:/sbin/nologin
daemon:2:2:daemon:/sbin/nologin
adm:3:4:adm:/sbin/nologin
lp:4:7:lp:/sbin/nologin
<span class="token punctuation">[</span>root@iZwz914d1peizv4h7laju4Z ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/passwd|head -n 5|cut -d : -f -2</span>
root:x
bin:x
daemon:x
adm:x
lp:x

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-4-4-cut的弊端" tabindex="-1"><a class="header-anchor" href="#_5-4-4-cut的弊端" aria-hidden="true">#</a> 5.4.4 cut的弊端</h4><p><strong>如果遇到空格和制表符时，怎么分辨呢？我觉得有点乱，怎么办？</strong></p><p>有时候制表符确实很难辨认，有一个方法可以看出一段空格到底是由若干个空格组成的还是由一个制表符组成的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat tab_space.txt
this is tab finish.
this is several space      finish.
$ sed -n l tab_space.txt
this is tab\\tfinish.$
this is several space      finish.$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到了吧，如果是制表符（TAB），那么会显示为\\t符号，如果是空格，就会原样显示。通过此方法即可以判断制表符和空格了。注意，上面sed -n后面的字符是L的小写字母哦，不要看错。</p><p><strong>我应该在cut -d中用什么符号来设定制表符或空格呢?</strong></p><p>其实cut的-d选项的默认间隔符就是制表符，所以当你就是要使用制表符的时候，完全就可以省略-d选项，而直接用－f来取域就可以了。如果你设定一个空格为间隔符，那么就这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$cat tab_space.txt |cut -d &#39; &#39; -f 1
this
this
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，两个单引号之间可确实要有一个空格哦，不能偷懒。而且，你只能在-d后面设置一个空格，可不许设置多个空格，因为cut只允许间隔符是一个字符。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat tab_space.txt |cut -d &#39; &#39; -f 1
cut: the delimiter must be a single character
Try \`cut --help&#39; for more information.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，cut在处理多空格的时候会更麻烦，因为<strong>cut只擅长处理“以一个字符间隔”的文本内容。</strong></p><h2 id="_6-sort-排序命令" tabindex="-1"><a class="header-anchor" href="#_6-sort-排序命令" aria-hidden="true">#</a> 6. sort 排序命令</h2><h3 id="_6-1-简介" tabindex="-1"><a class="header-anchor" href="#_6-1-简介" aria-hidden="true">#</a> 6.1 简介</h3><p>sort命令是帮我们依据不同的数据类型进行排序</p><blockquote><p>sort可针对文本文件的内容，以行为单位来排序。</p></blockquote><h3 id="_6-2-语法" tabindex="-1"><a class="header-anchor" href="#_6-2-语法" aria-hidden="true">#</a> 6.2 语法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sort [-bcfMnrtk][源文件][-o 输出文件] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-3-参数" tabindex="-1"><a class="header-anchor" href="#_6-3-参数" aria-hidden="true">#</a> 6.3 参数</h3><ul><li>-b 忽略每行前面开始出的空格字符。</li><li>-c 检查文件是否已经按照顺序排序。</li><li>-f 排序时，忽略大小写字母。</li><li>-M 将前面3个字母依照月份的缩写进行排序。</li><li>-n 依照数值的大小排序。</li><li>-o&lt;输出文件&gt; 将排序后的结果存入指定的文件。</li><li>-r 以相反的顺序来排序。</li><li>-t&lt;分隔字符&gt; 指定排序时所用的栏位分隔字符。</li><li>-k 选择以哪个区间进行排序。</li></ul><h3 id="_6-4-示例" tabindex="-1"><a class="header-anchor" href="#_6-4-示例" aria-hidden="true">#</a> 6.4 示例</h3><h4 id="_6-4-1-示例1" tabindex="-1"><a class="header-anchor" href="#_6-4-1-示例1" aria-hidden="true">#</a> 6.4.1 示例1</h4><p>sort将文件的每一行作为一个单位，相互比较，比较原则是从首字符向后，依次按ASCII码值进行比较，最后将他们按升序输出。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> seq.txt
banana
apple
pear
orange
$ <span class="token function">sort</span> seq.txt
apple
banana
orange
pear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户可以保存排序后的文件内容，或把排序后的文件内容输出至打印机。下例中用户把排序后的文件内容保存到名为result的文件中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sort</span> seq.txt <span class="token operator">&gt;</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_6-4-2-示例2-sort的-u选项" tabindex="-1"><a class="header-anchor" href="#_6-4-2-示例2-sort的-u选项" aria-hidden="true">#</a> 6.4.2 示例2:sort的-u选项</h4><p>它的作用很简单，就是在输出行中去除重复行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> seq.txt
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pear由于重复被-u选项无情的删除了。</p><h4 id="_6-4-3-示例3-sort的-r选项" tabindex="-1"><a class="header-anchor" href="#_6-4-3-示例3-sort的-r选项" aria-hidden="true">#</a> 6.4.3 示例3：sort的-r选项</h4><p>sort默认的排序方式是升序，如果想改成降序，就加个-r就搞定了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> number.txt
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-4-4-示例4-sort的-o选项" tabindex="-1"><a class="header-anchor" href="#_6-4-4-示例4-sort的-o选项" aria-hidden="true">#</a> 6.4.4 示例4：sort的-o选项</h4><p>由于sort默认是把结果输出到标准输出，所以需要用重定向才能将结果写入文件，形如sort filename &gt; newfile。</p><p>但是，如果你想把排序结果输出到原文件中，用重定向可就不行了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt <span class="token operator">&gt;</span> number.txt
$ <span class="token function">cat</span> number.txt
$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看，竟然将number清空了。就在这个时候，-o选项出现了，它成功的解决了这个问题，让你放心的将结果写入原文件。这或许也是-o比重定向的唯一优势所在。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> number.txt
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-4-5-示例5-sort的-n选项" tabindex="-1"><a class="header-anchor" href="#_6-4-5-示例5-sort的-n选项" aria-hidden="true">#</a> 6.4.5 示例5：sort的-n选项</h4><p>你有没有遇到过10比2小的情况。我反正遇到过。出现这种情况是由于排序程序将这些数字按字符来排序了，排序程序会先比较1和2，显然1小，所以就将10放在2前面喽。这也是sort的一贯作风。我们如果想改变这种现状，就要使用-n选项，来告诉sort，“要以数值来排序”！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> number.txt
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-4-6-示例6-sort的-t选项和-k选项" tabindex="-1"><a class="header-anchor" href="#_6-4-6-示例6-sort的-t选项和-k选项" aria-hidden="true">#</a> 6.4.6 示例6： sort的-t选项和-k选项</h4><p>如果有一个文件的内容是这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat facebook.txt
banana:30:5.5
apple:10:2.5
pear:90:2.3
orange:20:3.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件有三列，列与列之间用冒号隔开了，第一列表示水果类型，第二列表示水果数量，第三列表示水果价格。那么我想以水果数量来排序，也就是以第二列来排序，如何利用sort实现？幸好，sort提供了-t选项，后面可以设定间隔符。指定了间隔符之后，就可以用-k来指定列数了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ sort -n -k 2 -t ‘:’ facebook.txt
apple:10:2.5
orange:20:3.4
banana:30:5.5
pear:90:2.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-其他的sort常用选项" tabindex="-1"><a class="header-anchor" href="#_6-5-其他的sort常用选项" aria-hidden="true">#</a> 6.5 其他的sort常用选项</h3><ul><li>-f 会将小写字母都转换为大写字母来进行比较，亦即忽略大小写</li><li>-c 会检查文件是否已排好序，如果乱序，则输出第一个乱序的行的相关信息，最后返回1</li><li>-C 会检查文件是否已排好序，如果乱序，不输出内容，仅返回1</li><li>-M 会以月份来排序，比如JAN小于FEB等等</li><li>-b 会忽略每一行前面的所有空白部分，从第一个可见字符开始比较。</li></ul><h2 id="_7-uniq-去重命令" tabindex="-1"><a class="header-anchor" href="#_7-uniq-去重命令" aria-hidden="true">#</a> 7. uniq 去重命令</h2><h3 id="_7-1-简介" tabindex="-1"><a class="header-anchor" href="#_7-1-简介" aria-hidden="true">#</a> 7.1 简介</h3><p>uniq命令可以去除排序过的文件中的重复行</p><blockquote><p>因此uniq经常和sort合用。也就是说，为了使uniq起作用，所有的重复行必须是相邻的。</p></blockquote><h3 id="_7-2-简介" tabindex="-1"><a class="header-anchor" href="#_7-2-简介" aria-hidden="true">#</a> 7.2 简介</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">uniq</span> <span class="token punctuation">[</span>-icu<span class="token punctuation">]</span>
选项与参数：
<span class="token parameter variable">-i</span>   ：忽略大小写字符的不同；
<span class="token parameter variable">-c</span>  ：进行计数
<span class="token parameter variable">-u</span>  ：只显示唯一的行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-uniq-使用" tabindex="-1"><a class="header-anchor" href="#_7-3-uniq-使用" aria-hidden="true">#</a> 7.3 uniq 使用</h3><p>testfile的内容如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat testfile</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,200),o={href:"https://www.cnblogs.com/maybe2030/p/5325530.html#_label5",target:"_blank",rel:"noopener noreferrer"};function p(v,b){const s=c("ExternalLinkIcon");return e(),i("div",null,[u,n("p",null,[n("a",o,[l("Linux文本操作命令"),d(s)])])])}const h=a(r,[["render",p],["__file","linux-k-txt-overview.html.vue"]]);export{h as default};
