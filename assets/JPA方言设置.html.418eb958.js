import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,c as n,e as a}from"./app.24aaacd5.js";const s={},l=a(`<h1 id="jpa\u65B9\u8A00\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#jpa\u65B9\u8A00\u8BBE\u7F6E" aria-hidden="true">#</a> JPA\u65B9\u8A00\u8BBE\u7F6E</h1><p>\u4F8B\u5982\u6570\u636E\u5E93\u7684sql\u7684\u5206\u9875\u6BCF\u4E2A\u7248\u672C\u53EF\u80FD\u4E0D\u4E00\u6837\u3002</p><p>\u4F8B\u5982\u5728oracle11g \u4E0A\u7684\u5206\u9875\u4E3A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Hibernate: 
    select
        * 
    from
        ( select
            row_.*,
            rownum rownum_ 
        from
            ( select
               *
            from
                MY_TABLE  ) row_ 
        where
            rownum &lt;= ?
        ) 
    where
        rownum_ &gt; ?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u800C\u5728oracle 12G \u4E0A\u662F:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> select
        *
    from
       MY_TABLE
  offset 0 rows fetch next 10 rows only
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u65B9\u8A00\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-\u65B9\u8A00\u8BBE\u7F6E" aria-hidden="true">#</a> 2. \u65B9\u8A00\u8BBE\u7F6E</h2><p>\u8BBE\u7F6Eoracle11G\u7684\u65B9\u8A00</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>oracle12G \u7684\u65B9\u8A00</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,11),r=[l];function d(c,t){return i(),n("div",null,r)}var o=e(s,[["render",d],["__file","JPA\u65B9\u8A00\u8BBE\u7F6E.html.vue"]]);export{o as default};
