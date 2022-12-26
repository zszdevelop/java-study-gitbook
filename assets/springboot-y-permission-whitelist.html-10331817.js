import{_ as n,W as s,X as a,a0 as t}from"./framework-0cf5f349.js";const e={},p=t(`<h1 id="springboot-starter-权限白名单自动化配置" tabindex="-1"><a class="header-anchor" href="#springboot-starter-权限白名单自动化配置" aria-hidden="true">#</a> SpringBoot-Starter - 权限白名单自动化配置</h1><h2 id="_1-自定义步骤" tabindex="-1"><a class="header-anchor" href="#_1-自定义步骤" aria-hidden="true">#</a> 1. 自定义步骤</h2><h3 id="_1-1-引入springboot-自动化配置依赖" tabindex="-1"><a class="header-anchor" href="#_1-1-引入springboot-自动化配置依赖" aria-hidden="true">#</a> 1.1 引入SpringBoot 自动化配置依赖</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-configuration-processor&lt;/artifactId&gt;
    &lt;optional&gt;true&lt;/optional&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-创建属性类" tabindex="-1"><a class="header-anchor" href="#_1-2-创建属性类" aria-hidden="true">#</a> 1.2 创建属性类</h3><p>创建属性类，prefix = “ywt.cloud.security”代表该项目在属性文件中配置的前缀，即可以在属性文件中通过 ywt.cloud.security.anonUris=/login，就可以改变属性类字段 anonUris 的值了。</p><ul><li>配置 anonUris: 配置免认证资源路径</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;ywt.cloud.security&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">YwtCloudSecurityProperties</span> <span class="token punctuation">{</span>


    <span class="token doc-comment comment">/**
     * 是否开启安全配置
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> enable<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 配置需要认证的uri，默认为所有/**
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> authUri <span class="token operator">=</span> <span class="token class-name">EndpointConstant</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 免认证资源路径，支持通配符
     * 多个值时使用逗号分隔
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> anonUris<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 是否只能通过网关获取资源
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> onlyFetchByGateway <span class="token operator">=</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">getEnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> enable<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setEnable</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> enable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>enable <span class="token operator">=</span> enable<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAuthUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> authUri<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAuthUri</span><span class="token punctuation">(</span><span class="token class-name">String</span> authUri<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>authUri <span class="token operator">=</span> authUri<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAnonUris</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> anonUris<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAnonUris</span><span class="token punctuation">(</span><span class="token class-name">String</span> anonUris<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>anonUris <span class="token operator">=</span> anonUris<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">getOnlyFetchByGateway</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> onlyFetchByGateway<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setOnlyFetchByGateway</span><span class="token punctuation">(</span><span class="token class-name">Boolean</span> onlyFetchByGateway<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>onlyFetchByGateway <span class="token operator">=</span> onlyFetchByGateway<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;FebsCloudSecurityProperties{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;enable=&quot;</span> <span class="token operator">+</span> enable <span class="token operator">+</span>
                <span class="token string">&quot;, authUri=&#39;&quot;</span> <span class="token operator">+</span> authUri <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, anonUris=&#39;&quot;</span> <span class="token operator">+</span> anonUris <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, onlyFetchByGateway=&quot;</span> <span class="token operator">+</span> onlyFetchByGateway <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-创建自动配置类" tabindex="-1"><a class="header-anchor" href="#_1-3-创建自动配置类" aria-hidden="true">#</a> 1.3 创建自动配置类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableGlobalMethodSecurity</span><span class="token punctuation">(</span>prePostEnabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">YwtCloudSecurityProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;ywt.cloud.security.enable&quot;</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span> matchIfMissing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">YwtCloudSecurityAutoconfigure</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;accessDeniedHandler&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">YwtAccessDeniedHandler</span> <span class="token function">accessDeniedHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">YwtAccessDeniedHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;authenticationEntryPoint&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">YwtAuthExceptionEntryPoint</span> <span class="token function">authenticationEntryPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">YwtAuthExceptionEntryPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">PasswordEncoder</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">YwtCloudSecurityInteceptorConfigure</span> <span class="token function">febsCloudSecurityInteceptorConfigure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">YwtCloudSecurityInteceptorConfigure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RequestInterceptor</span> <span class="token function">oauth2FeignRequestInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> requestTemplate <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> gatewayToken <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token class-name">Base64Utils</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token class-name">XfConstant</span><span class="token punctuation">.</span><span class="token constant">GATEWAY_TOKEN_VALUE</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            requestTemplate<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token class-name">XfConstant</span><span class="token punctuation">.</span><span class="token constant">GATEWAY_TOKEN_HEADER</span><span class="token punctuation">,</span> gatewayToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> authorizationToken <span class="token operator">=</span> <span class="token class-name">FebsUtil</span><span class="token punctuation">.</span><span class="token function">getCurrentTokenValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>authorizationToken<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                requestTemplate<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token class-name">HttpHeaders</span><span class="token punctuation">.</span><span class="token constant">AUTHORIZATION</span><span class="token punctuation">,</span> <span class="token class-name">XfConstant</span><span class="token punctuation">.</span><span class="token constant">OAUTH2_TOKEN_TYPE</span> <span class="token operator">+</span> authorizationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-meta-inf-目录下创建-spring-factories" tabindex="-1"><a class="header-anchor" href="#_1-4-meta-inf-目录下创建-spring-factories" aria-hidden="true">#</a> 1.4 META-INF 目录下创建 spring.factories</h3><p>在 META-INF 目录下创建 spring.factories，因为 SpringBoot 自动化配置最终就是要扫描 META-INF/spring.factories 来加载项目的自动化配置类。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
com.ywt.common.security.starter.configure.YwtCloudSecurityAutoconfigure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-引用starter" tabindex="-1"><a class="header-anchor" href="#_2-引用starter" aria-hidden="true">#</a> 2. 引用Starter</h2><h3 id="_2-1-另一个项目引入-starter" tabindex="-1"><a class="header-anchor" href="#_2-1-另一个项目引入-starter" aria-hidden="true">#</a> 2.1 另一个项目引入 starter</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
   &lt;groupId&gt;com.ywt&lt;/groupId&gt;
   &lt;artifactId&gt;ywt-common-security-starter&lt;/artifactId&gt;
   &lt;version&gt;\${ywt-cloud.version}&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 application.properties 中添加属性：</p><h3 id="_2-2-这样就配置了免登陆的地址" tabindex="-1"><a class="header-anchor" href="#_2-2-这样就配置了免登陆的地址" aria-hidden="true">#</a> 2.2 这样就配置了免登陆的地址</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ywt:
  cloud:
    security:
      enable: true
      anon-uris: /actuator/**,/v2/api-docs,/v2/api-docs-ext,/wx/**
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-在-springboot-主程序中-使用-enableywtcloudresourceserver" tabindex="-1"><a class="header-anchor" href="#_2-3-在-springboot-主程序中-使用-enableywtcloudresourceserver" aria-hidden="true">#</a> 2.3 在 SpringBoot 主程序中 使用 @EnableYwtCloudResourceServer</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication
@EnableYwtCloudResourceServer
public class YwtServerWeixinApplication {

	public static void main(String[] args) {
		SpringApplication.run(YwtServerWeixinApplication.class, args);
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-注解-enableywtcloudresourceserver-的来龙去脉" tabindex="-1"><a class="header-anchor" href="#_3-注解-enableywtcloudresourceserver-的来龙去脉" aria-hidden="true">#</a> 3. 注解@EnableYwtCloudResourceServer 的来龙去脉</h2><h3 id="_3-1-创建注解类" tabindex="-1"><a class="header-anchor" href="#_3-1-创建注解类" aria-hidden="true">#</a> 3.1 创建注解类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">YwtCloudResourceServerConfigure</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">EnableYwtCloudResourceServer</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@Import 注解的最主要功能就是导入额外的配置信息</strong></p><h3 id="_3-2-直接导入配置类-configuration-类" tabindex="-1"><a class="header-anchor" href="#_3-2-直接导入配置类-configuration-类" aria-hidden="true">#</a> 3.2 直接导入配置类（@Configuration 类）</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableResourceServer</span>
<span class="token annotation punctuation">@EnableAutoConfiguration</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token class-name">UserDetailsServiceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">YwtCloudResourceServerConfigure</span> <span class="token keyword">extends</span> <span class="token class-name">ResourceServerConfigurerAdapter</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">YwtCloudSecurityProperties</span> properties<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">YwtAccessDeniedHandler</span> accessDeniedHandler<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">YwtAuthExceptionEntryPoint</span> exceptionEntryPoint<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setProperties</span><span class="token punctuation">(</span><span class="token class-name">YwtCloudSecurityProperties</span> properties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>properties <span class="token operator">=</span> properties<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAccessDeniedHandler</span><span class="token punctuation">(</span><span class="token class-name">YwtAccessDeniedHandler</span> accessDeniedHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>accessDeniedHandler <span class="token operator">=</span> accessDeniedHandler<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setExceptionEntryPoint</span><span class="token punctuation">(</span><span class="token class-name">YwtAuthExceptionEntryPoint</span> exceptionEntryPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>exceptionEntryPoint <span class="token operator">=</span> exceptionEntryPoint<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> anonUrls <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">splitByWholeSeparatorPreserveAllTokens</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getAnonUris</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ArrayUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>anonUrls<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            anonUrls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getAuthUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span>anonUrls<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span>properties<span class="token punctuation">.</span><span class="token function">getAuthUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">ResourceServerSecurityConfigurer</span> resources<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        resources<span class="token punctuation">.</span><span class="token function">authenticationEntryPoint</span><span class="token punctuation">(</span>exceptionEntryPoint<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">accessDeniedHandler</span><span class="token punctuation">(</span>accessDeniedHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","springboot-y-permission-whitelist.html.vue"]]);export{r as default};
