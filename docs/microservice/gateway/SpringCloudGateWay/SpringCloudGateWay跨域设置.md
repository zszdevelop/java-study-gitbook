# Spring Cloud GateWay跨域设置

有时候前端需要支持跨域访问, 这里简单配置允许所有域名访问.

```yml
spring:
  application:
    name: Chinahrss-Gateway
  cloud:
    gateway:
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOrigins: "*"
            allowedMethods: "*"
            allowedHeaders: "*"
            allowCredentials: true
```

