import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="springboot\u7684\u6A21\u5757\u53CA\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#springboot\u7684\u6A21\u5757\u53CA\u7ED3\u6784" aria-hidden="true">#</a> SpringBoot\u7684\u6A21\u5757\u53CA\u7ED3\u6784</h1><blockquote><p>\u6CE8\uFF1A\u8BE5\u6E90\u7801\u5206\u6790\u5BF9\u5E94SpringBoot\u7248\u672C\u4E3A<strong>2.1.0.RELEASE</strong></p></blockquote><h2 id="_1-\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#_1-\u524D\u8A00" aria-hidden="true">#</a> <strong>1. \u524D\u8A00</strong></h2><p><strong>\u9605\u8BFB\u6E90\u7801\uFF0C\u6B64\u65F6\u6211\u4EEC\u4E00\u5B9A\u8981\u5BF9\u9879\u76EE\u7ED3\u6784\u7B49\u6709\u4E00\u4E2A\u6574\u4F53\u7684\u8BA4\u8BC6\uFF0C\u7136\u540E\u518D\u8FDB\u884C\u6E90\u7801\u5206\u6790\u8C03\u8BD5</strong> \u3002</p><h2 id="_2-springboot\u6E90\u7801\u6A21\u5757\u4E00\u89C8" tabindex="-1"><a class="header-anchor" href="#_2-springboot\u6E90\u7801\u6A21\u5757\u4E00\u89C8" aria-hidden="true">#</a> <strong>2. SpringBoot\u6E90\u7801\u6A21\u5757\u4E00\u89C8</strong></h2><p>\u6211\u4EEC\u5148\u6765\u5BF9SpringBoot\u7684\u6E90\u7801\u6A21\u5757\u6765\u4E00\u4E2A\u5927\u81F4\u7684\u4E86\u89E3\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220331162621887.png" alt="image-20220331162621887"></p><p>\u4ECE\u4E0A\u56FE\u53EF\u4EE5\u770B\u5230\uFF0C\u4E3B\u8981\u6709\u4EE5\u4E0B\u56DB\u4E2A\u6A21\u5757\uFF1A</p><ul><li><strong>spring-boot-project</strong>\uFF1A\u6574\u4E2ASpringBoot\u6846\u67B6\u5168\u90E8\u529F\u80FD\u5728\u8FD9\u4E2A\u6A21\u5757\u5B9E\u73B0\uFF0CSpringBoot\u9879\u76EE95%\u7684\u4EE3\u7801\u90FD\u5728\u8FD9\u91CC\u5B9E\u73B0\uFF0C\u6E90\u7801\u603B\u5171\u670925\u4E07\u884C\u5DE6\u53F3\u3002</li><li><strong>Spring-boot-samples</strong>\uFF1A\u8FD9\u4E2A\u662FSpringBoot\u7ED9\u5C0F\u4F19\u4F34\u4EEC\u8D60\u9001\u7684\u798F\u5229\uFF0C\u91CC\u9762\u5305\u542B\u4E86\u5404\u79CD\u5404\u6837\u4F7F\u7528SpringBoot\u7684\u7B80\u5355demo\uFF0C\u6211\u4EEC\u8C03\u8BD5\u9605\u8BFB\u6E90\u7801\u7684\u65F6\u5019\u53EF\u4EE5\u5145\u5206\u5229\u7528\u8BE5\u6A21\u5757\u3002</li><li><strong>Spring-boot-sample-invoker</strong>\uFF1A\u8FD9\u4E2A\u6A21\u5757\u5E94\u8BE5\u662F\u8DDFsample\u6A21\u5757\u6709\u5173\uFF0C\u6CE8\u610F\u6839pom.xml\u4E2D\u6709\u8FD9\u4E48\u4E00\u53E5\u8BDD\uFF1A<code>Samples are built via the invoker plugin</code>\uFF0C\u8BE5\u6A21\u5757\u65E0\u4EE3\u7801\u3002</li><li><strong>Spring-boot-tests</strong>\uFF1A\u8FD9\u4E2A\u6A21\u5757SpringBoot\u7684\u6D4B\u8BD5\u6A21\u5757\uFF0C\u8DDF\u90E8\u7F72\u6D4B\u8BD5\u548C\u96C6\u6210\u6D4B\u8BD5\u6709\u5173\u3002</li></ul><p>\u56E0\u4E3ASpringBoot\u7684\u5168\u90E8\u529F\u80FD\u5728spring-boot-project\u6A21\u5757\u5B9E\u73B0\uFF0C\u56E0\u6B64\u4E0B\u9762\u91CD\u70B9\u6765\u4ECB\u7ECD\u4E0B spring-boot-project \u6A21\u5757\u3002</p><h2 id="_3-spring-boot-project\u6E90\u7801\u6A21\u5757\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#_3-spring-boot-project\u6E90\u7801\u6A21\u5757\u8BE6\u89E3" aria-hidden="true">#</a> <strong>3. spring-boot-project\u6E90\u7801\u6A21\u5757\u8BE6\u89E3</strong></h2><p>\u5148\u6765\u770B\u4E0Bspring-boot-project\u6574\u4F53\u6A21\u5757\u7ED3\u6784\uFF0C\u5982\u4E0B\u56FE\uFF0C\u7136\u540E\u6211\u4EEC\u518D\u9010\u4E2A\u6765\u4ECB\u7ECD\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220331162733623.png" alt="image-20220331162733623"></p><h4 id="_3-1-spring-boot-parent" tabindex="-1"><a class="header-anchor" href="#_3-1-spring-boot-parent" aria-hidden="true">#</a> <strong>3.1 spring-boot-parent</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u6CA1\u6709\u4EE3\u7801\uFF0C\u662Fspring-boot\u6A21\u5757\u7684\u7236\u9879\u76EE\uFF0C\u88AB\u5176\u4ED6\u5B50\u6A21\u5757\u7EE7\u627F\u3002</p><h4 id="_3-2-spring-boot" tabindex="-1"><a class="header-anchor" href="#_3-2-spring-boot" aria-hidden="true">#</a> 3.<strong>2 spring-boot</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u662FSpringBoot\u9879\u76EE\u7684\u6838\u5FC3\uFF0C\u53EF\u4EE5\u8BF4\u4E00\u4E9B\u57FA\u7840\u6838\u5FC3\u7684\u529F\u80FD\u90FD\u5728\u8FD9\u91CC\u5B9E\u73B0\uFF0C\u4E3ASpringBoot\u7684\u5176\u4ED6\u6A21\u5757\u7EC4\u4EF6\u529F\u80FD\u63D0\u4F9B\u4E86\u652F\u6301\uFF0C\u4E3B\u8981\u5305\u62EC\u4EE5\u4E0B\u6838\u5FC3\u529F\u80FD\uFF1A</p><ul><li><code>SpringApplication</code>\u7C7B\uFF0C\u8FD9\u4E2A\u662FSpringBoot\u7684\u542F\u52A8\u7C7B\uFF0C\u63D0\u4F9B\u4E86\u4E00\u4E2A\u9759\u6001\u7684<code>run</code>\u65B9\u6CD5\u6765\u542F\u52A8\u7A0B\u5E8F\uFF0C\u8BE5\u7C7B\u4E3B\u8981\u7528\u6765\u521B\u5EFA\u5E76\u4E14\u5237\u65B0Spring\u5BB9\u5668<code>ApplicationContext</code>.</li><li>\u652F\u6301\u9009\u62E9\u4E0D\u540C\u7684\u5BB9\u5668\u6BD4\u5982Tomcat,Jetty\u7B49\u6765\u4F5C\u4E3A\u5E94\u7528\u7684\u5D4C\u5165\u5BB9\u5668\uFF0C\u8FD9\u4E2A\u662FSpringBoot\u7684\u65B0\u7279\u6027\u4E4B\u4E00\u3002</li><li>\u5916\u90E8\u914D\u7F6E\u652F\u6301\uFF0C\u8FD9\u4E2A\u6307\u7684\u662F\u6211\u4EEC\u6267\u884C<code>java -jar xxx.jar</code>\u547D\u4EE4\u65F6\u53EF\u4EE5\u5E26\u4E00\u4E9B\u53C2\u6570\uFF0C\u6BD4\u5982\u6267\u884C<code>java -jar demo.jar --server.port=8888</code>\u6765\u5C06\u5E94\u7528\u7AEF\u53E3\u4FEE\u6539\u4E3A8888.</li><li>\u8BE5\u6A21\u5757\u5185\u7F6E\u4E86\u4E00\u4E9BSpringBoot\u542F\u52A8\u65F6\u7684\u751F\u547D\u5468\u671F\u4E8B\u4EF6\u548C\u4E00\u4E9B\u5BB9\u5668\u521D\u59CB\u5316\u5668(<code>ApplicationContext</code> initializers)\uFF0C\u6765\u6267\u884C\u4E00\u4E9BSpringBoot\u542F\u52A8\u65F6\u7684\u521D\u59CB\u5316\u903B\u8F91\u3002</li></ul><h4 id="_3-3-spring-boot-autoconfigure" tabindex="-1"><a class="header-anchor" href="#_3-3-spring-boot-autoconfigure" aria-hidden="true">#</a> 3.<strong>3 spring-boot-autoconfigure</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u8DDFSpringBoot\u7684\u81EA\u52A8\u914D\u7F6E\u6709\u5173\uFF0C\u4E5F\u662FSpringBoot\u7684\u65B0\u7279\u6027\u4E4B\u4E00\u3002\u6BD4\u5982SpringBoot\u80FD\u57FA\u4E8E\u7C7B\u8DEF\u5F84\u6765\u81EA\u52A8\u914D\u7F6E\u67D0\u4E2A\u9879\u76EE\u6A21\u5757\uFF0C\u81EA\u52A8\u914D\u7F6E\u6700\u4E3A\u5173\u952E\u7684\u6CE8\u89E3\u662F<code>@EnableAutoConfiguration</code>,\u8FD9\u4E2A\u6CE8\u89E3\u80FD\u89E6\u53D1Spring\u4E0A\u4E0B\u6587\u7684\u81EA\u52A8\u914D\u7F6E\u3002\u53E6\u5916\u4E00\u4E2A\u91CD\u8981\u7684\u6CE8\u89E3\u662F<code>@Conditional</code>\u3002</p>', 20);
const _hoisted_21 = /* @__PURE__ */ createTextVNode("\u4E3E\u4E2A\u6817\u5B50\uFF0C\u82E5");
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("code", null, "HSQLDB", -1);
const _hoisted_23 = /* @__PURE__ */ createTextVNode("\u5728\u9879\u76EE\u7684\u7C7B\u8DEF\u5F84\u4E2D\uFF0C\u4E14\u6211\u4EEC\u6CA1\u6709\u914D\u7F6E\u4EFB\u4F55\u5176\u4ED6");
const _hoisted_24 = {
  href: "https://cloud.tencent.com/solution/database?from=10680",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_25 = /* @__PURE__ */ createTextVNode("\u6570\u636E\u5E93");
const _hoisted_26 = /* @__PURE__ */ createTextVNode("\u7684\u8FDE\u63A5\uFF0C\u6B64\u65F6\u81EA\u52A8\u914D\u7F6E\u5C31\u4F1A\u81EA\u52A8\u6839\u636E\u7C7B\u8DEF\u5F84\u6765\u521B\u5EFA\u76F8\u5E94\u7684");
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("code", null, "bean", -1);
const _hoisted_28 = /* @__PURE__ */ createTextVNode("\u3002");
const _hoisted_29 = /* @__PURE__ */ createStaticVNode('<p>\u9664\u4E86\u6839\u636E\u7C7B\u8DEF\u5F84\u6765\u8FDB\u884C\u81EA\u52A8\u914D\u7F6E\u5916\uFF0C\u8FD8\u6709\u6839\u636E\u5BB9\u5668\u4E2D\u662F\u5426\u5B58\u5728\u67D0\u4E2Abean\u7B49\u65B9\u5F0F\u6765\u8FDB\u884C\u81EA\u52A8\u914D\u7F6E\uFF0C\u8FD9\u91CC\u4E0D\u4F1A\u8FDB\u5165\u5230\u5177\u4F53\u7EC6\u8282\u4E2D\u3002</p><h4 id="_3-4-spring-boot-starters" tabindex="-1"><a class="header-anchor" href="#_3-4-spring-boot-starters" aria-hidden="true">#</a> <strong>3.4 spring-boot-starters</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u662F\u8DDFSpringBoot\u7684\u8D77\u6B65\u4F9D\u8D56\u6709\u5173\uFF0C\u4E5F\u662FSpringBoot\u7684\u65B0\u7279\u6027\u4E4B\u4E00\u3002SpringBoot\u901A\u8FC7\u63D0\u4F9B\u4F17\u591A\u8D77\u6B65\u4F9D\u8D56\u964D\u4F4E\u9879\u76EE\u4F9D\u8D56\u7684\u590D\u6742\u5EA6\u3002\u8D77\u6B65\u4F9D\u8D56\u5176\u5B9E\u5C31\u662F\u5229\u7528maven\u9879\u76EE\u6A21\u578B\u5C06\u5176\u4ED6\u76F8\u5173\u7684\u4F9D\u8D56\u7ED9\u805A\u5408\u8D77\u6765\uFF0C\u91CC\u9762\u5404\u79CD\u4F9D\u8D56\u7684\u7248\u672C\u53F7\u90FD\u7ED9\u5B9A\u4E49\u597D\uFF0C\u907F\u514D\u7528\u6237\u5728\u5F15\u5165\u4F9D\u8D56\u65F6\u51FA\u73B0\u5404\u79CD\u7248\u672C\u51B2\u7A81\uFF0C\u65B9\u4FBF\u4E86\u6211\u4EEC\u7684\u4F7F\u7528\u3002</p><blockquote><p>\u4E3E\u4E2A\u6817\u5B50\uFF0C\u6211\u4EEC\u8981\u7528\u5230activemq\u65F6\uFF0C\u6B64\u65F6\u53EF\u4EE5\u76F4\u63A5\u5F15\u5165<code>spring-boot-starter-activemq</code>\u8D77\u6B65\u4F9D\u8D56\u5373\u53EF\uFF0C\u82E5SpringBoot\u5B98\u7F51\u6216\u7B2C\u4E09\u65B9\u7EC4\u7EC7\u6CA1\u6709\u63D0\u4F9B\u76F8\u5E94\u7684SpringBoot\u8D77\u6B65\u4F9D\u8D56\u65F6\uFF0C\u6B64\u65F6\u6211\u4EEC\u53EF\u4EE5\u8FDB\u884C\u5B9A\u5236\u81EA\u5DF1\u7684\u8D77\u6B65\u4F9D\u8D56\u3002</p></blockquote><p>\u6CE8\u610F\uFF0C\u8BE5\u6A21\u5757\u6CA1\u6709\u4EE3\u7801\uFF0C\u4E3B\u8981\u662F\u901A\u8FC7maven\u7684pom.xml\u6765\u7EC4\u7EC7\u5404\u79CD\u4F9D\u8D56\u3002</p><h4 id="_3-5-spring-boot-cli" tabindex="-1"><a class="header-anchor" href="#_3-5-spring-boot-cli" aria-hidden="true">#</a> <strong>3.5 spring-boot-cli</strong></h4>', 6);
const _hoisted_35 = /* @__PURE__ */ createTextVNode("Spring Boot CLI\u662F\u4E00\u4E2A");
const _hoisted_36 = {
  href: "https://cloud.tencent.com/product/cli?from=10680",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_37 = /* @__PURE__ */ createTextVNode("\u547D\u4EE4\u884C\u5DE5\u5177");
const _hoisted_38 = /* @__PURE__ */ createTextVNode("\uFF0C\u5982\u679C\u60A8\u60F3\u4F7F\u7528Spring\u5FEB\u901F\u5F00\u53D1\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B83\u3002\u5B83\u5141\u8BB8\u60A8\u8FD0\u884CGroovy\u811A\u672C\uFF0C\u8FD9\u610F\u5473\u7740\u60A8\u6709\u4E00\u4E2A\u719F\u6089\u7684\u7C7B\u4F3CJava\u7684\u8BED\u6CD5\uFF0C\u800C\u6CA1\u6709\u90A3\u4E48\u591A\u6837\u677F\u4EE3\u7801\u3002\u60A8\u8FD8\u53EF\u4EE5\u5F15\u5BFC\u4E00\u4E2A\u65B0\u9879\u76EE\u6216\u7F16\u5199\u81EA\u5DF1\u7684\u547D\u4EE4\u3002");
const _hoisted_39 = /* @__PURE__ */ createStaticVNode('<h4 id="_3-6-spring-boot-actuator" tabindex="-1"><a class="header-anchor" href="#_3-6-spring-boot-actuator" aria-hidden="true">#</a> <strong>3.6 spring-boot-actuator</strong></h4><p>\u8FD9\u4E2A\u8DDFSpringBoot\u7684\u76D1\u63A7\u6709\u5173\uFF0C\u4E5F\u662FSpringBoot\u7684\u65B0\u7279\u6027\u4E4B\u4E00\u3002\u53EF\u4EE5\u901A\u8FC7HTTP\u7AEF\u70B9\u6216JMX\u7B49\u6765\u7BA1\u7406\u548C\u76D1\u63A7\u5E94\u7528\u3002\u5BA1\u8BA1\u3001\u8FD0\u884C\u72B6\u51B5\u548C\u5EA6\u91CF\u6536\u96C6\u53EF\u4EE5\u81EA\u52A8\u5E94\u7528\u5230\u5E94\u7528\u7A0B\u5E8F\u3002\u8FD9\u4E2A\u76D1\u63A7\u6A21\u5757\u662F\u5F00\u7BB1\u5373\u7528\u7684\uFF0C\u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u7AEF\u70B9\u5305\u62EC<code>HealthEndpoint</code>, <code>EnvironmentEndpoint</code>\u548C<code>BeansEndpoint</code>\u7B49\u7AEF\u70B9\u3002</p><h4 id="_3-7-spring-boot-actuator-autoconfigure" tabindex="-1"><a class="header-anchor" href="#_3-7-spring-boot-actuator-autoconfigure" aria-hidden="true">#</a> 3.<strong>7 spring-boot-actuator-autoconfigure</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u4E3A\u76D1\u63A7\u6A21\u5757\u63D0\u4F9B\u81EA\u52A8\u914D\u7F6E\u7684\u529F\u80FD\uFF0C\u901A\u5E38\u4E5F\u662F\u6839\u636E\u7C7B\u8DEF\u5F84\u6765\u8FDB\u884C\u914D\u7F6E\u3002\u6BD4\u5982<code>Micrometer</code>\u5B58\u5728\u4E8E\u7C7B\u8DEF\u5F84\u4E2D\uFF0C\u90A3\u4E48\u5C06\u4F1A\u81EA\u52A8\u914D\u7F6E<code>MetricsEndpoint</code>\u3002</p><h4 id="_3-8-spring-boot-test" tabindex="-1"><a class="header-anchor" href="#_3-8-spring-boot-test" aria-hidden="true">#</a> <strong>3.8 spring-boot-test</strong></h4><p>\u8FD9\u4E2A\u6A21\u5F0F\u662Fspring-boot\u7684\u8DDF\u6D4B\u8BD5\u6709\u5173\u7684\u6A21\u5757\uFF0C\u5305\u542B\u4E86\u4E00\u4E9B\u5E2E\u52A9\u6211\u4EEC\u6D4B\u8BD5\u7684\u6838\u5FC3\u7C7B\u548C\u6CE8\u89E3\uFF08\u6BD4\u5982<code>@SpringBootTest</code>\uFF09\u3002</p><h4 id="_3-9-spring-boot-dependencies" tabindex="-1"><a class="header-anchor" href="#_3-9-spring-boot-dependencies" aria-hidden="true">#</a> 3.<strong>9 spring-boot-dependencies</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u4E5F\u6CA1\u6709\u4EE3\u7801\uFF0C\u4E3B\u8981\u662F\u5B9A\u4E49\u4E86\u4E00\u4E9BSpringBoot\u7684maven\u76F8\u5173\u7684\u4E00\u4E9B\u4F9D\u8D56\u53CA\u5176\u7248\u672C\u3002</p><h4 id="_3-10-spring-boot-devtools" tabindex="-1"><a class="header-anchor" href="#_3-10-spring-boot-devtools" aria-hidden="true">#</a> 3.<strong>10 spring-boot-devtools</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u8DDFSpringBoot\u7684\u70ED\u90E8\u7F72\u6709\u5173\uFF0C\u5373\u4FEE\u6539\u4EE3\u7801\u540E\u65E0\u9700\u91CD\u542F\u5E94\u7528\u5373\u751F\u6548\u3002</p><h4 id="_3-11-spring-boot-docs" tabindex="-1"><a class="header-anchor" href="#_3-11-spring-boot-docs" aria-hidden="true">#</a> 3.<strong>11 spring-boot-docs</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u5E94\u8BE5\u662F\u8DDF\u6587\u6863\u76F8\u5173\u7684\u6A21\u5757\u3002</p><h4 id="_3-12-spring-boot-properties-migrator" tabindex="-1"><a class="header-anchor" href="#_3-12-spring-boot-properties-migrator" aria-hidden="true">#</a> <strong>3.12 spring-boot-properties-migrator</strong></h4><p>\u770B\u5230 migrator \u8FD9\u4E2A\u5355\u8BCD\uFF0C\u4F30\u8BA1\u5C31\u662F\u8DDF\u9879\u76EE\u8FC1\u79FB\u6709\u5173\uFF0C\u6CA1\u6709\u53BB\u7EC6 \u7A76\u3002</p><h4 id="_3-13-spring-boot-test-autoconfigure" tabindex="-1"><a class="header-anchor" href="#_3-13-spring-boot-test-autoconfigure" aria-hidden="true">#</a> <strong>3.13 spring-boot-test-autoconfigure</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u4E00\u770B\u5C31\u662F\u8DDFSpringBoot\u7684\u6D4B\u8BD5\u7684\u81EA\u52A8\u914D\u7F6E\u6709\u5173\u3002</p><h4 id="_3-14-spring-boot-tools" tabindex="-1"><a class="header-anchor" href="#_3-14-spring-boot-tools" aria-hidden="true">#</a> <strong>3.14 spring-boot-tools</strong></h4><p>\u8FD9\u4E2A\u6A21\u5757\u4E00\u770B\u5C31\u662FSpringBoot\u7684\u5DE5\u5177\u76F8\u5173\u7684\u6A21\u5757\uFF0C\u63D0\u4F9B\u4E86\u52A0\u8F7D\uFF0Cmaven\u63D2\u4EF6,metadata\u548C\u540E\u7F6E\u5904\u7406\u76F8\u5173\u7684\u652F\u6301\u3002</p><p>\u4E0A\u9762\u4ECB\u7ECD\u4E86\u8FD9\u4E48\u591Aspring-boot\u6A21\u5757\u4E0B\u7684\u5B50\u6A21\u5757\uFF0C\u4E0D\u7528\u614C\uFF0C\u6211\u4EEC\u8981\u8FDB\u884C\u89E3\u8BFB\u7684\u6A21\u5757\u4E0D\u591A\uFF0C\u6211\u4EEC\u771F\u6B63\u8981\u770B\u7684\u6A21\u5757\u6709<code>spring-boot</code>\uFF0C<code>spring-boot-autoconfigure</code>\uFF0C<code>spring-boot-starters</code>\u548C<code>spring-boot-actuator</code>\u6A21\u5757\u3002</p><h2 id="_4-\u601D\u7EF4\u5BFC\u56FE" tabindex="-1"><a class="header-anchor" href="#_4-\u601D\u7EF4\u5BFC\u56FE" aria-hidden="true">#</a> 4. \u601D\u7EF4\u5BFC\u56FE</h2><p><strong>\u7528\u4E00\u4E2A\u601D\u7EF4\u5BFC\u56FE\u6765\u603B\u7ED3\u4E0BSpringBoot\u6E90\u7801\u9879\u76EE\u7684\u8109\u7EDC</strong></p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220331163705752.png" alt="image-20220331163705752"></p><h2 id="_5-springboot\u6A21\u5757\u4E4B\u95F4\u7684pom\u5173\u7CFB\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#_5-springboot\u6A21\u5757\u4E4B\u95F4\u7684pom\u5173\u7CFB\u8BE6\u89E3" aria-hidden="true">#</a> 5. <strong>SpringBoot\u6A21\u5757\u4E4B\u95F4\u7684pom\u5173\u7CFB\u8BE6\u89E3</strong></h2><p>\u524D\u9762\u5F04\u6E05\u695A\u4E86SpringBoot\u7684\u5404\u4E2A\u6A21\u5757\u7684\u5177\u4F53\u529F\u80FD\uFF0C\u6B64\u65F6\u6211\u4EEC\u6765\u770B\u4E0BSpringBoot\u6A21\u5757\u7684pom\u4E4B\u95F4\u7684\u5173\u7CFB\u662F\u600E\u6837\u7684\uFF0C\u56E0\u4E3A\u9879\u76EE\u662F\u901A\u8FC7maven\u6784\u5EFA\u7684\uFF0C\u56E0\u6B64\u8FD8\u662F\u6709\u5FC5\u8981\u53BB\u7814\u7A76\u4E0B\u8FD9\u5757\u5173\u7CFB\u6EF4\u3002</p><p>\u5148\u770BSpringBoot\u6E90\u7801\u9879\u76EE\u7684pom\u5173\u7CFB\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220331163745484.png" alt="image-20220331163745484"></p><p>\u6839\u636E\u4E0A\u56FE\u53EF\u5F97\u51FA\u4EE5\u4E0B\u7ED3\u8BBA\uFF1A</p><ul><li><code>spring-boot-build(pom.xml)</code>\u662F\u9879\u76EE\u7684\u6839pom\uFF0C\u5176\u5B50pom\u6709<code>spring-boot-project(pom.xml)</code>\u548C<code>spring-boot-dependencies(pom.xml)</code>\uFF1B</li><li><code>spring-boot-dependencies(pom.xml)</code>\u4E3B\u8981\u5B9A\u4E49\u4E86SpringBoot\u9879\u76EE\u7684\u5404\u79CD\u4F9D\u8D56\u53CA\u5176\u7248\u672C\uFF0C\u5176\u5B50pom\u6709<code>spring-boot-parent(pom.xml)</code>\u548C<code>spring-boot-starter-parent(pom.xml)</code>\uFF1B</li><li><code>spring-boot-project(pom.xml)</code>\u8D77\u5230\u805A\u5408module\u7684\u4F5C\u7528\uFF0C\u5176\u5B50\u6A21\u5757\u5E76\u4E0D\u7EE7\u627F\u4E8E\u5B83\uFF0C\u800C\u662F\u7EE7\u627F\u4E8E<code>spring-boot-parent(pom.xml)</code>\uFF1B</li><li><code>spring-boot-parent(pom.xml)</code>\u662F<code>spring-boot-project(pom.xml)</code>\u7684\u5B50module\uFF0C\u4F46\u7EE7\u627F\u7684\u7236pom\u4E3A<code>spring-boot-dependencies(pom.xml)</code>\uFF0C\u5176\u5B9A\u4E49\u4E86\u4E00\u4E9Bproperties\u7B49\u76F8\u5173\u7684\u4E1C\u897F\u3002\u5176\u5B50pom\u4E3A<code>spring-boot-project(pom.xml)</code>\u7684\u5B50module\uFF08\u6CE8\u610F\u9664\u53BB<code>spring-boot-dependencies(pom.xml)</code>\uFF09\uFF0C\u6BD4\u5982\u6709<code>spring-boot(pom.xml)</code>,<code>spring-boot-starters(pom.xml)</code>\u548C<code>spring-boot-actuator(pom.xml)</code>\u7B49\uFF1B</li><li><code>spring-boot-starters(pom.xml)</code>\u662F\u6240\u6709\u5177\u4F53\u8D77\u6B65\u4F9D\u8D56\u7684\u7236pom\uFF0C\u5176\u5B50pom\u6709<code>spring-boot-starter-data-jdbc(pom.xml)</code>\u548C<code>spring-boot-starter-data-redis(pom.xml)</code>\u7B49\u3002</li><li><code>spring-boot-starter-parent(pom.xml)</code>\uFF0C\u662F\u6211\u4EEC\u7684\u6240\u6709\u5177\u4F53SpringBoot\u9879\u76EE\u7684\u7236pom\uFF0C\u6BD4\u5982SpringBoot\u81EA\u5E26\u7684\u6837\u4F8B\u7684<code>spring-boot-samples(pom.xml)</code>\u662F\u7EE7\u627F\u4E8E\u5B83\u7684\u3002</li></ul><p>SpringBoot\u7684\u5404\u6A21\u5757\u4E4B\u95F4\u7684pom\u5173\u7CFB\u6709\u70B9\u590D\u6742\uFF0C\u786E\u5B9E\u6709\u70B9\u7ED5\uFF0C\u5982\u679C\u770B\u5B8C\u4E0A\u9762\u7684\u56FE\u7247\u548C\u89E3\u91CA\u8FD8\u662F\u4E0D\u592A\u6E05\u695A\u7684\u8BDD\uFF0C\u5EFA\u8BAE\u5C0F\u4F19\u4F34\u4EEC\u81EA\u5DF1\u6253\u5F00idea\u7684\u9879\u76EE\uFF0C\u9010\u4E2A\u53BB\u634B\u4E00\u4E0B\u3002\u603B\u4E4B\u8BB0\u5F97SpringBoot\u7684\u4E00\u4E9B\u7236pom\u65E0\u975E\u662F\u505A\u4E86\u4E00\u4E9B\u7248\u672C\u7BA1\u7406\uFF0C\u805A\u5408\u6A21\u5757\u4E4B\u95F4\u7684\u4E8B\u60C5\u3002</p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 30);
const _hoisted_69 = {
  href: "https://cloud.tencent.com/developer/article/1628785",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_70 = /* @__PURE__ */ createTextVNode("SpringBoot\u7684\u6A21\u5757\u53CA\u7ED3\u6784");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("blockquote", null, [
      createBaseVNode("p", null, [
        _hoisted_21,
        _hoisted_22,
        _hoisted_23,
        createBaseVNode("a", _hoisted_24, [
          _hoisted_25,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_26,
        _hoisted_27,
        _hoisted_28
      ])
    ]),
    _hoisted_29,
    createBaseVNode("p", null, [
      _hoisted_35,
      createBaseVNode("a", _hoisted_36, [
        _hoisted_37,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_38
    ]),
    _hoisted_39,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_69, [
        _hoisted_70,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var SpringBoot_______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SpringBoot\u7684\u6A21\u5757\u53CA\u7ED3\u6784.html.vue"]]);
export { SpringBoot_______html as default };
