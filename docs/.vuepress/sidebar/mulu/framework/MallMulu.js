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
            },
            {
                title: '商城设计要点', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [
                    {
                    title: '商城设计要点(一))-避免重复下单', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-避免重复下单.md'
                },
                {
                    title: '商城设计要点(二)-订单快照，减少存储成本', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-订单快照，减少存储成本.md'
                },
                {
                    title: '商城设计要点(三)-购物车，混合存储', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-购物车，混合存储.md'
                },
                {
                    title: '商城设计要点(四)-库存超卖', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-库存超卖.md'
                },
                {
                    title: '商城设计要点(五)-商家发货，物流单更新 ABA 问题', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-商家发货，物流单更新ABA问题.md'
                },
                {
                    title: '商城设计要点(六)-账户余额更新，保证事务', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-账户余额更新，保证事务.md'
                },
                {
                    title: '商城设计要点(七)-MySQL读写分离带来的数据不一致问题', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-MySQL读写分离带来的数据不一致问题.md'
                },
                {
                    title: '商城设计要点(八)-历史订单，归档', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-历史订单，归档.md'
                },
                {
                    title: '商城设计要点(九)-订单分库分表，多维度查询', // 必要的
                    path: 'framework/mall/mall商城服务端/focus/商城设计要点-订单分库分表，多维度查询.md'
                }
            ]
            }
        ]
    }]
}