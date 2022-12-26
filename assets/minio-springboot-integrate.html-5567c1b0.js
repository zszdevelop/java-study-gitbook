import{_ as a,W as t,X as p,Y as n,Z as e,$ as c,a0 as o,D as i}from"./framework-0cf5f349.js";const l={},u=o(`<h1 id="minio基础-springboot集成minio" tabindex="-1"><a class="header-anchor" href="#minio基础-springboot集成minio" aria-hidden="true">#</a> Minio基础 - SpringBoot集成Minio</h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言" aria-hidden="true">#</a> 1. 前言</h2><p>之前介绍了如何使用Minio提供的JAVA SDK进行上传和下载文件，在此基础上，我们可以使用spring boot集成Minio JAVA SDK，添加自动配置、装配、客户端管理等功能，简化开发。</p><h2 id="_2-spring-boot集成minio" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot集成minio" aria-hidden="true">#</a> 2. Spring Boot集成Minio</h2><h3 id="_2-1-环境搭建" tabindex="-1"><a class="header-anchor" href="#_2-1-环境搭建" aria-hidden="true">#</a> 2.1 环境搭建</h3><p>首先我们搭建一个spring boot基础工程，引入以下依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/io.minio/minio --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.minio<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>minio<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>8.3.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>me.tongfei<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>progressbar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>0.9.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.squareup.okhttp3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>okhttp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.9.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.7.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-configuration-processor<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>commons-fileupload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>commons-fileupload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-操作模板类" tabindex="-1"><a class="header-anchor" href="#_2-2-操作模板类" aria-hidden="true">#</a> 2.2 操作模板类</h3><p>在spring中，提供了很多集成第三方的操作模板类，比如RedisTemplate、RestTemplate等等，我们可以参照这些，提供一个minio SDK的集成模板类，这样在使用API时就比较方便了。</p><p>首先需要创建一个OSS文件对象，上传文件成功后，我们需要将文件信息返回给前端</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OssFile</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * OSS 存储时文件路径
     */</span>
    <span class="token class-name">String</span> ossFilePath<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 原始文件名
     */</span>
    <span class="token class-name">String</span> originalFileName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建了一个MinioTemplate，提供了系列对Minio API的集成。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MinioTemplate</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * MinIO 客户端
     */</span>
    <span class="token class-name">MinioClient</span> minioClient<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * MinIO 配置类
     */</span>
    <span class="token class-name">OssProperties</span> ossProperties<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 查询所有存储桶
     *
     * <span class="token keyword">@return</span> Bucket 集合
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Bucket</span><span class="token punctuation">&gt;</span></span> <span class="token function">listBuckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">listBuckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 桶是否存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> 桶名
     * <span class="token keyword">@return</span> 是否存在
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">bucketExists</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">bucketExists</span><span class="token punctuation">(</span><span class="token class-name">BucketExistsArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建存储桶
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> 桶名
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makeBucket</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">bucketExists</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minioClient<span class="token punctuation">.</span><span class="token function">makeBucket</span><span class="token punctuation">(</span><span class="token class-name">MakeBucketArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除一个空桶 如果存储桶存在对象不为空时，删除会报错。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> 桶名
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeBucket</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        minioClient<span class="token punctuation">.</span><span class="token function">removeBucket</span><span class="token punctuation">(</span><span class="token class-name">RemoveBucketArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 上传文件
     *
     * <span class="token keyword">@param</span> <span class="token parameter">inputStream</span>      流
     * <span class="token keyword">@param</span> <span class="token parameter">originalFileName</span> 原始文件名
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>       桶名
     * <span class="token keyword">@return</span> OssFile
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">OssFile</span> <span class="token function">putObject</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inputStream<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> originalFileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> uuidFileName <span class="token operator">=</span> <span class="token function">generateOssUuidFileName</span><span class="token punctuation">(</span>originalFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                bucketName <span class="token operator">=</span> ossProperties<span class="token punctuation">.</span><span class="token function">getDefaultBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            minioClient<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>
                    <span class="token class-name">PutObjectArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span>uuidFileName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>
                            inputStream<span class="token punctuation">,</span> inputStream<span class="token punctuation">.</span><span class="token function">available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OssFile</span><span class="token punctuation">(</span>uuidFileName<span class="token punctuation">,</span> originalFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>inputStream <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                inputStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回临时带签名、过期时间一天、Get请求方式的访问URL
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>  桶名
     * <span class="token keyword">@param</span> <span class="token parameter">ossFilePath</span> Oss文件路径
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPresignedObjectUrl</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> ossFilePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">getPresignedObjectUrl</span><span class="token punctuation">(</span>
                <span class="token class-name">GetPresignedObjectUrlArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token class-name">Method</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span>ossFilePath<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">expiry</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * GetObject接口用于获取某个文件（Object）。此操作需要对此Object具有读权限。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>  桶名
     * <span class="token keyword">@param</span> <span class="token parameter">ossFilePath</span> Oss文件路径
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">InputStream</span> <span class="token function">getObject</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> ossFilePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>
                <span class="token class-name">GetObjectArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span>ossFilePath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 查询桶的对象信息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> 桶名
     * <span class="token keyword">@param</span> <span class="token parameter">recursive</span>  是否递归查询
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Result</span><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">listObjects</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token keyword">boolean</span> recursive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">listObjects</span><span class="token punctuation">(</span>
                <span class="token class-name">ListObjectsArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">recursive</span><span class="token punctuation">(</span>recursive<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
     * 生成随机文件名，防止重复
     *
     * <span class="token keyword">@param</span> <span class="token parameter">originalFilename</span> 原始文件名
     * <span class="token keyword">@return</span> 
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">generateOssUuidFileName</span><span class="token punctuation">(</span><span class="token class-name">String</span> originalFilename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;files&quot;</span> <span class="token operator">+</span> <span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token constant">SLASH</span> <span class="token operator">+</span> <span class="token class-name">DateUtil</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token constant">SLASH</span> <span class="token operator">+</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token constant">SLASH</span> <span class="token operator">+</span> originalFilename<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取带签名的临时上传元数据对象，前端可获取后，直接上传到Minio
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>
     * <span class="token keyword">@param</span> <span class="token parameter">fileName</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getPresignedPostFormData</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 为存储桶创建一个上传策略，过期时间为7天</span>
        <span class="token class-name">PostPolicy</span> policy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PostPolicy</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">,</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">plusDays</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置一个参数key，值为上传对象的名称</span>
        policy<span class="token punctuation">.</span><span class="token function">addEqualsCondition</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 添加Content-Type以&quot;image/&quot;开头，表示只能上传照片</span>
        policy<span class="token punctuation">.</span><span class="token function">addStartsWithCondition</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;image/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置上传文件的大小 64kiB to 10MiB.</span>
        policy<span class="token punctuation">.</span><span class="token function">addContentLengthRangeCondition</span><span class="token punctuation">(</span><span class="token number">64</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">getPresignedPostFormData</span><span class="token punctuation">(</span>policy<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 初始化默认存储桶
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initDefaultBucket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> defaultBucketName <span class="token operator">=</span> ossProperties<span class="token punctuation">.</span><span class="token function">getDefaultBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">bucketExists</span><span class="token punctuation">(</span>defaultBucketName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;默认存储桶已存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;创建默认存储桶&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">makeBucket</span><span class="token punctuation">(</span>ossProperties<span class="token punctuation">.</span><span class="token function">getDefaultBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-自动配置" tabindex="-1"><a class="header-anchor" href="#_2-3-自动配置" aria-hidden="true">#</a> 2.3 自动配置</h3><p>在了解了BAT公司提供的对象存储OSS后，发现其API接口标准都是差不多的，从扩展性的角度出发，我们当前服务应当支持各种类型的OSS，比如阿里、华为、腾讯等。所以这里先定义一个枚举类，提供除了Minio还适配其他厂商的支持。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">OssType</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Minio 对象存储
     */</span>
    <span class="token function">MINIO</span><span class="token punctuation">(</span><span class="token string">&quot;minio&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 华为 OBS
     */</span>
    <span class="token function">OBS</span><span class="token punctuation">(</span><span class="token string">&quot;obs&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 腾讯 COS
     */</span>
    <span class="token function">COS</span><span class="token punctuation">(</span><span class="token string">&quot;tencent&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 阿里巴巴 SSO
     */</span>
    <span class="token function">ALIBABA</span><span class="token punctuation">(</span><span class="token string">&quot;alibaba&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 名称
     */</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 类型
     */</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> type<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建OSS配置类，可以选择不同类型的OSS集成，以及集成需要的访问地址、用户密码等信息配置。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;oss&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OssProperties</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 是否开启
     */</span>
    <span class="token class-name">Boolean</span> enabled<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 存储对象服务器类型
     */</span>
    <span class="token class-name">OssType</span> type<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * OSS 访问端点，集群时需提供统一入口
     */</span>
    <span class="token class-name">String</span> endpoint<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户名
     */</span>
    <span class="token class-name">String</span> accessKey<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 密码
     */</span>
    <span class="token class-name">String</span> secretKey<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 默认存储桶名，没有指定时，会放在默认的存储桶
     */</span>
    <span class="token class-name">String</span> defaultBucketName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后编译一下项目，将配置类转为spring-configuration-metadata.json文件，这样这些配置在yml中就有提示功能了。</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723232931077.png" alt="image-20220723232931077" tabindex="0" loading="lazy"><figcaption>image-20220723232931077</figcaption></figure><p>最后在根据我们配置的OSS类型，创建不同的自动配置类，这里创建的MinioConfiguration，主要是根据配置注入MinioClient及MinioTemplate模板类，将其交给Spring容器管理。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnClass</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">MinioClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">OssProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnExpression</span><span class="token punctuation">(</span><span class="token string">&quot;\${oss.enabled}&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;oss.type&quot;</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">&quot;minio&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MinioConfiguration</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span><span class="token class-name">MinioClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">MinioClient</span> <span class="token function">minioClient</span><span class="token punctuation">(</span><span class="token class-name">OssProperties</span> ossProperties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">MinioClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">endpoint</span><span class="token punctuation">(</span>ossProperties<span class="token punctuation">.</span><span class="token function">getEndpoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">credentials</span><span class="token punctuation">(</span>ossProperties<span class="token punctuation">.</span><span class="token function">getAccessKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ossProperties<span class="token punctuation">.</span><span class="token function">getSecretKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnBean</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">MinioClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span><span class="token class-name">MinioTemplate</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">MinioTemplate</span> <span class="token function">minioTemplate</span><span class="token punctuation">(</span><span class="token class-name">MinioClient</span> minioClient<span class="token punctuation">,</span> <span class="token class-name">OssProperties</span> ossProperties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MinioTemplate</span><span class="token punctuation">(</span>minioClient<span class="token punctuation">,</span> ossProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-测试" tabindex="-1"><a class="header-anchor" href="#_2-4-测试" aria-hidden="true">#</a> 2.4 测试</h3><p>首先，在yml中添加Minio的配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>oss:
  enabled: true
  type: MINIO
  endpoint: http://127.0.0.1:9000
  access-key: admin
  secret-key: admin123
  default-bucket-name: pearl-buckent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后创建一个访问接口，直接调用minioTemplate进行文件操作，这样就十分便利，达到了简化开发的目的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token class-name">MinioTemplate</span> minioTemplate<span class="token punctuation">;</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/upload&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ResponseBody</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> minioTemplate<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bucketName<span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,28),k={href:"https://yunyanchengyu.blog.csdn.net/article/details/120920171",target:"_blank",rel:"noopener noreferrer"};function d(r,m){const s=i("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[n("a",k,[e("Minio入门系列【12】Spring Boot集成Minio"),c(s)])])])}const b=a(l,[["render",d],["__file","minio-springboot-integrate.html.vue"]]);export{b as default};
