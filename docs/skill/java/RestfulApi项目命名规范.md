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

## 3. 参考方法

### 3.1 Controller 层

```java


@RestController
@Api(tags = {"公告 信息操作处理"})
@RequestMapping("/system/notice")
public class SysNoticeController extends BaseController
{
    @Autowired
    private SysNoticeService noticeService;

  	@GetMapping("/list")
  	@ApiOperation(value = "获取通知公告列表")
    public TableDataInfo list(SysNotice notice)
    {
        startPage();
        List<SysNotice> list = noticeService.selectNoticeList(notice);
        return getDataTable(list);
    }
  
    @GetMapping(value = "/{noticeId}")
  	@ApiOperation(value = "根据通知公告编号获取详细信息")
    public AjaxResult getInfo(@PathVariable Long noticeId)
    {
      	SysNotice item = noticeService.selectNoticeById(noticeId)
        return AjaxResult.success(item);
    }

    @PostMapping
  	@ApiOperation(value = "新增通知公告")
    public AjaxResult add(@Validated @RequestBody SysNotice notice)
    {
        notice.setCreateBy(SecurityUtils.getUsername());
      	int i= noticeService.insertNotice(notice);
        return AjaxResult.dbRows(i);
    }

    @PutMapping
  	@ApiOperation(value = "修改通知公告")
    public AjaxResult edit(@Validated @RequestBody SysNotice notice)
    {
        notice.setUpdateBy(SecurityUtils.getUsername());
      	int i=   noticeService.updateNotice(notice);
      	return AjaxResult.dbRows(i);
    }

    @DeleteMapping("/{noticeIds}")
  	@ApiOperation(value = "删除通知公告")
    public AjaxResult remove(@PathVariable Long[] noticeIds)
    {
       int i= noticeService.deleteNoticeByIds(noticeIds);
       return AjaxResult.dbRows(i);
    }
}

```

### 3.2 Service 层

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

### 3.3 ServiceImpl 实现类

#### 3.3.1 Mybatis生成Mapper的Service实现类

SysNoticeServiceImpl

```java

/**
 * 公告 服务层实现
 * 
 */
@Service
public class SysNoticeServiceImpl implements SysNoticeService
{
    @Autowired
    private SysNoticeMapper noticeMapper;

    /**
     * 查询公告信息
     * 
     * @param noticeId 公告ID
     * @return 公告信息
     */
    @Override
    public SysNotice selectNoticeById(Long noticeId)
    {
        return noticeMapper.selectByPrimaryKey(noticeId);
    }

    /**
     * 查询公告列表
     * 
     * @param notice 公告信息
     * @return 公告集合
     */
    @Override
    public List<SysNotice> selectNoticeList(SysNotice notice)
    {
        SysNoticeExample example = new SysNoticeExample();
        SysNoticeExample.Criteria criteria = example.createCriteria();
      //TODO 过滤条件自己添加
        List<SysNotice> list = bjzfAjclMapper.selectByExample(example);
        return list;
    }

    /**
     * 新增公告
     * 
     * @param notice 公告信息
     * @return 结果
     */
    @Override
    public int insertNotice(SysNotice notice)
    {
      	notice.setId(IdUtils.fastSimpleUUID());
        return noticeMapper.insertSelective(notice);
    }

    /**
     * 修改公告
     * 
     * @param notice 公告信息
     * @return 结果
     */
    @Override
    public int updateNotice(SysNotice notice)
    {
        return noticeMapper.updateByPrimaryKeySelective(notice);
    }

    /**
     * 删除公告对象
     * 
     * @param noticeId 公告ID
     * @return 结果
     */
    @Override
    public int deleteNoticeById(Long noticeId)
    {
        return noticeMapper.deleteByPrimaryKey(noticeId);
    }

    /**
     * 批量删除公告信息
     *  
     * @param noticeIds 需要删除的公告ID
     * @return 结果
     */
    @Override
    public int deleteNoticeByIds(Long[] noticeIds)
    {	
      // TODO Mybatis生成Mapper 需要自己实现批量删除
      	List<String> list = Arrays.asList(noticeIds);
        return noticeMapper.deleteBatch(list);
    }
}

```

#### 3.3.2 自定义Mapper的Service实现类

```java

/**
 * 公告 服务层实现
 * 
 */
@Service
public class SysNoticeServiceImpl implements SysNoticeService
{
    @Autowired
    private SysNoticeMapper noticeMapper;

    /**
     * 查询公告信息
     * 
     * @param noticeId 公告ID
     * @return 公告信息
     */
    @Override
    public SysNotice selectNoticeById(Long noticeId)
    {
        return noticeMapper.selectNoticeById(noticeId);
    }

    /**
     * 查询公告列表
     * 
     * @param notice 公告信息
     * @return 公告集合
     */
    @Override
    public List<SysNotice> selectNoticeList(SysNotice notice)
    {
        return noticeMapper.selectNoticeList(notice);
    }

    /**
     * 新增公告
     * 
     * @param notice 公告信息
     * @return 结果
     */
    @Override
    public int insertNotice(SysNotice notice)
    {
        return noticeMapper.insertNotice(notice);
    }

    /**
     * 修改公告
     * 
     * @param notice 公告信息
     * @return 结果
     */
    @Override
    public int updateNotice(SysNotice notice)
    {
        return noticeMapper.updateNotice(notice);
    }

    /**
     * 删除公告对象
     * 
     * @param noticeId 公告ID
     * @return 结果
     */
    @Override
    public int deleteNoticeById(Long noticeId)
    {
        return noticeMapper.deleteNoticeById(noticeId);
    }

    /**
     * 批量删除公告信息
     * 
     * @param noticeIds 需要删除的公告ID
     * @return 结果
     */
    @Override
    public int deleteNoticeByIds(Long[] noticeIds)
    {
        return noticeMapper.deleteNoticeByIds(noticeIds);
    }
}
```

