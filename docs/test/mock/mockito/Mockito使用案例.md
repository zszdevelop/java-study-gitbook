# Mockito使用案例

## 业务场景

- 需求

  有一段业务逻辑，需要对给定的请求（如http请求）做处理，

- 常规测试:
  1. 需要把代码部署到服务器上
  2. 还需要构造并发起一个请求（前端配合/postman进行测试）
  3. 等服务器接收到请求后，才能交给业务处理

  ```
  // 业务代码
  public boolean handleRequest(HttpServletRequest request) {
    String module = request.getParameter("module");
    if ("live".equals(module)) {
        // handle module live request
        return true;
    } else if ("user".equals(module)) {
        // handle module user request
        return true;
    }
    return false;
  }
  ```
-  常规测试面临的问题
  1. 操作繁琐
  2. 一次性操作
  3. 等待时间漫长

## 使用Mockito测试

回顾需求：

 	1. 给定一个特定的输入（这个输入可能不容易创建，如HttpRequest）
 	2. 验证其输出结果是否正确

也就是我们验证的过程要尽可能的方便，**而不是把大部分时间耗费在验证过程**上

```
@Test
public void handleRequestTestLive() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest);
    when(request.getParameter("module")).thenReturn("live");
    
    boolean ret = handleRequest(request);
    assertEquals(true, ret)
}

@Test
public void handleRequestTestUser() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest);
    when(request.getParameter("module")).thenReturn("user");
    
    boolean ret = handleRequest(request);
    assertEquals(true, ret)
}

@Test
public void handleRequestTestNone() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest);
    when(request.getParameter("module")).thenReturn(null);
    
    boolean ret = handleRequest(request);
    assertEquals(false, ret)
}
```

1. 首先模拟出一个假对象

2. 设置这个假对象行为

   这个行为会影响我们业务结果

3. 验证**各种输入**下，业务逻辑正确性

