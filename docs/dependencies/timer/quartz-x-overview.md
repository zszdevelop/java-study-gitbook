---
order: 52
category:
  - 定时任务
---

# 定时任务 - quartz流程总结

## 1. 前置

项目除了quartz 提供的基础表之外，还额外建了两张表

- `sys_job`：定时任务调度表 
  - 每次新增定时任务，都会先向这张表插入一条数据，再建 quartz 任务（增删改同理）
  - **项目启动时，初始化定时器 **
    - **主要是防止手动修改数据库导致未同步到定时任务处理**（注：不能手动修改数据库ID和任务组名，否则会导致脏数据）
    - 意味着 `quartz` 基础表的`QRTZ_JOB_DETAILS`  项目每次启动都会清空更新一次
- `sys_job_log`  定时任务调度日志表
  - 执行完成记录日志

主要作用是

##  2. 流程

### 2.1 定时任务构建

1. 配置 `SchedulerFactoryBean` 生成 `Scheduler`

   配置包括 Scheduler 信息，持久化信息，是否集群，线程池信息

2. 项目启动时，初始化定时器

   1. 先清空定时任务 

      ```java
      scheduler.clear();
      ```

   2. 查我们自己表`sys_job`的定时任务初始化

      ```java
      List<SysJob> jobList = jobMapper.selectJobAll();
      for (SysJob job : jobList)
      {
          ScheduleUtils.createScheduleJob(scheduler, job);
      }
      ```

3. 创建定时任务

   1. 构建job信息

      ```java
      Class<? extends Job> jobClass = getQuartzJobClass(job);
      // 构建job信息
      Long jobId = job.getJobId();
      String jobGroup = job.getJobGroup();
      JobDetail jobDetail = JobBuilder.newJob(jobClass).withIdentity(getJobKey(jobId, jobGroup)).build();
      ```

   2. 构建trigger 触发器

      ```java
      // 表达式调度构建器
      CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule(job.getCronExpression());
      cronScheduleBuilder = handleCronScheduleMisfirePolicy(job, cronScheduleBuilder);
      
      // 按新的cronExpression表达式构建一个新的trigger
      CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(getTriggerKey(jobId, jobGroup))
              .withSchedule(cronScheduleBuilder).build();
      ```

   3. 将job 放入jobData 中

      ```java
      // 放入参数，运行时的方法可以获取
              jobDetail.getJobDataMap().put(ScheduleConstants.TASK_PROPERTIES, job);
      ```

   4. 构建scheduler 调度器

      ```java
      // 判断是否存在
      if (scheduler.checkExists(getJobKey(jobId, jobGroup)))
      {
          // 防止创建时存在数据问题 先移除，然后在执行创建操作
          scheduler.deleteJob(getJobKey(jobId, jobGroup));
      }
      
      scheduler.scheduleJob(jobDetail, trigger);
      
      // 暂停任务
      if (job.getStatus().equals(ScheduleConstants.Status.PAUSE.getValue()))
      {
          scheduler.pauseJob(ScheduleUtils.getJobKey(jobId, jobGroup));
      }
      ```

​				此时会持久化调度器信息.jobData 里面就是我们的job信息

​				<img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220719150143430.png" alt="image-20220719150143430"  />

### 2.2 定时任务的执行

以立即执行为例

1. 触发定时任务执行

   ```java
   /**
    * 立即运行任务
    * 
    * @param job 调度信息
    */
   @Override
   @Transactional
   public void run(SysJob job) throws SchedulerException
   {
       Long jobId = job.getJobId();
       String jobGroup = job.getJobGroup();
       SysJob properties = selectJobById(job.getJobId());
       // 参数
       JobDataMap dataMap = new JobDataMap();
       dataMap.put(ScheduleConstants.TASK_PROPERTIES, properties);
       scheduler.triggerJob(ScheduleUtils.getJobKey(jobId, jobGroup), dataMap);
   }
   ```

   从我们的`sys_job` 表中找到 job 信息。直接触发任务

