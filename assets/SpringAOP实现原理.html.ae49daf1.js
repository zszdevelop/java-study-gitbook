import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";import{o as p,c as o,a as n,b as a,w as r,e,d as s,r as i}from"./app.5d5ee434.js";const d={},u=e('<h1 id="spring-aop\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#spring-aop\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> Spring AOP\u5B9E\u73B0\u539F\u7406</h1><h2 id="_1-\u4EE3\u7406\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u4EE3\u7406\u6A21\u5F0F" aria-hidden="true">#</a> 1. \u4EE3\u7406\u6A21\u5F0F</h2><p>\u4EE3\u7406\u6A21\u5F0FUML \u7C7B\u56FE\u5982\u4E0B</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011005747639.png" alt="image-20191011005747639"></p>',4),v=n("p",null,"\u7C7B\u56FE\u4E2D\u865A\u7EBF\u7BAD\u5934\u8868\u793A\u63A5\u53E3\u5B9E\u73B0",-1),m=n("p",null,"\u83F1\u5F62\u548C\u7BAD\u5934\u8868\u793A\u7EC4\u5408",-1),b=s("\u5177\u4F53\u53C2\u8003"),k=s("uml\u7C7B\u56FE"),g=e(`<p>\u4EE3\u7406\u7C7B\u5B9E\u73B0\u4E86\u88AB\u4EE3\u7406\u7C7B\u7684\u63A5\u53E3\uFF0C\u540C\u65F6\u4E0E\u88AB\u4EE3\u7406\u7C7B\u662F\u7EC4\u5408\u5173\u7CFB\u3002\u4E0B\u9762\u770B\u4E00\u4E0B\u4EE3\u7406\u6A21\u5F0F\u7684\u5B9E\u73B0</p><h2 id="_2-\u9759\u6001\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_2-\u9759\u6001\u4EE3\u7406" aria-hidden="true">#</a> 2. \u9759\u6001\u4EE3\u7406</h2><p>\u63A5\u53E3\u7C7B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>interface Person {
    void speak();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u771F\u5B9E\u5B9E\u4F53\u7C7B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class Actor implements Person {
    private String content;
    public Actor(String content) {
        this.content = content;
    }

    @Override
    public void speak() {
        System.out.println(this.content);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE3\u7406\u7C7B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class Agent implements Person {
    private Actor actor;
    private String before;
    private String after;
    public Agent(Actor actor, String before, String after) {
        this.actor = actor;
        this.before = before;
        this.after = after;
    }
    @Override
    public void speak() {
        //before speak
        System.out.println(&quot;Before actor speak, Agent say: &quot; + before);
        //real speak
        this.actor.speak();
        //after speak
        System.out.println(&quot;After actor speak, Agent say: &quot; + after);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6D4B\u8BD5\u65B9\u6CD5:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class StaticProxy {
    public static void main(String[] args) {
        Actor actor = new Actor(&quot;I am a famous actor!&quot;);
        Agent agent = new Agent(actor, &quot;Hello I am an agent.&quot;, &quot;That&#39;s all!&quot;);
        agent.speak();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7ED3\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011010421666.png" alt="image-20191011010421666"></p><h2 id="_3-\u52A8\u6001\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_3-\u52A8\u6001\u4EE3\u7406" aria-hidden="true">#</a> 3.\u52A8\u6001\u4EE3\u7406</h2><h3 id="_3-1-jdk\u81EA\u5E26\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-1-jdk\u81EA\u5E26\u65B9\u6CD5" aria-hidden="true">#</a> 3.1 JDK\u81EA\u5E26\u65B9\u6CD5</h3><h4 id="_3-1-1-invocationhandler\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#_3-1-1-invocationhandler\u63A5\u53E3" aria-hidden="true">#</a> 3.1.1 InvocationHandler\u63A5\u53E3</h4><p>InvocationHandler\u63A5\u53E3\u662F\u6700\u6838\u5FC3\u7684\u63A5\u53E3</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface InvocationHandler {
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u5BF9\u4E8E\u88AB\u4EE3\u7406\u7684\u7C7B\u7684\u64CD\u4F5C\u90FD\u4F1A\u7531\u8BE5\u63A5\u53E3\u4E2D\u7684invoke\u65B9\u6CD5\u5B9E\u73B0\uFF0C\u5176\u4E2D\u7684\u53C2\u6570\u7684\u542B\u4E49\u5206\u522B\u662F\uFF1A</p><ul><li>proxy\uFF1A\u88AB\u4EE3\u7406\u7684\u7C7B\u7684\u5B9E\u4F8B</li><li>method\uFF1A\u8C03\u7528\u88AB\u4EE3\u7406\u7684\u7C7B\u7684\u65B9\u6CD5</li><li>args\uFF1A\u8BE5\u65B9\u6CD5\u9700\u8981\u7684\u53C2\u6570</li></ul><p><strong>\u4F7F\u7528\u65B9\u6CD5</strong></p><p>\u4F7F\u7528\u65B9\u6CD5\u9996\u5148\u662F\u9700\u8981\u5B9E\u73B0\u8BE5\u63A5\u53E3\uFF0C\u5E76\u4E14\u6211\u4EEC\u53EF\u4EE5\u5728invoke\u65B9\u6CD5\u4E2D\u8C03\u7528\u88AB\u4EE3\u7406\u7C7B\u7684\u65B9\u6CD5\u5E76\u83B7\u5F97\u8FD4\u56DE\u503C\uFF0C\u81EA\u7136\u4E5F\u53EF\u4EE5\u5728\u8C03\u7528\u8BE5\u65B9\u6CD5\u7684\u524D\u540E\u53BB\u505A\u4E00\u4E9B\u989D\u5916\u7684\u4E8B\u60C5\uFF0C\u4ECE\u800C\u5B9E\u73B0\u52A8\u6001\u4EE3\u7406</p><h4 id="_3-1-2-proxy\u7C7B\u7684newproxyinstance\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-1-2-proxy\u7C7B\u7684newproxyinstance\u65B9\u6CD5" aria-hidden="true">#</a> 3.1.2 Proxy\u7C7B\u7684newProxyInstance\u65B9\u6CD5</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static Object newProxyInstance(ClassLoader loader,
                                      Class&lt;?&gt;[] interfaces,
                                      InvocationHandler h)
    throws IllegalArgumentException
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2D\u7684\u53C2\u6570\u542B\u4E49\u5982\u4E0B\uFF1A</p><ul><li>loader\uFF1A\u88AB\u4EE3\u7406\u7684\u7C7B\u7684\u7C7B\u52A0\u8F7D\u5668</li><li>interfaces\uFF1A\u88AB\u4EE3\u7406\u7C7B\u7684\u63A5\u53E3\u6570\u7EC4</li><li>invocationHandler\uFF1A\u5C31\u662F\u521A\u521A\u4ECB\u7ECD\u7684\u8C03\u7528\u5904\u7406\u5668\u7C7B\u7684\u5BF9\u8C61\u5B9E\u4F8B</li></ul><p>\u8BE5\u65B9\u6CD5\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u88AB\u4FEE\u6539\u8FC7\u7684\u7C7B\u7684\u5B9E\u4F8B\uFF0C\u4ECE\u800C\u53EF\u4EE5\u81EA\u7531\u7684\u8C03\u7528\u8BE5\u5B9E\u4F8B\u7684\u65B9\u6CD5\u3002\u4E0B\u9762\u662F\u4E00\u4E2A\u5B9E\u9645\u4F8B\u5B50\u3002</p><h4 id="_3-1-3-jdk\u81EA\u52A8\u4EE3\u7406\u5B9E\u9645\u4F8B\u5B50" tabindex="-1"><a class="header-anchor" href="#_3-1-3-jdk\u81EA\u52A8\u4EE3\u7406\u5B9E\u9645\u4F8B\u5B50" aria-hidden="true">#</a> 3.1.3 JDK\u81EA\u52A8\u4EE3\u7406\u5B9E\u9645\u4F8B\u5B50</h4><p>Fruit\u63A5\u53E3\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface Fruit {
    public void show();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Apple\u5B9E\u73B0Fruit\u63A5\u53E3\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Apple implements Fruit{
    @Override
    public void show() {
        System.out.println(&quot;&lt;&lt;&lt;&lt;show method is invoked&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE3\u7406\u7C7BAgent.java\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class DynamicAgent {

    //\u5B9E\u73B0InvocationHandler\u63A5\u53E3\uFF0C\u5E76\u4E14\u53EF\u4EE5\u521D\u59CB\u5316\u88AB\u4EE3\u7406\u7C7B\u7684\u5BF9\u8C61
    static class MyHandler implements InvocationHandler {
        private Object proxy;
        public MyHandler(Object proxy) {
            this.proxy = proxy;
        }
            
        //\u81EA\u5B9A\u4E49invoke\u65B9\u6CD5
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println(&quot;&gt;&gt;&gt;&gt;before invoking&quot;);
            //\u771F\u6B63\u8C03\u7528\u65B9\u6CD5\u7684\u5730\u65B9
            Object ret = method.invoke(this.proxy, args);
            System.out.println(&quot;&gt;&gt;&gt;&gt;after invoking&quot;);
            return ret;
        }
    }

    //\u8FD4\u56DE\u4E00\u4E2A\u88AB\u4FEE\u6539\u8FC7\u7684\u5BF9\u8C61
    public static Object agent(Class interfaceClazz, Object proxy) {
        return Proxy.newProxyInstance(interfaceClazz.getClassLoader(), new Class[]{interfaceClazz},
                new MyHandler(proxy));
    }    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6D4B\u8BD5\u7C7B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class ReflectTest {
    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
        //\u6CE8\u610F\u4E00\u5B9A\u8981\u8FD4\u56DE\u63A5\u53E3\uFF0C\u4E0D\u80FD\u8FD4\u56DE\u5B9E\u73B0\u7C7B\u5426\u5219\u4F1A\u62A5\u9519
        Fruit fruit = (Fruit) DynamicAgent.agent(Fruit.class, new Apple());
        fruit.show();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7ED3\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011011313856.png" alt="image-20191011011313856"></p><p>\u53EF\u4EE5\u770B\u5230\u5BF9\u4E8E\u4E0D\u540C\u7684\u5B9E\u73B0\u7C7B\u6765\u8BF4\uFF0C\u53EF\u4EE5\u7528\u540C\u4E00\u4E2A\u52A8\u6001\u4EE3\u7406\u7C7B\u6765\u8FDB\u884C\u4EE3\u7406\uFF0C\u5B9E\u73B0\u4E86\u201C\u4E00\u6B21\u7F16\u5199\u5230\u5904\u4EE3\u7406\u201D\u7684\u6548\u679C\u3002\u4F46\u662F\u8FD9\u79CD\u65B9\u6CD5\u6709\u4E2A\u7F3A\u70B9\uFF0C\u5C31\u662F\u88AB\u4EE3\u7406\u7684\u7C7B\u4E00\u5B9A\u8981\u662F\u5B9E\u73B0\u4E86\u67D0\u4E2A\u63A5\u53E3\u7684\uFF0C\u8FD9\u5F88\u5927\u7A0B\u5EA6\u9650\u5236\u4E86\u672C\u65B9\u6CD5\u7684\u4F7F\u7528\u573A\u666F\u3002\u4E0B\u9762\u8FD8\u6709\u53E6\u5916\u4E00\u4E2A\u4F7F\u7528\u4E86CGlib\u589E\u5F3A\u5E93\u7684\u65B9\u6CD5\u3002</p><h3 id="_3-2-cglib-\u5E93\u7684\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-2-cglib-\u5E93\u7684\u65B9\u6CD5" aria-hidden="true">#</a> 3.2 CGLIB \u5E93\u7684\u65B9\u6CD5</h3>`,39),h={href:"https://github.com/cglib/cglib",target:"_blank",rel:"noopener noreferrer"},x=s("CGlib"),y=s("\u662F\u4E00\u4E2A\u5B57\u8282\u7801\u589E\u5F3A\u5E93\uFF0C\u4E3AAOP\u7B49\u63D0\u4F9B\u4E86\u5E95\u5C42\u652F\u6301\u3002\u4E0B\u9762\u770B\u770B\u5B83\u662F\u600E\u4E48\u5B9E\u73B0\u52A8\u6001\u4EE3\u7406\u7684\u3002"),f=e(`<div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>aopdemo<span class="token punctuation">.</span>case2<span class="token punctuation">.</span></span><span class="token class-name">Apple</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>proxy<span class="token punctuation">.</span></span><span class="token class-name">Enhancer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>proxy<span class="token punctuation">.</span></span><span class="token class-name">MethodInterceptor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>proxy<span class="token punctuation">.</span></span><span class="token class-name">MethodProxy</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token class-name">Method</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> zhangshengzhong
 * <span class="token keyword">@date</span> 2019/10/11
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CGlibAgent</span> <span class="token keyword">implements</span> <span class="token class-name">MethodInterceptor</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Object</span> proxy<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token class-name">Object</span> proxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>proxy <span class="token operator">=</span> proxy<span class="token punctuation">;</span>
        <span class="token class-name">Enhancer</span> enhancer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Enhancer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        enhancer<span class="token punctuation">.</span><span class="token function">setSuperclass</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>proxy<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u56DE\u8C03\u65B9\u6CD5</span>
        enhancer<span class="token punctuation">.</span><span class="token function">setCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u521B\u5EFA\u4EE3\u7406\u5BF9\u8C61</span>
        <span class="token keyword">return</span> enhancer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u56DE\u8C03\u65B9\u6CD5</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">intercept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> objects<span class="token punctuation">,</span> <span class="token class-name">MethodProxy</span> methodProxy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;&gt;&gt;&gt;before invoking&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//\u771F\u6B63\u8C03\u7528</span>
        <span class="token class-name">Object</span> ret <span class="token operator">=</span> methodProxy<span class="token punctuation">.</span><span class="token function">invokeSuper</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> objects<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;&gt;&gt;&gt;after invoking&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CGlibAgent</span> cGlibAgent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CGlibAgent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Apple</span> apple <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Apple</span><span class="token punctuation">)</span> cGlibAgent<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Apple</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        apple<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011011509222.png" alt="image-20191011011509222"></p><p>\u53EF\u4EE5\u770B\u5230\u7ED3\u679C\u548CJDK\u52A8\u6001\u4EE3\u7406\u662F\u4E00\u6837\u7684\uFF0C\u4F46\u662F\u53EF\u4EE5\u76F4\u63A5\u5BF9\u5B9E\u73B0\u7C7B\u8FDB\u884C\u64CD\u4F5C\u800C\u975E\u63A5\u53E3\uFF0C\u8FD9\u6837\u4F1A\u6709\u5F88\u5927\u7684\u4FBF\u5229\u3002</p><h3 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h3>`,4),_={href:"https://www.cnblogs.com/puyangsky/p/6218925.html",target:"_blank",rel:"noopener noreferrer"},w=s("Spring AOP\u5B9E\u73B0\u539F\u7406"),A=s("spring/aop/SpringAOP\u5B9E\u73B0\u539F\u7406.md");function j(O,z){const l=i("RouterLink"),t=i("ExternalLinkIcon");return p(),o("div",null,[u,n("blockquote",null,[v,m,n("p",null,[b,a(l,{to:"/dependencies/C1spring/aop/cs/uml/"},{default:r(()=>[k]),_:1})])]),g,n("p",null,[n("a",h,[x,a(t)]),y]),f,n("p",null,[n("a",_,[w,a(t)]),A])])}var I=c(d,[["render",j],["__file","SpringAOP\u5B9E\u73B0\u539F\u7406.html.vue"]]);export{I as default};
