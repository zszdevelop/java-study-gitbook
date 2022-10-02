import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c,a as n,b as e,d as s,e as p,r as i}from"./app.296fdb6c.js";const l={},r=n("h1",{id:"\u8C03\u8BD5\u6392\u9519-java-\u5185\u5B58\u5206\u6790\u4E4B\u5806\u5916\u5185\u5B58",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u8C03\u8BD5\u6392\u9519-java-\u5185\u5B58\u5206\u6790\u4E4B\u5806\u5916\u5185\u5B58","aria-hidden":"true"},"#"),s(" \u8C03\u8BD5\u6392\u9519 - Java \u5185\u5B58\u5206\u6790\u4E4B\u5806\u5916\u5185\u5B58")],-1),u=s("Java \u5806\u5916\u5185\u5B58\u5206\u6790\u76F8\u5BF9\u6765\u8BF4\u662F\u590D\u6742\u7684\uFF0C\u7F8E\u56E2\u6280\u672F\u56E2\u961F\u7684"),d={href:"https://tech.meituan.com/2019/01/03/spring-boot-native-memory-leak.html",target:"_blank",rel:"noopener noreferrer"},k=s("Spring Boot\u5F15\u8D77\u7684\u201C\u5806\u5916\u5185\u5B58\u6CC4\u6F0F\u201D\u6392\u67E5\u53CA\u7ECF\u9A8C\u603B\u7ED3"),m=s("\u53EF\u4EE5\u4E3A\u5F88\u591ANative Code\u5185\u5B58\u6CC4\u6F0F/\u5360\u7528\u63D0\u4F9B\u65B9\u5411\u6027\u6307\u5F15\u3002"),g=p('<h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u4E3A\u4E86\u66F4\u597D\u5730\u5B9E\u73B0\u5BF9\u9879\u76EE\u7684\u7BA1\u7406\uFF0C\u6211\u4EEC\u5C06\u7EC4\u5185\u4E00\u4E2A\u9879\u76EE\u8FC1\u79FB\u5230MDP\u6846\u67B6\uFF08\u57FA\u4E8ESpring Boot\uFF09\uFF0C\u968F\u540E\u6211\u4EEC\u5C31\u53D1\u73B0\u7CFB\u7EDF\u4F1A\u9891\u7E41\u62A5\u51FASwap\u533A\u57DF\u4F7F\u7528\u91CF\u8FC7\u9AD8\u7684\u5F02\u5E38\u3002\u7B14\u8005\u88AB\u53EB\u53BB\u5E2E\u5FD9\u67E5\u770B\u539F\u56E0\uFF0C\u53D1\u73B0\u914D\u7F6E\u4E864G\u5806\u5185\u5185\u5B58\uFF0C\u4F46\u662F\u5B9E\u9645\u4F7F\u7528\u7684\u7269\u7406\u5185\u5B58\u7ADF\u7136\u9AD8\u8FBE7G\uFF0C\u786E\u5B9E\u4E0D\u6B63\u5E38\u3002JVM\u53C2\u6570\u914D\u7F6E\u662F\u201C-XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:+AlwaysPreTouch -XX:ReservedCodeCacheSize=128m -XX:InitialCodeCacheSize=128m, -Xss512k -Xmx4g -Xms4g,-XX:+UseG1GC -XX:G1HeapRegionSize=4M\u201D\uFF0C\u5B9E\u9645\u4F7F\u7528\u7684\u7269\u7406\u5185\u5B58\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825215559298.png" alt="image-20220825215559298" loading="lazy"></p><h2 id="_2-\u6392\u67E5\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#_2-\u6392\u67E5\u8FC7\u7A0B" aria-hidden="true">#</a> 2. \u6392\u67E5\u8FC7\u7A0B</h2><h3 id="_2-1-\u4F7F\u7528java\u5C42\u9762\u7684\u5DE5\u5177\u5B9A\u4F4D\u5185\u5B58\u533A\u57DF" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4F7F\u7528java\u5C42\u9762\u7684\u5DE5\u5177\u5B9A\u4F4D\u5185\u5B58\u533A\u57DF" aria-hidden="true">#</a> 2.1 \u4F7F\u7528Java\u5C42\u9762\u7684\u5DE5\u5177\u5B9A\u4F4D\u5185\u5B58\u533A\u57DF</h3><blockquote><p>\u4F7F\u7528Java\u5C42\u9762\u7684\u5DE5\u5177\u53EF\u4EE5\u5B9A\u4F4D\u51FA\u5806\u5185\u5185\u5B58\u3001Code\u533A\u57DF\u6216\u8005\u4F7F\u7528unsafe.allocateMemory\u548CDirectByteBuffer\u7533\u8BF7\u7684\u5806\u5916\u5185\u5B58</p></blockquote><p>\u7B14\u8005\u5728\u9879\u76EE\u4E2D\u6DFB\u52A0<code>-XX:NativeMemoryTracking=detailJVM</code>\u53C2\u6570\u91CD\u542F\u9879\u76EE\uFF0C\u4F7F\u7528\u547D\u4EE4<code>jcmd pid VM.native_memory detail</code>\u67E5\u770B\u5230\u7684\u5185\u5B58\u5206\u5E03\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825215747039.png" alt="image-20220825215747039" loading="lazy"></p><p>\u53D1\u73B0\u547D\u4EE4\u663E\u793A\u7684committed\u7684\u5185\u5B58\u5C0F\u4E8E\u7269\u7406\u5185\u5B58\uFF0C\u56E0\u4E3Ajcmd\u547D\u4EE4\u663E\u793A\u7684\u5185\u5B58\u5305\u542B\u5806\u5185\u5185\u5B58\u3001Code\u533A\u57DF\u3001\u901A\u8FC7unsafe.allocateMemory\u548CDirectByteBuffer\u7533\u8BF7\u7684\u5185\u5B58\uFF0C<strong>\u4F46\u662F\u4E0D\u5305\u542B\u5176\u4ED6Native Code\uFF08C\u4EE3\u7801\uFF09\u7533\u8BF7\u7684\u5806\u5916\u5185\u5B58\u3002\u6240\u4EE5\u731C\u6D4B\u662F\u4F7F\u7528Native Code\u7533\u8BF7\u5185\u5B58\u6240\u5BFC\u81F4\u7684\u95EE\u9898</strong>\u3002</p><p>\u4E3A\u4E86\u9632\u6B62\u8BEF\u5224\uFF0C\u7B14\u8005\u4F7F\u7528\u4E86pmap\u67E5\u770B\u5185\u5B58\u5206\u5E03\uFF0C\u53D1\u73B0\u5927\u91CF\u768464M\u7684\u5730\u5740\uFF1B\u800C\u8FD9\u4E9B\u5730\u5740\u7A7A\u95F4\u4E0D\u5728jcmd\u547D\u4EE4\u6240\u7ED9\u51FA\u7684\u5730\u5740\u7A7A\u95F4\u91CC\u9762\uFF0C\u57FA\u672C\u4E0A\u5C31\u65AD\u5B9A\u5C31\u662F\u8FD9\u4E9B64M\u7684\u5185\u5B58\u6240\u5BFC\u81F4\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825215847183.png" alt="image-20220825215847183" loading="lazy"></p><h3 id="_2-2-\u4F7F\u7528\u7CFB\u7EDF\u5C42\u9762\u7684\u5DE5\u5177\u5B9A\u4F4D\u5806\u5916\u5185\u5B58" tabindex="-1"><a class="header-anchor" href="#_2-2-\u4F7F\u7528\u7CFB\u7EDF\u5C42\u9762\u7684\u5DE5\u5177\u5B9A\u4F4D\u5806\u5916\u5185\u5B58" aria-hidden="true">#</a> 2.2 \u4F7F\u7528\u7CFB\u7EDF\u5C42\u9762\u7684\u5DE5\u5177\u5B9A\u4F4D\u5806\u5916\u5185\u5B58</h3><p>\u56E0\u4E3A\u7B14\u8005\u5DF2\u7ECF\u57FA\u672C\u4E0A\u786E\u5B9A\u662FNative Code\u6240\u5F15\u8D77\uFF0C\u800CJava\u5C42\u9762\u7684\u5DE5\u5177\u4E0D\u4FBF\u4E8E\u6392\u67E5\u6B64\u7C7B\u95EE\u9898\uFF0C\u53EA\u80FD\u4F7F\u7528\u7CFB\u7EDF\u5C42\u9762\u7684\u5DE5\u5177\u53BB\u5B9A\u4F4D\u95EE\u9898\u3002</p><h4 id="_2-2-1-\u9996\u5148-\u4F7F\u7528\u4E86gperftools\u53BB\u5B9A\u4F4D\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_2-2-1-\u9996\u5148-\u4F7F\u7528\u4E86gperftools\u53BB\u5B9A\u4F4D\u95EE\u9898" aria-hidden="true">#</a> 2.2.1 \u9996\u5148\uFF0C\u4F7F\u7528\u4E86gperftools\u53BB\u5B9A\u4F4D\u95EE\u9898</h4><p>gperftools\u7684\u4F7F\u7528\u65B9\u6CD5\u53EF\u4EE5\u53C2\u8003gperftools\uFF0Cgperftools\u7684\u76D1\u63A7\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825215952863.png" alt="image-20220825215952863" loading="lazy"></p><p>\u4ECE\u4E0A\u56FE\u53EF\u4EE5\u770B\u51FA\uFF1A\u4F7F\u7528malloc\u7533\u8BF7\u7684\u7684\u5185\u5B58\u6700\u9AD8\u52303G\u4E4B\u540E\u5C31\u91CA\u653E\u4E86\uFF0C\u4E4B\u540E\u59CB\u7EC8\u7EF4\u6301\u5728700M-800M\u3002\u7B14\u8005\u7B2C\u4E00\u53CD\u5E94\u662F\uFF1A\u96BE\u9053Native Code\u4E2D\u6CA1\u6709\u4F7F\u7528malloc\u7533\u8BF7\uFF0C\u76F4\u63A5\u4F7F\u7528mmap/brk\u7533\u8BF7\u7684\uFF1F\uFF08gperftools\u539F\u7406\u5C31\u4F7F\u7528\u52A8\u6001\u94FE\u63A5\u7684\u65B9\u5F0F\u66FF\u6362\u4E86\u64CD\u4F5C\u7CFB\u7EDF\u9ED8\u8BA4\u7684\u5185\u5B58\u5206\u914D\u5668\uFF08glibc\uFF09\u3002\uFF09</p><h4 id="_2-2-2-\u7136\u540E-\u4F7F\u7528strace\u53BB\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#_2-2-2-\u7136\u540E-\u4F7F\u7528strace\u53BB\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528" aria-hidden="true">#</a> 2.2.2 \u7136\u540E\uFF0C\u4F7F\u7528strace\u53BB\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528</h4><p>\u56E0\u4E3A\u4F7F\u7528gperftools\u6CA1\u6709\u8FFD\u8E2A\u5230\u8FD9\u4E9B\u5185\u5B58\uFF0C\u4E8E\u662F\u76F4\u63A5\u4F7F\u7528\u547D\u4EE4\u201Cstrace -f -e\u201Dbrk,mmap,munmap\u201D -p pid\u201D\u8FFD\u8E2A\u5411OS\u7533\u8BF7\u5185\u5B58\u8BF7\u6C42\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u53D1\u73B0\u6709\u53EF\u7591\u5185\u5B58\u7533\u8BF7\u3002strace\u76D1\u63A7\u5982\u4E0B\u56FE\u6240\u793A:</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220050258.png" alt="image-20220825220050258" loading="lazy"></p><h4 id="_2-2-3-\u63A5\u7740-\u4F7F\u7528gdb\u53BBdump\u53EF\u7591\u5185\u5B58" tabindex="-1"><a class="header-anchor" href="#_2-2-3-\u63A5\u7740-\u4F7F\u7528gdb\u53BBdump\u53EF\u7591\u5185\u5B58" aria-hidden="true">#</a> 2.2.3 \u63A5\u7740\uFF0C\u4F7F\u7528GDB\u53BBdump\u53EF\u7591\u5185\u5B58</h4><p>\u56E0\u4E3A\u4F7F\u7528strace\u6CA1\u6709\u8FFD\u8E2A\u5230\u53EF\u7591\u5185\u5B58\u7533\u8BF7\uFF1B\u4E8E\u662F\u60F3\u7740\u770B\u770B\u5185\u5B58\u4E2D\u7684\u60C5\u51B5\u3002\u5C31\u662F\u76F4\u63A5\u4F7F\u7528\u547D\u4EE4gdp -pid pid\u8FDB\u5165GDB\u4E4B\u540E\uFF0C\u7136\u540E\u4F7F\u7528\u547D\u4EE4dump memory mem.bin startAddress endAddressdump\u5185\u5B58\uFF0C\u5176\u4E2DstartAddress\u548CendAddress\u53EF\u4EE5\u4ECE/proc/pid/smaps\u4E2D\u67E5\u627E\u3002\u7136\u540E\u4F7F\u7528strings mem.bin\u67E5\u770Bdump\u7684\u5185\u5BB9\uFF0C\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220135272.png" alt="image-20220825220135272" loading="lazy"></p><p>\u4ECE\u5185\u5BB9\u4E0A\u6765\u770B\uFF0C\u50CF\u662F\u89E3\u538B\u540E\u7684JAR\u5305\u4FE1\u606F\u3002\u8BFB\u53D6JAR\u5305\u4FE1\u606F\u5E94\u8BE5\u662F\u5728\u9879\u76EE\u542F\u52A8\u7684\u65F6\u5019\uFF0C\u90A3\u4E48\u5728\u9879\u76EE\u542F\u52A8\u4E4B\u540E\u4F7F\u7528strace\u4F5C\u7528\u5C31\u4E0D\u662F\u5F88\u5927\u4E86\u3002\u6240\u4EE5\u5E94\u8BE5\u5728\u9879\u76EE\u542F\u52A8\u7684\u65F6\u5019\u4F7F\u7528strace\uFF0C\u800C\u4E0D\u662F\u542F\u52A8\u5B8C\u6210\u4E4B\u540E\u3002</p><h4 id="_2-2-4-\u518D\u6B21-\u9879\u76EE\u542F\u52A8\u65F6\u4F7F\u7528strace\u53BB\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#_2-2-4-\u518D\u6B21-\u9879\u76EE\u542F\u52A8\u65F6\u4F7F\u7528strace\u53BB\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528" aria-hidden="true">#</a> 2.2.4 \u518D\u6B21\uFF0C\u9879\u76EE\u542F\u52A8\u65F6\u4F7F\u7528strace\u53BB\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528</h4><p>\u9879\u76EE\u542F\u52A8\u4F7F\u7528strace\u8FFD\u8E2A\u7CFB\u7EDF\u8C03\u7528\uFF0C\u53D1\u73B0\u786E\u5B9E\u7533\u8BF7\u4E86\u5F88\u591A64M\u7684\u5185\u5B58\u7A7A\u95F4\uFF0C\u622A\u56FE\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220221582.png" alt="image-20220825220221582" loading="lazy"></p><p>\u4F7F\u7528\u8BE5mmap\u7533\u8BF7\u7684\u5730\u5740\u7A7A\u95F4\u5728pmap\u5BF9\u5E94\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220237025.png" alt="image-20220825220237025" loading="lazy"></p><h4 id="_2-2-5-\u6700\u540E-\u4F7F\u7528jstack\u53BB\u67E5\u770B\u5BF9\u5E94\u7684\u7EBF\u7A0B" tabindex="-1"><a class="header-anchor" href="#_2-2-5-\u6700\u540E-\u4F7F\u7528jstack\u53BB\u67E5\u770B\u5BF9\u5E94\u7684\u7EBF\u7A0B" aria-hidden="true">#</a> 2.2.5 \u6700\u540E\uFF0C\u4F7F\u7528jstack\u53BB\u67E5\u770B\u5BF9\u5E94\u7684\u7EBF\u7A0B</h4><p>\u56E0\u4E3Astrace\u547D\u4EE4\u4E2D\u5DF2\u7ECF\u663E\u793A\u7533\u8BF7\u5185\u5B58\u7684\u7EBF\u7A0BID\u3002\u76F4\u63A5\u4F7F\u7528\u547D\u4EE4jstack pid\u53BB\u67E5\u770B\u7EBF\u7A0B\u6808\uFF0C\u627E\u5230\u5BF9\u5E94\u7684\u7EBF\u7A0B\u6808\uFF08\u6CE8\u610F10\u8FDB\u5236\u548C16\u8FDB\u5236\u8F6C\u6362\uFF09\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220300342.png" alt="image-20220825220300342" loading="lazy"></p><p>\u8FD9\u91CC\u57FA\u672C\u4E0A\u5C31\u53EF\u4EE5\u770B\u51FA\u95EE\u9898\u6765\u4E86\uFF1AMCC\uFF08\u7F8E\u56E2\u7EDF\u4E00\u914D\u7F6E\u4E2D\u5FC3\uFF09\u4F7F\u7528\u4E86Reflections\u8FDB\u884C\u626B\u5305\uFF0C\u5E95\u5C42\u4F7F\u7528\u4E86Spring Boot\u53BB\u52A0\u8F7DJAR\u3002\u56E0\u4E3A\u89E3\u538BJAR\u4F7F\u7528Inflater\u7C7B\uFF0C\u9700\u8981\u7528\u5230\u5806\u5916\u5185\u5B58\uFF0C\u7136\u540E\u4F7F\u7528Btrace\u53BB\u8FFD\u8E2A\u8FD9\u4E2A\u7C7B\uFF0C\u6808\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220334012.png" alt="image-20220825220334012" loading="lazy"></p><p>\u7136\u540E\u67E5\u770B\u4F7F\u7528MCC\u7684\u5730\u65B9\uFF0C\u53D1\u73B0\u6CA1\u6709\u914D\u7F6E\u626B\u5305\u8DEF\u5F84\uFF0C\u9ED8\u8BA4\u662F\u626B\u63CF\u6240\u6709\u7684\u5305\u3002\u4E8E\u662F\u4FEE\u6539\u4EE3\u7801\uFF0C\u914D\u7F6E\u626B\u5305\u8DEF\u5F84\uFF0C\u53D1\u5E03\u4E0A\u7EBF\u540E\u5185\u5B58\u95EE\u9898\u89E3\u51B3\u3002</p><h3 id="_2-3-\u4E3A\u4EC0\u4E48\u5806\u5916\u5185\u5B58\u6CA1\u6709\u91CA\u653E\u6389\u5462" tabindex="-1"><a class="header-anchor" href="#_2-3-\u4E3A\u4EC0\u4E48\u5806\u5916\u5185\u5B58\u6CA1\u6709\u91CA\u653E\u6389\u5462" aria-hidden="true">#</a> 2.3 \u4E3A\u4EC0\u4E48\u5806\u5916\u5185\u5B58\u6CA1\u6709\u91CA\u653E\u6389\u5462\uFF1F</h3><p>\u867D\u7136\u95EE\u9898\u5DF2\u7ECF\u89E3\u51B3\u4E86\uFF0C\u4F46\u662F\u6709\u51E0\u4E2A\u7591\u95EE\uFF1A</p><ul><li>\u4E3A\u4EC0\u4E48\u4F7F\u7528\u65E7\u7684\u6846\u67B6\u6CA1\u6709\u95EE\u9898\uFF1F</li><li>\u4E3A\u4EC0\u4E48\u5806\u5916\u5185\u5B58\u6CA1\u6709\u91CA\u653E\uFF1F</li><li>\u4E3A\u4EC0\u4E48\u5185\u5B58\u5927\u5C0F\u90FD\u662F64M\uFF0CJAR\u5927\u5C0F\u4E0D\u53EF\u80FD\u8FD9\u4E48\u5927\uFF0C\u800C\u4E14\u90FD\u662F\u4E00\u6837\u5927\uFF1F</li><li>\u4E3A\u4EC0\u4E48gperftools\u6700\u7EC8\u663E\u793A\u4F7F\u7528\u7684\u7684\u5185\u5B58\u5927\u5C0F\u662F700M\u5DE6\u53F3\uFF0C\u89E3\u538B\u5305\u771F\u7684\u6CA1\u6709\u4F7F\u7528malloc\u7533\u8BF7\u5185\u5B58\u5417\uFF1F</li></ul>',38),v=s("\u5E26\u7740\u7591\u95EE\uFF0C\u7B14\u8005\u76F4\u63A5\u770B\u4E86\u4E00\u4E0B"),b={href:"https://github.com/spring-projects/spring-boot/tree/master/spring-boot-project/spring-boot-tools/spring-boot-loader/src/main/java/org/springframework/boot/loader",target:"_blank",rel:"noopener noreferrer"},h=s("Spring Boot Loader"),f=s("\u90A3\u4E00\u5757\u7684\u6E90\u7801\u3002\u53D1\u73B0Spring Boot\u5BF9Java JDK\u7684InflaterInputStream\u8FDB\u884C\u4E86\u5305\u88C5\u5E76\u4E14\u4F7F\u7528\u4E86Inflater\uFF0C\u800CInflater\u672C\u8EAB\u7528\u4E8E\u89E3\u538BJAR\u5305\u7684\u9700\u8981\u7528\u5230\u5806\u5916\u5185\u5B58\u3002\u800C\u5305\u88C5\u4E4B\u540E\u7684\u7C7BZipInflaterInputStream\u6CA1\u6709\u91CA\u653EInflater\u6301\u6709\u7684\u5806\u5916\u5185\u5B58\u3002\u4E8E\u662F\u7B14\u8005\u4EE5\u4E3A\u627E\u5230\u4E86\u539F\u56E0\uFF0C\u7ACB\u9A6C\u5411Spring Boot\u793E\u533A\u53CD\u9988\u4E86"),z={href:"https://github.com/spring-projects/spring-boot/issues/13935",target:"_blank",rel:"noopener noreferrer"},y=s("\u8FD9\u4E2Abug "),_=s("\u3002\u4F46\u662F\u53CD\u9988\u4E4B\u540E\uFF0C\u7B14\u8005\u5C31\u53D1\u73B0Inflater\u8FD9\u4E2A\u5BF9\u8C61\u672C\u8EAB\u5B9E\u73B0\u4E86finalize\u65B9\u6CD5\uFF0C\u5728\u8FD9\u4E2A\u65B9\u6CD5\u4E2D\u6709\u8C03\u7528\u91CA\u653E\u5806\u5916\u5185\u5B58\u7684\u903B\u8F91\u3002\u4E5F\u5C31\u662F\u8BF4Spring Boot\u4F9D\u8D56\u4E8EGC\u91CA\u653E\u5806\u5916\u5185\u5B58\u3002"),w=p(`<p>\u7B14\u8005\u4F7F\u7528jmap\u67E5\u770B\u5806\u5185\u5BF9\u8C61\u65F6\uFF0C\u53D1\u73B0\u5DF2\u7ECF\u57FA\u672C\u4E0A\u6CA1\u6709Inflater\u8FD9\u4E2A\u5BF9\u8C61\u4E86\u3002\u4E8E\u662F\u5C31\u6000\u7591GC\u7684\u65F6\u5019\uFF0C\u6CA1\u6709\u8C03\u7528finalize\u3002\u5E26\u7740\u8FD9\u6837\u7684\u6000\u7591\uFF0C\u7B14\u8005\u628AInflater\u8FDB\u884C\u5305\u88C5\u5728Spring Boot Loader\u91CC\u9762\u66FF\u6362\u6210\u81EA\u5DF1\u5305\u88C5\u7684Inflater\uFF0C\u5728finalize\u8FDB\u884C\u6253\u70B9\u76D1\u63A7\uFF0C\u7ED3\u679Cfinalize\u65B9\u6CD5\u786E\u5B9E\u88AB\u8C03\u7528\u4E86\u3002\u4E8E\u662F\u7B14\u8005\u53C8\u53BB\u770B\u4E86Inflater\u5BF9\u5E94\u7684C\u4EE3\u7801\uFF0C\u53D1\u73B0\u521D\u59CB\u5316\u7684\u4F7F\u7528\u4E86malloc\u7533\u8BF7\u5185\u5B58\uFF0Cend\u7684\u65F6\u5019\u4E5F\u8C03\u7528\u4E86free\u53BB\u91CA\u653E\u5185\u5B58\u3002</p><p>\u6B64\u523B\uFF0C\u7B14\u8005\u53EA\u80FD\u6000\u7591free\u7684\u65F6\u5019\u6CA1\u6709\u771F\u6B63\u91CA\u653E\u5185\u5B58\uFF0C\u4FBF\u628ASpring Boot\u5305\u88C5\u7684InflaterInputStream\u66FF\u6362\u6210Java JDK\u81EA\u5E26\u7684\uFF0C\u53D1\u73B0\u66FF\u6362\u4E4B\u540E\uFF0C\u5185\u5B58\u95EE\u9898\u4E5F\u5F97\u4EE5\u89E3\u51B3\u4E86\u3002</p><p>\u8FD9\u65F6\uFF0C\u518D\u8FD4\u8FC7\u6765\u770Bgperftools\u7684\u5185\u5B58\u5206\u5E03\u60C5\u51B5\uFF0C\u53D1\u73B0\u4F7F\u7528Spring Boot\u65F6\uFF0C\u5185\u5B58\u4F7F\u7528\u4E00\u76F4\u5728\u589E\u52A0\uFF0C\u7A81\u7136\u67D0\u4E2A\u70B9\u5185\u5B58\u4F7F\u7528\u4E0B\u964D\u4E86\u597D\u591A\uFF08\u4F7F\u7528\u91CF\u76F4\u63A5\u75313G\u964D\u4E3A700M\u5DE6\u53F3\uFF09\u3002\u8FD9\u4E2A\u70B9\u5E94\u8BE5\u5C31\u662FGC\u5F15\u8D77\u7684\uFF0C\u5185\u5B58\u5E94\u8BE5\u91CA\u653E\u4E86\uFF0C\u4F46\u662F\u5728\u64CD\u4F5C\u7CFB\u7EDF\u5C42\u9762\u5E76\u6CA1\u6709\u770B\u5230\u5185\u5B58\u53D8\u5316\uFF0C\u90A3\u662F\u4E0D\u662F\u6CA1\u6709\u91CA\u653E\u5230\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u88AB\u5185\u5B58\u5206\u914D\u5668\u6301\u6709\u4E86\u5462\uFF1F</p><p>\u7EE7\u7EED\u63A2\u7A76\uFF0C\u53D1\u73B0\u7CFB\u7EDF\u9ED8\u8BA4\u7684\u5185\u5B58\u5206\u914D\u5668\uFF08glibc 2.12\u7248\u672C\uFF09\u548C\u4F7F\u7528gperftools\u5185\u5B58\u5730\u5740\u5206\u5E03\u5DEE\u522B\u5F88\u660E\u663E\uFF0C2.5G\u5730\u5740\u4F7F\u7528smaps\u53D1\u73B0\u5B83\u662F\u5C5E\u4E8ENative Stack\u3002\u5185\u5B58\u5730\u5740\u5206\u5E03\u5982\u4E0B</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220540538.png" alt="image-20220825220540538" loading="lazy"></p><p>\u5230\u6B64\uFF0C\u57FA\u672C\u4E0A\u53EF\u4EE5\u786E\u5B9A\u662F\u5185\u5B58\u5206\u914D\u5668\u5728\u6363\u9B3C\uFF1B\u641C\u7D22\u4E86\u4E00\u4E0Bglibc 64M\uFF0C\u53D1\u73B0glibc\u4ECE2.11\u5F00\u59CB\u5BF9\u6BCF\u4E2A\u7EBF\u7A0B\u5F15\u5165\u5185\u5B58\u6C60\uFF0864\u4F4D\u673A\u5668\u5927\u5C0F\u5C31\u662F64M\u5185\u5B58\uFF09\uFF0C\u539F\u6587\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220614752.png" alt="image-20220825220614752" loading="lazy"></p><p>\u6309\u7167\u6587\u4E2D\u6240\u8BF4\u53BB\u4FEE\u6539MALLOC_ARENA_MAX\u73AF\u5883\u53D8\u91CF\uFF0C\u53D1\u73B0\u6CA1\u4EC0\u4E48\u6548\u679C\u3002\u67E5\u770Btcmalloc\uFF08gperftools\u4F7F\u7528\u7684\u5185\u5B58\u5206\u914D\u5668\uFF09\u4E5F\u4F7F\u7528\u4E86\u5185\u5B58\u6C60\u65B9\u5F0F\u3002</p><p>\u4E3A\u4E86\u9A8C\u8BC1\u662F\u5185\u5B58\u6C60\u641E\u7684\u9B3C\uFF0C\u7B14\u8005\u5C31\u7B80\u5355\u5199\u4E2A\u4E0D\u5E26\u5185\u5B58\u6C60\u7684\u5185\u5B58\u5206\u914D\u5668\u3002\u4F7F\u7528\u547D\u4EE4<code>gcc zjbmalloc.c -fPIC -shared -o zjbmalloc.so</code>\u751F\u6210\u52A8\u6001\u5E93\uFF0C\u7136\u540E\u4F7F\u7528<code>export LD_PRELOAD=zjbmalloc.so</code>\u66FF\u6362\u6389glibc\u7684\u5185\u5B58\u5206\u914D\u5668\u3002\u5176\u4E2D\u4EE3\u7801Demo\u5982\u4E0B\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/mman.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token comment">//\u4F5C\u8005\u4F7F\u7528\u768464\u4F4D\u673A\u5668\uFF0Csizeof(size_t)\u4E5F\u5C31\u662Fsizeof(long) </span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">malloc</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> size <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token keyword">long</span><span class="token operator">*</span> ptr <span class="token operator">=</span> <span class="token function">mmap</span><span class="token punctuation">(</span> <span class="token number">0</span><span class="token punctuation">,</span> size <span class="token operator">+</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">,</span> PROT_READ <span class="token operator">|</span> PROT_WRITE<span class="token punctuation">,</span> MAP_PRIVATE <span class="token operator">|</span> MAP_ANONYMOUS<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>ptr <span class="token operator">==</span> MAP_FAILED<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token operator">*</span>ptr <span class="token operator">=</span> size<span class="token punctuation">;</span>                     <span class="token comment">// First 8 bytes contain length.</span>
   <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ptr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// Memory that is after length variable</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">calloc</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> n<span class="token punctuation">,</span> <span class="token class-name">size_t</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">void</span><span class="token operator">*</span> ptr <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span>n <span class="token operator">*</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>ptr <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token function">memset</span><span class="token punctuation">(</span>ptr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> n <span class="token operator">*</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">return</span> ptr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">realloc</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>ptr<span class="token punctuation">,</span> <span class="token class-name">size_t</span> size<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">free</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>ptr <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">long</span> <span class="token operator">*</span>plen <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token operator">*</span><span class="token punctuation">)</span>ptr<span class="token punctuation">;</span>
 plen<span class="token operator">--</span><span class="token punctuation">;</span>                          <span class="token comment">// Reach top of memory</span>
 <span class="token keyword">long</span> len <span class="token operator">=</span> <span class="token operator">*</span>plen<span class="token punctuation">;</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">&lt;=</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> ptr<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">void</span><span class="token operator">*</span> rptr <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>rptr <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">free</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 rptr <span class="token operator">=</span> <span class="token function">memcpy</span><span class="token punctuation">(</span>rptr<span class="token punctuation">,</span> ptr<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token function">free</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">return</span> rptr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">free</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> ptr <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>ptr <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	 <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">long</span> <span class="token operator">*</span>plen <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token operator">*</span><span class="token punctuation">)</span>ptr<span class="token punctuation">;</span>
   plen<span class="token operator">--</span><span class="token punctuation">;</span>                          <span class="token comment">// Reach top of memory</span>
   <span class="token keyword">long</span> len <span class="token operator">=</span> <span class="token operator">*</span>plen<span class="token punctuation">;</span>               <span class="token comment">// Read length</span>
   <span class="token function">munmap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span>plen<span class="token punctuation">,</span> len <span class="token operator">+</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u901A\u8FC7\u5728\u81EA\u5B9A\u4E49\u5206\u914D\u5668\u5F53\u4E2D\u57CB\u70B9\u53EF\u4EE5\u53D1\u73B0\u5176\u5B9E\u7A0B\u5E8F\u542F\u52A8\u4E4B\u540E\u5E94\u7528\u5B9E\u9645\u7533\u8BF7\u7684\u5806\u5916\u5185\u5B58\u59CB\u7EC8\u5728700M-800M\u4E4B\u95F4\uFF0Cgperftools\u76D1\u63A7\u663E\u793A\u5185\u5B58\u4F7F\u7528\u91CF\u4E5F\u662F\u5728700M-800M\u5DE6\u53F3\u3002\u4F46\u662F\u4ECE\u64CD\u4F5C\u7CFB\u7EDF\u89D2\u5EA6\u6765\u770B\u8FDB\u7A0B\u5360\u7528\u7684\u5185\u5B58\u5DEE\u522B\u5F88\u5927\uFF08\u8FD9\u91CC\u53EA\u662F\u76D1\u63A7\u5806\u5916\u5185\u5B58\uFF09\u3002</p><p>\u7B14\u8005\u505A\u4E86\u4E00\u4E0B\u6D4B\u8BD5\uFF0C\u4F7F\u7528\u4E0D\u540C\u5206\u914D\u5668\u8FDB\u884C\u4E0D\u540C\u7A0B\u5EA6\u7684\u626B\u5305\uFF0C\u5360\u7528\u7684\u5185\u5B58\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220652536.png" alt="image-20220825220652536" loading="lazy"></p><p><strong>\u4E3A\u4EC0\u4E48\u81EA\u5B9A\u4E49\u7684malloc\u7533\u8BF7800M\uFF0C\u6700\u7EC8\u5360\u7528\u7684\u7269\u7406\u5185\u5B58\u57281.7G\u5462</strong>\uFF1F</p><p>\u56E0\u4E3A\u81EA\u5B9A\u4E49\u5185\u5B58\u5206\u914D\u5668\u91C7\u7528\u7684\u662Fmmap\u5206\u914D\u5185\u5B58\uFF0Cmmap\u5206\u914D\u5185\u5B58\u6309\u9700\u5411\u4E0A\u53D6\u6574\u5230\u6574\u6570\u4E2A\u9875\uFF0C\u6240\u4EE5\u5B58\u5728\u7740\u5DE8\u5927\u7684\u7A7A\u95F4\u6D6A\u8D39\u3002\u901A\u8FC7\u76D1\u63A7\u53D1\u73B0\u6700\u7EC8\u7533\u8BF7\u7684\u9875\u9762\u6570\u76EE\u5728536k\u4E2A\u5DE6\u53F3\uFF0C\u90A3\u5B9E\u9645\u4E0A\u5411\u7CFB\u7EDF\u7533\u8BF7\u7684\u5185\u5B58\u7B49\u4E8E512k * 4k\uFF08pagesize\uFF09 = 2G\u3002</p><p><strong>\u4E3A\u4EC0\u4E48\u8FD9\u4E2A\u6570\u636E\u5927\u4E8E1.7G\u5462</strong>\uFF1F</p><p>\u56E0\u4E3A\u64CD\u4F5C\u7CFB\u7EDF\u91C7\u53D6\u7684\u662F\u5EF6\u8FDF\u5206\u914D\u7684\u65B9\u5F0F\uFF0C\u901A\u8FC7mmap\u5411\u7CFB\u7EDF\u7533\u8BF7\u5185\u5B58\u7684\u65F6\u5019\uFF0C\u7CFB\u7EDF\u4EC5\u4EC5\u8FD4\u56DE\u5185\u5B58\u5730\u5740\u5E76\u6CA1\u6709\u5206\u914D\u771F\u5B9E\u7684\u7269\u7406\u5185\u5B58\u3002\u53EA\u6709\u5728\u771F\u6B63\u4F7F\u7528\u7684\u65F6\u5019\uFF0C\u7CFB\u7EDF\u4EA7\u751F\u4E00\u4E2A\u7F3A\u9875\u4E2D\u65AD\uFF0C\u7136\u540E\u518D\u5206\u914D\u5B9E\u9645\u7684\u7269\u7406Page\u3002</p><h2 id="_3-\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#_3-\u603B\u7ED3" aria-hidden="true">#</a> 3. \u603B\u7ED3</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220825220804117.png" alt="image-20220825220804117" loading="lazy"></p><p>\u6574\u4E2A\u5185\u5B58\u5206\u914D\u7684\u6D41\u7A0B\u5982\u4E0A\u56FE\u6240\u793A\u3002MCC\u626B\u5305\u7684\u9ED8\u8BA4\u914D\u7F6E\u662F\u626B\u63CF\u6240\u6709\u7684JAR\u5305\u3002\u5728\u626B\u63CF\u5305\u7684\u65F6\u5019\uFF0CSpring Boot\u4E0D\u4F1A\u4E3B\u52A8\u53BB\u91CA\u653E\u5806\u5916\u5185\u5B58\uFF0C\u5BFC\u81F4\u5728\u626B\u63CF\u9636\u6BB5\uFF0C\u5806\u5916\u5185\u5B58\u5360\u7528\u91CF\u4E00\u76F4\u6301\u7EED\u98D9\u5347\u3002\u5F53\u53D1\u751FGC\u7684\u65F6\u5019\uFF0CSpring Boot\u4F9D\u8D56\u4E8Efinalize\u673A\u5236\u53BB\u91CA\u653E\u4E86\u5806\u5916\u5185\u5B58\uFF1B\u4F46\u662Fglibc\u4E3A\u4E86\u6027\u80FD\u8003\u8651\uFF0C\u5E76\u6CA1\u6709\u771F\u6B63\u628A\u5185\u5B58\u5F52\u8FD4\u5230\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u800C\u662F\u7559\u4E0B\u6765\u653E\u5165\u5185\u5B58\u6C60\u4E86\uFF0C\u5BFC\u81F4\u5E94\u7528\u5C42\u4EE5\u4E3A\u53D1\u751F\u4E86\u201C\u5185\u5B58\u6CC4\u6F0F\u201D\u3002\u6240\u4EE5\u4FEE\u6539MCC\u7684\u914D\u7F6E\u8DEF\u5F84\u4E3A\u7279\u5B9A\u7684JAR\u5305\uFF0C\u95EE\u9898\u89E3\u51B3\u3002\u7B14\u8005\u5728\u53D1\u8868\u8FD9\u7BC7\u6587\u7AE0\u65F6\uFF0C\u53D1\u73B0<strong>Spring Boot\u7684\u6700\u65B0\u7248\u672C\uFF082.0.5.RELEASE\uFF09\u5DF2\u7ECF\u505A\u4E86\u4FEE\u6539\uFF0C\u5728ZipInflaterInputStream\u4E3B\u52A8\u91CA\u653E\u4E86\u5806\u5916\u5185\u5B58\u4E0D\u518D\u4F9D\u8D56GC</strong>\uFF1B\u6240\u4EE5Spring Boot\u5347\u7EA7\u5230\u6700\u65B0\u7248\u672C\uFF0C\u8FD9\u4E2A\u95EE\u9898\u4E5F\u53EF\u4EE5\u5F97\u5230\u89E3\u51B3\u3002</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,21),j={href:"https://pdai.tech/md/java/jvm/java-jvm-oom-offheap.html",target:"_blank",rel:"noopener noreferrer"},M=n("strong",null,"\u8C03\u8BD5\u6392\u9519 - Java \u5185\u5B58\u5206\u6790\u4E4B\u5806\u5916\u5185\u5B58",-1);function C(S,A){const a=i("ExternalLinkIcon");return o(),c("div",null,[r,n("blockquote",null,[n("p",null,[u,n("a",d,[k,e(a)]),m])]),g,n("p",null,[v,n("a",b,[h,e(a)]),f,n("a",z,[y,e(a)]),_]),w,n("p",null,[n("a",j,[M,e(a)])])])}const B=t(l,[["render",C],["__file","java-jvm-oom-offheap.html.vue"]]);export{B as default};
