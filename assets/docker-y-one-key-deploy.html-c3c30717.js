import{_ as l,W as o,X as c,Y as s,Z as n,$ as e,a0 as i,D as t}from"./framework-0cf5f349.js";const r={},p=i(`<h1 id="集成docker实现一键部署" tabindex="-1"><a class="header-anchor" href="#集成docker实现一键部署" aria-hidden="true">#</a> 集成docker实现一键部署</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>这里的一键部署 主要以若依前后端分离项目为例，仅提供一个思路，项目实际使用中可根据自己项目情况调整</p><h2 id="_2-环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-环境搭建" aria-hidden="true">#</a> 2. 环境搭建</h2><p><code>Docker</code>是一个虚拟环境容器，可以将你的开发环境、代码、配置文件等一并打包到这个容器中，最终只需要一个命令即可打包发布应用到任意平台中。</p><p>1、安装docker</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce
<span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;https://github.com/docker/compose/releases/download/1.25.0/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、检查<code>docker</code>和<code>docker-compose</code>是否安装成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> version
<span class="token function">docker-compose</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3、文件授权</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-docker-脚本下载" tabindex="-1"><a class="header-anchor" href="#_3-docker-脚本下载" aria-hidden="true">#</a> 3. docker 脚本下载</h2>`,12),d={href:"https://pan.baidu.com/s/1yse7-5G5wsghnz4MqUQmvQ",target:"_blank",rel:"noopener noreferrer"},u=i(`<ul><li>其中<code>db目录</code>存放<code>ruoyi数据库脚本</code></li><li>其中<code>jar目录</code>存放打包好的<code>jar应用文件</code></li><li>数据库<code>mysql</code>地址需要修改成<code>ruoyi-mysql</code></li><li>数据库脚本头部需要添加<code>SET NAMES &#39;utf8&#39;;</code>（防止乱码）</li><li>redis地址也需要修改</li></ul><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220616205125631.png" alt="image-20220616205125631" tabindex="0" loading="lazy"><figcaption>image-20220616205125631</figcaption></figure><h2 id="_4-启动docker" tabindex="-1"><a class="header-anchor" href="#_4-启动docker" aria-hidden="true">#</a> 4. 启动docker</h2><blockquote><p>启动docker</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>构建docker服务</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>启动docker容器</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>访问应用地址</p></blockquote>`,10),k={href:"http://localhost/",target:"_blank",rel:"noopener noreferrer"},v=i(`<blockquote><p>提示</p><p>启动服务的容器<code>docker-compose up ruoyi-mysql ruoyi-server</code></p><p>停止服务的容器<code>docker-compose stop ruoyi-mysql ruoyi-server</code></p></blockquote><h2 id="_5-脚本介绍" tabindex="-1"><a class="header-anchor" href="#_5-脚本介绍" aria-hidden="true">#</a> 5. 脚本介绍</h2><h3 id="_5-1-mysql-dockerfile" tabindex="-1"><a class="header-anchor" href="#_5-1-mysql-dockerfile" aria-hidden="true">#</a> 5.1 mysql-dockerfile</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># 基础镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> mysql:5.7</span>
<span class="token comment"># author</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> ruoyi</span>

<span class="token comment"># 执行sql脚本</span>
<span class="token instruction"><span class="token keyword">ADD</span> ./db/*.sql /docker-entrypoint-initdb.d/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-mysql-dockerfile" tabindex="-1"><a class="header-anchor" href="#_5-2-mysql-dockerfile" aria-hidden="true">#</a> 5.2 mysql-dockerfile</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># 基础镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> redis</span>
<span class="token comment"># author</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> ruoyi</span>

<span class="token comment"># 挂载目录</span>
<span class="token instruction"><span class="token keyword">VOLUME</span> /zsz/ruoyi/redis</span>
<span class="token comment"># 创建目录</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /zsz/ruoyi/redis</span>
<span class="token comment"># 指定路径</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /zsz/ruoyi/redis</span>
<span class="token comment"># 复制conf文件到路径</span>
<span class="token instruction"><span class="token keyword">COPY</span> ./conf/redis.conf /zsz/ruoyi/redis/redis.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-ruoyi-dockerfile" tabindex="-1"><a class="header-anchor" href="#_5-3-ruoyi-dockerfile" aria-hidden="true">#</a> 5.3 ruoyi-dockerfile</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 基础镜像
FROM java:8
# author
MAINTAINER ruoyi

# 挂载目录
VOLUME /zsz/ruoyi
# 创建目录
RUN mkdir -p /zsz/ruoyi
# 指定路径
WORKDIR /zsz/ruoyi
# 复制jar文件到路径de
COPY ./jar/*.jar /zsz/ruoyi/ruoyi.jar
# 启动应用
ENTRYPOINT [&quot;java&quot;,&quot;-jar&quot;,&quot;ruoyi.jar&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_5-4-docker-compose-yml" aria-hidden="true">#</a> 5.4 docker-compose.yml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span> <span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">ruoyi-mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ruoyi<span class="token punctuation">-</span>mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> .
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8306:3306&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./mysql/conf<span class="token punctuation">:</span>/zsz/ruoyi/mysql/conf.d
      <span class="token punctuation">-</span> ./mysql/logs<span class="token punctuation">:</span>/zsz/ruoyi/mysql/logs
      <span class="token punctuation">-</span> ./mysql/data<span class="token punctuation">:</span>/zsz/ruoyi/mysql/mysqldata
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
          <span class="token string">&#39;mysqld&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;--innodb-buffer-pool-size=80M&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;--character-set-server=utf8mb4&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;--collation-server=utf8mb4_unicode_ci&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;--default-time-zone=+8:00&#39;</span><span class="token punctuation">,</span>
          <span class="token string">&#39;--lower-case-table-names=1&#39;</span>
        <span class="token punctuation">]</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> ry<span class="token punctuation">-</span>vue
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>
  <span class="token key atrule">ruoyi-redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ruoyi<span class="token punctuation">-</span>redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> .
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8379:6379&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./conf/redis.conf<span class="token punctuation">:</span>/zsz/ruoyi/redis/redis.conf
      <span class="token punctuation">-</span> ./redis/data<span class="token punctuation">:</span>/data
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server /zsz/ruoyi/redis/redis.conf
  <span class="token key atrule">ruoyi-server</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ruoyi<span class="token punctuation">-</span>server
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> .
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> ruoyi<span class="token punctuation">-</span>dockerfile
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./ruoyi/logs<span class="token punctuation">:</span>/zsz/ruoyi/logs
      <span class="token punctuation">-</span> ./ruoyi/uploadPath<span class="token punctuation">:</span>/zsz/ruoyi/uploadPath
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ruoyi<span class="token punctuation">-</span>mysql
      <span class="token punctuation">-</span> ruoyi<span class="token punctuation">-</span>redis
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ruoyi<span class="token punctuation">-</span>mysql
      <span class="token punctuation">-</span> ruoyi<span class="token punctuation">-</span>redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,11),m={href:"http://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90docker%E5%AE%9E%E7%8E%B0%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2",target:"_blank",rel:"noopener noreferrer"};function b(y,h){const a=t("ExternalLinkIcon");return o(),c("div",null,[p,s("p",null,[n("链接:"),s("a",d,[n("https://pan.baidu.com/s/1yse7-5G5wsghnz4MqUQmvQ"),e(a)]),n(" 密码:ru81")]),u,s("p",null,[n("打开浏览器，输入："),s("a",k,[n("http://localhost:80"),e(a)]),n("，若能正确展示页面，则表明环境搭建成功。")]),v,s("p",null,[s("a",m,[n("集成docker实现一键部署"),e(a)])])])}const f=l(r,[["render",b],["__file","docker-y-one-key-deploy.html.vue"]]);export{f as default};
