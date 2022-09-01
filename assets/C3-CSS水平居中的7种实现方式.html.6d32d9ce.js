import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as d,c as l,a as e,b as s,e as a,d as t,r}from"./app.61455a3d.js";const c={},v=a(`<h1 id="css\u6C34\u5E73\u5C45\u4E2D\u76847\u79CD\u5B9E\u73B0\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#css\u6C34\u5E73\u5C45\u4E2D\u76847\u79CD\u5B9E\u73B0\u65B9\u5F0F" aria-hidden="true">#</a> CSS\u6C34\u5E73\u5C45\u4E2D\u76847\u79CD\u5B9E\u73B0\u65B9\u5F0F</h1><h2 id="_1-\u5B9E\u73B0\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u5B9E\u73B0\u65B9\u5F0F" aria-hidden="true">#</a> 1. \u5B9E\u73B0\u65B9\u5F0F</h2><h3 id="_1-1-\u65B9\u5F0F\u4E00-text-align-center\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-1-\u65B9\u5F0F\u4E00-text-align-center\u5B9E\u73B0" aria-hidden="true">#</a> 1.1 \u65B9\u5F0F\u4E00\uFF1A<code>text-align: center</code>\u5B9E\u73B0</h3><p>\u5982\u679C\u7236\u5143\u7D20\u662F\u5757\u7EA7\u5143\u7D20\u4E14\u91CC\u9762\u5305\u542B\u884C\u5185\u5143\u7D20\uFF0C\u5219\u76F4\u63A5\u7ED9\u7236\u5143\u7D20\u8BBE\u7F6E <code>text-align: center</code>, \u5982\u679C\u7236\u5143\u7D20\u662F\u884C\u5185\u5143\u7D20\u7684\u8BDD\u7236\u5143\u7D20\u65E0\u6CD5\u8BBE\u7F6E\u5BBD\u9AD8\uFF0C\u5219\u9700\u8981\u5C06\u5176\u8BBE\u4E3A\u5757\u7EA7\u5143\u7D20<code>display: block</code>\u3002\u4E5F\u5BF9inline\u3001inline-block\u3001inline-table\u548Cinline-flex\u5143\u7D20\u6C34\u5E73\u5C45\u4E2D\u90FD\u6709\u6548\u3002</p><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u7236\u5143\u7D20\u662F\u5757\u7EA7\u5143\u7D20
&lt;div id=&quot;parent&quot;&gt;
    &lt;span id=&quot;child&quot;&gt;\u6211\u662F\u884C\u5185\u5143\u7D20&lt;/span&gt;
&lt;/div&gt;

// \u7236\u5143\u7D20\u662F\u884C\u5185\u5143\u7D20
&lt;span id=&quot;parent&quot;&gt;
    &lt;span id=&quot;child&quot;&gt;\u6211\u662F\u884C\u5185\u5143\u7D20&lt;/span&gt;
&lt;/span&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u7236\u5143\u7D20\u662F\u5757\u7EA7\u5143\u7D20
.parent {
  height: 300px;
  width: 300px;
  text-align: center;
  background: skyblue;
}

// \u7236\u5143\u7D20\u662F\u884C\u5185\u5143\u7D20
.parent {
  height: 300px;
  width: 300px;
  display: block;
  text-align: center;
  background: skyblue;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/1460000021249926.png" alt="img"></p><h3 id="_1-2-\u65B9\u5F0F\u4E8C-margin-0-aoto\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-2-\u65B9\u5F0F\u4E8C-margin-0-aoto\u5B9E\u73B0" aria-hidden="true">#</a> 1.2 \u65B9\u5F0F\u4E8C\uFF1A<code>margin: 0 aoto</code>\u5B9E\u73B0</h3><p>\u5728\u5BBD\u5EA6\u5DF2\u77E5\u7684\u60C5\u51B5\u4E0B\u53EF\u4EE5\u4F7F\u7528<code>margin\uFF1A0 auto</code>\uFF0C\u8BA9\u5143\u7D20\u6C34\u5E73\u5C45\u4E2D\u3002</p><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div id=&quot;parent&quot;&gt;
    &lt;div id=&quot;child&quot;&gt;\u6211\u662F\u884C\u5185\u5143\u7D20&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  background:  #fcc;
}
.child {
  height: 100px;
  width: 100px; //\u786E\u4FDD\u8BE5\u5757\u7EA7\u5143\u7D20\u5B9A\u5BBD
  background: #f66;
  margin: 0 auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201555384.png" alt="image-20210709201555384"></p><h3 id="_1-3-\u65B9\u5F0F\u4E09-table-margin\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-3-\u65B9\u5F0F\u4E09-table-margin\u5B9E\u73B0" aria-hidden="true">#</a> 1.3 \u65B9\u5F0F\u4E09\uFF1Atable+margin\u5B9E\u73B0</h3><p>\u5148\u5C06\u5B50\u5143\u7D20\u8BBE\u7F6E\u4E3A\u5757\u7EA7\u8868\u683C\u6765\u663E\u793A\uFF08\u7C7B\u4F3C\uFF09\uFF0C\u518D\u5C06\u5176\u8BBE\u7F6E\u6C34\u5E73\u5C45\u4E2D<code>display:table</code>\u5728\u8868\u73B0\u4E0A\u7C7B\u4F3C<code>block</code>\u5143\u7D20\uFF0C\u4F46\u662F\u5BBD\u5EA6\u4E3A\u5185\u5BB9\u5BBD\u3002</p><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;\u6211\u662F\u5757\u7EA7\u5143\u7D20&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  background:  #fcc;
}
.child {
  display: table;
  background: #f66;
  margin: 0 auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201645304.png" alt="image-20210709201645304"></p><h3 id="_1-4-\u65B9\u5F0F\u56DB-absolute-transform\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-4-\u65B9\u5F0F\u56DB-absolute-transform\u5B9E\u73B0" aria-hidden="true">#</a> 1.4 \u65B9\u5F0F\u56DB\uFF1Aabsolute+transform\u5B9E\u73B0</h3><p>\u9996\u5148\u8BBE\u7F6E\u7236\u5143\u7D20\u4E3A\u76F8\u5BF9\u5B9A\u4F4D\uFF0C\u518D\u8BBE\u7F6E\u5B50\u5143\u7D20\u4E3A\u7EDD\u5BF9\u5B9A\u4F4D\uFF0C\u9996\u5148\u8BBE\u7F6E\u5B50\u5143\u7D20\u7684<code>left:50%</code>\uFF0C\u7136\u540E\u901A\u8FC7\u5411\u5DE6\u79FB\u52A8\u5B50\u5143\u7D20\u7684\u4E00\u534A\u5BBD\u5EA6\u4EE5\u8FBE\u5230\u6C34\u5E73\u5C45\u4E2D\u3002</p><ul><li>\u5B9A\u5BBD\u5EA6\uFF0C\u8BBE\u7F6E\u7EDD\u5BF9\u5B50\u5143\u7D20\u7684<code>margin-left:-\u5143\u7D20\u5BBD\u5EA6\u7684\u4E00\u534Apx</code>\u6216\u8005\u8BBE\u7F6E<code>transform: translateX(-50%)</code></li><li>\u4E0D\u5B9A\u5BBD\uFF0C\u53EA\u80FD\u4F7F\u7528<code>transform: translateX(-50%)</code></li></ul><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;\u6211\u662F\u5757\u7EA7\u5143\u7D20&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  position: relative;
  background:  #fcc;
}
.child {
  position: absolute;
  background: #f66;
  left: 50%;
  transform: translateX(-50%); // \u901A\u7528
  /** \u5B9A\u5BBD\u5EA6\u53EF\u4F7F\u7528margin-left **/
  width\uFF1A100px;
  margin-left\uFF1A-50px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201723869.png" alt="image-20210709201723869"></p><h3 id="_1-5-\u65B9\u5F0F\u4E94-absolute-margin\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-5-\u65B9\u5F0F\u4E94-absolute-margin\u5B9E\u73B0" aria-hidden="true">#</a> 1.5 \u65B9\u5F0F\u4E94\uFF1Aabsolute+margin\u5B9E\u73B0</h3><p>\u901A\u8FC7\u5B50\u5143\u7D20\u7EDD\u5BF9\u5B9A\u4F4D\uFF0C\u5916\u52A0<code>margin: 0 auto</code>\u6765\u5B9E\u73B0\u3002</p><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;\u6211\u662F\u5757\u7EA7\u5143\u7D20&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  position: relative;
  background:  #fcc;
}
.child {
  position: absolute;
  background: #f66;
  width: 200px;
  height: 100px;
  margin: 0 auto; /*\u6C34\u5E73\u5C45\u4E2D*/
  left: 0; /*\u6B64\u5904\u4E0D\u80FD\u7701\u7565\uFF0C\u4E14\u4E3A0*/
  right: 0;/*\u6B64\u5904\u4E0D\u80FD\u7701\u7565\uFF0C\u4E14\u4E3A0*/
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201823067.png" alt="image-20210709201823067"></p><h3 id="_1-6-\u65B9\u5F0F\u516D-flexbox\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-6-\u65B9\u5F0F\u516D-flexbox\u5B9E\u73B0" aria-hidden="true">#</a> 1.6 \u65B9\u5F0F\u516D\uFF1Aflexbox\u5B9E\u73B0</h3><p>\u4F7F\u7528flexbox\u5E03\u5C40\uFF0C\u53EA\u9700\u8981\u7ED9\u5F85\u5904\u7406\u7684\u5757\u72B6\u5143\u7D20\u7684\u7236\u5143\u7D20\u6DFB\u52A0\u5C5E\u6027 <code>display: flex</code>\u3001 <code>justify-content: center</code></p><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;\u6211\u662F\u5757\u7EA7\u5143\u7D20&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  display: flex;
  justify-content: center;
  background:  #fcc;
}
.child {
  height: 100px;
  width: 100px;
  background: #f66;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201903304.png" alt="image-20210709201903304"></p><h3 id="_1-7-\u65B9\u5F0F\u4E03-flex-margin\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-7-\u65B9\u5F0F\u4E03-flex-margin\u5B9E\u73B0" aria-hidden="true">#</a> 1.7 \u65B9\u5F0F\u4E03\uFF1Aflex+margin\u5B9E\u73B0</h3><p>\u901A\u8FC7<code>flex</code>\u5C06\u7236\u5BB9\u5668\u8BBE\u7F6E\u4E3A\u4E3A<code>flex</code>\u5E03\u5C40\uFF0C\u518D\u8BBE\u7F6E\u5B50\u5143\u7D20\u5C45\u4E2D\u3002</p><p>HTML</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;\u6211\u662F\u5757\u7EA7\u5143\u7D20&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  display: flex;
  background: #fcc;
}
.child {
  height: 100px;
  width: 100px;
  margin: 0 auto;
  background: #f66;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201948982.png" alt="image-20210709201948982"></p><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,59),u={href:"https://segmentfault.com/a/1190000021249922",target:"_blank",rel:"noopener noreferrer"},o=t("CSS\u6C34\u5E73\u5C45\u4E2D\u76847\u79CD\u5B9E\u73B0\u65B9\u5F0F");function m(b,g){const i=r("ExternalLinkIcon");return d(),l("div",null,[v,e("p",null,[e("a",u,[o,s(i)])])])}var x=n(c,[["render",m],["__file","C3-CSS\u6C34\u5E73\u5C45\u4E2D\u76847\u79CD\u5B9E\u73B0\u65B9\u5F0F.html.vue"]]);export{x as default};
