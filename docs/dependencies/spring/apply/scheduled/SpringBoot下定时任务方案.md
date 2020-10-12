# SpringBoot下定时任务方案

## 1. 背景

定时任务作为一种系统调度工具，在一些需要有定时作业的系统中应用广泛，如每逢某个时间点统计数据、在将来某个时刻执行某些东西

## 2. 定时器方案

- 开一个线程实现

- Java原生

  完整定时任务需要由Timer、TimerTask两个类，Timer是定时器类，用来按计划开启后台线程执行指定任务，TimerTask一个抽象类，它的子类代表一个可以被timer计划的任务

- ScheduledExecutorService类

- 第三方jar库Quartz

  Quartz是一个优秀的定时任务框架，发展至今已经非常成熟，以致后来其他的定时任务框架的核心思想或底层大多源于Quartz

- springboot提供的定时任务API

## 3. 具体实现

### 3.1 线程实现

利用线程可以设定休眠时间的方式可以实现简单的定时任务逻辑。

```java
public static void main(String[] args){
		//定时任务间隔时间
		int sleepTime=2*1000;
		new Thread(new Runnable() {
			@Override
			public void run() {
				while (true){
					try {
						System.out.println("Thread方式执行一次定时任务");
						//线程休眠规定时间
						Thread.sleep(sleepTime);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		}).start();
	}

```

### 3.2 Timer类

Timer类允许调度一个TimerTask任务。使用这种方式可以让你的程序按照某一个频度执行。

```java
public static void main(String[] args){
		int sleepTime=2*1000;
		TimerTask timerTask = new TimerTask() {
			@Override
			public void run() {
				System.out.println("Timer方式执行一次定时任务");
			}
		};
		new Timer().schedule(timerTask,1,sleepTime);
	}
```

### 3.3 ScheduledExecutorService类

ScheduledExecutorService,是基于线程池设计的定时任务类,每个调度任务都会分配到线程池中的一个线程去执行,也就是说,任务是并发执行,互不影响。 因此，基于ScheduledExecutorService类的定时任务类，归根到底也是基于线程的调度实现的。

```java
	public static void main(String[] args){
		int sleepTime=2*1000;
		ScheduledExecutorService scheduledExecutor = Executors.newSingleThreadScheduledExecutor();
		scheduledExecutor.scheduleAtFixedRate(
				new Runnable() {
					@Override
					public void run() {
						System.out.println("ScheduledExecutorService方式执行一次定时任务");
					}
				}
		,1,sleepTime, TimeUnit.SECONDS);
	}

```

### 3.4 整合Quartz

Quartz是一个完全由Java编写的开源作业调度框架，为在 Java 应用程序中进行作业调度提供了简单却强大的机制,要理解它的使用方式，需要先理解它的几个核心概念：

>1. **Job:** 表示一个工作，要执行的具体内容。此接口中只有一个方法，如下： void execute(JobExecutionContext context)
>2. **JobDetail:** 表示一个具体的可执行的调度程序，Job 是这个可执行程调度程序所要执行的内容，另外 JobDetail 还包含了这个任务调度的方案和策略。
>3. **Trigger:** 代表一个调度参数的配置，什么时候去调。
>4. **Scheduler:** 代表一个调度容器，一个调度容器中可以注册多个 JobDetail 和Trigger。当 Trigger 与 JobDetail 组合，就可以被 Scheduler 容器调度了。

1. 引入quartz依赖

   ```
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-quartz</artifactId>
   </dependency>
   ```

2. 配置

   ```java
   @Configuration
   public class QuartzConfig {
       @Bean
       public JobDetail quartzDetail(){
           return JobBuilder.newJob(QuartzTest.class).withIdentity("QuartzTest").storeDurably().build();
       }
       @Bean
       public SimpleTrigger quartzTrigger(){
           SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule()
                   .withIntervalInSeconds(10)
                   .repeatForever();
           return TriggerBuilder.newTrigger().forJob(quartzDetail())
                   .withIdentity("QuartzTest")
                   .withSchedule(scheduleBuilder)
                   .build();
       }
   }
   
   ```

3. 测试

   ```java
   public class QuartzTest extends QuartzJobBean {
       @Override
       protected void executeInternal(JobExecutionContext jobExecutionContext){
           System.out.println("quartz执行一次定时任务 ");
       }
   }
   ```

