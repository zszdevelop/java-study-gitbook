# Dockerfile之COPY复制文件

格式：

- `COPY [--chown=:] <源路径>... <目标路径>`
- `COPY [--chown=:] ["<源路径1>",... "<目标路径>"]`

和 `RUN` 指令一样，也有两种格式，一种类似于命令行，一种类似于函数调用。

**示例**

```dockerfile
COPY ./target/chinahrss-auth.jar /chinahrss/chinahrss-auth.jar
```

1. COPY 指令将从构建上下文目录中 **<源路径>的文件/目录**（./target/chinahrss-auth.jar）
2. 复制到
3. 新的一层的**镜像内的 `<目标路径>` 位置**（/chinahrss/chinahrss-auth.jar）

