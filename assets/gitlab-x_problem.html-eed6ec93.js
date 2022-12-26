import{_ as a,W as t,X as d,Y as n,Z as e,$ as s,a0 as l,D as r}from"./framework-0cf5f349.js";const c={},o=l(`<h1 id="问题集锦" tabindex="-1"><a class="header-anchor" href="#问题集锦" aria-hidden="true">#</a> 问题集锦</h1><h2 id="_1-push-提交异常" tabindex="-1"><a class="header-anchor" href="#_1-push-提交异常" aria-hidden="true">#</a> 1. push 提交异常</h2><p>push 提交时出现fatal: The remote end hung up unexpectedly异常</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>localhost:android zhangshengzhong$ git push --set-upstream http://gitlab.isture.com/zsz/android-gitbook.git master
Counting objects: 245, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (214/214), done.
error: RPC failed; result=22, HTTP code = 41383 MiB/s
fatal: The remote end hung up unexpectedly
Writing objects: 100% (245/245), 15.83 MiB | 6.85 MiB/s, done.
Total 245 (delta 7), reused 0 (delta 0)
fatal: The remote end hung up unexpectedly
Everything up-to-date
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-解决方案" tabindex="-1"><a class="header-anchor" href="#_1-1-解决方案" aria-hidden="true">#</a> 1.1 解决方案</h3><p>原因：因为上传文件超过了nginx 的文件限制最大值</p><p>注意：自己是走哪个nginx，是gitlab自带的还是服务器的nginx</p><p>给nginx 添加上</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http {
  ...
  client_max_body_size 100M;
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-clone路径不对" tabindex="-1"><a class="header-anchor" href="#_2-clone路径不对" aria-hidden="true">#</a> 2. clone路径不对</h2><h3 id="_2-1-方式一" tabindex="-1"><a class="header-anchor" href="#_2-1-方式一" aria-hidden="true">#</a> 2.1 方式一</h3><p>直接更改/etc/gitlab/gitlab.rb不能生效，更改/opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml文件</p><hr><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更改<strong>host和port</strong>即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  ## GitLab settings 
  gitlab:
    ## Web server settings (note: host is the FQDN, do not include http://)
    host: xxx.xxx.xxx.xxx
    port: 8181
    https: fals
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-方式二" tabindex="-1"><a class="header-anchor" href="#_2-2-方式二" aria-hidden="true">#</a> 2.2 方式二</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>external_url &#39;http://gitlab.isture.com&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,18),u={href:"http://gitlab.isture.com",target:"_blank",rel:"noopener noreferrer"};function h(v,b){const i=r("ExternalLinkIcon");return t(),d("div",null,[o,n("p",null,[e("external_url '"),n("a",u,[e("http://gitlab.isture.com"),s(i)]),e("'")])])}const g=a(c,[["render",h],["__file","gitlab-x_problem.html.vue"]]);export{g as default};
