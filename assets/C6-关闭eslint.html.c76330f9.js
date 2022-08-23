import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u5173\u95EDeslint" tabindex="-1"><a class="header-anchor" href="#\u5173\u95EDeslint" aria-hidden="true">#</a> \u5173\u95EDeslint</h1><h2 id="_1-vue-cli\u811A\u624B\u67B6\u7684\u5173\u95ED\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1-vue-cli\u811A\u624B\u67B6\u7684\u5173\u95ED\u65B9\u6CD5" aria-hidden="true">#</a> 1. vue-cli\u811A\u624B\u67B6\u7684\u5173\u95ED\u65B9\u6CD5</h2><p><code>build/webpack.base.conf.js</code> \u914D\u7F6E\u6587\u4EF6\u4E2D\u7684eslint rules\u6CE8\u91CA\u6389</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>module: {\n    rules: [\n      // {\n      //   test: /\\.(js|vue)$/,\n      //   loader: &#39;eslint-loader&#39;,\n      //   enforce: &#39;pre&#39;,\n      //   include: [resolve(&#39;src&#39;), resolve(&#39;test&#39;)],\n      //   options: {\n      //     formatter: require(&#39;eslint-friendly-formatter&#39;)\n      //   }\n      // },\n      \n      ...\n     ]\n     ...\n   }\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u60F3\u4FDD\u7559eslint\u7684\u8BED\u6CD5\u68C0\u6D4B\uFF0C\u90A3\u5C31\u628A\u4E0D\u7B26\u5408\u81EA\u5DF1\u4E60\u60EF\u7684\u89C4\u5219</p><h2 id="_2-\u5173\u95EDvue-cli3-0-\u7684eslint" tabindex="-1"><a class="header-anchor" href="#_2-\u5173\u95EDvue-cli3-0-\u7684eslint" aria-hidden="true">#</a> 2. \u5173\u95EDvue-cli3.0 \u7684eslint</h2><p>\u5728 vue.config.js\u4E2D\u5C06\u4EE5\u4E0B\u4E09\u9879\u8BBE\u7F6E\u4E3Afalse</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">module.exports =</span> <span class="token punctuation">{</span>  \n    <span class="token selector">...\n    // lintOnSave: p<wbr>rocess.env.NODE_ENV === &#39;development&#39;,\n    lintOnSave: false,\n	devServer:</span> <span class="token punctuation">{</span>\n        <span class="token selector">overlay:</span> <span class="token punctuation">{</span>\n            <span class="token property">warnings</span><span class="token punctuation">:</span> false<span class="token punctuation">,</span>\n            <span class="token property">errors</span><span class="token punctuation">:</span> false\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 9);
const _hoisted_10 = {
  href: "https://blog.csdn.net/qq_34645412/article/details/78974413",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_11 = /* @__PURE__ */ createTextVNode("\u5173\u95ED\u4EE4\u4EBA\u6293\u72C2\u7684ESlint \u8BED\u6CD5\u68C0\u6D4B\u914D\u7F6E\u65B9\u6CD5");
const _hoisted_12 = {
  href: "https://www.jianshu.com/p/bfc7e7329cff",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_13 = /* @__PURE__ */ createTextVNode("vue-cli3\u7684eslint\u914D\u7F6E\u95EE\u9898");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_10, [
        _hoisted_11,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_12, [
        _hoisted_13,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var C6___eslint_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C6-\u5173\u95EDeslint.html.vue"]]);
export { C6___eslint_html as default };
