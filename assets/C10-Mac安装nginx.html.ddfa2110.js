import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.ed238031.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="mac\u5B89\u88C5nginx" tabindex="-1"><a class="header-anchor" href="#mac\u5B89\u88C5nginx" aria-hidden="true">#</a> Mac\u5B89\u88C5nginx</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>Mac\u5B89\u88C5nginx\uFF0C\u91C7\u7528Mac\u7684\u5305\u7BA1\u7406\u5DE5\u5177 <strong>homebrew</strong> \u5B89\u88C5</p><h2 id="_2-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5" aria-hidden="true">#</a> 2. \u5B89\u88C5</h2><h3 id="_2-1-\u6B65\u9AA4\u4E00-\u5148\u66F4\u65B0homebrew" tabindex="-1"><a class="header-anchor" href="#_2-1-\u6B65\u9AA4\u4E00-\u5148\u66F4\u65B0homebrew" aria-hidden="true">#</a> 2.1 <strong>\u6B65\u9AA4\u4E00\uFF1A\u5148\u66F4\u65B0homebrew</strong></h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>brew update\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>', 6);
const _hoisted_7 = /* @__PURE__ */ createTextVNode("\u5982\u679C\u4E0A\u9762\u64CD\u4F5C\u957F\u65F6\u95F4\u6CA1\u4EFB\u4F55\u52A8\u9759\uFF0C\u8BF7\u66F4\u6362\u955C\u50CF\uFF0C\u53C2\u8003\u6E05\u534E\u7684\u955C\u50CF ");
const _hoisted_8 = {
  href: "https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_9 = /* @__PURE__ */ createTextVNode("https://mirrors.tuna.tsinghua...");
const _hoisted_10 = /* @__PURE__ */ createStaticVNode('<h3 id="_2-2-\u6B65\u9AA4\u4E8C-\u67E5\u770Bnginx\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#_2-2-\u6B65\u9AA4\u4E8C-\u67E5\u770Bnginx\u4FE1\u606F" aria-hidden="true">#</a> 2.2 <strong>\u6B65\u9AA4\u4E8C</strong>\uFF1A \u67E5\u770Bnginx\u4FE1\u606F</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>brew search nginx\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210607150955882.png" alt="image-20210607150955882"></p><h3 id="_2-3-\u5B89\u88C5nginx" tabindex="-1"><a class="header-anchor" href="#_2-3-\u5B89\u88C5nginx" aria-hidden="true">#</a> 2.3 <strong>\u5B89\u88C5nginx</strong></h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>brew install nginx\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5B89\u88C5\u5B8C\u6BD5</p><ul><li>\u4E3B\u9875\u7684\u6587\u4EF6\u5728/usr/local/var/www \u6587\u4EF6\u5939\u4E0B</li><li>\u5BF9\u5E94\u7684\u914D\u7F6E\u6587\u4EF6\u5730\u5740\u5728/usr/local/etc/nginx/nginx.conf</li></ul><h3 id="_2-4-\u6B65\u9AA4\u56DB-\u8FD0\u884Cnginx" tabindex="-1"><a class="header-anchor" href="#_2-4-\u6B65\u9AA4\u56DB-\u8FD0\u884Cnginx" aria-hidden="true">#</a> <strong>2.4 \u6B65\u9AA4\u56DB\uFF1A\u8FD0\u884Cnginx</strong></h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>nginx\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>nginx\u9ED8\u8BA4\u4F7F\u75288080\u7AEF\u53E3 \u5982\u679C\u53D1\u73B0\u7AEF\u53E3\u88AB\u5360\u7528\u4E86\uFF0C\u53EF\u4EE5\u6740\u6389\u4F7F\u7528\u4F7F\u7528\u6539\u7AEF\u53E3\u7684\u8FDB\u7A0B\uFF0C\u4E5F\u53EF\u4EE5\u4FEE\u6539/usr/local/etc/nginx/nginx.conf \u4E0B\u7684</p><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>\n    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>\n        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">8181</span></span><span class="token punctuation">;</span>\n        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>  \n\n        <span class="token comment">#charset koi8-r;</span>\n        .....\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-\u91CD\u65B0\u542F\u52A8nginx" tabindex="-1"><a class="header-anchor" href="#_2-5-\u91CD\u65B0\u542F\u52A8nginx" aria-hidden="true">#</a> 2.5 <strong>\u91CD\u65B0\u542F\u52A8nginx</strong></h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>nginx -s reload\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6210\u529F\u770B\u5230\u6B22\u8FCE\u9875\u9762\uFF5E\uFF01\uFF08\u5BF9\u5E94\u7684html\u662F/usr/local/var/www/index.html\uFF09</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210607151153045.png" alt="image-20210607151153045"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 16);
const _hoisted_26 = {
  href: "https://segmentfault.com/a/1190000016020328",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_27 = /* @__PURE__ */ createTextVNode("MAC\u4E0B\u5B89\u88C5nginx");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_7,
      createBaseVNode("a", _hoisted_8, [
        _hoisted_9,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_10,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_26, [
        _hoisted_27,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var C10Mac__nginx_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C10-Mac\u5B89\u88C5nginx.html.vue"]]);
export { C10Mac__nginx_html as default };
