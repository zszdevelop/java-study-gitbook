var CrawlerMulu = require('./CrawlerMulu');
var Libs3thMulu = require('./Libs3thMulu');
var BasePythonMulu = require('./BasePythonMulu');
exports.mulu = {
    title: 'Python',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        BasePythonMulu.mulu,
        Libs3thMulu.mulu,
        CrawlerMulu.mulu,
    ]}