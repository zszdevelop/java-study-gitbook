import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, d as createVNode, e as createStaticVNode, b as createTextVNode } from "./app.1937b20f.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h2 id="mongodb\u5F02\u5E38\u5173\u95ED\u540E-\u5982\u4F55\u4FEE\u590D\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#mongodb\u5F02\u5E38\u5173\u95ED\u540E-\u5982\u4F55\u4FEE\u590D\u542F\u52A8" aria-hidden="true">#</a> mongodb\u5F02\u5E38\u5173\u95ED\u540E\uFF0C\u5982\u4F55\u4FEE\u590D\u542F\u52A8</h2><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u5F53\u72EC\u7ACB\u7684<code>mongod</code>\u5B9E\u4F8B\u7981\u7528\u65E5\u8BB0\u529F\u80FD\u65F6\uFF0C<strong>\u4E0D\u6B63\u5E38\u7684\u5173\u95ED\u53EF\u80FD\u4F1A\u4F7F\u6570\u636E\u5904\u4E8E\u4E0D\u4E00\u81F4\u72B6\u6001</strong>\u3002\u5F02\u5E38\u5173\u95ED\u540E\uFF0C\u5982\u679C\u5B58\u5728\u975E\u7A7A\u7684<code>mongod.lock</code>\u6587\u4EF6\uFF0C\u5219mongod\u5B9E\u4F8B\u5728\u91CD\u65B0\u542F\u52A8\u65F6\u8BB0\u5F55\u4EE5\u4E0B\u6D88\u606F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Detected unclean shutdown - mongod.lock is not empty.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679CdbPath\u5305\u542B\u975E\u7A7A\u7684<code>mongod.lock</code>\u6587\u4EF6\uFF0C\u5219\u5FC5\u987B\u4FEE\u590D\u6570\u636E\u5E93</p>', 5);
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u4E0D\u8981\u4F7F\u7528\u672C\u6559\u7A0B\u6062\u590D");
const _hoisted_7 = {
  href: "https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-glossary.html#term-replica-set",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode("replica set");
const _hoisted_9 = /* @__PURE__ */ createTextVNode("\u7684\u6210\u5458\u3002\u76F8\u53CD\uFF0C\u60A8\u5E94\u8BE5\u4ECE");
const _hoisted_10 = {
  href: "https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/core-backups.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_11 = /* @__PURE__ */ createTextVNode("backup");
const _hoisted_12 = /* @__PURE__ */ createTextVNode("\u6062\u590D\uFF0C\u6216\u8005\u4ECE\u96C6\u5408\u7684\u53E6\u4E00\u4E2A\u6210\u5458\u91CD\u65B0\u540C\u6B65\uFF0C\u5982");
const _hoisted_13 = {
  href: "https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-resync-replica-set-member.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_14 = /* @__PURE__ */ createTextVNode("\u91CD\u65B0\u540C\u6B65\u526F\u672C\u96C6\u7684\u6210\u5458");
const _hoisted_15 = /* @__PURE__ */ createTextVNode("\u4E2D\u6240\u8FF0\u3002");
const _hoisted_16 = /* @__PURE__ */ createTextVNode("\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0CMongoDB \u5728\u542F\u7528");
const _hoisted_17 = {
  href: "https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/core-journaling.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_18 = /* @__PURE__ */ createTextVNode("journaling");
const _hoisted_19 = /* @__PURE__ */ createTextVNode("\u7684\u60C5\u51B5\u4E0B\u8FD0\u884C\uFF0C\u4EE5\u9632\u6B62\u5728\u5173\u95ED\u65F6\u51FA\u73B0\u6570\u636E\u4E0D\u4E00\u81F4\u7684\u60C5\u51B5\u3002\u8981\u5F7B\u5E95\u5173\u95ED\uFF0C\u8BF7\u53C2\u9605");
const _hoisted_20 = {
  href: "https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-manage-mongodb-processes.html#terminate-mongod-processes",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_21 = /* @__PURE__ */ createTextVNode("\u505C\u6B62 mongod \u8FDB\u7A0B");
const _hoisted_22 = /* @__PURE__ */ createTextVNode("\u3002");
const _hoisted_23 = /* @__PURE__ */ createStaticVNode('<h2 id="_2-\u4EE5-repair-\u542F\u52A8-mongod" tabindex="-1"><a class="header-anchor" href="#_2-\u4EE5-repair-\u542F\u52A8-mongod" aria-hidden="true">#</a> 2. \u4EE5--repair \u542F\u52A8 mongod</h2><p>\u8981\u4FEE\u590D\u6570\u636E\u6587\u4EF6\uFF0C\u8BF7\u4F7F\u7528<code>--repair</code>\u9009\u9879\u542F\u52A8<code>mongod</code>\u5B9E\u4F8B\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u5728\u4FEE\u590D\u64CD\u4F5C\u671F\u95F4\uFF0CMongoDB \u4F7F\u7528<code>--dbpath</code>\u4E2D\u7684<code>_tmp</code>\u76EE\u5F55\u3002</p><p>\u53D1\u51FA\u7C7B\u4F3C\u4E8E\u4EE5\u4E0B\u5185\u5BB9\u7684\u547D\u4EE4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mongod --dbpath /data/db --repair\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5B8C\u6210\u540E\uFF0C<code>dbpath</code>\u5E94\u5305\u542B\u5DF2\u4FEE\u590D\u7684\u6570\u636E\u6587\u4EF6\u548C\u4E00\u4E2A\u7A7A\u7684<code>mongod.lock</code>\u6587\u4EF6\u3002</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 6);
const _hoisted_29 = {
  href: "https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-recover-data-following-unexpected-shutdown.html#%E4%BB%A5--repair-%E5%90%AF%E5%8A%A8-mongod",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_30 = /* @__PURE__ */ createTextVNode("\u610F\u5916\u5173\u95ED\u540E\u6062\u590D\u72EC\u7ACB\u670D\u52A1\u5668");
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
        ]),
        _hoisted_9,
        createBaseVNode("a", _hoisted_10, [
          _hoisted_11,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_12,
        createBaseVNode("a", _hoisted_13, [
          _hoisted_14,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_15
      ])
    ]),
    createBaseVNode("blockquote", null, [
      createBaseVNode("p", null, [
        _hoisted_16,
        createBaseVNode("a", _hoisted_17, [
          _hoisted_18,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_19,
        createBaseVNode("a", _hoisted_20, [
          _hoisted_21,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_22
      ])
    ]),
    _hoisted_23,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_29, [
        _hoisted_30,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var mongodb_____________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "mongodb\u5F02\u5E38\u5173\u95ED\u540E\uFF0C\u5982\u4F55\u4FEE\u590D\u542F\u52A8.html.vue"]]);
export { mongodb_____________html as default };
