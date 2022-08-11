import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f59c6cb9.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="mongodb\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#mongodb\u7D22\u5F15" aria-hidden="true">#</a> mongoDB\u7D22\u5F15</h1><h2 id="_1-\u5E38\u7528\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_1-\u5E38\u7528\u64CD\u4F5C" aria-hidden="true">#</a> 1. \u5E38\u7528\u64CD\u4F5C</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">//\u521B\u5EFA\u7D22\u5F15,\u503C1\u8868\u793A\u6B63\u5E8F\u6392\u5E8F\uFF0C-1\u8868\u793A\u5012\u5E8F\u6392\u5E8F</span>\n\u3000\u3000db<span class="token punctuation">.</span>userinfos<span class="token punctuation">.</span><span class="token function">createIndex</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">//\u67E5\u770Buserinfos\u4E2D\u7684\u6240\u6709\u7D22\u5F15</span>\n\u3000\u3000db<span class="token punctuation">.</span>userinfos<span class="token punctuation">.</span><span class="token function">getIndexes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token comment">//\u5220\u9664\u7279\u5B9A\u4E00\u4E2A\u7D22\u5F15</span>\n\u3000\u3000db<span class="token punctuation">.</span>userinfos<span class="token punctuation">.</span><span class="token function">dropIndex</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">//\u5220\u9664\u6240\u6709\u7684\u7D22\u5F15(\u4E3B\u952E\u7D22\u5F15_id\u4E0D\u4F1A\u88AB\u5220\u9664)</span>\n\u3000\u3000db<span class="token punctuation">.</span>userinfos<span class="token punctuation">.</span><span class="token function">dropIndexes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 4);
const _hoisted_5 = {
  href: "https://www.cnblogs.com/wyy1234/p/11032163.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u5FEB\u901F\u638C\u63E1mongoDB(\u4E09)\u2014\u2014mongoDB\u7684\u7D22\u5F15\u8BE6\u89E3");
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
var mongoDB___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "mongoDB\u7D22\u5F15.html.vue"]]);
export { mongoDB___html as default };
