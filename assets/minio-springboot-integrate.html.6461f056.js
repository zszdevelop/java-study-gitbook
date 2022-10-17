import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as p,a as n,b as e,d as c,e as o,r as i}from"./app.8ac0b9e0.js";const l={},u=c(`<h1 id="minio\u57FA\u7840-springboot\u96C6\u6210minio" tabindex="-1"><a class="header-anchor" href="#minio\u57FA\u7840-springboot\u96C6\u6210minio" aria-hidden="true">#</a> Minio\u57FA\u7840 - SpringBoot\u96C6\u6210Minio</h1><h2 id="_1-\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#_1-\u524D\u8A00" aria-hidden="true">#</a> 1. \u524D\u8A00</h2><p>\u4E4B\u524D\u4ECB\u7ECD\u4E86\u5982\u4F55\u4F7F\u7528Minio\u63D0\u4F9B\u7684JAVA SDK\u8FDB\u884C\u4E0A\u4F20\u548C\u4E0B\u8F7D\u6587\u4EF6\uFF0C\u5728\u6B64\u57FA\u7840\u4E0A\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528spring boot\u96C6\u6210Minio JAVA SDK\uFF0C\u6DFB\u52A0\u81EA\u52A8\u914D\u7F6E\u3001\u88C5\u914D\u3001\u5BA2\u6237\u7AEF\u7BA1\u7406\u7B49\u529F\u80FD\uFF0C\u7B80\u5316\u5F00\u53D1\u3002</p><h2 id="_2-spring-boot\u96C6\u6210minio" tabindex="-1"><a class="header-anchor" href="#_2-spring-boot\u96C6\u6210minio" aria-hidden="true">#</a> 2. Spring Boot\u96C6\u6210Minio</h2><h3 id="_2-1-\u73AF\u5883\u642D\u5EFA" tabindex="-1"><a class="header-anchor" href="#_2-1-\u73AF\u5883\u642D\u5EFA" aria-hidden="true">#</a> 2.1 \u73AF\u5883\u642D\u5EFA</h3><p>\u9996\u5148\u6211\u4EEC\u642D\u5EFA\u4E00\u4E2Aspring boot\u57FA\u7840\u5DE5\u7A0B\uFF0C\u5F15\u5165\u4EE5\u4E0B\u4F9D\u8D56</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-\u64CD\u4F5C\u6A21\u677F\u7C7B" tabindex="-1"><a class="header-anchor" href="#_2-2-\u64CD\u4F5C\u6A21\u677F\u7C7B" aria-hidden="true">#</a> 2.2 \u64CD\u4F5C\u6A21\u677F\u7C7B</h3><p>\u5728spring\u4E2D\uFF0C\u63D0\u4F9B\u4E86\u5F88\u591A\u96C6\u6210\u7B2C\u4E09\u65B9\u7684\u64CD\u4F5C\u6A21\u677F\u7C7B\uFF0C\u6BD4\u5982RedisTemplate\u3001RestTemplate\u7B49\u7B49\uFF0C\u6211\u4EEC\u53EF\u4EE5\u53C2\u7167\u8FD9\u4E9B\uFF0C\u63D0\u4F9B\u4E00\u4E2Aminio SDK\u7684\u96C6\u6210\u6A21\u677F\u7C7B\uFF0C\u8FD9\u6837\u5728\u4F7F\u7528API\u65F6\u5C31\u6BD4\u8F83\u65B9\u4FBF\u4E86\u3002</p><p>\u9996\u5148\u9700\u8981\u521B\u5EFA\u4E00\u4E2AOSS\u6587\u4EF6\u5BF9\u8C61\uFF0C\u4E0A\u4F20\u6587\u4EF6\u6210\u529F\u540E\uFF0C\u6211\u4EEC\u9700\u8981\u5C06\u6587\u4EF6\u4FE1\u606F\u8FD4\u56DE\u7ED9\u524D\u7AEF</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OssFile</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * OSS \u5B58\u50A8\u65F6\u6587\u4EF6\u8DEF\u5F84
     */</span>
    <span class="token class-name">String</span> ossFilePath<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * \u539F\u59CB\u6587\u4EF6\u540D
     */</span>
    <span class="token class-name">String</span> originalFileName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u7740\u521B\u5EFA\u4E86\u4E00\u4E2AMinioTemplate\uFF0C\u63D0\u4F9B\u4E86\u7CFB\u5217\u5BF9Minio API\u7684\u96C6\u6210\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MinioTemplate</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * MinIO \u5BA2\u6237\u7AEF
     */</span>
    <span class="token class-name">MinioClient</span> minioClient<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * MinIO \u914D\u7F6E\u7C7B
     */</span>
    <span class="token class-name">OssProperties</span> ossProperties<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u67E5\u8BE2\u6240\u6709\u5B58\u50A8\u6876
     *
     * <span class="token keyword">@return</span> Bucket \u96C6\u5408
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Bucket</span><span class="token punctuation">&gt;</span></span> <span class="token function">listBuckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">listBuckets</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u6876\u662F\u5426\u5B58\u5728
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> \u6876\u540D
     * <span class="token keyword">@return</span> \u662F\u5426\u5B58\u5728
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">bucketExists</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">bucketExists</span><span class="token punctuation">(</span><span class="token class-name">BucketExistsArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u521B\u5EFA\u5B58\u50A8\u6876
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> \u6876\u540D
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makeBucket</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">bucketExists</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minioClient<span class="token punctuation">.</span><span class="token function">makeBucket</span><span class="token punctuation">(</span><span class="token class-name">MakeBucketArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u5220\u9664\u4E00\u4E2A\u7A7A\u6876 \u5982\u679C\u5B58\u50A8\u6876\u5B58\u5728\u5BF9\u8C61\u4E0D\u4E3A\u7A7A\u65F6\uFF0C\u5220\u9664\u4F1A\u62A5\u9519\u3002
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> \u6876\u540D
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeBucket</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        minioClient<span class="token punctuation">.</span><span class="token function">removeBucket</span><span class="token punctuation">(</span><span class="token class-name">RemoveBucketArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u4E0A\u4F20\u6587\u4EF6
     *
     * <span class="token keyword">@param</span> <span class="token parameter">inputStream</span>      \u6D41
     * <span class="token keyword">@param</span> <span class="token parameter">originalFileName</span> \u539F\u59CB\u6587\u4EF6\u540D
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>       \u6876\u540D
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
     * \u8FD4\u56DE\u4E34\u65F6\u5E26\u7B7E\u540D\u3001\u8FC7\u671F\u65F6\u95F4\u4E00\u5929\u3001Get\u8BF7\u6C42\u65B9\u5F0F\u7684\u8BBF\u95EEURL
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>  \u6876\u540D
     * <span class="token keyword">@param</span> <span class="token parameter">ossFilePath</span> Oss\u6587\u4EF6\u8DEF\u5F84
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
     * GetObject\u63A5\u53E3\u7528\u4E8E\u83B7\u53D6\u67D0\u4E2A\u6587\u4EF6\uFF08Object\uFF09\u3002\u6B64\u64CD\u4F5C\u9700\u8981\u5BF9\u6B64Object\u5177\u6709\u8BFB\u6743\u9650\u3002
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>  \u6876\u540D
     * <span class="token keyword">@param</span> <span class="token parameter">ossFilePath</span> Oss\u6587\u4EF6\u8DEF\u5F84
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">InputStream</span> <span class="token function">getObject</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> ossFilePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>
                <span class="token class-name">GetObjectArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span>ossFilePath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u67E5\u8BE2\u6876\u7684\u5BF9\u8C61\u4FE1\u606F
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span> \u6876\u540D
     * <span class="token keyword">@param</span> <span class="token parameter">recursive</span>  \u662F\u5426\u9012\u5F52\u67E5\u8BE2
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Result</span><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">listObjects</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token keyword">boolean</span> recursive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">listObjects</span><span class="token punctuation">(</span>
                <span class="token class-name">ListObjectsArgs</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">bucket</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">recursive</span><span class="token punctuation">(</span>recursive<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
     * \u751F\u6210\u968F\u673A\u6587\u4EF6\u540D\uFF0C\u9632\u6B62\u91CD\u590D
     *
     * <span class="token keyword">@param</span> <span class="token parameter">originalFilename</span> \u539F\u59CB\u6587\u4EF6\u540D
     * <span class="token keyword">@return</span> 
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">generateOssUuidFileName</span><span class="token punctuation">(</span><span class="token class-name">String</span> originalFilename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;files&quot;</span> <span class="token operator">+</span> <span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token constant">SLASH</span> <span class="token operator">+</span> <span class="token class-name">DateUtil</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token constant">SLASH</span> <span class="token operator">+</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token constant">SLASH</span> <span class="token operator">+</span> originalFilename<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u83B7\u53D6\u5E26\u7B7E\u540D\u7684\u4E34\u65F6\u4E0A\u4F20\u5143\u6570\u636E\u5BF9\u8C61\uFF0C\u524D\u7AEF\u53EF\u83B7\u53D6\u540E\uFF0C\u76F4\u63A5\u4E0A\u4F20\u5230Minio
     *
     * <span class="token keyword">@param</span> <span class="token parameter">bucketName</span>
     * <span class="token keyword">@param</span> <span class="token parameter">fileName</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getPresignedPostFormData</span><span class="token punctuation">(</span><span class="token class-name">String</span> bucketName<span class="token punctuation">,</span> <span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u4E3A\u5B58\u50A8\u6876\u521B\u5EFA\u4E00\u4E2A\u4E0A\u4F20\u7B56\u7565\uFF0C\u8FC7\u671F\u65F6\u95F4\u4E3A7\u5929</span>
        <span class="token class-name">PostPolicy</span> policy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PostPolicy</span><span class="token punctuation">(</span>bucketName<span class="token punctuation">,</span> <span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">plusDays</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u8BBE\u7F6E\u4E00\u4E2A\u53C2\u6570key\uFF0C\u503C\u4E3A\u4E0A\u4F20\u5BF9\u8C61\u7684\u540D\u79F0</span>
        policy<span class="token punctuation">.</span><span class="token function">addEqualsCondition</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u6DFB\u52A0Content-Type\u4EE5&quot;image/&quot;\u5F00\u5934\uFF0C\u8868\u793A\u53EA\u80FD\u4E0A\u4F20\u7167\u7247</span>
        policy<span class="token punctuation">.</span><span class="token function">addStartsWithCondition</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;image/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// \u8BBE\u7F6E\u4E0A\u4F20\u6587\u4EF6\u7684\u5927\u5C0F 64kiB to 10MiB.</span>
        policy<span class="token punctuation">.</span><span class="token function">addContentLengthRangeCondition</span><span class="token punctuation">(</span><span class="token number">64</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> minioClient<span class="token punctuation">.</span><span class="token function">getPresignedPostFormData</span><span class="token punctuation">(</span>policy<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * \u521D\u59CB\u5316\u9ED8\u8BA4\u5B58\u50A8\u6876
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initDefaultBucket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> defaultBucketName <span class="token operator">=</span> ossProperties<span class="token punctuation">.</span><span class="token function">getDefaultBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">bucketExists</span><span class="token punctuation">(</span>defaultBucketName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u9ED8\u8BA4\u5B58\u50A8\u6876\u5DF2\u5B58\u5728&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u521B\u5EFA\u9ED8\u8BA4\u5B58\u50A8\u6876&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">makeBucket</span><span class="token punctuation">(</span>ossProperties<span class="token punctuation">.</span><span class="token function">getDefaultBucketName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-\u81EA\u52A8\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-3-\u81EA\u52A8\u914D\u7F6E" aria-hidden="true">#</a> 2.3 \u81EA\u52A8\u914D\u7F6E</h3><p>\u5728\u4E86\u89E3\u4E86BAT\u516C\u53F8\u63D0\u4F9B\u7684\u5BF9\u8C61\u5B58\u50A8OSS\u540E\uFF0C\u53D1\u73B0\u5176API\u63A5\u53E3\u6807\u51C6\u90FD\u662F\u5DEE\u4E0D\u591A\u7684\uFF0C\u4ECE\u6269\u5C55\u6027\u7684\u89D2\u5EA6\u51FA\u53D1\uFF0C\u6211\u4EEC\u5F53\u524D\u670D\u52A1\u5E94\u5F53\u652F\u6301\u5404\u79CD\u7C7B\u578B\u7684OSS\uFF0C\u6BD4\u5982\u963F\u91CC\u3001\u534E\u4E3A\u3001\u817E\u8BAF\u7B49\u3002\u6240\u4EE5\u8FD9\u91CC\u5148\u5B9A\u4E49\u4E00\u4E2A\u679A\u4E3E\u7C7B\uFF0C\u63D0\u4F9B\u9664\u4E86Minio\u8FD8\u9002\u914D\u5176\u4ED6\u5382\u5546\u7684\u652F\u6301\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">OssType</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Minio \u5BF9\u8C61\u5B58\u50A8
     */</span>
    <span class="token function">MINIO</span><span class="token punctuation">(</span><span class="token string">&quot;minio&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * \u534E\u4E3A OBS
     */</span>
    <span class="token function">OBS</span><span class="token punctuation">(</span><span class="token string">&quot;obs&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * \u817E\u8BAF COS
     */</span>
    <span class="token function">COS</span><span class="token punctuation">(</span><span class="token string">&quot;tencent&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * \u963F\u91CC\u5DF4\u5DF4 SSO
     */</span>
    <span class="token function">ALIBABA</span><span class="token punctuation">(</span><span class="token string">&quot;alibaba&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u540D\u79F0
     */</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * \u7C7B\u578B
     */</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> type<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521B\u5EFAOSS\u914D\u7F6E\u7C7B\uFF0C\u53EF\u4EE5\u9009\u62E9\u4E0D\u540C\u7C7B\u578B\u7684OSS\u96C6\u6210\uFF0C\u4EE5\u53CA\u96C6\u6210\u9700\u8981\u7684\u8BBF\u95EE\u5730\u5740\u3001\u7528\u6237\u5BC6\u7801\u7B49\u4FE1\u606F\u914D\u7F6E\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;oss&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OssProperties</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * \u662F\u5426\u5F00\u542F
     */</span>
    <span class="token class-name">Boolean</span> enabled<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u5B58\u50A8\u5BF9\u8C61\u670D\u52A1\u5668\u7C7B\u578B
     */</span>
    <span class="token class-name">OssType</span> type<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * OSS \u8BBF\u95EE\u7AEF\u70B9\uFF0C\u96C6\u7FA4\u65F6\u9700\u63D0\u4F9B\u7EDF\u4E00\u5165\u53E3
     */</span>
    <span class="token class-name">String</span> endpoint<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u7528\u6237\u540D
     */</span>
    <span class="token class-name">String</span> accessKey<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u5BC6\u7801
     */</span>
    <span class="token class-name">String</span> secretKey<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * \u9ED8\u8BA4\u5B58\u50A8\u6876\u540D\uFF0C\u6CA1\u6709\u6307\u5B9A\u65F6\uFF0C\u4F1A\u653E\u5728\u9ED8\u8BA4\u7684\u5B58\u50A8\u6876
     */</span>
    <span class="token class-name">String</span> defaultBucketName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u7F16\u8BD1\u4E00\u4E0B\u9879\u76EE\uFF0C\u5C06\u914D\u7F6E\u7C7B\u8F6C\u4E3Aspring-configuration-metadata.json\u6587\u4EF6\uFF0C\u8FD9\u6837\u8FD9\u4E9B\u914D\u7F6E\u5728yml\u4E2D\u5C31\u6709\u63D0\u793A\u529F\u80FD\u4E86\u3002</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220723232931077.png" alt="image-20220723232931077" loading="lazy"></p><p>\u6700\u540E\u5728\u6839\u636E\u6211\u4EEC\u914D\u7F6E\u7684OSS\u7C7B\u578B\uFF0C\u521B\u5EFA\u4E0D\u540C\u7684\u81EA\u52A8\u914D\u7F6E\u7C7B\uFF0C\u8FD9\u91CC\u521B\u5EFA\u7684MinioConfiguration\uFF0C\u4E3B\u8981\u662F\u6839\u636E\u914D\u7F6E\u6CE8\u5165MinioClient\u53CAMinioTemplate\u6A21\u677F\u7C7B\uFF0C\u5C06\u5176\u4EA4\u7ED9Spring\u5BB9\u5668\u7BA1\u7406\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#_2-4-\u6D4B\u8BD5" aria-hidden="true">#</a> 2.4 \u6D4B\u8BD5</h3><p>\u9996\u5148\uFF0C\u5728yml\u4E2D\u6DFB\u52A0Minio\u7684\u914D\u7F6E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>oss:
  enabled: true
  type: MINIO
  endpoint: http://127.0.0.1:9000
  access-key: admin
  secret-key: admin123
  default-bucket-name: pearl-buckent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u521B\u5EFA\u4E00\u4E2A\u8BBF\u95EE\u63A5\u53E3\uFF0C\u76F4\u63A5\u8C03\u7528minioTemplate\u8FDB\u884C\u6587\u4EF6\u64CD\u4F5C\uFF0C\u8FD9\u6837\u5C31\u5341\u5206\u4FBF\u5229\uFF0C\u8FBE\u5230\u4E86\u7B80\u5316\u5F00\u53D1\u7684\u76EE\u7684\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token class-name">MinioTemplate</span> minioTemplate<span class="token punctuation">;</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/upload&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ResponseBody</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">upload</span><span class="token punctuation">(</span><span class="token class-name">MultipartFile</span> file<span class="token punctuation">,</span> <span class="token class-name">String</span> bucketName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> minioTemplate<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bucketName<span class="token punctuation">,</span> file<span class="token punctuation">.</span><span class="token function">getOriginalFilename</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,28),k={href:"https://yunyanchengyu.blog.csdn.net/article/details/120920171",target:"_blank",rel:"noopener noreferrer"},d=o("Minio\u5165\u95E8\u7CFB\u5217\u301012\u3011Spring Boot\u96C6\u6210Minio");function r(m,v){const s=i("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[n("a",k,[d,e(s)])])])}const f=a(l,[["render",r],["__file","minio-springboot-integrate.html.vue"]]);export{f as default};
