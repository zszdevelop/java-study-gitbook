# 装配Bean

>任何一个成功的应用都是由多个为了实现某一个业务目标而相互协作的组件构成的。这些组件必须彼此了解，并且相互协作完成工作

我们的程序也不可能都由一个对象来完成。需要相互之间的关联协作，才能更高效的完成任务。

**创建应用对象之间协作关系的行为称之为装配，也就是依赖注入（DI）**

Spring 容器复责创建应用程序中的bean并通过DI来协调这些对象之间的关系

## 1.如何创建对象关联

- 传统方法（通过构造器或者查找）
  - 缺点：对象之间高度耦合，难以复用和测试

- Spring DI依赖注入
  - 优势：无需自己查找或创建与所关联的对象，容器负责把需要相互协作的对象引用赋予各个对象

## 2.依赖注入的本质：装配（wiring）

装配（wiring）：创建应用对象之间协作关系的行为

##3.bean是如何装配在一起的？ 

###3.1 三种装配方式

spring 提供了三种方式告诉spring要创建哪些bean。并且如何将其装配在一起

- 在XML中进行显示装配
- 在JAVA中进行显示装配
- 隐式的bean发现机制和自动装配

### 3.2 装配方式选择

1. 尽可能的使用自动装配机制，显示配置越少越好。

2. 当你必须使用显示配置bean的时候（源码不是你来维护，又需要代码配置bean）。更推荐使用类型安全并且比XML更加强大的JavaConfig

3. 当你想使用便利的XML 命名空间，并且在JavaConfig中没有同样的实现时，才应该使用XML

### 3.3 装配方式

#### 3.3.1 自动化装配

自动装配就是让Spring自动满足bean依赖的一种方法

优势：自动化装配最便利

Spring 从两个角度来实现自动化装配

- 组件扫描（component scanning）：spring会自动发现应用上下文中所创建的bean
- 自动装配（autowiring）：spring自动满足bean之间的依赖

##### 注解

- @Component：表明该类会作为组件类，并告知Spring要为这个类创建bean
  - Spring 会为所以bean 指定一个id，默认是类名的第一个字母边小写

- @ComponentScan：这个注解能够在Spring 中启用扫描。默认扫描与配置类相同的包
  - 也可以使用xml:< context:component-scan >
  - 通过ComponentScan（basePackages={"image",""videos}）指定多个包
- @Named：是java依赖注入规范提供的注解
  - 大多数场景可以和@Component互换，更推荐@Component见名知意
- @Autowired:申明要进行自动装配
  - 可以设置在成员变量构造器，setter方法，或者其他方法上。spring会尝试满足方法上声明的依赖
  - 可以设置非需要@Autowired(required=false)
- @Inject:来源于Java 依赖注入规范
  - 用法同@Autowired

###3.3.2 通过Java代码装配bean

#### 使用时机

想要将第三方库中的组件装配到你的应用中，是没有办法在他的类上使用@Component和@Autowired的。这时候就需要采用显示装配的方式

JavaConfig对比XML优势：

- 更加强大，类型安全，并且对重构友好

JavaConfig 是配置代码，这意味着他不应该包含任何业务逻辑

#### 注解

- @Configuration:表明这个类是一个注解类，改类应该包含在spring应用上下文中如何创建bean的细节

- @Bean：通过该注解声明bean
  - 该注解会告诉Spring这个方法将会返回一个对象，该对象要注册为Spring 应用上下文中的bean。方法中包含了最终产生bean 实例的逻辑

  - bean 的ID与带有@bean注解的方法名是一样的，也可以指定name 属性

  - 如果还存在其他依赖关系我们可以使用参数的形式表明

    ```
    @Bean
    public CDPlayer cdplay(ComoactDisc disc){
        return new CDPlayer(disc);
    }
    ```



#### 3.3.3 通过XML 装配bean

在JavaConfig 中的配置规范是，必须创建一个带有@Configuration注解的类

在XML配置中，要创建一个XML文件，并且以<beans >元素为根

#### 声明bean

通过<bean >声明一个bean，类似于JavaConfig中的@Bean注解，创建这个bean的类通过class 属性来制定，并且要使用全限定的类名

<bean class="com.MyClass">

bean 的id是“com.Myclass#0”,#0是计数形式，区分其他bean，如果你要引用他的话，就需要制定id属性

<bean id="myclass" class="com.MyClass">

#### XML 装配案例

有两种方案

- construct-arg

  ```
  <bean id="myclass" class="com.MyClass">
  	<construct-arg ref="diClass"/>
  	<construct-arg value="字面量注入构造器"/>
  	<construct-arg >
  		<list>
  			<value>装配集合</>
  		</list>
  	</construct-arg>
  	<--设置属性-->
  	<property name="compactDisc" ref="compactDisc"/>
  	<--字面量设置到属性-->
  	<property name="compactDisc" value="字面量设置到属性"/>
  </bean>
  ```

- c-命名空间

  ```
  <bean id="myclass" class="com.MyClass"
  c:cd-ref="diClass"
  c:_0="字面量注入构造器"
  <--设置属性-->
  p:compactDisc-ref="compactDisc"
  >
  ```

  使用c命名空间无法装配集合



### 混合配置

可以一部分xml一部分javaConfig 相互引用