### 3.5 使用Scheduled注解

@Scheduled是spring为定时任务而生的一个注解，查看注解的源码：

```
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repeatable(Schedules.class)
public @interface Scheduled {
//cron表达式
	String cron() default "";
//接收一个java.util.TimeZone#ID。
	String zone() default "";
//上一次执行完毕时间点之后多长时间再执行
	long fixedDelay() default -1;
//支持占位符形式的字符串类型的fixedDelay
	String fixedDelayString() default "";
//上一次开始执行时间点之后多长时间再执行
	long fixedRate() default -1;
//支持占位符形式的字符串类型的fixedRateString
	String fixedRateString() default "";
//第一次延迟多长时间后再执行	
	long initialDelay() default -1;
//支持占位符形式的字符串类型的initialDelay
	String initialDelayString() default "";
}

```



可以看出：Scheduled注解中的参数用来设置“定时”动作，通常情况下，比较常用的参数是cron(),这意味着我们需要学会一些cron表达式相关的语法，但由于内容较多，篇幅较长，在这里暂不铺开讲解，我们把cron语法相关放到文章最后，在此先讲解如何用Scheduled注解来实现定时任务。

1. 开启定时任务支持

```
@SpringBootApplication
/**
 * 开启定时任务支持
 */
@EnableScheduling
public class TestApplication  extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(TestApplication.class, args);
    }
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}

```

2. 使用

```
@Component
public class ScheduledTest {
    private Logger logger = LoggerFactory.getLogger(ScheduledTest.class);
    /**
     * 每15秒执行一次定时任务
     */
    @Scheduled(cron = "0/15 * * * * ? ")
    public void testCron(){
        logger.info("Scheduled 执行一次定时任务");
    }
}

```

## 4. cron表达式

cron表达式是一个字符串其语法为：

```
[秒] [分] [小时] [日] [月] [周] [年]
复制代码
```

其中[年]为非必填项，因此通常cron表达式通常由6或7部分内容组成，内容的取值为数字或者一些cron表达式约定的特殊字符，这些特殊字符称为“通配符”，每一个通配符分别代指一种值。cron表达式可以用这样的表格来表示：

| 顺序         | 取值范围       | 特殊字符串范围 |
| ------------ | -------------- | -------------- |
| 秒           | 0~60           | , - * /        |
| 分           | 0-60           | , - * /        |
| 时           | 0-23           | , - * /        |
| 日           | 1-31           | , - * /        |
| 月           | 1-12 / JAN-DEC | , - * ? / L W  |
| 周           | 1-7 / SUN-SAT  | , - * ? / L #  |
| 年（可省略） | 1970-2099      | , - * /        |

其中通配符的解释以及作用如下：

| 通配符 | 代表的值   | 解释                                                         |
| ------ | ---------- | ------------------------------------------------------------ |
| *      | 所有值     | 如：时字段为*，代表每小时都触发                              |
| ?      | 不指定值   | 如：周字段为?，代表表达式不关心是周几                        |
| -      | 区间       | 如：时字段设置2-5，代表2，3，4，5点钟时都触发                |
| ,      | 多个值     | 如：时字段设置2,3,5，代表2，3，5点都会触发                   |
| /      | 递增值     | 如：时字段设置0/2，代表每两个小时触发，时字段设置 2/5，代表从2时开始每隔5小时触发一次 |
| L      | 最后值     | 如：日字段设置L，代表本月最后一天                            |
| W      | 最近工作日 | 如：在日字段设置13W，代表没约13日最近的那个工作日触发一次    |
| #      | 序号       | 如：在周字段设置5#2，代表每月的第二个周五                    |

> 示例： 每2秒执行一次：0/5 * * * * ? 每5分钟执行一次：0 0/5 * * * ? 1分、12分、45分执行一次：0 1,12,45 * * * ? 每天23点59分59秒执行一次：59 59 23 * * ? 每月15号凌晨3点执行一次：0 0 3 15 * ? 每月最后一天12点执行一次：0 0 12 L * ?



## 参考文章

[SpringBoot下使用定时任务的方式全揭秘](https://juejin.im/post/5c643a69f265da2dc0063c94)

