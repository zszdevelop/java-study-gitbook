exports.mulu = {
    title: '消息中心设计', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: '消息中心数据库设计', // 必要的
            path: 'framework/messagesystem/消息中心数据库设计.md'
        },{
            title: '消息中心各场景消息发送逻辑', // 必要的
            path: 'framework/messagesystem/消息中心各场景消息发送逻辑.md'
        },
    ]
}