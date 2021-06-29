# Oracle 自定义函数语法

##  1. 语法

**Oracle自定义函数的语法如下：**

```sql
create or replace function 函数名(参数1 模式 参数类型)
return 返回值类型
as
变量1 变量类型;
变量2 变量类型;
begin
    函数体;
end 函数名;

```

 参数的模式有3种:(如果没有注明, 参数默认的类型为 in.)

- in: 为只读模式, 在函数中, 参数的值只能被引用, 不能被改变;

- out: 为只写模式, 只能被赋值, 不能被引用;

- in out:  可读可写.

提醒:

1. 在Oracle自定义函数中, else if 的正确写法是 elsif 而不是 else if
2. 使用 if 需要加 then  "if 条件 then 操作"
   

## 2. 示例

### 2.1 代替MYSQL的FIND_IN_SET

```sql
-- ----------------------------
-- 函数 ，代替MYSQL的FIND_IN_SET
-- 例如： SELECT * FROM SYS_DEPT WHERE FIND_IN_SET (101,ANCESTORS) <> 0
-- MYSQL可接受0或其它NUMBER做为WHERE 条件，ORACLE只接受表达式做为WHERE 条件
-- ----------------------------
CREATE OR REPLACE FUNCTION FIND_IN_SET(ARG1 IN VARCHAR2,ARG2 IN VARCHAR)
RETURN NUMBER IS RESULT NUMBER;
BEGIN
SELECT INSTR(','||ARG2||',' , ','||ARG1||',') INTO RESULT FROM DUAL;
RETURN(RESULT);
END FIND_IN_SET;
```

### 2.2 读入两个值, 返回比较大的值

```sql
create or replace function function1(para1 in number, para2 in number) 
return number 
as 
begin
  if para1 > para2 then
      return para1;
  else
      return para2; 
  end if;
end function1;

```

使用

```sql
select function1(666, 333) from dual;
```

## 参考文章

[Oracle 自定义函数语法与实例](https://blog.csdn.net/libertine1993/article/details/47264211)

