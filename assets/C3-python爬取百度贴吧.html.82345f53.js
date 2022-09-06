import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{o as e,c as t,a as n,b as p,e as i,d as l,r as o}from"./app.e5cb29cd.js";const c={},u=i(`<h2 id="python\u722C\u53D6\u767E\u5EA6\u8D34\u5427-\u96BE\u5EA61\u661F" tabindex="-1"><a class="header-anchor" href="#python\u722C\u53D6\u767E\u5EA6\u8D34\u5427-\u96BE\u5EA61\u661F" aria-hidden="true">#</a> python\u722C\u53D6\u767E\u5EA6\u8D34\u5427\uFF08\u96BE\u5EA61\u661F\uFF09</h2><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>\u6307\u5B9A\u8D34\u5427\u540D\u548C\u9700\u8981\u7684\u6761\u6570\uFF0C\u5C06\u8D34\u5427\u5185\u5BB9\u4E0B\u8F7D\u5230\u672C\u5730</p><h2 id="_2-\u6D89\u53CA\u77E5\u8BC6\u70B9" tabindex="-1"><a class="header-anchor" href="#_2-\u6D89\u53CA\u77E5\u8BC6\u70B9" aria-hidden="true">#</a> 2. \u6D89\u53CA\u77E5\u8BC6\u70B9</h2><ul><li>requests \u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42</li><li>python\u6587\u4EF6\u64CD\u4F5C <ul><li>open() \u51FD\u6570\u7528\u4E8E\u6253\u5F00\u4E00\u4E2A\u6587\u4EF6\uFF0C\u521B\u5EFA\u4E00\u4E2A <strong>file</strong> \u5BF9\u8C61\uFF0C\u76F8\u5173\u7684\u65B9\u6CD5\u624D\u53EF\u4EE5\u8C03\u7528\u5B83\u8FDB\u884C\u8BFB\u5199\u3002</li><li>f.write(&quot;hello\\n&quot;)\uFF1A\u5199\u5165\u6570\u636E</li></ul></li></ul><h2 id="_3-\u5B8C\u6574\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_3-\u5B8C\u6574\u4EE3\u7801" aria-hidden="true">#</a> 3. \u5B8C\u6574\u4EE3\u7801</h2><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment">#!/usr/bin/python3</span>
<span class="token comment"># -*- coding: utf-8 -*-</span>
<span class="token keyword">import</span> requests


<span class="token keyword">class</span> <span class="token class-name">TiebaSpider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> kw<span class="token punctuation">,</span> max_pn<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>max_pn <span class="token operator">=</span> max_pn
        self<span class="token punctuation">.</span>kw <span class="token operator">=</span> kw
        self<span class="token punctuation">.</span>base_url <span class="token operator">=</span> <span class="token string">&quot;https://tieba.baidu.com/f?kw={}&amp;ie=utf-8&amp;pn={}&quot;</span>
        self<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;User-Agent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36&quot;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">def</span> <span class="token function">get_url_list</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        \u83B7\u53D6 url \u5217\u8868
        :return:
        &#39;&#39;&#39;</span>
        <span class="token comment"># \u5199\u6CD5\u4E00</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        url_list = []
        for pn in range(0,self.max_pn,50):
            url = self.base_url.format(self.kw,pn)
            url_list.append(url)
        return url_list
        &#39;&#39;&#39;</span>
        <span class="token comment"># \u5199\u6CD5\u4E8C</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>self<span class="token punctuation">.</span>base_url<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>kw<span class="token punctuation">,</span> pn<span class="token punctuation">)</span> <span class="token keyword">for</span> pn <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>max_pn<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">get_content</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        \u53D1\u9001\u8BF7\u6C42\u83B7\u53D6\u54CD\u5E94\u5185\u5BB9
        :param url:
        :return:
        &#39;&#39;&#39;</span>
        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>
            url<span class="token operator">=</span>url<span class="token punctuation">,</span>
            headers<span class="token operator">=</span>self<span class="token punctuation">.</span>headers
        <span class="token punctuation">)</span>

        <span class="token keyword">return</span> response<span class="token punctuation">.</span>content

    <span class="token keyword">def</span> <span class="token function">get_items</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> content<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        \u4ECE\u54CD\u5E94\u5185\u5BB9\u4E2D\u63D0\u53D6\u6570\u636E
        :param content:
        :return:
        &#39;&#39;&#39;</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;tieba-{}.html&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>content<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">save_items</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> items<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        \u4FDD\u5B58\u6570\u636E
        :param items:
        :return:
        &#39;&#39;&#39;</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 1. \u83B7\u53D6 url \u5217\u8868</span>
        url_list <span class="token operator">=</span> self<span class="token punctuation">.</span>get_url_list<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">for</span> url <span class="token keyword">in</span> url_list<span class="token punctuation">:</span>
            <span class="token comment"># 2. \u53D1\u9001\u8BF7\u6C42\u83B7\u53D6\u54CD\u5E94</span>
            content <span class="token operator">=</span> self<span class="token punctuation">.</span>get_content<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
            <span class="token comment"># 3. \u4ECE\u54CD\u5E94\u4E2D\u63D0\u53D6\u6570\u636E</span>
            items <span class="token operator">=</span> self<span class="token punctuation">.</span>get_items<span class="token punctuation">(</span>content<span class="token punctuation">,</span> url_list<span class="token punctuation">.</span>index<span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token comment"># 4. \u4FDD\u5B58\u6570\u636E</span>
            self<span class="token punctuation">.</span>save_items<span class="token punctuation">(</span>items<span class="token punctuation">)</span>

        <span class="token keyword">pass</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    spider <span class="token operator">=</span> TiebaSpider<span class="token punctuation">(</span><span class="token string">&quot;\u82F1\u96C4\u8054\u76DF&quot;</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span>
    spider<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,8),r={href:"https://github.com/DropsDevopsOrg/ECommerceCrawlers/tree/master/OthertCrawler/0x01baidutieba",target:"_blank",rel:"noopener noreferrer"},d=l("\u5F00\u6E90\u9879\u76EEECommerceCrawlers");function k(v,m){const s=o("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[d,p(s)])])])}var f=a(c,[["render",k],["__file","C3-python\u722C\u53D6\u767E\u5EA6\u8D34\u5427.html.vue"]]);export{f as default};
