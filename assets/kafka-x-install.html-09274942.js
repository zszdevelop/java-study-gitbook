import{_ as i,W as l,X as o,Y as n,Z as s,$ as e,a0 as t,D as c}from"./framework-0cf5f349.js";const p={},u=t(`<h1 id="kafka-安装" tabindex="-1"><a class="header-anchor" href="#kafka-安装" aria-hidden="true">#</a> Kafka - 安装</h1><h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1. 安装</h2><h3 id="_1-1-docker-compose-安装" tabindex="-1"><a class="header-anchor" href="#_1-1-docker-compose-安装" aria-hidden="true">#</a> 1.1 docker-compose 安装</h3><h4 id="_1-1-1-docker-compose-yml-编写" tabindex="-1"><a class="header-anchor" href="#_1-1-1-docker-compose-yml-编写" aria-hidden="true">#</a> 1.1.1 docker-compose.yml 编写</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;bitnami/zookeeper:3.8.0&#39;</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> zookeeper
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;2181:2181&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token key atrule">ALLOW_ANONYMOUS_LOGIN</span><span class="token punctuation">:</span> <span class="token string">&quot;yes&quot;</span>
      <span class="token key atrule">ZOO_SERVER_ID</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">ZOO_PORT_NUMBER</span><span class="token punctuation">:</span> <span class="token number">2181</span>
    <span class="token comment"># network_mode: &quot;host&quot;</span>

  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;bitnami/kafka:3.2.0&#39;</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kafka
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9092:9092&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token comment"># 更多变量 查看文档 https://github.com/bitnami/bitnami-docker-kafka/blob/master/README.md</span>
      <span class="token key atrule">KAFKA_BROKER_ID</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token comment"># 监听端口</span>
      <span class="token key atrule">KAFKA_CFG_LISTENERS</span><span class="token punctuation">:</span> PLAINTEXT<span class="token punctuation">:</span>//<span class="token punctuation">:</span><span class="token number">9092</span>
      <span class="token comment"># 实际访问ip 本地用 127 内网用 192 外网用 外网ip</span>
      <span class="token key atrule">KAFKA_CFG_ADVERTISED_LISTENERS</span><span class="token punctuation">:</span> PLAINTEXT<span class="token punctuation">:</span>//192.168.31.165<span class="token punctuation">:</span><span class="token number">9092</span>
      <span class="token key atrule">KAFKA_CFG_ZOOKEEPER_CONNECT</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">2181</span>
      <span class="token key atrule">ALLOW_PLAINTEXT_LISTENER</span><span class="token punctuation">:</span> <span class="token string">&quot;yes&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/bitnami/kafka/data
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> zookeeper
    <span class="token comment">#network_mode: &quot;host&quot;</span>

  <span class="token key atrule">kafka-manager</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> sheepkiller/kafka<span class="token punctuation">-</span>manager<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kafka<span class="token punctuation">-</span>manager
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;19092:19092&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">ZK_HOSTS</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">2181</span>
      <span class="token key atrule">APPLICATION_SECRET</span><span class="token punctuation">:</span> letmein
      <span class="token key atrule">KAFKA_MANAGER_USERNAME</span><span class="token punctuation">:</span> ruoyi
      <span class="token key atrule">KAFKA_MANAGER_PASSWORD</span><span class="token punctuation">:</span> ruoyi123
      <span class="token key atrule">KM_ARGS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>Dhttp.port=19092
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> kafka
    <span class="token comment">#network_mode: &quot;host&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-2-启动" tabindex="-1"><a class="header-anchor" href="#_1-1-2-启动" aria-hidden="true">#</a> 1.1.2 启动</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-控制台管理" tabindex="-1"><a class="header-anchor" href="#_2-控制台管理" aria-hidden="true">#</a> 2. 控制台管理</h2><h3 id="_2-1-进入控制台" tabindex="-1"><a class="header-anchor" href="#_2-1-进入控制台" aria-hidden="true">#</a> 2.1 进入控制台</h3>`,9),r={href:"http://localhost:19092/",target:"_blank",rel:"noopener noreferrer"},d=t('<figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922133836608.png" alt="image-20220922133836608" tabindex="0" loading="lazy"><figcaption>image-20220922133836608</figcaption></figure><h3 id="_2-2-创建集群链接" tabindex="-1"><a class="header-anchor" href="#_2-2-创建集群链接" aria-hidden="true">#</a> 2.2 创建集群链接</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922133941643.png" alt="image-20220922133941643" tabindex="0" loading="lazy"><figcaption>image-20220922133941643</figcaption></figure><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922134027419.png" alt="image-20220922134027419" tabindex="0" loading="lazy"><figcaption>image-20220922134027419</figcaption></figure><h3 id="_2-3-添加list" tabindex="-1"><a class="header-anchor" href="#_2-3-添加list" aria-hidden="true">#</a> 2.3 添加List</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922134525592.png" alt="image-20220922134525592" tabindex="0" loading="lazy"><figcaption>image-20220922134525592</figcaption></figure><h3 id="_2-4-查看" tabindex="-1"><a class="header-anchor" href="#_2-4-查看" aria-hidden="true">#</a> 2.4 查看</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220922134557163.png" alt="image-20220922134557163" tabindex="0" loading="lazy"><figcaption>image-20220922134557163</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>',9),k={href:"https://lionli.blog.csdn.net/article/details/125855550",target:"_blank",rel:"noopener noreferrer"};function m(v,b){const a=c("ExternalLinkIcon");return l(),o("div",null,[u,n("p",null,[n("a",r,[s("http://localhost:19092/"),e(a)])]),d,n("p",null,[n("a",k,[s("docker-compose 安装 Kafka 3.X 附带可视化界面"),e(a)])])])}const g=i(p,[["render",m],["__file","kafka-x-install.html.vue"]]);export{g as default};
