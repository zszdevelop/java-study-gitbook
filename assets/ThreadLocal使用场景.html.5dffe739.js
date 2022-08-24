import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="threadlocal\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#threadlocal\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> ThreadLocal\u4F7F\u7528\u573A\u666F</h1><h2 id="_1-\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u573A\u666F" aria-hidden="true">#</a> 1. \u573A\u666F</h2><h3 id="_1-1-\u591A\u6570\u636E\u6E90\u60C5\u51B5" tabindex="-1"><a class="header-anchor" href="#_1-1-\u591A\u6570\u636E\u6E90\u60C5\u51B5" aria-hidden="true">#</a> 1.1 \u591A\u6570\u636E\u6E90\u60C5\u51B5</h3><p>\u6211\u4EEC\u9879\u76EE\u4E2D\u5982\u679C\u5B58\u5728\u591A\u6570\u636E\u6E90\u7684\u60C5\u51B5\u3002\u4E3A\u4E86\u4E0D\u5F71\u54CD\u5176\u4ED6\u7EBF\u7A0B\u7684\u6570\u636E\u6E90\u60C5\u51B5\u3002\u6211\u4EEC\u5207\u6362\u7684\u65F6\u5019\u3002\u4E00\u822C\u4F1A\u4F7F\u7528ThreadLocal \u5B58\u50A8\u5F53\u524D\u6570\u636E\u6E90</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**\n * \u6570\u636E\u6E90\u5207\u6362\u5904\u7406\n * \n * <span class="token keyword">@author</span> ygn\n */</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DynamicDataSourceContextHolder</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">DynamicDataSourceContextHolder</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token doc-comment comment">/**\n     * \u4F7F\u7528ThreadLocal\u7EF4\u62A4\u53D8\u91CF\uFF0CThreadLocal\u4E3A\u6BCF\u4E2A\u4F7F\u7528\u8BE5\u53D8\u91CF\u7684\u7EBF\u7A0B\u63D0\u4F9B\u72EC\u7ACB\u7684\u53D8\u91CF\u526F\u672C\uFF0C\n     *  \u6240\u4EE5\u6BCF\u4E00\u4E2A\u7EBF\u7A0B\u90FD\u53EF\u4EE5\u72EC\u7ACB\u5730\u6539\u53D8\u81EA\u5DF1\u7684\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u5F71\u54CD\u5176\u5B83\u7EBF\u7A0B\u6240\u5BF9\u5E94\u7684\u526F\u672C\u3002\n     */</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> CONTEXT_HOLDER <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token doc-comment comment">/**\n     * \u8BBE\u7F6E\u6570\u636E\u6E90\u7684\u53D8\u91CF\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">setDataSourceType</span><span class="token punctuation">(</span><span class="token class-name">String</span> dsType<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u5207\u6362\u5230{}\u6570\u636E\u6E90&quot;</span><span class="token punctuation">,</span> dsType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        CONTEXT_HOLDER<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>dsType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token doc-comment comment">/**\n     * \u83B7\u5F97\u6570\u636E\u6E90\u7684\u53D8\u91CF\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getDataSourceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> CONTEXT_HOLDER<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token doc-comment comment">/**\n     * \u6E05\u7A7A\u6570\u636E\u6E90\u53D8\u91CF\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">clearDataSourceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        CONTEXT_HOLDER<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-\u8BB0\u5F55\u65E5\u5FD7\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#_1-2-\u8BB0\u5F55\u65E5\u5FD7\u65F6\u95F4" aria-hidden="true">#</a> 1.2 \u8BB0\u5F55\u65E5\u5FD7\u65F6\u95F4</h3><p>\u5728\u4EFB\u52A1\u6267\u884C\u524D\u540E\uFF0C\u8BB0\u5F55\u65F6\u95F4</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**\n     * \u7EBF\u7A0B\u672C\u5730\u53D8\u91CF\n     */</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Date</span><span class="token punctuation">&gt;</span></span> threadLocal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token doc-comment comment">/**\n * \u6267\u884C\u524D\n *\n * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u5DE5\u4F5C\u6267\u884C\u4E0A\u4E0B\u6587\u5BF9\u8C61\n * <span class="token keyword">@param</span> <span class="token parameter">sysJob</span> \u7CFB\u7EDF\u8BA1\u5212\u4EFB\u52A1\n */</span>\n<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> context<span class="token punctuation">,</span> <span class="token class-name">SysJob</span> sysJob<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    threadLocal<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token doc-comment comment">/**\n * \u6267\u884C\u540E\n *\n * <span class="token keyword">@param</span> <span class="token parameter">context</span> \u5DE5\u4F5C\u6267\u884C\u4E0A\u4E0B\u6587\u5BF9\u8C61\n * <span class="token keyword">@param</span> <span class="token parameter">sysJob</span> \u7CFB\u7EDF\u8BA1\u5212\u4EFB\u52A1\n */</span>\n<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">after</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> context<span class="token punctuation">,</span> <span class="token class-name">SysJob</span> sysJob<span class="token punctuation">,</span> <span class="token class-name">Exception</span> e<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name">Date</span> startTime <span class="token operator">=</span> threadLocal<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    threadLocal<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-\u5FAE\u4FE1\u767B\u5F55" tabindex="-1"><a class="header-anchor" href="#_1-3-\u5FAE\u4FE1\u767B\u5F55" aria-hidden="true">#</a> 1.3 \u5FAE\u4FE1\u767B\u5F55</h3><ol><li>\u5FAE\u4FE1\u767B\u5F55\u540E(\u6B64\u65F6\u53EA\u83B7\u53D6\u4E86Openid\u548CSessionKey\u4FE1\u606F )</li><li>\u5C06Openid\u548CSessionKey\u8FD8\u6709appid\u5B58\u50A8\u5728ThreadLocal\u3002</li><li>\u5C06\u4FE1\u606F\u5B58\u50A8\u5230redis</li><li>\u53EA\u8FD4\u56DE\u7ED9\u7528\u6237\u6211\u4EEC\u81EA\u5DF1\u751F\u6210\u7684sessionKey\u800C\u4E0D\u662F\u5FAE\u4FE1\u7684</li></ol><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">String</span> thirdSessionKey <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n		<span class="token class-name">ThirdSession</span> thirdSession <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThirdSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n		thirdSession<span class="token punctuation">.</span><span class="token function">setAppId</span><span class="token punctuation">(</span>appId<span class="token punctuation">)</span><span class="token punctuation">;</span>\n		thirdSession<span class="token punctuation">.</span><span class="token function">setSessionKey</span><span class="token punctuation">(</span>wxUser<span class="token punctuation">.</span><span class="token function">getSessionKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n		thirdSession<span class="token punctuation">.</span><span class="token function">setWxUserId</span><span class="token punctuation">(</span>wxUser<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n		thirdSession<span class="token punctuation">.</span><span class="token function">setOpenId</span><span class="token punctuation">(</span>wxUser<span class="token punctuation">.</span><span class="token function">getOpenId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n		<span class="token comment">//\u5C063rd_session\u548C\u7528\u6237\u4FE1\u606F\u5B58\u5165redis\uFF0C\u5E76\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4</span>\n		<span class="token class-name">String</span> key <span class="token operator">=</span> <span class="token class-name">WxMaConstants</span><span class="token punctuation">.</span>THIRD_SESSION_BEGIN <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> thirdSessionKey<span class="token punctuation">;</span>\n		redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> JSON<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span>thirdSession<span class="token punctuation">)</span> <span class="token punctuation">,</span> <span class="token class-name">WxMaConstants</span><span class="token punctuation">.</span>TIME_OUT_SESSION<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>HOURS<span class="token punctuation">)</span><span class="token punctuation">;</span>\n		wxUser<span class="token punctuation">.</span><span class="token function">setSessionKey</span><span class="token punctuation">(</span>thirdSessionKey<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 11);
const _hoisted_12 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_12);
}
var ThreadLocal_____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ThreadLocal\u4F7F\u7528\u573A\u666F.html.vue"]]);
export { ThreadLocal_____html as default };
