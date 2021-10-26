var MiddlewareMulu = require('./MiddlewareMulu');
var ProblemMulu = require('./ProblemMulu');



exports.mulu = {
    title: '项目国产化',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        MiddlewareMulu.mulu,
        ProblemMulu.mulu
    ]}