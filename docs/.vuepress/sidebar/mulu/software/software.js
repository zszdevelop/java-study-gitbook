var NginxMulu = require('./NginxMulu');
var IdeaMulu = require('./IdeaMulu');
var GrabbagMulu = require('./GrabbagMulu');
var GitlabMulu = require('./GitlabMulu');
var VCSMulu = require('./VCSMulu');
var DbMulu = require('./DbMulu');
var BlogMulu = require('./BlogMulu');
var AxureMulu = require('./AxureMulu');
var TomcatMulu = require('./TomcatMulu');
var JenkinsMulu = require('./JenkinsMulu');
var NexusMulu = require('./NexusMulu');
var SiteMulu = require('./SiteMulu');


exports.mulu = {
    title: '常用软件',   // 必要的
    // path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        NginxMulu.mulu,
        IdeaMulu.mulu,
        GrabbagMulu.mulu,
        VCSMulu.mulu,
        GitlabMulu.mulu,
        DbMulu.mulu,
        AxureMulu.mulu,
        BlogMulu.mulu,
        TomcatMulu.mulu,
        JenkinsMulu.mulu,
        NexusMulu.mulu,
        SiteMulu.mulu
    ]}