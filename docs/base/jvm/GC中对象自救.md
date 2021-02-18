# GC中对象自救

即使在可达性分析算法中, 被判定为不可达的对象, 也并非是'非死不可' 的, 这时候他们暂处于'缓刑' 阶段, 要真正宣告一个对象死亡, 至少要经历两次标记过程: 



1. 如果**对象失去引用(在进行可达性分析后发现没有与 GC Roots 相连接的引用链), 并且该对象的 finalize()方法未调用过**, 该对象将会被第一次标记



2. 如果这个对象已经被标记了, 那么这个对象会被放入 ReferenceQueue 队列中, 由 FinalizeThread 线程去执行, 最终会调用该对象的 finalize() 方法. 这里所谓的'执行' 并不会保证 finalize() 方法调用结束,为如果 finalize() 方法执行缓慢, 极端情况下可能会导致 ReferenceQueue 队列中其他的对象永远处于等待, 甚至导致 GC 系统崩溃.

**finalize() 方法是对象逃脱死亡命运的最后一次机会**, 调用 finalize() 方法后,GC 系统将对 ReferenceQueue 队列中的对象进行第二次标记, 如果**对象要在 finalize() 方法中成功自救, 只要重新与引用链建立引用即可, 如:把当前对象( this )赋值给某个类变量或者对象的成员变量**, 那么在第二次标记时它将被移除出 '即将回收' 的集合, 这样该对象就完成了一次自救; **如果该对象被第二次标记, 那就真的要被回收了**.    



```java
public class FinalizeEscapeGC {
	// 用于自救的类变量
	private static FinalizeEscapeGC SAVA_HOOK;

	@Override
	protected void finalize() throws Throwable {
		super.finalize();
		System.out.println("当前对象: " + this + " 在 " + Thread.currentThread() + " 线程执行 finalize() 方法");
		// 把当前对象( this )赋值给某个类变量, 重新与引用链建立引用
		FinalizeEscapeGC.SAVA_HOOK = this;
	}

	public static void main(String[] args) throws Throwable {
		// 创建一个对象 FinalizeEscapeGC@3654919e, SAVA_HOOK 引用该对象
		SAVA_HOOK = new FinalizeEscapeGC();

		System.out.println("第一次自救");
		SAVA_HOOK = null; // 失去引用
		System.gc(); // 运行垃圾回收器
		Thread.sleep(100); // 让 GC 相关线程先走
		if (SAVA_HOOK != null) {
			System.out.println(SAVA_HOOK + " 对象自救成功");
		} else {
			System.out.println("对象已被回收");
		}

		System.out.println("\n第二次自救");
		SAVA_HOOK = null; // 失去引用
		System.gc(); // 运行垃圾回收器
		Thread.sleep(100); // 让 GC 相关线程先走
		if (SAVA_HOOK != null) {
			System.out.println(SAVA_HOOK + " 对象自救成功");
		} else {
			System.out.println("对象已被回收");
		}
	}
}
```

运行结果

```
运行结果:

第一次自救
当前对象: FinalizeEscapeGC@3654919e 在 Thread[Finalizer,8,system] 线程执行 finalize() 方法
FinalizeEscapeGC@3654919e 对象自救成功

第二次自救
对象已被回收
```

### 为什么第二次自救失败？

**另外一个值得注意的地方是, 代码中两次试图实现自救,**

**运行结果却是: 一次自救成功, 一次失败**

**这是因为任何对象的 finalize() 方法都只会被调用一次, 如果对象面临下一次 GC, 它的 finalize() 方法不会被再次执行, 因此第二次自救失败了.**



###Finalizer 线程

Finalizer 线程, 其优先级为 8, 用于在 GC 前, 执行对象的 finalize() 方法

关于 Finalizer 线程:

JVM 在 GC 时会将失去引用的对象包装成 java.lang.ref.Finalizer 对象（java.lang.ref.Reference 抽象类的实现），并放入ReferenceQueue，由 Finalizer$FinalizeThread 线程来处理

