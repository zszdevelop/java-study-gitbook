import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as d,a as e,b as n,d as l,e as s,r as t}from"./app.3a7e6dfd.js";const c={},o=l(`<h1 id="docker\u57FA\u7840-dockerfile\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#docker\u57FA\u7840-dockerfile\u8BE6\u89E3" aria-hidden="true">#</a> Docker\u57FA\u7840 - Dockerfile\u8BE6\u89E3</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>Dokcerfile \u662F\u4E00\u4E2A\u7528\u6765\u6784\u5EFA\u955C\u50CF\u7684\u6587\u672C\u6587\u4EF6\uFF0C\u6587\u672C\u5185\u5BB9\u5305\u542B\u4E86\u4E00\u6761\u6761\u6784\u5EFA\u955C\u50CF\u6240\u9700\u7684\u6307\u4EE4\u548C\u8BF4\u660E</p><h2 id="_2-\u547D\u4EE4\u7EC4\u6210" tabindex="-1"><a class="header-anchor" href="#_2-\u547D\u4EE4\u7EC4\u6210" aria-hidden="true">#</a> 2. \u547D\u4EE4\u7EC4\u6210</h2><table><thead><tr><th>\u90E8\u5206</th><th>\u547D\u4EE4</th></tr></thead><tbody><tr><td>\u57FA\u7840\u955C\u50CF\u4FE1\u606F</td><td>FROM</td></tr><tr><td>\u7EF4\u62A4\u8005\u4FE1\u606F</td><td>MAINTAINER\u3001LABEL</td></tr><tr><td>\u955C\u50CF\u64CD\u4F5C\u6307\u4EE4</td><td>RUN\u3001COPY\u3001ADD\u3001EXPOSE\u3001WORKDIR\u3001ONBUILD\u3001USER\u3001VOLUME\u7B49</td></tr><tr><td>\u5BB9\u5668\u542F\u52A8\u65F6\u6267\u884C\u6307\u4EE4</td><td>CMD\u3001ENTRYPOINT</td></tr></tbody></table><h2 id="_3-\u57FA\u7840\u955C\u50CF\u4FE1\u606F-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_3-\u57FA\u7840\u955C\u50CF\u4FE1\u606F-\u547D\u4EE4" aria-hidden="true">#</a> 3.\u57FA\u7840\u955C\u50CF\u4FE1\u606F \u547D\u4EE4</h2><h3 id="_3-1-from" tabindex="-1"><a class="header-anchor" href="#_3-1-from" aria-hidden="true">#</a> 3.1 FROM</h3><p>\u6307\u5B9A\u54EA\u79CD\u955C\u50CF\u4F5C\u4E3A\u65B0\u955C\u50CF\u7684\u57FA\u7840\u955C\u50CF\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM ubuntu:14.04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-\u7EF4\u62A4\u8005\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#_4-\u7EF4\u62A4\u8005\u4FE1\u606F" aria-hidden="true">#</a> 4.\u7EF4\u62A4\u8005\u4FE1\u606F</h2><h3 id="_4-1-maintainer" tabindex="-1"><a class="header-anchor" href="#_4-1-maintainer" aria-hidden="true">#</a> 4.1 MAINTAINER</h3><p>\u6307\u660E\u8BE5\u955C\u50CF\u7684\u4F5C\u8005\u548C\u5176\u7535\u5B50\u90AE\u4EF6\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>MAINTAINER zsz <span class="token string">&quot;xxxxxxx@qq.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-label" tabindex="-1"><a class="header-anchor" href="#_4-2-label" aria-hidden="true">#</a> 4.2 LABEL</h3><p>\u529F\u80FD\u662F\u4E3A\u955C\u50CF\u6307\u5B9A\u6807\u7B7E\u3002\u4E5F\u53EF\u4EE5\u4F7F\u7528<code>LABEL</code>\u6765\u6307\u5B9A\u955C\u50CF\u4F5C\u8005</p><h2 id="_5-\u955C\u50CF\u64CD\u4F5C\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#_5-\u955C\u50CF\u64CD\u4F5C\u6307\u4EE4" aria-hidden="true">#</a> 5. \u955C\u50CF\u64CD\u4F5C\u6307\u4EE4</h2><h3 id="_5-1-run-\u91CD\u70B9" tabindex="-1"><a class="header-anchor" href="#_5-1-run-\u91CD\u70B9" aria-hidden="true">#</a> 5.1 RUN(\u91CD\u70B9)</h3><p>\u5728\u65B0\u955C\u50CF\u5185\u90E8\u6267\u884C\u7684\u547D\u4EE4\uFF0C\u6BD4\u5982\u5B89\u88C5\u4E00\u4E9B\u8F6F\u4EF6\u3001\u914D\u7F6E\u4E00\u4E9B\u57FA\u7840\u73AF\u5883\uFF0C\u53EF\u4F7F\u7528\\\u6765\u6362\u884C\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>RUN <span class="token builtin class-name">echo</span> <span class="token string">&#39;hello docker!&#39;</span> <span class="token punctuation">\\</span>
    <span class="token operator">&gt;</span> /usr/local/file.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E5F\u53EF\u4EE5\u4F7F\u7528exec\u683C\u5F0F<code>RUN [&quot;executable&quot;, &quot;param1&quot;, &quot;param2&quot;]</code>\u7684\u547D\u4EE4\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>RUN <span class="token punctuation">[</span><span class="token string">&quot;apt-get&quot;</span>,<span class="token string">&quot;install&quot;</span>,<span class="token string">&quot;-y&quot;</span>,<span class="token string">&quot;nginx&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8981\u6CE8\u610F\u7684\u662F\uFF0C<strong><code>executable</code>\u662F\u547D\u4EE4\uFF0C\u540E\u9762\u7684param\u662F\u53C2\u6570</strong></p><h4 id="_5-1-1-\u51CF\u5C11\u4E0D\u5FC5\u8981\u5C42\u7EA7" tabindex="-1"><a class="header-anchor" href="#_5-1-1-\u51CF\u5C11\u4E0D\u5FC5\u8981\u5C42\u7EA7" aria-hidden="true">#</a> 5.1.1 \u51CF\u5C11\u4E0D\u5FC5\u8981\u5C42\u7EA7</h4><p><strong>\u6CE8\u610F</strong>\uFF1ADockerfile \u7684\u6307\u4EE4\u6BCF\u6267\u884C\u4E00\u6B21\u90FD\u4F1A\u5728 docker \u4E0A\u65B0\u5EFA\u4E00\u5C42\u3002\u6240\u4EE5\u8FC7\u591A\u65E0\u610F\u4E49\u7684\u5C42\uFF0C\u4F1A\u9020\u6210\u955C\u50CF\u81A8\u80C0\u8FC7\u5927\u3002\u4F8B\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM centos
RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span>
RUN <span class="token function">wget</span> <span class="token parameter variable">-O</span> redis.tar.gz <span class="token string">&quot;http://download.redis.io/releases/redis-5.0.3.tar.gz&quot;</span>
RUN <span class="token function">tar</span> <span class="token parameter variable">-xvf</span> redis.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE5\u4E0A\u6267\u884C\u4F1A\u521B\u5EFA 3 \u5C42\u955C\u50CF\u3002\u53EF\u7B80\u5316\u4E3A\u4EE5\u4E0B\u683C\u5F0F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM centos
RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span> <span class="token punctuation">\\</span>
    <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> redis.tar.gz <span class="token string">&quot;http://download.redis.io/releases/redis-5.0.3.tar.gz&quot;</span> <span class="token punctuation">\\</span>
    <span class="token operator">&amp;&amp;</span> <span class="token function">tar</span> <span class="token parameter variable">-xvf</span> redis.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u4E0A\uFF0C\u4EE5 <strong>&amp;&amp;</strong> \u7B26\u53F7\u8FDE\u63A5\u547D\u4EE4\uFF0C\u8FD9\u6837\u6267\u884C\u540E\uFF0C\u53EA\u4F1A\u521B\u5EFA 1 \u5C42\u955C\u50CF\u3002</p><h3 id="_5-2-copy" tabindex="-1"><a class="header-anchor" href="#_5-2-copy" aria-hidden="true">#</a> 5.2 COPY</h3><p>\u5C06\u4E3B\u673A\u7684\u6587\u4EF6\u590D\u5236\u5230\u955C\u50CF\u5185\uFF0C\u5982\u679C\u76EE\u7684\u4F4D\u7F6E\u4E0D\u5B58\u5728\uFF0CDocker\u4F1A\u81EA\u52A8\u521B\u5EFA\u6240\u6709\u9700\u8981\u7684\u76EE\u5F55\u7ED3\u6784\uFF0C\u4F46\u662F\u5B83\u53EA\u662F\u5355\u7EAF\u7684\u590D\u5236\uFF0C\u5E76\u4E0D\u4F1A\u53BB\u505A\u6587\u4EF6\u63D0\u53D6\u548C\u89E3\u538B\u5DE5\u4F5C\u3002\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>COPY application.yml /etc/springboot/hello-service/src/resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u6CE8\u610F\uFF1A\u9700\u8981\u590D\u5236\u7684\u76EE\u5F55\u4E00\u5B9A\u8981\u653E\u5728Dockerfile\u6587\u4EF6\u7684\u540C\u7EA7\u76EE\u5F55\u4E0B</strong></p><p>\u539F\u56E0\uFF1A</p><blockquote><p>\u56E0\u4E3A\u6784\u5EFA\u73AF\u5883\u5C06\u4F1A\u4E0A\u4F20\u5230Docker\u5B88\u62A4\u8FDB\u7A0B\uFF0C\u800C\u590D\u5236\u662F\u5728Docker\u5B88\u62A4\u8FDB\u7A0B\u4E2D\u8FDB\u884C\u7684\u3002\u4EFB\u4F55\u4F4D\u4E8E\u6784\u5EFA\u73AF\u5883\u4E4B\u5916\u7684\u4E1C\u897F\u90FD\u662F\u4E0D\u53EF\u7528\u7684\u3002COPY\u6307\u4EE4\u7684\u76EE\u7684\u7684\u4F4D\u7F6E\u5219\u5FC5\u987B\u662F\u5BB9\u5668\u5185\u90E8\u7684\u4E00\u4E2A\u7EDD\u5BF9\u8DEF\u5F84\u3002 ---\u300ATHE DOCKER BOOK\u300B</p></blockquote><h3 id="_5-3-add" tabindex="-1"><a class="header-anchor" href="#_5-3-add" aria-hidden="true">#</a> 5.3 ADD</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	ADD &lt;src&gt;... &lt;dest&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5C06\u4E3B\u673A\u7684\u6587\u4EF6\u590D\u5236\u5230\u955C\u50CF\u4E2D\uFF0C\u8DDFCOPY\u4E00\u6837\uFF0C\u9650\u5236\u6761\u4EF6\u548C\u4F7F\u7528\u65B9\u5F0F\u90FD\u4E00\u6837\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ADD application.yml /etc/springboot/hello-service/src/resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F46\u662FADD\u4F1A\u5BF9\u538B\u7F29\u6587\u4EF6\uFF08tar, gzip, bzip2, etc\uFF09\u505A\u63D0\u53D6\u548C\u89E3\u538B\u64CD\u4F5C\u3002</p><p>src \u53EF\u4EE5\u662F\u4E00\u4E2A\u672C\u5730\u6587\u4EF6\uFF0C\u8FD8\u53EF\u4EE5\u662F\u4E00\u4E2A<code>url</code>\u3002\u7136\u540E\u81EA\u52A8\u4E0B\u8F7D\u548C\u89E3\u538B</p><h3 id="_5-4-expose" tabindex="-1"><a class="header-anchor" href="#_5-4-expose" aria-hidden="true">#</a> 5.4 EXPOSE</h3><p>\u66B4\u9732\u955C\u50CF\u7684\u7AEF\u53E3\u4F9B\u4E3B\u673A\u505A\u6620\u5C04\uFF0C\u542F\u52A8\u955C\u50CF\u65F6\uFF0C\u4F7F\u7528-P\u53C2\u6570\u6765\u8BB2\u955C\u50CF\u7AEF\u53E3\u4E0E\u5BBF\u4E3B\u673A\u7684\u968F\u673A\u7AEF\u53E3\u505A\u6620\u5C04\u3002\u4F7F\u7528\u65B9\u5F0F\uFF08\u53EF\u6307\u5B9A\u591A\u4E2A\uFF09\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>EXPOSE <span class="token number">8080</span> 
EXPOSE <span class="token number">8081</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-workdir" tabindex="-1"><a class="header-anchor" href="#_5-5-workdir" aria-hidden="true">#</a> 5.5 WORKDIR</h3><p>\u5728\u6784\u5EFA\u955C\u50CF\u65F6\uFF0C\u6307\u5B9A\u955C\u50CF\u7684\u5DE5\u4F5C\u76EE\u5F55\uFF0C\u4E4B\u540E\u7684\u547D\u4EE4\u90FD\u662F\u57FA\u4E8E\u6B64\u5DE5\u4F5C\u76EE\u5F55\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\uFF0C\u5219\u4F1A\u521B\u5EFA\u76EE\u5F55\u3002\u5982</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>WORKDIR /usr/local
WORKDIR webservice
RUN <span class="token builtin class-name">echo</span> <span class="token string">&#39;hello docker&#39;</span> <span class="token operator">&gt;</span> text.txt
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u7EC8\u4F1A\u5728<code>/usr/local/webservice/</code>\u76EE\u5F55\u4E0B\u751F\u6210text.txt\u6587\u4EF6</p><h3 id="_5-6-env" tabindex="-1"><a class="header-anchor" href="#_5-6-env" aria-hidden="true">#</a> 5.6 ENV</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ENV &lt;key&gt;=&lt;value&gt; ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8BBE\u7F6E\u5BB9\u5668\u5185\u73AF\u5883\u53D8\u91CF</p><h3 id="_5-7-volume" tabindex="-1"><a class="header-anchor" href="#_5-7-volume" aria-hidden="true">#</a> 5.7 VOLUME</h3><p>\u7528\u6765\u5411\u57FA\u4E8E\u955C\u50CF\u521B\u5EFA\u7684\u5BB9\u5668\u6DFB\u52A0\u5377\u3002\u6BD4\u5982\u4F60\u53EF\u4EE5\u5C06mongodb\u955C\u50CF\u4E2D\u5B58\u50A8\u6570\u636E\u7684data\u6587\u4EF6\u6307\u5B9A\u4E3A\u4E3B\u673A\u7684\u67D0\u4E2A\u6587\u4EF6\u3002(\u5BB9\u5668\u5185\u90E8\u5EFA\u8BAE\u4E0D\u8981\u5B58\u50A8\u4EFB\u4F55\u6570\u636E) \u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>VOLUME /data/db /data/configdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6CE8\u610F:<code>VOLUME \u4E3B\u673A\u76EE\u5F55 \u5BB9\u5668\u76EE\u5F55</code></p><h3 id="_5-8-onbuild" tabindex="-1"><a class="header-anchor" href="#_5-8-onbuild" aria-hidden="true">#</a> 5.8 ONBUILD</h3><p>\u5F53\u4E00\u4E2A\u5305\u542BONBUILD\u547D\u4EE4\u7684\u955C\u50CF\u88AB\u7528\u4F5C\u5176\u4ED6\u955C\u50CF\u7684\u57FA\u7840\u955C\u50CF\u65F6(\u6BD4\u5982\u7528\u6237\u7684\u955C\u50CF\u9700\u8981\u4ECE\u67D0\u4E3A\u51C6\u5907\u597D\u7684\u4F4D\u7F6E\u6DFB\u52A0\u6E90\u4EE3\u7801\uFF0C\u6216\u8005\u7528\u6237\u9700\u8981\u6267\u884C\u7279\u5B9A\u4E8E\u6784\u5EFA\u955C\u50CF\u7684\u73AF\u5883\u7684\u6784\u5EFA\u811A\u672C)\uFF0C\u8BE5\u547D\u4EE4\u5C31\u4F1A\u6267\u884C\u3002 \u5982\u521B\u5EFA\u955C\u50CFimage-A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM ubuntu
<span class="token punctuation">..</span>.
ONBUILD ADD <span class="token builtin class-name">.</span> /var/www
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u521B\u5EFA\u955C\u50CFimage-B\uFF0C\u6307\u5B9Aimage-A\u4E3A\u57FA\u7840\u955C\u50CF\uFF0C\u5982</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM image-A
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u5728\u6784\u5EFAimage-B\u7684\u65F6\u5019\uFF0C\u65E5\u5FD7\u4E0A\u663E\u793A\u5982\u4E0B:</p><div class="language-log ext-log line-numbers-mode"><pre class="language-log"><code>Step <span class="token number">0</span> <span class="token operator">:</span> FROM image<span class="token operator">-</span>A
<span class="token operator">#</span> Execting <span class="token number">1</span> build triggers
Step onbuild<span class="token operator">-</span><span class="token number">0</span> <span class="token operator">:</span> ADD <span class="token punctuation">.</span> <span class="token file-path string">/var/www</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-9-user" tabindex="-1"><a class="header-anchor" href="#_5-9-user" aria-hidden="true">#</a> 5.9 USER</h3><p>\u6307\u5B9A\u8BE5\u955C\u50CF\u4EE5\u4EC0\u4E48\u6837\u7684\u7528\u6237\u53BB\u6267\u884C\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token environment constant">USER</span> mongo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-\u5BB9\u5668\u542F\u52A8\u65F6\u6267\u884C\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#_6-\u5BB9\u5668\u542F\u52A8\u65F6\u6267\u884C\u6307\u4EE4" aria-hidden="true">#</a> 6. \u5BB9\u5668\u542F\u52A8\u65F6\u6267\u884C\u6307\u4EE4</h2><h3 id="_6-1-cmd" tabindex="-1"><a class="header-anchor" href="#_6-1-cmd" aria-hidden="true">#</a> 6.1 CMD</h3><p>\u5BB9\u5668\u542F\u52A8\u65F6\u9700\u8981\u6267\u884C\u7684\u547D\u4EE4\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>CMD /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u540C\u6837\u53EF\u4EE5\u4F7F\u7528exec\u8BED\u6CD5\uFF0C\u5982</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>CMD <span class="token punctuation">[</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5F53\u6709\u591A\u4E2ACMD\u7684\u65F6\u5019\uFF0C\u53EA\u6709\u6700\u540E\u4E00\u4E2A\u751F\u6548\u3002</p><h3 id="_6-2-entrypoint" tabindex="-1"><a class="header-anchor" href="#_6-2-entrypoint" aria-hidden="true">#</a> 6.2 ENTRYPOINT</h3><p>\u4F5C\u7528\u548C\u7528\u6CD5\u548CCMD\u4E00\u6A21\u4E00\u6837</p><h3 id="_6-3-cmd\u548Centrypoint\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_6-3-cmd\u548Centrypoint\u7684\u533A\u522B" aria-hidden="true">#</a> 6.3 CMD\u548CENTRYPOINT\u7684\u533A\u522B</h3><p>\u6572\u9ED1\u677F\uFF01\uFF01\uFF01\u975E\u5E38\u91CD\u8981 <strong>\u4E00\u5B9A\u8981\u6CE8\u610F\uFF01</strong></p><p><strong>\u4E00\u5B9A\u8981\u6CE8\u610F\uFF01</strong></p><p><strong>\u4E00\u5B9A\u8981\u6CE8\u610F\uFF01</strong></p><p>CMD\u548CENTRYPOINT\u540C\u6837\u4F5C\u4E3A\u5BB9\u5668\u542F\u52A8\u65F6\u6267\u884C\u7684\u547D\u4EE4\uFF0C\u533A\u522B\u6709\u4EE5\u4E0B\u51E0\u70B9\uFF1A</p><h4 id="_6-3-1-cmd\u7684\u547D\u4EE4\u4F1A\u88AB-docker-run-\u7684\u547D\u4EE4\u8986\u76D6\u800Centrypoint\u4E0D\u4F1A" tabindex="-1"><a class="header-anchor" href="#_6-3-1-cmd\u7684\u547D\u4EE4\u4F1A\u88AB-docker-run-\u7684\u547D\u4EE4\u8986\u76D6\u800Centrypoint\u4E0D\u4F1A" aria-hidden="true">#</a> 6.3.1 CMD\u7684\u547D\u4EE4\u4F1A\u88AB docker run \u7684\u547D\u4EE4\u8986\u76D6\u800CENTRYPOINT\u4E0D\u4F1A</h4><p>\u5982\u4F7F\u7528<code>CMD [&quot;/bin/bash&quot;]</code>\u6216<code>ENTRYPOINT [&quot;/bin/bash&quot;]</code>\u540E\uFF0C\u518D\u4F7F\u7528<code>docker run -ti image</code>\u542F\u52A8\u5BB9\u5668\uFF0C\u5B83\u4F1A\u81EA\u52A8\u8FDB\u5165\u5BB9\u5668\u5185\u90E8\u7684\u4EA4\u4E92\u7EC8\u7AEF\uFF0C\u5982\u540C\u4F7F\u7528 <code>docker run -ti image /bin/bash</code>\u3002</p><p>\u4F46\u662F\u5982\u679C\u542F\u52A8\u955C\u50CF\u7684\u547D\u4EE4\u4E3A<code>docker run -ti image /bin/ps</code>\uFF0C\u4F7F\u7528CMD\u540E\u9762\u7684\u547D\u4EE4\u5C31\u4F1A\u88AB\u8986\u76D6\u8F6C\u800C\u6267\u884C<code>bin/ps</code>\u547D\u4EE4\uFF0C\u800C<em>ENTRYPOINT\u7684\u5219\u4E0D\u4F1A\uFF0C\u800C\u662F\u4F1A\u628Adocker run \u540E\u9762\u7684\u547D\u4EE4\u5F53\u505AENTRYPOINT\u6267\u884C\u547D\u4EE4\u7684\u53C2\u6570</em>\u3002 \u4EE5\u4E0B\u4F8B\u5B50\u6BD4\u8F83\u5BB9\u6613\u7406\u89E3 Dockerfile\u4E2D\u4E3A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;/user/sbin/nginx&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u901A\u8FC7\u542F\u52A8build\u4E4B\u540E\u7684\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-ti</span> image <span class="token parameter variable">-g</span> <span class="token string">&quot;daemon off&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6B64\u65F6<code>-g &quot;daemon off&quot;</code>\u4F1A\u88AB\u5F53\u6210\u53C2\u6570\u4F20\u9012\u7ED9ENTRYPOINT\uFF0C\u6700\u7EC8\u7684\u547D\u4EE4\u53D8\u6210\u4E86</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>/user/sbin/nginx <span class="token parameter variable">-g</span> <span class="token string">&quot;daemon off&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_6-3-2-cmd\u548Centrypoint\u90FD\u5B58\u5728\u65F6" tabindex="-1"><a class="header-anchor" href="#_6-3-2-cmd\u548Centrypoint\u90FD\u5B58\u5728\u65F6" aria-hidden="true">#</a> 6.3.2 CMD\u548CENTRYPOINT\u90FD\u5B58\u5728\u65F6</h4><p>CMD\u548CENTRYPOINT\u90FD\u5B58\u5728\u65F6\uFF0CCMD\u7684\u6307\u4EE4\u53D8\u6210\u4E86ENTRYPOINT\u7684\u53C2\u6570\uFF0C\u5E76\u4E14\u6B64CMD\u63D0\u4F9B\u7684\u53C2\u6570\u4F1A\u88AB docker run \u540E\u9762\u7684\u547D\u4EE4\u8986\u76D6\uFF0C\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">..</span>.
ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;echo&quot;</span>,<span class="token string">&quot;hello&quot;</span>,<span class="token string">&quot;i am&quot;</span><span class="token punctuation">]</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;docker&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E4B\u540E\u542F\u52A8\u6784\u5EFA\u4E4B\u540E\u7684\u5BB9\u5668</p><ul><li><p>\u4F7F\u7528<code>docker run -ti image</code></p><p>\u8F93\u51FA\u201Chello i am docker\u201D</p></li><li><p>\u4F7F\u7528<code>docker run -ti image world</code></p><p>\u8F93\u51FA\u201Chello i am world\u201D</p></li></ul><p>\u6307\u4EE4\u6BD4\u8F83\u591A\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5206\u7C7B(\u5982\u5F00\u5934\u7684\u8868\u683C)\u7684\u529E\u6CD5\u53BB\u8BB0\u5FC6</p><h2 id="_7-\u6784\u5EFA\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#_7-\u6784\u5EFA\u955C\u50CF" aria-hidden="true">#</a> 7. \u6784\u5EFA\u955C\u50CF</h2><p><code>Dockerfile</code>\u6587\u4EF6\u7F16\u5199\u597D\u4EE5\u540E\uFF0C\u771F\u6B63\u6784\u5EFA\u955C\u50CF\u65F6\u9700\u8981\u901A\u8FC7<code>docker build</code>\u547D\u4EE4\u3002</p><p><code>docker build</code>\u547D\u4EE4\u7528\u4E8E\u4F7F\u7528<code>Dockerfile</code>\u521B\u5EFA\u955C\u50CF\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4F7F\u7528\u5F53\u524D\u76EE\u5F55\u7684 Dockerfile \u521B\u5EFA\u955C\u50CF</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> mycentos:7 <span class="token builtin class-name">.</span>

<span class="token comment"># \u901A\u8FC7 -f Dockerfile \u6587\u4EF6\u7684\u4F4D\u7F6E\u521B\u5EFA\u955C\u50CF</span>
<span class="token function">docker</span> build <span class="token parameter variable">-f</span> /home/ruoyi/docker/Dockerfile <span class="token parameter variable">-t</span> mycentos:7 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>-f\uFF1A\u6307\u5B9A\u8981\u4F7F\u7528\u7684 Dockerfile \u8DEF\u5F84\uFF1B</li><li>--tag, -t\uFF1A\u955C\u50CF\u7684\u540D\u5B57\u53CA\u6807\u7B7E\uFF0C\u53EF\u4EE5\u5728\u4E00\u6B21\u6784\u5EFA\u4E2D\u4E3A\u4E00\u4E2A\u955C\u50CF\u8BBE\u7F6E\u591A\u4E2A\u6807\u7B7E\u3002</li></ul><h2 id="_8-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_8-\u793A\u4F8B" aria-hidden="true">#</a> 8. \u793A\u4F8B</h2><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u901A\u8FC7\u57FA\u7840\u955C\u50CF<code>centos:7</code>\uFF0C\u5728\u8BE5\u955C\u50CF\u4E2D\u5B89\u88C5<code>jdk</code>\u548C<code>tomcat</code>\u4EE5\u540E\u5C06\u5176\u5236\u4F5C\u4E3A\u4E00\u4E2A\u65B0\u7684\u955C\u50CF<code>mycentos:7</code></p><p>\u521B\u5EFA\u76EE\u5F55\uFF0C\u7F16\u5199<code>Dockerfile</code>\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/<span class="token variable"><span class="token variable">\`</span>dockerfile<span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6267\u884C\u547D\u4EE4\uFF1A<code>vi Dockerfile</code>\uFF0C\u5199\u5165\u4FE1\u606F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6307\u660E\u6784\u5EFA\u7684\u65B0\u955C\u50CF\u662F\u6765\u81EA\u4E8E\`centos:7\`\u57FA\u7840\u955C\u50CF</span>
FROM centos:7
<span class="token comment"># \u901A\u8FC7\u955C\u50CF\u6807\u7B7E\u58F0\u660E\u4E86\u4F5C\u8005\u4FE1\u606F</span>
LABEL <span class="token assign-left variable">maintainer</span><span class="token operator">=</span><span class="token string">&quot;ruoyi.vip&quot;</span>

<span class="token comment"># \u8BBE\u7F6E\u5DE5\u4F5C\u76EE\u5F55</span>
WORKDIR /usr/local
<span class="token comment"># \u65B0\u955C\u50CF\u6784\u5EFA\u6210\u529F\u4EE5\u540E\u521B\u5EFA\u6307\u5B9A\u76EE\u5F55</span>
RUN <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/java <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/tomcat
<span class="token comment"># \u62F7\u8D1D\u6587\u4EF6\u5230\u955C\u50CF\u4E2D\u5E76\u89E3\u538B</span>
ADD jdk-8u111-linux-x64.tar.gz /usr/local/java
ADD apache-tomcat-8.5.27.tar.gz /usr/local/tomcat
<span class="token comment"># \u66B4\u9732\u5BB9\u5668\u8FD0\u884C\u65F6\u7684 8080 \u76D1\u542C\u7AEF\u53E3\u7ED9\u5916\u90E8</span>
EXPOSE <span class="token number">8080</span>
<span class="token comment"># \u8BBE\u7F6E\u5BB9\u5668\u5185 JAVA_HOME \u73AF\u5883\u53D8\u91CF</span>
ENV JAVA_HOME /usr/local/java/jdk1.8.0_111
ENV <span class="token environment constant">PATH</span> <span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin
<span class="token comment"># \u542F\u52A8\u5BB9\u5668\u65F6\u542F\u52A8 tomcat</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;/usr/local/tomcat/apache-tomcat-8.5.27/bin/catalina.sh&quot;</span>, <span class="token string">&quot;run&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6784\u5EFA\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-f</span> /home/ruoyi/docker/Dockerfile <span class="token parameter variable">-t</span> mycentos:test <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u542F\u52A8\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-di</span> <span class="token parameter variable">--name</span> mycentos <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 mycentos:test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FDB\u5165\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mycentos7 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_9-\u955C\u50CF\u6784\u5EFA\u5386\u53F2" tabindex="-1"><a class="header-anchor" href="#_9-\u955C\u50CF\u6784\u5EFA\u5386\u53F2" aria-hidden="true">#</a> 9. \u955C\u50CF\u6784\u5EFA\u5386\u53F2</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker history \u955C\u50CF\u540D\u79F0:\u6807\u7B7E|ID
docker history mycentos:7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,112),p={href:"https://www.jianshu.com/p/10ed530766af",target:"_blank",rel:"noopener noreferrer"},u=s("\u5B66\u4E60Docker\u4E4BDockerfile\u7684\u547D\u4EE4"),h={href:"https://www.jianshu.com/p/cbce69c7a52f",target:"_blank",rel:"noopener noreferrer"},v=s("\u4F7F\u7528Dockerfile\u6784\u5EFADocker\u955C\u50CF"),m={href:"http://doc.ruoyi.vip/ruoyi-cloud/cloud/dokcer.html#%E6%9E%84%E5%BB%BA%E9%95%9C%E5%83%8F",target:"_blank",rel:"noopener noreferrer"},b=s("\u82E5\u4F9D\u6587\u6863-Dockerfile");function g(k,f){const a=t("ExternalLinkIcon");return r(),d("div",null,[o,e("p",null,[e("a",p,[u,n(a)])]),e("p",null,[e("a",h,[v,n(a)])]),e("p",null,[e("a",m,[b,n(a)])])])}const D=i(c,[["render",g],["__file","docker-file-overview.html.vue"]]);export{D as default};
