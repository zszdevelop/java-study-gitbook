(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{1005:function(t,e,r){"use strict";r.r(e);var s=r(42),_=Object(s.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"转发和重定向"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#转发和重定向"}},[t._v("#")]),t._v(" 转发和重定向")]),t._v(" "),r("h2",{attrs:{id:"_1-转发和重定向实现方式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-转发和重定向实现方式"}},[t._v("#")]),t._v(" 1. 转发和重定向实现方式")]),t._v(" "),r("h3",{attrs:{id:"_1-1-转发-forward"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-转发-forward"}},[t._v("#")]),t._v(" 1.1 转发(Forward)")]),t._v(" "),r("p",[t._v("通过RequestDispatcher 对象的forward（HttpServletRequest request,HttpServletResponse response）方法实现的。")]),t._v(" "),r("p",[t._v("RequestDispatcher可以通过HttpServletRequest 的getRequestDispatcher()方法获得")]),t._v(" "),r("p",[r("strong",[t._v("案例")]),t._v("：转发到login_success.jsp")]),t._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[t._v('request.getRequestDispatcher("login_success.jsp").forward(request, response);\n')])])]),r("h3",{attrs:{id:"_1-2-重定向-redirect"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-重定向-redirect"}},[t._v("#")]),t._v(" 1.2 重定向（Redirect）")]),t._v(" "),r("p",[t._v("利用服务器返回的状态码来实现的。客户端浏览器请求服务器的时候，服务器会返回一个状态码。")]),t._v(" "),r("p",[t._v("服务器通过HttpServletResponse 的setStatus(int status)方法设置状态码，如果服务器返回301或者302,则浏览器会到新的网址重新请求该资源")]),t._v(" "),r("h2",{attrs:{id:"_2-转发-forward-和重定向-redirect-的区别"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-转发-forward-和重定向-redirect-的区别"}},[t._v("#")]),t._v(" 2. 转发(Forward) 和重定向(Redirect) 的区别")]),t._v(" "),r("p",[r("strong",[t._v("转发是服务端行为，重定向是客户端行为")])]),t._v(" "),r("ol",[r("li",[r("p",[t._v("从地址栏显示来说")]),t._v(" "),r("ul",[r("li",[t._v("forward 是服务器请求资源，")])]),t._v(" "),r("p",[t._v("​\t服务器直接访问目标地址的URL,吧那个url的响应内容读取过来，然后把这些内容再发给浏览器。")]),t._v(" "),r("p",[t._v("​\t浏览器根本不知道服务器发送的内容哪里来的，所以他的地址栏还是原来的地址。")]),t._v(" "),r("ul",[r("li",[r("p",[t._v("redirect 是服务端根据逻辑，发送状态码")]),t._v(" "),r("p",[t._v("redirect是服务端根据逻辑,发送一个状态码,告诉浏览器重新去请求那个地址.所以地址栏显示的是新的URL.")])])])]),t._v(" "),r("li",[r("p",[t._v("从数据共享上说")]),t._v(" "),r("ul",[r("li",[r("p",[t._v("forward：")]),t._v(" "),r("p",[t._v("转发页面和转发到页面可以共享request里面的数据")])]),t._v(" "),r("li",[r("p",[t._v("redirect:")]),t._v(" "),r("p",[t._v("不能共享数据")])])])]),t._v(" "),r("li",[r("p",[t._v("从运用地方来说")]),t._v(" "),r("ul",[r("li",[r("p",[t._v("forward：")]),t._v(" "),r("p",[t._v("一般用于登录的时候。根据角色转发到响应的模块")])]),t._v(" "),r("li",[r("p",[t._v("redirect:")]),t._v(" "),r("p",[t._v("一般用于用户注销登陆时返回主页面和跳转到其他网站等")])])])]),t._v(" "),r("li",[r("p",[t._v("从效率上说")]),t._v(" "),r("ul",[r("li",[t._v("forward：高")]),t._v(" "),r("li",[t._v("redirect；低")])])])])])}),[],!1,null,null,null);e.default=_.exports}}]);