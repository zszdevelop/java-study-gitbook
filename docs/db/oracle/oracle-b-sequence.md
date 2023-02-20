---
order: 10
category:
  - 数据库

---

# Oracle基础-序列

create sequence SEQ_TEST

minvalue 1        --最小值

nomaxvalue        --不设置最大值

start with 1      --从1开始计数

increment by 1    --每次加1个

nocycle           --一直累加，不循环

nocache;          --不建缓冲区

## 1. 创建序列

```
create sequence seq_user
  increment by 1
  minvalue 1
  nomaxvalue
  start with 1
  nocycle 
  cache 20;
```

## 2. 修改序列的当前值的3种方式

### 2.1 **方式一：使用plsql；**

打开plsql，找到sequences

找到要修改的序列--》右键--》编辑--》更改：下一个数字的值即可。

### 2.2  **方式二：重建序列；**

错误方式：

具体步骤是：删除原来的序列，重新创建。

```sql
-- 删除序列
DROP SEQUENCE seq_sys_dept;
-- 重建序列
-- 其中，start with 后面跟的就是起始值（下次调用此序列时，将会出现的值）
CREATE SEQUENCE seq_sys_dept
    minvalue 1
    maxvalue 9999999999999999999
    INCREMENT BY 1
    START WITH 23725;
```

start with 后面跟的就是起始值（下次调用此序列时，将会出现的值） 。

### 2.3 **方式三：使用sql。**

这一个，是本文的重点；

我们由方式一可以知道：通过plsql的可视化操作界面，是可以修改的。

那plsql到底是怎么实现的？一起来看下：

选中序列--》右键--》编辑

第一步：修改起始值；

第二步：点击右下角的“查看SQL”。

说明：

起初，这里的起始值是300，我给它改成了30，实现的效果就是：

将序列的下一个值改成了30，以后序列将会从30往后叠加。

然后，看下面这张图，要实现序列起始值的修改，需要3步。

第一步：更改序列的步长；

alter sequence SEQ_META_THEME_TABLE increment by -271 nocache;

我们需要明白一个前提：

序列的值是怎么来的？

当前值+步长（增量）

所以，我们想要修改序列的当前值，就必须自改序列的增量。

第二步：查询序列值；

select SEQ_META_THEME_TABLE.nextval from dual;

这一步的目的是：改变序列的当前值，让其按照自己预设的增量来完成序列当前值的修改工作。

到这一步，该序列返回的当前值已经改成了300-271=29（下次调用将会返回30）。

第三步：将序列的增量改成1。

alter sequence SEQ_META_THEME_TABLE increment by 1 cache 20;

```sql
-- Modify the last number 
alter sequence SEQ_META_THEME_TABLE increment by -271 nocache;
select SEQ_META_THEME_TABLE.nextval from dual;
alter sequence SEQ_META_THEME_TABLE increment by 1 cache 20;
```

不信？我们把SQL复制出来，执行一下。 

把序列值变大（30-->300）

关于增量的计算：

如果更改后值(afterNum)>现在序列的下一个值(nextNum)，增量(step)=afterNum - nextNum；

如果更改后值(afterNum)<现在序列的下一个值(nextNum)，增量(step)=afterNum - nextNum - 1；

## 参考文章

[Oracle 修改序列的当前值的3种方式](http://www.manongjc.com/detail/28-blnqrnlyhtnlqul.html)
