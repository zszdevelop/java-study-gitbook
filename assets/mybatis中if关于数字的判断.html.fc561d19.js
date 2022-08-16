import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="mybatis\u4E2Dif\u5173\u4E8E\u6570\u5B57\u7684\u5224\u65AD" tabindex="-1"><a class="header-anchor" href="#mybatis\u4E2Dif\u5173\u4E8E\u6570\u5B57\u7684\u5224\u65AD" aria-hidden="true">#</a> mybatis\u4E2Dif\u5173\u4E8E\u6570\u5B57\u7684\u5224\u65AD</h1><p>mybatis \u4E2D\u5173\u4E8E\u6570\u5B57\u7684\u5224\u65AD\uFF0C\u5982\u679C\u76F4\u63A5\u5199<code>&lt;if test = &quot;xx == &#39;1&#39; &quot;&gt; &lt;/if&gt;</code>,\u8FD9\u6837\u5373\u4F7F\u662F<code>xx==\u20181\u2019</code>\uFF0C\u901A\u5E38\u60C5\u51B5\u4E0B\u4E5F\u4E0D\u4F1A\u8FDB\u5165\u5224\u65AD\u7684\u3002\u5FC5\u987B\u5982\u4E0B\u5199\uFF1A</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>getByNameAndPwd<span class="token punctuation">&quot;</span></span> <span class="token attr-name">parameterType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>String<span class="token punctuation">&quot;</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>MemberResult<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        select\n           *\n        from `member`\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isMerch != <span class="token punctuation">&#39;</span><span class="token punctuation">&#39;</span> and isMerch == <span class="token punctuation">&#39;</span>1<span class="token punctuation">&#39;</span>.toString() <span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>\n            where  `mobile` = #{name} \n            and `password` = #{password}\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>if</span> <span class="token attr-name">test</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isMerch != <span class="token punctuation">&#39;</span><span class="token punctuation">&#39;</span> and isMerch == <span class="token punctuation">&#39;</span>2<span class="token punctuation">&#39;</span>.toString() <span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>\n            where  `name` = #{name}\n            and `password` = #{password}\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>if</span><span class="token punctuation">&gt;</span></span>   \n \n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 4);
const _hoisted_5 = {
  href: "https://blog.csdn.net/xinyuebaihe/article/details/86437431",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode("mybatis \u4E2Dif\u5173\u4E8E\u6570\u5B57\u7684\u5224\u65AD");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_5, [
        _hoisted_6,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var mybatis_if________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "mybatis\u4E2Dif\u5173\u4E8E\u6570\u5B57\u7684\u5224\u65AD.html.vue"]]);
export { mybatis_if________html as default };
