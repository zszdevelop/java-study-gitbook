exports.mulu = {
    title: '定时器',   // 必要的
    //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2,    // 可选的, 默认值是 1
    children: [
        {
            title: 'Timer',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot定时任务-Timer实现方式',   // 必要的
                    path: 'dependencies/timer/Timer/SpringBoot定时任务-Timer实现方式.md'
                },]

        },
        {
            title: 'ScheduleExecutorService',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot定时任务-ScheduleExecutorService实现方式',   // 必要的
                    path: 'dependencies/timer/ScheduleExecutorService/SpringBoot定时任务-ScheduleExecutorService实现方式.md'
                },]

        },
        {
            title: ' Spring Schedule',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot定时任务-SpringSchedule实现方式',   // 必要的
                    path: 'dependencies/timer/SpringSchedule/SpringBoot定时任务-SpringSchedule实现方式.md'
                },]

        },
       
        {
            title: 'quartz',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot定时任务-基础quartz实现方式',   // 必要的
                    path: 'dependencies/timer/quartz/SpringBoot定时任务-基础quartz实现方式.md'
                },
                {
                    title: 'SpringBoot定时任务-分布式quartz cluster方式',   // 必要的
                    path: 'dependencies/timer/quartz/SpringBoot定时任务-分布式quartzcluster方式.md'
                },
                {
                    title: 'quartz定时器入门',   // 必要的
                    path: 'dependencies/timer/quartz/quartz定时器入门.md'
                },
                {
                    title: 'Quartz原理分析',   // 必要的
                    path: 'dependencies/timer/quartz/Quartz原理分析.md'
                },
                {
                    title: 'quartz流程总结',   // 必要的
                    path: 'dependencies/timer/quartz/quartz流程总结.md'
                },

                

                
            ]
        },
        {
            title: 'elastic-job',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot定时任务-分布式elastic-job方式',   // 必要的
                    path: 'dependencies/timer/elastic-job/SpringBoot定时任务-分布式elastic-job方式.md'
                },]

            
        },
        {
            title: 'xxl-job',   // 必要的
            //path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title: 'SpringBoot定时任务-分布式xxl-job方式',   // 必要的
                    path: 'dependencies/timer/xxl-job/SpringBoot定时任务-分布式xxl-job方式.md'
                },]

            
        }
    ]
}