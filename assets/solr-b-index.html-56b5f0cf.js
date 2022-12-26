import{_ as r,W as a,X as d,Y as e,Z as n,$ as l,a0 as s,D as t}from"./framework-0cf5f349.js";const o={},c=s(`<h1 id="solr倒排索引原理" tabindex="-1"><a class="header-anchor" href="#solr倒排索引原理" aria-hidden="true">#</a> Solr倒排索引原理</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>solr是基于Lucence开发的企业级搜索引擎技术，而lucence的原理是倒排索引。那么什么是倒排索引呢？</p><h3 id="_1-1-正排索引" tabindex="-1"><a class="header-anchor" href="#_1-1-正排索引" aria-hidden="true">#</a> 1.1 正排索引</h3><p>我们传统的方式（正排索引）是从关键点出发，然后再通过关键点找到关键点代表的信息中能够满足搜索条件的特定信息，既通过<strong>KEY寻找VALUE</strong>。</p><p>例如我们sql 语句，他是通过key ,来找值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>where name like &#39;%张三%&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>正排索引从文档编号找词：</strong></p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417133453806.png" alt="image-20220417133453806" tabindex="0" loading="lazy"><figcaption>image-20220417133453806</figcaption></figure><h3 id="_1-2-倒排索引" tabindex="-1"><a class="header-anchor" href="#_1-2-倒排索引" aria-hidden="true">#</a> 1.2 倒排索引</h3><p>而Lucene的搜索则是采用了倒排索引的方式，即通过<strong>VALUE找KEY</strong>。而在中文全文搜索中VALUE就是我们要搜索的单词，存放所有单词的地方叫词典。KEY是文档标号列表（通过文档标号列表我们可以找到出现过要搜索单词VALUE的文档）</p><p><strong>倒排索引是从词找文档编号：</strong></p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417133516596.png" alt="image-20220417133516596" tabindex="0" loading="lazy"><figcaption>image-20220417133516596</figcaption></figure><h2 id="_2-索引的创建过程" tabindex="-1"><a class="header-anchor" href="#_2-索引的创建过程" aria-hidden="true">#</a> 2. 索引的创建过程</h2><p>索引的创建过程可以分为：<strong>1.分词组件，2.语言处理组件，2.索引组件</strong></p><h3 id="_2-1-分词组件-tokenizer" tabindex="-1"><a class="header-anchor" href="#_2-1-分词组件-tokenizer" aria-hidden="true">#</a> 2.1 分词组件（Tokenizer）</h3><ul><li>将原文档交给分词组件（Tokenizer）</li></ul><p>此过程叫做Tokenize，得到的结果称为Token。</p><p>分词组件的作用</p><ol><li><p>将数据分成一个个词汇</p></li><li><p>去除标点符号</p></li><li><p>去除停词(比如中文的“的”，“和”，“啦”等等)</p></li></ol><h4 id="_2-1-1-示例" tabindex="-1"><a class="header-anchor" href="#_2-1-1-示例" aria-hidden="true">#</a> 2.1.1 示例</h4><p>比如存入“Students should be allowed to go out！”</p><ol><li>分词组件会先将句子分成多个单词“Students”，“should”，“be” ，“allowed”，“to”，“go”，“out”,“！”。</li><li>随后会进行第二部将标点符号“！”去掉，</li><li>最后第三步会将“to”,“be”去掉。</li></ol><p>最后留下的结果为：“Students”，“should”，“allowed”，“go”，“out”。</p><h3 id="_2-2-语言处理组件-linguisticprocessor" tabindex="-1"><a class="header-anchor" href="#_2-2-语言处理组件-linguisticprocessor" aria-hidden="true">#</a> 2.2 语言处理组件（LinguisticProcessor）：</h3><p>将得到的Token交给语言处理组件（LinguisticProcessor）</p><p>此过程处理的结果是Term</p><p>语言处理组件的作用如下：</p><ol><li>变为小写(Lowercase)。</li><li>将单词缩减为词根形式，如”cars”到”car”等。这种操作称为：stemming。</li><li>将单词转变为词根形式，如”drove”到”drive”等。这种操作称为：lemmatization。</li></ol><blockquote><p>注意：至此索引创建完成，搜索”drive”时，”driving”，”drove”，”driven”也能够被搜到。因为在索引中，”driving”，”drove”，”driven”都会经过语言处理而变成”drive”，在搜索时，如果您输入”driving”，输入的查询语句同样经过分词组件和语言处理组件处理的步骤，变为查询”drive”，从而可以搜索到想要的文档。Lowercase，stemming同理</p></blockquote><h3 id="_2-4-索引组件-indexer" tabindex="-1"><a class="header-anchor" href="#_2-4-索引组件-indexer" aria-hidden="true">#</a> 2.4 <strong>索引组件（Indexer）</strong></h3><p>将得到的Term交给索引组件（Indexer）</p><ol><li>将得到的Term创建字典</li><li>对字典按字母排序</li><li>合并相同的Term为倒排索引表</li></ol><p>假设现在有两个文档：</p><ul><li>文档一：Students should be allowed to go out with their friends, but not allowed to drink beer.</li><li>文档二：My friend Jerry went to school to see his students but found them drunk which is not allowed</li></ul><p>经过前两个组件的处理后得到如下索引：</p><h4 id="_2-4-1-初始索引" tabindex="-1"><a class="header-anchor" href="#_2-4-1-初始索引" aria-hidden="true">#</a> 2.4.1 初始索引</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Term Document ID
student 1
allow 1
go 1
their 1
friend 1
allow 1
drink 1
beer 1
my 2
friend 2
jerry 2
go 2
school 2
see 2
his 2
student 2
find 2
them 2
drink 2
allow 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-2-对字典按字母顺序排序" tabindex="-1"><a class="header-anchor" href="#_2-4-2-对字典按字母顺序排序" aria-hidden="true">#</a> 2.4.2 对字典按字母顺序排序：</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Term Document ID
allow 1
allow 1
allow 2
beer 1
drink 1
drink 2
find 2
friend 1
friend 2
go 1
go 2
his 2
jerry 2
my 2
school 2
see 2
student 1
student 2
their 1
them 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-3-合并相同的词-term-成为文档倒排-posting-list-链表" tabindex="-1"><a class="header-anchor" href="#_2-4-3-合并相同的词-term-成为文档倒排-posting-list-链表" aria-hidden="true">#</a> 2.4.3 合并相同的词(Term)成为文档倒排(Posting List)链表</h4><p>合并相同的词(Term)成为文档倒排(Posting List)链表</p><ul><li><p>Document Frequency：文档频次，表示多少文档出现过此词(Term)</p></li><li><p>Frequency：词频，表示某个文档中该词(Term)出现过几次</p></li></ul><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220417131709282.png" alt="image-20220417131709282" tabindex="0" loading="lazy"><figcaption>image-20220417131709282</figcaption></figure><h2 id="_3-索引的检索" tabindex="-1"><a class="header-anchor" href="#_3-索引的检索" aria-hidden="true">#</a> 3. <strong>索引的检索</strong></h2><p>通过前几步索引的创建，现在就可以对创建的索引进行检索了。</p><ol><li>当用户的检索关键词进入solr后，solr会对传入的关键词进行处理，具体处理过程类似创建索引时语言处理组件对文档词汇的处理过程。</li><li>将处理后的词在词典中搜索得到一个文档集。</li><li>将文档集根据词频将文档集进行相关性排序。</li><li>将结果集返回给用户。</li></ol><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,48),u={href:"https://cloud.tencent.com/developer/article/1675434",target:"_blank",rel:"noopener noreferrer"},h={href:"https://blog.nowcoder.net/n/7806530b1e9343848024ec20e87ff8cf",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const i=t("ExternalLinkIcon");return a(),d("div",null,[c,e("p",null,[e("a",u,[n("solr索引基本原理"),l(i)])]),e("p",null,[e("a",h,[n("Solr倒排索引原理"),l(i)])])])}const p=r(o,[["render",v],["__file","solr-b-index.html.vue"]]);export{p as default};
