import{_ as a,W as e,X as t,Y as n,Z as p,$ as i,a0 as o,D as l}from"./framework-0cf5f349.js";const c={},u=o(`<h1 id="springboot集成rabbitmq-spring-boot-starter-amqp" tabindex="-1"><a class="header-anchor" href="#springboot集成rabbitmq-spring-boot-starter-amqp" aria-hidden="true">#</a> SpringBoot集成RabbitMQ（spring-boot-starter-amqp）</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p><strong>主要作用</strong>：解耦</p><p><strong>最标准的用法</strong>：</p><ul><li>生产者生产消息队列</li><li>消费者从队列中拿取消息并处理</li></ul><p>生产者不用关系是谁来消费，消费者不用关心谁在生产消息，从而达到解耦的目的</p><p>**分布式系统中的应用：**分布式事务的支持，RPC的调用等等</p><h2 id="_2-spring-boot-集成-rabbitmq" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot-集成-rabbitmq" aria-hidden="true">#</a> 2. Spring Boot 集成 RabbitMQ</h2><p>Spring Boot 集成 RabbitMQ 非常简单，如果只是简单的使用配置非常少，Spring Boot 提供了<code>spring-boot-starter-amqp</code> 项目对消息各种支持。</p><h3 id="_2-1-简单使用" tabindex="-1"><a class="header-anchor" href="#_2-1-简单使用" aria-hidden="true">#</a> 2.1 简单使用</h3><p>1、配置 Pom 包，主要是添加 <code>spring-boot-starter-amqp</code> 的支持</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、配置文件</p><p>配置 RabbitMQ 的安装地址、端口以及账户信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring.application.name=Spring-boot-rabbitmq
spring.rabbitmq.host=120.79.200.111
spring.rabbitmq.port=5672
spring.rabbitmq.username=febs
spring.rabbitmq.password=123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、队列配置</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、发送者</p><p>rabbitTemplate 是 Spring Boot 提供的默认实现</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloSender</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Autowired</span>
	<span class="token keyword">private</span> <span class="token class-name">AmqpTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">String</span> context <span class="token operator">=</span> <span class="token string">&quot;hello &quot;</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Sender : &quot;</span> <span class="token operator">+</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、接收者</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloReceiver</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">String</span> hello<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Receiver  : &quot;</span> <span class="token operator">+</span> hello<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6、测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RunWith(SpringRunner.class)
@SpringBootTest
public class RabbitMqHelloTest {

	@Autowired
	private HelloSender helloSender;

	@Test
	public void hello() throws Exception {
		helloSender.send();
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意，发送者和接收者的 queue name 必须一致，不然不能接收</p></blockquote><p>多对多参考以下文章</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,27),r={href:"http://www.ityouknow.com/springboot/2016/11/30/spring-boot-rabbitMQ.html",target:"_blank",rel:"noopener noreferrer"};function d(v,b){const s=l("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[p("Spring Boot(八)：RabbitMQ 详解"),i(s)])])])}const m=a(c,[["render",d],["__file","rabbitmq-y-action-springboot.html.vue"]]);export{m as default};
