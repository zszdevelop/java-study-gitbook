import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.1937b20f.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u624B\u5199sql\u9762\u8BD5\u9898" tabindex="-1"><a class="header-anchor" href="#\u624B\u5199sql\u9762\u8BD5\u9898" aria-hidden="true">#</a> \u624B\u5199SQL\u9762\u8BD5\u9898</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>\u5E38\u89C1\u7684\u8BED\u6CD5sql\u9762\u5F97\u4E0D\u591A\uFF0C\u66F4\u591A\u7684\u4F1A\u5728\u5206\u7EC4\u548C\u7EDF\u8BA1\u76F8\u5173\u7684\u9762\u5F97\u6BD4\u8F83\u591A</p><ul><li>GROUP BY <ul><li>\u5982\u679C\u7528group by \uFF0C\u90A3\u4E48\u4F60\u7684select\u8BED\u53E5\u4E2D\u9009\u51FA\u7684\u5217\u8981\u4E48\u662F\u4F60group by\u91CC\u7528\u5230\u7684\u5217\uFF0C\u8981\u4E48\u5C31\u662F\u5E26\u6709\u4E4B\u524D\u6211\u4EEC\u8BF4\u7684sum\uFF0Cmin \u7B49\u51FD\u6570\u7684\u5217</li></ul></li><li>HAVING <ul><li>\u901A\u5E38\u4E0Egroup by \u5B50\u53E5\u4E00\u8D77\u4F7F\u7528</li><li>where \u8FC7\u6EE4\u884C\uFF0Chaving \u8FC7\u6EE4\u7EC4</li><li>\u51FA\u73B0\u5728\u540C\u4E00sql\u987A\u5E8F\uFF1Awhere &gt; group by&gt;having</li></ul></li><li>\u7EDF\u8BA1\u76F8\u5173: COUNT,SUM,MAX,MIN,AVG</li></ul><h2 id="_2-sql-\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#_2-sql-\u51C6\u5907" aria-hidden="true">#</a> 2. SQL \u51C6\u5907</h2><ol><li>\u8868\u5173\u7CFB</li></ol><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210406211823871.png" alt="image-20210406211823871"></p><ol start="2"><li><p>\u5B66\u751F\u8868 student</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> student <span class="token punctuation">(</span>\nstudent_id <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>\nname <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\nage <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\nsex <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\n<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>student_id<span class="token punctuation">)</span>\n<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">8</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span>UTF8<span class="token punctuation">;</span>\n\n\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;\u674E\u96F7&#39;</span><span class="token punctuation">,</span><span class="token number">19</span><span class="token punctuation">,</span><span class="token string">&#39;\u5973&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;\u97E9\u6885\u6885&#39;</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token string">&#39;\u7537&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;polly&#39;</span><span class="token punctuation">,</span><span class="token number">17</span><span class="token punctuation">,</span><span class="token string">&#39;\u5973&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">&#39;tom&#39;</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token string">&#39;\u7537&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token string">&#39;\u5927\u536B&#39;</span><span class="token punctuation">,</span><span class="token number">17</span><span class="token punctuation">,</span><span class="token string">&#39;\u7537&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token string">&#39;\u9732\u4E1D&#39;</span><span class="token punctuation">,</span><span class="token number">19</span><span class="token punctuation">,</span><span class="token string">&#39;\u5973&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token string">&#39;\u6770\u514B&#39;</span><span class="token punctuation">,</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token string">&#39;\u7537&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5206\u6570\u8868score</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> score <span class="token punctuation">(</span>\nstudent_id <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\ncourse_id <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\nscore <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span>\n<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span>UTF8<span class="token punctuation">;</span>\n\n\n<span class="token keyword">BEGIN</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">81</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">92</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">47</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">68</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">67</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">52</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>score<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u8BFE\u7A0B\u8868</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> course <span class="token punctuation">(</span>\ncourse_id <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>\nname <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>\n<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>course_id<span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> <span class="token operator">=</span>UTF8<span class="token punctuation">;</span>\n\n\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> course <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;\u8BED\u6587&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> course <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;\u6570\u5B66&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> course <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;\u82F1\u8BED&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> course <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">&#39;\u7269\u7406&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_3-group-by-\u7EC3\u4E60" tabindex="-1"><a class="header-anchor" href="#_3-group-by-\u7EC3\u4E60" aria-hidden="true">#</a> 3. GROUP BY \u7EC3\u4E60</h2><ol><li><p>\u67E5\u8BE2\u6240\u6709\u540C\u5B66\u7684\u5B66\u53F7\uFF0C\u9009\u8BFE\u6570\uFF0C\u603B\u6210\u7EE9</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span> student_id <span class="token punctuation">,</span><span class="token function">COUNT</span><span class="token punctuation">(</span>course_id<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">SUM</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span>\n<span class="token keyword">FROM</span> score\n<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> student_id\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210406215817378.png" alt="image-20210406215817378"></p></li><li><p>\u67E5\u8BE2\u6240\u6709\u540C\u5B66\u7684\u5B66\u53F7\uFF0C\u59D3\u540D\uFF0C\u9009\u8BFE\u6570\uFF0C\u603B\u6210\u7EE9</p><p>\u5206\u6570\u548C\u5B66\u751F\u4FE1\u606F\u5728\u4E0D\u540C\u7684\u8868\u4E2D\uFF0C\u9700\u8981\u8054\u5408\u8868</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>student_id <span class="token punctuation">,</span>stu<span class="token punctuation">.</span>name<span class="token punctuation">,</span><span class="token function">COUNT</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>course_id<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">SUM</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>score<span class="token punctuation">)</span>\n<span class="token keyword">FROM</span> score s<span class="token punctuation">,</span>\nstudent stu\n<span class="token keyword">WHERE</span> s<span class="token punctuation">.</span>student_id <span class="token operator">=</span> stu<span class="token punctuation">.</span>student_id\n<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> s<span class="token punctuation">.</span>student_id\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210406220759681.png" alt="image-20210406220759681"></p></li></ol><h2 id="_4-having-\u7EC3\u4E60" tabindex="-1"><a class="header-anchor" href="#_4-having-\u7EC3\u4E60" aria-hidden="true">#</a> 4. HAVING \u7EC3\u4E60</h2><ol><li><p>\u67E5\u8BE2\u6CA1\u6709\u8840\u6CC9\u6240\u6709\u8BFE\u7684\u540C\u5B66\u7684\u5B66\u53F7\u3001\u59D3\u540D</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span> stu<span class="token punctuation">.</span>student_id<span class="token punctuation">,</span>stu<span class="token punctuation">.</span>name\n<span class="token keyword">FROM</span> \nstudent stu<span class="token punctuation">,</span>\nscore s\n<span class="token keyword">WHERE</span> stu<span class="token punctuation">.</span>student_id <span class="token operator">=</span> s<span class="token punctuation">.</span>student_id\n<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> s<span class="token punctuation">.</span>student_id\n<span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token punctuation">(</span>\n<span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> course<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210406221302898.png" alt="image-20210406221302898"></p></li></ol>', 12);
const _hoisted_13 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_13);
}
var __SQL____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u624B\u5199SQL\u9762\u8BD5\u9898.html.vue"]]);
export { __SQL____html as default };
