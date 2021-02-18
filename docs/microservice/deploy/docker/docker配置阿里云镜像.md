# docker配置阿里云镜像

[阿里云官方文档](https://cr.console.aliyun.com/undefined/instances/mirrors)

1. 点击进入官网看自己的镜像地址
2. 按文档复制

## 1. 服务器配置

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://15cyx9z8.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```