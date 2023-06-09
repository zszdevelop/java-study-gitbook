import{_ as a,W as e,X as t,Y as n,Z as i,$ as l,a0 as c,D as o}from"./framework-0cf5f349.js";const p={},r=c(`<h1 id="es详解-docker安装elk" tabindex="-1"><a class="header-anchor" href="#es详解-docker安装elk" aria-hidden="true">#</a> ES详解 - Docker安装Elk</h1><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220803230055166.png" alt="image-20220803230055166" tabindex="0" loading="lazy"><figcaption>image-20220803230055166</figcaption></figure><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>ELK是Elasticsearch+Logstash+Kibana简称</p><ul><li>Elasticsearch 是一个分布式的搜索和分析引擎，可以用于全文检索、结构化检索和分析，并能将这三者结合起来。Elasticsearch 基于 Lucene 开发，现在是使用最广的开源搜索引擎之一。</li><li>Logstash 简单来说就是一根具备实时数据传输能力的管道，负责将数据信息从管道的输入端传输到管道的输出端，与此同时这根管道还可以让你根据自己的需求在中间加上滤网，Logstash提供了很多功能强大的滤网以满足你的各种应用场景。</li><li>Kibana 是一个开源的分析与可视化平台，设计出来用于和Elasticsearch一起使用的。你可以用kibana搜索、查看、交互存放在Elasticsearch索引里的数据，使用各种不同的图标、表格、地图等，kibana能够很轻易的展示高级数据分析与可视化。</li></ul><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h2><h3 id="_2-1-编写docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_2-1-编写docker-compose-yml" aria-hidden="true">#</a> 2.1 编写docker-compose.yml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">:</span>7.17.6
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> elasticsearch
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9200:9200&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9300:9300&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment"># 设置集群名称</span>
      <span class="token key atrule">cluster.name</span><span class="token punctuation">:</span> elasticsearch
      <span class="token comment"># 以单一节点模式启动</span>
      <span class="token key atrule">discovery.type</span><span class="token punctuation">:</span> single<span class="token punctuation">-</span>node
      <span class="token comment"># 开启x-pack(需要加密时配置)</span>
      <span class="token key atrule">xpack.security.enabled</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
      <span class="token comment"># 密码(需要加密时配置)</span>
      <span class="token key atrule">ELASTIC_PASSWORD</span><span class="token punctuation">:</span> abc@123
      <span class="token comment"># 设置内存大小</span>
      <span class="token key atrule">ES_JAVA_OPTS</span><span class="token punctuation">:</span> <span class="token string">&quot;-Xms2048m -Xmx2048m&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/dataexa/aia/elk/elasticsearch/plugins<span class="token punctuation">:</span>/usr/share/elasticsearch/plugins
      <span class="token punctuation">-</span> /home/dataexa/aia/elk/elasticsearch/data<span class="token punctuation">:</span>/usr/share/elasticsearch/data
      <span class="token punctuation">-</span> /home/dataexa/aia/elk/elasticsearch/logs<span class="token punctuation">:</span>/usr/share/elasticsearch/logs
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;host&quot;</span>

  <span class="token key atrule">kibana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> kibana<span class="token punctuation">:</span>7.17.6
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kibana
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5601:5601&quot;</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token comment"># kibana在elasticsearch启动之后再启动</span>
      <span class="token punctuation">-</span> elasticsearch
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment">#设置系统语言文中文</span>
      <span class="token key atrule">I18N_LOCALE</span><span class="token punctuation">:</span> zh<span class="token punctuation">-</span>CN
      <span class="token comment"># 访问域名</span>
      <span class="token comment"># SERVER_PUBLICBASEURL: https://kibana.cloud.com</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/dataexa/aia/elk/kibana/config/kibana.yml<span class="token punctuation">:</span>/usr/share/kibana/config/kibana.yml
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;host&quot;</span>

  <span class="token key atrule">logstash</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> logstash<span class="token punctuation">:</span>7.17.6
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> logstash
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;4560:4560&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /home/dataexa/aia/elk/logstash/pipeline/logstash.conf<span class="token punctuation">:</span>/usr/share/logstash/pipeline/logstash.conf
      <span class="token punctuation">-</span> /home/dataexa/aia/elk/logstash/config/logstash.yml<span class="token punctuation">:</span>/usr/share/logstash/config/logstash.yml
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;host&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-新建logstash-logstash-springboot-conf文件" tabindex="-1"><a class="header-anchor" href="#_2-2-新建logstash-logstash-springboot-conf文件" aria-hidden="true">#</a> 2.2 新建logstash/logstash-springboot.conf文件</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>input <span class="token punctuation">{</span>
  tcp <span class="token punctuation">{</span>
    <span class="token parameter">mode</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;server&quot;</span>
    <span class="token parameter">host</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;0.0.0.0&quot;</span>
    <span class="token parameter">port</span> <span class="token operator">=&gt;</span> <span class="token number">4560</span>
    <span class="token parameter">codec</span> <span class="token operator">=&gt;</span> json_lines
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
output <span class="token punctuation">{</span>
  elasticsearch <span class="token punctuation">{</span>
    <span class="token parameter">hosts</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;192.168.0.1:9200&quot;</span>
    <span class="token parameter">index</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;%{[spring.application.name]}-%{+YYYY.MM.dd}&quot;</span>
    <span class="token parameter">user</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;elastic&quot;</span>
    <span class="token parameter">password</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;abc@123&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-新建-kibana-config-kibana-yml" tabindex="-1"><a class="header-anchor" href="#_2-3-新建-kibana-config-kibana-yml" aria-hidden="true">#</a> 2.3 新建 kibana/config/kibana.yml</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server.host: &quot;0.0.0.0&quot;
server.shutdownTimeout: &quot;5s&quot;
elasticsearch.username: &quot;elastic&quot;
elasticsearch.password: &quot;dataexa@123&quot;
elasticsearch.hosts: [ &quot;http://127.0.0.1:9200&quot; ]
monitoring.ui.container.elasticsearch.enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装-运行elk" tabindex="-1"><a class="header-anchor" href="#_3-安装-运行elk" aria-hidden="true">#</a> 3. 安装，运行ELK</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>docker<span class="token operator">-</span>compose up <span class="token operator">-</span>d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-访问kibana" tabindex="-1"><a class="header-anchor" href="#_4-访问kibana" aria-hidden="true">#</a> 4. 访问Kibana</h2><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220803230538798.png" alt="image-20220803230538798" tabindex="0" loading="lazy"><figcaption>image-20220803230538798</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,17),u={href:"https://www.jianshu.com/p/2d78ce6bc504",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=o("ExternalLinkIcon");return e(),t("div",null,[r,n("p",null,[n("a",u,[i("docker-compose安装ELK"),l(s)])])])}const h=a(p,[["render",d],["__file","elasticsearch-install.html.vue"]]);export{h as default};
