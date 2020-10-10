var springmulu = require('./springmulu');
var MyBatisMulu = require('./MyBatisMulu');
var RedisMulu = require('./RedisMulu');
var SentinelMulu = require('./SentinelMulu.js');
var SpringBootAdminMulu = require('./SpringBootAdminMulu.js');
var ZookeeperMulu = require('./ZookeeperMulu.js');
var PushMulu = require('./PushMulu.js');
var MavenMulu = require('./MavenMulu.js');
var SwaggerMulu = require('./SwaggerMulu.js');
var DruidMulu = require('./DruidMulu.js');
var OfficeMulu = require('./OfficeMulu.js');
var MQMulu = require('./MQMulu.js');
var HibernateMulu = require('./HibernateMulu.js');

exports.mulu = {
    title: '第三方依赖',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        springmulu.mulu,
        MyBatisMulu.mulu,
        RedisMulu.mulu,
        SentinelMulu.mulu,
        SpringBootAdminMulu.mulu,
        ZookeeperMulu.mulu,
        PushMulu.mulu,
        MavenMulu.mulu,
        SwaggerMulu.mulu,
        DruidMulu.mulu,
        MQMulu.mulu,
        OfficeMulu.mulu,
        HibernateMulu.mulu
    ]
}