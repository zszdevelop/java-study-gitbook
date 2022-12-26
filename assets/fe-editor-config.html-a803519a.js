import{_ as i,W as a,X as s,Y as n,Z as t,$ as d,a0 as r,D as l}from"./framework-0cf5f349.js";const o={},c=r(`<h1 id="统一代码风格工具editorconfig" tabindex="-1"><a class="header-anchor" href="#统一代码风格工具editorconfig" aria-hidden="true">#</a> 统一代码风格工具editorConfig</h1><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> 1. 背景</h2><p>团队中有多人进行项目开发时，每个人可能喜欢的编辑器不同，有人喜欢webstrom、有人用VsCode、还有人用sublime。</p><p>我们无法强迫开发者使用某种开发工具，那么我们如何让开发者都遵循统一的代码规范呢？</p><p>这时候我们就需要editorConfig了，<strong>在editorConfig里的配置的代码规范优先级是高于编辑器默认的代码格式化规则</strong>。</p><h2 id="_2-editorconfig-简介" tabindex="-1"><a class="header-anchor" href="#_2-editorconfig-简介" aria-hidden="true">#</a> 2. editorConfig 简介</h2><p>editorConfig不是什么软件，而是一个名称为.editorconfig的自定义文件。该文件用来定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且<strong>其优先级比编辑器自身的设置要高</strong></p><p>当打开一个文件时，EditorConfig插件会在打开文件的目录和其每一级父目录查找.editorconfig文件，直到有一个配置文件root=true</p><p>EditorConfig的配置文件是从上往下读取的并且最近的EditorConfig配置文件会被最先读取. 匹配EditorConfig配置文件中的配置项会按照读取顺序被应用, 所以最近的配置文件中的配置项拥有优先权</p><p><strong>如果.editorconfig文件没有进行某些配置，则使用编辑器默认的设置</strong></p><h2 id="_3-配置-editorconfig" tabindex="-1"><a class="header-anchor" href="#_3-配置-editorconfig" aria-hidden="true">#</a> 3. 配置.editorconfig</h2><p>在当前项目根目录下添加<code>.editorconfig</code>文件</p><p>editorconfig文件是定义一些格式化规则（此规则并不会被vscode直接解析）</p><h3 id="_3-1-官网的一个配置" tabindex="-1"><a class="header-anchor" href="#_3-1-官网的一个配置" aria-hidden="true">#</a> 3.1 官网的一个配置</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code># EditorConfig is awesome<span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>EditorConfig<span class="token punctuation">.</span>org

# top<span class="token operator">-</span>most EditorConfig file 表示是最顶层的配置文件，发现设为<span class="token boolean">true</span>时，才会停止查找<span class="token punctuation">.</span>editorconfig文件
root <span class="token operator">=</span> <span class="token boolean">true</span>

# Unix<span class="token operator">-</span>style newlines <span class="token keyword">with</span> a newline ending every file 对于所有的文件  始终在文件末尾插入一个新行
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
end_of_line <span class="token operator">=</span> lf
insert_final_newline <span class="token operator">=</span> <span class="token boolean">true</span>

# Matches multiple files <span class="token keyword">with</span> brace expansion notation
# Set <span class="token keyword">default</span> charset  对于所有的js<span class="token punctuation">,</span>py文件，设置文件字符集为utf<span class="token operator">-</span><span class="token number">8</span>
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">.</span><span class="token punctuation">{</span>js<span class="token punctuation">,</span>py<span class="token punctuation">}</span><span class="token punctuation">]</span>
charset <span class="token operator">=</span> utf<span class="token operator">-</span><span class="token number">8</span>

# <span class="token number">4</span> space indentation 控制py文件类型的缩进大小
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">.</span>py<span class="token punctuation">]</span>
indent_style <span class="token operator">=</span> space
indent_size <span class="token operator">=</span> <span class="token number">4</span>

# Tab <span class="token function">indentation</span> <span class="token punctuation">(</span>no size specified<span class="token punctuation">)</span> 设置某中文件的缩进风格为tab Makefile未指明
<span class="token punctuation">[</span>Makefile<span class="token punctuation">]</span>
indent_style <span class="token operator">=</span> tab

# Indentation override <span class="token keyword">for</span> all <span class="token constant">JS</span> under lib directory  设置在lib目录下所有<span class="token constant">JS</span>的缩进为
<span class="token punctuation">[</span>lib<span class="token doc-comment comment">/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml 设置确切文件 package.json/.travis/.yml的缩进类型
[<span class="token punctuation">{</span>package.json,.travis.yml<span class="token punctuation">}</span>]
indent_style = space
indent_size = 2


</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-语法" tabindex="-1"><a class="header-anchor" href="#_4-语法" aria-hidden="true">#</a> 4. 语法</h2><p>editorConfig配置文件需要是UTF-8字符集编码的, 以回车换行或换行作为一行的分隔符</p><p>斜线(/)被用作为一个路径分隔符，井号(#)或分号(;)被用作于注释. 注释需要与注释符号写在同一行</p><h3 id="_4-1-通配符" tabindex="-1"><a class="header-anchor" href="#_4-1-通配符" aria-hidden="true">#</a> 4.1 通配符</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>*                匹配除/之外的任意字符串
**               匹配任意字符串
?                匹配任意单个字符
[name]           匹配name中的任意一个单一字符
[!name]          匹配不存在name中的任意一个单一字符
{s1,s2,s3}       匹配给定的字符串中的任意一个(用逗号分隔) 
{num1..num2}   　匹配num1到num2之间的任意一个整数, 这里的num1和num2可以为正整数也可以为负整数

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-属性" tabindex="-1"><a class="header-anchor" href="#_4-2-属性" aria-hidden="true">#</a> 4.2 属性</h3><p>所有的属性和值都是忽略大小写的. 解析时它们都是小写的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>indent_style    设置缩进风格(tab是硬缩进，space为软缩进)
indent_size     用一个整数定义的列数来设置缩进的宽度，如果indent_style为tab，则此属性默认为tab_width
tab_width       用一个整数来设置tab缩进的列数。默认是indent_size
end_of_line     设置换行符，值为lf、cr和crlf
charset         设置编码，值为latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用utf-8-bom
trim_trailing_whitespace  设为true表示会去除换行行首的任意空白字符。
insert_final_newline      设为true表示使文件以一个空白行结尾
root        　　　表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-控制指定文件类型的缩进大小" tabindex="-1"><a class="header-anchor" href="#_4-3-控制指定文件类型的缩进大小" aria-hidden="true">#</a> 4.3 控制指定文件类型的缩进大小</h3><p>这里可以设置，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[{*.json,*.yml}]
indent_style = space
indent_size = 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于<code>.json</code> <code>.yml</code> 文件，使用空格替代tab，并且一个tab会被替换为2个空格。</p><h3 id="_4-4-文件末尾新行" tabindex="-1"><a class="header-anchor" href="#_4-4-文件末尾新行" aria-hidden="true">#</a> 4.4 文件末尾新行</h3><p>始终在文件末尾插入一个新行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[*]
end_of_line = lf
insert_final_newline = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于所有的文件</p><ul><li>每一行的尾部自动调整为 Lf</li><li>文件的末尾是一个空行</li></ul><h2 id="_5-实例" tabindex="-1"><a class="header-anchor" href="#_5-实例" aria-hidden="true">#</a> 5. 实例</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 告诉EditorConfig插件，这是根文件，不用继续往上查找
root = true

# 匹配全部文件
[*]
# 设置字符集
charset = utf-8
# 缩进风格，可选space、tab
indent_style = space
# 缩进的空格数
indent_size = 4
# 结尾换行符，可选lf、cr、crlf
end_of_line = lf
# 在文件结尾插入新行
insert_final_newline = true
# 删除一行中的前后空格
trim_trailing_whitespace = true

# 匹配md结尾的文件
[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-测试是否可用" tabindex="-1"><a class="header-anchor" href="#_5-1-测试是否可用" aria-hidden="true">#</a> 5.1 测试是否可用：</h4><p>在项目的 js 文件中使用 tab 键进行缩进，分别修改 indent_size 属性值为 2 和 4，观察是否有变化。如果没有任何变化，说明还没有安装 Editorconfig 插件。</p><h2 id="_6-编辑器中安装使用" tabindex="-1"><a class="header-anchor" href="#_6-编辑器中安装使用" aria-hidden="true">#</a> 6. 编辑器中安装使用</h2><h3 id="_6-1-vscode中安装editorconfig" tabindex="-1"><a class="header-anchor" href="#_6-1-vscode中安装editorconfig" aria-hidden="true">#</a> 6.1 VSCode中安装EditorConfig</h3><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210924210740884.png" alt="image-20210924210740884" tabindex="0" loading="lazy"><figcaption>image-20210924210740884</figcaption></figure><p>EditorConfig扩展的作用是读取第一步创建的editorconfig文件中定义的规则，并覆盖user/workspace settings中的对应配置（从这我们也可以看出vscode本身其实是并不直接支持editorconfig的）</p><h4 id="_6-1-1-全局安装或局部安装" tabindex="-1"><a class="header-anchor" href="#_6-1-1-全局安装或局部安装" aria-hidden="true">#</a> 6.1.1 全局安装或局部安装</h4><p>editorconfig依赖包(npm install -g editorconfig | npm install -D editorconfig) 安装editorconfig依赖包主要是因为EditorConfig依赖于editorconfig包，不安装的可能会导致EditorConfig无法正常解析我们在第一步定义的editorconfig文件</p><h3 id="_6-1-2-使用" tabindex="-1"><a class="header-anchor" href="#_6-1-2-使用" aria-hidden="true">#</a> 6.1.2 使用</h3><p>打开需要格式化的文件并手动格式化代码（shift+alt+f）</p><h2 id="_7-导出editorconfig文件" tabindex="-1"><a class="header-anchor" href="#_7-导出editorconfig文件" aria-hidden="true">#</a> 7. 导出editorconfig文件</h2><h3 id="_7-1-webstorm-导出editorconfig文件" tabindex="-1"><a class="header-anchor" href="#_7-1-webstorm-导出editorconfig文件" aria-hidden="true">#</a> 7.1 webstorm 导出editorconfig文件</h3><p>操作步骤：webstorm里找到配置，按照以下图示导出.editorconfig，.editorconfig文件会出现在项目的根目录里：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210924210543587.png" alt="image-20210924210543587" tabindex="0" loading="lazy"><figcaption>image-20210924210543587</figcaption></figure><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210924210707992.png" alt="image-20210924210707992" tabindex="0" loading="lazy"><figcaption>image-20210924210707992</figcaption></figure><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,50),p={href:"https://blog.csdn.net/Gabriel_wei/article/details/90286668",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const e=l("ExternalLinkIcon");return a(),s("div",null,[c,n("p",null,[n("a",p,[t("vscode使用editorconfig插件以及.editorconfig配置文件说明(统一代码风格工具——editorConfig)"),d(e)])])])}const h=i(o,[["render",u],["__file","fe-editor-config.html.vue"]]);export{h as default};
