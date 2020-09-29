# 条件化的bean

有些bean 我们只想在特定情况下创建，我们可以使用@Conditional注解

**作用域**：用来带有@Bean注解的方法上

**作用效果**：

​	如果给定的条件计算结果为true，就会创建这个bean，否则这个bean 会被忽略

## 实例

```
@Bean
@Conditional(MagocExistsConfitional.class)//条件化创建bean
public MagicBean magicBean(){
    retrun new MagicBean();
}
```

设置给Conditiona的类可以是实现任意实现Condition 的接口

Condition接口类

```
public interface Condition {
    boolean matches(ConditionContext var1, AnnotatedTypeMetadata var2);
}
```

该接口实现起来简单直接，只需要提供matches() 方法的实现即可，如果返回true，那么久会创建带有@Conditionl 注解的bean，否则不会创建

处理自动装配的歧义性