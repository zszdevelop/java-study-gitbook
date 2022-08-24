import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="druid\u591A\u6570\u636E\u6E90\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#druid\u591A\u6570\u636E\u6E90\u914D\u7F6E" aria-hidden="true">#</a> Druid\u591A\u6570\u636E\u6E90\u914D\u7F6E</h1><p>\u672C\u7BC7\u4ECB\u7ECD\u5728 SpringBoot \u4E0B\u5982\u4F55\u914D\u7F6EDruid \u591A\u6570\u636E\u6E90</p><h2 id="\u96C6\u6210\u6B65\u9AA4\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u96C6\u6210\u6B65\u9AA4\u76EE\u5F55" aria-hidden="true">#</a> \u96C6\u6210\u6B65\u9AA4\u76EE\u5F55</h2><ol><li>\u5F15\u5165jar\u5305</li><li>\u8BBE\u7F6E\u914D\u7F6E\u53C2\u6570</li><li>\u7F16\u5199\u914D\u7F6E\u6587\u4EF6\u4E0E <ol><li>\u7F16\u5199\u6570\u636E\u6E90\u5E38\u91CF/\u679A\u4E3E</li><li>\u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90</li><li>\u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E</li><li>\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3</li><li>\u8BBE\u7F6E\u6570\u636E\u6E90 AOP \u4EE3\u7406</li></ol></li><li>\u4FEE\u6539\u542F\u52A8\u6587\u4EF6</li></ol><h2 id="\u5177\u4F53\u96C6\u6210\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u5177\u4F53\u96C6\u6210\u6B65\u9AA4" aria-hidden="true">#</a> \u5177\u4F53\u96C6\u6210\u6B65\u9AA4</h2><h3 id="_1-\u5F15\u5165jar\u5305" tabindex="-1"><a class="header-anchor" href="#_1-\u5F15\u5165jar\u5305" aria-hidden="true">#</a> 1.\u5F15\u5165jar\u5305</h3><p>\u4EE5\u6211\u4EEC\u516C\u53F8\u9879\u76EE\u4E3A\u4F8B\uFF0C\u6570\u636E\u5E93\u4E3B\u8981\u4F7F\u7528<code>oracle</code> \u548C \u56FD\u4EA7\u6570\u636E\u5E93 <code>gbase</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!-- oracle\u9A71\u52A8 --&gt;\n&lt;dependency&gt;\n   &lt;groupId&gt;com.oracle&lt;/groupId&gt;\n   &lt;artifactId&gt;ojdbc6&lt;/artifactId&gt;\n   &lt;version&gt;11.2.0.4.0&lt;/version&gt;\n&lt;/dependency&gt;\n\n\n&lt;!--ifxjdbc gbase--&gt;\n&lt;dependency&gt;\n   &lt;groupId&gt;com.informix&lt;/groupId&gt;\n   &lt;artifactId&gt;ifxjdbc&lt;/artifactId&gt;\n   &lt;version&gt;1.0.1&lt;/version&gt;\n&lt;/dependency&gt;\n\n&lt;!-- druid\u6570\u636E\u6E90\u9A71\u52A8 --&gt;\n&lt;dependency&gt;\n   &lt;groupId&gt;com.alibaba&lt;/groupId&gt;\n   &lt;artifactId&gt;druid-spring-boot-starter&lt;/artifactId&gt;\n   &lt;version&gt;1.1.10&lt;/version&gt;\n&lt;/dependency&gt;\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u914D\u7F6E\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_2-\u914D\u7F6E\u53C2\u6570" aria-hidden="true">#</a> 2.\u914D\u7F6E\u53C2\u6570</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring:\n  profiles: dev\n  application:\n    name: app-platform\n  datasource:\n    druid:\n      orac: #\u6570\u636E\u6E901 oracle  \n        # \u6570\u636E\u5E93\u8BBF\u95EE\u914D\u7F6E, \u4F7F\u7528druid\u6570\u636E\u6E90\n        type: com.alibaba.druid.pool.DruidDataSource\n        driver-class-name: oracle.jdbc.driver.OracleDriver\n        url: jdbc:oracle:thin:@192.168.0.xx:1521:orcl\n        username: username\n        password: password\n      gbase:#\u6570\u636E\u6E902 gbase  \n        driver-class-name: com.informix.jdbc.IfxDriver\n        type: com.alibaba.druid.pool.DruidDataSource\n        name: test\n        url: jdbc:informix-sqli://192.168.0.xx:9088/app_lzf:INFORMIXSERVER=gbaseserver;\n        username: myusername\n        password: mypassword\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>###3.\u7F16\u5199\u914D\u7F6E\u6587\u4EF6</p><p>####3.1.\u5B9A\u4E49\u6570\u636E\u6E90\u540D\u79F0\u5E38\u91CF</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface DataSourceNames {\n    String ORAC = &quot;orac&quot;;\n    String GBASE = &quot;gbase&quot;;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-\u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90" tabindex="-1"><a class="header-anchor" href="#_3-2-\u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90" aria-hidden="true">#</a> 3.2 \u521B\u5EFA\u52A8\u6001\u6570\u636E\u6E90</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**\n * \u52A8\u6001\u6570\u636E\u6E90\n */\npublic class DynamicDataSource extends AbstractRoutingDataSource {\n    private static final ThreadLocal&lt;String&gt; contextHolder = new ThreadLocal&lt;&gt;();\n\n    /**\n     * \u914D\u7F6EDataSource, defaultTargetDataSource\u4E3A\u4E3B\u6570\u636E\u5E93\n     */\n    public DynamicDataSource(DataSource defaultTargetDataSource, Map&lt;Object, Object&gt; targetDataSources) {\n        super.setDefaultTargetDataSource(defaultTargetDataSource);\n        super.setTargetDataSources(targetDataSources);\n        super.afterPropertiesSet();\n    }\n\n    @Override\n    protected Object determineCurrentLookupKey() {\n        return getDataSource();\n    }\n\n    public static void setDataSource(String dataSource) {\n        contextHolder.set(dataSource);\n    }\n\n    public static String getDataSource() {\n        return contextHolder.get();\n    }\n\n    public static void clearDataSource() {\n        contextHolder.remove();\n    }\n\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-\u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_3-3-\u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E" aria-hidden="true">#</a> 3.3 \u52A8\u6001\u6570\u636E\u6E90\u914D\u7F6E</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n/**\n * \u914D\u7F6E\u591A\u6570\u636E\u6E90\n */\n@Configuration\npublic class DynamicDataSourceConfig {\n\n    /**\n     * \u521B\u5EFA DataSource Bean\n     * */\n\n    @Bean\n    @ConfigurationProperties(&quot;spring.datasource.druid.orac&quot;)\n    public DataSource oneDataSource(){\n        DataSource dataSource = DruidDataSourceBuilder.create().build();\n        return dataSource;\n    }\n\n    @Bean\n    @ConfigurationProperties(&quot;spring.datasource.druid.gbase&quot;)\n    public DataSource twoDataSource(){\n        DataSource dataSource = DruidDataSourceBuilder.create().build();\n        return dataSource;\n    }\n\n    /**\n     * \u5982\u679C\u8FD8\u6709\u6570\u636E\u6E90,\u5728\u8FD9\u7EE7\u7EED\u6DFB\u52A0 DataSource Bean\n     * */\n\n    @Bean\n    @Primary\n    public DynamicDataSource dataSource(DataSource oneDataSource, DataSource twoDataSource) {\n        Map&lt;Object, Object&gt; targetDataSources = new HashMap&lt;&gt;(2);\n        targetDataSources.put(DataSourceNames.ORAC, oneDataSource);\n        targetDataSources.put(DataSourceNames.GBASE, twoDataSource);\n        // \u8FD8\u6709\u6570\u636E\u6E90,\u5728targetDataSources\u4E2D\u7EE7\u7EED\u6DFB\u52A0\n        System.out.println(&quot;DataSources:&quot; + targetDataSources);\n        return new DynamicDataSource(oneDataSource, targetDataSources);\n    }\n}\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#_3-4-\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3" aria-hidden="true">#</a> 3.4.\u5B9A\u4E49\u52A8\u6001\u6570\u636E\u6E90\u6CE8\u89E3:</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**\n * \u591A\u6570\u636E\u6E90\u6CE8\u89E3\n */\n@Documented\n@Target({ElementType.METHOD})\n@Retention(RetentionPolicy.RUNTIME)\npublic @interface DataSource {\n    String value() default DataSourceNames.ORAC;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-\u8BBE\u7F6E\u6570\u636E\u6E90-aop-\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_3-4-\u8BBE\u7F6E\u6570\u636E\u6E90-aop-\u4EE3\u7406" aria-hidden="true">#</a> 3.4 \u8BBE\u7F6E\u6570\u636E\u6E90 AOP \u4EE3\u7406:</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * \u6570\u636E\u6E90AOP\u5207\u9762\u5904\u7406\n */</span>\n<span class="token annotation punctuation">@Aspect</span>\n<span class="token annotation punctuation">@Component</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataSourceAspect</span> <span class="token keyword">implements</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token doc-comment comment">/**\n     * \u5207\u70B9: \u6240\u6709\u914D\u7F6E DataSource \u6CE8\u89E3\u7684\u65B9\u6CD5\n     */</span>\n    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(com.ylzinfo.common.druid.DataSource)&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dataSourcePointCut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;dataSourcePointCut()&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> point<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token class-name">MethodSignature</span> signature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> point<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Method</span> method <span class="token operator">=</span> signature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">DataSource</span> ds <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// \u901A\u8FC7\u5224\u65AD DataSource \u4E2D\u7684\u503C\u6765\u5224\u65AD\u5F53\u524D\u65B9\u6CD5\u5E94\u7528\u54EA\u4E2A\u6570\u636E\u6E90</span>\n        <span class="token class-name">DynamicDataSource</span><span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u6570\u636E\u6E90: &quot;</span> <span class="token operator">+</span> ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;set datasource is &quot;</span> <span class="token operator">+</span> ds<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> point<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>\n            <span class="token class-name">DynamicDataSource</span><span class="token punctuation">.</span><span class="token function">clearDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;clean datasource&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-\u4FEE\u6539\u542F\u52A8\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_4-\u4FEE\u6539\u542F\u52A8\u6587\u4EF6" aria-hidden="true">#</a> 4.\u4FEE\u6539\u542F\u52A8\u6587\u4EF6</h3><p>\u5982\u679C\u8BBE\u7F6E\u4E86\u52A8\u6001\u6570\u636E\u6E90\uFF0C\u90A3\u4E48\u9700\u8981\u5C06\u81EA\u6709\u7684\u914D\u7F6E\u4F9D\u8D56\u53BB\u9664(DataSourceAutoConfiguration)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})\npublic class AppPlatformApplication {\n\n	public static void main(String[] args) {\n		SpringApplication.run(AppPlatformApplication.class, args);\n	}\n\n}\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u535A\u5BA2" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u535A\u5BA2" aria-hidden="true">#</a> \u53C2\u8003\u535A\u5BA2</h2>', 25);
const _hoisted_26 = {
  href: "https://my.oschina.net/u/3681868/blog/1813011",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_27 = /* @__PURE__ */ createTextVNode("SpringBoot--Druid\u591A\u6570\u636E\u6E90\u914D\u7F6E");
const _hoisted_28 = {
  href: "https://gitee.com/wenshao/druid/tree/master/druid-spring-boot-starter",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_29 = /* @__PURE__ */ createTextVNode("Druid\u914D\u7F6E");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_26, [
        _hoisted_27,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_28, [
        _hoisted_29,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Druid_______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Druid\u591A\u6570\u636E\u6E90\u914D\u7F6E.html.vue"]]);
export { Druid_______html as default };
