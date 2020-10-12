exports.mulu = {
    title: 'Spring',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Spring常见知识点',   // 必要的
            path: 'dependencies/spring/interview/Spring常见知识点.md'
        },
        {
            title: 'Spring整体架构',
            path: 'dependencies/spring/Framework/Spring整体架构.md',
        },
        {
            title: 'Spring IoC',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Spring IoC常见问题',
                    path: 'dependencies/spring/ioc/SpringIoC常见问题.md',
                },
                {
                    title: 'Spring Bean常见问题',
                    path: 'dependencies/spring/ioc/SpringBean常见问题.md',
                }
                ,
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
            title: 'SpringAOP',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringAOP概述',
                    path: 'dependencies/spring/aop/SpringAOP概述.md',
                },
                {
                    title: 'Spring AOP实现原理',
                    path: 'dependencies/spring/aop/SpringAOP实现原理.md',
                },
                {
                    title: 'AOP实战',   // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'AOP实现打印日志',
                            path: 'dependencies/spring/aop/AOP打印日志.md',
                        }, {
                            title: 'AOP实现Limit限流',
                            path: 'dependencies/spring/aop/Limit限流.md',
                        }
                    ]
                }
            ]
        }, {
            title: 'Spring事务',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Spring事务',
                    path: 'dependencies/spring/transaction/Spring事务.md'
                }
            ]
        }, {
            title: 'Spring MVC',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
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
            title: 'Spring Boot',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'Spring Boot常见知识点',
                    path: 'dependencies/spring/SpringBoot/'
                },
                {
                    title: 'SpringBoot启动过程',
                    path: 'dependencies/spring/SpringBoot/SpringBoot启动过程.md'
                },
                {
                    title: 'Spring Boot 自动配置之@Enable与@Import注解',
                    path: 'dependencies/spring/SpringBoot/SpringBoot自动配置之@Enable与@Import注解.md'
                },
                {
                    title: 'SpringBoot-Starter',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: '自定义SpringBoot Starter实现自动化配置',
                            path: 'dependencies/spring/SpringBoot/自定义SpringBootStarter实现自动化配置.md'
                        },
                        {
                            title: 'SpringBoot-Starter-权限白名单自动化配置',
                            path: 'dependencies/spring/SpringBoot/SpringBoot-Starter-权限白名单自动化配置.md'
                        }
                    ]
                },
            ]
        }, {
            title: 'Spring模板引擎',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'JSP',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        {
                            title: 'SpringBoot集成JSP',
                            path: 'dependencies/spring/muban/jsp/SpringBoot集成JSP.md'
                        }]
                }
            ]
        }, {
            title: 'Spring相关应用',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {
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
            title: 'Spring发展提升',   // 必要的
            path: 'dependencies/spring/development/Spring发展提升.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        }
    ]
}