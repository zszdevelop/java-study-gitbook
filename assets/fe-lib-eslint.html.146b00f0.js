import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as r,a as e,b as s,e as t,d as a,r as c}from"./app.296fdb6c.js";const d={},o=t(`<h1 id="\u5173\u95EDeslint" tabindex="-1"><a class="header-anchor" href="#\u5173\u95EDeslint" aria-hidden="true">#</a> \u5173\u95EDeslint</h1><h2 id="_1-vue-cli\u811A\u624B\u67B6\u7684\u5173\u95ED\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1-vue-cli\u811A\u624B\u67B6\u7684\u5173\u95ED\u65B9\u6CD5" aria-hidden="true">#</a> 1. vue-cli\u811A\u624B\u67B6\u7684\u5173\u95ED\u65B9\u6CD5</h2><p><code>build/webpack.base.conf.js</code> \u914D\u7F6E\u6587\u4EF6\u4E2D\u7684eslint rules\u6CE8\u91CA\u6389</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>module: {
    rules: [
      // {
      //   test: /\\.(js|vue)$/,
      //   loader: &#39;eslint-loader&#39;,
      //   enforce: &#39;pre&#39;,
      //   include: [resolve(&#39;src&#39;), resolve(&#39;test&#39;)],
      //   options: {
      //     formatter: require(&#39;eslint-friendly-formatter&#39;)
      //   }
      // },
      
      ...
     ]
     ...
   }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u60F3\u4FDD\u7559eslint\u7684\u8BED\u6CD5\u68C0\u6D4B\uFF0C\u90A3\u5C31\u628A\u4E0D\u7B26\u5408\u81EA\u5DF1\u4E60\u60EF\u7684\u89C4\u5219</p><h2 id="_2-\u5173\u95EDvue-cli3-0-\u7684eslint" tabindex="-1"><a class="header-anchor" href="#_2-\u5173\u95EDvue-cli3-0-\u7684eslint" aria-hidden="true">#</a> 2. \u5173\u95EDvue-cli3.0 \u7684eslint</h2><p>\u5728 vue.config.js\u4E2D\u5C06\u4EE5\u4E0B\u4E09\u9879\u8BBE\u7F6E\u4E3Afalse</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">module.exports =</span> <span class="token punctuation">{</span>  
    <span class="token selector">...
    // lintOnSave: p<wbr>rocess.env.NODE_ENV === &#39;development&#39;,
    lintOnSave: false,
	devServer:</span> <span class="token punctuation">{</span>
        <span class="token selector">overlay:</span> <span class="token punctuation">{</span>
            <span class="token property">warnings</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span>
            <span class="token property">errors</span><span class="token punctuation">:</span> false
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,9),u={href:"https://blog.csdn.net/qq_34645412/article/details/78974413",target:"_blank",rel:"noopener noreferrer"},v=a("\u5173\u95ED\u4EE4\u4EBA\u6293\u72C2\u7684ESlint \u8BED\u6CD5\u68C0\u6D4B\u914D\u7F6E\u65B9\u6CD5"),p={href:"https://www.jianshu.com/p/bfc7e7329cff",target:"_blank",rel:"noopener noreferrer"},m=a("vue-cli3\u7684eslint\u914D\u7F6E\u95EE\u9898");function b(h,_){const n=c("ExternalLinkIcon");return l(),r("div",null,[o,e("p",null,[e("a",u,[v,s(n)])]),e("p",null,[e("a",p,[m,s(n)])])])}const g=i(d,[["render",b],["__file","fe-lib-eslint.html.vue"]]);export{g as default};
