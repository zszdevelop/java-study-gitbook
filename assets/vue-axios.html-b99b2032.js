import{_ as n,W as s,X as d,Y as e,Z as l,$ as r,a0 as a,D as v}from"./framework-0cf5f349.js";const u={},c=a(`<h1 id="axios网络请求封装" tabindex="-1"><a class="header-anchor" href="#axios网络请求封装" aria-hidden="true">#</a> axios网络请求封装</h1><h2 id="_1-axios封装" tabindex="-1"><a class="header-anchor" href="#_1-axios封装" aria-hidden="true">#</a> 1. axios封装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from &#39;axios&#39;;
// import QS from &#39;qs&#39;;
import { Toast } from &#39;vant&#39;;
import store from &#39;../store/index&#39;

// 环境的切换
if (p<wbr>rocess.env.NODE_ENV == &#39;development&#39;) {    
    axios.defaults.baseURL = &#39;/api&#39;;
} else if (p<wbr>rocess.env.NODE_ENV == &#39;debug&#39;) {    
    axios.defaults.baseURL = &#39;&#39;;
} else if (p<wbr>rocess.env.NODE_ENV == &#39;production&#39;) {    
    axios.defaults.baseURL = &#39;http://api.123dailu.com/&#39;;
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post[&#39;Content-Type&#39;] = &#39;application/x-www-form-urlencoded;charset=UTF-8&#39;;

// 请求拦截器
axios.interceptors.request.use(    
    config =&gt; {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;        
        // token &amp;&amp; (config.headers.Authorization = token);        
        return config;    
    },    
    error =&gt; {        
        return Promise.error(error);    
    })

// 响应拦截器
axios.interceptors.response.use(    
    response =&gt; {       
       
        if (response.status === 200) {          
           return Promise.resolve(response);
        } else {      
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error =&gt; {        
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:                    
                    router.replace({                        
                        path: &#39;/login&#39;,                        
                        query: { redirect: router.currentRoute.fullPath } 
                    });
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:                     
                    Toast({                        
                        message: &#39;登录过期，请重新登录&#39;,                        
                        duration: 1000,                        
                        forbidClick: true                    
                    });                    
                    // 清除token                    
                    localStorage.removeItem(&#39;token&#39;);                    
                    store.commit(&#39;loginSuccess&#39;, null);                    
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() =&gt; {                        
                        router.replace({                            
                            path: &#39;/login&#39;,                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 
                // 404请求不存在                
                case 404:                    
                    Toast({                        
                        message: &#39;网络请求不存在&#39;,                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });                    
                break;                
                // 其他错误，直接抛出错误提示                
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
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
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
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
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
 * post方法，对应post请求  FORM表单形式
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-api-请求类-根据实际业务" tabindex="-1"><a class="header-anchor" href="#_2-api-请求类-根据实际业务" aria-hidden="true">#</a> 2. APi 请求类（根据实际业务）</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { get, post,postForm } from &#39;@/utils/request&#39;;


let api={
    /**
     * 对应的请求
     */
    getList (params) {
        return postForm(&quot;/getList.do&quot;, params);
    },


};

export default api;


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-对应页面做请求" tabindex="-1"><a class="header-anchor" href="#_3-对应页面做请求" aria-hidden="true">#</a> 3. 对应页面做请求</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;script&gt;
import api from &quot;@/api/api&quot;;
export default {
  mounted() {
    this.getList();
  },
  methods: {
    // 经验汇编
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,8),m={href:"https://juejin.im/post/6844903652881072141",target:"_blank",rel:"noopener noreferrer"};function t(b,o){const i=v("ExternalLinkIcon");return s(),d("div",null,[c,e("p",null,[e("a",m,[l("vue中Axios的封装和API接口的管理"),r(i)])])])}const h=n(u,[["render",t],["__file","vue-axios.html.vue"]]);export{h as default};
