exports.mulu = {
    title: 'ORM实体关系映射', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: 'MyBatis', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Mybatis生成实体类', // 必要的
                    path: 'dependencies/orm/Mybatis/Mybatis生成实体类.md'

                },
                {
                    title: '实战技巧', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: '模板', // 必要的
                        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                        collapsable: true, // 可选的, 默认值是 true,
                        sidebarDepth: 2, // 可选的, 默认值是 1
                        children: [{
                            title: 'Mybatis基础操作Mapper模板（一）', // 必要的
                            path: 'dependencies/orm/Mybatis/action/Mybatis基础操作Mapper模板.md'
                        }, {
                            title: 'Mybatis进阶操作Mapper模板（二）', // 必要的
                            path: 'dependencies/orm/Mybatis/action/Mybatis进阶操作Mapper模板.md'
                        }, {
                            title: 'Mybatis一对多Mapper模板（三）', // 必要的
                            path: 'dependencies/orm/Mybatis/action/Mybatis一对多Mapper模板.md'
                        }]
                    }, {
                        title: 'Mybatis使用collection解决一对多关联查询', // 必要的
                        path: 'dependencies/orm/Mybatis/action/Mybatis使用collection解决一对多关联查询.md'
                    }]
                },
                {
                    title: 'Mybatis常见面试题', // 必要的
                    path: 'dependencies/orm/Mybatis/interview/Mybatis常见面试题.md'
                }
            ]
        },
        {
            title: 'JPA', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '相关概念', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'JPA查询方式总结', // 必要的
                            path: 'dependencies/orm/jpa/base/JPA查询方式总结.md'
                        }, {
                            title: 'Spring Data JPA使用Specification复杂查询', // 必要的
                            path: 'dependencies/orm/jpa/base/SpringDataJPA使用Specification复杂查询.md'
                        },

                        {
                            title: 'JPA中的getOne，findOne以及findById区别', // 必要的
                            path: 'dependencies/orm/jpa/base/JPA中的getOne和findOne以及findById区别.md'
                        },
                        {
                            title: '@DynamicInsert和@DynamicUpdate生成动态SQL语句', // 必要的
                            path: 'dependencies/orm/jpa/base/@DynamicInsert和@DynamicUpdate生成动态SQL语句.md'
                        },


                    ]
                }, {
                    title: '具体使用', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'Spring Data JPA 实现多表关联查询', // 必要的
                            path: 'dependencies/orm/jpa/use/JPA实现多表关联查询.md'
                        },
                        {
                            title: 'Jpa 批量删除', // 必要的
                            path: 'dependencies/orm/jpa/use/Jpa批量删除.md'
                        }
                    ]
                },
                {
                    title: '问题集锦', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'JPA表大小写转换', // 必要的
                            path: 'dependencies/orm/jpa/problem/JPA表大小写转换.md'
                        },
                        {
                            title: 'JPA的getOne报错', // 必要的
                            path: 'dependencies/orm/jpa/problem/JPA的getOne报错.md'
                        },
                        {
                            title: 'JPA方言设置', // 必要的
                            path: 'dependencies/orm/jpa/problem/JPA方言设置.md'
                        }, {

                            title: 'JPA查询部分字段列名无效问题', // 必要的
                            path: 'dependencies/orm/jpa/problem/JPA查询部分字段列名无效问题.md'
                        }, {

                            title: 'JPA使用原生SQL查询数据库like的用法', // 必要的
                            path: 'dependencies/orm/jpa/problem/JPA使用原生SQL查询数据库like的用法.md'
                        }
                    ]
                },
                {
                    title: '辅助功能', // 必要的
                    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                            title: 'JPA多数据源', // 必要的
                            path: 'dependencies/orm/jpa/auxiliary/JPA多数据源.md'
                        },
                        {
                            title: '根据数据库表生成实体类', // 必要的
                            path: 'dependencies/orm/jpa/auxiliary/根据数据库表生成实体类.md'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Hibernate', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '集成使用', // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2, // 可选的, 默认值是 1
                    children: [{
                        title: 'Maven集成Hibernate示例', // 必要的
                        path: 'dependencies/orm/hibernate/Maven集成Hibernate示例.md'
                    }]
                },
                {
                    title: 'Hibernate概念与原理', // 必要的
                    path: 'dependencies/orm/hibernate/Hibernate概念与原理.md'
                },
                {
                    title: 'Hibernate的四种查询方式', // 必要的
                    path: 'dependencies/orm/hibernate/Hibernate的四种查询方式.md'
                },
                {
                    title: 'Hibernate实体类创建规则', // 必要的
                    path: 'dependencies/orm/hibernate/Hibernate实体类创建规则.md'
                }


            ]
        },
        {
            title: 'Mybatis-PageHelper', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'Mybatis-PageHelper源码分析', // 必要的
                path: 'dependencies/orm/Mybatis-PageHelper/Mybatis-PageHelper源码分析.md'
            }
            ]
        }
    ]
}