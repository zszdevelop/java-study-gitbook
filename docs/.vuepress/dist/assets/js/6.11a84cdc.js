(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1007:function(t,e,s){"use strict";s.r(e);var a=s(42),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"jmeter的基本使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jmeter的基本使用"}},[t._v("#")]),t._v(" JMeter的基本使用")]),t._v(" "),a("h2",{attrs:{id:"_1-基本使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-基本使用"}},[t._v("#")]),t._v(" 1. 基本使用")]),t._v(" "),a("h3",{attrs:{id:"_1-1-步骤1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-步骤1"}},[t._v("#")]),t._v(" 1.1 步骤1")]),t._v(" "),a("p",[a("strong",[t._v("在 Test Plan 上點右鍵， Add → Threads (Users) → Thread Group")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(908),alt:"image-20200102135005094"}})]),t._v(" "),a("h3",{attrs:{id:"_1-2-步骤2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-步骤2"}},[t._v("#")]),t._v(" 1.2 步骤2")]),t._v(" "),a("p",[t._v("设定有10个使用者来存取（测试）我们的服务")]),t._v(" "),a("p",[a("img",{attrs:{src:s(909),alt:"image-20200102135129772"}})]),t._v(" "),a("p",[a("em",[t._v("Ramp-Up Period (in seconds)")]),t._v(" 指得是「在幾秒內達到所設定的使用者人數」，可以讓受測服務一開始不會接受到太過巨量的 Requests")]),t._v(" "),a("h3",{attrs:{id:"_1-3-步骤3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-步骤3"}},[t._v("#")]),t._v(" 1.3 步骤3")]),t._v(" "),a("p",[t._v("模拟每个使用者，都会对我们的服务存取一定的次数")]),t._v(" "),a("p",[t._v("在 "),a("em",[t._v("Thread Group")]),t._v(" 上點右鍵， "),a("em",[t._v("Add → Logic Controller → Loop Controller")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(910),alt:"image-20200102135505057"}})]),t._v(" "),a("p",[t._v("設定 Loop count (迴圈/重複執行次數)為 100 次")]),t._v(" "),a("p",[a("img",{attrs:{src:s(911),alt:"image-20200102135539224"}})]),t._v(" "),a("p",[t._v("設定完 "),a("em",[t._v("Thread Group")]),t._v(" 和 "),a("em",[t._v("Loop Count")]),t._v(" 後，也就等於控制了對受測服務所發出的 request 數量，這邊作個簡單的計數的話就是：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("10 (Users) * 100 (Loop Count) = 1,000 (Requests)\n")])])]),a("p",[t._v("也就是我們的服務將接受 1,000 次 requests 的測試。")]),t._v(" "),a("h3",{attrs:{id:"_1-4-步骤4-设定要测试的http-request请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-步骤4-设定要测试的http-request请求"}},[t._v("#")]),t._v(" 1.4 步骤4：设定要测试的Http Request请求")]),t._v(" "),a("p",[t._v("建立一個 "),a("em",[t._v("HTTP Request")]),t._v("。在 "),a("em",[t._v("Loop Controller")]),t._v(" 上點右鍵， "),a("em",[t._v("Add → Sampler → HTTP Request")])]),t._v(" "),a("p",[a("img",{attrs:{src:s(912),alt:"image-20200102135714099"}})]),t._v(" "),a("p",[t._v("输入要测试的内容")]),t._v(" "),a("p",[a("img",{attrs:{src:s(913),alt:"image-20200102135823044"}})]),t._v(" "),a("p",[t._v("如果有需要添加请求header")]),t._v(" "),a("p",[a("img",{attrs:{src:s(914),alt:"image-20200102135918040"}})]),t._v(" "),a("p",[t._v("例如这里添加到content-type 为json")]),t._v(" "),a("p",[a("img",{attrs:{src:s(915),alt:"image-20200102135949198"}})]),t._v(" "),a("h3",{attrs:{id:"_1-5-建立测量图报表"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-建立测量图报表"}},[t._v("#")]),t._v(" 1.5 建立测量图报表")]),t._v(" "),a("p",[t._v("我們一樣在 "),a("em",[t._v("Loop Controller")]),t._v(" 上點右鍵， "),a("em",[t._v("Add → Listener → Graph Results")]),t._v(" 加入圖形化的測量結果：")]),t._v(" "),a("p",[a("img",{attrs:{src:s(916),alt:"image-20200102140708331"}})]),t._v(" "),a("p",[t._v("图标结果之后的展示页面")]),t._v(" "),a("p",[a("img",{attrs:{src:s(917),alt:"image-20200102140755976"}})]),t._v(" "),a("h2",{attrs:{id:"_1-6-view-results-tree"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-view-results-tree"}},[t._v("#")]),t._v(" 1.6 "),a("strong",[t._v("View Results Tree")])]),t._v(" "),a("p",[a("em",[t._v("Loop Controller")]),t._v(" 上點右鍵， "),a("em",[t._v("Add → Listener → View Results Tree")]),t._v(" 加入 "),a("em",[t._v("View Results Tree")]),t._v(" 來記錄每一筆 Request 的結果")]),t._v(" "),a("p",[a("img",{attrs:{src:s(918),alt:"image-20200102140846532"}})]),t._v(" "),a("p",[t._v("View Results Tree 裡可以看到實際傳回的 request 和 response data.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(919),alt:"image-20200102141029818"}})]),t._v(" "),a("h3",{attrs:{id:"_1-7-看结果集概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-7-看结果集概述"}},[t._v("#")]),t._v(" 1.7 看结果集概述")]),t._v(" "),a("p",[a("img",{attrs:{src:s(920),alt:"image-20200102141123652"}})]),t._v(" "),a("p",[t._v("概览图")]),t._v(" "),a("p",[a("img",{attrs:{src:s(921),alt:"image-20200102141152379"}})]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://stackoverflow.max-everyday.com/2017/09/jmeter/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Apache JMeter 測試工具簡單基本教學"),a("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=r.exports},908:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135005094.b3eb6300.png"},909:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135129772.595c7596.png"},910:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135505057.64c10f4d.png"},911:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135539224.48e453e3.png"},912:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135714099.e73eb4d6.png"},913:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135823044.eb6c7f9a.png"},914:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135918040.c1bb8a81.png"},915:function(t,e,s){t.exports=s.p+"assets/img/image-20200102135949198.71047727.png"},916:function(t,e,s){t.exports=s.p+"assets/img/image-20200102140708331.76d7cdd4.png"},917:function(t,e,s){t.exports=s.p+"assets/img/image-20200102140755976.515c3dcc.png"},918:function(t,e,s){t.exports=s.p+"assets/img/image-20200102140846532.c853a20a.png"},919:function(t,e,s){t.exports=s.p+"assets/img/image-20200102141029818.81ed81dc.png"},920:function(t,e,s){t.exports=s.p+"assets/img/image-20200102141123652.af2fa6ec.png"},921:function(t,e,s){t.exports=s.p+"assets/img/image-20200102141152379.f2d1cb23.png"}}]);