import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, d as createTextVNode, e as createStaticVNode } from "./app.9ef7ce43.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "centos\u5B89\u88C5docker",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#centos\u5B89\u88C5docker",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" Centos\u5B89\u88C5Docker")
], -1);
const _hoisted_2 = {
  href: "https://docs.docker.com/install/linux/docker-ce/centos/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_3 = /* @__PURE__ */ createTextVNode("Docker\u5B98\u65B9\u6587\u6863\u5B89\u88C5\u6559\u7A0B");
const _hoisted_4 = {
  href: "https://docs.docker.com/compose/install/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_5 = /* @__PURE__ */ createTextVNode("Docker Compose\u5B98\u65B9\u6587\u6863\u5B89\u88C5\u6559\u7A0B");
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<h2 id="_1-\u5B89\u88C5\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5\u6B65\u9AA4" aria-hidden="true">#</a> 1. \u5B89\u88C5\u6B65\u9AA4</h2><h3 id="_1-1-\u5378\u8F7D\u65E7\u7248\u672Cdocker-\u5982\u679C\u7CFB\u7EDF\u4E4B\u524D\u6CA1\u5B89\u88C5\u8FC7docker-\u53EF\u4EE5\u8DF3\u8FC7" tabindex="-1"><a class="header-anchor" href="#_1-1-\u5378\u8F7D\u65E7\u7248\u672Cdocker-\u5982\u679C\u7CFB\u7EDF\u4E4B\u524D\u6CA1\u5B89\u88C5\u8FC7docker-\u53EF\u4EE5\u8DF3\u8FC7" aria-hidden="true">#</a> 1.1 \u5378\u8F7D\u65E7\u7248\u672CDocker\uFF08\u5982\u679C\u7CFB\u7EDF\u4E4B\u524D\u6CA1\u5B89\u88C5\u8FC7Docker\uFF0C\u53EF\u4EE5\u8DF3\u8FC7\uFF09</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yum remove docker \\\n                  docker-client \\\n                  docker-client-latest \\\n                  docker-common \\\n                  docker-latest \\\n                  docker-latest-logrotate \\\n                  docker-logrotate \\\n                  docker-engine\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-\u5B89\u88C5docker\u6240\u9700\u8981\u7684\u5305" tabindex="-1"><a class="header-anchor" href="#_1-2-\u5B89\u88C5docker\u6240\u9700\u8981\u7684\u5305" aria-hidden="true">#</a> 1.2 \u5B89\u88C5Docker\u6240\u9700\u8981\u7684\u5305</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> -y yum-utils <span class="token punctuation">\\</span>\n  device-mapper-persistent-data <span class="token punctuation">\\</span>\n  lvm2\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-\u8BBE\u7F6E\u7A33\u5B9A\u7684\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#_1-3-\u8BBE\u7F6E\u7A33\u5B9A\u7684\u4ED3\u5E93" aria-hidden="true">#</a> 1.3 \u8BBE\u7F6E\u7A33\u5B9A\u7684\u4ED3\u5E93</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yum-config-manager \\\n    --add-repo \\\n    https://download.docker.com/linux/centos/docker-ce.repo\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-\u5B89\u88C5\u6700\u65B0\u7248\u7684docker\u5F15\u64CE" tabindex="-1"><a class="header-anchor" href="#_1-4-\u5B89\u88C5\u6700\u65B0\u7248\u7684docker\u5F15\u64CE" aria-hidden="true">#</a> 1.4 \u5B89\u88C5\u6700\u65B0\u7248\u7684Docker\u5F15\u64CE</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yum install docker-ce docker-ce-cli containerd.io\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-5-\u542F\u52A8docker" tabindex="-1"><a class="header-anchor" href="#_1-5-\u542F\u52A8docker" aria-hidden="true">#</a> 1.5 \u542F\u52A8Docker</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl start docker\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u662F\u5426\u5B89\u88C5\u6210\u529F\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200126212039986.png" alt="image-20200126212039986"></p><h2 id="_2-\u5B89\u88C5docker-compose" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5docker-compose" aria-hidden="true">#</a> 2 \u5B89\u88C5Docker Compose</h2><h3 id="_2-1-\u83B7\u53D6docker-compose\u7684\u6700\u65B0\u7A33\u5B9A\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#_2-1-\u83B7\u53D6docker-compose\u7684\u6700\u65B0\u7A33\u5B9A\u7248\u672C" aria-hidden="true">#</a> 2.1 \u83B7\u53D6Docker Compose\u7684\u6700\u65B0\u7A33\u5B9A\u7248\u672C\uFF1A</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -L &quot;https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-\u5BF9\u4E8C\u8FDB\u5236\u6587\u4EF6\u6388\u4E88\u53EF\u6267\u884C\u6743\u9650" tabindex="-1"><a class="header-anchor" href="#_2-2-\u5BF9\u4E8C\u8FDB\u5236\u6587\u4EF6\u6388\u4E88\u53EF\u6267\u884C\u6743\u9650" aria-hidden="true">#</a> 2.2 \u5BF9\u4E8C\u8FDB\u5236\u6587\u4EF6\u6388\u4E88\u53EF\u6267\u884C\u6743\u9650</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chmod +x /usr/local/bin/docker-compose\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-\u521B\u5EFAlink" tabindex="-1"><a class="header-anchor" href="#_2-3-\u521B\u5EFAlink" aria-hidden="true">#</a> 2.3 \u521B\u5EFAlink\uFF1A</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4-\u67E5\u770B\u662F\u5426\u5B89\u88C5\u6210\u529F" tabindex="-1"><a class="header-anchor" href="#_2-4-\u67E5\u770B\u662F\u5426\u5B89\u88C5\u6210\u529F" aria-hidden="true">#</a> 2.4 \u67E5\u770B\u662F\u5426\u5B89\u88C5\u6210\u529F\uFF1A</h3><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200126212141426.png" alt="image-20200126212141426"></p>', 22);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_2, [
        _hoisted_3,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_4, [
        _hoisted_5,
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_6
  ]);
}
var Centos__Docker_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Centos\u5B89\u88C5Docker.html.vue"]]);
export { Centos__Docker_html as default };
