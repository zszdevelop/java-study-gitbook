(window.webpackJsonp=window.webpackJsonp||[]).push([[442],{1034:function(a,t,e){"use strict";e.r(t);var s=e(42),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"创建计算字段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建计算字段"}},[a._v("#")]),a._v(" 创建计算字段")]),a._v(" "),e("h2",{attrs:{id:"_1-概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-概述"}},[a._v("#")]),a._v(" 1.概述")]),a._v(" "),e("p",[a._v("存储在数据库表中的数据一般不是应用程序所需要的格式，我们需要直接"),e("strong",[a._v("从数据库中检索出转换")]),a._v("、计算或者格式化数据，"),e("strong",[a._v("而不是检索出数据在客户端转换")])]),a._v(" "),e("p",[a._v("注：在数据库中完成格式化要比在客户端完成快得多")]),a._v(" "),e("h2",{attrs:{id:"_2-拼接字段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-拼接字段"}},[a._v("#")]),a._v(" 2. 拼接字段")]),a._v(" "),e("p",[a._v("拼接：将值联结在一起.")]),a._v(" "),e("p",[a._v("拼接在每种数据库中的关键字并不相同，有的使用+号有的使用双竖杆（||），在Mysql中需要使用特殊函数")]),a._v(" "),e("ul",[e("li",[a._v("注：左圆括号前面有个空格")])]),a._v(" "),e("h3",{attrs:{id:"_2-1-sql-server-使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-sql-server-使用"}},[a._v("#")]),a._v(" 2.1 SQL Server 使用+")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("SELECT vend_name +' ('+vend_country')'\nFROM Vendors\nORDER BY vend_name;\n")])])]),e("h3",{attrs:{id:"_2-2-在db2-oracle-中使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-在db2-oracle-中使用"}},[a._v("#")]),a._v(" 2.2 在DB2,ORACLE ,中使用||")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("SELECT vend_name +' ('+vend_country')'\nFROM Vendors\nORDER BY vend_name;\n")])])]),e("h3",{attrs:{id:"_2-3-在mysql或mariadb时需要使用的语句"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-在mysql或mariadb时需要使用的语句"}},[a._v("#")]),a._v(" 2.3 在mysql或MariaDB时需要使用的语句")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("SELECT Concat(vend_name,' (',vend_country,')')\nFROM Vendors\nORDER BY vend_name;\n")])])]),e("h2",{attrs:{id:"_3-trim-函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-trim-函数"}},[a._v("#")]),a._v(" 3. TRIM 函数")]),a._v(" "),e("ul",[e("li",[a._v("TRIM() ：去掉字符串左右两个的字符")]),a._v(" "),e("li",[a._v("RTRIM(): 去掉字符串右边空格")]),a._v(" "),e("li",[a._v("LTRIM() : 去掉字符串左边空格")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("SELECT RTRIM(vend_name)\nFROM Vendors\nORDER BY vend_name;\n")])])]),e("h2",{attrs:{id:"_4-as-使用别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-as-使用别名"}},[a._v("#")]),a._v(" 4. AS 使用别名")]),a._v(" "),e("p",[a._v("别名用AS关键字赋予")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("SELECT Concat(vend_name,' (',vend_country,')')  AS vend_title\nFROM Vendors\nORDER BY vend_name;\n")])])]),e("h2",{attrs:{id:"_5-执行算术计算"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-执行算术计算"}},[a._v("#")]),a._v(" 5. 执行算术计算")]),a._v(" "),e("p",[a._v("支持基本算术运算符，圆括号可以用来区分先后顺序")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("SELECT prod_id,\n\t\tquantity,\n\t\titem_price,\n\t\tquantity*item_price AS expanded_price\nFROM OrderItems\nWHERE order_num =20008;\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);