import{_ as s,W as e,X as t,Y as n,Z as i,$ as r,a0 as c,D as l}from"./framework-0cf5f349.js";const o={},d=c(`<h1 id="oracle如果表不存在-则创建该表" tabindex="-1"><a class="header-anchor" href="#oracle如果表不存在-则创建该表" aria-hidden="true">#</a> ORACLE如果表不存在，则创建该表</h1><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> 1. 背景</h2><p>Oracle使用的是PL/SQL, 不支持IF NOT EXISTS 条件。</p><h2 id="_2-示例" tabindex="-1"><a class="header-anchor" href="#_2-示例" aria-hidden="true">#</a> 2. 示例</h2><p>使用counter在USER_ALL_TABLES中来列举有几个PRODUCT表 ，如果i&gt;0则说明至少有一个PRODUCT表。</p><p>根据条件的判断删或增PRODUCT表。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DECLARE</span>
i <span class="token keyword">integer</span><span class="token punctuation">;</span>
<span class="token keyword">BEGIN</span>
	<span class="token keyword">SELECT</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">INTO</span> i <span class="token keyword">FROM</span> USER_ALL_TABLES <span class="token keyword">WHERE</span> TABLE_NAME<span class="token operator">=</span><span class="token string">&#39;PRODUCT&#39;</span><span class="token punctuation">;</span>
	<span class="token keyword">IF</span> i<span class="token operator">&gt;</span><span class="token number">0</span> 
	<span class="token keyword">THEN</span>
		<span class="token keyword">EXECUTE</span> immediate <span class="token string">&#39;DROP TABLE PRODUCT&#39;</span><span class="token punctuation">;</span>
	<span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>
	<span class="token keyword">EXECUTE</span> immediate <span class="token string">&#39;CREATE TABLE PRODUCT
		(
			ID integer NOT NULL,
			VERSION integer,
			TITLE varchar (255),
			SKU varchar (255),
			PARENTSKU varchar (255),
			COLOR varchar (255),
			DESCRIPTION varchar (255),
			PRICE varchar (255),
			CONSTRAINT PK_PRODUCT_ID PRIMARY KEY(ID)
		)&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注： 删除之后还是要新建！！！，网上很多教程删除后就删了，不建表</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,9),p={href:"https://blog.csdn.net/qq_24702233/article/details/89483613",target:"_blank",rel:"noopener noreferrer"};function u(v,k){const a=l("ExternalLinkIcon");return e(),t("div",null,[d,n("p",null,[n("a",p,[i("ORACLE 如果表不存在，则创建该表"),r(a)])])])}const h=s(o,[["render",u],["__file","oracle-y-non-exist-create.html.vue"]]);export{h as default};
