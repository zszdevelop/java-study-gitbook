import{_ as s,W as e,X as p,Y as a,Z as t,$ as l,a0 as o,D as i}from"./framework-0cf5f349.js";const c={},r=o(`<h1 id="java反编译命令-javap" tabindex="-1"><a class="header-anchor" href="#java反编译命令-javap" aria-hidden="true">#</a> Java反编译命令-javap</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>javap是jdk自带的一个工具，可以对代码 反编译 ，也可以查看java编译器生成的字节码。</p><p><strong>javap命令分解一个class文件</strong>，它根据options来决定到底输出什么。如果没有使用options,那么javap将会输出包，类里的protected和public域以及类里的所有方法。<code>javap</code>将会把它们输出在标准输出上。</p><blockquote><p>一般情况下，很少有人使用javap对class文件进行反编译，因为有很多成熟的反编译工具可以使用，比如jad。但是，javap还可以查看java编译器为我们生成的字节码。通过它，可以对照源代码和字节码，从而了解很多编译器内部的工作。</p></blockquote><h2 id="_2-实例" tabindex="-1"><a class="header-anchor" href="#_2-实例" aria-hidden="true">#</a> 2. 实例</h2><p>来看这个例子，先编译(<code>javac</code>)下面这个类。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SynchronizedTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">doSth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSth1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">SynchronizedTest</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-编译-javac" tabindex="-1"><a class="header-anchor" href="#_2-1-编译-javac" aria-hidden="true">#</a> 2.1 编译 javac</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>javac SynchronizedTest.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以看到编译出来的class 代码我们是无法直接阅读的二进制文件</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220519170413379.png" alt="image-20220519170413379" tabindex="0" loading="lazy"><figcaption>image-20220519170413379</figcaption></figure><h3 id="_2-2-反编译javap" tabindex="-1"><a class="header-anchor" href="#_2-2-反编译javap" aria-hidden="true">#</a> 2.2 反编译javap</h3><p>我们先来使用 Javap 来反编译以上代码</p><h4 id="_2-2-1-不加参数情况" tabindex="-1"><a class="header-anchor" href="#_2-2-1-不加参数情况" aria-hidden="true">#</a> 2.2.1 不加参数情况</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>javap SynchronizedTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Compiled from &quot;SynchronizedTest.java&quot;
public class SynchronizedTest {
  public SynchronizedTest();
  public synchronized void doSth();
  public void doSth1();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-c-参数" tabindex="-1"><a class="header-anchor" href="#_2-2-2-c-参数" aria-hidden="true">#</a> 2.2.2 -c 参数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>javap -c SynchronizedTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译出的结果</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Compiled</span> from <span class="token string">&quot;SynchronizedTest.java&quot;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SynchronizedTest</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name">SynchronizedTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
       <span class="token number">0</span><span class="token operator">:</span> aload_0
       <span class="token number">1</span><span class="token operator">:</span> invokespecial #<span class="token number">1</span>                  <span class="token comment">// Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V</span>
       <span class="token number">4</span><span class="token operator">:</span> <span class="token keyword">return</span>

  <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">doSth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
       <span class="token number">0</span><span class="token operator">:</span> getstatic     #<span class="token number">2</span>                  <span class="token comment">// Field java/lang/System.out:Ljava/io/PrintStream;</span>
       <span class="token number">3</span><span class="token operator">:</span> ldc           #<span class="token number">3</span>                  <span class="token comment">// String Hello World</span>
       <span class="token number">5</span><span class="token operator">:</span> invokevirtual #<span class="token number">4</span>                  <span class="token comment">// Method java/io/PrintStream.println:(Ljava/lang/String;)V</span>
       <span class="token number">8</span><span class="token operator">:</span> <span class="token keyword">return</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSth1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
       <span class="token number">0</span><span class="token operator">:</span> ldc           #<span class="token number">5</span>                  <span class="token comment">// class SynchronizedTest</span>
       <span class="token number">2</span><span class="token operator">:</span> dup
       <span class="token number">3</span><span class="token operator">:</span> astore_1
       <span class="token number">4</span><span class="token operator">:</span> monitorenter
       <span class="token number">5</span><span class="token operator">:</span> getstatic     #<span class="token number">2</span>                  <span class="token comment">// Field java/lang/System.out:Ljava/io/PrintStream;</span>
       <span class="token number">8</span><span class="token operator">:</span> ldc           #<span class="token number">3</span>                  <span class="token comment">// String Hello World</span>
      <span class="token number">10</span><span class="token operator">:</span> invokevirtual #<span class="token number">4</span>                  <span class="token comment">// Method java/io/PrintStream.println:(Ljava/lang/String;)V</span>
      <span class="token number">13</span><span class="token operator">:</span> aload_1
      <span class="token number">14</span><span class="token operator">:</span> monitorexit
      <span class="token number">15</span><span class="token operator">:</span> <span class="token keyword">goto</span>          <span class="token number">23</span>
      <span class="token number">18</span><span class="token operator">:</span> astore_2
      <span class="token number">19</span><span class="token operator">:</span> aload_1
      <span class="token number">20</span><span class="token operator">:</span> monitorexit
      <span class="token number">21</span><span class="token operator">:</span> aload_2
      <span class="token number">22</span><span class="token operator">:</span> athrow
      <span class="token number">23</span><span class="token operator">:</span> <span class="token keyword">return</span>
    <span class="token class-name">Exception</span> table<span class="token operator">:</span>
       from    <span class="token keyword">to</span>  <span class="token namespace">target</span> type
           <span class="token number">5</span>    <span class="token number">15</span>    <span class="token number">18</span>   any
          <span class="token number">18</span>    <span class="token number">21</span>    <span class="token number">18</span>   any
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-用法摘要" tabindex="-1"><a class="header-anchor" href="#_3-用法摘要" aria-hidden="true">#</a> 3. 用法摘要</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-help</span> 帮助
<span class="token parameter variable">-l</span> 输出行和变量的表
<span class="token parameter variable">-public</span> 只输出public方法和域
<span class="token parameter variable">-protected</span> 只输出public和protected类和成员
<span class="token parameter variable">-package</span> 只输出包，public和protected类和成员，这是默认的
<span class="token parameter variable">-p</span> <span class="token parameter variable">-private</span> 输出所有类和成员
<span class="token parameter variable">-s</span> 输出内部类型签名
<span class="token parameter variable">-c</span> 输出分解后的代码，例如，类中每一个方法内，包含java字节码的指令，
<span class="token parameter variable">-verbose</span> 输出栈大小，方法参数的个数
<span class="token parameter variable">-constants</span> 输出静态final常量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结" aria-hidden="true">#</a> 4. 总结</h2><p>javap可以用于反编译和查看编译器编译后的字节码。平时一般用<code>javap -c</code>比较多，该命令用于列出每个方法所执行的JVM指令，并显示每个方法的字节码的实际作用。可以通过字节码和源代码的对比，深入分析java的编译原理，了解和解决各种Java原理级别的问题。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,27),d={href:"https://www.hollischuang.com/archives/1107",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const n=i("ExternalLinkIcon");return e(),p("div",null,[r,a("p",null,[a("a",d,[t("Java命令学习系列（七）——javap"),l(n)])])])}const b=s(c,[["render",u],["__file","java-command-javap.html.vue"]]);export{b as default};
