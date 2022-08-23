import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u5B89\u88C5ftp\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5ftp\u670D\u52A1" aria-hidden="true">#</a> \u5B89\u88C5FTP\u670D\u52A1</h1><h2 id="_1-\u5B89\u88C5vsftpd" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5vsftpd" aria-hidden="true">#</a> 1.\u5B89\u88C5vsftpd</h2><p>\u5B89\u88C5\u524D\u5148\u67E5\u770Bftp \u662F\u5426\u5DF2\u7ECF\u5B89\u88C5\uFF0C\u4F7F\u7528yum \u5B89\u88C5</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>vsftpd -v\nyum -y install vsftpd\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 2. \u4FEE\u6539\u914D\u7F6E\u6587\u4EF6</h2><p>\u6839\u636E\u81EA\u5DF1\u7684\u9700\u6C42\uFF0C\u4FEE\u6539ftp\u914D\u7F6E\u6587\u4EF6<code>/etc/vsftpd/vsftpd.conf</code></p><div class="language-objectivec ext-objectivec line-numbers-mode"><pre class="language-objectivec"><code>anonymous_enable<span class="token operator">=</span>NO    # \u662F\u5426\u5141\u8BB8\u533F\u540D\u8BBF\u95EE\nlocal_enable<span class="token operator">=</span>YES      # \u662F\u5426\u5141\u8BB8\u4F7F\u7528\u672C\u5730\u5E10\u6237\u8FDB\u884C FTP \u7528\u6237\u767B\u5F55\u9A8C\u8BC1\nlocal_umask<span class="token operator">=</span><span class="token number">022</span>      # \u8BBE\u7F6E\u672C\u5730\u7528\u6237\u9ED8\u8BA4\u6587\u4EF6\u63A9\u7801<span class="token number">022</span>\nchroot_local_user<span class="token operator">=</span>YES   # \u662F\u5426\u9650\u5B9A\u7528\u6237\u5728\u5176\u4E3B\u76EE\u5F55\u4E0B\uFF08NO \u8868\u793A\u5141\u8BB8\u5207\u6362\u5230\u4E0A\u7EA7\u76EE\u5F55\uFF09\n<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">chroot</span><span class="token expression">_list_enable<span class="token operator">=</span>YES # \u662F\u5426\u542F\u7528\u9650\u5236\u7528\u6237\u7684\u540D\u5355\uFF08\u6CE8\u91CA\u6389\u4E3A\u7981\u7528\uFF09</span></span>\nchroot_list_file<span class="token operator">=</span><span class="token operator">/</span>etc<span class="token operator">/</span>vsftpd<span class="token operator">/</span>chroot_list # \u7528\u6237\u5217\u8868\u6587\u4EF6\uFF08\u4E00\u884C\u4E00\u4E2A\u7528\u6237\uFF09\nallow_writeable_chroot<span class="token operator">=</span>YES # \u5982\u679C\u542F\u7528\u4E86\u9650\u5B9A\u7528\u6237\u5728\u5176\u4E3B\u76EE\u5F55\u4E0B\u9700\u8981\u6DFB\u52A0\u8FD9\u4E2A\u914D\u7F6E\uFF0C\u89E3\u51B3\u62A5\u9519 <span class="token number">500</span> OOPS<span class="token punctuation">:</span> vsftpd<span class="token punctuation">:</span> refusing to run with writable root inside <span class="token function">chroot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\nxferlog_enable<span class="token operator">=</span>YES     # \u542F\u7528\u4E0A\u4F20\u548C\u4E0B\u8F7D\u7684\u65E5\u5FD7\u529F\u80FD\uFF0C\u9ED8\u8BA4\u5F00\u542F\u3002\nuse_localtime<span class="token operator">=</span>YES     # \u662F\u5426\u4F7F\u7528\u672C\u5730\u65F6<span class="token punctuation">(</span>\u81EA\u884C\u6DFB\u52A0<span class="token punctuation">)</span>\nuserlist_enable<span class="token operator">=</span>YES \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>chroot_local_user \u4E0E chroot_list_enable \u7684\u7EC4\u5408\u6548\u679C\u5982\u4E0B\uFF1A</p><table><thead><tr><th></th><th>chroot_local_user=YES</th><th>chroot_local_user=NO</th></tr></thead><tbody><tr><td>chroot_list_enable=YES</td><td>1. \u6240\u6709\u7528\u6237\u90FD\u88AB\u9650\u5236\u5728\u5176\u4E3B\u76EE\u5F55\u4E0B 2. \u4F7F\u7528 chroot_list_file \u6307\u5B9A\u7684\u7528\u6237\u5217\u8868\uFF0C\u8FD9\u4E9B\u7528\u6237\u4F5C\u4E3A\u201C\u4F8B\u5916\u201D\uFF0C\u4E0D\u53D7\u9650\u5236</td><td>1. \u6240\u6709\u7528\u6237\u90FD\u4E0D\u88AB\u9650\u5236\u5176\u4E3B\u76EE\u5F55\u4E0B 2. \u4F7F\u7528 chroot_list_file \u6307\u5B9A\u7684\u7528\u6237\u5217\u8868\uFF0C\u8FD9\u4E9B\u7528\u6237\u4F5C\u4E3A\u201C\u4F8B\u5916\u201D\uFF0C\u53D7\u5230\u9650\u5236</td></tr><tr><td>chroot_list_enable=NO</td><td>1. \u6240\u6709\u7528\u6237\u90FD\u88AB\u9650\u5236\u5728\u5176\u4E3B\u76EE\u5F55\u4E0B 2. \u4E0D\u4F7F\u7528 chroot_list_file \u6307\u5B9A\u7684\u7528\u6237\u5217\u8868\uFF0C\u6CA1\u6709\u4EFB\u4F55\u201C\u4F8B\u5916\u201D\u7528\u6237</td><td>1. \u6240\u6709\u7528\u6237\u90FD\u4E0D\u88AB\u9650\u5236\u5176\u4E3B\u76EE\u5F55\u4E0B 2. \u4E0D\u4F7F\u7528 chroot_list_file \u6307\u5B9A\u7684\u7528\u6237\u5217\u8868\uFF0C\u6CA1\u6709\u4EFB\u4F55\u201C\u4F8B\u5916\u201D\u7528\u6237</td></tr></tbody></table><blockquote><p>\u6CE8\u610F\uFF1A\u5982\u679C\u8BBE\u7F6E\u4E86 local_enable=YES \uFF0C\u81EA\u5E26</p></blockquote><h2 id="_3-\u542F\u52A8ftp\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_3-\u542F\u52A8ftp\u670D\u52A1" aria-hidden="true">#</a> 3. \u542F\u52A8ftp\u670D\u52A1</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl start vsftpd\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-\u7528\u6237\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#_4-\u7528\u6237\u7BA1\u7406" aria-hidden="true">#</a> 4. \u7528\u6237\u7BA1\u7406</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># \u4F7F\u7528useradd \u547D\u4EE4\u6DFB\u52A0\u4E00\u4E2A\u7528\u6237\nuseradd ftpuser\n# \u8BBE\u7F6E\u7528\u6237\u5BC6\u7801\npasswd ftpuser\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-\u4E3B\u52A8\u6A21\u5F0F\u548C\u88AB\u52A8\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_5-\u4E3B\u52A8\u6A21\u5F0F\u548C\u88AB\u52A8\u6A21\u5F0F" aria-hidden="true">#</a> 5. \u4E3B\u52A8\u6A21\u5F0F\u548C\u88AB\u52A8\u6A21\u5F0F</h2>', 15);
const _hoisted_16 = /* @__PURE__ */ createTextVNode("ftp \u7684\u4E3B\u52A8\u6A21\u5F0F\uFF08Port \u6A21\u5F0F\uFF09\u4E0E\u88AB\u52A8\u6A21\u5F0F\uFF08PASV \u6A21\u5F0F\uFF09\u7684\u533A\u522B\uFF1A");
const _hoisted_17 = {
  href: "https://link.jianshu.com/?t=https%3A%2F%2Fwww.cnblogs.com%2Fxiaohh%2Fp%2F4789813.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_18 = /* @__PURE__ */ createTextVNode("https://www.cnblogs.com/xiaohh/p/4789813.html");
const _hoisted_19 = /* @__PURE__ */ createTextVNode(" \u672C\u6587\u63A8\u8350\u4F7F\u7528");
const _hoisted_20 = /* @__PURE__ */ createBaseVNode("strong", null, "\u88AB\u52A8\u6A21\u5F0F", -1);
const _hoisted_21 = /* @__PURE__ */ createTextVNode("\uFF0Cvsftp \u9ED8\u8BA4\u5373\u4E3A\u88AB\u52A8\u6A21\u5F0F");
const _hoisted_22 = /* @__PURE__ */ createStaticVNode('<ul><li>\u5F00\u542F\u88AB\u52A8\u6A21\u5F0F\uFF08PASV\uFF09</li></ul><p>\u5728 <code>/etc/vsftpd/vsftpd.conf</code> \u914D\u7F6E\u6587\u4EF6\u6DFB\u52A0\u5982\u4E0B\u914D\u7F6E</p><div class="language-objectivec ext-objectivec line-numbers-mode"><pre class="language-objectivec"><code>pasv_enable<span class="token operator">=</span>YES # \u662F\u5426\u5141\u8BB8\u6570\u636E\u4F20\u8F93\u65F6\u4F7F\u7528PASV\u6A21\u5F0F\uFF08\u9ED8\u8BA4\u503C\u4E3A YES\uFF09\npasv_min_port<span class="token operator">=</span>port port_number # PASV \u6A21\u5F0F\u4E0B\uFF0C\u6570\u636E\u4F20\u8F93\u4F7F\u7528\u7684\u7AEF\u53E3\u4E0B\u754C\uFF08<span class="token number">0</span> \u8868\u793A\u4EFB\u610F\u3002\u9ED8\u8BA4\u503C\u4E3A <span class="token number">0</span>\uFF09\u628A\u7AEF\u53E3\u8303\u56F4\u8BBE\u5728\u6BD4\u8F83\u9AD8\u7684\u4E00\u6BB5\u8303\u56F4\u5185\uFF0C\u6BD4\u5982 <span class="token number">50000</span><span class="token operator">-</span><span class="token number">60000</span>\uFF0C\u5C06\u6709\u52A9\u4E8E\u5B89\u5168\u6027\u7684\u63D0\u9AD8<span class="token punctuation">.</span>\npasv_max_port<span class="token operator">=</span>port_number # PASV \u6A21\u5F0F\u4E0B\uFF0C\u6570\u636E\u4F20\u8F93\u4F7F\u7528\u7684\u7AEF\u53E3\u4E0A\u754C\uFF08<span class="token number">0</span> \u8868\u793A\u4EFB\u610F\u3002\u9ED8\u8BA4\u503C\u4E3A <span class="token number">0</span>\uFF09\npasv_promiscuous<span class="token operator">=</span>NO # \u662F\u5426\u5C4F\u853D\u5BF9 PASV \u8FDB\u884C\u5B89\u5168\u68C0\u67E5\uFF0C\u9ED8\u8BA4\u503C\u4E3A NO\uFF08\u5F53\u6709\u5B89\u5168\u96A7\u9053\u65F6\u53EF\u7981\u7528\uFF09\npasv_address # PASV \u6A21\u5F0F\u4E2D\u670D\u52A1\u5668\u4F20\u56DE\u7684 ip \u5730\u5740\u3002\u9ED8\u8BA4\u503C\u4E3A none\uFF0C\u5373\u5730\u5740\u662F\u4ECE\u547C\u5165\u7684\u8FDE\u63A5\u5957\u63A5\u5B57\u4E2D\u83B7\u53D6\u3002\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5F00\u542F\u4E3B\u52A8\u6A21\u5F0F\uFF08PORT\uFF09\u7684\u914D\u7F6E</li></ul><div class="language-objectivec ext-objectivec line-numbers-mode"><pre class="language-objectivec"><code>port_enable<span class="token operator">=</span>YES  # \u662F\u5426\u5F00\u542F Port \u6A21\u5F0F\nconnect_from_port_20<span class="token operator">=</span>YES # \u5F53 Port \u6A21\u5F0F\u5F00\u542F\u7684\u65F6\u5019\uFF0C\u662F\u5426\u542F\u7528\u9ED8\u8BA4\u7684 <span class="token number">20</span> \u7AEF\u53E3\u76D1\u542C\nftp_data_port<span class="token operator">=</span>port_number # Port \u6A21\u5F0F\u4E0B FTP \u6570\u636E\u4F20\u8F93\u6240\u4F7F\u7528\u7684\u7AEF\u53E3\uFF0C\u9ED8\u8BA4\u503C\u4E3A<span class="token number">20</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h3>', 6);
const _hoisted_28 = {
  href: "https://www.jianshu.com/p/05dc6455b513",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_29 = /* @__PURE__ */ createTextVNode("CentOS 7 \u5B89\u88C5 FTP \u670D\u52A1");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_16,
      createBaseVNode("a", _hoisted_17, [
        _hoisted_18,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_19,
      _hoisted_20,
      _hoisted_21
    ]),
    _hoisted_22,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_28, [
        _hoisted_29,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var __FTP___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u5B89\u88C5FTP\u670D\u52A1.html.vue"]]);
export { __FTP___html as default };
