# 一个模块中的service层能不能相互引用

## 1. 问题描述

一个项目分多模块,那么每个模块内部分为control和service以及dao三层.那么如果在某个service里要调用其他dao,是直接注入dao还是应该将需要的dao用service封装,再注入到这个service层中?

## 2. 3种写法

1. Service只调DAO

   >主要是为了松耦合，如果调用Dao还会导致循环依赖问题，springboot2.6 已经禁止了循环依赖

2. Service主调DAO，偶尔调其它Service

3. Service调其它Service，DAO只允许自己的Service调

   >每个service 中还包含了业务逻辑。

所以后来也只能看项目是什么写法，然后用什么写法。

## 3. 自己的考虑

几种方式都可以，还是根据公司历史项目情况决定，没必要太纠结。

如果实现纠结就用一个**facade封装某一具体业务**

## 参考文章

[一个模块中的service层能不能相互引用?](https://www.zhihu.com/question/27139263)