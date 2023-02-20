# 删除.git中的错误提交的文件.md

## 1. 背景

Git 操作时，经常“不小心”上传一些不必要的（大）文件，或者私密数据，等等。

当然可以从本地把这些文件删除，加入 `.gitignore`, 避免下次再上传。

然而，**之前已经上传过的，还遗留在 git 历史中**

## 2. 实例

如下是一个我误将vue 的第三方依赖node_modules 添加到git 导致.git文件过大



![](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201010094508032.png)



## 3. 操作步骤



1. [下载bfg.jar](https://rtyley.github.io/bfg-repo-cleaner/), 直接将其复制到 `your-repo.git` 目录下

2. 删除.git 中的文件或者文件夹

   - 删除文件

     ```sh
     java -jar bfg-1.12.16.jar --delete-files test1.py
     ```

   - 删除文件夹

     ```sh
     java -jar bfg-1.12.16.jar --delete-folders "{folderA,folderB,folderC}"
     ```

3. 执行如下 git 命令

   ```sh
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   ```

   此时查看.git 文件夹，就可以看到文件变小了



![](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201010093714396.png)

## 参考文章

[BFG Repo-Cleaner - 从 Git 历史中真正删除文件](https://juejin.im/post/6844904045459537934)
