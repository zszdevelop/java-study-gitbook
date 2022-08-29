import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.5d5ee434.js";const t={},p=e(`<h1 id="jenkins\u4F7F\u7528jenkinsfile\u90E8\u7F72springboot\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#jenkins\u4F7F\u7528jenkinsfile\u90E8\u7F72springboot\u9879\u76EE" aria-hidden="true">#</a> Jenkins\u4F7F\u7528jenkinsfile\u90E8\u7F72springboot\u9879\u76EE</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>jenkinsfile\u7684\u6587\u4EF6\u901A\u7528\u6027\u66F4\u5F3A\uFF0C\u53EF\u4EE5\u65B9\u4FBF\u7684\u590D\u5236\u5230\u5404\u4E2A\u9879\u76EE</p><h2 id="_2-\u521B\u5EFA\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-\u521B\u5EFA\u4EFB\u52A1" aria-hidden="true">#</a> 2. \u521B\u5EFA\u4EFB\u52A1</h2><p>\u521B\u5EFA\u7684\u65F6\u5019\u9009\u62E9\uFF1A\u6D41\u6C34\u7EBF</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210919194741168.png" alt="image-20210919194741168"></p><h2 id="_3-\u90E8\u7F72\u6587\u4EF6jenkinsfile\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_3-\u90E8\u7F72\u6587\u4EF6jenkinsfile\u4EE3\u7801" aria-hidden="true">#</a> 3. \u90E8\u7F72\u6587\u4EF6jenkinsfile\u4EE3\u7801</h2><p>\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u5EFA\uFF1Ajenkinsfile\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#!groovy</span>

