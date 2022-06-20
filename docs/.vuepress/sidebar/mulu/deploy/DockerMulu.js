exports.mulu = {
    title: 'Docker', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [

        {
            title: 'Docker基础-仓库，镜像，容器详解', // 必要的
            path: 'deploy/docker/Docker基础-仓库镜像容器详解.md',
        },
        {
            title: 'Docker基础-一个web应用实例', // 必要的
            path: 'deploy/docker/Docker基础-一个web应用实例.md',
        },
        {
            title: 'Docker基础-Docker数据卷和数据管理', // 必要的
            path: 'deploy/docker/Docker基础-Docker数据卷和数据管理.md',
        },
        {
            title: 'Docker基础-Dockerfile详解', // 必要的
            path: 'deploy/docker/Docker基础-Dockerfile详解.md',
        },
        {
            title: 'Docker基础-DockerCompose详解', // 必要的
            sidebarDepth: 3, // 可选的, 默认值是 1
            path: 'deploy/docker/Docker基础-DockerCompose详解.md',
        },
        {
            title: 'Docker基础-Docker入门实战快速上手', // 必要的
            path: 'deploy/docker/Docker基础-Docker入门实战快速上手.md',
        },
        {
            title: 'Docker实战', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: '集成docker实现一键部署', // 必要的
                path: 'deploy/docker/action/集成docker实现一键部署.md' // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            }, {
                title: 'Centos安装Docker', // 必要的
                path: 'deploy/docker/action/Centos安装Docker.md',
            }, ]
        },




        {
            title: 'Docker参考文章', // 必要的
            path: 'https://yeasy.gitbooks.io/docker_practice/',
        },
    ]
}, {
    title: 'Docker Compose', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
        title: 'Docker Compose入门', // 必要的
        path: 'deploy/dockerCompose/DockerCompose入门.md',
    }, {
        title: 'Docker Compose常用命令', // 必要的
        path: 'deploy/dockerCompose/DockerCompose常用命令.md',
    }]
}, {
    title: 'Kubernetes容器编排管理平台', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: 'Kubernetes基本概念', // 必要的
            path: 'deploy/Kubernetes/Kubernetes基本概念.md',
        }, {
            title: 'Kubernetes架构', // 必要的
            path: 'deploy/Kubernetes/Kubernetes架构.md',
        },

        // {
        //     title: 'Kubeadm安装Kubernetes',   // 必要的
        //     path: 'deploy/Kubernetes/Kubeadm安装Kubernetes.md',
        // }
    ]
}, {
    title: 'Rancher', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
        title: '安装Rancher', // 必要的
        path: 'deploy/rancher/安装Rancher.md',
    }, {
        title: 'Rancher部署服务', // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
            title: 'Rancher部署服务简单示例', // 必要的
            path: 'deploy/rancher/Rancher部署服务简单示例.md'
        }]
    }, {
        title: 'Rancher集群启动失败Failed to bring up Etcd Plane', // 必要的
        path: 'deploy/rancher/Rancher集群启动失败FailedtobringupEtcdPlane.md',
    }, {
        title: 'Rancher中文文档', // 必要的
        path: 'https://docs.rancher.cn/rancher2x/',
    }]
}, {
    title: 'Docker镜像仓库', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
        title: 'Harbor',
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: [{
            title: 'Docker镜像仓库Harbor',
            path: 'deploy/repository/harbor/Docker镜像仓库Harbor.md'
        }]
    }]
}