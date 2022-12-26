import{_ as i,W as s,X as l,Y as t,Z as n,$ as e,a0 as o,D as u}from"./framework-0cf5f349.js";const r={},c=t("h1",{id:"python爬取脉脉",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#python爬取脉脉","aria-hidden":"true"},"#"),n(" python爬取脉脉")],-1),d=t("h2",{id:"_1-简介",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-简介","aria-hidden":"true"},"#"),n(" 1. 简介")],-1),p={href:"https://github.com/Joezhangs/PythonSpider/tree/master/Item5%EF%BC%9Aspider_maimai",target:"_blank",rel:"noopener noreferrer"},q=t("h3",{id:"_1-1-页面爬取的内容",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-1-页面爬取的内容","aria-hidden":"true"},"#"),n(" 1.1 页面爬取的内容")],-1),m={href:"https://maimai.cn/",target:"_blank",rel:"noopener noreferrer"},v=o(`<figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210701215737588.png" alt="image-20210701215737588" tabindex="0" loading="lazy"><figcaption>image-20210701215737588</figcaption></figure><h3 id="_1-2-爬取的接口分析" tabindex="-1"><a class="header-anchor" href="#_1-2-爬取的接口分析" aria-hidden="true">#</a> 1.2 爬取的接口分析</h3><div class="language-apl line-numbers-mode" data-ext="apl"><pre class="language-apl"><code>https<span class="token dfn builtin">:</span><span class="token monadic-operator operator">/</span><span class="token monadic-operator operator">/</span>maimai<span class="token dyadic-operator operator">.</span>cn<span class="token monadic-operator operator">/</span>search<span class="token monadic-operator operator">/</span>contacts<span class="token function">?</span>count<span class="token function">=</span><span class="token number">20</span><span class="token monadic-operator operator">&amp;</span>page<span class="token function">=</span><span class="token number">0</span><span class="token monadic-operator operator">&amp;</span>query<span class="token function">=</span>Cho<span class="token monadic-operator operator">&amp;</span>dist<span class="token function">=</span><span class="token number">0</span><span class="token monadic-operator operator">&amp;</span>searchTokens<span class="token function">=</span><span class="token monadic-operator operator">&amp;</span>highlight<span class="token function">=</span>true<span class="token monadic-operator operator">&amp;</span>jsononly<span class="token function">=</span><span class="token number">1</span><span class="token monadic-operator operator">&amp;</span>pc<span class="token function">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据开发者模式下的接口信息可以看到</p>`,4),h={href:"https://maimai.cn/search/contacts",target:"_blank",rel:"noopener noreferrer"},b=o(`<p>参数为</p><ul><li>count：20 <ul><li>单次查询条数20条</li></ul></li><li>page=0 <ul><li>当前页数，第0页</li></ul></li><li>query=Cho <ul><li>查询的关键词</li></ul></li><li>dist=0</li><li>searchTokens=</li><li>highlight=true <ul><li>是否高亮</li></ul></li><li>jsononly=1 <ul><li>是否以json格式返回</li></ul></li><li>pc=1 <ul><li>是否为电脑端数据</li></ul></li></ul><h3 id="_1-3-接口返回结果分析" tabindex="-1"><a class="header-anchor" href="#_1-3-接口返回结果分析" aria-hidden="true">#</a> 1.3 接口返回结果分析</h3><p>该接口的返回结果为</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210701221518719.png" alt="image-20210701221518719" tabindex="0" loading="lazy"><figcaption>image-20210701221518719</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
	&quot;result&quot;: &quot;ok&quot;,
	&quot;data&quot;: {
		&quot;contacts&quot;: [{
			&quot;uid&quot;: &quot;a9f9b8c4-3c9d-46ac-b32e-0a1bfeefc2ea&quot;,
			&quot;contact&quot;: {
				&quot;id&quot;: &quot;a9f9b8c4-3c9d-46ac-b32e-0a1bfeefc2ea&quot;,
				&quot;name&quot;: &quot;wing&quot;,
				&quot;py&quot;: &quot;wing&quot;,
				&quot;avatar&quot;: &quot;https://i9.taou.com/maimai/p/25657/400_42_2jgEOv22b8xMTrtp-a160&quot;,
				&quot;line1&quot;: &quot;法大大CHO&quot;,
				&quot;line3&quot;: &quot;法大大CHO(广东)&quot;,
				&quot;line4&quot;: &quot;IT互联网 | 高管, 影响力: 79&quot;,
				&quot;rank&quot;: 79,
				&quot;compos&quot;: &quot;法大大CHO&quot;,
				&quot;loc&quot;: &quot;广东&quot;,
				&quot;short_compos&quot;: &quot;法大大CHO&quot;,
				&quot;company&quot;: &quot;法大大&quot;,
				&quot;career&quot;: &quot;法大大CHO&quot;,
				&quot;gender&quot;: 2,
				&quot;position&quot;: &quot;CHO&quot;,
				&quot;short_career&quot;: &quot;法大大CHO&quot;,
				&quot;mmid&quot;: &quot;231791658&quot;,
				&quot;status&quot;: 1,
				&quot;province&quot;: &quot;广东&quot;,
				&quot;city&quot;: &quot;深圳&quot;,
				&quot;user_pfmj&quot;: {
					&quot;major1&quot;: &quot;0104&quot;,
					&quot;profession1&quot;: &quot;0108&quot;,
					&quot;pf_path1&quot;: &quot;01,0108&quot;,
					&quot;pf_name1&quot;: &quot;企业级软件&quot;,
					&quot;mj_name1&quot;: &quot;CEO/创始人/企业高管&quot;,
					&quot;src_type&quot;: 3
				},
				
			}
		}],
		&quot;contacts_total&quot;: 756,
		&quot;searchTokens&quot;: [&quot;cho&quot;, &quot;hrvp&quot;],
		&quot;more&quot;: 746,
        ...
	},
	&quot;ab_conf&quot;: {
	},
	&quot;env&quot;: {
	},
	&quot;auth_info&quot;: {
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回结果过多，此处只截取部分关键字段</p><p>我们需要的数据</p><ul><li>用户结果列表：在data-&gt;contacts-&gt;contact 下</li><li>搜索的关键词：&quot;searchTokens&quot;: [&quot;cho&quot;, &quot;hrvp&quot;], <ul><li>这里并不一定只有你搜索的结果</li></ul></li></ul><h4 id="_1-3-1-contact的数据结构分析" tabindex="-1"><a class="header-anchor" href="#_1-3-1-contact的数据结构分析" aria-hidden="true">#</a> 1.3.1 <strong>contact</strong>的数据结构分析</h4><ul><li>name: &quot;wing&quot; <ul><li>用户名为wing</li></ul></li><li>company: &quot;法大大&quot; <ul><li>公司名：法大大</li></ul></li><li>career: &quot;法大大CHO&quot; <ul><li>职业：法大大CHO</li></ul></li><li></li></ul><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,12),g={href:"https://github.com/Joezhangs/PythonSpider/tree/master/Item5%EF%BC%9Aspider_maimai",target:"_blank",rel:"noopener noreferrer"};function _(f,k){const a=u("ExternalLinkIcon");return s(),l("div",null,[c,d,t("p",null,[n("该项目主要是根据"),t("a",p,[n("github项目爬取脉脉网"),e(a)]),n(" 学习，并根据自己的业务需求改造")]),q,t("blockquote",null,[t("p",null,[n("这是一个基于python3而写的爬虫，爬取的网站的脉脉网("),t("a",m,[n("https://maimai.cn/"),e(a)]),n(")，在搜索框中搜索“CHO”，并切换到“人脉”选项卡，点击姓名，进入详情页，爬取其详细信息")])]),v,t("p",null,[n("请求接口："),t("a",h,[n("https://maimai.cn/search/contacts"),e(a)])]),b,t("p",null,[t("a",g,[n("爬取的网站的脉脉网"),e(a)])])])}const x=i(r,[["render",_],["__file","python-maimai.html.vue"]]);export{x as default};
