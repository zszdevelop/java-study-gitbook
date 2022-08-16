import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="css\u6837\u5F0F\u6743\u91CD\u548C\u4F18\u5148\u7EA7" tabindex="-1"><a class="header-anchor" href="#css\u6837\u5F0F\u6743\u91CD\u548C\u4F18\u5148\u7EA7" aria-hidden="true">#</a> css\u6837\u5F0F\u6743\u91CD\u548C\u4F18\u5148\u7EA7</h1><h2 id="_1-\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#_1-\u603B\u7ED3" aria-hidden="true">#</a> 1. \u603B\u7ED3</h2><ol><li><strong>\u5E38\u7528\u9009\u62E9\u5668\u6743\u91CD\u4F18\u5148\u7EA7\uFF1A!important &gt; id &gt; class &gt; tag</strong></li><li>!important\u53EF\u4EE5\u63D0\u5347\u6837\u5F0F\u4F18\u5148\u7EA7\uFF0C\u4F46\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u3002\u5982\u679C!important\u88AB\u7528\u4E8E\u4E00\u4E2A\u7B80\u5199\u7684\u6837\u5F0F\u5C5E\u6027\uFF0C\u90A3\u4E48\u8FD9\u6761\u7B80\u5199\u7684\u6837\u5F0F\u5C5E\u6027\u6240\u4EE3\u8868\u7684\u5B50\u5C5E\u6027\u90FD\u4F1A\u88AB\u5E94\u7528\u4E0A!important\u3002 \u4F8B\u5982\uFF1A<em>background: blue !important;</em></li><li>\u5982\u679C\u4E24\u6761\u6837\u5F0F\u90FD\u4F7F\u7528!important\uFF0C\u5219\u6743\u91CD\u503C\u9AD8\u7684\u4F18\u5148\u7EA7\u66F4\u9AD8</li><li>\u5728css\u6837\u5F0F\u8868\u4E2D\uFF0C\u540C\u4E00\u4E2ACSS\u6837\u5F0F\u4F60\u5199\u4E86\u4E24\u6B21\uFF0C\u540E\u9762\u7684\u4F1A\u8986\u76D6\u524D\u9762\u7684</li><li>\u6837\u5F0F\u6307\u5411\u540C\u4E00\u5143\u7D20\uFF0C\u6743\u91CD\u89C4\u5219\u751F\u6548\uFF0C\u6743\u91CD\u5927\u7684\u88AB\u5E94\u7528</li><li>\u6837\u5F0F\u6307\u5411\u540C\u4E00\u5143\u7D20\uFF0C\u6743\u91CD\u89C4\u5219\u751F\u6548\uFF0C\u6743\u91CD\u76F8\u540C\u65F6\uFF0C\u5C31\u8FD1\u539F\u5219\u751F\u6548\uFF0C\u540E\u9762\u5B9A\u4E49\u7684\u88AB\u5E94\u7528</li><li>\u6837\u5F0F\u4E0D\u6307\u5411\u540C\u4E00\u5143\u7D20\u65F6\uFF0C\u6743\u91CD\u89C4\u5219\u5931\u6548\uFF0C\u5C31\u8FD1\u539F\u5219\u751F\u6548\uFF0C\u79BB\u76EE\u6807\u5143\u7D20\u6700\u8FD1\u7684\u6837\u5F0F\u88AB\u5E94\u7528</li></ol><h2 id="_2-\u4EC0\u4E48\u662F\u6743\u91CD" tabindex="-1"><a class="header-anchor" href="#_2-\u4EC0\u4E48\u662F\u6743\u91CD" aria-hidden="true">#</a> 2. \u4EC0\u4E48\u662F\u6743\u91CD</h2><ol><li>\u6743\u91CD\u51B3\u5B9A\u4E86\u4F60css\u89C4\u5219\u600E\u6837\u88AB\u6D4F\u89C8\u5668\u89E3\u6790\u76F4\u5230\u751F\u6548\u3002\u201Ccss\u6743\u91CD\u5173\u7CFB\u5230\u4F60\u7684css\u89C4\u5219\u662F\u600E\u6837\u663E\u793A\u7684\u201D\u3002</li><li>\u5F53\u5F88\u591A\u7684\u6837\u5F0F\u88AB\u5E94\u7528\u5230\u67D0\u4E00\u4E2A\u5143\u7D20\u4E0A\u65F6\uFF0C\u6743\u91CD\u662F\u4E00\u4E2A\u51B3\u5B9A\u54EA\u79CD\u6837\u5F0F\u751F\u6548\uFF0C\u6216\u8005\u662F\u4F18\u5148\u7EA7\u7684\u8FC7\u7A0B\u3002</li><li>\u6BCF\u4E2A\u9009\u62E9\u5668\u90FD\u6709\u81EA\u5DF1\u7684\u6743\u91CD\u3002\u4F60\u7684\u6BCF\u6761css\u89C4\u5219\uFF0C\u90FD\u5305\u542B\u4E00\u4E2A\u6743\u91CD\u7EA7\u522B\u3002 \u8FD9\u4E2A\u7EA7\u522B\u662F\u7531\u4E0D\u540C\u7684\u9009\u62E9\u5668\u52A0\u6743\u8BA1\u7B97\u7684\uFF0C\u901A\u8FC7\u6743\u91CD\uFF0C\u4E0D\u540C\u7684\u6837\u5F0F\u6700\u7EC8\u4F1A\u4F5C\u7528\u5230\u4F60\u7684\u7F51\u9875\u4E2D \u3002</li><li>\u5982\u679C\u4E24\u4E2A\u9009\u62E9\u5668\u540C\u65F6\u4F5C\u7528\u5230\u4E00\u4E2A\u5143\u7D20\u4E0A\uFF0C\u6743\u91CD\u9AD8\u8005\u751F\u6548\u3002</li></ol><p><strong>\u6743\u91CD\u8BB0\u5FC6\u53E3\u8BC0</strong>\uFF1A<em>\u4ECE0\u5F00\u59CB\uFF0C\u4E00\u4E2A\u884C\u5185\u6837\u5F0F+1000\uFF0C\u4E00\u4E2Aid\u9009\u62E9\u5668+100\uFF0C\u4E00\u4E2A\u5C5E\u6027\u9009\u62E9\u5668\u3001class\u6216\u8005\u4F2A\u7C7B+10\uFF0C\u4E00\u4E2A\u5143\u7D20\u9009\u62E9\u5668\uFF0C\u6216\u8005\u4F2A\u5143\u7D20+1\uFF0C\u901A\u914D\u7B26+0\u3002</em></p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201013153629997.png" alt="image-20201013153629997"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 8);
const _hoisted_9 = {
  href: "https://zhuanlan.zhihu.com/p/41604775",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_10 = /* @__PURE__ */ createTextVNode("\u4F60\u5FC5\u987B\u61C2\u7684css\u6837\u5F0F\u6743\u91CD\u548C\u4F18\u5148\u7EA7");
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
var C1Css_________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C1-css\u6837\u5F0F\u6743\u91CD\u548C\u4F18\u5148\u7EA7.html.vue"]]);
export { C1Css_________html as default };
