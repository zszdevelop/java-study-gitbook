# 环境与profile

## 1.环境与profile

环境迁移中某些环境相关的配置并不适合迁移到生产环境中，甚至迁移过去也无法正常工作

如

- 数据库配置
- 加密算法

### 1.1 使用Java注解配置

#### 1.1.1 类级别@Profile

```
@Configuration
@Profile("dev")
public class DevConfig(){
    ...
    @Bean
    public Datasource datasource(){
        ...
    }
}
```

配置类中的bean 只有在dev profile 激活才创建，如果没有激活那么带@Bean 注解的方法都会忽略掉。

#### **方法级的@Profile**

在Spring 3.2开始就支持方法级别的@Profile

注：没有指定profile 的bean始终都会被创建

### 1.2 在XML中配置profile

#### 1.2.1 可以通过<beans> 元素的profile属性，配置profile bean

```
<beans 
	...
	profile="dev"/>
	...	
</beans>
```

#### 1.2.2 在<beans>中嵌套<beans>设置

这样就能将他们定义在一个xml，不需要重复定义

```
<beans 
	...
	/>
	<beans profile="dev">
	...
	</beans>
	<beans profile="prod">
	...
	</beans>
</beans>
```

### 1.3 激活profile

确定那个profile 处于激活状态，需要依赖两个独立的属性

- spring.profiles.active
- spring.profiles.defaule

#### 1.3.1 激活规则

1. 如果设置了active属性的话，由active的值确定激活哪个profile
2. 如果没设置active，那么就由defaule的值决定
3. active和defaule 都没有设置自，那就没有激活的profile，那么只会创建那些没有定义在profile 的bean

#### 1.3.2 设置

spring 提供了多种设置方法

- 作为DispatcherServlet的初始化参数
- 作为Web应用的上下文参数
- 作为JNDI条目
- 作为环境变量
- 作为JVM的系统属性
- 在集成测试类上，使用@ActiveProfiles注解设置

#### 1.4 使用Profile进行测试

Spring 提供了@ActiveProfiles注解指定运行测试时要激活哪个profile

```
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes={PersistenceTestConfig.class})
@ActiveProfiles("dev")
public class PersistenceTest{
    
}
```

