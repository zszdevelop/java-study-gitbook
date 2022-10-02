const e=JSON.parse('{"key":"v-31f9544e","path":"/dependencies/spring/spring-x-framework-ioc-source-3.html","title":"Spring\u8FDB\u9636 - Spring IOC\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4BBean\u5B9E\u4F8B\u5316(\u751F\u547D\u5468\u671F,\u5FAA\u73AF\u4F9D\u8D56\u7B49)","lang":"zh-CN","frontmatter":{"order":90,"category":["Spring"],"summary":"Spring\u8FDB\u9636 - Spring IOC\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4BBean\u5B9E\u4F8B\u5316(\u751F\u547D\u5468\u671F,\u5FAA\u73AF\u4F9D\u8D56\u7B49) \\"\u4E0A\u6587\uFF0C\u6211\u4EEC\u770B\u4E86IOC\u8BBE\u8BA1\u8981\u70B9\u548C\u8BBE\u8BA1\u7ED3\u6784\uFF1B\u4EE5\u53CASpring\u5982\u4F55\u5B9E\u73B0\u5C06\u8D44\u6E90\u914D\u7F6E\uFF08\u4EE5xml\u914D\u7F6E\u4E3A\u4F8B\uFF09\u901A\u8FC7\u52A0\u8F7D\uFF0C\u89E3\u6790\uFF0C\u751F\u6210BeanDefination\u5E76\u6CE8\u518C\u5230IoC\u5BB9\u5668\u4E2D\u7684\uFF1B\u5BB9\u5668\u4E2D\u5B58\u653E\u7684\u662FBean\u7684\u5B9A\u4E49\u5373BeanDefinition\u653E\u5230beanDefinitionMap","head":[["meta",{"property":"og:url","content":"https://java.isture.com/dependencies/spring/spring-x-framework-ioc-source-3.html"}],["meta",{"property":"og:site_name","content":"Java\u5B66\u4E60\u7B14\u8BB0"}],["meta",{"property":"og:title","content":"Spring\u8FDB\u9636 - Spring IOC\u5B9E\u73B0\u539F\u7406\u8BE6\u89E3\u4E4BBean\u5B9E\u4F8B\u5316(\u751F\u547D\u5468\u671F,\u5FAA\u73AF\u4F9D\u8D56\u7B49)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-10-02T12:54:17.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-10-02T12:54:17.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1. \u5F15\u5165","slug":"_1-\u5F15\u5165","link":"#_1-\u5F15\u5165","children":[]},{"level":2,"title":"2. BeanFactory\u4E2DgetBean\u7684\u4E3B\u4F53\u601D\u8DEF","slug":"_2-beanfactory\u4E2Dgetbean\u7684\u4E3B\u4F53\u601D\u8DEF","link":"#_2-beanfactory\u4E2Dgetbean\u7684\u4E3B\u4F53\u601D\u8DEF","children":[{"level":3,"title":"2.1 \u521D\u6B65\u7684\u601D\u8003","slug":"_2-1-\u521D\u6B65\u7684\u601D\u8003","link":"#_2-1-\u521D\u6B65\u7684\u601D\u8003","children":[]},{"level":3,"title":"2.2 Spring\u4E2DgetBean\u7684\u4E3B\u4F53\u601D\u8DEF","slug":"_2-2-spring\u4E2Dgetbean\u7684\u4E3B\u4F53\u601D\u8DEF","link":"#_2-2-spring\u4E2Dgetbean\u7684\u4E3B\u4F53\u601D\u8DEF","children":[]}]},{"level":2,"title":"3. \u91CD\u70B9\uFF1ASpring\u5982\u4F55\u89E3\u51B3\u5FAA\u73AF\u4F9D\u8D56\u95EE\u9898","slug":"_3-\u91CD\u70B9-spring\u5982\u4F55\u89E3\u51B3\u5FAA\u73AF\u4F9D\u8D56\u95EE\u9898","link":"#_3-\u91CD\u70B9-spring\u5982\u4F55\u89E3\u51B3\u5FAA\u73AF\u4F9D\u8D56\u95EE\u9898","children":[{"level":3,"title":"3.1 Spring\u5355\u4F8B\u6A21\u5F0F\u4E0B\u7684\u5C5E\u6027\u4F9D\u8D56","slug":"_3-1-spring\u5355\u4F8B\u6A21\u5F0F\u4E0B\u7684\u5C5E\u6027\u4F9D\u8D56","link":"#_3-1-spring\u5355\u4F8B\u6A21\u5F0F\u4E0B\u7684\u5C5E\u6027\u4F9D\u8D56","children":[]},{"level":3,"title":"3.2 Spring\u4E3A\u4F55\u4E0D\u80FD\u89E3\u51B3\u975E\u5355\u4F8B\u5C5E\u6027\u4E4B\u5916\u7684\u5FAA\u73AF\u4F9D\u8D56\uFF1F","slug":"_3-2-spring\u4E3A\u4F55\u4E0D\u80FD\u89E3\u51B3\u975E\u5355\u4F8B\u5C5E\u6027\u4E4B\u5916\u7684\u5FAA\u73AF\u4F9D\u8D56","link":"#_3-2-spring\u4E3A\u4F55\u4E0D\u80FD\u89E3\u51B3\u975E\u5355\u4F8B\u5C5E\u6027\u4E4B\u5916\u7684\u5FAA\u73AF\u4F9D\u8D56","children":[]},{"level":3,"title":"3.3 \u90A3\u4E48\u5176\u5B83\u5FAA\u73AF\u4F9D\u8D56\u5982\u4F55\u89E3\u51B3\uFF1F","slug":"_3-3-\u90A3\u4E48\u5176\u5B83\u5FAA\u73AF\u4F9D\u8D56\u5982\u4F55\u89E3\u51B3","link":"#_3-3-\u90A3\u4E48\u5176\u5B83\u5FAA\u73AF\u4F9D\u8D56\u5982\u4F55\u89E3\u51B3","children":[]}]},{"level":2,"title":"4. \u91CD\u70B9\uFF1ASpring\u4E2DBean\u7684\u751F\u547D\u5468\u671F","slug":"_4-\u91CD\u70B9-spring\u4E2Dbean\u7684\u751F\u547D\u5468\u671F","link":"#_4-\u91CD\u70B9-spring\u4E2Dbean\u7684\u751F\u547D\u5468\u671F","children":[{"level":3,"title":"4.1 Spring Bean\u751F\u547D\u5468\u671F\u6D41\u7A0B","slug":"_4-1-spring-bean\u751F\u547D\u5468\u671F\u6D41\u7A0B","link":"#_4-1-spring-bean\u751F\u547D\u5468\u671F\u6D41\u7A0B","children":[]},{"level":3,"title":"4.2 Spring Bean\u751F\u547D\u5468\u671F\u6848\u4F8B","slug":"_4-2-spring-bean\u751F\u547D\u5468\u671F\u6848\u4F8B","link":"#_4-2-spring-bean\u751F\u547D\u5468\u671F\u6848\u4F8B","children":[]}]},{"level":2,"title":"\u53C2\u8003\u6587\u7AE0","slug":"\u53C2\u8003\u6587\u7AE0","link":"#\u53C2\u8003\u6587\u7AE0","children":[]}],"git":{"createdTime":1663124461000,"updatedTime":1664715257000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":4}]},"readingTime":{"minutes":17.45,"words":5235},"filePathRelative":"dependencies/spring/spring-x-framework-ioc-source-3.md","localizedDate":"2022\u5E749\u670814\u65E5"}');export{e as data};
