import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c,a as s,b as e,e as i,d as n,r as t}from"./app.8f09d17c.js";const r={},p=i(`<h1 id="\u96C6\u6210docker\u5B9E\u73B0\u4E00\u952E\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#\u96C6\u6210docker\u5B9E\u73B0\u4E00\u952E\u90E8\u7F72" aria-hidden="true">#</a> \u96C6\u6210docker\u5B9E\u73B0\u4E00\u952E\u90E8\u7F72</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u8FD9\u91CC\u7684\u4E00\u952E\u90E8\u7F72 \u4E3B\u8981\u4EE5\u82E5\u4F9D\u524D\u540E\u7AEF\u5206\u79BB\u9879\u76EE\u4E3A\u4F8B\uFF0C\u4EC5\u63D0\u4F9B\u4E00\u4E2A\u601D\u8DEF\uFF0C\u9879\u76EE\u5B9E\u9645\u4F7F\u7528\u4E2D\u53EF\u6839\u636E\u81EA\u5DF1\u9879\u76EE\u60C5\u51B5\u8C03\u6574</p><h2 id="_2-\u73AF\u5883\u642D\u5EFA" tabindex="-1"><a class="header-anchor" href="#_2-\u73AF\u5883\u642D\u5EFA" aria-hidden="true">#</a> 2. \u73AF\u5883\u642D\u5EFA</h2><p><code>Docker</code>\u662F\u4E00\u4E2A\u865A\u62DF\u73AF\u5883\u5BB9\u5668\uFF0C\u53EF\u4EE5\u5C06\u4F60\u7684\u5F00\u53D1\u73AF\u5883\u3001\u4EE3\u7801\u3001\u914D\u7F6E\u6587\u4EF6\u7B49\u4E00\u5E76\u6253\u5305\u5230\u8FD9\u4E2A\u5BB9\u5668\u4E2D\uFF0C\u6700\u7EC8\u53EA\u9700\u8981\u4E00\u4E2A\u547D\u4EE4\u5373\u53EF\u6253\u5305\u53D1\u5E03\u5E94\u7528\u5230\u4EFB\u610F\u5E73\u53F0\u4E2D\u3002</p><p>1\u3001\u5B89\u88C5docker</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce
<span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;https://github.com/docker/compose/releases/download/1.25.0/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2\u3001\u68C0\u67E5<code>docker</code>\u548C<code>docker-compose</code>\u662F\u5426\u5B89\u88C5\u6210\u529F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> version
<span class="token function">docker-compose</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3\u3001\u6587\u4EF6\u6388\u6743</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-docker-\u811A\u672C\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#_3-docker-\u811A\u672C\u4E0B\u8F7D" aria-hidden="true">#</a> 3. docker \u811A\u672C\u4E0B\u8F7D</h2>`,12),d=n("\u94FE\u63A5:"),u={href:"https://pan.baidu.com/s/1yse7-5G5wsghnz4MqUQmvQ",target:"_blank",rel:"noopener noreferrer"},k=n("https://pan.baidu.com/s/1yse7-5G5wsghnz4MqUQmvQ"),v=n(" \u5BC6\u7801:ru81"),m=i(`<ul><li>\u5176\u4E2D<code>db\u76EE\u5F55</code>\u5B58\u653E<code>ruoyi\u6570\u636E\u5E93\u811A\u672C</code></li><li>\u5176\u4E2D<code>jar\u76EE\u5F55</code>\u5B58\u653E\u6253\u5305\u597D\u7684<code>jar\u5E94\u7528\u6587\u4EF6</code></li><li>\u6570\u636E\u5E93<code>mysql</code>\u5730\u5740\u9700\u8981\u4FEE\u6539\u6210<code>ruoyi-mysql</code></li><li>\u6570\u636E\u5E93\u811A\u672C\u5934\u90E8\u9700\u8981\u6DFB\u52A0<code>SET NAMES &#39;utf8&#39;;</code>\uFF08\u9632\u6B62\u4E71\u7801\uFF09</li><li>redis\u5730\u5740\u4E5F\u9700\u8981\u4FEE\u6539</li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220616205125631.png" alt="image-20220616205125631" loading="lazy"></p><h2 id="_4-\u542F\u52A8docker" tabindex="-1"><a class="header-anchor" href="#_4-\u542F\u52A8docker" aria-hidden="true">#</a> 4. \u542F\u52A8docker</h2><blockquote><p>\u542F\u52A8docker</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u6784\u5EFAdocker\u670D\u52A1</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker-compose</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u542F\u52A8docker\u5BB9\u5668</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u8BBF\u95EE\u5E94\u7528\u5730\u5740</p></blockquote>`,10),b=n("\u6253\u5F00\u6D4F\u89C8\u5668\uFF0C\u8F93\u5165\uFF1A"),h={href:"http://localhost/",target:"_blank",rel:"noopener noreferrer"},y=n("http://localhost:80"),g=n("\uFF0C\u82E5\u80FD\u6B63\u786E\u5C55\u793A\u9875\u9762\uFF0C\u5219\u8868\u660E\u73AF\u5883\u642D\u5EFA\u6210\u529F\u3002"),_=i(`<blockquote><p>\u63D0\u793A</p><p>\u542F\u52A8\u670D\u52A1\u7684\u5BB9\u5668<code>docker-compose up ruoyi-mysql ruoyi-server</code></p><p>\u505C\u6B62\u670D\u52A1\u7684\u5BB9\u5668<code>docker-compose stop ruoyi-mysql ruoyi-server</code></p></blockquote><h2 id="_5-\u811A\u672C\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_5-\u811A\u672C\u4ECB\u7ECD" aria-hidden="true">#</a> 5. \u811A\u672C\u4ECB\u7ECD</h2><h3 id="_5-1-mysql-dockerfile" tabindex="-1"><a class="header-anchor" href="#_5-1-mysql-dockerfile" aria-hidden="true">#</a> 5.1 mysql-dockerfile</h3><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token comment"># \u57FA\u7840\u955C\u50CF</span>
<span class="token instruction"><span class="token keyword">FROM</span> mysql:5.7</span>
<span class="token comment"># author</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> ruoyi</span>

<span class="token comment"># \u6267\u884Csql\u811A\u672C</span>
<span class="token instruction"><span class="token keyword">ADD</span> ./db/*.sql /docker-entrypoint-initdb.d/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-mysql-dockerfile" tabindex="-1"><a class="header-anchor" href="#_5-2-mysql-dockerfile" aria-hidden="true">#</a> 5.2 mysql-dockerfile</h3><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token comment"># \u57FA\u7840\u955C\u50CF</span>
<span class="token instruction"><span class="token keyword">FROM</span> redis</span>
<span class="token comment"># author</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> ruoyi</span>

<span class="token comment"># \u6302\u8F7D\u76EE\u5F55</span>
<span class="token instruction"><span class="token keyword">VOLUME</span> /zsz/ruoyi/redis</span>
<span class="token comment"># \u521B\u5EFA\u76EE\u5F55</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /zsz/ruoyi/redis</span>
<span class="token comment"># \u6307\u5B9A\u8DEF\u5F84</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /zsz/ruoyi/redis</span>
<span class="token comment"># \u590D\u5236conf\u6587\u4EF6\u5230\u8DEF\u5F84</span>
<span class="token instruction"><span class="token keyword">COPY</span> ./conf/redis.conf /zsz/ruoyi/redis/redis.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-ruoyi-dockerfile" tabindex="-1"><a class="header-anchor" href="#_5-3-ruoyi-dockerfile" aria-hidden="true">#</a> 5.3 ruoyi-dockerfile</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># \u57FA\u7840\u955C\u50CF
FROM java:8
# author
MAINTAINER ruoyi

# \u6302\u8F7D\u76EE\u5F55
VOLUME /zsz/ruoyi
# \u521B\u5EFA\u76EE\u5F55
RUN mkdir -p /zsz/ruoyi
# \u6307\u5B9A\u8DEF\u5F84
WORKDIR /zsz/ruoyi
# \u590D\u5236jar\u6587\u4EF6\u5230\u8DEF\u5F84de
COPY ./jar/*.jar /zsz/ruoyi/ruoyi.jar
# \u542F\u52A8\u5E94\u7528
ENTRYPOINT [&quot;java&quot;,&quot;-jar&quot;,&quot;ruoyi.jar&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_5-4-docker-compose-yml" aria-hidden="true">#</a> 5.4 docker-compose.yml</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">version</span> <span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,11),f={href:"http://doc.ruoyi.vip/ruoyi/document/cjjc.html#%E9%9B%86%E6%88%90docker%E5%AE%9E%E7%8E%B0%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2",target:"_blank",rel:"noopener noreferrer"},q=n("\u96C6\u6210docker\u5B9E\u73B0\u4E00\u952E\u90E8\u7F72");function z(x,E){const a=t("ExternalLinkIcon");return l(),c("div",null,[p,s("p",null,[d,s("a",u,[k,e(a)]),v]),m,s("p",null,[b,s("a",h,[y,e(a)]),g]),_,s("p",null,[s("a",f,[q,e(a)])])])}const N=o(r,[["render",z],["__file","docker-y-one-key-deploy.html.vue"]]);export{N as default};
