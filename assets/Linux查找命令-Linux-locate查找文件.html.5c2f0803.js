import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.67269af0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="linux-locate\u67E5\u627E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#linux-locate\u67E5\u627E\u6587\u4EF6" aria-hidden="true">#</a> Linux-locate\u67E5\u627E\u6587\u4EF6</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1 \u7B80\u4ECB</h2><p>locate\u547D\u4EE4\u5176\u5B9E\u662F\u201Cfind -name\u201D\u7684\u53E6\u4E00\u79CD\u5199\u6CD5\uFF0C\u4F46\u662F\u8981\u6BD4\u540E\u8005\u5FEB\u5F97\u591A\uFF0C\u539F\u56E0\u5728\u4E8E\u5B83\u4E0D\u641C\u7D22\u5177\u4F53\u76EE\u5F55\uFF0C<strong>\u800C\u662F\u641C\u7D22\u4E00\u4E2A\u6570\u636E\u5E93\uFF08/var/lib/locatedb\uFF09\uFF0C\u8FD9\u4E2A\u6570\u636E\u5E93\u4E2D\u542B\u6709\u672C\u5730\u6240\u6709\u6587\u4EF6\u4FE1\u606F</strong>\u3002Linux\u7CFB\u7EDF\u81EA\u52A8\u521B\u5EFA\u8FD9\u4E2A\u6570\u636E\u5E93\uFF0C\u5E76\u4E14<strong>\u6BCF\u5929\u81EA\u52A8\u66F4\u65B0\u4E00\u6B21</strong>\uFF0C\u6240\u4EE5\u4F7F\u7528locate\u547D\u4EE4\u67E5\u4E0D\u5230\u6700\u65B0\u53D8\u52A8\u8FC7\u7684\u6587\u4EF6\u3002\u4E3A\u4E86\u907F\u514D\u8FD9\u79CD\u60C5\u51B5\uFF0C\u53EF\u4EE5\u5728\u4F7F\u7528locate\u4E4B\u524D\uFF0C\u5148\u4F7F\u7528updatedb\u547D\u4EE4\uFF0C\u624B\u52A8\u66F4\u65B0\u6570\u636E\u5E93\u3002</p><h2 id="_2-\u547D\u4EE4\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-\u547D\u4EE4\u8BED\u6CD5" aria-hidden="true">#</a> 2 \u547D\u4EE4\u8BED\u6CD5</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">locate</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span>\u2026 <span class="token punctuation">[</span>PATTERN<span class="token punctuation">]</span>\u2026\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-\u547D\u4EE4\u53C2\u6570-\u7528\u5F97\u4E0D\u591A" tabindex="-1"><a class="header-anchor" href="#_3-\u547D\u4EE4\u53C2\u6570-\u7528\u5F97\u4E0D\u591A" aria-hidden="true">#</a> 3 \u547D\u4EE4\u53C2\u6570\uFF08\u7528\u5F97\u4E0D\u591A\uFF09</h2><p>\u5728mlocate\u6570\u636E\u5E93\u4E2D\u641C\u7D22\u6761\u76EE.</p><ul><li>-A, --all \u53EA\u663E\u793A\u5339\u914D\u6240\u6709\u6A21\u5F0F\u7684\u6761\u76EE</li><li>-b, --basename \u5339\u914D\u552F\u4E00\u7684\u8DEF\u5F84\u540D\u79F0\u7684\u57FA\u672C\u6587\u4EF6\u540D</li><li>-c, --count \u53EA\u663E\u793A\u627E\u5230\u6761\u76EE\u7684\u53F7\u7801</li><li>-d, --database DBPATH \u7528 DBPATH \u66FF\u4EE3\u9ED8\u8BA4\u7684\u6570\u636E\u5E93(/var/lib/mlocate/mlocate.db)</li><li>-e, --existing \u53EA\u663E\u793A\u5F53\u524D\u5B58\u5728\u7684\u6587\u4EF6\u6761\u76EE</li><li>-L, --follow \u5F53\u6587\u4EF6\u5B58\u5728\u65F6\u8DDF\u968F\u8513\u5EF6\u7684\u7B26\u53F7\u94FE\u63A5 (\u9ED8\u8BA4)</li><li>-h, --help \u663E\u793A\u672C\u5E2E\u52A9</li><li>-i, --ignore-case \u5339\u914D\u6A21\u5F0F\u65F6\u5FFD\u7565\u5927\u5C0F\u5199\u533A\u522B</li><li>-l, --limit, -n LIMIT \u9650\u5236\u4E3A LIMIT\u9879\u76EE\u7684\u8F93\u51FA (\u6216 \u8BA1\u6570)</li><li>-m, --mmap \u5FFD\u7565\u5411\u540E\u517C\u5BB9\u6027</li><li>-P, --nofollow, -H \u5F53\u68C0\u67E5\u6587\u4EF6\u65F6\u4E0D\u8DDF\u968F\u8513\u5EF6\u7684\u7B26\u53F7\u94FE\u63A5</li><li>-0, --null \u8F93\u51FA\u65F6\u4EE5 NUL \u5206\u9694\u9879\u76EE</li><li>-S, --statistics \u4E0D\u641C\u7D22\u9879\u76EE,\u663E\u793A\u6709\u5173\u6BCF\u4E2A\u5DF2\u7528\u6570\u636E\u5E93\u7684\u7EDF\u8BA1\u4FE1\u606F</li><li>-q, --quiet \u4E0D\u62A5\u544A\u5173\u4E8E\u8BFB\u53D6\u6570\u636E\u5E93\u7684\u9519\u8BEF\u6D88\u606F</li><li>-r, --regexp REGEXP \u641C\u7D22\u57FA\u672C\u6B63\u5219\u8868\u8FBE\u5F0F REGEXP \u6765\u4EE3\u66FF\u6A21\u5F0F --regex \u6A21\u5F0F\u662F\u6269\u5C55\u6B63\u5219\u8868\u8FBE\u5F0F</li><li>-s, --stdio \u5FFD\u7565\u5411\u540E\u517C\u5BB9\u6027</li><li>-V, --version \u663E\u793A\u7248\u672C\u4FE1\u606F</li><li>-w, --wholename \u5339\u914D\u5B8C\u6574\u8DEF\u5F84\u540D (\u9ED8\u8BA4)</li></ul><h2 id="_4-\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#_4-\u5B9E\u4F8B" aria-hidden="true">#</a> 4 \u5B9E\u4F8B</h2><h3 id="_4-1-\u67E5\u627E\u5305\u542B\u67D0\u4E2A\u5B57\u7B26\u4E32\u7684\u76F8\u5173\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_4-1-\u67E5\u627E\u5305\u542B\u67D0\u4E2A\u5B57\u7B26\u4E32\u7684\u76F8\u5173\u6587\u4EF6" aria-hidden="true">#</a> 4.1 \u67E5\u627E\u5305\u542B\u67D0\u4E2A\u5B57\u7B26\u4E32\u7684\u76F8\u5173\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">locate</span> redis\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113313972.png" alt="image-20220419113313972"></p><h3 id="_4-2-\u6309\u6587\u4EF6\u540D\u67E5\u627E\u6587\u4EF6-\u4E0D\u5305\u542B\u586B\u5145\u5B57\u7B26\u7684\u6A21\u5F0F\u88AB\u89E3\u91CA\u4E3A-\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#_4-2-\u6309\u6587\u4EF6\u540D\u67E5\u627E\u6587\u4EF6-\u4E0D\u5305\u542B\u586B\u5145\u5B57\u7B26\u7684\u6A21\u5F0F\u88AB\u89E3\u91CA\u4E3A-\u5173\u952E\u5B57" aria-hidden="true">#</a> 4.2 \u6309\u6587\u4EF6\u540D\u67E5\u627E\u6587\u4EF6\uFF08\u4E0D\u5305\u542B\u586B\u5145\u5B57\u7B26\u7684\u6A21\u5F0F\u88AB\u89E3\u91CA\u4E3A <em>\u5173\u952E\u5B57</em>\uFF09:</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u8BED\u6CD5</span>\n<span class="token function">locate</span> */\u6587\u4EF6\u540D\n<span class="token comment"># \u793A\u4F8B</span>\n <span class="token function">locate</span> */redis\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\u8FC7\u6EE4\u51FA\u7684\u7ED3\u679C\u66F4\u52A0\u7B26\u5408\u6211\u4EEC\u60F3\u8981\u7684</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419134741153.png" alt="image-20220419134741153"></p><h3 id="_4-3-\u91CD\u65B0\u5EFA\u7ACB\u6587\u4EF6\u6570\u636E\u7D22\u5F15\u6570\u636E\u5E93\u3002" tabindex="-1"><a class="header-anchor" href="#_4-3-\u91CD\u65B0\u5EFA\u7ACB\u6587\u4EF6\u6570\u636E\u7D22\u5F15\u6570\u636E\u5E93\u3002" aria-hidden="true">#</a> 4.3 \u91CD\u65B0\u5EFA\u7ACB\u6587\u4EF6\u6570\u636E\u7D22\u5F15\u6570\u636E\u5E93\u3002</h3><p>\u5982\u679C\u8981\u67E5\u627E\u6700\u8FD1\u6DFB\u52A0\u7684\u6587\u4EF6\uFF0C\u5219\u9700\u8981\u6267\u884C\u6B64\u64CD\u4F5C:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> updatedb\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-4-\u641C\u7D22\u76EE\u5F55\u4E0B\u6240\u6709\u4EE5-sh\u5F00\u5934\u7684\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_4-4-\u641C\u7D22\u76EE\u5F55\u4E0B\u6240\u6709\u4EE5-sh\u5F00\u5934\u7684\u6587\u4EF6" aria-hidden="true">#</a> 4.4 \u641C\u7D22\u76EE\u5F55\u4E0B\u6240\u6709\u4EE5 sh\u5F00\u5934\u7684\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">locate</span> /bin/sh\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113440829.png" alt="image-20220419113440829"></p><h3 id="_4-5-\u6307\u5B9A\u663E\u793A\u6570\u91CF" tabindex="-1"><a class="header-anchor" href="#_4-5-\u6307\u5B9A\u663E\u793A\u6570\u91CF" aria-hidden="true">#</a> 4.5 \u6307\u5B9A\u663E\u793A\u6570\u91CF</h3><p>\u5982\u679C\u663E\u793A\u7684\u5185\u5BB9\u8FC7\u591A\uFF0C\u53EF\u4EE5\u4F7F\u7528 -n \u9009\u9879\u6765\u9650\u5B9A\u663E\u793A\u6570\u91CF\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">locate</span> -n <span class="token number">3</span> redis\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419113647925.png" alt="image-20220419113647925"></p><h2 id="_5-locate-\u547D\u4EE4\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_5-locate-\u547D\u4EE4\u5B89\u88C5" aria-hidden="true">#</a> 5 locate \u547D\u4EE4\u5B89\u88C5</h2><p>\u5982\u679Clocate \u641C\u7D22\u65F6\u63D0\u793A\u547D\u4EE4\u4E0D\u5B58\u5728</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220419112033248.png" alt="image-20220419112033248"></p><p>\u5219\u9700\u8981\u5148\u5B89\u88C5\u4E00\u4E0B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> mlocate\n<span class="token function">sudo</span> updatedb\n<span class="token function">locate</span>  *.doc\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 31);
const _hoisted_32 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_32);
}
var Linux____LinuxLocate_____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Linux\u67E5\u627E\u547D\u4EE4-Linux-locate\u67E5\u627E\u6587\u4EF6.html.vue"]]);
export { Linux____LinuxLocate_____html as default };
