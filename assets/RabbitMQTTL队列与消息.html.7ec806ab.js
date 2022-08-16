import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h2 id="rabbitmq\u7684ttl\u961F\u5217\u4E0E\u6D88\u606F" tabindex="-1"><a class="header-anchor" href="#rabbitmq\u7684ttl\u961F\u5217\u4E0E\u6D88\u606F" aria-hidden="true">#</a> RabbitMQ\u7684TTL\u961F\u5217\u4E0E\u6D88\u606F</h2><h2 id="_1-ttl-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-ttl-\u7B80\u4ECB" aria-hidden="true">#</a> 1. TTL \u7B80\u4ECB</h2><p>TTL: time to live,\u5373\u751F\u5B58\u65F6\u95F4</p><ul><li><p><strong>\u6D88\u606F\u7684\u8FC7\u671F\u65F6\u95F4</strong></p><p>RabbitMQ \u652F\u6301\u6D88\u606F\u7684\u8FC7\u671F\u65F6\u95F4\uFF0C\u53EF\u4EE5\u5728\u53D1\u6D88\u606F\u662F\u6307\u5B9A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token comment">// expiration(&quot;10000&quot;) \u8BBE\u7F6E\u6D88\u606F8s\u8FC7\u671F,\u6D88\u606F\u7684ttl</span>\n            <span class="token class-name">AMQP<span class="token punctuation">.</span>BasicProperties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AMQP<span class="token punctuation">.</span>BasicProperties<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">deliveryMode</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contentEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">expiration</span><span class="token punctuation">(</span><span class="token string">&quot;8000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>\u961F\u5217\u7684\u8FC7\u671F\u65F6\u95F4</strong>:</p><p>RabbitMQ \u652F\u6301\u961F\u5217\u7684\u8FC7\u671F\u65F6\u95F4\uFF0C\u4ECE\u6D88\u606F\u5165\u961F\u5F00\u59CB\u8BA1\u7B97\uFF0C\u53EA\u8981\u8D85\u8FC7\u4E86\u961F\u5217\u7684\u8D85\u65F6\u65F6\u95F4\u914D\u7F6E\uFF0C\u90A3\u4E48\u6D88\u606F\u4F1A\u81EA\u52A8\u6E05\u9664</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>  <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> arguments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// \u961F\u5217ttl\uFF0C\u8BBE\u7F6E\u4E3A8s</span>\n        arguments<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;message-ttl&quot;</span><span class="token punctuation">,</span> <span class="token number">8000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> exchangeName<span class="token punctuation">,</span> routingKey<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_2-\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> 2. \u4EE3\u7801\u5B9E\u73B0</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>wyg<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>javaclient<span class="token punctuation">.</span>ttl</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">TimeUnit</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">TimeoutException</span></span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">AMQP</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Channel</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">Connection</span></span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>rabbitmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">ConnectionFactory</span></span><span class="token punctuation">;</span>\n\n<span class="token doc-comment comment">/**\n * ttl\u961F\u5217/\u6D88\u606F\n * \n */</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> HOST <span class="token operator">=</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> PORT <span class="token operator">=</span> <span class="token number">5672</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> USERNAME <span class="token operator">=</span> <span class="token string">&quot;guset&quot;</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> PASSWORD <span class="token operator">=</span> <span class="token string">&quot;guset&quot;</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">TimeoutException</span> <span class="token punctuation">{</span>\n        <span class="token class-name">ConnectionFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        factory<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span>HOST<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        factory<span class="token punctuation">.</span><span class="token function">setVirtualHost</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        factory<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span>PORT<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        factory<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span>USERNAME<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        factory<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span>PASSWORD<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">newConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">Channel</span> channel <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> exchangeName <span class="token operator">=</span> <span class="token string">&quot;test_ttl_exchange&quot;</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> routingKey <span class="token operator">=</span> <span class="token string">&quot;ttl.abc&quot;</span><span class="token punctuation">;</span>\n        <span class="token class-name">String</span> queueName <span class="token operator">=</span> <span class="token string">&quot;test_ttl_queue&quot;</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// \u7533\u660Eexchange</span>\n        channel<span class="token punctuation">.</span><span class="token function">exchangeDeclare</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> <span class="token string">&quot;topic&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// \u7533\u660E queue</span>\n        channel<span class="token punctuation">.</span><span class="token function">queueDeclare</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> arguments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// \u961F\u5217ttl\uFF0C\u8BBE\u7F6E\u4E3A8s</span>\n        arguments<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;message-ttl&quot;</span><span class="token punctuation">,</span> <span class="token number">8000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        channel<span class="token punctuation">.</span><span class="token function">queueBind</span><span class="token punctuation">(</span>queueName<span class="token punctuation">,</span> exchangeName<span class="token punctuation">,</span> routingKey<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// expiration(&quot;10000&quot;) \u8BBE\u7F6E\u6D88\u606F8s\u8FC7\u671F,\u6D88\u606F\u7684ttl</span>\n            <span class="token class-name">AMQP<span class="token punctuation">.</span>BasicProperties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AMQP<span class="token punctuation">.</span>BasicProperties<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">deliveryMode</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contentEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">expiration</span><span class="token punctuation">(</span><span class="token string">&quot;8000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token string">&quot;\u8FD9\u662F\u7B2C&quot;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&quot;\u6761ack\u6D88\u606F&quot;</span><span class="token punctuation">;</span>\n            <span class="token keyword">try</span> <span class="token punctuation">{</span>\n                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span>exchangeName<span class="token punctuation">,</span> routingKey<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> props<span class="token punctuation">,</span> msg<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        channel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5B9E\u73B0\u6548\u679C" tabindex="-1"><a class="header-anchor" href="#_3-\u5B9E\u73B0\u6548\u679C" aria-hidden="true">#</a> 3. \u5B9E\u73B0\u6548\u679C</h2><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/16e93a814f8c1962.gif" alt="16e93a814f8c1962"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 9);
const _hoisted_10 = {
  href: "https://juejin.cn/post/6844904002996404231",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_11 = /* @__PURE__ */ createTextVNode("RabbitMQ\u9AD8\u7EA7\u7279\u6027-TTL\u961F\u5217/\u6D88\u606F");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_10, [
        _hoisted_11,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var RabbitMQTTL______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "RabbitMQTTL\u961F\u5217\u4E0E\u6D88\u606F.html.vue"]]);
export { RabbitMQTTL______html as default };
