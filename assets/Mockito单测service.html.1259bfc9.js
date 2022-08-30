import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.24aaacd5.js";const t={},c=e(`<h1 id="mockito\u5355\u6D4Bservice" tabindex="-1"><a class="header-anchor" href="#mockito\u5355\u6D4Bservice" aria-hidden="true">#</a> Mockito\u5355\u6D4Bservice</h1><ul><li><p>Mock\u58F0\u660E\u7684\u5BF9\u8C61\uFF0C\u5BF9\u51FD\u6570\u7684\u8C03\u7528\u5747\u6267\u884Cmock\uFF08\u5373\u865A\u5047\u51FD\u6570\uFF09\uFF0C\u4E0D\u6267\u884C\u771F\u6B63\u90E8\u5206\u3002</p></li><li><p>Spy\u58F0\u660E\u7684\u5BF9\u8C61\uFF0C\u5BF9\u51FD\u6570\u7684\u8C03\u7528\u5747\u6267\u884C\u771F\u6B63\u90E8\u5206\u3002</p></li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PushControllerTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Spy</span>
    <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@InjectMocks</span>
    <span class="token keyword">private</span> <span class="token class-name">PushServiceImpl</span> pushService<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Before</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">MockitoAnnotations</span><span class="token punctuation">.</span><span class="token function">initMocks</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        pushService<span class="token punctuation">.</span><span class="token function">sendVersionUpdatePush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[c];function i(p,l){return s(),a("div",null,o)}var r=n(t,[["render",i],["__file","Mockito\u5355\u6D4Bservice.html.vue"]]);export{r as default};
