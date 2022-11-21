import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as p,a as n,b as o,d as t,r as i}from"./app.224ba93c.js";const l={},c=t(`<h1 id="minio\u90E8\u7F72-minio\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#minio\u90E8\u7F72-minio\u5B89\u88C5" aria-hidden="true">#</a> Minio\u90E8\u7F72 - MinIO\u5B89\u88C5</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><blockquote><p>MinIO \u662F\u4E00\u4E2A\u57FA\u4E8EApache License v2.0\u5F00\u6E90\u534F\u8BAE\u7684\u5BF9\u8C61\u5B58\u50A8\u670D\u52A1\u3002\u5B83\u517C\u5BB9\u4E9A\u9A6C\u900AS3\u4E91\u5B58\u50A8\u670D\u52A1\u63A5\u53E3\uFF0C\u975E \u5E38\u9002\u5408\u4E8E\u5B58\u50A8\u5927\u5BB9\u91CF\u975E\u7ED3\u6784\u5316\u7684\u6570\u636E\uFF0C\u4F8B\u5982\u56FE\u7247\u3001\u89C6\u9891\u3001\u65E5\u5FD7\u6587\u4EF6\u3001\u5907\u4EFD\u6570\u636E\u548C\u5BB9\u5668/\u865A\u62DF\u673A\u955C\u50CF\u7B49\uFF0C\u800C \u4E00\u4E2A\u5BF9\u8C61\u6587\u4EF6\u53EF\u4EE5\u662F\u4EFB\u610F\u5927\u5C0F\uFF0C\u4ECE\u51E0kb\u5230\u6700\u59275T\u4E0D\u7B49\u3002 MinIO\u662F\u4E00\u4E2A\u975E\u5E38\u8F7B\u91CF\u7684\u670D\u52A1,\u53EF\u4EE5\u5F88\u7B80\u5355\u7684\u548C\u5176\u4ED6\u5E94\u7528\u7684\u7ED3\u5408\uFF0C\u7C7B\u4F3C NodeJS, Redis \u6216\u8005 MySQL\u3002</p></blockquote><p>\u4E00\u4E2A\u5BF9\u8C61\u5B58\u50A8\u670D\u52A1\uFF0C\u9002\u5408\u5B58\u50A8\u975E\u7ED3\u6784\u5316\u6570\u636E\u3002\u5982\u56FE\u7247\u3001\u89C6\u9891\u3001\u65E5\u5FD7\u6587\u4EF6\u7B49</p><h3 id="_1-1-\u4F18\u70B9" tabindex="-1"><a class="header-anchor" href="#_1-1-\u4F18\u70B9" aria-hidden="true">#</a> 1.1 \u4F18\u70B9</h3><ul><li>\u90E8\u7F72\u7B80\u5355: \u4E00\u4E2Asingle\u4E8C\u8FDB\u5236\u6587\u4EF6\u5373\u662F\u4E00\u5207\uFF0C\u8FD8\u53EF\u652F\u6301\u5404\u79CD\u5E73\u53F0\u3002</li><li>minio\u652F\u6301\u6D77\u91CF\u5B58\u50A8\uFF0C\u53EF\u6309zone\u6269\u5C55(\u539Fzone\u4E0D\u53D7\u4EFB\u4F55\u5F71\u54CD)\uFF0C\u652F\u6301\u5355\u4E2A\u5BF9\u8C61\u6700\u59275TB;</li><li>\u517C\u5BB9Amazon S3\u63A5\u53E3\uFF0C\u5145\u5206\u8003\u8651\u5F00\u53D1\u4EBA\u5458\u7684\u9700\u6C42\u548C\u4F53\u9A8C;</li><li>\u4F4E\u5197\u4F59\u4E14\u78C1\u76D8\u635F\u574F\u9AD8\u5BB9\u5FCD\uFF0C\u6807\u51C6\u4E14\u6700\u9AD8\u7684\u6570\u636E\u5197\u4F59\u7CFB\u6570\u4E3A2(\u5373\u5B58\u50A8\u4E00\u4E2A1M\u7684\u6570\u636E\u5BF9\u8C61\uFF0C\u5B9E\u9645\u5360\u7528 \u78C1\u76D8\u7A7A\u95F4\u4E3A2M)\u3002\u4F46\u5728\u4EFB\u610Fn/2\u5757disk\u635F\u574F\u7684\u60C5\u51B5\u4E0B\u4F9D\u7136\u53EF\u4EE5\u8BFB\u51FA\u6570\u636E(n\u4E3A\u4E00\u4E2A\u7EA0\u5220\u7801\u96C6\u5408(Erasure Coding Set)\u4E2D\u7684disk\u6570\u91CF)\u3002\u5E76\u4E14\u8FD9\u79CD\u635F\u574F\u6062\u590D\u662F\u57FA\u4E8E\u5355\u4E2A\u5BF9\u8C61\u7684\uFF0C\u800C\u4E0D\u662F\u57FA\u4E8E\u6574\u4E2A\u5B58\u50A8\u5377\u7684\u3002</li><li>\u8BFB\u5199\u6027\u80FD\u4F18\u5F02</li></ul><h2 id="_2-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5" aria-hidden="true">#</a> 2. \u5B89\u88C5</h2><h3 id="_2-1-centos7-\u5355\u673A\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#_2-1-centos7-\u5355\u673A\u90E8\u7F72" aria-hidden="true">#</a> 2.1 Centos7 \u5355\u673A\u90E8\u7F72</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-q</span> http://dl.minio.org.cn/server/minio/release/linux-amd64/minio
<span class="token function">chmod</span> +x minio
<span class="token comment">#\u542F\u52A8minio server\u670D\u52A1\uFF0C\u6307\u5B9A\u6570\u636E\u5B58\u50A8\u76EE\u5F55/mnt/data</span>
./minio server /mnt/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925212033260.png" alt="image-20210925212033260" loading="lazy"></p><p>\u9ED8\u8BA4\u7528\u6237\u540D\u5BC6\u7801minioadmin:minioadmin\uFF0C\u4FEE\u6539\u9ED8\u8BA4\u7528\u6237\u540D\u5BC6\u7801\u53EF\u4EE5\u4F7F\u7528\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">MINIO_ROOT_USER</span><span class="token operator">=</span>admin
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MINIO_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">12345678</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9ED8\u8BA4\u7684\u914D\u7F6E\u76EE\u5F55\u662F\${HOME}/.minio\uFF0C\u53EF\u4EE5\u901A\u8FC7--config-dir\u547D\u4EE4\u81EA\u5B9A\u4E49\u914D\u7F6E\u76EE\u5F55\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./minio server --config-dir /mnt/config /mnt/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u63A7\u5236\u53F0\u76D1\u542C\u7AEF\u53E3\u662F\u52A8\u6001\u751F\u6210\u7684\uFF0C\u53EF\u4EE5\u901A\u8FC7--console-address &quot;:port&quot;\u6307\u5B9A\u9759\u6001\u7AEF\u53E3</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./minio server --console-address <span class="token string">&quot;:9001&quot;</span> /mnt/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210925212415270.png" alt="image-20210925212415270" loading="lazy"></p><h3 id="_2-2-docker\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-2-docker\u5B89\u88C5" aria-hidden="true">#</a> 2.2 docker\u5B89\u88C5</h3><p>\u6CE8\uFF1A\u8DDF\u4E2D\u6587\u5B98\u7F51\u6709\u5DE8\u5927\u4E0D\u540C\u3002\u4E2D\u6587\u5B98\u7F51\u6CA1\u6709\u6307\u5B9Aconsole\u7AEF\u53E3</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">9001</span>:50000 <span class="token parameter variable">--name</span> minio <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/config:/root/.minio <span class="token punctuation">\\</span>
minio/minio server --console-address <span class="token string">&quot;:9001&quot;</span> /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MinIO\u81EA\u5B9A\u4E49\u7528\u6237\u540D\u5BC6\u7801</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">9001</span>:50000 <span class="token parameter variable">--name</span> minio <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ROOT_USER=admin&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ROOT_PASSWORD=12345678&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mnt/config:/root/.minio <span class="token punctuation">\\</span>
minio/minio server --console-address <span class="token string">&quot;:9001&quot;</span> /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-docker-compose-\u5355\u5B9E\u4F8B\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-3-docker-compose-\u5355\u5B9E\u4F8B\u5B89\u88C5" aria-hidden="true">#</a> 2.3 docker-compose \u5355\u5B9E\u4F8B\u5B89\u88C5</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> minio/minio<span class="token punctuation">:</span>RELEASE.2021<span class="token punctuation">-</span>10<span class="token punctuation">-</span>27T16<span class="token punctuation">-</span>29<span class="token punctuation">-</span>42Z
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token comment"># api \u7AEF\u53E3</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token comment"># \u63A7\u5236\u53F0\u7AEF\u53E3</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9001:9001&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment"># \u65F6\u533A\u4E0A\u6D77</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token comment"># \u7BA1\u7406\u540E\u53F0\u7528\u6237\u540D</span>
      <span class="token key atrule">MINIO_ACCESS_KEY</span><span class="token punctuation">:</span> admin
      <span class="token comment"># \u7BA1\u7406\u540E\u53F0\u5BC6\u7801\uFF0C\u6700\u5C0F8\u4E2A\u5B57\u7B26</span>
      <span class="token key atrule">MINIO_SECRET_KEY</span><span class="token punctuation">:</span> zsz123456
      <span class="token comment"># https\u9700\u8981\u6307\u5B9A\u57DF\u540D</span>
      <span class="token key atrule">MINIO_SERVER_URL</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
      <span class="token comment"># \u5F00\u542F\u538B\u7F29 on \u5F00\u542F off \u5173\u95ED</span>
      <span class="token key atrule">MINIO_COMPRESS</span><span class="token punctuation">:</span> <span class="token string">&quot;off&quot;</span>
      <span class="token comment"># \u6269\u5C55\u540D .pdf,.doc \u4E3A\u7A7A \u6240\u6709\u7C7B\u578B\u5747\u538B\u7F29</span>
      <span class="token key atrule">MINIO_COMPRESS_EXTENSIONS</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
      <span class="token comment"># mime \u7C7B\u578B application/pdf \u4E3A\u7A7A \u6240\u6709\u7C7B\u578B\u5747\u538B\u7F29</span>
      <span class="token key atrule">MINIO_COMPRESS_MIME_TYPES</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token comment"># \u6620\u5C04\u5F53\u524D\u76EE\u5F55\u4E0B\u7684data\u76EE\u5F55\u81F3\u5BB9\u5668\u5185/data\u76EE\u5F55</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data
      <span class="token comment"># \u6620\u5C04\u914D\u7F6E\u76EE\u5F55</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.minio/
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server <span class="token punctuation">-</span><span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9000&#39; <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9001&#39; /data  <span class="token comment"># \u6307\u5B9A\u5BB9\u5668\u4E2D\u7684\u76EE\u5F55 /data</span>
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># restart: always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-docker-compose-\u5355\u5B9E\u4F8B\u652F\u6301https" tabindex="-1"><a class="header-anchor" href="#_2-4-docker-compose-\u5355\u5B9E\u4F8B\u652F\u6301https" aria-hidden="true">#</a> 2.4 docker-compose \u5355\u5B9E\u4F8B\u652F\u6301https</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> minio/minio<span class="token punctuation">:</span>RELEASE.2021<span class="token punctuation">-</span>10<span class="token punctuation">-</span>27T16<span class="token punctuation">-</span>29<span class="token punctuation">-</span>42Z
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token comment"># api \u7AEF\u53E3</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token comment"># \u63A7\u5236\u53F0\u7AEF\u53E3</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9001:9001&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment"># \u65F6\u533A\u4E0A\u6D77</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token comment"># \u7BA1\u7406\u540E\u53F0\u7528\u6237\u540D</span>
      <span class="token key atrule">MINIO_ROOT_USER</span><span class="token punctuation">:</span> admin
      <span class="token comment"># \u7BA1\u7406\u540E\u53F0\u5BC6\u7801\uFF0C\u6700\u5C0F8\u4E2A\u5B57\u7B26</span>
      <span class="token key atrule">MINIO_ROOT_PASSWORD</span><span class="token punctuation">:</span> zsz123456
      <span class="token comment"># https\u9700\u8981\u6307\u5B9A\u57DF\u540D</span>
      <span class="token key atrule">MINIO_SERVER_URL</span><span class="token punctuation">:</span> <span class="token string">&quot;https://minio.xxx.com:9000&quot;</span>
      <span class="token key atrule">MINIO_BROWSER_REDIRECT_URL</span><span class="token punctuation">:</span> <span class="token string">&quot;https://minio.xxx.com:9001&quot;</span>
      <span class="token comment"># \u5F00\u542F\u538B\u7F29 on \u5F00\u542F off \u5173\u95ED</span>
      <span class="token key atrule">MINIO_COMPRESS</span><span class="token punctuation">:</span> <span class="token string">&quot;off&quot;</span>
      <span class="token comment"># \u6269\u5C55\u540D .pdf,.doc \u4E3A\u7A7A \u6240\u6709\u7C7B\u578B\u5747\u538B\u7F29</span>
      <span class="token key atrule">MINIO_COMPRESS_EXTENSIONS</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
      <span class="token comment"># mime \u7C7B\u578B application/pdf \u4E3A\u7A7A \u6240\u6709\u7C7B\u578B\u5747\u538B\u7F29</span>
      <span class="token key atrule">MINIO_COMPRESS_MIME_TYPES</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token comment"># \u6620\u5C04\u5F53\u524D\u76EE\u5F55\u4E0B\u7684data\u76EE\u5F55\u81F3\u5BB9\u5668\u5185/data\u76EE\u5F55</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/data
      <span class="token comment"># \u6620\u5C04\u914D\u7F6E\u76EE\u5F55</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/root/.minio
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server <span class="token punctuation">-</span><span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9000&#39; <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address &#39;<span class="token punctuation">:</span>9001&#39; /data  <span class="token comment"># \u6307\u5B9A\u5BB9\u5668\u4E2D\u7684\u76EE\u5F55 /data</span>
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token comment"># restart: always</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-docker-compose-\u96C6\u7FA4\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-5-docker-compose-\u96C6\u7FA4\u5B89\u88C5" aria-hidden="true">#</a> 2.5 docker-compose \u96C6\u7FA4\u5B89\u88C5</h3><p>\u4E3B\u8981\u6709\u4E24\u6587\u4EF6\uFF0Cdocker-compose.yaml \u548C nginx.conf</p><h4 id="_2-5-1-docker-compose-yaml" tabindex="-1"><a class="header-anchor" href="#_2-5-1-docker-compose-yaml" aria-hidden="true">#</a> 2.5.1 docker-compose.yaml</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>version<span class="token operator">:</span> <span class="token char">&#39;3.7&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-2-nginx-conf" tabindex="-1"><a class="header-anchor" href="#_2-5-2-nginx-conf" aria-hidden="true">#</a> 2.5.2 nginx.conf</h4><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  nginx</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,33),r={href:"https://www.bilibili.com/s/video/BV1Pq4y1U7ha",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"\u30102021\u6700\u65B0\u7248\u3011\u5206\u5E03\u5F0F\u6587\u4EF6\u7CFB\u7EDFMinIO\u6559\u5B66\u89C6\u9891\uFF0C\u901A\u4FD7\u6613\u61C2\uFF01",-1);function u(k,v){const s=i("ExternalLinkIcon");return e(),p("div",null,[c,n("p",null,[n("a",r,[d,o(s)])])])}const h=a(l,[["render",u],["__file","minio-install.html.vue"]]);export{h as default};
