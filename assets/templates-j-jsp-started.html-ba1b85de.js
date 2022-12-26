import{_ as t,W as i,X as l,Y as n,Z as s,$ as e,a0 as p,D as c}from"./framework-0cf5f349.js";const o={},d=p(`<h1 id="springboot集成jsp" tabindex="-1"><a class="header-anchor" href="#springboot集成jsp" aria-hidden="true">#</a> SpringBoot集成JSP</h1><h2 id="_1-项目集成" tabindex="-1"><a class="header-anchor" href="#_1-项目集成" aria-hidden="true">#</a> 1. 项目集成</h2><ol><li><p>添加依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>   <span class="token comment">&lt;!-- jsp --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>javax.servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>jstl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.tomcat.embed<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>tomcat-embed-jasper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--            &lt;scope&gt;provided&lt;/scope&gt;--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切记要注释掉<code>&lt;scope&gt;provided&lt;/scope&gt;</code>，网上很多教程都添加了该字段，最终导致用springboot main方法启动，访问一直404。</p></li><li><p>修改配置文件</p><p>在<code>application.properties</code>配置文件中添加jsp相关配置:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring.mvc.view.prefix=/WEB-INF/jsp/
spring.mvc.view.suffix=.jsp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建jsp文件</p><ol><li><p>在<code>src/main</code>下创建<code>webapp/WEB-INF/jsp</code>文件夹。</p><p>创建的webapp会有个小蓝点的特殊标识。如没有请配置</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012095417642.png" alt="image-20201012095417642" tabindex="0" loading="lazy"><figcaption>image-20201012095417642</figcaption></figure></li></ol></li><li><p>在<code>jsp</code>文件夹下创建<code>index.jsp</code></p><div class="language-jsp line-numbers-mode" data-ext="jsp"><pre class="language-jsp"><code>
&lt;!DOCTYPE html&gt;

&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Hello&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
Hello,\${name}
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012100215862.png" alt="image-20201012100215862" tabindex="0" loading="lazy"><figcaption>image-20201012100215862</figcaption></figure><ol start="4"><li><p>创建controller</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Controller
@RequestMapping(&quot;/&quot;)
public class IndexController {
    
    @GetMapping(&quot;/&quot;)
    public String index(Model model){
        model.addAttribute(&quot;name&quot;, &quot;jsp测试&quot;);
        return &quot;index&quot;;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动服务</p><ul><li><p>以SpringBoot 的方式启动（大部分项目都以这种方式启动，所以移除 <code>&lt;scope&gt;provided&lt;/scope&gt;</code>）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JspDemoApplication</span>  <span class="token keyword">extends</span> <span class="token class-name">SpringBootServletInitializer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">SpringApplicationBuilder</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">SpringApplicationBuilder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 注意这里要指向原先用main方法执行的Application启动类</span>
        <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">sources</span><span class="token punctuation">(</span><span class="token class-name">JspDemoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">JspDemoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>通过spring-boot:run启动服务,idea里直接双击即可:</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012100720902.png" alt="image-20201012100720902" tabindex="0" loading="lazy"><figcaption>image-20201012100720902</figcaption></figure></li></ul></li></ol><h2 id="_2-常见问题" tabindex="-1"><a class="header-anchor" href="#_2-常见问题" aria-hidden="true">#</a> 2. 常见问题</h2><h3 id="_2-1-webapp-没有标识" tabindex="-1"><a class="header-anchor" href="#_2-1-webapp-没有标识" aria-hidden="true">#</a> 2.1 webapp 没有标识</h3><p>参考如下图配置</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20201012095417642.png" alt="image-20201012095417642" tabindex="0" loading="lazy"><figcaption>image-20201012095417642</figcaption></figure><h3 id="_2-2-jsp访问404" tabindex="-1"><a class="header-anchor" href="#_2-2-jsp访问404" aria-hidden="true">#</a> 2.2 JSP访问404</h3><p>引入依赖时 <code>&lt;scope&gt;provided&lt;/scope&gt;</code> 没有注释掉，IntelliJ IDEA不会将的依赖注入到类路径中,</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &lt;dependency&gt;
 &lt;groupId&gt;org.apache.tomcat.embed&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-embed-jasper&lt;/artifactId&gt;
&lt;!--            &lt;scope&gt;provided&lt;/scope&gt;--&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,13),u={href:"https://blog.csdn.net/gnail_oug/article/details/80237871",target:"_blank",rel:"noopener noreferrer"},r={href:"https://my.oschina.net/u/2382040/blog/1799102",target:"_blank",rel:"noopener noreferrer"};function g(v,m){const a=c("ExternalLinkIcon");return i(),l("div",null,[d,n("p",null,[n("a",u,[s("Spring Boot教程(十)：Spring Boot集成jsp"),e(a)])]),n("p",null,[n("a",r,[s("SpringBoot集成Jsp出错（404）"),e(a)])])])}const k=t(o,[["render",g],["__file","templates-j-jsp-started.html.vue"]]);export{k as default};
