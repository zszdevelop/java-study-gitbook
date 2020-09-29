# Mockito基本功能

## 1.对象“复制”

mockito可以轻易复制出各种类型的对象，并与之进行交互

```
// 列表
List mockList = mock(List.class);
mockList.add(1);
mockList.clear();

// Socket对象
Socket mockSocket = mock(Socket);
mockSocket.connect(new InetSocketAddress(8080));
mockSocket.close();
```

## 2.技能复制

```
List mockList = mock(List.class);
mockList.add(1); // 简单交互
mockList.get(1); // 返回值为null
mockList.size(); // 返回值为0
```

虽然复制出来的对象上所有的方法都能被调用，**只会返回默认的返回值**

- 需要返回对象：默认返回null
- 需要返回int：默认返回0

### 2.1指定返回值

```
List mockList = mock(List.class);
when(mockList.get(anyInt()).thenReturn(1);
when(mockList.size()).thenReturn(1, 2, 3);

assertEquals("预期返回1", 1, mockList.get(1)); // pass
assertEquals("预期返回1", 1, mockList.get(2)); // pass
assertEquals("预期返回1", 1, mockList.get(3)); // pass

assertEquals("预期返回1", 1, mockList.size()); // pass
assertEquals("预期返回2", 2, mockList.size()); // pass
assertEquals("预期返回3", 3, mockList.size()); // pass
```

when（mock执行什么方法）.thenReturn("指定mock需要返回的值")，返回值都是mock指定

## 3.验证

```
verify(mockList, never()).clear(); // 从未调用过clear方法
verify(mockList, times(2)).get(1); // get(1)方法调用了2次
verify(mockList, times(3)).get(anyInt()); // get(任意数字)调用了3次
verfiy(mockList, times(4)).size(); // 这里会失败，因为上面我们只调用了size方法3次
```

mock对他做过什么一清二楚