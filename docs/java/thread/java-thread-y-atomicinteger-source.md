# 原子类AtomicInteger源码解析

## 1. 核心原理

### 1.1 操作对象value

AtomicInteger用于实现通过原子的方式更新单个变量。AtomicInteger 中保存了一个核心字段value，它就代表了Atomiclnteger 的当前实际取值，所有的方法都是围绕该值进行的。

### 1.2 **偏移量**valueOffset

**属性valueOffset，它保存着value 字段在Atomiclnteger 对象中的偏移量。Unsafe中的CAS方法都是通过字段的偏移量来操作字段的。**

## 2. 初始代码

```java
/**
 * 内部的value属性，它就代表了Atomiclnteger 的当前实际取值。
 * 所有的方法都是围绕该值进行的
 */
private volatile int value;

/**
 * 使用给定值初始化value
 *
 * @param initialValue 给定值
 */
public AtomicInteger(int initialValue) {
    value = initialValue;
}

/**
 * 初始化value值为0
 */
public AtomicInteger() {
}

/**
 * 内部实际上依赖于Unsafe类的方法，对value值进行操作
 */
private static final Unsafe unsafe = Unsafe.getUnsafe();
/**
 * value字段的偏移量
 */
private static final long valueOffset;

static {
    try {
        //初始化value字段的偏移量
        valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
    } catch (Exception ex) {
        throw new Error(ex);
    }
}

```

## 3. 重要方法

```java
/**
 * 获取当前最新值
 *
 * @return 当前最新值
 */
public final int get() {
    return value;
}

/**
 * 设置给定新值
 *
 * @param newValue 新值
 */
public final void set(int newValue) {
    value = newValue;
}

/**
 * 原子性的将当前值设为给定新值，返回旧值
 *
 * @param newValue 新值
 * @return 旧值
 */
public final int getAndSet(int newValue) {
    return unsafe.getAndSetInt(this, valueOffset, newValue);
}


/**
 * 如果当前值等于预期值，则以原子方式将该值设置为给定的新值
 *
 * @param expect 预期值
 * @param update the new value
 * @return true 更新成功 false 更新失败
 */
public final boolean compareAndSet(int expect, int update) {
    return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
}

/**
 * 原子性的将当前值加1，返回旧值
 *
 * @return 旧值
 */
public final int getAndIncrement() {
    return unsafe.getAndAddInt(this, valueOffset, 1);
}


/**
 * 原子性的将当前值减1，返回旧值
 *
 * @return 返回旧值
 */
public final int getAndDecrement() {
    return unsafe.getAndAddInt(this, valueOffset, -1);
}


/**
 * 原子性的将当前值增加delta,返回旧值
 *
 * @param delta 增加的值
 * @return 旧值
 */
public final int getAndAdd(int delta) {
    return unsafe.getAndAddInt(this, valueOffset, delta);
}


/**
 * 原子性的将当前值加1，返回新值
 *
 * @return 更新后的值
 */
public final int incrementAndGet() {
    return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
}


/**
 * 原子性的将当前值减1，返回新值
 *
 * @return 更新后的值
 */
public final int decrementAndGet() {
    return unsafe.getAndAddInt(this, valueOffset, -1) - 1;
}


/**
 * 原子性的将当前值增加delta，返回新值
 *
 * @param delta 增加的值
 * @return 更新后的值
 */
public final int addAndGet(int delta) {
    return unsafe.getAndAddInt(this, valueOffset, delta) + delta;
}


/**
 1. 最终会设置成newValue，使用lazySet设置值后，可能导致其他线程在之后的一小段时间内还是可以读到旧的值。
 2. 关于该方法的更多信息可以参考并发编程网翻译的一篇文章《AtomicLong.lazySet是如何工作的？》，文章地址是“http://ifeve.com/how-does-atomiclong-lazyset-work/”。
 3.  4. @param newValue 新值
 */
public final void lazySet(int newValue) {
    unsafe.putOrderedInt(this, valueOffset, newValue);
}

```

**可以看到，里面的方法都是调用的Unsafe类方法，进行的CAS操作。**

## 4. char、float和double等的CAS操作怎么办

Atomic包实际上只提供了3种基本类型的原子更新：int、long、boolean，其中boolean也是转换为int的0、1进行更新的，实际上并没有char、float和double等的CAS操作，实际上char、 float、double都可以转换为int或者long在进行操作，如果DoubleAdder就是采用Double.doubleToRawLongBits将double转换为long类型的值在进行操作。

```java
/*Unsafe只提供了3种CAS方法.*/
public final native boolean compareAndSwapObject(Object var1, long var2, Object var4, Object var5);

public final native boolean compareAndSwapInt(Object var1, long var2, int var4, int var5);

public final native boolean compareAndSwapLong(Object var1, long var2, long var4, long var6);

/*AtomicBoolean源码中，它是先把Boolean转换成int类型，再使用compareAndSwapInt进行CAS操作*/
public final boolean compareAndSet(boolean expect, boolean update) {
    int e = expect ? 1 : 0;
    int u = update ? 1 : 0;
    return unsafe.compareAndSwapInt(this, valueOffset, e, u);
}
```

## 参考文章

[Java AtomicInteger和AtomicStampedReference源码深度解析](https://blog.csdn.net/weixin_43767015/article/details/124447418)

