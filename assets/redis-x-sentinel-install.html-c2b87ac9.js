import{_ as s,W as a,X as i,Y as e,Z as l,$ as t,a0 as d,D as r}from"./framework-0cf5f349.js";const c={},o=d(`<h1 id="redis集群搭建详解" tabindex="-1"><a class="header-anchor" href="#redis集群搭建详解" aria-hidden="true">#</a> Redis集群搭建详解</h1><h2 id="_1-redis-集群整体架构" tabindex="-1"><a class="header-anchor" href="#_1-redis-集群整体架构" aria-hidden="true">#</a> 1. Redis 集群整体架构</h2><p>这里我们采用的集群整体架构就是<strong>主从结构+哨兵（sentinel）</strong>，实现容灾的自动切换，如下图所示：</p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621211239642.png" alt="image-20220621211239642"><ul><li>一个主节点（master）可拥有多个从节点（slave），<strong>从节点实现对主节点的复制，保证数据同步</strong>。</li><li><strong>而哨兵（sentinel）则对各节点进行监控，主要包括主节点存活检测、主从运行情况检测等</strong>，一旦主节点宕机，<strong>哨兵可自动进行故障转移 （failover）、主从切换</strong>。 接下来就开始搭建这样一个集群，首先是主从结构，然后是哨兵模式，接着往下看。</li></ul><h2 id="_2-redis-主从配置及数据同步" tabindex="-1"><a class="header-anchor" href="#_2-redis-主从配置及数据同步" aria-hidden="true">#</a> 2. Redis 主从配置及数据同步</h2><p>在第一步 Redis 安装部署中我们已经启动了 Redis 服务，但是配置文件并没有做修改，因为主从配置主要就是通过修改配置文件来实现，所以 Redis 配置文件的修改统一在这里进行讲解。</p><p>这里我创建了三台虚拟机来演示，分别按照上述安装方式安装好 Redis，三台虚拟机如下配置：</p><table><thead><tr><th>IP地址</th><th>端口号</th><th>角色</th></tr></thead><tbody><tr><td>192.168.231.130</td><td>6379</td><td>主机（master）</td></tr><tr><td>192.168.231.132</td><td>6380</td><td>从机（slave）</td></tr><tr><td>192.168.231.131</td><td>6381</td><td>从机（slave）</td></tr></tbody></table><p>现在进入 etc 文件夹，使用vi redis.conf命令打开编辑 redis.conf 配置文件，如下 <img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621211702548.png" alt="image-20220621211702548" loading="lazy"></p><p>首先看一下redis.conf 配置文件中的各个参数，详解如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># redis进程是否以守护进程的方式运行，yes为是，no为否(不以守护进程的方式运行会占用一个终端)。</span>
daemonize no
<span class="token comment"># 指定redis进程的PID文件存放位置</span>
pidfile /var/run/redis.pid
<span class="token comment"># redis进程的端口号</span>
port <span class="token number">6379</span>
<span class="token comment">#是否开启保护模式，默认开启。要是配置里没有指定bind和密码。开启该参数后，redis只会本地进行访问，拒绝外部访问。要是开启了密码和bind，可以开启。否则最好关闭设置为no。</span>
protected-mode <span class="token function">yes</span>
<span class="token comment"># 绑定的主机地址</span>
<span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1
<span class="token comment"># 客户端闲置多长时间后关闭连接，默认此参数为0即关闭此功能</span>
<span class="token function">timeout</span> <span class="token number">300</span>
<span class="token comment"># redis日志级别，可用的级别有debug.verbose.notice.warning</span>
loglevel verbose
<span class="token comment"># log文件输出位置，如果进程以守护进程的方式运行，此处又将输出文件设置为stdout的话，就会将日志信息输出到/dev/null里面去了</span>
logfile stdout
<span class="token comment"># 设置数据库的数量，默认为0可以使用select &lt;dbid&gt;命令在连接上指定数据库id</span>
databases <span class="token number">16</span>
<span class="token comment"># 指定在多少时间内刷新次数达到多少的时候会将数据同步到数据文件</span>
save <span class="token operator">&lt;</span>seconds<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>changes<span class="token operator">&gt;</span>
<span class="token comment"># 指定存储至本地数据库时是否压缩文件，默认为yes即启用存储</span>
rdbcompression <span class="token function">yes</span>
<span class="token comment"># 指定本地数据库文件名</span>
dbfilename dump.db
<span class="token comment"># 指定本地数据问就按存放位置</span>
<span class="token function">dir</span> ./
<span class="token comment"># 指定当本机为slave服务时，设置master服务的IP地址及端口，在redis启动的时候他会自动跟master进行数据同步</span>
replicaof <span class="token operator">&lt;</span>masterip<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>masterport<span class="token operator">&gt;</span>
<span class="token comment"># 当master设置了密码保护时，slave服务连接master的密码</span>
masterauth <span class="token operator">&lt;</span>master-password<span class="token operator">&gt;</span>
<span class="token comment"># 设置redis连接密码，如果配置了连接密码，客户端在连接redis是需要通过AUTH&lt;password&gt;命令提供密码，默认关闭</span>
requirepass footbared
<span class="token comment"># 设置同一时间最大客户连接数，默认无限制。redis可以同时连接的客户端数为redis程序可以打开的最大文件描述符，如果设置 maxclients 0，表示不作限制。当客户端连接数到达限制时，Redis会关闭新的连接并向客户端返回 max number of clients reached 错误信息</span>
maxclients <span class="token number">128</span>
<span class="token comment"># 指定Redis最大内存限制，Redis在启动时会把数据加载到内存中，达到最大内存后，Redis会先尝试清除已到期或即将到期的Key。当此方法处理后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Redis新的vm机制，会把Key存放内存，Value会存放在swap区</span>
maxmemory<span class="token operator">&lt;</span>bytes<span class="token operator">&gt;</span>
<span class="token comment"># 指定是否在每次更新操作后进行日志记录，Redis在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为redis本身同步数据文件是按上面save条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为no。</span>
appendonly no
<span class="token comment"># 指定跟新日志文件名默认为appendonly.aof</span>
appendfilename appendonly.aof
<span class="token comment"># 指定更新日志的条件，有三个可选参数 - no：表示等操作系统进行数据缓存同步到磁盘(快)，always：表示每次更新操作后手动调用fsync()将数据写到磁盘(慢，安全)， everysec：表示每秒同步一次(折衷，默认值)；</span>
appendfsync everysec

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-主机配置" tabindex="-1"><a class="header-anchor" href="#_2-1-主机配置" aria-hidden="true">#</a> 2.1 主机配置</h3><p>主机（192.168.231.130）需要改动的配置如下所示，修改完毕后先按 esc ，然后:wq命令保存退出。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bind：0.0.0.0
port：6379
protected-mode：no
daemonize：yes
logfile：./redis.log
requirepass：pwdtest@2019
masterauth：pwdtest@2019
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>bind：0.0.0.0 Redis 默认只允许本机访问，把 bind 修改为 0.0.0.0 表示允许所有远程访问。如果想指定限制访问，可设置对应的 ip。</li><li>port：6379 监听端口默认为6379，想改其他也行。</li><li>protected-mode：no 关闭保护模式，可以外部访问。</li><li>daemonize：yes 设置为后台启动。</li><li>logfile：./redis.log redis 日志文件，生成后在 bin 目录下可找到。</li><li>requirepass：pwdtest@2019 设置 redis 连接密码。</li><li>masterauth：pwdtest@2019 slave 服务连接 master 的密码。</li></ul><h3 id="_2-2-从机配置" tabindex="-1"><a class="header-anchor" href="#_2-2-从机配置" aria-hidden="true">#</a> 2.2 从机配置</h3><p>从机的配置和主机相似，相同的地方我就不再详解，不同的地方是需要使用replicaof指定主机（master）的IP地址和端口，需要注意的是老版本使用的是 slaveof，目前我使用的5.0.7版本要使用 replicaof ，如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bind：0.0.0.0
port：6379
protected-mode：no
daemonize：yes
logfile：./redis.log
requirepass：pwdtest@2019
masterauth：pwdtest@2019
replicaof 192.168.231.130 6379 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>replicaof 192.168.231.130 6379 指定当本机为 slave 服务时，设置 master 服务的IP地址及端口，在 redis 启动的时候会自动跟 master 进行数据同步，所以两台从机都这样配置即可。</li></ul><blockquote><p>注：由于我们搭建的集群需要自动容灾切换，主数据库可能会变成从数据库，<strong>所以三台机器上都需要同时设置 requirepass 和 masterauth 配置项。</strong></p></blockquote><h3 id="_2-3-数据同步" tabindex="-1"><a class="header-anchor" href="#_2-3-数据同步" aria-hidden="true">#</a> 2.3 数据同步</h3><p>上面我们主从节点的配置文件配置好后，重启 redis 服务，进入 bin 目录即可查看配置文件中指定的<code>redis.log</code>日志文件。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212350463.png" alt="image-20220621212350463" tabindex="0" loading="lazy"><figcaption>image-20220621212350463</figcaption></figure><p>下面我们需要设置一下防火墙，否则主从机之间无法同步数据，命令如下，这里根据自己设置的端口进行更改。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd --add-port<span class="token operator">=</span><span class="token number">6379</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public
<span class="token comment">#重启防火墙(修改配置后要重启防火墙)</span>
firewall-cmd <span class="token parameter variable">--reload</span>
至此主从结构搭建完毕，不出意外主从机已经可以数据同步，下面我们分别查看三台机器的信息，如下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>192.168.231.130 6379（主） <img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212439547.png" alt="image-20220621212439547" loading="lazy"></li></ul><p>​ 可以看到当前角色为主机（master），并且连接了另外两台从机（slave）。</p><ul><li><p>192.168.231.132 6380（从）</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212513465.png" alt="image-20220621212513465" tabindex="0" loading="lazy"><figcaption>image-20220621212513465</figcaption></figure></li></ul><p>​ 可以看到当前角色为从机（slave），并指明了主机地址<code>192.168.231.130</code>和端口<code>6379</code>。</p><ul><li><p>192.168.231.131 6381（从）</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212537735.png" alt="image-20220621212537735" tabindex="0" loading="lazy"><figcaption>image-20220621212537735</figcaption></figure></li></ul><p>​ 可以看到当前角色为从机（slave），并指明了主机地址<code>192.168.231.130</code>和端口<code>6379</code>。</p><h3 id="_2-4-主从验证" tabindex="-1"><a class="header-anchor" href="#_2-4-主从验证" aria-hidden="true">#</a> 2.4 主从验证</h3><p>接下来我们在主机（master）添加几条数据，看从机（slave）是否可以获取到，如果能获取，说明数据已经同步到了从机，主机添加数据，如下：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212612978.png" alt="image-20220621212612978" tabindex="0" loading="lazy"><figcaption>image-20220621212612978</figcaption></figure><p>两台从机已经获取到数据，证明主从搭建成功并可同步数据，如下所示：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212632984.png" alt="image-20220621212632984" tabindex="0" loading="lazy"><figcaption>image-20220621212632984</figcaption></figure><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621212641681.png" alt="image-20220621212641681" tabindex="0" loading="lazy"><figcaption>image-20220621212641681</figcaption></figure><h2 id="_3-redis-哨兵模式搭建" tabindex="-1"><a class="header-anchor" href="#_3-redis-哨兵模式搭建" aria-hidden="true">#</a> 3. Redis 哨兵模式搭建</h2><h3 id="_3-1-哨兵模式详解" tabindex="-1"><a class="header-anchor" href="#_3-1-哨兵模式详解" aria-hidden="true">#</a> 3.1 哨兵模式详解</h3><p>Redis Sentinel是Redis 的高可用性解决方案，由一个或多个Sentinel（哨兵）实例组成。它可以监视任意多个主服务器，以及这些主服务器属下的所有从服务器，并在被监视的主服务器进入下线状态时，自动将下线主服务器属下的某个从服务器升级为新的主服务器，它的主要功能如下：</p><ul><li>监控(Monitoring)：Sentinel会不断地检查你的主服务器和从服务器是否运作正常。</li><li>通知(Notification)：当被监控的某个 Redis 服务器出现问题时， Sentinel可以通过API向管理员或者其他应用程序发送通知。</li><li>故障迁移：当主服务器不能正常工作时，Sentinel会自动进行故障迁移，也就是主从切换。</li><li>统一的配置管理：连接者询问sentinel取得主从的地址。</li></ul><h4 id="_3-1-1-哨兵原理" tabindex="-1"><a class="header-anchor" href="#_3-1-1-哨兵原理" aria-hidden="true">#</a> 3.1.1 哨兵原理</h4><p>Sentinel 使用的算法核心是 Raft 算法，主要用途就是用于分布式系统，系统容错，以及Leader选举，每个Sentinel都需要定期的执行以下任务：</p><ul><li><p>每个 Sentinel 会自动发现其他 Sentinel 和从服务器，它以每秒钟一次的频率向它所知的主服务器、从服务器以及其他 Sentinel 实例发送一个 PING 命令。</p></li><li><p>如果一个实例（instance）距离最后一次有效回复 PING 命令的时间超过 down-after-milliseconds 选项所指定的值， 那么这个实例会被 Sentinel 标记为主观下线。 有效回复可以是： +PONG 、 -LOADING 或者 -MASTERDOWN 。</p></li><li><p>如果一个主服务器被标记为主观下线， 那么正在监视这个主服务器的所有Sentinel要以每秒一次的频率确认主服务器的确进入了主观下线状态。</p></li><li><p>如果一个主服务器被标记为主观下线， 并且有足够数量的Sentinel（至少要达到配置文件指定的数量）在指定的时间范围内同意这一判断， 那么这个主服务器被标记为客观下线。</p></li><li><p>在一般情况下， 每个Sentinel会以每 10 秒一次的频率向它已知的所有主服务器和从服务器发送 INFO 命令。 当一个主服务器被Sentinel标记为客观下线时，Sentinel向下线主服务器的所有从服务器发送 INFO 命令的频率会从 10 秒一次改为每秒一次。</p></li><li><p>当没有足够数量的Sentinel同意主服务器已经下线， 主服务器的客观下线状态就会被移除。 当主服务器重新向Sentinel的 PING 命令返回有效回复时， 主服务器的主管下线状态就会被移除。</p></li></ul><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621213351481.png" alt="image-20220621213351481" tabindex="0" loading="lazy"><figcaption>image-20220621213351481</figcaption></figure><h4 id="_3-1-2-配置文件详解" tabindex="-1"><a class="header-anchor" href="#_3-1-2-配置文件详解" aria-hidden="true">#</a> 3.1.2 配置文件详解</h4><p>哨兵的配置主要就是修改<code>sentinel.conf</code>配置文件中的参数，在<code>Redis</code>安装目录即可看到此配置文件，各参数详解如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 哨兵sentinel实例运行的端口，默认26379  </span>
port <span class="token number">26379</span>
<span class="token comment"># 哨兵sentinel的工作目录</span>
<span class="token function">dir</span> ./
<span class="token comment"># 是否开启保护模式，默认开启。</span>
protected-mode:no
<span class="token comment"># 是否设置为后台启动。</span>
daemonize:yes

<span class="token comment"># 哨兵sentinel的日志文件</span>
logfile:./sentinel.log

<span class="token comment"># 哨兵sentinel监控的redis主节点的 </span>
<span class="token comment">## ip：主机ip地址</span>
<span class="token comment">## port：哨兵端口号</span>
<span class="token comment">## master-name：可以自己命名的主节点名字（只能由字母A-z、数字0-9 、这三个字符&quot;.-_&quot;组成。）</span>
<span class="token comment">## quorum：当这些quorum个数sentinel哨兵认为master主节点失联 那么这时 客观上认为主节点失联了  </span>
<span class="token comment"># sentinel monitor &lt;master-name&gt; &lt;ip&gt; &lt;redis-port&gt; &lt;quorum&gt;  </span>
sentinel monitor mymaster <span class="token number">127.0</span>.0.1 <span class="token number">6379</span> <span class="token number">2</span>

<span class="token comment"># 当在Redis实例中开启了requirepass，所有连接Redis实例的客户端都要提供密码。</span>
<span class="token comment"># sentinel auth-pass &lt;master-name&gt; &lt;password&gt;  </span>
sentinel auth-pass mymaster <span class="token number">123456</span>  

<span class="token comment"># 指定主节点应答哨兵sentinel的最大时间间隔，超过这个时间，哨兵主观上认为主节点下线，默认30秒  </span>
<span class="token comment"># sentinel down-after-milliseconds &lt;master-name&gt; &lt;milliseconds&gt;</span>
sentinel down-after-milliseconds mymaster <span class="token number">30000</span>  

<span class="token comment"># 指定了在发生failover主备切换时，最多可以有多少个slave同时对新的master进行同步。这个数字越小，完成failover所需的时间就越长；反之，但是如果这个数字越大，就意味着越多的slave因为replication而不可用。可以通过将这个值设为1，来保证每次只有一个slave，处于不能处理命令请求的状态。</span>
<span class="token comment"># sentinel parallel-syncs &lt;master-name&gt; &lt;numslaves&gt;</span>
sentinel parallel-syncs mymaster <span class="token number">1</span>  

<span class="token comment"># 故障转移的超时时间failover-timeout，默认三分钟，可以用在以下这些方面：</span>
<span class="token comment">## 1. 同一个sentinel对同一个master两次failover之间的间隔时间。  </span>
<span class="token comment">## 2. 当一个slave从一个错误的master那里同步数据时开始，直到slave被纠正为从正确的master那里同步数据时结束。  </span>
<span class="token comment">## 3. 当想要取消一个正在进行的failover时所需要的时间。</span>
<span class="token comment">## 4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来同步数据了</span>
<span class="token comment"># sentinel failover-timeout &lt;master-name&gt; &lt;milliseconds&gt;  </span>
sentinel failover-timeout mymaster <span class="token number">180000</span>

<span class="token comment"># 当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），将会去调用这个脚本。一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。</span>
<span class="token comment"># 对于脚本的运行结果有以下规则：  </span>
<span class="token comment">## 1. 若脚本执行后返回1，那么该脚本稍后将会被再次执行，重复次数目前默认为10。</span>
<span class="token comment">## 2. 若脚本执行后返回2，或者比2更高的一个返回值，脚本将不会重复执行。  </span>
<span class="token comment">## 3. 如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为1时的行为相同。</span>
<span class="token comment"># sentinel notification-script &lt;master-name&gt; &lt;script-path&gt;  </span>
sentinel notification-script mymaster /var/redis/notify.sh

<span class="token comment"># 这个脚本应该是通用的，能被多次调用，不是针对性的。</span>
<span class="token comment"># sentinel client-reconfig-script &lt;master-name&gt; &lt;script-path&gt;</span>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-哨兵搭建" tabindex="-1"><a class="header-anchor" href="#_3-2-哨兵搭建" aria-hidden="true">#</a> 3.2 哨兵搭建</h3><p>这里我们部署三个哨兵，每台服务器一个哨兵，配置方式相同，如下</p><ol><li>同样为了方便管理，首先将sentinel.conf复制到 etc 下</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/redis-5.0.7/
<span class="token function">cp</span> sentinel.conf /data/redis-5.0.7/etc/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>编辑 sentinel.conf</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> etc/
<span class="token function">vi</span> sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件修改如下，修改完毕后先按 esc ，然后<code>:wq</code>命令保存退出。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//端口默认为26379。
port:26379
//关闭保护模式，可以外部访问。
protected-mode:no
//设置为后台启动。
daemonize:yes
//日志文件。
logfile:./sentinel.log
//指定主机IP地址和端口，并且指定当有2台哨兵认为主机挂了，则对主机进行容灾切换。
sentinel monitor mymaster 192.168.231.130 6379 2
//当在Redis实例中开启了requirepass，这里就需要提供密码。
sentinel auth-pass mymaster pwdtest@2019
//这里设置了主机多少秒无响应，则认为挂了。
sentinel down-after-milliseconds mymaster 3000
//主备切换时，最多有多少个slave同时对新的master进行同步，这里设置为默认的1。
sentinel parallel-syncs mymaster 1
//故障转移的超时时间，这里设置为三分钟。
sentinel failover-timeout mymaster 180000

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="_3-3-防火墙设置" tabindex="-1"><a class="header-anchor" href="#_3-3-防火墙设置" aria-hidden="true">#</a> 3.3 防火墙设置</h3><p>命令如下，这里根据自己设置的端口进行更改。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd --add-port<span class="token operator">=</span><span class="token number">26379</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public
<span class="token comment">#重启防火墙(修改配置后要重启防火墙)</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-启动三个哨兵" tabindex="-1"><a class="header-anchor" href="#_3-4-启动三个哨兵" aria-hidden="true">#</a> 3.4 启动三个哨兵：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/redis-5.0.7/bin
redis-sentinel /data/redis-5.0.7/etc/sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>三个哨兵都启动后，可使用如下命令查看哨兵信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli -p 26379
info sentinel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621213740346.png" alt="image-20220621213740346" tabindex="0" loading="lazy"><figcaption>image-20220621213740346</figcaption></figure><p>可以看到，哨兵已经监听到当前的主机IP端口和运行状态，并且有2台从机，3个哨兵。</p><h3 id="_3-5-容灾切换" tabindex="-1"><a class="header-anchor" href="#_3-5-容灾切换" aria-hidden="true">#</a> 3.5 容灾切换</h3><p>现在我们模拟主机宕机，将主机 redis 服务关闭，如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621213821563.png" alt="image-20220621213821563" tabindex="0" loading="lazy"><figcaption>image-20220621213821563</figcaption></figure><p>现在我们去看三台服务器的情况，发现刚才的主机（192.168.231.130 <em>6379</em>）已经变成了从机，并且哨兵（Sentinel）通过选举机制选举了从机（192.168.231.131 <em>6381</em>）作为了新的主机，如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621213845259.png" alt="image-20220621213845259" tabindex="0" loading="lazy"><figcaption>image-20220621213845259</figcaption></figure><p>进入192.168.231.131 <em>6381</em> 可以看到它已经由从机（slave）变为了主机（master），并且成功连接从机</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621213903638.png" alt="image-20220621213903638" tabindex="0" loading="lazy"><figcaption>image-20220621213903638</figcaption></figure><p>需要注意的是，主从切换后配置文件已经被自动进行了更改，我们现在看一下新上位的主机 redis 日志，如下</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220621213928169.png" alt="image-20220621213928169" tabindex="0" loading="lazy"><figcaption>image-20220621213928169</figcaption></figure><p>可以看到，当主机挂了的时候，一直连接主机被拒绝，当哨兵选举它为主机后，它成功执行重写的配置文件，并且连接了其他从机。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,74),m={href:"https://blog.csdn.net/xch_yang/article/details/104019552",target:"_blank",rel:"noopener noreferrer"};function p(v,u){const n=r("ExternalLinkIcon");return a(),i("div",null,[o,e("p",null,[e("a",m,[l("Linux下 Redis集群搭建详解（主从+哨兵）"),t(n)])])])}const g=s(c,[["render",p],["__file","redis-x-sentinel-install.html.vue"]]);export{g as default};
