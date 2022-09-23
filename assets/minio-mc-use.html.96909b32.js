import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,c as l,a as n,b as a,e as i,d as s,r as o}from"./app.942cb21b.js";const d={},r=i(`<h1 id="minio\u5BA2\u6237\u7AEFmc\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#minio\u5BA2\u6237\u7AEFmc\u4F7F\u7528" aria-hidden="true">#</a> Minio\u5BA2\u6237\u7AEFmc\u4F7F\u7528</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>MinIO Client (mc)\u4E3Als\uFF0Ccat\uFF0Ccp\uFF0Cmirror\uFF0Cdiff\uFF0Cfind\u7B49UNIX\u547D\u4EE4\u63D0\u4F9B\u4E86\u4E00\u79CD\u66FF\u4EE3\u65B9\u6848\u3002\u5B83\u652F\u6301\u6587\u4EF6\u7CFB\u7EDF\u548C\u517C\u5BB9Amazon S3\u7684\u4E91\u5B58\u50A8\u670D\u52A1\uFF08AWS Signature v2\u548Cv4\uFF09\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ls</span> \u5217\u51FA\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u3002
mb \u521B\u5EFA\u4E00\u4E2A\u5B58\u50A8\u6876\u6216\u4E00\u4E2A\u6587\u4EF6\u5939\u3002
<span class="token function">cat</span> \u663E\u793A\u6587\u4EF6\u548C\u5BF9\u8C61\u5185\u5BB9\u3002
pipe \u5C06\u4E00\u4E2ASTDIN\u91CD\u5B9A\u5411\u5230\u4E00\u4E2A\u5BF9\u8C61\u6216\u8005\u6587\u4EF6\u6216\u8005STDOUT\u3002
share \u751F\u6210\u7528\u4E8E\u5171\u4EAB\u7684URL\u3002
<span class="token function">cp</span> \u62F7\u8D1D\u6587\u4EF6\u548C\u5BF9\u8C61\u3002
mirror \u7ED9\u5B58\u50A8\u6876\u548C\u6587\u4EF6\u5939\u505A\u955C\u50CF\u3002
<span class="token function">find</span> \u57FA\u4E8E\u53C2\u6570\u67E5\u627E\u6587\u4EF6\u3002
<span class="token function">diff</span> \u5BF9\u4E24\u4E2A\u6587\u4EF6\u5939\u6216\u8005\u5B58\u50A8\u6876\u6BD4\u8F83\u5DEE\u5F02\u3002
<span class="token function">rm</span> \u5220\u9664\u6587\u4EF6\u548C\u5BF9\u8C61\u3002
events \u7BA1\u7406\u5BF9\u8C61\u901A\u77E5\u3002
<span class="token function">watch</span> \u76D1\u89C6\u6587\u4EF6\u548C\u5BF9\u8C61\u7684\u4E8B\u4EF6\u3002
policy \u7BA1\u7406\u8BBF\u95EE\u7B56\u7565\u3002
config \u7BA1\u7406mc\u914D\u7F6E\u6587\u4EF6\u3002
update \u68C0\u67E5\u8F6F\u4EF6\u66F4\u65B0\u3002
version \u8F93\u51FA\u7248\u672C\u4FE1\u606F\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u5BA2\u6237\u7AEF\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#_2-\u5BA2\u6237\u7AEF\u4E0B\u8F7D" aria-hidden="true">#</a> 2. \u5BA2\u6237\u7AEF\u4E0B\u8F7D</h2><h3 id="_2-1-mac\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-1-mac\u5B89\u88C5" aria-hidden="true">#</a> 2.1 Mac\u5B89\u88C5</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>brew <span class="token function">install</span> minio/stable/mc
<span class="token function">mc</span> <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-window\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#_2-2-window\u4E0B\u8F7D" aria-hidden="true">#</a> 2.2 window\u4E0B\u8F7D</h3>`,8),p={href:"http://dl.minio.org.cn/client/mc/release/windows-amd64/mc.exe%5B",target:"_blank",rel:"noopener noreferrer"},u=s("\u4E0B\u8F7D\u5730\u5740"),m=i(`<h2 id="_3-\u914D\u7F6Emc" tabindex="-1"><a class="header-anchor" href="#_3-\u914D\u7F6Emc" aria-hidden="true">#</a> 3. \u914D\u7F6Emc</h2><p>mc \u5C06\u6240\u6709\u7684\u914D\u7F6E\u4FE1\u606F\u90FD\u5B58\u50A8\u5728~/.mc/config.json \u6587\u4EF6\u4E2D</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u8BE2mc host\u914D\u7F6E</span>
<span class="token function">mc</span> config <span class="token function">host</span> <span class="token function">ls</span>
<span class="token comment"># \u6DFB\u52A0minio\u670D\u52A1</span>
<span class="token function">mc</span> config <span class="token function">host</span> <span class="token function">add</span> minio-server http://192.168.0.1:9000 admin <span class="token number">12345678</span>
<span class="token comment"># \u5220\u9664host</span>
<span class="token function">mc</span> config <span class="token function">host</span> remove minio-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-mc\u547D\u4EE4\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_4-mc\u547D\u4EE4\u4F7F\u7528" aria-hidden="true">#</a> 4. mc\u547D\u4EE4\u4F7F\u7528</h2><table><thead><tr><th>ls - \u5217\u51FA\u5B58\u50A8\u6876\u548C \u5BF9\u8C61</th><th>mb - \u521B\u5EFA\u5B58\u50A8\u6876</th><th>cat - \u5408\u5E76\u5BF9\u8C61</th></tr></thead><tbody><tr><td>cp - \u62F7\u8D1D\u5BF9\u8C61</td><td>rm - \u5220\u9664\u5BF9\u8C61</td><td>pipe - Pipe\u5230\u4E00\u4E2A\u5BF9\u8C61</td></tr><tr><td>share - \u5171\u4EAB</td><td>mirror - \u5B58\u50A8\u6876\u955C\u50CF</td><td>find - \u67E5\u627E\u6587\u4EF6\u548C\u5BF9\u8C61</td></tr><tr><td>diff - \u6BD4\u8F83\u5B58\u50A8\u6876\u5DEE\u5F02</td><td>policy - \u7ED9\u5B58\u50A8\u6876\u6216\u524D\u7F00\u8BBE\u7F6E\u8BBF\u95EE\u7B56\u7565</td><td></td></tr><tr><td>config - \u7BA1\u7406\u914D\u7F6E\u6587\u4EF6</td><td>watch - \u4E8B\u4EF6\u76D1\u542C</td><td>events - \u7BA1\u7406\u5B58\u50A8\u6876\u4E8B\u4EF6</td></tr><tr><td>update - \u7BA1\u7406\u8F6F\u4EF6\u66F4\u65B0</td><td>version - \u663E\u793A\u7248\u672C\u4FE1\u606F</td><td></td></tr></tbody></table><h3 id="_4-1-\u4E0A\u4F20\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#_4-1-\u4E0A\u4F20\u4E0B\u8F7D" aria-hidden="true">#</a> 4.1 \u4E0A\u4F20\u4E0B\u8F7D</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u8BE2minio\u670D\u52A1\u4E0A\u7684\u6240\u6709buckets(\u6587\u4EF6\u548C\u6587\u4EF6\u5939)</span>
<span class="token function">mc</span> <span class="token function">ls</span> minio-server

<span class="token comment"># \u4E0B\u8F7D\u6587\u4EF6</span>
<span class="token function">mc</span> <span class="token function">cp</span> minio-server/test/dog.png /Users/zsz/Desktop/temp/

<span class="token comment">#\u5220\u9664\u6587\u4EF6</span>
<span class="token function">mc</span> <span class="token function">rm</span> minio-server/test/dog.png

<span class="token comment">#\u4E0A\u4F20\u6587\u4EF6</span>
<span class="token function">mc</span> <span class="token function">cp</span> /Users/zsz/Desktop/temp/dog.png  minio-server/test/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930140312806.png" alt="image-20210930140312806" loading="lazy"></p><h3 id="_4-2-bucket\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#_4-2-bucket\u7BA1\u7406" aria-hidden="true">#</a> 4.2 Bucket\u7BA1\u7406</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFAbucket</span>
<span class="token function">mc</span> mb minio-server/bucket01
<span class="token comment"># \u5220\u9664bucket</span>
<span class="token function">mc</span> rb minio-server/bucket01
<span class="token comment"># bucket\u4E0D\u4E3A\u7A7A\uFF0C\u53EF\u4EE5\u5F3A\u5236\u5220\u9664 \u614E\u7528</span>
<span class="token function">mc</span> rb <span class="token parameter variable">--force</span> minio-server/bucket01

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930143222201.png" alt="image-20210930143222201" loading="lazy"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u67E5\u8BE2bucket03\u78C1\u76D8\u4F7F\u7528\u60C5\u51B5</span>
<span class="token function">mc</span> <span class="token function">du</span> minio-server/bucket03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930145523482.png" alt="image-20210930145523482" loading="lazy"></p><h2 id="_5-mc-admin\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_5-mc-admin\u4F7F\u7528" aria-hidden="true">#</a> 5 mc admin\u4F7F\u7528</h2><p>MinIO Client\uFF08mc\uFF09\u63D0\u4F9B\u4E86\u201C admin\u201D\u5B50\u547D\u4EE4\u6765\u5BF9\u60A8\u7684MinIO\u90E8\u7F72\u6267\u884C\u7BA1\u7406\u4EFB\u52A1\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">service</span> \u670D\u52A1\u91CD\u542F\u5E76\u505C\u6B62\u6240\u6709MinIO\u670D\u52A1\u5668
update \u66F4\u65B0\u66F4\u65B0\u6240\u6709MinIO\u670D\u52A1\u5668
info \u4FE1\u606F\u663E\u793AMinIO\u670D\u52A1\u5668\u4FE1\u606F
user \u7528\u6237\u7BA1\u7406\u7528\u6237
group \u5C0F\u7EC4\u7BA1\u7406\u5C0F\u7EC4
policy MinIO\u670D\u52A1\u5668\u4E2D\u5B9A\u4E49\u7684\u7B56\u7565\u7BA1\u7406\u7B56\u7565
config \u914D\u7F6E\u7BA1\u7406MinIO\u670D\u52A1\u5668\u914D\u7F6E
heal \u4FEE\u590DMinIO\u670D\u52A1\u5668\u4E0A\u7684\u78C1\u76D8\uFF0C\u5B58\u50A8\u6876\u548C\u5BF9\u8C61
profile \u6982\u8981\u6587\u4EF6\u751F\u6210\u6982\u8981\u6587\u4EF6\u6570\u636E\u4EE5\u8FDB\u884C\u8C03\u8BD5
<span class="token function">top</span> \u9876\u90E8\u63D0\u4F9BMinIO\u7684\u9876\u90E8\u7EDF\u8BA1\u4FE1\u606F
trace \u8DDF\u8E2A\u663E\u793AMinIO\u670D\u52A1\u5668\u7684http\u8DDF\u8E2A
console \u63A7\u5236\u53F0\u663E\u793AMinIO\u670D\u52A1\u5668\u7684\u63A7\u5236\u53F0\u65E5\u5FD7
prometheus Prometheus\u7BA1\u7406Prometheus\u914D\u7F6E
kms kms\u6267\u884CKMS\u7BA1\u7406\u64CD\u4F5C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-\u7528\u6237\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#_5-1-\u7528\u6237\u7BA1\u7406" aria-hidden="true">#</a> 5.1 \u7528\u6237\u7BA1\u7406</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mc</span> admin user <span class="token parameter variable">--help</span>

<span class="token comment">#\u65B0\u5EFA\u7528\u6237</span>
<span class="token function">mc</span> admin user <span class="token function">add</span> minio-server fox
<span class="token function">mc</span> admin user <span class="token function">add</span> minio-server fox02 <span class="token number">12345678</span>

<span class="token comment">#\u67E5\u770B\u7528\u6237</span>
<span class="token function">mc</span> admin user list minio-server

<span class="token comment">#\u7981\u7528\u7528\u6237</span>
<span class="token function">mc</span> admin user disable minio-server fox02

<span class="token comment">#\u542F\u7528\u7528\u6237</span>
<span class="token function">mc</span> admin user disable minio-server fox02

<span class="token comment">#\u67E5\u770B\u7528\u6237\u4FE1\u606F</span>
<span class="token function">mc</span> admin user info minio-server fox

<span class="token comment">#\u5220\u9664\u7528\u6237</span>
<span class="token function">mc</span> admin user remove minio-server fox02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930145919383.png" alt="image-20210930145919383" loading="lazy"></p><h3 id="_5-2-\u7B56\u7565\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#_5-2-\u7B56\u7565\u7BA1\u7406" aria-hidden="true">#</a> 5.2 \u7B56\u7565\u7BA1\u7406</h3><p>policy\u547D\u4EE4\uFF0C\u7528\u4E8E\u6DFB\u52A0\uFF0C\u5220\u9664\uFF0C\u5217\u51FA\u7B56\u7565\uFF0C\u83B7\u53D6\u6709\u5173\u7B56\u7565\u7684\u4FE1\u606F\u5E76\u4E3AMinIO\u670D\u52A1\u5668\u4E0A\u7684\u7528\u6237\u8BBE\u7F6E\u7B56\u7565\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mc</span> admin policy <span class="token parameter variable">--help</span>

<span class="token comment">#\u5217\u51FAMinIO\u4E0A\u7684\u6240\u6709\u56FA\u5B9A\u7B56\u7565</span>
<span class="token function">mc</span> admin policy list minio-server

<span class="token comment"># \u67E5\u770Bplicy\u4FE1\u606F</span>
<span class="token function">mc</span> admin policy info minio-server readwrite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930150314231.png" alt="image-20210930150314231" loading="lazy"></p><h4 id="_5-2-1-\u6DFB\u52A0\u65B0\u7684\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#_5-2-1-\u6DFB\u52A0\u65B0\u7684\u7B56\u7565" aria-hidden="true">#</a> 5.2.1 \u6DFB\u52A0\u65B0\u7684\u7B56\u7565</h4><p>\u7F16\u5199\u7B56\u7565\u6587\u4EF6\uFF1Amall.json</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\uFF1A\u7B56\u7565\u6587\u4EF6\u7684 <strong>Version</strong> \u56FA\u5B9A\u8BBE\u7F6E\u4E3A 2012-10-17\u3002</p><p>action \u53EF\u9009</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;Action&quot;: [
&quot;s3:GetBucketLocation&quot;,
&quot;s3:ListBucket&quot;,
&quot;s3:GetObject&quot;,
&quot;s3:PutObject&quot;,
&quot;s3:DeleteObject&quot;
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06mall.json\u6DFB\u52A0\u5230\u7B56\u7565\u6570\u636E\u5E93</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#\u6DFB\u52A0\u65B0\u7684\u7B56\u7565
mc admin policy add minio-server mall /Users/zsz/Desktop/miniotest/mall.json

mc admin policy list minio-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930151708195.png" alt="image-20210930151708195" loading="lazy"></p><h4 id="_5-2-2-\u8BBE\u7F6E\u7528\u6237\u8BBF\u95EE\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#_5-2-2-\u8BBE\u7F6E\u7528\u6237\u8BBF\u95EE\u7B56\u7565" aria-hidden="true">#</a> 5.2.2 \u8BBE\u7F6E\u7528\u6237\u8BBF\u95EE\u7B56\u7565</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mc</span> admin user <span class="token function">add</span> minio-server fox03 <span class="token number">12345678</span>
<span class="token comment"># \u8BBE\u7F6E\u7528\u6237\u7684\u8BBF\u95EE\u7B56\u7565</span>
<span class="token function">mc</span> admin policy <span class="token builtin class-name">set</span> minio-server mall <span class="token assign-left variable">user</span><span class="token operator">=</span>fox03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210930152101436.png" alt="image-20210930152101436" loading="lazy"></p>`,35),v=s("\u6D4B\u8BD5\uFF1Afox03/12345678 \u767B\u5F55minio\u63A7\u5236\u53F0"),b={href:"http://192.168.3.14:50000/%EF%BC%8C%E5%8F%AA%E8%83%BD%E6%93%8D%E4%BD%9Ctulingmall%E7%9A%84bucket",target:"_blank",rel:"noopener noreferrer"},h=s("http://192.168.3.14:50000/\uFF0C\u53EA\u80FD\u64CD\u4F5Ctulingmall\u7684bucket"),g=n("h2",{id:"\u53C2\u8003\u6587\u7AE0",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u53C2\u8003\u6587\u7AE0","aria-hidden":"true"},"#"),s(" \u53C2\u8003\u6587\u7AE0")],-1),k={href:"http://docs.minio.org.cn/docs/master/minio-client-quickstart-guide",target:"_blank",rel:"noopener noreferrer"},f=s("MinIO\u5BA2\u6237\u7AEF\u5FEB\u901F\u5165\u95E8\u6307\u5357");function _(x,q){const e=o("ExternalLinkIcon");return c(),l("div",null,[r,n("p",null,[n("a",p,[u,a(e)])]),m,n("p",null,[v,n("a",b,[h,a(e)])]),g,n("p",null,[n("a",k,[f,a(e)])])])}const O=t(d,[["render",_],["__file","minio-mc-use.html.vue"]]);export{O as default};
