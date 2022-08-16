import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="kubernetes\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#kubernetes\u67B6\u6784" aria-hidden="true">#</a> Kubernetes\u67B6\u6784</h1><h2 id="_1-\u8FD0\u884C\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#_1-\u8FD0\u884C\u539F\u7406" aria-hidden="true">#</a> 1. \u8FD0\u884C\u539F\u7406</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200205235252447.png" alt="image-20200205235252447"></p><p>Kubernetes \u662F\u4E00\u5957\u5206\u5E03\u5F0F\u7CFB\u7EDF\uFF0C\u7531\u591A\u4E2A\u8282\u70B9\u7EC4\u6210\uFF0C<strong>\u8282\u70B9\u5206\u4E3A\u4E24\u7C7B\uFF1A\u4E00\u7C7B\u662F\u5C5E\u4E8E\u7BA1\u7406\u5E73\u9762\u7684\u4E3B\u8282\u70B9/\u63A7\u5236\u8282\u70B9\uFF08Master Node\uFF09\uFF1B\u4E00\u7C7B\u662F\u5C5E\u4E8E\u8FD0\u884C\u5E73\u9762\u7684\u5DE5\u4F5C\u8282\u70B9\uFF08Worker Node\uFF09</strong></p><p>\u590D\u6742\u7684\u5DE5\u4F5C\u7531\u4E3B\u8282\u70B9\u8D1F\u8D23\uFF0C\u5DE5\u4F5C\u8282\u70B9\u8D1F\u8D23\u63D0\u4F9B\u63D0\u4F9B\u7A33\u5B9A\u7684\u64CD\u4F5C\u63A5\u53E3\u548C\u80FD\u529B\u62BD\u8C61</p><p>\u6CE8\uFF1A\u4ECE\u8FD9\u5F20\u56FE\u4E0A\uFF0C\u6211\u4EEC\u6CA1\u6709\u80FD\u53D1\u73B0 Kubernetes \u4E2D\u5BF9\u4E8E\u63A7\u5236\u5E73\u9762\u7684\u5206\u5E03\u5F0F\u5B9E\u73B0\uFF0C\u4F46\u662F\u7531\u4E8E\u6570\u636E\u540E\u7AEF\u81EA\u8EAB\u5C31\u662F\u4E00\u5957\u5206\u5E03\u5F0F\u7684\u6570\u636E\u5E93 Etcd\uFF0C\u56E0\u6B64\u53EF\u4EE5\u5F88\u5BB9\u6613\u6269\u5C55\u5230\u5206\u5E03\u5F0F\u5B9E\u73B0\u3002</p><h2 id="_2-\u63A7\u5236\u5E73\u9762" tabindex="-1"><a class="header-anchor" href="#_2-\u63A7\u5236\u5E73\u9762" aria-hidden="true">#</a> 2. \u63A7\u5236\u5E73\u9762</h2><h3 id="_2-1-\u4E3B\u8282\u70B9\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E3B\u8282\u70B9\u670D\u52A1" aria-hidden="true">#</a> 2.1 \u4E3B\u8282\u70B9\u670D\u52A1</h3><p>\u4E3B\u8282\u70B9\u63D0\u4F9B\u7684\u7BA1\u7406\u670D\u52A1\uFF1A</p>', 9);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("code", null, "apiserver", -1);
const _hoisted_11 = /* @__PURE__ */ createTextVNode(" \u662F\u6574\u4E2A\u7CFB\u7EDF\u7684\u5BF9\u5916\u63A5\u53E3\uFF0C\u63D0\u4F9B\u4E00\u5957 RESTful \u7684 ");
const _hoisted_12 = {
  href: "https://github.com/kubernetes/kubernetes/tree/master/docs/api-reference",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_13 = /* @__PURE__ */ createTextVNode("Kubernetes API");
const _hoisted_14 = /* @__PURE__ */ createTextVNode("\uFF0C\u4F9B\u5BA2\u6237\u7AEF\u548C\u5176\u5B83\u7EC4\u4EF6\u8C03\u7528\uFF1B");
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createBaseVNode("code", null, "scheduler"),
  /* @__PURE__ */ createTextVNode(" \u8D1F\u8D23\u5BF9\u8D44\u6E90\u8FDB\u884C\u8C03\u5EA6\uFF0C\u5206\u914D\u67D0\u4E2Apod \u5230\u67D0\u4E2A\u8282\u70B9\u662F\u4E0A\u3002\u662Fpluggable \u7684\uFF0C\u610F\u5473\u7740\u5F88\u5BB9\u6613\u9009\u62E9\u5176\u4ED6\u5B9E\u73B0\u65B9\u5F0F")
], -1);
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createBaseVNode("code", null, "controller-manager"),
  /* @__PURE__ */ createTextVNode(" \u8D1F\u8D23\u7BA1\u7406\u63A7\u5236\u5668\uFF0C\u5305\u62ECendpoint-controller (\u5237\u65B0\u670D\u52A1\u548Cpod\u7684\u5173\u8054\u4FE1\u606F) \u548C replication-controller\uFF08\u7EF4\u62A4\u67D0\u4E2Apod \u7684\u590D\u5236\u4E3A\u914D\u7F6E\u7684\u6570\u503C\uFF09")
], -1);
const _hoisted_17 = /* @__PURE__ */ createStaticVNode('<h3 id="_2-2-etcd" tabindex="-1"><a class="header-anchor" href="#_2-2-etcd" aria-hidden="true">#</a> 2.2 Etcd</h3><p>Etcd\u65E2\u4F5C\u4E3A\u6570\u636E\u540E\u7AEF\uFF0C\u53C8\u4F5C\u4E3A\u6D88\u606F\u4E2D\u95F4\u4EF6</p><p>\u901A\u8FC7Etcd \u6765\u5B58\u50A8\u6240\u6709\u7684\u4E3B\u8282\u70B9\u4E0A\u7684\u72B6\u6001\u4FE1\u606F\uFF0C\u5F88\u5BB9\u6613\u5B9E\u73B0\u4E3B\u8282\u70B9\u7684\u5206\u5E03\u5F0F\u6269\u5C55</p><p>\u7EC4\u4EF6\u53EF\u4EE5\u81EA\u52A8\u7684\u53BB\u4FA6\u6D4B Etcd \u4E2D\u7684\u6570\u503C\u53D8\u5316\u6765\u83B7\u5F97\u901A\u77E5\uFF0C\u5E76\u4E14\u83B7\u5F97\u66F4\u65B0\u540E\u7684\u6570\u636E\u6765\u6267\u884C\u76F8\u5E94\u7684\u64CD\u4F5C</p><h3 id="_2-3-\u5DE5\u4F5C\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#_2-3-\u5DE5\u4F5C\u8282\u70B9" aria-hidden="true">#</a> 2.3 \u5DE5\u4F5C\u8282\u70B9</h3><ul><li>Kubelet \u662F\u5DE5\u4F5C\u8282\u70B9\u6267\u884C\u64CD\u4F5C\u7684agent\uFF0C\u8D1F\u8D23\u5177\u4F53\u7684\u5BB9\u5668\u751F\u547D\u5468\u671F\u7BA1\u7406\uFF0C\u6839\u636E\u4ECE\u6570\u636E\u5E93\u4E2D\u83B7\u53D6\u7684\u4FE1\u606F\u6765\u7BA1\u7406\u5BB9\u5668\uFF0C\u5E76\u4E0A\u62A5pod\u8FD0\u884C\u72B6\u6001\u7B49</li><li>Kube-proxy \u662F\u4E00\u4E2A\u7B80\u5355\u7684\u7F51\u7EDC\u8BBF\u95EE\u4EE3\u7406\uFF0C\u540C\u65F6\u4E5F\u662F\u4E00\u4E2A Load Balancer\u3002\u5B83\u8D1F\u8D23\u5C06\u8BBF\u95EE\u5230\u67D0\u4E2A\u670D\u52A1\u7684\u8BF7\u6C42\u5177\u4F53\u5206\u914D\u7ED9\u5DE5\u4F5C\u8282\u70B9\u4E0A\u7684Pod\uFF08\u540C\u4E00\u7C7B\u6807\u7B7E\uFF09</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200206000707335.png" alt="image-20200206000707335"></p>', 7);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        _hoisted_10,
        _hoisted_11,
        createBaseVNode("a", _hoisted_12, [
          _hoisted_13,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_14
      ]),
      _hoisted_15,
      _hoisted_16
    ]),
    _hoisted_17
  ]);
}
var Kubernetes___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Kubernetes\u67B6\u6784.html.vue"]]);
export { Kubernetes___html as default };
