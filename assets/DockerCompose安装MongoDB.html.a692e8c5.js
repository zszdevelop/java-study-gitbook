import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e as a}from"./app.61455a3d.js";const o={},i=a(`<h1 id="dockercompose\u5B89\u88C5mongodb" tabindex="-1"><a class="header-anchor" href="#dockercompose\u5B89\u88C5mongodb" aria-hidden="true">#</a> DockerCompose\u5B89\u88C5MongoDB</h1><h2 id="_1-\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_1-\u4ECB\u7ECD" aria-hidden="true">#</a> 1. \u4ECB\u7ECD</h2><p>docker-compose \u4F7F\u7528\u6BD4dockerfile \u66F4\u52A0\u65B9\u4FBF</p><h2 id="_2-\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#_2-\u5B9E\u4F8B" aria-hidden="true">#</a> 2. \u5B9E\u4F8B</h2><ol><li>\u914D\u7F6E docker-compose-mongodb.yml</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>version: <span class="token string">&#39;3&#39;</span>
services:
  mongodb:
    image: mongo:4.2.6
    restart: always
    volumes:
      - /home/mongodb/db:/data/db
      - /home/mongodb/log:/var/log/mongodb
<span class="token comment">#      - /home/mongo_data_dump:/data</span>
    ports:
      - <span class="token number">27017</span>:27017
<span class="token comment">#    environment:</span>
<span class="token comment">#      MONGO_INITDB_ROOT_USERNAME: admin</span>
<span class="token comment">#      MONGO_INITDB_ROOT_PASSWORD: admin     </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>\u65B0\u5EFA\u76EE\u5F55</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> /home/mongodb/db
<span class="token function">mkdir</span> /home/mongodb/log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u4E00\u822C\u6211\u4EEC\u5E0C\u671B\u5BF9\u955C\u50CF\u4E2D\u7684\u78C1\u76D8\u505A\u5916\u90E8\u6620\u5C04\uFF0C\u8FD9\u6837\u5373\u4F7F\u5BB9\u5668\u9000\u51FA\u4E86\uFF0C\u4E0B\u6B21\u542F\u52A8\uFF0C\u5BB9\u5668\u4E2D\u4FDD\u7559\u7684\u6570\u636E\u4E0D\u4F1A\u4E22\u5931\u3002</p></blockquote></li><li><p>\u8FD0\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker-compose</span> -f docker-compose-mongodb.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol>`,7),d=[i];function l(c,r){return n(),s("div",null,d)}var v=e(o,[["render",l],["__file","DockerCompose\u5B89\u88C5MongoDB.html.vue"]]);export{v as default};
