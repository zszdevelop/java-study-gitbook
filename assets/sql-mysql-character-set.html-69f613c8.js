import{_ as e,W as a,X as i,a0 as d}from"./framework-0cf5f349.js";const n={},s=d(`<h1 id="mysql基础-字符集与排序规则" tabindex="-1"><a class="header-anchor" href="#mysql基础-字符集与排序规则" aria-hidden="true">#</a> MySQL基础-字符集与排序规则</h1><h2 id="_1-是什么" tabindex="-1"><a class="header-anchor" href="#_1-是什么" aria-hidden="true">#</a> 1. 是什么</h2><ul><li><p>字符集<code>character set</code>）：<strong>用来定义存储字符串的方式</strong></p><p>定义了字符以及字符编码</p><p>字符集分为几个等级： server, database, table, 和 column 。</p></li><li><p>排序规则（<code>collations</code>）：<strong>用来定义比较字符串的方式</strong></p><p>定义了字符的比较规则</p></li></ul><p>MySQL采用类似继承的方式制定字符集默认值，每个数据库每张表都有自己的默认值，他们逐层继承。如：某个库中所有表的默认字符集将是该数据库所指定的字符集（这些表在没有指定字符集的情况下，才会采用默认字符集）</p><h3 id="_1-1-排序规则的命名规则" tabindex="-1"><a class="header-anchor" href="#_1-1-排序规则的命名规则" aria-hidden="true">#</a> 1.1 排序规则的命名规则</h3><p><code>字符集名_</code>[<code>语言名_</code>]<code>类型</code> （语言名并非一定有的，后缀为 <code>_bin</code> 的就没有），并且可通过后缀来区分类型：</p><ul><li><code>_ci</code> ：大小写不敏感</li><li><code>_cs</code> ：大小写敏感</li><li><code>_bin</code> ：标识比较是基于字符编码的值，而与语言无关</li></ul><h2 id="_2-指定字符集" tabindex="-1"><a class="header-anchor" href="#_2-指定字符集" aria-hidden="true">#</a> 2. 指定字符集</h2><p>我们在命令行创建一个新的数据库时，可以通过如下命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE DATABASE 数据库名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时<strong>会使用默认</strong>的字符集及默认排序规则来创建数据库，而这个默认值可以在Mysql安装的根目录下的<code>my.ini</code> （或者 <code>my-defualt.ini</code> ）中进行配置，例如都设为 <code>utf8</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
# 服务端使用的字符集默认为UTF8
character-set-server=utf8
[mysql]
# 设置mysql客户端默认字符集(可能会有问题，只需设置上面的)
default-character-set=utf8
[client]
default-character-set=utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要在创建数据库时指定字符集和排序规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE DATABASE 数据库名 CHARACTER SET &#39;字符集，如：utf8&#39; COLLATE &#39;排序规则，如：utf8_bin&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-查询字符集和排序规则" tabindex="-1"><a class="header-anchor" href="#_3-查询字符集和排序规则" aria-hidden="true">#</a> 3. 查询字符集和排序规则</h2><p>对于已创建的数据库结构，可以通过指令来查询其使用的字符集信息。</p><h3 id="_3-1-查询各级的字符集" tabindex="-1"><a class="header-anchor" href="#_3-1-查询各级的字符集" aria-hidden="true">#</a> 3.1 查询各级的字符集</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW VARIABLES LIKE &#39;%char%&#39;;                                                                                                              +--------------------------+----------------------------------+
| Variable_name            | Value                            |
+--------------------------+----------------------------------+
| character_set_client     | utf8                             |
| character_set_connection | utf8                             |
| character_set_database   | utf8                             |
| character_set_filesystem | binary                           |
| character_set_results    | utf8                             |
| character_set_server     | utf8                             |
| character_set_system     | utf8                             |
| character_sets_dir       | /usr/local/mysql/share/charsets/ |
+--------------------------+----------------------------------+
8 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-查询对应的排序规则" tabindex="-1"><a class="header-anchor" href="#_3-2-查询对应的排序规则" aria-hidden="true">#</a> 3.2 查询对应的排序规则</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW VARIABLES LIKE &#39;%collation_%&#39;;
+----------------------+-----------------+
| Variable_name        | Value           |
+----------------------+-----------------+
| collation_connection | utf8_general_ci |
| collation_database   | utf8_general_ci |
| collation_server     | utf8_general_ci |
+----------------------+-----------------+
3 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-修改字符集和排序规则" tabindex="-1"><a class="header-anchor" href="#_4-修改字符集和排序规则" aria-hidden="true">#</a> 4. 修改字符集和排序规则</h2><h3 id="_4-1-未创建数据库" tabindex="-1"><a class="header-anchor" href="#_4-1-未创建数据库" aria-hidden="true">#</a> 4.1 未创建数据库</h3><p>可以通过在创建命令中指定字符集的方式实现修改，也可以通过修改MySQL 安装根目录下的 <code>my.ini</code> （或者 <code>my-defualt.ini</code> ）中的配置实现修改。</p><h3 id="_4-2-已创建数据库无数据" tabindex="-1"><a class="header-anchor" href="#_4-2-已创建数据库无数据" aria-hidden="true">#</a> 4.2 已创建数据库无数据</h3><p>可以使用如下指令进行修改：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ALTER DATABASE 数据库名 CHARACTER SET &#39;字符集，如：utf8&#39; COLLATE &#39;排序规则，如：utf8_bin&#39;;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-已创建且有数据的数据库" tabindex="-1"><a class="header-anchor" href="#_4-3-已创建且有数据的数据库" aria-hidden="true">#</a> 4.3 已创建且有数据的数据库</h3><p>直接修改的话只会对新创建的表或者记录有效，已存入的数据不会被修改。假如需要修改所有数据，需要将原表导出，创建新表再将旧表数据迁移过来。</p>`,28),r=[s];function l(c,t){return a(),i("div",null,r)}const v=e(n,[["render",l],["__file","sql-mysql-character-set.html.vue"]]);export{v as default};
