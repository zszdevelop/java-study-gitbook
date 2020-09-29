var LayoutMulu = require('./LayoutMulu');
var CssMulu = require('./CssMulu');
var ProblemMulu = require('./ProblemMulu');
var OptimizationMulu = require('./OptimizationMulu');
var PluginMulu = require('./PluginMulu');
var UtilsMulu = require('./UtilsMulu');

exports.mulu = {
    title: '前端',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        LayoutMulu.mulu,
        CssMulu.mulu,
        ProblemMulu.mulu,
        OptimizationMulu.mulu,
        PluginMulu.mulu,
        UtilsMulu.mulu
    ]}