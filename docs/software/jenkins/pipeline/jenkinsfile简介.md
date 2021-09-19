# jenkinsfile简介

## 1. 简介

Jenkinsfile 是 Jenkins 2.x 核心特性 Pipeline 的脚本，由Groovy语言实现。**Jenkinsfile一般是放在项目根目录**，随项目一起受源代码管理软件控制，无需像创建“自由风格"（Jenkins FreeStyle）项目一样，每次可能需要拷贝很多设置到新项目，提供了一些直接的好处：

- Pipeline上的代码审查/迭代
- Pipeline的审计跟踪
- Pipeline的唯一真实来源，可以由项目的多个成员查看和编辑。