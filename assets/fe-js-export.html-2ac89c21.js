import{_ as i,W as o,X as n,Y as e,Z as s,$ as r,a0 as a,D as l}from"./framework-0cf5f349.js";const t={},c=a(`<h1 id="js导出-exports、module-exports-和-export、export-default" tabindex="-1"><a class="header-anchor" href="#js导出-exports、module-exports-和-export、export-default" aria-hidden="true">#</a> js导出：exports、module.exports 和 export、export default</h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1. 前言</h2><p>js导入导出有多种方式，新手常常被绕得晕头转向</p><p>它们的使用范围</p><ul><li><p><code>require</code>: node 支持的引入</p></li><li><p><code>module.exports / exports</code>: 只有 node 支持的导出</p></li><li><p><code>export / import</code> : 只有es6 支持的导出引入\`</p></li></ul><blockquote><p>我们大部分在vue中使用的是es6 <code>export / import</code> 的导入导出，</p><p>如导出api:</p><p>​ let api{</p><p>​ // 网络请求</p><p>​ }</p><p>export default api;</p><p>导入：</p><p>import api from &#39;../api/myapi&#39;;</p></blockquote><h2 id="_2-node模块" tabindex="-1"><a class="header-anchor" href="#_2-node模块" aria-hidden="true">#</a> 2.node模块</h2><p><code>Node</code>里面的模块系统遵循的是<code>CommonJS</code>规范。 那问题又来了，什么是<code>CommonJS</code>规范呢？ 由于<code>js</code>以前比较混乱，各写各的代码，没有一个模块的概念，而这个规范出来其实就是对模块的一个定义。</p><blockquote><p><code>CommonJS</code>定义的模块分为: 模块标识(<code>module</code>)、模块定义(<code>exports</code>) 、模块引用(<code>require</code>)</p></blockquote><p>先解释 <code>exports</code> 和 <code>module.exports</code> 在一个node执行一个文件时，会给这个文件内生成一个 <code>exports</code>和<code>module</code>对象， 而<code>module</code>又有一个<code>exports</code>属性。他们之间的关系如下图，都指向一块{}内存区域。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>exports = module.exports = {};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210207165709128.png" alt="image-20210207165709128" tabindex="0" loading="lazy"><figcaption>image-20210207165709128</figcaption></figure><p>那下面我们来看看代码的吧。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//utils.js
let a = 100;
console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}

exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}

exports = &#39;指向其他内存区&#39;; //这里把exports的指向指走

//test.js

var a = require(&#39;/utils&#39;);
console.log(a) // 打印为 {a : 200} 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>从上面可以看出，其实<code>require</code>导出的内容是<code>module.exports</code>的指向的内存块内容，并不是<code>exports</code>的。 简而言之，<strong>区分他们之间的区别就是 <code>exports</code> 只是 <code>module.exports</code>的引用，辅助后者添加内容用的</strong>。</p></blockquote><p>用白话讲就是，<code>exports</code>只辅助<code>module.exports</code>操作内存中的数据，辛辛苦苦各种操作数据完，累得要死，结果到最后真正被<code>require</code>出去的内容还是<code>module.exports</code>的，真是好苦逼啊。</p><p>其实大家用内存块的概念去理解，就会很清楚了。</p><p>然后呢，为了避免糊涂，<strong>尽量都用 <code>module.exports</code> 导出，然后用<code>require</code>导入。</strong></p><h2 id="_3-es中的模块导出导入" tabindex="-1"><a class="header-anchor" href="#_3-es中的模块导出导入" aria-hidden="true">#</a> 3. ES中的模块导出导入</h2><p>在es中的模块，就非常清晰了。不过也有一些细节的东西需要搞清楚。 比如 <code>export</code> 和 <code>export default</code>，还有 导入的时候，<code>import a from ..</code>,<code>import {a} from ..</code>，总之也有点乱，那么下面我们就开始把它们捋清楚吧。</p><h3 id="_3-1-export-和-export-default" tabindex="-1"><a class="header-anchor" href="#_3-1-export-和-export-default" aria-hidden="true">#</a> 3.1 export 和 export default</h3><p>首先我们讲这两个导出，下面我们讲讲它们的区别</p><ol><li>export与export default均可用于导出常量、函数、文件、模块等</li><li>在一个文件或模块中，export、import可以有多个，export default仅有一个</li><li>通过export方式导出，在导入时要加{ }，export default则不需要</li><li>export能直接导出变量表达式，export default不行。</li></ol><p>下面咱们看看代码去验证一下</p><h3 id="_3-2-es6导出验证" tabindex="-1"><a class="header-anchor" href="#_3-2-es6导出验证" aria-hidden="true">#</a> 3.2 ES6导出验证</h3><h4 id="testes6export-js" tabindex="-1"><a class="header-anchor" href="#testes6export-js" aria-hidden="true">#</a> testEs6Export.js</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;use strict&#39;
//导出变量
export const a = &#39;100&#39;;  

 //导出方法
export const dogSay = function(){ 
    console.log(&#39;wang wang&#39;);
}

 //导出方法第二种
function catSay(){
   console.log(&#39;miao miao&#39;); 
}
export { catSay };

//export default导出
const m = 100;
export default m; 
//export defult const m = 100;// 这里不能写这种格式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-es6导入验证" tabindex="-1"><a class="header-anchor" href="#_3-3-es6导入验证" aria-hidden="true">#</a> 3.3 ES6导入验证</h3><h4 id="index-js" tabindex="-1"><a class="header-anchor" href="#index-js" aria-hidden="true">#</a> index.js</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//index.js
&#39;use strict&#39;
var express = require(&#39;express&#39;);
var router = express.Router();

import { dogSay, catSay } from &#39;./testEs6Export&#39;; //导出了 export 方法 
import m from &#39;./testEs6Export&#39;;  //导出了 export default 

import * as testModule from &#39;./testEs6Export&#39;;//as 集合成对象导出



/* GET home page. */
router.get(&#39;/&#39;, function(req, res, next) {
  dogSay();
  catSay();
  console.log(m);
  testModule.dogSay();
  console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
  console.log(testModule.default); // 100
  res.send(&#39;恭喜你，成功验证&#39;);
});

module.exports = router;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以看出，确实感觉 <code>ES6</code>的模块系统非常灵活的。</p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,32),u={href:"https://juejin.im/post/6844903489257095181",target:"_blank",rel:"noopener noreferrer"};function p(v,m){const d=l("ExternalLinkIcon");return o(),n("div",null,[c,e("p",null,[e("a",u,[s("exports、module.exports 和 export、export default 到底是咋回事"),r(d)])])])}const b=i(t,[["render",p],["__file","fe-js-export.html.vue"]]);export{b as default};
