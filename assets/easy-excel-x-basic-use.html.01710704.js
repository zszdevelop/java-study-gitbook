import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,c as p,a as n,b as e,e as s,d as o,r as i}from"./app.6a1f7fa8.js";const l={},u=n("h1",{id:"easyexcel\u57FA\u7840\u4F7F\u7528",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#easyexcel\u57FA\u7840\u4F7F\u7528","aria-hidden":"true"},"#"),s(" EasyExcel\u57FA\u7840\u4F7F\u7528")],-1),d=s("\u4EC5\u8BB0\u5F55\u7B80\u5355\u5165\u95E8\u4F7F\u7528\uFF0C\u5927\u4F53\u6846\u67B6\u601D\u8DEF\u3002\u5177\u4F53\u8FD8\u662F\u770B"),r={href:"https://www.yuque.com/easyexcel/doc/read",target:"_blank",rel:"noopener noreferrer"},k=s("\u5B98\u65B9\u6587\u6863"),v=n("h2",{id:"_1-\u7B80\u4ECB",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-\u7B80\u4ECB","aria-hidden":"true"},"#"),s(" 1. \u7B80\u4ECB")],-1),m=n("p",null,"excel \u7684\u8BFB\u53D6\uFF0C\u5199\u5165\u5728\u9879\u76EE\u4E2D\u4E5F\u662F\u975E\u5E38\u5E38\u7528\u7684\u529F\u80FD",-1),b={href:"https://github.com/alibaba/easyexcel",target:"_blank",rel:"noopener noreferrer"},h=s("github"),g={href:"https://www.yuque.com/easyexcel/doc/easyexcel",target:"_blank",rel:"noopener noreferrer"},y=s("\u5B98\u65B9\u6587\u6863"),x=o(`<h2 id="_2-\u6DFB\u52A0\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#_2-\u6DFB\u52A0\u4F9D\u8D56" aria-hidden="true">#</a> 2. \u6DFB\u52A0\u4F9D\u8D56</h2><div class="language-pom ext-pom line-numbers-mode"><pre class="language-pom"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
    &lt;artifactId&gt;easyexcel&lt;/artifactId&gt;
    &lt;version&gt;2.2.6&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u8BFB\u53D6excel" tabindex="-1"><a class="header-anchor" href="#_3-\u8BFB\u53D6excel" aria-hidden="true">#</a> 3. \u8BFB\u53D6excel</h2><h3 id="_3-0-excel\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_3-0-excel\u793A\u4F8B" aria-hidden="true">#</a> 3.0 excel\u793A\u4F8B</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220329112239096.png" alt="image-20220329112239096" loading="lazy"></p><h3 id="_3-1-\u65B0\u5EFA\u5B9E\u4F53\u7C7B" tabindex="-1"><a class="header-anchor" href="#_3-1-\u65B0\u5EFA\u5B9E\u4F53\u7C7B" aria-hidden="true">#</a> 3.1 \u65B0\u5EFA\u5B9E\u4F53\u7C7B</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * \u57FA\u7840\u6570\u636E\u7C7B
 *
 * <span class="token keyword">@author</span> Jiaju Zhuang
 **/</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoData</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;\u5B57\u7B26\u4E32\u6807\u9898&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> string<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;\u65E5\u671F\u6807\u9898&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> date<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;\u6570\u5B57\u6807\u9898&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> doubleData<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * \u5FFD\u7565\u8FD9\u4E2A\u5B57\u6BB5
     */</span>
    <span class="token annotation punctuation">@ExcelIgnore</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> ignore<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-\u8BBE\u7F6E\u56DE\u8C03\u76D1\u542C" tabindex="-1"><a class="header-anchor" href="#_3-2-\u8BBE\u7F6E\u56DE\u8C03\u76D1\u542C" aria-hidden="true">#</a> 3.2 \u8BBE\u7F6E\u56DE\u8C03\u76D1\u542C</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * \u6A21\u677F\u7684\u8BFB\u53D6\u7C7B
 *
 * <span class="token keyword">@author</span> Jiaju Zhuang
 */</span>
<span class="token comment">// \u6709\u4E2A\u5F88\u91CD\u8981\u7684\u70B9 DemoDataListener \u4E0D\u80FD\u88ABspring\u7BA1\u7406\uFF0C\u8981\u6BCF\u6B21\u8BFB\u53D6excel\u90FD\u8981new,\u7136\u540E\u91CC\u9762\u7528\u5230spring\u53EF\u4EE5\u6784\u9020\u65B9\u6CD5\u4F20\u8FDB\u53BB</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoDataListener</span> <span class="token keyword">extends</span> <span class="token class-name">AnalysisEventListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DemoData</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">DemoDataListener</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * \u6BCF\u96945\u6761\u5B58\u50A8\u6570\u636E\u5E93\uFF0C\u5B9E\u9645\u4F7F\u7528\u4E2D\u53EF\u4EE53000\u6761\uFF0C\u7136\u540E\u6E05\u7406list \uFF0C\u65B9\u4FBF\u5185\u5B58\u56DE\u6536
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BATCH_COUNT</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DemoData</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DemoData</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * \u5047\u8BBE\u8FD9\u4E2A\u662F\u4E00\u4E2ADAO\uFF0C\u5F53\u7136\u6709\u4E1A\u52A1\u903B\u8F91\u8FD9\u4E2A\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2Aservice\u3002\u5F53\u7136\u5982\u679C\u4E0D\u7528\u5B58\u50A8\u8FD9\u4E2A\u5BF9\u8C61\u6CA1\u7528\u3002
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">DemoDAO</span> demoDAO<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">DemoDataListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u8FD9\u91CC\u662Fdemo\uFF0C\u6240\u4EE5\u968F\u4FBFnew\u4E00\u4E2A\u3002\u5B9E\u9645\u4F7F\u7528\u5982\u679C\u5230\u4E86spring,\u8BF7\u4F7F\u7528\u4E0B\u9762\u7684\u6709\u53C2\u6784\u9020\u51FD\u6570</span>
        demoDAO <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DemoDAO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u5982\u679C\u4F7F\u7528\u4E86spring,\u8BF7\u4F7F\u7528\u8FD9\u4E2A\u6784\u9020\u65B9\u6CD5\u3002\u6BCF\u6B21\u521B\u5EFAListener\u7684\u65F6\u5019\u9700\u8981\u628Aspring\u7BA1\u7406\u7684\u7C7B\u4F20\u8FDB\u6765
     *
     * <span class="token keyword">@param</span> <span class="token parameter">demoDAO</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">DemoDataListener</span><span class="token punctuation">(</span><span class="token class-name">DemoDAO</span> demoDAO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>demoDAO <span class="token operator">=</span> demoDAO<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u8FD9\u4E2A\u6BCF\u4E00\u6761\u6570\u636E\u89E3\u6790\u90FD\u4F1A\u6765\u8C03\u7528
     *
     * <span class="token keyword">@param</span> <span class="token parameter">data</span>
     *            one row value. Is is same as <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">AnalysisContext</span><span class="token punctuation">#</span><span class="token function">readRowHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>
     * <span class="token keyword">@param</span> <span class="token parameter">context</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">DemoData</span> data<span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u89E3\u6790\u5230\u4E00\u6761\u6570\u636E:{}&quot;</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u8FBE\u5230BATCH_COUNT\u4E86\uFF0C\u9700\u8981\u53BB\u5B58\u50A8\u4E00\u6B21\u6570\u636E\u5E93\uFF0C\u9632\u6B62\u6570\u636E\u51E0\u4E07\u6761\u6570\u636E\u5728\u5185\u5B58\uFF0C\u5BB9\u6613OOM</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token constant">BATCH_COUNT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// \u5B58\u50A8\u5B8C\u6210\u6E05\u7406 list</span>
            list<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u6240\u6709\u6570\u636E\u89E3\u6790\u5B8C\u6210\u4E86 \u90FD\u4F1A\u6765\u8C03\u7528
     *
     * <span class="token keyword">@param</span> <span class="token parameter">context</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterAllAnalysed</span><span class="token punctuation">(</span><span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u8FD9\u91CC\u4E5F\u8981\u4FDD\u5B58\u6570\u636E\uFF0C\u786E\u4FDD\u6700\u540E\u9057\u7559\u7684\u6570\u636E\u4E5F\u5B58\u50A8\u5230\u6570\u636E\u5E93</span>
        <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u6240\u6709\u6570\u636E\u89E3\u6790\u5B8C\u6210\uFF01&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u52A0\u4E0A\u5B58\u50A8\u6570\u636E\u5E93
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;{}\u6761\u6570\u636E\uFF0C\u5F00\u59CB\u5B58\u50A8\u6570\u636E\u5E93\uFF01&quot;</span><span class="token punctuation">,</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        demoDAO<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u5B58\u50A8\u6570\u636E\u5E93\u6210\u529F\uFF01&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-\u8BFB\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#_3-3-\u8BFB\u6570\u636E" aria-hidden="true">#</a> 3.3 \u8BFB\u6570\u636E</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
     * \u6700\u7B80\u5355\u7684\u8BFB
     * &lt;p&gt;1. \u521B\u5EFAexcel\u5BF9\u5E94\u7684\u5B9E\u4F53\u5BF9\u8C61 \u53C2\u7167{@link DemoData}
     * &lt;p&gt;2. \u7531\u4E8E\u9ED8\u8BA4\u4E00\u884C\u884C\u7684\u8BFB\u53D6excel\uFF0C\u6240\u4EE5\u9700\u8981\u521B\u5EFAexcel\u4E00\u884C\u4E00\u884C\u7684\u56DE\u8C03\u76D1\u542C\u5668\uFF0C\u53C2\u7167{@link DemoDataListener}
     * &lt;p&gt;3. \u76F4\u63A5\u8BFB\u5373\u53EF
     */
@Test
    public void simpleRead() {
        String fileName = TestFileUtil.getPath() + &quot;demo&quot; + File.separator + &quot;demo.xlsx&quot;;
        // \u8FD9\u91CC \u9700\u8981\u6307\u5B9A\u8BFB\u7528\u54EA\u4E2Aclass\u53BB\u8BFB\uFF0C\u7136\u540E\u8BFB\u53D6\u7B2C\u4E00\u4E2Asheet \u6587\u4EF6\u6D41\u4F1A\u81EA\u52A8\u5173\u95ED
        EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).sheet().doRead();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,12),_={href:"https://www.yuque.com/easyexcel/doc/read",target:"_blank",rel:"noopener noreferrer"},f=n("strong",null,"\u8BFBExcel",-1);function w(D,O){const a=i("ExternalLinkIcon");return c(),p("div",null,[u,n("blockquote",null,[n("p",null,[d,n("a",r,[k,e(a)])])]),v,m,n("p",null,[n("a",b,[h,e(a)])]),n("p",null,[n("a",g,[y,e(a)])]),x,n("p",null,[n("a",_,[f,e(a)])])])}const L=t(l,[["render",w],["__file","easy-excel-x-basic-use.html.vue"]]);export{L as default};
