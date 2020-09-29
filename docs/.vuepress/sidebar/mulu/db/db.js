var mysqlmulu = require('./MysqlMulu');
var OracleMulu = require('./OracleMulu');
var MongoDBMulu = require('./MongoDBMulu');
var SqlMulu = require('./SqlMulu');
exports.mulu = {
    title: '数据库',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        mysqlmulu.mulu,
        OracleMulu.mulu,
        MongoDBMulu.mulu,
        SqlMulu.mulu
    ]
}