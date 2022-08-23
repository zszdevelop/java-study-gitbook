import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="mongodb\u4E0B\u67E5\u8BE2\u67D0\u4E2A\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#mongodb\u4E0B\u67E5\u8BE2\u67D0\u4E2A\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6587\u6863" aria-hidden="true">#</a> mongodb\u4E0B\u67E5\u8BE2\u67D0\u4E2A\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6587\u6863</h1><h4 id="_1-ne" tabindex="-1"><a class="header-anchor" href="#_1-ne" aria-hidden="true">#</a> 1. $ne</h4><p>$ne\uFF1A\u8868\u793Anot equals \u5C31\u662F\u4E0D\u7B49\u4E8E\u7684\u610F\u601D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code># \u67E5\u8BE2\u67D0\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6570\u636E\ndb<span class="token punctuation">.</span>hfijf<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">fieldName</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$ne</span><span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n# \u67E5\u8BE2\u5B57\u6BB5\u7B49\u4E8E\u7A7A\u7684\u6570\u636E\ndb<span class="token punctuation">.</span>hfijf<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">fieldName</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$eq</span><span class="token operator">:</span><span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-exists" tabindex="-1"><a class="header-anchor" href="#_2-exists" aria-hidden="true">#</a> 2. $exists</h4><p>$exists\uFF1A\u8868\u793A\u662F\u5426\u5B58\u5728\u3002\u503C\u4E3Afalse\u8868\u793A\u4E0D\u5B58\u5728\uFF0C\u503C\u4E3Atrue\u8868\u793A\u5B58\u5728</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code># \u67E5\u8BE2\u67D0\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6570\u636E\ndb<span class="token punctuation">.</span>fdafdsa<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">fieldName</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$exists</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n# <span class="token operator">/</span>\u67E5\u8BE2\u67D0\u5B57\u6BB5\u4E0D\u5B58\u5728\u7684\u6570\u636E\ndb<span class="token punctuation">.</span>fdafdsa<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">fieldName</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">$exists</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 8);
const _hoisted_9 = {
  href: "https://blog.csdn.net/qq_39935047/article/details/107450151",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_10 = /* @__PURE__ */ createTextVNode("mongodb\u4E0B\u67E5\u8BE2\u67D0\u4E2A\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6587\u6863");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_9, [
        _hoisted_10,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var mongodb______________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "mongodb\u4E0B\u67E5\u8BE2\u67D0\u4E2A\u5B57\u6BB5\u4E0D\u4E3A\u7A7A\u7684\u6587\u6863.html.vue"]]);
export { mongodb______________html as default };
