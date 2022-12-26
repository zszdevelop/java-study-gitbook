import{_ as e,W as i,X as n,a0 as a}from"./framework-0cf5f349.js";const s={},d=a(`<h1 id="如何发现、预防、解决死锁" tabindex="-1"><a class="header-anchor" href="#如何发现、预防、解决死锁" aria-hidden="true">#</a> 如何发现、预防、解决死锁</h1><h2 id="_1-死锁的定义" tabindex="-1"><a class="header-anchor" href="#_1-死锁的定义" aria-hidden="true">#</a> 1. 死锁的定义</h2><p>“死锁是指两个或两个以上的进程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象，若无外力作用，它们都将无法推进下去。”</p><p>竞争的资源可以是：锁、网络连接、通知事件，磁盘、带宽，以及一切可以被称作“资源”的东西。</p><h2 id="_2-举例" tabindex="-1"><a class="header-anchor" href="#_2-举例" aria-hidden="true">#</a> 2. 举例</h2><p>如果此时有一个线程A，按照先锁a再获得锁b的顺序获得锁，而在此时又有一个线程B，按照先锁b再锁a的顺序获得锁</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311231729573.png" alt="image-20200311231729573" tabindex="0" loading="lazy"><figcaption>image-20200311231729573</figcaption></figure><p>我们可以用一段代码来表示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void main(String[] args) {
    final Object a = new Object();
    final Object b = new Object();
    Thread threadA = new Thread(new Runnable() {
        public void run() {
            synchronized (a) {
                try {
                    System.out.println(&quot;now i in threadA-locka&quot;);
                    Thread.sleep(1000l);
                    synchronized (b) {
                        System.out.println(&quot;now i in threadA-lockb&quot;);
                    }
                } catch (Exception e) {
                    // ignore
                }
            }
        }
    });

    Thread threadB = new Thread(new Runnable() {
        public void run() {
            synchronized (b) {
                try {
                    System.out.println(&quot;now i in threadB-lockb&quot;);
                    Thread.sleep(1000l);
                    synchronized (a) {
                        System.out.println(&quot;now i in threadB-locka&quot;);
                    }
                } catch (Exception e) {
                    // ignore
                }
            }
        }
    });

    threadA.start();
    threadB.start();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到执行结果如下：</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311232054845.png" alt="image-20200311232054845" tabindex="0" loading="lazy"><figcaption>image-20200311232054845</figcaption></figure><p>很明显，程序执行停滞了</p><h2 id="_2-死锁检测" tabindex="-1"><a class="header-anchor" href="#_2-死锁检测" aria-hidden="true">#</a> 2. 死锁检测</h2><p>主要介绍两种死锁检查工具</p><h2 id="_2-1-jstack命令" tabindex="-1"><a class="header-anchor" href="#_2-1-jstack命令" aria-hidden="true">#</a> 2.1 Jstack命令</h2><p>Jstack 是java 虚拟机自带的一种堆栈跟踪工具。jstack 用于<strong>打印</strong>出给定的java 进程ID或core file 或远程调试服务的<strong>java堆栈信息</strong>。Jstack工具可以用于生成Java虚拟机当前时刻的线程快照，<strong>线程快照</strong>是当前java虚拟机内每一条线程<strong>正在执行</strong>的<strong>方法堆栈</strong>的集合，生成线程快照的主要目的是定位线程出现长时间停顿原因，如<code>线程间死锁</code>、<code>死循环</code>、<code>请求外部资源导致的长时间等待</code>等。线程出现停顿的时候通过jstack来查看各个线程的调用堆栈，就可以知道没有相应的线程到底在后台做了什么事情，或者等待什么资源</p><p>首先，我们通过jps确定当前执行任务的进程号:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jonny@~$ jps
597
1370 JConsole
1362 AppMain
1421 Jps
1361 Launcher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以确定任务进程号1362，然后执行jstack命令查看当前进程堆栈信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jonny@~$ jstack -F 1362
Attaching to process ID 1362, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 23.21-b01
Deadlock Detection:

Found one Java-level deadlock:
=============================

&quot;Thread-1&quot;:
  waiting to lock Monitor@0x00007fea1900f6b8 (Object@0x00000007efa684c8, a java/lang/Object),
  which is held by &quot;Thread-0&quot;
&quot;Thread-0&quot;:
  waiting to lock Monitor@0x00007fea1900ceb0 (Object@0x00000007efa684d8, a java/lang/Object),
  which is held by &quot;Thread-1&quot;

Found a total of 1 deadlock.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，进程的确存在死锁，两个线程分别在等待对方持有的Object对象</p><h3 id="_2-2-jconsole-工具" tabindex="-1"><a class="header-anchor" href="#_2-2-jconsole-工具" aria-hidden="true">#</a> 2.2 JConsole 工具</h3><p>Jconsole 是 Jdk自带的监控工具，在Jdk/bin 目录下可以找到，他用户连接正在运行的本地或者远程的JVM，对运行在Java 应用程序的资源消耗和性能进行监控，并画出大量的图表，提供强大的可视化界面。而且本身占用的服务器内存很小</p><p>我们在命令行中敲入jconsole命令，会自动弹出以下对话框，选择进程1362，并点击“<strong>链接</strong>”</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311234432625.png" alt="image-20200311234432625" tabindex="0" loading="lazy"><figcaption>image-20200311234432625</figcaption></figure><p>进入锁检查的进程后，选择“线程”选项卡，并点击“检查死锁”</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311234702867.png" alt="image-20200311234702867" tabindex="0" loading="lazy"><figcaption>image-20200311234702867</figcaption></figure><p>我们可以看到</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200311234651568.png" alt="image-20200311234651568" tabindex="0" loading="lazy"><figcaption>image-20200311234651568</figcaption></figure><p>可以看到进程中存在死锁</p><h2 id="_2-预防与解决死锁" tabindex="-1"><a class="header-anchor" href="#_2-预防与解决死锁" aria-hidden="true">#</a> 2. 预防与解决死锁</h2><p>破坏死锁产生的四个必要条件</p><h3 id="_2-1-破坏互斥条件" tabindex="-1"><a class="header-anchor" href="#_2-1-破坏互斥条件" aria-hidden="true">#</a> 2.1 破坏互斥条件</h3><p>这个条件我们没有办法破坏，因为我们用锁本来就是想让他们互斥的（临界资源需要互斥访问）</p><h3 id="_2-2-破坏请求与保持条件" tabindex="-1"><a class="header-anchor" href="#_2-2-破坏请求与保持条件" aria-hidden="true">#</a> 2.2 破坏请求与保持条件</h3><p>一次性申请所有的资源</p><h3 id="_2-3-破坏不可剥夺条件" tabindex="-1"><a class="header-anchor" href="#_2-3-破坏不可剥夺条件" aria-hidden="true">#</a> 2.3 破坏不可剥夺条件</h3><p>占用部分资源的线程进一步申请其他资源时，如果申请不到，可以<strong>主动释放他占有的资源</strong></p><h3 id="_2-4-破坏循环等待条件" tabindex="-1"><a class="header-anchor" href="#_2-4-破坏循环等待条件" aria-hidden="true">#</a> 2.4 破坏循环等待条件</h3><p>靠按顺序申请资源来预防，按某一顺序申请资源，释放资源则反序释放。破坏循环等待条件</p>`,40),l=[d];function r(c,t){return i(),n("div",null,l)}const v=e(s,[["render",r],["__file","java-thread-y-deadlock.html.vue"]]);export{v as default};
