import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.296fdb6c.js";const t={},i=e(`<h1 id="jenkins\u4F7F\u7528jenkinsfile\u90E8\u7F72\u524D\u7AEFvue\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#jenkins\u4F7F\u7528jenkinsfile\u90E8\u7F72\u524D\u7AEFvue\u9879\u76EE" aria-hidden="true">#</a> Jenkins\u4F7F\u7528jenkinsfile\u90E8\u7F72\u524D\u7AEFVue\u9879\u76EE</h1><h2 id="_1-\u80CC\u666F" tabindex="-1"><a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a> 1. \u80CC\u666F</h2><p>jenkinsfile\u7684\u6587\u4EF6\u901A\u7528\u6027\u66F4\u5F3A\uFF0C\u53EF\u4EE5\u65B9\u4FBF\u7684\u590D\u5236\u5230\u5404\u4E2A\u9879\u76EE</p><h2 id="_2-\u521B\u5EFA\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-\u521B\u5EFA\u4EFB\u52A1" aria-hidden="true">#</a> 2. \u521B\u5EFA\u4EFB\u52A1</h2><p>\u521B\u5EFA\u7684\u65F6\u5019\u9009\u62E9\uFF1A\u6D41\u6C34\u7EBF</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210919194741168.png" alt="image-20210919194741168" loading="lazy"></p><h2 id="_3-\u90E8\u7F72\u6587\u4EF6jenkinsfile\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_3-\u90E8\u7F72\u6587\u4EF6jenkinsfile\u4EE3\u7801" aria-hidden="true">#</a> 3. \u90E8\u7F72\u6587\u4EF6jenkinsfile\u4EE3\u7801</h2><p>\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u5EFA\uFF1Ajenkinsfile\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#!groovy</span>

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
        string defaultValue: <span class="token string">&#39;0.10.0&#39;</span>, description: <span class="token string">&#39;\u8BF7\u8F93\u5165\u672C\u6B21\u6784\u5EFA\u7684\u524D\u4E09\u6BB5\u7248\u672C\u53F7&#39;</span>, name: <span class="token string">&#39;releaseVersion&#39;</span>, trim: <span class="token boolean">true</span>
        choice choices: <span class="token punctuation">[</span><span class="token string">&#39;\u662F&#39;</span>, <span class="token string">&#39;\u5426&#39;</span><span class="token punctuation">]</span>, description: <span class="token string">&#39;\u662F\u5426\u8981\u53D1\u5E03\u5230\u670D\u52A1\u5668\uFF0C\u9ED8\u8BA4\u53D1\u5E03&#39;</span>, name: <span class="token string">&#39;isDeploy&#39;</span>
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
                            color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;\u5F00\u59CB\u538B\u7F29&#39;</span>, <span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                            currentTime <span class="token operator">=</span> systemtime.GetSysTime<span class="token punctuation">(</span><span class="token string">&#39;yyMMdd&#39;</span><span class="token punctuation">)</span>
                            //\u90E8\u7F72\u5305\u662Fjar\u8FD8\u662Fwar\uFF0C\u4EE5\u53CA\u8DEF\u5F84\u8981\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539d
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> archive<span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> *.tar.gz<span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">mkdir</span> archive <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> my_web.tar.gz bj_web <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> <span class="token parameter variable">-r</span> my_web archive <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">cp</span> doc/\u7248\u672C\u66F4\u65B0\u8BF4\u660E.md archive <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">rm</span> <span class="token parameter variable">-rf</span> my_web <span class="token string">&quot;&quot;</span>&quot;
                            <span class="token function">sh</span> <span class="token string">&quot;&quot;</span>&quot; <span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> <span class="token variable">\${artifactShortName}</span>-<span class="token variable">\${releaseVersion}</span>-<span class="token variable">\${env.GIT_COMMIT.take(8)}</span>-BETA-<span class="token variable">\${currentTime}</span>.tar.gz archive <span class="token string">&quot;&quot;</span>&quot;
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
                    color.PrintMes<span class="token punctuation">(</span><span class="token string">&#39;\u81EA\u52A8\u53D1\u5E03&#39;</span>,<span class="token string">&#39;green&#39;</span><span class="token punctuation">)</span>
                    deployCommand <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>&quot;cd /faduit/zfba/ <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> my_web <span class="token operator">&amp;&amp;</span> <span class="token function">tar</span> zxvf my_web.tar.gz <span class="token string">&quot;&quot;</span>&quot;
                    deploy.Publish<span class="token punctuation">(</span>serverIp, deployCommand, targetPath, <span class="token string">&#39;my_web.tar.gz&#39;</span>, <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),p=[i];function o(l,c){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","jenkins-x-action-vue.html.vue"]]);export{d as default};
