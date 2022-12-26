import{_ as e,W as n,X as s,a0 as a}from"./framework-0cf5f349.js";const i={},l=a(`<h1 id="gitignore文件屏蔽规则" tabindex="-1"><a class="header-anchor" href="#gitignore文件屏蔽规则" aria-hidden="true">#</a> gitignore文件屏蔽规则</h1><p>在使用git仓库时，我们并不希望将所有的文件都提交到仓库中，需要对一些文件进行屏蔽，有些则要保留</p><p>此时我们就需要使用到<code>.gitignore</code>文件</p><h2 id="_2-gitignore-文件格式规范" tabindex="-1"><a class="header-anchor" href="#_2-gitignore-文件格式规范" aria-hidden="true">#</a> 2. gitignore 文件格式规范</h2><ul><li>所有空行或#开通的行都会被忽略</li><li>可以使用标准的<strong>glob 模式匹配</strong></li><li>文件或目录前加<code>/</code>表示仓库根目录的对应文件</li><li>匹配模式最后跟反斜杠<code>/</code>说明要忽略目录</li><li>要特殊不许了某个文件或目录，可以在模式钱加上取反<code>!</code></li></ul><h3 id="_2-1-glob-模式" tabindex="-1"><a class="header-anchor" href="#_2-1-glob-模式" aria-hidden="true">#</a> 2.1 glob 模式</h3><p>其中glob模式是指shell 所使用的简化了的正则表达式</p><ul><li><p>星号<code>*</code>匹配零个或多个任意字符</p></li><li><p><code>[abc]</code>匹配任何一个列在方括号中的字符（这个例子要么匹配一个a，要么匹配一个b，要么匹配一个c），</p><ul><li><code>？</code>匹配一个任意字符</li></ul></li><li><p>如果在方括号中使用短划线分割两个字符，表示所有在这两个字符范围内的都可以匹配</p><p>例如：[0-9] 表示匹配所有0-9的数字</p></li></ul><h2 id="_3-案例" tabindex="-1"><a class="header-anchor" href="#_3-案例" aria-hidden="true">#</a> 3. 案例</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>*.a                    <span class="token comment"># 所有以 &#39;.a&#39; 为后缀的文件都屏蔽掉</span>
<span class="token comment"># Office 缓存文件</span>
~<span class="token string">&#39;$&#39;</span>*.docx
~<span class="token string">&#39;$&#39;</span>*.ppt
~<span class="token string">&#39;$&#39;</span>*.pptx 
~<span class="token string">&#39;$&#39;</span>*.xls

tags                   <span class="token comment"># 仓库中所有名为 tags 的文件都屏蔽</span>
core.*                 <span class="token comment"># 仓库中所有以 &#39;core.&#39; 开头的文件都屏蔽</span>

tools/                <span class="token comment"># 屏蔽目录 tools</span>
log/*                  <span class="token comment"># 屏蔽目录 log 下的所有文件，但不屏蔽 log 目录本身</span>

/log.log               <span class="token comment"># 只屏蔽仓库根目录下的 log.log 文件，其他目录中的不屏蔽</span>
readme.md       <span class="token comment"># 屏蔽仓库中所有名为 readme.md 的文件</span>
<span class="token operator">!</span>/readme.md     <span class="token comment"># 在上一条屏蔽规则的条件下，不屏蔽仓库根目录下的 readme.md 文</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意： 例子中的最后两条的顺序很重要，必须要先屏蔽所有的，然后才建立特殊不屏蔽的规则！</p>`,11),d=[l];function o(c,t){return n(),s("div",null,d)}const p=e(i,[["render",o],["__file","git-x-gitignore.html.vue"]]);export{p as default};
