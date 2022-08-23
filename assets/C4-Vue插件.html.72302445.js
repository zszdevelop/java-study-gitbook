import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, d as createTextVNode, e as createStaticVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "vue\u63D2\u4EF6",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#vue\u63D2\u4EF6",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" Vue\u63D2\u4EF6")
], -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "_1-\u7B80\u4ECB",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_1-\u7B80\u4ECB",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 1. \u7B80\u4ECB")
], -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("Vue \u63D2\u4EF6\u4E3B\u8981\u7528\u6765\u6DFB\u52A0"),
  /* @__PURE__ */ createBaseVNode("strong", null, "\u5168\u5C40\u529F\u80FD"),
  /* @__PURE__ */ createTextVNode("\uFF0C\u529F\u80FD\u6307\u7684\u662F\u4EC0\u4E48\uFF1F\u53EA\u662F\u4E00\u4E2A\u5168\u5C40\u65B9\u6CD5\u5417\uFF1F\u80AF\u5B9A\u4E0D\u662F\u3002")
], -1);
const _hoisted_4 = /* @__PURE__ */ createTextVNode("\u6DFB\u52A0\u5168\u5C40\u65B9\u6CD5\u6216\u8005 property\u3002\u5982\uFF1A");
const _hoisted_5 = {
  href: "https://github.com/karol-f/vue-custom-element",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode("vue-custom-element");
const _hoisted_7 = /* @__PURE__ */ createTextVNode("\u6DFB\u52A0\u5168\u5C40\u8D44\u6E90\uFF1A\u6307\u4EE4/\u8FC7\u6EE4\u5668/\u8FC7\u6E21\u7B49\u3002\u5982 ");
const _hoisted_8 = {
  href: "https://github.com/vuejs/vue-touch",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_9 = /* @__PURE__ */ createTextVNode("vue-touch");
const _hoisted_10 = /* @__PURE__ */ createTextVNode("\u901A\u8FC7\u5168\u5C40\u6DF7\u5165\u6765\u6DFB\u52A0\u4E00\u4E9B\u7EC4\u4EF6\u9009\u9879\u3002\u5982 ");
const _hoisted_11 = {
  href: "https://github.com/vuejs/vue-router",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_12 = /* @__PURE__ */ createTextVNode("vue-router");
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createTextVNode("\u6DFB\u52A0 Vue \u5B9E\u4F8B\u65B9\u6CD5\uFF0C\u901A\u8FC7\u628A\u5B83\u4EEC\u6DFB\u52A0\u5230 "),
  /* @__PURE__ */ createBaseVNode("code", null, "Vue.prototype"),
  /* @__PURE__ */ createTextVNode(" \u4E0A\u5B9E\u73B0\u3002")
], -1);
const _hoisted_14 = /* @__PURE__ */ createTextVNode("\u4E00\u4E2A\u5E93\uFF0C\u63D0\u4F9B\u81EA\u5DF1\u7684 API\uFF0C\u540C\u65F6\u63D0\u4F9B\u4E0A\u9762\u63D0\u5230\u7684\u4E00\u4E2A\u6216\u591A\u4E2A\u529F\u80FD\u3002\u5982 ");
const _hoisted_15 = {
  href: "https://github.com/vuejs/vue-router",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_16 = /* @__PURE__ */ createTextVNode("vue-router");
const _hoisted_17 = /* @__PURE__ */ createStaticVNode('<h2 id="_2-\u4F7F\u7528\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-\u4F7F\u7528\u63D2\u4EF6" aria-hidden="true">#</a> 2. \u4F7F\u7528\u63D2\u4EF6</h2><p>\u901A\u8FC7\u5168\u5C40\u65B9\u6CD5 <code>Vue.use()</code> \u4F7F\u7528\u63D2\u4EF6\u3002\u5B83\u9700\u8981\u5728\u4F60\u8C03\u7528 <code>new Vue()</code> \u542F\u52A8\u5E94\u7528\u4E4B\u524D\u5B8C\u6210\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u8C03\u7528 `MyPlugin.install(Vue)`</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyPlugin<span class="token punctuation">)</span>\n\n<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token comment">// ...\u7EC4\u4EF6\u9009\u9879</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E5F\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A\u53EF\u9009\u7684\u9009\u9879\u5BF9\u8C61\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyPlugin<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">someOption</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Vue.use</code> \u4F1A\u81EA\u52A8\u963B\u6B62\u591A\u6B21\u6CE8\u518C\u76F8\u540C\u63D2\u4EF6\uFF0C\u5C4A\u65F6\u5373\u4F7F\u591A\u6B21\u8C03\u7528\u4E5F\u53EA\u4F1A\u6CE8\u518C\u4E00\u6B21\u8BE5\u63D2\u4EF6\u3002</p><h2 id="_3-\u5F00\u53D1\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_3-\u5F00\u53D1\u63D2\u4EF6" aria-hidden="true">#</a> 3. \u5F00\u53D1\u63D2\u4EF6</h2><p>Vue.js \u7684\u63D2\u4EF6\u5E94\u8BE5\u66B4\u9732\u4E00\u4E2A <code>install</code> \u65B9\u6CD5\u3002\u8FD9\u4E2A\u65B9\u6CD5\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F <code>Vue</code> \u6784\u9020\u5668\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u53EF\u9009\u7684\u9009\u9879\u5BF9\u8C61\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>MyPlugin<span class="token punctuation">.</span><span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 1. \u6DFB\u52A0\u5168\u5C40\u65B9\u6CD5\u6216 property</span>\n  Vue<span class="token punctuation">.</span><span class="token function-variable function">myGlobalMethod</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// \u903B\u8F91...</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// 2. \u6DFB\u52A0\u5168\u5C40\u8D44\u6E90</span>\n  Vue<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">&#39;my-directive&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    <span class="token function">bind</span> <span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> binding<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> oldVnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// \u903B\u8F91...</span>\n    <span class="token punctuation">}</span>\n    <span class="token operator">...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// 3. \u6CE8\u5165\u7EC4\u4EF6\u9009\u9879</span>\n  Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token function-variable function">created</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// \u903B\u8F91...</span>\n    <span class="token punctuation">}</span>\n    <span class="token operator">...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// 4. \u6DFB\u52A0\u5B9E\u4F8B\u65B9\u6CD5</span>\n  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$myMethod</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">methodOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// \u903B\u8F91...</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 9);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    createBaseVNode("ol", null, [
      createBaseVNode("li", null, [
        _hoisted_4,
        createBaseVNode("a", _hoisted_5, [
          _hoisted_6,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      createBaseVNode("li", null, [
        _hoisted_7,
        createBaseVNode("a", _hoisted_8, [
          _hoisted_9,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      createBaseVNode("li", null, [
        _hoisted_10,
        createBaseVNode("a", _hoisted_11, [
          _hoisted_12,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      _hoisted_13,
      createBaseVNode("li", null, [
        _hoisted_14,
        createBaseVNode("a", _hoisted_15, [
          _hoisted_16,
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ]),
    _hoisted_17
  ]);
}
var C4Vue___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C4-Vue\u63D2\u4EF6.html.vue"]]);
export { C4Vue___html as default };
