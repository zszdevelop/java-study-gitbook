import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, d as createVNode, e as createStaticVNode, b as createTextVNode } from "./app.4f6d151a.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u4F7F\u7528zxing\u751F\u6210\u4E8C\u7EF4\u7801\u4E71\u7801\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528zxing\u751F\u6210\u4E8C\u7EF4\u7801\u4E71\u7801\u95EE\u9898" aria-hidden="true">#</a> \u4F7F\u7528zxing\u751F\u6210\u4E8C\u7EF4\u7801\u4E71\u7801\u95EE\u9898</h1><p>\u76F4\u63A5\u4E0A\u4EE3\u7801</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token class-name">QRCodeWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QRCodeWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n        <span class="token comment">// \u89E3\u51B3\u4E2D\u6587\u4E71\u7801\u95EE\u9898</span>\n        <span class="token class-name">String</span> contentCharset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>content<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;ISO-8859-1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">BitMatrix</span> matrix <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>contentCharset<span class="token punctuation">,</span> format<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 4);
const _hoisted_5 = {
  href: "https://www.jianshu.com/p/532832542d91",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u751F\u6210\u53EF\u9632\u6B62\u4E2D\u6587\u4E71\u7801\u7684\u4E8C\u7EF4\u7801\uFF08zxing-android-embeded\uFF09");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_5, [
        _hoisted_6,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var __zxing__________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u4F7F\u7528zxing\u751F\u6210\u4E8C\u7EF4\u7801\u4E71\u7801\u95EE\u9898.html.vue"]]);
export { __zxing__________html as default };
