
var SelectionMulu = require('./SelectionMulu');
var DeepImpressionMulu = require('./DeepImpressionMulu');
var ManagerMulu = require('./ManagerMulu');
var PeojectManageMulu = require('./PeojectManageMulu');
var MyinterviewMulu = require('./MyinterviewMulu');
var OptimizationMulu = require('./OptimizationMulu');

exports.mulu = {
    title: '日常思考',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        OptimizationMulu.mulu,
        DeepImpressionMulu.mulu,
        SelectionMulu.mulu,
        ManagerMulu.mulu,
        PeojectManageMulu.mulu,
        MyinterviewMulu.mulu
    ]}