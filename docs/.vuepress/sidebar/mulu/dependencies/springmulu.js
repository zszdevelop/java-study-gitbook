exports.mulu = {
    title: 'Spring', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [

        {
            title: 'Spring基础-Spring和Spring框架组成', // 必要的
            path: 'dependencies/spring/base/Spring基础-Spring和Spring框架组成.md'
        },
        {
            title: 'Spring基础-Spring简单例子引入Spring要点', // 必要的
            path: 'dependencies/spring/base/Spring基础-Spring简单例子引入Spring要点.md'
        },
        {
            title: 'Spring基础-Spring核心之控制反转(IOC)', // 必要的
            path: 'dependencies/spring/base/Spring基础-Spring核心之控制反转.md'
        },{
            title: 'Spring基础-Spring核心之面向切面编程(AOP)', // 必要的
            path: 'dependencies/spring/base/Spring基础-Spring核心之面向切面编程.md'
        },{
            title: 'Spring基础-SpringMVC请求流程和案例', // 必要的
            path: 'dependencies/spring/base/Spring基础-SpringMVC请求流程和案例.md'
        },
        {
            title: 'Spring进阶-SpringIOC实现原理详解之IOC体系结构设计', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-SpringIOC实现原理详解之IOC体系结构设计.md'
        },{
            title: 'Spring进阶-SpringIOC实现原理详解之IOC初始化流程', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-IOC实现原理详解之IOC初始化流程.md'
        },
        {
            title: 'Spring进阶-IOC实现原理详解之Bean实例化(生命周期,循环依赖等)', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-IOC实现原理详解之Bean实例化.md'
        },
        {
            title: 'Spring进阶-Spring AOP实现原理详解之AOP切面的实现', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-AOP实现原理详解之AOP切面的实现.md'
        },
        {
            title: 'Spring进阶-Spring AOP实现原理详解之AOP代理的创建', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-AOP实现原理详解之AOP代理的创建.md'
        },
        {
            title: 'Spring进阶-Spring AOP实现原理详解之Cglib代理实现', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-AOP实现原理详解之Cglib代理实现.md'
        },{
            title: 'Spring进阶-Spring AOP实现原理详解之JDK代理实现', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-AOP实现原理详解之JDK代理实现.md'
        },{
            title: 'Spring进阶-SpringMVC实现原理之DispatcherServlet的初始化过程', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-SpringMVC实现原理之DispatcherServlet的初始化过程.md'
        },{
            title: 'Spring进阶-SpringMVC实现原理之DispatcherServlet处理请求的过程', // 必要的
            path: 'dependencies/spring/advanced/Spring进阶-SpringMVC实现原理之DispatcherServlet处理请求的过程.md'
        },

        {
            title: 'Spring常见知识点', // 必要的
            path: 'dependencies/spring/interview/Spring常见知识点.md'
        },

       

        {
            title: 'Spring整体架构',
            path: 'dependencies/spring/Framework/Spring整体架构.md',
        },
        {
            title: 'Spring IoC', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Spring IoC常见问题',
                    path: 'dependencies/spring/ioc/SpringIoC常见问题.md',
                },
                {
                    title: 'Spring Bean常见问题',
                    path: 'dependencies/spring/ioc/SpringBean常见问题.md',
                },
                {
                    title: 'Spring 装配Bean的3种方式',
                    path: 'dependencies/spring/ioc/Spring 装配Bean的3种方式.md',
                },
                {
                    title: '循环依赖问题',
                    path: 'dependencies/spring/ioc/循环依赖问题.md',
                }
            ]
        },
        {
            title: 'SpringAOP', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'SpringAOP概述',
                    path: 'dependencies/spring/aop/SpringAOP概述.md',
                },
                {
                    title: 'Spring AOP实现原理',
                    path: 'dependencies/spring/aop/SpringAOP实现原理.md',
                },
                {
                    title: 'AOP实战', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'AOP实现打印日志',
                        path: 'dependencies/spring/aop/AOP打印日志.md',
                    }, {
                        title: 'AOP实现Limit限流',
                        path: 'dependencies/spring/aop/Limit限流.md',
                    }, {
                        title: 'AOP实现防重复提交',
                        path: 'dependencies/spring/aop/AOP实现防重复提交.md',
                    }]
                }
            ]
        }, {
            title: 'Spring事务', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'Spring事务',
                path: 'dependencies/spring/transaction/Spring事务.md'
            }, {
                title: '@Transactional注解的失效场景',
                path: 'dependencies/spring/transaction/Transactional注解的失效场景.md'
            }]
        }, {
            title: 'Spring MVC', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'SpringMVC常见知识点',
                    path: 'dependencies/spring/springmvc/SpringMVC常见知识点.md'
                },
                {
                    title: 'SpringMVC拦截器',
                    path: 'dependencies/spring/springmvc/SpringMVC拦截器.md'
                },
                {
                    title: 'RESTful',
                    path: 'dependencies/spring/springmvc/RESTful.md'
                }
            ]
        }, {
            title: 'Spring Boot', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                
                {
                    title: 'SpringBoot入门-SpringBoot简介',
                    path: 'dependencies/spring/SpringBoot/start/SpringBoot入门-SpringBoot简介.md'
                },
                {
                    title: 'SpringBoot入门-配置热部署devtools工具',
                    path: 'dependencies/spring/SpringBoot/start/SpringBoot入门-配置热部署devtools工具.md'
                },
                {
                    title: 'Spring Boot常见知识点',
                    path: 'dependencies/spring/SpringBoot/'
                },
                
                {
                    title: 'SpringBoot-Starter',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: '自定义SpringBoot Starter实现自动化配置',
                            path: 'dependencies/spring/SpringBoot/自定义SpringBootStarter实现自动化配置.md'
                        },
                        {
                            title: 'SpringBoot-Starter-权限白名单自动化配置',
                            path: 'dependencies/spring/SpringBoot/SpringBoot-Starter-权限白名单自动化配置.md'
                        }
                    ]
                },{
                    title: 'SpringBoot源码学习',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: '导入SpringBoot源码',
                            path: 'dependencies/spring/SpringBoot/source/导入SpringBoot源码.md'
                        },
                        {
                            title: 'SpringBoot的模块及结构',
                            path: 'dependencies/spring/SpringBoot/source/SpringBoot的模块及结构.md'
                        },
                        {
                            title: 'SpringBoot自动装配原理解析（核心功能）',
                            path: 'dependencies/spring/SpringBoot/source/SpringBoot自动装配原理解析.md'
                        },
                        {
                            title: 'SpringBoot启动过程（核心功能）',
                            path: 'dependencies/spring/SpringBoot/SpringBoot启动过程.md'
                        },
                        {
                            title: 'SpringBoot嵌入式Tomcat的自动配置原理',
                            path: 'dependencies/spring/SpringBoot/source/SpringBoot嵌入式Tomcat的自动配置原理.md'
                        },
                        
                        {
                            title: '源码阅读相关问题',
                            collapsable: true, // 可选的, 默认值是 true,
                            sidebarDepth: 2, // 可选的, 默认值是 1
                            children: [
                                {
                                    title: 'Springboot源码编译Kotlin版本过低问题',
                                    path: 'dependencies/spring/SpringBoot/source/problem/Springboot源码编译Kotlin版本过低问题.md'
                                },{
                                    title: '为什么SpringBoot中main方法执行完毕后程序不会直接退出呢',
                                    path: 'dependencies/spring/SpringBoot/source/problem/为什么SpringBoot中main方法执行完毕后程序不会直接退出呢.md'
                                }
                                
                                
                            ]
                        }
                    ]
                },
                {
                    title: 'Springboot接口设计',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'SpringBoot接口-如何提供多个版本接口',
                            path: 'dependencies/spring/SpringBoot/apidesign/SpringBoot接口-如何提供多个版本接口.md'
                        },
                        {
                            title: 'SpringBoot接口-如何保证接口幂等',
                            path: 'dependencies/spring/SpringBoot/apidesign/SpringBoot接口-如何保证接口幂等.md'
                        },
                        {
                            title: 'SpringBoot接口-如何对接口进行签名',
                            path: 'dependencies/spring/SpringBoot/apidesign/SpringBoot接口-如何对接口进行签名.md'
                        },
                        
                    ]
                },
                {
                    title: 'Springboot集成文件',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'SpringBoot集成文件-基础的文件上传和下载',
                            path: 'dependencies/spring/SpringBoot/file/SpringBoot集成文件-基础的文件上传和下载.md'
                        },
                        {
                            title: 'SpringBoot集成文件-大文件的上传(异步，分片，断点续传和秒传)',
                            path: 'dependencies/spring/SpringBoot/file/SpringBoot集成文件-大文件的上传.md'
                        }
                    
                    ]
                },
                {
                    title: 'Springboot应用部署',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'SpringBoot应用部署-使用第三方JAR包',
                            path: 'dependencies/spring/SpringBoot/deploy/SpringBoot应用部署-使用第三方JAR包.md'
                        },
                    
                    ]
                },
                {
                    title: '相关注解',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'Spring Boot 自动配置之@Enable与@Import注解',
                            path: 'dependencies/spring/SpringBoot/annotation/SpringBoot自动配置之@Enable与@Import注解.md'
                        },
                        {
                            title: '@Conditional注解根据条件注入Bean到容器',
                            path: 'dependencies/spring/SpringBoot/annotation/Conditional注解根据条件注入Bean到容器.md'
                        },
                        {
                            title: '@EnableConfigurationProperties注解',
                            path: 'dependencies/spring/SpringBoot/annotation/EnableConfigurationProperties注解.md',
                            sidebarDepth: 3, // 可选的, 默认值是 1
                        },
                       
                        
                    ]
                },
            ]
        }, {
            title: 'Spring相关应用', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '拦截器和过滤器',
                    path: 'dependencies/spring/filter/拦截器和过滤器.md'
                },
                {
                    title: 'SpringBoot下定时任务方案',
                    path: 'dependencies/spring/apply/scheduled/SpringBoot下定时任务方案.md'
                }
            ]
        },
        {
            title: 'Spring注解', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                    title: '@Configuration注解',
                    path: 'dependencies/spring/annotation/Configuration注解.md'
                },
                {
                    title: 'Spring Boot 自动配置之@Enable与@Import注解',
                    path: 'dependencies/spring/SpringBoot/annotation/SpringBoot自动配置之@Enable与@Import注解.md'
                },
                {
                    title: '@Conditional注解根据条件注入Bean到容器',
                    path: 'dependencies/spring/SpringBoot/annotation/Conditional注解根据条件注入Bean到容器.md'
                },
                {
                    title: '@EnableConfigurationProperties注解',
                    path: 'dependencies/spring/SpringBoot/annotation/EnableConfigurationProperties注解.md'
                },
                {
                    title: 'Spring/SpringBoot常用注解',
                    path: 'dependencies/spring/annotation/Spring与SpringBoot常用注解.md'
                },
                
            ]
        },
        {
            title: 'Spring发展提升', // 必要的
            path: 'dependencies/spring/development/Spring发展提升.md', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        },
        {
            title: '集成/使用问题', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '打jar包，没有主清单属性',
                    path: 'dependencies/spring/problem/打jar包没有主清单属性.md'
                },
                {
                    title: 'SpringBoot下定时任务方案',
                    path: 'dependencies/spring/apply/scheduled/SpringBoot下定时任务方案.md'
                }
            ]
        },
    ]
}