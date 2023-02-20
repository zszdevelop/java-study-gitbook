# 贷款利率

## 在线计算

::: vue-demo 一个 Vue Composition 演示

```vue
<template>
  <div class="box">
    <code>vuepress-theme-hope</code> is
    <div>
       利率：<input >{{lv}}</input>
  </div>
   <div>
     期数：<input >{{qs}}</input>
  </div>
		
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("powerful");

    const handler = () => {
       // message.value = "very " + message.value;
       message.value = "very " + message.value;
        message.value =24 * 0.21 * 3 / 4
    };

    return {
      message,
      handler,
      lv,
      qs,
    };
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

## 参考文章

[信用卡分期的实际利息是多少？具体怎么计算？](https://www.zhihu.com/question/29996548)