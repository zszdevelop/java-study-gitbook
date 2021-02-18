# Spring Data JPA使用Specification复杂查询

## 1.简介

- JpaRepository ：
  - 拥有：拥有常用的 CURD 方法以及分页方法、字段排序
- JpaSpecificationExecutor

## 2. 用法

1. 使用方法，让dao接口继承JpaSpecificationExecutor

   ```java
   public interface CustomerDao extends JpaRepository<Customer,Long>, JpaSpecificationExecutor<Customer> {}
   ```

2. 在JpaSpecificationExecutor中有下列方法：

   ```java
   public interface JpaSpecificationExecutor<T> {
      	// 查询单个对象
       Optional<T> findOne(@Nullable Specification<T> var1);
   
       // 查询列表
       List<T> findAll(@Nullable Specification<T> var1);
   
       // 查询全部，分页
       Page<T> findAll(@Nullable Specification<T> var1, Pageable var2);
   
       //查询列表
   	//Sort：排序参数
       List<T> findAll(@Nullable Specification<T> var1, Sort var2);
   
       //统计查询
       long count(@Nullable Specification<T> var1);
   }
   ```

   其中，Specification 为查询条件，需要自定义我们**自己的Specification实现类,实现 toPredicate 方法**

   - root：查询的根对象（查询的任何属性都可以从根对象中获取）

   - CriteriaQuery：顶层查询对象，自定义查询方式（了解：一般不用）

   - CriteriaBuilder：查询的构造器，封装了很多的查询条件

3. **自定义查询条件spec**

   1. 实现Specification接口（提供泛型：查询的对象类型）

   2. 实现toPredicate方法（构造查询条件）

   3. 需要借助方法参数中的两个参数

      - root：获取需要查询的对象属性

      - CriteriaBuilder：构造查询条件的，内部封装了很多的查询条件（模糊匹配，精准匹配）

