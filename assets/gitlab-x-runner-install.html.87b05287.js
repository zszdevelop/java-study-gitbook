import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as s,a as e,b as a,e as i,d as n,r as u}from"./app.b4cde55b.js";const d={},o=i('<h1 id="gitlab-runner\u7684\u5B89\u88C5\u4E0E\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#gitlab-runner\u7684\u5B89\u88C5\u4E0E\u4F7F\u7528" aria-hidden="true">#</a> Gitlab-Runner\u7684\u5B89\u88C5\u4E0E\u4F7F\u7528</h1><h2 id="_1-\u5B89\u88C5\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5\u6B65\u9AA4" aria-hidden="true">#</a> 1. \u5B89\u88C5\u6B65\u9AA4</h2><h3 id="_1-1-\u5B89\u88C5gitlab-ci-multi-runner" tabindex="-1"><a class="header-anchor" href="#_1-1-\u5B89\u88C5gitlab-ci-multi-runner" aria-hidden="true">#</a> 1.1 \u5B89\u88C5gitlab-ci-multi-runner</h3>',3),c=e("li",null,[e("p",null,"\u6DFB\u52A0yum\u6E90"),e("div",{class:"language-text ext-text line-numbers-mode"},[e("pre",{class:"language-text"},[e("code",null,`curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])])],-1),g=e("p",null,"\u5B89\u88C5",-1),h=e("div",{class:"language-text ext-text line-numbers-mode"},[e("pre",{class:"language-text"},[e("code",null,`yum install gitlab-ci-multi-runner
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),b=n("\u8FD9\u91CC\u662F\u5B98\u7F51\u7684\u5B89\u88C5\u6559\u7A0B\uFF0C\u5176\u5B83\u64CD\u4F5C\u7CFB\u7EDF\u7684\u8BF7\u53C2\u8003 "),p={href:"https://gitlab.com/gitlab-org/gitlab-ci-multi-runner",target:"_blank",rel:"noopener noreferrer"},m=n("https://gitlab.com/gitlab-org/gitlab-ci-multi-runner"),_=i(`<h3 id="_1-2-\u4F7F\u7528gitlab-ci-multi-runner\u6CE8\u518Crunner" tabindex="-1"><a class="header-anchor" href="#_1-2-\u4F7F\u7528gitlab-ci-multi-runner\u6CE8\u518Crunner" aria-hidden="true">#</a> 1.2 \u4F7F\u7528gitlab-ci-multi-runner\u6CE8\u518CRunner</h3><p>\u5B89\u88C5\u597Dgitlab-ci-multi-runner\u8FD9\u4E2A\u8F6F\u4EF6\u4E4B\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7528\u5B83\u60F3gitlab-ci\u6CE8\u518Crunner</p><p>\u5411gitlab-CI\u6CE8\u518Crunner\u9700\u8981\u4E24\u6837\u4E1C\u897F:<strong>GitLab-CI\u7684url</strong>\u548C<strong>\u6CE8\u518Ctoken</strong>\u3002</p><p>\u5176\u4E2D\uFF0Ctoken\u662F\u4E3A\u4E86\u786E\u5B9A\u4F60\u8FD9\u4E2ARunner\u662F<strong>\u6240\u6709\u5DE5\u7A0B\u90FD\u80FD\u591F\u4F7F\u7528\u7684Shared Runner</strong>\u8FD8\u662F\u5177\u4F53<strong>\u67D0\u4E00\u4E2A\u5DE5\u7A0B\u624D\u80FD\u4F7F\u7528\u7684Specific Runner</strong>\u3002</p><h4 id="_1-2-1-\u6240\u6709\u5DE5\u7A0B\u90FD\u80FD\u591F\u4F7F\u7528\u7684shared-runner" tabindex="-1"><a class="header-anchor" href="#_1-2-1-\u6240\u6709\u5DE5\u7A0B\u90FD\u80FD\u591F\u4F7F\u7528\u7684shared-runner" aria-hidden="true">#</a> 1.2.1 \u6240\u6709\u5DE5\u7A0B\u90FD\u80FD\u591F\u4F7F\u7528\u7684Shared Runner</h4><p>\u5982\u679C\u8981\u6CE8\u518CShared Runner\uFF0C\u4F60\u9700\u8981\u5230\u7BA1\u7406\u754C\u9762\u7684Runners\u9875\u9762\u91CC\u9762\u53BB\u627E\u6CE8\u518Ctoken\u3002\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><h4 id="_1-2-2-\u67D0\u4E00\u4E2A\u5DE5\u7A0B\u624D\u80FD\u4F7F\u7528\u7684specific-runner" tabindex="-1"><a class="header-anchor" href="#_1-2-2-\u67D0\u4E00\u4E2A\u5DE5\u7A0B\u624D\u80FD\u4F7F\u7528\u7684specific-runner" aria-hidden="true">#</a> 1.2.2 \u67D0\u4E00\u4E2A\u5DE5\u7A0B\u624D\u80FD\u4F7F\u7528\u7684Specific Runner</h4><p>\u5982\u679C\u8981\u6CE8\u518CSpecific Runner\uFF0C\u4F60\u9700\u8981\u5230\u9879\u76EE\u7684\u8BBE\u7F6E\u7684Runner\u9875\u9762\u91CC\u9762\u53BB\u627E\u6CE8\u518Ctoken\u3002\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200109135721629.png" alt="image-20200109135721629" loading="lazy"></p><h4 id="_1-2-3-\u6CE8\u518Crunner" tabindex="-1"><a class="header-anchor" href="#_1-2-3-\u6CE8\u518Crunner" aria-hidden="true">#</a> 1.2.3 \u6CE8\u518Crunner</h4><p>\u627E\u5230token\u4E4B\u540E\uFF0C\u8FD0\u884C\u4E0B\u9762\u8FD9\u6761\u547D\u4EE4\u6CE8\u518CRunner\uFF08\u5F53\u7136\uFF0C\u9664\u4E86url\u548Ctoken\u4E4B\u5916\uFF0C\u8FD8\u9700\u8981\u5176\u4ED6\u7684\u4FE1\u606F\uFF0C\u6BD4\u5982\u6267\u884C\u5668<code>executor</code>\u3001\u6784\u5EFA\u76EE\u5F55<code>builds_dir</code>\u7B49\uFF09\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># \u5982\u679C\u542F\u52A8sudo \u8FD9\u91CC\u4E5F\u8981\u52A0\u4E0Asudo
gitlab-ci-multi-runner register

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200109140942669.png" alt="image-20200109140942669" loading="lazy"></p><p>\u4F9D\u636E\u63D0\u793A\u8F93\u5165</p><h3 id="\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> \u6CE8\u610F\u4E8B\u9879</h3><ul><li><p>Whether to run untagged builds [true/false]:</p><p>\u662F\u5426\u8FD0\u884C\u5728\u6CA1\u6709 tag \u7684 build \u4E0A\u9762\u3002\u5728\u914D\u7F6E gitlab-ci \u65F6\uFF0C\u4F1A\u6709\u5F88\u591A job\uFF0C\u6BCF\u4E2A job \u53EF\u4EE5\u901A\u8FC7 tags \u5C5E\u6027\u6765\u9009\u62E9 Runner\u3002<strong>\u8FD9\u91CC\u4E3A true \u8868\u793A\u5982\u679C job \u6CA1\u6709\u914D\u7F6E tags\uFF0C\u4E5F\u6267\u884C\u3002</strong></p></li><li><p>Whether to lock the Runner to current project [true/false]:</p><p>\u662F\u5426\u9501\u5B9A Runner \u5230\u5F53\u524D\u9879\u76EE</p></li><li><p>\u9009\u62E9 executor\uFF0C\u8FD9\u91CC\u5217\u51FA\u4E86\u5F88\u591A executor</p><p>shell</p></li></ul><p>\u6CE8\u518C\u5B8C\u6210\u4E4B\u540E\uFF0CGitLab-CI\u5C31\u4F1A\u591A\u51FA\u4E00\u6761Runner\u8BB0\u5F55\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20200109141223152.png" alt="image-20200109141223152" loading="lazy"></p><h3 id="_1-3-\u8BA9\u6CE8\u518C\u597D\u7684runner\u8FD0\u884C\u8D77\u6765" tabindex="-1"><a class="header-anchor" href="#_1-3-\u8BA9\u6CE8\u518C\u597D\u7684runner\u8FD0\u884C\u8D77\u6765" aria-hidden="true">#</a> 1.3 \u8BA9\u6CE8\u518C\u597D\u7684Runner\u8FD0\u884C\u8D77\u6765</h3><p>Runner\u6CE8\u518C\u5B8C\u6210\u4E4B\u540E\u8FD8\u4E0D\u884C\uFF0C\u8FD8\u5FC5\u987B\u8BA9\u5B83\u8FD0\u884C\u8D77\u6765\uFF0C\u5426\u5219\u5B83\u65E0\u6CD5\u63A5\u6536\u5230GitLab-CI\u7684\u901A\u77E5\u5E76\u4E14\u6267\u884C\u8F6F\u4EF6\u96C6\u6210\u811A\u672C\u3002\u600E\u4E48\u8BA9Runner\u8FD0\u884C\u8D77\u6765\u5462\uFF1F<code>gitlab-ci-multi-runner</code>\u63D0\u4F9B\u4E86\u8FD9\u6837\u4E00\u6761\u547D\u4EE4<code>gitlab-ci-multi-runner run-single</code>\uFF0C\u8BE6\u60C5\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>gitlab-ci-multi-runner start gitbook-runner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770Brunner\u8FD0\u884C\u72B6\u6001</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ps -aux | grep gitlab-runner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>gitlab\u8FD0\u884C\u6210\u529F\u4E86</p><h2 id="_2-\u53EF\u80FD\u9047\u5230\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_2-\u53EF\u80FD\u9047\u5230\u7684\u95EE\u9898" aria-hidden="true">#</a> 2. \u53EF\u80FD\u9047\u5230\u7684\u95EE\u9898</h2><h3 id="_2-1-\u6CE8\u518C-runner-\u540E-gitlab-runner-\u51FA\u73B0\u7070\u8272\u611F\u53F9\u53F7" tabindex="-1"><a class="header-anchor" href="#_2-1-\u6CE8\u518C-runner-\u540E-gitlab-runner-\u51FA\u73B0\u7070\u8272\u611F\u53F9\u53F7" aria-hidden="true">#</a> 2.1 \u6CE8\u518C runner \u540E\uFF0Cgitlab runner \u51FA\u73B0\u7070\u8272\u611F\u53F9\u53F7</h3><p>\u5728\u670D\u52A1\u5668\u6CE8\u518C\u5B8C runner \u540E\uFF0C\u5728 gitlab \u7684 runner \u5904\u51FA\u73B0\u7070\u8272\u611F\u53F9\u53F7\uFF0C\u5E76\u63D0\u793A new runner has not connected yet\u3002\u8FD9\u4E2A\u95EE\u9898\u4E00\u822C\u90FD\u662F\u6743\u9650\u95EE\u9898\u9020\u6210\u7684\uFF0C\u52A0 sudo \u548C\u4E0D\u52A0 sudo \u6240\u521B\u5EFA\u7684\u914D\u7F6E\u6587\u4EF6\u4E0D\u540C\u3002\u5728\u4F7F\u7528 <code>gitlab-runner register</code> \u6CE8\u518C\u7684\u65F6\u5019\uFF0C\u52A0\u4E0A sudo\uFF0C\u5728\u542F\u52A8 runner \u65F6\u4E5F\u8981\u52A0\u4E0A sudo \uFF0C <code>sudo gitlab-runner restart</code> \u6216 <code>sudo gitlab-runner start</code> \u3002</p><h3 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h3>`,28),x={href:"https://www.jianshu.com/p/2b43151fb92e",target:"_blank",rel:"noopener noreferrer"},f=n("GitLab-CI\u4E0EGitLab-Runner");function v(R,k){const r=u("ExternalLinkIcon");return l(),s("div",null,[o,e("ul",null,[c,e("li",null,[g,h,e("p",null,[b,e("a",p,[m,a(r)])])])]),_,e("p",null,[e("a",x,[f,a(r)])])])}const j=t(d,[["render",v],["__file","gitlab-x-runner-install.html.vue"]]);export{j as default};
