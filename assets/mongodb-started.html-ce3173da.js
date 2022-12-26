import{_ as d,W as t,X as n,Y as e,Z as l,$ as a,a0 as s,D as u}from"./framework-0cf5f349.js";const o={},r=s(`<h1 id="mongodb入门" tabindex="-1"><a class="header-anchor" href="#mongodb入门" aria-hidden="true">#</a> MongoDB入门</h1><h2 id="_1-连接mongodb" tabindex="-1"><a class="header-anchor" href="#_1-连接mongodb" aria-hidden="true">#</a> 1. 连接mongodb</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// mongo 远程主机ip或DNS:MongoDB端口号/数据库名 <span class="token parameter variable">-u</span> user <span class="token parameter variable">-p</span> password
mongo <span class="token number">192.168</span>.1.200:27017/test <span class="token parameter variable">-u</span> user <span class="token parameter variable">-p</span> password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>若在安装mongo的服务器上访问本地mongo,可直接执行 mongo</p><h2 id="_2-数据库操作" tabindex="-1"><a class="header-anchor" href="#_2-数据库操作" aria-hidden="true">#</a> 2. 数据库操作</h2><ul><li><p>创建数据库，使用<code>use</code>命令去创建数据库，当插入第一条数据时会创建数据库，例如创建一个<code>test</code>数据库；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; use test
switched to db test
&gt; db.article.insert({name:&quot;测试 MongoDB&quot;})
WriteResult({ &quot;nInserted&quot; : 1 })
&gt; show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除数据库，使用db对象中的<code>dropDatabase()</code>方法来删除；（只删除use 选择的，而非所有）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; db.dropDatabase()
{ &quot;dropped&quot; : &quot;test&quot;, &quot;ok&quot; : 1 }
&gt; show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_3-集合操作" tabindex="-1"><a class="header-anchor" href="#_3-集合操作" aria-hidden="true">#</a> 3. 集合操作</h2><ul><li><p>创建集合，使用db对象中的<code>createCollection()</code>方法来创建集合，例如创建一个<code>article</code>集合；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; use test
switched to db test
&gt; db.createCollection(&quot;myCollection&quot;)
{ &quot;ok&quot; : 1 }
&gt; show collections
article
myCollection
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除集合，使用collection对象的<code>drop()</code>方法来删除集合，例如删除一个<code>article</code>集合；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; db.myCollection.drop()
true
&gt; show collections
article
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_4-文档操作" tabindex="-1"><a class="header-anchor" href="#_4-文档操作" aria-hidden="true">#</a> 4. 文档操作</h2><h3 id="_4-1-插入文档" tabindex="-1"><a class="header-anchor" href="#_4-1-插入文档" aria-hidden="true">#</a> 4.1 插入文档</h3><ul><li>MongoDB通过collection对象的<code>insert()</code>方法向集合中插入文档，<strong>语法如下</strong>；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.insert(document)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>使用collection对象的<code>insert()</code>方法来插入文档，例如插入一个<code>article</code>文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.myCollection.insert({title: &#39;我是标题&#39;, 
    content: &#39;我是内容&#39;
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用collection对象的<code>find()</code>方法可以获取文档，例如获取所有的<code>article</code>文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.myCollection.find({})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-更新文档" tabindex="-1"><a class="header-anchor" href="#_4-2-更新文档" aria-hidden="true">#</a> 4.2 更新文档</h3><ul><li><p>MongoDB通过collection对象的<code>update()</code>来更新集合中的文档，语法如下；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.update(
   &lt;query&gt;,
   &lt;update&gt;,
   {
     multi: &lt;boolean&gt;
   }
)
# query：修改的查询条件，类似于SQL中的WHERE部分
# update：更新属性的操作符，类似与SQL中的SET部分
# multi：设置为true时会更新所有符合条件的文档，默认为false只更新找到的第一条

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>将title为<code>MongoDB 教程</code>的所有文档的title修改为<code>MongoDB</code>；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.update({&#39;title&#39;:&#39;我是标题&#39;},{$set:{&#39;title&#39;:&#39;标题修改&#39;}},{multi:true})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>除了<code>update()</code>方法以外，<code>save()</code>方法可以用来替换已有文档，语法如下；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.save(document)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>这次我们将ObjectId为<code>5e9943661379a112845e4056</code>的文档的title改为<code>MongoDB 教程</code>；</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.save({
    &quot;_id&quot; : ObjectId(&quot;5e9943661379a112845e4056&quot;),
    &quot;title&quot; : &quot;MongoDB 教程&quot;,
    &quot;description&quot; : &quot;MongoDB 是一个 Nosql 数据库&quot;,
    &quot;by&quot; : &quot;Andy&quot;,
    &quot;url&quot; : &quot;https://www.mongodb.com/&quot;,
    &quot;tags&quot; : [ 
        &quot;mongodb&quot;, 
        &quot;database&quot;, 
        &quot;NoSQL&quot;
    ],
    &quot;likes&quot; : 100.0
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-删除文档" tabindex="-1"><a class="header-anchor" href="#_4-3-删除文档" aria-hidden="true">#</a> 4.3 删除文档</h3><ul><li>MongoDB通过collection对象的<code>remove()</code>方法来删除集合中的文档，语法如下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.remove(
   &lt;query&gt;,
   {
     justOne: &lt;boolean&gt;
   }
)
# query：删除的查询条件，类似于SQL中的WHERE部分
# justOne：设置为true只删除一条记录，默认为false删除所有记录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>删除title为<code>MongoDB 教程</code>的所有文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.remove({&#39;title&#39;:&#39;MongoDB 教程&#39;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-4-查询文档" tabindex="-1"><a class="header-anchor" href="#_4-4-查询文档" aria-hidden="true">#</a> 4.4 查询文档</h3><ul><li>MongoDB通过collection对象的<code>find()</code>方法来查询文档，语法如下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.find(query, projection)
# query：查询条件，类似于SQL中的WHERE部分
# projection：可选，使用投影操作符指定返回的键

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查询<code>article</code>集合中的所有文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find()

/* 1 */
{
    &quot;_id&quot; : ObjectId(&quot;5e994dcb1379a112845e4057&quot;),
    &quot;title&quot; : &quot;MongoDB 教程&quot;,
    &quot;description&quot; : &quot;MongoDB 是一个 Nosql 数据库&quot;,
    &quot;by&quot; : &quot;Andy&quot;,
    &quot;url&quot; : &quot;https://www.mongodb.com/&quot;,
    &quot;tags&quot; : [ 
        &quot;mongodb&quot;, 
        &quot;database&quot;, 
        &quot;NoSQL&quot;
    ],
    &quot;likes&quot; : 50.0
}

/* 2 */
{
    &quot;_id&quot; : ObjectId(&quot;5e994df51379a112845e4058&quot;),
    &quot;title&quot; : &quot;Elasticsearch 教程&quot;,
    &quot;description&quot; : &quot;Elasticsearch 是一个搜索引擎&quot;,
    &quot;by&quot; : &quot;Ruby&quot;,
    &quot;url&quot; : &quot;https://www.elastic.co/cn/&quot;,
    &quot;tags&quot; : [ 
        &quot;elasticearch&quot;, 
        &quot;database&quot;, 
        &quot;NoSQL&quot;
    ],
    &quot;likes&quot; : 100.0
}
/* 3 */
{
    &quot;_id&quot; : ObjectId(&quot;5e994e111379a112845e4059&quot;),
    &quot;title&quot; : &quot;Redis 教程&quot;,
    &quot;description&quot; : &quot;Redis 是一个key-value数据库&quot;,
    &quot;by&quot; : &quot;Andy&quot;,
    &quot;url&quot; : &quot;https://redis.io/&quot;,
    &quot;tags&quot; : [ 
        &quot;redis&quot;, 
        &quot;database&quot;, 
        &quot;NoSQL&quot;
    ],
    &quot;likes&quot; : 150.0
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB中的条件操作符，通过与SQL语句的对比来了解下；</li></ul><table><thead><tr><th style="text-align:left;">操作</th><th style="text-align:left;">格式</th><th style="text-align:left;">SQL中的类似语句</th></tr></thead><tbody><tr><td style="text-align:left;">等于</td><td style="text-align:left;"><code>{:}</code></td><td style="text-align:left;"><code>where title = &#39;MongoDB 教程&#39;</code></td></tr><tr><td style="text-align:left;">小于</td><td style="text-align:left;"><code>{:{$lt:}}</code></td><td style="text-align:left;"><code>where likes &lt; 50</code></td></tr><tr><td style="text-align:left;">小于或等于</td><td style="text-align:left;"><code>{:{$lte:}}</code></td><td style="text-align:left;"><code>where likes &lt;= 50</code></td></tr><tr><td style="text-align:left;">大于</td><td style="text-align:left;"><code>{:{$gt:}}</code></td><td style="text-align:left;"><code>where likes &gt; 50</code></td></tr><tr><td style="text-align:left;">大于或等于</td><td style="text-align:left;"><code>{:{$gte:}}</code></td><td style="text-align:left;"><code>where likes &gt;= 50</code></td></tr><tr><td style="text-align:left;">不等于</td><td style="text-align:left;"><code>{:{$ne:}}</code></td><td style="text-align:left;"><code>where likes != 50</code></td></tr></tbody></table><ul><li>条件查询，查询title为<code>MongoDB 教程</code>的所有文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({&#39;title&#39;:&#39;MongoDB 教程&#39;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>条件查询，查询likes大于50的所有文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({&#39;likes&#39;:{$gt:50}})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>AND条件可以通过在<code>find()</code>方法传入多个键，以逗号隔开来实现，例如查询title为<code>MongoDB 教程</code>并且by为<code>Andy</code>的所有文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({&#39;title&#39;:&#39;MongoDB 教程&#39;,&#39;by&#39;:&#39;Andy&#39;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>OR条件可以通过使用<code>$or</code>操作符实现，例如查询title为<code>Redis 教程</code>或<code>MongoDB 教程</code>的所有文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({$or:[{&quot;title&quot;:&quot;Redis 教程&quot;},{&quot;title&quot;: &quot;MongoDB 教程&quot;}]})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>AND 和 OR条件的联合使用，例如查询likes大于50，并且title为<code>Redis 教程</code>或者<code>&quot;MongoDB 教程</code>的所有文档。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({&quot;likes&quot;: {$gt:50}, $or: [{&quot;title&quot;: &quot;Redis 教程&quot;},{&quot;title&quot;: &quot;MongoDB 教程&quot;}]})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-其他操作" tabindex="-1"><a class="header-anchor" href="#_5-其他操作" aria-hidden="true">#</a> 5.其他操作</h2><h3 id="_5-1-limit与skip操作" tabindex="-1"><a class="header-anchor" href="#_5-1-limit与skip操作" aria-hidden="true">#</a> 5.1 Limit与Skip操作</h3><ul><li>读取指定数量的文档，可以使用<code>limit()</code>方法，语法如下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.find().limit(NUMBER)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>只查询article集合中的2条数据；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find().limit(2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>跳过指定数量的文档来读取，可以使用<code>skip()</code>方法，语法如下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.find().limit(NUMBER).skip(NUMBER)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>从第二条开始，查询article集合中的2条数据；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find().limit(2).skip(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-排序" tabindex="-1"><a class="header-anchor" href="#_5-2-排序" aria-hidden="true">#</a> 5.2 排序</h3><ul><li>在MongoDB中使用<code>sort()</code>方法对数据进行排序，<code>sort()</code>方法通过参数来指定排序的字段，并使用1和-1来指定排序方式，1为升序，-1为降序；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.find().sort({KEY:1})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>按article集合中文档的likes字段降序排列；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find().sort({likes:-1})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-3-索引" tabindex="-1"><a class="header-anchor" href="#_5-3-索引" aria-hidden="true">#</a> 5.3 索引</h3><ul><li>索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。</li><li>MongoDB使用<code>createIndex()</code>方法来创建索引，语法如下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.createIndex(keys, options)
# background：建索引过程会阻塞其它数据库操作，设置为true表示后台创建，默认为false
# unique：设置为true表示创建唯一索引
# name：指定索引名称，如果没有指定会自动生成
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>给title和description字段创建索引，1表示升序索引，-1表示降序索引，指定以后台方式创建；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.createIndex({&quot;title&quot;:1,&quot;description&quot;:-1}, {background: true})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看article集合中已经创建的索引；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.getIndexes()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
/* 1 */
[
    {
        &quot;v&quot; : 2,
        &quot;key&quot; : {
            &quot;_id&quot; : 1
        },
        &quot;name&quot; : &quot;_id_&quot;,
        &quot;ns&quot; : &quot;test.article&quot;
    },
    {
        &quot;v&quot; : 2,
        &quot;key&quot; : {
            &quot;title&quot; : 1.0,
            &quot;description&quot; : -1.0
        },
        &quot;name&quot; : &quot;title_1_description_-1&quot;,
        &quot;ns&quot; : &quot;test.article&quot;,
        &quot;background&quot; : true
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-聚合" tabindex="-1"><a class="header-anchor" href="#_5-4-聚合" aria-hidden="true">#</a> 5.4 聚合</h3><ul><li>MongoDB中的聚合使用<code>aggregate()</code>方法，类似于SQL中的group by语句，语法如下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.collection.aggregate(AGGREGATE_OPERATION)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>聚合中常用操作符如下；</li></ul><table><thead><tr><th style="text-align:left;">操作符</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">$sum</td><td style="text-align:left;">计算总和</td></tr><tr><td style="text-align:left;">$avg</td><td style="text-align:left;">计算平均值</td></tr><tr><td style="text-align:left;">$min</td><td style="text-align:left;">计算最小值</td></tr><tr><td style="text-align:left;">$max</td><td style="text-align:left;">计算最大值</td></tr></tbody></table><ul><li>根据by字段聚合文档并计算文档数量，类似与SQL中的count()函数；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.aggregate([{$group : {_id : &quot;$by&quot;, sum_count : {$sum : 1}}}])

/* 1 */
{
    &quot;_id&quot; : &quot;Andy&quot;,
    &quot;sum_count&quot; : 2.0
}

/* 2 */
{
    &quot;_id&quot; : &quot;Ruby&quot;,
    &quot;sum_count&quot; : 1.0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>根据by字段聚合文档并计算likes字段的平局值，类似与SQL中的avg()语句；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.aggregate([{$group : {_id : &quot;$by&quot;, avg_likes : {$avg : &quot;$likes&quot;}}}])


/* 1 */
{
    &quot;_id&quot; : &quot;Andy&quot;,
    &quot;avg_likes&quot; : 100.0
}

/* 2 */
{
    &quot;_id&quot; : &quot;Ruby&quot;,
    &quot;avg_likes&quot; : 100.0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-正则表达式" tabindex="-1"><a class="header-anchor" href="#_5-5-正则表达式" aria-hidden="true">#</a> 5.5 正则表达式</h3><ul><li>MongoDB使用<code>$regex</code>操作符来设置匹配字符串的正则表达式，可以用来模糊查询，类似于SQL中的like操作；</li><li>例如查询title中包含<code>教程</code>的文档；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({title:{$regex:&quot;教程&quot;}})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>不区分大小写的模糊查询，使用<code>$options</code>操作符；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.article.find({title:{$regex:&quot;elasticsearch&quot;,$options:&quot;$i&quot;}})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,79),c={href:"https://juejin.im/post/6844904150635921422",target:"_blank",rel:"noopener noreferrer"};function v(b,m){const i=u("ExternalLinkIcon");return t(),n("div",null,[r,e("p",null,[e("a",c,[l("MongoDB快速入门，掌握这些刚刚好"),a(i)])])])}const q=d(o,[["render",v],["__file","mongodb-started.html.vue"]]);export{q as default};
