# JavaAgent探针原理JVMTI

### 1. JVMTI

JVMTI （JVM Tool Interface）是java虚拟机对外提供的Native编程接口，通过JVMTI,外部进程可以获取到运行时JVM的诸多信息，比如线程，GC等。

## 2. Agent

Agent是一个运行在目标JVM的特定程序，它的职责是负责从目标JVM中获取数据，然后将数据传递给外部进程。