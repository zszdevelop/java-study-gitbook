import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as n,d as i}from"./app.b58ae558.js";const s={},d=i(`<h1 id="linux\u78C1\u76D8\u76D1\u63A7" tabindex="-1"><a class="header-anchor" href="#linux\u78C1\u76D8\u76D1\u63A7" aria-hidden="true">#</a> Linux\u78C1\u76D8\u76D1\u63A7</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>linux\u78C1\u76D8\u76D1\u63A7\u547D\u4EE4\u4E3B\u8981\u6709\uFF0Cdf\uFF0Ciostat,iotop</p><h2 id="_2-\u76D1\u63A7\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_2-\u76D1\u63A7\u547D\u4EE4" aria-hidden="true">#</a> 2. \u76D1\u63A7\u547D\u4EE4</h2><h3 id="_2-1-df" tabindex="-1"><a class="header-anchor" href="#_2-1-df" aria-hidden="true">#</a> 2.1 df</h3><h4 id="_2-1-1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_2-1-1-\u7B80\u4ECB" aria-hidden="true">#</a> 2.1.1 \u7B80\u4ECB</h4><p>df\u547D\u4EE4 \u7528\u4E8E\u663E\u793A\u78C1\u76D8\u5206\u533A\u4E0A\u7684\u53EF\u4F7F\u7528\u7684\u78C1\u76D8\u7A7A\u95F4\u3002\u5982\u679C\u6CA1\u6709\u6587\u4EF6\u540D\u88AB\u6307\u5B9A\uFF0C\u5219\u663E\u793A\u5F53\u524D\u6240\u6709\u88AB\u6302\u8F7D\u7684\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u9ED8\u8BA4\u4EE5 KB \u4E3A\u5355\u4F4D\u3002</p><h4 id="_2-1-2-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-1-2-\u8BED\u6CD5" aria-hidden="true">#</a> 2.1.2 \u8BED\u6CD5\uFF1A</h4><div class="language-erlang ext-erlang line-numbers-mode"><pre class="language-erlang"><code><span class="token atom">df</span> <span class="token punctuation">(</span>\u9009\u9879<span class="token punctuation">)</span> <span class="token punctuation">(</span>\u53C2\u6570<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u9009\u9879\uFF1A <code>-a</code> \u5168\u90E8\u6587\u4EF6\u7CFB\u7EDF\u5217\u8868 <code>-h</code> \u4EE5\u65B9\u4FBF\u9605\u8BFB\u7684\u65B9\u5F0F\u663E\u793A <code>-i</code> \u663E\u793Ainode\u4FE1\u606F <code>-T</code> \u663E\u793A\u6587\u4EF6\u7CFB\u7EDF\u7C7B\u578B <code>-l</code> \u53EA\u663E\u793A\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF <code>-k</code> \u4EE5KB\u4E3A\u5355\u4F4D <code>-m</code> \u4EE5MB\u4E3A\u5355\u4F4D</p><p>\u53C2\u6570\uFF1A</p><ul><li>\u6587\u4EF6\uFF1A\u6307\u5B9A\u6587\u4EF6\u7CFB\u7EDF\u4E0A\u7684\u6587\u4EF6\u3002</li></ul><h4 id="_2-1-3-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-1-3-\u793A\u4F8B" aria-hidden="true">#</a> 2.1.3 \u793A\u4F8B</h4><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145602336.png" alt="image-20220401145602336" loading="lazy"></p><h4 id="_2-1-4-tldr-\u4E2D\u7684\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_2-1-4-tldr-\u4E2D\u7684\u4ECB\u7ECD" aria-hidden="true">#</a> 2.1.4 tldr \u4E2D\u7684\u4ECB\u7ECD</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">df</span>

  Gives an overview of the filesystem disk space usage.
  \u6982\u8FF0\u4E86\u6587\u4EF6\u7CFB\u7EDF\u78C1\u76D8\u7A7A\u95F4\u7684\u4F7F\u7528\u60C5\u51B5\u3002
  More information: https://www.gnu.org/software/coreutils/df.

  - Display all filesystems and their disk usage:
  	\u663E\u793A\u6240\u6709\u6587\u4EF6\u7CFB\u7EDF\u53CA\u5176\u78C1\u76D8\u4F7F\u7528\u60C5\u51B5:
    <span class="token function">df</span>

  - Display all filesystems and their disk usage <span class="token keyword">in</span> human readable form:
  	\u4EE5\u4EBA\u7C7B\u53EF\u8BFB\u7684\u5F62\u5F0F\u663E\u793A\u6240\u6709\u6587\u4EF6\u7CFB\u7EDF\u53CA\u5176\u78C1\u76D8\u4F7F\u7528\u60C5\u51B5:
    <span class="token function">df</span> <span class="token parameter variable">-h</span>

  - Display the filesystem and its disk usage containing the given <span class="token function">file</span> or directory:
  	\u663E\u793A\u5305\u542B\u6307\u5B9A\u6587\u4EF6\u6216\u76EE\u5F55\u7684\u6587\u4EF6\u7CFB\u7EDF\u53CA\u5176\u78C1\u76D8\u4F7F\u7528\u60C5\u51B5:
    <span class="token function">df</span> path/to/file_or_directory

  - Display statistics on the number of <span class="token function">free</span> inodes:
    <span class="token function">df</span> <span class="token parameter variable">-i</span>

  - Display filesystems but exclude the specified types:
    <span class="token function">df</span> <span class="token parameter variable">-x</span> squashfs <span class="token parameter variable">-x</span> tmpfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-iostat" tabindex="-1"><a class="header-anchor" href="#_2-2-iostat" aria-hidden="true">#</a> 2.2 iostat</h3><h4 id="_2-2-1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_2-2-1-\u7B80\u4ECB" aria-hidden="true">#</a> 2.2.1 \u7B80\u4ECB</h4><p>iostat\u547D\u4EE4 \u88AB\u7528\u4E8E\u76D1\u89C6\u7CFB\u7EDF\u8F93\u5165\u8F93\u51FA\u8BBE\u5907\u548CCPU\u7684\u4F7F\u7528\u60C5\u51B5\u3002</p><h4 id="_2-2-2-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-2-2-\u8BED\u6CD5" aria-hidden="true">#</a> 2.2.2 \u8BED\u6CD5\uFF1A</h4><div class="language-erlang ext-erlang line-numbers-mode"><pre class="language-erlang"><code><span class="token atom">iostat</span> <span class="token punctuation">(</span>\u9009\u9879<span class="token punctuation">)</span> <span class="token punctuation">(</span>\u53C2\u6570<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u9009\u9879\uFF1A <code>-c</code>\uFF1A\u4EC5\u663E\u793ACPU\u4F7F\u7528\u60C5\u51B5\uFF1B <code>-d</code>\uFF1A\u4EC5\u663E\u793A\u8BBE\u5907\u5229\u7528\u7387\uFF1B <code>-k</code>\uFF1A\u663E\u793A\u72B6\u6001\u4EE5\u5343\u5B57\u8282\u6BCF\u79D2\u4E3A\u5355\u4F4D\uFF0C\u800C\u4E0D\u4F7F\u7528\u5757\u6BCF\u79D2\uFF1B <code>-m</code>\uFF1A\u663E\u793A\u72B6\u6001\u4EE5\u5146\u5B57\u8282\u6BCF\u79D2\u4E3A\u5355\u4F4D\uFF1B <code>-p</code>\uFF1A\u4EC5\u663E\u793A\u5757\u8BBE\u5907\u548C\u6240\u6709\u88AB\u4F7F\u7528\u7684\u5176\u4ED6\u5206\u533A\u7684\u72B6\u6001\uFF1B <code>-t</code>\uFF1A\u663E\u793A\u6BCF\u4E2A\u62A5\u544A\u4EA7\u751F\u65F6\u7684\u65F6\u95F4\uFF1B <code>-V</code>\uFF1A\u663E\u793A\u7248\u53F7\u5E76\u9000\u51FA\uFF1B <code>-x</code>\uFF1A\u663E\u793A\u6269\u5C55\u72B6\u6001\u3002</p><p>\u53C2\u6570\uFF1A</p><ul><li>\u95F4\u9694\u65F6\u95F4\uFF1A\u6BCF\u6B21\u62A5\u544A\u7684\u95F4\u9694\u65F6\u95F4\uFF08\u79D2\uFF09\uFF1B</li><li>\u6B21\u6570\uFF1A\u663E\u793A\u62A5\u544A\u7684\u6B21\u6570\u3002</li></ul><h4 id="_2-2-3-\u5B57\u6BB5\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#_2-2-3-\u5B57\u6BB5\u8BF4\u660E" aria-hidden="true">#</a> 2.2.3 \u5B57\u6BB5\u8BF4\u660E\uFF1A</h4><ul><li><code>r/s</code>: \u6BCF\u79D2\u5B8C\u6210\u7684\u8BFB I/O \u8BBE\u5907\u6B21\u6570\u3002</li><li><code>w/s</code>: \u6BCF\u79D2\u5B8C\u6210\u7684\u5199 I/O \u8BBE\u5907\u6B21\u6570\u3002</li><li><code>rkB/s</code>: \u6BCF\u79D2\u8BFBK\u5B57\u8282\u6570.\u662F rsect/s \u7684\u4E00\u534A,\u56E0\u4E3A\u6BCF\u6247\u533A\u5927\u5C0F\u4E3A512\u5B57\u8282\u3002</li><li><code>wkB/s</code>: \u6BCF\u79D2\u5199K\u5B57\u8282\u6570.\u662F wsect/s \u7684\u4E00\u534A\u3002</li><li><code>avgrq-sz</code>: \u5E73\u5747\u6BCF\u6B21\u8BBE\u5907I/O\u64CD\u4F5C\u7684\u6570\u636E\u5927\u5C0F (\u6247\u533A)\u3002</li><li><code>avgqu-sz</code>: \u5E73\u5747I/O\u961F\u5217\u957F\u5EA6\u3002</li><li><code>await</code>: \u5E73\u5747\u6BCF\u6B21\u8BBE\u5907I/O\u64CD\u4F5C\u7684\u7B49\u5F85\u65F6\u95F4 (\u6BEB\u79D2)\u3002</li><li><code>svctm</code>: \u5E73\u5747\u6BCF\u6B21\u8BBE\u5907I/O\u64CD\u4F5C\u7684\u670D\u52A1\u65F6\u95F4 (\u6BEB\u79D2)\u3002</li><li><code>%util</code>: \u4E00\u79D2\u4E2D\u6709\u767E\u5206\u4E4B\u591A\u5C11\u7684\u65F6\u95F4\u7528\u4E8E I/O \u64CD\u4F5C,\u6216\u8005\u8BF4\u4E00\u79D2\u4E2D\u6709\u591A\u5C11\u65F6\u95F4 I/O \u961F\u5217\u662F\u975E\u7A7A\u7684\u3002</li></ul><h4 id="_2-2-4-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-2-4-\u793A\u4F8B" aria-hidden="true">#</a> 2.2.4 \u793A\u4F8B</h4><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401145950590.png" alt="image-20220401145950590" loading="lazy"></p><h3 id="_2-3-iotop" tabindex="-1"><a class="header-anchor" href="#_2-3-iotop" aria-hidden="true">#</a> 2.3 . iotop</h3><blockquote><p>centos\u6CA1\u6709\u8BE5\u547D\u540D</p></blockquote><h4 id="_2-3-1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_2-3-1-\u7B80\u4ECB" aria-hidden="true">#</a> 2.3.1 \u7B80\u4ECB</h4><p>iotop\u547D\u4EE4 \u662F\u4E00\u4E2A\u7528\u6765\u76D1\u89C6\u78C1\u76D8I/O\u4F7F\u7528\u72B6\u51B5\u7684top\u7C7B\u5DE5\u5177\u3002</p><p>iotop\u5177\u6709\u4E0Etop\u76F8\u4F3C\u7684UI\uFF0C\u5176\u4E2D\u5305\u62ECPID\u3001\u7528\u6237\u3001I/O\u3001\u8FDB\u7A0B\u7B49\u76F8\u5173\u4FE1\u606F\u3002Linux\u4E0B\u7684IO\u7EDF\u8BA1\u5DE5\u5177\u5982iostat\uFF0Cnmon\u7B49\u5927\u591A\u6570\u662F\u53EA\u80FD\u7EDF\u8BA1\u5230per\u8BBE\u5907\u7684\u8BFB\u5199\u60C5\u51B5\uFF0C\u5982\u679C\u4F60\u60F3\u77E5\u9053\u6BCF\u4E2A\u8FDB\u7A0B\u662F\u5982\u4F55\u4F7F\u7528IO\u7684\u5C31\u6BD4\u8F83\u9EBB\u70E6\uFF0C\u4F7F\u7528iotop\u547D\u4EE4\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u67E5\u770B\u3002</p><h4 id="_2-3-2-\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-3-2-\u8BED\u6CD5" aria-hidden="true">#</a> 2.3.2 \u8BED\u6CD5\uFF1A</h4><div class="language-erlang ext-erlang line-numbers-mode"><pre class="language-erlang"><code><span class="token atom">iotop</span> <span class="token punctuation">(</span>\u9009\u9879<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u9009\u9879\uFF1A <code>-o</code>\uFF1A\u53EA\u663E\u793A\u6709io\u64CD\u4F5C\u7684\u8FDB\u7A0B <code>-b</code>\uFF1A\u6279\u91CF\u663E\u793A\uFF0C\u65E0\u4EA4\u4E92\uFF0C\u4E3B\u8981\u7528\u4F5C\u8BB0\u5F55\u5230\u6587\u4EF6\u3002 <code>-n</code>\uFF1A NUM\uFF1A\u663E\u793ANUM\u6B21\uFF0C\u4E3B\u8981\u7528\u4E8E\u975E\u4EA4\u4E92\u5F0F\u6A21\u5F0F\u3002 <code>-d SEC</code>\uFF1A\u95F4\u9694SEC\u79D2\u663E\u793A\u4E00\u6B21\u3002 <code>-p PID</code>\uFF1A\u76D1\u63A7\u7684\u8FDB\u7A0Bpid\u3002 <code>-u USER</code>\uFF1A\u76D1\u63A7\u7684\u8FDB\u7A0B\u7528\u6237\u3002</p><h4 id="_2-3-3-iotop\u5E38\u7528\u5FEB\u6377\u952E" tabindex="-1"><a class="header-anchor" href="#_2-3-3-iotop\u5E38\u7528\u5FEB\u6377\u952E" aria-hidden="true">#</a> 2.3.3 iotop\u5E38\u7528\u5FEB\u6377\u952E\uFF1A</h4><ul><li>\u5DE6\u53F3\u7BAD\u5934\uFF1A\u6539\u53D8\u6392\u5E8F\u65B9\u5F0F\uFF0C\u9ED8\u8BA4\u662F\u6309IO\u6392\u5E8F\u3002</li><li>r\uFF1A\u6539\u53D8\u6392\u5E8F\u987A\u5E8F\u3002</li><li>o\uFF1A\u53EA\u663E\u793A\u6709IO\u8F93\u51FA\u7684\u8FDB\u7A0B\u3002</li><li>p\uFF1A\u8FDB\u7A0B/\u7EBF\u7A0B\u7684\u663E\u793A\u65B9\u5F0F\u7684\u5207\u6362\u3002</li><li>a\uFF1A\u663E\u793A\u7D2F\u79EF\u4F7F\u7528\u91CF\u3002</li><li>q\uFF1A\u9000\u51FA\u3002</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401150415728.png" alt="image-20220401150415728" loading="lazy"></p>`,39),l=[d];function o(c,t){return a(),n("div",null,l)}const h=e(s,[["render",o],["__file","linux-j-disk.html.vue"]]);export{h as default};
