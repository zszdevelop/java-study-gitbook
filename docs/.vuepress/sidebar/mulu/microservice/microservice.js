var MsLogMulu = require('./MsLogMulu');
var ArchMulu = require('./ArchMulu');
var DistributedMulu = require('./DistributedMulu');
exports.mulu = {
    title: '分布式与微服务', // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        ArchMulu.mulu,
        DistributedMulu.mulu,
        {
            title: '概念梳理', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: '微服务治理梳理', // 必要的
                path: 'microservice/concept/微服务治理梳理.md', // 可选的, 标题的跳转链接，应为绝对路径且必须存在

            }]
        },
        {
            title: '请求网关', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '为什么微服务需要API网关？', // 必要的
                    path: 'microservice/gateway/为什么微服务需要API网关.md',
                },
                {
                    title: 'zuul', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'zuul基础', // 必要的
                        path: 'microservice/gateway/zuul/zuul基础.md',
                    }, {
                        title: 'zuul实战',
                        path: 'microservice/gateway/zuul/zuul实战.md',
                    }, {
                        title: '微服务保护',
                        path: 'microservice/gateway/zuul/微服务保护.md',
                    }, ]
                },
                {
                    title: 'Spring Cloud GateWay', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: '服务网关Spring Cloud GateWay基础', // 必要的
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
                    title: '网关功能', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,
                    children: [{
                        title: '限流的算法',
                        path: 'microservice/gateway/function/限流的算法.md',
                    }]
                }

            ]
        },
        {
            title: '信息采集', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '服务注册发现(注册中心）', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'Eureka', // 必要的
                            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
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
                            title: 'nacos', // 必要的
                            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
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
                    title: '链路追踪', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'zipkin', // 必要的
                            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
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
                            title: 'skywalking', // 必要的
                            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [
                                {
                                    title: '基础', // 必要的
                                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                                    collapsable: true, // 可选的, 默认值是 true,
                                    sidebarDepth: 2, // 可选的, 默认值是 1
                                    children: [{
                                        title: 'Skywalking基础概念',
                                        path: 'microservice/track/skywalking/base/Skywalking基础概念.md'
                                    }]
                                },
                                {
                                    title: '安装&配置', // 必要的
                                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                                    collapsable: true, // 可选的, 默认值是 true,
                                    sidebarDepth: 2, // 可选的, 默认值是 1
                                    children: [{
                                        title: 'Skywalking安装(单机版)',
                                        path: 'microservice/track/skywalking/install/Skywalking安装单机版.md'
                                    }, {
                                        title: 'Spring Cloud应用整合Skywalking',
                                        path: 'microservice/track/skywalking/SpringCloud应用整合Skywalking.md'
                                    }, ]
                                },
                                {
                                    title: '配置', // 必要的
                                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                                    collapsable: true, // 可选的, 默认值是 true,
                                    sidebarDepth: 2, // 可选的, 默认值是 1
                                    children: [{
                                            title: 'Skywalking Agent配置',
                                            path: 'microservice/track/skywalking/setting/SkywalkingAgent配置.md'
                                        },
                                        {
                                            title: 'Skywalking-SQL参数采集',
                                            path: 'microservice/track/skywalking/setting/SkywalkingAgent配置-SQL参数采集.md'
                                        },
                                    ]
                                },
                                {
                                    title: '插件', // 必要的
                                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                                    collapsable: true, // 可选的, 默认值是 true,
                                    sidebarDepth: 2, // 可选的, 默认值是 1
                                    children: [{
                                            title: 'Skywalking插件',
                                            path: 'microservice/track/skywalking/plugins/Skywalking插件.md'
                                        },
                                        {
                                            title: 'Skywalking插件-监控SpringBean',
                                            path: 'microservice/track/skywalking/plugins/Skywalking插件-监控SpringBean.md'
                                        },
                                        {
                                            title: 'Skywalking插件-支持Oracle',
                                            path: 'microservice/track/skywalking/plugins/Skywalking插件-支持Oracle.md'
                                        }, {
                                            title: '自定义插件', // 必要的
                                            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                                            collapsable: true, // 可选的, 默认值是 true,
                                            sidebarDepth: 2, // 可选的, 默认值是 1
                                            children: [{
                                                title: 'Skywalking自定义插件',
                                                path: 'microservice/track/skywalking/plugins/custom/Skywalking自定义插件.md'
                                            }
                                         ]
                                        }
                                    ]
                                },
                                {
                                    title: '杂谈', // 必要的
                                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                                    collapsable: true, // 可选的, 默认值是 true,
                                    sidebarDepth: 2, // 可选的, 默认值是 1
                                    children: [{
                                        title: 'Skywalking使用感受',
                                        path: 'microservice/track/skywalking/feeling/Skywalking使用感受.md'
                                    }]
                                },
                                {
                                    title: 'skywalking分布式追踪',
                                    path: 'microservice/track/skywalking/skywalking分布式追踪.md'
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
                    title: '治理策略', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: '负载均衡', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
                                title: '服务调用  Feign', // 必要的
                                collapsable: true, // 可选的, 默认值是 true,
                                sidebarDepth: 2, // 可选的, 默认值是 1
                                children: [{
                                    title: 'Feign基础', // 必要的
                                    path: 'microservice/callservice/Feign/Feign基础.md',
                                }]
                            }]
                        },
                        {
                            title: '请求限流', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
                                title: '限流的算法', // 必要的
                                path: 'microservice/gateway/function/限流的算法.md'
                            }]
                        },
                        {
                            title: '请求限流', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
                                title: 'Hytrix 待完善', // 必要的
                            }]
                        },
                        {
                            title: '服务配置', // 必要的
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [{
                                    title: 'Spring Cloud Config 待完善', // 必要的
                                },
                                {
                                    title: 'nacos 配置中心 待完善', // 必要的
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '授权认证', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'spring-cloud-starter-oauth2', // 必要的
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2, // 可选的, 默认值是 1
                        children: [{
                                title: '使用spring-cloud-starter-oauth2搭建授权服务', // 必要的
                                path: 'microservice/auth/spring-cloud-starter-oauth2/使用spring-cloud-starter-oauth2搭建授权服务.md',
                            },
                            {
                                title: 'Spring security OAuth2 深入解析', // 必要的
                                path: 'microservice/auth/spring-cloud-starter-oauth2/SpringsecurityOAuth2深入解析.md',
                            },
                            {
                                title: 'Spring security OAuth2  端点（endpoints）授权url', // 必要的
                                path: 'microservice/auth/spring-cloud-starter-oauth2/SpringsecurityOAuth2授权url.md',
                            }
                        ]
                    }]
                },

            ]
        },
        
        {
            title: '网络共享存储', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'NFS服务器',
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                    title: 'NFS服务器搭建',
                    path: 'microservice/网络文件系统/NFS服务器/NFS服务器搭建.md'
                }]
            }]
        },
        {
            title: '常见问题', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
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
                },
                {
                    title: '分布式id生成方案',
                    path: 'microservice/question/分布式id生成方案.md'
                }
            ]
        },
        {
            title: '项目实践', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
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
            title: '微服务面试提问', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: '微服务面试提问',
                path: 'microservice/interview/微服务面试提问.md'
            }]
        }
    ]

}