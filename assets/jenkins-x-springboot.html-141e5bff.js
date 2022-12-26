import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const t={},p=e(`<h1 id="jenkins使用jenkinsfile部署springboot项目" tabindex="-1"><a class="header-anchor" href="#jenkins使用jenkinsfile部署springboot项目" aria-hidden="true">#</a> Jenkins使用jenkinsfile部署springboot项目</h1><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> 1. 背景</h2><p>jenkinsfile的文件通用性更强，可以方便的复制到各个项目</p><h2 id="_2-创建任务" tabindex="-1"><a class="header-anchor" href="#_2-创建任务" aria-hidden="true">#</a> 2. 创建任务</h2><p>创建的时候选择：流水线</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210919194741168.png" alt="image-20210919194741168" tabindex="0" loading="lazy"><figcaption>image-20210919194741168</figcaption></figure><h2 id="_3-部署文件jenkinsfile代码" tabindex="-1"><a class="header-anchor" href="#_3-部署文件jenkinsfile代码" aria-hidden="true">#</a> 3. 部署文件jenkinsfile代码</h2><p>在项目根目录下建：jenkinsfile文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#!groovy</span>

@Library<span class="token punctuation">(</span><span class="token string">&#39;jenkinslib&#39;</span><span class="token punctuation">)</span> _

def color <span class="token operator">=</span> new org.devops.color<span class="token punctuation">(</span><span class="token punctuation">)</span>
def build <span class="token operator">=</span> new org.devops.build<span class="token punctuation">(</span><span class="token punctuation">)</span>
def deploy <span class="token operator">=</span> new org.devops.deploy<span class="token punctuation">(</span><span class="token punctuation">)</span>
def systemtime <span class="token operator">=</span> new org.devops.systemtime<span class="token punctuation">(</span><span class="token punctuation">)</span>

def String isDeploy <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${env.isDeploy}</span>&quot;</span>
//目标服务器ip和路径，根据实际情况修改
def String serverIp <span class="token operator">=</span> <span class="token string">&#39;192.168.0.1&#39;</span>
def String targetPath <span class="token operator">=</span> <span class="token string">&#39;/home/myproject&#39;</span>

//部署包的简称，根据实际情况修改
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
        string defaultValue: <span class="token string">&#39;0.10.0&#39;</span>, description: <span class="token string">&#39;请输入本次构建的前三段版本号&#39;</span>, name: <span class="token string">&#39;releaseVersion&#39;</span>, trim: <span class="token boolean">true</span>
        choice choices: <span class="token punctuation">[</span><span class="token string">&#39;是&#39;</span>, <span class="token string">&#39;否&#39;</span><span class="token punctuation">]</span>, description: <span class="token string">&#39;是否要发布到服务器，默认发布&#39;</span>, name: <span class="token string">&#39;isDeploy&#39;</span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Mvn Build&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;开始打包&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    build.Build<span class="token punctuation">(</span><span class="token string">&#39;mvn&#39;</span>, <span class="token string">&#39;mvn clean package&#39;</span>, <span class="token string">&#39;master&#39;</span><span class="token punctuation">)</span>
                    //默认为jdk8
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
//            post <span class="token punctuation">{</span>
//                success <span class="token punctuation">{</span>
//                    wrap<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$class</span><span class="token builtin class-name">:</span> <span class="token string">&#39;BuildUser&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
//                        script <span class="token punctuation">{</span>
//                            currentTime <span class="token operator">=</span> systemtime.GetSysTime<span class="token punctuation">(</span><span class="token string">&#39;yyMMdd&#39;</span><span class="token punctuation">)</span>
//                            //部署包是jar还是war，以及路径要根据实际情况修改
//                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot;cd my-admin/target
//                                <span class="token function">cp</span> my-admin.jar <span class="token variable">\${artifactShortName}</span>-<span class="token variable">\${releaseVersion}</span>-<span class="token variable">\${env.GIT_COMMIT.take(8)}</span>-BETA-<span class="token variable">\${currentTime}</span>.jar
//                            <span class="token string">&quot;&quot;</span>&quot;
//                            //根据实际情况修改制品路径和名称，这个是用来把包提取到jenkins页面，给测试下载的
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
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;开始压缩&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    currentTime <span class="token operator">=</span> systemtime.GetSysTime<span class="token punctuation">(</span><span class="token string">&#39;yyMMdd&#39;</span><span class="token punctuation">)</span>
                    //部署包是jar还是war，以及路径要根据实际情况修改
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> archive<span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">mkdir</span> archive <span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> my-admin/target/*.jar archive <span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> doc/版本更新说明.md archive <span class="token string">&quot;&quot;</span>&quot;
                    <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> <span class="token variable">\${artifactShortName}</span>-<span class="token variable">\${releaseVersion}</span>-<span class="token variable">\${env.GIT_COMMIT.take(8)}</span>-BETA-<span class="token variable">\${currentTime}</span>.tar.gz archive <span class="token string">&quot;&quot;</span>&quot;
                    //根据实际情况修改制品路径和名称，这个是用来把包提取到jenkins页面，给测试下载的
                    archiveArtifacts <span class="token string">&#39;*.tar.gz&#39;</span>
                    currentBuild.description <span class="token operator">=</span> <span class="token string">&quot;Start By <span class="token variable">\${env.BUILD_USER}</span> And Build Success&quot;</span>

                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Deploy App&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
                expression <span class="token punctuation">{</span>
                    <span class="token builtin class-name">return</span> <span class="token punctuation">(</span>isDeploy <span class="token operator">==</span> <span class="token string">&#39;是&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;自动发布&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    deployCommand <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>&quot;cd /home/myproject/ <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> deploy.sh restart<span class="token string">&quot;&quot;</span>&quot;
                    deploy.Publish<span class="token punctuation">(</span>serverIp, deployCommand, targetPath, <span class="token string">&#39;my-admin/target/my-admin.jar&#39;</span>, <span class="token string">&#39;my-admin/target&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-项目启动脚本" tabindex="-1"><a class="header-anchor" href="#_4-项目启动脚本" aria-hidden="true">#</a> 4. 项目启动脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token comment"># author ygn</span>
<span class="token comment"># ./deploy.sh start 启动</span>
<span class="token comment"># ./deploy.sh stop 停止</span>
<span class="token comment"># ./deploy.sh restart 重启</span>
<span class="token comment"># ./deploy.sh status 状态</span>
<span class="token assign-left variable">AppName</span><span class="token operator">=</span>my-admin.jar

<span class="token comment"># JVM参数</span>
<span class="token assign-left variable">JVM_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Dname=<span class="token variable">$AppName</span>  -Duser.timezone=Asia/Shanghai -Xms512M -Xmx512M -XX:PermSize=256M -XX:MaxPermSize=512M -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGCDateStamps  -XX:+PrintGCDetails -XX:NewRatio=1 -XX:SurvivorRatio=30 -XX:+UseParallelGC -XX:+UseParallelOldGC&quot;</span>
<span class="token assign-left variable">APP_HOME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>
<span class="token assign-left variable">LOG_PATH</span><span class="token operator">=</span><span class="token variable">$APP_HOME</span>/logs/<span class="token variable">$AppName</span>.log

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[0;31m 未输入操作名 <span class="token entity" title="\\033">\\033</span>[0m  <span class="token entity" title="\\033">\\033</span>[0;34m {start|stop|restart|status} <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$AppName</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[0;31m 未输入应用名 <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token keyword">function</span> <span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">java</span><span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>

	<span class="token keyword">if</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AppName</span> is running...&quot;</span>
	<span class="token keyword">else</span>
	  <span class="token builtin class-name">echo</span> <span class="token string">&quot;启动完整命令： nohup java -jar  <span class="token variable">$JVM_OPTS</span> <span class="token variable">$AppName</span> --spring.profiles.active=prod &gt; /dev/null 2&gt;&amp;1 &amp;&quot;</span>
		<span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span>  <span class="token variable">$JVM_OPTS</span> <span class="token variable">$AppName</span> <span class="token parameter variable">--spring.profiles.active</span><span class="token operator">=</span>prod <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
		<span class="token function">sleep</span> <span class="token number">5</span>
		status
	<span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Stop <span class="token variable">$AppName</span>&quot;</span>
	
	<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
	<span class="token function-name function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">java</span><span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>
	<span class="token punctuation">}</span>

	query
	<span class="token keyword">if</span> <span class="token punctuation">[</span> x<span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token operator">!=</span> x<span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
		<span class="token function">kill</span> <span class="token parameter variable">-TERM</span> <span class="token variable">$PID</span>
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
    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">java</span><span class="token operator">|</span><span class="token function">grep</span> $AppName<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">\`</span></span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),i=[p];function l(o,c){return s(),a("div",null,i)}const u=n(t,[["render",l],["__file","jenkins-x-springboot.html.vue"]]);export{u as default};
