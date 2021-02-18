# Jpa 批量删除

## 1. 具体方法

```java
public interface StudentsRepository extends Repository<Students, Integer>, JpaRepository<Students, Integer> {

    /**
     * @function 自定义JPQL
     * @param ids
     */
    // 注意更新和删除是需要加事务的， 并且要加上 @Modify的注解
    @Modifying
    @Transactional
    @Query("delete from Students s where s.stuId in (?1)")
    void deleteBatch(List<Integer> ids);

    // 这个是通过spring data拼接关键字进行的操作
    void deleteStudentsByStuIdIn(List<Integer> ids);

}
```

注：

**@Modifying注解**

1、在@Query注解中编写JPQL实现DELETE和UPDATE操作时候必须加上@Modifying注解，通知Spring Data这是一个delete或者updata操作

2、 updata和delete操作需要使用事务，此时需要定义service层，在service方法上添加事务操作

3、 注意JPQL不支持insert操作

@Query 如果在注解中添加 nativeQuery=true 是支持原生SQL查询

## 参考文章

[SpringBoot2 Jpa 批量删除](https://blog.csdn.net/yhflyl/article/details/81557670)