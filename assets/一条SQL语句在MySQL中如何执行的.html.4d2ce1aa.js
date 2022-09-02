import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,a as e,b as i,e as r,d as o,r as d}from"./app.6bf01134.js";const t={},p=r(`<h1 id="\u4E00\u6761sql\u8BED\u53E5\u5728mysql\u4E2D\u5982\u4F55\u6267\u884C\u7684" tabindex="-1"><a class="header-anchor" href="#\u4E00\u6761sql\u8BED\u53E5\u5728mysql\u4E2D\u5982\u4F55\u6267\u884C\u7684" aria-hidden="true">#</a> \u4E00\u6761SQL\u8BED\u53E5\u5728MySQL\u4E2D\u5982\u4F55\u6267\u884C\u7684</h1><p>\u672C\u6587\u4F1A\u5206\u6790\u4E00\u4E2Asql \u8BED\u53E5\u5728MySQL\u4E2D\u7684\u6267\u884C\u6D41\u7A0B\uFF0C\u5305\u62EC</p><ul><li>sql\u7684\u67E5\u8BE2\u5728Mysql\u5185\u90E8\u4F1A\u600E\u4E48\u6D41\u8F6C</li><li>sql\u8BED\u53E5\u7684\u66F4\u65B0\u662F\u600E\u4E48\u5B8C\u6210\u7684</li></ul><p>\u5206\u6790\u4E4B\u524D\u4F1A\u5148\u770BMysql\u7684\u57FA\u7840\u67B6\u6784</p><ul><li>\u77E5\u9053Mysql\u7531\u54EA\u4E9B\u7EC4\u4EF6\u7EC4\u6210</li><li>\u8FD9\u4E9B\u7EC4\u4EF6\u6709\u4EC0\u4E48\u4F5C\u7528</li><li>\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898</li></ul><h2 id="_1-mysql-\u57FA\u7840\u67B6\u6784\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#_1-mysql-\u57FA\u7840\u67B6\u6784\u5206\u6790" aria-hidden="true">#</a> 1. MySQL \u57FA\u7840\u67B6\u6784\u5206\u6790</h2><h3 id="_1-1-mysql-\u57FA\u672C\u67B6\u6784\u6982\u89C8" tabindex="-1"><a class="header-anchor" href="#_1-1-mysql-\u57FA\u672C\u67B6\u6784\u6982\u89C8" aria-hidden="true">#</a> 1.1 MySQL \u57FA\u672C\u67B6\u6784\u6982\u89C8</h3><p>\u4E0B\u56FE\u662FMysql \u7684\u4E00\u4E2A\u7B80\u8981\u67B6\u6784\u56FE\uFF0C\u4ECE\u4E0B\u9762\u7684\u53EF\u4EE5\u6E05\u6670\u7684\u770B\u5230\u7528\u6237\u7684SQL\u8BED\u53E5\u5728MySQL\u5185\u90E8\u662F\u5982\u4F55\u6267\u884C\u7684</p><p>\u5148\u7B80\u5355\u4ECB\u7ECD\u4E00\u4E0B\u4E0B\u56FE\u6D89\u53CA\u5230\u7684\u4E00\u4E9B\u7EC4\u4EF6\u7684\u57FA\u672C\u4F5C\u7528\uFF0C\u5E2E\u5FD9\u5927\u5BB6\u7406\u89E3\u8FD9\u5E45\u56FE\u3002\u57281.2 \u7AE0\u4F1A\u8BE6\u7EC6\u4ECB\u7ECD\u5230\u8FD9\u4E9B\u7EC4\u4EF6\u7684\u4F5C\u7528</p><ul><li>\u8FDE\u63A5\u5668\uFF1A\u8EAB\u4EFD\u8BA4\u8BC1\u548C\u6743\u9650\u76F8\u5173\uFF08\u767B\u5F55MySQL\u7684\u65F6\u5019\uFF09</li><li>\u67E5\u8BE2\u7F13\u5B58\uFF1A\u6267\u884C\u67E5\u8BE2\u8BED\u53E5\u7684\u65F6\u5019\uFF0C\u4F1A\u5148\u67E5\u8BE2\u7F13\u5B58\uFF08MySQL 8.0 \u7248\u672C\u540E\u79FB\u9664\uFF0C\u56E0\u4E3A\u8FD9\u4E2A\u529F\u80FD\u4E0D\u592A\u5B9E\u7528\uFF09</li><li>\u5206\u6790\u5668\uFF1A\u6CA1\u6709\u547D\u4E2D\u7F13\u5B58\u7684\u8BDD\uFF0CSQL \u8BED\u53E5\u5C31\u4F1A\u7ECF\u8FC7\u5206\u6790\u5668\uFF0C\u5206\u6790\u5668\u8BF4\u767D\u4E86\u5C31\u662F\u8981\u5148\u770B\u4F60\u7684SQL \u8BED\u53E5\u8981\u5E72\u561B\uFF0C\u518D\u68C0\u67E5\u4F60\u7684SQL \u8BED\u53E5\u8BED\u6CD5\u662F\u5426\u6B63\u786E</li><li>\u4F18\u5316\u5668\uFF1A\u6309\u7167MySQL \u8BA4\u4E3A\u6700\u4F18\u7684\u65B9\u6848\u53BB\u6267\u884C</li><li>\u6267\u884C\u5668\uFF1A\u6267\u884C\u8BED\u53E5\uFF0C\u7136\u540E\u4ECE\u5B58\u50A8\u5F15\u64CE\u8FD4\u56DE\u6570\u636E</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20190913212622310.png" alt="image-20190913212622310" loading="lazy"></p><p>\u7B80\u5355\u6765\u8BF4Mysql \u4E3B\u8981\u5206\u4E3AServer\u5C42\u548C\u5B58\u50A8\u5F15\u64CE\u5C42</p><ul><li><p>Server\u5C42</p><ul><li><p>\u4E3B\u8981\u5305\u62EC\u8FDE\u63A5\u5668\uFF0C\u67E5\u8BE2\u7F13\u5B58\uFF0C\u5206\u6790\u5668\uFF0C\u4F18\u5316\u5668\uFF0C\u6267\u884C\u5668\u7B49</p></li><li><p>\u6240\u6709\u8DE8\u5B58\u50A8\u5F15\u64CE\u7684\u529F\u80FD\u90FD\u5728\u8FD9\u4E00\u5C42\u5B9E\u73B0\uFF0C\u6BD4\u5982</p><ul><li>\u5B58\u50A8\u8FC7\u7A0B</li><li>\u89E6\u53D1\u5668</li><li>\u89C6\u56FE</li><li>\u51FD\u6570\u7B49</li><li>\u8FD8\u6709\u4E00\u4E2A\u901A\u8FC7\u7684\u65E5\u5FD7\u6A21\u5757binglog\u65E5\u5FD7\u6A21\u5757</li></ul></li></ul></li><li><p>\u5B58\u50A8\u5F15\u64CE\u5C42</p><ul><li>\u4E3B\u8981\u8D1F\u8D23\u6570\u636E\u7684\u5B58\u53D6\u548C\u8BFB\u53D6\uFF0C\u91C7\u7528\u53EF\u4EE5\u66FF\u6362\u7684\u63D2\u4EF6\u5F0F\u67B6\u6784\u3002</li><li>\u652F\u6301InnoDB\u3001MyISAM\u3001Memory\u7B49\u591A\u4E2A\u5B58\u50A8\u5F15\u64CE</li><li>\u5176\u4E2DinnoDB \u5F15\u64CE\u6709\u81EA\u6709\u7684\u65E5\u5FD7\u6A21\u5757redolog</li><li><strong>\u73B0\u5728\u6700\u5E38\u7528\u7684\u5B58\u50A8\u5F15\u64CE\u662FInnoDB,\u4ED6\u4ECEMySQL5.5.5 \u7248\u672C\u5F00\u59CB\u5C31\u88AB\u5F53\u505A\u9ED8\u8BA4\u7684\u5B58\u50A8\u5F15\u64CE\u4E86</strong></li></ul></li></ul><h3 id="_1-2-server-\u5C42\u57FA\u672C\u7EC4\u4EF6\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_1-2-server-\u5C42\u57FA\u672C\u7EC4\u4EF6\u4ECB\u7ECD" aria-hidden="true">#</a> 1.2 Server \u5C42\u57FA\u672C\u7EC4\u4EF6\u4ECB\u7ECD</h3><h4 id="_1-2-1-\u8FDE\u63A5\u5668" tabindex="-1"><a class="header-anchor" href="#_1-2-1-\u8FDE\u63A5\u5668" aria-hidden="true">#</a> 1.2.1 \u8FDE\u63A5\u5668</h4><p>\u8FDE\u63A5\u5668\u4E3B\u8981\u548C\u8EAB\u4EFD\u8BA4\u8BC1\u548C\u6743\u9650\u76F8\u5173\u7684\u529F\u80FD\uFF0C\u5C31\u597D\u6BD4\u4E00\u4E2A\u7EA7\u522B\u5F88\u9AD8\u7684\u95E8\u536B\u4E00\u6837</p><p>\u4E3B\u8981\u8D1F\u8D23\u7528\u6237\u767B\u5F55\u6570\u636E\u5E93\uFF0C\u8FDB\u884C\u7528\u6237\u7684\u8EAB\u4EFD\u8BA4\u8BC1\uFF0C\u5305\u62EC\u6821\u9A8C\u8D26\u6237\u5BC6\u7801\uFF0C\u6743\u9650\u7B49\u64CD\u4F5C\uFF0C\u5982\u679C\u7528\u6237\u8D26\u6237\u5BC6\u7801\u5DF2\u901A\u8FC7\uFF0C\u8FDE\u63A5\u5668\u4F1A\u5230\u6743\u9650\u8868\u4E2D\u67E5\u8BE2\u8BE5\u7528\u6237\u7684\u6240\u6709\u6743\u9650\uFF0C\u4E4B\u540E\u5728\u8FD9\u4E2A\u8FDE\u63A5\u91CC\u7684\u6743\u9650\u903B\u8F91\u5224\u65AD\u90FD\u662F\u4F1A\u4F9D\u8D56\u6B64\u65F6\u8BFB\u53D6\u5230\u7684\u6743\u9650\u6570\u636E\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u540E\u7EED\u53EA\u8981\u8FD9\u4E2A\u8FDE\u63A5\u4E0D\u65AD\u5F00\uFF0C\u5373\u65F6\u7BA1\u7406\u5458\u4FEE\u6539\u4E86\u8BE5\u7528\u6237\u7684\u6743\u9650\uFF0C\u8BE5\u7528\u6237\u4E5F\u662F\u4E0D\u53D7\u5F71\u54CD\u7684\u3002</p><h4 id="_1-2-2-\u67E5\u8BE2\u7F13\u5B58-mysql-8-0-\u7248\u672C\u540E\u79FB\u9664" tabindex="-1"><a class="header-anchor" href="#_1-2-2-\u67E5\u8BE2\u7F13\u5B58-mysql-8-0-\u7248\u672C\u540E\u79FB\u9664" aria-hidden="true">#</a> 1.2.2 \u67E5\u8BE2\u7F13\u5B58\uFF08MySQL 8.0 \u7248\u672C\u540E\u79FB\u9664\uFF09</h4><p>\u67E5\u8BE2\u7F13\u5B58\u4E3B\u8981\u7528\u6765\u7F13\u5B58\u6211\u4EEC\u6240\u6267\u884C\u7684 SELECT \u8BED\u53E5\u4EE5\u53CA\u8BE5\u8BED\u53E5\u7684\u7ED3\u679C\u96C6\u3002</p><p>\u67E5\u8BE2\u7F13\u5B58\u4E3B\u8981\u7528\u6765\u7F13\u5B58\u6211\u4EEC\u6240\u6267\u884C\u7684 SELECT \u8BED\u53E5\u4EE5\u53CA\u8BE5\u8BED\u53E5\u7684\u7ED3\u679C\u96C6\u3002</p><p>\u8FDE\u63A5\u5EFA\u7ACB\u540E\uFF0C\u6267\u884C\u67E5\u8BE2\u8BED\u53E5\u7684\u65F6\u5019\uFF0C\u4F1A\u5148\u67E5\u8BE2\u7F13\u5B58\uFF0CMySQL \u4F1A\u5148\u6821\u9A8C\u8FD9\u4E2A sql \u662F\u5426\u6267\u884C\u8FC7\uFF0C\u4EE5 Key-Value \u7684\u5F62\u5F0F\u7F13\u5B58\u5728\u5185\u5B58\u4E2D\uFF0CKey \u662F\u67E5\u8BE2\u9884\u8BA1\uFF0CValue \u662F\u7ED3\u679C\u96C6\u3002\u5982\u679C\u7F13\u5B58 key \u88AB\u547D\u4E2D\uFF0C\u5C31\u4F1A\u76F4\u63A5\u8FD4\u56DE\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u5982\u679C\u6CA1\u6709\u547D\u4E2D\uFF0C\u5C31\u4F1A\u6267\u884C\u540E\u7EED\u7684\u64CD\u4F5C\uFF0C\u5B8C\u6210\u540E\u4E5F\u4F1A\u628A\u7ED3\u679C\u7F13\u5B58\u8D77\u6765\uFF0C\u65B9\u4FBF\u4E0B\u4E00\u6B21\u8C03\u7528\u3002\u5F53\u7136\u5728\u771F\u6B63\u6267\u884C\u7F13\u5B58\u67E5\u8BE2\u7684\u65F6\u5019\u8FD8\u662F\u4F1A\u6821\u9A8C\u7528\u6237\u7684\u6743\u9650\uFF0C\u662F\u5426\u6709\u8BE5\u8868\u7684\u67E5\u8BE2\u6761\u4EF6\u3002</p><p>MySQL \u67E5\u8BE2\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u7F13\u5B58\uFF0C\u56E0\u4E3A\u67E5\u8BE2\u7F13\u5B58\u5931\u6548\u5728\u5B9E\u9645\u4E1A\u52A1\u573A\u666F\u4E2D\u53EF\u80FD\u4F1A\u975E\u5E38\u9891\u7E41\uFF0C\u5047\u5982\u4F60\u5BF9\u4E00\u4E2A\u8868\u66F4\u65B0\u7684\u8BDD\uFF0C\u8FD9\u4E2A\u8868\u4E0A\u7684\u6240\u6709\u7684\u67E5\u8BE2\u7F13\u5B58\u90FD\u4F1A\u88AB\u6E05\u7A7A\u3002\u5BF9\u4E8E\u4E0D\u7ECF\u5E38\u66F4\u65B0\u7684\u6570\u636E\u6765\u8BF4\uFF0C\u4F7F\u7528\u7F13\u5B58\u8FD8\u662F\u53EF\u4EE5\u7684\u3002</p><p>\u6240\u4EE5\uFF0C\u4E00\u822C\u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u90FD\u662F\u4E0D\u63A8\u8350\u53BB\u4F7F\u7528\u67E5\u8BE2\u7F13\u5B58\u7684\u3002</p><p>MySQL 8.0 \u7248\u672C\u540E\u5220\u9664\u4E86\u7F13\u5B58\u7684\u529F\u80FD\uFF0C\u5B98\u65B9\u4E5F\u662F\u8BA4\u4E3A\u8BE5\u529F\u80FD\u5728\u5B9E\u9645\u7684\u5E94\u7528\u573A\u666F\u6BD4\u8F83\u5C11\uFF0C\u6240\u4EE5\u5E72\u8106\u76F4\u63A5\u5220\u6389\u4E86\u3002</p><h4 id="_1-2-3-\u5206\u6790\u5668" tabindex="-1"><a class="header-anchor" href="#_1-2-3-\u5206\u6790\u5668" aria-hidden="true">#</a> 1.2.3 \u5206\u6790\u5668</h4><p>MySQL \u6CA1\u6709\u547D\u4E2D\u7F13\u5B58\uFF0C\u90A3\u4E48\u5C31\u4F1A\u8FDB\u5165\u5206\u6790\u5668\uFF0C\u5206\u6790\u5668\u4E3B\u8981\u662F\u7528\u6765\u5206\u6790 SQL \u8BED\u53E5\u662F\u6765\u5E72\u561B\u7684\uFF0C\u5206\u6790\u5668\u4E5F\u4F1A\u5206\u4E3A\u51E0\u6B65\uFF1A</p><p><strong>\u7B2C\u4E00\u6B65\uFF0C\u8BCD\u6CD5\u5206\u6790</strong>\uFF0C\u4E00\u6761 SQL \u8BED\u53E5\u6709\u591A\u4E2A\u5B57\u7B26\u4E32\u7EC4\u6210\uFF0C\u9996\u5148\u8981\u63D0\u53D6\u5173\u952E\u5B57\uFF0C\u6BD4\u5982 select\uFF0C\u63D0\u51FA\u67E5\u8BE2\u7684\u8868\uFF0C\u63D0\u51FA\u5B57\u6BB5\u540D\uFF0C\u63D0\u51FA\u67E5\u8BE2\u6761\u4EF6\u7B49\u7B49\u3002\u505A\u5B8C\u8FD9\u4E9B\u64CD\u4F5C\u540E\uFF0C\u5C31\u4F1A\u8FDB\u5165\u7B2C\u4E8C\u6B65\u3002</p><p><strong>\u7B2C\u4E8C\u6B65\uFF0C\u8BED\u6CD5\u5206\u6790</strong>\uFF0C\u4E3B\u8981\u5C31\u662F\u5224\u65AD\u4F60\u8F93\u5165\u7684 sql \u662F\u5426\u6B63\u786E\uFF0C\u662F\u5426\u7B26\u5408 MySQL \u7684\u8BED\u6CD5\u3002</p><p>\u5B8C\u6210\u8FD9 2 \u6B65\u4E4B\u540E\uFF0CMySQL \u5C31\u51C6\u5907\u5F00\u59CB\u6267\u884C\u4E86\uFF0C\u4F46\u662F\u5982\u4F55\u6267\u884C\uFF0C\u600E\u4E48\u6267\u884C\u662F\u6700\u597D\u7684\u7ED3\u679C\u5462\uFF1F\u8FD9\u4E2A\u65F6\u5019\u5C31\u9700\u8981\u4F18\u5316\u5668\u4E0A\u573A\u4E86\u3002</p><h4 id="_1-2-4-\u4F18\u5316\u5668" tabindex="-1"><a class="header-anchor" href="#_1-2-4-\u4F18\u5316\u5668" aria-hidden="true">#</a> 1.2.4 \u4F18\u5316\u5668</h4><p>\u4F18\u5316\u5668\u7684\u4F5C\u7528\u5C31\u662F\u5B83\u8BA4\u4E3A\u7684\u6700\u4F18\u7684\u6267\u884C\u65B9\u6848\u53BB\u6267\u884C\uFF08\u6709\u65F6\u5019\u53EF\u80FD\u4E5F\u4E0D\u662F\u6700\u4F18\uFF0C\u8FD9\u7BC7\u6587\u7AE0\u6D89\u53CA\u5BF9\u8FD9\u90E8\u5206\u77E5\u8BC6\u7684\u6DF1\u5165\u8BB2\u89E3\uFF09\uFF0C\u6BD4\u5982\u591A\u4E2A\u7D22\u5F15\u7684\u65F6\u5019\u8BE5\u5982\u4F55\u9009\u62E9\u7D22\u5F15\uFF0C\u591A\u8868\u67E5\u8BE2\u7684\u65F6\u5019\u5982\u4F55\u9009\u62E9\u5173\u8054\u987A\u5E8F\u7B49\u3002</p><p>\u53EF\u4EE5\u8BF4\uFF0C\u7ECF\u8FC7\u4E86\u4F18\u5316\u5668\u4E4B\u540E\u53EF\u4EE5\u8BF4\u8FD9\u4E2A\u8BED\u53E5\u5177\u4F53\u8BE5\u5982\u4F55\u6267\u884C\u5C31\u5DF2\u7ECF\u5B9A\u4E0B\u6765\u3002</p><h4 id="_1-2-5-\u6267\u884C\u5668" tabindex="-1"><a class="header-anchor" href="#_1-2-5-\u6267\u884C\u5668" aria-hidden="true">#</a> 1.2.5 \u6267\u884C\u5668</h4><p>\u5F53\u9009\u62E9\u4E86\u6267\u884C\u65B9\u6848\u540E\uFF0CMySQL \u5C31\u51C6\u5907\u5F00\u59CB\u6267\u884C\u4E86\uFF0C\u9996\u5148\u6267\u884C\u524D\u4F1A\u6821\u9A8C\u8BE5\u7528\u6237\u6709\u6CA1\u6709\u6743\u9650\uFF0C\u5982\u679C\u6CA1\u6709\u6743\u9650\uFF0C\u5C31\u4F1A\u8FD4\u56DE\u9519\u8BEF\u4FE1\u606F\uFF0C\u5982\u679C\u6709\u6743\u9650\uFF0C\u5C31\u4F1A\u53BB\u8C03\u7528\u5F15\u64CE\u7684\u63A5\u53E3\uFF0C\u8FD4\u56DE\u63A5\u53E3\u6267\u884C\u7684\u7ED3\u679C\u3002</p><h2 id="_2-\u8BED\u6CD5\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#_2-\u8BED\u6CD5\u5206\u6790" aria-hidden="true">#</a> 2. \u8BED\u6CD5\u5206\u6790</h2><h3 id="_2-1-\u67E5\u8BE2\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#_2-1-\u67E5\u8BE2\u8BED\u53E5" aria-hidden="true">#</a> 2.1 \u67E5\u8BE2\u8BED\u53E5</h3><p>\u8BF4\u4E86\u4EE5\u4E0A\u8FD9\u4E48\u591A\uFF0C\u90A3\u4E48\u7A76\u7ADF\u4E00\u6761 sql \u8BED\u53E5\u662F\u5982\u4F55\u6267\u884C\u7684\u5462\uFF1F\u5176\u5B9E\u6211\u4EEC\u7684 sql \u53EF\u4EE5\u5206\u4E3A\u4E24\u79CD\uFF0C\u4E00\u79CD\u662F\u67E5\u8BE2\uFF0C\u4E00\u79CD\u662F\u66F4\u65B0\uFF08\u589E\u52A0\uFF0C\u66F4\u65B0\uFF0C\u5220\u9664\uFF09\u3002\u6211\u4EEC\u5148\u5206\u6790\u4E0B\u67E5\u8BE2\u8BED\u53E5\uFF0C\u8BED\u53E5\u5982\u4E0B\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_student  A <span class="token keyword">where</span> A<span class="token punctuation">.</span>age<span class="token operator">=</span><span class="token string">&#39;18&#39;</span> <span class="token operator">and</span> A<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">&#39; \u5F20\u4E09 &#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7ED3\u5408\u4E0A\u9762\u7684\u8BF4\u660E\uFF0C\u6211\u4EEC\u5206\u6790\u4E0B\u8FD9\u4E2A\u8BED\u53E5\u7684\u6267\u884C\u6D41\u7A0B\uFF1A</p><ul><li>\u5148\u68C0\u67E5\u8BE5\u8BED\u53E5\u662F\u5426\u6709\u6743\u9650\uFF0C\u5982\u679C\u6CA1\u6709\u6743\u9650\uFF0C\u76F4\u63A5\u8FD4\u56DE\u9519\u8BEF\u4FE1\u606F\uFF0C\u5982\u679C\u6709\u6743\u9650\uFF0C\u5728 MySQL8.0 \u7248\u672C\u4EE5\u524D\uFF0C\u4F1A\u5148\u67E5\u8BE2\u7F13\u5B58\uFF0C\u4EE5\u8FD9\u6761 sql \u8BED\u53E5\u4E3A key \u5728\u5185\u5B58\u4E2D\u67E5\u8BE2\u662F\u5426\u6709\u7ED3\u679C\uFF0C\u5982\u679C\u6709\u76F4\u63A5\u7F13\u5B58\uFF0C\u5982\u679C\u6CA1\u6709\uFF0C\u6267\u884C\u4E0B\u4E00\u6B65\u3002</li><li>\u901A\u8FC7\u5206\u6790\u5668\u8FDB\u884C\u8BCD\u6CD5\u5206\u6790\uFF0C\u63D0\u53D6 sql \u8BED\u53E5\u7684\u5173\u952E\u5143\u7D20\uFF0C\u6BD4\u5982\u63D0\u53D6\u4E0A\u9762\u8FD9\u4E2A\u8BED\u53E5\u662F\u67E5\u8BE2 select\uFF0C\u63D0\u53D6\u9700\u8981\u67E5\u8BE2\u7684\u8868\u540D\u4E3A tb_student,\u9700\u8981\u67E5\u8BE2\u6240\u6709\u7684\u5217\uFF0C\u67E5\u8BE2\u6761\u4EF6\u662F\u8FD9\u4E2A\u8868\u7684 id=&#39;1&#39;\u3002\u7136\u540E\u5224\u65AD\u8FD9\u4E2A sql \u8BED\u53E5\u662F\u5426\u6709\u8BED\u6CD5\u9519\u8BEF\uFF0C\u6BD4\u5982\u5173\u952E\u8BCD\u662F\u5426\u6B63\u786E\u7B49\u7B49\uFF0C\u5982\u679C\u68C0\u67E5\u6CA1\u95EE\u9898\u5C31\u6267\u884C\u4E0B\u4E00\u6B65\u3002</li><li>\u63A5\u4E0B\u6765\u5C31\u662F\u4F18\u5316\u5668\u8FDB\u884C\u786E\u5B9A\u6267\u884C\u65B9\u6848\uFF0C\u4E0A\u9762\u7684 sql \u8BED\u53E5\uFF0C\u53EF\u4EE5\u6709\u4E24\u79CD\u6267\u884C\u65B9\u6848\uFF1A</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  a.\u5148\u67E5\u8BE2\u5B66\u751F\u8868\u4E2D\u59D3\u540D\u4E3A\u201C\u5F20\u4E09\u201D\u7684\u5B66\u751F\uFF0C\u7136\u540E\u5224\u65AD\u662F\u5426\u5E74\u9F84\u662F 18\u3002 
  b.\u5148\u627E\u51FA\u5B66\u751F\u4E2D\u5E74\u9F84 18 \u5C81\u7684\u5B66\u751F\uFF0C\u7136\u540E\u518D\u67E5\u8BE2\u59D3\u540D\u4E3A\u201C\u5F20\u4E09\u201D\u7684\u5B66\u751F\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u200B \u90A3\u4E48\u4F18\u5316\u5668\u6839\u636E\u81EA\u5DF1\u7684\u4F18\u5316\u7B97\u6CD5\u8FDB\u884C\u9009\u62E9\u6267\u884C\u6548\u7387\u6700\u597D\u7684\u4E00\u4E2A\u65B9\u6848\uFF08\u4F18\u5316\u5668\u8BA4\u4E3A\uFF0C\u6709\u65F6\u5019\u4E0D\u4E00\u5B9A\u6700\u597D\uFF09\u3002\u90A3\u4E48\u786E\u8BA4\u4E86\u6267\u884C\u8BA1\u5212\u540E\u5C31\u51C6\u5907\u5F00\u59CB\u6267\u884C\u4E86\u3002</p><ul><li>\u8FDB\u884C\u6743\u9650\u6821\u9A8C\uFF0C\u5982\u679C\u6CA1\u6709\u6743\u9650\u5C31\u4F1A\u8FD4\u56DE\u9519\u8BEF\u4FE1\u606F\uFF0C\u5982\u679C\u6709\u6743\u9650\u5C31\u4F1A\u8C03\u7528\u6570\u636E\u5E93\u5F15\u64CE\u63A5\u53E3\uFF0C\u8FD4\u56DE\u5F15\u64CE\u7684\u6267\u884C\u7ED3\u679C\u3002</li></ul><h3 id="_2-2-\u66F4\u65B0\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#_2-2-\u66F4\u65B0\u8BED\u53E5" aria-hidden="true">#</a> 2.2 \u66F4\u65B0\u8BED\u53E5</h3><p>\u4EE5\u4E0A\u5C31\u662F\u4E00\u6761\u67E5\u8BE2 sql \u7684\u6267\u884C\u6D41\u7A0B\uFF0C\u90A3\u4E48\u63A5\u4E0B\u6765\u6211\u4EEC\u770B\u770B\u4E00\u6761\u66F4\u65B0\u8BED\u53E5\u5982\u4F55\u6267\u884C\u7684\u5462\uFF1Fsql \u8BED\u53E5\u5982\u4E0B\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">update</span> tb_student A <span class="token keyword">set</span> A<span class="token punctuation">.</span>age<span class="token operator">=</span><span class="token string">&#39;19&#39;</span> <span class="token keyword">where</span> A<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">&#39; \u5F20\u4E09 &#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u6765\u7ED9\u5F20\u4E09\u4FEE\u6539\u4E0B\u5E74\u9F84\uFF0C\u5728\u5B9E\u9645\u6570\u636E\u5E93\u80AF\u5B9A\u4E0D\u4F1A\u8BBE\u7F6E\u5E74\u9F84\u8FD9\u4E2A\u5B57\u6BB5\u7684\uFF0C\u4E0D\u7136\u8981\u88AB\u6280\u672F\u8D1F\u8D23\u4EBA\u6253\u7684\u3002\u5176\u5B9E\u6761\u8BED\u53E5\u4E5F\u57FA\u672C\u4E0A\u4F1A\u6CBF\u7740\u4E0A\u4E00\u4E2A\u67E5\u8BE2\u7684\u6D41\u7A0B\u8D70\uFF0C\u53EA\u4E0D\u8FC7\u6267\u884C\u66F4\u65B0\u7684\u65F6\u5019\u80AF\u5B9A\u8981\u8BB0\u5F55\u65E5\u5FD7\u5566\uFF0C\u8FD9\u5C31\u4F1A\u5F15\u5165\u65E5\u5FD7\u6A21\u5757\u4E86\uFF0CMySQL \u81EA\u5E26\u7684\u65E5\u5FD7\u6A21\u5757\u5F0F <strong>binlog\uFF08\u5F52\u6863\u65E5\u5FD7\uFF09</strong> \uFF0C\u6240\u6709\u7684\u5B58\u50A8\u5F15\u64CE\u90FD\u53EF\u4EE5\u4F7F\u7528\uFF0C\u6211\u4EEC\u5E38\u7528\u7684 InnoDB \u5F15\u64CE\u8FD8\u81EA\u5E26\u4E86\u4E00\u4E2A\u65E5\u5FD7\u6A21\u5757 <strong>redo log\uFF08\u91CD\u505A\u65E5\u5FD7\uFF09</strong>\uFF0C\u6211\u4EEC\u5C31\u4EE5 InnoDB \u6A21\u5F0F\u4E0B\u6765\u63A2\u8BA8\u8FD9\u4E2A\u8BED\u53E5\u7684\u6267\u884C\u6D41\u7A0B\u3002\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u5148\u67E5\u8BE2\u5230\u5F20\u4E09\u8FD9\u4E00\u6761\u6570\u636E\uFF0C\u5982\u679C\u6709\u7F13\u5B58\uFF0C\u4E5F\u662F\u4F1A\u7528\u5230\u7F13\u5B58\u3002</li><li>\u7136\u540E\u62FF\u5230\u67E5\u8BE2\u7684\u8BED\u53E5\uFF0C\u628A age \u6539\u4E3A 19\uFF0C\u7136\u540E\u8C03\u7528\u5F15\u64CE API \u63A5\u53E3\uFF0C\u5199\u5165\u8FD9\u4E00\u884C\u6570\u636E\uFF0CInnoDB \u5F15\u64CE\u628A\u6570\u636E\u4FDD\u5B58\u5728\u5185\u5B58\u4E2D\uFF0C\u540C\u65F6\u8BB0\u5F55 redo log\uFF0C\u6B64\u65F6 redo log \u8FDB\u5165 prepare \u72B6\u6001\uFF0C\u7136\u540E\u544A\u8BC9\u6267\u884C\u5668\uFF0C\u6267\u884C\u5B8C\u6210\u4E86\uFF0C\u968F\u65F6\u53EF\u4EE5\u63D0\u4EA4\u3002</li><li>\u6267\u884C\u5668\u6536\u5230\u901A\u77E5\u540E\u8BB0\u5F55 binlog\uFF0C\u7136\u540E\u8C03\u7528\u5F15\u64CE\u63A5\u53E3\uFF0C\u63D0\u4EA4 redo log \u4E3A\u63D0\u4EA4\u72B6\u6001\u3002</li><li>\u66F4\u65B0\u5B8C\u6210\u3002</li></ul><h2 id="_3-\u4E3A\u4EC0\u4E48\u8981\u7528\u4E24\u4E2A\u65E5\u5FD7\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#_3-\u4E3A\u4EC0\u4E48\u8981\u7528\u4E24\u4E2A\u65E5\u5FD7\u6A21\u5757" aria-hidden="true">#</a> 3. \u4E3A\u4EC0\u4E48\u8981\u7528\u4E24\u4E2A\u65E5\u5FD7\u6A21\u5757</h2><p><strong>\u8FD9\u91CC\u80AF\u5B9A\u6709\u540C\u5B66\u4F1A\u95EE\uFF0C\u4E3A\u4EC0\u4E48\u8981\u7528\u4E24\u4E2A\u65E5\u5FD7\u6A21\u5757\uFF0C\u7528\u4E00\u4E2A\u65E5\u5FD7\u6A21\u5757\u4E0D\u884C\u5417?</strong></p><p>\u8FD9\u662F\u56E0\u4E3A\u6700\u5F00\u59CB MySQL \u5E76\u6CA1\u4E0E InnoDB \u5F15\u64CE( InnoDB \u5F15\u64CE\u662F\u5176\u4ED6\u516C\u53F8\u4EE5\u63D2\u4EF6\u5F62\u5F0F\u63D2\u5165 MySQL \u7684) \uFF0CMySQL \u81EA\u5E26\u7684\u5F15\u64CE\u662F MyISAM\uFF0C\u4F46\u662F\u6211\u4EEC\u77E5\u9053 redo log \u662F InnoDB \u5F15\u64CE\u7279\u6709\u7684\uFF0C\u5176\u4ED6\u5B58\u50A8\u5F15\u64CE\u90FD\u6CA1\u6709\uFF0C\u8FD9\u5C31\u5BFC\u81F4\u4F1A\u6CA1\u6709 crash-safe \u7684\u80FD\u529B(crash-safe \u7684\u80FD\u529B\u5373\u4F7F\u6570\u636E\u5E93\u53D1\u751F\u5F02\u5E38\u91CD\u542F\uFF0C\u4E4B\u524D\u63D0\u4EA4\u7684\u8BB0\u5F55\u90FD\u4E0D\u4F1A\u4E22\u5931)\uFF0Cbinlog \u65E5\u5FD7\u53EA\u80FD\u7528\u6765\u5F52\u6863\u3002</p><p>\u5E76\u4E0D\u662F\u8BF4\u53EA\u7528\u4E00\u4E2A\u65E5\u5FD7\u6A21\u5757\u4E0D\u53EF\u4EE5\uFF0C\u53EA\u662F InnoDB \u5F15\u64CE\u5C31\u662F\u901A\u8FC7 redo log \u6765\u652F\u6301\u4E8B\u52A1\u7684\u3002\u90A3\u4E48\uFF0C\u53C8\u4F1A\u6709\u540C\u5B66\u95EE\uFF0C\u6211\u7528\u4E24\u4E2A\u65E5\u5FD7\u6A21\u5757\uFF0C\u4F46\u662F\u4E0D\u8981\u8FD9\u4E48\u590D\u6742\u884C\u4E0D\u884C\uFF0C\u4E3A\u4EC0\u4E48 redo log \u8981\u5F15\u5165 prepare \u9884\u63D0\u4EA4\u72B6\u6001\uFF1F\u8FD9\u91CC\u6211\u4EEC\u7528\u53CD\u8BC1\u6CD5\u6765\u8BF4\u660E\u4E0B\u4E3A\u4EC0\u4E48\u8981\u8FD9\u4E48\u505A\uFF1F</p><ul><li><strong>\u5148\u5199 redo log \u76F4\u63A5\u63D0\u4EA4\uFF0C\u7136\u540E\u5199 binlog</strong>\uFF0C\u5047\u8BBE\u5199\u5B8C redo log \u540E\uFF0C\u673A\u5668\u6302\u4E86\uFF0Cbinlog \u65E5\u5FD7\u6CA1\u6709\u88AB\u5199\u5165\uFF0C\u90A3\u4E48\u673A\u5668\u91CD\u542F\u540E\uFF0C\u8FD9\u53F0\u673A\u5668\u4F1A\u901A\u8FC7 redo log \u6062\u590D\u6570\u636E\uFF0C\u4F46\u662F\u8FD9\u4E2A\u65F6\u5019 bingog \u5E76\u6CA1\u6709\u8BB0\u5F55\u8BE5\u6570\u636E\uFF0C\u540E\u7EED\u8FDB\u884C\u673A\u5668\u5907\u4EFD\u7684\u65F6\u5019\uFF0C\u5C31\u4F1A\u4E22\u5931\u8FD9\u4E00\u6761\u6570\u636E\uFF0C\u540C\u65F6\u4E3B\u4ECE\u540C\u6B65\u4E5F\u4F1A\u4E22\u5931\u8FD9\u4E00\u6761\u6570\u636E\u3002</li><li><strong>\u5148\u5199 binlog\uFF0C\u7136\u540E\u5199 redo log</strong>\uFF0C\u5047\u8BBE\u5199\u5B8C\u4E86 binlog\uFF0C\u673A\u5668\u5F02\u5E38\u91CD\u542F\u4E86\uFF0C\u7531\u4E8E\u6CA1\u6709 redo log\uFF0C\u672C\u673A\u662F\u65E0\u6CD5\u6062\u590D\u8FD9\u4E00\u6761\u8BB0\u5F55\u7684\uFF0C\u4F46\u662F binlog \u53C8\u6709\u8BB0\u5F55\uFF0C\u90A3\u4E48\u548C\u4E0A\u9762\u540C\u6837\u7684\u9053\u7406\uFF0C\u5C31\u4F1A\u4EA7\u751F\u6570\u636E\u4E0D\u4E00\u81F4\u7684\u60C5\u51B5\u3002</li></ul><p>\u5982\u679C\u91C7\u7528 redo log \u4E24\u9636\u6BB5\u63D0\u4EA4\u7684\u65B9\u5F0F\u5C31\u4E0D\u4E00\u6837\u4E86\uFF0C\u5199\u5B8C binglog \u540E\uFF0C\u7136\u540E\u518D\u63D0\u4EA4 redo log \u5C31\u4F1A\u9632\u6B62\u51FA\u73B0\u4E0A\u8FF0\u7684\u95EE\u9898\uFF0C\u4ECE\u800C\u4FDD\u8BC1\u4E86\u6570\u636E\u7684\u4E00\u81F4\u6027\u3002\u90A3\u4E48\u95EE\u9898\u6765\u4E86\uFF0C\u6709\u6CA1\u6709\u4E00\u4E2A\u6781\u7AEF\u7684\u60C5\u51B5\u5462\uFF1F\u5047\u8BBE redo log \u5904\u4E8E\u9884\u63D0\u4EA4\u72B6\u6001\uFF0Cbinglog \u4E5F\u5DF2\u7ECF\u5199\u5B8C\u4E86\uFF0C\u8FD9\u4E2A\u65F6\u5019\u53D1\u751F\u4E86\u5F02\u5E38\u91CD\u542F\u4F1A\u600E\u4E48\u6837\u5462\uFF1F \u8FD9\u4E2A\u5C31\u8981\u4F9D\u8D56\u4E8E MySQL \u7684\u5904\u7406\u673A\u5236\u4E86\uFF0CMySQL \u7684\u5904\u7406\u8FC7\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u5224\u65AD redo log \u662F\u5426\u5B8C\u6574\uFF0C\u5982\u679C\u5224\u65AD\u662F\u5B8C\u6574\u7684\uFF0C\u5C31\u7ACB\u5373\u63D0\u4EA4\u3002</li><li>\u5982\u679C redo log \u53EA\u662F\u9884\u63D0\u4EA4\u4F46\u4E0D\u662F commit \u72B6\u6001\uFF0C\u8FD9\u4E2A\u65F6\u5019\u5C31\u4F1A\u53BB\u5224\u65AD binlog \u662F\u5426\u5B8C\u6574\uFF0C\u5982\u679C\u5B8C\u6574\u5C31\u63D0\u4EA4 redo log, \u4E0D\u5B8C\u6574\u5C31\u56DE\u6EDA\u4E8B\u52A1\u3002</li></ul><p>\u8FD9\u6837\u5C31\u89E3\u51B3\u4E86<strong>\u6570\u636E\u4E00\u81F4\u6027\u7684\u95EE\u9898</strong>\u3002</p><h2 id="_4-\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#_4-\u603B\u7ED3" aria-hidden="true">#</a> 4. \u603B\u7ED3</h2><ul><li>MySQL \u4E3B\u8981\u5206\u4E3A Server \u5C42\u548C\u5F15\u64CE\u5C42\uFF0CServer \u5C42\u4E3B\u8981\u5305\u62EC\u8FDE\u63A5\u5668\u3001\u67E5\u8BE2\u7F13\u5B58\u3001\u5206\u6790\u5668\u3001\u4F18\u5316\u5668\u3001\u6267\u884C\u5668\uFF0C\u540C\u65F6\u8FD8\u6709\u4E00\u4E2A\u65E5\u5FD7\u6A21\u5757\uFF08binlog\uFF09\uFF0C\u8FD9\u4E2A\u65E5\u5FD7\u6A21\u5757\u6240\u6709\u6267\u884C\u5F15\u64CE\u90FD\u53EF\u4EE5\u5171\u7528,redolog \u53EA\u6709 InnoDB \u6709\u3002</li><li>\u5F15\u64CE\u5C42\u662F\u63D2\u4EF6\u5F0F\u7684\uFF0C\u76EE\u524D\u4E3B\u8981\u5305\u62EC\uFF0CMyISAM,InnoDB,Memory \u7B49\u3002</li><li>SQL \u7B49\u6267\u884C\u8FC7\u7A0B\u5206\u4E3A\u4E24\u7C7B\uFF0C\u4E00\u7C7B\u5BF9\u4E8E\u67E5\u8BE2\u7B49\u8FC7\u7A0B\u5982\u4E0B\uFF1A\u6743\u9650\u6821\u9A8C---\u300B\u67E5\u8BE2\u7F13\u5B58---\u300B\u5206\u6790\u5668---\u300B\u4F18\u5316\u5668---\u300B\u6743\u9650\u6821\u9A8C---\u300B\u6267\u884C\u5668---\u300B\u5F15\u64CE</li><li>\u5BF9\u4E8E\u66F4\u65B0\u7B49\u8BED\u53E5\u6267\u884C\u6D41\u7A0B\u5982\u4E0B\uFF1A\u5206\u6790\u5668----\u300B\u6743\u9650\u6821\u9A8C----\u300B\u6267\u884C\u5668---\u300B\u5F15\u64CE---redo log prepare---\u300Bbinlog---\u300Bredo log commit</li></ul><h3 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h3>`,59),c={href:"https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485097&idx=1&sn=84c89da477b1338bdf3e9fcd65514ac1&chksm=cea24962f9d5c074d8d3ff1ab04ee8f0d6486e3d015cfd783503685986485c11738ccb542ba7&token=79317275&lang=zh_CN#rd",target:"_blank",rel:"noopener noreferrer"},h=o("\u4E00\u6761SQL\u8BED\u53E5\u5728MySQL\u4E2D\u5982\u4F55\u6267\u884C");function g(u,_){const a=d("ExternalLinkIcon");return n(),s("div",null,[p,e("p",null,[e("a",c,[h,i(a)])])])}var m=l(t,[["render",g],["__file","\u4E00\u6761SQL\u8BED\u53E5\u5728MySQL\u4E2D\u5982\u4F55\u6267\u884C\u7684.html.vue"]]);export{m as default};
