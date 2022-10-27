import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as e,d as s}from"./app.8565f92b.js";const l={},d=s(`<h1 id="\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60\u4F7F\u7528\u793A\u4F8B</h1><p>\u5177\u4F53\u4F7F\u7528\u793A\u4F8B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Test {
     public static void main(String[] args) {   
         ThreadPoolExecutor executor = new ThreadPoolExecutor(5, 10, 200, TimeUnit.MILLISECONDS,
                 new ArrayBlockingQueue&lt;Runnable&gt;(5));
          
         for(int i=0;i&lt;15;i++){
             MyTask myTask = new MyTask(i);
             executor.execute(myTask);
             System.out.println(&quot;\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A&quot;+executor.getPoolSize()+&quot;\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A&quot;+
             executor.getQueue().size()+&quot;\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A&quot;+executor.getCompletedTaskCount());
         }
         executor.shutdown();
     }
}
 
 
class MyTask implements Runnable {
    private int taskNum;
     
    public MyTask(int num) {
        this.taskNum = num;
    }
     
    @Override
    public void run() {
        System.out.println(&quot;\u6B63\u5728\u6267\u884Ctask &quot;+taskNum);
        try {
            Thread.currentThread().sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(&quot;task &quot;+taskNum+&quot;\u6267\u884C\u5B8C\u6BD5&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A1\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A2\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A3\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 1
\u6B63\u5728\u6267\u884Ctask 2
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A4\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 3
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A1\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A2\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A3\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A4\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A5\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 4
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A6\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A7\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 11
\u6B63\u5728\u6267\u884Ctask 10
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A8\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 12
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A9\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 13
\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u76EE\uFF1A10\uFF0C\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A5\uFF0C\u5DF2\u6267\u884C\u73A9\u522B\u7684\u4EFB\u52A1\u6570\u76EE\uFF1A0
\u6B63\u5728\u6267\u884Ctask 14
task 1\u6267\u884C\u5B8C\u6BD5
task 0\u6267\u884C\u5B8C\u6BD5
\u6B63\u5728\u6267\u884Ctask 5
\u6B63\u5728\u6267\u884Ctask 6
task 12\u6267\u884C\u5B8C\u6BD5
task 11\u6267\u884C\u5B8C\u6BD5
\u6B63\u5728\u6267\u884Ctask 8
task 10\u6267\u884C\u5B8C\u6BD5
\u6B63\u5728\u6267\u884Ctask 9
task 3\u6267\u884C\u5B8C\u6BD5
task 2\u6267\u884C\u5B8C\u6BD5
task 4\u6267\u884C\u5B8C\u6BD5
task 13\u6267\u884C\u5B8C\u6BD5
\u6B63\u5728\u6267\u884Ctask 7
task 14\u6267\u884C\u5B8C\u6BD5
task 5\u6267\u884C\u5B8C\u6BD5
task 6\u6267\u884C\u5B8C\u6BD5
task 9\u6267\u884C\u5B8C\u6BD5
task 7\u6267\u884C\u5B8C\u6BD5
task 8\u6267\u884C\u5B8C\u6BD5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u6267\u884C\u7ED3\u679C\u53EF\u4EE5\u770B\u51FA\uFF0C\u5F53\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u7684\u6570\u76EE\u5927\u4E8E5\u65F6\uFF0C\u4FBF\u5C06\u4EFB\u52A1\u653E\u5165\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u91CC\u9762\uFF0C\u5F53\u4EFB\u52A1\u7F13\u5B58\u961F\u5217\u6EE1\u4E86\u4E4B\u540E\uFF0C\u4FBF\u521B\u5EFA\u65B0\u7684\u7EBF\u7A0B\u3002\u5982\u679C\u4E0A\u9762\u7A0B\u5E8F\u4E2D\uFF0C\u5C06for\u5FAA\u73AF\u4E2D\u6539\u6210\u6267\u884C20\u4E2A\u4EFB\u52A1\uFF0C\u5C31\u4F1A\u629B\u51FA\u4EFB\u52A1\u62D2\u7EDD\u5F02\u5E38\u4E86\u3002</p>`,6),a=[d];function v(r,u){return i(),e("div",null,a)}const m=n(l,[["render",v],["__file","java-thread-y-threadpool-example.html.vue"]]);export{m as default};
