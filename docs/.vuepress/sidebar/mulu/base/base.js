var basemulu = require('./basemulu');
var jvmmulu = require('./jvmmulu');
var j2eemulu = require('./j2eemulu');
var mubanmulu = require('./mubanmulu');
exports.mulu = {
    title: 'Java基础',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        basemulu.mulu,
        jvmmulu.mulu,
        j2eemulu.mulu,
        mubanmulu.mulu
    ]
}