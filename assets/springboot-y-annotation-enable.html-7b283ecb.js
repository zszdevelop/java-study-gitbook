import{_ as i,W as t,X as o,Y as n,Z as s,$ as e,a0 as l,D as p}from"./framework-0cf5f349.js";const r={},c=l(`<h1 id="enableconfigurationproperties注解" tabindex="-1"><a class="header-anchor" href="#enableconfigurationproperties注解" aria-hidden="true">#</a> @EnableConfigurationProperties注解</h1><h2 id="_1-作用" tabindex="-1"><a class="header-anchor" href="#_1-作用" aria-hidden="true">#</a> 1. 作用</h2><p><strong>@EnableConfigurationProperties 注解的作用是:让使用了 @ConfigurationProperties 注解的类生效,并且将该类注入到 IOC 容器中,交由 IOC 容器进行管理</strong></p><blockquote><p>@ConfigurationProperties是在第三方包中，那么@component是不能注入到容器的。只有@EnableConfigurationProperties才可以注入到容器</p></blockquote><h2 id="_2-如何使-configurationproperties生效" tabindex="-1"><a class="header-anchor" href="#_2-如何使-configurationproperties生效" aria-hidden="true">#</a> 2. 如何使@ConfigurationProperties生效</h2><h3 id="_2-1-方式1-使用-configurationproperties-component-注解" tabindex="-1"><a class="header-anchor" href="#_2-1-方式1-使用-configurationproperties-component-注解" aria-hidden="true">#</a> 2.1 方式1：<strong>使用 @ConfigurationProperties + @Component 注解</strong></h3><p>如果一个类只配置了 @ConfigurationProperties 注解，而没有使用 @Component 注解将该类加入到 IOC 容器中，那么它就不能完成 xxx.properties 配置文件和 Java Bean 的数据绑定</p><ol><li><p>application.properties</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">mytest.name</span><span class="token punctuation">=</span><span class="token value attr-value">zszdevelop</span>
<span class="token key attr-name">mytest.age</span><span class="token punctuation">=</span><span class="token value attr-value">27</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>MyConfigurationProperties 这个实体类中必须要加上 @Component ,使这个类注入到 IOC容器中,否则就无法从容器中获取到这个类的对象实例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;mytest&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfigurationProperties</span> <span class="token punctuation">{</span>

    <span class="token comment">// 省略 get、set、toString 方法</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>HelloController</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>

    <span class="token keyword">private</span> <span class="token class-name">MyConfigurationProperties</span> config<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/config&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">testConfigurationProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token string">&quot;SUCCESS!!!&quot;</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>测试结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MyConfigurationProperties{name=&#39;zszdevelop&#39;, age=27, gender=&#39;null&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h3 id="_2-2-方式2-使用-enableconfigurationproperties-注解" tabindex="-1"><a class="header-anchor" href="#_2-2-方式2-使用-enableconfigurationproperties-注解" aria-hidden="true">#</a> 2.2 方式2：<strong>使用 @EnableConfigurationProperties 注解</strong></h3><ol><li><p>添加一个 HelloService 类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 注入到 IOC 容器中,交由 Spring 进行管理</span>

<span class="token annotation punctuation">@Service</span>
<span class="token comment">// 该注解的作用是使 MyConfigurationProperties 这个类上标注的 @ConfigurationProperties 注解生效,并且会自动将这个类注入到 IOC 容器中</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">MyConfigurationProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">HelloService</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>MyConfigurationProperties 有了 @EnableConfigurationProperties 注解之后该实体类就不需要加上 @Component 注解了</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;mytest&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyConfigurationProperties</span> <span class="token punctuation">{</span>

    <span class="token comment">// 省略 get、set、toString 方法</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>HelloController.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>

    <span class="token keyword">private</span> <span class="token class-name">MyConfigurationProperties</span> config<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/config&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">testConfigurationProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token string">&quot;SUCCESS!!!&quot;</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>测试结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MyConfigurationProperties{name=&#39;xiaomaomao&#39;, age=27, gender=&#39;null&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论" aria-hidden="true">#</a> 3. <strong>结论</strong></h2><ul><li><p>如果要使 xxx.properties 配置文件与 Java Bean 动态绑定,那么就必须将这个 Java Bean 加入到容器中,并且需要在该类上使用 @ConfigurationProperties 注解</p></li><li><p>@EnableConfigurationProperties(A.class)的作用就是如果 A 这个类上使用了 @ConfigurationProperties 注解,那么 A 这个类会与 xxx.properties 进行动态绑定,并且会将 A 这个类加入 IOC 容器中,并交由 IOC 容器进行管理</p></li><li><p>如果@ConfigurationProperties是在第三方包中，那么@component是不能注入到容器的。只有@EnableConfigurationProperties才可以注入到容器</p></li></ul><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,13),u={href:"https://blog.csdn.net/Cloud_July/article/details/122720164",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.jianshu.com/p/7f54da1cb2eb",target:"_blank",rel:"noopener noreferrer"};function v(m,k){const a=p("ExternalLinkIcon");return t(),o("div",null,[c,n("p",null,[n("a",u,[s("@EnableConfigurationProperties 注解"),e(a)])]),n("p",null,[n("a",d,[s("关与 @EnableConfigurationProperties 注解"),e(a)])])])}const g=i(r,[["render",v],["__file","springboot-y-annotation-enable.html.vue"]]);export{g as default};
