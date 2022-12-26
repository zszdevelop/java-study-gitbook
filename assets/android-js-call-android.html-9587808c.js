import{_ as n,W as s,X as e,a0 as a}from"./framework-0cf5f349.js";const i={},t=a(`<h1 id="js调用android方法" tabindex="-1"><a class="header-anchor" href="#js调用android方法" aria-hidden="true">#</a> js调用Android方法</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>对于JS调用Android代码的方法有3种：</p><ol><li>通过<code>WebView</code>的<code>addJavascriptInterface（）</code>进行对象映射</li><li>通过 <code>WebViewClient</code> 的<code>shouldOverrideUrlLoading ()</code>方法回调拦截 url</li><li>通过 <code>WebChromeClient</code> 的<code>onJsAlert()</code>、<code>onJsConfirm()</code>、<code>onJsPrompt（）</code>方法回调拦截JS对话框<code>alert()</code>、<code>confirm()</code>、<code>prompt（）</code> 消息</li></ol><h2 id="_2-三种方法实现" tabindex="-1"><a class="header-anchor" href="#_2-三种方法实现" aria-hidden="true">#</a> 2. 三种方法实现</h2><h3 id="_2-1-方式1-通过-webview的addjavascriptinterface-进行对象映射" tabindex="-1"><a class="header-anchor" href="#_2-1-方式1-通过-webview的addjavascriptinterface-进行对象映射" aria-hidden="true">#</a> 2.1 方式1：通过 <code>WebView</code>的<code>addJavascriptInterface（）</code>进行对象映射</h3><p><strong>步骤1：定义一个与JS对象映射关系的Android类：AndroidtoJs</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 继承自Object类
public class AndroidtoJs extends Object {

    // 定义JS需要调用的方法
    // 被JS调用的方法必须加入@JavascriptInterface注解
    @JavascriptInterface
    public void hello(String msg) {
        System.out.println(&quot;JS调用了Android的hello方法&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤2：将需要调用的JS代码以.html格式放到src/main/assets文件夹里</strong></p><p><strong>app端和前端需要约定两个配置</strong></p><ul><li>js函数前缀（本例：test）</li><li>和对应调用函数（本例：hello()）</li></ul><p><em>需要加载JS代码：javascript.html</em></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>utf-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Carson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>  
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
         
        
         <span class="token keyword">function</span> <span class="token function">callAndroid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 由于对象映射，所以调用test对象等于调用Android映射的对象</span>
            test<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">&quot;js调用了android中的hello方法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
      //点击按钮则调用callAndroid函数
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button1<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value javascript language-javascript"><span class="token function">callAndroid</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如在vue中也是一样的写法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">callApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        test<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">&quot;哈哈，我是js调用的&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤3：在Android里通过WebView设置Android类与JS代码的映射**</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainActivity</span> <span class="token keyword">extends</span> <span class="token class-name">AppCompatActivity</span> <span class="token punctuation">{</span>

    <span class="token class-name">WebView</span> mWebView<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token class-name">Bundle</span> savedInstanceState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setContentView</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_main<span class="token punctuation">)</span><span class="token punctuation">;</span>

        mWebView <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">WebView</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>webview<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">WebSettings</span> webSettings <span class="token operator">=</span> mWebView<span class="token punctuation">.</span><span class="token function">getSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置与Js交互的权限</span>
        webSettings<span class="token punctuation">.</span><span class="token function">setJavaScriptEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 通过addJavascriptInterface()将Java对象映射到JS对象</span>
        <span class="token comment">//参数1：Javascript对象名</span>
        <span class="token comment">//参数2：Java对象名</span>
        mWebView<span class="token punctuation">.</span><span class="token function">addJavascriptInterface</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AndroidtoJs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//AndroidtoJS类对象映射到js的test对象</span>

        <span class="token comment">// 加载JS代码</span>
        <span class="token comment">// 格式规定为:file:///android_asset/文件名.html</span>
        mWebView<span class="token punctuation">.</span><span class="token function">loadUrl</span><span class="token punctuation">(</span><span class="token string">&quot;file:///android_asset/javascript.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-1-方式1-特点" tabindex="-1"><a class="header-anchor" href="#_2-1-1-方式1-特点" aria-hidden="true">#</a> 2.1.1 方式1 特点</h4><ul><li>优点：使用简单</li><li>缺点：存在严重的漏洞问题</li></ul><h3 id="_2-2-方式2-通过-webviewclient-的方法shouldoverrideurlloading-回调拦截-url" tabindex="-1"><a class="header-anchor" href="#_2-2-方式2-通过-webviewclient-的方法shouldoverrideurlloading-回调拦截-url" aria-hidden="true">#</a> 2.2 方式2：通过 <code>WebViewClient</code> 的方法<code>shouldOverrideUrlLoading ()</code>回调拦截 url</h3><ul><li>具体原理：</li></ul><ol><li>Android通过 <code>WebViewClient</code> 的回调方法<code>shouldOverrideUrlLoading ()</code>拦截 url</li><li>解析该 url 的协议</li><li>如果检测到是预先约定好的协议，就调用相应方法</li></ol><blockquote><p>即JS需要调用Android的方法</p></blockquote><ul><li>具体使用： **步骤1：**在JS约定所需要的Url协议</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;

   &lt;head&gt;
      &lt;meta charset=&quot;utf-8&quot;&gt;
      &lt;title&gt;Carson_Ho&lt;/title&gt;
      
     &lt;script&gt;
         function callAndroid(){
            /*约定的url协议为：js://webview?arg1=111&amp;arg2=222*/
            document.location = &quot;js://webview?arg1=111&amp;arg2=222&quot;;
         }
      &lt;/script&gt;
&lt;/head&gt;

&lt;!-- 点击按钮则调用callAndroid（）方法  --&gt;
   &lt;body&gt;
     &lt;button type=&quot;button&quot; id=&quot;button1&quot; onclick=&quot;callAndroid()&quot;&gt;点击调用Android代码&lt;/button&gt;
   &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当该JS通过Android的<code>mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;)</code>加载后，就会回调<code>shouldOverrideUrlLoading （）</code></p><p><strong>步骤2：在Android通过WebViewClient复写shouldOverrideUrlLoading （）</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {

    WebView mWebView;
//    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webview);

        WebSettings webSettings = mWebView.getSettings();

        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        // 步骤1：加载JS代码
        // 格式规定为:file:///android_asset/文件名.html
        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);


// 复写WebViewClient类的shouldOverrideUrlLoading方法
mWebView.setWebViewClient(new WebViewClient() {
                                      @Override
                                      public boolean shouldOverrideUrlLoading(WebView view, String url) {

                                          // 步骤2：根据协议的参数，判断是否是所需要的url
                                          // 一般根据scheme（协议格式） &amp; authority（协议名）判断（前两个参数）
                                          //假定传入进来的 url = &quot;js://webview?arg1=111&amp;arg2=222&quot;（同时也是约定好的需要拦截的）

                                          Uri uri = Uri.parse(url);                                 
                                          // 如果url的协议 = 预先约定的 js 协议
                                          // 就解析往下解析参数
                                          if ( uri.getScheme().equals(&quot;js&quot;)) {

                                              // 如果 authority  = 预先约定协议里的 webview，即代表都符合约定的协议
                                              // 所以拦截url,下面JS开始调用Android需要的方法
                                              if (uri.getAuthority().equals(&quot;webview&quot;)) {

                                                 //  步骤3：
                                                  // 执行JS所需要调用的逻辑
                                                  System.out.println(&quot;js调用了Android的方法&quot;);
                                                  // 可以在协议上带有参数并传递到Android上
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-1-方式2-特点" tabindex="-1"><a class="header-anchor" href="#_2-2-1-方式2-特点" aria-hidden="true">#</a> 2.2.1 方式2 特点</h4><ul><li>优点：不存在方式1的漏洞；</li><li>缺点：JS获取Android方法的返回值复杂。</li></ul><blockquote><p>如果JS想要得到Android方法的返回值，只能通过 WebView 的 <code>loadUrl （）</code>去执行 JS 方法把返回值传递回去，相关的代码如下：</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Android：MainActivity.java
mWebView.loadUrl(&quot;javascript:returnResult(&quot; + result + &quot;)&quot;);

// JS：javascript.html
function returnResult(result){
    alert(&quot;result is&quot; + result);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-方式3-通过-webchromeclient-的onjsalert-、onjsconfirm-、onjsprompt-方法回调拦截js对话框alert-、confirm-、prompt-消息" tabindex="-1"><a class="header-anchor" href="#_2-3-方式3-通过-webchromeclient-的onjsalert-、onjsconfirm-、onjsprompt-方法回调拦截js对话框alert-、confirm-、prompt-消息" aria-hidden="true">#</a> 2.3 方式3：通过 <code>WebChromeClient</code> 的<code>onJsAlert()</code>、<code>onJsConfirm()</code>、<code>onJsPrompt（）</code>方法回调拦截JS对话框<code>alert()</code>、<code>confirm()</code>、<code>prompt（）</code> 消息</h3><p>在JS中，有三个常用的对话框方法：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-1385f748618af886.png" alt="944365-1385f748618af886" tabindex="0" loading="lazy"><figcaption>944365-1385f748618af886</figcaption></figure><p>方式3的原理：Android通过 <code>WebChromeClient</code> 的<code>onJsAlert()</code>、<code>onJsConfirm()</code>、<code>onJsPrompt（）</code>方法回调分别拦截JS对话框 （即上述三个方法），得到他们的消息内容，然后解析即可。</p><p>下面的例子将用**拦截 JS的输入框（即prompt（）方法）**说明 ：</p><blockquote><ol><li>常用的拦截是：拦截 JS的输入框（即<code>prompt（）</code>方法）</li><li>因为只有<code>prompt（）</code>可以返回任意类型的值，操作最全面方便、更加灵活；而alert（）对话框没有返回值；confirm（）对话框只能返回两种状态（确定 / 取消）两个值</li></ol></blockquote><p><strong>步骤1：加载JS代码，如下：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
   &lt;head&gt;
      &lt;meta charset=&quot;utf-8&quot;&gt;
      &lt;title&gt;Carson_Ho&lt;/title&gt;
      
     &lt;script&gt;
        
    function clickprompt(){
    // 调用prompt（）
    var result=prompt(&quot;js://demo?arg1=111&amp;arg2=222&quot;);
    alert(&quot;demo &quot; + result);
}

      &lt;/script&gt;
&lt;/head&gt;

&lt;!-- 点击按钮则调用clickprompt()  --&gt;
   &lt;body&gt;
     &lt;button type=&quot;button&quot; id=&quot;button1&quot; onclick=&quot;clickprompt()&quot;&gt;点击调用Android代码&lt;/button&gt;
   &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用<code>mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;)</code>加载了上述JS代码后，就会触发回调<code>onJsPrompt（）</code>，具体如下：</p><blockquote><ol><li>如果是拦截警告框（即<code>alert()</code>），则触发回调<code>onJsAlert（）</code>；</li><li>如果是拦截确认框（即<code>confirm()</code>），则触发回调<code>onJsConfirm（）</code>；</li></ol></blockquote><p><strong>步骤2：在Android通过WebChromeClient复写onJsPrompt（）</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class MainActivity extends AppCompatActivity {

    WebView mWebView;
//    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webview);

        WebSettings webSettings = mWebView.getSettings();

        // 设置与Js交互的权限
        webSettings.setJavaScriptEnabled(true);
        // 设置允许JS弹窗
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

// 先加载JS代码
        // 格式规定为:file:///android_asset/文件名.html
        mWebView.loadUrl(&quot;file:///android_asset/javascript.html&quot;);


        mWebView.setWebChromeClient(new WebChromeClient() {
                                        // 拦截输入框(原理同方式2)
                                        // 参数message:代表promt（）的内容（不是url）
                                        // 参数result:代表输入框的返回值
                                        @Override
                                        public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
                                            // 根据协议的参数，判断是否是所需要的url(原理同方式2)
                                            // 一般根据scheme（协议格式） &amp; authority（协议名）判断（前两个参数）
                                            //假定传入进来的 url = &quot;js://webview?arg1=111&amp;arg2=222&quot;（同时也是约定好的需要拦截的）

                                            Uri uri = Uri.parse(message);
                                            // 如果url的协议 = 预先约定的 js 协议
                                            // 就解析往下解析参数
                                            if ( uri.getScheme().equals(&quot;js&quot;)) {

                                                // 如果 authority  = 预先约定协议里的 webview，即代表都符合约定的协议
                                                // 所以拦截url,下面JS开始调用Android需要的方法
                                                if (uri.getAuthority().equals(&quot;webview&quot;)) {

                                                    //
                                                    // 执行JS所需要调用的逻辑
                                                    System.out.println(&quot;js调用了Android的方法&quot;);
                                                    // 可以在协议上带有参数并传递到Android上
                                                    HashMap&lt;String, String&gt; params = new HashMap&lt;&gt;();
                                                    Set&lt;String&gt; collection = uri.getQueryParameterNames();

                                                    //参数result:代表消息框的返回值(输入值)
                                                    result.confirm(&quot;js调用了Android的方法成功啦&quot;);
                                                }
                                                return true;
                                            }
                                            return super.onJsPrompt(view, url, message, defaultValue, result);
                                        }

// 通过alert()和confirm()拦截的原理相同，此处不作过多讲述

                                        // 拦截JS的警告框
                                        @Override
                                        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                                            return super.onJsAlert(view, url, message, result);
                                        }

                                        // 拦截JS的确认框
                                        @Override
                                        public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
                                            return super.onJsConfirm(view, url, message, result);
                                        }
                                    }
        );


            }

        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-三种方式的对比-使用场景" tabindex="-1"><a class="header-anchor" href="#_3-三种方式的对比-使用场景" aria-hidden="true">#</a> 3. 三种方式的对比 &amp; 使用场景</h2><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-8c91481325a5253e.png" alt="944365-8c91481325a5253e" tabindex="0" loading="lazy"><figcaption>944365-8c91481325a5253e</figcaption></figure>`,46),l=[t];function d(c,o){return s(),e("div",null,l)}const r=n(i,[["render",d],["__file","android-js-call-android.html.vue"]]);export{r as default};
