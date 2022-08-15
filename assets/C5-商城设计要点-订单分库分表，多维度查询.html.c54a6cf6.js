import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.a13257a5.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u5546\u57CE\u8BBE\u8BA1\u8981\u70B9-\u4E5D-\u8BA2\u5355\u5206\u5E93\u5206\u8868-\u591A\u7EF4\u5EA6\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u5546\u57CE\u8BBE\u8BA1\u8981\u70B9-\u4E5D-\u8BA2\u5355\u5206\u5E93\u5206\u8868-\u591A\u7EF4\u5EA6\u67E5\u8BE2" aria-hidden="true">#</a> \u5546\u57CE\u8BBE\u8BA1\u8981\u70B9(\u4E5D)-\u8BA2\u5355\u5206\u5E93\u5206\u8868\uFF0C\u591A\u7EF4\u5EA6\u67E5\u8BE2</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u5982\u679C\u7535\u5546\u7F51\u7AD9\u7684\u8BA2\u5355\u6570\u8FC7\u591A\uFF0C\u6211\u4EEC\u4E00\u822C\u4F1A\u60F3\u5230 <code>\u5206\u5E93\u5206\u8868</code> \u89E3\u51B3\u7B56\u7565\u3002\u6CA1\u95EE\u9898\uFF0C\u8FD9\u4E2A\u65B9\u5411\u662F\u5BF9\u7684\u3002</p><p><strong>\u4F46\u662F\u67E5\u8BE2\u7EF4\u5EA6\u5F88\u591A</strong></p><p>1\u3001\u4E70\u5BB6\uFF0C\u67E5\u8BE2 <code>\u6211\u7684\u8BA2\u5355</code> \u5217\u8868\uFF0C\u9700\u8981\u6839\u636E <code>buyer_id</code> \u6765\u67E5\u8BE2</p><p>2\u3001\u67E5\u770B\u8BA2\u5355\u8BE6\u60C5\uFF0C\u9700\u8981\u6839\u636E <code>order_id</code> \u6765\u67E5\u8BE2</p><p>3\u3001\u5356\u5BB6\uFF0C\u67E5\u8BE2 <code>\u6211\u7684\u9500\u552E</code> \u5217\u8868\uFF0C\u9700\u8981\u6839\u636E <code>seller_id</code> \u6765\u67E5\u8BE2</p><p>\u800C\u8BA2\u5355\u5206\u8868\u53EA\u6709\u4E00\u4E2A\u5206\u8868\u952E\uFF0C\u5982\u4F55\u6EE1\u8DB3\u591A\u7EF4\u5EA6 SQL \u64CD\u4F5C\u5462\uFF1F</p><h2 id="_2-\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#_2-\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> 2. \u89E3\u51B3\u65B9\u6848</h2><p>\u800C\u8BA2\u5355\u5206\u8868\u53EA\u6709\u4E00\u4E2A\u5206\u8868\u952E\uFF0C\u5982\u4F55\u6EE1\u8DB3\u591A\u7EF4\u5EA6 SQL \u64CD\u4F5C\u5462\uFF1F</p><p>\u6211\u4EEC\u4E00\u822C\u662F\u57FA\u4E8E\u4E70\u5BB6\u7EF4\u5EA6\u6765\u8BBE\u8BA1\uFF0C\u4E0B\u56FE\u662F <code>\u6DD8\u5B9D</code> \u7684\u8BA2\u5355\u5217\u8868</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220326213429736.png" alt="image-20220326213429736"></p><p>\u4E00\u4E2A\u8BA2\u5355\u53F7 19 \u4F4D\uFF0C\u6211\u4EEC\u4F1A\u53D1\u73B0\u540C\u4E00\u4E2A\u7528\u6237\u4E0D\u540C\u8BA2\u5355\u7684\u6700\u540E 6 \u4F4D\u90FD\u662F\u4E00\u6837\u7684\uFF0C\u6CA1\u9519\uFF0C\u90A3\u662F\u7528\u6237id\u7684\u540E6\u4F4D\u3002</p><p>\u8FD9\u6837\uFF0C\u4E0A\u6587\u4E2D <code>\u573A\u666F1</code>\u3001<code>\u573A\u666F2</code> \u7684\u67E5\u8BE2\u53EF\u4EE5\u5171\u6027\u62BD\u53D6\uFF0C \u91C7\u7528 <code>buyer_id</code> \u6216 <code>order_id</code> \u7684 <code>\u540E\u516D\u4F4D</code> \u4F5C\u4E3A\u5206\u8868\u952E\uFF0C\u5BF9 <code>1 000 000</code> \u53D6\u6A21\uFF0C\u5F97\u5230\u4E70\u5BB6\u7EF4\u5EA6\u7684\u8BA2\u5355\u5206\u8868\u7684\u7F16\u53F7\u3002</p><p>\u81F3\u4E8E <code>\u573A\u666F3</code> \u5356\u5BB6\u7EF4\u5EA6\u7684\u8BA2\u5355\u67E5\u8BE2\uFF0C\u6211\u4EEC\u53EF\u4EE5\u91C7\u7528\u6570\u636E\u5F02\u6784\u65B9\u5F0F\uFF0C\u6309 <code>seller_id</code> \u7EF4\u5EA6\u53E6\u5916\u5B58\u50A8\u4E00\u4EFD\u6570\u636E\uFF0C\u4E13\u95E8\u4F9B\u5356\u5BB6\u4F7F\u7528\u3002</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 16);
const _hoisted_17 = {
  href: "https://mp.weixin.qq.com/s/BgVr0jEBJwQI5UW_ele08A",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_18 = /* @__PURE__ */ createTextVNode("\u804A\u804A\u7535\u5546\u7CFB\u7EDF\u4E2D\u5E38\u89C1\u76849\u5927\u5751\uFF01\u5E93\u5B58\u8D85\u5356\u3001\u91CD\u590D\u4E0B\u5355\u3001\u7269\u6D41\u5355ABA");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_17, [
        _hoisted_18,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var C5_____________________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C5-\u5546\u57CE\u8BBE\u8BA1\u8981\u70B9-\u8BA2\u5355\u5206\u5E93\u5206\u8868\uFF0C\u591A\u7EF4\u5EA6\u67E5\u8BE2.html.vue"]]);
export { C5_____________________html as default };
