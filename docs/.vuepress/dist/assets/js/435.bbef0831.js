(window.webpackJsonp=window.webpackJsonp||[]).push([[435],{1029:function(s,t,e){"use strict";e.r(t);var a=e(42),c=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"mockito基本功能"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mockito基本功能"}},[s._v("#")]),s._v(" Mockito基本功能")]),s._v(" "),e("h2",{attrs:{id:"_1-对象-复制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-对象-复制"}},[s._v("#")]),s._v(" 1.对象“复制”")]),s._v(" "),e("p",[s._v("mockito可以轻易复制出各种类型的对象，并与之进行交互")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("// 列表\nList mockList = mock(List.class);\nmockList.add(1);\nmockList.clear();\n\n// Socket对象\nSocket mockSocket = mock(Socket);\nmockSocket.connect(new InetSocketAddress(8080));\nmockSocket.close();\n")])])]),e("h2",{attrs:{id:"_2-技能复制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-技能复制"}},[s._v("#")]),s._v(" 2.技能复制")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("List mockList = mock(List.class);\nmockList.add(1); // 简单交互\nmockList.get(1); // 返回值为null\nmockList.size(); // 返回值为0\n")])])]),e("p",[s._v("虽然复制出来的对象上所有的方法都能被调用，"),e("strong",[s._v("只会返回默认的返回值")])]),s._v(" "),e("ul",[e("li",[s._v("需要返回对象：默认返回null")]),s._v(" "),e("li",[s._v("需要返回int：默认返回0")])]),s._v(" "),e("h3",{attrs:{id:"_2-1指定返回值"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-1指定返回值"}},[s._v("#")]),s._v(" 2.1指定返回值")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('List mockList = mock(List.class);\nwhen(mockList.get(anyInt()).thenReturn(1);\nwhen(mockList.size()).thenReturn(1, 2, 3);\n\nassertEquals("预期返回1", 1, mockList.get(1)); // pass\nassertEquals("预期返回1", 1, mockList.get(2)); // pass\nassertEquals("预期返回1", 1, mockList.get(3)); // pass\n\nassertEquals("预期返回1", 1, mockList.size()); // pass\nassertEquals("预期返回2", 2, mockList.size()); // pass\nassertEquals("预期返回3", 3, mockList.size()); // pass\n')])])]),e("p",[s._v('when（mock执行什么方法）.thenReturn("指定mock需要返回的值")，返回值都是mock指定')]),s._v(" "),e("h2",{attrs:{id:"_3-验证"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-验证"}},[s._v("#")]),s._v(" 3.验证")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("verify(mockList, never()).clear(); // 从未调用过clear方法\nverify(mockList, times(2)).get(1); // get(1)方法调用了2次\nverify(mockList, times(3)).get(anyInt()); // get(任意数字)调用了3次\nverfiy(mockList, times(4)).size(); // 这里会失败，因为上面我们只调用了size方法3次\n")])])]),e("p",[s._v("mock对他做过什么一清二楚")])])}),[],!1,null,null,null);t.default=c.exports}}]);