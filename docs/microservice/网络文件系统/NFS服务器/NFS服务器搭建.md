# NFS服务器搭建

## 1. 安装

### 1.1 创建nfs目录

```
# 创建目录
mkdir /nfs

# 修改权限
chmod 777 /nfs

# 创建exports文件
vi /etc/exports
```

### 1.2 创建exports文件

```
vi /etc/exports
```

exports内容如下所示：

```
/nfs *(rw,insecure,sync,no_subtree_check,no_root_squash)
```

让配置生效

```
exportfs -r
```

### 1.3 启动NFS

```
systemctl enable nfs
systemctl enable rpcbind
systemctl restart nfs
systemctl restart rpcbind
```

## 2. 测试NFS

在master服务器/home/vagrant目录下新建test-nfs.yml

```
apiVersion: v1
kind: Pod
metadata:
  name: test-nfs-pod
spec:
  containers:
    - name: busybox
      image: busybox
      command:
        - sh
        - -c
        - 'echo hello world > /mnt/hello'
      imagePullPolicy: IfNotPresent
      volumeMounts:
        - mountPath: "/mnt"
          name: nfs
  volumes:
    - name: nfs
      nfs: # 使用NFS存储
        path: /nfs # NFS存储路径
        server: 192.168.33.15 # NFS服务器地址
```

