import{_ as i,W as l,X as r,Y as e,Z as s,$ as a,a0 as t,D as c}from"./framework-0cf5f349.js";const d={},o=t(`<h1 id="关闭eslint" tabindex="-1"><a class="header-anchor" href="#关闭eslint" aria-hidden="true">#</a> 关闭eslint</h1><h2 id="_1-vue-cli脚手架的关闭方法" tabindex="-1"><a class="header-anchor" href="#_1-vue-cli脚手架的关闭方法" aria-hidden="true">#</a> 1. vue-cli脚手架的关闭方法</h2><p><code>build/webpack.base.conf.js</code> 配置文件中的eslint rules注释掉</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>module: {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想保留eslint的语法检测，那就把不符合自己习惯的规则</p><h2 id="_2-关闭vue-cli3-0-的eslint" tabindex="-1"><a class="header-anchor" href="#_2-关闭vue-cli3-0-的eslint" aria-hidden="true">#</a> 2. 关闭vue-cli3.0 的eslint</h2><p>在 vue.config.js中将以下三项设置为false</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">module.exports =</span> <span class="token punctuation">{</span>  
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,9),u={href:"https://blog.csdn.net/qq_34645412/article/details/78974413",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.jianshu.com/p/bfc7e7329cff",target:"_blank",rel:"noopener noreferrer"};function p(m,b){const n=c("ExternalLinkIcon");return l(),r("div",null,[o,e("p",null,[e("a",u,[s("关闭令人抓狂的ESlint 语法检测配置方法"),a(n)])]),e("p",null,[e("a",v,[s("vue-cli3的eslint配置问题"),a(n)])])])}const f=i(d,[["render",p],["__file","fe-lib-eslint.html.vue"]]);export{f as default};
