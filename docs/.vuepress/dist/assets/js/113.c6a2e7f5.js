(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{775:function(t,a,e){t.exports=e.p+"assets/img/image-20201010094508032.4b7d9945.png"},776:function(t,a,e){t.exports=e.p+"assets/img/image-20201010093714396.8706cf32.png"},957:function(t,a,e){"use strict";e.r(a);var s=e(42),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"删除-git中的错误提交的文件-md"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#删除-git中的错误提交的文件-md"}},[t._v("#")]),t._v(" 删除.git中的错误提交的文件.md")]),t._v(" "),s("h2",{attrs:{id:"_1-背景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-背景"}},[t._v("#")]),t._v(" 1. 背景")]),t._v(" "),s("p",[t._v("Git 操作时，经常“不小心”上传一些不必要的（大）文件，或者私密数据，等等。")]),t._v(" "),s("p",[t._v("当然可以从本地把这些文件删除，加入 "),s("code",[t._v(".gitignore")]),t._v(", 避免下次再上传。")]),t._v(" "),s("p",[t._v("然而，"),s("strong",[t._v("之前已经上传过的，还遗留在 git 历史中")])]),t._v(" "),s("h2",{attrs:{id:"_2-实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-实例"}},[t._v("#")]),t._v(" 2. 实例")]),t._v(" "),s("p",[t._v("如下是一个我误将vue 的第三方依赖node_modules 添加到git 导致.git文件过大")]),t._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:e(775),alt:"image-20201010094508032"}}),t._v(" "),s("h2",{attrs:{id:"_3-操作步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-操作步骤"}},[t._v("#")]),t._v(" 3. 操作步骤")]),t._v(" "),s("ol",[s("li",[s("p",[s("a",{attrs:{href:"https://rtyley.github.io/bfg-repo-cleaner/",target:"_blank",rel:"noopener noreferrer"}},[t._v("下载bfg.jar"),s("OutboundLink")],1),t._v(", 直接将其复制到 "),s("code",[t._v("your-repo.git")]),t._v(" 目录下")])]),t._v(" "),s("li",[s("p",[t._v("删除.git 中的文件或者文件夹")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("删除文件")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[t._v("java -jar bfg-1.12.16.jar --delete-files test1.py\n")])])])]),t._v(" "),s("li",[s("p",[t._v("删除文件夹")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[t._v("java -jar bfg-1.12.16.jar --delete-folders "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{folderA,folderB,folderC}"')]),t._v("\n")])])])])])]),t._v(" "),s("li",[s("p",[t._v("执行如下 git 命令")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reflog expire --expire"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("now --all "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" gc --prune"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("now --aggressive\n")])])]),s("p",[t._v("此时查看.git 文件夹，就可以看到文件变小了")])])]),t._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:e(776),alt:"image-20201010093714396"}}),t._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://juejin.im/post/6844904045459537934",target:"_blank",rel:"noopener noreferrer"}},[t._v("BFG Repo-Cleaner - 从 Git 历史中真正删除文件"),s("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=r.exports}}]);