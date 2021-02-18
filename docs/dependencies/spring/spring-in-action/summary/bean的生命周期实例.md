# bean的生命周期实例

但看生命周期可能比较难理解，可以结合实例加深印象

生命周期大体就是

1. 初始化构造函数
2. 设置对应属性
3. 判断是否实现了各个接口
   1. 若实现BeanNameAware接口，则调用setBeanName（）方法
   2. 若实现BeanFactoryAware接口，则调用setBeanFactory()方法
   3. 若实现ApplicationContextAware接口，则调用setApplicationContext()方法
   4. 若实现BeanPostProcessor接口，则调用postProcessBeforeInitialization()
   5. 初始化接口方法
      1. 若实现InitializingBean接口，则调用afterPropertiesSet()方法
      2. init-method 声明了初始化方法，该方法也会被调用
   6. 若实现BeanpostProcessor接口，则调用postProcessorAfterInitialization()方法
4. bean准备就绪，一直驻留在应用上下文，直到上下文销毁
5. 上下文销毁，额外处理
   1. 若实现DisposableBean接口，调用destory方法
   2. 若 destroy-method 申明了销毁方法，调用销毁方法

### 实例

#### MyPerson 类

```
package com.zszdevelop;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * Created by zhangshengzhong on 2019/7/23.
 */
public class MyPerson implements BeanNameAware,BeanFactoryAware,ApplicationContextAware,BeanPostProcessor,InitializingBean,DisposableBean{

    private String name;
    private int age;

    public MyPerson() {
        System.out.println("第1步：Spring调用bean 的构造器实例化");
    }

    public void setName(String name) {
        System.out.println("第2步：【注入属性】注入属性name:"+name);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        System.out.println("第2步：【注入属性】注入属性age:"+age);
        this.age = age;
    }

    @Override
    public void setBeanName(String s) {
        System.out.println("第3步：Spring调用 BeanNameAware 的setBeanName    id:"+s);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("第4步：Spring调用 BeanFactoryAware 的 setBeanFactory,并将beanFactory传递进来");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("第5步：Spring调用 ApplicationContextAware 的 setApplicationContext，并将applicationContext传递进来");
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("第6步：Spring调用 BeanPostProcessor 的 postProcessBeforeInitialization()");
        return null;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("第7步：Spring调用 InitializingBean 的 afterPropertiesSet()");
    }

    // 通过<bean>的init-method属性指定的初始化方法
    public void myInit() {
        System.out.println("第7步：调用<bean>的init-method属性指定的初始化方法");
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("第8步：Spring调用 BeanPostProcessor 的 postProcessAfterInitialization()");
        return null;
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("第10步：Spring调用 DisposableBean 的 destroy()");
    }

    // 通过<bean>的destroy-method属性指定的初始化方法
    public void myDestory() {
        System.out.println("第10步：调用<bean>的destroy-method属性指定的初始化方法");
    }
}
```

#####myPersonBeans.xml

```
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans-3.2.xsd">



    <bean id="myPersonBean" class="com.zszdevelop.MyPerson"
          p:name="张三" p:age="15"
          init-method="myInit"
          destroy-method="myDestory"
         />
</beans>
```

#### 测试类MyBeanLifeCycle

```
package com.zszdevelop;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by zhangshengzhong on 2019/7/23.
 */
public class MyBeanLifeCycle {
    public static void main(String[] args) {

        System.out.println("现在开始初始化容器");

        ApplicationContext factory = new ClassPathXmlApplicationContext("myPersonBeans.xml");
        System.out.println("容器初始化成功");
        //得到Preson，并使用
        MyPerson person = factory.getBean("myPersonBean",MyPerson.class);
        System.out.println(person);

        System.out.println("现在开始关闭容器！");
        ((ClassPathXmlApplicationContext)factory).registerShutdownHook();
    }
}

```

#### 运行结果

```
第1步：Spring调用bean 的构造器实例化
第2步：【注入属性】注入属性age:15
第2步：【注入属性】注入属性name:张三
第3步：Spring调用 BeanNameAware 的setBeanName    id:myPersonBean
第4步：Spring调用 BeanFactoryAware 的 setBeanFactory,并将beanFactory传递进来
第5步：Spring调用 ApplicationContextAware 的 setApplicationContext，并将applicationContext传递进来
第7步：Spring调用 InitializingBean 的 afterPropertiesSet()
第7步：调用<bean>的init-method属性指定的初始化方法
容器初始化成功
com.zszdevelop.MyPerson@396e2f39
现在开始关闭容器！
00:52:56.622 [Thread-0] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Closing org.springframework.context.support.ClassPathXmlApplicationContext@383534aa, started on Wed Jul 24 00:52:56 CST 2019
第10步：Spring调用 DisposableBean 的 destroy()
第10步：调用<bean>的destroy-method属性指定的初始化方法
```

