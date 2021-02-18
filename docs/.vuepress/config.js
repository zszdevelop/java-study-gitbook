
// var a = require('/sidebar');
var sidebar = require('./sidebar/sidebar');



module.exports = {
  // 包含顶级域名不需要
  // base:'java-study-gitbook',
  title: 'Java学习笔记',
  description: 'Java小白的成长史',
  head: [
    ['script', {}, `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?78dc0e0b4e3aedf643d6621778307a6f";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();

      `]
  ],
  themeConfig: {
    // 导航栏图标
    logo: '/assets/img/logo.png',
    repo: 'https://github.com/zszdevelop/java-study-gitbook',
    repoLabel: 'Github',
    algolia: {
      apiKey: 'c8e53deb617c118364166fcd7ed64423',
      indexName: 'isture'
    },
    // 顶部导航栏
    nav: [
      {
        text: 'Java',
        items: [
          { text: 'Java基础', link: '/base/object/Java基础' },
          { text: '第三方依赖库', link: '/spring/interview/Spring常见知识点' },
          { text: '数据库', link: '/db/mysql/CentosMySQL安装' },
          { text: '测试', link: '/test/单元测试' }
        ]
      },
      {
        text: '系统架构', items: [
          { text: '微服务', link: '/microservice/concept/微服务治理梳理' },
          { text: '系统架构', link: '/framework/大型网站技术架构思维导图' }
        ]
      },
      { text: '前端', link: '/frontend/layout/flex/flex布局' },
      {
        text: '更多', items: [
          { text: '计算机基础', link: '/linux/operation/linux查看哪些进程占用CPU内存资源多' },
          { text: '常用软件', link: '/linux/nginx/安装nginx' },
          { text: '日常思考', link: '/work/APP更新方案选择' }
        ]
      },
      // { text: 'Github', link: 'https://github.com/zszdevelop/java-study-gitbook' }
    ],
    // 自动生成侧边栏  
    sidebar: sidebar.mulu
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  },
  plugins: [
    ['@dovyp/vuepress-plugin-clipboard-copy', true]
  ]
}