# Android调用js方法

本文参考[博客原文](<https://www.jianshu.com/p/345f4d8a5cfa>)整理，并对他进行补充扩展，并对原文深表感谢。



对于Android调用JS代码的方法有2种：

1. 通过`WebView`的`loadUrl（）`
2. 通过`WebView`的`evaluateJavascript（）`

##方式1：通过`WebView`的`loadUrl（）`

**步骤1：将需要调用的JS代码以.html格式放到src/main/assets文件夹里**

*需要加载JS代码：javascript.html*

```
// 文本名：javascript
<!DOCTYPE html>
<html>

   <head>
      <meta charset="utf-8">
      <title>Carson_Ho</title>
      
// JS代码
     <script>
// Android需要调用的方法
   function callJS(){
      alert("Android调用了JS的callJS方法");
   }
</script>

   </head>

</html>
```

**步骤2：在Android里通过WebView设置调用JS代码**

```
public class MainActivity extends AppCompatActivity {

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
        mWebView.loadUrl("file:///android_asset/javascript.html");

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
                        mWebView.loadUrl("javascript:callJS()");
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
                b.setTitle("Alert");
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
```

![效果如图所示](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-826d0aa065f70cb1.png)

**特别注意：JS代码调用一定要在 onPageFinished（） 回调之后才能调用，否则不会调用。**

> `onPageFinished()`属于WebViewClient类的方法，主要在页面加载结束时调用

##方式2：通过`WebView`的`evaluateJavascript（）`

- 优点：该方法比第一种方法效率更高、使用更简洁。

> 1. 因为该方法的执行不会使页面刷新，而第一种方法（loadUrl ）的执行则会。
> 2. Android 4.4 后才可使用

- 具体使用

```
// 只需要将第一种方法的loadUrl()换成下面该方法即可
    mWebView.evaluateJavascript（"javascript:callJS()", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String value) {
            //此处为 js 返回的结果
        }
    });
}
```

## 方法对比

![方法对比](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/944365-30f095d4c9e638fd.png)

## 使用建议

两种方法混合使用，即Android 4.4以下使用方法1，Android 4.4以上方法2

```
// Android版本变量
final int version = Build.VERSION.SDK_INT;
// 因为该方法在 Android 4.4 版本才可使用，所以使用时需进行版本判断
if (version < 18) {
    mWebView.loadUrl("javascript:callJS()");
} else {
    mWebView.evaluateJavascript（"javascript:callJS()", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String value) {
            //此处为 js 返回的结果
        }
    });
}
```
