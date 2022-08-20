import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.a829be87.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u4E00\u4E2A\u6A21\u5757\u4E2D\u7684service\u5C42\u80FD\u4E0D\u80FD\u76F8\u4E92\u5F15\u7528" tabindex="-1"><a class="header-anchor" href="#\u4E00\u4E2A\u6A21\u5757\u4E2D\u7684service\u5C42\u80FD\u4E0D\u80FD\u76F8\u4E92\u5F15\u7528" aria-hidden="true">#</a> \u4E00\u4E2A\u6A21\u5757\u4E2D\u7684service\u5C42\u80FD\u4E0D\u80FD\u76F8\u4E92\u5F15\u7528</h1><h2 id="_1-\u95EE\u9898\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#_1-\u95EE\u9898\u63CF\u8FF0" aria-hidden="true">#</a> 1. \u95EE\u9898\u63CF\u8FF0</h2><p>\u4E00\u4E2A\u9879\u76EE\u5206\u591A\u6A21\u5757,\u90A3\u4E48\u6BCF\u4E2A\u6A21\u5757\u5185\u90E8\u5206\u4E3Acontrol\u548Cservice\u4EE5\u53CAdao\u4E09\u5C42.\u90A3\u4E48\u5982\u679C\u5728\u67D0\u4E2Aservice\u91CC\u8981\u8C03\u7528\u5176\u4ED6dao,\u662F\u76F4\u63A5\u6CE8\u5165dao\u8FD8\u662F\u5E94\u8BE5\u5C06\u9700\u8981\u7684dao\u7528service\u5C01\u88C5,\u518D\u6CE8\u5165\u5230\u8FD9\u4E2Aservice\u5C42\u4E2D?</p><h2 id="_2-3\u79CD\u5199\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-3\u79CD\u5199\u6CD5" aria-hidden="true">#</a> 2. 3\u79CD\u5199\u6CD5</h2><ol><li><p>Service\u53EA\u8C03DAO</p><blockquote><p>\u4E3B\u8981\u662F\u4E3A\u4E86\u677E\u8026\u5408\uFF0C\u5982\u679C\u8C03\u7528Dao\u8FD8\u4F1A\u5BFC\u81F4\u5FAA\u73AF\u4F9D\u8D56\u95EE\u9898\uFF0Cspringboot2.6 \u5DF2\u7ECF\u7981\u6B62\u4E86\u5FAA\u73AF\u4F9D\u8D56</p></blockquote></li><li><p>Service\u4E3B\u8C03DAO\uFF0C\u5076\u5C14\u8C03\u5176\u5B83Service</p></li><li><p>Service\u8C03\u5176\u5B83Service\uFF0CDAO\u53EA\u5141\u8BB8\u81EA\u5DF1\u7684Service\u8C03</p><blockquote><p>\u6BCF\u4E2Aservice \u4E2D\u8FD8\u5305\u542B\u4E86\u4E1A\u52A1\u903B\u8F91\u3002</p></blockquote></li></ol><p>\u6240\u4EE5\u540E\u6765\u4E5F\u53EA\u80FD\u770B\u9879\u76EE\u662F\u4EC0\u4E48\u5199\u6CD5\uFF0C\u7136\u540E\u7528\u4EC0\u4E48\u5199\u6CD5\u3002</p><h2 id="_3-\u81EA\u5DF1\u7684\u8003\u8651" tabindex="-1"><a class="header-anchor" href="#_3-\u81EA\u5DF1\u7684\u8003\u8651" aria-hidden="true">#</a> 3. \u81EA\u5DF1\u7684\u8003\u8651</h2><p>\u51E0\u79CD\u65B9\u5F0F\u90FD\u53EF\u4EE5\uFF0C\u8FD8\u662F\u6839\u636E\u516C\u53F8\u5386\u53F2\u9879\u76EE\u60C5\u51B5\u51B3\u5B9A\uFF0C\u6CA1\u5FC5\u8981\u592A\u7EA0\u7ED3\u3002</p><p>\u5982\u679C\u5B9E\u73B0\u7EA0\u7ED3\u5C31\u7528\u4E00\u4E2A<strong>facade\u5C01\u88C5\u67D0\u4E00\u5177\u4F53\u4E1A\u52A1</strong></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 10);
const _hoisted_11 = {
  href: "https://www.zhihu.com/question/27139263",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_12 = /* @__PURE__ */ createTextVNode("\u4E00\u4E2A\u6A21\u5757\u4E2D\u7684service\u5C42\u80FD\u4E0D\u80FD\u76F8\u4E92\u5F15\u7528?");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_11, [
        _hoisted_12,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var ______service_________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u4E00\u4E2A\u6A21\u5757\u4E2D\u7684service\u5C42\u80FD\u4E0D\u80FD\u76F8\u4E92\u5F15\u7528.html.vue"]]);
export { ______service_________html as default };
