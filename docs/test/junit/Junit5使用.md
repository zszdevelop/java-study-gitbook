# Junit5（JUnit Jupiter）使用

# 1. 注解

Junit5 更改了JUnit 4的一些注解名称，让他们更直观，但保持功能不变

##### JUnit 4 与 JUnit 5 中的注解比较

| JUnit 5     | JUnit 4      | 说明                                                         |
| :---------- | :----------- | :----------------------------------------------------------- |
| @Test       | @Test        | 被注解的方法是一个测试方法。与 JUnit 4 相同。                |
| @BeforeAll  | @BeforeClass | 被注解的（静态）方法将在当前类中的所有 @Test 方法前执行一次。 |
| @BeforeEach | @Before      | 被注解的方法将在当前类中的每个 @Test 方法前执行。            |
| @AfterEach  | @After       | 被注解的方法将在当前类中的每个 @Test 方法后执行。            |
| @AfterAll   | @AfterClass  | 被注解的（静态）方法将在当前类中的所有 @Test 方法后执行一次。 |
| @Disabled   | @Ignore      | 被注解的方法不会执行（将被跳过），但会报告为已执行。         |

## 参考文章

[JUnit 5 Jupiter API](https://developer.ibm.com/zh/tutorials/j-introducing-junit5-part1-jupiter-api/)