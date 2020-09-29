# markdown-it-disable-url-encode
Forced decoding image src for non-ascii chars

[![Build Status](https://travis-ci.org/nanyuantingfeng/markdown-it-disable-url-encode.svg?branch=master)](https://travis-ci.org/nanyuantingfeng/markdown-it-disable-url-encode)
[![Coverage Status](https://coveralls.io/repos/github/nanyuantingfeng/markdown-it-disable-url-encode/badge.svg?branch=master)](https://coveralls.io/github/nanyuantingfeng/markdown-it-disable-url-encode?branch=master)
[![GitHub repo size](https://img.shields.io/github/repo-size/nanyuantingfeng/markdown-it-disable-url-encode)](https://img.shields.io/github/repo-size/nanyuantingfeng/markdown-it-disable-url-encode)



#### Getting Started

```shell
npm install --save-dev markdown-it-disable-url-encode
```



#### Usage

```js 
  const md = require("markdown-it")();  
  md.use(require("markdown-it-disable-url-encode"), "./")
  // md.use(require("markdown-it-disable-url-encode"), "*")
  // md.use(require("markdown-it-disable-url-encode"), ".")
  // md.use(require("markdown-it-disable-url-encode"), [...])
  // md.use(require("markdown-it-disable-url-encode"), /.../)        


  const html = md.render("![image.png](图片/image.png)")
  // <p><img src="./图片/image.png" alt="image.png" /></p> 
 
  // without markdown-it-disable-url-encode plugin :
  // <p><img src="%E5%9B%BE%E7%89%87/image.png" alt="image.png" /></p>  
```

#### API

config rules: 
0. `undefined` : use `rule 1` 
1. `"*"` :  all paths will be decode 

2. `"."`  :  relative paths only 

3. `"./"` :  relative paths only , just like `"."`

4. `string` :  as `string[]` to apply `rule 5`

5. `string[]` :  will be apply  `[].some()`  as result  for  detect if it needs to be decoded   

6. `REGEXP` :  will be apply  `/^/.test()` as result  for  detect if it needs to be decoded  


