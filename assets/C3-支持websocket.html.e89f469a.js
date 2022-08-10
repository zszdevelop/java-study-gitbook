import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.5c933372.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u652F\u6301websocket" tabindex="-1"><a class="header-anchor" href="#\u652F\u6301websocket" aria-hidden="true">#</a> \u652F\u6301websocket</h1><p>\u9700\u8981\u52A0\u4E0A</p><p>proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection &quot;upgrade&quot;;</p><p>\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> server {\n        listen       80;\n        server_name  gd.isture.com;\n\n        location / {\n            proxy_pass http://120.79.200.111:9705/;\n            proxy_read_timeout 300;\n            proxy_connect_timeout 300;\n\n             proxy_set_header Upgrade $http_upgrade;\n             proxy_set_header Connection &quot;upgrade&quot;;\n        }\n    }\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 5);
const _hoisted_6 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_6);
}
var C3___websocket_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C3-\u652F\u6301websocket.html.vue"]]);
export { C3___websocket_html as default };
