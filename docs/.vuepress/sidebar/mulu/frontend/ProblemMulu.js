exports.mulu = {
    title: '开发常见问题',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Vue.js中引入图片路径的几种方式',   // 必要的
            path: 'frontend/problem/Vuejs中引入图片路径的几种方式.md'
        },
        {
            title: 'js导出：exports、module.exports 和 export、export default',   // 必要的
            path: 'frontend/problem/js导出.md'
        },
        {
            title: 'Vue打包指定不压缩-排查线上问题',   // 必要的
            path: 'frontend/problem/Vue打包指定不压缩-排查线上问题.md'
        },
        {
            title: 'npm install时遇到的问题 npm ERR! code ERESOLVE',   // 必要的
            path: 'frontend/problem/npminstall时遇到的问题npmERRcodeERESOLVE.md'
        },
        {
            title: 'npm 运行项目时 Error: PostCSS received undefined instead of CSS string',   // 必要的
            path: 'frontend/problem/npmrun时PostCSS.md'
        }
    ]
}