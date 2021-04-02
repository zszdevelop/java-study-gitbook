var UnitTestMulu = require('./UnitTestMulu');
var PressureTestMulu = require('./PressureTestMulu');
exports.mulu = {
    title: '测试',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        UnitTestMulu.mulu,
        PressureTestMulu.mulu
    ]}