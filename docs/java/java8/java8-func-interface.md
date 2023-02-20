---
order: 20
category:
  - Java
---

# Java8-函数式接口

## 1. 理解注解 @FunctionInterface

```java
/**
 * An informative annotation type used to indicate that an interface
 * type declaration is intended to be a <i>functional interface</i> as
 * defined by the Java Language Specification.
 *
 * Conceptually, a functional interface has exactly one abstract
 * method.  Since {@linkplain java.lang.reflect.Method#isDefault()
 * default methods} have an implementation, they are not abstract.  If
 * an interface declares an abstract method overriding one of the
 * public methods of {@code java.lang.Object}, that also does
 * <em>not</em> count toward the interface's abstract method count
 * since any implementation of the interface will have an
 * implementation from {@code java.lang.Object} or elsewhere.
 *
 * <p>Note that instances of functional interfaces can be created with
 * lambda expressions, method references, or constructor references.
 *
 * <p>If a type is annotated with this annotation type, compilers are
 * required to generate an error message unless:
 *
 * <ul>
 * <li> The type is an interface type and not an annotation type, enum, or class.
 * <li> The annotated type satisfies the requirements of a functional interface.
 * </ul>
 *
 * <p>However, the compiler will treat any interface meeting the
 * definition of a functional interface as a functional interface
 * regardless of whether or not a {@code FunctionalInterface}
 * annotation is present on the interface declaration.
 *
 * @jls 4.3.2. The Class Object
 * @jls 9.8 Functional Interfaces
 * @jls 9.4.3 Interface Method Body
 * @since 1.8
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FunctionalInterface{}
```

- interface做注解的注解类型，被定义成java语言规范
- 一个被它注解的接口只能有一个抽象方法，有两种例外
  - 第一是接口允许有实现的方法，这种实现的方法是用default关键字来标记的(java反射中java.lang.reflect.Method#isDefault()方法用来判断是否是default方法)
  - 第二如果声明的方法和java.lang.Object中的某个方法一样，它可以不当做未实现的方法，不违背这个原则: 一个被它注解的接口只能有一个抽象方法, 比如: `java public interface Comparator<T> { int compare(T o1, T o2); boolean equals(Object obj); }`
- 如果一个类型被这个注解修饰，那么编译器会要求这个类型必须满足如下条件:
  - 这个类型必须是一个interface，而不是其他的注解类型、枚举enum或者类class
  - 这个类型必须满足function interface的所有要求，如你个包含两个抽象方法的接口增加这个注解，会有编译错误。
- 编译器会自动把满足function interface要求的接口自动识别为function interface，所以你才不需要对上面示例中的 ITest接口增加@FunctionInterface注解。

## 2. 自定义函数接口

```java
@FunctionalInterface
public interface IMyInterface {
    void study();
}

package com.isea.java;
public class TestIMyInterface {
    public static void main(String[] args) {
        IMyInterface iMyInterface = () -> System.out.println("I like study");
        iMyInterface.study();
    }
}
```

## 3. 内置四大函数接口

Java 8 在 java.util.function 包下定义了很多标准函数式接口，主要分为以下几类：

| 接口      | 参数 | 返回值  | 类别       |
| --------- | ---- | ------- | ---------- |
| Consumer  | T    | void    | 消费型接口 |
| Supplier  | None | T       | 供给型接口 |
| Function  | T    | R       | 函数型接口 |
| Predicate | T    | boolean | 断言型接口 |

### 3.1 消费型接口: Consumer

Consumer 接口只有一个抽象方法 accept，参数列表只有一个泛型t，无返回值，重点在于内部消费

```java
public class ConsumerTest {

    public static void main(String[] args) {
        test("hello", x -> System.out.println(x));
    }

    public static <T> void test(T t, Consumer<T> consumer) {
        consumer.accept(t);
    }

}
```

如果需要多个参数列表的话，可以考虑使用 ObjLongConsumer

### 3.2 供给型接口: Supplier

Supplier 只有一个抽象方法 get，参数列表为空，有返回值，返回值得数据类型为T。

```java
public class SupplerTest {

    public static List<Integer> supply(Integer num, Supplier<Integer> supplier) {
        List<Integer> list = new ArrayList<Integer>();
        for (int x = 0; x < num; x++) {
            list.add(supplier.get());
        }
        return list;
    }

    public static void main(String[] args) {
        List<Integer> list = supply(10, () -> (int) (Math.random() * 100));
        list.forEach(System.out::println);
    }

}
```

如果需要返回得数据为基本数据类型，可以考虑使用 LongSupplier

### 3.3  断定型接口:  Predicate

断言型又名判断型。 Predicate 只有一个抽象方法 test，参数列表只有一个参数为 T，有返回值，返回值类型为 boolean。

```java
public class PredicateTest {

    public static List<String> filter(List<String> fruit, Predicate<String> predicate) {
        List<String> f = new ArrayList<>();
        for (String s : fruit) {
            if (predicate.test(s)) {
                f.add(s);
            }
        }
        return f;
    }

    public static void main(String[] args) {
        List<String> fruit = Arrays.asList("香蕉", "哈密瓜", "榴莲", "火龙果", "水蜜桃");
        List<String> newFruit = filter(fruit, (f) -> f.length() == 2);
        System.out.println(newFruit);
    }

}

```

### 3.4 函数型接口:  Function

Function<T, R> 只有一个抽象方法名为 apply，参数列表只有一个参数为T，有返回值，返回值的数据类型为R。

```java
public class FunctionTest {

    public static void main(String[] args) {
        String test = test("hello", x -> x.toUpperCase());
        System.out.println(test);
    }

    public static String test(String str, Function<String, String> function) {
        return function.apply(str);
    }

}
```

如果需要多个入参，然后又返回值的话，可以考虑 BiFunction

## 参考文章

[**Java 8 - 函数编程(lambda表达式)**](https://pdai.tech/md/java/java8/java8-stream.html)

[Java8新特性-Lambda表达式](https://blog.csdn.net/ThinkWon/article/details/113764085)