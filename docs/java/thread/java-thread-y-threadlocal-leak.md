# ThreadLocal使用不当导致内存泄漏

线程池的一个线程使用完 Threadlocal 对象之后，由于线程池中的线程不会退出，线程池中的线程池存在，同时ThreadLocal变量也会存在，占用内存，造成OOM溢出。

## 参考文章

[多图深入分析ThreadLocal原理](https://blog.csdn.net/xlgen157387/article/details/78297568)

[Java多线程编程-（9）-ThreadLocal造成OOM内存溢出案例演示与原理分析](https://blog.csdn.net/xlgen157387/article/details/78298840)

