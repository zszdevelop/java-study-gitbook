# Element文件上传-Upload

## 1. 简介

element 的官网已经挺详尽了，这里主要是针对自己的疑惑点，进行描述补充。

## 2.  基础使用

### 2.1 点击上传

![image-20210607093813556](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210607093813556.png)

>通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置`limit`和`on-exceed`来限制上传文件的个数和定义超出限制时的行为。可通过设置`before-remove`来阻止文件移除操作。

```js
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<script>
  export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
```

## 3. 常见问题与解决方案

### 3.1 上传服务的Oauth认证

项目如果是采用OAuth 的token 认证形式

el-upload 中添加请求头

```
<el-upload
   ...
   :headers="headers"
   />
```

js代码

```js
 <script>
    import { getToken } from "@/utils/auth";
    export default {
 			data() {
            return {
                 headers: {
        					Authorization: "Bearer " + getToken(),
      		}
      }
</script>
```

### 3.2 上传文件额外指定参数

```vue
<el-upload
   ...
   :data="data"
   />
```



## 3. 参考文章

[element-Upload 上传](https://element.eleme.cn/#/zh-CN/component/upload)
