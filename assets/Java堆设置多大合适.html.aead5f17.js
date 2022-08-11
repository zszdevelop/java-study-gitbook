import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.72d9fd95.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002" tabindex="-1"><a class="header-anchor" href="#java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002" aria-hidden="true">#</a> Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u9488\u5BF9\u5806\u7A7A\u95F4\u7684\u4F18\u5316\u662FJava\u6027\u80FD\u8C03\u4F18\u7684\u91CD\u70B9\u4E4B\u4E00\u3002\u5982\u679C\u6CA1\u6709\u8BBE\u7F6EJVM\u5806\u7A7A\u95F4\u5927\u5C0F\uFF0CJVM\u4F1A\u6839\u636E\u670D\u52A1\u5668\u7269\u7406\u5185\u5B58\u5927\u5C0F\u8BBE\u7F6E\u9ED8\u8BA4\u5806\u5927\u5C0F\u7684\u503C\u3002\u4F8B\u5982\uFF0C\u572864\u4F4D\u7684\u670D\u52A1\u5668\u7AEF\uFF0C</p><ul><li>\u5F53\u7269\u7406\u5185\u5B58\u5C0F\u4E8E192MB\u65F6\uFF0CJVM\u5806\u5927\u5C0F\u9ED8\u8BA4\u9009\u4E3A\u7269\u7406\u5185\u5B58\u7684\u4E00\u534A\uFF1B</li><li><strong>\u5F53\u7269\u7406\u5185\u5B58\u5927192MB\u4E14\u5C0F\u4E8E128GB\u65F6\uFF0CJVM\u5806\u5927\u5C0F\u9ED8\u8BA4\u9009\u4E3A\u7269\u7406\u5185\u5B58\u7684\u56DB\u5206\u4E4B\u4E00</strong>\uFF1B</li><li>\u5F53\u7269\u7406\u5185\u5B58\u5927\u4E8E\u7B49\u4E8E128GB\u65F6\uFF0C\u90FD\u4E3A32GB\u3002</li></ul><p>\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0CJava\u5E94\u7528\u7A0B\u5E8F\u7684\u4F1A\u901A\u8FC7\u53C2\u6570\u6307\u5B9A\u5806\u5927\u5C0F\uFF0C\u5177\u4F53\u65B9\u6CD5\u4E0B\u6587\u4F1A\u6709\u8BF4\u660E\u3002</p><h2 id="_2-\u63A8\u8350\u914D\u7F6E\u539F\u5219" tabindex="-1"><a class="header-anchor" href="#_2-\u63A8\u8350\u914D\u7F6E\u539F\u5219" aria-hidden="true">#</a> 2. \u63A8\u8350\u914D\u7F6E\u539F\u5219\uFF1A</h2><ol><li>\u5E94\u7528\u7A0B\u5E8F\u8FD0\u884C\u65F6\uFF0C\u8BA1\u7B97<strong>\u8001\u5E74\u4EE3\u5B58\u6D3B\u5BF9\u8C61\u7684\u5360\u7528\u7A7A\u95F4\u5927\u5C0FX</strong>\u3002 <ol><li>\u7A0B\u5E8F\u6574\u4E2A\u5806\u5927\u5C0F\uFF08Xmx\u548CXms\uFF09\u8BBE\u7F6E\u4E3AX\u76843~4\u500D\uFF1B</li><li>\u6C38\u4E45\u4EE3PermSize\u548CMaxPermSize\u8BBE\u7F6E\u4E3AX\u76841.2~1.5\u500D\u3002</li><li>\u5E74\u8F7B\u4EE3Xmn\u7684\u8BBE\u7F6E\u4E3AX\u76841~1.5\u500D\u3002\u8001\u5E74\u4EE3\u5185\u5B58\u5927\u5C0F\u8BBE\u7F6E\u4E3AX\u76842~3\u500D\u3002</li></ol></li><li>JDK\u5B98\u65B9\u5EFA\u8BAE\u5E74\u8F7B\u4EE3\u5360\u6574\u4E2A\u5806\u5927\u5C0F\u7A7A\u95F4\u76843/8\u5DE6\u53F3\u3002</li><li>\u5B8C\u6210\u4E00\u6B21Full GC\u540E\uFF0C\u5E94\u8BE5\u91CA\u653E\u51FA70%\u7684\u5806\u7A7A\u95F4\uFF0830%\u7684\u7A7A\u95F4\u4ECD\u7136\u5360\u7528\uFF09\u3002</li><li>\u8BBE\u7F6EJVM \u521D\u59CB\u5806\u5185\u5B58-Xms\u548C\u6700\u5927\u5806\u5185-Xmx\u76F8\u540C\uFF0C<strong>\u4EE5\u907F\u514D\u6BCF\u6B21\u5783\u573E\u56DE\u6536\u5B8C\u6210\u540EJVM\u91CD\u65B0\u5206\u914D\u5185\u5B58\u3002</strong></li></ol><h2 id="_3-\u66B4\u529B\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#_3-\u66B4\u529B\u8BBE\u7F6E" aria-hidden="true">#</a> 3. \u66B4\u529B\u8BBE\u7F6E</h2><p>\u82E5\u4F9D\u548CIBM\u7B49\u5806\u5927\u5C0F\u90FD\u8BBE\u7F6E\u4E3A512M, \u5982\u6709\u989D\u5916\u9700\u6C42\uFF0C\u624D\u6839\u636E\u4E0A\u9762\u539F\u5219\u8FDB\u884C\u8C03\u6574</p>', 9);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("p", null, "\u5BF9\u4E8E\u5927\u591A\u6570\u73AF\u5883\u800C\u8A00\uFF0C\u6700\u5927 Java \u5806\u5927\u5C0F\u4E3A 512 \u5146\u5B57\u8282\uFF08\u5982\u4E0A\u56FE\u6240\u793A\uFF09\u5DF2\u8DB3\u591F\u3002", -1);
const _hoisted_11 = /* @__PURE__ */ createTextVNode("---");
const _hoisted_12 = {
  href: "https://www.ibm.com/docs/zh/itcam-app-mgr/7.2.1?topic=spa-setting-maximum-java-heap-size-1",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_13 = /* @__PURE__ */ createTextVNode("IBM \u6587\u6863");
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("h2", {
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
const _hoisted_15 = {
  href: "https://support.huaweicloud.com/tuningtip-kunpenggrf/kunpengtuning_12_0063.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_16 = /* @__PURE__ */ createTextVNode("\u534E\u4E3A\u9CB2\u9E4F-\u8BBE\u7F6EJVM\u5806\u7A7A\u95F4\u5927\u5C0F");
const _hoisted_17 = {
  href: "https://www.ibm.com/docs/zh/itcam-app-mgr/7.2.1?topic=spa-setting-maximum-java-heap-size-1",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_18 = /* @__PURE__ */ createTextVNode("IBM \u6587\u6863");
const _hoisted_19 = {
  href: "https://blog.csdn.net/weixin_28782251/article/details/114547003",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_20 = /* @__PURE__ */ createTextVNode("java\u5806\u8BBE\u7F6E\u6210\u591A\u5C11\u5408\u9002_jvm~xmx\u8BBE\u7F6E\u591A\u5C11\u5408\u9002");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("blockquote", null, [
      _hoisted_10,
      createBaseVNode("p", null, [
        _hoisted_11,
        createBaseVNode("a", _hoisted_12, [
          _hoisted_13,
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ]),
    _hoisted_14,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_15, [
        _hoisted_16,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_17, [
        _hoisted_18,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_19, [
        _hoisted_20,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Java________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Java\u5806\u8BBE\u7F6E\u591A\u5927\u5408\u9002.html.vue"]]);
export { Java________html as default };
