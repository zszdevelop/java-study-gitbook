import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406</h1><h2 id="_1-\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#_1-\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> 1. \u5B9E\u73B0\u539F\u7406</h2><ol><li>jstack\u7B49\u547D\u4EE4\u4F1A\u4E0Ejvm\u8FDB\u7A0B\u5EFA\u7ACBsocket\u8FDE\u63A5</li><li>\u53D1\u9001\u5BF9\u5E94\u7684\u6307\u4EE4\uFF08jstack\u53D1\u9001\u4E86threaddump\u6267\u884C\uFF09</li><li>\u7136\u540E\u518D\u8BFB\u53D6\u8FD4\u56DE\u7684\u6570\u636E</li></ol><h2 id="_2-jstack\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#_2-jstack\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> 2. jstack\u4F7F\u7528\u573A\u666F</h2><p>**\u573A\u666F\uFF1A**Java\u5E94\u7528\u6301\u7EED\u5360\u7528\u5F88\u9AD8CPU\uFF0C\u9700\u8981\u6392\u67E5\u4E00\u4E0B</p>', 5);
const _hoisted_6 = /* @__PURE__ */ createTextVNode("**\u6A21\u62DF\uFF1A**\u9020\u4E2A\u573A\u666F\u7B80\u5355\u6A21\u62DF\u4E0B\uFF0C\u6CA1\u4EC0\u4E48\u5B9E\u9645\u610F\u4E49\uFF0C\u4EC5\u4F5C\u6F14\u793A\u3002\u6211\u542F\u52A8\u4E86100\u4E2A\u7EBF\u7A0B\u6301\u7EED\u8BBF\u95EE ");
const _hoisted_7 = {
  href: "https://chenyongjun.vip/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode("\u6211\u7684\u535A\u5BA2");
const _hoisted_9 = /* @__PURE__ */ createTextVNode("\uFF0C\u535A\u5BA2\u90E8\u7F72\u5728Ubuntu 16.04\u4E0A\uFF0C\u662F\u4E00\u4E2A\u7B80\u5355\u7684Spring Boot\u5E94\u7528\uFF0C\u4EE5jar\u5305\u76F4\u63A5\u8FD0\u884C\u7684\u3002");
const _hoisted_10 = /* @__PURE__ */ createStaticVNode('<p><code>top</code> \u547D\u4EE4\u67E5\u4E0B\u7CFB\u7EDF\u8FD0\u884C\u60C5\u51B5\uFF0C\u8FDB\u7A0B31951\u5360\u7528CPU 80.6%\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220326145102943.png" alt="image-20220326145102943"></p><p><code>jps -l</code> \u786E\u8BA4\u4E00\u4E0B\uFF0C31951\u5C31\u662F\u535A\u5BA2\u7684\u8FDB\u7A0BID\uFF0C\u6216 <code>cat /proc/31951/cmdline</code> \u770B\u4E0B\u8FDB\u7A0B\u7684\u542F\u7528\u547D\u4EE4\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@iZ94dcq8q6jZ:~# jps -l\n28416 sun.tools.jps.Jps\n31951 blog.jar\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>top -Hp 3379</code> \u4EE5\u7EBF\u7A0B\u6A21\u5F0F\u67E5\u770B\u4E0B\u8FDB\u7A0B31951\u7684\u6240\u6709\u7EBF\u7A0B\u60C5\u51B5</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220326145242586.png" alt="image-20220326145242586"></p><p>\u5047\u8BBE\u60F3\u770B\u4E0B\u7B2C\u4E8C\u4E2A\u7EBF\u7A0B31998\u7684\u60C5\u51B5\uFF0C31998\u662F\u64CD\u4F5C\u7CFB\u7EDF\u7684\u7EBF\u7A0BID\uFF0C\u5148\u8F6C\u621016\u8FDB\u5236\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>printf <span class="token string">&#39;%x&#39;</span> <span class="token number">31998</span> #\u503C\u4E3A7cfe\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u83B7\u53D6\u8BE5\u7EBF\u7A0B\u7684\u4FE1\u606F(\u5339\u914D7cf3\u540E\u53D620\u884C\u5DEE\u4E0D\u591A)</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>jstack <span class="token number">31951</span> <span class="token operator">|</span> grep 7cfe <span class="token operator">-</span><span class="token constant">A</span> <span class="token number">20</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5176\u4E2D\u90E8\u5206\u6570\u636E\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&quot;Tomcat JDBC Pool Cleaner[11483240:1532362388783]&quot;</span> #<span class="token number">31</span> daemon prio<span class="token operator">=</span><span class="token number">5</span> os_prio<span class="token operator">=</span><span class="token number">0</span> tid<span class="token operator">=</span><span class="token number">0x0a29dc00</span> nid<span class="token operator">=</span><span class="token number">0x7cfe</span> <span class="token keyword">in</span> Object<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token number">0xa2a69000</span><span class="token punctuation">]</span>\n   java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>State<span class="token operator">:</span> <span class="token constant">TIMED_WAITING</span> <span class="token punctuation">(</span>on object monitor<span class="token punctuation">)</span>\n    at java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>Object<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span>Native Method<span class="token punctuation">)</span>\n    at java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>TimerThread<span class="token punctuation">.</span><span class="token function">mainLoop</span><span class="token punctuation">(</span>Timer<span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">552</span><span class="token punctuation">)</span>\n    <span class="token operator">-</span> locked <span class="token operator">&lt;</span><span class="token number">0xaadc5a60</span><span class="token operator">&gt;</span> <span class="token punctuation">(</span>a java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>TaskQueue<span class="token punctuation">)</span>\n    at java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>TimerThread<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>Timer<span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">505</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF1Anid=0x7cfe\u4E2D\u7684nid\u6307native id\uFF0C\u662FOS\u4E2D\u7EBF\u7A0BID\uFF0C\u5BF9\u5E94\u4E0A\u976231998\u7EBF\u7A0B\u768416\u8FDB\u5236\u503C7cfe\uFF1Btid\u4E3AJava\u4E2D\u7EBF\u7A0B\u7684ID\u3002</p>', 13);
const _hoisted_23 = /* @__PURE__ */ createTextVNode("\u81F3\u4E8E\u5982\u4F55\u5229\u7528jstack\u7684\u6570\u636E\u5206\u6790\u7EBF\u7A0B\u60C5\u51B5\uFF0C\u53EF\u4EE5\u770B\u770B ");
const _hoisted_24 = {
  href: "https://www.jianshu.com/p/6690f7e92f27",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_25 = /* @__PURE__ */ createTextVNode("\u5982\u4F55\u4F7F\u7528jstack\u5206\u6790\u7EBF\u7A0B\u72B6\u6001");
const _hoisted_26 = /* @__PURE__ */ createTextVNode(" \u548C ");
const _hoisted_27 = {
  href: "http://www.tianshouzhi.com/api/tutorials/jvm/351",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_28 = /* @__PURE__ */ createTextVNode("jstack");
const _hoisted_29 = /* @__PURE__ */ createTextVNode("\u3002");
const _hoisted_30 = /* @__PURE__ */ createStaticVNode('<h2 id="_3-jstack\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#_3-jstack\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> 3. jstack\u5B9E\u73B0\u539F\u7406</h2><p>\u5148\u4EE5\u4E00\u6BB5\u7B80\u5355\u4EE3\u7801\u6253\u5370threaddump\uFF0C\u548Cstack\u547D\u4EE4\u6548\u679C\u4E00\u6837\uFF0C\u4E0B\u9762\u7684\u7C7B\u57FA\u672C\u6765\u81EA <strong>tools.jar</strong>\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@Test\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">jstack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> throws Exception <span class="token punctuation">{</span>\n    RuntimeMXBean runtimeMXBean <span class="token operator">=</span> ManagementFactory<span class="token punctuation">.</span><span class="token function">getRuntimeMXBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    String pid <span class="token operator">=</span> runtimeMXBean<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;@&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n    VirtualMachine virtualMachine <span class="token operator">=</span> VirtualMachine<span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span>pid<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    HotSpotVirtualMachine hotSpotVirtualMachine <span class="token operator">=</span> <span class="token punctuation">(</span>HotSpotVirtualMachine<span class="token punctuation">)</span> virtualMachine<span class="token punctuation">;</span>\n\n    InputStream inputStream <span class="token operator">=</span> hotSpotVirtualMachine<span class="token punctuation">.</span><span class="token function">remoteDataDump</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    String threadDump <span class="token operator">=</span> IOUtils<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">,</span> <span class="token string">&quot;utf8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// IOUtils from commons-io</span>\n    System<span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>threadDump<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    virtualMachine<span class="token punctuation">.</span><span class="token function">detach</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6253\u5370\u7684\u90E8\u5206\u6570\u636E\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>Full thread dump Java <span class="token function">HotSpot</span><span class="token punctuation">(</span><span class="token constant">TM</span><span class="token punctuation">)</span> <span class="token number">64</span><span class="token operator">-</span>Bit Server <span class="token constant">VM</span> <span class="token punctuation">(</span><span class="token number">25.101</span><span class="token operator">-</span>b13 mixed mode<span class="token punctuation">)</span><span class="token operator">:</span>\n\n<span class="token string">&quot;Attach Listener&quot;</span> #<span class="token number">10</span> daemon prio<span class="token operator">=</span><span class="token number">9</span> os_prio<span class="token operator">=</span><span class="token number">31</span> tid<span class="token operator">=</span><span class="token number">0x00007f816293c800</span> nid<span class="token operator">=</span><span class="token number">0x5b0f</span> waiting on condition <span class="token punctuation">[</span><span class="token number">0x0000000000000000</span><span class="token punctuation">]</span>\n   java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>State<span class="token operator">:</span> <span class="token constant">RUNNABLE</span>\n\n<span class="token string">&quot;Service Thread&quot;</span> #<span class="token number">9</span> daemon prio<span class="token operator">=</span><span class="token number">9</span> os_prio<span class="token operator">=</span><span class="token number">31</span> tid<span class="token operator">=</span><span class="token number">0x00007f8162827000</span> nid<span class="token operator">=</span><span class="token number">0x5303</span> runnable <span class="token punctuation">[</span><span class="token number">0x0000000000000000</span><span class="token punctuation">]</span>\n   java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>State<span class="token operator">:</span> <span class="token constant">RUNNABLE</span>\n\n<span class="token string">&quot;C1 CompilerThread3&quot;</span> #<span class="token number">8</span> daemon prio<span class="token operator">=</span><span class="token number">9</span> os_prio<span class="token operator">=</span><span class="token number">31</span> tid<span class="token operator">=</span><span class="token number">0x00007f8164834800</span> nid<span class="token operator">=</span><span class="token number">0x5103</span> waiting on condition <span class="token punctuation">[</span><span class="token number">0x0000000000000000</span><span class="token punctuation">]</span>\n   java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>State<span class="token operator">:</span> <span class="token constant">RUNNABLE</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6838\u5FC3\u7684**hotSpotVirtualMachine.remoteDataDump()**\u4EE3\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">public</span> InputStream <span class="token function">remoteDataDump</span><span class="token punctuation">(</span>Object<span class="token operator">...</span> var1<span class="token punctuation">)</span> throws IOException <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">executeCommand</span><span class="token punctuation">(</span><span class="token string">&quot;threaddump&quot;</span><span class="token punctuation">,</span> var1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> InputStream <span class="token function">executeCommand</span><span class="token punctuation">(</span>String var1<span class="token punctuation">,</span> Object<span class="token operator">...</span> var2<span class="token punctuation">)</span> throws IOException <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>var1<span class="token punctuation">,</span> var2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>AgentLoadException var4<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InternalError</span><span class="token punctuation">(</span><span class="token string">&quot;Should not get here&quot;</span><span class="token punctuation">,</span> var4<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 7);
const _hoisted_37 = /* @__PURE__ */ createTextVNode("\u5F88\u591A\u547D\u4EE4\u90FD\u662F\u901A\u8FC7 ");
const _hoisted_38 = /* @__PURE__ */ createBaseVNode("strong", null, "executeCommand", -1);
const _hoisted_39 = /* @__PURE__ */ createTextVNode(" \u6765\u5B9E\u73B0\u7684\uFF0C\u4F8B\u5982\uFF1Adatadump\u3001threaddump\u3001dumpheap\u3001inspectheap\u3001jcmd\u7B49\uFF0C\u800C\u6700\u7EC8\u7684execute()\u5728Mac\u673A\u5668\u4E0A\u662F\u7531 ");
const _hoisted_40 = {
  href: "https://github.com/frohoff/jdk8u-jdk/blob/master/src/solaris/classes/sun/tools/attach/BsdVirtualMachine.java",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_41 = /* @__PURE__ */ createTextVNode("BsdVirtualMachine");
const _hoisted_42 = /* @__PURE__ */ createTextVNode(" \u7C7B\u6765\u5B8C\u6210\u3002");
const _hoisted_43 = /* @__PURE__ */ createStaticVNode('<p>\u4E3A\u4E86\u4FBF\u4E8E\u9605\u8BFB\uFF0C\u6E90\u7801\u6211\u6709\u8F83\u5927\u5220\u51CF\uFF0C\u770B\u770Bexecute()\u4E2D\u7684\u539F\u82F1\u6587\u6CE8\u91CA\u5373\u53EF\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**\n * Execute the given command in the target VM.\n */</span>\nInputStream <span class="token function">execute</span><span class="token punctuation">(</span>String cmd<span class="token punctuation">,</span> Object <span class="token operator">...</span> args<span class="token punctuation">)</span> throws AgentLoadException<span class="token punctuation">,</span> IOException <span class="token punctuation">{</span>\n    <span class="token comment">// did we detach?</span>\n    String p<span class="token punctuation">;</span>\n    <span class="token function">synchronized</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">this</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>path <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IOException</span><span class="token punctuation">(</span><span class="token string">&quot;Detached from target VM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        p <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>path<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// create UNIX socket</span>\n    int s <span class="token operator">=</span> <span class="token function">socket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// connect to target VM</span>\n    <span class="token function">connect</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    IOException ioe <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// connected - write request</span>\n    <span class="token comment">// &lt;ver&gt; &lt;cmd&gt; &lt;args...&gt;</span>\n    <span class="token function">writeString</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token constant">PROTOCOL_VERSION</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">writeString</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span>int i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">writeString</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token punctuation">(</span>String<span class="token punctuation">)</span>args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token function">writeString</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// Create an input stream to read reply</span>\n    SocketInputStream sis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SocketInputStream</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Read the command completion status</span>\n    int completionStatus <span class="token operator">=</span> <span class="token function">readInt</span><span class="token punctuation">(</span>sis<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Return the input stream so that the command output can be read</span>\n    <span class="token keyword">return</span> sis<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE3\u7801\u662F\u6700\u597D\u7684\u624B\u518C\uFF0C\u901A\u8FC7\u4EE3\u7801\u53EF\u4EE5\u77E5\u9053\uFF1A<strong>jstack\u7B49\u547D\u4EE4\u4F1A\u4E0Ejvm\u8FDB\u7A0B\u5EFA\u7ACBsocket\u8FDE\u63A5\uFF0C\u53D1\u9001\u5BF9\u5E94\u7684\u6307\u4EE4(jstack\u53D1\u9001\u4E86threaddump\u6307\u4EE4)\uFF0C\u7136\u540E\u518D\u8BFB\u53D6\u8FD4\u56DE\u7684\u6570\u636E</strong>\u3002</p>', 3);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_6,
      createBaseVNode("a", _hoisted_7, [
        _hoisted_8,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_9
    ]),
    _hoisted_10,
    createBaseVNode("p", null, [
      _hoisted_23,
      createBaseVNode("a", _hoisted_24, [
        _hoisted_25,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_26,
      createBaseVNode("a", _hoisted_27, [
        _hoisted_28,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_29
    ]),
    _hoisted_30,
    createBaseVNode("p", null, [
      _hoisted_37,
      _hoisted_38,
      _hoisted_39,
      createBaseVNode("a", _hoisted_40, [
        _hoisted_41,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_42
    ]),
    _hoisted_43
  ]);
}
var jstack_________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "jstack\u7B49\u547D\u4EE4\u7684\u5B9E\u73B0\u539F\u7406.html.vue"]]);
export { jstack_________html as default };
