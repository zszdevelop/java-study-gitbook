(window.webpackJsonp=window.webpackJsonp||[]).push([[447],{1010:function(s,t,a){"use strict";a.r(t);var e=a(42),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"join联结表"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#join联结表"}},[s._v("#")]),s._v(" JOIN联结表")]),s._v(" "),a("h2",{attrs:{id:"_1-联结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-联结"}},[s._v("#")]),s._v(" 1. 联结")]),s._v(" "),a("p",[s._v("SQL 最强大的功能之一就是能在数据查询的执行中联结（join）表")]),s._v(" "),a("p",[s._v("联结是一种机制，用一条SELECT 语句中关联表")]),s._v(" "),a("h3",{attrs:{id:"_1-2-反例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-反例"}},[s._v("#")]),s._v(" 1.2 反例")]),s._v(" "),a("p",[s._v("结果为笛卡尔积")]),s._v(" "),a("blockquote",[a("p",[s._v("由没有联结条件的表关系返回的结果为笛卡尔积，检索出的行的数目将是第一个表的行数乘以第二个表中函数")])]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("SELECT vend_name,prod_name.prod_price\nFROM Vendors,Products;\n")])])]),a("p",[s._v("这里的返回结果并不是我们想要的，返回的数据用每个供应商匹配了每个产品，包括了供应商不正确的产品（即使供应商根本就没有的产品）")]),s._v(" "),a("h2",{attrs:{id:"_2-联结方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-联结方式"}},[s._v("#")]),s._v(" 2.联结方式")]),s._v(" "),a("h3",{attrs:{id:"_2-1-内联结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-内联结"}},[s._v("#")]),s._v(" 2.1  内联结")]),s._v(" "),a("p",[s._v("内联结：两个表之间的相等测试")]),s._v(" "),a("p",[s._v("联结条件用特定的ON 子句而不是WHERE 子句给出")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("SELECT vend_name,prod_name,prod_price\nFRM Vendors INNER JOIN Products \nON Vendors.vend_id = Products.vend_id;\n")])])]),a("h3",{attrs:{id:"_2-2-自联结-self-join"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-自联结-self-join"}},[s._v("#")]),s._v(" 2.2 自联结（self-join）")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("SELECT c1.cust_id,c1.cust_name.c1.cust_contact\nFROM Customers AS c1,Customers AS c2\nWHERE c1.cust_name=c2.cust_name\nAND c2.cust_contact='Jim Jones'\n")])])]),a("p",[a("strong",[s._v("为什么用自联结而不用子查询")])]),s._v(" "),a("p",[s._v("因为处理联结远比处理子查询快得多")]),s._v(" "),a("h3",{attrs:{id:"_2-3-自然联结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-自然联结"}},[s._v("#")]),s._v(" 2.3 自然联结")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("SELECT C.*,O.order_num,O.order_date,OI.prod_id\nFROM Customers AS C,Orders AS O,OrderItems AS OI\nWHERE C.cust_id = O.cust_id\nAND OI.order_num = O.Order_num\nAND prod_id = 'RGAN01';\n")])])]),a("h3",{attrs:{id:"_2-4-外联结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-外联结"}},[s._v("#")]),s._v(" 2.4 外联结")]),s._v(" "),a("p",[s._v("内联结和外联结不同的是，外连接不包含没有关联的行")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("左外连接")])]),s._v(" "),a("li",[a("p",[s._v("右外连接")])]),s._v(" "),a("li",[a("p",[s._v("全外连接")]),s._v(" "),a("p",[s._v("全外连接包含两个不关联的行")])])]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("SELECT Customers.cust_id,Orders,order_num\nFROM Customers INNER JOIN Orders\nON Customers.cust_id = Orders.cust_id;\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);