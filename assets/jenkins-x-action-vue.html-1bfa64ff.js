import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const t={},i=e(`<h1 id="jenkins使用jenkinsfile部署前端vue项目" tabindex="-1"><a class="header-anchor" href="#jenkins使用jenkinsfile部署前端vue项目" aria-hidden="true">#</a> Jenkins使用jenkinsfile部署前端Vue项目</h1><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> 1. 背景</h2><p>jenkinsfile的文件通用性更强，可以方便的复制到各个项目</p><h2 id="_2-创建任务" tabindex="-1"><a class="header-anchor" href="#_2-创建任务" aria-hidden="true">#</a> 2. 创建任务</h2><p>创建的时候选择：流水线</p><figure><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210919194741168.png" alt="image-20210919194741168" tabindex="0" loading="lazy"><figcaption>image-20210919194741168</figcaption></figure><h2 id="_3-部署文件jenkinsfile代码" tabindex="-1"><a class="header-anchor" href="#_3-部署文件jenkinsfile代码" aria-hidden="true">#</a> 3. 部署文件jenkinsfile代码</h2><p>在项目根目录下建：jenkinsfile文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#!groovy</span>

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
def artifactShortName <span class="token operator">=</span> <span class="token string">&#39;MY_WEB&#39;</span>
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
    environment <span class="token punctuation">{</span>
            NODE_HOME <span class="token operator">=</span> <span class="token string">&quot;/usr/local/node&quot;</span>
            SASS_BINARY_PATH <span class="token operator">=</span> <span class="token string">&quot;/opt/linux-x64-72_binding.node&quot;</span>
            <span class="token environment constant">PATH</span> <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">$SASS_BINARY_PATH</span>/bin:<span class="token environment constant">$PATH</span>:<span class="token variable">$NODE_HOME</span>/bin&quot;</span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Mvn Build&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             steps <span class="token punctuation">{</span>
                            <span class="token function">sh</span>  <span class="token string">&#39;&#39;</span>&#39;npm <span class="token function">install</span> node-sass
            					<span class="token function">npm</span> <span class="token function">install</span>
            					<span class="token comment">#npm run build</span>
                                <span class="token function">npm</span> run build:prod<span class="token string">&#39;&#39;</span>&#39;
                        <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
         stage<span class="token punctuation">(</span><span class="token string">&#39;archive&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        script <span class="token punctuation">{</span>
                            color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;开始压缩&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                            currentTime <span class="token operator">=</span> systemtime.GetSysTime<span class="token punctuation">(</span><span class="token string">&#39;yyMMdd&#39;</span><span class="token punctuation">)</span>
                            //部署包是jar还是war，以及路径要根据实际情况修改d
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> archive<span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> *.tar.gz<span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">mkdir</span> archive <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> my_web.tar.gz bj_web <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> <span class="token parameter variable">-r</span> my_web archive <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> doc/版本更新说明.md archive <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> my_web <span class="token string">&quot;&quot;</span>&quot;
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
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;自动发布&#39;</span>,<span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    deployCommand <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>&quot;cd /faduit/zfba/ <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> my_web <span class="token operator">&amp;&amp;</span> <span class="token function">tar</span> zxvf my_web.tar.gz <span class="token string">&quot;&quot;</span>&quot;
                    deploy.Publish<span class="token punctuation">(</span>serverIp, deployCommand, targetPath, <span class="token string">&#39;my_web.tar.gz&#39;</span>, <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),p=[i];function o(l,c){return s(),a("div",null,p)}const r=n(t,[["render",o],["__file","jenkins-x-action-vue.html.vue"]]);export{r as default};
