# Kubeadm安装Kubernetes

Kubernetes 从1.4 版本开始后引入了kubeadm 用于简化集群搭建的过程

## 1. 安装

### 1.1 配置国内的kubernetes源

在/etc/yum.repos.d/ 目录下新建kubernetes.repo 文件，内容如下

```
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
```

### 1.2 安装kubelet、kubeadm和kubectl工具：

```
yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes

```

### 1.3 启动kubelet并设置开机自启

```
systemctl enable kubelet && systemctl start kubelet
```

### 1.4 启动kubernetes 的master节点

```
kubeadm init --kubernetes-version=v1.17.2 \
--pod-network-cidr=10.244.0.0/16 \
--service-cidr=10.1.0.0/16 \
--apiserver-advertise-address=120.79.200.111 \
--image-repository registry.aliyuncs.com/google_containers
```

配置含义如下：

- kubernetes-version: 用于指定k8s版本，这里指定为最新的1.16.2版本；
- apiserver-advertise-address：用于指定kube-apiserver监听的ip地址，就是master本机IP地址。
- pod-network-cidr：因为后面我们选择flannel作为Pod的网络插件，所以这里需要指定Pod的网络范围为10.244.0.0/16
- service-cidr：用于指定SVC的网络范围；
- image-repository: 其中默认的镜像仓库k8s.gcr.io没有科学上网的话无法访问，我们可以将它修改为国内的阿里镜像仓库registry.aliyuncs.com/google_containers

启动时，需要拉取镜像，过程比较缓慢耐心等待即可。如果你想先拉好镜像再启动，你可以使用`kubeadm config images list`命令列出需要拉取的镜像。

启动成功后，你会看到类似如下提示:

