var springmulu = require('./springmulu');
// var MyBatisMulu = require('./MyBatisMulu');
var OrmMulu = require('./OrmMulu.js');
var SentinelMulu = require('./SentinelMulu.js');
var SpringBootAdminMulu = require('./SpringBootAdminMulu.js');
var ZookeeperMulu = require('./ZookeeperMulu.js');
var PushMulu = require('./PushMulu.js');
var MavenMulu = require('./MavenMulu.js');
var SwaggerMulu = require('./SwaggerMulu.js');
var OfficeMulu = require('./OfficeMulu.js');
var MQMulu = require('./MQMulu.js');
var DBManagerMulu = require('./DBManagerMulu.js');
var SearchMulu = require('./SearchMulu.js');
var RequestHttpMulu = require('./RequestHttpMulu.js');
var TimerMulu = require('./TimerMulu.js');
var LogMulu = require('./LogMulu.js');
var Monitor = require('./Monitor.js');


exports.mulu = {
    title: '第三方依赖',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        springmulu.mulu,
        OrmMulu.mulu,
        SentinelMulu.mulu,
        SpringBootAdminMulu.mulu,
        ZookeeperMulu.mulu,
        PushMulu.mulu,
        MavenMulu.mulu,
        SwaggerMulu.mulu,
        MQMulu.mulu,
        DBManagerMulu.mulu,
        SearchMulu.mulu,
        RequestHttpMulu.mulu,
        TimerMulu.mulu,
        LogMulu.mulu,
        OfficeMulu.mulu,
        Monitor.mulu
    ]
}