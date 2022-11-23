import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as l,a as e,b as n,d as s,e as r,r as t}from"./app.3a7e6dfd.js";const c={},o=s(`<h1 id="\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5fullgc-\u7CFB\u7EDF-cpu-\u7A81\u7136\u98D9\u5347\u4E14-gc-\u9891\u7E41-\u4F60\u8BE5\u5982\u4F55\u6392\u67E5" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u4E0A\u5982\u4F55\u6392\u67E5fullgc-\u7CFB\u7EDF-cpu-\u7A81\u7136\u98D9\u5347\u4E14-gc-\u9891\u7E41-\u4F60\u8BE5\u5982\u4F55\u6392\u67E5" aria-hidden="true">#</a> \u7EBF\u4E0A\u5982\u4F55\u6392\u67E5FullGC(\u7CFB\u7EDF CPU \u7A81\u7136\u98D9\u5347\u4E14 GC \u9891\u7E41\uFF0C\u4F60\u8BE5\u5982\u4F55\u6392\u67E5)</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u5904\u7406\u8FC7\u7EBF\u4E0A\u95EE\u9898\u7684\u540C\u5B66\u57FA\u672C\u4E0A\u90FD\u4F1A\u9047\u5230\u7CFB\u7EDF\u7A81\u7136\u8FD0\u884C\u7F13\u6162\uFF0CCPU 100%,\u4EE5\u53CAFull GC \u6B21\u6570\u8FC7\u591A\u7684\u95EE\u9898\u3002</p><h2 id="_2-\u521D\u6B65\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#_2-\u521D\u6B65\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> 2. \u521D\u6B65\u89E3\u51B3\u65B9\u6848</h2><p>\u5982\u679C\u51FA\u73B0\u8BE5\u95EE\u9898\u5BFC\u81F4\u7EBF\u4E0A\u7CFB\u7EDF\u4E0D\u53EF\u7528\uFF0C\u90A3\u4E48\u9996\u5148\u9700\u8981\u505A\u7684\u5C31\u662F\uFF0C<strong>\u5BFC\u51FAjstack\u548C\u5185\u5B58\u4FE1\u606F\uFF0C\u7136\u540E\u91CD\u542F\u7CFB\u7EDF</strong>\u3002\u5C3D\u5FEB\u4FDD\u8BC1\u7CFB\u7EDF\u7684\u53EF\u7528\u6027\u3002</p><h2 id="_3-\u4EA7\u751F\u7684\u539F\u56E0" tabindex="-1"><a class="header-anchor" href="#_3-\u4EA7\u751F\u7684\u539F\u56E0" aria-hidden="true">#</a> 3. \u4EA7\u751F\u7684\u539F\u56E0</h2><p>\u5E38\u89C1\u539F\u56E0</p><ol><li>\u4EE3\u7801\u4E2D\u67D0\u4E2A\u4F4D\u7F6E\u8BFB\u53D6\u6570\u636E\u91CF\u8F83\u5927\uFF0C\u5BFC\u81F4\u7CFB\u7EDF\u5185\u5B58\u8017\u5C3D\uFF0C\u4ECE\u800C\u5BFC\u81F4Full GC\u6B21\u6570\u8FC7\u591A\uFF0C\u7CFB\u7EDF\u7F13\u6162</li><li>\u4EE3\u7801\u4E2D\u6709\u8F83\u591A\u6D88\u8017CPU\u7684\u64CD\u4F5C\uFF0C\u5BFC\u81F4CPU\u8FC7\u9AD8\uFF0C\u7CFB\u7EDF\u8FD0\u884C\u7F13\u6162</li></ol><p>\u76F8\u5BF9\u6765\u8BF4\uFF0C\u8FD9\u662F\u51FA\u73B0\u9891\u7387\u6700\u9AD8\u7684\u4E24\u79CD\u7EBF\u4E0A\u95EE\u9898\uFF0C\u800C\u4E14\u5B83\u4EEC\u4F1A\u76F4\u63A5\u5BFC\u81F4\u7CFB\u7EDF\u4E0D\u53EF\u7528\u3002\u53E6\u5916\u6709\u51E0\u79CD\u60C5\u51B5\u4E5F\u4F1A\u5BFC\u81F4\u67D0\u4E2A\u529F\u80FD\u8FD0\u884C\u7F13\u6162\uFF0C\u4F46\u662F\u4E0D\u81F3\u4E8E\u5BFC\u81F4\u7CFB\u7EDF\u4E0D\u53EF\u7528\uFF1A</p><ol start="3"><li>\u4EE3\u7801\u67D0\u4E2A\u4F4D\u7F6E\u6709\u963B\u585E\u6027\u7684\u64CD\u4F5C\uFF0C\u5BFC\u81F4\u8BE5\u529F\u80FD\u8C03\u7528\u6574\u4F53\u6BD4\u8F83\u8017\u65F6\uFF0C\u4F46\u51FA\u73B0\u662F\u6BD4\u8F83\u968F\u673A\u7684</li><li>\u67D0\u4E2A\u7EBF\u7A0B\u7531\u4E8E\u67D0\u79CD\u539F\u56E0\u800C\u8FDB\u5165WAITING\u72B6\u6001\uFF0C\u4ECE\u800C\u5BFC\u81F4\u7CFB\u7EDF\u6574\u4F53\u6BD4\u8F83\u7F13\u6162</li><li>\u7531\u4E8E\u9501\u4F7F\u7528\u4E0D\u5F53\uFF0C\u5BFC\u81F4\u591A\u4E2A\u7EBF\u7A0B\u8FDB\u5165\u6B7B\u9501\u72B6\u6001\uFF0C\u4ECE\u800C\u5BFC\u81F4\u7CFB\u7EDF\u6574\u4F53\u6BD4\u8F83\u7F13\u6162</li></ol><p>\u5BF9\u4E8E\u8FD9\u4E09\u79CD\u60C5\u51B5\uFF0C\u901A\u8FC7\u67E5\u770BCPU\u548C\u7CFB\u7EDF\u5185\u5B58\u60C5\u51B5\u662F\u65E0\u6CD5\u67E5\u770B\u51FA\u5177\u4F53\u95EE\u9898\u7684\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u76F8\u5BF9\u6765\u8BF4\u90FD\u662F\u5177\u6709\u4E00\u5B9A\u963B\u585E\u6027\u64CD\u4F5C\uFF0CCPU\u548C\u7CFB\u7EDF\u5185\u5B58\u4F7F\u7528\u60C5\u51B5\u90FD\u4E0D\u9AD8\uFF0C\u4F46\u662F\u529F\u80FD\u5374\u5F88\u6162\u3002\u4E0B\u9762\u6211\u4EEC\u5C31\u901A\u8FC7\u67E5\u770B\u7CFB\u7EDF\u65E5\u5FD7\u6765\u4E00\u6B65\u4E00\u6B65\u7504\u522B\u4E0A\u8FF0\u51E0\u79CD\u95EE\u9898\u3002</p><h3 id="_3-1-full-gc\u6B21\u6570\u8FC7\u591A\u5BFC\u81F4" tabindex="-1"><a class="header-anchor" href="#_3-1-full-gc\u6B21\u6570\u8FC7\u591A\u5BFC\u81F4" aria-hidden="true">#</a> 3.1 Full GC\u6B21\u6570\u8FC7\u591A\u5BFC\u81F4</h3><p>\u76F8\u5BF9\u6765\u8BF4\uFF0C\u8FD9\u79CD\u60C5\u51B5\u662F\u6700\u5BB9\u6613\u51FA\u73B0\u7684\uFF0C\u5C24\u5176\u662F\u65B0\u529F\u80FD\u4E0A\u7EBF\u65F6\u3002\u5BF9\u4E8EFull GC\u8F83\u591A\u7684\u60C5\u51B5\uFF0C\u5176\u4E3B\u8981\u6709\u5982\u4E0B\u4E24\u4E2A\u7279\u5F81\uFF1A</p><ul><li>\u7EBF\u4E0A\u591A\u4E2A\u7EBF\u7A0B\u7684CPU\u90FD\u8D85\u8FC7\u4E86100%\uFF0C\u901A\u8FC7jstack\u547D\u4EE4\u53EF\u4EE5\u770B\u5230\u8FD9\u4E9B\u7EBF\u7A0B\u4E3B\u8981\u662F\u5783\u573E\u56DE\u6536\u7EBF\u7A0B</li><li>\u901A\u8FC7jstat\u547D\u4EE4\u76D1\u63A7GC\u60C5\u51B5\uFF0C\u53EF\u4EE5\u770B\u5230Full GC\u6B21\u6570\u975E\u5E38\u591A\uFF0C\u5E76\u4E14\u6B21\u6570\u5728\u4E0D\u65AD\u589E\u52A0\u3002</li></ul><p>\u9996\u5148\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>top</code>\u547D\u4EE4\u67E5\u770B\u7CFB\u7EDFCPU\u7684\u5360\u7528\u60C5\u51B5\uFF0C\u5982\u4E0B\u662F\u7CFB\u7EDFCPU\u8F83\u9AD8\u7684\u4E00\u4E2A\u793A\u4F8B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>top - 08:31:10 up 30 min,  0 users,  load average: 0.73, 0.58, 0.34
KiB Mem:   2046460 total,  1923864 used,   122596 free,    14388 buffers
KiB Swap:  1048572 total,        0 used,  1048572 free.  1192352 cached Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
    9 root      20   0 2557160 288976  15812 S  98.0 14.1   0:42.60 java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u6709\u4E00\u4E2AJava\u7A0B\u5E8F\u6B64\u65F6CPU\u5360\u7528\u91CF\u8FBE\u5230\u4E8698.8%\uFF0C\u6B64\u65F6\u6211\u4EEC\u53EF\u4EE5\u590D\u5236\u8BE5\u8FDB\u7A0Bid<code>9</code>\uFF0C\u5E76\u4E14\u4F7F\u7528\u5982\u4E0B\u547D\u4EE4\u67E5\u770B\u5462\u8BE5\u8FDB\u7A0B\u7684\u5404\u4E2A\u7EBF\u7A0B\u8FD0\u884C\u60C5\u51B5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>top -Hp 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8BE5\u8FDB\u7A0B\u4E0B\u7684\u5404\u4E2A\u7EBF\u7A0B\u8FD0\u884C\u60C5\u51B5\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>top - 08:31:16 up 30 min,  0 users,  load average: 0.75, 0.59, 0.35
Threads:  11 total,   1 running,  10 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.5 us,  0.6 sy,  0.0 ni, 95.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem:   2046460 total,  1924856 used,   121604 free,    14396 buffers
KiB Swap:  1048572 total,        0 used,  1048572 free.  1192532 cached Mem

  PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
   10 root      20   0 2557160 289824  15872 R 79.3 14.2   0:41.49 java
   11 root      20   0 2557160 289824  15872 S 13.2 14.2   0:06.78 java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u5728\u8FDB\u7A0B\u4E3A<code>9</code>\u7684Java\u7A0B\u5E8F\u4E2D\u5404\u4E2A\u7EBF\u7A0B\u7684CPU\u5360\u7528\u60C5\u51B5\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7jstack\u547D\u4EE4\u67E5\u770B\u7EBF\u7A0Bid\u4E3A<code>10</code>\u7684\u7EBF\u7A0B\u4E3A\u4EC0\u4E48\u8017\u8D39CPU\u6700\u9AD8\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5728jsatck\u547D\u4EE4\u5C55\u793A\u7684\u7ED3\u679C\u4E2D\uFF0C\u7EBF\u7A0Bid\u90FD\u8F6C\u6362\u6210\u4E86\u5341\u516D\u8FDB\u5236\u5F62\u5F0F\u3002\u53EF\u4EE5\u7528\u5982\u4E0B\u547D\u4EE4\u67E5\u770B\u8F6C\u6362\u7ED3\u679C\uFF0C\u4E5F\u53EF\u4EE5\u627E\u4E00\u4E2A\u79D1\u5B66\u8BA1\u7B97\u5668\u8FDB\u884C\u8F6C\u6362\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@a39de7e7934b:/# printf &quot;%x\\n&quot; 10
a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u6253\u5370\u7ED3\u679C\u8BF4\u660E\u8BE5\u7EBF\u7A0B\u5728jstack\u4E2D\u7684\u5C55\u73B0\u5F62\u5F0F\u4E3A<code>0xa</code>\uFF0C\u901A\u8FC7jstack\u547D\u4EE4\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\u5982\u4E0B\u4FE1\u606F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;main&quot; #1 prio=5 os_prio=0 tid=0x00007f8718009800 nid=0xb runnable [0x00007f871fe41000]
   java.lang.Thread.State: RUNNABLE
	at com.aibaobei.chapter2.eg2.UserDemo.main(UserDemo.java:9)

&quot;VM Thread&quot; os_prio=0 tid=0x00007f871806e000 nid=0xa runnable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u7684VM Thread\u4E00\u884C\u7684\u6700\u540E\u663E\u793A<code>nid=0xa</code>\uFF0C\u8FD9\u91CCnid\u7684\u610F\u601D\u5C31\u662F\u64CD\u4F5C\u7CFB\u7EDF\u7EBF\u7A0Bid\u7684\u610F\u601D\u3002\u800CVM Thread\u6307\u7684\u5C31\u662F\u5783\u573E\u56DE\u6536\u7684\u7EBF\u7A0B\u3002\u8FD9\u91CC\u6211\u4EEC\u57FA\u672C\u4E0A\u53EF\u4EE5\u786E\u5B9A\uFF0C\u5F53\u524D\u7CFB\u7EDF\u7F13\u6162\u7684\u539F\u56E0\u4E3B\u8981\u662F\u5783\u573E\u56DE\u6536\u8FC7\u4E8E\u9891\u7E41\uFF0C\u5BFC\u81F4GC\u505C\u987F\u65F6\u95F4\u8F83\u957F\u3002\u6211\u4EEC\u901A\u8FC7\u5982\u4E0B\u547D\u4EE4\u53EF\u4EE5\u67E5\u770BGC\u7684\u60C5\u51B5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@8d36124607a0:/# jstat -gcutil 9 1000 10
  S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT
  0.00   0.00   0.00  75.07  59.09  59.60   3259    0.919  6517    7.715    8.635
  0.00   0.00   0.00   0.08  59.09  59.60   3306    0.930  6611    7.822    8.752
  0.00   0.00   0.00   0.08  59.09  59.60   3351    0.943  6701    7.924    8.867
  0.00   0.00   0.00   0.08  59.09  59.60   3397    0.955  6793    8.029    8.984
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u8FD9\u91CCFGC\u6307\u7684\u662FFull GC\u6570\u91CF\uFF0C\u8FD9\u91CC\u9AD8\u8FBE6793\uFF0C\u800C\u4E14\u8FD8\u5728\u4E0D\u65AD\u589E\u957F\u3002\u4ECE\u800C\u8FDB\u4E00\u6B65\u8BC1\u5B9E\u4E86\u662F\u7531\u4E8E\u5185\u5B58\u6EA2\u51FA\u5BFC\u81F4\u7684\u7CFB\u7EDF\u7F13\u6162\u3002\u90A3\u4E48\u8FD9\u91CC\u786E\u8BA4\u4E86\u5185\u5B58\u6EA2\u51FA\uFF0C\u4F46\u662F\u5982\u4F55\u67E5\u770B\u4F60\u662F\u54EA\u4E9B\u5BF9\u8C61\u5BFC\u81F4\u7684\u5185\u5B58\u6EA2\u51FA\u5462\uFF0C\u8FD9\u4E2A\u53EF\u4EE5dump\u51FA\u5185\u5B58\u65E5\u5FD7\uFF0C\u7136\u540E\u901A\u8FC7eclipse\u7684mat\u5DE5\u5177\u8FDB\u884C\u67E5\u770B\uFF0C\u5982\u4E0B\u662F\u5176\u5C55\u793A\u7684\u4E00\u4E2A\u5BF9\u8C61\u6811\u7ED3\u6784\uFF1A</p><p>![image-20200317004122623](/Users/zsz/Library/Application Support/typora-user-images/image-20200317004122623.png)</p><p>\u7ECF\u8FC7mat\u5DE5\u5177\u5206\u6790\u4E4B\u540E\uFF0C\u6211\u4EEC\u57FA\u672C\u4E0A\u5C31\u80FD\u786E\u5B9A\u5185\u5B58\u4E2D\u4E3B\u8981\u662F\u54EA\u4E2A\u5BF9\u8C61\u6BD4\u8F83\u6D88\u8017\u5185\u5B58\uFF0C\u7136\u540E\u627E\u5230\u8BE5\u5BF9\u8C61\u7684\u521B\u5EFA\u4F4D\u7F6E\uFF0C\u8FDB\u884C\u5904\u7406\u5373\u53EF\u3002\u8FD9\u91CC\u7684\u4E3B\u8981\u662FPrintStream\u6700\u591A\uFF0C\u4F46\u662F\u6211\u4EEC\u4E5F\u53EF\u4EE5\u770B\u5230\uFF0C\u5176\u5185\u5B58\u6D88\u8017\u91CF\u53EA\u670912.2%\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5176\u8FD8\u4E0D\u8DB3\u4EE5\u5BFC\u81F4\u5927\u91CF\u7684Full GC\uFF0C\u6B64\u65F6\u6211\u4EEC\u9700\u8981\u8003\u8651\u53E6\u5916\u4E00\u79CD\u60C5\u51B5\uFF0C\u5C31\u662F\u4EE3\u7801\u6216\u8005\u7B2C\u4E09\u65B9\u4F9D\u8D56\u7684\u5305\u4E2D\u6709\u663E\u793A\u7684<code>System.gc()</code>\u8C03\u7528\u3002\u8FD9\u79CD\u60C5\u51B5\u6211\u4EEC\u67E5\u770Bdump\u5185\u5B58\u5F97\u5230\u7684\u6587\u4EF6\u5373\u53EF\u5224\u65AD\uFF0C\u56E0\u4E3A\u5176\u4F1A\u6253\u5370GC\u539F\u56E0\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[Full GC (System.gc()) [Tenured: 262546K-&gt;262546K(349568K), 0.0014879 secs] 262546K-&gt;262546K(506816K), [Metaspace: 3109K-&gt;3109K(1056768K)], 0.0015151 secs] [Times: user=0.00 sys=0.00, real=0.01 secs] 
[GC (Allocation Failure) [DefNew: 2795K-&gt;0K(157248K), 0.0001504 secs][Tenured: 262546K-&gt;402K(349568K), 0.0012949 secs] 265342K-&gt;402K(506816K), [Metaspace: 3109K-&gt;3109K(1056768K)], 0.0014699 secs] [Times: user=0.00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6BD4\u5982\u8FD9\u91CC\u7B2C\u4E00\u6B21GC\u662F\u7531\u4E8E<code>System.gc()</code>\u7684\u663E\u793A\u8C03\u7528\u5BFC\u81F4\u7684\uFF0C\u800C\u7B2C\u4E8C\u6B21GC\u5219\u662FJVM\u4E3B\u52A8\u53D1\u8D77\u7684\u3002\u603B\u7ED3\u6765\u8BF4\uFF0C\u5BF9\u4E8EFull GC\u6B21\u6570\u8FC7\u591A\uFF0C\u4E3B\u8981\u6709\u4EE5\u4E0B\u4E24\u79CD\u539F\u56E0\uFF1A</p><ul><li>\u4EE3\u7801\u4E2D\u4E00\u6B21\u83B7\u53D6\u4E86\u5927\u91CF\u7684\u5BF9\u8C61\uFF0C\u5BFC\u81F4\u5185\u5B58\u6EA2\u51FA\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7eclipse\u7684mat\u5DE5\u5177\u67E5\u770B\u5185\u5B58\u4E2D\u6709\u54EA\u4E9B\u5BF9\u8C61\u6BD4\u8F83\u591A\uFF1B</li><li>\u5185\u5B58\u5360\u7528\u4E0D\u9AD8\uFF0C\u4F46\u662FFull GC\u6B21\u6570\u8FD8\u662F\u6BD4\u8F83\u591A\uFF0C\u6B64\u65F6\u53EF\u80FD\u662F\u663E\u793A\u7684<code>System.gc()</code>\u8C03\u7528\u5BFC\u81F4GC\u6B21\u6570\u8FC7\u591A\uFF0C\u8FD9\u53EF\u4EE5\u901A\u8FC7\u6DFB\u52A0<code>-XX:+DisableExplicitGC</code>\u6765\u7981\u7528JVM\u5BF9\u663E\u793AGC\u7684\u54CD\u5E94\u3002</li></ul><h3 id="_3-2-cpu\u8FC7\u9AD8" tabindex="-1"><a class="header-anchor" href="#_3-2-cpu\u8FC7\u9AD8" aria-hidden="true">#</a> 3.2 CPU\u8FC7\u9AD8</h3><p>\u67E5\u770B\u53C2\u8003\u6587\u7AE0</p><h3 id="_3-3-\u4E0D\u5B9A\u671F\u51FA\u73B0\u7684\u63A5\u53E3\u8017\u65F6\u73B0\u8C61" tabindex="-1"><a class="header-anchor" href="#_3-3-\u4E0D\u5B9A\u671F\u51FA\u73B0\u7684\u63A5\u53E3\u8017\u65F6\u73B0\u8C61" aria-hidden="true">#</a> 3.3 \u4E0D\u5B9A\u671F\u51FA\u73B0\u7684\u63A5\u53E3\u8017\u65F6\u73B0\u8C61</h3><p>\u67E5\u770B\u53C2\u8003\u6587\u7AE0</p><h3 id="_3-4-\u67D0\u4E2A\u7EBF\u7A0B\u8FDB\u5165waiting\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#_3-4-\u67D0\u4E2A\u7EBF\u7A0B\u8FDB\u5165waiting\u72B6\u6001" aria-hidden="true">#</a> 3.4 \u67D0\u4E2A\u7EBF\u7A0B\u8FDB\u5165WAITING\u72B6\u6001</h3><p>\u67E5\u770B\u53C2\u8003\u6587\u7AE0</p><h3 id="_3-5-\u6B7B\u9501" tabindex="-1"><a class="header-anchor" href="#_3-5-\u6B7B\u9501" aria-hidden="true">#</a> 3.5 \u6B7B\u9501</h3><p>\u67E5\u770B\u53C2\u8003\u6587\u7AE0</p><h2 id="_4-\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#_4-\u603B\u7ED3" aria-hidden="true">#</a> 4. \u603B\u7ED3</h2><ol><li>\u901A\u8FC7top\u547D\u4EE4\u67E5\u770Bcpu\u60C5\u51B5\uFF0C</li><li>\u5982\u679CCPU\u6BD4\u8F83\u9AD8\uFF0C <ol><li>\u5219\u901A\u8FC7<code>top -Hp &lt;pid&gt;</code> \u547D\u4EE4\u67E5\u770B\u5F53\u524D\u8FDB\u7A0B\u7684\u5404\u4E2A\u7EBF\u7A0B\u8FD0\u884C\u60C5\u51B5\uFF0C</li><li>\u627E\u51FACPU\u8FC7\u9AD8\u7684\u7EBF\u7A0B\u4E4B\u540E\uFF0C\u5C06\u5176\u7EBF\u7A0Bid\u8F6C\u6362\u4E3A\u5341\u516D\u8FDB\u5236\u7684\u8868\u73B0\u5F62\u5F0F</li><li>\u7136\u540E\u5728jstack\u65E5\u5FD7\u4E2D\u67E5\u770B\u8BE5\u7EBF\u7A0B\u4E3B\u8981\u5728\u8FDB\u884C\u7684\u5DE5\u4F5C <ol><li>\u5982\u679C\u662F\u6B63\u5E38\u7684\u7528\u6237\u7EBF\u7A0B\uFF0C\u5219\u901A\u8FC7\u8BE5\u7EBF\u7A0B\u7684\u5806\u6808\u4FE1\u606F\u67E5\u770B\u5176\u5177\u4F53\u662F\u5728\u54EA\u5904\u7528\u6237\u4EE3\u7801\u5904\u8FD0\u884C\u6BD4\u8F83\u6D88\u8017CPU\uFF1B</li><li>\u5982\u679C\u8BE5\u7EBF\u7A0B\u662F<code>VM Thread</code>\uFF0C\u5219\u901A\u8FC7<code>jstat -gcutil </code>\u547D\u4EE4\u76D1\u63A7\u5F53\u524D\u7CFB\u7EDF\u7684GC\u72B6\u51B5\uFF0C\u7136\u540E\u901A\u8FC7<code>jmap dump:format=b,file= </code>\u5BFC\u51FA\u7CFB\u7EDF\u5F53\u524D\u7684\u5185\u5B58\u6570\u636E\u3002\u5BFC\u51FA\u4E4B\u540E\u5C06\u5185\u5B58\u60C5\u51B5\u653E\u5230eclipse\u7684mat\u5DE5\u5177\u4E2D\u8FDB\u884C\u5206\u6790\u5373\u53EF\u5F97\u51FA\u5185\u5B58\u4E2D\u4E3B\u8981\u662F\u4EC0\u4E48\u5BF9\u8C61\u6BD4\u8F83\u6D88\u8017\u5185\u5B58\uFF0C\u8FDB\u800C\u53EF\u4EE5\u5904\u7406\u76F8\u5173\u4EE3\u7801\uFF1B</li></ol></li><li>\u5982\u679C\u901A\u8FC7<code>top</code>\u547D\u4EE4\u770B\u5230CPU\u5E76\u4E0D\u9AD8\uFF0C\u5E76\u4E14\u7CFB\u7EDF\u5185\u5B58\u5360\u7528\u7387\u4E5F\u6BD4\u8F83\u4F4E\u3002\u6B64\u65F6\u5C31\u53EF\u4EE5\u8003\u8651\u662F\u5426\u662F\u7531\u4E8E\u53E6\u5916\u4E09\u79CD\u60C5\u51B5\u5BFC\u81F4\u7684\u95EE\u9898 <ol><li>\u5982\u679C\u662F\u63A5\u53E3\u8C03\u7528\u6BD4\u8F83\u8017\u65F6\uFF0C\u5E76\u4E14\u662F\u4E0D\u5B9A\u65F6\u51FA\u73B0\uFF0C\u5219\u53EF\u4EE5\u901A\u8FC7\u538B\u6D4B\u7684\u65B9\u5F0F\u52A0\u5927\u963B\u585E\u70B9\u51FA\u73B0\u7684\u9891\u7387\uFF0C\u4ECE\u800C\u901A\u8FC7<code>jstack</code>\u67E5\u770B\u5806\u6808\u4FE1\u606F\uFF0C\u627E\u5230\u963B\u585E\u70B9\uFF1B</li><li>\u5982\u679C\u662F\u67D0\u4E2A\u529F\u80FD\u7A81\u7136\u51FA\u73B0\u505C\u6EDE\u7684\u72B6\u51B5\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E5F\u65E0\u6CD5\u590D\u73B0\uFF0C\u6B64\u65F6\u53EF\u4EE5\u901A\u8FC7\u591A\u6B21\u5BFC\u51FA<code>jstack</code>\u65E5\u5FD7\u7684\u65B9\u5F0F\u5BF9\u6BD4\u54EA\u4E9B\u7528\u6237\u7EBF\u7A0B\u662F\u4E00\u76F4\u90FD\u5904\u4E8E\u7B49\u5F85\u72B6\u6001\uFF0C\u8FD9\u4E9B\u7EBF\u7A0B\u5C31\u662F\u53EF\u80FD\u5B58\u5728\u95EE\u9898\u7684\u7EBF\u7A0B\uFF1B</li><li>\u5982\u679C\u901A\u8FC7<code>jstack</code>\u53EF\u4EE5\u67E5\u770B\u5230\u6B7B\u9501\u72B6\u6001\uFF0C\u5219\u53EF\u4EE5\u68C0\u67E5\u4EA7\u751F\u6B7B\u9501\u7684\u4E24\u4E2A\u7EBF\u7A0B\u7684\u5177\u4F53\u963B\u585E\u70B9\uFF0C\u4ECE\u800C\u5904\u7406\u76F8\u5E94\u7684\u95EE\u9898\u3002</li></ol></li></ol></li></ol><h2 id="\u9762\u8BD5\u5B9E\u6218" tabindex="-1"><a class="header-anchor" href="#\u9762\u8BD5\u5B9E\u6218" aria-hidden="true">#</a> \u9762\u8BD5\u5B9E\u6218</h2><p>FullGC\u4F60\u518D\u7EBF\u4E0A\u9047\u5230\u95EE\u9898\u4F60\u5E94\u8BE5\u600E\u4E48\u6392\u67E5\uFF1F</p><blockquote><ol><li>\u4F7F\u7528 jstat -gcutil \u547D\u4EE4\u76D1\u63A7\u5F53\u524D\u7CFB\u7EDFGC\u72B6\u51B5</li><li>\u901A\u8FC7jmap dump\uFF1Aformat=b,file=\u5BFC\u51FA\u7CFB\u7EDF\u5F53\u524D\u7684\u5185\u5B58\u6570\u636E</li><li>\u901A\u8FC7mat\u5DE5\u5177\u5206\u6790\u5F97\u51FA\u5185\u5B58\u4E2D\u4E3B\u8981\u4EC0\u4E48\u5BF9\u8C61\u6D88\u8017\u5185\u5B58\uFF0C\u8FDB\u800C\u53EF\u4EE5\u5904\u7406\u76F8\u5173\u4EE3\u7801</li></ol></blockquote><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,46),u={href:"https://zhuanlan.zhihu.com/p/84203026",target:"_blank",rel:"noopener noreferrer"},p=r("\u9762\u8BD5\u88AB\u95EE\uFF1A\u5982\u679C\u7CFB\u7EDF CPU \u7A81\u7136\u98D9\u5347\u4E14 GC \u9891\u7E41\uFF0C\u4F60\u8BE5\u5982\u4F55\u6392\u67E5\uFF1F");function v(h,m){const i=t("ExternalLinkIcon");return d(),l("div",null,[o,e("p",null,[e("a",u,[p,n(i)])])])}const C=a(c,[["render",v],["__file","java-jvm-gc-fullgc.html.vue"]]);export{C as default};
