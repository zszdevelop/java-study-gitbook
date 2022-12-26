import{_ as t,W as l,X as p,Y as n,Z as a,$ as e,a0 as i,D as c}from"./framework-0cf5f349.js";const o={},r=i(`<h1 id="p6spy监控你的sql输出" tabindex="-1"><a class="header-anchor" href="#p6spy监控你的sql输出" aria-hidden="true">#</a> P6Spy监控你的SQL输出</h1><blockquote><p>mybatis 的日志只有基础sql语句，并没有完整的sql日志，在开发环境上排查问题实在太麻烦了</p></blockquote><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>P6Spy是一个可以用来在应用程序中拦截和修改数据操作语句的开源框架。通过P6Spy我们可以对SQL语句进行拦截，相当于一个SQL语句的记录器，这样我们可以用它来作相关的分析，比如性能分析。</p><p>P6SPY提供了如下几个功能：</p><ul><li><p>记录SQL语句的执行时间戳。</p></li><li><p>记录SQL语句类型。</p></li><li><p>记录SQL填入参数的和没有填入参数的SQL语句。</p></li><li><p>根据配置的时间控制SQL语句的执行时间，对超出时间的SQL语句输出到日志文件中。</p></li></ul><h2 id="_2-集成配置" tabindex="-1"><a class="header-anchor" href="#_2-集成配置" aria-hidden="true">#</a> 2. 集成配置</h2><p>配置步骤：</p><h3 id="_2-1-依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖" aria-hidden="true">#</a> 2.1 依赖</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>p6spy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>p6spy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.9.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-替换jdbc驱动" tabindex="-1"><a class="header-anchor" href="#_2-2-替换jdbc驱动" aria-hidden="true">#</a> 2.2 替换JDBC驱动</h3><p>将你的JDBC驱动替换为</p><div class="language-applescript line-numbers-mode" data-ext="applescript"><pre class="language-applescript"><code><span class="token comment"># 修改 JDBC 驱动为如下 P6SpyDriver 配置</span>
<span class="token comment"># 之前为：</span>
<span class="token comment"># spring.datasource.driver-class-name=com.mysql.jdbc.Driver</span>
spring.datasource.driver<span class="token operator">-</span><span class="token class-name">class</span><span class="token operator">-</span>name<span class="token operator">=</span>com.p6spy.engine.spy.P6SpyDriver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-修改数据库地址" tabindex="-1"><a class="header-anchor" href="#_2-3-修改数据库地址" aria-hidden="true">#</a> 2.3 修改数据库地址</h3><p>修改spring.datasource.url</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># 注意是 jdbc:p6spy:mysql</span>
<span class="token key attr-name">spring.datasource.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:p6spy:mysql://127.0.0.1:3306/test?useUnicode=true&amp;characterEncoding=UTF-8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-添加配置文件-spy-properties" tabindex="-1"><a class="header-anchor" href="#_2-4-添加配置文件-spy-properties" aria-hidden="true">#</a> 2.4 添加配置文件 spy.properties</h3><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token key attr-name">module.log</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory</span>
<span class="token comment"># 自定义日志打印,改成你自定义配置类的全类名</span>
<span class="token key attr-name">logMessageFormat</span><span class="token punctuation">=</span><span class="token value attr-value">com.zszdevelop.test.aop.P6SpyLogger</span>
<span class="token comment"># 使用日志系统记录sql</span>
<span class="token key attr-name">appender</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.spy.appender.Slf4JLogger</span>
<span class="token comment">## 配置记录Log例外</span>
<span class="token key attr-name">excludecategories</span><span class="token punctuation">=</span><span class="token value attr-value">info,debug,result,commit,resultset</span>
<span class="token comment"># 设置使用p6spy driver来做代理</span>
<span class="token key attr-name">deregisterdrivers</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 日期格式</span>
<span class="token key attr-name">dateformat</span><span class="token punctuation">=</span><span class="token value attr-value">yyyy-MM-dd HH:mm:ss</span>
<span class="token comment"># 实际驱动</span>
<span class="token key attr-name">driverlist</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.Driver</span>
<span class="token comment"># 是否开启慢SQL记录</span>
<span class="token comment">#outagedetection=true</span>
<span class="token comment"># 慢SQL记录标准 秒</span>
<span class="token comment">#outagedetectioninterval=2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># 自定义日志打印,改成你自定义配置类的全类名</span>
<span class="token key attr-name">logMessageFormat</span><span class="token punctuation">=</span><span class="token value attr-value">com.zszdevelop.test.aop.P6SpyLogger</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-自定义日志打印" tabindex="-1"><a class="header-anchor" href="#_2-5-自定义日志打印" aria-hidden="true">#</a> 2.5 自定义日志打印</h3><p>可以把 mybatis 占位符填进去，输入完整的sql日志</p><blockquote><p>自己想怎么打日志就怎么打</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 自定义日志
 * 默认com.p6spy.engine.spy.appender.SingleLineFormat
 *
 * <span class="token keyword">@author</span> zsz
 * <span class="token keyword">@date</span> 2022-06-16
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">P6SpyLogger</span> <span class="token keyword">implements</span> <span class="token class-name">MessageFormattingStrategy</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 日志格式
     *
     * <span class="token keyword">@param</span> <span class="token parameter">connectionId</span> 连接id
     * <span class="token keyword">@param</span> <span class="token parameter">now</span>          当前时间
     * <span class="token keyword">@param</span> <span class="token parameter">elapsed</span>      耗时多久
     * <span class="token keyword">@param</span> <span class="token parameter">category</span>     类别
     * <span class="token keyword">@param</span> <span class="token parameter">prepared</span>     mybatis带占位符的sql
     * <span class="token keyword">@param</span> <span class="token parameter">sql</span>          占位符换成参数的sql
     * <span class="token keyword">@param</span> <span class="token parameter">url</span>          sql连接的 url
     * <span class="token keyword">@return</span> 自定义格式日志
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">formatMessage</span><span class="token punctuation">(</span><span class="token keyword">int</span> connectionId<span class="token punctuation">,</span> <span class="token class-name">String</span> now<span class="token punctuation">,</span> <span class="token keyword">long</span> elapsed<span class="token punctuation">,</span> <span class="token class-name">String</span> category<span class="token punctuation">,</span> <span class="token class-name">String</span> prepared<span class="token punctuation">,</span> <span class="token class-name">String</span> sql<span class="token punctuation">,</span> <span class="token class-name">String</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> log <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;\\n-----------  SQL执行时间：%s   SQL执行耗时：%s ms  -----------\\n 执行的 SQL语句：%s\\n&quot;</span><span class="token punctuation">,</span> now<span class="token punctuation">,</span> elapsed<span class="token punctuation">,</span> sql<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;[\\\\s]+&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            log <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> log<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-spy-properties详细说明" tabindex="-1"><a class="header-anchor" href="#_3-spy-properties详细说明" aria-hidden="true">#</a> 3. spy.properties详细说明</h2><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># 指定应用的日志拦截模块,默认为com.p6spy.engine.spy.P6SpyFactory</span>
<span class="token key attr-name">modulelist</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.spy.P6SpyFactory,com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory</span>
<span class="token comment"># 真实JDBC driver , 多个以 逗号 分割 默认为空</span>
<span class="token key attr-name">driverlist</span><span class="token punctuation">=</span>
<span class="token comment"># 是否自动刷新 默认 flase</span>
<span class="token key attr-name">autoflush</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># 配置SimpleDateFormat日期格式 默认为空</span>
<span class="token key attr-name">dateformat</span><span class="token punctuation">=</span>
<span class="token comment"># 打印堆栈跟踪信息 默认flase</span>
<span class="token key attr-name">stacktrace</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># 如果 stacktrace=true，则可以指定具体的类名来进行过滤。</span>
<span class="token key attr-name">stacktraceclass</span><span class="token punctuation">=</span>
<span class="token comment"># 监测属性配置文件是否进行重新加载</span>
<span class="token key attr-name">reloadproperties</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># 属性配置文件重新加载的时间间隔，单位:秒 默认60s</span>
<span class="token key attr-name">reloadpropertiesinterval</span><span class="token punctuation">=</span><span class="token value attr-value">60</span>
<span class="token comment"># 指定 Log 的 appender，取值：</span>
<span class="token key attr-name">appender</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.spy.appender.Slf4JLogger</span>
<span class="token key attr-name">appender</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.spy.appender.StdoutLogger</span>
<span class="token key attr-name">appender</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.spy.appender.FileLogger</span>
<span class="token comment"># 指定 Log 的文件名 默认 spy.log</span>
<span class="token key attr-name">logfile</span><span class="token punctuation">=</span><span class="token value attr-value">spy.log</span>
<span class="token comment"># 指定是否每次是增加 Log，设置为 false 则每次都会先进行清空 默认true</span>
<span class="token key attr-name">append</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 指定日志输出样式 默认为com.p6spy.engine.spy.appender.SingleLineFormat , 单行输出 不格式化语句</span>
<span class="token key attr-name">logMessageFormat</span><span class="token punctuation">=</span><span class="token value attr-value">com.p6spy.engine.spy.appender.SingleLineFormat</span>
<span class="token comment"># 也可以采用 com.p6spy.engine.spy.appender.CustomLineFormat 来自定义输出样式, 默认值是%(currentTime)|%(executionTime)|%(category)|connection%(connectionId)|%(sqlSingleLine)</span>
<span class="token comment"># 可用的变量为:</span>
<span class="token comment"># %(connectionId) connection id</span>
<span class="token comment"># %(currentTime) 当前时间</span>
<span class="token comment"># %(executionTime) 执行耗时</span>
<span class="token comment"># %(category) 执行分组</span>
<span class="token comment"># %(effectiveSql) 提交的SQL 换行</span>
<span class="token comment"># %(effectiveSqlSingleLine) 提交的SQL 不换行显示</span>
<span class="token comment"># %(sql) 执行的真实SQL语句，已替换占位</span>
<span class="token comment"># %(sqlSingleLine) 执行的真实SQL语句，已替换占位 不换行显示</span>
<span class="token key attr-name">customLogMessageFormat</span><span class="token punctuation">=</span><span class="token value attr-value">%(currentTime)|%(executionTime)|%(category)|connection%(connectionId)|%(sqlSingleLine)</span>
<span class="token comment"># date类型字段记录日志时使用的日期格式 默认dd-MMM-yy</span>
<span class="token key attr-name">databaseDialectDateFormat</span><span class="token punctuation">=</span><span class="token value attr-value">dd-MMM-yy</span>
<span class="token comment"># boolean类型字段记录日志时使用的日期格式 默认boolean 可选值numeric</span>
<span class="token key attr-name">databaseDialectBooleanFormat</span><span class="token punctuation">=</span><span class="token value attr-value">boolean</span>
<span class="token comment"># 是否通过jmx暴露属性 默认true</span>
<span class="token key attr-name">jmx</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 如果jmx设置为true 指定通过jmx暴露属性时的前缀 默认为空</span>
<span class="token comment"># com.p6spy(.&lt;jmxPrefix&gt;)?:name=&lt;optionsClassName&gt;</span>
<span class="token key attr-name">jmxPrefix</span><span class="token punctuation">=</span>
<span class="token comment"># 是否显示纳秒 默认false</span>
<span class="token key attr-name">useNanoTime</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># 实际数据源 JNDI</span>
<span class="token key attr-name">realdatasource</span><span class="token punctuation">=</span><span class="token value attr-value">/RealMySqlDS</span>
<span class="token comment"># 实际数据源 datasource class</span>
<span class="token key attr-name">realdatasourceclass</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.jdbc2.optional.MysqlDataSource</span>
<span class="token comment"># 实际数据源所携带的配置参数 以 k=v 方式指定 以 分号 分割</span>
<span class="token key attr-name">realdatasourceproperties</span><span class="token punctuation">=</span><span class="token value attr-value">port;3306,serverName;myhost,databaseName;jbossdb,foo;bar</span>
<span class="token comment"># jndi数据源配置</span>
<span class="token comment"># 设置 JNDI 数据源的 NamingContextFactory。</span>
<span class="token key attr-name">jndicontextfactory</span><span class="token punctuation">=</span><span class="token value attr-value">org.jnp.interfaces.NamingContextFactory</span>
<span class="token comment"># 设置 JNDI 数据源的提供者的 URL。</span>
<span class="token key attr-name">jndicontextproviderurl</span><span class="token punctuation">=</span><span class="token value attr-value">localhost:1099</span>
<span class="token comment"># 设置 JNDI 数据源的一些定制信息，以分号分隔。</span>
<span class="token key attr-name">jndicontextcustom</span><span class="token punctuation">=</span><span class="token value attr-value">java.naming.factory.url.pkgs;org.jboss.naming:org.jnp.interfaces</span>
<span class="token comment"># 是否开启日志过滤 默认false， 这项配置是否生效前提是配置了 include/exclude/sqlexpression</span>
<span class="token key attr-name">filter</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># 过滤 Log 时所包含的表名列表，以逗号分隔 默认为空</span>
<span class="token key attr-name">include</span><span class="token punctuation">=</span>
<span class="token comment"># 过滤 Log 时所排除的表名列表，以逗号分隔 默认为空</span>
<span class="token key attr-name">exclude</span><span class="token punctuation">=</span>
<span class="token comment"># 过滤 Log 时的 SQL 正则表达式名称 默认为空</span>
<span class="token key attr-name">sqlexpression</span><span class="token punctuation">=</span>
<span class="token comment">#显示指定过滤 Log 时排队的分类列表，取值: error, info, batch, debug, statement,</span>
<span class="token comment">#commit, rollback, result and resultset are valid values</span>
<span class="token comment"># (默认 info,debug,result,resultset,batch)</span>
<span class="token key attr-name">excludecategories</span><span class="token punctuation">=</span><span class="token value attr-value">info,debug,result,resultset,batch</span>
<span class="token comment"># 是否过滤二进制字段</span>
<span class="token comment"># (default is false)</span>
<span class="token key attr-name">excludebinary</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># P6Log 模块执行时间设置，整数值 (以毫秒为单位)，只有当超过这个时间才进行记录 Log。默认为0</span>
<span class="token key attr-name">executionThreshold</span><span class="token punctuation">=</span>
<span class="token comment"># P6Outage 模块是否记录较长时间运行的语句 默认false</span>
<span class="token key attr-name">outagedetection</span><span class="token punctuation">=</span><span class="token value attr-value">true|false</span>
<span class="token comment"># P6Outage 模块执行时间设置，整数值 （以秒为单位)），只有当超过这个时间才进行记录 Log。默认30s</span>
<span class="token key attr-name">outagedetectioninterval</span><span class="token punctuation">=</span><span class="token value attr-value">integer time (seconds)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-相关问题" tabindex="-1"><a class="header-anchor" href="#_4-相关问题" aria-hidden="true">#</a> 4. 相关问题</h2><h3 id="_4-1-配置了exclude-不生效" tabindex="-1"><a class="header-anchor" href="#_4-1-配置了exclude-不生效" aria-hidden="true">#</a> 4.1 配置了exclude 不生效</h3><p>切记要先开启过滤：filter=true</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># 是否开启日志过滤 默认false， 这项配置是否生效前提是配置了 include/exclude/sqlexpression</span>
<span class="token key attr-name">filter</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 过滤 Log 时所排除的表名列表，以逗号分隔 默认为空</span>
<span class="token key attr-name">exclude</span><span class="token punctuation">=</span><span class="token value attr-value">QRTZ_*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-总是打印空日志" tabindex="-1"><a class="header-anchor" href="#_4-2-总是打印空日志" aria-hidden="true">#</a> 4.2 总是打印空日志</h3><p>我们debug 可以看到打印空日志的时候。他的category 为commit,所以我们要排除commit 即可</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment">## 配置记录Log例外</span>
<span class="token key attr-name">excludecategories</span><span class="token punctuation">=</span><span class="token value attr-value">info,debug,result,commit,resultset</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220622092110715.png" alt="image-20220622092110715" tabindex="0" loading="lazy"><figcaption>image-20220622092110715</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,35),d={href:"https://segmentfault.com/a/1190000038714503",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/li521wang/article/details/104002897",target:"_blank",rel:"noopener noreferrer"};function m(v,k){const s=c("ExternalLinkIcon");return l(),p("div",null,[r,n("p",null,[n("a",d,[a("使用P6Spy监控你的SQL输出"),e(s)])]),n("p",null,[n("a",u,[a("p6spy配置详解"),e(s)])])])}const g=t(o,[["render",m],["__file","p6spy-monitor-sql.html.vue"]]);export{g as default};
