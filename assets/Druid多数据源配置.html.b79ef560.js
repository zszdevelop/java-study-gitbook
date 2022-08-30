import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";import{o as t,c as l,a as n,b as s,e as c,d as e,r as d}from"./app.24aaacd5.js";const r={},o=c(`<h1 id="druid\u591A\u6570\u636E\u6E90\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#druid\u591A\u6570\u636E\u6E90\u914D\u7F6E" aria-hidden="true">#</a> Druid\u591A\u6570\u636E\u6E90\u914D\u7F6E</h1><p>\u672C\u7BC7\u4ECB\u7ECD\u5728 SpringBoot \u4E0B\u5982\u4F55\u914D\u7F6EDruid \u591A\u6570\u636E\u6E90</p><h2 id="\u96C6\u6210\u6B65\u9AA4\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u96C6\u6210\u6B65\u9AA4\u76EE\u5F55" aria-hidden="true">#</a> \u96C6\u6210\u6B65\u9AA4\u76EE\u5F55</h2><ol><li>\u5F15\u5165jar\u5305</li><li>\u8BBE\u7F6E\u914D\u7F6E\u53C2\u6570</li><li>\u7F16\u5199\u914D\u7F6E\u6587\u4EF6\u4E0E <ol><li>\u7F16\u5199\u6570\u636E\u6E90\u5E38\u91CF/\u679A\u4E3E</li><li>\u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90</li><li>\u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E</li><li>\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3</li><li>\u8BBE\u7F6E\u6570\u636E\u6E90 AOP \u4EE3\u7406</li></ol></li><li>\u4FEE\u6539\u542F\u52A8\u6587\u4EF6</li></ol><h2 id="\u5177\u4F53\u96C6\u6210\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u5177\u4F53\u96C6\u6210\u6B65\u9AA4" aria-hidden="true">#</a> \u5177\u4F53\u96C6\u6210\u6B65\u9AA4</h2><h3 id="_1-\u5F15\u5165jar\u5305" tabindex="-1"><a class="header-anchor" href="#_1-\u5F15\u5165jar\u5305" aria-hidden="true">#</a> 1.\u5F15\u5165jar\u5305</h3><p>\u4EE5\u6211\u4EEC\u516C\u53F8\u9879\u76EE\u4E3A\u4F8B\uFF0C\u6570\u636E\u5E93\u4E3B\u8981\u4F7F\u7528<code>oracle</code> \u548C \u56FD\u4EA7\u6570\u636E\u5E93 <code>gbase</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!-- oracle\u9A71\u52A8 --&gt;
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

&lt;!-- druid\u6570\u636E\u6E90\u9A71\u52A8 --&gt;
&lt;dependency&gt;
   &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
   &lt;artifactId&gt;druid-spring-boot-starter&lt;/artifactId&gt;
   &lt;version&gt;1.1.10&lt;/version&gt;
&lt;/dependency&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u914D\u7F6E\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_2-\u914D\u7F6E\u53C2\u6570" aria-hidden="true">#</a> 2.\u914D\u7F6E\u53C2\u6570</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring:
  profiles: dev
  application:
    name: app-platform
  datasource:
    druid:
      orac: #\u6570\u636E\u6E901 oracle  
        # \u6570\u636E\u5E93\u8BBF\u95EE\u914D\u7F6E, \u4F7F\u7528druid\u6570\u636E\u6E90
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: oracle.jdbc.driver.OracleDriver
        url: jdbc:oracle:thin:@192.168.0.xx:1521:orcl
        username: username
        password: password
      gbase:#\u6570\u636E\u6E902 gbase  
        driver-class-name: com.informix.jdbc.IfxDriver
        type: com.alibaba.druid.pool.DruidDataSource
        name: test
        url: jdbc:informix-sqli://192.168.0.xx:9088/app_lzf:INFORMIXSERVER=gbaseserver;
        username: myusername
        password: mypassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>###3.\u7F16\u5199\u914D\u7F6E\u6587\u4EF6</p><p>####3.1.\u5B9A\u4E49\u6570\u636E\u6E90\u540D\u79F0\u5E38\u91CF</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface DataSourceNames {
    String ORAC = &quot;orac&quot;;
    String GBASE = &quot;gbase&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-\u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90" tabindex="-1"><a class="header-anchor" href="#_3-2-\u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90" aria-hidden="true">#</a> 3.2 \u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
 * \u52A8\u6001\u6570\u636E\u6E90
 */
public class DynamicDataSource extends AbstractRoutingDataSource {
    private static final ThreadLocal&lt;String&gt; contextHolder = new ThreadLocal&lt;&gt;();

