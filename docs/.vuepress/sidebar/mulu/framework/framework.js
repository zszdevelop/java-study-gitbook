var BigSiteMulu = require('./BigSiteMulu');
var RbacMulu = require('./RbacMulu');
exports.mulu = {
    title: '系统架构',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        BigSiteMulu.mulu,
        RbacMulu.mulu
    ]}