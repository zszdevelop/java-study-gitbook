import{_ as a,W as e,X as t,Y as s,Z as c,$ as i,a0 as l,D as p}from"./framework-0cf5f349.js";const o={},r=l(`<h1 id="es详解-docker安装elk" tabindex="-1"><a class="header-anchor" href="#es详解-docker安装elk" aria-hidden="true">#</a> ES详解 - Docker安装Elk</h1><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220803230055166.png" alt="image-20220803230055166" tabindex="0" loading="lazy"><figcaption>image-20220803230055166</figcaption></figure><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>ELK是Elasticsearch+Logstash+Kibana简称</p><ul><li>Elasticsearch 是一个分布式的搜索和分析引擎，可以用于全文检索、结构化检索和分析，并能将这三者结合起来。Elasticsearch 基于 Lucene 开发，现在是使用最广的开源搜索引擎之一。</li><li>Logstash 简单来说就是一根具备实时数据传输能力的管道，负责将数据信息从管道的输入端传输到管道的输出端，与此同时这根管道还可以让你根据自己的需求在中间加上滤网，Logstash提供了很多功能强大的滤网以满足你的各种应用场景。</li><li>Kibana 是一个开源的分析与可视化平台，设计出来用于和Elasticsearch一起使用的。你可以用kibana搜索、查看、交互存放在Elasticsearch索引里的数据，使用各种不同的图标、表格、地图等，kibana能够很轻易的展示高级数据分析与可视化。</li></ul><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h2><h3 id="_2-1-编写docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_2-1-编写docker-compose-yml" aria-hidden="true">#</a> 2.1 编写docker-compose.yml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">:</span>7.7.0  <span class="token comment">#镜像</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> elk_elasticsearch  <span class="token comment">#定义容器名称</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always  <span class="token comment">#开机启动，失败也会一直重启</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;cluster.name=elasticsearch&quot;</span> <span class="token comment">#设置集群名称为elasticsearch</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> <span class="token comment">#以单一节点模式启动</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;ES_JAVA_OPTS=-Xms512m -Xmx1024m&quot;</span> <span class="token comment">#设置使用jvm内存大小</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./elasticsearch/plugins<span class="token punctuation">:</span>/usr/share/elasticsearch/plugins <span class="token comment">#插件文件挂载</span>
      <span class="token punctuation">-</span> ./elasticsearch/data<span class="token punctuation">:</span>/usr/share/elasticsearch/data <span class="token comment">#数据文件挂载</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9200<span class="token punctuation">:</span><span class="token number">9200</span>
  <span class="token key atrule">kibana</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> kibana<span class="token punctuation">:</span>7.7.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> elk_kibana
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch <span class="token comment">#kibana在elasticsearch启动之后再启动</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ELASTICSEARCH_URL=http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span><span class="token number">9200</span> <span class="token comment">#设置访问elasticsearch的地址</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 5601<span class="token punctuation">:</span><span class="token number">5601</span>
  <span class="token key atrule">logstash</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> logstash<span class="token punctuation">:</span>7.7.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> elk_logstash
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./logstash/logstash<span class="token punctuation">-</span>springboot.conf<span class="token punctuation">:</span>/usr/share/logstash/pipeline/logstash.conf <span class="token comment">#挂载logstash的配置文件</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch <span class="token comment">#kibana在elasticsearch启动之后再启动</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch<span class="token punctuation">:</span>es <span class="token comment">#可以用es这个域名访问elasticsearch服务</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 4560<span class="token punctuation">:</span><span class="token number">4560</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-新建logstash-logstash-springboot-conf文件" tabindex="-1"><a class="header-anchor" href="#_2-2-新建logstash-logstash-springboot-conf文件" aria-hidden="true">#</a> 2.2 新建logstash/logstash-springboot.conf文件</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>input <span class="token punctuation">{</span>
  tcp <span class="token punctuation">{</span>
    <span class="token parameter">mode</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;server&quot;</span>
    <span class="token parameter">host</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;0.0.0.0&quot;</span>
    <span class="token parameter">port</span> <span class="token operator">=&gt;</span> <span class="token number">4560</span>
    <span class="token parameter">codec</span> <span class="token operator">=&gt;</span> json_lines
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
output <span class="token punctuation">{</span>
  elasticsearch <span class="token punctuation">{</span>
    <span class="token parameter">hosts</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;es:9200&quot;</span>
    <span class="token parameter">index</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;springboot-logstash-%{+YYYY.MM.dd}&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-安装-运行elk" tabindex="-1"><a class="header-anchor" href="#_2-3-安装-运行elk" aria-hidden="true">#</a> 2.3 安装，运行ELK</h3><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>docker<span class="token operator">-</span>compose up <span class="token operator">-</span>d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4-访问kibana" tabindex="-1"><a class="header-anchor" href="#_2-4-访问kibana" aria-hidden="true">#</a> 2.4 访问Kibana</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220803230538798.png" alt="image-20220803230538798" tabindex="0" loading="lazy"><figcaption>image-20220803230538798</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,15),u={href:"https://www.jianshu.com/p/2d78ce6bc504",target:"_blank",rel:"noopener noreferrer"};function d(k,m){const n=p("ExternalLinkIcon");return e(),t("div",null,[r,s("p",null,[s("a",u,[c("docker-compose安装ELK"),i(n)])])])}const h=a(o,[["render",d],["__file","elasticsearch-install.html.vue"]]);export{h as default};
