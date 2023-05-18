---
order: 1310
category:
  - es
---



# ES实战 - 删除历史索引

## 1. 脚本

```
#!/bin/bash

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
# index_prefix="*\-*"; #清理所有索引
index_prefix="dataexa-*";
fi
#ES地址
es_host=$3
if [ ! $es_host ]; then
es_host=192.168.0.1:9200;
fi
echo "准备清理掉ES[$es_host]内索引前缀为[$index_prefix]的超过当前时间前$past_day_count天的信息......"

function delete_indices() {
index_name=$1
index_date=$2
comp_date=`date -d "$past_day_count day ago" +"%Y%m%d"`
date1="$index_date 00:00:00"
date2="$comp_date 00:00:00"

echo "索引时间："+ $date1 "	可清除的时间：" $date2 "前"

t1=`date -d "$date1" +%s`
t2=`date -d "$date2" +%s`


if [ $t1 -le $t2 ]; then
curl -XDELETE http://$es_host/$index_name --user elastic:itsmycar
echo "清理的索引地址："+http://$es_host/$index_name
fi
}

curl -XGET http://$es_host/_cat/indices --user elastic:itsmycar | awk -F" " '{print $3}' | egrep "$index_prefix" | sort | while read LINE
do
index_name=$LINE;
# index_date=`echo $LINE | awk -F"-" '{print $NF}' | egrep "[0-9]*\.[0-9]*\.[0-9]*" | uniq | sed 's/\./-/g'`
index_date=`echo $LINE | awk -F"_" -F"-" '{print $NF}'`
if [ $index_date ]; then
delete_indices $index_name $index_date
fi
done

echo "清理完成！" 
```

