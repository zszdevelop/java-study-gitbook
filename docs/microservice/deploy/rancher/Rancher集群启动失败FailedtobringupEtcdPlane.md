# Rancher集群启动失败Failed to bring up Etcd Plane

部署集群的时候提示

[etcd] Failed to bring up Etcd Plane: [etcd] Etcd Cluster is not healthy

可能是因为重复部署等多种原因

## 解决方案

```
docker rm -f $(sudo docker ps -aq);
docker volume rm $(sudo docker volume ls -q);

rm -rf /etc/ceph \
       /etc/cni \
       /etc/kubernetes \
       /opt/cni \
       /opt/rke \
       /run/secrets/kubernetes.io \
       /run/calico \
       /run/flannel \
       /var/lib/calico \
       /var/lib/etcd \
       /var/lib/cni \
       /var/lib/kubelet \
       /var/lib/rancher/rke/log \
       /var/log/containers \
       /var/log/pods \
       /var/run/calico

for mount in $(mount | grep tmpfs | grep '/var/lib/kubelet' | awk '{ print $3 }') /var/lib/kubelet /var/lib/rancher; do umount $mount; done

rm -f /var/lib/containerd/io.containerd.metadata.v1.bolt/meta.db
sudo systemctl restart containerd
sudo systemctl restart docker

IPTABLES="/sbin/iptables"
cat /proc/net/ip_tables_names | while read table; do
  $IPTABLES -t $table -L -n | while read c chain rest; do
      if test "X$c" = "XChain" ; then
        $IPTABLES -t $table -F $chain
      fi
  done
  $IPTABLES -t $table -X
done
```

## 参考文章

[rancher2.2.2 [etcd] Failed to bring up Etcd Plane: [etcd] Etcd Cluster is not healthy](https://github.com/rancher/rancher/issues/19882)