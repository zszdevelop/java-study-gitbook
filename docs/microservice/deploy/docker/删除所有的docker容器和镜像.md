# 停止、删除所有的docker容器和镜像

## 1. 列出所有的容器ID

```
docker ps -aq
```

## 2. 停止所有的容器

```
docker stop $(docker ps -aq)
```

## 3. 删除所有的容器

```
docker rm $(docker ps -aq)
```

## 4. 删除所有的镜像

```
docker rmi $(docker images -q)
```

## 5. 删除所有停止的容器

```
docker rm -f $(docker ps -a | grep Exit | awk '{ print $1 }')
```

## 6. 通过正则表达式找出指定id

如：找出所有rancher容器相关的id

```
 docker ps | grep rancher | awk '{print $1}'
```

