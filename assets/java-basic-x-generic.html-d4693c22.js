const e=JSON.parse('{"key":"v-51169917","path":"/java/base/java-basic-x-generic.html","title":"Java 基础 - 泛型机制详解","lang":"zh-CN","frontmatter":{"order":30,"category":["Java"],"description":"Java泛型这个特性是从JDK 1.5才开始加入的，因此为了兼容之前的版本，Java泛型的实现采取了“伪泛型”的策略，即Java在语法上支持泛型，但是在编译阶段会进行所谓的“类型擦除”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。本文综合多篇文章后，总结了Java 泛型的...","head":[["meta",{"property":"og:url","content":"https://zszdevelop.github.io/java-study-gitbook/java/base/java-basic-x-generic.html"}],["meta",{"property":"og:site_name","content":"Java学习笔记"}],["meta",{"property":"og:title","content":"Java 基础 - 泛型机制详解"}],["meta",{"property":"og:description","content":"Java泛型这个特性是从JDK 1.5才开始加入的，因此为了兼容之前的版本，Java泛型的实现采取了“伪泛型”的策略，即Java在语法上支持泛型，但是在编译阶段会进行所谓的“类型擦除”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。本文综合多篇文章后，总结了Java 泛型的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-20T13:42:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2023-02-20T13:42:31.000Z"}]]},"headers":[{"level":2,"title":"1. 为什么会引入泛型","slug":"_1-为什么会引入泛型","link":"#_1-为什么会引入泛型","children":[]},{"level":2,"title":"2. 泛型的基本使用","slug":"_2-泛型的基本使用","link":"#_2-泛型的基本使用","children":[{"level":3,"title":"2.1 泛型类","slug":"_2-1-泛型类","link":"#_2-1-泛型类","children":[]},{"level":3,"title":"2.2 泛型接口","slug":"_2-2-泛型接口","link":"#_2-2-泛型接口","children":[]},{"level":3,"title":"2.3 泛型方法","slug":"_2-3-泛型方法","link":"#_2-3-泛型方法","children":[]},{"level":3,"title":"2.4 泛型的上下限","slug":"_2-4-泛型的上下限","link":"#_2-4-泛型的上下限","children":[]},{"level":3,"title":"2.5 泛型数组","slug":"_2-5-泛型数组","link":"#_2-5-泛型数组","children":[]}]},{"level":2,"title":"3. 深入理解泛型","slug":"_3-深入理解泛型","link":"#_3-深入理解泛型","children":[{"level":3,"title":"3.1 如何理解Java中的泛型是伪泛型？泛型中类型擦除","slug":"_3-1-如何理解java中的泛型是伪泛型-泛型中类型擦除","link":"#_3-1-如何理解java中的泛型是伪泛型-泛型中类型擦除","children":[]},{"level":3,"title":"3.2 如何证明类型的擦除呢？","slug":"_3-2-如何证明类型的擦除呢","link":"#_3-2-如何证明类型的擦除呢","children":[]},{"level":3,"title":"3.3 如何理解类型擦除后保留的原始类型?","slug":"_3-3-如何理解类型擦除后保留的原始类型","link":"#_3-3-如何理解类型擦除后保留的原始类型","children":[]},{"level":3,"title":"3.4 如何理解泛型的编译期检查？","slug":"_3-4-如何理解泛型的编译期检查","link":"#_3-4-如何理解泛型的编译期检查","children":[]},{"level":3,"title":"3.5 如何理解泛型的多态？泛型的桥接方法","slug":"_3-5-如何理解泛型的多态-泛型的桥接方法","link":"#_3-5-如何理解泛型的多态-泛型的桥接方法","children":[]},{"level":3,"title":"3.6 如何理解基本类型不能作为泛型类型？","slug":"_3-6-如何理解基本类型不能作为泛型类型","link":"#_3-6-如何理解基本类型不能作为泛型类型","children":[]},{"level":3,"title":"3.7 如何理解泛型类型不能实例化？","slug":"_3-7-如何理解泛型类型不能实例化","link":"#_3-7-如何理解泛型类型不能实例化","children":[]},{"level":3,"title":"3.8 泛型数组：能不能采用具体的泛型类型进行初始化？","slug":"_3-8-泛型数组-能不能采用具体的泛型类型进行初始化","link":"#_3-8-泛型数组-能不能采用具体的泛型类型进行初始化","children":[]},{"level":3,"title":"3.9 泛型数组：如何正确的初始化泛型数组实例？","slug":"_3-9-泛型数组-如何正确的初始化泛型数组实例","link":"#_3-9-泛型数组-如何正确的初始化泛型数组实例","children":[]},{"level":3,"title":"3.10 如何理解泛型类中的静态方法和静态变量？","slug":"_3-10-如何理解泛型类中的静态方法和静态变量","link":"#_3-10-如何理解泛型类中的静态方法和静态变量","children":[]},{"level":3,"title":"3.11 如何理解异常中使用泛型？","slug":"_3-11-如何理解异常中使用泛型","link":"#_3-11-如何理解异常中使用泛型","children":[]},{"level":3,"title":"3.12 如何获取泛型的参数类型？","slug":"_3-12-如何获取泛型的参数类型","link":"#_3-12-如何获取泛型的参数类型","children":[]}]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1676900551000,"updatedTime":1676900551000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":31.34,"words":9403},"filePathRelative":"java/base/java-basic-x-generic.md","localizedDate":"2023年2月20日","autoDesc":true}');export{e as data};
