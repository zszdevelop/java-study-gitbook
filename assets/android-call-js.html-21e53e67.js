import{_ as l,W as d,X as s,Y as i,Z as e,$ as a,a0 as r,D as v}from"./framework-0cf5f349.js";const t={},c=i("h1",{id:"android调用js方法",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#android调用js方法","aria-hidden":"true"},"#"),e(" Android调用js方法")],-1),u={href:"https://www.jianshu.com/p/345f4d8a5cfa",target:"_blank",rel:"noopener noreferrer"},b=r(`<p>对于Android调用JS代码的方法有2种：</p><ol><li>通过<code>WebView</code>的<code>loadUrl（）</code></li><li>通过<code>WebView</code>的<code>evaluateJavascript（）</code></li></ol><p>##方式1：通过<code>WebView</code>的<code>loadUrl（）</code></p><p><strong>步骤1：将需要调用的JS代码以.html格式放到src/main/assets文件夹里</strong></p><p><em>需要加载JS代码：javascript.html</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 文本名：javascript
&lt;!DOCTYPE html&gt;
&lt;html&gt;

   &lt;head&gt;
      &lt;meta charset=&quot;utf-8&quot;&gt;
      &lt;title&gt;Carson_Ho&lt;/title&gt;
      
// JS代码
     &lt;script&gt;
// Android需要调用的方法
   function callJS(){
      alert(&quot;Android调用了JS的callJS方法&quot;);
   }
&lt;/script&gt;

   &lt;/head&gt;

&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤2：在Android里通过WebView设置调用JS代码</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {

    WebView mWebView;
    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView =(WebView) findViewById(R.id.webview);

        WebSettings webSettings = mWebView.getSettings();

        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        // 先载入JS代码
        // 格式规定为:file:///android_asset/文件名.html
        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);

        button = (Button) findViewById(R.id.button);


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 通过Handler发送消息
                mWebView.post(new Runnable() {
                    @Override
                    public void run() {

                        // 注意调用的JS方法名要对应上
                        // 调用javascript的callJS()方法
                        mWebView.loadUrl(&quot;javascript:callJS()&quot;);
                    }
                });
                
            }
        });

        // 由于设置了弹窗检验调用结果,所以需要支持js对话框
        // webview只是载体，内容的渲染需要使用webviewChromClient类去实现
        // 通过设置WebChromeClient对象处理JavaScript的对话框
        //设置响应js 的Alert()函数
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-826d0aa065f70cb1.png" alt="效果如图所示" tabindex="0" loading="lazy"><figcaption>效果如图所示</figcaption></figure><p><strong>特别注意：JS代码调用一定要在 onPageFinished（） 回调之后才能调用，否则不会调用。</strong></p><blockquote><p><code>onPageFinished()</code>属于WebViewClient类的方法，主要在页面加载结束时调用</p></blockquote><p>##方式2：通过<code>WebView</code>的<code>evaluateJavascript（）</code></p><ul><li>优点：该方法比第一种方法效率更高、使用更简洁。</li></ul><blockquote><ol><li>因为该方法的执行不会使页面刷新，而第一种方法（loadUrl ）的执行则会。</li><li>Android 4.4 后才可使用</li></ol></blockquote><ul><li>具体使用</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 只需要将第一种方法的loadUrl()换成下面该方法即可
    mWebView.evaluateJavascript（&quot;javascript:callJS()&quot;, new ValueCallback&lt;String&gt;() {
        @Override
        public void onReceiveValue(String value) {
            //此处为 js 返回的结果
        }
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法对比" tabindex="-1"><a class="header-anchor" href="#方法对比" aria-hidden="true">#</a> 方法对比</h2><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-30f095d4c9e638fd.png" alt="方法对比" tabindex="0" loading="lazy"><figcaption>方法对比</figcaption></figure><h2 id="使用建议" tabindex="-1"><a class="header-anchor" href="#使用建议" aria-hidden="true">#</a> 使用建议</h2><p>两种方法混合使用，即Android 4.4以下使用方法1，Android 4.4以上方法2</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Android版本变量
final int version = Build.VERSION.SDK_INT;
// 因为该方法在 Android 4.4 版本才可使用，所以使用时需进行版本判断
if (version &lt; 18) {
    mWebView.loadUrl(&quot;javascript:callJS()&quot;);
} else {
    mWebView.evaluateJavascript（&quot;javascript:callJS()&quot;, new ValueCallback&lt;String&gt;() {
        @Override
        public void onReceiveValue(String value) {
            //此处为 js 返回的结果
        }
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function o(m,g){const n=v("ExternalLinkIcon");return d(),s("div",null,[c,i("p",null,[e("本文参考"),i("a",u,[e("博客原文"),a(n)]),e("整理，并对他进行补充扩展，并对原文深表感谢。")]),b])}const h=l(t,[["render",o],["__file","android-call-js.html.vue"]]);export{h as default};
