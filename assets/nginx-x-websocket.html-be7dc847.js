import{_ as e,W as n,X as i,a0 as s}from"./framework-0cf5f349.js";const d={},t=s(`<h1 id="支持websocket" tabindex="-1"><a class="header-anchor" href="#支持websocket" aria-hidden="true">#</a> 支持websocket</h1><p>需要加上</p><p>proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection &quot;upgrade&quot;;</p><p>例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> server {
        listen       80;
        server_name  gd.isture.com;

        location / {
            proxy_pass http://120.79.200.111:9705/;
            proxy_read_timeout 300;
            proxy_connect_timeout 300;

             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection &quot;upgrade&quot;;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),r=[t];function a(c,l){return n(),i("div",null,r)}const u=e(d,[["render",a],["__file","nginx-x-websocket.html.vue"]]);export{u as default};
