import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,a as e,b as l,e as t,d as r,r as d}from"./app.258ed467.js";const o={},c=t(`<h1 id="flyway\u914D\u7F6E\u5C5E\u6027\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#flyway\u914D\u7F6E\u5C5E\u6027\u8BE6\u89E3" aria-hidden="true">#</a> Flyway\u914D\u7F6E\u5C5E\u6027\u8BE6\u89E3</h1><h2 id="_1-\u914D\u7F6E\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#_1-\u914D\u7F6E\u8BE6\u89E3" aria-hidden="true">#</a> 1. \u914D\u7F6E\u8BE6\u89E3</h2><h3 id="_1-1-\u6570\u636E\u5E93-\u6838\u5FC3-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_1-1-\u6570\u636E\u5E93-\u6838\u5FC3-\u914D\u7F6E" aria-hidden="true">#</a> 1.1 \u6570\u636E\u5E93\uFF08\u6838\u5FC3\uFF09\u914D\u7F6E</h3><ul><li><p>url \uFF1A\u8FDE\u63A5\u6570\u636E\u5E93\u7684jdbc\u7684url\uFF0C\u5FC5\u987B\u914D\u7F6E</p></li><li><p>driver\uFF1A\u8FDE\u63A5\u6570\u636E\u5E93\u7684jdbc\u9A71\u52A8\u7684class\u5168\u540D,\u9ED8\u8BA4\u4E3A\u7A7A\uFF0Cflyway\u4F1A\u6839\u636Eurl\u81EA\u52A8\u67E5\u627E\u5339\u914D\u7684\u9A71\u52A8</p></li><li><p>user\uFF1A\u8FDE\u63A5\u6570\u636E\u5E93\u7684\u7528\u6237\u540D\uFF08\u5982\u679C\u6709\u5C31\u8BBE\u7F6E\uFF09</p></li><li><p>password\uFF1A\u8FDE\u63A5\u6570\u636E\u5E93\u7684\u7528\u6237\u540D\u5BF9\u5E94\u7684\u5BC6\u7801\uFF08\u5982\u679C\u6709\u5C31\u8BBE\u7F6E\uFF09</p></li><li><p>connectRetries\uFF1A\u8FDE\u63A5\u6570\u636E\u5E93\u7684\u6700\u5927\u7684\u91CD\u8BD5\u6B21\u6570\uFF0C\u6BCF\u6B21\u5C1D\u8BD5\u5931\u8D25\u540E\uFF0Cflyway\u4F1A\u7B49\u5F85\u4E00\u79D2\u7136\u540E\u7EE7\u7EED\u91CD\u8BD5\u5230\u6700\u5927\u6B21\u6570\u4E3A\u6B62\uFF08\u4E0D\u8BBE\u7F6E\uFF0C\u5C31\u4E0D\u91CD\u8BD5\uFF0C\u5FEB\u901F\u7684\u5931\u8D25\uFF09</p></li></ul><h3 id="_1-2-\u6570\u636E\u5E93-\u975E\u6838\u5FC3-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_1-2-\u6570\u636E\u5E93-\u975E\u6838\u5FC3-\u914D\u7F6E" aria-hidden="true">#</a> 1.2 \u6570\u636E\u5E93\uFF08\u975E\u6838\u5FC3\uFF09\u914D\u7F6E</h3><ul><li><p>initSql:\u8FDE\u63A5\u4E0A\u6570\u636E\u5E93\u4E4B\u540E\u7684\u521D\u59CB\u5316sql</p></li><li><p>defaultSchema:\u9ED8\u8BA4\u7684schema\uFF0C\u5927\u5C0F\u5199\u654F\u611F\uFF0C\u662Fflyway\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\u9ED8\u8BA4\u7684schema\uFF0Cflyway_schema_history\u5305\u542B\u5728\u8FD9\u4E2Aschema\u91CC\u9762\uFF0Cflyway\u76846.1\u7248\u672C\u4E4B\u540E\uFF0C\u5982\u679C\u6CA1\u6709\u6307\u5B9Aschema\uFF0C\u90A3\u4E48\u9ED8\u8BA4\u4F7F\u7528schemas\u5C5E\u6027\u914D\u7F6E\u7684\u7B2C\u4E00\u4E2Aschema</p></li><li><p>schemas\uFF1A\u4F7F\u7528\u9017\u53F7\u5206\u9694\uFF0C\u5927\u5C0F\u5199\u654F\u611F\uFF0C\u9664\u975E\u914D\u7F6E\u7684\u7B2C\u4E00\u4E2Aschema\u5DF2\u7ECF\u5B58\u5728\uFF0C\u4E0D\u7136\u4F1A\u521B\u5EFA\u6240\u6709\u7684schema\uFF0C\u6240\u6709\u7684schema\u4F1A\u6309\u7167\u987A\u5E8F\u505Aclean\u64CD\u4F5C</p></li><li><p><strong>table\uFF1A\u9ED8\u8BA4\u540Dflyway_schema_history</strong>\uFF0C\u5982\u679C\u5728schemas\u914D\u7F6E\u4E86\u591A\u4E2Aschema\uFF0C\u90A3\u4E48flyway_schema_history\u8868\u5728\u7B2C\u4E00\u4E2Aschema\u91CC\u9762</p></li><li><p>tablespace\uFF1A\u521B\u5EFAflyway_schema_history\u7684\u8868\u7A7A\u95F4\uFF0C\u6B64\u8BBE\u7F6E\u4EC5\u4E0E\u652F\u6301\u8868\u7A7A\u95F4\u6982\u5FF5\u7684\u6570\u636E\u5E93\u76F8\u5173\u3002\u5BF9\u5176\u5B83\u6570\u636E\u5E93\u4E0D\u8D77\u4F5C\u7528</p></li><li><p><strong>locations\u4F7F\u7528\u9017\u53F7\u5206\u9694\uFF0C\u4F1A\u5BF9\u5176\u6307\u5B9A\u7684location\u8FDB\u884C\u9012\u5F52\u67E5\u627E</strong>\uFF0Clocation\u7684\u7C7B\u578B\u4F9D\u914D\u7F6E\u7684location\u7684\u524D\u7F00\u800C\u5B9A\uFF0C\u6CA1\u6709\u524D\u7F00\u7684location\u6216\u662F\u4EE5classpath\uFF1A\u6807\u8BB0\u7684location\u4F1A\u5728classpath\u4E0A\u626B\u63CFsql\u6216\u662Fjave\u6587\u4EF6\uFF0C\u4EE5filesysytem\u6807\u8BB0\u7684location\u4F1A\u5728\u6587\u4EF6\u7CFB\u7EDF\u4E0A\u9012\u5F52\u7684\u67E5\u627E\u975E\u9690\u85CF\u7684migration\u6587\u4EF6\uFF0C\u800C\u4E14\u53EF\u4EE5\u4F7F\u7528\u901A\u914D\u7B26</p><blockquote><p>\u53EF\u4EE5\u6307\u5B9Aflyway \u811A\u672C\u7684\u4F4D\u7F6E</p></blockquote></li></ul><h3 id="_1-3-flyway\u81EA\u8EAB\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_1-3-flyway\u81EA\u8EAB\u914D\u7F6E" aria-hidden="true">#</a> 1.3 flyway\u81EA\u8EAB\u914D\u7F6E</h3><ul><li>sqlMigrationPrefix\uFF1Amigration\u6587\u4EF6\u7684\u524D\u7F00\uFF0C\u9ED8\u8BA4\u4E3AV</li><li>undoSqlMigrationPrefix:undo\u6587\u4EF6\u524D\u7F00\uFF0C\u9ED8\u8BA4\u662FU</li><li>repeatableSqlMigrationPrefix:repeat\u6587\u4EF6\u524D\u7F00\uFF0C\u9ED8\u8BA4\u662FP</li><li>sqlMigrationSeparator\uFF1Amigration\u6587\u4EF6\u5206\u9694\u7B26\uFF0C\u9ED8\u8BA4\u662F__</li><li>sqlMigrationSuffixes:migration\u6587\u4EF6\u540E\u7F00\uFF0C\u9ED8\u8BA4\u662F.sql</li><li>validateMigrationNaming\uFF1A\u662F\u5426\u9A8C\u8BC1migration\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u662Ffalse\uFF0C\u5982\u679Cmigration\u6587\u4EF6\u540D\u683C\u5F0F\u4E0D\u6EE1\u8DB3\u8981\u6C42\uFF0Cskip\uFF0C\u5982\u679C\u4E3Atrue\uFF0C\u5FEB\u901F\u5931\u8D25</li></ul><h3 id="_1-4-\u4F18\u5316\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_1-4-\u4F18\u5316\u914D\u7F6E" aria-hidden="true">#</a> 1.4 \u4F18\u5316\u914D\u7F6E</h3><ul><li><strong>stream\uFF1A\u662F\u5426\u5BF9migration\u6587\u4EF6\u6D41\u5316\u5904\u7406\uFF0C\u800C\u4E0D\u662F\u5168\u90E8\u7684\u52A0\u8F7D\u5230\u5185\u5B58\u4E4B\u540E\u518D\u5904\u7406</strong>(\u5982\u679Cmigration\u6587\u4EF6\u5F88\u5927\uFF0C\u59821GB\uFF0C\u4E00\u822C\u4E5F\u4E0D\u4F1A\u9047\u5230\u8FD9\u6837\u7684\u60C5\u51B5)</li><li>batch\uFF1A\u662F\u5426\u5BF9migration\u6587\u4EF6\u8FDB\u884C\u6279\u5904\u7406\uFF0C\u53EF\u4EE5\u8282\u7EA6\u5E26\u5BBD\uFF0C\u5F53\u7136\u5BF9\u4E8E\u5904\u7406\u5927\u7684migration\u6587\u4EF6\u800C\u8A00</li></ul><h3 id="\u5176\u4ED6\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u914D\u7F6E" aria-hidden="true">#</a> \u5176\u4ED6\u914D\u7F6E</h3><ul><li><p>color: \u4EC5\u4EC5\u5E94\u7528\u4E8E\u547D\u4EE4\u884C\u4F7F\u7528\uFF0C\u662F\u5426\u53EF\u4EE5\u5BF9\u4E8E\u8F93\u51FA\u6DFB\u52A0\u989C\u8272\uFF0C\u9ED8\u8BA4\u662Fauto\uFF0C\u53EF\u4EE5\u6709always\u548Cnever\u5176\u5B83\u7684\u4E24\u4E2A\u9009\u9879</p></li><li><p>jarDirs:\u9017\u53F7\u5206\u9694\uFF0C\u9A71\u52A8\u6587\u4EF6\u548C\u57FA\u4E8EJava\u7684migration\u6587\u4EF6\u6240\u5728\u76EE\u5F55</p></li><li><p>encoding\uFF1Amigration\u6587\u4EF6\u7F16\u7801,\u9ED8\u8BA4UTF-8</p></li><li><p><strong>placeholderReplacement\uFF1A\u662F\u5426\u8FDB\u884C\u5360\u4F4D\u7B26\u66FF\u6362</strong>\uFF0C\u9ED8\u8BA4\u4E3Atrue</p><blockquote><p>\u811A\u672C\u4E2D\u53EF\u80FD\u51FA\u73B0\u52A8\u6001\u66FF\u6362\u7684\u60C5\u51B5\uFF0C\u5982\u65F6\u95F4\u7B49\u3002\u8FD9\u65F6\u5019\u6B64\u914D\u7F6E\u8981\u8BBE\u7F6E\u4E3Afalse</p></blockquote></li><li><p>placeholderPrefix\uFF1A\u5360\u4F4D\u7B26\u524D\u7F00\uFF0C\u9ED8\u8BA4\u4E3A\${</p></li><li><p>placeholderSuffix:\u5360\u4F4D\u7B26\u540E\u7F00\uFF0C\u9ED8\u8BA4\u4E3A}</p></li><li><p>resolvers\uFF1Amigration\u6587\u4EF6\u89E3\u6790\u5668\uFF0C\u9017\u53F7\u5206\u9694\u7684\u5168class\u6587\u4EF6\u540D\uFF0C\u76F8\u5F53\u4E8E\u53EF\u4EE5\u6269\u5C55\u5185\u7F6E\u7684resolvers\u89E3\u6790\u5668</p></li><li><p>skipDefaultResolvers\uFF1A\u662F\u5426skip\u5185\u7F6E\u7684\u89E3\u6790\u5668\u53EA\u4F7F\u7528\u5B9A\u5236\u5316\u7684\u89E3\u6790\u5668\uFF0C\u9ED8\u8BA4\u662Ffalse</p></li><li><p>callbacks\uFF1A\u9017\u53F7\u5206\u9694\u7684class\u6587\u4EF6\u540D\uFF0C\u5728flyway\u751F\u547D\u5468\u671F\u5185\u88AB\u56DE\u8C03\u5F15\u7528</p></li><li><p>skipDefaultCallbacks\uFF1A\u662F\u5426skip\u5185\u7F6E\u7684callbacks\uFF0C\u9ED8\u8BA4false</p></li><li><p>target\uFF1Amigration\u65F6\u6570\u636E\u5E93\u7684\u7248\u672C\uFF0C\u6700\u597D\u4F7F\u7528\u9ED8\u8BA4\u503C</p></li><li><p>outOfOrder\uFF1A\u662F\u5426\u53EF\u4EE5\u65E0\u5E8F\u6267\u884C\uFF0C\u7EF4\u6301\u9ED8\u8BA4\u5373\u53EF</p></li><li><p>ignoreMissingMigrations\uFF1A\u5FFD\u7565\u4E22\u5931\u7684migration\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u662Ffalse\uFF0C\u9488\u5BF9\u8001\u7684\u7CFB\u7EDF\u53EF\u4EE5\u8FDB\u884C\u8BBE\u7F6E</p></li></ul><h2 id="_2-\u914D\u7F6E\u6587\u4EF6\u6A21\u677F" tabindex="-1"><a class="header-anchor" href="#_2-\u914D\u7F6E\u6587\u4EF6\u6A21\u677F" aria-hidden="true">#</a> 2. \u914D\u7F6E\u6587\u4EF6\u6A21\u677F</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#
# Copyright 2010-2020 Boxfuse GmbH
#
# Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# JDBC url to use to connect to the database
# Examples
# --------
# Most drivers are included out of the box.
# * = JDBC driver must be downloaded and installed in /drivers manually
# ** = TNS_ADMIN environment variable must point to the directory of where tnsnames.ora resides
# Aurora MySQL      : jdbc:mysql://&lt;instance&gt;.&lt;region&gt;.rds.amazonaws.com:&lt;port&gt;/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# Aurora PostgreSQL : jdbc:postgresql://&lt;instance&gt;.&lt;region&gt;.rds.amazonaws.com:&lt;port&gt;/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# CockroachDB       : jdbc:postgresql://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# DB2*              : jdbc:db2://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;
# Derby             : jdbc:derby:&lt;subsubprotocol&gt;:&lt;database&gt;&lt;;attribute=value&gt;
# Firebird          : jdbc:firebirdsql://&lt;host&gt;[:&lt;port&gt;]/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# H2                : jdbc:h2:&lt;file&gt;
# HSQLDB            : jdbc:hsqldb:file:&lt;file&gt;
# Informix*         : jdbc:informix-sqli://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;:informixserver=dev
# MariaDB           : jdbc:mariadb://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# MySQL             : jdbc:mysql://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# Oracle            : jdbc:oracle:thin:@//&lt;host&gt;:&lt;port&gt;/&lt;service&gt;
# Oracle (TNS)**    : jdbc:oracle:thin:@&lt;tns_entry&gt;
# PostgreSQL        : jdbc:postgresql://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;?&lt;key1&gt;=&lt;value1&gt;&amp;&lt;key2&gt;=&lt;value2&gt;...
# SAP HANA*         : jdbc:sap://&lt;host&gt;:&lt;port&gt;/?databaseName=&lt;database&gt;
# Snowflake*        : jdbc:snowflake://&lt;account&gt;.snowflakecomputing.com/?db=&lt;database&gt;&amp;warehouse=&lt;warehouse&gt;&amp;role=&lt;role&gt;...
# SQL Server        : jdbc:sqlserver://&lt;host&gt;:&lt;port&gt;;databaseName=&lt;database&gt;
# SQLite            : jdbc:sqlite:&lt;database&gt;
# Sybase ASE        : jdbc:jtds:sybase://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;
# Redshift*         : jdbc:redshift://&lt;host&gt;:&lt;port&gt;/&lt;database&gt;
# \u8FDE\u63A5\u6570\u636E\u5E93\u7684jdbc\u7684url\uFF0C\u5FC5\u987B\u914D\u7F6E
# flyway.url=

# Fully qualified classname of the JDBC driver (autodetected by default based on flyway.url)
# \u8FDE\u63A5\u6570\u636E\u5E93\u7684jdbc\u9A71\u52A8\u7684class\u5168\u540D,\u9ED8\u8BA4\u4E3A\u7A7A\uFF0Cflyway\u4F1A\u6839\u636Eurl\u81EA\u52A8\u67E5\u627E\u5339\u914D\u7684\u9A71\u52A8
# flyway.driver=

# User to use to connect to the database. Flyway will prompt you to enter it if not specified, and if the JDBC
# connection is not using a password-less method of authentication.
# \u8FDE\u63A5\u6570\u636E\u5E93\u7684\u7528\u6237\u540D\uFF08\u5982\u679C\u6709\u5C31\u8BBE\u7F6E\uFF09
# flyway.user=

# Password to use to connect to the database. Flyway will prompt you to enter it if not specified, and if the JDBC
# connection is not using a password-less method of authentication.
# \u8FDE\u63A5\u6570\u636E\u5E93\u7684\u7528\u6237\u540D\u5BF9\u5E94\u7684\u5BC6\u7801\uFF08\u5982\u679C\u6709\u5C31\u8BBE\u7F6E\uFF09
# flyway.password=

# The maximum number of retries when attempting to connect to the database. After each failed attempt,
# Flyway will wait 1 second before attempting to connect again, up to the maximum number of times specified
# by connectRetries. (default: 0)
# \u8FDE\u63A5\u6570\u636E\u5E93\u7684\u6700\u5927\u7684\u91CD\u8BD5\u6B21\u6570\uFF0C\u6BCF\u6B21\u5C1D\u8BD5\u5931\u8D25\u540E\uFF0Cflyway\u4F1A\u7B49\u5F85\u4E00\u79D2\u7136\u540E\u7EE7\u7EED\u91CD\u8BD5\u5230\u6700\u5927\u6B21\u6570\u4E3A\u6B62\uFF08\u4E0D\u8BBE\u7F6E\uFF0C\u5C31\u4E0D\u91CD\u8BD5\uFF0C\u5FEB\u901F\u7684\u5931\u8D25\uFF09
# flyway.connectRetries=

# The SQL statements to run to initialize a new database connection immediately after opening it. (default: none)
# \u8FDE\u63A5\u4E0A\u6570\u636E\u5E93\u4E4B\u540E\u7684\u521D\u59CB\u5316sql
# flyway.initSql=

# The default schema managed by Flyway. This schema name is case-sensitive. If not specified, but &lt;i&gt;flyway.schemas&lt;/i&gt; is, Flyway uses the first schema
# in that list. If that is also not specified, Flyway uses the default schema for the database connection.
# Consequences:
# - This schema will be the one containing the schema history table.
# - This schema will be the default for the database connection (provided the database supports this concept).
# \u9ED8\u8BA4\u7684schema\uFF0C\u5927\u5C0F\u5199\u654F\u611F\uFF0C\u662Fflyway\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\u9ED8\u8BA4\u7684schema\uFF0Cflyway_schema_history\u5305\u542B\u5728\u8FD9\u4E2Aschema\u91CC\u9762\uFF0Cflyway\u76846.1\u7248\u672C\u4E4B\u540E\uFF0C\u5982\u679C\u6CA1\u6709\u6307\u5B9Aschema\uFF0C\u90A3\u4E48\u9ED8\u8BA4\u4F7F\u7528schemas\u5C5E\u6027\u914D\u7F6E\u7684\u7B2C\u4E00\u4E2Aschema
# flyway.defaultSchema=

# Comma-separated list of schemas managed by Flyway. These schema names are case-sensitive. If not specified, Flyway uses
# the default schema for the database connection. If &lt;i&gt;flyway.defaultSchema&lt;/i&gt; is not specified, then the first of
# this list also acts as default schema.
# Consequences:
# - Flyway will automatically attempt to create all these schemas, unless they already exist.
# - The schemas will be cleaned in the order of this list.
# - If Flyway created them, the schemas themselves will be dropped when cleaning.
# \u4F7F\u7528\u9017\u53F7\u5206\u9694\uFF0C\u5927\u5C0F\u5199\u654F\u611F\uFF0C\u9664\u975E\u914D\u7F6E\u7684\u7B2C\u4E00\u4E2Aschema\u5DF2\u7ECF\u5B58\u5728\uFF0C\u4E0D\u7136\u4F1A\u521B\u5EFA\u6240\u6709\u7684schema\uFF0C\u6240\u6709\u7684schema\u4F1A\u6309\u7167\u987A\u5E8F\u505Aclean\u64CD\u4F5C
# flyway.schemas=

# Name of Flyway&#39;s schema history table (default: flyway_schema_history)
# By default (single-schema mode) the schema history table is placed in the default schema for the connection
# provided by the datasource.
# When the flyway.schemas property is set (multi-schema mode), the schema history table is placed in the first
# schema of the list.
# \u9ED8\u8BA4\u540Dflyway_schema_history\uFF0C\u5982\u679C\u5728schemas\u914D\u7F6E\u4E86\u591A\u4E2Aschema\uFF0C\u90A3\u4E48flyway_schema_history\u8868\u5728\u7B2C\u4E00\u4E2Aschema\u91CC\u9762
# flyway.table=

# The tablespace where to create the schema history table that will be used by Flyway. If not specified, Flyway uses
# the default tablespace for the database connection.
# This setting is only relevant for databases that do support the notion of tablespaces. Its value is simply
# ignored for all others.
# \u521B\u5EFAflyway_schema_history\u7684\u8868\u7A7A\u95F4\uFF0C\u6B64\u8BBE\u7F6E\u4EC5\u4E0E\u652F\u6301\u8868\u7A7A\u95F4\u6982\u5FF5\u7684\u6570\u636E\u5E93\u76F8\u5173\u3002\u5BF9\u5176\u5B83\u6570\u636E\u5E93\u4E0D\u8D77\u4F5C\u7528
# flyway.tablespace=

# Comma-separated list of locations to scan recursively for migrations. (default: filesystem:&lt;&lt;INSTALL-DIR&gt;&gt;/sql)
# The location type is determined by its prefix.
# Unprefixed locations or locations starting with classpath: point to a package on the classpath and may contain
# both SQL and Java-based migrations.
# Locations starting with filesystem: point to a directory on the filesystem, may only
# contain SQL migrations and are only scanned recursively down non-hidden directories.
# locations\u4F7F\u7528\u9017\u53F7\u5206\u9694\uFF0C\u4F1A\u5BF9\u5176\u6307\u5B9A\u7684location\u8FDB\u884C\u9012\u5F52\u67E5\u627E\uFF0Clocation\u7684\u7C7B\u578B\u4F9D\u914D\u7F6E\u7684location\u7684\u524D\u7F00\u800C\u5B9A\uFF0C\u6CA1\u6709\u524D\u7F00\u7684location\u6216\u662F\u4EE5classpath\uFF1A\u6807\u8BB0\u7684location\u4F1A\u5728classpath\u4E0A\u626B\u63CFsql\u6216\u662Fjave\u6587\u4EF6\uFF0C\u4EE5filesysytem\u6807\u8BB0\u7684location\u4F1A\u5728\u6587\u4EF6\u7CFB\u7EDF\u4E0A\u9012\u5F52\u7684\u67E5\u627E\u975E\u9690\u85CF\u7684migration\u6587\u4EF6\uFF0C\u800C\u4E14\u53EF\u4EE5\u4F7F\u7528\u901A\u914D\u7B26
# flyway.locations=

# Comma-separated list of fully qualified class names of custom MigrationResolver to use for resolving migrations.
# migration\u6587\u4EF6\u89E3\u6790\u5668\uFF0C\u9017\u53F7\u5206\u9694\u7684\u5168class\u6587\u4EF6\u540D\uFF0C\u76F8\u5F53\u4E8E\u53EF\u4EE5\u6269\u5C55\u5185\u7F6E\u7684resolvers\u89E3\u6790\u5668
# flyway.resolvers=

# If set to true, default built-in resolvers (jdbc, spring-jdbc and sql) are skipped and only custom resolvers as
# defined by &#39;flyway.resolvers&#39; are used. (default: false)
# \u662F\u5426skip\u5185\u7F6E\u7684\u89E3\u6790\u5668\u53EA\u4F7F\u7528\u5B9A\u5236\u5316\u7684\u89E3\u6790\u5668\uFF0C\u9ED8\u8BA4\u662Ffalse
# flyway.skipDefaultResolvers=

# Comma-separated list of directories containing JDBC drivers and Java-based migrations.
# (default: &lt;INSTALL-DIR&gt;/jars)
# \u9017\u53F7\u5206\u9694\uFF0C\u9A71\u52A8\u6587\u4EF6\u548C\u57FA\u4E8EJava\u7684migration\u6587\u4EF6\u6240\u5728\u76EE\u5F55
# flyway.jarDirs=

# File name prefix for versioned SQL migrations (default: V)
# Versioned SQL migrations have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to V1_1__My_description.sql
# migration\u6587\u4EF6\u7684\u524D\u7F00\uFF0C\u9ED8\u8BA4\u4E3AV
# flyway.sqlMigrationPrefix=

# The file name prefix for undo SQL migrations. (default: U)
# Undo SQL migrations are responsible for undoing the effects of the versioned migration with the same version.
# They have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to U1.1__My_description.sql
# Flyway Pro and Flyway Enterprise only
# undo\u6587\u4EF6\u524D\u7F00\uFF0C\u9ED8\u8BA4\u662FU
# flyway.undoSqlMigrationPrefix=

# File name prefix for repeatable SQL migrations (default: R)
# Repeatable SQL migrations have the following file name structure: prefixSeparatorDESCRIPTIONsuffix ,
# which using the defaults translates to R__My_description.sql
# repeat\u6587\u4EF6\u524D\u7F00\uFF0C\u9ED8\u8BA4\u662FP
# flyway.repeatableSqlMigrationPrefix=

# File name separator for Sql migrations (default: __)
# Sql migrations have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to V1_1__My_description.sql
#migration\u6587\u4EF6\u5206\u9694\u7B26\uFF0C\u9ED8\u8BA4\u662F__
# flyway.sqlMigrationSeparator=

# Comma-separated list of file name suffixes for SQL migrations. (default: .sql)
# SQL migrations have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to V1_1__My_description.sql
# Multiple suffixes (like .sql,.pkg,.pkb) can be specified for easier compatibility with other tools such as
# editors with specific file associations.
#  migration\u6587\u4EF6\u540E\u7F00\uFF0C\u9ED8\u8BA4\u662F.sql
# flyway.sqlMigrationSuffixes=

# Whether to stream SQL migrations when executing them. (default: false)
# Streaming doesn&#39;t load the entire migration in memory at once. Instead each statement is loaded individually.
# This is particularly useful for very large SQL migrations composed of multiple MB or even GB of reference data,
# as this dramatically reduces Flyway&#39;s memory consumption.
# Flyway Pro and Flyway Enterprise only
# \u662F\u5426\u5BF9migration\u6587\u4EF6\u6D41\u5316\u5904\u7406\uFF0C\u800C\u4E0D\u662F\u5168\u90E8\u7684\u52A0\u8F7D\u5230\u5185\u5B58\u4E4B\u540E\u518D\u5904\u7406(\u5982\u679Cmigration\u6587\u4EF6\u5F88\u5927\uFF0C\u59821GB\uFF0C\u4E00\u822C\u4E5F\u4E0D\u4F1A\u9047\u5230\u8FD9\u6837\u7684\u60C5\u51B5)
# flyway.stream=

# Whether to batch SQL statements when executing them. (default: false)
# Batching can save up to 99 percent of network roundtrips by sending up to 100 statements at once over the
# network to the database, instead of sending each statement individually. This is particularly useful for very
# large SQL migrations composed of multiple MB or even GB of reference data, as this can dramatically reduce
# the network overhead. This is supported for INSERT, UPDATE, DELETE, MERGE and UPSERT statements.
# All other statements are automatically executed without batching.
# Flyway Pro and Flyway Enterprise only
# \u662F\u5426\u5BF9migration\u6587\u4EF6\u8FDB\u884C\u6279\u5904\u7406\uFF0C\u53EF\u4EE5\u8282\u7EA6\u5E26\u5BBD\uFF0C\u5F53\u7136\u5BF9\u4E8E\u5904\u7406\u5927\u7684migration\u6587\u4EF6\u800C\u8A00
# flyway.batch=

# Encoding of SQL migrations (default: UTF-8). Caution: changing the encoding after migrations have been run
# will invalidate the calculated checksums and require a \`flyway repair\`.
# migration\u6587\u4EF6\u7F16\u7801,\u9ED8\u8BA4UTF-8
# flyway.encoding=

# Whether placeholders should be replaced. (default: true)
# \u662F\u5426\u8FDB\u884C\u5360\u4F4D\u7B26\u66FF\u6362\uFF0C\u9ED8\u8BA4\u4E3Atrue
# flyway.placeholderReplacement=

# Placeholders to replace in Sql migrations
# flyway.placeholders.user=
# flyway.placeholders.my_other_placeholder=

# Prefix of every placeholder (default: \${ )
# \u5360\u4F4D\u7B26\u524D\u7F00\uFF0C\u9ED8\u8BA4\u4E3A\${
# flyway.placeholderPrefix=

# Suffix of every placeholder (default: } )
# \u5360\u4F4D\u7B26\u540E\u7F00\uFF0C\u9ED8\u8BA4\u4E3A}
# flyway.placeholderSuffix=

# Target version up to which Flyway should consider migrations.
# Defaults to &#39;latest&#39;
# Special values:
# - &#39;current&#39;: designates the current version of the schema
# - &#39;latest&#39;: the latest version of the schema, as defined by the migration with the highest version
# migration\u65F6\u6570\u636E\u5E93\u7684\u7248\u672C\uFF0C\u6700\u597D\u4F7F\u7528\u9ED8\u8BA4\u503C
# flyway.target=

# Whether to automatically call validate or not when running migrate. (default: true)
# flyway.validateOnMigrate=

# Whether to automatically call clean or not when a validation error occurs. (default: false)
# This is exclusively intended as a convenience for development. even though we
# strongly recommend not to change migration scripts once they have been checked into SCM and run, this provides a
# way of dealing with this case in a smooth manner. The database will be wiped clean automatically, ensuring that
# the next migration will bring you back to the state checked into SCM.
# Warning ! Do not enable in production !
# flyway.cleanOnValidationError=

# Whether to disable clean. (default: false)
# This is especially useful for production environments where running clean can be quite a career limiting move.
# flyway.cleanDisabled=

# The version to tag an existing schema with when executing baseline. (default: 1)
# flyway.baselineVersion=

# The description to tag an existing schema with when executing baseline. (default: &lt;&lt; Flyway Baseline &gt;&gt;)
# flyway.baselineDescription=

# Whether to automatically call baseline when migrate is executed against a non-empty schema with no schema history
# table. This schema will then be initialized with the baselineVersion before executing the migrations.
# Only migrations above baselineVersion will then be applied.
# This is useful for initial Flyway production deployments on projects with an existing DB.
# Be careful when enabling this as it removes the safety net that ensures
# Flyway does not migrate the wrong database in case of a configuration mistake! (default: false)
# flyway.baselineOnMigrate=

# Allows migrations to be run &quot;out of order&quot; (default: false).
# If you already have versions 1 and 3 applied, and now a version 2 is found,
# it will be applied too instead of being ignored.
# \u662F\u5426\u53EF\u4EE5\u65E0\u5E8F\u6267\u884C\uFF0C\u7EF4\u6301\u9ED8\u8BA4\u5373\u53EF
# flyway.outOfOrder=

# Whether Flyway should output a table with the results of queries when executing migrations (default: true).
# Flyway Pro and Flyway Enterprise only
# flyway.outputQueryResults=

# This allows you to tie in custom code and logic to the Flyway lifecycle notifications (default: empty).
# Set this to a comma-separated list of fully qualified class names of org.flywaydb.core.api.callback.Callback
# implementations.
# \u9017\u53F7\u5206\u9694\u7684class\u6587\u4EF6\u540D\uFF0C\u5728flyway\u751F\u547D\u5468\u671F\u5185\u88AB\u56DE\u8C03\u5F15\u7528
# flyway.callbacks=

# If set to true, default built-in callbacks (sql) are skipped and only custom callback as
# defined by &#39;flyway.callbacks&#39; are used. (default: false)
# skipDefaultCallbacks\uFF1A\u662F\u5426skip\u5185\u7F6E\u7684callbacks\uFF0C\u9ED8\u8BA4false
# flyway.skipDefaultCallbacks=

# Ignore missing migrations when reading the schema history table. These are migrations that were performed by an
# older deployment of the application that are no longer available in this version. For example: we have migrations
# available on the classpath with versions 1.0 and 3.0. The schema history table indicates that a migration with
# version 2.0 (unknown to us) has also been applied. Instead of bombing out (fail fast) with an exception, a
# warning is logged and Flyway continues normally. This is useful for situations where one must be able to deploy
# a newer version of the application even though it doesn&#39;t contain migrations included with an older one anymore.
# Note that if the most recently applied migration is removed, Flyway has no way to know it is missing and will
# mark it as future instead.
# true to continue normally and log a warning, false to fail fast with an exception. (default: false)
# \u5FFD\u7565\u4E22\u5931\u7684migration\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u662Ffalse\uFF0C\u9488\u5BF9\u8001\u7684\u7CFB\u7EDF\u53EF\u4EE5\u8FDB\u884C\u8BBE\u7F6E
# flyway.ignoreMissingMigrations=

# Ignore ignored migrations when reading the schema history table. These are migrations that were added in between
# already migrated migrations in this version. For example: we have migrations available on the classpath with
# versions from 1.0 to 3.0. The schema history table indicates that version 1 was finished on 1.0.15, and the next
# one was 2.0.0. But with the next release a new migration was added to version 1: 1.0.16. Such scenario is ignored
# by migrate command, but by default is rejected by validate. When ignoreIgnoredMigrations is enabled, such case
# will not be reported by validate command. This is useful for situations where one must be able to deliver
# complete set of migrations in a delivery package for multiple versions of the product, and allows for further
# development of older versions.
# true to continue normally, false to fail fast with an exception. (default: false)
# flyway.ignoreIgnoredMigrations=

# Ignore pending migrations when reading the schema history table. These are migrations that are available
# but have not yet been applied. This can be useful for verifying that in-development migration changes
# don&#39;t contain any validation-breaking changes of migrations that have already been applied to a production
# environment, e.g. as part of a CI/CD process, without failing because of the existence of new migration versions.
# (default: false)
# flyway.ignorePendingMigrations=

# Ignore future migrations when reading the schema history table. These are migrations that were performed by a
# newer deployment of the application that are not yet available in this version. For example: we have migrations
# available on the classpath up to version 3.0. The schema history table indicates that a migration to version 4.0
# (unknown to us) has already been applied. Instead of bombing out (fail fast) with an exception, a
# warning is logged and Flyway continues normally. This is useful for situations where one must be able to redeploy
# an older version of the application after the database has been migrated by a newer one.
# true to continue normally and log a warning, false to fail fast with an exception. (default: true)
# flyway.ignoreFutureMigrations=

# Whether to validate migrations and callbacks whose scripts do not obey the correct naming convention. A failure can be
# useful to check that errors such as case sensitivity in migration prefixes have been corrected.
# false to continue normally, true to fail fast with an exception (default: false)
# \u662F\u5426\u9A8C\u8BC1migration\u6587\u4EF6\uFF0C\u9ED8\u8BA4\u662Ffalse\uFF0C\u5982\u679Cmigration\u6587\u4EF6\u540D\u683C\u5F0F\u4E0D\u6EE1\u8DB3\u8981\u6C42\uFF0Cskip\uFF0C\u5982\u679C\u4E3Atrue\uFF0C\u5FEB\u901F\u5931\u8D25
# flyway.validateMigrationNaming=

# Whether to allow mixing transactional and non-transactional statements within the same migration. Enabling this
# automatically causes the entire affected migration to be run without a transaction.
# Note that this is only applicable for PostgreSQL, Aurora PostgreSQL, SQL Server and SQLite which all have
# statements that do not run at all within a transaction.
# This is not to be confused with implicit transaction, as they occur in MySQL or Oracle, where even though a
# DDL statement was run within within a transaction, the database will issue an implicit commit before and after
# its execution.
# true if mixed migrations should be allowed. false if an error should be thrown instead. (default: false)
# flyway.mixed=

# Whether to group all pending migrations together in the same transaction when applying them
# (only recommended for databases with support for DDL transactions).
# true if migrations should be grouped. false if they should be applied individually instead. (default: false)
# flyway.group=

# The username that will be recorded in the schema history table as having applied the migration.
# &lt;&lt;blank&gt;&gt; for the current database user of the connection. (default: &lt;&lt;blank&gt;&gt;).
# flyway.installedBy=

# Rules for the built-in error handler that let you override specific SQL states and errors codes in order to
# force specific errors or warnings to be treated as debug messages, info messages, warnings or errors.
# Each error override has the following format: STATE:12345:W.
# It is a 5 character SQL state (or * to match all SQL states), a colon,
# the SQL error code (or * to match all SQL error codes), a colon and finally
# the desired behavior that should override the initial one.
# The following behaviors are accepted:
# - D to force a debug message
# - D- to force a debug message, but do not show the original sql state and error code
# - I to force an info message
# - I- to force an info message, but do not show the original sql state and error code
# - W to force a warning
# - W- to force a warning, but do not show the original sql state and error code
# - E to force an error
# - E- to force an error, but do not show the original sql state and error code
# Example 1: to force Oracle stored procedure compilation issues to produce
# errors instead of warnings, the following errorOverride can be used: 99999:17110:E
# Example 2: to force SQL Server PRINT messages to be displayed as info messages (without SQL state and error
# code details) instead of warnings, the following errorOverride can be used: S0001:0:I-
# Example 3: to force all errors with SQL error code 123 to be treated as warnings instead,
# the following errorOverride can be used: *:123:W
# Flyway Pro and Flyway Enterprise only
# flyway.errorOverrides=

# The file where to output the SQL statements of a migration dry run. If the file specified is in a non-existent
# directory, Flyway will create all directories and parent directories as needed.
# &lt;&lt;blank&gt;&gt; to execute the SQL statements directly against the database. (default: &lt;&lt;blank&gt;&gt;)
# Flyway Pro and Flyway Enterprise only
# flyway.dryRunOutput=

# Whether to Flyway&#39;s support for Oracle SQL*Plus commands should be activated. (default: false)
# Flyway Pro and Flyway Enterprise only
# flyway.oracle.sqlplus=

# Whether Flyway should issue a warning instead of an error whenever it encounters an Oracle SQL*Plus
# statement it doesn&#39;t yet support. (default: false)
# Flyway Pro and Flyway Enterprise only
# flyway.oracle.sqlplusWarn=

# Your Flyway license key (FL01...). Not yet a Flyway Pro or Enterprise Edition customer?
# Request your Flyway trial license key st https://flywaydb.org/download/
# to try out Flyway Pro and Enterprise Edition features free for 30 days.
# Flyway Pro and Flyway Enterprise only
# flyway.licenseKey=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,15),v={href:"https://www.jianshu.com/p/2c5679f268f9",target:"_blank",rel:"noopener noreferrer"},u=r("flyway\u4ECE\u5165\u95E8\u5230\u7CBE\u901A\uFF08\u56DB\uFF09\uFF1Aflyway\u914D\u7F6E\u5C5E\u6027\u8BE6\u89E3");function m(b,h){const i=d("ExternalLinkIcon");return a(),s("div",null,[c,e("p",null,[e("a",v,[u,l(i)])])])}const g=n(o,[["render",m],["__file","flyway-x-attr.html.vue"]]);export{g as default};
