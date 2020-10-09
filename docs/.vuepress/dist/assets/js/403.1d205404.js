(window.webpackJsonp=window.webpackJsonp||[]).push([[403],{985:function(t,_,a){"use strict";a.r(_);var v=a(42),r=Object(v.a)({},(function(){var t=this,_=t.$createElement,a=t._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"where过滤数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#where过滤数据"}},[t._v("#")]),t._v(" WHERE过滤数据")]),t._v(" "),a("p",[t._v("数据库表一般包含大量的数据，很少需要检索所有表中的行。通常只会根据特定操作或者报告的需要提取表中的子集")]),t._v(" "),a("p",[t._v("在SELECT 语句中，数据根据WHERE 子句中指定的搜索条件进行过滤")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name,prod_price\nFROM products\nWHERE prod_price = 3.49;\n")])])]),a("p",[t._v("这条语句并不返回所有行，只返回prod_price 的值为3.49的行")]),t._v(" "),a("h2",{attrs:{id:"_2-sql-过滤与-应用过滤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-sql-过滤与-应用过滤"}},[t._v("#")]),t._v(" 2. SQL 过滤与 应用过滤")]),t._v(" "),a("p",[t._v("数据也可以在应用层过滤，为此SQL 的SELECT 语句为客户端应用检索出超过实际所需的数据，然后客户端代码对返回的数据进行循环，提取出所需要的行")]),t._v(" "),a("p",[t._v("这种方式极不妥")]),t._v(" "),a("ul",[a("li",[t._v("优化数据库后可以更快速有效的对数据进行过滤，极大提升响应性能")]),t._v(" "),a("li",[t._v("服务器发送多余数据，导致带宽浪费")])]),t._v(" "),a("h2",{attrs:{id:"_3-where-子句操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-where-子句操作符"}},[t._v("#")]),t._v(" 3. WHERE 子句操作符")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("操作符")]),t._v(" "),a("th",[t._v("说明")]),t._v(" "),a("th"),t._v(" "),a("th",[t._v("操作符")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("=")]),t._v(" "),a("td",[t._v("等于")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v(">")]),t._v(" "),a("td",[t._v("大于")])]),t._v(" "),a("tr",[a("td",[t._v("<>")]),t._v(" "),a("td",[t._v("不等于")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v(">=")]),t._v(" "),a("td",[t._v("大于等于")])]),t._v(" "),a("tr",[a("td",[t._v("!=")]),t._v(" "),a("td",[t._v("不等于")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("!>")]),t._v(" "),a("td",[t._v("不大于")])]),t._v(" "),a("tr",[a("td",[t._v("<")]),t._v(" "),a("td",[t._v("小于")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("BETWEEN")]),t._v(" "),a("td",[t._v("在指定的两个值之间")])]),t._v(" "),a("tr",[a("td",[t._v("<=")]),t._v(" "),a("td",[t._v("小于等于")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("IS NULL")]),t._v(" "),a("td",[t._v("为NULL 值")])]),t._v(" "),a("tr",[a("td",[t._v("!<")]),t._v(" "),a("td",[t._v("不小于")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td")])])]),t._v(" "),a("h2",{attrs:{id:"_4-例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-例子"}},[t._v("#")]),t._v(" 4. 例子")]),t._v(" "),a("h3",{attrs:{id:"_4-1-检查单个值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-检查单个值"}},[t._v("#")]),t._v(" 4.1 检查单个值")]),t._v(" "),a("p",[t._v("加个小于10美元的产品")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name,prod_price\nFROM products\nWHERE prod_price <10;\n")])])]),a("h3",{attrs:{id:"_4-2-不匹配检查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-不匹配检查"}},[t._v("#")]),t._v(" 4.2 不匹配检查")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT vend_id,prod_name \nFROM products\nWHERE vent_id != 'DLL01';\n")])])]),a("h3",{attrs:{id:"_4-3-范围值检查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-范围值检查"}},[t._v("#")]),t._v(" 4.3 范围值检查")]),t._v(" "),a("p",[t._v("检查某个范围的值可以使用"),a("code",[t._v("BETWEEN")]),t._v("操作符")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name,prod_price\nFROM products\nWHERE prod_price BETWEEN 5 AND 10;\n")])])]),a("h3",{attrs:{id:"_4-4-空值检查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-空值检查"}},[t._v("#")]),t._v(" 4.4 空值检查")]),t._v(" "),a("p",[t._v("用来检查具有NULL值的列")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT cust_name \nFROM Customers\nWHERE cust_email IS NULL;\n")])])]),a("h2",{attrs:{id:"_5-高级过滤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-高级过滤"}},[t._v("#")]),t._v(" 5.高级过滤")]),t._v(" "),a("h3",{attrs:{id:"_5-1-and操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-and操作符"}},[t._v("#")]),t._v(" 5.1 AND操作符")]),t._v(" "),a("p",[t._v("SELECT 语句包含两个过滤条件，用AND连接在一起")]),t._v(" "),a("p",[t._v("AND 操作符只给出满足所有条件的行")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('SELECT prod_id,prod_price\nFROM products\nWHERE vend_id="DELL01" AND prod_price <=4;\n')])])]),a("h3",{attrs:{id:"_5-2-or-操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-or-操作符"}},[t._v("#")]),t._v(" 5.2 OR 操作符")]),t._v(" "),a("p",[t._v("OR操作符 表示匹配任一条件的行")]),t._v(" "),a("p",[t._v("在满足第一个条件之后就不再执行第二个条件了")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name,prod_price\nFROM products\nWHERE vend_id ='DLL01' OR vend_id =\"BRS01\"\n")])])]),a("h3",{attrs:{id:"_5-3-求值顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-求值顺序"}},[t._v("#")]),t._v(" 5.3 求值顺序")]),t._v(" "),a("p",[t._v("WHERE 子句可以包含任意的AND和OR 操作符，但会出现一个问题")]),t._v(" "),a("p",[a("strong",[t._v("在处理OR操作符之前，会先处理AND 操作符")])]),t._v(" "),a("p",[t._v("为了解决此问题，需要使用圆括号对操作符进行明确分组")]),t._v(" "),a("p",[t._v("圆括号具有比AND或OR 更高的求值顺序")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name,prod_price\nFROM prodcts\nWHERE (vend_id='DLL01' OR vend_id='BRS01')\n\tAND prod_price >=10\n")])])]),a("h4",{attrs:{id:"_5-4-in-操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-4-in-操作符"}},[t._v("#")]),t._v(" 5.4 IN 操作符")]),t._v(" "),a("p",[t._v("IN 操作符用来指定条件范围，范围中的每个条件都可以进行匹配")]),t._v(" "),a("p",[t._v("IN 取一组由逗号分隔，括在圆括号中的合法值")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name ,prod_price\nFROM products\nWHERE vend_id IN ('DLL01','BRS01')\nORDER BY prod_name;\n")])])]),a("h4",{attrs:{id:"_5-4-1-为什么选in-操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-4-1-为什么选in-操作符"}},[t._v("#")]),t._v(" 5.4.1 为什么选IN 操作符")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("在有很多合法选项时，IN 操作符更清楚，更直观")])]),t._v(" "),a("li",[a("p",[t._v("在与其他AND和OR 操作符组合使用IN 时，求值顺序更容易管理")])]),t._v(" "),a("li",[a("p",[t._v("IN 操作符比一组OR 操作符"),a("strong",[t._v("执行得更快")])])]),t._v(" "),a("li",[a("p",[t._v("IN 最大的优点可以"),a("strong",[t._v("包含其他SELECT 语句")]),t._v("，能够动态简历WHERE 子句")])])]),t._v(" "),a("h3",{attrs:{id:"_5-5-not操作符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-5-not操作符"}},[t._v("#")]),t._v(" 5.5 NOT操作符")]),t._v(" "),a("p",[t._v("NOT 操作可以否定其后所跟的任何条件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT prod_name\nFROM products\nWHERE NOT vend_id='DLL01'\nORDER BY prod_name;\n")])])])])}),[],!1,null,null,null);_.default=r.exports}}]);