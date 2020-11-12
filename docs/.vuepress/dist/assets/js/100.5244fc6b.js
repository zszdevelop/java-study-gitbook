(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{1202:function(t,a,s){"use strict";s.r(a);var _=s(42),v=Object(_.a)({},(function(){var t=this,a=t.$createElement,_=t._self._c||a;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"存储引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#存储引擎"}},[t._v("#")]),t._v(" 存储引擎")]),t._v(" "),_("h2",{attrs:{id:"_1-myisam-和innodb-区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-myisam-和innodb-区别"}},[t._v("#")]),t._v(" 1. MyISAM 和InnoDB 区别")]),t._v(" "),_("ul",[_("li",[t._v("MyISAM （MySQL 5.5 之前的默认数据库引擎）\n"),_("ul",[_("li",[t._v("性能极佳，并且提供了大量特性，包括全文索引、压缩、空间函数等")]),t._v(" "),_("li",[_("strong",[t._v("不支持事务和行级锁")])]),t._v(" "),_("li",[t._v("最大缺陷"),_("strong",[t._v("崩溃后无法安全恢复")])])])]),t._v(" "),_("li",[t._v("InnoDB(MySQL 5.5 之后的默认存储引擎)：\n"),_("ul",[_("li",[t._v("事务性数据库引擎")])])])]),t._v(" "),_("h3",{attrs:{id:"_1-1-适合场景"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-适合场景"}},[t._v("#")]),t._v(" 1.1 适合场景")]),t._v(" "),_("ul",[_("li",[_("p",[t._v("InnoDB存储引擎")]),t._v(" "),_("p",[t._v("大多数场景，但是某些情况下使用 也是适合的如")])]),t._v(" "),_("li",[_("p",[t._v("MyISAM 存储引擎")]),t._v(" "),_("p",[t._v("读密集的情况下（不介意MyISAM 崩溃恢复问题）")])])]),t._v(" "),_("h3",{attrs:{id:"_1-2-两者对比"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-两者对比"}},[t._v("#")]),t._v(" 1.2 两者对比")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th"),t._v(" "),_("th",[t._v("MyISAM")]),t._v(" "),_("th",[t._v("InnoDB")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("是否支持行级锁")]),t._v(" "),_("td",[t._v("只有表级锁（table-level locking）")]),t._v(" "),_("td",[t._v("支持行级锁（row-level locking）和表级锁，默认行级锁")])]),t._v(" "),_("tr",[_("td",[t._v("是否支持事务")]),t._v(" "),_("td",[t._v("不支持")]),t._v(" "),_("td",[t._v("支持")])]),t._v(" "),_("tr",[_("td",[t._v("崩溃后的安全恢复")]),t._v(" "),_("td",[t._v("不支持")]),t._v(" "),_("td",[t._v("支持")])]),t._v(" "),_("tr",[_("td",[t._v("支持外键")]),t._v(" "),_("td",[t._v("不支持")]),t._v(" "),_("td",[t._v("支持")])]),t._v(" "),_("tr",[_("td",[t._v("支持MVCC")]),t._v(" "),_("td",[t._v("不支持")]),t._v(" "),_("td",[t._v("支持")])])])]),t._v(" "),_("h3",{attrs:{id:"_1-3-mvcc"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-mvcc"}},[t._v("#")]),t._v(" 1.3 MVCC")]),t._v(" "),_("ul",[_("li",[_("p",[t._v("在应对高并发事务，MVCC 比单纯的加锁更高效，")])]),t._v(" "),_("li",[_("p",[t._v("MVCC 只在READ COMMITED 和 REPEATABLE READ 两个隔离级别下工作。")])]),t._v(" "),_("li",[_("p",[t._v("MVCC 可以使用乐观（optimistic）锁和 悲观（pessimistic）锁来实现")])])]),t._v(" "),_("h2",{attrs:{id:"_2-查看存储引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-查看存储引擎"}},[t._v("#")]),t._v(" 2. 查看存储引擎")]),t._v(" "),_("h3",{attrs:{id:"_2-1-查看mysql提供的所有存储引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-查看mysql提供的所有存储引擎"}},[t._v("#")]),t._v(" 2.1 查看MySQL提供的所有存储引擎")]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("mysql> show engines;\n")])])]),_("p",[_("img",{attrs:{src:s(561),alt:"image-20190902000239425"}})]),t._v(" "),_("p",[t._v("从上图我们可以出Mysql 当前的默认存储引擎是InnoDB,也提示了innoDB 支持事务，行级锁等特性")]),t._v(" "),_("h3",{attrs:{id:"_2-2-查看mysql-当前默认的存储引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-查看mysql-当前默认的存储引擎"}},[t._v("#")]),t._v(" 2.2 查看MySQL 当前默认的存储引擎")]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v("show variables like '%storage_engine%';\n")])])]),_("p",[_("img",{attrs:{src:s(562),alt:"image-20190902000442313"}})]),t._v(" "),_("h3",{attrs:{id:"_2-3-查看表的存储引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-查看表的存储引擎"}},[t._v("#")]),t._v(" 2.3 查看表的存储引擎")]),t._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",{pre:!0,attrs:{class:"language-text"}},[_("code",[t._v('show table status like "t_user";\n')])])])])}),[],!1,null,null,null);a.default=v.exports},561:function(t,a,s){t.exports=s.p+"assets/img/image-20190902000239425.d3289b5b.png"},562:function(t,a,s){t.exports=s.p+"assets/img/image-20190902000442313.2ecc8009.png"}}]);