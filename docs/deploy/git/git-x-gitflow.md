# git工作流

## 1. 简介

Git 有多种工作流方式，我们接下来就介绍几种常见的工作流，以便大家选择最适合自己的方式。

## 2. 常见工作流

### 2.1 主干开发

严格意义上说他并不算工作流，所有提交都在主干上

![image-20211209213253441](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213253441.png)

#### 2.1.1 优势

- 方便，所有都提交到master
- 适合一些小组件/工具

#### 2.1.2 缺陷

- 缺乏有效管理

### 2.2 Git Flow

`Git工作流` 是最广为人知的工作流。由`Vincent Driessen` 在2010年所发明，这种工作流建立在两个具有永久生命周期的分支基础之上：

- master分支 - 对应生产环境的线上代码。所有开发代码都会在某个时间点合并到master分支。
- develop分支 - 对应的是预生产的代码。当功能分支开发完毕之后，会被合并到develop分支。

与之并行的，是在开发周期之内，还会使用一些其他类型的分支以便支持开发流程：

- feature-* ( * 表示通配符，下同) 分支 — 功能分支用来开发下次发布包含的新功能。这些分支应当都是从develop分支派生出来，然后最终也应该合并回develop分支。
- hotfix-* 分支 — 当master分支中含有不应出现的状况时，则有必要派生出hotfix分支对master分支进行紧急修复。这些分支应当派生自master 分支，并且最终应当同时合并回master 和develop 分支。
- release-* 分支 — release 分支用于准备一次新的生产环境版本更新。创建release-*分支用来修复一些在测试环境未发现的小BUG，以及更新此版本的原信息。其应当派生自develop分支，并且最终同时合并回master 分支和 develop分支。

![image-20211209213326278](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213326278.png)

#### 2.2.1 **优势**

- 在项目周期之内，该工作流保证任何时刻两个主要分支都是处于纯净状态的
- 由于遵循系统化的模式，因此分支命名容易理解
- 大多数Git工具都支持该工作流的[扩展工具](https://link.zhihu.com/?target=https%3A//github.com/nvie/gitflow)
- 当项目中需要同时维护多个生产版本时，该工作流模式非常理想

#### 2.2.2 **缺陷**

- Git 的历史记录将变得异常混乱，可读性很差
- master / develop 分支的割裂使CI/CD流程变得更加困难
- 当项目维护单一生产环境版本时，该工作流则不适用

### 2.3 **GitHub Flow**

GitHub 工作流是一个轻型的工作流，它是GitHub 在2011年 创建，其工作流遵循以下6个原则：

1. 任何时刻的master分支代码都是可以用来部署的
2. 任何新变更都需要从master派生出一个分支，并且为其起一个描述新变更内容的名字：比如 new-oauth2-scopes
3. 在本地提交该新分支变更，并且应经常性的向服务器端该同名分支推送变更
4. 当你需要帮助、反馈，或认为新分支可以合并的时候，新建一个[pull request](https://link.zhihu.com/?target=http%3A//help.github.com/send-pull-requests/)
5. 只有在其他人review通过之后，新分支才允许合并到 `master` 分支
6. 一旦新分支被合并推送至`master`分支，master分支应当立即进行部署

![image-20211209213349934](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213349934.png)

#### 2.3.1 **优势**

- 该工作流对于CI/CD流程友好
- 是Git工作流的一种简版替换
- 当项目维护单一生产环境版本时，该工作流适用

#### 2.3.2 缺陷

- 生产环境对应的代码极易处于不稳定状态
- 对于依赖[发布计划](https://www.zhihu.com/search?q=发布计划&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A434078984})的项目无法充分支持
- 该工作流并不涉及关于部署，环境，发布和问题等方面的解决方案
- 当项目维护多生产环境版本时，该工作流不适用

### 2.4 **GitLab Flow**

GitLab工作流由[GitLab](https://link.zhihu.com/?target=https%3A//about.gitlab.com/2014/09/29/gitlab-flow/)创建于2014年。这种工作流将[功能驱动的开发模式](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Feature-driven_development)与问题跟踪结合在一起。与GitHub工作流最大的不同，是GitLab工作流新创建了与环境相关的分支（比如，`staging`分支和`production`分支），适用于每次合并功能分支后不需马上部署至生产环境的项目（如SaaS软件，移动软件项目等）。

GitLab工作流遵循以下11条原则：

1. 使用功能分支进行开发，而不是直接在`master`分支上提交代码 （如果你的开发主分支是 `master`的话，下同）
2. 测试每一次commit，而不仅仅是对`master`分支进行测试
3. 在所有commits上运行自动化测试（如果你的测试脚本运行时间超过5分钟，就让他们并行）
4. 在[合并代码](https://www.zhihu.com/search?q=合并代码&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A434078984})之前进行code review，而不是在合并之后
5. 以分支名或者tag为准进行自动化的部署
6. tag由人来设定，而不是CI
7. 发布版本应建立在tag上
8. 已push的commits永远不要进行rebase
9. 所有人从`master`派生新分支，最终合并回`master
10. 修复bug时应该优先修复`master`分支的代码，修复之后再cherry-pick到线上分支
11. commit messages 要有意义

![image-20211209213428242](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211209213428242.png)

#### 2.4.1 **优势**

- 相对于前两种工作流，GitLab工作流定义了如何进行CI和CD流程的整合
- 提交历史会非常清爽，历史信息看上去会更具可读性
- 当项目维护单一生产环境版本时，该工作流适用

#### 2.4.2 **缺陷**

- 比GitHub工作流更加复杂
- 当项目维护多生产环境版本时，将会变得和Git Flow一样复杂

### 2.5 **One Flow**

One Flow 最初在[GitFlow considered harmful by Adam Ruka, 2015](https://link.zhihu.com/?target=http%3A//endoflineblog.com/gitflow-considered-harmful)这篇文章中提出，作为Git Flow的另一种选择。使用One Flow需要满足的最重要的条件，是生产版本的每一次更新都基于前一生产版本，与Git Flow最大的区别是没有`develop`这一分支。

#### 2.5.1 **优势**

- 提交历史会非常清爽，历史信息看上去会更具可读性
- 灵活的团队协作机制
- 当项目维护单一生产环境版本时，该工作流适用

#### 2.5.2 **缺陷**

- 自动化CI/CD能力的项目慎用
- 功能分支不明确，不适用[持续集成](https://www.zhihu.com/search?q=持续集成&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A434078984})
- 当项目维护多生产环境版本时，该工作流不适用

## 参考文章

[四种常见的Git工作流](https://zhuanlan.zhihu.com/p/434078984)
