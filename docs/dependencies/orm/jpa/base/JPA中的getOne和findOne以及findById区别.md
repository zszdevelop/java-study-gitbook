# JPA中的getOne,findOne以及findById区别

使用 Spring Data JPA 时，经常会看到 `findById`、`getOne`、`findOne` 三个方法。

从字面上理解，他们都是根据 ID 、或根据指定的查询条件，获取单个实体对象。

但他们的底层获取机制、返回值类型、以及抛异常的机制是不一样的，因此对应的使用场景也不一样。

## 1. findById 方法

`findById` 方法会立即（EAGER）访问数据库，并返回和指定 ID 关联的实体对象；如果没有找到，则返回 `Optional.empty()`。

定义如下：

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {	
	/**
	 * Retrieves an entity by its id.
	 *
	 * @param id must not be {@literal null}.
	 * @return the entity with the given id or {@literal Optional#empty()} if none found.
	 * @throws IllegalArgumentException if {@literal id} is {@literal null}.
	 */
	Optional<T> findById(ID id);
}
```

## 2. getOne 方法

`getOne` 是一个延迟加载方法，**它并不立即访问数据库**，而是返回一个代理（`proxy`）对象，这个代理对象是对实体对象的引用，仅在 **使用代理对象访问对象属性时才会去真正访问数据库** ，如果找不到，则抛出 `EntityNotFoundException`。

定义如下：

```java
public interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T> {
	/**
	 * Returns a reference to the entity with the given identifier. Depending on how the JPA persistence provider is
	 * implemented this is very likely to always return an instance and throw an
	 * {@link javax.persistence.EntityNotFoundException} on first access. Some of them will reject invalid identifiers
	 * immediately.
	 *
	 * @param id must not be {@literal null}.
	 * @return a reference to the entity with the given identifier.
	 * @see EntityManager#getReference(Class, Object) for details on when an exception is thrown.
	 */
	T getOne(ID id);
}
```

## 3. findOne 方法

除了 `findById`、`getOne` 外，Spring Data JPA 还提供了两个 `findOne` 方法：

- `Optional findOne(@Nullable Specification spec)`
- ` Optional findOne(Example example)`

这两个方法用于需要动态构建多条件查询的场景中，它们都是立即访问数据库的。

定义如下：

```java
public interface QueryByExampleExecutor<T> {
/**
	 * Returns a single entity matching the given {@link Example} or {@literal null} if none was found.
	 *
	 * @param example must not be {@literal null}.
	 * @return a single entity matching the given {@link Example} or {@link Optional#empty()} if none was found.
	 * @throws org.springframework.dao.IncorrectResultSizeDataAccessException if the Example yields more than one result.
	 */
	<S extends T> Optional<S> findOne(Example<S> example);
}
public interface JpaSpecificationExecutor<T> {
/**
	 * Returns a single entity matching the given {@link Specification} or {@link Optional#empty()} if none found.
	 *
	 * @param spec can be {@literal null}.
	 * @return never {@literal null}.
	 * @throws org.springframework.dao.IncorrectResultSizeDataAccessException if more than one entity found.
	 */
	Optional<T> findOne(@Nullable Specification<T> spec);
}
```

返回类型为 `Optional` ，如果没有检索到，返回 `Optional.empty()`，结果满足条件的记录条数超过一条，则抛出 `IncorrectResultSizeDataAccessException`

## 4. 如何选择

从上面的描述可以看出：它们主要的区别在于 **加载时期** 及 **是否支持动态构建查询条件** 的不同。

### 4.1、多条件查询的场景中，可使用 findOne

例如，根据 `openId` 以及 `state` 查询指定的用户：

```java
Optional<User> user =
        postRepository.findOne(
            (root, query, cb) ->
                cb.and(cb.equal(root.get("openId"), "aaa"), cb.equal(root.get("state"), 1)));
```

或者使用 `findOne(Example example)`：

```java
User u = new User();
u.setOpenId("xxx");
u.setState(1);
Example<User> example = Example.of(u);
Optional<User> user = postRepository.findOne(example);
```

以上两种写法是等效的，执行的 SQL 如下：

```
Hibernate: select user0_.id as id1_0_, user0_.created_at as created_2_0_, user0_.open_id as open_id3_0_, user0_.state as state4_0_ from t_users user0_ where user0_.open_id=? and user0_.state=1
```

## 4.2 按 ID 检索的场景中，使用 findById 或 getOne

前面已经描述过，`findById` 和 `getOne` 的最大的区别是加载时期的不同。

因此：

1、在需要延迟加载时，选择 `getOne`

2、不需要延迟加载时，选择 `findById`

当然了，`findOne` 也可以根据 ID 进行查询，但是写法累赘、且晦涩不易读，不要那样。

```java
Optional<User> user = postRepository.findOne((root, query, cb) -> cb.equal(root.get("id"), 1));
```

# 5、总结

1、`getOne` 是延迟加载；而 `findById`、`findOne` 是立即加载。

2、 `getOne` 如果找不到记录会抛出`EntityNotFoundException`；而 `findById`、`findOne` 会返回 `Optional.empty()`。

3、 在 `@ManyToOne` 的场景中使用 `findOne` ，可以获得延迟加载机制带来的性能优势。

4、 在根据非 `ID` 查询、或动态查询的场景中，使用 `findOne`。

5、 `findOne` 查询结果不能返回超过一条，否则会抛出 `IncorrectResultSizeDataAccessException`。

## 参考文章

[Spring Data JPA 中 findById、getOne、findOne 的区别](https://www.cnblogs.com/ktgu/p/13772236.html)