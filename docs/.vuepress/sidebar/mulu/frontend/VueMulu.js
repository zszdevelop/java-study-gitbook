exports.mulu = {
    title: 'Vue', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: '语法', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'Vue过滤器', // 必要的
                    path: 'frontend/vue/grammar/Vue过滤器.md'

                },
                {
                    title: 'Vue插件', // 必要的
                    path: 'frontend/vue/grammar/Vue插件.md'

                },
                {
                    title: 'Vue中8种组件通信方式', // 必要的
                    path: 'frontend/vue/grammar/Vue中8种组件通信方式.md'
                }
            ]
        },
        {
            title: '第三方库', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'Vue Router', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                        title: 'Vue Router概念', // 必要的
                        path: 'frontend/vue/three/router/VueRouter概念.md'
                    },
                    {
                        title: 'Vue Router动态路由匹配', // 必要的
                        path: 'frontend/vue/three/router/VueRouter动态路由匹配.md'
                    },
                    {
                        title: 'Vue Router路由跳转', // 必要的
                        path: 'frontend/vue/three/router/VueRouter路由跳转.md'
                    },
                    {
                        title: 'Vue Router History模式', // 必要的
                        path: 'frontend/vue/three/router/VueRouterHistory模式.md'
                    }
                ]
            }, {
                title: 'vuex', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                    title: 'Vuex概念', // 必要的
                    path: 'frontend/vue/three/vuex/Vuex概念.md'

                }, {
                    title: 'Vuex实战', // 必要的
                    path: 'frontend/vue/three/vuex/Vuex实战.md'

                }]
            }]
        },
        {
            title: '操作数据', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'moment时间格式化', // 必要的
                    path: 'frontend/vue/moment时间格式化.md'

                },
                {
                    title: 'Vue指令v-for之遍历输出JavaScript数组，json对象的几种方式', // 必要的
                    path: 'frontend/vue/Vue指令v-for之遍历输出JavaScript数组json对象的几种方式.md'
                }
            ]
        },
        {
            title: 'UI框架', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'Element', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                    title: 'Element文件上传Upload', // 必要的
                    path: 'frontend/vue/ui/Element/Element文件上传Upload.md'

                }]
            }, ]
        },
        {
            title: '后台框架', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'vue-element-admin', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                    title: 'vue-element-admin入门使用', // 必要的
                    path: 'frontend/vue/admin/vue-element-admin/vue-element-admin入门使用.md'

                }]
            }, ]
        },
        {
            title: '小技巧', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'vue实现回到顶部的问题', // 必要的
                path: 'frontend/vue/skill/vue实现回到顶部的问题.md'
            }, ]
        }
    ]
}