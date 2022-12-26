import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const t={},p=e(`<h1 id="开发安全-防止sql注入攻击实战" tabindex="-1"><a class="header-anchor" href="#开发安全-防止sql注入攻击实战" aria-hidden="true">#</a> 开发安全 - 防止SQL注入攻击实战</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>所谓 SQL 注入，就是通过将 SQL 命令插入应用程序的 http 请求中，并在服务器端被接收后用于参与数据库操作，最终达到欺骗服务器执行恶意的 SQL 命令的效果。</p><h3 id="_1-1-示例" tabindex="-1"><a class="header-anchor" href="#_1-1-示例" aria-hidden="true">#</a> 1.1 示例</h3><p>最经典的sql 注入</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code> <span class="token comment">// 重点看这条SQL，密码输入: &#39; OR &#39;1&#39;=&#39;1时，等同于不需要密码</span>
        String <span class="token keyword">sql</span> <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM t_user WHERE username=&#39;&quot;</span><span class="token operator">+</span>userName<span class="token operator">+</span><span class="token string">&quot;&#39; AND pwd=&#39;&quot;</span><span class="token operator">+</span>password<span class="token operator">+</span><span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">;</span>       
        ResultSet rs <span class="token operator">=</span> state<span class="token punctuation">.</span>executeQuery<span class="token punctuation">(</span><span class="token keyword">sql</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-解决思路" tabindex="-1"><a class="header-anchor" href="#_2-解决思路" aria-hidden="true">#</a> 2. 解决思路</h2><ol><li>使用预编译处理输入参数</li><li>输入验证，确保输入的正确性</li></ol><h2 id="_3-使用预编译处理输入参数" tabindex="-1"><a class="header-anchor" href="#_3-使用预编译处理输入参数" aria-hidden="true">#</a> 3. 使用预编译处理输入参数</h2><p>我们现在基本都使用ORM 框架已经帮我们做了预编译处理。</p><p>但还有小部分sql，如order by 需要我们自己对输入验证</p><h2 id="_4-输入验证" tabindex="-1"><a class="header-anchor" href="#_4-输入验证" aria-hidden="true">#</a> 4. 输入验证</h2><h3 id="_4-1-请求参数处理" tabindex="-1"><a class="header-anchor" href="#_4-1-请求参数处理" aria-hidden="true">#</a> 4.1 请求参数处理</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>pageDomain<span class="token punctuation">.</span><span class="token function">getOrderBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">String</span> orderBy <span class="token operator">=</span> <span class="token class-name">SqlUtil</span><span class="token punctuation">.</span><span class="token function">escapeOrderBySql</span><span class="token punctuation">(</span>pageDomain<span class="token punctuation">.</span><span class="token function">getOrderBy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">PageHelper</span><span class="token punctuation">.</span><span class="token function">orderBy</span><span class="token punctuation">(</span>orderBy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-对输入验证" tabindex="-1"><a class="header-anchor" href="#_4-2-对输入验证" aria-hidden="true">#</a> 4.2 对输入验证</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * sql操作工具类
 * 
 * <span class="token keyword">@author</span> ruoyi
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SqlUtil</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 定义常用的 sql关键字
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">SQL_REGEX</span> <span class="token operator">=</span> <span class="token string">&quot;select |insert |delete |update |drop |count |exec |chr |mid |master |truncate |char |and |declare &quot;</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 仅支持字母、数字、下划线、空格、逗号、小数点（支持多个字段排序）
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">SQL_PATTERN</span> <span class="token operator">=</span> <span class="token string">&quot;[a-zA-Z0-9_\\\\ \\\\,\\\\.]+&quot;</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 检查字符，防止注入绕过
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">escapeOrderBySql</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isValidOrderBySql</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UtilException</span><span class="token punctuation">(</span><span class="token string">&quot;参数不符合规范，不能进行查询&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 验证 order by 语法是否符合规范
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isValidOrderBySql</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token constant">SQL_PATTERN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * SQL关键字检查
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">filterKeyword</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sqlKeywords <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token constant">SQL_REGEX</span><span class="token punctuation">,</span> <span class="token string">&quot;\\\\|&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> sqlKeyword <span class="token operator">:</span> sqlKeywords<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">indexOfIgnoreCase</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> sqlKeyword<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UtilException</span><span class="token punctuation">(</span><span class="token string">&quot;参数存在SQL注入风险&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","dev-security-x-injection-action.html.vue"]]);export{r as default};
