import{_ as e,W as a,X as i,a0 as r}from"./framework-0cf5f349.js";const n={},d=r(`<h1 id="flyway执行oracl存储过程后报错" tabindex="-1"><a class="header-anchor" href="#flyway执行oracl存储过程后报错" aria-hidden="true">#</a> Flyway执行ORACL存储过程后报错</h1><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> 1. 背景</h2><p>在flyway 的脚本中，我们之前有个需求是新建两张表。如果表存在则先删除。</p><p>我们知道在oracle 中表存在则删除需要用到存储过程。但是我们在执行的时候却报错了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ERROR:
Migration V1055__JFLOW_RPT_DML.sql failed
-----------------------------------------
SQL State  : 42000
Error Code : -2007
Message    : 第 46 行, 第 8 列[DECLARE]附近出现错误:
语法分析出错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-解决" tabindex="-1"><a class="header-anchor" href="#_2-解决" aria-hidden="true">#</a> 2. 解决</h2><p>经过排查竟然是flyway 的存储过程后，不能再有sql。他应该是直接commit了。</p><p>所以这种情况就需要分2个脚本来写就没问题了</p>`,8),l=[d];function s(c,t){return a(),i("div",null,l)}const h=e(n,[["render",s],["__file","flyway-y-oracle-procedure.html.vue"]]);export{h as default};
