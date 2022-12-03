import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as l,a as e,b as d,d as r,e as a,r as v}from"./app.0227f3fb.js";const u={},c=r(`<h1 id="axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5" aria-hidden="true">#</a> axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5</h1><h2 id="_1-axios\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-axios\u5C01\u88C5" aria-hidden="true">#</a> 1. axios\u5C01\u88C5</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**axios\u5C01\u88C5
 * \u8BF7\u6C42\u62E6\u622A\u3001\u76F8\u5E94\u62E6\u622A\u3001\u9519\u8BEF\u7EDF\u4E00\u5904\u7406
 */
import axios from &#39;axios&#39;;
// import QS from &#39;qs&#39;;
import { Toast } from &#39;vant&#39;;
import store from &#39;../store/index&#39;

// \u73AF\u5883\u7684\u5207\u6362
if (p<wbr>rocess.env.NODE_ENV == &#39;development&#39;) {    
    axios.defaults.baseURL = &#39;/api&#39;;
} else if (p<wbr>rocess.env.NODE_ENV == &#39;debug&#39;) {    
    axios.defaults.baseURL = &#39;&#39;;
} else if (p<wbr>rocess.env.NODE_ENV == &#39;production&#39;) {    
    axios.defaults.baseURL = &#39;http://api.123dailu.com/&#39;;
}

// \u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4
axios.defaults.timeout = 10000;

// post\u8BF7\u6C42\u5934
axios.defaults.headers.post[&#39;Content-Type&#39;] = &#39;application/x-www-form-urlencoded;charset=UTF-8&#39;;

// \u8BF7\u6C42\u62E6\u622A\u5668
axios.interceptors.request.use(    
    config =&gt; {
        // \u6BCF\u6B21\u53D1\u9001\u8BF7\u6C42\u4E4B\u524D\u5224\u65AD\u662F\u5426\u5B58\u5728token\uFF0C\u5982\u679C\u5B58\u5728\uFF0C\u5219\u7EDF\u4E00\u5728http\u8BF7\u6C42\u7684header\u90FD\u52A0\u4E0Atoken\uFF0C\u4E0D\u7528\u6BCF\u6B21\u8BF7\u6C42\u90FD\u624B\u52A8\u6DFB\u52A0\u4E86
        // \u5373\u4F7F\u672C\u5730\u5B58\u5728token\uFF0C\u4E5F\u6709\u53EF\u80FDtoken\u662F\u8FC7\u671F\u7684\uFF0C\u6240\u4EE5\u5728\u54CD\u5E94\u62E6\u622A\u5668\u4E2D\u8981\u5BF9\u8FD4\u56DE\u72B6\u6001\u8FDB\u884C\u5224\u65AD
        // const token = store.state.token;        
        // token &amp;&amp; (config.headers.Authorization = token);        
        return config;    
    },    
    error =&gt; {        
        return Promise.error(error);    
    })

// \u54CD\u5E94\u62E6\u622A\u5668
axios.interceptors.response.use(    
    response =&gt; {       
       
        if (response.status === 200) {          
           return Promise.resolve(response);
        } else {      
            return Promise.reject(response);        
        }    
    },
    // \u670D\u52A1\u5668\u72B6\u6001\u7801\u4E0D\u662F200\u7684\u60C5\u51B5    
    error =&gt; {        
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: \u672A\u767B\u5F55                
                // \u672A\u767B\u5F55\u5219\u8DF3\u8F6C\u767B\u5F55\u9875\u9762\uFF0C\u5E76\u643A\u5E26\u5F53\u524D\u9875\u9762\u7684\u8DEF\u5F84                
                // \u5728\u767B\u5F55\u6210\u529F\u540E\u8FD4\u56DE\u5F53\u524D\u9875\u9762\uFF0C\u8FD9\u4E00\u6B65\u9700\u8981\u5728\u767B\u5F55\u9875\u64CD\u4F5C\u3002                
                case 401:                    
                    router.replace({                        
                        path: &#39;/login&#39;,                        
                        query: { redirect: router.currentRoute.fullPath } 
                    });
                    break;
                // 403 token\u8FC7\u671F                
                // \u767B\u5F55\u8FC7\u671F\u5BF9\u7528\u6237\u8FDB\u884C\u63D0\u793A                
                // \u6E05\u9664\u672C\u5730token\u548C\u6E05\u7A7Avuex\u4E2Dtoken\u5BF9\u8C61                
                // \u8DF3\u8F6C\u767B\u5F55\u9875\u9762                
                case 403:                     
                    Toast({                        
                        message: &#39;\u767B\u5F55\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55&#39;,                        
                        duration: 1000,                        
                        forbidClick: true                    
                    });                    
                    // \u6E05\u9664token                    
                    localStorage.removeItem(&#39;token&#39;);                    
                    store.commit(&#39;loginSuccess&#39;, null);                    
                    // \u8DF3\u8F6C\u767B\u5F55\u9875\u9762\uFF0C\u5E76\u5C06\u8981\u6D4F\u89C8\u7684\u9875\u9762fullPath\u4F20\u8FC7\u53BB\uFF0C\u767B\u5F55\u6210\u529F\u540E\u8DF3\u8F6C\u9700\u8981\u8BBF\u95EE\u7684\u9875\u9762
                    setTimeout(() =&gt; {                        
                        router.replace({                            
                            path: &#39;/login&#39;,                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 
                // 404\u8BF7\u6C42\u4E0D\u5B58\u5728                
                case 404:                    
                    Toast({                        
                        message: &#39;\u7F51\u7EDC\u8BF7\u6C42\u4E0D\u5B58\u5728&#39;,                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });                    
                break;                
                // \u5176\u4ED6\u9519\u8BEF\uFF0C\u76F4\u63A5\u629B\u51FA\u9519\u8BEF\u63D0\u793A                
                default:                    
                    Toast({                        
                        message: error.response.data.message,                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });            
            }            
            return Promise.reject(error.response);        
        }       
    }
);
/** 
 * get\u65B9\u6CD5\uFF0C\u5BF9\u5E94get\u8BF7\u6C42 
 * @param {String} url [\u8BF7\u6C42\u7684url\u5730\u5740] 
 * @param {Object} params [\u8BF7\u6C42\u65F6\u643A\u5E26\u7684\u53C2\u6570] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =&gt;{        
        axios.get(url, {            
            params: params        
        })        
        .then(res =&gt; {            
            resolve(res.data);        
        })        
        .catch(err =&gt; {            
            reject(err.data)        
        })    
    });
}
/** 
 * post\u65B9\u6CD5\uFF0C\u5BF9\u5E94post\u8BF7\u6C42 
 * @param {String} url [\u8BF7\u6C42\u7684url\u5730\u5740] 
 * @param {Object} params [\u8BF7\u6C42\u65F6\u643A\u5E26\u7684\u53C2\u6570] 
 */
export function post(url, params) {    
    return new Promise((resolve, reject) =&gt; {         
        axios.post(url, params)        
        .then(res =&gt; {            
            resolve(res.data);        
        })        
        .catch(err =&gt; {  
            reject(err.data)        
        })    
    });
}

/** 
 * post\u65B9\u6CD5\uFF0C\u5BF9\u5E94post\u8BF7\u6C42  FORM\u8868\u5355\u5F62\u5F0F
 * @param {String} url [\u8BF7\u6C42\u7684url\u5730\u5740] 
 * @param {Object} params [\u8BF7\u6C42\u65F6\u643A\u5E26\u7684\u53C2\u6570] 
 */
export function postForm(url, params) {    
  return new Promise((resolve, reject) =&gt; {         
      axios.post(url, tansParams(params))        
      .then(res =&gt; {            
          resolve(res.data);        
      })        
      .catch(err =&gt; {  
          reject(err.data)        
      })    
  });
}

function tansParams(params) {
  let result = &#39;&#39;
  Object.keys(params).forEach((key) =&gt; {
    if (!Object.is(params[key], undefined) &amp;&amp; !Object.is(params[key], null)) {
      result += encodeURIComponent(key) + &#39;=&#39; + encodeURIComponent(params[key]) + &#39;&amp;&#39;
    }
  })
  return result
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-api-\u8BF7\u6C42\u7C7B-\u6839\u636E\u5B9E\u9645\u4E1A\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-api-\u8BF7\u6C42\u7C7B-\u6839\u636E\u5B9E\u9645\u4E1A\u52A1" aria-hidden="true">#</a> 2. APi \u8BF7\u6C42\u7C7B\uFF08\u6839\u636E\u5B9E\u9645\u4E1A\u52A1\uFF09</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import { get, post,postForm } from &#39;@/utils/request&#39;;


let api={
    /**
     * \u5BF9\u5E94\u7684\u8BF7\u6C42
     */
    getList (params) {
        return postForm(&quot;/getList.do&quot;, params);
    },


};

export default api;


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5BF9\u5E94\u9875\u9762\u505A\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#_3-\u5BF9\u5E94\u9875\u9762\u505A\u8BF7\u6C42" aria-hidden="true">#</a> 3. \u5BF9\u5E94\u9875\u9762\u505A\u8BF7\u6C42</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;script&gt;
import api from &quot;@/api/api&quot;;
export default {
  mounted() {
    this.getList();
  },
  methods: {
    // \u7ECF\u9A8C\u6C47\u7F16
    getList() {
       let that = this;
      let params = {
        page: 1,
        pageSize: 100,
      };

      api.getList(params).then((res) =&gt; {
        if (res.code == 0) {
          that.caseCodeList = res.resultDatas.list;
        }
      });
    },
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,8),m={href:"https://juejin.im/post/6844903652881072141",target:"_blank",rel:"noopener noreferrer"},t=a("vue\u4E2DAxios\u7684\u5C01\u88C5\u548CAPI\u63A5\u53E3\u7684\u7BA1\u7406");function b(o,p){const i=v("ExternalLinkIcon");return s(),l("div",null,[c,e("p",null,[e("a",m,[t,d(i)])])])}const x=n(u,[["render",b],["__file","vue-axios.html.vue"]]);export{x as default};
