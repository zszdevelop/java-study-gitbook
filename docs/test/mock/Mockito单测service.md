# Mockito单测service

- Mock声明的对象，对函数的调用均执行mock（即虚假函数），不执行真正部分。

- Spy声明的对象，对函数的调用均执行真正部分。

```java
public class PushControllerTest {
    @Spy
    RestTemplate restTemplate;
    
    @InjectMocks
    private PushServiceImpl pushService;


    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void test() throws IOException {
        pushService.sendVersionUpdatePush();
    }
}
```