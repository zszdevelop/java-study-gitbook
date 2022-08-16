import { o as openBlock, c as createElementBlock, e as createStaticVNode } from "./app.da716ebc.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B</h1><p>\u5177\u4F53\u4F7F\u7528\u793A\u4F8B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Test {\n     public static void main(String[] args) {   \n         ThreadPoolExecutor executor = new ThreadPoolExecutor(5, 10, 200, TimeUnit.MILLISECONDS,\n                 new ArrayBlockingQueue&lt;Runnable&gt;(5));\n          \n         for(int i=0;i&lt;15;i++){\n             MyTask myTask = new MyTask(i);\n             executor.execute(myTask);\n             System.out.println(&quot;\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A&quot;+executor.getPoolSize()+&quot;\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A&quot;+\n             executor.getQueue().size()+&quot;\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A&quot;+executor.getCompletedTaskCount());\n         }\n         executor.shutdown();\n     }\n}\n \n \nclass MyTask implements Runnable {\n    private int taskNum;\n     \n    public MyTask(int num) {\n        this.taskNum = num;\n    }\n     \n    @Override\n    public void run() {\n        System.out.println(&quot;\u6B63\u5728\u6267\u884Ctask &quot;+taskNum);\n        try {\n            Thread.currentThread().sleep(4000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n        System.out.println(&quot;task &quot;+taskNum+&quot;\u6267\u884C\u5B8C\u6BD5&quot;);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A1\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A2\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A3\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 1\n\u6B63\u5728\u6267\u884Ctask 2\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A4\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 3\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A1\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A2\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A3\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A4\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 4\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A6\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A7\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 11\n\u6B63\u5728\u6267\u884Ctask 10\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A8\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 12\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A9\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 13\n\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A10\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\n\u6B63\u5728\u6267\u884Ctask 14\ntask 1\u6267\u884C\u5B8C\u6BD5\ntask 0\u6267\u884C\u5B8C\u6BD5\n\u6B63\u5728\u6267\u884Ctask 5\n\u6B63\u5728\u6267\u884Ctask 6\ntask 12\u6267\u884C\u5B8C\u6BD5\ntask 11\u6267\u884C\u5B8C\u6BD5\n\u6B63\u5728\u6267\u884Ctask 8\ntask 10\u6267\u884C\u5B8C\u6BD5\n\u6B63\u5728\u6267\u884Ctask 9\ntask 3\u6267\u884C\u5B8C\u6BD5\ntask 2\u6267\u884C\u5B8C\u6BD5\ntask 4\u6267\u884C\u5B8C\u6BD5\ntask 13\u6267\u884C\u5B8C\u6BD5\n\u6B63\u5728\u6267\u884Ctask 7\ntask 14\u6267\u884C\u5B8C\u6BD5\ntask 5\u6267\u884C\u5B8C\u6BD5\ntask 6\u6267\u884C\u5B8C\u6BD5\ntask 9\u6267\u884C\u5B8C\u6BD5\ntask 7\u6267\u884C\u5B8C\u6BD5\ntask 8\u6267\u884C\u5B8C\u6BD5\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u6267\u884C\u7ED3\u679C\u53EF\u4EE5\u770B\u51FA\uFF0C\u5F53\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u7684\u6570\u76EE\u5927\u4E8E5\u65F6\uFF0C\u4FBF\u5C06\u4EFB\u52A1\u653E\u5165\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u91CC\u9762\uFF0C\u5F53\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u6EE1\u4E86\u4E4B\u540E\uFF0C\u4FBF\u521B\u5EFA\u65B0\u7684\u7EBF\u7A0B\u3002\u5982\u679C\u4E0A\u9762\u7A0B\u5E8F\u4E2D\uFF0C\u5C06for\u5FAA\u73AF\u4E2D\u6539\u6210\u6267\u884C20\u4E2A\u4EFB\u52A1\uFF0C\u5C31\u4F1A\u629B\u51FA\u4EFB\u52A1\u62D2\u7EDD\u5F02\u5E38\u4E86\u3002</p>', 6);
const _hoisted_7 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_7);
}
var ________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B.html.vue"]]);
export { ________html as default };
