# Element-吐槽点

## 1. 关于 el-radio-group 增加垂直排列的建议

[关于 el-radio-group 增加垂直排列的建议](https://github.com/ElemeFE/element/issues/3037)

> 官方回复：没有太多人有这个需求，可能暂时没有这个计划，你可以用CSS处理。

这么简单的需求，硬是不加。需要自己实现。一大堆评论要求加，视而不见。

2017 年提的，现在都2022年了，还没解决

### 1.1 解决方案: 增加div

```js
<template>
<el-radio-group v-model="selectMod" size="small" type="vertical">
<div v-for= index of 3>
 <el-radio-button label="第一列"></el-radio-button>
</div>
</el-radio-group>
</template>
```

## 2. 可搜索Cascader 级联选择器使用时 多次搜索错误的内容，点击下拉无匹配数据区域 会 导致 页面卡死

[Bug Report\] 可搜索Cascader 级联选择器使用时 多次搜索错误的内容，点击下拉无匹配数据区域 会 导致 页面卡死](https://github.com/ElemeFE/element/issues/22006#top)