4. spec 示例

   1. **自定义findOne单个条件查询**

      ```java
      @Test
      public void testSpec() {
      
      	Specification<Customer> spec = new Specification<Customer>() {
      		@Override
      		public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
      			// 取需要查询的对象属性
      			Path<Object> custName = root.get("custName");
      			// 进行精准的匹配，
      			// 第一个参数：需要比较的属性（path对象）,第二个参数：当前需要比较的取值
      			Predicate predicate = cb.equal(custName, "支付宝");
      			return predicate;
      		}
      	};
      	Customer customer = customerDao.findOne(spec);
      	System.out.println(customer);
      }
      ```

   2. **自定义findOne多条件查询**

         ```java
      @Test
      public void testSpec1() {
      
      	Specification<Customer> spec = new Specification<Customer>() {
      		@Override
      		public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
      			// 取需要查询的对象属性
      			Path<Object> custName = root.get("custName");
      			Path<Object> custIndustry = root.get("custIndustry");
      			// 构造第一个查询条件的精确匹配
      			Predicate p1 = cb.equal(custName, "支付宝");
      			// 构造第二个查询条件的精确匹配
      			Predicate p2 = cb.equal(custIndustry, "it");
      			// 将多个查询条件组合到一起
      			Predicate and = cb.and(p1, p2);
      			// cb.or();//以或的形式拼接多个查询条件
      			return and;
      		}
      	};
      	Customer customer = customerDao.findOne(spec);
      	System.out.println(customer);
      }
         ```
   
   3. **自定义findAll模糊匹配**
   
      前面使用 equal 直接使用path对象（属性），进行比较即可
   
      但是 gt，lt,ge,le,like 不能直接使用path对象，要根据path对象指定比较的参数类型：[path.as](https://link.zhihu.com/?target=http%3A//path.as)(类型的字节码对象)，
   
      再进行比较：[cb.like](https://link.zhihu.com/?target=http%3A//cb.like)([custName.as](https://link.zhihu.com/?target=http%3A//custName.as)(String.class), "支付%");
   
      ```java
      @Test
      public void testSpec2() {
      	//构造查询条件
      	Specification<Customer> spec = new Specification<Customer>() {
      		@Override
      		public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
      			//查询属性：客户名
      			Path<Object> custName = root.get("custName");
      			//查询方式：模糊匹配
      			Predicate like = cb.like(custName.as(String.class), "支付%");
      			return like;
      		}
      	};
      	List<Customer> list = customerDao.findAll(spec);
      	for (Customer customer : list) {
      		System.out.println(customer);
      	}
      }
      ```
   
   4. **排序查询**
   
      创建排序对象,需要调用构造方法实例化sort对象
   
      ```java
      Sort sort = new Sort(Sort.Direction.DESC,"custId");
      ```
   
      第一个参数：排序的顺序（倒序，正序）
   
      Sort.Direction.DESC:倒序
   
      Sort.Direction.ASC ： 升序
   
      第二个参数：排序的属性名称
   
      ```java
      @Test
      public void testSpec3() {
      	//构造查询条件
      	Specification<Customer> spec = new Specification<Customer>() {
      		@Override
      		public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
      			//查询属性：客户名
      			Path<Object> custName = root.get("custName");
      			//查询方式：模糊匹配
      			Predicate like = cb.like(custName.as(String.class), "支付%");
      			return like;
      		}
      	};
      	//添加排序
      	Sort sort = new Sort(Sort.Direction.DESC,"custId");
      	List<Customer> list = customerDao.findAll(spec, sort);
      	for (Customer customer : list) {
      		System.out.println(customer);
      	}
      }
      ```
   
   5. **分页查询**
   
      Pageable：分页参数
   
      ```java
      Pageable pageable = new PageRequest(0,2);
      ```
   
      分页参数：查询的页码，每页查询的条数
   
      第一个参数：当前查询的页数（从0开始），第二个参数：每页查询的数量
   
      分页查询的findAll有两个重载方法
   
      findAll(Specification,Pageable)：带有条件的分页
   
      findAll(Pageable)：没有条件的分页
   
      ```java
      @Test
      public void testSpec4() {
      	Specification spec = null;
      	//PageRequest对象是Pageable接口的实现类
      	/**
      	 * 创建PageRequest的过程中，需要调用他的构造方法传入两个参数
      	 *      第一个参数：当前查询的页数（从0开始）
      	 *      第二个参数：每页查询的数量
      	 */
      	Pageable pageable = new PageRequest(0,2);
      	//分页查询
      	Page<Customer> page = customerDao.findAll(pageable);
      //        Page<Customer> page = customerDao.findAll(spec, pageable);
      	System.out.println(page.getContent()); //得到数据集合列表
      	System.out.println(page.getTotalElements());//得到总条数
      	System.out.println(page.getTotalPages());//得到总页数
      }
      ```

## 3. 用法示例

```java
@Service
public class StudentService implements IStudentService {

    @Autowired
    private IStudentRepository repository;

    //无关代码略

    @Override
    public List<Student> getStudent(String studentNumber,String name ,String nickName,
            Date birthday,String courseName,float chineseScore,float mathScore,
            float englishScore,float performancePoints) {
        Specification<Student> specification = new Specification<Student>(){

            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                //用于暂时存放查询条件的集合
                List<Predicate> predicatesList = new ArrayList<>();
                //--------------------------------------------
                //查询条件示例
                //equal示例
                if (!StringUtils.isEmpty(name)){
                    Predicate namePredicate = cb.equal(root.get("name"), name);
                    predicatesList.add(namePredicate);
                }
                //like示例
                if (!StringUtils.isEmpty(nickName)){
                    Predicate nickNamePredicate = cb.like(root.get("nickName"), '%'+nickName+'%');
                    predicatesList.add(nickNamePredicate);
                }
                //between示例
                if (birthday != null) {
                    Predicate birthdayPredicate = cb.between(root.get("birthday"), birthday, new Date());
                    predicatesList.add(birthdayPredicate);
                }
                
                //关联表查询示例
                if (!StringUtils.isEmpty(courseName)) {
                    Join<Student,Teacher> joinTeacher = root.join("teachers",JoinType.LEFT);
                    Predicate coursePredicate = cb.equal(joinTeacher.get("courseName"), courseName);
                    predicatesList.add(coursePredicate);
                }
                
                //复杂条件组合示例
                if (chineseScore!=0 && mathScore!=0 && englishScore!=0 && performancePoints!=0) {
                    Join<Student,Examination> joinExam = root.join("exams",JoinType.LEFT);
                    Predicate predicateExamChinese = cb.ge(joinExam.get("chineseScore"),chineseScore);
                    Predicate predicateExamMath = cb.ge(joinExam.get("mathScore"),mathScore);
                    Predicate predicateExamEnglish = cb.ge(joinExam.get("englishScore"),englishScore);
                    Predicate predicateExamPerformance = cb.ge(joinExam.get("performancePoints"),performancePoints);
                    //组合
                    Predicate predicateExam = cb.or(predicateExamChinese,predicateExamEnglish,predicateExamMath);
                    Predicate predicateExamAll = cb.and(predicateExamPerformance,predicateExam);
                    predicatesList.add(predicateExamAll);
                }
                //--------------------------------------------
                //排序示例(先根据学号排序，后根据姓名排序)
                query.orderBy(cb.asc(root.get("studentNumber")),cb.asc(root.get("name")));
                //--------------------------------------------
                //最终将查询条件拼好然后return
                Predicate[] predicates = new Predicate[predicatesList.size()];
                return cb.and(predicatesList.toArray(predicates));
            }

        
        };
        return repository.findAll(specification);
    }

}
```

## 参考文章

[Spring Data JPA（7）使用Specification进行动态查询](https://zhuanlan.zhihu.com/p/101564157)

[Spring Data JPA使用Specification动态构建多表查询](https://www.jianshu.com/p/659e9715d01d)