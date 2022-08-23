import { r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, e as createStaticVNode, d as createTextVNode } from "./app.f163fde1.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5" aria-hidden="true">#</a> axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5</h1><h2 id="_1-axios\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-axios\u5C01\u88C5" aria-hidden="true">#</a> 1. axios\u5C01\u88C5</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**axios\u5C01\u88C5\n * \u8BF7\u6C42\u62E6\u622A\u3001\u76F8\u5E94\u62E6\u622A\u3001\u9519\u8BEF\u7EDF\u4E00\u5904\u7406\n */\nimport axios from &#39;axios&#39;;\n// import QS from &#39;qs&#39;;\nimport { Toast } from &#39;vant&#39;;\nimport store from &#39;../store/index&#39;\n\n// \u73AF\u5883\u7684\u5207\u6362\nif (p<wbr>rocess.env.NODE_ENV == &#39;development&#39;) {    \n    axios.defaults.baseURL = &#39;/api&#39;;\n} else if (p<wbr>rocess.env.NODE_ENV == &#39;debug&#39;) {    \n    axios.defaults.baseURL = &#39;&#39;;\n} else if (p<wbr>rocess.env.NODE_ENV == &#39;production&#39;) {    \n    axios.defaults.baseURL = &#39;http://api.123dailu.com/&#39;;\n}\n\n// \u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4\naxios.defaults.timeout = 10000;\n\n// post\u8BF7\u6C42\u5934\naxios.defaults.headers.post[&#39;Content-Type&#39;] = &#39;application/x-www-form-urlencoded;charset=UTF-8&#39;;\n\n// \u8BF7\u6C42\u62E6\u622A\u5668\naxios.interceptors.request.use(    \n    config =&gt; {\n        // \u6BCF\u6B21\u53D1\u9001\u8BF7\u6C42\u4E4B\u524D\u5224\u65AD\u662F\u5426\u5B58\u5728token\uFF0C\u5982\u679C\u5B58\u5728\uFF0C\u5219\u7EDF\u4E00\u5728http\u8BF7\u6C42\u7684header\u90FD\u52A0\u4E0Atoken\uFF0C\u4E0D\u7528\u6BCF\u6B21\u8BF7\u6C42\u90FD\u624B\u52A8\u6DFB\u52A0\u4E86\n        // \u5373\u4F7F\u672C\u5730\u5B58\u5728token\uFF0C\u4E5F\u6709\u53EF\u80FDtoken\u662F\u8FC7\u671F\u7684\uFF0C\u6240\u4EE5\u5728\u54CD\u5E94\u62E6\u622A\u5668\u4E2D\u8981\u5BF9\u8FD4\u56DE\u72B6\u6001\u8FDB\u884C\u5224\u65AD\n        // const token = store.state.token;        \n        // token &amp;&amp; (config.headers.Authorization = token);        \n        return config;    \n    },    \n    error =&gt; {        \n        return Promise.error(error);    \n    })\n\n// \u54CD\u5E94\u62E6\u622A\u5668\naxios.interceptors.response.use(    \n    response =&gt; {       \n       \n        if (response.status === 200) {          \n           return Promise.resolve(response);\n        } else {      \n            return Promise.reject(response);        \n        }    \n    },\n    // \u670D\u52A1\u5668\u72B6\u6001\u7801\u4E0D\u662F200\u7684\u60C5\u51B5    \n    error =&gt; {        \n        if (error.response.status) {            \n            switch (error.response.status) {                \n                // 401: \u672A\u767B\u5F55                \n                // \u672A\u767B\u5F55\u5219\u8DF3\u8F6C\u767B\u5F55\u9875\u9762\uFF0C\u5E76\u643A\u5E26\u5F53\u524D\u9875\u9762\u7684\u8DEF\u5F84                \n                // \u5728\u767B\u5F55\u6210\u529F\u540E\u8FD4\u56DE\u5F53\u524D\u9875\u9762\uFF0C\u8FD9\u4E00\u6B65\u9700\u8981\u5728\u767B\u5F55\u9875\u64CD\u4F5C\u3002                \n                case 401:                    \n                    router.replace({                        \n                        path: &#39;/login&#39;,                        \n                        query: { redirect: router.currentRoute.fullPath } \n                    });\n                    break;\n                // 403 token\u8FC7\u671F                \n                // \u767B\u5F55\u8FC7\u671F\u5BF9\u7528\u6237\u8FDB\u884C\u63D0\u793A                \n                // \u6E05\u9664\u672C\u5730token\u548C\u6E05\u7A7Avuex\u4E2Dtoken\u5BF9\u8C61                \n                // \u8DF3\u8F6C\u767B\u5F55\u9875\u9762                \n                case 403:                     \n                    Toast({                        \n                        message: &#39;\u767B\u5F55\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55&#39;,                        \n                        duration: 1000,                        \n                        forbidClick: true                    \n                    });                    \n                    // \u6E05\u9664token                    \n                    localStorage.removeItem(&#39;token&#39;);                    \n                    store.commit(&#39;loginSuccess&#39;, null);                    \n                    // \u8DF3\u8F6C\u767B\u5F55\u9875\u9762\uFF0C\u5E76\u5C06\u8981\u6D4F\u89C8\u7684\u9875\u9762fullPath\u4F20\u8FC7\u53BB\uFF0C\u767B\u5F55\u6210\u529F\u540E\u8DF3\u8F6C\u9700\u8981\u8BBF\u95EE\u7684\u9875\u9762\n                    setTimeout(() =&gt; {                        \n                        router.replace({                            \n                            path: &#39;/login&#39;,                            \n                            query: { \n                                redirect: router.currentRoute.fullPath \n                            }                        \n                        });                    \n                    }, 1000);                    \n                    break; \n                // 404\u8BF7\u6C42\u4E0D\u5B58\u5728                \n                case 404:                    \n                    Toast({                        \n                        message: &#39;\u7F51\u7EDC\u8BF7\u6C42\u4E0D\u5B58\u5728&#39;,                        \n                        duration: 1500,                        \n                        forbidClick: true                    \n                    });                    \n                break;                \n                // \u5176\u4ED6\u9519\u8BEF\uFF0C\u76F4\u63A5\u629B\u51FA\u9519\u8BEF\u63D0\u793A                \n                default:                    \n                    Toast({                        \n                        message: error.response.data.message,                        \n                        duration: 1500,                        \n                        forbidClick: true                    \n                    });            \n            }            \n            return Promise.reject(error.response);        \n        }       \n    }\n);\n/** \n * get\u65B9\u6CD5\uFF0C\u5BF9\u5E94get\u8BF7\u6C42 \n * @param {String} url [\u8BF7\u6C42\u7684url\u5730\u5740] \n * @param {Object} params [\u8BF7\u6C42\u65F6\u643A\u5E26\u7684\u53C2\u6570] \n */\nexport function get(url, params){    \n    return new Promise((resolve, reject) =&gt;{        \n        axios.get(url, {            \n            params: params        \n        })        \n        .then(res =&gt; {            \n            resolve(res.data);        \n        })        \n        .catch(err =&gt; {            \n            reject(err.data)        \n        })    \n    });\n}\n/** \n * post\u65B9\u6CD5\uFF0C\u5BF9\u5E94post\u8BF7\u6C42 \n * @param {String} url [\u8BF7\u6C42\u7684url\u5730\u5740] \n * @param {Object} params [\u8BF7\u6C42\u65F6\u643A\u5E26\u7684\u53C2\u6570] \n */\nexport function post(url, params) {    \n    return new Promise((resolve, reject) =&gt; {         \n        axios.post(url, params)        \n        .then(res =&gt; {            \n            resolve(res.data);        \n        })        \n        .catch(err =&gt; {  \n            reject(err.data)        \n        })    \n    });\n}\n\n/** \n * post\u65B9\u6CD5\uFF0C\u5BF9\u5E94post\u8BF7\u6C42  FORM\u8868\u5355\u5F62\u5F0F\n * @param {String} url [\u8BF7\u6C42\u7684url\u5730\u5740] \n * @param {Object} params [\u8BF7\u6C42\u65F6\u643A\u5E26\u7684\u53C2\u6570] \n */\nexport function postForm(url, params) {    \n  return new Promise((resolve, reject) =&gt; {         \n      axios.post(url, tansParams(params))        \n      .then(res =&gt; {            \n          resolve(res.data);        \n      })        \n      .catch(err =&gt; {  \n          reject(err.data)        \n      })    \n  });\n}\n\nfunction tansParams(params) {\n  let result = &#39;&#39;\n  Object.keys(params).forEach((key) =&gt; {\n    if (!Object.is(params[key], undefined) &amp;&amp; !Object.is(params[key], null)) {\n      result += encodeURIComponent(key) + &#39;=&#39; + encodeURIComponent(params[key]) + &#39;&amp;&#39;\n    }\n  })\n  return result\n}\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-api-\u8BF7\u6C42\u7C7B-\u6839\u636E\u5B9E\u9645\u4E1A\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-api-\u8BF7\u6C42\u7C7B-\u6839\u636E\u5B9E\u9645\u4E1A\u52A1" aria-hidden="true">#</a> 2. APi \u8BF7\u6C42\u7C7B\uFF08\u6839\u636E\u5B9E\u9645\u4E1A\u52A1\uFF09</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import { get, post,postForm } from &#39;@/utils/request&#39;;\n\n\nlet api={\n    /**\n     * \u5BF9\u5E94\u7684\u8BF7\u6C42\n     */\n    getList (params) {\n        return postForm(&quot;/getList.do&quot;, params);\n    },\n\n\n};\n\nexport default api;\n\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5BF9\u5E94\u9875\u9762\u505A\u8BF7\u6C42" tabindex="-1"><a class="header-anchor" href="#_3-\u5BF9\u5E94\u9875\u9762\u505A\u8BF7\u6C42" aria-hidden="true">#</a> 3. \u5BF9\u5E94\u9875\u9762\u505A\u8BF7\u6C42</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;script&gt;\nimport api from &quot;@/api/api&quot;;\nexport default {\n  mounted() {\n    this.getList();\n  },\n  methods: {\n    // \u7ECF\u9A8C\u6C47\u7F16\n    getList() {\n       let that = this;\n      let params = {\n        page: 1,\n        pageSize: 100,\n      };\n\n      api.getList(params).then((res) =&gt; {\n        if (res.code == 0) {\n          that.caseCodeList = res.resultDatas.list;\n        }\n      });\n    },\n  },\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>', 8);
const _hoisted_9 = {
  href: "https://juejin.im/post/6844903652881072141",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_10 = /* @__PURE__ */ createTextVNode("vue\u4E2DAxios\u7684\u5C01\u88C5\u548CAPI\u63A5\u53E3\u7684\u7BA1\u7406");
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createBaseVNode("a", _hoisted_9, [
        _hoisted_10,
        createVNode(_component_ExternalLinkIcon)
      ])
    ])
  ]);
}
var C4Axios_______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C4-axios\u7F51\u7EDC\u8BF7\u6C42\u5C01\u88C5.html.vue"]]);
export { C4Axios_______html as default };
