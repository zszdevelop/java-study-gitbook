import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as d,a as e,b as a,e as i,d as r,r as v}from"./app.d4563a68.js";const t={},c=e("h1",{id:"android\u8C03\u7528js\u65B9\u6CD5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#android\u8C03\u7528js\u65B9\u6CD5","aria-hidden":"true"},"#"),i(" Android\u8C03\u7528js\u65B9\u6CD5")],-1),u=i("\u672C\u6587\u53C2\u8003"),o={href:"https://www.jianshu.com/p/345f4d8a5cfa",target:"_blank",rel:"noopener noreferrer"},b=i("\u535A\u5BA2\u539F\u6587"),m=i("\u6574\u7406\uFF0C\u5E76\u5BF9\u4ED6\u8FDB\u884C\u8865\u5145\u6269\u5C55\uFF0C\u5E76\u5BF9\u539F\u6587\u6DF1\u8868\u611F\u8C22\u3002"),p=r(`<p>\u5BF9\u4E8EAndroid\u8C03\u7528JS\u4EE3\u7801\u7684\u65B9\u6CD5\u67092\u79CD\uFF1A</p><ol><li>\u901A\u8FC7<code>WebView</code>\u7684<code>loadUrl\uFF08\uFF09</code></li><li>\u901A\u8FC7<code>WebView</code>\u7684<code>evaluateJavascript\uFF08\uFF09</code></li></ol><p>##\u65B9\u5F0F1\uFF1A\u901A\u8FC7<code>WebView</code>\u7684<code>loadUrl\uFF08\uFF09</code></p><p><strong>\u6B65\u9AA41\uFF1A\u5C06\u9700\u8981\u8C03\u7528\u7684JS\u4EE3\u7801\u4EE5.html\u683C\u5F0F\u653E\u5230src/main/assets\u6587\u4EF6\u5939\u91CC</strong></p><p><em>\u9700\u8981\u52A0\u8F7DJS\u4EE3\u7801\uFF1Ajavascript.html</em></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u6587\u672C\u540D\uFF1Ajavascript
&lt;!DOCTYPE html&gt;
&lt;html&gt;

   &lt;head&gt;
      &lt;meta charset=&quot;utf-8&quot;&gt;
      &lt;title&gt;Carson_Ho&lt;/title&gt;
      
// JS\u4EE3\u7801
     &lt;script&gt;
// Android\u9700\u8981\u8C03\u7528\u7684\u65B9\u6CD5
   function callJS(){
      alert(&quot;Android\u8C03\u7528\u4E86JS\u7684callJS\u65B9\u6CD5&quot;);
   }
&lt;/script&gt;

   &lt;/head&gt;

&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6B65\u9AA42\uFF1A\u5728Android\u91CC\u901A\u8FC7WebView\u8BBE\u7F6E\u8C03\u7528JS\u4EE3\u7801</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {

    WebView mWebView;
    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView =(WebView) findViewById(R.id.webview);

        WebSettings webSettings = mWebView.getSettings();

        // \u8BBE\u7F6E\u4E0EJs\u4EA4\u4E92\u7684\u6743\u9650
        webSettings.setJavaScriptEnabled(true);
        // \u8BBE\u7F6E\u5141\u8BB8JS\u5F39\u7A97
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        // \u5148\u8F7D\u5165JS\u4EE3\u7801
        // \u683C\u5F0F\u89C4\u5B9A\u4E3A:file:///android_asset/\u6587\u4EF6\u540D.html
        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);

        button = (Button) findViewById(R.id.button);


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // \u901A\u8FC7Handler\u53D1\u9001\u6D88\u606F
                mWebView.post(new Runnable() {
                    @Override
                    public void run() {

                        // \u6CE8\u610F\u8C03\u7528\u7684JS\u65B9\u6CD5\u540D\u8981\u5BF9\u5E94\u4E0A
                        // \u8C03\u7528javascript\u7684callJS()\u65B9\u6CD5
                        mWebView.loadUrl(&quot;javascript:callJS()&quot;);
                    }
                });
                
            }
        });

        // \u7531\u4E8E\u8BBE\u7F6E\u4E86\u5F39\u7A97\u68C0\u9A8C\u8C03\u7528\u7ED3\u679C,\u6240\u4EE5\u9700\u8981\u652F\u6301js\u5BF9\u8BDD\u6846
        // webview\u53EA\u662F\u8F7D\u4F53\uFF0C\u5185\u5BB9\u7684\u6E32\u67D3\u9700\u8981\u4F7F\u7528webviewChromClient\u7C7B\u53BB\u5B9E\u73B0
        // \u901A\u8FC7\u8BBE\u7F6EWebChromeClient\u5BF9\u8C61\u5904\u7406JavaScript\u7684\u5BF9\u8BDD\u6846
        //\u8BBE\u7F6E\u54CD\u5E94js \u7684Alert()\u51FD\u6570
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
                AlertDialog.Builder b = new AlertDialog.Builder(MainActivity.this);
                b.setTitle(&quot;Alert&quot;);
                b.setMessage(message);
                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        result.confirm();
                    }
                });
                b.setCancelable(false);
                b.create().show();
                return true;
            }

        });


    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-826d0aa065f70cb1.png" alt="\u6548\u679C\u5982\u56FE\u6240\u793A" loading="lazy"></p><p><strong>\u7279\u522B\u6CE8\u610F\uFF1AJS\u4EE3\u7801\u8C03\u7528\u4E00\u5B9A\u8981\u5728 onPageFinished\uFF08\uFF09 \u56DE\u8C03\u4E4B\u540E\u624D\u80FD\u8C03\u7528\uFF0C\u5426\u5219\u4E0D\u4F1A\u8C03\u7528\u3002</strong></p><blockquote><p><code>onPageFinished()</code>\u5C5E\u4E8EWebViewClient\u7C7B\u7684\u65B9\u6CD5\uFF0C\u4E3B\u8981\u5728\u9875\u9762\u52A0\u8F7D\u7ED3\u675F\u65F6\u8C03\u7528</p></blockquote><p>##\u65B9\u5F0F2\uFF1A\u901A\u8FC7<code>WebView</code>\u7684<code>evaluateJavascript\uFF08\uFF09</code></p><ul><li>\u4F18\u70B9\uFF1A\u8BE5\u65B9\u6CD5\u6BD4\u7B2C\u4E00\u79CD\u65B9\u6CD5\u6548\u7387\u66F4\u9AD8\u3001\u4F7F\u7528\u66F4\u7B80\u6D01\u3002</li></ul><blockquote><ol><li>\u56E0\u4E3A\u8BE5\u65B9\u6CD5\u7684\u6267\u884C\u4E0D\u4F1A\u4F7F\u9875\u9762\u5237\u65B0\uFF0C\u800C\u7B2C\u4E00\u79CD\u65B9\u6CD5\uFF08loadUrl \uFF09\u7684\u6267\u884C\u5219\u4F1A\u3002</li><li>Android 4.4 \u540E\u624D\u53EF\u4F7F\u7528</li></ol></blockquote><ul><li>\u5177\u4F53\u4F7F\u7528</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u53EA\u9700\u8981\u5C06\u7B2C\u4E00\u79CD\u65B9\u6CD5\u7684loadUrl()\u6362\u6210\u4E0B\u9762\u8BE5\u65B9\u6CD5\u5373\u53EF
    mWebView.evaluateJavascript\uFF08&quot;javascript:callJS()&quot;, new ValueCallback&lt;String&gt;() {
        @Override
        public void onReceiveValue(String value) {
            //\u6B64\u5904\u4E3A js \u8FD4\u56DE\u7684\u7ED3\u679C
        }
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u65B9\u6CD5\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u5BF9\u6BD4" aria-hidden="true">#</a> \u65B9\u6CD5\u5BF9\u6BD4</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-30f095d4c9e638fd.png" alt="\u65B9\u6CD5\u5BF9\u6BD4" loading="lazy"></p><h2 id="\u4F7F\u7528\u5EFA\u8BAE" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u5EFA\u8BAE" aria-hidden="true">#</a> \u4F7F\u7528\u5EFA\u8BAE</h2><p>\u4E24\u79CD\u65B9\u6CD5\u6DF7\u5408\u4F7F\u7528\uFF0C\u5373Android 4.4\u4EE5\u4E0B\u4F7F\u7528\u65B9\u6CD51\uFF0CAndroid 4.4\u4EE5\u4E0A\u65B9\u6CD52</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Android\u7248\u672C\u53D8\u91CF
final int version = Build.VERSION.SDK_INT;
// \u56E0\u4E3A\u8BE5\u65B9\u6CD5\u5728 Android 4.4 \u7248\u672C\u624D\u53EF\u4F7F\u7528\uFF0C\u6240\u4EE5\u4F7F\u7528\u65F6\u9700\u8FDB\u884C\u7248\u672C\u5224\u65AD
if (version &lt; 18) {
    mWebView.loadUrl(&quot;javascript:callJS()&quot;);
} else {
    mWebView.evaluateJavascript\uFF08&quot;javascript:callJS()&quot;, new ValueCallback&lt;String&gt;() {
        @Override
        public void onReceiveValue(String value) {
            //\u6B64\u5904\u4E3A js \u8FD4\u56DE\u7684\u7ED3\u679C
        }
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function g(h,w){const n=v("ExternalLinkIcon");return s(),d("div",null,[c,e("p",null,[u,e("a",o,[b,a(n)]),m]),p])}const _=l(t,[["render",g],["__file","android-call-js.html.vue"]]);export{_ as default};