2. job 执行

   我们实现 `job`  的`execute(JobExecutionContext context)` 就是我们任务的方法

   ```java
   @Override
   public void execute(JobExecutionContext context) throws JobExecutionException
   {
       SysJob sysJob = new SysJob();
       BeanUtils.copyBeanProp(sysJob, context.getMergedJobDataMap().get(ScheduleConstants.TASK_PROPERTIES));
       try
       {
           before(context, sysJob);
           if (sysJob != null)
           {
               doExecute(context, sysJob);
           }
           after(context, sysJob, null);
       }
       catch (Exception e)
       {
           log.error("任务执行异常  - ：", e);
           after(context, sysJob, e);
       }
   }
   ```

   1. 执行前 before 在threadLocal 记录开始时间

      ```java
      /**
           * 执行前
           *
           * @param context 工作执行上下文对象
           * @param sysJob 系统计划任务
           */
          protected void before(JobExecutionContext context, SysJob sysJob)
          {
              threadLocal.set(new Date());
          }
      ```

   2. 执行完成 after ，记录日志

      ```java
      /**
       * 执行后
       *
       * @param context 工作执行上下文对象
       * @param sysJob 系统计划任务
       */
      protected void after(JobExecutionContext context, SysJob sysJob, Exception e)
      {
          Date startTime = threadLocal.get();
          threadLocal.remove();
      
          final SysJobLog sysJobLog = new SysJobLog();
          sysJobLog.setJobName(sysJob.getJobName());
          sysJobLog.setJobGroup(sysJob.getJobGroup());
          sysJobLog.setInvokeTarget(sysJob.getInvokeTarget());
          sysJobLog.setStartTime(startTime);
          sysJobLog.setStopTime(new Date());
          long runMs = sysJobLog.getStopTime().getTime() - sysJobLog.getStartTime().getTime();
          sysJobLog.setJobMessage(sysJobLog.getJobName() + " 总共耗时：" + runMs + "毫秒");
          if (e != null)
          {
              sysJobLog.setStatus(Constants.FAIL);
              String errorMsg = StringUtils.substring(ExceptionUtil.getExceptionMessage(e), 0, 2000);
              sysJobLog.setExceptionInfo(errorMsg);
          }
          else
          {
              sysJobLog.setStatus(Constants.SUCCESS);
          }
      
          // 写入数据库当中
          SpringUtils.getBean(ISysJobLogService.class).addJobLog(sysJobLog);
      }
      ```

3. 执行任务有两种方式

   - QuartzDisallowConcurrentExecution ： 定时任务处理（禁止并发执行）

     ```java
     /**
      * 定时任务处理（禁止并发执行）
      * 
      * @author fardu
      *
      */
     @DisallowConcurrentExecution
     public class QuartzDisallowConcurrentExecution extends AbstractQuartzJob
     {
         @Override
         protected void doExecute(JobExecutionContext context, SysJob sysJob) throws Exception
         {
             JobInvokeUtil.invokeMethod(sysJob);
         }
     }
     ```

   - QuartzJobExecution：定时任务处理（允许并发执行）

     ```java
     /**
      * 定时任务处理（允许并发执行）
      * 
      * @author fardu
      *
      */
     public class QuartzJobExecution extends AbstractQuartzJob
     {
         @Override
         protected void doExecute(JobExecutionContext context, SysJob sysJob) throws Exception
         {
             JobInvokeUtil.invokeMethod(sysJob);
         }
     }
     ```

