# bean的生命周期

## 1.传统java应用中，bean的生命周期

使用关键字new进行bean的实例化，然后就可以使用了，一旦bean不被使用，则由java自动进行垃圾回收

##2.Spring容器中，bean的生命周期

![](./img/2641563892389_.pic.jpg)

1. Spring对bean 进行实例化
2. Spring将值和bean的引用注入到bean对应的属性中
3. 如果bean 实现了beanNameAware接口，Spring将bean的id传递给setBeanName方法
4. 如果bean 实现了BeanFactoryAware接口，Spring将调用setBeanFactory（）方法，将BeanFactory容器实例传入
5. 如果bean 实现了ApplicationContextAware接口，Spring将调用setApplicationContext()方法，将bean所在的应用上下文的引用传入进来
6. 如果bean实现了beanPostProcessor接口，Spring将调用他们的postProcessBeforeInitialization()方法
7. 如果bean实现了InitializingBean接口，Spring将调用他们的afterPropertiesSet()方法，类似这，如果bean 使用init-method 声明了初始化方法，该方法也会被调用
8. 如果bean实现了BeanpostProcessor接口，Spring将调用他们的postProcessorAfterInitialization(）方法
9. 此时，bean已经准备就绪，可以被应用程序使用，他们将一直驻留在应用上下文，直到改应用上下文被销毁
10. 如果bean实现了DisposableBean接口，Spring将调用他的destory（）接口方法，同样，如果bean使用destory-method声明销毁方法，该方法也会被调用

### 推荐阅读

[Spring Bean的生命周期（非常详细）](<https://www.cnblogs.com/zrtqsk/p/3735273.html>)