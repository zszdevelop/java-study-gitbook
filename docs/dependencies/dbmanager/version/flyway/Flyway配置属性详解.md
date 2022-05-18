# Flyway配置属性详解

## 1. 配置详解

### 1.1 数据库（核心）配置

- url ：连接数据库的jdbc的url，必须配置
- driver：连接数据库的jdbc驱动的class全名,默认为空，flyway会根据url自动查找匹配的驱动
- user：连接数据库的用户名（如果有就设置）
- password：连接数据库的用户名对应的密码（如果有就设置）

- connectRetries：连接数据库的最大的重试次数，每次尝试失败后，flyway会等待一秒然后继续重试到最大次数为止（不设置，就不重试，快速的失败）

### 1.2 数据库（非核心）配置

- initSql:连接上数据库之后的初始化sql
- defaultSchema:默认的schema，大小写敏感，是flyway在执行过程中默认的schema，flyway_schema_history包含在这个schema里面，flyway的6.1版本之后，如果没有指定schema，那么默认使用schemas属性配置的第一个schema
- schemas：使用逗号分隔，大小写敏感，除非配置的第一个schema已经存在，不然会创建所有的schema，所有的schema会按照顺序做clean操作
- **table：默认名flyway_schema_history**，如果在schemas配置了多个schema，那么flyway_schema_history表在第一个schema里面

- tablespace：创建flyway_schema_history的表空间，此设置仅与支持表空间概念的数据库相关。对其它数据库不起作用

- **locations使用逗号分隔，会对其指定的location进行递归查找**，location的类型依配置的location的前缀而定，没有前缀的location或是以classpath：标记的location会在classpath上扫描sql或是jave文件，以filesysytem标记的location会在文件系统上递归的查找非隐藏的migration文件，而且可以使用通配符

  >可以指定flyway 脚本的位置

### 1.3 flyway自身配置

- sqlMigrationPrefix：migration文件的前缀，默认为V
-  undoSqlMigrationPrefix:undo文件前缀，默认是U
-  repeatableSqlMigrationPrefix:repeat文件前缀，默认是P
-  sqlMigrationSeparator：migration文件分隔符，默认是__
-  sqlMigrationSuffixes:migration文件后缀，默认是.sql
- validateMigrationNaming：是否验证migration文件，默认是false，如果migration文件名格式不满足要求，skip，如果为true，快速失败

### 1.4 优化配置

- **stream：是否对migration文件流化处理，而不是全部的加载到内存之后再处理**(如果migration文件很大，如1GB，一般也不会遇到这样的情况)
- batch：是否对migration文件进行批处理，可以节约带宽，当然对于处理大的migration文件而言



### 其他配置

- color: 仅仅应用于命令行使用，是否可以对于输出添加颜色，默认是auto，可以有always和never其它的两个选项

- jarDirs:逗号分隔，驱动文件和基于Java的migration文件所在目录

- encoding：migration文件编码,默认UTF-8

- **placeholderReplacement：是否进行占位符替换**，默认为true

  >脚本中可能出现动态替换的情况，如时间等。这时候此配置要设置为false

- placeholderPrefix：占位符前缀，默认为${

- placeholderSuffix:占位符后缀，默认为}

- resolvers：migration文件解析器，逗号分隔的全class文件名，相当于可以扩展内置的resolvers解析器

- skipDefaultResolvers：是否skip内置的解析器只使用定制化的解析器，默认是false

- callbacks：逗号分隔的class文件名，在flyway生命周期内被回调引用

- skipDefaultCallbacks：是否skip内置的callbacks，默认false

- target：migration时数据库的版本，最好使用默认值

- outOfOrder：是否可以无序执行，维持默认即可

-  ignoreMissingMigrations：忽略丢失的migration文件，默认是false，针对老的系统可以进行设置

## 2. 配置文件模板

