import{_ as n,W as s,X as a,a0 as t}from"./framework-0cf5f349.js";const p={},e=t(`<h1 id="python爬取豆瓣影评分析" tabindex="-1"><a class="header-anchor" href="#python爬取豆瓣影评分析" aria-hidden="true">#</a> python爬取豆瓣影评分析</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>读取豆瓣影评，并根据影评分析出影评关键词</p><h2 id="_2-涉及知识点" tabindex="-1"><a class="header-anchor" href="#_2-涉及知识点" aria-hidden="true">#</a> 2. 涉及知识点</h2><ol><li><p>requests.Session() 会话保持</p><blockquote><p>requests库的session会话对象可以跨请求保持某些参数，说白了，就是比如你使用session成功的登录了某个网站，则在再次使用该session对象求求该网站的其他网页都会默认使用该session之前使用的cookie等参数</p></blockquote></li><li><p>requests 请求网络代理</p><p>如果需要使用代理，你可以通过为任意请求方法提供 proxies 参数来配置单个请求:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import requests 
proxies = { &quot;http&quot;: &quot;http://10.10.1.10:3128&quot;, &quot;https&quot;: &quot;http://10.10.1.10:1080&quot;, } 
requests.get(&quot;http://example.org&quot;, proxies=proxies)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>输入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kind = int(input(&quot;请选择搜索类型：1.根据电影链接 2.根据电影id 3.根据电影名：&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>selenium 模拟操作,通过xpath查找元素</p></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> drive = webdriver.Chrome()
    drive.get(html.url)
    first_result = drive.find_element_by_xpath(&#39;//*[@id=&quot;root&quot;]/div/div[2]/div[1]/div[1]/div[1]/div/div/div[1]/a&#39;).get_attribute(&#39;href&#39;)
   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li><p>使用lxml 解析评论数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  from lxml import etree
  path_tree = etree.HTML(html.text)
  comment_divs = xpath_tree.xpath(&#39;//*[@id=&quot;comments&quot;]/div&#39;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>PIL图像处理</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from PIL import Image
Image.open(&#39;Emile.jpg&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>jieba 结巴中文分词</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import jieba
jieba.cut(comment_txt)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>词云</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
def create_word_cloud():
    # 设置词云形状图片,numpy+PIL方式读取图片
    wc_mask = np.array(Image.open(&#39;Emile.jpg&#39;))
    # 数据清洗词列表
    stop_words = [&#39;的&#39;,&#39;是&#39;,&#39;我&#39;,&#39;都&#39;,&#39;了&#39;,&#39;有&#39;,&#39;在&#39;,&#39;给&#39;,&#39;吗&#39;,&#39;和&#39;,&#39;就是&#39;, &#39;不是&#39;, &#39;但是&#39;, &#39;还是&#39;, &#39;只是&#39;, &#39;这样&#39;, &#39;这个&#39;, &#39;一个&#39;, &#39;什么&#39;, &#39;电影&#39;, &#39;没有&#39;]
    # 设置词云的一些配置，如：字体，背景色，词云形状，大小,生成词云对象
    wc = WordCloud(mask=wc_mask,font_path=WC_FONT_PATH,  background_color=&quot;white&quot;, stopwords=stop_words, max_words=50, scale=4,
                   max_font_size=50, random_state=42)
    # 生成词云
    wc.generate(cut_word())

    # 在只设置mask的情况下,你将会得到一个拥有图片形状的词云
    # 开始画图
    plt.imshow(wc, interpolation=&quot;bilinear&quot;)
    # 为云图去掉坐标轴
    plt.axis(&quot;off&quot;)
    plt.figure()
    plt.show()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>matplotlib绘图</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from matplotlib import pyplot as plt
plt.rcParams[&#39;font.sans-serif&#39;]=[&#39;SimHei&#39;] #用来正常显示中文标签
plt.rcParams[&#39;axes.unicode_minus&#39;]=False #用来正常显示负号

def data_show():
    f = open(&#39;result.txt&#39;, &#39;r&#39;, encoding=&#39;UTF-8&#39;)
    list = f.readlines()
    sentimentslist = []
    for i in list:
        s = SnowNLP(i)
        sentimentslist.append(s.sentiments)
    print(sentimentslist)
    print(len(sentimentslist))
    plt.hist(sentimentslist, bins=10, facecolor=&#39;g&#39;)
    plt.xlabel(&#39;情感概率&#39;)
    plt.ylabel(&#39;数量&#39;)
    plt.title(&#39;情感分析&#39;)
    plt.show()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_3-完整代码" tabindex="-1"><a class="header-anchor" href="#_3-完整代码" aria-hidden="true">#</a> 3. 完整代码</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">from</span> lxml <span class="token keyword">import</span> etree
<span class="token keyword">import</span> time
<span class="token keyword">import</span> random
<span class="token keyword">import</span> jieba
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt
plt<span class="token punctuation">.</span>rcParams<span class="token punctuation">[</span><span class="token string">&#39;font.sans-serif&#39;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;SimHei&#39;</span><span class="token punctuation">]</span> <span class="token comment">#用来正常显示中文标签</span>
plt<span class="token punctuation">.</span>rcParams<span class="token punctuation">[</span><span class="token string">&#39;axes.unicode_minus&#39;</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token boolean">False</span> <span class="token comment">#用来正常显示负号</span>
<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud
<span class="token keyword">from</span> selenium <span class="token keyword">import</span> webdriver
<span class="token keyword">from</span> urllib<span class="token punctuation">.</span>parse <span class="token keyword">import</span> urlencode
<span class="token keyword">from</span> snownlp <span class="token keyword">import</span> SnowNLP

<span class="token keyword">import</span> io
<span class="token keyword">import</span> sys
sys<span class="token punctuation">.</span>stdout <span class="token operator">=</span> io<span class="token punctuation">.</span>TextIOWrapper<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span><span class="token builtin">buffer</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;gb18030&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding=&#39;utf8&#39;)</span>


<span class="token comment"># 设置词云路径</span>
WC_FONT_PATH <span class="token operator">=</span> <span class="token string">r&#39;C:\\Windows\\Fonts\\simfang.ttf&#39;</span>

session <span class="token operator">=</span> requests<span class="token punctuation">.</span>Session<span class="token punctuation">(</span><span class="token punctuation">)</span>
proxies<span class="token operator">=</span><span class="token punctuation">{</span>
        <span class="token string">&quot;http&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;http://218.95.37.252:3128&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;http&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;http://60.205.159.195:3128&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;User-Agent&quot;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0&#39;</span><span class="token punctuation">,</span>
               <span class="token string">&quot;Referer&quot;</span><span class="token punctuation">:</span><span class="token string">&#39;https://accounts.douban.com/passport/login&#39;</span>
           <span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    url <span class="token operator">=</span> <span class="token string">&quot;https://accounts.douban.com/j/mobile/login/basic&quot;</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;13616008640&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;password&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;zsz123456&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;remember&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;false&#39;</span>
    <span class="token punctuation">}</span>
    <span class="token comment"># 设置代理，从西刺免费代理网站上找出一个可用的代理IP</span>
    user <span class="token operator">=</span> session<span class="token punctuation">.</span>post<span class="token punctuation">(</span>url<span class="token operator">=</span>url<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">,</span> data<span class="token operator">=</span>data<span class="token punctuation">,</span> proxies<span class="token operator">=</span>proxies<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>text<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">spider_lianjie</span><span class="token punctuation">(</span>lianjie<span class="token punctuation">)</span><span class="token punctuation">:</span>
    page <span class="token operator">=</span> <span class="token number">0</span>
    f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;result.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a+&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>truncate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        comment_url <span class="token operator">=</span> lianjie<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">42</span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">&#39;comments&#39;</span>
        params <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&#39;start&#39;</span><span class="token punctuation">:</span>page<span class="token operator">*</span><span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token string">&#39;limit&#39;</span><span class="token punctuation">:</span><span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token string">&#39;sort&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;new_score&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;status&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;P&#39;</span>
        <span class="token punctuation">}</span>
        html <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token operator">=</span>comment_url<span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span> proxies<span class="token operator">=</span>proxies<span class="token punctuation">)</span>
        page <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;开始爬取第{0}页***********************************************************************：&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>page<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
        xpath_tree <span class="token operator">=</span> etree<span class="token punctuation">.</span>HTML<span class="token punctuation">(</span>html<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
        comment_divs <span class="token operator">=</span> xpath_tree<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;//*[@id=&quot;comments&quot;]/div&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>comment_divs<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">:</span>
            <span class="token comment"># 获取每一条评论的具体内容</span>
            <span class="token keyword">for</span> comment_div <span class="token keyword">in</span> comment_divs<span class="token punctuation">:</span>
                comment <span class="token operator">=</span> comment_div<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;./div[2]/p/span/text()&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>comment<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span>comment<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>comment<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token number">0.3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;大约共{0}页评论&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>page<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>


<span class="token keyword">def</span> <span class="token function">spider_id</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    page <span class="token operator">=</span> <span class="token number">0</span>
    f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;result.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a+&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>truncate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        move_url <span class="token operator">=</span> <span class="token string">&#39;https://movie.douban.com/subject/&#39;</span><span class="token operator">+</span><span class="token builtin">id</span><span class="token operator">+</span><span class="token string">&#39;/comments?&#39;</span>
        params <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&#39;start&#39;</span><span class="token punctuation">:</span>page<span class="token operator">*</span><span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token string">&#39;limit&#39;</span><span class="token punctuation">:</span><span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token string">&#39;sort&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;new_score&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;status&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;P&#39;</span>
        <span class="token punctuation">}</span>
        html <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token operator">=</span>move_url<span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span> proxies<span class="token operator">=</span>proxies<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
        page <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;开始爬取第{0}页***********************************************************************：&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>page<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
        xpath_tree <span class="token operator">=</span> etree<span class="token punctuation">.</span>HTML<span class="token punctuation">(</span>html<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
        comment_divs <span class="token operator">=</span> xpath_tree<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;//*[@id=&quot;comments&quot;]/div&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>comment_divs<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">:</span>
            <span class="token comment"># 获取每一条评论的具体内容</span>
            <span class="token keyword">for</span> comment_div <span class="token keyword">in</span> comment_divs<span class="token punctuation">:</span>
                comment <span class="token operator">=</span> comment_div<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;./div[2]/p/span/text()&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>comment<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span>comment<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>comment<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token number">0.3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;大约共{0}页评论&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>page<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>


<span class="token keyword">def</span> <span class="token function">spider_name</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    params <span class="token operator">=</span> urlencode<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;search_text&#39;</span><span class="token punctuation">:</span>name<span class="token punctuation">}</span><span class="token punctuation">)</span>
    move_url <span class="token operator">=</span> <span class="token string">&#39;https://movie.douban.com/subject_search&#39;</span>
    html <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token operator">=</span>move_url<span class="token punctuation">,</span>headers <span class="token operator">=</span> headers<span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span>proxies<span class="token operator">=</span>proxies<span class="token punctuation">)</span>
    <span class="token comment"># 利用selenium模拟浏览器，找到电影的url</span>
    drive <span class="token operator">=</span> webdriver<span class="token punctuation">.</span>Chrome<span class="token punctuation">(</span><span class="token punctuation">)</span>
    drive<span class="token punctuation">.</span>get<span class="token punctuation">(</span>html<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
    first_result <span class="token operator">=</span> drive<span class="token punctuation">.</span>find_element_by_xpath<span class="token punctuation">(</span><span class="token string">&#39;//*[@id=&quot;root&quot;]/div/div[2]/div[1]/div[1]/div[1]/div/div/div[1]/a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>get_attribute<span class="token punctuation">(</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">)</span>
    page <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment"># 每次写入前清空文件</span>
    f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;result.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a+&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span>html<span class="token punctuation">.</span>encoding<span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    f<span class="token punctuation">.</span>truncate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        move_url <span class="token operator">=</span> first_result<span class="token operator">+</span> <span class="token string">&#39;/comments?&#39;</span>
        params <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token string">&#39;start&#39;</span><span class="token punctuation">:</span> page <span class="token operator">*</span> <span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token string">&#39;limit&#39;</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
            <span class="token string">&#39;sort&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;new_score&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;status&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;P&#39;</span>
        <span class="token punctuation">}</span>
        html <span class="token operator">=</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token operator">=</span>move_url<span class="token punctuation">,</span> headers <span class="token operator">=</span> headers<span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span> proxies<span class="token operator">=</span>proxies<span class="token punctuation">)</span>
        page <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;开始爬取第{0}页***********************************************************************：&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>page<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>html<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
        xpath_tree <span class="token operator">=</span> etree<span class="token punctuation">.</span>HTML<span class="token punctuation">(</span>html<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
        comment_divs <span class="token operator">=</span> xpath_tree<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;//*[@id=&quot;comments&quot;]/div&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>comment_divs<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">:</span>
            <span class="token comment"># 获取每一条评论的具体内容</span>
            <span class="token keyword">for</span> comment_div <span class="token keyword">in</span> comment_divs<span class="token punctuation">:</span>
                comment <span class="token operator">=</span> comment_div<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;./div[2]/p/span/text()&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>comment<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span>comment<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
                    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>comment<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token number">0.3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;大约共{0}页评论&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>page <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>


<span class="token comment"># 定义搜索类型</span>
<span class="token keyword">def</span> <span class="token function">spider_kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    kind <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请选择搜索类型：1.根据电影链接 2.根据电影id 3.根据电影名：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> kind <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
        lianjie <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入电影链接:&quot;</span><span class="token punctuation">)</span>
        spider_lianjie<span class="token punctuation">(</span>lianjie<span class="token punctuation">)</span>
    <span class="token keyword">elif</span> kind <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token builtin">id</span> <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入电影id:&quot;</span><span class="token punctuation">)</span>
        spider_id<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> kind <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        name <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入电影名:&quot;</span><span class="token punctuation">)</span>
        spider_name<span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;sorry,输入错误！&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">cut_word</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;result.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
        <span class="token comment"># 读取文件里面的全部内容</span>
        comment_txt <span class="token operator">=</span> <span class="token builtin">file</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment"># 使用jieba进行分割</span>
        wordlist <span class="token operator">=</span> jieba<span class="token punctuation">.</span>cut<span class="token punctuation">(</span>comment_txt<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;***********&#39;</span><span class="token punctuation">,</span>wordlist<span class="token punctuation">)</span>
        wl <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>wordlist<span class="token punctuation">)</span>
        <span class="token comment"># print(wl)</span>
        <span class="token keyword">return</span> wl


<span class="token keyword">def</span> <span class="token function">create_word_cloud</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 设置词云形状图片,numpy+PIL方式读取图片</span>
    wc_mask <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;Emile.jpg&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 数据清洗词列表</span>
    stop_words <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;的&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;是&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;我&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;都&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;了&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;有&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;在&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;给&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;吗&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;和&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;就是&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;不是&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;但是&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;还是&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;只是&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;这样&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;这个&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;一个&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;什么&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;电影&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;没有&#39;</span><span class="token punctuation">]</span>
    <span class="token comment"># 设置词云的一些配置，如：字体，背景色，词云形状，大小,生成词云对象</span>
    wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>mask<span class="token operator">=</span>wc_mask<span class="token punctuation">,</span>font_path<span class="token operator">=</span>WC_FONT_PATH<span class="token punctuation">,</span>  background_color<span class="token operator">=</span><span class="token string">&quot;white&quot;</span><span class="token punctuation">,</span> stopwords<span class="token operator">=</span>stop_words<span class="token punctuation">,</span> max_words<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> scale<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">,</span>
                   max_font_size<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span>
    <span class="token comment"># 生成词云</span>
    wc<span class="token punctuation">.</span>generate<span class="token punctuation">(</span>cut_word<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment"># 在只设置mask的情况下,你将会得到一个拥有图片形状的词云</span>
    <span class="token comment"># 开始画图</span>
    plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wc<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&quot;bilinear&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># 为云图去掉坐标轴</span>
    plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">data_show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;result.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;UTF-8&#39;</span><span class="token punctuation">)</span>
    <span class="token builtin">list</span> <span class="token operator">=</span> f<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span>
    sentimentslist <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">list</span><span class="token punctuation">:</span>
        s <span class="token operator">=</span> SnowNLP<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        sentimentslist<span class="token punctuation">.</span>append<span class="token punctuation">(</span>s<span class="token punctuation">.</span>sentiments<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sentimentslist<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>sentimentslist<span class="token punctuation">)</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>hist<span class="token punctuation">(</span>sentimentslist<span class="token punctuation">,</span> bins<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span> facecolor<span class="token operator">=</span><span class="token string">&#39;g&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&#39;情感概率&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&#39;数量&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;情感分析&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    spider_kind<span class="token punctuation">(</span><span class="token punctuation">)</span>
    create_word_cloud<span class="token punctuation">(</span><span class="token punctuation">)</span>
    data_show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[e];function i(c,l){return s(),a("div",null,o)}const r=n(p,[["render",i],["__file","python-douban-rating.html.vue"]]);export{r as default};
