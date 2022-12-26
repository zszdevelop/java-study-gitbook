import{_ as t,W as c,X as p,Y as n,Z as s,$ as e,a0 as i,D as o}from"./framework-0cf5f349.js";const l={},u=n("h1",{id:"easyexcel基础使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#easyexcel基础使用","aria-hidden":"true"},"#"),s(" EasyExcel基础使用")],-1),d={href:"https://www.yuque.com/easyexcel/doc/read",target:"_blank",rel:"noopener noreferrer"},r=n("h2",{id:"_1-简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-简介","aria-hidden":"true"},"#"),s(" 1. 简介")],-1),k=n("p",null,"excel 的读取，写入在项目中也是非常常用的功能",-1),v={href:"https://github.com/alibaba/easyexcel",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.yuque.com/easyexcel/doc/easyexcel",target:"_blank",rel:"noopener noreferrer"},b=i(`<h2 id="_2-添加依赖" tabindex="-1"><a class="header-anchor" href="#_2-添加依赖" aria-hidden="true">#</a> 2. 添加依赖</h2><div class="language-pom line-numbers-mode" data-ext="pom"><pre class="language-pom"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
    &lt;artifactId&gt;easyexcel&lt;/artifactId&gt;
    &lt;version&gt;2.2.6&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-读取excel" tabindex="-1"><a class="header-anchor" href="#_3-读取excel" aria-hidden="true">#</a> 3. 读取excel</h2><h3 id="_3-0-excel示例" tabindex="-1"><a class="header-anchor" href="#_3-0-excel示例" aria-hidden="true">#</a> 3.0 excel示例</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220329112239096.png" alt="image-20220329112239096" tabindex="0" loading="lazy"><figcaption>image-20220329112239096</figcaption></figure><h3 id="_3-1-新建实体类" tabindex="-1"><a class="header-anchor" href="#_3-1-新建实体类" aria-hidden="true">#</a> 3.1 新建实体类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 基础数据类
 *
 * <span class="token keyword">@author</span> Jiaju Zhuang
 **/</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoData</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;字符串标题&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> string<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;日期标题&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> date<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;数字标题&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> doubleData<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 忽略这个字段
     */</span>
    <span class="token annotation punctuation">@ExcelIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> ignore<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-设置回调监听" tabindex="-1"><a class="header-anchor" href="#_3-2-设置回调监听" aria-hidden="true">#</a> 3.2 设置回调监听</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 模板的读取类
 *
 * <span class="token keyword">@author</span> Jiaju Zhuang
 */</span>
<span class="token comment">// 有个很重要的点 DemoDataListener 不能被spring管理，要每次读取excel都要new,然后里面用到spring可以构造方法传进去</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoDataListener</span> <span class="token keyword">extends</span> <span class="token class-name">AnalysisEventListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DemoData</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">DemoDataListener</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 每隔5条存储数据库，实际使用中可以3000条，然后清理list ，方便内存回收
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BATCH_COUNT</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DemoData</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DemoData</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 假设这个是一个DAO，当然有业务逻辑这个也可以是一个service。当然如果不用存储这个对象没用。
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">DemoDAO</span> demoDAO<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DemoDataListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里是demo，所以随便new一个。实际使用如果到了spring,请使用下面的有参构造函数</span>
        demoDAO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DemoDAO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 如果使用了spring,请使用这个构造方法。每次创建Listener的时候需要把spring管理的类传进来
     *
     * <span class="token keyword">@param</span> <span class="token parameter">demoDAO</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">DemoDataListener</span><span class="token punctuation">(</span><span class="token class-name">DemoDAO</span> demoDAO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>demoDAO <span class="token operator">=</span> demoDAO<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 这个每一条数据解析都会来调用
     *
     * <span class="token keyword">@param</span> <span class="token parameter">data</span>
     *            one row value. Is is same as <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">AnalysisContext</span><span class="token punctuation">#</span><span class="token function">readRowHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>
     * <span class="token keyword">@param</span> <span class="token parameter">context</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">DemoData</span> data<span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;解析到一条数据:{}&quot;</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token constant">BATCH_COUNT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 存储完成清理 list</span>
            list<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 所有数据解析完成了 都会来调用
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterAllAnalysed</span><span class="token punctuation">(</span><span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里也要保存数据，确保最后遗留的数据也存储到数据库</span>
        <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;所有数据解析完成！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 加上存储数据库
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}条数据，开始存储数据库！&quot;</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        demoDAO<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;存储数据库成功！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-读数据" tabindex="-1"><a class="header-anchor" href="#_3-3-读数据" aria-hidden="true">#</a> 3.3 读数据</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
     * 最简单的读
     * &lt;p&gt;1. 创建excel对应的实体对象 参照{@link DemoData}
     * &lt;p&gt;2. 由于默认一行行的读取excel，所以需要创建excel一行一行的回调监听器，参照{@link DemoDataListener}
     * &lt;p&gt;3. 直接读即可
     */
@Test
    public void simpleRead() {
        String fileName = TestFileUtil.getPath() + &quot;demo&quot; + File.separator + &quot;demo.xlsx&quot;;
        // 这里 需要指定读用哪个class去读，然后读取第一个sheet 文件流会自动关闭
        EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).sheet().doRead();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,12),h={href:"https://www.yuque.com/easyexcel/doc/read",target:"_blank",rel:"noopener noreferrer"},g=n("strong",null,"读Excel",-1);function y(x,f){const a=o("ExternalLinkIcon");return c(),p("div",null,[u,n("blockquote",null,[n("p",null,[s("仅记录简单入门使用，大体框架思路。具体还是看"),n("a",d,[s("官方文档"),e(a)])])]),r,k,n("p",null,[n("a",v,[s("github"),e(a)])]),n("p",null,[n("a",m,[s("官方文档"),e(a)])]),b,n("p",null,[n("a",h,[g,e(a)])])])}const _=t(l,[["render",y],["__file","easy-excel-x-basic-use.html.vue"]]);export{_ as default};