```
#
# Copyright 2010-2020 Boxfuse GmbH
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
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
# Aurora MySQL      : jdbc:mysql://<instance>.<region>.rds.amazonaws.com:<port>/<database>?<key1>=<value1>&<key2>=<value2>...
# Aurora PostgreSQL : jdbc:postgresql://<instance>.<region>.rds.amazonaws.com:<port>/<database>?<key1>=<value1>&<key2>=<value2>...
# CockroachDB       : jdbc:postgresql://<host>:<port>/<database>?<key1>=<value1>&<key2>=<value2>...
# DB2*              : jdbc:db2://<host>:<port>/<database>
# Derby             : jdbc:derby:<subsubprotocol>:<database><;attribute=value>
# Firebird          : jdbc:firebirdsql://<host>[:<port>]/<database>?<key1>=<value1>&<key2>=<value2>...
# H2                : jdbc:h2:<file>
# HSQLDB            : jdbc:hsqldb:file:<file>
# Informix*         : jdbc:informix-sqli://<host>:<port>/<database>:informixserver=dev
# MariaDB           : jdbc:mariadb://<host>:<port>/<database>?<key1>=<value1>&<key2>=<value2>...
# MySQL             : jdbc:mysql://<host>:<port>/<database>?<key1>=<value1>&<key2>=<value2>...
# Oracle            : jdbc:oracle:thin:@//<host>:<port>/<service>
# Oracle (TNS)**    : jdbc:oracle:thin:@<tns_entry>
# PostgreSQL        : jdbc:postgresql://<host>:<port>/<database>?<key1>=<value1>&<key2>=<value2>...
# SAP HANA*         : jdbc:sap://<host>:<port>/?databaseName=<database>
# Snowflake*        : jdbc:snowflake://<account>.snowflakecomputing.com/?db=<database>&warehouse=<warehouse>&role=<role>...
# SQL Server        : jdbc:sqlserver://<host>:<port>;databaseName=<database>
# SQLite            : jdbc:sqlite:<database>
# Sybase ASE        : jdbc:jtds:sybase://<host>:<port>/<database>
# Redshift*         : jdbc:redshift://<host>:<port>/<database>
# 连接数据库的jdbc的url，必须配置
# flyway.url=

# Fully qualified classname of the JDBC driver (autodetected by default based on flyway.url)
# 连接数据库的jdbc驱动的class全名,默认为空，flyway会根据url自动查找匹配的驱动
# flyway.driver=

# User to use to connect to the database. Flyway will prompt you to enter it if not specified, and if the JDBC
# connection is not using a password-less method of authentication.
# 连接数据库的用户名（如果有就设置）
# flyway.user=

# Password to use to connect to the database. Flyway will prompt you to enter it if not specified, and if the JDBC
# connection is not using a password-less method of authentication.
# 连接数据库的用户名对应的密码（如果有就设置）
# flyway.password=

# The maximum number of retries when attempting to connect to the database. After each failed attempt,
# Flyway will wait 1 second before attempting to connect again, up to the maximum number of times specified
# by connectRetries. (default: 0)
# 连接数据库的最大的重试次数，每次尝试失败后，flyway会等待一秒然后继续重试到最大次数为止（不设置，就不重试，快速的失败）
# flyway.connectRetries=

# The SQL statements to run to initialize a new database connection immediately after opening it. (default: none)
# 连接上数据库之后的初始化sql
# flyway.initSql=

# The default schema managed by Flyway. This schema name is case-sensitive. If not specified, but <i>flyway.schemas</i> is, Flyway uses the first schema
# in that list. If that is also not specified, Flyway uses the default schema for the database connection.
# Consequences:
# - This schema will be the one containing the schema history table.
# - This schema will be the default for the database connection (provided the database supports this concept).
# 默认的schema，大小写敏感，是flyway在执行过程中默认的schema，flyway_schema_history包含在这个schema里面，flyway的6.1版本之后，如果没有指定schema，那么默认使用schemas属性配置的第一个schema
# flyway.defaultSchema=

# Comma-separated list of schemas managed by Flyway. These schema names are case-sensitive. If not specified, Flyway uses
# the default schema for the database connection. If <i>flyway.defaultSchema</i> is not specified, then the first of
# this list also acts as default schema.
# Consequences:
# - Flyway will automatically attempt to create all these schemas, unless they already exist.
# - The schemas will be cleaned in the order of this list.
# - If Flyway created them, the schemas themselves will be dropped when cleaning.
# 使用逗号分隔，大小写敏感，除非配置的第一个schema已经存在，不然会创建所有的schema，所有的schema会按照顺序做clean操作
# flyway.schemas=

# Name of Flyway's schema history table (default: flyway_schema_history)
# By default (single-schema mode) the schema history table is placed in the default schema for the connection
# provided by the datasource.
# When the flyway.schemas property is set (multi-schema mode), the schema history table is placed in the first
# schema of the list.
# 默认名flyway_schema_history，如果在schemas配置了多个schema，那么flyway_schema_history表在第一个schema里面
# flyway.table=

# The tablespace where to create the schema history table that will be used by Flyway. If not specified, Flyway uses
# the default tablespace for the database connection.
# This setting is only relevant for databases that do support the notion of tablespaces. Its value is simply
# ignored for all others.
# 创建flyway_schema_history的表空间，此设置仅与支持表空间概念的数据库相关。对其它数据库不起作用
# flyway.tablespace=

# Comma-separated list of locations to scan recursively for migrations. (default: filesystem:<<INSTALL-DIR>>/sql)
# The location type is determined by its prefix.
# Unprefixed locations or locations starting with classpath: point to a package on the classpath and may contain
# both SQL and Java-based migrations.
# Locations starting with filesystem: point to a directory on the filesystem, may only
# contain SQL migrations and are only scanned recursively down non-hidden directories.
# locations使用逗号分隔，会对其指定的location进行递归查找，location的类型依配置的location的前缀而定，没有前缀的location或是以classpath：标记的location会在classpath上扫描sql或是jave文件，以filesysytem标记的location会在文件系统上递归的查找非隐藏的migration文件，而且可以使用通配符
# flyway.locations=

# Comma-separated list of fully qualified class names of custom MigrationResolver to use for resolving migrations.
# migration文件解析器，逗号分隔的全class文件名，相当于可以扩展内置的resolvers解析器
# flyway.resolvers=

# If set to true, default built-in resolvers (jdbc, spring-jdbc and sql) are skipped and only custom resolvers as
# defined by 'flyway.resolvers' are used. (default: false)
# 是否skip内置的解析器只使用定制化的解析器，默认是false
# flyway.skipDefaultResolvers=

# Comma-separated list of directories containing JDBC drivers and Java-based migrations.
# (default: <INSTALL-DIR>/jars)
# 逗号分隔，驱动文件和基于Java的migration文件所在目录
# flyway.jarDirs=

# File name prefix for versioned SQL migrations (default: V)
# Versioned SQL migrations have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to V1_1__My_description.sql
# migration文件的前缀，默认为V
# flyway.sqlMigrationPrefix=

# The file name prefix for undo SQL migrations. (default: U)
# Undo SQL migrations are responsible for undoing the effects of the versioned migration with the same version.
# They have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to U1.1__My_description.sql
# Flyway Pro and Flyway Enterprise only
# undo文件前缀，默认是U
# flyway.undoSqlMigrationPrefix=

# File name prefix for repeatable SQL migrations (default: R)
# Repeatable SQL migrations have the following file name structure: prefixSeparatorDESCRIPTIONsuffix ,
# which using the defaults translates to R__My_description.sql
# repeat文件前缀，默认是P
# flyway.repeatableSqlMigrationPrefix=

# File name separator for Sql migrations (default: __)
# Sql migrations have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to V1_1__My_description.sql
#migration文件分隔符，默认是__
# flyway.sqlMigrationSeparator=

# Comma-separated list of file name suffixes for SQL migrations. (default: .sql)
# SQL migrations have the following file name structure: prefixVERSIONseparatorDESCRIPTIONsuffix ,
# which using the defaults translates to V1_1__My_description.sql
# Multiple suffixes (like .sql,.pkg,.pkb) can be specified for easier compatibility with other tools such as
# editors with specific file associations.
#  migration文件后缀，默认是.sql
# flyway.sqlMigrationSuffixes=

# Whether to stream SQL migrations when executing them. (default: false)
# Streaming doesn't load the entire migration in memory at once. Instead each statement is loaded individually.
# This is particularly useful for very large SQL migrations composed of multiple MB or even GB of reference data,
# as this dramatically reduces Flyway's memory consumption.
# Flyway Pro and Flyway Enterprise only
# 是否对migration文件流化处理，而不是全部的加载到内存之后再处理(如果migration文件很大，如1GB，一般也不会遇到这样的情况)
# flyway.stream=

# Whether to batch SQL statements when executing them. (default: false)
# Batching can save up to 99 percent of network roundtrips by sending up to 100 statements at once over the
# network to the database, instead of sending each statement individually. This is particularly useful for very
# large SQL migrations composed of multiple MB or even GB of reference data, as this can dramatically reduce
# the network overhead. This is supported for INSERT, UPDATE, DELETE, MERGE and UPSERT statements.
# All other statements are automatically executed without batching.
# Flyway Pro and Flyway Enterprise only
# 是否对migration文件进行批处理，可以节约带宽，当然对于处理大的migration文件而言
# flyway.batch=

# Encoding of SQL migrations (default: UTF-8). Caution: changing the encoding after migrations have been run
# will invalidate the calculated checksums and require a `flyway repair`.
# migration文件编码,默认UTF-8
# flyway.encoding=

# Whether placeholders should be replaced. (default: true)
# 是否进行占位符替换，默认为true
# flyway.placeholderReplacement=

# Placeholders to replace in Sql migrations
# flyway.placeholders.user=
# flyway.placeholders.my_other_placeholder=

# Prefix of every placeholder (default: ${ )
# 占位符前缀，默认为${
# flyway.placeholderPrefix=

# Suffix of every placeholder (default: } )
# 占位符后缀，默认为}
# flyway.placeholderSuffix=

# Target version up to which Flyway should consider migrations.
# Defaults to 'latest'
# Special values:
# - 'current': designates the current version of the schema
# - 'latest': the latest version of the schema, as defined by the migration with the highest version
# migration时数据库的版本，最好使用默认值
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

# The description to tag an existing schema with when executing baseline. (default: << Flyway Baseline >>)
# flyway.baselineDescription=

# Whether to automatically call baseline when migrate is executed against a non-empty schema with no schema history
# table. This schema will then be initialized with the baselineVersion before executing the migrations.
# Only migrations above baselineVersion will then be applied.
# This is useful for initial Flyway production deployments on projects with an existing DB.
# Be careful when enabling this as it removes the safety net that ensures
# Flyway does not migrate the wrong database in case of a configuration mistake! (default: false)
# flyway.baselineOnMigrate=

# Allows migrations to be run "out of order" (default: false).
# If you already have versions 1 and 3 applied, and now a version 2 is found,
# it will be applied too instead of being ignored.
# 是否可以无序执行，维持默认即可
# flyway.outOfOrder=

# Whether Flyway should output a table with the results of queries when executing migrations (default: true).
# Flyway Pro and Flyway Enterprise only
# flyway.outputQueryResults=

# This allows you to tie in custom code and logic to the Flyway lifecycle notifications (default: empty).
# Set this to a comma-separated list of fully qualified class names of org.flywaydb.core.api.callback.Callback
# implementations.
# 逗号分隔的class文件名，在flyway生命周期内被回调引用
# flyway.callbacks=

# If set to true, default built-in callbacks (sql) are skipped and only custom callback as
# defined by 'flyway.callbacks' are used. (default: false)
# skipDefaultCallbacks：是否skip内置的callbacks，默认false
# flyway.skipDefaultCallbacks=

# Ignore missing migrations when reading the schema history table. These are migrations that were performed by an
# older deployment of the application that are no longer available in this version. For example: we have migrations
# available on the classpath with versions 1.0 and 3.0. The schema history table indicates that a migration with
# version 2.0 (unknown to us) has also been applied. Instead of bombing out (fail fast) with an exception, a
# warning is logged and Flyway continues normally. This is useful for situations where one must be able to deploy
# a newer version of the application even though it doesn't contain migrations included with an older one anymore.
# Note that if the most recently applied migration is removed, Flyway has no way to know it is missing and will
# mark it as future instead.
# true to continue normally and log a warning, false to fail fast with an exception. (default: false)
# 忽略丢失的migration文件，默认是false，针对老的系统可以进行设置
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
# don't contain any validation-breaking changes of migrations that have already been applied to a production
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
# 是否验证migration文件，默认是false，如果migration文件名格式不满足要求，skip，如果为true，快速失败
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
# <<blank>> for the current database user of the connection. (default: <<blank>>).
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
# <<blank>> to execute the SQL statements directly against the database. (default: <<blank>>)
# Flyway Pro and Flyway Enterprise only
# flyway.dryRunOutput=

# Whether to Flyway's support for Oracle SQL*Plus commands should be activated. (default: false)
# Flyway Pro and Flyway Enterprise only
# flyway.oracle.sqlplus=

# Whether Flyway should issue a warning instead of an error whenever it encounters an Oracle SQL*Plus
# statement it doesn't yet support. (default: false)
# Flyway Pro and Flyway Enterprise only
# flyway.oracle.sqlplusWarn=

# Your Flyway license key (FL01...). Not yet a Flyway Pro or Enterprise Edition customer?
# Request your Flyway trial license key st https://flywaydb.org/download/
# to try out Flyway Pro and Enterprise Edition features free for 30 days.
# Flyway Pro and Flyway Enterprise only
# flyway.licenseKey=
```

## 参考文章

[flyway从入门到精通（四）：flyway配置属性详解](https://www.jianshu.com/p/2c5679f268f9)