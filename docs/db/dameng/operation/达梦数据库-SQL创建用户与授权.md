# 达梦数据库-SQL创建用户与授权

## 1. 创建用户

```SQL
create tablespace "TEST" datafile '/mypath/TEST.DBF' size 180 autoextend on maxsize 16777215 CACHE = NORMAL;
create user "TEST" identified by "mypassword" limit failed_login_attemps 3, password_lock_time 1, password_grace_time 10 default tablespace "TEST" default index tablespace "TEST";
grant "DBA","RESOURCE","PUBLIC","SOI" to "TEST";
grant CREATE SCHEMA,CREATE TABLE,CREATE VIEW,CREATE PROCEDURE,CREATE SEQUENCE,CREATE TRIGGER,CREATE INDEX,CREATE CONTEXT INDEX,CREATE LINK to "TEST";
CREATE SCHEMA "TEST" AUTHORIZATION "TEST";
```

## 2. 给其他用户授权

将A用户的视图授权给B用户

```sql
create user "B" identified by "mypassword";
grant select on "A".V_SYS_USER to B ;
grant select on "A".V_SYS_DEPT to B ;
```

