import{_ as c,W as p,X as o,Y as n,Z as s,$ as a,a1 as r,a0 as e,D as t}from"./framework-0cf5f349.js";const d={},u=e('<h1 id="spring-aop实现原理" tabindex="-1"><a class="header-anchor" href="#spring-aop实现原理" aria-hidden="true">#</a> Spring AOP实现原理</h1><h2 id="_1-代理模式" tabindex="-1"><a class="header-anchor" href="#_1-代理模式" aria-hidden="true">#</a> 1. 代理模式</h2><p>代理模式UML 类图如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011005747639.png" alt="image-20191011005747639" tabindex="0" loading="lazy"><figcaption>image-20191011005747639</figcaption></figure>',4),v=n("p",null,"类图中虚线箭头表示接口实现",-1),m=n("p",null,"菱形和箭头表示组合",-1),b=e(`<p>代理类实现了被代理类的接口，同时与被代理类是组合关系。下面看一下代理模式的实现</p><h2 id="_2-静态代理" tabindex="-1"><a class="header-anchor" href="#_2-静态代理" aria-hidden="true">#</a> 2. 静态代理</h2><p>接口类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>interface Person {
    void speak();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>真实实体类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Actor implements Person {
    private String content;
    public Actor(String content) {
        this.content = content;
    }

    @Override
    public void speak() {
        System.out.println(this.content);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代理类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Agent implements Person {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试方法:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class StaticProxy {
    public static void main(String[] args) {
        Actor actor = new Actor(&quot;I am a famous actor!&quot;);
        Agent agent = new Agent(actor, &quot;Hello I am an agent.&quot;, &quot;That&#39;s all!&quot;);
        agent.speak();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011010421666.png" alt="image-20191011010421666" tabindex="0" loading="lazy"><figcaption>image-20191011010421666</figcaption></figure><h2 id="_3-动态代理" tabindex="-1"><a class="header-anchor" href="#_3-动态代理" aria-hidden="true">#</a> 3.动态代理</h2><h3 id="_3-1-jdk自带方法" tabindex="-1"><a class="header-anchor" href="#_3-1-jdk自带方法" aria-hidden="true">#</a> 3.1 JDK自带方法</h3><h4 id="_3-1-1-invocationhandler接口" tabindex="-1"><a class="header-anchor" href="#_3-1-1-invocationhandler接口" aria-hidden="true">#</a> 3.1.1 InvocationHandler接口</h4><p>InvocationHandler接口是最核心的接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface InvocationHandler {
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对于被代理的类的操作都会由该接口中的invoke方法实现，其中的参数的含义分别是：</p><ul><li>proxy：被代理的类的实例</li><li>method：调用被代理的类的方法</li><li>args：该方法需要的参数</li></ul><p><strong>使用方法</strong></p><p>使用方法首先是需要实现该接口，并且我们可以在invoke方法中调用被代理类的方法并获得返回值，自然也可以在调用该方法的前后去做一些额外的事情，从而实现动态代理</p><h4 id="_3-1-2-proxy类的newproxyinstance方法" tabindex="-1"><a class="header-anchor" href="#_3-1-2-proxy类的newproxyinstance方法" aria-hidden="true">#</a> 3.1.2 Proxy类的newProxyInstance方法</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static Object newProxyInstance(ClassLoader loader,
                                      Class&lt;?&gt;[] interfaces,
                                      InvocationHandler h)
    throws IllegalArgumentException
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的参数含义如下：</p><ul><li>loader：被代理的类的类加载器</li><li>interfaces：被代理类的接口数组</li><li>invocationHandler：就是刚刚介绍的调用处理器类的对象实例</li></ul><p>该方法会返回一个被修改过的类的实例，从而可以自由的调用该实例的方法。下面是一个实际例子。</p><h4 id="_3-1-3-jdk自动代理实际例子" tabindex="-1"><a class="header-anchor" href="#_3-1-3-jdk自动代理实际例子" aria-hidden="true">#</a> 3.1.3 JDK自动代理实际例子</h4><p>Fruit接口：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface Fruit {
    public void show();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Apple实现Fruit接口：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Apple implements Fruit{
    @Override
    public void show() {
        System.out.println(&quot;&lt;&lt;&lt;&lt;show method is invoked&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代理类Agent.java：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class DynamicAgent {

    //实现InvocationHandler接口，并且可以初始化被代理类的对象
    static class MyHandler implements InvocationHandler {
        private Object proxy;
        public MyHandler(Object proxy) {
            this.proxy = proxy;
        }
            
        //自定义invoke方法
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            System.out.println(&quot;&gt;&gt;&gt;&gt;before invoking&quot;);
            //真正调用方法的地方
            Object ret = method.invoke(this.proxy, args);
            System.out.println(&quot;&gt;&gt;&gt;&gt;after invoking&quot;);
            return ret;
        }
    }

    //返回一个被修改过的对象
    public static Object agent(Class interfaceClazz, Object proxy) {
        return Proxy.newProxyInstance(interfaceClazz.getClassLoader(), new Class[]{interfaceClazz},
                new MyHandler(proxy));
    }    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ReflectTest {
    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
        //注意一定要返回接口，不能返回实现类否则会报错
        Fruit fruit = (Fruit) DynamicAgent.agent(Fruit.class, new Apple());
        fruit.show();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011011313856.png" alt="image-20191011011313856" tabindex="0" loading="lazy"><figcaption>image-20191011011313856</figcaption></figure><p>可以看到对于不同的实现类来说，可以用同一个动态代理类来进行代理，实现了“一次编写到处代理”的效果。但是这种方法有个缺点，就是被代理的类一定要是实现了某个接口的，这很大程度限制了本方法的使用场景。下面还有另外一个使用了CGlib增强库的方法。</p><h3 id="_3-2-cglib-库的方法" tabindex="-1"><a class="header-anchor" href="#_3-2-cglib-库的方法" aria-hidden="true">#</a> 3.2 CGLIB 库的方法</h3>`,39),k={href:"https://github.com/cglib/cglib",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>zszdevelop<span class="token punctuation">.</span>aopdemo<span class="token punctuation">.</span>case2<span class="token punctuation">.</span></span><span class="token class-name">Apple</span></span><span class="token punctuation">;</span>
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
        <span class="token comment">// 回调方法</span>
        enhancer<span class="token punctuation">.</span><span class="token function">setCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建代理对象</span>
        <span class="token keyword">return</span> enhancer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//回调方法</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">intercept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> objects<span class="token punctuation">,</span> <span class="token class-name">MethodProxy</span> methodProxy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;&gt;&gt;&gt;before invoking&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//真正调用</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191011011509222.png" alt="image-20191011011509222" tabindex="0" loading="lazy"><figcaption>image-20191011011509222</figcaption></figure><p>可以看到结果和JDK动态代理是一样的，但是可以直接对实现类进行操作而非接口，这样会有很大的便利。</p><h3 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h3>`,4),h={href:"https://www.cnblogs.com/puyangsky/p/6218925.html",target:"_blank",rel:"noopener noreferrer"};function x(f,y){const l=t("RouterLink"),i=t("ExternalLinkIcon");return p(),o("div",null,[u,n("blockquote",null,[v,m,n("p",null,[s("具体参考"),a(l,{to:"/dependencies/spring/cs/uml/"},{default:r(()=>[s("uml类图")]),_:1})])]),b,n("p",null,[n("a",k,[s("CGlib"),a(i)]),s("是一个字节码增强库，为AOP等提供了底层支持。下面看看它是怎么实现动态代理的。")]),g,n("p",null,[n("a",h,[s("Spring AOP实现原理"),a(i)]),s("spring/aop/SpringAOP实现原理.md")])])}const _=c(d,[["render",x],["__file","spring-y-aop-impl.html.vue"]]);export{_ as default};
