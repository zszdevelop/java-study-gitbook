(window.webpackJsonp=window.webpackJsonp||[]).push([[412],{1103:function(t,a,_){"use strict";_.r(a);var r=_(42),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,_=t._self._c||a;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"创建表"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#创建表"}},[t._v("#")]),t._v(" 创建表")]),t._v(" "),_("h2",{attrs:{id:"_1-创建基础表"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-创建基础表"}},[t._v("#")]),t._v(" 1.创建基础表")]),t._v(" "),_("p",[t._v("创建表的语法")]),t._v(" "),_("ul",[_("li",[t._v("新表的名字，在关键字CREATE TABLE 之后给出")]),t._v(" "),_("li",[t._v("表列的名字和定义用逗号分隔")])]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("CREATE TABLE Products(\n\tprod_id CHAR(10) NOT NULL,\n\tvend_id CHAR(10) NOT NULL,\n\tprod_name CHAR(254) NOT NULL,\n\tprod_price DECIMAL(8,2) NOT NULL,\n\tprod_desc VARCHAR(1000) NULL\n);\n")])])]),_("p",[t._v("不同数据库对应的语法略微不同")]),t._v(" "),_("h2",{attrs:{id:"_2-使用null-值"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-使用null-值"}},[t._v("#")]),t._v(" 2. 使用NULL 值")]),t._v(" "),_("p",[t._v("NULL 值就是没有值或缺值，")]),t._v(" "),_("p",[t._v("允许NULL值的列也允许在插入行时不给出该列的值，")]),t._v(" "),_("p",[t._v("不允许NULL值的列不接受没有列值的行（该列必须有值）")]),t._v(" "),_("h3",{attrs:{id:"_2-1-null-和空字符"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-null-和空字符"}},[t._v("#")]),t._v(" 2.1 NULL 和空字符")]),t._v(" "),_("p",[t._v("NULL 是没有值，不是空字符串，如果指定''，这在NOT NULL列中是允许的，空字符串是一个有效的值")]),t._v(" "),_("h2",{attrs:{id:"_3-指定默认值"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-指定默认值"}},[t._v("#")]),t._v(" 3.指定默认值")]),t._v(" "),_("p",[t._v("在插入行时如果不给出值，DBMS 将自动采用默认值，默认值使用DEFAULT 指定")]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("CREATE TABLE OrderItems(\norder_num INTEGER NOT NULL,\nquantity INTEGER NOT NULL DEFAULT 1\n);\n")])])]),_("h3",{attrs:{id:"_3-1-当前时间"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-当前时间"}},[t._v("#")]),t._v(" 3.1 当前时间")]),t._v(" "),_("p",[t._v("默认值还经常用于日期或者时间，但是哥哥DBMS 是不同的")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("DBMS")]),t._v(" "),_("th",[t._v("函数/变量")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("MySQL")]),t._v(" "),_("td",[t._v("CURRENT_DATE()")])]),t._v(" "),_("tr",[_("td",[t._v("ORACLE")]),t._v(" "),_("td",[t._v("SYSDATE")])])])])])}),[],!1,null,null,null);a.default=s.exports}}]);