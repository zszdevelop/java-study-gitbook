import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as n,e as s}from"./app.236288ec.js";const l={},d=s(`<h1 id="aop\u6253\u5370\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#aop\u6253\u5370\u65E5\u5FD7" aria-hidden="true">#</a> AOP\u6253\u5370\u65E5\u5FD7</h1><h2 id="_1-log-\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#_1-log-\u6CE8\u89E3" aria-hidden="true">#</a> 1. @Log \u6CE8\u89E3</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    String value() default &quot;&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-aop\u8BB0\u5F55\u64CD\u4F5C\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#_2-aop\u8BB0\u5F55\u64CD\u4F5C\u65E5\u5FD7" aria-hidden="true">#</a> 2. AOP\u8BB0\u5F55\u64CD\u4F5C\u65E5\u5FD7</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
 * AOP \u8BB0\u5F55\u7528\u6237\u64CD\u4F5C\u65E5\u5FD7
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
            // \u6267\u884C\u65B9\u6CD5
            result = point.proceed();
        } catch (Throwable e) {
            log.error(e.getMessage());
        }
        // \u83B7\u53D6 request
        HttpServletRequest request = HttpContextUtil.getHttpServletRequest();
        // \u8BBE\u7F6E IP \u5730\u5740
        String ip = IPUtil.getIpAddr(request);
        // \u6267\u884C\u65F6\u957F(\u6BEB\u79D2)
        long time = System.currentTimeMillis() - beginTime;
        if (febsProperties.isOpenAopLog()) {
            // \u4FDD\u5B58\u65E5\u5FD7
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u7528\u6237\u540D\u3001\u64CD\u4F5Cip\u3001\u64CD\u4F5C\u65F6\u957F\u8BB0\u5F55\u5230\u6570\u636E\u5E93\u4E2D</p><h2 id="_3-\u5177\u4F53\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_3-\u5177\u4F53\u4F7F\u7528" aria-hidden="true">#</a> 3. \u5177\u4F53\u4F7F\u7528</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Log(&quot;\u65B0\u589E\u7528\u6237&quot;)
@PostMapping
@RequiresPermissions(&quot;user:add&quot;)
public void addUser( @Valid User user) throws FebsException {
       ....
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=[d];function a(t,v){return i(),n("div",null,r)}const o=e(l,[["render",a],["__file","spring-y-aop-log.html.vue"]]);export{o as default};
