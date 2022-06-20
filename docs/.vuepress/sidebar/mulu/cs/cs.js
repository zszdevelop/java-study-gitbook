var LinuxMulu = require('./LinuxMulu');
var CsMulu = require('./CsMulu');
var WinMulu = require('./WinMulu');
var MacMulu = require('./MacMulu');
var SkillMulu = require('./SkillMulu');
exports.mulu = {
    title: '计算机基础',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        LinuxMulu.mulu,
        CsMulu.mulu,
        WinMulu.mulu,
        MacMulu.mulu,
        SkillMulu.mulu
    ]}