import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as t,a as n,b as p,d as o,r as c}from"./app.8ac0b9e0.js";const l={},i=o(`<h1 id="collection-linkedlist\u6E90\u7801\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#collection-linkedlist\u6E90\u7801\u89E3\u6790" aria-hidden="true">#</a> Collection - LinkedList\u6E90\u7801\u89E3\u6790</h1><h2 id="_1-\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#_1-\u6982\u8FF0" aria-hidden="true">#</a> 1. \u6982\u8FF0</h2><p><em>LinkedList</em>\u540C\u65F6\u5B9E\u73B0\u4E86<em>List</em>\u63A5\u53E3\u548C<em>Deque</em>\u63A5\u53E3\uFF0C\u4E5F\u5C31\u662F\u8BF4\u5B83\u65E2\u53EF\u4EE5\u770B\u4F5C\u4E00\u4E2A\u987A\u5E8F\u5BB9\u5668\uFF0C\u53C8\u53EF\u4EE5\u770B\u4F5C\u4E00\u4E2A\u961F\u5217(<em>Queue</em>)\uFF0C\u540C\u65F6\u53C8\u53EF\u4EE5\u770B\u4F5C\u4E00\u4E2A\u6808(<em>Stack</em>)\u3002\u8FD9\u6837\u770B\u6765\uFF0C<em>LinkedList</em>\u7B80\u76F4\u5C31\u662F\u4E2A\u5168\u80FD\u51A0\u519B\u3002\u5F53\u4F60\u9700\u8981\u4F7F\u7528\u6808\u6216\u8005\u961F\u5217\u65F6\uFF0C\u53EF\u4EE5\u8003\u8651\u4F7F\u7528<em>LinkedList</em>\uFF0C\u4E00\u65B9\u9762\u662F\u56E0\u4E3AJava\u5B98\u65B9\u5DF2\u7ECF\u58F0\u660E\u4E0D\u5EFA\u8BAE\u4F7F\u7528<em>Stack</em>\u7C7B\uFF0C\u66F4\u9057\u61BE\u7684\u662F\uFF0CJava\u91CC\u6839\u672C\u6CA1\u6709\u4E00\u4E2A\u53EB\u505A<em>Queue</em>\u7684\u7C7B(\u5B83\u662F\u4E2A\u63A5\u53E3\u540D\u5B57)\u3002\u5173\u4E8E\u6808\u6216\u961F\u5217\uFF0C\u73B0\u5728\u7684\u9996\u9009\u662F<em>ArrayDeque</em>\uFF0C\u5B83\u6709\u7740\u6BD4<em>LinkedList</em>(\u5F53\u4F5C\u6808\u6216\u961F\u5217\u4F7F\u7528\u65F6)\u6709\u7740\u66F4\u597D\u7684\u6027\u80FD\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220816201947175.png" alt="image-20220816201947175" loading="lazy"></p><p><em>LinkedList</em>\u7684\u5B9E\u73B0\u65B9\u5F0F\u51B3\u5B9A\u4E86\u6240\u6709\u8DDF\u4E0B\u6807\u76F8\u5173\u7684\u64CD\u4F5C\u90FD\u662F\u7EBF\u6027\u65F6\u95F4\uFF0C\u800C\u5728\u9996\u6BB5\u6216\u8005\u672B\u5C3E\u5220\u9664\u5143\u7D20\u53EA\u9700\u8981\u5E38\u6570\u65F6\u95F4\u3002\u4E3A\u8FFD\u6C42\u6548\u7387<em>LinkedList</em>\u6CA1\u6709\u5B9E\u73B0\u540C\u6B65(synchronized)\uFF0C\u5982\u679C\u9700\u8981\u591A\u4E2A\u7EBF\u7A0B\u5E76\u53D1\u8BBF\u95EE\uFF0C\u53EF\u4EE5\u5148\u91C7\u7528<code>Collections.synchronizedList()</code>\u65B9\u6CD5\u5BF9\u5176\u8FDB\u884C\u5305\u88C5\u3002</p><h2 id="_2-linkedlists\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-linkedlists\u5B9E\u73B0" aria-hidden="true">#</a> 2. LinkedLists\u5B9E\u73B0</h2><h3 id="_2-1-\u5E95\u5C42\u6570\u636E\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#_2-1-\u5E95\u5C42\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a> 2.1 \u5E95\u5C42\u6570\u636E\u7ED3\u6784</h3><p><em>LinkedList</em>\u5E95\u5C42<strong>\u901A\u8FC7\u53CC\u5411\u94FE\u8868\u5B9E\u73B0</strong>\uFF0C\u672C\u8282\u5C06\u7740\u91CD\u8BB2\u89E3\u63D2\u5165\u548C\u5220\u9664\u5143\u7D20\u65F6\u53CC\u5411\u94FE\u8868\u7684\u7EF4\u62A4\u8FC7\u7A0B\uFF0C\u4E5F\u5373\u662F\u4E4B\u95F4\u89E3\u8DDF<em>List</em>\u63A5\u53E3\u76F8\u5173\u7684\u51FD\u6570\uFF0C\u800C\u5C06<em>Queue</em>\u548C<em>Stack</em>\u4EE5\u53CA<em>Deque</em>\u76F8\u5173\u7684\u77E5\u8BC6\u653E\u5728\u4E0B\u4E00\u8282\u8BB2\u3002\u53CC\u5411\u94FE\u8868\u7684\u6BCF\u4E2A\u8282\u70B9\u7528\u5185\u90E8\u7C7B<em>Node</em>\u8868\u793A\u3002<em>LinkedList</em>\u901A\u8FC7<code>first</code>\u548C<code>last</code>\u5F15\u7528\u5206\u522B\u6307\u5411\u94FE\u8868\u7684\u7B2C\u4E00\u4E2A\u548C\u6700\u540E\u4E00\u4E2A\u5143\u7D20\u3002\u6CE8\u610F\u8FD9\u91CC\u6CA1\u6709\u6240\u8C13\u7684\u54D1\u5143\uFF0C\u5F53\u94FE\u8868\u4E3A\u7A7A\u7684\u65F6\u5019<code>first</code>\u548C<code>last</code>\u90FD\u6307\u5411<code>null</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token keyword">transient</span> <span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Pointer to first node.
     * Invariant: (first == null &amp;&amp; last == null) ||
     *            (first.prev == null &amp;&amp; first.item != null)
     */</span>
    <span class="token keyword">transient</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> first<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Pointer to last node.
     * Invariant: (first == null &amp;&amp; last == null) ||
     *            (last.next == null &amp;&amp; last.item != null)
     */</span>
    <span class="token keyword">transient</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> last<span class="token punctuation">;</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2DNode\u662F\u79C1\u6709\u7684\u5185\u90E8\u7C7B:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
        <span class="token class-name">E</span> item<span class="token punctuation">;</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">;</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> prev<span class="token punctuation">;</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> prev<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>item <span class="token operator">=</span> element<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>prev <span class="token operator">=</span> prev<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-\u6784\u9020\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_2-2-\u6784\u9020\u51FD\u6570" aria-hidden="true">#</a> 2.2 \u6784\u9020\u51FD\u6570</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Constructs an empty list.
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">LinkedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Constructs a list containing the elements of the specified
     * collection, in the order they are returned by the collection&#39;s
     * iterator.
     *
     * <span class="token keyword">@param</span>  <span class="token parameter">c</span> the collection whose elements are to be placed into this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection is null
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">LinkedList</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">addAll</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-getfirst-getlast" tabindex="-1"><a class="header-anchor" href="#_2-3-getfirst-getlast" aria-hidden="true">#</a> 2.3 getFirst(), getLast()</h3><p>\u83B7\u53D6\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF0C \u548C\u83B7\u53D6\u6700\u540E\u4E00\u4E2A\u5143\u7D20:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Returns the first element in this list.
     *
     * <span class="token keyword">@return</span> the first element in this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> f<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Returns the last element in this list.
     *
     * <span class="token keyword">@return</span> the last element in this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">getLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> l<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-removefirst-removelast-remove-e-remove-index" tabindex="-1"><a class="header-anchor" href="#_2-4-removefirst-removelast-remove-e-remove-index" aria-hidden="true">#</a> 2.4 removeFirst(), removeLast(), remove(e), remove(index)</h3><p><code>remove()</code>\u65B9\u6CD5\u4E5F\u6709\u4E24\u4E2A\u7248\u672C\uFF0C\u4E00\u4E2A\u662F\u5220\u9664\u8DDF\u6307\u5B9A\u5143\u7D20\u76F8\u7B49\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20<code>remove(Object o)</code>\uFF0C\u53E6\u4E00\u4E2A\u662F\u5220\u9664\u6307\u5B9A\u4E0B\u6807\u5904\u7684\u5143\u7D20<code>remove(int index)</code>\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220816202508125.png" alt="image-20220816202508125" loading="lazy"></p><p>\u5220\u9664\u5143\u7D20 - \u6307\u7684\u662F\u5220\u9664\u7B2C\u4E00\u6B21\u51FA\u73B0\u7684\u8FD9\u4E2A\u5143\u7D20, \u5982\u679C\u6CA1\u6709\u8FD9\u4E2A\u5143\u7D20\uFF0C\u5219\u8FD4\u56DEfalse\uFF1B\u5224\u65AD\u7684\u4F9D\u636E\u662Fequals\u65B9\u6CD5\uFF0C \u5982\u679Cequals\uFF0C\u5219\u76F4\u63A5unlink\u8FD9\u4E2Anode\uFF1B\u7531\u4E8ELinkedList\u53EF\u5B58\u653Enull\u5143\u7D20\uFF0C\u6545\u4E5F\u53EF\u4EE5\u5220\u9664\u7B2C\u4E00\u6B21\u51FA\u73B0null\u7684\u5143\u7D20\uFF1B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Removes the first occurrence of the specified element from this list,
     * if it is present.  If this list does not contain the element, it is
     * unchanged.  More formally, removes the element with the lowest index
     * <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">i</span></span><span class="token punctuation">}</span> such that
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token punctuation">(</span>o<span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">?</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">:</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java">o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span>
     * (if such an element exists).  Returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if this list
     * contained the specified element (or equivalently, if this list
     * changed as a result of the call).
     *
     * <span class="token keyword">@param</span> <span class="token parameter">o</span> element to be removed from this list, if present
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if this list contained the specified element
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> first<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>item <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">unlink</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> first<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">unlink</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * Unlinks non-null node x.
     */</span>
    <span class="token class-name">E</span> <span class="token function">unlink</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// assert x != null;</span>
        <span class="token keyword">final</span> <span class="token class-name">E</span> element <span class="token operator">=</span> x<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> prev <span class="token operator">=</span> x<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>prev <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// \u7B2C\u4E00\u4E2A\u5143\u7D20</span>
            first <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            prev<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">// \u6700\u540E\u4E00\u4E2A\u5143\u7D20</span>
            last <span class="token operator">=</span> prev<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            next<span class="token punctuation">.</span>prev <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        x<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// GC</span>
        size<span class="token operator">--</span><span class="token punctuation">;</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> element<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>remove(int index)</code>\u4F7F\u7528\u7684\u662F\u4E0B\u6807\u8BA1\u6570\uFF0C \u53EA\u9700\u8981\u5224\u65AD\u8BE5index\u662F\u5426\u6709\u5143\u7D20\u5373\u53EF\uFF0C\u5982\u679C\u6709\u5219\u76F4\u63A5unlink\u8FD9\u4E2Anode\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Removes the element at the specified position in this list.  Shifts any
     * subsequent elements to the left (subtracts one from their indices).
     * Returns the element that was removed from the list.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> the index of the element to be removed
     * <span class="token keyword">@return</span> the element previously at the specified position
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkElementIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">unlink</span><span class="token punctuation">(</span><span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664head\u5143\u7D20:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Removes and returns the first element from this list.
     *
     * <span class="token keyword">@return</span> the first element from this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">unlinkFirst</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * Unlinks non-null first node f.
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">E</span> <span class="token function">unlinkFirst</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// assert f == first &amp;&amp; f != null;</span>
        <span class="token keyword">final</span> <span class="token class-name">E</span> element <span class="token operator">=</span> f<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next <span class="token operator">=</span> f<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        f<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        f<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// help GC</span>
        first <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            last <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            next<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        size<span class="token operator">--</span><span class="token punctuation">;</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> element<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664last\u5143\u7D20:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>	<span class="token doc-comment comment">/**
     * Removes and returns the last element from this list.
     *
     * <span class="token keyword">@return</span> the last element from this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">removeLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">unlinkLast</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * Unlinks non-null last node l.
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">E</span> <span class="token function">unlinkLast</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// assert l == last &amp;&amp; l != null;</span>
        <span class="token keyword">final</span> <span class="token class-name">E</span> element <span class="token operator">=</span> l<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> prev <span class="token operator">=</span> l<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>
        l<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        l<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// help GC</span>
        last <span class="token operator">=</span> prev<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prev <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            first <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            prev<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        size<span class="token operator">--</span><span class="token punctuation">;</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> element<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-add" tabindex="-1"><a class="header-anchor" href="#_2-5-add" aria-hidden="true">#</a> 2.5 add()</h3><p>*add()*\u65B9\u6CD5\u6709\u4E24\u4E2A\u7248\u672C\uFF0C\u4E00\u4E2A\u662F<code>add(E e)</code>\uFF0C\u8BE5\u65B9\u6CD5\u5728LinkedList\u7684\u672B\u5C3E\u63D2\u5165\u5143\u7D20\uFF0C\u56E0\u4E3A\u6709<code>last</code>\u6307\u5411\u94FE\u8868\u672B\u5C3E\uFF0C\u5728\u672B\u5C3E\u63D2\u5165\u5143\u7D20\u7684\u82B1\u8D39\u662F\u5E38\u6570\u65F6\u95F4\u3002\u53EA\u9700\u8981\u7B80\u5355\u4FEE\u6539\u51E0\u4E2A\u76F8\u5173\u5F15\u7528\u5373\u53EF\uFF1B\u53E6\u4E00\u4E2A\u662F<code>add(int index, E element)</code>\uFF0C\u8BE5\u65B9\u6CD5\u662F\u5728\u6307\u5B9A\u4E0B\u8868\u5904\u63D2\u5165\u5143\u7D20\uFF0C\u9700\u8981\u5148\u901A\u8FC7\u7EBF\u6027\u67E5\u627E\u627E\u5230\u5177\u4F53\u4F4D\u7F6E\uFF0C\u7136\u540E\u4FEE\u6539\u76F8\u5173\u5F15\u7528\u5B8C\u6210\u63D2\u5165\u64CD\u4F5C\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Appends the specified element to the end of this list.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>This method is equivalent to <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">addLast</span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> element to be appended to this list
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> (as specified by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Collection</span><span class="token punctuation">#</span><span class="token field">add</span></span><span class="token punctuation">}</span>)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">linkLast</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * Links e as last element.
     */</span>
    <span class="token keyword">void</span> <span class="token function">linkLast</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> e<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        last <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            first <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            l<span class="token punctuation">.</span>next <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
        size<span class="token operator">++</span><span class="token punctuation">;</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220816203107897.png" alt="image-20220816203107897" loading="lazy"></p><p><code>add(int index, E element)</code>, \u5F53index==size\u65F6\uFF0C\u7B49\u540C\u4E8Eadd(E e); \u5982\u679C\u4E0D\u662F\uFF0C\u5219\u5206\u4E24\u6B65: 1.\u5148\u6839\u636Eindex\u627E\u5230\u8981\u63D2\u5165\u7684\u4F4D\u7F6E,\u5373node(index)\u65B9\u6CD5\uFF1B2.\u4FEE\u6539\u5F15\u7528\uFF0C\u5B8C\u6210\u63D2\u5165\u64CD\u4F5C\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Inserts the specified element at the specified position in this list.
     * Shifts the element currently at that position (if any) and any
     * subsequent elements to the right (adds one to their indices).
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> index at which the specified element is to be inserted
     * <span class="token keyword">@param</span> <span class="token parameter">element</span> element to be inserted
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkPositionIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> size<span class="token punctuation">)</span>
            <span class="token function">linkLast</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token function">linkBefore</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> <span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\u7684<code>node(int index)</code>\u51FD\u6570\u6709\u4E00\u70B9\u5C0F\u5C0F\u7684trick\uFF0C\u56E0\u4E3A\u94FE\u8868\u53CC\u5411\u7684\uFF0C\u53EF\u4EE5\u4ECE\u5F00\u59CB\u5F80\u540E\u627E\uFF0C\u4E5F\u53EF\u4EE5\u4ECE\u7ED3\u5C3E\u5F80\u524D\u627E\uFF0C\u5177\u4F53\u671D\u90A3\u4E2A\u65B9\u5411\u627E\u53D6\u51B3\u4E8E\u6761\u4EF6<code>index &lt; (size &gt;&gt; 1)</code>\uFF0C\u4E5F\u5373\u662Findex\u662F\u9760\u8FD1\u524D\u7AEF\u8FD8\u662F\u540E\u7AEF\u3002\u4ECE\u8FD9\u91CC\u4E5F\u53EF\u4EE5\u770B\u51FA\uFF0ClinkedList\u901A\u8FC7index\u68C0\u7D22\u5143\u7D20\u7684\u6548\u7387\u6CA1\u6709arrayList\u9AD8\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Returns the (non-null) Node at the specified element index.
     */</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">node</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// assert isElementIndex(index);</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token punctuation">(</span>size <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> first<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> index<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                x <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> last<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> index<span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
                x <span class="token operator">=</span> x<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-addall" tabindex="-1"><a class="header-anchor" href="#_2-6-addall" aria-hidden="true">#</a> 2.6 addAll()</h3><p>addAll(index, c) \u5B9E\u73B0\u65B9\u5F0F\u5E76\u4E0D\u662F\u76F4\u63A5\u8C03\u7528add(index,e)\u6765\u5B9E\u73B0\uFF0C\u4E3B\u8981\u662F\u56E0\u4E3A\u6548\u7387\u7684\u95EE\u9898\uFF0C\u53E6\u4E00\u4E2A\u662Ffail-fast\u4E2DmodCount\u53EA\u4F1A\u589E\u52A01\u6B21\uFF1B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Appends all of the elements in the specified collection to the end of
     * this list, in the order that they are returned by the specified
     * collection&#39;s iterator.  The behavior of this operation is undefined if
     * the specified collection is modified while the operation is in
     * progress.  (Note that this will occur if the specified collection is
     * this list, and it&#39;s nonempty.)
     *
     * <span class="token keyword">@param</span> <span class="token parameter">c</span> collection containing elements to be added to this list
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if this list changed as a result of the call
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection is null
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">addAll</span><span class="token punctuation">(</span>size<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Inserts all of the elements in the specified collection into this
     * list, starting at the specified position.  Shifts the element
     * currently at that position (if any) and any subsequent elements to
     * the right (increases their indices).  The new elements will appear
     * in the list in the order that they are returned by the
     * specified collection&#39;s iterator.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> index at which to insert the first element
     *              from the specified collection
     * <span class="token keyword">@param</span> <span class="token parameter">c</span> collection containing elements to be added to this list
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if this list changed as a result of the call
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection is null
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkPositionIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> numNew <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>numNew <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> pred<span class="token punctuation">,</span> succ<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            succ <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            pred <span class="token operator">=</span> last<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            succ <span class="token operator">=</span> <span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            pred <span class="token operator">=</span> succ<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> o <span class="token operator">:</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span> <span class="token class-name">E</span> e <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">E</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>pred<span class="token punctuation">,</span> e<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pred <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                first <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                pred<span class="token punctuation">.</span>next <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
            pred <span class="token operator">=</span> newNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>succ <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            last <span class="token operator">=</span> pred<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            pred<span class="token punctuation">.</span>next <span class="token operator">=</span> succ<span class="token punctuation">;</span>
            succ<span class="token punctuation">.</span>prev <span class="token operator">=</span> pred<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        size <span class="token operator">+=</span> numNew<span class="token punctuation">;</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-clear" tabindex="-1"><a class="header-anchor" href="#_2-7-clear" aria-hidden="true">#</a> 2.7 clear()</h3><p>\u4E3A\u4E86\u8BA9GC\u66F4\u5FEB\u53EF\u4EE5\u56DE\u6536\u653E\u7F6E\u7684\u5143\u7D20\uFF0C\u9700\u8981\u5C06node\u4E4B\u95F4\u7684\u5F15\u7528\u5173\u7CFB\u8D4B\u7A7A\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Removes all of the elements from this list.
     * The list will be empty after this call returns.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Clearing all of the links between nodes is &quot;unnecessary&quot;, but:</span>
        <span class="token comment">// - helps a generational GC if the discarded nodes inhabit</span>
        <span class="token comment">//   more than one generation</span>
        <span class="token comment">// - is sure to free memory even if there is a reachable Iterator</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> first<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>item <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            x<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            x <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        first <span class="token operator">=</span> last <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8-positional-access-\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-8-positional-access-\u65B9\u6CD5" aria-hidden="true">#</a> 2.8 Positional Access \u65B9\u6CD5</h3><p>\u901A\u8FC7index\u83B7\u53D6\u5143\u7D20</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Returns the element at the specified position in this list.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> index of the element to return
     * <span class="token keyword">@return</span> the element at the specified position in this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkElementIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u67D0\u4E2A\u4F4D\u7F6E\u7684\u5143\u7D20\u91CD\u65B0\u8D4B\u503C:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Replaces the element at the specified position in this list with the
     * specified element.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> index of the element to replace
     * <span class="token keyword">@param</span> <span class="token parameter">element</span> element to be stored at the specified position
     * <span class="token keyword">@return</span> the element previously at the specified position
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkElementIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> <span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">E</span> oldVal <span class="token operator">=</span> x<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
        x<span class="token punctuation">.</span>item <span class="token operator">=</span> element<span class="token punctuation">;</span>
        <span class="token keyword">return</span> oldVal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u5143\u7D20\u63D2\u5165\u5230\u6307\u5B9Aindex\u4F4D\u7F6E:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Inserts the specified element at the specified position in this list.
     * Shifts the element currently at that position (if any) and any
     * subsequent elements to the right (adds one to their indices).
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> index at which the specified element is to be inserted
     * <span class="token keyword">@param</span> <span class="token parameter">element</span> element to be inserted
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkPositionIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> size<span class="token punctuation">)</span>
            <span class="token function">linkLast</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token function">linkBefore</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> <span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664\u6307\u5B9A\u4F4D\u7F6E\u7684\u5143\u7D20:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Removes the element at the specified position in this list.  Shifts any
     * subsequent elements to the left (subtracts one from their indices).
     * Returns the element that was removed from the list.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> the index of the element to be removed
     * <span class="token keyword">@return</span> the element previously at the specified position
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkElementIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">unlink</span><span class="token punctuation">(</span><span class="token function">node</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u5B83\u4F4D\u7F6E\u7684\u65B9\u6CD5:</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Tells if the argument is the index of an existing element.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isElementIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> index <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Tells if the argument is the index of a valid position for an
     * iterator or an add operation.
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isPositionIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> index <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;=</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Constructs an IndexOutOfBoundsException detail message.
     * Of the many possible refactorings of the error handling code,
     * this &quot;outlining&quot; performs best with both server and client VMs.
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> <span class="token function">outOfBoundsMsg</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Index: &quot;</span><span class="token operator">+</span>index<span class="token operator">+</span><span class="token string">&quot;, Size: &quot;</span><span class="token operator">+</span>size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">checkElementIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isElementIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IndexOutOfBoundsException</span><span class="token punctuation">(</span><span class="token function">outOfBoundsMsg</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">checkPositionIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isPositionIndex</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IndexOutOfBoundsException</span><span class="token punctuation">(</span><span class="token function">outOfBoundsMsg</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-\u67E5\u627E\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_2-9-\u67E5\u627E\u64CD\u4F5C" aria-hidden="true">#</a> 2.9 \u67E5\u627E\u64CD\u4F5C</h3><p>\u67E5\u627E\u64CD\u4F5C\u7684\u672C\u8D28\u662F\u67E5\u627E\u5143\u7D20\u7684\u4E0B\u6807:</p><p>\u67E5\u627E\u7B2C\u4E00\u6B21\u51FA\u73B0\u7684index, \u5982\u679C\u627E\u4E0D\u5230\u8FD4\u56DE-1\uFF1B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Returns the index of the first occurrence of the specified element
     * in this list, or -1 if this list does not contain the element.
     * More formally, returns the lowest index <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">i</span></span><span class="token punctuation">}</span> such that
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token punctuation">(</span>o<span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">?</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">:</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java">o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span>,
     * or -1 if there is no such index.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">o</span> element to search for
     * <span class="token keyword">@return</span> the index of the first occurrence of the specified element in
     *         this list, or -1 if this list does not contain the element
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> first<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>item <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> index<span class="token punctuation">;</span>
                index<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> first<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> index<span class="token punctuation">;</span>
                index<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u6700\u540E\u4E00\u6B21\u51FA\u73B0\u7684index, \u5982\u679C\u627E\u4E0D\u5230\u8FD4\u56DE-1\uFF1B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Returns the index of the last occurrence of the specified element
     * in this list, or -1 if this list does not contain the element.
     * More formally, returns the highest index <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">i</span></span><span class="token punctuation">}</span> such that
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token punctuation">(</span>o<span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">?</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">:</span></span><span class="token entity named-entity" title="\xA0">&amp;nbsp;</span><span class="token code language-java">o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">&gt;</span></span>,
     * or -1 if there is no such index.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">o</span> element to search for
     * <span class="token keyword">@return</span> the index of the last occurrence of the specified element in
     *         this list, or -1 if this list does not contain the element
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> size<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> last<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>prev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                index<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>item <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> index<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> last<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>prev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                index<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> index<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-queue-\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-10-queue-\u65B9\u6CD5" aria-hidden="true">#</a> 2.10 Queue \u65B9\u6CD5</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Retrieves, but does not remove, the head (first element) of this list.
     *
     * <span class="token keyword">@return</span> the head of this list, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if this list is empty
     * <span class="token keyword">@since</span> 1.5
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> f<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves, but does not remove, the head (first element) of this list.
     *
     * <span class="token keyword">@return</span> the head of this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     * <span class="token keyword">@since</span> 1.5
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">element</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves and removes the head (first element) of this list.
     *
     * <span class="token keyword">@return</span> the head of this list, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if this list is empty
     * <span class="token keyword">@since</span> 1.5
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token function">unlinkFirst</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves and removes the head (first element) of this list.
     *
     * <span class="token keyword">@return</span> the head of this list
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     * <span class="token keyword">@since</span> 1.5
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Adds the specified element as the tail (last element) of this list.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> the element to add
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> (as specified by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Queue</span><span class="token punctuation">#</span><span class="token field">offer</span></span><span class="token punctuation">}</span>)
     * <span class="token keyword">@since</span> 1.5
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">offer</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11-deque-\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-11-deque-\u65B9\u6CD5" aria-hidden="true">#</a> 2.11 Deque \u65B9\u6CD5</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * Inserts the specified element at the front of this list.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> the element to insert
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> (as specified by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Deque</span><span class="token punctuation">#</span><span class="token field">offerFirst</span></span><span class="token punctuation">}</span>)
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">offerFirst</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">addFirst</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Inserts the specified element at the end of this list.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> the element to insert
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> (as specified by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Deque</span><span class="token punctuation">#</span><span class="token field">offerLast</span></span><span class="token punctuation">}</span>)
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">offerLast</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">addLast</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves, but does not remove, the first element of this list,
     * or returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if this list is empty.
     *
     * <span class="token keyword">@return</span> the first element of this list, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>
     *         if this list is empty
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">peekFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> f<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
     <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves, but does not remove, the last element of this list,
     * or returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if this list is empty.
     *
     * <span class="token keyword">@return</span> the last element of this list, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>
     *         if this list is empty
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">peekLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> l<span class="token punctuation">.</span>item<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves and removes the first element of this list,
     * or returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if this list is empty.
     *
     * <span class="token keyword">@return</span> the first element of this list, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if
     *     this list is empty
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">pollFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> f <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>f <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token function">unlinkFirst</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Retrieves and removes the last element of this list,
     * or returns <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if this list is empty.
     *
     * <span class="token keyword">@return</span> the last element of this list, or <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span> if
     *     this list is empty
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">pollLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> l <span class="token operator">=</span> last<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token function">unlinkLast</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Pushes an element onto the stack represented by this list.  In other
     * words, inserts the element at the front of this list.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>This method is equivalent to <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token field">addFirst</span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> the element to push
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">addFirst</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Pops an element from the stack represented by this list.  In other
     * words, removes and returns the first element of this list.
     *
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>This method is equivalent to <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>.
     *
     * <span class="token keyword">@return</span> the element at the front of this list (which is the top
     *         of the stack represented by this list)
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NoSuchElementException</span></span> if this list is empty
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Removes the first occurrence of the specified element in this
     * list (when traversing the list from head to tail).  If the list
     * does not contain the element, it is unchanged.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">o</span> element to be removed from this list, if present
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if the list contained the specified element
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">removeFirstOccurrence</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">remove</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Removes the last occurrence of the specified element in this
     * list (when traversing the list from head to tail).  If the list
     * does not contain the element, it is unchanged.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">o</span> element to be removed from this list, if present
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if the list contained the specified element
     * <span class="token keyword">@since</span> 1.6
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">removeLastOccurrence</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> last<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>prev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>item <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">unlink</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> x <span class="token operator">=</span> last<span class="token punctuation">;</span> x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> x <span class="token operator">=</span> x<span class="token punctuation">.</span>prev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">unlink</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,63),u={href:"https://pdai.tech/md/java/collection/java-collection-LinkedList.html",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"Collection - LinkedList\u6E90\u7801\u89E3\u6790",-1);function k(r,v){const s=c("ExternalLinkIcon");return e(),t("div",null,[i,n("p",null,[n("a",u,[d,p(s)])])])}const h=a(l,[["render",k],["__file","java-collection-LinkedList.html.vue"]]);export{h as default};
