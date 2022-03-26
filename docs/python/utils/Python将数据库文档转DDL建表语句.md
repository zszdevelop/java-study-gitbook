# Python将数据库文档转DDL建表语句

## 1. 背景

项目启动阶段先设计了数据库文档，再将数据库文档转化为建表语句（DDL）时，无论是手写sql还是用客户端工具，都需要涉及大量的复制操作。十分劳累

## 2. 思路

将数据库word的word 复制到excel，读取excel。根据自己的业务规则读取

>读取整份数据库文档word，读取word 格式影响较大。而且涉及到的数据表太多，我们批量替换很容易出问题。还是单表操作更保险

数据库word

![image-20210518101735640](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210518101735640.png)

复制后的excel

![image-20210518101832347](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210518101832347.png)

## 3. 代码实现

提供一个思路，每个公司的数据库文档格式并不一致，适当改动即可

```python
import xlrd

if __name__ == '__main__':

    data_file = xlrd.open_workbook('temp.xls')

    # 查看工作表
    data_file.sheet_names()
    # print("sheets：" + str(data_file.sheet_names()))
    ddlSql = ""

    # 遍历所有工作表，获取对应的下标位置
    for num in range(len(data_file.sheet_names())):
        # 按照下标读取对应工作表
        sheet = data_file.sheet_by_index(num)
        # 拼接建表语句
        ddlSql += "CREATE TABLE "
        count = 0
        table_wz_name = ""
        table_yw_name = ""
        table_primary_key = "";
        for i in range(sheet.nrows):
            if count == 1:
                table_name = sheet.cell_value(i, 0).split("T_");
                table_zw_name = table_name[0]
                table_yw_name = "T_" + table_name[1]
                ddlSql += table_yw_name + "(\n"
            elif count > 2:
                zwm = sheet.cell_value(i, 1)
                ywm = sheet.cell_value(i, 2)
                gs = sheet.cell_value(i, 3)
                bz = sheet.cell_value(i, 4)
                if ywm:
                    if zwm == '主键':
                        table_primary_key = ywm
                        ddlSql += "\t" + ywm + " " + gs + " NOT NULL"
                    else:
                        ddlSql += "\t" + ywm + " " + gs
                if i == (sheet.nrows - 1):
                    ddlSql += "\n"
                else:
                    ddlSql += ",\n"
            count += 1

        ddlSql += ");"

        print("DROP TABLE " + table_yw_name + ";")
        print(ddlSql)

        if table_primary_key:
            print(
                "ALTER TABLE " + table_yw_name + " ADD CONSTRAINT PK_" + table_yw_name + " PRIMARY KEY (" + table_primary_key + ");")

        commentSql = "";
        commentSql += "COMMENT ON TABLE " + table_yw_name + " IS '" + table_zw_name + "';\n"
        count2 = 0
        # 拼接字段注释和表注释
        for j in range(sheet.nrows):
            if count2 > 2:
                zwm = sheet.cell_value(j, 1)
                ywm = sheet.cell_value(j, 2)
                gs = sheet.cell_value(j, 3)
                bz = sheet.cell_value(j, 4)
                if ywm:
                    commentSql += "COMMENT ON COLUMN " + table_yw_name + "." + ywm + " IS '" + zwm
                    if bz:
                        commentSql += "(" + bz + ")';\n";
                    else:
                        commentSql += ";\n";
            count2 += 1

        print(commentSql)

```

输出的结果

```sql
DROP TABLE T_SYS_USER;
CREATE TABLE T_SYS_USER(
	USER_ID NUMBER(20),
	DEPT_ID NUMBER(20),
	USER_NAME VARCHAR2(30),
	NICK_NAME VARCHAR2(30),
	USER_TYPE VARCHAR2(2),
	EMAIL VARCHAR2(50),
	PHONENUMBER VARCHAR2(11),
	SEX CHAR(1),
	AVATAR VARCHAR2(100),
	PASSWORD VARCHAR2(100),
	STATUS CHAR(1),
	DEL_FLAG CHAR(1),
	LOGIN_IP VARCHAR2(128),
	LOGIN_DATE DATE,
	CREATE_BY VARCHAR2(64),
	CREATE_TIME DATE,
	UPDATE_BY VARCHAR2(64),
	UPDATE_TIME DATE,
	REMARK VARCHAR2(500)
);
COMMENT ON TABLE T_SYS_USER IS '用户信息表';
COMMENT ON COLUMN T_SYS_USER.USER_ID IS '用户ID;
COMMENT ON COLUMN T_SYS_USER.DEPT_ID IS '部门ID;
COMMENT ON COLUMN T_SYS_USER.USER_NAME IS '用户账号;
COMMENT ON COLUMN T_SYS_USER.NICK_NAME IS '用户名字;
COMMENT ON COLUMN T_SYS_USER.USER_TYPE IS '用户类型(00：系统用户)';
COMMENT ON COLUMN T_SYS_USER.EMAIL IS '用户邮箱;
COMMENT ON COLUMN T_SYS_USER.PHONENUMBER IS '手机号码;
COMMENT ON COLUMN T_SYS_USER.SEX IS '用户性别(0：男，1：女，2：未知)';
COMMENT ON COLUMN T_SYS_USER.AVATAR IS '用户头像;
COMMENT ON COLUMN T_SYS_USER.PASSWORD IS '密码;
COMMENT ON COLUMN T_SYS_USER.STATUS IS '帐号状态(0：正常，1：停用)';
COMMENT ON COLUMN T_SYS_USER.DEL_FLAG IS '删除标志(0：代表存在，2：代表删除)';
COMMENT ON COLUMN T_SYS_USER.LOGIN_IP IS '最后登录IP;
COMMENT ON COLUMN T_SYS_USER.LOGIN_DATE IS '最后登录时间;
COMMENT ON COLUMN T_SYS_USER.CREATE_BY IS '创建者;
COMMENT ON COLUMN T_SYS_USER.CREATE_TIME IS '创建时间;
COMMENT ON COLUMN T_SYS_USER.UPDATE_BY IS '更新者;
COMMENT ON COLUMN T_SYS_USER.UPDATE_TIME IS '更新时间;
COMMENT ON COLUMN T_SYS_USER.REMARK IS '备注;
```



