import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, d as createTextVNode, e as createStaticVNode } from "./app.4f078ea0.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", {
  id: "android\u8C03\u7528js\u65B9\u6CD5",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#android\u8C03\u7528js\u65B9\u6CD5",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" Android\u8C03\u7528js\u65B9\u6CD5")
], -1);
const _hoisted_2 = /* @__PURE__ */ createTextVNode("\u672C\u6587\u53C2\u8003");
const _hoisted_3 = {
  href: "https://www.jianshu.com/p/345f4d8a5cfa",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_4 = /* @__PURE__ */ createTextVNode("\u535A\u5BA2\u539F\u6587");
const _hoisted_5 = /* @__PURE__ */ createTextVNode("\u6574\u7406\uFF0C\u5E76\u5BF9\u4ED6\u8FDB\u884C\u8865\u5145\u6269\u5C55\uFF0C\u5E76\u5BF9\u539F\u6587\u6DF1\u8868\u611F\u8C22\u3002");
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<p>\u5BF9\u4E8EAndroid\u8C03\u7528JS\u4EE3\u7801\u7684\u65B9\u6CD5\u67092\u79CD\uFF1A</p><ol><li>\u901A\u8FC7<code>WebView</code>\u7684<code>loadUrl\uFF08\uFF09</code></li><li>\u901A\u8FC7<code>WebView</code>\u7684<code>evaluateJavascript\uFF08\uFF09</code></li></ol><p>##\u65B9\u5F0F1\uFF1A\u901A\u8FC7<code>WebView</code>\u7684<code>loadUrl\uFF08\uFF09</code></p><p><strong>\u6B65\u9AA41\uFF1A\u5C06\u9700\u8981\u8C03\u7528\u7684JS\u4EE3\u7801\u4EE5.html\u683C\u5F0F\u653E\u5230src/main/assets\u6587\u4EF6\u5939\u91CC</strong></p><p><em>\u9700\u8981\u52A0\u8F7DJS\u4EE3\u7801\uFF1Ajavascript.html</em></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u6587\u672C\u540D\uFF1Ajavascript\n&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n\n   &lt;head&gt;\n      &lt;meta charset=&quot;utf-8&quot;&gt;\n      &lt;title&gt;Carson_Ho&lt;/title&gt;\n      \n// JS\u4EE3\u7801\n     &lt;script&gt;\n// Android\u9700\u8981\u8C03\u7528\u7684\u65B9\u6CD5\n   function callJS(){\n      alert(&quot;Android\u8C03\u7528\u4E86JS\u7684callJS\u65B9\u6CD5&quot;);\n   }\n&lt;/script&gt;\n\n   &lt;/head&gt;\n\n&lt;/html&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6B65\u9AA42\uFF1A\u5728Android\u91CC\u901A\u8FC7WebView\u8BBE\u7F6E\u8C03\u7528JS\u4EE3\u7801</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {\n\n    WebView mWebView;\n    Button button;\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_main);\n\n        mWebView =(WebView) findViewById(R.id.webview);\n\n        WebSettings webSettings = mWebView.getSettings();\n\n        // \u8BBE\u7F6E\u4E0EJs\u4EA4\u4E92\u7684\u6743\u9650\n        webSettings.setJavaScriptEnabled(true);\n        // \u8BBE\u7F6E\u5141\u8BB8JS\u5F39\u7A97\n        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);\n\n        // \u5148\u8F7D\u5165JS\u4EE3\u7801\n        // \u683C\u5F0F\u89C4\u5B9A\u4E3A:file:///android_asset/\u6587\u4EF6\u540D.html\n        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);\n\n        button = (Button) findViewById(R.id.button);\n\n\n        button.setOnClickListener(new View.OnClickListener() {\n            @Override\n            public void onClick(View v) {\n                // \u901A\u8FC7Handler\u53D1\u9001\u6D88\u606F\n                mWebView.post(new Runnable() {\n                    @Override\n                    public void run() {\n\n                        // \u6CE8\u610F\u8C03\u7528\u7684JS\u65B9\u6CD5\u540D\u8981\u5BF9\u5E94\u4E0A\n                        // \u8C03\u7528javascript\u7684callJS()\u65B9\u6CD5\n                        mWebView.loadUrl(&quot;javascript:callJS()&quot;);\n                    }\n                });\n                \n            }\n        });\n\n        // \u7531\u4E8E\u8BBE\u7F6E\u4E86\u5F39\u7A97\u68C0\u9A8C\u8C03\u7528\u7ED3\u679C,\u6240\u4EE5\u9700\u8981\u652F\u6301js\u5BF9\u8BDD\u6846\n        // webview\u53EA\u662F\u8F7D\u4F53\uFF0C\u5185\u5BB9\u7684\u6E32\u67D3\u9700\u8981\u4F7F\u7528webviewChromClient\u7C7B\u53BB\u5B9E\u73B0\n        // \u901A\u8FC7\u8BBE\u7F6EWebChromeClient\u5BF9\u8C61\u5904\u7406JavaScript\u7684\u5BF9\u8BDD\u6846\n        //\u8BBE\u7F6E\u54CD\u5E94js \u7684Alert()\u51FD\u6570\n        mWebView.setWebChromeClient(new WebChromeClient() {\n            @Override\n            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {\n                AlertDialog.Builder b = new AlertDialog.Builder(MainActivity.this);\n                b.setTitle(&quot;Alert&quot;);\n                b.setMessage(message);\n                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {\n                    @Override\n                    public void onClick(DialogInterface dialog, int which) {\n                        result.confirm();\n                    }\n                });\n                b.setCancelable(false);\n                b.create().show();\n                return true;\n            }\n\n        });\n\n\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-826d0aa065f70cb1.png" alt="\u6548\u679C\u5982\u56FE\u6240\u793A"></p><p><strong>\u7279\u522B\u6CE8\u610F\uFF1AJS\u4EE3\u7801\u8C03\u7528\u4E00\u5B9A\u8981\u5728 onPageFinished\uFF08\uFF09 \u56DE\u8C03\u4E4B\u540E\u624D\u80FD\u8C03\u7528\uFF0C\u5426\u5219\u4E0D\u4F1A\u8C03\u7528\u3002</strong></p><blockquote><p><code>onPageFinished()</code>\u5C5E\u4E8EWebViewClient\u7C7B\u7684\u65B9\u6CD5\uFF0C\u4E3B\u8981\u5728\u9875\u9762\u52A0\u8F7D\u7ED3\u675F\u65F6\u8C03\u7528</p></blockquote><p>##\u65B9\u5F0F2\uFF1A\u901A\u8FC7<code>WebView</code>\u7684<code>evaluateJavascript\uFF08\uFF09</code></p><ul><li>\u4F18\u70B9\uFF1A\u8BE5\u65B9\u6CD5\u6BD4\u7B2C\u4E00\u79CD\u65B9\u6CD5\u6548\u7387\u66F4\u9AD8\u3001\u4F7F\u7528\u66F4\u7B80\u6D01\u3002</li></ul><blockquote><ol><li>\u56E0\u4E3A\u8BE5\u65B9\u6CD5\u7684\u6267\u884C\u4E0D\u4F1A\u4F7F\u9875\u9762\u5237\u65B0\uFF0C\u800C\u7B2C\u4E00\u79CD\u65B9\u6CD5\uFF08loadUrl \uFF09\u7684\u6267\u884C\u5219\u4F1A\u3002</li><li>Android 4.4 \u540E\u624D\u53EF\u4F7F\u7528</li></ol></blockquote><ul><li>\u5177\u4F53\u4F7F\u7528</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u53EA\u9700\u8981\u5C06\u7B2C\u4E00\u79CD\u65B9\u6CD5\u7684loadUrl()\u6362\u6210\u4E0B\u9762\u8BE5\u65B9\u6CD5\u5373\u53EF\n    mWebView.evaluateJavascript\uFF08&quot;javascript:callJS()&quot;, new ValueCallback&lt;String&gt;() {\n        @Override\n        public void onReceiveValue(String value) {\n            //\u6B64\u5904\u4E3A js \u8FD4\u56DE\u7684\u7ED3\u679C\n        }\n    });\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u65B9\u6CD5\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u5BF9\u6BD4" aria-hidden="true">#</a> \u65B9\u6CD5\u5BF9\u6BD4</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-30f095d4c9e638fd.png" alt="\u65B9\u6CD5\u5BF9\u6BD4"></p><h2 id="\u4F7F\u7528\u5EFA\u8BAE" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u5EFA\u8BAE" aria-hidden="true">#</a> \u4F7F\u7528\u5EFA\u8BAE</h2><p>\u4E24\u79CD\u65B9\u6CD5\u6DF7\u5408\u4F7F\u7528\uFF0C\u5373Android 4.4\u4EE5\u4E0B\u4F7F\u7528\u65B9\u6CD51\uFF0CAndroid 4.4\u4EE5\u4E0A\u65B9\u6CD52</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Android\u7248\u672C\u53D8\u91CF\nfinal int version = Build.VERSION.SDK_INT;\n// \u56E0\u4E3A\u8BE5\u65B9\u6CD5\u5728 Android 4.4 \u7248\u672C\u624D\u53EF\u4F7F\u7528\uFF0C\u6240\u4EE5\u4F7F\u7528\u65F6\u9700\u8FDB\u884C\u7248\u672C\u5224\u65AD\nif (version &lt; 18) {\n    mWebView.loadUrl(&quot;javascript:callJS()&quot;);\n} else {\n    mWebView.evaluateJavascript\uFF08&quot;javascript:callJS()&quot;, new ValueCallback&lt;String&gt;() {\n        @Override\n        public void onReceiveValue(String value) {\n            //\u6B64\u5904\u4E3A js \u8FD4\u56DE\u7684\u7ED3\u679C\n        }\n    });\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 21);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_2,
      createBaseVNode("a", _hoisted_3, [
        _hoisted_4,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_5
    ]),
    _hoisted_6
  ]);
}
var Android_WebViewAndroid__js___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Android\u7684WebView-Android\u8C03\u7528js\u65B9\u6CD5.html.vue"]]);
export { Android_WebViewAndroid__js___html as default };
