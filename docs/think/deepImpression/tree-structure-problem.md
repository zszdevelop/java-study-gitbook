# 类似部门表查询子部门树结构

## 1. 问题背景

假设类似部门表这种结构的数据有 100w条。层级大概有10层

| id   | name    | pid  |
| ---- | ------- | ---- |
| 1    | 总公司  | 0    |
| 2    | 分公司1 | 1    |
| 3    | 分公司2 | 1    |
| 4    | 部门1   | 2    |
| .... |         |      |

我们需要将部门表的转化为树结构

![image-20210522110741641](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210522110741641.png)



## 2. 问题

正常全表转树结构是没有任何问题的，但我实际想要的只有紫色框框的数据

1. 并不是每个用户都能看到所有的组织机构数据（例如分公司1只能看到分公司1下的所有数据）
2. **查询搜索**的时候也需要只查拥有的权限数据

## 3. 解决方案

### 3.1 同样全表查出后,找到自己的部 id,然后遍历出所有子树

面临的问题：数据量实在太大,我下级部门可能只有100个,但我却查了100w数据出来,去找所有子树

### 3.2 用户只查自己的单位,点击下级的时候,再查pid为自己的下级部门

问题:我搜案的时候,无法正常搜案。因为我还要知道下级的下级是否包含要搜案的数据。又得 遍历多次查询

### 3.3 新增父级路径（推荐）

只要部门父级id路径前缀（包含自己节点）相同，则为该节点的所有子节点。

![image-20210522112314946](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210522112314946.png)

## 4. 代码实现

1. Sql 语句

   1. 方式1：like

      ```sql
      select * from sys_dept
      where 1=1 
      AND ancestors like concat(#{ancestors},'%')
      ```

   2. FIND_IN_SET

      ```sql
      select * from sys_dept where FIND_IN_SET(#{deptId}, ancestors) <![CDATA[ <> ]]> 0
      ```

      >MySQL提供了一个名为`FIND_IN_SET()`的内置字符串函数，允许您在逗号分隔的字符串列表中查找指定字符串的位置。

      >oracle 没有该函数，需要自定义函数
