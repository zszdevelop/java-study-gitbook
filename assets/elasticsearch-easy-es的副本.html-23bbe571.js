import{_ as e,W as i,X as n,a0 as d}from"./framework-0cf5f349.js";const s={},a=d(`<h1 id="es实战-删除历史索引" tabindex="-1"><a class="header-anchor" href="#es实战-删除历史索引" aria-hidden="true">#</a> ES实战 - 删除历史索引</h1><h2 id="_1-脚本" tabindex="-1"><a class="header-anchor" href="#_1-脚本" aria-hidden="true">#</a> 1. 脚本</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

###################################

###################################
#清除最近多少天的日志，默认3天
past_day_count=$1
if [ ! $past_day_count ]; then
past_day_count=3;
fi
#待清除的索引匹配规则
index_prefix=$2
if [ ! $index_prefix ]; then
# index_prefix=&quot;*\\-*&quot;; #清理所有索引
index_prefix=&quot;dataexa-*&quot;;
fi
#ES地址
es_host=$3
if [ ! $es_host ]; then
es_host=192.168.0.1:9200;
fi
echo &quot;准备清理掉ES[$es_host]内索引前缀为[$index_prefix]的超过当前时间前$past_day_count天的信息......&quot;

function delete_indices() {
index_name=$1
index_date=$2
comp_date=\`date -d &quot;$past_day_count day ago&quot; +&quot;%Y%m%d&quot;\`
date1=&quot;$index_date 00:00:00&quot;
date2=&quot;$comp_date 00:00:00&quot;

echo &quot;索引时间：&quot;+ $date1 &quot;	可清除的时间：&quot; $date2 &quot;前&quot;

t1=\`date -d &quot;$date1&quot; +%s\`
t2=\`date -d &quot;$date2&quot; +%s\`


if [ $t1 -le $t2 ]; then
curl -XDELETE http://$es_host/$index_name --user elastic:itsmycar
echo &quot;清理的索引地址：&quot;+http://$es_host/$index_name
fi
}

curl -XGET http://$es_host/_cat/indices --user elastic:itsmycar | awk -F&quot; &quot; &#39;{print $3}&#39; | egrep &quot;$index_prefix&quot; | sort | while read LINE
do
index_name=$LINE;
# index_date=\`echo $LINE | awk -F&quot;-&quot; &#39;{print $NF}&#39; | egrep &quot;[0-9]*\\.[0-9]*\\.[0-9]*&quot; | uniq | sed &#39;s/\\./-/g&#39;\`
index_date=\`echo $LINE | awk -F&quot;_&quot; -F&quot;-&quot; &#39;{print $NF}&#39;\`
if [ $index_date ]; then
delete_indices $index_name $index_date
fi
done

echo &quot;清理完成！&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[a];function l(u,v){return i(),n("div",null,t)}const r=e(s,[["render",l],["__file","elasticsearch-easy-es的副本.html.vue"]]);export{r as default};
