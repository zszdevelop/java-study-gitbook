# notlike优化

## 1. 简介

我们有些查询条件需要使用not like ，过滤掉不包含某些文字的数据。但dot like 会导致全表扫描。有没有什么办法既能满足我们需求又保证效率呢？

## 2. 解决

instr(title,’手册’)>0 相当于like

instr(title,’手册’)=0 相当于not like

对于LIKE语句，我们可以使用instr函数来进行SQL调优

## 参考文章

[like not like 优化](https://blog.csdn.net/weixin_30715523/article/details/101579345)