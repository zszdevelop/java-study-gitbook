import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, d as createVNode, e as createStaticVNode, b as createTextVNode } from "./app.5c933372.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="cors\u548Ccsrf" tabindex="-1"><a class="header-anchor" href="#cors\u548Ccsrf" aria-hidden="true">#</a> CORS\u548CCSRF</h1><h2 id="_1-\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#_1-\u6982\u5FF5" aria-hidden="true">#</a> 1. \u6982\u5FF5</h2><ol><li><strong>CSRF</strong> - Cross-Site Request Forgery - \u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020</li><li><strong>CORS</strong> - Cross Origin Resourse-Sharing - \u8DE8\u7AD9\u8D44\u6E90\u5171\u4EAB</li><li><strong>XSS</strong> \uFF1A Cross Site Scrit \u8DE8\u7AD9\u811A\u672C\u653B\u51FB\uFF08\u4E3A\u4E0E CSS \u533A\u522B\uFF0C\u6240\u4EE5\u5728\u5B89\u5168\u9886\u57DF\u53EB XSS\uFF09</li></ol><h2 id="_2-csrf" tabindex="-1"><a class="header-anchor" href="#_2-csrf" aria-hidden="true">#</a> 2. CSRF</h2><h3 id="_2-1-\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#_2-1-\u6982\u5FF5" aria-hidden="true">#</a> 2.1 \u6982\u5FF5</h3>', 5);
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020\uFF08\u82F1\u8BED\uFF1ACross-site request forgery\uFF09\uFF0C\u4E5F\u88AB\u79F0\u4E3A one-click attack \u6216\u8005 session riding\uFF0C\u901A\u5E38\u7F29\u5199\u4E3A CSRF \u6216\u8005 XSRF\uFF0C \u662F\u4E00\u79CD\u631F\u5236\u7528\u6237\u5728\u5F53\u524D\u5DF2\u767B\u5F55\u7684Web\u5E94\u7528\u7A0B\u5E8F\u4E0A\u6267\u884C\u975E\u672C\u610F\u7684\u64CD\u4F5C\u7684\u653B\u51FB\u65B9\u6CD5\u3002\u8DDF\u8DE8\u7F51\u7AD9\u811A\u672C\uFF08XSS\uFF09\u76F8\u6BD4\uFF0CXSS \u5229\u7528\u7684\u662F\u7528\u6237\u5BF9\u6307\u5B9A\u7F51\u7AD9\u7684\u4FE1\u4EFB\uFF0CCSRF \u5229\u7528\u7684\u662F\u7F51\u7AD9\u5BF9\u7528\u6237\u7F51\u9875\u6D4F\u89C8\u5668\u7684\u4FE1\u4EFB\u3002 \u2014\u2014 ");
const _hoisted_7 = {
  href: "https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode("\u7EF4\u57FA\u767E\u79D1");
const _hoisted_9 = /* @__PURE__ */ createStaticVNode('<p><strong>\u6838\u5FC3\u77E5\u8BC6\uFF1A</strong> \u8DE8\u7AD9\u70B9\u8BF7\u6C42\u4F2A\u9020\u8BF7\u6C42\u3002</p><p><strong>\u7B80\u5355\u7406\u89E3\uFF1A</strong> \u653B\u51FB\u8005\u76D7\u7528\u4F60\u7684\u8EAB\u4EFD\uFF0C\u4EE5\u4F60\u7684\u540D\u4E49\u53D1\u9001\u6076\u610F\u8BF7\u6C42\u3002</p><p>\u5E38\u89C1\u573A\u666F\uFF1A\u4EE5\u4F60\u540D\u4E49\u53D1\u9001\u90AE\u4EF6\uFF0C\u53D1\u6D88\u606F\uFF0C\u76D7\u53D6\u4F60\u7684\u8D26\u53F7\uFF0C\u751A\u81F3\u4E8E\u8D2D\u4E70\u5546\u54C1\uFF0C\u865A\u62DF\u8D27\u5E01\u8F6C\u8D26\u7B49\u7B49\u3002</p><p>\u9020\u6210\u5F71\u54CD\uFF1A\u4E2A\u4EBA\u9690\u79C1\u6CC4\u9732\u4EE5\u53CA\u8D22\u4EA7\u5B89\u5168\u3002</p><h2 id="_3-cors" tabindex="-1"><a class="header-anchor" href="#_3-cors" aria-hidden="true">#</a> 3. CORS</h2><h3 id="_3-1-\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#_3-1-\u6982\u5FF5" aria-hidden="true">#</a> 3.1 \u6982\u5FF5</h3><p>CORS\u662F\u4E00\u4E2AW3C\u6807\u51C6\uFF0C\u5168\u79F0\u662F&quot;\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB&quot;\uFF08Cross-origin resource sharing\uFF09\u3002</p><p>\u5B83\u5141\u8BB8\u6D4F\u89C8\u5668\u5411\u8DE8\u6E90\u670D\u52A1\u5668\uFF0C\u53D1\u51FAXMLHttpRequest\u8BF7\u6C42\uFF0C\u4ECE\u800C<strong>\u514B\u670D\u4E86AJAX\u53EA\u80FD\u540C\u6E90\u4F7F\u7528\u7684\u9650\u5236</strong>\u3002</p><blockquote><p>\u6574\u4E2ACORS\u901A\u4FE1\u8FC7\u7A0B\uFF0C\u90FD\u662F\u6D4F\u89C8\u5668\u81EA\u52A8\u5B8C\u6210\uFF0C\u4E0D\u9700\u8981\u7528\u6237\u53C2\u4E0E\u3002\u5BF9\u4E8E\u5F00\u53D1\u8005\u6765\u8BF4\uFF0CCORS\u901A\u4FE1\u4E0E\u540C\u6E90\u7684AJAX\u901A\u4FE1\u6CA1\u6709\u5DEE\u522B\uFF0C\u4EE3\u7801\u5B8C\u5168\u4E00\u6837\u3002\u6D4F\u89C8\u5668\u4E00\u65E6\u53D1\u73B0AJAX\u8BF7\u6C42\u8DE8\u6E90\uFF0C\u5C31\u4F1A<strong>\u81EA\u52A8\u6DFB\u52A0\u4E00\u4E9B\u9644\u52A0\u7684\u5934\u4FE1\u606F\uFF0C\u6709\u65F6\u8FD8\u4F1A\u591A\u51FA\u4E00\u6B21\u9644\u52A0\u7684\u8BF7\u6C42</strong>\uFF0C\u4F46\u7528\u6237\u4E0D\u4F1A\u6709\u611F\u89C9\u3002</p><p>\u56E0\u6B64\uFF0C\u5B9E\u73B0CORS\u901A\u4FE1\u7684\u5173\u952E\u662F\u670D\u52A1\u5668\u3002\u53EA\u8981\u670D\u52A1\u5668\u5B9E\u73B0\u4E86CORS\u63A5\u53E3\uFF0C\u5C31\u53EF\u4EE5\u8DE8\u6E90\u901A\u4FE1\u3002</p></blockquote><h2 id="_4-xss" tabindex="-1"><a class="header-anchor" href="#_4-xss" aria-hidden="true">#</a> 4. XSS</h2><h3 id="_4-1-\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#_4-1-\u6982\u5FF5" aria-hidden="true">#</a> 4.1. \u6982\u5FF5</h3>', 11);
const _hoisted_20 = /* @__PURE__ */ createTextVNode("\u8DE8\u7AD9\u811A\u672C\uFF08\u82F1\u8BED\uFF1ACross-site scripting\uFF0C\u901A\u5E38\u7B80\u79F0\u4E3A\uFF1AXSS\uFF09\u662F\u4E00\u79CD\u7F51\u7AD9\u5E94\u7528\u7A0B\u5E8F\u7684\u5B89\u5168\u6F0F\u6D1E\u653B\u51FB\uFF0C\u662F\u4EE3\u7801\u6CE8\u5165\u7684\u4E00\u79CD\u3002\u5B83\u5141\u8BB8\u6076\u610F\u7528\u6237\u5C06\u4EE3\u7801\u6CE8\u5165\u5230\u7F51\u9875\u4E0A\uFF0C\u5176\u4ED6\u7528\u6237\u5728\u89C2\u770B\u7F51\u9875\u65F6\u5C31\u4F1A\u53D7\u5230\u5F71\u54CD\u3002\u8FD9\u7C7B\u653B\u51FB\u901A\u5E38\u5305\u542B\u4E86HTML\u4EE5\u53CA\u7528\u6237\u7AEF\u811A\u672C\u8BED\u8A00\u3002 \u2014\u2014 ");
const _hoisted_21 = {
  href: "https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_22 = /* @__PURE__ */ createTextVNode("\u7EF4\u57FA\u767E\u79D1");
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("p", null, "XSS \u653B\u51FB\uFF0C\u4E00\u822C\u662F\u6307\u653B\u51FB\u8005\u901A\u8FC7\u5728\u7F51\u9875\u4E2D\u6CE8\u5165\u6076\u610F\u811A\u672C\uFF0C\u5F53\u7528\u6237\u6D4F\u89C8\u7F51\u9875\u65F6\uFF0C\u6076\u610F\u811A\u672C\u6267\u884C\uFF0C\u63A7\u5236\u7528\u6237\u6D4F\u89C8\u5668\u884C\u4E3A\u7684\u4E00\u79CD\u653B\u51FB\u65B9\u5F0F\u3002", -1);
const _hoisted_24 = /* @__PURE__ */ createBaseVNode("p", null, "\u5E38\u89C1 XSS \u5371\u5BB3\u6709\uFF1A", -1);
const _hoisted_25 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "\u7A83\u53D6\u7528\u6237Cookie\uFF0C\u83B7\u53D6\u7528\u6237\u9690\u79C1\uFF0C\u76D7\u53D6\u7528\u6237\u8D26\u53F7\u3002"),
  /* @__PURE__ */ createBaseVNode("li", null, "\u52AB\u6301\u7528\u6237\uFF08\u6D4F\u89C8\u5668\uFF09\u4F1A\u8BDD\uFF0C\u4ECE\u800C\u6267\u884C\u4EFB\u610F\u64CD\u4F5C\uFF0C\u4F8B\u5982\u8FDB\u884C\u975E\u6CD5\u8F6C\u8D26\u3001\u5F3A\u5236\u53D1\u8868\u65E5\u5FD7\u3001\u53D1\u9001\u7535\u5B50\u90AE\u4EF6\u7B49\u3002"),
  /* @__PURE__ */ createBaseVNode("li", null, "\u5F3A\u5236\u5F39\u51FA\u5E7F\u544A\u9875\u9762\uFF0C\u5237\u6D41\u91CF\uFF0C\u4F20\u64AD\u8DE8\u7AD9\u811A\u672C\u8815\u866B\uFF0C\u7F51\u9875\u6302\u9A6C\u7B49\u3002"),
  /* @__PURE__ */ createBaseVNode("li", null, "\u7ED3\u5408\u5176\u4ED6\u6F0F\u6D1E\uFF0C\u5982 CSRF \u6F0F\u6D1E\uFF0C\u5B9E\u65BD\u8FDB\u4E00\u6B65\u7684\u653B\u51FB\u3002")
], -1);
const _hoisted_26 = /* @__PURE__ */ createBaseVNode("h2", {
  id: "\u53C2\u8003\u6587\u7AE0",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#\u53C2\u8003\u6587\u7AE0",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" \u53C2\u8003\u6587\u7AE0")
], -1);
const _hoisted_27 = {
  href: "https://www.jianshu.com/p/de831ca7a523",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_28 = /* @__PURE__ */ createTextVNode("CSRF & CORS \u7684\u533A\u522B");
const _hoisted_29 = {
  href: "https://zhuanlan.zhihu.com/p/92255672",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_30 = /* @__PURE__ */ createTextVNode("\u3010\u5168\u6808\u4FEE\u70BC\u3011CORS\u548CCSRF\u4FEE\u70BC\u5B9D\u5178");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("blockquote", null, [
      createBaseVNode("p", null, [
        _hoisted_6,
        createBaseVNode("a", _hoisted_7, [
          _hoisted_8,
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ]),
    _hoisted_9,
    createBaseVNode("blockquote", null, [
      createBaseVNode("p", null, [
        _hoisted_20,
        createBaseVNode("a", _hoisted_21, [
          _hoisted_22,
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ]),
    _hoisted_23,
    _hoisted_24,
    _hoisted_25,
    _hoisted_26,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_27, [
        _hoisted_28,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_29, [
        _hoisted_30,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var CORS_CSRF_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "CORS\u548CCSRF.html.vue"]]);
export { CORS_CSRF_html as default };
