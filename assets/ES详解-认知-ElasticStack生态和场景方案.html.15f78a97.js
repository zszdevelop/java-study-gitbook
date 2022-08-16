import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="es\u8BE6\u89E3-\u8BA4\u77E5-elastic-stack\u751F\u6001\u548C\u573A\u666F\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#es\u8BE6\u89E3-\u8BA4\u77E5-elastic-stack\u751F\u6001\u548C\u573A\u666F\u65B9\u6848" aria-hidden="true">#</a> ES\u8BE6\u89E3 - \u8BA4\u77E5\uFF1AElastic Stack\u751F\u6001\u548C\u573A\u666F\u65B9\u6848</h1><blockquote><p>\u5728\u4E86\u89E3ElaticSearch\u4E4B\u540E\uFF0C\u6211\u4EEC\u8FD8\u8981\u4E86\u89E3Elastic\u80CC\u540E\u7684\u751F\u6001\u5373\u6211\u4EEC\u5E38\u8BF4\u7684ELK\uFF1B\u4E0E\u6B64\u540C\u65F6\uFF0C\u8FD8\u4F1A\u7ED9\u4F60\u5C55\u793AElasticSearch\u7684\u6848\u4F8B\u573A\u666F\uFF0C\u8BA9\u4F60\u5728\u5B66\u4E60ES\u524D\u5BF9\u5B83\u6709\u4E2A\u5168\u5C40\u7684\u5370\u8C61\u3002</p></blockquote><h2 id="_1-elastic-stack\u751F\u6001" tabindex="-1"><a class="header-anchor" href="#_1-elastic-stack\u751F\u6001" aria-hidden="true">#</a> 1. Elastic Stack\u751F\u6001</h2><blockquote><p>Beats + Logstash + ElasticSearch + Kibana</p></blockquote><p>\u5982\u4E0B\u662F\u6211\u4ECE\u5B98\u65B9\u535A\u5BA2\u4E2D\u627E\u5230\u56FE\uFF0C\u8FD9\u5F20\u56FE\u5C55\u793A\u4E86ELK\u751F\u6001\u4EE5\u53CA\u57FA\u4E8EELK\u7684\u573A\u666F\uFF08\u6700\u4E0A\u65B9\uFF09</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802220951170.png" alt="image-20220802220951170"></p><p>\u7531\u4E8EElastic X-Pack\u662F\u9762\u5411\u6536\u8D39\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u4E0D\u59A8\u4E5F\u628AX-Pack\u653E\u8FDB\u53BB\uFF0C\u770B\u770B\u54EA\u4E9B\u662F\u7531X-Pack\u5E26\u6765\u7684\uFF0C\u5728\u9605\u8BFB\u5B98\u7F51\u6587\u6863\u65F6\u5C06\u65B9\u4FBF\u4F60\u7504\u522B\u91CD\u70B9\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802221330037.png" alt="image-20220802221330037"></p><h3 id="_1-1-beats" tabindex="-1"><a class="header-anchor" href="#_1-1-beats" aria-hidden="true">#</a> 1.1 Beats</h3><p>Beats\u662F\u4E00\u4E2A\u9762\u5411<strong>\u8F7B\u91CF\u578B\u91C7\u96C6\u5668</strong>\u7684\u5E73\u53F0\uFF0C\u8FD9\u4E9B\u91C7\u96C6\u5668\u53EF\u4EE5\u4ECE\u8FB9\u7F18\u673A\u5668\u5411Logstash\u3001ElasticSearch\u53D1\u9001\u6570\u636E\uFF0C\u5B83\u662F\u7531Go\u8BED\u8A00\u8FDB\u884C\u5F00\u53D1\u7684\uFF0C\u8FD0\u884C\u6548\u7387\u65B9\u9762\u6BD4\u8F83\u5FEB\u3002\u4ECE\u4E0B\u56FE\u4E2D\u53EF\u4EE5\u770B\u51FA\uFF0C\u4E0D\u540CBeats\u7684\u5957\u4EF6\u662F\u9488\u5BF9\u4E0D\u540C\u7684\u6570\u636E\u6E90\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802221745257.png" alt="image-20220802221745257"></p><h3 id="_1-2-logstash" tabindex="-1"><a class="header-anchor" href="#_1-2-logstash" aria-hidden="true">#</a> 1.2 Logstash</h3><p>Logstash\u662F<strong>\u52A8\u6001\u6570\u636E\u6536\u96C6\u7BA1\u9053</strong>\uFF0C\u62E5\u6709\u53EF\u6269\u5C55\u7684\u63D2\u4EF6\u751F\u6001\u7CFB\u7EDF\uFF0C\u652F\u6301\u4ECE\u4E0D\u540C\u6765\u6E90\u91C7\u96C6\u6570\u636E\uFF0C\u8F6C\u6362\u6570\u636E\uFF0C\u5E76\u5C06\u6570\u636E\u53D1\u9001\u5230\u4E0D\u540C\u7684\u5B58\u50A8\u5E93\u4E2D\u3002\u5176\u80FD\u591F\u4E0EElasticSearch\u4EA7\u751F\u5F3A\u5927\u7684\u534F\u540C\u4F5C\u7528\uFF0C\u540E\u88ABElastic\u516C\u53F8\u57282013\u5E74\u6536\u8D2D\u3002</p><p>\u5B83\u5177\u6709\u5982\u4E0B\u7279\u6027\uFF1A</p><p>1\uFF09\u5B9E\u65F6\u89E3\u6790\u548C\u8F6C\u6362\u6570\u636E\uFF1B</p><p>2\uFF09\u53EF\u6269\u5C55\uFF0C\u5177\u6709200\u591A\u4E2A\u63D2\u4EF6\uFF1B</p><p>3\uFF09\u53EF\u9760\u6027\u3001\u5B89\u5168\u6027\u3002Logstash\u4F1A\u901A\u8FC7\u6301\u4E45\u5316\u961F\u5217\u6765\u4FDD\u8BC1\u81F3\u5C11\u5C06\u8FD0\u884C\u4E2D\u7684\u4E8B\u4EF6\u9001\u8FBE\u4E00\u6B21\uFF0C\u540C\u65F6\u5C06\u6570\u636E\u8FDB\u884C\u4F20\u8F93\u52A0\u5BC6\uFF1B</p><p>4\uFF09\u76D1\u63A7\uFF1B</p><h3 id="_1-3-elasticsearch" tabindex="-1"><a class="header-anchor" href="#_1-3-elasticsearch" aria-hidden="true">#</a> 1.3 ElasticSearch</h3><p>ElasticSearch\u5BF9\u6570\u636E\u8FDB\u884C<strong>\u641C\u7D22\u3001\u5206\u6790\u548C\u5B58\u50A8</strong>\uFF0C\u5176\u662F\u57FA\u4E8EJSON\u7684\u5206\u5E03\u5F0F\u641C\u7D22\u548C\u5206\u6790\u5F15\u64CE\uFF0C\u4E13\u95E8\u4E3A\u5B9E\u73B0\u6C34\u5E73\u53EF\u6269\u5C55\u6027\u3001\u9AD8\u53EF\u9760\u6027\u548C\u7BA1\u7406\u4FBF\u6377\u6027\u800C\u8BBE\u8BA1\u7684\u3002</p><p>\u5B83\u7684\u5B9E\u73B0\u539F\u7406\u4E3B\u8981\u5206\u4E3A\u4EE5\u4E0B\u51E0\u4E2A\u6B65\u9AA4\uFF1A</p><p>1\uFF09\u9996\u5148\u7528\u6237\u5C06\u6570\u636E\u63D0\u4EA4\u5230ElasticSearch\u6570\u636E\u5E93\u4E2D\uFF1B</p><p>2\uFF09\u518D\u901A\u8FC7\u5206\u8BCD\u63A7\u5236\u5668\u5C06\u5BF9\u5E94\u7684\u8BED\u53E5\u5206\u8BCD\uFF1B</p><p>3\uFF09\u5C06\u5206\u8BCD\u7ED3\u679C\u53CA\u5176\u6743\u91CD\u4E00\u5E76\u5B58\u5165\uFF0C\u4EE5\u5907\u7528\u6237\u5728\u641C\u7D22\u6570\u636E\u65F6\uFF0C\u6839\u636E\u6743\u91CD\u5C06\u7ED3\u679C\u6392\u540D\u548C\u6253\u5206\uFF0C\u5C06\u8FD4\u56DE\u7ED3\u679C\u5448\u73B0\u7ED9\u7528\u6237\uFF1B</p><h3 id="_1-4-kibana" tabindex="-1"><a class="header-anchor" href="#_1-4-kibana" aria-hidden="true">#</a> 1.4 Kibana</h3><p>Kibana\u5B9E\u73B0<strong>\u6570\u636E\u53EF\u89C6\u5316</strong>\uFF0C\u5176\u4F5C\u7528\u5C31\u662F\u5728ElasticSearch\u4E2D\u8FDB\u884C\u6C11\u822A\u3002Kibana\u80FD\u591F\u4EE5\u56FE\u8868\u7684\u5F62\u5F0F\u5448\u73B0\u6570\u636E\uFF0C\u5E76\u4E14\u5177\u6709\u53EF\u6269\u5C55\u7684\u7528\u6237\u754C\u9762\uFF0C\u53EF\u4EE5\u5168\u65B9\u4F4D\u7684\u914D\u7F6E\u548C\u7BA1\u7406ElasticSearch\u3002</p><p>Kibana\u6700\u65E9\u7684\u65F6\u5019\u662F\u57FA\u4E8ELogstash\u521B\u5EFA\u7684\u5DE5\u5177\uFF0C\u540E\u88ABElastic\u516C\u53F8\u57282013\u5E74\u6536\u8D2D\u3002</p><p>1\uFF09Kibana\u53EF\u4EE5\u63D0\u4F9B\u5404\u79CD\u53EF\u89C6\u5316\u7684\u56FE\u8868\uFF1B</p><p>2\uFF09\u53EF\u4EE5\u901A\u8FC7\u673A\u5668\u5B66\u4E60\u7684\u6280\u672F\uFF0C\u5BF9\u5F02\u5E38\u60C5\u51B5\u8FDB\u884C\u68C0\u6D4B\uFF0C\u7528\u4E8E\u63D0\u524D\u53D1\u73B0\u53EF\u7591\u95EE\u9898\uFF1B</p><h2 id="_2-\u4ECE\u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF\u770Bes-stack\u7684\u53D1\u5C55" tabindex="-1"><a class="header-anchor" href="#_2-\u4ECE\u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF\u770Bes-stack\u7684\u53D1\u5C55" aria-hidden="true">#</a> 2. \u4ECE\u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF\u770BES Stack\u7684\u53D1\u5C55</h2><blockquote><p>\u6211\u4EEC\u770B\u4E0BELK\u6280\u672F\u6808\u7684\u6F14\u5316\uFF0C\u901A\u5E38\u4F53\u73B0\u5728\u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF\u4E2D\u3002</p></blockquote><p>\u4E00\u4E2A\u5178\u578B\u7684\u65E5\u5FD7\u7CFB\u7EDF\u5305\u62EC\uFF1A</p><p>\uFF081\uFF09\u6536\u96C6\uFF1A\u80FD\u591F\u91C7\u96C6\u591A\u79CD\u6765\u6E90\u7684\u65E5\u5FD7\u6570\u636E</p><p>\uFF082\uFF09\u4F20\u8F93\uFF1A\u80FD\u591F\u7A33\u5B9A\u7684\u628A\u65E5\u5FD7\u6570\u636E\u89E3\u6790\u8FC7\u6EE4\u5E76\u4F20\u8F93\u5230\u5B58\u50A8\u7CFB\u7EDF</p><p>\uFF083\uFF09\u5B58\u50A8\uFF1A\u5B58\u50A8\u65E5\u5FD7\u6570\u636E</p><p>\uFF084\uFF09\u5206\u6790\uFF1A\u652F\u6301 UI \u5206\u6790</p><p>\uFF085\uFF09\u8B66\u544A\uFF1A\u80FD\u591F\u63D0\u4F9B\u9519\u8BEF\u62A5\u544A\uFF0C\u76D1\u63A7\u673A\u5236</p><h3 id="_2-1-beats-elasticsearch-kibana" tabindex="-1"><a class="header-anchor" href="#_2-1-beats-elasticsearch-kibana" aria-hidden="true">#</a> 2.1 beats+elasticsearch+kibana</h3><p>Beats\u91C7\u96C6\u6570\u636E\u540E\uFF0C\u5B58\u50A8\u5728ES\u4E2D\uFF0C\u6709Kibana\u53EF\u89C6\u5316\u7684\u5C55\u793A\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802225759473.png" alt="image-20220802225759473"></p><h3 id="_2-2-beats-logstath-elasticsearch-kibana" tabindex="-1"><a class="header-anchor" href="#_2-2-beats-logstath-elasticsearch-kibana" aria-hidden="true">#</a> 2.2 beats+logstath+elasticsearch+kibana</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802225849444.png" alt="image-20220802225849444"></p><p>\u8BE5\u6846\u67B6\u662F\u5728\u4E0A\u9762\u7684\u6846\u67B6\u7684\u57FA\u7840\u4E0A\u5F15\u5165\u4E86logstash\uFF0C\u5F15\u5165logstash\u5E26\u6765\u7684\u597D\u5904\u5982\u4E0B\uFF1A</p><p>\uFF081\uFF09Logstash\u5177\u6709\u57FA\u4E8E\u78C1\u76D8\u7684\u81EA\u9002\u5E94\u7F13\u51B2\u7CFB\u7EDF\uFF0C\u8BE5\u7CFB\u7EDF\u5C06\u5438\u6536\u4F20\u5165\u7684\u541E\u5410\u91CF\uFF0C\u4ECE\u800C\u51CF\u8F7B\u80CC\u538B\u3002</p><p>\uFF082\uFF09\u4ECE\u5176\u4ED6\u6570\u636E\u6E90\uFF08\u4F8B\u5982\u6570\u636E\u5E93\uFF0CS3\u6216\u6D88\u606F\u4F20\u9012\u961F\u5217\uFF09\u4E2D\u63D0\u53D6\u3002</p><p>\uFF083\uFF09\u5C06\u6570\u636E\u53D1\u9001\u5230\u591A\u4E2A\u76EE\u7684\u5730\uFF0C\u4F8B\u5982S3\uFF0CHDFS\u6216\u5199\u5165\u6587\u4EF6\u3002</p><p>\uFF084\uFF09\u4F7F\u7528\u6761\u4EF6\u6570\u636E\u6D41\u903B\u8F91\u7EC4\u6210\u66F4\u590D\u6742\u7684\u5904\u7406\u7BA1\u9053\u3002</p><p><strong>beats\u7ED3\u5408logstash\u5E26\u6765\u7684\u4F18\u52BF</strong>\uFF1A</p><p>\uFF081\uFF09\u6C34\u5E73\u53EF\u6269\u5C55\u6027\uFF0C\u9AD8\u53EF\u7528\u6027\u548C\u53EF\u53D8\u8D1F\u8F7D\u5904\u7406\uFF1Abeats\u548Clogstash\u53EF\u4EE5\u5B9E\u73B0\u8282\u70B9\u4E4B\u95F4\u7684\u8D1F\u8F7D\u5747\u8861\uFF0C\u591A\u4E2Alogstash\u53EF\u4EE5\u5B9E\u73B0logstash\u7684\u9AD8\u53EF\u7528</p><p>\uFF082\uFF09\u6D88\u606F\u6301\u4E45\u6027\u4E0E\u81F3\u5C11\u4E00\u6B21\u4EA4\u4ED8\u4FDD\u8BC1\uFF1A\u4F7F\u7528beats\u6216Winlogbeat\u8FDB\u884C\u65E5\u5FD7\u6536\u96C6\u65F6\uFF0C\u53EF\u4EE5\u4FDD\u8BC1\u81F3\u5C11\u4E00\u6B21\u4EA4\u4ED8\u3002\u4ECEFilebeat\u6216Winlogbeat\u5230Logstash\u4EE5\u53CA\u4ECELogstash\u5230Elasticsearch\u7684\u4E24\u79CD\u901A\u4FE1\u534F\u8BAE\u90FD\u662F\u540C\u6B65\u7684\uFF0C\u5E76\u4E14\u652F\u6301\u786E\u8BA4\u3002Logstash\u6301\u4E45\u961F\u5217\u63D0\u4F9B\u8DE8\u8282\u70B9\u6545\u969C\u7684\u4FDD\u62A4\u3002\u5BF9\u4E8ELogstash\u4E2D\u7684\u78C1\u76D8\u7EA7\u5F39\u6027\uFF0C\u786E\u4FDD\u78C1\u76D8\u5197\u4F59\u975E\u5E38\u91CD\u8981\u3002</p><p>\uFF083\uFF09\u5177\u6709\u8EAB\u4EFD\u9A8C\u8BC1\u548C\u6709\u7EBF\u52A0\u5BC6\u7684\u7AEF\u5230\u7AEF\u5B89\u5168\u4F20\u8F93\uFF1A\u4ECEBeats\u5230Logstash\u4EE5\u53CA\u4ECE Logstash\u5230Elasticsearch\u7684\u4F20\u8F93\u90FD\u53EF\u4EE5\u4F7F\u7528\u52A0\u5BC6\u65B9\u5F0F\u4F20\u9012 \u3002\u4E0EElasticsearch\u8FDB\u884C\u901A\u8BAF\u65F6\uFF0C\u6709\u5F88\u591A\u5B89\u5168\u9009\u9879\uFF0C\u5305\u62EC\u57FA\u672C\u8EAB\u4EFD\u9A8C\u8BC1\uFF0CTLS\uFF0CPKI\uFF0CLDAP\uFF0CAD\u548C\u5176\u4ED6\u81EA\u5B9A\u4E49\u9886\u57DF</p><p><strong>\u589E\u52A0\u66F4\u591A\u7684\u6570\u636E\u6E90</strong> \u6BD4\u5982\uFF1ATCP\uFF0CUDP\u548CHTTP\u534F\u8BAE\u662F\u5C06\u6570\u636E\u8F93\u5165Logstash\u7684\u5E38\u7528\u65B9\u6CD5</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802230523930.png" alt="image-20220802230523930"></p><h3 id="_2-3-beats-mq-logstash-elasticsearch-kibana" tabindex="-1"><a class="header-anchor" href="#_2-3-beats-mq-logstash-elasticsearch-kibana" aria-hidden="true">#</a> 2.3 beats+MQ+logstash+elasticsearch+kibana</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802230554852.png" alt="image-20220802230554852"></p><p>\u5728\u5982\u4E0A\u7684\u57FA\u7840\u4E0A\u6211\u4EEC\u53EF\u4EE5\u5728beats\u548Clogstash\u4E2D\u95F4\u6DFB\u52A0\u4E00\u4E9B\u7EC4\u4EF6redis\u3001kafka\u3001RabbitMQ\u7B49\uFF0C\u6DFB\u52A0\u4E2D\u95F4\u4EF6\u5C06\u4F1A\u6709\u5982\u4E0B\u597D\u5904\uFF1A</p><p>\uFF081\uFF09\u964D\u4F4E\u5BF9\u65E5\u5FD7\u6240\u5728\u673A\u5668\u7684\u5F71\u54CD\uFF0C\u8FD9\u4E9B\u673A\u5668\u4E0A\u4E00\u822C\u90FD\u90E8\u7F72\u7740\u53CD\u5411\u4EE3\u7406\u6216\u5E94\u7528\u670D\u52A1\uFF0C\u672C\u8EAB\u8D1F\u8F7D\u5C31\u5F88\u91CD\u4E86\uFF0C\u6240\u4EE5\u5C3D\u53EF\u80FD\u7684\u5728\u8FD9\u4E9B\u673A\u5668\u4E0A\u5C11\u505A\u4E8B\uFF1B</p><p>\uFF082\uFF09\u5982\u679C\u6709\u5F88\u591A\u53F0\u673A\u5668\u9700\u8981\u505A\u65E5\u5FD7\u6536\u96C6\uFF0C\u90A3\u4E48\u8BA9\u6BCF\u53F0\u673A\u5668\u90FD\u5411Elasticsearch\u6301\u7EED\u5199\u5165\u6570\u636E\uFF0C\u5FC5\u7136\u4F1A\u5BF9Elasticsearch\u9020\u6210\u538B\u529B\uFF0C\u56E0\u6B64\u9700\u8981\u5BF9\u6570\u636E\u8FDB\u884C\u7F13\u51B2\uFF0C\u540C\u65F6\uFF0C\u8FD9\u6837\u7684\u7F13\u51B2\u4E5F\u53EF\u4EE5\u4E00\u5B9A\u7A0B\u5EA6\u7684\u4FDD\u62A4\u6570\u636E\u4E0D\u4E22\u5931\uFF1B</p><p>\uFF083\uFF09\u5C06\u65E5\u5FD7\u6570\u636E\u7684\u683C\u5F0F\u5316\u4E0E\u5904\u7406\u653E\u5230Indexer\u4E2D\u7EDF\u4E00\u505A\uFF0C\u53EF\u4EE5\u5728\u4E00\u5904\u4FEE\u6539\u4EE3\u7801\u3001\u90E8\u7F72\uFF0C\u907F\u514D\u9700\u8981\u5230\u591A\u53F0\u673A\u5668\u4E0A\u53BB\u4FEE\u6539\u914D\u7F6E\uFF1B</p><h2 id="_3-elastic-stack\u6700\u4F73\u5B9E\u8DF5" tabindex="-1"><a class="header-anchor" href="#_3-elastic-stack\u6700\u4F73\u5B9E\u8DF5" aria-hidden="true">#</a> 3. Elastic Stack\u6700\u4F73\u5B9E\u8DF5</h2><blockquote><p>\u6211\u4EEC\u518D\u770B\u4E0B\u5B98\u65B9\u5F00\u53D1\u6210\u5458\u5206\u4EAB\u7684\u6700\u4F73\u5B9E\u8DF5\u3002</p></blockquote><h3 id="_3-1-\u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#_3-1-\u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF" aria-hidden="true">#</a> 3.1 \u65E5\u5FD7\u6536\u96C6\u7CFB\u7EDF</h3><p>\uFF08PS\uFF1A\u5C31\u662F\u6211\u4EEC\u4E0A\u9762\u9610\u8FF0\u7684\uFF09</p><p>\u57FA\u672C\u7684\u65E5\u5FD7\u7CFB\u7EDF</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802230911770.png" alt="image-20220802230911770"></p><p>\u589E\u52A0\u6570\u636E\u6E90\uFF0C\u548C\u4F7F\u7528MQ</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802231002429.png" alt="image-20220802231002429"></p><h3 id="_3-2-metric\u6536\u96C6\u548Capm\u6027\u80FD\u76D1\u63A7" tabindex="-1"><a class="header-anchor" href="#_3-2-metric\u6536\u96C6\u548Capm\u6027\u80FD\u76D1\u63A7" aria-hidden="true">#</a> 3.2 Metric\u6536\u96C6\u548CAPM\u6027\u80FD\u76D1\u63A7</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802231030438.png" alt="image-20220802231030438"></p><h3 id="_3-3-\u591A\u6570\u636E\u4E2D\u5FC3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#_3-3-\u591A\u6570\u636E\u4E2D\u5FC3\u65B9\u6848" aria-hidden="true">#</a> 3.3 \u591A\u6570\u636E\u4E2D\u5FC3\u65B9\u6848</h3><p>\u901A\u8FC7\u5197\u4F59\u5B9E\u73B0\u6570\u636E\u9AD8\u53EF\u7528</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802231118627.png" alt="image-20220802231118627"></p><p>\u4E24\u4E2A\u6570\u636E\u91C7\u96C6\u4E2D\u5FC3\uFF08\u6BD4\u5982\u91C7\u96C6\u4E24\u4E2A\u5DE5\u5382\u7684\u6570\u636E\uFF09\uFF0C\u91C7\u96C6\u6570\u636E\u540E\u7684\u6C47\u805A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802231140850.png" alt="image-20220802231140850"></p><p>\u6570\u636E\u5206\u6563\uFF0C\u8DE8\u96C6\u7FA4\u7684\u641C\u7D22</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220802231212499.png" alt="image-20220802231212499"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 77);
const _hoisted_78 = {
  href: "https://pdai.tech/md/db/nosql-es/elasticsearch-x-introduce-2.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_79 = /* @__PURE__ */ createBaseVNode("strong", null, "ES\u8BE6\u89E3 - \u8BA4\u77E5\uFF1AElastic Stack\u751F\u6001\u548C\u573A\u666F\u65B9\u6848", -1);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_78, [
        _hoisted_79,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var ES_____ElasticStack________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ES\u8BE6\u89E3-\u8BA4\u77E5-ElasticStack\u751F\u6001\u548C\u573A\u666F\u65B9\u6848.html.vue"]]);
export { ES_____ElasticStack________html as default };
