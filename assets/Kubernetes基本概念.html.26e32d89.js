import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.cd971695.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="kubernetes\u57FA\u672C\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#kubernetes\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a> Kubernetes\u57FA\u672C\u6982\u5FF5</h1><h2 id="_1-\u57FA\u672C\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#_1-\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a> 1. \u57FA\u672C\u6982\u5FF5</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200205232528752.png" alt="image-20200205232528752"></p><ul><li><p>\u8282\u70B9\uFF08<code>Node</code>\uFF09\uFF1A\u4E00\u4E2A\u8282\u70B9\u662F\u4E00\u4E2A\u8FD0\u884C Kubernetes \u4E2D\u7684\u4E3B\u673A</p></li><li><p>\u5BB9\u5668\u7EC4\uFF08<code>Pod</code>\uFF09\uFF1A\u4E00\u4E2APod\u5BF9\u5E94\u4E8E\u7531\u82E5\u5E72\u5BB9\u5668\u7EC4\u6210\u7684\u4E00\u4E2A\u5BB9\u5668\u7EC4\uFF0C\u540C\u4E2A\u7EC4\u5185\u7684\u5BB9\u5668\u5171\u4EAB\u4E00\u4E2A\u5B58\u50A8\u5377\uFF08volume\uFF09</p></li><li><p>\u5BB9\u5668\u7EC4\u751F\u547D\u5468\u671F\uFF08<code>pos-states</code>\uFF09: \u5305\u542B\u6240\u6709\u5BB9\u5668\u72B6\u6001\u96C6\u5408\u3001\u5305\u62EC\u5BB9\u5668\u7EC4\u72B6\u6001\u7C7B\u578B\uFF0C\u5BB9\u5668\u7EC4\u751F\u547D\u5468\u671F\u3001\u4E8B\u4EF6\u3001\u91CD\u542F\u7B56\u7565\u3001\u4EE5\u53CAreplication controllers\u3002</p></li><li><p>Replication Controllers\uFF1A\u4E3B\u8981\u8D1F\u8D23\u5236\u5B9A\u6570\u91CF\u7684pod \u5728\u540C\u4E00\u65F6\u95F4\u4E00\u8D77\u8FD0\u884C</p></li><li><p>\u670D\u52A1\uFF08services\uFF09: \u4E00\u4E2A Kubernetes \u670D\u52A1\u662F\u5BB9\u5668\u7EC4\u903B\u8F91\u7684\u9AD8\u7EA7\u62BD\u8C61\uFF0C\u540C\u65F6\u4E5F\u5BF9\u5916\u63D0\u4F9B\u8BBF\u95EE\u5BB9\u5668\u7EC4\u7684\u7B56\u7565\u3002</p></li><li><p>\u5377\uFF08<code>volumes</code>\uFF09: \u4E00\u4E2A\u5377\u5C31\u662F\u4E00\u4E2A\u76EE\u5F55\uFF0C\u5BB9\u5668\u5BF9\u5176\u6709\u8BBF\u95EE\u6743\u9650</p></li><li><p>\u6807\u7B7E\uFF08<code>labels</code>\uFF09: \u6807\u7B7E\u662F\u7528\u6765\u8FDE\u63A5\u4E00\u7EC4\u5BF9\u8C61\u7684\uFF0C\u6BD4\u5982\u5BB9\u5668\u7EC4\uFF0C\u6807\u7B7E\u53EF\u4EE5\u88AB\u7528\u6765\u7EC4\u7EC7\u548C\u9009\u62E9\u5B50\u5BF9\u8C61</p></li><li><p>\u63A5\u53E3\u6743\u9650\uFF08<code>accessing_the_api</code>\uFF09: \u7AEF\u53E3\uFF0CIP \u5730\u5740\u548C\u4EE3\u7406\u7684\u9632\u706B\u5899\u89C4\u5219</p></li><li><p>web\u754C\u9762\uFF08<code>ux</code>\uFF09: \u7528\u6237\u53EF\u4EE5\u901A\u8FC7web\u754C\u9762\u64CD\u4F5C Kubernetes\u3002</p></li><li><p>\u547D\u4EE4\u884C\u64CD\u4F5C\uFF08<code>cli</code>\uFF09: kubecfg \u547D\u4EE4\u3002</p></li></ul><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 5);
const _hoisted_6 = {
  href: "https://yeasy.gitbooks.io/docker_practice/kubernetes/concepts.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_7 = /* @__PURE__ */ createTextVNode("k8s\u57FA\u672C\u6982\u5FF5");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_6, [
        _hoisted_7,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Kubernetes_____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Kubernetes\u57FA\u672C\u6982\u5FF5.html.vue"]]);
export { Kubernetes_____html as default };
