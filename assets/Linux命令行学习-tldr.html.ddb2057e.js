import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="linux\u547D\u4EE4\u884C\u5B66\u4E60-tldr" tabindex="-1"><a class="header-anchor" href="#linux\u547D\u4EE4\u884C\u5B66\u4E60-tldr" aria-hidden="true">#</a> Linux\u547D\u4EE4\u884C\u5B66\u4E60-tldr</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u5BF9\u4E8E\u5F88\u591A\u4F7F\u7528\u7EC8\u7AEF\u7684Linux\u548CMac\u7528\u6237\uFF0C\u4F7F\u7528Terminal\u6700\u96BE\u7684\u5C31\u662F\u8981\u8BB0\u4F4F\u4F17\u591A\u7684Linux\u547D\u4EE4\u4E86\u3002\u6BD4\u5982\uFF1A<code>ssh</code>\uFF0C<code>curl</code>\uFF0C<code>grep</code>\u7B49\uFF0C\u7ECF\u5E38\u4F1A\u8BB0\u4E0D\u4F4F\u53C2\u6570\u7684\u987A\u5E8F\u3002\u8FD9\u4E2A\u65F6\u5019\u901A\u5E38\u5728\u4F7F\u7528\u7684\u65F6\u5019\u901A\u8FC7man\u9605\u8BFB\u957F\u957F\u7684\u6587\u6863\uFF0C\u4ECE\u4E2D\u5BF9\u6BD4\u4E00\u4E2A\u4E2A\u53C2\u6570\uFF0C\u8FD9\u6837\u8D39\u65F6\u53C8\u8D39\u529B\u3002</p><p>\u4ECA\u5929\u8981\u4ECB\u7ECD\u7684\u4E00\u4E2A\u597D\u7528\u7684\u5DE5\u5177\u53EB<code>tldr</code>\uFF0Ctldr\u5168\u79F0Too long, Don\u2019t read\uFF0C\u7FFB\u8BD1\u6210\u4E2D\u6587\u5C31\u662F[\u592A\u957F\u4E0D\u8BFB]\u3002<code>tldr</code>\u6839\u636E\u4E8C\u516B\u539F\u5219\u5C06\u547D\u4EE4\u7684\u5E38\u7528\u573A\u666F\u7ED9\u51FA\u793A\u4F8B\uFF0C\u8BA9\u4EBA\u4E00\u770B\u5C31\u61C2\u3002</p><h2 id="_2-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5" aria-hidden="true">#</a> 2. \u5B89\u88C5</h2><div class="language-ssh ext-ssh line-numbers-mode"><pre class="language-ssh"><code>yum -y install npm\nnpm install -g tldr\uFF08\u6709\u53EF\u80FD\u62A5\u9519\uFF0C\u62A5\u9519\u5219\u518D\u6267\u884C\u4E00\u6B21\uFF09\ntldr ssh // \u67E5\u8BE2ssh\u547D\u4EE4\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-tldr-\u8FD0\u884C\u62A5\u9519" tabindex="-1"><a class="header-anchor" href="#_2-1-tldr-\u8FD0\u884C\u62A5\u9519" aria-hidden="true">#</a> 2.1 tldr \u8FD0\u884C\u62A5\u9519</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210402112659028.png" alt="image-20210402112659028"></p>', 8);
const _hoisted_9 = /* @__PURE__ */ createTextVNode("\u5982\u679C\u4F60\u7B2C\u4E00\u6B21\u5B89\u88C5node \u7248\u672C\u53EF\u80FD\u53EA\u67096.* \uFF0C\u5219\u6267\u884C\u65F6\u4F1A\u62A5\u9519\uFF0C\u53EF\u4EE5\u53C2\u8003\u5347\u7EA7");
const _hoisted_10 = {
  href: "https://segmentfault.com/a/1190000015302680",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_11 = /* @__PURE__ */ createTextVNode("\u5728centos7\u5B89\u88C5nodejs\u5E76\u5347\u7EA7nodejs\u5230\u6700\u65B0\u7248\u672C");
const _hoisted_12 = /* @__PURE__ */ createStaticVNode('<h2 id="_3-\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_3-\u4F7F\u7528" aria-hidden="true">#</a> 3. \u4F7F\u7528</h2><p>\u4F7F\u7528tldr \u67E5\u770Btar\u547D\u4EE4</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>tldr tar\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210402113016559.png" alt="image-20210402113016559"></p><p>\u4F7F\u7528man\u67E5\u770Btar\u547D\u4EE4(\u53C8\u81ED\u53C8\u957F)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>man tar\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210402113051584.png" alt="image-20210402113051584"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 8);
const _hoisted_20 = {
  href: "https://www.hi-linux.com/posts/16098.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_21 = /* @__PURE__ */ createTextVNode("Linux\u547D\u4EE4\u884C\u5B66\u4E60\u795E\u5668 TLDR");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_9,
      createBaseVNode("a", _hoisted_10, [
        _hoisted_11,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_12,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_20, [
        _hoisted_21,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Linux_____Tldr_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Linux\u547D\u4EE4\u884C\u5B66\u4E60-tldr.html.vue"]]);
export { Linux_____Tldr_html as default };
