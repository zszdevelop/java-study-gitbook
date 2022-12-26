import{_ as o,W as t,X as l,Y as e,Z as s,$ as a,a0 as i,D as r}from"./framework-0cf5f349.js";const p={},c=i(`<h1 id="gitlab配置custom-hook" tabindex="-1"><a class="header-anchor" href="#gitlab配置custom-hook" aria-hidden="true">#</a> gitlab配置custom hook</h1><h2 id="_1-具体步骤" tabindex="-1"><a class="header-anchor" href="#_1-具体步骤" aria-hidden="true">#</a> 1. 具体步骤</h2><h3 id="_1-1-设置custom-hooks路径" tabindex="-1"><a class="header-anchor" href="#_1-1-设置custom-hooks路径" aria-hidden="true">#</a> 1.1 设置custom_hooks路径</h3><p>修改 gitlab 中的<code>vi /etc/gitlab/gitlab.rb</code></p><p>增加 custom_hooks_dir 路径：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gitlab_shell[&#39;custom_hooks_dir&#39;] = &quot;/opt/gitlab/embedded/service/gitlab-shell/hooks&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注：这里直接去掉注释使用自带的</p><h3 id="_1-2-启用配置" tabindex="-1"><a class="header-anchor" href="#_1-2-启用配置" aria-hidden="true">#</a> 1.2 启用配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo gitlab-ctl reconfigure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-3-创建hook文件" tabindex="-1"><a class="header-anchor" href="#_1-3-创建hook文件" aria-hidden="true">#</a> 1.3 创建hook文件</h3><p>自定义脚本目录要符合<code>&lt;custom_hooks_dir&gt;/&lt;hook_name.d&gt;/*</code> 的规范。具体就是</p><ul><li><p>在自定的<code>custom_hooks_dir</code> 目录下可创建三个文件夹对应三类 <code>server hook name</code> ：</p><ul><li>pre-receive.d</li><li>update.d</li><li>post-receive.d</li></ul></li><li><p>在每个文件夹下可以创建任意文件，在对应的hook时期，gitlab就会主动调用</p></li><li><p>文件名以<code>~</code>结尾的文件会被忽略</p></li><li><p>如果想看这部分的实现细节可以看 <code>&lt;gitlab-shell&gt;/lib/gitlab_custom_hook.rb</code> 文件</p></li></ul><p>目录结构示意</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@localhost custom_hooks]# tree
.
├── post-receive.d
│   ├── 01.sh
│   └── 02.sh~
├── pre-receive.d
│   ├── 01.sh
│   ├── 02.py
│   └── 03.rb
└── update.d
    ├── 01.sh
    └── 02.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-编写-hook-脚本" tabindex="-1"><a class="header-anchor" href="#_1-4-编写-hook-脚本" aria-hidden="true">#</a> 1.4 编写 hook 脚本</h3><p>hook 脚本就是git 自身的规范，写shell，python、ruby 都可以</p>`,16),d=e("strong",null,"0 正常退出，用户可以 push；非 0 异常退出，中断提交（pre-receive 和 update）",-1),u={href:"https://link.jianshu.com/?t=https://github.com/geeeeeeeeek/git-recipes/wiki/5.4-Git%E9%92%A9%E5%AD%90%EF%BC%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BD%A0%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%B5%81",target:"_blank",rel:"noopener noreferrer"},v=i(`<p>如果想让用户 push 时看到相应的日志直接在脚本中 echo 即可。</p><p>这里举两个例子：</p><p>🌰：Say hi.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Say hi from gitlab servertes ok 😄&quot;</span>
<span class="token builtin class-name">exit</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🌰：检查提交修改的文件，发现有特定内容禁止提交</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh
FIND_KEY=&#39;.test.51offer.com&#39;
OLD_VALUE=$2
NEW_VALUE=$3

FILES=$(git rev-list --objects $OLD_VALUE...$NEW_VALUE | egrep &#39;\\.(jsp|vm|java)$&#39; | awk &#39;{print $2}&#39; | sort | uniq )

FLAG=0
for FILE in $FILES
do
    git show $NEW_VALUE:$FILE | grep -q &quot;$FIND_KEY&quot;
    if [ $? -eq 0 ]
    then
        FLAG=1
        echo &quot;📃  包含非法字段 &#39;$FIND_KEY&#39; : $FILE&quot;
    fi
done

if [ $FLAG -eq 0 ]
then
    echo &quot;✅  代码检查通过.&quot;
else
    echo &quot;❌  代码检查不通过!&quot;
    exit 1
fi

exit 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子结果</p><p>上面第二个例子中，尝试 <code>git push</code>，就能看到如下的日志：</p><div class="language-ruby line-numbers-mode" data-ext="rb"><pre class="language-ruby"><code>Pushing to git<span class="token variable">@gitlab</span><span class="token number">.51</span>offer<span class="token punctuation">.</span>inner<span class="token symbol">:mall</span><span class="token operator">/</span>paycenter<span class="token punctuation">.</span>git
<span class="token symbol">remote</span><span class="token operator">:</span> 📃  包含非法字段 <span class="token string-literal"><span class="token string">&#39;.test.51offer.com&#39;</span></span> <span class="token operator">:</span> service<span class="token operator">/</span>src<span class="token operator">/</span>main<span class="token operator">/</span>java<span class="token operator">/</span>com<span class="token operator">/</span>horizon<span class="token operator">/</span><span class="token keyword">module</span><span class="token operator">/</span>paycenter<span class="token operator">/</span>service<span class="token operator">/</span>PayService<span class="token punctuation">.</span>java        
<span class="token symbol">remote</span><span class="token operator">:</span> ❌  代码检查不通过<span class="token operator">!</span>        
<span class="token symbol">remote</span><span class="token operator">:</span> error<span class="token operator">:</span> hook declined to update refs<span class="token operator">/</span>heads<span class="token operator">/</span>test        
To git<span class="token variable">@gitlab</span><span class="token number">.51</span>offer<span class="token punctuation">.</span>inner<span class="token symbol">:mall</span><span class="token operator">/</span>paycenter<span class="token punctuation">.</span>git
 <span class="token operator">=</span> <span class="token punctuation">[</span>up to date<span class="token punctuation">]</span>      release<span class="token operator">/</span>old <span class="token operator">-</span><span class="token operator">&gt;</span> release<span class="token operator">/</span>old
 <span class="token operator">=</span> <span class="token punctuation">[</span>up to date<span class="token punctuation">]</span>      v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token number">.2016</span><span class="token number">.9</span><span class="token number">.8</span> <span class="token operator">-</span><span class="token operator">&gt;</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token number">.2016</span><span class="token number">.9</span><span class="token number">.8</span>
 <span class="token operator">!</span> <span class="token punctuation">[</span>remote rejected<span class="token punctuation">]</span> test <span class="token operator">-</span><span class="token operator">&gt;</span> test <span class="token punctuation">(</span>hook declined<span class="token punctuation">)</span>
<span class="token symbol">error</span><span class="token operator">:</span> failed to push some refs to <span class="token string-literal"><span class="token string">&#39;git@gitlab.51offer.inner:mall/paycenter.git&#39;</span></span>
Completed with errors<span class="token punctuation">,</span> see above
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h3>`,10),m={href:"https://www.jianshu.com/p/5531a21afa68",target:"_blank",rel:"noopener noreferrer"},b={href:"https://docs.gitlab.com/ee/administration/custom_hooks.html",target:"_blank",rel:"noopener noreferrer"};function h(k,g){const n=r("ExternalLinkIcon");return t(),l("div",null,[c,e("p",null,[s("留意脚本最后的退出值："),d,s(" 。 细节参见： "),e("a",u,[s("5.4 Git钩子：自定义你的工作流 · geeeeeeeeek/git-recipes Wiki · GitHub"),a(n)])]),v,e("p",null,[e("a",m,[s("Gitlab 服务器端 custom hook 配置"),a(n)])]),e("p",null,[e("a",b,[s("官方文档"),a(n)])])])}const f=o(p,[["render",h],["__file","gitlab-x-custom-hook.html.vue"]]);export{f as default};
