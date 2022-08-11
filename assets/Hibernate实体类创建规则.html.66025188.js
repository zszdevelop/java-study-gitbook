import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.e1ff6185.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="hibernate\u5B9E\u4F53\u7C7B\u521B\u5EFA\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#hibernate\u5B9E\u4F53\u7C7B\u521B\u5EFA\u89C4\u5219" aria-hidden="true">#</a> Hibernate\u5B9E\u4F53\u7C7B\u521B\u5EFA\u89C4\u5219</h1><h2 id="_1-\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#_1-\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> 1. \u6CE8\u610F\u4E8B\u9879</h2><ol><li>\u4E3A\u6301\u4E45\u5316\u7C7B(\u5B9E\u4F53\u7C7B)\u63D0\u4F9B\u65E0\u53C2\u6784\u9020</li><li>\u6210\u5458\u53D8\u91CF\u79C1\u6709\uFF0C\u63D0\u4F9Bget/set\u65B9\u6CD5\u8BBF\u95EE\uFF0C\u9700\u63D0\u4F9B\u5C5E\u6027</li><li>\u6301\u4E45\u5316\u7C7B\u4E2D\u7684\u5C5E\u6027\u5E94\u5C3D\u91CF\u7528\u5305\u88C5\u7C7B\u578B, \u5982Long \u3001String \u56E0\u4E3A\u57FA\u672C\u7C7B\u578B\u4E0D\u4E00\u5B9A\u80FD\u7528null</li><li>\u6301\u4E45\u5316\u7C7B\u9700\u63D0\u4F9B\u552F\u4E00\u6807\u5FD7oid\uFF0C\u4E0E\u6570\u636E\u5E93\u4E2D\u7684\u4E3B\u952E\u5217\u76F8\u5BF9\u5E94</li><li>\u5C3D\u91CF\u4E0D\u8981\u7528final\u4FEE\u9970class\u3002 //\u56E0\u4E3Ahibernate\u4F7F\u7528cglib\u4EE3\u7406\u751F\u6210\u4EE3\u7406\u5BF9\u8C61\uFF0C\u4EE3\u7406\u5BF9\u8C61\u662F\u5373\u6210\u88AB\u4EE3\u7406\u5BF9\u8C61\u7684\uFF0Cfinal\u4F1A\u5BFC\u81F4\u65E0\u6CD5\u4EE3\u7406</li></ol><h2 id="_2-\u4E3B\u952E" tabindex="-1"><a class="header-anchor" href="#_2-\u4E3B\u952E" aria-hidden="true">#</a> 2. \u4E3B\u952E</h2><h3 id="_2-1-\u4E3B\u952E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#_2-1-\u4E3B\u952E\u7C7B\u578B" aria-hidden="true">#</a> 2.1 \u4E3B\u952E\u7C7B\u578B</h3><p>\u81EA\u7136\u4E3B\u952E(\u5C11\u89C1)\u548C\u4EE3\u7406\u4E3B\u952E(\u5E38\u89C1)</p><pre><code>1. \u81EA\u7136\u4E3B\u952E\uFF1A\u8868\u7684\u4E1A\u52A1\u5217\u4E2D\uFF0C\u67D0\u5217\u5FC5\u987B\u6709\u4E14\u4E0D\u91CD\u590D\u65F6\uFF0C\u8BE5\u5217\u53EF\u5F53\u4F5C\u4E3B\u952E\u4F7F\u7528\n</code></pre><ol start="2"><li>\u4EE3\u7406\u4E3B\u952E\uFF1A\u8868\u7684\u4E1A\u52A1\u5217\u4E2D\uFF0C\u6CA1\u6709\u67D0\u5217\u5FC5\u987B\u6709\u4E14\u4E0D\u91CD\u590D\u65F6\uFF0C\u5219\u9700\u521B\u5EFA\u4E00\u4E2A\u6CA1\u6709\u4E1A\u52A1\u610F\u4E49\u7684\u5217\u4F5C\u4E3A\u4E3B\u952E</li></ol><h3 id="_2-2-\u4E3B\u952E\u751F\u6210\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#_2-2-\u4E3B\u952E\u751F\u6210\u7B56\u7565" aria-hidden="true">#</a> 2.2 \u4E3B\u952E\u751F\u6210\u7B56\u7565</h3><p>\u5373\u6BCF\u6761\u8BB0\u5F55\u5F55\u5165\u65F6\uFF0C\u4E3B\u952E\u7684\u751F\u6210\u89C4\u5219\uFF08\u4F4D\u4E8Eorm\u5143\u6570\u636E\u914D\u7F6E\u7684id\u6807\u7B7E\u91CC\u7684generator\u6807\u7B7E\uFF09</p><ol><li>identity\uFF1A\u4E3B\u952E\u81EA\u589E\uFF1A\u6709\u6570\u636E\u5E93\u6765\u7EF4\u62A4\u4E3B\u952E\u503C\uFF0C\u5F55\u5165\u65F6\u4E0D\u9700\u6307\u5B9A\u4E3B</li><li>sequence\uFF1AOracle\u7684\u4E3B\u952E\u751F\u6210\u7B56\u7565</li><li>increment\uFF1A\u4E3B\u952E\u81EA\u589E\uFF1A\u7531hibernate\u6765\u7EF4\u62A4\uFF0C\u6BCF\u6B21\u63D2\u5165\u65F6\u5148\u67E5\u8BE2\u8868\u4E2Did\u6700\u5927\u503C\uFF0C+1\u4F5C\u4E3A\u4E3B\u952E(\u7EBF\u7A0B\u4E0D\u5B89\u5168\uFF0C\u4E0D\u7528) //\u6B64\u65F6\u6267\u884Csave\u65B9\u6CD5\uFF0C\u4E3A\u4E86\u751F\u6210id\uFF0C\u4F1A\u6267\u884C\u67E5\u8BE2id\u6700\u5927\u503C\u7684sql\u8BED\u53E5</li><li>hilo(\u4E86\u89E3)\uFF1A\u4E3B\u952E\u81EA\u589E\uFF0C\u9AD8\u4F4E\u4F4D\u7B97\u6CD5\uFF0C\u6709hibernate\u6765\u7EF4\u62A4\uFF08\u4E0D\u4F7F\u7528\uFF09</li><li><strong>native</strong>\uFF1Ahilo+sequence+identity\uFF0C\u81EA\u52A8\u4E09\u9009\u4E00\u7B56\u7565</li><li><strong>uuid</strong>\uFF1A\u4EA7\u751F\u968F\u673A\u5B57\u7B26\u4E32\u4F5C\u4E3A\u4E3B\u952E\u3002\u4E3B\u952E\u7C7B\u578B\u5FC5\u987B\u4E3AString</li><li>assigned\uFF1A\u81EA\u7136\u4E3B\u952E\u751F\u6210\u7B56\u7565\uFF0Chibernate\u4E0D\u7BA1\u7406\u4E3B\u952E\u503C\uFF0C\u7531\u5F00\u53D1\u4EBA\u5458\u81EA\u5DF1\u63A7\u5236\u5F55\u5165</li></ol><h2 id="_3-\u5B9E\u4F53\u7C7B\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#_3-\u5B9E\u4F53\u7C7B\u6CE8\u89E3" aria-hidden="true">#</a> 3. \u5B9E\u4F53\u7C7B\u6CE8\u89E3</h2><h3 id="_3-1-id" tabindex="-1"><a class="header-anchor" href="#_3-1-id" aria-hidden="true">#</a> 3.1 @Id</h3>', 13);
const _hoisted_14 = /* @__PURE__ */ createTextVNode("@Id \u6807\u6CE8\u7528\u4E8E\u58F0\u660E\u4E00\u4E2A\u5B9E\u4F53\u7C7B\u7684\u5C5E\u6027\u6620\u5C04\u4E3A");
const _hoisted_15 = {
  href: "http://lib.csdn.net/base/mysql",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_16 = /* @__PURE__ */ createTextVNode("\u6570\u636E\u5E93");
const _hoisted_17 = /* @__PURE__ */ createTextVNode("\u7684\u4E3B\u952E\u5217\u3002\u8BE5\u5C5E\u6027\u901A\u5E38\u7F6E\u4E8E\u5C5E\u6027\u58F0\u660E\u8BED\u53E5\u4E4B\u524D\uFF0C\u53EF\u4E0E\u58F0\u660E\u8BED\u53E5\u540C\u884C\uFF0C\u4E5F\u53EF\u5199\u5728\u5355\u72EC\u884C\u4E0A\u3002 @Id\u6807\u6CE8\u4E5F\u53EF\u7F6E\u4E8E\u5C5E\u6027\u7684getter\u65B9\u6CD5\u4E4B\u524D\u3002");
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("h3", {
  id: "_3-2-generatedvalue",
  tabindex: "-1"
}, [
  /* @__PURE__ */ createBaseVNode("a", {
    class: "header-anchor",
    href: "#_3-2-generatedvalue",
    "aria-hidden": "true"
  }, "#"),
  /* @__PURE__ */ createTextVNode(" 3.2 @GeneratedValue")
], -1);
const _hoisted_19 = /* @__PURE__ */ createTextVNode("@GeneratedValue \u7528\u4E8E\u6807\u6CE8\u4E3B\u952E\u7684\u751F\u6210\u7B56\u7565\uFF0C\u901A\u8FC7strategy \u5C5E\u6027\u6307\u5B9A\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0CJPA \u81EA\u52A8\u9009\u62E9\u4E00\u4E2A\u6700\u9002\u5408\u5E95\u5C42\u6570\u636E\u5E93\u7684\u4E3B\u952E\u751F\u6210\u7B56\u7565\uFF1ASqlServer\u5BF9\u5E94identity\uFF0C");
const _hoisted_20 = {
  href: "http://lib.csdn.net/base/mysql",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_21 = /* @__PURE__ */ createTextVNode("MySQL");
const _hoisted_22 = /* @__PURE__ */ createTextVNode(" \u5BF9\u5E94 auto increment\u3002 \u5728javax.persistence.GenerationType\u4E2D\u5B9A\u4E49\u4E86\u4EE5\u4E0B\u51E0\u79CD\u53EF\u4F9B\u9009\u62E9\u7684\u7B56\u7565\uFF1A");
const _hoisted_23 = /* @__PURE__ */ createTextVNode("IDENTITY\uFF1A\u91C7\u7528\u6570\u636E\u5E93ID\u81EA\u589E\u957F\u7684\u65B9\u5F0F\u6765\u81EA\u589E\u4E3B\u952E\u5B57\u6BB5\uFF0C");
const _hoisted_24 = {
  href: "http://lib.csdn.net/base/oracle",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_25 = /* @__PURE__ */ createTextVNode("Oracle");
const _hoisted_26 = /* @__PURE__ */ createTextVNode(" \u4E0D\u652F\u6301\u8FD9\u79CD\u65B9\u5F0F\uFF1B");
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("li", null, "AUTO\uFF1A JPA\u81EA\u52A8\u9009\u62E9\u5408\u9002\u7684\u7B56\u7565\uFF0C\u662F\u9ED8\u8BA4\u9009\u9879\uFF1B", -1);
const _hoisted_28 = /* @__PURE__ */ createBaseVNode("li", null, "SEQUENCE\uFF1A\u901A\u8FC7\u5E8F\u5217\u4EA7\u751F\u4E3B\u952E\uFF0C\u901A\u8FC7@SequenceGenerator \u6CE8\u89E3\u6307\u5B9A\u5E8F\u5217\u540D\uFF0CMySql\u4E0D\u652F\u6301\u8FD9\u79CD\u65B9\u5F0F", -1);
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("li", null, "TABLE\uFF1A\u901A\u8FC7\u8868\u4EA7\u751F\u4E3B\u952E\uFF0C\u6846\u67B6\u501F\u7531\u8868\u6A21\u62DF\u5E8F\u5217\u4EA7\u751F\u4E3B\u952E\uFF0C\u4F7F\u7528\u8BE5\u7B56\u7565\u53EF\u4EE5\u4F7F\u5E94\u7528\u66F4\u6613\u4E8E\u6570\u636E\u5E93\u79FB\u690D\u3002", -1);
const _hoisted_30 = /* @__PURE__ */ createStaticVNode('<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\n@Table(name=&quot;CUSTOMERS&quot;)\n@Entity\npublic class Customer {\n    @GeneratedValue(strategy=GenerationType.AUTO)\n    @Id\n    private Integer id;\n    private String name;\n    private String email;\n    private int age;\n \n    public Integer getId() {\n        return id;\n    }\n    public void setId(Integer id) {\n        this.id = id;\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-column" tabindex="-1"><a class="header-anchor" href="#_3-3-column" aria-hidden="true">#</a> 3.3 @Column</h3>', 2);
const _hoisted_32 = /* @__PURE__ */ createTextVNode("\u5F53\u5B9E\u4F53\u7684\u5C5E\u6027\u4E0E\u5176\u6620\u5C04\u7684");
const _hoisted_33 = {
  href: "http://lib.csdn.net/base/mysql",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_34 = /* @__PURE__ */ createTextVNode("\u6570\u636E\u5E93");
const _hoisted_35 = /* @__PURE__ */ createTextVNode("\u8868\u7684\u5217\u4E0D\u540C\u540D\u65F6\u9700\u8981\u4F7F\u7528@Column \u6807\u6CE8\u8BF4\u660E\uFF0C\u8BE5\u5C5E\u6027\u901A\u5E38\u7F6E\u4E8E\u5B9E\u4F53\u7684\u5C5E\u6027\u58F0\u660E\u8BED\u53E5\u4E4B\u524D\uFF0C\u8FD8\u53EF\u4E0E @Id \u6807\u6CE8\u4E00\u8D77\u4F7F\u7528\u3002");
const _hoisted_36 = /* @__PURE__ */ createStaticVNode('<blockquote><ul><li>@Column \u6807\u6CE8\u7684\u5E38\u7528\u5C5E\u6027\u662Fname\uFF0C\u7528\u4E8E\u8BBE\u7F6E\u6620\u5C04\u6570\u636E\u5E93\u8868\u7684\u5217\u540D\u3002\u6B64\u5916\uFF0C\u8BE5\u6807\u6CE8\u8FD8\u5305\u542B\u5176\u5B83\u591A\u4E2A\u5C5E\u6027\uFF0C\u5982\uFF1Aunique\u3001nullable\u3001length \u7B49\u3002</li><li>@Column \u6807\u6CE8\u7684columnDefinition\u5C5E\u6027: \u8868\u793A\u8BE5\u5B57\u6BB5\u5728\u6570\u636E\u5E93\u4E2D\u7684\u5B9E\u9645\u7C7B\u578B.\u901A\u5E38 ORM \u6846\u67B6\u53EF\u4EE5\u6839\u636E\u5C5E\u6027\u7C7B\u578B\u81EA\u52A8\u5224\u65AD\u6570\u636E\u5E93\u4E2D\u5B57\u6BB5\u7684\u7C7B\u578B,\u4F46\u662F\u5BF9\u4E8EDate\u7C7B\u578B\u4ECD\u65E0\u6CD5\u786E\u5B9A\u6570\u636E\u5E93\u4E2D\u5B57\u6BB5\u7C7B\u578B\u7A76\u7ADF\u662FDATE,TIME\u8FD8\u662FTIMESTAMP.\u6B64\u5916,String\u7684\u9ED8\u8BA4\u6620\u5C04\u7C7B\u578B\u4E3AVARCHAR,\u5982\u679C\u8981\u5C06 String \u7C7B\u578B\u6620\u5C04\u5230\u7279\u5B9A\u6570\u636E\u5E93\u7684 BLOB \u6216TEXT\u5B57\u6BB5\u7C7B\u578B.</li></ul></blockquote><ul><li><p>name\u5C5E\u6027\uFF1A name\u5C5E\u6027\u5B9A\u4E49\u4E86\u88AB\u6807\u6CE8\u5B57\u6BB5\u5728\u6570\u636E\u5E93\u8868\u4E2D\u6240\u5BF9\u5E94\u5B57\u6BB5\u7684\u540D\u79F0</p></li><li><p>unique\u5C5E\u6027\uFF1A unique\u5C5E\u6027\u8868\u793A\u8BE5\u5B57\u6BB5\u662F\u5426\u4E3A\u552F\u4E00\u6807\u8BC6\uFF0C\u9ED8\u8BA4\u4E3Afalse\u3002 \u5982\u679C\u8868\u4E2D\u6709\u4E00\u4E2A\u5B57\u6BB5\u9700\u8981\u552F\u4E00\u6807\u8BC6\uFF0C\u5219\u65E2\u53EF\u4EE5\u4F7F\u7528\u8BE5\u6807\u8BB0\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528@Table\u6CE8\u89E3\u4E2D\u7684@UniqueConstraint</p></li><li><p>nullable\u5C5E\u6027\uFF1A nullable\u5C5E\u6027\u8868\u793A\u8BE5\u5B57\u6BB5\u662F\u5426\u53EF\u4EE5\u4E3Anull\u503C\uFF0C\u9ED8\u8BA4\u4E3Atrue</p></li><li><p>insertable\u5C5E\u6027\uFF1A insertable\u5C5E\u6027\u8868\u793A\u5728\u4F7F\u7528\u201DINSERT\u201D\u8BED\u53E5\u63D2\u5165\u6570\u636E\u65F6\uFF0C\u662F\u5426\u9700\u8981\u63D2\u5165\u8BE5\u5B57\u6BB5\u7684\u503C</p></li><li><p>updateable\u5C5E\u6027\uFF1A updateable\u5C5E\u6027\u8868\u793A\u5728\u4F7F\u7528\u201DUPDATE\u201D\u8BED\u53E5\u63D2\u5165\u6570\u636E\u65F6\uFF0C\u662F\u5426\u9700\u8981\u66F4\u65B0\u8BE5\u5B57\u6BB5\u7684\u503C</p><p>insertable\u548Cupdateable\u5C5E\u6027\u4E00\u822C\u591A\u7528\u4E8E\u53EA\u8BFB\u7684\u5C5E\u6027\uFF0C\u4F8B\u5982\u4E3B\u952E\u548C\u5916\u952E\u7B49\uFF0C\u8FD9\u4E9B\u5B57\u6BB5\u901A\u5E38\u662F\u81EA\u52A8\u751F\u6210\u7684\\</p></li><li><p>columnDefinition\u5C5E\u6027\uFF1A columnDefinition\u5C5E\u6027\u8868\u793A\u521B\u5EFA\u8868\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u521B\u5EFA\u7684SQL\u8BED\u53E5\uFF0C\u4E00\u822C\u7528\u4E8E\u901A\u8FC7Entity\u751F\u6210\u8868\u5B9A\u4E49\u65F6\u4F7F\u7528 \u5982\u679C\u6570\u636E\u5E93\u4E2D\u8868\u5DF2\u7ECF\u5EFA\u597D\uFF0C\u8BE5\u5C5E\u6027\u6CA1\u6709\u5FC5\u8981\u4F7F\u7528</p></li><li><p>table\u5C5E\u6027\uFF1A table\u5C5E\u6027\u5B9A\u4E49\u4E86\u5305\u542B\u5F53\u524D\u5B57\u6BB5\u7684\u8868\u540D</p></li><li><p>length\u5C5E\u6027\uFF1A length\u5C5E\u6027\u8868\u793A\u5B57\u6BB5\u7684\u957F\u5EA6\uFF0C\u5F53\u5B57\u6BB5\u7684\u7C7B\u578B\u4E3Avarchar\u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\uFF0C\u9ED8\u8BA4\u4E3A255\u4E2A\u5B57\u7B26</p></li><li><p>precision\u5C5E\u6027\u548Cscale\u5C5E\u6027\uFF1A precision\u5C5E\u6027\u548Cscale\u5C5E\u6027\u4E00\u8D77\u8868\u793A\u7CBE\u5EA6\uFF0C\u5F53\u5B57\u6BB5\u7C7B\u578B\u4E3Adouble\u65F6\uFF0Cprecision\u8868\u793A\u6570\u503C\u7684\u603B\u957F\u5EA6\uFF0Cscale\u8868\u793A\u5C0F\u6570\u70B9\u6240\u5360\u7684\u4F4D\u6570</p></li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;CUSTOMERS&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;ID&quot;</span><span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span>\n    <span class="token annotation punctuation">@Id</span>\n    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Name&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Email&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> length <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Age&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Remark&quot;</span><span class="token punctuation">,</span> columnDefinition <span class="token operator">=</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> remark<span class="token punctuation">;</span>\n \n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Salary1&quot;</span><span class="token punctuation">,</span> columnDefinition <span class="token operator">=</span> <span class="token string">&quot;decimal(5,2)&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token keyword">double</span> salary1<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Salary2&quot;</span><span class="token punctuation">,</span> precision <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> scale <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token keyword">double</span> salary2<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Salary3&quot;</span><span class="token punctuation">,</span> columnDefinition <span class="token operator">=</span> <span class="token string">&quot;decimal(5,2)&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> salary3<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Salary4&quot;</span><span class="token punctuation">,</span> precision <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> scale <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> salary4<span class="token punctuation">;</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 4);
const _hoisted_40 = {
  href: "https://sourceforge.net/projects/hibernate/files/hibernate-orm/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_41 = /* @__PURE__ */ createTextVNode("Hibernate");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      _hoisted_14,
      createBaseVNode("a", _hoisted_15, [
        _hoisted_16,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_17
    ]),
    _hoisted_18,
    createBaseVNode("p", null, [
      _hoisted_19,
      createBaseVNode("a", _hoisted_20, [
        _hoisted_21,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_22
    ]),
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        _hoisted_23,
        createBaseVNode("a", _hoisted_24, [
          _hoisted_25,
          createVNode(_component_ExternalLinkIcon)
        ]),
        _hoisted_26
      ]),
      _hoisted_27,
      _hoisted_28,
      _hoisted_29
    ]),
    _hoisted_30,
    createBaseVNode("p", null, [
      _hoisted_32,
      createBaseVNode("a", _hoisted_33, [
        _hoisted_34,
        createVNode(_component_ExternalLinkIcon)
      ]),
      _hoisted_35
    ]),
    _hoisted_36,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_40, [
        _hoisted_41,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var Hibernate________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Hibernate\u5B9E\u4F53\u7C7B\u521B\u5EFA\u89C4\u5219.html.vue"]]);
export { Hibernate________html as default };
