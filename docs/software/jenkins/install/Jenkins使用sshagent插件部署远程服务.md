# Jenkins使用sshagent插件部署远程服务

## 1.

## 2. 添加credential

### 2.1

### 2.2 生成秘钥

```bash
ssh-keygen -t rsa -b 4096
cd /root/.ssh
ls
```

可以看到id_rsa为SSH private key，id_rsa.pub为SSH public key。

![image-20211010225929464](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211010225929464.png)

### 2.3 复制public key到目标服务器