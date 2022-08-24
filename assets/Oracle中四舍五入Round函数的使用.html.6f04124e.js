import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="oracle\u4E2D\u56DB\u820D\u4E94\u5165round\u51FD\u6570\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#oracle\u4E2D\u56DB\u820D\u4E94\u5165round\u51FD\u6570\u7684\u4F7F\u7528" aria-hidden="true">#</a> Oracle\u4E2D\u56DB\u820D\u4E94\u5165Round\u51FD\u6570\u7684\u4F7F\u7528</h1><h1 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h1><p>Round \u51FD\u6570</p><p>\u200B \u8BED\u6CD5\uFF1AROUND(number\uFF0Cnum_digits)</p><p>\u5176\u4E2DNumber \u662F\u9700\u8981\u8FDB\u884C\u56DB\u820D\u4E94\u5165\u7684\u6570\u5B57\uFF0CNum_digits\u4E3A\u6307\u5B9A\u7684\u4F4D\u7F6E\uFF0C\u6309\u6B64\u4F4D\u6570\u8FDB\u884C\u56DB\u820D\u4E94\u5165\u3002</p><ul><li>\u5982\u4F55num_digits \u5927\u4E8E0\uFF0C\u5219\u56DB\u820D\u4E94\u5165\u5230\u6307\u5B9A\u7684\u5C0F\u6570\u4F4D</li><li>\u5982\u679Cnum_digits\u7B49\u4E8E0\uFF0C\u5219\u56DB\u820D\u4E94\u5165\u5230\u6700\u63A5\u8FD1\u7684\u6574\u6570</li><li>\u5982\u679Cnum_digits\u5C0F\u4E8E0\uFF0C\u5219\u5728\u5C0F\u6570\u70B9\u5DE6\u4FA7\u8FDB\u884C\u56DB\u820D\u4E94\u5165</li></ul><h2 id="_2-\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-\u6848\u4F8B" aria-hidden="true">#</a> 2. \u6848\u4F8B</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span>\n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span> r0 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> r1 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> r2 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span> r3 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span> r4 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span> r5 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> r_1 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span> r_2 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span> r_3 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">)</span> r_4 \n<span class="token punctuation">,</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token function">sum</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>long_time<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">)</span> r_5 \n <span class="token keyword">from</span>  hd_agent_voice_seq a \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7ED3\u679C</p><p>SUM(A.LONG_TIME)/3 R0 R1 R2 R3 R4 R5 R_1 R_2 R_3 R_4 R_5 4001.33333333333 4001 4001.3 4001.33 4001.333 4001.3333 4001.33333 4000 4000 4000 0 0</p>', 10);
const _hoisted_11 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_11);
}
var Oracle_____Round______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Oracle\u4E2D\u56DB\u820D\u4E94\u5165Round\u51FD\u6570\u7684\u4F7F\u7528.html.vue"]]);
export { Oracle_____Round______html as default };
