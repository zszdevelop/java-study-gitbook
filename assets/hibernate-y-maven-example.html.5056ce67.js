import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as t,a as n,b as p,e as o,d as c,r as i}from"./app.296fdb6c.js";const l={},u=o(`<h1 id="maven\u96C6\u6210hibernate\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#maven\u96C6\u6210hibernate\u793A\u4F8B" aria-hidden="true">#</a> Maven\u96C6\u6210Hibernate\u793A\u4F8B</h1><h2 id="_1-\u96C6\u6210\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#_1-\u96C6\u6210\u6B65\u9AA4" aria-hidden="true">#</a> 1. \u96C6\u6210\u6B65\u9AA4</h2><h3 id="\u6B65\u9AA41-pom\u6DFB\u52A0\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA41-pom\u6DFB\u52A0\u4F9D\u8D56" aria-hidden="true">#</a> \u6B65\u9AA41\uFF1APOM\u6DFB\u52A0\u4F9D\u8D56</h3><div class="language-XML ext-XML line-numbers-mode"><pre class="language-XML"><code>
    &lt;dependencies&gt;

        &lt;!-- Spring --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
            &lt;version&gt;4.0.6.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-context&lt;/artifactId&gt;
            &lt;version&gt;4.0.6.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-tx&lt;/artifactId&gt;
            &lt;version&gt;4.0.6.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-orm&lt;/artifactId&gt;
            &lt;version&gt;4.0.6.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!-- Hibernate --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
            &lt;version&gt;\${hibernate.version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!-- MySQL --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.31&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!-- Joda-Time --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;joda-time&lt;/groupId&gt;
            &lt;artifactId&gt;joda-time&lt;/artifactId&gt;
            &lt;version&gt;2.3&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!-- To map JodaTime with database type --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.jadira.usertype&lt;/groupId&gt;
            &lt;artifactId&gt;usertype.core&lt;/artifactId&gt;
            &lt;version&gt;3.0.0.CR1&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;
    &lt;build&gt;
        &lt;pluginManagement&gt;
            &lt;plugins&gt;
                &lt;plugin&gt;
                    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                    &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                    &lt;version&gt;3.2&lt;/version&gt;
                    &lt;configuration&gt;
                        &lt;source&gt;1.6&lt;/source&gt;
                        &lt;target&gt;1.6&lt;/target&gt;
                    &lt;/configuration&gt;
                &lt;/plugin&gt;
            &lt;/plugins&gt;
        &lt;/pluginManagement&gt;
    &lt;/build&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E3B\u8981\u6DFB\u52A0\u4E86Spring,Hibernate\uFF0C\u548C Mysql \u8FDE\u63A5\u5668\u76F8\u5173\u4F9D\u8D56\u3002\u53E6\u5916\uFF0C\u7531\u4E8E\u6211\u4EEC\u4F7F\u7528\u4E86joda-time\u5E93\u6765\u5904\u7406\u65F6\u95F4\uFF0C\u6240\u4EE5\u4E5F\u5F15\u5165\u4E86joda-time\u4F9D\u8D56\u3002usertype-core\u5E93\u5F15\u5165\u662F\u4E3A\u4E86\u63D0\u4F9B\u6570\u636E\u5E93\u65F6\u95F4\u7C7B\u578B\u4E0Ejoda-time LocalDate\u4E4B\u95F4\u7684\u6620\u5C04\u3002</p><h3 id="\u6B65\u9AA42-\u914D\u7F6Ehibernate" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA42-\u914D\u7F6Ehibernate" aria-hidden="true">#</a> \u6B65\u9AA42\uFF1A\u914D\u7F6EHibernate</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>configuration</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span></span><span class="token class-name">SessionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ComponentScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PropertySource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>env<span class="token punctuation">.</span></span><span class="token class-name">Environment</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DriverManagerDataSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>orm<span class="token punctuation">.</span>hibernate4<span class="token punctuation">.</span></span><span class="token class-name">HibernateTransactionManager</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>orm<span class="token punctuation">.</span>hibernate4<span class="token punctuation">.</span></span><span class="token class-name">LocalSessionFactoryBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">EnableTransactionManagement</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> \u4F5C\u8005: zhangshengzhong
 * @\u6587\u4EF6\u540D: HibernateConfiguration
 * @\u7248\u672C\u53F7:1.0
 * @\u521B\u5EFA\u65E5\u671F: 2020/10/9 11:37
 * @\u63CF\u8FF0:
 */</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableTransactionManagement</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&quot;com.zszdevelop.hibernatedemo.configuration&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;classpath:application.properties&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HibernateConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Environment</span> environment<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">LocalSessionFactoryBean</span> <span class="token function">sessionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">LocalSessionFactoryBean</span> sessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span><span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setPackagesToScan</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;com.zszdevelop.hibernatedemo.model&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setHibernateProperties</span><span class="token punctuation">(</span><span class="token function">hibernateProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sessionFactory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DriverManagerDataSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DriverManagerDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setDriverClassName</span><span class="token punctuation">(</span>environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc.driverClassName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUrl</span><span class="token punctuation">(</span>environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc.url&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc.username&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span>environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc.password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dataSource<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Properties</span> <span class="token function">hibernateProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.dialect&quot;</span><span class="token punctuation">,</span> environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.dialect&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.show_sql&quot;</span><span class="token punctuation">,</span> environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.show_sql&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.format_sql&quot;</span><span class="token punctuation">,</span> environment<span class="token punctuation">.</span><span class="token function">getRequiredProperty</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.format_sql&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> properties<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token class-name">HibernateTransactionManager</span> <span class="token function">transactionManager</span><span class="token punctuation">(</span><span class="token class-name">SessionFactory</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HibernateTransactionManager</span> txManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HibernateTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        txManager<span class="token punctuation">.</span><span class="token function">setSessionFactory</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> txManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C5E\u6027\u914D\u7F6E\u6587\u4EF6</p><p>application.properties/src/main/resources/application.properties</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jdbc.driverClassName = com.mysql.jdbc.Driver
jdbc.url = jdbc:mysql://localhost:3306/mytest
jdbc.username = myuser
jdbc.password = mypassword
hibernate.dialect = org.hibernate.dialect.MySQLDialect
hibernate.show_sql = false
hibernate.format_sql = false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6B65\u9AA43-spring\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA43-spring\u914D\u7F6E" aria-hidden="true">#</a> \u6B65\u9AA43\uFF1ASpring\u914D\u7F6E</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">&quot;com.zszdevelop.hibernatedemo&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u6211\u4EEC\u8FD9\u4E2A\u793A\u4F8B\u4E2D\uFF0C\u5373\u4F7F\u8BE5\u914D\u7F6E\u7C7B\u5185\u90E8\u662F\u7A7A\u7684\uFF0C\u4F46\u662F\u4F7F\u7528\u4E86<code>@ComponentScan\u6CE8\u89E3\uFF0C\u53EF\u4EE5\u81EA\u52A8\u68C0\u6D4B\u5230\u5BF9\u5E94\u5305\u4E0B\u6240\u6709\u7684beans\u3002</code></p><h3 id="\u6B65\u9AA44-dao\u5C42" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA44-dao\u5C42" aria-hidden="true">#</a> \u6B65\u9AA44\uFF1ADAO\u5C42</h3><p>package com.zszdevelop.hibernatedemo.dao;</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class AbstractDao {
    @Autowired
    private SessionFactory sessionFactory;

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    public void persist(Object entity) {
        getSession().persist(entity);
    }

    public void delete(Object entity) {
        getSession().delete(entity);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF0C\u6211\u4EEC\u5728\u6B65\u9AA4\u4E8C\u521B\u5EFA\u7684SessionFactory\u4F1A\u88AB\u81EA\u52A8\u88C5\u914D\u5230\u8FD9\u91CC\uFF0C\u8FD9\u4E2A\u7C7B\u5C06\u4F5C\u4E3A\u57FA\u7C7B\u7528\u4E8E\u6267\u884C\u6570\u636E\u5E93\u76F8\u5173\u64CD\u4F5C\u3002****</p><p>import com.zszdevelop.hibernatedemo.model.Employee;</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import java.util.List;


public interface EmployeeDao {

    void saveEmployee(Employee employee);

    List&lt;Employee&gt; findAllEmployees();

    void deleteEmployeeBySsn(String ssn);

    Employee findBySsn(String ssn);

    void updateEmployee(Employee employee);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package com.zszdevelop.hibernatedemo.dao.impl;</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>dao<span class="token punctuation">.</span></span><span class="token class-name">AbstractDao</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>dao<span class="token punctuation">.</span></span><span class="token class-name">EmployeeDao</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>model<span class="token punctuation">.</span></span><span class="token class-name">Employee</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span></span><span class="token class-name">Criteria</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span></span><span class="token class-name">Query</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>criterion<span class="token punctuation">.</span></span><span class="token class-name">Restrictions</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Repository</span></span><span class="token punctuation">;</span>



<span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;employeeDao&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeDaoImpl</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractDao</span> <span class="token keyword">implements</span> <span class="token class-name">EmployeeDao</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveEmployee</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">persist</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span> <span class="token function">findAllEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Criteria</span> criteria <span class="token operator">=</span> <span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createCriteria</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> criteria<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteEmployeeBySsn</span><span class="token punctuation">(</span><span class="token class-name">String</span> ssn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Query</span> query <span class="token operator">=</span> <span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createSQLQuery</span><span class="token punctuation">(</span><span class="token string">&quot;delete from Employee where ssn = :ssn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        query<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token string">&quot;ssn&quot;</span><span class="token punctuation">,</span> ssn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        query<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">findBySsn</span><span class="token punctuation">(</span><span class="token class-name">String</span> ssn<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Criteria</span> criteria <span class="token operator">=</span> <span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createCriteria</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        criteria<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Restrictions</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;ssn&quot;</span><span class="token punctuation">,</span>ssn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">)</span> criteria<span class="token punctuation">.</span><span class="token function">uniqueResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateEmployee</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6B65\u9AA45-\u6DFB\u52A0service\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA45-\u6DFB\u52A0service\u4EE3\u7801" aria-hidden="true">#</a> \u6B65\u9AA45\uFF1A\u6DFB\u52A0Service\u4EE3\u7801</h3><p>import com.zszdevelop.hibernatedemo.model.Employee;</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>

import java.util.List;


public interface EmployeeService {

    void saveEmployee(Employee employee);

    List&lt;Employee&gt; findAllEmployees();

    void deleteEmployeeBySsn(String ssn);

    Employee findBySsn(String ssn);

    void updateEmployee(Employee employee);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package com.zszdevelop.hibernatedemo.service.impl;</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>service<span class="token punctuation">.</span>impl</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>dao<span class="token punctuation">.</span></span><span class="token class-name">EmployeeDao</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>model<span class="token punctuation">.</span></span><span class="token class-name">Employee</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">EmployeeService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Transactional</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> \u4F5C\u8005: zhangshengzhong
 * @\u6587\u4EF6\u540D: EmployeeServiceImpl
 * @\u7248\u672C\u53F7:1.0
 * @\u521B\u5EFA\u65E5\u671F: 2020/10/10 10:25
 * @\u63CF\u8FF0:
 */</span>
<span class="token annotation punctuation">@Service</span><span class="token punctuation">(</span><span class="token string">&quot;employeeService&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">EmployeeService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">EmployeeDao</span> dao<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveEmployee</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dao<span class="token punctuation">.</span><span class="token function">saveEmployee</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span> <span class="token function">findAllEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> dao<span class="token punctuation">.</span><span class="token function">findAllEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deleteEmployeeBySsn</span><span class="token punctuation">(</span><span class="token class-name">String</span> ssn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dao<span class="token punctuation">.</span><span class="token function">deleteEmployeeBySsn</span><span class="token punctuation">(</span>ssn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">findBySsn</span><span class="token punctuation">(</span><span class="token class-name">String</span> ssn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> dao<span class="token punctuation">.</span><span class="token function">findBySsn</span><span class="token punctuation">(</span>ssn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateEmployee</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span><span class="token punctuation">{</span>
        dao<span class="token punctuation">.</span><span class="token function">updateEmployee</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6B65\u9AA46-\u521B\u5EFA\u5B9E\u4F53\u7C7Bpojo" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA46-\u521B\u5EFA\u5B9E\u4F53\u7C7Bpojo" aria-hidden="true">#</a> \u6B65\u9AA46\uFF1A\u521B\u5EFA\u5B9E\u4F53\u7C7BPOJO</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>model</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Type</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDate</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>math<span class="token punctuation">.</span></span><span class="token class-name">BigDecimal</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> \u4F5C\u8005: zhangshengzhong
 * @\u6587\u4EF6\u540D: Employee
 * @\u7248\u672C\u53F7:1.0
 * @\u521B\u5EFA\u65E5\u671F: 2020/10/10 10:24
 * @\u63CF\u8FF0:
 */</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;EMPLOYEE&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;NAME&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;JOINING_DATE&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Type</span><span class="token punctuation">(</span>type<span class="token operator">=</span><span class="token string">&quot;org.jadira.usertype.dateandtime.joda.PersistentLocalDate&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDate</span> joiningDate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;SALARY&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> salary<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;SSN&quot;</span><span class="token punctuation">,</span> unique<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> ssn<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">LocalDate</span> <span class="token function">getJoiningDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> joiningDate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setJoiningDate</span><span class="token punctuation">(</span><span class="token class-name">LocalDate</span> joiningDate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>joiningDate <span class="token operator">=</span> joiningDate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BigDecimal</span> <span class="token function">getSalary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> salary<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span> salary<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>salary <span class="token operator">=</span> salary<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSsn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ssn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSsn</span><span class="token punctuation">(</span><span class="token class-name">String</span> ssn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ssn <span class="token operator">=</span> ssn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> prime <span class="token operator">=</span> <span class="token number">31</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        result <span class="token operator">=</span> prime <span class="token operator">*</span> result <span class="token operator">+</span> id<span class="token punctuation">;</span>
        result <span class="token operator">=</span> prime <span class="token operator">*</span> result <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ssn <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> ssn<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> obj<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Employee</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">Employee</span> other <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">!=</span> other<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ssn <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>other<span class="token punctuation">.</span>ssn <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ssn<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>ssn<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Employee [id=&quot;</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">&quot;, name=&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;, joiningDate=&quot;</span>
                <span class="token operator">+</span> joiningDate <span class="token operator">+</span> <span class="token string">&quot;, salary=&quot;</span> <span class="token operator">+</span> salary <span class="token operator">+</span> <span class="token string">&quot;, ssn=&quot;</span> <span class="token operator">+</span> ssn <span class="token operator">+</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>




<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u662F\u4E00\u4E2A\u6807\u51C6\u7684\u5B9E\u4F53\u7C7B\uFF0C\u57FA\u4E8EJPA\u6CE8\u89E3<code>@Entity</code>, <code>@Table</code>, <code>@Column\u4EE5\u53CAhibernate\u6CE8\u89E3@Type\uFF08\u7528\u4E8E\u63D0\u4F9B\u6570\u636E\u5E93\u7C7B\u578B\u4E0EJoda-Time LocalDate\u7684\u6620\u5C04\uFF09\u3002</code></p><h3 id="\u6B65\u9AA47-\u5728\u6570\u636E\u5E93\u91CC\u521B\u5EFA\u8868" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA47-\u5728\u6570\u636E\u5E93\u91CC\u521B\u5EFA\u8868" aria-hidden="true">#</a> \u6B65\u9AA47\uFF1A\u5728\u6570\u636E\u5E93\u91CC\u521B\u5EFA\u8868</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CREATE TABLE EMPLOYEE(
    id INT NOT NULL auto_increment, 
    name VARCHAR(50) NOT NULL,
    joining_date DATE NOT NULL,
    salary DOUBLE NOT NULL,
    ssn VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6B65\u9AA48-\u521B\u5EFAmain\u65B9\u6CD5\u6267\u884C\u7A0B\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA48-\u521B\u5EFAmain\u65B9\u6CD5\u6267\u884C\u7A0B\u5E8F" aria-hidden="true">#</a> \u6B65\u9AA48\uFF1A\u521B\u5EFAmain\u65B9\u6CD5\u6267\u884C\u7A0B\u5E8F</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">AppConfig</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>model<span class="token punctuation">.</span></span><span class="token class-name">Employee</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>hibernatedemo<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">EmployeeService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>joda<span class="token punctuation">.</span>time<span class="token punctuation">.</span></span><span class="token class-name">LocalDate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">AnnotationConfigApplicationContext</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">AbstractApplicationContext</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>math<span class="token punctuation">.</span></span><span class="token class-name">BigDecimal</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> \u4F5C\u8005: zhangshengzhong
 * @\u6587\u4EF6\u540D: AppMain
 * @\u7248\u672C\u53F7:1.0
 * @\u521B\u5EFA\u65E5\u671F: 2020/10/10 10:26
 * @\u63CF\u8FF0:
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppMain</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">AbstractApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">AppConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">EmployeeService</span> service <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">EmployeeService</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;employeeService&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         * Create Employee1
         */</span>
        <span class="token class-name">Employee</span> employee1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee1<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Han Yenn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee1<span class="token punctuation">.</span><span class="token function">setJoiningDate</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LocalDate</span><span class="token punctuation">(</span><span class="token number">2010</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee1<span class="token punctuation">.</span><span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee1<span class="token punctuation">.</span><span class="token function">setSsn</span><span class="token punctuation">(</span><span class="token string">&quot;ssn00000001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         * Create Employee2
         */</span>
        <span class="token class-name">Employee</span> employee2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee2<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;Dan Thomas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee2<span class="token punctuation">.</span><span class="token function">setJoiningDate</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LocalDate</span><span class="token punctuation">(</span><span class="token number">2012</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee2<span class="token punctuation">.</span><span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">20000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee2<span class="token punctuation">.</span><span class="token function">setSsn</span><span class="token punctuation">(</span><span class="token string">&quot;ssn00000002&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         * Persist both Employees
         */</span>
        service<span class="token punctuation">.</span><span class="token function">saveEmployee</span><span class="token punctuation">(</span>employee1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        service<span class="token punctuation">.</span><span class="token function">saveEmployee</span><span class="token punctuation">(</span>employee2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         * Get all employees list from database
         */</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span> employees <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">findAllEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> emp <span class="token operator">:</span> employees<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/*
         * delete an employee
         */</span>
        service<span class="token punctuation">.</span><span class="token function">deleteEmployeeBySsn</span><span class="token punctuation">(</span><span class="token string">&quot;ssn00000002&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         * update an employee
         */</span>

        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">findBySsn</span><span class="token punctuation">(</span><span class="token string">&quot;ssn00000001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee<span class="token punctuation">.</span><span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token number">50000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        service<span class="token punctuation">.</span><span class="token function">updateEmployee</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
         * Get all employees list from database
         */</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span> employeeList <span class="token operator">=</span> service<span class="token punctuation">.</span><span class="token function">findAllEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> emp <span class="token operator">:</span> employeeList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        context<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u4EE5\u4E0A\u7A0B\u5E8F\uFF0C\u7ED3\u679C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Employee [id=1, name=Han Yenn, joiningDate=2010-10-10, salary=10000, ssn=ssn00000001] 
Employee [id=2, name=Dan Thomas, joiningDate=2012-11-11, salary=20000, ssn=ssn00000002] 
Employee [id=1, name=Han Yenn, joiningDate=2010-10-10, salary=50000, ssn=ssn00000001]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,36),r={href:"https://www.cnblogs.com/chenpi/p/6221790.html",target:"_blank",rel:"noopener noreferrer"},d=c("\u3010\u8BD1\u3011Spring 4 + Hibernate 4 + Mysql + Maven\u96C6\u6210\u4F8B\u5B50\uFF08\u6CE8\u89E3 + XML\uFF09");function k(v,m){const s=i("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[d,p(s)])])])}const g=a(l,[["render",k],["__file","hibernate-y-maven-example.html.vue"]]);export{g as default};
