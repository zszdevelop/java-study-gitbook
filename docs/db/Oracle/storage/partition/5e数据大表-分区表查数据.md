# 5e数据大表，分区表查数据

分区表是按日自动创建的。



记下思路

1. 查询出该表所有分区

   ```sql
   select PARTITION_NAME, HIGH_VALUE from user_tab_partitions where table_name='DAVE';
   ```

2. 对比 HIGH_VALUE 查出近3年的所有分区值

3. 将所有分区值进行union all

   ```sql
   select * from dave partition(SYS_P53)
   UNION ALL
   select * from dave partition(SYS_P54)
   ```

   

