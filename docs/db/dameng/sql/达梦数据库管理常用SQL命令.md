# 达梦数据库管理常用 SQL 命令

```sql
--查询数据库版本
select * from  v$version;

--查询授权信息
select * from  v$license;

--查询服务器信息
select * from  V$SYSTEMINFO;

--查询会话连接信息
select * from  v$sessions;

select  count(*),state from v$sessions group by state;
select  count(*),clnt_ip from v$sessions group by clnt_ip;

--查看数据库服务器配置参数
select * from  v$dm_ini;

--查询最近的 SQL 执行记录
select * from  v$sql_history;

--查询某个用户下所有的表
select * from  user_tables; --查询当前用户下所有的表
select * from  all_tables where owner=’TEST’; --dba 用户查询某个模式下的所有表

--查询某个用户下所有表字段
select * from  all_tab_cols where owner=’TEST’;

--查看表注释
select * from  ALL_TAB_COMMENTS where ower=’TEST’;

--查看字段注释
select * from  ALL_COL_COMMENTS where ower=’TEST’;

select '实例名称' 数据库选项,INSTANCE_NAME 数据库集群相关参数值 FROM v$instance union all

select '数据库版本',substr(svr_version,instr(svr_version,'('))
FROM v$instance union all   SELECT '字符集',CASE SF_GET_UNICODE_FLAG()
WHEN '0' THEN 'GBK18030' WHEN '1' then 'UTF-8' when '2' then 'EUC-KR' end union all

SELECT '页大小',cast(PAGE()/1024 as varchar) union all   SELECT '簇大小',cast(SF_GET_EXTENT_SIZE() as varchar) union all

SELECT '大小写敏感',cast(SF_GET_CASE_SENSITIVE_FLAG() as varchar) union all

select '数据库模式',MODE$ from v$instance union all

select '唯一魔数',cast(permanent_magic as varchar) union all

select 'LSN',cast(cur_lsn as varchar) from v$rlog;
```

## 参考文章

[DM达梦数据库管理常用 SQL 命令](https://www.modb.pro/db/34627)