import{_ as a,W as e,X as i,Y as n,Z as t,$ as o,a0 as l,D as p}from"./framework-0cf5f349.js";const r={},c=l(`<h1 id="elk日志-kibana中的kql语法" tabindex="-1"><a class="header-anchor" href="#elk日志-kibana中的kql语法" aria-hidden="true">#</a> ELK日志 - Kibana中的KQL语法</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>KQL：（Kibana Query Language ）查询语法是Kibana为了简化ES查询设计的一套简单查询语法，Kibana支持索引字段和语法补全，可以非常方便的查询数据。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230506144617336.png" alt="image-20230506144617336" tabindex="0" loading="lazy"><figcaption>image-20230506144617336</figcaption></figure><p>如果关闭 KQL，Kibana 将使用 Lucene。</p><p>在Kibana中使用Filters对数据进行过滤使用KQL语法来完成。</p><h2 id="_2-查询语法" tabindex="-1"><a class="header-anchor" href="#_2-查询语法" aria-hidden="true">#</a> 2. 查询语法</h2><h3 id="_2-1-等值匹配-equals" tabindex="-1"><a class="header-anchor" href="#_2-1-等值匹配-equals" aria-hidden="true">#</a> 2.1 等值匹配（equals）</h3><p>用于查询字段值</p><p><strong>语法</strong></p><blockquote><p>字段名:匹配值</p></blockquote><p><strong>示例一</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>response<span class="token punctuation">:</span><span class="token number">200</span>

# 匹配到的结果
<span class="token number">200</span>
hello world <span class="token number">200</span>
hello <span class="token number">200</span> world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询出response字段中<strong>包含</strong>200的文档对象，注意是包含，包含的是200这一个词。</p><p>需要注意的是<strong>1200</strong>或者<strong>2001</strong>，是不能被查出来的。</p><p><strong>示例二</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>message<span class="token punctuation">:</span><span class="token string">&quot;hello world yes&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个表达式，是针对message字段进行搜索，在搜索的时候不会区分大小写。</p><p>需要注意，上面的&quot;hello world yes&quot;使用了引号，这样的话，这3个单词会被作为一个词进行查询，不会再进行分词。</p><p><strong>示例三</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>message<span class="token punctuation">:</span>hello world

#匹配到的结果
hello
world
Hello
World
hello world
Hello world
hello yes World
yes world
world yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个表达式，针对message字段进行搜索，搜索message中<strong>包含</strong>hello，或者<strong>包含</strong>world，或者两者都<strong>包含</strong>的情况；</p><p><strong>不区分大小写，也不会保证顺序</strong></p><h3 id="_2-2-关系运算符" tabindex="-1"><a class="header-anchor" href="#_2-2-关系运算符" aria-hidden="true">#</a> 2.2 关系运算符</h3><p>关系运算符只能用在数值和时间类型的字段</p><table><thead><tr><th>符号</th><th>说明</th></tr></thead><tbody><tr><td>&lt;=</td><td>小于等于</td></tr><tr><td>&gt;=</td><td>大于等于</td></tr><tr><td>&lt;</td><td>小于</td></tr><tr><td>大于</td><td></td></tr></tbody></table><p><strong>示例一</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>account_number <span class="token operator">&gt;=</span><span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个表达式，针对account_number字段进行搜索，搜索account_number的值大于等于100的数据。</p><p><strong>示例二</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code># 搜索日期

# 搜索具体时间
@timestamp <span class="token operator">&lt;</span> <span class="token string">&quot;2021-01-02T21:55:59&quot;</span>

# 搜索年<span class="token operator">-</span>月份
@timestamp <span class="token operator">&lt;</span> <span class="token string">&quot;2021-01&quot;</span>

#搜索年
@timestamp <span class="token operator">&lt;</span> <span class="token string">&quot;2021&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-逻辑运算符" tabindex="-1"><a class="header-anchor" href="#_2-3-逻辑运算符" aria-hidden="true">#</a> 2.3 逻辑运算符</h3><p><strong>支持逻辑运算符如下:</strong></p><ul><li>and：与</li><li>or：或</li><li>not：非</li></ul><p><strong>示例一</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code># <span class="token operator">and</span> 的用法
<span class="token keyword">name</span><span class="token punctuation">:</span>jane <span class="token operator">and</span> addr<span class="token punctuation">:</span>beijing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个条件，会查询name字段包含jane，且addr字段包含beijing的记录。</p><p>注意：查询结果不区分大小写</p><p><strong>示例二</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code># <span class="token operator">or</span> 的用法
<span class="token keyword">name</span><span class="token punctuation">:</span>jane <span class="token operator">or</span> addr<span class="token punctuation">:</span>beijing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个查询条件，会查询name字段包含jane，或者addr字段包含beijing的记录，或者两者都匹配；</p><p><strong>示例三</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code># <span class="token operator">not</span> 的用法

#查询出response字段中不包含<span class="token number">200</span>的记录
<span class="token operator">not</span> response<span class="token punctuation">:</span><span class="token number">200</span>

# 查询response包含<span class="token number">200</span>，并且整条记录不包含yes的数据记录 
response<span class="token punctuation">:</span><span class="token number">200</span> <span class="token operator">and</span> <span class="token operator">not</span> yes

# 查询response包含<span class="token number">200</span>，且response不包含yes的记录
response<span class="token punctuation">:</span><span class="token punctuation">(</span><span class="token number">200</span> <span class="token operator">and</span> <span class="token operator">not</span> yes<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例四</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code><span class="token keyword">name</span><span class="token punctuation">:</span>jane <span class="token operator">and</span> addr<span class="token punctuation">:</span>beijing <span class="token operator">or</span> job<span class="token punctuation">:</span>teacher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的查询条件，查询name包含jane，且addr包含beijing的记录，或者job包含teacher的记录。</p><p><em>注意：KQL中，and的优先级高于or</em></p><p>对于上方结果可以使用小括号来更好的理解</p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code><span class="token punctuation">(</span><span class="token keyword">name</span><span class="token punctuation">:</span>jane <span class="token operator">and</span> addr<span class="token punctuation">:</span>beijing<span class="token punctuation">)</span> <span class="token operator">or</span> job<span class="token punctuation">:</span>teacher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>示例五</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>response<span class="token punctuation">:</span><span class="token punctuation">(</span><span class="token number">200</span> <span class="token operator">or</span> <span class="token number">404</span><span class="token punctuation">)</span>

# 与上方表达式等价
response<span class="token punctuation">:</span><span class="token number">200</span> <span class="token operator">or</span> response<span class="token punctuation">:</span><span class="token number">400</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个表达式，会查询response包含200，或者response包含404，或者包含200和404的记录（不保证顺序、不区分大小写）；</p><p>同时可以使用and来表示“且”的关系。</p><h3 id="_2-4-通配符查询" tabindex="-1"><a class="header-anchor" href="#_2-4-通配符查询" aria-hidden="true">#</a> 2.4 通配符查询</h3><p>匹配包含指定字段的文档。</p><p><strong>语法</strong></p><blockquote><p>字段名:*</p><p>字段名*:属性值</p><p>字段名:属性值*</p></blockquote><p>&quot;*&quot;代表通配符，可以添加到字段名中，也可以添加到属性值当中，代表匹配任意字符。</p><p><strong>示例一</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>response<span class="token punctuation">:</span><span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个查询条件，会返回所有包含response字段的文档对象。</p><p><strong>示例二</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code>machine<span class="token operator">*</span><span class="token punctuation">:</span>hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询字段名以machine开头，字段值为hello的数据。</p><p><strong>示例三</strong></p><div class="language-basic line-numbers-mode" data-ext="basic"><pre class="language-basic"><code># 查询字段名为machine，字段值以hello开头的数据
machine<span class="token punctuation">:</span>hello<span class="token operator">*</span>

# 查询字段名为FlightNum，字段值开头为T，结尾为V的数据
FlightNum<span class="token punctuation">:</span>T<span class="token operator">*</span>V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230506145238415.png" alt="image-20230506145238415" tabindex="0" loading="lazy"><figcaption>image-20230506145238415</figcaption></figure><h3 id="_2-5-字段嵌套查询" tabindex="-1"><a class="header-anchor" href="#_2-5-字段嵌套查询" aria-hidden="true">#</a> 2.5 字段嵌套查询</h3><p>首先准备一个多层的数据，比如下面的这几条数据。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;level1&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;level2&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;prop1&quot;</span><span class="token operator">:</span> <span class="token string">&quot;foo&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;prop2&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;prop1&quot;</span><span class="token operator">:</span> <span class="token string">&quot;baz&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;prop2&quot;</span><span class="token operator">:</span> <span class="token string">&quot;qux&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如想筛选 level1.level2.prop1 是 <code>foo</code> 或者是 <code>baz</code>的，可以这样写：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>level1.level2 <span class="token punctuation">{</span> prop1<span class="token operator">:</span> <span class="token string">&quot;foo&quot;</span> or prop1<span class="token operator">:</span> <span class="token string">&quot;baz&quot;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,73),d={href:"https://juejin.cn/post/7045085869979467789",target:"_blank",rel:"noopener noreferrer"};function u(v,b){const s=p("ExternalLinkIcon");return e(),i("div",null,[c,n("p",null,[n("a",d,[t("详解Kibana中的KQL语法"),o(s)])])])}const g=a(r,[["render",u],["__file","elasticsearch-kibana-kql.html.vue"]]);export{g as default};
