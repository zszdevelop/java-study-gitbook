var MsLogMulu = require('./MsLogMulu');;
exports.mulu = {
    title: '微服务',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [{
        title: '概念梳理',   // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: '微服务治理梳理',   // 必要的
                path: 'microservice/concept/微服务治理梳理.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    
            }
        ]
    },
    {
        title: '请求网关',   // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: '为什么微服务需要API网关？',   // 必要的
                path: 'microservice/gateway/为什么微服务需要API网关.md',
            },
            {
                title: 'zuul',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'zuul基础',   // 必要的
                        path: 'microservice/gateway/zuul/zuul基础.md',
                    }, {
                        title: 'zuul实战',
                        path: 'microservice/gateway/zuul/zuul实战.md',
                    }, {
                        title: '微服务保护',
                        path: 'microservice/gateway/zuul/微服务保护.md',
                    },
                ]
            },
            {
                title: 'Spring Cloud GateWay',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: '服务网关Spring Cloud GateWay基础',   // 必要的
                        path: 'microservice/gateway/SpringCloudGateWay/服务网关SpringCloudGateWay基础.md',
                    }, {
                        title: 'Spring Cloud GateWay网关功能',
                        path: 'microservice/gateway/SpringCloudGateWay/SpringCloudGateWay网关功能.md',
                    }, {
                        title: 'Spring Cloud GateWay实战',
                        path: 'microservice/gateway/SpringCloudGateWay/SpringCloudGateWay实战.md',
                    },
                    {
                        title: 'Spring Cloud GateWay之Filter',
                        path: 'microservice/gateway/SpringCloudGateWay/SpringCloudGateWay之Filter.md',
                    }, {
                        title: 'Spring Cloud GateWay负载均衡',
                        path: 'microservice/gateway/SpringCloudGateWay/SpringCloudGateWay负载均衡.md',
                    }, {
                        title: 'Spring Cloud GateWay之Hystrix断路器',
                        path: 'microservice/gateway/SpringCloudGateWay/SpringCloudGateWay之Hystrix断路器.md',
                    }, {
                        title: 'Spring Cloud GateWay跨域设置',
                        path: 'microservice/gateway/SpringCloudGateWay/SpringCloudGateWay跨域设置.md',
                    }
                ]
            },
            {
                title: '网关功能',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,
                children: [
                    {
                        title: '限流的算法',
                        path: 'microservice/gateway/function/限流的算法.md',
                    }
                ]
            }
    
        ]
    },
    {
        title: '信息采集',   // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: '服务注册发现(注册中心）',   // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'Eureka',   // 必要的
                        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [
                            {
                                title: 'Eureka基础',
                                path: 'microservice/ServiceDiscovery/eureka/eureka基础.md',
                            },
                            {
                                title: 'SpringBoot整合Eureka',
                                path: 'microservice/ServiceDiscovery/eureka/SpringBoot整合Eureka.md',
                            }
                        ]
                    },
                    {
                        title: 'nacos',   // 必要的
                        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [
                            {
                                title: 'nacos基础',
                                path: 'microservice/ServiceDiscovery/nacos/nacos概念.md',
                            },
                            {
                                title: 'nacos安装与使用',
                                path: 'microservice/ServiceDiscovery/nacos/nacos安装与使用.md',
                            }
                        ]
                    }
                ]
            },
            MsLogMulu.mulu,
            {
                title: '链路追踪',   // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'zipkin',   // 必要的
                        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [
                            {
                                title: 'ZinKin基础',
                                path: 'microservice/track/zipkin/ZinKin基础.md'
                            },
                            {
                                title: 'Sleuth Zipkin链路追踪',
                                path: 'microservice/track/zipkin/Sleuth Zipkin链路追踪.md'
                            },
                            {
                                title: 'Zipkin下载',
                                path: 'microservice/track/zipkin/Zipkin下载.md'
                            },
                            {
                                title: 'SpringBoot整合Zipkin',
                                path: 'microservice/track/zipkin/SpringBoot整合Zipkin.md'
                            }
                        ]
                    },
                    {
                        title: 'skywalking',   // 必要的
                        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [
                            {
                                title: 'skywalking分布式追踪',
                                path: 'microservice/track/skywalking/skywalking分布式追踪.md'
                            },
                            {
                                title: 'Spring Cloud应用整合Skywalking',
                                path: 'microservice/track/skywalking/SpringCloud应用整合Skywalking.md'
                            },
                            {
                                title: 'SkyWalking收集之gRPC代理',
                                path: 'microservice/track/skywalking/SkyWalking收集之gRPC代理.md'
                            },
                        ]
                    }
                ]
            },
    
            {
                title: '治理策略',   // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [{
                    title: '负载均衡',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '服务调用  Feign',   // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2,    // 可选的, 默认值是 1
                            children: [
                                {
                                    title: 'Feign基础',   // 必要的
                                    path: 'microservice/callservice/Feign/Feign基础.md',
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '请求限流',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [{
                        title: '限流的算法',   // 必要的
                        path: 'microservice/gateway/function/限流的算法.md'
                    }
                    ]
                },
                {
                    title: '请求限流',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [{
                        title: 'Hytrix 待完善',   // 必要的
                    }
                    ]
                },
                {
                    title: '服务配置',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [{
                        title: 'Spring Cloud Config 待完善',   // 必要的
                    },
                    {
                        title: 'nacos 配置中心 待完善',   // 必要的
                    }
                    ]
                }
                ]
            },
            {
                title: '授权认证',   // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [{
                    title: 'spring-cloud-starter-oauth2',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '使用spring-cloud-starter-oauth2搭建授权服务',   // 必要的
                            path: 'microservice/auth/spring-cloud-starter-oauth2/使用spring-cloud-starter-oauth2搭建授权服务.md',
                        },
                        {
                            title: 'Spring security OAuth2 深入解析',   // 必要的
                            path: 'microservice/auth/spring-cloud-starter-oauth2/SpringsecurityOAuth2深入解析.md',
                        },
                        {
                            title: 'Spring security OAuth2  端点（endpoints）授权url',   // 必要的
                            path: 'microservice/auth/spring-cloud-starter-oauth2/SpringsecurityOAuth2授权url.md',
                        }
                    ]
                }]
            },
           
        ]
    },
    {
        title: '微服务部署docker',   // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: 'Docker',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'Centos安装Docker',   // 必要的
                        path: 'microservice/deploy/docker/Centos安装Docker.md',
                    },
                    {
                        title: 'Docker 镜像与容器',   // 必要的
                        path: 'microservice/deploy/docker/Docker镜像与容器.md',
                    },
                    {
                        title: '使用Dockerfile定制镜像',   // 必要的
                        path: 'microservice/deploy/docker/使用Dockerfile定制镜像.md',
                    },
                    {
                        title: 'Docker停止、删除所有的docker容器和镜像',   // 必要的
                        path: 'microservice/deploy/docker/删除所有的docker容器和镜像.md',
                    },
                    {
                        title: 'Docker启动',   // 必要的
                        path: 'microservice/deploy/docker/Docker启动.md',
                    }, {
                        title: 'Dockerfile 指令',   // 必要的
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [
                            {
                                title: 'Dockerfile之COPY复制文件',   // 必要的
                                path: 'microservice/deploy/docker/Instruction/Dockerfile之COPY复制文件.md',
                            }]
                    }, {
                        title: 'Docker参考文章',   // 必要的
                        path: 'https://yeasy.gitbooks.io/docker_practice/',
                    }, {
                        title: 'docker配置阿里云镜像',   // 必要的
                        path: 'microservice/deploy/docker/docker配置阿里云镜像.md',
                    },
                ]
            },
            {
                title: 'Docker Compose',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'Docker Compose入门',   // 必要的
                        path: 'microservice/deploy/dockerCompose/DockerCompose入门.md',
                    }, {
                        title: 'Docker Compose常用命令',   // 必要的
                        path: 'microservice/deploy/dockerCompose/DockerCompose常用命令.md',
                    }
                ]
            },
            {
                title: 'Kubernetes容器编排管理平台',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'Kubernetes基本概念',   // 必要的
                        path: 'microservice/deploy/Kubernetes/Kubernetes基本概念.md',
                    }, {
                        title: 'Kubernetes架构',   // 必要的
                        path: 'microservice/deploy/Kubernetes/Kubernetes架构.md',
                    }, {
                        title: 'Kubeadm安装Kubernetes',   // 必要的
                        path: 'microservice/deploy/Kubernetes/Kubeadm安装Kubernetes.md',
                    }
                ]
            },
            {
                title: 'Rancher',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: '安装Rancher',   // 必要的
                        path: 'microservice/deploy/rancher/安装Rancher.md',
                    }, {
                        title: 'Rancher部署服务',   // 必要的
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [{
                            title: 'Rancher部署服务简单示例',   // 必要的
                            path: 'microservice/deploy/rancher/Rancher部署服务简单示例.md'
                        }
                        ]
                    }
                    , {
                        title: 'Rancher集群启动失败Failed to bring up Etcd Plane',   // 必要的
                        path: 'microservice/deploy/rancher/Rancher集群启动失败FailedtobringupEtcdPlane.md',
                    }, {
                        title: 'Rancher中文文档',   // 必要的
                        path: 'https://docs.rancher.cn/rancher2x/',
                    }
                ]
            },
            {
                title: 'Docker镜像仓库',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 'Harbor',
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2,    // 可选的, 默认值是 1
                        children: [{
                            title: 'Docker镜像仓库Harbor',
                            path: 'microservice/deploy/repository/harbor/Docker镜像仓库Harbor.md'
                        }]
                    }
                ]
            }
        ]
    },
    {
        title: '网络共享存储',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: 'NFS服务器',
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [{
                    title: 'NFS服务器搭建',
                    path: 'microservice/网络文件系统/NFS服务器/NFS服务器搭建.md'
                }]
            }
        ]
    },
    {
        title: '常见问题',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: '分布式事务',
                path: 'microservice/question/分布式事务.md'
            },
            {
                title: '单点登录SSO',
                path: 'microservice/question/单点登录SSO.md'
            },
            {
                title: '分布式id生成方案',
                path: 'microservice/question/分布式id生成方案.md'
            }
        ]
    },
    {
        title: '项目实践',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title: 'chinahrss微服务实践',
                path: 'microservice/action/中国人社微服务实践.md'
            },
            {
                title: 'chinahrss微服务Docker化',
                path: 'microservice/action/chinahrss微服务Docker化.md'
            },
            {
                title: 'chinahrss使用Docker Compose部署',
                path: 'microservice/action/chinahrss使用DockerCompose部署.md'
            },
            {
                title: '项目部署后调优',
                path: 'microservice/action/项目部署后调优.md'
            }
        ]
    },
    {
        title: '微服务面试提问',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
            {
                title:'微服务面试提问',
                path:'microservice/interview/微服务面试提问.md'
            }
        ]}
    ] 
    
}