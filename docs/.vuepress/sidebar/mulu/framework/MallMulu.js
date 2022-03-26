exports.mulu = {
    title: '商城', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
        title: 'mall商城服务端', // 必要的
        //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
                title: 'mall框架使用感受', // 必要的
                path: 'framework/mall/mall商城服务端/mall框架使用感受.md'
            },
            {
                title: 'mall商城下单流程', // 必要的
                path: 'framework/mall/mall商城服务端/mall商城下单流程.md'
            },
            {
                title: 'mall中SKU的设计', // 必要的
                path: 'framework/mall/mall商城服务端/mall中SKU的设计.md'
            },
            {
                title: 'mall中购物车设计', // 必要的
                path: 'framework/mall/mall商城服务端/mall中购物车设计.md'
            },

            {
                title: '商品模块（重点）', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                        title: 'mall中商品设计', // 必要的
                        path: 'framework/mall/mall商城服务端/product/mall中商品设计.md'
                    },
                    {
                        title: 'mall中商品类型设计（属性）', // 必要的
                        path: 'framework/mall/mall商城服务端/product/mall中商品类型设计.md'
                    },
                    {
                        title: 'mall中商品优惠方式(促销，会员价，阶梯价，满减)', // 必要的
                        path: 'framework/mall/mall商城服务端/product/mall中商品优惠方式.md'
                    }
                ]
            },
            {
                title: '营销模块（重点）', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                    title: 'mall中优惠券设计', // 必要的
                    path: 'framework/mall/mall商城服务端/marketing/mall中优惠券设计.md'
                },{
                    title: 'mall中广告（轮播图）设计', // 必要的
                    path: 'framework/mall/mall商城服务端/marketing/mall中广告设计.md'
                }]
            }
        ]
    }]
}