4. 任务执行工具

   主要就是通过反射的方式找到对应的方法

   ```java
   /**
    * 任务执行工具
    *
    * @author fardu
    */
   public class JobInvokeUtil
   {
       /**
        * 执行方法
        *
        * @param sysJob 系统任务
        */
       public static void invokeMethod(SysJob sysJob) throws Exception
       {
           String invokeTarget = sysJob.getInvokeTarget();
           String beanName = getBeanName(invokeTarget);
           String methodName = getMethodName(invokeTarget);
           List<Object[]> methodParams = getMethodParams(invokeTarget);
   
           if (!isValidClassName(beanName))
           {
               Object bean = SpringUtils.getBean(beanName);
               invokeMethod(bean, methodName, methodParams);
           }
           else
           {
               Object bean = Class.forName(beanName).newInstance();
               invokeMethod(bean, methodName, methodParams);
           }
       }
   
       /**
        * 调用任务方法
        *
        * @param bean 目标对象
        * @param methodName 方法名称
        * @param methodParams 方法参数
        */
       private static void invokeMethod(Object bean, String methodName, List<Object[]> methodParams)
               throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException,
               InvocationTargetException
       {
           if (StringUtils.isNotNull(methodParams) && methodParams.size() > 0)
           {
               Method method = bean.getClass().getDeclaredMethod(methodName, getMethodParamsType(methodParams));
               method.invoke(bean, getMethodParamsValue(methodParams));
           }
           else
           {
               Method method = bean.getClass().getDeclaredMethod(methodName);
               method.invoke(bean);
           }
       }
   
       /**
        * 校验是否为为class包名
        * 
        * @param str 名称
        * @return true是 false否
        */
       public static boolean isValidClassName(String invokeTarget)
       {
           return StringUtils.countMatches(invokeTarget, ".") > 1;
       }
   
       /**
        * 获取bean名称
        * 
        * @param invokeTarget 目标字符串
        * @return bean名称
        */
       public static String getBeanName(String invokeTarget)
       {
           String beanName = StringUtils.substringBefore(invokeTarget, "(");
           return StringUtils.substringBeforeLast(beanName, ".");
       }
   
       /**
        * 获取bean方法
        * 
        * @param invokeTarget 目标字符串
        * @return method方法
        */
       public static String getMethodName(String invokeTarget)
       {
           String methodName = StringUtils.substringBefore(invokeTarget, "(");
           return StringUtils.substringAfterLast(methodName, ".");
       }
   
       /**
        * 获取method方法参数相关列表
        * 
        * @param invokeTarget 目标字符串
        * @return method方法相关参数列表
        */
       public static List<Object[]> getMethodParams(String invokeTarget)
       {
           String methodStr = StringUtils.substringBetween(invokeTarget, "(", ")");
           if (StringUtils.isEmpty(methodStr))
           {
               return null;
           }
           String[] methodParams = methodStr.split(",");
           List<Object[]> classs = new LinkedList<>();
           for (int i = 0; i < methodParams.length; i++)
           {
               String str = StringUtils.trimToEmpty(methodParams[i]);
               // String字符串类型，包含'
               if (StringUtils.contains(str, "'"))
               {
                   classs.add(new Object[] { StringUtils.replace(str, "'", ""), String.class });
               }
               // boolean布尔类型，等于true或者false
               else if (StringUtils.equals(str, "true") || StringUtils.equalsIgnoreCase(str, "false"))
               {
                   classs.add(new Object[] { Boolean.valueOf(str), Boolean.class });
               }
               // long长整形，包含L
               else if (StringUtils.containsIgnoreCase(str, "L"))
               {
                   classs.add(new Object[] { Long.valueOf(StringUtils.replaceIgnoreCase(str, "L", "")), Long.class });
               }
               // double浮点类型，包含D
               else if (StringUtils.containsIgnoreCase(str, "D"))
               {
                   classs.add(new Object[] { Double.valueOf(StringUtils.replaceIgnoreCase(str, "D", "")), Double.class });
               }
               // 其他类型归类为整形
               else
               {
                   classs.add(new Object[] { Integer.valueOf(str), Integer.class });
               }
           }
           return classs;
       }
   
       /**
        * 获取参数类型
        * 
        * @param methodParams 参数相关列表
        * @return 参数类型列表
        */
       public static Class<?>[] getMethodParamsType(List<Object[]> methodParams)
       {
           Class<?>[] classs = new Class<?>[methodParams.size()];
           int index = 0;
           for (Object[] os : methodParams)
           {
               classs[index] = (Class<?>) os[1];
               index++;
           }
           return classs;
       }
   
       /**
        * 获取参数值
        * 
        * @param methodParams 参数相关列表
        * @return 参数值列表
        */
       public static Object[] getMethodParamsValue(List<Object[]> methodParams)
       {
           Object[] classs = new Object[methodParams.size()];
           int index = 0;
           for (Object[] os : methodParams)
           {
               classs[index] = (Object) os[0];
               index++;
           }
           return classs;
       }
   }
   
   ```

   