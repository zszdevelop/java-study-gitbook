import{_ as i,W as n,X as e,a0 as a}from"./framework-0cf5f349.js";const d={},s=a(`<h1 id="arraylist-的扩容机制" tabindex="-1"><a class="header-anchor" href="#arraylist-的扩容机制" aria-hidden="true">#</a> ArrayList 的扩容机制</h1><h2 id="_1-如何实现扩容" tabindex="-1"><a class="header-anchor" href="#_1-如何实现扩容" aria-hidden="true">#</a> 1.如何实现扩容</h2><p>底层主要是这三个私有方法配合实现<code>grow()</code>,<code>grow(int minCapacity)</code>,<code>newCapacity(int minCapacity)</code>扩容。<strong>最终是调用了<code>Arrays.copyOf</code>方法来进行扩充数组容量的</strong>。默认情况下，新的容量是<strong>原容量的1.5倍</strong>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 扩容一个
private Object[] grow() {
	return grow(size + 1);
}

// 保证扩容到期望容量minCapacity及以上
private Object[] grow(int minCapacity) {
    return elementData = Arrays.copyOf(elementData,
                                       newCapacity(minCapacity));
}

// 根据期望容量minCapacity计算实际需要扩容的容量
private int newCapacity(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length; // 得到旧容量
    int newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1); // 设置新容量为旧容量的1.5倍
    if (newCapacity - minCapacity &lt;= 0) { // 如果新容量仍然小于期望容量
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) // 如果是使用的默认容量
            return Math.max(DEFAULT_CAPACITY, minCapacity); // 取默认容量和期望容量较大值返回
        if (minCapacity &lt; 0) // overflow // 检查期望容量是否越界（int 的范围）
            throw new OutOfMemoryError();
        return minCapacity; // 返回期望容量
    }
    // 如果新容量大于期望容量，判断一下新容量是否越界
    return (newCapacity - MAX_ARRAY_SIZE &lt;= 0)
        ? newCapacity
        : hugeCapacity(minCapacity);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-手动扩容" tabindex="-1"><a class="header-anchor" href="#_2-手动扩容" aria-hidden="true">#</a> 2. 手动扩容</h2><p>grow方法主要用于实现自动扩容的，而用户也可以通过调用以下方法实现手动扩容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void ensureCapacity(int minCapacity) {
    if (minCapacity &gt; elementData.length
        &amp;&amp; !(elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
             &amp;&amp; minCapacity &lt;= DEFAULT_CAPACITY)) {
        modCount++;
        grow(minCapacity);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么需要手动扩容？试想一下，如果用户已经知道即将存入大量的元素，比如目前有20个元素，即将存入2000个。那这个时候使用自动扩容就会扩容多次。而手动扩容可以一次性扩容到2000，可以提高性能。</p>`,8),t=[s];function l(r,c){return n(),e("div",null,t)}const m=i(d,[["render",l],["__file","arraylist-expansion.html.vue"]]);export{m as default};
