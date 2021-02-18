# gitlab内存占用过大

我的服务器配置是2核4G内存，启动gitlab 就占用了很大内存空间(停止gitlab 会释放1.5G内存)

## 1. 解决方案

### 1.1 减少 unicorn worker进程数

我们可以使用 top -ac 先看一下开启了多少unicorn worker进程，gitlab默认开启进程数与CPU内核数相同

```
vim /etc/gitlab/gitlab.rb
unicorn['worker_processes'] = 8
```

默认是被注释掉的，官方建议该值是CPU核心数加一，可以提高服务器的响应速度，如果内存只有4G，或者服务器上有其它业务，就不要改了，以免内存不足。另外，这个参数最小值是2，设为1，服务器可能会卡死。

### 1.2 减少数据库缓存

```
 postgresql['shared_buffers'] = "128MB"
```

默认为256MB，可适当改小

### 1.3 减少数据库并发数

```
postgresql['max_worker_processes'] = 4
```

默认为8，可适当减少

### 1.4 减少sidekiq并发数

```
sidekiq['concurrency'] = 10
```

默认是25，可适当改小