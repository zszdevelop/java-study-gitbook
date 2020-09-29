# Siege压测POST实例

## 1. 新建POST 的参数文件

新建 param.json参数文件

```
{"accessId":"1000000000",
"secretValue":"7be4265165a9"}
```



## 2. 执行测试

```
siege -H "Content-Type:application/json" -c 500 -r 500 "http://app.msyos.com/ele_wallet_service/api/essc/getSign POST < ./param.json"
```

