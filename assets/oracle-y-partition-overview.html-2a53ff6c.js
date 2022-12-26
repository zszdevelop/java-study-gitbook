import{_ as l,W as i,X as p,Y as n,Z as a,$ as e,a0 as t,D as o}from"./framework-0cf5f349.js";const c={},r=t(`<h1 id="oracle分区表概念篇-partition" tabindex="-1"><a class="header-anchor" href="#oracle分区表概念篇-partition" aria-hidden="true">#</a> oracle分区表概念篇(partition)</h1><h2 id="_1-表空间及分区表的概念" tabindex="-1"><a class="header-anchor" href="#_1-表空间及分区表的概念" aria-hidden="true">#</a> 1.表空间及分区表的概念</h2><ul><li><p><strong>表空间：</strong></p><p>是一个或多个数据文件的集合，所有的数据对象都存放在指定的表空间中，但主要存放的是表，所以称作表空间。</p></li><li><p><strong>分区表：</strong></p><p>当表中的数据量不断增大，查询数据的速度就会变慢，应用程序的性能就会下降，这时就应该考虑对表进行分区。表进行分区后，<strong>逻辑上表仍然是一张完整的表</strong>，只是将表中的数据在物理上<strong>存放到多个表空间</strong>（物理文件上），这样查询数据时，<strong>不至于每次都扫描整张表</strong>。</p></li></ul><h2 id="_2-表分区的具体作用" tabindex="-1"><a class="header-anchor" href="#_2-表分区的具体作用" aria-hidden="true">#</a> 2. 表分区的具体作用</h2><p>oracle的表分区功能通过改善可管理性、性能和可用性，从而为各式应用程序带来了极大的好处。通常，<strong>分区可以使某些查询以及维护操作的性能大大提高</strong>。此外，分区还可以极大简化常见的管理任务，分区是构建千兆字节数据系统或超高可用性系统的关键工具。</p><p><strong>分区功能能够将表、索引或索引组织表进一步细分为段，这些数据库对象的段叫做分区</strong>。每个分区有自己的名称，还可以选择自己的存储特性。从数据库 管理员的角度来看，一个分区后的对象具有多个段，这些段既可进行集体管理，也可单独管理，这就使数据库管理员在管理分区后的对象时有相当大的灵活性。但 是，从应用程序的角度来看，分区后的表与非分区表完全相同，使用 SQL DML 命令访问分区后的表时，无需任何修改。</p><h2 id="_3-什么时候使用分区" tabindex="-1"><a class="header-anchor" href="#_3-什么时候使用分区" aria-hidden="true">#</a> 3. 什么时候使用分区</h2><p>官方给的建议是：</p><p>a. 表的大小超过2GB。</p><p>b. 表中包含历史数据，新的数据被增加到新的分区中。</p><h2 id="_4-表分区的优缺点" tabindex="-1"><a class="header-anchor" href="#_4-表分区的优缺点" aria-hidden="true">#</a> 4. 表分区的优缺点</h2><p><strong>优点：</strong></p><ol><li><p>改善查询性能：对分区对象的查询可以仅搜索自己关心的分区，提高检索速度。</p></li><li><p>增强可用性：如果表的某个分区出现故障，表在其他分区的数据仍然可用。</p></li><li><p>维护方便：如果表的某个分区出现故障，需要修复数据，只修复该分区即可。</p></li><li><p>均衡I/O：可以把不同的分区映射到磁盘以平衡I/O，改善整个系统性能。</p></li></ol><p><strong>缺点：</strong></p><p>分区表相关，已经存在的表没有方法可以直接转化为分区表。不过oracle提供了在线重定义表的功能。</p><h2 id="_5-表分区的几种类型及操作方法" tabindex="-1"><a class="header-anchor" href="#_5-表分区的几种类型及操作方法" aria-hidden="true">#</a> 5. 表分区的几种类型及操作方法</h2><h3 id="_5-1-范围分区-range-maxvalue" tabindex="-1"><a class="header-anchor" href="#_5-1-范围分区-range-maxvalue" aria-hidden="true">#</a> 5.1 范围分区(range) maxvalue</h3><p>范围分区将数据基于范围映射到每一个分区，<strong>这个范围是你在创建分区时指定的分区键决定的</strong>。这种分区方式是最为常用的，并且<strong>分区键经常采用日期</strong>。举个例子：你可能会将销售数据按照月份进行分区。</p><h4 id="_5-1-1-范围分区创建规则" tabindex="-1"><a class="header-anchor" href="#_5-1-1-范围分区创建规则" aria-hidden="true">#</a> 5.1.1 范围分区创建规则</h4><p>当使用范围分区时，请考虑以下几个规则：</p><ol><li><p>每一个分区都必须有一个VALUES LESS THEN子句，它指定了一个不包括在该分区中的上限值。分区键的任何值等于或者大于这个上限值的记录都会被加入到下一个高一些的分区中。</p></li><li><p>所有分区，除了第一个，都会有一个隐式的下限值，这个值就是此分区的前一个分区的上限值。</p></li><li><p>如果某些记录暂无法预测范围，可以创建maxvalue分区，所有不在指定范围内的记录都会被存储到maxvalue所在分区中。</p></li></ol><h4 id="_5-1-2-范例" tabindex="-1"><a class="header-anchor" href="#_5-1-2-范例" aria-hidden="true">#</a> 5.1.2 范例</h4><p>先创建多个测试表空间</p><p>创建表空间test_ts01</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts01 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_01.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建表空间test_ts02</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>   <span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts02 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_02.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建表空间test_ts03</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code> <span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts03 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_03.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_5-1-2-1-范例1-根据id区分" tabindex="-1"><a class="header-anchor" href="#_5-1-2-1-范例1-根据id区分" aria-hidden="true">#</a> 5.1.2.1 范例1 （根据id区分）</h5><blockquote><p>假设有一个test表，表中有数据200000行，我们将此表通过id进行分区，每个分区存储100000行，我们将每个分区保存到单独的表空间中，这样数据文件就可以跨越多个物理磁盘。下面是创建表和分区的代码，如下：</p></blockquote><p>创建test分区表</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> test

<span class="token punctuation">(</span>        id number <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         first_name varchar2<span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         last_name varchar2<span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         phone varchar2<span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         email varchar2<span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         <span class="token keyword">status</span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         <span class="token keyword">constraint</span> test_id <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>

<span class="token punctuation">)</span>

<span class="token keyword">partition</span> <span class="token keyword">by</span> range <span class="token punctuation">(</span>id<span class="token punctuation">)</span>

<span class="token punctuation">(</span>        <span class="token keyword">partition</span> test_part1 <span class="token keyword">values</span> less than <span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts01<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> test_part2 <span class="token keyword">values</span> less than <span class="token punctuation">(</span><span class="token number">200000</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts02<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> test_part3 <span class="token keyword">values</span> less than <span class="token punctuation">(</span>maxvalue<span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts03

<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_5-1-2-2-范例2-按时间划分" tabindex="-1"><a class="header-anchor" href="#_5-1-2-2-范例2-按时间划分" aria-hidden="true">#</a> 5.1.2.2 范例2（按时间划分）</h5><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> order_time

<span class="token punctuation">(</span>        order_id number<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         order_date <span class="token keyword">date</span><span class="token punctuation">,</span>

         total_amount number<span class="token punctuation">,</span>

         custotmer_id number<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         paid <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token punctuation">)</span>

<span class="token keyword">partition</span> <span class="token keyword">by</span> range<span class="token punctuation">(</span>order_date<span class="token punctuation">)</span>

<span class="token punctuation">(</span>        <span class="token keyword">partition</span> ora_time_part01 <span class="token keyword">values</span> less than <span class="token punctuation">(</span>to_date<span class="token punctuation">(</span><span class="token string">&#39;2016-06-01&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;yyyy-mm-dd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts01<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> ora_time_part02 <span class="token keyword">values</span> less than <span class="token punctuation">(</span>to_date<span class="token punctuation">(</span><span class="token string">&#39;2016-07-01&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;yyyy-mm-dd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts02<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> ora_time_part03 <span class="token keyword">values</span> less than <span class="token punctuation">(</span>to_date<span class="token punctuation">(</span><span class="token string">&#39;2016-08-01&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;yyyy-mm-dd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts03

<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_5-1-2-3-范例3-maxvalue" tabindex="-1"><a class="header-anchor" href="#_5-1-2-3-范例3-maxvalue" aria-hidden="true">#</a> 5.1.2.3 范例3 maxvalue</h5><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> rangetable

<span class="token punctuation">(</span>        rt_id number<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         grade <span class="token keyword">int</span><span class="token punctuation">,</span>

         <span class="token keyword">constraint</span> ranget_id <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>rt_id<span class="token punctuation">)</span>

<span class="token punctuation">)</span>

<span class="token keyword">partition</span> <span class="token keyword">by</span> range <span class="token punctuation">(</span>grade<span class="token punctuation">)</span>

<span class="token punctuation">(</span>        <span class="token keyword">partition</span> part1 <span class="token keyword">values</span> less than <span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts01<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> part2 <span class="token keyword">values</span> less than <span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts02<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> part3 <span class="token keyword">values</span> less than <span class="token punctuation">(</span>maxvalue<span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts03

<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-列表分区-list-default" tabindex="-1"><a class="header-anchor" href="#_5-2-列表分区-list-default" aria-hidden="true">#</a> 5.2 列表分区(list) default</h3><p>List分区也需要指定列的值，<strong>其分区值必须明确指定，该分区列只能有一个</strong>，不能像range或者hash分区那样同时指定多个列做为分区依赖列，但它的单个分区对应值可以是多个。</p><p>在分区时必须确定分区列可能存在的值，一旦插入的列值不在分区范围内，则插入/更新就会失败，因此通常建议使用list分区时，<strong>要创建一个default分区存储那些不在指定范围内的记录</strong>，类似range分区中的maxvalue分区。</p><p>在根据某字段，如城市代码分区时，可以指定default，把非分区规则的数据，全部放到这个default分区。该分区的特点是某列的值只有几个，基于这样的特点我们可以采用列表分区。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts04 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_04.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts05 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_05.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts06 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_06.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-1-列表分区范例" tabindex="-1"><a class="header-anchor" href="#_5-2-1-列表分区范例" aria-hidden="true">#</a> 5.2.1 列表分区范例</h4><h5 id="_5-2-1-1-范例1" tabindex="-1"><a class="header-anchor" href="#_5-2-1-1-范例1" aria-hidden="true">#</a> 5.2.1.1 范例1</h5><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> problem_tickets

<span class="token punctuation">(</span>        problem_id number<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         description varchar2<span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         customer_id number<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         date_entered <span class="token keyword">date</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>

         <span class="token keyword">status</span> varchar2<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         <span class="token keyword">constraint</span> problem_tic_id <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>problem_id<span class="token punctuation">)</span>

<span class="token punctuation">)</span>

<span class="token keyword">partition</span> <span class="token keyword">by</span> list <span class="token punctuation">(</span><span class="token keyword">status</span><span class="token punctuation">)</span>

<span class="token punctuation">(</span>        <span class="token keyword">partition</span> prob_active <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts04<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> prob_inactive <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;inactive&#39;</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts05<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> prob_other <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token keyword">default</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts06

<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_5-2-1-2-范例2" tabindex="-1"><a class="header-anchor" href="#_5-2-1-2-范例2" aria-hidden="true">#</a> 5.2.1.2 范例2</h5><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> ListTable

<span class="token punctuation">(</span>        id <span class="token keyword">int</span><span class="token punctuation">,</span>

         name varchar2<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         area varchar2<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

         <span class="token keyword">constraint</span> ListTable_id <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>

<span class="token punctuation">)</span>

<span class="token keyword">partition</span> <span class="token keyword">by</span> list <span class="token punctuation">(</span>area<span class="token punctuation">)</span>

<span class="token punctuation">(</span>        <span class="token keyword">partition</span> part1 <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;SH&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;BJ&#39;</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts04<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> part2 <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;SC&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;CQ&#39;</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts05<span class="token punctuation">,</span>

         <span class="token keyword">partition</span> part3 <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;SD&#39;</span><span class="token punctuation">)</span> <span class="token keyword">tablespace</span> test_ts06

<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-散列分区-hash" tabindex="-1"><a class="header-anchor" href="#_5-3-散列分区-hash" aria-hidden="true">#</a> 5.3 散列分区(hash)</h3><p><strong>对于那些无法有效划分范围的表，可以使用hash分区</strong>，这样对于提高性能还是会有一定的帮助。hash分区会将表中的数据平均分配到你指定的几个分区中，列所在分区是依据分区列的hash值自动分配，因此你并不能控制也不知道哪条记录会被放到哪个分区中，hash分区也可以支持多个依赖列。</p><h4 id="_5-3-1-范例" tabindex="-1"><a class="header-anchor" href="#_5-3-1-范例" aria-hidden="true">#</a> 5.3.1 范例：</h4><h5 id="_5-3-1-1-范例1" tabindex="-1"><a class="header-anchor" href="#_5-3-1-1-范例1" aria-hidden="true">#</a> 5.3.1.1 范例1</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create table hash_table

(        col number(8),

         inf varchar2(100)

)

partition by hash(col)

(        partition part01 tablespace test_ts04,

         partition part02 tablespace test_ts05,

         partition part03 tablespace test_ts06

);


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简写：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts07 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_07.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts08 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_08.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">tablespace</span> test_ts09 datafile <span class="token string">&#39;/home/oracle/app/oracle/product/11.2.0/dbhome_2/dbs/test_09.dbf&#39;</span> size <span class="token number">32</span>m extent management <span class="token keyword">local</span> autoallocate<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create table emp

(        empno number(4),

         ename varchar2(30),

         sal number

)

partition by hash (empno) partitions 4

store in (test_ts06,test_ts07,test_ts08,test_ts09);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-组合分区" tabindex="-1"><a class="header-anchor" href="#_5-4-组合分区" aria-hidden="true">#</a> 5.4 组合分区</h3><p>如果某表按照某列分区之后，仍然较大，或者是一些其它的需求，还可以通过分区内再建子分区的方式将分区再分区，即组合分区的方式。</p><p>在10g中组合分区主要有两种：range-hash，range-list。11g中又增加了range-range，list-range，list-list，list-hash，并且 11g里面还支持Interval分区和虚拟列分区。 注意顺序，根分区只能是range分区，子分区可以是hash分区或list分区。</p><h2 id="_6-分区表的维护操作" tabindex="-1"><a class="header-anchor" href="#_6-分区表的维护操作" aria-hidden="true">#</a> 6. 分区表的维护操作</h2>`,59),d={href:"http://blog.itpub.net/31401608/viewspace-2147665/",target:"_blank",rel:"noopener noreferrer"},u=t(`<ul><li><p>添加分区（add）</p></li><li><p>删除分区（drop）</p></li><li><p>截断分区（truncate）</p></li><li><p>合并分区（merge）</p></li><li><p>拆分分区（split）</p></li><li><p>重命名分区（rename）</p></li><li><p>移动分区（move）</p></li></ul><h2 id="_7-分区相关查询" tabindex="-1"><a class="header-anchor" href="#_7-分区相关查询" aria-hidden="true">#</a> 7. 分区相关查询</h2><h3 id="_7-1-查询表上有多少个分区" tabindex="-1"><a class="header-anchor" href="#_7-1-查询表上有多少个分区" aria-hidden="true">#</a> 7.1 查询表上有多少个分区</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from user_tab_partitions where table_name=&#39;TEST&#39;;
// select * from dba_tab_partitions where table_name=&#39;TEST&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201103231714916.png" alt="image-20201103231714916" tabindex="0" loading="lazy"><figcaption>image-20201103231714916</figcaption></figure><h3 id="_7-2-查询索引信息" tabindex="-1"><a class="header-anchor" href="#_7-2-查询索引信息" aria-hidden="true">#</a> 7.2 查询索引信息</h3><p>// TODO</p><h3 id="_7-3-查询所有分区表信息" tabindex="-1"><a class="header-anchor" href="#_7-3-查询所有分区表信息" aria-hidden="true">#</a> 7.3 查询所有分区表信息</h3><div class="language-SQL line-numbers-mode" data-ext="SQL"><pre class="language-SQL"><code>select * from dba_part_tables;

select * from all_part_tables;                   ---当前用户可访问的所有分区表信息

select * from user_part_tables;               ---当前用户的所有分区表信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-查询所有分区" tabindex="-1"><a class="header-anchor" href="#_7-4-查询所有分区" aria-hidden="true">#</a> 7.4 查询所有分区</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> all_tab_partitions<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-5-查询某一分区上的表" tabindex="-1"><a class="header-anchor" href="#_7-5-查询某一分区上的表" aria-hidden="true">#</a> 7.5 查询某一分区上的表</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> MyTable <span class="token keyword">partition</span><span class="token punctuation">(</span>SYS_P101<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,14),k={href:"http://blog.itpub.net/31401608/viewspace-2147665/",target:"_blank",rel:"noopener noreferrer"};function v(b,m){const s=o("ExternalLinkIcon");return i(),p("div",null,[r,n("p",null,[n("a",d,[a("参考文章"),e(s)])]),u,n("p",null,[n("a",k,[a("对oracle分区表的理解整理"),e(s)])])])}const _=l(c,[["render",v],["__file","oracle-y-partition-overview.html.vue"]]);export{_ as default};
