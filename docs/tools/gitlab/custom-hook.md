# gitlab配置custom hook

## 1. 具体步骤

### 1.1 设置custom_hooks路径

修改 gitlab 中的``vi /etc/gitlab/gitlab.rb``

增加 custom_hooks_dir 路径：

```
gitlab_shell['custom_hooks_dir'] = "/opt/gitlab/embedded/service/gitlab-shell/hooks"
```

注：这里直接去掉注释使用自带的

### 1.2 启用配置

```
sudo gitlab-ctl reconfigure
```

### 1.3 创建hook文件

自定义脚本目录要符合`<custom_hooks_dir>/<hook_name.d>/*` 的规范。具体就是

- 在自定的`custom_hooks_dir` 目录下可创建三个文件夹对应三类 `server hook name` ：
  - pre-receive.d
  - update.d
  - post-receive.d

- 在每个文件夹下可以创建任意文件，在对应的hook时期，gitlab就会主动调用
- 文件名以`~`结尾的文件会被忽略
- 如果想看这部分的实现细节可以看 `<gitlab-shell>/lib/gitlab_custom_hook.rb` 文件

目录结构示意

```
[root@localhost custom_hooks]# tree
.
├── post-receive.d
│   ├── 01.sh
│   └── 02.sh~
├── pre-receive.d
│   ├── 01.sh
│   ├── 02.py
│   └── 03.rb
└── update.d
    ├── 01.sh
    └── 02.sh
```

### 1.4 编写 hook 脚本

hook 脚本就是git 自身的规范，写shell，python、ruby 都可以

留意脚本最后的退出值：**0 正常退出，用户可以 push；非 0 异常退出，中断提交（pre-receive 和 update）** 。
细节参见： [5.4 Git钩子：自定义你的工作流 · geeeeeeeeek/git-recipes Wiki · GitHub](https://link.jianshu.com/?t=https://github.com/geeeeeeeeek/git-recipes/wiki/5.4-Git%E9%92%A9%E5%AD%90%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BD%A0%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81)

如果想让用户 push 时看到相应的日志直接在脚本中 echo 即可。

这里举两个例子：

🌰：Say hi.

```bash
#!/bin/sh

echo "Say hi from gitlab servertes ok 😄"
exit 0
```

🌰：检查提交修改的文件，发现有特定内容禁止提交

```
#!/bin/sh
FIND_KEY='.test.51offer.com'
OLD_VALUE=$2
NEW_VALUE=$3

FILES=$(git rev-list --objects $OLD_VALUE...$NEW_VALUE | egrep '\.(jsp|vm|java)$' | awk '{print $2}' | sort | uniq )

FLAG=0
for FILE in $FILES
do
    git show $NEW_VALUE:$FILE | grep -q "$FIND_KEY"
    if [ $? -eq 0 ]
    then
        FLAG=1
        echo "📃  包含非法字段 '$FIND_KEY' : $FILE"
    fi
done

if [ $FLAG -eq 0 ]
then
    echo "✅  代码检查通过."
else
    echo "❌  代码检查不通过!"
    exit 1
fi

exit 0
```

例子结果

上面第二个例子中，尝试 `git push`，就能看到如下的日志：

```ruby
Pushing to git@gitlab.51offer.inner:mall/paycenter.git
remote: 📃  包含非法字段 '.test.51offer.com' : service/src/main/java/com/horizon/module/paycenter/service/PayService.java        
remote: ❌  代码检查不通过!        
remote: error: hook declined to update refs/heads/test        
To git@gitlab.51offer.inner:mall/paycenter.git
 = [up to date]      release/old -> release/old
 = [up to date]      v1.0.0.2016.9.8 -> v1.0.0.2016.9.8
 ! [remote rejected] test -> test (hook declined)
error: failed to push some refs to 'git@gitlab.51offer.inner:mall/paycenter.git'
Completed with errors, see above
```

### 参考文章

[Gitlab 服务器端 custom hook 配置](<https://www.jianshu.com/p/5531a21afa68>)

[官方文档](<https://docs.gitlab.com/ee/administration/custom_hooks.html>)

