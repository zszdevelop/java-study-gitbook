# Mapper接口动态代理实现原理

为什么Mapper 接口没有实现类，却能被正常调用呢？

因为Mybatis在mapper接口上使用了动态代理的一种常规用法

假设有一个mapper接口

```
public interface UserMapper {
  
    List<User> selectAll();
}
```



使用java动态代理方式创建一个代理类

```
public class MyMapperProxy<T> implements InvocationHandler {
    private Class<T> mapperInterface;
    private SqlSession sqlSession;

    public MyMapperProxy(Class<T> mapperInterface, SqlSession sqlSession) {
        this.mapperInterface = mapperInterface;
        this.sqlSession = sqlSession;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 根据不同的sql类型，需要调用sqlSession的不同方法
        // 接口方法中的参数可能有很多种情况，这里只考虑没有参数的情况
        List<T> list = sqlSession.selectList(mapperInterface.getCanonicalName() + "." + method.getName());
        // 返回值也有很多情况，这里不做处理直接返回
        return list;
    }
}
```



测试代码

```
// 获取sqlSession
SqlSession sqlSession = getSqlSession();
// 获取UserMapper 接口
MyMapperProxy userMapperMyMapperProxy = new MyMapperProxy<UserMapper>(UserMapper.class,sqlSession);
UserMapper userMapper = (UserMapper) Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(),
        new Class[]{UserMapper.class},
        userMapperMyMapperProxy);
// 调用selectAll方法
List<User> users = userMapper.selectAll();
```



从这个代理类可以看到，当调用一个接口的方法是，会先通过接口的全限定名称和当前调用的方法名的组合得到一个方法id，**这个id 的值就是映射到xml中的namespace和具体方法id 的组合**

所以可以在代理方法中使用sqlSession以命名空间的方式调用方法，通过这种方式可以将接口和xml文件中的方法关联起来