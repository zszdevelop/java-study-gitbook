# 创建包含Spring上下文的测试

```
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = MyConfig.class)
public class MySpringTest {
    
}
```



使用Spring的SpringJUnit4ClassRunner,在测试开始时自动创建Spring的应用上下文

- @ContextConfiguration：会告诉Spring从哪里加载配置

