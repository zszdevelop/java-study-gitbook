import{_ as t,W as c,X as l,Y as n,Z as s,$ as e,a0 as i,D as o}from"./framework-0cf5f349.js";const d={},r=i(`<h1 id="minio客户端mc使用" tabindex="-1"><a class="header-anchor" href="#minio客户端mc使用" aria-hidden="true">#</a> Minio客户端mc使用</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>MinIO Client (mc)为ls，cat，cp，mirror，diff，find等UNIX命令提供了一种替代方案。它支持文件系统和兼容Amazon S3的云存储服务（AWS Signature v2和v4）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> 列出文件和文件夹。
mb 创建一个存储桶或一个文件夹。
<span class="token function">cat</span> 显示文件和对象内容。
pipe 将一个STDIN重定向到一个对象或者文件或者STDOUT。
share 生成用于共享的URL。
<span class="token function">cp</span> 拷贝文件和对象。
mirror 给存储桶和文件夹做镜像。
<span class="token function">find</span> 基于参数查找文件。
<span class="token function">diff</span> 对两个文件夹或者存储桶比较差异。
<span class="token function">rm</span> 删除文件和对象。
events 管理对象通知。
<span class="token function">watch</span> 监视文件和对象的事件。
policy 管理访问策略。
config 管理mc配置文件。
update 检查软件更新。
version 输出版本信息。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-客户端下载" tabindex="-1"><a class="header-anchor" href="#_2-客户端下载" aria-hidden="true">#</a> 2. 客户端下载</h2><h3 id="_2-1-mac安装" tabindex="-1"><a class="header-anchor" href="#_2-1-mac安装" aria-hidden="true">#</a> 2.1 Mac安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> minio/stable/mc
<span class="token function">mc</span> <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-window下载" tabindex="-1"><a class="header-anchor" href="#_2-2-window下载" aria-hidden="true">#</a> 2.2 window下载</h3>`,8),p={href:"http://dl.minio.org.cn/client/mc/release/windows-amd64/mc.exe%5B",target:"_blank",rel:"noopener noreferrer"},u=i(`<h2 id="_3-配置mc" tabindex="-1"><a class="header-anchor" href="#_3-配置mc" aria-hidden="true">#</a> 3. 配置mc</h2><p>mc 将所有的配置信息都存储在~/.mc/config.json 文件中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询mc host配置</span>
<span class="token function">mc</span> config <span class="token function">host</span> <span class="token function">ls</span>
<span class="token comment"># 添加minio服务</span>
<span class="token function">mc</span> config <span class="token function">host</span> <span class="token function">add</span> minio-server http://192.168.0.1:9000 admin <span class="token number">12345678</span>
<span class="token comment"># 删除host</span>
<span class="token function">mc</span> config <span class="token function">host</span> remove minio-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-mc命令使用" tabindex="-1"><a class="header-anchor" href="#_4-mc命令使用" aria-hidden="true">#</a> 4. mc命令使用</h2><table><thead><tr><th>ls - 列出存储桶和 对象</th><th>mb - 创建存储桶</th><th>cat - 合并对象</th></tr></thead><tbody><tr><td>cp - 拷贝对象</td><td>rm - 删除对象</td><td>pipe - Pipe到一个对象</td></tr><tr><td>share - 共享</td><td>mirror - 存储桶镜像</td><td>find - 查找文件和对象</td></tr><tr><td>diff - 比较存储桶差异</td><td>policy - 给存储桶或前缀设置访问策略</td><td></td></tr><tr><td>config - 管理配置文件</td><td>watch - 事件监听</td><td>events - 管理存储桶事件</td></tr><tr><td>update - 管理软件更新</td><td>version - 显示版本信息</td><td></td></tr></tbody></table><h3 id="_4-1-上传下载" tabindex="-1"><a class="header-anchor" href="#_4-1-上传下载" aria-hidden="true">#</a> 4.1 上传下载</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询minio服务上的所有buckets(文件和文件夹)</span>
<span class="token function">mc</span> <span class="token function">ls</span> minio-server

<span class="token comment"># 下载文件</span>
<span class="token function">mc</span> <span class="token function">cp</span> minio-server/test/dog.png /Users/zsz/Desktop/temp/

<span class="token comment">#删除文件</span>
<span class="token function">mc</span> <span class="token function">rm</span> minio-server/test/dog.png

<span class="token comment">#上传文件</span>
<span class="token function">mc</span> <span class="token function">cp</span> /Users/zsz/Desktop/temp/dog.png  minio-server/test/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930140312806.png" alt="image-20210930140312806" tabindex="0" loading="lazy"><figcaption>image-20210930140312806</figcaption></figure><h3 id="_4-2-bucket管理" tabindex="-1"><a class="header-anchor" href="#_4-2-bucket管理" aria-hidden="true">#</a> 4.2 Bucket管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建bucket</span>
<span class="token function">mc</span> mb minio-server/bucket01
<span class="token comment"># 删除bucket</span>
<span class="token function">mc</span> rb minio-server/bucket01
<span class="token comment"># bucket不为空，可以强制删除 慎用</span>
<span class="token function">mc</span> rb <span class="token parameter variable">--force</span> minio-server/bucket01

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930143222201.png" alt="image-20210930143222201" tabindex="0" loading="lazy"><figcaption>image-20210930143222201</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查询bucket03磁盘使用情况</span>
<span class="token function">mc</span> <span class="token function">du</span> minio-server/bucket03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930145523482.png" alt="image-20210930145523482" tabindex="0" loading="lazy"><figcaption>image-20210930145523482</figcaption></figure><h2 id="_5-mc-admin使用" tabindex="-1"><a class="header-anchor" href="#_5-mc-admin使用" aria-hidden="true">#</a> 5 mc admin使用</h2><p>MinIO Client（mc）提供了“ admin”子命令来对您的MinIO部署执行管理任务。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">service</span> 服务重启并停止所有MinIO服务器
update 更新更新所有MinIO服务器
info 信息显示MinIO服务器信息
user 用户管理用户
group 小组管理小组
policy MinIO服务器中定义的策略管理策略
config 配置管理MinIO服务器配置
heal 修复MinIO服务器上的磁盘，存储桶和对象
profile 概要文件生成概要文件数据以进行调试
<span class="token function">top</span> 顶部提供MinIO的顶部统计信息
trace 跟踪显示MinIO服务器的http跟踪
console 控制台显示MinIO服务器的控制台日志
prometheus Prometheus管理Prometheus配置
kms kms执行KMS管理操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-用户管理" tabindex="-1"><a class="header-anchor" href="#_5-1-用户管理" aria-hidden="true">#</a> 5.1 用户管理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mc</span> admin user <span class="token parameter variable">--help</span>

<span class="token comment">#新建用户</span>
<span class="token function">mc</span> admin user <span class="token function">add</span> minio-server fox
<span class="token function">mc</span> admin user <span class="token function">add</span> minio-server fox02 <span class="token number">12345678</span>

<span class="token comment">#查看用户</span>
<span class="token function">mc</span> admin user list minio-server

<span class="token comment">#禁用用户</span>
<span class="token function">mc</span> admin user disable minio-server fox02

<span class="token comment">#启用用户</span>
<span class="token function">mc</span> admin user disable minio-server fox02

<span class="token comment">#查看用户信息</span>
<span class="token function">mc</span> admin user info minio-server fox

<span class="token comment">#删除用户</span>
<span class="token function">mc</span> admin user remove minio-server fox02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930145919383.png" alt="image-20210930145919383" tabindex="0" loading="lazy"><figcaption>image-20210930145919383</figcaption></figure><h3 id="_5-2-策略管理" tabindex="-1"><a class="header-anchor" href="#_5-2-策略管理" aria-hidden="true">#</a> 5.2 策略管理</h3><p>policy命令，用于添加，删除，列出策略，获取有关策略的信息并为MinIO服务器上的用户设置策略。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mc</span> admin policy <span class="token parameter variable">--help</span>

<span class="token comment">#列出MinIO上的所有固定策略</span>
<span class="token function">mc</span> admin policy list minio-server

<span class="token comment"># 查看plicy信息</span>
<span class="token function">mc</span> admin policy info minio-server readwrite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930150314231.png" alt="image-20210930150314231" tabindex="0" loading="lazy"><figcaption>image-20210930150314231</figcaption></figure><h4 id="_5-2-1-添加新的策略" tabindex="-1"><a class="header-anchor" href="#_5-2-1-添加新的策略" aria-hidden="true">#</a> 5.2.1 添加新的策略</h4><p>编写策略文件：mall.json</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
	<span class="token string-property property">&quot;Version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2012-10-17&quot;</span><span class="token punctuation">,</span>
	<span class="token string-property property">&quot;Statement&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
		<span class="token string-property property">&quot;Effect&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Allow&quot;</span><span class="token punctuation">,</span>
		<span class="token string-property property">&quot;Action&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token string">&quot;s3:GetBucketLocation&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;s3:GetObject&quot;</span>
		<span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token string-property property">&quot;Resource&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token string">&quot;arn:aws:s3:::mall&quot;</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
		<span class="token string-property property">&quot;Effect&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Allow&quot;</span><span class="token punctuation">,</span>
		<span class="token string-property property">&quot;Action&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token string">&quot;s3:*&quot;</span>
		<span class="token punctuation">]</span><span class="token punctuation">,</span>
		<span class="token string-property property">&quot;Resource&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token string">&quot;arn:aws:s3:::mall/*&quot;</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：策略文件的 <strong>Version</strong> 固定设置为 2012-10-17。</p><p>action 可选</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;Action&quot;: [
&quot;s3:GetBucketLocation&quot;,
&quot;s3:ListBucket&quot;,
&quot;s3:GetObject&quot;,
&quot;s3:PutObject&quot;,
&quot;s3:DeleteObject&quot;
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将mall.json添加到策略数据库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#添加新的策略
mc admin policy add minio-server mall /Users/zsz/Desktop/miniotest/mall.json

mc admin policy list minio-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930151708195.png" alt="image-20210930151708195" tabindex="0" loading="lazy"><figcaption>image-20210930151708195</figcaption></figure><h4 id="_5-2-2-设置用户访问策略" tabindex="-1"><a class="header-anchor" href="#_5-2-2-设置用户访问策略" aria-hidden="true">#</a> 5.2.2 设置用户访问策略</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mc</span> admin user <span class="token function">add</span> minio-server fox03 <span class="token number">12345678</span>
<span class="token comment"># 设置用户的访问策略</span>
<span class="token function">mc</span> admin policy <span class="token builtin class-name">set</span> minio-server mall <span class="token assign-left variable">user</span><span class="token operator">=</span>fox03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930152101436.png" alt="image-20210930152101436" tabindex="0" loading="lazy"><figcaption>image-20210930152101436</figcaption></figure>`,35),m={href:"http://192.168.3.14:50000/%EF%BC%8C%E5%8F%AA%E8%83%BD%E6%93%8D%E4%BD%9Ctulingmall%E7%9A%84bucket",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"参考文章",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文章","aria-hidden":"true"},"#"),s(" 参考文章")],-1),b={href:"http://docs.minio.org.cn/docs/master/minio-client-quickstart-guide",target:"_blank",rel:"noopener noreferrer"};function g(h,k){const a=o("ExternalLinkIcon");return c(),l("div",null,[r,n("p",null,[n("a",p,[s("下载地址"),e(a)])]),u,n("p",null,[s("测试：fox03/12345678 登录minio控制台"),n("a",m,[s("http://192.168.3.14:50000/，只能操作tulingmall的bucket"),e(a)])]),v,n("p",null,[n("a",b,[s("MinIO客户端快速入门指南"),e(a)])])])}const x=t(d,[["render",g],["__file","minio-mc-use.html.vue"]]);export{x as default};
