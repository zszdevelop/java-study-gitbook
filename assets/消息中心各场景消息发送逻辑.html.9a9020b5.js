import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, d as createVNode, e as createStaticVNode, b as createTextVNode } from "./app.1937b20f.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u6D88\u606F\u4E2D\u5FC3\u5404\u573A\u666F\u6D88\u606F\u53D1\u9001\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u6D88\u606F\u4E2D\u5FC3\u5404\u573A\u666F\u6D88\u606F\u53D1\u9001\u903B\u8F91" aria-hidden="true">#</a> \u6D88\u606F\u4E2D\u5FC3\u5404\u573A\u666F\u6D88\u606F\u53D1\u9001\u903B\u8F91</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u6D88\u606F\u4E2D\u5FC3\u5728\u5404\u573A\u666F\u4E0B\u7684\u53D1\u9001\u903B\u8F91\u662F\u4E0D\u4E00\u81F4\u7684\uFF0C\u4F8B\u5982</p><ul><li>\u53D1\u9001\u7ED9\u5355\u4EBA\u7684\u4E1A\u52A1\u6D88\u606F\u3002\u6211\u4EEC\u5E0C\u671B\u53D1\u9001\u5B8C\u6D88\u606F\u540E\uFF0C\u7528\u6237\u7ACB\u5373\u6536\u5230\u6D88\u606F</li><li>\u800C\u50CF\u7C7B\u4F3C\u901A\u77E5\u516C\u544A\u8FD9\u7C7B\u6D88\u606F\uFF0C\u9762\u5411\u7684\u662F\u6240\u6709\u7528\u6237\uFF0C\u90A3\u4E48\u6211\u4EEC\u4E0D\u53EF\u80FD\u4E00\u6B21\u6027\u53D1\u7ED9\u6240\u6709\u7528\u6237\u3002\u6240\u4EE5\u6211\u4EEC\u91C7\u7528\u767B\u5F55\u6216\u8FDB\u5165\u9996\u9875\u540E\uFF0C\u91CD\u65B0\u62C9\u53D6\u65B0\u6D88\u606F\u7684\u6A21\u5F0F</li></ul><h2 id="_2-\u63A5\u53E3\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#_2-\u63A5\u53E3\u8BBE\u8BA1" aria-hidden="true">#</a> 2. \u63A5\u53E3\u8BBE\u8BA1</h2><p>NotifyService\u62E5\u6709\u4EE5\u4E0B\u65B9\u6CD5:</p><ul><li>createAnnounce(content, sender) <ol><li>\u5F80Notify\u8868\u4E2D\u63D2\u5165\u4E00\u6761\u516C\u544A\u8BB0\u5F55</li></ol></li><li>createRemind(target, targetType, action, sender, content) <ol><li>\u5F80Notify\u8868\u4E2D\u63D2\u5165\u4E00\u6761\u63D0\u9192\u8BB0\u5F55</li></ol></li><li>createMessage(content, sender, receiver) <ol><li>\u5F80Notify\u8868\u4E2D\u63D2\u5165\u4E00\u6761\u4FE1\u606F\u8BB0\u5F55</li><li>\u5F80UserNotify\u8868\u4E2D\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u5E76\u5173\u8054\u65B0\u5EFA\u7684Notify</li></ol></li><li>pullAnnounce(user) <ol><li>\u4ECEUserNotify\u4E2D\u83B7\u53D6\u6700\u8FD1\u7684\u4E00\u6761\u516C\u544A\u4FE1\u606F\u7684\u521B\u5EFA\u65F6\u95F4: <code>lastTime</code></li><li>\u7528<code>lastTime</code>\u4F5C\u4E3A\u8FC7\u6EE4\u6761\u4EF6\uFF0C\u67E5\u8BE2Notify\u7684\u516C\u544A\u4FE1\u606F</li><li>\u65B0\u5EFAUserNotify\u5E76\u5173\u8054\u67E5\u8BE2\u51FA\u6765\u7684\u516C\u544A\u4FE1\u606F</li></ol></li><li>pullRemind(user) <ol><li>\u67E5\u8BE2\u7528\u6237\u7684\u8BA2\u9605\u8868\uFF0C\u5F97\u5230\u7528\u6237\u7684\u4E00\u7CFB\u5217\u8BA2\u9605\u8BB0\u5F55</li><li>\u901A\u8FC7\u6BCF\u4E00\u6761\u7684\u8BA2\u9605\u8BB0\u5F55\u7684<code>target</code>\u3001<code>targetType</code>\u3001<code>action</code>\u3001<code>createdAt</code>\u53BB\u67E5\u8BE2Notify\u8868\uFF0C\u83B7\u53D6\u8BA2\u9605\u7684Notify\u8BB0\u5F55\u3002\uFF08\u6CE8\u610F\u8BA2\u9605\u65F6\u95F4\u5FC5\u987B\u65E9\u4E8E\u63D0\u9192\u521B\u5EFA\u65F6\u95F4\uFF09</li><li>\u67E5\u8BE2\u7528\u6237\u7684\u914D\u7F6E\u6587\u4EF6SubscriptionConfig\uFF0C\u5982\u679C\u6CA1\u6709\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u914D\u7F6EDefaultSubscriptionConfig</li><li>\u4F7F\u7528\u8BA2\u9605\u914D\u7F6E\uFF0C\u8FC7\u6EE4\u67E5\u8BE2\u51FA\u6765\u7684Notify</li><li>\u4F7F\u7528\u8FC7\u6EE4\u597D\u7684Notify\u4F5C\u4E3A\u5173\u8054\u65B0\u5EFAUserNotify</li></ol></li><li>subscribe(user, target, targetType, reason) <ol><li>\u901A\u8FC7reason\uFF0C\u67E5\u8BE2NotifyConfig\uFF0C\u83B7\u53D6\u5BF9\u5E94\u7684\u52A8\u4F5C\u7EC4:<code>actions</code></li><li>\u904D\u5386\u52A8\u4F5C\u7EC4\uFF0C\u6BCF\u4E00\u4E2A\u52A8\u4F5C\u65B0\u5EFA\u4E00\u5219Subscription\u8BB0\u5F55</li></ol></li><li>cancelSubscription(user, target ,targetType) <ol><li>\u5220\u9664<code>user</code>\u3001<code>target</code>\u3001<code>targetType</code>\u5BF9\u5E94\u7684\u4E00\u5219\u6216\u591A\u5219\u8BB0\u5F55</li></ol></li><li>getSubscriptionConfig(userID) <ol><li>\u67E5\u8BE2SubscriptionConfig\u8868\uFF0C\u83B7\u53D6\u7528\u6237\u7684\u8BA2\u9605\u914D\u7F6E</li></ol></li><li>updateSubscriptionConfig(userID) <ol><li>\u66F4\u65B0\u7528\u6237\u7684SubscriptionConfig\u8BB0\u5F55</li></ol></li><li>getUserNotify(userID) <ol><li>\u83B7\u53D6\u7528\u6237\u7684\u6D88\u606F\u5217\u8868</li></ol></li><li>read(user, notifyIDs) <ol><li>\u66F4\u65B0\u6307\u5B9A\u7684notify\uFF0C\u628AisRead\u5C5E\u6027\u8BBE\u7F6E\u4E3Atrue</li></ol></li></ul><h2 id="_3-\u5404\u573A\u666F\u53D1\u9001\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#_3-\u5404\u573A\u666F\u53D1\u9001\u903B\u8F91" aria-hidden="true">#</a> 3. \u5404\u573A\u666F\u53D1\u9001\u903B\u8F91</h2><h3 id="_3-1-\u63D0\u9192\u7684\u8BA2\u9605\u3001\u521B\u5EFA\u3001\u62C9\u53D6" tabindex="-1"><a class="header-anchor" href="#_3-1-\u63D0\u9192\u7684\u8BA2\u9605\u3001\u521B\u5EFA\u3001\u62C9\u53D6" aria-hidden="true">#</a> 3.1 \u63D0\u9192\u7684\u8BA2\u9605\u3001\u521B\u5EFA\u3001\u62C9\u53D6</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211103151303897.png" alt="image-20211103151303897"></p><ol><li>\u6211\u4EEC\u53EF\u4EE5\u5728\u4EA7\u54C1\u521B\u5EFA\u4E4B\u540E\uFF0C\u8C03\u7528<code>NotifyService.subscribe</code>\u65B9\u6CD5\uFF0C</li><li>\u7136\u540E\u5728\u4EA7\u54C1\u88AB\u8BC4\u8BBA\u4E4B\u540E\u8C03\u7528<code>NotifyService.createRemind</code>\u65B9\u6CD5\uFF0C</li><li>\u518D\u5C31\u662F\u7528\u6237\u767B\u5F55\u7CFB\u7EDF\u6216\u8005\u5176\u4ED6\u7684\u67D0\u4E00\u4E2A\u65F6\u523B\u8C03</li><li>\u7528<code>NotifyService.pullRemind</code>\u65B9\u6CD5\uFF0C \u6700\u540E\u5728\u7528\u6237\u67E5\u8BE2\u6D88\u606F\u961F\u5217\u7684\u65F6\u5019\u8C03\u7528<code>NotifyService.getUserNotify</code>\u65B9\u6CD5\u3002</li></ol><h3 id="_3-2-\u516C\u544A\u7684\u521B\u5EFA\u3001\u62C9\u53D6" tabindex="-1"><a class="header-anchor" href="#_3-2-\u516C\u544A\u7684\u521B\u5EFA\u3001\u62C9\u53D6" aria-hidden="true">#</a> 3.2 \u516C\u544A\u7684\u521B\u5EFA\u3001\u62C9\u53D6</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211103151351090.png" alt="image-20211103151351090"></p><ol><li>\u5728\u7BA1\u7406\u5458\u53D1\u9001\u4E86\u4E00\u5219\u516C\u544A\u7684\u65F6\u5019\uFF0C\u8C03\u7528<code>NotifyService.createAnnounce</code>\u65B9\u6CD5\uFF0C</li><li>\u7136\u540E\u5728\u7528\u6237\u767B\u5F55\u7CFB\u7EDF\u6216\u8005\u5176\u4ED6\u7684\u67D0\u4E00\u4E2A\u65F6\u523B\u8C03\u7528<code>NotifyService.pullAnnounce</code>\u65B9\u6CD5\uFF0C</li><li>\u6700\u540E\u5728\u7528\u6237\u67E5\u8BE2\u6D88\u606F\u961F\u5217\u7684\u65F6\u5019\u8C03\u7528<code>NotifyService.getUserNotify</code>\u65B9\u6CD5\u3002</li></ol><h3 id="_3-3-\u4FE1\u606F\u7684\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#_3-3-\u4FE1\u606F\u7684\u521B\u5EFA" aria-hidden="true">#</a> 3.3 \u4FE1\u606F\u7684\u521B\u5EFA</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211103151524274.png" alt="image-20211103151524274"></p><p>\u4FE1\u606F\u7684\u521B\u5EFA\uFF0C\u53EA\u9700\u8981\u76F4\u63A5\u8C03\u7528<code>NotifyService.createMessage</code>\u65B9\u6CD5\u5C31\u53EF\u4EE5\u4E86\uFF0C \u5728\u4E0B\u4E00\u6B21\u7528\u6237\u67E5\u8BE2\u6D88\u606F\u961F\u5217\u7684\u65F6\u5019\uFF0C\u5C31\u4F1A\u67E5\u8BE2\u8FD9\u6761\u4FE1\u606F\u3002</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 18);
const _hoisted_19 = {
  href: "https://www.jianshu.com/p/6bf8166b291c",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_20 = /* @__PURE__ */ createTextVNode("\u6D88\u606F\u7CFB\u7EDF\u8BBE\u8BA1\u4E0E\u5B9E\u73B0\u300C\u4E0B\u7BC7\u300D");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_19, [
        _hoisted_20,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var ______________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u6D88\u606F\u4E2D\u5FC3\u5404\u573A\u666F\u6D88\u606F\u53D1\u9001\u903B\u8F91.html.vue"]]);
export { ______________html as default };
