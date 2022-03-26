# git merge的三种操作

## 1. 背景

git merge的三种操作merge, squash merge, 和rebase merge

举例来说：
 假设在master分支的B点拉出一个新的分支dev，经过一段时间开发后：

- master分支上有两个新的提交M1和M2
- dev分支上有三个提交D1，D2，和D3

如下图所示：

![image-20211210215256075](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211210215256075.png)

现在我们完成了dev分支的开发测试工作，需要把dev分支合并回master分支。

## 2. merge 的三种操作

### 2.1 merge

这是最基本的merge，就是把提交历史原封不动的拷贝过来，包含完整的提交历史记录。

```sh
git checkout master
git merge dev
```

![image-20211210215426765](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211210215426765.png)

**此时还会生产一个merge commit (D4')**，这个merge commit不包含任何代码改动，而包含在dev分支上的几个commit列表(D1, D2和D3)。查看git的提交历史(git log)可以看到所有的这些提交历史记录。

### 2.2 squash merge

根据字面意思，这个操作完成的是压缩的提交；解决的是什么问题呢，由于在dev分支上执行的是开发工作，有一些很小的提交，或者是纠正前面的错误的提交，对于这类提交对整个工程来说不需要单独显示出来一次提交，不然导致项目的提交历史过于复杂；所以基于这种原因，我们可以把dev上的所有提交都合并成一个提交；然后提交到主干。

```sh
 git checkout master
 git merge --squash dev
```

![image-20211210215937039](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211210215937039.png)

在这个例子中，我们把D1，D2和D3的改动合并成了一个D。

注意，squash merge并不会替你产生提交，它只是把所有的改动合并，然后放在本地文件，需要你再次手动执行git commit操作；此时又要注意了，因为你要你手动commit，也就是说这个commit是你产生的，不是有原来dev分支上的开发人员产生的，提交者本身发生了变化。也可以这么理解，就是你把dev分支上的所有代码改动一次性porting到master分支上而已。

### 2.3 rebase merge

由于squash merge会变更提交者作者信息，这是一个很大的问题，后期问题追溯不好处理(当然也可以由分支dev的所有者来执行squash merge操作，以解决部分问题)，rebase merge可以保留提交的作者信息，同时可以合并commit历史，完美的解决了上面的问题。

```sh
 git checkout dev
 git rebase -i master
 git checkout master
 git merge dev
```

rebase merge分两步完成：
 第一步：执行rebase操作，结果是看起来dev分支是从M2拉出来的，而不是从B拉出来的，然后使用-i参数手动调整commit历史，是否合并如何合并。例如下rebase -i命令会弹出文本编辑框：

```bash
pick <D1> Message for commit #1
pick <D2> Message for commit #2
pick <D3> Message for commit #3
```

假设D2是对D1的一个拼写错误修正，因此可以不需要显式的指出来，我们把D2修改为fixup：



```bash
pick <D1> Message for commit #1
fixup <D2> Message for commit #2
pick <D3> Message for commit #3
```

rebase之后的状态变为：

![image-20211210220238914](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211210220238914.png)

D1'是D1和D2的合并。

第二步：再执行merge操作，把dev分支合并到master分支：

![image-20211210220256208](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211210220256208.png)



注意：在执行rebase的时候可能会出现冲突的问题，此时需要手工解决冲突的问题，然后执行(git add)命令；所有冲突解决完之后，这时不需要执行(git commit)命令，而是运行(git rebase --continue)命令，一直到rebase完成；如果中途想放弃rebase操作，可以运行(git rebase --abort)命令回到rebase之前的状态。



## 参考文章

[git merge的三种操作merge, squash merge, 和rebase merge](https://www.jianshu.com/p/ff1877c5864e)
