import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, d as createTextVNode } from "./app.72d9fd95.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("p", null, "\u8FD9\u662F\u9879\u76EE\u4E3B\u9875\u7684\u6848\u4F8B\u3002\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u653E\u7F6E\u4F60\u7684\u4E3B\u4F53\u5185\u5BB9\u3002", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createTextVNode("\u60F3\u8981\u4F7F\u7528\u6B64\u5E03\u5C40\uFF0C\u4F60\u9700\u8981\u5728\u9875\u9762 front matter \u4E2D\u8BBE\u7F6E "),
  /* @__PURE__ */ createBaseVNode("code", null, "home: true"),
  /* @__PURE__ */ createTextVNode("\u3002")
], -1);
const _hoisted_3 = /* @__PURE__ */ createTextVNode("\u914D\u7F6E\u9879\u7684\u76F8\u5173\u8BF4\u660E\u8BE6\u89C1 ");
const _hoisted_4 = {
  href: "https://vuepress-theme-hope.github.io/v2/zh/guide/layout/home/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u9879\u76EE\u4E3B\u9875\u914D\u7F6E");
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u3002");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createBaseVNode("p", null, [
      _hoisted_3,
      createBaseVNode("a", _hoisted_4, [
        _hoisted_5,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_6
    ])
  ]);
}
var home_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "home.html.vue"]]);
export { home_html as default };
