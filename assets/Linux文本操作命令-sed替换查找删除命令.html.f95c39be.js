import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="sed\u66FF\u6362-\u67E5\u627E-\u5220\u9664\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#sed\u66FF\u6362-\u67E5\u627E-\u5220\u9664\u547D\u4EE4" aria-hidden="true">#</a> sed\u66FF\u6362/\u67E5\u627E/\u5220\u9664\u547D\u4EE4</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1 \u7B80\u4ECB</h2><p>sed\u662F\u4E00\u4E2A\u5F88\u597D\u7684\u6587\u4EF6\u5904\u7406\u5DE5\u5177\uFF0C\u672C\u8EAB\u662F\u4E00\u4E2A\u7BA1\u9053\u547D\u4EE4\uFF0C\u4E3B\u8981\u662F\u4EE5\u884C\u4E3A\u5355\u4F4D\u8FDB\u884C\u5904\u7406\uFF0C\u53EF\u4EE5\u5C06\u6570\u636E\u884C\u8FDB\u884C\u66FF\u6362\u3001\u5220\u9664\u3001\u65B0\u589E\u3001\u9009\u53D6\u7B49\u7279\u5B9A\u5DE5\u4F5C</p><h2 id="_2-sed-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-sed-\u8BED\u6CD5" aria-hidden="true">#</a> 2 sed \u8BED\u6CD5</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sed [-nefri] \u2018command\u2019 \u8F93\u5165\u6587\u672C \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-\u5E38\u7528\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#_3-\u5E38\u7528\u9009\u9879" aria-hidden="true">#</a> 3 \u5E38\u7528\u9009\u9879</h2><ul><li>-n\u2236\u4F7F\u7528\u5B89\u9759(silent)\u6A21\u5F0F\u3002\u5728\u4E00\u822C sed \u7684\u7528\u6CD5\u4E2D\uFF0C\u6240\u6709\u6765\u81EA STDIN\u7684\u8D44\u6599\u4E00\u822C\u90FD\u4F1A\u88AB\u5217\u51FA\u5230\u8424\u5E55\u4E0A\u3002\u4F46\u5982\u679C\u52A0\u4E0A -n \u53C2\u6570\u540E\uFF0C\u5219\u53EA\u6709\u7ECF\u8FC7sed \u7279\u6B8A\u5904\u7406\u7684\u90A3\u4E00\u884C(\u6216\u8005\u52A8\u4F5C)\u624D\u4F1A\u88AB\u5217\u51FA\u6765\u3002</li><li>-e\u2236\u76F4\u63A5\u5728\u6307\u4EE4\u5217\u6A21\u5F0F\u4E0A\u8FDB\u884C sed \u7684\u52A8\u4F5C\u7F16\u8F91\uFF1B</li><li>-f\u2236\u76F4\u63A5\u5C06 sed \u7684\u52A8\u4F5C\u5199\u5728\u4E00\u4E2A\u6863\u6848\u5185\uFF0C -f filename \u5219\u53EF\u4EE5\u6267\u884C filename \u5185\u7684sed \u52A8\u4F5C\uFF1B</li><li>-r\u2236sed \u7684\u52A8\u4F5C\u652F\u63F4\u7684\u662F\u5EF6\u4F38\u578B\u6B63\u89C4\u8868\u793A\u6CD5\u7684\u8BED\u6CD5\u3002(\u9884\u8BBE\u662F\u57FA\u7840\u6B63\u89C4\u8868\u793A\u6CD5\u8BED\u6CD5)</li><li>-i\u2236\u76F4\u63A5\u4FEE\u6539\u8BFB\u53D6\u7684\u6863\u6848\u5185\u5BB9\uFF0C\u800C\u4E0D\u662F\u7531\u8424\u5E55\u8F93\u51FA\u3002</li></ul><h2 id="_4-\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_4-\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> 4 <strong>\u5E38\u7528\u547D\u4EE4</strong></h2><ul><li>a \u2236\u65B0\u589E\uFF0C a \u7684\u540E\u9762\u53EF\u4EE5\u63A5\u5B57\u4E32\uFF0C\u800C\u8FD9\u4E9B\u5B57\u4E32\u4F1A\u5728\u65B0\u7684\u4E00\u884C\u51FA\u73B0(\u76EE\u524D\u7684\u4E0B\u4E00\u884C)\uFF5E</li><li>c \u2236\u53D6\u4EE3\uFF0C c \u7684\u540E\u9762\u53EF\u4EE5\u63A5\u5B57\u4E32\uFF0C\u8FD9\u4E9B\u5B57\u4E32\u53EF\u4EE5\u53D6\u4EE3 n1,n2 \u4E4B\u95F4\u7684\u884C\uFF01</li><li>d \u2236\u5220\u9664\uFF0C\u56E0\u4E3A\u662F\u5220\u9664\u554A\uFF0C\u6240\u4EE5 d \u540E\u9762\u901A\u5E38\u4E0D\u63A5\u4EFB\u4F55\u549A\u549A\uFF1B</li><li>i \u2236\u63D2\u5165\uFF0C i \u7684\u540E\u9762\u53EF\u4EE5\u63A5\u5B57\u4E32\uFF0C\u800C\u8FD9\u4E9B\u5B57\u4E32\u4F1A\u5728\u65B0\u7684\u4E00\u884C\u51FA\u73B0(\u76EE\u524D\u7684\u4E0A\u4E00\u884C)\uFF1B</li><li>p \u2236\u5217\u5370\uFF0C\u4EA6\u5373\u5C06\u67D0\u4E2A\u9009\u62E9\u7684\u8D44\u6599\u5370\u51FA\u3002\u901A\u5E38 p \u4F1A\u4E0E\u53C2\u6570 sed -n \u4E00\u8D77\u8FD0\u4F5C\uFF5E</li><li>s \u2236\u53D6\u4EE3\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8FDB\u884C\u53D6\u4EE3\u7684\u5DE5\u4F5C\u54E9\uFF01\u901A\u5E38\u8FD9\u4E2A s \u7684\u52A8\u4F5C\u53EF\u4EE5\u642D\u914D\u6B63\u89C4\u8868\u793A\u6CD5\uFF01\u4F8B\u5982 1,20s/old/new/g \u5C31\u662F\u5566\uFF01</li></ul><h2 id="_5-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_5-\u793A\u4F8B" aria-hidden="true">#</a> 5 \u793A\u4F8B</h2><p>\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u6587\u4EF6\u540D\u4E3Amy.txt\u3002\u5185\u5BB9\u5982\u4E0B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Hello!\nwelcome to my blog.\nend\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-\u5220\u9664\u67D0\u884C" tabindex="-1"><a class="header-anchor" href="#_5-1-\u5220\u9664\u67D0\u884C" aria-hidden="true">#</a> 5.1 \u5220\u9664\u67D0\u884C</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># sed &#39;1d&#39; my.txt              #\u5220\u9664\u7B2C\u4E00\u884C </span>\n<span class="token comment"># sed &#39;$d&#39; my.txt              #\u5220\u9664\u6700\u540E\u4E00\u884C</span>\n<span class="token comment"># sed &#39;1,2d&#39; my.txt           #\u5220\u9664\u7B2C\u4E00\u884C\u5230\u7B2C\u4E8C\u884C</span>\n<span class="token comment"># sed &#39;2,$d&#39; my.txt           #\u5220\u9664\u7B2C\u4E8C\u884C\u5230\u6700\u540E\u4E00\u884C</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-\u663E\u793A\u67D0\u884C" tabindex="-1"><a class="header-anchor" href="#_5-2-\u663E\u793A\u67D0\u884C" aria-hidden="true">#</a> 5.2 \u663E\u793A\u67D0\u884C\uFF1A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># sed -n &#39;1p&#39; my.txt           #\u663E\u793A\u7B2C\u4E00\u884C </span>\n<span class="token comment"># sed -n &#39;$p&#39; my.txt           #\u663E\u793A\u6700\u540E\u4E00\u884C</span>\n<span class="token comment"># sed -n &#39;1,2p&#39; my.txt        #\u663E\u793A\u7B2C\u4E00\u884C\u5230\u7B2C\u4E8C\u884C</span>\n<span class="token comment"># sed -n &#39;2,$p&#39; my.txt        #\u663E\u793A\u7B2C\u4E8C\u884C\u5230\u6700\u540E\u4E00\u884C</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-\u4F7F\u7528\u6A21\u5F0F\u8FDB\u884C\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#_5-3-\u4F7F\u7528\u6A21\u5F0F\u8FDB\u884C\u67E5\u8BE2" aria-hidden="true">#</a> 5.3 \u4F7F\u7528\u6A21\u5F0F\u8FDB\u884C\u67E5\u8BE2\uFF1A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># sed -n &#39;/blog/p&#39; my.txt    #\u67E5\u8BE2\u5305\u62EC\u5173\u952E\u5B57blog\u6240\u5728\u6240\u6709\u884C</span>\n<span class="token comment"># sed -n &#39;/\\$/p&#39; my.txt        #\u67E5\u8BE2\u5305\u62EC\u5173\u952E\u5B57$\u6240\u5728\u6240\u6709\u884C\uFF0C\u4F7F\u7528\u53CD\u659C\u7EBF\\\u5C4F\u853D\u7279\u6B8A\u542B\u4E49</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-\u589E\u52A0\u4E00\u884C\u6216\u591A\u884C\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#_5-4-\u589E\u52A0\u4E00\u884C\u6216\u591A\u884C\u5B57\u7B26\u4E32" aria-hidden="true">#</a> 5.4 \u589E\u52A0\u4E00\u884C\u6216\u591A\u884C\u5B57\u7B26\u4E32\uFF1A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># cat my.txt</span>\n     Hello<span class="token operator">!</span>\n     ruby is me,welcome to my blog.\n     end\n<span class="token comment"># sed &#39;1a drink tea&#39; my.txt  #\u7B2C\u4E00\u884C\u540E\u589E\u52A0\u5B57\u7B26\u4E32&quot;drink tea&quot;</span>\n     Hello<span class="token operator">!</span>\n     drink tea\n     ruby is me,welcome to my blog. \n     end\n<span class="token comment"># sed &#39;1,3a drink tea&#39; my.txt #\u7B2C\u4E00\u884C\u5230\u7B2C\u4E09\u884C\u540E\u589E\u52A0\u5B57\u7B26\u4E32&quot;drink tea&quot;</span>\n     Hello<span class="token operator">!</span>\n     drink tea\n     ruby is me,welcome to my blog.\n     drink tea\n     end\n     drink tea\n<span class="token comment"># sed &#39;1a drink tea\\nor coffee&#39; my.txt   #\u7B2C\u4E00\u884C\u540E\u589E\u52A0\u591A\u884C\uFF0C\u4F7F\u7528\u6362\u884C\u7B26\\n</span>\n     Hello<span class="token operator">!</span>\n     drink tea\n     or coffee\n     ruby is me,welcome to my blog.\n     end\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-\u5220\u9664\u5339\u914D\u884C" tabindex="-1"><a class="header-anchor" href="#_5-5-\u5220\u9664\u5339\u914D\u884C" aria-hidden="true">#</a> 5.5 \u5220\u9664\u5339\u914D\u884C\uFF1A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sed</span> -i <span class="token string">&#39;/\u5339\u914D\u5B57\u7B26\u4E32/d&#39;</span>  filename  \uFF08\u6CE8\uFF1A\u82E5\u5339\u914D\u5B57\u7B26\u4E32\u662F\u53D8\u91CF\uFF0C\u5219\u9700\u8981\u201C\u201D\uFF0C\u800C\u4E0D\u662F\u2018\u2019\u3002\u8BB0\u5F97\u597D\u50CF\u662F\uFF09\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-6-\u66FF\u6362\u5339\u914D\u884C\u4E2D\u7684\u67D0\u4E2A\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#_5-6-\u66FF\u6362\u5339\u914D\u884C\u4E2D\u7684\u67D0\u4E2A\u5B57\u7B26\u4E32" aria-hidden="true">#</a> 5.6 \u66FF\u6362\u5339\u914D\u884C\u4E2D\u7684\u67D0\u4E2A\u5B57\u7B26\u4E32\uFF1A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sed</span> -i <span class="token string">&#39;/\u5339\u914D\u5B57\u7B26\u4E32/s/\u66FF\u6362\u6E90\u5B57\u7B26\u4E32/\u66FF\u6362\u76EE\u6807\u5B57\u7B26\u4E32/g&#39;</span> filename\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2>', 25);
const _hoisted_26 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_26);
}
var Linux______Sed_________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Linux\u6587\u672C\u64CD\u4F5C\u547D\u4EE4-sed\u66FF\u6362\u67E5\u627E\u5220\u9664\u547D\u4EE4.html.vue"]]);
export { Linux______Sed_________html as default };
