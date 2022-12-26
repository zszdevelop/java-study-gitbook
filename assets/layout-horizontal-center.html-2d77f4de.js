import{_ as n,W as a,X as d,Y as e,Z as l,$ as s,a0 as t,D as r}from"./framework-0cf5f349.js";const c={},v=t(`<h1 id="css水平居中的7种实现方式" tabindex="-1"><a class="header-anchor" href="#css水平居中的7种实现方式" aria-hidden="true">#</a> CSS水平居中的7种实现方式</h1><h2 id="_1-实现方式" tabindex="-1"><a class="header-anchor" href="#_1-实现方式" aria-hidden="true">#</a> 1. 实现方式</h2><h3 id="_1-1-方式一-text-align-center实现" tabindex="-1"><a class="header-anchor" href="#_1-1-方式一-text-align-center实现" aria-hidden="true">#</a> 1.1 方式一：<code>text-align: center</code>实现</h3><p>如果父元素是块级元素且里面包含行内元素，则直接给父元素设置 <code>text-align: center</code>, 如果父元素是行内元素的话父元素无法设置宽高，则需要将其设为块级元素<code>display: block</code>。也对inline、inline-block、inline-table和inline-flex元素水平居中都有效。</p><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父元素是块级元素
&lt;div id=&quot;parent&quot;&gt;
    &lt;span id=&quot;child&quot;&gt;我是行内元素&lt;/span&gt;
&lt;/div&gt;

// 父元素是行内元素
&lt;span id=&quot;parent&quot;&gt;
    &lt;span id=&quot;child&quot;&gt;我是行内元素&lt;/span&gt;
&lt;/span&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 父元素是块级元素
.parent {
  height: 300px;
  width: 300px;
  text-align: center;
  background: skyblue;
}

// 父元素是行内元素
.parent {
  height: 300px;
  width: 300px;
  display: block;
  text-align: center;
  background: skyblue;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/1460000021249926.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_1-2-方式二-margin-0-aoto实现" tabindex="-1"><a class="header-anchor" href="#_1-2-方式二-margin-0-aoto实现" aria-hidden="true">#</a> 1.2 方式二：<code>margin: 0 aoto</code>实现</h3><p>在宽度已知的情况下可以使用<code>margin：0 auto</code>，让元素水平居中。</p><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div id=&quot;parent&quot;&gt;
    &lt;div id=&quot;child&quot;&gt;我是行内元素&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  background:  #fcc;
}
.child {
  height: 100px;
  width: 100px; //确保该块级元素定宽
  background: #f66;
  margin: 0 auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201555384.png" alt="image-20210709201555384" tabindex="0" loading="lazy"><figcaption>image-20210709201555384</figcaption></figure><h3 id="_1-3-方式三-table-margin实现" tabindex="-1"><a class="header-anchor" href="#_1-3-方式三-table-margin实现" aria-hidden="true">#</a> 1.3 方式三：table+margin实现</h3><p>先将子元素设置为块级表格来显示（类似），再将其设置水平居中<code>display:table</code>在表现上类似<code>block</code>元素，但是宽度为内容宽。</p><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
  &lt;div class=&quot;child&quot;&gt;我是块级元素&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  background:  #fcc;
}
.child {
  display: table;
  background: #f66;
  margin: 0 auto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201645304.png" alt="image-20210709201645304" tabindex="0" loading="lazy"><figcaption>image-20210709201645304</figcaption></figure><h3 id="_1-4-方式四-absolute-transform实现" tabindex="-1"><a class="header-anchor" href="#_1-4-方式四-absolute-transform实现" aria-hidden="true">#</a> 1.4 方式四：absolute+transform实现</h3><p>首先设置父元素为相对定位，再设置子元素为绝对定位，首先设置子元素的<code>left:50%</code>，然后通过向左移动子元素的一半宽度以达到水平居中。</p><ul><li>定宽度，设置绝对子元素的<code>margin-left:-元素宽度的一半px</code>或者设置<code>transform: translateX(-50%)</code></li><li>不定宽，只能使用<code>transform: translateX(-50%)</code></li></ul><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;我是块级元素&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 300px;
  width: 400px;
  position: relative;
  background:  #fcc;
}
.child {
  position: absolute;
  background: #f66;
  left: 50%;
  transform: translateX(-50%); // 通用
  /** 定宽度可使用margin-left **/
  width：100px;
  margin-left：-50px;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201723869.png" alt="image-20210709201723869" tabindex="0" loading="lazy"><figcaption>image-20210709201723869</figcaption></figure><h3 id="_1-5-方式五-absolute-margin实现" tabindex="-1"><a class="header-anchor" href="#_1-5-方式五-absolute-margin实现" aria-hidden="true">#</a> 1.5 方式五：absolute+margin实现</h3><p>通过子元素绝对定位，外加<code>margin: 0 auto</code>来实现。</p><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;我是块级元素&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
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
  margin: 0 auto; /*水平居中*/
  left: 0; /*此处不能省略，且为0*/
  right: 0;/*此处不能省略，且为0*/
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201823067.png" alt="image-20210709201823067" tabindex="0" loading="lazy"><figcaption>image-20210709201823067</figcaption></figure><h3 id="_1-6-方式六-flexbox实现" tabindex="-1"><a class="header-anchor" href="#_1-6-方式六-flexbox实现" aria-hidden="true">#</a> 1.6 方式六：flexbox实现</h3><p>使用flexbox布局，只需要给待处理的块状元素的父元素添加属性 <code>display: flex</code>、 <code>justify-content: center</code></p><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;我是块级元素&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201903304.png" alt="image-20210709201903304" tabindex="0" loading="lazy"><figcaption>image-20210709201903304</figcaption></figure><h3 id="_1-7-方式七-flex-margin实现" tabindex="-1"><a class="header-anchor" href="#_1-7-方式七-flex-margin实现" aria-hidden="true">#</a> 1.7 方式七：flex+margin实现</h3><p>通过<code>flex</code>将父容器设置为为<code>flex</code>布局，再设置子元素居中。</p><p>HTML</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;我是块级元素&lt;/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CSS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210709201948982.png" alt="image-20210709201948982" tabindex="0" loading="lazy"><figcaption>image-20210709201948982</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,59),u={href:"https://segmentfault.com/a/1190000021249922",target:"_blank",rel:"noopener noreferrer"};function o(g,m){const i=r("ExternalLinkIcon");return a(),d("div",null,[v,e("p",null,[e("a",u,[l("CSS水平居中的7种实现方式"),s(i)])])])}const p=n(c,[["render",o],["__file","layout-horizontal-center.html.vue"]]);export{p as default};
