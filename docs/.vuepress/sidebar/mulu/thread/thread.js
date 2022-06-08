var ConcurrentMulu = require('./ConcurrentMulu');
var ThreadMulu = require('./ThreadMulu');
var KeywordsMulu = require('./KeywordsMulu');
var JUCCollectionMulu = require('./JUCCollectionMulu');
var JUCExecutorMulu = require('./JUCExecutorMulu');
var JUCLockMulu = require('./JUCLockMulu');
var JUCToolsMulu = require('./JUCToolsMulu');


var SummaryMulu = require('./SummaryMulu');

exports.mulu = {
    title: '多线程与并发', // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
        ThreadMulu.mulu,
        KeywordsMulu.mulu,
        ConcurrentMulu.mulu,
        JUCCollectionMulu.mulu,
        JUCLockMulu.mulu,
        JUCToolsMulu.mulu,
        JUCExecutorMulu.mulu,
        SummaryMulu.mulu,
    ]
}