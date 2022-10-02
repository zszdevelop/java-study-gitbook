import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as h,a as s,b as n,e as r,d as t,r as o}from"./app.296fdb6c.js";const l={},d=r(`<h1 id="redis\u96C6\u7FA4-hash\u5BFB\u5740\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#redis\u96C6\u7FA4-hash\u5BFB\u5740\u7B97\u6CD5" aria-hidden="true">#</a> Redis\u96C6\u7FA4\uFF1Ahash\u5BFB\u5740\u7B97\u6CD5</h1><h2 id="_1-\u666E\u901Ahash" tabindex="-1"><a class="header-anchor" href="#_1-\u666E\u901Ahash" aria-hidden="true">#</a> 1. \u666E\u901Ahash</h2><p>\u666E\u901Ahash\u4E5F\u5C31\u662F\u6700\u7B80\u5355\u7684hash\u7B97\u6CD5\uFF0C\u5373</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>index = hash(key) % N
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>index\u8868\u793A\u673A\u5668\u7684\u7D22\u5F15\uFF0CN\u8868\u793A\u673A\u5668\u7684\u6570\u91CF\uFF0C\u5047\u8BBE\u6709\u4E09\u53F0\u673A\u5668\uFF0C\u5373N=3\uFF0C\u90A3\u4E48\u666E\u901Ahash\u7ED3\u679C\u5982\u4E0B\u56FE\uFF0C\u5F88\u7B80\u5355\u662F\u5427</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701202555551.png" alt="image-20220701202555551"><p>\u90A3\u5982\u679C\u73B0\u5728\u589E\u52A0\u4E86\u4E00\u53F0\u673A\u5668\u5462\uFF1F</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701202611289.png" alt="image-20220701202611289" loading="lazy"></p><p>\u60C5\u51B5\u4F3C\u4E4E\u53D8\u5F97\u590D\u6742\u8D77\u6765\uFF0C\u56E0\u4E3A\u65B0\u589E\u52A0\u4E86\u4E00\u4E2A\u8282\u70B94\uFF0C\u5373N=4\uFF0C\u90A3\u4E48\u6240\u6709key\u53D6\u6A21\u7684\u7ED3\u679C\u90FD\u53D8\u4E86\uFF0C\u5BFC\u81F4\u6240\u6709\u7684\u6570\u636E\u90FD\u8981\u91CD\u65B0\u8FC1\u79FB\u4E00\u904D\uFF0C\u5982\u679C\u8282\u70B94\u4E0B\u7EBF\u4E86\u5462\uFF1F\u90A3\u4E48\u6BEB\u65E0\u7591\u95EE\u6240\u6709\u6570\u636E\u90FD\u8981\u8FD8\u539F\u56DE\u53BB\uFF0C\u5C31redis\u800C\u8A00\uFF0C\u8FD9\u5C31\u53EB\u5927\u91CF\u7F13\u5B58\u7684\u91CD\u5EFA\uFF0C\u90A3\u4E48\u6709\u6CA1\u6709\u65B0\u589E/\u5220\u9664\u8282\u70B9\u5F71\u54CD\u4E0D\u90A3\u4E48\u5927\u7684hash\u7B97\u6CD5\u5462\uFF1F\u7B54\u6848\u80AF\u5B9A\u662F\u6709\uFF0C\u4E0B\u9762\u8F6E\u5230\u4E00\u81F4\u6027hash\u51FA\u573A\u3002</p><h2 id="_2-\u4E00\u81F4\u6027hash" tabindex="-1"><a class="header-anchor" href="#_2-\u4E00\u81F4\u6027hash" aria-hidden="true">#</a> 2. \u4E00\u81F4\u6027hash</h2><blockquote><p>\u4E00\u81F4\u54C8\u5E0C\u7531MIT\u7684Karger\u53CA\u5176\u5408\u4F5C\u8005\u63D0\u51FA\uFF0C\u73B0\u5728\u8FD9\u4E00\u601D\u60F3\u5DF2\u7ECF\u6269\u5C55\u5230\u5176\u5B83\u9886\u57DF\u3002\u5728\u8FD9\u7BC71997\u5E74\u53D1\u8868\u7684\u5B66\u672F\u8BBA\u6587\u4E2D\u4ECB\u7ECD\u4E86\u201C\u4E00\u81F4\u54C8\u5E0C\u201D\u5982\u4F55\u5E94\u7528\u4E8E\u7528\u6237\u6613\u53D8\u7684\u5206\u5E03\u5F0FWeb\u670D\u52A1\u4E2D\u3002\u54C8\u5E0C\u8868\u4E2D\u7684\u6BCF\u4E00\u4E2A\u4EE3\u8868\u5206\u5E03\u5F0F\u7CFB\u7EDF\u4E2D\u4E00\u4E2A\u8282\u70B9\uFF0C\u5728\u7CFB\u7EDF\u6DFB\u52A0\u6216\u5220\u9664\u8282\u70B9\u53EA\u9700\u8981\u79FB\u52A8K/n \uFF08\u65B9\u6CD5K\u662F\u603Bkey\u7684\u4E2A\u6570\uFF0Cn\u662F\u8282\u70B9\u4E2A\u6570\uFF09</p></blockquote><p>\u4E00\u81F4\u6027hash\u7684\u7279\u6027</p><ul><li><strong>\u5E73\u8861\u6027</strong>\uFF1A\u5C3D\u53EF\u80FD\u8BA9\u6570\u636E\u5C3D\u53EF\u80FD\u5206\u6563\u5230\u6240\u6709\u8282\u70B9\u4E0A\uFF0C\u907F\u514D\u9020\u6210\u6781\u5176\u4E0D\u5747\u5300</li><li><strong>\u5355\u8C03\u6027</strong>\uFF1A\u8981\u6C42\u5728\u65B0\u589E\u6216\u8005\u51CF\u5C11\u8282\u70B9\u7684\u65F6\u5019\uFF0C\u539F\u6709\u7684\u7ED3\u679C\u7EDD\u5927\u90E8\u5206\u4E0D\u53D7\u5F71\u54CD\uFF0C\u800C\u65B0\u589E\u7684\u6570\u636E\u5C3D\u53EF\u80FD\u5206\u914D\u5230\u65B0\u52A0\u7684\u8282\u70B9</li><li><strong>\u5206\u6563\u6027</strong>\uFF1A\u597D\u7684\u7B97\u6CD5\u5728\u4E0D\u540C\u7EC8\u7AEF\uFF0C\u9488\u5BF9\u76F8\u540C\u7684\u6570\u636E\u7684\u8BA1\u7B97\uFF0C\u5F97\u5230\u7684\u7ED3\u679C\u5E94\u8BE5\u662F\u4E00\u6837\u7684\uFF0C\u4E00\u81F4\u6027\u8981\u5F88\u5F3A</li><li><strong>\u8D1F\u8F7D</strong>\uFF1A\u9488\u5BF9\u76F8\u540C\u7684\u8282\u70B9\uFF0C\u907F\u514D\u88AB\u4E0D\u540C\u7EC8\u7AEF\u6620\u5C04\u4E0D\u540C\u7684\u5185\u5BB9</li><li><strong>\u5E73\u6ED1\u6027</strong>\uFF1A\u5BF9\u4E8E\u589E\u52A0\u8282\u70B9\u6216\u8005\u51CF\u5C11\u8282\u70B9\uFF0C\u5E94\u8BE5\u80FD\u591F\u5E73\u6ED1\u8FC7\u6E21</li></ul><h3 id="_2-1-hash\u73AF" tabindex="-1"><a class="header-anchor" href="#_2-1-hash\u73AF" aria-hidden="true">#</a> 2.1 hash\u73AF</h3><p>\u666E\u901Ahash\u7B97\u6CD5\u5BFC\u81F4\u5927\u91CF\u6570\u636E\u8FC1\u79FB\u7684\u6839\u672C\u539F\u56E0\u662FN\u7684\u4E0D\u786E\u5B9A\u6027\uFF0C\u6709\u6CA1\u6709\u5728N\u53D8\u5316\u7684\u65F6\u5019\u5F71\u54CD\u8303\u56F4\u66F4\u5C0F\u7684\u7B97\u6CD5\u5462\uFF1F\u6709\u4EBA\u63D0\u51FA\u4E86<strong>\u73AF</strong>\u7684\u6982\u5FF5</p><blockquote><p>\u4E00\u81F4\u6027\u54C8\u5E0C\u7B97\u6CD5\u57281997\u5E74\u7531\u9EBB\u7701\u7406\u5DE5\u5B66\u9662\u7684Karger\u7B49\u4EBA\u5728\u89E3\u51B3\u5206\u5E03\u5F0FCache\u4E2D\u63D0\u51FA\u7684\uFF0C\u8BBE\u8BA1\u76EE\u6807\u662F\u4E3A\u4E86\u89E3\u51B3\u56E0\u7279\u7F51\u4E2D\u7684\u70ED\u70B9(Hot spot)\u95EE\u9898\uFF0C\u521D\u8877\u548CCARP\u5341\u5206\u7C7B\u4F3C\u3002\u4E00\u81F4\u6027\u54C8\u5E0C\u4FEE\u6B63\u4E86CARP\u4F7F\u7528\u7684\u7B80\u5355\u54C8\u5E0C\u7B97\u6CD5\u5E26\u6765\u7684\u95EE\u9898\uFF0C\u4F7F\u5F97DHT\u53EF\u4EE5\u5728P2P\u73AF\u5883\u4E2D\u771F\u6B63\u5F97\u5230\u5E94\u7528</p></blockquote><p>hash\u73AF\u901A\u8FC7\u6784\u5EFA\u73AF\u72B6\u7684hash\u7A7A\u95F4\u4EE3\u66FF\u7EBF\u6027hash\u7A7A\u95F4\u7684\u65B9\u6CD5\u89E3\u51B3\u4E86\u4E0A\u9762\u7684\u95EE\u9898\uFF0C\u5047\u8BBE\u5C060~2^32-1\u7684hash\u7A7A\u95F4\u5206\u5E03\u5230\u4E00\u4E2A\u73AF\u4E0A</p><ul><li>\u8282\u70B9\u52A0\u5165\u73AF\uFF1A\u5C06\u8282\u70B9\u901A\u8FC7hash(\u8282\u70B9\u7684\u4FE1\u606F\u5982ip\u7AEF\u53E3\u7B49) % 2^32-1\u53D6\u8282\u70B9\u5728\u73AF\u4E0A\u4F4D\u7F6E</li><li>\u6570\u636E\u8BFB\u5199\uFF1A\u8BFB\u5199\u6570\u636E\u65F6\u540C\u6837\u53D6key\u7684hash\uFF0C\u5373hash(key) % 2^32-1\u843D\u5230\u73AF\u4E0A\u7684\u67D0\u4E00\u4F4D\u7F6E\uFF0C\u518D<strong>\u987A\u65F6\u9488</strong>\u627E\u5230\u79BB\u73AF\u6700\u8FD1\u7684\u90A3\u4E2A\u8282\u70B9\u8FDB\u884C\u8BFB\u5199</li></ul><p>\u6574\u4E2A\u8FC7\u7A0B\u5982\u4E0B\u56FE</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701202831442.png" alt="image-20220701202831442"><p>\u5047\u8BBE\u73B0\u5728\u65B0\u589E\u4E00\u4E2A\u8282\u70B94\uFF0C\u53EA\u4F1A\u5F71\u54CD\u5230\u8282\u70B92\u5230\u8282\u70B94\u4E4B\u95F4\u7684\u6570\u636E\uFF0C\u5176\u4ED6\u7684\u6570\u636E\u4E0D\u4F1A\u88AB\u5F71\u54CD\u5230\uFF0C\u8FD9\u4E5F\u662F<strong>\u4E00\u81F4\u6027</strong>\u7684\u4F53\u73B0</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701202903831.png" alt="image-20220701202903831"><p>\u5220\u9664\u4E00\u4E2A\u8282\u70B9\u4E5F\u662F\u540C\u6837\u7684\u9053\u7406\uFF0C\u5047\u8BBE\u5220\u9664\u8282\u70B94\uFF0C\u4E5F\u53EA\u662F\u4F1A\u5F71\u54CD\u5230\u8282\u70B92\u5230\u539F\u8282\u70B94\u4E4B\u95F4\u7684\u6570\u636E\uFF0C\u603B\u4E4B\u4E0D\u7BA1\u65B0\u589E\u8FD8\u662F\u5220\u9664\u7EBF\u8DEF\u90FD\u53EA\u4F1A\u5F71\u54CD\u5230\u53D8\u52A8\u8282\u70B9\u5230\u53D8\u52A8\u8282\u70B9\u9006\u65F6\u9488\u627E\u5230\u7684\u6700\u8FD1\u4E00\u4E2A\u8282\u70B9\u7684\u6570\u636E\u3002</p><p>\u5F53\u7136hash\u73AF\u4E5F\u4E0D\u662F\u6CA1\u6709\u95EE\u9898\u7684\uFF0C\u5047\u8BBE\u8282\u70B9\u5206\u5E03\u4E0D\u5747\u5300\uFF08hash\u7B97\u6CD5\u5E76\u4E0D\u80FD\u4FDD\u8BC1\u7EDD\u5BF9\u7684\u5E73\u8861\u6027\uFF09\uFF0C\u90A3\u4E48\u5927\u90E8\u5206\u6570\u636E\u90FD\u4F1A\u843D\u5728\u4E00\u4E2A\u8282\u70B9\u4E0A\uFF0C\u5BFC\u81F4\u8BF7\u6C42\u548C\u6570\u636E\u503E\u659C\uFF0C\u8FD9\u6837\u5C31\u4E0D\u80FD\u5F88\u597D\u7684\u4FDD\u8BC1\u8D1F\u8F7D\u5747\u8861\u3002</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701202933471.png" alt="image-20220701202933471"><p>\u90A3\u4E48\u89E3\u51B3\u529E\u6CD5\u5C31\u662F\u589E\u52A0\u865A\u62DF\u8282\u70B9\uFF08\u6CE8\u610F\uFF0C\u6B64\u65F6\u73AF\u4E0A<strong>\u5168\u90E8\u90FD\u662F\u865A\u62DF\u8282\u70B9</strong>\uFF09\uFF0C\u5BF9\u6BCF\u4E00\u4E2A\u8282\u70B9\u8BA1\u7B97\u591A\u4E2Ahash\uFF0C\u5C3D\u91CF\u4FDD\u8BC1\u73AF\u4E0A\u7684\u8282\u70B9\u662F\u5747\u5300\u7684\uFF0C\u5982\u4E0B\u56FE</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701203001093.png" alt="image-20220701203001093"><h2 id="_3-hash\u69FD" tabindex="-1"><a class="header-anchor" href="#_3-hash\u69FD" aria-hidden="true">#</a> 3. hash\u69FD</h2><p>redis\u9ED8\u8BA4\u5206\u914D16384\u4E2Ahash\u69FD\u4F4D\uFF0C\u7136\u540E\u5C06\u69FD\u4F4D\u5747\u5300\u5206\u914D\u5230\u4E0D\u540C\u7684redis\u5B9E\u4F8B\u4E2D\u53BB\uFF0C\u627E\u6570\u636E\u7684\u65F6\u5019\u901A\u8FC7CRC16\u7B97\u6CD5\u8BA1\u7B97\u540E\u518D\u53D6\u6A21\u627E\u5230\u5BF9\u5E94\u7684\u69FD\u4F4D\uFF08CRC16\u6211\u4EEC\u5E94\u8BE5\u4E0D\u964C\u751F\uFF0C\u8FD9\u4E2Awinrar\u91CC\u9762\u4F7F\u7528\u7684CRC32\u662F\u4E00\u6837\u7684\uFF0C\u53EA\u662F\u6821\u9A8C\u957F\u5EA6\u4E0D\u4E00\u6837\u800C\u5DF2\uFF09\uFF0C\u7B97\u6CD5\u5982\u4E0B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>CRC16(key) % 16384
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u518D\u770B\u69FD\u4F4D\u5728\u54EA\u53F0\u5B9E\u4F8B\u4E0A\uFF0C\u6700\u540E\u53BB\u5B9E\u4F8B\u4E0A\u53D6\u6570\u636E\uFF0C\u5982\u4E0B\u56FE\u6240\u793A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701203055236.png" alt="image-20220701203055236" loading="lazy"></p><p>\u5982\u679C\u8BE5\u69FD\u4F4D\u4E0D\u5728\u8BF7\u6C42\u7684\u5B9E\u4F8B\u4E0A\u5462\uFF1F\u6B64\u65F6\u8BE5\u5B9E\u4F8B\u4F1A\u8FD4\u56DE\u91CD\u5B9A\u5411\u6307\u4EE4\uFF1AMOVED \u69FD\u4F4D \u76EE\u6807\u5B9E\u4F8B\uFF0C\u80FD\u8FD9\u4E48\u505A\u7684\u57FA\u7840\u662F\u6BCF\u4E00\u53F0redis\u5B9E\u4F8B\u4E0A\u90FD\u6709\u5168\u91CF\u7684hash\u69FD\u7684\u6620\u5C04\u8868\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\u4E3A\u91CD\u5B9A\u5411\u7684\u4F8B\u5B50</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220701203120231.png" alt="image-20220701203120231" loading="lazy"></p><p>\u4F7F\u7528\u69FD\u4F4D\u5C06\u5177\u4F53\u7684\u6570\u636E\u4E0Eredis\u5B9E\u4F8B\u89E3\u8026\uFF0C\u5F53\u65B0\u589E\u6216\u8005\u51CF\u5C11redis\u5B9E\u4F8B\u7684\u65F6\u5019\u7528redis cluster\u603B\u7EBF\u901A\u8FC7Ping/Pong\u62A5\u6587\u8FDB\u884C\u5E7F\u64AD\uFF0C\u544A\u77E5\u6574\u4E2Aredis\u96C6\u7FA4\u65B0\u8282\u70B9\u4E0A\u7EBF/\u4E0B\u7EBF\uFF0C\u5E76\u8FC1\u79FB\u69FD\u4F4D\u548C\u66F4\u65B0\u96C6\u7FA4\u4E2D\u7684\u69FD\u4F4D\u6620\u5C04\u8868\uFF0C\u6574\u4E2A\u8FC7\u7A0B\u5C3D\u91CF\u4FDD\u8BC1hash\u69FD\u7684\u5E73\u5747\u5206\u5E03</p><h3 id="_3-1-\u90A3\u4E48\u662F\u57FA\u4E8E\u4EC0\u4E48\u6837\u7684\u8003\u8651-redis\u7684\u4F5C\u8005\u6CA1\u6709\u7528hash\u73AF\u5462" tabindex="-1"><a class="header-anchor" href="#_3-1-\u90A3\u4E48\u662F\u57FA\u4E8E\u4EC0\u4E48\u6837\u7684\u8003\u8651-redis\u7684\u4F5C\u8005\u6CA1\u6709\u7528hash\u73AF\u5462" aria-hidden="true">#</a> 3.1 \u90A3\u4E48\u662F\u57FA\u4E8E\u4EC0\u4E48\u6837\u7684\u8003\u8651\uFF0Credis\u7684\u4F5C\u8005\u6CA1\u6709\u7528hash\u73AF\u5462\uFF1F</h3><ul><li><p>redis\u7684\u4F5C\u8005\u8BA4\u4E3A\u4ED6\u7684CRC16(key) mod 16384\u7684\u6548\u679C\u5DF2\u7ECF\u4E0D\u9519\u4E86\uFF0C\u867D\u7136\u6CA1\u6709\u4E00\u81F4\u6027hash\u7075\u6D3B\uFF0C\u4F46\u5B9E\u73B0\u5F88\u7B80\u5355\uFF0C\u8282\u70B9\u589E\u5220\u65F6\u5904\u7406\u8D77\u6765\u4E5F\u5F88\u65B9\u4FBF</p></li><li><p>\u5F53\u7136\u8FD8\u6709\u4E2A\u539F\u56E0\u662Fhash\u69FD\u7684\u5206\u5E03\u66F4\u52A0\u5747\u5300\uFF0C\u5982\u679C\u6709N\u4E2A\u8282\u70B9\uFF0C\u90A3\u4E48\u6BCF\u4E2A\u8282\u70B9\u90FD\u8D1F\u8F7D1/N\uFF0C</p></li></ul><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,38),g={href:"https://www.modb.pro/db/64646",target:"_blank",rel:"noopener noreferrer"},c=t("Redis Cluster\u96C6\u7FA4\u539F\u7406+\u5B9E\u6218");function p(m,b){const e=o("ExternalLinkIcon");return i(),h("div",null,[d,s("p",null,[s("a",g,[c,n(e)])])])}const _=a(l,[["render",p],["__file","db-redis-hash.html.vue"]]);export{_ as default};
