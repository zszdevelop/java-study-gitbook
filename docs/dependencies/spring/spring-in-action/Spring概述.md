# Spring概述

Spring 的使命：简化Java开发

##1.简化Java开发

### 1.1 Spring 如何简化Java开发

为了降低Java开发的复杂性，Spring采取了以下4种关键策略

- 基于POJO的轻量级和最小侵入性编程
- 通过依赖注入和面向接口实现松耦合
- 基于切面和惯例进行声明式编程
- 通过切面和模板减少样板式代码

Spirng 所做的任何事都可以追溯到上述的一条或多条策略

注：POJO（Plain old java object）简单老式java对象

​	bean：Spring 用bean/JavaBean表示应用组件，组件可以是任意形式的POJO。广义上Javabean 和POJO 是同义词

#### 1.1.1  激发POJO 的潜能

很多框架通过强迫应用继承他们的类或实现他们的接口从而导致应用与框架绑死

如：早起的struts，WebWork等

Spring竭力避免因自身API而弄乱你的应用代码，**Spring不会强迫你实现Spring规范的接口或继承Spring规范的类**。

最坏的场景是，一个类或许会使用Spring注解，但他依旧是POJO，但魔力在于**Spring 通过DI来装配他们，保持应用对象彼此之间的松耦合**

####1.1.2 依赖注入

任何一个有实际意义的应用都会由两个或者更多类组成，类相互之间进行协作完成特定的业务逻辑。

传统做法面临的问题：**每个对象负责管理**与自己相互协作的对象（既他所依赖的对象）的引用，这将会**导致高度耦合和难以测试的代码**。

传统做法是如何导致高度耦合和为什么难以测试的呢?

```
package com.springinaction.knights;

public class DamselRescuingKnight implements Knight {

  private RescueDamselQuest quest;

  public DamselRescuingKnight() {
    this.quest = new RescueDamselQuest();	
  }

  public void embarkOnQuest() {
    quest.embark();
  }

}
```

**高度耦合**：DamselRescuingKnight负责管理自己相互协作的对象，他在构造函数中你创建了RescueDamselQuest对象，这就使得他们两个高度耦合在一起。这也极大的限制了骑士的能力，因为他只实现了RescueDamselQuest救援行动。如果美女需要救援骑士召之即来，如果遇上恶龙等就爱莫能助了

**难以测试**：在测试的时候，你要保证embarkOnQuest()被调用的时候，quest.embark()也要被调用



耦合具有的两面性：

- 一方面：紧密的耦合的代码难以测试，难以复用，难以理解
- 另一方面：一定的耦合又是必须的，完全没有耦合又是必须的，为了完成实际意义的功能，不同的类必须以适当的方式进行交互

总之：耦合是必须的，但应该被小心谨慎管理

#### DI依赖注入将会带来什么改变？

通过DI，对象之间的依赖关系将由 系统中负责协调各对象的第三方组件中创建对象时设定，无需自行创建或管理他们的依赖

说白了就是，实际调用方传递进来

依赖注入方式一：**构造器注入**

```
package com.springinaction.knights;

public class BraveKnight implements Knight {

  private Quest quest;

  public BraveKnight(Quest quest) {	//谁使用，谁传递。而不是自己创建
    this.quest = quest;
  }

  public void embarkOnQuest() {
    quest.embark();
  }

}
```

谁使用，谁传递。而不是自己创建。这样该类的扩展性就得到了提高。这个骑士可以接受各种任务而不是只能执行某一项任务

BraveKnight没有与任何任务Quest 实现发生耦合，对他来说，被要求调整的探险任务只要实现Quest接口，那么具体哪种类型的任务就无关紧要了

这就是DI带来的最大收益：**松耦合**

#### 什么是松耦合

如果一个对象只通过接口（而不是具体实现或初始化过程）来表明依赖关系，那么这种依赖就能够在对象毫不知情的情况下，用不同的实现替换

####DI依赖注入是如何工作的呢？

Spring通过应用上下文（Application Context）装载bean的定义并把他们组装起来，**Spring 的应用上下文全权负责对象的创建和组装**。Spring自带多种应用上下文的实现，他们主要的区别仅仅在于如何加载配置。

以ClassPathXmlApplicationContext为例：

ClassPathXmlApplicationContext加载knights.xml并获得Knight的对象引用

```
public class KnightMain {

  public static void main(String[] args) throws Exception {
    ClassPathXmlApplicationContext context =	
        new ClassPathXmlApplicationContext(
            "META-INF/spring/knights.xml");
    Knight knight = context.getBean(Knight.class);	
    knight.embarkOnQuest();	
     context.close();
  }

}
```

