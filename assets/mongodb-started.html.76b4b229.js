import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as t,a as e,b as l,d as s,e as a,r as u}from"./app.6a5825c6.js";const o={},r=s(`<h1 id="mongodb\u5165\u95E8" tabindex="-1"><a class="header-anchor" href="#mongodb\u5165\u95E8" aria-hidden="true">#</a> MongoDB\u5165\u95E8</h1><h2 id="_1-\u8FDE\u63A5mongodb" tabindex="-1"><a class="header-anchor" href="#_1-\u8FDE\u63A5mongodb" aria-hidden="true">#</a> 1. \u8FDE\u63A5mongodb</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>// mongo \u8FDC\u7A0B\u4E3B\u673Aip\u6216DNS:MongoDB\u7AEF\u53E3\u53F7/\u6570\u636E\u5E93\u540D <span class="token parameter variable">-u</span> user <span class="token parameter variable">-p</span> password
mongo <span class="token number">192.168</span>.1.200:27017/test <span class="token parameter variable">-u</span> user <span class="token parameter variable">-p</span> password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u82E5\u5728\u5B89\u88C5mongo\u7684\u670D\u52A1\u5668\u4E0A\u8BBF\u95EE\u672C\u5730mongo,\u53EF\u76F4\u63A5\u6267\u884C mongo</p><h2 id="_2-\u6570\u636E\u5E93\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_2-\u6570\u636E\u5E93\u64CD\u4F5C" aria-hidden="true">#</a> 2. \u6570\u636E\u5E93\u64CD\u4F5C</h2><ul><li><p>\u521B\u5EFA\u6570\u636E\u5E93\uFF0C\u4F7F\u7528<code>use</code>\u547D\u4EE4\u53BB\u521B\u5EFA\u6570\u636E\u5E93\uFF0C\u5F53\u63D2\u5165\u7B2C\u4E00\u6761\u6570\u636E\u65F6\u4F1A\u521B\u5EFA\u6570\u636E\u5E93\uFF0C\u4F8B\u5982\u521B\u5EFA\u4E00\u4E2A<code>test</code>\u6570\u636E\u5E93\uFF1B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&gt; use test
switched to db test
&gt; db.article.insert({name:&quot;\u6D4B\u8BD5 MongoDB&quot;})
WriteResult({ &quot;nInserted&quot; : 1 })
&gt; show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5220\u9664\u6570\u636E\u5E93\uFF0C\u4F7F\u7528db\u5BF9\u8C61\u4E2D\u7684<code>dropDatabase()</code>\u65B9\u6CD5\u6765\u5220\u9664\uFF1B\uFF08\u53EA\u5220\u9664use \u9009\u62E9\u7684\uFF0C\u800C\u975E\u6240\u6709\uFF09</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&gt; db.dropDatabase()
{ &quot;dropped&quot; : &quot;test&quot;, &quot;ok&quot; : 1 }
&gt; show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_3-\u96C6\u5408\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_3-\u96C6\u5408\u64CD\u4F5C" aria-hidden="true">#</a> 3. \u96C6\u5408\u64CD\u4F5C</h2><ul><li><p>\u521B\u5EFA\u96C6\u5408\uFF0C\u4F7F\u7528db\u5BF9\u8C61\u4E2D\u7684<code>createCollection()</code>\u65B9\u6CD5\u6765\u521B\u5EFA\u96C6\u5408\uFF0C\u4F8B\u5982\u521B\u5EFA\u4E00\u4E2A<code>article</code>\u96C6\u5408\uFF1B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&gt; use test
switched to db test
&gt; db.createCollection(&quot;myCollection&quot;)
{ &quot;ok&quot; : 1 }
&gt; show collections
article
myCollection
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5220\u9664\u96C6\u5408\uFF0C\u4F7F\u7528collection\u5BF9\u8C61\u7684<code>drop()</code>\u65B9\u6CD5\u6765\u5220\u9664\u96C6\u5408\uFF0C\u4F8B\u5982\u5220\u9664\u4E00\u4E2A<code>article</code>\u96C6\u5408\uFF1B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&gt; db.myCollection.drop()
true
&gt; show collections
article
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_4-\u6587\u6863\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_4-\u6587\u6863\u64CD\u4F5C" aria-hidden="true">#</a> 4. \u6587\u6863\u64CD\u4F5C</h2><h3 id="_4-1-\u63D2\u5165\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#_4-1-\u63D2\u5165\u6587\u6863" aria-hidden="true">#</a> 4.1 \u63D2\u5165\u6587\u6863</h3><ul><li>MongoDB\u901A\u8FC7collection\u5BF9\u8C61\u7684<code>insert()</code>\u65B9\u6CD5\u5411\u96C6\u5408\u4E2D\u63D2\u5165\u6587\u6863\uFF0C<strong>\u8BED\u6CD5\u5982\u4E0B</strong>\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.insert(document)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u4F7F\u7528collection\u5BF9\u8C61\u7684<code>insert()</code>\u65B9\u6CD5\u6765\u63D2\u5165\u6587\u6863\uFF0C\u4F8B\u5982\u63D2\u5165\u4E00\u4E2A<code>article</code>\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.myCollection.insert({title: &#39;\u6211\u662F\u6807\u9898&#39;, 
    content: &#39;\u6211\u662F\u5185\u5BB9&#39;
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u4F7F\u7528collection\u5BF9\u8C61\u7684<code>find()</code>\u65B9\u6CD5\u53EF\u4EE5\u83B7\u53D6\u6587\u6863\uFF0C\u4F8B\u5982\u83B7\u53D6\u6240\u6709\u7684<code>article</code>\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.myCollection.find({})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-\u66F4\u65B0\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#_4-2-\u66F4\u65B0\u6587\u6863" aria-hidden="true">#</a> 4.2 \u66F4\u65B0\u6587\u6863</h3><ul><li><p>MongoDB\u901A\u8FC7collection\u5BF9\u8C61\u7684<code>update()</code>\u6765\u66F4\u65B0\u96C6\u5408\u4E2D\u7684\u6587\u6863\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.update(
   &lt;query&gt;,
   &lt;update&gt;,
   {
     multi: &lt;boolean&gt;
   }
)
# query\uFF1A\u4FEE\u6539\u7684\u67E5\u8BE2\u6761\u4EF6\uFF0C\u7C7B\u4F3C\u4E8ESQL\u4E2D\u7684WHERE\u90E8\u5206
# update\uFF1A\u66F4\u65B0\u5C5E\u6027\u7684\u64CD\u4F5C\u7B26\uFF0C\u7C7B\u4F3C\u4E0ESQL\u4E2D\u7684SET\u90E8\u5206
# multi\uFF1A\u8BBE\u7F6E\u4E3Atrue\u65F6\u4F1A\u66F4\u65B0\u6240\u6709\u7B26\u5408\u6761\u4EF6\u7684\u6587\u6863\uFF0C\u9ED8\u8BA4\u4E3Afalse\u53EA\u66F4\u65B0\u627E\u5230\u7684\u7B2C\u4E00\u6761

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5C06title\u4E3A<code>MongoDB \u6559\u7A0B</code>\u7684\u6240\u6709\u6587\u6863\u7684title\u4FEE\u6539\u4E3A<code>MongoDB</code>\uFF1B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.update({&#39;title&#39;:&#39;\u6211\u662F\u6807\u9898&#39;},{$set:{&#39;title&#39;:&#39;\u6807\u9898\u4FEE\u6539&#39;}},{multi:true})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u9664\u4E86<code>update()</code>\u65B9\u6CD5\u4EE5\u5916\uFF0C<code>save()</code>\u65B9\u6CD5\u53EF\u4EE5\u7528\u6765\u66FF\u6362\u5DF2\u6709\u6587\u6863\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.save(document)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u8FD9\u6B21\u6211\u4EEC\u5C06ObjectId\u4E3A<code>5e9943661379a112845e4056</code>\u7684\u6587\u6863\u7684title\u6539\u4E3A<code>MongoDB \u6559\u7A0B</code>\uFF1B</p></li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.save({
    &quot;_id&quot; : ObjectId(&quot;5e9943661379a112845e4056&quot;),
    &quot;title&quot; : &quot;MongoDB \u6559\u7A0B&quot;,
    &quot;description&quot; : &quot;MongoDB \u662F\u4E00\u4E2A Nosql \u6570\u636E\u5E93&quot;,
    &quot;by&quot; : &quot;Andy&quot;,
    &quot;url&quot; : &quot;https://www.mongodb.com/&quot;,
    &quot;tags&quot; : [ 
        &quot;mongodb&quot;, 
        &quot;database&quot;, 
        &quot;NoSQL&quot;
    ],
    &quot;likes&quot; : 100.0
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-\u5220\u9664\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#_4-3-\u5220\u9664\u6587\u6863" aria-hidden="true">#</a> 4.3 \u5220\u9664\u6587\u6863</h3><ul><li>MongoDB\u901A\u8FC7collection\u5BF9\u8C61\u7684<code>remove()</code>\u65B9\u6CD5\u6765\u5220\u9664\u96C6\u5408\u4E2D\u7684\u6587\u6863\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.remove(
   &lt;query&gt;,
   {
     justOne: &lt;boolean&gt;
   }
)
# query\uFF1A\u5220\u9664\u7684\u67E5\u8BE2\u6761\u4EF6\uFF0C\u7C7B\u4F3C\u4E8ESQL\u4E2D\u7684WHERE\u90E8\u5206
# justOne\uFF1A\u8BBE\u7F6E\u4E3Atrue\u53EA\u5220\u9664\u4E00\u6761\u8BB0\u5F55\uFF0C\u9ED8\u8BA4\u4E3Afalse\u5220\u9664\u6240\u6709\u8BB0\u5F55
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5220\u9664title\u4E3A<code>MongoDB \u6559\u7A0B</code>\u7684\u6240\u6709\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.remove({&#39;title&#39;:&#39;MongoDB \u6559\u7A0B&#39;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-4-\u67E5\u8BE2\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#_4-4-\u67E5\u8BE2\u6587\u6863" aria-hidden="true">#</a> 4.4 \u67E5\u8BE2\u6587\u6863</h3><ul><li>MongoDB\u901A\u8FC7collection\u5BF9\u8C61\u7684<code>find()</code>\u65B9\u6CD5\u6765\u67E5\u8BE2\u6587\u6863\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.find(query, projection)
# query\uFF1A\u67E5\u8BE2\u6761\u4EF6\uFF0C\u7C7B\u4F3C\u4E8ESQL\u4E2D\u7684WHERE\u90E8\u5206
# projection\uFF1A\u53EF\u9009\uFF0C\u4F7F\u7528\u6295\u5F71\u64CD\u4F5C\u7B26\u6307\u5B9A\u8FD4\u56DE\u7684\u952E

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u67E5\u8BE2<code>article</code>\u96C6\u5408\u4E2D\u7684\u6240\u6709\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find()

/* 1 */
{
    &quot;_id&quot; : ObjectId(&quot;5e994dcb1379a112845e4057&quot;),
    &quot;title&quot; : &quot;MongoDB \u6559\u7A0B&quot;,
    &quot;description&quot; : &quot;MongoDB \u662F\u4E00\u4E2A Nosql \u6570\u636E\u5E93&quot;,
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
    &quot;title&quot; : &quot;Elasticsearch \u6559\u7A0B&quot;,
    &quot;description&quot; : &quot;Elasticsearch \u662F\u4E00\u4E2A\u641C\u7D22\u5F15\u64CE&quot;,
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
    &quot;title&quot; : &quot;Redis \u6559\u7A0B&quot;,
    &quot;description&quot; : &quot;Redis \u662F\u4E00\u4E2Akey-value\u6570\u636E\u5E93&quot;,
    &quot;by&quot; : &quot;Andy&quot;,
    &quot;url&quot; : &quot;https://redis.io/&quot;,
    &quot;tags&quot; : [ 
        &quot;redis&quot;, 
        &quot;database&quot;, 
        &quot;NoSQL&quot;
    ],
    &quot;likes&quot; : 150.0
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB\u4E2D\u7684\u6761\u4EF6\u64CD\u4F5C\u7B26\uFF0C\u901A\u8FC7\u4E0ESQL\u8BED\u53E5\u7684\u5BF9\u6BD4\u6765\u4E86\u89E3\u4E0B\uFF1B</li></ul><table><thead><tr><th style="text-align:left;">\u64CD\u4F5C</th><th style="text-align:left;">\u683C\u5F0F</th><th style="text-align:left;">SQL\u4E2D\u7684\u7C7B\u4F3C\u8BED\u53E5</th></tr></thead><tbody><tr><td style="text-align:left;">\u7B49\u4E8E</td><td style="text-align:left;"><code>{:}</code></td><td style="text-align:left;"><code>where title = &#39;MongoDB \u6559\u7A0B&#39;</code></td></tr><tr><td style="text-align:left;">\u5C0F\u4E8E</td><td style="text-align:left;"><code>{:{$lt:}}</code></td><td style="text-align:left;"><code>where likes &lt; 50</code></td></tr><tr><td style="text-align:left;">\u5C0F\u4E8E\u6216\u7B49\u4E8E</td><td style="text-align:left;"><code>{:{$lte:}}</code></td><td style="text-align:left;"><code>where likes &lt;= 50</code></td></tr><tr><td style="text-align:left;">\u5927\u4E8E</td><td style="text-align:left;"><code>{:{$gt:}}</code></td><td style="text-align:left;"><code>where likes &gt; 50</code></td></tr><tr><td style="text-align:left;">\u5927\u4E8E\u6216\u7B49\u4E8E</td><td style="text-align:left;"><code>{:{$gte:}}</code></td><td style="text-align:left;"><code>where likes &gt;= 50</code></td></tr><tr><td style="text-align:left;">\u4E0D\u7B49\u4E8E</td><td style="text-align:left;"><code>{:{$ne:}}</code></td><td style="text-align:left;"><code>where likes != 50</code></td></tr></tbody></table><ul><li>\u6761\u4EF6\u67E5\u8BE2\uFF0C\u67E5\u8BE2title\u4E3A<code>MongoDB \u6559\u7A0B</code>\u7684\u6240\u6709\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({&#39;title&#39;:&#39;MongoDB \u6559\u7A0B&#39;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u6761\u4EF6\u67E5\u8BE2\uFF0C\u67E5\u8BE2likes\u5927\u4E8E50\u7684\u6240\u6709\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({&#39;likes&#39;:{$gt:50}})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>AND\u6761\u4EF6\u53EF\u4EE5\u901A\u8FC7\u5728<code>find()</code>\u65B9\u6CD5\u4F20\u5165\u591A\u4E2A\u952E\uFF0C\u4EE5\u9017\u53F7\u9694\u5F00\u6765\u5B9E\u73B0\uFF0C\u4F8B\u5982\u67E5\u8BE2title\u4E3A<code>MongoDB \u6559\u7A0B</code>\u5E76\u4E14by\u4E3A<code>Andy</code>\u7684\u6240\u6709\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({&#39;title&#39;:&#39;MongoDB \u6559\u7A0B&#39;,&#39;by&#39;:&#39;Andy&#39;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>OR\u6761\u4EF6\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528<code>$or</code>\u64CD\u4F5C\u7B26\u5B9E\u73B0\uFF0C\u4F8B\u5982\u67E5\u8BE2title\u4E3A<code>Redis \u6559\u7A0B</code>\u6216<code>MongoDB \u6559\u7A0B</code>\u7684\u6240\u6709\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({$or:[{&quot;title&quot;:&quot;Redis \u6559\u7A0B&quot;},{&quot;title&quot;: &quot;MongoDB \u6559\u7A0B&quot;}]})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>AND \u548C OR\u6761\u4EF6\u7684\u8054\u5408\u4F7F\u7528\uFF0C\u4F8B\u5982\u67E5\u8BE2likes\u5927\u4E8E50\uFF0C\u5E76\u4E14title\u4E3A<code>Redis \u6559\u7A0B</code>\u6216\u8005<code>&quot;MongoDB \u6559\u7A0B</code>\u7684\u6240\u6709\u6587\u6863\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({&quot;likes&quot;: {$gt:50}, $or: [{&quot;title&quot;: &quot;Redis \u6559\u7A0B&quot;},{&quot;title&quot;: &quot;MongoDB \u6559\u7A0B&quot;}]})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-\u5176\u4ED6\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_5-\u5176\u4ED6\u64CD\u4F5C" aria-hidden="true">#</a> 5.\u5176\u4ED6\u64CD\u4F5C</h2><h3 id="_5-1-limit\u4E0Eskip\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_5-1-limit\u4E0Eskip\u64CD\u4F5C" aria-hidden="true">#</a> 5.1 Limit\u4E0ESkip\u64CD\u4F5C</h3><ul><li>\u8BFB\u53D6\u6307\u5B9A\u6570\u91CF\u7684\u6587\u6863\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>limit()</code>\u65B9\u6CD5\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.find().limit(NUMBER)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u53EA\u67E5\u8BE2article\u96C6\u5408\u4E2D\u76842\u6761\u6570\u636E\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find().limit(2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u8DF3\u8FC7\u6307\u5B9A\u6570\u91CF\u7684\u6587\u6863\u6765\u8BFB\u53D6\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>skip()</code>\u65B9\u6CD5\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.find().limit(NUMBER).skip(NUMBER)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u4ECE\u7B2C\u4E8C\u6761\u5F00\u59CB\uFF0C\u67E5\u8BE2article\u96C6\u5408\u4E2D\u76842\u6761\u6570\u636E\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find().limit(2).skip(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#_5-2-\u6392\u5E8F" aria-hidden="true">#</a> 5.2 \u6392\u5E8F</h3><ul><li>\u5728MongoDB\u4E2D\u4F7F\u7528<code>sort()</code>\u65B9\u6CD5\u5BF9\u6570\u636E\u8FDB\u884C\u6392\u5E8F\uFF0C<code>sort()</code>\u65B9\u6CD5\u901A\u8FC7\u53C2\u6570\u6765\u6307\u5B9A\u6392\u5E8F\u7684\u5B57\u6BB5\uFF0C\u5E76\u4F7F\u75281\u548C-1\u6765\u6307\u5B9A\u6392\u5E8F\u65B9\u5F0F\uFF0C1\u4E3A\u5347\u5E8F\uFF0C-1\u4E3A\u964D\u5E8F\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.find().sort({KEY:1})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u6309article\u96C6\u5408\u4E2D\u6587\u6863\u7684likes\u5B57\u6BB5\u964D\u5E8F\u6392\u5217\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find().sort({likes:-1})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-3-\u7D22\u5F15" tabindex="-1"><a class="header-anchor" href="#_5-3-\u7D22\u5F15" aria-hidden="true">#</a> 5.3 \u7D22\u5F15</h3><ul><li>\u7D22\u5F15\u901A\u5E38\u80FD\u591F\u6781\u5927\u7684\u63D0\u9AD8\u67E5\u8BE2\u7684\u6548\u7387\uFF0C\u5982\u679C\u6CA1\u6709\u7D22\u5F15\uFF0CMongoDB\u5728\u8BFB\u53D6\u6570\u636E\u65F6\u5FC5\u987B\u626B\u63CF\u96C6\u5408\u4E2D\u7684\u6BCF\u4E2A\u6587\u4EF6\u5E76\u9009\u53D6\u90A3\u4E9B\u7B26\u5408\u67E5\u8BE2\u6761\u4EF6\u7684\u8BB0\u5F55\u3002</li><li>MongoDB\u4F7F\u7528<code>createIndex()</code>\u65B9\u6CD5\u6765\u521B\u5EFA\u7D22\u5F15\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.createIndex(keys, options)
# background\uFF1A\u5EFA\u7D22\u5F15\u8FC7\u7A0B\u4F1A\u963B\u585E\u5176\u5B83\u6570\u636E\u5E93\u64CD\u4F5C\uFF0C\u8BBE\u7F6E\u4E3Atrue\u8868\u793A\u540E\u53F0\u521B\u5EFA\uFF0C\u9ED8\u8BA4\u4E3Afalse
# unique\uFF1A\u8BBE\u7F6E\u4E3Atrue\u8868\u793A\u521B\u5EFA\u552F\u4E00\u7D22\u5F15
# name\uFF1A\u6307\u5B9A\u7D22\u5F15\u540D\u79F0\uFF0C\u5982\u679C\u6CA1\u6709\u6307\u5B9A\u4F1A\u81EA\u52A8\u751F\u6210
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7ED9title\u548Cdescription\u5B57\u6BB5\u521B\u5EFA\u7D22\u5F15\uFF0C1\u8868\u793A\u5347\u5E8F\u7D22\u5F15\uFF0C-1\u8868\u793A\u964D\u5E8F\u7D22\u5F15\uFF0C\u6307\u5B9A\u4EE5\u540E\u53F0\u65B9\u5F0F\u521B\u5EFA\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.createIndex({&quot;title&quot;:1,&quot;description&quot;:-1}, {background: true})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u67E5\u770Barticle\u96C6\u5408\u4E2D\u5DF2\u7ECF\u521B\u5EFA\u7684\u7D22\u5F15\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.getIndexes()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-\u805A\u5408" tabindex="-1"><a class="header-anchor" href="#_5-4-\u805A\u5408" aria-hidden="true">#</a> 5.4 \u805A\u5408</h3><ul><li>MongoDB\u4E2D\u7684\u805A\u5408\u4F7F\u7528<code>aggregate()</code>\u65B9\u6CD5\uFF0C\u7C7B\u4F3C\u4E8ESQL\u4E2D\u7684group by\u8BED\u53E5\uFF0C\u8BED\u6CD5\u5982\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.collection.aggregate(AGGREGATE_OPERATION)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u805A\u5408\u4E2D\u5E38\u7528\u64CD\u4F5C\u7B26\u5982\u4E0B\uFF1B</li></ul><table><thead><tr><th style="text-align:left;">\u64CD\u4F5C\u7B26</th><th style="text-align:left;">\u63CF\u8FF0</th></tr></thead><tbody><tr><td style="text-align:left;">$sum</td><td style="text-align:left;">\u8BA1\u7B97\u603B\u548C</td></tr><tr><td style="text-align:left;">$avg</td><td style="text-align:left;">\u8BA1\u7B97\u5E73\u5747\u503C</td></tr><tr><td style="text-align:left;">$min</td><td style="text-align:left;">\u8BA1\u7B97\u6700\u5C0F\u503C</td></tr><tr><td style="text-align:left;">$max</td><td style="text-align:left;">\u8BA1\u7B97\u6700\u5927\u503C</td></tr></tbody></table><ul><li>\u6839\u636Eby\u5B57\u6BB5\u805A\u5408\u6587\u6863\u5E76\u8BA1\u7B97\u6587\u6863\u6570\u91CF\uFF0C\u7C7B\u4F3C\u4E0ESQL\u4E2D\u7684count()\u51FD\u6570\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.aggregate([{$group : {_id : &quot;$by&quot;, sum_count : {$sum : 1}}}])

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u6839\u636Eby\u5B57\u6BB5\u805A\u5408\u6587\u6863\u5E76\u8BA1\u7B97likes\u5B57\u6BB5\u7684\u5E73\u5C40\u503C\uFF0C\u7C7B\u4F3C\u4E0ESQL\u4E2D\u7684avg()\u8BED\u53E5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.aggregate([{$group : {_id : &quot;$by&quot;, avg_likes : {$avg : &quot;$likes&quot;}}}])


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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-\u6B63\u5219\u8868\u8FBE\u5F0F" tabindex="-1"><a class="header-anchor" href="#_5-5-\u6B63\u5219\u8868\u8FBE\u5F0F" aria-hidden="true">#</a> 5.5 \u6B63\u5219\u8868\u8FBE\u5F0F</h3><ul><li>MongoDB\u4F7F\u7528<code>$regex</code>\u64CD\u4F5C\u7B26\u6765\u8BBE\u7F6E\u5339\u914D\u5B57\u7B26\u4E32\u7684\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u53EF\u4EE5\u7528\u6765\u6A21\u7CCA\u67E5\u8BE2\uFF0C\u7C7B\u4F3C\u4E8ESQL\u4E2D\u7684like\u64CD\u4F5C\uFF1B</li><li>\u4F8B\u5982\u67E5\u8BE2title\u4E2D\u5305\u542B<code>\u6559\u7A0B</code>\u7684\u6587\u6863\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({title:{$regex:&quot;\u6559\u7A0B&quot;}})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u4E0D\u533A\u5206\u5927\u5C0F\u5199\u7684\u6A21\u7CCA\u67E5\u8BE2\uFF0C\u4F7F\u7528<code>$options</code>\u64CD\u4F5C\u7B26\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>db.article.find({title:{$regex:&quot;elasticsearch&quot;,$options:&quot;$i&quot;}})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,79),c={href:"https://juejin.im/post/6844904150635921422",target:"_blank",rel:"noopener noreferrer"},v=a("MongoDB\u5FEB\u901F\u5165\u95E8\uFF0C\u638C\u63E1\u8FD9\u4E9B\u521A\u521A\u597D");function b(m,g){const i=u("ExternalLinkIcon");return n(),t("div",null,[r,e("p",null,[e("a",c,[v,l(i)])])])}const h=d(o,[["render",b],["__file","mongodb-started.html.vue"]]);export{h as default};
