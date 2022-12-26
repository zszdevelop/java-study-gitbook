import{_ as a,W as d,X as r,Y as e,Z as n,$ as s,a0 as l,D as t}from"./framework-0cf5f349.js";const o={},c=e("h1",{id:"从sql到mongodb之聚合篇",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#从sql到mongodb之聚合篇","aria-hidden":"true"},"#"),n(" 从SQL到MongoDB之聚合篇")],-1),u=e("h2",{id:"_1-简介",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-简介","aria-hidden":"true"},"#"),n(" 1. 简介")],-1),v={href:"https://docs.mongodb.com/manual/core/aggregation-pipeline/",target:"_blank",rel:"noopener noreferrer"},m=e("h3",{id:"_1-1-术语",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-1-术语","aria-hidden":"true"},"#"),n(" 1.1 术语")],-1),p={href:"https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/#aggregation-pipeline-operator-reference",target:"_blank",rel:"noopener noreferrer"},g=e("thead",null,[e("tr",null,[e("th",null,"SQL 术语、函数和概念"),e("th",null,"MongoDB 聚合操作符")])],-1),b=e("td",null,"WHERE",-1),_={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match",target:"_blank",rel:"noopener noreferrer"},h=e("td",null,"GROUP BY",-1),x={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group",target:"_blank",rel:"noopener noreferrer"},f=e("td",null,"HAVING",-1),k={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match",target:"_blank",rel:"noopener noreferrer"},$=e("td",null,"SELECT",-1),S={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project",target:"_blank",rel:"noopener noreferrer"},q=e("td",null,"ORDER BY",-1),E={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#pipe._S_sort",target:"_blank",rel:"noopener noreferrer"},M=e("td",null,"LIMIT",-1),B={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#pipe._S_limit",target:"_blank",rel:"noopener noreferrer"},L=e("td",null,"SUM()",-1),R={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#grp._S_sum",target:"_blank",rel:"noopener noreferrer"},O=e("td",null,"COUNT()",-1),T={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#grp._S_sum",target:"_blank",rel:"noopener noreferrer"},D={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/#pipe._S_sortByCount",target:"_blank",rel:"noopener noreferrer"},U=e("td",null,"join",-1),y={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup",target:"_blank",rel:"noopener noreferrer"},C=e("td",null,"SELECT INTO NEW_TABLE",-1),A={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out",target:"_blank",rel:"noopener noreferrer"},Q=e("td",null,"MERGE INTO TABLE",-1),Y={href:"https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#pipe._S_merge",target:"_blank",rel:"noopener noreferrer"},G={href:"https://docs.mongodb.com/manual/meta/aggregation-quick-reference/",target:"_blank",rel:"noopener noreferrer"},N=l(`<h2 id="_2-语法示例" tabindex="-1"><a class="header-anchor" href="#_2-语法示例" aria-hidden="true">#</a> 2. 语法示例</h2><p>下面提供了 SQL 聚合语句和相应的 MongoDB 语句，表中的例子假定以下条件：</p><ul><li>SQL 示例假定有两个表：<code>orders</code> 和 <code>order_lineitem</code>，然后通过 <code>order_lineitem.order_id</code> 和 <code>orders.id</code> 进行 <code>join</code> 操作。</li><li>MongoDB 示例假设其中一个集合（collection） <code>orders</code> 包含以下原型的文档（documents）：</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  cust_id<span class="token operator">:</span> <span class="token string">&quot;abc123&quot;</span><span class="token punctuation">,</span>
  ord_date<span class="token operator">:</span> ISODate(<span class="token string">&quot;2012-11-02T17:04:11.102Z&quot;</span>)<span class="token punctuation">,</span>
  status<span class="token operator">:</span> &#39;A&#39;<span class="token punctuation">,</span>
  price<span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
  items<span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> sku<span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span> qty<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> price<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
           <span class="token punctuation">{</span> sku<span class="token operator">:</span> <span class="token string">&quot;yyy&quot;</span><span class="token punctuation">,</span> qty<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> price<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-count-vs-count" tabindex="-1"><a class="header-anchor" href="#_2-1-count-vs-count" aria-hidden="true">#</a> 2.1 COUNT vs count</h3><p>计算所有 <code>orders</code> 记录数量：</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT COUNT(*) AS count
FROM orders
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   {
     $group: {
        _id: null,
        count: { $sum: 1 }
     }
   }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-sum-vs-sum" tabindex="-1"><a class="header-anchor" href="#_2-2-sum-vs-sum" aria-hidden="true">#</a> 2.2 SUM vs <code>$sum</code></h3><p>计算 <code>orders</code> 中 <code>price</code> 的总和：</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT SUM(price) AS total
FROM orders
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   {
     $group: {
        _id: null,
        total: { $sum: &quot;$price&quot; }
     }
   }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-group-by-vs-group" tabindex="-1"><a class="header-anchor" href="#_2-3-group-by-vs-group" aria-hidden="true">#</a> 2.3 GROUP BY vs <code>$group</code></h3><p>对于每一个独特的 <code>cust_id</code>，计算 <code>price</code> 字段总和：</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT cust_id,
       SUM(price) AS total
FROM orders
GROUP BY cust_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   {
     $group: {
        _id: &quot;$cust_id&quot;,
        total: { $sum: &quot;$price&quot; }
     }
   }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-order-by-vs-sort" tabindex="-1"><a class="header-anchor" href="#_2-4-order-by-vs-sort" aria-hidden="true">#</a> 2.4 ORDER BY vs <code>$sort</code></h3><p>对于每一个独特的 <code>cust_id</code>，计算 <code>price</code> 字段总和，且结果按总和排序：</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT cust_id,
       SUM(price) AS total
FROM orders
GROUP BY cust_id
ORDER BY total
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   {
     $group: {
        _id: &quot;$cust_id&quot;,
        total: { $sum: &quot;$price&quot; }
     }
   },
   { $sort: { total: 1 } }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-group-by-multi" tabindex="-1"><a class="header-anchor" href="#_2-5-group-by-multi" aria-hidden="true">#</a> 2.5 GROUP BY Multi</h3><p>对于每一个独特的 <code>cust_id</code>，按照 <code>ord_date</code> 进行分组，且不包含日期的时间部分，计算 <code>price</code> 字段总和。</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT cust_id,
       ord_date,
       SUM(price) AS total
FROM orders
GROUP BY cust_id,
         ord_date
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   {
     $group: {
        _id: {
           cust_id: &quot;$cust_id&quot;,
           ord_date: { $dateToString: {
              format: &quot;%Y-%m-%d&quot;,
              date: &quot;$ord_date&quot;
           }}
        },
        total: { $sum: &quot;$price&quot; }
     }
   }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-having-vs-match" tabindex="-1"><a class="header-anchor" href="#_2-6-having-vs-match" aria-hidden="true">#</a> 2.6 HAVING vs <code>$match</code></h3><p>对于 <code>cust_id</code> 如果有多个记录，就返回 <code>cust_id</code> 以及相应的记录数量：</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT cust_id,
       count(*)
FROM orders
GROUP BY cust_id
HAVING count(*) &gt; 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   {
     $group: {
        _id: &quot;$cust_id&quot;,
        count: { $sum: 1 }
     }
   },
   { $match: { count: { $gt: 1 } } }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-where-vs-match" tabindex="-1"><a class="header-anchor" href="#_2-7-where-vs-match" aria-hidden="true">#</a> 2.7 WHERE vs <code>$match</code></h3><p>对于每一个独特的 <code>cust_id</code>，且 <code>status = ‘A’</code>，计算 <code>price</code> 字段总和，只有在总和大于 250 的情况下，才可以返回。</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT cust_id,
       SUM(price) as total
FROM orders
WHERE status = &#39;A&#39;
GROUP BY cust_id
HAVING total &gt; 250
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   { $match: { status: &#39;A&#39; } },
   {
     $group: {
        _id: &quot;$cust_id&quot;,
        total: { $sum: &quot;$price&quot; }
     }
   },
   { $match: { total: { $gt: 250 } } }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-unwind" tabindex="-1"><a class="header-anchor" href="#_2-8-unwind" aria-hidden="true">#</a> 2.8 <code>$unwind</code></h3><p>对于每一个独特的 <code>cust_id</code>，对相应的行的 item 项求和得到 <code>qty</code>：</p><ul><li>SQL 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT cust_id,
       SUM(li.qty) as qty
FROM orders o,
     order_lineitem li
WHERE li.order_id = o.id
GROUP BY cust_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MongoDB 示例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.orders.aggregate( [
   { $unwind: &quot;$items&quot; },
   {
     $group: {
        _id: &quot;$cust_id&quot;,
        qty: { $sum: &quot;$items.qty&quot; }
     }
   }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-multi-aggregate" tabindex="-1"><a class="header-anchor" href="#_2-9-multi-aggregate" aria-hidden="true">#</a> 2.9 Multi aggregate</h3><p>将 <code>cust_id</code>, <code>ord_date</code> 分组并计算数量 ，不包括日期的时间部分。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT COUNT(*)
FROM (SELECT cust_id,
             ord_date
      FROM orders
      GROUP BY cust_id,
               ord_date)
      as DerivedTable
db.orders.aggregate( [
   {
     $group: {
        _id: {
           cust_id: &quot;$cust_id&quot;,
           ord_date: { $dateToString: {
              format: &quot;%Y-%m-%d&quot;,
              date: &quot;$ord_date&quot;
           }}
        }
     }
   },
   {
     $group: {
        _id: null,
        count: { $sum: 1 }
     }
   }
] )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,56),I={href:"https://jelly.jd.com/article/5edf43da70bb2b0168e022b2",target:"_blank",rel:"noopener noreferrer"},P=e("strong",null,"从 SQL 到 MongoDB 之聚合篇",-1);function j(F,H){const i=t("ExternalLinkIcon");return d(),r("div",null,[c,u,e("p",null,[n("聚合管道 （ "),e("a",v,[n("aggregation pipeline "),s(i)]),n("） 让 MongoDB 提供与 SQL 中的许多常见数据聚合操作相对应的，原生的聚合功能。")]),m,e("p",null,[n("下表概述了常见的 SQL 聚合术语、函数和概念以及相应的 MongoDB 聚合操作符（ "),e("a",p,[n("aggregation operators "),s(i)]),n("）：")]),e("table",null,[g,e("tbody",null,[e("tr",null,[b,e("td",null,[e("a",_,[n("$match"),s(i)])])]),e("tr",null,[h,e("td",null,[e("a",x,[n("$group"),s(i)])])]),e("tr",null,[f,e("td",null,[e("a",k,[n("$match"),s(i)])])]),e("tr",null,[$,e("td",null,[e("a",S,[n("$project"),s(i)])])]),e("tr",null,[q,e("td",null,[e("a",E,[n("$sort"),s(i)])])]),e("tr",null,[M,e("td",null,[e("a",B,[n("$limit"),s(i)])])]),e("tr",null,[L,e("td",null,[e("a",R,[n("$sum"),s(i)])])]),e("tr",null,[O,e("td",null,[e("a",T,[n("$sum "),s(i)]),e("a",D,[n("$sortByCount"),s(i)])])]),e("tr",null,[U,e("td",null,[e("a",y,[n("$lookup"),s(i)])])]),e("tr",null,[C,e("td",null,[e("a",A,[n("$out"),s(i)])])]),e("tr",null,[Q,e("td",null,[e("a",Y,[n("$merge "),s(i)]),n("MongoDB 4.2 可用")])])])]),e("p",null,[n("有关所有聚合管道和表达式操作符的列表，请参见： "),e("a",G,[n("Aggregation Pipeline Quick Reference "),s(i)]),n("。")]),N,e("p",null,[e("a",I,[P,s(i)])])])}const w=a(o,[["render",j],["__file","mongodb-x-sql-mongo-aggregation.html.vue"]]);export{w as default};
