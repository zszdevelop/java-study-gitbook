import{_ as a,W as e,X as t,Y as n,Z as p,$ as i,a0 as l,D as o}from"./framework-0cf5f349.js";const c={},u=l(`<h2 id="python爬取百度贴吧-难度1星" tabindex="-1"><a class="header-anchor" href="#python爬取百度贴吧-难度1星" aria-hidden="true">#</a> python爬取百度贴吧（难度1星）</h2><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>指定贴吧名和需要的条数，将贴吧内容下载到本地</p><h2 id="_2-涉及知识点" tabindex="-1"><a class="header-anchor" href="#_2-涉及知识点" aria-hidden="true">#</a> 2. 涉及知识点</h2><ul><li>requests 发起网络请求</li><li>python文件操作 <ul><li>open() 函数用于打开一个文件，创建一个 <strong>file</strong> 对象，相关的方法才可以调用它进行读写。</li><li>f.write(&quot;hello\\n&quot;)：写入数据</li></ul></li></ul><h2 id="_3-完整代码" tabindex="-1"><a class="header-anchor" href="#_3-完整代码" aria-hidden="true">#</a> 3. 完整代码</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/python3</span>
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
        获取 url 列表
        :return:
        &#39;&#39;&#39;</span>
        <span class="token comment"># 写法一</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        url_list = []
        for pn in range(0,self.max_pn,50):
            url = self.base_url.format(self.kw,pn)
            url_list.append(url)
        return url_list
        &#39;&#39;&#39;</span>
        <span class="token comment"># 写法二</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span>self<span class="token punctuation">.</span>base_url<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>kw<span class="token punctuation">,</span> pn<span class="token punctuation">)</span> <span class="token keyword">for</span> pn <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>max_pn<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">get_content</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        发送请求获取响应内容
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
        从响应内容中提取数据
        :param content:
        :return:
        &#39;&#39;&#39;</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;tieba-{}.html&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>content<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">save_items</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> items<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        保存数据
        :param items:
        :return:
        &#39;&#39;&#39;</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 1. 获取 url 列表</span>
        url_list <span class="token operator">=</span> self<span class="token punctuation">.</span>get_url_list<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">for</span> url <span class="token keyword">in</span> url_list<span class="token punctuation">:</span>
            <span class="token comment"># 2. 发送请求获取响应</span>
            content <span class="token operator">=</span> self<span class="token punctuation">.</span>get_content<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
            <span class="token comment"># 3. 从响应中提取数据</span>
            items <span class="token operator">=</span> self<span class="token punctuation">.</span>get_items<span class="token punctuation">(</span>content<span class="token punctuation">,</span> url_list<span class="token punctuation">.</span>index<span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token comment"># 4. 保存数据</span>
            self<span class="token punctuation">.</span>save_items<span class="token punctuation">(</span>items<span class="token punctuation">)</span>

        <span class="token keyword">pass</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    spider <span class="token operator">=</span> TiebaSpider<span class="token punctuation">(</span><span class="token string">&quot;英雄联盟&quot;</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span>
    spider<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,8),r={href:"https://github.com/DropsDevopsOrg/ECommerceCrawlers/tree/master/OthertCrawler/0x01baidutieba",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=o("ExternalLinkIcon");return e(),t("div",null,[u,n("p",null,[n("a",r,[p("开源项目ECommerceCrawlers"),i(s)])])])}const b=a(c,[["render",d],["__file","python-tieba.html.vue"]]);export{b as default};