    /**
     * \u914D\u7F6EDataSource, defaultTargetDataSource\u4E3A\u4E3B\u6570\u636E\u5E93
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-\u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_3-3-\u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E" aria-hidden="true">#</a> 3.3 \u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
/**
 * \u914D\u7F6E\u591A\u6570\u636E\u6E90
 */
@Configuration
public class DynamicDataSourceConfig {

    /**
     * \u521B\u5EFA DataSource Bean
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
     * \u5982\u679C\u8FD8\u6709\u6570\u636E\u6E90,\u5728\u8FD9\u7EE7\u7EED\u6DFB\u52A0 DataSource Bean
     * */

    @Bean
    @Primary
    public DynamicDataSource dataSource(DataSource oneDataSource, DataSource twoDataSource) {
        Map&lt;Object, Object&gt; targetDataSources = new HashMap&lt;&gt;(2);
        targetDataSources.put(DataSourceNames.ORAC, oneDataSource);
        targetDataSources.put(DataSourceNames.GBASE, twoDataSource);
        // \u8FD8\u6709\u6570\u636E\u6E90,\u5728targetDataSources\u4E2D\u7EE7\u7EED\u6DFB\u52A0
        System.out.println(&quot;DataSources:&quot; + targetDataSources);
        return new DynamicDataSource(oneDataSource, targetDataSources);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#_3-4-\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3" aria-hidden="true">#</a> 3.4.\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3:</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
 * \u591A\u6570\u636E\u6E90\u6CE8\u89E3
 */
@Documented
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DataSource {
    String value() default DataSourceNames.ORAC;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-\u8BBE\u7F6E\u6570\u636E\u6E90-aop-\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_3-4-\u8BBE\u7F6E\u6570\u636E\u6E90-aop-\u4EE3\u7406" aria-hidden="true">#</a> 3.4 \u8BBE\u7F6E\u6570\u636E\u6E90 AOP \u4EE3\u7406:</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * \u6570\u636E\u6E90AOP\u5207\u9762\u5904\u7406
 */</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceAspect</span> <span class="token keyword">implements</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u5207\u70B9: \u6240\u6709\u914D\u7F6E DataSource \u6CE8\u89E3\u7684\u65B9\u6CD5
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(com.ylzinfo.common.druid.DataSource)&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dataSourcePointCut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;dataSourcePointCut()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> point<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token class-name">MethodSignature</span> signature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> point<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Method</span> method <span class="token operator">=</span> signature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DataSource</span> ds <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u901A\u8FC7\u5224\u65AD DataSource \u4E2D\u7684\u503C\u6765\u5224\u65AD\u5F53\u524D\u65B9\u6CD5\u5E94\u7528\u54EA\u4E2A\u6570\u636E\u6E90</span>
        <span class="token class-name">DynamicDataSource</span><span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u6570\u636E\u6E90: &quot;</span> <span class="token operator">+</span> ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-\u4FEE\u6539\u542F\u52A8\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_4-\u4FEE\u6539\u542F\u52A8\u6587\u4EF6" aria-hidden="true">#</a> 4.\u4FEE\u6539\u542F\u52A8\u6587\u4EF6</h3><p>\u5982\u679C\u8BBE\u7F6E\u4E86\u52A8\u6001\u6570\u636E\u6E90\uFF0C\u90A3\u4E48\u9700\u8981\u5C06\u81EA\u6709\u7684\u914D\u7F6E\u4F9D\u8D56\u53BB\u9664(DataSourceAutoConfiguration)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class AppPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppPlatformApplication.class, args);
	}

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u535A\u5BA2" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u535A\u5BA2" aria-hidden="true">#</a> \u53C2\u8003\u535A\u5BA2</h2>`,25),u={href:"https://my.oschina.net/u/3681868/blog/1813011",target:"_blank",rel:"noopener noreferrer"},p=e("SpringBoot--Druid\u591A\u6570\u636E\u6E90\u914D\u7F6E"),v={href:"https://gitee.com/wenshao/druid/tree/master/druid-spring-boot-starter",target:"_blank",rel:"noopener noreferrer"},m=e("Druid\u914D\u7F6E");function b(k,g){const a=d("ExternalLinkIcon");return t(),l("div",null,[o,n("p",null,[n("a",u,[p,s(a)])]),n("p",null,[n("a",v,[m,s(a)])])])}var D=i(r,[["render",b],["__file","Druid\u591A\u6570\u636E\u6E90\u914D\u7F6E.html.vue"]]);export{D as default};
