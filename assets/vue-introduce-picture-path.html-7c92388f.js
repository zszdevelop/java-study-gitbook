import{_ as l,W as a,X as d,Y as e,Z as i,$ as n,a0 as t,D as c}from"./framework-0cf5f349.js";const o={},r=e("h1",{id:"vuejs中引入图片路径的几种方式",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vuejs中引入图片路径的几种方式","aria-hidden":"true"},"#"),i(" Vuejs中引入图片路径的几种方式")],-1),u=e("h2",{id:"_1-vue中静态资源的引入机制",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-vue中静态资源的引入机制","aria-hidden":"true"},"#"),i(" 1. vue中静态资源的引入机制")],-1),v={href:"https://cli.vuejs.org/zh/guide/html-and-static-assets.html#%E5%A4%84%E7%90%86%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90",target:"_blank",rel:"noopener noreferrer"},g=t('<p>静态资源可以通过两种方式进行处理：</p><ol><li>在 JavaScript 被导入或在 template/CSS 中通过相对路径(以 . 开头)被引用。这类引用会被 webpack 处理。 <ul><li>诸如 <code>&lt;img src=&quot;...&quot;&gt;</code>、<code>background: url(...)</code> 和 <code>CSS @import</code> 的资源 <ul><li>写在 template 中内联 style 的 <code>background: url(...)</code> 样式，在当前版本的测试中，即使使用了相对路径也不会被webpack处理</li></ul></li><li>例如，<code>url(./image.png)</code> 会被翻译为 <code>require(&#39;./image.png&#39;)</code></li></ul></li><li>放置在 <code>public</code> 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理，你需要通过绝对路径来引用它们。 <ul><li>如果 URL 是一个绝对路径，例如 <code>/images/foo.png</code> ，它将会被保留不变。</li></ul></li></ol><h2 id="_2-目录结构" tabindex="-1"><a class="header-anchor" href="#_2-目录结构" aria-hidden="true">#</a> 2. 目录结构</h2><blockquote><p>vue-path/ ----- public/ -------- images/ ------------ XX.jpg ----- src/ -------- assets/ ------------ images/ ---------------- XX.jpg -------- App.vue ...</p></blockquote><h2 id="_3-引入示例" tabindex="-1"><a class="header-anchor" href="#_3-引入示例" aria-hidden="true">#</a> 3. 引入示例</h2><p><code>App.vue</code>:</p>',6),m=t(`<li><p><strong>√</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;img src=&quot;./assets/images/01.jpg&quot; alt=&quot;&quot;&gt; // √
// 编译后:
&lt;img src=&quot;/img/01.f0cfc21d.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常见的引入方式，路径是固定的字符串，图片会被webpack处理，文件若丢失会直接在编译时报错，生成的文件包含了哈希值</p></li><li><p><strong>×</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;img :src=&quot;&#39;./assets/images/02.jpg&#39;&quot; alt=&quot;&quot;&gt; // ×
// 编译后:
&lt;img src=&quot;./assets/images/02.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>错误的引入方式，使用<code>:src</code>调用了<code>v-bind</code>指令处理其内容，相对路径不会被webpack的<code>file-loader</code>处理</p></li><li><p><strong>√</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;img :src=&quot;require(&#39;./assets/images/03.jpg&#39;)&quot; alt=&quot;&quot;&gt; // √
&lt;img :src=&quot;require(&#39;./assets/images/&#39;+ this.imgName +&#39;.jpg&#39;)&quot; alt=&quot;&quot;&gt; // √
&lt;img :src=&quot;img3&quot; alt=&quot;&quot;&gt; // √
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
// 编译后:
&lt;img src=&quot;/img/03.ea62525c.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当路径的文件名需要拼接变量的时候，可使用 <code>require()</code> 引入，在 template 的<code>:src</code> 或者 script 的 <code>data</code> <code>computed</code> 中都可以进行 <code>require</code> 引入或拼接</p></li>`,3),p=t(`<p><strong>×</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;img src=&quot;/images/04.jpg&quot; alt=&quot;&quot;&gt; // -
// 编译后:
&lt;img src=&quot;/images/04.jpg&quot; alt=&quot;&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),b=e("code",null,"public",-1),h=e("code",null,"http://www.abc.com/",-1),q=e("code",null,"publicPath",-1),_=e("code",null,"vue.config.js",-1),x={href:"https://cli.vuejs.org/zh/config/#publicpath",target:"_blank",rel:"noopener noreferrer"},f=t(`<li><p>√**</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;img :src=&quot;this.publicPath + &#39;images/05.jpg&#39;&quot; alt=&quot;&quot;&gt; // √
// 编译后:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue.config.js中:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//vue.config.js
module.exports = {
    publicPath:&#39;/foo/&#39;,
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入publicPath并且将其拼接在路径中，实现引入路径的动态变动</p></li>`,1),j=e("h2",{id:"参考文章",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考文章","aria-hidden":"true"},"#"),i(" 参考文章")],-1),k={href:"https://segmentfault.com/a/1190000019495695",target:"_blank",rel:"noopener noreferrer"};function w(E,P){const s=c("ExternalLinkIcon");return a(),d("div",null,[r,u,e("blockquote",null,[e("p",null,[i("Vue.js关于静态资源的"),e("a",v,[i("官方文档"),n(s)])])]),g,e("ol",null,[m,e("li",null,[p,e("p",null,[i("用绝对路径引入时，路径读取的是public文件夹中的资源，任何放置在 "),b,i(" 文件夹的静态资源都会被简单的复制到编译后的目录中，而不经过 webpack特殊处理。 当你的应用被部署在一个域名的根路径上时，比如"),h,i("，此时这种引入方式可以正常显示 但是如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀 "),q,i(" 是部署应用包时的基本 URL，在 "),_,i(" 中进行配置，详情参阅"),e("a",x,[i("官方文档"),n(s)])])]),f]),j,e("p",null,[e("a",k,[i("Vue.js中引入图片路径的几种方式"),n(s)])])])}const V=l(o,[["render",w],["__file","vue-introduce-picture-path.html.vue"]]);export{V as default};
