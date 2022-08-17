import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode } from "./app.67269af0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="springboot\u5E94\u7528\u90E8\u7F72-\u4F7F\u7528\u7B2C\u4E09\u65B9jar\u5305" tabindex="-1"><a class="header-anchor" href="#springboot\u5E94\u7528\u90E8\u7F72-\u4F7F\u7528\u7B2C\u4E09\u65B9jar\u5305" aria-hidden="true">#</a> SpringBoot\u5E94\u7528\u90E8\u7F72-\u4F7F\u7528\u7B2C\u4E09\u65B9JAR\u5305</h1><blockquote><p>\u5728\u9879\u76EE\u4E2D\u6211\u4EEC\u7ECF\u5E38\u9700\u8981\u4F7F\u7528\u7B2C\u4E09\u65B9\u7684Jar\uFF0C\u6BD4\u5982\u67D0\u4E9BSDK\uFF0C<strong>\u8FD9\u4E9BSDK\u6CA1\u6709\u76F4\u63A5\u53D1\u5E03\u5230\u516C\u5F00\u7684maven\u4ED3\u5E93\u4E2D</strong>\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u5982\u4F55\u4F7F\u7528\u8FD9\u4E9B\u4E09\u65B9JAR\u5462\uFF1F\u672C\u6587\u63D0\u4F9B\u6700\u5E38\u7528\u7684\u4E24\u79CD\u65B9\u5F0F\u3002</p></blockquote><h2 id="\u65B9\u6848\u4E00-\u5B89\u88C5\u5230maven\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848\u4E00-\u5B89\u88C5\u5230maven\u4ED3\u5E93" aria-hidden="true">#</a> \u65B9\u6848\u4E00\uFF1A\u5B89\u88C5\u5230Maven\u4ED3\u5E93</h2><blockquote><p>\u5982\u679C\u6709\u9879\u76EE\u7684Maven\u4ED3\u5E93\uFF0C\u5219\u63A8\u8350\u6309\u7167\u5230\u7684Maven\u4ED3\u5E93\uFF08\u6BD4\u5982\u79C1\u670D\uFF09\u4E2D\u3002\uFF08\u6700\u597D\u4E0D\u662F\u672C\u5730\u7684Maven\u4ED3\u5E93\uFF0C\u56E0\u4E3A\u8FD8\u6709CI\u73AF\u5883\u9700\u8981\u96C6\u6210\u3002\uFF09</p></blockquote><p>\u914D\u7F6EMaven\u79C1\u670D, server &amp; profile</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token comment">&lt;!-- server --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>pdai<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>passw0rd<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>\n<span class="token comment">&lt;!-- profile --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>pdai-artifactory<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repositories</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>xxx.xxx.xxx.xxx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>releases</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>releases</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshots</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshots</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repositories</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># -X\uFF1A\u8BE6\u7EC6\u4FE1\u606F\u8F93\u51FA\u7528\u4E8E\u8C03\u8BD5</span>\n<span class="token comment"># -Dfile\uFF1A\u672C\u5730jar\u8DEF\u5F84</span>\n<span class="token comment"># gav: group, artifactId, verson</span>\n<span class="token comment"># -Durl\uFF1A\u4ED3\u5E93\u5730\u5740</span>\n<span class="token comment"># -DrepositoryId\uFF1Asettings\u6587\u4EF6\u4E2D\u7684ID</span>\nmvn -X deploy:deploy-file -DgroupId<span class="token operator">=</span>tech.pdai -DartifactId<span class="token operator">=</span>test-xxx -Dversion<span class="token operator">=</span><span class="token number">1.1</span>.0 -Dpackaging<span class="token operator">=</span>jar -Dfile<span class="token operator">=</span>/xxxx/xxx.jar -Durl<span class="token operator">=</span>http://nexus.pdai.tech/repository/releases/ -DrepositoryId<span class="token operator">=</span>nexus\n\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u65B9\u6848\u4E8C-\u4F7F\u7528systempath\u5C5E\u6027" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848\u4E8C-\u4F7F\u7528systempath\u5C5E\u6027" aria-hidden="true">#</a> \u65B9\u6848\u4E8C\uFF1A\u4F7F\u7528systemPath\u5C5E\u6027</h2><blockquote><p>\u5982\u679CJar\u65E0\u6CD5\u653E\u5230maven\u4ED3\u5E93\uFF0C\u5373\u653E\u5728\u9879\u76EE\u4EE3\u7801\u4E2D\uFF0C\u6BD4\u5982\u9879\u76EE\u4E2Dlibs\u6587\u4EF6\u5939\u4E2D</p></blockquote><p>\u4F7F\u7528systemPath\u5C5E\u6027\uFF0C<code>&lt;scope&gt;system&lt;/scope&gt;</code>, \u5176\u5B83<strong>gav\u4E09\u5143\u7EC4\u662F\u53EF\u4EE5\u968F\u610F\u586B\u5199\u7684</strong>\u3002</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.aliyun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>taobao-sdk-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>system<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>systemPath</span><span class="token punctuation">&gt;</span></span>${project.basedir}/libs/taobao-sdk-java-auto_1479188381469-20180831.jar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>systemPath</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>SpringBoot JAR\u6253\u5305</strong></li></ul><p>springboot\u5728\u6253\u5305\u7684\u65F6\u5019\uFF0C\u8C03\u7528spring-boot-maven-plugin\uFF0C\u6267\u884Crepackage\u628Atomcat\u548Cresource\uFF0Clib\u7B49\u5408\u6210\u4E00\u4E2A\u65B0\u7684jar\u3002\u60F3\u8981\u5C06\u7CFB\u7EDFjar\u6253\u8FDB\u53BB\uFF0C\u5FC5\u987B\u914D\u7F6EincludeSystemScope\u3002\u6700\u7EC8\u4F1A\u5C06lib\u653E\u5165BOOT-INF\\lib</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includeSystemScope</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includeSystemScope</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>executions</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>execution</span><span class="token punctuation">&gt;</span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goals</span><span class="token punctuation">&gt;</span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>build-info<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>goal</span><span class="token punctuation">&gt;</span></span>repackage<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goal</span><span class="token punctuation">&gt;</span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>goals</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>execution</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>executions</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>SpringBoot War\u6253\u5305</strong></li></ul><p>\u4F7F\u7528mvn clean package\u547D\u4EE4\u6253\u5305\u65F6\u9700\u8981\u5728pom\u6587\u4EF6\u52A0\u5165\u4EE5\u4E0BwebResources\u914D\u7F6E\uFF0C\u5E76\u8BBE\u7F6Ejar\u5305\u5728WEB-INF/lib\u76EE\u5F55\u4E0B</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-war-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>webResources</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resource</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>directory</span><span class="token punctuation">&gt;</span></span>src/main/resources/libs/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>directory</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>targetPath</span><span class="token punctuation">&gt;</span></span>WEB-INF/lib/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>targetPath</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>includes</span><span class="token punctuation">&gt;</span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>include</span><span class="token punctuation">&gt;</span></span>**/*.jar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>include</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>includes</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resource</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>webResources</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>\n\n  \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 18);
const _hoisted_19 = {
  href: "https://pdai.tech/md/spring/springboot/springboot-x-deploy-jar-3rd.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("strong", null, "SpringBoot\u5E94\u7528\u90E8\u7F72 - \u4F7F\u7528\u7B2C\u4E09\u65B9JAR\u5305", -1);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_19, [
        _hoisted_20,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var SpringBoot__________JAR__html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SpringBoot\u5E94\u7528\u90E8\u7F72-\u4F7F\u7528\u7B2C\u4E09\u65B9JAR\u5305.html.vue"]]);
export { SpringBoot__________JAR__html as default };
