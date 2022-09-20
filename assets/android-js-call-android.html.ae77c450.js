import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as e,e as a}from"./app.6ee8c9d2.js";const i={},t=a(`<h1 id="js\u8C03\u7528android\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#js\u8C03\u7528android\u65B9\u6CD5" aria-hidden="true">#</a> js\u8C03\u7528Android\u65B9\u6CD5</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u5BF9\u4E8EJS\u8C03\u7528Android\u4EE3\u7801\u7684\u65B9\u6CD5\u67093\u79CD\uFF1A</p><ol><li>\u901A\u8FC7<code>WebView</code>\u7684<code>addJavascriptInterface\uFF08\uFF09</code>\u8FDB\u884C\u5BF9\u8C61\u6620\u5C04</li><li>\u901A\u8FC7 <code>WebViewClient</code> \u7684<code>shouldOverrideUrlLoading ()</code>\u65B9\u6CD5\u56DE\u8C03\u62E6\u622A url</li><li>\u901A\u8FC7 <code>WebChromeClient</code> \u7684<code>onJsAlert()</code>\u3001<code>onJsConfirm()</code>\u3001<code>onJsPrompt\uFF08\uFF09</code>\u65B9\u6CD5\u56DE\u8C03\u62E6\u622AJS\u5BF9\u8BDD\u6846<code>alert()</code>\u3001<code>confirm()</code>\u3001<code>prompt\uFF08\uFF09</code> \u6D88\u606F</li></ol><h2 id="_2-\u4E09\u79CD\u65B9\u6CD5\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-\u4E09\u79CD\u65B9\u6CD5\u5B9E\u73B0" aria-hidden="true">#</a> 2. \u4E09\u79CD\u65B9\u6CD5\u5B9E\u73B0</h2><h3 id="_2-1-\u65B9\u5F0F1-\u901A\u8FC7-webview\u7684addjavascriptinterface-\u8FDB\u884C\u5BF9\u8C61\u6620\u5C04" tabindex="-1"><a class="header-anchor" href="#_2-1-\u65B9\u5F0F1-\u901A\u8FC7-webview\u7684addjavascriptinterface-\u8FDB\u884C\u5BF9\u8C61\u6620\u5C04" aria-hidden="true">#</a> 2.1 \u65B9\u5F0F1\uFF1A\u901A\u8FC7 <code>WebView</code>\u7684<code>addJavascriptInterface\uFF08\uFF09</code>\u8FDB\u884C\u5BF9\u8C61\u6620\u5C04</h3><p><strong>\u6B65\u9AA41\uFF1A\u5B9A\u4E49\u4E00\u4E2A\u4E0EJS\u5BF9\u8C61\u6620\u5C04\u5173\u7CFB\u7684Android\u7C7B\uFF1AAndroidtoJs</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u7EE7\u627F\u81EAObject\u7C7B
public class AndroidtoJs extends Object {

    // \u5B9A\u4E49JS\u9700\u8981\u8C03\u7528\u7684\u65B9\u6CD5
    // \u88ABJS\u8C03\u7528\u7684\u65B9\u6CD5\u5FC5\u987B\u52A0\u5165@JavascriptInterface\u6CE8\u89E3
    @JavascriptInterface
    public void hello(String msg) {
        System.out.println(&quot;JS\u8C03\u7528\u4E86Android\u7684hello\u65B9\u6CD5&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6B65\u9AA42\uFF1A\u5C06\u9700\u8981\u8C03\u7528\u7684JS\u4EE3\u7801\u4EE5.html\u683C\u5F0F\u653E\u5230src/main/assets\u6587\u4EF6\u5939\u91CC</strong></p><p><strong>app\u7AEF\u548C\u524D\u7AEF\u9700\u8981\u7EA6\u5B9A\u4E24\u4E2A\u914D\u7F6E</strong></p><ul><li>js\u51FD\u6570\u524D\u7F00\uFF08\u672C\u4F8B\uFF1Atest\uFF09</li><li>\u548C\u5BF9\u5E94\u8C03\u7528\u51FD\u6570\uFF08\u672C\u4F8B\uFF1Ahello()\uFF09</li></ul><p><em>\u9700\u8981\u52A0\u8F7DJS\u4EE3\u7801\uFF1Ajavascript.html</em></p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>utf-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Carson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>  
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
         
        
         <span class="token keyword">function</span> <span class="token function">callAndroid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// \u7531\u4E8E\u5BF9\u8C61\u6620\u5C04\uFF0C\u6240\u4EE5\u8C03\u7528test\u5BF9\u8C61\u7B49\u4E8E\u8C03\u7528Android\u6620\u5C04\u7684\u5BF9\u8C61</span>
            test<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">&quot;js\u8C03\u7528\u4E86android\u4E2D\u7684hello\u65B9\u6CD5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
      //\u70B9\u51FB\u6309\u94AE\u5219\u8C03\u7528callAndroid\u51FD\u6570
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button1<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value javascript language-javascript"><span class="token function">callAndroid</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u5728vue\u4E2D\u4E5F\u662F\u4E00\u6837\u7684\u5199\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">callApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        test<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">&quot;\u54C8\u54C8\uFF0C\u6211\u662Fjs\u8C03\u7528\u7684&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B65\u9AA43\uFF1A\u5728Android\u91CC\u901A\u8FC7WebView\u8BBE\u7F6EAndroid\u7C7B\u4E0EJS\u4EE3\u7801\u7684\u6620\u5C04**</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainActivity</span> <span class="token keyword">extends</span> <span class="token class-name">AppCompatActivity</span> <span class="token punctuation">{</span>

    <span class="token class-name">WebView</span> mWebView<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token class-name">Bundle</span> savedInstanceState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setContentView</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_main<span class="token punctuation">)</span><span class="token punctuation">;</span>

        mWebView <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">WebView</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>webview<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">WebSettings</span> webSettings <span class="token operator">=</span> mWebView<span class="token punctuation">.</span><span class="token function">getSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// \u8BBE\u7F6E\u4E0EJs\u4EA4\u4E92\u7684\u6743\u9650</span>
        webSettings<span class="token punctuation">.</span><span class="token function">setJavaScriptEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// \u901A\u8FC7addJavascriptInterface()\u5C06Java\u5BF9\u8C61\u6620\u5C04\u5230JS\u5BF9\u8C61</span>
        <span class="token comment">//\u53C2\u65701\uFF1AJavascript\u5BF9\u8C61\u540D</span>
        <span class="token comment">//\u53C2\u65702\uFF1AJava\u5BF9\u8C61\u540D</span>
        mWebView<span class="token punctuation">.</span><span class="token function">addJavascriptInterface</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AndroidtoJs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//AndroidtoJS\u7C7B\u5BF9\u8C61\u6620\u5C04\u5230js\u7684test\u5BF9\u8C61</span>

        <span class="token comment">// \u52A0\u8F7DJS\u4EE3\u7801</span>
        <span class="token comment">// \u683C\u5F0F\u89C4\u5B9A\u4E3A:file:///android_asset/\u6587\u4EF6\u540D.html</span>
        mWebView<span class="token punctuation">.</span><span class="token function">loadUrl</span><span class="token punctuation">(</span><span class="token string">&quot;file:///android_asset/javascript.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-1-\u65B9\u5F0F1-\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#_2-1-1-\u65B9\u5F0F1-\u7279\u70B9" aria-hidden="true">#</a> 2.1.1 \u65B9\u5F0F1 \u7279\u70B9</h4><ul><li>\u4F18\u70B9\uFF1A\u4F7F\u7528\u7B80\u5355</li><li>\u7F3A\u70B9\uFF1A\u5B58\u5728\u4E25\u91CD\u7684\u6F0F\u6D1E\u95EE\u9898</li></ul><h3 id="_2-2-\u65B9\u5F0F2-\u901A\u8FC7-webviewclient-\u7684\u65B9\u6CD5shouldoverrideurlloading-\u56DE\u8C03\u62E6\u622A-url" tabindex="-1"><a class="header-anchor" href="#_2-2-\u65B9\u5F0F2-\u901A\u8FC7-webviewclient-\u7684\u65B9\u6CD5shouldoverrideurlloading-\u56DE\u8C03\u62E6\u622A-url" aria-hidden="true">#</a> 2.2 \u65B9\u5F0F2\uFF1A\u901A\u8FC7 <code>WebViewClient</code> \u7684\u65B9\u6CD5<code>shouldOverrideUrlLoading ()</code>\u56DE\u8C03\u62E6\u622A url</h3><ul><li>\u5177\u4F53\u539F\u7406\uFF1A</li></ul><ol><li>Android\u901A\u8FC7 <code>WebViewClient</code> \u7684\u56DE\u8C03\u65B9\u6CD5<code>shouldOverrideUrlLoading ()</code>\u62E6\u622A url</li><li>\u89E3\u6790\u8BE5 url \u7684\u534F\u8BAE</li><li>\u5982\u679C\u68C0\u6D4B\u5230\u662F\u9884\u5148\u7EA6\u5B9A\u597D\u7684\u534F\u8BAE\uFF0C\u5C31\u8C03\u7528\u76F8\u5E94\u65B9\u6CD5</li></ol><blockquote><p>\u5373JS\u9700\u8981\u8C03\u7528Android\u7684\u65B9\u6CD5</p></blockquote><ul><li>\u5177\u4F53\u4F7F\u7528\uFF1A **\u6B65\u9AA41\uFF1A**\u5728JS\u7EA6\u5B9A\u6240\u9700\u8981\u7684Url\u534F\u8BAE</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;

   &lt;head&gt;
      &lt;meta charset=&quot;utf-8&quot;&gt;
      &lt;title&gt;Carson_Ho&lt;/title&gt;
      
     &lt;script&gt;
         function callAndroid(){
            /*\u7EA6\u5B9A\u7684url\u534F\u8BAE\u4E3A\uFF1Ajs://webview?arg1=111&amp;arg2=222*/
            document.location = &quot;js://webview?arg1=111&amp;arg2=222&quot;;
         }
      &lt;/script&gt;
&lt;/head&gt;

&lt;!-- \u70B9\u51FB\u6309\u94AE\u5219\u8C03\u7528callAndroid\uFF08\uFF09\u65B9\u6CD5  --&gt;
   &lt;body&gt;
     &lt;button type=&quot;button&quot; id=&quot;button1&quot; onclick=&quot;callAndroid()&quot;&gt;\u70B9\u51FB\u8C03\u7528Android\u4EE3\u7801&lt;/button&gt;
   &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u8BE5JS\u901A\u8FC7Android\u7684<code>mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;)</code>\u52A0\u8F7D\u540E\uFF0C\u5C31\u4F1A\u56DE\u8C03<code>shouldOverrideUrlLoading \uFF08\uFF09</code></p><p><strong>\u6B65\u9AA42\uFF1A\u5728Android\u901A\u8FC7WebViewClient\u590D\u5199shouldOverrideUrlLoading \uFF08\uFF09</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {

    WebView mWebView;
//    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webview);

        WebSettings webSettings = mWebView.getSettings();

        // \u8BBE\u7F6E\u4E0EJs\u4EA4\u4E92\u7684\u6743\u9650
        webSettings.setJavaScriptEnabled(true);
        // \u8BBE\u7F6E\u5141\u8BB8JS\u5F39\u7A97
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        // \u6B65\u9AA41\uFF1A\u52A0\u8F7DJS\u4EE3\u7801
        // \u683C\u5F0F\u89C4\u5B9A\u4E3A:file:///android_asset/\u6587\u4EF6\u540D.html
        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);


// \u590D\u5199WebViewClient\u7C7B\u7684shouldOverrideUrlLoading\u65B9\u6CD5
mWebView.setWebViewClient(new WebViewClient() {
                                      @Override
                                      public boolean shouldOverrideUrlLoading(WebView view, String url) {

                                          // \u6B65\u9AA42\uFF1A\u6839\u636E\u534F\u8BAE\u7684\u53C2\u6570\uFF0C\u5224\u65AD\u662F\u5426\u662F\u6240\u9700\u8981\u7684url
                                          // \u4E00\u822C\u6839\u636Escheme\uFF08\u534F\u8BAE\u683C\u5F0F\uFF09 &amp; authority\uFF08\u534F\u8BAE\u540D\uFF09\u5224\u65AD\uFF08\u524D\u4E24\u4E2A\u53C2\u6570\uFF09
                                          //\u5047\u5B9A\u4F20\u5165\u8FDB\u6765\u7684 url = &quot;js://webview?arg1=111&amp;arg2=222&quot;\uFF08\u540C\u65F6\u4E5F\u662F\u7EA6\u5B9A\u597D\u7684\u9700\u8981\u62E6\u622A\u7684\uFF09

                                          Uri uri = Uri.parse(url);                                 
                                          // \u5982\u679Curl\u7684\u534F\u8BAE = \u9884\u5148\u7EA6\u5B9A\u7684 js \u534F\u8BAE
                                          // \u5C31\u89E3\u6790\u5F80\u4E0B\u89E3\u6790\u53C2\u6570
                                          if ( uri.getScheme().equals(&quot;js&quot;)) {

                                              // \u5982\u679C authority  = \u9884\u5148\u7EA6\u5B9A\u534F\u8BAE\u91CC\u7684 webview\uFF0C\u5373\u4EE3\u8868\u90FD\u7B26\u5408\u7EA6\u5B9A\u7684\u534F\u8BAE
                                              // \u6240\u4EE5\u62E6\u622Aurl,\u4E0B\u9762JS\u5F00\u59CB\u8C03\u7528Android\u9700\u8981\u7684\u65B9\u6CD5
                                              if (uri.getAuthority().equals(&quot;webview&quot;)) {

                                                 //  \u6B65\u9AA43\uFF1A
                                                  // \u6267\u884CJS\u6240\u9700\u8981\u8C03\u7528\u7684\u903B\u8F91
                                                  System.out.println(&quot;js\u8C03\u7528\u4E86Android\u7684\u65B9\u6CD5&quot;);
                                                  // \u53EF\u4EE5\u5728\u534F\u8BAE\u4E0A\u5E26\u6709\u53C2\u6570\u5E76\u4F20\u9012\u5230Android\u4E0A
                                                  HashMap&lt;String, String&gt; params = new HashMap&lt;&gt;();
                                                  Set&lt;String&gt; collection = uri.getQueryParameterNames();

                                              }

                                              return true;
                                          }
                                          return super.shouldOverrideUrlLoading(view, url);
                                      }
                                  }
        );
   }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-1-\u65B9\u5F0F2-\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#_2-2-1-\u65B9\u5F0F2-\u7279\u70B9" aria-hidden="true">#</a> 2.2.1 \u65B9\u5F0F2 \u7279\u70B9</h4><ul><li>\u4F18\u70B9\uFF1A\u4E0D\u5B58\u5728\u65B9\u5F0F1\u7684\u6F0F\u6D1E\uFF1B</li><li>\u7F3A\u70B9\uFF1AJS\u83B7\u53D6Android\u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u590D\u6742\u3002</li></ul><blockquote><p>\u5982\u679CJS\u60F3\u8981\u5F97\u5230Android\u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\uFF0C\u53EA\u80FD\u901A\u8FC7 WebView \u7684 <code>loadUrl \uFF08\uFF09</code>\u53BB\u6267\u884C JS \u65B9\u6CD5\u628A\u8FD4\u56DE\u503C\u4F20\u9012\u56DE\u53BB\uFF0C\u76F8\u5173\u7684\u4EE3\u7801\u5982\u4E0B\uFF1A</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Android\uFF1AMainActivity.java
mWebView.loadUrl(&quot;javascript:returnResult(&quot; + result + &quot;)&quot;);

// JS\uFF1Ajavascript.html
function returnResult(result){
    alert(&quot;result is&quot; + result);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-\u65B9\u5F0F3-\u901A\u8FC7-webchromeclient-\u7684onjsalert-\u3001onjsconfirm-\u3001onjsprompt-\u65B9\u6CD5\u56DE\u8C03\u62E6\u622Ajs\u5BF9\u8BDD\u6846alert-\u3001confirm-\u3001prompt-\u6D88\u606F" tabindex="-1"><a class="header-anchor" href="#_2-3-\u65B9\u5F0F3-\u901A\u8FC7-webchromeclient-\u7684onjsalert-\u3001onjsconfirm-\u3001onjsprompt-\u65B9\u6CD5\u56DE\u8C03\u62E6\u622Ajs\u5BF9\u8BDD\u6846alert-\u3001confirm-\u3001prompt-\u6D88\u606F" aria-hidden="true">#</a> 2.3 \u65B9\u5F0F3\uFF1A\u901A\u8FC7 <code>WebChromeClient</code> \u7684<code>onJsAlert()</code>\u3001<code>onJsConfirm()</code>\u3001<code>onJsPrompt\uFF08\uFF09</code>\u65B9\u6CD5\u56DE\u8C03\u62E6\u622AJS\u5BF9\u8BDD\u6846<code>alert()</code>\u3001<code>confirm()</code>\u3001<code>prompt\uFF08\uFF09</code> \u6D88\u606F</h3><p>\u5728JS\u4E2D\uFF0C\u6709\u4E09\u4E2A\u5E38\u7528\u7684\u5BF9\u8BDD\u6846\u65B9\u6CD5\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-1385f748618af886.png" alt="944365-1385f748618af886" loading="lazy"></p><p>\u65B9\u5F0F3\u7684\u539F\u7406\uFF1AAndroid\u901A\u8FC7 <code>WebChromeClient</code> \u7684<code>onJsAlert()</code>\u3001<code>onJsConfirm()</code>\u3001<code>onJsPrompt\uFF08\uFF09</code>\u65B9\u6CD5\u56DE\u8C03\u5206\u522B\u62E6\u622AJS\u5BF9\u8BDD\u6846 \uFF08\u5373\u4E0A\u8FF0\u4E09\u4E2A\u65B9\u6CD5\uFF09\uFF0C\u5F97\u5230\u4ED6\u4EEC\u7684\u6D88\u606F\u5185\u5BB9\uFF0C\u7136\u540E\u89E3\u6790\u5373\u53EF\u3002</p><p>\u4E0B\u9762\u7684\u4F8B\u5B50\u5C06\u7528**\u62E6\u622A JS\u7684\u8F93\u5165\u6846\uFF08\u5373prompt\uFF08\uFF09\u65B9\u6CD5\uFF09**\u8BF4\u660E \uFF1A</p><blockquote><ol><li>\u5E38\u7528\u7684\u62E6\u622A\u662F\uFF1A\u62E6\u622A JS\u7684\u8F93\u5165\u6846\uFF08\u5373<code>prompt\uFF08\uFF09</code>\u65B9\u6CD5\uFF09</li><li>\u56E0\u4E3A\u53EA\u6709<code>prompt\uFF08\uFF09</code>\u53EF\u4EE5\u8FD4\u56DE\u4EFB\u610F\u7C7B\u578B\u7684\u503C\uFF0C\u64CD\u4F5C\u6700\u5168\u9762\u65B9\u4FBF\u3001\u66F4\u52A0\u7075\u6D3B\uFF1B\u800Calert\uFF08\uFF09\u5BF9\u8BDD\u6846\u6CA1\u6709\u8FD4\u56DE\u503C\uFF1Bconfirm\uFF08\uFF09\u5BF9\u8BDD\u6846\u53EA\u80FD\u8FD4\u56DE\u4E24\u79CD\u72B6\u6001\uFF08\u786E\u5B9A / \u53D6\u6D88\uFF09\u4E24\u4E2A\u503C</li></ol></blockquote><p><strong>\u6B65\u9AA41\uFF1A\u52A0\u8F7DJS\u4EE3\u7801\uFF0C\u5982\u4E0B\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
   &lt;head&gt;
      &lt;meta charset=&quot;utf-8&quot;&gt;
      &lt;title&gt;Carson_Ho&lt;/title&gt;
      
     &lt;script&gt;
        
    function clickprompt(){
    // \u8C03\u7528prompt\uFF08\uFF09
    var result=prompt(&quot;js://demo?arg1=111&amp;arg2=222&quot;);
    alert(&quot;demo &quot; + result);
}

      &lt;/script&gt;
&lt;/head&gt;

&lt;!-- \u70B9\u51FB\u6309\u94AE\u5219\u8C03\u7528clickprompt()  --&gt;
   &lt;body&gt;
     &lt;button type=&quot;button&quot; id=&quot;button1&quot; onclick=&quot;clickprompt()&quot;&gt;\u70B9\u51FB\u8C03\u7528Android\u4EE3\u7801&lt;/button&gt;
   &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u4F7F\u7528<code>mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;)</code>\u52A0\u8F7D\u4E86\u4E0A\u8FF0JS\u4EE3\u7801\u540E\uFF0C\u5C31\u4F1A\u89E6\u53D1\u56DE\u8C03<code>onJsPrompt\uFF08\uFF09</code>\uFF0C\u5177\u4F53\u5982\u4E0B\uFF1A</p><blockquote><ol><li>\u5982\u679C\u662F\u62E6\u622A\u8B66\u544A\u6846\uFF08\u5373<code>alert()</code>\uFF09\uFF0C\u5219\u89E6\u53D1\u56DE\u8C03<code>onJsAlert\uFF08\uFF09</code>\uFF1B</li><li>\u5982\u679C\u662F\u62E6\u622A\u786E\u8BA4\u6846\uFF08\u5373<code>confirm()</code>\uFF09\uFF0C\u5219\u89E6\u53D1\u56DE\u8C03<code>onJsConfirm\uFF08\uFF09</code>\uFF1B</li></ol></blockquote><p><strong>\u6B65\u9AA42\uFF1A\u5728Android\u901A\u8FC7WebChromeClient\u590D\u5199onJsPrompt\uFF08\uFF09</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {

    WebView mWebView;
//    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webview);

        WebSettings webSettings = mWebView.getSettings();

        // \u8BBE\u7F6E\u4E0EJs\u4EA4\u4E92\u7684\u6743\u9650
        webSettings.setJavaScriptEnabled(true);
        // \u8BBE\u7F6E\u5141\u8BB8JS\u5F39\u7A97
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

// \u5148\u52A0\u8F7DJS\u4EE3\u7801
        // \u683C\u5F0F\u89C4\u5B9A\u4E3A:file:///android_asset/\u6587\u4EF6\u540D.html
        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);


        mWebView.setWebChromeClient(new WebChromeClient() {
                                        // \u62E6\u622A\u8F93\u5165\u6846(\u539F\u7406\u540C\u65B9\u5F0F2)
                                        // \u53C2\u6570message:\u4EE3\u8868promt\uFF08\uFF09\u7684\u5185\u5BB9\uFF08\u4E0D\u662Furl\uFF09
                                        // \u53C2\u6570result:\u4EE3\u8868\u8F93\u5165\u6846\u7684\u8FD4\u56DE\u503C
                                        @Override
                                        public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
                                            // \u6839\u636E\u534F\u8BAE\u7684\u53C2\u6570\uFF0C\u5224\u65AD\u662F\u5426\u662F\u6240\u9700\u8981\u7684url(\u539F\u7406\u540C\u65B9\u5F0F2)
                                            // \u4E00\u822C\u6839\u636Escheme\uFF08\u534F\u8BAE\u683C\u5F0F\uFF09 &amp; authority\uFF08\u534F\u8BAE\u540D\uFF09\u5224\u65AD\uFF08\u524D\u4E24\u4E2A\u53C2\u6570\uFF09
                                            //\u5047\u5B9A\u4F20\u5165\u8FDB\u6765\u7684 url = &quot;js://webview?arg1=111&amp;arg2=222&quot;\uFF08\u540C\u65F6\u4E5F\u662F\u7EA6\u5B9A\u597D\u7684\u9700\u8981\u62E6\u622A\u7684\uFF09

                                            Uri uri = Uri.parse(message);
                                            // \u5982\u679Curl\u7684\u534F\u8BAE = \u9884\u5148\u7EA6\u5B9A\u7684 js \u534F\u8BAE
                                            // \u5C31\u89E3\u6790\u5F80\u4E0B\u89E3\u6790\u53C2\u6570
                                            if ( uri.getScheme().equals(&quot;js&quot;)) {

                                                // \u5982\u679C authority  = \u9884\u5148\u7EA6\u5B9A\u534F\u8BAE\u91CC\u7684 webview\uFF0C\u5373\u4EE3\u8868\u90FD\u7B26\u5408\u7EA6\u5B9A\u7684\u534F\u8BAE
                                                // \u6240\u4EE5\u62E6\u622Aurl,\u4E0B\u9762JS\u5F00\u59CB\u8C03\u7528Android\u9700\u8981\u7684\u65B9\u6CD5
                                                if (uri.getAuthority().equals(&quot;webview&quot;)) {

                                                    //
                                                    // \u6267\u884CJS\u6240\u9700\u8981\u8C03\u7528\u7684\u903B\u8F91
                                                    System.out.println(&quot;js\u8C03\u7528\u4E86Android\u7684\u65B9\u6CD5&quot;);
                                                    // \u53EF\u4EE5\u5728\u534F\u8BAE\u4E0A\u5E26\u6709\u53C2\u6570\u5E76\u4F20\u9012\u5230Android\u4E0A
                                                    HashMap&lt;String, String&gt; params = new HashMap&lt;&gt;();
                                                    Set&lt;String&gt; collection = uri.getQueryParameterNames();

                                                    //\u53C2\u6570result:\u4EE3\u8868\u6D88\u606F\u6846\u7684\u8FD4\u56DE\u503C(\u8F93\u5165\u503C)
                                                    result.confirm(&quot;js\u8C03\u7528\u4E86Android\u7684\u65B9\u6CD5\u6210\u529F\u5566&quot;);
                                                }
                                                return true;
                                            }
                                            return super.onJsPrompt(view, url, message, defaultValue, result);
                                        }

// \u901A\u8FC7alert()\u548Cconfirm()\u62E6\u622A\u7684\u539F\u7406\u76F8\u540C\uFF0C\u6B64\u5904\u4E0D\u4F5C\u8FC7\u591A\u8BB2\u8FF0

                                        // \u62E6\u622AJS\u7684\u8B66\u544A\u6846
                                        @Override
                                        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                                            return super.onJsAlert(view, url, message, result);
                                        }

                                        // \u62E6\u622AJS\u7684\u786E\u8BA4\u6846
                                        @Override
                                        public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
                                            return super.onJsConfirm(view, url, message, result);
                                        }
                                    }
        );


            }

        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u4E09\u79CD\u65B9\u5F0F\u7684\u5BF9\u6BD4-\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#_3-\u4E09\u79CD\u65B9\u5F0F\u7684\u5BF9\u6BD4-\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> 3. \u4E09\u79CD\u65B9\u5F0F\u7684\u5BF9\u6BD4 &amp; \u4F7F\u7528\u573A\u666F</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-8c91481325a5253e.png" alt="944365-8c91481325a5253e" loading="lazy"></p>`,46),l=[t];function d(c,o){return s(),e("div",null,l)}const p=n(i,[["render",d],["__file","android-js-call-android.html.vue"]]);export{p as default};
