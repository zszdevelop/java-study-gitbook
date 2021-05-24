# RestfulApi项目命名规范

## 1. RESTfulApi 简介

REST（REpresentational State Transfer） 直译就是：抽象状态转移。

他通过 **URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作**。

- 看Url就知道要什么
- 看http method就知道干什么
- 看http status code就知道结果如何



常用的方法

- 用 GET 来检索服务端资源
- 用 POST 来创建服务端资源
- 用 PUT 来更新服务端资源
- 用 DELETE 来删除服务端资源

[更多RESTfulApi查看](/dependencies/spring/springmvc/RESTful.md)

## 2. 问题背景

虽然有了一个规范，可实现的方式有很多种，在不同项目，不同人编写出来的都不一致。还是希望有一个比较完善的标准来约束自己

- get
  - 查看列表
    - Controller层 url 地址: /list
    - Controller层方法名: list(XXX xxx)
    - Service层方法名为：selectXXXXList
  - 查看详情
    - Controller层 url 地址：/{xxxId}
    - Controller 层方法名为：getInfo(@PathVariable Long xxxId)
    - Service层方法名为：selectXxxById(Long xxxId)
- post
  - 新增
    - Controller层 url 地址：缺省
    - Controller 层方法名为：add( @RequestBody Xxx xxx)
    - Service层方法名为：int insertXxx(Xxx xxx)
- Put
  - 修改完整对象
    - Controller层 url 地址：缺省
    - Controller 层方法名为：edit( @RequestBody Xxx xxx)
    - Service层方法名为：int updateXxx(Xxx xxx)
  - 修改某一属性等操作
    - Controller层 url 地址：/resetXxx
    - Controller 层方法名为：resetXxx( @RequestBody Xxx xxx)
    - Service层方法名为：int resetXxx(Xxx xxx)
- delete
  - 删除单个
    - Controller层 url 地址：/{xxxId}
    - Controller 层方法名为：remove(@PathVariable Long xxxId)
    - Service层方法名为：int deleteXxxById(Long xxxId);
  - 删除多个
    - Controller层 url 地址：/{xxxIds}
    - Controller 层方法名为：remove(@PathVariable Long[] xxxIds)
    - Service层方法名为：int deleteXxxByIds(Long[] xxxIds);

## 参考方法

Controller 层

```java

/**
 * 公告 信息操作处理
 * 
 */
@RestController
@RequestMapping("/system/notice")
public class SysNoticeController extends BaseController
{
    @Autowired
    private ISysNoticeService noticeService;

    /**
     * 获取通知公告列表
     */
    public TableDataInfo list(SysNotice notice)
    {
        startPage();
        List<SysNotice> list = noticeService.selectNoticeList(notice);
        return getDataTable(list);
    }

    /**
     * 根据通知公告编号获取详细信息
     */
    @GetMapping(value = "/{noticeId}")
    public AjaxResult getInfo(@PathVariable Long noticeId)
    {
        return AjaxResult.success(noticeService.selectNoticeById(noticeId));
    }

    /**
     * 新增通知公告
     */
    @PostMapping
    public AjaxResult add(@Validated @RequestBody SysNotice notice)
    {
        notice.setCreateBy(SecurityUtils.getUsername());
        return toAjax(noticeService.insertNotice(notice));
    }

    /**
     * 修改通知公告
     */
    @PutMapping
    public AjaxResult edit(@Validated @RequestBody SysNotice notice)
    {
        notice.setUpdateBy(SecurityUtils.getUsername());
        return toAjax(noticeService.updateNotice(notice));
    }

    /**
     * 删除通知公告
     */
    @DeleteMapping("/{noticeIds}")
    public AjaxResult remove(@PathVariable Long[] noticeIds)
    {
        return toAjax(noticeService.deleteNoticeByIds(noticeIds));
    }
}

```

Service 层

````java
public interface SysNoticeService
{
    /**
     * 查询公告信息
     * 
     * @param noticeId 公告ID
     * @return 公告信息
     */
    public SysNotice selectNoticeById(Long noticeId);

    /**
     * 查询公告列表
     * 
     * @param notice 公告信息
     * @return 公告集合
     */
    public List<SysNotice> selectNoticeList(SysNotice notice);

    /**
     * 新增公告
     * 
     * @param notice 公告信息
     * @return 结果
     */
    public int insertNotice(SysNotice notice);

    /**
     * 修改公告
     * 
     * @param notice 公告信息
     * @return 结果
     */
    public int updateNotice(SysNotice notice);

    /**
     * 删除公告信息
     * 
     * @param noticeId 公告ID
     * @return 结果
     */
    public int deleteNoticeById(Long noticeId);
    
    /**
     * 批量删除公告信息
     * 
     * @param noticeIds 需要删除的公告ID
     * @return 结果
     */
    public int deleteNoticeByIds(Long[] noticeIds);
}

````

