import{_ as s,W as r,X as a,Y as i,Z as e,$ as o,a0 as t,D as u}from"./framework-0cf5f349.js";const d={},l=t(`<h1 id="kafka-在zookeeper中的存储" tabindex="-1"><a class="header-anchor" href="#kafka-在zookeeper中的存储" aria-hidden="true">#</a> Kafka -在zookeeper中的存储</h1><h2 id="_1-kafka在zookeeper中存储结构图" tabindex="-1"><a class="header-anchor" href="#_1-kafka在zookeeper中存储结构图" aria-hidden="true">#</a> 1. Kafka在zookeeper中存储结构图</h2><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312223910988.png" alt="image-20230312223910988" tabindex="0" loading="lazy"><figcaption>image-20230312223910988</figcaption></figure><h2 id="_2-分析" tabindex="-1"><a class="header-anchor" href="#_2-分析" aria-hidden="true">#</a> 2. 分析</h2><h3 id="_2-1-topic注册信息" tabindex="-1"><a class="header-anchor" href="#_2-1-topic注册信息" aria-hidden="true">#</a> 2.1　topic注册信息</h3><p>/brokers/topics/[topic] :</p><p>存储某个topic的partitions所有分配信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 1] get /brokers/topics/topic2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312224044255.png" alt="image-20230312224044255" tabindex="0" loading="lazy"><figcaption>image-20230312224044255</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schema:
{
    &quot;version&quot;: &quot;版本编号目前固定为数字1&quot;,
    &quot;partitions&quot;: {
        &quot;partitionId编号&quot;: [
            同步副本组brokerId列表
        ],
        &quot;partitionId编号&quot;: [
            同步副本组brokerId列表
        ],
        .......
    }
}
Example:
{
&quot;version&quot;: 1,
&quot;partitions&quot;: {
&quot;2&quot;: [1, 2, 3],
&quot;1&quot;: [0, 1, 2],
&quot;0&quot;: [3, 0, 1],
}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-partition状态信息" tabindex="-1"><a class="header-anchor" href="#_2-2-partition状态信息" aria-hidden="true">#</a> 2.2　partition状态信息</h3><p>/brokers/topics/[topic]/partitions/[0...N] 其中[0..N]表示partition索引号</p><p>/brokers/topics/[topic]/partitions/[partitionId]/state</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312224149186.png" alt="image-20230312224149186" tabindex="0" loading="lazy"><figcaption>image-20230312224149186</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schema:
{
&quot;controller_epoch&quot;: 表示kafka集群中的中央控制器选举次数,
&quot;leader&quot;: 表示该partition选举leader的brokerId,
&quot;version&quot;: 版本编号默认为1,
&quot;leader_epoch&quot;: 该partition leader选举次数,
&quot;isr&quot;: [同步副本组brokerId列表]
}
 
Example:
{
&quot;controller_epoch&quot;: 1,
&quot;leader&quot;: 3,
&quot;version&quot;: 1,
&quot;leader_epoch&quot;: 0,
&quot;isr&quot;: [3, 0, 1]
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-broker注册信息" tabindex="-1"><a class="header-anchor" href="#_2-3-broker注册信息" aria-hidden="true">#</a> 2.3　Broker注册信息</h3><p>/brokers/ids/[0...N]</p><p>每个broker的配置文件中都需要指定一个数字类型的id(全局不可重复),此节点为临时znode(EPHEMERAL)</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312224411423.png" alt="image-20230312224411423" tabindex="0" loading="lazy"><figcaption>image-20230312224411423</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schema:
{
&quot;jmx_port&quot;: jmx端口号,
&quot;timestamp&quot;: kafka broker初始启动时的时间戳,
&quot;host&quot;: 主机名或ip地址,
&quot;version&quot;: 版本编号默认为1,
&quot;port&quot;: kafka broker的服务端端口号,由server.properties中参数port确定
}
 
Example:
{
&quot;jmx_port&quot;: -1,
&quot;timestamp&quot;:&quot;1525741823119&quot;
&quot;version&quot;: 1,
&quot;host&quot;: &quot;hadoop1&quot;,
&quot;port&quot;: 9092
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-controller-epoch" tabindex="-1"><a class="header-anchor" href="#_2-4-controller-epoch" aria-hidden="true">#</a> 2.4　Controller epoch</h3><p>/controller_epoch --&gt; int (epoch)</p><p>此值为一个数字,kafka集群中第一个broker第一次启动时为1，以后只要集群中center controller中央控制器所在broker变更或挂掉，就会重新选举新的center controller，每次center controller变更controller_epoch值就会 + 1;</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312224527197.png" alt="image-20230312224527197" tabindex="0" loading="lazy"><figcaption>image-20230312224527197</figcaption></figure><h3 id="_2-5-controller注册信息" tabindex="-1"><a class="header-anchor" href="#_2-5-controller注册信息" aria-hidden="true">#</a> 2.5　Controller注册信息</h3><p>/controller -&gt; int (broker id of the controller) 存储center controller中央控制器所在kafka broker的信息</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312224556482.png" alt="image-20230312224556482" tabindex="0" loading="lazy"><figcaption>image-20230312224556482</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schema:
{
&quot;version&quot;: 版本编号默认为1,
&quot;brokerid&quot;: kafka集群中broker唯一编号,
&quot;timestamp&quot;: kafka broker中央控制器变更时的时间戳
}
 
Example:
{
&quot;version&quot;: 1,
&quot;brokerid&quot;: 0,
&quot;timestamp&quot;: &quot;1525741822769&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-补充consumer-and-consumer-group" tabindex="-1"><a class="header-anchor" href="#_2-6-补充consumer-and-consumer-group" aria-hidden="true">#</a> 2.6　补充Consumer and Consumer group</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312224913355.png" alt="image-20230312224913355" tabindex="0" loading="lazy"><figcaption>image-20230312224913355</figcaption></figure><p><strong>a.每个consumer客户端被创建时,会向zookeeper注册自己的信息;</strong><strong>b.此作用主要是为了&quot;负载均衡&quot;.</strong><strong>c.同一个Consumer Group中的Consumers，Kafka将相应Topic中的每个消息只发送给其中一个Consumer。</strong><strong>d.Consumer Group中的每个Consumer读取Topic的一个或多个Partitions，并且是唯一的Consumer；</strong><strong>e.一个Consumer group的多个consumer的所有线程依次有序地消费一个topic的所有partitions,如果Consumer group中所有consumer总线程大于partitions数量，则会出现空闲情况;</strong></p><blockquote><p><strong>举例说明：</strong></p><p>kafka集群中创建一个topic为report-log 4 partitions 索引编号为0,1,2,3</p><p><strong>假如有目前有三个消费者node：注意--&gt;一个consumer中一个消费线程可以消费一个或多个partition.</strong></p><p><strong>如果每个consumer创建一个consumer thread线程,各个node消费情况如下，node1消费索引编号为0,1分区，node2费索引编号为2,node3费索引编号为3</strong></p><p><strong>如果每个consumer创建2个consumer thread线程，各个node消费情况如下(是从consumer node先后启动状态来确定的)，node1消费索引编号为0,1分区；node2费索引编号为2,3；node3为空闲状态</strong></p></blockquote><p><strong>总结：</strong><strong>从以上可知，Consumer Group中各个consumer是根据先后启动的顺序有序消费一个topic的所有partitions的。</strong></p><p><strong>如果Consumer Group中所有consumer的总线程数大于partitions数量，则可能consumer thread或consumer会出现空闲状态</strong>。</p><h3 id="_2-7-consumer均衡算法" tabindex="-1"><a class="header-anchor" href="#_2-7-consumer均衡算法" aria-hidden="true">#</a> 2.7　Consumer均衡算法</h3>`,35),c=i("strong",null,"当一个group中,有consumer加入或者离开时,会触发partitions均衡.均衡的最终目的,是提升topic的并发消费能力.",-1),v=i("strong",null,"1) 假如topic1,具有如下partitions: P0,P1,P2,P3",-1),m=i("strong",null,"2) 加入group中,有如下consumer: C0,C1",-1),p=i("strong",null,"3) 首先根据partition索引号对partitions排序: P0,P1,P2,P3",-1),b={href:"http://consumer.id",target:"_blank",rel:"noopener noreferrer"},q=i("strong",null,"5) 计算倍数: M = [P0,P1,P2,P3].size / [C0,C1].size,本例值M=2(向上取整)",-1),g=i("strong",null,"6) 然后依次分配partitions: C0 = [P0,P1],C1=[P2,P3],即Ci = [P(i * M),P((i + 1) * M -1)]",-1),h=t(`<h3 id="_2-8-consumer注册信息" tabindex="-1"><a class="header-anchor" href="#_2-8-consumer注册信息" aria-hidden="true">#</a> 2.8　Consumer注册信息</h3><p>每个consumer都有一个唯一的ID(consumerId可以通过配置文件指定,也可以由系统生成),此id用来标记消费者信息.</p><p>/consumers/[groupId]/ids/[consumerIdString]</p><p>是一个临时的znode,此节点的值为请看consumerIdString产生规则,即表示此consumer目前所消费的topic + partitions列表.</p><p>consumerId产生规则：</p><blockquote><p>StringconsumerUuid = null; if(config.consumerId!=null &amp;&amp; config.consumerId) consumerUuid = consumerId; else { String uuid = UUID.randomUUID() consumerUuid = &quot;%s-%d-%s&quot;.format( InetAddress.getLocalHost.getHostName, System.currentTimeMillis, uuid.getMostSignificantBits().toHexString.substring(0,8));</p><p>} String consumerIdString = config.groupId + &quot;_&quot; + consumerUuid;</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[zk: localhost:2181(CONNECTED) 11] get /consumers/console-consumer-2304/ids/console-consumer-2304_hadoop2-1525747915241-6b48ff32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312225549960.png" alt="image-20230312225549960" tabindex="0" loading="lazy"><figcaption>image-20230312225549960</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schema:
{
&quot;version&quot;: 版本编号默认为1,
&quot;subscription&quot;: { //订阅topic列表
&quot;topic名称&quot;: consumer中topic消费者线程数
},
&quot;pattern&quot;: &quot;static&quot;,
&quot;timestamp&quot;: &quot;consumer启动时的时间戳&quot;
}
 
Example:
{
&quot;version&quot;: 1,
&quot;subscription&quot;: {
&quot;topic2&quot;: 1
},
&quot;pattern&quot;: &quot;white_list&quot;,
&quot;timestamp&quot;: &quot;1525747915336&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-consumer-owner" tabindex="-1"><a class="header-anchor" href="#_2-9-consumer-owner" aria-hidden="true">#</a> 2.9　Consumer owner</h3><p>/consumers/[groupId]/owners/[topic]/[partitionId] -&gt; consumerIdString + threadId索引编号</p><p>a) 首先进行&quot;Consumer Id注册&quot;;</p><p>b) 然后在&quot;Consumer id 注册&quot;节点下注册一个watch用来监听当前group中其他consumer的&quot;退出&quot;和&quot;加入&quot;;只要此znode path下节点列表变更,都会触发此group下consumer的负载均衡.(比如一个consumer失效,那么其他consumer接管partitions).</p><p>c) 在&quot;Broker id 注册&quot;节点下,注册一个watch用来监听broker的存活情况;如果broker列表变更,将会触发所有的groups下的consumer重新balance.</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312225634923.png" alt="image-20230312225634923" tabindex="0" loading="lazy"><figcaption>image-20230312225634923</figcaption></figure><h3 id="_2-10-consumer-offset" tabindex="-1"><a class="header-anchor" href="#_2-10-consumer-offset" aria-hidden="true">#</a> 2.10　Consumer offset</h3><p>/consumers/[groupId]/offsets/[topic]/[partitionId] -&gt; long (offset)</p><p>用来跟踪每个consumer目前所消费的partition中最大的offset</p><p>此znode为持久节点,可以看出offset跟group_id有关,以表明当消费者组(consumer group)中一个消费者失效,</p><p>重新触发balance,其他consumer可以继续消费.</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312225709565.png" alt="image-20230312225709565" tabindex="0" loading="lazy"><figcaption>image-20230312225709565</figcaption></figure><h3 id="_2-11-re-assign-partitions" tabindex="-1"><a class="header-anchor" href="#_2-11-re-assign-partitions" aria-hidden="true">#</a> 2.11　Re-assign partitions</h3><p>/admin/reassign_partitions</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
   &quot;fields&quot;:[
      {
         &quot;name&quot;:&quot;version&quot;,
         &quot;type&quot;:&quot;int&quot;,
         &quot;doc&quot;:&quot;version id&quot;
      },
      {
         &quot;name&quot;:&quot;partitions&quot;,
         &quot;type&quot;:{
            &quot;type&quot;:&quot;array&quot;,
            &quot;items&quot;:{
               &quot;fields&quot;:[
                  {
                     &quot;name&quot;:&quot;topic&quot;,
                     &quot;type&quot;:&quot;string&quot;,
                     &quot;doc&quot;:&quot;topic of the partition to be reassigned&quot;
                  },
                  {
                     &quot;name&quot;:&quot;partition&quot;,
                     &quot;type&quot;:&quot;int&quot;,
                     &quot;doc&quot;:&quot;the partition to be reassigned&quot;
                  },
                  {
                     &quot;name&quot;:&quot;replicas&quot;,
                     &quot;type&quot;:&quot;array&quot;,
                     &quot;items&quot;:&quot;int&quot;,
                     &quot;doc&quot;:&quot;a list of replica ids&quot;
                  }
               ],
            }
            &quot;doc&quot;:&quot;an array of partitions to be reassigned to new replicas&quot;
         }
      }
   ]
}
 
Example:
{
  &quot;version&quot;: 1,
  &quot;partitions&quot;:
     [
        {
            &quot;topic&quot;: &quot;Foo&quot;,
            &quot;partition&quot;: 1,
            &quot;replicas&quot;: [0, 1, 3]
        }
     ]            
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-12-preferred-replication-election" tabindex="-1"><a class="header-anchor" href="#_2-12-preferred-replication-election" aria-hidden="true">#</a> 2.12　Preferred replication election</h3><p>/admin/preferred_replica_election</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
   &quot;fields&quot;:[
      {
         &quot;name&quot;:&quot;version&quot;,
         &quot;type&quot;:&quot;int&quot;,
         &quot;doc&quot;:&quot;version id&quot;
      },
      {
         &quot;name&quot;:&quot;partitions&quot;,
         &quot;type&quot;:{
            &quot;type&quot;:&quot;array&quot;,
            &quot;items&quot;:{
               &quot;fields&quot;:[
                  {
                     &quot;name&quot;:&quot;topic&quot;,
                     &quot;type&quot;:&quot;string&quot;,
                     &quot;doc&quot;:&quot;topic of the partition for which preferred replica election should be triggered&quot;
                  },
                  {
                     &quot;name&quot;:&quot;partition&quot;,
                     &quot;type&quot;:&quot;int&quot;,
                     &quot;doc&quot;:&quot;the partition for which preferred replica election should be triggered&quot;
                  }
               ],
            }
            &quot;doc&quot;:&quot;an array of partitions for which preferred replica election should be triggered&quot;
         }
      }
   ]
}
 
例子:
 
{
  &quot;version&quot;: 1,
  &quot;partitions&quot;:
     [
        {
            &quot;topic&quot;: &quot;Foo&quot;,
            &quot;partition&quot;: 1         
        },
        {
            &quot;topic&quot;: &quot;Bar&quot;,
            &quot;partition&quot;: 0         
        }
     ]            
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-13-删除topics" tabindex="-1"><a class="header-anchor" href="#_2-13-删除topics" aria-hidden="true">#</a> 2.13　删除topics</h3><p>/admin/delete_topics</p><figure><img src="https://images2018.cnblogs.com/blog/1228818/201805/1228818-20180508110442336-511702454.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schema:
{ &quot;fields&quot;:
    [ {&quot;name&quot;: &quot;version&quot;, &quot;type&quot;: &quot;int&quot;, &quot;doc&quot;: &quot;version id&quot;},
      {&quot;name&quot;: &quot;topics&quot;,
       &quot;type&quot;: { &quot;type&quot;: &quot;array&quot;, &quot;items&quot;: &quot;string&quot;, &quot;doc&quot;: &quot;an array of topics to be deleted&quot;}
      } ]
}
 
例子:
{
  &quot;version&quot;: 1,
  &quot;topics&quot;: [&quot;foo&quot;, &quot;bar&quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-14-topic配置" tabindex="-1"><a class="header-anchor" href="#_2-14-topic配置" aria-hidden="true">#</a> 2.14　Topic配置</h3><p>/config/topics/[topic_name]</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20230312225844299.png" alt="image-20230312225844299" tabindex="0" loading="lazy"><figcaption>image-20230312225844299</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,35),f={href:"https://www.cnblogs.com/qingyunzong/p/9007107.html",target:"_blank",rel:"noopener noreferrer"};function x(_,k){const n=u("ExternalLinkIcon");return r(),a("div",null,[l,i("p",null,[c,v,m,p,i("strong",null,[e("4) 根据("),i("a",b,[e("consumer.id"),o(n)]),e(" + '-'+ thread序号)排序: C0,C1")]),q,g]),h,i("p",null,[i("a",f,[e("Kafka学习之路 （五）Kafka在zookeeper中的存储"),o(n)])])])}const y=s(d,[["render",x],["__file","kafka-x-zookeeper-store.html.vue"]]);export{y as default};
