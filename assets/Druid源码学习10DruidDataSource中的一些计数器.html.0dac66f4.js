import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as o,a as t,b as a,e as r,d as i,r as c}from"./app.6bf01134.js";const l={},h=r('<h1 id="druid\u6E90\u7801\u5B66\u4E60-\u5341-druiddatasource\u4E2D\u7684\u4E00\u4E9B\u8BA1\u6570\u5668" tabindex="-1"><a class="header-anchor" href="#druid\u6E90\u7801\u5B66\u4E60-\u5341-druiddatasource\u4E2D\u7684\u4E00\u4E9B\u8BA1\u6570\u5668" aria-hidden="true">#</a> Druid\u6E90\u7801\u5B66\u4E60\uFF08\u5341\uFF09-DruidDataSource\u4E2D\u7684\u4E00\u4E9B\u8BA1\u6570\u5668</h1><p>\u5728 Druid \u8FDE\u63A5\u6C60\u7684\u5DE5\u4F5C\u8FC7\u7A0B\u4E2D\uFF0C\u4F1A\u7528\u5230\u4E00\u4E9B\u8BA1\u6570\u5668\u5BF9Druid\u7684\u60C5\u51B5\u8FDB\u884C\u5224\u65AD\u3002\u7136\u540E\u6839\u636E\u8BA1\u6570\u5668\u7684\u6570\u636E\u91C7\u53D6\u4E00\u7CFB\u5217\u64CD\u4F5C\uFF0C\u6574\u7406\u5982\u4E0B:</p><h2 id="_1-\u7EDF\u8BA1\u7C7B\u7684\u8BA1\u6570\u5668" tabindex="-1"><a class="header-anchor" href="#_1-\u7EDF\u8BA1\u7C7B\u7684\u8BA1\u6570\u5668" aria-hidden="true">#</a> 1. \u7EDF\u8BA1\u7C7B\u7684\u8BA1\u6570\u5668</h2><table><thead><tr><th>\u53D8\u91CF\u540D</th><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>connectCount</td><td>long</td><td>getConnectionInternal\u88AB\u8C03\u7528\u4E4B\u540E\u5C31\u4F1A\u589E\u52A0\uFF0C\u610F\u5473\u7740\u8FDE\u63A5\u88ABget\u7684\u6B21\u6570\u3002</td></tr><tr><td>closeCount</td><td>long</td><td>\u8FDE\u63A5\u8C03\u7528recycle\u4E2D\uFF0C\u5305\u62EC\u56DE\u6536\u3001\u5173\u95ED\u7B49\u60C5\u51B5\uFF0C\u6210\u529F\u4E4B\u540E\u4F1A\u589E\u52A0\uFF0C\u6807\u8BC6\u8FDE\u63A5\u5173\u95ED\u7684\u6B21\u6570\u3002</td></tr><tr><td>recycleCount</td><td>long</td><td>\u8FDE\u63A5\u8C03\u7528recycle\u6210\u529F\u4E4B\u540E\u624D\u4F1A\u589E\u52A0\uFF0C\u4E0D\u5305\u62EC\u5728\u56DE\u6536\u8FC7\u7A0B\u4E2D\u5173\u95ED\u7684\u60C5\u51B5\u3002\u6807\u8BC6\u8FDE\u63A5\u771F\u6B63\u56DE\u6536\u7684\u6B21\u6570\u3002</td></tr><tr><td>removeAbandonedCount</td><td>long</td><td>\u8FDE\u63A5\u8C03\u7528removeAbandoned\u6210\u529F\u4E4B\u540E\u624D\u4F1A\u589E\u52A0\uFF0C\u6807\u8BC6\u8FDE\u63A5\u8DDF\u8E2A\u6CC4\u9732\u673A\u5236\u7684\u6267\u884C\u6B21\u6570\u3002</td></tr><tr><td>notEmptyWaitCount</td><td>long</td><td>\u8FDE\u63A5\u8C03\u7528pollLast\u6216\u8005tackLast\u4E4B\u540E\u5C31\u4F1A\u589E\u52A0\uFF0C\u5B9E\u9645\u4E0A\u662F\u89E6\u53D1notEmpty.await\u7684\u7684\u6B21\u6570.</td></tr><tr><td>notEmptySignalCount</td><td>long</td><td>\u8FDE\u63A5\u89E6\u53D1notEmpty\u7684signal\u7684\u6B21\u6570\u3002</td></tr><tr><td>discardCount</td><td>volatile long</td><td>\u8C03\u7528discard\u6210\u529F\u4E4B\u540E\u7684\u6B21\u6570\u3002</td></tr></tbody></table><p>\u4E0A\u8FF0long\u7C7B\u578B\u7684\u8BA1\u6570\u5668\uFF0C\u5168\u90E8\u53EA\u4F1A\u589E\u52A0\uFF0C\u4E0D\u4F1A\u51CF\u5C11\uFF0C\u5728Druid\u5DE5\u4F5C\u7684\u8FC7\u7A0B\u4E2D\u8FDB\u884C\u7EDF\u8BA1\u548C\u76D1\u63A7\u4F5C\u7528\u3002</p><h2 id="_2-\u72B6\u6001\u76F8\u5173\u7684\u8BA1\u6570\u5668" tabindex="-1"><a class="header-anchor" href="#_2-\u72B6\u6001\u76F8\u5173\u7684\u8BA1\u6570\u5668" aria-hidden="true">#</a> 2.\u72B6\u6001\u76F8\u5173\u7684\u8BA1\u6570\u5668</h2><table><thead><tr><th>\u53D8\u91CF\u540D</th><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>poolingCount</td><td>int</td><td>DruidConnectionHolder[] connections\u6570\u7EC4\u4E2D\u8FDE\u63A5\u7684\u6570\u91CF\u3002</td></tr><tr><td>activeCount</td><td>int</td><td>Map&lt;DruidPooledConnection, Object&gt; activeConnections \u4E2D\u7684\u8FDE\u63A5\u6570\u91CF\u3002</td></tr><tr><td>notEmptyWaitThreadCount</td><td>int</td><td>\u8FDE\u63A5\u88AB\u53D6\u51FA\u4E4B\u540E\uFF0C\u89E6\u53D1notEmpty\u8FDB\u884Cwait\u7EBF\u7A0B\u7684\u6570\u91CF\u3002</td></tr><tr><td>activePeak</td><td>int</td><td>activeCount\u51FA\u73B0\u7684\u5CF0\u503C\u3002</td></tr><tr><td>poolingPeak</td><td>int</td><td>poolingCount\u51FA\u73B0\u7684\u5CF0\u503C\u3002</td></tr><tr><td>createTaskCount</td><td>int</td><td>\u521B\u5EFA\u8FDE\u63A5\u7EBF\u7A0B\u6570\u7684\u8BA1\u6570\u5668\u3002</td></tr></tbody></table><h2 id="_3-\u76F8\u5173\u7684\u5224\u65AD\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#_3-\u76F8\u5173\u7684\u5224\u65AD\u903B\u8F91" aria-hidden="true">#</a> 3. \u76F8\u5173\u7684\u5224\u65AD\u903B\u8F91\uFF1A</h2><p>poolingCount &lt; initialSize \u65F6\uFF0C\u521B\u5EFA\u8FDE\u63A5\u4EE5\u8FBE\u5230\u521D\u59CB\u5316\u8FDE\u63A5\u6570\u3002 poolingCount &gt;= maxActive \u65F6\uFF0C\u56DE\u6536\u7684\u8FDE\u63A5\u4F1A\u88AB\u62D2\u7EDD\u653E\u5165connections\u4E2D\u3002</p><p>activeCount + poolingCount &gt;= maxActive\u65F6\uFF0C empty.await()\uFF0C\u521B\u5EFA\u8FDE\u63A5\u7684\u7EBF\u7A0B\u4F1A\u88AB\u53D6\u6D88\u3002 activeCount + poolingCount &lt;= minIdle \u65F6\uFF0C\u901A\u77E5emptySignal(),\u901A\u77E5\u7EE7\u7EED\u521B\u5EFA\u8FDE\u63A5\u3002 keepAlive &amp;&amp; poolingCount + activeCount &lt; minIdle \u65F6\uFF0C\u518Dshrink\u65B9\u6CD5\u4E2DneedFill\u4E3Atrue,\u4F1A\u89E6\u53D1\u901A\u77E5emptySignal(),\u7EE7\u7EED\u521B\u5EFA\u8FDE\u63A5\u3002 activeCount + poolingCount + createTaskCount &gt;= maxActive \u65F6\uFF0C\u5F00\u542F\u4E86createScheduler\uFF0C\u5219\u4F1A\u53D6\u6D88createScheduler\u7684\u521B\u5EFA\u4EFB\u52A1\u3002 activeCount &lt;= minIdle \u65F6\uFF0C\u89E6\u53D1emptySignal()\uFF0C\u521B\u5EFA\u8FDE\u63A5\u3002</p><h2 id="_4-\u5B58\u50A8connection\u7684\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#_4-\u5B58\u50A8connection\u7684\u5BB9\u5668" aria-hidden="true">#</a> 4. \u5B58\u50A8Connection\u7684\u5BB9\u5668</h2><table><thead><tr><th>\u53D8\u91CF\u540D</th><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>connections</td><td>DruidConnectionHolder[]</td><td>\u8FDE\u63A5\u5B58\u653E\u7684\u6570\u7EC4\u3002</td></tr><tr><td>keepAliveConnections</td><td>DruidConnectionHolder[]</td><td>keepAlive\u8FDE\u63A5\u5B58\u653E\u7684\u6570\u7EC4\u3002\u53EA\u4F1A\u5728shrink\u4E2D\u5F00\u542F\u4E86keepalive\u624D\u4F1A\u4F7F\u7528\u3002</td></tr><tr><td>evictConnections</td><td>DruidConnectionHolder[]</td><td>\u9700\u8981\u5173\u95ED\u7684\u8FDE\u63A5\u5B58\u653E\u7684\u6570\u7EC4\u3002shrink\u4E2D\u8BE5\u6570\u7EC4\u4E2D\u7684\u8FDE\u63A5\u90FD\u4F1A\u88AB\u5173\u95ED\u6389\u3002</td></tr><tr><td>activeConnections</td><td>Map&lt;DruidPooledConnection, Object&gt;</td><td>getConnection\u4E4B\u540E\uFF0C\u5B58\u653E\u7684\u5BB9\u5668\u3002</td></tr></tbody></table><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220525230547564.png" alt="image-20220525230547564" loading="lazy"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>',14),u={href:"https://blog.csdn.net/dhaibo1986/article/details/121430733?spm=1001.2014.3001.5502",target:"_blank",rel:"noopener noreferrer"},s=i("Druid\u6E90\u7801\u9605\u8BFB10-DruidDataSource\u4E2D\u7684\u4E00\u4E9B\u8BA1\u6570\u5668");function p(g,_){const d=c("ExternalLinkIcon");return n(),o("div",null,[h,t("p",null,[t("a",u,[s,a(d)])])])}var b=e(l,[["render",p],["__file","Druid\u6E90\u7801\u5B66\u4E6010DruidDataSource\u4E2D\u7684\u4E00\u4E9B\u8BA1\u6570\u5668.html.vue"]]);export{b as default};
