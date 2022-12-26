import{_ as i,W as t,X as l,Y as n,Z as s,$ as e,a0 as c,D as d}from"./framework-0cf5f349.js";const r={},u=c(`<h1 id="druid多数据源配置" tabindex="-1"><a class="header-anchor" href="#druid多数据源配置" aria-hidden="true">#</a> Druid多数据源配置</h1><p>本篇介绍在 SpringBoot 下如何配置Druid 多数据源</p><h2 id="集成步骤目录" tabindex="-1"><a class="header-anchor" href="#集成步骤目录" aria-hidden="true">#</a> 集成步骤目录</h2><ol><li>引入jar包</li><li>设置配置参数</li><li>编写配置文件与 <ol><li>编写数据源常量/枚举</li><li>创建动态数据源</li><li>动态数据源配置</li><li>定义动态数据源注解</li><li>设置数据源 AOP 代理</li></ol></li><li>修改启动文件</li></ol><h2 id="具体集成步骤" tabindex="-1"><a class="header-anchor" href="#具体集成步骤" aria-hidden="true">#</a> 具体集成步骤</h2><h3 id="_1-引入jar包" tabindex="-1"><a class="header-anchor" href="#_1-引入jar包" aria-hidden="true">#</a> 1.引入jar包</h3><p>以我们公司项目为例，数据库主要使用<code>oracle</code> 和 国产数据库 <code>gbase</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- oracle驱动 --&gt;
&lt;dependency&gt;
   &lt;groupId&gt;com.oracle&lt;/groupId&gt;
   &lt;artifactId&gt;ojdbc6&lt;/artifactId&gt;
   &lt;version&gt;11.2.0.4.0&lt;/version&gt;
&lt;/dependency&gt;


&lt;!--ifxjdbc gbase--&gt;
&lt;dependency&gt;
   &lt;groupId&gt;com.informix&lt;/groupId&gt;
   &lt;artifactId&gt;ifxjdbc&lt;/artifactId&gt;
   &lt;version&gt;1.0.1&lt;/version&gt;
&lt;/dependency&gt;

&lt;!-- druid数据源驱动 --&gt;
&lt;dependency&gt;
   &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
   &lt;artifactId&gt;druid-spring-boot-starter&lt;/artifactId&gt;
   &lt;version&gt;1.1.10&lt;/version&gt;
&lt;/dependency&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置参数" tabindex="-1"><a class="header-anchor" href="#_2-配置参数" aria-hidden="true">#</a> 2.配置参数</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  profiles: dev
  application:
    name: app-platform
  datasource:
    druid:
      orac: #数据源1 oracle  
        # 数据库访问配置, 使用druid数据源
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: oracle.jdbc.driver.OracleDriver
        url: jdbc:oracle:thin:@192.168.0.xx:1521:orcl
        username: username
        password: password
      gbase:#数据源2 gbase  
        driver-class-name: com.informix.jdbc.IfxDriver
        type: com.alibaba.druid.pool.DruidDataSource
        name: test
        url: jdbc:informix-sqli://192.168.0.xx:9088/app_lzf:INFORMIXSERVER=gbaseserver;
        username: myusername
        password: mypassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>###3.编写配置文件</p><p>####3.1.定义数据源名称常量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface DataSourceNames {
    String ORAC = &quot;orac&quot;;
    String GBASE = &quot;gbase&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-创建动态数据源" tabindex="-1"><a class="header-anchor" href="#_3-2-创建动态数据源" aria-hidden="true">#</a> 3.2 创建动态数据源</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 动态数据源
 */
public class DynamicDataSource extends AbstractRoutingDataSource {
    private static final ThreadLocal&lt;String&gt; contextHolder = new ThreadLocal&lt;&gt;();

    /**
     * 配置DataSource, defaultTargetDataSource为主数据库
     */
    public DynamicDataSource(DataSource defaultTargetDataSource, Map&lt;Object, Object&gt; targetDataSources) {
        super.setDefaultTargetDataSource(defaultTargetDataSource);
        super.setTargetDataSources(targetDataSources);
        super.afterPropertiesSet();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return getDataSource();
    }

    public static void setDataSource(String dataSource) {
        contextHolder.set(dataSource);
    }

    public static String getDataSource() {
        return contextHolder.get();
    }

    public static void clearDataSource() {
        contextHolder.remove();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-动态数据源配置" tabindex="-1"><a class="header-anchor" href="#_3-3-动态数据源配置" aria-hidden="true">#</a> 3.3 动态数据源配置</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
/**
 * 配置多数据源
 */
@Configuration
public class DynamicDataSourceConfig {

    /**
     * 创建 DataSource Bean
     * */

    @Bean
    @ConfigurationProperties(&quot;spring.datasource.druid.orac&quot;)
    public DataSource oneDataSource(){
        DataSource dataSource = DruidDataSourceBuilder.create().build();
        return dataSource;
    }

    @Bean
    @ConfigurationProperties(&quot;spring.datasource.druid.gbase&quot;)
    public DataSource twoDataSource(){
        DataSource dataSource = DruidDataSourceBuilder.create().build();
        return dataSource;
    }

    /**
     * 如果还有数据源,在这继续添加 DataSource Bean
     * */

    @Bean
    @Primary
    public DynamicDataSource dataSource(DataSource oneDataSource, DataSource twoDataSource) {
        Map&lt;Object, Object&gt; targetDataSources = new HashMap&lt;&gt;(2);
        targetDataSources.put(DataSourceNames.ORAC, oneDataSource);
        targetDataSources.put(DataSourceNames.GBASE, twoDataSource);
        // 还有数据源,在targetDataSources中继续添加
        System.out.println(&quot;DataSources:&quot; + targetDataSources);
        return new DynamicDataSource(oneDataSource, targetDataSources);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-定义动态数据源注解" tabindex="-1"><a class="header-anchor" href="#_3-4-定义动态数据源注解" aria-hidden="true">#</a> 3.4.定义动态数据源注解:</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 多数据源注解
 */
@Documented
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DataSource {
    String value() default DataSourceNames.ORAC;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-设置数据源-aop-代理" tabindex="-1"><a class="header-anchor" href="#_3-4-设置数据源-aop-代理" aria-hidden="true">#</a> 3.4 设置数据源 AOP 代理:</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 数据源AOP切面处理
 */</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceAspect</span> <span class="token keyword">implements</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 切点: 所有配置 DataSource 注解的方法
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(com.ylzinfo.common.druid.DataSource)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dataSourcePointCut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;dataSourcePointCut()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> point<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token class-name">MethodSignature</span> signature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> point<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Method</span> method <span class="token operator">=</span> signature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DataSource</span> ds <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 通过判断 DataSource 中的值来判断当前方法应用哪个数据源</span>
        <span class="token class-name">DynamicDataSource</span><span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;当前数据源: &quot;</span> <span class="token operator">+</span> ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;set datasource is &quot;</span> <span class="token operator">+</span> ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> point<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">DynamicDataSource</span><span class="token punctuation">.</span><span class="token function">clearDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;clean datasource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-修改启动文件" tabindex="-1"><a class="header-anchor" href="#_4-修改启动文件" aria-hidden="true">#</a> 4.修改启动文件</h3><p>如果设置了动态数据源，那么需要将自有的配置依赖去除(DataSourceAutoConfiguration)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class AppPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppPlatformApplication.class, args);
	}

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考博客" tabindex="-1"><a class="header-anchor" href="#参考博客" aria-hidden="true">#</a> 参考博客</h2>`,25),o={href:"https://my.oschina.net/u/3681868/blog/1813011",target:"_blank",rel:"noopener noreferrer"},p={href:"https://gitee.com/wenshao/druid/tree/master/druid-spring-boot-starter",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const a=d("ExternalLinkIcon");return t(),l("div",null,[u,n("p",null,[n("a",o,[s("SpringBoot--Druid多数据源配置"),e(a)])]),n("p",null,[n("a",p,[s("Druid配置"),e(a)])])])}const g=i(r,[["render",v],["__file","dbcp-x-druid-mutil.html.vue"]]);export{g as default};
