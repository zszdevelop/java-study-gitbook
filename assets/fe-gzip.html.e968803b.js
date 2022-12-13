import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as n,d as s}from"./app.d4563a68.js";const a={},l=s(`<h1 id="\u9996\u9875\u4F18\u5316\u4E4B-gzip\u538B\u7F29" tabindex="-1"><a class="header-anchor" href="#\u9996\u9875\u4F18\u5316\u4E4B-gzip\u538B\u7F29" aria-hidden="true">#</a> \u9996\u9875\u4F18\u5316\u4E4B-gzip\u538B\u7F29</h1><p>\u5F53\u524D\u6253\u5305\u51FA\u6765\u7684dist \u662F13.6M</p><p>\u4F7F\u7528gzip\u538B\u7F29\u4E4B\u540E\u53D8\u621015.8M,\u5728\u539F\u6709\u7684\u57FA\u7840\u4E0A\u52A0\u4E0A\u4E86gzip</p><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>gzip \u538B\u7F29\u662F\u4E00\u79CDhttp\u8BF7\u6C42\u4F18\u5316\u65B9\u5F0F\uFF0C\u901A\u8FC7\u51CF\u5C11\u6587\u4EF6\u4F53\u79EF\u6765\u63D0\u9AD8\u52A0\u8F7D\u901F\u5EA6\u3002html\u3001js\u3001css\u6587\u4EF6\u751A\u81F3json\u6570\u636E\u90FD\u53EF\u4EE5\u7528\u5B83\u6765\u538B\u7F29\uFF0C\u53EF\u4EE5\u51CF\u5C1160%\u4EE5\u4E0A\u7684\u4F53\u79EF</p><h2 id="_2-\u538B\u7F29\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-\u538B\u7F29\u914D\u7F6E" aria-hidden="true">#</a> 2. \u538B\u7F29\u914D\u7F6E</h2><h3 id="_2-1-\u5B89\u88C5-compression-webpack-plugin-\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5B89\u88C5-compression-webpack-plugin-\u63D2\u4EF6" aria-hidden="true">#</a> 2.1 \u5B89\u88C5 compression webpack plugin \u63D2\u4EF6</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>npm install --save-dev compression-webpack-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-\u5728vue-cli3-0-\u751F\u6210\u7684\u9879\u76EE\u91CC-\u53EF\u5728vue-config-js-\u4E2D\u6309\u7167\u5982\u4E0B\u65B9\u5F0F\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-2-\u5728vue-cli3-0-\u751F\u6210\u7684\u9879\u76EE\u91CC-\u53EF\u5728vue-config-js-\u4E2D\u6309\u7167\u5982\u4E0B\u65B9\u5F0F\u914D\u7F6E" aria-hidden="true">#</a> 2.2 \u5728vue cli3.0 \u751F\u6210\u7684\u9879\u76EE\u91CC\uFF0C\u53EF\u5728vue.config.js \u4E2D\u6309\u7167\u5982\u4E0B\u65B9\u5F0F\u914D\u7F6E</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
const CompressionWebpackPlugin = require(&quot;compression-webpack-plugin&quot;);
const productionGzipExtensions = /\\.(js|css|json|txt|html|ico|svg)(\\?.*)?$/i;

module.exports = {
 	...
  configureWebpack: config =&gt; {
    const plugins = [];

    // Begin \u751F\u6210 gzip \u538B\u7F29\u6587\u4EF6
    plugins.push(
        new CompressionWebpackPlugin({
            filename: &quot;[path].gz[query]&quot;,
            algorithm: &quot;gzip&quot;,
            test: productionGzipExtensions,
            threshold: 10240,
            minRatio: 0.8
        })
    );
    // End \u751F\u6210 gzip \u538B\u7F29\u6587\u4EF6
    
    config.plugins = [...config.plugins, ...plugins];
	},
	...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-nginx-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-3-nginx-\u914D\u7F6E" aria-hidden="true">#</a> 2.3 nginx \u914D\u7F6E</h3><p>\u5728nginx.conf \u7684 \u5728http \u4E2D\u6DFB\u52A0</p><pre><code>gzip                on;
#gzip_static         on;
gzip_min_length     1k;
gzip_comp_level     5;
gzip_http_version   1.0;
gzip_types          text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
</code></pre><p>\u4F7F\u7528 gzip_static \u9700\u8981nginx \u652F\u6301\uFF0C\u53EF\u9009\u62E9\u6027\u5F00\u542F</p><ul><li><p>\u4F7F\u7528\u524D876KB</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200326183747822.png" alt="image-20200326183747822" loading="lazy"></p></li><li><p>\u4F7F\u7528\u540E311KB</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200326183657671.png" alt="image-20200326183657671" loading="lazy"></p></li></ul>`,15),d=[l];function c(t,r){return e(),n("div",null,d)}const u=i(a,[["render",c],["__file","fe-gzip.html.vue"]]);export{u as default};
