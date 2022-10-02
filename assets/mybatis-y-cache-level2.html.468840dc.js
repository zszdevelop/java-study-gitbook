import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as n,a,b as p,e as c,r as i}from"./app.296fdb6c.js";const l={},o=c(`<h1 id="mybatis\u8BE6\u89E3-\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#mybatis\u8BE6\u89E3-\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u673A\u5236" aria-hidden="true">#</a> MyBatis\u8BE6\u89E3 - \u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u673A\u5236</h1><blockquote><p>MyBatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u662FApplication\u7EA7\u522B\u7684\u7F13\u5B58\uFF0C\u5B83\u53EF\u4EE5\u63D0\u9AD8\u5BF9\u6570\u636E\u5E93\u67E5\u8BE2\u7684\u6548\u7387\uFF0C\u4EE5\u63D0\u9AD8\u5E94\u7528\u7684\u6027\u80FD\u3002</p></blockquote><h2 id="_1-mybatis\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-mybatis\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0" aria-hidden="true">#</a> 1. MyBatis\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0</h2><p>MyBatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u662FApplication\u7EA7\u522B\u7684\u7F13\u5B58\uFF0C\u5B83\u53EF\u4EE5\u63D0\u9AD8\u5BF9\u6570\u636E\u5E93\u67E5\u8BE2\u7684\u6548\u7387\uFF0C\u4EE5\u63D0\u9AD8\u5E94\u7528\u7684\u6027\u80FD\u3002</p><h3 id="_1-1-mybatis\u7684\u7F13\u5B58\u673A\u5236\u6574\u4F53\u8BBE\u8BA1\u4EE5\u53CA\u4E8C\u7EA7\u7F13\u5B58\u7684\u5DE5\u4F5C\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-1-mybatis\u7684\u7F13\u5B58\u673A\u5236\u6574\u4F53\u8BBE\u8BA1\u4EE5\u53CA\u4E8C\u7EA7\u7F13\u5B58\u7684\u5DE5\u4F5C\u6A21\u5F0F" aria-hidden="true">#</a> 1.1 MyBatis\u7684\u7F13\u5B58\u673A\u5236\u6574\u4F53\u8BBE\u8BA1\u4EE5\u53CA\u4E8C\u7EA7\u7F13\u5B58\u7684\u5DE5\u4F5C\u6A21\u5F0F</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730223727802.png" alt="image-20220730223727802" loading="lazy"></p><p>\u5982\u56FE\u6240\u793A\uFF0C\u5F53\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u65F6\uFF0C\u4E00\u4E2ASqlSession\u5BF9\u8C61\u4F1A\u4F7F\u7528\u4E00\u4E2AExecutor\u5BF9\u8C61\u6765\u5B8C\u6210\u4F1A\u8BDD\u64CD\u4F5C\uFF0CMyBatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u673A\u5236\u7684\u5173\u952E\u5C31\u662F\u5BF9\u8FD9\u4E2AExecutor\u5BF9\u8C61\u505A\u6587\u7AE0\u3002\u5982\u679C\u7528\u6237\u914D\u7F6E\u4E86&quot;cacheEnabled=true&quot;\uFF0C\u90A3\u4E48MyBatis\u5728\u4E3ASqlSession\u5BF9\u8C61\u521B\u5EFAExecutor\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u5BF9Executor\u5BF9\u8C61\u52A0\u4E0A\u4E00\u4E2A\u88C5\u9970\u8005\uFF1ACachingExecutor\uFF0C\u8FD9\u65F6SqlSession\u4F7F\u7528CachingExecutor\u5BF9\u8C61\u6765\u5B8C\u6210\u64CD\u4F5C\u8BF7\u6C42\u3002CachingExecutor\u5BF9\u4E8E\u67E5\u8BE2\u8BF7\u6C42\uFF0C\u4F1A\u5148\u5224\u65AD\u8BE5\u67E5\u8BE2\u8BF7\u6C42\u5728Application\u7EA7\u522B\u7684\u4E8C\u7EA7\u7F13\u5B58\u4E2D\u662F\u5426\u6709\u7F13\u5B58\u7ED3\u679C\uFF0C\u5982\u679C\u6709\u67E5\u8BE2\u7ED3\u679C\uFF0C\u5219\u76F4\u63A5\u8FD4\u56DE\u7F13\u5B58\u7ED3\u679C\uFF1B\u5982\u679C\u7F13\u5B58\u4E2D\u6CA1\u6709\uFF0C\u518D\u4EA4\u7ED9\u771F\u6B63\u7684Executor\u5BF9\u8C61\u6765\u5B8C\u6210\u67E5\u8BE2\u64CD\u4F5C\uFF0C\u4E4B\u540ECachingExecutor\u4F1A\u5C06\u771F\u6B63Executor\u8FD4\u56DE\u7684\u67E5\u8BE2\u7ED3\u679C\u653E\u7F6E\u5230\u7F13\u5B58\u4E2D\uFF0C\u7136\u540E\u5728\u8FD4\u56DE\u7ED9\u7528\u6237\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730223946842.png" alt="image-20220730223946842" loading="lazy"></p><p>CachingExecutor\u662FExecutor\u7684\u88C5\u9970\u8005\uFF0C\u4EE5\u589E\u5F3AExecutor\u7684\u529F\u80FD\uFF0C\u4F7F\u5176\u5177\u6709\u7F13\u5B58\u67E5\u8BE2\u7684\u529F\u80FD\uFF0C\u8FD9\u91CC\u7528\u5230\u4E86\u8BBE\u8BA1\u6A21\u5F0F\u4E2D\u7684\u88C5\u9970\u8005\u6A21\u5F0F\uFF0CCachingExecutor\u548CExecutor\u7684\u63A5\u53E3\u7684\u5173\u7CFB\u5982\u4E0B\u7C7B\u56FE\u6240\u793A\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730224029324.png" alt="image-20220730224029324" loading="lazy"></p><h3 id="_1-2-mybatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u5212\u5206" tabindex="-1"><a class="header-anchor" href="#_1-2-mybatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u5212\u5206" aria-hidden="true">#</a> 1.2 MyBatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u5212\u5206</h3><p>MyBatis\u5E76\u4E0D\u662F\u7B80\u5355\u5730\u5BF9\u6574\u4E2AApplication\u5C31\u53EA\u6709\u4E00\u4E2ACache\u7F13\u5B58\u5BF9\u8C61\uFF0C\u5B83\u5C06\u7F13\u5B58\u5212\u5206\u7684\u66F4\u7EC6\uFF0C\u5373\u662FMapper\u7EA7\u522B\u7684\uFF0C\u5373\u6BCF\u4E00\u4E2AMapper\u90FD\u53EF\u4EE5\u62E5\u6709\u4E00\u4E2ACache\u5BF9\u8C61\uFF0C\u5177\u4F53\u5982\u4E0B\uFF1A</p><ul><li><strong>\u4E3A\u6BCF\u4E00\u4E2AMapper\u5206\u914D\u4E00\u4E2ACache\u7F13\u5B58\u5BF9\u8C61</strong>\uFF08\u4F7F\u7528<code>&lt;cache&gt;</code>\u8282\u70B9\u914D\u7F6E\uFF09</li></ul><p>MyBatis\u5C06Application\u7EA7\u522B\u7684\u4E8C\u7EA7\u7F13\u5B58\u7EC6\u5206\u5230Mapper\u7EA7\u522B\uFF0C\u5373\u5BF9\u4E8E\u6BCF\u4E00\u4E2AMapper.xml,\u5982\u679C\u5728\u5176\u4E2D\u4F7F\u7528\u4E86<code>&lt;cache&gt;</code> \u8282\u70B9\uFF0C\u5219MyBatis\u4F1A\u4E3A\u8FD9\u4E2AMapper\u521B\u5EFA\u4E00\u4E2ACache\u7F13\u5B58\u5BF9\u8C61\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730224120468.png" alt="image-20220730224120468" loading="lazy"></p><p>\u6CE8\uFF1A\u4E0A\u8FF0\u7684\u6BCF\u4E00\u4E2ACache\u5BF9\u8C61\uFF0C\u90FD\u4F1A\u6709\u4E00\u4E2A\u81EA\u5DF1\u6240\u5C5E\u7684namespace\u547D\u540D\u7A7A\u95F4\uFF0C\u5E76\u4E14\u4F1A\u5C06Mapper\u7684 namespace\u4F5C\u4E3A\u5B83\u4EEC\u7684ID\uFF1B</p><ul><li><strong>\u591A\u4E2AMapper\u5171\u7528\u4E00\u4E2ACache\u7F13\u5B58\u5BF9\u8C61</strong>\uFF08\u4F7F\u7528<code>&lt;cache-ref&gt;</code>\u8282\u70B9\u914D\u7F6E\uFF09</li></ul><p>\u5982\u679C\u4F60\u60F3\u8BA9\u591A\u4E2AMapper\u516C\u7528\u4E00\u4E2ACache\u7684\u8BDD\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528<code>&lt;cache-ref namespace=&quot;&quot;&gt;</code>\u8282\u70B9\uFF0C\u6765\u6307\u5B9A\u4F60\u7684\u8FD9\u4E2AMapper\u4F7F\u7528\u5230\u4E86\u54EA\u4E00\u4E2AMapper\u7684Cache\u7F13\u5B58\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730224223709.png" alt="image-20220730224223709" loading="lazy"></p><h3 id="_1-3-\u4F7F\u7528\u4E8C\u7EA7\u7F13\u5B58-\u5FC5\u987B\u8981\u5177\u5907\u7684\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-3-\u4F7F\u7528\u4E8C\u7EA7\u7F13\u5B58-\u5FC5\u987B\u8981\u5177\u5907\u7684\u6761\u4EF6" aria-hidden="true">#</a> 1.3 \u4F7F\u7528\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u5FC5\u987B\u8981\u5177\u5907\u7684\u6761\u4EF6</h3><p>MyBatis\u5BF9\u4E8C\u7EA7\u7F13\u5B58\u7684\u652F\u6301\u7C92\u5EA6\u5F88\u7EC6\uFF0C\u5B83\u4F1A\u6307\u5B9A\u67D0\u4E00\u6761\u67E5\u8BE2\u8BED\u53E5\u662F\u5426\u4F7F\u7528\u4E8C\u7EA7\u7F13\u5B58\u3002</p><p>\u867D\u7136\u5728Mapper\u4E2D\u914D\u7F6E\u4E86<code>&lt;cache&gt;</code>,\u5E76\u4E14\u4E3A\u6B64Mapper\u5206\u914D\u4E86Cache\u5BF9\u8C61\uFF0C\u8FD9\u5E76\u4E0D\u8868\u793A\u6211\u4EEC\u4F7F\u7528Mapper\u4E2D\u5B9A\u4E49\u7684\u67E5\u8BE2\u8BED\u53E5\u67E5\u5230\u7684\u7ED3\u679C\u90FD\u4F1A\u653E\u7F6E\u5230Cache\u5BF9\u8C61\u4E4B\u4E2D\uFF0C\u6211\u4EEC\u5FC5\u987B\u6307\u5B9AMapper\u4E2D\u7684\u67D0\u6761\u9009\u62E9\u8BED\u53E5\u662F\u5426\u652F\u6301\u7F13\u5B58\uFF0C\u5373\u5982\u4E0B\u6240\u793A\uFF0C\u5728<code>&lt;select&gt;</code> \u8282\u70B9\u4E2D\u914D\u7F6EuseCache=&quot;true&quot;\uFF0CMapper\u624D\u4F1A\u5BF9\u6B64Select\u7684\u67E5\u8BE2\u652F\u6301\u7F13\u5B58\u7279\u6027\uFF0C\u5426\u5219\uFF0C\u4E0D\u4F1A\u5BF9\u6B64Select\u67E5\u8BE2\uFF0C\u4E0D\u4F1A\u7ECF\u8FC7Cache\u7F13\u5B58\u3002\u5982\u4E0B\u6240\u793A\uFF0CSelect\u8BED\u53E5\u914D\u7F6E\u4E86useCache=&quot;true&quot;\uFF0C\u5219\u8868\u660E\u8FD9\u6761Select\u8BED\u53E5\u7684\u67E5\u8BE2\u4F1A\u4F7F\u7528\u4E8C\u7EA7\u7F13\u5B58\u3002</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>selectByMinSalary<span class="token punctuation">&quot;</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>BaseResultMap<span class="token punctuation">&quot;</span></span> <span class="token attr-name">parameterType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>java.util.Map<span class="token punctuation">&quot;</span></span> <span class="token attr-name">useCache</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u603B\u4E4B\uFF0C\u8981\u60F3\u4F7F\u67D0\u6761Select\u67E5\u8BE2\u652F\u6301\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u4F60\u9700\u8981\u4FDD\u8BC1\uFF1A</p><ul><li>MyBatis\u652F\u6301\u4E8C\u7EA7\u7F13\u5B58\u7684\u603B\u5F00\u5173\uFF1A\u5168\u5C40\u914D\u7F6E\u53D8\u91CF\u53C2\u6570 cacheEnabled=true</li><li>\u8BE5select\u8BED\u53E5\u6240\u5728\u7684Mapper\uFF0C\u914D\u7F6E\u4E86<code>&lt;cache&gt;</code> \u6216<code>&lt;cached-ref&gt;</code>\u8282\u70B9\uFF0C\u5E76\u4E14\u6709\u6548</li><li>\u8BE5select\u8BED\u53E5\u7684\u53C2\u6570 useCache=true</li></ul><h3 id="_1-4-\u4E00\u7EA7\u7F13\u5B58\u548C\u4E8C\u7EA7\u7F13\u5B58\u7684\u4F7F\u7528\u987A\u5E8F" tabindex="-1"><a class="header-anchor" href="#_1-4-\u4E00\u7EA7\u7F13\u5B58\u548C\u4E8C\u7EA7\u7F13\u5B58\u7684\u4F7F\u7528\u987A\u5E8F" aria-hidden="true">#</a> 1.4 \u4E00\u7EA7\u7F13\u5B58\u548C\u4E8C\u7EA7\u7F13\u5B58\u7684\u4F7F\u7528\u987A\u5E8F</h3><p>\u8BF7\u6CE8\u610F\uFF0C\u5982\u679C\u4F60\u7684MyBatis\u4F7F\u7528\u4E86\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u5E76\u4E14\u4F60\u7684Mapper\u548Cselect\u8BED\u53E5\u4E5F\u914D\u7F6E\u4F7F\u7528\u4E86\u4E8C\u7EA7\u7F13\u5B58\uFF0C\u90A3\u4E48\u5728\u6267\u884Cselect\u67E5\u8BE2\u7684\u65F6\u5019\uFF0CMyBatis\u4F1A\u5148\u4ECE\u4E8C\u7EA7\u7F13\u5B58\u4E2D\u53D6\u8F93\u5165\uFF0C\u5176\u6B21\u624D\u662F\u4E00\u7EA7\u7F13\u5B58\uFF0C\u5373<strong>MyBatis\u67E5\u8BE2\u6570\u636E\u7684\u987A\u5E8F\u662F\uFF1A\u4E8C\u7EA7\u7F13\u5B58 \u2014\u2014\u2014&gt; \u4E00\u7EA7\u7F13\u5B58 \u2014\u2014&gt; \u6570\u636E\u5E93</strong>\u3002</p><h3 id="_1-5-\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u7684\u9009\u62E9" tabindex="-1"><a class="header-anchor" href="#_1-5-\u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u7684\u9009\u62E9" aria-hidden="true">#</a> 1.5 \u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u7684\u9009\u62E9</h3><p>MyBatis\u5BF9\u4E8C\u7EA7\u7F13\u5B58\u7684\u8BBE\u8BA1\u975E\u5E38\u7075\u6D3B\uFF0C\u5B83\u81EA\u5DF1\u5185\u90E8\u5B9E\u73B0\u4E86\u4E00\u7CFB\u5217\u7684Cache\u7F13\u5B58\u5B9E\u73B0\u7C7B\uFF0C\u5E76\u63D0\u4F9B\u4E86\u5404\u79CD\u7F13\u5B58\u5237\u65B0\u7B56\u7565\u5982LRU\uFF0CFIFO\u7B49\u7B49\uFF1B\u53E6\u5916\uFF0CMyBatis\u8FD8\u5141\u8BB8\u7528\u6237\u81EA\u5B9A\u4E49Cache\u63A5\u53E3\u5B9E\u73B0\uFF0C\u7528\u6237\u662F\u9700\u8981\u5B9E\u73B0org.apache.ibatis.cache.Cache\u63A5\u53E3\uFF0C\u7136\u540E\u5C06Cache\u5B9E\u73B0\u7C7B\u914D\u7F6E\u5728<code>&lt;cache type=&quot;&quot;&gt;</code>\u8282\u70B9\u7684type\u5C5E\u6027\u4E0A\u5373\u53EF\uFF1B\u9664\u6B64\u4E4B\u5916\uFF0CMyBatis\u8FD8\u652F\u6301\u8DDF\u7B2C\u4E09\u65B9\u5185\u5B58\u7F13\u5B58\u5E93\u5982Memecached\u7684\u96C6\u6210\uFF0C\u603B\u4E4B\uFF0C\u4F7F\u7528MyBatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u6709\u4E09\u4E2A\u9009\u62E9:</p><ul><li>MyBatis\u81EA\u8EAB\u63D0\u4F9B\u7684\u7F13\u5B58\u5B9E\u73B0\uFF1B</li><li>\u7528\u6237\u81EA\u5B9A\u4E49\u7684Cache\u63A5\u53E3\u5B9E\u73B0\uFF1B</li><li>\u8DDF\u7B2C\u4E09\u65B9\u5185\u5B58\u7F13\u5B58\u5E93\u7684\u96C6\u6210\uFF1B</li></ul><h3 id="_1-6-mybatis\u81EA\u8EAB\u63D0\u4F9B\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-6-mybatis\u81EA\u8EAB\u63D0\u4F9B\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u73B0" aria-hidden="true">#</a> 1.6 MyBatis\u81EA\u8EAB\u63D0\u4F9B\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u73B0</h3><blockquote><p>MyBatis\u81EA\u8EAB\u63D0\u4F9B\u4E86\u4E30\u5BCC\u7684\uFF0C\u5E76\u4E14\u529F\u80FD\u5F3A\u5927\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u73B0\uFF0C\u5B83\u62E5\u6709\u4E00\u7CFB\u5217\u7684Cache\u63A5\u53E3\u88C5\u9970\u8005\uFF0C\u53EF\u4EE5\u6EE1\u8DB3\u5404\u79CD\u5BF9\u7F13\u5B58\u64CD\u4F5C\u548C\u66F4\u65B0\u7684\u7B56\u7565\u3002</p></blockquote><p>MyBatis\u5B9A\u4E49\u4E86\u5927\u91CF\u7684Cache\u7684\u88C5\u9970\u5668\u6765\u589E\u5F3ACache\u7F13\u5B58\u7684\u529F\u80FD\uFF0C\u5982\u4E0B\u7C7B\u56FE\u6240\u793A\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730224548219.png" alt="image-20220730224548219" loading="lazy"></p><p>\u5BF9\u4E8E\u6BCF\u4E2ACache\u800C\u8A00\uFF0C\u90FD\u6709\u4E00\u4E2A\u5BB9\u91CF\u9650\u5236\uFF0CMyBatis\u5404\u4F9B\u4E86\u5404\u79CD\u7B56\u7565\u6765\u5BF9Cache\u7F13\u5B58\u7684\u5BB9\u91CF\u8FDB\u884C\u63A7\u5236\uFF0C\u4EE5\u53CA\u5BF9Cache\u4E2D\u7684\u6570\u636E\u8FDB\u884C\u5237\u65B0\u548C\u7F6E\u6362\u3002MyBatis\u4E3B\u8981\u63D0\u4F9B\u4E86\u4EE5\u4E0B\u51E0\u4E2A\u5237\u65B0\u548C\u7F6E\u6362\u7B56\u7565\uFF1A</p><ul><li>LRU\uFF1A\uFF08Least Recently Used\uFF09,\u6700\u8FD1\u6700\u5C11\u4F7F\u7528\u7B97\u6CD5\uFF0C\u5373\u5982\u679C\u7F13\u5B58\u4E2D\u5BB9\u91CF\u5DF2\u7ECF\u6EE1\u4E86\uFF0C\u4F1A\u5C06\u7F13\u5B58\u4E2D\u6700\u8FD1\u6700\u5C11\u88AB\u4F7F\u7528\u7684\u7F13\u5B58\u8BB0\u5F55\u6E05\u9664\u6389\uFF0C\u7136\u540E\u6DFB\u52A0\u65B0\u7684\u8BB0\u5F55\uFF1B</li><li>FIFO\uFF1A\uFF08First in first out\uFF09,\u5148\u8FDB\u5148\u51FA\u7B97\u6CD5\uFF0C\u5982\u679C\u7F13\u5B58\u4E2D\u7684\u5BB9\u91CF\u5DF2\u7ECF\u6EE1\u4E86\uFF0C\u90A3\u4E48\u4F1A\u5C06\u6700\u5148\u8FDB\u5165\u7F13\u5B58\u4E2D\u7684\u6570\u636E\u6E05\u9664\u6389\uFF1B</li><li>Scheduled\uFF1A\u6307\u5B9A\u65F6\u95F4\u95F4\u9694\u6E05\u7A7A\u7B97\u6CD5\uFF0C\u8BE5\u7B97\u6CD5\u4F1A\u4EE5\u6307\u5B9A\u7684\u67D0\u4E00\u4E2A\u65F6\u95F4\u95F4\u9694\u5C06Cache\u7F13\u5B58\u4E2D\u7684\u6570\u636E\u6E05\u7A7A\uFF1B</li></ul><h2 id="_2-\u5982\u4F55\u7EC6\u7C92\u5EA6\u5730\u63A7\u5236\u4F60\u7684mybatis\u4E8C\u7EA7\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#_2-\u5982\u4F55\u7EC6\u7C92\u5EA6\u5730\u63A7\u5236\u4F60\u7684mybatis\u4E8C\u7EA7\u7F13\u5B58" aria-hidden="true">#</a> 2. \u5982\u4F55\u7EC6\u7C92\u5EA6\u5730\u63A7\u5236\u4F60\u7684MyBatis\u4E8C\u7EA7\u7F13\u5B58</h2><h3 id="_2-1-\u4E00\u4E2A\u5173\u4E8Emybatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u9645\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E00\u4E2A\u5173\u4E8Emybatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u9645\u95EE\u9898" aria-hidden="true">#</a> 2.1 \u4E00\u4E2A\u5173\u4E8EMyBatis\u7684\u4E8C\u7EA7\u7F13\u5B58\u7684\u5B9E\u9645\u95EE\u9898</h3><p>\u73B0\u6709AMapper.xml\u4E2D\u5B9A\u4E49\u4E86\u5BF9\u6570\u636E\u5E93\u8868 ATable \u7684CRUD\u64CD\u4F5C\uFF0CBMapper\u5B9A\u4E49\u4E86\u5BF9\u6570\u636E\u5E93\u8868BTable\u7684CRUD\u64CD\u4F5C\uFF1B</p><p>\u5047\u8BBE MyBatis \u7684\u4E8C\u7EA7\u7F13\u5B58\u5F00\u542F\uFF0C\u5E76\u4E14 AMapper \u4E2D\u4F7F\u7528\u4E86\u4E8C\u7EA7\u7F13\u5B58\uFF0CAMapper\u5BF9\u5E94\u7684\u4E8C\u7EA7\u7F13\u5B58\u4E3AACache\uFF1B</p><p>\u9664\u6B64\u4E4B\u5916\uFF0CAMapper \u4E2D\u8FD8\u5B9A\u4E49\u4E86\u4E00\u4E2A\u8DDFBTable\u6709\u5173\u7684\u67E5\u8BE2\u8BED\u53E5\uFF0C\u7C7B\u4F3C\u5982\u4E0B\u6240\u8FF0\uFF1A</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>selectATableWithJoin<span class="token punctuation">&quot;</span></span> <span class="token attr-name">resultMap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>BaseResultMap<span class="token punctuation">&quot;</span></span> <span class="token attr-name">useCache</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>  
      select * from ATable left join BTable on ....  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u4EE5\u4E0B\u64CD\u4F5C\uFF1A</p><ul><li>\u6267\u884CAMapper\u4E2D\u7684&quot;selectATableWithJoin&quot; \u64CD\u4F5C\uFF0C\u6B64\u65F6\u4F1A\u5C06\u67E5\u8BE2\u5230\u7684\u7ED3\u679C\u653E\u7F6E\u5230AMapper\u5BF9\u5E94\u7684\u4E8C\u7EA7\u7F13\u5B58ACache\u4E2D\uFF1B</li><li>\u6267\u884CBMapper\u4E2D\u5BF9BTable\u7684\u66F4\u65B0\u64CD\u4F5C(update\u3001delete\u3001insert)\u540E\uFF0CBTable\u7684\u6570\u636E\u66F4\u65B0\uFF1B</li><li>\u518D\u6267\u884C1\u5B8C\u5168\u76F8\u540C\u7684\u67E5\u8BE2\uFF0C\u8FD9\u65F6\u5019\u4F1A\u76F4\u63A5\u4ECEAMapper\u4E8C\u7EA7\u7F13\u5B58ACache\u4E2D\u53D6\u503C\uFF0C\u5C06ACache\u4E2D\u7684\u503C\u76F4\u63A5\u8FD4\u56DE\uFF1B</li></ul><p>\u597D\uFF0C<strong>\u95EE\u9898\u5C31\u51FA\u73B0\u5728\u7B2C3\u6B65</strong>\u4E0A\uFF1A</p><p>\u7531\u4E8EAMapper\u7684\u201CselectATableWithJoin\u201D \u5BF9\u5E94\u7684SQL\u8BED\u53E5\u9700\u8981\u548CBTable\u8FDB\u884Cjoin\u67E5\u627E\uFF0C\u800C\u5728\u7B2C 2 \u6B65BTable\u7684\u6570\u636E\u5DF2\u7ECF\u66F4\u65B0\u4E86\uFF0C\u4F46\u662F\u7B2C 3 \u6B65\u67E5\u8BE2\u7684\u503C\u662F\u7B2C 1 \u6B65\u7684\u7F13\u5B58\u503C\uFF0C\u5DF2\u7ECF\u6781\u6709\u53EF\u80FD\u8DDF\u771F\u5B9E\u6570\u636E\u5E93\u7ED3\u679C\u4E0D\u4E00\u6837\uFF0C\u5373ACache\u4E2D\u7F13\u5B58\u6570\u636E\u8FC7\u671F\u4E86\uFF01</p><p>\u603B\u7ED3\u6765\u770B\uFF0C\u5C31\u662F\uFF1A</p><p>\u5BF9\u4E8E\u67D0\u4E9B\u4F7F\u7528\u4E86 join\u8FDE\u63A5\u7684\u67E5\u8BE2\uFF0C\u5982\u679C\u5176\u5173\u8054\u7684\u8868\u6570\u636E\u53D1\u751F\u4E86\u66F4\u65B0\uFF0Cjoin\u8FDE\u63A5\u7684\u67E5\u8BE2\u7531\u4E8E\u5148\u524D\u7F13\u5B58\u7684\u539F\u56E0\uFF0C\u5BFC\u81F4\u67E5\u8BE2\u7ED3\u679C\u548C\u771F\u5B9E\u6570\u636E\u4E0D\u540C\u6B65\uFF1B</p><p>\u4ECEMyBatis\u7684\u89D2\u5EA6\u6765\u770B\uFF0C\u8FD9\u4E2A\u95EE\u9898\u53EF\u4EE5\u8FD9\u6837\u8868\u8FF0\uFF1A</p><p><strong>\u5BF9\u4E8E\u67D0\u4E9B\u8868\u6267\u884C\u4E86\u66F4\u65B0(update\u3001delete\u3001insert)\u64CD\u4F5C\u540E\uFF0C\u5982\u4F55\u53BB\u6E05\u7A7A\u8DDF\u8FD9\u4E9B\u8868\u6709\u5173\u8054\u7684\u67E5\u8BE2\u8BED\u53E5\u6240\u9020\u6210\u7684\u7F13\u5B58</strong></p><h3 id="_2-2-\u5F53\u524Dmybatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u5DE5\u4F5C\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#_2-2-\u5F53\u524Dmybatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u5DE5\u4F5C\u673A\u5236" aria-hidden="true">#</a> 2.2 \u5F53\u524DMyBatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u5DE5\u4F5C\u673A\u5236</h3><blockquote><p>MyBatis\u4E8C\u7EA7\u7F13\u5B58\u7684\u4E00\u4E2A\u91CD\u8981\u7279\u70B9\uFF1A\u5373\u677E\u6563\u7684Cache\u7F13\u5B58\u7BA1\u7406\u548C\u7EF4\u62A4</p></blockquote><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220730224933178.png" alt="image-20220730224933178" loading="lazy"></p><p>\u4E00\u4E2AMapper\u4E2D\u5B9A\u4E49\u7684\u589E\u5220\u6539\u67E5\u64CD\u4F5C\u53EA\u80FD\u5F71\u54CD\u5230\u81EA\u5DF1\u5173\u8054\u7684Cache\u5BF9\u8C61\u3002\u5982\u4E0A\u56FE\u6240\u793A\u7684Mapper namespace1\u4E2D\u5B9A\u4E49\u7684\u82E5\u5E72CRUD\u8BED\u53E5\uFF0C\u4EA7\u751F\u7684\u7F13\u5B58\u53EA\u4F1A\u88AB\u653E\u7F6E\u5230\u76F8\u5E94\u5173\u8054\u7684Cache1\u4E2D\uFF0C\u5373Mapper namespace2,namespace3,namespace4 \u4E2D\u7684CRUD\u7684\u8BED\u53E5\u4E0D\u4F1A\u5F71\u54CD\u5230Cache1\u3002</p><p>\u53EF\u4EE5\u770B\u51FA\uFF0C<strong>Mapper\u4E4B\u95F4\u7684\u7F13\u5B58\u5173\u7CFB\u6BD4\u8F83\u677E\u6563\uFF0C\u76F8\u4E92\u5173\u8054\u7684\u7A0B\u5EA6\u6BD4\u8F83\u5F31</strong>\u3002</p><p>\u73B0\u5728\u518D\u56DE\u5230\u4E0A\u9762\u63CF\u8FF0\u7684\u95EE\u9898\uFF0C\u5982\u679C\u6211\u4EEC\u5C06AMapper\u548CBMapper\u5171\u7528\u4E00\u4E2ACache\u5BF9\u8C61\uFF0C\u90A3\u4E48\uFF0C\u5F53BMapper\u6267\u884C\u66F4\u65B0\u64CD\u4F5C\u65F6\uFF0C\u53EF\u4EE5\u6E05\u7A7A\u5BF9\u5E94Cache\u4E2D\u7684\u6240\u6709\u7684\u7F13\u5B58\u6570\u636E\uFF0C\u8FD9\u6837\u7684\u8BDD\uFF0C\u6570\u636E\u4E0D\u662F\u4E5F\u53EF\u4EE5\u4FDD\u6301\u6700\u65B0\u5417\uFF1F</p><p>\u786E\u5B9E\u8FD9\u4E2A\u4E5F\u662F\u4E00\u79CD\u89E3\u51B3\u65B9\u6848\uFF0C\u4E0D\u8FC7\uFF0C\u5B83\u4F1A\u4F7F\u7F13\u5B58\u7684\u4F7F\u7528\u6548\u7387\u53D8\u7684\u5F88\u4F4E\uFF01AMapper\u548CBMapper\u7684\u4EFB\u610F\u7684\u66F4\u65B0\u64CD\u4F5C\u90FD\u4F1A\u5C06\u5171\u7528\u7684Cache\u6E05\u7A7A\uFF0C\u4F1A\u9891\u7E41\u5730\u6E05\u7A7ACache\uFF0C\u5BFC\u81F4Cache\u5B9E\u9645\u7684\u547D\u4E2D\u7387\u548C\u4F7F\u7528\u7387\u5C31\u53D8\u5F97\u5F88\u4F4E\u4E86\uFF0C\u6240\u4EE5\u8FD9\u79CD\u7B56\u7565\u5B9E\u9645\u60C5\u51B5\u4E0B\u662F\u4E0D\u53EF\u53D6\u7684\u3002</p><p>\u6700\u7406\u60F3\u7684\u89E3\u51B3\u65B9\u6848\u5C31\u662F\uFF1A</p><p><strong>\u5BF9\u4E8E\u67D0\u4E9B\u8868\u6267\u884C\u4E86\u66F4\u65B0(update\u3001delete\u3001insert)\u64CD\u4F5C\u540E\uFF0C\u53BB\u6E05\u7A7A\u8DDF\u8FD9\u4E9B\u6307\u5B9A\u7684\u8868\u6709\u5173\u8054\u7684\u67E5\u8BE2\u8BED\u53E5\u6240\u9020\u6210\u7684\u7F13\u5B58</strong>; \u8FD9\u6837\uFF0C\u5C31\u662F\u4EE5\u5F88\u7EC6\u7684\u7C92\u5EA6\u7BA1\u7406MyBatis\u5185\u90E8\u7684\u7F13\u5B58\uFF0C\u4F7F\u5F97\u7F13\u5B58\u7684\u4F7F\u7528\u7387\u548C\u51C6\u786E\u7387\u90FD\u80FD\u5927\u5927\u5730\u63D0\u5347\u3002</p><blockquote><p>\u8FD9\u4E5F\u592A\u7D2F\u4E86\u5427\uFF0C\u96BE\u602A\u8FD9\u4E48\u591A\u4EBA\u4E0D\u7528\u4E8C\u7EA7\u7F13\u5B58</p></blockquote><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,61),r={href:"https://pdai.tech/md/framework/orm-mybatis/mybatis-y-cache-level2.html",target:"_blank",rel:"noopener noreferrer"},u=a("strong",null,"MyBatis\u8BE6\u89E3 - \u4E8C\u7EA7\u7F13\u5B58\u5B9E\u73B0\u673A\u5236",-1);function h(d,g){const e=i("ExternalLinkIcon");return s(),n("div",null,[o,a("p",null,[a("a",r,[u,p(e)])])])}const M=t(l,[["render",h],["__file","mybatis-y-cache-level2.html.vue"]]);export{M as default};
