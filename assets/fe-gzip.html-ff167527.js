import{_ as i,W as e,X as n,a0 as s}from"./framework-0cf5f349.js";const a={},l=s(`<h1 id="首页优化之-gzip压缩" tabindex="-1"><a class="header-anchor" href="#首页优化之-gzip压缩" aria-hidden="true">#</a> 首页优化之-gzip压缩</h1><p>当前打包出来的dist 是13.6M</p><p>使用gzip压缩之后变成15.8M,在原有的基础上加上了gzip</p><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>gzip 压缩是一种http请求优化方式，通过减少文件体积来提高加载速度。html、js、css文件甚至json数据都可以用它来压缩，可以减少60%以上的体积</p><h2 id="_2-压缩配置" tabindex="-1"><a class="header-anchor" href="#_2-压缩配置" aria-hidden="true">#</a> 2. 压缩配置</h2><h3 id="_2-1-安装-compression-webpack-plugin-插件" tabindex="-1"><a class="header-anchor" href="#_2-1-安装-compression-webpack-plugin-插件" aria-hidden="true">#</a> 2.1 安装 compression webpack plugin 插件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install --save-dev compression-webpack-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-在vue-cli3-0-生成的项目里-可在vue-config-js-中按照如下方式配置" tabindex="-1"><a class="header-anchor" href="#_2-2-在vue-cli3-0-生成的项目里-可在vue-config-js-中按照如下方式配置" aria-hidden="true">#</a> 2.2 在vue cli3.0 生成的项目里，可在vue.config.js 中按照如下方式配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
const CompressionWebpackPlugin = require(&quot;compression-webpack-plugin&quot;);
const productionGzipExtensions = /\\.(js|css|json|txt|html|ico|svg)(\\?.*)?$/i;

module.exports = {
 	...
  configureWebpack: config =&gt; {
    const plugins = [];

    // Begin 生成 gzip 压缩文件
    plugins.push(
        new CompressionWebpackPlugin({
            filename: &quot;[path].gz[query]&quot;,
            algorithm: &quot;gzip&quot;,
            test: productionGzipExtensions,
            threshold: 10240,
            minRatio: 0.8
        })
    );
    // End 生成 gzip 压缩文件
    
    config.plugins = [...config.plugins, ...plugins];
	},
	...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-nginx-配置" tabindex="-1"><a class="header-anchor" href="#_2-3-nginx-配置" aria-hidden="true">#</a> 2.3 nginx 配置</h3><p>在nginx.conf 的 在http 中添加</p><pre><code>gzip                on;
#gzip_static         on;
gzip_min_length     1k;
gzip_comp_level     5;
gzip_http_version   1.0;
gzip_types          text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
</code></pre><p>使用 gzip_static 需要nginx 支持，可选择性开启</p><ul><li><p>使用前876KB</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200326183747822.png" alt="image-20200326183747822" tabindex="0" loading="lazy"><figcaption>image-20200326183747822</figcaption></figure></li><li><p>使用后311KB</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200326183657671.png" alt="image-20200326183657671" tabindex="0" loading="lazy"><figcaption>image-20200326183657671</figcaption></figure></li></ul>`,15),d=[l];function c(t,r){return e(),n("div",null,d)}const p=i(a,[["render",c],["__file","fe-gzip.html.vue"]]);export{p as default};
