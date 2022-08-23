import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="oracle\u622A\u53D6\u5B57\u7B26\u4E32substr\u3001\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6Einstr\u3001\u66FF\u6362\u5B57\u7B26\u4E32replace" tabindex="-1"><a class="header-anchor" href="#oracle\u622A\u53D6\u5B57\u7B26\u4E32substr\u3001\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6Einstr\u3001\u66FF\u6362\u5B57\u7B26\u4E32replace" aria-hidden="true">#</a> Oracle\u622A\u53D6\u5B57\u7B26\u4E32substr\u3001\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6Einstr\u3001\u66FF\u6362\u5B57\u7B26\u4E32replace</h1><h2 id="_1-\u622A\u53D6\u5B57\u7B26\u4E32-substr" tabindex="-1"><a class="header-anchor" href="#_1-\u622A\u53D6\u5B57\u7B26\u4E32-substr" aria-hidden="true">#</a> 1. \u622A\u53D6\u5B57\u7B26\u4E32\uFF1Asubstr</h2><h3 id="_1-1-substr-\u51FD\u6570\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_1-1-substr-\u51FD\u6570\u4ECB\u7ECD" aria-hidden="true">#</a> 1.1 substr \u51FD\u6570\u4ECB\u7ECD</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>substr(str1,str2,str3)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>str1\u4E3A\u76EE\u6807\u5B57\u7B26\u4E32</li><li>str2\u662F\u5C06\u8981\u8F93\u51FA\u7684\u5B50\u4E32\u7684<strong>\u8D77\u70B9</strong></li><li>str3\u662F\u5C06\u8981\u8F93\u51FA\u7684\u5B50\u4E32\u7684<strong>\u957F\u5EA6</strong></li></ul><h3 id="_1-2-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_1-2-\u793A\u4F8B" aria-hidden="true">#</a> 1.2 \u793A\u4F8B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u4F8B\u5B50\uFF1A\nsubstr(&#39;ABCDEFG&#39;, 2, 3)   =   &#39;BCD&#39;    \nsubstr(&#39;ABCDEFG&#39;,   -2)   =   &#39;FG&#39;  --\u5982\u679C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A\u8D1F\u6570\uFF0C\u90A3\u4E48\u5C06\u4F1A\u4ECE\u6E90\u4E32\u7684\u5C3E\u90E8\u5F00\u59CB\u5411\u524D\u5B9A\u4F4D\u81F3\u8D1F\u6570\u7684\u7EDD\u5BF9\u503C\u7684\u4F4D\u7F6E\nsubstr(&#39;ABCDEFG&#39;,   -4)   =   &#39;DEFG\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6E-instr" tabindex="-1"><a class="header-anchor" href="#_2-\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6E-instr" aria-hidden="true">#</a> 2. <strong>\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6E\uFF1Ainstr</strong></h2><h3 id="_2-1-instr-\u51FD\u6570\u4ECB\u7ECD\u5982\u4E0B" tabindex="-1"><a class="header-anchor" href="#_2-1-instr-\u51FD\u6570\u4ECB\u7ECD\u5982\u4E0B" aria-hidden="true">#</a> 2.1 instr \u51FD\u6570\u4ECB\u7ECD\u5982\u4E0B\uFF1A</h3><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>instr<span class="token punctuation">(</span> strSource<span class="token punctuation">,</span>str <span class="token punctuation">,</span> startPos<span class="token punctuation">,</span> appearance  <span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>strSource :\u6E90\u5B57\u7B26\u4E32</li><li>str :\u8981\u67E5\u627E\u7684\u5B57\u7B26\u4E32.</li><li>startPos :<strong>\u4ECE\u54EA\u4E2A\u4F4D\u7F6E\u5F00\u59CB\u67E5\u627E\uFF0C\u9ED8\u8BA4\u4E3A1\u3002\u53C2\u6570\u4E3A\u6B63\uFF0C\u4ECE\u5DE6\u5230\u53F3\u5F00\u59CB\u68C0\u7D22\uFF0C\u53C2\u6570\u4E3A\u8D1F\uFF0C\u4ECE\u53F3\u5230\u5DE6\u68C0\u7D22\u3002</strong></li><li>appearance :\u4EE3\u8868\u8981\u67E5\u627E\u7B2C\u51E0\u6B21\u51FA\u73B0\u7684str,\u9ED8\u8BA4\u4E3A 1,\u4E0D\u80FD\u4E3A\u8D1F\u3002</li></ul><h3 id="_2-2-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-2-\u793A\u4F8B" aria-hidden="true">#</a> 2.2 \u793A\u4F8B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u4F8B\u5B50\uFF1A\ninstr(&#39;ABCDABCDAEF&#39;, &#39;AB&#39;);   -- \u8FD4\u56DE\u7ED3\u679C\u662F\uFF1A1\uFF0C\u56E0\u4E3Ainstr\u5B57\u7B26\u4E32\u7D22\u5F15\u4ECE1\u5F00\u59CB\uFF0C\u6240\u4EE5\u662F1\u4E0D\u662F0\ninstr(&#39;ABCDABCDAEF&#39;, &#39;DA&#39;, 1, 2);   -- \u8FD4\u56DE\u7ED3\u679C\u662F\uFF1A8\uFF0C\u8FD4\u56DE\u7B2C\u4E8C\u6B21\u51FA\u73B0&#39;DA&#39;\u7684\u4F4D\u7F6E\ninstr(&#39;A BCDABCDAEF&#39;, &#39;DA&#39;, 1, 2)\uFF1B  -- \u8FD4\u56DE\u7ED3\u679C\u662F\uFF1A9\uFF0C\u7531\u4E8E\u6211\u5728\u5143\u5B57\u7B26\u4E32\u4E2D\u52A0\u4E86\u4E00\u4E2A\u7A7A\u683C\uFF0C\u7A7A\u683C\u4ECD\u7136\u7B97\u4E00\u4E2A\u5B57\u7B26\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u66FF\u6362\u5B57\u7B26\u4E32-replace" tabindex="-1"><a class="header-anchor" href="#_3-\u66FF\u6362\u5B57\u7B26\u4E32-replace" aria-hidden="true">#</a> 3. <strong>\u66FF\u6362\u5B57\u7B26\u4E32\uFF1Areplace</strong></h2><h3 id="_3-1-replace\u51FD\u6570\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_3-1-replace\u51FD\u6570\u4ECB\u7ECD" aria-hidden="true">#</a> 3.1 replace\u51FD\u6570\u4ECB\u7ECD</h3><p>replace(str1, str2, str3) \u5176\u8868\u793A\u7684\u610F\u601D\u662F\uFF1A\u5728str1\u4E2D\u67E5\u627Estr2\uFF0C\u51E1\u662F\u51FA\u73B0str2\u7684\u5730\u65B9\uFF0C\u90FD\u66FF\u6362\u6210str3\u3002</p><h3 id="_3-2-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_3-2-\u793A\u4F8B" aria-hidden="true">#</a> 3.2 \u793A\u4F8B</h3><p>replace(&#39;ABCDEFG&#39;, &#39;CDE&#39;, &#39;cde&#39;); -- \u8FD4\u56DE\u7ED3\u679C\u662F\uFF1AABcdeFG replace(&#39;ABCDEFG&#39;, &#39;CDE&#39;, &#39;&#39;); -- \u8FD4\u56DE\u7ED3\u679C\u662F\uFF1AABFG\uFF0CCDE\u88AB\u66FF\u6362\u6210\u7A7A\u5B57\u7B26 replace(&#39;ABCDEFG&#39;, &#39;CDE&#39;); -- \u8FD4\u56DE\u7ED3\u679C\u662F\uFF1AABFG\uFF0C\u5F53\u4E0D\u5B58\u5728\u7B2C\u4E09\u4E2A\u53C2\u6570\u65F6\uFF0CCDE\u76F4\u63A5\u88AB\u5220\u6389------\u636E\u6B64\u53EF\u4EE5\u786E\u5B9A\u67D0\u4E2A\u5B57\u7B26\u4E32\u5728\u5B57\u7B26\u4E2D\u51FA\u73B0\u7684\u6B21\u6570</p><h2 id="_4-replace\u6269\u5C55" tabindex="-1"><a class="header-anchor" href="#_4-replace\u6269\u5C55" aria-hidden="true">#</a> 4. <strong>replace\u6269\u5C55\uFF1A</strong></h2><p>\u786E\u5B9A\u67D0\u4E2A\u5B57\u7B26\u4E32\u5728\u5B57\u7B26\u4E2D\u51FA\u73B0\u7684\u6B21\u6570\u3002 \u4F8B\u5B50\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>select a<span class="token punctuation">.</span>* from tb_duty a where <span class="token function">length</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>col<span class="token punctuation">)</span><span class="token operator">-</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token function">replace</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>col<span class="token punctuation">,</span> <span class="token char">&#39;,&#39;</span><span class="token punctuation">,</span> &#39;&#39;<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token function">n</span><span class="token punctuation">(</span>n\u4E3A\u51FA\u73B0\u7684\u6B21\u6570<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 22);
const _hoisted_23 = {
  href: "https://blog.csdn.net/big1989wmf/article/details/70144624",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_24 = /* @__PURE__ */ createTextVNode("Oracle\u622A\u53D6\u5B57\u7B26\u4E32substr\u3001\u67E5\u627E\u5B57\u7B26\u4E32\u4F4D\u7F6Einstr\u3001\u66FF\u6362\u5B57\u7B26\u4E32replace");
const _hoisted_25 = {
  href: "http://www.myexceptions.net/h/1369083.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_26 = /* @__PURE__ */ createTextVNode("ORACLE \u67E5\u627E\u67D0\u4E2A\u5B57\u7B26\u6700\u540E\u4E00\u6B21\u51FA\u73B0\u7684\u4F4D\u7F6E");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_23, [
        _hoisted_24,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_25, [
        _hoisted_26,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Oracle______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Oracle\u5B57\u7B26\u4E32\u64CD\u4F5C.html.vue"]]);
export { Oracle______html as default };
