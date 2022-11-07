import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as p,a as e,b as l,d as t,e as r,r as c}from"./app.b58ae558.js";const i={},d=t(`<h1 id="oracle\u57FA\u7840-\u5E8F\u5217" tabindex="-1"><a class="header-anchor" href="#oracle\u57FA\u7840-\u5E8F\u5217" aria-hidden="true">#</a> Oracle\u57FA\u7840-\u5E8F\u5217</h1><p>create sequence SEQ_TEST</p><p>minvalue 1 --\u6700\u5C0F\u503C</p><p>nomaxvalue --\u4E0D\u8BBE\u7F6E\u6700\u5927\u503C</p><p>start with 1 --\u4ECE1\u5F00\u59CB\u8BA1\u6570</p><p>increment by 1 --\u6BCF\u6B21\u52A01\u4E2A</p><p>nocycle --\u4E00\u76F4\u7D2F\u52A0\uFF0C\u4E0D\u5FAA\u73AF</p><p>nocache; --\u4E0D\u5EFA\u7F13\u51B2\u533A</p><h2 id="_1-\u521B\u5EFA\u5E8F\u5217" tabindex="-1"><a class="header-anchor" href="#_1-\u521B\u5EFA\u5E8F\u5217" aria-hidden="true">#</a> 1. \u521B\u5EFA\u5E8F\u5217</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>create sequence seq_user
  increment by 1
  minvalue 1
  nomaxvalue
  start with 1
  nocycle 
  cache 20;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u4FEE\u6539\u5E8F\u5217\u7684\u5F53\u524D\u503C\u76843\u79CD\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_2-\u4FEE\u6539\u5E8F\u5217\u7684\u5F53\u524D\u503C\u76843\u79CD\u65B9\u5F0F" aria-hidden="true">#</a> 2. \u4FEE\u6539\u5E8F\u5217\u7684\u5F53\u524D\u503C\u76843\u79CD\u65B9\u5F0F</h2><h3 id="_2-1-\u65B9\u5F0F\u4E00-\u4F7F\u7528plsql" tabindex="-1"><a class="header-anchor" href="#_2-1-\u65B9\u5F0F\u4E00-\u4F7F\u7528plsql" aria-hidden="true">#</a> 2.1 <strong>\u65B9\u5F0F\u4E00\uFF1A\u4F7F\u7528plsql\uFF1B</strong></h3><p>\u6253\u5F00plsql\uFF0C\u627E\u5230sequences</p><p>\u627E\u5230\u8981\u4FEE\u6539\u7684\u5E8F\u5217--\u300B\u53F3\u952E--\u300B\u7F16\u8F91--\u300B\u66F4\u6539\uFF1A\u4E0B\u4E00\u4E2A\u6570\u5B57\u7684\u503C\u5373\u53EF\u3002</p><h3 id="_2-2-\u65B9\u5F0F\u4E8C-\u91CD\u5EFA\u5E8F\u5217" tabindex="-1"><a class="header-anchor" href="#_2-2-\u65B9\u5F0F\u4E8C-\u91CD\u5EFA\u5E8F\u5217" aria-hidden="true">#</a> 2.2 <strong>\u65B9\u5F0F\u4E8C\uFF1A\u91CD\u5EFA\u5E8F\u5217\uFF1B</strong></h3><p>\u9519\u8BEF\u65B9\u5F0F\uFF1A</p><p>\u5177\u4F53\u6B65\u9AA4\u662F\uFF1A\u5220\u9664\u539F\u6765\u7684\u5E8F\u5217\uFF0C\u91CD\u65B0\u521B\u5EFA\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token comment">-- \u5220\u9664\u5E8F\u5217</span>
<span class="token keyword">DROP</span> SEQUENCE seq_sys_dept<span class="token punctuation">;</span>
<span class="token comment">-- \u91CD\u5EFA\u5E8F\u5217</span>
<span class="token comment">-- \u5176\u4E2D\uFF0Cstart with \u540E\u9762\u8DDF\u7684\u5C31\u662F\u8D77\u59CB\u503C\uFF08\u4E0B\u6B21\u8C03\u7528\u6B64\u5E8F\u5217\u65F6\uFF0C\u5C06\u4F1A\u51FA\u73B0\u7684\u503C\uFF09</span>
<span class="token keyword">CREATE</span> SEQUENCE seq_sys_dept
    minvalue <span class="token number">1</span>
    maxvalue <span class="token number">9999999999999999999</span>
    INCREMENT <span class="token keyword">BY</span> <span class="token number">1</span>
    <span class="token keyword">START</span> <span class="token keyword">WITH</span> <span class="token number">23725</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>start with \u540E\u9762\u8DDF\u7684\u5C31\u662F\u8D77\u59CB\u503C\uFF08\u4E0B\u6B21\u8C03\u7528\u6B64\u5E8F\u5217\u65F6\uFF0C\u5C06\u4F1A\u51FA\u73B0\u7684\u503C\uFF09 \u3002</p><h3 id="_2-3-\u65B9\u5F0F\u4E09-\u4F7F\u7528sql\u3002" tabindex="-1"><a class="header-anchor" href="#_2-3-\u65B9\u5F0F\u4E09-\u4F7F\u7528sql\u3002" aria-hidden="true">#</a> 2.3 <strong>\u65B9\u5F0F\u4E09\uFF1A\u4F7F\u7528sql\u3002</strong></h3><p>\u8FD9\u4E00\u4E2A\uFF0C\u662F\u672C\u6587\u7684\u91CD\u70B9\uFF1B</p><p>\u6211\u4EEC\u7531\u65B9\u5F0F\u4E00\u53EF\u4EE5\u77E5\u9053\uFF1A\u901A\u8FC7plsql\u7684\u53EF\u89C6\u5316\u64CD\u4F5C\u754C\u9762\uFF0C\u662F\u53EF\u4EE5\u4FEE\u6539\u7684\u3002</p><p>\u90A3plsql\u5230\u5E95\u662F\u600E\u4E48\u5B9E\u73B0\u7684\uFF1F\u4E00\u8D77\u6765\u770B\u4E0B\uFF1A</p><p>\u9009\u4E2D\u5E8F\u5217--\u300B\u53F3\u952E--\u300B\u7F16\u8F91</p><p>\u7B2C\u4E00\u6B65\uFF1A\u4FEE\u6539\u8D77\u59CB\u503C\uFF1B</p><p>\u7B2C\u4E8C\u6B65\uFF1A\u70B9\u51FB\u53F3\u4E0B\u89D2\u7684\u201C\u67E5\u770BSQL\u201D\u3002</p><p>\u8BF4\u660E\uFF1A</p><p>\u8D77\u521D\uFF0C\u8FD9\u91CC\u7684\u8D77\u59CB\u503C\u662F300\uFF0C\u6211\u7ED9\u5B83\u6539\u6210\u4E8630\uFF0C\u5B9E\u73B0\u7684\u6548\u679C\u5C31\u662F\uFF1A</p><p>\u5C06\u5E8F\u5217\u7684\u4E0B\u4E00\u4E2A\u503C\u6539\u6210\u4E8630\uFF0C\u4EE5\u540E\u5E8F\u5217\u5C06\u4F1A\u4ECE30\u5F80\u540E\u53E0\u52A0\u3002</p><p>\u7136\u540E\uFF0C\u770B\u4E0B\u9762\u8FD9\u5F20\u56FE\uFF0C\u8981\u5B9E\u73B0\u5E8F\u5217\u8D77\u59CB\u503C\u7684\u4FEE\u6539\uFF0C\u9700\u89813\u6B65\u3002</p><p>\u7B2C\u4E00\u6B65\uFF1A\u66F4\u6539\u5E8F\u5217\u7684\u6B65\u957F\uFF1B</p><p>alter sequence SEQ_META_THEME_TABLE increment by -271 nocache;</p><p>\u6211\u4EEC\u9700\u8981\u660E\u767D\u4E00\u4E2A\u524D\u63D0\uFF1A</p><p>\u5E8F\u5217\u7684\u503C\u662F\u600E\u4E48\u6765\u7684\uFF1F</p><p>\u5F53\u524D\u503C+\u6B65\u957F\uFF08\u589E\u91CF\uFF09</p><p>\u6240\u4EE5\uFF0C\u6211\u4EEC\u60F3\u8981\u4FEE\u6539\u5E8F\u5217\u7684\u5F53\u524D\u503C\uFF0C\u5C31\u5FC5\u987B\u81EA\u6539\u5E8F\u5217\u7684\u589E\u91CF\u3002</p><p>\u7B2C\u4E8C\u6B65\uFF1A\u67E5\u8BE2\u5E8F\u5217\u503C\uFF1B</p><p>select SEQ_META_THEME_TABLE.nextval from dual;</p><p>\u8FD9\u4E00\u6B65\u7684\u76EE\u7684\u662F\uFF1A\u6539\u53D8\u5E8F\u5217\u7684\u5F53\u524D\u503C\uFF0C\u8BA9\u5176\u6309\u7167\u81EA\u5DF1\u9884\u8BBE\u7684\u589E\u91CF\u6765\u5B8C\u6210\u5E8F\u5217\u5F53\u524D\u503C\u7684\u4FEE\u6539\u5DE5\u4F5C\u3002</p><p>\u5230\u8FD9\u4E00\u6B65\uFF0C\u8BE5\u5E8F\u5217\u8FD4\u56DE\u7684\u5F53\u524D\u503C\u5DF2\u7ECF\u6539\u6210\u4E86300-271=29\uFF08\u4E0B\u6B21\u8C03\u7528\u5C06\u4F1A\u8FD4\u56DE30\uFF09\u3002</p><p>\u7B2C\u4E09\u6B65\uFF1A\u5C06\u5E8F\u5217\u7684\u589E\u91CF\u6539\u62101\u3002</p><p>alter sequence SEQ_META_THEME_TABLE increment by 1 cache 20;</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token comment">-- Modify the last number </span>
<span class="token keyword">alter</span> sequence SEQ_META_THEME_TABLE increment <span class="token keyword">by</span> <span class="token operator">-</span><span class="token number">271</span> nocache<span class="token punctuation">;</span>
<span class="token keyword">select</span> SEQ_META_THEME_TABLE<span class="token punctuation">.</span>nextval <span class="token keyword">from</span> dual<span class="token punctuation">;</span>
<span class="token keyword">alter</span> sequence SEQ_META_THEME_TABLE increment <span class="token keyword">by</span> <span class="token number">1</span> cache <span class="token number">20</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0D\u4FE1\uFF1F\u6211\u4EEC\u628ASQL\u590D\u5236\u51FA\u6765\uFF0C\u6267\u884C\u4E00\u4E0B\u3002</p><p>\u628A\u5E8F\u5217\u503C\u53D8\u5927\uFF0830--&gt;300\uFF09</p><p>\u5173\u4E8E\u589E\u91CF\u7684\u8BA1\u7B97\uFF1A</p><p>\u5982\u679C\u66F4\u6539\u540E\u503C(afterNum)&gt;\u73B0\u5728\u5E8F\u5217\u7684\u4E0B\u4E00\u4E2A\u503C(nextNum)\uFF0C\u589E\u91CF(step)=afterNum - nextNum\uFF1B</p><p>\u5982\u679C\u66F4\u6539\u540E\u503C(afterNum)&lt;\u73B0\u5728\u5E8F\u5217\u7684\u4E0B\u4E00\u4E2A\u503C(nextNum)\uFF0C\u589E\u91CF(step)=afterNum - nextNum - 1\uFF1B</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,49),o={href:"http://www.manongjc.com/detail/28-blnqrnlyhtnlqul.html",target:"_blank",rel:"noopener noreferrer"},u=r("Oracle \u4FEE\u6539\u5E8F\u5217\u7684\u5F53\u524D\u503C\u76843\u79CD\u65B9\u5F0F");function m(h,v){const n=c("ExternalLinkIcon");return s(),p("div",null,[d,e("p",null,[e("a",o,[u,l(n)])])])}const k=a(i,[["render",m],["__file","oracle-b-sequence.html.vue"]]);export{k as default};
