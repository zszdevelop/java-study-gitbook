exports.mulu = {
    title: '特定领域算法',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: '分布式算法-一致性Hash算法',   // 必要的
            path: 'algorithm/domain/distributed/分布式算法-一致性Hash算法.md'
        },
        {
            title: '分布式算法-Paxos算法',   // 必要的
            path: 'algorithm/domain/distributed/分布式算法-Paxos算法.md'
        },
        {
            title: '分布式算法-Raft算法',   // 必要的
            path: 'algorithm/domain/distributed/分布式算法-Raft算法.md'
        },
        {
            title: '分布式算法-ZAB算法',   // 必要的
            path: 'algorithm/domain/distributed/分布式算法-ZAB算法.md'
        }
    ]
}