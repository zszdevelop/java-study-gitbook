import{_ as l,W as t,X as r,Y as s,Z as n,$ as e,a0 as i,D as o}from"./framework-0cf5f349.js";const c={},p=i('<h1 id="shell入门" tabindex="-1"><a class="header-anchor" href="#shell入门" aria-hidden="true">#</a> shell入门</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>Shell 是一个命令解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220330153029197.png" alt="image-20220330153029197" tabindex="0" loading="lazy"><figcaption>image-20220330153029197</figcaption></figure><h2 id="_2-shell-编程快速入门" tabindex="-1"><a class="header-anchor" href="#_2-shell-编程快速入门" aria-hidden="true">#</a> 2. <strong>Shell 编程快速入门</strong></h2>',5),d={href:"http://hello.sh",target:"_blank",rel:"noopener noreferrer"},u=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash </span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;hello world!&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方法1 </span>
<span class="token function">sh</span> hello.sh  

<span class="token comment"># 方法2 </span>
<span class="token function">chmod</span> +x hello.sh 
./hello.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终端打印出 <code>hello world!</code> 。</p><p><strong>说明：</strong></p>`,5),v=s("li",null,[s("code",null,"#!"),n(" 告诉系统这个脚本需要什么解释器来执行。")],-1),h=s("li",null,[n("文件扩展名 "),s("code",null,".sh"),n(" 不是强制要求的。")],-1),b=s("li",null,[n("方法1 直接运行解释器，"),s("code",null,"hello.sh"),n(" 作为 Shell 解释器的参数。此时 Shell 脚本就不需要指定解释器信息，第一行可以去掉。")],-1),m={href:"http://hello.sh",target:"_blank",rel:"noopener noreferrer"},k=i('<h2 id="_3-shell-变量" tabindex="-1"><a class="header-anchor" href="#_3-shell-变量" aria-hidden="true">#</a> 3. <strong>Shell 变量</strong></h2><h3 id="_3-1-定义" tabindex="-1"><a class="header-anchor" href="#_3-1-定义" aria-hidden="true">#</a> 3.1 <strong>定义</strong></h3><p>Shell 变量分为<strong>系统变量</strong>和<strong>自定义变量</strong>。系统变量有$HOME、$PWD、$USER等，显示当前 Shell 中所有变量：<code>set</code> 。 变量名可以由字母、数字、下划线组成，不能以数字开头。</p><h3 id="_3-2-基本语法" tabindex="-1"><a class="header-anchor" href="#_3-2-基本语法" aria-hidden="true">#</a> 3.2 <strong>基本语法</strong></h3><ul><li><strong>定义变量：</strong> 变量名=变量值，等号两侧不能有空格，变量名一般习惯用大写。</li><li><strong>删除变量：</strong> unset 变量名 。</li><li><strong>声明静态变量：</strong> readonly 变量名，静态变量不能unset。</li><li><strong>使用变量：</strong> $变量名</li></ul><h3 id="_3-3-将命令返回值赋给变量-重点" tabindex="-1"><a class="header-anchor" href="#_3-3-将命令返回值赋给变量-重点" aria-hidden="true">#</a> 3.3 <strong>将命令返回值赋给变量（重点）</strong></h3><ul><li>A=` ls` 反引号,执行里面的命令</li><li>A=$(ls) 等价于反引号</li></ul><h2 id="_4-shell-环境变量" tabindex="-1"><a class="header-anchor" href="#_4-shell-环境变量" aria-hidden="true">#</a> 4. <strong>Shell 环境变量</strong></h2><h3 id="_4-1-定义" tabindex="-1"><a class="header-anchor" href="#_4-1-定义" aria-hidden="true">#</a> 4.1 <strong>定义</strong></h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220330153653301.png" alt="image-20220330153653301" tabindex="0" loading="lazy"><figcaption>image-20220330153653301</figcaption></figure><h3 id="_4-2-基本语法" tabindex="-1"><a class="header-anchor" href="#_4-2-基本语法" aria-hidden="true">#</a> 4.2 <strong>基本语法</strong></h3><ol><li>export 变量名=变量值，将 Shell 变量输出为环境变量。</li><li>source 配置文件路径，让修改后的配置信息立即生效。</li><li>echo $变量名，检查环境变量是否生效</li></ol><h3 id="_4-3-位置参数变量" tabindex="-1"><a class="header-anchor" href="#_4-3-位置参数变量" aria-hidden="true">#</a> 4.3 <strong>位置参数变量</strong></h3><p><strong>基本语法</strong></p><ul><li>$n ：$0 代表命令本身、$1-$9 代表第1到9个参数，10以上参数用花括号，如 ${10}。</li><li>$* ：命令行中所有参数，且把所有参数看成一个整体。</li><li>$@ ：命令行中所有参数，且把每个参数区分对待。</li><li>$# ：所有参数个数。</li></ul><h3 id="_4-4-实例" tabindex="-1"><a class="header-anchor" href="#_4-4-实例" aria-hidden="true">#</a> 4.4 <strong>实例：</strong></h3>',16),g={href:"http://positionPara.sh",target:"_blank",rel:"noopener noreferrer"},_=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash     </span>
<span class="token comment"># 输出各个参数 </span>
<span class="token builtin class-name">echo</span> <span class="token variable">$0</span> <span class="token variable">$1</span> <span class="token variable">$2</span> 
<span class="token builtin class-name">echo</span> <span class="token variable">$*</span> 
<span class="token builtin class-name">echo</span> <span class="token variable">$@</span> 
<span class="token builtin class-name">echo</span> 参数个数<span class="token operator">=</span><span class="token variable">$#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x positionPara.sh 
./positionPara.sh <span class="token number">10</span> <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./positionPara.sh <span class="token number">10</span> <span class="token number">20</span> 
<span class="token number">10</span> <span class="token number">20</span> 
<span class="token number">10</span> <span class="token number">20</span> 
参数个数<span class="token operator">=</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-预定义变量" tabindex="-1"><a class="header-anchor" href="#_5-预定义变量" aria-hidden="true">#</a> 5. <strong>预定义变量</strong></h2><h3 id="_5-1-定义" tabindex="-1"><a class="header-anchor" href="#_5-1-定义" aria-hidden="true">#</a> 5.1 <strong>定义</strong></h3><p>在赋值定义之前，事先在 Shell 脚本中直接引用的变量。</p><h3 id="_5-2-基本语法" tabindex="-1"><a class="header-anchor" href="#_5-2-基本语法" aria-hidden="true">#</a> 5.2 <strong>基本语法</strong></h3><ul><li>$$ ：当前进程的 PID 进程号。</li><li>$! ：后台运行的最后一个进程的 PID 进程号。</li><li>$? ：最后一次执行的命令的返回状态，0为执行正确，非0执行失败。</li></ul><h3 id="_5-3-实例" tabindex="-1"><a class="header-anchor" href="#_5-3-实例" aria-hidden="true">#</a> 5.3 <strong>实例：</strong></h3>`,11),f={href:"http://prePara.sh",target:"_blank",rel:"noopener noreferrer"},x=i(`<div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#!/bin/bash     </span>
<span class="token function">echo</span> 当前的进程号=$$ 
<span class="token comment"># &amp;：以后台的方式运行程序 </span>
<span class="token punctuation">.</span><span class="token operator">/</span>hello<span class="token punctuation">.</span>sh &amp; 
<span class="token function">echo</span> 最后一个进程的进程号=$<span class="token operator">!</span> 
<span class="token function">echo</span> 最后执行的命令结果=$?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>当前的进程号<span class="token operator">=</span><span class="token number">41752</span> 
最后一个进程的进程号<span class="token operator">=</span><span class="token number">41753</span> 
最后执行的命令结果<span class="token operator">=</span><span class="token number">0</span> <span class="token comment"># hello world!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-运算符" tabindex="-1"><a class="header-anchor" href="#_6-运算符" aria-hidden="true">#</a> 6.<strong>运算符</strong></h2><h3 id="_6-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_6-1-基本语法" aria-hidden="true">#</a> 6.1 <strong>基本语法</strong></h3><ul><li>$((运算式)) 或 $[运算式]</li><li>expr m + n 注意 expr 运算符间要有空格</li><li>expr m - n</li><li>expr *，/，% 分别代表乘，除，取余</li></ul><h3 id="_6-2-实例" tabindex="-1"><a class="header-anchor" href="#_6-2-实例" aria-hidden="true">#</a> 6.2 <strong>实例</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 第1种方式 $(()) </span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">4</span><span class="token variable">))</span></span>   

<span class="token comment"># 第2种方式 $[]，推荐 </span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">2</span>+3<span class="token punctuation">)</span>*4<span class="token punctuation">]</span>  

<span class="token comment"># 使用 expr </span>
<span class="token assign-left variable">TEMP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> <span class="token number">2</span> + <span class="token number">3</span><span class="token variable">\`</span></span> 
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $TEMP <span class="token punctuation">\\</span>* <span class="token number">4</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-条件判断" tabindex="-1"><a class="header-anchor" href="#_7-条件判断" aria-hidden="true">#</a> 7. <strong>条件判断</strong></h2><h3 id="_7-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_7-1-基本语法" aria-hidden="true">#</a> 7.1 <strong>基本语法</strong></h3><p>[ condition ] 注意condition前后要有空格。非空返回0，0为 true，否则为 false 。</p><h3 id="_7-2-实例" tabindex="-1"><a class="header-anchor" href="#_7-2-实例" aria-hidden="true">#</a> 7.2 <strong>实例</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash </span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&#39;test01&#39;</span> <span class="token operator">=</span> <span class="token string">&#39;test&#39;</span> <span class="token punctuation">]</span> 
<span class="token keyword">then</span>
     <span class="token builtin class-name">echo</span> <span class="token string">&#39;等于&#39;</span> 
<span class="token keyword">fi</span>  

<span class="token comment"># 20是否大于10 </span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token number">20</span> <span class="token parameter variable">-gt</span> <span class="token number">10</span><span class="token punctuation">]</span> 
<span class="token keyword">then</span>
     <span class="token builtin class-name">echo</span> <span class="token string">&#39;大于&#39;</span> 
<span class="token keyword">fi</span>  

<span class="token comment"># 是否存在文件/root/shell/a.txt </span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> /root/shell/a.txt <span class="token punctuation">]</span> 
<span class="token keyword">then</span>
     <span class="token builtin class-name">echo</span> <span class="token string">&#39;存在&#39;</span> 
<span class="token keyword">fi</span>  

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&#39;test02&#39;</span> <span class="token operator">=</span> <span class="token string">&#39;test02&#39;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;hello&#39;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;world&#39;</span> 
<span class="token keyword">then</span>
     <span class="token builtin class-name">echo</span> <span class="token string">&#39;条件满足，执行后面的语句&#39;</span> 
<span class="token keyword">fi</span>
运行结果：
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>大于 
hello 
条件满足，执行后面的语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-流程控制" tabindex="-1"><a class="header-anchor" href="#_9-流程控制" aria-hidden="true">#</a> 9. <strong>流程控制</strong></h2><h3 id="_9-1-if-判断" tabindex="-1"><a class="header-anchor" href="#_9-1-if-判断" aria-hidden="true">#</a> 9.1 <strong>if 判断</strong></h3><h4 id="_9-1-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_9-1-1-基本语法" aria-hidden="true">#</a> 9.1.1 <strong>基本语法</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> 条件判断式 <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>   
    程序   
<span class="token keyword">fi</span>

<span class="token comment"># 或者（推荐）</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> 条件判断式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    程序
<span class="token keyword">elif</span> <span class="token punctuation">[</span> 条件判断式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    程序
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-1-2-实例" tabindex="-1"><a class="header-anchor" href="#_9-1-2-实例" aria-hidden="true">#</a> 9.1.2 <strong>实例</strong></h4><p>编写 Shell 程序：如果输入的参数大于60，输出“及格”，否则输出“不及格”。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token parameter variable">-ge</span> <span class="token number">60</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> 及格
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token parameter variable">-lt</span> <span class="token number">60</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;不及格&quot;</span> 
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-case-分支" tabindex="-1"><a class="header-anchor" href="#_9-2-case-分支" aria-hidden="true">#</a> 9.2 <strong>case 分支</strong></h3><h4 id="_9-2-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_9-2-1-基本语法" aria-hidden="true">#</a> 9.2.1 <strong>基本语法</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> $变量名 <span class="token keyword">in</span>
<span class="token string">&quot;值1&quot;</span><span class="token punctuation">)</span>
如果变量值等于值1，则执行此处程序1
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;值2&quot;</span><span class="token punctuation">)</span>
如果变量值等于值2，则执行此处程序2
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">..</span>.省略其它分支<span class="token punctuation">..</span>.
*<span class="token punctuation">)</span>
如果变量值不等于以上列出的值，则执行此处程序
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-2-2-实例" tabindex="-1"><a class="header-anchor" href="#_9-2-2-实例" aria-hidden="true">#</a> 9.2.2 <strong>实例</strong></h4><p>当命令行参数为1时输出“周一”，2时输出“周二”，其他情况输出“其它”。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
<span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> 周一
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> 周二
<span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> 其它
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-for-循环" tabindex="-1"><a class="header-anchor" href="#_9-3-for-循环" aria-hidden="true">#</a> 9.3 <strong>for 循环</strong></h3><h4 id="_9-3-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_9-3-1-基本语法" aria-hidden="true">#</a> 9..3.1 <strong>基本语法</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 语法1</span>
<span class="token keyword">for</span> 变量名 <span class="token keyword">in</span> 值1 值2 值3<span class="token punctuation">..</span>.
<span class="token keyword">do</span>
    程序
<span class="token keyword">done</span>

<span class="token comment"># 语法2</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>初始值<span class="token punctuation">;</span>循环控制条件<span class="token punctuation">;</span>变量变化<span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
    程序
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-3-2-实例" tabindex="-1"><a class="header-anchor" href="#_9-3-2-实例" aria-hidden="true">#</a> 9.3.2 <strong>实例</strong></h4><ol><li>打印命令行输入的参数。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash  </span>

<span class="token comment"># 使用$* </span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span> 
<span class="token keyword">do</span>     
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;the arg is <span class="token variable">$i</span>&quot;</span> 
<span class="token keyword">done</span> 
<span class="token builtin class-name">echo</span> <span class="token string">&quot;==================&quot;</span>  

<span class="token comment"># 使用$@ </span>
<span class="token keyword">for</span> <span class="token for-or-select variable">j</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> 
<span class="token keyword">do</span>     
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;the arg is <span class="token variable">$j</span>&quot;</span> 
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果（回顾一下 $* 和 $@ 的区别）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>the arg is <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> 
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span> 
the arg is <span class="token number">1</span> 
the arg is <span class="token number">2</span> 
the arg is <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>输出从1加到100的值。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash </span>
<span class="token assign-left variable">SUM</span><span class="token operator">=</span><span class="token number">0</span>  
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span> 
<span class="token keyword">do</span>     
    <span class="token assign-left variable">SUM</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$SUM</span>+<span class="token variable">$i</span><span class="token punctuation">]</span> 
<span class="token keyword">done</span> 

<span class="token builtin class-name">echo</span> <span class="token variable">$SUM</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-4-while-循环" tabindex="-1"><a class="header-anchor" href="#_9-4-while-循环" aria-hidden="true">#</a> 9.4 <strong>while 循环</strong></h3><h4 id="_9-4-1基本语法" tabindex="-1"><a class="header-anchor" href="#_9-4-1基本语法" aria-hidden="true">#</a> 9.4.1<strong>基本语法</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token punctuation">[</span> 条件判断式 <span class="token punctuation">]</span>
<span class="token keyword">do</span>
    程序
<span class="token keyword">done</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-4-2实例" tabindex="-1"><a class="header-anchor" href="#_9-4-2实例" aria-hidden="true">#</a> 9.4.2<strong>实例</strong></h4><p>输出从1加到100的值。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">SUM</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token variable">$i</span> <span class="token parameter variable">-le</span> <span class="token variable">$1</span> <span class="token punctuation">]</span>
<span class="token keyword">do</span>
    <span class="token assign-left variable">SUM</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$SUM</span>+<span class="token variable">$i</span><span class="token punctuation">]</span>
    <span class="token assign-left variable">i</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$i</span>+1<span class="token punctuation">]</span>
<span class="token keyword">done</span>       
<span class="token builtin class-name">echo</span> <span class="token variable">$SUM</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-读取控制台输入" tabindex="-1"><a class="header-anchor" href="#_10-读取控制台输入" aria-hidden="true">#</a> 10. <strong>读取控制台输入</strong></h2><h3 id="_10-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_10-1-基本语法" aria-hidden="true">#</a> 10.1 <strong>基本语法</strong></h3><p>read(选项)(参数) <strong>选项</strong></p><ul><li>-p：指定读取值时的提示符</li><li>-t：指定读取值时等待的时间（秒），如果没有在指定时间内输入，就不再等待了。</li></ul><p><strong>参数</strong></p><ul><li>变量名：读取值的变量名</li></ul><h3 id="_10-2-实例" tabindex="-1"><a class="header-anchor" href="#_10-2-实例" aria-hidden="true">#</a> 10.2 <strong>实例</strong></h3><p>读取控制台输入一个num值。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入一个数num1=&quot;</span> NUM1
<span class="token builtin class-name">echo</span> <span class="token string">&quot;你输入num1的值是：<span class="token variable">$NUM1</span>&quot;</span>

<span class="token builtin class-name">read</span> <span class="token parameter variable">-t</span> <span class="token number">10</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请在10秒内输入一个数num2=&quot;</span> NUM2
<span class="token builtin class-name">echo</span> <span class="token string">&quot;你输入num2的值是：<span class="token variable">$NUM2</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>请输入一个数num1<span class="token operator">=</span><span class="token number">10</span>
你输入num1的值是：10
请在10秒内输入一个数num2<span class="token operator">=</span><span class="token number">20</span>
你输入num2的值是：20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-函数" tabindex="-1"><a class="header-anchor" href="#_11-函数" aria-hidden="true">#</a> 11. <strong>函数</strong></h2><p>和其它编程语言一样，Shell 编程有系统函数和自定义函数，本文只举两个常用系统函数。</p><h3 id="_11-1系统函数" tabindex="-1"><a class="header-anchor" href="#_11-1系统函数" aria-hidden="true">#</a> 11.1<strong>系统函数</strong></h3><h4 id="_11-1-1-basename" tabindex="-1"><a class="header-anchor" href="#_11-1-1-basename" aria-hidden="true">#</a> 11.1.1 basename</h4><ul><li><p>basename，删掉路径最后一个 / 前的所有部分（包括/），常用于获取文件名。 <strong>基本语法</strong></p></li><li><ul><li>basename [pathname] [suffix]</li><li>basename [string] [suffix]</li><li>如果指定 suffix，也会删掉pathname或string的后缀部分。</li></ul></li></ul><p><strong>实例</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># basename /usr/bin/sort  </span>
<span class="token function">sort</span>  

<span class="token comment"># basename include/stdio.h  </span>
stdio.h  

<span class="token comment"># basename include/stdio.h .h </span>
stdio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-1-2-dirname" tabindex="-1"><a class="header-anchor" href="#_11-1-2-dirname" aria-hidden="true">#</a> 11.1.2 dirname</h4><ul><li><p>dirname，删掉路径最后一个 / 后的所有部分（包括/），常用于获取文件路径。 <strong>基本语法</strong></p></li><li><ul><li>dirname pathname</li><li>如果路径中不含 / ，则返回 &#39;.&#39; （当前路径）。</li></ul></li></ul><p><strong>实例</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># dirname /usr/bin/  </span>
/usr  

<span class="token comment"># dirname dir1/str dir2/str </span>
dir1 
dir2  

<span class="token comment"># dirname stdio.h </span>
<span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-2-自定义函数" tabindex="-1"><a class="header-anchor" href="#_11-2-自定义函数" aria-hidden="true">#</a> 11.2 <strong>自定义函数</strong></h3><h4 id="_11-2-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_11-2-1-基本语法" aria-hidden="true">#</a> 11.2.1 <strong>基本语法</strong></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span> <span class="token keyword">function</span> <span class="token punctuation">]</span> funname<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">{</span>
    Action<span class="token punctuation">;</span>
    <span class="token punctuation">[</span>return int<span class="token punctuation">;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 调用</span>
funname 参数1 参数2<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-2-2-实例" tabindex="-1"><a class="header-anchor" href="#_11-2-2-实例" aria-hidden="true">#</a> 11.2.2 <strong>实例</strong></h4><p>计算输入两个参数的和。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">function</span> <span class="token function-name function">getSum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token assign-left variable">SUM</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$n1</span>+<span class="token variable">$n2</span><span class="token punctuation">]</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;sum=<span class="token variable">$SUM</span>&quot;</span>
<span class="token punctuation">}</span>   

<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入第一个参数n1：&quot;</span> n1
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入第二个参数n2：&quot;</span> n2

<span class="token comment"># 调用 getSum 函数</span>
getSum <span class="token variable">$n1</span> <span class="token variable">$n2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,72),w={href:"https://zhuanlan.zhihu.com/p/102176365",target:"_blank",rel:"noopener noreferrer"};function $(y,q){const a=o("ExternalLinkIcon");return t(),r("div",null,[p,s("p",null,[n("进入 Linux 终端，编写一个 Shell 脚本 "),s("a",d,[n("hello.sh"),e(a)]),n(" ：")]),u,s("ul",null,[v,h,b,s("li",null,[n("方法2 "),s("a",m,[n("hello.sh"),e(a)]),n(" 作为可执行程序运行，Shell 脚本第一行一定要指定解释器。")])]),k,s("p",null,[n("编写 Shell 脚本 "),s("a",g,[n("positionPara.sh"),e(a)]),n(" ，输出命令行输入的各个参数信息。")]),_,s("p",null,[n("编写 Shell 脚本 "),s("a",f,[n("prePara.sh"),e(a)]),n(" ，输出命令行输入的各个参数信息。")]),x,s("p",null,[s("a",w,[n("掌握Shell编程，一篇就够了"),e(a)])])])}const M=l(c,[["render",$],["__file","linux-a-shell.html.vue"]]);export{M as default};
