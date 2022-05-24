# 线程通信(等待通知wait/notify机制)

## 1. 等待/通知机制介绍

### 1.1 不使用等待/通知机制（轮询）

当两个线程之间存在**生产者和消费者关系**，也就是说**第一个线程（生产者）做相应的操作然后第二个线程（消费者）感知到了变化又进行相应的操作**

#### 1.1.1 轮询方式案例

```java
 while(value=desire){
        doSomething();
    }
```

假设这个value值就是第一个线程操作的结果，doSomething()是第二个线程要做的事，当满足条件value=desire后才执行doSomething()。

#### 1.1.2 轮询方式缺点

第二个语句不停过通过轮询机制来检测判断条件是否成立。如果**轮询时间的间隔太小会浪费CPU资源，轮询时间的间隔太大，就可能取不到自己想要的数据**。

所以这里就需要我们今天讲到的等待/通知（wait/notify）机制来解决这两个矛盾。

### 1.2 什么是等待/通知机制

### 1.2.1 等待/通知生活中的案例原型

等待/通知机制在我们生活中比比皆是，一个形象的例子就是厨师和服务员之间就存在等待/通知机制。

1. 厨师做完一道菜的时间是不确定的，所以菜到服务员手中的时间是不确定的；
2. 服务员就需要去“等待（wait）”；
3. 厨师把菜做完之后，按一下铃，这里的按铃就是“通知（nofity）”；
4. 服务员听到铃声之后就知道菜做好了，他可以去端菜了。

### 1.2.2 简介

等待/通知机制，是指一个线程A调用了对象O的wait()方法进入等待状态，而另一个线程B调用了对象O的notify()/notifyAll()方法，线程A收到通知后退出等待队列，进入可运行状态，进而执行后续操作。上诉两个线程通过对象O来完成交互，而对象上的**wait()方法**和**notify()/notifyAll()方法**的关系就如同开关信号一样，用来完成等待方和通知方之间的交互工作。

### 1.3  等待/通知机制的相关方法

| 方法名称        | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| notify()        | 随机唤醒等待队列中等待**同一共享资源的“一个线程”**，并使该线程退出等待队列，进入可运行状态，也就是**notify()方法仅通知“一个线程”** |
| notifyAll()     | 使所有正在等待队列中等待同一共享资源的 **“全部线程”** 退出等待队列，进入可运行状态。此时，优先级最高的那个线程最先执行，但也有可能是随机执行，这取决于JVM虚拟机的实现 |
| wait()          | 使调用该方法的线程释放共享资源锁，然后从运行状态退出，进入等待队列，直到被再次唤醒 |
| wait(long)      | 超时等待一段时间，这里的参数时间是毫秒，也就是等待长达n毫秒，如果没有通知就超时返回 |
| wait(long，int) | 对于超时时间更细力度的控制，可以达到纳秒                     |

## 2. 等待/通知机制的实现

### 2.1 实现案例

MyList.java

```java
public class MyList {
	private static List<String> list = new ArrayList<String>();

	public static void add() {
		list.add("anyString");
	}

	public static int size() {
		return list.size();
	}

}
```

ThreadA.java

```java
public class ThreadA extends Thread {

	private Object lock;

	public ThreadA(Object lock) {
		super();
		this.lock = lock;
	}

	@Override
	public void run() {
		try {
			synchronized (lock) {
				if (MyList.size() != 5) {
					System.out.println("wait begin "
							+ System.currentTimeMillis());
					lock.wait();
					System.out.println("wait end  "
							+ System.currentTimeMillis());
				}
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}

```

ThreadB.java

```java
public class ThreadB extends Thread {
	private Object lock;

	public ThreadB(Object lock) {
		super();
		this.lock = lock;
	}

	@Override
	public void run() {
		try {
			synchronized (lock) {
				for (int i = 0; i < 10; i++) {
					MyList.add();
					if (MyList.size() == 5) {
						lock.notify();
						System.out.println("已发出通知！");
					}
					System.out.println("添加了" + (i + 1) + "个元素!");
					Thread.sleep(1000);
				}
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}

```

Run.java

```java
public class Run {

	public static void main(String[] args) {

		try {
			Object lock = new Object();

			ThreadA a = new ThreadA(lock);
			a.start();

			Thread.sleep(50);

			ThreadB b = new ThreadB(lock);
			b.start();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}

}

```

输出的结果

```
2019-09-21 00:48:52 JRebel:  
wait begin 1568998132460
添加了1个元素!
添加了2个元素!
添加了3个元素!
添加了4个元素!
已发出通知！
添加了5个元素!
添加了6个元素!
添加了7个元素!
添加了8个元素!
添加了9个元素!
添加了10个元素!
wait end  1568998142540
```

### 2.2 synchronized关键字在线程通信中的作用

**synchronized关键字**可以将任何一个**Object对象作为同步对象**看待，而**java为每个Object 都实现了等待/通知（wait/notify）机制的相关方法**，他们必须用synchronized关键字同步的Object的临界区内。

- 通过调用wait()方法可以使处于临界区内的线程进入等待状态，同时释放被同步对象的锁
- 而notify()方法可以唤醒一个因调用wait操作而处于阻塞状态中的线程，使其进入就绪状态。
- 被重新唤醒的线程会视图重新获得临界区的控制权也就是锁，并继续执行wait方法之后的代码。如果发出notify操作时没有处于阻塞状态中的线程，那么该命令会被忽略。

## 3.相关知识点

### 3.1 notify()锁不释放

当方法wait()被执行后，锁自动被释放，但执行玩notify()方法后，锁不会自动释放。**必须执行完notify()方法所在的synchronized代码块**后才释放。

### 3.2 Thread.join()

#### 3.2.1 Thread.join()使用背景

在很多情况下，主线程生成并起动了子线程，如果子线程里要进行大量的耗时的运算，主线程往往将于子线程之前结束，但是如果主线程处理完其他的事务后，需要用到子线程的处理结果，也就是**主线程需要等待子线程执行完成之后再结束，这个时候就要用到join()方法了。另外，一个线程需要等待另一个线程也需要用到join()方法。**

Thread类除了提供join()方法之外，还提供了join(long millis)、join(long millis, int nanos)两个具有超时特性的方法。这两个超时方法表示，如果线程thread在指定的超时时间没有终止，那么将会从该超时方法中返回。

#### 3.2.2 子线程执行完主线程才退出

```
public class Test {

	public static void main(String[] args) throws InterruptedException {

		MyThread threadTest = new MyThread();
		threadTest.start();

		//Thread.sleep(?);//因为不知道子线程要花的时间这里不知道填多少时间
		threadTest.join();
		System.out.println("我想当threadTest对象执行完毕后我再执行");
	}
	static public class MyThread extends Thread {

		@Override
		public void run() {
			System.out.println("我想先执行");
		}

	}
}

```

上面的代码仅仅加上了一句：threadTest.join();。在这里join方法的作用就是**主线程需要等待子线程执行完成之后再结束**。