import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as i,e as a}from"./app.236288ec.js";const s={},d=a(`<h1 id="\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501" aria-hidden="true">#</a> \u5982\u4F55\u53D1\u73B0\u3001\u9884\u9632\u3001\u89E3\u51B3\u6B7B\u9501</h1><h2 id="_1-\u6B7B\u9501\u7684\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#_1-\u6B7B\u9501\u7684\u5B9A\u4E49" aria-hidden="true">#</a> 1. \u6B7B\u9501\u7684\u5B9A\u4E49</h2><p>\u201C\u6B7B\u9501\u662F\u6307\u4E24\u4E2A\u6216\u4E24\u4E2A\u4EE5\u4E0A\u7684\u8FDB\u7A0B\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u7531\u4E8E\u7ADE\u4E89\u8D44\u6E90\u6216\u8005\u7531\u4E8E\u5F7C\u6B64\u901A\u4FE1\u800C\u9020\u6210\u7684\u4E00\u79CD\u963B\u585E\u7684\u73B0\u8C61\uFF0C\u82E5\u65E0\u5916\u529B\u4F5C\u7528\uFF0C\u5B83\u4EEC\u90FD\u5C06\u65E0\u6CD5\u63A8\u8FDB\u4E0B\u53BB\u3002\u201D</p><p>\u7ADE\u4E89\u7684\u8D44\u6E90\u53EF\u4EE5\u662F\uFF1A\u9501\u3001\u7F51\u7EDC\u8FDE\u63A5\u3001\u901A\u77E5\u4E8B\u4EF6\uFF0C\u78C1\u76D8\u3001\u5E26\u5BBD\uFF0C\u4EE5\u53CA\u4E00\u5207\u53EF\u4EE5\u88AB\u79F0\u4F5C\u201C\u8D44\u6E90\u201D\u7684\u4E1C\u897F\u3002</p><h2 id="_2-\u4E3E\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-\u4E3E\u4F8B" aria-hidden="true">#</a> 2. \u4E3E\u4F8B</h2><p>\u5982\u679C\u6B64\u65F6\u6709\u4E00\u4E2A\u7EBF\u7A0BA\uFF0C\u6309\u7167\u5148\u9501a\u518D\u83B7\u5F97\u9501b\u7684\u987A\u5E8F\u83B7\u5F97\u9501\uFF0C\u800C\u5728\u6B64\u65F6\u53C8\u6709\u4E00\u4E2A\u7EBF\u7A0BB\uFF0C\u6309\u7167\u5148\u9501b\u518D\u9501a\u7684\u987A\u5E8F\u83B7\u5F97\u9501</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311231729573.png" alt="image-20200311231729573" loading="lazy"></p><p>\u6211\u4EEC\u53EF\u4EE5\u7528\u4E00\u6BB5\u4EE3\u7801\u6765\u8868\u793A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static void main(String[] args) {
    final Object a = new Object();
    final Object b = new Object();
    Thread threadA = new Thread(new Runnable() {
        public void run() {
            synchronized (a) {
                try {
                    System.out.println(&quot;now i in threadA-locka&quot;);
                    Thread.sleep(1000l);
                    synchronized (b) {
                        System.out.println(&quot;now i in threadA-lockb&quot;);
                    }
                } catch (Exception e) {
                    // ignore
                }
            }
        }
    });

    Thread threadB = new Thread(new Runnable() {
        public void run() {
            synchronized (b) {
                try {
                    System.out.println(&quot;now i in threadB-lockb&quot;);
                    Thread.sleep(1000l);
                    synchronized (a) {
                        System.out.println(&quot;now i in threadB-locka&quot;);
                    }
                } catch (Exception e) {
                    // ignore
                }
            }
        }
    });

    threadA.start();
    threadB.start();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\u6267\u884C\u7ED3\u679C\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311232054845.png" alt="image-20200311232054845" loading="lazy"></p><p>\u5F88\u660E\u663E\uFF0C\u7A0B\u5E8F\u6267\u884C\u505C\u6EDE\u4E86</p><h2 id="_2-\u6B7B\u9501\u68C0\u6D4B" tabindex="-1"><a class="header-anchor" href="#_2-\u6B7B\u9501\u68C0\u6D4B" aria-hidden="true">#</a> 2. \u6B7B\u9501\u68C0\u6D4B</h2><p>\u4E3B\u8981\u4ECB\u7ECD\u4E24\u79CD\u6B7B\u9501\u68C0\u67E5\u5DE5\u5177</p><h2 id="_2-1-jstack\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_2-1-jstack\u547D\u4EE4" aria-hidden="true">#</a> 2.1 Jstack\u547D\u4EE4</h2><p>Jstack \u662Fjava \u865A\u62DF\u673A\u81EA\u5E26\u7684\u4E00\u79CD\u5806\u6808\u8DDF\u8E2A\u5DE5\u5177\u3002jstack \u7528\u4E8E<strong>\u6253\u5370</strong>\u51FA\u7ED9\u5B9A\u7684java \u8FDB\u7A0BID\u6216core file \u6216\u8FDC\u7A0B\u8C03\u8BD5\u670D\u52A1\u7684<strong>java\u5806\u6808\u4FE1\u606F</strong>\u3002Jstack\u5DE5\u5177\u53EF\u4EE5\u7528\u4E8E\u751F\u6210Java\u865A\u62DF\u673A\u5F53\u524D\u65F6\u523B\u7684\u7EBF\u7A0B\u5FEB\u7167\uFF0C<strong>\u7EBF\u7A0B\u5FEB\u7167</strong>\u662F\u5F53\u524Djava\u865A\u62DF\u673A\u5185\u6BCF\u4E00\u6761\u7EBF\u7A0B<strong>\u6B63\u5728\u6267\u884C</strong>\u7684<strong>\u65B9\u6CD5\u5806\u6808</strong>\u7684\u96C6\u5408\uFF0C\u751F\u6210\u7EBF\u7A0B\u5FEB\u7167\u7684\u4E3B\u8981\u76EE\u7684\u662F\u5B9A\u4F4D\u7EBF\u7A0B\u51FA\u73B0\u957F\u65F6\u95F4\u505C\u987F\u539F\u56E0\uFF0C\u5982<code>\u7EBF\u7A0B\u95F4\u6B7B\u9501</code>\u3001<code>\u6B7B\u5FAA\u73AF</code>\u3001<code>\u8BF7\u6C42\u5916\u90E8\u8D44\u6E90\u5BFC\u81F4\u7684\u957F\u65F6\u95F4\u7B49\u5F85</code>\u7B49\u3002\u7EBF\u7A0B\u51FA\u73B0\u505C\u987F\u7684\u65F6\u5019\u901A\u8FC7jstack\u6765\u67E5\u770B\u5404\u4E2A\u7EBF\u7A0B\u7684\u8C03\u7528\u5806\u6808\uFF0C\u5C31\u53EF\u4EE5\u77E5\u9053\u6CA1\u6709\u76F8\u5E94\u7684\u7EBF\u7A0B\u5230\u5E95\u5728\u540E\u53F0\u505A\u4E86\u4EC0\u4E48\u4E8B\u60C5\uFF0C\u6216\u8005\u7B49\u5F85\u4EC0\u4E48\u8D44\u6E90</p><p>\u9996\u5148\uFF0C\u6211\u4EEC\u901A\u8FC7jps\u786E\u5B9A\u5F53\u524D\u6267\u884C\u4EFB\u52A1\u7684\u8FDB\u7A0B\u53F7:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jonny@~$ jps
597
1370 JConsole
1362 AppMain
1421 Jps
1361 Launcher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u786E\u5B9A\u4EFB\u52A1\u8FDB\u7A0B\u53F71362\uFF0C\u7136\u540E\u6267\u884Cjstack\u547D\u4EE4\u67E5\u770B\u5F53\u524D\u8FDB\u7A0B\u5806\u6808\u4FE1\u606F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jonny@~$ jstack -F 1362
Attaching to process ID 1362, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 23.21-b01
Deadlock Detection:

Found one Java-level deadlock:
=============================

&quot;Thread-1&quot;:
  waiting to lock Monitor@0x00007fea1900f6b8 (Object@0x00000007efa684c8, a java/lang/Object),
  which is held by &quot;Thread-0&quot;
&quot;Thread-0&quot;:
  waiting to lock Monitor@0x00007fea1900ceb0 (Object@0x00000007efa684d8, a java/lang/Object),
  which is held by &quot;Thread-1&quot;

Found a total of 1 deadlock.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u8FDB\u7A0B\u7684\u786E\u5B58\u5728\u6B7B\u9501\uFF0C\u4E24\u4E2A\u7EBF\u7A0B\u5206\u522B\u5728\u7B49\u5F85\u5BF9\u65B9\u6301\u6709\u7684Object\u5BF9\u8C61</p><h3 id="_2-2-jconsole-\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#_2-2-jconsole-\u5DE5\u5177" aria-hidden="true">#</a> 2.2 JConsole \u5DE5\u5177</h3><p>Jconsole \u662F Jdk\u81EA\u5E26\u7684\u76D1\u63A7\u5DE5\u5177\uFF0C\u5728Jdk/bin \u76EE\u5F55\u4E0B\u53EF\u4EE5\u627E\u5230\uFF0C\u4ED6\u7528\u6237\u8FDE\u63A5\u6B63\u5728\u8FD0\u884C\u7684\u672C\u5730\u6216\u8005\u8FDC\u7A0B\u7684JVM\uFF0C\u5BF9\u8FD0\u884C\u5728Java \u5E94\u7528\u7A0B\u5E8F\u7684\u8D44\u6E90\u6D88\u8017\u548C\u6027\u80FD\u8FDB\u884C\u76D1\u63A7\uFF0C\u5E76\u753B\u51FA\u5927\u91CF\u7684\u56FE\u8868\uFF0C\u63D0\u4F9B\u5F3A\u5927\u7684\u53EF\u89C6\u5316\u754C\u9762\u3002\u800C\u4E14\u672C\u8EAB\u5360\u7528\u7684\u670D\u52A1\u5668\u5185\u5B58\u5F88\u5C0F</p><p>\u6211\u4EEC\u5728\u547D\u4EE4\u884C\u4E2D\u6572\u5165jconsole\u547D\u4EE4\uFF0C\u4F1A\u81EA\u52A8\u5F39\u51FA\u4EE5\u4E0B\u5BF9\u8BDD\u6846\uFF0C\u9009\u62E9\u8FDB\u7A0B1362\uFF0C\u5E76\u70B9\u51FB\u201C<strong>\u94FE\u63A5</strong>\u201D</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311234432625.png" alt="image-20200311234432625" loading="lazy"></p><p>\u8FDB\u5165\u9501\u68C0\u67E5\u7684\u8FDB\u7A0B\u540E\uFF0C\u9009\u62E9\u201C\u7EBF\u7A0B\u201D\u9009\u9879\u5361\uFF0C\u5E76\u70B9\u51FB\u201C\u68C0\u67E5\u6B7B\u9501\u201D</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311234702867.png" alt="image-20200311234702867" loading="lazy"></p><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u5230</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311234651568.png" alt="image-20200311234651568" loading="lazy"></p><p>\u53EF\u4EE5\u770B\u5230\u8FDB\u7A0B\u4E2D\u5B58\u5728\u6B7B\u9501</p><h2 id="_2-\u9884\u9632\u4E0E\u89E3\u51B3\u6B7B\u9501" tabindex="-1"><a class="header-anchor" href="#_2-\u9884\u9632\u4E0E\u89E3\u51B3\u6B7B\u9501" aria-hidden="true">#</a> 2. \u9884\u9632\u4E0E\u89E3\u51B3\u6B7B\u9501</h2><p>\u7834\u574F\u6B7B\u9501\u4EA7\u751F\u7684\u56DB\u4E2A\u5FC5\u8981\u6761\u4EF6</p><h3 id="_2-1-\u7834\u574F\u4E92\u65A5\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-1-\u7834\u574F\u4E92\u65A5\u6761\u4EF6" aria-hidden="true">#</a> 2.1 \u7834\u574F\u4E92\u65A5\u6761\u4EF6</h3><p>\u8FD9\u4E2A\u6761\u4EF6\u6211\u4EEC\u6CA1\u6709\u529E\u6CD5\u7834\u574F\uFF0C\u56E0\u4E3A\u6211\u4EEC\u7528\u9501\u672C\u6765\u5C31\u662F\u60F3\u8BA9\u4ED6\u4EEC\u4E92\u65A5\u7684\uFF08\u4E34\u754C\u8D44\u6E90\u9700\u8981\u4E92\u65A5\u8BBF\u95EE\uFF09</p><h3 id="_2-2-\u7834\u574F\u8BF7\u6C42\u4E0E\u4FDD\u6301\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-2-\u7834\u574F\u8BF7\u6C42\u4E0E\u4FDD\u6301\u6761\u4EF6" aria-hidden="true">#</a> 2.2 \u7834\u574F\u8BF7\u6C42\u4E0E\u4FDD\u6301\u6761\u4EF6</h3><p>\u4E00\u6B21\u6027\u7533\u8BF7\u6240\u6709\u7684\u8D44\u6E90</p><h3 id="_2-3-\u7834\u574F\u4E0D\u53EF\u5265\u593A\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-3-\u7834\u574F\u4E0D\u53EF\u5265\u593A\u6761\u4EF6" aria-hidden="true">#</a> 2.3 \u7834\u574F\u4E0D\u53EF\u5265\u593A\u6761\u4EF6</h3><p>\u5360\u7528\u90E8\u5206\u8D44\u6E90\u7684\u7EBF\u7A0B\u8FDB\u4E00\u6B65\u7533\u8BF7\u5176\u4ED6\u8D44\u6E90\u65F6\uFF0C\u5982\u679C\u7533\u8BF7\u4E0D\u5230\uFF0C\u53EF\u4EE5<strong>\u4E3B\u52A8\u91CA\u653E\u4ED6\u5360\u6709\u7684\u8D44\u6E90</strong></p><h3 id="_2-4-\u7834\u574F\u5FAA\u73AF\u7B49\u5F85\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-4-\u7834\u574F\u5FAA\u73AF\u7B49\u5F85\u6761\u4EF6" aria-hidden="true">#</a> 2.4 \u7834\u574F\u5FAA\u73AF\u7B49\u5F85\u6761\u4EF6</h3><p>\u9760\u6309\u987A\u5E8F\u7533\u8BF7\u8D44\u6E90\u6765\u9884\u9632\uFF0C\u6309\u67D0\u4E00\u987A\u5E8F\u7533\u8BF7\u8D44\u6E90\uFF0C\u91CA\u653E\u8D44\u6E90\u5219\u53CD\u5E8F\u91CA\u653E\u3002\u7834\u574F\u5FAA\u73AF\u7B49\u5F85\u6761\u4EF6</p>`,40),l=[d];function r(c,t){return n(),i("div",null,l)}const u=e(s,[["render",r],["__file","java-thread-y-deadlock.html.vue"]]);export{u as default};
