import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, d as createVNode, e as createStaticVNode, b as createTextVNode } from "./app.1937b20f.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="redis\u9AD8\u53EF\u7528-\u54E8\u5175\u673A\u5236-redis-sentinel-\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#redis\u9AD8\u53EF\u7528-\u54E8\u5175\u673A\u5236-redis-sentinel-\u8BE6\u89E3" aria-hidden="true">#</a> Redis\u9AD8\u53EF\u7528\uFF1A\u54E8\u5175\u673A\u5236\uFF08Redis Sentinel\uFF09\u8BE6\u89E3</h1><blockquote><p>\u5728\u4E0A\u6587\u4E3B\u4ECE\u590D\u5236\u7684\u57FA\u7840\u4E0A\uFF0C\u5982\u679C\u4E3B\u8282\u70B9\u51FA\u73B0\u6545\u969C\u8BE5\u600E\u4E48\u529E\u5462\uFF1F \u5728 Redis \u4E3B\u4ECE\u96C6\u7FA4\u4E2D\uFF0C\u54E8\u5175\u673A\u5236\u662F\u5B9E\u73B0\u4E3B\u4ECE\u5E93\u81EA\u52A8\u5207\u6362\u7684\u5173\u952E\u673A\u5236\uFF0C\u5B83\u6709\u6548\u5730\u89E3\u51B3\u4E86\u4E3B\u4ECE\u590D\u5236\u6A21\u5F0F\u4E0B\u6545\u969C\u8F6C\u79FB\u7684\u95EE\u9898\u3002</p></blockquote><h2 id="_1-\u54E8\u5175\u673A\u5236-redis-sentinel" tabindex="-1"><a class="header-anchor" href="#_1-\u54E8\u5175\u673A\u5236-redis-sentinel" aria-hidden="true">#</a> 1. \u54E8\u5175\u673A\u5236\uFF08Redis Sentinel\uFF09</h2><blockquote><p>Redis Sentinel\uFF0C\u5373Redis\u54E8\u5175\uFF0C\u5728Redis 2.8\u7248\u672C\u5F00\u59CB\u5F15\u5165\u3002\u54E8\u5175\u7684\u6838\u5FC3\u529F\u80FD\u662F\u4E3B\u8282\u70B9\u7684\u81EA\u52A8\u6545\u969C\u8F6C\u79FB\u3002</p></blockquote><p>\u4E0B\u56FE\u662F\u4E00\u4E2A\u5178\u578B\u7684\u54E8\u5175\u96C6\u7FA4\u76D1\u63A7\u7684\u903B\u8F91\u56FE\uFF1A</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626115009263.png" alt="image-20220626115009263" style="zoom:50%;"><p>\u54E8\u5175\u5B9E\u73B0\u4E86\u4EC0\u4E48\u529F\u80FD\u5462\uFF1F\u4E0B\u9762\u662FRedis\u5B98\u65B9\u6587\u6863\u7684\u63CF\u8FF0\uFF1A</p><ul><li><strong>\u76D1\u63A7\uFF08Monitoring\uFF09</strong>\uFF1A\u54E8\u5175\u4F1A\u4E0D\u65AD\u5730\u68C0\u67E5\u4E3B\u8282\u70B9\u548C\u4ECE\u8282\u70B9\u662F\u5426\u8FD0\u4F5C\u6B63\u5E38\u3002</li><li><strong>\u81EA\u52A8\u6545\u969C\u8F6C\u79FB\uFF08Automatic failover\uFF09</strong>\uFF1A\u5F53\u4E3B\u8282\u70B9\u4E0D\u80FD\u6B63\u5E38\u5DE5\u4F5C\u65F6\uFF0C\u54E8\u5175\u4F1A\u5F00\u59CB\u81EA\u52A8\u6545\u969C\u8F6C\u79FB\u64CD\u4F5C\uFF0C\u5B83\u4F1A\u5C06\u5931\u6548\u4E3B\u8282\u70B9\u7684\u5176\u4E2D\u4E00\u4E2A\u4ECE\u8282\u70B9\u5347\u7EA7\u4E3A\u65B0\u7684\u4E3B\u8282\u70B9\uFF0C\u5E76\u8BA9\u5176\u4ED6\u4ECE\u8282\u70B9\u6539\u4E3A\u590D\u5236\u65B0\u7684\u4E3B\u8282\u70B9\u3002</li><li><strong>\u914D\u7F6E\u63D0\u4F9B\u8005\uFF08Configuration provider\uFF09</strong>\uFF1A\u5BA2\u6237\u7AEF\u5728\u521D\u59CB\u5316\u65F6\uFF0C\u901A\u8FC7\u8FDE\u63A5\u54E8\u5175\u6765\u83B7\u5F97\u5F53\u524DRedis\u670D\u52A1\u7684\u4E3B\u8282\u70B9\u5730\u5740\u3002</li><li><strong>\u901A\u77E5\uFF08Notification\uFF09</strong>\uFF1A\u54E8\u5175\u53EF\u4EE5\u5C06\u6545\u969C\u8F6C\u79FB\u7684\u7ED3\u679C\u53D1\u9001\u7ED9\u5BA2\u6237\u7AEF\u3002</li></ul><p>\u5176\u4E2D\uFF0C\u76D1\u63A7\u548C\u81EA\u52A8\u6545\u969C\u8F6C\u79FB\u529F\u80FD\uFF0C\u4F7F\u5F97\u54E8\u5175\u53EF\u4EE5\u53CA\u65F6\u53D1\u73B0\u4E3B\u8282\u70B9\u6545\u969C\u5E76\u5B8C\u6210\u8F6C\u79FB\uFF1B\u800C\u914D\u7F6E\u63D0\u4F9B\u8005\u548C\u901A\u77E5\u529F\u80FD\uFF0C\u5219\u9700\u8981\u5728\u4E0E\u5BA2\u6237\u7AEF\u7684\u4EA4\u4E92\u4E2D\u624D\u80FD\u4F53\u73B0\u3002</p><h3 id="_1-1-\u54E8\u5175\u96C6\u7FA4\u7684\u7EC4\u5EFA" tabindex="-1"><a class="header-anchor" href="#_1-1-\u54E8\u5175\u96C6\u7FA4\u7684\u7EC4\u5EFA" aria-hidden="true">#</a> 1.1 \u54E8\u5175\u96C6\u7FA4\u7684\u7EC4\u5EFA</h3><blockquote><p>\u4E0A\u56FE\u4E2D\u54E8\u5175\u96C6\u7FA4\u662F\u5982\u4F55\u7EC4\u4EF6\u7684\u5462\uFF1F\u54E8\u5175\u5B9E\u4F8B\u4E4B\u95F4\u53EF\u4EE5\u76F8\u4E92\u53D1\u73B0\uFF0C\u8981\u5F52\u529F\u4E8E Redis \u63D0\u4F9B\u7684 pub/sub \u673A\u5236\uFF0C\u4E5F\u5C31\u662F\u53D1\u5E03 / \u8BA2\u9605\u673A\u5236\u3002</p></blockquote><p>\u5728\u4E3B\u4ECE\u96C6\u7FA4\u4E2D\uFF0C\u4E3B\u5E93\u4E0A\u6709\u4E00\u4E2A\u540D\u4E3A<code>__sentinel__:hello</code>\u7684\u9891\u9053\uFF0C\u4E0D\u540C\u54E8\u5175\u5C31\u662F\u901A\u8FC7\u5B83\u6765\u76F8\u4E92\u53D1\u73B0\uFF0C\u5B9E\u73B0\u4E92\u76F8\u901A\u4FE1\u7684\u3002\u5728\u4E0B\u56FE\u4E2D\uFF0C\u54E8\u5175 1 \u628A\u81EA\u5DF1\u7684 IP\uFF08172.16.19.3\uFF09\u548C\u7AEF\u53E3\uFF0826579\uFF09\u53D1\u5E03\u5230<code>__sentinel__:hello</code>\u9891\u9053\u4E0A\uFF0C\u54E8\u5175 2 \u548C 3 \u8BA2\u9605\u4E86\u8BE5\u9891\u9053\u3002\u90A3\u4E48\u6B64\u65F6\uFF0C\u54E8\u5175 2 \u548C 3 \u5C31\u53EF\u4EE5\u4ECE\u8FD9\u4E2A\u9891\u9053\u76F4\u63A5\u83B7\u53D6\u54E8\u5175 1 \u7684 IP \u5730\u5740\u548C\u7AEF\u53E3\u53F7\u3002\u7136\u540E\uFF0C\u54E8\u5175 2\u30013 \u53EF\u4EE5\u548C\u54E8\u5175 1 \u5EFA\u7ACB\u7F51\u7EDC\u8FDE\u63A5\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626165153435.png" alt="image-20220626165153435"></p><p>\u901A\u8FC7\u8FD9\u4E2A\u65B9\u5F0F\uFF0C\u54E8\u5175 2 \u548C 3 \u4E5F\u53EF\u4EE5\u5EFA\u7ACB\u7F51\u7EDC\u8FDE\u63A5\uFF0C\u8FD9\u6837\u4E00\u6765\uFF0C\u54E8\u5175\u96C6\u7FA4\u5C31\u5F62\u6210\u4E86\u3002\u5B83\u4EEC\u76F8\u4E92\u95F4\u53EF\u4EE5\u901A\u8FC7\u7F51\u7EDC\u8FDE\u63A5\u8FDB\u884C\u901A\u4FE1\uFF0C\u6BD4\u5982\u8BF4\u5BF9\u4E3B\u5E93\u6709\u6CA1\u6709\u4E0B\u7EBF\u8FD9\u4EF6\u4E8B\u513F\u8FDB\u884C\u5224\u65AD\u548C\u534F\u5546\u3002</p><h3 id="_1-2-\u54E8\u5175\u76D1\u63A7redis\u5E93" tabindex="-1"><a class="header-anchor" href="#_1-2-\u54E8\u5175\u76D1\u63A7redis\u5E93" aria-hidden="true">#</a> 1.2 \u54E8\u5175\u76D1\u63A7Redis\u5E93</h3><blockquote><p>\u54E8\u5175\u76D1\u63A7\u4EC0\u4E48\u5462\uFF1F\u600E\u4E48\u76D1\u63A7\u5462\uFF1F</p></blockquote><p>\u8FD9\u662F\u7531\u54E8\u5175\u5411\u4E3B\u5E93\u53D1\u9001 INFO \u547D\u4EE4\u6765\u5B8C\u6210\u7684\u3002\u5C31\u50CF\u4E0B\u56FE\u6240\u793A\uFF0C</p><ol><li>\u54E8\u5175 2 \u7ED9\u4E3B\u5E93\u53D1\u9001 INFO \u547D\u4EE4\uFF0C</li><li>\u4E3B\u5E93\u63A5\u53D7\u5230\u8FD9\u4E2A\u547D\u4EE4\u540E\uFF0C\u5C31\u4F1A\u628A\u4ECE\u5E93\u5217\u8868\u8FD4\u56DE\u7ED9\u54E8\u5175\u3002</li><li>\u63A5\u7740\uFF0C\u54E8\u5175\u5C31\u53EF\u4EE5\u6839\u636E\u4ECE\u5E93\u5217\u8868\u4E2D\u7684\u8FDE\u63A5\u4FE1\u606F\uFF0C\u548C\u6BCF\u4E2A\u4ECE\u5E93\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u5E76\u5728\u8FD9\u4E2A\u8FDE\u63A5\u4E0A\u6301\u7EED\u5730\u5BF9\u4ECE\u5E93\u8FDB\u884C\u76D1\u63A7\u3002</li><li>\u54E8\u5175 1 \u548C 3 \u53EF\u4EE5\u901A\u8FC7\u76F8\u540C\u7684\u65B9\u6CD5\u548C\u4ECE\u5E93\u5EFA\u7ACB\u8FDE\u63A5\u3002</li></ol><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626165412577.png" alt="image-20220626165412577"></p><h3 id="_1-3-\u4E3B\u5E93\u4E0B\u7EBF\u7684\u5224\u5B9A" tabindex="-1"><a class="header-anchor" href="#_1-3-\u4E3B\u5E93\u4E0B\u7EBF\u7684\u5224\u5B9A" aria-hidden="true">#</a> 1.3 \u4E3B\u5E93\u4E0B\u7EBF\u7684\u5224\u5B9A</h3><blockquote><p>\u54E8\u5175\u5982\u4F55\u5224\u65AD\u4E3B\u5E93\u5DF2\u7ECF\u4E0B\u7EBF\u4E86\u5462\uFF1F</p></blockquote><p>\u9996\u5148\u8981\u7406\u89E3\u4E24\u4E2A\u6982\u5FF5\uFF1A<strong>\u4E3B\u89C2\u4E0B\u7EBF</strong>\u548C<strong>\u5BA2\u89C2\u4E0B\u7EBF</strong></p><ul><li><strong>\u4E3B\u89C2\u4E0B\u7EBF</strong>\uFF1A\u4EFB\u4F55\u4E00\u4E2A\u54E8\u5175\u90FD\u662F\u53EF\u4EE5\u76D1\u63A7\u63A2\u6D4B\uFF0C\u5E76\u4F5C\u51FARedis\u8282\u70B9\u4E0B\u7EBF\u7684\u5224\u65AD\uFF1B</li><li><strong>\u5BA2\u89C2\u4E0B\u7EBF</strong>\uFF1A\u7531\u54E8\u5175\u96C6\u7FA4\u5171\u540C\u51B3\u5B9ARedis\u8282\u70B9\u662F\u5426\u4E0B\u7EBF\uFF1B</li></ul><p>\u5F53\u67D0\u4E2A\u54E8\u5175\uFF08\u5982\u4E0B\u56FE\u4E2D\u7684\u54E8\u51752\uFF09\u5224\u65AD\u4E3B\u5E93\u201C\u4E3B\u89C2\u4E0B\u7EBF\u201D\u540E\uFF0C\u5C31\u4F1A\u7ED9\u5176\u4ED6\u54E8\u5175\u53D1\u9001 <code>is-master-down-by-addr</code> \u547D\u4EE4\u3002\u63A5\u7740\uFF0C\u5176\u4ED6\u54E8\u5175\u4F1A\u6839\u636E\u81EA\u5DF1\u548C\u4E3B\u5E93\u7684\u8FDE\u63A5\u60C5\u51B5\uFF0C\u505A\u51FA Y \u6216 N \u7684\u54CD\u5E94\uFF0CY \u76F8\u5F53\u4E8E\u8D5E\u6210\u7968\uFF0CN \u76F8\u5F53\u4E8E\u53CD\u5BF9\u7968\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626165610587.png" alt="image-20220626165610587"></p><p>\u5982\u679C\u8D5E\u6210\u7968\u6570\uFF08\u8FD9\u91CC\u662F2\uFF09\u662F\u5927\u4E8E\u7B49\u4E8E\u54E8\u5175\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684 <code>quorum</code> \u914D\u7F6E\u9879\uFF08\u6BD4\u5982\u8FD9\u91CC\u5982\u679C\u662Fquorum=2\uFF09, \u5219\u53EF\u4EE5\u5224\u5B9A<strong>\u4E3B\u5E93\u5BA2\u89C2\u4E0B\u7EBF</strong>\u4E86\u3002</p><h3 id="_1-4-\u54E8\u5175\u96C6\u7FA4\u7684\u9009\u4E3E" tabindex="-1"><a class="header-anchor" href="#_1-4-\u54E8\u5175\u96C6\u7FA4\u7684\u9009\u4E3E" aria-hidden="true">#</a> 1.4 \u54E8\u5175\u96C6\u7FA4\u7684\u9009\u4E3E</h3><blockquote><p>\u5224\u65AD\u5B8C\u4E3B\u5E93\u4E0B\u7EBF\u540E\uFF0C\u7531\u54EA\u4E2A\u54E8\u5175\u8282\u70B9\u6765\u6267\u884C\u4E3B\u4ECE\u5207\u6362\u5462\uFF1F\u8FD9\u91CC\u5C31\u9700\u8981\u54E8\u5175\u96C6\u7FA4\u7684\u9009\u4E3E\u673A\u5236\u4E86\u3002</p></blockquote><ul><li><strong>\u4E3A\u4EC0\u4E48\u5FC5\u7136\u4F1A\u51FA\u73B0\u9009\u4E3E/\u5171\u8BC6\u673A\u5236</strong>\uFF1F</li></ul><p>\u4E3A\u4E86\u907F\u514D\u54E8\u5175\u7684\u5355\u70B9\u60C5\u51B5\u53D1\u751F\uFF0C\u6240\u4EE5\u9700\u8981\u4E00\u4E2A\u54E8\u5175\u7684\u5206\u5E03\u5F0F\u96C6\u7FA4\u3002\u4F5C\u4E3A\u5206\u5E03\u5F0F\u96C6\u7FA4\uFF0C\u5FC5\u7136\u6D89\u53CA\u5171\u8BC6\u95EE\u9898\uFF08\u5373\u9009\u4E3E\u95EE\u9898\uFF09\uFF1B\u540C\u65F6\u6545\u969C\u7684\u8F6C\u79FB\u548C\u901A\u77E5\u90FD\u53EA\u9700\u8981\u4E00\u4E2A\u4E3B\u7684\u54E8\u5175\u8282\u70B9\u5C31\u53EF\u4EE5\u4E86\u3002</p><ul><li><strong>\u54E8\u5175\u7684\u9009\u4E3E\u673A\u5236\u662F\u4EC0\u4E48\u6837\u7684</strong>\uFF1F</li></ul><p>\u54E8\u5175\u7684\u9009\u4E3E\u673A\u5236\u5176\u5B9E\u5F88\u7B80\u5355\uFF0C\u5C31\u662F\u4E00\u4E2ARaft\u9009\u4E3E\u7B97\u6CD5\uFF1A <strong>\u9009\u4E3E\u7684\u7968\u6570\u5927\u4E8E\u7B49\u4E8Enum(sentinels)/2+1\u65F6\uFF0C\u5C06\u6210\u4E3A\u9886\u5BFC\u8005\uFF0C\u5982\u679C\u6CA1\u6709\u8D85\u8FC7\uFF0C\u7EE7\u7EED\u9009\u4E3E</strong></p>', 32);
const _hoisted_33 = /* @__PURE__ */ createTextVNode("Raft\u7B97\u6CD5\u4F60\u53EF\u4EE5\u53C2\u770B\u8FD9\u7BC7\u6587\u7AE0");
const _hoisted_34 = {
  href: "https://java.isture.com/algorithm/domain/distributed/%E5%88%86%E5%B8%83%E5%BC%8F%E7%AE%97%E6%B3%95-Raft%E7%AE%97%E6%B3%95.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_35 = /* @__PURE__ */ createTextVNode("\u5206\u5E03\u5F0F\u7B97\u6CD5 - Raft\u7B97\u6CD5");
const _hoisted_36 = /* @__PURE__ */ createStaticVNode('<ul><li>\u4EFB\u4F55\u4E00\u4E2A\u60F3\u6210\u4E3A Leader \u7684\u54E8\u5175\uFF0C\u8981\u6EE1\u8DB3\u4E24\u4E2A\u6761\u4EF6 <ul><li>\u7B2C\u4E00\uFF0C\u62FF\u5230\u534A\u6570\u4EE5\u4E0A\u7684\u8D5E\u6210\u7968\uFF1B</li><li>\u7B2C\u4E8C\uFF0C\u62FF\u5230\u7684\u7968\u6570\u540C\u65F6\u8FD8\u9700\u8981\u5927\u4E8E\u7B49\u4E8E\u54E8\u5175\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684 quorum \u503C\u3002</li></ul></li></ul><p>\u4EE5 3 \u4E2A\u54E8\u5175\u4E3A\u4F8B\uFF0C\u5047\u8BBE\u6B64\u65F6\u7684 quorum \u8BBE\u7F6E\u4E3A 2\uFF0C\u90A3\u4E48\uFF0C\u4EFB\u4F55\u4E00\u4E2A\u60F3\u6210\u4E3A Leader \u7684\u54E8\u5175\u53EA\u8981\u62FF\u5230 2 \u5F20\u8D5E\u6210\u7968\uFF0C\u5C31\u53EF\u4EE5\u4E86\u3002</p><blockquote><p>\u66F4\u8FDB\u4E00\u6B65\u7406\u89E3</p><p>\u8FD9\u91CC\u5F88\u591A\u4EBA\u4F1A\u641E\u6DF7 <strong>\u5224\u5B9A\u5BA2\u89C2\u4E0B\u7EBF</strong> \u548C <strong>\u662F\u5426\u80FD\u591F\u4E3B\u4ECE\u5207\u6362\uFF08\u7528\u5230\u9009\u4E3E\u673A\u5236\uFF09</strong> \u4E24\u4E2A\u6982\u5FF5\uFF0C\u6211\u4EEC\u518D\u770B\u4E00\u4E2A\u4F8B\u5B50\u3002</p><p>Redis 1\u4E3B4\u4ECE\uFF0C5\u4E2A\u54E8\u5175\uFF0C\u54E8\u5175\u914D\u7F6Equorum\u4E3A2\uFF0C\u5982\u679C3\u4E2A\u54E8\u5175\u6545\u969C\uFF0C\u5F53\u4E3B\u5E93\u5B95\u673A\u65F6\uFF0C\u54E8\u5175\u80FD\u5426\u5224\u65AD\u4E3B\u5E93\u201C\u5BA2\u89C2\u4E0B\u7EBF\u201D\uFF1F\u80FD\u5426\u81EA\u52A8\u5207\u6362\uFF1F</p></blockquote><p>\u7ECF\u8FC7\u5B9E\u9645\u6D4B\u8BD5\uFF1A</p><ol><li><p>\u54E8\u5175\u96C6\u7FA4\u53EF\u4EE5\u5224\u5B9A\u4E3B\u5E93\u201C\u4E3B\u89C2\u4E0B\u7EBF\u201D\u3002\u7531\u4E8Equorum=2\uFF0C\u6240\u4EE5\u5F53\u4E00\u4E2A\u54E8\u5175\u5224\u65AD\u4E3B\u5E93\u201C\u4E3B\u89C2\u4E0B\u7EBF\u201D\u540E\uFF0C\u8BE2\u95EE\u53E6\u5916\u4E00\u4E2A\u54E8\u5175\u540E\u4E5F\u4F1A\u5F97\u5230\u540C\u6837\u7684\u7ED3\u679C\uFF0C2\u4E2A\u54E8\u5175\u90FD\u5224\u5B9A\u201C\u4E3B\u89C2\u4E0B\u7EBF\u201D\uFF0C\u8FBE\u5230\u4E86quorum\u7684\u503C\uFF0C\u56E0\u6B64\uFF0C<strong>\u54E8\u5175\u96C6\u7FA4\u53EF\u4EE5\u5224\u5B9A\u4E3B\u5E93\u4E3A\u201C\u5BA2\u89C2\u4E0B\u7EBF\u201D</strong>\u3002</p></li><li><p><strong>\u4F46\u54E8\u5175\u4E0D\u80FD\u5B8C\u6210\u4E3B\u4ECE\u5207\u6362</strong>\u3002\u54E8\u5175\u6807\u8BB0\u4E3B\u5E93\u201C\u5BA2\u89C2\u4E0B\u7EBF\u540E\u201D\uFF0C\u5728\u9009\u4E3E\u201C\u54E8\u5175\u9886\u5BFC\u8005\u201D\u65F6\uFF0C\u4E00\u4E2A\u54E8\u5175\u5FC5\u987B\u62FF\u5230\u8D85\u8FC7\u591A\u6570\u7684\u9009\u7968(5/2+1=3\u7968)\u3002\u4F46\u76EE\u524D\u53EA\u67092\u4E2A\u54E8\u5175\u6D3B\u7740\uFF0C\u65E0\u8BBA\u600E\u4E48\u6295\u7968\uFF0C\u4E00\u4E2A\u54E8\u5175\u6700\u591A\u53EA\u80FD\u62FF\u52302\u7968\uFF0C\u6C38\u8FDC\u65E0\u6CD5\u8FBE\u5230<code>N/2+1</code>\u9009\u7968\u7684\u7ED3\u679C\u3002</p></li></ol><h3 id="_1-5-\u65B0\u4E3B\u5E93\u7684\u9009\u51FA" tabindex="-1"><a class="header-anchor" href="#_1-5-\u65B0\u4E3B\u5E93\u7684\u9009\u51FA" aria-hidden="true">#</a> 1.5 \u65B0\u4E3B\u5E93\u7684\u9009\u51FA</h3><blockquote><p>\u4E3B\u5E93\u65E2\u7136\u5224\u5B9A\u5BA2\u89C2\u4E0B\u7EBF\u4E86\uFF0C\u90A3\u4E48\u5982\u4F55\u4ECE\u5269\u4F59\u7684\u4ECE\u5E93\u4E2D\u9009\u62E9\u4E00\u4E2A\u65B0\u7684\u4E3B\u5E93\u5462\uFF1F</p></blockquote><ul><li>\u8FC7\u6EE4\u6389\u4E0D\u5065\u5EB7\u7684\uFF08\u4E0B\u7EBF\u6216\u65AD\u7EBF\uFF09\uFF0C\u6CA1\u6709\u56DE\u590D\u8FC7\u54E8\u5175ping\u54CD\u5E94\u7684\u4ECE\u8282\u70B9</li><li>\u9009\u62E9<code>salve-priority</code>\u4ECE\u8282\u70B9\u4F18\u5148\u7EA7\u6700\u9AD8\uFF08redis.conf\uFF09\u7684</li><li>\u9009\u62E9\u590D\u5236\u504F\u79FB\u91CF\u6700\u5927\uFF0C\u53EA\u590D\u5236\u6700\u5B8C\u6574\u7684\u4ECE\u8282\u70B9</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626170308459.png" alt="image-20220626170308459"></p><h3 id="_1-6-\u6545\u969C\u7684\u8F6C\u79FB" tabindex="-1"><a class="header-anchor" href="#_1-6-\u6545\u969C\u7684\u8F6C\u79FB" aria-hidden="true">#</a> 1.6 \u6545\u969C\u7684\u8F6C\u79FB</h3><blockquote><p>\u65B0\u7684\u4E3B\u5E93\u9009\u62E9\u51FA\u6765\u540E\uFF0C\u5C31\u53EF\u4EE5\u5F00\u59CB\u8FDB\u884C\u6545\u969C\u7684\u8F6C\u79FB\u4E86\u3002</p></blockquote><p>\u5047\u8BBE\u6839\u636E\u6211\u4EEC\u4E00\u5F00\u59CB\u7684\u56FE\uFF1A\uFF08\u6211\u4EEC\u5047\u8BBE\uFF1A\u5224\u65AD\u4E3B\u5E93\u5BA2\u89C2\u4E0B\u7EBF\u4E86\uFF0C\u540C\u65F6\u9009\u51FA<code>sentinel 3</code>\u662F\u54E8\u5175leader\uFF09</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626170353598.png" alt="image-20220626170353598" style="zoom:50%;"><p><strong>\u6545\u969C\u8F6C\u79FB\u6D41\u7A0B\u5982\u4E0B</strong>\uFF1A</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626170425155.png" alt="image-20220626170425155" style="zoom:50%;"><ol><li><p>\u5C06slave-1\u8131\u79BB\u539F\u4ECE\u8282\u70B9\uFF08PS: 5.0 \u4E2D\u5E94\u8BE5\u662F<code>replicaof no one</code>)\uFF0C\u5347\u7EA7\u4E3B\u8282\u70B9\uFF0C</p></li><li><p>\u5C06\u4ECE\u8282\u70B9slave-2\u6307\u5411\u65B0\u7684\u4E3B\u8282\u70B9</p></li><li><p>\u901A\u77E5\u5BA2\u6237\u7AEF\u4E3B\u8282\u70B9\u5DF2\u66F4\u6362</p></li><li><p>\u5C06\u539F\u4E3B\u8282\u70B9\uFF08oldMaster\uFF09\u53D8\u6210\u4ECE\u8282\u70B9\uFF0C\u6307\u5411\u65B0\u7684\u4E3B\u8282\u70B9</p></li></ol><p><strong>\u8F6C\u79FB\u4E4B\u540E</strong></p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220626170621171.png" alt="image-20220626170621171"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 19);
const _hoisted_55 = {
  href: "https://pdai.tech/md/db/nosql-redis/db-redis-x-sentinel.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_56 = /* @__PURE__ */ createTextVNode("Redis\u8FDB\u9636 - \u9AD8\u53EF\u7528\uFF1A\u54E8\u5175\u673A\u5236\uFF08Redis Sentinel\uFF09\u8BE6\u89E3");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_33,
      createBaseVNode("a", _hoisted_34, [
        _hoisted_35,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_36,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_55, [
        _hoisted_56,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Redis__________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Redis\u9AD8\u53EF\u7528\u54E8\u5175\u673A\u5236\u8BE6\u89E3.html.vue"]]);
export { Redis__________html as default };
