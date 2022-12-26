import{_ as e,W as i,X as n,a0 as s}from"./framework-0cf5f349.js";const l={},d=s(`<h1 id="aop打印日志" tabindex="-1"><a class="header-anchor" href="#aop打印日志" aria-hidden="true">#</a> AOP打印日志</h1><h2 id="_1-log-注解" tabindex="-1"><a class="header-anchor" href="#_1-log-注解" aria-hidden="true">#</a> 1. @Log 注解</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    String value() default &quot;&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-aop记录操作日志" tabindex="-1"><a class="header-anchor" href="#_2-aop记录操作日志" aria-hidden="true">#</a> 2. AOP记录操作日志</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * AOP 记录用户操作日志
 */
@Slf4j
@Aspect
@Component
public class LogAspect {

    @Autowired
    private FebsProperties febsProperties;

    @Autowired
    private LogService logService;

    @Pointcut(&quot;@annotation(com.ylzinfo.common.annotation.Log)&quot;)
    public void pointcut() {
        // do nothing
    }

    @Around(&quot;pointcut()&quot;)
    public Object around(ProceedingJoinPoint point) throws JsonProcessingException {
        Object result = null;
        long beginTime = System.currentTimeMillis();
        try {
            // 执行方法
            result = point.proceed();
        } catch (Throwable e) {
            log.error(e.getMessage());
        }
        // 获取 request
        HttpServletRequest request = HttpContextUtil.getHttpServletRequest();
        // 设置 IP 地址
        String ip = IPUtil.getIpAddr(request);
        // 执行时长(毫秒)
        long time = System.currentTimeMillis() - beginTime;
        if (febsProperties.isOpenAopLog()) {
            // 保存日志
            String token = (String) SecurityUtils.getSubject().getPrincipal();
            String username = JWTUtil.getUsername(token);

            SysLog log = new SysLog();
            log.setUsername(username);
            log.setIp(ip);
            log.setTime(time);
            logService.saveLog(point, log);
        }
        return result;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将用户名、操作ip、操作时长记录到数据库中</p><h2 id="_3-具体使用" tabindex="-1"><a class="header-anchor" href="#_3-具体使用" aria-hidden="true">#</a> 3. 具体使用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Log(&quot;新增用户&quot;)
@PostMapping
@RequiresPermissions(&quot;user:add&quot;)
public void addUser( @Valid User user) throws FebsException {
       ....
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=[d];function a(t,v){return i(),n("div",null,r)}const u=e(l,[["render",a],["__file","spring-y-aop-log.html.vue"]]);export{u as default};
