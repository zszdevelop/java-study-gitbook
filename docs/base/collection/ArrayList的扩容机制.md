# ArrayList 的扩容机制

## 1.如何实现扩容

底层主要是这三个私有方法配合实现`grow()`,`grow(int minCapacity)`,`newCapacity(int minCapacity)`扩容。**最终是调用了`Arrays.copyOf`方法来进行扩充数组容量的**。默认情况下，新的容量是**原容量的1.5倍**。

```
// 扩容一个
private Object[] grow() {
	return grow(size + 1);
}

// 保证扩容到期望容量minCapacity及以上
private Object[] grow(int minCapacity) {
    return elementData = Arrays.copyOf(elementData,
                                       newCapacity(minCapacity));
}

// 根据期望容量minCapacity计算实际需要扩容的容量
private int newCapacity(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length; // 得到旧容量
    int newCapacity = oldCapacity + (oldCapacity >> 1); // 设置新容量为旧容量的1.5倍
    if (newCapacity - minCapacity <= 0) { // 如果新容量仍然小于期望容量
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) // 如果是使用的默认容量
            return Math.max(DEFAULT_CAPACITY, minCapacity); // 取默认容量和期望容量较大值返回
        if (minCapacity < 0) // overflow // 检查期望容量是否越界（int 的范围）
            throw new OutOfMemoryError();
        return minCapacity; // 返回期望容量
    }
    // 如果新容量大于期望容量，判断一下新容量是否越界
    return (newCapacity - MAX_ARRAY_SIZE <= 0)
        ? newCapacity
        : hugeCapacity(minCapacity);
}

```

## 2. 手动扩容

grow方法主要用于实现自动扩容的，而用户也可以通过调用以下方法实现手动扩容：

```
public void ensureCapacity(int minCapacity) {
    if (minCapacity > elementData.length
        && !(elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
             && minCapacity <= DEFAULT_CAPACITY)) {
        modCount++;
        grow(minCapacity);
    }
}

```

为什么需要手动扩容？试想一下，如果用户已经知道即将存入大量的元素，比如目前有20个元素，即将存入2000个。那这个时候使用自动扩容就会扩容多次。而手动扩容可以一次性扩容到2000，可以提高性能。