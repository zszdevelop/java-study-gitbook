import{_ as s,W as d,X as t,Y as e,Z as i,$ as l,a0 as a,D as r}from"./framework-0cf5f349.js";const c={},u=a(`<h1 id="gitlab搭建" tabindex="-1"><a class="header-anchor" href="#gitlab搭建" aria-hidden="true">#</a> gitlab搭建</h1><h2 id="_1-搭建方式" tabindex="-1"><a class="header-anchor" href="#_1-搭建方式" aria-hidden="true">#</a> 1. 搭建方式</h2><p>gitlab 搭建有两种方式</p><ul><li><p>第一种方法</p><p>说白了其实gitlab就是一个web端，打散后其实也是由（nginx，gitaly，redis，gitlab-workhorse...）等这些东西构成；所以你可以一个个组装一个个编译安装；这样你也可以深入去了解gitlab，同时也可以达到最简化（将不必要的东西去掉）</p></li><li><p>第二种方法</p><p>rpm 安装。。。官方和社区都有提供</p></li></ul><p>第一种太折腾人了，本文演示第二种方式</p><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h2><h3 id="_2-1-安装并配置必要的依赖关系" tabindex="-1"><a class="header-anchor" href="#_2-1-安装并配置必要的依赖关系" aria-hidden="true">#</a> 2.1 安装并配置必要的依赖关系</h3><p>在 CentOS 系统上，下面的命令将会打开系统防火墙 HTTP 和 SSH 的访问。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo yum install curl policycoreutils openssh-server openssh-clients
sudo systemctl enable sshd
sudo systemctl start sshd
sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
sudo firewall-cmd --permanent --add-service=http
sudo systemctl reload firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-添加-gitlab-镜像源并安装" tabindex="-1"><a class="header-anchor" href="#_2-2-添加-gitlab-镜像源并安装" aria-hidden="true">#</a> 2.2 添加 GitLab 镜像源并安装</h3>`,10),b=a(`<li><p>方式1：命令管道的方式安装镜像仓库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -sS http://packages.gitlab.com.cn/install/gitlab-ce/script.rpm.sh | sudo bash
sudo yum install gitlab-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我使用不成功</p></li>`,1),v=a(`<p>方式2：使用命名手动安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -LJO https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-XXX.rpm
rpm -i gitlab-ce-XXX.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o={href:"https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/",target:"_blank",rel:"noopener noreferrer"},g=a(`<h4 id="_2-2-1-安装时异常" tabindex="-1"><a class="header-anchor" href="#_2-2-1-安装时异常" aria-hidden="true">#</a> 2.2.1 安装时异常</h4><p>在使用命令rpm -i gitlab-ce-XXX.rpm 时提示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rpm -i gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm
warning: gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm: Header V4 RSA/SHA1 Signature, key ID f27eab47: NOKEY
error: Failed dependencies:
	policycoreutils-python is needed by gitlab-ce-12.2.4-ce.0.el7.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install policycoreutils-python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-2-2-安装完成提示" tabindex="-1"><a class="header-anchor" href="#_2-2-2-安装完成提示" aria-hidden="true">#</a> 2.2.2 安装完成提示</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@iZwz97t3ru69kye3l7uj70Z ~]# rpm -i gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm
warning: gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm: Header V4 RSA/SHA1 Signature, key ID f27eab47: NOKEY
It looks like GitLab has not been configured yet; skipping the upgrade script.

       *.                  *.
      ***                 ***
     *****               *****
    .******             *******
    ********            ********
   ,,,,,,,,,***********,,,,,,,,,
  ,,,,,,,,,,,*********,,,,,,,,,,,
  .,,,,,,,,,,,*******,,,,,,,,,,,,
      ,,,,,,,,,*****,,,,,,,,,.
         ,,,,,,,****,,,,,,
            .,,,***,,,,
                ,*,.



     _______ __  __          __
    / ____(_) /_/ /   ____ _/ /_
   / / __/ / __/ /   / __ \`/ __ \\
  / /_/ / / /_/ /___/ /_/ / /_/ /
  \\____/_/\\__/_____/\\__,_/_.___/


Thank you for installing GitLab!
GitLab was unable to detect a valid hostname for your instance.
Please configure a URL for your GitLab instance by setting \`external_url\`
configuration in /etc/gitlab/gitlab.rb file.
Then, you can start your GitLab instance by running the following command:
  sudo gitlab-ctl reconfigure

For a comprehensive list of configuration options please see the Omnibus GitLab readme
https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-配置" tabindex="-1"><a class="header-anchor" href="#_2-3-配置" aria-hidden="true">#</a> 2.3 配置</h3><h4 id="_2-3-1-配置外网访问的地址-必须改" tabindex="-1"><a class="header-anchor" href="#_2-3-1-配置外网访问的地址-必须改" aria-hidden="true">#</a> 2.3.1 配置外网访问的地址(必须改)</h4><p>修改/etc/gitlab/gitlab.rb，将默认external_url改成，你的ip或者域名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>external_url &#39;http://gitlab.isture.com&#39;
#external_url &#39;http://120.79.200.xxx&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-nginx端口冲突" tabindex="-1"><a class="header-anchor" href="#_2-3-2-nginx端口冲突" aria-hidden="true">#</a> 2.3.2 nginx端口冲突</h4><p>gitlab 其实是个web，他自带了nginx。但是我们本身服务器也有一个nginx这样就冲突了</p><h5 id="_2-3-2-1-解决方案" tabindex="-1"><a class="header-anchor" href="#_2-3-2-1-解决方案" aria-hidden="true">#</a> 2.3.2.1 解决方案</h5><ul><li><p>第一种（不建议）</p><p>禁用gitlab自带的nginx，使用我们自己安装的nginx</p></li><li><p>第二种</p><p>更改gitlab 自带的nginx的默认端口，域名加端口访问。</p><p>如果有强迫症，可以在自己的服务器nginx映射到gitlab 的nginx就好了</p></li></ul><h5 id="_2-3-2-2-修改配置" tabindex="-1"><a class="header-anchor" href="#_2-3-2-2-修改配置" aria-hidden="true">#</a> 2.3.2.2 修改配置</h5><p>修改/etc/gitlab/gitlab.rb的端口配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> nginx[&#39;listen_port&#39;] = 9999
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-3-3-修改gitlab数据存储路径-非必选" tabindex="-1"><a class="header-anchor" href="#_2-3-3-修改gitlab数据存储路径-非必选" aria-hidden="true">#</a> 2.3.3 修改Gitlab数据存储路径（非必选）</h4><p>默认的Gitlab数据存储路径在<code>/var/opt/gitlab/git-data</code></p><p>修改/etc/gitlab/gitlab.rb</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>###!   path that doesn&#39;t contain symlinks.**
# git_data_dirs({
#   &quot;default&quot; =&gt; {
#     &quot;path&quot; =&gt; &quot;你需要放置的路径&quot;
#    }
# })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-启用配置并启动gitlab" tabindex="-1"><a class="header-anchor" href="#_2-4-启用配置并启动gitlab" aria-hidden="true">#</a> 2.4 启用配置并启动GitLab</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo gitlab-ctl reconfigure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其他gitlab 命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
sudo gitlab-ctl status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-浏览器打开配置的地址" tabindex="-1"><a class="header-anchor" href="#_2-5-浏览器打开配置的地址" aria-hidden="true">#</a> 2.5 浏览器打开配置的地址</h3><ul><li><p>在第一次访问时，将被重定向到密码重置页面</p><p>默认账户是root，密码在此页面设置</p></li></ul><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20190907201354004.png" alt="image-20190907201354004" tabindex="0" loading="lazy"><figcaption>image-20190907201354004</figcaption></figure><h2 id="_3-常用的几个gitlab命令" tabindex="-1"><a class="header-anchor" href="#_3-常用的几个gitlab命令" aria-hidden="true">#</a> 3. 常用的几个Gitlab命令</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 重新应用gitlab的配置,每次修改/etc/gitlab/gitlab.rb文件之后执行
sudo gitlab-ctl reconfigure

# 启动gitlab服务
sudo gitlab-ctl start

# 重启gitlab服务
sudo gitlab-ctl restart

# 查看gitlab运行状态
sudo gitlab-ctl status

#停止gitlab服务
sudo gitlab-ctl stop

# 查看gitlab运行所有日志
sudo gitlab-ctl tail

#查看 nginx 访问日志
sudo gitlab-ctl tail nginx/gitlab_acces.log 

#查看 postgresql 日志
sudo gitlab-ctl tail postgresql 

# 停止相关数据连接服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq

# 系统信息监测
gitlab-rake gitlab:env:info       

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-gitlab相关目录" tabindex="-1"><a class="header-anchor" href="#_4-gitlab相关目录" aria-hidden="true">#</a> 4. gitlab相关目录</h2><ul><li>/var/opt/gitlab/git-data/repositories/root：库默认存储目录</li><li>/opt/gitlab：是gitlab的应用代码和相应的依赖程序</li><li>/var/opt/gitlab：此目录下是运行gitlab-ctl reconfigure命令编译后的应用数据和配置文件，不需要人为修改配置</li><li>/etc/gitlab：此目录下存放了以omnibus-gitlab包安装方式时的配置文件，这里的配置文件才需要管理员手动编译配置</li><li>/var/log/gitlab：此目录下存放了gitlab各个组件产生的日志</li><li>/opt/gitlab/backups/：默认备份文件生成的目录</li></ul><h3 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h3>`,34),m={href:"https://segmentfault.com/a/1190000011632220",target:"_blank",rel:"noopener noreferrer"},h={href:"https://blog.csdn.net/ouyang_peng/article/details/72903221",target:"_blank",rel:"noopener noreferrer"};function p(_,x){const n=r("ExternalLinkIcon");return d(),t("div",null,[u,e("ul",null,[b,e("li",null,[v,e("p",null,[i("gitlab-ce-xxx.rpm 具体是哪个版本可以进"),e("a",o,[i("gitlab镜像"),l(n)]),i("中选择")])])]),g,e("p",null,[e("a",m,[i("搭建gitlab服务"),l(n)])]),e("p",null,[e("a",h,[i("在CenterOS系统上安装GitLab并自定义域名访问GitLab管理页面"),l(n)])])])}const y=s(c,[["render",p],["__file","gitlab-x-install.html.vue"]]);export{y as default};
