# 采用Redisson强化redis支持分布式场景

## 1. 简介

我们项目原本使用redis 只作为缓存使用。

我们采用redisson并不是替换redis，底层还是redis。是在应用层采用redisson 支持更丰富的功能。如

- 分布式锁
- 限流
- 发布订阅模式
- 支持集群
- 整合spring-cache

