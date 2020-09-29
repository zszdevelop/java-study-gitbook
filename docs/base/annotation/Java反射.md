# Java注解

## 1. 注解是什么？

>注解是一系列元数据，它提供数据用来解释程序代码，但是注解并非是所解释的代码本身的一部分。注解对于代码的运行效果没有直接影响。
>
>​																						---抽象的官方定义

注解相当于一个**标签**，给代码贴上一个个标签来描述代码的相关特性

## 2. 注解语法

注解通过`@Interface` 关键字进行定义

```
public @interface TestAnnotation {
}
```

## 3. 注解与反射

1. 注解通过反射获取。首先可以通过 Class 对象的 isAnnotationPresent() 方法判断它是否应用了某个注解

   ```
   public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {}
   ```

2. 然后通过 getAnnotation() 方法来获取 Annotation 对象。

   ```
    public <A extends Annotation> A getAnnotation(Class<A> annotationClass) {}
   ```

   或者是 getAnnotations() 方法。

   ```
   public Annotation[] getAnnotations() {}
   ```

3. 如果获取到的 Annotation 如果不为 null，则就可以调用它们的属性方法了。比如

   ```java
   @TestAnnotation()
   public class Test {
   	
   	public static void main(String[] args) {
   		
   		boolean hasAnnotation = Test.class.isAnnotationPresent(TestAnnotation.class);
   		
   		if ( hasAnnotation ) {
   			TestAnnotation testAnnotation = Test.class.getAnnotation(TestAnnotation.class);
   			
   			System.out.println("id:"+testAnnotation.id());
   			System.out.println("msg:"+testAnnotation.msg());
   		}
   
   	}
   
   }
   ```







## 参考文章

[秒懂，Java 注解 （Annotation）你可以这样学](https://blog.csdn.net/briblue/article/details/73824058)