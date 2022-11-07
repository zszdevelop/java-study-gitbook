import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as a,a as e,b as n,e as i,d as t,r as o}from"./app.b58ae558.js";const c={},r=e("h1",{id:"vuejs\u4E2D\u5F15\u5165\u56FE\u7247\u8DEF\u5F84\u7684\u51E0\u79CD\u65B9\u5F0F",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vuejs\u4E2D\u5F15\u5165\u56FE\u7247\u8DEF\u5F84\u7684\u51E0\u79CD\u65B9\u5F0F","aria-hidden":"true"},"#"),i(" Vuejs\u4E2D\u5F15\u5165\u56FE\u7247\u8DEF\u5F84\u7684\u51E0\u79CD\u65B9\u5F0F")],-1),u=e("h2",{id:"_1-vue\u4E2D\u9759\u6001\u8D44\u6E90\u7684\u5F15\u5165\u673A\u5236",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-vue\u4E2D\u9759\u6001\u8D44\u6E90\u7684\u5F15\u5165\u673A\u5236","aria-hidden":"true"},"#"),i(" 1. vue\u4E2D\u9759\u6001\u8D44\u6E90\u7684\u5F15\u5165\u673A\u5236")],-1),v=i("Vue.js\u5173\u4E8E\u9759\u6001\u8D44\u6E90\u7684"),m={href:"https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E5%A4%84%E7%90%86%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90",target:"_blank",rel:"noopener noreferrer"},g=i("\u5B98\u65B9\u6587\u6863"),p=t('<p>\u9759\u6001\u8D44\u6E90\u53EF\u4EE5\u901A\u8FC7\u4E24\u79CD\u65B9\u5F0F\u8FDB\u884C\u5904\u7406\uFF1A</p><ol><li>\u5728 JavaScript \u88AB\u5BFC\u5165\u6216\u5728 template/CSS \u4E2D\u901A\u8FC7\u76F8\u5BF9\u8DEF\u5F84(\u4EE5 . \u5F00\u5934)\u88AB\u5F15\u7528\u3002\u8FD9\u7C7B\u5F15\u7528\u4F1A\u88AB webpack \u5904\u7406\u3002 <ul><li>\u8BF8\u5982 <code>&lt;img src=&quot;...&quot;&gt;</code>\u3001<code>background: url(...)</code> \u548C <code>CSS @import</code> \u7684\u8D44\u6E90 <ul><li>\u5199\u5728 template \u4E2D\u5185\u8054 style \u7684 <code>background: url(...)</code> \u6837\u5F0F\uFF0C\u5728\u5F53\u524D\u7248\u672C\u7684\u6D4B\u8BD5\u4E2D\uFF0C\u5373\u4F7F\u4F7F\u7528\u4E86\u76F8\u5BF9\u8DEF\u5F84\u4E5F\u4E0D\u4F1A\u88ABwebpack\u5904\u7406</li></ul></li><li>\u4F8B\u5982\uFF0C<code>url(./image.png)</code> \u4F1A\u88AB\u7FFB\u8BD1\u4E3A <code>require(&#39;./image.png&#39;)</code></li></ul></li><li>\u653E\u7F6E\u5728 <code>public</code> \u76EE\u5F55\u4E0B\u6216\u901A\u8FC7\u7EDD\u5BF9\u8DEF\u5F84\u88AB\u5F15\u7528\u3002\u8FD9\u7C7B\u8D44\u6E90\u5C06\u4F1A\u76F4\u63A5\u88AB\u62F7\u8D1D\uFF0C\u800C\u4E0D\u4F1A\u7ECF\u8FC7 webpack \u7684\u5904\u7406\uFF0C\u4F60\u9700\u8981\u901A\u8FC7\u7EDD\u5BF9\u8DEF\u5F84\u6765\u5F15\u7528\u5B83\u4EEC\u3002 <ul><li>\u5982\u679C URL \u662F\u4E00\u4E2A\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4F8B\u5982 <code>/images/foo.png</code> \uFF0C\u5B83\u5C06\u4F1A\u88AB\u4FDD\u7559\u4E0D\u53D8\u3002</li></ul></li></ol><h2 id="_2-\u76EE\u5F55\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#_2-\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a> 2. \u76EE\u5F55\u7ED3\u6784</h2><blockquote><p>vue-path/ ----- public/ -------- images/ ------------ XX.jpg ----- src/ -------- assets/ ------------ images/ ---------------- XX.jpg -------- App.vue ...</p></blockquote><h2 id="_3-\u5F15\u5165\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_3-\u5F15\u5165\u793A\u4F8B" aria-hidden="true">#</a> 3. \u5F15\u5165\u793A\u4F8B</h2><p><code>App.vue</code>:</p>',6),b=t(`<li><p><strong>\u221A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;img src=&quot;./assets/images/01.jpg&quot; alt=&quot;&quot;&gt; // \u221A
// \u7F16\u8BD1\u540E:
&lt;img src=&quot;/img/01.f0cfc21d.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5E38\u89C1\u7684\u5F15\u5165\u65B9\u5F0F\uFF0C\u8DEF\u5F84\u662F\u56FA\u5B9A\u7684\u5B57\u7B26\u4E32\uFF0C\u56FE\u7247\u4F1A\u88ABwebpack\u5904\u7406\uFF0C\u6587\u4EF6\u82E5\u4E22\u5931\u4F1A\u76F4\u63A5\u5728\u7F16\u8BD1\u65F6\u62A5\u9519\uFF0C\u751F\u6210\u7684\u6587\u4EF6\u5305\u542B\u4E86\u54C8\u5E0C\u503C</p></li><li><p><strong>\xD7</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;img :src=&quot;&#39;./assets/images/02.jpg&#39;&quot; alt=&quot;&quot;&gt; // \xD7
// \u7F16\u8BD1\u540E:
&lt;img src=&quot;./assets/images/02.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9519\u8BEF\u7684\u5F15\u5165\u65B9\u5F0F\uFF0C\u4F7F\u7528<code>:src</code>\u8C03\u7528\u4E86<code>v-bind</code>\u6307\u4EE4\u5904\u7406\u5176\u5185\u5BB9\uFF0C\u76F8\u5BF9\u8DEF\u5F84\u4E0D\u4F1A\u88ABwebpack\u7684<code>file-loader</code>\u5904\u7406</p></li><li><p><strong>\u221A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;img :src=&quot;require(&#39;./assets/images/03.jpg&#39;)&quot; alt=&quot;&quot;&gt; // \u221A
&lt;img :src=&quot;require(&#39;./assets/images/&#39;+ this.imgName +&#39;.jpg&#39;)&quot; alt=&quot;&quot;&gt; // \u221A
&lt;img :src=&quot;img3&quot; alt=&quot;&quot;&gt; // \u221A
&lt;script&gt;
export default:{
    data(){
        return {
          imgName:&#39;03.jpg&#39;,
          img3:require(&#39;./assets/images/03.jpg&#39;),
        }
      },
}
&lt;/script&gt;
// \u7F16\u8BD1\u540E:
&lt;img src=&quot;/img/03.ea62525c.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u8DEF\u5F84\u7684\u6587\u4EF6\u540D\u9700\u8981\u62FC\u63A5\u53D8\u91CF\u7684\u65F6\u5019\uFF0C\u53EF\u4F7F\u7528 <code>require()</code> \u5F15\u5165\uFF0C\u5728 template \u7684<code>:src</code> \u6216\u8005 script \u7684 <code>data</code> <code>computed</code> \u4E2D\u90FD\u53EF\u4EE5\u8FDB\u884C <code>require</code> \u5F15\u5165\u6216\u62FC\u63A5</p></li>`,3),h=t(`<p><strong>\xD7</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;img src=&quot;/images/04.jpg&quot; alt=&quot;&quot;&gt; // -
// \u7F16\u8BD1\u540E:
&lt;img src=&quot;/images/04.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),_=i("\u7528\u7EDD\u5BF9\u8DEF\u5F84\u5F15\u5165\u65F6\uFF0C\u8DEF\u5F84\u8BFB\u53D6\u7684\u662Fpublic\u6587\u4EF6\u5939\u4E2D\u7684\u8D44\u6E90\uFF0C\u4EFB\u4F55\u653E\u7F6E\u5728 "),q=e("code",null,"public",-1),x=i(" \u6587\u4EF6\u5939\u7684\u9759\u6001\u8D44\u6E90\u90FD\u4F1A\u88AB\u7B80\u5355\u7684\u590D\u5236\u5230\u7F16\u8BD1\u540E\u7684\u76EE\u5F55\u4E2D\uFF0C\u800C\u4E0D\u7ECF\u8FC7 webpack\u7279\u6B8A\u5904\u7406\u3002 \u5F53\u4F60\u7684\u5E94\u7528\u88AB\u90E8\u7F72\u5728\u4E00\u4E2A\u57DF\u540D\u7684\u6839\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u6BD4\u5982"),f=e("code",null,"http://www.abc.com/",-1),j=i("\uFF0C\u6B64\u65F6\u8FD9\u79CD\u5F15\u5165\u65B9\u5F0F\u53EF\u4EE5\u6B63\u5E38\u663E\u793A \u4F46\u662F\u5982\u679C\u4F60\u7684\u5E94\u7528\u6CA1\u6709\u90E8\u7F72\u5728\u57DF\u540D\u7684\u6839\u90E8\uFF0C\u90A3\u4E48\u4F60\u9700\u8981\u4E3A\u4F60\u7684 URL \u914D\u7F6E publicPath \u524D\u7F00 "),k=e("code",null,"publicPath",-1),w=i(" \u662F\u90E8\u7F72\u5E94\u7528\u5305\u65F6\u7684\u57FA\u672C URL\uFF0C\u5728 "),E=e("code",null,"vue.config.js",-1),P=i(" \u4E2D\u8FDB\u884C\u914D\u7F6E\uFF0C\u8BE6\u60C5\u53C2\u9605"),S={href:"https://cli.vuejs.org/zh/config/#publicpath",target:"_blank",rel:"noopener noreferrer"},V=i("\u5B98\u65B9\u6587\u6863"),B=t(`<li><p>\u221A**</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;img :src=&quot;this.publicPath + &#39;images/05.jpg&#39;&quot; alt=&quot;&quot;&gt; // \u221A
// \u7F16\u8BD1\u540E:
&lt;img src=&quot;/foo/images/05.jpg&quot; alt=&quot;&quot;&gt;
&lt;script&gt;
export default:{
    data(){
        return {
          publicPath: p<wbr>rocess.env.BASE_URL,
        }
    },
}
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue.config.js\u4E2D:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//vue.config.js
module.exports = {
    publicPath:&#39;/foo/&#39;,
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F15\u5165publicPath\u5E76\u4E14\u5C06\u5176\u62FC\u63A5\u5728\u8DEF\u5F84\u4E2D\uFF0C\u5B9E\u73B0\u5F15\u5165\u8DEF\u5F84\u7684\u52A8\u6001\u53D8\u52A8</p></li>`,1),L=e("h2",{id:"\u53C2\u8003\u6587\u7AE0",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u53C2\u8003\u6587\u7AE0","aria-hidden":"true"},"#"),i(" \u53C2\u8003\u6587\u7AE0")],-1),N={href:"https://segmentfault.com/a/1190000019495695",target:"_blank",rel:"noopener noreferrer"},A=i("Vue.js\u4E2D\u5F15\u5165\u56FE\u7247\u8DEF\u5F84\u7684\u51E0\u79CD\u65B9\u5F0F");function R(U,X){const s=o("ExternalLinkIcon");return d(),a("div",null,[r,u,e("blockquote",null,[e("p",null,[v,e("a",m,[g,n(s)])])]),p,e("ol",null,[b,e("li",null,[h,e("p",null,[_,q,x,f,j,k,w,E,P,e("a",S,[V,n(s)])])]),B]),L,e("p",null,[e("a",N,[A,n(s)])])])}const z=l(c,[["render",R],["__file","vue-introduce-picture-path.html.vue"]]);export{z as default};
