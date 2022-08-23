import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="spring\u8FDB\u9636-spring-ioc\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4Bioc\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#spring\u8FDB\u9636-spring-ioc\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4Bioc\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1" aria-hidden="true">#</a> Spring\u8FDB\u9636 - Spring IOC\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4BIOC\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1</h1><blockquote><p>\u5728\u5BF9IoC\u6709\u4E86\u521D\u6B65\u7684\u8BA4\u77E5\u540E\uFF0C\u6211\u4EEC\u5F00\u59CB\u5BF9IOC\u7684\u5B9E\u73B0\u539F\u7406\u8FDB\u884C\u6DF1\u5165\u7406\u89E3\u3002\u672C\u6587\u5C06\u5E2E\u52A9\u4F60\u7AD9\u5728\u8BBE\u8BA1\u8005\u7684\u89D2\u5EA6\u53BB\u770BIOC\u6700\u9876\u5C42\u7684\u7ED3\u6784\u8BBE\u8BA1\u3002</p></blockquote><h2 id="_1-\u7AD9\u5728\u8BBE\u8BA1\u8005\u7684\u89D2\u5EA6\u8003\u8651\u8BBE\u8BA1ioc\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#_1-\u7AD9\u5728\u8BBE\u8BA1\u8005\u7684\u89D2\u5EA6\u8003\u8651\u8BBE\u8BA1ioc\u5BB9\u5668" aria-hidden="true">#</a> 1. \u7AD9\u5728\u8BBE\u8BA1\u8005\u7684\u89D2\u5EA6\u8003\u8651\u8BBE\u8BA1IOC\u5BB9\u5668</h2><blockquote><p>\u5982\u679C\u8BA9\u4F60\u6765\u8BBE\u8BA1\u4E00\u4E2AIoC\u5BB9\u5668\uFF0C\u4F60\u4F1A\u600E\u4E48\u8BBE\u8BA1\uFF1F\u6211\u4EEC\u521D\u6B65\u7684\u901A\u8FC7\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6765\u5E2E\u52A9\u6211\u4EEC\u66F4\u597D\u7684\u7406\u89E3IOC\u7684\u8BBE\u8BA1\u3002</p></blockquote><p>\u5728\u8BBE\u8BA1\u65F6\uFF0C\u9996\u5148\u9700\u8981\u8003\u8651\u7684\u662FIOC\u5BB9\u5668\u7684\u529F\u80FD\uFF08\u8F93\u5165\u548C\u8F93\u51FA), \u627F\u63A5\u524D\u9762\u7684\u6587\u7AE0\uFF0C\u6211\u4EEC\u521D\u6B65\u7684\u753B\u51FAIOC\u5BB9\u5668\u7684\u6574\u4F53\u529F\u80FD\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711211622924.png" alt="image-20220711211622924"></p><p>\u5728\u6B64\u57FA\u7840\u4E0A\uFF0C\u6211\u4EEC\u521D\u6B65\u7684\u53BB\u601D\u8003\uFF0C\u5982\u679C\u4F5C\u4E3A\u4E00\u4E2AIOC\u5BB9\u5668\u7684\u8BBE\u8BA1\u8005\uFF0C\u4E3B\u4F53\u4E0A\u5E94\u8BE5\u5305\u542B\u54EA\u51E0\u4E2A\u90E8\u5206\uFF1A</p><ul><li>\u52A0\u8F7DBean\u7684\u914D\u7F6E\uFF08\u6BD4\u5982xml\u914D\u7F6E\uFF09 <ul><li>\u6BD4\u5982\u4E0D\u540C\u7C7B\u578B\u8D44\u6E90\u7684\u52A0\u8F7D\uFF0C\u89E3\u6790\u6210\u751F\u6210\u7EDF\u4E00Bean\u7684\u5B9A\u4E49</li></ul></li><li>\u6839\u636EBean\u7684\u5B9A\u4E49\u52A0\u8F7D\u751F\u6210Bean\u7684\u5B9E\u4F8B\uFF0C\u5E76\u653E\u7F6E\u5728Bean\u5BB9\u5668\u4E2D <ul><li>\u6BD4\u5982Bean\u7684\u4F9D\u8D56\u6CE8\u5165\uFF0CBean\u7684\u5D4C\u5957\uFF0CBean\u5B58\u653E\uFF08\u7F13\u5B58\uFF09\u7B49</li></ul></li><li>\u9664\u4E86\u57FA\u7840Bean\u5916\uFF0C\u8FD8\u6709\u5E38\u89C4\u9488\u5BF9\u4F01\u4E1A\u7EA7\u4E1A\u52A1\u7684\u7279\u522BBean <ul><li>\u6BD4\u5982\u56FD\u9645\u5316Message\uFF0C\u4E8B\u4EF6Event\u7B49\u751F\u6210\u7279\u6B8A\u7684\u7C7B\u7ED3\u6784\u53BB\u652F\u6491</li></ul></li><li>\u5BF9\u5BB9\u5668\u4E2D\u7684Bean\u63D0\u4F9B\u7EDF\u4E00\u7684\u7BA1\u7406\u548C\u8C03\u7528 <ul><li>\u6BD4\u5982\u7528\u5DE5\u5382\u6A21\u5F0F\u7BA1\u7406\uFF0C\u63D0\u4F9B\u65B9\u6CD5\u6839\u636E\u540D\u5B57/\u7C7B\u7684\u7C7B\u578B\u7B49\u4ECE\u5BB9\u5668\u4E2D\u83B7\u53D6Bean</li></ul></li><li>...</li></ul><blockquote><p>\u8FD9\u79CD\u601D\u8003\u7684\u8FC7\u7A0B\u624D\u662F\u5EFA\u8BBE\u6027\u7684\uFF0C\u77E5\u8BC6\u4F53\u7CFB\u7684\u6784\u5EFA\u624D\u662F\u9AD8\u6548\u7684</p></blockquote><h2 id="_2-spring-ioc\u7684\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#_2-spring-ioc\u7684\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1" aria-hidden="true">#</a> 2. Spring IoC\u7684\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1</h2><blockquote><p>\u90A3\u4E48\u6211\u4EEC\u6765\u770B\u4E0BSpring\u8BBE\u8BA1\u8005\u662F\u5982\u4F55\u8BBE\u8BA1IoC\u5E76\u89E3\u51B3\u8FD9\u4E9B\u95EE\u9898\u7684\u3002</p></blockquote><h3 id="_2-1-beanfactory\u548Cbeanregistry-ioc\u5BB9\u5668\u529F\u80FD\u89C4\u8303\u548Cbean\u7684\u6CE8\u518C" tabindex="-1"><a class="header-anchor" href="#_2-1-beanfactory\u548Cbeanregistry-ioc\u5BB9\u5668\u529F\u80FD\u89C4\u8303\u548Cbean\u7684\u6CE8\u518C" aria-hidden="true">#</a> 2.1 BeanFactory\u548CBeanRegistry\uFF1AIOC\u5BB9\u5668\u529F\u80FD\u89C4\u8303\u548CBean\u7684\u6CE8\u518C</h3><blockquote><p>Spring Bean\u7684\u521B\u5EFA\u662F\u5178\u578B\u7684\u5DE5\u5382\u6A21\u5F0F\uFF0C\u8FD9\u4E00\u7CFB\u5217\u7684Bean\u5DE5\u5382\uFF0C\u4E5F\u5373IOC\u5BB9\u5668\u4E3A\u5F00\u53D1\u8005\u7BA1\u7406\u5BF9\u8C61\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u63D0\u4F9B\u4E86\u5F88\u591A\u4FBF\u5229\u548C\u57FA\u7840\u670D\u52A1\uFF0C\u5728Spring\u4E2D\u6709\u8BB8\u591A\u7684IOC\u5BB9\u5668\u7684\u5B9E\u73B0\u4F9B\u7528\u6237\u9009\u62E9\u548C\u4F7F\u7528\uFF0C\u8FD9\u662FIOC\u5BB9\u5668\u7684\u57FA\u7840\uFF1B\u5728\u9876\u5C42\u7684\u7ED3\u6784\u8BBE\u8BA1\u4E3B\u8981\u56F4\u7ED5\u7740BeanFactory\u548CxxxRegistry\u8FDB\u884C\uFF1A</p><ul><li><strong>BeanFactory\uFF1A \u5DE5\u5382\u6A21\u5F0F\u5B9A\u4E49\u4E86IOC\u5BB9\u5668\u7684\u57FA\u672C\u529F\u80FD\u89C4\u8303</strong></li><li><strong>BeanRegistry\uFF1A \u5411IOC\u5BB9\u5668\u624B\u5DE5\u6CE8\u518C BeanDefinition \u5BF9\u8C61\u7684\u65B9\u6CD5</strong></li></ul></blockquote><p>\u5176\u76F8\u4E92\u5173\u7CFB\u5982\u4E0B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711212057979.png" alt="image-20220711212057979"></p><p>\u6211\u4EEC\u518D\u901A\u8FC7\u51E0\u4E2A\u95EE\u9898\u6765\u8F85\u52A9\u7406\u89E3\u3002</p><h4 id="_2-1-1-beanfactory\u5B9A\u4E49\u4E86ioc-\u5BB9\u5668\u57FA\u672C\u529F\u80FD\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#_2-1-1-beanfactory\u5B9A\u4E49\u4E86ioc-\u5BB9\u5668\u57FA\u672C\u529F\u80FD\u89C4\u8303" aria-hidden="true">#</a> 2.1.1 BeanFactory\u5B9A\u4E49\u4E86IOC \u5BB9\u5668\u57FA\u672C\u529F\u80FD\u89C4\u8303\uFF1F</h4><p><strong>BeanFactory\u4F5C\u4E3A\u6700\u9876\u5C42\u7684\u4E00\u4E2A\u63A5\u53E3\u7C7B\uFF0C\u5B83\u5B9A\u4E49\u4E86IOC\u5BB9\u5668\u7684\u57FA\u672C\u529F\u80FD\u89C4\u8303</strong>\uFF0CBeanFactory \u6709\u4E09\u4E2A\u5B50\u7C7B\uFF1AListableBeanFactory\u3001HierarchicalBeanFactory \u548CAutowireCapableBeanFactory\u3002\u6211\u4EEC\u770B\u4E0BBeanFactory\u63A5\u53E3\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BeanFactory</span> <span class="token punctuation">{</span>    \n      \n    <span class="token comment">//\u7528\u4E8E\u53D6\u6D88\u5F15\u7528\u5B9E\u4F8B\u5E76\u5C06\u5176\u4E0EFactoryBean\u521B\u5EFA\u7684bean\u533A\u5206\u5F00\u6765\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u547D\u540D\u7684bean\u662FFactoryBean\uFF0C\u5219\u83B7\u53D6\u5C06\u8FD4\u56DEFactory\uFF0C\u800C\u4E0D\u662FFactory\u8FD4\u56DE\u7684\u5B9E\u4F8B\u3002</span>\n    <span class="token class-name">String</span> FACTORY_BEAN_PREFIX <span class="token operator">=</span> <span class="token string">&quot;&amp;&quot;</span><span class="token punctuation">;</span> \n        \n    <span class="token comment">//\u6839\u636Ebean\u7684\u540D\u5B57\u548CClass\u7C7B\u578B\u7B49\u6765\u5F97\u5230bean\u5B9E\u4F8B    </span>\n    <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>    \n    <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Class</span> requiredType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>    \n    <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>\n    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> requiredType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>\n    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> requiredType<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//\u8FD4\u56DE\u6307\u5B9Abean\u7684Provider</span>\n    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">getBeanProvider</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> requiredType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">getBeanProvider</span><span class="token punctuation">(</span><span class="token class-name">ResolvableType</span> requiredType<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//\u68C0\u67E5\u5DE5\u5382\u4E2D\u662F\u5426\u5305\u542B\u7ED9\u5B9Aname\u7684bean\uFF0C\u6216\u8005\u5916\u90E8\u6CE8\u518C\u7684bean</span>\n    <span class="token keyword">boolean</span> <span class="token function">containsBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//\u68C0\u67E5\u6240\u7ED9\u5B9Aname\u7684bean\u662F\u5426\u4E3A\u5355\u4F8B/\u539F\u578B</span>\n    <span class="token keyword">boolean</span> <span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>\n    <span class="token keyword">boolean</span> <span class="token function">isPrototype</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//\u5224\u65AD\u6240\u7ED9name\u7684\u7C7B\u578B\u4E0Etype\u662F\u5426\u5339\u914D</span>\n    <span class="token keyword">boolean</span> <span class="token function">isTypeMatch</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">ResolvableType</span> typeToMatch<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>\n    <span class="token keyword">boolean</span> <span class="token function">isTypeMatch</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> typeToMatch<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//\u83B7\u53D6\u7ED9\u5B9Aname\u7684bean\u7684\u7C7B\u578B</span>\n    <span class="token annotation punctuation">@Nullable</span>\n    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchBeanDefinitionException</span><span class="token punctuation">;</span>\n\n    <span class="token comment">//\u8FD4\u56DE\u7ED9\u5B9Aname\u7684bean\u7684\u522B\u540D</span>\n    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getAliases</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n     \n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-beanfactory\u4E3A\u4F55\u8981\u5B9A\u4E49\u8FD9\u4E48\u591A\u5C42\u6B21\u7684\u63A5\u53E3-\u5B9A\u4E49\u4E86\u54EA\u4E9B\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#_2-1-2-beanfactory\u4E3A\u4F55\u8981\u5B9A\u4E49\u8FD9\u4E48\u591A\u5C42\u6B21\u7684\u63A5\u53E3-\u5B9A\u4E49\u4E86\u54EA\u4E9B\u63A5\u53E3" aria-hidden="true">#</a> 2.1.2 BeanFactory\u4E3A\u4F55\u8981\u5B9A\u4E49\u8FD9\u4E48\u591A\u5C42\u6B21\u7684\u63A5\u53E3\uFF1F\u5B9A\u4E49\u4E86\u54EA\u4E9B\u63A5\u53E3\uFF1F</h4><p>\u4E3B\u8981\u662F\u4E3A\u4E86<strong>\u533A\u5206\u5728 Spring \u5185\u90E8\u5728\u64CD\u4F5C\u8FC7\u7A0B\u4E2D\u5BF9\u8C61\u7684\u4F20\u9012\u548C\u8F6C\u5316\u8FC7\u7A0B\u4E2D\uFF0C\u5BF9\u5BF9\u8C61\u7684\u6570\u636E\u8BBF\u95EE\u6240\u505A\u7684\u9650\u5236</strong>\u3002</p><p>\u6709\u54EA\u4E9B\u63A5\u53E3\u5462\uFF1F</p><ul><li><strong>ListableBeanFactory</strong>\uFF1A\u8BE5\u63A5\u53E3\u5B9A\u4E49\u4E86\u8BBF\u95EE\u5BB9\u5668\u4E2D Bean \u57FA\u672C\u4FE1\u606F\u7684\u82E5\u5E72\u65B9\u6CD5\uFF0C\u5982\u67E5\u770BBean \u7684\u4E2A\u6570\u3001\u83B7\u53D6\u67D0\u4E00\u7C7B\u578B Bean \u7684\u914D\u7F6E\u540D\u3001\u67E5\u770B\u5BB9\u5668\u4E2D\u662F\u5426\u5305\u62EC\u67D0\u4E00 Bean \u7B49\u65B9\u6CD5\uFF1B</li><li><strong>HierarchicalBeanFactory</strong>\uFF1A\u7236\u5B50\u7EA7\u8054 IoC \u5BB9\u5668\u7684\u63A5\u53E3\uFF0C\u5B50\u5BB9\u5668\u53EF\u4EE5\u901A\u8FC7\u63A5\u53E3\u65B9\u6CD5\u8BBF\u95EE\u7236\u5BB9\u5668\uFF1B \u901A\u8FC7 HierarchicalBeanFactory \u63A5\u53E3\uFF0C Spring \u7684 IoC \u5BB9\u5668\u53EF\u4EE5\u5EFA\u7ACB\u7236\u5B50\u5C42\u7EA7\u5173\u8054\u7684\u5BB9\u5668\u4F53\u7CFB\uFF0C\u5B50\u5BB9\u5668\u53EF\u4EE5\u8BBF\u95EE\u7236\u5BB9\u5668\u4E2D\u7684 Bean\uFF0C\u4F46\u7236\u5BB9\u5668\u4E0D\u80FD\u8BBF\u95EE\u5B50\u5BB9\u5668\u7684 Bean\u3002Spring \u4F7F\u7528\u7236\u5B50\u5BB9\u5668\u5B9E\u73B0\u4E86\u5F88\u591A\u529F\u80FD\uFF0C\u6BD4\u5982\u5728 Spring MVC \u4E2D\uFF0C\u5C55\u73B0\u5C42 Bean \u4F4D\u4E8E\u4E00\u4E2A\u5B50\u5BB9\u5668\u4E2D\uFF0C\u800C\u4E1A\u52A1\u5C42\u548C\u6301\u4E45\u5C42\u7684 Bean \u4F4D\u4E8E\u7236\u5BB9\u5668\u4E2D\u3002\u8FD9\u6837\uFF0C\u5C55\u73B0\u5C42 Bean \u5C31\u53EF\u4EE5\u5F15\u7528\u4E1A\u52A1\u5C42\u548C\u6301\u4E45\u5C42\u7684 Bean\uFF0C\u800C\u4E1A\u52A1\u5C42\u548C\u6301\u4E45\u5C42\u7684 Bean \u5219\u770B\u4E0D\u5230\u5C55\u73B0\u5C42\u7684 Bean\u3002</li><li><strong>ConfigurableBeanFactory</strong>\uFF1A\u662F\u4E00\u4E2A\u91CD\u8981\u7684\u63A5\u53E3\uFF0C\u589E\u5F3A\u4E86 IoC \u5BB9\u5668\u7684\u53EF\u5B9A\u5236\u6027\uFF0C\u5B83\u5B9A\u4E49\u4E86\u8BBE\u7F6E\u7C7B\u88C5\u8F7D\u5668\u3001\u5C5E\u6027\u7F16\u8F91\u5668\u3001\u5BB9\u5668\u521D\u59CB\u5316\u540E\u7F6E\u5904\u7406\u5668\u7B49\u65B9\u6CD5\uFF1B</li><li><strong>ConfigurableListableBeanFactory</strong>: ListableBeanFactory \u548C ConfigurableBeanFactory\u7684\u878D\u5408\uFF1B</li><li><strong>AutowireCapableBeanFactory</strong>\uFF1A\u5B9A\u4E49\u4E86\u5C06\u5BB9\u5668\u4E2D\u7684 Bean \u6309\u67D0\u79CD\u89C4\u5219\uFF08\u5982\u6309\u540D\u5B57\u5339\u914D\u3001\u6309\u7C7B\u578B\u5339\u914D\u7B49\uFF09\u8FDB\u884C\u81EA\u52A8\u88C5\u914D\u7684\u65B9\u6CD5\uFF1B</li></ul><h4 id="_2-1-3-\u5982\u4F55\u5C06bean\u6CE8\u518C\u5230beanfactory\u4E2D-beanregistry" tabindex="-1"><a class="header-anchor" href="#_2-1-3-\u5982\u4F55\u5C06bean\u6CE8\u518C\u5230beanfactory\u4E2D-beanregistry" aria-hidden="true">#</a> 2.1.3 \u5982\u4F55\u5C06Bean\u6CE8\u518C\u5230BeanFactory\u4E2D\uFF1FBeanRegistry</h4><p>Spring \u914D\u7F6E\u6587\u4EF6\u4E2D\u6BCF\u4E00\u4E2A<code>&lt;bean&gt;</code>\u8282\u70B9\u5143\u7D20\u5728 Spring \u5BB9\u5668\u91CC\u90FD\u901A\u8FC7\u4E00\u4E2A BeanDefinition \u5BF9\u8C61\u8868\u793A\uFF0C\u5B83\u63CF\u8FF0\u4E86 Bean \u7684\u914D\u7F6E\u4FE1\u606F\u3002\u800C BeanDefinitionRegistry \u63A5\u53E3\u63D0\u4F9B\u4E86\u5411\u5BB9\u5668\u624B\u5DE5\u6CE8\u518C BeanDefinition \u5BF9\u8C61\u7684\u65B9\u6CD5\u3002</p><h3 id="_2-2-beandefinition-\u5404\u79CDbean\u5BF9\u8C61\u53CA\u5176\u76F8\u4E92\u7684\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#_2-2-beandefinition-\u5404\u79CDbean\u5BF9\u8C61\u53CA\u5176\u76F8\u4E92\u7684\u5173\u7CFB" aria-hidden="true">#</a> 2.2 BeanDefinition\uFF1A\u5404\u79CDBean\u5BF9\u8C61\u53CA\u5176\u76F8\u4E92\u7684\u5173\u7CFB</h3><blockquote><p>Bean\u5BF9\u8C61\u5B58\u5728\u4F9D\u8D56\u5D4C\u5957\u7B49\u5173\u7CFB\uFF0C\u6240\u4EE5\u8BBE\u8BA1\u8005\u8BBE\u8BA1\u4E86BeanDefinition\uFF0C\u5B83\u7528\u6765\u5BF9Bean\u5BF9\u8C61\u53CA\u5173\u7CFB\u5B9A\u4E49\uFF1B\u6211\u4EEC\u5728\u7406\u89E3\u65F6\u53EA\u9700\u8981\u6293\u4F4F\u5982\u4E0B\u4E09\u4E2A\u8981\u70B9\uFF1A</p><ul><li><strong>BeanDefinition \u5B9A\u4E49\u4E86\u5404\u79CDBean\u5BF9\u8C61\u53CA\u5176\u76F8\u4E92\u7684\u5173\u7CFB</strong></li><li><strong>BeanDefinitionReader \u8FD9\u662FBeanDefinition\u7684\u89E3\u6790\u5668</strong></li><li><strong>BeanDefinitionHolder \u8FD9\u662FBeanDefination\u7684\u5305\u88C5\u7C7B\uFF0C\u7528\u6765\u5B58\u50A8BeanDefinition\uFF0Cname\u4EE5\u53CAaliases\u7B49\u3002</strong></li></ul></blockquote><ul><li><strong>BeanDefinition</strong></li></ul><p>SpringIOC\u5BB9\u5668\u7BA1\u7406\u4E86\u6211\u4EEC\u5B9A\u4E49\u7684\u5404\u79CDBean\u5BF9\u8C61\u53CA\u5176\u76F8\u4E92\u7684\u5173\u7CFB\uFF0CBean\u5BF9\u8C61\u5728Spring\u5B9E\u73B0\u4E2D\u662F\u4EE5BeanDefinition\u6765\u63CF\u8FF0\u7684\uFF0C\u5176\u7EE7\u627F\u4F53\u7CFB\u5982\u4E0B</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711212932428.png" alt="image-20220711212932428"></p><ul><li><strong>BeanDefinitionReader</strong></li></ul><p>Bean \u7684\u89E3\u6790\u8FC7\u7A0B\u975E\u5E38\u590D\u6742\uFF0C\u529F\u80FD\u88AB\u5206\u7684\u5F88\u7EC6\uFF0C\u56E0\u4E3A\u8FD9\u91CC\u9700\u8981\u88AB\u6269\u5C55\u7684\u5730\u65B9\u5F88\u591A\uFF0C\u5FC5\u987B\u4FDD\u8BC1\u6709\u8DB3\u591F\u7684\u7075\u6D3B\u6027\uFF0C\u4EE5\u5E94\u5BF9\u53EF\u80FD\u7684\u53D8\u5316\u3002Bean \u7684\u89E3\u6790\u4E3B\u8981\u5C31\u662F\u5BF9 Spring \u914D\u7F6E\u6587\u4EF6\u7684\u89E3\u6790\u3002\u8FD9\u4E2A\u89E3\u6790\u8FC7\u7A0B\u4E3B\u8981\u901A\u8FC7\u4E0B\u56FE\u4E2D\u7684\u7C7B\u5B8C\u6210</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711213017946.png" alt="image-20220711213017946"></p><ul><li><strong>BeanDefinitionHolder</strong></li></ul><p>BeanDefinitionHolder \u8FD9\u662FBeanDefination\u7684\u5305\u88C5\u7C7B\uFF0C\u7528\u6765\u5B58\u50A8BeanDefinition\uFF0Cname\u4EE5\u53CAaliases\u7B49</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711213038289.png" alt="image-20220711213038289"></p><h3 id="_2-3-applicationcontext-ioc\u63A5\u53E3\u8BBE\u8BA1\u548C\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-3-applicationcontext-ioc\u63A5\u53E3\u8BBE\u8BA1\u548C\u5B9E\u73B0" aria-hidden="true">#</a> 2.3 ApplicationContext\uFF1AIOC\u63A5\u53E3\u8BBE\u8BA1\u548C\u5B9E\u73B0</h3><blockquote><p>IoC\u5BB9\u5668\u7684\u63A5\u53E3\u7C7B\u662FApplicationContext\uFF0C\u5F88\u663E\u7136\u5B83\u5FC5\u7136\u7EE7\u627FBeanFactory\u5BF9Bean\u89C4\u8303\uFF08\u6700\u57FA\u672C\u7684ioc\u5BB9\u5668\u7684\u5B9E\u73B0\uFF09\u8FDB\u884C\u5B9A\u4E49\u3002\u800CApplicationContext\u8868\u793A\u7684\u662F\u5E94\u7528\u7684\u4E0A\u4E0B\u6587\uFF0C\u9664\u4E86\u5BF9Bean\u7684\u7BA1\u7406\u5916\uFF0C\u8FD8\u81F3\u5C11\u5E94\u8BE5\u5305\u542B\u4E86</p><ul><li><strong>\u8BBF\u95EE\u8D44\u6E90</strong>\uFF1A \u5BF9\u4E0D\u540C\u65B9\u5F0F\u7684Bean\u914D\u7F6E\uFF08\u5373\u8D44\u6E90\uFF09\u8FDB\u884C\u52A0\u8F7D\u3002(\u5B9E\u73B0ResourcePatternResolver\u63A5\u53E3)</li><li><strong>\u56FD\u9645\u5316</strong>: \u652F\u6301\u4FE1\u606F\u6E90\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u56FD\u9645\u5316\u3002\uFF08\u5B9E\u73B0MessageSource\u63A5\u53E3\uFF09</li><li><strong>\u5E94\u7528\u4E8B\u4EF6</strong>: \u652F\u6301\u5E94\u7528\u4E8B\u4EF6\u3002(\u5B9E\u73B0ApplicationEventPublisher\u63A5\u53E3)</li></ul></blockquote><h4 id="_2-3-1-applicationcontext\u63A5\u53E3\u7684\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#_2-3-1-applicationcontext\u63A5\u53E3\u7684\u8BBE\u8BA1" aria-hidden="true">#</a> 2.3.1 ApplicationContext\u63A5\u53E3\u7684\u8BBE\u8BA1</h4><p>\u6211\u4EEC\u6765\u770B\u4E0BApplicationContext\u6574\u4F53\u7ED3\u6784</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711213226561.png" alt="image-20220711213226561"></p><ul><li><strong>HierarchicalBeanFactory \u548C ListableBeanFactory</strong>\uFF1A ApplicationContext \u7EE7\u627F\u4E86 HierarchicalBeanFactory \u548C ListableBeanFactory \u63A5\u53E3\uFF0C\u5728\u6B64\u57FA\u7840\u4E0A\uFF0C\u8FD8\u901A\u8FC7\u591A\u4E2A\u5176\u4ED6\u7684\u63A5\u53E3\u6269\u5C55\u4E86 BeanFactory \u7684\u529F\u80FD\uFF1A</li><li><strong>ApplicationEventPublisher</strong>\uFF1A\u8BA9\u5BB9\u5668\u62E5\u6709\u53D1\u5E03\u5E94\u7528\u4E0A\u4E0B\u6587\u4E8B\u4EF6\u7684\u529F\u80FD\uFF0C\u5305\u62EC\u5BB9\u5668\u542F\u52A8\u4E8B\u4EF6\u3001\u5173\u95ED\u4E8B\u4EF6\u7B49\u3002\u5B9E\u73B0\u4E86 ApplicationListener \u4E8B\u4EF6\u76D1\u542C\u63A5\u53E3\u7684 Bean \u53EF\u4EE5\u63A5\u6536\u5230\u5BB9\u5668\u4E8B\u4EF6 \uFF0C \u5E76\u5BF9\u4E8B\u4EF6\u8FDB\u884C\u54CD\u5E94\u5904\u7406 \u3002 \u5728 ApplicationContext \u62BD\u8C61\u5B9E\u73B0\u7C7BAbstractApplicationContext \u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u53D1\u73B0\u5B58\u5728\u4E00\u4E2A ApplicationEventMulticaster\uFF0C\u5B83\u8D1F\u8D23\u4FDD\u5B58\u6240\u6709\u76D1\u542C\u5668\uFF0C\u4EE5\u4FBF\u5728\u5BB9\u5668\u4EA7\u751F\u4E0A\u4E0B\u6587\u4E8B\u4EF6\u65F6\u901A\u77E5\u8FD9\u4E9B\u4E8B\u4EF6\u76D1\u542C\u8005\u3002</li><li><strong>MessageSource</strong>\uFF1A\u4E3A\u5E94\u7528\u63D0\u4F9B i18n \u56FD\u9645\u5316\u6D88\u606F\u8BBF\u95EE\u7684\u529F\u80FD\uFF1B</li><li><strong>ResourcePatternResolver</strong> \uFF1A \u6240 \u6709 ApplicationContext \u5B9E\u73B0\u7C7B\u90FD\u5B9E\u73B0\u4E86\u7C7B\u4F3C\u4E8EPathMatchingResourcePatternResolver \u7684\u529F\u80FD\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5E26\u524D\u7F00\u7684 Ant \u98CE\u683C\u7684\u8D44\u6E90\u6587\u4EF6\u8DEF\u5F84\u88C5\u8F7D Spring \u7684\u914D\u7F6E\u6587\u4EF6\u3002</li><li><strong>LifeCycle</strong>\uFF1A\u8BE5\u63A5\u53E3\u662F Spring 2.0 \u52A0\u5165\u7684\uFF0C\u8BE5\u63A5\u53E3\u63D0\u4F9B\u4E86 start()\u548C stop()\u4E24\u4E2A\u65B9\u6CD5\uFF0C\u4E3B\u8981\u7528\u4E8E\u63A7\u5236\u5F02\u6B65\u5904\u7406\u8FC7\u7A0B\u3002\u5728\u5177\u4F53\u4F7F\u7528\u65F6\uFF0C\u8BE5\u63A5\u53E3\u540C\u65F6\u88AB ApplicationContext \u5B9E\u73B0\u53CA\u5177\u4F53 Bean \u5B9E\u73B0\uFF0C ApplicationContext \u4F1A\u5C06 start/stop \u7684\u4FE1\u606F\u4F20\u9012\u7ED9\u5BB9\u5668\u4E2D\u6240\u6709\u5B9E\u73B0\u4E86\u8BE5\u63A5\u53E3\u7684 Bean\uFF0C\u4EE5\u8FBE\u5230\u7BA1\u7406\u548C\u63A7\u5236 JMX\u3001\u4EFB\u52A1\u8C03\u5EA6\u7B49\u76EE\u7684\u3002</li></ul><h4 id="_2-3-2-applicationcontext\u63A5\u53E3\u7684\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-3-2-applicationcontext\u63A5\u53E3\u7684\u5B9E\u73B0" aria-hidden="true">#</a> 2.3.2 ApplicationContext\u63A5\u53E3\u7684\u5B9E\u73B0</h4><p>\u5728\u8003\u8651ApplicationContext\u63A5\u53E3\u7684\u5B9E\u73B0\u65F6\uFF0C\u5173\u952E\u7684\u70B9\u5728\u4E8E\uFF0C\u4E0D\u540CBean\u7684\u914D\u7F6E\u65B9\u5F0F\uFF08\u6BD4\u5982xml,groovy,annotation\u7B49\uFF09\u6709\u7740\u4E0D\u540C\u7684\u8D44\u6E90\u52A0\u8F7D\u65B9\u5F0F\uFF0C\u8FD9\u4FBF\u884D\u751F\u9664\u4E86\u4F17\u591AApplicationContext\u7684\u5B9E\u73B0\u7C7B\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711213419379.png" alt="image-20220711213419379"></p><p><strong>\u7B2C\u4E00\uFF0C\u4ECE\u7C7B\u7ED3\u6784\u8BBE\u8BA1\u4E0A\u770B\uFF0C \u56F4\u7ED5\u7740\u662F\u5426\u9700\u8981Refresh\u5BB9\u5668\u884D\u751F\u51FA\u4E24\u4E2A\u62BD\u8C61\u7C7B</strong>\uFF1A</p><ul><li><strong>GenericApplicationContext</strong>\uFF1A \u662F\u521D\u59CB\u5316\u7684\u65F6\u5019\u5C31\u521B\u5EFA\u5BB9\u5668\uFF0C\u5F80\u540E\u7684\u6BCF\u6B21refresh\u90FD\u4E0D\u4F1A\u66F4\u6539</li><li><strong>AbstractRefreshableApplicationContext</strong>\uFF1A AbstractRefreshableApplicationContext\u53CA\u5B50\u7C7B\u7684\u6BCF\u6B21refresh\u90FD\u662F\u5148\u6E05\u9664\u5DF2\u6709(\u5982\u679C\u4E0D\u5B58\u5728\u5C31\u521B\u5EFA)\u7684\u5BB9\u5668\uFF0C\u7136\u540E\u518D\u91CD\u65B0\u521B\u5EFA\uFF1BAbstractRefreshableApplicationContext\u53CA\u5B50\u7C7B\u65E0\u6CD5\u505A\u5230GenericApplicationContext<strong>\u6DF7\u5408\u642D\u914D\u4ECE\u4E0D\u540C\u6E90\u5934\u83B7\u53D6bean\u7684\u5B9A\u4E49\u4FE1\u606F</strong></li></ul><p><strong>\u7B2C\u4E8C\uFF0C \u4ECE\u52A0\u8F7D\u7684\u6E90\u6765\u770B\uFF08\u6BD4\u5982xml,groovy,annotation\u7B49\uFF09\uFF0C \u884D\u751F\u51FA\u4F17\u591A\u7C7B\u578B\u7684ApplicationContext, \u5178\u578B\u6BD4\u5982</strong>:</p><ul><li><strong>FileSystemXmlApplicationContext</strong>\uFF1A \u4ECE\u6587\u4EF6\u7CFB\u7EDF\u4E0B\u7684\u4E00\u4E2A\u6216\u591A\u4E2Axml\u914D\u7F6E\u6587\u4EF6\u4E2D\u52A0\u8F7D\u4E0A\u4E0B\u6587\u5B9A\u4E49\uFF0C\u4E5F\u5C31\u662F\u8BF4\u7CFB\u7EDF\u76D8\u7B26\u4E2D\u52A0\u8F7Dxml\u914D\u7F6E\u6587\u4EF6\u3002</li><li><strong>ClassPathXmlApplicationContext</strong>\uFF1A \u4ECE\u7C7B\u8DEF\u5F84\u4E0B\u7684\u4E00\u4E2A\u6216\u591A\u4E2Axml\u914D\u7F6E\u6587\u4EF6\u4E2D\u52A0\u8F7D\u4E0A\u4E0B\u6587\u5B9A\u4E49\uFF0C\u9002\u7528\u4E8Exml\u914D\u7F6E\u7684\u65B9\u5F0F\u3002</li><li><strong>AnnotationConfigApplicationContext</strong>\uFF1A \u4ECE\u4E00\u4E2A\u6216\u591A\u4E2A\u57FA\u4E8Ejava\u7684\u914D\u7F6E\u7C7B\u4E2D\u52A0\u8F7D\u4E0A\u4E0B\u6587\u5B9A\u4E49\uFF0C\u9002\u7528\u4E8Ejava\u6CE8\u89E3\u7684\u65B9\u5F0F\u3002</li><li><strong>ConfigurableApplicationContext</strong>\uFF1A \u6269\u5C55\u4E8E ApplicationContext\uFF0C\u5B83\u65B0\u589E\u52A0\u4E86\u4E24\u4E2A\u4E3B\u8981\u7684\u65B9\u6CD5\uFF1A refresh()\u548C close()\uFF0C\u8BA9 ApplicationContext \u5177\u6709\u542F\u52A8\u3001\u5237\u65B0\u548C\u5173\u95ED\u5E94\u7528\u4E0A\u4E0B\u6587\u7684\u80FD\u529B\u3002\u5728\u5E94\u7528\u4E0A\u4E0B\u6587\u5173\u95ED\u7684\u60C5\u51B5\u4E0B\u8C03\u7528 refresh()\u5373\u53EF\u542F\u52A8\u5E94\u7528\u4E0A\u4E0B\u6587\uFF0C\u5728\u5DF2\u7ECF\u542F\u52A8\u7684\u72B6\u6001\u4E0B\uFF0C\u8C03\u7528 refresh()\u5219\u6E05\u9664\u7F13\u5B58\u5E76\u91CD\u65B0\u88C5\u8F7D\u914D\u7F6E\u4FE1\u606F\uFF0C\u800C\u8C03\u7528close()\u5219\u53EF\u5173\u95ED\u5E94\u7528\u4E0A\u4E0B\u6587\u3002\u8FD9\u4E9B\u63A5\u53E3\u65B9\u6CD5\u4E3A\u5BB9\u5668\u7684\u63A7\u5236\u7BA1\u7406\u5E26\u6765\u4E86\u4FBF\u5229\uFF0C\u4F46\u4F5C\u4E3A\u5F00\u53D1\u8005\uFF0C\u6211\u4EEC\u5E76\u4E0D\u9700\u8981\u8FC7\u591A\u5173\u5FC3\u8FD9\u4E9B\u65B9\u6CD5\u3002</li></ul><p><strong>\u7B2C\u4E09\uFF0C \u66F4\u8FDB\u4E00\u6B65\u7406\u89E3</strong>\uFF1A</p><p><em><strong>\u8BBE\u8BA1\u8005\u5728\u8BBE\u8BA1\u65F6AnnotationConfigApplicationContext\u4E3A\u4EC0\u4E48\u662F\u7EE7\u627FGenericApplicationContext</strong></em>\uFF1F \u56E0\u4E3A\u57FA\u4E8E\u6CE8\u89E3\u7684\u914D\u7F6E\uFF0C\u662F\u4E0D\u592A\u4F1A\u88AB\u8FD0\u884C\u65F6\u4FEE\u6539\u7684\uFF0C\u8FD9\u610F\u5473\u7740\u4E0D\u9700\u8981\u8FDB\u884C\u52A8\u6001Bean\u914D\u7F6E\u548C\u5237\u65B0\u5BB9\u5668\uFF0C\u6240\u4EE5\u53EA\u9700\u8981GenericApplicationContext\u3002</p><p>\u800C\u57FA\u4E8EXML\u8FD9\u79CD\u914D\u7F6E\u6587\u4EF6\uFF0C\u8FD9\u79CD\u6587\u4EF6\u662F\u5BB9\u6613\u4FEE\u6539\u7684\uFF0C\u9700\u8981\u52A8\u6001\u6027\u5237\u65B0Bean\u7684\u652F\u6301\uFF0C\u6240\u4EE5XML\u76F8\u5173\u7684\u914D\u7F6E\u5FC5\u7136\u7EE7\u627FAbstractRefreshableApplicationContext\uFF1B \u4E14\u5B58\u5728\u591A\u79CDxml\u7684\u52A0\u8F7D\u65B9\u5F0F\uFF08\u4F4D\u7F6E\u4E0D\u540C\u7684\u8BBE\u8BA1\uFF09\uFF0C\u6240\u4EE5\u5FC5\u7136\u4F1A\u8BBE\u8BA1\u51FAAbstractXmlApplicationContext, \u5176\u4E2D\u5305\u542B\u5BF9XML\u914D\u7F6E\u89E3\u6790\u6210BeanDefination\u7684\u8FC7\u7A0B\u3002</p><p>\u90A3\u4E48\u7EC6\u5FC3\u7684\u4F60\u4ECE\u4E0A\u56FE\u53EF\u4EE5\u53D1\u73B0AnnotationWebConfigApplicationContext\u5374\u662F\u7EE7\u627F\u4E86AbstractRefreshableApplicationContext\u800C\u4E0D\u662FGenericApplicationContext\uFF0C <em><strong>\u4E3A\u4EC0\u4E48AnnotationWebConfigApplicationContext\u7EE7\u627F\u81EAAbstractRefreshableApplicationContext\u5462</strong></em> \uFF1F \u56E0\u4E3A\u7528\u6237\u53EF\u4EE5\u901A\u8FC7ApplicationContextInitializer\u6765\u8BBE\u7F6EcontextInitializerClasses\uFF08context-param / init-param\uFF09\uFF0C \u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\u7528\u6237\u503E\u5411\u4E8E\u5237\u65B0Bean\u7684\uFF0C\u6240\u4EE5\u8BBE\u8BA1\u8005\u9009\u62E9\u8BA9AnnotationWebConfigApplicationContext\u7EE7\u627F\u4E86AbstractRefreshableApplicationContext\u3002\uFF08\u5982\u4E0B\u662F\u6E90\u7801\u4E2DSpring\u8BBE\u8BA1\u8005\u5BF9\u5B83\u7684\u89E3\u91CA\uFF09</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>\n<span class="token operator">*</span> <span class="token generics"><span class="token punctuation">&lt;</span>p<span class="token punctuation">&gt;</span></span><span class="token class-name">As</span> an alternative <span class="token keyword">to</span> <span class="token namespace">setting</span> the <span class="token string">&quot;contextConfigLocation&quot;</span> parameter<span class="token punctuation">,</span> users may\n <span class="token operator">*</span> implement an <span class="token punctuation">{</span><span class="token annotation punctuation">@link</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span>ApplicationContextInitializer</span>\n <span class="token operator">*</span> <span class="token class-name">ApplicationContextInitializer</span><span class="token punctuation">}</span> and set the\n <span class="token operator">*</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@linkplain</span> <span class="token class-name">ContextLoader</span>#CONTEXT_INITIALIZER_CLASSES_PARAM <span class="token string">&quot;contextInitializerClasses&quot;</span><span class="token punctuation">}</span>\n <span class="token operator">*</span> context<span class="token operator">-</span>param <span class="token operator">/</span> init<span class="token operator">-</span><span class="token class-name"><span class="token namespace">param<span class="token punctuation">.</span></span> In</span> such cases<span class="token punctuation">,</span> users should favor the <span class="token punctuation">{</span><span class="token annotation punctuation">@link</span> #<span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n <span class="token operator">*</span> and <span class="token punctuation">{</span><span class="token annotation punctuation">@link</span> #<span class="token function">scan</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">}</span> methods over the <span class="token punctuation">{</span><span class="token annotation punctuation">@link</span> #<span class="token function">setConfigLocation</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n <span class="token operator">*</span> method<span class="token punctuation">,</span> which is primarily <span class="token keyword">for</span> use by <span class="token punctuation">{</span><span class="token annotation punctuation">@code</span> <span class="token class-name">ContextLoader</span><span class="token punctuation">}</span><span class="token punctuation">.</span>\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u628A\u4E4B\u524D\u7684\u8BBE\u8BA1\u8981\u70B9\u548C\u8BBE\u8BA1\u7ED3\u6784\u7ED3\u5408\u8D77\u6765\u770B\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220711213732293.png" alt="image-20220711213732293"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 57);
const _hoisted_58 = {
  href: "https://pdai.tech/md/spring/spring-x-framework-ioc-source-1.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_59 = /* @__PURE__ */ createBaseVNode("strong", null, "Spring\u8FDB\u9636- Spring IOC\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4BIOC\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1", -1);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_58, [
        _hoisted_59,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Spring__SpringIOC_______IOC_______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Spring\u8FDB\u9636-SpringIOC\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4BIOC\u4F53\u7CFB\u7ED3\u6784\u8BBE\u8BA1.html.vue"]]);
export { Spring__SpringIOC_______IOC_______html as default };
