# Docker Compose入门

## 1. 简介

`Docker Compose` 是 Docker 官方编排（Orchestration）项目之一，负责快速的部署分布式应用。

### 1.1 Compose 定位:

 定义和运行多个 Docker 容器应用（Defining and running multi-container Docker applications），其前身是开源项目Fig

### 1.2 解决的问题与场景

我们知道使用一个`Dockerfile`模板文件，可以让用户很方便的定义一个单独的应用容器。然而，在日常工作中，经常会碰到**需要多个容器相互配合来完成某项任务的情况**。例如要实现一个Web项目，除了Web服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括负载均衡容器等。

**`Compose` 恰好满足这样的需求，它允许用户通过一个单独的Docker-compose.yml 模板文件（YAML格式）来定义一组关联的应用容器为一个项目（project）**

## 2. Compose 两个重要概念

- 服务（service）：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
- 项目（peoject）：由一组关联的应用容器组成的一个完整业务单元，在docker-compose.yml