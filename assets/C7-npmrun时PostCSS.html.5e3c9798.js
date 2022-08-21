import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.7a45cd91.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="npm-\u8FD0\u884C\u9879\u76EE\u65F6-error-postcss-received-undefined-instead-of-css-string" tabindex="-1"><a class="header-anchor" href="#npm-\u8FD0\u884C\u9879\u76EE\u65F6-error-postcss-received-undefined-instead-of-css-string" aria-hidden="true">#</a> npm \u8FD0\u884C\u9879\u76EE\u65F6 Error: PostCSS received undefined instead of CSS string</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u65B0\u62C9\u4E0B\u6765\u7684\u9879\u76EE\uFF0C\u542F\u52A8\u9879\u76EE npm run dev \u7684\u65F6\u5019\u5C31\u62A5\u9519\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token literal-property property">Error</span><span class="token operator">:</span> PostCSS received <span class="token keyword">undefined</span> instead <span class="token keyword">of</span> <span class="token constant">CSS</span> string\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-\u539F\u56E0" tabindex="-1"><a class="header-anchor" href="#_2-\u539F\u56E0" aria-hidden="true">#</a> 2. \u539F\u56E0</h2><p>\u6211\u7684node\u7684\u7248\u672C\u5F71\u54CD\u4E86node-sass\u7684\u5E94\u7528\u3002</p><h2 id="_3-\u89E3\u51B3\u529E\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-\u89E3\u51B3\u529E\u6CD5" aria-hidden="true">#</a> 3. \u89E3\u51B3\u529E\u6CD5</h2><p>\u5378\u8F7D\u5F53\u524D\u7248\u672C\uFF0C\u5B89\u88C5\u6700\u65B0\u7248\u672C\u7684node-sass</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>npm uninstall node-sass\n\nnpm install node-sass --save-dev\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664\u4F9D\u8D56\uFF0C\u91CD\u65B0\u5B89\u88C5\u53C8\u4F9D\u8D56</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rimraf node_modules\n\nnpm install\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u518D\u91CD\u65B0\u542F\u52A8\u9879\u76EE\u5C31\u6210\u529F\u4E86</p><h1 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h1>', 13);
const _hoisted_14 = {
  href: "https://blog.csdn.net/Sunday97/article/details/116492447",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_15 = /* @__PURE__ */ createTextVNode("Error: PostCSS received undefined instead of CSS string");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_14, [
        _hoisted_15,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var C7Npmrun_PostCSS_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C7-npmrun\u65F6PostCSS.html.vue"]]);
export { C7Npmrun_PostCSS_html as default };
