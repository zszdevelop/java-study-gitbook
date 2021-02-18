var LinuxUtilsMulu = require('./LinuxUtilsMulu');
var JavaUtilsMulu = require('./JavaUtilsMulu');
var FrontendUtilsMulu = require('../frontend/UtilsMulu');
exports.mulu = {
    title: '工具类',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        LinuxUtilsMulu.mulu,
        JavaUtilsMulu.mulu,
        FrontendUtilsMulu.mulu
    ]}