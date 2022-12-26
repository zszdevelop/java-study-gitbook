import{_ as e,W as l,X as i,Y as n,Z as a,$ as t,a0 as p,D as o}from"./framework-0cf5f349.js";const c={},u=p(`<h1 id="word的xml格式解析" tabindex="-1"><a class="header-anchor" href="#word的xml格式解析" aria-hidden="true">#</a> Word的XML格式解析</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>Office2003以上，Word可以以 XML 文本格式存储，这样就可以使用外部程序创建Word文件，而不需要使用Word的对象。</p><p>常见的应用场景就是：</p><ul><li>程序需要生成word，我们通过动态替换xml中的内容实现动态生成word</li></ul><h2 id="_2-最简单的word" tabindex="-1"><a class="header-anchor" href="#_2-最简单的word" aria-hidden="true">#</a> 2. 最简单的word</h2><h3 id="_2-1-方式一-word导出xml格式" tabindex="-1"><a class="header-anchor" href="#_2-1-方式一-word导出xml格式" aria-hidden="true">#</a> 2.1 方式一：word导出xml格式</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428103850569.png" alt="image-20220428103850569" tabindex="0" loading="lazy"><figcaption>image-20220428103850569</figcaption></figure><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428104427628.png" alt="image-20220428104427628" tabindex="0" loading="lazy"><figcaption>image-20220428104427628</figcaption></figure><p>我们可以看到一个最简单的word导出xml格式的时候，也是包含了200多行的代码，其中包含了各种字体样式等标识。如果不熟悉word xml 其实很难去解析内容，要实现负责点的动态渲染是很困难的。</p><h3 id="_2-2-方式一-xml格式用word打开" tabindex="-1"><a class="header-anchor" href="#_2-2-方式一-xml格式用word打开" aria-hidden="true">#</a> 2.2 方式一：xml格式用word打开</h3><p>用记事本创建一个文件，将上面的XML内容粘贴，并保存为mytest.xml，在Office Word中打开它</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>wordDocument</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>w</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.microsoft.com/office/word/2003/wordml<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>r</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>r</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>body</span><span class="token punctuation">&gt;</span></span>
&lt; /w:wordDocument&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220428105113178.png" alt="image-20220428105113178" tabindex="0" loading="lazy"><figcaption>image-20220428105113178</figcaption></figure><p>两种方案都能正常显示测试两个字。</p><p>但我们拆分后xml 格式就清爽多了。</p><h2 id="_3-xml-常用结构" tabindex="-1"><a class="header-anchor" href="#_3-xml-常用结构" aria-hidden="true">#</a> 3. xml 常用结构</h2><ul><li>整体结构：body、styles、setting等</li><li>段落Paragraph结点：&lt;w:p&gt;</li><li>基本格式单位Run结点：&lt;w:r&gt;</li><li>格式Properties结点：&lt;w:pPr&gt;与&lt;w:rPr&gt; <ul><li>字体&lt;w:rFonts&gt;</li><li>字号&lt;w:sz&gt;、&lt;w:szCs&gt;</li></ul></li><li>看的见的文字Text：&lt;w:t&gt;</li><li>修订版本号rsid</li><li>注音系统Ruby：&lt;w:ruby&gt;</li></ul><h2 id="_4-xml-语法解析" tabindex="-1"><a class="header-anchor" href="#_4-xml-语法解析" aria-hidden="true">#</a> 4 xml 语法解析</h2><h3 id="_4-1-xml的声明和名称空间的指明" tabindex="-1"><a class="header-anchor" href="#_4-1-xml的声明和名称空间的指明" aria-hidden="true">#</a> 4.1 XML的声明和名称空间的指明：</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>wordDocument</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>w</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.microsoft.com/office/word/2003/wordml<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-文档内容" tabindex="-1"><a class="header-anchor" href="#_3-2-文档内容" aria-hidden="true">#</a> 3.2 文档内容</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;w:body&gt;…&lt;/w:body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-基本节点类型" tabindex="-1"><a class="header-anchor" href="#_3-3-基本节点类型" aria-hidden="true">#</a> 3.3 基本节点类型</h3><p>从body内可以看出，构成实际文本内容的有3种类型节点：</p><ul><li><p>&lt;w:p&gt; 表示一个段落</p></li><li><p>&lt;w:r&gt; 表示一个样式串，指明它包括的文本的显示样式</p></li><li><p>&lt;w:t&gt; 表示真正的文本内容</p></li></ul><p>如果我们需要指明一个文本为粗体，需要怎么办呢？</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>r</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>rPr</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>b</span> <span class="token attr-name"><span class="token namespace">w:</span>val</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>on<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>rPr</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span> 2.0C<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
&lt; /w:r&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&lt;w:b w:val=”on”&gt; 表示该格式串种的文本为粗体。</p><p>这样，我们就知道&lt;w:r&gt;表示一个特定的文本格式，稍微复杂点的格式：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>r</span><span class="token punctuation">&gt;</span></span>
&lt; w:rPr&gt; 
&lt; w:b w:val=&quot;on&quot;/&gt;
&lt; w:sz w:val=&quot;40&quot;/&gt;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>szCs</span> <span class="token attr-name"><span class="token namespace">w:</span>val</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>40<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
&lt; w:rFonts w:ascii=&quot;Arial&quot; w:eastAsia=&quot;Arial&quot; w:hAnsi=&quot;Arial&quot; /&gt;
&lt; /w:rPr&gt; 
&lt; w:t xml:space=&quot;preserve&quot;&gt;2.0C<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
&lt; /w:r&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字体为粗体，尺寸为是40除2等于20相当于几号字体？，字体名称“Arial”</p><p>&lt;w:t xml:space=&quot;preserve&quot;&gt; 2.0C&lt;/w:t&gt;</p><p>中的xml:space=&quot;preserve&quot;从字面上理解是保持空格。</p><p>如果没有这内容的话文本的前后空格将会被Word忽略。</p><p>这就要设置&lt;w:p&gt;的属性了。类似于这样：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>p</span><span class="token punctuation">&gt;</span></span>
&lt; w:pPr&gt;
&lt; w:jc w:val=&quot;right&quot;/&gt;
&lt; w:spacing w:line=&quot;600&quot; w:lineRule=&quot;auto&quot;/&gt;
&lt; /w:pPr&gt;

…

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对齐方向：&lt;w:jc w:val=”right”/&gt; 这儿是右对齐。</p><p>行距:&lt;w:spacing w:line=”600” w:lineRule=&quot;auto&quot;/&gt; 600是用行距的倍数乘240得出，如果是两倍行距，则是480。这儿应该是2.5倍行距。</p><p>由此可见，组装一个WordXML格式的文件是一件比较简单的事情。</p><p>将段属性包含在&lt;w:pPr&gt;&lt;/w:pPr&gt;中</p><p>将文本格式包含在&lt;w:rPr&gt;&lt;/w:rPr&gt;中</p><p>这儿的Pr是property的意思，表示这个块中是r(run)或p(paragraph)的格式设置。</p><h3 id="_3-4-页面设置" tabindex="-1"><a class="header-anchor" href="#_3-4-页面设置" aria-hidden="true">#</a> 3.4 页面设置</h3><p>下面内容设置了页的宽，高，和页的各边距。各项的值均是英寸乘1440得出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;w:body&gt;…
&lt;w:sectPr&gt;
&lt;w:pgSz w:w=&quot;12240&quot; w:h=&quot;15840&quot;/&gt;
&lt;w:pgMar w:top=&quot;1440&quot; w:right=&quot;1800&quot; w:bottom=&quot;1440&quot; w:left=&quot;1800&quot; w:header=&quot;720&quot; w:footer=&quot;720&quot; w:gutter=&quot;0&quot;/&gt;
&lt; /w:sectPr&gt;

&lt;/w:body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面内容设置了页的页眉页脚：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>w:sectPr wsp:rsidR=&quot;002C452C&quot;&gt;
&lt;w:hdr w:type=&quot;odd&quot; &gt;
&lt;w:p&gt;
&lt;w:pPr&gt;
&lt;w:pStyle w:val=&quot;Header&quot;/&gt;
&lt;/w:pPr&gt;
&lt;w:r&gt;
&lt;w:t&gt;My Header&lt;/w:t&gt;
&lt;/w:r&gt;
&lt;/w:p&gt;
&lt;/w:hdr&gt;
&lt;w:ftr w:type=&quot;odd&quot;&gt;
&lt;w:p&gt;
&lt;w:pPr&gt;
&lt;w:pStyle w:val=&quot;Footer&quot;/&gt;
&lt;/w:pPr&gt;
&lt;w:r&gt;
&lt;w:t&gt;My Footer&lt;/w:t&gt;
&lt;/w:r&gt;
&lt;/w:p&gt;
&lt;/w:ftr&gt;

&lt;/w:sectPr&gt;
&lt; /w:body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-文档设置" tabindex="-1"><a class="header-anchor" href="#_3-5-文档设置" aria-hidden="true">#</a> 3.5 文档设置</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>docPr</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>view</span> <span class="token attr-name"><span class="token namespace">w:</span>val</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>print<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>zoom</span> <span class="token attr-name"><span class="token namespace">w:</span>percent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
&lt; /w:docPr&gt;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>wordDocument</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docPr，就是document property的意思了。</p><p>表示文档的视图是“print”，视图比例100%</p><h2 id="_4-完整的xml文件实例" tabindex="-1"><a class="header-anchor" href="#_4-完整的xml文件实例" aria-hidden="true">#</a> 4. 完整的XML文件实例</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;yes&quot;?&gt;</span>
&lt; ?mso-application progid=&quot;Word.Document&quot;?&gt;
&lt; w:wordDocument xmlns:aml=&quot;http://schemas.microsoft.com/aml/2001/core&quot;
xmlns:dt=&quot;uuid:C2F41010-65B3-11d1-A29F-00AA00C14882&quot;
xmlns:o=&quot;urn:schemas-microsoft-com:office:office&quot;
xmlns:v=&quot;urn:schemas-microsoft-com:vml&quot;
xmlns:w10=&quot;urn:schemas-microsoft-com:office:word&quot;
xmlns:w=&quot;http://schemas.microsoft.com/office/word/2003/wordml&quot;
xmlns:wx=&quot;http://schemas.microsoft.com/office/word/2003/auxHint&quot;
xmlns:wsp=&quot;http://schemas.microsoft.com/office/word/2003/wordml/sp2&quot;
xmlns:sl=&quot;http://schemas.microsoft.com/schemaLibrary/2003/core&quot;
w:macrosPresent=&quot;no&quot; w:embeddedObjPresent=&quot;no&quot; w:ocxPresent=&quot;no&quot;
xml:space=&quot;preserve&quot;&gt;

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>body</span><span class="token punctuation">&gt;</span></span>
&lt; w:p&gt;
&lt; w:pPr&gt;
&lt; w:jc w:val=&quot;left&quot;/&gt;
&lt; w:spacing w:line=&quot;240&quot; w:lineRule=&quot;auto&quot;/&gt;
&lt; /w:pPr&gt;
&lt; w:r&gt;
&lt; w:rPr&gt; 
&lt; w:sz w:val=&quot;24&quot;/&gt;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>szCs</span> <span class="token attr-name"><span class="token namespace">w:</span>val</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>24<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
&lt; w:rFonts w:ascii=&quot;Arial&quot; w:eastAsia=&quot;Arial&quot; w:hAnsi=&quot;Arial&quot; /&gt;
&lt; /w:rPr&gt; 
&lt; w:t&gt;Niu don&#39;t like Red or Blue! It seems that <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
&lt; /w:r&gt;
&lt; w:r&gt;
&lt; w:rPr&gt; 
&lt; w:sz w:val=&quot;48&quot;/&gt;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>szCs</span> <span class="token attr-name"><span class="token namespace">w:</span>val</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>48<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
&lt; w:rFonts w:ascii=&quot;Arial&quot; w:eastAsia=&quot;Arial&quot; w:hAnsi=&quot;Arial&quot; /&gt;
&lt; /w:rPr&gt; 
&lt; w:t&gt;Hello world!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
&lt; /w:r&gt;
&lt; /w:p&gt;
&lt; w:p&gt;

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>sectPr</span> <span class="token attr-name"><span class="token namespace">wsp:</span>rsidR</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>002C452C<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
&lt; w:pgSz w:w=&quot;12240&quot; w:h=&quot;15840&quot;/&gt;
&lt; w:pgMar w:top=&quot;1526.4&quot; w:right=&quot;3254.4&quot; w:bottom=&quot;2966.4&quot; w:left=&quot;1670.4&quot; w:header=&quot;720&quot; w:footer=&quot;720&quot; w:gutter=&quot;0&quot;/&gt;
&lt; w:hdr w:type=&quot;odd&quot; &gt;
&lt; w:p&gt;
&lt; w:pPr&gt;
&lt; w:pStyle w:val=&quot;Header&quot;/&gt;
&lt; /w:pPr&gt;
&lt; w:r&gt;
&lt; w:t&gt;Header<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
&lt; /w:r&gt;
&lt; /w:p&gt;
&lt; /w:hdr&gt;
&lt; w:ftr w:type=&quot;odd&quot;&gt;
&lt; w:p&gt;
&lt; w:pPr&gt;
&lt; w:pStyle w:val=&quot;Footer&quot;/&gt;
&lt; /w:pPr&gt;
&lt; w:r&gt;
&lt; w:t&gt;Footer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">w:</span>t</span><span class="token punctuation">&gt;</span></span>
&lt; /w:r&gt;
&lt; /w:p&gt;
&lt; /w:ftr&gt;
&lt; /w:sectPr&gt;
&lt; /w:body&gt;

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>docPr</span><span class="token punctuation">&gt;</span></span>
&lt; w:view w:val=&quot;print&quot;/&gt;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">w:</span>zoom</span> <span class="token attr-name"><span class="token namespace">w:</span>percent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
&lt; /w:docPr&gt;
&lt; /w:wordDocument&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,55),d={href:"https://blog.csdn.net/lmhuanying1012/article/details/78764041",target:"_blank",rel:"noopener noreferrer"},r={href:"https://blog.csdn.net/liuqixuan1994/article/details/104486600",target:"_blank",rel:"noopener noreferrer"};function m(v,g){const s=o("ExternalLinkIcon");return l(),i("div",null,[u,n("p",null,[n("a",d,[a("WordXML格式解析"),t(s)])]),n("p",null,[n("a",r,[a("Word文件的OpenXML解析（以Python3为例）"),t(s)])])])}const k=e(c,[["render",m],["__file","office-y-word-xml.html.vue"]]);export{k as default};
