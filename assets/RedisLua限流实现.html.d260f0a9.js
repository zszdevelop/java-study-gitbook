import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="redislua\u9650\u6D41\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#redislua\u9650\u6D41\u5B9E\u73B0" aria-hidden="true">#</a> RedisLua\u9650\u6D41\u5B9E\u73B0</h1><h2 id="_1-redis-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_1-redis-\u914D\u7F6E" aria-hidden="true">#</a> 1. Redis \u914D\u7F6E</h2><p>\u5176\u4E2D\u914D\u7F6E\u4E86\u9ED8\u8BA4\u7684\u9650\u6D41\u811A\u672C\u5C31\u662F\u91C7\u7528Lua \u7684\u5F62\u5F0F</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>\n<span class="token doc-comment comment">/**\n * redis\u914D\u7F6E\n * \n */</span>\n<span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableCaching</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfig</span> <span class="token keyword">extends</span> <span class="token class-name">CachingConfigurerSupport</span>\n<span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;rawtypes&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> connectionFactory<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        template<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>connectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">FastJson2JsonRedisSerializer</span> serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FastJson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        mapper<span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">PropertyAccessor</span><span class="token punctuation">.</span>ALL<span class="token punctuation">,</span> <span class="token class-name">JsonAutoDetect<span class="token punctuation">.</span>Visibility</span><span class="token punctuation">.</span>ANY<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        mapper<span class="token punctuation">.</span><span class="token function">activateDefaultTyping</span><span class="token punctuation">(</span><span class="token class-name">LaissezFaireSubTypeValidator</span><span class="token punctuation">.</span>instance<span class="token punctuation">,</span> <span class="token class-name">ObjectMapper<span class="token punctuation">.</span>DefaultTyping</span><span class="token punctuation">.</span>NON_FINAL<span class="token punctuation">,</span> <span class="token class-name">JsonTypeInfo<span class="token punctuation">.</span>As</span><span class="token punctuation">.</span>PROPERTY<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        serializer<span class="token punctuation">.</span><span class="token function">setObjectMapper</span><span class="token punctuation">(</span>mapper<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// \u4F7F\u7528StringRedisSerializer\u6765\u5E8F\u5217\u5316\u548C\u53CD\u5E8F\u5217\u5316redis\u7684key\u503C</span>\n        template<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        template<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Hash\u7684key\u4E5F\u91C7\u7528StringRedisSerializer\u7684\u5E8F\u5217\u5316\u65B9\u5F0F</span>\n        template<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        template<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        template<span class="token punctuation">.</span><span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> template<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> <span class="token function">limitScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> redisScript <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        redisScript<span class="token punctuation">.</span><span class="token function">setScriptText</span><span class="token punctuation">(</span><span class="token function">limitScriptText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        redisScript<span class="token punctuation">.</span><span class="token function">setResultType</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> redisScript<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token doc-comment comment">/**\n     * \u9650\u6D41\u811A\u672C\n     */</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">limitScriptText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">&quot;local key = KEYS[1]\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;local count = tonumber(ARGV[1])\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;local time = tonumber(ARGV[2])\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;local current = redis.call(&#39;get&#39;, key);\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;if current and tonumber(current) &gt; count then\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;    return tonumber(current);\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;end\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;current = redis.call(&#39;incr&#39;, key)\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;if tonumber(current) == 1 then\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;    redis.call(&#39;expire&#39;, key, time)\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;end\\n&quot;</span> <span class="token operator">+</span>\n                <span class="token string">&quot;return tonumber(current);&quot;</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u5B9A\u4E49\u9650\u6D41\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#_2-\u5B9A\u4E49\u9650\u6D41\u6CE8\u89E3" aria-hidden="true">#</a> 2. \u5B9A\u4E49\u9650\u6D41\u6CE8\u89E3</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>\n<span class="token doc-comment comment">/**\n * \u9650\u6D41\u6CE8\u89E3\n */</span>\n<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>METHOD<span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Documented</span>\n<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">RateLimiter</span>\n<span class="token punctuation">{</span>\n    <span class="token doc-comment comment">/**\n     * \u9650\u6D41key\n     */</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token class-name">Constants</span><span class="token punctuation">.</span>RATE_LIMIT_KEY<span class="token punctuation">;</span>\n\n    <span class="token doc-comment comment">/**\n     * \u9650\u6D41\u65F6\u95F4,\u5355\u4F4D\u79D2\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">60</span><span class="token punctuation">;</span>\n\n    <span class="token doc-comment comment">/**\n     * \u9650\u6D41\u6B21\u6570\n     */</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token number">100</span><span class="token punctuation">;</span>\n\n    <span class="token doc-comment comment">/**\n     * \u9650\u6D41\u7C7B\u578B\n     */</span>\n    <span class="token keyword">public</span> <span class="token class-name">LimitType</span> <span class="token function">limitType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token class-name">LimitType</span><span class="token punctuation">.</span>DEFAULT<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5B9A\u4E49\u9650\u6D41\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#_3-\u5B9A\u4E49\u9650\u6D41\u7C7B\u578B" aria-hidden="true">#</a> 3. \u5B9A\u4E49\u9650\u6D41\u7C7B\u578B</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>\n<span class="token doc-comment comment">/**\n * \u9650\u6D41\u7C7B\u578B\n */</span>\n<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">LimitType</span>\n<span class="token punctuation">{</span>\n    <span class="token doc-comment comment">/**\n     * \u9ED8\u8BA4\u7B56\u7565\u5168\u5C40\u9650\u6D41\n     */</span>\n    DEFAULT<span class="token punctuation">,</span>\n\n    <span class="token doc-comment comment">/**\n     * \u6839\u636E\u8BF7\u6C42\u8005IP\u8FDB\u884C\u9650\u6D41\n     */</span>\n    IP\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-\u9650\u6D41\u5207\u9762" tabindex="-1"><a class="header-anchor" href="#_4-\u9650\u6D41\u5207\u9762" aria-hidden="true">#</a> 4. \u9650\u6D41\u5207\u9762</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>\n<span class="token doc-comment comment">/**\n * \u9650\u6D41\u5904\u7406\n *\n * <span class="token keyword">@author</span> fd\n */</span>\n<span class="token annotation punctuation">@Aspect</span>\n<span class="token annotation punctuation">@Component</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RateLimiterAspect</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">RateLimiterAspect</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> <span class="token class-name">RedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> limitScript<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setRedisTemplate1</span><span class="token punctuation">(</span><span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate <span class="token operator">=</span> redisTemplate<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setLimitScript</span><span class="token punctuation">(</span><span class="token class-name">RedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> limitScript<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>limitScript <span class="token operator">=</span> limitScript<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">&quot;@annotation(rateLimiter)&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doBefore</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> point<span class="token punctuation">,</span> <span class="token class-name">RateLimiter</span> rateLimiter<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name">String</span> key <span class="token operator">=</span> rateLimiter<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> time <span class="token operator">=</span> rateLimiter<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">int</span> count <span class="token operator">=</span> rateLimiter<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">String</span> combineKey <span class="token operator">=</span> <span class="token function">getCombineKey</span><span class="token punctuation">(</span>rateLimiter<span class="token punctuation">,</span> point<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> keys <span class="token operator">=</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span>combineKey<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">try</span>\n        <span class="token punctuation">{</span>\n            <span class="token class-name">Long</span> number <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>limitScript<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> count<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token operator">||</span> number<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> count<span class="token punctuation">)</span>\n            <span class="token punctuation">{</span>\n                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ServiceException</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BBF\u95EE\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u9650\u5236\u8BF7\u6C42&#39;{}&#39;,\u5F53\u524D\u8BF7\u6C42&#39;{}&#39;,\u7F13\u5B58key&#39;{}&#39;&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">,</span> number<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ServiceException</span> e<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;\u670D\u52A1\u5668\u9650\u6D41\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCombineKey</span><span class="token punctuation">(</span><span class="token class-name">RateLimiter</span> rateLimiter<span class="token punctuation">,</span> <span class="token class-name">JoinPoint</span> point<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token class-name">StringBuffer</span> stringBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span>rateLimiter<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>rateLimiter<span class="token punctuation">.</span><span class="token function">limitType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">LimitType</span><span class="token punctuation">.</span>IP<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            stringBuffer<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token class-name">IpUtils</span><span class="token punctuation">.</span><span class="token function">getIpAddr</span><span class="token punctuation">(</span><span class="token class-name">ServletUtils</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token class-name">MethodSignature</span> signature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> point<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Method</span> method <span class="token operator">=</span> signature<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> targetClass <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getDeclaringClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        stringBuffer<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> stringBuffer<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 10);
const _hoisted_11 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_11);
}
var RedisLua_____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "RedisLua\u9650\u6D41\u5B9E\u73B0.html.vue"]]);
export { RedisLua_____html as default };
