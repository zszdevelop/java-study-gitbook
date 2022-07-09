exports.mulu = {
    title: '安全', // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [{
            title: '注入攻击', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: '开发安全-注入攻击详解', // 必要的
                    path: 'develop/security/injection/开发安全-注入攻击详解.md',
                },
                {
                    title: '防止SQL注入攻击实战', // 必要的
                    path: 'develop/security/injection/防止SQL注入攻击实战.md',
                },
            ]
        },
        {
            title: 'CSRF&CORS', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                    title: 'CORS和CSRF', // 必要的
                    path: 'develop/security/corscsrf/CORS和CSRF.md',
                }, {
                    title: '开发安全-CSRF详解', // 必要的
                    path: 'develop/security/corscsrf/开发安全-CSRF详解.md',
                },

            ]
        },
        {
            title: 'XSS', // 必要的
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: [{
                title: '开发安全-XSS详解', // 必要的
                path: 'develop/security/xss/开发安全-XSS详解.md',
            }, {
                title: '防止XSS攻击实战', // 必要的
                path: 'develop/security/xss/防止XSS攻击实战.md',
            }, ]
        },
        {
            title: '开发安全-DDoS详解', // 必要的
            path: 'develop/security/开发安全-DDoS详解.md',
        },
        {
            title: '开发安全-点击劫持详解', // 必要的
            path: 'develop/security/开发安全-点击劫持详解.md',
        },
        {
            title: '开发安全-渗透测试流程示例', // 必要的
            path: 'develop/security/开发安全-渗透测试流程示例.md',
        }

        
        

    ]
}