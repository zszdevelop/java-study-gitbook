import{_ as r,W as s,X as l,Y as e,Z as n,$ as a,a0 as d,D as t}from"./framework-0cf5f349.js";const c={},v=e("h1",{id:"vue-element-admin入门使用",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vue-element-admin入门使用","aria-hidden":"true"},"#"),n(" vue-element-admin入门使用")],-1),m=e("h2",{id:"_1-简介",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-简介","aria-hidden":"true"},"#"),n(" 1. 简介")],-1),u={href:"https://panjiachen.github.io/vue-element-admin",target:"_blank",rel:"noopener noreferrer"},o={href:"https://github.com/vuejs/vue",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/ElemeFE/element",target:"_blank",rel:"noopener noreferrer"},b=d(`<p>一套完善的后台管理系统的前端解决方案。已经内置了丰富的功能。可快速改造开发上手</p><h2 id="_2-demo运行" tabindex="-1"><a class="header-anchor" href="#_2-demo运行" aria-hidden="true">#</a> 2. demo运行</h2><h3 id="_2-1-开发" tabindex="-1"><a class="header-anchor" href="#_2-1-开发" aria-hidden="true">#</a> 2.1 开发</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),p={href:"http://localhost:9527/",target:"_blank",rel:"noopener noreferrer"},_=d(`<h3 id="_2-2-发布" tabindex="-1"><a class="header-anchor" href="#_2-2-发布" aria-hidden="true">#</a> 2.2 发布</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-其它" tabindex="-1"><a class="header-anchor" href="#_2-3-其它" aria-hidden="true">#</a> 2.3 其它</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function g(x,f){const i=t("ExternalLinkIcon");return s(),l("div",null,[v,m,e("blockquote",null,[e("p",null,[e("a",u,[n("vue-element-admin"),a(i)]),n(" 是一个后台前端解决方案，它基于 "),e("a",o,[n("vue"),a(i)]),n(" 和 "),e("a",h,[n("element-ui"),a(i)]),n("实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。")])]),b,e("p",null,[n("浏览器访问 "),e("a",p,[n("http://localhost:9527"),a(i)])]),_])}const E=r(c,[["render",g],["__file","element-admin-started.html.vue"]]);export{E as default};