### 3.4 Mapper层

#### 3.4.1 Mybatis生成Mapper

自动生成，不过多介绍

#### 3.4.2 自定义Mapper

```java
/**
 * 通知公告表 数据层
 * 
 */
public interface SysNoticeMapper
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
     * 批量删除公告
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
    public int deleteNoticeByIds(List<Long> noticeIds);
}
```

### 3.5 Mapper层实现类

#### 3.4.1 Mybatis生成Mapper

自动生成，不过多介绍

#### 3.4.2 自定义Mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.fardu.system.mapper.SysNoticeMapper">
    
    <resultMap type="com.fardu.system.domain.SysNotice" id="SysNoticeResult">
        <result property="noticeId"       column="notice_id"       />
        <result property="noticeTitle"    column="notice_title"    />
        <result property="noticeType"     column="notice_type"     />
        <result property="noticeContent"  column="notice_content"  />
        <result property="status"         column="status"          />
        <result property="createBy"       column="create_by"       />
        <result property="createTime"     column="create_time"     />
        <result property="updateBy"       column="update_by"       />
        <result property="updateTime"     column="update_time"     />
        <result property="remark"         column="remark"          />
    </resultMap>
    
    <sql id="selectNoticeVo">
        select notice_id, notice_title, notice_type, notice_content, status, create_by, create_time, update_by, update_time, remark 
      from sys_notice
    </sql>
    
    <select id="selectNoticeById" parameterType="Long" resultMap="SysNoticeResult">
        <include refid="selectNoticeVo"/>
        where notice_id = #{noticeId}
    </select>
    
    <select id="selectNoticeList" parameterType="com.fardu.system.domain.SysNotice" resultMap="SysNoticeResult">
        <include refid="selectNoticeVo"/>
        <where>
         <if test="noticeTitle != null and noticeTitle != ''">
            AND notice_title like concat(concat('%',#{noticeTitle}),'%')
         </if>
         <if test="noticeType != null and noticeType != ''">
            AND notice_type = #{noticeType}
         </if>
         <if test="createBy != null and createBy != ''">
            AND create_by like concat(concat('%',#{createBy}),'%')
         </if>
      </where>
    </select>
    
    <insert id="insertNotice" parameterType="com.fardu.system.domain.SysNotice">
        <selectKey keyProperty="noticeId" order="BEFORE" resultType="long">
              select seq_sys_notice.nextval as noticeId from DUAL
        </selectKey>
        insert into sys_notice (
            <if test="noticeId != null and noticeId != '' ">notice_id, </if>
         <if test="noticeTitle != null and noticeTitle != '' ">notice_title, </if>
         <if test="noticeType != null and noticeType != '' ">notice_type, </if>
         <if test="noticeContent != null and noticeContent != '' ">notice_content, </if>
         <if test="status != null and status != '' ">status, </if>
         <if test="remark != null and remark != ''">remark,</if>
         <if test="createBy != null and createBy != ''">create_by,</if>
         create_time
      )values(
          <if test="noticeId != null and noticeId != '' ">#{noticeId}, </if>
         <if test="noticeTitle != null and noticeTitle != ''">#{noticeTitle}, </if>
         <if test="noticeType != null and noticeType != ''">#{noticeType}, </if>
         <if test="noticeContent != null and noticeContent != ''">#{noticeContent}, </if>
         <if test="status != null and status != ''">#{status}, </if>
         <if test="remark != null and remark != ''">#{remark},</if>
         <if test="createBy != null and createBy != ''">#{createBy},</if>
         sysdate
      )
    </insert>
    
    <update id="updateNotice" parameterType="com.fardu.system.domain.SysNotice">
        update sys_notice 
        <set>
            <if test="noticeTitle != null and noticeTitle != ''">notice_title = #{noticeTitle}, </if>
            <if test="noticeType != null and noticeType != ''">notice_type = #{noticeType}, </if>
            <if test="noticeContent != null">notice_content = #{noticeContent}, </if>
            <if test="status != null and status != ''">status = #{status}, </if>
            <if test="updateBy != null and updateBy != ''">update_by = #{updateBy},</if>
         update_time = sysdate
        </set>
        where notice_id = #{noticeId}
    </update>
   
    <delete id="deleteNoticeById" parameterType="Long">
        delete from sys_notice where notice_id = #{noticeId}
    </delete>
    
    <delete id="deleteNoticeByIds" parameterType="Long">
        delete from sys_notice where notice_id in 
        <foreach item="noticeId" collection="array" open="(" separator="," close=")">
            #{noticeId}
        </foreach>
    </delete>
    
</mapper>
```
