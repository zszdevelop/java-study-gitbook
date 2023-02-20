---
order: 30
category:
  - Java
  - IO
---

# Java IO - 设计模式(装饰者模式)

> Java I/O 使用了装饰者模式来实现。

## 1. 装饰者模式

请参考[装饰者模式详解](https://pdai.tech/md/dev-spec/pattern/12_decorator.html)

装饰者(Decorator)和具体组件(ConcreteComponent)都继承自组件(Component)，具体组件的方法实现不需要依赖于其它对象，而装饰者组合了一个组件，这样它可以装饰其它装饰者或者具体组件。所谓装饰，就是把这个装饰者套在被装饰者之上，从而动态扩展被装饰者的功能。装饰者的方法有一部分是自己的，这属于它的功能，然后调用被装饰者的方法实现，从而也保留了被装饰者的功能。可以看到，具体组件应当是装饰层次的最低层，因为只有具体组件的方法实现不需要依赖于其它对象。

![image-20220830203657281](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830203657281.png)

## 2. IO 装饰者模式

以 InputStream 为例，

- InputStream 是抽象组件；
- FileInputStream 是 InputStream 的子类，属于具体组件，提供了字节流的输入操作；
- FilterInputStream 属于抽象装饰者，装饰者用于装饰组件，为组件提供额外的功能。例如 BufferedInputStream 为 FileInputStream 提供缓存的功能。

![image-20220830203804788](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220830203804788.png)

实例化一个具有缓存功能的字节流对象时，只需要在 FileInputStream 对象上再套一层 BufferedInputStream 对象即可。

```java
FileInputStream fileInputStream = new FileInputStream(filePath);
BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
```

DataInputStream 装饰者提供了对更多数据类型进行输入的操作，比如 int、double 等基本类型。

## 参考文章

[**Java IO - 设计模式(装饰者模式)**](https://pdai.tech/md/java/io/java-io-basic-design-pattern.html)