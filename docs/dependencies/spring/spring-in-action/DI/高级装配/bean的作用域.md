# bean的作用域

默认情况下，Spring应用上下文中所有的bean 都是**单例（singleton）**的形式创建的。

也就是说，不管给定的一个bean 被注入到其他bean多少次，每次注入的都是同一个实例

##单例面临的问题

- 单例（适应大多数情况）

  初始化和垃圾回收对象成本小

- 单例的局限性

  但是有时候你所使用的类的异变的，他们会保持一些状态，因此重用是不安全的

  ## bean的作用域

- 单例（Singleton）

  在整个应用中，只会创建bean的一个实例

- 原型（Prototype）

  每次注入或者通过Spring应用上下文取的时候，都会创建一个新的bean

- 会话（Session）

  在web应用中，为每一个会话创建一个bean实例

- 请求（Request）

  在web应用中，为每一个请求创建一个bean实例

## @Scope指定作用域

使用@Scope指定作用域，他可以和@Component 和@Bean一起使用

结合@Component

```
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
```

结合@Bean

```
@Bean
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
```

使用Xml来配置

```
<bean id = ""
	scope="prototype/>
```

## 使用会话和请求作用域

典型应用

在电子商务网站中，有一个bean 代表用户购物车

- 单例情况

   如果购物车是单例，那么导致所有用户都会向同一个购物车中添加商品

- 原型作用域

  在应用某一处添加商品，在另一处就不能使用了，因为这里注入的是另一个原型购物车

- 会话作用域

  最为合适，因为他和用户的关联最大

#### 创建会话作用域

```
@Component
@Scope(
	value=WebApplicationContext.SCOPE_SESSION
	proxyMode=SCopedproxyMode.INTERFACES
	)
public SHoppingCart cart(){
    
}
```

