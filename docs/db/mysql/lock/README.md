# 锁机制锁

## 1. MyISAM 和InnoDB 存储引擎使用的锁

- MyISAM 采用的是表级锁（table-level locking）
- InnoDB 支持行级锁（row-level locking）和表级锁，默认行为是行级锁

## 2.表级锁和行级锁对比

- 表级锁

  MySQL 中锁定 **粒度最大**的一种锁，对当前**操作的整张表加锁**

  - 优势
    - 实现简单，资源消耗少，加锁快
    - 不会出现死锁
  - 缺点
    - 其锁粒度最大，触发锁冲突的概率最高
    - 并发度最低

- 行级锁

  MySQL 中锁定 **粒度最小**的一种锁，只针对当前**操作的行加锁**
  -  优势
    - 大大减少数据库操作的冲突
    - 加锁粒度小，并发度高
  - 缺点
    - 加锁的开销大
    - 加锁慢
    - 会出现死锁

## 3. InnoDB存储引擎的锁算法

- Record lock：单个行记录上的锁
- Gap lock: 间隙锁，锁定一个范围，不包括记录本身
- **Next-key lock: record+gap 锁定一个锁范围，包含记录本身**

### 3.1 相关知识点

1. innodb 对于行的查询使用next-key lock
2. next-locking keying 为了解决Phantom Problem幻读问题
3. 当查询的索引含有唯一属性时，将next-key lock降级为 record key
4. Gap 锁设计的目的是为了阻止多个事务将记录插入到同一范围内，这会导致幻读问题的产生
5. 有两种方式显示关闭gap 锁：（除了外键约束和唯一性检查外，其余情况仅使用record lock） 
   1. 将事务隔离级别设置为READ-COMMITTED
   2. 将参数innodb_locks_unsafe_for_binlog 设置为1