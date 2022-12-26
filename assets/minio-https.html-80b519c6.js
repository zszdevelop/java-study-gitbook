import{_ as t,W as o,X as l,Y as n,Z as s,$ as e,a0 as i,D as c}from"./framework-0cf5f349.js";const p={},r=n("h1",{id:"minio部署-minio配置https",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#minio部署-minio配置https","aria-hidden":"true"},"#"),s(" Minio部署 - minio配置HTTPS")],-1),d=n("h2",{id:"_1-简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-简介","aria-hidden":"true"},"#"),s(" 1. 简介")],-1),u=n("p",null,"MinIO部署默认以HTTP方式对外提供服务，如果我们需要支持https 应该怎么做呢？",-1),v=n("p",null,"主要思路就是",-1),m=n("ul",null,[n("li",null,"万能大法，通过nginx反向代理，将https配置在nginx侧，内部的MinIO还是使用HTTP；"),n("li",null,"MinIO服务端直接配置成HTTPS；")],-1),k={href:"https://java.isture.com/problem&solve/https/%E4%BD%BF%E7%94%A8acme.sh%E7%94%9F%E6%88%90%E5%85%8D%E8%B4%B9%E7%9A%84SSL%E8%AF%81%E4%B9%A6.html",target:"_blank",rel:"noopener noreferrer"},h=i(`<h2 id="_2-nginx-方案" tabindex="-1"><a class="header-anchor" href="#_2-nginx-方案" aria-hidden="true">#</a> 2. nginx 方案</h2><ol><li>修改nginx配置文件</li></ol><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code> <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>          <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>     minio.aaa.com</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span>  <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_certificate</span> /home/wwwroot/minio.aaa.com/cret/cert.pem</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /home/wwwroot/minio.aaa.com/cret/key.pem</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
           <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
           <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>
           <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>

           <span class="token directive"><span class="token keyword">proxy_connect_timeout</span>  <span class="token number">300</span></span><span class="token punctuation">;</span>
           <span class="token comment"># Default is HTTP/1, keepalive is only enabled in HTTP/1.1</span>
           <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>
           <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">&quot;&quot;</span></span><span class="token punctuation">;</span>

            <span class="token directive"><span class="token keyword">proxy_pass</span> http://47.119.1.1:9000</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>java 连接也改成https</li></ol><h3 id="_3-1-遇到的问题" tabindex="-1"><a class="header-anchor" href="#_3-1-遇到的问题" aria-hidden="true">#</a> 3.1 遇到的问题</h3><h4 id="_3-1-1-提示签名不对" tabindex="-1"><a class="header-anchor" href="#_3-1-1-提示签名不对" aria-hidden="true">#</a> 3.1.1 提示签名不对</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>io.minio.errors.ErrorResponseException: The request signature we calculated does not match the signature you provided. Check your key and signing method.
	at io.minio.S3Base.execute(S3Base.java:670)
	at io.minio.S3Base.getRegion(S3Base.java:694)
	at io.minio.S3Base.execute(S3Base.java:470)
	at io.minio.S3Base.executeHead(S3Base.java:728)
	at io.minio.S3Base.statObject(S3Base.java:1447)
	at io.minio.MinioClient.statObject(MinioClient.java:217)
	at com.fardu.file.service.impl.MinioFileServiceImpl.getStatInfo(MinioFileServiceImpl.java:283)
	at com.fardu.file.service.impl.MinioFileServiceImpl.exists(MinioFileServiceImpl.java:201)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决</p><p>nginx 添加如下配置</p><div class="language-ngx line-numbers-mode" data-ext="ngx"><pre class="language-ngx"><code> proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_set_header Host $http_host;

           proxy_connect_timeout  300;
           # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
           proxy_http_version 1.1;
           proxy_set_header Connection &quot;&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-minio服务端配置成https" tabindex="-1"><a class="header-anchor" href="#_3-minio服务端配置成https" aria-hidden="true">#</a> 3. MinIO服务端配置成HTTPS</h2><h3 id="_3-1-证书存放" tabindex="-1"><a class="header-anchor" href="#_3-1-证书存放" aria-hidden="true">#</a> 3.1 证书存放</h3>`,12),b={href:"https://link.juejin.cn/?target=https%3A%2F%2Fdocs.min.io%2Fdocs%2Fhow-to-secure-access-to-minio-server-with-tls.html",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"{{HOME}}/.minio/certs",-1),g=i(`<p><strong>注意：</strong></p><ul><li>私钥需要命名为：private.key</li><li>公钥需要命名为：public.crt (如果公钥是以pem格式结尾，可直接改为crt格式)</li></ul><blockquote><p>如果是下面的docker-compose 则放在对应的映射目录下</p></blockquote><h3 id="_3-2-docker-compose-配置" tabindex="-1"><a class="header-anchor" href="#_3-2-docker-compose-配置" aria-hidden="true">#</a> 3.2 docker-compose 配置</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-docker启动" tabindex="-1"><a class="header-anchor" href="#_3-3-docker启动" aria-hidden="true">#</a> 3.3 docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> <span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看日志</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220725233426822.png" alt="image-20220725233426822" tabindex="0" loading="lazy"><figcaption>image-20220725233426822</figcaption></figure><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结" aria-hidden="true">#</a> 4. 总结</h2><p>相对来说nginx 会更灵活一点，以后集群啥的都可以通过nginx来做，而minio服务改造成https 就只能是minio服务单台实例https了</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,13),x={href:"https://juejin.cn/post/7021057486404714532",target:"_blank",rel:"noopener noreferrer"};function y(f,S){const a=c("ExternalLinkIcon");return o(),l("div",null,[r,d,u,v,m,n("blockquote",null,[n("p",null,[s("如何生成https证书："),n("a",k,[s("使用acme.sh生成免费的SSL证书"),e(a)])])]),h,n("p",null,[s("首先，根据官网描述（"),n("a",b,[s("How to secure access to MinIO server with TLS"),e(a)]),s("），将TLS的公私钥放到："),_,s(" 里")]),g,n("p",null,[n("a",x,[s("踩坑记录之MinIO添加HTTPS访问"),e(a)])])])}const w=t(p,[["render",y],["__file","minio-https.html.vue"]]);export{w as default};
