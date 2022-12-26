import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const i={},l=e(`<h1 id="linux进程监控" tabindex="-1"><a class="header-anchor" href="#linux进程监控" aria-hidden="true">#</a> Linux进程监控</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>进程监控命令ps</p><h2 id="_2-命令" tabindex="-1"><a class="header-anchor" href="#_2-命令" aria-hidden="true">#</a> 2. 命令</h2><h3 id="_2-1-ps" tabindex="-1"><a class="header-anchor" href="#_2-1-ps" aria-hidden="true">#</a> 2.1 ps</h3><h4 id="_2-1-1-简介" tabindex="-1"><a class="header-anchor" href="#_2-1-1-简介" aria-hidden="true">#</a> 2.1.1 简介</h4><p>ps（Process Status，进程状态）命令 用于报告当前系统的进程状态。</p><h4 id="_2-1-2-语法" tabindex="-1"><a class="header-anchor" href="#_2-1-2-语法" aria-hidden="true">#</a> 2.1.2 语法</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ps [参数]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常用参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-A</span>    显示所有进程（同-e）
<span class="token parameter variable">-a</span>    显示当前终端的所有进程
<span class="token parameter variable">-u</span>    显示进程的用户信息
<span class="token parameter variable">-o</span>    以用户自定义形式显示进程信息
<span class="token parameter variable">-f</span>    显示程序间的关系
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-字段含义" tabindex="-1"><a class="header-anchor" href="#_2-1-3-字段含义" aria-hidden="true">#</a> 2.1.3 <strong>字段含义</strong></h4><p>在介绍实例之前，需要先了解一下ps命令输出各字段的含义，这样我们才能更好地理解所展示的信息。常见字段的基本含义如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token environment constant">USER</span>          进程所有者的用户名
PID           进程ID（Process ID）
START         进程激活时间
%CPU          进程的cpu占用率
%MEM          进程使用内存的百分比
VSZ           进程使用的虚拟内存大小，以K为单位
RSS           驻留空间的大小。显示当前常驻内存的程序的K字节数。
TTY           与进程关联的终端（tty）
STAT          进程状态，包括下面的状态： 
                     D    不可中断     Uninterruptible <span class="token function">sleep</span> <span class="token punctuation">(</span>usually IO<span class="token punctuation">)</span>
                     R    正在运行，或在队列中的进程
                     S    处于休眠状态
                     T    停止或被追踪
                     Z    僵尸进程
                     W    进入内存交换（从内核2.6开始无效）
                     X    死掉的进程
                     <span class="token operator">&lt;</span>    高优先级
                     N    低优先级
                     L    有些页被锁进内存
                     s    包含子进程
                     <span class="token punctuation">\\</span>+   位于后台的进程组；
                     l    多线程，克隆线程

TIME          进程使用的总CPU时间
COMMAND       被执行的命令行
NI            进程的优先级值，较小的数字意味着占用较少的CPU时间
PRI           进程优先级。
<span class="token environment constant">PPID</span>          父进程ID
WCHAN         进程等待的内核事件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-4-tldr-文档" tabindex="-1"><a class="header-anchor" href="#_2-1-4-tldr-文档" aria-hidden="true">#</a> 2.1.4 tldr 文档</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">(</span>base<span class="token punctuation">)</span> ➜  ~ tldr <span class="token function">ps</span>
Cache is out of date. You should run <span class="token string">&quot;tldr --update&quot;</span>

  <span class="token function">ps</span>

  Information about running processes.

  - List all running processes:
    显示所有运行的进程
    <span class="token function">ps</span> aux

  - List all running processes including the full <span class="token builtin class-name">command</span> string:
  	列出所有正在运行的进程，包括完整的命令字符串
    <span class="token function">ps</span> auxww

  - Search <span class="token keyword">for</span> a process that matches a string:
  	搜索与字符串匹配的进程:
    <span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> string

  - List all processes of the current user <span class="token keyword">in</span> extra full format:
  	以额外完整格式列出当前用户的所有进程:
    <span class="token function">ps</span> <span class="token parameter variable">--user</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-F</span>

  - List all processes of the current user as a tree:
  	以树的形式列出当前用户的所有进程:
    <span class="token function">ps</span> <span class="token parameter variable">--user</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> f

  - Get the parent pid of a process:
  	获取进程的父进程pid:
    <span class="token function">ps</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">ppid</span><span class="token operator">=</span> <span class="token parameter variable">-p</span> pid

  - Sort processes by memory consumption:
  	按内存消耗对进程进行排序:
    <span class="token function">ps</span> <span class="token parameter variable">--sort</span> size
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-5-常见用法" tabindex="-1"><a class="header-anchor" href="#_2-1-5-常见用法" aria-hidden="true">#</a> 2.1.5 常见用法</h4><h5 id="_2-1-5-1-显示所有运行的进程" tabindex="-1"><a class="header-anchor" href="#_2-1-5-1-显示所有运行的进程" aria-hidden="true">#</a> 2.1.5.1 显示所有运行的进程</h5><p>把所有进程显示出来，可用使用 ps -aux 或者 ps -A 。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">ps</span> <span class="token parameter variable">-aux</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408112800947.png" alt="image-20220408112800947" tabindex="0" loading="lazy"><figcaption>image-20220408112800947</figcaption></figure><h5 id="_2-1-5-2-显示所有进程基本信息" tabindex="-1"><a class="header-anchor" href="#_2-1-5-2-显示所有进程基本信息" aria-hidden="true">#</a> 2.1.5.2 <strong>显示所有进程基本信息</strong></h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408112951231.png" alt="image-20220408112951231" tabindex="0" loading="lazy"><figcaption>image-20220408112951231</figcaption></figure><h5 id="_2-1-5-3-搜索与字符串匹配的进程" tabindex="-1"><a class="header-anchor" href="#_2-1-5-3-搜索与字符串匹配的进程" aria-hidden="true">#</a> 2.1.5.3 搜索与字符串匹配的进程</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">ps</span> <span class="token parameter variable">-aux</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220408113035249.png" alt="image-20220408113035249" tabindex="0" loading="lazy"><figcaption>image-20220408113035249</figcaption></figure><h5 id="_2-1-5-4-查看cpu-资源的使用量对进程进行排序" tabindex="-1"><a class="header-anchor" href="#_2-1-5-4-查看cpu-资源的使用量对进程进行排序" aria-hidden="true">#</a> 2.1.5.4 <strong>查看CPU 资源的使用量对进程进行排序</strong></h5><p>默认的结果集是未排好序的。可以通过 sort命令来排序。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-aux</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-nk</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2-1-5-4-其他用法" tabindex="-1"><a class="header-anchor" href="#_2-1-5-4-其他用法" aria-hidden="true">#</a> 2.1.5.4 <strong>其他用法</strong></h5><p>ps 的用法非常多，这里仅列举一些常用的：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">ps</span> <span class="token operator">-</span>aux <span class="token punctuation">|</span> grep &lt;name&gt;      <span class="token comment"># 查看name 进程详细信息</span>
<span class="token function">ps</span> <span class="token operator">-</span>p &lt;pid&gt; <span class="token operator">-</span>L             <span class="token comment"># 显示进程&lt;pid&gt; 的所有线程</span>
<span class="token function">ps</span> <span class="token operator">-</span>o lstart &lt;pid&gt;         <span class="token comment"># 显示进程的启动时间</span>
<span class="token function">ps</span> <span class="token operator">-</span>f <span class="token operator">--</span>forest <span class="token operator">-</span>C &lt;name&gt;   <span class="token comment"># 用树的风格显示进程的层次关系</span>
<span class="token function">ps</span> <span class="token operator">-</span>e <span class="token operator">-</span>o pid<span class="token punctuation">,</span>uname<span class="token punctuation">,</span>pcpu<span class="token punctuation">,</span>pmem<span class="token punctuation">,</span>comm<span class="token punctuation">,</span>etime  <span class="token comment"># 定制显示的列</span>
<span class="token function">ps</span> <span class="token operator">-</span>o lstart &lt;pid&gt;         <span class="token comment"># 显示进程的启动时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33),r=[l];function t(d,c){return s(),a("div",null,r)}const o=n(i,[["render",t],["__file","linux-j-ps.html.vue"]]);export{o as default};
