import{_ as a,W as e,X as t,Y as s,$ as i,a0 as l,D as p}from"./framework-0cf5f349.js";const o={},c=l(`<h1 id="docker基础-一个web应用实例1" tabindex="-1"><a class="header-anchor" href="#docker基础-一个web应用实例1" aria-hidden="true">#</a> Docker基础 - 一个web应用实例1</h1><h2 id="_1-一个web-应用运行和访问" tabindex="-1"><a class="header-anchor" href="#_1-一个web-应用运行和访问" aria-hidden="true">#</a> 1. 一个web 应用运行和访问</h2><h3 id="_1-1-运行一个-web-应用" tabindex="-1"><a class="header-anchor" href="#_1-1-运行一个-web-应用" aria-hidden="true">#</a> 1.1 运行一个 web 应用</h3><blockquote><p>我们只需要找一个webapp的镜像即可，无需自己再写个程序啥的。接下来让我们尝试使用 docker 构建一个 web 应用程序。</p></blockquote><p>这里找了一个<code>training/webapp</code>，它是将在docker容器中运行一个 Python Flask web应用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker pull training/webapp</span>
Using default tag: latest
latest: Pulling from training/webapp
Image docker.io/training/webapp:latest uses outdated schema1 manifest format. Please upgrade to a schema2 image <span class="token keyword">for</span> better future compatibility. More information at https://docs.docker.com/registry/spec/deprecated-schema-v1/
e190868d63f8: Pull complete
909cd34c6fd7: Pull complete
0b9bfabab7c1: Pull complete
a3ed95caeb02: Pull complete
10bbbc0fc0ff: Pull complete
fca59b508e9f: Pull complete
e7ae2541b15b: Pull complete
9dd97ef58ce9: Pull complete
a4c1b0cb7af7: Pull complete
Digest: sha256:06e9c1983bd6d5db5fba376ccd63bfa529e8d02f23d5079b8f74a616308fb11d
Status: Downloaded newer image <span class="token keyword">for</span> training/webapp:latest
docker.io/training/webapp:latest
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker images | grep webapp</span>
training/webapp     latest              6fae60ef3446        <span class="token number">4</span> years ago         349MB

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，我们启动这个webapp</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker run -d -P training/webapp python app.py</span>
ec3eb9ae218494d5aa5902c1ca4435733567b5e81319f02e5d2509d45cbc25da
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps</span>
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                     NAMES
ec3eb9ae2184        training/webapp     <span class="token string">&quot;python app.py&quot;</span>     <span class="token number">18</span> seconds ago      Up <span class="token number">17</span> seconds       <span class="token number">0.0</span>.0.0:32768-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp   gifted_agnesi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明:</p><ul><li><code>-d</code>:让容器在后台运行。</li><li><code>-P</code>:将容器内部使用的网络端口映射到我们使用的主机上。</li></ul><h3 id="_1-2-访问webapp" tabindex="-1"><a class="header-anchor" href="#_1-2-访问webapp" aria-hidden="true">#</a> 1.2 访问webapp</h3><blockquote><p>我们注意看上述PORTS部分为0.0.0.0:32769-&gt;5000/tcp</p></blockquote><p>Docker 开放了 5000 端口（默认 Python Flask 端口）映射到主机端口 32768 上。</p><ul><li><strong>从主机上看</strong>，它应该暴露了<strong>端口32768</strong></li></ul><p>所以我们来验证下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># netstat | grep 32768</span>
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># netstat -nltp | grep 32768</span>
tcp6       <span class="token number">0</span>      <span class="token number">0</span> :::32768                :::*                    LISTEN      <span class="token number">2227</span>/docker-proxy
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># curl localhost:32768</span>
Hello world<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着，你浏览器你可以输入<code>localhost:32768</code>访问这个页面。</p><ul><li><strong>从容器内部看</strong>，它应该有一个<strong>端口5000</strong></li></ul><p>我们再进容器验证下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker exec -it ec3eb9ae2184 /bin/bash</span>
root@ec3eb9ae2184:/opt/webapp<span class="token comment"># netstat -nltp</span>
Active Internet connections <span class="token punctuation">(</span>only servers<span class="token punctuation">)</span>
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">0.0</span>.0.0:5000            <span class="token number">0.0</span>.0.0:*               LISTEN      <span class="token number">1</span>/python

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以我们的理解是对的。</p><h3 id="_1-3-设置自定义映射端口" tabindex="-1"><a class="header-anchor" href="#_1-3-设置自定义映射端口" aria-hidden="true">#</a> 1.3 设置自定义映射端口</h3><blockquote><p>我们发现，通过 <code>-P</code>参数映射到主机上的端口是随机，能否自定义端口呢？</p></blockquote><p>我们可以通过 -p 参数来设置不一样的端口；为了对比，我们再起一个容器实例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker run -d -p 5001:5000 training/webapp python app.py</span>
5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps</span>
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                     NAMES
5da3588d5bc4        training/webapp     <span class="token string">&quot;python app.py&quot;</span>     <span class="token number">33</span> seconds ago      Up <span class="token number">31</span> seconds       <span class="token number">0.0</span>.0.0:5001-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp    hopeful_bardeen
ec3eb9ae2184        training/webapp     <span class="token string">&quot;python app.py&quot;</span>     <span class="token number">22</span> minutes ago      Up <span class="token number">22</span> minutes       <span class="token number">0.0</span>.0.0:32768-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp   gifted_agnesi
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># netstat -nltp | grep 5001</span>
tcp6       <span class="token number">0</span>      <span class="token number">0</span> :::5001                 :::*                    LISTEN      <span class="token number">2591</span>/docker-proxy
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># curl localhost:5001</span>
Hello world<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以你看到跑了两个内部端口都是5000的web实例，新的容器内部的 5000 端口映射到我们本地主机的 5001 端口上。</p><h2 id="_2-其它常用功能" tabindex="-1"><a class="header-anchor" href="#_2-其它常用功能" aria-hidden="true">#</a> 2. 其它常用功能</h2><h3 id="_2-1-查看web-应用网络端口" tabindex="-1"><a class="header-anchor" href="#_2-1-查看web-应用网络端口" aria-hidden="true">#</a> 2.1 查看web 应用网络端口</h3><blockquote><p>通过 docker ps 命令可以查看到容器的端口映射，docker 还提供了另一个快捷方式 docker port，使用 docker port 可以查看指定 （ID 或者名字）容器的某个确定端口映射到宿主机的端口号。</p></blockquote><p>上面我们创建的 web 应用容器 ID 为 5da3588d5bc4 名字为 hopeful_bardeen。</p><p>我可以这样查看容器端口的映射情况：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker port 5da3588d5bc4</span>
<span class="token number">5000</span>/tcp -<span class="token operator">&gt;</span> <span class="token number">0.0</span>.0.0:5001
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker port hopeful_bardeen</span>
<span class="token number">5000</span>/tcp -<span class="token operator">&gt;</span> <span class="token number">0.0</span>.0.0:5001

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-查看-web-应用程序日志" tabindex="-1"><a class="header-anchor" href="#_2-2-查看-web-应用程序日志" aria-hidden="true">#</a> 2.2 查看 WEB 应用程序日志</h3><blockquote><p>docker logs [ID或者名字] 可以查看容器内部的标准输出。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker port hopeful_bardeen</span>
<span class="token number">5000</span>/tcp -<span class="token operator">&gt;</span> <span class="token number">0.0</span>.0.0:5001
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker logs -f hopeful_bardeen</span>
 * Running on http://0.0.0.0:5000/ <span class="token punctuation">(</span>Press CTRL+C to quit<span class="token punctuation">)</span>
<span class="token number">172.17</span>.0.1 - - <span class="token punctuation">[</span><span class="token number">18</span>/Feb/2020 09:08:31<span class="token punctuation">]</span> <span class="token string">&quot;GET / HTTP/1.1&quot;</span> <span class="token number">200</span> -
^C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明：</p><ul><li><code>-f</code>: 让 docker logs 像使用 tail -f 一样来输出容器内部的标准输出。</li></ul><p>从上面，我们可以看到应用程序使用的是 5000 端口并且能够查看到应用程序的访问日志。</p><h3 id="_2-3-查看web应用程序容器的进程" tabindex="-1"><a class="header-anchor" href="#_2-3-查看web应用程序容器的进程" aria-hidden="true">#</a> 2.3 查看WEB应用程序容器的进程</h3><p>我们还可以使用 docker top 来查看容器内部运行的进程</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker top hopeful_bardeen</span>
<span class="token environment constant">UID</span>                 PID                 <span class="token environment constant">PPID</span>                C                   STIME               TTY                 TIME                CMD
root                <span class="token number">2614</span>                <span class="token number">2597</span>                <span class="token number">0</span>                   <span class="token number">17</span>:07               ?                   00:00:00            python app.py

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-检查-web-应用程序" tabindex="-1"><a class="header-anchor" href="#_2-4-检查-web-应用程序" aria-hidden="true">#</a> 2.4 检查 WEB 应用程序</h3><p>使用 docker inspect 来查看 Docker 的底层信息。它会返回一个 JSON 文件记录着 Docker 容器的配置和状态信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker inspect hopeful_bardeen</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;Id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a&quot;</span>,
        <span class="token string">&quot;Created&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2020-02-18T09:07:32.827193286Z&quot;</span>,
        <span class="token string">&quot;Path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;python&quot;</span>,
        <span class="token string">&quot;Args&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;app.py&quot;</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;State&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Status&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;running&quot;</span>,
            <span class="token string">&quot;Running&quot;</span><span class="token builtin class-name">:</span> true,
            <span class="token string">&quot;Paused&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;Restarting&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;OOMKilled&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;Dead&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;Pid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2614</span>,
            <span class="token string">&quot;ExitCode&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;Error&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;StartedAt&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2020-02-18T09:07:33.374368448Z&quot;</span>,
            <span class="token string">&quot;FinishedAt&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0001-01-01T00:00:00Z&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Image&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;sha256:6fae60ef344644649a39240b94d73b8ba9c67f898ede85cf8e947a887b3e6557&quot;</span>,
        <span class="token string">&quot;ResolvConfPath&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/resolv.conf&quot;</span>,
        <span class="token string">&quot;HostnamePath&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/hostname&quot;</span>,
        <span class="token string">&quot;HostsPath&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/hosts&quot;</span>,
        <span class="token string">&quot;LogPath&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/containers/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a/5da3588d5bc43a9ed3aa61fb87f98220c9719d2879b616404d443aaae6cee77a-json.log&quot;</span>,
        <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/hopeful_bardeen&quot;</span>,
        <span class="token string">&quot;RestartCount&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
        <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;overlay2&quot;</span>,
        <span class="token string">&quot;Platform&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;linux&quot;</span>,
        <span class="token string">&quot;MountLabel&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
        <span class="token string">&quot;ProcessLabel&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
        <span class="token string">&quot;AppArmorProfile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
        <span class="token string">&quot;ExecIDs&quot;</span><span class="token builtin class-name">:</span> null,
        <span class="token string">&quot;HostConfig&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Binds&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;ContainerIDFile&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;LogConfig&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;json-file&quot;</span>,
                <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;NetworkMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
            <span class="token string">&quot;PortBindings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;5000/tcp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token string">&quot;HostIp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                        <span class="token string">&quot;HostPort&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;5001&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;RestartPolicy&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;no&quot;</span>,
                <span class="token string">&quot;MaximumRetryCount&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;AutoRemove&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;VolumeDriver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;VolumesFrom&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;CapAdd&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;CapDrop&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;Capabilities&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;Dns&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
            <span class="token string">&quot;DnsOptions&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
            <span class="token string">&quot;DnsSearch&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
            <span class="token string">&quot;ExtraHosts&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;GroupAdd&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;IpcMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;private&quot;</span>,
            <span class="token string">&quot;Cgroup&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;Links&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;OomScoreAdj&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;PidMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;Privileged&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;PublishAllPorts&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;ReadonlyRootfs&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;SecurityOpt&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;UTSMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;UsernsMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;ShmSize&quot;</span><span class="token builtin class-name">:</span> <span class="token number">67108864</span>,
            <span class="token string">&quot;Runtime&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;runc&quot;</span>,
            <span class="token string">&quot;ConsoleSize&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token number">0</span>,
                <span class="token number">0</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;Isolation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;CpuShares&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;Memory&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;NanoCpus&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;CgroupParent&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;BlkioWeight&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;BlkioWeightDevice&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
            <span class="token string">&quot;BlkioDeviceReadBps&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;BlkioDeviceWriteBps&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;BlkioDeviceReadIOps&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;BlkioDeviceWriteIOps&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;CpuPeriod&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;CpuQuota&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;CpuRealtimePeriod&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;CpuRealtimeRuntime&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;CpusetCpus&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;CpusetMems&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;Devices&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
            <span class="token string">&quot;DeviceCgroupRules&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;DeviceRequests&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;KernelMemory&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;KernelMemoryTCP&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;MemoryReservation&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;MemorySwap&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;MemorySwappiness&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;OomKillDisable&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;PidsLimit&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;Ulimits&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;CpuCount&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;CpuPercent&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;IOMaximumIOps&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;IOMaximumBandwidth&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;MaskedPaths&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;/proc/asound&quot;</span>,
                <span class="token string">&quot;/proc/acpi&quot;</span>,
                <span class="token string">&quot;/proc/kcore&quot;</span>,
                <span class="token string">&quot;/proc/keys&quot;</span>,
                <span class="token string">&quot;/proc/latency_stats&quot;</span>,
                <span class="token string">&quot;/proc/timer_list&quot;</span>,
                <span class="token string">&quot;/proc/timer_stats&quot;</span>,
                <span class="token string">&quot;/proc/sched_debug&quot;</span>,
                <span class="token string">&quot;/proc/scsi&quot;</span>,
                <span class="token string">&quot;/sys/firmware&quot;</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;ReadonlyPaths&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;/proc/bus&quot;</span>,
                <span class="token string">&quot;/proc/fs&quot;</span>,
                <span class="token string">&quot;/proc/irq&quot;</span>,
                <span class="token string">&quot;/proc/sys&quot;</span>,
                <span class="token string">&quot;/proc/sysrq-trigger&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;GraphDriver&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Data&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;LowerDir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14-init/diff:/var/lib/docker/overlay2/d4690a06236a3857a2a51ab84c61992e50ea3e1a613f4793334916604ea0dfa0/diff:/var/lib/docker/overlay2/c45d0215cd2076174f38fea5003c3ff11a5ba2df2141d9d069f4bf32dac9a22a/diff:/var/lib/docker/overlay2/1cf63068912234a1f4c861f58f155423c87193c6e438948db493687d4da4f0a0/diff:/var/lib/docker/overlay2/55e4ecb04b1ff8d048bc75bb8698c782c813d45caa6f0d82ac6c49adec24bead/diff:/var/lib/docker/overlay2/27fa0dc314b851b8d2f0386d230a725f57117f9f1ccdb49ca27f5ad424cb4a90/diff:/var/lib/docker/overlay2/65a5a082188d9e0b9aaf09c2e9c3b3f8141f74c781996680dfaca63d81672cdf/diff:/var/lib/docker/overlay2/658a33c92cf114ee4cbc10f117207a0c813e39a908acc014fbce1783a28bc654/diff:/var/lib/docker/overlay2/e5b5c9e0abc43ff2750dcd33decc65d90d733b18f2626b91c500d803d7fe189b/diff:/var/lib/docker/overlay2/0b5181e429a89f6ab291e090b972e11718e4f63158ed60af1fce18095d0352a6/diff:/var/lib/docker/overlay2/f7c0405739bb58fdfa9af402a72507b78bc2a48b0d74356dad59495906b6e0e5/diff:/var/lib/docker/overlay2/073c45ae4a6ff27950a1dd969a675d3dcdc18392bb205ddde5913fcc10a751ef/diff:/var/lib/docker/overlay2/f92534844c8cc5b950ea36369b8e4a7dd7f7749e73483908e5d129bf5c26442f/diff:/var/lib/docker/overlay2/477378381d03c4b347d7b9224c4c9023b5dfbfde32022c7eb8af32e7a01b88b2/diff&quot;</span>,
                <span class="token string">&quot;MergedDir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14/merged&quot;</span>,
                <span class="token string">&quot;UpperDir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14/diff&quot;</span>,
                <span class="token string">&quot;WorkDir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/overlay2/c6594e5b70feca02eb4b90ac75aba711f36378d5cb9853ffca1ec92f9d0c3e14/work&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;overlay2&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Hostname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;5da3588d5bc4&quot;</span>,
            <span class="token string">&quot;Domainname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;User&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;AttachStdin&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;AttachStdout&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;AttachStderr&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;ExposedPorts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;5000/tcp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;Tty&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;OpenStdin&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;StdinOnce&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;Env&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin&quot;</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;Cmd&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;python&quot;</span>,
                <span class="token string">&quot;app.py&quot;</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;Image&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;training/webapp&quot;</span>,
            <span class="token string">&quot;Volumes&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;WorkingDir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/opt/webapp&quot;</span>,
            <span class="token string">&quot;Entrypoint&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;OnBuild&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;Labels&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;NetworkSettings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Bridge&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;SandboxID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;66e1f111a5d7acca71f0e9e24516a6945bca428f55ac1eab1576c99bde16190c&quot;</span>,
            <span class="token string">&quot;HairpinMode&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;LinkLocalIPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;LinkLocalIPv6PrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;Ports&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;5000/tcp&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token string">&quot;HostIp&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0.0.0.0&quot;</span>,
                        <span class="token string">&quot;HostPort&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;5001&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;SandboxKey&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/run/docker/netns/66e1f111a5d7&quot;</span>,
            <span class="token string">&quot;SecondaryIPAddresses&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;SecondaryIPv6Addresses&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;EndpointID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;794d5e97cd3bbb62c8a7a850f125404d174ecc45df4e704dbee403b1be7a2835&quot;</span>,
            <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.1&quot;</span>,
            <span class="token string">&quot;GlobalIPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;GlobalIPv6PrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;IPAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.3&quot;</span>,
            <span class="token string">&quot;IPPrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">16</span>,
            <span class="token string">&quot;IPv6Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;MacAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;02:42:ac:11:00:03&quot;</span>,
            <span class="token string">&quot;Networks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;bridge&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;IPAMConfig&quot;</span><span class="token builtin class-name">:</span> null,
                    <span class="token string">&quot;Links&quot;</span><span class="token builtin class-name">:</span> null,
                    <span class="token string">&quot;Aliases&quot;</span><span class="token builtin class-name">:</span> null,
                    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;b8c5abdb0becacfa1bfa1d72e2e663fb0157b62a9b8bee37e2607211722713cc&quot;</span>,
                    <span class="token string">&quot;EndpointID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;794d5e97cd3bbb62c8a7a850f125404d174ecc45df4e704dbee403b1be7a2835&quot;</span>,
                    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.1&quot;</span>,
                    <span class="token string">&quot;IPAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.3&quot;</span>,
                    <span class="token string">&quot;IPPrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">16</span>,
                    <span class="token string">&quot;IPv6Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                    <span class="token string">&quot;GlobalIPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                    <span class="token string">&quot;GlobalIPv6PrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
                    <span class="token string">&quot;MacAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;02:42:ac:11:00:03&quot;</span>,
                    <span class="token string">&quot;DriverOpts&quot;</span><span class="token builtin class-name">:</span> null
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-停止-web-应用容器" tabindex="-1"><a class="header-anchor" href="#_2-5-停止-web-应用容器" aria-hidden="true">#</a> 2.5 停止 WEB 应用容器</h3><p>再复习下docker的停止</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker stop hopeful_bardeen</span>
hopeful_bardeen
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a | grep &#39;hopeful_bardeen&#39;</span>
5da3588d5bc4        training/webapp      <span class="token string">&quot;python app.py&quot;</span>      <span class="token number">13</span> minutes ago      Exited <span class="token punctuation">(</span><span class="token number">137</span><span class="token punctuation">)</span> <span class="token number">12</span> seconds ago                             hopeful_bardeen

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-重启web应用容器" tabindex="-1"><a class="header-anchor" href="#_2-6-重启web应用容器" aria-hidden="true">#</a> 2.6 重启WEB应用容器</h3><p>已经停止的容器，我们可以使用命令 docker start 或者docker restart 来启动。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker restart hopeful_bardeen</span>
hopeful_bardeen
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a | grep hopeful_bardeen</span>
5da3588d5bc4        training/webapp      <span class="token string">&quot;python app.py&quot;</span>      <span class="token number">14</span> minutes ago      Up <span class="token number">10</span> seconds            <span class="token number">0.0</span>.0.0:5001-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp    hopeful_bardeen

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-移除web应用容器" tabindex="-1"><a class="header-anchor" href="#_2-7-移除web应用容器" aria-hidden="true">#</a> 2.7 移除WEB应用容器</h3><p>我们可以使用 docker rm 命令来删除不需要的容器</p><p>我们上文也讲过，如果是启动着的docker实例，需要加-f，强制（force）删除。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a | grep hopeful_bardeen</span>
5da3588d5bc4        training/webapp      <span class="token string">&quot;python app.py&quot;</span>      <span class="token number">14</span> minutes ago      Up <span class="token number">10</span> seconds            <span class="token number">0.0</span>.0.0:5001-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp    hopeful_bardeen
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker rm -f hopeful_bardeen</span>
hopeful_bardeen
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a | grep hopeful_bardeen</span>
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-与其它容器-db容器-互联" tabindex="-1"><a class="header-anchor" href="#_3-与其它容器-db容器-互联" aria-hidden="true">#</a> 3. 与其它容器（DB容器）互联</h2><blockquote><p>上述是一个web单一容器通过端口映射，可以通过主机端口访问容器；那么如果需要访问数据库，就涉及到容器互联。</p></blockquote><h3 id="_3-1-与数据库容器互联" tabindex="-1"><a class="header-anchor" href="#_3-1-与数据库容器互联" aria-hidden="true">#</a> 3.1 与数据库容器互联</h3><ul><li>先停止上述的web容器, 且清理所有不用的容器</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a</span>
CONTAINER ID        IMAGE                COMMAND              CREATED             STATUS                    PORTS                     NAMES
ec3eb9ae2184        training/webapp      <span class="token string">&quot;python app.py&quot;</span>      <span class="token number">18</span> hours ago        Up <span class="token number">18</span> hours               <span class="token number">0.0</span>.0.0:32768-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp   gifted_agnesi
11de9755a084        pdai/ubuntu:v2.0.2   <span class="token string">&quot;/bin/bash&quot;</span>          <span class="token number">24</span> hours ago        Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">24</span> hours ago                             pdai-ubuntu-202
57bd797570b6        pdai/ubuntu:v2.0.2   <span class="token string">&quot;--name pdai-test&quot;</span>   <span class="token number">24</span> hours ago        Created                                             sharp_brahmagupta
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker stop ec3eb9ae2184</span>
ec3eb9ae2184
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a</span>
CONTAINER ID        IMAGE                COMMAND              CREATED             STATUS                        PORTS               NAMES
ec3eb9ae2184        training/webapp      <span class="token string">&quot;python app.py&quot;</span>      <span class="token number">18</span> hours ago        Exited <span class="token punctuation">(</span><span class="token number">137</span><span class="token punctuation">)</span> <span class="token number">29</span> seconds ago                       gifted_agnesi
11de9755a084        pdai/ubuntu:v2.0.2   <span class="token string">&quot;/bin/bash&quot;</span>          <span class="token number">24</span> hours ago        Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">24</span> hours ago                           pdai-ubuntu-202
57bd797570b6        pdai/ubuntu:v2.0.2   <span class="token string">&quot;--name pdai-test&quot;</span>   <span class="token number">24</span> hours ago        Created                                           sharp_brahmagupta
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker container prune</span>
WARNING<span class="token operator">!</span> This will remove all stopped containers.
Are you sure you want to continue? <span class="token punctuation">[</span>y/N<span class="token punctuation">]</span> y
Deleted Containers:
ec3eb9ae218494d5aa5902c1ca4435733567b5e81319f02e5d2509d45cbc25da
11de9755a08402d963d263a559a7daf48f4a2188398f258641240b5eb50fbc89
57bd797570b68b6587b16809889e6e8f710ec7a934229aa6391add02f758e036

Total reclaimed space: 89B
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>创建一个新的数据库容器。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker run -d --name db training/postgres</span>
Unable to <span class="token function">find</span> image <span class="token string">&#39;training/postgres:latest&#39;</span> locally
latest: Pulling from training/postgres
Image docker.io/training/postgres:latest uses outdated schema1 manifest format. Please upgrade to a schema2 image <span class="token keyword">for</span> better future compatibility. More information at https://docs.docker.com/registry/spec/deprecated-schema-v1/
a3ed95caeb02: Pull complete
6e71c809542e: Pull complete
2978d9af87ba: Pull complete
e1bca35b062f: Pull complete
500b6decf741: Pull complete
74b14ef2151f: Pull complete
7afd5ed3826e: Pull complete
3c69bb244f5e: Pull complete
d86f9ec5aedf: Pull complete
010fabf20157: Pull complete
Digest: sha256:a945dc6dcfbc8d009c3d972931608344b76c2870ce796da00a827bd50791907e
Status: Downloaded newer image <span class="token keyword">for</span> training/postgres:latest
d992e3c761e00649eb436b88c737adc54093b76119af0fb7878596b523f743ca
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps</span>
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
d992e3c761e0        training/postgres   <span class="token string">&quot;su postgres -c &#39;/us…&quot;</span>   <span class="token number">9</span> seconds ago       Up <span class="token number">7</span> seconds        <span class="token number">5432</span>/tcp            db

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>db 容器和 web 容器建立互联关系</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker run -d -p 5001:5000 --name web --link db:db training/webapp python app.py</span>
1cbc9aeba2a8a826d460ecb49de17ddf8ac336e150c752a3c762fd38a3e15254
<span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker ps -a</span>
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
1cbc9aeba2a8        training/webapp     <span class="token string">&quot;python app.py&quot;</span>          <span class="token number">5</span> seconds ago       Up <span class="token number">4</span> seconds        <span class="token number">0.0</span>.0.0:5001-<span class="token operator">&gt;</span><span class="token number">5000</span>/tcp   web
d992e3c761e0        training/postgres   <span class="token string">&quot;su postgres -c &#39;/us…&quot;</span>   <span class="token number">7</span> minutes ago       Up <span class="token number">7</span> minutes        <span class="token number">5432</span>/tcp                 db

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>--link 参数的格式为 --link name:alias，其中 name 是要链接的容器的名称，alias 是这个连接的别名。</p><blockquote><p>Docker 在两个互联的容器之间创建了一个安全隧道，而且不用映射它们的端口到宿主主机上。在启动 db 容器的时候并没有使用 -p 和 -P 标记，从而避免了暴露数据库端口到外部网络上。</p></blockquote><h3 id="_3-2容器公开的连接信息" tabindex="-1"><a class="header-anchor" href="#_3-2容器公开的连接信息" aria-hidden="true">#</a> 3.2容器公开的连接信息</h3><p>Docker 通过 2 种方式为容器公开连接信息：</p><ul><li>环境变量</li><li>更新 /etc/hosts 文件</li></ul><h4 id="_3-2-1环境变量" tabindex="-1"><a class="header-anchor" href="#_3-2-1环境变量" aria-hidden="true">#</a> 3.2.1环境变量</h4><p>使用 env 命令来查看 web 容器的环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@pdai ~<span class="token punctuation">]</span><span class="token comment"># docker exec -it web /bin/bash</span>
root@1cbc9aeba2a8:/opt/webapp<span class="token comment"># env</span>
<span class="token assign-left variable"><span class="token environment constant">HOSTNAME</span></span><span class="token operator">=</span>1cbc9aeba2a8
<span class="token assign-left variable">DB_NAME</span><span class="token operator">=</span>/web/db
<span class="token assign-left variable">DB_PORT_5432_TCP_ADDR</span><span class="token operator">=</span><span class="token number">172.17</span>.0.2
<span class="token assign-left variable">DB_PORT</span><span class="token operator">=</span>tcp://172.17.0.2:5432
<span class="token assign-left variable">DB_PORT_5432_TCP</span><span class="token operator">=</span>tcp://172.17.0.2:5432
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
<span class="token assign-left variable"><span class="token environment constant">PWD</span></span><span class="token operator">=</span>/opt/webapp
<span class="token assign-left variable">DB_PORT_5432_TCP_PORT</span><span class="token operator">=</span><span class="token number">5432</span>
<span class="token assign-left variable"><span class="token environment constant">SHLVL</span></span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable"><span class="token environment constant">HOME</span></span><span class="token operator">=</span>/root
<span class="token assign-left variable">DB_PORT_5432_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">DB_ENV_PG_VERSION</span><span class="token operator">=</span><span class="token number">9.3</span>
<span class="token assign-left variable">_</span><span class="token operator">=</span>/usr/bin/env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 DB_ 开头的环境变量是供 web 容器连接 db 容器使用，前缀采用大写的连接别名。</p><h4 id="_3-2-2-hosts-文件" tabindex="-1"><a class="header-anchor" href="#_3-2-2-hosts-文件" aria-hidden="true">#</a> 3.2.2 hosts 文件</h4><p>除了环境变量，Docker 还添加 host 信息到父容器的 /etc/hosts 的文件。下面是父容器 web 的 hosts 文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@1cbc9aeba2a8:/opt/webapp<span class="token comment"># cat /etc/hosts</span>
<span class="token number">127.0</span>.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
<span class="token number">172.17</span>.0.2      db d992e3c761e0
<span class="token number">172.17</span>.0.3      1cbc9aeba2a8
root@1cbc9aeba2a8:/opt/webapp<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有 2 个 hosts:</p><ul><li>第一个, <code>172.17.0.2 db d992e3c761e0</code> 表示 db 容器的 ip, ID和Name</li><li>第二个，<code>172.17.0.3 1cbc9aeba2a8</code> 表示 web 容器的 ip, ID</li></ul><p>可以在 web 容器中安装 ping 命令来测试跟db容器的连通。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@1cbc9aeba2a8:/opt/webapp# apt-get install -yqq inetutils-ping
(Reading database ... 18233 files and directories currently installed.)
Removing ubuntu-minimal (1.325) ...
Removing iputils-ping (3:20121221-4ubuntu1.1) ...
Selecting previously unselected package inetutils-ping.
(Reading database ... 18221 files and directories currently installed.)
Preparing to unpack .../inetutils-ping_2%3a1.9.2-1_amd64.deb ...
Unpacking inetutils-ping (2:1.9.2-1) ...
Setting up inetutils-ping (2:1.9.2-1) ...
root@1cbc9aeba2a8:/opt/webapp# ping db
PING db (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: icmp_seq=0 ttl=64 time=0.110 ms
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.092 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.094 ms
64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.104 ms
64 bytes from 172.17.0.2: icmp_seq=4 ttl=64 time=0.111 ms
64 bytes from 172.17.0.2: icmp_seq=5 ttl=64 time=0.093 ms
64 bytes from 172.17.0.2: icmp_seq=6 ttl=64 time=0.095 ms
^C--- db ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max/stddev = 0.092/0.100/0.111/0.000 ms

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 ping 来测试db容器，它会解析成 172.17.0.2。</p><p>当然，你还可以ping db容器的ID或者内部IP, 结果是一样的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@1cbc9aeba2a8:/opt/webapp<span class="token comment"># ping -t 4 d992e3c761e0</span>
ping: unsupported packet type: <span class="token number">4</span>
root@1cbc9aeba2a8:/opt/webapp<span class="token comment"># ping d992e3c761e0</span>
PING db <span class="token punctuation">(</span><span class="token number">172.17</span>.0.2<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.089</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.093</span> ms
^C--- db <span class="token function">ping</span> statistics ---
<span class="token number">2</span> packets transmitted, <span class="token number">2</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max/stddev <span class="token operator">=</span> <span class="token number">0.089</span>/0.091/0.093/0.000 ms
root@1cbc9aeba2a8:/opt/webapp<span class="token comment"># ping 172.17.0.2</span>
PING <span class="token number">172.17</span>.0.2 <span class="token punctuation">(</span><span class="token number">172.17</span>.0.2<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.094</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.103</span> ms
^C--- <span class="token number">172.17</span>.0.2 <span class="token function">ping</span> statistics ---
<span class="token number">2</span> packets transmitted, <span class="token number">2</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max/stddev <span class="token operator">=</span> <span class="token number">0.094</span>/0.099/0.103/0.000 ms
root@1cbc9aeba2a8:/opt/webapp<span class="token comment">#</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户可以链接多个父容器到子容器，比如可以链接多个 web 到 db 容器上。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,84),u={href:"https://pdai.tech/md/devops/docker/docker-03-basic-web-app.html",target:"_blank",rel:"noopener noreferrer"},r=s("strong",null,"Docker基础 - 一个web应用实例",-1);function d(b,m){const n=p("ExternalLinkIcon");return e(),t("div",null,[c,s("p",null,[s("a",u,[r,i(n)])])])}const k=a(o,[["render",d],["__file","docker-03-basic-web-app.html.vue"]]);export{k as default};
