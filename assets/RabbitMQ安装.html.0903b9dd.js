import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{o as d,c as t,a as e,b as r,e as n,d as a,r as l}from"./app.6bf01134.js";const c={},o=n(`<h1 id="rabbitmq\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#rabbitmq\u5B89\u88C5" aria-hidden="true">#</a> RabbitMQ\u5B89\u88C5</h1><h2 id="_1-\u5B89\u88C5erlang" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5erlang" aria-hidden="true">#</a> 1. \u5B89\u88C5erlang</h2><h3 id="_1-1-\u4E0B\u8F7Derlang-\u5B89\u88C5\u5305" tabindex="-1"><a class="header-anchor" href="#_1-1-\u4E0B\u8F7Derlang-\u5B89\u88C5\u5305" aria-hidden="true">#</a> 1.1 \u4E0B\u8F7Derlang \u5B89\u88C5\u5305</h3><p>\u5728\u5B98\u7F51\u4E0B\u8F7D\u7136\u540E\u4E0A\u4F20\u5230 Linux \u4E0A\u6216\u8005\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u7684\u547D\u4EE4\u4E0B\u8F7D\u5BF9\u5E94\u7684\u7248\u672C\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>wget http://erlang.org/download/otp_src_19.3.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-\u89E3\u538Berlang-\u5B89\u88C5\u5305" tabindex="-1"><a class="header-anchor" href="#_1-2-\u89E3\u538Berlang-\u5B89\u88C5\u5305" aria-hidden="true">#</a> 1.2 \u89E3\u538Berlang \u5B89\u88C5\u5305</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>tar -xvzf otp_src_19.3.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-3-\u5220\u9664erlang-\u5B89\u88C5\u5305" tabindex="-1"><a class="header-anchor" href="#_1-3-\u5220\u9664erlang-\u5B89\u88C5\u5305" aria-hidden="true">#</a> 1.3 \u5220\u9664erlang \u5B89\u88C5\u5305</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rm -rf otp_src_19.3.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-4-\u5B89\u88C5erlang-\u7684\u4F9D\u8D56\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#_1-4-\u5B89\u88C5erlang-\u7684\u4F9D\u8D56\u5DE5\u5177" aria-hidden="true">#</a> 1.4 \u5B89\u88C5erlang \u7684\u4F9D\u8D56\u5DE5\u5177</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yum -y install make gcc gcc-c++ kernel-devel m4 ncurses-devel openssl-devel unixODBC-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-5-\u8FDB\u5165-erlang-\u5B89\u88C5\u5305\u89E3\u538B\u6587\u4EF6\u5BF9erlang-\u8FDB\u884C\u5B89\u88C5\u73AF\u5883\u7684\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_1-5-\u8FDB\u5165-erlang-\u5B89\u88C5\u5305\u89E3\u538B\u6587\u4EF6\u5BF9erlang-\u8FDB\u884C\u5B89\u88C5\u73AF\u5883\u7684\u914D\u7F6E" aria-hidden="true">#</a> 1.5 \u8FDB\u5165 erlang \u5B89\u88C5\u5305\u89E3\u538B\u6587\u4EF6\u5BF9erlang \u8FDB\u884C\u5B89\u88C5\u73AF\u5883\u7684\u914D\u7F6E</h3><p>\u5728/usr/local\u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mkdir erlang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5BF9erlang \u8FDB\u884C\u5B89\u88C5\u73AF\u5883\u914D\u7F6E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>./configure --prefix=/usr/local/erlang --without-javac
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-6-\u7F16\u8BD1\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-6-\u7F16\u8BD1\u5B89\u88C5" aria-hidden="true">#</a> 1.6 \u7F16\u8BD1\u5B89\u88C5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>make &amp;&amp; make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-7-\u9A8C\u8BC1erlang-\u662F\u5426\u5B89\u88C5\u6210\u529F" tabindex="-1"><a class="header-anchor" href="#_1-7-\u9A8C\u8BC1erlang-\u662F\u5426\u5B89\u88C5\u6210\u529F" aria-hidden="true">#</a> 1.7 \u9A8C\u8BC1erlang \u662F\u5426\u5B89\u88C5\u6210\u529F</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>./bin/erl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD0\u884C\u4E0B\u9762\u7684\u8BED\u53E5\u8F93\u51FA\u201Chello world\u201D</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>io:format(&quot;hello world~n&quot;, []).
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191107002303817.png" alt="image-20191107002303817" loading="lazy"></p><p>\u5230\u6B64\u5C31\u5B89\u88C5\u5B8C\u6BD5</p><h3 id="_1-8-\u914D\u7F6E-erlang-\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#_1-8-\u914D\u7F6E-erlang-\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> 1.8 \u914D\u7F6E erlang \u73AF\u5883\u53D8\u91CF</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>vim /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FFD\u52A0\u4E0B\u5217\u73AF\u5883\u53D8\u91CF\u5230\u6587\u4EF6\u672B\u5C3E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#erlang
ERL_HOME=/usr/local/erlang
PATH=$ERL_HOME/bin:$PATH
export ERL_HOME PATH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u4E0B\u5217\u547D\u4EE4\u4F7F\u914D\u7F6E\u6587\u4EF6<code>profile</code>\u751F\u6548</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>source /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u5165 erl \u67E5\u770B erlang \u73AF\u5883\u53D8\u91CF\u662F\u5426\u914D\u7F6E\u6B63\u786E</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191107002712325.png" alt="image-20191107002712325" loading="lazy"></p><h2 id="_2-\u5B89\u88C5-rabbitmq" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5-rabbitmq" aria-hidden="true">#</a> 2. \u5B89\u88C5 RabbitMQ</h2><h3 id="_2-1-\u4E0B\u8F7D-rpm" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E0B\u8F7D-rpm" aria-hidden="true">#</a> 2.1 \u4E0B\u8F7D rpm</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.8/rabbitmq-server-3.6.8-1.el7.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-\u5B89\u88C5rpm" tabindex="-1"><a class="header-anchor" href="#_2-2-\u5B89\u88C5rpm" aria-hidden="true">#</a> 2.2 \u5B89\u88C5rpm</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7D27\u63A5\u7740\u6267\u884C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yum install rabbitmq-server-3.6.8-1.el7.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-\u5F00\u542F-web-\u7BA1\u7406\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-3-\u5F00\u542F-web-\u7BA1\u7406\u63D2\u4EF6" aria-hidden="true">#</a> 2.3 \u5F00\u542F web \u7BA1\u7406\u63D2\u4EF6</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rabbitmq-plugins enable rabbitmq_management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4-\u8BBE\u7F6E\u5F00\u673A\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#_2-4-\u8BBE\u7F6E\u5F00\u673A\u542F\u52A8" aria-hidden="true">#</a> 2.4 \u8BBE\u7F6E\u5F00\u673A\u542F\u52A8</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>chkconfig rabbitmq-server on
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-5-\u542F\u52A8\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-5-\u542F\u52A8\u670D\u52A1" aria-hidden="true">#</a> 2.5 \u542F\u52A8\u670D\u52A1</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>service rabbitmq-server start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-6-\u67E5\u770B\u670D\u52A1\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#_2-6-\u67E5\u770B\u670D\u52A1\u72B6\u6001" aria-hidden="true">#</a> 2.6 \u67E5\u770B\u670D\u52A1\u72B6\u6001</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>service rabbitmq-server status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-7-\u8BBF\u95EErabbitmq-\u63A7\u5236\u53F0" tabindex="-1"><a class="header-anchor" href="#_2-7-\u8BBF\u95EErabbitmq-\u63A7\u5236\u53F0" aria-hidden="true">#</a> 2.7 \u8BBF\u95EERabbitMQ \u63A7\u5236\u53F0</h3>`,48),u=a("\u6D4F\u89C8\u5668\u8BBF\u95EE\uFF1A"),g={href:"http://xn--ip-0p3ck01akcu41v:15672/",target:"_blank",rel:"noopener noreferrer"},m=a("http://\u4F60\u7684ip\u5730\u5740:15672/"),b=n(`<p>\u9ED8\u8BA4\u7528\u6237\u540D\u548C\u5BC6\u7801\uFF1A guest/guest;\u4F46\u662F\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF1Aguestuest\u7528\u6237\u53EA\u662F\u88AB\u5BB9\u8BB8\u4ECElocalhost\u8BBF\u95EE\u3002\u5B98\u7F51\u6587\u6863\u63CF\u8FF0\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u201Cguest\u201D user can only connect via localhost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u89E3\u51B3\u8FDC\u7A0B\u8BBF\u95EE RabbitMQ \u8FDC\u7A0B\u8BBF\u95EE\u5BC6\u7801\u9519\u8BEF</strong></p><p>\u65B0\u5EFA\u7528\u6237\u5E76\u6388\u6743</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rabbitmqctl add_user root root
rabbitmqctl set_user_tags root administrator
rabbitmqctl set_permissions -p / root &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191107003531187.png" alt="image-20191107003531187" loading="lazy"></p>`,6),h=a("\u518D\u6B21\u8BBF\u95EE:"),v={href:"http://xn--ip-0p3ck01akcu41v:15672/",target:"_blank",rel:"noopener noreferrer"},p=a("http://\u4F60\u7684ip\u5730\u5740:15672/"),x=a(" ,\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801\uFF1Aroot root"),_=e("p",null,[e("img",{src:"https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20191107003626827.png",alt:"image-20191107003626827",loading:"lazy"})],-1);function f(q,z){const i=l("ExternalLinkIcon");return d(),t("div",null,[o,e("p",null,[u,e("a",g,[m,r(i)])]),b,e("p",null,[h,e("a",v,[p,r(i)]),x]),_])}var y=s(c,[["render",f],["__file","RabbitMQ\u5B89\u88C5.html.vue"]]);export{y as default};
