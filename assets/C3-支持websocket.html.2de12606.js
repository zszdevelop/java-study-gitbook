import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as i,e as s}from"./app.e5cb29cd.js";const r={},d=s(`<h1 id="\u652F\u6301websocket" tabindex="-1"><a class="header-anchor" href="#\u652F\u6301websocket" aria-hidden="true">#</a> \u652F\u6301websocket</h1><p>\u9700\u8981\u52A0\u4E0A</p><p>proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection &quot;upgrade&quot;;</p><p>\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> server {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[d];function a(c,o){return n(),i("div",null,t)}var v=e(r,[["render",a],["__file","C3-\u652F\u6301websocket.html.vue"]]);export{v as default};
