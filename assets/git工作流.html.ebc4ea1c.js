import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.dd6287fd.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="git\u5DE5\u4F5C\u6D41" tabindex="-1"><a class="header-anchor" href="#git\u5DE5\u4F5C\u6D41" aria-hidden="true">#</a> git\u5DE5\u4F5C\u6D41</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>Git \u6709\u591A\u79CD\u5DE5\u4F5C\u6D41\u65B9\u5F0F\uFF0C\u6211\u4EEC\u63A5\u4E0B\u6765\u5C31\u4ECB\u7ECD\u51E0\u79CD\u5E38\u89C1\u7684\u5DE5\u4F5C\u6D41\uFF0C\u4EE5\u4FBF\u5927\u5BB6\u9009\u62E9\u6700\u9002\u5408\u81EA\u5DF1\u7684\u65B9\u5F0F\u3002</p><h2 id="_2-\u5E38\u89C1\u5DE5\u4F5C\u6D41" tabindex="-1"><a class="header-anchor" href="#_2-\u5E38\u89C1\u5DE5\u4F5C\u6D41" aria-hidden="true">#</a> 2. \u5E38\u89C1\u5DE5\u4F5C\u6D41</h2><h3 id="_2-1-\u4E3B\u5E72\u5F00\u53D1" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E3B\u5E72\u5F00\u53D1" aria-hidden="true">#</a> 2.1 \u4E3B\u5E72\u5F00\u53D1</h3><p>\u4E25\u683C\u610F\u4E49\u4E0A\u8BF4\u4ED6\u5E76\u4E0D\u7B97\u5DE5\u4F5C\u6D41\uFF0C\u6240\u6709\u63D0\u4EA4\u90FD\u5728\u4E3B\u5E72\u4E0A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213253441.png" alt="image-20211209213253441"></p><h4 id="_2-1-1-\u4F18\u52BF" tabindex="-1"><a class="header-anchor" href="#_2-1-1-\u4F18\u52BF" aria-hidden="true">#</a> 2.1.1 \u4F18\u52BF</h4><ul><li>\u65B9\u4FBF\uFF0C\u6240\u6709\u90FD\u63D0\u4EA4\u5230master</li><li>\u9002\u5408\u4E00\u4E9B\u5C0F\u7EC4\u4EF6/\u5DE5\u5177</li></ul><h4 id="_2-1-2-\u7F3A\u9677" tabindex="-1"><a class="header-anchor" href="#_2-1-2-\u7F3A\u9677" aria-hidden="true">#</a> 2.1.2 \u7F3A\u9677</h4><ul><li>\u7F3A\u4E4F\u6709\u6548\u7BA1\u7406</li></ul><h3 id="_2-2-git-flow" tabindex="-1"><a class="header-anchor" href="#_2-2-git-flow" aria-hidden="true">#</a> 2.2 Git Flow</h3><p><code>Git\u5DE5\u4F5C\u6D41</code> \u662F\u6700\u5E7F\u4E3A\u4EBA\u77E5\u7684\u5DE5\u4F5C\u6D41\u3002\u7531<code>Vincent Driessen</code> \u57282010\u5E74\u6240\u53D1\u660E\uFF0C\u8FD9\u79CD\u5DE5\u4F5C\u6D41\u5EFA\u7ACB\u5728\u4E24\u4E2A\u5177\u6709\u6C38\u4E45\u751F\u547D\u5468\u671F\u7684\u5206\u652F\u57FA\u7840\u4E4B\u4E0A\uFF1A</p><ul><li>master\u5206\u652F - \u5BF9\u5E94\u751F\u4EA7\u73AF\u5883\u7684\u7EBF\u4E0A\u4EE3\u7801\u3002\u6240\u6709\u5F00\u53D1\u4EE3\u7801\u90FD\u4F1A\u5728\u67D0\u4E2A\u65F6\u95F4\u70B9\u5408\u5E76\u5230master\u5206\u652F\u3002</li><li>develop\u5206\u652F - \u5BF9\u5E94\u7684\u662F\u9884\u751F\u4EA7\u7684\u4EE3\u7801\u3002\u5F53\u529F\u80FD\u5206\u652F\u5F00\u53D1\u5B8C\u6BD5\u4E4B\u540E\uFF0C\u4F1A\u88AB\u5408\u5E76\u5230develop\u5206\u652F\u3002</li></ul><p>\u4E0E\u4E4B\u5E76\u884C\u7684\uFF0C\u662F\u5728\u5F00\u53D1\u5468\u671F\u4E4B\u5185\uFF0C\u8FD8\u4F1A\u4F7F\u7528\u4E00\u4E9B\u5176\u4ED6\u7C7B\u578B\u7684\u5206\u652F\u4EE5\u4FBF\u652F\u6301\u5F00\u53D1\u6D41\u7A0B\uFF1A</p><ul><li>feature-* ( * \u8868\u793A\u901A\u914D\u7B26\uFF0C\u4E0B\u540C) \u5206\u652F \u2014 \u529F\u80FD\u5206\u652F\u7528\u6765\u5F00\u53D1\u4E0B\u6B21\u53D1\u5E03\u5305\u542B\u7684\u65B0\u529F\u80FD\u3002\u8FD9\u4E9B\u5206\u652F\u5E94\u5F53\u90FD\u662F\u4ECEdevelop\u5206\u652F\u6D3E\u751F\u51FA\u6765\uFF0C\u7136\u540E\u6700\u7EC8\u4E5F\u5E94\u8BE5\u5408\u5E76\u56DEdevelop\u5206\u652F\u3002</li><li>hotfix-* \u5206\u652F \u2014 \u5F53master\u5206\u652F\u4E2D\u542B\u6709\u4E0D\u5E94\u51FA\u73B0\u7684\u72B6\u51B5\u65F6\uFF0C\u5219\u6709\u5FC5\u8981\u6D3E\u751F\u51FAhotfix\u5206\u652F\u5BF9master\u5206\u652F\u8FDB\u884C\u7D27\u6025\u4FEE\u590D\u3002\u8FD9\u4E9B\u5206\u652F\u5E94\u5F53\u6D3E\u751F\u81EAmaster \u5206\u652F\uFF0C\u5E76\u4E14\u6700\u7EC8\u5E94\u5F53\u540C\u65F6\u5408\u5E76\u56DEmaster \u548Cdevelop \u5206\u652F\u3002</li><li>release-* \u5206\u652F \u2014 release \u5206\u652F\u7528\u4E8E\u51C6\u5907\u4E00\u6B21\u65B0\u7684\u751F\u4EA7\u73AF\u5883\u7248\u672C\u66F4\u65B0\u3002\u521B\u5EFArelease-*\u5206\u652F\u7528\u6765\u4FEE\u590D\u4E00\u4E9B\u5728\u6D4B\u8BD5\u73AF\u5883\u672A\u53D1\u73B0\u7684\u5C0FBUG\uFF0C\u4EE5\u53CA\u66F4\u65B0\u6B64\u7248\u672C\u7684\u539F\u4FE1\u606F\u3002\u5176\u5E94\u5F53\u6D3E\u751F\u81EAdevelop\u5206\u652F\uFF0C\u5E76\u4E14\u6700\u7EC8\u540C\u65F6\u5408\u5E76\u56DEmaster \u5206\u652F\u548C develop\u5206\u652F\u3002</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213326278.png" alt="image-20211209213326278"></p><h4 id="_2-2-1-\u4F18\u52BF" tabindex="-1"><a class="header-anchor" href="#_2-2-1-\u4F18\u52BF" aria-hidden="true">#</a> 2.2.1 <strong>\u4F18\u52BF</strong></h4>', 18);
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("li", null, "\u5728\u9879\u76EE\u5468\u671F\u4E4B\u5185\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u4FDD\u8BC1\u4EFB\u4F55\u65F6\u523B\u4E24\u4E2A\u4E3B\u8981\u5206\u652F\u90FD\u662F\u5904\u4E8E\u7EAF\u51C0\u72B6\u6001\u7684", -1);
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("li", null, "\u7531\u4E8E\u9075\u5FAA\u7CFB\u7EDF\u5316\u7684\u6A21\u5F0F\uFF0C\u56E0\u6B64\u5206\u652F\u547D\u540D\u5BB9\u6613\u7406\u89E3", -1);
const _hoisted_21 = /* @__PURE__ */ createTextVNode("\u5927\u591A\u6570Git\u5DE5\u5177\u90FD\u652F\u6301\u8BE5\u5DE5\u4F5C\u6D41\u7684");
const _hoisted_22 = {
  href: "https://link.zhihu.com/?target=https%3A//github.com/nvie/gitflow",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_23 = /* @__PURE__ */ createTextVNode("\u6269\u5C55\u5DE5\u5177");
const _hoisted_24 = /* @__PURE__ */ createBaseVNode("li", null, "\u5F53\u9879\u76EE\u4E2D\u9700\u8981\u540C\u65F6\u7EF4\u62A4\u591A\u4E2A\u751F\u4EA7\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u6A21\u5F0F\u975E\u5E38\u7406\u60F3", -1);
const _hoisted_25 = /* @__PURE__ */ createStaticVNode('<h4 id="_2-2-2-\u7F3A\u9677" tabindex="-1"><a class="header-anchor" href="#_2-2-2-\u7F3A\u9677" aria-hidden="true">#</a> 2.2.2 <strong>\u7F3A\u9677</strong></h4><ul><li>Git \u7684\u5386\u53F2\u8BB0\u5F55\u5C06\u53D8\u5F97\u5F02\u5E38\u6DF7\u4E71\uFF0C\u53EF\u8BFB\u6027\u5F88\u5DEE</li><li>master / develop \u5206\u652F\u7684\u5272\u88C2\u4F7FCI/CD\u6D41\u7A0B\u53D8\u5F97\u66F4\u52A0\u56F0\u96BE</li><li>\u5F53\u9879\u76EE\u7EF4\u62A4\u5355\u4E00\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u5219\u4E0D\u9002\u7528</li></ul><h3 id="_2-3-github-flow" tabindex="-1"><a class="header-anchor" href="#_2-3-github-flow" aria-hidden="true">#</a> 2.3 <strong>GitHub Flow</strong></h3><p>GitHub \u5DE5\u4F5C\u6D41\u662F\u4E00\u4E2A\u8F7B\u578B\u7684\u5DE5\u4F5C\u6D41\uFF0C\u5B83\u662FGitHub \u57282011\u5E74 \u521B\u5EFA\uFF0C\u5176\u5DE5\u4F5C\u6D41\u9075\u5FAA\u4EE5\u4E0B6\u4E2A\u539F\u5219\uFF1A</p>', 4);
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("li", null, "\u4EFB\u4F55\u65F6\u523B\u7684master\u5206\u652F\u4EE3\u7801\u90FD\u662F\u53EF\u4EE5\u7528\u6765\u90E8\u7F72\u7684", -1);
const _hoisted_30 = /* @__PURE__ */ createBaseVNode("li", null, "\u4EFB\u4F55\u65B0\u53D8\u66F4\u90FD\u9700\u8981\u4ECEmaster\u6D3E\u751F\u51FA\u4E00\u4E2A\u5206\u652F\uFF0C\u5E76\u4E14\u4E3A\u5176\u8D77\u4E00\u4E2A\u63CF\u8FF0\u65B0\u53D8\u66F4\u5185\u5BB9\u7684\u540D\u5B57\uFF1A\u6BD4\u5982 new-oauth2-scopes", -1);
const _hoisted_31 = /* @__PURE__ */ createBaseVNode("li", null, "\u5728\u672C\u5730\u63D0\u4EA4\u8BE5\u65B0\u5206\u652F\u53D8\u66F4\uFF0C\u5E76\u4E14\u5E94\u7ECF\u5E38\u6027\u7684\u5411\u670D\u52A1\u5668\u7AEF\u8BE5\u540C\u540D\u5206\u652F\u63A8\u9001\u53D8\u66F4", -1);
const _hoisted_32 = /* @__PURE__ */ createTextVNode("\u5F53\u4F60\u9700\u8981\u5E2E\u52A9\u3001\u53CD\u9988\uFF0C\u6216\u8BA4\u4E3A\u65B0\u5206\u652F\u53EF\u4EE5\u5408\u5E76\u7684\u65F6\u5019\uFF0C\u65B0\u5EFA\u4E00\u4E2A");
const _hoisted_33 = {
  href: "https://link.zhihu.com/?target=http%3A//help.github.com/send-pull-requests/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_34 = /* @__PURE__ */ createTextVNode("pull request");
const _hoisted_35 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createTextVNode("\u53EA\u6709\u5728\u5176\u4ED6\u4EBAreview\u901A\u8FC7\u4E4B\u540E\uFF0C\u65B0\u5206\u652F\u624D\u5141\u8BB8\u5408\u5E76\u5230 "),
  /* @__PURE__ */ createBaseVNode("code", null, "master"),
  /* @__PURE__ */ createTextVNode(" \u5206\u652F")
], -1);
const _hoisted_36 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createTextVNode("\u4E00\u65E6\u65B0\u5206\u652F\u88AB\u5408\u5E76\u63A8\u9001\u81F3"),
  /* @__PURE__ */ createBaseVNode("code", null, "master"),
  /* @__PURE__ */ createTextVNode("\u5206\u652F\uFF0Cmaster\u5206\u652F\u5E94\u5F53\u7ACB\u5373\u8FDB\u884C\u90E8\u7F72")
], -1);
const _hoisted_37 = /* @__PURE__ */ createStaticVNode('<p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213349934.png" alt="image-20211209213349934"></p><h4 id="_2-3-1-\u4F18\u52BF" tabindex="-1"><a class="header-anchor" href="#_2-3-1-\u4F18\u52BF" aria-hidden="true">#</a> 2.3.1 <strong>\u4F18\u52BF</strong></h4><ul><li>\u8BE5\u5DE5\u4F5C\u6D41\u5BF9\u4E8ECI/CD\u6D41\u7A0B\u53CB\u597D</li><li>\u662FGit\u5DE5\u4F5C\u6D41\u7684\u4E00\u79CD\u7B80\u7248\u66FF\u6362</li><li>\u5F53\u9879\u76EE\u7EF4\u62A4\u5355\u4E00\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u9002\u7528</li></ul><h4 id="_2-3-2-\u7F3A\u9677" tabindex="-1"><a class="header-anchor" href="#_2-3-2-\u7F3A\u9677" aria-hidden="true">#</a> 2.3.2 \u7F3A\u9677</h4>', 4);
const _hoisted_41 = /* @__PURE__ */ createBaseVNode("li", null, "\u751F\u4EA7\u73AF\u5883\u5BF9\u5E94\u7684\u4EE3\u7801\u6781\u6613\u5904\u4E8E\u4E0D\u7A33\u5B9A\u72B6\u6001", -1);
const _hoisted_42 = /* @__PURE__ */ createTextVNode("\u5BF9\u4E8E\u4F9D\u8D56");
const _hoisted_43 = {
  href: "https://www.zhihu.com/search?q=%E5%8F%91%E5%B8%83%E8%AE%A1%E5%88%92&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22article%22%2C%22sourceId%22%3A434078984%7D",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_44 = /* @__PURE__ */ createTextVNode("\u53D1\u5E03\u8BA1\u5212");
const _hoisted_45 = /* @__PURE__ */ createTextVNode("\u7684\u9879\u76EE\u65E0\u6CD5\u5145\u5206\u652F\u6301");
const _hoisted_46 = /* @__PURE__ */ createBaseVNode("li", null, "\u8BE5\u5DE5\u4F5C\u6D41\u5E76\u4E0D\u6D89\u53CA\u5173\u4E8E\u90E8\u7F72\uFF0C\u73AF\u5883\uFF0C\u53D1\u5E03\u548C\u95EE\u9898\u7B49\u65B9\u9762\u7684\u89E3\u51B3\u65B9\u6848", -1);
const _hoisted_47 = /* @__PURE__ */ createBaseVNode("li", null, "\u5F53\u9879\u76EE\u7EF4\u62A4\u591A\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u4E0D\u9002\u7528", -1);
const _hoisted_48 = /* @__PURE__ */ createBaseVNode("h3", {
  id: "_2-4-gitlab-flow",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_2-4-gitlab-flow",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 2.4 "),
  /* @__PURE__ */ createBaseVNode("strong", null, "GitLab Flow")
], -1);
const _hoisted_49 = /* @__PURE__ */ createTextVNode("GitLab\u5DE5\u4F5C\u6D41\u7531");
const _hoisted_50 = {
  href: "https://link.zhihu.com/?target=https%3A//about.gitlab.com/2014/09/29/gitlab-flow/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_51 = /* @__PURE__ */ createTextVNode("GitLab");
const _hoisted_52 = /* @__PURE__ */ createTextVNode("\u521B\u5EFA\u4E8E2014\u5E74\u3002\u8FD9\u79CD\u5DE5\u4F5C\u6D41\u5C06");
const _hoisted_53 = {
  href: "https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Feature-driven_development",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_54 = /* @__PURE__ */ createTextVNode("\u529F\u80FD\u9A71\u52A8\u7684\u5F00\u53D1\u6A21\u5F0F");
const _hoisted_55 = /* @__PURE__ */ createTextVNode("\u4E0E\u95EE\u9898\u8DDF\u8E2A\u7ED3\u5408\u5728\u4E00\u8D77\u3002\u4E0EGitHub\u5DE5\u4F5C\u6D41\u6700\u5927\u7684\u4E0D\u540C\uFF0C\u662FGitLab\u5DE5\u4F5C\u6D41\u65B0\u521B\u5EFA\u4E86\u4E0E\u73AF\u5883\u76F8\u5173\u7684\u5206\u652F\uFF08\u6BD4\u5982\uFF0C");
const _hoisted_56 = /* @__PURE__ */ createBaseVNode("code", null, "staging", -1);
const _hoisted_57 = /* @__PURE__ */ createTextVNode("\u5206\u652F\u548C");
const _hoisted_58 = /* @__PURE__ */ createBaseVNode("code", null, "production", -1);
const _hoisted_59 = /* @__PURE__ */ createTextVNode("\u5206\u652F\uFF09\uFF0C\u9002\u7528\u4E8E\u6BCF\u6B21\u5408\u5E76\u529F\u80FD\u5206\u652F\u540E\u4E0D\u9700\u9A6C\u4E0A\u90E8\u7F72\u81F3\u751F\u4EA7\u73AF\u5883\u7684\u9879\u76EE\uFF08\u5982SaaS\u8F6F\u4EF6\uFF0C\u79FB\u52A8\u8F6F\u4EF6\u9879\u76EE\u7B49\uFF09\u3002");
const _hoisted_60 = /* @__PURE__ */ createBaseVNode("p", null, "GitLab\u5DE5\u4F5C\u6D41\u9075\u5FAA\u4EE5\u4E0B11\u6761\u539F\u5219\uFF1A", -1);
const _hoisted_61 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createTextVNode("\u4F7F\u7528\u529F\u80FD\u5206\u652F\u8FDB\u884C\u5F00\u53D1\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u5728"),
  /* @__PURE__ */ createBaseVNode("code", null, "master"),
  /* @__PURE__ */ createTextVNode("\u5206\u652F\u4E0A\u63D0\u4EA4\u4EE3\u7801 \uFF08\u5982\u679C\u4F60\u7684\u5F00\u53D1\u4E3B\u5206\u652F\u662F "),
  /* @__PURE__ */ createBaseVNode("code", null, "master"),
  /* @__PURE__ */ createTextVNode("\u7684\u8BDD\uFF0C\u4E0B\u540C\uFF09")
], -1);
const _hoisted_62 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createTextVNode("\u6D4B\u8BD5\u6BCF\u4E00\u6B21commit\uFF0C\u800C\u4E0D\u4EC5\u4EC5\u662F\u5BF9"),
  /* @__PURE__ */ createBaseVNode("code", null, "master"),
  /* @__PURE__ */ createTextVNode("\u5206\u652F\u8FDB\u884C\u6D4B\u8BD5")
], -1);
const _hoisted_63 = /* @__PURE__ */ createBaseVNode("li", null, "\u5728\u6240\u6709commits\u4E0A\u8FD0\u884C\u81EA\u52A8\u5316\u6D4B\u8BD5\uFF08\u5982\u679C\u4F60\u7684\u6D4B\u8BD5\u811A\u672C\u8FD0\u884C\u65F6\u95F4\u8D85\u8FC75\u5206\u949F\uFF0C\u5C31\u8BA9\u4ED6\u4EEC\u5E76\u884C\uFF09", -1);
const _hoisted_64 = /* @__PURE__ */ createTextVNode("\u5728");
const _hoisted_65 = {
  href: "https://www.zhihu.com/search?q=%E5%90%88%E5%B9%B6%E4%BB%A3%E7%A0%81&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22article%22%2C%22sourceId%22%3A434078984%7D",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_66 = /* @__PURE__ */ createTextVNode("\u5408\u5E76\u4EE3\u7801");
const _hoisted_67 = /* @__PURE__ */ createTextVNode("\u4E4B\u524D\u8FDB\u884Ccode review\uFF0C\u800C\u4E0D\u662F\u5728\u5408\u5E76\u4E4B\u540E");
const _hoisted_68 = /* @__PURE__ */ createStaticVNode("<li>\u4EE5\u5206\u652F\u540D\u6216\u8005tag\u4E3A\u51C6\u8FDB\u884C\u81EA\u52A8\u5316\u7684\u90E8\u7F72</li><li>tag\u7531\u4EBA\u6765\u8BBE\u5B9A\uFF0C\u800C\u4E0D\u662FCI</li><li>\u53D1\u5E03\u7248\u672C\u5E94\u5EFA\u7ACB\u5728tag\u4E0A</li><li>\u5DF2push\u7684commits\u6C38\u8FDC\u4E0D\u8981\u8FDB\u884Crebase</li><li>\u6240\u6709\u4EBA\u4ECE<code>master</code>\u6D3E\u751F\u65B0\u5206\u652F\uFF0C\u6700\u7EC8\u5408\u5E76\u56DE`master</li><li>\u4FEE\u590Dbug\u65F6\u5E94\u8BE5\u4F18\u5148\u4FEE\u590D<code>master</code>\u5206\u652F\u7684\u4EE3\u7801\uFF0C\u4FEE\u590D\u4E4B\u540E\u518Dcherry-pick\u5230\u7EBF\u4E0A\u5206\u652F</li><li>commit messages \u8981\u6709\u610F\u4E49</li>", 7);
const _hoisted_75 = /* @__PURE__ */ createStaticVNode('<p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213428242.png" alt="image-20211209213428242"></p><h4 id="_2-4-1-\u4F18\u52BF" tabindex="-1"><a class="header-anchor" href="#_2-4-1-\u4F18\u52BF" aria-hidden="true">#</a> 2.4.1 <strong>\u4F18\u52BF</strong></h4><ul><li>\u76F8\u5BF9\u4E8E\u524D\u4E24\u79CD\u5DE5\u4F5C\u6D41\uFF0CGitLab\u5DE5\u4F5C\u6D41\u5B9A\u4E49\u4E86\u5982\u4F55\u8FDB\u884CCI\u548CCD\u6D41\u7A0B\u7684\u6574\u5408</li><li>\u63D0\u4EA4\u5386\u53F2\u4F1A\u975E\u5E38\u6E05\u723D\uFF0C\u5386\u53F2\u4FE1\u606F\u770B\u4E0A\u53BB\u4F1A\u66F4\u5177\u53EF\u8BFB\u6027</li><li>\u5F53\u9879\u76EE\u7EF4\u62A4\u5355\u4E00\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u9002\u7528</li></ul><h4 id="_2-4-2-\u7F3A\u9677" tabindex="-1"><a class="header-anchor" href="#_2-4-2-\u7F3A\u9677" aria-hidden="true">#</a> 2.4.2 <strong>\u7F3A\u9677</strong></h4><ul><li>\u6BD4GitHub\u5DE5\u4F5C\u6D41\u66F4\u52A0\u590D\u6742</li><li>\u5F53\u9879\u76EE\u7EF4\u62A4\u591A\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u5C06\u4F1A\u53D8\u5F97\u548CGit Flow\u4E00\u6837\u590D\u6742</li></ul><h3 id="_2-5-one-flow" tabindex="-1"><a class="header-anchor" href="#_2-5-one-flow" aria-hidden="true">#</a> 2.5 <strong>One Flow</strong></h3>', 6);
const _hoisted_81 = /* @__PURE__ */ createTextVNode("One Flow \u6700\u521D\u5728");
const _hoisted_82 = {
  href: "https://link.zhihu.com/?target=http%3A//endoflineblog.com/gitflow-considered-harmful",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_83 = /* @__PURE__ */ createTextVNode("GitFlow considered harmful by Adam Ruka, 2015");
const _hoisted_84 = /* @__PURE__ */ createTextVNode("\u8FD9\u7BC7\u6587\u7AE0\u4E2D\u63D0\u51FA\uFF0C\u4F5C\u4E3AGit Flow\u7684\u53E6\u4E00\u79CD\u9009\u62E9\u3002\u4F7F\u7528One Flow\u9700\u8981\u6EE1\u8DB3\u7684\u6700\u91CD\u8981\u7684\u6761\u4EF6\uFF0C\u662F\u751F\u4EA7\u7248\u672C\u7684\u6BCF\u4E00\u6B21\u66F4\u65B0\u90FD\u57FA\u4E8E\u524D\u4E00\u751F\u4EA7\u7248\u672C\uFF0C\u4E0EGit Flow\u6700\u5927\u7684\u533A\u522B\u662F\u6CA1\u6709");
const _hoisted_85 = /* @__PURE__ */ createBaseVNode("code", null, "develop", -1);
const _hoisted_86 = /* @__PURE__ */ createTextVNode("\u8FD9\u4E00\u5206\u652F\u3002");
const _hoisted_87 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "_2-5-1-\u4F18\u52BF",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_2-5-1-\u4F18\u52BF",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 2.5.1 "),
  /* @__PURE__ */ createBaseVNode("strong", null, "\u4F18\u52BF")
], -1);
const _hoisted_88 = /* @__PURE__ */ createBaseVNode("ul", null, [
  /* @__PURE__ */ createBaseVNode("li", null, "\u63D0\u4EA4\u5386\u53F2\u4F1A\u975E\u5E38\u6E05\u723D\uFF0C\u5386\u53F2\u4FE1\u606F\u770B\u4E0A\u53BB\u4F1A\u66F4\u5177\u53EF\u8BFB\u6027"),
  /* @__PURE__ */ createBaseVNode("li", null, "\u7075\u6D3B\u7684\u56E2\u961F\u534F\u4F5C\u673A\u5236"),
  /* @__PURE__ */ createBaseVNode("li", null, "\u5F53\u9879\u76EE\u7EF4\u62A4\u5355\u4E00\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u9002\u7528")
], -1);
const _hoisted_89 = /* @__PURE__ */ createBaseVNode("h4", {
  id: "_2-5-2-\u7F3A\u9677",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_2-5-2-\u7F3A\u9677",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 2.5.2 "),
  /* @__PURE__ */ createBaseVNode("strong", null, "\u7F3A\u9677")
], -1);
const _hoisted_90 = /* @__PURE__ */ createBaseVNode("li", null, "\u81EA\u52A8\u5316CI/CD\u80FD\u529B\u7684\u9879\u76EE\u614E\u7528", -1);
const _hoisted_91 = /* @__PURE__ */ createTextVNode("\u529F\u80FD\u5206\u652F\u4E0D\u660E\u786E\uFF0C\u4E0D\u9002\u7528");
const _hoisted_92 = {
  href: "https://www.zhihu.com/search?q=%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22article%22%2C%22sourceId%22%3A434078984%7D",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_93 = /* @__PURE__ */ createTextVNode("\u6301\u7EED\u96C6\u6210");
const _hoisted_94 = /* @__PURE__ */ createBaseVNode("li", null, "\u5F53\u9879\u76EE\u7EF4\u62A4\u591A\u751F\u4EA7\u73AF\u5883\u7248\u672C\u65F6\uFF0C\u8BE5\u5DE5\u4F5C\u6D41\u4E0D\u9002\u7528", -1);
const _hoisted_95 = /* @__PURE__ */ createBaseVNode("h2", {
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
const _hoisted_96 = {
  href: "https://zhuanlan.zhihu.com/p/434078984",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_97 = /* @__PURE__ */ createTextVNode("\u56DB\u79CD\u5E38\u89C1\u7684Git\u5DE5\u4F5C\u6D41");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("ul", null, [
      _hoisted_19,
      _hoisted_20,
      createBaseVNode("li", null, [
        _hoisted_21,
        createBaseVNode("a", _hoisted_22, [
          _hoisted_23,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      _hoisted_24
    ]),
    _hoisted_25,
    createBaseVNode("ol", null, [
      _hoisted_29,
      _hoisted_30,
      _hoisted_31,
      createBaseVNode("li", null, [
        _hoisted_32,
        createBaseVNode("a", _hoisted_33, [
          _hoisted_34,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      _hoisted_35,
      _hoisted_36
    ]),
    _hoisted_37,
    createBaseVNode("ul", null, [
      _hoisted_41,
      createBaseVNode("li", null, [
        _hoisted_42,
        createBaseVNode("a", _hoisted_43, [
          _hoisted_44,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_45
      ]),
      _hoisted_46,
      _hoisted_47
    ]),
    _hoisted_48,
    createBaseVNode("p", null, [
      _hoisted_49,
      createBaseVNode("a", _hoisted_50, [
        _hoisted_51,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_52,
      createBaseVNode("a", _hoisted_53, [
        _hoisted_54,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_55,
      _hoisted_56,
      _hoisted_57,
      _hoisted_58,
      _hoisted_59
    ]),
    _hoisted_60,
    createBaseVNode("ol", null, [
      _hoisted_61,
      _hoisted_62,
      _hoisted_63,
      createBaseVNode("li", null, [
        _hoisted_64,
        createBaseVNode("a", _hoisted_65, [
          _hoisted_66,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_67
      ]),
      _hoisted_68
    ]),
    _hoisted_75,
    createBaseVNode("p", null, [
      _hoisted_81,
      createBaseVNode("a", _hoisted_82, [
        _hoisted_83,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_84,
      _hoisted_85,
      _hoisted_86
    ]),
    _hoisted_87,
    _hoisted_88,
    _hoisted_89,
    createBaseVNode("ul", null, [
      _hoisted_90,
      createBaseVNode("li", null, [
        _hoisted_91,
        createBaseVNode("a", _hoisted_92, [
          _hoisted_93,
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      _hoisted_94
    ]),
    _hoisted_95,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_96, [
        _hoisted_97,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var git____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "git\u5DE5\u4F5C\u6D41.html.vue"]]);
export { git____html as default };
