const e=JSON.parse('{"key":"v-158fcbdd","path":"/arch/minio/minio-concept.html","title":"Minio\u57FA\u7840\u6982\u5FF5","lang":"zh-CN","frontmatter":{"order":10,"summary":"Minio\u57FA\u7840\u6982\u5FF5 \\"\u6587\u4EF6\u3001\u5757\u548C\u5BF9\u8C61\u662F\u4E09\u79CD\u4EE5\u4E0D\u540C\u7684\u65B9\u5F0F\u6765\u4FDD\u5B58\u3001\u6574\u7406\u548C\u5448\u73B0\u6570\u636E\u7684\u5B58\u50A8\u683C\u5F0F\u3002\u8FD9\u4E9B\u683C\u5F0F\u5404\u6709\u5404\u7684\u529F\u80FD\u548C\u9650\u5236\u3002\\" \\"\\" \\"- \u6587\u4EF6\u5B58\u50A8\u4F1A\u4EE5\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u7684\u5C42\u6B21\u7ED3\u6784\u6765\u6574\u7406\u548C\u5448\u73B0\u6570\u636E\uFF1B\\" \\"\\" \\"- \u5757\u5B58\u50A8\u4F1A\u5C06\u6570\u636E\u62C6\u5206\u5230\u4EFB\u610F\u5212\u5206\u4E14\u5927\u5C0F\u76F8\u540C\u7684\u5377\u4E2D\uFF1B\\" \\"\\" \\"- \u5BF9\u8C61\u5B58\u50A8\u4F1A\u7BA1\u7406\u6570\u636E\u5E76\u5C06\u5176\u94FE\u63A5\u81F3\u5173\u8054\u7684\u5143\u6570\u636E\u3002\\" \\"\\" \\" \u5143\u6570\u636E\u5305\u62EC account\uFF08\u7528\u6237\uFF09\uFF0C b","head":[["meta",{"property":"og:url","content":"https://java.isture.com/arch/minio/minio-concept.html"}],["meta",{"property":"og:site_name","content":"Java\u5B66\u4E60\u7B14\u8BB0"}],["meta",{"property":"og:title","content":"Minio\u57FA\u7840\u6982\u5FF5"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-09-02T15:15:22.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-09-02T15:15:22.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1. \u7B80\u4ECB","slug":"_1-\u7B80\u4ECB","children":[{"level":3,"title":"1.1 \u4F55\u4E3A\u5BF9\u8C61\u5B58\u50A8\uFF1F","slug":"_1-1-\u4F55\u4E3A\u5BF9\u8C61\u5B58\u50A8","children":[]},{"level":3,"title":"1.2 \u7279\u70B9","slug":"_1-2-\u7279\u70B9","children":[]}]},{"level":2,"title":"2. MINIO \u57FA\u7840\u6982\u5FF5","slug":"_2-minio-\u57FA\u7840\u6982\u5FF5","children":[{"level":3,"title":"2.1 Set /Drive \u7684\u5173\u7CFB","slug":"_2-1-set-drive-\u7684\u5173\u7CFB","children":[]},{"level":3,"title":"2.2 MIINO\u5982\u4F55\u5199\u5165\u5BF9\u8C61\uFF1F","slug":"_2-2-miino\u5982\u4F55\u5199\u5165\u5BF9\u8C61","children":[]}]},{"level":2,"title":"3. Minio\u5B58\u50A8\u67B6\u6784","slug":"_3-minio\u5B58\u50A8\u67B6\u6784","children":[{"level":3,"title":"3.1 \u5355\u4E3B\u673A\uFF0C\u5355\u786C\u76D8\u6A21\u5F0F","slug":"_3-1-\u5355\u4E3B\u673A-\u5355\u786C\u76D8\u6A21\u5F0F","children":[]},{"level":3,"title":"3.2 \u5355\u4E3B\u673A\uFF0C\u591A\u786C\u76D8\u6A21\u5F0F","slug":"_3-2-\u5355\u4E3B\u673A-\u591A\u786C\u76D8\u6A21\u5F0F","children":[]},{"level":3,"title":"3.3 \u591A\u4E3B\u673A\u3001\u591A\u786C\u76D8\u6A21\u5F0F\uFF08\u5206\u5E03\u5F0F\uFF09","slug":"_3-3-\u591A\u4E3B\u673A\u3001\u591A\u786C\u76D8\u6A21\u5F0F-\u5206\u5E03\u5F0F","children":[]}]},{"level":2,"title":"4. \u5206\u5E03\u5F0FMinio\u6709\u4EC0\u4E48\u597D\u5904?","slug":"_4-\u5206\u5E03\u5F0Fminio\u6709\u4EC0\u4E48\u597D\u5904","children":[{"level":3,"title":"4.1 \u6570\u636E\u4FDD\u62A4","slug":"_4-1-\u6570\u636E\u4FDD\u62A4","children":[]},{"level":3,"title":"4.2 \u9AD8\u53EF\u7528","slug":"_4-2-\u9AD8\u53EF\u7528","children":[]},{"level":3,"title":"4.3 \u4E00\u81F4\u6027","slug":"_4-3-\u4E00\u81F4\u6027","children":[]}]},{"level":2,"title":"5. MinIO\u7684\u6570\u636E\u9AD8\u53EF\u9760","slug":"_5-minio\u7684\u6570\u636E\u9AD8\u53EF\u9760","children":[{"level":3,"title":"5.1 Erasure Code\u7EA0\u5220\u7801","slug":"_5-1-erasure-code\u7EA0\u5220\u7801","children":[]},{"level":3,"title":"5.2 Reed-Solomon code","slug":"_5-2-reed-solomon-code","children":[]},{"level":3,"title":"5.3 Bit Rot Protection\uFF1A","slug":"_5-3-bit-rot-protection","children":[]},{"level":3,"title":"5.4 \u6587\u4EF6\u7684\u4FEE\u590D","slug":"_5-4-\u6587\u4EF6\u7684\u4FEE\u590D","children":[]}]},{"level":2,"title":"\u53C2\u8003\u6587\u7AE0","slug":"\u53C2\u8003\u6587\u7AE0","children":[]}],"git":{"createdTime":1662131722000,"updatedTime":1662131722000,"contributors":[{"name":"zszdevelop","email":"zszdevelop@163.com","commits":1}]},"readingTime":{"minutes":11.76,"words":3529},"filePathRelative":"arch/minio/minio-concept.md","localizedDate":"2022\u5E749\u67082\u65E5"}');export{e as data};
