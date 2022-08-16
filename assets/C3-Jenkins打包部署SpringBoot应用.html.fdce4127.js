import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="jenkins\u6253\u5305\u90E8\u7F72springboot\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#jenkins\u6253\u5305\u90E8\u7F72springboot\u5E94\u7528" aria-hidden="true">#</a> Jenkins\u6253\u5305\u90E8\u7F72SpringBoot\u5E94\u7528</h1><blockquote><p>\u8DDF\u539F\u6587\u7684\u4E3B\u8981\u533A\u522B\u662F\uFF0C\u4ED6\u7528docker\u90E8\u7F72\uFF0C\u6211\u662F\u4F20\u7EDF\u7684\u6587\u4EF6\u4E0A\u4F20\u5F62\u5F0F\uFF0C\u547D\u4EE4\u6267\u884C</p></blockquote><h2 id="_1-\u51C6\u5907\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#_1-\u51C6\u5907\u9879\u76EE" aria-hidden="true">#</a> 1. \u51C6\u5907\u9879\u76EE</h2><blockquote><p>\u8FD9\u91CC\u6211\u4EEC\u4F7F\u7528<code>mall-learning</code>\u9879\u76EE\u4E2D\u7684<code>mall-tiny-jenkins</code>\u6A21\u5757\u4EE3\u7801\u6765\u6F14\u793A\u4E0B\u5982\u4F55\u4F7FJenkins\u4E00\u952E\u6253\u5305\u90E8\u7F72SpringBoot\u5E94\u7528\u3002</p></blockquote>', 4);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("code", null, "mall-tiny-jenkins", -1);
const _hoisted_6 = /* @__PURE__ */ createTextVNode("\u9879\u76EE\u6E90\u7801\u5730\u5740\uFF1A");
const _hoisted_7 = {
  href: "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmacrozheng%2Fmall-learning%2Ftree%2Fmaster%2Fmall-tiny-jenkins",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createTextVNode("github.com/macrozheng/\u2026");
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createBaseVNode("p", null, "\u5C06mall-tiny-jenkins \u4E0A\u4F20\u5230\u6211\u4EEC\u81EA\u5DF1\u7684gitlab \u6216\u8005github \u7B49")
], -1);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("li", null, [
  /* @__PURE__ */ createBaseVNode("p", null, "\u4E0A\u4F20\u5B8C\u6210\u540EGitlab\u4E2D\u7684\u5C55\u793A\u6548\u679C\u5982\u4E0B\uFF1A"),
  /* @__PURE__ */ createBaseVNode("p", null, "\u6211\u8FD9\u91CC\u7B80\u5355\u4E0A\u4F20\u5230gitee \u505A\u6D4B\u8BD5")
], -1);
const _hoisted_11 = /* @__PURE__ */ createStaticVNode('<p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915191550138.png" alt="image-20210915191550138"></p><h2 id="_2-\u8865\u5145\u63D2\u4EF6-publish-over-ssh" tabindex="-1"><a class="header-anchor" href="#_2-\u8865\u5145\u63D2\u4EF6-publish-over-ssh" aria-hidden="true">#</a> 2. \u8865\u5145\u63D2\u4EF6 Publish Over SSH</h2><h3 id="_2-1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_2-1-\u80CC\u666F" aria-hidden="true">#</a> 2.1 \u80CC\u666F</h3><p>\u6211\u4EEC\u7ECF\u5E38\u9700\u8981\u6253\u5305\u5B8C\u540E\uFF0C\u5C06\u6587\u4EF6\u4E0A\u4F20\u5230\u670D\u52A1\u5668\u3002\u4F46\u662F</p><p>Jenkins\u914D\u7F6E\u4EFB\u52A1\u9ED8\u8BA4\u662F\u65E0 send files execute commands over SSH \u7684\u3002</p><h3 id="_2-2-\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#_2-2-\u89E3\u51B3" aria-hidden="true">#</a> 2.2 \u89E3\u51B3</h3><p>\u5B89\u88C5\u63D2\u4EF6 Publish Over SSH</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915201704009.png" alt="image-20210915201704009"></p><h3 id="_2-3-\u914D\u7F6E-ssh-servers" tabindex="-1"><a class="header-anchor" href="#_2-3-\u914D\u7F6E-ssh-servers" aria-hidden="true">#</a> 2.3 \u914D\u7F6E SSH Servers</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915202547951.png" alt="image-20210915202547951"></p><p>\u6700\u4E0B\u9762\u8BBE\u7F6E</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915202923163.png" alt="image-20210915202923163"></p><h3 id="_2-4-\u6D4B\u8BD5\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#_2-4-\u6D4B\u8BD5\u8FDE\u63A5" aria-hidden="true">#</a> 2.4 \u6D4B\u8BD5\u8FDE\u63A5</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915204217543.png" alt="image-20210915204217543"></p><h2 id="_3-\u811A\u672C\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#_3-\u811A\u672C\u8BBE\u7F6E" aria-hidden="true">#</a> 3. \u811A\u672C\u8BBE\u7F6E</h2><p>\u65B0\u5EFA\u811A\u672C deploy.sh</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>\n<span class="token comment"># author ygn</span>\n<span class="token comment"># ./deploy.sh start \u542F\u52A8</span>\n<span class="token comment"># ./deploy.sh stop \u505C\u6B62</span>\n<span class="token comment"># ./deploy.sh restart \u91CD\u542F</span>\n<span class="token comment"># ./deploy.sh status \u72B6\u6001</span>\n<span class="token assign-left variable">AppName</span><span class="token operator">=</span>mall-tiny-jenkins-1.0-SNAPSHOT.jar\n\n<span class="token comment"># JVM\u53C2\u6570</span>\n<span class="token assign-left variable">JVM_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Dname=<span class="token variable">$AppName</span>  -Duser.timezone=Asia/Shanghai -Xms512M -Xmx512M -XX:PermSize=256M -XX:MaxPermSize=512M -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGCDateStamps  -XX:+PrintGCDetails -XX:NewRatio=1 -XX:SurvivorRatio=30 -XX:+UseParallelGC -XX:+UseParallelOldGC&quot;</span>\n<span class="token assign-left variable">APP_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>\n<span class="token assign-left variable">LOG_PATH</span><span class="token operator">=</span><span class="token variable">$APP_HOME</span>/logs/<span class="token variable">$AppName</span>.log\n\n<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">then</span>\n    <span class="token builtin class-name">echo</span> -e <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[0;31m \u672A\u8F93\u5165\u64CD\u4F5C\u540D <span class="token entity" title="\\033">\\033</span>[0m  <span class="token entity" title="\\033">\\033</span>[0;34m {start|stop|restart|status} <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>\n    <span class="token builtin class-name">exit</span> <span class="token number">1</span>\n<span class="token keyword">fi</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$AppName</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">then</span>\n    <span class="token builtin class-name">echo</span> -e <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[0;31m \u672A\u8F93\u5165\u5E94\u7528\u540D <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>\n    <span class="token builtin class-name">exit</span> <span class="token number">1</span>\n<span class="token keyword">fi</span>\n\n<span class="token keyword">function</span> <span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">ps</span> -ef <span class="token operator">|</span><span class="token function">grep</span> java<span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> -v <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">`</span></span>\n\n	<span class="token keyword">if</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>\n	    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is running...&quot;</span>\n	<span class="token keyword">else</span>\n	  <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u542F\u52A8\u5B8C\u6574\u547D\u4EE4\uFF1A nohup java -jar  <span class="token variable">$JVM_OPTS</span> <span class="token variable">$AppName</span>  &gt; /dev/null 2&gt;&amp;1 &amp;&quot;</span>\n		<span class="token function">nohup</span> java -jar  <span class="token variable">$JVM_OPTS</span> <span class="token variable">$AppName</span> <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>\n		<span class="token builtin class-name">echo</span> <span class="token string">&quot;Start <span class="token variable">$AppName</span> success...&quot;</span>\n	<span class="token keyword">fi</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Stop <span class="token variable">$AppName</span>&quot;</span>\n	\n	<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>\n	<span class="token function-name function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n		<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">ps</span> -ef <span class="token operator">|</span><span class="token function">grep</span> java<span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> -v <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">`</span></span>\n	<span class="token punctuation">}</span>\n\n	query\n	<span class="token keyword">if</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>\n		<span class="token function">kill</span> -<span class="token environment constant">TERM</span> <span class="token variable">$PID</span>\n		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> (pid:<span class="token variable">$PID</span>) exiting...&quot;</span>\n		<span class="token keyword">while</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>\n		<span class="token keyword">do</span>\n			<span class="token function">sleep</span> <span class="token number">1</span>\n			query\n		<span class="token keyword">done</span>\n		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> exited.&quot;</span>\n	<span class="token keyword">else</span>\n		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> already stopped.&quot;</span>\n	<span class="token keyword">fi</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function-name function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    stop\n    <span class="token function">sleep</span> <span class="token number">2</span>\n    start\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function-name function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">ps</span> -ef <span class="token operator">|</span><span class="token function">grep</span> java<span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> -v <span class="token function">grep</span><span class="token operator">|</span><span class="token function">wc</span> -l<span class="token variable">`</span></span>\n    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$PID</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>\n        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is running...&quot;</span>\n    <span class="token keyword">else</span>\n        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is not running...&quot;</span>\n    <span class="token keyword">fi</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>\n    start<span class="token punctuation">)</span>\n    start<span class="token punctuation">;</span><span class="token punctuation">;</span>\n    stop<span class="token punctuation">)</span>\n    stop<span class="token punctuation">;</span><span class="token punctuation">;</span>\n    restart<span class="token punctuation">)</span>\n    restart<span class="token punctuation">;</span><span class="token punctuation">;</span>\n    status<span class="token punctuation">)</span>\n    status<span class="token punctuation">;</span><span class="token punctuation">;</span>\n    *<span class="token punctuation">)</span>\n\n<span class="token keyword">esac</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-\u5728jenkins\u4E2D\u521B\u5EFA\u6267\u884C\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_4-\u5728jenkins\u4E2D\u521B\u5EFA\u6267\u884C\u4EFB\u52A1" aria-hidden="true">#</a> 4. \u5728Jenkins\u4E2D\u521B\u5EFA\u6267\u884C\u4EFB\u52A1</h2><h3 id="_4-1-\u521B\u5EFA\u65B0\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_4-1-\u521B\u5EFA\u65B0\u4EFB\u52A1" aria-hidden="true">#</a> 4.1 \u521B\u5EFA\u65B0\u4EFB\u52A1</h3><ul><li><p>\u9996\u5148\u6211\u4EEC\u9700\u8981\u65B0\u5EFA\u4E00\u4E2A\u4EFB\u52A1\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192136448.png" alt="image-20210915192136448"></p></li><li><p>\u8BBE\u7F6E\u4EFB\u52A1\u540D\u79F0\u540E\u9009\u62E9\u6784\u5EFA\u4E00\u4E2A\u81EA\u7531\u98CE\u683C\u7684\u8F6F\u4EF6\u9879\u76EE\uFF1A</p></li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192225320.png" alt="image-20210915192225320"></p><h3 id="_4-2-\u914D\u7F6E\u4ED3\u5E93\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#_4-2-\u914D\u7F6E\u4ED3\u5E93\u5730\u5740" aria-hidden="true">#</a> 4.2 \u914D\u7F6E\u4ED3\u5E93\u5730\u5740</h3><ul><li><p>\u7136\u540E\u5728\u6E90\u7801\u7BA1\u7406\u4E2D\u6DFB\u52A0\u6211\u4EEC\u7684git\u4ED3\u5E93\u5730\u5740\uFF1Ahttps://gitee.com/zszdevelop/mall-tiny-jenkins.git</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194454588.png" alt="image-20210915194454588"></p></li><li><p>\u6B64\u65F6\u9700\u8981\u6DFB\u52A0\u4E00\u4E2A\u51ED\u636E\uFF0C\u4E5F\u5C31\u662F\u6211\u4EECgit\u4ED3\u5E93\u7684\u8D26\u53F7\u5BC6\u7801\uFF1A</p></li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192628228.png" alt="image-20210915192628228"></p><h3 id="_4-3-\u6784\u5EFA\u6253\u5305" tabindex="-1"><a class="header-anchor" href="#_4-3-\u6784\u5EFA\u6253\u5305" aria-hidden="true">#</a> 4.3 \u6784\u5EFA\u6253\u5305</h3><ul><li><p>\u4E4B\u540E\u6211\u4EEC\u9700\u8981\u6DFB\u52A0\u4E00\u4E2A\u6784\u5EFA\uFF0C\u9009\u62E9\u8C03\u7528\u9876\u5C42maven\u76EE\u6807</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915192834926.png" alt="image-20210915192834926"></p></li><li><p>\u9009\u62E9\u6211\u4EEC\u7684maven\u7248\u672C\uFF0C\u7136\u540E\u8BBE\u7F6Emaven\u547D\u4EE4\u548C\u6307\u5B9Apom\u6587\u4EF6\u4F4D\u7F6E\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915193207921.png" alt="image-20210915193207921"></p></li></ul><h3 id="_4-4-\u6784\u5EFA\u540E\u7EED\u6B65\u9AA4-\u5C06\u6587\u4EF6\u53D1\u9001\u5230\u670D\u52A1\u7AEF" tabindex="-1"><a class="header-anchor" href="#_4-4-\u6784\u5EFA\u540E\u7EED\u6B65\u9AA4-\u5C06\u6587\u4EF6\u53D1\u9001\u5230\u670D\u52A1\u7AEF" aria-hidden="true">#</a> 4.4 \u6784\u5EFA\u540E\u7EED\u6B65\u9AA4\uFF08\u5C06\u6587\u4EF6\u53D1\u9001\u5230\u670D\u52A1\u7AEF\uFF09</h3><ol><li>\u9009\u62E9</li></ol><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915205201650.png" alt="image-20210915205201650"></p><ol start="2"><li><p>\u914D\u7F6E\u53D1\u9001\u5230\u8FDC\u7A0B\u7684\u4F4D\u7F6E</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915205234136.png" alt="image-20210915205234136"></p></li></ol><h3 id="_4-5-\u6784\u5EFA\u73AF\u5883-\u6784\u5EFA\u5B8C\u540E\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#_4-5-\u6784\u5EFA\u73AF\u5883-\u6784\u5EFA\u5B8C\u540E\u6267\u884C" aria-hidden="true">#</a> 4.5 \u6784\u5EFA\u73AF\u5883\uFF08\u6784\u5EFA\u5B8C\u540E\u6267\u884C\uFF09</h3><ul><li><p>\u9700\u8981\u8BBE\u7F6E\u6267\u884C\u7684shell\u547D\u4EE4\u5982\u4E0B\uFF1A/mydata/sh/mall-tiny-jenkins.sh</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194403946.png" alt="image-20210915194403946"></p></li></ul><h3 id="_4-6-\u6267\u884C\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_4-6-\u6267\u884C\u4EFB\u52A1" aria-hidden="true">#</a> 4.6 \u6267\u884C\u4EFB\u52A1</h3><ul><li>\u4E4B\u540E\u70B9\u51FB\u4FDD\u5B58\u64CD\u4F5C\uFF0C\u6211\u4EEC\u7684\u4EFB\u52A1\u5C31\u521B\u5EFA\u5B8C\u6210\u4E86\uFF0C\u5728\u4EFB\u52A1\u5217\u8868\u4E2D\u6211\u4EEC\u53EF\u4EE5\u70B9\u51FB\u8FD0\u884C\u6765\u6267\u884C\u8BE5\u4EFB\u52A1\uFF1B</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194616357.png" alt="image-20210915194616357"></p><h3 id="_4-7-\u67E5\u770B\u63A7\u5236\u53F0" tabindex="-1"><a class="header-anchor" href="#_4-7-\u67E5\u770B\u63A7\u5236\u53F0" aria-hidden="true">#</a> 4.7 \u67E5\u770B\u63A7\u5236\u53F0</h3><ul><li>\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u63A7\u5236\u53F0\u8F93\u51FA\u6765\u67E5\u770B\u6574\u4E2A\u4EFB\u52A1\u7684\u6267\u884C\u8FC7\u7A0B\uFF1A</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194756234.png" alt="image-20210915194756234"></p><h3 id="_4-8-\u67E5\u770B\u9879\u76EE\u6548\u679C" tabindex="-1"><a class="header-anchor" href="#_4-8-\u67E5\u770B\u9879\u76EE\u6548\u679C" aria-hidden="true">#</a> 4.8 \u67E5\u770B\u9879\u76EE\u6548\u679C</h3><p>\u8FD0\u884C\u6210\u529F\u540E\uFF0C\u8BBF\u95EE\u8BE5\u5730\u5740\u5373\u53EF\u67E5\u770BAPI\u6587\u6863</p><p>http://youip:8088/swagger-ui.html</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210915194921830.png" alt="image-20210915194921830"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 43);
const _hoisted_54 = {
  href: "https://juejin.cn/post/6844904022097264648",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_55 = /* @__PURE__ */ createTextVNode("\u4F7F\u7528Jenkins\u4E00\u952E\u6253\u5305\u90E8\u7F72SpringBoot\u5E94\u7528\uFF0C\u5C31\u662F\u8FD9\u4E486\uFF01");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("p", null, [
          _hoisted_5,
          _hoisted_6,
          createBaseVNode("a", _hoisted_7, [
            _hoisted_8,
            createVNode(_component_ExternalLinkIcon)
          ])
        ])
      ]),
      _hoisted_9,
      _hoisted_10
    ]),
    _hoisted_11,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_54, [
        _hoisted_55,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var C3Jenkins____SpringBoot___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C3-Jenkins\u6253\u5305\u90E8\u7F72SpringBoot\u5E94\u7528.html.vue"]]);
export { C3Jenkins____SpringBoot___html as default };
