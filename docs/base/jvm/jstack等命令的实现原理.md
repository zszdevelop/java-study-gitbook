# jstack等命令的实现原理

## 1. 实现原理

1. jstack等命令会与jvm进程建立socket连接
2. 发送对应的指令（jstack发送了threaddump执行）
3. 然后再读取返回的数据

## 2. jstack使用场景

**场景：**Java应用持续占用很高CPU，需要排查一下

**模拟：**造个场景简单模拟下，没什么实际意义，仅作演示。我启动了100个线程持续访问 [我的博客](https://chenyongjun.vip/)，博客部署在Ubuntu 16.04上，是一个简单的Spring Boot应用，以jar包直接运行的。

`top` 命令查下系统运行情况，进程31951占用CPU 80.6%。

![image-20200317215513035](/Users/zsz/Library/Application Support/typora-user-images/image-20200317215513035.png)

`jps -l` 确认一下，31951就是博客的进程ID，或 `cat /proc/31951/cmdline` 看下进程的启用命令。

```
root@iZ94dcq8q6jZ:~# jps -l
28416 sun.tools.jps.Jps
31951 blog.jar
```

`top -Hp 31951` 以线程模式查看下进程31951的所有线程情况

![image-20200317215555775](/Users/zsz/Library/Application Support/typora-user-images/image-20200317215555775.png)

假设想看下第二个线程31998的情况，31998是操作系统的线程ID，先转成16进制。

```js
printf '%x' 31998 #值为7cfe
```

获取该线程的信息(匹配7cf3后取20行差不多)

```js
jstack 31951 | grep 7cfe -A 20
```

其中部分数据如下：

```js
"Tomcat JDBC Pool Cleaner[11483240:1532362388783]" #31 daemon prio=5 os_prio=0 tid=0x0a29dc00 nid=0x7cfe in Object.wait() [0xa2a69000]
   java.lang.Thread.State: TIMED_WAITING (on object monitor)
    at java.lang.Object.wait(Native Method)
    at java.util.TimerThread.mainLoop(Timer.java:552)
    - locked <0xaadc5a60> (a java.util.TaskQueue)
    at java.util.TimerThread.run(Timer.java:505)
```

注意：nid=0x7cfe中的nid指native id，是OS中线程ID，对应上面31998线程的16进制值7cfe；tid为Java中线程的ID。

至于如何利用jstack的数据分析线程情况，可以看看 [如何使用jstack分析线程状态](https://www.jianshu.com/p/6690f7e92f27) 和 [jstack](http://www.tianshouzhi.com/api/tutorials/jvm/351)。

## 3. jstack实现原理

先以一段简单代码打印threaddump，和stack命令效果一样，下面的类基本来自 **tools.jar**。

```js
@Test
public void jstack() throws Exception {
    RuntimeMXBean runtimeMXBean = ManagementFactory.getRuntimeMXBean();
    String pid = runtimeMXBean.getName().split("@")[0];

    VirtualMachine virtualMachine = VirtualMachine.attach(pid);
    HotSpotVirtualMachine hotSpotVirtualMachine = (HotSpotVirtualMachine) virtualMachine;

    InputStream inputStream = hotSpotVirtualMachine.remoteDataDump(new String[]{});
    String threadDump = IOUtils.toString(inputStream, "utf8"); // IOUtils from commons-io
    System.out.println(threadDump);
    virtualMachine.detach();
}
```

打印的部分数据如下：

```js
Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.101-b13 mixed mode):

"Attach Listener" #10 daemon prio=9 os_prio=31 tid=0x00007f816293c800 nid=0x5b0f waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Service Thread" #9 daemon prio=9 os_prio=31 tid=0x00007f8162827000 nid=0x5303 runnable [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"C1 CompilerThread3" #8 daemon prio=9 os_prio=31 tid=0x00007f8164834800 nid=0x5103 waiting on condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE
```

核心的**hotSpotVirtualMachine.remoteDataDump()**代码：

```js
public InputStream remoteDataDump(Object... var1) throws IOException {
    return this.executeCommand("threaddump", var1);
}

private InputStream executeCommand(String var1, Object... var2) throws IOException {
    try {
        return this.execute(var1, var2);
    } catch (AgentLoadException var4) {
        throw new InternalError("Should not get here", var4);
    }
}
```

很多命令都是通过 **executeCommand** 来实现的，例如：datadump、threaddump、dumpheap、inspectheap、jcmd等，而最终的execute()在Mac机器上是由 [BsdVirtualMachine](https://github.com/frohoff/jdk8u-jdk/blob/master/src/solaris/classes/sun/tools/attach/BsdVirtualMachine.java) 类来完成。

为了便于阅读，源码我有较大删减，看看execute()中的原英文注释即可。

```js
/**
 * Execute the given command in the target VM.
 */
InputStream execute(String cmd, Object ... args) throws AgentLoadException, IOException {
    // did we detach?
    String p;
    synchronized (this) {
        if (this.path == null) {
            throw new IOException("Detached from target VM");
        }
        p = this.path;
    }

    // create UNIX socket
    int s = socket();

    // connect to target VM
    connect(s, p);

    IOException ioe = null;

    // connected - write request
    // <ver> <cmd> <args...>
    writeString(s, PROTOCOL_VERSION);
    writeString(s, cmd);

    for (int i=0; i<3; i++) {
        if (i < args.length && args[i] != null) {
            writeString(s, (String)args[i]);
        } else {
            writeString(s, "");
        }
    }

    // Create an input stream to read reply
    SocketInputStream sis = new SocketInputStream(s);

    // Read the command completion status
    int completionStatus = readInt(sis);

    // Return the input stream so that the command output can be read
    return sis;
}
```

代码是最好的手册，通过代码可以知道：**jstack等命令会与jvm进程建立socket连接，发送对应的指令(jstack发送了threaddump指令)，然后再读取返回的数据**。