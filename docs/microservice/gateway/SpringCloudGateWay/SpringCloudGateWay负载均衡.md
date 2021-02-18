# Spring Cloud GateWay负载均衡

以lb://开头的请求, 会被全局过滤器RetryLoadBalancerClientFilter拦截并进行负载均衡处理, 所有的动态路由都会自动负载均衡.

