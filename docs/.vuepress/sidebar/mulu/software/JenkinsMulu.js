exports.mulu = {
    title: 'Jenkins', // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [

        {
            title: '安装', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                title: 'Jenkins安装',
                path: 'software/jenkins/install/Jenkins安装.md'
            },{
                title: 'Jenkins控制台乱码',
                path: 'software/jenkins/install/Jenkins控制台乱码.md'
            },{
                title: 'Jenkins使用sshagent插件部署远程服务',
                path: 'software/jenkins/install/Jenkins使用sshagent插件部署远程服务.md'
            }
        ]
        }, {
            title: '基础概念', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [
                {
                title: 'Jenkins Pipeline 介绍',
                path: 'software/jenkins/base/JenkinsPipeline介绍.md'
            },{
                title: '共享库', // 必要的
                //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [
                    {
                        title: 'Jenkins共享库编写与使用',
                        path: 'software/jenkins/base/共享库/Jenkins共享库.md'
                    },
                    // {
                    //     title: 'Jenkins共享库-jenkinslibrary',
                    //     path: 'software/jenkins/base/共享库/Jenkins共享库-jenkinslibrary.md'
                    // }
                ]
                },
             {
                title: 'Jenkins设置环境变量',
                path: 'software/jenkins/base/Jenkins设置环境变量.md'
            }
        ]
        }, {
            title: 'freestyle自由构建', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [

                {
                    title: '打包部署SpringBoot应用',
                    path: 'software/jenkins/freestyle/Jenkins打包部署SpringBoot应用.md'
                }
            ]
        }, {
            title: 'Pipeline流水线构建', // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: 'jenkinsfile部署springboot项目',
                path: 'software/jenkins/pipeline/jenkinsfile部署springboot项目.md'
            },{
                title: 'jenkinsfile部署前端Vue项目',
                path: 'software/jenkins/pipeline/jenkinsfile部署前端Vue项目.md'
            }, ]
        }

    ]
}