import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="vue\u9879\u76EE\u9884\u89C8pdf" tabindex="-1"><a class="header-anchor" href="#vue\u9879\u76EE\u9884\u89C8pdf" aria-hidden="true">#</a> vue\u9879\u76EE\u9884\u89C8pdf</h1><h2 id="_1-\u96C6\u6210\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_1-\u96C6\u6210\u4F7F\u7528" aria-hidden="true">#</a> 1. \u96C6\u6210\u4F7F\u7528</h2><ol><li><p>\u5C06pdf\u6587\u4EF6\u5939\u653E\u5728public \u76EE\u5F55\u4E0B</p><p>\u94FE\u63A5:https://pan.baidu.com/s/1RTSb0jGWQdZ3xk4TX9FgaA \u5BC6\u7801:g9c5</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210515161010336.png" alt="image-20210515161010336"></p></li><li><p>\u5C06base64 \u8BBE\u7F6E\u5230sessionStorage, \u6253\u5F00\u65B0\u7A97\u53E3\u5C55\u793A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$post</span><span class="token punctuation">(</span><span class="token string">&quot;getBase64PdfStr&quot;</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>code <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">let</span> base64PdfStr <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>\n          sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&quot;_imgUrl&quot;</span><span class="token punctuation">,</span> base64PdfStr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">&quot;/pdf/web/viewer.html&quot;</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>', 3);
const _hoisted_4 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_4);
}
var C6Vue____pdf_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C6-vue\u9879\u76EE\u9884\u89C8pdf.html.vue"]]);
export { C6Vue____pdf_html as default };
