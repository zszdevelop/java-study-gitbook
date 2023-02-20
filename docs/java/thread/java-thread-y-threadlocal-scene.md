# ThreadLocal使用场景

## 1. 场景

### 1.1 多数据源情况

我们项目中如果存在多数据源的情况。为了不影响其他线程的数据源情况。我们切换的时候。一般会使用ThreadLocal 存储当前数据源

```java
/**
 * 数据源切换处理
 * 
 * @author ygn
 */
public class DynamicDataSourceContextHolder
{
    public static final Logger log = LoggerFactory.getLogger(DynamicDataSourceContextHolder.class);

    /**
     * 使用ThreadLocal维护变量，ThreadLocal为每个使用该变量的线程提供独立的变量副本，
     *  所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。
     */
    private static final ThreadLocal<String> CONTEXT_HOLDER = new ThreadLocal<>();

    /**
     * 设置数据源的变量
     */
    public static void setDataSourceType(String dsType)
    {
        log.info("切换到{}数据源", dsType);
        CONTEXT_HOLDER.set(dsType);
    }

    /**
     * 获得数据源的变量
     */
    public static String getDataSourceType()
    {
        return CONTEXT_HOLDER.get();
    }

    /**
     * 清空数据源变量
     */
    public static void clearDataSourceType()
    {
        CONTEXT_HOLDER.remove();
    }
}

```

### 1.2 记录日志时间

在任务执行前后，记录时间

```java
    /**
     * 线程本地变量
     */
    private static ThreadLocal<Date> threadLocal = new ThreadLocal<>();

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
 }
```

### 1.3 微信登录

1. 微信登录后(此时只获取了Openid和SessionKey信息 )
2. 将Openid和SessionKey还有appid存储在ThreadLocal。
3. 将信息存储到redis
4. 只返回给用户我们自己生成的sessionKey而不是微信的

```java
String thirdSessionKey = UUID.randomUUID().toString();
		ThirdSession thirdSession = new ThirdSession();
		thirdSession.setAppId(appId);
		thirdSession.setSessionKey(wxUser.getSessionKey());
		thirdSession.setWxUserId(wxUser.getId());
		thirdSession.setOpenId(wxUser.getOpenId());
		//将3rd_session和用户信息存入redis，并设置过期时间
		String key = WxMaConstants.THIRD_SESSION_BEGIN + ":" + thirdSessionKey;
		redisTemplate.opsForValue().set(key, JSON.toJSON(thirdSession) , WxMaConstants.TIME_OUT_SESSION, TimeUnit.HOURS);
		wxUser.setSessionKey(thirdSessionKey);
```

