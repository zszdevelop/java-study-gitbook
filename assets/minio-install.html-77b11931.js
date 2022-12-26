import{_ as a,W as e,X as p,Y as n,$ as t,a0 as o,D as i}from"./framework-0cf5f349.js";const l={},c=o(`<h1 id="minio部署-minio安装" tabindex="-1"><a class="header-anchor" href="#minio部署-minio安装" aria-hidden="true">#</a> Minio部署 - MinIO安装</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><blockquote><p>MinIO 是一个基于Apache License v2.0开源协议的对象存储服务。它兼容亚马逊S3云存储服务接口，非 常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而 一个对象文件可以是任意大小，从几kb到最大5T不等。 MinIO是一个非常轻量的服务,可以很简单的和其他应用的结合，类似 NodeJS, Redis 或者 MySQL。</p></blockquote><p>一个对象存储服务，适合存储非结构化数据。如图片、视频、日志文件等</p><h3 id="_1-1-优点" tabindex="-1"><a class="header-anchor" href="#_1-1-优点" aria-hidden="true">#</a> 1.1 优点</h3><ul><li>部署简单: 一个single二进制文件即是一切，还可支持各种平台。</li><li>minio支持海量存储，可按zone扩展(原zone不受任何影响)，支持单个对象最大5TB;</li><li>兼容Amazon S3接口，充分考虑开发人员的需求和体验;</li><li>低冗余且磁盘损坏高容忍，标准且最高的数据冗余系数为2(即存储一个1M的数据对象，实际占用 磁盘空间为2M)。但在任意n/2块disk损坏的情况下依然可以读出数据(n为一个纠删码集合(Erasure Coding Set)中的disk数量)。并且这种损坏恢复是基于单个对象的，而不是基于整个存储卷的。</li><li>读写性能优异</li></ul><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h2><h3 id="_2-1-centos7-单机部署" tabindex="-1"><a class="header-anchor" href="#_2-1-centos7-单机部署" aria-hidden="true">#</a> 2.1 Centos7 单机部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-q</span> http://dl.minio.org.cn/server/minio/release/linux-amd64/minio
<span class="token function">chmod</span> +x minio
<span class="token comment">#启动minio server服务，指定数据存储目录/mnt/data</span>
./minio server /mnt/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925212033260.png" alt="image-20210925212033260" tabindex="0" loading="lazy"><figcaption>image-20210925212033260</figcaption></figure><p>默认用户名密码minioadmin:minioadmin，修改默认用户名密码可以使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">MINIO_ROOT_USER</span><span class="token operator">=</span>admin
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MINIO_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">12345678</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认的配置目录是\${HOME}/.minio，可以通过--config-dir命令自定义配置目录：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./minio server --config-dir /mnt/config /mnt/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>控制台监听端口是动态生成的，可以通过--console-address &quot;:port&quot;指定静态端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./minio server --console-address <span class="token string">&quot;:9001&quot;</span> /mnt/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925212415270.png" alt="image-20210925212415270" tabindex="0" loading="lazy"><figcaption>image-20210925212415270</figcaption></figure><h3 id="_2-2-docker安装" tabindex="-1"><a class="header-anchor" href="#_2-2-docker安装" aria-hidden="true">#</a> 2.2 docker安装</h3><p>注：跟中文官网有巨大不同。中文官网没有指定console端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">9001</span>:50000 <span class="token parameter variable">--name</span> minio <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/config:/root/.minio <span class="token punctuation">\\</span>
minio/minio server --console-address <span class="token string">&quot;:9001&quot;</span> /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MinIO自定义用户名密码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">9001</span>:50000 <span class="token parameter variable">--name</span> minio <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ROOT_USER=admin&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ROOT_PASSWORD=12345678&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/config:/root/.minio <span class="token punctuation">\\</span>
minio/minio server --console-address <span class="token string">&quot;:9001&quot;</span> /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-docker-compose-单实例安装" tabindex="-1"><a class="header-anchor" href="#_2-3-docker-compose-单实例安装" aria-hidden="true">#</a> 2.3 docker-compose 单实例安装</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> minio/minio<span class="token punctuation">:</span>RELEASE.2021<span class="token punctuation">-</span>10<span class="token punctuation">-</span>27T16<span class="token punctuation">-</span>29<span class="token punctuation">-</span>42Z
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token comment"># api 端口</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token comment"># 控制台端口</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9001:9001&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment"># 时区上海</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token comment"># 管理后台用户名</span>
      <span class="token key atrule">MINIO_ACCESS_KEY</span><span class="token punctuation">:</span> admin
      <span class="token comment"># 管理后台密码，最小8个字符</span>
      <span class="token key atrule">MINIO_SECRET_KEY</span><span class="token punctuation">:</span> zsz123456
      <span class="token comment"># https需要指定域名</span>
      <span class="token key atrule">MINIO_SERVER_URL</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
      <span class="token comment"># 开启压缩 on 开启 off 关闭</span>
      <span class="token key atrule">MINIO_COMPRESS</span><span class="token punctuation">:</span> <span class="token string">&quot;off&quot;</span>
      <span class="token comment"># 扩展名 .pdf,.doc 为空 所有类型均压缩</span>
      <span class="token key atrule">MINIO_COMPRESS_EXTENSIONS</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
      <span class="token comment"># mime 类型 application/pdf 为空 所有类型均压缩</span>
      <span class="token key atrule">MINIO_COMPRESS_MIME_TYPES</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token comment"># 映射当前目录下的data目录至容器内/data目录</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data
      <span class="token comment"># 映射配置目录</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.minio/
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server <span class="token punctuation">-</span><span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9000&#39; <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9001&#39; /data  <span class="token comment"># 指定容器中的目录 /data</span>
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># restart: always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-docker-compose-单实例支持https" tabindex="-1"><a class="header-anchor" href="#_2-4-docker-compose-单实例支持https" aria-hidden="true">#</a> 2.4 docker-compose 单实例支持https</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> minio/minio<span class="token punctuation">:</span>RELEASE.2021<span class="token punctuation">-</span>10<span class="token punctuation">-</span>27T16<span class="token punctuation">-</span>29<span class="token punctuation">-</span>42Z
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token comment"># api 端口</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token comment"># 控制台端口</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9001:9001&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment"># 时区上海</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token comment"># 管理后台用户名</span>
      <span class="token key atrule">MINIO_ROOT_USER</span><span class="token punctuation">:</span> admin
      <span class="token comment"># 管理后台密码，最小8个字符</span>
      <span class="token key atrule">MINIO_ROOT_PASSWORD</span><span class="token punctuation">:</span> zsz123456
      <span class="token comment"># https需要指定域名</span>
      <span class="token key atrule">MINIO_SERVER_URL</span><span class="token punctuation">:</span> <span class="token string">&quot;https://minio.xxx.com:9000&quot;</span>
      <span class="token key atrule">MINIO_BROWSER_REDIRECT_URL</span><span class="token punctuation">:</span> <span class="token string">&quot;https://minio.xxx.com:9001&quot;</span>
      <span class="token comment"># 开启压缩 on 开启 off 关闭</span>
      <span class="token key atrule">MINIO_COMPRESS</span><span class="token punctuation">:</span> <span class="token string">&quot;off&quot;</span>
      <span class="token comment"># 扩展名 .pdf,.doc 为空 所有类型均压缩</span>
      <span class="token key atrule">MINIO_COMPRESS_EXTENSIONS</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
      <span class="token comment"># mime 类型 application/pdf 为空 所有类型均压缩</span>
      <span class="token key atrule">MINIO_COMPRESS_MIME_TYPES</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token comment"># 映射当前目录下的data目录至容器内/data目录</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data
      <span class="token comment"># 映射配置目录</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.minio
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server <span class="token punctuation">-</span><span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9000&#39; <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9001&#39; /data  <span class="token comment"># 指定容器中的目录 /data</span>
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># restart: always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-docker-compose-集群安装" tabindex="-1"><a class="header-anchor" href="#_2-5-docker-compose-集群安装" aria-hidden="true">#</a> 2.5 docker-compose 集群安装</h3><p>主要有两文件，docker-compose.yaml 和 nginx.conf</p><h4 id="_2-5-1-docker-compose-yaml" tabindex="-1"><a class="header-anchor" href="#_2-5-1-docker-compose-yaml" aria-hidden="true">#</a> 2.5.1 docker-compose.yaml</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>version<span class="token operator">:</span> <span class="token char">&#39;3.7&#39;</span>

# <span class="token class-name">Settings</span> and configurations that are common <span class="token keyword">for</span> all containers
x<span class="token operator">-</span>minio<span class="token operator">-</span>common<span class="token operator">:</span> <span class="token operator">&amp;</span>minio<span class="token operator">-</span>common
  image<span class="token operator">:</span> quay<span class="token punctuation">.</span>io<span class="token operator">/</span>minio<span class="token operator">/</span>minio<span class="token operator">:</span><span class="token constant">RELEASE</span><span class="token punctuation">.</span><span class="token number">2022</span><span class="token operator">-</span><span class="token number">07</span><span class="token operator">-</span><span class="token number">17</span><span class="token constant">T15</span><span class="token operator">-</span><span class="token number">43</span><span class="token operator">-</span><span class="token number">14</span>Z
  command<span class="token operator">:</span> server <span class="token operator">--</span>console<span class="token operator">-</span>address <span class="token string">&quot;:9001&quot;</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>minio<span class="token punctuation">{</span><span class="token number">1.</span><span class="token punctuation">.</span><span class="token number">.4</span><span class="token punctuation">}</span><span class="token operator">/</span>data<span class="token punctuation">{</span><span class="token number">1.</span><span class="token punctuation">.</span><span class="token number">.2</span><span class="token punctuation">}</span>
  expose<span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token string">&quot;9000&quot;</span>
    <span class="token operator">-</span> <span class="token string">&quot;9001&quot;</span>
  environment<span class="token operator">:</span>
    <span class="token constant">MINIO_ROOT_USER</span><span class="token operator">:</span> minioadmin
    <span class="token constant">MINIO_ROOT_PASSWORD</span><span class="token operator">:</span> minioadmin
  healthcheck<span class="token operator">:</span>
    test<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-f&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:9000/minio/health/live&quot;</span><span class="token punctuation">]</span>
    interval<span class="token operator">:</span> <span class="token number">30</span>s
    timeout<span class="token operator">:</span> <span class="token number">20</span>s
    retries<span class="token operator">:</span> <span class="token number">3</span>

# starts <span class="token number">4</span> docker containers running minio server instances<span class="token punctuation">.</span>
# using nginx reverse proxy<span class="token punctuation">,</span> load balancing<span class="token punctuation">,</span> you can access
# it through port <span class="token number">9000.</span>
services<span class="token operator">:</span>
  minio1<span class="token operator">:</span>
    <span class="token operator">&lt;&lt;</span><span class="token operator">:</span> <span class="token operator">*</span>minio<span class="token operator">-</span>common
    hostname<span class="token operator">:</span> minio1
    volumes<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data1<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span><span class="token operator">/</span>data1
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data1<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span><span class="token operator">/</span>data2

  minio2<span class="token operator">:</span>
    <span class="token operator">&lt;&lt;</span><span class="token operator">:</span> <span class="token operator">*</span>minio<span class="token operator">-</span>common
    hostname<span class="token operator">:</span> minio2
    volumes<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data2<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span><span class="token operator">/</span>data1
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data2<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span><span class="token operator">/</span>data2

  minio3<span class="token operator">:</span>
    <span class="token operator">&lt;&lt;</span><span class="token operator">:</span> <span class="token operator">*</span>minio<span class="token operator">-</span>common
    hostname<span class="token operator">:</span> minio3
    volumes<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data3<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span><span class="token operator">/</span>data1
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data3<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span><span class="token operator">/</span>data2

  minio4<span class="token operator">:</span>
    <span class="token operator">&lt;&lt;</span><span class="token operator">:</span> <span class="token operator">*</span>minio<span class="token operator">-</span>common
    hostname<span class="token operator">:</span> minio4
    volumes<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data4<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span><span class="token operator">/</span>data1
      <span class="token operator">-</span> <span class="token punctuation">.</span>/data<span class="token operator">/</span>data4<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span><span class="token operator">/</span>data2

  nginx<span class="token operator">:</span>
    image<span class="token operator">:</span> nginx<span class="token operator">:</span><span class="token number">1.19</span><span class="token number">.2</span><span class="token operator">-</span>alpine
    hostname<span class="token operator">:</span> nginx
    volumes<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token punctuation">.</span>/nginx<span class="token punctuation">.</span>conf<span class="token operator">:</span><span class="token operator">/</span>etc<span class="token operator">/</span>nginx<span class="token operator">/</span>nginx<span class="token punctuation">.</span>conf
    ports<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;9001:9001&quot;</span>  
    depends_on<span class="token operator">:</span>
      <span class="token operator">-</span> minio1
      <span class="token operator">-</span> minio2
      <span class="token operator">-</span> minio3
      <span class="token operator">-</span> minio4

## <span class="token class-name">By</span> <span class="token keyword">default</span> <span class="token keyword">this</span> config <span class="token keyword">uses</span> <span class="token keyword">default</span> local driver<span class="token punctuation">,</span>
## <span class="token class-name">For</span> custom volumes replace <span class="token keyword">with</span> <span class="token namespace">volume</span> driver configuration<span class="token punctuation">.</span>
volumes<span class="token operator">:</span>
  data1<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span>
  data1<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span>
  data2<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span>
  data2<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span>
  data3<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span>
  data3<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span>
  data4<span class="token operator">-</span><span class="token number">1</span><span class="token operator">:</span>
  data4<span class="token operator">-</span><span class="token number">2</span><span class="token operator">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-2-nginx-conf" tabindex="-1"><a class="header-anchor" href="#_2-5-2-nginx-conf" aria-hidden="true">#</a> 2.5.2 nginx.conf</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  nginx</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  auto</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log warn</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">pid</span>        /var/run/nginx.pid</span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">4096</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       /etc/nginx/mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">access_log</span>  /var/log/nginx/access.log  main</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token comment"># include /etc/nginx/conf.d/*.conf;</span>

    <span class="token directive"><span class="token keyword">upstream</span> minio</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> minio1:9000</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio2:9000</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio3:9000</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio4:9000</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">upstream</span> console</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio1:9001</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio2:9001</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio3:9001</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> minio4:9001</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">9000</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span>  [::]:9000</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token comment"># To allow special characters in headers</span>
        <span class="token directive"><span class="token keyword">ignore_invalid_headers</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token comment"># Allow any size file to be uploaded.</span>
        <span class="token comment"># Set to a value such as 1000m; to restrict file size to a specific value</span>
        <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">0</span></span><span class="token punctuation">;</span>
        <span class="token comment"># To disable buffering</span>
        <span class="token directive"><span class="token keyword">proxy_buffering</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_request_buffering</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>

            <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
            <span class="token comment"># Default is HTTP/1, keepalive is only enabled in HTTP/1.1</span>
            <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">&quot;&quot;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">chunked_transfer_encoding</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

            <span class="token directive"><span class="token keyword">proxy_pass</span> http://minio</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">9001</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span>  [::]:9001</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token comment"># To allow special characters in headers</span>
        <span class="token directive"><span class="token keyword">ignore_invalid_headers</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token comment"># Allow any size file to be uploaded.</span>
        <span class="token comment"># Set to a value such as 1000m; to restrict file size to a specific value</span>
        <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">0</span></span><span class="token punctuation">;</span>
        <span class="token comment"># To disable buffering</span>
        <span class="token directive"><span class="token keyword">proxy_buffering</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_request_buffering</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-NginX-Proxy true</span><span class="token punctuation">;</span>

            <span class="token comment"># This is necessary to pass the correct IP to be hashed</span>
            <span class="token directive"><span class="token keyword">real_ip_header</span> X-Real-IP</span><span class="token punctuation">;</span>

            <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
            
            <span class="token comment"># To support websocket</span>
            <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Upgrade <span class="token variable">$http_upgrade</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">&quot;upgrade&quot;</span></span><span class="token punctuation">;</span>
            
            <span class="token directive"><span class="token keyword">chunked_transfer_encoding</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

            <span class="token directive"><span class="token keyword">proxy_pass</span> http://console</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,33),r={href:"https://www.bilibili.com/s/video/BV1Pq4y1U7ha",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"【2021最新版】分布式文件系统MinIO教学视频，通俗易懂！",-1);function u(k,v){const s=i("ExternalLinkIcon");return e(),p("div",null,[c,n("p",null,[n("a",r,[d,t(s)])])])}const b=a(l,[["render",u],["__file","minio-install.html.vue"]]);export{b as default};
