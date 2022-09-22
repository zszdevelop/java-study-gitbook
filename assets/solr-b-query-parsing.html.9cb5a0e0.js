import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as l,a as t,b as o,e as s,d as e,r as n}from"./app.b4cde55b.js";const i={},h=s('<h1 id="solr\u67E5\u8BE2\u89E3\u6790\u5668" tabindex="-1"><a class="header-anchor" href="#solr\u67E5\u8BE2\u89E3\u6790\u5668" aria-hidden="true">#</a> Solr\u67E5\u8BE2\u89E3\u6790\u5668</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u67E5\u8BE2\u89E3\u6790\u5668\u7528\u4E8E\u5C06\u67E5\u8BE2\u8BED\u53E5\uFF08q\u53C2\u6570\uFF09\u89E3\u6790\u6210\u641C\u7D22\u8BED\u6CD5\u3002</p><h2 id="_2-\u5E38\u7528\u7684\u4E09\u79CD\u89E3\u6790\u5668" tabindex="-1"><a class="header-anchor" href="#_2-\u5E38\u7528\u7684\u4E09\u79CD\u89E3\u6790\u5668" aria-hidden="true">#</a> 2. \u5E38\u7528\u7684\u4E09\u79CD\u89E3\u6790\u5668</h2><h3 id="_2-1-\u9ED8\u8BA4\u89E3\u6790\u5668-lucene" tabindex="-1"><a class="header-anchor" href="#_2-1-\u9ED8\u8BA4\u89E3\u6790\u5668-lucene" aria-hidden="true">#</a> 2.1 \u9ED8\u8BA4\u89E3\u6790\u5668\uFF1Alucene</h3><p>Solr\u5728\u67E5\u8BE2\u7684\u65F6\u5019\uFF0C\u7528\u5230\u4E86QueryParser\u5BF9\u7528\u6237\u8F93\u5165\u505A\u89E3\u6790\uFF0Csolr\u9ED8\u8BA4\u4F7F\u7528\u7684\u89E3\u6790\u5668\u662Flucene\uFF0C\u88AB\u79F0\u4E4B\u4E3AStandard Query Parser\u3002Standard Query Parser\u652F\u6301\u539F\u751F\u7684\u67E5\u8BE2\u8BED\u6CD5\uFF0C\u4F7F\u4F60\u53EF\u4EE5\u65B9\u4FBF\u5730\u6784\u9020\u7ED3\u6784\u5316\u67E5\u8BE2\u8BED\u53E5\u3002\u5F53\u7136\uFF0C\u5B83\u8FD8\u6709\u4E0D\u597D\u7684\uFF0C\u5C31\u662F\u5BB9\u9519\u6BD4\u8F83\u5DEE\uFF0C\u603B\u662F\u628A\u9519\u8BEF\u629B\u51FA\u6765\uFF0C\u800C\u4E0D\u662F\u50CFdismax\u4E00\u6837\u6D88\u5316\u6389\u3002</p><h3 id="_2-2-dismax\u89E3\u6790\u5668" tabindex="-1"><a class="header-anchor" href="#_2-2-dismax\u89E3\u6790\u5668" aria-hidden="true">#</a> 2.2 DisMax\u89E3\u6790\u5668</h3><h4 id="_2-2-1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_2-2-1-\u7B80\u4ECB" aria-hidden="true">#</a> 2.2.1 \u7B80\u4ECB</h4><p>Dismax\u67E5\u8BE2\u53EA\u662F\u7531\u5B50\u67E5\u8BE2\u751F\u6210\u7684\u6587\u6863\u7684\u5E76\u96C6\uFF0C\u5E76\u5BF9\u7531\u5B50\u67E5\u8BE2\u751F\u6210\u7684\u6BCF\u4E2A\u6587\u6863\u6253\u5206\u3002 \u4E00\u822C\u6765\u8BF4\uFF0CDisMax\u67E5\u8BE2\u89E3\u6790\u5668\u7684\u63A5\u53E3\u66F4\u50CF\u662FGoogle\u7684\u63A5\u53E3\uFF0C\u800C\u4E0D\u662F\u6807\u51C6\u7684Solr\u8BF7\u6C42\u5904\u7406\u7A0B\u5E8F\u7684\u63A5\u53E3\u3002 \u8FD9\u79CD\u76F8\u4F3C\u6027\u4F7F\u5F97DisMax\u6210\u4E3A\u8BB8\u591A\u6D88\u8D39\u8005\u5E94\u7528\u7A0B\u5E8F\u7684\u9002\u5F53\u7684\u67E5\u8BE2\u89E3\u6790\u5668\u3002</p><p>\u8BF4\u4EBA\u8BDD\u533A\u522B</p><ol><li>\u65B9\u4FBF\u4E3A\u6BCF\u4E2A\u57DF\u6DFB\u52A0\u6743\u91CD\uFF0C\u5F71\u54CD\u8BC4\u5206</li><li>\u63A5\u53E3\u66F4\u60F3\u662Fgoogle \u7684\u63A5\u53E3\uFF0C\u800C\u4E0D\u662Fsolr/lucene</li><li>\u5F88\u5C11\u629B\u51FA\u5F02\u5E38\u7ED9\u7528\u6237</li></ol><h4 id="_2-2-2-dismax-\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_2-2-2-dismax-\u53C2\u6570" aria-hidden="true">#</a> 2.2.2 DisMax \u53C2\u6570</h4><p>\u9664\u4E86\u901A\u7528\u7684\u67E5\u8BE2\u53C2\u6570\uFF0CDisMax\u8FD8\u6709\u4E00\u4E9B\u81EA\u6709\u7684\u67E5\u8BE2\u53C2\u6570\uFF0C\u4F60\u53EF\u4EE5\u5728solrconfig.xml\u4E2D\u914D\u7F6E\u8FD9\u4E9B\u53C2\u6570\uFF0C\u6216\u8005\u5728\u67E5\u8BE2\u7684\u65F6\u5019\u6307\u5B9A\uFF0C\u8FD9\u6837\u4F1A\u8986\u76D6\u4E4B\u524D\u914D\u7F6E\u7684\u503C\u3002</p><table><thead><tr><th>\u53C2\u6570</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>q</td><td>\u67E5\u8BE2\u53C2\u6570q</td></tr><tr><td>q.alt</td><td>\u5982\u679C\u53C2\u6570q\u6CA1\u6709\u6307\u5B9A\uFF0C\u5C31\u4F7F\u7528standard query parser\u5E76\u4EE3\u66FF\u53C2\u6570q</td></tr><tr><td><strong>qf</strong></td><td><strong>Query Fields\uFF1A\u5728\u54EA\u4E9B\u5B57\u6BB5\u4E0A\u53BB\u68C0\u7D22\u6570\u636E\u3002\u5982\u679C\u4E0D\u6307\u5B9A\u7684\u8BDD\uFF0C\u4F7F\u7528df</strong></td></tr><tr><td><strong>mm</strong></td><td><strong>Minimum Match\uFF1A\u6307\u5B9A\u6700\u5C0F\u5339\u914D\u56E0\u5B50</strong></td></tr><tr><td><strong>pf</strong></td><td><strong>Phrase Fields\uFF1A\u589E\u52A0\u6587\u6863\u7684\u5F97\u5206\u5982\u679Cq\u53C2\u6570\u503C\u79BB\u7684\u5F88\u8FD1</strong></td></tr><tr><td>ps</td><td>Phrase Slop\uFF1A\u6307\u5B9Aq\u53C2\u6570\u4E2D\u4E24\u4E2A\u8BCD\u53EF\u4EE5\u8DDD\u79BB\u591A\u8FDC</td></tr><tr><td>qs</td><td>Query Phrase Slop\uFF1A\u6307\u5B9Aq\u53C2\u6570\u4E2D\u4E24\u4E2A\u8BCD\u53EF\u4EE5\u8DDD\u79BB\u591A\u8FDC\uFF0C\u4E0Eqf\u642D\u914D\u4F7F\u7528</td></tr><tr><td>tie</td><td>Tie Breaker\uFF1A\u4F7F\u7528\u4E00\u4E2A0\u52301\u4E4B\u95F4\u7684\u6D6E\u70B9\u6570</td></tr><tr><td><strong>bq</strong></td><td><strong>Boost Query\uFF1A\u6307\u5B9A\u4E00\u4E2A\u989D\u5916\u56E0\u7D20\u6765\u589E\u52A0\u5339\u914D\u5230\u7684\u6587\u6863\u7684\u5F97\u5206</strong></td></tr><tr><td><strong>bf</strong></td><td><strong>Boost Functions:\u6307\u5B9Aboosts\u4F7F\u7528\u7684\u51FD\u6570</strong></td></tr></tbody></table><h4 id="_2-2-3-dismax-query-parser\u4F7F\u7528\u4E3E\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-2-3-dismax-query-parser\u4F7F\u7528\u4E3E\u4F8B" aria-hidden="true">#</a> 2.2.3 DisMax Query Parser\u4F7F\u7528\u4E3E\u4F8B</h4>',15),c=e('\u4F7F\u7528StandardRequestHandler\u67E5\u8BE2"video" '),_={href:"http://localhost:8983/solr/select?q=video&fl=name+score",target:"_blank",rel:"noopener noreferrer"},p=e("http://localhost:8983/solr/select?q=video&fl=name+score"),f=e("\u5DF2\u7ECF\u914D\u7F6E\u4E86\u67E5\u8BE2\u5B57\u6BB5\uFF1Atext\u3001features\u3001name\u3001id\u3001manu\u3001cat\u3002\u800C\u4E14\u5339\u914D\u4E0Aname\u548Ccat\u4F1A\u6709\u66F4\u9AD8\u7684\u5F97\u5206 "),u={href:"http://localhost:8983/solr/select?defType=dismax&q=video",target:"_blank",rel:"noopener noreferrer"},m=e("http://localhost:8983/solr/select?defType=dismax&q=video"),x=e("\u53EF\u4EE5\u5C06score\u663E\u793A\u51FA\u6765\uFF0C\u770B\u4E00\u4E0B\u5404\u4E2A\u6587\u6863\u7684\u5F97\u5206 "),b={href:"http://localhost:8983/solr/select?defType=dismax&q=video&fl=*,score",target:"_blank",rel:"noopener noreferrer"},g=e("http://localhost:8983/solr/select?defType=dismax&q=video&fl=*,score"),q=e("\u73B0\u5728\u60F3\u8BBE\u7F6Efeatures\u6709\u66F4\u9AD8\u7684\u5F97\u5206\uFF0C\u800Ctext\u6709\u8F83\u4F4E\u7684\u5F97\u5206 "),y={href:"http://localhost:8983/solr/select?defType=dismax&q=video&qf=features%5E20.0+text%5E0.3",target:"_blank",rel:"noopener noreferrer"},k=e("http://localhost:8983/solr/select?defType=dismax&q=video&qf=features^20.0+text^0.3"),v=e("\u73B0\u5728\u5E0C\u671B\u67D0\u4E00\u5B57\u6BB5\u5728\u6EE1\u8DB3\u67D0\u4E00\u60C5\u51B5\u4E0B\u6709\u66F4\u9AD8\u7684\u5F97\u5206 "),T={href:"http://localhost:8983/solr/select?defType=dismax&q=video&bq=cat:electronics%5E5.0",target:"_blank",rel:"noopener noreferrer"},S=e("http://localhost:8983/solr/select?defType=dismax&q=video&bq=cat:electronics^5.0"),D=e("\u73B0\u5728\u60F3\u4F7F\u7528\u6709\u53E6\u5916\u4E00\u4E2A\u4E3Ainstock\u7684handler\uFF0C\u5B83\u914D\u7F6E\u4E86\u4E00\u4E2A\u8FC7\u6EE4\u5668\uFF1AinStock:true "),M={href:"http://localhost:8983/solr/select?defType=dismax&q=video&qt=instock&fl=name,score,inStock",target:"_blank",rel:"noopener noreferrer"},Q=e("http://localhost:8983/solr/select?defType=dismax&q=video&qt=instock&fl=name,score,inStock"),w=e("\u5982\u679C\u67E5\u8BE2\u77ED\u8BED\u7684\u5355\u8BCD\u662F\u4E00\u4E2A\u6216\u8005\u4E24\u4E2A\uFF0C\u539F\u5219\u4E0A\u8FD4\u56DE\u7684\u7ED3\u679C\u4E2D\u5FC5\u987B\u5305\u542B\u5168\u90E8\u5355\u8BCD\uFF0C\u4F46\u662F\u4F60\u7684\u67E5\u8BE2\u77ED\u8BED\u5F88\u957F\uFF0Csolr\u5141\u8BB8\u6709\u5355\u8BCD\u4E0D\u5339\u914D\u3002\u4F60\u53EF\u4EE5\u901A\u8FC7mm\u53C2\u6570\u8BBE\u7F6E\u6700\u591A\u6709\u591A\u5C11\u5355\u8BCD\u4E0D\u5339\u914D\u3002 "),B={href:"http://localhost:8983/solr/select?defType=dismax&q=belkin+ipod+gibberish",target:"_blank",rel:"noopener noreferrer"},E=e("http://localhost:8983/solr/select?defType=dismax&q=belkin+ipod+gibberish"),P=e("\u53EF\u4EE5\u901A\u8FC7\u8C03\u8BD5\u529F\u80FD\u9A8C\u8BC1\u4F60\u7684\u60F3\u6CD5\u3002 "),F={href:"http://localhost:8983/solr/select?defType=dismax&q=belkin+ipod+gibberish&debugQuery=true",target:"_blank",rel:"noopener noreferrer"},N=e("http://localhost:8983/solr/select?defType=dismax&q=belkin+ipod+gibberish&debugQuery=true"),V=s('<h3 id="_2-3-edismax" tabindex="-1"><a class="header-anchor" href="#_2-3-edismax" aria-hidden="true">#</a> 2.3 eDisMax</h3><p>Extended DisMax</p><table><thead><tr><th>\u53C2\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>mm.autoRelax</td><td>\u5982\u679C\u8BBE\u7F6E\u4E3Atrue,\u53EF\u4EE5\u4F7Fmm\u53C2\u6570\u6682\u65F6\u5931\u6548\uFF1A\u6BD4\u5982stopwords\u548Cfq\u53EF\u80FD\u4F1A\u4F7F\u67E5\u8BE2\u7ED3\u679C\u4E3A\u7A7A</td></tr><tr><td>boost</td><td>\u5BF9\u4E8E\u5339\u914D\u7684\u6587\u6863\uFF0C\u8D8A\u591A\u7684\u5B57\u7B26\u4E32\u5339\u914D\u5C06\u4F1A\u53D6\u5F97\u66F4\u9AD8\u7684\u5F97\u5206</td></tr><tr><td>lowercaseOperators</td><td>\u8FD9\u4E2A\u53C2\u6570\u53EF\u4EE5\u7528\u6765\u6307\u793A\u662F\u5426\u628Aor\u548Cand\u5F53\u505AOR\u548CAND\u5904\u7406</td></tr><tr><td>ps</td><td>\u77ED\u8BED\u67E5\u8BE2\u65F6\uFF0C\u9ED8\u8BA4\u7684\u6EA2\u51FA\u91CFamount of slop\uFF0C\u7528\u6765\u5F71\u54CDboosting</td></tr><tr><td>pf2</td><td>\u6307\u5B9A\u591A\u503C\u7684\u5B57\u6BB5\u53EF\u9009\u7684\u6743\u91CD</td></tr><tr><td>ps2</td><td>\u4E0Epf2\u642D\u914D\u4F7F\u7528\uFF0C\u6CA1\u6709\u6307\u5B9A\u7684\u8BDD\uFF0C\u4F7F\u7528ps</td></tr><tr><td>pf3</td><td>\u6307\u5B9A\u591A\u503C\u7684\u5B57\u6BB5\u53EF\u9009\u7684\u6743\u91CD</td></tr><tr><td>ps3</td><td>\u4E0Epf3\u642D\u914D\u4F7F\u7528\uFF0C\u6CA1\u6709\u6307\u5B9A\u7684\u8BDD\uFF0C\u4F7F\u7528ps</td></tr><tr><td>stopwords</td><td>\u5E03\u5C14\u503C\uFF0C\u8BBE\u7F6E\u662F\u5426StopFilterFactory\u751F\u6548\uFF0C\u8BBE\u4E3Afalse\uFF0C\u5219stopwords\u505C\u8BCD\u4E0D\u8D77\u4F5C\u7528</td></tr><tr><td>uf</td><td>\u8BBE\u7F6E\u7528\u6237\u53EF\u4EE5\u4F7F\u7528\u90A3\u4E9B\u5B57\u6BB5\u68C0\u7D22\uFF0C\u9ED8\u8BA4\u662F\u6240\u6709\u5B57\u6BB5\uFF0C\u4E5F\u5C31\u662Fuf=<em>\uFF1B\u8BBE\u7F6E\u4E3Auf=title,\u5C31\u662F\u53EA\u8BA9\u67E5\u8BE2title\u5B57\u6BB5\uFF1B\u8BBE\u7F6E\u4E3Auf=</em>-title\uFF0C\u5C31\u662F\u7981\u6B62\u67E5\u8BE2title\u5B57\u6BB5\uFF1B\u8BBE\u7F6E\u4E3Auf=-*\u5C4F\u853D\u6240\u6709\u5B57\u6BB5\u7684\u68C0\u7D22</td></tr></tbody></table><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>',4),R={href:"https://codeantenna.com/a/liB2jbkEqX",target:"_blank",rel:"noopener noreferrer"},I=e("solr \u67E5\u8BE2\u89E3\u6790\u5668"),L={href:"https://blog.csdn.net/boonya/article/details/55000047",target:"_blank",rel:"noopener noreferrer"},O=e("Solr Dismax\u793A\u4F8B"),j={href:"https://www.w3cschool.cn/solr_doc/solr_doc-vpyf2gn1.html",target:"_blank",rel:"noopener noreferrer"},A=e("Solr\u67E5\u8BE2\uFF1ADisMax\u67E5\u8BE2\u89E3\u6790\u5668");function C(G,H){const r=n("ExternalLinkIcon");return a(),l("div",null,[h,t("ul",null,[t("li",null,[t("p",null,[c,t("a",_,[p,o(r)])])]),t("li",null,[t("p",null,[f,t("a",u,[m,o(r)])])]),t("li",null,[t("p",null,[x,t("a",b,[g,o(r)])])]),t("li",null,[t("p",null,[q,t("a",y,[k,o(r)])])]),t("li",null,[t("p",null,[v,t("a",T,[S,o(r)])])]),t("li",null,[t("p",null,[D,t("a",M,[Q,o(r)])])]),t("li",null,[t("p",null,[w,t("a",B,[E,o(r)])])]),t("li",null,[t("p",null,[P,t("a",F,[N,o(r)])])])]),V,t("p",null,[t("a",R,[I,o(r)])]),t("p",null,[t("a",L,[O,o(r)])]),t("p",null,[t("a",j,[A,o(r)])])])}const J=d(i,[["render",C],["__file","solr-b-query-parsing.html.vue"]]);export{J as default};
