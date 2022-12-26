import{_ as a,W as e,X as i,a0 as s}from"./framework-0cf5f349.js";const p={},t=s(`<h1 id="hashmap相关问题" tabindex="-1"><a class="header-anchor" href="#hashmap相关问题" aria-hidden="true">#</a> HashMap相关问题</h1><h2 id="_1-hashmap中相关概念" tabindex="-1"><a class="header-anchor" href="#_1-hashmap中相关概念" aria-hidden="true">#</a> 1. HashMap中相关概念</h2><ul><li><p>size：</p><p>表示HashMap中存放KV数量（为链表和树中的KV的总和）</p></li><li><p>capacity（容量）</p><p>capacity就是指HashMap中桶的数量，默认值为16，<strong>容量都是2的幂</strong></p></li><li><p>loadFactor（装载因子）</p><p>装载因子用来衡量HashMap满的程度，loadFactor的默认值为0.75f。计算HashMap的实时装载因子的方法为：size/capacity，而不是占用桶的数量去除以capacity。</p></li><li><p>threshold：</p><p>表示当HashMap的size大于threshold时会执行resize操作。</p></li></ul><h2 id="_2-假如我们需要存500个数需要多大的hashmap" tabindex="-1"><a class="header-anchor" href="#_2-假如我们需要存500个数需要多大的hashmap" aria-hidden="true">#</a> 2. 假如我们需要存500个数需要多大的HashMap?</h2><ul><li><p>HashMap 默认的初始化大小为16，之后每次扩充，变为原来的2倍</p><p>需要存储500个数，那么至少512个的容量。</p></li><li><p>又因为HashMap每次put操作都会检查一遍size（当前容量）&gt; initailCapacity*loadFactor。</p><ul><li><p>默认的负载因子为0.75</p><p>500已经大于512*0.75=384，<strong>所以还需要自动扩容到1024</strong></p></li><li><p>更改负载因子为1</p><p>那么只需要512个空间</p></li></ul></li></ul><p>PS: 特殊情况HashMap的数还有可能都打在一个槽上，我们这里以每个都不一样为例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   @Test
    public void test02() throws Exception {
        HashMap&lt;Object,Object&gt; map = new HashMap&lt;&gt;();
        for (int i = 0;i&lt;500;i++){
            map.put(i,i);
        }
        // 通过反射获取容量变量capacity,并调用map对象
        Method capacity = map.getClass().getDeclaredMethod(&quot;capacity&quot;);
        capacity.setAccessible(true);
        Integer realCapacity = (Integer) capacity.invoke(map);
        // HashMap插入500个数，实际容量为1024
        System.out.println(&quot;HashMap插入500个数，实际容量为&quot; + realCapacity);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-hashmap的负载因子" tabindex="-1"><a class="header-anchor" href="#_3-hashmap的负载因子" aria-hidden="true">#</a> 3. HashMap的负载因子</h2><p>HashMap默认的负载因子为0.75</p>`,9),l=[t];function n(h,c){return e(),i("div",null,l)}const r=a(p,[["render",n],["__file","hashmap-problem.html.vue"]]);export{r as default};