@Library<span class="token punctuation">(</span><span class="token string">&#39;jenkinslib&#39;</span><span class="token punctuation">)</span> _

def color <span class="token operator">=</span> new org.devops.color<span class="token punctuation">(</span><span class="token punctuation">)</span>
def build <span class="token operator">=</span> new org.devops.build<span class="token punctuation">(</span><span class="token punctuation">)</span>
def deploy <span class="token operator">=</span> new org.devops.deploy<span class="token punctuation">(</span><span class="token punctuation">)</span>
def systemtime <span class="token operator">=</span> new org.devops.systemtime<span class="token punctuation">(</span><span class="token punctuation">)</span>

def String isDeploy <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${env.isDeploy}</span>&quot;</span>
//\u76EE\u6807\u670D\u52A1\u5668ip\u548C\u8DEF\u5F84\uFF0C\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539
def String serverIp <span class="token operator">=</span> <span class="token string">&#39;192.168.0.1&#39;</span>
def String targetPath <span class="token operator">=</span> <span class="token string">&#39;/home/myproject&#39;</span>

//\u90E8\u7F72\u5305\u7684\u7B80\u79F0\uFF0C\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539
def artifactShortName <span class="token operator">=</span> <span class="token string">&#39;MYAPP_SERVER&#39;</span>
def String releaseVersion <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${env.releaseVersion}</span>&quot;</span>

pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span>
        <span class="token function">node</span> <span class="token punctuation">{</span>
            label <span class="token string">&#39;master&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    options <span class="token punctuation">{</span>
        buildDiscarder<span class="token punctuation">(</span>logRotator<span class="token punctuation">(</span>numToKeepStr: <span class="token string">&#39;10&#39;</span><span class="token punctuation">))</span>
        disableConcurrentBuilds<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    triggers <span class="token punctuation">{</span>
        <span class="token function">cron</span> <span class="token string">&#39;H 22 * * *&#39;</span>
    <span class="token punctuation">}</span>
    parameters <span class="token punctuation">{</span>
        string defaultValue: <span class="token string">&#39;0.10.0&#39;</span>, description: <span class="token string">&#39;\u8BF7\u8F93\u5165\u672C\u6B21\u6784\u5EFA\u7684\u524D\u4E09\u6BB5\u7248\u672C\u53F7&#39;</span>, name: <span class="token string">&#39;releaseVersion&#39;</span>, trim: <span class="token boolean">true</span>
        choice choices: <span class="token punctuation">[</span><span class="token string">&#39;\u662F&#39;</span>, <span class="token string">&#39;\u5426&#39;</span><span class="token punctuation">]</span>, description: <span class="token string">&#39;\u662F\u5426\u8981\u53D1\u5E03\u5230\u670D\u52A1\u5668\uFF0C\u9ED8\u8BA4\u53D1\u5E03&#39;</span>, name: <span class="token string">&#39;isDeploy&#39;</span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Mvn Build&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;\u5F00\u59CB\u6253\u5305&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    build.Build<span class="token punctuation">(</span><span class="token string">&#39;mvn&#39;</span>, <span class="token string">&#39;mvn clean package&#39;</span>, <span class="token string">&#39;master&#39;</span><span class="token punctuation">)</span>
                    //\u9ED8\u8BA4\u4E3Ajdk8
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
//            post <span class="token punctuation">{</span>
//                success <span class="token punctuation">{</span>
//                    wrap<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$class</span><span class="token builtin class-name">:</span> <span class="token string">&#39;BuildUser&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
//                        script <span class="token punctuation">{</span>
//                            currentTime <span class="token operator">=</span> systemtime.GetSysTime<span class="token punctuation">(</span><span class="token string">&#39;yyMMdd&#39;</span><span class="token punctuation">)</span>
//                            //\u90E8\u7F72\u5305\u662Fjar\u8FD8\u662Fwar\uFF0C\u4EE5\u53CA\u8DEF\u5F84\u8981\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539
//                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot;cd my-admin/target
//                                <span class="token function">cp</span> my-admin.jar <span class="token variable">\${artifactShortName}</span>-<span class="token variable">\${releaseVersion}</span>-<span class="token variable">\${env.GIT_COMMIT.take(8)}</span>-BETA-<span class="token variable">\${currentTime}</span>.jar
//                            <span class="token string">&quot;&quot;</span>&quot;
//                            //\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539\u5236\u54C1\u8DEF\u5F84\u548C\u540D\u79F0\uFF0C\u8FD9\u4E2A\u662F\u7528\u6765\u628A\u5305\u63D0\u53D6\u5230jenkins\u9875\u9762\uFF0C\u7ED9\u6D4B\u8BD5\u4E0B\u8F7D\u7684
//                            archiveArtifacts <span class="token string">&#39;my-admin/target/*.jar&#39;</span>
//                            currentBuild.description <span class="token operator">=</span> <span class="token string">&quot;Start By <span class="token variable">\${env.BUILD_USER}</span> And Build Success&quot;</span>
//                        <span class="token punctuation">}</span>
//                    <span class="token punctuation">}</span>
//                <span class="token punctuation">}</span>
//            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;archive&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;\u5F00\u59CB\u538B\u7F29&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    currentTime <span class="token operator">=</span> systemtime.GetSysTime<span class="token punctuation">(</span><span class="token string">&#39;yyMMdd&#39;</span><span class="token punctuation">)</span>
                    //\u90E8\u7F72\u5305\u662Fjar\u8FD8\u662Fwar\uFF0C\u4EE5\u53CA\u8DEF\u5F84\u8981\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> -rf archive<span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">mkdir</span> archive <span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> my-admin/target/*.jar archive <span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> doc/\u7248\u672C\u66F4\u65B0\u8BF4\u660E.md archive <span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">tar</span> -zcvf <span class="token variable">\${artifactShortName}</span>-<span class="token variable">\${releaseVersion}</span>-<span class="token variable">\${env.GIT_COMMIT.take(8)}</span>-BETA-<span class="token variable">\${currentTime}</span>.tar.gz archive <span class="token string">&quot;&quot;</span>&quot;
                    //\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539\u5236\u54C1\u8DEF\u5F84\u548C\u540D\u79F0\uFF0C\u8FD9\u4E2A\u662F\u7528\u6765\u628A\u5305\u63D0\u53D6\u5230jenkins\u9875\u9762\uFF0C\u7ED9\u6D4B\u8BD5\u4E0B\u8F7D\u7684
                    archiveArtifacts <span class="token string">&#39;*.tar.gz&#39;</span>
                    currentBuild.description <span class="token operator">=</span> <span class="token string">&quot;Start By <span class="token variable">\${env.BUILD_USER}</span> And Build Success&quot;</span>

                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Deploy App&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
                expression <span class="token punctuation">{</span>
                    <span class="token builtin class-name">return</span> <span class="token punctuation">(</span>isDeploy <span class="token operator">==</span> <span class="token string">&#39;\u662F&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;\u81EA\u52A8\u53D1\u5E03&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    deployCommand <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>&quot;cd /home/myproject/ <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> deploy.sh restart<span class="token string">&quot;&quot;</span>&quot;
                    deploy.Publish<span class="token punctuation">(</span>serverIp, deployCommand, targetPath, <span class="token string">&#39;my-admin/target/my-admin.jar&#39;</span>, <span class="token string">&#39;my-admin/target&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-\u9879\u76EE\u542F\u52A8\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#_4-\u9879\u76EE\u542F\u52A8\u811A\u672C" aria-hidden="true">#</a> 4. \u9879\u76EE\u542F\u52A8\u811A\u672C</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token comment"># author ygn</span>
<span class="token comment"># ./deploy.sh start \u542F\u52A8</span>
<span class="token comment"># ./deploy.sh stop \u505C\u6B62</span>
<span class="token comment"># ./deploy.sh restart \u91CD\u542F</span>
<span class="token comment"># ./deploy.sh status \u72B6\u6001</span>
<span class="token assign-left variable">AppName</span><span class="token operator">=</span>my-admin.jar

<span class="token comment"># JVM\u53C2\u6570</span>
<span class="token assign-left variable">JVM_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Dname=<span class="token variable">$AppName</span>  -Duser.timezone=Asia/Shanghai -Xms512M -Xmx512M -XX:PermSize=256M -XX:MaxPermSize=512M -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGCDateStamps  -XX:+PrintGCDetails -XX:NewRatio=1 -XX:SurvivorRatio=30 -XX:+UseParallelGC -XX:+UseParallelOldGC&quot;</span>
<span class="token assign-left variable">APP_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>
<span class="token assign-left variable">LOG_PATH</span><span class="token operator">=</span><span class="token variable">$APP_HOME</span>/logs/<span class="token variable">$AppName</span>.log

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> -e <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[0;31m \u672A\u8F93\u5165\u64CD\u4F5C\u540D <span class="token entity" title="\\033">\\033</span>[0m  <span class="token entity" title="\\033">\\033</span>[0;34m {start|stop|restart|status} <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$AppName</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> -e <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[0;31m \u672A\u8F93\u5165\u5E94\u7528\u540D <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token keyword">function</span> <span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef <span class="token operator">|</span><span class="token function">grep</span> java<span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> -v <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>

	<span class="token keyword">if</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is running...&quot;</span>
	<span class="token keyword">else</span>
	  <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u542F\u52A8\u5B8C\u6574\u547D\u4EE4\uFF1A nohup java -jar  <span class="token variable">$JVM_OPTS</span> <span class="token variable">$AppName</span> --spring.profiles.active=prod &gt; /dev/null 2&gt;&amp;1 &amp;&quot;</span>
		<span class="token function">nohup</span> java -jar  <span class="token variable">$JVM_OPTS</span> <span class="token variable">$AppName</span> --spring.profiles.active<span class="token operator">=</span>prod <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
		<span class="token function">sleep</span> <span class="token number">5</span>
		status
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Stop <span class="token variable">$AppName</span>&quot;</span>
	
	<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
	<span class="token function-name function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef <span class="token operator">|</span><span class="token function">grep</span> java<span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> -v <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>
	<span class="token punctuation">}</span>

	query
	<span class="token keyword">if</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
		<span class="token function">kill</span> -<span class="token environment constant">TERM</span> <span class="token variable">$PID</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> (pid:<span class="token variable">$PID</span>) exiting...&quot;</span>
		<span class="token keyword">while</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span>
		<span class="token keyword">do</span>
			<span class="token function">sleep</span> <span class="token number">1</span>
			query
		<span class="token keyword">done</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> exited.&quot;</span>
	<span class="token keyword">else</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> already stopped.&quot;</span>
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-name function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    stop
    <span class="token function">sleep</span> <span class="token number">2</span>
    start
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-name function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef <span class="token operator">|</span><span class="token function">grep</span> java<span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> -v <span class="token function">grep</span><span class="token operator">|</span><span class="token function">wc</span> -l<span class="token variable">\`</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$PID</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is running...&quot;</span>
    <span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is not running...&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
    start<span class="token punctuation">)</span>
    start<span class="token punctuation">;</span><span class="token punctuation">;</span>
    stop<span class="token punctuation">)</span>
    stop<span class="token punctuation">;</span><span class="token punctuation">;</span>
    restart<span class="token punctuation">)</span>
    restart<span class="token punctuation">;</span><span class="token punctuation">;</span>
    status<span class="token punctuation">)</span>
    status<span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>

<span class="token keyword">esac</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),i=[p];function l(o,c){return s(),a("div",null,i)}var d=n(t,[["render",l],["__file","C4-jenkinsfile\u90E8\u7F72springboot\u9879\u76EE.html.vue"]]);export{d as default};
