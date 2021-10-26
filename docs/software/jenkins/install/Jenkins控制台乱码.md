# Jenkins控制台乱码

## 1. 背景

Jenkins 使用docker 安装非常方便。但是在安装时，我并没指定编码，导致我Jenkins 打印的日志出现乱码问题

![image-20211008220042050](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211008220042050.png)

尝试过网上好多办法，发现很多并没有卵用。最终在一篇大佬博文下找到靠谱方案记录一下

## 2. 尝试过的无效方案

- 全局属性：键：LANG 值：zh.CH.UTF-8
- 执行：  export JAVA_TOOL_OPTIONS="-Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8"

## 3. 问题产生原因

1. 查看其`Dockerfile`找到启动脚本位置

   ![image-20211008221057262](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211008221057262.png)

2. 进入容器中位置查看该脚本内容

   ```sh
   # if `docker run` first argument start with `--` the user is passing jenkins launcher arguments
   if [[ $# -lt 1 ]] || [[ "$1" == "--"* ]]; then
   
     # read JAVA_OPTS and JENKINS_OPTS into arrays to avoid need for eval (and associated vulnerabilities)
     java_opts_array=()
     while IFS= read -r -d '' item; do
       java_opts_array+=( "$item" )
     done < <([[ $JAVA_OPTS ]] && xargs printf '%s\0' <<<"$JAVA_OPTS")
   
     readonly agent_port_property='jenkins.model.Jenkins.slaveAgentPort'
     if [ -n "${JENKINS_SLAVE_AGENT_PORT:-}" ] && [[ "${JAVA_OPTS:-}" != *"${agent_port_property}"* ]]; then
       java_opts_array+=( "-D${agent_port_property}=${JENKINS_SLAVE_AGENT_PORT}" )
     fi
   ```

## 4. 解决办法

1. 添加配置

   因此在该脚本中设置JAVA_OPTS即可，**在上面if语句前设置**，内容如下：

```bash
export JAVA_OPTS="-Dsun.jnu.encoding=UTF-8 -Dfile.encoding=UTF-8"
```

2. 重启jenkins后生效：

   `docker restart jenkins`。 重新登录后见`file.encoding`和`sun.jnu.encoding`终于变为`UTF-8`，至此测试打印中文生效：

   ![image-20211008221418316](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211008221418316.png)

## 参考文章

[jenkins乱码问题](https://www.jianshu.com/p/84c19058f65b)

[docker中宿主机与容器（container）互相拷贝传递文件的方法](https://blog.csdn.net/dongdong9223/article/details/71425077)

