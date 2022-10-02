import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as t,a as e,b as l,e as n,d as i,r}from"./app.296fdb6c.js";const c={},u=n(`<h1 id="gitlab\u642D\u5EFA" tabindex="-1"><a class="header-anchor" href="#gitlab\u642D\u5EFA" aria-hidden="true">#</a> gitlab\u642D\u5EFA</h1><h2 id="_1-\u642D\u5EFA\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u642D\u5EFA\u65B9\u5F0F" aria-hidden="true">#</a> 1. \u642D\u5EFA\u65B9\u5F0F</h2><p>gitlab \u642D\u5EFA\u6709\u4E24\u79CD\u65B9\u5F0F</p><ul><li><p>\u7B2C\u4E00\u79CD\u65B9\u6CD5</p><p>\u8BF4\u767D\u4E86\u5176\u5B9Egitlab\u5C31\u662F\u4E00\u4E2Aweb\u7AEF\uFF0C\u6253\u6563\u540E\u5176\u5B9E\u4E5F\u662F\u7531\uFF08nginx\uFF0Cgitaly\uFF0Credis\uFF0Cgitlab-workhorse...\uFF09\u7B49\u8FD9\u4E9B\u4E1C\u897F\u6784\u6210\uFF1B\u6240\u4EE5\u4F60\u53EF\u4EE5\u4E00\u4E2A\u4E2A\u7EC4\u88C5\u4E00\u4E2A\u4E2A\u7F16\u8BD1\u5B89\u88C5\uFF1B\u8FD9\u6837\u4F60\u4E5F\u53EF\u4EE5\u6DF1\u5165\u53BB\u4E86\u89E3gitlab\uFF0C\u540C\u65F6\u4E5F\u53EF\u4EE5\u8FBE\u5230\u6700\u7B80\u5316\uFF08\u5C06\u4E0D\u5FC5\u8981\u7684\u4E1C\u897F\u53BB\u6389\uFF09</p></li><li><p>\u7B2C\u4E8C\u79CD\u65B9\u6CD5</p><p>rpm \u5B89\u88C5\u3002\u3002\u3002\u5B98\u65B9\u548C\u793E\u533A\u90FD\u6709\u63D0\u4F9B</p></li></ul><p>\u7B2C\u4E00\u79CD\u592A\u6298\u817E\u4EBA\u4E86\uFF0C\u672C\u6587\u6F14\u793A\u7B2C\u4E8C\u79CD\u65B9\u5F0F</p><h2 id="_2-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5" aria-hidden="true">#</a> 2. \u5B89\u88C5</h2><h3 id="_2-1-\u5B89\u88C5\u5E76\u914D\u7F6E\u5FC5\u8981\u7684\u4F9D\u8D56\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5B89\u88C5\u5E76\u914D\u7F6E\u5FC5\u8981\u7684\u4F9D\u8D56\u5173\u7CFB" aria-hidden="true">#</a> 2.1 \u5B89\u88C5\u5E76\u914D\u7F6E\u5FC5\u8981\u7684\u4F9D\u8D56\u5173\u7CFB</h3><p>\u5728 CentOS \u7CFB\u7EDF\u4E0A\uFF0C\u4E0B\u9762\u7684\u547D\u4EE4\u5C06\u4F1A\u6253\u5F00\u7CFB\u7EDF\u9632\u706B\u5899 HTTP \u548C SSH \u7684\u8BBF\u95EE\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo yum install curl policycoreutils openssh-server openssh-clients
sudo systemctl enable sshd
sudo systemctl start sshd
sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
sudo firewall-cmd --permanent --add-service=http
sudo systemctl reload firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-\u6DFB\u52A0-gitlab-\u955C\u50CF\u6E90\u5E76\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-2-\u6DFB\u52A0-gitlab-\u955C\u50CF\u6E90\u5E76\u5B89\u88C5" aria-hidden="true">#</a> 2.2 \u6DFB\u52A0 GitLab \u955C\u50CF\u6E90\u5E76\u5B89\u88C5</h3>`,10),b=n(`<li><p>\u65B9\u5F0F1\uFF1A\u547D\u4EE4\u7BA1\u9053\u7684\u65B9\u5F0F\u5B89\u88C5\u955C\u50CF\u4ED3\u5E93</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -sS http://packages.gitlab.com.cn/install/gitlab-ce/script.rpm.sh | sudo bash
sudo yum install gitlab-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4F7F\u7528\u4E0D\u6210\u529F</p></li>`,1),v=n(`<p>\u65B9\u5F0F2\uFF1A\u4F7F\u7528\u547D\u540D\u624B\u52A8\u5B89\u88C5</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -LJO https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-XXX.rpm
rpm -i gitlab-ce-XXX.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=i("gitlab-ce-xxx.rpm \u5177\u4F53\u662F\u54EA\u4E2A\u7248\u672C\u53EF\u4EE5\u8FDB"),g={href:"https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/",target:"_blank",rel:"noopener noreferrer"},m=i("gitlab\u955C\u50CF"),h=i("\u4E2D\u9009\u62E9"),p=n(`<h4 id="_2-2-1-\u5B89\u88C5\u65F6\u5F02\u5E38" tabindex="-1"><a class="header-anchor" href="#_2-2-1-\u5B89\u88C5\u65F6\u5F02\u5E38" aria-hidden="true">#</a> 2.2.1 \u5B89\u88C5\u65F6\u5F02\u5E38</h4><p>\u5728\u4F7F\u7528\u547D\u4EE4rpm -i gitlab-ce-XXX.rpm \u65F6\u63D0\u793A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rpm -i gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm
warning: gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm: Header V4 RSA/SHA1 Signature, key ID f27eab47: NOKEY
error: Failed dependencies:
	policycoreutils-python is needed by gitlab-ce-12.2.4-ce.0.el7.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9700\u8981\u5B89\u88C5</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yum install policycoreutils-python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-2-2-\u5B89\u88C5\u5B8C\u6210\u63D0\u793A" tabindex="-1"><a class="header-anchor" href="#_2-2-2-\u5B89\u88C5\u5B8C\u6210\u63D0\u793A" aria-hidden="true">#</a> 2.2.2 \u5B89\u88C5\u5B8C\u6210\u63D0\u793A</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[root@iZwz97t3ru69kye3l7uj70Z ~]# rpm -i gitlab-ce-12.2.4-ce.0.el7.x86_64.rpm
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-3-\u914D\u7F6E" aria-hidden="true">#</a> 2.3 \u914D\u7F6E</h3><h4 id="_2-3-1-\u914D\u7F6E\u5916\u7F51\u8BBF\u95EE\u7684\u5730\u5740-\u5FC5\u987B\u6539" tabindex="-1"><a class="header-anchor" href="#_2-3-1-\u914D\u7F6E\u5916\u7F51\u8BBF\u95EE\u7684\u5730\u5740-\u5FC5\u987B\u6539" aria-hidden="true">#</a> 2.3.1 \u914D\u7F6E\u5916\u7F51\u8BBF\u95EE\u7684\u5730\u5740(\u5FC5\u987B\u6539)</h4><p>\u4FEE\u6539/etc/gitlab/gitlab.rb\uFF0C\u5C06\u9ED8\u8BA4external_url\u6539\u6210\uFF0C\u4F60\u7684ip\u6216\u8005\u57DF\u540D</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>external_url &#39;http://gitlab.isture.com&#39;
#external_url &#39;http://120.79.200.xxx&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-nginx\u7AEF\u53E3\u51B2\u7A81" tabindex="-1"><a class="header-anchor" href="#_2-3-2-nginx\u7AEF\u53E3\u51B2\u7A81" aria-hidden="true">#</a> 2.3.2 nginx\u7AEF\u53E3\u51B2\u7A81</h4><p>gitlab \u5176\u5B9E\u662F\u4E2Aweb\uFF0C\u4ED6\u81EA\u5E26\u4E86nginx\u3002\u4F46\u662F\u6211\u4EEC\u672C\u8EAB\u670D\u52A1\u5668\u4E5F\u6709\u4E00\u4E2Anginx\u8FD9\u6837\u5C31\u51B2\u7A81\u4E86</p><h5 id="_2-3-2-1-\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#_2-3-2-1-\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> 2.3.2.1 \u89E3\u51B3\u65B9\u6848</h5><ul><li><p>\u7B2C\u4E00\u79CD\uFF08\u4E0D\u5EFA\u8BAE\uFF09</p><p>\u7981\u7528gitlab\u81EA\u5E26\u7684nginx\uFF0C\u4F7F\u7528\u6211\u4EEC\u81EA\u5DF1\u5B89\u88C5\u7684nginx</p></li><li><p>\u7B2C\u4E8C\u79CD</p><p>\u66F4\u6539gitlab \u81EA\u5E26\u7684nginx\u7684\u9ED8\u8BA4\u7AEF\u53E3\uFF0C\u57DF\u540D\u52A0\u7AEF\u53E3\u8BBF\u95EE\u3002</p><p>\u5982\u679C\u6709\u5F3A\u8FEB\u75C7\uFF0C\u53EF\u4EE5\u5728\u81EA\u5DF1\u7684\u670D\u52A1\u5668nginx\u6620\u5C04\u5230gitlab \u7684nginx\u5C31\u597D\u4E86</p></li></ul><h5 id="_2-3-2-2-\u4FEE\u6539\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-3-2-2-\u4FEE\u6539\u914D\u7F6E" aria-hidden="true">#</a> 2.3.2.2 \u4FEE\u6539\u914D\u7F6E</h5><p>\u4FEE\u6539/etc/gitlab/gitlab.rb\u7684\u7AEF\u53E3\u914D\u7F6E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> nginx[&#39;listen_port&#39;] = 9999
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-3-3-\u4FEE\u6539gitlab\u6570\u636E\u5B58\u50A8\u8DEF\u5F84-\u975E\u5FC5\u9009" tabindex="-1"><a class="header-anchor" href="#_2-3-3-\u4FEE\u6539gitlab\u6570\u636E\u5B58\u50A8\u8DEF\u5F84-\u975E\u5FC5\u9009" aria-hidden="true">#</a> 2.3.3 \u4FEE\u6539Gitlab\u6570\u636E\u5B58\u50A8\u8DEF\u5F84\uFF08\u975E\u5FC5\u9009\uFF09</h4><p>\u9ED8\u8BA4\u7684Gitlab\u6570\u636E\u5B58\u50A8\u8DEF\u5F84\u5728<code>/var/opt/gitlab/git-data</code></p><p>\u4FEE\u6539/etc/gitlab/gitlab.rb</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>###!   path that doesn&#39;t contain symlinks.**
# git_data_dirs({
#   &quot;default&quot; =&gt; {
#     &quot;path&quot; =&gt; &quot;\u4F60\u9700\u8981\u653E\u7F6E\u7684\u8DEF\u5F84&quot;
#    }
# })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-\u542F\u7528\u914D\u7F6E\u5E76\u542F\u52A8gitlab" tabindex="-1"><a class="header-anchor" href="#_2-4-\u542F\u7528\u914D\u7F6E\u5E76\u542F\u52A8gitlab" aria-hidden="true">#</a> 2.4 \u542F\u7528\u914D\u7F6E\u5E76\u542F\u52A8GitLab</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo gitlab-ctl reconfigure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5176\u4ED6gitlab \u547D\u4EE4</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
sudo gitlab-ctl status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-\u6D4F\u89C8\u5668\u6253\u5F00\u914D\u7F6E\u7684\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#_2-5-\u6D4F\u89C8\u5668\u6253\u5F00\u914D\u7F6E\u7684\u5730\u5740" aria-hidden="true">#</a> 2.5 \u6D4F\u89C8\u5668\u6253\u5F00\u914D\u7F6E\u7684\u5730\u5740</h3><ul><li><p>\u5728\u7B2C\u4E00\u6B21\u8BBF\u95EE\u65F6\uFF0C\u5C06\u88AB\u91CD\u5B9A\u5411\u5230\u5BC6\u7801\u91CD\u7F6E\u9875\u9762</p><p>\u9ED8\u8BA4\u8D26\u6237\u662Froot\uFF0C\u5BC6\u7801\u5728\u6B64\u9875\u9762\u8BBE\u7F6E</p></li></ul><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20190907201354004.png" alt="image-20190907201354004" loading="lazy"></p><h2 id="_3-\u5E38\u7528\u7684\u51E0\u4E2Agitlab\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_3-\u5E38\u7528\u7684\u51E0\u4E2Agitlab\u547D\u4EE4" aria-hidden="true">#</a> 3. \u5E38\u7528\u7684\u51E0\u4E2AGitlab\u547D\u4EE4</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># \u91CD\u65B0\u5E94\u7528gitlab\u7684\u914D\u7F6E,\u6BCF\u6B21\u4FEE\u6539/etc/gitlab/gitlab.rb\u6587\u4EF6\u4E4B\u540E\u6267\u884C
sudo gitlab-ctl reconfigure

# \u542F\u52A8gitlab\u670D\u52A1
sudo gitlab-ctl start

# \u91CD\u542Fgitlab\u670D\u52A1
sudo gitlab-ctl restart

# \u67E5\u770Bgitlab\u8FD0\u884C\u72B6\u6001
sudo gitlab-ctl status

#\u505C\u6B62gitlab\u670D\u52A1
sudo gitlab-ctl stop

# \u67E5\u770Bgitlab\u8FD0\u884C\u6240\u6709\u65E5\u5FD7
sudo gitlab-ctl tail

#\u67E5\u770B nginx \u8BBF\u95EE\u65E5\u5FD7
sudo gitlab-ctl tail nginx/gitlab_acces.log 

#\u67E5\u770B postgresql \u65E5\u5FD7
sudo gitlab-ctl tail postgresql 

# \u505C\u6B62\u76F8\u5173\u6570\u636E\u8FDE\u63A5\u670D\u52A1
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq

# \u7CFB\u7EDF\u4FE1\u606F\u76D1\u6D4B
gitlab-rake gitlab:env:info       

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-gitlab\u76F8\u5173\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#_4-gitlab\u76F8\u5173\u76EE\u5F55" aria-hidden="true">#</a> 4. gitlab\u76F8\u5173\u76EE\u5F55</h2><ul><li>/var/opt/gitlab/git-data/repositories/root\uFF1A\u5E93\u9ED8\u8BA4\u5B58\u50A8\u76EE\u5F55</li><li>/opt/gitlab\uFF1A\u662Fgitlab\u7684\u5E94\u7528\u4EE3\u7801\u548C\u76F8\u5E94\u7684\u4F9D\u8D56\u7A0B\u5E8F</li><li>/var/opt/gitlab\uFF1A\u6B64\u76EE\u5F55\u4E0B\u662F\u8FD0\u884Cgitlab-ctl reconfigure\u547D\u4EE4\u7F16\u8BD1\u540E\u7684\u5E94\u7528\u6570\u636E\u548C\u914D\u7F6E\u6587\u4EF6\uFF0C\u4E0D\u9700\u8981\u4EBA\u4E3A\u4FEE\u6539\u914D\u7F6E</li><li>/etc/gitlab\uFF1A\u6B64\u76EE\u5F55\u4E0B\u5B58\u653E\u4E86\u4EE5omnibus-gitlab\u5305\u5B89\u88C5\u65B9\u5F0F\u65F6\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u8FD9\u91CC\u7684\u914D\u7F6E\u6587\u4EF6\u624D\u9700\u8981\u7BA1\u7406\u5458\u624B\u52A8\u7F16\u8BD1\u914D\u7F6E</li><li>/var/log/gitlab\uFF1A\u6B64\u76EE\u5F55\u4E0B\u5B58\u653E\u4E86gitlab\u5404\u4E2A\u7EC4\u4EF6\u4EA7\u751F\u7684\u65E5\u5FD7</li><li>/opt/gitlab/backups/\uFF1A\u9ED8\u8BA4\u5907\u4EFD\u6587\u4EF6\u751F\u6210\u7684\u76EE\u5F55</li></ul><h3 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h3>`,34),_={href:"https://segmentfault.com/a/1190000011632220",target:"_blank",rel:"noopener noreferrer"},x=i("\u642D\u5EFAgitlab\u670D\u52A1"),f={href:"https://blog.csdn.net/ouyang_peng/article/details/72903221",target:"_blank",rel:"noopener noreferrer"},y=i("\u5728CenterOS\u7CFB\u7EDF\u4E0A\u5B89\u88C5GitLab\u5E76\u81EA\u5B9A\u4E49\u57DF\u540D\u8BBF\u95EEGitLab\u7BA1\u7406\u9875\u9762");function k(L,G){const a=r("ExternalLinkIcon");return d(),t("div",null,[u,e("ul",null,[b,e("li",null,[v,e("p",null,[o,e("a",g,[m,l(a)]),h])])]),p,e("p",null,[e("a",_,[x,l(a)])]),e("p",null,[e("a",f,[y,l(a)])])])}const X=s(c,[["render",k],["__file","gitlab-x-install.html.vue"]]);export{X as default};
