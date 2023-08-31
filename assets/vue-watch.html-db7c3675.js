const e=JSON.parse('{"key":"v-6711e8d2","path":"/language/frontend-vue/vue-watch.html","title":"Vue中watch监听对象内属性的方法","lang":"zh-CN","frontmatter":{"description":"1. 背景 我们有个场景，需要监听表单中任意一个属性变化，再将变化通过vuex 传递给其他组件使用。因为实时性要求高，且字段多。并不想每个字段变化后去触发事件。 需求：; 我们watch监听对象内的属性变化 问题; 现在我们正常的写法，只能监听对象的变化，对象内的属性变化并不会被监听到 案例; 上述情况里data中的count属性可以直接监听，但是如果...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/language/frontend-vue/vue-watch.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"Vue中watch监听对象内属性的方法"}],["meta",{"property":"og:description","content":"1. 背景 我们有个场景，需要监听表单中任意一个属性变化，再将变化通过vuex 传递给其他组件使用。因为实时性要求高，且字段多。并不想每个字段变化后去触发事件。 需求：; 我们watch监听对象内的属性变化 问题; 现在我们正常的写法，只能监听对象的变化，对象内的属性变化并不会被监听到 案例; 上述情况里data中的count属性可以直接监听，但是如果..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 背景","slug":"_1-背景","link":"#_1-背景","children":[]},{"level":2,"title":"2. 解决方法","slug":"_2-解决方法","link":"#_2-解决方法","children":[{"level":3,"title":"2.1 方案一：深度检测","slug":"_2-1-方案一-深度检测","link":"#_2-1-方案一-深度检测","children":[]},{"level":3,"title":"2.2 用字符串来表示对象的属性调用","slug":"_2-2-用字符串来表示对象的属性调用","link":"#_2-2-用字符串来表示对象的属性调用","children":[]},{"level":3,"title":"2.3 使用computed计算属性","slug":"_2-3-使用computed计算属性","link":"#_2-3-使用computed计算属性","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":1.58,"words":473},"filePathRelative":"language/frontend-vue/vue-watch.md","localizedDate":"2023年2月20日","autoDesc":true}');export{e as data};
