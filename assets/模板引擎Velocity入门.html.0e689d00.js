import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u6A21\u677F\u5F15\u64CEvelocity\u5165\u95E8" tabindex="-1"><a class="header-anchor" href="#\u6A21\u677F\u5F15\u64CEvelocity\u5165\u95E8" aria-hidden="true">#</a> \u6A21\u677F\u5F15\u64CEVelocity\u5165\u95E8</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>Velocity\u662F\u4E00\u4E2A\u57FA\u4E8Ejava\u7684\u6A21\u677F\u5F15\u64CE\uFF08template engine\uFF09\u3002\u5B83\u5141\u8BB8\u4EFB\u4F55\u4EBA\u4EC5\u4EC5\u7B80\u5355\u7684\u4F7F\u7528\u6A21\u677F\u8BED\u8A00\uFF08template language\uFF09\u6765\u5F15\u7528\u7531java\u4EE3\u7801\u5B9A\u4E49\u7684\u5BF9\u8C61\u3002</p><h3 id="_1-1-\u5E94\u7528\u9886\u57DF" tabindex="-1"><a class="header-anchor" href="#_1-1-\u5E94\u7528\u9886\u57DF" aria-hidden="true">#</a> 1.1 \u5E94\u7528\u9886\u57DF</h3><ol><li><p>web\u5F00\u53D1\u9886\u57DF</p><p>\u5F53Velocity\u5E94\u7528\u4E8Eweb\u5F00\u53D1\u65F6\uFF0C\u754C\u9762\u8BBE\u8BA1\u4EBA\u5458\u53EF\u4EE5\u548Cjava\u7A0B\u5E8F\u5F00\u53D1\u4EBA\u5458\u540C\u6B65\u5F00\u53D1\u4E00\u4E2A\u9075\u5FAAMVC\u67B6\u6784\u7684web\u7AD9\u70B9\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u9875\u9762\u8BBE\u8BA1\u4EBA\u5458\u53EF\u4EE5\u53EA \u5173\u6CE8\u9875\u9762\u7684\u663E\u793A\u6548\u679C\uFF0C\u800C\u7531java\u7A0B\u5E8F\u5F00\u53D1\u4EBA\u5458\u5173\u6CE8\u4E1A\u52A1\u903B\u8F91\u7F16\u7801\u3002Velocity\u5C06java\u4EE3\u7801\u4ECEweb\u9875\u9762\u4E2D\u5206\u79BB\u51FA\u6765\uFF0C\u8FD9\u6837\u4E3Aweb\u7AD9\u70B9\u7684\u957F\u671F\u7EF4\u62A4\u63D0 \u4F9B\u4E86\u4FBF\u5229\uFF0C\u540C\u65F6\u4E5F\u4E3A\u6211\u4EEC\u5728JSP\u548CPHP\u4E4B\u5916\u53C8\u63D0\u4F9B\u4E86\u4E00\u79CD\u53EF\u9009\u7684\u65B9\u6848\u3002</p></li><li><p>\u6A21\u677F\u5DE5\u5177</p><p>\u5B83\u53EF\u4EE5\u4ECE\u6A21\u677F\uFF08template\uFF09\u4EA7\u751FSQL\u548CPostScript\u3001XML\uFF0C\u5B83\u4E5F\u53EF\u4EE5\u88AB<strong>\u5F53\u4F5C\u4E00\u4E2A\u72EC\u7ACB\u5DE5\u5177\u6765\u4EA7\u751F\u6E90\u4EE3\u7801\u548C\u62A5\u544A</strong>\uFF0C\u6216\u8005\u4F5C\u4E3A\u5176\u4ED6\u7CFB\u7EDF\u7684\u96C6\u6210\u7EC4\u4EF6\u4F7F\u7528\u3002</p></li></ol><h2 id="_2-\u96C6\u6210\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_2-\u96C6\u6210\u4F7F\u7528" aria-hidden="true">#</a> 2. \u96C6\u6210\u4F7F\u7528</h2><h3 id="_2-1-pom\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#_2-1-pom\u4F9D\u8D56" aria-hidden="true">#</a> 2.1 pom\u4F9D\u8D56</h3><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.velocity<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>velocity<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-velocityhelloworld-java" tabindex="-1"><a class="header-anchor" href="#_2-2-velocityhelloworld-java" aria-hidden="true">#</a> 2.2 <strong>VelocityHelloWorld.java</strong></h3><ol><li>\u521D\u59CB\u5316 Velocity \u3002</li><li>\u521B\u5EFA\u4E00\u4E2A\u4E0A\u4E0B\u6587\u5BF9\u8C61\u3002</li><li>\u6DFB\u52A0\u4F60\u7684\u6570\u636E\u5BF9\u8C61\u5230\u4E0A\u4E0B\u6587\u3002</li><li>\u9009\u62E9\u4E00\u4E2A\u6A21\u677F\u3002</li><li>\u5C06\u4F60\u7684\u6570\u636E\u4E0E\u6A21\u677F\u5408\u5E76\uFF0C\u4EA7\u751F\u8F93\u51FA\u5185\u5BB9\u3002</li></ol><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VelocityHelloWorld</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">/* 1.\u521D\u59CB\u5316 Velocity */</span>\n        <span class="token class-name">VelocityEngine</span> velocityEngine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VelocityEngine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        velocityEngine<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">VelocityEngine</span><span class="token punctuation">.</span>RESOURCE_LOADER<span class="token punctuation">,</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        velocityEngine<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">VelocityEngine</span><span class="token punctuation">.</span>FILE_RESOURCE_LOADER_PATH<span class="token punctuation">,</span> <span class="token string">&quot;/Users/zsz/Project/demo/2021year/10yue/velocity-demo/src/main/resources&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token comment">// \u89E3\u51B3\u4E2D\u6587\u4E71\u7801\u95EE\u9898	</span>\n        velocityEngine<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">Velocity</span><span class="token punctuation">.</span>INPUT_ENCODING<span class="token punctuation">,</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        velocityEngine<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">Velocity</span><span class="token punctuation">.</span>OUTPUT_ENCODING<span class="token punctuation">,</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        velocityEngine<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/* 2.\u521B\u5EFA\u4E00\u4E2A\u4E0A\u4E0B\u6587\u5BF9\u8C61 */</span>\n        <span class="token class-name">VelocityContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VelocityContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/* 3.\u6DFB\u52A0\u4F60\u7684\u6570\u636E\u5BF9\u8C61\u5230\u4E0A\u4E0B\u6587 */</span>\n        context<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;zsz&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        context<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;project&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Velocity&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/* 4.\u9009\u62E9\u4E00\u4E2A\u6A21\u677F */</span>\n        <span class="token class-name">Template</span> template <span class="token operator">=</span> velocityEngine<span class="token punctuation">.</span><span class="token function">getTemplate</span><span class="token punctuation">(</span><span class="token string">&quot;templates/hello.vm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">/* 5.\u5C06\u4F60\u7684\u6570\u636E\u4E0E\u6A21\u677F\u5408\u5E76\uFF0C\u4EA7\u751F\u8F93\u51FA\u5185\u5BB9 */</span>\n        <span class="token class-name">StringWriter</span> sw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        template<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> sw<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;final output:\\n&quot;</span> <span class="token operator">+</span> sw<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-hello-vm" tabindex="-1"><a class="header-anchor" href="#_2-3-hello-vm" aria-hidden="true">#</a> 2.3 <strong>hello.vm</strong></h3><p>\u5728\u4F60\u7684 resources (\u4E00\u822C\u8DEF\u5F84\u4E3A<code>src/main/resources</code>) \u76EE\u5F55\u4E0B\u521B\u5EFA <code>templates/helloVelocity.vm</code> \u6587\u4EF6\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Hello World! The first velocity demo.\nName is $name.\nProject is $project\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-\u8F93\u51FA" tabindex="-1"><a class="header-anchor" href="#_2-4-\u8F93\u51FA" aria-hidden="true">#</a> 2.4 \u8F93\u51FA</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>final output:\nHello World! The first velocity demo.\nName is zsz.\nProject is Velocity\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-velocity-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-velocity-\u8BED\u6CD5" aria-hidden="true">#</a> 3. Velocity \u8BED\u6CD5</h2><h3 id="_3-1-\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#_3-1-\u6CE8\u91CA" aria-hidden="true">#</a> 3.1 \u6CE8\u91CA</h3><p>\u5355\u884C\u6CE8\u91CA</p><p>\u4EE5 <code>##</code> \u5F00\u5934\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token velocity-comment comment">## This is a single line comment.</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u591A\u884C\u6CE8\u91CA</p><p>\u4EE5 <code>#*</code> \u5F00\u5934\uFF0C\u4EE5 <code>*#</code> \u7ED3\u5C3E\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token velocity-comment comment">#*\n  Thus begins a multi-line comment. Online visitors won&#39;t\n  see this text because the Velocity Templating Engine will\n  ignore it.\n*#</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-\u53D8\u91CF-variables" tabindex="-1"><a class="header-anchor" href="#_3-2-\u53D8\u91CF-variables" aria-hidden="true">#</a> 3.2 \u53D8\u91CF(Variables)</h3><p>\u548C\u6211\u4EEC\u6240\u719F\u77E5\u7684\u5176\u4ED6\u7F16\u7A0B\u8BED\u8A00\u4E00\u6837\uFF0CVelocity \u4E5F\u53EF\u4EE5\u5728\u6A21\u677F\u6587\u4EF6\u4E2D\u6709\u53D8\u91CF\u7684\u6982\u5FF5\u3002</p><p>\u53D8\u91CF\u4EE5 <code>$</code> \u5F00\u5934\uFF0C\u9996\u5B57\u6BCD\u5FC5\u987B\u662F\u82F1\u6587\u5B57\u6BCD\u3002\u53D8\u91CF\u5141\u8BB8\u7684\u5B57\u7B26\u4E3A\u4EE5\u4E0B\u51E0\u79CD\u7C7B\u578B\uFF1A</p><ul><li>\u5B57\u6BCD(a .. z, A .. Z)</li><li>\u6570\u5B57(0 .. 9)</li><li>\u8FDE\u5B57\u7B26(&quot;-&quot;)</li><li>\u4E0B\u5212\u7EBF(&quot;_&quot;)</li></ul><p>\u6709\u6548\u8303\u4F8B\uFF1A</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token variable">$foo</span>\n<span class="token variable">$mudSlinger</span>\n<span class="token variable">$mud-slinger</span>\n<span class="token variable">$mud_slinger</span>\n<span class="token variable">$mudSlinger1</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-1-\u53D8\u91CF\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#_3-2-1-\u53D8\u91CF\u5B9A\u4E49" aria-hidden="true">#</a> 3.2.1 \u53D8\u91CF\u5B9A\u4E49</h4><p>\u53EF\u4EE5\u4F7F\u7528 <code>#set</code> \u6765\u4E3A\u53D8\u91CF\u5B9A\u4E49\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token directive"><span class="token keyword">#set</span><span class="token punctuation">(</span> <span class="token variable">$foo</span> <span class="token operator">=</span> <span class="token string">&quot;bar&quot;</span> <span class="token punctuation">)</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-\u5C5E\u6027-properties" tabindex="-1"><a class="header-anchor" href="#_3-3-\u5C5E\u6027-properties" aria-hidden="true">#</a> 3.3 \u5C5E\u6027(Properties)</h3><p>\u5C5E\u6027\u4EE5 <code>$</code> \u5F00\u5934\uFF0C\u6807\u8BC6\u7B26\u95F4\u4EE5 <code>.</code> \u5206\u9694\u3002</p><p>\u6709\u6548\u8303\u4F8B\uFF1A</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token variable">$customer<span class="token punctuation">.</span>Address</span>\n<span class="token variable">$purchase<span class="token punctuation">.</span>Total</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-\u51FD\u6570-methods" tabindex="-1"><a class="header-anchor" href="#_3-4-\u51FD\u6570-methods" aria-hidden="true">#</a> 3.4 \u51FD\u6570(Methods)</h3><p>\u6709\u6548\u8303\u4F8B\uFF1A</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token velocity-comment comment">## \u65E0\u53C2\u6570</span>\n<span class="token variable">$customer<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>\n<span class="token variable">$purchase<span class="token punctuation">.</span><span class="token function">getTotal</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>\n<span class="token velocity-comment comment">## \u5355\u4E2A\u53C2\u6570</span>\n<span class="token variable">$page<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span> <span class="token string">&quot;My Home Page&quot;</span> <span class="token punctuation">)</span></span>\n<span class="token velocity-comment comment">## \u53C2\u6570\u5217\u8868</span>\n<span class="token variable">$person<span class="token punctuation">.</span><span class="token function">setAttributes</span><span class="token punctuation">(</span> <span class="token punctuation">[</span><span class="token string">&quot;Strange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Weird&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Excited&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">)</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-1-velocity-1-6-\u5F00\u59CB\u652F\u6301\u91CD\u8F7D\u51FD\u6570\u3002" tabindex="-1"><a class="header-anchor" href="#_3-4-1-velocity-1-6-\u5F00\u59CB\u652F\u6301\u91CD\u8F7D\u51FD\u6570\u3002" aria-hidden="true">#</a> 3.4.1 Velocity 1.6 \u5F00\u59CB\u652F\u6301\u91CD\u8F7D\u51FD\u6570\u3002</h4><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token variable">$sun<span class="token punctuation">.</span><span class="token function">setPlanets</span><span class="token punctuation">(</span><span class="token string">&#39;Earth&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Mars&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Neptune&#39;</span><span class="token punctuation">)</span></span>\n<span class="token variable">$sun<span class="token punctuation">.</span><span class="token function">setPlanets</span><span class="token punctuation">(</span><span class="token string">&#39;Mercury&#39;</span><span class="token punctuation">)</span></span>\n<span class="token variable">$sun<span class="token punctuation">.</span><span class="token function">setPlanets</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-\u6761\u4EF6\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#_3-5-\u6761\u4EF6\u8BED\u53E5" aria-hidden="true">#</a> 3.5 \u6761\u4EF6\u8BED\u53E5</h3><p>\u6761\u4EF6\u8BED\u53E5\u5FC5\u987B\u4EE5 <code>#if</code> \u5F00\u59CB\uFF0C\u4EE5 <code>#end</code> \u7ED3\u5C3E\u3002</p><p>\u7528\u6CD5\u4E0EJava\u4E2D\u7684\u6761\u4EF6\u8BED\u53E5\u6781\u5176\u76F8\u4F3C\uFF0C\u770B\u770B\u4F8B\u5B50\u5C31\u80FD\u61C2\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token directive"><span class="token keyword">#if</span><span class="token punctuation">(</span> <span class="token variable">$foo</span> <span class="token punctuation">)</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">&gt;</span></span>Velocity!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">&gt;</span></span>\n<span class="token directive"><span class="token keyword">#end</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF1AVelocity\u4E2D\u7684 <code>==</code> \u7684\u8BED\u4E49\u4E0EJava\u7565\u6709\u4E0D\u540C\uFF0C\u5176\u4E2D <code>==</code> \u53EA\u80FD\u7528\u4E8E\u6D4B\u8BD5\u5BF9\u8C61\u7684\u76F8\u7B49\u6027\u3002\u5728Velocity\u4E2D\uFF0C\u7B49\u6548\u8FD0\u7B97\u7B26\u53EF\u4EE5\u7528\u4E8E\u76F4\u63A5\u6BD4\u8F83\u6570\u5B57\uFF0C\u5B57\u7B26\u4E32\u6216\u5BF9\u8C61\u3002\u5F53\u5BF9\u8C61\u5177\u6709\u4E0D\u540C\u7684\u7C7B\u65F6\uFF0C\u901A\u8FC7\u4E3A\u6BCF\u4E2A\u5BF9\u8C61\u8C03\u7528 toString() \u7136\u540E\u6BD4\u8F83\u6765\u83B7\u5F97\u5B57\u7B26\u4E32\u8868\u793A\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token directive"><span class="token keyword">#set</span> <span class="token punctuation">(</span><span class="token variable">$foo</span> <span class="token operator">=</span> <span class="token string">&quot;north&quot;</span><span class="token punctuation">)</span></span>\n<span class="token directive"><span class="token keyword">#set</span> <span class="token punctuation">(</span><span class="token variable">$bar</span> <span class="token operator">=</span> <span class="token string">&quot;north&quot;</span><span class="token punctuation">)</span></span>\n\n<span class="token directive"><span class="token keyword">#if</span><span class="token punctuation">(</span> <span class="token variable">$foo</span> <span class="token operator">==</span> <span class="token variable">$bar</span> <span class="token punctuation">)</span></span>\n    **Go North**\n<span class="token directive"><span class="token keyword">#elseif</span><span class="token punctuation">(</span> <span class="token variable">$foo</span> <span class="token operator">==</span> <span class="token string">&quot;east&quot;</span> <span class="token punctuation">)</span></span>\n    **Go East**\n<span class="token directive"><span class="token keyword">#elseif</span><span class="token punctuation">(</span> <span class="token variable">$bar</span> <span class="token operator">==</span> <span class="token string">&quot;south&quot;</span> <span class="token punctuation">)</span></span>\n    **Go South**\n<span class="token directive"><span class="token keyword">#else</span></span>\n    **Go West**\n<span class="token directive"><span class="token keyword">#end</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Velocity \u4E2D\u7684\u6761\u4EF6\u8BED\u53E5\u4E5F\u53EF\u4EE5\u4F7F\u7528\u4E0E\u3001\u6216\u3001\u975E\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token directive"><span class="token keyword">#if</span><span class="token punctuation">(</span> <span class="token variable">$foo</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$bar</span> <span class="token punctuation">)</span></span>\n    **This AND That**\n<span class="token directive"><span class="token keyword">#end</span></span>\n<span class="token directive"><span class="token keyword">#if</span><span class="token punctuation">(</span> <span class="token variable">$foo</span> <span class="token operator">||</span> <span class="token variable">$bar</span> <span class="token punctuation">)</span></span>\n    **This OR That**\n<span class="token directive"><span class="token keyword">#end</span></span>\n<span class="token directive"><span class="token keyword">#if</span><span class="token punctuation">(</span> <span class="token operator">!</span><span class="token variable">$foo</span> <span class="token punctuation">)</span></span>\n    **NOT that**\n<span class="token directive"><span class="token keyword">#end</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#_3-6-\u5FAA\u73AF" aria-hidden="true">#</a> 3.6 \u5FAA\u73AF</h3><p><code>#foreach</code> \u7528\u6765\u63A7\u5236\u4E00\u4E2A\u5FAA\u73AF\u8BED\u53E5\u3002</p><p><code>#foreach</code> \u652F\u6301\u904D\u5386\u4E00\u4E2A Vector\u3001Hashtable \u6216 Array \u5BF9\u8C61\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>\n<span class="token directive"><span class="token keyword">#foreach</span><span class="token punctuation">(</span> <span class="token variable">$key</span> <span class="token keyword">in</span> <span class="token variable">$allProducts<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span> <span class="token punctuation">)</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Key: <span class="token variable">$key</span> -&gt; Value: <span class="token variable">$allProducts<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>$key<span class="token punctuation">)</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n<span class="token directive"><span class="token keyword">#end</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u4F7F\u7528 <code>#break</code> \u8DF3\u51FA\u5FAA\u73AF\u3002<code>$foreach.count</code> \u8868\u793A\u5FAA\u73AF\u6B21\u6570\u3002</p><div class="language-velocity ext-velocity line-numbers-mode"><pre class="language-velocity"><code><span class="token velocity-comment comment">## list first 5 customers only</span>\n<span class="token directive"><span class="token keyword">#foreach</span><span class="token punctuation">(</span> <span class="token variable">$customer</span> <span class="token keyword">in</span> <span class="token variable">$customerList</span> <span class="token punctuation">)</span></span>\n    <span class="token directive"><span class="token keyword">#if</span><span class="token punctuation">(</span> <span class="token variable">$foreach<span class="token punctuation">.</span>count</span> <span class="token operator">&gt;</span> <span class="token number">5</span> <span class="token punctuation">)</span></span>\n        <span class="token directive"><span class="token keyword">#break</span></span>\n    <span class="token directive"><span class="token keyword">#end</span></span>\n    <span class="token variable">$customer<span class="token punctuation">.</span>Name</span>\n<span class="token directive"><span class="token keyword">#end</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7-\u5B8F" tabindex="-1"><a class="header-anchor" href="#_3-7-\u5B8F" aria-hidden="true">#</a> 3.7 \u5B8F</h3><p>Velocity \u4E2D\u7684\u5B8F\u53EF\u4EE5\u7406\u89E3\u4E3A\u51FD\u6570\u5B9A\u4E49\u3002\u5B9A\u4E49\u7684\u8BED\u6CD5\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#macro(macroName arg1 arg2 \u2026)</span>\n<span class="token punctuation">..</span>.\n<span class="token comment">#end</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8C03\u7528\u8FD9\u4E2A\u5B8F\u7684\u8BED\u6CD5\u662F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#macroName(arg1 arg2 \u2026)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u7684\u53C2\u6570\u4E4B\u95F4\u4F7F\u7528\u7A7A\u683C\u9694\u5F00\uFF0C\u4E0B\u9762\u662F\u5B9A\u4E49\u548C\u4F7F\u7528 Velocity \u5B8F\u7684\u4F8B\u5B50\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#macro(sayHello $name)</span>\nhello <span class="token variable">$name</span>\n<span class="token comment">#end</span>\n<span class="token comment">#sayHello(\u201Cvelocity\u201D)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7684\u7ED3\u679C\u4E3A hello velocity</p><h3 id="_3-8-parse-\u548C-include" tabindex="-1"><a class="header-anchor" href="#_3-8-parse-\u548C-include" aria-hidden="true">#</a> 3.8 #parse \u548C #include</h3><p>#parse \u548C #include \u6307\u4EE4\u7684\u529F\u80FD\u90FD\u662F\u5728\u5916\u90E8\u5F15\u7528\u6587\u4EF6\uFF0C\u800C\u4E24\u8005\u7684\u533A\u522B\u662F\uFF0C#parse \u4F1A\u5C06\u5F15\u7528\u7684\u5185\u5BB9\u5F53\u6210\u7C7B\u4F3C\u4E8E\u6E90\u7801\u6587\u4EF6\uFF0C\u4F1A\u5C06\u5185\u5BB9\u5728\u5F15\u5165\u7684\u5730\u65B9\u8FDB\u884C\u89E3\u6790\uFF0C#include \u662F\u5C06\u5F15\u5165\u6587\u4EF6\u5F53\u6210\u8D44\u6E90\u6587\u4EF6\uFF0C\u4F1A\u5C06\u5F15\u5165\u5185\u5BB9\u539F\u5C01\u4E0D\u52A8\u5730\u4EE5\u6587\u672C\u8F93\u51FA\u3002\u5206\u522B\u770B\u4EE5\u4E0B\u4F8B\u5B50\uFF1A</p><p>foo.vm \u6587\u4EF6\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#set($name =\u201Cvelocity\u201D)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>parse.vm\uFF1A</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>#<span class="token function">parse</span><span class="token punctuation">(</span>\u201Cfoo.vm\u201D<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7ED3\u679C\u4E3A\uFF1Avelocity</p><p>include.vm\uFF1A</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token expression"><span class="token punctuation">(</span>\u201Cfoo<span class="token punctuation">.</span>vm\u201D<span class="token punctuation">)</span></span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7ED3\u679C\u4E3A\uFF1A#set($name =\u201Cvelocity\u201D)</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 75);
const _hoisted_76 = {
  href: "https://www.jianshu.com/p/378827f1dfc8",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_77 = /* @__PURE__ */ createTextVNode("\u6A21\u677F\u5F15\u64CEvelocity");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_76, [
        _hoisted_77,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var ____Velocity___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u6A21\u677F\u5F15\u64CEVelocity\u5165\u95E8.html.vue"]]);
export { ____Velocity___html as default };
