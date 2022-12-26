import{_ as d,W as s,X as l,Y as e,Z as i,$ as a,a0 as r,D as t}from"./framework-0cf5f349.js";const o={},c=r(`<h1 id="四种解决nginx出现403-forbidden-报错的方法" tabindex="-1"><a class="header-anchor" href="#四种解决nginx出现403-forbidden-报错的方法" aria-hidden="true">#</a> 四种解决Nginx出现403 forbidden 报错的方法</h1><h2 id="_1-背景-访问时报403" tabindex="-1"><a class="header-anchor" href="#_1-背景-访问时报403" aria-hidden="true">#</a> 1.背景：访问时报403</h2><p>nginx 访问静态资源文件提示</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20190908163131411.png" alt="image-20190908163131411" tabindex="0" loading="lazy"><figcaption>image-20190908163131411</figcaption></figure><p>于是查看nginx日志，路径为/var/log/nginx/error.log。打开日志发现报错Permission denied，详细报错如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2021/08/31 16:06:44 [error] 32713#32713: *5 open() &quot;/home/faduit/data/upload//blYctsOfficialSealController20210831152014.png&quot; failed (13: Permission denied), client: 10.8.0.23, server: 192.168.134.3, request: &quot;GET /upload/blYctsOfficialSealController20210831152014.png HTTP/1.1&quot;, host: &quot;192.168.134.3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-解决方式" tabindex="-1"><a class="header-anchor" href="#_2-解决方式" aria-hidden="true">#</a> 2. 解决方式</h2><h3 id="_2-1-方式1-由于启动用户和nginx工作用户不一致所致" tabindex="-1"><a class="header-anchor" href="#_2-1-方式1-由于启动用户和nginx工作用户不一致所致" aria-hidden="true">#</a> 2.1 方式1：<strong>由于启动用户和nginx工作用户不一致所致</strong></h3><ol><li><p>查看nginx启动的用户</p><p>发现是nobody，而为是用root启动的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> ps axu|grep &#39;nginx&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>out</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nobody      4936  0.0  0.0  45864  1176 ?        Ss   8月17   0:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>将nginx.config的user改为和启动用户一致</p><p>命令：vi conf/nginx.conf</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> #user nobody;
 user root;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="_2-2-方式2-权限问题-如果nginx没有web目录的操作权限-也会出现403错误。" tabindex="-1"><a class="header-anchor" href="#_2-2-方式2-权限问题-如果nginx没有web目录的操作权限-也会出现403错误。" aria-hidden="true">#</a> 2.2 方式2：权限问题，如果nginx没有web目录的操作权限，也会出现403错误。</h3><p>解决办法：修改web目录的读写权限，或者是把nginx的启动用户改成目录的所属用户，重启Nginx即可解决</p><ol><li><p>chmod -R 777 /data</p></li><li><p>chmod -R 777 /data/www/</p></li></ol><h4 id="_2-3-方式3-缺少index-html或者index-php文件-就是配置文件中index-index-html-index-htm这行中的指定的文件。" tabindex="-1"><a class="header-anchor" href="#_2-3-方式3-缺少index-html或者index-php文件-就是配置文件中index-index-html-index-htm这行中的指定的文件。" aria-hidden="true">#</a> 2.3 方式3：<strong>缺少index.html或者index.php文件，就是配置文件中index index.html index.htm这行中的指定的文件。</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {

   listen 80;

  server_name localhost;

  index index.php index.html;

  root /data/www/;

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果把它当做文件目录，要列出文件目录</p><p>添加: autoindex on;</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 文件服务器
    server {
        listen       80;
        server_name  file.isture.com;

        location / {
            root   /home/ftpuser/file;
            autoindex on;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-方式4-selinux设置为开启状态-enabled-的原因。" tabindex="-1"><a class="header-anchor" href="#_2-4-方式4-selinux设置为开启状态-enabled-的原因。" aria-hidden="true">#</a> 2.4 方式4：<strong>SELinux设置为开启状态（enabled）的原因。</strong></h3><p>查看当前selinux的状态。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/sbin/sestatus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将SELINUX=enforcing 修改为 SELINUX=disabled 状态。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#SELINUX=enforcing

 SELINUX=disabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启生效。reboot。</p><hr><p>不想重启的可以使用临时关闭</p><p>临时关闭（不用重启机器）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setenforce 0          ##设置SELinux 成为permissive模式

 \\##setenforce 1 设置SELinux 成为enforcing模式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,29),u={href:"https://blog.51cto.com/bguncle/957315",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/shadow_zed/article/details/106853355",target:"_blank",rel:"noopener noreferrer"};function x(g,m){const n=t("ExternalLinkIcon");return s(),l("div",null,[c,e("p",null,[e("a",u,[i("查看 SELinux状态及关闭SELinux"),a(n)])]),e("p",null,[e("a",v,[i("四种解决Nginx出现403 forbidden 报错的方法"),a(n)])])])}const h=d(o,[["render",x],["__file","nginx-x-forbidden403.html.vue"]]);export{h as default};
