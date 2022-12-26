import{_ as n,W as s,X as e,a0 as a}from"./framework-0cf5f349.js";const i={},l=a(`<h1 id="sort排序命令" tabindex="-1"><a class="header-anchor" href="#sort排序命令" aria-hidden="true">#</a> sort排序命令</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1 简介</h2><p>sort命令是帮我们依据不同的数据类型进行排序</p><blockquote><p>sort可针对文本文件的内容，以行为单位来排序。</p></blockquote><h2 id="_2-语法" tabindex="-1"><a class="header-anchor" href="#_2-语法" aria-hidden="true">#</a> 2 语法</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sort [-bcfMnrtk][源文件][-o 输出文件] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-参数" tabindex="-1"><a class="header-anchor" href="#_3-参数" aria-hidden="true">#</a> 3 参数</h2><ul><li>-b 忽略每行前面开始出的空格字符。</li><li>-c 检查文件是否已经按照顺序排序。</li><li>-f 排序时，忽略大小写字母。</li><li>-M 将前面3个字母依照月份的缩写进行排序。</li><li>-n 依照数值的大小排序。</li><li>-o&lt;输出文件&gt; 将排序后的结果存入指定的文件。</li><li>-r 以相反的顺序来排序。</li><li>-t&lt;分隔字符&gt; 指定排序时所用的栏位分隔字符。</li><li>-k 选择以哪个区间进行排序。</li></ul><h2 id="_4-示例" tabindex="-1"><a class="header-anchor" href="#_4-示例" aria-hidden="true">#</a> 4 示例</h2><h3 id="_4-1-示例1" tabindex="-1"><a class="header-anchor" href="#_4-1-示例1" aria-hidden="true">#</a> 4.1 示例1</h3><p>sort将文件的每一行作为一个单位，相互比较，比较原则是从首字符向后，依次按ASCII码值进行比较，最后将他们按升序输出。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> seq.txt
banana
apple
pear
orange
$ <span class="token function">sort</span> seq.txt
apple
banana
orange
pear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户可以保存排序后的文件内容，或把排序后的文件内容输出至打印机。下例中用户把排序后的文件内容保存到名为result的文件中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sort</span> seq.txt <span class="token operator">&gt;</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-示例2-sort的-u选项" tabindex="-1"><a class="header-anchor" href="#_4-2-示例2-sort的-u选项" aria-hidden="true">#</a> 4.2 示例2:sort的-u选项</h3><p>它的作用很简单，就是在输出行中去除重复行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> seq.txt
banana
apple
pear
orange
pear
$ <span class="token function">sort</span> seq.txt
apple
banana
orange
pear
pear
$ <span class="token function">sort</span> <span class="token parameter variable">-u</span> seq.txt
apple
banana
orange
pear
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pear由于重复被-u选项无情的删除了。</p><h3 id="_4-3-示例3-sort的-r选项" tabindex="-1"><a class="header-anchor" href="#_4-3-示例3-sort的-r选项" aria-hidden="true">#</a> 4.3 示例3：sort的-r选项</h3><p>sort默认的排序方式是升序，如果想改成降序，就加个-r就搞定了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> number.txt
<span class="token number">1</span>
<span class="token number">3</span>
<span class="token number">5</span>
<span class="token number">2</span>
<span class="token number">4</span>
$ <span class="token function">sort</span> number.txt
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
<span class="token number">5</span>
$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt
<span class="token number">5</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-示例4-sort的-o选项" tabindex="-1"><a class="header-anchor" href="#_4-4-示例4-sort的-o选项" aria-hidden="true">#</a> 4.4 示例4：sort的-o选项</h3><p>由于sort默认是把结果输出到标准输出，所以需要用重定向才能将结果写入文件，形如sort filename &gt; newfile。</p><p>但是，如果你想把排序结果输出到原文件中，用重定向可就不行了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt <span class="token operator">&gt;</span> number.txt
$ <span class="token function">cat</span> number.txt
$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看，竟然将number清空了。就在这个时候，-o选项出现了，它成功的解决了这个问题，让你放心的将结果写入原文件。这或许也是-o比重定向的唯一优势所在。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> number.txt
<span class="token number">1</span>
<span class="token number">3</span>
<span class="token number">5</span>
<span class="token number">2</span>
<span class="token number">4</span>
$ <span class="token function">sort</span> <span class="token parameter variable">-r</span> number.txt <span class="token parameter variable">-o</span> number.txt
$ <span class="token function">cat</span> number.txt
<span class="token number">5</span>
<span class="token number">4</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-示例5-sort的-n选项" tabindex="-1"><a class="header-anchor" href="#_4-5-示例5-sort的-n选项" aria-hidden="true">#</a> 4.5 示例5：sort的-n选项</h3><p>你有没有遇到过10比2小的情况。我反正遇到过。出现这种情况是由于排序程序将这些数字按字符来排序了，排序程序会先比较1和2，显然1小，所以就将10放在2前面喽。这也是sort的一贯作风。我们如果想改变这种现状，就要使用-n选项，来告诉sort，“要以数值来排序”！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> number.txt
<span class="token number">1</span>
<span class="token number">10</span>
<span class="token number">19</span>
<span class="token number">11</span>
<span class="token number">2</span>
<span class="token number">5</span>
$ <span class="token function">sort</span> number.txt
<span class="token number">1</span>
<span class="token number">10</span>
<span class="token number">11</span>
<span class="token number">19</span>
<span class="token number">2</span>
<span class="token number">5</span>
$ <span class="token function">sort</span> <span class="token parameter variable">-n</span> number.txt
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">5</span>
<span class="token number">10</span>
<span class="token number">11</span>
<span class="token number">19</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-示例6-sort的-t选项和-k选项" tabindex="-1"><a class="header-anchor" href="#_4-6-示例6-sort的-t选项和-k选项" aria-hidden="true">#</a> 4.6 示例6： sort的-t选项和-k选项</h3><p>如果有一个文件的内容是这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat facebook.txt
banana:30:5.5
apple:10:2.5
pear:90:2.3
orange:20:3.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件有三列，列与列之间用冒号隔开了，第一列表示水果类型，第二列表示水果数量，第三列表示水果价格。那么我想以水果数量来排序，也就是以第二列来排序，如何利用sort实现？幸好，sort提供了-t选项，后面可以设定间隔符。指定了间隔符之后，就可以用-k来指定列数了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ sort -n -k 2 -t ‘:’ facebook.txt
apple:10:2.5
orange:20:3.4
banana:30:5.5
pear:90:2.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-其他的sort常用选项" tabindex="-1"><a class="header-anchor" href="#_5-其他的sort常用选项" aria-hidden="true">#</a> 5 其他的sort常用选项</h2><ul><li>-f 会将小写字母都转换为大写字母来进行比较，亦即忽略大小写</li><li>-c 会检查文件是否已排好序，如果乱序，则输出第一个乱序的行的相关信息，最后返回1</li><li>-C 会检查文件是否已排好序，如果乱序，不输出内容，仅返回1</li><li>-M 会以月份来排序，比如JAN小于FEB等等</li><li>-b 会忽略每一行前面的所有空白部分，从第一个可见字符开始比较。</li></ul>`,37),r=[l];function d(t,c){return s(),e("div",null,r)}const v=n(i,[["render",d],["__file","linux-k-sort.html.vue"]]);export{v as default};
