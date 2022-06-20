var DockerMulu = require('./DockerMulu');
exports.mulu = {
    title: '部署', // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        DockerMulu.mulu
    ]

}