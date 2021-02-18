# Mockito原理

带着问题针对性研究，才是学习框架最好的方法

## 1.提出问题

1. mock(List.class) 

   是怎么从List.class这个接口中构建List对象的？

2. when(mockList.size()).thenReturn(20)

   如何干预mock对象的执行，插桩返回20？

3. verify(mockList,never()).add(10)

   这种验证方式是怎么实现的？

## 2.原理

###2.1 Mock原理

我们先看下看mock一个对象需要做什么

1. 首先需要知道mock的对象类型，这样才能生成这个类型的对象
2. 实例化这个类型的对象
   1. 如果是抽象类或者接口，继承后给这些方法返回一个空实现
3. 向上转型成目标类返回

**总结**：给定要mock类型，生成一个继承这个类型的类，实例化生成的类，得到mock对象

#### 2.1.1 mock源码实现

1. 暴露出Mockito.mock 接口给使用者
2. 得到要mock类型，进行一些设置，然后一路传递到SubclassBytecodeGenertor，有它来生成mock类型的子类
3. 得到这个类型后，SubclassBytecodeGenertor将其实例化

第二步的实现借助了ByteBuddy这个框架，这个框架可以直接生成Java类，然后通过ClassLoader加载进来使用

第三步实现化，使用了objenesis，一个能在不同平台实例化一个类的库

### 2.2 打桩原理

when这一步要实现的功能是打桩

那么对于when(mockType.someMethod()).thenReturn(value)这样的方法调用，该怎么实现

####原理实现

1. 在mock的时候，我们知道Mockito生成了一个派生类，派生类里的所有方法调用，已经

被hook掉，既素有的方法调用，并不会执行到原有的逻辑里，而是会返回一个默认值

2. 所有的方法最终都会交由MockHandlerImpl.handle来执行。

   这个MockHandlerImpl.handle 是mockito 核心所在

3. 在进行方法调用的时候，Mockito会假定这个方法调用需要被打桩，生成一个和这个方法调用相对用的`OngoingStubbing`对象，将这个对象暂时存起来。

4. 当when 方法执行的时候，就会取出这个暂存的OngoingStubing 对象返回，这样我们就能在这个上面打桩（调用thenReturn等方法），返回我们需要的值，打桩完毕会生成一个Answer对象，存在在一个链表里，后调调用对象那个的方法的时候，就会从这个链表内找出对应的Answer对象，从中获取对应的值返回

### 2.3 验证原理

验证的代码

```
verify(mockList,times(2)).get(anyInt())
```

要达成这样的效果，实现里必须

1. 在verify方法的执行过程里，记录下要验证的对象，一集要验证的参数
2. 在执行方法调用的时候，取出要验证的对象，验证的参数，执行验证
3. 



