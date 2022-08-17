import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.67269af0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="docker\u5B89\u88C5mongodb" tabindex="-1"><a class="header-anchor" href="#docker\u5B89\u88C5mongodb" aria-hidden="true">#</a> Docker\u5B89\u88C5MongoDB</h1><h2 id="_1-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5" aria-hidden="true">#</a> 1. \u5B89\u88C5</h2><h3 id="_1-1-\u67E5\u770B\u53EF\u7528\u7684mongodb\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#_1-1-\u67E5\u770B\u53EF\u7528\u7684mongodb\u7248\u672C" aria-hidden="true">#</a> 1.1 \u67E5\u770B\u53EF\u7528\u7684mongoDB\u7248\u672C</h3><p>\u8BBF\u95EE MongoDB \u955C\u50CF\u5E93\u5730\u5740\uFF1A https://hub.docker.com/_/mongo?tab=tags&amp;page=1\u3002</p><p>\u53EF\u4EE5\u901A\u8FC7 Sort by \u67E5\u770B\u5176\u4ED6\u7248\u672C\u7684 MongoDB\uFF0C\u9ED8\u8BA4\u662F\u6700\u65B0\u7248\u672C <strong>mongo:latest</strong>\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200802220904622.png" alt="image-20200802220904622"></p><h2 id="_1-2-\u4E0B\u8F7Dmongodb" tabindex="-1"><a class="header-anchor" href="#_1-2-\u4E0B\u8F7Dmongodb" aria-hidden="true">#</a> 1.2 \u4E0B\u8F7DmongoDB</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker pull mongo\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200802221102680.png" alt="image-20200802221102680"></p><h3 id="_1-3-\u67E5\u770B\u672C\u5730\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#_1-3-\u67E5\u770B\u672C\u5730\u955C\u50CF" aria-hidden="true">#</a> 1.3 \u67E5\u770B\u672C\u5730\u955C\u50CF</h3><p>\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u6765\u67E5\u770B\u662F\u5426\u5DF2\u7ECF\u5B89\u88C5mongo</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200802221215062.png" alt="image-20200802221215062"></p><p>\u5728\u4E0A\u56FE\u4E2D\u53EF\u4EE5\u770B\u5230\u6211\u4EEC\u5DF2\u7ECF\u5B89\u88C5\u4E86\u6700\u65B0\u7248\u672C\uFF08latest\uFF09\u7684 mongo \u955C\u50CF\u3002</p><h3 id="_1-4-\u8FD0\u884C\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#_1-4-\u8FD0\u884C\u5BB9\u5668" aria-hidden="true">#</a> 1.4 \u8FD0\u884C\u5BB9\u5668</h3><p>\u5B89\u88C5\u5B8C\u6210\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u6765\u8FD0\u884Cmongo\u5BB9\u5668</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// --auth \u9700\u8981\u8BA4\u8BC1\uFF0C\u5982\u4E0D\u9700\u8981\u53EF\u53BB\u9664\ndocker run -itd --name mongo -p 27017:27017 mongo --auth\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200802221327304.png" alt="image-20200802221327304"></p><p>\u53C2\u6570\u8BF4\u660E</p><ul><li>-p 27017:27017** \uFF1A\u6620\u5C04\u5BB9\u5668\u670D\u52A1\u7684 27017 \u7AEF\u53E3\u5230\u5BBF\u4E3B\u673A\u7684 27017 \u7AEF\u53E3\u3002\u5916\u90E8\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 \u5BBF\u4E3B\u673A ip:27017 \u8BBF\u95EE\u5230 mongo \u7684\u670D\u52A1\u3002</li><li><strong>--auth</strong>\uFF1A\u9700\u8981\u5BC6\u7801\u624D\u80FD\u8BBF\u95EE\u5BB9\u5668\u670D\u52A1\u3002</li></ul><h3 id="_1-5-\u5B89\u88C5\u6210\u529F" tabindex="-1"><a class="header-anchor" href="#_1-5-\u5B89\u88C5\u6210\u529F" aria-hidden="true">#</a> 1.5 \u5B89\u88C5\u6210\u529F</h3><p>\u6700\u540E\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 <strong>docker ps</strong> \u547D\u4EE4\u67E5\u770B\u5BB9\u5668\u7684\u8FD0\u884C\u4FE1\u606F\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200802221448015.png" alt="image-20200802221448015"></p><h2 id="_2-\u76F8\u5173\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-\u76F8\u5173\u8BBE\u7F6E" aria-hidden="true">#</a> 2. \u76F8\u5173\u8BBE\u7F6E</h2><h3 id="_2-1-\u6DFB\u52A0\u7528\u6237\u548C\u8BBE\u7F6E\u5BC6\u7801\u3002\u5E76\u4E14\u5C1D\u8BD5\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#_2-1-\u6DFB\u52A0\u7528\u6237\u548C\u8BBE\u7F6E\u5BC6\u7801\u3002\u5E76\u4E14\u5C1D\u8BD5\u8FDE\u63A5" aria-hidden="true">#</a> 2.1 \u6DFB\u52A0\u7528\u6237\u548C\u8BBE\u7F6E\u5BC6\u7801\u3002\u5E76\u4E14\u5C1D\u8BD5\u8FDE\u63A5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker exec -it mongo mongo admin\n# \u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A admin\uFF0C\u5BC6\u7801\u4E3A 123456 \u7684\u7528\u6237\u3002\n&gt;  db.createUser({ user:&#39;admin&#39;,pwd:&#39;123456&#39;,roles:[ { role:&#39;userAdminAnyDatabase&#39;, db: &#39;admin&#39;}]});\n# \u5C1D\u8BD5\u4F7F\u7528\u4E0A\u9762\u521B\u5EFA\u7684\u7528\u6237\u4FE1\u606F\u8FDB\u884C\u8FDE\u63A5\u3002\n&gt; db.auth(&#39;admin&#39;, &#39;123456&#39;)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200802221707076.png" alt="image-20200802221707076"></p>', 26);
const _hoisted_27 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_27);
}
var Docker__MongoDB_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Docker\u5B89\u88C5MongoDB.html.vue"]]);
export { Docker__MongoDB_html as default };
